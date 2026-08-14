/**
 * 퍼센트 한 장의 값 — 두 수에서 전부 계산한다.
 *
 * ── 반올림을 어디서 하는가 ──────────────────────────────────
 * 돈을 다루는 값이라 자릿수를 함부로 자르면 안 된다. 33%의 7,500은 2,475로
 * 딱 떨어지지만 7%의 125는 8.75다. 그래서 **필요한 만큼만** 남기고 뒤의 0은
 * 지운다 — 8.75는 8.75로, 2475는 2475로 나온다.
 *
 * 나누는 쪽(비율)은 순환소수가 나온다. 15/200은 7.5%지만 15/300은 5%,
 * 15/700은 2.142857…%다. 소수 넷째 자리에서 끊고 **끊었다는 사실을 남긴다** —
 * 반올림한 값을 그냥 적으면 다시 곱했을 때 안 맞는 것을 사람이 이상해한다.
 */
import { PERCENTS, BASES, type PercentCell } from './list.ts';

/** 자릿수를 최대 dp까지 남기고 뒤의 0을 지운다 */
export function trim(n: number, dp = 4): number {
  const p = 10 ** dp;
  return Math.round(n * p) / p;
}

export interface PercentFacts extends PercentCell {
  /** 기준수의 그 퍼센트 — 200의 15% = 30 */
  value: number;
  /** 그만큼 깎은 값 — 할인 */
  decreased: number;
  /** 그만큼 붙인 값 — 세금·팁 */
  increased: number;
  /** 퍼센트 수 자체가 기준수의 몇 %인가 — 15는 200의 7.5% */
  reverseRatio: number;
  /** 그 값이 나오게 하는 원래 수 — 30이 15%라면 원래는 200 */
  wholeFromValue: number;
  /** 소수로 나타낸 비율 — 0.15 */
  fraction: number;
  /** 비율이 딱 떨어지지 않아 잘렸는가 */
  ratioRounded: boolean;
  /** 같은 기준수의 다른 퍼센트 — 표가 된다 */
  byPercent: { percent: number; value: number }[];
  /** 같은 퍼센트의 다른 기준수 */
  byBase: { base: number; value: number }[];
}

export function percentFacts(percent: number, base: number): PercentFacts {
  const value = trim((base * percent) / 100);
  const rawRatio = (percent / base) * 100;

  return {
    percent,
    base,
    value,
    decreased: trim(base - value),
    increased: trim(base + value),
    reverseRatio: trim(rawRatio),
    /* 값이 그 퍼센트일 때의 원래 수 — 되돌려도 기준수가 나와야 한다 */
    wholeFromValue: trim((value * 100) / percent),
    fraction: trim(percent / 100),
    ratioRounded: trim(rawRatio) !== rawRatio,
    byPercent: PERCENTS.map(p => ({ percent: p, value: trim((base * p) / 100) })),
    byBase: BASES.map(b => ({ base: b, value: trim((b * percent) / 100) })),
  };
}

/**
 * 이웃 — 퍼센트 앞뒤 한 칸, 기준수 앞뒤 한 칸, 그리고 멀리 한 쌍.
 *
 * 목록 끝에서는 반대쪽으로 감는다. 앞에서 N개만 뽑으면 목록 뒤쪽이 통째로
 * 고아가 된다 — 이 저장소가 174곳에서 겪은 병이다.
 */
export function neighborCells(percent: number, base: number): PercentCell[] {
  const step = <T,>(list: readonly T[], v: T, k: number): T =>
    list[(list.indexOf(v) + k + list.length) % list.length];
  return [
    { percent: step(PERCENTS, percent, -1), base },
    { percent: step(PERCENTS, percent, 1), base },
    { percent, base: step(BASES, base, -1) },
    { percent, base: step(BASES, base, 1) },
    { percent: step(PERCENTS, percent, 5), base },
    { percent, base: step(BASES, base, 5) },
  ];
}
