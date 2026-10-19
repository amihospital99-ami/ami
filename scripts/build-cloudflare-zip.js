import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const outputZip = path.resolve(rootDir, 'ami-hospital-cloudflare-pages.zip');

async function createCloudflareZip() {
  console.log('Generating Cloudflare Pages deployment bundle...');
  const zip = new JSZip();

  // Cloudflare Pages headers configuration
  const headersContent = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
  Cache-Control: public, max-age=3600

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

  // Cloudflare Pages routes configuration
  const routesContent = JSON.stringify({
    version: 1,
    include: ["/*"],
    exclude: []
  }, null, 2);

  // Cloudflare Pages deploy instructions
  const readmeContent = `# Ami Hospital - Cloudflare Pages Deployment Package

This ZIP package is pre-configured and ready to deploy directly to Cloudflare Pages.

## Option 1: Direct Upload (No Git Required - Fastest)
1. Log in to the Cloudflare Dashboard: https://dash.cloudflare.com/
2. Go to **Workers & Pages** > **Create application** > **Pages** tab.
3. Select **Upload assets**.
4. Enter a project name (e.g. \`ami-hospital\`).
5. Drag and drop this extracted folder (or upload the zip).
6. Click **Deploy site**.
Your site will instantly be live at \`https://ami-hospital.pages.dev\`!

## Option 2: Deploy via Wrangler CLI
\`\`\`bash
npm install -g wrangler
wrangler pages deploy dist --project-name=ami-hospital
\`\`\`

## Included Files:
- \`index.html\`: The optimized Ami Hospital landing page application.
- \`assets/\`: Bundled JavaScript and Tailwind CSS assets.
- \`_headers\`: Pre-configured security and caching HTTP response headers for Cloudflare edge CDN.
- \`_routes.json\`: Cloudflare routing rules.
`;

  // Check if dist exists
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist! Please run "npm run build" first.');
    process.exit(1);
  }

  // Recursively add all files from dist/
  function addDirectory(currentPath, zipFolder) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(item);
        addDirectory(itemPath, subFolder);
      } else {
        const fileData = fs.readFileSync(itemPath);
        zipFolder.file(item, fileData);
      }
    }
  }

  addDirectory(distDir, zip);

  // Add Cloudflare specific files if not already present
  zip.file('_headers', headersContent);
  zip.file('_routes.json', routesContent);
  zip.file('README.md', readmeContent);

  // Generate zip file
  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  fs.writeFileSync(outputZip, zipBuffer);
  const sizeMb = (zipBuffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✅ Successfully generated: ${outputZip} (${sizeMb} MB)`);
}

createCloudflareZip().catch(err => {
  console.error('Error generating zip:', err);
  process.exit(1);
});
