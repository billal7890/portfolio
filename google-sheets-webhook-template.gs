/*
  Google Apps Script backend for Billal Javed portfolio contact submissions.

  What it does:
  - Records each contact form submission in the Email_response sheet tab.
  - Sends an email notification to Billal Javed.

  Deploy settings:
  1. Open the Google Sheet.
  2. Go to Extensions > Apps Script.
  3. Replace the existing Code.gs with this entire file.
  4. Click Deploy > Manage deployments.
  5. Edit the existing Web App deployment or create a new one.
  6. Execute as: Me.
  7. Who has access: Anyone.
  8. Deploy and approve permissions.
*/

const SHEET_ID = "1c5W6a5iPO9FvLJymVA6wwM1PIv-Js-ifm3Q_bcESOPc";
const SHEET_NAME = "Email_response";
const TO_EMAIL = "billaljaved7@gmail.com";

function doPost(e) {
  if (!e || !e.postData) {
    return json_({
      ok: false,
      message: "Run testWebhook() inside Apps Script, or submit the website contact form."
    });
  }

  const data = parsePayload_(e);
  const sheet = getOrCreateSheet_();
  const submittedAt = data.submission_timestamp || new Date().toLocaleString();
  const contactChecklist = normalizeList_(data.contact_checklist || data.contactChecklist);
  const followUpChecklist = normalizeList_(data.follow_up_checklist || data.followUpChecklist);
  const subject = data.subject || "Portfolio contact submission";
  const message = data.message || "";

  sheet.appendRow([
    data.name || "",
    data.email || data._replyto || "",
    data.phone || data.number || "",
    data.occupation || "",
    data.company || "",
    data.linkedin || data.link || "",
    data.reason || "",
    contactChecklist,
    followUpChecklist,
    subject,
    message,
    buildReplyDraft_(data),
    submittedAt
  ]);

  MailApp.sendEmail({
    to: TO_EMAIL,
    replyTo: data.email || "",
    subject: "Portfolio contact: " + subject,
    htmlBody: buildEmailHtml_(data, contactChecklist, followUpChecklist, submittedAt),
    body: buildEmailText_(data, contactChecklist, followUpChecklist, submittedAt)
  });

  return json_({ ok: true });
}

function parsePayload_(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    return payload.form_data || payload;
  } catch (error) {
    return e.parameter || {};
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Contact name",
      "EMAIL ADDRESS",
      "NUMBER",
      "OCCUPATION",
      "COMPANY",
      "LINK",
      "REASON",
      "CHECK LIST",
      "Follow-up checklist",
      "Email subject",
      "Email body",
      "AI reply",
      "Submitted at"
    ]);
  }

  return sheet;
}

function buildEmailHtml_(data, contactChecklist, followUpChecklist, submittedAt) {
  return `
    <h2>New portfolio contact submission</h2>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;">
      <tr><th align="left">Name</th><td>${escapeHtml_(data.name)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml_(data.email)}</td></tr>
      <tr><th align="left">Phone</th><td>${escapeHtml_(data.phone || data.number)}</td></tr>
      <tr><th align="left">Occupation</th><td>${escapeHtml_(data.occupation)}</td></tr>
      <tr><th align="left">Company</th><td>${escapeHtml_(data.company)}</td></tr>
      <tr><th align="left">Profile Link</th><td>${escapeHtml_(data.linkedin || data.link)}</td></tr>
      <tr><th align="left">Reason</th><td>${escapeHtml_(data.reason)}</td></tr>
      <tr><th align="left">Checklist</th><td>${escapeHtml_(contactChecklist)}</td></tr>
      <tr><th align="left">Follow-up</th><td>${escapeHtml_(followUpChecklist)}</td></tr>
      <tr><th align="left">Subject</th><td>${escapeHtml_(data.subject)}</td></tr>
      <tr><th align="left">Message</th><td>${escapeHtml_(data.message)}</td></tr>
      <tr><th align="left">Submitted at</th><td>${escapeHtml_(submittedAt)}</td></tr>
    </table>
  `;
}

function buildEmailText_(data, contactChecklist, followUpChecklist, submittedAt) {
  return [
    "New portfolio contact submission",
    "Name: " + (data.name || ""),
    "Email: " + (data.email || ""),
    "Phone: " + (data.phone || data.number || ""),
    "Occupation: " + (data.occupation || ""),
    "Company: " + (data.company || ""),
    "Profile Link: " + (data.linkedin || data.link || ""),
    "Reason: " + (data.reason || ""),
    "Checklist: " + contactChecklist,
    "Follow-up: " + followUpChecklist,
    "Subject: " + (data.subject || ""),
    "Message: " + (data.message || ""),
    "Submitted at: " + submittedAt
  ].join("\n");
}

function buildReplyDraft_(data) {
  const name = data.name || "there";
  return `Hi ${name}, thank you for reaching out through my portfolio. I received your message and will review it carefully before following up.`;
}

function normalizeList_(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
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
          subject: "Webhook and email test",
          reason: "Portfolio feedback",
          message: "This is a test row and test email from Apps Script.",
          contactChecklist: "Review portfolio project, Share feedback",
          followUpChecklist: "Reply by email",
          submission_timestamp: new Date().toLocaleString()
        }
      })
    }
  };

  return doPost(fakeEvent);
}
