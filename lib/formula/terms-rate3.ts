/**
 * 비율 섹션 - 사업·마케팅 비율 열둘에서 생긴 용어(3언어).
 *
 * 있는 것은 새로 만들지 않았다 — 마크업·이익률·구매가·연 감가율·실수령액·세전
 * 금액·배수·환전 스프레드는 이미 있어서 그대로 빌려 썼다. 여기 있는 것은 라벨을
 * 빌리면 뜻이 어긋나는 것들뿐이다: 고정비는 '금액'이 아니고, 광고비는 '원가'가
 * 아니며, 인출률은 '연이율'이 아니다.
 */
import type { Term } from './terms.ts';

export const RATE3_TERMS: Record<string, Term> = {
  /* 마진 vs 마크업 — 같은 이익을 두 기준으로 부른 값이라 이름이 둘 다 필요하다 */
  marginFromMarkup: { ko: '이 마크업의 이익률', en: 'Margin this markup gives' },
  markupFromMargin: { ko: '이 이익률의 마크업', en: 'Markup this margin needs' },
  priceFactor: { ko: '원가의 몇 배', en: 'Price as a multiple of cost' },

  /* 손익분기·공헌이익 */
  fixedCost: { ko: '고정비', en: 'Fixed costs' },
  varCost: { ko: '개당 변동비', en: 'Variable cost each' },
  targetProfit: { ko: '목표 이익', en: 'Target profit' },
  contribMargin: { ko: '개당 공헌이익', en: 'Contribution each' },
  contribRatio: { ko: '공헌이익률', en: 'Contribution ratio' },
  breakEvenUnits: { ko: '손익분기 수량', en: 'Break-even units' },
  breakEvenRevenue: { ko: '손익분기 매출', en: 'Break-even revenue' },
  unitsForProfit: { ko: '목표 이익 수량', en: 'Units for target profit' },

  /* 투자 회수 */
  monthlyCash: { ko: '월 순현금', en: 'Net cash a month' },
  paybackMonths: { ko: '회수 기간', en: 'Payback period' },

  /* 정액 감가상각 */
  salvageValue: { ko: '잔존가치', en: 'Salvage value' },
  yearsElapsed: { ko: '지난 햇수', en: 'Years elapsed' },
  annualDepr: { ko: '연 감가액', en: 'Depreciation a year' },
  monthlyDepr: { ko: '월 감가액', en: 'Depreciation a month' },
  bookValue: { ko: '장부가액', en: 'Book value' },

  /* 저축률·은퇴 자산 */
  monthlySaved: { ko: '월 저축액', en: 'Saved each month' },
  savingsRate: { ko: '저축률', en: 'Savings rate' },
  yearsPerYearSpend: { ko: '1년치 모으는 기간', en: 'Years to bank one year' },
  annualSpend: { ko: '연 생활비', en: 'Yearly spending' },
  withdrawRate: { ko: '인출률', en: 'Withdrawal rate' },
  fireNumber: { ko: '필요 자산', en: 'Portfolio needed' },

  /* 주거비 부담 */
  housingCost: { ko: '월 주거비', en: 'Housing a month' },
  guidePct: { ko: '기준선', en: 'Guideline' },
  guideMax: { ko: '기준선 금액', en: 'Cap at that guideline' },

  /* 프리랜서 시급 */
  targetIncome: { ko: '목표 연 소득', en: 'Target yearly income' },
  billableHours: { ko: '주당 청구 시간', en: 'Billable hours a week' },
  weeksWorked: { ko: '일하는 주 수', en: 'Weeks worked' },
  overheadPct: { ko: '비청구 부담률', en: 'Non-billable overhead' },
  hourlyRate: { ko: '필요 시급', en: 'Hourly rate needed' },
  billableYear: { ko: '연 청구 시간', en: 'Billable hours a year' },
  mustBill: { ko: '청구해야 할 금액', en: 'Amount to invoice' },

  /* 교차 환율 */
  rateAB: { ko: 'A/B 환율', en: 'A per B' },
  rateBC: { ko: 'B/C 환율', en: 'B per C' },
  rateAC: { ko: 'A/C 환율', en: 'A per C' },
  rateCA: { ko: 'C/A 환율', en: 'C per A' },
  netCrossRate: { ko: '스프레드 두 번 반영', en: 'Rate after both spreads' },

  /* 광고 효율 */
  adSpend: { ko: '광고비', en: 'Ad spend' },
  adRevenue: { ko: '광고 매출', en: 'Attributed revenue' },
  roas: { ko: 'ROAS', en: 'ROAS' },
  roasPct: { ko: 'ROAS(%)', en: 'ROAS as a percentage' },
  breakEvenRoas: { ko: '본전 ROAS', en: 'Break-even ROAS' },
  impressions: { ko: '노출 수', en: 'Impressions' },
  clicks: { ko: '클릭 수', en: 'Clicks' },
  cpc: { ko: 'CPC(클릭당 비용)', en: 'CPC' },
  cpm: { ko: 'CPM(1,000회당 비용)', en: 'CPM' },
  ctr: { ko: 'CTR(클릭률)', en: 'CTR' },
  ctrTarget: { ko: '목표 CTR', en: 'Target CTR' },
  cpcAtTarget: { ko: '그 CTR에서의 CPC', en: 'CPC at that CTR' },
};

/** 단위는 하나만 늘었다 — 노출·클릭을 세는 '회'. 주(week)·시간(hour)은 이미 있다 */
export const RATE3_UNITS: Record<string, Term> = {
  hit: { ko: '회', en: '' },
};
