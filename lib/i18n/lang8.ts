// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import { LOCALES, type AnyLocale } from '../locales.ts';

/**
 * 여덟 언어 레지스트리 — 지하철·음악·색 이름 섹션이 이것을 쓴다.
 *
 * 2026-07-30부터 중국어를 걷어내고 각 나라의 언어를 넣는다. 포르투갈어는 브라질
 * 표기다(상파울루·리우 노선을 담았다). 경로도 /pt가 아니라 /pt-br로 두어 주소만
 * 봐도 어느 포르투갈어인지 알 수 있게 한다.
 *
 * 한때 여기에 목록을 손으로 적어 두었는데, lib/locales.ts에도 같은 목록이 있었다.
 * 두 세션이 각자 레지스트리를 세운 결과다. 목록이 두 벌이면 언어를 더하거나 뺄 때
 * 한 곳이 남고, 그 한 곳은 틀린 hreflang과 빈 화면으로만 드러난다 — 이 파일이
 * 막으려던 바로 그 일이다. 그래서 이제 목록은 lib/locales.ts에서만 나온다.
 *
 * 이 파일의 열쇠는 'pt'이고 locales.ts의 열쇠는 'pt-br'이다. 이름만 다르고 내보내는
 * 경로(/pt-br)와 hreflang(pt-BR)은 같다 — 쓰는 곳이 많아 열쇠를 바꾸는 대신 여기서
 * 옮긴다. tests/lang8.test.ts가 둘이 어긋나지 않는지 지켜본다.
 */
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

/** locales.ts의 경로 열쇠 → 이 파일의 열쇠 */
const KEY: Record<AnyLocale, Lang8> = {
  ko: 'ko', en: 'en', es: 'es', 'pt-br': 'pt', ja: 'ja', de: 'de', fr: 'fr', hi: 'hi',
};

export const LANGS8: Lang8Info[] = LOCALES.map(l => {
  const lang = KEY[(l.path || 'ko') as AnyLocale];
  return {
    lang,
    label: l.label,
    prefix: l.path ? `/${l.path}` : '',
    hreflang: l.tag,
    htmlLang: l.tag,
  };
});

export const LANG8_CODES: Lang8[] = LANGS8.map(l => l.lang);

/**
 * locales.ts의 열쇠를 이 파일의 열쇠로 옮긴다.
 *
 * 두 레지스트리를 함께 쓰는 화면(색상 허브가 도구와 색 이름을 같이 싣는다)에서
 * 필요하다. 'pt-br' → 'pt' 하나만 다르지만, 손으로 적으면 그 하나를 빼먹는다.
 */
export const toLang8 = (locale: AnyLocale): Lang8 => KEY[locale];

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
