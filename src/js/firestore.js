// Tiny read-only Firestore client over the REST API (same project and security rules as the SDK,
// without shipping ~130 KB of SDK JavaScript to every visitor). Writes still use the SDK — see submit-review.js.
const PROJECT = 'carry-together';
const KEY = 'AIzaSyDq1jqOsmoHWOovP2zwnc8kcASQEA9iDF4'; // Firebase web API key (public by design)
const ROOT = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

function value(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('timestampValue' in v) {
    const d = new Date(v.timestampValue);
    return { seconds: d.getTime() / 1000, toDate: () => d };
  }
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(value);
  if ('mapValue' in v) return fields(v.mapValue.fields || {});
  return undefined;
}
const fields = (f) => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, value(v)]));
const toDoc = (d) => ({ id: d.name.split('/').pop(), data: fields(d.fields || {}) });

async function request(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Firestore ${res.status}`);
  return res.json();
}

/** All documents in a collection → [{ id, data }] */
export async function listDocs(collection) {
  const out = [];
  let token = '';
  do {
    const json = await request(`${ROOT}/${collection}?pageSize=300&key=${KEY}${token ? `&pageToken=${token}` : ''}`);
    (json.documents || []).forEach((d) => out.push(toDoc(d)));
    token = json.nextPageToken || '';
  } while (token);
  return out;
}

/** Approved reviews only (the query shape the security rules expect). */
export async function listApprovedReviews() {
  const json = await request(`${ROOT}:runQuery?key=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'reviews' }],
        where: { fieldFilter: { field: { fieldPath: 'approved' }, op: 'EQUAL', value: { booleanValue: true } } },
      },
    }),
  });
  return json.filter((r) => r.document).map((r) => toDoc(r.document));
}
