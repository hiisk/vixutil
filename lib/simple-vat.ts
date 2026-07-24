/**
 * 간이과세자 부가가치세 — 업종별 부가가치율 기준.
 *
 * 부가세 계산기(vat)는 일반과세 기준으로 공급가액과 세액을 나눈다. 간이과세자는
 * 계산 구조가 완전히 달라서(매출 × 부가가치율 × 10%) 별도 도구가 필요하다.
 * 소규모 사업자·프리랜서가 자기 부가세 부담을 가늠할 때 찾는다.
 *
 * 계산:
 *   납부세액 = 매출액(공급대가) × 업종별 부가가치율 × 10%
 *   여기서 매입액에 대한 세액공제(매입액 × 0.5%)를 뺀다.
 *
 * 중요한 두 기준:
 *   - 연 매출 4,800만원 미만이면 납부의무가 면제된다(세액이 있어도 안 낸다).
 *   - 연 매출 8,000만원 이상이면 간이과세 대상이 아니라 일반과세로 넘어간다.
 *
 * 부가가치율은 국세청이 업종별로 정한 값(2021.7 개정)이다. 업종 경계 판단은
 * 사용자가 하도록 드롭다운으로 두고, 값 자체(15~40%)만 제공한다 — 업종을 잘못
 * 분류해 알려주는 것보다 안전하다.
 */

export const VAT_RATE = 0.1;
export const EXEMPTION_THRESHOLD = 48_000_000;
export const SIMPLE_TAX_CEILING = 80_000_000;
/** 매입액에 대한 세액공제율 (매입세액공제) */
export const PURCHASE_CREDIT_RATE = 0.005;

export interface IndustryRate {
  id: string;
  label: string;
  /** 부가가치율 */
  rate: number;
  examples: string;
}

export const INDUSTRY_RATES: IndustryRate[] = [
  { id: 'retail',   label: '소매·음식점업', rate: 0.15, examples: '소매, 음식점, 재생용 재료 수집' },
  { id: 'manufacture', label: '제조·농림어업', rate: 0.20, examples: '제조, 농·임·어업, 소화물 운송' },
  { id: 'lodging',  label: '숙박업', rate: 0.25, examples: '숙박' },
  { id: 'service',  label: '건설·운수·통신·기타 서비스', rate: 0.30, examples: '건설, 운수·창고, 정보통신, 기타 서비스' },
  { id: 'finance',  label: '금융·부동산임대·전문서비스', rate: 0.40, examples: '금융·보험, 부동산 임대, 전문·과학·기술' },
];

export interface SimpleVatInput {
  /** 연 매출액 (공급대가, 부가세 포함 금액) */
  sales: number;
  /** 업종 id */
  industryId: string;
  /** 연 매입액 (세금계산서 수취분) */
  purchases: number;
}

export interface SimpleVatResult {
  sales: number;
  industry: IndustryRate;
  /** 매출에 대한 세액 = 매출 × 부가가치율 × 10% */
  outputTax: number;
  /** 매입세액공제 = 매입액 × 0.5% */
  purchaseCredit: number;
  /** 납부세액 (공제 후, 0 미만이면 0) */
  payable: number;
  /** 매출이 4,800만원 미만이라 납부 면제인가 */
  exempt: boolean;
  /** 매출이 8,000만원 이상이라 간이과세 대상이 아닌가 */
  overCeiling: boolean;
  /** 면제·초과를 반영한 실제 낼 금액 */
  finalPayable: number;
}

export function calcSimpleVat({ sales, industryId, purchases }: SimpleVatInput): SimpleVatResult {
  const s = Math.max(0, sales);
  const p = Math.max(0, purchases);
  const industry = INDUSTRY_RATES.find(i => i.id === industryId) ?? INDUSTRY_RATES[0];

  const outputTax = s * industry.rate * VAT_RATE;
  const purchaseCredit = p * PURCHASE_CREDIT_RATE;
  const payable = Math.max(0, Math.floor(outputTax - purchaseCredit));

  const exempt = s < EXEMPTION_THRESHOLD;
  const overCeiling = s >= SIMPLE_TAX_CEILING;

  return {
    sales: s,
    industry,
    outputTax,
    purchaseCredit,
    payable,
    exempt,
    overCeiling,
    // 4,800만원 미만이면 납부 면제라 실제로는 0을 낸다.
    finalPayable: exempt ? 0 : payable,
  };
}
