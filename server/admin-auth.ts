import { createHmac, timingSafeEqual } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const COOKIE_NAME = 'wedding_admin_session';
const SESSION_MAX_AGE_SECONDS = 2_147_483_647;

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must contain at least 32 characters');
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
}

export function verifyAdminPin(pin: unknown): boolean {
  const expectedPin = process.env.ADMIN_PIN;
  if (!expectedPin || expectedPin.length < 12) {
    throw new Error('ADMIN_PIN must contain at least 12 characters');
  }
  return typeof pin === 'string' && pin === expectedPin;
}

export function getAdminLoginIpHash(req: VercelRequest): string {
  const realIp = req.headers['x-real-ip'];
  const forwardedIp = req.headers['x-forwarded-for'];
  const ip = typeof realIp === 'string'
    ? realIp
    : typeof forwardedIp === 'string'
      ? forwardedIp.split(',')[0].trim()
      : 'unknown';
  return createHmac('sha256', sessionSecret()).update(ip).digest('hex');
}

export function createAdminCookie(): string {
  const payload = Buffer.from(JSON.stringify({ version: 1 })).toString('base64url');
  const value = `${payload}.${sign(payload)}`;
  return `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=${SESSION_MAX_AGE_SECONDS}`;
}

export function clearAdminCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=0`;
}

export function hasAdminSession(req: VercelRequest): boolean {
  const cookie = req.headers.cookie
    ?.split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;

  const value = cookie.slice(COOKIE_NAME.length + 1);
  const separator = value.lastIndexOf('.');
  if (separator < 1) return false;

  const payload = value.slice(0, separator);
  const providedSignature = Buffer.from(value.slice(separator + 1), 'base64url');
  const expectedSignature = Buffer.from(sign(payload), 'base64url');
  if (
    providedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(providedSignature, expectedSignature)
  ) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { version?: unknown };
    return session.version === 1;
  } catch {
    return false;
  }
}
