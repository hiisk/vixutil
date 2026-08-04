/**
 * 천체별 몸무게 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { GRAVITY_ICON, GRAVITY_SLUGS, weightOf } from './list.ts';
import { gravityFacts } from './facts.ts';
import { GRAVITY_UI } from './ui.ts';

const FROM = '#4338ca';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = GRAVITY_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/gravity`, languages: alternates('/gravity') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const kg = weightOf(slug);
  if (kg === undefined) return {};
  const ui = GRAVITY_UI[lang];
  const f = gravityFacts(kg);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/gravity/${slug}`, languages: alternates(`/gravity/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = GRAVITY_UI[cardLang(lang)];
  return ogCard({ icon: GRAVITY_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const gravityParams = () => GRAVITY_SLUGS.map(slug => ({ slug }));
