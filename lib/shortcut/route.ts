/**
 * 단축키 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { SC_ITEMS, SC_ICON, scItem } from './list.ts';
import { scDesc } from './desc.ts';
import { SC_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0f172a';
const TO = '#0ea5e9';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

const n = String(SC_ITEMS.length);

export function hubMetadata(lang: Lang): Metadata {
  const ui = SC_UI[lang];
  return withCard({
    title: ui.hubMetaTitle.replace('{n}', n),
    description: ui.hubMetaDesc.replace(/\{n\}/g, n),
    alternates: { canonical: `${langPrefix(lang)}/shortcut`, languages: alternates('/shortcut') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = scItem(slug);
  if (!x) return {};
  const ui = SC_UI[lang];
  return withCard({
    title: `${ui.metaTitle(x.action, ui.appLabel[x.app])} — ${ui.section}`,
    description: ui.metaDesc(x.win, x.mac, scDesc(slug, lang)),
    alternates: {
      canonical: `${langPrefix(lang)}/shortcut/${slug}`,
      languages: alternates(`/shortcut/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = SC_UI[cardLang(lang)];
  return ogCard({
    icon: SC_ICON,
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead.replace('{n}', n),
    from: FROM,
    to: TO,
  });
}

export const scParams = () => prerender(SC_ITEMS.map(x => ({ slug: x.slug })));
