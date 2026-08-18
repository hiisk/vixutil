/**
 * 퍼센트 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { PERCENT_ICON, PERCENT_SLUGS, parsePercentSlug } from './list.ts';
import { percentFacts } from './facts.ts';
import { PERCENT_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0ea5e9';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = PERCENT_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/percent`, languages: alternates('/percent') },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = PERCENT_UI[cardLang(lang)];
  return ogCard({ icon: PERCENT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function percentCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = PERCENT_UI[card];
  const c = parsePercentSlug(slug);
  if (!c) return hubCard(lang);
  const f = percentFacts(c.percent, c.base);
  return ogCard({
    icon: PERCENT_ICON,
    eyebrow: `${ui.section} · ${f.percent}%`,
    title: ui.metaTitle(f),
    desc: ui.offNote(f),
    from: FROM,
    to: TO,
  });
}

export const percentParams = () => prerender(PERCENT_SLUGS.map(slug => ({ slug })));
