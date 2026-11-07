// "Meal of the Day" schedule, shared by the home page and the menu page.
// Index = JS weekday (0 = Sunday). Anything saved in admin.html (Firebase) replaces these defaults.

export const meals = {
  0: { name: 'Family Feast', desc: 'A whole flame-grilled chicken with golden fries and warm Portuguese bread. Made for sharing, built for feasting.', price: 'N$195', img: 'img/platters-934.webp' },
  1: { name: 'Chicken Schnitzel', desc: 'Crispy, golden-fried chicken schnitzel served with creamy mash potato and rich homemade gravy.', price: 'N$85', img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=900&auto=format&fit=crop&q=80' },
  2: { name: 'Roadhouse Pasta', desc: "Perfectly cooked pasta with ham in our chef's special cream sauce, topped with fresh herbs and parmesan.", price: 'N$85', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop&q=80' },
  3: { name: 'Cottage Pie', desc: 'Classic cottage pie with a savoury mince filling topped with golden mashed potato, served with green beans.', price: 'N$100', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80' },
  4: { name: 'Beef Stew', desc: 'Slow-cooked tender beef in a rich, hearty gravy served with rice or mash. Pure comfort on a plate.', price: 'N$100', img: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=900&auto=format&fit=crop&q=80' },
  5: { name: 'Braai Plate', desc: 'The Roadhouse Friday classic: chop, salad, wing and wors. The weekend starts here.', price: 'N$150', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&auto=format&fit=crop&q=80' },
  6: { name: 'Grand Feast Delight', desc: 'Short ribs, meatballs, crispy chips, flavourful wings, zesty Russian and a refreshing salad medley. Serves 4–6.', price: 'N$500', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80' },
};

const listeners = new Set();

/** Run `fn(meals)` now and again whenever live data replaces the defaults. */
export function onMeals(fn) { listeners.add(fn); fn(meals); }

export function setMeals(live) {
  for (const [k, m] of Object.entries(live)) {
    const base = meals[k] || {};
    meals[k] = { name: m.name || base.name, desc: m.desc || m.description || base.desc || '', price: m.price || base.price || '', img: m.imageURL || base.img };
  }
  listeners.forEach((fn) => fn(meals));
}
