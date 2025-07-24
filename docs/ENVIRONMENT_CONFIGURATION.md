# Environment Configuration Guide

This guide explains how to configure and use different environments for the Astro School Template project.

## 🌍 Environment Overview

The project supports multiple environments through dynamic configuration loading based on environment variables:

| Environment | NODE_ENV | DEPLOYMENT_PLATFORM | Configuration File |
|-------------|----------|---------------------|--------------------|
| Development | `development` | - | `astro.config.dev.mjs` |
| Production | `production` | - | `astro.config.prod.mjs` |
| Static | `production` | `static` | `astro.config.static.mjs` |
| Cloudflare | `production` | `cloudflare` | `astro.config.cloudflare.mjs` |
| Vercel | `production` | `vercel` | `astro.config.vercel.mjs` |
| Netlify | `production` | `netlify` | `astro.config.netlify.mjs` |

## 🔧 Configuration Files

### Development Configuration (`astro.config.dev.mjs`)

**Purpose**: Local development with hot reload and debugging features

**Features**:
- Server-side rendering enabled
- Development server on port 4321
- Source maps enabled
- Hot module replacement
- Detailed error reporting

**Usage**:
```bash
npm run dev
# or
npm run build:dev
```

### Production Configuration (`astro.config.prod.mjs`)

**Purpose**: Traditional hosting environments (VPS, shared hosting, dedicated servers)

**Features**:
- Server-side rendering with Node.js adapter
- Asset optimization and minification
- HTML compression
- Production-ready build

**Usage**:
```bash
npm run build:prod
```

### Static Configuration (`astro.config.static.mjs`)

**Purpose**: Static site generation for CDN deployment

**Features**:
- Static output (no server required)
- Pre-rendered pages
- Optimized for CDN distribution
- Maximum performance

**Usage**:
```bash
npm run build:static
```

### Cloudflare Configuration (`astro.config.cloudflare.mjs`)

**Purpose**: Cloudflare Pages with Functions support

**Features**:
- Cloudflare Workers integration
- Edge computing capabilities
- Global CDN distribution
- Serverless functions

**Usage**:
```bash
npm run build:cloudflare
```

### Vercel Configuration (`astro.config.vercel.mjs`)

**Purpose**: Vercel deployment with serverless functions

**Features**:
- Vercel serverless functions
- Web Analytics integration
- Speed Insights
- Automatic deployments

**Usage**:
```bash
npm run build:vercel
```

### Netlify Configuration (`astro.config.netlify.mjs`)

**Purpose**: Netlify deployment with serverless functions

**Features**:
- Netlify Functions support
- Form handling
- Identity management
- Edge functions

**Usage**:
```bash
npm run build:netlify
```

## 🔄 Dynamic Configuration Loading

The main `astro.config.mjs` file automatically loads the appropriate configuration based on environment variables:

```javascript
// astro.config.mjs
const getConfig = async () => {
  const env = process.env.NODE_ENV || 'development';
  const platform = process.env.DEPLOYMENT_PLATFORM;
  
  if (env === 'development') {
    return (await import('./config/astro.config.dev.mjs')).default;
  }
  
  if (platform === 'cloudflare') {
    return (await import('./config/astro.config.cloudflare.mjs')).default;
  }
  
  if (platform === 'static') {
    return (await import('./config/astro.config.static.mjs')).default;
  }
  
  if (platform === 'vercel') {
    return (await import('./config/astro.config.vercel.mjs')).default;
  }
  
  if (platform === 'netlify') {
    return (await import('./config/astro.config.netlify.mjs')).default;
  }
  
  // Default to production config
  return (await import('./config/astro.config.prod.mjs')).default;
};
```

## 🌐 Environment Variables

### Setting Environment Variables

#### Local Development
Create a `.env` file in the project root:

```env
# .env
NODE_ENV=development
# DEPLOYMENT_PLATFORM is not needed for development
```

#### Production Deployment
Set environment variables in your deployment platform:

**For Cloudflare Pages:**
```env
NODE_ENV=production
DEPLOYMENT_PLATFORM=cloudflare
```

**For Vercel:**
```env
NODE_ENV=production
DEPLOYMENT_PLATFORM=vercel
```

**For Netlify:**
```env
NODE_ENV=production
DEPLOYMENT_PLATFORM=netlify
```

**For Static Hosting:**
```env
NODE_ENV=production
DEPLOYMENT_PLATFORM=static
```

### Command Line Override

You can also set environment variables directly in the command line:

```bash
# Windows (PowerShell)
$env:NODE_ENV="production"; $env:DEPLOYMENT_PLATFORM="cloudflare"; npm run build

# Windows (Command Prompt)
set NODE_ENV=production && set DEPLOYMENT_PLATFORM=cloudflare && npm run build

# macOS/Linux
NODE_ENV=production DEPLOYMENT_PLATFORM=cloudflare npm run build
```

## 🚀 Quick Start Examples

### Local Development
```bash
# Start development server
npm run dev

# Build for development (with debugging)
npm run build:dev
```

### Deploy to Cloudflare Pages
```bash
# Build for Cloudflare
npm run build:cloudflare

# Or with environment variables
$env:DEPLOYMENT_PLATFORM="cloudflare"; npm run build
```

### Deploy to Vercel
```bash
# Build for Vercel
npm run build:vercel

# Deploy using Vercel CLI
vercel --prod
```

### Deploy to Netlify
```bash
# Build for Netlify
npm run build:netlify

# Deploy using Netlify CLI
netlify deploy --prod --dir=dist
```

### Static Site Generation
```bash
# Build static site
npm run build:static

# Serve locally for testing
npm run preview:static
```

## 🔍 Troubleshooting

### Configuration Not Loading

1. **Check environment variables**:
   ```bash
   # Windows PowerShell
   echo $env:NODE_ENV
   echo $env:DEPLOYMENT_PLATFORM
   
   # macOS/Linux
   echo $NODE_ENV
   echo $DEPLOYMENT_PLATFORM
   ```

2. **Verify configuration file exists**:
   ```bash
   ls config/astro.config.*.mjs
   ```

3. **Check for syntax errors**:
   ```bash
   npm run build -- --dry-run
   ```

### Build Failures

1. **Clear cache and reinstall dependencies**:
   ```bash
   rm -rf node_modules dist .astro
   npm install
   ```

2. **Check adapter compatibility**:
   ```bash
   npm list @astrojs/cloudflare @astrojs/vercel @astrojs/netlify
   ```

3. **Verify Node.js version**:
   ```bash
   node --version  # Should be 18.x or higher
   ```

### Platform-Specific Issues

#### Cloudflare Pages
- Ensure `@astrojs/cloudflare` is installed
- Check Cloudflare Pages compatibility mode
- Verify environment variables in Cloudflare dashboard

#### Vercel
- Ensure `@astrojs/vercel` is installed
- Check `vercel.json` configuration
- Verify project settings in Vercel dashboard

#### Netlify
- Ensure `@astrojs/netlify` is installed
- Check `netlify.toml` configuration
- Verify build settings in Netlify dashboard

## 📚 Additional Resources

- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/)
- [Astro Adapters Guide](https://docs.astro.build/en/guides/server-side-rendering/)
- [Environment Variables in Astro](https://docs.astro.build/en/guides/environment-variables/)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)