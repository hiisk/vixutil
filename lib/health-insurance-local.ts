/**
 * 지역가입자 건강보험료 — 직장을 벗어난 순간부터 혼자 내는 금액.
 *
 * ── 부과의 뼈대 ─────────────────────────────────────────
 * 직장가입자는 보수 하나에만 정률로 매기지만, 지역가입자는 세대를 단위로
 * **세 갈래에 따로 매겨 합친다.**
 *
 *   건강보험료 = 소득보험료 + 재산보험료 + 자동차보험료
 *
 *   소득보험료   = 소득월액 × 보험료율          ← 직장가입자와 같은 요율
 *   재산보험료   = 재산 부과점수 × 부과점수당 금액
 *   자동차보험료 = 자동차 부과점수 × 부과점수당 금액
 *   장기요양보험료 = 건강보험료 × 장기요양보험료율
 *
 * ── 요율은 여기에 다시 적지 않는다 ──────────────────────────
 * 보험료율과 장기요양보험료율은 lib/salary.ts가 이미 직장가입자 계산에 쓰고 있다.
 * 같은 숫자를 두 곳에 적으면 한쪽만 고쳐지는 날이 오므로 **계산 결과에서 되짚어
 * 꺼내 쓴다.** 이 파일에는 요율 숫자가 한 자리도 없다 — 검사가 원문을 읽어 본다.
 *
 * 지역가입자의 소득보험료율은 직장가입자의 **전체** 보험료율이다. 직장가입자는
 * 그 절반만 내고 나머지 절반을 회사가 내 주지만, 지역가입자에게는 회사가 없다.
 * 같은 소득이라면 건강보험료가 정확히 두 배가 되는 자리이고, 이 계산기가
 * 나란히 내 보이려는 것이 바로 그 차이다.
 *
 * ── 등급표는 옮겨 적지 않는다 ───────────────────────────────
 * 재산보험료는 재산을 60등급으로 나눈 표에서 점수를 찾아 매긴다. 그 표와
 * 부과점수당 금액, 재산공제액, 자동차 부과 요건, 최저보험료, 보험료 상한은
 * **모두 해마다 고시된다.** 표를 옮겨 적으면 그럴듯해서 아무도 틀린 것을 못
 * 잡으므로, 이 파일은 **등급 판정을 하지 않는다** — 점수와 점수당 금액을 입력으로
 * 받는다. 대신 공제를 뺀 재산 가액을 내주어 그 값으로 고시된 등급표를 찾게 한다.
 *
 * ── 최저보험료가 붙는 자리 ──────────────────────────────────
 * 최저보험료는 세대 보험료 전체의 하한이 아니라 **소득보험료 자리**에 붙는다.
 * 소득이 기준 이하인 세대는 소득보험료 대신 최저보험료를 내고, 재산·자동차
 * 보험료는 그 위에 그대로 더해진다. 흔히 오해하는 자리다.
 */
import { calcSalary } from './salary.ts';

/**
 * 직장가입자는 보험료를 회사와 반씩 나눈다 — 법이 정한 몫이라 해마다
 * 고시되는 값이 아니다. 지역가입자는 이 나눔이 없어 전액을 혼자 낸다.
 */
export const EMPLOYEE_SHARE = 0.5;

/*
 * 요율을 되짚는 자리. 월 소득 4,000만원을 넣으면 건강보험료가 1,418,000원으로
 * 딱 떨어지고, 그 값이 장기요양보험료율의 분모로도 나누어져 두 요율이 오차 없이
 * 복원된다. 요율을 적는 대신 이미 요율을 쓰고 있는 계산을 한 번 돌려 꺼낸다.
 */
const RATE_PROBE = calcSalary(480_000_000, 1, false);

/** 건강보험료율 — 직장가입자 본인부담 요율을 본인 몫으로 나눈 전체 요율 */
export const HEALTH_RATE = RATE_PROBE.health / RATE_PROBE.monthly / EMPLOYEE_SHARE;

/** 장기요양보험료율 — 건강보험료에 곱한다 */
export const LONG_CARE_RATE = RATE_PROBE.longCare / RATE_PROBE.health;

export interface LocalHealthInput {
  /** 세대 연소득(원) — 사업·근로·연금·이자·배당 등을 합친 값 */
  annualIncome: number;
  /** 최저보험료가 적용되는 연소득 기준(원) — 해마다 고시된다 */
  incomeFloorLine: number;
  /** 최저보험료(원) — 해마다 고시된다 */
  minPremium: number;
  /** 재산세 과세표준 등 재산 가액 합계(원) */
  assetValue: number;
  /** 재산공제액(원) — 2022년 9월 개편으로 생겼고 금액이 바뀐다 */
  assetDeduction: number;
  /** 재산 부과점수(점) — 고시된 등급표에서 찾은 값. 이 계산은 등급을 판정하지 않는다 */
  assetPoints: number;
  /** 자동차 부과점수(점) — 부과 요건에 안 걸리는 차는 0 */
  carPoints: number;
  /** 부과점수당 금액(원) — 해마다 고시된다 */
  pointValue: number;
  /** 월별 보험료 상한(원) — 해마다 고시된다. 0이면 상한을 보지 않는다 */
  maxPremium: number;
}

export interface LocalHealthResult {
  /** 소득월액(원) — 연소득을 열둘로 나눈 값 */
  incomeMonthly: number;
  /** 소득보험료(월, 원) */
  incomePremium: number;
  /** 최저보험료가 소득보험료 자리에 들어갔는가 */
  atFloor: boolean;
  /** 공제를 뺀 재산 가액(원) — 이 값으로 고시된 등급표에서 점수를 찾는다 */
  assetBase: number;
  /** 재산보험료(월, 원) */
  assetPremium: number;
  /** 자동차보험료(월, 원) */
  carPremium: number;
  /** 상한을 적용하기 전 건강보험료(원) */
  rawHealth: number;
  /** 건강보험료(월, 원) */
  health: number;
  /** 상한에 걸렸는가 */
  atCeiling: boolean;
  /** 장기요양보험료(월, 원) */
  longCare: number;
  /** 월 납부액 합계(원) — 전액 본인 부담이다 */
  total: number;
}

export function calcLocalHealth(input: LocalHealthInput): LocalHealthResult {
  const annual = Math.max(0, input.annualIncome);
  const incomeMonthly = annual / 12;
  const minPremium = Math.max(0, input.minPremium);
  const byRate = Math.round(incomeMonthly * HEALTH_RATE);

  /*
   * 기준 이하 세대에는 최저보험료를 매긴다. 정률로 낸 금액이 최저보험료보다 적은
   * 자리도 최저보험료로 올린다 — 두 고시값이 서로 어긋나게 입력되어도 기준을 갓
   * 넘은 세대가 기준 이하 세대보다 적게 내는 뒤집힘이 생기지 않게 한다.
   */
  const atFloor = annual <= Math.max(0, input.incomeFloorLine) || byRate < minPremium;
  const incomePremium = atFloor ? minPremium : byRate;

  /*
   * 재산은 공제를 뺀 가액으로 등급표를 찾는다. 여기서는 그 가액만 내주고 점수는
   * 입력으로 받는다 — 60등급표를 지어내는 것이 이 계산기에서 가장 위험한 자리다.
   */
  const assetBase = Math.max(0, Math.max(0, input.assetValue) - Math.max(0, input.assetDeduction));
  const pointValue = Math.max(0, input.pointValue);
  const assetPremium = Math.round(Math.max(0, input.assetPoints) * pointValue);
  const carPremium = Math.round(Math.max(0, input.carPoints) * pointValue);

  const rawHealth = incomePremium + assetPremium + carPremium;
  // 상한을 비워 두면(0) 상한 없이 낸다 — 고시값을 모를 때 0을 답으로 내놓지 않는다
  const ceiling = input.maxPremium > 0 ? input.maxPremium : Infinity;
  const health = Math.min(rawHealth, ceiling);
  const longCare = Math.round(health * LONG_CARE_RATE);

  return {
    incomeMonthly,
    incomePremium,
    atFloor,
    assetBase,
    assetPremium,
    carPremium,
    rawHealth,
    health,
    atCeiling: rawHealth > ceiling,
    longCare,
    total: health + longCare,
  };
}

export interface EmployeeCompare {
  /** 견주는 기준이 된 월 소득(원) */
  monthly: number;
  /** 직장가입자 본인부담 건강보험료(원) */
  employeeHealth: number;
  /** 직장가입자 본인부담 장기요양보험료(원) */
  employeeLongCare: number;
  /** 직장가입자가 실제로 내는 월 합계(원) */
  employeeTotal: number;
  /** 회사가 내 주는 몫(원) — 지역가입자에게는 없다 */
  employerShare: number;
  /** 회사 몫까지 합친 직장가입자 총 보험료(원) */
  fullPremium: number;
  /** 같은 소득에서 지역가입자가 더 내는 금액(원) */
  gap: number;
}

/**
 * 같은 소득이면 직장가입자와 얼마나 다른가.
 *
 * 직장 쪽 금액은 lib/salary.ts에 그대로 맡긴다. 요율을 다시 적지 않으려는 것도
 * 있지만, 견주는 두 값이 같은 계산에서 나와야 비교가 의미를 갖기 때문이다.
 * 회사 몫은 본인 몫을 본인 부담 비율로 나눈 뒤 본인 몫을 뺀 것이다.
 */
export function compareEmployee(input: LocalHealthInput, result: LocalHealthResult): EmployeeCompare {
  const s = calcSalary(Math.max(0, input.annualIncome), 1, false);
  const employeeTotal = s.health + s.longCare;
  const fullPremium = employeeTotal / EMPLOYEE_SHARE;
  return {
    monthly: s.monthly,
    employeeHealth: s.health,
    employeeLongCare: s.longCare,
    employeeTotal,
    employerShare: fullPremium - employeeTotal,
    fullPremium,
    gap: result.total - employeeTotal,
  };
}
