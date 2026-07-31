/**
 * 원소 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { ELEMENTS, ELEMENT_ICON, elementOf } from './list.ts';
import { elementFacts } from './facts.ts';
import { nameOf } from './names.ts';
import { ELEMENT_UI } from './ui.ts';

const FROM = '#0891b2';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = ELEMENT_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/element`, languages: alternates('/element') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = elementOf(slug);
  if (!x) return {};
  const ui = ELEMENT_UI[lang];
  const f = elementFacts(x);
  const name = nameOf(x.z, lang);
  return {
    title: `${ui.metaTitle(name, x.symbol, x.z)} — ${ui.section}`,
    description: ui.metaDesc(f, name, ui.categoryLabel[f.category]),
    alternates: {
      canonical: `${langPrefix(lang)}/element/${slug}`,
      languages: alternates(`/element/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = ELEMENT_UI[cardLang(lang)];
  return ogCard({ icon: ELEMENT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function elementCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = ELEMENT_UI[card];
  const x = elementOf(slug);
  if (!x) return hubCard(card);
  const f = elementFacts(x);
  const name = nameOf(x.z, card);
  return ogCard({
    icon: ELEMENT_ICON,
    eyebrow: `${ui.section} · ${ui.categoryLabel[f.category]}`,
    title: `${x.symbol} · ${name}`,
    desc: ui.desc(f, name),
    from: FROM,
    to: TO,
  });
}

export const elementParams = () => ELEMENTS.map(x => ({ slug: String(x.z) }));
