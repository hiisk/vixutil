/**
 * 여덟 언어 레지스트리 — 새로 만드는 섹션이 모두 이것을 쓴다.
 *
 * 2026-07-30부터 중국어를 걷어내고 각 나라의 언어를 넣는다. 지하철 섹션에서
 * 처음 쓴 목록을 여기로 옮겼다 — 섹션마다 목록을 다시 적으면 언어를 더하거나
 * 뺄 때 한 곳이 남고, 그 한 곳은 조용히 틀린 hreflang과 빈 화면으로만 드러난다.
 *
 * 포르투갈어는 브라질 표기다(상파울루·리우 노선을 담았다). 경로도 /pt가 아니라
 * /pt-br로 두어 주소만 봐도 어느 포르투갈어인지 알 수 있게 한다.
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

export const LANGS8: Lang8Info[] = [
  { lang: 'ko', label: '한국어', prefix: '', hreflang: 'ko', htmlLang: 'ko' },
  { lang: 'en', label: 'English', prefix: '/en', hreflang: 'en', htmlLang: 'en' },
  { lang: 'es', label: 'Español', prefix: '/es', hreflang: 'es', htmlLang: 'es' },
  { lang: 'pt', label: 'Português', prefix: '/pt-br', hreflang: 'pt-BR', htmlLang: 'pt-BR' },
  { lang: 'ja', label: '日本語', prefix: '/ja', hreflang: 'ja', htmlLang: 'ja' },
  { lang: 'de', label: 'Deutsch', prefix: '/de', hreflang: 'de', htmlLang: 'de' },
  { lang: 'fr', label: 'Français', prefix: '/fr', hreflang: 'fr', htmlLang: 'fr' },
  { lang: 'hi', label: 'हिन्दी', prefix: '/hi', hreflang: 'hi', htmlLang: 'hi' },
];

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
