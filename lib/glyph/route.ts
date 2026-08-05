/**
 * 특수문자 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { GLYPHS, GLYPH_ICON, glyphOf } from './list.ts';
import { glyphFacts } from './facts.ts';
import { GLYPH_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#0891b2';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = GLYPH_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/text/char`, languages: alternates('/text/char') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const g = glyphOf(slug);
  if (!g) return {};
  const ui = GLYPH_UI[lang];
  return {
    title: `${ui.metaTitle(g.char)} — ${ui.section}`,
    description: ui.metaDesc(glyphFacts(g), ui.kindLabel[g.kind]),
    alternates: {
      canonical: `${langPrefix(lang)}/text/char/${slug}`,
      languages: alternates(`/text/char/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = GLYPH_UI[cardLang(lang)];
  return ogCard({ icon: GLYPH_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function glyphCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = GLYPH_UI[card];
  const g = glyphOf(slug);
  if (!g) return hubCard(card);
  const f = glyphFacts(g);
  return ogCard({
    icon: GLYPH_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[g.kind]}`,
    // 카드에서는 글자 자체가 제목이다
    title: `${g.char}  ${f.unicode}`,
    desc: `${ui.entityLabel} ${f.entity} · CSS ${f.cssEscape}`,
    from: FROM,
    to: TO,
  });
}

export const glyphParams = () => prerender(GLYPHS.map(g => ({ slug: g.slug })));
