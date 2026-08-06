/**
 * 전자레인지 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { MICROWAVE_ICON, MICROWAVE_SLUGS, cellOf } from './list.ts';
import { microwaveFacts } from './facts.ts';
import { MICROWAVE_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#c2410c';
const TO = '#111827';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = MICROWAVE_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/microwave`, languages: alternates('/microwave') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = MICROWAVE_UI[lang];
  const f = microwaveFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/microwave/${slug}`, languages: alternates(`/microwave/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = MICROWAVE_UI[cardLang(lang)];
  return ogCard({ icon: MICROWAVE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const microwaveParams = () => prerender(MICROWAVE_SLUGS.map(slug => ({ slug })));
