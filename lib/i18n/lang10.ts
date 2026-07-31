/**
 * 열 언어 열쇠 — 여덟 언어(lang8)에 중국어 간체·번체를 더한 층.
 *
 * lang8.ts를 고치지 않고 옆에 두는 이유: 이미 수백 개 자료 파일이 `L8<T>`로
 * 여덟 칸을 채워 두었다. 열쇠를 열 개로 늘리면 그 파일이 전부 타입 오류가 나고,
 * 오류를 피하려고 빈 칸을 넣으면 그 언어에서 글자가 사라진 페이지가 조용히 나간다.
 * 그래서 열 언어를 갖춘 섹션만 이 층을 쓰고, 옮겨 온 섹션이 늘어나면 마지막에
 * 둘을 합친다.
 *
 * 열쇠는 두 글자다 — 간체는 zh, 번체는 tw. 주소는 /zh-hans, /zh-hant이고
 * hreflang은 zh-Hans, zh-Hant다. 셋이 다른 표기인 것은 pt(=/pt-br=pt-BR)와 같다.
 */
import { LOCALES, NEXT_LOCALES, type AnyLocale10 } from '../locales.ts';
import type { Lang8 } from './lang8.ts';

export type Lang10 = Lang8 | 'zh' | 'tw';

/** 열 언어를 다 채워야 하는 값 */
export type L10<T> = Record<Lang10, T>;

export interface Lang10Info {
  lang: Lang10;
  /** 그 언어로 적은 언어 이름 */
  label: string;
  /** 경로 앞머리. 한국어는 없다 */
  prefix: string;
  /** hreflang·<html lang> 값 */
  hreflang: string;
  /** 경로형 로케일 — LangPicker·sitemap이 쓰는 값 */
  locale: AnyLocale10;
}

/** 경로 → 데이터 열쇠. 언어를 더하면 여기도 한 줄 는다 */
const KEY_OF_PATH: Record<string, Lang10> = {
  '': 'ko', en: 'en', es: 'es', 'pt-br': 'pt', ja: 'ja', de: 'de', fr: 'fr', hi: 'hi',
  'zh-hans': 'zh', 'zh-hant': 'tw',
};

export const LANGS10: Lang10Info[] = [...LOCALES, ...NEXT_LOCALES].map(l => ({
  lang: KEY_OF_PATH[l.path],
  label: l.label,
  prefix: l.path === '' ? '' : `/${l.path}`,
  hreflang: l.tag,
  locale: (l.path === '' ? 'ko' : l.path) as AnyLocale10,
}));

export const LANG10_CODES: Lang10[] = LANGS10.map(l => l.lang);

/** 이 섹션이 있는 언어 목록 — LangPicker에 그대로 넘긴다 */
export const LOCALES10: AnyLocale10[] = LANGS10.map(l => l.locale);

export const lang10Info = (lang: Lang10): Lang10Info =>
  LANGS10.find(l => l.lang === lang) ?? LANGS10[0];

export const prefix10 = (lang: Lang10): string => lang10Info(lang).prefix;

/** 경로형 로케일을 데이터 열쇠로 — 'pt-br'을 'pt'로, 'zh-hant'를 'tw'로 */
export const lang10OfLocale = (locale: string): Lang10 =>
  KEY_OF_PATH[locale === 'ko' ? '' : locale] ?? 'en';

/** 데이터 열쇠를 경로형 로케일로 */
export const localeOfLang10 = (lang: Lang10): AnyLocale10 => lang10Info(lang).locale;

/**
 * 열 언어를 서로 가리키는 hreflang 묶음.
 *
 * 한쪽만 걸린 hreflang은 짝으로 인정되지 않으므로 열 언어가 모두 서로를
 * 가리켜야 한다. x-default는 영어다.
 */
export function alternates10(route: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LANGS10) out[l.hreflang] = `${l.prefix}${route}`;
  out['x-default'] = `/en${route}`;
  return out;
}
