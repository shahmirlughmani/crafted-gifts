/**
 * Crafted Gifts by S — order receiver.
 *
 * Paste this whole file into the Apps Script project that is bound to the
 * orders Google Sheet (Sheet → Extensions → Apps Script), replacing whatever
 * is there. Then Deploy → New deployment → Web app → Execute as: Me →
 * Who has access: Anyone → Deploy, and put the Web app URL into
 * `CONFIG.scriptUrl` in src/lib/config.ts.
 *
 * The site POSTs one JSON object per order (see Checkout.tsx `payload`).
 * This writes one row to the "Orders" sheet and saves the payment screenshot
 * into a Drive folder, with a link to it in the row.
 */

var SHEET_NAME = "Orders";
var FOLDER_NAME = "Crafted Gifts - Payment Screenshots";

var HEADERS = [
  "Order ID",
  "Received",
  "Status",
  "Name",
  "Phone",
  "City",
  "Address",
  "Note",
  "Items",
  "Subtotal",
  "Delivery",
  "Total",
  "Payment",
  "Screenshot",
];

function doPost(e) {
  try {
    var body = (e && e.postData && e.postData.contents) || "{}";
    var o = JSON.parse(body);

    var sheet = getSheet_();
    var shotUrl = saveScreenshot_(o);
    var c = o.customer || {};

    sheet.appendRow([
      o.orderId || "",
      o.timestamp ? new Date(o.timestamp) : new Date(),
      o.status || "Pending Verification",
      c.name || "",
      "'" + (c.phone || ""), // keep leading zero / plus sign
      c.city || "",
      c.address || "",
      c.note || "",
      o.itemsText || "",
      Number(o.subtotal) || 0,
      o.delivery === null || o.delivery === undefined ? "" : Number(o.delivery),
      Number(o.total) || 0,
      o.paymentMethod || "",
      shotUrl,
    ]);

    return json_({ ok: true, orderId: o.orderId || "" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Lets you open the URL in a browser to check the deployment is reachable. */
function doGet() {
  return json_({ ok: true, service: "crafted-gifts-orders" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveScreenshot_(o) {
  var data = o.screenshot || "";
  if (!data) return "";
  try {
    // data:image/png;base64,AAAA...
    var m = data.match(/^data:([^;]+);base64,(.*)$/);
    var mime = m ? m[1] : "image/png";
    var b64 = m ? m[2] : data;
    var ext = (mime.split("/")[1] || "png").replace("jpeg", "jpg");
    var name = (o.orderId || "order") + "." + ext;
    var blob = Utilities.newBlob(Utilities.base64Decode(b64), mime, name);
    var file = getFolder_().createFile(blob);
    return file.getUrl();
  } catch (err) {
    return "screenshot failed: " + err;
  }
}

function getFolder_() {
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
