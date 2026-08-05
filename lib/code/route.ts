/**
 * 부호 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 *
 * 글자와 셀이 한 주소 공간을 나눠 쓴다(char-a · cell-125). 앞머리로 갈리므로
 * 라우트는 하나면 되고, 어느 쪽인지는 여기서 가른다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { CELLS, CHARS, CODE_ICON, cellOf, cellSlug, charOf, charSlug } from './list.ts';
import { cellFacts, charFacts } from './facts.ts';
import { CODE_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#7c3aed';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = CODE_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/code`, languages: alternates('/code') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const ui = CODE_UI[lang];
  const char = charOf(slug);
  if (char) {
    const f = charFacts(char);
    return withCard({
      title: ui.charMetaTitle(f),
      description: ui.charMetaDesc(f),
      alternates: { canonical: `${langPrefix(lang)}/code/${slug}`, languages: alternates(`/code/${slug}`) },
    });
  }
  const mask = cellOf(slug);
  if (mask === undefined) return {};
  const f = cellFacts(mask);
  return withCard({
    title: ui.cellMetaTitle(f),
    description: ui.cellMetaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/code/${slug}`, languages: alternates(`/code/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = CODE_UI[cardLang(lang)];
  return ogCard({ icon: CODE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const codeParams = () => prerender([
  ...CHARS.map(x => ({ slug: charSlug(x) })),
  ...CELLS.map(m => ({ slug: cellSlug(m) })),
]);
