/**
 * 비율 섹션 - 할인·가격 둘째 묶음 (10종)
 *
 * 첫 묶음이 "정가와 할인율" 같은 기본을 다뤘으니 여기는 실제로 장바구니 앞에서
 * 막히는 것들을 넣는다 — 1+1이 몇 % 할인인지, 무료배송까지 더 담는 게 이득인지,
 * 환전 창구에서 얼마를 떼였는지.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const PRICE2_TOOLS: FormulaTool[] = [
  {
    slug: 'triple-discount',
    icon: '🎟️',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'listPrice', unit: 'money', def: 100000, min: 0 },
      { key: 'a', term: 'percentA', unit: 'percent', def: 30, min: 0, max: 100 },
      { key: 'b', term: 'percentB', unit: 'percent', def: 20, min: 0, max: 100 },
      { key: 'c', term: 'percent', unit: 'percent', def: 10, min: 0, max: 100 },
    ],
    formula: '{finalPrice} = {listPrice} × (1 − {percentA} ÷ 100) × (1 − {percentB} ÷ 100) × (1 − {percent} ÷ 100)',
    compute: v => {
      const final = v.price * (1 - v.a / 100) * (1 - v.b / 100) * (1 - v.c / 100);
      return [
        { term: 'effDiscount', unit: 'percent', value: round((1 - ratio(final, v.price)) * 100, 1), digits: 1, primary: true },
        { term: 'finalPrice', unit: 'money', value: Math.round(final), digits: 0 },
        { term: 'discountAmt', unit: 'money', value: Math.round(v.price - final), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const sum = v.a + v.b + v.c;
      const real = out[0].value;
      return {
        ko: `더한 값 ${round(sum, 1)}%가 아니라 실제로는 ${real}% 깎입니다. 차이는 ${round(sum - real, 1)}%p입니다.`,
        en: `Not the ${round(sum, 1)}% you get by adding — the real cut is ${real}%, a gap of ${round(sum - real, 1)} points.`,
        l10n: {
          es: `No es el ${round(sum, 1)} % de sumarlos: la rebaja real es del ${real} %, una diferencia de ${round(sum - real, 1)} puntos.`,
          'pt-br': `Não são os ${round(sum, 1)} % de somar: o corte real é de ${real} %, uma diferença de ${round(sum - real, 1)} pontos.`,
          ja: `足した${round(sum, 1)}%ではなく、実際に引かれるのは${real}%です。差は${round(sum - real, 1)}ポイントあります。`,
          de: `Nicht die ${round(sum, 1)} % aus der Addition — der echte Abschlag liegt bei ${real} %, ${round(sum - real, 1)} Punkte Unterschied.`,
          fr: `Pas les ${round(sum, 1)} % de l’addition : la baisse réelle est de ${real} %, un écart de ${round(sum - real, 1)} points.`,
          hi: `जोड़कर आए ${round(sum, 1)}% नहीं — असल में ${real}% कटता है, ${round(sum - real, 1)} अंक का फ़र्क़।`,
        },
        tone: 'warn',
      };
    },
    ko: { title: '삼중 할인 계산기', desc: '할인을 세 번 겹쳐 받을 때 실제로 몇 % 깎이는지 계산합니다.',
      long: '할인이 겹칠 때는 매번 남은 금액에 적용되므로 30%+20%+10%은 60%가 아닙니다. 남는 비율끼리 곱해서 0.7 × 0.8 × 0.9 = 0.504, 즉 49.6% 할인입니다.',
      note: '쿠폰의 적용 순서가 결과를 바꾸는 경우는 정률 할인끼리는 없습니다. 다만 정액 쿠폰이 섞이면 순서에 따라 최종 금액이 달라집니다.' },
    en: { title: 'Stacked Discount (3 Coupons)', desc: 'Find the real percentage off when three discounts pile up.',
      long: 'Each discount applies to what is left, so 30% + 20% + 10% is not 60%. Multiply what survives: 0.7 × 0.8 × 0.9 = 0.504, which is 49.6% off.',
      note: 'With percentage discounts the order never changes the answer. Mix in a fixed-amount coupon and it suddenly does.' },
  },
  {
    slug: 'buy-x-get-y',
    icon: '🎁',
    category: '할인·가격',
    fields: [
      { key: 'pay', term: 'payCount', unit: 'piece', def: 2, min: 1 },
      { key: 'free', term: 'freeCount', unit: 'piece', def: 1, min: 0 },
      { key: 'price', term: 'price', unit: 'money', def: 3000, min: 0 },
    ],
    formula: '{effDiscount} = {freeCount} ÷ ({payCount} + {freeCount}) × 100',
    compute: v => {
      const got = v.pay + v.free;
      return [
        { term: 'effDiscount', unit: 'percent', value: round(ratio(v.free, got) * 100, 1), digits: 1, primary: true },
        { term: 'unitPrice', unit: 'money', value: Math.round(ratio(v.pay * v.price, got)), digits: 0 },
        { term: 'saveAmt', unit: 'money', value: Math.round(v.free * v.price), digits: 0 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `1+1은 50%, 2+1은 33.3% 할인입니다. 이 조건은 ${out[0].value}%입니다.`,
      en: `Buy-one-get-one is 50% off; two-for-three is 33.3%. This deal is ${out[0].value}%.`,
      l10n: {
        es: `Un 2x1 es un 50 % de descuento; un 3x2, un 33,3 %. Esta oferta es del ${out[0].value} %.`,
        'pt-br': `Leve 2 pague 1 é 50 % de desconto; leve 3 pague 2 é 33,3 %. Esta oferta dá ${out[0].value} %.`,
        ja: `1+1は50%引き、2+1は33.3%引きです。この条件は${out[0].value}%です。`,
        de: `Zwei zum Preis von einem sind 50 % Rabatt, drei für zwei sind 33,3 %. Dieses Angebot ergibt ${out[0].value} %.`,
        fr: `Un 2 pour 1, c’est 50 % de remise ; un 3 pour 2, 33,3 %. Cette offre fait ${out[0].value} %.`,
        hi: `दो पर एक मुफ़्त यानी 50% छूट; तीन पर दो यानी 33.3%। यह पेशकश ${out[0].value}% है।`,
      },
      tone: 'good',
    }),
    ko: { title: 'N+1 할인율 계산기', desc: '1+1, 2+1처럼 덤을 주는 행사가 몇 % 할인인지 계산합니다.',
      long: '무료로 받는 개수를 손에 들어오는 전체 개수로 나눕니다. 사는 개수로 나누면 안 됩니다 — 1+1을 100% 할인이라고 부르는 실수가 여기서 나옵니다.',
      note: '유통기한이 짧은 물건은 덤이 남아 버려지면 실질 할인율이 계산보다 낮아집니다. 다 쓸 수 있는지를 먼저 보세요.' },
    en: { title: 'Buy X Get Y Free', desc: 'Turn a “buy two get one free” offer into a plain percentage off.',
      long: 'Divide the free items by everything you carry home. Dividing by the items you paid for instead is how people end up calling BOGO “100% off”.',
      note: 'If the extra spoils before you use it, the real saving is smaller than the number. Check that you can finish it first.' },
  },
  {
    slug: 'cost-per-use',
    icon: '🧾',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 240000, min: 0 },
      { key: 'uses', term: 'count', unit: 'piece', def: 200, min: 1 },
      { key: 'months', term: 'months', unit: 'month', def: 24, min: 1 },
    ],
    formula: '{costPerUse} = {price} ÷ {count}',
    compute: v => [
      { term: 'costPerUse', unit: 'money', value: Math.round(ratio(v.price, v.uses)), digits: 0, primary: true },
      { term: 'costPerMonth', unit: 'money', value: Math.round(ratio(v.price, v.months)), digits: 0 },
      { term: 'costPerDay', unit: 'money', value: Math.round(ratio(v.price, v.months * 30)), digits: 0 },
    ],
    ko: { title: '1회당 비용 계산기', desc: '비싼 물건을 쓸 횟수로 나눠 한 번 쓰는 값을 봅니다.',
      long: '24만 원짜리를 200번 쓰면 한 번에 1,200원입니다. 가격표만 보면 비싼 쪽이 늘 손해로 보이지만, 오래 자주 쓰는 물건은 1회당 비용이 싼 물건보다 낮아지는 경우가 많습니다.',
      note: '쓸 횟수를 낙관적으로 넣으면 답이 예뻐집니다. 지난 1년에 실제로 몇 번 썼는지를 기준으로 넣으세요.' },
    en: { title: 'Cost per Use', desc: 'Divide a big purchase by the number of times you will actually use it.',
      long: 'Spend 240,000 and use it 200 times and each use costs 1,200. Price tags make the dearer option look worse, but for things used often the cost per use frequently lands below the cheap alternative.',
      note: 'Optimistic use counts make the answer flattering. Base the number on how many times you actually used one last year.' },
  },
  {
    slug: 'bundle-vs-single',
    icon: '📦',
    category: '할인·가격',
    fields: [
      { key: 'set', term: 'total', unit: 'money', def: 24000, min: 0 },
      { key: 'single', term: 'price', unit: 'money', def: 4500, min: 0 },
      { key: 'count', term: 'count', unit: 'piece', def: 6, min: 1 },
    ],
    formula: '{effDiscount} = (1 − {total} ÷ ({price} × {count})) × 100',
    compute: v => {
      const apart = v.single * v.count;
      return [
        { term: 'effDiscount', unit: 'percent', value: round((1 - ratio(v.set, apart)) * 100, 1), digits: 1, primary: true },
        { term: 'saveAmt', unit: 'money', value: Math.round(apart - v.set), digits: 0 },
        { term: 'unitPrice', unit: 'money', value: Math.round(ratio(v.set, v.count)), digits: 0 },
      ];
    },
    verdict: (_v, out) =>
      out[0].value >= 0
        ? { ko: `세트가 ${out[0].value}% 저렴합니다.`, en: `The bundle is ${out[0].value}% cheaper.`,
            l10n: { es: `El pack sale un ${out[0].value} % más barato.`, 'pt-br': `O pacote sai ${out[0].value} % mais barato.`, ja: `まとめ買いの方が${out[0].value}%安いです。`, de: `Das Bundle ist ${out[0].value} % günstiger.`, fr: `Le lot revient ${out[0].value} % moins cher.`, hi: `पैक ${out[0].value}% सस्ता पड़ता है।` }, tone: 'good' }
        : { ko: `세트가 오히려 ${Math.abs(out[0].value)}% 비쌉니다. 낱개로 사세요.`, en: `The bundle is actually ${Math.abs(out[0].value)}% dearer — buy singles.`,
            l10n: { es: `El pack sale un ${Math.abs(out[0].value)} % más caro: cómpralo suelto.`, 'pt-br': `O pacote sai ${Math.abs(out[0].value)} % mais caro: compre avulso.`, ja: `まとめ買いの方が${Math.abs(out[0].value)}%高くつきます。単品で買ってください。`, de: `Das Bundle ist sogar ${Math.abs(out[0].value)} % teurer — kauf einzeln.`, fr: `Le lot est en fait ${Math.abs(out[0].value)} % plus cher : prends à l’unité.`, hi: `पैक उलटा ${Math.abs(out[0].value)}% महँगा है — अलग-अलग ख़रीदें।` }, tone: 'bad' },
    ko: { title: '세트 vs 낱개 비교', desc: '묶음으로 사는 게 정말 싼지 낱개 가격과 견줍니다.',
      long: '낱개 가격에 개수를 곱해 따로 살 때의 금액을 만들고, 세트 가격을 그 값으로 나눕니다. 1에서 빼면 세트가 몇 % 싼지 나옵니다.',
      note: '세트가 더 비싼 경우가 드물지 않습니다. 특히 낱개가 할인 중일 때는 묶음이 정가 기준이라 역전됩니다.' },
    en: { title: 'Bundle vs Singles', desc: 'Check whether the multipack is actually cheaper than buying singles.',
      long: 'Multiply the single price by the count to get what buying separately costs, then divide the bundle price by it. One minus that is how much the bundle saves.',
      note: 'Bundles being dearer is not rare. When singles go on offer the multipack often stays at full price and loses.' },
  },
  {
    slug: 'free-shipping',
    icon: '🚚',
    category: '할인·가격',
    fields: [
      { key: 'cart', term: 'amount', unit: 'money', def: 32000, min: 0 },
      { key: 'min', term: 'freeShipMin', unit: 'money', def: 40000, min: 0 },
      { key: 'ship', term: 'shipFee', unit: 'money', def: 3500, min: 0 },
    ],
    formula: '{addBuy} = {freeShipMin} − {amount}',
    compute: v => {
      const add = Math.max(0, v.min - v.cart);
      return [
        { term: 'addBuy', unit: 'money', value: Math.round(add), digits: 0, primary: true },
        { term: 'effDiscount', unit: 'percent', value: add > 0 ? round(ratio(v.ship, add) * 100, 1) : 0, digits: 1 },
        { term: 'total', unit: 'money', value: Math.round(v.cart + (add > 0 ? v.ship : 0)), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const add = out[0].value;
      if (add === 0) return { ko: '이미 무료배송 기준을 넘었습니다.', en: 'You already clear the free-shipping bar.',
        l10n: { es: 'Ya superas el mínimo para el envío gratis.', 'pt-br': 'Você já passou do mínimo para o frete grátis.', ja: 'すでに送料無料の基準を超えています。', de: 'Du liegst schon über der Grenze für den Gratisversand.', fr: 'Tu dépasses déjà le seuil de livraison offerte.', hi: 'आप पहले ही मुफ़्त डिलीवरी की सीमा पार कर चुके हैं।' }, tone: 'good' };
      return add <= v.ship
        ? { ko: `${add}원어치를 더 담는 값이 배송비 ${v.ship}원보다 싸므로 더 담는 편이 이득입니다.`, en: `Adding ${add} costs less than the ${v.ship} shipping fee, so top up the basket.`,
            l10n: { es: `Añadir ${add} cuesta menos que los ${v.ship} de envío, así que completa el carrito.`, 'pt-br': `Colocar mais ${add} custa menos que os ${v.ship} de frete, então complete o carrinho.`, ja: `あと${add}分を買い足す方が送料${v.ship}より安いので、買い足す方が得です。`, de: `${add} nachzulegen kostet weniger als die ${v.ship} Versand — leg lieber nach.`, fr: `Ajouter ${add} coûte moins que les ${v.ship} de livraison : complète le panier.`, hi: `${add} और जोड़ना ${v.ship} की डिलीवरी से सस्ता है, इसलिए टोकरी भर लें।` }, tone: 'good' }
        : { ko: `배송비 ${v.ship}원보다 ${add - v.ship}원을 더 써야 합니다. 그냥 배송비를 내는 편이 낫습니다.`, en: `You would spend ${add - v.ship} more than the ${v.ship} fee — just pay the shipping.`,
            l10n: { es: `Gastarías ${add - v.ship} más que los ${v.ship} del envío: paga mejor el envío.`, 'pt-br': `Você gastaria ${add - v.ship} a mais que os ${v.ship} do frete: melhor pagar o frete.`, ja: `送料${v.ship}より${add - v.ship}多く使うことになります。素直に送料を払う方がよいです。`, de: `Du gäbst ${add - v.ship} mehr aus als die ${v.ship} Versand — zahl lieber den Versand.`, fr: `Tu dépenserais ${add - v.ship} de plus que les ${v.ship} de livraison : paie plutôt la livraison.`, hi: `${v.ship} की डिलीवरी से ${add - v.ship} ज़्यादा ख़र्च होगा — डिलीवरी शुल्क देना ही ठीक है।` }, tone: 'warn' };
    },
    ko: { title: '무료배송 채우기 계산기', desc: '배송비를 아끼려고 더 담는 게 이득인지 판단합니다.',
      long: '기준 금액에서 지금 담은 금액을 빼면 더 담아야 할 금액이 나옵니다. 그 값이 배송비보다 작으면 더 담는 쪽이 싸고, 크면 배송비를 내는 쪽이 쌉니다.',
      note: '"어차피 쓸 물건"일 때만 이득입니다. 기준을 맞추려고 안 쓸 물건을 담으면 배송비보다 큰 돈을 버리는 것입니다.' },
    en: { title: 'Free Shipping Top-Up', desc: 'Decide whether adding to your basket beats paying for delivery.',
      long: 'Subtract your basket from the threshold to see how much more you need. If that is less than the shipping fee, top up; if more, pay the fee.',
      note: 'This only works for things you would buy anyway. Padding the basket with items you will not use wastes more than the delivery charge.' },
  },
  {
    slug: 'membership-breakeven',
    icon: '🎫',
    category: '할인·가격',
    fields: [
      { key: 'fee', term: 'annualFee', unit: 'money', def: 35000, min: 0 },
      { key: 'normal', term: 'price', unit: 'money', def: 12000, min: 0 },
      { key: 'member', term: 'memberPrice', unit: 'money', def: 9000, min: 0 },
    ],
    formula: '{breakEvenCount} = {annualFee} ÷ ({price} − {memberPrice})',
    compute: v => {
      const gap = v.normal - v.member;
      const n = gap > 0 ? Math.ceil(ratio(v.fee, gap)) : 0;
      return [
        { term: 'breakEvenCount', unit: 'piece', value: n, digits: 0, primary: true },
        { term: 'saveAmt', unit: 'money', value: Math.round(gap), digits: 0 },
        { term: 'effDiscount', unit: 'percent', value: round(ratio(gap, v.normal) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) =>
      out[0].value > 0
        ? { ko: `연 ${out[0].value}번 이상 쓰면 회비를 뽑습니다. 그보다 적게 쓸 것 같으면 가입하지 않는 편이 낫습니다.`, en: `Use it ${out[0].value} times a year and the fee pays for itself; fewer than that and skip it.`,
            l10n: { es: `Úsalo ${out[0].value} veces al año y la cuota se amortiza; menos que eso y no compensa.`, 'pt-br': `Use ${out[0].value} vezes por ano e a anuidade se paga; menos que isso, não vale.`, ja: `年${out[0].value}回以上使えば会費の元が取れます。それより少なそうなら入らない方が得です。`, de: `Nutz es ${out[0].value} Mal im Jahr, dann trägt sich die Gebühr; seltener lohnt es nicht.`, fr: `Utilise-le ${out[0].value} fois par an et la cotisation est amortie ; moins que ça, laisse tomber.`, hi: `साल में ${out[0].value} बार इस्तेमाल करें तो शुल्क वसूल हो जाता है; उससे कम हो तो न लें।` }, tone: 'good' }
        : { ko: '회원가가 일반가보다 싸지 않아 회비를 회수할 수 없습니다.', en: 'The member price is not lower, so the fee never comes back.',
            l10n: { es: 'El precio de socio no es más bajo, así que la cuota no se recupera nunca.', 'pt-br': 'O preço de sócio não é menor, então a anuidade nunca volta.', ja: '会員価格が通常価格より安くないので、会費を回収できません。', de: 'Der Mitgliederpreis liegt nicht darunter, die Gebühr kommt also nie zurück.', fr: 'Le prix adhérent n’est pas plus bas : la cotisation ne sera jamais rentabilisée.', hi: 'सदस्य क़ीमत सामान्य से कम नहीं है, इसलिए शुल्क कभी वसूल नहीं होगा।' }, tone: 'bad' },
    ko: { title: '유료 멤버십 손익분기 계산기', desc: '연회비를 뽑으려면 몇 번을 써야 하는지 계산합니다.',
      long: '한 번 쓸 때 아끼는 금액은 일반가에서 회원가를 뺀 값입니다. 연회비를 그 값으로 나누면 본전이 되는 횟수가 나오고, 나머지가 있으면 한 번을 더 써야 하므로 올림합니다.',
      note: '무료배송·적립처럼 돈으로 환산되는 혜택이 더 있으면 회당 절약액에 더해 계산하세요.' },
    en: { title: 'Paid Membership Break-Even', desc: 'How many uses it takes before the annual fee pays for itself.',
      long: 'Each use saves the normal price minus the member price. Divide the annual fee by that to get the break-even count, rounding up because a partial use does not count.',
      note: 'If the membership also gives free delivery or points, add their cash value to the per-use saving before dividing.' },
  },
  {
    slug: 'exchange-spread',
    icon: '💱',
    category: '할인·가격',
    fields: [
      { key: 'base', term: 'baseRate', unit: 'none', def: 1380, min: 0 },
      { key: 'applied', term: 'appliedRate', unit: 'none', def: 1404, min: 0 },
      { key: 'amount', term: 'amount', unit: 'none', def: 1000, min: 0 },
    ],
    formula: '{spread} = ({appliedRate} − {baseRate}) ÷ {baseRate} × 100',
    compute: v => [
      { term: 'spread', unit: 'percent', value: round(ratio(v.applied - v.base, v.base) * 100, 2), digits: 2, primary: true },
      { term: 'feeAmt', unit: 'none', value: Math.round((v.applied - v.base) * v.amount), digits: 0 },
      { term: 'total', unit: 'none', value: Math.round(v.applied * v.amount), digits: 0 },
    ],
    verdict: (_v, out) => {
      const s = out[0].value;
      return s <= 0.5
        ? { ko: `스프레드 ${s}%는 좋은 조건입니다.`, en: `A ${s}% spread is a good deal.`,
            l10n: { es: `Un diferencial del ${s} % es una buena condición.`, 'pt-br': `Um spread de ${s} % é uma boa condição.`, ja: `スプレッド${s}%は良い条件です。`, de: `Eine Spanne von ${s} % ist ein gutes Angebot.`, fr: `Un écart de ${s} % est une bonne condition.`, hi: `${s}% का अंतर अच्छी शर्त है।` }, tone: 'good' }
        : s <= 2
          ? { ko: `스프레드 ${s}%는 보통 수준입니다.`, en: `A ${s}% spread is about average.`,
              l10n: { es: `Un diferencial del ${s} % está en la media.`, 'pt-br': `Um spread de ${s} % está na média.`, ja: `スプレッド${s}%は標準的な水準です。`, de: `Eine Spanne von ${s} % ist durchschnittlich.`, fr: `Un écart de ${s} % se situe dans la moyenne.`, hi: `${s}% का अंतर औसत स्तर का है।` }, tone: 'warn' }
          : { ko: `스프레드 ${s}%는 비쌉니다. 다른 창구를 알아보세요.`, en: `A ${s}% spread is expensive — shop around.`,
              l10n: { es: `Un diferencial del ${s} % es caro: mira en otro sitio.`, 'pt-br': `Um spread de ${s} % é caro: procure em outro lugar.`, ja: `スプレッド${s}%は高いです。ほかの窓口も当たってみてください。`, de: `Eine Spanne von ${s} % ist teuer — vergleich woanders.`, fr: `Un écart de ${s} % est cher : regarde ailleurs.`, hi: `${s}% का अंतर महँगा है — कहीं और देखें।` }, tone: 'bad' };
    },
    ko: { title: '환전 스프레드 계산기', desc: '적용 환율이 기준 환율보다 몇 % 나쁜지, 수수료가 얼마인지 계산합니다.',
      long: '"수수료 없음"이라고 적어 두고 환율에 얹는 곳이 많습니다. 적용 환율에서 기준 환율을 빼고 기준 환율로 나누면 그 숨은 수수료가 비율로 드러납니다.',
      note: '기준 환율은 은행 고시의 매매기준율이나 시장 중간 환율을 쓰세요. 살 때 환율과 팔 때 환율을 비교하면 스프레드가 두 배로 나옵니다.' },
    en: { title: 'Currency Exchange Spread', desc: 'See how far the rate you were given sits from the mid-market rate.',
      long: 'Plenty of places advertise “no commission” and bury the charge in the rate. Subtract the mid-market rate from the rate you got and divide by the mid rate to expose it.',
      note: 'Use the mid-market rate as the base. Comparing a buy rate against a sell rate double-counts the spread.' },
  },
  {
    slug: 'resale-value',
    icon: '📉',
    category: '할인·가격',
    fields: [
      { key: 'buy', term: 'buyPrice', unit: 'money', def: 1200000, min: 0 },
      { key: 'rate', term: 'depreciation', unit: 'percent', def: 25, min: 0, max: 100 },
      { key: 'years', term: 'years', unit: 'year', def: 3, min: 0, max: 30 },
    ],
    formula: '{nowValue} = {buyPrice} × (1 − {depreciation} ÷ 100) ^ {years}',
    compute: v => {
      const now = v.buy * Math.pow(1 - v.rate / 100, v.years);
      return [
        { term: 'nowValue', unit: 'money', value: Math.round(now), digits: 0, primary: true },
        { term: 'lossRate', unit: 'percent', value: round((1 - ratio(now, v.buy)) * 100, 1), digits: 1 },
        { term: 'diff', unit: 'money', value: Math.round(v.buy - now), digits: 0 },
      ];
    },
    ko: { title: '중고 가치 감가 계산기', desc: '해마다 일정 비율로 값이 떨어질 때 지금 가치를 계산합니다.',
      long: '감가는 남은 가치에 붙으므로 25%씩 3년이면 75%가 아니라 0.75의 세제곱, 즉 처음 값의 42%가 남습니다. 전자기기와 차량이 이 곡선을 따릅니다.',
      note: '실제 중고 시세는 새 모델 출시 시점에 계단식으로 꺾입니다. 이 계산은 매끄러운 평균선이라 출시 직전·직후에는 잘 안 맞습니다.' },
    en: { title: 'Resale Value Depreciation', desc: 'What something is worth after losing a fixed share of its value each year.',
      long: 'Depreciation eats what is left, so 25% a year for three years leaves 0.75 cubed — 42% of the original, not 25%. Electronics and cars follow this curve.',
      note: 'Real second-hand prices step down when a new model lands. This smooth average misses those cliffs just before and after a launch.' },
  },
  {
    slug: 'max-discount',
    icon: '🛡️',
    category: '할인·가격',
    fields: [
      { key: 'cost', term: 'cost', unit: 'money', def: 6000, min: 0 },
      { key: 'price', term: 'listPrice', unit: 'money', def: 12000, min: 0 },
      { key: 'floor', term: 'minMargin', unit: 'percent', def: 20, min: 0, max: 99 },
    ],
    formula: '{maxDiscount} = (1 − {cost} ÷ ((1 − {minMargin} ÷ 100) × {listPrice})) × 100',
    compute: v => {
      // 이익률을 지키는 최저 판매가 = 원가 ÷ (1 − 이익률)
      const minPrice = ratio(v.cost, 1 - v.floor / 100);
      const maxOff = (1 - ratio(minPrice, v.price)) * 100;
      return [
        { term: 'maxDiscount', unit: 'percent', value: round(Math.max(0, maxOff), 1), digits: 1, primary: true },
        { term: 'salePrice', unit: 'money', value: Math.round(minPrice), digits: 0 },
        { term: 'profit', unit: 'money', value: Math.round(minPrice - v.cost), digits: 0 },
      ];
    },
    verdict: (_v, out) =>
      out[0].value > 0
        ? { ko: `${out[0].value}%까지 깎아도 목표 이익률이 지켜집니다.`, en: `You can go to ${out[0].value}% off and still hold the margin.`,
            l10n: { es: `Puedes bajar hasta un ${out[0].value} % y aun así mantener el margen.`, 'pt-br': `Dá para chegar a ${out[0].value} % de desconto e ainda segurar a margem.`, ja: `${out[0].value}%まで引いても目標の利益率は守れます。`, de: `Du kannst bis ${out[0].value} % nachlassen und die Marge trotzdem halten.`, fr: `Tu peux descendre jusqu’à ${out[0].value} % de remise et garder la marge.`, hi: `${out[0].value}% तक छूट देकर भी लक्ष्य मार्जिन बचा रहता है।` }, tone: 'good' }
        : { ko: '정가가 낮아 목표 이익률을 지키면서 할인할 여지가 없습니다.', en: 'The list price is too low to discount at all and keep that margin.',
            l10n: { es: 'El precio de lista es demasiado bajo para descontar nada y mantener ese margen.', 'pt-br': 'O preço de tabela é baixo demais para dar qualquer desconto e manter essa margem.', ja: '定価が低く、目標の利益率を守りながら値引きする余地がありません。', de: 'Der Listenpreis ist zu niedrig, um überhaupt nachzulassen und diese Marge zu halten.', fr: 'Le prix affiché est trop bas pour accorder la moindre remise en gardant cette marge.', hi: 'सूची मूल्य इतना कम है कि यह मार्जिन बचाते हुए कोई छूट नहीं दी जा सकती।' }, tone: 'bad' },
    ko: { title: '최대 할인율 계산기', desc: '목표 이익률을 지키면서 줄 수 있는 최대 할인율을 구합니다.',
      long: '이익률을 지키는 최저 판매가는 원가를 (1 − 이익률)로 나눈 값입니다. 그 값이 정가의 몇 %인지 보고 1에서 빼면 줄 수 있는 할인율이 나옵니다.',
      note: '이익률은 판매가 기준입니다. 원가 기준(마크업)으로 20%를 지키려면 최저가가 달라지므로 어느 기준인지 먼저 확인하세요.' },
    en: { title: 'Discount Ceiling', desc: 'The deepest discount you can give and still keep your target margin.',
      long: 'The lowest price that holds a margin is cost divided by (1 − margin). Work out what share of the list price that is, and one minus it is the discount you can afford.',
      note: 'This margin is measured on the sale price. Holding 20% as a markup on cost gives a different floor, so check which one you mean.' },
  },
  {
    slug: 'installment-vs-lump',
    icon: '💳',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 1200000, min: 0 },
      { key: 'off', term: 'percent', unit: 'percent', def: 5, min: 0, max: 100 },
      { key: 'months', term: 'installMonths', unit: 'month', def: 12, min: 1, max: 60 },
      { key: 'save', term: 'annualRate', unit: 'percent', def: 3, min: 0, max: 30 },
    ],
    formula: '{diff} = {price} × {percent} ÷ 100 − {price} × {annualRate} ÷ 100 × {installMonths} ÷ 24',
    compute: v => {
      const lumpSave = v.price * (v.off / 100);
      // 할부로 미룬 돈의 평균 잔액은 원금의 절반 — 그 돈을 예금에 두면 붙는 이자
      const interestEarned = v.price * (v.save / 100) * (v.months / 12) / 2;
      return [
        { term: 'diff', unit: 'money', value: Math.round(lumpSave - interestEarned), digits: 0, primary: true },
        { term: 'saveAmt', unit: 'money', value: Math.round(lumpSave), digits: 0 },
        { term: 'interest', unit: 'money', value: Math.round(interestEarned), digits: 0 },
        { term: 'monthlyPay', unit: 'money', value: Math.round(ratio(v.price, v.months)), digits: 0 },
      ];
    },
    verdict: (_v, out) =>
      out[0].value >= 0
        ? { ko: `일시불이 ${out[0].value}원 유리합니다.`, en: `Paying in full wins by ${out[0].value}.`,
            l10n: { es: `Pagar de una vez sale mejor por ${out[0].value}.`, 'pt-br': `Pagar à vista sai melhor em ${out[0].value}.`, ja: `一括払いの方が${out[0].value}分だけ有利です。`, de: `Sofort zu zahlen ist um ${out[0].value} besser.`, fr: `Payer comptant l’emporte de ${out[0].value}.`, hi: `एकमुश्त देना ${out[0].value} बेहतर पड़ता है।` }, tone: 'good' }
        : { ko: `무이자 할부가 ${Math.abs(out[0].value)}원 유리합니다.`, en: `The interest-free instalments win by ${Math.abs(out[0].value)}.`,
            l10n: { es: `Las cuotas sin intereses salen mejor por ${Math.abs(out[0].value)}.`, 'pt-br': `O parcelado sem juros sai melhor em ${Math.abs(out[0].value)}.`, ja: `無金利分割の方が${Math.abs(out[0].value)}分だけ有利です。`, de: `Die zinsfreien Raten sind um ${Math.abs(out[0].value)} besser.`, fr: `Les mensualités sans frais l’emportent de ${Math.abs(out[0].value)}.`, hi: `बिना ब्याज किस्तें ${Math.abs(out[0].value)} बेहतर पड़ती हैं।` }, tone: 'good' },
    ko: { title: '일시불 할인 vs 무이자 할부', desc: '일시불 할인과 무이자 할부 중 어느 쪽이 이득인지 비교합니다.',
      long: '일시불로 아끼는 돈은 가격 × 할인율입니다. 할부로 미룬 돈은 예금에 둘 수 있는데, 잔액이 매달 줄어 평균이 원금의 절반이므로 이자도 절반만 붙습니다. 두 값을 견주면 됩니다.',
      note: '무이자 할부가 카드사 혜택·적립을 깎는 조건이면 그만큼을 이자 쪽에서 빼야 합니다. 할부 원금이 다음 달 지출을 밀어내는지도 함께 보세요.' },
    en: { title: 'Pay in Full vs Interest-Free Instalments', desc: 'Compare an upfront discount against spreading the cost for free.',
      long: 'Paying in full saves price × discount. Deferring lets the money sit in savings, but the balance falls each month so the average is half the principal and the interest is halved too. Compare the two figures.',
      note: 'If interest-free instalments forfeit cashback or points, subtract that from the interest side. Also check whether the instalments crowd out next month’s spending.' },
  },
  {
    slug: 'price-per-weight',
    icon: '⚖️',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 12, min: 0 },
      { key: 'kg', term: 'weightKg', unit: 'kg', def: 1.5, min: 0 },
    ],
    formula: '{unitPrice} = {price} ÷ {weightKg}',
    compute: v => [
      { term: 'unitPrice', unit: 'money', value: round(ratio(v.price, v.kg), 2), digits: 2, primary: true },
    ],
    ko: { title: '무게당 가격 비교', desc: '값과 무게로 1kg당 얼마인지 내어 크기가 다른 상품을 견줍니다.',
      long: '봉지 크기가 제각각이면 붙은 값만으로는 어느 쪽이 싼지 알 수 없습니다. 값을 무게로 나눠 같은 자로 재야 비교가 됩니다.',
      note: '큰 봉지가 늘 싸지는 않습니다. 다 먹지 못하고 버리면 실제로 낸 값은 계산보다 비쌉니다.' },
    en: { title: 'Price per Kilogram', desc: 'Divide price by weight to compare packs of different sizes on the same footing.',
      long: 'When pack sizes differ, the price on the label tells you nothing about which is cheaper. Dividing by weight puts them on one ruler.',
      note: 'The big pack is not always the better deal — anything you throw away raises what you actually paid per kilogram.' },
  },
  {
    slug: 'shipping-per-item',
    icon: '📦',
    category: '할인·가격',
    fields: [
      { key: 'price', term: 'price', unit: 'money', def: 30, min: 0 },
      { key: 'count', term: 'count', unit: 'piece', def: 3, min: 0 },
      { key: 'ship', term: 'shipFee', unit: 'money', def: 3, min: 0 },
    ],
    formula: '{unitPrice} = ({price} + {shipFee}) ÷ {count}',
    compute: v => {
      const total = v.price + v.ship;
      return [
        { term: 'unitPrice', unit: 'money', value: round(ratio(total, v.count), 2), digits: 2, primary: true },
        { term: 'total', unit: 'money', value: round(total, 2), digits: 2 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.ship, total) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '배송비까지 넣은 개당 값', desc: '배송비를 개수로 나눠 실제로 개당 얼마를 내는지 봅니다.',
      long: '배송비는 개수와 상관없이 한 번 붙으므로, 적게 살수록 개당 부담이 커집니다. 값에 배송비를 더하고 개수로 나눠야 진짜 개당 값입니다.',
      note: '배송비가 차지하는 비율이 크면 조금 더 사서 나누는 편이 쌉니다 — 다 쓸 물건일 때만 그렇습니다.' },
    en: { title: 'Real Price per Item with Shipping', desc: 'Spread the delivery fee across the items to see what each one really costs.',
      long: 'Shipping is charged once no matter how many you buy, so the fewer you order the heavier it weighs on each item. Add the fee to the price and divide by the count for the true unit cost.',
      note: 'When shipping is a large share, buying a few more and spreading it is cheaper — but only for things you will actually use.' },
  },
];
