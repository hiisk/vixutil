/**
 * 저항 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { RESISTOR_ICON, VALUES, valueOf } from './list.ts';
import { resistorFacts } from './facts.ts';
import { RESISTOR_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#f59e0b';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = RESISTOR_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/resistor`, languages: alternates('/resistor') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const ohms = valueOf(slug);
  if (!ohms) return {};
  const ui = RESISTOR_UI[lang];
  const f = resistorFacts(ohms);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/resistor/${ohms}`,
      languages: alternates(`/resistor/${ohms}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = RESISTOR_UI[cardLang(lang)];
  return ogCard({ icon: RESISTOR_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const resistorParams = () => prerender(VALUES.map(v => ({ slug: String(v) })));
