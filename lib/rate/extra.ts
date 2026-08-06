/**
 * 비율 섹션 셋째 묶음 (13종).
 *
 * 앞의 110종이 "지금 이 값이 몇 %인가"였다면 여기는 **시간이 붙은 것**과
 * **경계가 있는 것**이다 — 남은 원금, 거치기간이 늘리는 이자, 매달 갚으면 몇 달,
 * 목돈에서 뽑아 쓰면 몇 년, 세율 구간을 넘을 때 실제로 더 내는 돈, 몇 배씩 줄면
 * 절반이 되는 해. 나머지는 계산기를 안 쓰면 그냥 틀리는 것들이다: 수량 구간 단가,
 * 사용량으로 나눈 공동 비용, 보상판매의 실질 할인율, 커피 물, 연속 희석.
 *
 * 0을 넣어도 유한한 값이 나와야 한다 — 로그와 거듭제곱이 많아서 ratio()와
 * 분모 검사를 겹쳐 뒀다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 월 이율 — 연이율(%)을 12로 나눈 소수 */
const monthly = (annual: number): number => annual / 1200;

/** 원리금 균등 상환의 월 납입액. 이자가 0이면 원금을 개월로 나눈다 */
function payment(principal: number, i: number, n: number): number {
  if (n <= 0) return 0;
  if (i <= 0) return ratio(principal, n);
  return ratio(principal * i, 1 - (1 + i) ** -n);
}

/** 매달 pay를 갚아 다 갚는 데 걸리는 개월. 이자가 납입액보다 크면 안 끝나므로 0 */
function payoffMonths(principal: number, i: number, pay: number): number {
  if (pay <= 0 || principal <= 0) return 0;
  if (i <= 0) return ratio(principal, pay);
  if (pay <= principal * i) return 0;
  return ratio(-Math.log(1 - ratio(principal * i, pay)), Math.log(1 + i));
}

export const RATE_EXTRA_TOOLS: FormulaTool[] = [
  /* ───────── 할인·가격 ───────── */
  {
    slug: 'bulk-tier-price',
    icon: '📦',
    category: '할인·가격',
    fields: [
      { key: 'qty', term: 'count', def: 250, min: 0 },
      { key: 'unit', term: 'unitPrice', unit: 'money', def: 1200, min: 0 },
      { key: 'tierQty', term: 'tierQty', def: 100, min: 0 },
      { key: 'tierPrice', term: 'tierPrice', unit: 'money', def: 950, min: 0 },
    ],
    formula: '{total} = {count} × ({count} ≥ {tierQty} ? {tierPrice} : {unitPrice})',
    compute: v => {
      const total = v.qty * (v.qty >= v.tierQty ? v.tierPrice : v.unit);
      return [
        { term: 'total', unit: 'money', value: round(total, 0), digits: 0, primary: true },
        { term: 'avgUnit', unit: 'money', value: round(ratio(total, v.qty), 1), digits: 1 },
        { term: 'saveAmt', unit: 'money', value: round(v.qty * v.unit - total, 0), digits: 0 },
      ];
    },
    verdict: v => {
      if (v.qty >= v.tierQty || v.tierQty <= 0) return null;
      const now = v.qty * v.unit;
      const bulk = v.tierQty * v.tierPrice;
      if (bulk >= now) return null;
      const more = v.tierQty - v.qty;
      return {
        tone: 'warn',
        ko: `${more}개를 더 사면 오히려 싸집니다 — 지금보다 총액이 줄어듭니다.`,
        en: `Buying ${more} more actually costs less than what you have in the basket.`,
        l10n: {
          es: `Comprar ${more} unidades más sale más barato que lo que llevas ahora.`,
          'pt-br': `Comprar mais ${more} unidades sai mais barato do que o carrinho atual.`,
          ja: `あと${more}個買うほうが、いまの合計より安くなります。`,
          de: `${more} Stück mehr zu kaufen kostet weniger als der jetzige Warenkorb.`,
          fr: `Acheter ${more} unités de plus revient moins cher que le panier actuel.`,
          hi: `${more} और खरीदने पर कुल रकम अभी से कम पड़ती है।`,
          'zh-hans': `再多买 ${more} 件反而更便宜，总价比现在还低。`,
          'zh-hant': `再多買 ${more} 件反而更便宜，總價比現在還低。`,
        },
      };
    },
    ko: { title: '수량 구간 단가 계산기', desc: '몇 개부터 싸지는 가격표에서 총액과 실제 1개당 값을 구합니다.',
      long: '구간 가격은 기준 수량에 닿는 순간 전부가 싼 단가로 바뀝니다. 그래서 기준 바로 아래에서는 더 사는 쪽이 총액이 적어지는 구간이 생깁니다 — 99개가 100개보다 비싸지는 자리입니다.',
      note: '기준을 넘겼는데도 총액이 줄지 않는다면 구간 단가가 아니라 초과분만 할인하는 방식입니다. 그때는 이 계산이 맞지 않습니다.' },
    en: { title: 'Bulk Tier Price Calculator', desc: 'Total and true unit cost when the price drops at a quantity threshold.',
      long: 'Tier pricing switches every unit to the cheaper rate the moment you reach the threshold. That creates a stretch just below it where buying more costs less — the point where 99 is dearer than 100.',
      note: 'If crossing the threshold does not lower your total, the seller discounts only the units above it, and this calculation does not apply.' },
  },
  {
    slug: 'usage-split',
    icon: '🧾',
    category: '할인·가격',
    fields: [
      { key: 'amount', term: 'amount', unit: 'money', def: 180000, min: 0 },
      { key: 'used', term: 'usedAmt', def: 320, min: 0 },
      { key: 'total', term: 'totalQty', def: 1250, min: 0 },
    ],
    formula: '{settle} = {amount} × {usedAmt} ÷ {totalQty}',
    compute: v => {
      const mine = v.amount * ratio(v.used, v.total);
      return [
        { term: 'settle', unit: 'money', value: round(mine, 0), digits: 0, primary: true },
        { term: 'percent', unit: 'percent', value: round(ratio(v.used, v.total) * 100, 2), digits: 2 },
        { term: 'otherShare', unit: 'money', value: round(v.amount - mine, 0), digits: 0 },
      ];
    },
    ko: { title: '사용량으로 나누는 공동 비용', desc: '전기·수도·통신처럼 함께 쓴 요금을 쓴 만큼 나눕니다.',
      long: '머릿수로 나누면 적게 쓴 쪽이 손해입니다. 계량기 숫자나 데이터 사용량처럼 잴 수 있는 값이 있으면 그 비율대로 나누는 것이 실제 부담과 맞습니다.',
      note: '기본요금처럼 쓴 양과 상관없이 붙는 몫이 있으면, 그것만 먼저 균등하게 빼고 남은 금액에 이 계산을 쓰세요.' },
    en: { title: 'Split a Bill by Usage', desc: 'Divide a shared bill by how much each side actually used.',
      long: 'Splitting by headcount penalises whoever used less. When there is something measurable — a meter reading, data used, hours booked — dividing in that proportion matches what each side actually caused.',
      note: 'If part of the bill is a fixed standing charge, split that evenly first and run this calculation on what is left.' },
  },
  {
    slug: 'trade-in-discount',
    icon: '🔄',
    category: '할인·가격',
    fields: [
      { key: 'list', term: 'listPrice', unit: 'money', def: 1500000, min: 0 },
      { key: 'credit', term: 'amount', unit: 'money', def: 300000, min: 0 },
      { key: 'resale', term: 'nowValue', unit: 'money', def: 380000, min: 0 },
    ],
    formula: '{finalPrice} = {listPrice} − {amount}',
    compute: v => [
      { term: 'finalPrice', unit: 'money', value: round(v.list - v.credit, 0), digits: 0, primary: true },
      { term: 'percent', unit: 'percent', value: round(ratio(v.credit, v.list) * 100, 2), digits: 2 },
      { term: 'diff', unit: 'money', value: round(v.resale - v.credit, 0), digits: 0 },
    ],
    verdict: v => {
      if (v.resale <= 0 || v.credit <= 0) return null;
      const gap = v.resale - v.credit;
      if (gap <= 0) {
        return {
          tone: 'good',
          ko: '보상액이 중고 시세보다 높습니다. 직접 파는 수고와 위험을 생각하면 보상판매가 낫습니다.',
          en: 'The trade-in beats the resale price, and it saves you the work and risk of selling it yourself.',
          l10n: {
            es: 'El plan renove supera el precio de reventa y te ahorra el trabajo y el riesgo de venderlo.',
            'pt-br': 'A troca supera o preço de revenda e ainda poupa o trabalho e o risco de vender por conta.',
            ja: '下取り額が中古相場を上回っています。自分で売る手間とリスクを考えると下取りが得です。',
            de: 'Die Inzahlungnahme liegt über dem Wiederverkaufspreis und spart Aufwand und Risiko.',
            fr: 'La reprise dépasse le prix de revente et vous épargne le travail et le risque de vendre vous-même.',
            hi: 'एक्सचेंज राशि पुनर्विक्रय भाव से अधिक है, और खुद बेचने की मेहनत तथा जोखिम भी बचता है।',
            'zh-hans': '以旧换新的抵扣高于二手行情，还省去自己出售的麻烦和风险。',
            'zh-hant': '以舊換新的折抵高於二手行情，還省去自己出售的麻煩和風險。',
          },
        };
      }
      return {
        tone: 'warn',
        ko: '따로 팔면 그만큼 더 받습니다. 그 차액이 직접 파는 수고보다 큰지 견줘 보세요.',
        en: 'Selling it separately fetches that much more — weigh the gap against the hassle of doing it yourself.',
        l10n: {
          es: 'Venderlo aparte da esa diferencia de más; compárala con la molestia de hacerlo tú.',
          'pt-br': 'Vender por fora rende essa diferença a mais; compare com o trabalho de fazer isso.',
          ja: '別で売ればその差額だけ多く受け取れます。自分で売る手間と見比べてください。',
          de: 'Getrennt verkauft bringt es diesen Betrag mehr — wäge ihn gegen den Aufwand ab.',
          fr: 'Vendre à part rapporte cette différence en plus : pesez-la face au tracas.',
          hi: 'अलग से बेचने पर उतना अधिक मिलता है — इस अंतर को खुद बेचने की मेहनत से तौलिए।',
          'zh-hans': '单独出售能多拿这笔差价，请与自己卖的麻烦权衡。',
          'zh-hant': '單獨出售能多拿這筆差價，請與自己賣的麻煩權衡。',
        },
      };
    },
    ko: { title: '보상판매 실질 할인율', desc: '기기를 반납하고 받는 보상액이 실제로 몇 % 할인인지 봅니다.',
      long: '보상판매는 할인처럼 보이지만 값을 치르는 쪽은 반납한 기기입니다. 정가에서 보상액을 뺀 것이 실제 지불액이고, 보상액을 정가로 나눈 것이 실질 할인율입니다.',
      note: '중고 시세보다 보상액이 낮으면 그 차액만큼 손해입니다. 다만 직접 파는 데 드는 시간과 거래 위험도 값에 넣어야 합니다.' },
    en: { title: 'Trade-In Discount Calculator', desc: 'What a trade-in credit is really worth as a percentage off.',
      long: 'A trade-in looks like a discount, but the thing paying for it is the device you hand over. The list price minus the credit is what you actually pay, and the credit over the list price is the real discount rate.',
      note: 'If the credit falls short of the resale price, that gap is your cost — though the time and risk of selling privately belong in the comparison too.' },
  },

  /* ───────── 비율·증감 ───────── */
  {
    slug: 'multiple-to-percent',
    icon: '🔢',
    category: '비율·증감',
    fields: [
      { key: 'multiple', term: 'multiple', unit: 'times', def: 2.5, min: 0, step: 0.1 },
      { key: 'before', term: 'before', unit: 'none', def: 40000, min: 0 },
    ],
    formula: '{percent} = ({multiple} − 1) × 100',
    compute: v => [
      { term: 'percent', unit: 'percent', value: round((v.multiple - 1) * 100, 2), digits: 2, primary: true },
      { term: 'after', unit: 'none', value: round(v.before * v.multiple, 2), digits: 2 },
      { term: 'diff', unit: 'none', value: round(v.before * (v.multiple - 1), 2), digits: 2 },
    ],
    ko: { title: '몇 배는 몇 % 증가인가', desc: '배수를 증가율로, 증가율을 배수로 바꿔 봅니다.',
      long: '2배는 100% 증가지 200% 증가가 아닙니다. 배수에서 1을 빼야 증가분이 되기 때문입니다. 기사에서 "세 배 늘었다"와 "300% 늘었다"가 뒤섞이는 것이 이 한 칸 차이입니다.',
      note: '1배는 0% 증가, 곧 그대로입니다. 0.5배는 50% 감소이고, 1보다 작은 배수에서는 증가율이 음수로 나옵니다.' },
    en: { title: 'Multiple to Percent Increase', desc: 'Convert a multiple into a percentage increase and back.',
      long: 'Doubling is a 100% increase, not 200% — you subtract one from the multiple to get the growth part. That single step is why “grew threefold” and “grew 300%” get mixed up in headlines.',
      note: 'A multiple of 1 is a 0% increase, meaning no change. Half means a 50% decrease, and any multiple below 1 shows up as a negative growth rate.' },
  },
  {
    slug: 'halving-rate',
    icon: '📉',
    category: '비율·증감',
    fields: [
      { key: 'rate', term: 'lossRate', unit: 'percent', def: 15, min: 0, max: 99 },
      { key: 'years', term: 'years', unit: 'year', def: 10, min: 0, max: 100 },
    ],
    formula: '{halfLife} = ln(0.5) ÷ ln(1 − {lossRate} ÷ 100)',
    compute: v => {
      const keep = 1 - v.rate / 100;
      const half = keep > 0 && keep < 1 ? ratio(Math.log(0.5), Math.log(keep)) : 0;
      return [
        { term: 'halfLife', unit: 'year', value: round(half, 2), digits: 2, primary: true },
        { term: 'remainPct', unit: 'percent', value: round(keep > 0 ? keep ** v.years * 100 : 0, 2), digits: 2 },
      ];
    },
    ko: { title: '절반이 되는 기간 계산기', desc: '해마다 일정 비율씩 줄 때 절반이 되기까지 몇 해가 걸리는지 봅니다.',
      long: '해마다 15%씩 줄면 일곱 해가 아니라 4.27년 만에 절반이 됩니다. 줄어드는 것은 남은 값의 15%라서, 줄어드는 양 자체가 해마다 작아지기 때문입니다. 두 배가 되는 해를 구하는 72의 법칙을 뒤집은 것입니다.',
      note: '중고차 감가, 구독자 이탈, 방사성 물질처럼 남은 것에 비례해 줄어드는 것에만 맞습니다. 매년 같은 금액씩 줄면 이 식이 아니라 그냥 나눗셈입니다.' },
    en: { title: 'Time to Halve Calculator', desc: 'How many years it takes to fall to half at a steady rate of decline.',
      long: 'Losing 15% a year does not halve in seven years — it halves in 4.27. Each year takes 15% of what is left, so the amount lost shrinks year after year. This is the rule of 72 turned around.',
      note: 'It fits things that shrink in proportion to what remains: depreciation, subscriber churn, radioactive decay. If the same fixed amount goes each year, plain division is the right tool.' },
  },

  /* ───────── 금융·이자 ───────── */
  {
    slug: 'loan-balance',
    icon: '🏦',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 300000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4.2, min: 0, step: 0.1 },
      { key: 'years', term: 'years', unit: 'year', def: 30, min: 0, max: 50 },
      { key: 'paid', term: 'months', unit: 'month', def: 60, min: 0 },
    ],
    formula: '{balanceLeft} = {principal} × (1+i)^{months} − {monthlyPay} × ((1+i)^{months} − 1) ÷ i',
    compute: v => {
      const i = monthly(v.rate);
      const n = v.years * 12;
      const k = Math.min(v.paid, n);
      const pay = payment(v.principal, i, n);
      const grow = (1 + i) ** k;
      const bal = i > 0 ? v.principal * grow - pay * ratio(grow - 1, i) : v.principal - pay * k;
      const left = Math.max(0, bal);
      const paidTotal = pay * k;
      return [
        { term: 'balanceLeft', unit: 'money', value: round(left, 0), digits: 0, primary: true },
        { term: 'totalPaid', unit: 'money', value: round(paidTotal, 0), digits: 0 },
        { term: 'interest', unit: 'money', value: round(paidTotal - (v.principal - left), 0), digits: 0 },
      ];
    },
    ko: { title: '대출 남은 원금 계산기', desc: '몇 달을 갚은 지금 원금이 얼마나 남았는지 구합니다.',
      long: '원리금 균등 상환은 매달 같은 돈을 내지만 그 안에서 이자와 원금의 비율이 계속 바뀝니다. 초반에는 대부분이 이자라 낸 돈에 비해 원금이 잘 안 줄고, 후반으로 갈수록 원금이 빠르게 깎입니다.',
      note: '30년 만기에서 5년을 갚아도 원금은 10%도 채 안 줄어 있는 것이 보통입니다. 중도상환이나 갈아타기를 따질 때 이 숫자가 출발점입니다.' },
    en: { title: 'Remaining Loan Balance', desc: 'How much principal is still owed after a number of payments.',
      long: 'An amortising loan takes the same payment every month, but the split inside it keeps shifting. Early on most of it is interest, so the balance barely moves; later the principal falls quickly.',
      note: 'Five years into a thirty-year loan, the balance is typically down by less than a tenth. That figure is the starting point for any refinancing or overpayment decision.' },
  },
  {
    slug: 'interest-only-period',
    icon: '⏸️',
    category: '금융·이자',
    fields: [
      { key: 'principal', term: 'principal', unit: 'money', def: 300000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 4.2, min: 0, step: 0.1 },
      { key: 'years', term: 'years', unit: 'year', def: 30, min: 0, max: 50 },
      { key: 'grace', term: 'months', unit: 'month', def: 36, min: 0 },
    ],
    formula: '{interest} = {principal} × i × {months} + {monthlyPay} × ({years} × 12 − {months}) − {principal}',
    compute: v => {
      const i = monthly(v.rate);
      const n = v.years * 12;
      const grace = Math.min(v.grace, Math.max(0, n - 1));
      const rest = n - grace;
      const pay = payment(v.principal, i, rest);
      const withGrace = v.principal * i * grace + pay * rest - v.principal;
      const plain = payment(v.principal, i, n) * n - v.principal;
      return [
        { term: 'interest', unit: 'money', value: round(Math.max(0, withGrace), 0), digits: 0, primary: true },
        { term: 'monthlyPay', unit: 'money', value: round(pay, 0), digits: 0 },
        { term: 'diff', unit: 'money', value: round(Math.max(0, withGrace - plain), 0), digits: 0 },
      ];
    },
    ko: { title: '거치기간이 늘리는 이자', desc: '이자만 내는 기간을 두면 총이자가 얼마나 불어나는지 봅니다.',
      long: '거치기간에는 원금이 한 푼도 줄지 않습니다. 그 기간 내내 처음 원금에 대한 이자를 그대로 물고, 원금은 남은 기간에 몰아서 갚아야 해서 이후 월 납입액도 올라갑니다. 두 값이 함께 움직입니다.',
      note: '거치기간은 당장의 부담을 뒤로 미루는 것이지 없애는 것이 아닙니다. 그 사이에 소득이 늘거나 집을 팔 계획이 확실할 때만 값을 합니다.' },
    en: { title: 'Cost of an Interest-Only Period', desc: 'How much extra interest a grace period adds over the life of a loan.',
      long: 'During a grace period the principal does not fall at all. You keep paying interest on the full original balance, and the principal then has to be repaid over a shorter remaining term, which pushes the later monthly payment up. Both effects move together.',
      note: 'A grace period postpones the burden rather than removing it. It pays off only when income is going to rise, or when the sale is already planned.' },
  },
  {
    slug: 'payoff-months',
    icon: '💳',
    category: '금융·이자',
    fields: [
      { key: 'balance', term: 'principal', unit: 'money', def: 3000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 19.9, min: 0, step: 0.1 },
      { key: 'pay', term: 'monthlyPay', unit: 'money', def: 300000, min: 0 },
    ],
    formula: '{months} = −ln(1 − {principal} × i ÷ {monthlyPay}) ÷ ln(1 + i)',
    compute: v => {
      const i = monthly(v.rate);
      const n = payoffMonths(v.balance, i, v.pay);
      return [
        { term: 'months', unit: 'month', value: round(n, 1), digits: 1, primary: true },
        { term: 'interest', unit: 'money', value: round(Math.max(0, v.pay * n - v.balance), 0), digits: 0 },
        { term: 'totalPaid', unit: 'money', value: round(v.pay * n, 0), digits: 0 },
      ];
    },
    verdict: v => {
      const i = monthly(v.rate);
      if (v.balance <= 0 || v.pay <= 0) return null;
      if (v.pay > v.balance * i) return null;
      return {
        tone: 'bad',
        ko: '매달 내는 돈이 한 달 이자보다 적습니다. 이대로면 잔액이 오히려 늘어납니다.',
        en: 'The payment is smaller than one month of interest — at this rate the balance grows instead of shrinking.',
        l10n: {
          es: 'El pago es menor que el interés de un mes: así el saldo crece en lugar de bajar.',
          'pt-br': 'O pagamento é menor que os juros de um mês: assim o saldo cresce em vez de cair.',
          ja: '毎月の支払額が1か月分の利息より少ないです。このままでは残高が増えていきます。',
          de: 'Die Rate liegt unter den Zinsen eines Monats — so wächst der Saldo, statt zu sinken.',
          fr: 'La mensualité est inférieure aux intérêts d’un mois : le solde augmente au lieu de baisser.',
          hi: 'हर महीने का भुगतान एक महीने के ब्याज से भी कम है — ऐसे में बकाया घटने के बजाय बढ़ेगा।',
          'zh-hans': '每月还款少于一个月的利息，这样下去余额只会越还越多。',
          'zh-hant': '每月還款少於一個月的利息，這樣下去餘額只會越還越多。',
        },
      };
    },
    ko: { title: '다 갚는 데 걸리는 개월', desc: '잔액과 이율, 매달 갚는 돈으로 상환 기간과 총이자를 구합니다.',
      long: '월 납입액을 정해 두고 기간을 되묻는 계산입니다. 납입액이 한 달 이자보다 조금만 커도 기간은 폭발적으로 길어집니다 — 남은 원금이 거의 안 줄기 때문입니다.',
      note: '카드 리볼빙처럼 잔액의 몇 %를 내는 방식은 납입액도 같이 줄어서 이 계산보다 훨씬 오래 걸립니다. 정액으로 갚을 때의 값입니다.' },
    en: { title: 'Months to Pay It Off', desc: 'Payoff time and total interest from a balance, a rate and a fixed monthly payment.',
      long: 'This asks the reverse question: with the payment fixed, how long? When the payment sits only a little above one month of interest, the term stretches out dramatically, because the balance hardly moves.',
      note: 'Revolving credit that charges a percentage of the balance shrinks the payment too, so it takes far longer than this. These figures assume a fixed amount every month.' },
  },
  {
    slug: 'withdrawal-years',
    icon: '🏝️',
    category: '금융·이자',
    fields: [
      { key: 'fund', term: 'principal', unit: 'money', def: 300000000, min: 0 },
      { key: 'rate', term: 'annualRate', unit: 'percent', def: 3, min: 0, step: 0.1 },
      { key: 'draw', term: 'amount', unit: 'money', def: 1500000, min: 0 },
    ],
    formula: '{years} = −ln(1 − {principal} × i ÷ {amount}) ÷ ln(1 + i) ÷ 12',
    compute: v => {
      const i = monthly(v.rate);
      const n = payoffMonths(v.fund, i, v.draw);
      return [
        { term: 'years', unit: 'year', value: round(n / 12, 2), digits: 2, primary: true },
        { term: 'months', unit: 'month', value: round(n, 1), digits: 1 },
        { term: 'totalPaid', unit: 'money', value: round(v.draw * n, 0), digits: 0 },
      ];
    },
    verdict: v => {
      const i = monthly(v.rate);
      if (v.fund <= 0 || v.draw <= 0) return null;
      if (v.draw > v.fund * i) return null;
      return {
        tone: 'good',
        ko: '매달 뽑는 돈이 이자보다 적어 원금이 줄지 않습니다 — 이론상 계속 쓸 수 있습니다.',
        en: 'The withdrawal is smaller than the interest earned, so the principal never runs down.',
        l10n: {
          es: 'La retirada es menor que los intereses, así que el capital no se agota.',
          'pt-br': 'A retirada é menor que os juros, então o principal não se esgota.',
          ja: '毎月の引き出しが利息より少ないため、元本が減りません。理論上はずっと使えます。',
          de: 'Die Entnahme liegt unter den Zinsen, das Kapital schrumpft also nicht.',
          fr: 'Le retrait est inférieur aux intérêts : le capital ne s’épuise pas.',
          hi: 'हर महीने निकाली जा रही राशि ब्याज से कम है, इसलिए मूलधन घटता ही नहीं।',
          'zh-hans': '每月取出的金额低于利息，本金不会减少，理论上可以一直取。',
          'zh-hant': '每月取出的金額低於利息，本金不會減少，理論上可以一直取。',
        },
      };
    },
    ko: { title: '목돈에서 뽑아 쓰면 몇 년', desc: '모아 둔 돈에서 매달 일정액을 꺼내 쓸 때 몇 해나 가는지 봅니다.',
      long: '남은 돈에 계속 이자가 붙기 때문에 단순히 목돈을 인출액으로 나눈 것보다 오래 갑니다. 반대로 인출액이 이자보다 크면 원금이 깎이기 시작하고, 그 뒤로는 이자도 함께 줄어 속도가 붙습니다.',
      note: '물가가 오르면 같은 금액으로 살 수 있는 것이 줄어듭니다. 실질 기준으로 보려면 이율에서 물가상승률을 뺀 값을 넣으세요.' },
    en: { title: 'How Long Savings Last', desc: 'How many years a lump sum lasts when you draw a fixed amount each month.',
      long: 'What remains keeps earning interest, so the money lasts longer than the lump sum divided by the withdrawal. Once the withdrawal exceeds the interest, though, the principal starts falling and the interest falls with it, so the decline accelerates.',
      note: 'Rising prices shrink what the same amount buys. To read the answer in today’s money, enter the return minus inflation.' },
  },

  /* ───────── 세금·정산 ───────── */
  {
    slug: 'marginal-tax-step',
    icon: '🪜',
    category: '세금·정산',
    fields: [
      { key: 'income', term: 'taxableAmt', unit: 'money', def: 55000000, min: 0 },
      { key: 'line', term: 'bracketLine', unit: 'money', def: 50000000, min: 0 },
      { key: 'low', term: 'baseRate', unit: 'percent', def: 15, min: 0, max: 100 },
      { key: 'high', term: 'appliedRate', unit: 'percent', def: 24, min: 0, max: 100 },
    ],
    formula: '{taxAmt} = min({taxableAmt}, {bracketLine}) × {baseRate}% + max(0, {taxableAmt} − {bracketLine}) × {appliedRate}%',
    compute: v => {
      const under = Math.min(v.income, v.line);
      const over = Math.max(0, v.income - v.line);
      const tax = (under * v.low + over * v.high) / 100;
      return [
        { term: 'taxAmt', unit: 'money', value: round(tax, 0), digits: 0, primary: true },
        { term: 'effRate', unit: 'percent', value: round(ratio(tax, v.income) * 100, 2), digits: 2 },
        { term: 'diff', unit: 'money', value: round((over * v.high) / 100, 0), digits: 0 },
      ];
    },
    ko: { title: '세율 구간을 넘으면 얼마나 더 내나', desc: '구간 경계를 넘긴 금액에만 높은 세율이 붙는다는 것을 숫자로 봅니다.',
      long: '구간을 넘겼다고 전체 소득에 높은 세율이 붙지 않습니다. 경계까지는 아래 세율, 넘긴 부분에만 위 세율이 붙습니다. 그래서 경계를 조금 넘겼다고 실수령이 줄어드는 일은 생기지 않습니다.',
      note: '실효세율은 항상 높은 세율보다 낮게 나옵니다. 세금 이야기에서 "몇 % 구간"이라고 할 때의 그 숫자는 넘긴 부분에만 붙는 한계세율입니다.' },
    en: { title: 'Crossing a Tax Bracket', desc: 'What actually changes when income passes a bracket threshold.',
      long: 'Passing a threshold does not apply the higher rate to everything. Income up to the line is taxed at the lower rate and only the part above it at the higher one, which is why earning slightly more never leaves you with less.',
      note: 'The effective rate always lands below the top rate. When people say they are “in the 24% bracket”, that figure is the marginal rate on the slice above the line.' },
  },

  /* ───────── 농도·배합 ───────── */
  {
    slug: 'coffee-ratio',
    icon: '☕',
    category: '농도·배합',
    fields: [
      { key: 'bean', term: 'beanG', unit: 'gram', def: 20, min: 0 },
      { key: 'ratio', term: 'brewRatio', unit: 'times', def: 15, min: 0, step: 0.5 },
    ],
    formula: '{brewWater} = {beanG} × {brewRatio}',
    compute: v => {
      const water = v.bean * v.ratio;
      // 원두가 머금고 놓아주지 않는 물이 1g당 약 2ml — 잔에 남는 양은 그만큼 줄어든다
      return [
        { term: 'brewWater', unit: 'ml', value: round(water, 0), digits: 0, primary: true },
        { term: 'volumeMl', unit: 'ml', value: round(Math.max(0, water - v.bean * 2), 0), digits: 0 },
      ];
    },
    ko: { title: '커피 원두와 물 비율 계산기', desc: '원두 무게와 1:15 같은 비율로 부을 물의 양을 구합니다.',
      long: '커피 비율은 원두 1g에 물 몇 ml를 붓느냐입니다. 1:15가 흔한 기준이고, 숫자가 작을수록 진해집니다. 물은 부피(ml)와 무게(g)가 거의 같아서 저울 하나로 잽니다.',
      note: '부은 물이 전부 잔에 오지는 않습니다. 원두가 1g당 2ml쯤을 머금기 때문에, 20g으로 300ml를 부으면 잔에는 260ml쯤 남습니다.' },
    en: { title: 'Coffee to Water Ratio Calculator', desc: 'How much water to pour for a given dose and brew ratio.',
      long: 'A brew ratio is millilitres of water per gram of coffee. Around 1:15 is the common starting point, and a smaller second number means a stronger cup. Water weighs almost exactly what it measures, so one scale does both jobs.',
      note: 'Not all the water reaches the cup. The grounds hold back roughly 2 mL per gram, so 20 g brewed with 300 mL yields about 260 mL.' },
  },
  {
    slug: 'serial-dilution',
    icon: '🧫',
    category: '농도·배합',
    fields: [
      { key: 'fold', term: 'foldRate', unit: 'times', def: 10, min: 0 },
      { key: 'steps', term: 'count', def: 3, min: 0, max: 20 },
      { key: 'start', term: 'concentration', unit: 'percent', def: 100, min: 0 },
    ],
    formula: '{totalFold} = {foldRate} ^ {count}',
    compute: v => {
      const total = v.fold > 0 ? v.fold ** v.steps : 0;
      const conc = ratio(v.start, total);
      return [
        { term: 'targetConc', unit: 'percent', value: round(conc, 6), digits: 6, primary: true },
        { term: 'totalFold', unit: 'times', value: round(total, 0), digits: 0 },
        { term: 'ppmValue', unit: 'none', value: round(conc * 10000, 2), digits: 2 },
      ];
    },
    ko: { title: '연속 희석 계산기', desc: '같은 배수로 여러 번 희석했을 때 남는 농도를 구합니다.',
      long: '한 번에 크게 희석하는 것보다 조금씩 여러 번 하는 편이 정확합니다. 10배씩 세 번이면 1000배가 되는데, 배수가 곱해지기 때문에 횟수가 하나만 늘어도 농도는 자릿수가 통째로 바뀝니다.',
      note: '단계마다 옮기는 양이 정확해야 합니다. 각 단계의 오차도 함께 곱해지므로, 세 번을 거치면 작은 실수가 세 배로 커집니다.' },
    en: { title: 'Serial Dilution Calculator', desc: 'The concentration left after diluting by the same factor several times.',
      long: 'Several small dilutions are more accurate than one large one. Ten-fold three times gives a thousand-fold, and because the factors multiply, one extra step moves the concentration by a whole order of magnitude.',
      note: 'Each transfer has to be measured carefully. Errors multiply along with the factors, so a small slip compounds across three steps.' },
  },

  /* ───────── 점수·달성 ───────── */
  {
    slug: 'curve-grade',
    icon: '🎓',
    category: '점수·달성',
    fields: [
      { key: 'score', term: 'score', unit: 'point', def: 72, min: 0, max: 100 },
      { key: 'avg', term: 'currentAvg', unit: 'point', def: 65, min: 0, max: 100 },
      { key: 'target', term: 'targetAvg', unit: 'point', def: 75, min: 0, max: 100 },
    ],
    formula: '{result} = {score} + ({targetAvg} − {currentAvg})',
    compute: v => {
      const shift = v.target - v.avg;
      const adjusted = Math.min(100, Math.max(0, v.score + shift));
      return [
        { term: 'result', unit: 'point', value: round(adjusted, 2), digits: 2, primary: true },
        { term: 'curveShift', unit: 'point', value: round(shift, 2), digits: 2 },
        { term: 'change', unit: 'percent', value: round(ratio(adjusted - v.score, v.score) * 100, 2), digits: 2 },
      ];
    },
    ko: { title: '상대평가 환산 점수 계산기', desc: '반 평균을 목표 평균에 맞춰 옮겼을 때 내 점수를 구합니다.',
      long: '가장 단순한 상대평가는 모두에게 같은 점수를 더하거나 빼서 평균을 맞추는 방식입니다. 순위는 그대로 두고 눈금만 옮기는 것이라, 등수가 바뀌지 않는다는 점이 이 방식의 특징입니다.',
      note: '100점이 상한이라 위쪽은 눌립니다. 만점 가까운 학생끼리 점수 차가 사라지므로, 상위권을 가려야 하는 시험에는 맞지 않습니다.' },
    en: { title: 'Grade Curve Calculator', desc: 'Your adjusted score when the class average is shifted to a target.',
      long: 'The simplest curve adds the same number of points to everyone so the average lands where it should. It moves the scale without touching the order, which is exactly why nobody’s rank changes.',
      note: 'The cap at 100 squeezes the top. Students near full marks end up tied, so this curve is a poor fit when the point of the exam is to separate the best.' },
  },
];
