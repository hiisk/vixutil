/** 비율 섹션 - 금융·이자 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const FINANCE_TOOLS: FormulaTool[] = [
  {
    slug: 'simple-interest',
    icon: '💰',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 10000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 3.5, min: 0, step: 0.1 },
      { key: 'years', term: 'years', unit: 'year', def: 3, min: 0, step: 0.5 },
    ],
    formula: '{interest} = {principal} × {annualRate} ÷ 100 × {years}',
    compute: v => {
      const interest = v.principal * (v.rate / 100) * v.years;
      return [
        { term: 'maturity', unit: 'money', value: Math.round(v.principal + interest), digits: 0, primary: true },
        { term: 'interest', unit: 'money', value: Math.round(interest), digits: 0 },
      ];
    },
    ko: { title: '단리 이자 계산기', desc: '원금에만 이자가 붙는 방식으로 만기 금액을 구합니다.',
      long: '단리는 이자가 원금에만 붙습니다. 매년 같은 금액이 쌓이므로 기간을 그냥 곱하면 됩니다.',
      note: '예금 대부분은 단리, 적립식 상품과 대출은 복리에 가깝습니다. 상품 설명의 이자 계산 방식을 확인하세요.' },
    en: { title: 'Simple Interest', desc: 'Find the final amount when interest is paid on the principal only.',
      long: 'With simple interest only the principal earns, so the same amount accrues every year and you just multiply by the term.',
      note: 'Most term deposits are simple; instalment products and loans behave closer to compound. Check the product terms.' },
  },
  {
    slug: 'compound-interest',
    icon: '📈',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 10000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 6, min: 0, step: 0.1 },
      { key: 'years', term: 'years', unit: 'year', def: 10, min: 0, step: 1 },
    ],
    formula: '{maturity} = {principal} × (1 + {annualRate} ÷ 100) ^ {years}',
    compute: v => {
      const final = v.principal * (1 + v.rate / 100) ** v.years;
      return [
        { term: 'maturity', unit: 'money', value: Math.round(final), digits: 0, primary: true },
        { term: 'interest', unit: 'money', value: Math.round(final - v.principal), digits: 0 },
        { term: 'totalGrowth', unit: 'percent', value: round(ratio(final - v.principal, v.principal) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '복리 계산기', desc: '이자에 다시 이자가 붙는 방식으로 만기 금액을 구합니다.',
      long: '복리는 매년 잔액 전체에 이자가 붙습니다. 연 6%로 10년이면 원금의 1.79배가 되는데, 단리라면 1.6배에 그칩니다.',
      note: '기간이 길어질수록 단리와의 차이가 급격히 벌어집니다. 복리의 힘은 이율보다 기간에서 나옵니다.' },
    en: { title: 'Compound Interest', desc: 'Find the final amount when interest earns interest.',
      long: 'Compounding applies the rate to the whole balance each year. At 6% for 10 years you end with 1.79× the principal, where simple interest gives only 1.6×.',
      note: 'The gap over simple interest widens sharply with time — compounding gets its power from years more than from the rate.' },
  },
  {
    slug: 'monthly-saving',
    icon: '🐷',
    category: '금융·이자',
    fields: [
      { key: 'monthly', term: 'monthlyDeposit', unit: 'money', def: 500000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4, min: 0, step: 0.1 },
      { key: 'months', term: 'months', unit: 'month', def: 36, min: 1 },
    ],
    formula: '{maturity} = Σ {monthlyDeposit} × (1 + r) ^ n,  r = {annualRate} ÷ 1200',
    compute: v => {
      const r = v.rate / 100 / 12;
      // 매달 넣은 돈이 남은 개월 수만큼 이자를 받는다
      const final = r === 0
        ? v.monthly * v.months
        : v.monthly * ((1 + r) ** v.months - 1) / r * (1 + r);
      const paid = v.monthly * v.months;
      return [
        { term: 'maturity', unit: 'money', value: Math.round(final), digits: 0, primary: true },
        { term: 'totalDeposit', unit: 'money', value: Math.round(paid), digits: 0 },
        { term: 'interest', unit: 'money', value: Math.round(final - paid), digits: 0 },
      ];
    },
    ko: { title: '적금 만기 계산기', desc: '매달 같은 금액을 넣을 때 만기에 받는 금액을 구합니다.',
      long: '첫 달에 넣은 돈은 전체 기간 이자를 받지만 마지막 달 돈은 거의 못 받습니다. 그래서 적금 이자는 같은 이율 예금의 절반 정도입니다.',
      note: '표시된 이자는 세전입니다. 이자소득세 15.4%를 떼면 실제 수령액은 조금 줄어듭니다.' },
    en: { title: 'Savings Plan Maturity', desc: 'See what a fixed monthly deposit grows to by the end of the term.',
      long: 'The first deposit earns interest for the whole term while the last earns almost none, which is why an instalment plan pays roughly half what a lump-sum deposit at the same rate would.',
      note: 'The interest shown is before tax — Korean interest income tax of 15.4% reduces what you actually receive.' },
  },
  {
    slug: 'loan-payment',
    icon: '🏦',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 200000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4.5, min: 0, step: 0.1 },
      { key: 'years', term: 'years', unit: 'year', def: 30, min: 1 },
    ],
    formula: '{monthlyPay} = {principal} × r ÷ (1 − (1 + r) ^ −n),  r = {annualRate} ÷ 1200',
    compute: v => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const pay = r === 0 ? ratio(v.principal, n) : ratio(v.principal * r, 1 - (1 + r) ** -n);
      return [
        { term: 'monthlyPay', unit: 'money', value: Math.round(pay), digits: 0, primary: true },
        { term: 'interest', unit: 'money', value: Math.round(pay * n - v.principal), digits: 0 },
        { term: 'totalPaid', unit: 'money', value: Math.round(pay * n), digits: 0 },
      ];
    },
    ko: { title: '원리금균등 월 상환액', desc: '대출 원금과 이율, 기간으로 매달 갚을 금액을 구합니다.',
      long: '원리금균등은 매달 내는 총액이 같습니다. 초반에는 그중 이자 비중이 크고, 갈수록 원금 비중이 커집니다.',
      note: '2억을 연 4.5%로 30년 빌리면 총 이자가 1억 6천만 원대입니다. 기간을 줄이면 월 부담은 늘지만 총 이자는 크게 줄어듭니다.' },
    en: { title: 'Loan Monthly Payment', desc: 'Calculate the level monthly payment on a loan from amount, rate and term.',
      long: 'With an amortising loan every payment is the same size. Early on most of it is interest; over time more goes to principal.',
      note: '200M at 4.5% over 30 years costs over 160M in interest. A shorter term raises the monthly figure but cuts total interest sharply.' },
  },
  {
    slug: 'rule-of-72',
    icon: '⏳',
    category: '금융·이자',
    fields: [
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 7, min: 0.1, step: 0.1 },
    ],
    formula: '{doubleYears} ≈ 72 ÷ {annualRate}',
    compute: v => {
      const approx = ratio(72, v.rate);
      const exact = Math.log(2) / Math.log(1 + v.rate / 100);
      return [
        { term: 'doubleYears', unit: 'year', value: round(approx, 1), digits: 1, primary: true },
        { term: 'result', unit: 'year', value: round(exact, 2), digits: 2 },
      ];
    },
    ko: { title: '72의 법칙 계산기', desc: '연 몇 %로 굴리면 원금이 두 배가 되는지 암산으로 구합니다.',
      long: '72를 이율로 나누면 2배가 되는 기간이 대략 나옵니다. 연 6%면 12년, 연 9%면 8년입니다.',
      note: '이율 6~10% 구간에서 가장 정확합니다. 아래에 정확한 값을 함께 보여주니 차이를 비교해 보세요.' },
    en: { title: 'Rule of 72', desc: 'Estimate in your head how long money takes to double at a given rate.',
      long: 'Divide 72 by the rate for a quick doubling time: 12 years at 6%, 8 years at 9%.',
      note: 'The shortcut is most accurate between about 6% and 10%. The exact figure is shown alongside so you can see the gap.' },
  },
  {
    slug: 'roi',
    icon: '🎯',
    category: '금융·이자',
    fields: [
      { key: 'invested', term: 'invested', unit: 'money', def: 5000000, min: 0.01 },
      { key: 'returned', term: 'returned', unit: 'money', def: 6350000, min: 0 },
    ],
    formula: '{roi} = ({returned} − {invested}) ÷ {invested} × 100',
    compute: v => [
      { term: 'roi', unit: 'percent', value: round(ratio(v.returned - v.invested, v.invested) * 100, 2), digits: 2, primary: true },
      { term: 'profit', unit: 'money', value: Math.round(v.returned - v.invested), digits: 0 },
    ],
    verdict: (v, out) => {
      const r = out[0].value;
      return {
        ko: r >= 0 ? `투자금의 ${r}%를 벌었습니다.` : `투자금의 ${Math.abs(r)}%를 잃었습니다.`,
        en: r >= 0 ? `You gained ${r}% of what you put in.` : `You lost ${Math.abs(r)}% of what you put in.`,
        l10n: {
          es: r >= 0 ? `Has ganado el ${r} % de lo que pusiste.` : `Has perdido el ${Math.abs(r)} % de lo que pusiste.`,
          'pt-br': r >= 0 ? `Você ganhou ${r} % do que colocou.` : `Você perdeu ${Math.abs(r)} % do que colocou.`,
          ja: r >= 0 ? `投資額の${r}%を得ました。` : `投資額の${Math.abs(r)}%を失いました。`,
          de: r >= 0 ? `Du hast ${r} % deines Einsatzes gewonnen.` : `Du hast ${Math.abs(r)} % deines Einsatzes verloren.`,
          fr: r >= 0 ? `Tu as gagné ${r} % de ta mise.` : `Tu as perdu ${Math.abs(r)} % de ta mise.`,
          hi: r >= 0 ? `आपने लगाई रक़म का ${r}% कमाया।` : `आपने लगाई रक़म का ${Math.abs(r)}% गँवाया।`,
        },
        tone: r >= 0 ? 'good' : 'bad',
      };
    },
    ko: { title: '수익률 계산기', desc: '투자금과 회수금으로 수익률과 수익금을 구합니다.',
      long: '번 돈을 투자금으로 나눕니다. 회수금으로 나누면 수익률이 실제보다 작게 나옵니다.',
      note: '매매 수수료와 세금을 회수금에서 미리 빼야 실제 수익률이 됩니다.' },
    en: { title: 'ROI Calculator', desc: 'Get return on investment and profit from what you put in and got back.',
      long: 'Divide the gain by the amount invested. Dividing by the amount returned understates the return.',
      note: 'Subtract trading fees and tax from the returned amount first to get your real return.' },
  },
  {
    slug: 'annualized-return',
    icon: '📅',
    category: '금융·이자',
    fields: [
      { key: 'roi', term: 'roi', unit: 'percent', def: 8, step: 0.1 },
      { key: 'days', term: 'holdDays', def: 90, min: 1 },
    ],
    formula: '{annualized} = ((1 + {roi} ÷ 100) ^ (365 ÷ {holdDays}) − 1) × 100',
    compute: v => {
      const g = 1 + v.roi / 100;
      const ann = g > 0 ? (g ** (365 / v.days) - 1) * 100 : -100;
      return [
        { term: 'annualized', unit: 'percent', value: round(ann, 2), digits: 2, primary: true },
        { term: 'rate', unit: 'percent', value: round(v.roi * 365 / v.days, 2), digits: 2 },
      ];
    },
    ko: { title: '연환산 수익률', desc: '짧은 기간의 수익률을 1년 기준으로 환산합니다.',
      long: '90일에 8%를 벌었다면 단순 환산은 연 32.4%지만, 복리로 재투자한다고 보면 연 36.5%입니다. 아래 값이 단순 환산입니다.',
      note: '짧은 기간의 성과를 연환산하면 숫자가 과장돼 보입니다. 며칠 수익을 연 몇백 %로 부르는 광고를 조심하세요.' },
    en: { title: 'Annualised Return', desc: 'Convert a short-period return into a yearly equivalent.',
      long: 'Earning 8% in 90 days scales linearly to 32.4% a year, or 36.5% if you assume compounding. The second figure shown is the linear one.',
      note: 'Annualising a short run inflates the headline number — be wary of ads that turn a few days of gains into hundreds of percent.' },
  },
  {
    slug: 'loss-recovery',
    icon: '🔼',
    category: '금융·이자',
    fields: [
      { key: 'loss', term: 'lossRate', unit: 'percent', def: 30, min: 0, max: 99.9, step: 0.1 },
    ],
    formula: '{neededRise} = {lossRate} ÷ (100 − {lossRate}) × 100',
    compute: v => [
      { term: 'neededRise', unit: 'percent', value: round(ratio(v.loss, 100 - v.loss) * 100, 2), digits: 2, primary: true },
      { term: 'remaining', unit: 'percent', value: round(100 - v.loss, 1), digits: 1 },
    ],
    verdict: (v, out) => ({
      ko: `${v.loss}% 하락을 만회하려면 ${out[0].value}% 올라야 합니다 — 내린 만큼 오르면 본전이 아닙니다.`,
      en: `Recovering a ${v.loss}% drop takes a ${out[0].value}% rise — gaining back the same percentage is not enough.`,
      l10n: {
        es: `Recuperar una caída del ${v.loss} % exige subir un ${out[0].value} %: recuperar el mismo porcentaje no basta.`,
        'pt-br': `Recuperar uma queda de ${v.loss} % exige subir ${out[0].value} %: recuperar a mesma porcentagem não basta.`,
        ja: `${v.loss}%の下落を取り戻すには${out[0].value}%の上昇が要ります。下がった分だけ上がっても元には戻りません。`,
        de: `Einen Rückgang von ${v.loss} % aufzuholen verlangt ${out[0].value} % Anstieg — denselben Prozentsatz zurückzugewinnen reicht nicht.`,
        fr: `Rattraper une baisse de ${v.loss} % demande une hausse de ${out[0].value} % : regagner le même pourcentage ne suffit pas.`,
        hi: `${v.loss}% की गिरावट भरने के लिए ${out[0].value}% बढ़त चाहिए — उतना ही चढ़ने से बराबरी नहीं होती।`,
      },
      tone: 'warn',
    }),
    ko: { title: '손실 회복률 계산기', desc: '몇 % 떨어진 뒤 원금으로 돌아오려면 몇 % 올라야 하는지 구합니다.',
      long: '30% 떨어지면 남은 돈은 70%이고, 여기서 100으로 돌아오려면 42.9%가 올라야 합니다. 기준이 작아졌기 때문입니다.',
      note: '50% 손실은 100% 상승, 90% 손실은 900% 상승이 필요합니다. 큰 손실을 피하는 것이 큰 수익보다 중요한 이유입니다.' },
    en: { title: 'Loss Recovery Calculator', desc: 'How big a gain you need to get back to even after a given drop.',
      long: 'A 30% loss leaves 70%, and climbing from 70 back to 100 takes a 42.9% gain — the base shrank.',
      note: 'A 50% loss needs a 100% gain; a 90% loss needs 900%. That asymmetry is why avoiding big losses beats chasing big gains.' },
  },
  {
    slug: 'real-rate',
    icon: '🛡️',
    category: '금융·이자',
    fields: [
      { key: 'nominal', term: 'nominalRate', unit: 'percent', def: 3.5, step: 0.1 },
      { key: 'inflation', term: 'inflation', unit: 'percent', def: 2.5, step: 0.1 },
    ],
    formula: '{realRate} = ((1 + {nominalRate}/100) ÷ (1 + {inflation}/100) − 1) × 100',
    compute: v => {
      const real = ((1 + v.nominal / 100) / (1 + v.inflation / 100) - 1) * 100;
      return [
        { term: 'realRate', unit: 'percent', value: round(real, 2), digits: 2, primary: true },
        { term: 'diff', unit: 'percent', value: round(v.nominal - v.inflation, 2), digits: 2 },
      ];
    },
    verdict: (v, out) => {
      const real = out[0].value;
      return {
        ko: real >= 0 ? `물가를 감안해도 연 ${real}% 남습니다.` : `물가를 감안하면 실질 ${Math.abs(real)}% 손실입니다.`,
        en: real >= 0 ? `After inflation you still gain ${real}% a year.` : `After inflation this loses ${Math.abs(real)}% a year in real terms.`,
        l10n: {
          es: real >= 0 ? `Descontada la inflación, aún ganas un ${real} % al año.` : `Descontada la inflación, esto pierde un ${Math.abs(real)} % al año en términos reales.`,
          'pt-br': real >= 0 ? `Descontada a inflação, ainda sobra ${real} % ao ano.` : `Descontada a inflação, isso perde ${Math.abs(real)} % ao ano em termos reais.`,
          ja: real >= 0 ? `物価を差し引いても年${real}%残ります。` : `物価を差し引くと実質で年${Math.abs(real)}%の目減りです。`,
          de: real >= 0 ? `Nach Inflation bleiben dir noch ${real} % im Jahr.` : `Nach Inflation verliert das real ${Math.abs(real)} % im Jahr.`,
          fr: real >= 0 ? `Une fois l’inflation retirée, il te reste ${real} % par an.` : `Une fois l’inflation retirée, cela perd ${Math.abs(real)} % par an en termes réels.`,
          hi: real >= 0 ? `महँगाई हटाने के बाद भी सालाना ${real}% बचता है।` : `महँगाई हटाने पर यह सालाना ${Math.abs(real)}% घट जाता है।`,
        },
        tone: real >= 0 ? 'good' : 'bad',
      };
    },
    ko: { title: '실질 이자율 계산기', desc: '물가 상승률을 뺀 실제 구매력 기준 이자율을 구합니다.',
      long: '명목에서 물가를 그냥 빼면 근사값입니다. 정확히는 1을 더한 값끼리 나눠야 합니다. 아래 값이 단순 뺄셈 결과입니다.',
      note: '예금 이율이 3.5%인데 물가가 3.5%면 실질 수익은 0에 가깝습니다. 이자소득세까지 떼면 마이너스가 됩니다.' },
    en: { title: 'Real Interest Rate', desc: 'Strip inflation out of a nominal rate to see the gain in purchasing power.',
      long: 'Subtracting inflation from the nominal rate is only an approximation; dividing the two gross factors is exact. The simple subtraction is shown below.',
      note: 'A 3.5% deposit with 3.5% inflation gains you almost nothing — and after interest tax it turns negative.' },
  },
  {
    slug: 'deposit-tax',
    icon: '📄',
    category: '금융·이자',
    fields: [
      { key: 'interest', term: 'interest', unit: 'money', def: 1000000, min: 0 },
      { key: 'rate', term: 'rate', unit: 'percent', def: 15.4, min: 0, step: 0.1 },
    ],
    formula: '{netInterest} = {interest} × (1 − {rate} ÷ 100)',
    compute: v => {
      const tax = v.interest * (v.rate / 100);
      return [
        { term: 'netInterest', unit: 'money', value: Math.round(v.interest - tax), digits: 0, primary: true },
        { term: 'taxAmt', unit: 'money', value: Math.round(tax), digits: 0 },
      ];
    },
    ko: { title: '이자소득세 계산기', desc: '이자에서 15.4%를 떼고 실제로 받는 금액을 구합니다.',
      long: '이자소득세는 소득세 14%와 지방소득세 1.4%를 합쳐 15.4%입니다. 은행이 미리 떼고 나머지를 입금합니다.',
      note: '이자와 배당 합계가 연 2천만 원을 넘으면 금융소득종합과세 대상이 되어 세율이 달라집니다.' },
    en: { title: 'Interest Income Tax', desc: 'Take the 15.4% tax off your interest to see what you actually receive.',
      long: "Korea's interest income tax is 14% income tax plus 1.4% local tax, or 15.4%. The bank withholds it and deposits the rest.",
      note: 'Once interest and dividends together pass 20M a year, the income is taxed comprehensively at a different rate.' },
  },
];
