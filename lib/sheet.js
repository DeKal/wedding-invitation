// Fire-and-forget mirror of each record to a Google Sheet via an Apps Script
// web app. Set SHEETS_WEBHOOK_URL to the deployed /exec URL. No-op if unset.
// Never throws — a Sheet outage must not break the API (Neon stays the source
// of truth).
//
// Derives a human-readable Action + Detail per record so the sheet can tell
// RSVP / wish / gift / bắn tim apart (gifts and bắn tim both arrive as 'gift').
export async function mirror(type, payload) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;

  let action = type;
  let detail = '';
  if (type === 'rsvp') {
    action = 'Xác nhận tham dự';
    detail = payload.attending === 'no' ? 'Không tham dự' : 'Có tham dự';
  } else if (type === 'wish') {
    action = 'Lời chúc';
    detail = payload.message || '';
  } else if (type === 'gift') {
    const isLove = payload.gkey === 'biubiu' || payload.label === 'Bắn tim';
    action = isLove ? 'Bắn tim' : 'Tặng quà';
    detail = isLove ? '' : (payload.label || '');
  }

  try {
    // Cap the request: a dead/slow Apps Script webhook must never hang the API
    // response. 4s is well above a healthy /exec round-trip; past that we give
    // up (Neon already holds the record).
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, action, detail, ...payload }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (e) {
    // swallow — mirroring is best-effort (timeout, network, non-2xx all ignored)
  }
}

