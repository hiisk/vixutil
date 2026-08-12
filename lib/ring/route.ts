/**
 * 반지 사이즈 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { RING_ICON, RING_SLUGS, cellOf } from './list.ts';
import { ringFacts } from './facts.ts';
import { RING_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#e11d48';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = RING_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/ring`, languages: alternates('/ring') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const mm = cellOf(slug);
  if (mm === undefined) return {};
  const ui = RING_UI[lang];
  const f = ringFacts(mm);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/ring/${slug}`, languages: alternates(`/ring/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = RING_UI[cardLang(lang)];
  return ogCard({ icon: RING_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const ringParams = () => prerender(RING_SLUGS.map(slug => ({ slug })));
