# Static Site Migration Plan - GitHub Pages

## Overview

Migrating from dynamic CMS-based site to static GitHub Pages deployment. This involves removing all database dependencies, authentication systems, and converting forms to email-based submissions.

## Current Project Analysis

### Frontend
- **Framework**: Astro with multiple deployment configurations
- **Configurations**: SSR, static, Cloudflare, Vercel, Netlify
- **Static Build**: Already configured in `config/astro.config.static.mjs`

### Backend
- **Current**: Node.js API routes with JWT authentication
- **Database**: Cloudflare D1 (SQLite) with comprehensive schema
- **File Storage**: Cloudflare R2 for document uploads
- **Authentication**: JWT-based with role-based permissions

### User System
- **Roles**: Principal, Admin, Secretary, Teacher, Parent, Student
- **Features**: Multi-portal dashboard system
- **Functionality**: Applications, grades, assignments, events, achievements

## Migration Strategy

### Phase 1: Static Site Generation ✅

**Objective**: Generate static HTML/CSS/JS from existing Astro project

**Implementation**:
1. Use existing static configuration: `npm run build:static`
2. Output: Fully static site in `dist/` folder
3. All dashboard pages pre-rendered as static HTML
4. Client-side JavaScript for dynamic interactions

**Benefits**:
- Lightning-fast loading
- Perfect SEO
- No server-side rendering overhead
- CDN-friendly

### Phase 2: PHP Backend Development

**Objective**: Create robust PHP API to replace Node.js backend

#### Database Migration
- **Source**: `database/schema.sql` (SQLite)
- **Target**: MySQL with same structure
- **Tables**: 15+ tables including users, applications, classes, assignments
- **Features**: Triggers, indexes, relationships preserved

#### API Endpoints Structure
```
api/
├── auth/
│   ├── login.php
│   ├── logout.php
│   └── check.php
├── admin/
│   ├── applications.php
│   ├── stats.php
│   ├── users.php
│   └── dashboard.php
├── student/
│   ├── info.php
│   ├── grades.php
│   ├── assignments.php
│   └── events.php
├── teacher/
│   ├── classes.php
│   ├── assignments.php
│   ├── students.php
│   └── stats.php
├── parent/
│   ├── children.php
│   ├── grades.php
│   ├── notifications.php
│   └── events.php
└── public/
    ├── applications.php
    ├── events.php
    └── contact.php
```

### Phase 3: Authentication System

**Migration from JWT to PHP Sessions**:
- **Current**: JWT tokens with 24-hour expiry
- **New**: PHP sessions with secure configuration
- **Security**: CSRF protection, secure cookies, session regeneration
- **Roles**: Maintain existing permission system

**Session Configuration**:
```php
// Secure session settings
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Strict');
```

### Phase 4: File Upload System

**Migration from Cloudflare R2 to Local Storage**:
- **Current**: Cloud storage with unique file paths
- **New**: Secure local file system on 20i
- **Structure**: Organized by user/application/type
- **Security**: File validation, size limits, type restrictions

**Directory Structure**:
```
uploads/
├── applications/
│   └── [student_id]/
│       ├── birth_certificate/
│       ├── parent_id/
│       └── proof_of_residence/
├── profiles/
│   ├── students/
│   ├── teachers/
│   └── staff/
└── documents/
    ├── assignments/
    └── resources/
```

## Technical Implementation Details

### Frontend (Static)

**Dashboard Pages**:
- Pre-rendered with placeholder data
- JavaScript handles dynamic content loading
- AJAX calls to PHP API endpoints
- Progressive enhancement approach

**Authentication Flow**:
1. User submits login form
2. AJAX POST to `/api/auth/login.php`
3. PHP validates credentials, creates session
4. JavaScript redirects to appropriate dashboard
5. Subsequent API calls include session cookies

### Backend (PHP/MySQL)

**Framework Options**:
1. **Pure PHP**: Maximum control, lightweight
2. **Laravel**: Full-featured, rapid development
3. **CodeIgniter**: Lightweight, easy learning curve

**Recommended**: Pure PHP with custom classes for this project size

**Security Measures**:
- Prepared statements for all database queries
- Input validation and sanitization
- CSRF token protection
- Rate limiting for login attempts
- Secure file upload handling
- SQL injection prevention

### Database Schema Conversion

**SQLite to MySQL Changes**:
```sql
-- SQLite
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- MySQL
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Conversions**:
- `INTEGER` → `INT`
- `AUTOINCREMENT` → `AUTO_INCREMENT`
- `DATETIME` → `TIMESTAMP`
- `BOOLEAN` → `TINYINT(1)`
- `TEXT` → `TEXT` or `VARCHAR(255)`

## Deployment Structure on 20i

```
public_html/
├── index.html                 # Static Astro build
├── dashboard/                 # Static dashboard pages
│   ├── admin/
│   ├── student/
│   ├── teacher/
│   └── parent/
├── assets/                    # CSS, JS, images
├── api/                       # PHP backend
│   ├── config/
│   │   ├── database.php
│   │   └── auth.php
│   ├── classes/
│   │   ├── Database.php
│   │   ├── Auth.php
│   │   └── User.php
│   ├── auth/
│   ├── admin/
│   ├── student/
│   ├── teacher/
│   └── parent/
├── uploads/                   # Secure file storage
│   ├── .htaccess             # Access control
│   └── [organized folders]
└── config/
    ├── .env                   # Environment variables
    └── database.sql           # MySQL schema
```

## Benefits of This Approach

### Performance
- **Static Site**: Instant loading, perfect caching
- **CDN Ready**: All static assets can be cached
- **Reduced Server Load**: Only API calls hit the server

### SEO & Accessibility
- **Perfect SEO**: Static HTML indexed immediately
- **Fast First Paint**: No server-side rendering delays
- **Progressive Enhancement**: Works without JavaScript

### Cost & Maintenance
- **Lower Hosting Costs**: No Node.js hosting required
- **Proven Technology**: PHP/MySQL is battle-tested
- **Easy Maintenance**: Standard LAMP stack

### Scalability
- **Static Content**: Scales infinitely with CDN
- **Database**: MySQL handles high concurrent loads
- **Caching**: Multiple layers of caching possible

## Preserved Functionality

✅ **Complete Feature Parity**:
- All dashboard logins and authentication
- Dynamic data (applications, grades, events)
- File uploads and document management
- Multi-user system (students, teachers, parents, admins)
- Real-time notifications and updates
- Comprehensive reporting and statistics
- Application submission system
- Event management
- Achievement tracking
- Sponsor management

## Migration Timeline

### Week 1: Foundation
- [ ] Generate static site build
- [ ] Set up MySQL database
- [ ] Create basic PHP API structure
- [ ] Implement authentication system

### Week 2: Core Features
- [ ] Admin dashboard APIs
- [ ] Student portal APIs
- [ ] Teacher portal APIs
- [ ] Parent portal APIs

### Week 3: Advanced Features
- [ ] File upload system
- [ ] Application submission
- [ ] Notification system
- [ ] Reporting and statistics

### Week 4: Testing & Deployment
- [ ] Comprehensive testing
- [ ] Security audit
- [ ] Performance optimization
- [ ] 20i deployment

## Success Metrics

- **Performance**: Page load < 2 seconds
- **Functionality**: 100% feature parity
- **Security**: No vulnerabilities in security audit
- **Usability**: All user workflows function correctly
- **SEO**: Perfect Lighthouse scores

## Risk Mitigation

### Technical Risks
- **Data Migration**: Comprehensive testing with backup data
- **Authentication**: Gradual migration with fallback options
- **File Uploads**: Secure configuration and testing

### Business Risks
- **Downtime**: Staged deployment with rollback plan
- **User Training**: Documentation and support materials
- **Data Loss**: Multiple backup strategies

## Conclusion

This migration strategy provides the optimal balance of performance, functionality, and maintainability. The static site approach ensures lightning-fast loading and perfect SEO, while the PHP/MySQL backend maintains all dynamic functionality required for a comprehensive school management system.

The end result will be a robust, scalable, and cost-effective solution that exceeds the performance of the current SSR implementation while maintaining complete feature parity.