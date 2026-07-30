/**
 * 비율 섹션 - 금융·이자 둘째 묶음 (12종)
 *
 * 이율과 기간은 입력으로 받고 상품 이름은 쓰지 않는다. 예금 이자·대출 상환·
 * 물가 반영은 나라가 달라도 공식이 같다 — 다른 것은 숫자뿐이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 매달 같은 금액을 갚을 때의 월 상환액 — 원리금균등 */
const monthlyPayment = (principal: number, annualPct: number, months: number): number => {
  const r = annualPct / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
};

export const FINANCE2_TOOLS: FormulaTool[] = [
  {
    slug: 'savings-goal',
    icon: '🎯',
    category: '금융·이자',
    fields: [
      { key: 'goal', term: 'goalAmount', unit: 'money', def: 30000000, min: 0 },
      { key: 'months', term: 'months', unit: 'month', def: 36, min: 1, max: 600 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 3.5, min: 0, max: 30 },
    ],
    formula: '{neededMonthly} = {goalAmount} × ({annualRate} ÷ 1200) ÷ ((1 + {annualRate} ÷ 1200) ^ {months} − 1)',
    compute: v => {
      const r = v.rate / 100 / 12;
      const need = r === 0 ? ratio(v.goal, v.months) : ratio(v.goal * r, Math.pow(1 + r, v.months) - 1);
      return [
        { term: 'neededMonthly', unit: 'money', value: Math.round(need), digits: 0, primary: true },
        { term: 'totalDeposit', unit: 'money', value: Math.round(need * v.months), digits: 0 },
        { term: 'interest', unit: 'money', value: Math.round(v.goal - need * v.months), digits: 0 },
      ];
    },
    ko: { title: '목표 금액 월 납입액 계산기', desc: '목표 금액을 기간 안에 모으려면 매달 얼마를 넣어야 하는지 계산합니다.',
      long: '매달 넣는 돈에 이자가 붙어 목표에 닿는 구조를 거꾸로 풀면 필요한 월 납입액이 나옵니다. 이자가 붙으니 목표를 기간으로 그냥 나눈 값보다 적게 넣어도 됩니다.',
      note: '이자소득세를 떼면 실제로는 조금 더 넣어야 합니다. 세율이 있는 나라라면 목표를 세후 기준으로 잡으세요.' },
    en: { title: 'Monthly Amount to Reach a Goal', desc: 'How much to set aside each month to hit a target by a date.',
      long: 'Run the compound-savings maths backwards: with interest working for you, the monthly figure comes out below the target simply divided by the months.',
      note: 'Tax on interest means you need slightly more. Where interest is taxed, set the goal on an after-tax basis.' },
  },
  {
    slug: 'present-value',
    icon: '⏳',
    category: '금융·이자',
    fields: [
      { key: 'future', term: 'futureAmt', unit: 'money', def: 10000000, min: 0 },
      { key: 'rate', term: 'discountRate', unit: 'percent', def: 4, min: 0, max: 50 },
      { key: 'years', term: 'years', unit: 'year', def: 10, min: 0, max: 80 },
    ],
    formula: '{presentAmt} = {futureAmt} ÷ (1 + {discountRate} ÷ 100) ^ {years}',
    compute: v => {
      const pv = ratio(v.future, Math.pow(1 + v.rate / 100, v.years));
      return [
        { term: 'presentAmt', unit: 'money', value: Math.round(pv), digits: 0, primary: true },
        { term: 'diff', unit: 'money', value: Math.round(v.future - pv), digits: 0 },
        { term: 'lossRate', unit: 'percent', value: round((1 - ratio(pv, v.future)) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '현재 가치 계산기', desc: '먼 미래에 받을 돈이 지금 얼마만큼의 가치인지 계산합니다.',
      long: '10년 뒤 1,000만 원은 지금 1,000만 원이 아닙니다. 연 4%로 굴릴 수 있다면 지금 675만 원을 넣어 두면 10년 뒤 1,000만 원이 되므로, 그 돈의 현재 가치는 675만 원입니다.',
      note: '할인율을 무엇으로 두느냐가 답을 크게 바꿉니다. 물가 상승률, 예금 금리, 기대 수익률 가운데 무엇을 쓸지 먼저 정하세요.' },
    en: { title: 'Present Value', desc: 'What money arriving years from now is worth today.',
      long: 'Ten million in ten years is not ten million today. If you can earn 4%, putting 6.75 million aside now becomes ten million by then — so that is its present value.',
      note: 'The discount rate drives the answer. Decide up front whether you mean inflation, a deposit rate or an expected return.' },
  },
  {
    slug: 'loan-limit',
    icon: '🏦',
    category: '금융·이자',
    fields: [
      { key: 'pay', term: 'affordPay', unit: 'money', def: 800000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4.5, min: 0, max: 30 },
      { key: 'years', term: 'years', unit: 'year', def: 20, min: 1, max: 50 },
    ],
    formula: '{maxLoan} = {affordPay} × ((1 + {annualRate} ÷ 1200) ^ ({years} × 12) − 1) ÷ (({annualRate} ÷ 1200) × (1 + {annualRate} ÷ 1200) ^ ({years} × 12))',
    compute: v => {
      const n = v.years * 12;
      const r = v.rate / 100 / 12;
      const f = Math.pow(1 + r, n);
      const max = r === 0 ? v.pay * n : ratio(v.pay * (f - 1), r * f);
      return [
        { term: 'maxLoan', unit: 'money', value: Math.round(max), digits: 0, primary: true },
        { term: 'totalPaid', unit: 'money', value: Math.round(v.pay * n), digits: 0 },
        { term: 'interest', unit: 'money', value: Math.round(v.pay * n - max), digits: 0 },
      ];
    },
    ko: { title: '월 상환액으로 대출 한도 역산', desc: '매달 갚을 수 있는 금액으로 빌릴 수 있는 원금을 계산합니다.',
      long: '원리금균등 상환식을 원금에 대해 풀면 됩니다. 월 80만 원을 20년간 연 4.5%로 갚을 수 있다면 원금 약 1억 2,600만 원까지 감당할 수 있습니다.',
      note: '금리가 오르면 같은 월 상환액으로 빌릴 수 있는 금액이 크게 줄어듭니다. 변동금리라면 지금 금리에 2%p를 더해 한 번 더 계산해 보세요.' },
    en: { title: 'Borrowing Limit from a Monthly Payment', desc: 'Turn what you can pay each month into how much you can borrow.',
      long: 'Solve the level-payment formula for the principal instead. Paying 800,000 a month for twenty years at 4.5% supports a loan of about 126 million.',
      note: 'A higher rate shrinks the loan a given payment supports, sharply. On a variable rate, run it again with two points added.' },
  },
  {
    slug: 'early-repayment',
    icon: '✂️',
    category: '금융·이자',
    fields: [
      { key: 'balance', term: 'principal', unit: 'money', def: 100000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4.5, min: 0, max: 30 },
      { key: 'years', term: 'years', unit: 'year', def: 20, min: 1, max: 50 },
      { key: 'prepay', term: 'prepayAmt', unit: 'money', def: 10000000, min: 0 },
    ],
    formula: '{savedInterest} = {prepayAmt} × ({totalPaid} ÷ {principal} − 1)',
    compute: v => {
      const n = v.years * 12;
      const before = monthlyPayment(v.balance, v.rate, n) * n - v.balance;
      const left = Math.max(0, v.balance - v.prepay);
      const after = monthlyPayment(left, v.rate, n) * n - left;
      return [
        { term: 'savedInterest', unit: 'money', value: Math.round(before - after), digits: 0, primary: true },
        { term: 'monthlyPay', unit: 'money', value: Math.round(monthlyPayment(left, v.rate, n)), digits: 0 },
        { term: 'interest', unit: 'money', value: Math.round(after), digits: 0 },
      ];
    },
    ko: { title: '중도상환 이자 절약 계산기', desc: '원금을 미리 갚으면 이자를 얼마나 아끼는지 계산합니다.',
      long: '남은 원금이 줄면 그 원금에 붙던 이자가 사라집니다. 기간을 그대로 두고 월 상환액을 줄이는 방식으로 계산했습니다 — 기간을 줄이는 방식을 택하면 절약액이 더 커집니다.',
      note: '중도상환 수수료가 있으면 절약액에서 그만큼을 빼야 실제 이득입니다. 대출 초기에 갚을수록 아끼는 이자가 큽니다.' },
    en: { title: 'Interest Saved by Overpaying', desc: 'How much interest disappears when you pay down principal early.',
      long: 'Less principal means less interest riding on it. This keeps the term fixed and lowers the monthly payment; choosing to shorten the term instead saves even more.',
      note: 'Subtract any early-repayment charge to get the real gain. The earlier in the loan you do it, the more interest vanishes.' },
  },
  {
    slug: 'daily-interest',
    icon: '📅',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 5000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 6, min: 0, max: 100 },
      { key: 'days', term: 'days', unit: 'day', def: 45, min: 0, max: 3650 },
    ],
    formula: '{interest} = {principal} × {annualRate} ÷ 100 × {days} ÷ 365',
    compute: v => {
      const daily = v.principal * (v.rate / 100) / 365;
      return [
        { term: 'interest', unit: 'money', value: Math.round(daily * v.days), digits: 0, primary: true },
        { term: 'dailyInterest', unit: 'money', value: Math.round(daily), digits: 0 },
        { term: 'total', unit: 'money', value: Math.round(v.principal + daily * v.days), digits: 0 },
      ];
    },
    ko: { title: '일수 이자 계산기', desc: '며칠만 빌리거나 맡길 때의 이자를 일 단위로 계산합니다.',
      long: '연이율을 365로 나눠 하루치 이자를 만들고 일수를 곱합니다. 마이너스 통장, 단기 예치, 연체 이자가 모두 이 방식입니다.',
      note: '365일 기준과 360일 기준이 상품마다 다릅니다. 360일 기준은 하루치 이자가 약 1.4% 더 큽니다.' },
    en: { title: 'Daily Interest', desc: 'Interest for a handful of days, worked out day by day.',
      long: 'Divide the annual rate by 365 for one day’s interest, then multiply by the days. Overdrafts, short deposits and late-payment charges all work this way.',
      note: 'Products differ on whether the year is 365 or 360 days. A 360-day basis makes each day about 1.4% dearer.' },
  },
  {
    slug: 'first-payment-split',
    icon: '🧩',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 200000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4, min: 0, max: 30 },
      { key: 'years', term: 'years', unit: 'year', def: 30, min: 1, max: 50 },
    ],
    formula: '{firstInterest} = {principal} × {annualRate} ÷ 1200',
    compute: v => {
      const n = v.years * 12;
      const pay = monthlyPayment(v.principal, v.rate, n);
      const firstInt = v.principal * (v.rate / 100 / 12);
      return [
        { term: 'firstInterest', unit: 'money', value: Math.round(firstInt), digits: 0, primary: true },
        { term: 'firstPrincipal', unit: 'money', value: Math.round(pay - firstInt), digits: 0 },
        { term: 'monthlyPay', unit: 'money', value: Math.round(pay), digits: 0 },
        { term: 'percent', unit: 'percent', value: round(ratio(firstInt, pay) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `첫 달 상환액의 ${out[3].value}%가 이자입니다. 원금은 ${out[1].value}밖에 줄지 않습니다.`,
      en: `${out[3].value}% of the first payment is interest — only ${out[1].value} comes off the principal.`,
      l10n: {
        es: `El ${out[3].value} % de la primera cuota son intereses: solo ${out[1].value} va a capital.`,
        'pt-br': `${out[3].value} % da primeira parcela são juros: só ${out[1].value} abate o principal.`,
        ja: `初回返済額の${out[3].value}%が利息です。元金は${out[1].value}しか減りません。`,
        de: `${out[3].value} % der ersten Rate sind Zinsen — nur ${out[1].value} gehen in die Tilgung.`,
        fr: `${out[3].value} % de la première mensualité sont des intérêts : seuls ${out[1].value} remboursent le capital.`,
        hi: `पहली किस्त का ${out[3].value}% ब्याज है — मूलधन सिर्फ़ ${out[1].value} घटता है।`,
      },
      tone: 'warn',
    }),
    ko: { title: '첫 달 원금·이자 분해', desc: '대출 첫 달 상환액에서 이자와 원금이 각각 얼마인지 봅니다.',
      long: '첫 달 이자는 원금에 월이율을 곱한 값입니다. 월 상환액에서 이걸 빼면 실제로 줄어드는 원금이 나옵니다. 초기에는 대부분이 이자라 원금이 거의 줄지 않습니다.',
      note: '달이 갈수록 이자 비중이 줄고 원금 비중이 늘어납니다. 30년 대출의 원금 절반이 갚아지는 시점은 대략 20년째입니다.' },
    en: { title: 'First Payment: Interest vs Principal', desc: 'Split the first month’s payment into interest and principal.',
      long: 'The first month’s interest is the balance times the monthly rate. Take that off the payment and what remains is the principal actually retired. Early on almost all of it is interest.',
      note: 'The mix shifts every month towards principal. On a thirty-year loan you cross the halfway mark on principal at around year twenty.' },
  },
  {
    slug: 'installment-apr',
    icon: '💳',
    category: '금융·이자',
    fields: [
      { key: 'amount', term: 'amount', unit: 'money', def: 1200000, min: 0 },
      { key: 'fee', term: 'installFee', unit: 'percent', def: 6, min: 0, max: 50 },
      { key: 'months', term: 'installMonths', unit: 'month', def: 12, min: 1, max: 60 },
    ],
    formula: '{apr} = {installFee} × 2 × 12 ÷ ({installMonths} + 1)',
    compute: v => {
      // 잔액이 매달 줄어 평균이 절반이므로 표시 수수료율의 약 두 배가 실질 이율이 된다
      const apr = ratio(v.fee * 2 * 12, v.months + 1);
      return [
        { term: 'apr', unit: 'percent', value: round(apr, 2), digits: 2, primary: true },
        { term: 'feeAmt', unit: 'money', value: Math.round(v.amount * (v.fee / 100)), digits: 0 },
        { term: 'monthlyPay', unit: 'money', value: Math.round(ratio(v.amount * (1 + v.fee / 100), v.months)), digits: 0 },
      ];
    },
    verdict: (v, out) => ({
      ko: `표시 수수료 ${v.fee}%는 실질 연이율 약 ${out[0].value}%에 해당합니다.`,
      en: `A quoted fee of ${v.fee}% works out to an effective APR of about ${out[0].value}%.`,
      l10n: {
        es: `Una comisión anunciada del ${v.fee} % equivale a una TAE efectiva de alrededor del ${out[0].value} %.`,
        'pt-br': `Uma taxa anunciada de ${v.fee} % equivale a um custo efetivo de cerca de ${out[0].value} % ao ano.`,
        ja: `表示された手数料${v.fee}%は、実質年率にすると約${out[0].value}%にあたります。`,
        de: `Ein genannter Zuschlag von ${v.fee} % entspricht einem effektiven Jahreszins von rund ${out[0].value} %.`,
        fr: `Des frais affichés de ${v.fee} % correspondent à un TAEG effectif d’environ ${out[0].value} %.`,
        hi: `बताया गया ${v.fee}% शुल्क असल में लगभग ${out[0].value}% वार्षिक दर बैठता है।`,
      },
      tone: 'warn',
    }),
    ko: { title: '할부 수수료 → 실질 연이율', desc: '표시된 할부 수수료율이 실제로 연 몇 %인지 환산합니다.',
      long: '수수료는 처음 금액 전체에 매기지만 실제로 빌린 돈은 매달 줄어듭니다. 평균 잔액이 절반쯤이라 실질 이율은 표시 수수료율의 두 배에 가깝습니다.',
      note: '정확한 실질 이율은 현금흐름으로 풀어야 하고 이 값은 근사입니다. 다만 "6%면 싸다"는 착각을 깨는 데는 충분합니다.' },
    en: { title: 'Instalment Fee to Effective APR', desc: 'Convert a flat instalment fee into the annual rate it really represents.',
      long: 'The fee is charged on the full amount, but you only owe the shrinking balance. With the average balance near half, the effective rate lands close to double the quoted fee.',
      note: 'The exact APR needs a cash-flow solve and this is an approximation — but it is enough to dispel the idea that 6% is cheap.' },
  },
  {
    slug: 'inflation-future-price',
    icon: '🎈',
    category: '금융·이자',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 5000, min: 0 },
      { key: 'rate', term: 'inflation', unit: 'percent', def: 2.5, min: 0, max: 50 },
      { key: 'years', term: 'years', unit: 'year', def: 20, min: 0, max: 80 },
    ],
    formula: '{futurePrice} = {price} × (1 + {inflation} ÷ 100) ^ {years}',
    compute: v => {
      const fut = v.price * Math.pow(1 + v.rate / 100, v.years);
      return [
        { term: 'futurePrice', unit: 'money', value: Math.round(fut), digits: 0, primary: true },
        { term: 'change', unit: 'percent', value: round((ratio(fut, v.price) - 1) * 100, 1), digits: 1 },
        { term: 'presentAmt', unit: 'money', value: Math.round(ratio(v.price, Math.pow(1 + v.rate / 100, v.years))), digits: 0 },
      ];
    },
    ko: { title: '물가 반영 미래 가격 계산기', desc: '지금 가격이 몇 년 뒤 얼마가 되는지 계산합니다.',
      long: '물가 상승은 복리로 붙습니다. 연 2.5%면 20년 뒤 가격은 1.025의 20제곱, 즉 1.64배가 됩니다. 5,000원 커피가 8,193원이 되는 셈입니다.',
      note: '품목별 물가는 평균과 크게 다릅니다. 교육비와 의료비는 평균보다 빠르게, 전자제품은 오히려 내려가는 경우가 많습니다.' },
    en: { title: 'Future Price with Inflation', desc: 'What today’s price becomes after a number of years.',
      long: 'Inflation compounds. At 2.5% a year, twenty years multiplies the price by 1.025 to the twentieth — a factor of 1.64. A 5,000 coffee becomes 8,193.',
      note: 'Individual items stray far from the average: education and healthcare outpace it, while electronics often fall in price.' },
  },
  {
    slug: 'average-buy-price',
    icon: '⚗️',
    category: '금융·이자',
    fields: [
      { key: 'p1', term: 'buyPriceA', unit: 'money', def: 70000, min: 0 },
      { key: 'q1', term: 'buyQtyA', unit: 'piece', def: 10, min: 0 },
      { key: 'p2', term: 'buyPriceB', unit: 'money', def: 50000, min: 0 },
      { key: 'q2', term: 'buyQtyB', unit: 'piece', def: 20, min: 0 },
    ],
    formula: '{avgPrice} = ({buyPriceA} × {buyQtyA} + {buyPriceB} × {buyQtyB}) ÷ ({buyQtyA} + {buyQtyB})',
    compute: v => {
      const qty = v.q1 + v.q2;
      const cost = v.p1 * v.q1 + v.p2 * v.q2;
      const avg = ratio(cost, qty);
      return [
        { term: 'avgPrice', unit: 'money', value: Math.round(avg), digits: 0, primary: true },
        { term: 'totalQty', unit: 'piece', value: round(qty, 2), digits: 2 },
        { term: 'invested', unit: 'money', value: Math.round(cost), digits: 0 },
        { term: 'change', unit: 'percent', value: round((ratio(avg, v.p1) - 1) * 100, 2), digits: 2 },
      ];
    },
    ko: { title: '분할 매수 평균 단가 계산기', desc: '두 번에 나눠 산 물건의 평균 단가를 계산합니다.',
      long: '단가의 산술평균이 아니라 수량으로 가중한 평균을 써야 합니다. 7만 원에 10개, 5만 원에 20개면 평균은 6만 원이 아니라 5만 6,667원입니다.',
      note: '수수료를 뺀 순수 단가로 계산하면 실제 손익분기점이 낮게 나옵니다. 매수 수수료는 매입 금액에 더해 넣으세요.' },
    en: { title: 'Average Cost of Two Buys', desc: 'The blended price when you bought in two lots.',
      long: 'Use a quantity-weighted average, not the plain average of the prices. Ten at 70,000 and twenty at 50,000 averages 56,667 — not 60,000.',
      note: 'Leaving out commission understates your break-even. Add buying fees into the cost side.' },
  },
  {
    slug: 'break-even-return',
    icon: '⚖️',
    category: '금융·이자',
    fields: [
      { key: 'fee', term: 'feeRate', unit: 'percent', def: 1.5, min: 0, max: 50 },
      { key: 'amount', term: 'invested', unit: 'money', def: 10000000, min: 0 },
    ],
    formula: '{needReturn} = (1 ÷ (1 − {feeRate} ÷ 100) − 1) × 100',
    compute: v => {
      const need = (1 / (1 - v.fee / 100) - 1) * 100;
      return [
        { term: 'needReturn', unit: 'percent', value: round(need, 3), digits: 3, primary: true },
        { term: 'feeAmt', unit: 'money', value: Math.round(v.amount * (v.fee / 100)), digits: 0 },
        { term: 'total', unit: 'money', value: Math.round(v.amount * (1 + need / 100)), digits: 0 },
      ];
    },
    ko: { title: '수수료 감안 본전 수익률', desc: '수수료를 물고 본전이 되려면 몇 % 올라야 하는지 계산합니다.',
      long: '수수료로 1.5%가 빠지면 남은 98.5%가 원래 100%로 돌아와야 합니다. 1을 0.985로 나눠 1.523이므로 1.5%가 아니라 1.523% 올라야 본전입니다.',
      note: '자주 사고팔면 이 문턱을 매번 넘어야 합니다. 왕복 수수료가 0.5%인 거래를 한 해 20번 하면 10%를 수수료로 내는 셈입니다.' },
    en: { title: 'Return Needed to Break Even', desc: 'How far it must rise to cover the fees you already paid.',
      long: 'If fees take 1.5%, the remaining 98.5% has to climb back to 100%. One divided by 0.985 is 1.523, so you need 1.523% — not 1.5%.',
      note: 'Trading often means clearing this hurdle every time. A 0.5% round trip taken twenty times a year hands over 10%.' },
  },
  {
    slug: 'emergency-fund',
    icon: '🧰',
    category: '금융·이자',
    fields: [
      { key: 'spend', term: 'monthlySpend', unit: 'money', def: 2500000, min: 0 },
      { key: 'months', term: 'fundMonths', unit: 'month', def: 6, min: 1, max: 36 },
      { key: 'have', term: 'savedSoFar', unit: 'money', def: 5000000, min: 0 },
    ],
    formula: '{fundAmount} = {monthlySpend} × {fundMonths}',
    compute: v => {
      const need = v.spend * v.months;
      return [
        { term: 'fundAmount', unit: 'money', value: Math.round(need), digits: 0, primary: true },
        { term: 'remaining', unit: 'money', value: Math.round(Math.max(0, need - v.have)), digits: 0 },
        { term: 'achieved', unit: 'percent', value: round(ratio(v.have, need) * 100, 1), digits: 1 },
        { term: 'fundMonths', unit: 'month', value: round(ratio(v.have, v.spend), 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const pct = out[2].value;
      return pct >= 100
        ? { ko: '비상금 목표를 채웠습니다.', en: 'Your emergency fund is fully stocked.',
            l10n: {
              es: 'Tu fondo de emergencia está completo.',
              'pt-br': 'Sua reserva de emergência está completa.',
              ja: '生活防衛資金の目標を満たしています。',
              de: 'Dein Notgroschen ist vollständig aufgefüllt.',
              fr: 'Ton épargne de précaution est au complet.',
              hi: 'आपका आपात कोष पूरा हो चुका है।',
            }, tone: 'good' }
        : pct >= 50
          ? { ko: `목표의 ${pct}%를 모았습니다. 지금 잔액으로 ${out[3].value}개월을 버틸 수 있습니다.`, en: `You are ${pct}% of the way there — enough for ${out[3].value} months.`,
              l10n: {
                es: `Llevas el ${pct} % del objetivo: te da para ${out[3].value} meses.`,
                'pt-br': `Você já tem ${pct} % da meta: dá para ${out[3].value} meses.`,
                ja: `目標の${pct}%まで来ています。今の残高で${out[3].value}か月もちます。`,
                de: `Du hast ${pct} % des Ziels — das reicht für ${out[3].value} Monate.`,
                fr: `Tu es à ${pct} % de l’objectif : de quoi tenir ${out[3].value} mois.`,
                hi: `लक्ष्य का ${pct}% जमा है — इससे ${out[3].value} महीने चल जाएँगे।`,
              }, tone: 'warn' }
          : { ko: `목표의 ${pct}%뿐입니다. 지금 잔액으로는 ${out[3].value}개월치입니다.`, en: `Only ${pct}% of the target — that covers ${out[3].value} months.`,
              l10n: {
                es: `Solo el ${pct} % del objetivo: cubre ${out[3].value} meses.`,
                'pt-br': `Só ${pct} % da meta: cobre ${out[3].value} meses.`,
                ja: `目標の${pct}%しかありません。今の残高では${out[3].value}か月分です。`,
                de: `Erst ${pct} % des Ziels — das deckt ${out[3].value} Monate.`,
                fr: `Seulement ${pct} % de l’objectif : cela couvre ${out[3].value} mois.`,
                hi: `लक्ष्य का सिर्फ़ ${pct}% — इससे ${out[3].value} महीने चलेंगे।`,
              }, tone: 'bad' };
    },
    ko: { title: '비상금 목표 계산기', desc: '몇 달치 생활비를 비상금으로 두어야 하는지 계산합니다.',
      long: '월 생활비에 버틸 개월을 곱합니다. 소득이 일정한 직장인은 3~6개월, 프리랜서나 자영업은 6~12개월을 잡는 편이 무난합니다.',
      note: '비상금은 언제든 꺼낼 수 있어야 합니다. 수익률을 좇아 묶어 두면 정작 필요할 때 손해를 보고 꺼내게 됩니다.' },
    en: { title: 'Emergency Fund Target', desc: 'How many months of expenses to keep in reserve.',
      long: 'Multiply monthly spending by the months of cover you want. Three to six months suits steady salaries; six to twelve is safer for freelance or self-employed income.',
      note: 'The fund has to be reachable at any moment. Chasing yield by locking it up means selling at a loss exactly when you need it.' },
  },
  {
    slug: 'bond-current-yield',
    icon: '📜',
    category: '금융·이자',
    fields: [
      { key: 'face', term: 'faceValue', unit: 'money', def: 10000, min: 1 },
      { key: 'coupon', term: 'couponRate', unit: 'percent', def: 3, min: 0, max: 50 },
      { key: 'price', term: 'buyPrice', unit: 'money', def: 9200, min: 1 },
    ],
    formula: '{currentYield} = {faceValue} × {couponRate} ÷ 100 ÷ {buyPrice} × 100',
    compute: v => {
      const coupon = v.face * (v.coupon / 100);
      return [
        { term: 'currentYield', unit: 'percent', value: round(ratio(coupon, v.price) * 100, 3), digits: 3, primary: true },
        { term: 'interest', unit: 'money', value: Math.round(coupon), digits: 0 },
        { term: 'diff', unit: 'money', value: Math.round(v.face - v.price), digits: 0 },
      ];
    },
    verdict: (v, out) =>
      v.price < v.face
        ? { ko: `액면보다 싸게 사서 현재 수익률 ${out[0].value}%가 표면 금리 ${v.coupon}%보다 높습니다.`, en: `Bought below par, so the ${out[0].value}% current yield beats the ${v.coupon}% coupon.`,
            l10n: {
              es: `Comprado bajo la par, así que el ${out[0].value} % de rendimiento corriente supera al cupón del ${v.coupon} %.`,
              'pt-br': `Comprado abaixo do par, então o rendimento corrente de ${out[0].value} % supera o cupom de ${v.coupon} %.`,
              ja: `額面より安く買ったので、直利${out[0].value}%が表面利率${v.coupon}%を上回っています。`,
              de: `Unter pari gekauft — die laufende Rendite von ${out[0].value} % übertrifft den Kupon von ${v.coupon} %.`,
              fr: `Acheté sous le pair : le rendement courant de ${out[0].value} % dépasse le coupon de ${v.coupon} %.`,
              hi: `अंकित मूल्य से सस्ता ख़रीदा, इसलिए ${out[0].value}% वर्तमान प्रतिफल ${v.coupon}% कूपन से ऊपर है।`,
            }, tone: 'good' }
        : { ko: `액면보다 비싸게 사서 현재 수익률 ${out[0].value}%가 표면 금리 ${v.coupon}%보다 낮습니다.`, en: `Bought above par, so the ${out[0].value}% current yield falls short of the ${v.coupon}% coupon.`,
            l10n: {
              es: `Comprado sobre la par, así que el ${out[0].value} % de rendimiento corriente se queda por debajo del cupón del ${v.coupon} %.`,
              'pt-br': `Comprado acima do par, então o rendimento corrente de ${out[0].value} % fica abaixo do cupom de ${v.coupon} %.`,
              ja: `額面より高く買ったので、直利${out[0].value}%が表面利率${v.coupon}%を下回っています。`,
              de: `Über pari gekauft — die laufende Rendite von ${out[0].value} % bleibt unter dem Kupon von ${v.coupon} %.`,
              fr: `Acheté au-dessus du pair : le rendement courant de ${out[0].value} % reste sous le coupon de ${v.coupon} %.`,
              hi: `अंकित मूल्य से महँगा ख़रीदा, इसलिए ${out[0].value}% वर्तमान प्रतिफल ${v.coupon}% कूपन से नीचे है।`,
            }, tone: 'warn' },
    ko: { title: '채권 현재 수익률 계산기', desc: '액면·표면금리·매입가로 실제 이자 수익률을 계산합니다.',
      long: '해마다 받는 이자는 액면에 표면금리를 곱한 값으로 고정입니다. 그 이자를 실제로 낸 값으로 나누면 현재 수익률이 나옵니다 — 싸게 살수록 수익률이 올라갑니다.',
      note: '현재 수익률은 만기까지 가는 동안의 가격 회복(또는 하락)을 반영하지 않습니다. 만기 보유가 목적이면 만기수익률을 함께 보세요.' },
    en: { title: 'Bond Current Yield', desc: 'Turn face value, coupon and purchase price into the yield you actually get.',
      long: 'The annual coupon is fixed at face value times the coupon rate. Divide it by what you paid to get the current yield — the cheaper you buy, the higher it goes.',
      note: 'Current yield ignores the price pulling back to par by maturity. If you plan to hold to the end, look at yield to maturity too.' },
  },
];
