/**
 * 명령어 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { CMD_ITEMS, CMD_ICON, cmdItem } from './list.ts';
import { cmdDesc } from './desc.ts';
import { CMD_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#334155';
const TO = '#6366f1';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

const n = String(CMD_ITEMS.length);

export function hubMetadata(lang: Lang): Metadata {
  const ui = CMD_UI[lang];
  return withCard({
    title: ui.hubMetaTitle.replace('{n}', n),
    description: ui.hubMetaDesc.replace(/\{n\}/g, n),
    alternates: { canonical: `${langPrefix(lang)}/cmd`, languages: alternates('/cmd') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = cmdItem(slug);
  if (!x) return {};
  const ui = CMD_UI[lang];
  return withCard({
    title: `${ui.metaTitle(x.name)} — ${ui.section}`,
    description: ui.metaDesc(x.name, cmdDesc(slug, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/cmd/${slug}`,
      languages: alternates(`/cmd/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = CMD_UI[cardLang(lang)];
  return ogCard({
    icon: CMD_ICON,
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead.replace('{n}', n),
    from: FROM,
    to: TO,
  });
}

export function itemCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = CMD_UI[card];
  const x = cmdItem(slug);
  if (!x) return hubCard(card);
  return ogCard({
    icon: CMD_ICON,
    eyebrow: `${ui.section} · ${ui.catLabel[x.category]}`,
    title: x.name,
    desc: cmdDesc(slug, card),
    from: FROM,
    to: TO,
  });
}

export const cmdParams = () => prerender(CMD_ITEMS.map(x => ({ slug: x.slug })));
