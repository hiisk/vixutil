/**
 * 연도 사전 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { YEAR_ICON, YEAR_SLUGS, yearOf } from './list.ts';
import { yearFacts } from './facts.ts';
import { YEAR_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#be123c';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = YEAR_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/year`, languages: alternates('/year') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const y = yearOf(slug);
  if (y === undefined) return {};
  const ui = YEAR_UI[lang];
  const f = yearFacts(y);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/year/${slug}`, languages: alternates(`/year/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = YEAR_UI[cardLang(lang)];
  return ogCard({ icon: YEAR_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const yearParams = () => prerender(YEAR_SLUGS.map(slug => ({ slug })));
