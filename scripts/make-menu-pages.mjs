// Writes one HTML page per menu category (pages/menu-<id>.html) from src/data/menu.json,
// and refreshes public/sitemap.xml. Runs automatically as part of `npm run build`.
import { readFileSync, writeFileSync } from 'node:fs';

const menu = JSON.parse(readFileSync('src/data/menu.json', 'utf8'));
const SITE = 'https://roadhousedeli.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

for (const s of menu.sections) {
  const title = `${s.title} | Roadhouse Deli & Grill Windhoek`;
  const desc = `${s.title} at Roadhouse Deli & Grill, Windhoek — every dish with description and price. Independence Avenue, opposite Hilton Hotel.`;
  const url = `${SITE}/menu-${s.id}.html`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#12100e" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#faf6ef" media="(prefers-color-scheme: light)">

  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/og-image.jpg">
  <meta property="og:site_name" content="Roadhouse Deli &amp; Grill">
  <meta name="twitter:card" content="summary_large_image">

  <!-- @menu-jsonld id="${s.id}" -->

  <link rel="icon" href="favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <script type="module" src="../src/pages/menu.js"></script>
</head>
<body>

<!-- @include header current="menu" -->

<main id="main">
  <!-- @menu-page ${s.id} -->
</main>

<!-- @include footer -->
</body>
</html>
`;
  writeFileSync(`pages/menu-${s.id}.html`, html);
}

const urls = ['index.html', 'menu.html', ...menu.sections.map((s) => `menu-${s.id}.html`), 'booking.html'];
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE}/${u}</loc></url>`).join('\n') + `\n</urlset>\n`,
);
console.log('menu pages:', menu.sections.length, '· sitemap urls:', urls.length);
