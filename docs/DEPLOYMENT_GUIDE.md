# 🚀 Deployment Guide - Astro School Management Template

This guide covers deploying the Astro School Management Template across different environments and hosting platforms.

## 📋 Table of Contents

1. [Environment Configurations](#environment-configurations)
2. [Build Commands](#build-commands)
3. [Deployment Platforms](#deployment-platforms)
   - [Coolify](#coolify)
   - [20i Hosting](#20i-hosting)
   - [Cloudflare Pages](#cloudflare-pages)
   - [Vercel](#vercel)
   - [Netlify](#netlify)
   - [Traditional VPS/Dedicated Server](#traditional-vpsdeicated-server)
4. [Environment Variables](#environment-variables)
5. [Troubleshooting](#troubleshooting)

## 🔧 Environment Configurations

The project includes multiple configuration files for different deployment scenarios:

### Configuration Files

- **`config/astro.config.dev.mjs`** - Development environment
- **`config/astro.config.prod.mjs`** - Production (SSR with Node.js)
- **`config/astro.config.static.mjs`** - Static site generation
- **`config/astro.config.cloudflare.mjs`** - Cloudflare Pages with Functions

### Key Differences

| Configuration | Output Mode | Adapter | Use Case |
|---------------|-------------|---------|----------|
| Development | `server` | Node.js | Local development |
| Production | `server` | Node.js | VPS, dedicated servers, Docker |
| Static | `static` | None | Static hosting (CDN) |
| Cloudflare | `server` | Cloudflare | Cloudflare Pages with Functions |
| Vercel | `server` | Vercel | Vercel serverless functions |
| Netlify | `server` | Netlify | Netlify serverless functions |

## 🛠️ Build Commands

```bash
# Development
npm run dev              # Start dev server with dev config
npm run start            # Alias for dev

# Building
npm run build            # Production build (default)
npm run build:dev        # Development build
npm run build:prod       # Production build (SSR)
npm run build:static     # Static build
npm run build:cloudflare # Cloudflare Pages build
npm run build:vercel     # Vercel build
npm run build:netlify    # Netlify build

# Preview
npm run preview          # Preview production build
npm run preview:prod     # Preview production build
npm run preview:static   # Preview static build
```

## 🌐 Deployment Platforms

### GitHub Actions Workflow

This project includes a comprehensive GitHub Actions workflow (`.github/workflows/deploy.yml`) that supports automated deployment to multiple platforms:

#### Features
- **Multi-platform builds**: Automatically builds for static, production, and Cloudflare configurations
- **Conditional deployment**: Deploys to different platforms based on branch and triggers
- **Manual deployment**: Supports manual deployment via workflow dispatch
- **Docker support**: Builds and pushes Docker images
- **Artifact management**: Efficient build artifact handling

#### Required Secrets

Add these secrets to your GitHub repository settings:

```bash
# Cloudflare
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Docker Hub
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_password
```

#### Manual Deployment Trigger

1. Go to your repository's Actions tab
2. Select "Deploy to Multiple Platforms" workflow
3. Click "Run workflow"
4. Choose your deployment target
5. Click "Run workflow"

### Coolify

**Best for**: Self-hosted deployment with Docker

#### Prerequisites
- Coolify instance running
- Git repository access
- Domain name (optional)

#### Deployment Steps

1. **Create New Project in Coolify**
   ```
   - Go to your Coolify dashboard
   - Click "New Project"
   - Select "Git Repository"
   - Connect your repository
   ```

2. **Configure Build Settings**
   ```yaml
   # Use the Dockerfile from deployment folder
   Build Pack: Dockerfile
   Dockerfile Location: ./deployment/Dockerfile
   
   # Or use Nixpacks
   Build Pack: Nixpacks
   Nixpacks Config: ./deployment/nixpacks.toml
   ```

3. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=4321
   JWT_SECRET=your-jwt-secret-here
   SITE_URL=https://your-domain.com
   ```

4. **Port Configuration**
   ```
   Port: 4321
   Health Check: /health
   ```

5. **Deploy**
   ```bash
   # Coolify will automatically build and deploy
   # Monitor logs in the Coolify dashboard
   ```

#### Coolify Configuration Files

- **Dockerfile**: `deployment/Dockerfile`
- **Nixpacks**: `deployment/nixpacks.toml`
- **Docker Ignore**: `deployment/.dockerignore`

---

### 20i Hosting

**Best for**: Shared hosting with Node.js support

#### Prerequisites
- 20i hosting account with Node.js support
- SSH access (recommended)
- Domain configured

#### Deployment Steps

1. **Prepare Build**
   ```bash
   # Build for production
   npm run build:prod
   
   # Create deployment package
   tar -czf deployment.tar.gz dist/ package.json package-lock.json
   ```

2. **Upload via SSH**
   ```bash
   # Upload to your 20i hosting
   scp deployment.tar.gz user@your-domain.com:~/
   
   # SSH into server
   ssh user@your-domain.com
   
   # Extract files
   tar -xzf deployment.tar.gz
   
   # Install production dependencies
   npm ci --production
   ```

3. **Configure Node.js App**
   ```javascript
   // In 20i control panel, set:
   // Entry Point: dist/server/entry.mjs
   // Node Version: 18.x or higher
   ```

4. **Environment Variables (20i Control Panel)**
   ```env
   NODE_ENV=production
   JWT_SECRET=your-jwt-secret-here
   SITE_URL=https://your-domain.com
   ```

#### 20i Specific Notes

- Ensure Node.js version is 18+
- Use the 20i control panel for environment variables
- Monitor logs through 20i dashboard
- Consider using PM2 for process management

---

### Cloudflare Pages

**Best for**: Global CDN with serverless functions

#### Option 1: Static Deployment

1. **Build Configuration**
   ```bash
   # Build command
   npm run build:static
   
   # Output directory
   dist
   ```

2. **Cloudflare Pages Settings**
   ```yaml
   Framework: Astro
   Build Command: npm run build:static
   Build Output Directory: dist
   Node.js Version: 18
   ```

#### Option 2: SSR with Functions

1. **Install Cloudflare Adapter**
   ```bash
   npm install @astrojs/cloudflare
   ```

2. **Build Configuration**
   ```bash
   # Build command
   npm run build:cloudflare
   
   # Output directory
   dist
   ```

3. **Environment Variables**
   ```env
   NODE_ENV=production
   JWT_SECRET=your-jwt-secret-here
   ```

#### Cloudflare Pages Configuration

```yaml
# wrangler.toml (in deployment folder)
name = "astro-school-template"
compatibility_date = "2024-01-01"

[env.production]
vars = { NODE_ENV = "production" }
```

---

### Vercel

**Best for**: Serverless deployment with global CDN

This project includes a `vercel.json` configuration file for seamless Vercel deployment.

#### Automatic Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically use the `vercel.json` configuration
3. Deployments trigger automatically on push to main branch

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Build for Vercel
npm run build:vercel

# Deploy
vercel --prod
```

#### Environment Variables
```env
NODE_ENV=production
DEPLOYMENT_PLATFORM=vercel
# Add your custom environment variables in Vercel dashboard
```

#### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

### Netlify

**Best for**: JAMstack deployment with form handling

This project includes a `netlify.toml` configuration file for seamless Netlify deployment.

#### Automatic Deployment (Recommended)
1. Connect your GitHub repository to Netlify
2. Netlify will automatically use the `netlify.toml` configuration
3. Deployments trigger automatically on push to main branch

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build for Netlify
npm run build:netlify

# Deploy
netlify deploy --prod --dir=dist
```

#### Environment Variables
```env
NODE_ENV=production
DEPLOYMENT_PLATFORM=netlify
# Add your custom environment variables in Netlify dashboard
```

#### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build:netlify"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

---

### Traditional VPS/Dedicated Server

**Best for**: Full control, custom configurations

#### Prerequisites
- Ubuntu/CentOS server
- Node.js 18+
- Nginx (recommended)
- PM2 (process manager)
- SSL certificate

#### Deployment Steps

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/astro-school-template.git
   cd astro-school-template
   
   # Install dependencies
   npm ci --production
   
   # Build application
   npm run build:prod
   
   # Create PM2 ecosystem file
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'astro-school',
       script: './dist/server/entry.mjs',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 4321,
         JWT_SECRET: 'your-jwt-secret-here'
       }
     }]
   };
   EOF
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/astro-school
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:4321;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable Site and SSL**
   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/astro-school /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   
   # Install Certbot for SSL
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com
   ```

## 🔐 Environment Variables

### Required Variables

```env
# Application
NODE_ENV=production
PORT=4321
SITE_URL=https://your-domain.com

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_SECRET=your-session-secret-here

# Database (if using)
DATABASE_URL=your-database-connection-string

# Email (if using)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

### Platform-Specific Variables

#### Cloudflare Pages
```env
CF_PAGES=true
CF_PAGES_BRANCH=main
```

#### Vercel
```env
VERCEL=true
VERCEL_ENV=production
```

#### Netlify
```env
NETLIFY=true
CONTEXT=production
```

## 🔧 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+

# Verify configuration
npm run build:prod -- --verbose
```

#### Runtime Errors

```bash
# Check logs
pm2 logs astro-school  # For PM2

# Check environment variables
echo $NODE_ENV
echo $JWT_SECRET

# Test locally
npm run preview:prod
```

#### Performance Issues

```bash
# Enable compression in Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Use CDN for static assets
# Configure caching headers
```

### Platform-Specific Issues

#### Coolify
- Check Docker logs in dashboard
- Verify port configuration (4321)
- Ensure health check endpoint works

#### 20i Hosting
- Verify Node.js version in control panel
- Check file permissions
- Monitor resource usage

#### Cloudflare Pages
- Check Functions logs
- Verify wrangler.toml configuration
- Test locally with Wrangler CLI

### Getting Help

1. **Check Logs**: Always start by checking application logs
2. **Verify Configuration**: Ensure environment variables are set correctly
3. **Test Locally**: Reproduce issues in local environment
4. **Platform Documentation**: Refer to platform-specific documentation
5. **Community Support**: Check Astro Discord/GitHub for similar issues

---

## 📚 Additional Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Coolify Documentation](https://coolify.io/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Astro Guide](https://vercel.com/guides/deploying-astro-with-vercel)
- [Netlify Astro Guide](https://docs.netlify.com/integrations/frameworks/astro/)

---

*This deployment guide covers the most common scenarios. For specific requirements or custom setups, refer to the platform documentation or create an issue in the repository.*