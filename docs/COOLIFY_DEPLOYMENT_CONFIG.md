# Coolify Deployment Configuration for Astro School Template

This document provides the complete configuration needed to deploy the Astro School Template application using Coolify.

## Project Overview

- **Application Type**: Astro SSR (Server-Side Rendered) with Node.js adapter
- **Output Mode**: `server` (standalone)
- **Port**: 4321 (default Astro preview port)
- **Build Command**: `npm run build`
- **Start Command**: `node ./dist/server/entry.mjs`

## Required Files

### 1. Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Multi-stage build for Astro SSR application
FROM node:lts AS base
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

# Build stage
FROM build-deps AS build
COPY . .
RUN npm run build

# Runtime stage
FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Expose port
EXPOSE 4321

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4321/ || exit 1

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
```

### 2. .dockerignore

Create a `.dockerignore` file:

```
node_modules
.git
.gitignore
README.md
.env
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
dist
.astro
```

## Coolify Configuration Steps

### Step 1: Create New Resource

1. In Coolify dashboard, create a new project
2. Click "Create New Resource"
3. Choose "Public Repository" (since your repo is public)
4. Enter repository URL: `https://github.com/servaas101/astro-school-template.git`

### Step 2: Build Pack Configuration

1. **Build Pack**: Select "Dockerfile" (not Nixpacks)
2. **Branch**: `main`
3. **Base Directory**: `/` (root directory)
4. **Dockerfile Location**: `./Dockerfile`

### Step 3: Network Settings

1. **Port**: `4321`
2. **Protocol**: `HTTP`
3. **Domain**: Set your custom domain (e.g., `school.yourdomain.com`)
4. **SSL**: Enable automatic SSL certificate

### Step 4: Environment Variables

Set the following environment variables in Coolify:

```
NODE_ENV=production
HOST=0.0.0.0
PORT=4321
```

### Step 5: Build Configuration

- **Build Command**: `npm run build` (handled by Dockerfile)
- **Install Command**: `npm install` (handled by Dockerfile)
- **Start Command**: `node ./dist/server/entry.mjs` (handled by Dockerfile)

## Alternative: Using Nixpacks (Simpler Option)

If you prefer not to use a Dockerfile, you can use Nixpacks:

### Nixpacks Configuration

1. **Build Pack**: Select "Nixpacks"
2. **Is it a static site?**: **NO** (this is an SSR application)
3. **Port**: `4321`
4. **Start Command**: `node ./dist/server/entry.mjs`
5. **Build Command**: `npm run build`

### Required: nixpacks.toml (Optional)

Create a `nixpacks.toml` file for custom Nixpacks configuration:

```toml
[phases.setup]
nixPkgs = ['nodejs_20', 'npm']

[phases.install]
cmds = ['npm ci']

[phases.build]
cmds = ['npm run build']

[start]
cmd = 'node ./dist/server/entry.mjs'

[variables]
NODE_ENV = 'production'
HOST = '0.0.0.0'
PORT = '4321'
```

## Deployment Checklist

- [ ] Repository is public and accessible
- [ ] `package.json` contains correct build and start scripts
- [ ] Astro config uses Node adapter with standalone mode
- [ ] Environment variables are set in Coolify
- [ ] Domain is configured and DNS points to Coolify server
- [ ] SSL certificate is enabled
- [ ] Port 4321 is configured
- [ ] Health checks are working

## Troubleshooting

### Common Issues

1. **"No Available Server" Error**
   - Check if container is healthy: `docker ps`
   - Verify port configuration matches application port (4321)
   - Ensure application listens on `0.0.0.0` not just `localhost`

2. **Build Failures**
   - Check build logs in Coolify
   - Verify all dependencies are in `package.json`
   - Ensure Node.js version compatibility

3. **Application Not Starting**
   - Check if `dist/server/entry.mjs` exists after build
   - Verify start command is correct
   - Check environment variables

### Health Check Endpoint (Optional)

Add a health check endpoint to your Astro application:

```javascript
// src/pages/health.ts
export async function GET() {
  return new Response('OK', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
```

## Performance Optimization

1. **Multi-stage Docker Build**: Reduces final image size
2. **Production Dependencies**: Only installs production dependencies in final stage
3. **Health Checks**: Ensures application is running correctly
4. **Environment Variables**: Proper configuration for production

## Security Considerations

1. Use environment variables for sensitive data
2. Don't commit `.env` files to repository
3. Enable SSL certificates
4. Use latest Node.js LTS version
5. Regularly update dependencies

## Repository Information

- **Current Repository**: `https://github.com/servaas101/astro-school-template.git`
- **Branch**: `main`
- **Application Type**: School Management System with Multi-Portal Authentication
- **Framework**: Astro with Node.js SSR

## Next Steps

1. Create the `Dockerfile` and `.dockerignore` files in your repository
2. Commit and push changes to GitHub
3. Configure Coolify with the settings above
4. Deploy and test the application
5. Set up monitoring and backups in Coolify

This configuration will deploy your Astro school management system as a fully functional SSR application with proper authentication, session management, and all the portal features working correctly.