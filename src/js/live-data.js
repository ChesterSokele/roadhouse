// Live content saved in admin.html (meals, events, specials, notices, approved reviews), read over
// Firestore's REST API. If it can't be reached the built-in content in the HTML stays on the page,
// so the site never looks empty. Loaded lazily after first paint.
// Text typed into admin.html is shown exactly as written (it has no translations); the labels around it are translated.
import { listDocs, listApprovedReviews } from './firestore.js';
import { esc, translate, getLang, onLang } from './common.js';
import { setMeals } from './meals.js';
import { setLiveReviews } from './reviews.js';

// Only allow https image links from the database
const safeURL = (url) => (/^https:\/\//i.test(url || '') ? url : '');
const tx = (s) => `<span data-t>${esc(s)}</span>`;

async function loadMeals() {
  const live = {};
  (await listDocs('mealOfDay')).forEach(({ id, data: m }) => {
    if (m.name) live[id] = { ...m, imageURL: safeURL(m.imageURL) };
  });
  if (Object.keys(live).length) setMeals(live);
}

async function loadEvents() {
  const list = document.querySelector('.events-list');
  if (!list) return;
  const docs = await listDocs('events');
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time
  const events = [];
  docs.forEach(({ data: ev }) => {
    // hide events switched off in admin, and dated events that are already over
    if (ev.active === false || !ev.title) return;
    if (ev.date && ev.date < today) return;
    events.push(ev);
  });
  if (!events.length) {
    list.innerHTML = `
      <li class="event">
        <div class="event__date"><span class="event__day">★</span></div>
        <div><h3 data-t>New events coming soon</h3>
          <p data-t>Follow us for live music nights, braai specials and more.</p>
          <p><a href="https://www.instagram.com/roadhouse_deli/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/RoadhouseDeliAndGrill/" target="_blank" rel="noopener">Facebook</a></p></div>
      </li>`;
    translate(list);
    return;
  }
  events.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const render = () => {
    list.innerHTML = events.map((ev) => {
      let day = '★', month = '';
      if (ev.date) {
        const dt = new Date(ev.date + 'T00:00:00');
        day = dt.getDate();
        month = dt.toLocaleDateString(getLang(), { month: 'short' });
      }
      const time = ev.time ? ` ${esc(ev.time)}` : '';
      return `
      <li class="event">
        <div class="event__date"><span class="event__day">${esc(day)}</span><span class="event__month">${esc(month)}</span></div>
        <div><h3>${esc(ev.title)}</h3><p>${esc(ev.description)}${time ? ` ${tx('From')}${time}.` : ''}</p>${ev.tag ? `<span class="tag">${esc(ev.tag)}</span>` : ''}</div>
      </li>`;
    }).join('');
    translate(list);
  };
  render();
  onLang(render);
}

async function loadSpecials() {
  const list = document.querySelector('.specials-list');
  if (!list) return;
  const specials = [];
  (await listDocs('specials')).forEach(({ data: sp }) => {
    if (sp.active !== false && sp.name) specials.push(sp);
  });
  if (!specials.length) return; // keep the built-in specials
  specials.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
  list.innerHTML = specials.map((sp) => `
    <li class="special">
      <span class="special__name"><span data-t>${esc(sp.name)}</span>${sp.badge ? `<span class="special__badge" data-t>${esc(sp.badge)}</span>` : ''}</span>
      <span class="special__price">${esc(sp.price)}</span>
    </li>`).join('');
  translate(list);
}

async function loadNotices() {
  const bar = document.getElementById('site-notice');
  if (!bar) return;
  const notices = [];
  (await listDocs('notices')).forEach(({ data: nt }) => {
    if (nt.active !== false && nt.text) notices.push(nt);
  });
  if (!notices.length) return;
  notices.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  bar.textContent = notices.map((n) => n.text).join('  •  ');
  bar.hidden = false;
}

async function loadReviews() {
  if (!document.querySelector('.reviews-track')) return;
  const reviews = (await listApprovedReviews()).map((d) => d.data);
  if (!reviews.length) return;
  // pinned first, then newest
  reviews.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  setLiveReviews(reviews.map((r) => {
    const d = r.createdAt?.toDate?.();
    return {
      name: r.name,
      text: r.text,
      rating: r.rating,
      month: d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` : '',
    };
  }));
}

// Each section loads on its own — one failing doesn't stop the others
export function loadLive() {
  [loadMeals, loadEvents, loadSpecials, loadNotices, loadReviews].forEach((fn) =>
    fn().catch((err) => console.warn('[Roadhouse] Could not load live content:', fn.name, err.message)));
}
