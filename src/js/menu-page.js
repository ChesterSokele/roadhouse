import { onLang, t, weekday } from './common.js';
import { onMeals } from './meals.js';

/* ── Menu hub: today's special banner ── */
const today = new Date().getDay();
const banner = document.getElementById('today-meal');
let current = null;

function renderBanner() {
  if (!banner || !current) return;
  const m = current[today];
  banner.querySelector('.today__name').textContent = t(m.name);
  banner.querySelector('.today__price').textContent = m.price;
  banner.querySelector('.today__day').textContent = weekday(today);
  banner.removeAttribute('data-pending');
}
if (banner) {
  onMeals((meals) => { current = meals; renderBanner(); });
  onLang(renderBanner);
}

/* ── Category pages: keep the current category visible in the sticky switcher ── */
const scroller = document.querySelector('.menu-nav ul');
const active = scroller?.querySelector('[aria-current="page"]');
const center = () => { scroller.scrollLeft = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2; };
if (active) {
  center();
  document.fonts?.ready.then(center); // text widths change once the web fonts arrive
}
