/**
 * 태양광 발전 수익 — 몇 년에 본전을 뽑나.
 *
 * ── 아끼는 돈은 발전량 × 단가가 아니다 ──────────────────────────
 * 주택용 전기요금은 누진제라, 태양광으로 사용량이 줄면 **가장 비싼 구간부터**
 * 깎인다. 월 500kWh 쓰는 집에서 100kWh를 덜 쓰면 3단계 단가(307원대)가
 * 지워지고, 월 200kWh 쓰는 집에서 100kWh를 덜 쓰면 1단계 단가(120원대)가
 * 지워진다. **같은 설비, 같은 발전량인데 절감액이 두 배 넘게 벌어진다.**
 * 400kWh 경계를 아래로 넘기면 기본요금까지 7,300원에서 1,600원으로 내려간다.
 * 그 덕에 절감액은 사용량에 대해 단조롭게 늘지 않는다 — 월 500kWh 집이 경계를
 * 넘겨 내려가면서 기본요금 차액까지 챙기므로, 550kWh 집보다 더 아낀다.
 * 버그로 보이는 자리지만 요금표가 그렇게 생겼다(검사에서 그 자리를 따로 본다).
 *
 * 그래서 평균 단가를 곱하지 않는다. 요금표는 lib/electricity-tariff.ts 한 벌을
 * 그대로 쓴다 — 태양광 있을 때와 없을 때의 청구액을 각각 내서 그 차이를 절감액으로
 * 본다. 표를 여기 다시 적으면 한전 요금이 개정될 때 한쪽만 고쳐진다.
 *
 * ── 남는 발전은 버린다고 본다 ───────────────────────────────────
 * 그 달 발전량이 사용량보다 많으면 넘치는 만큼은 **요금을 더 깎아 주지 않는다**고
 * 본다. 베란다형·주택형 자가소비 설비는 계량기 안쪽에서 쓰는 전기를 상쇄할 뿐이고,
 * 남는 전기를 한전이 사 주는 상계거래는 따로 신청해야 하기 때문이다. 상계거래를
 * 하고 있다면 이 계산은 실제보다 적게 나온다 — 보수적으로 잡은 쪽이다.
 * 사용량이 0이 되어도 기본요금은 남으므로, 절감액은 결코 전기요금 총액을 넘지 않는다.
 *
 * ── 열두 달을 평균으로 본다 ─────────────────────────────────────
 * 누진은 달마다 따로 걸리는데, 실제로는 여름에 많이 쓰고 겨울에 발전이 적다.
 * 이 계산은 사용량과 발전량을 열두 달에 고르게 나눠 본다. 사용량 편차가 큰 집은
 * 많이 쓰는 달에 더 크게 깎이므로 실제 절감액이 이 값보다 클 수 있다.
 *
 * ── 박아 두지 않은 값들 ─────────────────────────────────────────
 * 설치비 단가, 보조금(지자체마다 다르다), 일일 발전시간은 모두 입력으로 받는다.
 * 특히 **일일 발전시간**은 지역(일사량)과 설치 방향·경사, 그늘, 패널 온도에 따라
 * 갈린다 — 남향 지붕과 동향 베란다 난간이 같을 수 없다. 확인 못 한 숫자를
 * 기본값으로 박아 두면 그 값이 그대로 답처럼 보이므로 넣지 않았다.
 */
// 검사에서 node --test로 이 파일을 바로 실행하므로 확장자를 붙인다
import { calcElectricity } from './electricity-tariff.ts';

export interface SolarInput {
  /** 설치 용량(kW) */
  capacityKw: number;
  /** 설치비(원) — 보조금을 뺀 실부담액 */
  installCost: number;
  /** 월 평균 전기 사용량(kWh) */
  monthlyKwh: number;
  /** 일일 발전시간(시간/일) — 지역·방향에 따라 다르므로 받는다 */
  sunHours: number;
  /** 발전량 감소율(연, 0.005 = 연 0.5%) */
  degradation: number;
  /** 보유 연수 */
  years: number;
}

/** 한 해가 며칠인가 — 발전량을 낼 때 쓴다 */
export const DAYS_PER_YEAR = 365;

/** 연간 발전량(kWh) = 용량 × 일일 발전시간 × 365 */
export const annualGeneration = (capacityKw: number, sunHours: number): number =>
  capacityKw * sunHours * DAYS_PER_YEAR;

/** n년차 발전량 — 해마다 감소율만큼 줄어든다(1년차는 그대로) */
export const generationInYear = (annualKwh: number, degradation: number, year: number): number =>
  annualKwh * (1 - degradation) ** (year - 1);

export interface MonthlySaving {
  /** 태양광 없을 때의 월 청구액(원) */
  billBefore: number;
  /** 태양광 있을 때의 월 청구액(원) */
  billAfter: number;
  /** 그 달 절감액(원) */
  saving: number;
  /** 요금을 깎는 데 실제로 쓰인 발전량(kWh) */
  selfUsedKwh: number;
  /** 사용량을 넘겨 버려진 발전량(kWh) */
  wastedKwh: number;
}

/**
 * 한 달치 절감액.
 *
 * 태양광이 있을 때와 없을 때의 청구액을 각각 누진표로 내서 뺀다. 발전량이
 * 사용량을 넘으면 요금 대상 사용량은 0에서 멈추고 남는 발전은 버려진다.
 */
export function monthlySaving(monthlyKwh: number, monthlyGenKwh: number): MonthlySaving {
  const selfUsedKwh = Math.min(monthlyGenKwh, monthlyKwh);
  const billBefore = calcElectricity(monthlyKwh).total;
  const billAfter = calcElectricity(monthlyKwh - selfUsedKwh).total;
  return {
    billBefore,
    billAfter,
    saving: billBefore - billAfter,
    selfUsedKwh,
    wastedKwh: monthlyGenKwh - selfUsedKwh,
  };
}

/** 그 해 발전량으로 아끼는 1년치 금액(원) — 열두 달로 고르게 나눠 본다 */
export function yearSaving(monthlyKwh: number, yearGenKwh: number): number {
  return monthlySaving(monthlyKwh, yearGenKwh / 12).saving * 12;
}

export interface YearRow {
  /** 몇 년차 */
  year: number;
  /** 그 해 발전량(kWh) */
  genKwh: number;
  /** 그 해 절감액(원) */
  saving: number;
  /** 그 해까지의 누적 절감액(원) */
  cumulative: number;
  /** 버려진 발전량(kWh) — 0이 아니면 설비가 사용량보다 크다 */
  wastedKwh: number;
}

export interface SolarPayback {
  /** 1년차 발전량(kWh) */
  annualKwh: number;
  /** 1년차 절감액(원) */
  firstYearSaving: number;
  /** 태양광 없을 때의 월 청구액(원) */
  billBefore: number;
  /** 1년차 월 청구액(원) */
  billAfter: number;
  /**
   * 실제로 요금을 깎아 준 1kWh의 값(원/kWh).
   *
   * 이 집의 누진 위치가 그대로 드러나는 숫자다 — 많이 쓰는 집은 300원대,
   * 적게 쓰는 집은 100원대가 나온다. 발전량을 다 쓰지 못하면 더 내려간다.
   */
  effectiveRate: number;
  /** 해마다의 발전량·절감액·누적 */
  rows: YearRow[];
  /** 보유 연수 동안의 누적 절감액(원) */
  totalSaving: number;
  /** 회수 기간(년) — 보유 연수 안에 못 닿으면 null */
  paybackYears: number | null;
  /** 보유 연수 끝의 순이익(원) = 누적 절감액 − 설치비 */
  netProfit: number;
}

export function solarPayback(input: SolarInput): SolarPayback {
  const { capacityKw, installCost, monthlyKwh, sunHours, degradation, years } = input;
  const annualKwh = annualGeneration(capacityKw, sunHours);

  const rows: YearRow[] = [];
  let cumulative = 0;
  for (let year = 1; year <= Math.floor(years); year++) {
    const genKwh = generationInYear(annualKwh, degradation, year);
    const m = monthlySaving(monthlyKwh, genKwh / 12);
    const saving = m.saving * 12;
    cumulative += saving;
    rows.push({ year, genKwh, saving, cumulative, wastedKwh: m.wastedKwh * 12 });
  }

  const first = monthlySaving(monthlyKwh, annualKwh / 12);

  return {
    annualKwh,
    firstYearSaving: first.saving * 12,
    billBefore: first.billBefore,
    billAfter: first.billAfter,
    effectiveRate: first.selfUsedKwh > 0 ? first.saving / first.selfUsedKwh : 0,
    rows,
    totalSaving: cumulative,
    paybackYears: paybackYears(input),
    netProfit: cumulative - installCost,
  };
}

/**
 * t년까지의 누적 절감액(원). t는 소수여도 된다.
 *
 * 회수 기간을 해 단위로만 내면 "3년차 어딘가"까지밖에 말할 수 없어, 마지막 해는
 * 절감액이 고르게 쌓인다고 보고 잘라 쓴다. 회수 기간을 되짚을 때도 이 함수를 쓴다.
 */
export function cumulativeSaving(input: SolarInput, t: number): number {
  const annualKwh = annualGeneration(input.capacityKw, input.sunHours);
  const whole = Math.floor(t);
  let sum = 0;
  for (let year = 1; year <= whole; year++) {
    sum += yearSaving(input.monthlyKwh, generationInYear(annualKwh, input.degradation, year));
  }
  const frac = t - whole;
  if (frac > 0) {
    sum += frac * yearSaving(input.monthlyKwh, generationInYear(annualKwh, input.degradation, whole + 1));
  }
  return sum;
}

/**
 * 회수 기간(년). 보유 연수 안에 설치비를 못 채우면 **null**을 낸다.
 *
 * 20년을 넘겨야 본전이 되는 설비인데 "22.4년"이라고 적어 주면, 패널 보증도
 * 인버터 수명도 넘긴 숫자를 답처럼 읽게 된다. 없는 것은 없다고 낸다.
 */
export function paybackYears(input: SolarInput): number | null {
  const annualKwh = annualGeneration(input.capacityKw, input.sunHours);
  let cumulative = 0;
  for (let year = 1; year <= Math.floor(input.years); year++) {
    const saving = yearSaving(input.monthlyKwh, generationInYear(annualKwh, input.degradation, year));
    if (saving <= 0) continue;
    if (cumulative + saving >= input.installCost) {
      return year - 1 + (input.installCost - cumulative) / saving;
    }
    cumulative += saving;
  }
  return null;
}
