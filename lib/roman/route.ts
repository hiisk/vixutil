/**
 * 로마 숫자 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { ROMAN_ICON, ROMAN_SLUGS, yearOf } from './list.ts';
import { romanFacts } from './facts.ts';
import { ROMAN_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#b45309';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = ROMAN_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/roman`, languages: alternates('/roman') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const year = yearOf(slug);
  if (year === undefined) return {};
  const ui = ROMAN_UI[lang];
  const f = romanFacts(year);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/roman/${slug}`, languages: alternates(`/roman/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = ROMAN_UI[cardLang(lang)];
  return ogCard({ icon: ROMAN_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const romanParams = () => prerender(ROMAN_SLUGS.map(slug => ({ slug })));
