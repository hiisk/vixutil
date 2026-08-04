/**
 * 키 코드 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { KEYS, KEYCODE_ICON, keyOf, slugOf } from './list.ts';
import { keyFacts } from './facts.ts';
import { KEYCODE_UI } from './ui.ts';

const FROM = '#475569';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = KEYCODE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/keycode`, languages: alternates('/keycode') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = keyOf(slug);
  if (!x) return {};
  const ui = KEYCODE_UI[lang];
  const f = keyFacts(x);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/keycode/${slug}`,
      languages: alternates(`/keycode/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = KEYCODE_UI[cardLang(lang)];
  return ogCard({ icon: KEYCODE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const keycodeParams = () => KEYS.map(x => ({ slug: slugOf(x) }));
