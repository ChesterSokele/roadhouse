// ================================================================
//  ROADHOUSE DELI & GRILL — Live content from Firebase
//  Shows what is saved in admin.html (meals, events, specials,
//  notices, approved reviews) on the public site, and sends new
//  reviews to Firebase for approval.
//  If Firebase can't be reached, the built-in content in the HTML
//  and script.js stays on the page, so the site never looks empty.
// ================================================================

import { db } from "./firebase-config.js";
import { collection, getDocs, addDoc, query, where, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const RH = window.RH = window.RH || {};

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Only allow http(s) image links from the database
function safeURL(url) {
  return /^https:\/\//i.test(url || "") ? url : "";
}

// ── Reviews: send new ones to Firebase (pending until approved) ──
RH.submitReview = function ({ name, text, rating }) {
  return addDoc(collection(db, "reviews"), {
    name: String(name).slice(0, 60),
    text: String(text).slice(0, 1000),
    rating: Math.max(1, Math.min(5, parseInt(rating) || 5)),
    approved: false,
    pinned: false,
    createdAt: serverTimestamp(),
  });
};

async function loadMeals() {
  const snap = await getDocs(collection(db, "mealOfDay"));
  const live = {};
  snap.forEach(d => {
    const m = d.data();
    if (m.name) live[d.id] = { ...m, imageURL: safeURL(m.imageURL) };
  });
  if (Object.keys(live).length && RH.setMeals) RH.setMeals(live);
}

async function loadEvents() {
  const list = document.querySelector(".events-list");
  if (!list) return;
  const snap = await getDocs(collection(db, "events"));
  const today = new Date().toISOString().slice(0, 10);
  const events = [];
  snap.forEach(d => {
    const ev = d.data();
    // hide events switched off in admin, and dated events that are already over
    if (ev.active === false || !ev.title) return;
    if (ev.date && ev.date < today) return;
    events.push(ev);
  });
  if (!events.length) {
    // Nothing upcoming — don't leave old dates on the page
    list.innerHTML = `
      <div class="event-card reveal visible">
        <div class="event-date"><span class="day">★</span><span class="month"></span></div>
        <div class="event-info">
          <h4>New events coming soon</h4>
          <p>Follow us on <a href="https://www.instagram.com/roadhouse_deli/" target="_blank" rel="noopener">Instagram</a>
             and <a href="https://www.facebook.com/RoadhouseDeliAndGrill/" target="_blank" rel="noopener">Facebook</a>
             for live music nights, braai specials and more.</p>
        </div>
      </div>`;
    return;
  }
  events.sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));

  list.innerHTML = events.map(ev => {
    let day = "", month = "";
    if (ev.date) {
      const dt = new Date(ev.date + "T00:00:00");
      day = dt.getDate();
      month = dt.toLocaleDateString("en-GB", { month: "short" });
    }
    const time = ev.time ? ` From ${esc(ev.time)}.` : "";
    return `
      <div class="event-card reveal visible">
        <div class="event-date">
          <span class="day">${esc(day || "★")}</span>
          <span class="month">${esc(month)}</span>
        </div>
        <div class="event-info">
          <h4>${esc(ev.title)}</h4>
          <p>${esc(ev.description)}${time}</p>
          ${ev.tag ? `<span class="event-tag">${esc(ev.tag)}</span>` : ""}
        </div>
      </div>`;
  }).join("");
}

async function loadSpecials() {
  const panel = document.querySelector(".specials-panel");
  if (!panel) return;
  const snap = await getDocs(collection(db, "specials"));
  const specials = [];
  snap.forEach(d => {
    const sp = d.data();
    if (sp.active !== false && sp.name) specials.push(sp);
  });
  if (!specials.length) return; // keep the built-in specials
  specials.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));

  panel.querySelectorAll(".special-item").forEach(el => el.remove());
  const heading = panel.querySelector("h3");
  const html = specials.map(sp => `
    <div class="special-item">
      <span class="special-item-name">${esc(sp.name)}${sp.badge ? ` <span class="special-badge">${esc(sp.badge)}</span>` : ""}</span>
      <span class="special-item-price">${esc(sp.price)}</span>
    </div>`).join("");
  heading.insertAdjacentHTML("afterend", html);
}

async function loadNotices() {
  const bar = document.getElementById("site-notice");
  if (!bar) return;
  const snap = await getDocs(collection(db, "notices"));
  const notices = [];
  snap.forEach(d => {
    const nt = d.data();
    if (nt.active !== false && nt.text) notices.push(nt);
  });
  if (!notices.length) return;
  notices.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  bar.querySelector(".site-notice-text").textContent = notices.map(n => n.text).join("  •  ");
  bar.hidden = false;
}

async function loadReviews() {
  if (!document.querySelector(".reviews-track")) return;
  const snap = await getDocs(query(collection(db, "reviews"), where("approved", "==", true)));
  const reviews = [];
  snap.forEach(d => reviews.push(d.data()));
  if (!reviews.length) return;
  // pinned first, then newest
  reviews.sort((a, b) =>
    (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
    (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  RH.setReviews(reviews.map(r => ({
    name: r.name,
    text: r.text,
    rating: r.rating,
    date: r.createdAt?.toDate?.().toLocaleDateString("en-GB", { month: "long", year: "numeric" }) || "",
  })));
}

// Each section loads on its own — one failing doesn't stop the others
[loadMeals, loadEvents, loadSpecials, loadNotices, loadReviews].forEach(fn =>
  fn().catch(err => console.warn("[Roadhouse] Could not load live content:", fn.name, err.message)));
