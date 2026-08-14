/**
 * 대출 상환방식 값 낱장 — `/calculator/loan-method/10000-45-30`
 * (원금 1억 · 연 4.5% · 30년).
 *
 * ── 왜 여기에 붙이나 ────────────────────────────────────────
 * `/calculator/loan`에는 같은 식이 페이지 안에 따로 적혀 있다(calcEP/calcEPrin).
 * 그 쪽에 낱장을 달면 낱장과 계산기가 **다른 코드**로 같은 답을 내게 되고, 언젠가
 * 갈라진다. `/calculator/loan-method`는 lib/loan-schedule.ts의 compareAll을 그대로
 * 부르므로 낱장과 계산기가 한 함수를 쓴다. 그래서 이쪽에 붙였다.
 *
 * (알림: /calculator/loan의 중복은 이 변경과 무관해 손대지 않았다.)
 *
 * ── 낱장이 실제로 말하는 것 ─────────────────────────────────
 * 같은 돈을 같은 이율로 빌려도 **상환방식에 따라 총이자가 다르다**. 원금균등이
 * 가장 적고 만기일시가 가장 많은데, 대신 원금균등은 첫 달이 가장 무겁다.
 * 그 맞바꿈을 숫자로 보여주는 것이 이 낱장이다 — 월 상환액 하나만 알려주는
 * 계산기와 다른 답이다.
 *
 * ── 요율이 없다 ─────────────────────────────────────────────
 * 세법·보험료율이 안 들어간다. 순수한 돈 계산이라 해가 바뀌어도 안 낡는다.
 */
import { compareAll, type Schedule } from './loan-schedule.ts';

/** 원금(만원) — 1천만원부터 5억까지, 사람이 실제로 검색하는 자리 */
export const PRINCIPALS: readonly number[] = [
  1000, 2000, 3000, 5000, 7000, 10000, 15000, 20000, 25000, 30000, 40000, 50000,
];

/** 연이율(%) */
export const RATES: readonly number[] = [3, 3.5, 4, 4.5, 5, 6];

/** 기간(년) */
export const TERMS: readonly number[] = [5, 10, 15, 20, 30, 35];

/** 이율은 주소에 10배로 적는다 — 4.5%가 `45`. 점을 쓰면 파일 확장자처럼 읽힌다 */
export const rateSlug = (r: number): number => Math.round(r * 10);

export const loanSlug = (principal: number, rate: number, term: number): string =>
  `${principal}-${rateSlug(rate)}-${term}`;

export interface LoanCell { principal: number; rate: number; term: number }

/**
 * 주소 조각 → 값. 목록 밖이면 null이라 404가 된다.
 *
 * 앞자리 0을 막는다 — `01000-45-30`이 통과하면 같은 장이 두 주소가 된다.
 */
export function parseLoanSlug(s: string): LoanCell | null {
  const m = /^([1-9]\d{3,4})-([1-9]\d?)-([1-9]\d?)$/.exec(s);
  if (!m) return null;
  const principal = Number(m[1]), term = Number(m[3]);
  const rate = RATES.find(r => rateSlug(r) === Number(m[2]));
  if (rate === undefined) return null;
  if (!PRINCIPALS.includes(principal) || !TERMS.includes(term)) return null;
  return { principal, rate, term };
}

export function allLoanCells(): LoanCell[] {
  return PRINCIPALS.flatMap(p => RATES.flatMap(r => TERMS.map(t => ({ principal: p, rate: r, term: t }))));
}

export interface LoanFacts extends LoanCell {
  /** 원금(원) */
  won: number;
  months: number;
  /** 세 방식 — lib/loan-schedule.ts가 낸 그대로 */
  schedules: Schedule[];
  /** 이자가 가장 적은 방식과 가장 많은 방식 */
  cheapest: Schedule;
  dearest: Schedule;
  /** 두 방식의 총이자 차이(원) */
  spread: number;
  /** 원리금균등의 월 상환액 — 가장 많이 찾는 숫자 */
  monthly: number;
  /** 총이자가 원금의 몇 %인가(원리금균등 기준) */
  interestPct: number;
}

export function loanFacts(principal: number, rate: number, term: number): LoanFacts {
  const won = principal * 10_000;
  const months = term * 12;
  const schedules = compareAll({ principal: won, annualRate: rate, months });
  const byInterest = [...schedules].sort((a, b) => a.totalInterest - b.totalInterest);
  const ep = schedules.find(s => s.method === 'equal-payment')!;

  return {
    principal, rate, term, won, months, schedules,
    cheapest: byInterest[0],
    dearest: byInterest[byInterest.length - 1],
    spread: byInterest[byInterest.length - 1].totalInterest - byInterest[0].totalInterest,
    monthly: ep.firstPayment,
    interestPct: (ep.totalInterest / won) * 100,
  };
}

/**
 * 이웃 — 축마다 앞뒤 한 칸.
 *
 * 끝값은 반대쪽으로 감는다. 앞에서 N개만 뽑으면 목록 뒤쪽이 통째로 고아가 된다.
 */
export function neighborLoans(principal: number, rate: number, term: number): LoanCell[] {
  const step = <T,>(list: readonly T[], v: T, k: number): T =>
    list[(list.indexOf(v) + k + list.length) % list.length];
  return [
    { principal: step(PRINCIPALS, principal, -1), rate, term },
    { principal: step(PRINCIPALS, principal, 1), rate, term },
    { principal, rate: step(RATES, rate, -1), term },
    { principal, rate: step(RATES, rate, 1), term },
    { principal, rate, term: step(TERMS, term, -1) },
    { principal, rate, term: step(TERMS, term, 1) },
  ];
}
