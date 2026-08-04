/**
 * 다트 마무리 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { DARTS_ICON, SCORES, scoreOf } from './list.ts';
import { dartsFacts } from './facts.ts';
import { DARTS_UI } from './ui.ts';

const FROM = '#dc2626';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = DARTS_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/darts`, languages: alternates('/darts') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const score = scoreOf(slug);
  if (!score) return {};
  const ui = DARTS_UI[lang];
  const f = dartsFacts(score);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/darts/${score}`,
      languages: alternates(`/darts/${score}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = DARTS_UI[cardLang(lang)];
  return ogCard({ icon: DARTS_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const dartsParams = () => SCORES.map(score => ({ slug: String(score) }));
