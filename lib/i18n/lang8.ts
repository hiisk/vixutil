/**
 * 여덟 언어를 데이터 열쇠로 쓰기 위한 얇은 층 — 목록 자체는 lib/locales.ts가 갖는다.
 *
 * 언어를 늘리거나 줄이는 곳은 lib/locales.ts 한 곳이다. 여기서 그 목록을 그대로
 * 받아 쓰고, 데이터 파일이 쓸 짧은 열쇠(ko·en·es·pt·ja·de·fr·hi)만 붙인다.
 *
 * 열쇠를 경로와 따로 두는 이유: 경로는 pt-br이지만 데이터 파일 수백 곳이
 * `pt:`를 열쇠로 쓴다. 열쇠에 하이픈이 들어가면 `'pt-br':`처럼 따옴표를 늘 붙여야
 * 하고, 이미 쓰인 곳을 전부 고쳐야 한다. 그래서 열쇠는 짧게 두고 주소·hreflang·
 * 이름은 레지스트리에서 가져온다. 둘이 어긋나지 않는지는 검사로 지킨다.
 */
import { LOCALES } from '../locales.ts';

export type Lang8 = 'ko' | 'en' | 'es' | 'pt' | 'ja' | 'de' | 'fr' | 'hi';

/** 여덟 언어를 다 채워야 하는 값 */
export type L8<T> = Record<Lang8, T>;

export interface Lang8Info {
  lang: Lang8;
  /** 화면의 언어 전환에 보이는 이름 — 그 언어로 적는다 */
  label: string;
  /** 경로 앞머리. 한국어는 없다 */
  prefix: string;
  /** hreflang 값 — 경로와 다를 수 있다 */
  hreflang: string;
  /** <html lang> 값 */
  htmlLang: string;
}

/**
 * 경로 → 데이터 열쇠. 레지스트리에 언어를 더하면 여기도 한 줄 늘어난다.
 * 빠뜨리면 tests/lang8-registry.test.ts가 잡는다.
 */
const KEY_OF_PATH: Record<string, Lang8> = {
  '': 'ko', en: 'en', es: 'es', 'pt-br': 'pt', ja: 'ja', de: 'de', fr: 'fr', hi: 'hi',
};

export const LANGS8: Lang8Info[] = LOCALES.map(l => ({
  lang: KEY_OF_PATH[l.path],
  label: l.label,
  prefix: l.path === '' ? '' : `/${l.path}`,
  hreflang: l.tag,
  htmlLang: l.tag,
}));

export const LANG8_CODES: Lang8[] = LANGS8.map(l => l.lang);

export const lang8Info = (lang: Lang8): Lang8Info =>
  LANGS8.find(l => l.lang === lang) ?? LANGS8[0];

export const prefix8 = (lang: Lang8): string => lang8Info(lang).prefix;

/**
 * hreflang 묶음 — 여덟 줄 + x-default.
 *
 * 손으로 적으면 언어를 더할 때 한 곳을 빼먹는다. 목록에서 만들어 낸다.
 * path는 언어 앞머리를 뺀 경로다 — "/metro/seoul-line-2", "/music/c-major".
 */
export function alternates8(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LANGS8) out[l.hreflang] = `${l.prefix}${path}`;
  out['x-default'] = `/en${path}`;
  return out;
}

/**
 * 번호가 붙은 것의 이름을 언어별로 만든다.
 *
 * "2호선"은 언어마다 형태가 정해져 있어 노선마다 여덟 벌을 적을 필요가 없다.
 */
const NUMBERED_LINE: L8<(n: string) => string> = {
  ko: n => `${n}호선`,
  en: n => `Line ${n}`,
  es: n => `Línea ${n}`,
  pt: n => `Linha ${n}`,
  ja: n => `${n}号線`,
  de: n => `Linie ${n}`,
  fr: n => `Ligne ${n}`,
  hi: n => `लाइन ${n}`,
};

export const numberedLine8 = (n: string, lang: Lang8): string => NUMBERED_LINE[lang](n);
