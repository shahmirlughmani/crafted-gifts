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
 * This writes one row to the "Orders" sheet, saves the payment screenshot
 * into a Drive folder with a link in the row, and emails the owner.
 *
 * After pasting, run `setup` once from the editor: it builds the Status
 * dropdown, colours, column layout and a Summary tab, and asks for the mail
 * permission. Then Deploy -> Manage deployments -> pencil -> New version.
 */

var SHEET_NAME = "Orders";
var SUMMARY_NAME = "Summary";
var FOLDER_NAME = "Crafted Gifts - Payment Screenshots";

/** Order statuses, in the order they appear in the dropdown, with a colour. */
var STATUSES = [
  { name: "Pending Verification", bg: "#fde2e1", fg: "#8a1c1c" },
  { name: "Paid", bg: "#fff3cd", fg: "#7a5200" },
  { name: "In Progress", bg: "#dbe9ff", fg: "#0b3d91" },
  { name: "Delivered", bg: "#d9f2e3", fg: "#0f5132" },
  { name: "Cancelled", bg: "#e9ecef", fg: "#495057" },
];

/**
 * Who gets an email when an order lands. Empty = the account that owns the
 * script (the one it was deployed as). Add more addresses to the list to
 * copy someone else, e.g. ["craftedgiftsbys@gmail.com"].
 */
var NOTIFY_EXTRA = [];

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

    try {
      notify_(o, c, shotUrl);
    } catch (mailErr) {
      // The row is already saved; a mail failure must not fail the order.
      console.error("notify failed: " + mailErr);
    }

    return json_({ ok: true, orderId: o.orderId || "" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * Run this ONCE from the editor (pick "setup" in the function dropdown and
 * press Run). It builds the Status dropdown with colours, freezes and sizes
 * the columns, and adds a Summary tab with live counts. Safe to run again.
 */
function setup() {
  var sheet = getSheet_();
  var statusCol = HEADERS.indexOf("Status") + 1;
  var lastCol = HEADERS.length;
  var body = sheet.getMaxRows() - 1;

  // Dropdown on the whole Status column below the header.
  var range = sheet.getRange(2, statusCol, body, 1);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUSES.map(function (st) { return st.name; }), true)
    .setAllowInvalid(false)
    .setHelpText("Pick the order's current status")
    .build();
  range.setDataValidation(rule);

  // One colour per status, replacing any rules we set before on that column.
  var keep = sheet.getConditionalFormatRules().filter(function (r) {
    var rs = r.getRanges();
    return !(rs.length === 1 && rs[0].getColumn() === statusCol);
  });
  STATUSES.forEach(function (st) {
    keep.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(st.name)
        .setBackground(st.bg)
        .setFontColor(st.fg)
        .setRanges([range])
        .build()
    );
  });
  sheet.setConditionalFormatRules(keep);

  // Layout: frozen header, sensible widths, dates and money formatted.
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, lastCol).setFontWeight("bold").setBackground("#f3efe6");
  var widths = [150, 140, 170, 160, 120, 110, 260, 200, 320, 90, 80, 90, 110, 260];
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  sheet.getRange(2, HEADERS.indexOf("Received") + 1, body, 1).setNumberFormat("dd/mm/yyyy hh:mm");
  ["Subtotal", "Delivery", "Total"].forEach(function (h) {
    sheet.getRange(2, HEADERS.indexOf(h) + 1, body, 1).setNumberFormat("#,##0");
  });

  // Summary tab with live counts and takings per status.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sum = ss.getSheetByName(SUMMARY_NAME) || ss.insertSheet(SUMMARY_NAME);
  sum.clear();
  var sCol = colLetter_(statusCol);
  var tCol = colLetter_(HEADERS.indexOf("Total") + 1);
  var rows = [["Status", "Orders", "Value (Rs.)"]];
  STATUSES.forEach(function (st) {
    rows.push([
      st.name,
      "=COUNTIF(" + SHEET_NAME + "!" + sCol + ":" + sCol + ",\"" + st.name + "\")",
      "=SUMIF(" + SHEET_NAME + "!" + sCol + ":" + sCol + ",\"" + st.name + "\"," + SHEET_NAME + "!" + tCol + ":" + tCol + ")",
    ]);
  });
  rows.push([
    "All orders",
    "=COUNTA(" + SHEET_NAME + "!A:A)-1",
    "=SUM(" + SHEET_NAME + "!" + tCol + ":" + tCol + ")",
  ]);
  sum.getRange(1, 1, rows.length, 3).setValues(rows);
  sum.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#f3efe6");
  sum.getRange(rows.length, 1, 1, 3).setFontWeight("bold");
  sum.getRange(2, 3, rows.length - 1, 1).setNumberFormat("#,##0");
  sum.setColumnWidth(1, 180);
  sum.setColumnWidth(2, 90);
  sum.setColumnWidth(3, 120);
  STATUSES.forEach(function (st, i) {
    sum.getRange(i + 2, 1).setBackground(st.bg).setFontColor(st.fg);
  });

  // Ask for the mail permission now rather than on the first real order.
  MailApp.getRemainingDailyQuota();
}

function colLetter_(n) {
  var s = "";
  while (n > 0) {
    var m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function notify_(o, c, shotUrl) {
  var to = [Session.getEffectiveUser().getEmail()].concat(NOTIFY_EXTRA).join(",");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var money = function (n) { return "Rs. " + Number(n || 0).toLocaleString("en-PK"); };
  var items = (o.items || []).map(function (it) {
    var d = it.details && it.details.length ? " (" + it.details.join(", ") + ")" : "";
    return "  - " + it.name + " x" + it.qty + d + " - " + money(it.price * it.qty);
  }).join("\n") || "  " + (o.itemsText || "");
  var phone = String(c.phone || "").replace(/\D/g, "").replace(/^0/, "");

  var subject = "New order " + (o.orderId || "") + " - " + (c.name || "") + " - " + money(o.total);
  var text =
    "New order on Crafted Gifts by S\n\n" +
    "Order:    " + (o.orderId || "") + "\n" +
    "Status:   " + (o.status || "Pending Verification") + "\n\n" +
    "Customer: " + (c.name || "") + "\n" +
    "Phone:    " + (c.phone || "") + "\n" +
    "City:     " + (c.city || "") + "\n" +
    "Address:  " + (c.address || "") + "\n" +
    (c.note ? "Note:     " + c.note + "\n" : "") +
    "\nItems:\n" + items + "\n\n" +
    "Subtotal: " + money(o.subtotal) + "\n" +
    "Delivery: " + (o.delivery === null || o.delivery === undefined ? "to be quoted" : money(o.delivery)) + "\n" +
    "Total:    " + money(o.total) + "\n\n" +
    "Payment:  " + (o.paymentMethod || "") + "\n" +
    "Screenshot: " + (shotUrl || "none uploaded") + "\n\n" +
    "Open the sheet: " + ss.getUrl() + "\n" +
    (phone ? "WhatsApp the customer: https://wa.me/92" + phone + "\n" : "");

  MailApp.sendEmail({ to: to, subject: subject, body: text, name: "Crafted Gifts orders" });
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
