/**
 * 골프 핸디캡 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { GOLF_ICON, GOLF_SLUGS, cellOf } from './list.ts';
import { golfFacts } from './facts.ts';
import { GOLF_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#166534';
const TO = '#111827';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = GOLF_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/golf`, languages: alternates('/golf') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = GOLF_UI[lang];
  const f = golfFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/golf/${slug}`, languages: alternates(`/golf/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = GOLF_UI[cardLang(lang)];
  return ogCard({ icon: GOLF_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const golfParams = () => prerender(GOLF_SLUGS.map(slug => ({ slug })));
