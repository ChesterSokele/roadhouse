import { showToast, esc, onLang, translate, t, getLang, weekday } from './common.js';
import { onMeals } from './meals.js';

/* ── Meal of the Day: today's feature + the weekly board (Mon → Sun) ── */
const today = new Date().getDay();
const feature = document.getElementById('meal-feature');
const week = document.getElementById('meal-week');
let current = null;

function renderMeals() {
  if (!feature || !week || !current) return;
  const m = current[today];
  const txt = (s) => `<span data-t>${esc(s)}</span>`;
  feature.innerHTML =
    `<div class="meal-feature__img"><img src="${esc(m.img)}" alt="${esc(m.name)}" loading="lazy" decoding="async"></div>` +
    `<div class="meal-feature__body"><span class="eyebrow">${txt("Today's Feature")} · ${esc(weekday(today))}</span>` +
    `<h3 data-t>${esc(m.name)}</h3><p data-t>${esc(m.desc)}</p><p class="meal-feature__price">${esc(m.price)}</p></div>`;
  week.innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) =>
    `<li${d === today ? ' aria-current="date"' : ''}><span class="week__day">${esc(weekday(d, 'short'))}</span>` +
    `<span class="week__name" data-t>${esc(current[d].name)}</span><span class="week__price">${esc(current[d].price)}</span></li>`).join('');
  translate(feature);
  translate(week);
  week.setAttribute('aria-label', t("This week's meals"));
}
onMeals((meals) => { current = meals; renderMeals(); });
onLang(renderMeals);

/* ── Reviews carousel (no autoplay: swipe, scroll or use the buttons) ── */
const track = document.querySelector('.reviews-track');
document.querySelectorAll('[data-carousel]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = track.querySelector('.review');
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24) : track.clientWidth;
    track.scrollBy({ left: Number(btn.dataset.carousel) * step, behavior: 'smooth' });
  });
});

/* ── Review form → Firebase (shown after approval in admin.html) ── */
const form = document.getElementById('review-form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.elements['reviewer-name'].value.trim().slice(0, 60);
  const text = form.elements['review-text'].value.trim().slice(0, 1000);
  const rating = parseInt(form.elements.rating.value) || 5;
  if (!name || !text) { showToast('Please enter your name and review'); return; }
  const btn = form.querySelector('[type="submit"]');
  btn.disabled = true;
  try {
    const { submitReview } = await import('./submit-review.js');
    await submitReview({ name, text, rating });
    form.reset();
    showToast('Thank you! Your review will appear once approved.');
  } catch {
    showToast('Sorry, your review could not be sent. Please try again.');
  } finally {
    btn.disabled = false;
  }
});

/* ── Live content from admin.html, after the page has rendered ── */
const later = window.requestIdleCallback || ((fn) => setTimeout(fn, 400));
window.addEventListener('load', () => later(async () => (await import('./live-data.js')).loadLive()));
