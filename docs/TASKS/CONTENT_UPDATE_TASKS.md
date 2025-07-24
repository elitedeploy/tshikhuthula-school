# Content Update Tasks for Tshikhuthula Primary School Admissions Portal

## Overview
Transform the existing Astro school template into a functional admissions portal for **Tshikhuthula Primary School** while maintaining the current layout structure and design. The site will serve South African parents seeking enrollment for children aged 5-13.

## Project Goals
- Convert template content to school-specific admissions portal
- Maintain existing Bootstrap/template styling and layout
- Prepare for potential Cloudflare Pages hosting (evaluation phase)
- Create professional, warm, and welcoming content in English

---

## Phase 1: Content Strategy & Navigation

### 1.1 Navigation Menu Update
**Current Pages to Transform:**
- Home → Welcome & School Overview
- About → Why Choose Tshikhuthula
- Courses → Admissions Process
- Team → Our Educators
- Testimonials → Parent Testimonials
- Contact → Contact & Location

**New Pages to Add:**
- Application Form (new dedicated page)
- FAQ (new page)
- Thank You (confirmation page)

### 1.2 Site Architecture
```
├── Home (index.astro) - Welcome, vision, CTA
├── Why Choose Us (about.astro) - Values, facilities, academics
├── Admissions Process (courses.astro) - Step-by-step guide
├── Our Educators (team.astro) - Staff profiles
├── Parent Testimonials (testimonial.astro) - Success stories
├── Application Form (apply.astro) - NEW PAGE
├── FAQ (faq.astro) - NEW PAGE
├── Contact Us (contact.astro) - Address, phone, map
└── Thank You (thank-you.astro) - NEW PAGE
```

---

## Phase 2: Content Development

### 2.1 Homepage Content (index.astro)
**Hero Section:**
- Welcome message for Tshikhuthula Primary School
- School vision/mission statement
- Primary CTA: "Apply Now" button

**Key Sections:**
- School highlights (academics, facilities, values)
- Quick admissions info
- Upcoming enrollment dates
- Newsletter signup

### 2.2 Why Choose Us Page (about.astro)
**Content Focus:**
- School values and educational philosophy
- Facilities and resources
- Academic strengths and programs
- Extracurricular activities
- Safety and nurturing environment

### 2.3 Admissions Process Page (courses.astro)
**Content Structure:**
- Step-by-step application guide
- Required documents checklist
- Important dates and deadlines
- Age and grade requirements
- Application timeline

### 2.4 Our Educators Page (team.astro)
**Content Focus:**
- Principal and key staff profiles
- Teaching qualifications
- Educational approach
- Staff-to-student ratios

### 2.5 Parent Testimonials (testimonial.astro)
**Content Focus:**
- Success stories from current parents
- Student achievement highlights
- Community feedback
- School impact testimonials

### 2.6 Application Form Page (NEW - apply.astro)
**Form Fields Required:**
- Parent Information:
  - Parent Name
  - Phone Number
  - Email Address
- Child Information:
  - Child Full Name
  - Age
  - Grade Applying For
  - Previous School
  - Additional Notes
- File Uploads:
  - Identity Document (PDF, max 2MB)
  - Signed Application Form (PDF, max 2MB)

**Additional Content:**
- Privacy reassurance
- Upload instructions
- Form completion tips

### 2.7 FAQ Page (NEW - faq.astro)
**Top 5 Questions:**
1. What are the admission requirements?
2. When is the application deadline?
3. What documents do I need to submit?
4. What are the school fees?
5. How will I know if my application is successful?

### 2.8 Contact Page (contact.astro)
**Content Updates:**
- School address (South African format)
- Phone and email contact
- Office hours
- Map embed placeholder
- Directions and transport info

### 2.9 Thank You Page (NEW - thank-you.astro)
**Content:**
- Application submission confirmation
- Next steps information
- Timeline expectations
- Contact info for questions

---

## Phase 3: Technical Considerations

### 3.1 Form Functionality (Future Implementation)
**Backend Options to Evaluate:**
- Cloudflare Pages + D1 + R2 (free tier)
- Alternative static form handlers
- Email-based submissions

**Database Schema (Cloudflare D1):**
```sql
CREATE TABLE applications (
  id INTEGER PRIMARY KEY,
  parent_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  child_name TEXT,
  child_age INTEGER,
  grade_applied TEXT,
  previous_school TEXT,
  notes TEXT,
  id_doc_url TEXT,
  form_pdf_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 File Upload Requirements
- PDF format only
- Maximum 2MB per file
- Secure storage (R2 bucket)
- Virus scanning consideration

### 3.3 Admin Dashboard (Future)
- Basic auth protection
- View all applications
- Download submitted documents
- Export application data

---

## Phase 4: Content Guidelines

### 4.1 Tone & Style
- **Professional but warm**
- **Clear and informative**
- **Respectful and welcoming**
- **Targeted at South African parents**
- **English language**

### 4.2 South African Context
- Use appropriate grade terminology (Grade R, 1-7)
- Include relevant educational standards
- Consider local cultural sensitivity
- Use South African English spelling

### 4.3 Compliance Considerations
- POPIA (Protection of Personal Information Act) compliance
- Child protection policies
- Data retention policies
- Privacy notices

---

## Phase 5: Implementation Priority

### Priority 1: Content Updates (Immediate)
1. ✅ Update homepage with school branding
2. ✅ Transform existing pages with new content
3. ✅ Create new pages (Application, FAQ, Thank You)
4. ✅ Update navigation and footer
5. ✅ Update contact page with school-specific information

### Priority 2: Form Development (Next Phase)
1. Create static application form
2. Implement form validation
3. Add file upload interface
4. Create thank you page

### Priority 3: Backend Integration (Future)
1. Evaluate Cloudflare vs alternatives
2. Implement chosen backend solution
3. Add admin dashboard
4. Set up email notifications

---

## Success Metrics
- Clear, professional school presentation
- Intuitive navigation and user flow
- Functional application process
- Mobile-responsive design maintained
- Fast loading times preserved
- Accessibility standards met

---

## Next Steps
1. Begin with Priority 1 content updates
2. Maintain existing template structure and styling
3. Test all pages for consistency and functionality
4. Prepare for backend evaluation and implementation

**Note:** This document focuses on content transformation while preserving the existing template's design and functionality. Backend implementation will be addressed in a separate phase after content updates are complete.