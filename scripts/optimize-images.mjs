// Builds responsive AVIF + WebP files from the original photos and writes
// src/data/images.json (sizes used by the <rh-img> tag in vite.config.js).
// Originals stay untouched in /images. Re-run with `npm run images`.
import sharp from 'sharp';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// widths are capped at the source width (no upscaling). `square` = cropped thumbnail.
const photos = [
  { name: 'hero',                src: 'images/backg (2).png',      widths: [480, 720, 917] },
  { name: 'interior',            src: 'images/backg.png',          widths: [480, 720, 886] },
  { name: 'dining',              src: 'atm.png',                   widths: [454] },
  { name: 'bar',                 src: 'images/road straw.png',     widths: [480, 720, 923] },
  { name: 'grill-table',         src: 'images/lam.png',            widths: [480, 720, 931] },
  { name: 'platters',            src: 'images/platmeat.png',       widths: [480, 720, 934] },
  { name: 'pizza-1',             src: 'images/piz.png',            widths: [480, 720, 928] },
  { name: 'pizza-2',             src: 'images/pizz.png',           widths: [480, 720, 962] },
  { name: 'beer',                src: 'images/hansa.png',          widths: [480, 720, 936] },
  { name: 'booking',             src: 'straw.jpg',                 widths: [480, 720, 960] },
  { name: 'cat-burgers',          src: 'images/chickenstrip.png',   widths: [480, 720, 919] },
  { name: 'cat-cocktails',        src: 'images/BLUE.png',           widths: [480, 720, 939] },
  { name: 'chicken-strips',     src: 'images/chickenstrip.png',   widths: [168, 336, 520], square: true },
  { name: 'honey-glazed-wings',  src: 'images/honeyglazed.jpg',    widths: [168, 336], square: true },
  { name: 'classic-margarita',   src: 'images/classic-margarita.jpg', widths: [168, 336], square: true },
  { name: 'watermelon-margarita',src: 'images/WaterMargarita.jpg', widths: [168, 336], square: true },
  { name: 'strawberry-daiquiri', src: 'images/staw.png',           widths: [168, 336], square: true },
  { name: 'classic-mojito',      src: 'images/moh.png',            widths: [168, 336], square: true },
  { name: 'pina-colada',         src: 'images/pina-colada.jpg',    widths: [168, 336], square: true },
  { name: 'espresso-martini',    src: 'images/express.png',        widths: [168, 336], square: true },
  { name: 'blue-lagoon',         src: 'images/BLUE.png',          widths: [168, 336, 520], square: true },
  { name: 'whiskey-sour',        src: 'images/whiskey-sour.jpg',   widths: [168, 336], square: true },
];

const manifest = {};
for (const p of photos) {
  const meta = await sharp(p.src).metadata();
  const widths = [...new Set(p.widths.map(w => Math.min(w, meta.width)))].sort((a, b) => a - b);
  const ratio = p.square ? 1 : meta.height / meta.width;
  for (const w of widths) {
    const h = Math.round(w * ratio);
    const base = join(OUT, `${p.name}-${w}`);
    const pipe = () => sharp(p.src).rotate().resize(w, h, { fit: 'cover', position: sharp.strategy.attention });
    if (true) await pipe().webp({ quality: 74, effort: 5 }).toFile(base + '.webp');
    if (true) await pipe().avif({ quality: 44, effort: 4 }).toFile(base + '.avif');
  }
  manifest[p.name] = { widths, ratio: +ratio.toFixed(4) };
}
// ── Dish photos: drop <dish-name>.jpg into photos/menu/ (see photos/menu/CHECKLIST.md for the exact names) ──
{
  const PHOTO_SECTIONS = new Set(['burgers', 'grills', 'pizza', 'wraps', 'platters', 'cocktails']);
  const slug = (name) => name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const menu = JSON.parse(readFileSync('src/data/menu.json', 'utf8'));
  const DIR = 'photos/menu';
  mkdirSync(DIR, { recursive: true });
  const files = readdirSync(DIR);
  const rows = [];
  let n = 0;
  for (const s of menu.sections.filter((x) => PHOTO_SECTIONS.has(x.id))) {
    rows.push(`\n### ${s.title}\n\n| Dish | File name | Photo |\n|---|---|---|`);
    for (const g of s.groups.filter((x) => x.type === 'dishes')) {
      for (const it of g.items) {
        const key = slug(it.name);
        const file = files.find((f) => f.replace(/\.[^.]+$/, '').toLowerCase() === key && /\.(jpe?g|png|webp|avif)$/i.test(f));
        const legacy = it.image ? ' (older photo in use)' : '';
        if (file) {
          n++;
          const src = join(DIR, file);
          const widths = [240, 480];
          for (const w of widths) {
            const base = join(OUT, `dish-${key}-${w}`);
            const fresh = (ext) => existsSync(`${base}.${ext}`) && statSync(`${base}.${ext}`).mtimeMs > statSync(src).mtimeMs;
            const pipe = () => sharp(src).rotate().resize(w, w, { fit: 'cover', position: sharp.strategy.attention });
            if (!fresh('webp')) await pipe().webp({ quality: 74, effort: 5 }).toFile(`${base}.webp`);
            if (!fresh('avif')) await pipe().avif({ quality: 44, effort: 4 }).toFile(`${base}.avif`);
          }
          manifest[`dish-${key}`] = { widths, ratio: 1 };
        }
        rows.push(`| ${it.name} | \`${key}.jpg\` | ${file ? '✅ ' + file : legacy ? '🟡 older photo in use — replace if you have a better one' : '⬜ missing'} |`);
      }
    }
  }
  writeFileSync(
    join(DIR, 'CHECKLIST.md'),
    `# Menu photo checklist\n\nSave each photo in this folder using the file name shown (.jpg, .png or .webp), then run \`npm run build\`.\n` +
      `Square or portrait photos of the plate/glass work best (they are cropped to a square). ${n} photo(s) added so far.\n` +
      rows.join('\n') + '\n',
  );
  console.log('dish photos found:', n);
}

writeFileSync('src/data/images.json', JSON.stringify(manifest, null, 2));

// Logo: white-on-black original -> transparent white logo (luminance becomes alpha)
{
  const { data, info } = await sharp('logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const lum = Math.max(data[i], data[i + 1], data[i + 2]);
    out[i] = out[i + 1] = out[i + 2] = 255;
    out[i + 3] = lum < 24 ? 0 : lum;
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).resize({ height: 120 }).png({ compressionLevel: 9 }).toFile('public/logo-white.png');
  await sharp('logo.png').resize(180, 180, { fit: 'contain', background: '#000' }).png().toFile('public/apple-touch-icon.png');
  await sharp('logo.png').resize(64, 64, { fit: 'contain', background: '#000' }).png().toFile('public/favicon.png');
}

// Open Graph / social share card 1200x630 (the site referenced one that didn't exist)
{
  const bg = await sharp('images/backg (2).png').resize(1200, 630, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.45 }).toBuffer();
  const logo = await sharp('public/logo-white.png').resize({ height: 300 }).toBuffer();
  await sharp(bg).composite([{ input: logo, gravity: 'centre' }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og-image.jpg');
}

console.log('images ok:', Object.keys(manifest).length, 'photos;', statSync('public/og-image.jpg').size, 'bytes og');
