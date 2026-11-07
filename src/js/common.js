// Loaded on every page: styles, mobile navigation and language switching.
import '../css/main.css';

const toggle = document.querySelector('.menu-toggle');
const panel = document.getElementById('mobile-nav');

function setNav(open) {
  if (!toggle || !panel) return;
  toggle.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
}
toggle?.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
panel?.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { setNav(false); toggle.focus(); }
});

/* ───────────────────────── Language ─────────────────────────
   English is the page markup itself. The build tags every translatable string (data-t / data-ta) and the
   text itself is the dictionary key, so a language pack is just { "English text": "translation" }.
   Anything missing from a pack (brand names, customer reviews, admin-entered content) stays as written. */
const selects = document.querySelectorAll('[data-lang-select]');
const listeners = new Set();
const baseTitle = document.title;
let dict = {};
let lang = 'en';
let packs = null;

const clean = (s) => s.replace(/\s+/g, ' ').trim();

/** Translate a string from JavaScript (toasts, validation messages, rendered content). */
export const t = (s) => dict[s] ?? s;
export const getLang = () => lang;
/** Run `fn` whenever the language changes (use it to re-render dynamic content). */
export const onLang = (fn) => listeners.add(fn);

/** Translate everything tagged inside `root` (call after rendering new markup). */
export function translate(root = document) {
  root.querySelectorAll('[data-t]').forEach((el) => {
    el._en ??= clean(el.textContent);
    el.textContent = dict[el._en] ?? el._en;
  });
  root.querySelectorAll('[data-ta]').forEach((el) => {
    el._ta ??= {};
    el.dataset.ta.split(' ').forEach((a) => {
      el._ta[a] ??= el.getAttribute(a);
      el.setAttribute(a, dict[el._ta[a]] ?? el._ta[a]);
    });
  });
  root.querySelectorAll('[data-month]').forEach((el) => {
    const [y, m] = el.dataset.month.split('-').map(Number);
    el.textContent = new Date(y, m - 1, 1).toLocaleDateString(lang, { month: 'long', year: 'numeric' });
  });
}

/** Full weekday / short weekday name in the current language (0 = Sunday). */
export const weekday = (d, style = 'long') => new Date(2024, 0, 7 + d).toLocaleDateString(lang, { weekday: style });

async function applyLang(code) {
  if (code !== 'en' && !packs) packs = (await import('../i18n/index.js')).default;
  lang = code;
  dict = code === 'en' ? {} : packs[code] || {};
  document.documentElement.lang = code;
  document.title = dict[baseTitle] ?? baseTitle.split(' | ').map((part) => dict[part] ?? part).join(' | ');
  translate();
  selects.forEach((s) => { s.value = code; });
  listeners.forEach((fn) => fn(code));
}

let saved = 'en';
try { saved = localStorage.getItem('rh_lang') || 'en'; } catch { /* storage blocked */ }
selects.forEach((s) => s.addEventListener('change', () => {
  try { localStorage.setItem('rh_lang', s.value); } catch { /* ignore */ }
  applyLang(s.value);
}));
/** Resolves once the saved language (if not English) has been applied. */
export const langReady = saved !== 'en' ? applyLang(saved) : Promise.resolve();

export function showToast(msg) {
  const el = Object.assign(document.createElement('div'), { className: 'toast', textContent: t(msg) });
  el.setAttribute('role', 'status');
  document.body.append(el);
  setTimeout(() => el.remove(), 4000);
}

export const esc = (str) => String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
