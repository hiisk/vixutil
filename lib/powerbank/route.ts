/**
 * 보조배터리 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { POWERBANK_ICON, POWERBANK_SLUGS, cellOf } from './list.ts';
import { powerFacts } from './facts.ts';
import { POWERBANK_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0d9488';
const TO = '#111827';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = POWERBANK_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/powerbank`, languages: alternates('/powerbank') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = POWERBANK_UI[lang];
  const f = powerFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/powerbank/${slug}`, languages: alternates(`/powerbank/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = POWERBANK_UI[cardLang(lang)];
  return ogCard({ icon: POWERBANK_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const powerbankParams = () => prerender(POWERBANK_SLUGS.map(slug => ({ slug })));
