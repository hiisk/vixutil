import type { CalcTable } from './types.ts';

/**
 * 팁 계산기.
 *
 * 팁 관습은 나라마다 크게 다르다 — 미국은 사실상 의무, 일본은 안 주는 것이
 * 예의, 유럽은 반올림 정도. 계산 자체(금액 × 비율 ÷ 인원)는 어디서나 같으므로
 * 계산기는 그대로 두되, 본문에서 그 차이를 짚는다. "15~20%가 표준"이라고
 * 단정하면 미국 밖에서는 틀린 말이 된다.
 *
 * 통화 기호도 넣지 않는다. 숫자만 받으면 어느 나라 돈이든 그대로 쓸 수 있다.
 */
export const TIP: CalcTable = {
  en: {
    title: 'Tip calculator',
    desc: 'Split a bill and a tip between any number of people',
    short: 'Bill · tip rate · people → each share',
    intro: [
      {
        h: 'Tip on the pre-tax amount',
        p: 'Where sales tax is added at the till, the usual convention is to tip on the amount before tax, not the total on the slip. Enter the food and drink subtotal here. Tipping on the taxed total quietly adds a couple of percent.',
      },
      {
        h: 'What counts as normal varies a lot',
        p: 'In the United States 15–20% is expected and staff wages assume it. In much of Europe service is included and people round up or leave small change. In Japan tipping is not customary and can cause confusion. This calculator does not assume a rate — pick what fits where you are.',
      },
    ],
    faq: [
      { q: 'Should I tip on the total or before tax?', a: 'Before tax, by convention. On a 10% tax, tipping the taxed total adds roughly two percent more than you intended.' },
      { q: 'What if service is already added?', a: 'Check the bill for a service charge or “service compris”. If one is there, an extra tip is optional and usually small — rounding up is enough.' },
      { q: 'How is an uneven split handled?', a: 'This calculator divides evenly. For an uneven split, work out each person’s share of the bill first and apply the same tip rate to each.' },
    ],
    ui: {
      section: 'Bill details', amount: 'Amount', rate: 'Tip rate', people: 'People',
      calc: 'Calculate', detail: 'Breakdown', base: 'Bill', tipAmount: 'Tip',
      total: 'Total', each: 'Each person', hintTax: 'Use the amount before tax.',
      hintService: 'Check whether service is already included.',
    },
  },
  es: {
    title: 'Calculadora de propina',
    desc: 'Reparte la cuenta y la propina entre cualquier número de personas',
    short: 'Cuenta · porcentaje · personas → parte de cada uno',
    intro: [
      {
        h: 'La propina se calcula antes de impuestos',
        p: 'Donde el impuesto se añade al cobrar, lo habitual es calcular la propina sobre el importe antes de impuestos, no sobre el total del ticket. Introduce aquí el subtotal de comida y bebida. Hacerlo sobre el total con impuestos añade un par de puntos sin que te des cuenta.',
      },
      {
        h: 'Lo “normal” cambia mucho según el país',
        p: 'En Estados Unidos se espera un 15–20% y los sueldos del personal cuentan con ello. En buena parte de Europa el servicio va incluido y la gente redondea o deja las monedas. En Japón no se acostumbra y puede resultar incómodo. Esta calculadora no da por supuesto ningún porcentaje: elige el que encaje donde estés.',
      },
    ],
    faq: [
      { q: '¿Propina sobre el total o antes de impuestos?', a: 'Antes de impuestos, por convención. Con un impuesto del 10%, calcularla sobre el total supone dar en torno a dos puntos más de lo que pretendías.' },
      { q: '¿Y si el servicio ya está incluido?', a: 'Mira si en la cuenta figura un cargo por servicio. Si lo hay, la propina extra es opcional y suele ser pequeña: redondear basta.' },
      { q: '¿Cómo se hace un reparto desigual?', a: 'Esta calculadora divide a partes iguales. Para un reparto desigual, calcula primero lo que consumió cada uno y aplícale a cada parte el mismo porcentaje.' },
    ],
    ui: {
      section: 'Datos de la cuenta', amount: 'Importe', rate: 'Porcentaje de propina', people: 'Personas',
      calc: 'Calcular', detail: 'Desglose', base: 'Cuenta', tipAmount: 'Propina',
      total: 'Total', each: 'Por persona', hintTax: 'Usa el importe antes de impuestos.',
      hintService: 'Comprueba si el servicio ya está incluido.',
    },
  },
  'pt-br': {
    title: 'Calculadora de gorjeta',
    desc: 'Divida a conta e a gorjeta entre quantas pessoas quiser',
    short: 'Conta · percentual · pessoas → parte de cada um',
    intro: [
      {
        h: 'A gorjeta vai sobre o valor antes dos impostos',
        p: 'Onde o imposto entra no caixa, o costume é calcular a gorjeta sobre o valor antes dele, não sobre o total do cupom. Digite aqui o subtotal de comida e bebida. Calcular sobre o total já tributado acrescenta uns dois pontos sem você perceber.',
      },
      {
        h: 'O que é “normal” muda bastante de país para país',
        p: 'Nos Estados Unidos espera-se 15–20% e os salários contam com isso. Em boa parte da Europa o serviço já vem incluído e as pessoas arredondam. No Japão não se costuma dar gorjeta e isso pode causar constrangimento. No Brasil os 10% costumam vir na conta. Esta calculadora não assume nenhum percentual — escolha o que faz sentido onde você está.',
      },
    ],
    faq: [
      { q: 'Gorjeta sobre o total ou antes do imposto?', a: 'Antes, por convenção. Com imposto de 10%, calcular sobre o total significa dar cerca de dois pontos a mais do que você pretendia.' },
      { q: 'E se o serviço já estiver incluído?', a: 'Confira se a conta traz a taxa de serviço. Se traz, a gorjeta extra é opcional e costuma ser pequena — arredondar já basta.' },
      { q: 'Como fazer uma divisão desigual?', a: 'Esta calculadora divide por igual. Para dividir de forma desigual, calcule primeiro quanto cada um consumiu e aplique o mesmo percentual a cada parte.' },
    ],
    ui: {
      section: 'Dados da conta', amount: 'Valor', rate: 'Percentual da gorjeta', people: 'Pessoas',
      calc: 'Calcular', detail: 'Detalhamento', base: 'Conta', tipAmount: 'Gorjeta',
      total: 'Total', each: 'Por pessoa', hintTax: 'Use o valor antes dos impostos.',
      hintService: 'Veja se a taxa de serviço já está incluída.',
    },
  },
  ja: {
    title: 'チップ計算機',
    desc: '会計とチップを人数で割る',
    short: '金額・割合・人数 → ひとり分',
    intro: [
      {
        h: 'チップは税抜きの金額に対して',
        p: '会計時に税が加わる国では、チップは税を含まない金額に対して計算するのが普通です。ここには飲食の小計を入れてください。税込み合計に掛けると、意図より2%ほど多く払うことになります。',
      },
      {
        h: '「普通」は国によってまるで違う',
        p: 'アメリカでは15〜20%が前提で、店員の賃金もそれを織り込んでいます。ヨーロッパの多くではサービス料が含まれており、端数を切り上げる程度です。日本ではチップの習慣がなく、渡すとかえって戸惑わせます。この計算機は割合を決め打ちしません — 行く先に合わせて選んでください。',
      },
    ],
    faq: [
      { q: 'チップは税込みと税抜きのどちらに掛けますか。', a: '慣習では税抜きです。税が10%の場合、税込みに掛けると意図より2%ほど多くなります。' },
      { q: 'サービス料がすでに入っているときは。', a: '伝票にサービス料の記載がないか確かめてください。入っていれば追加のチップは任意で、端数を切り上げる程度で十分です。' },
      { q: '割り勘を均等でなくしたいときは。', a: 'この計算機は均等に割ります。均等でない場合は、まず各自の飲食分を出し、それぞれに同じ割合を掛けてください。' },
    ],
    ui: {
      section: '会計の内容', amount: '金額', rate: 'チップの割合', people: '人数',
      calc: '計算する', detail: '内訳', base: '会計', tipAmount: 'チップ',
      total: '合計', each: 'ひとり分', hintTax: '税抜きの金額を入れてください。',
      hintService: 'サービス料が含まれていないか確かめてください。',
    },
  },
  de: {
    title: 'Trinkgeld-Rechner',
    desc: 'Rechnung und Trinkgeld auf beliebig viele Personen aufteilen',
    short: 'Betrag · Satz · Personen → Anteil pro Kopf',
    intro: [
      {
        h: 'Trinkgeld auf den Betrag vor Steuer',
        p: 'Wo die Steuer erst an der Kasse dazukommt, rechnet man das Trinkgeld üblicherweise auf den Betrag davor, nicht auf die Endsumme. Gib hier die Zwischensumme für Speisen und Getränke ein. Auf die versteuerte Summe gerechnet, zahlst du still und leise zwei Prozent mehr als gedacht.',
      },
      {
        h: '„Üblich“ heißt überall etwas anderes',
        p: 'In den USA werden 15–20% erwartet und die Löhne sind darauf ausgelegt. In weiten Teilen Europas ist Bedienung inbegriffen und man rundet auf. In Japan ist Trinkgeld unüblich und stiftet eher Verwirrung. Im deutschsprachigen Raum sind fünf bis zehn Prozent verbreitet. Dieser Rechner setzt keinen Satz voraus — wähle, was am Ort passt.',
      },
    ],
    faq: [
      { q: 'Auf die Endsumme oder vor Steuer?', a: 'Üblicherweise vor Steuer. Bei 10% Steuer zahlst du auf die Endsumme gerechnet rund zwei Prozent mehr, als du eigentlich wolltest.' },
      { q: 'Was, wenn Bedienung schon enthalten ist?', a: 'Schau auf der Rechnung nach einem Servicezuschlag. Steht er da, ist zusätzliches Trinkgeld freiwillig und meist klein — Aufrunden genügt.' },
      { q: 'Wie teilt man ungleich?', a: 'Dieser Rechner teilt gleichmäßig. Für eine ungleiche Teilung erst den Anteil jeder Person an der Rechnung ermitteln und darauf denselben Satz anwenden.' },
    ],
    ui: {
      section: 'Angaben zur Rechnung', amount: 'Betrag', rate: 'Trinkgeldsatz', people: 'Personen',
      calc: 'Berechnen', detail: 'Aufstellung', base: 'Rechnung', tipAmount: 'Trinkgeld',
      total: 'Gesamt', each: 'Pro Person', hintTax: 'Betrag vor Steuer eingeben.',
      hintService: 'Prüfen, ob Bedienung bereits enthalten ist.',
    },
  },
  fr: {
    title: 'Calculateur de pourboire',
    desc: 'Partager l’addition et le pourboire entre autant de personnes qu’on veut',
    short: 'Montant · taux · convives → part de chacun',
    intro: [
      {
        h: 'Le pourboire se calcule hors taxe',
        p: 'Là où la taxe s’ajoute en caisse, l’usage est de calculer le pourboire sur le montant avant taxe, pas sur le total du ticket. Saisissez ici le sous-total nourriture et boissons. Sur le total taxé, vous donnez discrètement deux points de plus que prévu.',
      },
      {
        h: 'Ce qui est « normal » varie énormément',
        p: 'Aux États-Unis, 15 à 20% sont attendus et les salaires en tiennent compte. Dans une grande partie de l’Europe, le service est compris et l’on arrondit. Au Japon, le pourboire n’est pas d’usage et met plutôt mal à l’aise. En France, le service est inclus depuis longtemps ; on laisse un petit complément si l’on veut. Ce calculateur n’impose aucun taux — choisissez celui qui convient sur place.',
      },
    ],
    faq: [
      { q: 'Sur le total ou hors taxe ?', a: 'Hors taxe, par convention. Avec une taxe de 10%, calculer sur le total revient à donner environ deux points de plus que voulu.' },
      { q: 'Et si le service est déjà compris ?', a: 'Vérifiez la mention « service compris » ou une ligne de service sur l’addition. Si elle y est, le complément est facultatif et reste modeste — arrondir suffit.' },
      { q: 'Comment répartir de façon inégale ?', a: 'Ce calculateur divise à parts égales. Pour une répartition inégale, établissez d’abord la part de chacun puis appliquez le même taux à chaque part.' },
    ],
    ui: {
      section: 'Détails de l’addition', amount: 'Montant', rate: 'Taux du pourboire', people: 'Convives',
      calc: 'Calculer', detail: 'Détail', base: 'Addition', tipAmount: 'Pourboire',
      total: 'Total', each: 'Par personne', hintTax: 'Saisissez le montant hors taxe.',
      hintService: 'Vérifiez si le service est déjà compris.',
    },
  },
  hi: {
    title: 'टिप कैलकुलेटर',
    desc: 'बिल और टिप को जितने चाहें उतने लोगों में बाँटें',
    short: 'रक़म · दर · लोग → हर एक का हिस्सा',
    intro: [
      {
        h: 'टिप कर से पहले की रक़म पर',
        p: 'जहाँ बिल पर कर अलग से जुड़ता है, वहाँ रिवाज़ यह है कि टिप कर से पहले वाली रक़म पर लगाई जाए, कुल पर नहीं। यहाँ खाने-पीने का उप-योग डालिए। कर सहित कुल पर लगाने से आप बिना जाने दो प्रतिशत ज़्यादा दे देते हैं।',
      },
      {
        h: '"सामान्य" हर देश में अलग है',
        p: 'अमेरिका में 15–20% अपेक्षित है और वहाँ कर्मचारियों की तनख़्वाह इसी हिसाब से बनी है। यूरोप के बड़े हिस्से में सेवा शुल्क बिल में शामिल रहता है और लोग बस राशि गोल कर देते हैं। जापान में टिप का चलन नहीं और देने पर असहजता होती है। भारत में अक्सर 5–10% या सेवा शुल्क पहले से जुड़ा होता है। यह कैलकुलेटर कोई दर मान कर नहीं चलता — जहाँ हैं वहाँ के हिसाब से चुनिए।',
      },
    ],
    faq: [
      { q: 'टिप कुल पर लगे या कर से पहले?', a: 'रिवाज़न कर से पहले। 10% कर पर, कुल रक़म पर लगाने से आप इरादे से क़रीब दो प्रतिशत ज़्यादा दे देते हैं।' },
      { q: 'अगर सेवा शुल्क पहले से जुड़ा हो तो?', a: 'बिल में सेवा शुल्क की पंक्ति देखिए। अगर है, तो अतिरिक्त टिप वैकल्पिक है और आम तौर पर छोटी — रक़म गोल कर देना काफ़ी है।' },
      { q: 'असमान बँटवारा कैसे करें?', a: 'यह कैलकुलेटर बराबर बाँटता है। असमान बँटवारे के लिए पहले हर व्यक्ति का हिस्सा निकालिए, फिर हर हिस्से पर वही दर लगाइए।' },
    ],
    ui: {
      section: 'बिल की जानकारी', amount: 'रक़म', rate: 'टिप की दर', people: 'लोग',
      calc: 'गणना करें', detail: 'ब्योरा', base: 'बिल', tipAmount: 'टिप',
      total: 'कुल', each: 'प्रति व्यक्ति', hintTax: 'कर से पहले की रक़म डालें।',
      hintService: 'देख लें कि सेवा शुल्क पहले से जुड़ा है या नहीं।',
    },
  },
  'zh-hans': {
    title: '小费计算器',
    desc: '把账单和小费按人数分摊',
    short: '金额 · 比例 · 人数 → 每人应付',
    intro: [
      {
        h: '小费按税前金额算',
        p: '在结账时才加税的地方，习惯上小费按税前金额计算，而不是小票上的总额。这里请填餐饮小计。按含税总额去乘，等于不知不觉多给了两个点。',
      },
      {
        h: '“正常”在各国差别很大',
        p: '美国普遍期待 15–20%，服务人员的工资也是按这个算的。欧洲很多地方服务费已含在账单里，大家只是把零头凑整。日本没有给小费的习惯，给了反而让人为难。中国大陆餐饮通常不收小费。这个计算器不预设比例——按你所在的地方选。',
      },
    ],
    faq: [
      { q: '小费按总额还是税前？', a: '按惯例是税前。税率 10% 的情况下，按含税总额算等于比你打算的多给约两个点。' },
      { q: '如果服务费已经含在账单里呢？', a: '看看账单上有没有服务费那一行。如果有，额外的小费是自愿的，通常也很少——凑个整就够了。' },
      { q: '怎么按不同比例分摊？', a: '这个计算器是平均分。要不平均分，先算出每个人各自消费了多少，再对每份套用同样的小费比例。' },
    ],
    ui: {
      section: '账单信息', amount: '金额', rate: '小费比例', people: '人数',
      calc: '计算', detail: '明细', base: '账单', tipAmount: '小费',
      total: '合计', each: '每人', hintTax: '请填税前金额。',
      hintService: '确认服务费是否已包含。',
    },
  },
  'zh-hant': {
    title: '小費計算機',
    desc: '把帳單和小費按人數分攤',
    short: '金額 · 比例 · 人數 → 每人應付',
    intro: [
      {
        h: '小費按稅前金額算',
        p: '在結帳時才加稅的地方，習慣上小費按稅前金額計算，而不是收據上的總額。這裡請填餐飲小計。按含稅總額去乘，等於不知不覺多給了兩個百分點。',
      },
      {
        h: '「正常」在各國差別很大',
        p: '美國普遍期待 15–20%，服務人員的薪水也是按這個算的。歐洲很多地方服務費已含在帳單裡，大家只是把零頭湊整。日本沒有給小費的習慣，給了反而讓人為難。台灣的餐廳多半直接收一成服務費。這個計算機不預設比例——按你所在的地方選。',
      },
    ],
    faq: [
      { q: '小費按總額還是稅前？', a: '按慣例是稅前。稅率 10% 的情況下，按含稅總額算等於比你打算的多給約兩個百分點。' },
      { q: '如果服務費已經含在帳單裡呢？', a: '看看帳單上有沒有服務費那一行。如果有，額外的小費是自願的，通常也很少——湊個整就夠了。' },
      { q: '怎麼按不同比例分攤？', a: '這個計算機是平均分。要不平均分，先算出每個人各自消費了多少，再對每份套用同樣的小費比例。' },
    ],
    ui: {
      section: '帳單資訊', amount: '金額', rate: '小費比例', people: '人數',
      calc: '計算', detail: '明細', base: '帳單', tipAmount: '小費',
      total: '合計', each: '每人', hintTax: '請填稅前金額。',
      hintService: '確認服務費是否已包含。',
    },
  },
};
