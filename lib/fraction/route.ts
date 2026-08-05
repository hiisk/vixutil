/**
 * 분수 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { FRACTIONS, FRACTION_ICON, fractionOf, slugOf } from './list.ts';
import { fractionFacts } from './facts.ts';
import { FRACTION_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#65a30d';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = FRACTION_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/fraction`, languages: alternates('/fraction') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const f = fractionOf(slug);
  if (!f) return {};
  const ui = FRACTION_UI[lang];
  const facts = fractionFacts(f);
  return withCard({
    title: ui.metaTitle(facts),
    description: ui.metaDesc(facts),
    alternates: {
      canonical: `${langPrefix(lang)}/fraction/${slug}`,
      languages: alternates(`/fraction/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = FRACTION_UI[cardLang(lang)];
  return ogCard({ icon: FRACTION_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const fractionParams = () => prerender(FRACTIONS.map(f => ({ slug: slugOf(f) })));
