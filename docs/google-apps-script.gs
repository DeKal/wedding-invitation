/**
 * Google Apps Script web app that receives RSVP / wish / gift records from the
 * wedding site and appends them to tabs in THIS spreadsheet.
 *
 * SETUP
 * 1. Create a Google Sheet.
 * 2. Extensions > Apps Script. Delete the default code, paste this file.
 * 3. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the Web app URL (ends in /exec).
 * 4. Put that URL in the SHEETS_WEBHOOK_URL env var:
 *      - Local: add to clone-2-vercel/.env
 *      - Vercel: Project Settings > Environment Variables
 * 5. Redeploy the site (or restart dev-server). Done.
 *
 * Tabs (auto-created with headers on first write):
 *   RSVP   : Timestamp | Name | Attending | Id   (upserted by Id so switching
 *            yes/no updates the same row instead of duplicating)
 *   Wishes : Timestamp | Name | Message | Id
 *   Gifts  : Timestamp | Name | Gift | GiftKey | Id
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var d = JSON.parse(e.postData.contents);
  var when = d.ts ? new Date(Number(d.ts)) : new Date();

  if (d.type === 'rsvp') {
    var sh = sheet_(ss, 'RSVP', ['Timestamp', 'Name', 'Attending', 'Id']);
    upsert_(sh, 4, d.id, [when, d.name || '', d.attending || '', d.id || '']);
  } else if (d.type === 'wish') {
    sheet_(ss, 'Wishes', ['Timestamp', 'Name', 'Message', 'Id'])
      .appendRow([when, d.name || '', d.message || '', d.id || '']);
  } else if (d.type === 'gift') {
    sheet_(ss, 'Gifts', ['Timestamp', 'Name', 'Gift', 'GiftKey', 'Id'])
      .appendRow([when, d.name || '', d.label || '', d.gkey || '', d.id || '']);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
  }
  return sh;
}

// Update the row whose column `idCol` (1-based) matches `id`; else append.
function upsert_(sh, idCol, id, row) {
  if (id && sh.getLastRow() > 1) {
    var vals = sh.getRange(2, idCol, sh.getLastRow() - 1, 1).getValues();
    for (var i = 0; i < vals.length; i++) {
      if (vals[i][0] === id) {
        sh.getRange(i + 2, 1, 1, row.length).setValues([row]);
        return;
      }
    }
  }
  sh.appendRow(row);
}
