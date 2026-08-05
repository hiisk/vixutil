/**
 * 다운로드 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { BANDWIDTH_ICON, BANDWIDTH_SLUGS, cellOf } from './list.ts';
import { bandwidthFacts } from './facts.ts';
import { BANDWIDTH_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#0284c7';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = BANDWIDTH_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/bandwidth`, languages: alternates('/bandwidth') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = BANDWIDTH_UI[lang];
  const f = bandwidthFacts(c);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/bandwidth/${slug}`, languages: alternates(`/bandwidth/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = BANDWIDTH_UI[cardLang(lang)];
  return ogCard({ icon: BANDWIDTH_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const bandwidthParams = () => prerender(BANDWIDTH_SLUGS.map(slug => ({ slug })));
