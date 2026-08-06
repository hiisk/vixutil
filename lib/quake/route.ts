/**
 * 지진 규모 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { QUAKE_ICON, QUAKE_SLUGS, magnitudeOf } from './list.ts';
import { quakeFacts } from './facts.ts';
import { QUAKE_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#9f1239';
const TO = '#111827';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = QUAKE_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/quake`, languages: alternates('/quake') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const m = magnitudeOf(slug);
  if (m === undefined) return {};
  const ui = QUAKE_UI[lang];
  const f = quakeFacts(m);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/quake/${slug}`, languages: alternates(`/quake/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = QUAKE_UI[cardLang(lang)];
  return ogCard({ icon: QUAKE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const quakeParams = () => prerender(QUAKE_SLUGS.map(slug => ({ slug })));
