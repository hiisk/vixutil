/**
 * 사이트가 내보내는 언어 — 자료 파일이 쓰는 짧은 열쇠와, 그에 딸린 주소·hreflang.
 *
 * 목록 자체는 lib/locales.ts가 갖는다. 여기서는 그 목록을 받아 데이터 파일이 쓸
 * 짧은 열쇠(ko·en·es·pt·ja·de·fr·hi·zh·tw)만 붙인다.
 *
 * ── 열쇠와 경로가 다른 이유 ─────────────────────────────
 * 경로는 pt-br·zh-hans·zh-hant인데 자료 파일 수백 곳이 `pt:`·`zh:`·`tw:`를 열쇠로
 * 쓴다. 열쇠에 하이픈이 들어가면 `'pt-br':`처럼 따옴표를 늘 붙여야 하고 이미 쓰인
 * 곳을 전부 고쳐야 한다. 그래서 열쇠는 짧게 두고 주소·hreflang·이름은 레지스트리에서
 * 가져온다. 둘이 어긋나지 않는지는 tests/lang-registry.test.ts가 지킨다.
 *
 * ── 왜 파일 이름에 숫자를 안 넣는가 ──────────────────────
 * 예전에는 lang8.ts와 lang10.ts가 따로 있었다. 여덟 언어를 담은 자료가 수백 곳이라
 * 중국어 둘을 더할 때 열 칸짜리 층을 옆에 새로 만든 것인데, 그 결과 언어 목록·주소
 * 계산·hreflang 조립이 두 벌로 복제됐다. 열한 번째 언어가 오면 lang11.ts가 또
 * 생겼을 것이다.
 *
 * 이제 한 곳이다. 언어를 더하는 일은 lib/locales.ts에 한 줄, 여기 KEY_OF_PATH에
 * 한 줄이 전부다. 여덟 칸짜리 한시적인 층(Lang8·L8·alternates8 …)도 모든 섹션이
 * 열 언어로 넘어오면서 사라졌다.
 */
import { LOCALES, NEXT_LOCALES, type AnyLocale10 } from '../locales.ts';

/** 자료 파일이 쓰는 짧은 열쇠 */
export type Lang = 'ko' | 'en' | 'es' | 'pt' | 'ja' | 'de' | 'fr' | 'hi' | 'zh' | 'tw';

/** 모든 언어를 다 채워야 하는 값 */
export type L<T> = Record<Lang, T>;

export interface LangInfo {
  lang: Lang;
  /** 화면의 언어 전환에 보이는 이름 — 그 언어로 적는다 */
  label: string;
  /** 경로 앞머리. 한국어는 없다 */
  prefix: string;
  /** hreflang 값 — 경로와 다를 수 있다 */
  hreflang: string;
  /** <html lang> 값. hreflang과 같다. */
  htmlLang: string;
  /** 경로형 로케일 — LangPicker·sitemap이 쓰는 값 */
  locale: AnyLocale10;
}

/**
 * 경로 → 자료 열쇠. 레지스트리에 언어를 더하면 여기도 한 줄 늘어난다.
 * 빠뜨리면 tests/lang-registry.test.ts가 잡는다.
 */
const KEY_OF_PATH: Record<string, Lang> = {
  '': 'ko', en: 'en', es: 'es', 'pt-br': 'pt', ja: 'ja', de: 'de', fr: 'fr', hi: 'hi',
  'zh-hans': 'zh', 'zh-hant': 'tw',
};

const info = (l: (typeof LOCALES)[number] | (typeof NEXT_LOCALES)[number]): LangInfo => ({
  lang: KEY_OF_PATH[l.path],
  label: l.label,
  prefix: l.path === '' ? '' : `/${l.path}`,
  hreflang: l.tag,
  htmlLang: l.tag,
  locale: (l.path === '' ? 'ko' : l.path) as AnyLocale10,
});

/** 모든 언어 */
export const LANGS: LangInfo[] = [...LOCALES, ...NEXT_LOCALES].map(info);
export const LANG_CODES: Lang[] = LANGS.map(l => l.lang);

/** 이 섹션이 있는 언어 목록 — LangPicker에 그대로 넘긴다 */
export const LOCALE_PATHS: AnyLocale10[] = LANGS.map(l => l.locale);

export const langInfo = (lang: Lang): LangInfo =>
  LANGS.find(l => l.lang === lang) ?? LANGS[0];

/**
 * 경로 앞머리. 이름을 prefix로 짧게 두지 않는 이유는, 화면 컴포넌트 스무 곳이
 * 이미 지역 변수 `prefix`를 쓰고 있어서 import가 그것을 가리기 때문이다.
 */
export const langPrefix = (lang: Lang): string => langInfo(lang).prefix;

/**
 * 경로형 로케일을 자료 열쇠로 — 'pt-br'을 'pt'로, 'zh-hant'를 'tw'로.
 *
 * 라우트와 번역 사전은 경로를 열쇠로 쓰고 이쪽 자료는 짧은 열쇠를 쓴다.
 * 두 세계가 만나는 곳에서 손으로 갈아 끼우면 한 곳이 남으므로 여기 한 번만 둔다.
 */
export const langOfLocale = (locale: string): Lang =>
  KEY_OF_PATH[locale === 'ko' ? '' : locale] ?? 'en';

/** 자료 열쇠를 경로형 로케일로 */
export const localeOfLang = (lang: Lang): AnyLocale10 => langInfo(lang).locale;

/**
 * hreflang 묶음 + x-default.
 *
 * 한쪽만 걸린 hreflang은 짝으로 인정되지 않으므로 모든 언어가 서로를 가리켜야 한다.
 * 손으로 적으면 언어를 더할 때 한 곳을 빼먹으므로 목록에서 만들어 낸다.
 * path는 언어 앞머리를 뺀 경로다 — "/metro/seoul-line-2", "/music/c-major".
 */
export const alternates = (path: string): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const l of LANGS) out[l.hreflang] = `${l.prefix}${path}`;
  out['x-default'] = `/en${path}`;
  return out;
};

/**
 * 번호가 붙은 것의 이름을 언어별로 만든다.
 *
 * "2호선"은 언어마다 형태가 정해져 있어 노선마다 열 벌을 적을 필요가 없다.
 */
const NUMBERED_LINE: L<(n: string) => string> = {
  ko: n => `${n}호선`,
  en: n => `Line ${n}`,
  es: n => `Línea ${n}`,
  pt: n => `Linha ${n}`,
  ja: n => `${n}号線`,
  de: n => `Linie ${n}`,
  fr: n => `Ligne ${n}`,
  hi: n => `लाइन ${n}`,
  zh: n => `${n}号线`,
  tw: n => `${n}號線`,
};

export const numberedLine = (n: string, lang: Lang): string => NUMBERED_LINE[lang](n);
