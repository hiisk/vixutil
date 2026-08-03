import type { CalcTable } from './types.ts';

/**
 * 자동차 넷.
 *
 * 한국어판은 유가를 리터당 1,650원으로, 충전요금을 kWh당 100~450원으로 박아
 * 두었다. 둘 다 한국 가격이라 전부 입력으로 뺐다. 연비는 나라마다 단위가
 * 갈리므로(km/L·L/100km·mpg) 네 가지를 한꺼번에 보여 준다.
 */
export const CAR_INSTALLMENT: CalcTable = {
  en: {
    title: 'Car finance calculator',
    desc: 'Monthly payment, total paid and total interest on a car loan',
    short: 'Monthly payment · total interest',
    intro: [
      {
        h: 'The monthly payment is the wrong number to shop on',
        p: 'Stretching the term makes any car look affordable, because the same debt is spread over more months. The total interest goes the other way. Compare 36 months against 72 on the same car and the gap in what you finally pay is far larger than the gap in the monthly figure.',
      },
      {
        h: 'A deposit cuts the interest twice over',
        p: 'Money paid up front is not borrowed, so it never accrues interest at all. Putting a fifth down does not just lower the payment by a fifth — it removes a fifth of the interest from the whole schedule.',
      },
      {
        h: 'The loan is not the cost of the car',
        p: 'Insurance, tax, registration, servicing and fuel land outside this calculation, and over five years they often add up to more than the interest. A payment you can just about meet is a payment with no room for the rest of it.',
      },
    ],
    faq: [
      { q: 'How is the monthly payment worked out?', a: 'The standard annuity formula: every payment is identical, and the split between interest and principal shifts across the term. Early payments are mostly interest, later ones mostly principal.' },
      { q: 'Does a longer term ever make sense?', a: 'When the alternative is not buying a car you genuinely need, or when the rate is very low. It stops making sense when the loan outlives the car\'s value and you end up owing more than it is worth.' },
      { q: 'Are balloon payments handled?', a: 'No. This assumes the loan is fully repaid by the final payment. A contract with a large lump at the end has a lower monthly figure and a very different total.' },
    ],
    ui: {
      section: 'Loan terms', price: 'Vehicle price', down: 'Deposit', months: 'Term (months)',
      rate: 'Annual rate (%)', calc: 'Calculate',
      monthly: 'Monthly payment', borrowed: 'Amount borrowed',
      totalPaid: 'Total you pay', totalInterest: 'Total interest',
      split: 'Principal vs interest', principalLabel: 'Principal', interestLabel: 'Interest',
      note: 'Assumes a fully amortised loan with equal payments and no balloon at the end.',
    },
  },
  es: {
    title: 'Calculadora de financiación de coche',
    desc: 'Cuota mensual, total pagado e intereses totales de un préstamo para coche',
    short: 'Cuota mensual · intereses totales',
    intro: [
      {
        h: 'La cuota mensual es la cifra equivocada para comparar',
        p: 'Alargar el plazo hace que cualquier coche parezca asequible, porque la misma deuda se reparte entre más meses. Los intereses totales van en sentido contrario. Compara 36 meses frente a 72 en el mismo coche y la diferencia en lo que acabas pagando es mucho mayor que la diferencia en la cuota.',
      },
      {
        h: 'La entrada reduce los intereses dos veces',
        p: 'El dinero pagado por adelantado no se pide prestado, así que nunca genera intereses. Poner una quinta parte no solo baja la cuota una quinta parte: elimina una quinta parte de los intereses de todo el cuadro.',
      },
      {
        h: 'El préstamo no es el coste del coche',
        p: 'Seguro, impuestos, matriculación, mantenimiento y combustible quedan fuera de este cálculo, y en cinco años suelen sumar más que los intereses. Una cuota que apenas puedes pagar es una cuota sin margen para todo lo demás.',
      },
    ],
    faq: [
      { q: '¿Cómo se calcula la cuota?', a: 'Con la fórmula de anualidad estándar: todas las cuotas son iguales y el reparto entre intereses y capital cambia a lo largo del plazo. Las primeras son casi todo intereses; las últimas, casi todo capital.' },
      { q: '¿Alguna vez compensa un plazo largo?', a: 'Cuando la alternativa es no tener un coche que de verdad necesitas, o cuando el tipo es muy bajo. Deja de compensar cuando el préstamo sobrevive al valor del coche y acabas debiendo más de lo que vale.' },
      { q: '¿Contempla cuotas finales grandes?', a: 'No. Aquí el préstamo queda saldado con la última cuota. Un contrato con un pago final grande tiene una cuota más baja y un total muy distinto.' },
    ],
    ui: {
      section: 'Condiciones', price: 'Precio del vehículo', down: 'Entrada', months: 'Plazo (meses)',
      rate: 'Tipo anual (%)', calc: 'Calcular',
      monthly: 'Cuota mensual', borrowed: 'Importe financiado',
      totalPaid: 'Total que pagas', totalInterest: 'Intereses totales',
      split: 'Capital frente a intereses', principalLabel: 'Capital', interestLabel: 'Intereses',
      note: 'Supone un préstamo amortizado por completo con cuotas iguales y sin pago final.',
    },
  },
  'pt-br': {
    title: 'Calculadora de financiamento de carro',
    desc: 'Parcela mensal, total pago e juros totais de um financiamento de veículo',
    short: 'Parcela · juros totais',
    intro: [
      {
        h: 'A parcela é o número errado para comparar',
        p: 'Esticar o prazo faz qualquer carro parecer acessível, porque a mesma dívida se espalha por mais meses. Os juros totais vão no sentido contrário. Compare 36 meses com 72 no mesmo carro e a diferença no que você paga no fim é bem maior que a diferença na parcela.',
      },
      {
        h: 'A entrada corta os juros duas vezes',
        p: 'Dinheiro pago à vista não é emprestado, então nunca rende juros. Dar um quinto de entrada não só reduz a parcela em um quinto — tira um quinto dos juros de toda a tabela.',
      },
      {
        h: 'O financiamento não é o custo do carro',
        p: 'Seguro, impostos, emplacamento, manutenção e combustível ficam fora desta conta e, em cinco anos, costumam somar mais que os juros. Uma parcela que você mal consegue pagar é uma parcela sem folga para todo o resto.',
      },
    ],
    faq: [
      { q: 'Como a parcela é calculada?', a: 'Pela fórmula padrão de anuidade: todas as parcelas são iguais e a divisão entre juros e principal muda ao longo do prazo. As primeiras são quase só juros; as últimas, quase só principal.' },
      { q: 'Prazo longo compensa alguma vez?', a: 'Quando a alternativa é ficar sem um carro de que você realmente precisa, ou quando a taxa é muito baixa. Deixa de compensar quando o financiamento sobrevive ao valor do carro e você acaba devendo mais do que ele vale.' },
      { q: 'Ele lida com parcela final maior?', a: 'Não. Aqui o financiamento é quitado na última parcela. Um contrato com um valor alto no fim tem parcela menor e um total bem diferente.' },
    ],
    ui: {
      section: 'Condições', price: 'Preço do veículo', down: 'Entrada', months: 'Prazo (meses)',
      rate: 'Taxa anual (%)', calc: 'Calcular',
      monthly: 'Parcela mensal', borrowed: 'Valor financiado',
      totalPaid: 'Total pago', totalInterest: 'Juros totais',
      split: 'Principal x juros', principalLabel: 'Principal', interestLabel: 'Juros',
      note: 'Supõe financiamento totalmente amortizado, parcelas iguais e sem valor residual no fim.',
    },
  },
  ja: {
    title: '自動車ローンの計算機',
    desc: '毎月の支払額、総支払額、利息の合計を出します',
    short: '毎月の支払額と利息',
    intro: [
      {
        h: '月々の額で車を選ぶと間違えます',
        p: '期間を延ばせば同じ借金が月数で薄まるので、どんな車でも手が届くように見えます。しかし利息の合計は逆に増えます。同じ車で36回と72回を並べると、最後に払う総額の差は毎月の額の差よりずっと大きくなります。',
      },
      {
        h: '頭金は利息を二重に減らします',
        p: '先に払ったお金は借りていないので、そもそも利息がつきません。5分の1を頭金にすれば毎月の額が5分の1減るだけでなく、返済表全体から利息の5分の1が消えます。',
      },
      {
        h: 'ローンは車の費用ではありません',
        p: '保険、税金、登録費用、整備、燃料はこの計算の外にあり、5年ならその合計が利息を上回ることも珍しくありません。ぎりぎり払える月額は、残り全部のための余地がない月額です。',
      },
    ],
    faq: [
      { q: '毎月の支払額はどう計算しますか。', a: '一般的な元利均等の式です。毎回の支払額は同じで、その中の利息と元本の割合が期間とともに移っていきます。最初は利息が大半、最後は元本が大半です。' },
      { q: '長い期間が正しいこともありますか。', a: '本当に必要な車を諦めるしかない場合や、金利が非常に低い場合です。ローンが車の価値より長く残り、売っても返しきれない状態になると意味を失います。' },
      { q: '残価設定型には対応していますか。', a: 'していません。ここでは最終回で完済する前提です。最後に大きな一括が残る契約は月々が安く、総額はまったく別の数字になります。' },
    ],
    ui: {
      section: 'ローンの条件', price: '車両価格', down: '頭金', months: '期間 (か月)',
      rate: '年利 (%)', calc: '計算する',
      monthly: '毎月の支払額', borrowed: '借入額',
      totalPaid: '総支払額', totalInterest: '利息の合計',
      split: '元本と利息の割合', principalLabel: '元本', interestLabel: '利息',
      note: '元利均等で最終回に完済する前提です。残価設定は含みません。',
    },
  },
  de: {
    title: 'Autofinanzierungs-Rechner',
    desc: 'Monatsrate, Gesamtzahlung und Zinsen eines Autokredits',
    short: 'Monatsrate · Zinsen gesamt',
    intro: [
      {
        h: 'Die Monatsrate ist die falsche Zahl zum Vergleichen',
        p: 'Eine längere Laufzeit lässt jedes Auto erschwinglich wirken, weil dieselbe Schuld auf mehr Monate verteilt wird. Die Zinssumme geht den umgekehrten Weg. Stellen Sie beim selben Auto 36 gegen 72 Monate: Der Unterschied im Endbetrag ist weit größer als der in der Rate.',
      },
      {
        h: 'Eine Anzahlung senkt die Zinsen doppelt',
        p: 'Was Sie vorab zahlen, leihen Sie nicht — darauf fallen nie Zinsen an. Ein Fünftel Anzahlung senkt nicht nur die Rate um ein Fünftel, es nimmt auch ein Fünftel der Zinsen aus dem gesamten Plan.',
      },
      {
        h: 'Der Kredit ist nicht der Preis des Autos',
        p: 'Versicherung, Steuer, Zulassung, Wartung und Kraftstoff liegen außerhalb dieser Rechnung und übersteigen über fünf Jahre häufig die Zinsen. Eine Rate, die gerade so passt, ist eine Rate ohne Luft für den ganzen Rest.',
      },
    ],
    faq: [
      { q: 'Wie wird die Rate berechnet?', a: 'Mit der üblichen Annuitätenformel: Jede Rate ist gleich hoch, und darin verschiebt sich der Anteil von Zins und Tilgung über die Laufzeit. Anfangs überwiegt der Zins, am Ende die Tilgung.' },
      { q: 'Ist eine lange Laufzeit je sinnvoll?', a: 'Wenn die Alternative wäre, auf ein wirklich benötigtes Auto zu verzichten, oder wenn der Zins sehr niedrig ist. Sinnlos wird sie, sobald der Kredit den Wert des Autos überlebt und Sie mehr schulden, als es einbringt.' },
      { q: 'Sind Schlussraten berücksichtigt?', a: 'Nein. Hier ist der Kredit mit der letzten Rate getilgt. Ein Vertrag mit großer Schlussrate hat eine niedrigere Monatsrate und einen ganz anderen Gesamtbetrag.' },
    ],
    ui: {
      section: 'Kreditbedingungen', price: 'Fahrzeugpreis', down: 'Anzahlung', months: 'Laufzeit (Monate)',
      rate: 'Zinssatz p. a. (%)', calc: 'Berechnen',
      monthly: 'Monatsrate', borrowed: 'Kreditbetrag',
      totalPaid: 'Gesamtzahlung', totalInterest: 'Zinsen gesamt',
      split: 'Tilgung und Zinsen', principalLabel: 'Tilgung', interestLabel: 'Zinsen',
      note: 'Unterstellt einen vollständig getilgten Kredit mit gleichen Raten und ohne Schlussrate.',
    },
  },
  fr: {
    title: 'Calculateur de crédit auto',
    desc: 'Mensualité, total versé et intérêts d’un crédit automobile',
    short: 'Mensualité · intérêts totaux',
    intro: [
      {
        h: 'La mensualité est le mauvais chiffre pour comparer',
        p: 'Allonger la durée rend n’importe quelle voiture abordable, puisque la même dette se répartit sur plus de mois. Le total des intérêts, lui, va dans l’autre sens. Comparez 36 et 72 mois sur la même voiture : l’écart sur ce que vous payez au bout est bien plus grand que l’écart sur la mensualité.',
      },
      {
        h: 'L’apport réduit les intérêts deux fois',
        p: 'L’argent versé d’avance n’est pas emprunté : il ne produit jamais d’intérêts. Mettre un cinquième d’apport ne baisse pas seulement la mensualité d’un cinquième, cela retire aussi un cinquième des intérêts de tout le tableau.',
      },
      {
        h: 'Le crédit n’est pas le coût de la voiture',
        p: 'Assurance, taxes, immatriculation, entretien et carburant restent hors de ce calcul et, sur cinq ans, dépassent souvent les intérêts. Une mensualité tout juste tenable est une mensualité sans marge pour tout le reste.',
      },
    ],
    faq: [
      { q: 'Comment la mensualité est-elle calculée ?', a: 'Par la formule classique d’annuité : toutes les échéances sont identiques et la répartition entre intérêts et capital se déplace au fil du temps. Les premières sont surtout des intérêts, les dernières surtout du capital.' },
      { q: 'Une longue durée a-t-elle parfois du sens ?', a: 'Quand l’alternative est de se passer d’une voiture réellement nécessaire, ou quand le taux est très bas. Elle cesse d’en avoir dès que le crédit survit à la valeur de la voiture et que vous devez plus qu’elle ne vaut.' },
      { q: 'Les valeurs résiduelles sont-elles prises en compte ?', a: 'Non. Ici le crédit est soldé à la dernière échéance. Un contrat avec un gros versement final affiche une mensualité plus basse et un total très différent.' },
    ],
    ui: {
      section: 'Conditions du crédit', price: 'Prix du véhicule', down: 'Apport', months: 'Durée (mois)',
      rate: 'Taux annuel (%)', calc: 'Calculer',
      monthly: 'Mensualité', borrowed: 'Montant emprunté',
      totalPaid: 'Total versé', totalInterest: 'Intérêts totaux',
      split: 'Capital et intérêts', principalLabel: 'Capital', interestLabel: 'Intérêts',
      note: 'Suppose un crédit entièrement amorti à échéances égales, sans valeur résiduelle finale.',
    },
  },
  hi: {
    title: 'कार ऋण कैलकुलेटर',
    desc: 'कार लोन की मासिक किस्त, कुल भुगतान और कुल ब्याज',
    short: 'मासिक किस्त · कुल ब्याज',
    intro: [
      {
        h: 'किस्त देखकर गाड़ी चुनना ग़लत है',
        p: 'अवधि बढ़ा दीजिए और कोई भी गाड़ी सस्ती लगने लगेगी, क्योंकि वही क़र्ज़ ज़्यादा महीनों में बँट जाता है। कुल ब्याज उल्टी दिशा में जाता है। एक ही गाड़ी पर 36 और 72 महीने मिलाइए — आख़िर में चुकाई गई रकम का अंतर, किस्त के अंतर से कहीं बड़ा निकलेगा।',
      },
      {
        h: 'डाउन पेमेंट ब्याज को दो तरह से काटता है',
        p: 'पहले चुकाया गया पैसा उधार लिया ही नहीं जाता, इसलिए उस पर ब्याज कभी नहीं लगता। पाँचवाँ हिस्सा नक़द देने से किस्त पाँचवें हिस्से से घटती ही है, पूरी तालिका से ब्याज का पाँचवाँ हिस्सा भी हट जाता है।',
      },
      {
        h: 'ऋण गाड़ी की लागत नहीं है',
        p: 'बीमा, कर, पंजीकरण, रखरखाव और ईंधन इस गणना के बाहर हैं, और पाँच साल में इनका जोड़ अक्सर ब्याज से बड़ा हो जाता है। जो किस्त बमुश्किल निभती है, वह बाक़ी सब के लिए कोई जगह नहीं छोड़ती।',
      },
    ],
    faq: [
      { q: 'मासिक किस्त कैसे निकलती है?', a: 'सामान्य वार्षिकी सूत्र से: हर किस्त बराबर होती है, और उसके भीतर ब्याज तथा मूलधन का बँटवारा अवधि के साथ खिसकता है। शुरू की किस्तों में ज़्यादातर ब्याज होता है, बाद वालों में ज़्यादातर मूलधन।' },
      { q: 'क्या लंबी अवधि कभी समझदारी होती है?', a: 'जब विकल्प यह हो कि सचमुच ज़रूरी गाड़ी ही न ली जाए, या जब ब्याज दर बहुत कम हो। समझदारी तब ख़त्म होती है जब ऋण गाड़ी की क़ीमत से ज़्यादा जी जाए और आप उसकी क़ीमत से ज़्यादा के देनदार हो जाएँ।' },
      { q: 'क्या अंत में बड़ी किस्त वाला ढाँचा संभलता है?', a: 'नहीं। यहाँ मान लिया गया है कि आख़िरी किस्त पर ऋण पूरा चुक जाता है। अंत में बड़ी एकमुश्त वाले अनुबंध की किस्त कम होती है और कुल रकम बिलकुल अलग।' },
    ],
    ui: {
      section: 'ऋण की शर्तें', price: 'वाहन की क़ीमत', down: 'डाउन पेमेंट', months: 'अवधि (महीने)',
      rate: 'वार्षिक दर (%)', calc: 'गणना करें',
      monthly: 'मासिक किस्त', borrowed: 'उधार ली रकम',
      totalPaid: 'कुल भुगतान', totalInterest: 'कुल ब्याज',
      split: 'मूलधन बनाम ब्याज', principalLabel: 'मूलधन', interestLabel: 'ब्याज',
      note: 'बराबर किस्तों से पूरी तरह चुकने वाला ऋण मानकर, अंत में कोई बड़ी किस्त नहीं।',
    },
  },
  'zh-hans': {
    title: '车贷计算器',
    desc: '车辆贷款的月供、总还款额和总利息',
    short: '月供 · 总利息',
    intro: [
      {
        h: '按月供挑车是挑错了数字',
        p: '把期限拉长，任何车看着都负担得起，因为同样的债务摊到了更多个月上。总利息却往相反方向走。同一辆车比一比 36 期和 72 期，最终付出的差额，远大于月供的差额。',
      },
      {
        h: '首付会双重削减利息',
        p: '提前付掉的钱根本没有借，所以从来不产生利息。付五分之一首付，不只是让月供少五分之一，还从整张还款表里抹掉了五分之一的利息。',
      },
      {
        h: '贷款不等于养车的成本',
        p: '保险、税费、上牌、保养和油费都在这笔账之外，五年下来往往比利息还多。一个刚好能供得起的月供，是一个给其余所有开销都不留余地的月供。',
      },
    ],
    faq: [
      { q: '月供是怎么算出来的？', a: '用标准的等额本息公式：每期还款金额相同，其中利息和本金的比例随期数变化。前期以利息为主，后期以本金为主。' },
      { q: '长期限有合理的时候吗？', a: '当替代方案是干脆买不起一辆真正需要的车，或者利率非常低的时候。当贷款熬过了车的残值、你欠的比车值的还多，它就不合理了。' },
      { q: '支持尾款气球贷吗？', a: '不支持。这里假设最后一期还完全部贷款。带大额尾款的合同月供更低，总额则完全不同。' },
    ],
    ui: {
      section: '贷款条件', price: '车辆价格', down: '首付', months: '期限（月）',
      rate: '年利率 (%)', calc: '计算',
      monthly: '每月还款', borrowed: '贷款金额',
      totalPaid: '总还款额', totalInterest: '总利息',
      split: '本金与利息', principalLabel: '本金', interestLabel: '利息',
      note: '按等额本息、末期还清计算，不含尾款。',
    },
  },
  'zh-hant': {
    title: '車貸計算機',
    desc: '車輛貸款的月付金、總還款額和總利息',
    short: '月付金 · 總利息',
    intro: [
      {
        h: '按月付金挑車是挑錯了數字',
        p: '把期限拉長，任何車看著都負擔得起，因為同樣的債務攤到了更多個月上。總利息卻往相反方向走。同一輛車比一比 36 期和 72 期，最終付出的差額，遠大於月付金的差額。',
      },
      {
        h: '頭期款會雙重削減利息',
        p: '提前付掉的錢根本沒有借，所以從來不產生利息。付五分之一頭期款，不只是讓月付金少五分之一，還從整張還款表裡抹掉了五分之一的利息。',
      },
      {
        h: '貸款不等於養車的成本',
        p: '保險、稅費、掛牌、保養和油費都在這筆帳之外，五年下來往往比利息還多。一個剛好能付得起的月付金，是一個給其餘所有開銷都不留餘地的月付金。',
      },
    ],
    faq: [
      { q: '月付金是怎麼算出來的？', a: '用標準的本息平均攤還公式：每期還款金額相同，其中利息和本金的比例隨期數變化。前期以利息為主，後期以本金為主。' },
      { q: '長期限有合理的時候嗎？', a: '當替代方案是乾脆買不起一輛真正需要的車，或者利率非常低的時候。當貸款熬過了車的殘值、你欠的比車值的還多，它就不合理了。' },
      { q: '支援尾款型貸款嗎？', a: '不支援。這裡假設最後一期還完全部貸款。帶大額尾款的合約月付金更低，總額則完全不同。' },
    ],
    ui: {
      section: '貸款條件', price: '車輛價格', down: '頭期款', months: '期限（月）',
      rate: '年利率 (%)', calc: '計算',
      monthly: '每月還款', borrowed: '貸款金額',
      totalPaid: '總還款額', totalInterest: '總利息',
      split: '本金與利息', principalLabel: '本金', interestLabel: '利息',
      note: '按本息平均攤還、末期還清計算，不含尾款。',
    },
  },
};

export const FUEL_EFFICIENCY: CalcTable = {
  en: {
    title: 'Fuel economy calculator',
    desc: 'Fuel economy from distance and fuel used, shown in every common unit',
    short: 'km/L · L/100 km · mpg',
    intro: [
      {
        h: 'How to measure it honestly',
        p: 'Fill the tank, reset the trip meter, drive, then fill it again. The fuel that goes in the second time is exactly what you used, and the trip meter is the distance. The one thing that must stay constant is how full "full" is — stopping at the first click every time is what keeps the number steady.',
      },
      {
        h: 'Four units, one measurement',
        p: 'Distance per volume (km/L, mpg) rises as the car gets more efficient; volume per distance (L/100 km) falls. They are the same fact written two ways, and the second is better at showing what a change actually saves: going from 10 to 9 L/100 km saves far more fuel than going from 5 to 4.',
      },
      {
        h: 'The dashboard reads optimistic',
        p: 'On-board averages tend to sit a few per cent above what a tank-to-tank measurement shows. Yours measured by hand is more trustworthy, and measuring the same way repeatedly is more useful still — a single tank tells you about that week\'s traffic, not about the car.',
      },
    ],
    faq: [
      { q: 'US or imperial gallons?', a: 'Both are shown. A US gallon is 3.785 litres and an imperial one is 4.546, so the same car reads about 20% higher in imperial mpg. Quoting mpg without saying which is a common source of confusion.' },
      { q: 'Why is my figure worse than the official rating?', a: 'Official ratings come from a standardised test cycle, not from your commute. Short trips, cold starts, hills, roof racks, air conditioning and hard acceleration all cost fuel that the test does not see.' },
      { q: 'How far can I go on what is left?', a: 'Multiply your measured economy by the fuel remaining — but leave a margin. The last portion of a tank is the least reliably measured part, and economy drops in exactly the conditions where running low is most inconvenient.' },
    ],
    ui: {
      section: 'Your trip', distance: 'Distance', fuel: 'Fuel used', units: 'Units',
      metric: 'km and litres', us: 'miles and US gallons', calc: 'Calculate',
      result: 'Fuel economy', mpgUs: 'mpg (US)', mpgUk: 'mpg (imperial)',
      range: 'Range on', remaining: 'Fuel remaining', rangeResult: 'Estimated range',
      note: 'A tank-to-tank measurement is more reliable than the dashboard average.',
    },
  },
  es: {
    title: 'Calculadora de consumo de combustible',
    desc: 'Consumo a partir de la distancia y el combustible usado, en todas las unidades habituales',
    short: 'L/100 km · km/L · mpg',
    intro: [
      {
        h: 'Cómo medirlo con honestidad',
        p: 'Llena el depósito, pon a cero el cuentakilómetros parcial, conduce y vuelve a llenar. El combustible que entra la segunda vez es exactamente el que has gastado, y el parcial es la distancia. Lo único que debe mantenerse constante es qué se entiende por «lleno»: parar siempre al primer corte del surtidor es lo que da estabilidad a la cifra.',
      },
      {
        h: 'Cuatro unidades, una sola medida',
        p: 'La distancia por volumen (km/L, mpg) sube cuando el coche consume menos; el volumen por distancia (L/100 km) baja. Son el mismo dato escrito de dos maneras, y la segunda muestra mejor lo que ahorra un cambio: pasar de 10 a 9 L/100 km ahorra mucho más combustible que pasar de 5 a 4.',
      },
      {
        h: 'El ordenador de a bordo es optimista',
        p: 'Las medias del coche suelen quedar unos puntos por encima de lo que da una medición depósito a depósito. La tuya hecha a mano es más fiable, y medir siempre igual lo es todavía más: un solo depósito habla del tráfico de esa semana, no del coche.',
      },
    ],
    faq: [
      { q: '¿Galones americanos o imperiales?', a: 'Se muestran los dos. Un galón americano son 3,785 litros y uno imperial 4,546, así que el mismo coche da un mpg imperial un 20% mayor. Citar mpg sin decir cuál es fuente habitual de confusión.' },
      { q: '¿Por qué consumo más que la cifra oficial?', a: 'Las cifras oficiales salen de un ciclo de prueba normalizado, no de tu trayecto. Recorridos cortos, arranques en frío, pendientes, bacas, aire acondicionado y acelerones cuestan combustible que la prueba no ve.' },
      { q: '¿Cuánto puedo recorrer con lo que queda?', a: 'Multiplica tu consumo medido por el combustible restante, pero deja margen. La última parte del depósito es la peor medida, y el consumo empeora justo en las condiciones en que quedarse corto es más incómodo.' },
    ],
    ui: {
      section: 'Tu trayecto', distance: 'Distancia', fuel: 'Combustible usado', units: 'Unidades',
      metric: 'km y litros', us: 'millas y galones EE. UU.', calc: 'Calcular',
      result: 'Consumo', mpgUs: 'mpg (EE. UU.)', mpgUk: 'mpg (imperial)',
      range: 'Autonomía con', remaining: 'Combustible restante', rangeResult: 'Autonomía estimada',
      note: 'Una medición depósito a depósito es más fiable que la media del ordenador de a bordo.',
    },
  },
  'pt-br': {
    title: 'Calculadora de consumo de combustível',
    desc: 'Consumo a partir da distância e do combustível gasto, em todas as unidades usuais',
    short: 'km/L · L/100 km · mpg',
    intro: [
      {
        h: 'Como medir com honestidade',
        p: 'Encha o tanque, zere o hodômetro parcial, rode e encha de novo. O combustível que entra na segunda vez é exatamente o que você gastou, e o parcial é a distância. A única coisa que precisa ficar constante é o que conta como "cheio": parar sempre no primeiro corte da bomba é o que mantém o número estável.',
      },
      {
        h: 'Quatro unidades, uma só medida',
        p: 'Distância por volume (km/L, mpg) sobe conforme o carro fica mais econômico; volume por distância (L/100 km) desce. É o mesmo fato escrito de dois jeitos, e o segundo mostra melhor o que uma mudança economiza: sair de 10 para 9 L/100 km economiza muito mais que sair de 5 para 4.',
      },
      {
        h: 'O computador de bordo é otimista',
        p: 'As médias do carro costumam ficar alguns por cento acima de uma medição tanque a tanque. A sua, feita à mão, é mais confiável — e medir sempre do mesmo jeito, mais ainda: um tanque isolado fala do trânsito daquela semana, não do carro.',
      },
    ],
    faq: [
      { q: 'Galões americanos ou imperiais?', a: 'Os dois aparecem. Um galão americano tem 3,785 litros e o imperial 4,546, então o mesmo carro marca uns 20% a mais em mpg imperial. Citar mpg sem dizer qual é fonte comum de confusão.' },
      { q: 'Por que meu consumo é pior que o número oficial?', a: 'Números oficiais vêm de um ciclo de teste padronizado, não do seu trajeto. Percursos curtos, partida a frio, subidas, bagageiro, ar-condicionado e aceleração forte custam combustível que o teste não enxerga.' },
      { q: 'Quanto ainda dá para rodar com o que sobrou?', a: 'Multiplique o consumo medido pelo combustível restante — mas deixe margem. A última parte do tanque é a pior medida, e o consumo piora justamente nas condições em que ficar sem é mais inconveniente.' },
    ],
    ui: {
      section: 'Seu percurso', distance: 'Distância', fuel: 'Combustível gasto', units: 'Unidades',
      metric: 'km e litros', us: 'milhas e galões americanos', calc: 'Calcular',
      result: 'Consumo', mpgUs: 'mpg (EUA)', mpgUk: 'mpg (imperial)',
      range: 'Autonomia com', remaining: 'Combustível restante', rangeResult: 'Autonomia estimada',
      note: 'Uma medição tanque a tanque é mais confiável que a média do computador de bordo.',
    },
  },
  ja: {
    title: '燃費の計算機',
    desc: '走行距離と使った燃料から燃費を出し、主要な単位すべてで表示します',
    short: 'km/L・L/100km・mpg',
    intro: [
      {
        h: '正直に測る手順',
        p: '満タンにする、トリップメーターをリセットする、走る、また満タンにする。二度目に入った量がそのまま使った量で、トリップメーターが距離です。ひとつだけ揃えるべきは「満タン」の基準で、毎回最初の自動停止で止めることが数字を安定させます。',
      },
      {
        h: '単位は四つ、測っているのはひとつ',
        p: '容量あたりの距離(km/L, mpg)は燃費がよくなるほど増え、距離あたりの容量(L/100km)は減ります。同じ事実の二通りの書き方ですが、節約の効き目は後者のほうがよく見えます。10から9 L/100kmへの改善は、5から4への改善よりずっと多くの燃料を節約します。',
      },
      {
        h: '車載の平均燃費は甘めに出ます',
        p: '車の平均燃費表示は、満タン法で測った値より数%高く出る傾向があります。自分で測った値のほうが信用でき、同じ方法で測り続けることはさらに役立ちます。一回ぶんの数字はその週の道路事情を語るだけで、車のことは語りません。',
      },
    ],
    faq: [
      { q: '米ガロンと英ガロンのどちらですか。', a: '両方出しています。米ガロンは3.785L、英ガロンは4.546Lなので、同じ車でも英mpgのほうが約20%高く出ます。どちらか言わずにmpgを挙げるのは、よくある混乱のもとです。' },
      { q: 'カタログ燃費より悪いのはなぜですか。', a: 'カタログの数字は決められた試験サイクルで測ったもので、あなたの通勤路ではありません。短距離、冷間始動、坂、ルーフキャリア、エアコン、強い加速——どれも試験には現れない燃料を使います。' },
      { q: '残りでどこまで走れますか。', a: '測った燃費に残量を掛けてください。ただし余裕を持たせて。タンクの最後のほうは表示がいちばん当てにならず、しかも燃費が落ちる状況ほど、ガス欠は困る状況です。' },
    ],
    ui: {
      section: '走行の記録', distance: '走行距離', fuel: '使った燃料', units: '単位',
      metric: 'kmとリットル', us: 'マイルと米ガロン', calc: '計算する',
      result: '燃費', mpgUs: 'mpg (米)', mpgUk: 'mpg (英)',
      range: '走れる距離', remaining: '残りの燃料', rangeResult: '走行可能距離の目安',
      note: '満タン法で測った値のほうが、車載の平均表示より信用できます。',
    },
  },
  de: {
    title: 'Verbrauchsrechner',
    desc: 'Kraftstoffverbrauch aus Strecke und verbrauchter Menge, in allen gängigen Einheiten',
    short: 'L/100 km · km/l · mpg',
    intro: [
      {
        h: 'Ehrlich messen',
        p: 'Volltanken, Tageskilometerzähler auf null, fahren, wieder volltanken. Was beim zweiten Mal hineingeht, ist genau der Verbrauch, und der Tageszähler ist die Strecke. Konstant bleiben muss nur eines: was "voll" heißt — immer beim ersten Abschalten der Zapfpistole aufzuhören hält die Zahl stabil.',
      },
      {
        h: 'Vier Einheiten, eine Messung',
        p: 'Strecke je Menge (km/l, mpg) steigt, wenn das Auto sparsamer wird; Menge je Strecke (L/100 km) fällt. Dieselbe Tatsache in zwei Schreibweisen — die zweite zeigt besser, was eine Verbesserung wirklich einspart: von 10 auf 9 L/100 km spart weit mehr Kraftstoff als von 5 auf 4.',
      },
      {
        h: 'Der Bordcomputer schönt',
        p: 'Die Durchschnittsanzeige liegt meist einige Prozent über dem, was eine Messung von Tankfüllung zu Tankfüllung ergibt. Von Hand gemessen ist verlässlicher, und immer gleich zu messen noch mehr: Eine einzelne Tankfüllung erzählt vom Verkehr dieser Woche, nicht vom Auto.',
      },
    ],
    faq: [
      { q: 'US-Gallonen oder britische?', a: 'Beide werden angezeigt. Eine US-Gallone sind 3,785 Liter, eine britische 4,546 — dasselbe Auto steht in britischen mpg rund 20% besser da. mpg zu nennen, ohne zu sagen welche, sorgt regelmäßig für Verwirrung.' },
      { q: 'Warum liege ich über der Werksangabe?', a: 'Werksangaben stammen aus einem genormten Prüfzyklus, nicht aus Ihrem Arbeitsweg. Kurzstrecke, Kaltstart, Steigungen, Dachträger, Klimaanlage und kräftiges Beschleunigen kosten Kraftstoff, den der Test nicht sieht.' },
      { q: 'Wie weit komme ich mit dem Rest?', a: 'Gemessenen Verbrauch mit der Restmenge verrechnen — aber Reserve lassen. Der letzte Teil des Tanks ist am unzuverlässigsten erfasst, und der Verbrauch steigt genau in den Situationen, in denen Liegenbleiben am wenigsten passt.' },
    ],
    ui: {
      section: 'Ihre Fahrt', distance: 'Strecke', fuel: 'Verbrauchte Menge', units: 'Einheiten',
      metric: 'km und Liter', us: 'Meilen und US-Gallonen', calc: 'Berechnen',
      result: 'Verbrauch', mpgUs: 'mpg (US)', mpgUk: 'mpg (britisch)',
      range: 'Reichweite mit', remaining: 'Restmenge', rangeResult: 'Geschätzte Reichweite',
      note: 'Von Tankfüllung zu Tankfüllung gemessen ist verlässlicher als die Bordanzeige.',
    },
  },
  fr: {
    title: 'Calculateur de consommation',
    desc: 'Consommation à partir de la distance et du carburant utilisé, dans toutes les unités courantes',
    short: 'L/100 km · km/L · mpg',
    intro: [
      {
        h: 'Mesurer honnêtement',
        p: 'Faire le plein, remettre le compteur journalier à zéro, rouler, refaire le plein. Ce qui entre la seconde fois est exactement ce que vous avez consommé, et le journalier donne la distance. La seule chose à garder constante, c’est la définition de « plein » : s’arrêter au premier déclic à chaque fois est ce qui stabilise le chiffre.',
      },
      {
        h: 'Quatre unités, une seule mesure',
        p: 'La distance par volume (km/L, mpg) augmente quand la voiture consomme moins ; le volume par distance (L/100 km) diminue. C’est le même fait écrit de deux façons, et la seconde montre mieux ce qu’une amélioration économise : passer de 10 à 9 L/100 km économise bien plus que passer de 5 à 4.',
      },
      {
        h: 'L’ordinateur de bord est optimiste',
        p: 'Les moyennes affichées se situent en général quelques pour cent au-dessus d’une mesure de plein à plein. Votre mesure manuelle est plus fiable, et mesurer toujours de la même manière l’est davantage encore : un seul plein parle du trafic de la semaine, pas de la voiture.',
      },
    ],
    faq: [
      { q: 'Gallons américains ou impériaux ?', a: 'Les deux sont affichés. Un gallon américain vaut 3,785 litres, un impérial 4,546 : la même voiture affiche donc environ 20 % de mieux en mpg impérial. Citer un mpg sans préciser lequel est une source classique de confusion.' },
      { q: 'Pourquoi ma consommation dépasse-t-elle la valeur officielle ?', a: 'Les valeurs officielles proviennent d’un cycle d’essai normalisé, pas de votre trajet. Petits parcours, démarrages à froid, côtes, barres de toit, climatisation et accélérations franches consomment un carburant que l’essai ne voit pas.' },
      { q: 'Jusqu’où puis-je aller avec ce qui reste ?', a: 'Multipliez la consommation mesurée par le carburant restant, en gardant une marge. La fin du réservoir est la partie la moins bien mesurée, et la consommation grimpe précisément dans les situations où la panne sèche tombe le plus mal.' },
    ],
    ui: {
      section: 'Votre trajet', distance: 'Distance', fuel: 'Carburant utilisé', units: 'Unités',
      metric: 'km et litres', us: 'miles et gallons US', calc: 'Calculer',
      result: 'Consommation', mpgUs: 'mpg (US)', mpgUk: 'mpg (impérial)',
      range: 'Autonomie avec', remaining: 'Carburant restant', rangeResult: 'Autonomie estimée',
      note: 'Une mesure de plein à plein est plus fiable que la moyenne de l’ordinateur de bord.',
    },
  },
  hi: {
    title: 'माइलेज कैलकुलेटर',
    desc: 'दूरी और ख़र्च हुए ईंधन से माइलेज, हर प्रचलित इकाई में',
    short: 'किमी/लीटर · लीटर/100 किमी · mpg',
    intro: [
      {
        h: 'ईमानदारी से नापने का तरीक़ा',
        p: 'टंकी फ़ुल कराइए, ट्रिप मीटर शून्य कीजिए, चलाइए, फिर फ़ुल कराइए। दूसरी बार जितना ईंधन गया, ठीक उतना ही ख़र्च हुआ था, और ट्रिप मीटर दूरी बताता है। सिर्फ़ एक चीज़ हर बार एक जैसी रखनी है — "फ़ुल" का मतलब। हर बार पहली बार नोज़ल बंद होने पर रुक जाना ही आंकड़े को स्थिर रखता है।',
      },
      {
        h: 'चार इकाइयाँ, नाप एक ही',
        p: 'प्रति मात्रा दूरी (किमी/लीटर, mpg) गाड़ी के किफ़ायती होने पर बढ़ती है; प्रति दूरी मात्रा (लीटर/100 किमी) घटती है। एक ही बात दो तरह से लिखी गई है, पर बचत दूसरी में बेहतर दिखती है: 10 से 9 लीटर/100 किमी पर आना, 5 से 4 पर आने से कहीं ज़्यादा ईंधन बचाता है।',
      },
      {
        h: 'डैशबोर्ड ज़रा उदार रहता है',
        p: 'गाड़ी का औसत माइलेज आमतौर पर टंकी-से-टंकी नाप से कुछ प्रतिशत ऊपर दिखता है। ख़ुद हाथ से नापा आंकड़ा ज़्यादा भरोसेमंद है, और हर बार एक ही तरीक़े से नापना उससे भी ज़्यादा काम का। एक टंकी का आंकड़ा उस हफ़्ते के ट्रैफ़िक के बारे में बताता है, गाड़ी के बारे में नहीं।',
      },
    ],
    faq: [
      { q: 'अमेरिकी गैलन या इंपीरियल?', a: 'दोनों दिखाए गए हैं। अमेरिकी गैलन 3.785 लीटर का है और इंपीरियल 4.546 का, इसलिए वही गाड़ी इंपीरियल mpg में क़रीब 20% बेहतर दिखती है। कौन-सा, बताए बिना mpg कहना उलझन की आम वजह है।' },
      { q: 'मेरा माइलेज कंपनी के आंकड़े से कम क्यों है?', a: 'कंपनी के आंकड़े एक तय परीक्षण चक्र से आते हैं, आपके रोज़ के रास्ते से नहीं। छोटी दूरियाँ, ठंडी शुरुआत, चढ़ाई, छत का कैरियर, एसी और तेज़ त्वरण — ये सब ऐसा ईंधन ख़र्च करते हैं जो परीक्षण को दिखता ही नहीं।' },
      { q: 'बचे हुए ईंधन में कितना चल सकता हूँ?', a: 'नापे हुए माइलेज को बचे ईंधन से गुणा कीजिए — पर गुंजाइश छोड़िए। टंकी का आख़िरी हिस्सा सबसे कम भरोसे से नापा जाता है, और माइलेज ठीक उन्हीं हालात में गिरता है जब ईंधन ख़त्म होना सबसे असुविधाजनक होता है।' },
    ],
    ui: {
      section: 'आपकी यात्रा', distance: 'दूरी', fuel: 'ख़र्च हुआ ईंधन', units: 'इकाइयाँ',
      metric: 'किमी और लीटर', us: 'मील और अमेरिकी गैलन', calc: 'गणना करें',
      result: 'माइलेज', mpgUs: 'mpg (अमेरिकी)', mpgUk: 'mpg (इंपीरियल)',
      range: 'कितना चलेगा', remaining: 'बचा ईंधन', rangeResult: 'अनुमानित दूरी',
      note: 'टंकी-से-टंकी नाप, डैशबोर्ड के औसत से ज़्यादा भरोसेमंद है।',
    },
  },
  'zh-hans': {
    title: '油耗计算器',
    desc: '按行驶里程和耗油量算油耗，并给出各种常见单位',
    short: '升/百公里 · 公里/升 · mpg',
    intro: [
      {
        h: '怎样测才诚实',
        p: '加满、把小计里程表清零、开一段、再加满。第二次加进去的油量正好就是你用掉的，而小计里程就是距离。唯一需要每次保持一致的是"加满"的标准——每次都停在油枪第一次跳停，数字才稳得住。',
      },
      {
        h: '四种单位，一件事',
        p: '每单位油量的里程（公里/升、mpg）随着车变省而上升；每单位距离的油量（升/百公里）则下降。同一个事实的两种写法，而后者更能显出改进省下了多少：从 10 降到 9 升/百公里，比从 5 降到 4 省得多得多。',
      },
      {
        h: '仪表盘偏乐观',
        p: '车载平均油耗通常比"加满到加满"的实测好上几个百分点。自己动手测的更可信，而每次都用同样的方法测就更有价值——单独一箱油说的是那一周的路况，不是这辆车。',
      },
    ],
    faq: [
      { q: '美制加仑还是英制加仑？', a: '两个都给出了。美制加仑是 3.785 升，英制是 4.546 升，所以同一辆车用英制 mpg 会高出大约 20%。说 mpg 却不说是哪一种，是常见的混乱来源。' },
      { q: '为什么我的油耗比官方数据高？', a: '官方数据来自标准化的测试循环，不是你的通勤路。短途、冷启动、坡道、车顶行李架、空调和大脚油门，消耗的都是测试看不见的油。' },
      { q: '剩下的油还能跑多远？', a: '把实测油耗乘以剩余油量——但要留余量。油箱最后那一截的测量最不可靠，而且油耗恰恰在最不方便抛锚的情况下变差。' },
    ],
    ui: {
      section: '这段行程', distance: '行驶距离', fuel: '耗油量', units: '单位',
      metric: '公里和升', us: '英里和美制加仑', calc: '计算',
      result: '油耗', mpgUs: 'mpg（美制）', mpgUk: 'mpg（英制）',
      range: '可行驶里程', remaining: '剩余油量', rangeResult: '估计续航',
      note: '加满到加满的实测，比仪表盘的平均值更可信。',
    },
  },
  'zh-hant': {
    title: '油耗計算機',
    desc: '按行駛里程和耗油量算油耗，並給出各種常見單位',
    short: '公升/百公里 · 公里/公升 · mpg',
    intro: [
      {
        h: '怎樣測才誠實',
        p: '加滿、把小計里程表歸零、開一段、再加滿。第二次加進去的油量正好就是你用掉的，而小計里程就是距離。唯一需要每次保持一致的是「加滿」的標準——每次都停在油槍第一次跳停，數字才穩得住。',
      },
      {
        h: '四種單位，一件事',
        p: '每單位油量的里程（公里/公升、mpg）隨著車變省而上升；每單位距離的油量（公升/百公里）則下降。同一個事實的兩種寫法，而後者更能顯出改進省下了多少：從 10 降到 9 公升/百公里，比從 5 降到 4 省得多得多。',
      },
      {
        h: '儀表板偏樂觀',
        p: '車載平均油耗通常比「加滿到加滿」的實測好上幾個百分點。自己動手測的更可信，而每次都用同樣的方法測就更有價值——單獨一箱油說的是那一週的路況，不是這輛車。',
      },
    ],
    faq: [
      { q: '美制加侖還是英制加侖？', a: '兩個都給出了。美制加侖是 3.785 公升，英制是 4.546 公升，所以同一輛車用英制 mpg 會高出大約 20%。說 mpg 卻不說是哪一種，是常見的混亂來源。' },
      { q: '為什麼我的油耗比官方數據高？', a: '官方數據來自標準化的測試循環，不是你的通勤路。短途、冷啟動、坡道、車頂行李架、空調和大腳油門，消耗的都是測試看不見的油。' },
      { q: '剩下的油還能跑多遠？', a: '把實測油耗乘以剩餘油量——但要留餘量。油箱最後那一截的測量最不可靠，而且油耗恰恰在最不方便拋錨的情況下變差。' },
    ],
    ui: {
      section: '這段行程', distance: '行駛距離', fuel: '耗油量', units: '單位',
      metric: '公里和公升', us: '英里和美制加侖', calc: '計算',
      result: '油耗', mpgUs: 'mpg（美制）', mpgUk: 'mpg（英制）',
      range: '可行駛里程', remaining: '剩餘油量', rangeResult: '估計續航',
      note: '加滿到加滿的實測，比儀表板的平均值更可信。',
    },
  },
};
