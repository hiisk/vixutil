/**
 * 장기요양 본인부담금 — 급여를 쓸 때 내 지갑에서 나가는 돈.
 *
 * ── 보험료와는 다른 돈이다 ──────────────────────────────────
 * 매달 건강보험료에 얹혀 나가는 **장기요양보험료**(lib/salary.ts)는 등급을 받든
 * 안 받든 내는 돈이고, 여기서 내는 것은 등급을 받아 **급여를 쓸 때 내는 몫**이다.
 * 이름이 닮았을 뿐 서로 다른 자리이고, 이 파일은 뒤쪽만 본다.
 *
 * ── 셈의 뼈대 ────────────────────────────────────────────
 *   급여 대상 금액 = min(이용액, 월 한도액)
 *   본인부담금     = 급여 대상 금액 × 본인부담률 × (1 − 감경률)
 *   한도 초과분    = max(0, 이용액 − 월 한도액)   ← 전액 본인 부담
 *   한 달 총액     = 본인부담금 + 한도 초과분 + 비급여
 *
 * 본인부담률은 재가급여 15%, 시설급여 20%다. 감경 대상이면 그 비율만큼 내려가고,
 * 기초생활수급자는 면제라 급여 몫이 0이 된다.
 *
 * ── 한도를 넘기면 기울기가 바뀐다 ─────────────────────────────
 * 사람들이 가장 많이 놓치는 자리다. 한도 안에서 1원을 더 쓰면 내 몫은 15전만 늘지만,
 * 한도를 넘긴 뒤 1원을 더 쓰면 그 1원이 그대로 내 돈이다. 넘는 순간 총액이 왕창
 * 튀는 게 아니라 **그 뒤로 붙는 기울기가 15%에서 100%로 바뀐다** — 그래서 한도를
 * 조금 넘긴 달과 많이 넘긴 달의 차이가 크다.
 *
 * 월 한도액은 **재가급여**에서 쓰는 개념이다. 시설급여는 등급별 1일 수가에 이용일수를
 * 곱해 급여비용을 매기므로 한도 초과라는 것이 생기지 않는다 — 시설이면 한도에 이용액
 * 이상을 넣어 초과분이 0이 되게 두면 된다.
 *
 * ── 지어내지 않은 값 ─────────────────────────────────────
 * 등급별 월 한도액은 해마다 고시되고 매년 오른다. 박아 두면 내년에 조용히 틀린 답을
 * 답처럼 보여 주므로 입력으로 받는다. 감경 구간을 가르는 **소득·재산 기준액**도 고시로
 * 정해지고 여러 번 개정돼 왔으므로 기준을 계산하지 않고 **감경 구분만 고르게** 한다 —
 * 내가 몇 % 감경 대상인지는 공단이 보낸 통지서에 적혀 있다.
 *
 * 비급여는 감경과 무관하다. 식사재료비·상급침실료·이미용비는 급여가 아니어서 부담률을
 * 매길 대상이 아니고, 면제 대상자도 이것은 낸다.
 */

/** 급여 종류별 본인부담률 */
export const SERVICE_RATES = { home: 0.15, facility: 0.2 } as const;

/** 재가급여(방문요양·방문목욕·주야간보호 등)인가, 시설급여(요양원)인가 */
export type ServiceKind = keyof typeof SERVICE_RATES;

/**
 * 감경 구분별로 본인부담률이 내려가는 비율.
 *
 * 40%·60% 감경의 소득·재산 기준은 고시사항이라 여기서 판정하지 않는다.
 * 통지서에 적힌 구분을 그대로 고르는 자리다.
 */
export const RELIEF_RATES = { none: 0, cut40: 0.4, cut60: 0.6, exempt: 1 } as const;

export type Relief = keyof typeof RELIEF_RATES;

/**
 * 등급 — 이름만 둔다. 등급별 월 한도액은 고시값이라 여기 두지 않고 입력으로 받는다.
 * 등급 판정은 공단 등급판정위원회가 하고, 인지지원등급은 시설급여 대상이 아니다.
 */
export const GRADES = ['1등급', '2등급', '3등급', '4등급', '5등급', '인지지원등급'] as const;

export type Grade = typeof GRADES[number];

export interface CopayInput {
  /** 급여 종류 */
  kind: ServiceKind;
  /** 한 달 급여 이용액(원) — 급여비용 총액이다, 본인부담금이 아니다 */
  used: number;
  /** 그 등급의 월 한도액(원) — 그 해 고시값을 넣는다 */
  limit: number;
  /** 감경 구분 */
  relief: Relief;
  /** 비급여 합계(원) — 식사재료비·상급침실료 등, 전액 본인 부담 */
  nonBenefit: number;
}

export interface CopayResult {
  /** 급여로 인정되는 금액(원) — 한도까지만 */
  covered: number;
  /** 실제로 매겨진 본인부담률 — 감경까지 반영한 값 */
  rate: number;
  /** 급여분 본인부담금(원) */
  copay: number;
  /** 한도 초과분(원) — 전액 본인 부담 */
  excess: number;
  /** 비급여 합계(원) — 전액 본인 부담 */
  nonBenefit: number;
  /** 감경으로 덜 낸 금액(원) */
  reliefSaved: number;
  /** 한 달에 실제로 내는 총액(원) */
  total: number;
}

/** 감경까지 반영한 본인부담률 */
export const effectiveRate = (kind: ServiceKind, relief: Relief): number =>
  SERVICE_RATES[kind] * (1 - RELIEF_RATES[relief]);

export function calcCopay(input: CopayInput): CopayResult {
  const used = Math.max(0, input.used);
  const limit = Math.max(0, input.limit);
  const nonBenefit = Math.max(0, input.nonBenefit);

  /* 한도까지가 급여 대상이고, 넘은 만큼은 부담률을 매기지 않고 전액이 내 몫이다 */
  const covered = Math.min(used, limit);
  const excess = used - covered;

  const rate = effectiveRate(input.kind, input.relief);
  const copay = covered * rate;

  return {
    covered,
    rate,
    copay,
    excess,
    nonBenefit,
    reliefSaved: covered * (SERVICE_RATES[input.kind] - rate),
    total: copay + excess + nonBenefit,
  };
}

/**
 * 한 달에 낼 수 있는 돈이 정해져 있으면 급여를 얼마까지 쓸 수 있나 — 셈을 뒤집는다.
 *
 * "한 달에 40만원까지 쓸 수 있는데 방문요양을 얼마나 부를 수 있나"가 가족이 실제로
 * 묻는 질문이다. 비급여는 먼저 떼어 놓고, 남은 돈을 한도 안에서는 부담률로 나누고
 * 한도를 넘는 구간에서는 1:1로 센다 — calcCopay가 쓰는 식을 그대로 되짚은 것이다.
 *
 * 면제 대상이면 한도 안에서는 돈이 들지 않으므로 최소한 한도까지는 쓸 수 있다.
 */
export function maxUsableFor(input: CopayInput, budget: number): number {
  const limit = Math.max(0, input.limit);
  const room = Math.max(0, budget - Math.max(0, input.nonBenefit));
  const rate = effectiveRate(input.kind, input.relief);
  const withinCost = limit * rate;

  // 한도 안에서 해결되는 예산인가
  if (room <= withinCost) return rate === 0 ? limit : room / rate;
  // 한도를 채우고 남은 돈은 초과분에 1:1로 들어간다
  return limit + (room - withinCost);
}
