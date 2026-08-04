/**
 * 정지거리 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { STOP_ICON, STOP_SLUGS, speedOf } from './list.ts';
import { stopFacts } from './facts.ts';
import { STOP_UI } from './ui.ts';

const FROM = '#b91c1c';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = STOP_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/stop`, languages: alternates('/stop') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const kmh = speedOf(slug);
  if (kmh === undefined) return {};
  const ui = STOP_UI[lang];
  const f = stopFacts(kmh);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/stop/${slug}`, languages: alternates(`/stop/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = STOP_UI[cardLang(lang)];
  return ogCard({ icon: STOP_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const stopParams = () => STOP_SLUGS.map(slug => ({ slug }));
