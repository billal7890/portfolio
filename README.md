# Billal Javed Portfolio

Personal portfolio website for Billal Javed, focused on business analytics, data visualization, simulation, finance, GIS, database systems, leadership, and professional project evidence.

## What This Site Includes

- Multi-page portfolio website
- Home, About, Portfolio, Blog, Contact, Resume, project reports, and portfolio dashboard pages
- Project cards with detailed report pages
- Certifications and supporting files
- Contact form through Google Apps Script email and Google Sheets backend
- Local demo Admin editor
- Local interaction tracking for demo analytics

## Important Admin Security Note

The included `admin.html` page is for local/demo editing only. It is not production-secure because a static website cannot hide client-side JavaScript passwords from technical users.

Recommended workflow:

1. Edit content locally using `admin.html`.
2. Review the visitor pages locally.
3. Commit the updated files.
4. Push the updated site to GitHub.
5. Use GitHub Pages for the public visitor site.

For a real online editor, connect Firebase Auth, Supabase Auth, Auth0, Netlify CMS, Sanity, Contentful, or a custom backend.

## Run Locally

From this folder:

```powershell
cd "C:\Users\billaljaved\Documents\New project\portfolio"
python -m http.server 8000
```

Open:

```text
http://127.0.0.1:8000/
```

Open Admin locally:

```text
http://127.0.0.1:8000/admin.html
```

## Local Editing Workflow

1. Start the local server.
2. Open `admin.html`.
3. Log in with the local demo admin credentials.
4. Update text, projects, blogs, certifications, resume, images, or social links.
5. Review the visitor pages in the browser.
6. If the changes look correct, commit the files.

Note: Admin changes stored only in browser `localStorage` are not automatically written into the source files. For permanent GitHub updates, source files must be updated and committed.

## Publish To GitHub

The remote is expected to be:

```text
https://github.com/billal7890/portfolio.git
```

After GitHub authentication is set up:

```powershell
cd "C:\Users\billaljaved\Documents\New project\portfolio"
git status
git add .
git commit -m "Update portfolio"
git push -u origin main
```

## Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main`.
6. Select `/ (root)`.
7. Save.

## Contact Form

The contact form uses a Google Apps Script Web App endpoint:

```text
https://script.google.com/macros/s/AKfycbw-9Pfpl7fSAZmIyTWQm_1xZ9OiNv9YTMa2rCWw71KbFDlo4Ny1ZVyoFSsJVzvB0xyfLQ/exec
```

Current flow:

- JavaScript sends the submission to Google Apps Script.
- Apps Script records the row in the `Email_response` sheet tab.
- Apps Script emails `billaljaved7@gmail.com`.
- The visitor is redirected to `thanks.html`.
- A spam honeypot and blacklist field are included.
- The form asks for name, email, phone, occupation, company, reason, message, contact checklist, and follow-up checklist.

The Apps Script code must be pasted into Google Apps Script and deployed as a Web App with **Execute as: Me** and **Who has access: Anyone**.

## Connect Google Sheets

This repository includes:

```text
google-sheets-webhook-template.gs
```

To connect or repair the spreadsheet/email backend:

1. Create a Google Sheet.
2. Copy the Sheet ID from the URL.
3. Open **Extensions > Apps Script**.
4. Paste the code from `google-sheets-webhook-template.gs`.
5. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE`.
6. Deploy as a Web App.
7. Set access to **Anyone**.
8. Copy the Web App URL.
9. If Google gives a new Web App URL, update `GOOGLE_SHEETS_WEBHOOK_URL` in `script.js` and the `action` in `contact.html`.

After that, submissions should be emailed to Billal Javed and appended to the `Email_response` tab in the Google Sheet.

## Privacy Note

This static demo stores basic interaction counts in the visitor's browser using `localStorage`. These counts are for portfolio demonstration and are not presented as verified global traffic analytics.
