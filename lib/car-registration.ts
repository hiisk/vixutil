/**
 * 자동차 취득 시 내는 세금과 공과금.
 *
 * 차값 외에 얼마가 더 드는지가 예산 계획에서 가장 자주 빠진다. 취득세만
 * 알아도 몇십만 원 단위가 달라진다.
 *
 * 취득세율 (지방세법)
 *  - 비영업용 승용차: 7%
 *  - 경차(배기량 1,000cc 이하 & 길이·너비·높이 요건): 4%, 다만 일정 한도까지 감면
 *  - 승합·화물: 5%
 *
 * 공채(도시철도채권·지역개발채권)는 지자체 조례로 매입 비율이 정해지고
 * 지역·차종에 따라 달라 하나의 값으로 못 박을 수 없다. 그래서 비율을 입력으로
 * 받고, 즉시 매도할 때의 할인율도 입력으로 둔다.
 *
 * 결과는 추정치다. 개별소비세·교육세는 신차 출고가에 이미 포함돼 있고,
 * 친환경차 감면과 다자녀 감면 등은 요건이 복잡해 반영하지 않았다.
 */

export type CarType = 'passenger' | 'light' | 'van' | 'truck';

export interface CarTypeInfo {
  id: CarType;
  label: string;
  /** 취득세율 */
  rate: number;
  note: string;
}

export const CAR_TYPES: CarTypeInfo[] = [
  { id: 'passenger', label: '승용차 (비영업용)', rate: 0.07, note: '가장 일반적인 경우' },
  { id: 'light',     label: '경차',              rate: 0.04, note: '1,000cc 이하 · 감면 한도 있음' },
  { id: 'van',       label: '승합차',            rate: 0.05, note: '11인승 이상 등' },
  { id: 'truck',     label: '화물차',            rate: 0.05, note: '적재 목적 차량' },
];

/** 경차 취득세 감면 한도 (원) — 이 금액까지는 면제된다 */
export const LIGHT_CAR_EXEMPTION = 750_000;

export interface RegistrationInput {
  /** 차량 가격 (원) — 신차는 출고가, 중고차는 과세표준액 */
  price: number;
  carType: CarType;
  /** 공채 매입 비율 (%) — 지역·차종별로 다르다 */
  bondRate: number;
  /** 공채를 즉시 매도할 때의 할인율 (%) — 매입액 중 잃는 비율 */
  bondDiscountRate: number;
  /** 번호판·증지 등 등록 대행 실비 (원) */
  etcFee: number;
}

export interface RegistrationResult {
  /** 감면 전 취득세 */
  acquisitionTaxBefore: number;
  /** 경차 등 감면액 */
  exemption: number;
  /** 실제 내는 취득세 */
  acquisitionTax: number;
  /** 공채 매입액 (되팔면 대부분 돌아온다) */
  bondPurchase: number;
  /** 공채를 즉시 매도할 때 실제로 잃는 금액 */
  bondCost: number;
  etcFee: number;
  /** 차값을 뺀 부대비용 합계 (공채는 매도 손실만 반영) */
  extraTotal: number;
  /** 차값 + 부대비용 */
  grandTotal: number;
  /** 차값 대비 부대비용 비율 (%) */
  extraRate: number;
}

export function calcRegistration(input: RegistrationInput): RegistrationResult {
  const price = Math.max(0, input.price);
  const info = CAR_TYPES.find(t => t.id === input.carType) ?? CAR_TYPES[0];

  const acquisitionTaxBefore = Math.floor(price * info.rate);
  // 경차는 감면 한도까지 면제된다. 세액이 한도보다 작으면 전액 면제.
  const exemption = input.carType === 'light'
    ? Math.min(acquisitionTaxBefore, LIGHT_CAR_EXEMPTION)
    : 0;
  const acquisitionTax = acquisitionTaxBefore - exemption;

  const bondPurchase = Math.floor(price * Math.max(0, input.bondRate) / 100);
  const bondCost = Math.floor(bondPurchase * Math.max(0, Math.min(100, input.bondDiscountRate)) / 100);

  const etcFee = Math.max(0, input.etcFee);
  const extraTotal = acquisitionTax + bondCost + etcFee;

  return {
    acquisitionTaxBefore,
    exemption,
    acquisitionTax,
    bondPurchase,
    bondCost,
    etcFee,
    extraTotal,
    grandTotal: price + extraTotal,
    extraRate: price > 0 ? (extraTotal / price) * 100 : 0,
  };
}
