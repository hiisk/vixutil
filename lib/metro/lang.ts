/**
 * 지하철 섹션의 언어 — 여덟 개.
 *
 * 사이트의 다른 섹션은 ko·en·zh 셋을 쓰지만, 이 섹션부터는 중국어를 빼고
 * 각 나라의 언어를 넣는다. 노선을 담은 도시가 서울·도쿄·런던·파리·베를린·
 * 마드리드·상파울루·뭄바이로 퍼져 있으므로, 그 도시 사람이 자기 언어로
 * 자기 노선을 풀 수 있어야 이 게임이 뜻을 가진다.
 *
 * 포르투갈어는 브라질 표기(pt-BR)를 쓴다. 경로는 /pt로 짧게 두고 hreflang만
 * pt-BR로 낸다 — 상파울루·리우 노선을 담았으니 유럽 포르투갈어가 아니다.
 */
export type MetroLang = 'ko' | 'en' | 'es' | 'pt' | 'ja' | 'de' | 'fr' | 'hi';

/** 여덟 언어를 다 채워야 하는 값 */
export type L8<T> = Record<MetroLang, T>;

export interface MetroLangInfo {
  lang: MetroLang;
  /** 화면의 언어 전환에 보이는 이름 — 그 언어로 적는다 */
  label: string;
  /** 경로 앞머리. 한국어는 없다 */
  prefix: string;
  /** hreflang 값 — 경로와 다를 수 있다 */
  hreflang: string;
  /** <html lang> 값 */
  htmlLang: string;
}

export const METRO_LANGS: MetroLangInfo[] = [
  { lang: 'ko', label: '한국어', prefix: '', hreflang: 'ko', htmlLang: 'ko' },
  { lang: 'en', label: 'English', prefix: '/en', hreflang: 'en', htmlLang: 'en' },
  { lang: 'es', label: 'Español', prefix: '/es', hreflang: 'es', htmlLang: 'es' },
  { lang: 'pt', label: 'Português', prefix: '/pt', hreflang: 'pt-BR', htmlLang: 'pt-BR' },
  { lang: 'ja', label: '日本語', prefix: '/ja', hreflang: 'ja', htmlLang: 'ja' },
  { lang: 'de', label: 'Deutsch', prefix: '/de', hreflang: 'de', htmlLang: 'de' },
  { lang: 'fr', label: 'Français', prefix: '/fr', hreflang: 'fr', htmlLang: 'fr' },
  { lang: 'hi', label: 'हिन्दी', prefix: '/hi', hreflang: 'hi', htmlLang: 'hi' },
];

export const METRO_LANG_CODES: MetroLang[] = METRO_LANGS.map(l => l.lang);

export const langInfo = (lang: MetroLang): MetroLangInfo =>
  METRO_LANGS.find(l => l.lang === lang) ?? METRO_LANGS[0];

export const metroPrefix = (lang: MetroLang): string => langInfo(lang).prefix;

/**
 * hreflang 묶음 — 여덟 줄 + x-default.
 *
 * 손으로 적으면 언어를 더할 때 한 곳을 빼먹는다. 목록에서 만들어 낸다.
 */
export function metroAlternates(slug?: string): Record<string, string> {
  const path = slug ? `/metro/${slug}` : '/metro';
  const out: Record<string, string> = {};
  for (const l of METRO_LANGS) out[l.hreflang] = `${l.prefix}${path}`;
  out['x-default'] = `/en${path}`;
  return out;
}

/**
 * 번호가 붙은 노선의 이름을 언어별로 만든다.
 *
 * "2호선"은 언어마다 형태가 정해져 있어 노선마다 여덟 벌을 적을 필요가 없다.
 * 번호가 아닌 이름(Victoria line, 山手線)은 label로 따로 준다.
 */
const NUMBERED: L8<(n: string) => string> = {
  ko: n => `${n}호선`,
  en: n => `Line ${n}`,
  es: n => `Línea ${n}`,
  pt: n => `Linha ${n}`,
  ja: n => `${n}号線`,
  de: n => `Linie ${n}`,
  fr: n => `Ligne ${n}`,
  hi: n => `लाइन ${n}`,
};

export const numberedLine = (n: string, lang: MetroLang): string => NUMBERED[lang](n);
