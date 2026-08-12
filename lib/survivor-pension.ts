/**
 * 국민연금 유족연금 — 가입자가 숨졌을 때 남은 가족이 받는 연금.
 *
 * ── 지급률이 가입기간으로 갈린다 ────────────────────────────
 *   가입기간 10년 미만      기본연금액의 40%
 *   10년 이상 20년 미만     50%
 *   20년 이상               60%
 *
 * 여기에 부양가족연금액을 더한다. 기본연금액은 노령연금과 같은 식으로 내므로
 * lib/national-pension.ts의 것을 그대로 쓴다 — 같은 식을 두 곳에 적으면 한쪽만
 * 고쳐질 때 조용히 어긋난다.
 *
 * ── 중복급여 조정이 사람들이 가장 놓치는 부분이다 ──────────────
 * 배우자가 이미 제 노령연금을 받고 있으면 **둘을 다 받지는 못한다.** 하나를
 * 골라야 하고, 제 노령연금을 고르면 유족연금의 **30%**를 얹어 준다.
 * 그래서 "유족연금이 더 많아 보이는데 왜 노령연금을 고르라고 하나" 같은
 * 상황이 실제로 생긴다 — 두 선택을 나란히 놓고 큰 쪽을 골라야 한다.
 * bestChoice가 그 비교를 한다.
 *
 * ── 이 계산이 답하지 않는 것 ───────────────────────────────
 * 유족의 순위와 자격(배우자, 25세 미만 자녀, 60세 이상 부모 등)은 요건이
 * 촘촘해 여기서 판정하지 않는다. 나이·장애 요건도 사람마다 다르다.
 * 이 계산은 "받는다면 얼마"에만 답한다.
 *
 * 또 배우자에게는 소득이 있으면 일정 기간 뒤 지급이 멈추는 규정이 있다.
 * 그 기간과 요건은 사정마다 달라 금액으로 옮기지 않았다.
 */

import { calcPension, type PensionInput } from './national-pension.ts';

/** 가입기간별 지급률 — [최소 가입월수, 지급률] 을 큰 것부터 */
export const SURVIVOR_RATES: { fromMonths: number; rate: number }[] = [
  { fromMonths: 240, rate: 0.6 },
  { fromMonths: 120, rate: 0.5 },
  { fromMonths: 0, rate: 0.4 },
];

/** 제 노령연금을 고를 때 얹어 주는 유족연금의 비율 */
export const OVERLAP_BONUS = 0.3;

export function survivorRate(months: number): number {
  return (SURVIVOR_RATES.find(r => months >= r.fromMonths) ?? SURVIVOR_RATES[SURVIVOR_RATES.length - 1]).rate;
}

export interface SurvivorInput extends PensionInput {
  /**
   * 남은 사람이 받을 수 있는 제 노령연금 월액(원). 없으면 0.
   * 있으면 유족연금과 둘 중 하나만 받으므로 비교가 필요하다.
   */
  ownPension: number;
}

export interface SurvivorResult {
  /** 숨진 가입자의 기본연금액(연액, 원) */
  basicAnnual: number;
  /** 가입기간에 따른 지급률 */
  rate: number;
  /** 유족연금 월액(부양가족연금 포함, 원) */
  survivorMonthly: number;
  /** 제 노령연금을 고를 때 받는 금액(노령연금 + 유족연금의 30%, 원) */
  ownPlusBonus: number;
  /** 어느 쪽을 골라야 하나 */
  choice: 'survivor' | 'own';
  /** 고른 쪽의 월 수령액(원) */
  monthly: number;
  /** 두 선택의 차액(원) */
  gap: number;
}

export function calcSurvivor(input: SurvivorInput): SurvivorResult {
  /*
   * 기본연금액은 숨진 가입자의 것이다. 지급률과 부양가족연금은 유족연금 쪽
   * 규칙이므로, 노령연금 계산에서는 기본연금액만 빌려 온다 — 그래서
   * shiftYears와 familyAnnual을 0으로 두고 부른다.
   */
  const { basicAnnual } = calcPension({ ...input, shiftYears: 0, familyAnnual: 0 });
  const rate = survivorRate(Math.max(0, Math.floor(input.months)));

  const familyMonthly = Math.max(0, input.familyAnnual) / 12;
  const survivorMonthly = (basicAnnual * rate) / 12 + familyMonthly;

  const own = Math.max(0, input.ownPension);
  const ownPlusBonus = own > 0 ? own + survivorMonthly * OVERLAP_BONUS : 0;

  const choice: 'survivor' | 'own' = ownPlusBonus > survivorMonthly ? 'own' : 'survivor';
  const monthly = choice === 'own' ? ownPlusBonus : survivorMonthly;

  return {
    basicAnnual,
    rate,
    survivorMonthly,
    ownPlusBonus,
    choice,
    monthly,
    gap: Math.abs(survivorMonthly - ownPlusBonus),
  };
}

/**
 * 제 노령연금이 얼마를 넘으면 그쪽을 고르는 게 유리해지는가.
 *
 *   노령연금 + 유족연금 × 0.3 > 유족연금
 *   노령연금 > 유족연금 × 0.7
 *
 * 유족연금의 70%가 그 갈림길이다. 식을 풀어 두면 검사가 되짚을 수 있다.
 */
export const ownPensionBreakEven = (survivorMonthly: number): number =>
  survivorMonthly * (1 - OVERLAP_BONUS);
