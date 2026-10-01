// Fire-and-forget mirror of each record to a Google Sheet via an Apps Script
// web app. Set SHEETS_WEBHOOK_URL to the deployed /exec URL. No-op if unset.
// Never throws — a Sheet outage must not break the API (Neon stays the source
// of truth).
export async function mirror(type, payload) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...payload }),
    });
  } catch (e) {
    // swallow — mirroring is best-effort
  }
}
