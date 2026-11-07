import { t } from './common.js';

// Reservations go to the restaurant's WhatsApp (international format, no "+" or spaces).
const WHATSAPP_NUMBER = '264813287476';

const form = document.getElementById('bookingForm');
const dialog = document.getElementById('successOverlay');
const el = (id) => document.getElementById(id);

// Earliest bookable date = today (local time, not UTC)
el('resDate').min = new Date().toLocaleDateString('en-CA');

const rules = [
  ['guestName', 'name', (v) => !!v, 'Please enter your name.'],
  ['guestPhone', 'phone', (v) => v.replace(/\D/g, '').length >= 7, 'Please enter a phone number we can reach you on.'],
  ['resDate', 'date', (v) => !!v, 'Please pick a date.'],
  ['resTime', 'time', (v) => !!v, 'Please choose a time.'],
  ['guests', 'guests', (v) => !!v, 'Please select the number of guests.'],
];

const formatDate = (d) => d.split('-').reverse().join('/');
function formatTime(value) {
  const [h, m] = value.split(':');
  const hour = parseInt(h, 10);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstBad = null;
  for (const [id, key, ok, msg] of rules) {
    const input = el(id);
    const good = ok(input.value.trim());
    input.setAttribute('aria-invalid', String(!good));
    el('err-' + key).textContent = good ? '' : t(msg);
    if (!good && !firstBad) firstBad = input;
  }
  if (firstBad) { firstBad.focus(); return; }

  const v = (id) => el(id).value.trim();
  let msg = '🍽️ *Table Reservation — Roadhouse Deli & Grill*\n\n';
  msg += `👤 *Name:* ${v('guestName')}\n📞 *Phone:* ${v('guestPhone')}\n`;
  msg += `📅 *Date:* ${formatDate(v('resDate'))}\n🕐 *Time:* ${formatTime(v('resTime'))}\n👥 *Guests:* ${v('guests')}\n`;
  if (v('occasion')) msg += `🎉 *Occasion:* ${v('occasion')}\n`;
  if (v('requests')) msg += `📝 *Special Requests:* ${v('requests')}\n`;
  msg += '\nPlease confirm my reservation. Thank you!';

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  dialog.classList.add('show');
  dialog.querySelector('button').focus();
  form.reset();
});

form.addEventListener('input', (e) => {
  if (e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false');
});

const closeDialog = () => dialog.classList.remove('show');
dialog.querySelector('button').addEventListener('click', closeDialog);
dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDialog(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDialog(); });
