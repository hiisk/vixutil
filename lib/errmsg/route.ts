/**
 * 오류 사전 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { ERR_ITEMS, ERR_ICON, errItem } from './list.ts';
import { errDesc } from './desc.ts';
import { ERR_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#9f1239';
const TO = '#f43f5e';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

const n = String(ERR_ITEMS.length);

export function hubMetadata(lang: Lang): Metadata {
  const ui = ERR_UI[lang];
  return withCard({
    title: ui.hubMetaTitle.replace('{n}', n),
    description: ui.hubMetaDesc.replace(/\{n\}/g, n),
    alternates: { canonical: `${langPrefix(lang)}/error`, languages: alternates('/error') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = errItem(slug);
  if (!x) return {};
  const ui = ERR_UI[lang];
  return withCard({
    title: `${ui.metaTitle(x.message)} — ${ui.section}`,
    description: ui.metaDesc(x.message, errDesc(slug, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/error/${slug}`,
      languages: alternates(`/error/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = ERR_UI[cardLang(lang)];
  return ogCard({
    icon: ERR_ICON,
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead.replace('{n}', n),
    from: FROM,
    to: TO,
  });
}

export const errParams = () => prerender(ERR_ITEMS.map(x => ({ slug: x.slug })));
