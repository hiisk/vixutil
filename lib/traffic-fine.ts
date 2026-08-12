/**
 * 교통 범칙금·과태료와 벌점.
 *
 * 고지서를 받고 가장 먼저 찾는 것은 "얼마"지만, 정작 돈이 걸린 결정은 금액이
 * 아니다. **범칙금과 과태료 중 어느 쪽으로 낼 것인가**다.
 *
 * ── 두 가지가 왜 다른가 ─────────────────────────────────────
 * 범칙금은 경찰이 **운전자를 특정해** 통고하는 것이라 벌점이 함께 붙는다.
 * 과태료는 무인 단속처럼 운전자를 특정하지 못했을 때 **차주에게** 부과하는
 * 것이라 벌점이 없고, 대신 금액이 조금 더 비싸다. 무인 단속 고지서에는 보통
 * 두 선택지가 함께 오는데, 몇천 원 싸다고 범칙금을 고르면 벌점이 남는다.
 * 그 벌점이 1년 누산 40점을 넘기면 면허가 정지된다 — 그때는 몇천 원 차이가
 * 아무 의미가 없다. 그래서 이 파일은 금액표를 옮겨 적는 것이 아니라
 * **두 선택지를 벌점까지 넣어 비교하는 것**을 본체로 삼는다.
 *
 * ── 숫자를 다루는 태도 ──────────────────────────────────────
 * 금액과 벌점은 도로교통법 시행령·시행규칙의 **별표**로 정해지고 개정된다.
 * 그래서 lib/car-registration.ts와 같은 태도를 지킨다 — **구조는 코드에,
 * 확인 못 한 값은 입력으로.**
 *
 *  - 초과 속도를 20 / 40 / 60km/h로 가르는 **구간의 뼈대**는 오래 안정적이다.
 *    그래서 경계는 코드에 둔다.
 *  - 각 칸의 금액과 벌점은 **확신하는 것만** 적었다. 확신 못 한 칸은 `null`로
 *    비워 두고, 결과의 `missing`에 담아 화면이 그 사실을 밝히게 한다.
 *  - 표의 값은 모두 **승용차 기준**이다. 이륜차·화물차는 다르다.
 *  - 어린이보호구역은 가중되지만 배수로 딱 떨어지지 않는 **별도의 표**다.
 *    그래서 배수를 코드에 박지 않고 입력으로 받는다. 1을 넣으면 평상시와 같다.
 *  - 사전납부 감액률·가산금률·납부기간도 통지서에 적힌 값을 넣어 쓴다.
 *  - 고지서 금액을 직접 넣으면 그것이 표를 이긴다.
 *
 * **고지서에 적힌 금액이 언제나 이 표보다 우선한다.**
 */

/* ── 벌점과 면허 처분 (도로교통법 시행규칙 별표28의 뼈대) ────────── */

/** 1년 누산 벌점이 이 점수에 닿으면 면허가 정지된다 */
export const SUSPEND_POINTS = 40;

/** 정지 일수는 누산점수에 비례한다 — 1점이 1일이다 */
export const DAYS_PER_POINT = 1;

/**
 * 누산 취소 기준. 기간이 서로 달라 하나의 숫자로 못 줄인다.
 * 이 계산기는 1년 기준만 판정하고, 2·3년 기준은 화면에 그대로 보여 준다.
 */
export const REVOKE_THRESHOLDS = [
  { years: 1, points: 121 },
  { years: 2, points: 201 },
  { years: 3, points: 271 },
];

/** 처분벌점이 40점 미만이면 최종 위반일로부터 이 개월 수만큼 무위반·무사고면 소멸한다 */
export const CLEAR_MONTHS = 12;

/**
 * 제한속도를 이 이상 넘기면 범칙금·과태료의 문제가 아니다 — 형사처벌 대상이다.
 * 금액과 점수는 확인하지 못해 적지 않았고, 경고만 띄운다.
 */
export const CRIMINAL_OVER_SPEED = 100;

/* ── 위반 한 칸 ──────────────────────────────────────────── */

/** 범칙금·과태료·벌점 한 묶음. 확신 못 한 값은 null이다 */
export interface Penalty {
  /** 범칙금(원) — 경찰이 운전자에게 통고한다. 벌점이 함께 붙는다 */
  fine: number | null;
  /** 과태료(원) — 무인 단속으로 차주에게 부과한다. 벌점이 없다 */
  levy: number | null;
  /** 벌점 — 범칙금을 택했을 때만 붙는다 */
  demerit: number | null;
}

export interface SpeedTier extends Penalty {
  /**
   * 이 구간의 초과 속도 하한(km/h) — 초과분이 이 값보다 **커야** 이 구간이다.
   * "20km/h 초과 40km/h 이하"를 그대로 옮긴 것이라 아래는 열려 있고 위는 닫혀 있다.
   */
  overFrom: number;
  /** 상한(km/h) — 여기까지 포함한다. 마지막 구간은 Infinity */
  overTo: number;
  label: string;
}

/**
 * 속도위반 구간표 (승용차 기준).
 *
 * 경계 20 / 40 / 60은 오래 안정적인 뼈대라 코드에 둔다. 금액과 벌점은 널리
 * 쓰이는 승용차 기준 값이지만 개정될 수 있어, 고지서 금액이 있으면 그것을 넣는다.
 */
export const SPEED_TIERS: SpeedTier[] = [
  { overFrom: 0,  overTo: 20,       label: '20km/h 이하 초과',        fine: 30_000,  levy: 40_000,  demerit: 0 },
  { overFrom: 20, overTo: 40,       label: '20km/h 초과 40km/h 이하', fine: 60_000,  levy: 70_000,  demerit: 15 },
  { overFrom: 40, overTo: 60,       label: '40km/h 초과 60km/h 이하', fine: 90_000,  levy: 100_000, demerit: 30 },
  { overFrom: 60, overTo: Infinity, label: '60km/h 초과',             fine: 120_000, levy: 130_000, demerit: 60 },
];

/** 초과분이 어느 구간인가. 초과 0(또는 음수)이면 위반이 아니므로 null */
export function speedTier(over: number): SpeedTier | null {
  if (!(over > 0)) return null;
  return SPEED_TIERS.find(t => over > t.overFrom && over <= t.overTo) ?? null;
}

/* ── 위반 종류 ───────────────────────────────────────────── */

export type ViolationId =
  | 'speeding' | 'signal' | 'centerline' | 'crosswalk' | 'phone' | 'seatbelt' | 'custom';

export interface ViolationInfo extends Penalty {
  id: ViolationId;
  label: string;
  /** 속도 구간표를 쓰는가 — 속도위반만 true다 */
  tiered?: boolean;
  /** 이 줄에서 무엇을 확신하지 못했는지 화면에 그대로 보여 준다 */
  note: string;
}

/**
 * 위반 종류별 기준값 (승용차).
 *
 * 벌점은 널리 알려진 값만 적었다. **과태료 칸이 비어 있는 줄은 금액을 모르는
 * 것이 아니라, 그 위반이 무인 단속 대상인지 확인하지 못했다는 뜻**이다.
 * 무인 단속으로 고지서가 왔다면 적힌 금액을 직접 넣어야 한다.
 */
export const VIOLATIONS: ViolationInfo[] = [
  { id: 'speeding',   label: '속도위반', tiered: true,
    fine: null, levy: null, demerit: null,
    note: '초과 속도 구간에 따라 금액과 벌점이 달라집니다' },
  { id: 'signal',     label: '신호·지시 위반',
    fine: 60_000, levy: 70_000, demerit: 15,
    note: '승용차 기준' },
  { id: 'centerline', label: '중앙선 침범',
    fine: 60_000, levy: null, demerit: 30,
    note: '과태료는 확인하지 못해 비워 뒀습니다 — 고지서가 왔다면 적힌 금액을 넣으세요' },
  { id: 'crosswalk',  label: '횡단보도 보행자 보호 불이행',
    fine: 60_000, levy: null, demerit: 10,
    note: '과태료는 확인하지 못해 비워 뒀습니다' },
  { id: 'phone',      label: '운전 중 휴대전화 사용',
    fine: 60_000, levy: null, demerit: 15,
    note: '현장에서 운전자를 특정해 단속하므로 범칙금 쪽입니다' },
  { id: 'seatbelt',   label: '안전띠 미착용 (운전자)',
    fine: null, levy: 30_000, demerit: 0,
    note: '벌점 없이 과태료로 부과됩니다 · 어린 동승자는 금액이 다릅니다' },
  { id: 'custom',     label: '직접 입력 (고지서 금액)',
    fine: null, levy: null, demerit: null,
    note: '고지서에 적힌 금액과 벌점을 그대로 넣습니다' },
];

/* ── 면허 처분 ───────────────────────────────────────────── */

export interface LicenseResult {
  /** 공제까지 반영한 1년 누산 벌점 */
  total: number;
  /** 정지 대상인가 */
  suspended: boolean;
  /** 정지 일수 — 누산점수 1점이 1일이다. 정지가 아니면 0 */
  days: number;
  /** 정지까지 남은 점수. 이미 정지면 0 */
  toSuspension: number;
  /** 1년 누산 취소 기준을 넘는가 */
  revokeRisk: boolean;
}

/**
 * 이번 위반까지 더하면 면허가 어떻게 되는가.
 *
 * 정지는 누산점수가 기준에 **닿는 순간** 시작되고, 정지 일수는 그 점수에
 * 그대로 비례한다 — 40점이면 40일이다. 그래서 이미 쌓인 점수를 모르면
 * 이번 벌점 15점이 아무 일도 아닌지 40일 정지인지 알 수가 없다.
 */
export function licenseStatus(accumulated: number, added: number, credits = 0): LicenseResult {
  const total = Math.max(0, Math.max(0, accumulated) + Math.max(0, added) - Math.max(0, credits));
  const suspended = total >= SUSPEND_POINTS;
  return {
    total,
    suspended,
    days: suspended ? total * DAYS_PER_POINT : 0,
    toSuspension: suspended ? 0 : SUSPEND_POINTS - total,
    revokeRisk: total >= REVOKE_THRESHOLDS[0].points,
  };
}

/* ── 사전납부 감액과 가산금 (과태료 쪽) ──────────────────────── */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * 금액의 몇 %를 원 단위로 끊는다.
 *
 * 1.2%를 여섯 번 더해 만든 비율처럼 소수를 곱한 값은 부동소수 오차를 품는다.
 * 그대로 절사하면 10,200원이 10,199원이 된다 — 검사에서 이 1원이 나왔다.
 * 오차는 원 단위보다 훨씬 아래에서 생기므로 절사 전에 그 자리를 씻어 낸다.
 */
const pct = (amount: number, rate: number): number =>
  Math.floor(Math.round(amount * rate * 1e4) / 1e6);

/**
 * 사전납부(자진납부) 감액액. 감액률을 0으로 두면 0이 나와 원금과 같아진다.
 * 비율은 통지서에 적힌 값을 넣는다 — 코드에 박지 않는다.
 */
export const earlyPayDiscount = (levy: number, rate: number): number =>
  levy <= 0 ? 0 : pct(levy, clamp(rate, 0, 100));

/**
 * 납부기한을 넘겼을 때 붇는 가산금.
 *
 * 기한을 하루라도 넘기면 첫 가산금이 한 번 붙고, 그 뒤로는 **한 달이 지날
 * 때마다** 중가산금이 정해진 개월 수까지 얹힌다. 달을 일수로 셀 때는 30일로
 * 어림한다 — 실제로는 달력 월 단위다.
 *
 * 비율과 상한 개월은 모두 인자로 받는다. 널리 쓰이는 값이 있지만 개정될 수
 * 있고, 확인 못 한 숫자가 답처럼 보이면 안 된다.
 */
export function surchargeAmount(
  levy: number,
  overdueDays: number,
  firstRate: number,
  monthlyRate: number,
  maxMonths: number,
): number {
  if (levy <= 0 || overdueDays <= 0) return 0;
  const months = Math.min(Math.floor(overdueDays / 30), Math.max(0, maxMonths));
  const rate = Math.max(0, firstRate) + Math.max(0, monthlyRate) * months;
  return pct(levy, rate);
}

/* ── 전체 계산 ───────────────────────────────────────────── */

export interface FineInput {
  violation: ViolationId;
  /** 속도위반일 때 제한속도를 넘은 정도(km/h). 0이면 위반이 아니다 */
  overSpeed: number;
  /** 어린이보호구역·노인보호구역 등 가중 구역인가 */
  schoolZone: boolean;
  /** 가중 구역의 금액 배수 — 별도 표라 배수로 딱 떨어지지 않을 수 있어 받는다 */
  zoneMoneyMultiplier: number;
  /** 가중 구역의 벌점 배수 */
  zoneDemeritMultiplier: number;
  /** 고지서에 적힌 범칙금(원). 0 이하면 표의 값을 쓴다 */
  fineOverride?: number;
  /** 고지서에 적힌 과태료(원). 0 이하면 표의 값을 쓴다 */
  levyOverride?: number;
  /** 고지서에 적힌 벌점. 비우면 표의 값을 쓴다 */
  demeritOverride?: number;
  /** 통지서를 받은 뒤 지난 일수 */
  daysSinceNotice: number;
  /** 사전납부(의견진술) 기간 — 통지서에 적힌 일수. 0이면 감액을 셈하지 않는다 */
  earlyPayDays: number;
  /** 납부기한 — 통지서에 적힌 일수. 0이면 가산금을 셈하지 않는다 */
  dueDays: number;
  /** 사전납부 감액률(%) */
  earlyPayDiscountRate: number;
  /** 기한을 넘겼을 때의 첫 가산금률(%) */
  surchargeRate: number;
  /** 한 달마다 얹히는 중가산금률(%) */
  monthlySurchargeRate: number;
  /** 중가산금이 붙는 최대 개월 수 */
  maxSurchargeMonths: number;
  /** 지난 1년간 이미 쌓인 누산 벌점 */
  accumulated: number;
  /** 착한운전 마일리지 등으로 공제할 점수 */
  credits: number;
}

/** 어느 쪽으로 내는 것이 나은가. 'unknown'은 금액을 몰라 비교할 수 없다는 뜻 */
export type Choice = 'fine' | 'levy' | 'unknown';

export interface FineResult {
  /** 속도위반이면 해당 구간. 아니면 null */
  tier: SpeedTier | null;
  /** 위반 종류 표시용 */
  label: string;
  note: string;
  /** 초과 0이라 위반 자체가 아닌 경우 */
  noViolation: boolean;

  /** 가중·직접입력까지 반영한 범칙금(원) */
  fine: number | null;
  /** 가중·직접입력까지 반영한 과태료(원) */
  levy: number | null;
  /** 범칙금을 택했을 때 붙는 벌점 */
  fineDemerit: number | null;
  /**
   * 과태료를 택했을 때 붙는 벌점 — 무인 단속은 운전자를 특정하지 않으므로
   * 늘 0이다. 상수를 그냥 쓰지 않고 칸으로 낸 것은 이 규칙이 이 계산기의
   * 핵심이라 화면과 검사가 함께 붙잡아야 하기 때문이다.
   */
  levyDemerit: 0;

  /** 사전납부 기간 안에 내는가 */
  early: boolean;
  /** 사전납부 감액을 받으려면 며칠 남았나 (이미 지났으면 0) */
  earlyDaysLeft: number;
  /** 감액액(원) */
  earlyDiscount: number;
  /** 납부기한까지 며칠 남았나 */
  dueDaysLeft: number;
  /** 납부기한을 넘긴 일수 */
  overdueDays: number;
  /** 가산금(원) */
  surcharge: number;

  /** 과태료로 실제 내는 금액 — 감액과 가산금까지 반영 */
  levyPayable: number | null;
  /** 범칙금으로 실제 내는 금액 — 범칙금에는 사전납부 감액이 없다 */
  finePayable: number | null;
  /** 범칙금을 택해서 아끼는 금액(원). 음수면 과태료가 더 싸다 */
  saveByFine: number | null;

  /** 범칙금을 택했을 때의 면허 상태 */
  license: LicenseResult;
  /** 과태료를 택했을 때의 면허 상태 (벌점이 안 붙는다) */
  licenseIfLevy: LicenseResult;
  /** 범칙금을 택하면 정지되고 과태료로는 안 되는 경우 — 금액 비교가 무의미해진다 */
  suspensionDecides: boolean;
  /** 그때 아끼는 금액을 정지 일수로 나눈 값 — 정지 하루를 얼마에 사는 셈인가 */
  savePerSuspendedDay: number | null;
  choice: Choice;

  /** 제한속도를 크게 넘겨 형사처벌 범위로 들어갔는가 */
  criminalRisk: boolean;
  /** 범칙금은 기한을 넘기면 가산이 아니라 즉결심판 절차로 넘어간다 */
  fineOverdueWarning: boolean;
  /** 확신하지 못해 비워 둔 칸 — 화면에 그대로 밝힌다 */
  missing: string[];
}

export function calcFine(input: FineInput): FineResult {
  const info = VIOLATIONS.find(v => v.id === input.violation) ?? VIOLATIONS[0];
  const over = Math.max(0, input.overSpeed);

  // 속도위반은 구간표에서, 나머지는 위반 종류에서 기준값을 가져온다.
  const tier = info.tiered ? speedTier(over) : null;
  const noViolation = Boolean(info.tiered) && tier === null;
  const base: Penalty = noViolation
    ? { fine: 0, levy: 0, demerit: 0 }
    : (tier ?? { fine: info.fine, levy: info.levy, demerit: info.demerit });

  // 가중 구역 배수. 배수 1이면 평상시와 똑같다.
  const moneyMul = input.schoolZone ? Math.max(0, input.zoneMoneyMultiplier) : 1;
  const pointMul = input.schoolZone ? Math.max(0, input.zoneDemeritMultiplier) : 1;

  // 고지서 금액이 표를 이긴다. 표에 없는 칸은 null로 남겨 화면이 밝히게 한다.
  const money = (override: number | undefined, tabled: number | null): number | null => {
    if (override !== undefined && override > 0) return Math.floor(override);
    return tabled === null ? null : Math.floor(tabled * moneyMul);
  };
  const fine = money(input.fineOverride, base.fine);
  const levy = money(input.levyOverride, base.levy);
  const fineDemerit = input.demeritOverride !== undefined && input.demeritOverride >= 0
    ? Math.max(0, input.demeritOverride)
    : base.demerit === null ? null : Math.round(base.demerit * pointMul);

  // 납부 시점 — 통지서에 적힌 기간을 모르면(0) 감액도 가산금도 셈하지 않는다.
  const days = Math.max(0, input.daysSinceNotice);
  const earlyDays = Math.max(0, input.earlyPayDays);
  const dueDays = Math.max(0, input.dueDays);
  const early = earlyDays > 0 && days <= earlyDays;
  const overdueDays = dueDays > 0 ? Math.max(0, days - dueDays) : 0;

  const earlyDiscount = early && levy !== null
    ? earlyPayDiscount(levy, input.earlyPayDiscountRate)
    : 0;
  const surcharge = levy === null
    ? 0
    : surchargeAmount(
        levy, overdueDays,
        input.surchargeRate, input.monthlySurchargeRate, input.maxSurchargeMonths,
      );

  const levyPayable = levy === null ? null : levy - earlyDiscount + surcharge;
  // 범칙금에는 사전납부 감액이 없다 — 통고받은 금액을 기간 안에 내는 것이 전부다.
  const finePayable = fine;
  const saveByFine = levyPayable === null || finePayable === null
    ? null
    : levyPayable - finePayable;

  const license = licenseStatus(input.accumulated, fineDemerit ?? 0, input.credits);
  const licenseIfLevy = licenseStatus(input.accumulated, 0, input.credits);
  const suspensionDecides = license.suspended && !licenseIfLevy.suspended;
  const savePerSuspendedDay = suspensionDecides && saveByFine !== null && license.days > 0
    ? saveByFine / license.days
    : null;

  let choice: Choice = 'unknown';
  if (suspensionDecides) {
    // 벌점 때문에 면허가 멈추면 몇천 원 차이는 따질 일이 아니다.
    choice = 'levy';
  } else if (finePayable !== null && levyPayable !== null && finePayable !== levyPayable) {
    choice = finePayable < levyPayable ? 'fine' : 'levy';
  }

  const missing: string[] = [];
  if (fine === null) missing.push('범칙금');
  if (levy === null) missing.push('과태료');
  if (fineDemerit === null) missing.push('벌점');

  return {
    tier,
    label: info.label,
    note: info.note,
    noViolation,
    fine,
    levy,
    fineDemerit,
    levyDemerit: 0,
    early,
    earlyDaysLeft: early ? earlyDays - days : 0,
    earlyDiscount,
    dueDaysLeft: dueDays > 0 ? Math.max(0, dueDays - days) : 0,
    overdueDays,
    surcharge,
    levyPayable,
    finePayable,
    saveByFine,
    license,
    licenseIfLevy,
    suspensionDecides,
    savePerSuspendedDay,
    choice,
    criminalRisk: Boolean(info.tiered) && over > CRIMINAL_OVER_SPEED,
    fineOverdueWarning: overdueDays > 0,
    missing,
  };
}
