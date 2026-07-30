/**
 * 사이트가 내보내는 언어 목록. 언어를 늘리거나 줄일 때 여기만 고친다.
 *
 * URL 경로는 전부 소문자다 — 브라우저는 경로의 대소문자를 구분하므로 /pt-BR과
 * /pt-br이 서로 다른 주소가 된다. 한쪽으로 정해 두지 않으면 링크와 색인이
 * 갈라지고, 나중에 바꾸면 그때까지 쌓인 것이 전부 깨진다.
 *
 * 반면 hreflang과 <html lang>은 BCP 47 표기를 쓴다. pt-BR처럼 지역까지 밝히면
 * 브라질 검색에 더 정확히 잡히고, 경로(pt-br)와 선언(pt-BR)이 달라도 문제없다.
 *
 * og:locale은 또 다른 표기다(밑줄, 지역 필수). 페이스북·링크드인·슬랙이 미리보기를
 * 어느 언어로 그릴지 여기서 읽는다. 한때 app/layout.tsx의 ko_KR 하나가 여덟 언어
 * 페이지에 전부 실려서, 스페인어 글을 공유하면 한국어 미리보기가 떴다.
 */
export const LOCALES = [
  { path: '',       tag: 'ko',    og: 'ko_KR', label: '한국어',   english: 'Korean' },
  { path: 'en',     tag: 'en',    og: 'en_US', label: 'English',  english: 'English' },
  { path: 'es',     tag: 'es',    og: 'es_ES', label: 'Español',  english: 'Spanish' },
  { path: 'pt-br',  tag: 'pt-BR', og: 'pt_BR', label: 'Português', english: 'Portuguese (Brazil)' },
  { path: 'ja',     tag: 'ja',    og: 'ja_JP', label: '日本語',    english: 'Japanese' },
  { path: 'de',     tag: 'de',    og: 'de_DE', label: 'Deutsch',  english: 'German' },
  { path: 'fr',     tag: 'fr',    og: 'fr_FR', label: 'Français', english: 'French' },
  { path: 'hi',     tag: 'hi',    og: 'hi_IN', label: 'हिन्दी',      english: 'Hindi' },
] as const;

export type LocalePath = typeof LOCALES[number]['path'];
export type LocaleTag = typeof LOCALES[number]['tag'];

/**
 * 한국어가 아닌 언어들.
 *
 * 한국어는 원본이라 문구가 컴포넌트나 데이터에 그대로 있는 경우가 많고, 번역
 * 사전은 그 나머지만 담는 편이 자연스럽다. 반대로 한국어까지 사전에 넣은 곳도
 * 있어서(예: 요리·게임) 두 타입을 함께 둔다.
 */
export const INTL_LOCALES = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi'] as const;
export type IntlLocale = typeof INTL_LOCALES[number];

/** 한국어까지 포함 */
export const ALL_LOCALES = ['ko', ...INTL_LOCALES] as const;
export type AnyLocale = typeof ALL_LOCALES[number];

const BY_PATH: Record<string, typeof LOCALES[number]> = Object.fromEntries(
  LOCALES.map(l => [l.path || 'ko', l]),
);

/** hreflang·<html lang>에 쓰는 BCP 47 표기 */
export function localeTag(locale: AnyLocale): string {
  return BY_PATH[locale]?.tag ?? locale;
}

/**
 * metadata.openGraph에 그대로 넣을 값.
 *
 * openGraph를 페이지에서 선언하면 app/layout.tsx의 것이 통째로 대체된다. 그래서
 * locale만 바꿀 수 없고 type·siteName까지 같이 적어야 한다 — 빠뜨리면 미리보기에
 * 사이트 이름이 사라진다.
 */
export function openGraphFor(locale: AnyLocale) {
  return {
    type: 'website' as const,
    siteName: 'vixutil',
    locale: BY_PATH[locale]?.og ?? 'ko_KR',
  };
}

/** 언어 전환 링크에 쓰는 그 언어의 자기 이름 */
export function localeLabel(locale: AnyLocale): string {
  return BY_PATH[locale]?.label ?? locale;
}

/** 경로 앞에 붙는 부분. 한국어는 접두어가 없다. */
export function localePrefix(locale: AnyLocale): string {
  return locale === 'ko' ? '' : `/${locale}`;
}

/** 어떤 라우트의 그 언어 주소 */
export function localeHref(locale: AnyLocale, route: string): string {
  const r = route === '/' ? '' : route;
  return `${localePrefix(locale)}${r}` || '/';
}

/**
 * metadata.alternates.languages에 넣을 표. 여덟 언어를 모두 담는다.
 *
 * 한쪽 방향만 걸린 hreflang은 구글이 짝으로 인정하지 않으므로, 모든 언어가
 * 서로를 가리켜야 한다. x-default는 영어로 둔다 — 목록에 없는 언어로 들어온
 * 사람에게 가장 넓게 통한다.
 */
export function alternateLanguages(route: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of ALL_LOCALES) out[localeTag(l)] = localeHref(l, route);
  out['x-default'] = localeHref('en', route);
  return out;
}

/**
 * 일부 언어에만 있는 페이지의 hreflang.
 *
 * 체크리스트·퀴즈처럼 언어별로 내용을 따로 쓴 섹션은 항목이 다 있지 않다.
 * 없는 페이지를 대안으로 선언하면 구글이 404를 받는다.
 */
export function alternateLanguagesFor(route: string, locales: AnyLocale[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[localeTag(l)] = localeHref(l, route);
  if (locales.includes('en')) out['x-default'] = localeHref('en', route);
  else if (locales.includes('ko')) out['x-default'] = localeHref('ko', route);
  return out;
}
