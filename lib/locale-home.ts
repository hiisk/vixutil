import type { AnyLocale } from './locales';

/**
 * 언어별 첫 화면에 무엇을 싣는지 한 곳에 모은다.
 *
 * /en/page.tsx는 섹션 21개를 그 파일 안에 배열로 들고 있었다. 언어가 둘일 때는
 * 그래도 됐지만 여덟이 되면 같은 배열이 여덟 벌 생기고, 섹션을 하나 번역할 때마다
 * 여덟 파일을 고쳐야 한다. 그중 하나를 빼먹으면 그 언어에서만 새 섹션이 보이지
 * 않는데, 링크가 깨지는 게 아니라 그냥 없어서 아무 검사에도 안 걸린다.
 *
 * 그래서 섹션마다 어느 언어에 있는지를 copy에 적는다. copy에 그 언어가 없으면
 * 첫 화면에 싣지 않는다 — 없는 페이지를 링크하면 404이자 끊어진 내부 링크다.
 * 섹션을 새 언어로 번역하면 여기 한 줄만 늘리면 그 언어의 첫 화면이 같이 자란다.
 *
 * 한국어(ko)는 app/page.tsx가 따로 있다. 원본이라 문구도 구성도 다른 길을 걸어와서
 * 여기에 억지로 맞추면 양쪽이 다 나빠진다.
 */

type Copy = { title: string; desc: string };

export type HomeSection = {
  /** 언어 접두어를 뺀 경로 */
  route: string;
  icon: string;
  /** 카드 배경 원의 그라디언트 */
  color: string;
  accent: string;
  border: string;
  bg: string;
  /** 이 섹션이 있는 언어만 적는다 */
  copy: Partial<Record<AnyLocale, Copy>>;
};

const SECTIONS: HomeSection[] = [
  {
    route: '/convert', icon: '📐', color: 'from-slate-500 to-slate-700',
    accent: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', bg: 'bg-slate-50 dark:bg-slate-800/40',
    copy: {
      en: { title: 'Unit Converter', desc: 'Length, weight, temperature, area and more' },
    },
  },
  {
    route: '/checklist', icon: '✅', color: 'from-sky-400 to-cyan-600',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Checklists', desc: 'Moving, travel, interviews, camping, weddings' },
    },
  },
  {
    route: '/test', icon: '🧭', color: 'from-violet-500 to-pink-600',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Personality Tests', desc: 'Social battery, stress, decisions, work style' },
    },
  },
  {
    route: '/quiz', icon: '🏆', color: 'from-amber-400 to-orange-500',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Quizzes', desc: 'Capitals, science, history, tech, film' },
    },
  },
  {
    route: '/generator', icon: '⚙️', color: 'from-emerald-400 to-teal-600',
    accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    copy: {
      en: { title: 'Name Generators', desc: 'Fantasy, sci-fi, superhero, villain names' },
    },
  },
  {
    route: '/random', icon: '🎲', color: 'from-rose-500 to-pink-600',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Random Pickers', desc: 'Wheel, name picker, teams, dice, Secret Santa' },
    },
  },
  {
    route: '/snap', icon: '📸', color: 'from-fuchsia-500 to-sky-500',
    accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    copy: {
      en: { title: 'Snap Tests', desc: 'One photo: smile score, symmetry, face reading' },
    },
  },
  {
    route: '/fortune', icon: '🔮', color: 'from-violet-500 to-purple-700',
    accent: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-900/50', bg: 'bg-purple-50 dark:bg-purple-950/30',
    copy: {
      en: { title: 'Horoscopes', desc: 'Star signs, Chinese zodiac, tarot, BaZi' },
    },
  },
  {
    route: '/time', icon: '⏱️', color: 'from-sky-400 to-cyan-600',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'Time Tools', desc: 'Timer, stopwatch, world clock, date maths' },
    },
  },
  {
    route: '/color', icon: '🎨', color: 'from-fuchsia-500 to-rose-500',
    accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    copy: {
      en: { title: 'Colour Tools', desc: 'Palette, shades, contrast, CSS gradient' },
      es: { title: 'Herramientas de color', desc: 'Paletas, tonos, contraste, degradados CSS' },
      'pt-br': { title: 'Ferramentas de cor', desc: 'Paletas, tons, contraste, gradiente CSS' },
      ja: { title: 'カラーツール', desc: '配色・色段階・コントラスト比・CSSグラデーション' },
      de: { title: 'Farbwerkzeuge', desc: 'Paletten, Abstufungen, Kontrast, CSS-Verläufe' },
      fr: { title: 'Outils de couleur', desc: 'Palettes, nuances, contraste, dégradés CSS' },
      hi: { title: 'रंग उपकरण', desc: 'पैलेट, शेड, कंट्रास्ट, CSS ग्रेडिएंट' },
    },
  },
  {
    route: '/image', icon: '🖼️', color: 'from-violet-500 to-indigo-600',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Image Tools', desc: 'Compress, resize, crop, blur faces' },
    },
  },
  {
    route: '/sound', icon: '🔊', color: 'from-indigo-500 to-violet-600',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Sound Tools', desc: 'Metronome, tuner, white noise, tone' },
    },
  },
  {
    route: '/food', icon: '🍳', color: 'from-amber-500 to-orange-600',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Cooking Tools', desc: 'Cups to grams, oven temp, rice, coffee' },
    },
  },
  {
    route: '/game', icon: '🎮', color: 'from-emerald-500 to-teal-600',
    accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    copy: {
      en: { title: 'Brain Games', desc: 'Reaction, memory, typing, aim, mental maths' },
    },
  },
  {
    route: '/device', icon: '🔧', color: 'from-sky-500 to-blue-600',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Device Tests', desc: 'Keyboard, mouse, mic, webcam, dead pixels' },
    },
  },
  {
    route: '/text', icon: '✏️', color: 'from-indigo-500 to-violet-600',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Text Tools', desc: 'Clean up, dedupe, case convert, count' },
    },
  },
  {
    route: '/rate', icon: '📊', color: 'from-orange-500 to-amber-600',
    accent: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-900/50', bg: 'bg-orange-50 dark:bg-orange-950/30',
    copy: {
      en: { title: 'Percent & Rate', desc: 'Discounts, VAT, percent change, compound interest' },
    },
  },
  {
    route: '/body', icon: '🎯', color: 'from-rose-500 to-red-600',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Body Metrics', desc: 'BMI, body fat, BMR, running pace, one-rep max' },
    },
  },
  {
    route: '/geometry', icon: '🔵', color: 'from-cyan-500 to-blue-600',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'Geometry', desc: 'Areas, volumes, Pythagoras, angles' },
    },
  },
  {
    route: '/country', icon: '🪙', color: 'from-teal-500 to-emerald-600',
    accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30',
    copy: {
      en: { title: 'Country Facts', desc: 'Time difference, plugs, dialling codes, currency' },
    },
  },
  {
    route: '/metro', icon: '🚇', color: 'from-blue-500 to-indigo-600',
    accent: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-900/50', bg: 'bg-blue-50 dark:bg-blue-950/30',
    copy: {
      en: { title: 'Metro Station Quiz', desc: 'Seoul, Tokyo, London and New York lines' },
    },
  },
  {
    route: '/hanja', icon: '🀄', color: 'from-amber-600 to-yellow-700',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Four-Character Idioms', desc: 'Fifty Korean idioms with meaning and origin' },
    },
  },
];

/** 그 언어의 첫 화면에 실을 섹션. 선언 순서를 지킨다 */
export function homeSections(lang: AnyLocale): (Omit<HomeSection, 'copy'> & Copy)[] {
  return SECTIONS.flatMap(s => {
    const c = s.copy[lang];
    if (!c) return [];
    const { copy: _copy, ...rest } = s;
    return [{ ...rest, ...c }];
  });
}

/** 그 언어에 이 섹션이 있는지 — LangPicker의 available을 만들 때 쓴다 */
export function localesWithSection(route: string): AnyLocale[] {
  const s = SECTIONS.find(x => x.route === route);
  return s ? (Object.keys(s.copy) as AnyLocale[]) : [];
}

export type HomeUi = {
  metaTitle: string;
  metaDesc: string;
  /** 로고 옆 스크린리더용 설명 */
  srTagline: string;
  tagline: string;
  /** 카드 안의 "열기" */
  open: string;
  /** 통합 검색이 있는 언어만. 없으면 검색 줄을 그리지 않는다 */
  search?: { placeholder: string; cta: string };
  notice: string;
};

export const HOME_UI: Record<Exclude<AnyLocale, 'ko'>, HomeUi> = {
  en: {
    metaTitle: 'vixutil — Free Everyday Tools',
    metaDesc: 'Free tools that run in your browser: unit conversion, checklists, quizzes, personality tests, name generators, random pickers, photo tests and daily horoscopes. No sign-up.',
    srTagline: ' — free everyday tools',
    tagline: 'Free tools that run in your browser',
    open: 'Open',
    search: { placeholder: 'Timer, dead pixel, cups to grams…', cta: 'Search all' },
    notice: 'Everything here runs in your browser. Nothing is uploaded, nothing needs an account.',
  },
  es: {
    metaTitle: 'vixutil — Herramientas gratis para el día a día',
    metaDesc: 'Herramientas gratis que funcionan en tu navegador: generador de paletas, escala de tonos, comprobador de contraste y degradados CSS. Sin registro.',
    srTagline: ' — herramientas gratis para el día a día',
    tagline: 'Herramientas gratis que funcionan en tu navegador',
    open: 'Abrir',
    notice: 'Todo funciona en tu navegador. No se sube nada y no hace falta cuenta.',
  },
  'pt-br': {
    metaTitle: 'vixutil — Ferramentas grátis para o dia a dia',
    metaDesc: 'Ferramentas grátis que rodam no seu navegador: gerador de paletas, escala de tons, verificador de contraste e gradiente CSS. Sem cadastro.',
    srTagline: ' — ferramentas grátis para o dia a dia',
    tagline: 'Ferramentas grátis que rodam no seu navegador',
    open: 'Abrir',
    notice: 'Tudo roda no seu navegador. Nada é enviado e não precisa de cadastro.',
  },
  ja: {
    metaTitle: 'vixutil — 無料の便利ツール',
    metaDesc: 'ブラウザで動く無料ツール：カラーパレット作成、色段階、コントラスト比チェック、CSSグラデーション。登録は不要です。',
    srTagline: '— 無料の便利ツール',
    tagline: 'ブラウザで動く無料ツール',
    open: '開く',
    notice: 'すべてブラウザの中で動きます。データはどこにも送られず、アカウントも必要ありません。',
  },
  de: {
    metaTitle: 'vixutil — Kostenlose Alltagswerkzeuge',
    metaDesc: 'Kostenlose Werkzeuge direkt im Browser: Palettengenerator, Farbabstufungen, Kontrast-Prüfer und CSS-Verläufe. Ohne Anmeldung.',
    srTagline: ' — kostenlose Alltagswerkzeuge',
    tagline: 'Kostenlose Werkzeuge, die im Browser laufen',
    open: 'Öffnen',
    notice: 'Alles läuft in deinem Browser. Nichts wird hochgeladen, ein Konto brauchst du nicht.',
  },
  fr: {
    metaTitle: 'vixutil — Outils gratuits du quotidien',
    metaDesc: 'Des outils gratuits qui tournent dans ton navigateur : générateur de palettes, échelle de nuances, vérificateur de contraste et dégradés CSS. Sans inscription.',
    srTagline: ' — outils gratuits du quotidien',
    tagline: 'Des outils gratuits qui tournent dans ton navigateur',
    open: 'Ouvrir',
    notice: 'Tout tourne dans ton navigateur. Rien n’est envoyé, aucun compte n’est nécessaire.',
  },
  hi: {
    metaTitle: 'vixutil — रोज़मर्रा के मुफ़्त उपकरण',
    metaDesc: 'ब्राउज़र में चलने वाले मुफ़्त उपकरण: पैलेट जनरेटर, शेड श्रेणी, कंट्रास्ट जाँच और CSS ग्रेडिएंट। रजिस्ट्रेशन की ज़रूरत नहीं।',
    srTagline: ' — रोज़मर्रा के मुफ़्त उपकरण',
    tagline: 'ब्राउज़र में चलने वाले मुफ़्त उपकरण',
    open: 'खोलें',
    notice: 'सब कुछ आपके ब्राउज़र में चलता है। कुछ भी अपलोड नहीं होता और खाते की ज़रूरत नहीं।',
  },
};
