/**
 * 투자·구독·개인재무 스물넷에서 생긴 용어의 뜻풀이(3언어).
 *
 * 이 묶음의 라벨은 대부분 이름만으로는 분모가 안 보인다 — EBITDA 이익률은
 * 매출로 나눈 값이고, 재고 회전율은 매출액이 아니라 매출원가로 나눈 값이며,
 * 생애가치는 매출이 아니라 매출이익에서 나온다. 그 한 줄을 여기서 못 박는다.
 */
import type { Term } from './terms.ts';

export const RATE4_DESC: Record<string, Term> = {
  /* ───────── 순현재가치·내부수익률 ───────── */
  annualCash: { ko: '해마다 들어오는 순현금. 이 계산은 매년 같은 금액이라고 봅니다.', en: 'Net cash arriving each year; this page assumes the same amount every year.' },
  npvValue: { ko: '들어올 돈의 현재가치에서 투자금을 뺀 값. 0보다 크면 그 할인율을 넘긴 것입니다.', en: 'The present value of the inflows less the outlay; above zero clears that discount rate.' },
  pvInflow: { ko: '앞으로 들어올 돈을 지금 값으로 되돌려 모두 더한 값.', en: 'Every future inflow pulled back to today and added up.' },
  profitIndex: { ko: '넣은 1당 돌아오는 현재가치. 1보다 크면 NPV가 양수입니다.', en: 'Present value returned per 1 invested; above 1 means a positive NPV.' },
  irrPct: { ko: 'NPV를 0으로 만드는 할인율. 현금흐름이 고르다는 가정 위의 값입니다.', en: 'The discount rate that zeroes the NPV, assuming the cash flow is level.' },

  /* ───────── 가중평균자본비용 ───────── */
  equityWeight: { ko: '자본으로 조달한 비중. 나머지가 부채 비중이 됩니다.', en: 'The share funded by equity; the rest becomes the debt weight.' },
  costEquity: { ko: '주주가 요구하는 수익률. 관측되는 값이 아니라 추정치입니다.', en: 'The return shareholders demand — an estimate, not an observed number.' },
  costDebt: { ko: '빌린 돈에 물는 이율. 세금 효과를 붙이기 전 값입니다.', en: 'The rate paid on borrowings, before the tax shield is applied.' },
  debtWeight: { ko: '부채로 조달한 비중. 자본 비중의 나머지입니다.', en: 'The share funded by debt — whatever the equity weight leaves.' },
  afterTaxDebt: { ko: '이자가 비용으로 인정되어 낮아진 부채 비용. 부채에만 붙습니다.', en: 'The cost of debt after deductible interest lowers it; it applies to debt only.' },
  wacc: { ko: '자본과 부채 비용을 비중으로 가중평균한 값. NPV의 할인율 자리에 흔히 들어갑니다.', en: 'Equity and debt costs weighted by how much of each you use — the usual NPV discount rate.' },

  /* ───────── 손익 지표 ───────── */
  revenue: { ko: '그 기간에 판 금액 전체. 세금과 할인을 뺐는지 먼저 정하세요.', en: 'Everything sold in the period; settle first whether tax and discounts are out.' },
  operatingProfit: { ko: '매출에서 원가와 판매관리비를 뺀 이익. 이자와 세금은 아직 빼기 전입니다.', en: 'Profit after cost of sales and operating expenses, before interest and tax.' },
  deprAmort: { ko: '설비와 무형자산이 닳는 값으로 떨어낸 비용. 현금이 나가지는 않습니다.', en: 'The write-down of assets as they wear out; no cash actually leaves.' },
  ebitdaValue: { ko: '영업이익에 감가상각비를 다시 더한 값.', en: 'Operating profit with depreciation and amortisation added back.' },
  ebitdaMargin: { ko: 'EBITDA를 매출로 나눈 비율. 설비가 무거운 업종에서 영업이익률과 크게 벌어집니다.', en: 'EBITDA over revenue; it runs far above operating margin in asset-heavy trades.' },
  operMargin: { ko: '영업이익을 매출로 나눈 비율. 감가상각비까지 빼고 남은 몫입니다.', en: 'Operating profit over revenue — what is left after depreciation too.' },

  /* ───────── 재고·매출채권 회전 ───────── */
  cogs: { ko: '팔린 물건을 들이거나 만드는 데 든 돈. 매출액이 아닙니다.', en: 'What the goods you sold cost to buy or make — not the revenue.' },
  avgInventory: { ko: '기초와 기말 재고의 평균. 기말만 쓰면 계절에 끌려갑니다.', en: 'Opening and closing stock averaged; the closing figure alone follows the season.' },
  invTurns: { ko: '한 해에 재고가 몇 번 돌았는지. 매출원가를 평균 재고로 나눈 값입니다.', en: 'How many times stock cycled in a year — COGS over average inventory.' },
  inventoryDays: { ko: '재고가 창고에 머무는 평균 일수. 365를 회전율로 나눕니다.', en: 'Average days stock sits on the shelf — 365 divided by the turns.' },
  cogsPerDay: { ko: '하루에 빠져나가는 매출원가. 재고 며칠분이 얼마인지 바로 보입니다.', en: 'COGS running out per day; it prices a day of inventory directly.' },
  receivables: { ko: '물건은 넘겼지만 아직 못 받은 돈. 남의 손에 있는 내 돈입니다.', en: 'Money billed but not yet collected — your cash in someone else\'s account.' },
  dso: { ko: '대금이 들어오는 데 걸리는 평균 일수. 기간 일수를 무엇으로 두었는지가 중요합니다.', en: 'Average days to collect; the days-in-period you chose drives it.' },
  revenuePerDay: { ko: '매출을 기간 일수로 나눈 하루치. 회수 일수를 돈으로 바꿀 때 씁니다.', en: 'Revenue over the days in the period — it converts collection days into money.' },
  carryCost: { ko: '못 받은 돈을 그대로 두는 데 해마다 붙는 자금 비용.', en: 'What it costs each year to leave that uncollected balance where it is.' },
  cashPer10Days: { ko: '회수를 열흘 앞당길 때 한 번에 풀리는 현금.', en: 'The cash released in one go by collecting ten days sooner.' },

  /* ───────── 영업 레버리지 ───────── */
  contribTotal: { ko: '기간 매출에서 변동비를 뺀 합계. 개당 공헌이익이 아닙니다.', en: 'Period revenue less variable costs — the total, not the per-unit figure.' },
  salesChangePct: { ko: '매출이 몇 % 움직인다고 볼지. 양쪽 방향으로 똑같이 작동합니다.', en: 'The percentage move in sales you want to test; it works both ways.' },
  dol: { ko: '매출 1%가 영업이익을 몇 % 움직이는지. 손익분기점에 가까울수록 커집니다.', en: 'Percent change in operating profit per percent of sales; it grows near break-even.' },
  profitChangePct: { ko: '그 매출 변화에 따라 영업이익이 움직이는 비율.', en: 'How far operating profit moves for that change in sales.' },

  /* ───────── 40의 법칙 ───────── */
  revGrowth: { ko: '지난해 대비 매출이 늘어난 비율. 분기를 연 환산한 값과 크게 다릅니다.', en: 'Revenue growth against last year; an annualised quarter differs a lot.' },
  ruleLine: { ko: '견주려는 기준선. 흔히 쓰는 40은 벤처 업계의 어림자입니다.', en: 'The line you measure against; the usual 40 is a venture rule of thumb.' },
  ruleSum: { ko: '성장률과 이익률을 그냥 더한 값. 두 숫자가 같은 자를 쓰는지 확인하세요.', en: 'Growth plus margin, simply added; check both use the same ruler.' },
  marginNeeded: { ko: '그 성장률에서 기준선을 맞추려면 필요한 이익률.', en: 'The margin it would take to sit on the line at that growth rate.' },

  /* ───────── 이탈·유지 ───────── */
  custStart: { ko: '달 초에 있던 고객 수. 그 달 신규는 넣지 않습니다.', en: 'Customers you had at the start of the month; this month\'s signups are out.' },
  custLost: { ko: '그 달에 떠난 고객 수. 사람 수와 금액 기준은 다른 숫자입니다.', en: 'Customers who left during the month; a headcount, not a revenue figure.' },
  churnRate: { ko: '달 초 고객 가운데 떠난 비율. 뒤집으면 평균 유지 개월이 됩니다.', en: 'The share of starting customers who left; inverted, it gives the average lifetime.' },
  retentionRate: { ko: '한 달을 지나 남은 비율. 이탈률의 나머지입니다.', en: 'The share still there a month later — what churn leaves behind.' },
  avgLifeMonths: { ko: '이탈률이 일정할 때의 평균 유지 기간. 100을 이탈률로 나눕니다.', en: 'Average lifetime if churn holds level — 100 divided by the churn rate.' },
  custLeft: { ko: '그 달이 끝났을 때 남은 고객 수.', en: 'Customers still on the books when the month ends.' },
  retainedAfter: { ko: '월 유지율이 그만큼 겹쳐 쌓인 뒤 남는 비율. 곱셈이지 뺄셈이 아닙니다.', en: 'What monthly retention compounds to over the period — a power, not a subtraction.' },
  custAfter: { ko: '그 기간이 지난 뒤 남아 있을 고객 수. 재가입은 들어 있지 않습니다.', en: 'Customers left after that period; reactivations are not counted.' },

  /* ───────── 고객 생애가치·획득비용 ───────── */
  arpu: { ko: '고객 한 명이 한 달에 내는 금액. 이익이 아니라 매출입니다.', en: 'What one customer pays a month — revenue, not profit.' },
  monthlyProfit: { ko: '고객 한 명이 매달 남기는 매출이익. 서버비와 결제 수수료를 뺀 값입니다.', en: 'Gross profit one customer leaves monthly, after hosting and payment fees.' },
  customerLtv: { ko: '한 고객이 떠나기까지 남기는 매출이익 총액. 미래 금액을 할인하지 않은 값입니다.', en: 'Total gross profit a customer leaves before churning, undiscounted.' },
  cac: { ko: '고객 한 명을 데려오는 데 든 비용. 분자에 무엇을 넣었는지가 회사마다 다릅니다.', en: 'What it cost to win one customer; what goes in the numerator varies by company.' },
  ltvCacRatio: { ko: '생애가치를 획득비용으로 나눈 배수. 언제 돌아오는지는 말해 주지 않습니다.', en: 'Lifetime value over acquisition cost; it says nothing about when the money returns.' },
  cacPayback: { ko: '획득비용을 매출이익으로 되찾는 데 걸리는 개월.', en: 'Months for gross profit to recover the acquisition cost.' },
  cacCeiling: { ko: '3:1 기준을 지킬 때 한 명에게 쓸 수 있는 최대 금액.', en: 'The most you could spend per customer and still sit at 3:1.' },
  salesMarketing: { ko: '그 기간에 영업과 마케팅에 쓴 돈 전체.', en: 'Everything spent on sales and marketing in the period.' },
  newCustomers: { ko: '그 기간에 새로 얻은 고객 수. 유료와 무료 유입이 섞여 있습니다.', en: 'Customers won in the period, paid and organic mixed together.' },
  paidShare: { ko: '새 고객 가운데 광고로 온 몫. 나머지는 소개나 검색으로 온 사람입니다.', en: 'The share of new customers that came from paid channels; the rest arrived free.' },
  cacPaid: { ko: '광고가 실제로 데려온 사람만으로 나눈 획득비용. 다음 100명의 비용에 가깝습니다.', en: 'Spend divided only by the customers paid actually delivered — closer to the next hundred\'s cost.' },
  paidCustomers: { ko: '광고로 온 고객 수. 전체에서 무료 유입을 뺀 값입니다.', en: 'Customers from paid channels — the total less the organic ones.' },

  /* ───────── 구독 매출 ───────── */
  mrrNow: { ko: '이번 달의 월 반복 매출. 일회성 매출은 넣지 않습니다.', en: 'This month\'s recurring revenue; one-off sales stay out.' },
  mrrPrev: { ko: '한 달 전의 월 반복 매출. 성장률의 분모입니다.', en: 'Recurring revenue a month ago — the denominator of the growth rate.' },
  mrrGrowth: { ko: '한 달 사이 MRR이 늘어난 비율. 신규와 이탈을 합친 순증 기준입니다.', en: 'How far MRR rose in a month, measured net of churn and downgrades.' },
  arr: { ko: '이번 달 MRR에 12를 곱한 연 환산 매출. 계약 기간이 섞이면 어긋납니다.', en: 'This month\'s MRR times twelve; mixed contract terms distort it.' },
  growthAnnual: { ko: '그 월 성장률이 열두 달 이어질 때의 연 성장률. 12를 곱한 값이 아닙니다.', en: 'What that monthly rate compounds to over a year — not twelve times it.' },
  netNewMrr: { ko: '이번 달에 순수하게 늘어난 MRR 금액.', en: 'The MRR actually added this month, net of everything lost.' },

  /* ───────── 전환·장바구니 ───────── */
  visitors: { ko: '그 기간에 들어온 방문자 수. 세션 기준과 사람 기준이 다릅니다.', en: 'Visitors in the period; sessions and unique people are different counts.' },
  orders: { ko: '그 기간에 발생한 주문 건수. 취소와 반품을 뺐는지 정하세요.', en: 'Orders placed in the period; decide whether cancellations are out.' },
  targetConvRate: { ko: '닿으려는 전환율. 지금 전환율과의 간격을 방문자로 환산해 보여 줍니다.', en: 'The conversion rate you are aiming at; the gap is shown as extra traffic.' },
  convRate: { ko: '방문자 가운데 주문으로 이어진 비율. 봇을 걸러야 제대로 나옵니다.', en: 'The share of visitors that ordered; filter bots or it reads low.' },
  ordersAtTarget: { ko: '같은 방문자에서 목표 전환율이 만들어 낼 주문 수.', en: 'Orders the target rate would produce from the same traffic.' },
  visitorsNeeded: { ko: '전환율을 그대로 두고 그 주문 수를 만들려면 필요한 방문자.', en: 'Visitors it would take to reach that order count without touching conversion.' },
  extraVisitors: { ko: '전환율을 올리는 대신 더 데려와야 하는 방문자 수.', en: 'The extra traffic you would buy instead of lifting conversion.' },
  aovNow: { ko: '지금 주문 한 건의 평균 금액. 큰 주문 몇 건에 쉽게 끌려갑니다.', en: 'The average order today; a few large orders drag it easily.' },
  aovTarget: { ko: '올리려는 주문당 평균 금액.', en: 'The average order value you want to reach.' },
  aovUplift: { ko: '목표에 닿기 위해 필요한 상승률. 지금 금액으로 나눈 값입니다.', en: 'The uplift needed to reach the target, measured against today\'s figure.' },
  revenueAfter: { ko: '주문 수가 그대로일 때 목표 금액에서 나오는 매출.', en: 'Revenue at the target order value with volume unchanged.' },
  revenueGain: { ko: '방문자를 늘리지 않고 얻는 매출 증가분.', en: 'The revenue added without bringing in a single extra visitor.' },

  /* ───────── 두 빚 갚는 순서 ───────── */
  debtA: { ko: '첫 번째 빚의 남은 원금.', en: 'The principal still owed on the first debt.' },
  debtARate: { ko: '첫 번째 빚에 붙는 연이율.', en: 'The annual rate on the first debt.' },
  debtB: { ko: '두 번째 빚의 남은 원금.', en: 'The principal still owed on the second debt.' },
  debtBRate: { ko: '두 번째 빚에 붙는 연이율.', en: 'The annual rate on the second debt.' },
  avalancheMonths: { ko: '이율이 높은 빚부터 갚을 때 둘 다 끝나는 개월.', en: 'Months to clear both when the higher rate is attacked first.' },
  snowballMonths: { ko: '잔액이 작은 빚부터 갚을 때 둘 다 끝나는 개월.', en: 'Months to clear both when the smaller balance is attacked first.' },
  avalancheInterest: { ko: '이율이 높은 쪽부터 갚을 때 물게 되는 이자 합계.', en: 'Total interest paid attacking the higher rate first.' },
  snowballInterest: { ko: '작은 쪽부터 갚을 때 물게 되는 이자 합계.', en: 'Total interest paid attacking the smaller balance first.' },
  interestDiff: { ko: '순서만 바꿔서 갈리는 이자. 이율 높은 쪽부터가 이자에서 지는 일은 없습니다.', en: 'The interest riding on the order alone; highest-rate-first never loses on interest.' },

  /* ───────── 한도 사용률 ───────── */
  cardBalance: { ko: '한도 가운데 지금 쓴 금액.', en: 'How much of the limit is currently used.' },
  cardLimit: { ko: '쓸 수 있는 한도 총액. 잔액이 그대로여도 한도가 늘면 사용률이 내려갑니다.', en: 'The total credit available; raising it lowers utilisation with no debt repaid.' },
  targetUtil: { ko: '지키려는 사용률. 기준선은 나라와 평가기관마다 다릅니다.', en: 'The utilisation you are aiming for; thresholds differ by country and bureau.' },
  utilisation: { ko: '한도 대비 쓴 비율. 결제일이 아니라 명세서 마감일 잔액으로 잡히는 경우가 많습니다.', en: 'Balance over limit; it is often captured on the statement date, not the due date.' },
  balanceAtTarget: { ko: '그 사용률을 지킬 때의 잔액 상한.', en: 'The most you could owe and still hit that utilisation.' },
  payDown: { ko: '목표 사용률에 닿기 위해 갚아야 하는 금액.', en: 'How much to pay off to reach the target utilisation.' },
  limitNeeded: { ko: '갚지 않고 같은 사용률에 닿으려면 필요한 한도.', en: 'The limit that would hit the same utilisation without repaying anything.' },

  /* ───────── 원리금 추가 상환 ───────── */
  extraMonthly: { ko: '월 상환액에 더 얹는 금액. 전부 원금으로 들어갑니다.', en: 'Added on top of the payment; all of it goes to principal.' },
  monthsSaved: { ko: '추가 상환으로 줄어드는 상환 개월.', en: 'Months taken off the term by the extra payment.' },
  newMonths: { ko: '더 넣은 뒤의 실제 상환 기간.', en: 'The term that actually remains once the extra is going in.' },

  /* ───────── 리스 vs 구매 ───────── */
  leaseMonthly: { ko: '매달 내는 리스료. 정비와 보험이 포함됐는지 확인하세요.', en: 'The monthly lease payment; check whether maintenance and insurance are in it.' },
  leaseUpfront: { ko: '계약할 때 한 번 내는 금액. 보증금과 취득 수수료가 여기 들어갑니다.', en: 'Paid once at signing — deposits and acquisition fees live here.' },
  leaseTotal: { ko: '기간이 끝날 때까지 리스로 나가는 돈 전체. 남는 자산은 없습니다.', en: 'Everything a lease costs to the end of the term, with no asset left over.' },
  buyTotal: { ko: '구매가에서 되팔 값을 뺀 실제로 쓴 돈. 대출 이자는 따로 더해야 합니다.', en: 'Purchase price less resale — the real outlay; loan interest goes on top.' },
  buyPerMonth: { ko: '구매 총비용을 같은 개월로 나눈 월 환산액.', en: 'The buying total spread over the same number of months.' },

  /* ───────── 50·30·20 예산 ───────── */
  needsSpend: { ko: '집세·식비처럼 안 쓸 수 없는 지출. 빚의 이자와 최소상환액도 여기입니다.', en: 'Rent, food and other unavoidable spending; debt interest and minimums belong here.' },
  wantsSpend: { ko: '없어도 살 수 있는 지출. 외식·여행·구독이 여기 들어갑니다.', en: 'Spending you could live without — dining out, travel, subscriptions.' },
  needsCap: { ko: '실수령액의 절반. 필수 지출이 이 선을 넘으면 저축 몫이 눌립니다.', en: 'Half of take-home pay; needs above this line squeeze the saving share.' },
  wantsCap: { ko: '실수령액의 30%. 여유 지출에 쓸 수 있는 한도입니다.', en: '30% of take-home pay — the ceiling for discretionary spending.' },
  saveTarget: { ko: '실수령액의 20%. 최소상환액을 넘겨 갚는 원금도 여기 셉니다.', en: '20% of take-home pay; principal paid above the minimum counts here too.' },
  savingsLeft: { ko: '두 지출을 빼고 실제로 남는 금액. 20% 몫과 견주는 값입니다.', en: 'What is actually left after both buckets — the figure to hold against the 20%.' },

  /* ───────── 연봉 vs 시급 ───────── */
  annualSalary: { ko: '계약된 연봉. 복리후생을 얹기 전 세전 금액입니다.', en: 'The contracted yearly salary, before benefits and before tax.' },
  benefitPct: { ko: '회사가 연봉 위에 더 부담하는 비율. 사회보험료·퇴직급여·유급휴가가 들어갑니다.', en: 'What the employer adds on top — social contributions, retirement, paid leave.' },
  salaryHoursYear: { ko: '한 해 유급으로 세는 시간. 주 40시간이면 2,080시간입니다.', en: 'Paid hours counted in a year; a 40-hour week makes 2,080.' },
  hourlyOffer: { ko: '견주려는 쪽에서 제안받은 시급.', en: 'The hourly rate on the offer you are comparing.' },
  salaryHourly: { ko: '복리후생까지 얹은 보수를 유급 시간으로 나눈 값. 시급 제안과 바로 견줄 수는 없습니다.', en: 'The full package over paid hours; not directly comparable to an hourly offer.' },
  hourlyToMatch: { ko: '청구 가능한 시간만으로 그 보수에 닿으려면 받아야 하는 시급.', en: 'The rate needed to match that package across billable hours only.' },
  contractorAnnual: { ko: '그 시급으로 청구 시간을 다 채웠을 때의 연 수입.', en: 'A year at that rate with every billable hour filled.' },
  packageGap: { ko: '시급 쪽 연 수입에서 연봉 쪽 보수를 뺀 차이. 음수면 연봉 쪽이 큽니다.', en: 'The hourly side less the salary package; negative means the salary wins.' },

  /* ───────── 세후 실질 수익률 ───────── */
  afterTaxRate: { ko: '세금을 뗀 뒤의 수익률. 물가를 반영하기 전 값입니다.', en: 'The return once tax is out, before inflation is taken off.' },

  /* ───────── 은퇴 적립 부족액 ───────── */
  targetRetireIncome: { ko: '은퇴 뒤 한 해에 쓰고 싶은 금액. 지금 돈 기준으로 넣으세요.', en: 'What you want to spend each year in retirement; enter it in today\'s money.' },
  potNeeded: { ko: '그 인출률로 목표 소득을 지탱하는 자산 규모.', en: 'The pot that carries that income at that withdrawal rate.' },
  savedGrown: { ko: '지금 있는 자산이 그 수익률로 그 기간 자란 값.', en: 'What today\'s savings grow to at that return over that time.' },
  gapAmount: { ko: '필요 자산에서 자란 자산을 뺀 모자란 금액. 적립으로 메울 몫입니다.', en: 'The pot needed less what today\'s savings become — the part contributions must fill.' },

  /* ───────── 수영장 물 관리 ───────── */
  fcNow: { ko: '지금 물에 남아 있는 유리염소. 시약이나 시험지로 잰 값을 넣으세요.', en: 'The free chlorine in the water right now, as read by a test kit or strip.' },
  fcTarget: { ko: '맞추려는 유리염소. 안정제가 높으면 이 값을 올려 잡아야 같은 살균력이 납니다.', en: 'The free chlorine you are aiming at; high stabiliser means aiming higher for the same effect.' },
  chlorineStrength: { ko: '제품에 든 유효염소 비율. 과립은 무게 대비, 액상은 100 mL당 g으로 적힙니다.', en: 'The available chlorine in the product — by weight for granular, per 100 mL for liquid.' },
  chlorineDose: { ko: '봉지나 통에서 실제로 퍼내야 하는 양. 순수 염소가 아니라 제품 기준입니다.', en: 'How much to scoop or pour out — measured as product, not as pure chlorine.' },
  pureChlorine: { ko: '제품 강도를 빼고 순수 유효염소만 따진 무게. 제품끼리 견줄 때 쓰는 값입니다.', en: 'The weight of pure available chlorine alone, which is how products compare fairly.' },
  dosePerPpm: { ko: '이 수영장에서 1 ppm을 올리는 데 드는 제품 양. 다음부터는 이 값만 곱하면 됩니다.', en: 'The product this pool needs per 1 ppm — from then on you just multiply.' },
  saltNow: { ko: '지금 물의 염도. 염소발생기 표시값은 어긋나기 쉬우니 따로 재는 편이 낫습니다.', en: 'The salinity now; a chlorinator readout drifts, so an independent test is safer.' },
  saltTarget: { ko: '맞추려는 염도. 일반 기준이 아니라 쓰는 셀의 설명서 값을 넣으세요.', en: 'The salinity you are aiming at — take it from your cell manual, not a general rule.' },
  saltKg: { ko: '목표까지 넣어야 하는 소금 무게. 소금은 순도가 높아 강도로 나누지 않습니다.', en: 'The salt to add to reach target; salt is near pure, so no strength division applies.' },
  ppmPerBag: { ko: '한 포대가 이 물에서 올리는 염도. 마지막 포대가 목표를 넘길지 알려 줍니다.', en: 'How far one bag moves this pool — it tells you whether the last bag overshoots.' },
  concNow: { ko: '낮추려는 항목의 현재 값. 시아누르산·염도·칼슘 경도처럼 뺄 수 없는 값들입니다.', en: 'The current reading you want down — cyanuric acid, salt or calcium hardness.' },
  concTarget: { ko: '내리려는 값. 채움물보다 낮게 잡으면 물갈이로는 닿을 수 없습니다.', en: 'The reading you want; set below the fill water it cannot be reached by draining.' },
  fillConc: { ko: '새로 채울 물에 이미 들어 있는 값. 희석의 바닥이 되는 수치입니다.', en: 'What the replacement water already carries — the floor that dilution cannot pass.' },
  drainPct: { ko: '빼고 새로 채워야 하는 물의 비율. 희석은 뺀 비율만큼만 듣습니다.', en: 'The share of water to drain and replace; dilution pays out only in that proportion.' },
  drainLiters: { ko: '그 비율을 실제 물 양으로 옮긴 값. 한 번에 다 빼지 말고 나눠 가세요.', en: 'That share expressed as litres — replace it in stages rather than all at once.' },
  halfDrainConc: { ko: '절반만 갈았을 때 남는 값. 반쯤 빼면 되겠지가 왜 안 통하는지 보여줍니다.', en: 'What is left after changing half — why "drain a bit" rarely gets you there.' },
};
