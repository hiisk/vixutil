/**
 * CSS 속성 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { CSS_PROPS, CSS_ICON, cssPropOf } from './props.ts';
import { propFacts } from './facts.ts';
import { propDesc } from './desc.ts';
import { CSS_UI } from './ui.ts';

const FROM = '#2563eb';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = CSS_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/css`, languages: alternates8('/css') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const p = cssPropOf(slug);
  if (!p) return {};
  const ui = CSS_UI[lang];
  return {
    title: `${ui.metaTitle(p.name)} — ${ui.section}`,
    description: ui.metaDesc(p.name, propDesc(p.name, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/css/${slug}`,
      languages: alternates8(`/css/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = CSS_UI[cardLang(lang)];
  return ogCard({ icon: CSS_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function propCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = CSS_UI[card];
  const p = cssPropOf(slug);
  if (!p) return hubCard(card);
  const f = propFacts(p);
  return ogCard({
    icon: CSS_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[p.kind]}`,
    title: p.name,
    desc: propDesc(p.name, card),
    from: FROM,
    to: TO,
  });
}

export const propParams = () => CSS_PROPS.map(p => ({ slug: p.name }));
