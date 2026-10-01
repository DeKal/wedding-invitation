// Minimal local dev server: serves public/ statically and routes /api/* to the
// Vercel-style handlers in api/, against the real DATABASE_URL from .env.
// No external deps, no login required.  Run:  node dev-server.mjs  [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, 'public');
const PORT = Number(process.argv[2]) || 8097;

// load .env (DATABASE_URL etc.)
try {
  const env = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch (e) {
  console.warn('no .env found — API will use in-memory store');
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.gif': 'image/gif',
};

// Adapt node req/res to the Vercel handler shape.
function adapt(req, res) {
  const u = new URL(req.url, 'http://localhost');
  req.query = Object.fromEntries(u.searchParams.entries());
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (o) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(o)); };
  return u;
}

const handlers = {
  '/api/wishes': () => import('./api/wishes.js'),
  '/api/reactions': () => import('./api/reactions.js'),
  '/api/gifts': () => import('./api/gifts.js'),
  '/api/rsvps': () => import('./api/rsvps.js'),
};

const server = http.createServer(async (req, res) => {
  const u = adapt(req, res);
  const route = handlers[u.pathname];
  if (route) {
    try {
      const mod = await route();
      await mod.default(req, res);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) res.status(500).json({ error: 'server error' });
    }
    return;
  }
  // static
  let rel = decodeURIComponent(u.pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const fp = path.join(PUBLIC, path.normalize(rel));
  if (!fp.startsWith(PUBLIC)) { res.statusCode = 403; return res.end('forbidden'); }
  fs.readFile(fp, (err, data) => {
    if (err) { res.statusCode = 404; return res.end('not found'); }
    res.setHeader('content-type', MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream');
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('dev server: http://localhost:' + PORT + (process.env.DATABASE_URL ? '  (Neon DB connected)' : '  (in-memory store)'));
});
