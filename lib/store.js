// Storage layer backed by Neon Postgres (serverless driver).
// Uses process.env.DATABASE_URL when present; otherwise falls back to a
// module-level in-memory store so the app still runs locally without a DB.
//
// Neon setup: create a project at https://neon.tech, copy the connection
// string into the DATABASE_URL env var (Vercel: Project Settings > Env Vars).

let sql = null;
let driverReady = false;
let schemaReady = null;

async function getSql() {
  if (driverReady) return sql;
  driverReady = true;
  if (!process.env.DATABASE_URL) return (sql = null);
  try {
    const { neon } = await import('@neondatabase/serverless');
    sql = neon(process.env.DATABASE_URL);
  } catch (e) {
    sql = null;
  }
  return sql;
}

async function ensureSchema(client) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await client`
        CREATE TABLE IF NOT EXISTS wishes (
          id      TEXT PRIMARY KEY,
          name    TEXT NOT NULL DEFAULT '',
          message TEXT NOT NULL,
          ts      BIGINT NOT NULL
        )`;
      await client`
        CREATE TABLE IF NOT EXISTS reactions (
          type  TEXT PRIMARY KEY,
          count BIGINT NOT NULL DEFAULT 0
        )`;
    })();
  }
  return schemaReady;
}

// ---- in-memory fallback (non-persistent) ----
const mem = {
  wishes: [],
  reactions: { like: 0, heart: 0, gift: 0 },
};

const MAX_WISHES = 500;
const TYPES = ['like', 'heart', 'gift'];

export async function addWish(wish) {
  const entry = {
    id: wish.id,
    name: (wish.name || '').slice(0, 60),
    message: (wish.message || '').slice(0, 500),
    ts: wish.ts,
  };
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    await client`
      INSERT INTO wishes (id, name, message, ts)
      VALUES (${entry.id}, ${entry.name}, ${entry.message}, ${entry.ts})`;
  } else {
    mem.wishes.unshift(entry);
    if (mem.wishes.length > MAX_WISHES) mem.wishes.length = MAX_WISHES;
  }
  return entry;
}

export async function listWishes(limit = 100) {
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    const rows = await client`
      SELECT id, name, message, ts
      FROM wishes
      ORDER BY ts DESC
      LIMIT ${limit}`;
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      message: r.message,
      ts: Number(r.ts),
    }));
  }
  return mem.wishes.slice(0, limit);
}

export async function incrReaction(type) {
  if (!TYPES.includes(type)) throw new Error('invalid reaction type');
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    const rows = await client`
      INSERT INTO reactions (type, count)
      VALUES (${type}, 1)
      ON CONFLICT (type) DO UPDATE SET count = reactions.count + 1
      RETURNING count`;
    return Number(rows[0].count);
  }
  mem.reactions[type] = (mem.reactions[type] || 0) + 1;
  return mem.reactions[type];
}

export async function getReactions() {
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    const rows = await client`SELECT type, count FROM reactions`;
    const out = { like: 0, heart: 0, gift: 0 };
    for (const r of rows) out[r.type] = Number(r.count);
    return out;
  }
  return { ...mem.reactions };
}
