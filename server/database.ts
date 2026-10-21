import { createClient, type Client, type Row } from '@libsql/client';

let client: Client | null = null;
let initialization: Promise<void> | null = null;

export interface LegacyDatabase {
  gifts: Array<{
    id: number;
    sender_name: string;
    bank: 'ABA' | 'ACLEDA';
    amount: number;
    currency: 'USD' | 'KHR';
    wish_message: string;
    created_at: string;
  }>;
  wishes: Array<{
    id: number;
    sender_name: string;
    relationship: string;
    message: string;
    hearts: number;
    created_at: string;
  }>;
}

export function getDatabase(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be configured');
  }

  client = createClient({ url, authToken });
  return client;
}

export async function initializeDatabase(): Promise<Client> {
  const db = getDatabase();
  if (!initialization) {
    initialization = (async () => {
      await db.batch([
        'DROP TABLE IF EXISTS rsvps',
        `CREATE TABLE IF NOT EXISTS wishes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender_name TEXT NOT NULL,
          relationship TEXT NOT NULL DEFAULT 'មិត្តភក្តិ',
          message TEXT NOT NULL,
          hearts INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS gifts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender_name TEXT NOT NULL,
          bank TEXT NOT NULL CHECK (bank IN ('ABA', 'ACLEDA')),
          amount REAL NOT NULL DEFAULT 0,
          currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'KHR')),
          wish_message TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS app_metadata (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS admin_login_attempts (
          ip_hash TEXT PRIMARY KEY,
          failures INTEGER NOT NULL,
          window_started_at INTEGER NOT NULL
        )`,
      ], 'write');
    })().catch(error => {
      initialization = null;
      throw error;
    });
  }

  await initialization;
  return db;
}

export async function importLegacyDatabase(data: LegacyDatabase, importToken: string): Promise<boolean> {
  const db = await initializeDatabase();
  const statements = [
    {
      sql: `INSERT INTO app_metadata (key, value)
            SELECT 'legacy_import', ?
            WHERE NOT EXISTS (SELECT 1 FROM app_metadata WHERE key = 'legacy_import')
              AND NOT EXISTS (SELECT 1 FROM gifts)
              AND NOT EXISTS (SELECT 1 FROM wishes)`,
      args: [importToken],
    },
    ...data.gifts.map(row => ({
      sql: `INSERT INTO gifts (id, sender_name, bank, amount, currency, wish_message, created_at)
            SELECT ?, ?, ?, ?, ?, ?, ?
            WHERE EXISTS (SELECT 1 FROM app_metadata WHERE key = 'legacy_import' AND value = ?)`,
      args: [row.id, row.sender_name, row.bank, row.amount, row.currency, row.wish_message, row.created_at, importToken],
    })),
    ...data.wishes.map(row => ({
      sql: `INSERT INTO wishes (id, sender_name, relationship, message, hearts, created_at)
            SELECT ?, ?, ?, ?, ?, ?
            WHERE EXISTS (SELECT 1 FROM app_metadata WHERE key = 'legacy_import' AND value = ?)`,
      args: [row.id, row.sender_name, row.relationship, row.message, row.hearts, row.created_at, importToken],
    })),
  ];
  const result = await db.batch(statements, 'write');
  return Number(result[0].rowsAffected) === 1;
}

export async function isAdminLoginRateLimited(ipHash: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.execute({
    sql: 'SELECT failures, window_started_at FROM admin_login_attempts WHERE ip_hash = ?',
    args: [ipHash],
  });
  const row = result.rows[0];
  if (!row) return false;

  const windowStartedAt = Number(row.window_started_at);
  if (Date.now() / 1000 - windowStartedAt >= 15 * 60) {
    await db.execute({ sql: 'DELETE FROM admin_login_attempts WHERE ip_hash = ?', args: [ipHash] });
    return false;
  }
  return Number(row.failures) >= 5;
}

export async function recordAdminLoginFailure(ipHash: string): Promise<void> {
  const db = await initializeDatabase();
  const now = Math.floor(Date.now() / 1000);
  await db.batch([
    {
      sql: 'DELETE FROM admin_login_attempts WHERE window_started_at <= ? - 900',
      args: [now],
    },
    {
      sql: `INSERT INTO admin_login_attempts (ip_hash, failures, window_started_at)
          VALUES (?, 1, ?)
          ON CONFLICT(ip_hash) DO UPDATE SET
            failures = CASE
              WHEN window_started_at <= ? - 900 THEN 1
              ELSE failures + 1
            END,
            window_started_at = CASE
              WHEN window_started_at <= ? - 900 THEN ?
              ELSE window_started_at
            END`,
      args: [ipHash, now, now, now, now],
    },
  ], 'write');
}

export async function clearAdminLoginFailures(ipHash: string): Promise<void> {
  const db = await initializeDatabase();
  await db.execute({ sql: 'DELETE FROM admin_login_attempts WHERE ip_hash = ?', args: [ipHash] });
}

function text(row: Row, key: string): string {
  return String(row[key] ?? '');
}

function numeric(row: Row, key: string): number {
  return Number(row[key] ?? 0);
}

export async function listGifts() {
  const db = await initializeDatabase();
  const result = await db.execute(
    'SELECT id, sender_name, bank, amount, currency, wish_message, created_at FROM gifts ORDER BY id DESC',
  );
  return result.rows.map(row => ({
    id: numeric(row, 'id'),
    sender_name: text(row, 'sender_name'),
    bank: text(row, 'bank'),
    amount: numeric(row, 'amount'),
    currency: text(row, 'currency'),
    wish_message: text(row, 'wish_message'),
    created_at: text(row, 'created_at'),
  }));
}

export async function listWishes() {
  const db = await initializeDatabase();
  const result = await db.execute(
    'SELECT id, sender_name, relationship, message, hearts, created_at FROM wishes ORDER BY id DESC',
  );
  return result.rows.map(row => ({
    id: numeric(row, 'id'),
    sender_name: text(row, 'sender_name'),
    relationship: text(row, 'relationship'),
    message: text(row, 'message'),
    hearts: numeric(row, 'hearts'),
    created_at: text(row, 'created_at'),
  }));
}

export async function deleteGift(id: number): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.execute({ sql: 'DELETE FROM gifts WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

export async function deleteWish(id: number): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.execute({ sql: 'DELETE FROM wishes WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

export async function deleteAllAdminData(): Promise<{ gifts: number; wishes: number }> {
  const db = await initializeDatabase();
  const results = await db.batch([
    'DELETE FROM gifts',
    'DELETE FROM wishes',
  ], 'write');
  return {
    gifts: Number(results[0].rowsAffected),
    wishes: Number(results[1].rowsAffected),
  };
}
