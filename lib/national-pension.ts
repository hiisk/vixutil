/**
 * 국민연금 노령연금 예상 수령액.
 *
 * ── 왜 계산으로 낼 수 있나 ─────────────────────────────────
 * 국민연금은 낸 돈에 이자를 붙여 돌려주는 적립식이 아니라 **법이 정한 식**으로
 * 금액을 낸다. 그 식이 국민연금법 제51조다.
 *
 *   기본연금액(연액) = 상수 × (A + B) × (1 + 0.05 × n / 12)
 *
 *   A = 연금을 받기 전 3년간 전체 가입자의 평균소득월액 (해마다 공표)
 *   B = 내 생애 평균 기준소득월액 (과거 소득을 현재 가치로 재평가한 값)
 *   n = 가입월수에서 240개월(20년)을 넘는 개월수
 *
 * 그래서 A와 B만 알면 나머지는 전부 규칙이다. 표를 옮겨 적을 것이 없다.
 *
 * ── 상수는 왜 해마다 다른가 ────────────────────────────────
 * 소득대체율을 2008년 50%에서 2028년 40%까지 20년에 걸쳐 낮추도록 법이
 * 정해 두었다. 상수는 2008년 1.5에서 **해마다 0.015씩** 내려가 2028년에
 * 1.2가 되고 그 뒤로는 그대로다. 값을 해마다 적어 두지 않고 이 규칙으로 낸다 —
 * 그러면 검사가 "2028년 이후는 1.2에서 멈추는가"를 되짚을 수 있다.
 *
 * 40년 가입한 평균소득자의 소득대체율이 상수의 3분의 1이 되는 것도 이 식에서
 * 저절로 나온다(replacementRate). 1.2 → 40%다.
 *
 * ── A값을 코드에 안 박는 까닭 ──────────────────────────────
 * A값은 해마다 공표되고 매년 오른다. 박아 두면 내년에 조용히 틀린 금액을
 * 답처럼 내놓는다. lib/lease-renewal.ts의 전월세전환율과 같은 이유로 입력으로
 * 받는다. B값(내 평균 기준소득월액)은 공단의 내 연금 알아보기에서 확인한다.
 *
 * ── 이 계산이 답하지 않는 것 ───────────────────────────────
 * 재평가율을 적용한 B값 자체를 여기서 만들 수는 없다. 과거 소득의 재평가율이
 * 해마다 고시되기 때문이다. 그래서 B값은 받아 쓴다. 가입기간 10년(120개월)에
 * 못 미치면 노령연금이 아니라 반환일시금이므로 0을 낸다 — 지어낸 금액을
 * 내놓지 않는다.
 */

/** 상수가 1.5였던 해 */
export const CONST_BASE_YEAR = 2008;
/** 그 해의 상수 */
export const CONST_BASE = 1.5;
/** 해마다 내려가는 폭 */
export const CONST_STEP = 0.015;
/** 더 내려가지 않는 바닥 — 2028년부터 */
export const CONST_FLOOR = 1.2;

/** 노령연금을 받을 수 있는 최소 가입기간(개월) — 못 채우면 반환일시금이다 */
export const MIN_MONTHS = 120;
/** 지급률 100%가 되는 가입기간(개월) */
export const FULL_MONTHS = 240;

/** 조기노령연금 1년당 감액률 */
export const EARLY_PENALTY = 0.06;
/** 연기연금 1년당 증액률 */
export const DEFER_BONUS = 0.072;
/** 앞당기거나 미룰 수 있는 최대 연수 */
export const MAX_SHIFT_YEARS = 5;

/**
 * 그 해의 상수 — 2008년 1.5에서 해마다 0.015씩 내려가 1.2에서 멈춘다.
 */
export function pensionConstant(year: number): number {
  const dropped = CONST_BASE - CONST_STEP * (year - CONST_BASE_YEAR);
  return Math.max(CONST_FLOOR, Math.min(CONST_BASE, dropped));
}

/**
 * 40년 가입한 평균소득자의 소득대체율.
 *
 * 40년이면 n = 240개월이라 괄호가 2.0이 되고, B가 A와 같으면 (A+B)는 2A다.
 * 따라서 연액이 상수 × 4A이고 월액은 상수 × A / 3 — A로 나누면 상수의
 * 3분의 1이 남는다. 상수 1.2가 소득대체율 40%인 것이 이 식에서 나온다.
 */
export const replacementRate = (year: number): number => pensionConstant(year) / 3;

/**
 * 가입기간에 따른 노령연금 지급률.
 *
 * 10년에 기본연금액의 50%이고 1년마다 5%씩 붙어 20년에 100%가 된다.
 * 20년을 넘으면 지급률은 100%에 머물고, 그 뒤로는 기본연금액 식의
 * (1 + 0.05n/12)이 늘어나는 몫을 맡는다 — 두 규칙이 20년에서 만나므로
 * 금액이 그 자리에서 튀지 않는다.
 */
export function oldAgeRate(months: number): number {
  if (months < MIN_MONTHS) return 0;
  if (months >= FULL_MONTHS) return 1;
  return 0.5 + (0.05 * (months - MIN_MONTHS)) / 12;
}

export interface PensionInput {
  /** A값 — 전체 가입자 평균소득월액(원). 해마다 공표된다 */
  avgIncome: number;
  /** B값 — 내 생애 평균 기준소득월액(원) */
  myIncome: number;
  /** 총 가입기간(개월) */
  months: number;
  /** 연금을 받기 시작하는 해 — 상수를 정한다 */
  year: number;
  /**
   * 받는 시기를 앞당기거나(-) 미루는(+) 연수. -5 ~ +5.
   * 앞당기면 1년당 6% 깎이고 미루면 1년당 7.2% 붙는다.
   */
  shiftYears: number;
  /** 부양가족연금액(연액, 원). 배우자·자녀·부모가 있을 때 정액으로 더한다 */
  familyAnnual: number;
}

export interface PensionResult {
  /** 그 해의 상수 */
  constant: number;
  /** 기본연금액(연액, 원) */
  basicAnnual: number;
  /** 가입기간 지급률 */
  rate: number;
  /** 앞당김·미룸 배율 */
  shiftFactor: number;
  /** 부양가족연금을 뺀 월 연금액(원) */
  monthlyBeforeFamily: number;
  /** 부양가족연금 월액(원) */
  familyMonthly: number;
  /** 실제로 받는 월 연금액(원) */
  monthly: number;
  /** 연 수령액(원) */
  annual: number;
  /** 내 평균 기준소득월액 대비 비율(%) — 내 소득의 몇 %를 받는가 */
  ownReplacementRate: number;
  /** 노령연금을 받을 수 있는가 — 10년을 못 채우면 false */
  eligible: boolean;
}

export function calcPension(input: PensionInput): PensionResult {
  const a = Math.max(0, input.avgIncome);
  const b = Math.max(0, input.myIncome);
  const months = Math.max(0, Math.floor(input.months));
  const constant = pensionConstant(input.year);

  // 20년을 넘는 개월수만 괄호를 키운다
  const over = Math.max(0, months - FULL_MONTHS);
  const basicAnnual = constant * (a + b) * (1 + (0.05 * over) / 12);

  const rate = oldAgeRate(months);
  const shift = Math.max(-MAX_SHIFT_YEARS, Math.min(MAX_SHIFT_YEARS, input.shiftYears));
  const shiftFactor = shift < 0 ? 1 + EARLY_PENALTY * shift : 1 + DEFER_BONUS * shift;

  const monthlyBeforeFamily = (basicAnnual * rate * shiftFactor) / 12;
  // 부양가족연금은 앞당김·미룸으로 깎거나 늘리지 않는다
  const familyMonthly = rate > 0 ? Math.max(0, input.familyAnnual) / 12 : 0;
  const monthly = monthlyBeforeFamily + familyMonthly;

  return {
    constant,
    basicAnnual,
    rate,
    shiftFactor,
    monthlyBeforeFamily,
    familyMonthly,
    monthly,
    annual: monthly * 12,
    ownReplacementRate: b > 0 ? (monthly / b) * 100 : 0,
    eligible: months >= MIN_MONTHS,
  };
}

/**
 * 가입기간을 더 채우면 월 연금이 얼마 늘어나는가.
 *
 * "1년 더 넣을까"에 답하려면 늘어나는 몫을 봐야 한다. 지급률 구간(10~20년)에
 * 있으면 5%p씩 붙고, 20년을 넘으면 괄호가 커지는 몫만 붙어 증가폭이 달라진다.
 */
export function monthlyAt(input: PensionInput, months: number): number {
  return calcPension({ ...input, months }).monthly;
}

/**
 * 앞당김·미룸을 다 늘어놓는다 — -5년부터 +5년까지 열한 가지.
 *
 * 조기수령은 평생 깎인 금액을 받는다. 몇 해 만에 손익이 뒤집히는지는
 * 받는 총액을 쌓아 봐야 알 수 있어 breakEvenYears가 따로 낸다.
 */
export function shiftTable(input: PensionInput): { shift: number; monthly: number }[] {
  const out: { shift: number; monthly: number }[] = [];
  for (let s = -MAX_SHIFT_YEARS; s <= MAX_SHIFT_YEARS; s++) {
    out.push({ shift: s, monthly: calcPension({ ...input, shiftYears: s }).monthly });
  }
  return out;
}

/**
 * 미뤄 받는 쪽이 앞당겨 받는 쪽을 따라잡는 나이까지의 연수.
 *
 * 앞당기면 적은 금액을 오래 받고, 미루면 많은 금액을 늦게부터 받는다.
 * 누적 수령액이 같아지는 지점이 손익분기다. 미룬 해 동안은 한 푼도 못 받으므로
 * 그만큼을 뒤에서 메워야 한다.
 *
 * 정상 수령 시점(shift 0)을 0년으로 두고 센다. 따라잡지 못하면 null이다.
 */
export function breakEvenYears(input: PensionInput, early: number, late: number): number | null {
  const a = calcPension({ ...input, shiftYears: early });
  const b = calcPension({ ...input, shiftYears: late });
  if (b.monthly <= a.monthly) return null;

  // 개월 단위로 쌓아 본다 — 해 단위로는 뒤집히는 자리를 놓친다
  for (let m = 1; m <= 12 * 60; m++) {
    const gotA = a.monthly * Math.max(0, m - early * 12);
    const gotB = b.monthly * Math.max(0, m - late * 12);
    if (gotB >= gotA) return m / 12;
  }
  return null;
}
