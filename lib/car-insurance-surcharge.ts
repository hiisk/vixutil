/**
 * 자동차 보험료 할증 — 사고 뒤 3년치를 미리 본다.
 *
 * ── 왜 필요한가 ────────────────────────────────────────────
 * 작은 접촉사고에서 사람들이 실제로 묻는 것은 「수리비 얼마?」가 아니라
 * **「보험으로 처리할까, 자비로 낼까?」**다. 그 판단은 수리비와 «앞으로 3년간
 * 더 낼 보험료»를 견줘야 나오는데, 그 3년치를 아무도 계산해 주지 않는다.
 *
 * 여기서는 둘을 나란히 놓고 손익분기 수리비까지 낸다.
 *
 * ── 두 가지가 따로 논다 ────────────────────────────────────
 * 1) **할증등급** — 사고 내용에 따라 등급이 내려간다. 물적사고는 할증기준금액
 *    초과 여부로 1점, 인적사고는 부상 정도로 1~4점. 1점당 대략 보험료의
 *    6.8%가 오른다(회사마다 다르다).
 * 2) **무사고 할인 소멸** — 사고가 나면 그동안 쌓은 무사고 할인이 끊기고
 *    3년간 다시 쌓아야 한다. 사람들이 놓치는 것은 대개 이쪽이다.
 *
 * 두 몫을 나눠서 보여 준다 — 합쳐 놓으면 「왜 이렇게 많이 오르지」가 설명이 안 된다.
 *
 * 보험료율은 회사·담보·연령에 따라 크게 갈리므로 여기 값은 **업계에서 흔히
 * 쓰이는 근사치**다. 정확한 금액은 보험사 견적으로만 알 수 있고, 그 사실을
 * 화면에 적는다.
 */

/** 사고 유형 — 점수는 보험개발원 등급 산정에서 쓰는 값에 가깝다 */
export const ACCIDENT_KINDS = [
  { id: 'property-small', points: 0.5, label: '물적사고 (할증기준금액 이하)' },
  { id: 'property-big', points: 1, label: '물적사고 (할증기준금액 초과)' },
  { id: 'injury-light', points: 1, label: '인적사고 — 부상 12~14급' },
  { id: 'injury-mid', points: 2, label: '인적사고 — 부상 8~11급' },
  { id: 'injury-heavy', points: 3, label: '인적사고 — 부상 1~7급' },
  { id: 'death', points: 4, label: '사망 사고' },
] as const;

export type AccidentKind = (typeof ACCIDENT_KINDS)[number]['id'];

/** 1점당 오르는 비율 — 회사마다 다르지만 대략 이 근처다 */
const PER_POINT = 0.068;
/** 무사고 1년치 할인폭 — 끊기면 이만큼을 다시 쌓아야 한다 */
const NO_CLAIM_STEP = 0.07;
/** 할증이 남는 기간 */
export const SURCHARGE_YEARS = 3;

export interface SurchargeResult {
  /** 해마다의 예상 보험료 */
  years: { year: number; premium: number; extra: number }[];
  /** 3년간 더 내는 돈 */
  totalExtra: number;
  /** 등급 하락으로 오르는 몫 */
  fromPoints: number;
  /** 무사고 할인이 끊겨 오르는 몫 */
  fromNoClaim: number;
  /** 이 수리비보다 적으면 자비가 이득 */
  breakEvenRepair: number;
  /** 자비로 냈을 때와 견준 결과 */
  verdict: 'self' | 'insurance';
  points: number;
}

export function calcSurcharge(
  premiumWon: number,
  kind: AccidentKind,
  noClaimYears: number,
  repairWon: number,
): SurchargeResult | null {
  if (!(premiumWon > 0)) return null;

  const points = ACCIDENT_KINDS.find(k => k.id === kind)?.points ?? 1;

  /* 등급 하락분은 3년 내내 같은 비율로 붙는다 */
  const pointRate = points * PER_POINT;

  /*
    무사고 할인은 쌓인 햇수만큼 사라지되, 실제로 되돌아오는 속도가 있어
    해마다 3분의 1씩 회복하는 것으로 본다. 쌓인 해가 많을수록 잃는 것도 크다 —
    사고가 «오래 무사고였던 사람»에게 더 아픈 이유가 이것이다.
  */
  const lostDiscount = Math.min(noClaimYears, 9) * NO_CLAIM_STEP;

  const years = Array.from({ length: SURCHARGE_YEARS }, (_, i) => {
    const recover = (i / SURCHARGE_YEARS) * lostDiscount;
    const rate = pointRate + (lostDiscount - recover);
    const premium = Math.round(premiumWon * (1 + rate));
    return { year: i + 1, premium, extra: premium - premiumWon };
  });

  const totalExtra = years.reduce((s, y) => s + y.extra, 0);
  const fromPoints = Math.round(premiumWon * pointRate * SURCHARGE_YEARS);
  const fromNoClaim = Math.max(0, totalExtra - fromPoints);

  return {
    years,
    totalExtra,
    fromPoints,
    fromNoClaim,
    /* 3년 추가 보험료보다 수리비가 싸면 자비가 이득이다 */
    breakEvenRepair: totalExtra,
    verdict: repairWon > 0 && repairWon <= totalExtra ? 'self' : 'insurance',
    points,
  };
}
