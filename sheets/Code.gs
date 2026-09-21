// GymHop waitlist → Google Sheet
// Setup: paste into Extensions > Apps Script, Deploy > New deployment > Web app
// (Execute as: Me, Access: Anyone), then put the URL in VITE_SHEETS_URL.
// Optional: set Script Property TOKEN to reject posts without ?token=...

var COLS = ['created_at', 'segment', 'barrier', 'workout_with', 'friend_freq', 'invite_interest', 'who_pays', 'group_book', 'frequency', 'time_slot', 'discovery', 'pain_point', 'pay_now', 'price_band', 'bundle_appeal', 'multi_gym_appeal', 'qr_ease', 'name', 'contact', 'district', 'referral_code', 'referred_by'];

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return out({ ok: true, service: 'GYMHOP-waitlist' });
}

function doPost(e) {
  try {
    var need = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (need && (!e || !e.parameter || e.parameter.token !== need)) {
      return out({ ok: false, error: 'forbidden' });
    }
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(COLS);
    var row = COLS.map(function (c) { return data[c] == null ? '' : String(data[c]); });

    // Dedupe by contact, else name (cols J and I). O(n) scan — fine until ~10k rows.
    var contactIdx = COLS.indexOf('contact');
    var nameIdx = COLS.indexOf('name');
    var key = String(data.contact || '').trim() || String(data.name || '').trim().toLowerCase();
    if (key) {
      var values = sheet.getDataRange().getValues();
      for (var r = 1; r < values.length; r++) {
        var existing = String(values[r][contactIdx] || '').trim() || String(values[r][nameIdx] || '').trim().toLowerCase();
        if (existing === key) {
          sheet.getRange(r + 1, 1, 1, COLS.length).setValues([row]);
          return out({ ok: true, updated: true });
        }
      }
    }
    sheet.appendRow(row);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}
