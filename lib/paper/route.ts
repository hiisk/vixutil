/**
 * 종이 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { PAPER_ICON, PAPER_SLUGS, cellOf } from './list.ts';
import { paperFacts } from './facts.ts';
import { PAPER_UI } from './ui.ts';

const FROM = '#475569';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = PAPER_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/paper`, languages: alternates('/paper') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = PAPER_UI[lang];
  const f = paperFacts(c);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/paper/${slug}`, languages: alternates(`/paper/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = PAPER_UI[cardLang(lang)];
  return ogCard({ icon: PAPER_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const paperParams = () => PAPER_SLUGS.map(slug => ({ slug }));
