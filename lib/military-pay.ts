/**
 * 병사 봉급과 장병내일준비적금.
 *
 * ── 왜 계산을 여기 두는가 ────────────────────────────────────
 * 화면에 두면 검사가 못 부른다. 이 계산은 **계급이 바뀌는 달**과 **적금 이자**가
 * 겹치는 자리라 눈으로는 맞는지 알 수 없다.
 *
 * ── 고시값은 한 곳에만 적는다 ────────────────────────────────
 * 봉급표가 바뀌면 PAY 한 곳만 고친다. 화면·FAQ·검사가 모두 이 값을 본다 —
 * 세금 계산기 넷에서 고시값이 여러 곳에 흩어져 있다가 버그가 났던 자리와 같다.
 *
 * ── 자료 (2026년, 2026-08-13에 두 갈래로 대조) ───────────────
 * 이병 75만 · 일병 90만 · 상병 120만 · 병장 150만. 2026년은 2025년과 같은 금액이
 * 유지됐다(간부와의 보수 격차를 고려한 동결).
 *
 * **적금 매칭은 자료마다 갈려서 규칙만 쓴다.** 「월 납입 한도 55만 원, 정부가
 * 납입액의 100%를 매칭」은 어느 자료에서나 같지만, 계급별 한도(이병 15만·일병
 * 20만·상병 35만·병장 55만)를 적은 자료도 있다. 어느 쪽이 지금 규정인지 확인하지
 * 못했으므로 **납입액을 입력으로 받고 100% 매칭만 계산한다** — 그러면 어느 규정
 * 아래에서도 「내가 55만 넣으면 얼마가 되나」에 정확히 답한다.
 * 자료가 갈릴 때 하나를 고르지 않는 것은 이 저장소의 규칙이다.
 */
import { BRANCHES, RANKS } from './discharge.ts';

/** 2026년 병 봉급(월, 원) — 계급 이름은 lib/discharge.ts의 RANKS와 맞춘다 */
export const PAY: Record<string, number> = {
  이등병: 750_000,
  일병: 900_000,
  상병: 1_200_000,
  병장: 1_500_000,
};

/** 장병내일준비적금 월 납입 한도(원) */
export const SAVINGS_MAX = 550_000;

/** 정부 매칭 비율 — 납입액의 100% */
export const MATCH_RATE = 1;

export interface RankMonths {
  rank: string;
  months: number;
  /** 그 계급의 월 봉급 */
  monthly: number;
  /** 그 계급으로 받는 총액 */
  total: number;
}

/**
 * 계급마다 몇 달을 지내는가.
 *
 * 정기진급 기간은 군별로 같으므로(이병 2 · 일병 6 · 상병 6) **복무가 긴 군일수록
 * 병장 기간이 길다** — 육군 18개월이면 병장 4개월, 공군 21개월이면 7개월이다.
 * 마지막 계급이 남은 기간을 채운다.
 *
 * 복무가 14개월보다 짧으면 병장을 못 단다. 그런 경우가 실제로 있진 않지만,
 * 남은 개월이 음수가 되어 총액이 줄어드는 것을 막으려고 0에서 자른다.
 */
export function rankMonths(serviceMonths: number): RankMonths[] {
  const out: RankMonths[] = [];
  let left = serviceMonths;
  for (const r of RANKS) {
    const months = Math.max(0, Math.min(r.months, left));
    if (months === 0) break;
    out.push({ rank: r.name, months, monthly: PAY[r.name], total: months * PAY[r.name] });
    left -= months;
  }
  if (left > 0) out.push({ rank: '병장', months: left, monthly: PAY.병장, total: left * PAY.병장 });
  return out;
}

/** 복무 기간 동안 받는 봉급 총액(원) */
export const totalPay = (serviceMonths: number): number =>
  rankMonths(serviceMonths).reduce((s, r) => s + r.total, 0);

export interface SavingsPlan {
  /** 내가 넣은 돈 */
  principal: number;
  /** 정부 매칭 지원금 */
  match: number;
  /** 이자 — 비과세, 단리 적금 */
  interest: number;
  /** 전역 때 받는 총액 */
  total: number;
}

/**
 * 적금 결과.
 *
 * ── 이자는 단리 적금 공식이다 ────────────────────────────────
 * 매달 같은 금액을 넣는 적금의 이자는 **첫 달 넣은 돈이 n달, 둘째 달이 n−1달…**
 * 놓이므로 개월 수의 합(n(n+1)/2)에 월이율을 곱한 값이다.
 *
 *   이자 = 월납입액 × (연이율 ÷ 12) × n(n+1)/2
 *
 * 원금 × 연이율 × 기간으로 셈하면 **두 배 가까이 크게 나온다** — 넣자마자 전액이
 * 놓여 있는 것으로 치는 셈이기 때문이다. 흔한 실수라 검사로 못 박았다.
 *
 * 매칭지원금에는 이자를 붙이지 않는다. 전역할 때 한 번에 나오는 돈이라
 * 은행 이자가 붙는 자리가 아니다 — 모르면 적게 잡는 쪽이 맞다.
 */
export function savings(months: number, monthly: number, annualRate: number): SavingsPlan {
  const n = Math.max(0, Math.floor(months));
  const m = Math.max(0, monthly);
  const principal = m * n;
  const match = Math.round(principal * MATCH_RATE);
  const interest = Math.round((m * (annualRate / 100 / 12) * (n * (n + 1))) / 2);
  return { principal, match, interest, total: principal + match + interest };
}

/** 군별 복무기간 — 화면이 고르는 목록. lib/discharge.ts의 것을 그대로 쓴다 */
export { BRANCHES };
