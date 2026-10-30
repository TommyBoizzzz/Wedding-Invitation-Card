import type { VercelRequest } from '@vercel/node';
import { randomUUID } from 'node:crypto';
import {
  clearAdminCookie,
  createAdminCookie,
  getAdminLoginIpHash,
  hasAdminSession,
  verifyAdminPin,
} from '../server/admin-auth.js';
import {
  clearAdminLoginFailures,
  deleteAllAdminData,
  deleteGift,
  deleteWish,
  importLegacyDatabase,
  initializeDatabase,
  isAdminLoginRateLimited,
  LegacyDatabase,
  listGifts,
  listWishes,
  recordAdminLoginFailure,
} from '../server/database.js';

type JsonObject = Record<string, unknown>;
export interface ApiResponse {
  setHeader(name: string, value: string | number | readonly string[]): ApiResponse;
  status(statusCode: number): ApiResponse;
  json(body: unknown): ApiResponse;
  send(body: unknown): ApiResponse;
  end(): ApiResponse;
}

function json(res: ApiResponse, status: number, body: unknown) {
  return res.status(status).json(body);
}

function getBody(value: unknown): JsonObject | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as JsonObject
    : null;
}

function getString(body: JsonObject, key: string, maxLength: number): string | null {
  const value = body[key];
  return typeof value === 'string' && value.trim().length <= maxLength
    ? value.trim()
    : null;
}

function isOneOf<T extends string>(value: unknown, choices: readonly T[]): value is T {
  return typeof value === 'string' && choices.includes(value as T);
}

function isLegacyDatabase(value: unknown): value is LegacyDatabase {
  const data = getBody(value);
  if (!data || !Array.isArray(data.gifts) || !Array.isArray(data.wishes)) {
    return false;
  }
  if (data.gifts.length + data.wishes.length > 250) return false;

  const validText = (text: unknown, maxLength: number, required = false) =>
    typeof text === 'string' &&
    text.length <= maxLength &&
    (!required || text.trim().length > 0);
  const validId = (id: unknown) =>
    typeof id === 'number' && Number.isSafeInteger(id) && id > 0;

  return data.gifts.every(row => {
    const gift = getBody(row);
    return Boolean(
      gift &&
      validId(gift.id) &&
      validText(gift.sender_name, 120, true) &&
      isOneOf(gift.bank, ['ABA', 'ACLEDA'] as const) &&
      typeof gift.amount === 'number' &&
      Number.isFinite(gift.amount) &&
      gift.amount >= 0 &&
      isOneOf(gift.currency, ['USD', 'KHR'] as const) &&
      validText(gift.wish_message, 1000) &&
      validText(gift.created_at, 40, true)
    );
  }) && data.wishes.every(row => {
    const wish = getBody(row);
    return Boolean(
      wish &&
      validId(wish.id) &&
      validText(wish.sender_name, 120, true) &&
      validText(wish.relationship, 80) &&
      validText(wish.message, 2000, true) &&
      Number.isInteger(wish.hearts) &&
      Number(wish.hearts) >= 0 &&
      validText(wish.created_at, 40, true)
    );
  });
}

function createdAt(): string {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

function requireMethod(req: VercelRequest, res: ApiResponse, method: string): boolean {
  if (req.method === method) return true;
  res.setHeader('Allow', method);
  json(res, 405, { error: 'Method not allowed' });
  return false;
}

export default async function handler(req: VercelRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  const requestUrl = new URL(req.url || '/', 'http://localhost');
  const forwardedPath = requestUrl.searchParams.get('path');
  const path = typeof forwardedPath === 'string'
    ? forwardedPath.replace(/^\/+|\/+$/g, '')
    : requestUrl.pathname.replace(/^\/api\/?/, '');
  const body = getBody(req.body);

  try {
    if (path === 'admin/login') {
      if (!requireMethod(req, res, 'POST')) return;
      const ipHash = getAdminLoginIpHash(req);
      if (await isAdminLoginRateLimited(ipHash)) {
        return json(res, 429, { error: 'ការប៉ុនប៉ងច្រើនពេក។ សូមរង់ចាំ ១៥ នាទីសិន។' });
      }
      if (!body || !verifyAdminPin(body.pin)) {
        await recordAdminLoginFailure(ipHash);
        return json(res, 401, { error: 'លេខកូដមិនត្រឹមត្រូវទេ! សូមព្យាយាមម្តងទៀត។' });
      }
      await clearAdminLoginFailures(ipHash);
      res.setHeader('Set-Cookie', createAdminCookie());
      return json(res, 200, { authenticated: true });
    }

    if (path === 'admin/logout') {
      if (!requireMethod(req, res, 'POST')) return;
      res.setHeader('Set-Cookie', clearAdminCookie());
      return res.status(204).end();
    }

    if (path.startsWith('admin/')) {
      if (!hasAdminSession(req)) {
        return json(res, 401, { error: 'Admin authentication required' });
      }

      if (path === 'admin/data' || path === 'admin/export') {
        if (path === 'admin/data' && req.method === 'DELETE') {
          const deleted = await deleteAllAdminData();
          return json(res, 200, { deleted });
        }
        if (!requireMethod(req, res, 'GET')) return;
        const [gifts, wishes] = await Promise.all([
          listGifts(),
          listWishes(),
        ]);
        const data = { gifts, wishes };
        if (path === 'admin/export') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader(
            'Content-Disposition',
            `attachment; filename="wedding_database_${new Date().toISOString().slice(0, 10)}.json"`,
          );
          return res.status(200).send(JSON.stringify(data, null, 2));
        }
        return json(res, 200, data);
      }

      if (path === 'admin/import') {
        if (!requireMethod(req, res, 'POST')) return;
        if (!isLegacyDatabase(body)) {
          return json(res, 400, { error: 'Invalid or too large legacy database backup' });
        }
        const imported = await importLegacyDatabase(body, randomUUID());
        if (!imported) {
          return json(res, 409, { error: 'Import is available only once, while the cloud database is empty' });
        }
        return json(res, 201, {
          imported: {
            gifts: body.gifts.length,
            wishes: body.wishes.length,
          },
        });
      }

      const adminRecordMatch = path.match(/^admin\/(gifts|wishes)\/(\d+)$/);
      if (adminRecordMatch) {
        if (!requireMethod(req, res, 'DELETE')) return;
        const id = Number(adminRecordMatch[2]);
        if (!Number.isSafeInteger(id) || id <= 0) {
          return json(res, 400, { error: 'Invalid record ID' });
        }
        const deleted = adminRecordMatch[1] === 'gifts'
          ? await deleteGift(id)
          : await deleteWish(id);
        if (!deleted) return json(res, 404, { error: 'Record not found' });
        return json(res, 200, { deleted: true });
      }

      return json(res, 404, { error: 'Not found' });
    }

    if (path === 'gifts') {
      if (!requireMethod(req, res, 'POST')) return;
      if (!body) return json(res, 400, { error: 'Invalid request body' });

      const senderName = getString(body, 'sender_name', 120);
      const wishMessage = getString(body, 'wish_message', 1000) ?? '';
      const bank = body.bank;
      const currency = body.currency;
      const amount = body.amount === undefined ? 0 : body.amount;
      if (
        !senderName ||
        !isOneOf(bank, ['ABA', 'ACLEDA'] as const) ||
        !isOneOf(currency, ['USD', 'KHR'] as const) ||
        typeof amount !== 'number' ||
        !Number.isFinite(amount) ||
        amount < 0 ||
        amount > 100_000_000
      ) {
        return json(res, 400, { error: 'Invalid gift details' });
      }

      const db = await initializeDatabase();
      await db.execute({
        sql: `INSERT INTO gifts (sender_name, bank, amount, currency, wish_message, created_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [senderName, bank, amount, currency, wishMessage, createdAt()],
      });
      return json(res, 201, { saved: true });
    }

    if (path === 'wishes') {
      if (req.method === 'GET') return json(res, 200, await listWishes());
      if (!requireMethod(req, res, 'POST')) return;
      if (!body) return json(res, 400, { error: 'Invalid request body' });

      const senderName = getString(body, 'sender_name', 120);
      const relationship = getString(body, 'relationship', 80);
      const message = getString(body, 'message', 2000);
      if (!senderName || relationship === null || !message) {
        return json(res, 400, { error: 'Invalid wish details' });
      }

      const db = await initializeDatabase();
      await db.execute({
        sql: `INSERT INTO wishes (sender_name, relationship, message, hearts, created_at)
              VALUES (?, ?, ?, 1, ?)`,
        args: [senderName, relationship, message, createdAt()],
      });
      return json(res, 201, { saved: true });
    }

    const heartMatch = path.match(/^wishes\/(\d+)\/heart$/);
    if (heartMatch) {
      if (!requireMethod(req, res, 'POST')) return;
      const id = Number(heartMatch[1]);
      const db = await initializeDatabase();
      const result = await db.execute({
        sql: 'UPDATE wishes SET hearts = hearts + 1 WHERE id = ? RETURNING hearts',
        args: [id],
      });
      if (!result.rows.length) return json(res, 404, { error: 'Wish not found' });
      return json(res, 200, { hearts: Number(result.rows[0].hearts) });
    }

    return json(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('API request failed:', error);
    return json(res, 500, { error: 'A server error occurred. Please try again later.' });
  }
}
