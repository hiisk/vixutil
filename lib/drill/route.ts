/**
 * 드릴 비트 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { DRILL_ICON, DRILL_SLUGS, bitOf } from './list.ts';
import { drillFacts } from './facts.ts';
import { DRILL_UI } from './ui.ts';

const FROM = '#525252';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = DRILL_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/drill`, languages: alternates('/drill') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const b = bitOf(slug);
  if (!b) return {};
  const ui = DRILL_UI[lang];
  const f = drillFacts(b);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/drill/${slug}`, languages: alternates(`/drill/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = DRILL_UI[cardLang(lang)];
  return ogCard({ icon: DRILL_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const drillParams = () => DRILL_SLUGS.map(slug => ({ slug }));
