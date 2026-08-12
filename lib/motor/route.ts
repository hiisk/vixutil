/**
 * 모터 토크 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { MOTOR_ICON, MOTOR_SLUGS, cellOf } from './list.ts';
import { motorFacts } from './facts.ts';
import { MOTOR_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#4338ca';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = MOTOR_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/motor`, languages: alternates('/motor') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = MOTOR_UI[lang];
  const f = motorFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/motor/${slug}`, languages: alternates(`/motor/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = MOTOR_UI[cardLang(lang)];
  return ogCard({ icon: MOTOR_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const motorParams = () => prerender(MOTOR_SLUGS.map(slug => ({ slug })));
