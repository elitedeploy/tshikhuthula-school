# Static Site Migration Tasks

## 🎯 Project Goal
Migrate from Astro SSR to static site with PHP/MySQL backend for 20i hosting while maintaining 100% feature parity.

## 📋 Task Categories

### 🏗️ Phase 1: Foundation Setup

#### Task 1.1: Static Site Generation
- [ ] **1.1.1** Test current static build: `npm run build:static`
- [ ] **1.1.2** Verify all pages render correctly in static mode
- [ ] **1.1.3** Check dashboard pages for static compatibility
- [ ] **1.1.4** Identify any SSR-dependent components
- [ ] **1.1.5** Fix static build issues if any
- [ ] **1.1.6** Optimize static build output
- [ ] **1.1.7** Test static site locally

**Deliverable**: Working static site in `dist/` folder
**Estimated Time**: 4-6 hours

#### Task 1.2: Database Schema Conversion
- [ ] **1.2.1** Create MySQL version of `database/schema.sql`
- [ ] **1.2.2** Convert SQLite syntax to MySQL
  - [ ] Change `INTEGER` to `INT`
  - [ ] Change `AUTOINCREMENT` to `AUTO_INCREMENT`
  - [ ] Change `DATETIME` to `TIMESTAMP`
  - [ ] Change `BOOLEAN` to `TINYINT(1)`
- [ ] **1.2.3** Create MySQL database setup script
- [ ] **1.2.4** Convert `database/init-db.sql` to MySQL
- [ ] **1.2.5** Test database creation locally
- [ ] **1.2.6** Verify all tables and relationships

**Deliverable**: MySQL-compatible database schema
**Estimated Time**: 6-8 hours

#### Task 1.3: PHP Project Structure
- [ ] **1.3.1** Create `api/` directory structure
- [ ] **1.3.2** Set up PHP configuration files
- [ ] **1.3.3** Create database connection class
- [ ] **1.3.4** Set up error handling and logging
- [ ] **1.3.5** Create base API response class
- [ ] **1.3.6** Set up CORS and security headers
- [ ] **1.3.7** Create environment configuration

**Deliverable**: PHP project foundation
**Estimated Time**: 4-5 hours

### 🔐 Phase 2: Authentication System

#### Task 2.1: PHP Session Authentication
- [ ] **2.1.1** Create `Auth.php` class
- [ ] **2.1.2** Implement secure session configuration
- [ ] **2.1.3** Create login endpoint (`api/auth/login.php`)
- [ ] **2.1.4** Create logout endpoint (`api/auth/logout.php`)
- [ ] **2.1.5** Create session check endpoint (`api/auth/check.php`)
- [ ] **2.1.6** Implement password hashing and verification
- [ ] **2.1.7** Add CSRF protection
- [ ] **2.1.8** Implement rate limiting for login attempts

**Deliverable**: Complete authentication system
**Estimated Time**: 8-10 hours

#### Task 2.2: Role-Based Access Control
- [ ] **2.2.1** Create `User.php` class with role management
- [ ] **2.2.2** Implement permission checking system
- [ ] **2.2.3** Create middleware for route protection
- [ ] **2.2.4** Test all user roles (Admin, Teacher, Student, Parent)
- [ ] **2.2.5** Verify permission inheritance
- [ ] **2.2.6** Create role-based redirects

**Deliverable**: Role-based access control system
**Estimated Time**: 6-8 hours

### 📊 Phase 3: Admin Dashboard APIs

#### Task 3.1: Admin Application Management
- [ ] **3.1.1** Create `api/admin/applications.php`
  - [ ] GET: List applications with filtering
  - [ ] POST: Update application status
  - [ ] PUT: Edit application details
- [ ] **3.1.2** Create `api/admin/applications/[id].php`
  - [ ] GET: Single application details
  - [ ] PUT: Update specific application
  - [ ] DELETE: Remove application
- [ ] **3.1.3** Implement pagination and search
- [ ] **3.1.4** Add export functionality (CSV/PDF)
- [ ] **3.1.5** Create application status history tracking

**Deliverable**: Complete application management API
**Estimated Time**: 10-12 hours

#### Task 3.2: Admin Statistics and Reports
- [ ] **3.2.1** Create `api/admin/stats.php`
  - [ ] Total applications count
  - [ ] Status breakdown
  - [ ] Grade distribution
  - [ ] Monthly trends
- [ ] **3.2.2** Create `api/admin/reports.php`
  - [ ] Generate detailed reports
  - [ ] Export capabilities
  - [ ] Custom date ranges
- [ ] **3.2.3** Implement caching for heavy queries
- [ ] **3.2.4** Add real-time dashboard updates

**Deliverable**: Statistics and reporting system
**Estimated Time**: 8-10 hours

#### Task 3.3: User Management
- [ ] **3.3.1** Create `api/admin/users.php`
  - [ ] List all users by role
  - [ ] Create new users
  - [ ] Update user details
  - [ ] Deactivate/activate users
- [ ] **3.3.2** Create `api/admin/users/[id].php`
  - [ ] Get user details
  - [ ] Update specific user
  - [ ] Reset user password
- [ ] **3.3.3** Implement bulk operations
- [ ] **3.3.4** Add user activity logging

**Deliverable**: User management system
**Estimated Time**: 8-10 hours

### 👨‍🎓 Phase 4: Student Portal APIs

#### Task 4.1: Student Information
- [ ] **4.1.1** Create `api/student/info.php`
  - [ ] Personal information
  - [ ] Class details
  - [ ] Contact information
- [ ] **4.1.2** Create `api/student/grades.php`
  - [ ] Current grades
  - [ ] Grade history
  - [ ] Subject breakdown
- [ ] **4.1.3** Create `api/student/assignments.php`
  - [ ] Pending assignments
  - [ ] Submitted assignments
  - [ ] Assignment details
- [ ] **4.1.4** Add grade calculations and GPA

**Deliverable**: Student information APIs
**Estimated Time**: 8-10 hours

#### Task 4.2: Student Activities
- [ ] **4.2.1** Create `api/student/events.php`
  - [ ] Upcoming events
  - [ ] Event registration
  - [ ] Event history
- [ ] **4.2.2** Create `api/student/notifications.php`
  - [ ] Unread notifications
  - [ ] Mark as read
  - [ ] Notification history
- [ ] **4.2.3** Create `api/student/achievements.php`
  - [ ] Student achievements
  - [ ] Certificates
  - [ ] Awards

**Deliverable**: Student activity APIs
**Estimated Time**: 6-8 hours

### 👨‍🏫 Phase 5: Teacher Portal APIs

#### Task 5.1: Class Management
- [ ] **5.1.1** Create `api/teacher/classes.php`
  - [ ] Teacher's classes
  - [ ] Student lists
  - [ ] Class schedules
- [ ] **5.1.2** Create `api/teacher/students.php`
  - [ ] Student details
  - [ ] Student performance
  - [ ] Attendance tracking
- [ ] **5.1.3** Create `api/teacher/attendance.php`
  - [ ] Mark attendance
  - [ ] Attendance reports
  - [ ] Absence notifications

**Deliverable**: Class management APIs
**Estimated Time**: 10-12 hours

#### Task 5.2: Assignment Management
- [ ] **5.2.1** Create `api/teacher/assignments.php`
  - [ ] Create assignments
  - [ ] List assignments
  - [ ] Assignment templates
- [ ] **5.2.2** Create `api/teacher/submissions.php`
  - [ ] View submissions
  - [ ] Grade submissions
  - [ ] Provide feedback
- [ ] **5.2.3** Create `api/teacher/gradebook.php`
  - [ ] Grade management
  - [ ] Grade calculations
  - [ ] Report generation

**Deliverable**: Assignment and grading system
**Estimated Time**: 12-15 hours

### 👨‍👩‍👧‍👦 Phase 6: Parent Portal APIs

#### Task 6.1: Child Information
- [ ] **6.1.1** Create `api/parent/children.php`
  - [ ] List parent's children
  - [ ] Child details
  - [ ] Class information
- [ ] **6.1.2** Create `api/parent/grades.php`
  - [ ] Child's grades
  - [ ] Progress reports
  - [ ] Grade trends
- [ ] **6.1.3** Create `api/parent/attendance.php`
  - [ ] Attendance records
  - [ ] Absence reports
  - [ ] Tardiness tracking

**Deliverable**: Parent information APIs
**Estimated Time**: 8-10 hours

#### Task 6.2: Communication
- [ ] **6.2.1** Create `api/parent/notifications.php`
  - [ ] School notifications
  - [ ] Teacher messages
  - [ ] Event announcements
- [ ] **6.2.2** Create `api/parent/messages.php`
  - [ ] Send messages to teachers
  - [ ] Message history
  - [ ] Read receipts
- [ ] **6.2.3** Create `api/parent/meetings.php`
  - [ ] Schedule meetings
  - [ ] Meeting history
  - [ ] Meeting reminders

**Deliverable**: Parent communication system
**Estimated Time**: 8-10 hours

### 📁 Phase 7: File Upload System

#### Task 7.1: Secure File Handling
- [ ] **7.1.1** Create `FileUpload.php` class
- [ ] **7.1.2** Implement file validation
  - [ ] File type restrictions
  - [ ] File size limits
  - [ ] Virus scanning (if available)
- [ ] **7.1.3** Create secure upload directories
- [ ] **7.1.4** Implement file access controls
- [ ] **7.1.5** Create file cleanup routines
- [ ] **7.1.6** Add file versioning

**Deliverable**: Secure file upload system
**Estimated Time**: 8-10 hours

#### Task 7.2: Document Management
- [ ] **7.2.1** Create `api/files/upload.php`
- [ ] **7.2.2** Create `api/files/download.php`
- [ ] **7.2.3** Create `api/files/delete.php`
- [ ] **7.2.4** Implement file organization
- [ ] **7.2.5** Add file metadata tracking
- [ ] **7.2.6** Create file sharing system

**Deliverable**: Document management APIs
**Estimated Time**: 6-8 hours

### 🌐 Phase 8: Public APIs

#### Task 8.1: Application Submission
- [ ] **8.1.1** Create `api/public/applications.php`
  - [ ] Submit new applications
  - [ ] File uploads
  - [ ] Email confirmations
- [ ] **8.1.2** Create application validation
- [ ] **8.1.3** Implement spam protection
- [ ] **8.1.4** Add application tracking
- [ ] **8.1.5** Create confirmation emails

**Deliverable**: Public application system
**Estimated Time**: 8-10 hours

#### Task 8.2: Public Information
- [ ] **8.2.1** Create `api/public/events.php`
  - [ ] List public events
  - [ ] Event details
  - [ ] Event registration
- [ ] **8.2.2** Create `api/public/news.php`
  - [ ] School news
  - [ ] Announcements
  - [ ] Press releases
- [ ] **8.2.3** Create `api/public/contact.php`
  - [ ] Contact form submission
  - [ ] Email routing
  - [ ] Auto-responses

**Deliverable**: Public information APIs
**Estimated Time**: 6-8 hours

### 🔧 Phase 9: Integration & Testing

#### Task 9.1: Frontend Integration
- [ ] **9.1.1** Update static site JavaScript to use PHP APIs
- [ ] **9.1.2** Replace JWT authentication with session-based
- [ ] **9.1.3** Update all AJAX calls to new endpoints
- [ ] **9.1.4** Implement error handling
- [ ] **9.1.5** Add loading states and feedback
- [ ] **9.1.6** Test all user workflows

**Deliverable**: Fully integrated frontend
**Estimated Time**: 12-15 hours

#### Task 9.2: Comprehensive Testing
- [ ] **9.2.1** Unit tests for PHP classes
- [ ] **9.2.2** API endpoint testing
- [ ] **9.2.3** Authentication flow testing
- [ ] **9.2.4** File upload testing
- [ ] **9.2.5** Database integrity testing
- [ ] **9.2.6** Performance testing
- [ ] **9.2.7** Security testing
- [ ] **9.2.8** Cross-browser testing
- [ ] **9.2.9** Mobile responsiveness testing

**Deliverable**: Fully tested application
**Estimated Time**: 15-20 hours

### 🚀 Phase 10: Deployment

#### Task 10.1: 20i Hosting Setup
- [ ] **10.1.1** Set up MySQL database on 20i
- [ ] **10.1.2** Configure PHP settings
- [ ] **10.1.3** Set up SSL certificate
- [ ] **10.1.4** Configure domain and subdomains
- [ ] **10.1.5** Set up email accounts
- [ ] **10.1.6** Configure backup systems

**Deliverable**: Production hosting environment
**Estimated Time**: 4-6 hours

#### Task 10.2: Production Deployment
- [ ] **10.2.1** Upload static site files
- [ ] **10.2.2** Upload PHP backend
- [ ] **10.2.3** Import database schema and data
- [ ] **10.2.4** Configure environment variables
- [ ] **10.2.5** Set up file permissions
- [ ] **10.2.6** Test all functionality in production
- [ ] **10.2.7** Set up monitoring and logging
- [ ] **10.2.8** Create backup and recovery procedures

**Deliverable**: Live production site
**Estimated Time**: 6-8 hours

## 📊 Progress Tracking

### Overall Progress
- **Total Tasks**: 150+ individual tasks
- **Estimated Total Time**: 200-250 hours
- **Phases**: 10 major phases
- **Current Status**: Planning Complete ✅

### Phase Completion Tracking
- [ ] Phase 1: Foundation Setup (0/7 tasks)
- [ ] Phase 2: Authentication System (0/14 tasks)
- [ ] Phase 3: Admin Dashboard APIs (0/15 tasks)
- [ ] Phase 4: Student Portal APIs (0/11 tasks)
- [ ] Phase 5: Teacher Portal APIs (0/15 tasks)
- [ ] Phase 6: Parent Portal APIs (0/12 tasks)
- [ ] Phase 7: File Upload System (0/12 tasks)
- [ ] Phase 8: Public APIs (0/11 tasks)
- [ ] Phase 9: Integration & Testing (0/15 tasks)
- [ ] Phase 10: Deployment (0/14 tasks)

### Priority Order
1. **Phase 1** - Foundation (Critical)
2. **Phase 2** - Authentication (Critical)
3. **Phase 3** - Admin APIs (High)
4. **Phase 8** - Public APIs (High)
5. **Phase 4** - Student APIs (Medium)
6. **Phase 5** - Teacher APIs (Medium)
7. **Phase 6** - Parent APIs (Medium)
8. **Phase 7** - File System (Medium)
9. **Phase 9** - Testing (High)
10. **Phase 10** - Deployment (Critical)

## 🎯 Success Criteria

### Technical Requirements
- [ ] Static site loads in < 2 seconds
- [ ] All API endpoints respond in < 500ms
- [ ] 100% feature parity with current system
- [ ] Zero security vulnerabilities
- [ ] Mobile-responsive design
- [ ] Cross-browser compatibility

### Functional Requirements
- [ ] All user roles can log in successfully
- [ ] All dashboard features work correctly
- [ ] File uploads work securely
- [ ] Email notifications function
- [ ] Reports generate correctly
- [ ] Data integrity maintained

### Performance Requirements
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Database queries optimized
- [ ] Caching implemented
- [ ] CDN-ready static assets

## 🚨 Risk Management

### High-Risk Areas
1. **Data Migration**: Backup strategy essential
2. **Authentication**: Security testing critical
3. **File Uploads**: Security and validation crucial
4. **Database Performance**: Query optimization needed

### Mitigation Strategies
- Comprehensive testing at each phase
- Staged deployment with rollback plan
- Regular backups during development
- Security audit before production

## 📝 Notes

- Start with Phase 1 immediately
- Test each phase thoroughly before proceeding
- Document any deviations from the plan
- Regular progress updates and reviews
- Maintain backup of current system until migration complete

---

**Next Action**: Begin Phase 1, Task 1.1 - Test static site generation