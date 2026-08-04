/**
 * 나사 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { SCREW_ICON, SCREW_SLUGS, screwOf } from './list.ts';
import { screwFacts } from './facts.ts';
import { SCREW_UI } from './ui.ts';

const FROM = '#475569';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = SCREW_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/screw`, languages: alternates('/screw') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const s = screwOf(slug);
  if (!s) return {};
  const ui = SCREW_UI[lang];
  const f = screwFacts(s);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/screw/${slug}`, languages: alternates(`/screw/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = SCREW_UI[cardLang(lang)];
  return ogCard({ icon: SCREW_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const screwParams = () => SCREW_SLUGS.map(slug => ({ slug }));
