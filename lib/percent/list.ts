/**
 * 퍼센트 낱장 1,200칸 — 퍼센트 30가지 × 기준수 40가지. 자료를 한 줄도 안 적는다.
 *
 * ── 왜 이 계열인가 ──────────────────────────────────────────
 * "15% of 200", "200에서 20% 할인", "30은 200의 몇 퍼센트"는 언어를 가리지 않고
 * 검색되는 몇 안 되는 계산이다. 숫자와 기호만 있으면 뜻이 통해서 번역이 답을
 * 바꾸지 않는다 — 이 사이트가 국외에서 이길 수 있는 자리다.
 *
 * ── 한 장이 네 물음에 답한다 ────────────────────────────────
 * (15, 200) 한 장에 이것이 다 들어간다.
 *
 *   15%가 얼마인가          200의 15% = 30
 *   15% 깎으면 얼마인가     200 − 15% = 170      ← 할인
 *   15% 붙이면 얼마인가     200 + 15% = 230      ← 세금·팁
 *   15는 200의 몇 %인가     7.5%                 ← 비율
 *
 * 물음마다 낱장을 따로 내면 넷이 서로 거의 같은 말을 하게 된다. 한 장에 모으면
 * 그 장이 실제로 두꺼워지고, 사람이 찾는 답도 대개 이웃한 물음이다.
 *
 * ── 목록을 어디서 끊는가 ────────────────────────────────────
 * 퍼센트는 사람이 손에 들고 오는 것만 남긴다 — 1~10은 다 있고, 그 위는 5의
 * 배수와 12·18처럼 실제로 쓰이는 것이다. 기준수도 마찬가지로 값을 매길 때
 * 쓰는 수(100·250·1000·10000)와 그 사이를 메우는 몇 개다.
 *
 * 촘촘하게 채우면 200과 201이 거의 같은 장이 되어 둘 다 색인에서 밀린다.
 */

/** 퍼센트 30가지 */
export const PERCENTS: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25,
  30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
];

/** 기준수 40가지 */
export const BASES: readonly number[] = [
  10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 120, 125, 150, 200, 250, 300, 350, 400,
  500, 600, 700, 750, 800, 900, 1000, 1200, 1500, 2000, 2500, 3000, 5000, 7500, 10000,
  15000, 20000, 25000, 50000, 100000,
];

export interface PercentCell { percent: number; base: number }

/** `15-of-200` — of는 어느 언어의 주소에서도 읽히고, 숫자 둘을 갈라 준다 */
export const percentSlug = (percent: number, base: number): string => `${percent}-of-${base}`;

/**
 * 주소 조각 → 값. 목록 밖이면 null이라 404가 된다.
 *
 * 앞자리 0을 막는다 — `015-of-200`이 통과하면 같은 장이 두 주소가 된다.
 */
export function parsePercentSlug(slug: string): PercentCell | null {
  const m = /^([1-9]\d{0,2})-of-([1-9]\d{0,5})$/.exec(slug);
  if (!m) return null;
  const percent = Number(m[1]), base = Number(m[2]);
  if (!PERCENTS.includes(percent) || !BASES.includes(base)) return null;
  return { percent, base };
}

export function allPercentCells(): PercentCell[] {
  return PERCENTS.flatMap(p => BASES.map(b => ({ percent: p, base: b })));
}

export const PERCENT_SLUGS = allPercentCells().map(c => percentSlug(c.percent, c.base));

export const PERCENT_COUNT = PERCENTS.length * BASES.length;

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const PERCENT_ICON = '％';
