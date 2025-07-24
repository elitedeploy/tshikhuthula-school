# Astro School Management Template

A comprehensive school management system built with Astro, featuring multi-portal authentication and role-based access control.

## 📁 Project Structure

```
astro-school-template/
├── 📁 config/              # Configuration files
│   └── astro.config.mjs     # Astro configuration
├── 📁 database/             # Database files
│   ├── init-db.sql          # Database initialization
│   ├── schema.sql           # Database schema
│   └── seed_data.sql        # Sample data
├── 📁 deployment/           # Deployment configurations
│   ├── .dockerignore        # Docker ignore file
│   ├── Dockerfile           # Docker configuration
│   ├── nixpacks.toml        # Nixpacks configuration
│   └── wrangler.toml        # Cloudflare Workers config
├── 📁 docs/                 # Documentation
│   └── TASKS/               # Project tasks and planning
├── 📁 legacy-html/          # Original HTML template files
│   ├── css/                 # Legacy stylesheets
│   ├── js/                  # Legacy JavaScript
│   ├── scss/                # Legacy SCSS files
│   ├── img/                 # Legacy images
│   └── *.html               # Original HTML files
├── 📁 src/                  # Astro source code
│   ├── components/          # Reusable components
│   ├── layouts/             # Page layouts
│   ├── lib/                 # Utility libraries
│   └── pages/               # Astro pages and API routes
├── 📁 public/               # Static assets
├── 📁 functions/            # Serverless functions
├── 📁 lib/                  # Shared libraries
└── 📁 dist/                 # Build output
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### GitHub Pages

1. **Setup Repository**:
   - Push your code to a GitHub repository
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as the source

2. **Configure Astro for GitHub Pages**:
   Update `astro.config.mjs`:
   ```js
   import { defineConfig } from 'astro/config';
   
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
     output: 'static'
   });
   ```

3. **GitHub Actions Workflow**:
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
     workflow_dispatch:
   
   permissions:
     contents: read
     pages: write
     id-token: write
   
   concurrency:
     group: "pages"
     cancel-in-progress: false
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
         - name: Setup Pages
           id: pages
           uses: actions/configure-pages@v4
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
   
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

### Netlify

1. **Connect Repository**:
   - Sign up at [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables** (if needed):
   - Go to Site Settings > Environment Variables
   - Add any required environment variables

### Vercel

1. **Deploy with Vercel**:
   - Sign up at [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Astro and configure build settings

2. **Manual Configuration** (if needed):
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Traditional Web Hosting

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder**:
   - Upload the contents of the `dist` folder to your web server
   - Ensure your hosting supports static file serving

## 🔧 Configuration

### Site Information
Update site metadata in `src/layouts/Layout.astro`:
- Site title and description
- Meta tags and SEO information
- Favicon and social media images

### Content Management
All content is managed through markdown files in the `src/content/` directory:
- **Courses**: Add new courses in `src/content/courses/`
- **Events**: Add new events in `src/content/events/`
- **News**: Add new articles in `src/content/news/`
- **Staff**: Add new staff members in `src/content/staff/`

### Styling
- Global styles are in component files and page-specific `<style>` tags
- Responsive design is built-in with mobile-first approach
- Color scheme and typography can be customized in individual components

## 🏫 Features

### Multi-Portal System
- **Student Portal**: Grades, assignments, events, personal info
- **Teacher Portal**: Class management, activity tracking, statistics
- **Parent Portal**: Children's progress, grades, notifications, events
- **Admin Portal**: User management, system configuration
- **Sponsors Portal**: Recognition programs, event sponsorship

### Authentication & Security
- JWT-based authentication
- Role-based access control
- Secure API endpoints
- Session management

## 🛠️ Development

### Project Organization

The project has been reorganized for better maintainability:

- **config/**: All configuration files are centralized
- **database/**: Database-related files are grouped together
- **deployment/**: All deployment configurations in one place
- **docs/**: Documentation and project planning materials
- **legacy-html/**: Original template files preserved for reference
- **src/**: Clean Astro application structure

### API Routes

API endpoints are organized by user role:
- `/api/auth/` - Authentication endpoints
- `/api/student/` - Student-specific endpoints
- `/api/teacher/` - Teacher-specific endpoints
- `/api/parent/` - Parent-specific endpoints
- `/api/admin/` - Admin-specific endpoints

## 🚢 Deployment

Multiple deployment options are available:

### Docker
```bash
docker build -f deployment/Dockerfile -t astro-school .
docker run -p 4321:4321 astro-school
```

### Coolify
Refer to `deployment/` folder for Coolify-specific configurations.

### Vercel/Netlify
Standard Astro deployment process applies.

## 📚 Documentation

Detailed documentation is available in the `docs/` folder:
- Project tasks and planning
- Implementation guides
- API documentation
- Deployment guides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file in `legacy-html/` for details.

## 🆘 Support

For support and questions, please refer to the documentation in the `docs/` folder or create an issue in the repository.