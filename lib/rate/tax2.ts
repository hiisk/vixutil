/**
 * 비율 섹션 - 세금·정산 둘째 묶음 (8종)
 *
 * 세율은 나라마다 다르므로 숫자를 박아 두지 않는다. 전부 입력으로 받고, 공식만
 * 보여 준다 — 그러면 한국·미국·중국 어디서 보든 자기 세율을 넣어 쓸 수 있다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const TAX2_TOOLS: FormulaTool[] = [
  {
    slug: 'sales-tax',
    icon: '🧮',
    category: '세금·정산',
    fields: [
      { key: 'amount', term: 'supply', unit: 'money', def: 50000, min: 0 },
      { key: 'rate', term: 'taxRate', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{total} = {supply} × (1 + {taxRate} ÷ 100)',
    compute: v => [
      { term: 'total', unit: 'money', value: Math.round(v.amount * (1 + v.rate / 100)), digits: 0, primary: true },
      { term: 'taxAmt', unit: 'money', value: Math.round(v.amount * (v.rate / 100)), digits: 0 },
      { term: 'supply', unit: 'money', value: Math.round(v.amount), digits: 0 },
    ],
    ko: { title: '판매세 붙이기 (세율 지정)', desc: '세율을 직접 넣어 세금이 붙은 최종 금액을 계산합니다.',
      long: '세전 금액에 (1 + 세율)을 곱하면 세금이 붙은 금액이 됩니다. 한국 부가세 10%, 일본 소비세 10%, 독일 19%, 싱가포르 9%처럼 세율만 바꿔 넣으면 어느 나라든 같은 공식으로 계산됩니다.',
      note: '나라와 품목에 따라 세율이 여러 단계로 갈립니다. 식품·책·약에 낮은 세율을 매기는 나라가 많으니 품목 세율을 먼저 확인하세요.' },
    en: { title: 'Add Sales Tax (Any Rate)', desc: 'Enter your own tax rate to get the price with tax added.',
      long: 'Multiply the pre-tax amount by (1 + rate). The same formula covers 10% VAT in Korea, 19% in Germany, 9% GST in Singapore and 20% in the UK — only the rate changes.',
      note: 'Most countries run several rates. Food, books and medicine are often taxed lower, so check the rate for the item and not just the country.' },
  },
  {
    slug: 'taxable-equivalent-yield',
    icon: '📋',
    category: '세금·정산',
    fields: [
      { key: 'free', term: 'taxFreeRate', unit: 'percent', def: 3, min: 0, max: 50 },
      { key: 'tax', term: 'taxRate', unit: 'percent', def: 15.4, min: 0, max: 60 },
      { key: 'amount', term: 'principal', unit: 'money', def: 10000000, min: 0 },
    ],
    formula: '{equivYield} = {taxFreeRate} ÷ (1 − {taxRate} ÷ 100)',
    compute: v => {
      const eq = ratio(v.free, 1 - v.tax / 100);
      return [
        { term: 'equivYield', unit: 'percent', value: round(eq, 3), digits: 3, primary: true },
        { term: 'pointDiff', unit: 'percent', value: round(eq - v.free, 3), digits: 3 },
        { term: 'netInterest', unit: 'money', value: Math.round(v.amount * (v.free / 100)), digits: 0 },
      ];
    },
    verdict: (v, out) => ({
      ko: `비과세 ${v.free}%는 과세 상품 ${out[0].value}%와 같습니다. 과세 상품이 그보다 낮으면 비과세 쪽이 유리합니다.`,
      en: `A tax-free ${v.free}% matches a taxable ${out[0].value}%. Anything below that and the tax-free option wins.`,
      l10n: {
        es: `Un ${v.free} % exento equivale a un ${out[0].value} % gravado. Por debajo de eso, gana la opción exenta.`,
        'pt-br': `Um ${v.free} % isento equivale a ${out[0].value} % tributado. Abaixo disso, ganha a opção isenta.`,
        ja: `非課税の${v.free}%は課税商品の${out[0].value}%に相当します。それを下回るなら非課税の方が有利です。`,
        de: `Steuerfreie ${v.free} % entsprechen ${out[0].value} % vor Steuer. Liegt es darunter, gewinnt die steuerfreie Anlage.`,
        fr: `Un ${v.free} % non imposé équivaut à ${out[0].value} % imposé. En dessous, l’option non imposée l’emporte.`,
        hi: `कर-मुक्त ${v.free}% कर योग्य ${out[0].value}% के बराबर है। उससे कम हो तो कर-मुक्त वाला बेहतर है।`,
      },
      tone: 'good',
    }),
    ko: { title: '비과세 → 과세 등가 수익률', desc: '비과세 상품과 같은 효과를 내려면 과세 상품이 몇 %여야 하는지 계산합니다.',
      long: '과세 상품은 이자에서 세금을 떼므로 표시 수익률을 그대로 받지 못합니다. 비과세 수익률을 (1 − 세율)로 나누면 같은 손에 남는 금액을 만드는 과세 수익률이 나옵니다.',
      note: '이자소득세율은 나라마다 다르고, 같은 나라에서도 상품·기간에 따라 갈립니다. 비교하려는 두 상품의 세율을 각각 확인하세요.' },
    en: { title: 'Tax-Free to Taxable Equivalent Yield', desc: 'What a taxable product must pay to match a tax-free one.',
      long: 'A taxable product hands part of the interest to tax, so you keep less than the headline rate. Divide the tax-free rate by (1 − tax rate) to find the taxable rate that leaves you the same money.',
      note: 'Rates on investment income differ by country and, within a country, by product and holding period. Check the rate on each product you are comparing.' },
  },
  {
    slug: 'service-plus-tax',
    icon: '🍽️',
    category: '세금·정산',
    fields: [
      { key: 'amount', term: 'amount', unit: 'money', def: 80000, min: 0 },
      { key: 'service', term: 'serviceRate', unit: 'percent', def: 10, min: 0, max: 30 },
      { key: 'tax', term: 'taxRate', unit: 'percent', def: 10, min: 0, max: 30 },
    ],
    formula: '{total} = {amount} × (1 + {serviceRate} ÷ 100) × (1 + {taxRate} ÷ 100)',
    compute: v => {
      const withService = v.amount * (1 + v.service / 100);
      const total = withService * (1 + v.tax / 100);
      return [
        { term: 'total', unit: 'money', value: Math.round(total), digits: 0, primary: true },
        { term: 'feeAmt', unit: 'money', value: Math.round(withService - v.amount), digits: 0 },
        { term: 'taxAmt', unit: 'money', value: Math.round(total - withService), digits: 0 },
        { term: 'effDiscount', unit: 'percent', value: round((ratio(total, v.amount) - 1) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '봉사료 + 세금 이중 부과 계산기', desc: '봉사료에 다시 세금이 붙는 호텔·식당 계산서를 계산합니다.',
      long: '봉사료 10%에 세금 10%가 각각 붙으면 20%가 아니라 21%가 더해집니다. 세금이 봉사료까지 포함한 금액에 매겨지기 때문입니다. 1.1 × 1.1 = 1.21입니다.',
      note: '봉사료 위에 세금을 매기지 않는 곳도 있습니다. 계산서에 "++"로 표기돼 있으면 이중 부과, "봉사료·세금 포함"이면 이미 들어간 금액입니다.' },
    en: { title: 'Service Charge Plus Tax', desc: 'Work out a hotel or restaurant bill where tax is charged on the service charge too.',
      long: 'A 10% service charge and 10% tax add 21%, not 20%, because the tax lands on the amount that already includes service. 1.1 × 1.1 = 1.21.',
      note: 'Some places do not tax the service charge. A bill marked “++” means both are added on top; “inclusive” means they are already in the price.' },
  },
  {
    slug: 'double-fee',
    icon: '🔗',
    category: '세금·정산',
    fields: [
      { key: 'amount', term: 'amount', unit: 'money', def: 1000000, min: 0 },
      { key: 'a', term: 'feeRateA', unit: 'percent', def: 8, min: 0, max: 50 },
      { key: 'b', term: 'feeRateB', unit: 'percent', def: 3.3, min: 0, max: 50 },
    ],
    formula: '{netPay} = {amount} × (1 − {feeRateA} ÷ 100) × (1 − {feeRateB} ÷ 100)',
    compute: v => {
      const afterA = v.amount * (1 - v.a / 100);
      const net = afterA * (1 - v.b / 100);
      return [
        { term: 'netPay', unit: 'money', value: Math.round(net), digits: 0, primary: true },
        { term: 'feeAmt', unit: 'money', value: Math.round(v.amount - net), digits: 0 },
        { term: 'effRate', unit: 'percent', value: round((1 - ratio(net, v.amount)) * 100, 2), digits: 2 },
      ];
    },
    ko: { title: '수수료 이중 차감 계산기', desc: '플랫폼 수수료와 세금이 차례로 떼일 때 손에 남는 금액을 계산합니다.',
      long: '수수료가 두 번 떼일 때는 남은 금액에 순서대로 적용되므로 8%와 3.3%를 더한 11.3%보다 조금 적게 떼입니다. 남는 비율끼리 곱하면 0.92 × 0.967 = 0.8896, 실효 11.04%입니다.',
      note: '어떤 플랫폼은 세금을 총액 기준으로, 수수료는 정산액 기준으로 계산합니다. 그러면 이 곱셈이 아니라 각각 총액에서 빼야 하므로 정산 명세를 확인하세요.' },
    en: { title: 'Two Fees Stacked', desc: 'What lands in your account when a platform cut and tax are taken in turn.',
      long: 'Two fees apply one after the other to what is left, so 8% then 3.3% takes slightly less than the 11.3% you get by adding. Multiply the survivors: 0.92 × 0.967 = 0.8896, an effective 11.04%.',
      note: 'Some platforms take tax on the gross but their fee on the net. That is subtraction from the same base, not this multiplication — check the remittance statement.' },
  },
  {
    slug: 'refund-proration',
    icon: '↩️',
    category: '세금·정산',
    fields: [
      { key: 'paid', term: 'amount', unit: 'money', def: 120000, min: 0 },
      { key: 'total', term: 'totalDays', unit: 'day', def: 365, min: 1 },
      { key: 'used', term: 'usedDays', unit: 'day', def: 100, min: 0 },
    ],
    formula: '{refundAmt} = {amount} × ({totalDays} − {usedDays}) ÷ {totalDays}',
    compute: v => {
      const left = Math.max(0, v.total - v.used);
      return [
        { term: 'refundAmt', unit: 'money', value: Math.round(ratio(v.paid * left, v.total)), digits: 0, primary: true },
        { term: 'costPerDay', unit: 'money', value: Math.round(ratio(v.paid, v.total)), digits: 0 },
        { term: 'remainPct', unit: 'percent', value: round(ratio(left, v.total) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '중도 해지 환불액 계산기', desc: '남은 기간에 비례해 돌려받을 금액을 계산합니다.',
      long: '전체 기간에서 쓴 기간을 빼 남은 기간을 구하고, 그 비율만큼 돌려받습니다. 하루치 값은 총액을 전체 일수로 나눈 값이라 계산이 맞는지 검산하기 쉽습니다.',
      note: '실제 약관에는 위약금이나 할인 반환 조건이 붙는 경우가 많아 이 값보다 적게 돌려받습니다. 이 계산은 위약금 없는 단순 일할 계산입니다.' },
    en: { title: 'Pro-Rata Refund', desc: 'How much comes back when you cancel part-way through a term.',
      long: 'Take the days left out of the total days and refund that share. The per-day figure — total over days — makes it easy to sanity-check the answer.',
      note: 'Real contracts often add a cancellation fee or claw back a signing discount, so you get less than this. Treat it as the no-penalty baseline.' },
  },
  {
    slug: 'import-duty',
    icon: '📮',
    category: '세금·정산',
    fields: [
      { key: 'goods', term: 'goodsPrice', unit: 'money', def: 200000, min: 0 },
      { key: 'ship', term: 'shipFee', unit: 'money', def: 25000, min: 0 },
      { key: 'duty', term: 'dutyRate', unit: 'percent', def: 8, min: 0, max: 100 },
      { key: 'tax', term: 'taxRate', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{landedCost} = ({goodsPrice} + {shipFee}) × (1 + {dutyRate} ÷ 100) × (1 + {taxRate} ÷ 100)',
    compute: v => {
      const cif = v.goods + v.ship;
      const withDuty = cif * (1 + v.duty / 100);
      const total = withDuty * (1 + v.tax / 100);
      return [
        { term: 'landedCost', unit: 'money', value: Math.round(total), digits: 0, primary: true },
        { term: 'taxAmt', unit: 'money', value: Math.round(total - cif), digits: 0 },
        { term: 'effRate', unit: 'percent', value: round((ratio(total, v.goods) - 1) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '해외 직구 총비용 계산기', desc: '관세와 소비세까지 더한 실제 지불 금액을 계산합니다.',
      long: '과세 기준은 보통 물품값에 운송비를 더한 금액입니다. 그 값에 관세를 매기고, 관세까지 포함한 금액에 다시 소비세를 매기므로 두 세율을 단순히 더하면 실제보다 적게 나옵니다.',
      note: '관세율은 품목별로 다르고 자유무역협정이 적용되면 0%가 되기도 합니다. 면세 한도 이하면 둘 다 붙지 않으니 한도를 먼저 확인하세요.' },
    en: { title: 'Import Landed Cost', desc: 'The real total once customs duty and consumption tax are added.',
      long: 'The taxable base is usually goods plus shipping. Duty goes on that, then tax goes on the duty-inclusive figure — so adding the two rates together understates the bill.',
      note: 'Duty rates vary by product and drop to zero under many trade agreements. Below the de minimis threshold neither applies, so check the allowance first.' },
  },
  {
    slug: 'duty-free-over',
    icon: '🛄',
    category: '세금·정산',
    fields: [
      { key: 'buy', term: 'amount', unit: 'money', def: 1200000, min: 0 },
      { key: 'limit', term: 'dutyFreeLimit', unit: 'money', def: 800000, min: 0 },
      { key: 'rate', term: 'taxRate', unit: 'percent', def: 20, min: 0, max: 100 },
    ],
    formula: '{taxableAmt} = {amount} − {dutyFreeLimit}',
    compute: v => {
      const over = Math.max(0, v.buy - v.limit);
      return [
        { term: 'taxAmt', unit: 'money', value: Math.round(over * (v.rate / 100)), digits: 0, primary: true },
        { term: 'taxableAmt', unit: 'money', value: Math.round(over), digits: 0 },
        { term: 'total', unit: 'money', value: Math.round(v.buy + over * (v.rate / 100)), digits: 0 },
      ];
    },
    verdict: (_v, out) =>
      out[1].value === 0
        ? { ko: '면세 한도 안이라 세금이 붙지 않습니다.', en: 'You are inside the allowance — nothing to pay.',
            l10n: {
              es: 'Estás dentro de la franquicia: no hay nada que pagar.',
              'pt-br': 'Você está dentro da cota: não há nada a pagar.',
              ja: '免税枠の中なので税金はかかりません。',
              de: 'Du bist innerhalb der Freigrenze — es fällt nichts an.',
              fr: 'Tu es dans la franchise : rien à payer.',
              hi: 'आप छूट सीमा के भीतर हैं — कुछ नहीं देना है।',
            }, tone: 'good' }
        : { ko: `한도를 ${out[1].value} 넘겼습니다. 초과분에만 세금이 붙습니다.`, en: `You are ${out[1].value} over. Tax applies to the excess only.`,
            l10n: {
              es: `Te has pasado ${out[1].value}. El impuesto solo cae sobre el exceso.`,
              'pt-br': `Você passou ${out[1].value}. O imposto cai só sobre o excedente.`,
              ja: `枠を${out[1].value}超えています。税金は超過分にだけかかります。`,
              de: `Du liegst ${out[1].value} darüber. Besteuert wird nur der Überhang.`,
              fr: `Tu dépasses de ${out[1].value}. La taxe ne porte que sur l’excédent.`,
              hi: `आप ${out[1].value} ऊपर हैं। कर सिर्फ़ अतिरिक्त हिस्से पर लगेगा।`,
            }, tone: 'warn' },
    ko: { title: '면세 한도 초과 세금 계산기', desc: '면세 한도를 넘긴 금액에만 붙는 세금을 계산합니다.',
      long: '구매액에서 면세 한도를 뺀 초과분에만 세금이 매겨집니다. 한도가 80만이고 120만을 샀다면 40만에만 세금이 붙습니다. 전체 금액에 세금을 매기는 것이 아닙니다.',
      note: '나라마다 한도와 계산 방식이 다릅니다. 전체 금액에 과세하는 나라도 있고, 술·담배는 수량으로 따로 한도를 두는 곳이 많습니다.' },
    en: { title: 'Over the Duty-Free Allowance', desc: 'Tax on the part of your purchase that exceeds the allowance.',
      long: 'Only the excess is taxed. Buy 1,200 against an 800 allowance and tax lands on 400, not on the whole 1,200.',
      note: 'Allowances and methods differ by country — some tax the full amount once you cross the line, and alcohol and tobacco usually have separate quantity limits.' },
  },
  {
    slug: 'after-tax-hourly',
    icon: '⏱️',
    category: '세금·정산',
    fields: [
      { key: 'gross', term: 'grossPay', unit: 'money', def: 3500000, min: 0 },
      { key: 'rate', term: 'taxRate', unit: 'percent', def: 12, min: 0, max: 60 },
      { key: 'hours', term: 'workHours', unit: 'hour', def: 174, min: 1 },
    ],
    formula: '{hourlyNet} = {grossPay} × (1 − {taxRate} ÷ 100) ÷ {workHours}',
    compute: v => {
      const net = v.gross * (1 - v.rate / 100);
      return [
        { term: 'hourlyNet', unit: 'money', value: Math.round(ratio(net, v.hours)), digits: 0, primary: true },
        { term: 'netPay', unit: 'money', value: Math.round(net), digits: 0 },
        { term: 'taxAmt', unit: 'money', value: Math.round(v.gross - net), digits: 0 },
      ];
    },
    ko: { title: '세후 시급 계산기', desc: '월급과 공제율, 근무시간으로 실제 시급을 계산합니다.',
      long: '세전 월급에서 공제율을 빼 실수령액을 만들고 월 근무시간으로 나눕니다. 야근이 많으면 근무시간이 늘어 시급이 떨어지므로, 연봉이 아니라 이 값으로 두 일자리를 비교해야 합니다.',
      note: '통근 시간과 통근비를 넣으면 값이 더 정확해집니다. 왕복 2시간이면 근무시간에 하루 2시간씩 더해 보세요.' },
    en: { title: 'Take-Home Hourly Rate', desc: 'Turn a monthly salary, deduction rate and hours into a real hourly wage.',
      long: 'Strip the deductions off gross pay, then divide by hours worked in the month. Long overtime raises the hours and lowers the rate, which is why this beats salary for comparing two jobs.',
      note: 'Fold in the commute for a truer number — a two-hour round trip means adding two hours to every working day.' },
  },
];
