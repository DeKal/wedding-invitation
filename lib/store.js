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
      await client`
        CREATE TABLE IF NOT EXISTS gifts (
          id    TEXT PRIMARY KEY,
          name  TEXT NOT NULL DEFAULT '',
          gkey  TEXT NOT NULL,
          label TEXT NOT NULL DEFAULT '',
          ts    BIGINT NOT NULL
        )`;
      await client`
        CREATE TABLE IF NOT EXISTS rsvps (
          id        TEXT PRIMARY KEY,
          name      TEXT NOT NULL DEFAULT '',
          attending TEXT NOT NULL DEFAULT 'yes',
          ts        BIGINT NOT NULL
        )`;
    })();
  }
  return schemaReady;
}

// ---- in-memory fallback (non-persistent) ----
const mem = {
  wishes: [],
  reactions: { like: 0, heart: 0, gift: 0 },
  gifts: [],
  rsvps: [],
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

const MAX_GIFTS = 500;

export async function addGift(gift) {
  const entry = {
    id: gift.id,
    name: (gift.name || '').slice(0, 60),
    gkey: (gift.gkey || '').slice(0, 60),
    label: (gift.label || '').slice(0, 80),
    ts: gift.ts,
  };
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    await client`
      INSERT INTO gifts (id, name, gkey, label, ts)
      VALUES (${entry.id}, ${entry.name}, ${entry.gkey}, ${entry.label}, ${entry.ts})`;
  } else {
    mem.gifts.unshift(entry);
    if (mem.gifts.length > MAX_GIFTS) mem.gifts.length = MAX_GIFTS;
  }
  return entry;
}

// Returns recent gifts ordered oldest->newest. `since` (ms epoch) filters to
// gifts strictly newer than it (used for broadcast polling).
export async function listGifts(limit = 50, since = 0) {
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    const rows = await client`
      SELECT id, name, gkey, label, ts
      FROM gifts
      WHERE ts > ${since}
      ORDER BY ts DESC
      LIMIT ${limit}`;
    return rows
      .map((r) => ({ id: r.id, name: r.name, gkey: r.gkey, label: r.label, ts: Number(r.ts) }))
      .reverse();
  }
  return mem.gifts
    .filter((g) => g.ts > since)
    .slice(0, limit)
    .reverse();
}

const MAX_RSVPS = 1000;

// Insert or update an RSVP. Keyed by id so a guest can switch their answer
// (yes/no) by re-submitting with the same client-held id.
export async function addRsvp(rsvp) {
  const entry = {
    id: rsvp.id,
    name: (rsvp.name || '').slice(0, 60),
    attending: rsvp.attending === 'no' ? 'no' : 'yes',
    ts: rsvp.ts,
  };
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    await client`
      INSERT INTO rsvps (id, name, attending, ts)
      VALUES (${entry.id}, ${entry.name}, ${entry.attending}, ${entry.ts})
      ON CONFLICT (id) DO UPDATE
        SET name = ${entry.name}, attending = ${entry.attending}, ts = ${entry.ts}`;
  } else {
    const i = mem.rsvps.findIndex((r) => r.id === entry.id);
    if (i >= 0) mem.rsvps[i] = entry;
    else {
      mem.rsvps.unshift(entry);
      if (mem.rsvps.length > MAX_RSVPS) mem.rsvps.length = MAX_RSVPS;
    }
  }
  return entry;
}

export async function listRsvps(limit = 500) {
  const client = await getSql();
  if (client) {
    await ensureSchema(client);
    const rows = await client`
      SELECT id, name, attending, ts
      FROM rsvps
      ORDER BY ts DESC
      LIMIT ${limit}`;
    return rows.map((r) => ({ id: r.id, name: r.name, attending: r.attending, ts: Number(r.ts) }));
  }
  return mem.rsvps.slice(0, limit);
}
