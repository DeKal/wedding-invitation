# Thiệp cưới 6 — Wedding Invitation (Next.js + Neon)

A self-contained clone of the "Thiệp cưới 6" wedding invitation page, built as a
**Next.js** app with a **Neon Postgres** backend so guest wishes, reactions and
gifts persist.

## Structure

```
public/
  invitation.html   The built invitation page (served at / via a rewrite)
  assets/           Localized assets: fonts, images, music
pages/api/
  wishes.js         GET  /api/wishes      -> list wishes
                    POST /api/wishes       -> add a wish {name, message}
  reactions.js      GET  /api/reactions    -> {like, heart, gift} counts
                    POST /api/reactions     -> increment {type}
  rsvps.js          GET/POST /api/rsvps     -> list / add RSVP
  gifts.js          GET/POST /api/gifts     -> list / add gift
lib/store.js        Storage layer: Neon Postgres, in-memory fallback if no DB
lib/sheet.js        Best-effort mirror of each record to a Google Sheet
next.config.mjs     Root rewrite to invitation.html + asset cache headers
```

The invitation page is a pre-built static document, so its inline scripts and
styled-jsx run unchanged. `next.config.mjs` rewrites `/` to
`public/invitation.html`; relative `assets/...` and `api/...` references resolve
as expected.

## Backend: Neon Postgres

1. Create a project at https://neon.tech and copy the connection string
   (looks like `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`).
2. Set it as the `DATABASE_URL` environment variable:
   - **Vercel:** Project → Settings → Environment Variables → add `DATABASE_URL`.
   - **Local:** create `.env` with `DATABASE_URL=...` (loaded automatically by Next).
3. Tables are created automatically on first API call.

Optionally set `SHEETS_WEBHOOK_URL` to mirror records to a Google Sheet.

If `DATABASE_URL` is absent the app still runs using a non-persistent in-memory
store, so you can preview the UI without a database.

## Local dev

```bash
npm install
npm run dev         # http://localhost:3000
```

## Build & run

```bash
npm run build
npm run start
```

## Deploy

Connect the GitHub repo in the Vercel dashboard (framework preset: Next.js) and
set `DATABASE_URL`. Vercel builds with `next build` automatically.

## Notes

- The page is a static capture of the original site's React/Next.js output.
  Interactivity (wishes, reactions, hearts, music, scroll reveals, auto-scroll)
  is driven by vanilla JS embedded in `public/invitation.html`.
- Reaction types: `like`, `heart` (bắn tim), `gift`.
