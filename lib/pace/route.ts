/**
 * 러닝 페이스 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { PACE_ICON, PACE_SLUGS, paceOf } from './list.ts';
import { paceFacts } from './facts.ts';
import { PACE_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0f766e';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = PACE_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/pace`, languages: alternates('/pace') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const sec = paceOf(slug);
  if (sec === undefined) return {};
  const ui = PACE_UI[lang];
  const f = paceFacts(sec);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/pace/${slug}`, languages: alternates(`/pace/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = PACE_UI[cardLang(lang)];
  return ogCard({ icon: PACE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const paceParams = () => prerender(PACE_SLUGS.map(slug => ({ slug })));
