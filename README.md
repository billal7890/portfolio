# Billal Javed Portfolio

Personal portfolio website for Billal Javed, focused on business analytics, data visualization, simulation, finance, GIS, database systems, leadership, and professional project evidence.

## What This Site Includes

- Multi-page portfolio website
- Home, About, Portfolio, Blog, Contact, Resume, project reports, and portfolio dashboard pages
- Project cards with detailed report pages
- Certifications and supporting files
- Contact form through FormSubmit
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

The contact form uses FormSubmit and sends submissions to:

```text
billaljaved7@gmail.com
```

FormSubmit may require a one-time email activation after the first submission.

## Privacy Note

This static demo stores basic interaction counts in the visitor's browser using `localStorage`. These counts are for portfolio demonstration and are not presented as verified global traffic analytics.
