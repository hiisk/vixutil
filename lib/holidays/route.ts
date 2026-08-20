/**
 * 공휴일 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template.tsx';
import { alternates, langPrefix, localeOfLang, type Lang } from '../i18n/lang.ts';
import { withCard } from '../og-cards/index.ts';
import { prerender } from '../prerender.ts';
import { COUNTRIES, HOLIDAY_ICON, holidaySlug, parseSlug, yearsAround } from './countries.ts';
import { holidaysOf } from './engine.ts';
import { uiOf } from './ui-l10n.ts';

const FROM = '#0ea5e9';
const TO = '#0f172a';

/* 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = uiOf(localeOfLang(lang));
  return withCard({
    title: ui.hubTitle,
    description: ui.hubLede,
    alternates: { canonical: `${langPrefix(lang)}/holidays`, languages: alternates('/holidays') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { country, year } = parsed;
  const ui = uiOf(localeOfLang(lang));
  const name = ui.countries[country.code] ?? country.en;
  const path = `/holidays/${slug}`;
  return withCard({
    title: year ? ui.countryTitle(name, year) : ui.overviewTitle(name),
    description: year
      ? ui.countryDesc(name, year, holidaysOf(country.def, year).length)
      : ui.overviewDesc(name),
    alternates: { canonical: `${langPrefix(lang)}${path}`, languages: alternates(path) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = uiOf(localeOfLang(cardLang(lang)));
  return ogCard({ icon: HOLIDAY_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLede, from: FROM, to: TO });
}

export function detailCard(lang: Lang, slug: string): ReactElement | null {
  const parsed = parseSlug(slug);
  if (!parsed) return null;
  const { country, year } = parsed;
  const ui = uiOf(localeOfLang(cardLang(lang)));
  const name = ui.countries[country.code] ?? country.en;
  return ogCard({
    icon: HOLIDAY_ICON,
    eyebrow: country.nativeWord,
    title: year ? ui.countryTitle(name, year) : ui.overviewTitle(name),
    desc: year ? ui.count(holidaysOf(country.def, year).length, year) : ui.overviewDesc(name),
    from: FROM,
    to: TO,
  });
}

/**
 * 미리 구울 낱장.
 *
 * 빌드 시점의 «올해»를 박으면 배포한 해가 굳는다. 그래서 굽는 것은 나라
 * 개관 일곱뿐이고, 연도 낱장은 처음 열릴 때 만든다 — 어차피 prerender()가
 * 지금 0이라 목록이 비어도 같다. dynamicParams가 켜져 있어 다 열린다.
 */
export const holidayParams = () => prerender(COUNTRIES.map(c => ({ slug: c.code })));

/** 사이트맵이 쓰는 전체 주소 — 나라 개관 + 그 나라의 연도들 */
export function holidaySlugs(now: number): string[] {
  const years = yearsAround(now);
  return COUNTRIES.flatMap(c => [holidaySlug(c.code), ...years.map(y => holidaySlug(c.code, y))]);
}
