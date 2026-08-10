import type { CalcTable } from './types.ts';

/**
 * LTV — 담보인정비율.
 *
 * 한국판은 투기과열지구·조정대상지역과 주택 수로 갈리는 규제 표를 박아 두었다.
 * 규제는 나라마다 다르고 자주 바뀌므로 표를 지우고, 한도(%)를 입력으로 받는다.
 * 나눗셈 자체(대출 ÷ 시세 × 100)는 한국판 그대로다. 통화는 붙이지 않는다.
 */
export const LTV: CalcTable = {
  en: {
    title: 'Loan-to-value (LTV) calculator',
    desc: 'Loan ÷ property value — your LTV, your equity, and the headroom left under a limit',
    short: 'LTV, equity and headroom',
    intro: [
      {
        h: 'Loan ÷ value × 100',
        p: 'A 350,000 loan against a 500,000 property is an LTV of 70%; the 30% the bank does not finance is your equity. Almost everything the lender decides — the rate, the conditions, whether the loan happens at all — starts from this one ratio.',
      },
      {
        h: 'Why 80% keeps coming up',
        p: 'Below roughly 80%, the property could lose a fifth of its value and a forced sale would still repay the debt, so lending stays cheap. Above it the lender starts charging for real risk: a higher rate, mortgage insurance, or a flat no. The exact threshold varies by country and product, but the logic is the same everywhere.',
      },
      {
        h: 'LTV falls two ways',
        p: 'Every principal payment shrinks the loan side, and any rise in the property’s value grows the other. That is how an LTV that starts at 90% can sit below 80% a few years later without any special effort — and why refinancing after prices rise often unlocks better terms.',
      },
    ],
    faq: [
      { q: 'Purchase price or appraised value?', a: 'Lenders usually take the lower of the two. If you paid 500,000 but the appraisal says 470,000, the ratio is worked out on 470,000 — one reason a loan offer can come in smaller than expected.' },
      { q: 'What counts as a good LTV?', a: 'Lower is always cheaper and safer. In many markets the conventional line is 80%: below it you tend to reach the best rates and skip mortgage insurance; above it, each unit borrowed costs more. A 20% down payment is simply a way of starting below that line.' },
      { q: 'How do I lower my LTV?', a: 'Three levers: a larger down payment before signing, principal payments while the loan runs, and a fresh appraisal after prices have risen. The last one changes the ratio at no cost beyond the appraisal fee.' },
    ],
    ui: {
      section: 'Property and loan', propertyValue: 'Property value', loanAmount: 'Loan amount',
      limit: 'LTV limit (%)', calc: 'Calculate',
      ltv: 'Your LTV', limitShort: 'Limit', within: 'within the limit', over: 'over the limit',
      equity: 'Equity', maxLoan: 'Max loan at the limit', headroom: 'Additional borrowing room',
      note: 'The currency is whatever you enter. Your lender’s actual limit depends on country, product and borrower.',
    },
  },
  es: {
    title: 'Calculadora de LTV (relación préstamo-valor)',
    desc: 'Préstamo ÷ valor del inmueble: tu LTV, tu capital propio y el margen bajo un límite',
    short: 'LTV, capital propio y margen',
    intro: [
      {
        h: 'Préstamo ÷ valor × 100',
        p: 'Un préstamo de 350.000 sobre un inmueble de 500.000 da un LTV del 70%; el 30% que el banco no financia es tu capital propio. De esta única proporción parte casi todo lo que decide el banco: el tipo, las condiciones y si la operación sale siquiera.',
      },
      {
        h: 'Por qué el 80% aparece una y otra vez',
        p: 'Por debajo de un 80%, el inmueble podría perder una quinta parte de su valor y una venta forzosa aún cubriría la deuda, así que prestar sale barato. Por encima, el banco empieza a cobrar el riesgo: tipo más alto, seguros añadidos o directamente un no. El umbral exacto cambia según el país y el producto, pero la lógica es la misma en todas partes.',
      },
      {
        h: 'El LTV baja por dos caminos',
        p: 'Cada cuota que amortiza capital reduce el lado del préstamo, y cualquier subida del valor del inmueble agranda el otro. Así es como un LTV que empieza en el 90% puede estar por debajo del 80% unos años después sin esfuerzo especial — y por eso refinanciar tras una subida de precios suele desbloquear mejores condiciones.',
      },
    ],
    faq: [
      { q: '¿Precio de compra o valor de tasación?', a: 'Los bancos suelen tomar el menor de los dos. Si pagaste 500.000 pero la tasación dice 470.000, la proporción se calcula sobre 470.000 — una de las razones por las que la oferta puede quedarse corta.' },
      { q: '¿Qué LTV es bueno?', a: 'Cuanto más bajo, más barato y más seguro. En muchos mercados la línea habitual es el 80%: por debajo sueles alcanzar los mejores tipos; por encima, cada unidad prestada cuesta más. Una entrada del 20% es, sencillamente, empezar por debajo de esa línea.' },
      { q: '¿Cómo bajo mi LTV?', a: 'Tres palancas: más entrada antes de firmar, amortizar capital mientras corre el préstamo y una nueva tasación cuando los precios han subido. La última cambia la proporción sin más coste que la propia tasación.' },
    ],
    ui: {
      section: 'Inmueble y préstamo', propertyValue: 'Valor del inmueble', loanAmount: 'Importe del préstamo',
      limit: 'Límite de LTV (%)', calc: 'Calcular',
      ltv: 'Tu LTV', limitShort: 'Límite', within: 'dentro del límite', over: 'por encima del límite',
      equity: 'Capital propio', maxLoan: 'Préstamo máximo en el límite', headroom: 'Margen de préstamo adicional',
      note: 'La moneda es la que introduzcas. El límite real depende del país, del producto y del cliente.',
    },
  },
  'pt-br': {
    title: 'Calculadora de LTV do financiamento',
    desc: 'Empréstimo ÷ valor do imóvel: seu LTV, sua parte própria e a folga até um limite',
    short: 'LTV e folga de financiamento',
    intro: [
      {
        h: 'Empréstimo ÷ valor × 100',
        p: 'Um financiamento de 350.000 sobre um imóvel de 500.000 dá um LTV de 70%; os 30% que o banco não financia são a sua parte. Dessa única proporção parte quase tudo o que o banco decide: a taxa, as condições e se o crédito sai ou não.',
      },
      {
        h: 'Por que os 80% vivem aparecendo',
        p: 'Abaixo de uns 80%, o imóvel poderia perder um quinto do valor e uma venda forçada ainda cobriria a dívida — emprestar fica barato. Acima disso, o banco começa a cobrar o risco: juros maiores, exigências extras ou um não. O corte exato muda de país para país e de produto para produto, mas a lógica é a mesma em toda parte.',
      },
      {
        h: 'O LTV cai por dois caminhos',
        p: 'Cada parcela que amortiza principal reduz o lado do empréstimo, e qualquer valorização do imóvel aumenta o outro. É assim que um LTV que começa em 90% aparece abaixo de 80% alguns anos depois sem esforço nenhum — e é por isso que renegociar depois de uma alta de preços costuma destravar condições melhores.',
      },
    ],
    faq: [
      { q: 'Preço de compra ou valor de avaliação?', a: 'Os bancos costumam usar o menor dos dois. Se você pagou 500.000 mas a avaliação diz 470.000, a conta é feita sobre 470.000 — um dos motivos de a oferta de crédito vir menor do que se esperava.' },
      { q: 'Qual LTV é bom?', a: 'Quanto mais baixo, mais barato e mais seguro. Em muitos mercados a linha usual é 80%: abaixo dela vêm as melhores taxas; acima, cada unidade emprestada custa mais caro. Uma entrada de 20% é, no fundo, começar abaixo dessa linha.' },
      { q: 'Como abaixo o meu LTV?', a: 'Três alavancas: entrada maior antes de assinar, amortizações enquanto o contrato corre e uma nova avaliação depois que os preços subiram. A última muda a proporção sem custar nada além da própria avaliação.' },
    ],
    ui: {
      section: 'Imóvel e financiamento', propertyValue: 'Valor do imóvel', loanAmount: 'Valor do empréstimo',
      limit: 'Limite de LTV (%)', calc: 'Calcular',
      ltv: 'Seu LTV', limitShort: 'Limite', within: 'dentro do limite', over: 'acima do limite',
      equity: 'Parte própria', maxLoan: 'Empréstimo máximo no limite', headroom: 'Folga para crédito adicional',
      note: 'A moeda é a que você digitar. O limite real depende do país, do produto e do cliente.',
    },
  },
  ja: {
    title: 'LTV（融資率）計算機',
    desc: '借入額 ÷ 物件価格 — LTVと自己資金の割合、上限までの余裕を出します',
    short: 'LTVと借入余力',
    intro: [
      {
        h: '借入額 ÷ 物件価格 × 100',
        p: '5,000の物件に3,500を借りればLTVは70%。銀行が融資しない残りの30%が自己資金の取り分です。金利も条件も、そもそも貸すかどうかも、銀行の判断のほとんどはこの一つの比率から始まります。',
      },
      {
        h: '「8割」がくり返し出てくる理由',
        p: 'LTVが8割を下回っていれば、物件価格が2割下がって処分になっても銀行は回収できます。だから安心して安く貸せます。8割を超えると話が変わり、金利の上乗せや保証の追加、場合によっては断られます。線を引く数字は国や商品で違っても、理屈はどこでも同じです。',
      },
      {
        h: 'LTVは二つの方向から下がる',
        p: '元金を返せば分子が減り、物件が値上がりすれば分母が増えます。90%で始めたLTVが数年後に気づけば80%を切っているのはこのためで、値上がり後に借り換えると条件が良くなることが多いのも同じ理屈です。',
      },
    ],
    faq: [
      { q: '購入価格と評価額、どちらで計算しますか。', a: '銀行はふつう低いほうを取ります。500で買っても評価が470なら、比率は470で計算されます。想定より融資額が小さく出る理由のひとつです。' },
      { q: 'LTVはいくつなら良いのですか。', a: '低いほど安全で、条件も良くなります。多くの市場で目安になるのは8割で、下回ると最も良い金利に届きやすく、上回ると借りる1単位あたりの負担が増えます。「頭金2割」は、はじめからこの線の下に立つための言い方です。' },
      { q: 'LTVを下げるには。', a: '打てる手は三つ。契約前に頭金を厚くする、返済中に元金を減らす、値上がりした後に評価を取り直す。最後の一つは評価の費用だけで比率が変わります。' },
    ],
    ui: {
      section: '物件と借入', propertyValue: '物件価格', loanAmount: '借入額',
      limit: 'LTVの上限 (%)', calc: '計算する',
      ltv: '現在のLTV', limitShort: '上限', within: '上限の範囲内', over: '上限を超過',
      equity: '自己資金ぶん', maxLoan: '上限での最大借入額', headroom: '追加で借りられる余地',
      note: '通貨は入力したものです。実際の上限は国・商品・審査で決まります。',
    },
  },
  de: {
    title: 'Beleihungsauslauf-Rechner (LTV)',
    desc: 'Darlehen ÷ Immobilienwert — Beleihungsauslauf, Eigenkapitalanteil und Spielraum bis zu einer Grenze',
    short: 'Beleihungsauslauf und Spielraum',
    intro: [
      {
        h: 'Darlehen ÷ Wert × 100',
        p: 'Ein Darlehen von 350.000 auf eine Immobilie von 500.000 ergibt einen Beleihungsauslauf von 70%; die 30%, die die Bank nicht finanziert, sind Ihr Eigenkapital. Von dieser einen Quote hängt fast alles ab, was die Bank entscheidet: der Zins, die Auflagen und ob das Darlehen überhaupt zustande kommt.',
      },
      {
        h: 'Warum immer wieder 80% auftauchen',
        p: 'Unterhalb von etwa 80% könnte die Immobilie ein Fünftel an Wert verlieren, und eine Zwangsversteigerung würde die Schuld noch decken — die Bank kann günstig verleihen. Darüber preist sie das Risiko ein: Zinsaufschläge, zusätzliche Sicherheiten oder eine Absage. Wo genau die Linie liegt, unterscheidet sich je nach Land und Produkt, die Logik ist überall dieselbe.',
      },
      {
        h: 'Der Auslauf sinkt auf zwei Wegen',
        p: 'Jede Tilgung verkleinert die Darlehensseite, jede Wertsteigerung vergrößert die andere. So kann ein Auslauf, der bei 90% beginnt, ein paar Jahre später ohne besonderes Zutun unter 80% liegen — und deshalb bringt eine Anschlussfinanzierung nach gestiegenen Preisen oft bessere Konditionen.',
      },
    ],
    faq: [
      { q: 'Kaufpreis oder Beleihungswert?', a: 'Banken rechnen meist mit dem niedrigeren Wert. Oft setzen sie einen Beleihungswert an, der mit einem Sicherheitsabschlag unter dem Kaufpreis liegt — ein Grund, warum das Angebot kleiner ausfallen kann als erwartet.' },
      { q: 'Welcher Auslauf ist gut?', a: 'Je niedriger, desto günstiger und sicherer. Viele Banken staffeln die Konditionen: die besten Zinsen gibt es traditionell bis 60%, ordentliche bis 80%, darüber wird jeder geliehene Betrag teurer.' },
      { q: 'Wie senke ich den Auslauf?', a: 'Drei Hebel: mehr Eigenkapital vor dem Abschluss, Tilgung und Sondertilgungen während der Laufzeit, und eine neue Bewertung, nachdem die Preise gestiegen sind. Der letzte verändert die Quote, ohne dass Sie mehr als das Gutachten bezahlen.' },
    ],
    ui: {
      section: 'Immobilie und Darlehen', propertyValue: 'Immobilienwert', loanAmount: 'Darlehensbetrag',
      limit: 'Beleihungsgrenze (%)', calc: 'Berechnen',
      ltv: 'Ihr Beleihungsauslauf', limitShort: 'Grenze', within: 'innerhalb der Grenze', over: 'über der Grenze',
      equity: 'Eigenkapitalanteil', maxLoan: 'Maximales Darlehen an der Grenze', headroom: 'Zusätzlicher Spielraum',
      note: 'Die Währung ist die Ihrer Eingabe. Die tatsächliche Grenze bestimmen Land, Produkt und Bonität.',
    },
  },
  fr: {
    title: 'Calculateur de quotité de financement (LTV)',
    desc: 'Prêt ÷ valeur du bien — votre quotité, votre apport et la marge sous un plafond',
    short: 'Quotité de financement et marge',
    intro: [
      {
        h: 'Prêt ÷ valeur × 100',
        p: 'Un prêt de 350 000 sur un bien de 500 000 donne une quotité de 70 % ; les 30 % que la banque ne finance pas, c’est votre apport. De ce seul ratio découle presque tout ce que décide la banque : le taux, les conditions, et l’accord lui-même.',
      },
      {
        h: 'Pourquoi 80 % revient sans cesse',
        p: 'En dessous d’environ 80 %, le bien pourrait perdre un cinquième de sa valeur et une vente forcée couvrirait encore la dette : prêter reste peu risqué. Au-delà, la banque fait payer le risque — taux majoré, garanties supplémentaires, ou refus. Le seuil exact varie selon les pays et les produits, mais la logique est partout la même.',
      },
      {
        h: 'La quotité baisse par deux voies',
        p: 'Chaque mensualité qui amortit du capital réduit le côté prêt, et toute hausse de la valeur du bien agrandit l’autre. C’est ainsi qu’une quotité qui démarre à 90 % passe sous les 80 % quelques années plus tard sans effort particulier — et c’est pourquoi renégocier après une hausse des prix débloque souvent de meilleures conditions.',
      },
    ],
    faq: [
      { q: 'Prix d’achat ou valeur d’expertise ?', a: 'La banque retient généralement le plus bas des deux. Si vous avez payé 500 000 mais que l’expertise conclut à 470 000, le ratio se calcule sur 470 000 — une des raisons pour lesquelles l’offre peut être plus petite que prévu.' },
      { q: 'Quelle quotité vise-t-on ?', a: 'Plus elle est basse, moins le crédit coûte. Dans beaucoup de marchés, la ligne classique est 80 % : en dessous, les meilleurs taux ; au-dessus, chaque unité empruntée revient plus cher. Un apport de 20 % revient précisément à partir sous cette ligne.' },
      { q: 'Comment faire baisser sa quotité ?', a: 'Trois leviers : un apport plus important avant la signature, l’amortissement du capital pendant le prêt, et une nouvelle expertise après une hausse des prix. Le dernier change le ratio sans autre coût que l’expertise elle-même.' },
    ],
    ui: {
      section: 'Bien et prêt', propertyValue: 'Valeur du bien', loanAmount: 'Montant du prêt',
      limit: 'Plafond de quotité (%)', calc: 'Calculer',
      ltv: 'Votre quotité', limitShort: 'Plafond', within: 'sous le plafond', over: 'au-dessus du plafond',
      equity: 'Apport / capital détenu', maxLoan: 'Prêt maximal au plafond', headroom: 'Marge d’emprunt restante',
      note: 'La devise est celle que vous saisissez. Le plafond réel dépend du pays, du produit et du dossier.',
    },
  },
  hi: {
    title: 'LTV (लोन-टू-वैल्यू) कैलकुलेटर',
    desc: 'क़र्ज़ ÷ संपत्ति का मूल्य — आपका LTV, आपकी हिस्सेदारी और सीमा तक की गुंजाइश',
    short: 'LTV और उधार की गुंजाइश',
    intro: [
      {
        h: 'क़र्ज़ ÷ मूल्य × 100',
        p: '5,00,000 की संपत्ति पर 3,50,000 का क़र्ज़ यानी 70% LTV; जो 30% बैंक नहीं देता, वह आपकी अपनी हिस्सेदारी है। ब्याज दर, शर्तें, और लोन मिलेगा भी या नहीं — बैंक के लगभग सारे फ़ैसले इसी एक अनुपात से शुरू होते हैं।',
      },
      {
        h: '80% बार-बार क्यों आता है',
        p: 'क़रीब 80% से नीचे, संपत्ति का दाम पाँचवाँ हिस्सा गिर भी जाए तो ज़बरन बिक्री से भी क़र्ज़ चुक जाता है, इसलिए उधार देना सस्ता रहता है। इसके ऊपर बैंक जोखिम की क़ीमत वसूलने लगता है — ऊँची दर, अतिरिक्त शर्तें, या सीधा इनकार। सीमा की ठीक-ठीक संख्या देश और उत्पाद के हिसाब से बदलती है, पर तर्क हर जगह यही है।',
      },
      {
        h: 'LTV दो रास्तों से गिरता है',
        p: 'मूलधन की हर किश्त क़र्ज़ वाला पलड़ा हल्का करती है, और संपत्ति के दाम की हर बढ़त दूसरा पलड़ा भारी। इसीलिए 90% से शुरू हुआ LTV कुछ साल बाद बिना किसी ख़ास कोशिश के 80% से नीचे मिलता है — और दाम बढ़ने के बाद रीफ़ाइनैंस कराने पर अक्सर बेहतर शर्तें खुल जाती हैं।',
      },
    ],
    faq: [
      { q: 'ख़रीद का दाम लें या मूल्यांकन?', a: 'बैंक आमतौर पर दोनों में से कम वाला लेते हैं। आपने 5,00,000 दिए हों पर मूल्यांकन 4,70,000 कहे, तो अनुपात 4,70,000 पर बनेगा — लोन ऑफ़र उम्मीद से छोटा आने की एक वजह यही है।' },
      { q: 'अच्छा LTV कितना है?', a: 'जितना कम, उतना सस्ता और सुरक्षित। कई बाज़ारों में मोटी लकीर 80% की है: उससे नीचे सबसे अच्छी दरें मिलती हैं, ऊपर हर उधार ली गई इकाई महँगी पड़ती है। 20% डाउन पेमेंट की सलाह असल में शुरुआत से ही इस लकीर के नीचे रहने की बात है।' },
      { q: 'अपना LTV कैसे घटाऊँ?', a: 'तीन तरीक़े: शुरुआत में बड़ा डाउन पेमेंट, चलते क़र्ज़ में मूलधन चुकाना, और दाम बढ़ने के बाद नया मूल्यांकन। आख़िरी तरीक़े में मूल्यांकन की फ़ीस के अलावा कुछ ख़र्च नहीं होता।' },
    ],
    ui: {
      section: 'संपत्ति और क़र्ज़', propertyValue: 'संपत्ति का मूल्य', loanAmount: 'क़र्ज़ की रक़म',
      limit: 'LTV सीमा (%)', calc: 'गणना करें',
      ltv: 'आपका LTV', limitShort: 'सीमा', within: 'सीमा के भीतर', over: 'सीमा से ऊपर',
      equity: 'आपकी हिस्सेदारी', maxLoan: 'सीमा पर अधिकतम क़र्ज़', headroom: 'अतिरिक्त उधार की गुंजाइश',
      note: 'मुद्रा वही है जो आप डालें। असली सीमा देश, उत्पाद और बैंक की जाँच पर निर्भर है।',
    },
  },
  'zh-hans': {
    title: '贷款价值比（LTV）计算器',
    desc: '贷款 ÷ 房产价值——算出 LTV、自有部分和距上限的空间',
    short: 'LTV 和可贷空间',
    intro: [
      {
        h: '贷款 ÷ 价值 × 100',
        p: '价值 500,000 的房产贷 350,000，LTV 就是 70%；银行不贷的那 30% 是你自己的部分，也就是首付加上已还掉的本金。利率、条件、批不批——银行的几乎每个决定都从这一个比率出发。',
      },
      {
        h: '为什么总是绕不开 80%',
        p: '低于八成左右，房价就算跌去五分之一，法拍也还能覆盖欠款，银行放贷放得安心，价钱也就便宜。高过这条线，银行开始把风险算进价里：加息、加担保，或者干脆不批。线画在哪个数字上因国家和产品而异，道理却到处一样。',
      },
      {
        h: 'LTV 从两头往下走',
        p: '每还一笔本金，分子就小一点；房子每涨一点价，分母就大一点。所以从 90% 起步的 LTV，几年后不知不觉就到了 80% 以下——也正因如此，房价上涨之后去转贷或重谈条件，常常能拿到更好的价钱。',
      },
    ],
    faq: [
      { q: '按成交价算，还是按评估价算？', a: '银行通常取两者中较低的。你花了 500,000，评估却说 470,000，比率就按 470,000 算——贷款批下来比预期少，常常就是这个原因。' },
      { q: 'LTV 多少算好？', a: '越低越便宜、越安全。很多市场的惯例线是八成：线下容易拿到最好的利率，线上每多借一分都更贵。所谓两成首付，说穿了就是一开始就站在这条线下面。' },
      { q: '怎么把 LTV 降下来？', a: '三个办法：签约前多付首付，还款中多还本金，房价涨了以后重新评估。最后一个除了评估费，什么都不用花，比率却变了。' },
    ],
    ui: {
      section: '房产与贷款', propertyValue: '房产价值', loanAmount: '贷款金额',
      limit: 'LTV 上限 (%)', calc: '计算',
      ltv: '当前 LTV', limitShort: '上限', within: '在上限之内', over: '超过上限',
      equity: '自有部分', maxLoan: '上限内最多可贷', headroom: '还能再贷的空间',
      note: '货币就是你填入的那种。真实上限由所在国家、产品和审批决定。',
    },
  },
  'zh-hant': {
    title: '貸款成數（LTV）計算機',
    desc: '貸款 ÷ 房產價值——算出成數、自有部分和距上限的空間',
    short: '貸款成數與可貸空間',
    intro: [
      {
        h: '貸款 ÷ 價值 × 100',
        p: '價值 500,000 的房子貸 350,000，成數就是七成（LTV 70%）；銀行不貸的那三成是你自己的部分，也就是頭期款加上已還掉的本金。利率、條件、核不核貸——銀行幾乎每個決定都從這一個比率出發。',
      },
      {
        h: '為什麼總是繞不開八成',
        p: '低於八成左右，房價就算跌掉五分之一，法拍也還能清償欠款，銀行放款放得安心，價錢也就便宜。高過這條線，銀行開始把風險算進價裡：加碼利率、加保證人，或者乾脆不核。線畫在哪個數字因國家和產品而異，道理卻到處一樣。',
      },
      {
        h: '成數從兩頭往下走',
        p: '每還一筆本金，分子就小一點；房子每漲一點價，分母就大一點。所以從九成起步的成數，幾年後不知不覺就掉到八成以下——也正因如此，房價上漲之後去轉貸或重談條件，常常能拿到更好的價錢。',
      },
    ],
    faq: [
      { q: '按成交價算，還是按鑑價算？', a: '銀行通常取兩者中較低的。你花了 500,000，鑑價卻說 470,000，比率就按 470,000 算——核貸金額比預期少，常常就是這個原因。' },
      { q: '成數多少算好？', a: '越低越便宜、越安全。很多市場的慣例線是八成：線下容易拿到最好的利率，線上每多借一分都更貴。所謂兩成頭期款，說穿了就是一開始就站在這條線下面。' },
      { q: '怎麼把成數降下來？', a: '三個辦法：簽約前多付頭期款，還款中多還本金，房價漲了以後重新鑑價。最後一個除了鑑價費，什麼都不用花，比率卻變了。' },
    ],
    ui: {
      section: '房產與貸款', propertyValue: '房產價值', loanAmount: '貸款金額',
      limit: '成數上限 (%)', calc: '計算',
      ltv: '目前成數（LTV）', limitShort: '上限', within: '在上限之內', over: '超過上限',
      equity: '自有部分', maxLoan: '上限內最多可貸', headroom: '還能再貸的空間',
      note: '貨幣就是你填入的那種。真實上限由所在國家、產品和審核決定。',
    },
  },
};

/**
 * 대출 갈아타기 — 계산은 lib/refinance.ts를 한국판 그대로 쓴다.
 *
 * "3년 지나면 중도상환수수료 면제" 같은 한국 제도 설명만 걷어냈다. 대환을
 * 부르는 이름이 언어마다 따로 있어(Umschuldung, rachat de crédit, 借り換え,
 * balance transfer…) 영어를 옮기지 않고 각 언어의 제 이름을 썼다.
 */
export const REFINANCE: CalcTable = {
  en: {
    title: 'Refinance break-even calculator',
    desc: 'Whether switching your loan pays off, and how many months until the costs are recovered',
    short: 'Is refinancing worth it?',
    intro: [
      {
        h: 'A lower rate is not automatically a win',
        p: 'Switching costs money before it saves any: an early-repayment charge on the old loan, arrangement and registration fees on the new one. If saving 120 a month costs 2,400 up front, you are behind for the first 20 months — and if the loan ends before then, you never catch up.',
      },
      {
        h: 'Break-even is the real test',
        p: 'This calculator divides the up-front cost by the monthly saving to find the month you pull ahead. Shorter than the time you expect to keep the loan: switch. Longer: stay. A planned sale or early repayment shrinks that window and can flip the answer on its own.',
      },
      {
        h: 'Watch the term trap',
        p: 'Stretching the remaining term makes the new payment look smaller than the old one even at the same rate. To compare rates honestly, enter the same remaining months for both loans; lengthen the term only when you deliberately want lower payments and accept paying interest for longer.',
      },
    ],
    faq: [
      { q: 'Which costs belong in the two cost fields?', a: 'Everything you pay because of the switch: any early-repayment or exit charge on the current loan, plus arrangement, valuation, registration and notary-type fees on the new one. Costs you would pay anyway do not count.' },
      { q: 'How big does the rate gap need to be?', a: 'There is no universal number. A large balance and many remaining months make even half a point worth taking; a small balance close to maturity may not justify a whole point. That is exactly what the break-even month tells you.' },
      { q: 'Why does the result assume equal monthly payments?', a: 'Both loans are modelled as standard annuities — the most common consumer form. If yours is interest-only or equal-principal, the totals will differ somewhat, though the break-even logic stays the same.' },
    ],
    ui: {
      section: 'Current loan and new offer', balance: 'Remaining balance',
      currentRate: 'Current annual rate (%)', currentTerm: 'Remaining term (months)',
      newRate: 'New annual rate (%)', newTerm: 'New term (months)',
      fee: 'Early-repayment charge', feeHint: 'Leave 0 if there is none.',
      costs: 'Other switching costs', calc: 'Compare',
      net: 'Net gain after costs', worth: 'Switching pays off', notWorth: 'Switching loses money',
      monthlyChange: 'Monthly payment change', interestSaved: 'Interest saved',
      moreInterest: 'you pay more interest', beforeCosts: 'before costs',
      breakEven: 'Break-even', immediate: 'Immediately', na: 'Never', naSub: 'Monthly payment does not fall',
      monthsUnit: 'months', upfront: 'Up-front cost',
      currentInterest: 'Interest left on current loan', newInterest: 'Interest on new loan',
      note: 'The currency is whatever you enter. Both loans are treated as level-payment (annuity) loans.',
    },
  },
  es: {
    title: 'Calculadora de refinanciación de préstamos',
    desc: 'Si cambiar de préstamo compensa y en cuántos meses recuperas los gastos',
    short: '¿Compensa refinanciar?',
    intro: [
      {
        h: 'Un tipo más bajo no gana solo',
        p: 'Cambiar cuesta dinero antes de ahorrarlo: la comisión por amortización anticipada del préstamo viejo y los gastos de apertura y registro del nuevo. Si ahorrar 120 al mes cuesta 2.400 por adelantado, vas perdiendo durante 20 meses — y si el préstamo termina antes, nunca te recuperas.',
      },
      {
        h: 'El punto de equilibrio es la prueba real',
        p: 'Esta calculadora divide el coste inicial entre el ahorro mensual para hallar el mes en que empiezas a ganar. ¿Más corto que el tiempo que piensas mantener el préstamo? Cambia. ¿Más largo? Quédate. Una venta o cancelación anticipada prevista acorta esa ventana y puede voltear la respuesta por sí sola.',
      },
      {
        h: 'Cuidado con la trampa del plazo',
        p: 'Alargar el plazo restante hace que la cuota nueva parezca menor aunque el tipo sea el mismo. Para comparar tipos con honradez, pon los mismos meses restantes en ambos préstamos; alarga el plazo solo si buscas cuota baja a sabiendas de que pagarás intereses durante más tiempo.',
      },
    ],
    faq: [
      { q: '¿Qué gastos van en los dos campos de costes?', a: 'Todo lo que pagas por el hecho de cambiar: la comisión por amortización anticipada del préstamo actual y los gastos de apertura, tasación, registro o notaría del nuevo. Lo que pagarías de todos modos no cuenta.' },
      { q: '¿Cuánta diferencia de tipo hace falta?', a: 'No hay número universal. Con saldo grande y muchos meses por delante, medio punto ya compensa; con saldo pequeño y el final cerca, puede no bastar un punto entero. Justo eso es lo que responde el mes de equilibrio.' },
      { q: '¿Por qué asume cuotas mensuales iguales?', a: 'Ambos préstamos se modelan con cuota constante (sistema francés), la forma más común. Si el tuyo es de solo intereses o de amortización constante, los totales variarán algo, pero la lógica del equilibrio es la misma.' },
    ],
    ui: {
      section: 'Préstamo actual y oferta nueva', balance: 'Saldo pendiente',
      currentRate: 'Tipo actual anual (%)', currentTerm: 'Meses restantes',
      newRate: 'Tipo nuevo anual (%)', newTerm: 'Plazo nuevo (meses)',
      fee: 'Comisión por amortización anticipada', feeHint: 'Déjalo en 0 si no la hay.',
      costs: 'Otros gastos del cambio', calc: 'Comparar',
      net: 'Ganancia neta tras gastos', worth: 'Cambiar compensa', notWorth: 'Cambiar sale a pérdida',
      monthlyChange: 'Cambio en la cuota mensual', interestSaved: 'Intereses ahorrados',
      moreInterest: 'pagas más intereses', beforeCosts: 'antes de gastos',
      breakEven: 'Punto de equilibrio', immediate: 'Inmediato', na: 'Nunca', naSub: 'La cuota mensual no baja',
      monthsUnit: 'meses', upfront: 'Coste inicial',
      currentInterest: 'Intereses restantes del préstamo actual', newInterest: 'Intereses del préstamo nuevo',
      note: 'La moneda es la que introduzcas. Ambos préstamos se calculan con cuota constante (sistema francés).',
    },
  },
  'pt-br': {
    title: 'Calculadora de portabilidade de crédito',
    desc: 'Se levar o contrato para outro banco compensa e em quantos meses os custos se pagam',
    short: 'Portabilidade compensa?',
    intro: [
      {
        h: 'Juros menores não ganham sozinhos',
        p: 'Trocar custa dinheiro antes de economizar: a multa ou tarifa de quitação antecipada do contrato velho e as tarifas e registros do novo. Se economizar 120 por mês custa 2.400 na entrada, você fica no vermelho por 20 meses — e se o contrato acabar antes disso, nunca se recupera.',
      },
      {
        h: 'O ponto de equilíbrio é o teste de verdade',
        p: 'Esta calculadora divide o custo inicial pela economia mensal para achar o mês em que você passa a ganhar. Mais curto que o tempo que pretende ficar com o contrato: troque. Mais longo: fique. Vender o bem ou quitar antes encurta essa janela e pode virar a resposta sozinho.',
      },
      {
        h: 'Cuidado com a armadilha do prazo',
        p: 'Esticar o prazo restante faz a parcela nova parecer menor mesmo com a mesma taxa. Para comparar taxas com honestidade, informe os mesmos meses restantes nos dois contratos; alongue o prazo só quando quiser parcela menor de propósito, aceitando pagar juros por mais tempo.',
      },
    ],
    faq: [
      { q: 'Que custos entram nos dois campos?', a: 'Tudo o que você paga por causa da troca: multa ou custo de quitação antecipada do contrato atual, mais tarifas, avaliação e registros do novo. O que você pagaria de qualquer jeito não conta.' },
      { q: 'Quanta diferença de taxa é preciso?', a: 'Não existe número universal. Saldo grande e muitos meses pela frente fazem meio ponto valer a pena; saldo pequeno perto do fim pode não justificar um ponto inteiro. É exatamente isso que o mês de equilíbrio responde.' },
      { q: 'Por que o cálculo assume parcelas iguais?', a: 'Os dois contratos são modelados como Tabela Price (parcelas constantes), a forma mais comum no crédito. Se o seu for SAC ou só juros, os totais mudam um pouco, mas a lógica do equilíbrio é a mesma.' },
    ],
    ui: {
      section: 'Contrato atual e proposta nova', balance: 'Saldo devedor',
      currentRate: 'Taxa atual ao ano (%)', currentTerm: 'Meses restantes',
      newRate: 'Taxa nova ao ano (%)', newTerm: 'Prazo novo (meses)',
      fee: 'Multa de quitação antecipada', feeHint: 'Deixe 0 se não houver.',
      costs: 'Outros custos da troca', calc: 'Comparar',
      net: 'Ganho líquido após os custos', worth: 'Trocar compensa', notWorth: 'Trocar dá prejuízo',
      monthlyChange: 'Mudança na parcela mensal', interestSaved: 'Juros economizados',
      moreInterest: 'você paga mais juros', beforeCosts: 'antes dos custos',
      breakEven: 'Ponto de equilíbrio', immediate: 'Imediato', na: 'Nunca', naSub: 'A parcela mensal não cai',
      monthsUnit: 'meses', upfront: 'Custo inicial',
      currentInterest: 'Juros restantes do contrato atual', newInterest: 'Juros do contrato novo',
      note: 'A moeda é a que você digitar. Os dois contratos são calculados como parcelas constantes (Tabela Price).',
    },
  },
  ja: {
    title: '借り換えメリット計算機',
    desc: '手数料まで入れて借り換えが本当に得か、何か月で元が取れるかを出します',
    short: '借り換えは得か',
    intro: [
      {
        h: '金利が下がっても自動的には得しない',
        p: '借り換えには先に出ていくお金があります。いまの借入の繰上返済手数料と、新しい借入の事務手数料や登記のような費用です。月120の節約のために2,400を先に払うなら、最初の20か月は赤字で、その前に完済するなら永遠に取り返せません。',
      },
      {
        h: '損益分岐点が本当の判定基準',
        p: 'この計算機は初期費用を月々の節約額で割り、何か月目で得に転じるかを出します。借入を持ち続けるつもりの期間より短ければ借り換え、長ければ現状維持。途中で売却や完済の予定があるなら、その分だけ窓が狭くなり、それだけで答えが引っくり返ることもあります。',
      },
      {
        h: '期間延長の罠に注意',
        p: '残り期間を延ばせば、同じ金利でも新しい月々の支払いは小さく見えます。金利どうしを正直に比べたいなら、両方に同じ残り月数を入れてください。期間を延ばすのは、利息を長く払うと承知のうえで月々を軽くしたいときだけにします。',
      },
    ],
    faq: [
      { q: '費用の欄には何を入れますか。', a: '借り換えたせいで払うものすべてです。いまの借入の繰上返済手数料、新しい借入の事務手数料・保証料・登記のような費用。どのみち払うものは入れません。' },
      { q: '金利差はどれくらい必要ですか。', a: '万能の数字はありません。残高が大きく残り期間が長ければ0.5%の差でも取る価値があり、残高が小さく満期が近ければ1%の差でも足りないことがあります。それに正確に答えるのが損益分岐の月数です。' },
      { q: 'なぜ元利均等で計算するのですか。', a: 'どちらの借入も、いちばん一般的な元利均等返済として計算しています。元金均等や利息のみの借入では合計が多少変わりますが、損益分岐の考え方は同じです。' },
    ],
    ui: {
      section: 'いまの借入と乗り換え先', balance: '残っている元金',
      currentRate: '現在の金利（年%）', currentTerm: '残り期間（か月）',
      newRate: '借り換え後の金利（年%）', newTerm: '新しい期間（か月）',
      fee: '繰上返済手数料', feeHint: 'なければ0のままで。',
      costs: 'そのほかの費用', calc: '比べる',
      net: '費用を引いた純メリット', worth: '借り換えると得', notWorth: '借り換えると損',
      monthlyChange: '月々の支払いの変化', interestSaved: '減る利息',
      moreInterest: '利息はむしろ増える', beforeCosts: '費用を引く前',
      breakEven: '損益分岐点', immediate: 'すぐ', na: 'なし', naSub: '月々の支払いが減らない',
      monthsUnit: 'か月', upfront: '初期費用',
      currentInterest: 'いまの借入の残り利息', newInterest: '借り換え後の利息',
      note: '通貨は入力したものです。どちらも元利均等返済として計算します。',
    },
  },
  de: {
    title: 'Umschuldungsrechner',
    desc: 'Ob sich der Kreditwechsel lohnt und nach wie vielen Monaten die Kosten wieder drin sind',
    short: 'Lohnt sich die Umschuldung?',
    intro: [
      {
        h: 'Ein niedrigerer Zins gewinnt nicht von allein',
        p: 'Der Wechsel kostet Geld, bevor er welches spart: die Vorfälligkeitsentschädigung für den alten Kredit, Bearbeitungs- und Grundbuchkosten für den neuen. Wer für 120 Ersparnis im Monat 2.400 vorab zahlt, liegt 20 Monate lang hinten — endet der Kredit früher, holt er es nie wieder auf.',
      },
      {
        h: 'Der Break-even ist die eigentliche Probe',
        p: 'Dieser Rechner teilt die Anfangskosten durch die monatliche Ersparnis und findet den Monat, ab dem Sie vorne liegen. Kürzer als die Zeit, die Sie den Kredit voraussichtlich behalten: wechseln. Länger: bleiben. Ein geplanter Verkauf oder eine frühe Ablösung verkürzt dieses Fenster und kann die Antwort allein umdrehen.',
      },
      {
        h: 'Die Laufzeitfalle',
        p: 'Wer die Restlaufzeit streckt, bekommt selbst beim gleichen Zins eine kleinere Rate. Für einen ehrlichen Zinsvergleich gehören in beide Kredite dieselben Restmonate; verlängern Sie nur, wenn Sie bewusst eine niedrigere Rate wollen und dafür länger Zinsen zahlen.',
      },
    ],
    faq: [
      { q: 'Welche Kosten gehören in die beiden Felder?', a: 'Alles, was Sie wegen des Wechsels zahlen: die Vorfälligkeitsentschädigung für den laufenden Kredit sowie Bearbeitung, Bewertung, Notar und Grundbuch für den neuen. Was ohnehin fällig wäre, zählt nicht.' },
      { q: 'Wie groß muss der Zinsabstand sein?', a: 'Eine allgemeingültige Zahl gibt es nicht. Bei hoher Restschuld und vielen Restmonaten lohnt schon ein halber Punkt; bei kleiner Restschuld kurz vor Ende reicht manchmal ein ganzer nicht. Genau das beantwortet der Break-even-Monat.' },
      { q: 'Warum wird mit gleichbleibenden Raten gerechnet?', a: 'Beide Kredite werden als Annuitätendarlehen gerechnet — die verbreitetste Form. Bei Tilgungsdarlehen oder endfälligen Krediten weichen die Summen etwas ab, die Logik des Break-even bleibt dieselbe.' },
    ],
    ui: {
      section: 'Laufender Kredit und Angebot', balance: 'Restschuld',
      currentRate: 'Aktueller Zins (% p.a.)', currentTerm: 'Restlaufzeit (Monate)',
      newRate: 'Neuer Zins (% p.a.)', newTerm: 'Neue Laufzeit (Monate)',
      fee: 'Vorfälligkeitsentschädigung', feeHint: 'Ohne: 0 stehen lassen.',
      costs: 'Weitere Wechselkosten', calc: 'Vergleichen',
      net: 'Nettovorteil nach Kosten', worth: 'Der Wechsel lohnt sich', notWorth: 'Der Wechsel kostet Geld',
      monthlyChange: 'Änderung der Monatsrate', interestSaved: 'Gesparte Zinsen',
      moreInterest: 'Sie zahlen mehr Zinsen', beforeCosts: 'vor Kosten',
      breakEven: 'Break-even', immediate: 'Sofort', na: 'Nie', naSub: 'Die Monatsrate sinkt nicht',
      monthsUnit: 'Monate', upfront: 'Anfangskosten',
      currentInterest: 'Restzinsen des laufenden Kredits', newInterest: 'Zinsen des neuen Kredits',
      note: 'Die Währung ist die Ihrer Eingabe. Beide Kredite werden als Annuitätendarlehen gerechnet.',
    },
  },
  fr: {
    title: 'Calculateur de rachat de crédit',
    desc: 'Si faire racheter son prêt vaut le coup, et en combien de mois les frais sont amortis',
    short: 'Le rachat vaut-il le coup ?',
    intro: [
      {
        h: 'Un taux plus bas ne gagne pas tout seul',
        p: 'Changer coûte avant de rapporter : indemnités de remboursement anticipé sur l’ancien prêt, frais de dossier et de garantie sur le nouveau. Si économiser 120 par mois coûte 2 400 d’avance, vous êtes perdant pendant 20 mois — et si le prêt s’arrête avant, vous ne vous refaites jamais.',
      },
      {
        h: 'Le seuil de rentabilité est le vrai juge',
        p: 'Ce calculateur divise les frais initiaux par l’économie mensuelle pour trouver le mois où vous passez gagnant. Plus court que la durée pendant laquelle vous comptez garder le prêt : changez. Plus long : restez. Une revente ou un remboursement anticipé prévu raccourcit la fenêtre et peut inverser la réponse à lui seul.',
      },
      {
        h: 'Gare au piège de la durée',
        p: 'Allonger la durée restante fait paraître la nouvelle mensualité plus petite, même à taux égal. Pour comparer les taux honnêtement, saisissez le même nombre de mois restants des deux côtés ; n’allongez la durée que si vous voulez délibérément une mensualité plus basse, en acceptant de payer des intérêts plus longtemps.',
      },
    ],
    faq: [
      { q: 'Quels frais mettre dans les deux champs ?', a: 'Tout ce que vous payez à cause du changement : les indemnités de remboursement anticipé (IRA) du prêt en cours, plus frais de dossier, d’expertise, de garantie ou de notaire du nouveau. Ce que vous paieriez de toute façon ne compte pas.' },
      { q: 'Quel écart de taux faut-il ?', a: 'Aucun chiffre universel. Un gros capital restant et beaucoup de mois devant rendent un demi-point déjà intéressant ; un petit capital près de l’échéance peut ne pas justifier un point entier. C’est précisément ce que répond le mois de rentabilité.' },
      { q: 'Pourquoi le calcul suppose-t-il des mensualités constantes ?', a: 'Les deux prêts sont modélisés en prêt amortissable à mensualités constantes, la forme la plus courante. Pour un prêt in fine ou à amortissement constant, les totaux diffèrent un peu, mais la logique du seuil reste la même.' },
    ],
    ui: {
      section: 'Prêt actuel et offre', balance: 'Capital restant dû',
      currentRate: 'Taux actuel (% par an)', currentTerm: 'Mois restants',
      newRate: 'Nouveau taux (% par an)', newTerm: 'Nouvelle durée (mois)',
      fee: 'Indemnités de remboursement anticipé', feeHint: 'Laissez 0 s’il n’y en a pas.',
      costs: 'Autres frais du changement', calc: 'Comparer',
      net: 'Gain net après frais', worth: 'Le rachat est gagnant', notWorth: 'Le rachat est perdant',
      monthlyChange: 'Variation de la mensualité', interestSaved: 'Intérêts économisés',
      moreInterest: 'vous payez plus d’intérêts', beforeCosts: 'avant frais',
      breakEven: 'Seuil de rentabilité', immediate: 'Immédiat', na: 'Jamais', naSub: 'La mensualité ne baisse pas',
      monthsUnit: 'mois', upfront: 'Frais initiaux',
      currentInterest: 'Intérêts restants du prêt actuel', newInterest: 'Intérêts du nouveau prêt',
      note: 'La devise est celle que vous saisissez. Les deux prêts sont calculés à mensualités constantes.',
    },
  },
  hi: {
    title: 'लोन बैलेंस ट्रांसफ़र कैलकुलेटर',
    desc: 'फ़ीस जोड़कर लोन ट्रांसफ़र फ़ायदे का है या नहीं, और कितने महीनों में ख़र्च वसूल होगा',
    short: 'बैलेंस ट्रांसफ़र फ़ायदेमंद है?',
    intro: [
      {
        h: 'कम ब्याज दर अपने आप नहीं जिताती',
        p: 'लोन बदलने में बचत से पहले ख़र्च होता है: पुराने लोन के फ़ोरक्लोज़र शुल्क और नए की प्रोसेसिंग फ़ीस वग़ैरह। महीने की 120 की बचत के लिए 2,400 पहले देने पड़ें, तो पहले 20 महीने आप घाटे में रहते हैं — और लोन उससे पहले ख़त्म हो जाए, तो घाटा कभी पूरा नहीं होता।',
      },
      {
        h: 'ब्रेक-ईवन ही असली कसौटी है',
        p: 'यह कैलकुलेटर शुरुआती ख़र्च को मासिक बचत से भाग देकर बताता है कि किस महीने से आप फ़ायदे में आते हैं। जितना समय लोन रखने का इरादा है, उससे कम निकले तो ट्रांसफ़र कीजिए; ज़्यादा निकले तो वहीं रहिए। बीच में बेचने या चुकाने की योजना यह खिड़की छोटी कर देती है और अकेले ही जवाब पलट सकती है।',
      },
      {
        h: 'अवधि बढ़ाने के झांसे से बचिए',
        p: 'बची अवधि खींच देने से उसी दर पर भी नई किश्त छोटी दिखती है। दरों की ईमानदार तुलना के लिए दोनों में बराबर बचे महीने भरिए; अवधि तभी बढ़ाइए जब जान-बूझकर किश्त घटानी हो और लंबे समय तक ब्याज देना मंज़ूर हो।',
      },
    ],
    faq: [
      { q: 'ख़र्च के दोनों खानों में क्या-क्या डालें?', a: 'जो कुछ बदलने की वजह से देना पड़े: मौजूदा लोन के फ़ोरक्लोज़र या प्री-पेमेंट शुल्क, और नए लोन की प्रोसेसिंग फ़ीस, मूल्यांकन, स्टांप वग़ैरह। जो वैसे भी देना होता, वह नहीं गिना जाता।' },
      { q: 'दरों में कितना अंतर चाहिए?', a: 'कोई एक जादुई संख्या नहीं है। बक़ाया बड़ा हो और महीने बहुत बचे हों, तो आधा प्रतिशत भी काफ़ी है; बक़ाया छोटा हो और अंत पास, तो पूरा एक प्रतिशत भी कम पड़ सकता है। ब्रेक-ईवन का महीना ठीक इसी का जवाब है।' },
      { q: 'गणना बराबर मासिक किश्त क्यों मानती है?', a: 'दोनों लोन सबसे आम तरीक़े — बराबर मासिक किश्त (EMI) — से गिने जाते हैं। आपका लोन सिर्फ़-ब्याज या घटती किश्त वाला हो तो कुल रक़में थोड़ी अलग होंगी, पर ब्रेक-ईवन का तर्क वही रहता है।' },
    ],
    ui: {
      section: 'मौजूदा लोन और नया प्रस्ताव', balance: 'बक़ाया मूलधन',
      currentRate: 'मौजूदा दर (सालाना %)', currentTerm: 'बचे महीने',
      newRate: 'नई दर (सालाना %)', newTerm: 'नई अवधि (महीने)',
      fee: 'फ़ोरक्लोज़र / प्री-पेमेंट शुल्क', feeHint: 'न हो तो 0 रहने दें।',
      costs: 'बदलने के अन्य ख़र्च', calc: 'तुलना करें',
      net: 'ख़र्च काटकर शुद्ध फ़ायदा', worth: 'ट्रांसफ़र फ़ायदे का है', notWorth: 'ट्रांसफ़र घाटे का है',
      monthlyChange: 'मासिक किश्त में बदलाव', interestSaved: 'बचा ब्याज',
      moreInterest: 'ब्याज उल्टा बढ़ता है', beforeCosts: 'ख़र्च से पहले',
      breakEven: 'ब्रेक-ईवन', immediate: 'तुरंत', na: 'कभी नहीं', naSub: 'मासिक किश्त घटती ही नहीं',
      monthsUnit: 'महीने', upfront: 'शुरुआती ख़र्च',
      currentInterest: 'मौजूदा लोन का बचा ब्याज', newInterest: 'नए लोन का ब्याज',
      note: 'मुद्रा वही है जो आप डालें। दोनों लोन बराबर मासिक किश्त (EMI) मानकर गिने जाते हैं।',
    },
  },
  'zh-hans': {
    title: '贷款置换（转贷）计算器',
    desc: '把手续费也算进去，看转贷到底划不划算、几个月能回本',
    short: '转贷划算吗',
    intro: [
      {
        h: '利率低了，不等于赢了',
        p: '换贷款先要花钱，才谈得上省钱：旧贷款的提前还款违约金，新贷款的手续费、评估和登记之类。要是每月省 120 得先付 2,400，头 20 个月你都在亏——贷款要是在那之前就结清，这笔账永远翻不回来。',
      },
      {
        h: '回本的月数才是真标准',
        p: '这个计算器用初期费用除以每月省下的钱，算出第几个月开始转亏为盈。比你打算持有贷款的时间短，就换；比它长，就别动。中途打算卖房或提前结清，窗口就更窄，单这一条就可能把答案翻过来。',
      },
      {
        h: '当心拉长期限的把戏',
        p: '把剩余期限拉长，哪怕利率不变，新月供也会显得更小。想诚实地比利率，两边就填一样的剩余月数；只有当你明知要多付利息、也确实想减轻月供时，才去拉长期限。',
      },
    ],
    faq: [
      { q: '两个费用栏该填什么？', a: '一切因为换贷才要付的钱：旧贷款的提前还款违约金，加上新贷款的手续费、评估费、登记费之类。本来就要付的钱不算。' },
      { q: '利率差多少才值得？', a: '没有放之四海的数字。余额大、剩的月数多，差半个点就值得动手；余额小、快到期，差一个点也未必够。回本月数回答的正是这个问题。' },
      { q: '为什么按每月等额还款计算？', a: '两笔贷款都按最常见的等额本息计算。你的贷款若是等额本金或先息后本，总数会有些出入，但回本的逻辑不变。' },
    ],
    ui: {
      section: '现在的贷款和新的方案', balance: '剩余本金',
      currentRate: '当前利率（年 %）', currentTerm: '剩余期限（月）',
      newRate: '新利率（年 %）', newTerm: '新期限（月）',
      fee: '提前还款违约金', feeHint: '没有就留 0。',
      costs: '其他换贷费用', calc: '比一比',
      net: '扣除费用后的净收益', worth: '转贷划算', notWorth: '转贷亏钱',
      monthlyChange: '月供变化', interestSaved: '省下的利息',
      moreInterest: '利息反而更多', beforeCosts: '未扣费用',
      breakEven: '回本时间', immediate: '立即', na: '回不了本', naSub: '月供没有变少',
      monthsUnit: '个月', upfront: '初期费用',
      currentInterest: '现贷款剩余利息', newInterest: '新贷款总利息',
      note: '货币就是你填入的那种。两笔贷款都按等额本息计算。',
    },
  },
  'zh-hant': {
    title: '貸款轉貸試算機',
    desc: '把手續費也算進去，看轉貸到底划不划算、幾個月能回本',
    short: '轉貸划算嗎',
    intro: [
      {
        h: '利率低了，不等於贏了',
        p: '換貸款要先花錢，才談得上省錢：舊貸款的提前清償違約金，新貸款的手續費、鑑價和設定費之類。要是每月省 120 得先付 2,400，頭 20 個月你都在虧——貸款要是在那之前就結清，這筆帳永遠翻不回來。',
      },
      {
        h: '回本的月數才是真標準',
        p: '這個試算用初期費用除以每月省下的錢，算出第幾個月開始轉虧為盈。比你打算持有貸款的時間短，就換；比它長，就別動。中途打算賣房或提前清償，窗口就更窄，單這一條就可能把答案翻過來。',
      },
      {
        h: '當心拉長年限的把戲',
        p: '把剩餘年限拉長，哪怕利率不變，新的月付金也會顯得更小。想誠實地比利率，兩邊就填一樣的剩餘月數；只有當你明知要多付利息、也確實想減輕月付時，才去拉長年限。',
      },
    ],
    faq: [
      { q: '兩個費用欄該填什麼？', a: '一切因為轉貸才要付的錢：舊貸款的提前清償違約金，加上新貸款的手續費、鑑價費、設定費之類。本來就要付的錢不算。' },
      { q: '利率差多少才值得？', a: '沒有放諸四海皆準的數字。餘額大、剩的月數多，差半個百分點就值得動手；餘額小、快到期，差一個百分點也未必夠。回本月數回答的正是這個問題。' },
      { q: '為什麼按每月本息平均攤還計算？', a: '兩筆貸款都按最常見的本息平均攤還計算。你的貸款若是本金平均攤還或只繳利息，總數會有些出入，但回本的邏輯不變。' },
    ],
    ui: {
      section: '現在的貸款和新的方案', balance: '剩餘本金',
      currentRate: '目前利率（年 %）', currentTerm: '剩餘期數（月）',
      newRate: '新利率（年 %）', newTerm: '新期數（月）',
      fee: '提前清償違約金', feeHint: '沒有就留 0。',
      costs: '其他轉貸費用', calc: '比一比',
      net: '扣除費用後的淨收益', worth: '轉貸划算', notWorth: '轉貸虧錢',
      monthlyChange: '月付金變化', interestSaved: '省下的利息',
      moreInterest: '利息反而更多', beforeCosts: '未扣費用',
      breakEven: '回本時間', immediate: '立即', na: '回不了本', naSub: '月付金沒有變少',
      monthsUnit: '個月', upfront: '初期費用',
      currentInterest: '現貸款剩餘利息', newInterest: '新貸款總利息',
      note: '貨幣就是你填入的那種。兩筆貸款都按本息平均攤還計算。',
    },
  },
};

/**
 * 상환방식 비교 — 계산은 lib/loan-schedule.ts를 한국판 그대로 쓴다.
 *
 * 세 방식의 이름은 언어마다 제 것이 있어 번역하지 않았다. 스페인어권은
 * 프랑스식·독일식·미국식이라 부르고, 브라질은 Price·SAC, 독일은
 * Annuität·Tilgung·endfällig, 프랑스는 amortissable·dégressif·in fine다.
 */
export const LOAN_METHOD: CalcTable = {
  en: {
    title: 'Loan repayment methods compared',
    desc: 'Fully amortizing, equal principal and interest-only balloon, side by side on the same loan',
    short: 'Three repayment methods, one loan',
    intro: [
      {
        h: 'Three shapes for the same debt',
        p: 'A fully amortizing loan charges the same amount every month — mostly interest at first, mostly principal at the end. Equal-principal repayment pays a fixed slice of principal plus interest on what remains, so the first month is the heaviest and every one after is lighter. Interest-only keeps the payments smallest of all, then demands the entire principal in one balloon at maturity.',
      },
      {
        h: 'Total interest follows how fast the principal falls',
        p: 'Interest accrues on the outstanding balance, so the method that shrinks it fastest — equal principal — costs the least, and interest-only, where the balance never moves, costs the most: on the same loan, almost exactly double the equal-principal figure. The amortizing loan sits in between.',
      },
      {
        h: 'The trade is first-month burden against total cost',
        p: 'Equal principal is cheapest but opens with the biggest payment. The amortizing loan buys a flat, plannable payment for somewhat more interest. The balloon buys the lightest months at the highest total cost, plus a repayment cliff at the end. Pick by what your cash flow can carry, not by the smallest total.',
      },
    ],
    faq: [
      { q: 'Why does equal principal cost the least?', a: 'The balance starts falling at full speed from the first month, so every later month charges interest on a smaller number. Over the term you pay interest on roughly half the principal, where the balloon loan pays it on all of it the whole time.' },
      { q: 'Why is my amortizing payment mostly interest at first?', a: 'Interest is charged on the outstanding balance, which is largest at the start. The instalment is fixed, so whatever interest does not eat goes to principal — a share that grows every month as the balance falls.' },
      { q: 'When does interest-only make sense?', a: 'When the principal is genuinely coming from somewhere else: a property sale, a maturing investment, a bridging situation. As a way to lower monthly payments it is the most expensive option there is, and the whole principal is still waiting at the end.' },
    ],
    ui: {
      section: 'The loan', principal: 'Loan amount', rate: 'Annual rate (%)', term: 'Term (months)', calc: 'Compare',
      best: 'Cheapest in total interest',
      mEqualPayment: 'Fully amortizing', mEqualPrincipal: 'Equal principal', mBullet: 'Interest-only + balloon',
      firstPayment: 'First payment', lastPayment: 'Last payment',
      totalInterest: 'Total interest', totalPaid: 'Total repaid', vsBest: 'More than the cheapest',
      note: 'The currency is whatever you enter. Fixed rate, no early repayment.',
    },
  },
  es: {
    title: 'Comparador de sistemas de amortización',
    desc: 'Francés, alemán y americano, lado a lado sobre el mismo préstamo',
    short: 'Tres sistemas, un préstamo',
    intro: [
      {
        h: 'Tres formas de devolver la misma deuda',
        p: 'El sistema francés cobra la misma cuota todos los meses: al principio casi todo es interés, al final casi todo capital. El alemán amortiza una porción fija de capital más los intereses del saldo, así que el primer mes es el más pesado y cada uno siguiente pesa menos. El americano cobra solo intereses y exige todo el capital de golpe al vencimiento.',
      },
      {
        h: 'El interés total sigue a la velocidad del capital',
        p: 'Los intereses se devengan sobre el saldo pendiente, así que el sistema que lo reduce más rápido — el alemán — es el más barato, y el americano, donde el saldo no se mueve, el más caro: sobre el mismo préstamo, casi exactamente el doble que el alemán. El francés queda en medio.',
      },
      {
        h: 'El trato es carga inicial contra coste total',
        p: 'El alemán es el más barato pero arranca con la cuota más alta. El francés compra una cuota plana y previsible a cambio de algo más de interés. El americano compra los meses más ligeros al mayor coste total, con un precipicio de pago al final. Elige por lo que tu flujo de caja aguanta, no por el total más pequeño.',
      },
    ],
    faq: [
      { q: '¿Por qué el sistema alemán es el más barato?', a: 'El saldo empieza a caer a toda velocidad desde el primer mes, así que cada mes siguiente devenga intereses sobre una cifra menor. A lo largo del plazo pagas intereses sobre más o menos la mitad del capital; el americano los paga sobre todo el capital todo el tiempo.' },
      { q: '¿Por qué mi cuota francesa es casi todo interés al principio?', a: 'El interés se cobra sobre el saldo pendiente, que es máximo al arrancar. Como la cuota es fija, lo que el interés no se come va a capital — una parte que crece mes a mes según baja el saldo.' },
      { q: '¿Cuándo tiene sentido el sistema americano?', a: 'Cuando el capital va a salir de verdad de otro sitio: la venta de un inmueble, una inversión que vence, un préstamo puente. Como truco para bajar la cuota es la opción más cara que existe, y el capital entero sigue esperando al final.' },
    ],
    ui: {
      section: 'El préstamo', principal: 'Importe del préstamo', rate: 'Tipo anual (%)', term: 'Plazo (meses)', calc: 'Comparar',
      best: 'El de menos intereses totales',
      mEqualPayment: 'Sistema francés (cuota constante)', mEqualPrincipal: 'Sistema alemán (amortización constante)', mBullet: 'Sistema americano (solo intereses)',
      firstPayment: 'Primera cuota', lastPayment: 'Última cuota',
      totalInterest: 'Intereses totales', totalPaid: 'Total devuelto', vsBest: 'Más que el más barato',
      note: 'La moneda es la que introduzcas. Tipo fijo y sin amortización anticipada.',
    },
  },
  'pt-br': {
    title: 'Comparador de amortização: Price, SAC e americano',
    desc: 'Tabela Price, SAC e pagamento no vencimento, lado a lado no mesmo contrato',
    short: 'Price × SAC × americano',
    intro: [
      {
        h: 'Três formas de devolver a mesma dívida',
        p: 'Na Tabela Price a parcela é igual todo mês: no começo quase tudo é juro, no fim quase tudo amortização. No SAC você amortiza uma fatia fixa do principal mais os juros do saldo — a primeira parcela é a mais pesada e as seguintes vão caindo. No sistema americano pagam-se só os juros, e o principal inteiro vence de uma vez no fim.',
      },
      {
        h: 'O juro total segue a velocidade do principal',
        p: 'Juros correm sobre o saldo devedor, então o sistema que derruba o saldo mais rápido — o SAC — é o mais barato, e o americano, em que o saldo não se move, o mais caro: no mesmo contrato, quase exatamente o dobro do SAC. A Price fica no meio.',
      },
      {
        h: 'A troca é peso inicial contra custo total',
        p: 'O SAC é o mais barato mas abre com a maior parcela. A Price compra uma parcela fixa e previsível por um pouco mais de juros. O americano compra os meses mais leves ao maior custo total, com um paredão de pagamento no fim. Escolha pelo que o seu caixa aguenta, não pelo menor total.',
      },
    ],
    faq: [
      { q: 'Por que o SAC paga menos juros?', a: 'O saldo começa a cair em velocidade máxima desde o primeiro mês, então cada mês seguinte cobra juros sobre um número menor. Ao longo do prazo você paga juros sobre mais ou menos metade do principal; o americano paga sobre o principal inteiro o tempo todo.' },
      { q: 'Por que minha parcela na Price é quase só juros no começo?', a: 'O juro incide sobre o saldo devedor, que é máximo na largada. Como a parcela é fixa, o que o juro não come vira amortização — uma fatia que cresce mês a mês conforme o saldo cai.' },
      { q: 'Quando o sistema americano faz sentido?', a: 'Quando o principal vai sair de verdade de outro lugar: a venda de um imóvel, uma aplicação que vence, uma ponte até lá. Como jeito de baixar a parcela é a opção mais cara que existe — e o principal inteiro continua esperando no fim.' },
    ],
    ui: {
      section: 'O contrato', principal: 'Valor do empréstimo', rate: 'Taxa anual (%)', term: 'Prazo (meses)', calc: 'Comparar',
      best: 'O de menos juros totais',
      mEqualPayment: 'Tabela Price (parcela fixa)', mEqualPrincipal: 'SAC (amortização constante)', mBullet: 'Americano (só juros)',
      firstPayment: 'Primeira parcela', lastPayment: 'Última parcela',
      totalInterest: 'Juros totais', totalPaid: 'Total devolvido', vsBest: 'A mais que o mais barato',
      note: 'A moeda é a que você digitar. Taxa fixa, sem amortização antecipada.',
    },
  },
  ja: {
    title: '返済方式の比較計算機',
    desc: '元利均等・元金均等・期日一括を同じ借入で並べて比べます',
    short: '三つの返済方式を並べて',
    intro: [
      {
        h: '同じ借金に三つの形',
        p: '元利均等は毎月同じ額を払います。はじめはほとんど利息で、終わりに近づくほど元金が増えます。元金均等は元金を均等に割り、残高への利息を上乗せするので、初月がいちばん重く、月を追うごとに軽くなります。期日一括は毎月利息だけを払い、満期に元金を丸ごと返します。',
      },
      {
        h: '総利息は元金が減る速さで決まる',
        p: '利息は残高に付くので、残高を最も速く減らす元金均等が最も安く、残高がまったく動かない期日一括が最も高くつきます。同じ借入なら、期日一括の利息は元金均等のほぼ2倍です。元利均等はその中間に収まります。',
      },
      {
        h: '天秤に載るのは初月の重さと総費用',
        p: '元金均等は最安ですが初月が最重。元利均等は毎月一定という計画の立てやすさを、いくらかの利息で買います。期日一括は月々の軽さを最高の総費用で買い、最後に返済の崖が待ちます。合計の小ささではなく、家計が毎月耐えられる形で選んでください。',
      },
    ],
    faq: [
      { q: '元金均等はなぜ利息が少ないのですか。', a: '初月から全速で残高が減るため、後の月ほど小さい数字に利息が付くからです。期間をならすと元金のおよそ半分に利息を払う計算で、期日一括は全期間ずっと全額に払います。' },
      { q: '元利均等の支払いが最初ほとんど利息なのはなぜですか。', a: '利息は残高に対して付き、残高は最初が最大だからです。毎月の額は一定なので、利息が食わなかった残りが元金に回ります。その取り分は残高が減るにつれ毎月増えていきます。' },
      { q: '期日一括が向くのはどんなときですか。', a: '満期に元金を返すあてが本当に別にあるときです。不動産の売却、満期を迎える運用、つなぎの資金。月々を軽くする手段としては最も高くつく選択で、最後に元金がそのまま待っています。' },
    ],
    ui: {
      section: '借入の条件', principal: '借入元金', rate: '年利 (%)', term: '期間（か月）', calc: '比べる',
      best: '利息が最も少ない方式',
      mEqualPayment: '元利均等', mEqualPrincipal: '元金均等', mBullet: '期日一括',
      firstPayment: '初月の支払い', lastPayment: '最終月の支払い',
      totalInterest: '総利息', totalPaid: '総返済額', vsBest: '最少の方式より',
      note: '通貨は入力したものです。固定金利・繰上返済なしの前提です。',
    },
  },
  de: {
    title: 'Vergleich: Annuitäten-, Tilgungs- und endfälliges Darlehen',
    desc: 'Drei Rückzahlungsarten auf demselben Kredit — Raten, Zinssummen und der Unterschied',
    short: 'Drei Rückzahlungsarten im Vergleich',
    intro: [
      {
        h: 'Drei Formen für dieselbe Schuld',
        p: 'Das Annuitätendarlehen kostet jeden Monat gleich viel — anfangs überwiegend Zinsen, gegen Ende überwiegend Tilgung. Das Tilgungsdarlehen zahlt eine feste Scheibe des Kapitals plus Zinsen auf den Rest: der erste Monat ist der schwerste, jeder weitere leichter. Das endfällige Darlehen verlangt monatlich nur Zinsen und am Ende das gesamte Kapital auf einen Schlag.',
      },
      {
        h: 'Die Zinssumme folgt dem Tempo der Tilgung',
        p: 'Zinsen laufen auf den Restsaldo auf. Die Form, die ihn am schnellsten drückt — das Tilgungsdarlehen — ist die billigste; das endfällige, bei dem sich der Saldo nie bewegt, die teuerste: auf demselben Kredit fast genau das Doppelte des Tilgungsdarlehens. Die Annuität liegt dazwischen.',
      },
      {
        h: 'Getauscht wird Anfangslast gegen Gesamtkosten',
        p: 'Das Tilgungsdarlehen ist am günstigsten, beginnt aber mit der höchsten Rate. Die Annuität erkauft sich die planbare, gleichbleibende Rate mit etwas mehr Zinsen. Das endfällige erkauft die leichtesten Monate mit den höchsten Gesamtkosten und einer Klippe am Ende. Wählen Sie nach dem, was das Konto jeden Monat trägt — nicht nach der kleinsten Summe.',
      },
    ],
    faq: [
      { q: 'Warum ist das Tilgungsdarlehen am billigsten?', a: 'Der Saldo fällt vom ersten Monat an mit voller Geschwindigkeit, also fallen die Zinsen jeden Monat auf eine kleinere Zahl an. Über die Laufzeit zahlen Sie Zinsen auf etwa die Hälfte des Kapitals; das endfällige Darlehen zahlt sie die ganze Zeit auf alles.' },
      { q: 'Warum besteht meine Annuität anfangs fast nur aus Zinsen?', a: 'Zinsen werden auf den Restsaldo berechnet, und der ist am Anfang am größten. Die Rate ist fest — was die Zinsen nicht aufzehren, geht in die Tilgung, und dieser Anteil wächst Monat für Monat mit sinkendem Saldo.' },
      { q: 'Wann ist ein endfälliges Darlehen sinnvoll?', a: 'Wenn das Kapital am Ende wirklich woanders herkommt: aus einem Immobilienverkauf, einer fälligen Anlage, einer Zwischenfinanzierung. Als Mittel, die Rate zu drücken, ist es die teuerste Option überhaupt — und das ganze Kapital wartet trotzdem am Schluss.' },
    ],
    ui: {
      section: 'Der Kredit', principal: 'Darlehensbetrag', rate: 'Jahreszins (%)', term: 'Laufzeit (Monate)', calc: 'Vergleichen',
      best: 'Am wenigsten Zinsen insgesamt',
      mEqualPayment: 'Annuitätendarlehen', mEqualPrincipal: 'Tilgungsdarlehen', mBullet: 'Endfälliges Darlehen',
      firstPayment: 'Erste Rate', lastPayment: 'Letzte Rate',
      totalInterest: 'Zinsen gesamt', totalPaid: 'Gesamt zurückgezahlt', vsBest: 'Mehr als die günstigste Form',
      note: 'Die Währung ist die Ihrer Eingabe. Fester Zins, keine Sondertilgung.',
    },
  },
  fr: {
    title: 'Comparateur de remboursement : amortissable, dégressif, in fine',
    desc: 'Mensualités constantes, échéances dégressives et prêt in fine, côte à côte sur le même prêt',
    short: 'Trois modes de remboursement',
    intro: [
      {
        h: 'Trois formes pour la même dette',
        p: 'Le prêt amortissable à mensualités constantes coûte la même chose chaque mois — surtout des intérêts au début, surtout du capital à la fin. Le prêt à échéances dégressives rembourse une tranche fixe de capital plus les intérêts du solde : le premier mois est le plus lourd, chaque suivant plus léger. Le prêt in fine ne prélève que les intérêts, puis exige tout le capital d’un coup à l’échéance.',
      },
      {
        h: 'Le total d’intérêts suit la vitesse du capital',
        p: 'Les intérêts courent sur le capital restant dû. La formule qui le fait fondre le plus vite — les échéances dégressives — coûte le moins ; l’in fine, où le solde ne bouge jamais, coûte le plus : sur le même prêt, presque exactement le double du dégressif. L’amortissable constant se place entre les deux.',
      },
      {
        h: 'On échange charge initiale contre coût total',
        p: 'Le dégressif est le moins cher mais démarre avec la mensualité la plus haute. L’amortissable constant achète une mensualité plate et prévisible contre un peu plus d’intérêts. L’in fine achète les mois les plus légers au coût total le plus élevé, avec une falaise de remboursement au bout. Choisissez selon ce que votre trésorerie supporte, pas selon le plus petit total.',
      },
    ],
    faq: [
      { q: 'Pourquoi le dégressif coûte-t-il le moins ?', a: 'Le solde chute à pleine vitesse dès le premier mois, donc chaque mois suivant facture des intérêts sur un chiffre plus petit. Sur la durée, vous payez des intérêts sur environ la moitié du capital ; l’in fine les paie tout le temps sur la totalité.' },
      { q: 'Pourquoi ma mensualité constante est-elle surtout des intérêts au début ?', a: 'Les intérêts se calculent sur le capital restant dû, maximal au départ. La mensualité étant fixe, ce que les intérêts ne mangent pas va au capital — une part qui grossit chaque mois à mesure que le solde baisse.' },
      { q: 'Quand le prêt in fine a-t-il un sens ?', a: 'Quand le capital viendra vraiment d’ailleurs : la revente d’un bien, un placement qui arrive à terme, un relais. Comme moyen d’alléger la mensualité, c’est l’option la plus chère qui soit — et tout le capital attend encore à la fin.' },
    ],
    ui: {
      section: 'Le prêt', principal: 'Montant emprunté', rate: 'Taux annuel (%)', term: 'Durée (mois)', calc: 'Comparer',
      best: 'Le moins d’intérêts au total',
      mEqualPayment: 'Amortissable (mensualités constantes)', mEqualPrincipal: 'Échéances dégressives', mBullet: 'In fine (intérêts seuls)',
      firstPayment: 'Première mensualité', lastPayment: 'Dernière mensualité',
      totalInterest: 'Intérêts totaux', totalPaid: 'Total remboursé', vsBest: 'De plus que le moins cher',
      note: 'La devise est celle que vous saisissez. Taux fixe, sans remboursement anticipé.',
    },
  },
  hi: {
    title: 'लोन चुकौती के तरीक़ों की तुलना',
    desc: 'बराबर EMI, घटती किश्त और सिर्फ़-ब्याज (बुलेट) — एक ही लोन पर आमने-सामने',
    short: 'तीन तरीक़े, एक लोन',
    intro: [
      {
        h: 'एक ही क़र्ज़ के तीन रूप',
        p: 'बराबर EMI में हर महीने उतनी ही रक़म जाती है — शुरुआत में ज़्यादातर ब्याज, अंत में ज़्यादातर मूलधन। घटती किश्त में मूलधन का बराबर टुकड़ा और बचे हुए पर ब्याज जाता है, इसलिए पहला महीना सबसे भारी और आगे के हल्के होते जाते हैं। सिर्फ़-ब्याज (बुलेट) में महीने-दर-महीने केवल ब्याज जाता है और मियाद पूरी होने पर पूरा मूलधन एक साथ।',
      },
      {
        h: 'कुल ब्याज मूलधन घटने की रफ़्तार से तय होता है',
        p: 'ब्याज बक़ाया रक़म पर लगता है, इसलिए जो तरीक़ा बक़ाया सबसे तेज़ घटाता है — घटती किश्त — वही सबसे सस्ता पड़ता है, और बुलेट, जिसमें बक़ाया हिलता ही नहीं, सबसे महँगा: उसी लोन पर घटती किश्त का लगभग ठीक दुगना। बराबर EMI बीच में रहती है।',
      },
      {
        h: 'सौदा है पहले महीने का बोझ बनाम कुल लागत',
        p: 'घटती किश्त सबसे सस्ती है पर सबसे भारी शुरुआत के साथ। बराबर EMI थोड़े ज़्यादा ब्याज के बदले सपाट, योजना बनाने लायक़ किश्त देती है। बुलेट सबसे हल्के महीने सबसे ऊँची कुल लागत पर देता है, और अंत में चुकौती की खाई। सबसे छोटे कुल से नहीं, अपनी जेब जो हर महीने उठा सके, उससे चुनिए।',
      },
    ],
    faq: [
      { q: 'घटती किश्त में ब्याज कम क्यों लगता है?', a: 'पहले ही महीने से बक़ाया पूरी रफ़्तार से गिरने लगता है, इसलिए हर अगले महीने छोटी रक़म पर ब्याज लगता है। पूरी अवधि में मोटे तौर पर आधे मूलधन पर ब्याज जाता है; बुलेट में पूरे समय पूरे मूलधन पर।' },
      { q: 'बराबर EMI की शुरुआती किश्तें ज़्यादातर ब्याज क्यों होती हैं?', a: 'ब्याज बक़ाया पर लगता है, और बक़ाया शुरुआत में सबसे बड़ा होता है। किश्त तय है, इसलिए ब्याज जो नहीं खा जाता वह मूलधन में जाता है — और बक़ाया घटने के साथ यह हिस्सा हर महीने बढ़ता है।' },
      { q: 'सिर्फ़-ब्याज कब समझ में आता है?', a: 'जब मूलधन सचमुच कहीं और से आना हो: कोई संपत्ति बिकनी हो, कोई निवेश परिपक्व होना हो, बीच की जुगत हो। किश्त घटाने की तरकीब के तौर पर यह सबसे महँगा रास्ता है — और पूरा मूलधन अंत में फिर भी खड़ा मिलता है।' },
    ],
    ui: {
      section: 'लोन की शर्तें', principal: 'लोन की रक़म', rate: 'सालाना दर (%)', term: 'अवधि (महीने)', calc: 'तुलना करें',
      best: 'सबसे कम कुल ब्याज वाला',
      mEqualPayment: 'बराबर EMI', mEqualPrincipal: 'घटती किश्त (बराबर मूलधन)', mBullet: 'सिर्फ़-ब्याज + बुलेट',
      firstPayment: 'पहली किश्त', lastPayment: 'आख़िरी किश्त',
      totalInterest: 'कुल ब्याज', totalPaid: 'कुल चुकाया', vsBest: 'सबसे सस्ते से ज़्यादा',
      note: 'मुद्रा वही है जो आप डालें। स्थिर दर, बीच में कोई पूर्व-भुगतान नहीं।',
    },
  },
  'zh-hans': {
    title: '还款方式对比计算器',
    desc: '等额本息、等额本金、先息后本，在同一笔贷款上并排比较',
    short: '三种还款方式对比',
    intro: [
      {
        h: '同一笔债的三种形状',
        p: '等额本息每月还一样多——前期大半是利息，后期大半是本金。等额本金每月还固定的一份本金，再加剩余本金的利息，所以第一个月最重，往后一月比一月轻。先息后本每月只付利息，到期把本金一次还清。',
      },
      {
        h: '总利息由本金下降的速度决定',
        p: '利息长在剩余本金上，所以本金降得最快的等额本金最省，剩余本金纹丝不动的先息后本最贵：同一笔贷款，先息后本的利息几乎正好是等额本金的两倍。等额本息落在两者之间。',
      },
      {
        h: '换来换去，是首月负担换总成本',
        p: '等额本金最省，但开头的月供最高；等额本息用略多的利息换来每月固定、好做计划的月供；先息后本用最高的总成本换来最轻的月供，末了还有一堵还本的墙。按每个月现金流扛得住的来选，别只看总数最小。',
      },
    ],
    faq: [
      { q: '等额本金为什么利息最少？', a: '本金从第一个月就全速下降，之后每个月的利息都算在更小的数字上。拉通整个期限，你大约只为一半本金付利息；先息后本则全程为全部本金付。' },
      { q: '等额本息的月供为什么前期几乎都是利息？', a: '利息按剩余本金计收，而剩余本金开头最大。月供固定，利息吃剩的部分才还本金——随着本金下降，这一份每月都在变大。' },
      { q: '先息后本什么时候说得通？', a: '本金到期时真有别的来路：一套要卖的房子、一笔到期的投资、一段过桥资金。若只是为了压低月供，这是最贵的一条路——而且全部本金最后仍在那里等着。' },
    ],
    ui: {
      section: '贷款条件', principal: '贷款本金', rate: '年利率 (%)', term: '期限（月）', calc: '比一比',
      best: '总利息最少的方式',
      mEqualPayment: '等额本息', mEqualPrincipal: '等额本金', mBullet: '先息后本',
      firstPayment: '首月还款', lastPayment: '末月还款',
      totalInterest: '总利息', totalPaid: '总还款额', vsBest: '比最省的多',
      note: '货币就是你填入的那种。固定利率，不含提前还款。',
    },
  },
  'zh-hant': {
    title: '還款方式比較計算機',
    desc: '本息平均攤還、本金平均攤還、到期一次清償，在同一筆貸款上並排比較',
    short: '三種還款方式比較',
    intro: [
      {
        h: '同一筆債的三種形狀',
        p: '本息平均攤還每月還一樣多——前期大半是利息，後期大半是本金。本金平均攤還每月還固定的一份本金，再加剩餘本金的利息，所以第一個月最重，往後一月比一月輕。只繳息的到期一次清償每月只付利息，到期把本金一次還清。',
      },
      {
        h: '總利息由本金下降的速度決定',
        p: '利息長在剩餘本金上，所以本金降得最快的本金平均攤還最省，剩餘本金紋絲不動的到期一次清償最貴：同一筆貸款，只繳息的利息幾乎正好是本金平均攤還的兩倍。本息平均攤還落在兩者之間。',
      },
      {
        h: '換來換去，是首月負擔換總成本',
        p: '本金平均攤還最省，但開頭的月付金最高；本息平均攤還用略多的利息換來每月固定、好做規劃的月付金；只繳息用最高的總成本換來最輕的月付，末了還有一堵還本的牆。按每個月現金流扛得住的來選，別只看總數最小。',
      },
    ],
    faq: [
      { q: '本金平均攤還為什麼利息最少？', a: '本金從第一個月就全速下降，之後每個月的利息都算在更小的數字上。拉長整個期限來看，你大約只為一半本金付利息；只繳息則全程為全部本金付。' },
      { q: '本息平均攤還的月付金為什麼前期幾乎都是利息？', a: '利息按剩餘本金計收，而剩餘本金開頭最大。月付金固定，利息吃剩的部分才還本金——隨著本金下降，這一份每月都在變大。' },
      { q: '只繳息什麼時候說得通？', a: '本金到期時真有別的來路：一戶要賣的房子、一筆到期的投資、一段過渡資金。若只是為了壓低月付金，這是最貴的一條路——而且全部本金最後仍在那裡等著。' },
    ],
    ui: {
      section: '貸款條件', principal: '貸款本金', rate: '年利率 (%)', term: '期數（月）', calc: '比一比',
      best: '總利息最少的方式',
      mEqualPayment: '本息平均攤還', mEqualPrincipal: '本金平均攤還', mBullet: '到期一次清償（只繳息）',
      firstPayment: '首月還款', lastPayment: '末月還款',
      totalInterest: '總利息', totalPaid: '總還款額', vsBest: '比最省的多',
      note: '貨幣就是你填入的那種。固定利率，不含提前還款。',
    },
  },
};
