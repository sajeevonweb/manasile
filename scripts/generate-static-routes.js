import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

function generateStaticRoutes() {
  console.log('Generating static routes for GitHub Pages...');

  if (!fs.existsSync(sitemapPath)) {
    console.error(`Sitemap not found at ${sitemapPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(indexPath)) {
    console.error(`Build index.html not found at ${indexPath}. Make sure to run vite build first.`);
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

  // Simple regex to extract <loc> contents
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} URLs in sitemap.`);

  const indexContent = fs.readFileSync(indexPath, 'utf8');

  urls.forEach((urlStr) => {
    try {
      const url = new URL(urlStr);
      let routePath = url.pathname;

      // Clean trailing and leading slashes
      if (routePath.endsWith('/')) {
        routePath = routePath.slice(0, -1);
      }
      if (routePath.startsWith('/')) {
        routePath = routePath.slice(1);
      }

      // Root path is already index.html, skip it
      if (!routePath) {
        return;
      }

      const targetDir = path.resolve(distPath, routePath);
      const targetFile = path.resolve(targetDir, 'index.html');

      // Create route directory
      fs.mkdirSync(targetDir, { recursive: true });

      // Write index.html copy
      fs.writeFileSync(targetFile, indexContent, 'utf8');
      console.log(`✓ Created static fallback: /${routePath}/index.html`);
    } catch (err) {
      console.error(`Error processing URL ${urlStr}:`, err.message);
    }
  });

  console.log('Static route generation complete!');
}

generateStaticRoutes();
