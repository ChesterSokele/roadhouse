import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const images = JSON.parse(readFileSync('./src/data/images.json', 'utf8'));
const menu = JSON.parse(readFileSync('./src/data/menu.json', 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const attrs = (str) => Object.fromEntries([...str.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] ?? true]));

/** <picture> with AVIF + WebP at every generated width. Width/height are always set (no layout shift). */
function picture(name, { alt = '', sizes = '100vw', cls = '', eager = false, priority = false } = {}) {
  const img = images[name];
  if (!img) throw new Error(`Unknown image "${name}" — run npm run images`);
  const largest = img.widths[img.widths.length - 1];
  const height = Math.round(largest * img.ratio);
  const set = (ext) => img.widths.map((w) => `img/${name}-${w}.${ext} ${w}w`).join(', ');
  return (
    `<picture>` +
    `<source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">` +
    `<source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">` +
    `<img src="img/${name}-${largest}.webp" width="${largest}" height="${height}" alt="${esc(alt)}"` +
    `${cls ? ` class="${cls}"` : ''}${eager ? ' loading="eager"' : ' loading="lazy" decoding="async"'}${priority ? ' fetchpriority="high"' : ''}>` +
    `</picture>`
  );
}

/* ───────── Menu rendering (menu.json → static HTML) ───────── */
const priceNum = (p) => String(p).replace(/[^\d.]/g, '');

/** Menu sections whose dishes get a photo. Everything else (spirits, beers, wines, soft drinks) stays a clean text table. */
const PHOTO_SECTIONS = new Set(['burgers', 'grills', 'pizza', 'wraps', 'platters', 'cocktails']);
const dishSlug = (name) =>
  name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function renderDish(it, withPhotos = false) {
  const prices = it.prices
    ? it.prices.map((p) => `<span class="price"><small>${esc(p.label)}</small>${esc(p.price)}</span>`).join('')
    : `<span class="price">${esc(it.price)}</span>` + (it.virgin ? `<span class="price-sub"><span>Virgin</span> ${esc(it.virgin)}</span>` : '');
  // A photo dropped in photos/menu/<dish-name>.jpg wins; otherwise the photo set in menu.json; otherwise a branded placeholder.
  const own = images[`dish-${dishSlug(it.name)}`] ? `dish-${dishSlug(it.name)}` : it.image;
  const sizes = '(min-width: 560px) 128px, 96px';
  const photo = !withPhotos && !own ? ''
    : own ? `<span class="dish__photo">${picture(own, { sizes })}</span>`
      : `<span class="dish__photo dish__photo--empty" aria-hidden="true"><img src="logo-white.png" alt="" width="65" height="52" loading="lazy"></span>`;
  return (
    `<li class="dish${photo ? ' has-photo' : ''}">${photo}` +
    `<p class="dish__name"><span>${esc(it.name)}</span>${it.tag ? `<span class="dish__tag">${esc(it.tag)}</span>` : ''}</p>` +
    `<div class="dish__prices">${prices}</div>` +
    `<p class="dish__desc">${esc(it.desc)}</p></li>`
  );
}

function groupTitle(g) {
  if (!g.title) return '';
  return `<div class="menu-group__title"><h2>${esc(g.title)}</h2>${g.note ? `<p>${esc(g.note)}</p>` : ''}</div>`;
}

function renderGroup(g, withPhotos = false) {
  if (g.type === 'dishes') {
    return `<div class="menu-group">${groupTitle(g)}<ul class="dishes">${g.items.map((it) => renderDish(it, withPhotos)).join('')}</ul></div>`;
  }
  if (g.type === 'extras') {
    return (
      `<div class="menu-group">${groupTitle(g)}<ul class="extras">` +
      g.items.map((i) => `<li><span>${esc(i.name)}</span><span class="price">${esc(i.price)}</span></li>`).join('') +
      `</ul></div>`
    );
  }
  return '';
}

function renderDrinkGroup(g) {
  const labelled = g.columns.some(Boolean);
  const head = `<thead${labelled ? '' : ' class="visually-hidden"'}><tr><th scope="col"><span class="visually-hidden">Item</span></th>` +
    g.columns.map((c) => `<th scope="col">${esc(c || 'Price')}</th>`).join('') + `</tr></thead>`;
  const rows = g.rows.map((r) =>
    `<tr><th scope="row">${esc(r.name)}</th>` +
    r.prices.map((p) => (p ? `<td>${esc(p)}</td>` : `<td class="na" aria-label="not available">–</td>`)).join('') + `</tr>`).join('');
  return `<div class="drink-group"><div class="menu-group__title"><h2>${esc(g.title)}</h2></div><table class="drink-table">${head}<tbody>${rows}</tbody></table></div>`;
}

/* ───────── Category pages & image cards ───────── */
const pageFile = (s) => `menu-${s.id}.html`;
const CARD_SIZES = '(min-width: 960px) 360px, 50vw';

/** Image card: photo, dark overlay, centred title + teaser. Used on the home page, the menu hub and every category page. */
function card(s, { sizes = CARD_SIZES, eager = false, priority = false } = {}) {
  return (
    `<a class="cat-card" href="${pageFile(s)}">${picture(s.card.image, { sizes, eager, priority })}` +
    `<span class="cat-card__body"><span class="cat-card__title">${esc(s.tab)}</span><span class="cat-card__sub">${esc(s.card.sub)}</span></span></a>`
  );
}

function renderCards(ids, { eager = 0 } = {}) {
  const list = ids ? ids.map((id) => menu.sections.find((s) => s.id === id)) : menu.sections;
  return `<div class="cards">${list.map((s, i) => card(s, { eager: i < eager, priority: i === 0 && eager > 0 })).join('')}</div>`;
}

/** Sticky category switcher shown on every category page. */
function renderSwitcher(current) {
  let out = `<li><a class="menu-nav__all" href="menu.html">All categories</a></li><li class="menu-nav__divider" aria-hidden="true"></li>`;
  menu.sections.forEach((s, i) => {
    if (i > 0 && s.group !== menu.sections[i - 1].group) out += `<li class="menu-nav__divider" aria-hidden="true"></li>`;
    out += `<li><a href="${pageFile(s)}"${s.id === current ? ' aria-current="page"' : ''}>${esc(s.tab)}</a></li>`;
  });
  return `<nav class="menu-nav" aria-label="Menu categories"><div class="menu-nav__scroller"><ul>${out}</ul></div></nav>`;
}

function renderMenuPage(id) {
  const n = menu.sections.length;
  const i = menu.sections.findIndex((s) => s.id === id);
  const s = menu.sections[i];
  const prev = menu.sections[(i + n - 1) % n];
  const next = menu.sections[(i + 1) % n];

  const photos = s.photos?.length
    ? `<div class="menu-section__photos">${s.photos.map((p) => picture(p, { sizes: '(min-width: 800px) 190px, 45vw' })).join('')}</div>` : '';
  const head =
    `<section class="page-head page-head--cat"><div class="container">` +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="menu.html">Our Menu</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.tab)}</span></nav>` +
    `<div class="page-head__grid${photos ? ' has-photos' : ''}"><div><span class="eyebrow">${esc(s.eyebrow)}</span><h1>${esc(s.title)}</h1>` +
    `${s.note ? `<p class="lead">${esc(s.note)}</p>` : ''}</div>${photos}</div></div></section>`;

  const dishGroups = s.groups.filter((g) => g.type !== 'drinks').map((g) => renderGroup(g, PHOTO_SECTIONS.has(s.id))).join('');
  const drinkGroups = s.groups.filter((g) => g.type === 'drinks');
  const drinks = drinkGroups.length ? `<div class="drink-groups">${drinkGroups.map(renderDrinkGroup).join('')}</div>` : '';
  const body = `<section class="menu-section" aria-label="${esc(s.title)}"><div class="container">${dishGroups}${drinks}</div></section>`;

  const others = menu.sections.filter((x) => x.id !== id);
  const more =
    `<section class="more" aria-labelledby="more-h"><div class="container">` +
    `<div class="more__head"><h2 id="more-h">More from our menu</h2><a class="link-arrow" href="menu.html">All categories</a></div>` +
    `<div class="pn"><a class="pn__link" href="${pageFile(prev)}" rel="prev"><span class="pn__dir">Previous</span><span class="pn__name">${esc(prev.tab)}</span></a>` +
    `<a class="pn__link pn__link--next" href="${pageFile(next)}" rel="next"><span class="pn__dir">Next</span><span class="pn__name">${esc(next.tab)}</span></a></div>` +
    `<div class="cards cards--small">${others.map((o) => card(o, { sizes: '(min-width: 960px) 270px, 50vw' })).join('')}</div></div></section>`;

  return head + renderSwitcher(id) + body + more;
}

function menuJsonLd(list = menu.sections) {
  const sections = list
    .map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      hasMenuItem: s.groups
        .filter((g) => g.type === 'dishes')
        .flatMap((g) => g.items)
        .map((it) => ({
          '@type': 'MenuItem',
          name: it.name,
          description: it.desc,
          offers: (it.prices ?? [{ price: it.price }]).map((p) => ({ '@type': 'Offer', price: priceNum(p.price), priceCurrency: 'NAD' })),
        })),
    }))
    .filter((s) => s.hasMenuItem.length);
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Roadhouse Deli & Grill Menu',
    url: 'https://roadhousedeli.com/menu.html',
    inLanguage: 'en',
    hasMenuSection: sections,
  })}</script>`;
}

/**
 * Marks every translatable string so the language switcher can find it:
 *  - data-t   : element whose whole content is text (the text itself is the dictionary key)
 *  - data-ta  : attributes that hold text (aria-label, placeholder, alt, title)
 * Anything missing from the dictionary (brand names, customer reviews, admin-entered content) stays as written.
 */
const TEXT_TAGS = 'blockquote|h1|h2|h3|h4|p|span|a|li|button|label|legend|dt|dd|summary|option|th|td|small|address|div|strong|em|cite';
const LANG_CODES = /^(en|af|pt|de|fr|it|zh|hi|ja)$/;
const TEXT_ELEMENT = new RegExp(`<(${TEXT_TAGS})(\\s[^>]*)?>([^<>]*)</\\1>`, 'g');

function annotate(html) {
  html = html.replace(TEXT_ELEMENT, (m, tag, attrs = '', text) => {
    const s = text.replace(/\s+/g, ' ').trim();
    if (!/[A-Za-zÀ-ɏ]{2,}/.test(s) || /^N\$[\d,]+$/.test(s) || /@|^https?:/.test(s)) return m;
    if (/data-t\b|data-month|translate="no"/.test(attrs)) return m;
    if (tag === 'option' && LANG_CODES.test((attrs.match(/value="([^"]*)"/) || [])[1] || '')) return m;
    return `<${tag}${attrs} data-t>${text}</${tag}>`;
  });
  return html.replace(/<(?!meta|link|script|title|source)([a-z][\w-]*)(\s[^>]*?)(\/?)>/g, (m, tag, attrs, slash) => {
    if (/data-ta=/.test(attrs)) return m;
    const found = ['aria-label', 'placeholder', 'alt', 'title'].filter((a) => {
      const val = (attrs.match(new RegExp(`\\s${a}="([^"]*)"`)) || [])[1];
      return val && /[A-Za-z]{2,}/.test(val);
    });
    return found.length ? `<${tag}${attrs} data-ta="${found.join(' ')}"${slash}>` : m;
  });
}

/** Preload the fonts every page needs above the fold (build only — hashed names come from the bundle). */
function fontPreload() {
  return {
    name: 'roadhouse-font-preload',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle || ctx.filename.endsWith('admin.html')) return; // admin has its own inline styles and no web fonts
      return Object.keys(ctx.bundle)
        .filter((f) => /(barlow-latin-400-normal|fraunces-latin-600-normal)-.*\.woff2$/.test(f))
        .map((f) => ({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `./${f}`, crossorigin: '' }, injectTo: 'head-prepend' }));
    },
  };
}

function roadhouse() {
  return {
    name: 'roadhouse-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        html = html
          .replace(/<!--\s*@include\s+(\w+)([^>]*?)-->/g, (_, name, a) => {
            const o = attrs(a);
            return readFileSync(`./src/partials/${name}.html`, 'utf8')
              .replace(/\{\{cur_(\w+)\}\}/g, (__, k) => (k === o.current ? ' aria-current="page"' : ''));
          })
          .replace(/<rh-img\s+([^>]*?)\/?>/g, (_, a) => {
            const o = attrs(a);
            return picture(o.name, { alt: o.alt ?? '', sizes: o.sizes, cls: o.class ?? '', eager: !!o.eager, priority: !!o.priority });
          })
          .replace(/<rh-preload\s+([^>]*?)\/?>/g, (_, a) => {
            const o = attrs(a);
            const img = images[o.name];
            const set = img.widths.map((w) => `img/${o.name}-${w}.avif ${w}w`).join(', ');
            return `<link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${o.sizes}" fetchpriority="high">`;
          })
          .replace(/<!--\s*@menu-cards([^>]*?)-->/g, (_, a) => {
            const o = attrs(a);
            return renderCards(o.ids ? o.ids.split(',') : null, { eager: Number(o.eager || 0) });
          })
          .replace(/<!--\s*@menu-page\s+(\w+)\s*-->/g, (_, id) => renderMenuPage(id))
          .replace(/<!--\s*@menu-jsonld([^>]*?)-->/g, (_, a) => {
            const o = attrs(a);
            return menuJsonLd(o.id ? menu.sections.filter((s) => s.id === o.id) : menu.sections);
          });
        html = annotate(html);

        return html;
      },
    },
  };
}

export default defineConfig({
  root: 'pages',
  publicDir: '../public',
  base: './',
  plugins: [roadhouse(), fontPreload()],
  build: {
    outDir: '..', // the finished site is written to the project root, which is what gets deployed
    emptyOutDir: false,
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: 'pages/index.html', menu: 'pages/menu.html', booking: 'pages/booking.html', admin: 'pages/admin.html',
        // one page per menu category (written by scripts/make-menu-pages.mjs)
        ...Object.fromEntries(menu.sections.map((s) => [`menu-${s.id}`, `pages/menu-${s.id}.html`])),
      },
    },
  },
});
