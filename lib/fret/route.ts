/**
 * 기타 지판 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { FRET_ICON, FRET_SLUGS, spotOf } from './list.ts';
import { fretFacts, nameOf } from './facts.ts';
import { FRET_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#a16207';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = FRET_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/fret`, languages: alternates('/fret') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const p = spotOf(slug);
  if (!p) return {};
  const ui = FRET_UI[lang];
  const f = fretFacts(p);
  const note = nameOf(p, lang);
  return withCard({
    title: ui.metaTitle(f, note),
    description: ui.metaDesc(f, note),
    alternates: { canonical: `${langPrefix(lang)}/fret/${slug}`, languages: alternates(`/fret/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = FRET_UI[cardLang(lang)];
  return ogCard({ icon: FRET_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const fretParams = () => prerender(FRET_SLUGS.map(slug => ({ slug })));
