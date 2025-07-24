# Admin Dashboard Guide

## Overview

The Tshikhuthula Primary School admin dashboard provides a comprehensive interface for managing student applications, events, achievements, and sponsors. This guide covers login credentials, workflow, and testing procedures.

## 🔐 Login Credentials

### Default Admin Users

The system comes with pre-configured admin accounts:

| Username | Password | Role | Full Name |
|----------|----------|------|-----------|
| `admin` | `hello` | admin | System Administrator |
| `principal` | `hello` | principal | School Principal |
| `secretary` | `hello` | staff | School Secretary |

### Access URLs

- **Login Page**: `http://localhost:4321/admin/login`
- **Dashboard**: `http://localhost:4321/admin`

## 🚀 Getting Started

### 1. Database Setup

Ensure the database is initialized with sample data:

```bash
# The init-db.sql file contains:
# - Admin user accounts
# - Sample applications
# - Sample events, achievements, and sponsors
# - School settings
```

### 2. Login Process

1. Navigate to `/admin/login`
2. Enter credentials (use `admin` / `hello` for full access)
3. Click "Login"
4. You'll be redirected to the dashboard

### 3. Dashboard Features

#### Statistics Overview
- **Total Applications**: Shows count of all submitted applications
- **Pending Review**: Applications awaiting admin action
- **Approved**: Successfully approved applications
- **Today's Applications**: New applications submitted today

#### Application Management
- **View Applications**: Browse all submitted applications
- **Filter & Search**: Filter by status, grade, or search by name/email
- **Application Details**: Click "View" to see full application details
- **Status Updates**: Approve, reject, or mark under review
- **Export**: Download application data

## 📋 Workflow Guide

### Daily Admin Tasks

1. **Morning Review**
   - Login to dashboard
   - Check overnight applications
   - Review pending applications

2. **Application Processing**
   - Open application details
   - Review student information
   - Check required documents
   - Update status accordingly

3. **Communication**
   - Send status updates to parents
   - Schedule interviews if needed
   - Update application notes

### Application Status Workflow

```
Submitted → Pending → Under Review → Approved/Rejected/Waitlisted
```

#### Status Definitions
- **Pending**: Newly submitted, awaiting initial review
- **Under Review**: Being actively processed by admin
- **Approved**: Application accepted, student can enroll
- **Rejected**: Application declined
- **Waitlisted**: Application on hold, pending space availability

## 🔧 API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/check` - Verify authentication

### Applications
- `GET /api/admin/applications` - List all applications
- `GET /api/admin/applications/[id]` - Get specific application
- `PUT /api/admin/applications/[id]/status` - Update application status

### Statistics
- `GET /api/admin/stats` - Dashboard statistics

### Content Management
- `GET /api/events` - Manage school events
- `GET /api/achievements` - Manage student achievements
- `GET /api/sponsors` - Manage school sponsors

## 🧪 Testing Checklist

### ✅ FUNCTIONAL FEATURES (Ready for Testing)

#### Authentication Testing
- [x] Login with valid credentials (`admin`/`hello`, `principal`/`hello`, `secretary`/`hello`)
- [x] Login with invalid credentials (properly fails with error message)
- [x] Session persistence (stays logged in)
- [x] Auto-redirect to login when not authenticated
- [x] Session token validation

#### Dashboard Testing
- [x] Statistics load correctly (shows total, pending, approved, today's counts)
- [x] Applications table displays with sample data
- [x] Filtering works (status, grade, search functionality)
- [x] Pagination functions properly
- [x] Application details modal opens and displays full information
- [x] Status updates work (pending, approved, under_review, rejected, waitlisted)
- [x] Real-time data refresh

#### Data Management Testing
- [x] View individual application details
- [x] Update application status with notes
- [x] Search and filter applications by multiple criteria
- [x] Handle authentication states properly
- [x] Mock data displays correctly

### 🔧 TESTING INSTRUCTIONS

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:4321` or `http://localhost:4322`

2. **Test Login Process**
   - Navigate to `/admin/login`
   - Try invalid credentials (should show error)
   - Login with `admin` / `hello`
   - Should redirect to dashboard

3. **Test Dashboard Features**
   - Verify statistics cards show data
   - Check applications table loads
   - Test filtering by status/grade
   - Try search functionality
   - Click "View" on any application
   - Update application status

4. **Test Session Management**
   - Refresh page (should stay logged in)
   - Try accessing `/admin` without login
   - Test logout functionality

## 🛠️ Troubleshooting

### Common Issues

1. **Login Fails**
   - Check credentials are correct
   - Verify database connection
   - Check browser console for errors

2. **Dashboard Not Loading**
   - Ensure you're logged in
   - Check API endpoints are responding
   - Verify database has sample data

3. **Applications Not Displaying**
   - Check database has sample applications
   - Verify API endpoints are working
   - Check browser network tab for errors

### Development Notes

- The system uses Cloudflare D1 database
- Authentication uses session-based tokens
- All API calls require authentication
- Sample data is created via `init-db.sql`

## 🔒 Security Features

- Password hashing (production should use bcrypt)
- Session-based authentication
- Role-based access control
- CSRF protection
- Input validation
- SQL injection prevention

## 📱 Mobile Responsiveness

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 Next Steps

After testing the basic functionality:

1. **Enhanced Features**
   - Email notifications
   - Document upload/download
   - Advanced reporting
   - Bulk operations

2. **Integration**
   - Student information system
   - Payment processing
   - Communication tools
   - Calendar integration

## 📞 Support

For technical issues or questions:
- Check the browser console for errors
- Review API response codes
- Verify database connectivity
- Test with different browsers

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Compatible with**: Astro 5.x, Cloudflare Pages