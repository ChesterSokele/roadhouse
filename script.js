/* ============================================================
   ROADHOUSE DELI & GRILL — Main JavaScript
   ============================================================ */

'use strict';

const LANGS = [
  { code: 'en', label: 'English',   flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'af', label: 'Afrikaans', flag: '\u{1F1F3}\u{1F1E6}' },
  { code: 'pt', label: 'Português', flag: '\u{1F1F5}\u{1F1F9}' },
  { code: 'de', label: 'Deutsch',   flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'fr', label: 'Français', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'it', label: 'Italiano',  flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'zh', label: '中文', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'hi', label: 'हिन्दी', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'ja', label: '日本語', flag: '\u{1F1EF}\u{1F1F5}' },
];

const T = {
  en: {
    'nav.home':'Home','nav.menu':'Menu','nav.meals':'Meal of the Day',
    'nav.events':'Events','nav.reviews':'Reviews','nav.contact':'Contact',
    'hero.badge':'Windhoek, Independence Avenue',
    'hero.title1':'Roadhouse','hero.title2':'Deli & Grill',
    'hero.subtitle':'Where great food meets great company',
    'hero.cta1':'View Menu','hero.cta2':'Book a Table','hero.scroll':'Scroll',
    'about.eyebrow':'Our Story','about.title':'Born from the love of fire & flavour',
    'about.body':"Roadhouse Deli & Grill is more than a restaurant — it's a gathering place. By day we fuel the city with hearty meals. By night we light up the bar with craft cocktails and premium spirits. Warm wood, bold flavours, staff in black — because we mean business.",
    'about.stat1':'Menu Items','about.stat2':'Craft Cocktails','about.stat3':'Years Open',
    'meal.eyebrow':'Daily Special','meal.title':'Meal of the Day',
    'meal.today':"Today's Feature",'meal.special':'Special',
    'menu.eyebrow':'What We Serve','menu.title':'Our Menu','menu.cta':'View Full Menu',
    'menu.cat.grill':'Grill & Steaks','menu.cat.cocktails':'Cocktails',
    'menu.cat.drinks':'Spirits & Drinks','menu.cat.platters':'Wings & Platters',
    'events.eyebrow':"What's On",'events.title':'Events & Specials',
    'events.specials':'Happy Hour & Specials',
    'reviews.eyebrow':'What People Say','reviews.title':'Guest Reviews',
    'reviews.write':'Leave a Review','reviews.name':'Your Name',
    'reviews.email':'Email','reviews.rating':'Rating',
    'reviews.comment':'Your Review','reviews.submit':'Submit Review',
    'footer.hours':'Hours','footer.links':'Quick Links','footer.contact':'Contact',
    'footer.rights':'© 2026 Roadhouse Deli & Grill. All rights reserved.',
    'footer.days.weekday':'Sun – Thu','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'Fri – Sat','footer.hours.fri':'08:00 – 02:00',
  },
  af: {
    'nav.home':'Tuis','nav.menu':'Spyskaart','nav.meals':'Dag se Maaltyd',
    'nav.events':'Geleenthede','nav.reviews':'Resensies','nav.contact':'Kontak',
    'hero.badge':'Windhoek, Onafhanklikheidslaan',
    'hero.title1':'Roadhouse','hero.title2':'Deli & Braai',
    'hero.subtitle':'Waar goeie kos goeie geselskap ontmoet',
    'hero.cta1':'Sien Spyskaart','hero.cta2':"Bespreek 'n Tafel",'hero.scroll':'Blaai',
    'about.eyebrow':'Ons Verhaal','about.title':'Gebore uit die liefde vir vuur & geur',
    'about.body':"Roadhouse Deli & Braai is meer as 'n restaurant — 'n bymekaarkomplek. Bedags voed ons die stad met stewige maaltye. Snags verlig ons die kroeg met skemerkelkies en premium drank. Warm hout, kragtige geure, personeel in swart — want ons meen dit.",
    'about.stat1':'Spyskaart Items','about.stat2':'Skemerkelkies','about.stat3':'Jaar Oop',
    'meal.eyebrow':'Daaglikse Spesiaal','meal.title':'Maaltyd van die Dag',
    'meal.today':'Vandag se Keuse','meal.special':'Spesiaal',
    'menu.eyebrow':'Wat Ons Bedien','menu.title':'Ons Spyskaart','menu.cta':'Volledige Spyskaart',
    'menu.cat.grill':'Braai & Steaks','menu.cat.cocktails':'Skemerkelkies',
    'menu.cat.drinks':'Drank & Spirits','menu.cat.platters':'Vlerkies & Skottels',
    'events.eyebrow':'Wat Gebeur','events.title':'Geleenthede & Spesiale',
    'events.specials':'Happy Hour & Spesiale',
    'reviews.eyebrow':'Wat Mense Se','reviews.title':'Gas Resensies',
    'reviews.write':"Skryf 'n Resensie",'reviews.name':'Jou Naam',
    'reviews.email':'E-pos','reviews.rating':'Gradering',
    'reviews.comment':'Jou Resensie','reviews.submit':'Stuur Resensie',
    'footer.hours':'Openingstye','footer.links':'Vinnige Skakels','footer.contact':'Kontak',
    'footer.rights':'© 2026 Roadhouse Deli & Braai. Alle regte voorbehou.',
    'footer.days.weekday':'So – Do','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'Vr – Sa','footer.hours.fri':'08:00 – 02:00',
  },
  pt: {
    'nav.home':'Início','nav.menu':'Cardápio','nav.meals':'Prato do Dia',
    'nav.events':'Eventos','nav.reviews':'Avaliações','nav.contact':'Contato',
    'hero.badge':'Windhoek, Avenida Independência',
    'hero.title1':'Roadhouse','hero.title2':'Deli & Grill',
    'hero.subtitle':'Onde boa comida encontra boa companhia',
    'hero.cta1':'Ver Cardápio','hero.cta2':'Reservar Mesa','hero.scroll':'Rolar',
    'about.eyebrow':'Nossa História','about.title':'Nascido do amor pelo fogo e sabor',
    'about.body':'O Roadhouse Deli & Grill é mais que um restaurante — é um ponto de encontro. De dia, alimentamos a cidade com refeições fartas. À noite, animamos o bar com coquetéis artesanais. Madeira quente, sabores marcantes, equipa de preto — porque levamos a sério.',
    'about.stat1':'Itens no Cardápio','about.stat2':'Coquetéis Artesanais','about.stat3':'Anos Abertos',
    'meal.eyebrow':'Especial do Dia','meal.title':'Prato do Dia',
    'meal.today':'Destaque de Hoje','meal.special':'Especial',
    'menu.eyebrow':'O Que Servimos','menu.title':'Nosso Cardápio','menu.cta':'Ver Cardápio Completo',
    'menu.cat.grill':'Grelhados & Steaks','menu.cat.cocktails':'Coquetéis',
    'menu.cat.drinks':'Bebidas & Destilados','menu.cat.platters':'Asas & Pratos para Partilhar',
    'events.eyebrow':'O Que Há','events.title':'Eventos & Especiais',
    'events.specials':'Happy Hour & Promoções',
    'reviews.eyebrow':'O Que Dizem','reviews.title':'Avaliações dos Clientes',
    'reviews.write':'Deixe uma Avaliação','reviews.name':'Seu Nome',
    'reviews.email':'E-mail','reviews.rating':'Classificação',
    'reviews.comment':'Sua Avaliação','reviews.submit':'Enviar Avaliação',
    'footer.hours':'Horários','footer.links':'Links Rápidos','footer.contact':'Contato',
    'footer.rights':'© 2026 Roadhouse Deli & Grill. Todos os direitos reservados.',
    'footer.days.weekday':'Dom – Qui','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'Sex – Sáb','footer.hours.fri':'08:00 – 02:00',
  },
  de: {
    'nav.home':'Startseite','nav.menu':'Speisekarte','nav.meals':'Tagesgericht',
    'nav.events':'Veranstaltungen','nav.reviews':'Bewertungen','nav.contact':'Kontakt',
    'hero.badge':'Windhoek, Unabhängigkeitsallee',
    'hero.title1':'Roadhouse','hero.title2':'Deli & Grill',
    'hero.subtitle':'Wo gutes Essen gute Gesellschaft trifft',
    'hero.cta1':'Speisekarte ansehen','hero.cta2':'Tisch reservieren','hero.scroll':'Scrollen',
    'about.eyebrow':'Unsere Geschichte','about.title':'Geboren aus der Liebe zu Feuer & Geschmack',
    'about.body':'Das Roadhouse Deli & Grill ist mehr als ein Restaurant — es ist ein Treffpunkt. Tagtäglich versorgen wir die Stadt mit herzhaften Mahlzeiten. Abends bringen wir die Bar zum Leuchten mit Cocktails und Spirituosen. Warmes Holz, kräftige Aromen, Team in Schwarz — weil wir es ernst meinen.',
    'about.stat1':'Menü-Artikel','about.stat2':'Handgemachte Cocktails','about.stat3':'Jahre geöffnet',
    'meal.eyebrow':'Tagesspecial','meal.title':'Tagesgericht',
    'meal.today':'Heutiger Highlight','meal.special':'Special',
    'menu.eyebrow':'Was wir servieren','menu.title':'Unsere Speisekarte','menu.cta':'Vollständige Speisekarte',
    'menu.cat.grill':'Grill & Steaks','menu.cat.cocktails':'Cocktails',
    'menu.cat.drinks':'Spirituosen & Getränke','menu.cat.platters':'Wings & Platten',
    'events.eyebrow':'Was läuft','events.title':'Veranstaltungen & Specials',
    'events.specials':'Happy Hour & Angebote',
    'reviews.eyebrow':'Was Gäste sagen','reviews.title':'Gästebewertungen',
    'reviews.write':'Bewertung schreiben','reviews.name':'Ihr Name',
    'reviews.email':'E-Mail','reviews.rating':'Bewertung',
    'reviews.comment':'Ihre Bewertung','reviews.submit':'Bewertung senden',
    'footer.hours':'Öffnungszeiten','footer.links':'Schnelllinks','footer.contact':'Kontakt',
    'footer.rights':'© 2026 Roadhouse Deli & Grill. Alle Rechte vorbehalten.',
    'footer.days.weekday':'So – Do','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'Fr – Sa','footer.hours.fri':'08:00 – 02:00',
  },
  fr: {
    'nav.home':'Accueil','nav.menu':'Menu','nav.meals':'Plat du Jour',
    'nav.events':'Événements','nav.reviews':'Avis','nav.contact':'Contact',
    'hero.badge':'Windhoek, Avenue Indépendance',
    'hero.title1':'Roadhouse','hero.title2':'Deli & Grill',
    'hero.subtitle':'Là où la bonne cuisine rencontre la bonne compagnie',
    'hero.cta1':'Voir le Menu','hero.cta2':'Réserver une Table','hero.scroll':'Défiler',
    'about.eyebrow':'Notre Histoire','about.title':'Né de la passion du feu et des saveurs',
    'about.body':"Le Roadhouse Deli & Grill est bien plus qu'un restaurant — c'est un lieu de rassemblement. Le jour, nous nourrissons la ville. La nuit, nous animons le bar avec des cocktails artisanaux. Bois chaleureux, saveurs intenses, équipe en noir — car nous sommes sérieux.",
    'about.stat1':'Articles au Menu','about.stat2':'Cocktails Artisanaux','about.stat3':'Années ouvert',
    'meal.eyebrow':'Spécial du Jour','meal.title':'Plat du Jour',
    'meal.today':"Vedette d'Aujourd'hui",'meal.special':'Spécial',
    'menu.eyebrow':'Ce que nous servons','menu.title':'Notre Menu','menu.cta':'Voir le Menu Complet',
    'menu.cat.grill':'Grillades & Steaks','menu.cat.cocktails':'Cocktails',
    'menu.cat.drinks':'Spiritueux & Boissons','menu.cat.platters':'Ailes & Plateaux',
    'events.eyebrow':'Ce qui se passe','events.title':'Événements & Spéciaux',
    'events.specials':'Happy Hour & Promos',
    'reviews.eyebrow':'Ce que disent les gens','reviews.title':'Avis des Clients',
    'reviews.write':'Laisser un Avis','reviews.name':'Votre Nom',
    'reviews.email':'E-mail','reviews.rating':'Note',
    'reviews.comment':'Votre Avis','reviews.submit':"Envoyer l'Avis",
    'footer.hours':'Horaires','footer.links':'Liens Rapides','footer.contact':'Contact',
    'footer.rights':'© 2026 Roadhouse Deli & Grill. Tous droits réservés.',
    'footer.days.weekday':'Dim – Jeu','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'Ven – Sam','footer.hours.fri':'08:00 – 02:00',
  },
  it: {
    'nav.home':'Home','nav.menu':'Menu','nav.meals':'Piatto del Giorno',
    'nav.events':'Eventi','nav.reviews':'Recensioni','nav.contact':'Contatti',
    'hero.badge':'Windhoek, Viale Indipendenza',
    'hero.title1':'Roadhouse','hero.title2':'Deli & Grill',
    'hero.subtitle':'Dove il buon cibo incontra la buona compagnia',
    'hero.cta1':'Vedi il Menu','hero.cta2':'Prenota un Tavolo','hero.scroll':'Scorri',
    'about.eyebrow':'La Nostra Storia','about.title':"Nato dall'amore per il fuoco e il sapore",
    'about.body':'Il Roadhouse Deli & Grill è più di un ristorante — è un luogo di ritrovo. Di giorno nutriamo la città con pasti sostanziosi. Di notte animiamo il bar con cocktail artigianali. Legno caldo, sapori decisi, personale in nero — perché facciamo sul serio.',
    'about.stat1':'Voci nel Menu','about.stat2':'Cocktail Artigianali','about.stat3':'Anni Aperti',
    'meal.eyebrow':'Speciale del Giorno','meal.title':'Piatto del Giorno',
    'meal.today':'In Evidenza Oggi','meal.special':'Speciale',
    'menu.eyebrow':'Cosa Serviamo','menu.title':'Il Nostro Menu','menu.cta':'Vedi il Menu Completo',
    'menu.cat.grill':'Grigliate & Bistecche','menu.cat.cocktails':'Cocktail',
    'menu.cat.drinks':'Spirits & Bevande','menu.cat.platters':'Ali & Vassoi',
    "events.eyebrow":"Cosa c'è",'events.title':'Eventi & Speciali',
    'events.specials':'Happy Hour & Promozioni',
    'reviews.eyebrow':'Cosa dicono','reviews.title':'Recensioni Ospiti',
    'reviews.write':'Lascia una Recensione','reviews.name':'Il tuo nome',
    'reviews.email':'E-mail','reviews.rating':'Valutazione',
    'reviews.comment':'La tua Recensione','reviews.submit':'Invia Recensione',
    'footer.hours':'Orari','footer.links':'Link Rapidi','footer.contact':'Contatti',
    'footer.rights':'© 2026 Roadhouse Deli & Grill. Tutti i diritti riservati.',
    'footer.days.weekday':'Dom – Gio','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'Ven – Sab','footer.hours.fri':'08:00 – 02:00',
  },
  zh: {
    'nav.home':'首页','nav.menu':'菜单','nav.meals':'今日特餐',
    'nav.events':'活动','nav.reviews':'评价','nav.contact':'联系我们',
    'hero.badge':'温德和克，独立大道',
    'hero.title1':'Roadhouse','hero.title2':'熟食与烧烤',
    'hero.subtitle':'美食与美好相聚之地',
    'hero.cta1':'查看菜单','hero.cta2':'预订座位','hero.scroll':'滑动',
    'about.eyebrow':'我们的故事','about.title':'源于对火炎与美味的热爱',
    'about.body':'Roadhouse 熟食与烧烤不仅是一家餐厅——更是一个聚会场所。白天，我们为城市提供丰盛美食；夜晚，我们用精制鸡尾酒和顶级烈酒点亮酒吧。',
    'about.stat1':'菜单项目','about.stat2':'精制鸡尾酒','about.stat3':'营业年限',
    'meal.eyebrow':'每日特供','meal.title':'今日特餐',
    'meal.today':'今日推荐','meal.special':'特供',
    'menu.eyebrow':'我们提供的','menu.title':'菜单','menu.cta':'查看完整菜单',
    'menu.cat.grill':'烧烤与牛排','menu.cat.cocktails':'鸡尾酒',
    'menu.cat.drinks':'烈酒与饮品','menu.cat.platters':'鸡翼与拼盘',
    'events.eyebrow':'近期活动','events.title':'活动与特惠',
    'events.specials':'欢乐时光与特惠',
    'reviews.eyebrow':'顾客评价','reviews.title':'客户评价',
    'reviews.write':'撰写评价','reviews.name':'您的姓名',
    'reviews.email':'电子邮件','reviews.rating':'评分',
    'reviews.comment':'您的评价','reviews.submit':'提交评价',
    'footer.hours':'营业时间','footer.links':'快速链接','footer.contact':'联系我们',
    'footer.rights':'© 2026 Roadhouse 熟食与烧烤。保留所有权利。',
    'footer.days.weekday':'周日 – 周四','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'周五 – 周六','footer.hours.fri':'08:00 – 02:00',
  },
  hi: {
    'nav.home':'होम','nav.menu':'मेनू','nav.meals':'दिन का भोजन',
    'nav.events':'कार्यक्रम','nav.reviews':'समीक्षाएं','nav.contact':'संपर्क',
    'hero.badge':'विंडहोक, स्वतंत्रता एवेन्यू',
    'hero.title1':'Roadhouse','hero.title2':'डेली और ग्रिल',
    'hero.subtitle':'जहाँ बेहतरीन खाना बेहतरीन साथ से मिलता है',
    'hero.cta1':'मेनू देखें','hero.cta2':'टेबल बुक करें','hero.scroll':'स्क्रोल करें',
    'about.eyebrow':'हमारी कहानी','about.title':'आग और स्वाद के प्यार से जन्मा',
    'about.body':'Roadhouse डेली और ग्रिल सिर्फ एक रेस्तरां नहीं — यह एक मिलन की जगह है।',
    'about.stat1':'मेनू आइटम','about.stat2':'क्राफ्ट कॉकटेल','about.stat3':'वर्ष खुला',
    'meal.eyebrow':'दैनिक विशेष','meal.title':'दिन का भोजन',
    'meal.today':'आज का फीचर','meal.special':'विशेष',
    'menu.eyebrow':'हम क्या परोसते हैं','menu.title':'हमारा मेनू','menu.cta':'पूरा मेनू देखें',
    'menu.cat.grill':'ग्रिल और स्टेक','menu.cat.cocktails':'कॉकटेल',
    'menu.cat.drinks':'स्पिरिट्स और पेय','menu.cat.platters':'विंग्स और प्लेटर',
    'events.eyebrow':'क्या चल रहा है','events.title':'कार्यक्रम और विशेष',
    'events.specials':'हैपी आवर और ऑफर',
    'reviews.eyebrow':'लोग क्या कहते हैं','reviews.title':'अतिथि समीक्षाएं',
    'reviews.write':'समीक्षा लिखें','reviews.name':'आपका नाम',
    'reviews.email':'ईमेल','reviews.rating':'रेटिंग',
    'reviews.comment':'आपकी समीक्षा','reviews.submit':'समीक्षा सबमिट करें',
    'footer.hours':'समय','footer.links':'त्वरित लिंक','footer.contact':'संपर्क',
    'footer.rights':'© 2026 Roadhouse डेली और ग्रिल। सभी अधिकार सुरक्षित।',
    'footer.days.weekday':'रवि – गुरु','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'शुक्र – शनि','footer.hours.fri':'08:00 – 02:00',
  },
  ja: {
    'nav.home':'ホーム','nav.menu':'メニュー','nav.meals':'本日のランチ',
    'nav.events':'イベント','nav.reviews':'レビュー','nav.contact':'お問い合わせ',
    'hero.badge':'ウィントフック、インデペンデンスアベニュー',
    'hero.title1':'Roadhouse','hero.title2':'デリ & グリル',
    'hero.subtitle':'最高の料理と最高の時間が集まる場所',
    'hero.cta1':'メニューを見る','hero.cta2':'テーブルを予約','hero.scroll':'スクロール',
    'about.eyebrow':'私たちのストーリー','about.title':'火と風味への愛から生まれた',
    'about.body':'Roadhouse デリ & グリルはレストラン以上の存在—集いの場です。昼間は心温まる食事、夜はクラフトカクテルでバーを盛り上げます。',
    'about.stat1':'メニュー項目','about.stat2':'クラフトカクテル','about.stat3':'営業年数',
    'meal.eyebrow':'本日のスペシャル','meal.title':'本日のランチ',
    'meal.today':'本日のフィーチャー','meal.special':'スペシャル',
    'menu.eyebrow':'ご提供するもの','menu.title':'メニュー','menu.cta':'フルメニューを見る',
    'menu.cat.grill':'グリル & ステーキ','menu.cat.cocktails':'カクテル',
    'menu.cat.drinks':'スピリッツ & ドリンク','menu.cat.platters':'ウィング & プラッター',
    'events.eyebrow':'開催中のイベント','events.title':'イベント & スペシャル',
    'events.specials':'ハッピーアワー & スペシャル',
    'reviews.eyebrow':'お客様の声','reviews.title':'ゲストレビュー',
    'reviews.write':'レビューを書く','reviews.name':'お名前',
    'reviews.email':'メールアドレス','reviews.rating':'評価',
    'reviews.comment':'レビュー内容','reviews.submit':'レビューを送信',
    'footer.hours':'営業時間','footer.links':'クイックリンク','footer.contact':'お問い合わせ',
    'footer.rights':'© 2026 Roadhouse デリ & グリル。無断転載禁止。',
    'footer.days.weekday':'日 – 木','footer.hours.weekday':'08:00 – 00:00',
    'footer.days.fri':'金 – 土','footer.hours.fri':'08:00 – 02:00',
  },
};

const translations = T;

const mealsOfDay = {
  0:{name:'Family Feast',desc:'A whole flame-grilled chicken with golden fries and warm Portuguese bread. Made for sharing, built for feasting.',price:'N$195',img:'images/piz.png'},
  1:{name:'Roadhouse Pasta',desc:"Perfectly cooked pasta with ham in our chef's special cream sauce, topped with fresh herbs and parmesan.",price:'N$85',img:'https://images.unsplash.com/photo-1551183053-bf91798d792c?w=1800&auto=format&fit=crop&q=80'},
  2:{name:'Beef Stew',desc:'Slow-cooked tender beef in a rich, hearty gravy served with fluffy rice or pap. Pure comfort on a plate.',price:'N$100',img:'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=1800&auto=format&fit=crop&q=80'},
  3:{name:'Cottage Pie',desc:'Classic cottage pie with a savoury mince filling topped with golden mashed potato, served with green beans.',price:'N$100',img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&auto=format&fit=crop&q=80'},
  4:{name:'Chicken Schnitzel',desc:'Crispy, golden-fried chicken schnitzel served with creamy mash potato and rich homemade gravy.',price:'N$85',img:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=1800&auto=format&fit=crop&q=80'},
  5:{name:'Braai Plate',desc:'The Roadhouse Friday classic: boerewors, chicken, chops and sides. The weekend starts here.',price:'N$150',img:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1800&auto=format&fit=crop&q=80'},
  6:{name:'Grand Feast Delight',desc:'Short ribs, meatballs, crispy chips, flavourful wings, zesty Russian and a refreshing salad medley. Serves 4–6.',price:'N$500',img:'https://images.unsplash.com/photo-1544025162-d76538485491?w=1800&auto=format&fit=crop&q=80'},
};

const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

let currentLang = localStorage.getItem('rh_lang') || 'en';
let currentSlide = 0;   // review slider
let heroSlide  = 0;     // hero slideshow
let heroTotal  = 7;
let heroTimer  = null;

document.addEventListener('DOMContentLoaded', function() {
  initNav();
  initHeroSlideshow();
  initMealOfDay();
  initReveal();
  initReviewSlider();
  initStarRating();
  initReviewForm();
  initPageTransitions();
  buildLangDropdowns();
  applyLang(currentLang);
  if (document.querySelector('.menu-tabs')) initMenuTabs();
});

/* ── Navigation ── */
function initNav() {
  var navbar = document.getElementById('navbar');
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  window.addEventListener('scroll', function() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      if (mobileMenu) mobileMenu.classList.toggle('open');
    });
  }
  document.querySelectorAll('.mobile-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.lang-dropdown.open').forEach(function(d) {
      if (!d.contains(e.target)) d.classList.remove('open');
    });
  });
}

/* ── Hero Slideshow ── */
function initHeroSlideshow() {
  var slidesEl = document.getElementById('hero-slides');
  var dotsEl   = document.getElementById('hero-dots');
  if (!slidesEl) return;

  var today = new Date().getDay(); // 0=Sun … 6=Sat
  heroTotal = 7;

  /* Build slides starting from today so today is index 0 */
  for (var i = 0; i < 7; i++) {
    var dayIdx = (today + i) % 7;
    var meal   = mealsOfDay[dayIdx];
    var isToday = (i === 0);

    var slide = document.createElement('div');
    slide.className = 'hero-slide' + (isToday ? ' today-slide' : '');
    slide.dataset.day = dayIdx;

    slide.innerHTML =
      '<div class="slide-bg" style="background-image:url(\'' + meal.img + '\')"></div>' +
      '<div class="slide-overlay"></div>' +
      '<div class="slide-content">' +
        '<span class="slide-day-badge">' + (isToday ? 'Today — ' : '') + dayNames[dayIdx] + '</span>' +
        '<h1 class="slide-meal-name">' + meal.name + '</h1>' +
        '<p class="slide-desc">' + meal.desc + '</p>' +
        '<div class="slide-price">' + meal.price + '</div>' +
        '<div class="slide-cta">' +
          '<a href="menu.html" class="btn-primary">View Full Menu</a>' +
          '<a href="#contact"  class="btn-outline">Book a Table</a>' +
        '</div>' +
      '</div>';

    slidesEl.appendChild(slide);

    /* Dot */
    if (dotsEl) {
      var dot = document.createElement('button');
      dot.className = 'hero-dot' + (isToday ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.dataset.idx = i;
      dot.addEventListener('click', function() { goToHeroSlide(parseInt(this.dataset.idx)); });
      dotsEl.appendChild(dot);
    }
  }

  /* Activate first slide */
  goToHeroSlide(0);
  heroTimer = setInterval(function() { goToHeroSlide((heroSlide + 1) % heroTotal); }, 5500);

  /* Arrow buttons */
  var prev = document.querySelector('.hero-prev');
  var next = document.querySelector('.hero-next');
  if (prev) prev.addEventListener('click', function() {
    clearInterval(heroTimer);
    goToHeroSlide((heroSlide - 1 + heroTotal) % heroTotal);
    heroTimer = setInterval(function() { goToHeroSlide((heroSlide + 1) % heroTotal); }, 5500);
  });
  if (next) next.addEventListener('click', function() {
    clearInterval(heroTimer);
    goToHeroSlide((heroSlide + 1) % heroTotal);
    heroTimer = setInterval(function() { goToHeroSlide((heroSlide + 1) % heroTotal); }, 5500);
  });

  /* Swipe support */
  var ts = 0;
  var hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('touchstart', function(e) { ts = e.touches[0].clientX; }, {passive:true});
    hero.addEventListener('touchend', function(e) {
      var diff = ts - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) {
        clearInterval(heroTimer);
        goToHeroSlide(diff > 0 ? (heroSlide+1)%heroTotal : (heroSlide-1+heroTotal)%heroTotal);
        heroTimer = setInterval(function() { goToHeroSlide((heroSlide+1)%heroTotal); }, 5500);
      }
    });
  }
}

function goToHeroSlide(idx) {
  heroSlide = idx;
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.hero-dot');
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
  dots.forEach(function(d, i)   { d.classList.toggle('active', i === idx); });
}

/* ── Meal-of-Day cards ── */
function initMealOfDay() {
  var container = document.getElementById('meal-cards');
  if (!container) return;
  var day = new Date().getDay();
  var badge = document.getElementById('day-badge');
  if (badge) badge.textContent = dayNames[day];
  var days = [{o:-1,s:true},{o:0,s:false},{o:1,s:true}];
  container.innerHTML = days.map(function(item) {
    var d = ((day + item.o) + 7) % 7;
    var m = mealsOfDay[d];
    var isToday = item.o === 0;
    return '<div class="meal-card reveal"' + (item.s ? ' style="opacity:0.65"' : '') + '>' +
      '<div class="card-img"><img src="' + m.img + '" alt="' + m.name + '" loading="lazy">' +
      (isToday ? '<span class="special-tag" data-i18n="meal.special">Special</span>' : '') +
      '</div><div class="card-body">' +
      (isToday
        ? '<div style="font-family:Oswald,sans-serif;font-size:0.65rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--wood-warm);margin-bottom:0.25rem" data-i18n="meal.today">Today\'s Feature</div>'
        : '<div style="font-family:Oswald,sans-serif;font-size:0.65rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.25rem">' + dayNames[d] + '</div>') +
      '<h3>' + m.name + '</h3><p>' + m.desc + '</p><div class="card-price">' + m.price + '</div></div></div>';
  }).join('');
  initReveal();
}

/* ── Scroll reveal ── */
function initReveal() {
  var items = document.querySelectorAll('.reveal:not(.visible)');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
  items.forEach(function(el) { obs.observe(el); });
}

/* ── Review Slider ── */
function initReviewSlider() {
  var track = document.querySelector('.reviews-track');
  var dotsC = document.querySelector('.slider-dots');
  if (!track) return;
  var cards = track.querySelectorAll('.review-card');
  var pv = function() { return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3; };
  var total = Math.ceil(cards.length / pv());
  if (dotsC) {
    dotsC.innerHTML = Array.from({length:total}, function(_,i) {
      return '<span class="dot' + (i===0?' active':'') + '" data-idx="' + i + '"></span>';
    }).join('');
    dotsC.querySelectorAll('.dot').forEach(function(dot) {
      dot.addEventListener('click', function() { goToSlide(parseInt(dot.dataset.idx)); });
    });
  }
  var prev = document.querySelector('.slider-btn.prev');
  var next = document.querySelector('.slider-btn.next');
  if (prev) prev.addEventListener('click', function() { goToSlide(currentSlide - 1); });
  if (next) next.addEventListener('click', function() { goToSlide(currentSlide + 1); });
  var ap = setInterval(function() { goToSlide((currentSlide+1)%total); }, 5000);
  track.addEventListener('mouseenter', function() { clearInterval(ap); });
  track.addEventListener('mouseleave', function() { ap = setInterval(function() { goToSlide((currentSlide+1)%total); }, 5000); });
  var sx = 0;
  track.addEventListener('touchstart', function(e) { sx = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', function(e) {
    var d = sx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) goToSlide(d > 0 ? currentSlide+1 : currentSlide-1);
  });
  renderStoredReviews();
}
window.initReviewSlider = initReviewSlider; // expose for Firebase module

function goToSlide(idx) {
  var track = document.querySelector('.reviews-track');
  if (!track) return;
  var pv = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  var max = Math.ceil(track.querySelectorAll('.review-card').length / pv) - 1;
  currentSlide = Math.max(0, Math.min(idx, max));
  var w = track.querySelector('.review-card').offsetWidth;
  track.style.transform = 'translateX(-' + (currentSlide * pv * (w + 24)) + 'px)';
  document.querySelectorAll('.dot').forEach(function(dot, i) { dot.classList.toggle('active', i === currentSlide); });
}

/* ── Star Rating ── */
function initStarRating() {
  var stars = document.querySelectorAll('.star-rating span');
  var sel = 5;
  stars.forEach(function(s, i) { s.classList.toggle('lit', i < sel); });
  stars.forEach(function(star, idx) {
    star.addEventListener('mouseenter', function() { stars.forEach(function(s,i) { s.classList.toggle('lit', i<=idx); }); });
    star.addEventListener('mouseleave', function() { stars.forEach(function(s,i) { s.classList.toggle('lit', i<sel); }); });
    star.addEventListener('click', function() {
      sel = idx + 1;
      stars.forEach(function(s,i) { s.classList.toggle('lit', i<sel); });
      var inp = document.getElementById('rating-value');
      if (inp) inp.value = sel;
    });
  });
}

/* ── Review Form ── */
function initReviewForm() {
  var form = document.getElementById('review-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = form.querySelector('[name="reviewer-name"]').value.trim();
    var text = form.querySelector('[name="review-text"]').value.trim();
    var rating = parseInt(form.querySelector('#rating-value').value) || 5;
    if (!name || !text) return;
    var reviews = JSON.parse(localStorage.getItem('rh_reviews') || '[]');
    reviews.unshift({name:name, text:text, rating:rating, date:new Date().toLocaleDateString('en-GB',{month:'short',year:'numeric'})});
    localStorage.setItem('rh_reviews', JSON.stringify(reviews.slice(0,20)));
    form.reset();
    document.querySelectorAll('.star-rating span').forEach(function(s) { s.classList.remove('lit'); });
    renderStoredReviews();
    showToast('Review submitted — thank you!');
  });
}

function renderStoredReviews() {
  var track = document.querySelector('.reviews-track');
  if (!track) return;
  track.querySelectorAll('.review-card.user-review').forEach(function(c) { c.remove(); });
  var stored = JSON.parse(localStorage.getItem('rh_reviews') || '[]');
  stored.forEach(function(r) {
    var card = document.createElement('div');
    card.className = 'review-card user-review';
    card.innerHTML = '<p class="review-text">"' + r.text + '"</p>' +
      '<div class="reviewer"><div class="reviewer-avatar">' + r.name[0].toUpperCase() + '</div>' +
      '<div><div class="reviewer-name">' + r.name + '</div>' +
      '<div class="stars" style="font-size:0.8rem">' + '★'.repeat(r.rating) + '☆'.repeat(5-r.rating) + '</div>' +
      '<div class="reviewer-date">' + r.date + '</div></div></div>';
    track.prepend(card);
  });
}

/* ── Toast notification ── */
function showToast(msg) {
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:6rem;right:2rem;z-index:9999;background:var(--wood-mid);color:#f5f0eb;padding:1rem 1.5rem;border-radius:4px;font-family:Oswald,sans-serif;font-size:0.85rem;letter-spacing:0.1em;box-shadow:0 8px 25px rgba(0,0,0,0.4);transform:translateY(20px);opacity:0;transition:all 0.4s ease;';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function() { t.style.transform='translateY(0)'; t.style.opacity='1'; });
  setTimeout(function() { t.style.transform='translateY(20px)'; t.style.opacity='0'; setTimeout(function(){t.remove();},400); }, 3500);
}

/* ── Page Transitions ── */
function initPageTransitions() {
  var pt = document.querySelector('.page-transition');
  if (!pt) return;
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="tel"]):not([href^="mailto"]):not([href^="https"]):not([href^="http"])').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var href = link.href;
      pt.classList.add('active');
      setTimeout(function() { window.location.href = href; }, 400);
    });
  });
  window.addEventListener('pageshow', function() { pt.classList.remove('active'); });
}

/* ── Language Dropdown ── */
function buildLangDropdowns() {
  document.querySelectorAll('.lang-dropdown').forEach(function(dropdown) {
    var selected = dropdown.querySelector('.lang-selected');
    var menu = dropdown.querySelector('.lang-menu');
    if (!selected || !menu) return;
    menu.innerHTML = LANGS.map(function(l) {
      return '<div class="lang-option' + (l.code===currentLang?' active':'') + '" data-code="' + l.code + '">' +
        '<span class="lang-flag">' + l.flag + '</span> ' + l.label + '</div>';
    }).join('');
    updateAllLabels();
    selected.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    menu.querySelectorAll('.lang-option').forEach(function(opt) {
      opt.addEventListener('click', function() {
        currentLang = opt.dataset.code;
        localStorage.setItem('rh_lang', currentLang);
        dropdown.classList.remove('open');
        updateAllLabels();
        applyLang(currentLang);
      });
    });
  });
}

function updateAllLabels() {
  var lang = LANGS.find(function(l) { return l.code === currentLang; });
  if (!lang) return;
  document.querySelectorAll('.lang-dropdown').forEach(function(d) {
    var sel = d.querySelector('.lang-selected');
    if (sel) sel.innerHTML = '<span class="lang-flag">' + lang.flag + '</span> ' + lang.code.toUpperCase() + ' <span class="caret">▼</span>';
    d.querySelectorAll('.lang-option').forEach(function(o) { o.classList.toggle('active', o.dataset.code === currentLang); });
  });
}

function applyLang(lang) {
  var t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  document.documentElement.lang = lang;
}

/* ── Menu Tabs ── */
function initMenuTabs() {
  var tabs = document.querySelectorAll('.tab-btn');
  var sections = document.querySelectorAll('.menu-section');
  if (!tabs.length) return;
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.tab;
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      sections.forEach(function(s) { s.classList.toggle('visible', s.id === target); });
    });
  });
  tabs[0].click();
  if (window.location.hash) {
    var target = window.location.hash.slice(1);
    var tab = document.querySelector('.tab-btn[data-tab="' + target + '"]');
    if (tab) tab.click();
  }
}
