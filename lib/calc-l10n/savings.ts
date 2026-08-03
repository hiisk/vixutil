import type { CalcTable } from './types.ts';

/**
 * 적금 — 매달 같은 금액을 넣는 상품.
 *
 * 회차마다 돈이 머문 기간이 다르다는 게 핵심이고, 그건 나라를 타지 않는다.
 * 이자소득세 15.4%만 입력으로 뺐다.
 */
export const SAVINGS: CalcTable = {
  en: {
    title: 'Recurring deposit calculator',
    desc: 'What a fixed monthly payment adds up to, with interest and tax',
    short: 'Same amount every month',
    intro: [
      {
        h: 'Why 4% pays about half of what you expect',
        p: 'The first payment sits in the account for the whole term and earns a full year of interest. The last one arrives a month before maturity and earns one month. Averaged out, your money is only there for about half the term — which is why a recurring deposit at the same rate pays roughly half what a lump sum would.',
      },
      {
        h: 'How it is worked out',
        p: 'Each instalment earns interest for the number of months still left, and the results are added together. That is the simple-interest convention nearly every bank uses for this kind of product. Nothing here is capitalised, so the interest never earns interest of its own.',
      },
      {
        h: 'Compare against a lump sum properly',
        p: 'Putting the same total into a fixed deposit on day one earns much more, but of course it requires having the money on day one. The honest comparison is between what you can actually commit each month and the lump sum you actually have.',
      },
    ],
    faq: [
      { q: 'Is the advertised rate misleading, then?', a: 'No, the rate is applied correctly — to each instalment for the time it is held. What misleads is the instinct to multiply the total paid in by the rate, which assumes all the money was there from the start.' },
      { q: 'What if I miss a month?', a: 'Most banks either reduce the rate or push the maturity date back. The calculation here assumes every instalment arrives on time, so a missed month makes the real payout lower than this.' },
      { q: 'Does it compound?', a: 'No. This follows the usual simple-interest convention for recurring deposits. Products that compound monthly do exist and pay slightly more; check the terms for the word.' },
    ],
    ui: {
      section: 'Plan', monthly: 'Monthly payment', rate: 'Annual rate (%)', months: 'Term (months)',
      tax: 'Tax on interest (%)', calc: 'Calculate',
      note: 'Tax starts at 0 because the rate differs by country. Enter yours to see the net amount.',
      paidIn: 'Total paid in', interest: 'Interest', taxPaid: 'Tax', total: 'Value at maturity',
      effective: 'Return on what you paid in',
    },
  },
  es: {
    title: 'Calculadora de ahorro periódico',
    desc: 'A cuánto llega una aportación mensual fija, con intereses e impuestos',
    short: 'La misma cantidad cada mes',
    intro: [
      {
        h: 'Por qué un 4% rinde la mitad de lo que esperas',
        p: 'La primera aportación se queda en la cuenta todo el plazo y gana un año entero de intereses. La última llega un mes antes del vencimiento y gana un mes. De media, tu dinero está allí solo la mitad del plazo, y por eso un ahorro periódico al mismo tipo rinde en torno a la mitad que un depósito.',
      },
      {
        h: 'Cómo se calcula',
        p: 'Cada aportación genera intereses por los meses que le quedan, y se suman todos los resultados. Es la convención de interés simple que usan casi todos los bancos para este producto. Nada se capitaliza, así que los intereses nunca generan intereses propios.',
      },
      {
        h: 'Comparar con un depósito, bien hecho',
        p: 'Meter el mismo total en un depósito el primer día rinde mucho más, pero exige tener el dinero el primer día. La comparación honesta es entre lo que de verdad puedes aportar cada mes y el importe que de verdad tienes ahora.',
      },
    ],
    faq: [
      { q: '¿Entonces el tipo anunciado engaña?', a: 'No, el tipo se aplica correctamente: a cada aportación durante el tiempo que permanece. Lo que engaña es el impulso de multiplicar el total aportado por el tipo, que da por hecho que todo el dinero estuvo desde el principio.' },
      { q: '¿Y si me salto un mes?', a: 'La mayoría de los bancos rebajan el tipo o retrasan el vencimiento. El cálculo supone que todas las aportaciones llegan a tiempo, así que un mes en blanco deja el importe real por debajo de este.' },
      { q: '¿Capitaliza?', a: 'No. Sigue la convención habitual de interés simple para este tipo de producto. Existen productos que capitalizan cada mes y rinden algo más; búscalo en las condiciones.' },
    ],
    ui: {
      section: 'Plan', monthly: 'Aportación mensual', rate: 'Tipo anual (%)', months: 'Plazo (meses)',
      tax: 'Impuesto sobre intereses (%)', calc: 'Calcular',
      note: 'El impuesto empieza en 0 porque el tipo cambia según el país. Pon el tuyo para ver el neto.',
      paidIn: 'Total aportado', interest: 'Intereses', taxPaid: 'Impuestos', total: 'Importe al vencimiento',
      effective: 'Rendimiento sobre lo aportado',
    },
  },
  'pt-br': {
    title: 'Calculadora de aporte mensal',
    desc: 'Quanto rende um valor fixo depositado todo mês, com juros e imposto',
    short: 'O mesmo valor todo mês',
    intro: [
      {
        h: 'Por que 4% rende cerca da metade do que você espera',
        p: 'O primeiro aporte fica na conta o prazo inteiro e ganha um ano cheio de juros. O último chega um mês antes do vencimento e ganha um mês. Na média, seu dinheiro fica lá só metade do prazo — por isso um plano de aportes à mesma taxa rende aproximadamente metade do que renderia um valor único.',
      },
      {
        h: 'Como a conta é feita',
        p: 'Cada parcela rende juros pelos meses que ainda faltam, e os resultados são somados. É a convenção de juros simples que quase todo banco usa nesse tipo de produto. Nada é capitalizado, então o juro nunca rende juro próprio.',
      },
      {
        h: 'Comparando com um valor único, de forma honesta',
        p: 'Colocar o mesmo total numa aplicação no primeiro dia rende muito mais, mas exige ter o dinheiro no primeiro dia. A comparação justa é entre o que você realmente consegue aportar por mês e o valor que realmente tem agora.',
      },
    ],
    faq: [
      { q: 'Então a taxa anunciada engana?', a: 'Não, a taxa é aplicada corretamente — a cada parcela pelo tempo em que ela fica. O que engana é o impulso de multiplicar o total aportado pela taxa, o que pressupõe que todo o dinheiro estava lá desde o início.' },
      { q: 'E se eu pular um mês?', a: 'A maioria dos bancos reduz a taxa ou empurra o vencimento. A conta aqui supõe que toda parcela chega em dia, então um mês perdido deixa o valor real abaixo deste.' },
      { q: 'Tem capitalização?', a: 'Não. Segue a convenção usual de juros simples para esse tipo de produto. Existem produtos que capitalizam ao mês e rendem um pouco mais; procure no contrato.' },
    ],
    ui: {
      section: 'Plano', monthly: 'Aporte mensal', rate: 'Taxa anual (%)', months: 'Prazo (meses)',
      tax: 'Imposto sobre juros (%)', calc: 'Calcular',
      note: 'O imposto começa em 0 porque a alíquota muda de país para país. Informe a sua para ver o líquido.',
      paidIn: 'Total aportado', interest: 'Juros', taxPaid: 'Imposto', total: 'Valor no vencimento',
      effective: 'Retorno sobre o aportado',
    },
  },
  ja: {
    title: '積立の計算機',
    desc: '毎月同じ額を積み立てたときの満期金額と利息・税金',
    short: '毎月同じ額を積む',
    intro: [
      {
        h: '年4%なのに思ったより増えない理由',
        p: '1回目の積立は満期まで丸ごと預けられ、1年分の利息がつきます。最後の1回は満期の1か月前に入るので、1か月分だけです。平均すれば期間の半分しか預けていないことになり、同じ金利でも一括預金のおよそ半分の利息にしかなりません。',
      },
      {
        h: '計算のしかた',
        p: '各回の積立額に、残っている月数ぶんの利息をつけて全部足します。この種の商品で銀行がほぼ例外なく使う単利の約束事です。途中で元本に組み入れないので、利息が利息を生むことはありません。',
      },
      {
        h: '一括預金と比べるときは公平に',
        p: '同じ総額を初日に定期預金へ入れればずっと増えますが、それは初日にその金額があることが前提です。実際に毎月出せる額と、いま実際に手元にある額とを比べるのが正しい比べ方です。',
      },
    ],
    faq: [
      { q: 'では表示金利は嘘なのですか。', a: 'いいえ。金利は各回の預入期間に対して正しく適用されています。誤解のもとは、積立総額に金利を掛けたくなることのほうです。それは初めから全額あった場合の計算です。' },
      { q: '1回積み忘れたらどうなりますか。', a: '多くの銀行は金利を下げるか満期を後ろへずらします。ここでは毎回きちんと入る前提なので、抜けた月があれば実際の受取額はこれより少なくなります。' },
      { q: '複利ですか。', a: 'いいえ。この種の商品で一般的な単利の約束事に従っています。月複利の商品もあり、その分だけ多くなります。約款で確かめてください。' },
    ],
    ui: {
      section: '積立の条件', monthly: '毎月の積立額', rate: '年利 (%)', months: '期間 (か月)',
      tax: '利息への税率 (%)', calc: '計算する',
      note: '税率は国ごとに違うので初期値は0です。ご自分の税率を入れると手取りが出ます。',
      paidIn: '積立元金', interest: '利息', taxPaid: '税金', total: '満期金額',
      effective: '積立元金に対する利回り',
    },
  },
  de: {
    title: 'Sparplan-Rechner',
    desc: 'Worauf eine feste Monatsrate hinausläuft, mit Zinsen und Steuer',
    short: 'Jeden Monat derselbe Betrag',
    intro: [
      {
        h: 'Warum 4% nur etwa die Hälfte bringen',
        p: 'Die erste Rate liegt die ganze Laufzeit auf dem Konto und bekommt ein volles Jahr Zinsen. Die letzte kommt einen Monat vor Ende an und bekommt einen Monat. Im Mittel liegt Ihr Geld nur die halbe Laufzeit dort — deshalb bringt ein Sparplan beim selben Zins ungefähr die Hälfte einer Einmalanlage.',
      },
      {
        h: 'Wie gerechnet wird',
        p: 'Jede Rate wird für die noch verbleibenden Monate verzinst, und alles wird addiert. Das ist die Konvention einfacher Zinsen, die für solche Produkte fast jede Bank verwendet. Nichts wird kapitalisiert, Zinsen tragen also keine eigenen Zinsen.',
      },
      {
        h: 'Fair mit der Einmalanlage vergleichen',
        p: 'Dieselbe Summe am ersten Tag als Festgeld anzulegen bringt deutlich mehr — setzt aber voraus, dass man sie am ersten Tag hat. Der ehrliche Vergleich läuft zwischen dem, was Sie monatlich wirklich aufbringen, und dem Betrag, den Sie wirklich schon haben.',
      },
    ],
    faq: [
      { q: 'Ist der beworbene Zins also irreführend?', a: 'Nein, der Zins wird korrekt angewandt — auf jede Rate für die Zeit, die sie liegt. Irreführend ist der Reflex, die eingezahlte Summe mit dem Zins zu multiplizieren; das unterstellt, das ganze Geld wäre von Anfang an da gewesen.' },
      { q: 'Was passiert, wenn ich einen Monat aussetze?', a: 'Die meisten Banken senken den Zins oder verschieben das Laufzeitende. Hier wird angenommen, dass jede Rate pünktlich eingeht; ein ausgelassener Monat drückt die tatsächliche Auszahlung unter diesen Wert.' },
      { q: 'Wird kapitalisiert?', a: 'Nein. Es gilt die übliche Konvention einfacher Zinsen für Sparpläne. Produkte mit monatlicher Kapitalisierung gibt es, sie bringen etwas mehr — schauen Sie in die Bedingungen.' },
    ],
    ui: {
      section: 'Sparplan', monthly: 'Monatliche Rate', rate: 'Zinssatz p. a. (%)', months: 'Laufzeit (Monate)',
      tax: 'Steuer auf Zinsen (%)', calc: 'Berechnen',
      note: 'Die Steuer startet bei 0, weil der Satz je Land verschieden ist. Tragen Sie Ihren ein.',
      paidIn: 'Eingezahlt', interest: 'Zinsen', taxPaid: 'Steuer', total: 'Endbetrag',
      effective: 'Rendite auf das Eingezahlte',
    },
  },
  fr: {
    title: 'Calculateur d’épargne mensuelle',
    desc: 'Ce que donne un versement mensuel fixe, intérêts et impôt compris',
    short: 'Le même montant chaque mois',
    intro: [
      {
        h: 'Pourquoi 4% rapportent environ la moitié de ce qu’on croit',
        p: 'Le premier versement reste sur le compte toute la durée et touche une année pleine d’intérêts. Le dernier arrive un mois avant l’échéance et n’en touche qu’un. En moyenne, votre argent n’est là que la moitié de la durée — c’est pourquoi une épargne mensuelle au même taux rapporte à peu près la moitié d’un placement en une fois.',
      },
      {
        h: 'Le mode de calcul',
        p: 'Chaque versement produit des intérêts pour les mois qu’il lui reste, et tout est additionné. C’est la convention d’intérêts simples que presque toutes les banques appliquent à ce type de produit. Rien n’est capitalisé : les intérêts ne produisent jamais d’intérêts.',
      },
      {
        h: 'Comparer honnêtement avec un placement unique',
        p: 'Placer le même total dès le premier jour rapporte bien davantage — encore faut-il disposer de la somme dès le premier jour. La vraie comparaison se fait entre ce que vous pouvez réellement verser chaque mois et la somme dont vous disposez réellement.',
      },
    ],
    faq: [
      { q: 'Le taux affiché est donc trompeur ?', a: 'Non, il est appliqué correctement — à chaque versement pour la durée où il reste placé. Ce qui trompe, c’est le réflexe de multiplier le total versé par le taux, qui suppose que tout l’argent était là dès le départ.' },
      { q: 'Et si je saute un mois ?', a: 'La plupart des banques baissent le taux ou décalent l’échéance. Le calcul suppose que chaque versement arrive à l’heure : un mois manqué rend le versement réel inférieur à ce résultat.' },
      { q: 'Y a-t-il capitalisation ?', a: 'Non. On suit la convention habituelle d’intérêts simples pour ce type de produit. Il existe des produits capitalisant chaque mois, qui rapportent un peu plus ; vérifiez le contrat.' },
    ],
    ui: {
      section: 'Plan', monthly: 'Versement mensuel', rate: 'Taux annuel (%)', months: 'Durée (mois)',
      tax: 'Impôt sur les intérêts (%)', calc: 'Calculer',
      note: 'L’impôt démarre à 0 car le taux change selon le pays. Saisissez le vôtre pour voir le net.',
      paidIn: 'Total versé', interest: 'Intérêts', taxPaid: 'Impôt', total: 'Montant à l’échéance',
      effective: 'Rendement sur les versements',
    },
  },
  hi: {
    title: 'आवर्ती जमा कैलकुलेटर',
    desc: 'हर महीने की तय जमा से कितना बनता है — ब्याज और कर सहित',
    short: 'हर महीने उतनी ही रकम',
    intro: [
      {
        h: '4% पर उम्मीद से आधा ही क्यों मिलता है',
        p: 'पहली किस्त पूरी अवधि खाते में पड़ी रहती है और पूरे साल का ब्याज पाती है। आख़िरी किस्त परिपक्वता से एक महीने पहले आती है और एक महीने का ब्याज पाती है। औसतन आपका पैसा अवधि के आधे समय ही वहाँ रहता है — इसीलिए उसी दर पर आवर्ती जमा, एकमुश्त जमा का लगभग आधा ब्याज देती है।',
      },
      {
        h: 'हिसाब कैसे लगता है',
        p: 'हर किस्त को बची हुई महीनों जितना ब्याज मिलता है, और सब जोड़ दिया जाता है। इस तरह के उत्पाद पर लगभग हर बैंक यही साधारण ब्याज की रीत अपनाता है। कुछ भी मूलधन में नहीं जुड़ता, इसलिए ब्याज पर ब्याज कभी नहीं बनता।',
      },
      {
        h: 'एकमुश्त जमा से तुलना ईमानदारी से करें',
        p: 'वही कुल रकम पहले ही दिन सावधि जमा में डाल दें तो कहीं ज़्यादा मिलेगा — पर उसके लिए पहले दिन वह रकम होनी चाहिए। सही तुलना यह है कि आप हर महीने सचमुच कितना डाल सकते हैं, और अभी सचमुच कितना आपके पास है।',
      },
    ],
    faq: [
      { q: 'तो क्या विज्ञापित दर गुमराह करती है?', a: 'नहीं, दर सही ही लगती है — हर किस्त पर उतने समय के लिए जितना वह रुकती है। गुमराह करती है यह आदत कि कुल जमा को दर से गुणा कर दिया जाए, जो मान लेती है कि सारा पैसा शुरू से मौजूद था।' },
      { q: 'कोई महीना छूट जाए तो?', a: 'ज़्यादातर बैंक या तो दर घटा देते हैं या परिपक्वता आगे खिसका देते हैं। यहाँ मान लिया गया है कि हर किस्त समय पर आती है, इसलिए छूटे महीने के बाद असली राशि इससे कम होगी।' },
      { q: 'क्या इसमें चक्रवृद्धि है?', a: 'नहीं। इस तरह के उत्पाद की सामान्य साधारण-ब्याज रीत ही अपनाई गई है। मासिक चक्रवृद्धि वाले उत्पाद भी होते हैं और थोड़ा ज़्यादा देते हैं; शर्तों में देख लें।' },
    ],
    ui: {
      section: 'योजना', monthly: 'मासिक जमा', rate: 'वार्षिक दर (%)', months: 'अवधि (महीने)',
      tax: 'ब्याज पर कर (%)', calc: 'गणना करें',
      note: 'कर दर हर देश में अलग है, इसलिए शुरुआत 0 से है। अपनी दर डालकर शुद्ध राशि देखें।',
      paidIn: 'कुल जमा', interest: 'ब्याज', taxPaid: 'कर', total: 'परिपक्वता राशि',
      effective: 'जमा पर प्रतिफल',
    },
  },
  'zh-hans': {
    title: '零存整取计算器',
    desc: '每月固定存入一笔，到期能拿多少，含利息和税款',
    short: '每月存同样多',
    intro: [
      {
        h: '为什么 4% 只拿到一半左右',
        p: '第一笔存进去在账户里放满整个期限，能拿一整年的利息。最后一笔在到期前一个月才进来，只拿一个月。平均下来，你的钱只在里面待了一半的时间——所以同样的利率，零存整取的利息大约只有整笔存入的一半。',
      },
      {
        h: '这笔账怎么算',
        p: '每一期存入按剩下的月数计息，再把所有结果相加。这是几乎所有银行对这类产品采用的单利惯例。中途不并入本金，所以利息不会再生利息。',
      },
      {
        h: '和整笔存入比较时要公平',
        p: '把同样的总额在第一天存成定期，收益会高得多，但前提是第一天就有这笔钱。真正该比的，是你每月实际能拿出多少，和你现在手里实际有多少。',
      },
    ],
    faq: [
      { q: '那广告上的利率是骗人的吗？', a: '不是，利率是正确套用的——按每一期实际存放的时间计息。误导人的是那个直觉：拿存入总额乘以利率。那等于假设所有钱从第一天就在里面。' },
      { q: '有一个月忘了存怎么办？', a: '多数银行会下调利率或把到期日往后推。这里假设每期都按时到账，所以漏了一期，实际拿到的会比这个数少。' },
      { q: '算复利吗？', a: '不算。这里遵循这类产品通行的单利惯例。也有按月复利的产品，收益略高一点，请翻一下条款。' },
    ],
    ui: {
      section: '存款计划', monthly: '每月存入', rate: '年利率 (%)', months: '期限（月）',
      tax: '利息税率 (%)', calc: '计算',
      note: '税率各国不同，所以默认是 0。填上你的税率即可看到到手金额。',
      paidIn: '累计存入', interest: '利息', taxPaid: '税款', total: '到期金额',
      effective: '相对存入本金的收益率',
    },
  },
  'zh-hant': {
    title: '零存整付計算機',
    desc: '每月固定存入一筆，到期能拿多少，含利息和稅款',
    short: '每月存同樣多',
    intro: [
      {
        h: '為什麼 4% 只拿到一半左右',
        p: '第一筆存進去在帳戶裡放滿整個期限，能拿一整年的利息。最後一筆在到期前一個月才進來，只拿一個月。平均下來，你的錢只在裡面待了一半的時間——所以同樣的利率，零存整付的利息大約只有整筆存入的一半。',
      },
      {
        h: '這筆帳怎麼算',
        p: '每一期存入按剩下的月數計息，再把所有結果相加。這是幾乎所有銀行對這類商品採用的單利慣例。中途不併入本金，所以利息不會再生利息。',
      },
      {
        h: '和整筆存入比較時要公平',
        p: '把同樣的總額在第一天存成定存，收益會高得多，但前提是第一天就有這筆錢。真正該比的，是你每月實際能拿出多少，和你現在手裡實際有多少。',
      },
    ],
    faq: [
      { q: '那廣告上的利率是騙人的嗎？', a: '不是，利率是正確套用的——按每一期實際存放的時間計息。誤導人的是那個直覺：拿存入總額乘以利率。那等於假設所有錢從第一天就在裡面。' },
      { q: '有一個月忘了存怎麼辦？', a: '多數銀行會下調利率或把到期日往後推。這裡假設每期都準時到帳，所以漏了一期，實際拿到的會比這個數少。' },
      { q: '算複利嗎？', a: '不算。這裡遵循這類商品通行的單利慣例。也有按月複利的商品，收益略高一點，請翻一下條款。' },
    ],
    ui: {
      section: '存款計畫', monthly: '每月存入', rate: '年利率 (%)', months: '期限（月）',
      tax: '利息稅率 (%)', calc: '計算',
      note: '稅率各國不同，所以預設是 0。填上你的稅率即可看到到手金額。',
      paidIn: '累計存入', interest: '利息', taxPaid: '稅款', total: '到期金額',
      effective: '相對存入本金的報酬率',
    },
  },
};
