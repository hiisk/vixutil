import type { CalcTable } from './types.ts';

/**
 * 단리 계산기.
 *
 * 한국어판은 이자소득세 15.4%를 안에 박아 두고 "세후"를 보여준다. 그 숫자는
 * 한국 세법이므로 여기서는 세율을 입력으로 뺐고 기본값은 0이다 — 아무 값이나
 * 미리 넣으면 그게 그 나라 세율이라는 뜻이 되어 어디서든 틀린다.
 */
export const SIMPLE_INTEREST: CalcTable = {
  en: {
    title: 'Simple interest calculator',
    desc: 'Interest, tax and maturity value when interest is paid on the principal only',
    short: 'Principal-only interest, year by year',
    intro: [
      {
        h: 'Interest never earns interest',
        p: 'Simple interest is principal × rate × time. What you earn in year one sits aside instead of joining the balance, so year two pays exactly the same amount. That flat line is the whole difference between this and compound interest.',
      },
      {
        h: 'The gap widens with time, not with rate',
        p: 'Over a year or two, simple and compound interest land within a rounding error of each other. Stretch the same money over twenty years and the compound version pulls far ahead. For short deposits the rate and the tax matter more than the compounding method.',
      },
      {
        h: 'Tax is left to you',
        p: 'Interest is usually taxed, but at a rate that depends on your country, your account type and often the year. The tax field starts at zero — put your own rate in and the table will show what actually lands in your hands.',
      },
    ],
    faq: [
      { q: 'When is interest simple rather than compound?', a: 'Most fixed-term deposits that pay out at maturity, many bonds, and short consumer loans. If the terms do not say the interest is capitalised monthly or yearly, it is usually simple.' },
      { q: 'Does the term have to be whole years?', a: 'No. Interest accrues per month here, so a 30-month term is handled as two full years plus six months, and the last row is the short one.' },
      { q: 'Why is my payout lower than the total interest shown?', a: 'Withholding tax, and sometimes an early-withdrawal penalty. Enter your tax rate above to see the net figure; the penalty only applies if you break the term.' },
    ],
    ui: {
      section: 'Deposit terms', principal: 'Principal', rate: 'Annual rate (%)',
      months: 'Term (months)', tax: 'Tax on interest (%)', calc: 'Calculate',
      note: 'Tax starts at 0 because the rate differs by country. Enter yours to see the net amount.',
      maturity: 'Value at maturity', totalInterest: 'Total interest', taxPaid: 'Tax',
      netInterest: 'Interest after tax', netMaturity: 'Net at maturity',
      split: 'Principal vs interest', principalLabel: 'Principal', interestLabel: 'Interest',
      schedule: 'Year by year', period: 'Period', interest: 'Interest', afterTax: 'After tax',
      cumulative: 'Cumulative', balance: 'Balance', year: 'yr', month: 'mo',
    },
  },
  es: {
    title: 'Calculadora de interés simple',
    desc: 'Intereses, impuestos y capital final cuando el interés solo se aplica al principal',
    short: 'Interés sobre el capital, año a año',
    intro: [
      {
        h: 'Los intereses no generan intereses',
        p: 'El interés simple es capital × tipo × tiempo. Lo que se gana el primer año se aparta en vez de sumarse al saldo, así que el segundo año paga exactamente lo mismo. Esa línea plana es toda la diferencia con el interés compuesto.',
      },
      {
        h: 'La brecha la abre el tiempo, no el tipo',
        p: 'En uno o dos años, el interés simple y el compuesto quedan casi igualados. Estira el mismo dinero veinte años y el compuesto se dispara. En depósitos cortos importan más el tipo y los impuestos que la forma de capitalizar.',
      },
      {
        h: 'Los impuestos los pones tú',
        p: 'Los intereses suelen tributar, pero a un tipo que depende del país, del tipo de cuenta y muchas veces del año. El campo de impuestos empieza en cero: pon el tuyo y la tabla mostrará lo que de verdad llega a tu bolsillo.',
      },
    ],
    faq: [
      { q: '¿Cuándo es simple y no compuesto?', a: 'La mayoría de depósitos a plazo que pagan al vencimiento, muchos bonos y los préstamos de consumo cortos. Si las condiciones no dicen que el interés se capitaliza cada mes o cada año, suele ser simple.' },
      { q: '¿El plazo tiene que ser en años enteros?', a: 'No. Aquí el interés se acumula por meses, así que un plazo de 30 meses son dos años completos más seis meses, y la última fila es la corta.' },
      { q: '¿Por qué cobro menos que el interés total?', a: 'Por la retención fiscal y, a veces, por una penalización si cancelas antes. Introduce arriba tu tipo impositivo para ver la cifra neta; la penalización solo aparece si rompes el plazo.' },
    ],
    ui: {
      section: 'Condiciones del depósito', principal: 'Capital', rate: 'Tipo anual (%)',
      months: 'Plazo (meses)', tax: 'Impuesto sobre intereses (%)', calc: 'Calcular',
      note: 'El impuesto empieza en 0 porque el tipo cambia según el país. Pon el tuyo para ver el neto.',
      maturity: 'Importe al vencimiento', totalInterest: 'Intereses totales', taxPaid: 'Impuestos',
      netInterest: 'Intereses netos', netMaturity: 'Neto al vencimiento',
      split: 'Capital frente a intereses', principalLabel: 'Capital', interestLabel: 'Intereses',
      schedule: 'Año a año', period: 'Periodo', interest: 'Intereses', afterTax: 'Neto',
      cumulative: 'Acumulado', balance: 'Saldo', year: 'a', month: 'm',
    },
  },
  'pt-br': {
    title: 'Calculadora de juros simples',
    desc: 'Juros, imposto e valor no vencimento quando o juro incide só sobre o principal',
    short: 'Juros sobre o principal, ano a ano',
    intro: [
      {
        h: 'Juro não rende juro',
        p: 'Juros simples são principal × taxa × tempo. O que rende no primeiro ano fica de lado em vez de entrar no saldo, então o segundo ano paga exatamente a mesma coisa. Essa linha reta é toda a diferença para os juros compostos.',
      },
      {
        h: 'Quem abre a distância é o prazo, não a taxa',
        p: 'Em um ou dois anos, juros simples e compostos ficam praticamente empatados. Estique o mesmo dinheiro por vinte anos e o composto dispara. Em aplicações curtas, a taxa e o imposto pesam mais do que o regime de capitalização.',
      },
      {
        h: 'O imposto fica por sua conta',
        p: 'Juros costumam ser tributados, mas a alíquota depende do país, do tipo de conta e muitas vezes do ano. O campo de imposto começa em zero — coloque a sua alíquota e a tabela mostra o que realmente cai na mão.',
      },
    ],
    faq: [
      { q: 'Quando o juro é simples e não composto?', a: 'A maioria das aplicações de prazo fixo que pagam no vencimento, muitos títulos e empréstimos curtos ao consumidor. Se o contrato não diz que o juro é capitalizado a cada mês ou ano, geralmente é simples.' },
      { q: 'O prazo precisa ser em anos inteiros?', a: 'Não. Aqui o juro se acumula por mês, então 30 meses viram dois anos completos mais seis meses, e a última linha é a curta.' },
      { q: 'Por que recebo menos do que o juro total mostrado?', a: 'Imposto retido na fonte e, às vezes, uma penalidade por resgate antecipado. Informe sua alíquota acima para ver o valor líquido; a penalidade só entra se você quebrar o prazo.' },
    ],
    ui: {
      section: 'Condições da aplicação', principal: 'Principal', rate: 'Taxa anual (%)',
      months: 'Prazo (meses)', tax: 'Imposto sobre juros (%)', calc: 'Calcular',
      note: 'O imposto começa em 0 porque a alíquota muda de país para país. Informe a sua para ver o líquido.',
      maturity: 'Valor no vencimento', totalInterest: 'Juros totais', taxPaid: 'Imposto',
      netInterest: 'Juros líquidos', netMaturity: 'Líquido no vencimento',
      split: 'Principal x juros', principalLabel: 'Principal', interestLabel: 'Juros',
      schedule: 'Ano a ano', period: 'Período', interest: 'Juros', afterTax: 'Líquido',
      cumulative: 'Acumulado', balance: 'Saldo', year: 'a', month: 'm',
    },
  },
  ja: {
    title: '単利計算機',
    desc: '元本にだけ利息がつく場合の利息・税金・満期金額',
    short: '元本にだけつく利息を年ごとに',
    intro: [
      {
        h: '利息に利息はつきません',
        p: '単利は元本 × 利率 × 期間です。1年目に生まれた利息は残高に加わらず脇に置かれるので、2年目もまったく同じ額になります。この横ばいの線が複利との違いのすべてです。',
      },
      {
        h: '差を広げるのは利率ではなく年数',
        p: '1〜2年なら単利と複利の差は誤差の範囲です。同じお金を20年置けば複利がはっきり先へ行きます。短い預け入れでは、利息の付き方より利率と税金のほうが効きます。',
      },
      {
        h: '税率はご自身で',
        p: '利息にはたいてい税金がかかりますが、税率は国により、口座の種類により、年によっても変わります。税率の欄は0から始まります。ご自分の税率を入れると、手元に残る額が表に出ます。',
      },
    ],
    faq: [
      { q: '単利になるのはどんなときですか。', a: '満期一括で受け取る定期預金の多く、多くの債券、期間の短い消費者ローンなどです。毎月または毎年利息を元本に組み入れると書かれていなければ、たいてい単利です。' },
      { q: '期間は年単位でないと駄目ですか。', a: 'いいえ。ここでは月ごとに利息を積むので、30か月なら2年と6か月として扱い、最後の行が端数の月になります。' },
      { q: '受取額が表示された利息より少ないのはなぜですか。', a: '源泉徴収される税金、それに中途解約なら違約分が引かれるためです。上に税率を入れれば税引後の額が出ます。違約分は期間途中で解約したときだけです。' },
    ],
    ui: {
      section: '預け入れ条件', principal: '元本', rate: '年利 (%)',
      months: '期間 (か月)', tax: '利息への税率 (%)', calc: '計算する',
      note: '税率は国ごとに違うので初期値は0です。ご自分の税率を入れると税引後の額が出ます。',
      maturity: '満期金額', totalInterest: '利息合計', taxPaid: '税金',
      netInterest: '税引後の利息', netMaturity: '税引後の満期金額',
      split: '元本と利息の割合', principalLabel: '元本', interestLabel: '利息',
      schedule: '年ごとの推移', period: '期間', interest: '利息', afterTax: '税引後',
      cumulative: '累計', balance: '残高', year: '年', month: 'か月',
    },
  },
  de: {
    title: 'Zinsrechner (einfache Zinsen)',
    desc: 'Zinsen, Steuer und Endbetrag, wenn nur das Kapital verzinst wird',
    short: 'Zinsen nur aufs Kapital, Jahr für Jahr',
    intro: [
      {
        h: 'Zinsen tragen keine Zinsen',
        p: 'Einfache Zinsen sind Kapital × Zinssatz × Laufzeit. Was im ersten Jahr anfällt, wird beiseitegelegt statt dem Guthaben zugeschlagen, also bringt das zweite Jahr exakt dasselbe. Diese waagerechte Linie ist der ganze Unterschied zum Zinseszins.',
      },
      {
        h: 'Den Abstand macht die Zeit, nicht der Satz',
        p: 'Über ein bis zwei Jahre liegen einfache Zinsen und Zinseszins praktisch gleichauf. Legt man dasselbe Geld zwanzig Jahre an, zieht der Zinseszins deutlich davon. Bei kurzen Anlagen zählen Zinssatz und Steuer mehr als die Art der Verzinsung.',
      },
      {
        h: 'Die Steuer tragen Sie ein',
        p: 'Zinsen werden meist besteuert, aber der Satz hängt vom Land, von der Kontoart und oft vom Jahr ab. Das Steuerfeld beginnt bei null — tragen Sie Ihren Satz ein, dann zeigt die Tabelle, was tatsächlich übrig bleibt.',
      },
    ],
    faq: [
      { q: 'Wann sind Zinsen einfach und nicht zusammengesetzt?', a: 'Bei den meisten Festgeldern mit Auszahlung am Ende, bei vielen Anleihen und bei kurzen Konsumkrediten. Steht in den Bedingungen nichts von monatlicher oder jährlicher Kapitalisierung, sind es in der Regel einfache Zinsen.' },
      { q: 'Muss die Laufzeit in vollen Jahren angegeben werden?', a: 'Nein. Die Zinsen laufen hier monatlich auf, 30 Monate sind also zwei volle Jahre plus sechs Monate — die letzte Zeile ist die kurze.' },
      { q: 'Warum bekomme ich weniger ausgezahlt als die angezeigten Zinsen?', a: 'Wegen der einbehaltenen Steuer und mitunter einer Vorfälligkeitsregelung. Tragen Sie oben Ihren Steuersatz ein, dann sehen Sie den Nettobetrag; der Abschlag greift nur bei vorzeitiger Auflösung.' },
    ],
    ui: {
      section: 'Anlagebedingungen', principal: 'Kapital', rate: 'Zinssatz p. a. (%)',
      months: 'Laufzeit (Monate)', tax: 'Steuer auf Zinsen (%)', calc: 'Berechnen',
      note: 'Die Steuer startet bei 0, weil der Satz je Land verschieden ist. Tragen Sie Ihren ein.',
      maturity: 'Endbetrag', totalInterest: 'Zinsen gesamt', taxPaid: 'Steuer',
      netInterest: 'Zinsen nach Steuer', netMaturity: 'Endbetrag nach Steuer',
      split: 'Kapital und Zinsen', principalLabel: 'Kapital', interestLabel: 'Zinsen',
      schedule: 'Jahr für Jahr', period: 'Zeitraum', interest: 'Zinsen', afterTax: 'Nach Steuer',
      cumulative: 'Kumuliert', balance: 'Stand', year: 'J', month: 'M',
    },
  },
  fr: {
    title: 'Calculateur d’intérêts simples',
    desc: 'Intérêts, impôt et capital à l’échéance quand seuls le capital produit des intérêts',
    short: 'Intérêts sur le capital, année par année',
    intro: [
      {
        h: 'Les intérêts ne produisent pas d’intérêts',
        p: 'L’intérêt simple, c’est capital × taux × durée. Ce que rapporte la première année est mis de côté au lieu de rejoindre le solde, donc la deuxième année rapporte exactement la même chose. Cette ligne plate résume toute la différence avec les intérêts composés.',
      },
      {
        h: 'C’est la durée qui creuse l’écart, pas le taux',
        p: 'Sur un ou deux ans, intérêts simples et composés se tiennent à un arrondi près. Étalez la même somme sur vingt ans et les composés prennent nettement le large. Sur un placement court, le taux et la fiscalité pèsent plus que le mode de capitalisation.',
      },
      {
        h: 'L’impôt, c’est à vous de le saisir',
        p: 'Les intérêts sont généralement imposés, mais à un taux qui dépend du pays, du type de compte et souvent de l’année. Le champ démarre à zéro : saisissez votre taux et le tableau montrera ce qui reste réellement.',
      },
    ],
    faq: [
      { q: 'Quand les intérêts sont-ils simples plutôt que composés ?', a: 'Sur la plupart des dépôts à terme versés à l’échéance, sur beaucoup d’obligations et sur les crédits à la consommation courts. Si le contrat ne parle pas de capitalisation mensuelle ou annuelle, c’est en général du simple.' },
      { q: 'La durée doit-elle être en années entières ?', a: 'Non. Ici les intérêts courent au mois : 30 mois font deux années pleines plus six mois, et la dernière ligne est la courte.' },
      { q: 'Pourquoi je touche moins que le total des intérêts affiché ?', a: 'À cause du prélèvement fiscal et parfois d’une pénalité de sortie anticipée. Saisissez votre taux ci-dessus pour voir le net ; la pénalité ne s’applique que si vous cassez le placement.' },
    ],
    ui: {
      section: 'Conditions du placement', principal: 'Capital', rate: 'Taux annuel (%)',
      months: 'Durée (mois)', tax: 'Impôt sur les intérêts (%)', calc: 'Calculer',
      note: 'L’impôt démarre à 0 car le taux change selon le pays. Saisissez le vôtre pour voir le net.',
      maturity: 'Montant à l’échéance', totalInterest: 'Intérêts totaux', taxPaid: 'Impôt',
      netInterest: 'Intérêts nets', netMaturity: 'Net à l’échéance',
      split: 'Capital et intérêts', principalLabel: 'Capital', interestLabel: 'Intérêts',
      schedule: 'Année par année', period: 'Période', interest: 'Intérêts', afterTax: 'Net',
      cumulative: 'Cumul', balance: 'Solde', year: 'an', month: 'mois',
    },
  },
  hi: {
    title: 'साधारण ब्याज कैलकुलेटर',
    desc: 'जब ब्याज सिर्फ़ मूलधन पर लगे — ब्याज, कर और परिपक्वता राशि',
    short: 'मूलधन पर ब्याज, साल दर साल',
    intro: [
      {
        h: 'ब्याज पर ब्याज नहीं लगता',
        p: 'साधारण ब्याज यानी मूलधन × दर × समय। पहले साल का ब्याज बैलेंस में नहीं जुड़ता, अलग रखा जाता है, इसलिए दूसरे साल भी उतना ही ब्याज बनता है। यही सपाट रेखा चक्रवृद्धि ब्याज से पूरा फ़र्क़ है।',
      },
      {
        h: 'फ़ासला दर नहीं, समय बनाता है',
        p: 'एक-दो साल में साधारण और चक्रवृद्धि ब्याज लगभग बराबर रहते हैं। वही पैसा बीस साल रखिए तो चक्रवृद्धि बहुत आगे निकल जाता है। छोटी अवधि की जमा में ब्याज लगने का तरीक़ा कम, दर और कर ज़्यादा मायने रखते हैं।',
      },
      {
        h: 'कर आप ख़ुद भरें',
        p: 'ब्याज पर आमतौर पर कर लगता है, पर दर देश, खाते के प्रकार और अक्सर साल के हिसाब से बदलती है। कर का खाना शून्य से शुरू होता है — अपनी दर डालिए, तालिका बता देगी कि हाथ में कितना आता है।',
      },
    ],
    faq: [
      { q: 'ब्याज साधारण कब होता है, चक्रवृद्धि कब?', a: 'ज़्यादातर सावधि जमा जो परिपक्वता पर भुगतान करती हैं, कई बॉन्ड और छोटी अवधि के उपभोक्ता ऋण। अगर शर्तों में हर महीने या हर साल ब्याज जोड़ने की बात न हो, तो आमतौर पर साधारण ही है।' },
      { q: 'क्या अवधि पूरे साल में ही देनी होगी?', a: 'नहीं। यहाँ ब्याज महीने के हिसाब से जुड़ता है, इसलिए 30 महीने का मतलब दो पूरे साल और छह महीने — आख़िरी पंक्ति वही छोटी अवधि है।' },
      { q: 'दिखाए गए कुल ब्याज से कम क्यों मिला?', a: 'स्रोत पर कटा कर, और कभी-कभी समय से पहले तोड़ने पर लगने वाला जुर्माना। ऊपर अपनी कर दर डालिए तो शुद्ध राशि दिखेगी; जुर्माना तभी लगता है जब आप अवधि से पहले तोड़ें।' },
    ],
    ui: {
      section: 'जमा की शर्तें', principal: 'मूलधन', rate: 'वार्षिक दर (%)',
      months: 'अवधि (महीने)', tax: 'ब्याज पर कर (%)', calc: 'गणना करें',
      note: 'कर दर हर देश में अलग है, इसलिए शुरुआत 0 से है। अपनी दर डालकर शुद्ध राशि देखें।',
      maturity: 'परिपक्वता राशि', totalInterest: 'कुल ब्याज', taxPaid: 'कर',
      netInterest: 'कर के बाद ब्याज', netMaturity: 'कर के बाद राशि',
      split: 'मूलधन बनाम ब्याज', principalLabel: 'मूलधन', interestLabel: 'ब्याज',
      schedule: 'साल दर साल', period: 'अवधि', interest: 'ब्याज', afterTax: 'कर के बाद',
      cumulative: 'संचयी', balance: 'शेष', year: 'सा', month: 'मा',
    },
  },
  'zh-hans': {
    title: '单利计算器',
    desc: '只对本金计息时的利息、税款和到期金额',
    short: '只算本金的利息，逐年列出',
    intro: [
      {
        h: '利息不再生利息',
        p: '单利就是本金 × 利率 × 时间。第一年产生的利息被放在一边，不并入余额，所以第二年拿到的金额完全一样。这条平直的线，就是它和复利的全部区别。',
      },
      {
        h: '拉开差距的是年限，不是利率',
        p: '存一两年，单利和复利几乎看不出差别。同一笔钱放二十年，复利就明显跑在前面。短期存款里，利率和税负比计息方式更值得计较。',
      },
      {
        h: '税率请自己填',
        p: '利息通常要缴税，但税率因国家、账户类型而异，也常常逐年调整。税率一栏默认是 0——填上你自己的税率，表里就会显示真正到手的金额。',
      },
    ],
    faq: [
      { q: '什么情况下算单利？', a: '大多数到期一次付息的定期存款、许多债券，以及期限较短的消费贷款。如果条款里没写按月或按年把利息计入本金，一般就是单利。' },
      { q: '期限必须是整年吗？', a: '不必。这里按月累计利息，30 个月就是两整年加六个月，最后一行是那半年。' },
      { q: '为什么实际拿到的比显示的总利息少？', a: '因为代扣税款，有时还有提前支取的罚息。在上面填入你的税率就能看到税后金额；罚息只在提前支取时才有。' },
    ],
    ui: {
      section: '存款条件', principal: '本金', rate: '年利率 (%)',
      months: '期限（月）', tax: '利息税率 (%)', calc: '计算',
      note: '税率各国不同，所以默认是 0。填上你的税率即可看到税后金额。',
      maturity: '到期金额', totalInterest: '利息合计', taxPaid: '税款',
      netInterest: '税后利息', netMaturity: '税后到期金额',
      split: '本金与利息', principalLabel: '本金', interestLabel: '利息',
      schedule: '逐年明细', period: '期间', interest: '利息', afterTax: '税后',
      cumulative: '累计', balance: '余额', year: '年', month: '个月',
    },
  },
  'zh-hant': {
    title: '單利計算機',
    desc: '只對本金計息時的利息、稅款和到期金額',
    short: '只算本金的利息，逐年列出',
    intro: [
      {
        h: '利息不會再生利息',
        p: '單利就是本金 × 利率 × 時間。第一年產生的利息被放在一邊，不併入餘額，所以第二年拿到的金額完全一樣。這條平直的線，就是它和複利的全部區別。',
      },
      {
        h: '拉開差距的是年限，不是利率',
        p: '存一兩年，單利和複利幾乎看不出差別。同一筆錢放二十年，複利就明顯跑在前面。短期存款裡，利率和稅負比計息方式更值得計較。',
      },
      {
        h: '稅率請自己填',
        p: '利息通常要繳稅，但稅率因國家、帳戶類型而異，也常常逐年調整。稅率一欄預設是 0——填上你自己的稅率，表裡就會顯示真正到手的金額。',
      },
    ],
    faq: [
      { q: '什麼情況下算單利？', a: '大多數到期一次付息的定期存款、許多債券，以及期限較短的消費貸款。如果條款裡沒寫按月或按年把利息計入本金，一般就是單利。' },
      { q: '期限必須是整年嗎？', a: '不必。這裡按月累計利息，30 個月就是兩整年加六個月，最後一行是那半年。' },
      { q: '為什麼實際拿到的比顯示的總利息少？', a: '因為代扣稅款，有時還有提前解約的罰息。在上面填入你的稅率就能看到稅後金額；罰息只在提前解約時才有。' },
    ],
    ui: {
      section: '存款條件', principal: '本金', rate: '年利率 (%)',
      months: '期限（月）', tax: '利息稅率 (%)', calc: '計算',
      note: '稅率各國不同，所以預設是 0。填上你的稅率即可看到稅後金額。',
      maturity: '到期金額', totalInterest: '利息合計', taxPaid: '稅款',
      netInterest: '稅後利息', netMaturity: '稅後到期金額',
      split: '本金與利息', principalLabel: '本金', interestLabel: '利息',
      schedule: '逐年明細', period: '期間', interest: '利息', afterTax: '稅後',
      cumulative: '累計', balance: '餘額', year: '年', month: '個月',
    },
  },
};
