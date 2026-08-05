/**
 * HTML 태그 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { TAGS, TAG_ICON, tagOf } from './tags.ts';
import { tagFacts } from './facts.ts';
import { tagDesc } from './desc.ts';
import { HTML_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#f97316';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export { tagDesc };

export function hubMetadata(lang: Lang): Metadata {
  const ui = HTML_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/html`, languages: alternates('/html') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const t = tagOf(slug);
  if (!t) return {};
  const ui = HTML_UI[lang];
  return {
    title: `${ui.metaTitle(t.name)} — ${ui.section}`,
    description: ui.metaDesc(t.name, tagDesc(t.name, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/html/${slug}`,
      languages: alternates(`/html/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = HTML_UI[cardLang(lang)];
  return ogCard({ icon: TAG_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function tagCard(lang: Lang, slug: string): ReactElement {
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

export const tagParams = () => prerender(TAGS.map(t => ({ slug: t.name })));
