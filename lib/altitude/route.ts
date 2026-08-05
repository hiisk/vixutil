/**
 * 고도 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { ALTITUDE_ICON, ALTITUDE_SLUGS, altitudeOf } from './list.ts';
import { altitudeFacts } from './facts.ts';
import { ALTITUDE_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#0e7490';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = ALTITUDE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/altitude`, languages: alternates('/altitude') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const m = altitudeOf(slug);
  if (m === undefined) return {};
  const ui = ALTITUDE_UI[lang];
  const f = altitudeFacts(m);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/altitude/${slug}`, languages: alternates(`/altitude/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = ALTITUDE_UI[cardLang(lang)];
  return ogCard({ icon: ALTITUDE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const altitudeParams = () => prerender(ALTITUDE_SLUGS.map(slug => ({ slug })));
