/**
 * 체스 오프닝 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates10, prefix10, type Lang10 } from '../i18n/lang10.ts';
import { CHESS_ICON, OPENINGS, openingOf } from './list.ts';
import { openingFacts } from './facts.ts';
import { fullName } from './names.ts';
import { chessUi, fill } from './ui.ts';

const FROM = '#7c3aed';
const TO = '#1e1b4b';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang10): Lang10 => (lang === 'hi' ? 'en' : lang);

const N = OPENINGS.length;

export function hubMetadata(lang: Lang10): Metadata {
  const ui = chessUi(lang);
  return {
    title: fill(ui.hubMetaTitle, { n: N }),
    description: fill(ui.hubMetaDesc, { n: N }),
    alternates: { canonical: `${prefix10(lang)}/game/chess`, languages: alternates10('/game/chess') },
  };
}

export function detailMetadata(lang: Lang10, slug: string): Metadata {
  const x = openingOf(slug);
  if (!x) return {};
  const ui = chessUi(lang);
  const f = openingFacts(x);
  const name = fullName(x.family, x.line, lang);
  return {
    title: `${fill(ui.metaTitle, { name })} — ${ui.section}`,
    description: fill(ui.metaDesc, { name, line: f.line }),
    alternates: {
      canonical: `${prefix10(lang)}/game/chess/${slug}`,
      languages: alternates10(`/game/chess/${slug}`),
    },
  };
}

export function hubCard(lang: Lang10): ReactElement {
  const ui = chessUi(cardLang(lang));
  return ogCard({
    icon: CHESS_ICON,
    eyebrow: ui.section,
    title: fill(ui.hubTitle, { n: N }),
    desc: ui.hubLead,
    from: FROM,
    to: TO,
  });
}

export function openingCard(lang: Lang10, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = chessUi(card);
  const x = openingOf(slug);
  if (!x) return hubCard(card);
  const f = openingFacts(x);
  // 카드 설명에는 수순을 그대로 싣는다 — 표기는 어느 언어에서나 같은 ASCII다.
  // 길면 앞쪽만 남긴다. 뒤를 자르는 편이 어느 오프닝인지 알아보기 쉽다.
  const line = f.line.length > 60 ? `${f.line.slice(0, 58)}…` : f.line;
  return ogCard({
    icon: CHESS_ICON,
    eyebrow: `${ui.section} · ${ui.group[f.group]}`,
    title: fullName(x.family, x.line, card),
    desc: line,
    from: FROM,
    to: TO,
  });
}

export const openingParams = () => OPENINGS.map(x => ({ slug: x.slug }));
