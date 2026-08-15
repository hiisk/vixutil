/**
 * 비율 섹션 - 사업·마케팅 비율 (12종)
 *
 * 열둘을 묶는 것은 "기록"이 아니라 "문턱"이다. 이미 손에 있는 두세 숫자를 넣어,
 * 몇 개를 팔아야 하는지·얼마를 받아야 하는지·언제 멈춰야 하는지의 경계를 낸다.
 * 마크업과 이익률, ROAS와 본전 ROAS처럼 서로 혼동되는 짝을 한 화면에 놓는 것이
 * 이 묶음의 목적이다 — 계산이 어려운 것이 아니라 어느 쪽으로 나눌지가 어렵다.
 *
 * 돈은 전부 단위 없는 숫자다. 넣은 단위가 답의 단위이고, 어느 나라도 가정하지 않는다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const BUSINESS_TOOLS: FormulaTool[] = [
  {
    slug: 'margin-vs-markup',
    icon: '⚖️',
    category: '비율·증감',
    fields: [
      { key: 'markupIn', term: 'markup', unit: 'percent', def: 50, min: 0, max: 1000, step: 0.1 },
      { key: 'marginIn', term: 'marginRate', unit: 'percent', def: 40, min: 0, max: 99.9, step: 0.1 },
    ],
    // 좌변에 입력 용어를 쓰면 대입식이 "40 = ..."처럼 숫자로 치환돼 식이 거짓말이 된다
    formula: '{marginFromMarkup} = {markup} ÷ (100 + {markup}) × 100,  {markupFromMargin} = {marginRate} ÷ (100 − {marginRate}) × 100',
    compute: v => [
      { term: 'marginFromMarkup', unit: 'percent', value: round(ratio(v.markupIn, 100 + v.markupIn) * 100, 2), digits: 2, primary: true },
      { term: 'markupFromMargin', unit: 'percent', value: round(ratio(v.marginIn, 100 - v.marginIn) * 100, 2), digits: 2 },
      { term: 'priceFactor', unit: 'times', value: round(1 + v.markupIn / 100, 3), digits: 3 },
    ],
    verdict: (v, out) => ({
      ko: `마크업 ${v.markupIn}%는 이익률 ${out[0].value}%입니다. 거꾸로 이익률 ${v.marginIn}%를 맞추려면 마크업 ${out[1].value}%가 필요합니다.`,
      en: `A ${v.markupIn}% markup is a ${out[0].value}% margin. The other way round, a ${v.marginIn}% margin needs a ${out[1].value}% markup.`,
      l10n: {
        es: `Un ${v.markupIn} % sobre coste equivale a un margen del ${out[0].value} % sobre venta. Al revés, un margen del ${v.marginIn} % exige un ${out[1].value} % sobre coste.`,
        'pt-br': `Um markup de ${v.markupIn} % equivale a uma margem de ${out[0].value} %. Ao contrário, uma margem de ${v.marginIn} % exige um markup de ${out[1].value} %.`,
        ja: `原価に${v.markupIn}%を乗せると、売上に対する利益率は${out[0].value}%です。逆に利益率${v.marginIn}%を出すには${out[1].value}%を乗せる必要があります。`,
        de: `Ein Aufschlag von ${v.markupIn} % ergibt eine Marge von ${out[0].value} %. Umgekehrt braucht eine Marge von ${v.marginIn} % einen Aufschlag von ${out[1].value} %.`,
        // 프랑스어는 taux de marge(원가 기준)와 taux de marque(매출 기준)가 갈린다 — 영어와 반대라 바꿔 쓰면 뜻이 뒤집힌다
        fr: `Un taux de marge de ${v.markupIn} % donne un taux de marque de ${out[0].value} %. À l’inverse, un taux de marque de ${v.marginIn} % exige un taux de marge de ${out[1].value} %.`,
        hi: `लागत पर ${v.markupIn}% जोड़ना ${out[0].value}% मार्जिन के बराबर है। उल्टे, ${v.marginIn}% मार्जिन के लिए ${out[1].value}% जोड़ना पड़ता है।`,
        'zh-hans': `成本加价 ${v.markupIn}% 相当于 ${out[0].value}% 的销售毛利率。反过来，要做到 ${v.marginIn}% 毛利率，需要加价 ${out[1].value}%。`,
        'zh-hant': `成本加價 ${v.markupIn}% 相當於 ${out[0].value}% 的銷售毛利率。反過來，要做到 ${v.marginIn}% 毛利率，需要加價 ${out[1].value}%。`,
      },
      tone: 'warn',
    }),
    ko: { title: '마진 vs 마크업 변환 계산기', desc: '원가 대비 마크업과 매출 대비 이익률을 양방향으로 바꿉니다.',
      long: '마크업은 이익을 원가로 나눈 값이고, 이익률은 같은 이익을 판매가로 나눈 값입니다. 분모가 다르니 한 거래에서도 숫자가 갈립니다. 원가 100에 50%를 얹으면 판매가 150에 이익 50이므로 이익률은 50÷150 = 33.33%입니다. 거꾸로 이익률 40%를 원하면 판매가가 원가를 0.6으로 나눈 값이어야 하므로 마크업은 66.67%가 필요합니다.',
      note: '거래처가 "마진 40%"라고 할 때 어느 쪽인지 먼저 확인하세요. 마크업으로 알아듣고 원가에 40%를 얹으면 이익률은 28.6%에 그쳐 목표보다 11%p 낮습니다.' },
    en: { title: 'Margin vs Markup Calculator', desc: 'Convert between markup on cost and gross margin on revenue, in both directions.',
      long: 'Markup divides profit by cost; margin divides the same profit by the selling price. Different denominators, different numbers. Add 50% to a cost of 100 and you sell at 150 with 50 of profit — a margin of 50÷150, or 33.33%. Backwards, a 40% margin means the price is cost divided by 0.6, so the markup has to be 66.67%.',
      note: 'When a supplier says "40% margin", establish which one they mean. Hear it as markup, add 40% to cost, and your margin lands at 28.6% — eleven points under target.' },
  },
  {
    slug: 'target-profit-units',
    icon: '🧮',
    category: '비율·증감',
    fields: [
      { key: 'fixed', term: 'fixedCost', unit: 'money', def: 3000000, min: 0 },
      { key: 'price', term: 'price', unit: 'money', def: 15000, min: 0 },
      { key: 'variable', term: 'varCost', unit: 'money', def: 6000, min: 0 },
      { key: 'target', term: 'targetProfit', unit: 'money', def: 1500000, min: 0 },
    ],
    formula: '{unitsForProfit} = ({fixedCost} + {targetProfit}) ÷ ({price} − {varCost})',
    compute: v => {
      const contrib = v.price - v.variable;
      // 공헌이익이 0 이하면 팔아도 고정비가 줄지 않는다 — 수량을 0으로 둔다
      const units = contrib > 0 ? Math.ceil(ratio(v.fixed, contrib)) : 0;
      const withProfit = contrib > 0 ? Math.ceil(ratio(v.fixed + v.target, contrib)) : 0;
      return [
        { term: 'unitsForProfit', unit: 'piece', value: withProfit, digits: 0, primary: true },
        { term: 'breakEvenUnits', unit: 'piece', value: units, digits: 0 },
        { term: 'contribMargin', unit: 'money', value: Math.round(contrib), digits: 0 },
      ];
    },
    ko: { title: '목표 이익 달성 수량 계산기', desc: '남기고 싶은 이익을 정하면 몇 개를 팔아야 하는지 구합니다.',
      long: '갚아야 할 금액을 고정비가 아니라 고정비 + 목표 이익으로 두면, 같은 나눗셈이 목표까지의 수량을 알려 줍니다. 단가 15,000에 변동비 6,000이면 공헌이익 9,000이고, 고정비 3,000,000에 이익 1,500,000을 더한 4,500,000을 9,000으로 나눠 500개입니다. 본전만 알고 싶다면 이익을 0으로 두거나 손익분기점 수량 도구를 쓰세요.',
      note: '고정비와 변동비를 어디서 가르느냐가 답을 바꿉니다. 팔리든 안 팔리든 나가는 임대료·급여는 고정비, 팔릴 때만 붙는 재료비·결제 수수료·배송비는 변동비입니다. 결제 수수료를 고정비로 넣으면 본전 수량이 실제보다 적게 나옵니다.' },
    en: { title: 'Target Profit Units Calculator', desc: 'How many units you must sell to reach the profit you want.',
      long: 'Treat the amount to cover as fixed costs plus the profit you want, and the same division tells you the volume. At 15,000 a unit with 6,000 of variable cost the contribution is 9,000; 3,000,000 of fixed costs plus 1,500,000 of profit is 4,500,000, which over 9,000 comes to 500 units. Set the profit to zero, or use the break-even units page, if all you want is the level where you stop losing money.',
      note: 'Where you draw the fixed/variable line moves the answer. Rent and salaries that run whether you sell or not are fixed; materials, payment fees and delivery that only appear on a sale are variable. File payment fees as fixed and the units you need come out too low.' },
  },
  {
    slug: 'contribution-margin',
    icon: '🪙',
    category: '비율·증감',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 15000, min: 0 },
      { key: 'variable', term: 'varCost', unit: 'money', def: 6000, min: 0 },
      { key: 'fixed', term: 'fixedCost', unit: 'money', def: 3000000, min: 0 },
    ],
    formula: '{contribMargin} = {price} − {varCost},  {contribRatio} = {contribMargin} ÷ {price} × 100',
    compute: v => {
      const contrib = v.price - v.variable;
      return [
        { term: 'contribMargin', unit: 'money', value: Math.round(contrib), digits: 0, primary: true },
        { term: 'contribRatio', unit: 'percent', value: round(ratio(contrib, v.price) * 100, 1), digits: 1 },
        { term: 'breakEvenUnits', unit: 'piece', value: contrib > 0 ? Math.ceil(ratio(v.fixed, contrib)) : 0, digits: 0 },
      ];
    },
    ko: { title: '공헌이익 계산기', desc: '단가와 개당 변동비로 공헌이익과 공헌이익률, 고정비를 메우는 수량을 구합니다.',
      long: '공헌이익은 한 개를 더 팔 때 회사에 남는 돈입니다. 단가 15,000에 변동비 6,000이면 9,000이 남고, 단가로 나눈 60%가 공헌이익률입니다. 비율까지 있으면 개수를 세지 않고도 필요한 매출을 알 수 있습니다 — 고정비 3,000,000을 0.6으로 나눈 5,000,000이 그것입니다. 품목이 수십 가지여서 "몇 개"로 셀 수 없는 가게에서는 이 비율 쪽 길밖에 없습니다.',
      note: '공헌이익은 이익이 아닙니다. 고정비를 아직 한 푼도 갚지 않은 상태의 값이라, 공헌이익이 넉넉해도 전체는 적자일 수 있습니다.' },
    en: { title: 'Contribution Margin Calculator', desc: 'Contribution per unit, the contribution ratio, and the units it takes to cover fixed costs.',
      long: 'Contribution margin is what one more sale leaves in the business. At a price of 15,000 with 6,000 of variable cost, 9,000 is left, and dividing by the price gives a 60% contribution ratio. With the ratio you can find the revenue you need without counting units at all: 3,000,000 of fixed costs over 0.6 is 5,000,000. For a shop with dozens of different items and no single unit to count, the ratio route is the only one available.',
      note: 'Contribution margin is not profit. It is measured before a single unit of fixed cost has been paid, so it can look comfortable while the business as a whole loses money.' },
  },
  {
    slug: 'payback-period',
    icon: '⏳',
    category: '금융·이자',
    fields: [
      { key: 'invest', term: 'invested', unit: 'money', def: 20000000, min: 0 },
      { key: 'cash', term: 'monthlyCash', unit: 'money', def: 500000, min: 0 },
    ],
    formula: '{paybackMonths} = {invested} ÷ {monthlyCash}',
    compute: v => {
      const months = ratio(v.invest, v.cash);
      return [
        { term: 'paybackMonths', unit: 'month', value: round(months, 1), digits: 1, primary: true },
        { term: 'years', unit: 'year', value: round(months / 12, 2), digits: 2 },
        { term: 'roi', unit: 'percent', value: round(ratio(v.cash * 12, v.invest) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '투자 회수 기간 계산기', desc: '초기 투자금과 월 순현금으로 원금을 되찾는 데 걸리는 개월을 구합니다.',
      long: '투자금을 매달 남는 순현금으로 나누면 회수 개월입니다. 2,000만을 넣어 매달 50만이 남으면 40개월, 약 3년 4개월입니다. 이 값을 뒤집으면 연 단순 수익률이 나옵니다 — 12를 40으로 나눈 30%입니다.',
      note: '이 계산은 돈의 시간 가치를 무시합니다. 3년 뒤의 50만과 이번 달의 50만을 같은 값으로 세기 때문에 회수 기간이 길수록 실제보다 좋아 보입니다. 2~3년을 넘으면 현재 가치 계산기로 한 번 더 확인하세요. 회수한 뒤 설비가 얼마나 더 버는지도 이 숫자에는 들어 있지 않습니다.' },
    en: { title: 'Payback Period Calculator', desc: 'How many months an upfront investment takes to come back out of monthly net cash flow.',
      long: 'Divide the investment by the net cash it brings in each month. Put in 20,000,000 and clear 500,000 a month and you are level again in 40 months — about three years and four months. Invert that and you have the simple annual return: twelve over forty is 30%.',
      note: 'This ignores the time value of money: 500,000 arriving three years out counts the same as 500,000 this month, which flatters long paybacks. Past two or three years, check it again with the present-value page. Nor does it say anything about how much the asset earns after it has paid for itself.' },
  },
  {
    slug: 'straight-line-depreciation',
    icon: '📉',
    category: '세금·정산',
    fields: [
      { key: 'cost', term: 'buyPrice', unit: 'money', def: 12000000, min: 0 },
      { key: 'salvage', term: 'salvageValue', unit: 'money', def: 2000000, min: 0 },
      { key: 'life', term: 'years', unit: 'year', def: 5, min: 0, max: 50 },
      { key: 'elapsed', term: 'yearsElapsed', unit: 'year', def: 3, min: 0, max: 50 },
    ],
    formula: '{annualDepr} = ({buyPrice} − {salvageValue}) ÷ {years}',
    compute: v => {
      const annual = ratio(v.cost - v.salvage, v.life);
      // 내용연수를 넘겨도 장부가액은 잔존가치 아래로 내려가지 않는다
      const book = Math.max(v.salvage, v.cost - annual * v.elapsed);
      return [
        { term: 'annualDepr', unit: 'money', value: Math.round(annual), digits: 0, primary: true },
        { term: 'monthlyDepr', unit: 'money', value: Math.round(annual / 12), digits: 0 },
        { term: 'bookValue', unit: 'money', value: Math.round(book), digits: 0 },
        { term: 'depreciation', unit: 'percent', value: round(ratio(annual, v.cost) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '정액 감가상각 계산기', desc: '취득가·잔존가치·내용연수로 연 감가액과 월 감가액, 몇 년 뒤 장부가액을 구합니다.',
      long: '정액법은 취득가에서 잔존가치를 뺀 금액을 내용연수로 똑같이 나눕니다. 1,200만에 산 설비를 잔존가치 200만, 내용연수 5년으로 보면 해마다 200만씩, 달로는 약 16만 7천씩 떨어집니다. 3년 뒤 장부가액은 1,200만에서 600만을 뺀 600만입니다. 매년 같은 금액이 빠지므로 그래프가 직선입니다.',
      note: '정액법은 장부를 위한 직선이고, 실제 중고 시세는 남은 값의 일정 비율씩 빠지는 정률 곡선에 가깝습니다. 팔 때 받을 값이 궁금하면 중고 가치 감가나 반값 되는 기간 쪽을 보세요 — 첫해 실제 하락은 이 계산보다 훨씬 큽니다.' },
    en: { title: 'Straight-Line Depreciation Calculator', desc: 'Yearly and monthly depreciation plus the book value after n years, from cost, salvage and life.',
      long: 'Straight line takes cost minus salvage value and splits it evenly across the useful life. A 12,000,000 machine with 2,000,000 of salvage over five years drops 2,000,000 a year, about 166,700 a month. After three years the book value is 12,000,000 less 6,000,000, so 6,000,000. The same amount comes off every year, which is why the line is straight.',
      note: 'Straight line is a bookkeeping convention; second-hand prices behave more like declining balance, losing a fixed share of what is left each year. For what it would actually sell for, use the resale-value or halving-rate pages — the real first-year fall is much steeper than this.' },
  },
  {
    slug: 'savings-rate',
    icon: '🐷',
    category: '금융·이자',
    fields: [
      { key: 'income', term: 'netPay', unit: 'money', def: 4000000, min: 0 },
      { key: 'saved', term: 'monthlySaved', unit: 'money', def: 1000000, min: 0 },
    ],
    formula: '{savingsRate} = {monthlySaved} ÷ {netPay} × 100',
    compute: v => {
      const spend = v.income - v.saved;
      return [
        { term: 'savingsRate', unit: 'percent', value: round(ratio(v.saved, v.income) * 100, 1), digits: 1, primary: true },
        { term: 'monthlySpend', unit: 'money', value: Math.round(spend), digits: 0 },
        { term: 'yearsPerYearSpend', unit: 'year', value: round(ratio(spend, v.saved), 2), digits: 2 },
      ];
    },
    ko: { title: '저축률 계산기', desc: '실수령액과 저축액으로 저축률을 구하고, 1년치 생활비를 모으는 데 걸리는 기간을 봅니다.',
      long: '저축액을 실수령액으로 나눕니다. 월 400만을 받아 100만을 넣으면 저축률 25%이고 생활비로 300만이 남습니다. 두 번째 숫자가 더 중요합니다 — 300만을 100만으로 나눈 3년, 즉 1년치 생활비를 모으는 데 3년이 걸립니다. 저축률을 50%로 올리면 이 기간이 1년으로 줄어듭니다.',
      note: '세전 소득으로 나누면 저축률이 실제보다 높게 나옵니다. 회사가 대신 넣는 퇴직연금을 저축으로 셀지도 미리 정하세요 — 넣으면 숫자는 올라가지만 지금 꺼내 쓸 수 없는 돈입니다.' },
    en: { title: 'Savings Rate Calculator', desc: 'Your savings rate from take-home pay and the amount saved, plus how long a year of expenses takes.',
      long: 'Divide what you save by what you take home. Bank 1,000,000 out of 4,000,000 a month and the rate is 25%, leaving 3,000,000 to live on. The second figure matters more: 3,000,000 over 1,000,000 is three years to save one year of expenses. Push the rate to 50% and that falls to one year.',
      note: 'Dividing by gross pay inflates the rate. Decide too whether employer pension contributions count as saving — including them lifts the number, but that money is not available to you now.' },
  },
  {
    slug: 'fire-number',
    icon: '🏝️',
    category: '금융·이자',
    fields: [
      { key: 'spend', term: 'annualSpend', unit: 'money', def: 36000000, min: 0 },
      { key: 'rate', term: 'withdrawRate', unit: 'percent', def: 4, min: 0, max: 20, step: 0.1 },
    ],
    formula: '{fireNumber} = {annualSpend} ÷ ({withdrawRate} ÷ 100)',
    compute: v => [
      { term: 'fireNumber', unit: 'money', value: Math.round(ratio(v.spend, v.rate / 100)), digits: 0, primary: true },
      { term: 'multiple', unit: 'times', value: round(ratio(100, v.rate), 1), digits: 1 },
      { term: 'monthlySpend', unit: 'money', value: Math.round(v.spend / 12), digits: 0 },
    ],
    ko: { title: 'FIRE 목표 자산 계산기', desc: '연 생활비와 인출률로 그 생활비를 지탱하는 자산 규모를 구합니다.',
      long: '자산에서 해마다 일정 비율만 꺼내 쓴다고 보면, 필요한 자산은 연 생활비를 그 비율로 나눈 값입니다. 연 3,600만을 4%로 꺼내려면 9억이 필요하고 이는 연 생활비의 25배입니다. 4%라는 숫자는 1994년 윌리엄 벤겐이 미국 주식·채권의 과거 수익률로 30년 인출을 검증해 얻은 값이고, 뒤이은 트리니티 연구가 널리 퍼뜨렸습니다. 법칙이 아니라 특정 시장·특정 기간·30년이라는 가정 위에 놓인 한 연구의 결과입니다.',
      note: '인출률을 낮추면 필요 자산이 급하게 커집니다. 4%는 25배지만 3%는 33.3배, 2%는 50배입니다. 세금·건강보험료·큰 수리비를 연 생활비에 넣지 않으면 목표가 실제보다 작게 잡힙니다.' },
    en: { title: 'FIRE Number Calculator', desc: 'The portfolio that supports your yearly spending at a given withdrawal rate.',
      long: 'If you draw a fixed share of the portfolio each year, the portfolio you need is yearly spending divided by that share. Spending 36,000,000 a year at 4% needs 900,000,000 — twenty-five times the spending. The 4% figure comes from William Bengen in 1994, who tested thirty-year withdrawals against historical US stock and bond returns; the Trinity study then popularised it. It is one study, on one market, over one thirty-year horizon — not a law.',
      note: 'A lower withdrawal rate raises the target sharply: 4% is 25×, 3% is 33.3×, 2% is 50×. Leave tax, health insurance and large repairs out of your yearly spending and the target comes out too small.' },
  },
  {
    slug: 'rent-to-income',
    icon: '🏠',
    category: '금융·이자',
    fields: [
      { key: 'rent', term: 'housingCost', unit: 'money', def: 1000000, min: 0 },
      { key: 'income', term: 'grossPay', unit: 'money', def: 3000000, min: 0 },
      { key: 'guide', term: 'guidePct', unit: 'percent', def: 30, min: 1, max: 100, step: 1 },
    ],
    formula: '{percent} = {housingCost} ÷ {grossPay} × 100',
    compute: v => [
      { term: 'percent', unit: 'percent', value: round(ratio(v.rent, v.income) * 100, 1), digits: 1, primary: true },
      { term: 'guideMax', unit: 'money', value: Math.round(v.income * (v.guide / 100)), digits: 0 },
      { term: 'diff', unit: 'money', value: Math.round(v.rent - v.income * (v.guide / 100)), digits: 0 },
      { term: 'remaining', unit: 'money', value: Math.round(v.income - v.rent), digits: 0 },
    ],
    verdict: (v, out) => {
      const p = out[0].value;
      const gap = round(p - v.guide, 1);
      if (v.income <= 0) return null;
      return gap > 0
        ? {
            ko: `주거비가 소득의 ${p}%입니다 — 기준선 ${v.guide}%보다 ${gap}%p 높습니다.`,
            en: `Housing takes ${p}% of income — ${gap} points above the ${v.guide}% guideline.`,
            l10n: {
              es: `La vivienda se lleva el ${p} % de los ingresos: ${gap} puntos por encima de la referencia del ${v.guide} %.`,
              'pt-br': `A moradia consome ${p} % da renda: ${gap} pontos acima da referência de ${v.guide} %.`,
              ja: `住居費が収入の${p}%を占めています。目安の${v.guide}%より${gap}ポイント高いです。`,
              de: `Wohnen frisst ${p} % des Einkommens — ${gap} Punkte über der ${v.guide}-%-Richtlinie.`,
              fr: `Le logement prend ${p} % du revenu, soit ${gap} points au-dessus du repère de ${v.guide} %.`,
              hi: `आवास पर आय का ${p}% जा रहा है — ${v.guide}% के मानक से ${gap} अंक ऊपर।`,
              'zh-hans': `住房占收入的 ${p}%，比 ${v.guide}% 的参考线高 ${gap} 个百分点。`,
              'zh-hant': `住房占收入的 ${p}%，比 ${v.guide}% 的參考線高 ${gap} 個百分點。`,
            },
            tone: 'warn',
          }
        : {
            ko: `주거비가 소득의 ${p}%로 기준선 ${v.guide}% 안쪽입니다.`,
            en: `Housing takes ${p}% of income, inside the ${v.guide}% guideline.`,
            l10n: {
              es: `La vivienda se lleva el ${p} % de los ingresos, dentro de la referencia del ${v.guide} %.`,
              'pt-br': `A moradia consome ${p} % da renda, dentro da referência de ${v.guide} %.`,
              ja: `住居費は収入の${p}%で、目安の${v.guide}%の内側です。`,
              de: `Wohnen frisst ${p} % des Einkommens und bleibt unter der ${v.guide}-%-Richtlinie.`,
              fr: `Le logement prend ${p} % du revenu, sous le repère de ${v.guide} %.`,
              hi: `आवास पर आय का ${p}% जा रहा है, जो ${v.guide}% के मानक के भीतर है।`,
              'zh-hans': `住房占收入的 ${p}%，仍在 ${v.guide}% 的参考线以内。`,
              'zh-hant': `住房占收入的 ${p}%，仍在 ${v.guide}% 的參考線以內。`,
            },
            tone: 'good',
          };
    },
    ko: { title: '소득 대비 주거비 비율 계산기', desc: '월 주거비가 세전 월 소득에서 차지하는 비율을 기준선과 견줍니다.',
      long: '주거비를 세전 월 소득으로 나눕니다. 소득 300만에 주거비 100만이면 33.3%이고, 30% 기준선의 금액은 90만이므로 10만이 위입니다. 30%라는 숫자는 미국 주택정책에서 "부담 가능한 임대료"의 관행적 기준으로 쓰여 온 것이며, 법이 아니고 도시마다 현실이 크게 다릅니다. 임대료가 비싼 대도시에서는 40~50%가 드물지 않습니다.',
      note: '관리비·수도·전기·난방을 넣는지에 따라 비율이 5~10%p 움직입니다. 세전으로 나누면 세후로 나눈 값보다 낮게 나오니, 두 집을 비교할 때는 같은 기준을 쓰세요.' },
    en: { title: 'Rent-to-Income Ratio Calculator', desc: 'What share of gross monthly income your housing costs take, against a chosen guideline.',
      long: 'Divide housing cost by gross monthly income. On 3,000,000 of income, 1,000,000 of rent is 33.3%, while the 30% line sits at 900,000 — you are 100,000 over. The 30% figure is a convention from US housing policy for what counts as affordable; it is not a rule, and the reality varies enormously by city. In expensive metros 40–50% is ordinary.',
      note: 'Whether you fold in utilities, heating and building fees swings the ratio by five to ten points. Gross income gives a lower ratio than take-home pay does, so compare two places on the same basis.' },
  },
  {
    slug: 'freelance-hourly-rate',
    icon: '⏱️',
    category: '세금·정산',
    fields: [
      { key: 'target', term: 'targetIncome', unit: 'money', def: 60000000, min: 0 },
      { key: 'hours', term: 'billableHours', unit: 'hour', def: 25, min: 0, max: 80, step: 0.5 },
      { key: 'weeks', term: 'weeksWorked', unit: 'week', def: 46, min: 0, max: 52 },
      { key: 'overhead', term: 'overheadPct', unit: 'percent', def: 25, min: 0, max: 200, step: 1 },
    ],
    formula: '{hourlyRate} = {targetIncome} × (1 + {overheadPct} ÷ 100) ÷ ({billableHours} × {weeksWorked})',
    compute: v => {
      const bill = v.target * (1 + v.overhead / 100);
      const hours = v.hours * v.weeks;
      return [
        { term: 'hourlyRate', unit: 'money', value: Math.round(ratio(bill, hours)), digits: 0, primary: true },
        { term: 'billableYear', unit: 'hour', value: round(hours, 0), digits: 0 },
        { term: 'mustBill', unit: 'money', value: Math.round(bill), digits: 0 },
      ];
    },
    ko: { title: '프리랜서 시급 계산기', desc: '목표 연 소득과 실제로 청구할 수 있는 시간으로 받아야 할 시급을 구합니다.',
      long: '연 소득 목표를 청구 가능한 시간으로 나눕니다. 목표 6,000만, 주 25시간 청구, 46주 일하면 연 청구 시간은 1,150시간입니다. 여기에 견적·영업·경리처럼 돈이 안 되는 시간과 장비·보험 같은 비용을 25%로 잡아 얹으면 청구해야 할 금액은 7,500만이 되고, 필요 시급은 65,217입니다.',
      note: '주 40시간 가운데 실제로 청구되는 시간은 보통 20~30시간입니다. 40을 그대로 넣으면 시급이 필요액의 60% 수준으로 낮게 나옵니다. 휴가와 아픈 날을 빼서 일하는 주 수는 52가 아니라 44~48로 두세요. 세금은 목표 소득을 세전으로 잡아 반영합니다.' },
    en: { title: 'Freelance Hourly Rate Calculator', desc: 'The hourly rate a target yearly income needs, once non-billable time is counted.',
      long: 'Divide the yearly target by the hours you can actually bill. A 60,000,000 target at 25 billable hours a week over 46 weeks gives 1,150 billable hours. Add 25% for the hours nobody pays for — quoting, chasing invoices, admin — plus tools and insurance, and you must invoice 75,000,000, which is 65,217 an hour.',
      note: 'Of a 40-hour week, 20 to 30 hours are typically billable. Enter 40 and the rate lands around 60% of what you actually need. Take holidays and sick days out too: use 44 to 48 weeks, not 52. Handle tax by setting the target income before tax.' },
  },
  {
    slug: 'cross-rate',
    icon: '💱',
    category: '비율·증감',
    fields: [
      { key: 'ab', term: 'rateAB', unit: 'none', def: 1380, min: 0 },
      { key: 'bc', term: 'rateBC', unit: 'none', def: 1.08, min: 0, step: 0.0001 },
      { key: 'spread', term: 'spread', unit: 'percent', def: 1, min: 0, max: 20, step: 0.1 },
    ],
    formula: '{rateAC} = {rateAB} × {rateBC}',
    compute: v => {
      const ac = v.ab * v.bc;
      // 사슬을 두 번 지나므로 스프레드도 두 번 곱해진다
      const net = ac * Math.pow(1 + v.spread / 100, 2);
      return [
        { term: 'rateAC', unit: 'none', value: round(ac, 4), digits: 4, primary: true },
        { term: 'rateCA', unit: 'none', value: round(ratio(1, ac), 6), digits: 6 },
        { term: 'netCrossRate', unit: 'none', value: round(net, 4), digits: 4 },
      ];
    },
    ko: { title: '교차 환율 계산기', desc: '두 환율을 이어 붙여 직접 고시되지 않은 제3 통화 환율을 구합니다.',
      long: 'A/B와 B/C를 곱하면 B가 약분되어 A/C가 남습니다. B 하나가 A 1,380이고 C 하나가 B 1.08이면 A/C는 1,490.4입니다. 환전은 이 사슬을 실제로 두 번 지나가므로 스프레드도 두 번 붙습니다 — 구간마다 1%면 1.0201배, 즉 약 1,520.4가 실제로 물게 되는 환율입니다.',
      note: '두 구간에서 각각 1%를 떼이면 합쳐서 2%가 아니라 2.01%입니다. 차이는 작지만, 그 통화쌍이 직접 고시되어 있다면 중간 통화를 거치지 않는 쪽이 대개 쌉니다. 한 구간의 숨은 수수료만 보려면 환전 스프레드 계산기를 쓰세요.' },
    en: { title: 'Cross Rate Calculator', desc: 'Chain two quoted rates into the third-currency rate nobody quotes directly.',
      long: 'Multiply A/B by B/C and the B cancels, leaving A/C. If one B costs 1,380 of A and one C costs 1.08 of B, then A per C is 1,490.4. A real conversion walks that chain twice, so the spread lands twice too: 1% on each leg makes it 1.0201×, or about 1,520.4 as the rate you actually pay.',
      note: 'Two 1% legs cost 2.01%, not 2%. The gap is small, but where the pair is quoted directly, not routing through a third currency is usually cheaper. To see the hidden fee on a single leg, use the exchange-spread page.' },
  },
  {
    slug: 'roas',
    icon: '📢',
    category: '비율·증감',
    fields: [
      { key: 'spend', term: 'adSpend', unit: 'money', def: 2000000, min: 0 },
      { key: 'revenue', term: 'adRevenue', unit: 'money', def: 8000000, min: 0 },
      { key: 'margin', term: 'marginRate', unit: 'percent', def: 40, min: 0, max: 100, step: 0.1 },
    ],
    formula: '{roas} = {adRevenue} ÷ {adSpend},  {breakEvenRoas} = 100 ÷ {marginRate}',
    compute: v => {
      const r = ratio(v.revenue, v.spend);
      return [
        { term: 'roas', unit: 'times', value: round(r, 2), digits: 2, primary: true },
        { term: 'roasPct', unit: 'percent', value: round(r * 100, 1), digits: 1 },
        { term: 'breakEvenRoas', unit: 'times', value: round(ratio(100, v.margin), 2), digits: 2 },
        { term: 'profit', unit: 'money', value: Math.round(v.revenue * (v.margin / 100) - v.spend), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      if (v.margin <= 0 || v.spend <= 0) return null;
      const r = out[0].value;
      const b = out[2].value;
      return r >= b
        ? {
            ko: `ROAS ${r}배는 본전 ROAS ${b}배를 넘어 광고가 이익을 남깁니다.`,
            en: `A ROAS of ${r}× clears the ${b}× break-even, so the ads make money.`,
            l10n: {
              es: `Un ROAS de ${r}× supera el punto de equilibrio de ${b}×, así que la publicidad deja beneficio.`,
              'pt-br': `Um ROAS de ${r}× supera o equilíbrio de ${b}×, então o anúncio dá lucro.`,
              ja: `ROAS ${r}倍は損益分岐の${b}倍を上回っており、広告は利益を残しています。`,
              de: `Ein ROAS von ${r}× liegt über dem Break-even von ${b}× — die Werbung verdient Geld.`,
              fr: `Un ROAS de ${r}× dépasse le seuil de ${b}× : la publicité dégage du bénéfice.`,
              hi: `${r}× का ROAS ${b}× की बराबरी को पार करता है, यानी विज्ञापन मुनाफ़ा दे रहा है।`,
              'zh-hans': `${r}× 的 ROAS 高于 ${b}× 的保本线，广告是赚钱的。`,
              'zh-hant': `${r}× 的 ROAS 高於 ${b}× 的損益兩平線，廣告是賺錢的。`,
            },
            tone: 'good',
          }
        : {
            ko: `ROAS ${r}배가 본전 ROAS ${b}배에 못 미쳐 팔수록 손실입니다.`,
            en: `A ROAS of ${r}× falls short of the ${b}× break-even, so the ads lose money.`,
            l10n: {
              es: `Un ROAS de ${r}× no llega al punto de equilibrio de ${b}×: cada venta agranda la pérdida.`,
              'pt-br': `Um ROAS de ${r}× não alcança o equilíbrio de ${b}×: cada venda aumenta o prejuízo.`,
              ja: `ROAS ${r}倍は損益分岐の${b}倍に届かず、売るほど損が増えます。`,
              de: `Ein ROAS von ${r}× bleibt unter dem Break-even von ${b}× — jeder Verkauf vergrößert den Verlust.`,
              fr: `Un ROAS de ${r}× n’atteint pas le seuil de ${b}× : chaque vente creuse la perte.`,
              hi: `${r}× का ROAS ${b}× की बराबरी तक नहीं पहुँचता — हर बिक्री घाटा बढ़ाती है।`,
              'zh-hans': `${r}× 的 ROAS 达不到 ${b}× 的保本线，卖得越多亏得越多。`,
              'zh-hant': `${r}× 的 ROAS 達不到 ${b}× 的損益兩平線，賣得越多虧得越多。`,
            },
            tone: 'bad',
          };
    },
    ko: { title: 'ROAS 계산기', desc: '광고비와 광고 매출로 ROAS를 배수와 %로 구하고, 이익률이 정하는 본전 ROAS와 견줍니다.',
      long: 'ROAS는 광고 매출을 광고비로 나눈 값입니다. 200만을 써서 800만이 들어오면 4배, 400%입니다. 그런데 이 숫자만으로는 벌었는지 알 수 없습니다 — 매출에서 원가를 뺀 이익률이 40%라면 광고비를 메우기 위해 매출이 광고비의 1÷0.4배, 곧 2.5배는 되어야 합니다. 4배는 2.5배를 넘으므로 이 건은 실제로 남습니다.',
      note: '본전 ROAS는 이익률이 정합니다. 이익률 20%면 5배, 10%면 10배를 넘겨야 본전입니다. "ROAS 300%"가 좋은지 나쁜지는 이익률을 말하지 않으면 답할 수 없습니다. 매출 귀속 기준(클릭 뒤 며칠까지 셀지)이 다르면 같은 광고의 ROAS가 두 배씩 벌어집니다.' },
    en: { title: 'ROAS Calculator', desc: 'Return on ad spend as a multiple and a percentage, against the break-even ROAS your margin implies.',
      long: 'ROAS is attributed revenue divided by ad spend. Spend 2,000,000, take 8,000,000, and that is 4× or 400%. On its own the number cannot tell you whether you made money: at a 40% gross margin, revenue has to reach spend divided by 0.4 — 2.5× — just to cover the ads. Four clears 2.5, so this campaign really is ahead.',
      note: 'Your margin sets the break-even. At a 20% margin you need 5×; at 10%, 10×. Whether "300% ROAS" is good is unanswerable without the margin. Attribution windows matter too — the same campaign can report double the ROAS on a longer click window.' },
  },
  {
    slug: 'cpm-cpc',
    icon: '🖱️',
    category: '비율·증감',
    fields: [
      { key: 'imp', term: 'impressions', unit: 'hit', def: 250000, min: 0 },
      { key: 'clicks', term: 'clicks', unit: 'hit', def: 3000, min: 0 },
      { key: 'spend', term: 'adSpend', unit: 'money', def: 1500000, min: 0 },
      { key: 'ctrTarget', term: 'ctrTarget', unit: 'percent', def: 2, min: 0, max: 100, step: 0.1 },
    ],
    formula: '{cpc} = {adSpend} ÷ {clicks},  {cpm} = {adSpend} ÷ {impressions} × 1000,  {ctr} = {clicks} ÷ {impressions} × 100',
    compute: v => {
      const cpm = ratio(v.spend, v.imp) * 1000;
      return [
        { term: 'cpc', unit: 'money', value: round(ratio(v.spend, v.clicks), 2), digits: 2, primary: true },
        { term: 'cpm', unit: 'money', value: round(cpm, 2), digits: 2 },
        { term: 'ctr', unit: 'percent', value: round(ratio(v.clicks, v.imp) * 100, 2), digits: 2 },
        { term: 'cpcAtTarget', unit: 'money', value: round(ratio(cpm / 1000, v.ctrTarget / 100), 2), digits: 2 },
      ];
    },
    ko: { title: 'CPM·CPC·CTR 계산기', desc: '노출·클릭·광고비로 CPM, CPC, CTR을 한 번에 구하고 CTR이 CPC를 어떻게 움직이는지 봅니다.',
      long: '셋은 같은 세 숫자에서 나옵니다. 노출 25만, 클릭 3,000, 광고비 150만이면 CPC는 150만÷3,000 = 500, CPM은 150만÷25만×1,000 = 6,000, CTR은 3,000÷25만 = 1.2%입니다. 세 값은 CPC = CPM ÷ 1000 ÷ CTR로 묶여 있어 하나를 고정하면 나머지 둘이 서로를 정합니다. CPM이 6,000에 고정된 채 CTR이 1.2%에서 2%로 오르면 CPC는 500에서 300으로 내려갑니다.',
      note: 'CPM은 지면 경쟁이 정하고 CTR은 소재가 정합니다. CPC를 낮추려고 입찰가만 내리면 노출을 잃지만, 소재를 고쳐 CTR을 올리면 같은 CPM에서 CPC가 반비례로 내려갑니다. 노출과 클릭을 서로 다른 기간에서 가져오면 CTR이 엉뚱하게 나옵니다.' },
    en: { title: 'CPM, CPC and CTR Calculator', desc: 'CPM, CPC and CTR from impressions, clicks and spend — and how CTR moves CPC at a fixed CPM.',
      long: 'All three fall out of the same three numbers. With 250,000 impressions, 3,000 clicks and 1,500,000 of spend: CPC is 1,500,000÷3,000 = 500, CPM is 1,500,000÷250,000 × 1,000 = 6,000, and CTR is 3,000÷250,000 = 1.2%. They are locked together as CPC = CPM ÷ 1000 ÷ CTR, so fixing one leaves the other two determining each other. Hold CPM at 6,000 and lift CTR from 1.2% to 2% and CPC drops from 500 to 300.',
      note: 'Auction competition sets CPM; the creative sets CTR. Cutting your bid to lower CPC just buys fewer impressions, whereas a better creative lowers CPC in inverse proportion at the same CPM. Pulling impressions and clicks from different date ranges makes CTR meaningless.' },
  },
];
