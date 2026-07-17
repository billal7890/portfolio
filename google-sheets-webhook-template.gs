/*
  Google Sheets webhook for Billal Javed portfolio contact submissions.

  Setup:
  1. Create a Google Sheet.
  2. Open Extensions > Apps Script.
  3. Paste this file into Apps Script.
  4. Replace SHEET_ID with your Google Sheet ID.
  5. Deploy > New deployment > Web app.
  6. Execute as: Me.
  7. Who has access: Anyone.
  8. Copy the Web app URL.
  9. Add this hidden input inside contact.html form:
     <input type="hidden" name="_webhook" value="YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL">

  FormSubmit will send the submission to the webhook after each form submission.
*/

const SHEET_ID = "1c5W6a5iPO9FvLJymVA6wwM1PIv-Js-ifm3Q_bcESOPc";
const SHEET_NAME = "Portfolio Contacts";

function doPost(e) {
  if (!e || !e.postData) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        message: "Run testWebhook() inside Apps Script, or submit the website contact form. doPost(e) needs a real POST request."
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const payload = JSON.parse(e.postData.contents || "{}");
  const data = payload.form_data || payload;
  const sheet = getOrCreateSheet_();

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || data._replyto || "",
    data.phone || "",
    data.occupation || "",
    data.company || "",
    data.linkedin || "",
    data.subject || "",
    data.reason || "",
    data.message || "",
    normalizeList_(data.contact_checklist),
    normalizeList_(data.follow_up_checklist),
    data.submission_timestamp || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Recorded At",
      "Name",
      "Email",
      "Phone",
      "Occupation",
      "Company",
      "Profile Link",
      "Subject",
      "Reason",
      "Message",
      "Contact Checklist",
      "Follow-up Checklist",
      "Submission Timestamp"
    ]);
  }

  return sheet;
}

function normalizeList_(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
}

function testWebhook() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        form_data: {
          name: "Test Visitor",
          email: "test@example.com",
          phone: "000-000-0000",
          occupation: "Portfolio tester",
          company: "Test Company",
          linkedin: "https://linkedin.com/in/example",
          subject: "Webhook test",
          reason: "Portfolio feedback",
          message: "This is a test row from Apps Script.",
          contact_checklist: ["Review portfolio project", "Share feedback"],
          follow_up_checklist: ["Reply by email"],
          submission_timestamp: new Date().toLocaleString()
        }
      })
    }
  };

  return doPost(fakeEvent);
}
