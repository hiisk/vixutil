/**
 * 수 사전 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { NUMBERS, NUMBER_ICON, numberOf } from './list.ts';
import { numberFacts } from './facts.ts';
import { NUMBER_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#4f46e5';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = NUMBER_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/number`, languages: alternates('/number') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const n = numberOf(slug);
  if (!n) return {};
  const ui = NUMBER_UI[lang];
  return withCard({
    title: ui.metaTitle(n),
    description: ui.metaDesc(numberFacts(n)),
    alternates: {
      canonical: `${langPrefix(lang)}/number/${n}`,
      languages: alternates(`/number/${n}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = NUMBER_UI[cardLang(lang)];
  return ogCard({ icon: NUMBER_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const numberParams = () => prerender(NUMBERS.map(n => ({ slug: String(n) })));
