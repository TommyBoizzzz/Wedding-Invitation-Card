import type { IncomingMessage } from 'node:http';
import type { VercelRequest } from '@vercel/node';
import type { Plugin } from 'vite';
import type { ApiResponse } from '../api/index.js';

const MAX_BODY_BYTES = 1_000_000;

class LocalApiError extends Error {
  constructor(message: string, readonly statusCode: number) {
    super(message);
  }
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined;

  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) {
      throw new LocalApiError('Request body is too large', 413);
    }
    chunks.push(buffer);
  }

  if (!size) return undefined;
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
  } catch {
    throw new LocalApiError('Invalid JSON request body', 400);
  }
}

export function localApiPlugin(): Plugin {
  return {
    name: 'local-api-functions',
    configureServer(server) {
      server.middlewares.use('/api', (req, res, next) => {
        void (async () => {
          const route = (req.url || '/').split('?')[0].replace(/^\/+|\/+$/g, '');
          const body = await readJsonBody(req);
          const apiRequest = Object.assign(req, {
            url: `/api?path=${encodeURIComponent(route)}`,
            body,
          }) as VercelRequest;
          const { default: handler } = await import('../api/index.js');
          const apiResponse: ApiResponse = {
            setHeader(name, value) {
              res.setHeader(name, value);
              return this;
            },
            status(code) {
              res.statusCode = code;
              return this;
            },
            json(value) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(value));
              return this;
            },
            send(value) {
              res.end(value);
              return this;
            },
            end() {
              res.end();
              return this;
            },
          };
          await handler(apiRequest, apiResponse);
        })().catch(error => {
          if (res.headersSent) {
            next(error);
            return;
          }
          if (!(error instanceof LocalApiError)) {
            console.error('Local API request failed:', error);
          }
          res.statusCode = error instanceof LocalApiError ? error.statusCode : 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({
            error: error instanceof LocalApiError ? error.message : 'A server error occurred.',
          }));
        });
      });
    },
  };
}
