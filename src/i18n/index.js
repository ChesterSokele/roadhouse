// Builds one { "English text": "translation" } pack per language from the rows in strings*.js.
// Row layout: [english, af, pt, de, fr, it, zh, hi, ja]. Loaded only when a visitor picks a non-English language.
import legacy from './strings-legacy.js';
import core from './strings-ui.js';
import menu from './strings-menu.js';

const LANGS = ['af', 'pt', 'de', 'fr', 'it', 'zh', 'hi', 'ja'];
const packs = Object.fromEntries(LANGS.map((l) => [l, {}]));
for (const row of [...legacy, ...core, ...menu]) {
  LANGS.forEach((l, i) => { if (row[i + 1]) packs[l][row[0]] = row[i + 1]; });
}
export default packs;
