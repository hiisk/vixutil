import { colorToolsIntl } from './color-tools-intl.ts';
import { timeToolsIntl } from './time-tools-intl.ts';
import { imageToolsIntl } from './image-tools-intl.ts';
import { soundToolsIntl } from './sound-tools-intl.ts';
import { foodToolsIntl } from './food-tools-intl.ts';
import { gameToolsIntl } from './game-tools-intl.ts';
import { deviceToolsIntl } from './device-tools-intl.ts';
import { textToolsIntl } from './text-tools-intl.ts';
import { CHECKLISTS_EN } from './checklist-en.ts';
import { QUIZZES_EN } from './quiz-en.ts';
import { TESTS_EN } from './test-en.ts';
import { CONVERT_TOOLS } from './convert-tools.ts';
import { convertL10n } from './convert-i18n.ts';
import { alternateLanguagesFor, INTL_LOCALES, localeHref, type IntlLocale } from './locales.ts';

/**
 * 번역 언어 통합 검색의 목록.
 *
 * 한국어 SEARCH_INDEX를 그대로 쓸 수 없다. 그쪽에는 계산기 107종과 크립토처럼
 * 번역하지 않은 것이 들어 있고, 체크리스트·퀴즈·심리테스트는 언어별로 항목
 * 자체가 다르다. 없는 페이지를 검색 결과로 내보내면 누르는 사람이 404를 본다.
 *
 * 그래서 언어별 도구 목록을 그대로 세어 만든다 — 어느 언어에 항목이 추가되면
 * 여기를 고치지 않아도 검색에 함께 잡힌다.
 *
 * 영어에만 있는 섹션은 영어에만 싣는다. 체크리스트·퀴즈·심리테스트·운세·스냅은
 * 아직 영어까지만 있어서 스페인어 검색에 넣으면 결과가 전부 404가 된다. 그 섹션을
 * 번역하면 아래 조건만 지우면 된다.
 */
export type SearchIntlLang = IntlLocale;

export interface SearchIntlItem {
  href: string;
  title: string;
  desc: string;
  section: string;
  icon: string;
}

type Entry = { slug: string; title: string; desc: string; icon: string };

/** 운세·스냅은 슬러그가 언어에 상관없이 같아 목록을 여기 둔다 */
const FORTUNE: Partial<Record<SearchIntlLang, Entry[]>> = {
  en: [
    { slug: 'today', title: 'Today’s Fortune', desc: 'A reading for today by star sign, zodiac animal, blood type or MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Today’s Tarot Card', desc: 'One card from the major arcana, the same all day', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarot Yes or No', desc: 'Hold a question in mind and draw one card', icon: '🔮' },
    { slug: 'tarot', title: 'Tarot Reading', desc: 'Full 78-card deck, four spreads, upright and reversed', icon: '🎴' },
    { slug: 'saju', title: 'Saju — Korean Four Pillars', desc: 'Your four pillars, five elements, day master and luck pillars', icon: '🀄' },
    { slug: 'today-color', title: 'Today’s Lucky Colour', desc: 'A colour and a number for today', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Lucky Numbers', desc: 'Six numbers from your date of birth, new each day', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorhythm', desc: 'Physical, emotional and intellectual cycles from your birth date', icon: '📈' },
  ],
};

const SNAP: Partial<Record<SearchIntlLang, Entry[]>> = {
  en: [
    { slug: 'smile-score', title: 'Smile Score', desc: 'One photo, and it scores the smile', icon: '😄' },
    { slug: 'face-symmetry', title: 'Face Symmetry', desc: 'How closely the two halves match', icon: '🪞' },
    { slug: 'face-shape', title: 'Face Shape', desc: 'Oval, round, square or heart', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Golden Ratio', desc: 'Facial proportions against 1:1.618', icon: '📐' },
    { slug: 'personal-color', title: 'Personal Colour', desc: 'Warm or cool, from the photo', icon: '🎨' },
  ],
};

/**
 * 단위 변환 100종.
 *
 * 사전(lib/convert-l10n/)에 이미 그 언어 제목·설명이 있으므로 여기서 다시 쓰지
 * 않고 꺼내 쓴다. 검색 결과의 문장과 페이지의 문장이 같아야 누른 사람이 같은
 * 도구로 읽는다.
 */
function convertEntries(lang: SearchIntlLang): Entry[] {
  return CONVERT_TOOLS.map(t => {
    const l = convertL10n(t.slug, lang);
    return { slug: t.slug, title: l?.title ?? t.title, desc: l?.desc ?? t.desc, icon: t.icon };
  });
}

/** 언어별 검색 목록 — 실제로 그 언어에 있는 페이지만 담는다 */
export function searchIndexIntl(lang: SearchIntlLang): SearchIntlItem[] {
  const tools = (sec: string, list: Entry[] = []) =>
    list.map(t => ({
      href: localeHref(lang, `/${sec}/${t.slug}`),
      title: t.title, desc: t.desc, section: sec, icon: t.icon,
    }));

  // 영어에만 있는 섹션 — 다른 언어에 실으면 누르는 사람이 404를 본다
  const enOnly = lang === 'en';

  return [
    ...tools('convert', convertEntries(lang)),
    ...tools('color', colorToolsIntl(lang)),
    ...tools('time', timeToolsIntl(lang)),
    ...tools('image', imageToolsIntl(lang)),
    ...tools('sound', soundToolsIntl(lang)),
    ...tools('food', foodToolsIntl(lang)),
    ...tools('game', gameToolsIntl(lang)),
    ...tools('device', deviceToolsIntl(lang)),
    ...tools('text', textToolsIntl(lang)),
    ...(enOnly ? tools('checklist', CHECKLISTS_EN) : []),
    ...(enOnly ? tools('quiz', QUIZZES_EN) : []),
    ...(enOnly ? tools('test', TESTS_EN) : []),
    ...tools('fortune', FORTUNE[lang]),
    ...tools('snap', SNAP[lang]),
  ];
}

export const SEARCH_INTL_UI: Record<SearchIntlLang, {
  title: string; desc: string; heading: string; h1: string;
  countSuffix: (n: number) => string;
  placeholder: string; noResult: string; hint: string;
  /** 섹션 필터의 '전체' 버튼 */
  all: string;
}> = {
  en: {
    title: 'Search',
    desc: 'Search every tool on the site at once — converters, tests, quizzes, checklists, games and more. You do not need to know which section it is in.',
    heading: 'Search', h1: 'Search every tool on vixutil',
    countSuffix: n => `${n} tools`,
    placeholder: 'Search by name — timer, dead pixel, cups to grams…',
    noResult: 'Nothing matched. Try a shorter word, or the name of the thing you want to measure.',
    hint: 'Everything here runs in your browser. No sign-up, nothing uploaded.',
    all: 'All',
  },
  es: {
    title: 'Buscar herramientas',
    desc: 'Busca de una vez todas las herramientas del sitio: conversores, colores, imágenes, sonido, cocina, juegos, aparatos y texto. No hace falta saber en qué sección está.',
    heading: 'Buscar', h1: 'Busca cualquier herramienta de vixutil',
    countSuffix: n => `${n} herramientas`,
    placeholder: 'Escribe un nombre: temporizador, píxel muerto, tazas a gramos…',
    noResult: 'No hay coincidencias. Prueba con una palabra más corta, o con el nombre de lo que quieres medir.',
    hint: 'Todo funciona en tu navegador. Sin registro y sin subir nada.',
    all: 'Todo',
  },
  'pt-br': {
    title: 'Buscar ferramentas',
    desc: 'Busque de uma vez todas as ferramentas do site: conversores, cores, imagens, som, cozinha, jogos, aparelhos e texto. Você não precisa saber em qual seção está.',
    heading: 'Buscar', h1: 'Busque qualquer ferramenta do vixutil',
    countSuffix: n => `${n} ferramentas`,
    placeholder: 'Digite um nome: timer, pixel morto, xícaras para gramas…',
    noResult: 'Nada corresponde. Tente uma palavra mais curta, ou o nome do que você quer medir.',
    hint: 'Tudo roda no seu navegador. Sem cadastro e sem enviar nada.',
    all: 'Tudo',
  },
  ja: {
    title: '検索',
    desc: 'サイトのツールをまとめて検索します。単位変換・配色・画像・音・料理・ゲーム・端末チェック・テキストまで、どのセクションにあるか知らなくても見つかります。',
    heading: '検索', h1: 'vixutilのツールをまとめて検索',
    countSuffix: n => `${n}件`,
    placeholder: '名前で検索 — タイマー、ドット抜け、カップ→グラム…',
    noResult: '見つかりませんでした。短い言葉か、測りたいものの名前で試してください。',
    hint: 'すべてブラウザ上で動きます。登録も送信もありません。',
    all: 'すべて',
  },
  de: {
    title: 'Suche',
    desc: 'Durchsuche alle Werkzeuge der Seite auf einmal — Umrechner, Farben, Bilder, Klang, Küche, Spiele, Gerätetests und Text. Du musst nicht wissen, in welchem Bereich etwas steckt.',
    heading: 'Suche', h1: 'Alle Werkzeuge auf vixutil durchsuchen',
    countSuffix: n => `${n} Werkzeuge`,
    placeholder: 'Nach Namen suchen — Timer, Pixelfehler, Cups in Gramm…',
    noResult: 'Nichts gefunden. Versuch ein kürzeres Wort, oder den Namen dessen, was du messen willst.',
    hint: 'Alles läuft in deinem Browser. Keine Anmeldung, nichts wird hochgeladen.',
    all: 'Alle',
  },
  fr: {
    title: 'Recherche',
    desc: 'Cherche tous les outils du site d’un coup : convertisseurs, couleurs, images, son, cuisine, jeux, tests d’appareil et texte. Pas besoin de savoir dans quelle section ils se trouvent.',
    heading: 'Recherche', h1: 'Chercher n’importe quel outil de vixutil',
    countSuffix: n => `${n} outils`,
    placeholder: 'Cherche par nom — minuteur, pixel mort, tasses en grammes…',
    noResult: 'Aucun résultat. Essaie un mot plus court, ou le nom de ce que tu veux mesurer.',
    hint: 'Tout tourne dans ton navigateur. Sans inscription, rien n’est envoyé.',
    all: 'Tout',
  },
  hi: {
    title: 'खोज',
    desc: 'साइट के सारे उपकरण एक बार में खोजें — कनवर्टर, रंग, इमेज, ध्वनि, रसोई, खेल, उपकरण जाँच और टेक्स्ट। कौन-सा किस हिस्से में है, यह जानना ज़रूरी नहीं।',
    heading: 'खोज', h1: 'vixutil के सारे उपकरण खोजें',
    countSuffix: n => `${n} उपकरण`,
    placeholder: 'नाम से खोजें — टाइमर, डेड पिक्सेल, कप से ग्राम…',
    noResult: 'कुछ नहीं मिला। छोटा शब्द आज़माएँ, या जो नापना है उसका नाम लिखें।',
    hint: 'सब कुछ आपके ब्राउज़र में चलता है। कोई खाता नहीं, कुछ अपलोड नहीं।',
    all: 'सब',
  },
};

/**
 * 검색 페이지의 hreflang.
 *
 * 한국어 /search는 계산기·크립토까지 담은 다른 목록이라 짝으로 맺지 않는다.
 * 번역 일곱 언어끼리는 같은 구성이므로 서로를 가리켜야 한다 — 한쪽 방향만
 * 걸린 hreflang은 구글이 짝으로 인정하지 않는다.
 */
export function searchAlternates(): Record<string, string> {
  return alternateLanguagesFor('/search', [...INTL_LOCALES]);
}
