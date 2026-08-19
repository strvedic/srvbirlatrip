/**
 * Birla Planetarium Trip — Payment Click Logger
 *
 * SETUP:
 * 1. Create a new Google Sheet (any name, e.g. "Birla Trip Payment Log").
 * 2. Extensions > Apps Script. Delete any starter code and paste this file's contents in.
 * 3. Click Deploy > New deployment.
 *    - Select type: "Web app"
 *    - Description: "Payment log"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 4. Click Deploy, authorize when prompted, then copy the Web app URL
 *    (looks like https://script.google.com/macros/s/XXXXXXX/exec).
 * 5. Paste that URL into LOG_URL in site/app.js.
 *
 * Every time a parent taps "Pay ₹100 via UPI", a row is appended to a sheet
 * named "PaymentLog" (created automatically) with: Timestamp, Admission No,
 * Name, Class, UPI ID, Amount. This only records that the button was tapped
 * (i.e. the UPI app was opened) — it is NOT proof that money was received.
 * Use it as a checklist to cross-check against your bank/UPI statement,
 * where each student's unique UPI ID lets you match the actual credit.
 */

function doGet(e) {
  const action = e.parameter.action;

  if (action === "log") {
    const sheet = getLogSheet_();
    sheet.appendRow([
      new Date(),
      e.parameter.adm || "",
      e.parameter.name || "",
      e.parameter.class || "",
      e.parameter.upi || "",
      e.parameter.amount || "",
    ]);
    return jsonOutput_({ status: "ok" });
  }

  return jsonOutput_({ status: "error", message: "Unknown action" });
}

function getLogSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("PaymentLog");
  if (!sheet) {
    sheet = ss.insertSheet("PaymentLog");
    sheet.appendRow(["Timestamp", "Admission No", "Name", "Class", "UPI ID", "Amount"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
