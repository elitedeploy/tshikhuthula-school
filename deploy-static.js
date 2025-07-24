#!/usr/bin/env node
/**
 * Deployment Script for Static Site with PHP Backend
 * 
 * This script helps prepare the project for deployment to 20i hosting
 * by building the static site and organizing files for upload.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { execSync } from 'child_process';

const CONFIG = {
    staticBuildDir: 'dist',
    phpBackendDir: 'php-backend',
    deploymentDir: 'deployment-package',
    staticSiteDir: 'static-site',
    apiDir: 'api'
};

function log(message) {
    console.log(`[DEPLOY] ${message}`);
}

function error(message) {
    console.error(`[ERROR] ${message}`);
    process.exit(1);
}

function ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`Created directory: ${dir}`);
    }
}

function copyDirectory(src, dest) {
    ensureDirectoryExists(dest);
    
    const items = fs.readdirSync(src);
    
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function createDeploymentInstructions() {
    const instructions = `# Deployment Instructions for 20i Hosting

## Overview
This package contains a static website with a PHP backend for the school management system.

## Files Structure
- \`static-site/\` - Upload this to your main domain directory
- \`api/\` - Upload this to a subdirectory (e.g., /api/ or /backend/)
- \`database/\` - Contains MySQL schema file for database setup

## Deployment Steps

### 1. Database Setup
1. Create a MySQL database in your 20i control panel
2. Import \`database/mysql_schema.sql\` using phpMyAdmin
3. Update database credentials in \`api/config/database.php\`

### 2. File Upload
1. Upload contents of \`static-site/\` to your main domain directory
2. Upload \`api/\` folder to your hosting (e.g., as \`/api/\` or \`/backend/\`)
3. Set permissions: \`chmod 755 api/uploads/\`

### 3. Configuration
1. Update API URLs in static site files to match your domain
2. Change default admin password (username: admin, password: admin123)
3. Test the application

### 4. Security
- Change default admin credentials immediately
- Ensure uploads directory has proper permissions
- Enable HTTPS if available
- Regular database backups

## Testing
1. Visit your domain to see the static site
2. Try logging into admin panel
3. Test application submission
4. Verify all API endpoints work

## Support
Refer to \`api/README.md\` for detailed documentation and troubleshooting.

---
Generated on: ${new Date().toISOString()}
`;

    fs.writeFileSync(path.join(CONFIG.deploymentDir, 'DEPLOYMENT_INSTRUCTIONS.md'), instructions);
    log('Created deployment instructions');
}

function updateApiUrls() {
    // This function would update API URLs in the static files
    // For now, we'll create a note about manual updates needed
    const note = `# API URL Configuration

## Manual Updates Required

After deployment, you'll need to update the API URLs in your static site files.

### Files to Update:
1. Look for any JavaScript files that make API calls
2. Update URLs from localhost to your actual domain
3. Example: Change \`http://localhost:8080/api/\` to \`https://yourdomain.com/api/\`

### Common Patterns to Find:
- \`fetch('/api/\` or \`fetch('http://localhost\`
- \`axios.get('/api/\` or similar
- Any hardcoded localhost URLs

### Recommended Approach:
1. Use environment variables or config files
2. Set API base URL based on environment
3. Use relative URLs where possible

### Example Configuration:
\`\`\`javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'https://yourdomain.com/api';
\`\`\`
`;

    fs.writeFileSync(path.join(CONFIG.deploymentDir, 'API_URL_CONFIGURATION.md'), note);
    log('Created API URL configuration guide');
}

function main() {
    log('Starting deployment preparation...');
    
    // Clean up previous deployment
    if (fs.existsSync(CONFIG.deploymentDir)) {
        fs.rmSync(CONFIG.deploymentDir, { recursive: true, force: true });
        log('Cleaned up previous deployment package');
    }
    
    // Create deployment directory
    ensureDirectoryExists(CONFIG.deploymentDir);
    
    // Step 1: Build static site
    log('Building static site...');
    try {
        // Temporarily move API folder to avoid build issues
        if (fs.existsSync('src/pages/api')) {
            if (fs.existsSync('api-backup-temp')) {
                fs.rmSync('api-backup-temp', { recursive: true, force: true });
            }
            fs.renameSync('src/pages/api', 'api-backup-temp');
            log('Temporarily moved API folder');
        }
        
        execSync('npm run build:static', { stdio: 'inherit' });
        log('Static site built successfully');
        
        // Restore API folder
        if (fs.existsSync('api-backup-temp')) {
            fs.renameSync('api-backup-temp', 'src/pages/api');
            log('Restored API folder');
        }
    } catch (err) {
        error(`Failed to build static site: ${err.message}`);
    }
    
    // Step 2: Copy static site
    if (!fs.existsSync(CONFIG.staticBuildDir)) {
        error(`Static build directory '${CONFIG.staticBuildDir}' not found`);
    }
    
    log('Copying static site files...');
    copyDirectory(CONFIG.staticBuildDir, path.join(CONFIG.deploymentDir, CONFIG.staticSiteDir));
    
    // Step 3: Copy PHP backend
    if (!fs.existsSync(CONFIG.phpBackendDir)) {
        error(`PHP backend directory '${CONFIG.phpBackendDir}' not found`);
    }
    
    log('Copying PHP backend files...');
    copyDirectory(CONFIG.phpBackendDir, path.join(CONFIG.deploymentDir, CONFIG.apiDir));
    
    // Step 4: Create deployment instructions
    createDeploymentInstructions();
    
    // Step 5: Create API URL configuration guide
    updateApiUrls();
    
    // Step 6: Create package info
    const packageInfo = {
        name: 'School Management System - Static Site with PHP Backend',
        version: '1.0.0',
        buildDate: new Date().toISOString(),
        components: {
            staticSite: 'Astro-generated static HTML/CSS/JS files',
            phpBackend: 'PHP API endpoints and authentication system',
            database: 'MySQL schema and initial data'
        },
        deployment: {
            target: '20i Hosting',
            requirements: ['PHP 7.4+', 'MySQL 5.7+', 'Web server with PHP support']
        }
    };
    
    fs.writeFileSync(
        path.join(CONFIG.deploymentDir, 'package.json'),
        JSON.stringify(packageInfo, null, 2)
    );
    
    log('\n=== Deployment Package Ready ===');
    log(`Location: ${CONFIG.deploymentDir}/`);
    log('\nNext steps:');
    log('1. Read DEPLOYMENT_INSTRUCTIONS.md');
    log('2. Set up MySQL database');
    log('3. Upload files to 20i hosting');
    log('4. Configure API URLs');
    log('5. Test the application');
    log('\n=== Package Contents ===');
    log(`- ${CONFIG.staticSiteDir}/ - Static website files`);
    log(`- ${CONFIG.apiDir}/ - PHP backend`);
    log('- DEPLOYMENT_INSTRUCTIONS.md - Step-by-step guide');
    log('- API_URL_CONFIGURATION.md - API configuration guide');
    log('- package.json - Package information');
}

// Run main function when script is executed
main();

export { main };