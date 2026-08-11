/**
 * 비율 섹션 - 투자·구독·개인재무 비율 (24종)
 *
 * 이름으로 검색되는 비율만 모았다. NPV·WACC·DSO·LTV/CAC·40의 법칙처럼 회의에서
 * 그 이름으로 불리는 것들이다. 공식은 대개 나눗셈 한 번이고, 어려운 것은 어느
 * 숫자를 분모에 놓느냐다 — 매출인지 원가인지, 개당인지 기간 합계인지, 세전인지
 * 세후인지. 그 한 줄을 못 박아 두는 것이 이 묶음의 목적이다.
 *
 * 돈은 전부 단위 없는 숫자다. 넣은 단위가 답의 단위이고, 어느 나라도 가정하지 않는다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 매년 같은 금액이 들어올 때의 연금 현가계수 — 이율 0이면 그냥 햇수다 */
const annuityFactor = (ratePct: number, years: number): number => {
  const r = ratePct / 100;
  if (r === 0) return years;
  return (1 - Math.pow(1 + r, -years)) / r;
};

/**
 * 같은 금액이 매년 들어올 때의 IRR — 이분법으로 찾는다.
 *
 * 현금흐름이 고르다는 가정 위에서는 정확하고, 고르지 않으면 어긋난다.
 * 원금도 못 돌아오는 경우(음수 IRR)는 0으로 둔다.
 */
const irrLevel = (outlay: number, cash: number, years: number): number => {
  if (outlay <= 0 || cash <= 0 || years <= 0) return 0;
  if (cash * years <= outlay) return 0;
  let lo = 0;
  let hi = 10;
  const npvAt = (r: number) => (cash * (1 - Math.pow(1 + r, -years))) / r - outlay;
  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    if (npvAt(mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

/** 원리금균등 월 상환액 */
const monthlyPayment = (principal: number, annualPct: number, months: number): number => {
  const r = annualPct / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
};

/**
 * 정해진 순서로 빚을 갚아 나갈 때 걸리는 개월과 물게 되는 이자.
 *
 * 대상이 아닌 빚은 이자만 내어 잔액을 유지한다 — 최소상환액이 이자를 덮는다는
 * 가정이다. 갚을 돈이 이자에도 못 미치면 잔액이 늘어나고 600개월에서 멈춘다.
 */
const runPlan = (list: { bal: number; rate: number }[], pay: number): { months: number; interest: number } => {
  const bal = list.map(d => d.bal);
  const r = list.map(d => d.rate / 100 / 12);
  let paid = 0;
  for (let m = 1; m <= 600; m++) {
    const target = bal.findIndex(b => b > 0);
    if (target < 0) return { months: m - 1, interest: paid };
    const due = bal.map((b, i) => b * r[i]);
    let left = pay;
    for (let i = 0; i < bal.length; i++) {
      paid += due[i];
      bal[i] += due[i];
      if (i !== target) {
        const cover = Math.min(due[i], Math.max(0, left));
        bal[i] -= cover;
        left -= cover;
      }
    }
    if (left > 0) bal[target] = Math.max(0, bal[target] - left);
  }
  return { months: 600, interest: paid };
};

export const BUSINESS2_TOOLS: FormulaTool[] = [
  {
    slug: 'npv',
    icon: '💵',
    category: '금융·이자',
    fields: [
      { key: 'cash', term: 'annualCash', unit: 'money', def: 10000000, min: 0 },
      { key: 'rate', term: 'discountRate', unit: 'percent', def: 10, min: 0, max: 50, step: 0.1 },
      { key: 'years', term: 'years', unit: 'year', def: 5, min: 0, max: 50 },
      { key: 'outlay', term: 'invested', unit: 'money', def: 30000000, min: 0 },
    ],
    formula: '{npvValue} = {annualCash} × (1 − (1 + {discountRate} ÷ 100) ^ −{years}) ÷ ({discountRate} ÷ 100) − {invested}',
    compute: v => {
      const pv = v.cash * annuityFactor(v.rate, v.years);
      return [
        { term: 'npvValue', unit: 'money', value: Math.round(pv - v.outlay), digits: 0, primary: true },
        { term: 'pvInflow', unit: 'money', value: Math.round(pv), digits: 0 },
        { term: 'profitIndex', unit: 'times', value: round(ratio(pv, v.outlay), 3), digits: 3 },
      ];
    },
    verdict: (v, out) => {
      if (v.outlay <= 0 || v.cash <= 0) return null;
      const npv = out[0].value;
      return npv >= 0
        ? {
            ko: `할인율 ${v.rate}%에서 NPV가 ${npv}입니다 — 들어올 돈의 현재가치가 투자금을 넘습니다.`,
            en: `At a ${v.rate}% discount rate the NPV is ${npv} — the inflows are worth more today than the outlay.`,
            l10n: {
              es: `Con una tasa de descuento del ${v.rate} %, el VAN es ${npv}: las entradas valen hoy más que el desembolso.`,
              'pt-br': `Com taxa de desconto de ${v.rate} %, o VPL é ${npv}: as entradas valem hoje mais que o desembolso.`,
              ja: `割引率${v.rate}%でNPVは${npv}です。入ってくるお金の現在価値が投資額を上回っています。`,
              de: `Bei ${v.rate} % Diskontsatz liegt der Kapitalwert bei ${npv} — die Zuflüsse sind heute mehr wert als die Investition.`,
              fr: `À un taux d’actualisation de ${v.rate} %, la VAN vaut ${npv} : les entrées valent aujourd’hui plus que la mise de départ.`,
              hi: `${v.rate}% छूट दर पर NPV ${npv} है — आने वाली रकम का आज का मूल्य निवेश से ऊपर है।`,
              'zh-hans': `在 ${v.rate}% 的折现率下，净现值为 ${npv}，未来现金的现值高于投入。`,
              'zh-hant': `在 ${v.rate}% 的折現率下，淨現值為 ${npv}，未來現金的現值高於投入。`,
            },
            tone: 'good',
          }
        : {
            ko: `할인율 ${v.rate}%에서 NPV가 ${npv}입니다 — 이 할인율을 요구하면 투자금을 되찾지 못합니다.`,
            en: `At a ${v.rate}% discount rate the NPV is ${npv} — demand that rate and the outlay does not come back.`,
            l10n: {
              es: `Con una tasa de descuento del ${v.rate} %, el VAN es ${npv}: exigiendo esa tasa, el desembolso no se recupera.`,
              'pt-br': `Com taxa de desconto de ${v.rate} %, o VPL é ${npv}: exigindo essa taxa, o desembolso não volta.`,
              ja: `割引率${v.rate}%でNPVは${npv}です。この利回りを求めるなら投資額は戻りません。`,
              de: `Bei ${v.rate} % Diskontsatz liegt der Kapitalwert bei ${npv} — bei dieser Renditeforderung kommt die Investition nicht zurück.`,
              fr: `À un taux d’actualisation de ${v.rate} %, la VAN vaut ${npv} : à ce niveau d’exigence, la mise n’est pas récupérée.`,
              hi: `${v.rate}% छूट दर पर NPV ${npv} है — इतनी दर माँगने पर निवेश वापस नहीं आता।`,
              'zh-hans': `在 ${v.rate}% 的折现率下，净现值为 ${npv}，按这个要求回报率投入收不回来。`,
              'zh-hant': `在 ${v.rate}% 的折現率下，淨現值為 ${npv}，按這個要求報酬率投入收不回來。`,
            },
            tone: 'bad',
          };
    },
    ko: { title: 'NPV 계산기', desc: '해마다 같은 금액이 들어올 때 순현재가치와 수익성 지수를 구합니다.',
      long: '먼 해에 들어올 돈을 할인율로 나눠 지금 값으로 되돌린 뒤, 다 더해 투자금을 뺍니다. 매년 1,000만이 5년간 들어오고 할인율이 10%라면 연금 현가계수는 3.790787이므로 현재가치는 37,907,868이고, 투자금 3,000만을 빼면 NPV는 7,907,868입니다. 교과서에 흔히 나오는 1,000짜리로 줄이면 현재가치 3,790.79, 투자금 3,000에 대해 NPV 790.79로 같은 숫자입니다. 수익성 지수 1.264는 넣은 1당 1.264가 돌아온다는 뜻입니다.',
      note: '여기서는 현금흐름이 매년 같다고 봅니다. 첫해에 적고 나중에 많은 사업이라면 이 값은 실제보다 좋게 나옵니다 — 해마다 다르면 각 해를 따로 할인해 더해야 합니다. 할인율을 무엇으로 두느냐가 답을 가장 크게 흔들고, 그 자리에 흔히 WACC를 넣습니다.' },
    en: { title: 'NPV Calculator', desc: 'Net present value and the profitability index for a level yearly cash flow.',
      long: 'Pull each future amount back to today with the discount rate, add them up, subtract the outlay. Ten million a year for five years at 10% gives an annuity factor of 3.790787, so the inflows are worth 37,907,868 today; less a 30,000,000 outlay, the NPV is 7,907,868. Scaled down to the textbook case — 1,000 a year — the present value is 3,790.79 and the NPV against a 3,000 outlay is 790.79, the same figures. A profitability index of 1.264 means 1.264 comes back for every 1 put in.',
      note: 'This assumes the same cash every year. For a project that starts small and builds, the answer flatters it — uneven flows have to be discounted year by year and summed. The discount rate moves the result more than anything else, and WACC is the number usually put there.' },
  },
  {
    slug: 'irr-approx',
    icon: '📐',
    category: '금융·이자',
    fields: [
      { key: 'outlay', term: 'invested', unit: 'money', def: 30000000, min: 0 },
      { key: 'cash', term: 'annualCash', unit: 'money', def: 10000000, min: 0 },
      { key: 'years', term: 'years', unit: 'year', def: 5, min: 0, max: 50 },
    ],
    formula: '{invested} = {annualCash} × (1 − (1 + {irrPct} ÷ 100) ^ −{years}) ÷ ({irrPct} ÷ 100)  →  {irrPct}',
    compute: v => {
      const irr = irrLevel(v.outlay, v.cash, v.years);
      return [
        { term: 'irrPct', unit: 'percent', value: round(irr * 100, 2), digits: 2, primary: true },
        { term: 'roi', unit: 'percent', value: round(ratio(v.cash, v.outlay) * 100, 1), digits: 1 },
        { term: 'paybackMonths', unit: 'month', value: round(ratio(v.outlay, v.cash / 12), 1), digits: 1 },
      ];
    },
    ko: { title: '근사 IRR 계산기', desc: '초기 투자금과 매년 같은 회수액으로 내부수익률을 근사합니다.',
      long: 'IRR은 NPV를 0으로 만드는 할인율입니다. 3,000만을 넣어 5년간 매년 1,000만이 들어오면 IRR은 약 19.86%입니다. 단순 수익률 33.3%(1,000만 ÷ 3,000만)와 크게 벌어지는데, 5년째 1,000만은 지금 1,000만보다 값이 적기 때문입니다. 회수 기간 36개월도 함께 보여 주는 이유는 IRR이 "언제" 돌아오는지를 말해 주지 않기 때문입니다.',
      note: '근사라고 붙인 것은 현금흐름이 매년 똑같다고 두기 때문입니다. 실제 사업은 첫해가 적고 뒤가 크거나 그 반대여서, 같은 총액이라도 IRR이 몇 %p씩 어긋납니다. 원금도 못 돌아오는 경우(총 회수액 ≤ 투자금)는 음수 IRR이 되므로 0으로 표시합니다. IRR은 규모를 말하지 않아, 100만을 30%로 굴리는 것과 10억을 15%로 굴리는 것을 구분하지 못합니다.' },
    en: { title: 'IRR Calculator (Approximate)', desc: 'Internal rate of return from an upfront cost and a level yearly return.',
      long: 'IRR is the discount rate that drives NPV to zero. Put in 30,000,000 and take out 10,000,000 a year for five years and the IRR is about 19.86%. The simple return — 10,000,000 over 30,000,000, or 33.3% — sits far above it, because the tenth million arriving in year five is worth less than one arriving today. The 36-month payback is shown alongside because IRR says nothing about when the money comes back.',
      note: 'It is called approximate because the cash flow is held level. Real projects ramp up or tail off, and the same total spread differently shifts IRR by several points. Where the total returned never reaches the outlay the IRR is negative, and this page shows zero instead. IRR is also blind to scale: 30% on a million and 15% on a billion look ranked the wrong way round.' },
  },
  {
    slug: 'wacc',
    icon: '⚖️',
    category: '금융·이자',
    fields: [
      { key: 'equity', term: 'equityWeight', unit: 'percent', def: 60, min: 0, max: 100, step: 1 },
      { key: 'ke', term: 'costEquity', unit: 'percent', def: 9, min: 0, max: 60, step: 0.1 },
      { key: 'kd', term: 'costDebt', unit: 'percent', def: 5, min: 0, max: 60, step: 0.1 },
      { key: 'tax', term: 'taxRate', unit: 'percent', def: 22, min: 0, max: 60, step: 0.1 },
    ],
    formula: '{wacc} = {equityWeight} ÷ 100 × {costEquity} + {debtWeight} ÷ 100 × {costDebt} × (1 − {taxRate} ÷ 100)',
    compute: v => {
      // 두 비중은 반드시 100%가 되어야 한다 — 부채는 입력받지 않고 남은 몫으로 둔다
      const wd = Math.max(0, 100 - v.equity);
      const afterTax = v.kd * (1 - v.tax / 100);
      return [
        { term: 'wacc', unit: 'percent', value: round((v.equity / 100) * v.ke + (wd / 100) * afterTax, 3), digits: 3, primary: true },
        { term: 'afterTaxDebt', unit: 'percent', value: round(afterTax, 3), digits: 3 },
        { term: 'debtWeight', unit: 'percent', value: round(wd, 1), digits: 1 },
      ];
    },
    ko: { title: 'WACC 계산기', desc: '자본과 부채의 비중·비용과 세율로 가중평균자본비용을 구합니다.',
      long: '자기자본과 타인자본의 비용을 각자의 비중으로 가중평균합니다. 자본 60%에 자기자본 비용 9%, 부채 40%에 타인자본 비용 5%, 세율 22%라면 이자는 비용으로 인정되어 세금을 줄이므로 부채 비용은 5 × 0.78 = 3.9%로 내려갑니다. 결과는 0.6 × 9 + 0.4 × 3.9 = 6.96%입니다. 이 6.96%가 NPV 계산의 할인율 자리에 흔히 들어갑니다.',
      note: '세금 효과는 부채에만 붙습니다 — 배당은 비용이 아니라서 자기자본 비용에는 (1 − 세율)을 곱하지 않습니다. 비중은 장부가액이 아니라 시가로 재는 것이 원칙이어서, 주가가 오르면 부채 비중이 저절로 낮아지고 WACC가 올라갑니다. 자기자본 비용 자체는 관측되는 값이 아니라 추정치이므로, 여기 무엇을 넣었는지가 결과의 절반입니다.' },
    en: { title: 'WACC Calculator', desc: 'Weighted average cost of capital from the weights, the two costs and the tax rate.',
      long: 'Weight the cost of equity and the cost of debt by how much of each you use. With 60% equity at 9%, 40% debt at 5% and a 22% tax rate, interest is deductible, so the debt leg falls to 5 × 0.78 = 3.9%. That gives 0.6 × 9 + 0.4 × 3.9 = 6.96%. This 6.96% is what usually goes in the discount-rate slot of an NPV.',
      note: 'The tax shield applies to debt only — dividends are not deductible, so no (1 − tax) multiplies the cost of equity. Weights are meant to be market values, not book values, so a rising share price quietly cuts the debt weight and lifts WACC. The cost of equity is an estimate rather than an observed number, so what you put there is half the answer.' },
  },
  {
    slug: 'ebitda-margin',
    icon: '📊',
    category: '비율·증감',
    fields: [
      { key: 'revenue', term: 'revenue', unit: 'money', def: 500000000, min: 0 },
      { key: 'operating', term: 'operatingProfit', unit: 'money', def: 40000000 },
      { key: 'depr', term: 'deprAmort', unit: 'money', def: 25000000, min: 0 },
    ],
    formula: '{ebitdaValue} = {operatingProfit} + {deprAmort},  {ebitdaMargin} = {ebitdaValue} ÷ {revenue} × 100',
    compute: v => {
      const ebitda = v.operating + v.depr;
      return [
        { term: 'ebitdaMargin', unit: 'percent', value: round(ratio(ebitda, v.revenue) * 100, 1), digits: 1, primary: true },
        { term: 'ebitdaValue', unit: 'money', value: Math.round(ebitda), digits: 0 },
        { term: 'operMargin', unit: 'percent', value: round(ratio(v.operating, v.revenue) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: 'EBITDA 이익률 계산기', desc: '매출과 영업이익·감가상각비로 EBITDA와 EBITDA 이익률을 구합니다.',
      long: 'EBITDA는 영업이익에 감가상각비를 다시 더한 값입니다. 매출 5억에 영업이익 4,000만, 감가상각비 2,500만이면 EBITDA는 6,500만이고 이익률은 13.0%입니다. 영업이익률 8.0%와 5%p 벌어지는 그 차이가 곧 매출에 대한 감가상각비의 비중입니다. 설비가 무거운 업종에서 이 간격이 크게 벌어집니다.',
      note: 'EBITDA는 이자·세금·감가상각·무형자산 상각을 뺀 값입니다. 즉 빌린 돈의 값과 설비가 닳는 값을 계산에서 빼 놓은 숫자입니다. 현금흐름도 아닙니다 — 재고와 매출채권에 묶이는 돈, 그리고 설비를 새로 사는 돈이 들어 있지 않습니다. 감가상각비가 큰 회사는 EBITDA가 좋아 보이지만 그만큼 재투자가 필요합니다.' },
    en: { title: 'EBITDA Margin Calculator', desc: 'EBITDA and the EBITDA margin from revenue, operating profit and depreciation.',
      long: 'EBITDA is operating profit with depreciation and amortisation added back. On 500,000,000 of revenue with 40,000,000 of operating profit and 25,000,000 of depreciation, EBITDA is 65,000,000 and the margin is 13.0%. The five-point gap to the 8.0% operating margin is exactly depreciation as a share of revenue — and it opens up wide in asset-heavy businesses.',
      note: 'EBITDA excludes interest, tax, depreciation and amortisation: the cost of the borrowing and the cost of the assets wearing out are both taken out. Nor is it cash flow — money tied up in inventory and receivables, and money spent replacing equipment, are nowhere in it. A company with heavy depreciation looks better on EBITDA and needs that reinvestment anyway.' },
  },
  {
    slug: 'inventory-turnover',
    icon: '📦',
    category: '비율·증감',
    fields: [
      { key: 'cogs', term: 'cogs', unit: 'money', def: 600000000, min: 0 },
      { key: 'inventory', term: 'avgInventory', unit: 'money', def: 100000000, min: 0 },
    ],
    formula: '{invTurns} = {cogs} ÷ {avgInventory},  {inventoryDays} = 365 ÷ {invTurns}',
    compute: v => {
      const turns = ratio(v.cogs, v.inventory);
      return [
        { term: 'invTurns', unit: 'times', value: round(turns, 2), digits: 2, primary: true },
        { term: 'inventoryDays', unit: 'day', value: round(ratio(365, turns), 1), digits: 1 },
        { term: 'cogsPerDay', unit: 'money', value: Math.round(v.cogs / 365), digits: 0 },
      ];
    },
    ko: { title: '재고 회전율 계산기', desc: '매출원가와 평균 재고로 연 회전 횟수와 재고 일수를 구합니다.',
      long: '한 해 매출원가를 평균 재고로 나누면 재고가 몇 번 돌았는지 나옵니다. 매출원가 6억에 평균 재고 1억이면 6회전이고, 365를 6으로 나눈 60.8일이 재고가 창고에 머무는 평균 기간입니다. 하루 매출원가 1,643,836을 알고 있으면 재고를 열흘 줄일 때 풀리는 현금이 바로 보입니다 — 약 1,644만입니다.',
      note: '평균 재고는 기초와 기말의 평균입니다. 기말 재고만 쓰면 성수기 직후에는 회전율이 낮게, 비수기 직후에는 높게 나옵니다. 분자를 매출원가가 아니라 매출액으로 두는 곳도 있는데, 그러면 이익률만큼 회전율이 부풀려져 다른 회사와 견줄 수 없습니다. 업종마다 정상 범위가 달라 식료품과 가구를 같은 자로 재면 안 됩니다.' },
    en: { title: 'Inventory Turnover Calculator', desc: 'Turns per year and days of inventory from COGS and average stock.',
      long: 'Divide a year of cost of goods sold by average inventory to see how many times the stock cycled. 600,000,000 of COGS against 100,000,000 of average inventory is six turns, and 365 over six is 60.8 days sitting on the shelf. Knowing COGS runs at 1,643,836 a day makes the prize obvious: cutting ten days out of inventory frees about 16,440,000 of cash.',
      note: 'Average inventory means opening plus closing over two. Use the closing figure alone and turnover reads low just after a peak season and high just after a lull. Some places divide revenue rather than COGS, which inflates turns by the margin and makes the number incomparable. Normal ranges differ wildly by trade — groceries and furniture cannot be measured with the same ruler.' },
  },
  {
    slug: 'receivable-days',
    icon: '🧾',
    category: '금융·이자',
    fields: [
      { key: 'revenue', term: 'revenue', unit: 'money', def: 500000000, min: 0 },
      { key: 'receivables', term: 'receivables', unit: 'money', def: 82000000, min: 0 },
      { key: 'days', term: 'totalDays', unit: 'day', def: 365, min: 1, max: 366 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 6, min: 0, max: 40, step: 0.1 },
    ],
    formula: '{dso} = {receivables} ÷ {revenue} × {totalDays}',
    compute: v => {
      const perDay = ratio(v.revenue, v.days);
      return [
        { term: 'dso', unit: 'day', value: round(ratio(v.receivables, v.revenue) * v.days, 1), digits: 1, primary: true },
        { term: 'revenuePerDay', unit: 'money', value: Math.round(perDay), digits: 0 },
        { term: 'carryCost', unit: 'money', value: Math.round(v.receivables * (v.rate / 100)), digits: 0 },
        { term: 'cashPer10Days', unit: 'money', value: Math.round(perDay * 10), digits: 0 },
      ];
    },
    ko: { title: 'DSO(매출채권 회수 일수) 계산기', desc: '매출과 매출채권 잔액으로 대금이 들어오는 데 걸리는 평균 일수를 구합니다.',
      long: '매출채권을 매출로 나눠 기간 일수를 곱합니다. 연 매출 5억에 채권 잔액 8,200만이면 DSO는 59.9일 — 물건을 넘긴 뒤 대금이 두 달쯤 뒤에 들어온다는 뜻입니다. 이 8,200만은 남의 손에 있는 내 돈이고, 연 6%로 자금을 조달한다면 해마다 492만이 그 자리에 붙는 비용입니다. 하루 매출이 1,369,863이므로 회수를 열흘만 앞당기면 13,698,630이 한 번에 풀립니다.',
      note: '기간을 365일로 두면 연 매출을, 90일로 두면 그 분기 매출을 넣어야 합니다 — 섞으면 답이 네 배로 틀립니다. 매출이 계절을 타면 기말 채권만으로 잰 DSO가 실제보다 길거나 짧게 나오고, 세금이 포함된 청구액과 세금을 뺀 매출을 섞어 나누면 DSO가 세율만큼 늘어납니다.' },
    en: { title: 'DSO Calculator (Days Sales Outstanding)', desc: 'How many days it takes to collect, from revenue and the receivables balance.',
      long: 'Divide receivables by revenue and multiply by the days in the period. On 500,000,000 of yearly revenue with 82,000,000 outstanding, DSO is 59.9 days — cash arrives about two months after the goods do. That 82,000,000 is your money sitting in someone else\'s account, and at a 6% funding rate it costs 4,920,000 a year to leave it there. With revenue running at 1,369,863 a day, collecting ten days sooner releases 13,698,630 in one go.',
      note: 'Use 365 days with a year of revenue and 90 with a quarter of it — mixing them puts the answer out by four times. Seasonal sales make a period-end DSO read long or short against reality, and dividing a tax-inclusive invoice balance by tax-exclusive revenue stretches DSO by the tax rate.' },
  },
  {
    slug: 'operating-leverage',
    icon: '🎚️',
    category: '비율·증감',
    fields: [
      { key: 'contrib', term: 'contribTotal', unit: 'money', def: 200000000, min: 0 },
      { key: 'fixed', term: 'fixedCost', unit: 'money', def: 150000000, min: 0 },
      { key: 'change', term: 'salesChangePct', unit: 'percent', def: 10, step: 0.1 },
    ],
    formula: '{dol} = {contribTotal} ÷ ({contribTotal} − {fixedCost})',
    compute: v => {
      const profit = v.contrib - v.fixed;
      // 손익분기 아래에서는 배율이 뜻을 잃는다 — 0으로 둔다
      const dol = profit > 0 ? ratio(v.contrib, profit) : 0;
      return [
        { term: 'dol', unit: 'times', value: round(dol, 2), digits: 2, primary: true },
        { term: 'operatingProfit', unit: 'money', value: Math.round(profit), digits: 0 },
        { term: 'profitChangePct', unit: 'percent', value: round(dol * v.change, 1), digits: 1 },
      ];
    },
    ko: { title: '영업 레버리지도 계산기', desc: '총 공헌이익과 고정비로 매출 1%가 영업이익을 몇 % 움직이는지 구합니다.',
      long: '총 공헌이익을 영업이익으로 나눕니다. 공헌이익 2억에 고정비 1억 5,000만이면 영업이익은 5,000만이고 배율은 4.0입니다. 매출이 10% 늘면 영업이익은 40% 늘고, 10% 줄면 40% 줄어듭니다. 고정비가 클수록 이 배율이 커지는데, 손익분기점에 가까울수록 분모가 얇아져 배율이 무한대로 치솟기 때문입니다.',
      note: '배율은 양쪽으로 똑같이 작동합니다 — 좋을 때 네 배로 벌면 나쁠 때도 네 배로 잃습니다. 여기 넣는 공헌이익은 개당이 아니라 기간 합계(매출 − 변동비)입니다. 개당 값을 넣으면 배율이 터무니없이 작게 나옵니다. 손익분기점 아래에서는 분모가 음수여서 배율을 읽을 수 없으므로 0으로 표시합니다.' },
    en: { title: 'Degree of Operating Leverage Calculator', desc: 'How many percent operating profit moves for each percent of sales, from contribution and fixed costs.',
      long: 'Divide total contribution margin by operating profit. With 200,000,000 of contribution against 150,000,000 of fixed costs, profit is 50,000,000 and the degree is 4.0. Sales up 10% lifts operating profit 40%; sales down 10% takes 40% off. Heavier fixed costs raise the multiple, because near break-even the denominator thins out and the ratio runs away to infinity.',
      note: 'The multiple works in both directions — four times the gain in a good year is four times the loss in a bad one. The contribution you enter is the period total (revenue less variable costs), not the per-unit figure; enter per-unit and the multiple comes out absurdly small. Below break-even the denominator is negative and the ratio cannot be read, so this shows zero.' },
  },
  {
    slug: 'rule-of-40',
    icon: '🎯',
    category: '비율·증감',
    fields: [
      { key: 'growth', term: 'revGrowth', unit: 'percent', def: 35, step: 0.1 },
      { key: 'margin', term: 'marginRate', unit: 'percent', def: 8, step: 0.1 },
      { key: 'line', term: 'ruleLine', unit: 'percent', def: 40, min: 1, max: 100, step: 1 },
    ],
    formula: '{ruleSum} = {revGrowth} + {marginRate}',
    compute: v => [
      { term: 'ruleSum', unit: 'percent', value: round(v.growth + v.margin, 1), digits: 1, primary: true },
      { term: 'pointDiff', unit: 'percent', value: round(v.growth + v.margin - v.line, 1), digits: 1 },
      { term: 'marginNeeded', unit: 'percent', value: round(v.line - v.growth, 1), digits: 1 },
    ],
    verdict: (v, out) => {
      const sum = out[0].value;
      const gap = out[1].value;
      return gap >= 0
        ? {
            ko: `성장률 ${v.growth}%와 이익률 ${v.margin}%를 더한 ${sum}%가 ${v.line} 선을 ${gap}%p 넘습니다.`,
            en: `Growth of ${v.growth}% plus a ${v.margin}% margin makes ${sum}%, clearing the ${v.line} line by ${gap} points.`,
            l10n: {
              es: `Un crecimiento del ${v.growth} % más un margen del ${v.margin} % suman ${sum} %, ${gap} puntos por encima de la línea de ${v.line}.`,
              'pt-br': `Crescimento de ${v.growth} % mais margem de ${v.margin} % somam ${sum} %, ${gap} pontos acima da linha de ${v.line}.`,
              ja: `成長率${v.growth}%と利益率${v.margin}%の合計${sum}%は、${v.line}のラインを${gap}ポイント上回っています。`,
              de: `${v.growth} % Wachstum plus ${v.margin} % Marge ergeben ${sum} % — ${gap} Punkte über der ${v.line}-Linie.`,
              fr: `${v.growth} % de croissance plus ${v.margin} % de marge font ${sum} %, soit ${gap} points au-dessus de la ligne des ${v.line}.`,
              hi: `${v.growth}% वृद्धि और ${v.margin}% मार्जिन मिलकर ${sum}% बनते हैं — ${v.line} की रेखा से ${gap} अंक ऊपर।`,
              'zh-hans': `${v.growth}% 增长加 ${v.margin}% 利润率合计 ${sum}%，比 ${v.line} 这条线高 ${gap} 个百分点。`,
              'zh-hant': `${v.growth}% 成長加 ${v.margin}% 利潤率合計 ${sum}%，比 ${v.line} 這條線高 ${gap} 個百分點。`,
            },
            tone: 'good',
          }
        : {
            ko: `합계 ${sum}%가 ${v.line} 선에 ${round(-gap, 1)}%p 못 미칩니다. 이 성장률이라면 이익률 ${out[2].value}%가 필요합니다.`,
            en: `The sum of ${sum}% is ${round(-gap, 1)} points under the ${v.line} line; at this growth rate the margin would have to be ${out[2].value}%.`,
            l10n: {
              es: `La suma de ${sum} % queda ${round(-gap, 1)} puntos por debajo de la línea de ${v.line}; con este crecimiento el margen tendría que ser del ${out[2].value} %.`,
              'pt-br': `A soma de ${sum} % fica ${round(-gap, 1)} pontos abaixo da linha de ${v.line}; com este crescimento a margem teria de ser de ${out[2].value} %.`,
              ja: `合計${sum}%は${v.line}のラインに${round(-gap, 1)}ポイント届きません。この成長率なら利益率${out[2].value}%が必要です。`,
              de: `Die Summe von ${sum} % liegt ${round(-gap, 1)} Punkte unter der ${v.line}-Linie; bei diesem Wachstum bräuchte es ${out[2].value} % Marge.`,
              fr: `La somme de ${sum} % reste ${round(-gap, 1)} points sous la ligne des ${v.line} ; à ce rythme, il faudrait ${out[2].value} % de marge.`,
              hi: `${sum}% का जोड़ ${v.line} की रेखा से ${round(-gap, 1)} अंक नीचे है; इस वृद्धि पर मार्जिन ${out[2].value}% चाहिए।`,
              'zh-hans': `合计 ${sum}% 比 ${v.line} 这条线低 ${round(-gap, 1)} 个百分点；按这个增速，利润率需要 ${out[2].value}%。`,
              'zh-hant': `合計 ${sum}% 比 ${v.line} 這條線低 ${round(-gap, 1)} 個百分點；按這個增速，利潤率需要 ${out[2].value}%。`,
            },
            tone: 'warn',
          };
    },
    ko: { title: '40의 법칙 계산기', desc: '연 매출 성장률과 이익률을 더해 40 선과 견줍니다.',
      long: '성장률과 이익률을 그냥 더합니다. 성장 35%에 이익률 8%면 43으로 40 선을 3%p 넘습니다. 거꾸로 읽으면 성장률이 35%일 때 선을 맞추는 데 필요한 이익률은 5%입니다 — 빠르게 크는 동안에는 이익을 적게 남겨도 되고, 성장이 멈추면 그만큼 이익률로 메워야 한다는 이야기입니다. 40이라는 숫자는 2015년 브래드 펠드가 블로그에 적으며 널리 퍼진 벤처 업계의 어림자입니다.',
      note: '두 숫자가 같은 자를 쓰는지 먼저 보세요. 이익률 자리에 EBITDA 이익률, 영업이익률, 잉여현금흐름 이익률 가운데 무엇을 넣느냐에 따라 합계가 10%p 이상 움직입니다. 성장률도 연 성장률과 최근 분기를 연 환산한 값이 크게 다릅니다. 매출 규모가 작을 때는 성장률이 쉽게 커져 이 합계가 후하게 나옵니다.' },
    en: { title: 'Rule of 40 Calculator', desc: 'Add revenue growth to profit margin and measure the sum against the 40 line.',
      long: 'Simply add the two. Growth of 35% with an 8% margin makes 43, three points clear of the 40 line. Read backwards, at 35% growth the margin needed to sit on the line is 5% — grow fast and you are allowed thin profits; stop growing and margin has to make up the difference. The number 40 is a venture-industry rule of thumb popularised by Brad Feld in a 2015 blog post.',
      note: 'Check that both figures use the same ruler. Putting EBITDA margin, operating margin or free-cash-flow margin in the second slot swings the sum by ten points or more. Growth differs too between a year-on-year rate and an annualised recent quarter. At small revenue the growth rate is easy to inflate, which flatters the sum.' },
  },
  {
    slug: 'churn-rate',
    icon: '🚪',
    category: '비율·증감',
    fields: [
      { key: 'start', term: 'custStart', unit: 'people', def: 1200, min: 0 },
      { key: 'lost', term: 'custLost', unit: 'people', def: 42, min: 0 },
    ],
    formula: '{churnRate} = {custLost} ÷ {custStart} × 100,  {avgLifeMonths} = 100 ÷ {churnRate}',
    compute: v => {
      const churn = ratio(v.lost, v.start) * 100;
      return [
        { term: 'churnRate', unit: 'percent', value: round(churn, 2), digits: 2, primary: true },
        { term: 'avgLifeMonths', unit: 'month', value: round(ratio(100, churn), 1), digits: 1 },
        { term: 'custLeft', unit: 'people', value: Math.max(0, Math.round(v.start - v.lost)), digits: 0 },
      ];
    },
    ko: { title: '이탈률(Churn) 계산기', desc: '기초 고객 수와 이탈 수로 월 이탈률과 평균 유지 개월을 구합니다.',
      long: '그 달에 떠난 고객을 달 초 고객으로 나눕니다. 1,200명 가운데 42명이 떠나면 월 이탈률 3.5%이고 1,158명이 남습니다. 이 3.5%를 뒤집으면 평균 유지 기간이 나옵니다 — 100 ÷ 3.5 = 28.6개월입니다. 이탈률이 매달 일정하다는 가정 아래 성립하는 값이고, 생애가치를 구할 때 이 개월 수가 곱해집니다.',
      note: '분모를 달 초 고객으로 두어야 합니다. 그 달에 새로 들어온 고객까지 분모에 넣으면 빠르게 크는 회사의 이탈률이 실제보다 낮게 나옵니다. 사람 수 기준 이탈률과 금액 기준 이탈률은 다른 숫자입니다 — 작은 요금제만 떠나면 사람은 3.5%가 빠져도 매출은 1%밖에 줄지 않습니다. 12개월로 누적한 값은 유지율 계산기 쪽에 있습니다.' },
    en: { title: 'Churn Rate Calculator', desc: 'Monthly churn and the implied average customer lifetime, from starting and lost customers.',
      long: 'Divide the customers who left during the month by the customers you had at the start of it. Lose 42 out of 1,200 and churn is 3.5%, leaving 1,158. Invert that 3.5% and you get the average lifetime: 100 ÷ 3.5 is 28.6 months. It holds only if churn stays level month after month, and that month count is what gets multiplied in a lifetime-value calculation.',
      note: 'The denominator has to be the customers you started the month with. Fold this month\'s new signups into it and a fast-growing company reports churn lower than it is. Customer churn and revenue churn are different numbers — if only the cheapest plans leave, 3.5% of people can be 1% of revenue. For the 12-month compounded figure, use the retention-rate page.' },
  },
  {
    slug: 'retention-rate',
    icon: '🔁',
    category: '비율·증감',
    fields: [
      { key: 'start', term: 'custStart', unit: 'people', def: 1200, min: 0 },
      { key: 'lost', term: 'custLost', unit: 'people', def: 42, min: 0 },
      { key: 'months', term: 'months', unit: 'month', def: 12, min: 0, max: 120, step: 1 },
    ],
    formula: '{retentionRate} = 100 − {churnRate},  {retainedAfter} = ({retentionRate} ÷ 100) ^ {months} × 100',
    compute: v => {
      const churn = ratio(v.lost, v.start);
      // 이탈이 100%를 넘으면 거듭제곱이 뜻을 잃는다 — 0에서 자른다
      const keep = Math.max(0, 1 - churn);
      const after = Math.pow(keep, v.months);
      return [
        { term: 'retentionRate', unit: 'percent', value: round(keep * 100, 2), digits: 2, primary: true },
        { term: 'retainedAfter', unit: 'percent', value: round(after * 100, 1), digits: 1 },
        { term: 'custAfter', unit: 'people', value: Math.round(v.start * after), digits: 0 },
        { term: 'churnRate', unit: 'percent', value: round(churn * 100, 2), digits: 2 },
      ];
    },
    ko: { title: '고객 유지율 계산기', desc: '월 유지율과 그것이 12개월 동안 겹쳐 쌓인 결과를 구합니다.',
      long: '유지율은 이탈률의 나머지입니다. 1,200명 가운데 42명이 떠나면 이탈 3.5%, 유지 96.5%입니다. 문제는 이 96.5%가 매달 곱해진다는 데 있습니다 — 0.965를 열두 번 곱하면 65.2%이고, 1,200명 가운데 783명만 남습니다. 96.5%라는 숫자가 주는 인상과 실제로 한 해 뒤에 남는 몫은 이만큼 다릅니다.',
      note: '월 유지율에서 12를 빼거나 곱해서 연 유지율을 만들 수 없습니다 — 반드시 거듭제곱입니다. 96.5%를 99%로 올리면 12개월 뒤 65.2%가 88.6%가 되고, 이 2.5%p가 생애가치를 40% 가까이 바꿉니다. 떠난 고객이 돌아오는 경우(재가입)는 이 계산에 들어 있지 않으므로, 재가입이 잦은 서비스에서는 실제로 남는 몫이 이 값보다 큽니다.' },
    en: { title: 'Customer Retention Rate Calculator', desc: 'Monthly retention and what it compounds to over twelve months.',
      long: 'Retention is what churn leaves behind. Lose 42 of 1,200 and churn is 3.5%, retention 96.5%. The catch is that the 96.5% multiplies every month — 0.965 to the twelfth power is 65.2%, so only 783 of the 1,200 are still there. The impression 96.5% gives and the share actually left after a year are that far apart.',
      note: 'You cannot turn monthly retention into yearly retention by subtracting or multiplying by twelve — it has to be a power. Lifting 96.5% to 99% turns 65.2% after twelve months into 88.6%, and those 2.5 points move lifetime value by close to 40%. Customers who leave and come back are not in this arithmetic, so where reactivation is common the real remaining share is higher.' },
  },
  {
    slug: 'customer-ltv',
    icon: '💎',
    category: '비율·증감',
    fields: [
      { key: 'arpu', term: 'arpu', unit: 'money', def: 30000, min: 0 },
      { key: 'margin', term: 'marginRate', unit: 'percent', def: 80, min: 0, max: 100, step: 0.1 },
      { key: 'churn', term: 'churnRate', unit: 'percent', def: 3.5, min: 0, max: 100, step: 0.1 },
    ],
    formula: '{customerLtv} = {arpu} × {marginRate} ÷ 100 ÷ ({churnRate} ÷ 100)',
    compute: v => {
      const gross = v.arpu * (v.margin / 100);
      return [
        { term: 'customerLtv', unit: 'money', value: Math.round(ratio(gross, v.churn / 100)), digits: 0, primary: true },
        { term: 'avgLifeMonths', unit: 'month', value: round(ratio(100, v.churn), 1), digits: 1 },
        { term: 'monthlyProfit', unit: 'money', value: Math.round(gross), digits: 0 },
      ];
    },
    ko: { title: '고객 생애가치(LTV) 계산기', desc: '고객당 월 매출·매출이익률·이탈률로 한 고객이 남기는 총 이익을 구합니다.',
      long: '고객 한 명이 매달 남기는 매출이익을 이탈률로 나눕니다. 월 30,000을 내고 매출이익률이 80%면 매달 24,000이 남고, 월 이탈률 3.5%는 평균 28.6개월을 뜻하므로 생애가치는 24,000 ÷ 0.035 = 685,714입니다. 이탈률로 나눈다는 것과 유지 개월을 곱한다는 것은 같은 말입니다. 이름이 같은 다른 LTV가 있습니다 — 주택담보대출의 LTV(loan-to-value)는 집값 대비 대출 비율로, 이 페이지와 아무 관계가 없습니다.',
      note: '매출이 아니라 매출이익으로 계산해야 합니다. 서버비·결제 수수료·지원 인력비를 빼지 않고 매출 그대로 넣으면 생애가치가 이익률의 역수만큼 부풀려집니다 — 이익률 80%면 1.25배, 30%면 3.3배입니다. 이탈률이 일정하다는 가정도 현실과 다릅니다. 초기 몇 달의 이탈이 유난히 높은 서비스에서는 이 값이 실제보다 큽니다. 미래에 받을 돈을 할인하지 않은 값이기도 합니다.' },
    en: { title: 'Customer Lifetime Value Calculator', desc: 'What one customer contributes in total, from monthly revenue, gross margin and churn.',
      long: 'Divide the gross profit one customer leaves each month by the churn rate. At 30,000 a month with an 80% gross margin, 24,000 is left monthly, and 3.5% monthly churn means an average 28.6 months, so lifetime value is 24,000 ÷ 0.035 = 685,714. Dividing by churn and multiplying by the average lifetime are the same operation. Note there is another LTV entirely: in mortgages, loan-to-value is the loan against the property price and has nothing to do with this page.',
      note: 'Use gross profit, not revenue. Feed in raw revenue without taking out hosting, payment fees and support and the answer inflates by the reciprocal of the margin — 1.25× at 80%, 3.3× at 30%. Level churn is also a fiction: where the first few months churn hardest, this figure overstates reality. It is also undiscounted, so money arriving three years out is counted at full face value.' },
  },
  {
    slug: 'ltv-cac',
    icon: '⚗️',
    category: '비율·증감',
    fields: [
      { key: 'ltv', term: 'customerLtv', unit: 'money', def: 685714, min: 0 },
      { key: 'cac', term: 'cac', unit: 'money', def: 180000, min: 0 },
      { key: 'profit', term: 'monthlyProfit', unit: 'money', def: 24000, min: 0 },
    ],
    formula: '{ltvCacRatio} = {customerLtv} ÷ {cac},  {cacPayback} = {cac} ÷ {monthlyProfit}',
    compute: v => [
      { term: 'ltvCacRatio', unit: 'times', value: round(ratio(v.ltv, v.cac), 2), digits: 2, primary: true },
      { term: 'cacPayback', unit: 'month', value: round(ratio(v.cac, v.profit), 1), digits: 1 },
      { term: 'cacCeiling', unit: 'money', value: Math.round(v.ltv / 3), digits: 0 },
    ],
    verdict: (v, out) => {
      if (v.cac <= 0 || v.ltv <= 0) return null;
      const r = out[0].value;
      const pay = out[1].value;
      return r >= 3
        ? {
            ko: `LTV가 CAC의 ${r}배로 흔히 인용되는 3:1을 넘습니다. 획득비용은 ${pay}개월에 회수됩니다.`,
            en: `LTV is ${r}× CAC, above the commonly cited 3:1. The acquisition cost is recovered in ${pay} months.`,
            l10n: {
              es: `El LTV es ${r}× el CAC, por encima del 3:1 que suele citarse. El coste de adquisición se recupera en ${pay} meses.`,
              'pt-br': `O LTV é ${r}× o CAC, acima do 3:1 usualmente citado. O custo de aquisição volta em ${pay} meses.`,
              ja: `LTVはCACの${r}倍で、よく引かれる3:1を上回っています。獲得費用は${pay}か月で回収されます。`,
              de: `Der LTV liegt beim ${r}-Fachen des CAC, über dem oft genannten 3:1. Die Akquisitionskosten sind in ${pay} Monaten zurück.`,
              fr: `La LTV vaut ${r}× le CAC, au-dessus du 3:1 souvent cité. Le coût d’acquisition est récupéré en ${pay} mois.`,
              hi: `LTV, CAC का ${r} गुना है — आम तौर पर बताए जाने वाले 3:1 से ऊपर। अधिग्रहण लागत ${pay} महीनों में वापस आती है।`,
              'zh-hans': `LTV 是 CAC 的 ${r} 倍，高于常被引用的 3:1。获客成本在 ${pay} 个月内收回。`,
              'zh-hant': `LTV 是 CAC 的 ${r} 倍，高於常被引用的 3:1。獲客成本在 ${pay} 個月內收回。`,
            },
            tone: 'good',
          }
        : {
            ko: `LTV가 CAC의 ${r}배로 3:1에 못 미칩니다. 그 기준을 맞추려면 획득비용을 ${out[2].value} 이하로 두어야 합니다.`,
            en: `LTV is only ${r}× CAC, short of 3:1. Meeting that mark means keeping acquisition cost at or below ${out[2].value}.`,
            l10n: {
              es: `El LTV es solo ${r}× el CAC, por debajo del 3:1. Para alcanzarlo, el coste de adquisición debe quedar en ${out[2].value} o menos.`,
              'pt-br': `O LTV é apenas ${r}× o CAC, abaixo do 3:1. Para chegar lá, o custo de aquisição precisa ficar em ${out[2].value} ou menos.`,
              ja: `LTVはCACの${r}倍にとどまり、3:1に届きません。その水準に合わせるには獲得費用を${out[2].value}以下に抑える必要があります。`,
              de: `Der LTV liegt nur beim ${r}-Fachen des CAC und bleibt unter 3:1. Dafür dürften die Akquisitionskosten höchstens ${out[2].value} betragen.`,
              fr: `La LTV ne vaut que ${r}× le CAC, sous le 3:1. Pour l’atteindre, le coût d’acquisition doit rester à ${out[2].value} ou moins.`,
              hi: `LTV, CAC का केवल ${r} गुना है — 3:1 से कम। उस स्तर के लिए अधिग्रहण लागत ${out[2].value} या उससे नीचे रहनी चाहिए।`,
              'zh-hans': `LTV 只有 CAC 的 ${r} 倍，低于 3:1。要达到这条线，获客成本需控制在 ${out[2].value} 以内。`,
              'zh-hant': `LTV 只有 CAC 的 ${r} 倍，低於 3:1。要達到這條線，獲客成本需控制在 ${out[2].value} 以內。`,
            },
            tone: 'warn',
          };
    },
    ko: { title: 'LTV : CAC 비율 계산기', desc: '생애가치와 획득비용의 비율을 3:1 기준과 견주고 회수 개월을 구합니다.',
      long: '생애가치를 획득비용으로 나눕니다. LTV 685,714에 CAC 180,000이면 3.81배로, 흔히 인용되는 3:1을 넘습니다. 비율만으로는 부족한 것이 하나 있습니다 — 언제 돌아오는지입니다. 고객당 월 매출이익이 24,000이면 180,000은 7.5개월에 회수됩니다. 비율이 5배라도 회수가 30개월이면 그동안 쓸 현금을 어디서 구할지가 실제 문제가 됩니다.',
      note: '3:1은 규칙이 아니라 벤처 투자 쪽에서 굳어진 어림자입니다. 비율이 너무 높으면 광고를 덜 써서 성장을 놓치고 있다는 신호로 읽히기도 합니다. LTV를 매출로 계산했다면 이 비율은 이미 부풀려져 있습니다. CAC 회수 개월도 매출이 아니라 매출이익으로 나누어야 하며, 세일즈 인건비와 대행 수수료를 CAC에 넣었는지 먼저 확인하세요.' },
    en: { title: 'LTV to CAC Ratio Calculator', desc: 'Lifetime value against acquisition cost, measured on the 3:1 rule of thumb, plus months to recover CAC.',
      long: 'Divide lifetime value by acquisition cost. An LTV of 685,714 against a CAC of 180,000 is 3.81×, above the widely cited 3:1. The ratio leaves one thing out: when the money comes back. At 24,000 of gross profit per customer a month, 180,000 is recovered in 7.5 months. A 5× ratio with a 30-month payback turns into a question about where the cash comes from meanwhile.',
      note: '3:1 is not a rule but a convention from venture investing; a very high ratio is often read as underspending on growth. If the LTV was built on revenue rather than gross profit, this ratio is already inflated. The payback months must also divide gross profit, not revenue — and check first whether sales salaries and agency fees went into the CAC.' },
  },
  {
    slug: 'cac',
    icon: '🧲',
    category: '비율·증감',
    fields: [
      { key: 'spend', term: 'salesMarketing', unit: 'money', def: 24000000, min: 0 },
      { key: 'customers', term: 'newCustomers', unit: 'people', def: 120, min: 0 },
      { key: 'paid', term: 'paidShare', unit: 'percent', def: 70, min: 0, max: 100, step: 1 },
    ],
    formula: '{cac} = {salesMarketing} ÷ {newCustomers},  {cacPaid} = {salesMarketing} ÷ ({newCustomers} × {paidShare} ÷ 100)',
    compute: v => {
      const paidCount = v.customers * (v.paid / 100);
      return [
        { term: 'cac', unit: 'money', value: Math.round(ratio(v.spend, v.customers)), digits: 0, primary: true },
        { term: 'cacPaid', unit: 'money', value: Math.round(ratio(v.spend, paidCount)), digits: 0 },
        { term: 'paidCustomers', unit: 'people', value: round(paidCount, 0), digits: 0 },
      ];
    },
    ko: { title: 'CAC(고객 획득비용) 계산기', desc: '영업·마케팅 비용과 새 고객 수로 혼합 CAC와 유료 기준 CAC를 구합니다.',
      long: '기간 비용을 그 기간에 얻은 고객 수로 나눕니다. 2,400만을 써서 120명을 얻으면 혼합 CAC는 200,000입니다. 그런데 그 120명 가운데 70%만 광고로 왔다면 광고가 실제로 데려온 사람은 84명이고, 유료 기준 CAC는 2,400만 ÷ 84 = 285,714입니다. 광고를 두 배로 늘려도 소개나 검색으로 오는 사람은 함께 늘지 않으므로, 다음 100명을 데려오는 비용은 200,000이 아니라 285,714에 가깝습니다.',
      note: '분자에 무엇을 넣었는지가 회사마다 다릅니다. 광고비만 넣은 CAC와 세일즈 인건비·툴·대행 수수료까지 넣은 CAC는 두세 배 벌어지므로 남의 숫자와 견줄 때 먼저 물어봐야 합니다. 광고를 본 사람이 한 달 뒤에 가입하기도 하므로, 이번 달 비용을 이번 달 고객으로 나누면 성장기에는 CAC가 높게, 축소기에는 낮게 나옵니다.' },
    en: { title: 'CAC Calculator (Customer Acquisition Cost)', desc: 'Blended and paid-only CAC from sales and marketing spend and the customers won.',
      long: 'Divide the period\'s spend by the customers it won. 24,000,000 for 120 customers is a blended CAC of 200,000. But if only 70% of those 120 came from paid channels, advertising actually delivered 84 people, and the paid-only CAC is 24,000,000 ÷ 84 = 285,714. Doubling the ad budget does not double referrals and organic search, so the cost of the next hundred customers sits closer to 285,714 than to 200,000.',
      note: 'What goes in the numerator varies by company. A CAC counting media spend alone and one counting sales salaries, tools and agency fees differ by two or three times, so ask before comparing with anyone else\'s figure. People also sign up a month after seeing the ad, so dividing this month\'s spend by this month\'s customers reports CAC high while growing and low while shrinking.' },
  },
  {
    slug: 'mrr-growth',
    icon: '📈',
    category: '비율·증감',
    fields: [
      { key: 'now', term: 'mrrNow', unit: 'money', def: 52000000, min: 0 },
      { key: 'prev', term: 'mrrPrev', unit: 'money', def: 48000000, min: 0 },
    ],
    formula: '{mrrGrowth} = ({mrrNow} − {mrrPrev}) ÷ {mrrPrev} × 100,  {arr} = {mrrNow} × 12',
    compute: v => {
      const g = ratio(v.now - v.prev, v.prev);
      return [
        { term: 'mrrGrowth', unit: 'percent', value: round(g * 100, 2), digits: 2, primary: true },
        { term: 'arr', unit: 'money', value: Math.round(v.now * 12), digits: 0 },
        { term: 'growthAnnual', unit: 'percent', value: round((Math.pow(1 + g, 12) - 1) * 100, 1), digits: 1 },
        { term: 'netNewMrr', unit: 'money', value: Math.round(v.now - v.prev), digits: 0 },
      ];
    },
    ko: { title: 'MRR 성장률 계산기', desc: '이번 달과 지난달 MRR로 월 성장률·순증 MRR·ARR과 연 환산 성장률을 구합니다.',
      long: '늘어난 금액을 지난달 금액으로 나눕니다. 4,800만에서 5,200만으로 올랐다면 순증 400만, 월 8.33% 성장입니다. ARR은 이번 달 MRR에 12를 곱한 6억 2,400만입니다. 이 8.33%가 열두 달 이어진다면 연 환산 성장률은 100%가 아니라 161.3%입니다 — 1.0833을 열두 번 곱한 값이기 때문입니다.',
      note: '월 성장률에 12를 곱하면 연 성장률이 아닙니다. 반드시 거듭제곱이고, 이 차이가 8%대에서 이미 61%p입니다. 여기 나오는 것은 순증이므로, 신규·업그레이드가 이탈·다운그레이드를 덮으면 8%가 좋아 보여도 안에서 새는 것이 보이지 않습니다. 한 달치만으로는 큰 계약 하나에 흔들리므로 석 달을 함께 보는 편이 낫고, ARR에 12를 곱하는 계산은 연간 계약과 월간 계약을 뒤섞으면 어긋납니다.' },
    en: { title: 'MRR Growth Rate Calculator', desc: 'Monthly growth, net new MRR, ARR and the annualised rate from this month and last.',
      long: 'Divide the increase by last month\'s figure. From 48,000,000 to 52,000,000 is 4,000,000 of net new MRR and 8.33% growth. ARR is this month\'s MRR times twelve: 624,000,000. If that 8.33% held for a year, the annualised rate is not 100% but 161.3% — 1.0833 raised to the twelfth power.',
      note: 'Multiplying monthly growth by twelve does not give yearly growth; it has to be a power, and at 8% the gap is already 61 points. This is a net figure, so new business and upgrades hiding churn and downgrades makes a good 8% look calm while revenue leaks underneath. A single month also swings on one large contract, so read three together — and the ×12 for ARR misleads where annual and monthly contracts are mixed.' },
  },
  {
    slug: 'conversion-rate',
    icon: '🛒',
    category: '비율·증감',
    fields: [
      { key: 'visitors', term: 'visitors', unit: 'people', def: 24000, min: 0 },
      { key: 'orders', term: 'orders', unit: 'order', def: 420, min: 0 },
      { key: 'target', term: 'targetConvRate', unit: 'percent', def: 2.5, min: 0, max: 100, step: 0.1 },
    ],
    formula: '{convRate} = {orders} ÷ {visitors} × 100,  {extraVisitors} = {ordersAtTarget} ÷ ({convRate} ÷ 100) − {visitors}',
    compute: v => {
      const cr = ratio(v.orders, v.visitors);
      const atTarget = v.visitors * (v.target / 100);
      const needed = ratio(atTarget, cr);
      return [
        { term: 'convRate', unit: 'percent', value: round(cr * 100, 2), digits: 2, primary: true },
        { term: 'ordersAtTarget', unit: 'order', value: Math.round(atTarget), digits: 0 },
        { term: 'visitorsNeeded', unit: 'people', value: Math.round(needed), digits: 0 },
        { term: 'extraVisitors', unit: 'people', value: Math.round(Math.max(0, needed - v.visitors)), digits: 0 },
      ];
    },
    ko: { title: '전환율 계산기', desc: '방문자와 주문 수로 전환율을 구하고, 목표 전환율만큼의 주문을 지금 전환율로 채우려면 방문자가 몇 명 더 필요한지 봅니다.',
      long: '주문을 방문자로 나눕니다. 24,000명이 들어와 420건이 팔리면 전환율 1.75%입니다. 목표를 2.5%로 두면 같은 방문자에서 600건이 나오는데, 전환율을 그대로 두고 600건을 만들려면 34,286명이 필요합니다 — 지금보다 10,286명이 더 와야 합니다. 전환율 0.75%p를 올리는 일과 방문자를 43% 늘리는 일이 같은 값이라는 뜻입니다.',
      note: '분모를 무엇으로 두느냐가 답을 크게 바꿉니다. 세션 기준과 사람 기준은 보통 1.3~1.5배 차이가 나고, 봇과 내부 접속을 걸러내지 않으면 전환율이 낮게 나옵니다. 기기별·유입경로별로 갈라 보면 전체 평균이 어느 한쪽에 끌려가고 있는지가 드러납니다 — 모바일 비중이 늘면 전체 전환율은 아무것도 나빠지지 않았는데도 내려갑니다.' },
    en: { title: 'Conversion Rate Calculator', desc: 'Conversion rate from visitors and orders, and the extra traffic it would take to match a target rate at today\'s rate.',
      long: 'Divide orders by visitors. 420 orders from 24,000 visitors is 1.75%. Set the target at 2.5% and the same traffic would produce 600 orders; getting to 600 without touching conversion needs 34,286 visitors — 10,286 more than you have. Put another way, lifting conversion by 0.75 points is worth as much as buying 43% more traffic.',
      note: 'The denominator moves the answer a lot. Sessions and unique people usually differ by 1.3 to 1.5 times, and leaving bots and internal traffic in drags the rate down. Splitting by device and channel shows what is pulling the average: as the mobile share grows, the blended rate falls even though nothing got worse.' },
  },
  {
    slug: 'aov-uplift',
    icon: '🧺',
    category: '할인·가격',
    fields: [
      { key: 'now', term: 'aovNow', unit: 'money', def: 42000, min: 0 },
      { key: 'target', term: 'aovTarget', unit: 'money', def: 50000, min: 0 },
      { key: 'orders', term: 'orders', unit: 'order', def: 420, min: 0 },
    ],
    formula: '{aovUplift} = ({aovTarget} − {aovNow}) ÷ {aovNow} × 100,  {revenueGain} = ({aovTarget} − {aovNow}) × {orders}',
    compute: v => [
      { term: 'aovUplift', unit: 'percent', value: round(ratio(v.target - v.now, v.now) * 100, 2), digits: 2, primary: true },
      { term: 'revenueAfter', unit: 'money', value: Math.round(v.target * v.orders), digits: 0 },
      { term: 'revenueGain', unit: 'money', value: Math.round((v.target - v.now) * v.orders), digits: 0 },
    ],
    ko: { title: '평균 주문금액(AOV) 상승률 계산기', desc: '현재와 목표 평균 주문금액으로 필요한 상승률과 방문자가 그대로일 때 늘어나는 매출을 구합니다.',
      long: '올려야 하는 금액을 지금 금액으로 나눕니다. 42,000을 50,000으로 올리려면 19.05% 상승이 필요합니다. 주문이 420건 그대로라면 매출은 17,640,000에서 21,000,000으로 오르고, 3,360,000이 더 들어옵니다. 방문자를 한 명도 더 데려오지 않고 얻는 매출이라, 광고비가 붙지 않는다는 점이 전환율이나 방문자를 늘리는 쪽과 다릅니다.',
      note: '이 계산은 주문 수가 그대로라고 봅니다. 최소 주문금액을 올리거나 묶음만 팔아 AOV를 올리면 주문 수 자체가 줄어들 수 있고, 그러면 매출은 계산만큼 늘지 않습니다. 무료배송 문턱을 올려 AOV를 만들었다면 늘어난 매출에서 배송비를 빼고 봐야 합니다. AOV는 평균이라 큰 주문 몇 건에 쉽게 끌려가므로, 중앙값과 함께 보는 편이 안전합니다.' },
    en: { title: 'Average Order Value Uplift Calculator', desc: 'The uplift a target AOV needs, and the revenue it adds at unchanged order volume.',
      long: 'Divide the increase by where you are now. Moving 42,000 to 50,000 needs a 19.05% uplift. Hold orders at 420 and revenue goes from 17,640,000 to 21,000,000 — 3,360,000 more. It arrives without a single extra visitor, which is what separates it from raising traffic or conversion: no media cost attaches to it.',
      note: 'This assumes order volume holds. Raising a minimum order value or selling only in bundles can cut the number of orders, and then revenue does not rise by the amount shown. If the AOV came from lifting a free-shipping threshold, take the shipping cost out of the gain before believing it. AOV is a mean, so a few large orders drag it — read it next to the median.' },
  },
  {
    slug: 'debt-snowball-vs-avalanche',
    icon: '🏔️',
    category: '금융·이자',
    fields: [
      { key: 'balA', term: 'debtA', unit: 'money', def: 3000000, min: 0, max: 1000000000000 },
      { key: 'rateA', term: 'debtARate', unit: 'percent', def: 7, min: 0, max: 100, step: 0.1 },
      { key: 'balB', term: 'debtB', unit: 'money', def: 8000000, min: 0, max: 1000000000000 },
      { key: 'rateB', term: 'debtBRate', unit: 'percent', def: 19, min: 0, max: 100, step: 0.1 },
      { key: 'pay', term: 'monthlyPay', unit: 'money', def: 600000, min: 0 },
    ],
    formula: '{interestDiff} = {snowballInterest} − {avalancheInterest}',
    compute: v => {
      const debts = [
        { bal: v.balA, rate: v.rateA },
        { bal: v.balB, rate: v.rateB },
      ];
      // 눈덩이는 잔액이 작은 것부터, 눈사태는 이율이 높은 것부터
      const avalanche = runPlan([...debts].sort((a, b) => b.rate - a.rate), v.pay);
      const snowball = runPlan([...debts].sort((a, b) => a.bal - b.bal), v.pay);
      return [
        { term: 'interestDiff', unit: 'money', value: Math.round(snowball.interest - avalanche.interest), digits: 0, primary: true },
        { term: 'avalancheMonths', unit: 'month', value: avalanche.months, digits: 0 },
        { term: 'snowballMonths', unit: 'month', value: snowball.months, digits: 0 },
        { term: 'avalancheInterest', unit: 'money', value: Math.round(avalanche.interest), digits: 0 },
        { term: 'snowballInterest', unit: 'money', value: Math.round(snowball.interest), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      if (v.pay <= 0 || v.balA + v.balB <= 0) return null;
      const diff = out[0].value;
      const am = out[1].value;
      const sm = out[2].value;
      return diff > 0
        ? {
            ko: `이율이 높은 쪽을 먼저 갚으면 ${am}개월에 끝나고, 작은 쪽을 먼저 갚으면 ${sm}개월에 이자를 ${diff} 더 물게 됩니다.`,
            en: `Highest rate first clears in ${am} months; smallest balance first takes ${sm} months and ${diff} more interest.`,
            l10n: {
              es: `Empezando por el tipo más alto se liquida en ${am} meses; empezando por el saldo menor tarda ${sm} meses y cuesta ${diff} más de intereses.`,
              'pt-br': `Começando pela taxa mais alta, quita em ${am} meses; começando pelo saldo menor leva ${sm} meses e custa ${diff} mais de juros.`,
              ja: `金利の高い方から返すと${am}か月で終わり、残高の小さい方から返すと${sm}か月かかって利息が${diff}多くなります。`,
              de: `Zuerst den höheren Zins abzuzahlen dauert ${am} Monate; zuerst den kleineren Saldo dauert ${sm} Monate und kostet ${diff} mehr Zinsen.`,
              fr: `En commençant par le taux le plus élevé, c’est fini en ${am} mois ; en commençant par le petit solde, il faut ${sm} mois et ${diff} d’intérêts en plus.`,
              hi: `ऊँची दर पहले चुकाने पर ${am} महीने लगते हैं; छोटी रकम पहले चुकाने पर ${sm} महीने और ${diff} ज़्यादा ब्याज।`,
              'zh-hans': `先还利率高的那笔要 ${am} 个月；先还余额小的那笔要 ${sm} 个月，多付 ${diff} 利息。`,
              'zh-hant': `先還利率高的那筆要 ${am} 個月；先還餘額小的那筆要 ${sm} 個月，多付 ${diff} 利息。`,
            },
            tone: 'warn',
          }
        : {
            ko: `이 두 빚은 잔액이 작은 쪽이 곧 이율이 높은 쪽이어서 두 순서가 같습니다 — ${am}개월, 이자 ${out[3].value}입니다.`,
            en: `Here the smaller balance is also the higher rate, so both orders are the same route: ${am} months and ${out[3].value} of interest.`,
            l10n: {
              es: `Aquí el saldo menor es también el tipo más alto, así que los dos órdenes coinciden: ${am} meses y ${out[3].value} de intereses.`,
              'pt-br': `Aqui o saldo menor também é a taxa mais alta, então as duas ordens coincidem: ${am} meses e ${out[3].value} de juros.`,
              ja: `この2件は残高の小さい方が金利も高いため、どちらの順序も同じです — ${am}か月、利息${out[3].value}です。`,
              de: `Hier ist der kleinere Saldo auch der höhere Zins, beide Reihenfolgen sind identisch: ${am} Monate und ${out[3].value} Zinsen.`,
              fr: `Ici le petit solde porte aussi le taux le plus élevé : les deux ordres se confondent — ${am} mois et ${out[3].value} d’intérêts.`,
              hi: `यहाँ छोटी रकम पर ही ऊँची दर है, इसलिए दोनों क्रम एक जैसे हैं — ${am} महीने और ${out[3].value} ब्याज।`,
              'zh-hans': `这里余额小的那笔利率也最高，两种顺序其实相同：${am} 个月，利息 ${out[3].value}。`,
              'zh-hant': `這裡餘額小的那筆利率也最高，兩種順序其實相同：${am} 個月，利息 ${out[3].value}。`,
            },
            tone: 'good',
          };
    },
    ko: { title: '눈덩이 vs 눈사태 상환 계산기', desc: '두 빚을 어느 순서로 갚을 때 더 빨리 끝나고 이자가 얼마나 갈리는지 봅니다.',
      long: '갚을 돈이 정해져 있을 때 순서만 바꿔 봅니다. 눈사태(avalanche)는 이율이 높은 것부터, 눈덩이(snowball)는 잔액이 작은 것부터입니다. 잔액 300만을 연 7%로, 800만을 연 19%로 지고 매달 60만을 갚는다면 눈사태는 22개월에 이자 1,426,801이고, 눈덩이는 23개월에 이자 2,010,110입니다 — 순서만으로 이자가 약 58만 갈립니다. 눈사태가 이자에서 지는 일은 없습니다. 눈덩이가 팔리는 이유는 작은 빚이 먼저 사라지는 것이 눈에 보인다는 점입니다.',
      note: '빚 두 개까지만 다룹니다. 셋 이상이면 순서 조합이 늘어 결과가 달라집니다. 대상이 아닌 빚은 이자만 내어 잔액을 유지한다고 보았습니다 — 최소상환액이 이자보다 크면 실제로는 더 빨리 끝나고, 이자에도 못 미치면 잔액이 늘어납니다. 중도상환 수수료, 연체 기록, 카드 이율이 도중에 바뀌는 일은 들어 있지 않습니다.' },
    en: { title: 'Debt Snowball vs Avalanche Calculator', desc: 'Which order clears two debts faster, and how much interest the choice costs.',
      long: 'With the monthly payment fixed, only the order changes. Avalanche attacks the highest rate first; snowball attacks the smallest balance first. Carrying 3,000,000 at 7% and 8,000,000 at 19% while paying 600,000 a month, avalanche finishes in 22 months with 1,426,801 of interest, snowball in 23 months with 2,010,110 — some 583,000 of interest riding on the order alone. Avalanche never loses on interest. Snowball sells itself on something else: a debt visibly disappearing early.',
      note: 'Two debts only. With three or more the number of orderings grows and the result shifts. The debt not being attacked is assumed to be serviced at interest-only, so its balance holds — where the minimum payment exceeds the interest it really finishes sooner, and where it falls short the balance grows. Prepayment penalties, missed-payment records and rates that change mid-course are not in here.' },
  },
  {
    slug: 'credit-utilisation',
    icon: '💳',
    category: '금융·이자',
    fields: [
      { key: 'balance', term: 'cardBalance', unit: 'money', def: 2400000, min: 0 },
      { key: 'limit', term: 'cardLimit', unit: 'money', def: 6000000, min: 0 },
      { key: 'target', term: 'targetUtil', unit: 'percent', def: 30, min: 1, max: 100, step: 1 },
    ],
    formula: '{utilisation} = {cardBalance} ÷ {cardLimit} × 100,  {balanceAtTarget} = {cardLimit} × {targetUtil} ÷ 100',
    compute: v => {
      const atTarget = v.limit * (v.target / 100);
      return [
        { term: 'utilisation', unit: 'percent', value: round(ratio(v.balance, v.limit) * 100, 1), digits: 1, primary: true },
        { term: 'balanceAtTarget', unit: 'money', value: Math.round(atTarget), digits: 0 },
        { term: 'payDown', unit: 'money', value: Math.round(Math.max(0, v.balance - atTarget)), digits: 0 },
        { term: 'limitNeeded', unit: 'money', value: Math.round(ratio(v.balance, v.target / 100)), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      if (v.limit <= 0) return null;
      const u = out[0].value;
      return u <= v.target
        ? {
            ko: `한도 사용률 ${u}%로 목표 ${v.target}% 안쪽입니다.`,
            en: `Utilisation is ${u}%, inside the ${v.target}% target.`,
            l10n: {
              es: `El uso del crédito es del ${u} %, dentro del objetivo del ${v.target} %.`,
              'pt-br': `A utilização é de ${u} %, dentro da meta de ${v.target} %.`,
              ja: `利用率は${u}%で、目標の${v.target}%の内側です。`,
              de: `Die Ausnutzung liegt bei ${u} % und damit unter dem Ziel von ${v.target} %.`,
              fr: `Le taux d’utilisation est de ${u} %, sous l’objectif de ${v.target} %.`,
              hi: `उपयोग दर ${u}% है, जो ${v.target}% के लक्ष्य के भीतर है।`,
              'zh-hans': `额度使用率为 ${u}%，在 ${v.target}% 的目标以内。`,
              'zh-hant': `額度使用率為 ${u}%，在 ${v.target}% 的目標以內。`,
            },
            tone: 'good',
          }
        : {
            ko: `한도 사용률 ${u}%로 목표 ${v.target}%를 넘습니다. 잔액을 ${out[1].value}까지 내리려면 ${out[2].value}을 갚거나, 한도가 ${out[3].value}이어야 합니다.`,
            en: `Utilisation is ${u}%, over the ${v.target}% target. Getting the balance to ${out[1].value} means paying down ${out[2].value}, or holding a limit of ${out[3].value}.`,
            l10n: {
              es: `El uso del crédito es del ${u} %, por encima del objetivo del ${v.target} %. Para bajar el saldo a ${out[1].value} hay que amortizar ${out[2].value}, o tener un límite de ${out[3].value}.`,
              'pt-br': `A utilização é de ${u} %, acima da meta de ${v.target} %. Para levar o saldo a ${out[1].value} é preciso abater ${out[2].value}, ou ter um limite de ${out[3].value}.`,
              ja: `利用率は${u}%で、目標の${v.target}%を超えています。残高を${out[1].value}まで下げるには${out[2].value}を返すか、限度額が${out[3].value}である必要があります。`,
              de: `Die Ausnutzung liegt bei ${u} % und damit über dem Ziel von ${v.target} %. Für einen Saldo von ${out[1].value} müssten ${out[2].value} zurückgezahlt werden — oder das Limit ${out[3].value} betragen.`,
              fr: `Le taux d’utilisation est de ${u} %, au-dessus de l’objectif de ${v.target} %. Pour ramener le solde à ${out[1].value}, il faut rembourser ${out[2].value}, ou disposer d’un plafond de ${out[3].value}.`,
              hi: `उपयोग दर ${u}% है, ${v.target}% के लक्ष्य से ऊपर। शेष को ${out[1].value} तक लाने के लिए ${out[2].value} चुकाना होगा, या सीमा ${out[3].value} चाहिए।`,
              'zh-hans': `额度使用率为 ${u}%，超过 ${v.target}% 的目标。要把余额降到 ${out[1].value}，需还掉 ${out[2].value}，或者额度达到 ${out[3].value}。`,
              'zh-hant': `額度使用率為 ${u}%，超過 ${v.target}% 的目標。要把餘額降到 ${out[1].value}，需還掉 ${out[2].value}，或者額度達到 ${out[3].value}。`,
            },
            tone: 'warn',
          };
    },
    ko: { title: '한도 사용률 계산기', desc: '쓴 금액과 한도로 사용률을 구하고, 목표 사용률에 닿는 잔액과 갚을 금액을 봅니다.',
      long: '쓴 금액을 한도로 나눕니다. 한도 600만에 240만을 썼다면 40%입니다. 목표를 30%로 두면 잔액은 180만이어야 하므로 60만을 갚아야 하고, 갚지 않고 맞추려면 한도가 800만이어야 합니다. 잔액이 그대로일 때 한도가 늘면 사용률이 내려간다는 점이 이 비율의 특징입니다 — 빚은 한 푼도 줄지 않았는데 숫자는 좋아집니다.',
      note: '보통 카드별 사용률과 전체 사용률을 함께 봅니다. 한 장에 몰아 쓰면 전체는 낮아도 그 한 장이 높게 나옵니다. 더 큰 함정은 시점입니다 — 사용률은 결제일이 아니라 명세서 마감일의 잔액으로 잡히는 경우가 많아, 마감 뒤에 갚으면 이번 달 기록에는 높은 값이 남습니다. 신용평가에서 이 비율을 어떻게 쓰는지는 나라와 평가기관마다 다르고, 기준선도 제각각입니다. 여기서 나오는 것은 비율일 뿐입니다.' },
    en: { title: 'Credit Utilisation Calculator', desc: 'Utilisation from balances and limits, plus the balance and paydown a target implies.',
      long: 'Divide what you have used by the limit. 2,400,000 against a 6,000,000 limit is 40%. Set the target at 30% and the balance has to be 1,800,000, so 600,000 comes off; leave the balance alone and it would take a limit of 8,000,000 instead. That is the character of this ratio: raising the limit lowers it without a unit of debt being repaid.',
      note: 'Per-card and overall utilisation are usually read together — pile everything on one card and the overall figure stays low while that card reads high. Timing is the bigger trap: utilisation is often captured from the statement-date balance rather than the due date, so paying after the statement cuts leaves a high number on this month\'s record. How scoring models use the ratio, and where any threshold sits, differs by country and bureau. What this page gives you is the ratio.' },
  },
  {
    slug: 'mortgage-overpayment',
    icon: '🏠',
    category: '금융·이자',
    fields: [
      { key: 'balance', term: 'principal', unit: 'money', def: 200000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4.5, min: 0, max: 30, step: 0.01 },
      { key: 'years', term: 'years', unit: 'year', def: 30, min: 1, max: 50 },
      { key: 'extra', term: 'extraMonthly', unit: 'money', def: 200000, min: 0 },
    ],
    formula: '{newMonths} = −ln(1 − {principal} × r ÷ ({monthlyPay} + {extraMonthly})) ÷ ln(1 + r),  r = {annualRate} ÷ 1200',
    compute: v => {
      const n = v.years * 12;
      const r = v.rate / 100 / 12;
      const base = monthlyPayment(v.balance, v.rate, n);
      const boosted = base + v.extra;
      // 이자보다 적게 내면 원금이 줄지 않는다 — 기간을 그대로 둔다
      const shorter =
        r === 0
          ? ratio(v.balance, boosted)
          : boosted > v.balance * r
            ? -Math.log(1 - ratio(v.balance * r, boosted)) / Math.log(1 + r)
            : n;
      const capped = Math.min(n, shorter);
      return [
        { term: 'monthsSaved', unit: 'month', value: round(Math.max(0, n - capped), 1), digits: 1, primary: true },
        { term: 'savedInterest', unit: 'money', value: Math.round(Math.max(0, base * n - (boosted * capped))), digits: 0 },
        { term: 'newMonths', unit: 'month', value: round(capped, 1), digits: 1 },
        { term: 'monthlyPay', unit: 'money', value: Math.round(base), digits: 0 },
      ];
    },
    ko: { title: '주택담보대출 추가 상환 계산기', desc: '매달 얼마를 더 넣으면 기간이 몇 개월 줄고 이자가 얼마 줄어드는지 구합니다.',
      long: '월 상환액을 늘리면 늘어난 만큼이 전부 원금으로 들어가 기간이 짧아집니다. 2억을 연 4.5%로 30년 갚으면 월 1,013,371입니다. 여기에 매달 20만을 더 넣으면 상환 기간이 360개월에서 257.2개월로 줄어 102.8개월, 약 8.6년이 빠집니다. 이자는 164,813,423에서 112,057,568로 내려가 52,755,855을 아낍니다 — 추가로 넣은 원금은 20만 × 257.2 = 51,440,000이니, 넣은 돈보다 아낀 이자가 큽니다.',
      note: '기간이 줄어드는 방식이지 월 상환액이 줄어드는 방식이 아닙니다. 같은 돈으로 월 상환액을 낮추는 재약정과는 다른 결과가 나옵니다. 중도상환 수수료가 붙는 기간이 남아 있으면 아끼는 이자에서 그만큼을 빼야 하고, 변동금리라면 금리가 오르는 순간 이 표가 다시 그려집니다. 원금을 미리 줄이는 대신 그 돈을 다른 곳에 넣는 선택은 여기서 다루지 않습니다 — 이 계산은 대출 이자만 봅니다.' },
    en: { title: 'Mortgage Overpayment Calculator', desc: 'How many months and how much interest an extra monthly payment removes.',
      long: 'Every unit added to the payment goes straight to principal, so the term shortens. 200,000,000 over thirty years at 4.5% costs 1,013,371 a month. Add 200,000 to that and the term falls from 360 months to 257.2 — 102.8 months, about 8.6 years, gone. Interest drops from 164,813,423 to 112,057,568, saving 52,755,855, against 200,000 × 257.2 = 51,440,000 of extra principal put in.',
      note: 'This shortens the term; it does not cut the monthly payment. Recasting the loan with the same money to lower the payment gives a different answer. If an early-repayment penalty period is still running, take that off the interest saved, and on a variable rate the whole table is redrawn the moment the rate moves. Whether the money would do more elsewhere is outside this page — it looks only at loan interest.' },
  },
  {
    slug: 'lease-vs-buy',
    icon: '🔑',
    category: '할인·가격',
    fields: [
      { key: 'leaseMonthly', term: 'leaseMonthly', unit: 'money', def: 450000, min: 0 },
      { key: 'months', term: 'months', unit: 'month', def: 36, min: 1, max: 120 },
      { key: 'upfront', term: 'leaseUpfront', unit: 'money', def: 3000000, min: 0 },
      { key: 'price', term: 'buyPrice', unit: 'money', def: 30000000, min: 0 },
      { key: 'resale', term: 'salvageValue', unit: 'money', def: 18000000, min: 0 },
    ],
    formula: '{leaseTotal} = {leaseUpfront} + {leaseMonthly} × {months},  {buyTotal} = {buyPrice} − {salvageValue}',
    compute: v => {
      const lease = v.upfront + v.leaseMonthly * v.months;
      const buy = v.price - v.resale;
      return [
        { term: 'diff', unit: 'money', value: Math.round(lease - buy), digits: 0, primary: true },
        { term: 'leaseTotal', unit: 'money', value: Math.round(lease), digits: 0 },
        { term: 'buyTotal', unit: 'money', value: Math.round(buy), digits: 0 },
        { term: 'buyPerMonth', unit: 'money', value: Math.round(ratio(buy, v.months)), digits: 0 },
      ];
    },
    ko: { title: '리스 vs 구매 총비용 계산기', desc: '같은 기간을 리스로 쓸 때와 사서 되팔 때의 총비용을 나란히 놓습니다.',
      long: '리스는 초기비용에 월 리스료 × 개월을 더한 값이 전부 나가는 돈입니다. 사는 쪽은 값을 다 치르지만 기간이 끝나고 되팔아 일부를 돌려받으므로, 실제로 쓴 돈은 구매가 − 되팔 값입니다. 초기 300만에 월 45만으로 36개월 리스하면 1,920만이고, 3,000만에 사서 1,800만에 팔면 1,200만입니다 — 사는 쪽이 720만 적습니다. 월로 환산하면 리스 533,333, 구매 333,333입니다.',
      note: '돈이 나가는 시점을 무시한 단순 합계입니다. 구매는 3,000만을 지금 내고, 리스는 36개월에 걸쳐 나눠 내므로 같은 총액이라도 부담이 다릅니다. 대출로 산다면 이자를 구매가 쪽에 더해야 합니다. 되팔 값은 가정이고, 이 한 칸이 결론을 뒤집을 만큼 크게 움직입니다 — 1,080만이 되면 두 쪽이 같아집니다. 리스에 들어 있는 정비·보험, 주행거리 초과 요금, 반납 시 수리비도 이 계산에는 없습니다.' },
    en: { title: 'Lease vs Buy Calculator', desc: 'Total cost of leasing for a term against buying and reselling at the end.',
      long: 'Leasing costs the upfront amount plus the monthly figure times the months — all of it gone. Buying pays the full price but hands some back at resale, so the real outlay is price minus resale. 3,000,000 upfront plus 450,000 a month for 36 months is 19,200,000; buying at 30,000,000 and selling at 18,000,000 is 12,000,000 — 7,200,000 less. Per month that is 533,333 leasing against 333,333 buying.',
      note: 'It is a plain total that ignores when the money leaves. Buying pays 30,000,000 today while the lease spreads over 36 months, so the same total is not the same burden. Finance the purchase and the interest belongs on the buying side. The resale figure is an assumption, and that one field swings the conclusion — at 10,800,000 the two sides meet. Maintenance and insurance bundled into a lease, mileage overage charges and end-of-term repair bills are all outside this arithmetic.' },
  },
  {
    slug: 'budget-50-30-20',
    icon: '🧾',
    category: '금융·이자',
    fields: [
      { key: 'income', term: 'netPay', unit: 'money', def: 3500000, min: 0 },
      { key: 'needs', term: 'needsSpend', unit: 'money', def: 2100000, min: 0 },
      { key: 'wants', term: 'wantsSpend', unit: 'money', def: 900000, min: 0 },
    ],
    formula: '{needsCap} = {netPay} × 0.5,  {wantsCap} = {netPay} × 0.3,  {saveTarget} = {netPay} × 0.2',
    compute: v => [
      { term: 'savingsLeft', unit: 'money', value: Math.round(v.income - v.needs - v.wants), digits: 0, primary: true },
      { term: 'needsCap', unit: 'money', value: Math.round(v.income * 0.5), digits: 0 },
      { term: 'wantsCap', unit: 'money', value: Math.round(v.income * 0.3), digits: 0 },
      { term: 'saveTarget', unit: 'money', value: Math.round(v.income * 0.2), digits: 0 },
    ],
    verdict: (v, out) => {
      if (v.income <= 0) return null;
      const left = out[0].value;
      const target = out[3].value;
      const rate = round(ratio(left, v.income) * 100, 1);
      return left >= target
        ? {
            ko: `실수령액의 ${rate}%가 남아 20% 몫 ${target}을 채웁니다.`,
            en: `${rate}% of take-home pay is left, meeting the 20% share of ${target}.`,
            l10n: {
              es: `Queda el ${rate} % del sueldo neto, cumpliendo la parte del 20 % de ${target}.`,
              'pt-br': `Sobra ${rate} % do líquido, cumprindo a fatia de 20 % de ${target}.`,
              ja: `手取りの${rate}%が残り、20%の枠${target}を満たしています。`,
              de: `${rate} % des Netto bleiben übrig und erfüllen den 20-%-Anteil von ${target}.`,
              fr: `Il reste ${rate} % du net, ce qui atteint la part de 20 % soit ${target}.`,
              hi: `हाथ में आई रकम का ${rate}% बचता है, जो ${target} के 20% हिस्से को पूरा करता है।`,
              'zh-hans': `实收收入还剩 ${rate}%，达到了 ${target} 的 20% 份额。`,
              'zh-hant': `實收收入還剩 ${rate}%，達到了 ${target} 的 20% 份額。`,
            },
            tone: 'good',
          }
        : {
            ko: `남는 돈이 실수령액의 ${rate}%로 20% 몫 ${target}에 ${Math.round(target - left)} 모자랍니다. 필수 한도는 ${out[1].value}, 여유 한도는 ${out[2].value}입니다.`,
            en: `What is left is ${rate}% of take-home pay, ${Math.round(target - left)} short of the 20% share of ${target}. The needs cap is ${out[1].value}, the wants cap ${out[2].value}.`,
            l10n: {
              es: `Lo que queda es el ${rate} % del neto, ${Math.round(target - left)} por debajo de la parte del 20 % (${target}). El tope de necesidades es ${out[1].value} y el de gustos ${out[2].value}.`,
              'pt-br': `O que sobra é ${rate} % do líquido, ${Math.round(target - left)} abaixo da fatia de 20 % (${target}). O teto das necessidades é ${out[1].value} e o dos desejos ${out[2].value}.`,
              ja: `残るお金は手取りの${rate}%で、20%の枠${target}に${Math.round(target - left)}足りません。必須の上限は${out[1].value}、ゆとりの上限は${out[2].value}です。`,
              de: `Übrig bleiben ${rate} % des Netto, ${Math.round(target - left)} unter dem 20-%-Anteil von ${target}. Die Grenze für Nötiges liegt bei ${out[1].value}, für Wünsche bei ${out[2].value}.`,
              fr: `Il reste ${rate} % du net, soit ${Math.round(target - left)} en dessous de la part de 20 % (${target}). Le plafond des besoins est ${out[1].value}, celui des envies ${out[2].value}.`,
              hi: `बचत हाथ में आई रकम की ${rate}% है, ${target} के 20% हिस्से से ${Math.round(target - left)} कम। ज़रूरतों की सीमा ${out[1].value} और शौक की ${out[2].value} है।`,
              'zh-hans': `剩下的是实收收入的 ${rate}%，比 ${target} 的 20% 份额少 ${Math.round(target - left)}。必需上限为 ${out[1].value}，想要上限为 ${out[2].value}。`,
              'zh-hant': `剩下的是實收收入的 ${rate}%，比 ${target} 的 20% 份額少 ${Math.round(target - left)}。必需上限為 ${out[1].value}，想要上限為 ${out[2].value}。`,
            },
            tone: 'warn',
          };
    },
    ko: { title: '50·30·20 예산 계산기', desc: '실수령액을 필수 50%·여유 30%·저축 20%로 갈라 실제 지출과 견줍니다.',
      long: '실수령액을 절반·30%·20%로 나눕니다. 350만이면 필수 175만, 여유 105만, 저축 70만입니다. 필수에 210만, 여유에 90만을 쓰고 있다면 남는 돈은 50만으로 20% 몫 70만에 20만 모자랍니다. 여유가 15만 남아 있는데도 모자란 이유는 필수 쪽이 한도를 35만 넘겼기 때문입니다 — 어느 칸이 새는지가 이 계산의 요점입니다. 세 몫은 2005년 엘리자베스 워런과 어밀리아 워런 티아기의 『All Your Worth』에서 나온 배분입니다.',
      note: '세후 소득으로 나눕니다 — 세전으로 넣으면 세 한도가 전부 실제보다 커집니다. 무엇이 필수인지는 정해져 있지 않습니다. 통신비·자동차·보험을 어느 칸에 넣느냐로 결과가 바뀌고, 빚은 이자와 최소상환액이 필수, 그보다 더 갚는 원금은 저축 쪽으로 세는 것이 원래 배분입니다. 임대료만으로 소득의 40%가 나가는 도시에서는 필수 50%가 애초에 들어가지 않으므로, 이 셋은 목표가 아니라 어디가 눌려 있는지 보는 자로 읽는 편이 맞습니다.' },
    en: { title: '50/30/20 Budget Calculator', desc: 'Split take-home pay into 50% needs, 30% wants and 20% saving, and compare with what you actually spend.',
      long: 'Halve take-home pay, then take 30% and 20%. On 3,500,000 that is 1,750,000 for needs, 1,050,000 for wants and 700,000 to save. Spending 2,100,000 on needs and 900,000 on wants leaves 500,000 — 200,000 short of the 700,000 share. Wants are 150,000 under their cap, so the shortfall comes from needs running 350,000 over: finding which bucket leaks is the point of the exercise. The three shares come from Elizabeth Warren and Amelia Warren Tyagi\'s All Your Worth (2005).',
      note: 'Divide after-tax income — use gross and all three caps come out too generous. What counts as a need is not settled: filing a phone plan, a car or insurance differently changes the answer, and in the original split debt interest and minimum payments are needs while principal paid above the minimum counts as saving. In a city where rent alone takes 40% of pay, 50% for needs cannot fit, so read the three shares as a gauge of what is squeezed rather than as a target.' },
  },
  {
    slug: 'salary-vs-hourly',
    icon: '⏱️',
    category: '세금·정산',
    fields: [
      { key: 'salary', term: 'annualSalary', unit: 'money', def: 60000000, min: 0 },
      { key: 'benefit', term: 'benefitPct', unit: 'percent', def: 18, min: 0, max: 100, step: 0.1 },
      { key: 'paidHours', term: 'salaryHoursYear', unit: 'hour', def: 2080, min: 0, max: 4000 },
      { key: 'hourly', term: 'hourlyOffer', unit: 'money', def: 45000, min: 0 },
      { key: 'billable', term: 'billableYear', unit: 'hour', def: 1500, min: 0, max: 4000 },
    ],
    formula: '{hourlyToMatch} = {annualSalary} × (1 + {benefitPct} ÷ 100) ÷ {billableYear}',
    compute: v => {
      const pkg = v.salary * (1 + v.benefit / 100);
      return [
        { term: 'hourlyToMatch', unit: 'money', value: Math.round(ratio(pkg, v.billable)), digits: 0, primary: true },
        { term: 'salaryHourly', unit: 'money', value: Math.round(ratio(pkg, v.paidHours)), digits: 0 },
        { term: 'contractorAnnual', unit: 'money', value: Math.round(v.hourly * v.billable), digits: 0 },
        { term: 'packageGap', unit: 'money', value: Math.round(v.hourly * v.billable - pkg), digits: 0 },
      ];
    },
    ko: { title: '연봉 vs 시급 비교 계산기', desc: '복리후생을 얹은 연봉을 청구 가능한 시간으로 나눠, 맞먹는 시급을 구합니다.',
      long: '두 제안을 같은 자로 재려면 분모를 맞춰야 합니다. 연봉 6,000만에 복리후생 18%를 얹으면 실제 보수는 7,080만입니다. 연 유급 시간 2,080시간으로 나누면 시간당 34,038이지만, 이 값을 시급 제안과 바로 견주면 안 됩니다 — 프리랜서는 2,080시간을 청구하지 못합니다. 청구 가능한 시간이 1,500시간이라면 7,080만을 1,500으로 나눈 47,200이 맞먹는 시급입니다. 제안받은 시급이 45,000이면 연 6,750만이라 330만이 모자랍니다.',
      note: '복리후생 비율에 무엇을 넣었는지가 결과를 정합니다 — 회사가 대신 내는 사회보험료, 퇴직급여, 유급휴가, 보험, 장비를 넣으면 15~30%가 흔합니다. 청구 시간은 근무 시간이 아닙니다. 주 40시간 가운데 실제로 청구되는 것은 보통 20~30시간이고, 여기에 휴가와 일이 끊기는 기간이 더 빠집니다. 세금은 양쪽 다 세전으로 두었습니다 — 고용 형태에 따라 세금과 공제가 달라지는 부분은 이 계산에 없습니다. 목표 소득에서 거꾸로 시급을 구하려면 프리랜서 시급 계산기 쪽입니다.' },
    en: { title: 'Salary vs Hourly Rate Calculator', desc: 'Turn a salary plus benefits into the hourly rate that matches it at your billable hours.',
      long: 'To compare two offers you have to match the denominators. A 60,000,000 salary with 18% of benefits is a 70,800,000 package. Divided by 2,080 paid hours a year that is 34,038 an hour — but do not hold that against an hourly offer, because a contractor cannot bill 2,080 hours. At 1,500 billable hours, 70,800,000 over 1,500 gives 47,200 as the matching rate. An offer of 45,000 an hour is 67,500,000 a year, 3,300,000 short.',
      note: 'What you count in the benefits percentage decides the answer — employer social contributions, retirement, paid leave, insurance and equipment together commonly land between 15% and 30%. Billable hours are not working hours: 20 to 30 of a 40-hour week is typical, before holidays and gaps between contracts come out. Both sides are kept before tax here, so differences in how the two employment forms are taxed and deducted are not in it. To go the other way — from a target income to a rate — use the freelance hourly rate page.' },
  },
  {
    slug: 'real-return-after-tax',
    icon: '🛡️',
    category: '세금·정산',
    fields: [
      { key: 'nominal', term: 'nominalRate', unit: 'percent', def: 6, min: 0, max: 60, step: 0.1 },
      { key: 'tax', term: 'taxRate', unit: 'percent', def: 20, min: 0, max: 60, step: 0.1 },
      { key: 'inflation', term: 'inflation', unit: 'percent', def: 2.5, min: 0, max: 40, step: 0.1 },
    ],
    formula: '{realRate} = ((1 + {afterTaxRate} ÷ 100) ÷ (1 + {inflation} ÷ 100) − 1) × 100',
    compute: v => {
      const afterTax = v.nominal * (1 - v.tax / 100);
      const real = (1 + afterTax / 100) / (1 + v.inflation / 100) - 1;
      return [
        { term: 'realRate', unit: 'percent', value: round(real * 100, 3), digits: 3, primary: true },
        { term: 'afterTaxRate', unit: 'percent', value: round(afterTax, 3), digits: 3 },
        // 실질 수익률이 0 이하면 두 배가 되는 날이 오지 않는다
        { term: 'doubleYears', unit: 'year', value: real > 0 ? round(Math.log(2) / Math.log(1 + real), 1) : 0, digits: 1 },
      ];
    },
    ko: { title: '세후 실질 수익률 계산기', desc: '명목 수익률에서 세금을 떼고 물가까지 반영해 실제로 늘어난 구매력을 구합니다.',
      long: '순서가 있습니다. 먼저 세금을 떼고, 그 다음 물가로 나눕니다. 연 6%에 세율 20%면 세후 4.8%이고, 물가 2.5%로 나누면 1.048 ÷ 1.025 − 1 = 2.244%입니다. 4.8에서 2.5를 그냥 뺀 2.3%보다 조금 낮은데, 물가가 원금뿐 아니라 이자에도 붙기 때문입니다. 이 2.244%로는 구매력이 두 배 되는 데 31.2년이 걸립니다.',
      note: '세금을 물가보다 먼저 떼는 것이 중요합니다. 순서를 바꾸면 답이 달라집니다. 세율 자리에 이자·배당에 붙는 세율을 넣어야 하고, 나라에 따라 원금이 아니라 명목 이자 전체에 세금이 붙으므로 물가만큼 오른 부분에도 세금을 냅니다 — 물가가 높은 시기에 실질 수익률이 마이너스가 되는 흔한 이유입니다. 물가를 반영만 하고 세금은 다루지 않는 계산은 실질 이자율 쪽에 있습니다.' },
    en: { title: 'Real Return After Tax Calculator', desc: 'Strip tax from a nominal return, then inflation, to see what purchasing power actually gained.',
      long: 'The order matters: take tax off first, then divide by inflation. 6% taxed at 20% is 4.8% after tax, and against 2.5% inflation that is 1.048 ÷ 1.025 − 1 = 2.244%. Simply subtracting gives 2.3%, slightly higher, because inflation eats the interest as well as the principal. At 2.244%, purchasing power takes 31.2 years to double.',
      note: 'Taking tax before inflation is the part people reverse, and reversing it changes the answer. Put the rate that applies to interest or dividends in the tax field; in many countries tax falls on the whole nominal return, so you are taxed on the part that merely kept pace with prices — the usual reason real returns go negative when inflation runs high. For inflation alone with no tax step, use the real interest rate page.' },
  },
  {
    slug: 'pension-contribution-gap',
    icon: '🏦',
    category: '금융·이자',
    fields: [
      { key: 'income', term: 'targetRetireIncome', unit: 'money', def: 36000000, min: 0 },
      { key: 'draw', term: 'withdrawRate', unit: 'percent', def: 4, min: 0.1, max: 20, step: 0.1 },
      { key: 'saved', term: 'savedSoFar', unit: 'money', def: 80000000, min: 0 },
      { key: 'years', term: 'years', unit: 'year', def: 25, min: 0, max: 60 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 5, min: 0, max: 20, step: 0.1 },
    ],
    formula: '{potNeeded} = {targetRetireIncome} ÷ ({withdrawRate} ÷ 100),  {neededMonthly} = {gapAmount} × i ÷ ((1 + i) ^ n − 1),  i = {annualRate} ÷ 1200,  n = {years} × 12',
    compute: v => {
      const pot = ratio(v.income, v.draw / 100);
      const grown = v.saved * Math.pow(1 + v.rate / 100, v.years);
      const gap = Math.max(0, pot - grown);
      const i = v.rate / 100 / 12;
      const n = v.years * 12;
      const factor = i === 0 ? n : (Math.pow(1 + i, n) - 1) / i;
      return [
        { term: 'neededMonthly', unit: 'money', value: Math.round(ratio(gap, factor)), digits: 0, primary: true },
        { term: 'potNeeded', unit: 'money', value: Math.round(pot), digits: 0 },
        { term: 'savedGrown', unit: 'money', value: Math.round(grown), digits: 0 },
        { term: 'gapAmount', unit: 'money', value: Math.round(gap), digits: 0 },
      ];
    },
    ko: { title: '은퇴 적립 부족액 계산기', desc: '목표 은퇴소득에 필요한 자산과 지금 자산의 차이를 메우는 월 적립액을 구합니다.',
      long: '세 단계입니다. 먼저 목표 연 소득을 인출률로 나눠 필요 자산을 구합니다 — 3,600만을 4%로 나눈 9억입니다. 다음으로 지금 있는 8,000만이 연 5%로 25년 자라 2억 7,090만이 되니, 모자란 금액은 6억 2,909만입니다. 마지막으로 매달 넣는 돈이 같은 5%로 300개월 쌓인다고 보면 적립계수는 595.51이므로, 6억 2,909만 ÷ 595.51 = 매달 1,056,392입니다.',
      note: '수익률이 해마다 똑같다고 봅니다. 실제 시장은 오르내리고, 은퇴 직전 몇 년의 하락이 같은 평균 수익률에서도 결과를 크게 갈라놓습니다. 세금·수수료·회사가 대신 넣는 금액·이미 받게 될 공적연금은 들어 있지 않습니다. 목표 소득에 물가를 반영하지 않았으므로, 지금 돈으로 목표를 넣고 수익률 자리에는 물가를 뺀 실질 수익률을 넣으세요 — 명목 수익률을 그대로 넣으면 25년 뒤 구매력 기준으로 목표가 작아집니다. 4%라는 인출률 자체가 특정 시장·특정 기간을 검증한 한 연구의 결과입니다.' },
    en: { title: 'Pension Contribution Gap Calculator', desc: 'The monthly contribution that closes the gap between the pot your target retirement income needs and what you have.',
      long: 'Three steps. Divide the target yearly income by the withdrawal rate for the pot needed: 36,000,000 at 4% is 900,000,000. Then grow what you already have — 80,000,000 at 5% for 25 years becomes 270,908,395 — leaving a shortfall of 629,091,605. Finally, monthly contributions compounding at the same 5% for 300 months carry an accumulation factor of 595.51, so 629,091,605 ÷ 595.51 is 1,056,392 a month.',
      note: 'The return is held constant year after year. Real markets swing, and a fall in the last few years before retirement splits outcomes widely at the same average return. Tax, fees, employer contributions and any state pension already due are not in here. The target income is not inflated either, so enter it in today\'s money and put a real, above-inflation return in the rate field — a nominal return shrinks the target in purchasing-power terms over 25 years. The 4% withdrawal rate is itself the result of one study on one market over one horizon.' },
  },
];
