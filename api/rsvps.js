import { addRsvp, listRsvps } from '../lib/store.js';
import { mirror } from '../lib/sheet.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const limit = Math.min(Number(req.query.limit) || 500, 1000);
      const rsvps = await listRsvps(limit);
      return res.status(200).json({ rsvps });
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const name = (body.name || '').toString().trim();
      const attending = body.attending === 'no' ? 'no' : 'yes';
      const id = (body.id || '').toString().trim() || cryptoId();
      if (!name) return res.status(400).json({ error: 'name required' });
      const entry = await addRsvp({ id, name, attending, ts: Date.now() });
      await mirror('rsvp', entry);
      return res.status(201).json({ rsvp: entry });
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
