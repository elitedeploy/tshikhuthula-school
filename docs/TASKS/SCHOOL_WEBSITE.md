You are a senior full-stack web developer. Build a school admissions portal for parents to apply for their children. The site will be hosted on Cloudflare Pages (static) and store applicant data using Cloudflare D1 (free tier) and Cloudflare R2 for uploaded documents. The portal must be secure, fast, and user-friendly.

**Key Features:**
- Home page with welcome info, admissions policy, and FAQ
- Application form collects: Parent Name, Phone, Email, Child Full Name, Age, Grade Applying For, Previous School, Notes
- File uploads: Identity Document (PDF), Signed Form (PDF), Max 2MB each
- Files go to R2 (Cloudflare) bucket
- On form submission, store form data in D1 (`admissions`) and upload files to R2
- Confirmation screen + basic email confirmation (optional via SendGrid)
- Admin page (basic auth protected) to view/download all submissions

**Tech Stack:**
- Use Astro + Tailwind CSS + Vanilla JS
- File upload handled by Cloudflare Worker
- Validate forms, sanitize inputs, and handle errors gracefully
- Pages Functions or Workers handle form submission and storage logic

**Constraints:**
- Entire solution must remain within Cloudflare free tier:
  - D1: Max 50MB or ~5,000 applications annually
  - R2: Max 10GB total (estimate file size per student = 1–2MB)
- No paid backend or database
- Must be optimized for privacy and compliance

Generate complete project files and setup steps to deploy to Cloudflare Pages, including Workers and bindings.
