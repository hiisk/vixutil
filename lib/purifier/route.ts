/**
 * 공기청정기 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { PURIFIER_ICON, PURIFIER_SLUGS, cellOf } from './list.ts';
import { purifierFacts } from './facts.ts';
import { PURIFIER_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0e7490';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = PURIFIER_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/purifier`, languages: alternates('/purifier') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = PURIFIER_UI[lang];
  const f = purifierFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/purifier/${slug}`, languages: alternates(`/purifier/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = PURIFIER_UI[cardLang(lang)];
  return ogCard({ icon: PURIFIER_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const purifierParams = () => prerender(PURIFIER_SLUGS.map(slug => ({ slug })));
