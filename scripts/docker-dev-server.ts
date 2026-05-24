import 'dotenv/config';
import { createServer as createHttpServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { parse as parseUrl } from 'node:url';
import { createServer as createViteServer } from 'vite';

import adminAuth from '../api/admin/auth.js';
import adminContent from '../api/admin/content.js';
import contact from '../api/contact.js';

type ApiHandler = (req: any, res: any) => Promise<void> | void;

const handlers: Record<string, ApiHandler> = {
  '/api/admin/auth': adminAuth,
  '/api/admin/content': adminContent,
  '/api/contact': contact,
};

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const text = Buffer.concat(chunks).toString('utf8');
  if (!text) return undefined;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function createApiResponse(res: ServerResponse) {
  return {
    status(code: number) {
      res.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      res.end(JSON.stringify(payload));
    },
    send(payload: unknown) {
      res.end(typeof payload === 'string' ? payload : JSON.stringify(payload));
    },
    setHeader(name: string, value: number | string | readonly string[]) {
      res.setHeader(name, value);
    },
    getHeader(name: string) {
      return res.getHeader(name);
    },
    end(payload?: unknown) {
      res.end(payload);
    },
  };
}

async function main() {
  const vite = await createViteServer({
    server: { middlewareMode: true, host: '0.0.0.0' },
    appType: 'spa',
  });

  const server = createHttpServer(async (req, res) => {
    const parsed = parseUrl(req.url ?? '/', true);
    const pathname = parsed.pathname ?? '/';
    const handler = handlers[pathname];

    if (handler) {
      try {
        const body = await readJsonBody(req);
        const apiReq = Object.assign(req, {
          body,
          query: parsed.query,
        });

        await handler(apiReq, createApiResponse(res));
      } catch (err) {
        console.error(`API ${req.method} ${pathname} failed`, err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
        }
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
      return;
    }

    vite.middlewares(req, res, (err) => {
      if (err) {
        vite.ssrFixStacktrace(err);
        console.error(err);
        res.statusCode = 500;
        res.end(err.message);
      }
    });
  });

  const port = Number(process.env.PORT ?? 5173);
  server.listen(port, '0.0.0.0', () => {
    console.log(`Portfolio CMS ready on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
