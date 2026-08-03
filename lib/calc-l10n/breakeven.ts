import type { CalcTable } from './types.ts';

/**
 * 손익분기점 — 투자 쪽과 사업 쪽 둘 다.
 *
 * 한국어판은 증권거래세 0.18%를 체크박스로 박아 두었다. 거래세는 나라마다
 * 있고 없고가 갈리고 세율도 제각각이라, 여기서는 그냥 % 입력으로 두고
 * 기본값을 0으로 뒀다.
 */
export const BREAKEVEN: CalcTable = {
  en: {
    title: 'Break-even calculator',
    desc: 'The price that gets you back to even, and the number of units that clears fixed costs',
    short: 'Break-even price · break-even volume',
    intro: [
      {
        h: 'Selling at your buy price is a loss',
        p: 'You pay a fee going in, another going out, and in some markets a transaction tax on top. Sell at exactly what you paid and all of that comes out of your pocket. The true break-even sits a little above your entry price, and this works out where.',
      },
      {
        h: 'The shorter the trade, the heavier the cost',
        p: 'The cost of a single round trip looks trivial. Do it fifty times and it is charged fifty times, out of gains that are only a few percent each. Frequent trading is the setting in which fees quietly eat the entire edge.',
      },
      {
        h: 'For a business it is fixed costs ÷ contribution',
        p: 'Selling price minus variable cost is the contribution margin — what each unit sold puts towards the fixed costs. Divide the fixed costs by it and you get the volume at which you stop losing money. When the margin is thin, no amount of volume fixes it, and the answer lies in the price or the cost instead.',
      },
    ],
    faq: [
      { q: 'Why is the break-even price above what I paid?', a: 'Because the fees are charged on both sides. You already paid the buying fee, and the selling fee plus any transaction tax comes off the proceeds — so the sale has to cover both before you are level.' },
      { q: 'What should I put in the transaction tax field?', a: 'Whatever your market charges on a sale, as a percentage. Many markets charge nothing, in which case leave it at zero.' },
      { q: 'Why does a small contribution margin make the volume explode?', a: 'Because it is the denominator. Halve the margin and the units needed double. That is why raising the price or cutting the variable cost usually beats trying to sell more.' },
    ],
    ui: {
      tabInvest: 'Break-even price', tabBiz: 'Break-even volume',
      buyPrice: 'Purchase price', buyFee: 'Buying fee (%)', sellFee: 'Selling fee (%)',
      txTax: 'Transaction tax on sale (%)',
      note: 'Transaction tax starts at 0 — many markets charge none. Enter yours if it applies.',
      fixedCost: 'Fixed costs per period', unitPrice: 'Selling price per unit', unitCost: 'Variable cost per unit',
      calc: 'Calculate',
      bepPrice: 'Break-even price', needRise: 'Needs a rise of',
      bepQty: 'Break-even volume', bepSales: 'Revenue at break-even', contribution: 'Contribution per unit',
      units: 'units',
    },
  },
  es: {
    title: 'Calculadora de punto de equilibrio',
    desc: 'El precio al que recuperas lo invertido y las unidades que cubren los costes fijos',
    short: 'Precio de equilibrio · unidades de equilibrio',
    intro: [
      {
        h: 'Vender al precio de compra es perder',
        p: 'Pagas una comisión al entrar, otra al salir y, en algunos mercados, un impuesto sobre la operación. Si vendes exactamente a lo que pagaste, todo eso sale de tu bolsillo. El punto de equilibrio real queda algo por encima del precio de entrada, y aquí se calcula dónde.',
      },
      {
        h: 'Cuanto más corta la operación, más pesan los costes',
        p: 'El coste de una compra-venta parece insignificante. Repítelo cincuenta veces y se cobra cincuenta veces, sobre ganancias de apenas un pequeño porcentaje cada una. Operar a menudo es justo el escenario en el que las comisiones se comen toda la ventaja.',
      },
      {
        h: 'En un negocio es costes fijos ÷ margen de contribución',
        p: 'El precio de venta menos el coste variable es el margen de contribución: lo que cada unidad vendida aporta a cubrir los costes fijos. Divide los costes fijos entre él y obtienes el volumen a partir del cual dejas de perder. Si el margen es pequeño, ningún volumen lo arregla y la respuesta está en el precio o en el coste.',
      },
    ],
    faq: [
      { q: '¿Por qué el precio de equilibrio está por encima del que pagué?', a: 'Porque las comisiones se cobran en las dos puntas. La de compra ya la pagaste, y la de venta más el impuesto salen del importe recibido, así que la venta tiene que cubrir ambas antes de estar en tablas.' },
      { q: '¿Qué pongo en el campo de impuesto sobre la operación?', a: 'Lo que cobre tu mercado en una venta, en porcentaje. Muchos mercados no cobran nada; en ese caso déjalo en cero.' },
      { q: '¿Por qué un margen pequeño dispara el volumen necesario?', a: 'Porque es el denominador. Si el margen se reduce a la mitad, las unidades necesarias se duplican. Por eso subir el precio o bajar el coste variable suele funcionar mejor que intentar vender más.' },
    ],
    ui: {
      tabInvest: 'Precio de equilibrio', tabBiz: 'Unidades de equilibrio',
      buyPrice: 'Precio de compra', buyFee: 'Comisión de compra (%)', sellFee: 'Comisión de venta (%)',
      txTax: 'Impuesto sobre la venta (%)',
      note: 'El impuesto empieza en 0: muchos mercados no lo cobran. Pon el tuyo si aplica.',
      fixedCost: 'Costes fijos del periodo', unitPrice: 'Precio de venta por unidad', unitCost: 'Coste variable por unidad',
      calc: 'Calcular',
      bepPrice: 'Precio de equilibrio', needRise: 'Necesita subir',
      bepQty: 'Unidades de equilibrio', bepSales: 'Ventas en el equilibrio', contribution: 'Contribución por unidad',
      units: 'unidades',
    },
  },
  'pt-br': {
    title: 'Calculadora de ponto de equilíbrio',
    desc: 'O preço que devolve o que você pagou e a quantidade que cobre os custos fixos',
    short: 'Preço de equilíbrio · quantidade de equilíbrio',
    intro: [
      {
        h: 'Vender pelo preço de compra é prejuízo',
        p: 'Você paga taxa na entrada, outra na saída e, em alguns mercados, ainda um imposto sobre a operação. Vendendo exatamente pelo que pagou, tudo isso sai do seu bolso. O equilíbrio de verdade fica um pouco acima do preço de entrada, e é isso que a conta aqui encontra.',
      },
      {
        h: 'Quanto mais curta a operação, mais pesa o custo',
        p: 'O custo de uma ida e volta parece insignificante. Faça isso cinquenta vezes e ele é cobrado cinquenta vezes, em cima de ganhos de poucos por cento cada. Operar com frequência é justamente o cenário em que as taxas comem toda a vantagem.',
      },
      {
        h: 'No negócio é custo fixo ÷ margem de contribuição',
        p: 'Preço de venda menos custo variável é a margem de contribuição — o que cada unidade vendida devolve para cobrir os custos fixos. Divida os custos fixos por ela e você tem a quantidade a partir da qual para de perder. Com margem magra, nenhum volume resolve: a resposta está no preço ou no custo.',
      },
    ],
    faq: [
      { q: 'Por que o preço de equilíbrio fica acima do que paguei?', a: 'Porque as taxas incidem nas duas pontas. A da compra você já pagou, e a da venda mais o imposto saem do valor recebido — a venda precisa cobrir as duas antes de você empatar.' },
      { q: 'O que coloco no campo de imposto sobre a operação?', a: 'O que o seu mercado cobra na venda, em porcentagem. Muitos mercados não cobram nada; nesse caso deixe zero.' },
      { q: 'Por que uma margem pequena faz a quantidade explodir?', a: 'Porque ela é o denominador. Corte a margem pela metade e a quantidade necessária dobra. Por isso subir o preço ou reduzir o custo variável costuma render mais do que tentar vender mais.' },
    ],
    ui: {
      tabInvest: 'Preço de equilíbrio', tabBiz: 'Quantidade de equilíbrio',
      buyPrice: 'Preço de compra', buyFee: 'Taxa de compra (%)', sellFee: 'Taxa de venda (%)',
      txTax: 'Imposto sobre a venda (%)',
      note: 'O imposto começa em 0 — muitos mercados não cobram. Informe o seu se houver.',
      fixedCost: 'Custos fixos do período', unitPrice: 'Preço de venda por unidade', unitCost: 'Custo variável por unidade',
      calc: 'Calcular',
      bepPrice: 'Preço de equilíbrio', needRise: 'Precisa subir',
      bepQty: 'Quantidade de equilíbrio', bepSales: 'Receita no equilíbrio', contribution: 'Contribuição por unidade',
      units: 'unidades',
    },
  },
  ja: {
    title: '損益分岐点の計算機',
    desc: '売っても損しない価格と、固定費をまかなう販売数量',
    short: '分岐価格と分岐数量',
    intro: [
      {
        h: '買値で売ったら損です',
        p: '買うときに手数料、売るときにも手数料、市場によってはさらに取引税がかかります。買った値段でそのまま売れば、その全部が自腹です。本当の分岐点は買値より少し上にあり、ここではその位置を出します。',
      },
      {
        h: '短い売買ほど費用が重くのしかかります',
        p: '一往復の費用は小さく見えます。五十回やれば五十回ぶん取られ、しかも一回の利益は数%です。売買を頻繁にするときこそ、手数料が利益を静かに食い尽くします。',
      },
      {
        h: '事業では固定費 ÷ 限界利益',
        p: '販売価格から変動費を引いたものが限界利益、1個売るたびに固定費を返していく取り分です。固定費をこれで割れば、赤字を抜ける数量が出ます。限界利益が薄いといくら売っても届かないので、数量より先に価格か原価を見る話になります。',
      },
    ],
    faq: [
      { q: '分岐価格が買値より高いのはなぜですか。', a: '手数料が往復で二度かかるからです。買いの手数料はすでに払い、売りの手数料と取引税は受取額から引かれます。売値はその両方を賄って初めて差し引きゼロです。' },
      { q: '取引税の欄には何を入れますか。', a: 'その市場が売却時に課す率を%で入れてください。課さない市場も多く、その場合は0のままで構いません。' },
      { q: '限界利益が小さいと必要数量が跳ね上がるのはなぜですか。', a: '割る側にいるからです。限界利益が半分になれば必要数量は倍になります。売る数を増やすより、価格を上げるか原価を下げるほうが効きやすいのはこのためです。' },
    ],
    ui: {
      tabInvest: '分岐価格', tabBiz: '分岐数量',
      buyPrice: '買付価格', buyFee: '買付手数料 (%)', sellFee: '売却手数料 (%)',
      txTax: '売却時の取引税 (%)',
      note: '取引税の初期値は0です。課さない市場も多いので、必要な場合だけ入れてください。',
      fixedCost: '期間あたりの固定費', unitPrice: '1個あたりの販売価格', unitCost: '1個あたりの変動費',
      calc: '計算する',
      bepPrice: '損益分岐価格', needRise: '必要な上昇率',
      bepQty: '損益分岐数量', bepSales: '分岐点の売上', contribution: '1個あたりの限界利益',
      units: '個',
    },
  },
  de: {
    title: 'Break-even-Rechner',
    desc: 'Der Kurs, bei dem Sie wieder bei null sind, und die Stückzahl, die die Fixkosten deckt',
    short: 'Break-even-Kurs · Break-even-Menge',
    intro: [
      {
        h: 'Zum Einstandskurs verkaufen heißt verlieren',
        p: 'Eine Gebühr beim Kauf, eine beim Verkauf und in manchen Märkten noch eine Transaktionssteuer. Verkaufen Sie genau zum Kaufkurs, zahlen Sie all das aus eigener Tasche. Der echte Break-even liegt ein Stück über dem Einstand — hier steht, wo genau.',
      },
      {
        h: 'Je kürzer der Trade, desto schwerer die Kosten',
        p: 'Die Kosten einer einzelnen Runde wirken belanglos. Machen Sie es fünfzigmal, wird fünfzigmal abgerechnet — von Gewinnen, die je nur wenige Prozent betragen. Gerade beim häufigen Handeln fressen Gebühren den Vorteil leise auf.',
      },
      {
        h: 'Im Betrieb: Fixkosten ÷ Deckungsbeitrag',
        p: 'Verkaufspreis minus variable Kosten ergibt den Deckungsbeitrag — den Anteil, mit dem jedes verkaufte Stück die Fixkosten abträgt. Die Fixkosten dadurch geteilt ergibt die Menge, ab der die Verluste enden. Ist der Beitrag dünn, hilft keine Menge, und die Antwort liegt beim Preis oder bei den Kosten.',
      },
    ],
    faq: [
      { q: 'Warum liegt der Break-even über meinem Kaufkurs?', a: 'Weil Gebühren auf beiden Seiten anfallen. Die Kaufgebühr ist schon bezahlt, Verkaufsgebühr und Steuer gehen vom Erlös ab — der Verkauf muss beides tragen, bevor Sie bei null stehen.' },
      { q: 'Was gehört ins Feld für die Transaktionssteuer?', a: 'Was Ihr Markt beim Verkauf erhebt, in Prozent. Viele Märkte erheben nichts; dann bleibt das Feld bei null.' },
      { q: 'Warum explodiert die Menge bei kleinem Deckungsbeitrag?', a: 'Weil er im Nenner steht. Halbiert er sich, verdoppelt sich die nötige Stückzahl. Deshalb bringt ein höherer Preis oder ein niedrigerer Stückkosten meist mehr als der Versuch, mehr zu verkaufen.' },
    ],
    ui: {
      tabInvest: 'Break-even-Kurs', tabBiz: 'Break-even-Menge',
      buyPrice: 'Kaufkurs', buyFee: 'Kaufgebühr (%)', sellFee: 'Verkaufsgebühr (%)',
      txTax: 'Transaktionssteuer beim Verkauf (%)',
      note: 'Die Steuer beginnt bei 0 — viele Märkte erheben keine. Tragen Sie Ihre ein, falls zutreffend.',
      fixedCost: 'Fixkosten je Periode', unitPrice: 'Verkaufspreis je Stück', unitCost: 'Variable Kosten je Stück',
      calc: 'Berechnen',
      bepPrice: 'Break-even-Kurs', needRise: 'Nötiger Anstieg',
      bepQty: 'Break-even-Menge', bepSales: 'Umsatz am Break-even', contribution: 'Deckungsbeitrag je Stück',
      units: 'Stück',
    },
  },
  fr: {
    title: 'Calculateur de seuil de rentabilité',
    desc: 'Le prix qui vous ramène à l’équilibre et le nombre d’unités qui couvre les charges fixes',
    short: 'Prix d’équilibre · volume d’équilibre',
    intro: [
      {
        h: 'Revendre à son prix d’achat, c’est perdre',
        p: 'Des frais à l’entrée, des frais à la sortie et, sur certains marchés, une taxe sur la transaction. Vendre exactement au prix payé, c’est régler tout cela de sa poche. Le vrai seuil se situe un peu au-dessus du prix d’entrée : voici où.',
      },
      {
        h: 'Plus l’opération est courte, plus les frais pèsent',
        p: 'Le coût d’un aller-retour paraît dérisoire. Répétez-le cinquante fois et il est prélevé cinquante fois, sur des gains de quelques pour cent chacun. Le trading fréquent est précisément le cadre où les frais avalent tout l’avantage.',
      },
      {
        h: 'Pour une activité : charges fixes ÷ marge sur coûts variables',
        p: 'Prix de vente moins coût variable donne la marge sur coûts variables — ce que chaque unité vendue rembourse des charges fixes. Divisez les charges fixes par cette marge et vous obtenez le volume à partir duquel les pertes cessent. Si la marge est mince, aucun volume n’y suffit : la réponse est dans le prix ou dans le coût.',
      },
    ],
    faq: [
      { q: 'Pourquoi le seuil est-il au-dessus de mon prix d’achat ?', a: 'Parce que les frais s’appliquent des deux côtés. Ceux de l’achat sont déjà payés, ceux de la vente et la taxe sont retirés du produit — la vente doit couvrir les deux avant que vous soyez à l’équilibre.' },
      { q: 'Que mettre dans le champ de la taxe sur transaction ?', a: 'Ce que votre marché prélève à la vente, en pourcentage. Beaucoup de marchés ne prélèvent rien : laissez alors zéro.' },
      { q: 'Pourquoi une marge faible fait-elle exploser le volume ?', a: 'Parce qu’elle est au dénominateur. Divisez la marge par deux et le nombre d’unités double. C’est pourquoi augmenter le prix ou réduire le coût variable rapporte en général plus que de chercher à vendre davantage.' },
    ],
    ui: {
      tabInvest: 'Prix d’équilibre', tabBiz: 'Volume d’équilibre',
      buyPrice: 'Prix d’achat', buyFee: 'Frais d’achat (%)', sellFee: 'Frais de vente (%)',
      txTax: 'Taxe sur la vente (%)',
      note: 'La taxe démarre à 0 : beaucoup de marchés n’en prélèvent pas. Saisissez la vôtre le cas échéant.',
      fixedCost: 'Charges fixes de la période', unitPrice: 'Prix de vente unitaire', unitCost: 'Coût variable unitaire',
      calc: 'Calculer',
      bepPrice: 'Prix d’équilibre', needRise: 'Hausse nécessaire',
      bepQty: 'Volume d’équilibre', bepSales: 'Chiffre d’affaires au seuil', contribution: 'Marge unitaire',
      units: 'unités',
    },
  },
  hi: {
    title: 'ब्रेक-ईवन कैलकुलेटर',
    desc: 'वह भाव जिस पर आप बराबरी पर आते हैं, और वह मात्रा जो स्थिर लागत निकाल दे',
    short: 'बराबरी का भाव · बराबरी की मात्रा',
    intro: [
      {
        h: 'ख़रीद भाव पर बेचना घाटा है',
        p: 'ख़रीदते समय शुल्क, बेचते समय फिर शुल्क, और कुछ बाज़ारों में ऊपर से लेन-देन कर। जिस भाव पर लिया था उसी पर बेच दिया, तो यह सब आपकी जेब से जाता है। असली बराबरी का भाव ख़रीद भाव से थोड़ा ऊपर होता है — यहाँ वही निकलता है।',
      },
      {
        h: 'सौदा जितना छोटा, लागत उतनी भारी',
        p: 'एक बार आने-जाने का ख़र्च मामूली लगता है। पचास बार कीजिए तो पचास बार कटता है, और हर बार का मुनाफ़ा कुछ ही प्रतिशत होता है। बार-बार सौदा करने में ही शुल्क चुपचाप पूरा फ़ायदा खा जाते हैं।',
      },
      {
        h: 'कारोबार में: स्थिर लागत ÷ अंशदान मार्जिन',
        p: 'बिक्री मूल्य में से परिवर्तनीय लागत घटाइए — यही अंशदान मार्जिन है, यानी हर बिकी इकाई स्थिर लागत में कितना लौटाती है। स्थिर लागत को इससे भाग दीजिए, वह मात्रा मिल जाएगी जहाँ घाटा ख़त्म होता है। मार्जिन पतला हो तो कितनी भी बिक्री काम नहीं आती; जवाब क़ीमत या लागत में है।',
      },
    ],
    faq: [
      { q: 'बराबरी का भाव मेरी ख़रीद से ऊपर क्यों है?', a: 'क्योंकि शुल्क दोनों तरफ़ लगता है। ख़रीद का शुल्क आप दे चुके हैं, और बिक्री का शुल्क तथा कर मिलने वाली रकम से कटते हैं — बिक्री को पहले दोनों निकालने हैं, तभी बराबरी होगी।' },
      { q: 'लेन-देन कर के खाने में क्या डालूँ?', a: 'आपका बाज़ार बिक्री पर जो लेता है, प्रतिशत में। कई बाज़ारों में कुछ नहीं लगता; तब इसे शून्य ही रहने दें।' },
      { q: 'मार्जिन छोटा होते ही ज़रूरी मात्रा इतनी क्यों बढ़ जाती है?', a: 'क्योंकि वह हर में है। मार्जिन आधा हो तो ज़रूरी इकाइयाँ दोगुनी। इसीलिए ज़्यादा बेचने की कोशिश से बेहतर अक्सर क़ीमत बढ़ाना या परिवर्तनीय लागत घटाना होता है।' },
    ],
    ui: {
      tabInvest: 'बराबरी का भाव', tabBiz: 'बराबरी की मात्रा',
      buyPrice: 'ख़रीद भाव', buyFee: 'ख़रीद शुल्क (%)', sellFee: 'बिक्री शुल्क (%)',
      txTax: 'बिक्री पर लेन-देन कर (%)',
      note: 'कर शून्य से शुरू है — कई बाज़ारों में लगता ही नहीं। लागू हो तो अपना डालें।',
      fixedCost: 'अवधि की स्थिर लागत', unitPrice: 'प्रति इकाई बिक्री मूल्य', unitCost: 'प्रति इकाई परिवर्तनीय लागत',
      calc: 'गणना करें',
      bepPrice: 'बराबरी का भाव', needRise: 'ज़रूरी बढ़त',
      bepQty: 'बराबरी की मात्रा', bepSales: 'बराबरी पर बिक्री', contribution: 'प्रति इकाई अंशदान',
      units: 'इकाइयाँ',
    },
  },
  'zh-hans': {
    title: '盈亏平衡计算器',
    desc: '回本所需的价格，以及覆盖固定成本所需的销量',
    short: '回本价 · 平衡销量',
    intro: [
      {
        h: '按买入价卖出就是亏',
        p: '买的时候一笔手续费，卖的时候又一笔，有些市场还要交易税。原价卖出，这些全从自己口袋里出。真正的回本价比买入价高一点，这里算的就是高多少。',
      },
      {
        h: '交易越短，成本越沉',
        p: '一次来回的成本看着不起眼。做五十次就收五十次，而每次的利润不过几个百分点。频繁交易正是手续费悄悄吃掉全部优势的场景。',
      },
      {
        h: '做生意则是固定成本 ÷ 边际贡献',
        p: '售价减去变动成本就是边际贡献——每卖一件为固定成本还上的那部分。固定成本除以它，就得到不再亏钱的销量。边际贡献太薄时，卖多少都补不上，答案要到价格或成本里去找。',
      },
    ],
    faq: [
      { q: '为什么回本价比我的买入价高？', a: '因为手续费两头都收。买入的费你已经付了，卖出的费加上交易税要从卖得的钱里扣——卖价得先把这两笔覆盖掉，才算不赔不赚。' },
      { q: '交易税那一栏填什么？', a: '填你所在市场卖出时收取的比例。很多市场根本不收，那就留 0。' },
      { q: '边际贡献一小，所需销量为什么暴涨？', a: '因为它在分母上。边际贡献减半，需要的件数就翻倍。所以提价或压低变动成本，通常比想办法多卖更有效。' },
    ],
    ui: {
      tabInvest: '回本价', tabBiz: '平衡销量',
      buyPrice: '买入价格', buyFee: '买入手续费 (%)', sellFee: '卖出手续费 (%)',
      txTax: '卖出交易税 (%)',
      note: '交易税默认是 0——很多市场并不收取。适用时再填。',
      fixedCost: '每期固定成本', unitPrice: '单件售价', unitCost: '单件变动成本',
      calc: '计算',
      bepPrice: '盈亏平衡价', needRise: '所需涨幅',
      bepQty: '盈亏平衡销量', bepSales: '平衡点销售额', contribution: '单件边际贡献',
      units: '件',
    },
  },
  'zh-hant': {
    title: '損益兩平計算機',
    desc: '回本所需的價格，以及涵蓋固定成本所需的銷量',
    short: '回本價 · 兩平銷量',
    intro: [
      {
        h: '按買進價賣出就是虧',
        p: '買的時候一筆手續費，賣的時候又一筆，有些市場還要交易稅。原價賣出，這些全從自己口袋裡出。真正的回本價比買進價高一點，這裡算的就是高多少。',
      },
      {
        h: '交易越短，成本越沉',
        p: '一次來回的成本看著不起眼。做五十次就收五十次，而每次的利潤不過幾個百分點。頻繁交易正是手續費悄悄吃掉全部優勢的場景。',
      },
      {
        h: '做生意則是固定成本 ÷ 邊際貢獻',
        p: '售價減去變動成本就是邊際貢獻——每賣一件為固定成本還上的那部分。固定成本除以它，就得到不再虧錢的銷量。邊際貢獻太薄時，賣多少都補不上，答案要到價格或成本裡去找。',
      },
    ],
    faq: [
      { q: '為什麼回本價比我的買進價高？', a: '因為手續費兩頭都收。買進的費你已經付了，賣出的費加上交易稅要從賣得的錢裡扣——賣價得先把這兩筆涵蓋掉，才算不賠不賺。' },
      { q: '交易稅那一欄填什麼？', a: '填你所在市場賣出時收取的比例。很多市場根本不收，那就留 0。' },
      { q: '邊際貢獻一小，所需銷量為什麼暴增？', a: '因為它在分母上。邊際貢獻減半，需要的件數就翻倍。所以提價或壓低變動成本，通常比想辦法多賣更有效。' },
    ],
    ui: {
      tabInvest: '回本價', tabBiz: '兩平銷量',
      buyPrice: '買進價格', buyFee: '買進手續費 (%)', sellFee: '賣出手續費 (%)',
      txTax: '賣出交易稅 (%)',
      note: '交易稅預設是 0——很多市場並不收取。適用時再填。',
      fixedCost: '每期固定成本', unitPrice: '單件售價', unitCost: '單件變動成本',
      calc: '計算',
      bepPrice: '損益兩平價', needRise: '所需漲幅',
      bepQty: '損益兩平銷量', bepSales: '兩平點銷售額', contribution: '單件邊際貢獻',
      units: '件',
    },
  },
};
