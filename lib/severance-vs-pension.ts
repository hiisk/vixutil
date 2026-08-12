/**
 * 퇴직금을 일시금으로 받을까, 연금으로 나눠 받을까.
 *
 * 이 사이트에는 퇴직금이 얼마인지, 일시금으로 받으면 세금이 얼마인지, 연금을 받을 때
 * 세금이 얼마인지가 이미 따로 있다. 정작 퇴직하는 사람이 고민하는 것은 그 셋이 아니라
 * **둘 중 어느 쪽이 유리한가**다. 이 파일은 그 하나에만 답한다.
 *
 * ── 왜 연금이 세금에서 유리한가 ─────────────────────────────
 * 퇴직금을 IRP에 넣어 두고 연금으로 받으면 퇴직소득세를 **깎아 준다**. 연금수령
 * 10년 이내에 받는 몫은 퇴직소득세의 70%만, 11년째부터 받는 몫은 60%만 낸다
 * (각각 30%·40% 감액). 세금이 없어지는 것이 아니라, 받을 때마다 그 몫에 해당하는
 * 세금을 나눠 내고 그 금액이 깎이는 구조다.
 *
 * 게다가 세금을 미루는 동안 그 돈이 계좌 안에서 굴러간다. 일시금은 세금을 먼저 떼고
 * 남은 돈만 손에 쥐지만, 연금은 세금 낼 몫까지 원금으로 남아 수익을 낸다.
 *
 * ── 계산 구조 ───────────────────────────────────────────
 *   일시금:  퇴직소득세를 한 번에 전액 낸다 → calcRetirementTax
 *   연금:    해마다 잔액을 남은 연수로 나눠 받는다
 *              받은 몫 중 이연퇴직소득 부분 → 퇴직소득세 × 감액률
 *              받은 몫 중 운용수익 부분     → 연금소득세(사적연금 저율 분리과세)
 *
 * 인출 순서는 법이 정한 대로 **이연퇴직소득이 먼저**다. 그래서 초반에는 감액된
 * 퇴직소득세만 붙고, 원금을 다 받은 뒤부터 운용수익에 연금소득세가 붙는다.
 *
 * 퇴직소득세 자체와 세율표는 lib/retirement-income-tax.ts, 연금소득세 규칙은
 * lib/pension-tax.ts의 것을 그대로 쓴다 — 같은 식을 두 곳에 적으면 한쪽만 고쳐질 때
 * 조용히 어긋난다. 이 파일에는 감액률만 새로 적는다.
 *
 * ── 박지 않은 값 ─────────────────────────────────────────
 * 운용수익률·연금 수령 기간·수령 시작 나이는 모두 입력으로 받는다. 수익률은 무엇에
 * 담느냐에 따라 갈리고, 수령 기간은 본인이 정하는 것이고, 나이는 연금소득세율을 바꾼다
 * (70세·80세에서 세율이 내려간다). 확인 못 한 값을 넣어 두면 결과가 답처럼 보인다.
 *
 * ── 반영하지 않은 것 ─────────────────────────────────────
 * 연금수령한도(평가액 ÷ (11 − 연금수령연차) × 120%)를 넘겨 받으면 그 초과분은
 * 연금외수령이 되어 감액 없이 퇴직소득세를 전액 낸다. 이 계산은 한도 안에서 받는다고
 * 보고 셈한다. 일시금을 받아 따로 굴리는 수익도 넣지 않았다 — 그 수익률과 세금이
 * 사람마다 달라서다. 그만큼 결과는 연금 쪽에 유리하게 기울어 있다.
 */

import { calcRetirementTax, type RetirementTaxResult } from './retirement-income-tax.ts';
import { calcPensionTax } from './pension-tax.ts';

/** 연금수령 10년 이내에 내는 퇴직소득세 비율 — 30% 감액 */
export const DEFERRED_RATE_EARLY = 0.7;

/** 11년째부터 내는 비율 — 40% 감액 */
export const DEFERRED_RATE_LATE = 0.6;

/** 감액이 한 번 더 커지는 연금수령연차 — 이 해부터 60%다 */
export const RATE_STEP_YEAR = 11;

/**
 * 연금수령 몇 년째냐에 따른 퇴직소득세 납부율.
 *
 * 연차는 1부터 센다. 10년째까지는 70%, 11년째부터는 60%다. 문턱이 한 해 차이로
 * 움직이므로 검사가 양쪽에서 밟는다.
 */
export function deferredTaxRate(pensionYear: number): number {
  return pensionYear >= RATE_STEP_YEAR ? DEFERRED_RATE_LATE : DEFERRED_RATE_EARLY;
}

export interface SeveranceVsPensionInput {
  /** 퇴직급여(퇴직소득금액) — 비과세 제외 후, 원 */
  payout: number;
  /** 근속 개월 수 */
  serviceMonths: number;
  /** 연금으로 나눠 받을 기간(년) */
  pensionYears: number;
  /** 연금계좌 연 운용수익률 (0.04 = 연 4%). 손실도 넣어 볼 수 있게 음수를 막지 않는다 */
  returnRate: number;
  /** 연금 수령을 시작하는 나이(만) — 연금소득세율이 나이에 따라 내려간다 */
  startAge: number;
}

export interface PensionYearRow {
  /** 연금수령연차 (1부터) */
  year: number;
  /** 그 해 나이 */
  age: number;
  /** 그 해 수령액(세전, 원) */
  gross: number;
  /** 그중 이연퇴직소득 몫(원) */
  fromDeferred: number;
  /** 그중 운용수익 몫(원) */
  fromGain: number;
  /** 그 해에 적용된 퇴직소득세 납부율 */
  deferredRate: number;
  /** 이연퇴직소득 몫에 붙은 세금(원) */
  severanceTax: number;
  /** 운용수익 몫에 붙은 연금소득세(원) */
  pensionTax: number;
  /** 그 해 세후 수령액(원) */
  net: number;
}

export interface PensionSide {
  /** 나눠 받은 기간(년) */
  years: number;
  /** 세전 총 수령액(원) = 퇴직금 + 운용수익 */
  grossTotal: number;
  /** 운용수익 합계(원). 손실이면 음수 */
  gainTotal: number;
  /** 나눠 낸 퇴직소득세 합계(원) */
  severanceTax: number;
  /** 운용수익에 붙은 연금소득세 합계(원) */
  pensionTax: number;
  /** 세금 합계(원) */
  totalTax: number;
  /** 세후 총 수령액(원) */
  net: number;
  /** 세후 평균 월 수령액(원) */
  netMonthly: number;
  /** 실제로 적용된 평균 퇴직소득세 납부율 — 감액이 얼마나 먹혔는지 */
  avgDeferredRate: number;
  /** 연차별 내역 */
  rows: PensionYearRow[];
}

/**
 * 연금으로 나눠 받을 때 손에 남는 돈.
 *
 * 해마다 남은 잔액을 남은 연수로 나눠 받는다. 그러면 마지막 해에 계좌가 정확히 비고,
 * 운용수익률이 0이면 매년 똑같은 금액이 된다 — 검사가 그 되짚기를 쓴다.
 */
export function calcPensionSide(input: SeveranceVsPensionInput): PensionSide {
  const payout = Math.max(0, input.payout);
  // 0.5년처럼 쪼갠 기간은 연차 셈이 흔들린다 — 해 단위로 내린다
  const years = Math.max(0, Math.floor(input.pensionYears));
  // 일시금으로 받았다면 낼 세금. 감액은 이 금액에 걸린다
  const lumpTax = calcRetirementTax({ payout, serviceMonths: input.serviceMonths }).totalTax;

  /** 아직 안 받은 이연퇴직소득 원금 */
  let deferred = payout;
  /** 계좌에 쌓인 운용수익 */
  let gain = 0;

  const rows: PensionYearRow[] = [];
  let grossTotal = 0;
  let gainTotal = 0;
  let severanceTax = 0;
  let pensionTax = 0;
  let deferredWithdrawn = 0;
  let rateWeighted = 0;

  for (let year = 1; year <= years; year++) {
    // 그 해 수익은 아직 안 받은 잔액 전체에 붙는다 — 세금 낼 몫까지 굴러가는 것이 연금의 이득이다
    const earned = (deferred + gain) * input.returnRate;
    gain += earned;
    gainTotal += earned;

    const gross = Math.max(0, (deferred + gain) / (years - year + 1));
    // 법이 정한 인출 순서 — 이연퇴직소득이 먼저 나가고 운용수익이 나중이다
    const fromDeferred = Math.min(gross, Math.max(0, deferred));
    const fromGain = gross - fromDeferred;

    const rate = deferredTaxRate(year);
    /*
     * 이연퇴직소득세는 원금을 받은 비율만큼 나눠 낸다. lumpTax는 지방소득세를 포함한
     * 값이고 지방소득세도 퇴직소득세를 따라 붙으므로, 감액률을 총세금에 곱하는 것과
     * 소득세에 곱한 뒤 10%를 얹는 것이 같다.
     */
    const sTax = payout > 0 ? lumpTax * (fromDeferred / payout) * rate : 0;
    /*
     * 운용수익 몫은 사적연금 연금소득세다. 이연퇴직소득은 연 1,500만원 분리과세 한도를
     * 셀 때 빼기 때문에 fromGain만 넣는 것이 맞다. 공적연금과 그 밖의 소득은 사람마다
     * 달라 0으로 두고 사적연금 몫만 가져온다 — 그 둘까지 보려면 연금소득세 계산기다.
     */
    const pTax = calcPensionTax({
      publicAnnual: 0,
      privateAnnual: fromGain,
      age: input.startAge + year - 1,
      otherIncome: 0,
      personalDeduction: 0,
    }).privateTax;

    deferred -= fromDeferred;
    gain -= fromGain;

    grossTotal += gross;
    severanceTax += sTax;
    pensionTax += pTax;
    deferredWithdrawn += fromDeferred;
    rateWeighted += fromDeferred * rate;

    rows.push({
      year,
      age: input.startAge + year - 1,
      gross,
      fromDeferred,
      fromGain,
      deferredRate: rate,
      severanceTax: sTax,
      pensionTax: pTax,
      net: gross - sTax - pTax,
    });
  }

  const totalTax = severanceTax + pensionTax;
  const net = grossTotal - totalTax;

  return {
    years,
    grossTotal,
    gainTotal,
    severanceTax,
    pensionTax,
    totalTax,
    net,
    netMonthly: years > 0 ? net / (years * 12) : 0,
    avgDeferredRate: deferredWithdrawn > 0 ? rateWeighted / deferredWithdrawn : 0,
    rows,
  };
}

/**
 * 세후 금액이 큰 쪽을 고른다.
 *
 * 1원 미만 차이는 무승부로 본다 — 퇴직소득세는 원 단위로 절사하므로 끝자리가 남는다.
 * 퇴직소득세가 0인 경우(근속연수공제가 퇴직금보다 클 때)에는 감액할 세금이 없어
 * 운용수익이 없으면 실제로 두 쪽이 같아진다.
 */
export function betterChoice(pensionNet: number, lumpNet: number): 'pension' | 'lump' | 'tie' {
  if (Math.abs(pensionNet - lumpNet) < 1) return 'tie';
  return pensionNet > lumpNet ? 'pension' : 'lump';
}

export interface Comparison {
  /** 일시금 쪽 — 퇴직소득세 계산 결과를 그대로 담는다 */
  lump: RetirementTaxResult;
  /** 연금 쪽 */
  pension: PensionSide;
  /** 연금 세후 − 일시금 세후(원). 양수면 연금이 앞선다 */
  diff: number;
  /** 유리한 쪽 */
  better: 'pension' | 'lump' | 'tie';
}

export function compare(input: SeveranceVsPensionInput): Comparison {
  const lump = calcRetirementTax({
    payout: Math.max(0, input.payout),
    serviceMonths: input.serviceMonths,
  });
  const pension = calcPensionSide(input);
  return {
    lump,
    pension,
    diff: pension.net - lump.netPayout,
    better: betterChoice(pension.net, lump.netPayout),
  };
}

/**
 * 몇 년에 걸쳐 받으면 연금 쪽이 일시금을 넘어서는가.
 *
 * 1년부터 늘려 가며 처음으로 앞서는 해를 낸다. 감액만으로도 대개 1년째에 앞서지만,
 * 계좌가 손실을 보는 경우에는 끝까지 못 넘을 수 있어 그때는 null을 낸다.
 */
export function breakevenYears(input: SeveranceVsPensionInput, maxYears = 40): number | null {
  const lumpNet = calcRetirementTax({
    payout: Math.max(0, input.payout),
    serviceMonths: input.serviceMonths,
  }).netPayout;

  for (let years = 1; years <= maxYears; years++) {
    if (betterChoice(calcPensionSide({ ...input, pensionYears: years }).net, lumpNet) === 'pension') {
      return years;
    }
  }
  return null;
}

export interface CompareRow {
  years: number;
  /** 세후 총 수령액(원) */
  net: number;
  /** 세금 합계(원) */
  totalTax: number;
  /** 세후 평균 월 수령액(원) */
  netMonthly: number;
  /** 적용된 평균 퇴직소득세 납부율 */
  avgDeferredRate: number;
  /** 일시금 세후와의 차액(원) */
  diff: number;
}

/**
 * 수령 기간을 바꿔 가며 나란히 놓는다.
 *
 * 10년과 11년을 함께 넣어 보면 감액이 30%에서 40%로 커지는 문턱이 그대로 보인다.
 */
export function compareTable(input: SeveranceVsPensionInput, yearsList: number[]): CompareRow[] {
  const lumpNet = calcRetirementTax({
    payout: Math.max(0, input.payout),
    serviceMonths: input.serviceMonths,
  }).netPayout;

  return yearsList.map(years => {
    const p = calcPensionSide({ ...input, pensionYears: years });
    return {
      years,
      net: p.net,
      totalTax: p.totalTax,
      netMonthly: p.netMonthly,
      avgDeferredRate: p.avgDeferredRate,
      diff: p.net - lumpNet,
    };
  });
}
