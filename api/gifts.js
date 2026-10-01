import { addGift, listGifts } from '../lib/store.js';
import { mirror } from '../lib/sheet.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const limit = Math.min(Number(req.query.limit) || 50, 200);
      const since = Number(req.query.since) || 0;
      const gifts = await listGifts(limit, since);
      return res.status(200).json({ gifts });
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const gkey = (body.gkey || '').toString().trim();
      const label = (body.label || '').toString().trim();
      const name = (body.name || '').toString().trim();
      if (!gkey) return res.status(400).json({ error: 'gkey required' });
      const entry = await addGift({
        id: cryptoId(),
        name,
        gkey,
        label,
        ts: Date.now(),
      });
      await mirror('gift', entry);
      return res.status(201).json({ gift: entry });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'server error' });
  }
}

async function readBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function cryptoId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
