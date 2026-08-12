/**
 * 출산전후휴가 급여 — 근로기준법 제74조 · 고용보험법 제75조·제76조.
 *
 * ── 왜 셈이 페이지가 아니라 이 파일에 있나 ─────────────────
 * 이 저장소의 계산기 화면은 'use client' 페이지다. node가 불러올 수 없어서
 * **페이지 본문에 박힌 셈은 어떤 검사도 보지 못한다.** 2026-08-12에 취득세
 * 계산기가 정확히 그 구조 때문에 100배 버그로 검사 3,013개를 통과했고(7억
 * 주택의 취득세를 32억으로 냈다), 같은 자리에서 종부세를 초과누진이 아니라
 * 전체 과세표준에 한 세율을 곱해 내던 것도 나왔다(lib/holding-tax.ts 첫 주석).
 * 그래서 이 계산기는 처음부터 셈을 여기 두고, 페이지는 값을 받아 그리기만 한다.
 *
 * ── 육아휴직(lib 없음 · /calculator/parental-leave)과 다른 제도다 ──
 * 출산전후휴가는 **근로기준법이 정한 휴가**이고 그 기간의 급여를 고용보험이
 * 일부·전부 대신 준다. 육아휴직은 그 휴가가 끝난 뒤에 따로 쓰는 별개 제도다.
 * 기간·지급률·상한액이 모두 다르므로 두 계산이 섞이면 안 된다.
 *
 * ── 이 셈의 뼈대 ──────────────────────────────────────────
 * 1. 휴가일수가 법으로 정해져 있다 — 단태아 90일, 다태아 120일.
 * 2. 그 가운데 **앞쪽 60일(다태아 75일)은 유급**이다. 회사가 통상임금을
 *    보장해야 하는 구간이고, 뒤쪽 30일(45일)은 무급이다.
 * 3. 고용보험이 통상임금 100% 상당액을 대신 주는데 **월 상한액과 하한액**이
 *    있다. 누가 얼마를 부담하는지는 사업장 규모로 갈린다:
 *      우선지원대상기업 → 고용보험이 전 기간(90일·120일)을 준다
 *      그 밖의 기업     → 고용보험은 유급기간을 넘은 일수(30일·45일)만 준다
 * 4. **유급기간에는 회사가 차액을 메운다.** 고용보험이 상한액까지만 주므로
 *    통상임금이 상한을 넘으면 그 차액이 회사 몫이다. 무급기간에는 차액을
 *    메워 주지 않으므로 근로자가 받는 돈이 통상임금보다 적어진다.
 *
 * ── 해마다 바뀌는 값은 인자로 받는다 ──────────────────────
 * 상한액·하한액·최저시급은 고시로 바뀌고, 휴가일수와 유급일수는 법 개정 때
 * 바뀐다. 그래서 전부 인자로 받을 수 있게 두고, 화면이 넘기지 않으면 아래
 * 상수를 쓴다. 화면에는 상한액·하한액을 직접 고칠 수 있는 칸을 두었다.
 *
 * **우선지원대상기업 요건(상시근로자 수)은 여기 적지 않았다.** 업종별 기준이
 * 자주 손질되고 상시근로자 수를 세는 규칙도 따로 있어서, 지어내는 대신 화면에서
 * 예·아니오로 받는다.
 *
 * ── 상한액이 하한액보다 낮아질 수 있다 (지금이 그렇다) ────
 * 하한액은 최저임금에 연동되므로 **최저임금이 오르는데 상한액 고시가 그대로면
 * 하한이 상한을 넘는다.** 2026년 최저시급 10,320원의 월 환산액은 2,156,880원인데
 * 아래 MONTHLY_CAP은 2,100,000원이다. 이런 상태는 고시가 낡았다는 신호이므로
 * 결과에 floorAboveCap으로 실어 화면이 "통지서 값으로 바꿔 넣으라"고 알린다.
 *
 * 그때 어느 쪽이 이기나 — **하한이 이긴다.** 하한 규정의 목적이 최저임금 보장이고,
 * 상한에 깎여 최저임금 아래로 내려가면 그 목적이 사라진다. 그리고 이 순서여야
 * 통상임금이 오를 때 급여가 줄지 않는다(반대로 두면 하한 바로 위에서 급여가
 * 떨어지는 자리가 생긴다 — tests/maternity-leave.test.ts가 그 단조성을 지킨다).
 */

import { LEGAL_DAILY, LEGAL_WEEKLY, commonWage, monthlyHoursRounded } from './statutory-hours.ts';

/**
 * 월 통상임금을 일액으로 바꿀 때 나누는 수.
 * 출산전후휴가급여는 역일(달력 날짜)로 세고 한 달을 30일로 본다.
 */
export const DAYS_PER_MONTH = 30;

/** 총 휴가일수 — 한 번에 둘 이상 임신하면 120일 (근로기준법 제74조 제1항) */
export const LEAVE_DAYS = { single: 90, multiple: 120 } as const;

/** 출산 후에 남겨 두어야 하는 최소 일수 (근로기준법 제74조 제1항) */
export const AFTER_BIRTH_MIN_DAYS = { single: 45, multiple: 60 } as const;

/** 유급 일수 — 휴가 중 최초 60일, 다태아는 75일 (근로기준법 제74조 제4항) */
export const PAID_LEAVE_DAYS = { single: 60, multiple: 75 } as const;

/**
 * 고용보험이 주는 30일분 상한액(원).
 *
 * 2023년부터 210만원이다. **2026년 고시를 확인하지 못했다** — 위 주석의
 * "상한액이 하한액보다 낮아질 수 있다"를 함께 읽어라. 화면에서 고칠 수 있다.
 */
export const MONTHLY_CAP = 2_100_000;

/*
 * 최저시급은 lib/minimum-wage.ts에서 가져온다 — 하한액을 낼 때만 쓴다.
 *
 * 처음에는 이 파일에 10_320을 다시 적고 "두 곳을 함께 고쳐야 한다"는 주석을
 * 달았다. 최저임금은 해마다 바뀌므로 그 주석은 언젠가 잊히고, 그러면 하한액만
 * 조용히 작년 값으로 남는다. 그래서 값을 lib으로 모았다.
 */
export { MIN_HOURLY_WAGE } from './minimum-wage.ts';
import { MIN_HOURLY_WAGE } from './minimum-wage.ts';

/**
 * 유산·사산 휴가 일수 — 임신기간이 짧으면 휴가도 짧다.
 * (근로기준법 제74조 제3항 · 시행령 제43조 제3항)
 */
export const MISCARRIAGE_LEAVE: { untilWeek: number; days: number }[] = [
  { untilWeek: 11, days: 5 },
  { untilWeek: 15, days: 10 },
  { untilWeek: 21, days: 30 },
  { untilWeek: 27, days: 60 },
  { untilWeek: Infinity, days: 90 },
];

/** 배우자 출산휴가 일수 — 근로일 기준 (근로기준법 제18조의2, 2025.2.23 시행) */
export const SPOUSE_LEAVE_DAYS = 20;

/** 임신기간(주)에 해당하는 유산·사산 휴가 일수 */
export function miscarriageLeaveDays(pregnancyWeeks: number): number {
  const w = Math.max(0, pregnancyWeeks);
  return MISCARRIAGE_LEAVE.find(r => w <= r.untilWeek)!.days;
}

/**
 * 하한액 — 통상임금이 최저임금에 못 미치면 최저임금액으로 올려 준다.
 *
 * 법이 **시간급**으로 견주므로 소정근로시간이 짧으면 하한도 함께 낮아진다.
 * 단시간근로자에게 주 40시간짜리 하한을 물리면 통상임금의 두 배가 나온다.
 */
export function monthlyMinimumWage(
  minHourly = MIN_HOURLY_WAGE,
  weeklyHours = LEGAL_WEEKLY,
): number {
  return minHourly * monthlyHoursRounded(weeklyHours);
}

/**
 * 고용보험이 주는 30일분 급여 — 통상임금에 상한과 하한을 물린 금액.
 *
 * 통상임금이 0이면 0이다. 입력이 비었다는 뜻이므로 하한을 얹지 않는다.
 */
export function eiMonthlyBenefit(
  monthlyWage: number,
  cap = MONTHLY_CAP,
  floor = monthlyMinimumWage(),
): number {
  if (monthlyWage <= 0) return 0;
  return Math.max(floor, Math.min(cap, monthlyWage));
}

/** 급여를 나눠 보여 주는 구간 — 유급기간과 무급기간으로 갈린다 */
export interface LeaveBlock {
  /** 예: '1~60일' */
  label: string;
  /** 이 구간의 일수 */
  days: number;
  /** 유급기간인가 — 회사가 통상임금을 보장해야 하는 구간 */
  paid: boolean;
  /** 고용보험이 주는 금액(원) */
  ei: number;
  /** 회사가 주는 금액(원) */
  employer: number;
  /** 이 구간에 받는 총액(원) */
  total: number;
}

export interface MaternityInput {
  /** 월 통상임금(원) — 휴가 시작일 기준 */
  monthlyWage: number;
  /** 한 번에 둘 이상 임신했나 */
  multiple?: boolean;
  /** 우선지원대상기업인가 — 요건은 고용센터에서 확인한다 */
  priorityFirm?: boolean;
  /** 총 휴가일수(일). 안 넘기면 법정 일수 */
  totalDays?: number;
  /** 유급 일수(일). 안 넘기면 법정 일수. 총 휴가일수보다 크면 총 휴가일수로 깎는다 */
  paidDays?: number;
  /** 고용보험 30일분 상한액(원). 안 넘기면 MONTHLY_CAP */
  monthlyCap?: number;
  /** 고용보험 30일분 하한액(원). 안 넘기면 최저시급 × 월 소정근로시간 */
  monthlyFloor?: number;
  /** 주 소정근로시간 — 하한액을 낼 때만 쓴다. 안 넘기면 40시간 */
  weeklyHours?: number;
}

export interface MaternityResult {
  /** 총 휴가일수 */
  totalDays: number;
  /** 유급 일수 */
  paidDays: number;
  /** 무급 일수 */
  unpaidDays: number;
  /** 출산 후에 남겨야 하는 최소 일수 */
  afterBirthMinDays: number;
  /** 일 통상임금(원) — 월 통상임금 ÷ 30 */
  dailyWage: number;
  /** 쓴 상한액(원) */
  monthlyCap: number;
  /** 쓴 하한액(원) */
  monthlyFloor: number;
  /** 고용보험 30일분 지급액(원) */
  eiMonthly: number;
  /** 고용보험 일 지급액(원) */
  eiDaily: number;
  /** 고용보험이 지급하는 일수 */
  eiDays: number;
  /** 상한에 걸렸나 */
  capped: boolean;
  /** 하한이 올려 줬나 */
  flooredUp: boolean;
  /** 하한이 상한보다 크다 — 상한액 고시가 낡았다는 신호 */
  floorAboveCap: boolean;
  /** 유급·무급 구간별 내역 */
  blocks: LeaveBlock[];
  /** 고용보험이 주는 총액(원) */
  eiTotal: number;
  /** 회사가 주는 총액(원) */
  employerTotal: number;
  /** 근로자가 받는 총액(원) */
  total: number;
  /** 휴가 기간을 통상임금으로 다 받았다면(원) — 견줘 볼 값 */
  fullWage: number;
  /** 통상임금 대비 부족액(원) */
  shortfall: number;
}

/**
 * 출산전후휴가(유산·사산 휴가) 급여.
 *
 * 유산·사산 휴가도 같은 뼈대다 — 휴가일수만 임신기간으로 갈리고, 유급기간과
 * 고용보험 부담 규칙은 출산전후휴가와 같은 조항을 쓴다. 그래서 일수를 인자로
 * 받아 한 함수가 둘을 함께 센다.
 */
export function calcMaternityLeave({
  monthlyWage,
  multiple = false,
  priorityFirm = true,
  totalDays,
  paidDays,
  monthlyCap = MONTHLY_CAP,
  monthlyFloor,
  weeklyHours = LEGAL_WEEKLY,
}: MaternityInput): MaternityResult {
  const key = multiple ? 'multiple' : 'single';
  const wage = Math.max(0, monthlyWage);
  const floor = monthlyFloor ?? monthlyMinimumWage(MIN_HOURLY_WAGE, weeklyHours);

  const total = Math.max(0, Math.round(totalDays ?? LEAVE_DAYS[key]));
  /* 유산·사산 휴가처럼 휴가가 유급기간보다 짧으면 전부 유급이다 */
  const paid = Math.min(Math.max(0, Math.round(paidDays ?? PAID_LEAVE_DAYS[key])), total);
  const unpaid = total - paid;

  const dailyWage = wage / DAYS_PER_MONTH;
  const eiMonthly = eiMonthlyBenefit(wage, monthlyCap, floor);
  const eiDaily = eiMonthly / DAYS_PER_MONTH;

  /*
   * 고용보험이 어느 일수를 대신 주는가.
   * 우선지원대상기업은 전 기간, 그 밖의 기업은 유급기간을 넘은 일수만 준다.
   */
  const eiPaidDays = priorityFirm ? paid : 0;
  const eiDays = eiPaidDays + unpaid;

  const blocks: LeaveBlock[] = [];
  let from = 1;
  for (const [days, isPaid] of [[paid, true], [unpaid, false]] as const) {
    if (days <= 0) continue;
    const ei = Math.round(eiDaily * (isPaid ? eiPaidDays : days));
    /*
     * 유급기간에는 통상임금을 보장해야 하므로 회사가 차액을 메운다.
     * 무급기간에는 메워 주지 않는다 — 그래서 여기서 통상임금과 벌어진다.
     * 고용보험 지급액이 통상임금을 넘으면(하한이 올려 준 경우) 회사 몫은 0이다.
     */
    const employer = isPaid ? Math.max(0, Math.round(dailyWage * days) - ei) : 0;
    blocks.push({
      label: `${from}~${from + days - 1}일`,
      days,
      paid: isPaid,
      ei,
      employer,
      total: ei + employer,
    });
    from += days;
  }

  const eiTotal = blocks.reduce((s, b) => s + b.ei, 0);
  const employerTotal = blocks.reduce((s, b) => s + b.employer, 0);
  const fullWage = Math.round(dailyWage * total);

  return {
    totalDays: total,
    paidDays: paid,
    unpaidDays: unpaid,
    afterBirthMinDays: AFTER_BIRTH_MIN_DAYS[key],
    dailyWage,
    monthlyCap,
    monthlyFloor: floor,
    eiMonthly,
    eiDaily,
    eiDays,
    capped: wage > 0 && eiMonthly < wage,
    flooredUp: wage > 0 && eiMonthly > wage,
    floorAboveCap: floor > monthlyCap,
    blocks,
    eiTotal,
    employerTotal,
    total: eiTotal + employerTotal,
    fullWage,
    shortfall: Math.max(0, fullWage - (eiTotal + employerTotal)),
  };
}

export interface SpouseLeaveResult {
  /** 휴가일수(근로일) */
  days: number;
  /** 통상시급(원) */
  hourly: number;
  /** 하루치 통상임금(원) — 통상시급 × 8시간 */
  dailyWage: number;
  /** 받는 총액(원) */
  total: number;
}

/**
 * 배우자 출산휴가 — **유급**이므로 근로자는 통상임금 전액을 받는다.
 *
 * 그래서 상한액이 근로자 수령액을 깎지 않는다. 고용보험이 그 가운데 얼마를
 * 회사 대신 주는지는 회사와 고용센터 사이의 분담 문제이고, 지원 일수와 상한액이
 * 개정을 거듭해 확신할 수 없어서 여기서는 세지 않는다.
 *
 * 출산전후휴가와 달리 **근로일**로 세는 휴가라 일액을 월÷30으로 내면 안 된다.
 * 통상시급(월 통상임금 ÷ 월 소정근로시간)에 하루 8시간을 곱한다.
 */
export function calcSpouseLeave({
  monthlyWage,
  days = SPOUSE_LEAVE_DAYS,
  weeklyHours = LEGAL_WEEKLY,
}: {
  monthlyWage: number;
  days?: number;
  weeklyHours?: number;
}): SpouseLeaveResult {
  const wage = Math.max(0, monthlyWage);
  const d = Math.max(0, Math.round(days));
  const { hourly } = commonWage(wage, weeklyHours);
  const dailyWage = hourly * LEGAL_DAILY;
  return { days: d, hourly, dailyWage, total: Math.round(dailyWage * d) };
}
