/**
 * 도시 사이 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 *
 * 제목의 도시 이름은 cities.ts에서 꺼내 여기서 붙인다. ui.ts에는 도시 이름이
 * 한 줄도 없어야 열아홉 도시를 열 언어로 두 번 적는 일이 안 생긴다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { FLIGHT_ICON, FLIGHT_SLUGS, cellOf, nameOf } from './list.ts';
import { flightFacts } from './facts.ts';
import { FLIGHT_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#1e3a8a';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

/** '서울 → 뉴욕' — 낱장 제목과 breadcrumb이 함께 쓴다 */
export const pairText = (lang: Lang, from: string, to: string): string =>
  `${nameOf(lang, from)} → ${nameOf(lang, to)}`;

export function hubMetadata(lang: Lang): Metadata {
  const ui = FLIGHT_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/flight`, languages: alternates('/flight') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = FLIGHT_UI[lang];
  const f = flightFacts(c);
  return withCard({
    title: `${pairText(lang, c.from, c.to)} — ${ui.metaTitle(f)}`,
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/flight/${slug}`, languages: alternates(`/flight/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = FLIGHT_UI[cardLang(lang)];
  return ogCard({ icon: FLIGHT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const flightParams = () => prerender(FLIGHT_SLUGS.map(slug => ({ slug })));
