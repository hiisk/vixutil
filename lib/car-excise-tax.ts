/**
 * 신차 출고가에 세금이 얹히는 순서 — 개별소비세·교육세·부가세.
 *
 * 자동차 취등록세 계산기(car-registration)가 다루는 것은 **차를 산 다음**
 * 내는 세금이다. 여기서 보는 것은 그 앞 — **출고가 자체가 어떻게 만들어지는가**다.
 * 제조사가 매기는 공장도가에 세 가지 세금이 층으로 얹혀 우리가 보는 출고가가 된다.
 *
 *   과세표준(공장도가)
 *   → 개별소비세 = 과세표준 × 세율
 *   → 교육세     = 개별소비세 × 30%
 *   → 부가세     = (과세표준 + 개별소비세 + 교육세) × 10%
 *   = 출고가
 *
 * 눈여겨볼 것은 부가세가 **앞의 두 세금까지 얹은 금액**에 붙는다는 점이다.
 * 세금 위에 세금이 붙으므로 개별소비세가 1원 줄면 출고가는 1원이 아니라
 * 1.43원(= 1.3 × 1.1) 줄어든다.
 *
 * ── 세율은 왜 입력으로 받는가 ──────────────────────────────────
 * 승용차 개별소비세는 기본 5%지만, 소비를 살리려고 **탄력세율**로 3.5%까지
 * 내린 시기가 여러 번 있었고 그때마다 6개월 단위로 연장되거나 그냥 끝났다.
 * 시점에 따라 값이 달라지므로 코드에 박아 두면 조용히 틀린다 —
 * lib/lease-renewal.ts의 전월세전환율과 같은 이유로 인자로 받고,
 * 기본 세율만 상수로 둔다.
 *
 * 배기량 1,000cc 이하 경차는 개별소비세 과세 대상이 아니다. 따로 차종을 두지
 * 않고 세율에 0을 넣으면 그 경우가 된다 — 출고가는 과세표준의 1.1배가 된다.
 *
 * 원 단위 절사는 여기서 하지 않는다. 반올림을 넣으면 정방향과 역산이 서로
 * 어긋나 왕복이 깨진다. 다듬는 것은 화면에서 표시할 때만 한다.
 */

/** 승용차 개별소비세 기본 세율 — 탄력세율이 적용된 시기에는 이보다 낮다 */
export const DEFAULT_EXCISE_RATE = 0.05;
/** 교육세는 개별소비세액의 30% */
export const EDUCATION_TAX_RATE = 0.3;
export const VAT_RATE = 0.1;
/**
 * 개별소비세 1원이 출고가를 얼마 움직이는가.
 * 개소세가 줄면 그것을 기준으로 잡는 교육세와, 둘을 얹은 금액에 붙는 부가세가
 * 함께 줄어든다. 그래서 감면액보다 큰 폭으로 출고가가 내려간다.
 */
export const EXCISE_LEVERAGE = (1 + EDUCATION_TAX_RATE) * (1 + VAT_RATE);

export interface ExciseBreakdown {
  /** 과세표준(공장도가) */
  base: number;
  /** 실제로 적용된 개별소비세 세율 */
  exciseRate: number;
  excise: number;
  educationTax: number;
  vat: number;
  /** 세 세금의 합계 */
  taxTotal: number;
  /** 출고가 = 과세표준 + 세금 합계 */
  releasePrice: number;
  /** 출고가에서 세금이 차지하는 비율(%) */
  taxRatio: number;
}

/**
 * 과세표준 1원이 출고가로 불어나는 배수.
 *
 *   출고가 = 과세표준 × (1 + 세율 × 1.3) × 1.1
 *
 * 정방향과 역산이 이 하나의 배수를 함께 쓰므로 두 방향이 어긋날 수 없다.
 */
export const priceMultiplier = (exciseRate: number): number =>
  (1 + Math.max(0, exciseRate) * (1 + EDUCATION_TAX_RATE)) * (1 + VAT_RATE);

/** 공장도가와 세율 → 출고가까지 층층이 */
export function calcExcise(base: number, exciseRate: number): ExciseBreakdown {
  const b = Math.max(0, base);
  const r = Math.max(0, exciseRate);

  const excise = b * r;
  const educationTax = excise * EDUCATION_TAX_RATE;
  // 부가세의 과세표준은 공장도가가 아니라 앞의 두 세금을 얹은 금액이다
  const vat = (b + excise + educationTax) * VAT_RATE;
  const taxTotal = excise + educationTax + vat;
  const releasePrice = b + taxTotal;

  return {
    base: b,
    exciseRate: r,
    excise,
    educationTax,
    vat,
    taxTotal,
    releasePrice,
    taxRatio: releasePrice > 0 ? (taxTotal / releasePrice) * 100 : 0,
  };
}

/**
 * 출고가만 알 때 그 안에 든 세금을 되짚는다 — 이 계산기의 핵심.
 *
 * 소비자가 아는 숫자는 공장도가가 아니라 출고가 하나다. 출고가는 과세표준에
 * priceMultiplier를 곱한 값이므로, 그 배수로 나누면 공장도가가 나오고
 * 거기서 다시 정방향으로 풀면 세 세금이 갈라진다.
 */
export function fromReleasePrice(releasePrice: number, exciseRate: number): ExciseBreakdown {
  const p = Math.max(0, releasePrice);
  return calcExcise(p / priceMultiplier(exciseRate), exciseRate);
}

export interface RateCompare {
  /** 내리기 전 */
  before: ExciseBreakdown;
  /** 내린 뒤 — 감면 한도를 반영한 실제 결과 */
  after: ExciseBreakdown;
  /** 내린 세율 자체. 한도에 걸리면 after.exciseRate가 이보다 높다 */
  nominalRate: number;
  /** 실제로 깎인 개별소비세 */
  exciseCut: number;
  /** 한도에 걸려 다 못 깎였는가 */
  capped: boolean;
  /** 출고가가 내려간 금액 */
  saving: number;
  /** 출고가가 내려간 비율(%) */
  savingRatio: number;
}

/**
 * 세율을 내리면 출고가가 얼마 싸지는가 (예: 5% → 3.5%).
 *
 * 개별소비세 인하 소식이 나오면 사람들이 찾는 숫자는 이것 하나다.
 *
 * 감면 한도(cap)도 함께 받는다. 인하가 세율만 내린 것이 아니라 **깎아 주는
 * 세액에 상한**을 둔 적이 있어서(예: 100만원), 한도를 무시하면 비싼 차에서
 * 아끼는 금액이 크게 부풀려진다. 한도가 없던 시기는 0을 넣는다. 친환경차
 * 개별소비세 감면도 같은 모양(한도가 붙은 감면)이라 이 인자로 다룬다 —
 * 한도 금액은 시기와 차종마다 달라 넣어 두지 않는다.
 */
export function compareRates(
  base: number,
  fromRate: number,
  toRate: number,
  cap = 0,
): RateCompare {
  const before = calcExcise(base, fromRate);
  const nominalRate = Math.min(Math.max(0, toRate), before.exciseRate);
  const plain = calcExcise(before.base, nominalRate);

  // 한도가 있으면 그만큼만 깎인다. 깎인 세액을 세율로 되돌려 정방향으로 다시 푼다.
  const wanted = before.excise - plain.excise;
  const exciseCut = cap > 0 ? Math.min(wanted, cap) : wanted;
  const appliedRate = before.base > 0
    ? (before.excise - exciseCut) / before.base
    : nominalRate;
  const after = calcExcise(before.base, appliedRate);

  const saving = before.releasePrice - after.releasePrice;
  return {
    before,
    after,
    nominalRate,
    exciseCut,
    capped: exciseCut < wanted,
    saving,
    savingRatio: before.releasePrice > 0 ? (saving / before.releasePrice) * 100 : 0,
  };
}
