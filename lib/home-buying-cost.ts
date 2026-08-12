/**
 * 집값 말고 **더 드는 돈** 전부.
 *
 * 집을 살 때 사람들이 예산을 어긋나게 잡는 자리는 집값이 아니다. 집값은 계약서에
 * 적혀 있어 틀릴 수가 없다. 어긋나는 것은 취득세·중개보수·법무사 보수·이사비처럼
 * 하나하나는 작아 보이는데 합치면 집값의 몇 퍼센트가 되는 항목들이다.
 * 그래서 이 계산은 "집값이 얼마인가"가 아니라 **"집값 위에 얼마가 더 얹히는가"**에
 * 답한다. 결과의 주인공은 합계가 아니라 **집값 대비 비율**이다.
 *
 * ── 무엇을 코드에 박고 무엇을 입력으로 받는가 ──────────────────────
 * lib/car-registration.ts와 같은 태도를 따른다. 법이 정한 값이 하나로
 * 정해져 있고 내가 확인한 것만 박고, 지역·조례·협의로 갈리는 것은 전부 입력으로
 * 받는다. 확인 못 한 숫자를 기본값으로 넣으면 그 숫자가 답처럼 보인다.
 *
 *   박은 것   1주택 표준 취득세율 골격(6억/9억), 인지세 구간표
 *   받는 것   중과세율, 중개보수 요율, 채권 매입비율·할인율, 법무사·이사·인테리어·대출비용
 *
 * ── 이 계산이 답하지 못하는 것 ──────────────────────────────────
 * 취득세율은 주택 수·조정대상지역·면적으로 갈리고 그 기준이 정책에 따라 바뀐다.
 * 여기서 세율을 만들어 주는 housingTaxRates는 **취득 후 1주택인 표준 유상거래**
 * 하나만 다룬다. 다주택·조정대상지역 중과는 세율을 직접 넣어야 하고, 그 세율은
 * /calculator/acquisition-tax 에서 확인한다. 생애최초 감면·신혼부부 감면 등
 * 요건이 붙는 감면은 반영하지 않았다 — 요건을 코드가 판단할 수 없다.
 */

/** 표준세율이 갈리는 자리 — 6억원 이하와 9억원 초과 (지방세법 제11조 제1항 제8호) */
export const TIER_LOW = 600_000_000;
export const TIER_HIGH = 900_000_000;

/** 6억원 이하 주택의 취득세율 */
export const RATE_LOW = 0.01;
/** 9억원 초과 주택의 취득세율 */
export const RATE_HIGH = 0.03;

/**
 * 지방교육세는 취득세액의 10%다.
 *
 * 법은 "취득세율의 50%를 곱한 세율에서 산출한 금액의 20%"로 적는데, 주택 유상
 * 거래에서는 결국 취득세액의 10%가 된다. 6억 이하 주택이 1% + 0.1% = 1.1%,
 * 9억 초과가 3% + 0.3% = 3.3%로 알려진 그 값이다.
 */
export const EDU_TAX_ON_ACQ = 0.1;

/**
 * 농어촌특별세는 취득가액의 0.2%인데, **국민주택규모 이하는 비과세**다.
 *
 * 전용면적 85㎡가 그 경계다. 같은 값의 집이라도 면적 한 줄로 0.2%가 붙거나
 * 안 붙는다 — 9억 초과 주택이 3.3%인지 3.5%인지가 여기서 갈린다.
 */
export const RURAL_TAX_RATE = 0.002;
/** 국민주택규모 (전용면적 ㎡) */
export const AREA_LIMIT = 85;

/** 취득가액에 각각 곱하는 세율 세 개 (소수 — 0.01이 1%) */
export interface TaxRates {
  /** 취득세율 */
  acquisition: number;
  /** 지방교육세율 */
  eduLocal: number;
  /** 농어촌특별세율 */
  rural: number;
}

/**
 * 취득 후 1주택인 표준 유상거래의 취득세율.
 *
 * 6억원 이하는 1%, 9억원 초과는 3%이고, 그 사이는 계단이 아니라
 *
 *   세율 = (취득가액 × 2 ÷ 3억원 − 3) ÷ 100
 *
 * 로 1%에서 3%까지 매끄럽게 올라간다. 6억원에서 1원만 넘어도 세율이 껑충
 * 뛰던 옛 구조를 없앤 산식이라, 양쪽 경계에서 값이 정확히 이어진다 —
 * 6억을 넣으면 1%, 9억을 넣으면 3%가 나온다. 검사가 그걸 지킨다.
 */
export function housingAcqRate(price: number): number {
  const p = Math.max(0, price);
  if (p <= TIER_LOW) return RATE_LOW;
  if (p <= TIER_HIGH) return (p * 2 / 300_000_000 - 3) / 100;
  return RATE_HIGH;
}

/**
 * 표준 1주택의 세율 세 개를 한꺼번에 만든다.
 *
 * 중과 대상이면 이 함수를 쓰지 말고 TaxRates를 직접 넣는다. 중과세율은
 * 정책에 따라 바뀌어 왔고, 그때의 지방교육세·농어촌특별세 비율도 같이
 * 달라진다. 바뀌는 숫자를 여기 박아 두면 틀린 답이 오래 남는다.
 */
export function housingTaxRates(price: number, overAreaLimit: boolean): TaxRates {
  const acquisition = housingAcqRate(price);
  return {
    acquisition,
    eduLocal: acquisition * EDU_TAX_ON_ACQ,
    rural: overAreaLimit ? RURAL_TAX_RATE : 0,
  };
}

/**
 * 인지세 — 계약서에 적은 금액의 구간별 정액 (인지세법 제3조).
 *
 * 요율이 아니라 정액이라 구간을 넘는 순간 금액이 뚝 뛴다. 10억원과
 * 10억원 + 1원의 인지세가 15만원과 35만원으로 갈린다.
 *
 * 주택은 **기재금액 1억원 이하면 비과세**다. 이 계산기는 주택만 다루므로
 * 그 면제를 항상 적용한다 — 그래서 1억원 이하 구간의 2만·4만·7만원은
 * 여기서 나오지 않는다. 구간표를 그대로 적어 둔 것은 법의 모양을 남겨
 * 두려는 것이고, 비주택에 쓰려면 면제 한 줄만 빼면 된다.
 *
 * 전자문서로 작성할 때의 감액 등 예외는 반영하지 않았다.
 */
export const STAMP_TIERS: { limit: number; duty: number }[] = [
  { limit: 10_000_000, duty: 0 },
  { limit: 30_000_000, duty: 20_000 },
  { limit: 50_000_000, duty: 40_000 },
  { limit: 100_000_000, duty: 70_000 },
  { limit: 1_000_000_000, duty: 150_000 },
  { limit: Infinity, duty: 350_000 },
];

/** 주택은 1억원 이하 비과세 */
export const STAMP_HOUSE_EXEMPT_UNDER = 100_000_000;

export function stampDuty(amount: number): number {
  const a = Math.max(0, amount);
  if (a <= STAMP_HOUSE_EXEMPT_UNDER) return 0;
  return STAMP_TIERS.find(t => a <= t.limit)!.duty;
}

export interface HomeBuyingInput {
  /** 집값 = 취득가액 (원) */
  price: number;
  /** 취득가액에 곱할 세율 셋 — housingTaxRates()로 만들거나 직접 넣는다 */
  taxRates: TaxRates;
  /**
   * 중개보수 요율 (%).
   *
   * 법이 정한 것은 상한이고 그 안에서는 협의로 정한다. 상한을 그대로 박아
   * 두면 "이게 정해진 값"으로 읽혀 깎을 수 있는 것을 못 깎는다. 구간별
   * 상한요율은 /calculator/broker-fee 에서 본다.
   */
  brokerRate: number;
  /** 중개보수에 부가세 10%를 더할지 — 중개사가 과세사업자면 붙는다 */
  brokerVat: boolean;
  /**
   * 국민주택채권 매입 비율 (%).
   *
   * 등기할 때 시가표준액에 따라 사야 하고, 비율이 지역과 조례로 갈린다.
   * 하나로 못 박아 입력으로 받는다 — car-registration.ts의 공채와 같다.
   */
  bondRate: number;
  /** 채권을 바로 되팔 때의 할인율 (%) — 매입액 중 실제로 잃는 비율 */
  bondDiscountRate: number;
  /** 법무사·등기 대행 보수 (원) */
  legalFee: number;
  /** 이사비 (원) */
  movingFee: number;
  /** 인테리어·수리비 (원) */
  interiorFee: number;
  /** 대출 부대비용 — 근저당 설정비·감정비 등 (원) */
  loanFee: number;
}

/** 화면 내역 한 줄 */
export interface CostItem {
  label: string;
  amount: number;
}

export interface HomeBuyingResult {
  acquisitionTax: number;
  eduLocalTax: number;
  ruralTax: number;
  /** 세금 셋의 합 */
  taxTotal: number;
  brokerFee: number;
  brokerVatAmount: number;
  /** 중개보수 + 부가세 */
  brokerTotal: number;
  stamp: number;
  /** 채권 매입액 — 되팔면 대부분 돌아오므로 합계에는 넣지 않는다 */
  bondPurchase: number;
  /** 즉시 매도할 때 실제로 잃는 금액 — 합계에 넣는 것은 이쪽이다 */
  bondCost: number;
  legalFee: number;
  movingFee: number;
  interiorFee: number;
  loanFee: number;
  /** 화면에 그대로 뿌리는 내역. extraTotal은 이 값들의 합과 정확히 같다 */
  items: CostItem[];
  /** 부대비용 합계 (원) */
  extraTotal: number;
  /** 집값 대비 부대비용 비율 (%) */
  extraRate: number;
  /** 총 필요자금 = 집값 + 부대비용 */
  grandTotal: number;
}

/**
 * 원 단위로 버린다.
 *
 * 세금은 원 아래를 절사하고, 항목마다 먼저 버린 뒤에 더한다. 반대로 하면
 * 화면에 보이는 항목들의 합과 합계가 1원씩 어긋난다 — 사람이 손으로 더해
 * 보고 안 맞으면 그 계산기는 믿지 않는다.
 */
const won = (n: number) => Math.floor(Math.max(0, n));

/** 비율 입력은 음수와 100% 넘는 값을 막는다 */
const pct = (n: number) => Math.max(0, Math.min(100, n)) / 100;

export function calcHomeBuyingCost(input: HomeBuyingInput): HomeBuyingResult {
  const price = Math.max(0, input.price);
  const { taxRates } = input;

  const acquisitionTax = won(price * Math.max(0, taxRates.acquisition));
  const eduLocalTax = won(price * Math.max(0, taxRates.eduLocal));
  const ruralTax = won(price * Math.max(0, taxRates.rural));
  const taxTotal = acquisitionTax + eduLocalTax + ruralTax;

  const brokerFee = won(price * pct(input.brokerRate));
  const brokerVatAmount = input.brokerVat ? won(brokerFee * 0.1) : 0;
  const brokerTotal = brokerFee + brokerVatAmount;

  const stamp = stampDuty(price);

  const bondPurchase = won(price * pct(input.bondRate));
  const bondCost = won(bondPurchase * pct(input.bondDiscountRate));

  const legalFee = won(input.legalFee);
  const movingFee = won(input.movingFee);
  const interiorFee = won(input.interiorFee);
  const loanFee = won(input.loanFee);

  // 0원인 항목까지 늘어놓으면 내역이 읽히지 않는다. 걸러내되, 합계는 이
  // 배열을 더해서 내므로 걸러도 합이 달라지지 않는다.
  const items: CostItem[] = [
    { label: '취득세', amount: acquisitionTax },
    { label: '지방교육세', amount: eduLocalTax },
    { label: '농어촌특별세', amount: ruralTax },
    { label: '중개보수', amount: brokerFee },
    { label: '중개보수 부가세', amount: brokerVatAmount },
    { label: '인지세', amount: stamp },
    { label: '채권 매도 손실', amount: bondCost },
    { label: '법무사·등기 대행', amount: legalFee },
    { label: '이사비', amount: movingFee },
    { label: '인테리어·수리', amount: interiorFee },
    { label: '대출 부대비용', amount: loanFee },
  ].filter(i => i.amount > 0);

  const extraTotal = items.reduce((s, i) => s + i.amount, 0);

  return {
    acquisitionTax,
    eduLocalTax,
    ruralTax,
    taxTotal,
    brokerFee,
    brokerVatAmount,
    brokerTotal,
    stamp,
    bondPurchase,
    bondCost,
    legalFee,
    movingFee,
    interiorFee,
    loanFee,
    items,
    extraTotal,
    extraRate: price > 0 ? (extraTotal / price) * 100 : 0,
    grandTotal: price + extraTotal,
  };
}

/*
 * ── 여기서부터는 취득세 계산기(app/(ko)/calculator/acquisition-tax)와 함께 쓴다 ──
 *
 * 2026-08-12에 그 페이지에서 100배 버그를 찾았다. 6~9억 구간 산식의 나눗수를
 * 3억이 아니라 300만으로 적어 두어 **7억 주택의 취득세를 32억으로 표시**하고
 * 있었다(세율 463%). 페이지 안에 셈이 박혀 있어 검사가 닿지 못한 자리였다.
 *
 * 그래서 세율을 이 lib으로 끌어내 두 페이지가 같은 함수를 쓰게 했다. 이제
 * tests/acquisition-tax.test.ts가 경계값과 공표된 합계 세율을 지킨다.
 */

/** 중과세율일 때의 지방교육세율 — 취득세액에 비례하지 않고 0.4%로 고정된다 */
export const HEAVY_EDU_RATE = 0.004;

/**
 * 중과세율별 농어촌특별세율 — 국민주택규모를 넘을 때만 붙는다.
 *
 * 표준세율(1~3%)에서는 0.2%인데 중과에서는 그만큼 함께 올라간다. 규칙으로
 * 유도하려 하지 않고 **공표된 합계 세율에 맞춘 값**을 적는다. 그 합계는 널리
 * 인용되는 값이라 검사가 밖에서 확인해 줄 수 있다:
 *
 *   8% 중과   85㎡ 이하 8.4%   초과 9.0%
 *   12% 중과  85㎡ 이하 12.4%  초과 13.4%
 */
export const HEAVY_RURAL_RATE: Record<string, number> = {
  '0.08': 0.006,
  '0.12': 0.01,
};

/** 중과세율인가 — 8% 이상이면 중과다 */
export const isHeavyRate = (acquisition: number): boolean => acquisition >= 0.08;

/**
 * 주택 취득세율 하나에서 세율 셋을 만든다 — 표준이든 중과든 한 곳에서 낸다.
 *
 * 표준세율은 지방교육세가 취득세액의 10%이고, 중과세율은 0.4% 고정이다.
 * 이 갈림을 두 페이지가 따로 적으면 한쪽만 고쳐질 때 조용히 어긋난다.
 */
export function housingRatesFor(acquisition: number, overAreaLimit: boolean): TaxRates {
  const heavy = isHeavyRate(acquisition);
  return {
    acquisition,
    eduLocal: heavy ? HEAVY_EDU_RATE : acquisition * EDU_TAX_ON_ACQ,
    rural: !overAreaLimit ? 0 : heavy ? (HEAVY_RURAL_RATE[String(acquisition)] ?? RURAL_TAX_RATE) : RURAL_TAX_RATE,
  };
}

/** 비주택(상가·토지) 유상취득 — 4% + 지방교육세 0.4% + 농어촌특별세 0.2% = 4.6% */
export const NON_HOUSING_RATES: TaxRates = { acquisition: 0.04, eduLocal: 0.004, rural: 0.002 };
