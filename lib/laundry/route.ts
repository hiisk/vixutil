/**
 * 세탁 기호 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 *
 * 카드에는 기호 SVG를 넣지 않는다. 카드를 그리는 satori는 화면과 다른 얼개라
 * 여기서 쓰는 도형이 그대로 나오지 않는다 — 그래서 카드는 글자와 아이콘 하나로
 * 두고, 기호는 페이지에서 그린다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { LAUNDRY_ICON, LAUNDRY_SLUGS, cellOf } from './list.ts';
import { laundryFacts } from './facts.ts';
import { LAUNDRY_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0369a1';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = LAUNDRY_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/laundry`, languages: alternates('/laundry') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const c = cellOf(slug);
  if (!c) return {};
  const ui = LAUNDRY_UI[lang];
  const f = laundryFacts(c);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical: `${langPrefix(lang)}/laundry/${slug}`, languages: alternates(`/laundry/${slug}`) },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = LAUNDRY_UI[cardLang(lang)];
  return ogCard({ icon: LAUNDRY_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const laundryParams = () => prerender(LAUNDRY_SLUGS.map(slug => ({ slug })));
