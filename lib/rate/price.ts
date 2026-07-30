/**
 * 비율 섹션 - 할인·가격 (10종)
 *
 * formula 문자열의 {키}는 TERMS에서 언어별 라벨로 치환되므로 공식도 3언어가 자동이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const PRICE_TOOLS: FormulaTool[] = [
  /* ───────── 할인·가격 ───────── */
  {
    slug: 'discount',
    icon: '🏷️',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'listPrice', unit: 'money', def: 39000, min: 0 },
      { key: 'rate', term: 'percent', unit: 'percent', def: 30, min: 0, max: 100 },
    ],
    formula: '{finalPrice} = {listPrice} × (1 − {percent} ÷ 100)',
    compute: v => {
      const final = v.price * (1 - v.rate / 100);
      return [
        { term: 'finalPrice', unit: 'money', value: Math.round(final), digits: 0, primary: true },
        { term: 'discountAmt', unit: 'money', value: Math.round(v.price - final), digits: 0 },
      ];
    },
    ko: { title: '할인율 계산기', desc: '정가와 할인율로 최종 가격과 할인액을 구합니다.',
      long: '30% 할인이라는 말은 정가의 70%를 낸다는 뜻입니다. 정가에 (100 − 할인율)을 곱해 100으로 나누면 낼 돈이 나오고, 정가에서 그 값을 빼면 아낀 돈이 됩니다.',
      note: '할인 후 가격에 다시 할인을 얹는 이중 할인은 두 할인율을 더한 것보다 적게 깎입니다.' },
    en: { title: 'Discount Calculator', desc: 'Find the final price and how much you save from a list price and a percentage off.',
      long: '30% off means you pay 70% of the list price. Multiply the price by (100 − rate) and divide by 100 to get what you pay; the rest is what you keep.',
      note: 'Stacking a second discount on the reduced price saves less than adding the two percentages together.' },
  },
  {
    slug: 'discount-rate',
    icon: '📊',
    category: '할인·가격',
    fields: [
      { key: 'list', term: 'listPrice', unit: 'money', def: 50000, min: 0 },
      { key: 'sale', term: 'salePrice', unit: 'money', def: 35000, min: 0 },
    ],
    formula: '{percent} = ({listPrice} − {salePrice}) ÷ {listPrice} × 100',
    compute: v => [
      { term: 'percent', unit: 'percent', value: round(ratio(v.list - v.sale, v.list) * 100, 1), digits: 1, primary: true },
      { term: 'discountAmt', unit: 'money', value: Math.round(v.list - v.sale), digits: 0 },
    ],
    ko: { title: '할인율 역산', desc: '정가와 판매가만 알 때 몇 % 할인인지 계산합니다.',
      long: '깎인 금액을 정가로 나누면 할인율입니다. 판매가로 나누면 안 됩니다 — 그러면 실제보다 큰 숫자가 나옵니다.',
      note: '5만 원이 3만 5천 원이면 30% 할인입니다. 1만 5천 원을 3만 5천 원으로 나눈 42.9%는 할인율이 아닙니다.' },
    en: { title: 'Reverse Discount', desc: 'Work out the percentage off when you only know the list price and the sale price.',
      long: 'Divide the amount taken off by the list price. Dividing by the sale price instead inflates the number.',
      note: '50 down to 35 is 30% off. The 42.9% you get by dividing 15 by 35 is a markup, not a discount.' },
  },
  {
    slug: 'double-discount',
    icon: '🎫',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'listPrice', unit: 'money', def: 100000, min: 0 },
      { key: 'first', term: 'percent', unit: 'percent', def: 30, min: 0, max: 100 },
      { key: 'second', term: 'rate', unit: 'percent', def: 20, min: 0, max: 100 },
    ],
    formula: '{finalPrice} = {listPrice} × (1 − {percent}/100) × (1 − {rate}/100)',
    compute: v => {
      const final = v.price * (1 - v.first / 100) * (1 - v.second / 100);
      return [
        { term: 'finalPrice', unit: 'money', value: Math.round(final), digits: 0, primary: true },
        { term: 'percent', unit: 'percent', value: round(ratio(v.price - final, v.price) * 100, 1), digits: 1 },
        { term: 'discountAmt', unit: 'money', value: Math.round(v.price - final), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const real = out[1].value;
      const naive = v.first + v.second;
      const gap = round(naive - real, 1);
      return {
        ko: `더한 값 ${naive}%가 아니라 실제로는 ${real}% 할인입니다 — ${gap}%p 차이납니다.`,
        en: `The real discount is ${real}%, not the ${naive}% you get by adding — a gap of ${gap} points.`,
        l10n: {
          es: `El descuento real es del ${real} %, no el ${naive} % de sumarlos — una diferencia de ${gap} puntos.`,
          'pt-br': `O desconto real é de ${real} %, e não os ${naive} % de somar — uma diferença de ${gap} pontos.`,
          ja: `実際は${real}%引きで、足した${naive}%ではありません。差は${gap}ポイントです。`,
          de: `Der echte Rabatt liegt bei ${real} %, nicht bei den ${naive} % aus der Addition — ${gap} Punkte Unterschied.`,
          fr: `La remise réelle est de ${real} %, pas les ${naive} % de l’addition — un écart de ${gap} points.`,
          hi: `असली छूट ${real}% है, जोड़कर आए ${naive}% नहीं — ${gap} अंक का फ़र्क़।`,
        },
        tone: 'warn',
      };
    },
    ko: { title: '이중 할인 계산기', desc: '30% 할인 후 추가 20% 쿠폰을 적용하면 실제 몇 % 할인인지 계산합니다.',
      long: '두 할인을 연달아 적용하면 두 번째 할인은 이미 깎인 금액에만 붙습니다. 그래서 30%+20%는 50%가 아니라 44%입니다.',
      note: '순서를 바꿔도 최종 가격은 같습니다. 곱셈이라 순서가 결과를 바꾸지 않습니다.' },
    en: { title: 'Stacked Discount', desc: 'See the true percentage off when a coupon is applied on top of an already reduced price.',
      long: 'The second discount only applies to what is left after the first, so 30% plus 20% is 44% off, not 50%.',
      note: 'Swapping the order changes nothing — it is multiplication, so the final price is identical either way.' },
  },
  {
    slug: 'coupon-vs-percent',
    icon: '⚖️',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'amount', unit: 'money', def: 45000, min: 0 },
      { key: 'coupon', term: 'discountAmt', unit: 'money', def: 10000, min: 0 },
      { key: 'rate', term: 'percent', unit: 'percent', def: 20, min: 0, max: 100 },
    ],
    formula: '{discountAmt} vs {amount} × {percent} ÷ 100',
    compute: v => {
      const byRate = v.price * (v.rate / 100);
      return [
        { term: 'discountAmt', unit: 'money', value: Math.round(Math.max(v.coupon, byRate)), digits: 0, primary: true },
        { term: 'diff', unit: 'money', value: Math.round(Math.abs(v.coupon - byRate)), digits: 0 },
      ];
    },
    verdict: v => {
      const byRate = v.price * (v.rate / 100);
      const couponWins = v.coupon > byRate;
      const even = Math.round(ratio(v.coupon, v.rate / 100));
      return {
        ko: couponWins
          ? `정액 쿠폰이 유리합니다. ${even.toLocaleString()}원부터는 ${v.rate}% 할인이 역전합니다.`
          : `${v.rate}% 할인이 유리합니다. ${even.toLocaleString()}원 아래에서는 정액 쿠폰이 낫습니다.`,
        en: couponWins
          ? `The fixed coupon wins here. Above ${even.toLocaleString()}, the ${v.rate}% discount takes over.`
          : `The ${v.rate}% discount wins here. Below ${even.toLocaleString()}, the fixed coupon is better.`,
        l10n: {
          es: couponWins
            ? `Aquí gana el cupón fijo. A partir de ${even.toLocaleString()}, se impone el ${v.rate} % de descuento.`
            : `Aquí gana el ${v.rate} % de descuento. Por debajo de ${even.toLocaleString()}, es mejor el cupón fijo.`,
          'pt-br': couponWins
            ? `Aqui ganha o cupom fixo. Acima de ${even.toLocaleString()}, o desconto de ${v.rate} % passa na frente.`
            : `Aqui ganha o desconto de ${v.rate} %. Abaixo de ${even.toLocaleString()}, o cupom fixo é melhor.`,
          ja: couponWins
            ? `ここでは定額クーポンが有利です。${even.toLocaleString()}を超えると${v.rate}%引きが逆転します。`
            : `ここでは${v.rate}%引きが有利です。${even.toLocaleString()}を下回ると定額クーポンの方がよくなります。`,
          de: couponWins
            ? `Hier gewinnt der feste Gutschein. Ab ${even.toLocaleString()} übernimmt der Rabatt von ${v.rate} %.`
            : `Hier gewinnt der Rabatt von ${v.rate} %. Unter ${even.toLocaleString()} ist der feste Gutschein besser.`,
          fr: couponWins
            ? `Ici, le bon fixe l’emporte. Au-delà de ${even.toLocaleString()}, la remise de ${v.rate} % prend le dessus.`
            : `Ici, la remise de ${v.rate} % l’emporte. En dessous de ${even.toLocaleString()}, le bon fixe est meilleur.`,
          hi: couponWins
            ? `यहाँ तय कूपन बेहतर है। ${even.toLocaleString()} से ऊपर ${v.rate}% छूट आगे निकल जाती है।`
            : `यहाँ ${v.rate}% छूट बेहतर है। ${even.toLocaleString()} से नीचे तय कूपन बेहतर पड़ता है।`,
        },
        tone: 'good',
      };
    },
    ko: { title: '정액 쿠폰 vs 정률 할인', desc: '1만 원 쿠폰과 20% 할인 중 어느 쪽이 더 싼지 비교합니다.',
      long: '정액 쿠폰은 금액이 작을 때, 정률 할인은 금액이 클 때 유리합니다. 두 값이 같아지는 금액이 갈림길입니다.',
      note: '쿠폰에 최소 주문 금액이나 최대 할인 한도가 붙어 있으면 그 조건을 먼저 확인하세요.' },
    en: { title: 'Fixed Coupon vs Percent Off', desc: 'Compare a flat-amount coupon against a percentage discount to see which saves more.',
      long: 'A flat coupon wins on small baskets and a percentage wins on large ones. The break-even point is where the two are equal.',
      note: 'Check the coupon terms first — minimum spend and maximum discount caps often decide it for you.' },
  },
  {
    slug: 'markup',
    icon: '📈',
    category: '할인·가격',
    fields: [
      { key: 'cost', term: 'cost', unit: 'money', def: 12000, min: 0 },
      { key: 'rate', term: 'markup', unit: 'percent', def: 40, min: 0 },
    ],
    formula: '{salePrice} = {cost} × (1 + {markup} ÷ 100)',
    compute: v => {
      const price = v.cost * (1 + v.rate / 100);
      return [
        { term: 'salePrice', unit: 'money', value: Math.round(price), digits: 0, primary: true },
        { term: 'profit', unit: 'money', value: Math.round(price - v.cost), digits: 0 },
        { term: 'marginRate', unit: 'percent', value: round(ratio(price - v.cost, price) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '마크업 판매가', desc: '원가에 마진을 얹어 판매가를 정합니다.',
      long: '원가 대비 40%를 얹으면 판매가는 원가의 1.4배입니다. 다만 이때 매출 대비 이익률은 40%가 아니라 28.6%입니다.',
      note: '원가 대비 마크업과 매출 대비 이익률은 다른 숫자입니다. 둘을 섞으면 남는 돈을 과대평가합니다.' },
    en: { title: 'Markup Pricing', desc: 'Set a selling price by adding a markup percentage to your cost.',
      long: 'A 40% markup makes the price 1.4× cost. Note the margin on revenue is then 28.6%, not 40%.',
      note: 'Markup on cost and margin on revenue are different numbers. Confusing them overstates what you actually keep.' },
  },
  {
    slug: 'margin',
    icon: '💰',
    category: '할인·가격',
    fields: [
      { key: 'cost', term: 'cost', unit: 'money', def: 12000, min: 0 },
      { key: 'price', term: 'salePrice', unit: 'money', def: 20000, min: 0 },
    ],
    formula: '{marginRate} = ({salePrice} − {cost}) ÷ {salePrice} × 100',
    compute: v => [
      { term: 'marginRate', unit: 'percent', value: round(ratio(v.price - v.cost, v.price) * 100, 1), digits: 1, primary: true },
      { term: 'profit', unit: 'money', value: Math.round(v.price - v.cost), digits: 0 },
      { term: 'markup', unit: 'percent', value: round(ratio(v.price - v.cost, v.cost) * 100, 1), digits: 1 },
    ],
    ko: { title: '이익률 계산기', desc: '원가와 판매가로 이익, 매출 이익률, 원가 대비 마크업을 한 번에 봅니다.',
      long: '같은 이익 8천 원이라도 매출로 나누면 40%, 원가로 나누면 66.7%입니다. 어느 쪽을 말하는지가 늘 문제입니다.',
      note: '유통 채널 수수료와 카드 수수료를 원가에 넣지 않으면 실제 이익률은 여기보다 낮습니다.' },
    en: { title: 'Profit Margin Calculator', desc: 'Get profit, margin on revenue, and markup on cost from a cost and a selling price.',
      long: 'The same 8,000 profit is 40% of revenue but 66.7% of cost. Which one is meant is almost always the real question.',
      note: 'Leave marketplace fees and card fees out of your cost and the real margin will be lower than this.' },
  },
  {
    slug: 'margin-price',
    icon: '🎯',
    category: '할인·가격',
    fields: [
      { key: 'cost', term: 'cost', unit: 'money', def: 12000, min: 0 },
      { key: 'target', term: 'marginRate', unit: 'percent', def: 35, min: 0, max: 99 },
    ],
    formula: '{salePrice} = {cost} ÷ (1 − {marginRate} ÷ 100)',
    compute: v => {
      const price = ratio(v.cost, 1 - v.target / 100);
      return [
        { term: 'salePrice', unit: 'money', value: Math.round(price), digits: 0, primary: true },
        { term: 'profit', unit: 'money', value: Math.round(price - v.cost), digits: 0 },
      ];
    },
    ko: { title: '목표 이익률 판매가', desc: '원하는 매출 이익률을 맞추려면 얼마에 팔아야 하는지 역산합니다.',
      long: '이익률 35%를 원하면 원가에 35%를 더하는 게 아니라 원가를 0.65로 나눕니다. 더하기로 계산하면 목표에 못 미칩니다.',
      note: '이익률은 100%에 닿을 수 없습니다. 목표를 90% 이상 넣으면 판매가가 급격히 커집니다.' },
    en: { title: 'Price for Target Margin', desc: 'Work backwards from the margin you want to the price you need to charge.',
      long: 'For a 35% margin you divide cost by 0.65 — you do not add 35% to cost. Adding falls short of the target.',
      note: 'Margin can never reach 100%. Push the target past 90% and the required price climbs very fast.' },
  },
  {
    slug: 'breakeven',
    icon: '🧮',
    category: '할인·가격',
    fields: [
      { key: 'fixed', term: 'amount', unit: 'money', def: 3000000, min: 0 },
      { key: 'price', term: 'price', unit: 'money', def: 15000, min: 0 },
      { key: 'variable', term: 'cost', unit: 'money', def: 6000, min: 0 },
    ],
    formula: '{count} = {amount} ÷ ({price} − {cost})',
    compute: v => {
      const contribution = v.price - v.variable;
      const qty = contribution > 0 ? Math.ceil(ratio(v.fixed, contribution)) : 0;
      return [
        { term: 'count', value: qty, digits: 0, primary: true },
        { term: 'profit', unit: 'money', value: Math.round(contribution), digits: 0 },
        { term: 'total', unit: 'money', value: Math.round(qty * v.price), digits: 0 },
      ];
    },
    verdict: v => v.price <= v.variable ? {
      ko: '단가가 변동비보다 낮아 팔수록 손실이 커집니다. 손익분기점이 존재하지 않습니다.',
      en: 'The price is below the variable cost, so every sale deepens the loss — there is no break-even point.',
      l10n: {
        es: 'El precio está por debajo del coste variable, así que cada venta agranda la pérdida: no hay punto de equilibrio.',
        'pt-br': 'O preço está abaixo do custo variável, então cada venda aumenta o prejuízo: não existe ponto de equilíbrio.',
        ja: '単価が変動費を下回っているので、売るほど損が増えます。損益分岐点は存在しません。',
        de: 'Der Preis liegt unter den variablen Kosten, jeder Verkauf vergrößert also den Verlust — einen Break-even gibt es nicht.',
        fr: 'Le prix est sous le coût variable : chaque vente creuse la perte, il n’y a pas de seuil de rentabilité.',
        hi: 'क़ीमत परिवर्तनशील लागत से नीचे है, इसलिए हर बिक्री घाटा बढ़ाती है — कोई बराबरी का बिंदु नहीं है।',
      },
      tone: 'bad',
    } : null,
    ko: { title: '손익분기점 수량', desc: '고정비를 메우려면 몇 개를 팔아야 하는지 계산합니다.',
      long: '단가에서 변동비를 뺀 값이 한 개 팔 때 남는 돈입니다. 고정비를 그 값으로 나누면 본전을 찾는 수량이 나옵니다.',
      note: '임대료·인건비처럼 매달 나가는 돈이 고정비, 재료·포장처럼 개당 붙는 돈이 변동비입니다.' },
    en: { title: 'Break-Even Units', desc: 'How many units you must sell to cover your fixed costs.',
      long: 'Price minus variable cost is what each sale contributes. Divide fixed costs by that to get the units needed to break even.',
      note: 'Rent and salaries are fixed costs; materials and packaging that scale per unit are variable costs.' },
  },
  {
    slug: 'unit-price',
    icon: '🛒',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 8900, min: 0 },
      { key: 'amount', term: 'volumeMl', def: 500, min: 0.01 },
    ],
    formula: '{result} = {price} ÷ {volumeMl} × 100',
    compute: v => [
      { term: 'result', unit: 'money', value: round(ratio(v.price, v.amount) * 100, 1), digits: 1, primary: true },
      { term: 'price', unit: 'money', value: round(ratio(v.price, v.amount), 2), digits: 2 },
    ],
    ko: { title: '100g당 가격', desc: '용량이 다른 상품의 단위당 가격을 맞춰 비교합니다.',
      long: '큰 통이 항상 싸지는 않습니다. 가격을 용량으로 나눠 100 단위로 맞추면 어느 쪽이 실제로 싼지 바로 보입니다.',
      note: '묶음 상품은 총 용량으로 넣어야 합니다. 200ml 3개면 600을 넣습니다.' },
    en: { title: 'Price per 100g', desc: 'Compare products of different sizes on the same per-unit basis.',
      long: 'The bigger tub is not always cheaper. Divide price by size and normalise to 100 units and the real winner is obvious.',
      note: 'For multipacks, enter the total volume — three 200 mL bottles means 600.' },
  },
  {
    slug: 'price-increase',
    icon: '⬆️',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 4500, min: 0 },
      { key: 'rate', term: 'percent', unit: 'percent', def: 8, min: -100 },
    ],
    formula: '{after} = {price} × (1 + {percent} ÷ 100)',
    compute: v => {
      const after = v.price * (1 + v.rate / 100);
      return [
        { term: 'after', unit: 'money', value: Math.round(after), digits: 0, primary: true },
        { term: 'diff', unit: 'money', value: Math.round(after - v.price), digits: 0 },
      ];
    },
    ko: { title: '가격 인상 계산기', desc: '인상률을 적용한 뒤 가격과 오르는 금액을 봅니다.',
      long: '인상률을 100으로 나눠 1을 더한 값을 곱하면 인상 후 가격입니다. 음수를 넣으면 인하 계산이 됩니다.',
      note: '10% 올린 뒤 10% 내려도 원래 가격으로 돌아오지 않습니다. 기준이 달라졌기 때문입니다.' },
    en: { title: 'Price Increase', desc: 'Apply a percentage increase and see the new price and the difference.',
      long: 'Multiply by 1 plus the rate over 100. Enter a negative rate and it becomes a price cut.',
      note: 'Up 10% then down 10% does not return to the original — the base changed in between.' },
  },
];
