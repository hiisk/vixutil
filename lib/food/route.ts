/**
 * 재료 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 *
 * 언어 여덟 × 파일 둘이라 문구 규칙을 라우트에 적지 않는다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { ingredient } from './ingredients8.ts';
import { foodFacts } from './facts.ts';
import { FOOD_UI } from './ui.ts';

const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 지하철·음악·색상에서와 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const ing = ingredient(slug);
  if (!ing) return {};
  const ui = FOOD_UI[lang];
  const f = foodFacts(ing);
  return {
    title: `${ui.metaTitle(ing.name[lang], f.grams.cupUs)} — ${ui.section}`,
    description: ui.metaDesc(ing.name[lang], f),
    alternates: {
      canonical: `${langPrefix(lang)}/food/${slug}`,
      languages: alternates8(`/food/${slug}`),
    },
  };
}

export function ingredientCard(lang: Lang8, slug: string): ReactElement {
  const ing = ingredient(slug);
  const card = cardLang(lang);
  const ui = FOOD_UI[card];
  const fallback = ogCard({
    icon: '⚖️', eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead,
    from: '#f59e0b', to: TO,
  });
  if (!ing) return fallback;
  const f = foodFacts(ing);
  return ogCard({
    icon: '⚖️',
    eyebrow: `${ui.section} · ${ui.densityLabel} ${f.gPerL}${ui.gram}/L`,
    title: `${ing.name[card]} 1 ${ui.cupOf('')}`.replace(/\s+/g, ' ').trim(),
    // 카드에서 바로 답이 보여야 공유한 사람이 다시 눌러 볼 필요가 없다
    desc: `${ui.cupUs} ${f.grams.cupUs}${ui.gram} · ${ui.cupMetric} ${f.grams.cupMetric}${ui.gram} · ${ui.tbsp} ${f.grams.tbsp}${ui.gram}`,
    from: '#f59e0b',
    to: TO,
  });
}
