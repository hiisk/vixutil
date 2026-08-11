/**
 * 이모지 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { EM_ITEMS, EM_ICON, emojiItem } from './list.ts';
import { emojiDesc } from './desc.ts';
import { EMOJI_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#b45309';
const TO = '#f59e0b';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

const n = String(EM_ITEMS.length);

export function hubMetadata(lang: Lang): Metadata {
  const ui = EMOJI_UI[lang];
  return withCard({
    title: ui.hubMetaTitle.replace('{n}', n),
    description: ui.hubMetaDesc.replace(/\{n\}/g, n),
    alternates: { canonical: `${langPrefix(lang)}/emoji`, languages: alternates('/emoji') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = emojiItem(slug);
  if (!x) return {};
  const ui = EMOJI_UI[lang];
  return withCard({
    title: `${ui.metaTitle(x.char, x.common)} — ${ui.section}`,
    description: ui.metaDesc(x.char, emojiDesc(slug, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/emoji/${slug}`,
      languages: alternates(`/emoji/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = EMOJI_UI[cardLang(lang)];
  return ogCard({
    icon: EM_ICON,
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead.replace('{n}', n),
    from: FROM,
    to: TO,
  });
}

export const emojiParams = () => prerender(EM_ITEMS.map(x => ({ slug: x.slug })));
