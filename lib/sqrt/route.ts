/**
 * 제곱근 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { SQRT_ICON, SQRT_SLUGS, numberOf } from './list.ts';
import { sqrtFacts } from './facts.ts';
import { SQRT_UI } from './ui.ts';

const FROM = '#4f46e5';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = SQRT_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/sqrt`, languages: alternates('/sqrt') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const n = numberOf(slug);
  if (n === undefined) return {};
  const ui = SQRT_UI[lang];
  const f = sqrtFacts(n);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/sqrt/${slug}`, languages: alternates(`/sqrt/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = SQRT_UI[cardLang(lang)];
  return ogCard({ icon: SQRT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const sqrtParams = () => SQRT_SLUGS.map(slug => ({ slug }));
