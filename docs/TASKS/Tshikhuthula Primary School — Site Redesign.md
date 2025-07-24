You are a world‑class UI/UX designer and full‑stack developer. Your mission is to completely redesign the **Tshikhuthula Primary School** website to match the modern look and feel of https://school.elitelayouts.co.za/, while adding three key new features: a **5‑year Yearbook**, a **Sponsorship** page (call‑to‑action for event & school sponsors), and an **Online Enrollment** system. The final site will be built with Astro + TailwindCSS, deployed on Cloudflare Pages, and must align with the Gauteng Department of Education’s e‑learning vision and South African market expectations.

**Requirements & Deliverables:**

1. **Global Layout & Styling**  
   - Mirror the clean, grid‑based hero section, card layouts, and fluid responsiveness of school.elitelayouts.co.za  
   - Use TailwindCSS utility classes: 2xl rounded corners, soft shadows, consistent spacing, and a primary brand palette  

2. **Navigation Menu**  
   - Home | About Us | Yearbook | Sponsorship | Enrollment | E‑Learning | Contact  

3. **Homepage**  
   - Hero banner with school motto and call‑to‑action buttons (“Explore Yearbook”, “Enroll Now”)  
   - Three feature cards: “Our Achievers”, “Sponsor a Dream”, “Apply Online”  
   - Quick links to latest news and upcoming events  

4. **About Us**  
   - Vision & mission aligned with GDE e‑learning goals  
   - Brief history and values  
   - Photo gallery carousel of campus and learners  

5. **Yearbook**  
   - Interactive timeline slider (2019–2023)  
   - For each year: grid of top 10 achievers (photo, name, grade, award)  
   - “Download Full Yearbook” PDF link  

6. **Sponsorship**  
   - Impact‑focused copy: why sponsor, success stories  
   - Tiered sponsorship packages (Bronze, Silver, Gold) in cards  
   - Contact form for sponsor inquiries (name, organization, email, message)  

7. **Enrollment**  
   - Multi‑step form (parent & child details, document uploads)  
   - File uploads to Cloudflare R2 (ID, proof of residence)  
   - Progress indicator, validation, and success confirmation page  

8. **E‑Learning**  
   - Overview of online programs, LMS integration (BuddyBoss/LearnDash)  
   - “Login” & “Register” buttons linked to the GDE portal  
   - Testimonials carousel from teachers and students  

9. **Contact**  
   - School address, map embed placeholder  
   - Phone, email, social links  
   - Simplified footer with essential links and copyright  

10. **Technical Notes**  
    - Use Astro “Island” components for interactive elements (timeline, carousels, form wizard)  
    - TailwindCSS for styling, responsive design (3‑column desktop, 2‑tablet, 1‑mobile)  
    - Optimize images, lazy‑load media, minimal JS hydration  
    - Provide Cloudflare Pages + Functions setup instructions to handle form submissions and file uploads  

Generate:
- A complete folder/file structure outline  
- Astro page stubs (`.astro` + frontmatter) with placeholder components  
- TailwindCSS class examples  
- Cloudflare Worker routes for `/api/enroll` and `/api/sponsor`  
- Deployment guide for Cloudflare Pages & R2 bindings  
```
