/**
 * 큐브 공식 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { ALGS, CUBE_ICON, algOf } from './list.ts';
import { caseFacts } from './facts.ts';
import { CUBE_UI } from './ui.ts';

const FROM = '#f59e0b';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = CUBE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/game/cube`, languages: alternates('/game/cube') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const item = algOf(slug);
  if (!item) return {};
  const ui = CUBE_UI[lang];
  return {
    title: `${ui.metaTitle(item.label)} — ${ui.section}`,
    description: ui.metaDesc(caseFacts(item)),
    alternates: {
      canonical: `${langPrefix(lang)}/game/cube/${slug}`,
      languages: alternates(`/game/cube/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = CUBE_UI[cardLang(lang)];
  return ogCard({ icon: CUBE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function algCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = CUBE_UI[card];
  const item = algOf(slug);
  if (!item) return hubCard(card);
  const f = caseFacts(item);
  return ogCard({
    icon: CUBE_ICON,
    eyebrow: `${ui.section} · ${ui.stepLabel[item.step].split(' — ')[0]}`,
    title: item.label,
    // 공유 카드에는 공식을 그대로 싣는다 — 링크를 보는 자리에서 바로 쓸 수 있다
    desc: `${item.alg}  ·  ${ui.moveCount(f.moves)}`,
    from: FROM,
    to: TO,
  });
}

export const algParams = () => ALGS.map(a => ({ slug: a.slug }));
