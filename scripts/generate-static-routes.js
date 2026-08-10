import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

const pageMeta = {
  about: {
    title: 'About | Private Big Five Personality Test - Manasile',
    description:
      'Learn about Manasile, our approach to Big Five personality testing, and our commitment to free, privacy-first assessments with no sign-up required.',
  },
  faq: {
    title: 'Frequently Asked Questions | Manasile',
    description:
      'Find answers to common questions about Manasile assessments, privacy, pricing, and more.',
  },
  terms: {
    title: 'Terms & Conditions | Manasile',
    description: 'Read the Terms and Conditions of using Manasile psychological assessment platform.',
  },
};

function escapeForAttribute(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function applyPageMeta(html, canonicalUrl, meta) {
  let out = html;

  // Canonical — always point at this page's own URL
  out = out.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // og:url / twitter:url — should also point at this page, not root
  out = out.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  out = out.replace(
    /<meta property="twitter:url" content="[^"]*" \/>/,
    `<meta property="twitter:url" content="${canonicalUrl}" />`
  );

  if (meta) {
    const title = escapeForAttribute(meta.title);
    const description = escapeForAttribute(meta.description);

    out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    out = out.replace(
      /<meta name="description"\s+content="[^"]*" \/>/,
      `<meta name="description"\n      content="${description}" />`
    );
    out = out.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    );
    out = out.replace(
      /<meta property="og:description"\s+content="[^"]*" \/>/,
      `<meta property="og:description"\n      content="${description}" />`
    );
    out = out.replace(
      /<meta property="twitter:title" content="[^"]*" \/>/,
      `<meta property="twitter:title" content="${title}" />`
    );
    out = out.replace(
      /<meta property="twitter:description"\s+content="[^"]*" \/>/,
      `<meta property="twitter:description"\n      content="${description}" />`
    );
  }

  return out;
}

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

      // Clean trailing and leading slashes to get the lookup key
      if (routePath.endsWith('/')) {
        routePath = routePath.slice(0, -1);
      }
      if (routePath.startsWith('/')) {
        routePath = routePath.slice(1);
      }

      // Root path is already index.html with correct meta baked in, skip it
      if (!routePath) {
        return;
      }

      // Canonical URL for this page = exactly what's in the sitemap
      // (preserve trailing slash as submitted).
      const canonicalUrl = urlStr;

      const meta = pageMeta[routePath];
      if (!meta) {
        console.warn(
          `⚠ No pageMeta entry for "${routePath}" — title/description will fall back to the homepage's. Add an entry to pageMeta.`
        );
      }

      const pageHtml = applyPageMeta(indexContent, canonicalUrl, meta);

      const targetDir = path.resolve(distPath, routePath);
      const targetFile = path.resolve(targetDir, 'index.html');

      // Create route directory
      fs.mkdirSync(targetDir, { recursive: true });

      // Write customized index.html copy
      fs.writeFileSync(targetFile, pageHtml, 'utf8');
      console.log(`✓ Created static fallback: /${routePath}/index.html (canonical: ${canonicalUrl})`);
    } catch (err) {
      console.error(`Error processing URL ${urlStr}:`, err.message);
    }
  });

  console.log('Static route generation complete!');
}

generateStaticRoutes();
