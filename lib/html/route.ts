/**
 * HTML 태그 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { TAGS, TAG_ICON, tagOf } from './tags.ts';
import { tagFacts } from './facts.ts';
import { tagDesc } from './desc.ts';
import { HTML_UI } from './ui.ts';

const FROM = '#f97316';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export { tagDesc };

export function hubMetadata(lang: Lang8): Metadata {
  const ui = HTML_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/html`, languages: alternates8('/html') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const t = tagOf(slug);
  if (!t) return {};
  const ui = HTML_UI[lang];
  return {
    title: `${ui.metaTitle(t.name)} — ${ui.section}`,
    description: ui.metaDesc(t.name, tagDesc(t.name, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/html/${slug}`,
      languages: alternates8(`/html/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = HTML_UI[cardLang(lang)];
  return ogCard({ icon: TAG_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function tagCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = HTML_UI[card];
  const t = tagOf(slug);
  if (!t) return hubCard(card);
  const f = tagFacts(t);
  return ogCard({
    icon: TAG_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[t.kind]}`,
    title: `<${t.name}>`,
    desc: tagDesc(t.name, card),
    from: FROM,
    to: TO,
  });
}

export const tagParams = () => TAGS.map(t => ({ slug: t.name }));
