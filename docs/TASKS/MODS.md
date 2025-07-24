## 2. School Admissions Website

### 2.1 Overview

* Static frontend for marketing + application form
* Dynamic: Application submission, file uploads, admin dashboard
* Hosted on **Cloudflare Pages** + **Pages Functions**
* Data storage via **D1** + file storage in **R2**

### 2.2 Tech Stack

* **Astro** + **@astrojs/cloudflare**
* **Cloudflare Pages**
* **Cloudflare D1** (form data)
* **Cloudflare R2** (PDF uploads)

### 2.3 Astro & Pages Configuration

*Same as athletics plan* (update routes as needed)

### 2.4 D1 Schema & Free-Tier Usage

#### Schema Example

```sql
CREATE TABLE applications (
  id INTEGER PRIMARY KEY,
  child_name TEXT,
  id_number TEXT,
  birth_date TEXT,
  grade_applied TEXT,
  parent_email TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  id_doc_url TEXT,
  form_pdf_url TEXT
);
```

#### Free-Tier Capacity

* **Storage**: 5 GB ≈ 5 M applications (1 KB/text only)
* **Writes**: 100 K/apps per day

> **Estimate**: 10 000 apps/year → 500 years before storage overage.

### 2.5 R2 File Storage & Free Tier

* **Storage**: 10 GB free
* **Class A (PUT)**: 1 M requests/month
* **Class B (GET)**: 10 M requests/month

#### File Size Estimate

* \~1 MB per applicant (2–3 PDFs)
* **10 240 applicants/month** within 10 GB
* **30 720 PUTs/month** (3 files/app) → 3% of Class A
* **153 600 GETs** (5 views/file) → 1.5% of Class B

### 2.6 Functions: Form + Upload Handler

```js
// functions/submit.js
import { R2Bucket } from '@cloudflare/workers-types';
export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  // 1. Save PDF files to R2
  const idDoc = form.get('id_doc');
  const idKey = `id/${Date.now()}-${idDoc.name}`;
  await env.R2_BUCKET.put(idKey, idDoc.stream(), { httpMetadata: { contentType: idDoc.type }});
  // 2. Insert record into D1
  const db = env.D1;
  await db.prepare(`INSERT INTO applications (...)`).run({
    child_name: form.get('child_name'),
    /* ... */, id_doc_url: idKey
  });
  return new Response(null, { status: 302, headers: { Location: '/thank-you' }});
}
```

### 2.7 Optimization & Maintenance

* **Lifecycle Rules** on R2 to auto-delete after X years
* **Chunked file uploads** (<=5 MB parts)
* **PDF compression** client-side
* **Monitoring**: Set up analytics on function usage

---