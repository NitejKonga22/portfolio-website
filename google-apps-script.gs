const SHEET_NAME = 'Responses';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Create a sheet named Responses first.');
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (_) { data = e.parameter || {}; }
  sheet.appendRow([data.name || '', data.email || '', data.message || '', new Date()]);
  return ContentService.createTextOutput(JSON.stringify({success:true})).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Create a sheet named Responses first.');
  const rows = sheet.getDataRange().getValues();
  const out = rows.slice(1).filter(r => r.some(v => v !== '')).map(r => ({
    name: r[0], email: r[1], message: r[2], timestamp: r[3]
  }));
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
