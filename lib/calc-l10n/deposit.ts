import type { CalcTable } from './types.ts';

/** 예금 — 단리와 복리를 나란히. 이자소득세 15.4%는 한국 세법이라 입력으로 뺐다. */
export const DEPOSIT: CalcTable = {
  en: {
    title: 'Deposit interest calculator',
    desc: 'What a lump sum grows to, simple or compound, before and after tax',
    short: 'Lump sum · simple or compound',
    intro: [
      {
        h: 'Simple or compound changes everything but the first year',
        p: 'With simple interest only the original sum earns; with compound interest the interest joins in and earns too. Over twelve months the two are nearly identical. Over ten years the gap is large enough that it is the first thing worth checking in the terms.',
      },
      {
        h: 'Compare on the net amount, not the headline rate',
        p: 'Interest is usually taxed at source, so the rate on the poster is not the rate you receive. Once you enter your own tax rate, the net figure below is the number that actually lets you compare two products.',
      },
      {
        h: 'Breaking the term rewrites the calculation',
        p: 'Fixed-term deposits nearly always pay a much lower rate if you withdraw early — often close to nothing. This assumes you hold to maturity, so money you might need sooner will not behave like the result here.',
      },
    ],
    faq: [
      { q: 'Which should I pick if both are offered at the same rate?', a: 'Compound, always — it can only pay more. The reason simple interest still exists is that products offering it usually quote a slightly higher rate to compensate, so compare the final amounts rather than the rates.' },
      { q: 'What tax rate should I enter?', a: 'Whatever your country withholds on interest income, as a percentage. It varies widely and often depends on the account type, so the field starts at zero rather than guessing.' },
      { q: 'Does the compound option account for monthly compounding?', a: 'This one compounds annually. Monthly compounding on the same nominal rate ends up slightly higher; for a precise monthly schedule use the compound interest calculator.' },
    ],
    ui: {
      tabSimple: 'Simple interest', tabCompound: 'Compound interest',
      amount: 'Amount deposited', rate: 'Annual rate (%)', months: 'Term (months)',
      tax: 'Tax on interest (%)', calc: 'Calculate',
      note: 'Tax starts at 0 because the rate differs by country. Enter yours to see the net amount.',
      interest: 'Interest earned', taxPaid: 'Tax withheld', netInterest: 'Interest after tax',
      total: 'You receive', effective: 'Effective net rate',
    },
  },
  es: {
    title: 'Calculadora de intereses de depósito',
    desc: 'En cuánto se convierte un importe, con interés simple o compuesto, antes y después de impuestos',
    short: 'Importe único · simple o compuesto',
    intro: [
      {
        h: 'Simple o compuesto lo cambia todo salvo el primer año',
        p: 'Con interés simple solo genera el importe inicial; con interés compuesto los intereses se suman y también generan. En doce meses los dos van casi igualados. A diez años la diferencia es lo bastante grande como para ser lo primero que hay que mirar en las condiciones.',
      },
      {
        h: 'Compara por el importe neto, no por el tipo del cartel',
        p: 'Los intereses suelen tributar en origen, así que el tipo anunciado no es el que recibes. En cuanto introduces tu tipo impositivo, la cifra neta de abajo es la que de verdad permite comparar dos productos.',
      },
      {
        h: 'Cancelar antes reescribe el cálculo',
        p: 'Los depósitos a plazo casi siempre pagan un tipo mucho menor si retiras antes, a veces casi nada. Esto supone que llegas al vencimiento, así que un dinero que quizá necesites antes no se comportará como el resultado de aquí.',
      },
    ],
    faq: [
      { q: '¿Cuál elijo si me ofrecen ambos al mismo tipo?', a: 'Compuesto, siempre: solo puede pagar más. El interés simple sigue existiendo porque los productos que lo usan suelen anunciar un tipo algo mayor para compensar, así que compara importes finales, no tipos.' },
      { q: '¿Qué tipo impositivo pongo?', a: 'El que tu país retenga sobre los rendimientos, en porcentaje. Varía mucho y a menudo depende del tipo de cuenta, por eso el campo empieza en cero en vez de adivinar.' },
      { q: '¿La opción compuesta capitaliza mensualmente?', a: 'Esta capitaliza anualmente. Con capitalización mensual y el mismo tipo nominal el resultado sale algo más alto; para el detalle mes a mes usa la calculadora de interés compuesto.' },
    ],
    ui: {
      tabSimple: 'Interés simple', tabCompound: 'Interés compuesto',
      amount: 'Importe depositado', rate: 'Tipo anual (%)', months: 'Plazo (meses)',
      tax: 'Impuesto sobre intereses (%)', calc: 'Calcular',
      note: 'El impuesto empieza en 0 porque el tipo cambia según el país. Pon el tuyo para ver el neto.',
      interest: 'Intereses generados', taxPaid: 'Retención', netInterest: 'Intereses netos',
      total: 'Recibes', effective: 'Tipo neto efectivo',
    },
  },
  'pt-br': {
    title: 'Calculadora de juros de aplicação',
    desc: 'Quanto um valor único rende, com juros simples ou compostos, antes e depois do imposto',
    short: 'Valor único · simples ou composto',
    intro: [
      {
        h: 'Simples ou composto muda tudo, menos o primeiro ano',
        p: 'Nos juros simples só o valor inicial rende; nos compostos os juros entram na conta e rendem também. Em doze meses os dois ficam quase iguais. Em dez anos a diferença é grande o bastante para ser a primeira coisa a checar no contrato.',
      },
      {
        h: 'Compare pelo líquido, não pela taxa do cartaz',
        p: 'Os juros costumam ser tributados na fonte, então a taxa anunciada não é a que você recebe. Assim que você informa sua alíquota, o número líquido lá embaixo passa a ser o que realmente permite comparar dois produtos.',
      },
      {
        h: 'Resgatar antes reescreve a conta',
        p: 'Aplicações de prazo fixo quase sempre pagam bem menos em caso de resgate antecipado — às vezes quase nada. Aqui se assume que você vai até o vencimento, então dinheiro que talvez você precise antes não vai se comportar como este resultado.',
      },
    ],
    faq: [
      { q: 'Qual escolher se os dois vierem com a mesma taxa?', a: 'Composto, sempre — ele só pode pagar mais. Juros simples ainda existem porque os produtos que os usam costumam anunciar uma taxa um pouco maior para compensar; compare os valores finais, não as taxas.' },
      { q: 'Que alíquota devo informar?', a: 'A que o seu país retém sobre rendimentos, em porcentagem. Varia muito e frequentemente depende do tipo de conta, por isso o campo começa em zero em vez de chutar.' },
      { q: 'A opção composta capitaliza ao mês?', a: 'Esta capitaliza ao ano. Com capitalização mensal e a mesma taxa nominal o resultado sai um pouco maior; para o detalhe mês a mês use a calculadora de juros compostos.' },
    ],
    ui: {
      tabSimple: 'Juros simples', tabCompound: 'Juros compostos',
      amount: 'Valor aplicado', rate: 'Taxa anual (%)', months: 'Prazo (meses)',
      tax: 'Imposto sobre juros (%)', calc: 'Calcular',
      note: 'O imposto começa em 0 porque a alíquota muda de país para país. Informe a sua para ver o líquido.',
      interest: 'Juros rendidos', taxPaid: 'Imposto retido', netInterest: 'Juros líquidos',
      total: 'Você recebe', effective: 'Taxa líquida efetiva',
    },
  },
  ja: {
    title: '預金利息の計算機',
    desc: 'まとまったお金が単利・複利でいくらになるか、税引前と税引後で',
    short: '一括預入 · 単利と複利',
    intro: [
      {
        h: '単利か複利かは、1年目以外のすべてを変えます',
        p: '単利では元本だけが利息を生み、複利では生まれた利息も一緒に利息を生みます。12か月ならほとんど同じです。10年になると差ははっきり開き、商品説明でまず確かめるべき一点になります。',
      },
      {
        h: '比べるのは表示金利ではなく手取り額',
        p: '利息はたいてい源泉で課税されるので、看板の金利は受け取る金利ではありません。ご自分の税率を入れれば、下に出る税引後の金額こそが二つの商品を並べて比べられる数字になります。',
      },
      {
        h: '途中で解約すると前提が崩れます',
        p: '定期預金は中途解約するとずっと低い金利になり、ほとんどゼロに近いこともあります。ここでは満期まで置く前提で計算しているので、途中で使うかもしれないお金はこの通りには増えません。',
      },
    ],
    faq: [
      { q: '同じ金利で両方あるなら、どちらを選ぶべきですか。', a: '複利です。複利が単利を下回ることはありません。単利の商品が残っているのは、その分だけ表示金利を少し高くしていることが多いからで、金利ではなく最終金額で見比べてください。' },
      { q: '税率には何を入れればよいですか。', a: 'お住まいの国が利息に課す率を%で入れてください。国によって大きく違い、口座の種類でも変わるため、勝手に埋めず0から始めています。' },
      { q: '複利は月複利で計算していますか。', a: 'ここは年複利です。同じ名目金利なら月複利のほうが少し多くなります。月単位の推移が要るときは複利計算機を使ってください。' },
    ],
    ui: {
      tabSimple: '単利', tabCompound: '複利',
      amount: '預入金額', rate: '年利 (%)', months: '期間 (か月)',
      tax: '利息への税率 (%)', calc: '計算する',
      note: '税率は国ごとに違うので初期値は0です。ご自分の税率を入れると手取りが出ます。',
      interest: '利息', taxPaid: '税金', netInterest: '税引後の利息',
      total: '受取額', effective: '実質の税引後利回り',
    },
  },
  de: {
    title: 'Zinsrechner für Einlagen',
    desc: 'Woraus eine Einmalanlage wird — einfach oder mit Zinseszins, vor und nach Steuern',
    short: 'Einmalanlage · einfach oder Zinseszins',
    intro: [
      {
        h: 'Einfach oder Zinseszins ändert alles außer dem ersten Jahr',
        p: 'Bei einfachen Zinsen verzinst sich nur die Einlage; beim Zinseszins verzinsen sich die Zinsen mit. Über zwölf Monate sind beide fast gleich. Über zehn Jahre wird der Abstand so groß, dass es das Erste ist, was man in den Bedingungen nachsehen sollte.',
      },
      {
        h: 'Vergleichen Sie über den Nettobetrag, nicht über den Plakatzins',
        p: 'Zinsen werden meist an der Quelle besteuert, der beworbene Satz ist also nicht der, den Sie bekommen. Sobald Sie Ihren Steuersatz eintragen, ist die Nettozahl unten diejenige, mit der sich zwei Angebote wirklich vergleichen lassen.',
      },
      {
        h: 'Vorzeitige Auflösung schreibt die Rechnung um',
        p: 'Festgeld zahlt bei vorzeitiger Verfügung fast immer einen deutlich niedrigeren Satz, manchmal fast nichts. Hier wird angenommen, dass Sie bis zum Ende halten — Geld, das Sie früher brauchen könnten, verhält sich nicht wie dieses Ergebnis.',
      },
    ],
    faq: [
      { q: 'Was nehme ich, wenn beides zum selben Satz angeboten wird?', a: 'Immer den Zinseszins — mehr als die einfache Variante bringt er in jedem Fall. Einfache Zinsen gibt es noch, weil solche Produkte meist einen etwas höheren Satz ausloben; vergleichen Sie deshalb Endbeträge statt Sätze.' },
      { q: 'Welchen Steuersatz trage ich ein?', a: 'Den, den Ihr Land auf Zinserträge einbehält, in Prozent. Er unterscheidet sich stark und hängt oft von der Kontoart ab, deshalb beginnt das Feld bei null statt bei einer Schätzung.' },
      { q: 'Rechnet die Zinseszins-Variante monatlich?', a: 'Hier wird jährlich kapitalisiert. Monatliche Kapitalisierung ergibt beim selben Nominalzins etwas mehr; für den Verlauf Monat für Monat nehmen Sie den Zinseszinsrechner.' },
    ],
    ui: {
      tabSimple: 'Einfache Zinsen', tabCompound: 'Zinseszins',
      amount: 'Anlagebetrag', rate: 'Zinssatz p. a. (%)', months: 'Laufzeit (Monate)',
      tax: 'Steuer auf Zinsen (%)', calc: 'Berechnen',
      note: 'Die Steuer startet bei 0, weil der Satz je Land verschieden ist. Tragen Sie Ihren ein.',
      interest: 'Zinsertrag', taxPaid: 'Einbehaltene Steuer', netInterest: 'Zinsen nach Steuer',
      total: 'Auszahlung', effective: 'Effektiver Nettozins',
    },
  },
  fr: {
    title: 'Calculateur d’intérêts de dépôt',
    desc: 'Ce que devient une somme placée, en intérêts simples ou composés, avant et après impôt',
    short: 'Somme unique · simple ou composé',
    intro: [
      {
        h: 'Simple ou composé change tout sauf la première année',
        p: 'En intérêts simples, seul le capital rapporte ; en intérêts composés, les intérêts s’ajoutent et rapportent aussi. Sur douze mois les deux se tiennent. Sur dix ans l’écart devient assez large pour être la première chose à vérifier dans le contrat.',
      },
      {
        h: 'Comparez sur le net, pas sur le taux affiché',
        p: 'Les intérêts sont généralement imposés à la source : le taux de l’affiche n’est pas celui que vous touchez. Dès que vous saisissez votre taux d’imposition, le montant net ci-dessous devient le seul chiffre qui permette de comparer deux offres.',
      },
      {
        h: 'Sortir avant terme réécrit le calcul',
        p: 'Un dépôt à terme paie presque toujours bien moins en cas de retrait anticipé, parfois presque rien. Le calcul suppose que vous allez jusqu’à l’échéance : une somme dont vous pourriez avoir besoin avant ne se comportera pas comme ce résultat.',
      },
    ],
    faq: [
      { q: 'Que choisir si les deux sont proposés au même taux ?', a: 'Le composé, toujours : il ne peut que rapporter plus. Si l’intérêt simple existe encore, c’est que ces produits affichent en général un taux un peu supérieur pour compenser — comparez donc les montants finaux, pas les taux.' },
      { q: 'Quel taux d’imposition saisir ?', a: 'Celui que votre pays prélève sur les intérêts, en pourcentage. Il varie beaucoup et dépend souvent du type de compte : le champ démarre à zéro plutôt que de deviner.' },
      { q: 'L’option composée capitalise-t-elle mensuellement ?', a: 'Ici la capitalisation est annuelle. À taux nominal égal, une capitalisation mensuelle donne un peu plus ; pour le détail mois par mois, utilisez le calculateur d’intérêts composés.' },
    ],
    ui: {
      tabSimple: 'Intérêts simples', tabCompound: 'Intérêts composés',
      amount: 'Montant placé', rate: 'Taux annuel (%)', months: 'Durée (mois)',
      tax: 'Impôt sur les intérêts (%)', calc: 'Calculer',
      note: 'L’impôt démarre à 0 car le taux change selon le pays. Saisissez le vôtre pour voir le net.',
      interest: 'Intérêts perçus', taxPaid: 'Prélèvement', netInterest: 'Intérêts nets',
      total: 'Vous recevez', effective: 'Taux net effectif',
    },
  },
  hi: {
    title: 'जमा ब्याज कैलकुलेटर',
    desc: 'एकमुश्त रकम साधारण या चक्रवृद्धि ब्याज पर कितनी बनती है — कर से पहले और बाद',
    short: 'एकमुश्त जमा · साधारण या चक्रवृद्धि',
    intro: [
      {
        h: 'साधारण या चक्रवृद्धि — पहले साल के सिवा सब बदल देता है',
        p: 'साधारण ब्याज में सिर्फ़ मूलधन कमाता है; चक्रवृद्धि में कमाया हुआ ब्याज भी साथ आकर कमाने लगता है। बारह महीनों में दोनों लगभग बराबर रहते हैं। दस साल में फ़र्क़ इतना बड़ा हो जाता है कि शर्तों में सबसे पहले यही देखना चाहिए।',
      },
      {
        h: 'तुलना शुद्ध राशि से करें, विज्ञापित दर से नहीं',
        p: 'ब्याज पर आमतौर पर स्रोत पर ही कर कटता है, इसलिए पोस्टर वाली दर वह नहीं जो आपको मिलती है। अपनी कर दर डालते ही नीचे दिखने वाली शुद्ध राशि ही वह आंकड़ा बनती है जिससे दो उत्पाद सचमुच तुलनीय हैं।',
      },
      {
        h: 'बीच में तोड़ने पर हिसाब बदल जाता है',
        p: 'सावधि जमा समय से पहले तोड़ने पर लगभग हमेशा बहुत कम दर देती है, कभी-कभी नाम की। यहाँ मान लिया गया है कि आप परिपक्वता तक रखेंगे — जो पैसा बीच में चाहिए हो सकता है, वह इस नतीजे जैसा व्यवहार नहीं करेगा।',
      },
    ],
    faq: [
      { q: 'दोनों एक ही दर पर मिलें तो कौन-सा चुनूँ?', a: 'चक्रवृद्धि, हमेशा — वह कम कभी नहीं दे सकता। साधारण ब्याज इसलिए बचा हुआ है कि ऐसे उत्पाद अक्सर थोड़ी ऊँची दर दिखाकर भरपाई करते हैं; इसलिए दरें नहीं, अंतिम राशि मिलाइए।' },
      { q: 'कर दर में क्या डालूँ?', a: 'आपके देश में ब्याज आय पर जो कटता है, प्रतिशत में। यह बहुत भिन्न होता है और अक्सर खाते के प्रकार पर निर्भर करता है, इसलिए अनुमान लगाने के बजाय खाना शून्य से शुरू होता है।' },
      { q: 'क्या चक्रवृद्धि विकल्प मासिक चक्रवृद्धि करता है?', a: 'यह सालाना करता है। उसी नाममात्र दर पर मासिक चक्रवृद्धि थोड़ा ज़्यादा देती है; महीने-दर-महीने ब्योरे के लिए चक्रवृद्धि ब्याज कैलकुलेटर देखें।' },
    ],
    ui: {
      tabSimple: 'साधारण ब्याज', tabCompound: 'चक्रवृद्धि ब्याज',
      amount: 'जमा राशि', rate: 'वार्षिक दर (%)', months: 'अवधि (महीने)',
      tax: 'ब्याज पर कर (%)', calc: 'गणना करें',
      note: 'कर दर हर देश में अलग है, इसलिए शुरुआत 0 से है। अपनी दर डालकर शुद्ध राशि देखें।',
      interest: 'अर्जित ब्याज', taxPaid: 'कटा कर', netInterest: 'कर के बाद ब्याज',
      total: 'आपको मिलेगा', effective: 'प्रभावी शुद्ध दर',
    },
  },
  'zh-hans': {
    title: '存款利息计算器',
    desc: '一笔钱按单利或复利能变成多少，税前和税后',
    short: '整笔存入 · 单利或复利',
    intro: [
      {
        h: '单利还是复利，除了第一年，别的全都不同',
        p: '单利只有本金在生息；复利里生出的利息也跟着生息。存十二个月，两者几乎看不出差别。放十年，差距大到应该是你翻开条款时第一个要确认的地方。',
      },
      {
        h: '要比就比到手金额，不是海报上的利率',
        p: '利息通常在发放时就代扣了税，所以广告上的利率不是你拿到的利率。填上自己的税率之后，下面那个税后数字才是真正能拿来比较两款产品的数。',
      },
      {
        h: '提前支取会推翻整个算式',
        p: '定期存款一旦提前支取，利率几乎总是大幅下调，有时接近于零。这里假设你持有到期，所以中途可能要用的钱，不会像这个结果一样增长。',
      },
    ],
    faq: [
      { q: '如果两种利率一样，该选哪个？', a: '永远选复利，它只会给得更多。单利之所以还存在，是因为这类产品通常会把利率标得高一点来弥补——所以要比的是最终金额，不是利率。' },
      { q: '税率该填多少？', a: '填你所在国家对利息所得代扣的比例。各国差别很大，还常常取决于账户类型，所以这一栏默认是 0，而不是替你猜一个。' },
      { q: '复利选项是按月复利吗？', a: '这里按年复利。同样的名义利率，按月复利会略高一些；想看逐月变化，请用复利计算器。' },
    ],
    ui: {
      tabSimple: '单利', tabCompound: '复利',
      amount: '存入金额', rate: '年利率 (%)', months: '期限（月）',
      tax: '利息税率 (%)', calc: '计算',
      note: '税率各国不同，所以默认是 0。填上你的税率即可看到到手金额。',
      interest: '所得利息', taxPaid: '代扣税款', netInterest: '税后利息',
      total: '实际到手', effective: '税后实际利率',
    },
  },
  'zh-hant': {
    title: '存款利息計算機',
    desc: '一筆錢按單利或複利能變成多少，稅前和稅後',
    short: '整筆存入 · 單利或複利',
    intro: [
      {
        h: '單利還是複利，除了第一年，別的全都不同',
        p: '單利只有本金在生息；複利裡生出的利息也跟著生息。存十二個月，兩者幾乎看不出差別。放十年，差距大到應該是你翻開條款時第一個要確認的地方。',
      },
      {
        h: '要比就比到手金額，不是海報上的利率',
        p: '利息通常在發放時就代扣了稅，所以廣告上的利率不是你拿到的利率。填上自己的稅率之後，下面那個稅後數字才是真正能拿來比較兩款商品的數。',
      },
      {
        h: '提前解約會推翻整個算式',
        p: '定存一旦提前解約，利率幾乎總是大幅下調，有時接近於零。這裡假設你持有到期，所以中途可能要用的錢，不會像這個結果一樣成長。',
      },
    ],
    faq: [
      { q: '如果兩種利率一樣，該選哪個？', a: '永遠選複利，它只會給得更多。單利之所以還存在，是因為這類商品通常會把利率標得高一點來彌補——所以要比的是最終金額，不是利率。' },
      { q: '稅率該填多少？', a: '填你所在國家對利息所得代扣的比例。各國差別很大，還常常取決於帳戶類型，所以這一欄預設是 0，而不是替你猜一個。' },
      { q: '複利選項是按月複利嗎？', a: '這裡按年複利。同樣的名目利率，按月複利會略高一些；想看逐月變化，請用複利計算機。' },
    ],
    ui: {
      tabSimple: '單利', tabCompound: '複利',
      amount: '存入金額', rate: '年利率 (%)', months: '期限（月）',
      tax: '利息稅率 (%)', calc: '計算',
      note: '稅率各國不同，所以預設是 0。填上你的稅率即可看到到手金額。',
      interest: '所得利息', taxPaid: '代扣稅款', netInterest: '稅後利息',
      total: '實際到手', effective: '稅後實際利率',
    },
  },
};
