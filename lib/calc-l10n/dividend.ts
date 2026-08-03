import type { CalcTable } from './types.ts';

/**
 * 배당금 — 수익률에서 배당금을, 목표 배당금에서 필요 투자금을 거꾸로.
 *
 * 한국어판은 배당소득세 15.4%를 체크박스로 박아 두었다. 배당 과세는 나라마다
 * 방식 자체가 다르므로(원천징수·종합과세·비과세 계좌) 세율을 입력으로 뺐다.
 */
export const DIVIDEND: CalcTable = {
  en: {
    title: 'Dividend calculator',
    desc: 'Income from a yield, and the capital a target income would need',
    short: 'Dividend income · capital required',
    intro: [
      {
        h: 'Yield moves with the price, not just the payout',
        p: 'Dividend yield is the payment divided by the price, so a falling share price pushes the yield up on its own. An unusually high yield often means the market has marked the company down, not that it is unusually generous — and companies in that position are the likeliest to cut.',
      },
      {
        h: 'Dividends are decided, not promised',
        p: 'Unlike interest on a deposit, a dividend is a decision the board makes each period. It can be reduced or skipped when results turn. This assumes the yield you enter simply continues, so treat the output as an illustration rather than a cash flow you can count on.',
      },
      {
        h: 'Tax is left to you',
        p: 'Dividend taxation varies enormously — withheld at source in some countries, assessed with other income in others, and often nil inside a tax-sheltered account. The rate field starts at zero. Put in what applies to you and the net figures update.',
      },
    ],
    faq: [
      { q: 'Why does the required capital jump when I lower the yield?', a: 'Because the yield is the divisor. Halving the yield doubles the capital needed for the same income — which is why reaching for a higher yield is so tempting, and why the risk that comes with it deserves attention.' },
      { q: 'Does the payment frequency change the annual total?', a: 'Not in this calculation. Quarterly or monthly only changes how the same annual amount is split up. In practice, more frequent payments help if you reinvest, because the money starts working sooner.' },
      { q: 'Is dividend growth included?', a: 'No. The yield you enter is held constant. Companies that raise dividends year after year end up well ahead of this, and companies that cut end up well behind.' },
    ],
    ui: {
      section: 'Your holding', invest: 'Amount invested', yield: 'Dividend yield (%)',
      freq: 'Paid', tax: 'Tax on dividends (%)', target: 'Target monthly income (optional)',
      calc: 'Calculate',
      note: 'Tax starts at 0 because dividend taxation differs by country and account. Enter yours.',
      monthly: 'Monthly', quarterly: 'Quarterly', semi: 'Twice a year', annual: 'Once a year',
      annualIncome: 'Income per year', perPayment: 'Per payment',
      afterTax: 'after tax', needed: 'Capital needed for that income',
    },
  },
  es: {
    title: 'Calculadora de dividendos',
    desc: 'Ingresos a partir de una rentabilidad por dividendo, y el capital que exigiría una renta objetivo',
    short: 'Renta por dividendos · capital necesario',
    intro: [
      {
        h: 'La rentabilidad se mueve con el precio, no solo con el pago',
        p: 'La rentabilidad por dividendo es el pago dividido entre el precio, así que una cotización que cae la empuja hacia arriba por sí sola. Una rentabilidad llamativamente alta suele significar que el mercado ha castigado a la empresa, no que sea inusualmente generosa; y esas empresas son las más propensas a recortar.',
      },
      {
        h: 'El dividendo se decide, no se promete',
        p: 'A diferencia del interés de un depósito, el dividendo es una decisión que el consejo toma cada periodo. Puede reducirse o suspenderse si los resultados empeoran. Aquí se asume que la rentabilidad que escribes se mantiene, así que toma el resultado como ilustración, no como un flujo de caja seguro.',
      },
      {
        h: 'Los impuestos los pones tú',
        p: 'La fiscalidad del dividendo varía enormemente: retención en origen en unos países, integración con el resto de rentas en otros, y a menudo nada dentro de una cuenta con ventaja fiscal. El campo empieza en cero; pon el tuyo y las cifras netas se ajustan.',
      },
    ],
    faq: [
      { q: '¿Por qué se dispara el capital necesario al bajar la rentabilidad?', a: 'Porque la rentabilidad está en el divisor. Reducirla a la mitad duplica el capital necesario para la misma renta, y por eso resulta tan tentador buscar rentabilidades altas, y por eso mismo conviene mirar el riesgo que las acompaña.' },
      { q: '¿La frecuencia de pago cambia el total anual?', a: 'En este cálculo no. Trimestral o mensual solo cambia cómo se reparte el mismo importe anual. En la práctica, pagar más a menudo ayuda si reinviertes, porque el dinero empieza a trabajar antes.' },
      { q: '¿Se contempla el crecimiento del dividendo?', a: 'No. La rentabilidad que introduces se mantiene constante. Las empresas que suben el dividendo año tras año terminan muy por encima de esto, y las que recortan, muy por debajo.' },
    ],
    ui: {
      section: 'Tu posición', invest: 'Importe invertido', yield: 'Rentabilidad por dividendo (%)',
      freq: 'Pago', tax: 'Impuesto sobre dividendos (%)', target: 'Renta mensual objetivo (opcional)',
      calc: 'Calcular',
      note: 'El impuesto empieza en 0 porque la fiscalidad del dividendo varía por país y cuenta. Pon el tuyo.',
      monthly: 'Mensual', quarterly: 'Trimestral', semi: 'Semestral', annual: 'Anual',
      annualIncome: 'Renta al año', perPayment: 'Por pago',
      afterTax: 'neto', needed: 'Capital necesario para esa renta',
    },
  },
  'pt-br': {
    title: 'Calculadora de dividendos',
    desc: 'Renda a partir de um dividend yield, e o capital que uma renda-alvo exigiria',
    short: 'Renda de dividendos · capital necessário',
    intro: [
      {
        h: 'O yield se move com o preço, não só com o pagamento',
        p: 'Dividend yield é o pagamento dividido pelo preço, então uma cotação em queda empurra o yield para cima sozinha. Um yield chamativamente alto costuma significar que o mercado castigou a empresa, não que ela seja generosa — e empresas nessa situação são as mais propensas a cortar.',
      },
      {
        h: 'Dividendo é decidido, não prometido',
        p: 'Diferente do juro de uma aplicação, o dividendo é uma decisão que a companhia toma a cada período. Pode ser reduzido ou suspenso quando o resultado piora. Aqui se assume que o yield digitado simplesmente continua, então trate o número como ilustração, não como um fluxo garantido.',
      },
      {
        h: 'O imposto fica por sua conta',
        p: 'A tributação de dividendos varia muito — retida na fonte em alguns países, somada às demais rendas em outros, e muitas vezes zero dentro de uma conta com benefício fiscal. O campo começa em zero; informe o seu e os valores líquidos se ajustam.',
      },
    ],
    faq: [
      { q: 'Por que o capital necessário dispara quando baixo o yield?', a: 'Porque o yield está no divisor. Cortá-lo pela metade dobra o capital preciso para a mesma renda — é por isso que buscar yields altos é tão tentador, e por isso mesmo o risco que vem junto merece atenção.' },
      { q: 'A frequência de pagamento muda o total anual?', a: 'Nesta conta, não. Trimestral ou mensal só muda como o mesmo valor anual é repartido. Na prática, pagamentos mais frequentes ajudam quem reinveste, porque o dinheiro começa a trabalhar antes.' },
      { q: 'O crescimento do dividendo entra na conta?', a: 'Não. O yield informado é mantido constante. Empresas que elevam o dividendo ano após ano terminam bem acima disto, e as que cortam, bem abaixo.' },
    ],
    ui: {
      section: 'Sua posição', invest: 'Valor investido', yield: 'Dividend yield (%)',
      freq: 'Pagamento', tax: 'Imposto sobre dividendos (%)', target: 'Renda mensal desejada (opcional)',
      calc: 'Calcular',
      note: 'O imposto começa em 0 porque a tributação varia por país e por conta. Informe a sua.',
      monthly: 'Mensal', quarterly: 'Trimestral', semi: 'Semestral', annual: 'Anual',
      annualIncome: 'Renda por ano', perPayment: 'Por pagamento',
      afterTax: 'líquido', needed: 'Capital necessário para essa renda',
    },
  },
  ja: {
    title: '配当金の計算機',
    desc: '配当利回りから受取額を、目標の受取額から必要な投資額を求めます',
    short: '配当収入と必要投資額',
    intro: [
      {
        h: '利回りは配当だけでなく株価でも動きます',
        p: '配当利回りは配当額 ÷ 株価なので、株価が下がるだけで利回りは上がります。目を引くほど高い利回りは、気前がよいのではなく市場がその会社を売り込んだ結果であることが多く、そういう会社ほど減配の可能性も高くなります。',
      },
      {
        h: '配当は約束ではなく決定です',
        p: '預金の利息と違い、配当は会社が期ごとに決めるものです。業績が傾けば減らされたり見送られたりします。ここでは入力した利回りがそのまま続く前提なので、確定した現金の流れではなく目安として見てください。',
      },
      {
        h: '税率はご自身で',
        p: '配当への課税は国によって仕組みごと違います。源泉徴収の国、他の所得と合算する国、非課税口座なら0という場合もあります。税率の欄は0から始まるので、当てはまる率を入れると税引後の数字が変わります。',
      },
    ],
    faq: [
      { q: '利回りを下げると必要投資額が急に増えるのはなぜですか。', a: '利回りが割る側にあるからです。利回りが半分になれば、同じ受取額に必要な元手は倍になります。高い利回りに手が伸びやすいのも、そこに付いてくる危険を見ておくべき理由も、同じところにあります。' },
      { q: '支払回数で年間の合計は変わりますか。', a: 'この計算では変わりません。四半期か毎月かは、同じ年額の分け方が変わるだけです。ただし再投資するなら、早く受け取るぶんだけ有利にはなります。' },
      { q: '増配は考慮されていますか。', a: 'いいえ。入力した利回りは一定のままです。毎年増配する会社はこの結果を大きく上回り、減配する会社は大きく下回ります。' },
    ],
    ui: {
      section: '保有の条件', invest: '投資額', yield: '配当利回り (%)',
      freq: '支払回数', tax: '配当への税率 (%)', target: '目標の月間受取額 (任意)',
      calc: '計算する',
      note: '配当課税は国と口座で仕組みが違うので初期値は0です。当てはまる率を入れてください。',
      monthly: '毎月', quarterly: '四半期', semi: '年2回', annual: '年1回',
      annualIncome: '年間の受取額', perPayment: '1回あたり',
      afterTax: '税引後', needed: 'その受取額に必要な投資額',
    },
  },
  de: {
    title: 'Dividendenrechner',
    desc: 'Ertrag aus einer Dividendenrendite und das Kapital, das ein Zielertrag bräuchte',
    short: 'Dividendenertrag · nötiges Kapital',
    intro: [
      {
        h: 'Die Rendite bewegt sich mit dem Kurs, nicht nur mit der Ausschüttung',
        p: 'Dividendenrendite ist Ausschüttung geteilt durch Kurs — ein fallender Kurs treibt sie also von allein nach oben. Eine auffällig hohe Rendite bedeutet meist, dass der Markt das Unternehmen abgestraft hat, nicht dass es besonders großzügig wäre. Und genau solche Unternehmen kürzen am ehesten.',
      },
      {
        h: 'Dividenden werden beschlossen, nicht versprochen',
        p: 'Anders als Zinsen auf einer Einlage ist die Dividende eine Entscheidung, die das Unternehmen jede Periode neu trifft. Bei schlechteren Zahlen wird gekürzt oder ausgesetzt. Hier wird unterstellt, dass die eingegebene Rendite einfach weiterläuft — nehmen Sie das Ergebnis als Illustration, nicht als sicheren Zahlungsstrom.',
      },
      {
        h: 'Die Steuer tragen Sie ein',
        p: 'Die Besteuerung von Dividenden unterscheidet sich stark: in manchen Ländern an der Quelle einbehalten, in anderen mit übrigen Einkünften veranlagt, in steuerbegünstigten Depots oft gar nicht. Das Feld beginnt bei null — tragen Sie Ihren Satz ein, dann passen sich die Nettowerte an.',
      },
    ],
    faq: [
      { q: 'Warum springt das nötige Kapital, wenn ich die Rendite senke?', a: 'Weil die Rendite im Nenner steht. Halbiert sie sich, verdoppelt sich das Kapital für denselben Ertrag. Deshalb ist der Griff zur hohen Rendite so verlockend — und deshalb verdient das Risiko dahinter einen Blick.' },
      { q: 'Ändert die Zahlweise die Jahressumme?', a: 'In dieser Rechnung nicht. Quartalsweise oder monatlich verteilt nur denselben Jahresbetrag anders. In der Praxis hilft häufigeres Zahlen beim Wiederanlegen, weil das Geld früher arbeitet.' },
      { q: 'Ist Dividendenwachstum berücksichtigt?', a: 'Nein. Die eingegebene Rendite bleibt konstant. Unternehmen, die Jahr für Jahr erhöhen, landen deutlich darüber; solche, die kürzen, deutlich darunter.' },
    ],
    ui: {
      section: 'Ihre Position', invest: 'Angelegter Betrag', yield: 'Dividendenrendite (%)',
      freq: 'Zahlweise', tax: 'Steuer auf Dividenden (%)', target: 'Gewünschter Monatsertrag (optional)',
      calc: 'Berechnen',
      note: 'Die Steuer startet bei 0, weil Land und Depotart darüber entscheiden. Tragen Sie Ihre ein.',
      monthly: 'Monatlich', quarterly: 'Quartalsweise', semi: 'Halbjährlich', annual: 'Jährlich',
      annualIncome: 'Ertrag pro Jahr', perPayment: 'Je Zahlung',
      afterTax: 'nach Steuer', needed: 'Kapital für diesen Ertrag',
    },
  },
  fr: {
    title: 'Calculateur de dividendes',
    desc: 'Le revenu tiré d’un rendement, et le capital qu’exigerait un revenu cible',
    short: 'Revenu de dividendes · capital nécessaire',
    intro: [
      {
        h: 'Le rendement bouge avec le cours, pas seulement avec le versement',
        p: 'Le rendement du dividende, c’est le versement divisé par le cours : un cours qui baisse le fait monter tout seul. Un rendement anormalement élevé signale le plus souvent que le marché a sanctionné l’entreprise, pas qu’elle est généreuse — et ce sont ces entreprises-là qui coupent le plus volontiers.',
      },
      {
        h: 'Un dividende se décide, il ne se promet pas',
        p: 'Contrairement aux intérêts d’un dépôt, le dividende est une décision prise à chaque exercice. Il peut être réduit ou suspendu si les résultats se dégradent. On suppose ici que le rendement saisi se poursuit tel quel : voyez le résultat comme une illustration, pas comme un flux garanti.',
      },
      {
        h: 'La fiscalité, c’est à vous de la saisir',
        p: 'L’imposition des dividendes varie énormément : prélevée à la source ici, ajoutée aux autres revenus là, et souvent nulle dans une enveloppe fiscalement avantagée. Le champ démarre à zéro ; saisissez le vôtre et les montants nets se mettent à jour.',
      },
    ],
    faq: [
      { q: 'Pourquoi le capital nécessaire explose-t-il quand je baisse le rendement ?', a: 'Parce que le rendement est au dénominateur. Divisez-le par deux et le capital requis pour le même revenu double. C’est ce qui rend les hauts rendements si tentants — et c’est aussi pourquoi le risque qui les accompagne mérite un examen.' },
      { q: 'La fréquence de versement change-t-elle le total annuel ?', a: 'Pas dans ce calcul. Trimestriel ou mensuel ne change que la façon de découper le même montant annuel. En pratique, des versements plus fréquents aident si vous réinvestissez, car l’argent travaille plus tôt.' },
      { q: 'La croissance du dividende est-elle prise en compte ?', a: 'Non. Le rendement saisi reste constant. Les sociétés qui augmentent leur dividende année après année finissent bien au-dessus, celles qui le coupent bien en dessous.' },
    ],
    ui: {
      section: 'Votre position', invest: 'Montant investi', yield: 'Rendement du dividende (%)',
      freq: 'Versement', tax: 'Impôt sur les dividendes (%)', target: 'Revenu mensuel visé (facultatif)',
      calc: 'Calculer',
      note: 'L’impôt démarre à 0 car la fiscalité dépend du pays et de l’enveloppe. Saisissez le vôtre.',
      monthly: 'Mensuel', quarterly: 'Trimestriel', semi: 'Semestriel', annual: 'Annuel',
      annualIncome: 'Revenu par an', perPayment: 'Par versement',
      afterTax: 'net', needed: 'Capital nécessaire pour ce revenu',
    },
  },
  hi: {
    title: 'लाभांश कैलकुलेटर',
    desc: 'डिविडेंड यील्ड से होने वाली आय, और लक्ष्य आय के लिए ज़रूरी पूँजी',
    short: 'लाभांश आय · ज़रूरी पूँजी',
    intro: [
      {
        h: 'यील्ड सिर्फ़ भुगतान से नहीं, भाव से भी हिलती है',
        p: 'डिविडेंड यील्ड यानी भुगतान ÷ भाव, इसलिए भाव गिरते ही यील्ड अपने आप ऊपर चली जाती है। असामान्य रूप से ऊँची यील्ड का मतलब अक्सर यह होता है कि बाज़ार ने उस कंपनी को नीचे कर दिया है, न कि वह ख़ास उदार है — और ऐसी ही कंपनियाँ लाभांश काटने की सबसे बड़ी उम्मीदवार होती हैं।',
      },
      {
        h: 'लाभांश तय किया जाता है, वादा नहीं होता',
        p: 'जमा के ब्याज से उलट, लाभांश हर अवधि में कंपनी का लिया हुआ फ़ैसला है। नतीजे बिगड़ें तो घटाया या छोड़ा जा सकता है। यहाँ मान लिया गया है कि आपकी डाली यील्ड बस चलती रहेगी, इसलिए इसे पक्की नक़दी नहीं, एक उदाहरण मानिए।',
      },
      {
        h: 'कर आप ख़ुद भरें',
        p: 'लाभांश पर कर की व्यवस्था देश-दर-देश बहुत अलग है — कहीं स्रोत पर कटौती, कहीं बाक़ी आय में जोड़कर, और कर-रियायती खाते में अक्सर शून्य। यह खाना शून्य से शुरू होता है; अपनी दर डालिए और शुद्ध आंकड़े बदल जाएँगे।',
      },
    ],
    faq: [
      { q: 'यील्ड घटाते ही ज़रूरी पूँजी इतनी क्यों बढ़ जाती है?', a: 'क्योंकि यील्ड हर में है। यील्ड आधी हो तो उसी आय के लिए पूँजी दोगुनी चाहिए। ऊँची यील्ड इतनी लुभावनी इसीलिए लगती है, और उसके साथ आने वाले जोखिम पर नज़र इसीलिए ज़रूरी है।' },
      { q: 'भुगतान की आवृत्ति से सालाना कुल बदलता है?', a: 'इस गणना में नहीं। तिमाही हो या मासिक, वही सालाना रकम अलग तरह से बँटती है। हाँ, पुनर्निवेश करने वालों को जल्दी मिलना फ़ायदा देता है, क्योंकि पैसा जल्दी काम पर लग जाता है।' },
      { q: 'क्या लाभांश की बढ़ोतरी शामिल है?', a: 'नहीं। डाली गई यील्ड स्थिर रखी जाती है। हर साल लाभांश बढ़ाने वाली कंपनियाँ इससे कहीं आगे निकलती हैं, और काटने वाली कहीं पीछे।' },
    ],
    ui: {
      section: 'आपकी होल्डिंग', invest: 'निवेश की रकम', yield: 'डिविडेंड यील्ड (%)',
      freq: 'भुगतान', tax: 'लाभांश पर कर (%)', target: 'लक्ष्य मासिक आय (वैकल्पिक)',
      calc: 'गणना करें',
      note: 'कर देश और खाते के हिसाब से बदलता है, इसलिए शुरुआत 0 से है। अपनी दर डालें।',
      monthly: 'मासिक', quarterly: 'तिमाही', semi: 'छमाही', annual: 'सालाना',
      annualIncome: 'सालाना आय', perPayment: 'प्रति भुगतान',
      afterTax: 'कर के बाद', needed: 'उस आय के लिए ज़रूरी पूँजी',
    },
  },
  'zh-hans': {
    title: '股息计算器',
    desc: '按股息率算出的收入，以及达成目标收入所需的本金',
    short: '股息收入 · 所需本金',
    intro: [
      {
        h: '股息率跟着股价动，不只是跟着分红动',
        p: '股息率是每股分红除以股价，所以股价一跌，股息率自己就上去了。高得扎眼的股息率，多半说明市场把这家公司打下去了，而不是它格外慷慨——而这样的公司恰恰最容易减派或停派。',
      },
      {
        h: '股息是决定出来的，不是承诺',
        p: '和存款利息不同，股息是公司每期重新做的决定。业绩转差时可以减、可以不发。这里假设你填的股息率就这么一直下去，所以请把结果看作示意，而不是可以指望的现金流。',
      },
      {
        h: '税率请自己填',
        p: '股息的税制各国差别极大——有的在发放时代扣，有的并入其他所得计税，在有税收优惠的账户里往往是零。税率一栏默认是 0，填上适用的比例，税后数字就会跟着变。',
      },
    ],
    faq: [
      { q: '把股息率调低一点，所需本金为什么涨这么多？', a: '因为股息率在分母上。股息率减半，同样的收入需要的本金就翻倍。高股息之所以那么诱人，以及它背后的风险之所以值得多看两眼，原因是同一个。' },
      { q: '派息频率会改变全年总额吗？', a: '在这个算法里不会。按季还是按月，只是把同样的年度金额分得不一样。实际操作中，如果你会再投入，收得早确实更有利。' },
      { q: '有没有考虑股息增长？', a: '没有。你填的股息率被当作恒定值。年年提高派息的公司会远高于这个结果，减派的公司会远低于它。' },
    ],
    ui: {
      section: '你的持仓', invest: '投入金额', yield: '股息率 (%)',
      freq: '派息频率', tax: '股息税率 (%)', target: '目标月收入（可选）',
      calc: '计算',
      note: '股息税制因国家和账户而异，所以默认是 0。填上适用的比例。',
      monthly: '每月', quarterly: '每季', semi: '每半年', annual: '每年',
      annualIncome: '年收入', perPayment: '每次派发',
      afterTax: '税后', needed: '达成该收入所需本金',
    },
  },
  'zh-hant': {
    title: '股息計算機',
    desc: '按殖利率算出的收入，以及達成目標收入所需的本金',
    short: '股息收入 · 所需本金',
    intro: [
      {
        h: '殖利率跟著股價動，不只是跟著配息動',
        p: '殖利率是每股配息除以股價，所以股價一跌，殖利率自己就上去了。高得扎眼的殖利率，多半說明市場把這家公司打下去了，而不是它格外慷慨——而這樣的公司恰恰最容易減配或停配。',
      },
      {
        h: '股息是決定出來的，不是承諾',
        p: '和存款利息不同，股息是公司每期重新做的決定。業績轉差時可以減、可以不發。這裡假設你填的殖利率就這麼一直下去，所以請把結果看作示意，而不是可以指望的現金流。',
      },
      {
        h: '稅率請自己填',
        p: '股息的稅制各國差別極大——有的在發放時代扣，有的併入其他所得課稅，在有稅務優惠的帳戶裡往往是零。稅率一欄預設是 0，填上適用的比例，稅後數字就會跟著變。',
      },
    ],
    faq: [
      { q: '把殖利率調低一點，所需本金為什麼漲這麼多？', a: '因為殖利率在分母上。殖利率減半，同樣的收入需要的本金就翻倍。高殖利率之所以那麼誘人，以及它背後的風險之所以值得多看兩眼，原因是同一個。' },
      { q: '配息頻率會改變全年總額嗎？', a: '在這個算法裡不會。按季還是按月，只是把同樣的年度金額分得不一樣。實際操作中，如果你會再投入，收得早確實更有利。' },
      { q: '有沒有考慮股息成長？', a: '沒有。你填的殖利率被當作恆定值。年年提高配息的公司會遠高於這個結果，減配的公司會遠低於它。' },
    ],
    ui: {
      section: '你的持股', invest: '投入金額', yield: '殖利率 (%)',
      freq: '配息頻率', tax: '股息稅率 (%)', target: '目標月收入（選填）',
      calc: '計算',
      note: '股息稅制因國家和帳戶而異，所以預設是 0。填上適用的比例。',
      monthly: '每月', quarterly: '每季', semi: '每半年', annual: '每年',
      annualIncome: '年收入', perPayment: '每次配發',
      afterTax: '稅後', needed: '達成該收入所需本金',
    },
  },
};
