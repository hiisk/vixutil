import { CARDS, SUIT_ELEMENT, type Card } from './tarot/deck.ts';
import { MAJOR_COPY } from './tarot/majors.ts';
import { TAROT_UI as CARD_UI } from './tarot/ui.ts';
import { langOfLocale, type Lang as DataLang } from './i18n/lang.ts';
import type { AnyLocale10 } from './locales.ts';

/**
 * 운세 섹션의 타로 뽑기가 쓰는 78장 해석 — 카드 사전에서 가져온다.
 *
 * ── 왜 새로 안 쓰는가 ────────────────────────────────
 * /fortune/daily-tarot과 /fortune/card/the-fool은 같은 카드를 말한다. 두 곳에
 * 따로 문장을 적으면 같은 사이트가 같은 카드에 두 가지 답을 하게 되고, 그 어긋남은
 * 아무도 못 찾는다. 게다가 78장 × 정·역 × 여덟 언어면 1,248덩어리라, 손으로
 * 적으면 어느 하나가 비어도 모른다.
 *
 * 카드 사전([[lib/tarot/majors.ts]]·[[lib/tarot/ui.ts]])은 이미 열 언어를 갖고
 * 있다. 메이저 스물두 장은 카드마다 적혀 있고, 마이너 쉰여섯 장은 수트 넷과
 * 계급 열넷을 겹쳐 만든다. 여기서는 그 자료를 뽑기 도구가 쓰는 모양
 * (`Record<번호, {upright, reversed}>`)으로 바꿔 준다.
 *
 * 영어는 예전부터 쓰던 긴 해석이 [[lib/tarot-intl.ts]]에 그대로 있어 건드리지
 * 않는다 — 뽑기 페이지는 한 장을 길게 읽는 자리고, 사전은 78장을 훑는 자리라
 * 길이가 다른 편이 맞다.
 */
export interface Reading { upright: string; reversed: string }

function readingOf(card: Card, dl: DataLang): Reading {
  if (card.arcana === 'major') {
    const copy = MAJOR_COPY[card.slug];
    return { upright: copy.up[dl], reversed: copy.rev[dl] };
  }
  // 마이너는 수트 주제와 계급 단계를 겹쳐 만든다 — 사전 페이지와 같은 방식이다
  const ui = CARD_UI[dl];
  const suitTheme = ui.suitTheme[card.suit!];
  const rankTheme = ui.rankTheme[card.rank!];
  return {
    upright: ui.minorReading(rankTheme, suitTheme),
    reversed: ui.minorReversed(rankTheme, suitTheme),
  };
}

/** 그 언어의 78장 해석 — 열쇠는 덱에서의 자리(메이저 0~21, 마이너 22~77)다 */
export function tarotReadingsOf(locale: AnyLocale10): Record<number, Reading> {
  const dl = langOfLocale(locale);
  const out: Record<number, Reading> = {};
  for (const card of CARDS) out[card.id] = readingOf(card, dl);
  return out;
}

/** 그 언어의 78장 이름 — 마이너는 수트 이름과 계급 이름을 이어 만든다 */
export function tarotNamesOf(locale: AnyLocale10): Record<number, string> {
  const dl = langOfLocale(locale);
  const ui = CARD_UI[dl];
  const out: Record<number, string> = {};
  for (const card of CARDS) {
    out[card.id] = card.arcana === 'major'
      ? MAJOR_COPY[card.slug].name[dl]
      : ui.minorName(ui.suitLabel[card.suit!], ui.rankLabel[card.rank!]);
  }
  return out;
}

/** 수트가 다루는 주제 — 스프레드 화면이 카드 옆에 붙인다 */
export function suitCopyOf(locale: AnyLocale10) {
  const dl = langOfLocale(locale);
  const ui = CARD_UI[dl];
  return Object.fromEntries(
    (Object.keys(SUIT_ELEMENT) as (keyof typeof SUIT_ELEMENT)[])
      .map(s => [s, { name: ui.suitLabel[s], theme: ui.suitTheme[s] }]),
  ) as Record<string, { name: string; theme: string }>;
}
