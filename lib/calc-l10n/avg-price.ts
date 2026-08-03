import type { CalcTable } from './types.ts';

/** 평균단가 — 가중평균이라는 사실만 알면 되는 계산이라 나라를 타지 않는다. */
export const AVG_PRICE: CalcTable = {
  en: {
    title: 'Average cost calculator',
    desc: 'Weighted average price across several purchases, plus unrealised gain or loss',
    short: 'Weighted average of your buys',
    intro: [
      {
        h: 'Averaging the prices gives the wrong answer',
        p: 'Average cost is total spent ÷ total units, not the mean of the prices you paid. Buy 10 units at 100 and 90 units at 50 and the prices average to 75, while your actual average cost is 55. The number is pulled towards wherever the quantity is.',
      },
      {
        h: 'Quantity, not price, decides how far the average moves',
        p: 'Adding a small position after a fall barely shifts the average. If you already hold 100 units, buying 10 more gives the new price less than a tenth of the weight. Moving the average meaningfully takes a purchase comparable to what you already hold — and that scales the risk up by the same factor.',
      },
      {
        h: 'A lower average is not the same as a smaller loss',
        p: 'Buying more on the way down lowers your break-even price, not the money you are down. Since the total invested has grown, the same percentage fall now costs you more. This tool works out the average; whether the purchase was wise is a separate question. Fees and tax are not included, so your true break-even sits slightly above the figure here.',
      },
    ],
    faq: [
      { q: 'Why is my average cost not halfway between my two buy prices?', a: 'Because the two buys were for different quantities. The average sits closer to the price at which you bought more units, in exact proportion to those quantities.' },
      { q: 'Does selling part of the position change the average?', a: 'Under the weighted-average method, no — selling reduces the units but leaves the average cost per unit as it was. Some tax regimes require FIFO instead, which does change the cost basis of what remains.' },
      { q: 'How do I include fees?', a: 'Add them into the price you enter, spread over the units in that purchase. Kept outside, the average shown will be slightly optimistic.' },
    ],
    ui: {
      section: 'Your purchases', price: 'Price', qty: 'Quantity', add: '+ Add a purchase',
      current: 'Current price (optional)', calc: 'Calculate',
      avgPrice: 'Average cost', totalQty: 'units', totalCost: 'invested',
      marketValue: 'Market value', unrealised: 'Unrealised P/L',
    },
  },
  es: {
    title: 'Calculadora de precio medio',
    desc: 'Precio medio ponderado de varias compras, con la plusvalía o minusvalía latente',
    short: 'Media ponderada de tus compras',
    intro: [
      {
        h: 'Promediar los precios da un número equivocado',
        p: 'El precio medio es total invertido ÷ total de unidades, no la media de los precios pagados. Si compras 10 unidades a 100 y 90 a 50, los precios promedian 75, pero tu coste medio real es 55. La cifra se va hacia donde está la cantidad.',
      },
      {
        h: 'Lo que mueve la media es la cantidad, no el precio',
        p: 'Comprar un poco más tras una caída apenas baja la media. Si ya tienes 100 unidades, añadir 10 da al precio nuevo menos de una décima parte del peso. Mover la media de verdad exige una compra comparable a lo que ya tienes, y eso multiplica el riesgo en la misma proporción.',
      },
      {
        h: 'Bajar la media no es reducir la pérdida',
        p: 'Promediar a la baja rebaja tu precio de equilibrio, no el dinero que llevas perdido. Como el total invertido ha crecido, la misma caída porcentual ahora cuesta más. Esta herramienta calcula la media; si la compra fue acertada es otra pregunta. No incluye comisiones ni impuestos, así que tu punto de equilibrio real queda algo por encima.',
      },
    ],
    faq: [
      { q: '¿Por qué mi precio medio no está a mitad de camino entre mis dos compras?', a: 'Porque las dos compras fueron de cantidades distintas. La media se acerca al precio al que compraste más unidades, en proporción exacta a esas cantidades.' },
      { q: '¿Vender una parte cambia la media?', a: 'Con el método de media ponderada, no: la venta reduce las unidades pero deja igual el coste medio por unidad. Algunas normativas fiscales exigen FIFO, que sí altera el coste de lo que queda.' },
      { q: '¿Cómo incluyo las comisiones?', a: 'Súmalas al precio que introduces, repartidas entre las unidades de esa compra. Si las dejas fuera, la media mostrada será algo optimista.' },
    ],
    ui: {
      section: 'Tus compras', price: 'Precio', qty: 'Cantidad', add: '+ Añadir compra',
      current: 'Precio actual (opcional)', calc: 'Calcular',
      avgPrice: 'Precio medio', totalQty: 'unidades', totalCost: 'invertido',
      marketValue: 'Valor de mercado', unrealised: 'Resultado latente',
    },
  },
  'pt-br': {
    title: 'Calculadora de preço médio',
    desc: 'Preço médio ponderado de várias compras, com o lucro ou prejuízo não realizado',
    short: 'Média ponderada das suas compras',
    intro: [
      {
        h: 'Tirar a média dos preços dá o número errado',
        p: 'Preço médio é total investido ÷ total de unidades, não a média dos preços pagos. Compre 10 unidades a 100 e 90 a 50: a média dos preços dá 75, mas seu preço médio real é 55. O número é puxado para onde está a quantidade.',
      },
      {
        h: 'Quem move a média é a quantidade, não o preço',
        p: 'Comprar um pouco depois de uma queda quase não abaixa a média. Se você já tem 100 unidades, comprar mais 10 dá ao preço novo menos de um décimo do peso. Para mover a média de verdade é preciso uma compra comparável ao que você já tem — e isso amplia o risco na mesma proporção.',
      },
      {
        h: 'Média menor não é prejuízo menor',
        p: 'Comprar na queda reduz o preço de equilíbrio, não o dinheiro que você já perdeu. Como o total investido cresceu, a mesma queda percentual agora custa mais. Esta ferramenta calcula a média; se a compra foi acertada é outra conversa. Taxas e impostos não entram, então seu equilíbrio real fica um pouco acima do número aqui.',
      },
    ],
    faq: [
      { q: 'Por que meu preço médio não fica no meio entre as duas compras?', a: 'Porque as duas compras tinham quantidades diferentes. A média se aproxima do preço em que você comprou mais unidades, na proporção exata dessas quantidades.' },
      { q: 'Vender parte da posição muda a média?', a: 'Pelo método da média ponderada, não: a venda reduz as unidades mas mantém o custo médio por unidade. Alguns regimes tributários exigem PEPS, que altera o custo do que sobra.' },
      { q: 'Como incluo as taxas?', a: 'Some-as ao preço que você digita, diluídas nas unidades daquela compra. Deixadas de fora, a média mostrada fica um pouco otimista demais.' },
    ],
    ui: {
      section: 'Suas compras', price: 'Preço', qty: 'Quantidade', add: '+ Adicionar compra',
      current: 'Preço atual (opcional)', calc: 'Calcular',
      avgPrice: 'Preço médio', totalQty: 'unidades', totalCost: 'investido',
      marketValue: 'Valor de mercado', unrealised: 'Resultado não realizado',
    },
  },
  ja: {
    title: '平均取得単価の計算機',
    desc: '複数回の買い付けから加重平均単価と評価損益を出します',
    short: '買い付けの加重平均',
    intro: [
      {
        h: '単価を足して割ると間違えます',
        p: '平均取得単価は投資総額 ÷ 総数量であって、払った単価の平均ではありません。100で10口、50で90口を買えば単価の平均は75ですが、実際の平均単価は55です。数量の多いほうへ引っ張られるからです。',
      },
      {
        h: '平均を動かすのは価格ではなく数量',
        p: '下がったところで少し買い足しても平均はほとんど動きません。すでに100口持っているなら、10口の買い増しに与えられる重みは10分の1に届きません。平均を意味のある幅で下げるには、保有量に匹敵する買い付けが要り、その分だけ危険も同じ倍率で大きくなります。',
      },
      {
        h: '平均が下がることと損が減ることは別です',
        p: '下落中の買い増しは損益分岐点を下げるだけで、いま抱えている損失額を減らすわけではありません。投資総額が増えている以上、同じ下落率でも失う金額は大きくなります。ここでは平均を計算するだけで、その買いが正しかったかは答えません。手数料と税は含めていないので、実際の分岐点はここの数字より少し上です。',
      },
    ],
    faq: [
      { q: '2回買ったのに平均がちょうど真ん中になりません。', a: '2回の数量が違うからです。平均は多く買ったほうの価格に、その数量の比だけ近づきます。' },
      { q: '一部を売ると平均は変わりますか。', a: '加重平均法では変わりません。売却で数量は減りますが、1口あたりの平均単価はそのままです。税制によっては先入先出法が求められ、その場合は残りの取得価額が変わります。' },
      { q: '手数料はどう入れますか。', a: 'その回の数量で割って、入力する単価に上乗せしてください。外に置いたままだと、表示される平均は少し甘くなります。' },
    ],
    ui: {
      section: '買い付け履歴', price: '単価', qty: '数量', add: '+ 買い付けを追加',
      current: '現在値 (任意)', calc: '計算する',
      avgPrice: '平均取得単価', totalQty: '口', totalCost: '投資額',
      marketValue: '評価額', unrealised: '評価損益',
    },
  },
  de: {
    title: 'Durchschnittskurs-Rechner',
    desc: 'Gewichteter Durchschnittspreis mehrerer Käufe samt Buchgewinn oder -verlust',
    short: 'Gewichteter Schnitt Ihrer Käufe',
    intro: [
      {
        h: 'Die Preise zu mitteln liefert die falsche Zahl',
        p: 'Der Durchschnittspreis ist Gesamteinsatz ÷ Gesamtstückzahl, nicht der Mittelwert der bezahlten Preise. Kaufen Sie 10 Stück zu 100 und 90 zu 50, mitteln die Preise auf 75 — Ihr tatsächlicher Schnitt liegt bei 55. Die Zahl wird dorthin gezogen, wo die Stückzahl liegt.',
      },
      {
        h: 'Bewegt wird der Schnitt von der Menge, nicht vom Preis',
        p: 'Nach einem Rückgang ein wenig nachzukaufen verschiebt den Schnitt kaum. Wer schon 100 Stück hält, gibt 10 weiteren Stücken weniger als ein Zehntel Gewicht. Spürbar wird es erst bei einem Kauf in der Größenordnung des Bestands — und der vergrößert das Risiko im selben Maß.',
      },
      {
        h: 'Ein niedrigerer Schnitt ist kein kleinerer Verlust',
        p: 'Nachkaufen im Fallen senkt den Break-even-Preis, nicht das Minus auf dem Konto. Da der Gesamteinsatz gewachsen ist, kostet derselbe prozentuale Rückgang jetzt mehr Geld. Dieses Werkzeug rechnet den Schnitt aus; ob der Kauf klug war, steht auf einem anderen Blatt. Gebühren und Steuern fehlen, der echte Break-even liegt also etwas über dem Wert hier.',
      },
    ],
    faq: [
      { q: 'Warum liegt mein Schnitt nicht genau zwischen meinen beiden Kaufkursen?', a: 'Weil die Stückzahlen unterschiedlich waren. Der Schnitt rückt genau im Verhältnis dieser Mengen an den Kurs heran, zu dem Sie mehr gekauft haben.' },
      { q: 'Ändert ein Teilverkauf den Schnitt?', a: 'Nach der Durchschnittsmethode nicht: Der Verkauf senkt die Stückzahl, lässt aber die Anschaffungskosten je Stück unverändert. Manche Steuerregime verlangen stattdessen FIFO, und dann ändert sich die Basis des Rests.' },
      { q: 'Wie rechne ich Gebühren ein?', a: 'Schlagen Sie sie auf den eingegebenen Preis, verteilt auf die Stücke dieses Kaufs. Bleiben sie außen vor, ist der angezeigte Schnitt etwas zu freundlich.' },
    ],
    ui: {
      section: 'Ihre Käufe', price: 'Kurs', qty: 'Stückzahl', add: '+ Kauf hinzufügen',
      current: 'Aktueller Kurs (optional)', calc: 'Berechnen',
      avgPrice: 'Durchschnittskurs', totalQty: 'Stück', totalCost: 'eingesetzt',
      marketValue: 'Marktwert', unrealised: 'Buchgewinn / -verlust',
    },
  },
  fr: {
    title: 'Calculateur de prix de revient moyen',
    desc: 'Prix moyen pondéré de plusieurs achats, avec la plus ou moins-value latente',
    short: 'Moyenne pondérée de vos achats',
    intro: [
      {
        h: 'Faire la moyenne des prix donne un faux résultat',
        p: 'Le prix de revient moyen, c’est le total investi ÷ le nombre total de titres, pas la moyenne des prix payés. Achetez 10 titres à 100 et 90 à 50 : la moyenne des prix donne 75, alors que votre prix de revient réel est 55. Le chiffre est tiré vers l’endroit où se trouve la quantité.',
      },
      {
        h: 'Ce qui déplace la moyenne, c’est la quantité, pas le prix',
        p: 'Racheter un peu après une baisse ne bouge presque pas la moyenne. Si vous détenez déjà 100 titres, en ajouter 10 ne donne au nouveau prix même pas un dixième du poids. Pour déplacer réellement la moyenne, il faut un achat comparable à ce que vous détenez déjà — et le risque grossit d’autant.',
      },
      {
        h: 'Une moyenne plus basse n’est pas une perte plus faible',
        p: 'Renforcer à la baisse abaisse votre point mort, pas l’argent déjà perdu. Le total investi ayant grossi, la même baisse en pourcentage coûte désormais davantage. Cet outil calcule la moyenne ; savoir si l’achat était judicieux est une autre question. Frais et impôts ne sont pas comptés, votre vrai point mort se situe donc un peu au-dessus.',
      },
    ],
    faq: [
      { q: 'Pourquoi ma moyenne n’est-elle pas à mi-chemin entre mes deux achats ?', a: 'Parce que les quantités étaient différentes. La moyenne se rapproche du prix auquel vous avez acheté le plus de titres, exactement dans la proportion de ces quantités.' },
      { q: 'Vendre une partie change-t-il la moyenne ?', a: 'Avec la méthode du prix moyen pondéré, non : la vente réduit la quantité mais laisse le coût unitaire inchangé. Certains régimes fiscaux imposent le PEPS, qui, lui, modifie la base du reliquat.' },
      { q: 'Comment intégrer les frais ?', a: 'Ajoutez-les au prix que vous saisissez, répartis sur les titres de cet achat. Laissés de côté, la moyenne affichée est un peu trop flatteuse.' },
    ],
    ui: {
      section: 'Vos achats', price: 'Prix', qty: 'Quantité', add: '+ Ajouter un achat',
      current: 'Prix actuel (facultatif)', calc: 'Calculer',
      avgPrice: 'Prix de revient moyen', totalQty: 'titres', totalCost: 'investi',
      marketValue: 'Valorisation', unrealised: 'Plus ou moins-value latente',
    },
  },
  hi: {
    title: 'औसत ख़रीद मूल्य कैलकुलेटर',
    desc: 'कई ख़रीदों का भारित औसत मूल्य और अभी तक न भुनाया गया लाभ या हानि',
    short: 'आपकी ख़रीदों का भारित औसत',
    intro: [
      {
        h: 'क़ीमतों का औसत निकालना ग़लत जवाब देता है',
        p: 'औसत लागत यानी कुल लगाया गया पैसा ÷ कुल इकाइयाँ, न कि चुकाई गई क़ीमतों का औसत। 100 पर 10 और 50 पर 90 इकाइयाँ लीं तो क़ीमतों का औसत 75 आता है, जबकि असली औसत लागत 55 है। आंकड़ा उधर खिंचता है जिधर मात्रा है।',
      },
      {
        h: 'औसत को हिलाती है मात्रा, क़ीमत नहीं',
        p: 'गिरावट पर थोड़ा-सा और ख़रीदने से औसत मुश्किल से हिलता है। अगर आपके पास पहले से 100 इकाइयाँ हैं, तो 10 और लेने पर नई क़ीमत का वज़न दसवें हिस्से से भी कम रहता है। औसत को सचमुच नीचे लाने के लिए मौजूदा होल्डिंग जितनी ही ख़रीद चाहिए — और उतना ही जोखिम भी बढ़ जाता है।',
      },
      {
        h: 'औसत घटना और नुक़सान घटना अलग बातें हैं',
        p: 'गिरते बाज़ार में और ख़रीदने से आपका बराबरी का भाव घटता है, गँवाया हुआ पैसा नहीं। कुल निवेश बढ़ चुका है, इसलिए उतनी ही प्रतिशत गिरावट अब ज़्यादा महँगी पड़ती है। यह उपकरण सिर्फ़ औसत निकालता है; वह ख़रीद सही थी या नहीं, यह अलग सवाल है। शुल्क और कर शामिल नहीं हैं, इसलिए असली बराबरी का भाव यहाँ दिखे आंकड़े से थोड़ा ऊपर होगा।',
      },
    ],
    faq: [
      { q: 'दो ख़रीदों के ठीक बीच में मेरा औसत क्यों नहीं है?', a: 'क्योंकि दोनों की मात्राएँ अलग थीं। औसत उसी अनुपात में उस क़ीमत के पास जाता है जिस पर आपने ज़्यादा इकाइयाँ लीं।' },
      { q: 'कुछ हिस्सा बेचने से औसत बदलता है?', a: 'भारित औसत पद्धति में नहीं। बेचने से इकाइयाँ घटती हैं, पर प्रति इकाई औसत लागत वही रहती है। कुछ कर व्यवस्थाएँ FIFO माँगती हैं, जिसमें बची हुई इकाइयों की लागत बदल जाती है।' },
      { q: 'शुल्क कैसे जोड़ूँ?', a: 'उस ख़रीद की इकाइयों में बाँटकर, दर्ज की जाने वाली क़ीमत में जोड़ दीजिए। बाहर छोड़ देने पर दिखने वाला औसत कुछ ज़्यादा अच्छा लगेगा।' },
    ],
    ui: {
      section: 'आपकी ख़रीदें', price: 'क़ीमत', qty: 'मात्रा', add: '+ ख़रीद जोड़ें',
      current: 'मौजूदा भाव (वैकल्पिक)', calc: 'गणना करें',
      avgPrice: 'औसत लागत', totalQty: 'इकाइयाँ', totalCost: 'निवेश',
      marketValue: 'बाज़ार मूल्य', unrealised: 'अभुनाया लाभ/हानि',
    },
  },
  'zh-hans': {
    title: '平均成本计算器',
    desc: '多次买入的加权平均价，以及尚未兑现的盈亏',
    short: '买入的加权平均',
    intro: [
      {
        h: '把价格加起来平均是错的',
        p: '平均成本是总投入 ÷ 总数量，不是你付过的那些价格的平均。以 100 买 10 份、以 50 买 90 份，价格平均是 75，而真正的平均成本是 55。数字会被拉向数量多的那一边。',
      },
      {
        h: '拉动平均的是数量，不是价格',
        p: '跌下来之后小买一点，平均几乎不动。你已经拿着 100 份，再买 10 份，新价格拿到的权重连十分之一都不到。要让平均真正下来，需要一笔和现有持仓相当的买入——风险也按同样的倍数放大。',
      },
      {
        h: '平均变低不等于亏得变少',
        p: '越跌越买降低的是回本价，不是你已经亏掉的钱。总投入变大了，同样的跌幅现在损失更多。这个工具只算平均，那笔买入是否明智是另一个问题。手续费和税没有计入，所以真实的回本价比这里的数字略高。',
      },
    ],
    faq: [
      { q: '买了两次，为什么平均不在两个价格的正中间？', a: '因为两次的数量不同。平均会按数量之比，靠近你买得更多的那个价格。' },
      { q: '卖掉一部分会改变平均吗？', a: '按加权平均法不会：卖出减少的是数量，每份的平均成本不变。有些税制要求先进先出，那样剩余部分的成本基础就会改变。' },
      { q: '手续费怎么算进去？', a: '按那一笔的数量摊到单价里，填进价格栏。放在外面不算，显示的平均会偏乐观。' },
    ],
    ui: {
      section: '买入记录', price: '价格', qty: '数量', add: '+ 添加一笔买入',
      current: '当前价格（可选）', calc: '计算',
      avgPrice: '平均成本', totalQty: '份', totalCost: '投入',
      marketValue: '市值', unrealised: '浮动盈亏',
    },
  },
  'zh-hant': {
    title: '平均成本計算機',
    desc: '多次買進的加權平均價，以及尚未實現的損益',
    short: '買進的加權平均',
    intro: [
      {
        h: '把價格加起來平均是錯的',
        p: '平均成本是總投入 ÷ 總數量，不是你付過的那些價格的平均。以 100 買 10 股、以 50 買 90 股，價格平均是 75，而真正的平均成本是 55。數字會被拉向數量多的那一邊。',
      },
      {
        h: '拉動平均的是數量，不是價格',
        p: '跌下來之後小買一點，平均幾乎不動。你已經抱著 100 股，再買 10 股，新價格拿到的權重連十分之一都不到。要讓平均真正下來，需要一筆和現有持股相當的買進——風險也按同樣的倍數放大。',
      },
      {
        h: '平均變低不等於虧得變少',
        p: '越跌越買降低的是回本價，不是你已經虧掉的錢。總投入變大了，同樣的跌幅現在損失更多。這個工具只算平均，那筆買進是否明智是另一個問題。手續費和稅沒有計入，所以真實的回本價比這裡的數字略高。',
      },
    ],
    faq: [
      { q: '買了兩次，為什麼平均不在兩個價格的正中間？', a: '因為兩次的數量不同。平均會按數量之比，靠近你買得更多的那個價格。' },
      { q: '賣掉一部分會改變平均嗎？', a: '按加權平均法不會：賣出減少的是數量，每股的平均成本不變。有些稅制要求先進先出，那樣剩餘部分的成本基礎就會改變。' },
      { q: '手續費怎麼算進去？', a: '按那一筆的數量攤到單價裡，填進價格欄。放在外面不算，顯示的平均會偏樂觀。' },
    ],
    ui: {
      section: '買進紀錄', price: '價格', qty: '數量', add: '+ 新增一筆買進',
      current: '目前價格（選填）', calc: '計算',
      avgPrice: '平均成本', totalQty: '股', totalCost: '投入',
      marketValue: '市值', unrealised: '未實現損益',
    },
  },
};
