import { colorToolsIntl } from './color-tools-intl.ts';
import { timeToolsIntl } from './time-tools-intl.ts';
import { imageToolsIntl } from './image-tools-intl.ts';
import { soundToolsIntl } from './sound-tools-intl.ts';
import { foodToolsIntl } from './food-tools-intl.ts';
import { gameToolsIntl } from './game-tools-intl.ts';
import { deviceToolsIntl } from './device-tools-intl.ts';
import { textToolsIntl } from './text-tools-intl.ts';
import { CHECKLISTS_INTL } from './checklist-l10n/index.ts';
import { GENERATORS_EN } from './generator-en.ts';
import { GENERATORS_INTL } from './generator-l10n.ts';
import { QUIZZES_INTL } from './quiz-l10n/index.ts';
import { TESTS_INTL } from './test-l10n/index.ts';
import { CONVERT_TOOLS } from './convert-tools.ts';
import { convertL10n } from './convert-i18n.ts';
import { alternateLanguagesFor, ALL_LOCALES10, INTL_LOCALES10, localeHref, type AnyLocale10 } from './locales.ts';
import { SNAP_TOOLS, snapToolCopy } from './snap-tools-intl.ts';
import { FORTUNE_TOOLS, fortuneToolCopy } from './fortune-tools-intl.ts';

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
export type SearchIntlLang = Exclude<AnyLocale10, 'ko'>;

export interface SearchIntlItem {
  href: string;
  title: string;
  desc: string;
  section: string;
  icon: string;
}

type Entry = { slug: string; title: string; desc: string; icon: string };

/** 운세·스냅은 슬러그가 언어에 상관없이 같아 목록을 여기 둔다 */
/**
 * 운세 열아홉 장 — 아홉 언어 모두 있다.
 *
 * 예전에는 여기에 여덟 줄을 손으로 적어 두었는데, 그중 today는 만든 적이 없는
 * 페이지였다(도구 이름은 daily다) — 검색에서 누르면 404였다. 스냅에서와 같은
 * 실수라 같은 방법으로 고친다: 라우트 목록에서 만든다.
 */
export const FORTUNE_INTL: Partial<Record<SearchIntlLang, Entry[]>> = Object.fromEntries(
  INTL_LOCALES10.map(lang => [
    lang,
    FORTUNE_TOOLS.map(t => {
      const c = fortuneToolCopy(lang, t.slug);
      return { slug: t.slug, title: c.title, desc: c.desc, icon: t.icon };
    }),
  ]),
);

/**
 * 스냅테스트는 라우트가 열한 장이고 아홉 언어 모두 있다.
 *
 * 예전에는 여기에 다섯 줄을 손으로 적어 두었는데, 그중 face-shape는 만든 적이
 * 없는 페이지였다 — 검색에서 누르면 404였다. 목록을 손으로 두면 라우트와
 * 어긋나는 것을 아무도 모른다. 그래서 [[lib/snap-tools-intl.ts]]에서 만든다.
 */
export const SNAP_INTL: Partial<Record<SearchIntlLang, Entry[]>> = Object.fromEntries(
  INTL_LOCALES10.map(lang => [
    lang,
    SNAP_TOOLS.map(t => {
      const c = snapToolCopy(lang, t.slug);
      return { slug: t.slug, title: c.title, desc: c.desc, icon: t.icon };
    }),
  ]),
);

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
    ...tools('checklist', CHECKLISTS_INTL[lang]),
    // 생성기는 영어와 여덟 언어가 같은 스무 종을 가진다
    ...tools('generator', lang === 'en' ? GENERATORS_EN : GENERATORS_INTL[lang]),
    ...tools('quiz', QUIZZES_INTL[lang]),
    // 심리테스트는 아홉 언어 모두 있다 — 체크리스트·퀴즈만 아직 영어뿐이다
    ...tools('test', TESTS_INTL[lang]),
    ...tools('fortune', FORTUNE_INTL[lang]),
    ...tools('snap', SNAP_INTL[lang]),
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
  'zh-hans': {
    title: '搜索',
    desc: '一次搜遍站内所有工具 — 换算、检测、测验、清单、小游戏都在内。不用先知道它在哪个分类。',
    heading: '搜索', h1: '搜遍 vixutil 的所有工具',
    countSuffix: n => `${n}个工具`,
    placeholder: '按名字搜 — 计时器、坏点、杯换克…',
    noResult: '没有对上的。换个更短的词，或者直接搜你想量的东西的名字。',
    hint: '这里的一切都在你的浏览器里跑。不用注册，什么都不上传。',
    all: '全部',
  },
  'zh-hant': {
    title: '搜尋',
    desc: '一次搜遍站內所有工具 — 換算、檢測、測驗、清單、小遊戲都在內。不用先知道它在哪個分類。',
    heading: '搜尋', h1: '搜遍 vixutil 的所有工具',
    countSuffix: n => `${n}個工具`,
    placeholder: '按名字搜 — 計時器、壞點、杯換公克…',
    noResult: '沒有對上的。換個更短的詞，或者直接搜你想量的東西的名字。',
    hint: '這裡的一切都在你的瀏覽器裡跑。不用註冊，什麼都不上傳。',
    all: '全部',
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
  return alternateLanguagesFor('/search', [...ALL_LOCALES10.filter(l => l !== 'ko')]);
}
