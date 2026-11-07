// Review cards for approved live reviews (customer text is shown exactly as written).
import { esc, translate, t } from './common.js';

const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

export function buildReviewCard(r) {
  const rating = Math.max(1, Math.min(5, parseInt(r.rating) || 5));
  const card = document.createElement('article');
  card.className = 'review';
  card.dataset.live = '';
  card.innerHTML =
    `<blockquote>“${esc(r.text)}”</blockquote>` +
    `<footer><cite>${esc(r.name || 'Guest')}</cite>` +
    `<span class="stars" role="img" aria-label="${esc(`${rating} out of 5 stars`)}">${stars(rating)}</span>` +
    `<span class="review__date"${r.month ? ` data-month="${esc(r.month)}"` : ''}></span></footer>`;
  return card;
}

/** Put approved live reviews ahead of the built-in ones (pinned first, already sorted by the caller). */
export function setLiveReviews(list) {
  const track = document.querySelector('.reviews-track');
  if (!track) return;
  track.querySelectorAll('[data-live]').forEach((c) => c.remove());
  const cards = list.map(buildReviewCard);
  track.prepend(...cards);
  cards.forEach((c) => {
    const label = c.querySelector('.stars');
    label.setAttribute('aria-label', t(label.getAttribute('aria-label')));
    translate(c);
  });
  track.scrollTo({ left: 0 });
}
