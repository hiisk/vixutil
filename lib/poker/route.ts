/**
 * 홀덤 시작 핸드 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { HANDS, POKER_ICON, handOf } from './list.ts';
import { handFacts } from './facts.ts';
import { fill, numFmt, pokerUi } from './ui.ts';

const FROM = '#059669';
const TO = '#064e3b';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

const N = HANDS.length;

export function hubMetadata(lang: Lang): Metadata {
  const ui = pokerUi(lang);
  return {
    title: fill(ui.hubMetaTitle, { n: N }),
    description: fill(ui.hubMetaDesc, { n: N }),
    alternates: { canonical: `${langPrefix(lang)}/game/poker`, languages: alternates('/game/poker') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const h = handOf(slug);
  if (!h) return {};
  const ui = pokerUi(lang);
  const f = handFacts(h);
  return {
    title: `${fill(ui.metaTitle, { name: f.label })} — ${ui.section}`,
    description: fill(ui.metaDesc, {
      name: f.label,
      combos: f.combos,
      oneIn: numFmt(lang, f.oneIn, 1),
      score: f.score,
    }),
    alternates: {
      canonical: `${langPrefix(lang)}/game/poker/${slug}`,
      languages: alternates(`/game/poker/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = pokerUi(cardLang(lang));
  return ogCard({
    icon: POKER_ICON,
    eyebrow: ui.section,
    title: fill(ui.hubTitle, { n: N }),
    desc: fill(ui.hubLead, { n: N }),
    from: FROM,
    to: TO,
  });
}

export function handCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = pokerUi(card);
  const h = handOf(slug);
  if (!h) return hubCard(card);
  const f = handFacts(h);
  // 제목은 어느 언어에서나 같은 표기(AKs)다. 설명에 갈래와 점수를 붙여 카드만
  // 보고도 어떤 핸드인지 알 수 있게 한다.
  return ogCard({
    icon: POKER_ICON,
    eyebrow: `${ui.section} · ${ui.kind[f.kind]}`,
    title: f.label,
    desc: `${ui.score} ${f.score} · ${fill(ui.combosOf, { n: f.combos })}`,
    from: FROM,
    to: TO,
  });
}

export const handParams = () => HANDS.map(h => ({ slug: h.slug }));
