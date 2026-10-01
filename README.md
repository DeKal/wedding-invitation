# Thiệp cưới 6 — Wedding Invitation (Vercel + Neon)

A self-contained clone of the "Thiệp cưới 6" wedding invitation page, deployable to
Vercel, with a **Neon Postgres** backend so guest wishes and reactions persist.

## Structure

```
public/            Static site (index.html + localized assets, fonts, music)
api/
  wishes.js        GET  /api/wishes       -> list wishes
                   POST /api/wishes        -> add a wish {name, message}
  reactions.js     GET  /api/reactions     -> {like, heart, gift} counts
                   POST /api/reactions     -> increment {type}
lib/store.js       Storage layer: Neon Postgres, in-memory fallback if no DB
vercel.json        Static + serverless config
```

## Backend: Neon Postgres

1. Create a project at https://neon.tech and copy the connection string
   (looks like `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`).
2. Set it as the `DATABASE_URL` environment variable:
   - **Vercel:** Project → Settings → Environment Variables → add `DATABASE_URL`.
   - **Local:** create `.env` with `DATABASE_URL=...` (used by `vercel dev`).
3. Tables (`wishes`, `reactions`) are created automatically on first API call.

If `DATABASE_URL` is absent the app still runs using a non-persistent in-memory
store, so you can preview the UI without a database.

## Deploy

```bash
npm install
npx vercel          # preview
npx vercel --prod   # production
```

Or connect the GitHub repo in the Vercel dashboard and set `DATABASE_URL`.

## Local dev

```bash
npm install
npx vercel dev      # serves static + /api together on http://localhost:3000
```

To preview just the static page without the API:

```bash
cd public && python3 -m http.server 8096
```

## Notes

- The page is a static capture (the original site's React/Next.js bundle is not
  included). Interactivity (wishes, reactions, hearts, music, scroll reveals) is
  re-implemented with vanilla JS in `public/index.html`.
- Reaction types: `like`, `heart` (bắn tim), `gift`.
