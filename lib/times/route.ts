/**
 * 곱셈표 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { TIMES_ICON, productOf, slugOf } from './list.ts';
import { timesFacts } from './facts.ts';
import { TIMES_UI } from './ui.ts';

const FROM = '#0d9488';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = TIMES_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/times`, languages: alternates('/times') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const p = productOf(slug);
  if (!p) return {};
  const ui = TIMES_UI[lang];
  const f = timesFacts(p);
  // 뒤집힌 주소(8x7)로 들어와도 대표 주소(7x8) 하나만 canonical로 둔다
  const canonical = `${langPrefix(lang)}/times/${slugOf(p)}`;
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: { canonical, languages: alternates(`/times/${slugOf(p)}`) },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = TIMES_UI[cardLang(lang)];
  return ogCard({ icon: TIMES_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export { timesParams } from './list.ts';
