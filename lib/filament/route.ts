/**
 * 필라멘트 길이 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { FILAMENT_ICON, FILAMENT_SLUGS, cellOf } from './list.ts';
import { filamentFacts } from './facts.ts';
import { FILAMENT_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#7c3aed';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = FILAMENT_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/filament`, languages: alternates('/filament') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = FILAMENT_UI[lang];
  const f = filamentFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/filament/${slug}`, languages: alternates(`/filament/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = FILAMENT_UI[cardLang(lang)];
  return ogCard({ icon: FILAMENT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const filamentParams = () => prerender(FILAMENT_SLUGS.map(slug => ({ slug })));
