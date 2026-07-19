/*
  Google Apps Script backend for Billal Javed portfolio contact submissions.

  What it does:
  - Records each contact form submission in the Portfolio Contacts sheet tab.
  - Sends an email notification to Billal Javed.
  - Records website interaction events in the Portfolio Analytics sheet tab.

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
const SHEET_NAME = "Portfolio Contacts";
const ANALYTICS_SHEET_NAME = "Portfolio Analytics";
const TO_EMAIL = "billaljaved7@gmail.com";

const HEADERS = [
  "DATE",
  "EMAIL ADDRESS",
  "NAME",
  "NUMBER",
  "OCCUPATION",
  "COMPANY",
  "LINKDIN",
  "SUBJECT",
  "EMAIL BODY",
  "REASON",
  "AI REPLY"
];

const ANALYTICS_HEADERS = [
  "TIMESTAMP",
  "EVENT TYPE",
  "LABEL",
  "PAGE",
  "PATH",
  "URL",
  "REFERRER",
  "USER AGENT"
];

function doPost(e) {
  if (!e || !e.postData) {
    return json_({
      ok: false,
      message: "Run testWebhook() inside Apps Script, or submit the website contact form."
    });
  }

  const data = parsePayload_(e);
  if (data.analytics_event || data.event_type) {
    return recordAnalytics_(data.analytics_event || data);
  }

  const sheet = getOrCreateSheet_();
  const submittedAt = data.submission_timestamp || new Date().toLocaleString();
  const subject = data.subject || "Portfolio contact submission";
  const message = data.message || data.email_body || "";
  const aiReply = buildReplyDraft_(data);

  sheet.appendRow([
    submittedAt,
    data.email || data._replyto || "",
    data.name || "",
    data.phone || data.number || "",
    data.occupation || "",
    data.company || "",
    data.linkedin || data.linkdin || data.link || "",
    subject,
    message,
    data.reason || "",
    aiReply
  ]);

  MailApp.sendEmail({
    to: TO_EMAIL,
    replyTo: data.email || "",
    subject: "Portfolio contact: " + subject,
    htmlBody: buildEmailHtml_(data, aiReply, submittedAt),
    body: buildEmailText_(data, aiReply, submittedAt)
  });

  return json_({ ok: true });
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  const callback = e && e.parameter && e.parameter.callback;
  if (action === "analytics") {
    const summary = getAnalyticsSummary_();
    if (callback) {
      return ContentService
        .createTextOutput(callback + "(" + JSON.stringify(summary) + ");")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return json_(summary);
  }
  return json_({ ok: true, message: "Portfolio webhook is active." });
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
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  return sheet;
}

function getOrCreateAnalyticsSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(ANALYTICS_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(ANALYTICS_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(ANALYTICS_HEADERS);
  } else {
    sheet.getRange(1, 1, 1, ANALYTICS_HEADERS.length).setValues([ANALYTICS_HEADERS]);
  }

  return sheet;
}

function recordAnalytics_(event) {
  const sheet = getOrCreateAnalyticsSheet_();
  sheet.appendRow([
    event.timestamp || new Date().toLocaleString(),
    event.event_type || "",
    event.label || "",
    event.page || "",
    event.path || "",
    event.url || "",
    event.referrer || "",
    event.user_agent || ""
  ]);
  return json_({ ok: true, type: "analytics" });
}

function getAnalyticsSummary_() {
  const sheet = getOrCreateAnalyticsSheet_();
  const values = sheet.getDataRange().getValues();
  const totals = {};
  const labels = {};
  for (let i = 1; i < values.length; i += 1) {
    const eventType = values[i][1];
    const label = values[i][2];
    if (!eventType) continue;
    totals[eventType] = (totals[eventType] || 0) + 1;
    if (label) {
      const key = eventType + "::" + label;
      labels[key] = (labels[key] || 0) + 1;
    }
  }
  return {
    ok: true,
    totals,
    labels,
    totalEvents: Math.max(0, values.length - 1),
    updatedAt: new Date().toLocaleString()
  };
}

function buildEmailHtml_(data, aiReply, submittedAt) {
  return `
    <h2>New portfolio contact submission</h2>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;">
      <tr><th align="left">Name</th><td>${escapeHtml_(data.name)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml_(data.email)}</td></tr>
      <tr><th align="left">Phone</th><td>${escapeHtml_(data.phone || data.number)}</td></tr>
      <tr><th align="left">Occupation</th><td>${escapeHtml_(data.occupation)}</td></tr>
      <tr><th align="left">Company</th><td>${escapeHtml_(data.company)}</td></tr>
      <tr><th align="left">Profile Link</th><td>${escapeHtml_(data.linkedin || data.linkdin || data.link)}</td></tr>
      <tr><th align="left">Reason</th><td>${escapeHtml_(data.reason)}</td></tr>
      <tr><th align="left">Subject</th><td>${escapeHtml_(data.subject)}</td></tr>
      <tr><th align="left">Message</th><td>${escapeHtml_(data.message || data.email_body)}</td></tr>
      <tr><th align="left">Suggested reply</th><td>${escapeHtml_(aiReply)}</td></tr>
      <tr><th align="left">Submitted at</th><td>${escapeHtml_(submittedAt)}</td></tr>
    </table>
  `;
}

function buildEmailText_(data, aiReply, submittedAt) {
  return [
    "New portfolio contact submission",
    "Name: " + (data.name || ""),
    "Email: " + (data.email || ""),
    "Phone: " + (data.phone || data.number || ""),
    "Occupation: " + (data.occupation || ""),
    "Company: " + (data.company || ""),
    "Profile Link: " + (data.linkedin || data.linkdin || data.link || ""),
    "Reason: " + (data.reason || ""),
    "Subject: " + (data.subject || ""),
    "Message: " + (data.message || data.email_body || ""),
    "Suggested reply: " + aiReply,
    "Submitted at: " + submittedAt
  ].join("\n");
}

function buildReplyDraft_(data) {
  const name = data.name || "there";
  const reason = String(data.reason || "").toLowerCase();
  const projectLine = reason.includes("feedback")
    ? "I appreciate you taking time to review my portfolio and project work."
    : "I appreciate you reaching out through my portfolio.";
  const opportunityLine = reason.includes("opportunity") || reason.includes("job") || reason.includes("internship")
    ? "I would be glad to discuss how my business analytics, finance, dashboarding, and simulation experience could support your team."
    : "I will review your note carefully and follow up with a thoughtful response.";
  return `Hi ${name}, thank you for your message. ${projectLine} ${opportunityLine} Best, Billal`;
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
          submission_timestamp: new Date().toLocaleString()
        }
      })
    }
  };

  return doPost(fakeEvent);
}

function testAnalytics() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        analytics_event: {
          event_type: "page_view",
          label: "Apps Script test",
          page: "test",
          path: "/test",
          url: "https://billal7890.github.io/portfolio/",
          timestamp: new Date().toLocaleString()
        }
      })
    }
  };

  return doPost(fakeEvent);
}
