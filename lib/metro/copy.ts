/**
 * 노선 문구를 짧게 적는 도우미.
 *
 * 언어가 열이라 노선마다 `ko: { intro: ..., hint: ... }`를 여덟 번 쓰면 한 노선이
 * 스무 줄을 넘고, 노선을 더할 때 한 언어를 빠뜨렸는지 눈으로 세야 한다.
 * 순서를 정해 두고 [소개, 힌트] 쌍만 열 개 넘기면 타입 검사가 개수를 지킨다.
 */
import type { L } from './lang.ts';
import type { MetroCopy } from './types.ts';

type Pair = readonly [intro: string, hint: string];

/** 순서는 ko · en · es · pt · ja · de · fr · hi · zh · tw */
export const T = (
  ko: Pair, en: Pair, es: Pair, pt: Pair, ja: Pair, de: Pair, fr: Pair, hi: Pair, zh: Pair, tw: Pair,
): L<MetroCopy> => ({
  ko: { intro: ko[0], hint: ko[1] },
  en: { intro: en[0], hint: en[1] },
  es: { intro: es[0], hint: es[1] },
  pt: { intro: pt[0], hint: pt[1] },
  ja: { intro: ja[0], hint: ja[1] },
  de: { intro: de[0], hint: de[1] },
  fr: { intro: fr[0], hint: fr[1] },
  hi: { intro: hi[0], hint: hi[1] },
  zh: { intro: zh[0], hint: zh[1] },
  tw: { intro: tw[0], hint: tw[1] },
});

/** 역 하나 — 현지 표기와 로마자 */
export const s = (name: string, roman?: string, mark?: 'terminus' | 'transfer') =>
  ({ name, roman, mark });

/** 영문명이 정답이고 다른 표기도 받는 곳 — 홍콩의 한자명처럼 */
export const sa = (name: string, alt: string, mark?: 'terminus' | 'transfer') =>
  ({ name, alt, mark });
