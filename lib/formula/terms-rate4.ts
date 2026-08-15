/**
 * 비율 섹션 - 투자·구독·개인재무 스물넷에서 생긴 용어(3언어).
 *
 * 있는 것은 새로 만들지 않았다 — 할인율(연)·투자금·세율·연이율·이익률·고정비·
 * 원금·월 상환액·명목 이자율·물가 상승률·실질 이자율·인출률·연 청구 시간·
 * 회수 기간·수익률·전체 일수·잔존가치·구매가·차이·실수령액·아끼는 이자·
 * 필요 월 납입·퍼센트포인트·2배 되는 기간은 그대로 빌려 썼다.
 *
 * 여기 있는 것은 라벨을 빌리면 뜻이 어긋나는 것들뿐이다: 매출액은 '합계'가 아니고,
 * 개당 공헌이익은 총 공헌이익이 아니며, rate3의 '필요 시급'은 제안받은 시급이 아니다.
 */
import type { Term } from './terms.ts';

export const RATE4_TERMS: Record<string, Term> = {
  /* 순현재가치·내부수익률 — 같은 세 숫자를 두 방향으로 읽는다 */
  annualCash: { ko: '연 순현금', en: 'Net cash a year' },
  npvValue: { ko: '순현재가치(NPV)', en: 'Net present value' },
  pvInflow: { ko: '들어올 돈의 현재가치', en: 'PV of the inflows' },
  profitIndex: { ko: '수익성 지수', en: 'Profitability index' },
  irrPct: { ko: '근사 IRR', en: 'Approximate IRR' },

  /* 가중평균자본비용 */
  equityWeight: { ko: '자본 비중', en: 'Equity weight' },
  costEquity: { ko: '자기자본 비용', en: 'Cost of equity' },
  costDebt: { ko: '타인자본 비용', en: 'Cost of debt' },
  debtWeight: { ko: '부채 비중', en: 'Debt weight' },
  afterTaxDebt: { ko: '세후 부채 비용', en: 'After-tax cost of debt' },
  wacc: { ko: 'WACC', en: 'WACC' },

  /* 손익 지표 — 매출액은 '합계'와 달리 세금·할인 이야기가 아니다 */
  revenue: { ko: '매출액', en: 'Revenue' },
  operatingProfit: { ko: '영업이익', en: 'Operating profit' },
  deprAmort: { ko: '감가상각비', en: 'Depreciation and amortisation' },
  ebitdaValue: { ko: 'EBITDA', en: 'EBITDA' },
  ebitdaMargin: { ko: 'EBITDA 이익률', en: 'EBITDA margin' },
  operMargin: { ko: '영업이익률', en: 'Operating margin' },

  /* 재고·매출채권 회전 */
  cogs: { ko: '매출원가', en: 'Cost of goods sold' },
  avgInventory: { ko: '평균 재고', en: 'Average inventory' },
  invTurns: { ko: '재고 회전율', en: 'Inventory turns' },
  inventoryDays: { ko: '재고 일수', en: 'Days of inventory' },
  cogsPerDay: { ko: '하루 매출원가', en: 'COGS a day' },
  receivables: { ko: '매출채권 잔액', en: 'Receivables' },
  dso: { ko: '회수 일수(DSO)', en: 'Days sales outstanding' },
  revenuePerDay: { ko: '하루 매출', en: 'Revenue a day' },
  carryCost: { ko: '연 자금 비용', en: 'Yearly funding cost' },
  cashPer10Days: { ko: '10일 단축분', en: 'Cash from ten days' },

  /* 영업 레버리지 — 개당 공헌이익(contribMargin)과 달리 기간 합계다 */
  contribTotal: { ko: '총 공헌이익', en: 'Total contribution' },
  salesChangePct: { ko: '매출 변화율', en: 'Change in sales' },
  dol: { ko: '영업 레버리지도', en: 'Degree of operating leverage' },
  profitChangePct: { ko: '영업이익 변화율', en: 'Change in operating profit' },

  /* 40의 법칙 */
  revGrowth: { ko: '연 매출 성장률', en: 'Revenue growth' },
  ruleLine: { ko: '기준선', en: 'The line' },
  ruleSum: { ko: '성장률 + 이익률', en: 'Growth plus margin' },
  marginNeeded: { ko: '필요 이익률', en: 'Margin needed' },

  /* 이탈·유지 */
  custStart: { ko: '기초 고객 수', en: 'Customers at start' },
  custLost: { ko: '이탈 고객 수', en: 'Customers lost' },
  churnRate: { ko: '월 이탈률', en: 'Monthly churn' },
  retentionRate: { ko: '월 유지율', en: 'Monthly retention' },
  avgLifeMonths: { ko: '평균 유지 개월', en: 'Average lifetime' },
  custLeft: { ko: '남은 고객 수', en: 'Customers left' },
  retainedAfter: { ko: '기간 뒤 유지율', en: 'Retention after the period' },
  custAfter: { ko: '기간 뒤 고객 수', en: 'Customers after the period' },

  /* 고객 생애가치·획득비용 */
  arpu: { ko: '고객당 월 매출', en: 'Revenue per customer a month' },
  monthlyProfit: { ko: '고객당 월 매출이익', en: 'Gross profit a customer a month' },
  customerLtv: { ko: '고객 생애가치', en: 'Customer lifetime value' },
  cac: { ko: '고객 획득비용', en: 'Customer acquisition cost' },
  ltvCacRatio: { ko: 'LTV ÷ CAC', en: 'LTV to CAC' },
  cacPayback: { ko: 'CAC 회수 개월', en: 'Months to recover CAC' },
  cacCeiling: { ko: '3:1 기준 CAC 한도', en: 'CAC ceiling at 3:1' },
  salesMarketing: { ko: '영업·마케팅 비용', en: 'Sales and marketing spend' },
  newCustomers: { ko: '새 고객 수', en: 'New customers' },
  paidShare: { ko: '유료 유입 비중', en: 'Share won by paid' },
  cacPaid: { ko: '유료 기준 CAC', en: 'Paid-only CAC' },
  paidCustomers: { ko: '유료로 얻은 고객 수', en: 'Customers won by paid' },

  /* 구독 매출 */
  mrrNow: { ko: '이번 달 MRR', en: 'MRR this month' },
  mrrPrev: { ko: '지난달 MRR', en: 'MRR a month ago' },
  mrrGrowth: { ko: '월 MRR 성장률', en: 'Monthly MRR growth' },
  arr: { ko: 'ARR(연 환산)', en: 'ARR' },
  growthAnnual: { ko: '연 환산 성장률', en: 'Annualised growth' },
  netNewMrr: { ko: '순증 MRR', en: 'Net new MRR' },

  /* 전환·장바구니 */
  visitors: { ko: '방문자 수', en: 'Visitors' },
  orders: { ko: '주문 수', en: 'Orders' },
  targetConvRate: { ko: '목표 전환율', en: 'Target conversion' },
  convRate: { ko: '전환율', en: 'Conversion rate' },
  ordersAtTarget: { ko: '목표 전환율의 주문 수', en: 'Orders at that rate' },
  visitorsNeeded: { ko: '지금 전환율로 필요한 방문자', en: 'Visitors needed at today’s rate' },
  extraVisitors: { ko: '더 데려와야 할 방문자', en: 'Extra visitors needed' },
  aovNow: { ko: '현재 평균 주문금액', en: 'Average order value now' },
  aovTarget: { ko: '목표 평균 주문금액', en: 'Target order value' },
  aovUplift: { ko: '필요 상승률', en: 'Uplift needed' },
  revenueAfter: { ko: '목표 달성 후 매출', en: 'Revenue at the target' },
  revenueGain: { ko: '늘어나는 매출', en: 'Revenue gained' },

  /* 두 빚 갚는 순서 */
  debtA: { ko: 'A 빚 잔액', en: 'First balance' },
  debtARate: { ko: 'A 빚 이율', en: 'First rate' },
  debtB: { ko: 'B 빚 잔액', en: 'Second balance' },
  debtBRate: { ko: 'B 빚 이율', en: 'Second rate' },
  avalancheMonths: { ko: '고금리 먼저: 걸리는 개월', en: 'Highest rate first: months' },
  snowballMonths: { ko: '작은 것 먼저: 걸리는 개월', en: 'Smallest balance first: months' },
  avalancheInterest: { ko: '고금리 먼저: 총 이자', en: 'Highest rate first: interest' },
  snowballInterest: { ko: '작은 것 먼저: 총 이자', en: 'Smallest balance first: interest' },
  interestDiff: { ko: '이자 차이', en: 'Interest difference' },

  /* 한도 사용률 */
  cardBalance: { ko: '쓴 금액', en: 'Balance used' },
  cardLimit: { ko: '한도', en: 'Credit limit' },
  targetUtil: { ko: '목표 사용률', en: 'Target utilisation' },
  utilisation: { ko: '한도 사용률', en: 'Utilisation' },
  balanceAtTarget: { ko: '목표 사용률의 잔액', en: 'Balance at that target' },
  payDown: { ko: '갚아야 할 금액', en: 'Amount to pay down' },
  limitNeeded: { ko: '필요 한도', en: 'Limit that would do it' },

  /* 원리금 추가 상환 */
  extraMonthly: { ko: '매달 더 넣는 금액', en: 'Extra each month' },
  monthsSaved: { ko: '줄어드는 개월', en: 'Months saved' },
  newMonths: { ko: '새 상환 기간', en: 'New term' },

  /* 리스 vs 구매 */
  leaseMonthly: { ko: '월 리스료', en: 'Lease a month' },
  leaseUpfront: { ko: '리스 초기비용', en: 'Lease upfront' },
  leaseTotal: { ko: '리스 총비용', en: 'Total cost to lease' },
  buyTotal: { ko: '구매 총비용', en: 'Total cost to buy' },
  buyPerMonth: { ko: '구매 시 월 환산', en: 'Buying, per month' },

  /* 50·30·20 예산 */
  needsSpend: { ko: '필수 지출', en: 'Needs spending' },
  wantsSpend: { ko: '여유 지출', en: 'Wants spending' },
  needsCap: { ko: '필수 50% 한도', en: 'Needs at 50%' },
  wantsCap: { ko: '여유 30% 한도', en: 'Wants at 30%' },
  saveTarget: { ko: '저축 20% 몫', en: 'Saving at 20%' },
  savingsLeft: { ko: '실제로 남는 금액', en: 'Actually left over' },

  /* 연봉 vs 시급 */
  annualSalary: { ko: '연봉', en: 'Annual salary' },
  benefitPct: { ko: '복리후생 비율', en: 'Benefits on top' },
  salaryHoursYear: { ko: '연 유급 시간', en: 'Paid hours a year' },
  hourlyOffer: { ko: '제안받은 시급', en: 'Hourly rate offered' },
  salaryHourly: { ko: '연봉의 시간당 값', en: 'Salary per paid hour' },
  hourlyToMatch: { ko: '맞먹는 시급', en: 'Hourly rate to match' },
  contractorAnnual: { ko: '시급 기준 연 수입', en: 'Yearly take at that rate' },
  packageGap: { ko: '두 제안의 차이', en: 'Gap between the two' },

  /* 세후 실질 수익률 */
  afterTaxRate: { ko: '세후 수익률', en: 'Return after tax' },

  /* 은퇴 적립 부족액 */
  targetRetireIncome: { ko: '목표 연 은퇴소득', en: 'Retirement income wanted' },
  potNeeded: { ko: '필요 은퇴 자산', en: 'Pot needed' },
  savedGrown: { ko: '지금 자산이 자란 값', en: 'What today’s savings grow to' },
  gapAmount: { ko: '모자란 금액', en: 'Shortfall' },

  /* ───────── 수영장 물 관리 ─────────
   * 농도 용어는 이미 concentration·targetConc가 있지만 그것들은 %를 다룬다.
   * 수영장은 전부 ppm이고, '현재 값'과 '목표 값'을 나란히 놓고 그 차이를 메우는
   * 모양이라 짝을 이루는 이름이 따로 필요하다. */
  fcNow:            { ko: '현재 유리염소',      en: 'Free chlorine now' },
  fcTarget:         { ko: '목표 유리염소',      en: 'Free chlorine wanted' },
  chlorineStrength: { ko: '제품 유효염소',      en: 'Product strength' },
  chlorineDose:     { ko: '넣을 염소제',        en: 'Product to add' },
  pureChlorine:     { ko: '순수 유효염소',      en: 'As pure available chlorine' },
  dosePerPpm:       { ko: '1 ppm당 제품 양',    en: 'Product per 1 ppm' },
  saltNow:          { ko: '현재 염도',          en: 'Salinity now' },
  saltTarget:       { ko: '목표 염도',          en: 'Salinity wanted' },
  saltKg:           { ko: '넣을 소금',          en: 'Salt to add' },
  ppmPerBag:        { ko: '포대당 오르는 염도', en: 'Salinity one bag adds' },
  concNow:          { ko: '현재 농도',          en: 'Reading now' },
  concTarget:       { ko: '목표 농도',          en: 'Reading wanted' },
  fillConc:         { ko: '채움물 농도',        en: 'Fill water reading' },
  drainPct:         { ko: '빼야 할 물 비율',    en: 'Share to drain' },
  drainLiters:      { ko: '빼야 할 물 양',      en: 'Water to drain' },
  halfDrainConc:    { ko: '절반만 갈면 남는 농도', en: 'Reading after half a change' },
};

/** 주문을 세는 '건'과, 수영장 수치가 쓰는 ppm. 개(piece)·명(people)·회(hit)는 이미 있다 */
export const RATE4_UNITS: Record<string, Term> = {
  order: { ko: '건', en: '' },
  ppm:   { ko: 'ppm', en: 'ppm' },
};
