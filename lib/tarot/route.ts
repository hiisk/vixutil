/**
 * 타로 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { CARDS, TAROT_ICON } from './deck.ts';
import { cardView } from './facts.ts';
import { TAROT_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#7c3aed';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = TAROT_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/fortune/card`, languages: alternates('/fortune/card') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const v = cardView(slug, lang);
  if (!v) return {};
  const ui = TAROT_UI[lang];
  return withCard({
    title: `${ui.metaTitle(v.name)} — ${ui.section}`,
    description: ui.metaDesc(v.name, v.upright),
    alternates: {
      canonical: `${langPrefix(lang)}/fortune/card/${slug}`,
      languages: alternates(`/fortune/card/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = TAROT_UI[cardLang(lang)];
  return ogCard({ icon: TAROT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function tarotCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = TAROT_UI[card];
  const v = cardView(slug, card);
  if (!v) return hubCard(card);
  return ogCard({
    icon: TAROT_ICON,
    eyebrow: `${ui.section} · ${v.kindLine}`,
    title: v.name,
    // 카드에서 바로 알아야 하는 것은 정방향 뜻이다
    desc: v.upright,
    from: FROM,
    to: TO,
  });
}

export const cardParams = () => prerender(CARDS.map(c => ({ slug: c.slug })));
