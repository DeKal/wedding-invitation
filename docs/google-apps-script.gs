/**
 * Google Apps Script web app for the wedding site.
 * Logs every action to ONE of TWO tabs:
 *
 *   "RSVP"      -> Xác nhận tham dự only. Columns: Timestamp | Name | Attending | Id
 *                  (upserted by Id so switching Có/Không updates the same row)
 *   "Hoạt động" -> wishes, gifts and bắn tim. Columns: Timestamp | Action | Name | Detail | Id
 *                    Lời chúc -> Detail = message
 *                    Tặng quà -> Detail = gift name
 *                    Bắn tim  -> Detail = ""
 *
 * SETUP (replace your current code with this, then redeploy a NEW version):
 *   Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy.
 *   Access must be "Anyone". URL stays the same.
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var d = JSON.parse(e.postData.contents);
  var when = d.ts ? new Date(Number(d.ts)) : new Date();

  if (d.type === 'rsvp') {
    var sh = sheet_(ss, 'RSVP', ['Timestamp', 'Name', 'Attending', 'Id']);
    var attending = d.attending === 'no' ? 'Không tham dự' : 'Có tham dự';
    upsert_(sh, 4, d.id, [when, d.name || '', attending, d.id || '']);
  } else {
    var sh2 = sheet_(ss, 'Hoạt động', ['Timestamp', 'Action', 'Name', 'Detail', 'Id']);
    sh2.appendRow([when, d.action || d.type || '', d.name || '', d.detail || '', d.id || '']);
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
