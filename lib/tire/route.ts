/**
 * 타이어 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { TIRE_ICON, TIRE_SLUGS, tireOf } from './list.ts';
import { tireFacts } from './facts.ts';
import { TIRE_UI } from './ui.ts';

const FROM = '#334155';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = TIRE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/tire`, languages: alternates('/tire') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const t = tireOf(slug);
  if (!t) return {};
  const ui = TIRE_UI[lang];
  const f = tireFacts(t);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/tire/${slug}`, languages: alternates(`/tire/${slug}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = TIRE_UI[cardLang(lang)];
  return ogCard({ icon: TIRE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const tireParams = () => TIRE_SLUGS.map(slug => ({ slug }));
