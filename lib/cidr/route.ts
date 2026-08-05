/**
 * 프리픽스 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { CIDR_ICON, PREFIXES, prefixOf, slugOf } from './list.ts';
import { cidrFacts } from './facts.ts';
import { CIDR_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0891b2';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = CIDR_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/cidr`, languages: alternates('/cidr') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const p = prefixOf(slug);
  if (!p) return {};
  const ui = CIDR_UI[lang];
  const f = cidrFacts(p);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/cidr/${slug}`,
      languages: alternates(`/cidr/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = CIDR_UI[cardLang(lang)];
  return ogCard({ icon: CIDR_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const cidrParams = () => prerender(PREFIXES.map(p => ({ slug: slugOf(p) })));
