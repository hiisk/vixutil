import type { CalcTable } from './types.ts';

/**
 * 주유비와 전기차 충전비.
 *
 * 한국어판은 유가(리터당 1,650원)와 충전요금(kWh당 100~450원)을 프리셋으로
 * 박아 두었다. 둘 다 한국 가격이라 값을 지우고 입력으로만 받는다. 통화도
 * 붙이지 않는다 — 넣은 단가의 단위가 그대로 결과의 단위다.
 */
export const GAS_COST: CalcTable = {
  en: {
    title: 'Fuel cost calculator',
    desc: 'What a trip costs in fuel, from distance, consumption and the pump price',
    short: 'Fuel cost for a trip',
    intro: [
      {
        h: 'Distance ÷ economy × price',
        p: 'Four hundred kilometres in a car doing 12 km/L needs 33.3 litres; multiply by the price per litre and you have the cost. For a return journey either double the distance or turn on the return option — the two are the same thing.',
      },
      {
        h: 'Use your measured economy, not the brochure',
        p: 'Official figures come from a standardised test and read better than real driving. If you have measured your own consumption over a few tanks, that number will give a cost far closer to what you actually spend.',
      },
      {
        h: 'Fuel is not the whole cost of driving',
        p: 'Tolls, parking and the wear you are quietly spending on tyres and servicing all sit outside this. For comparing a drive against a train fare, the fuel figure alone understates the car.',
      },
    ],
    faq: [
      { q: 'Which currency does this use?', a: 'Whichever you type in. The price you enter per litre sets the unit, and the answer comes back in the same one — nothing is assumed about where you are.' },
      { q: 'Why does the cost change so much with speed?', a: 'Air resistance grows with the square of speed, so the power needed to push through it grows with the cube. Motorway cruising at 120 km/h can use a quarter more fuel than at 100.' },
      { q: 'Does air conditioning matter?', a: 'A few per cent in normal use, more in stop-start traffic. Open windows at speed cost about as much through drag, so the choice between them matters less than it is often made to seem.' },
    ],
    ui: {
      section: 'Your trip', distance: 'Distance (km)', economy: 'Fuel economy (km/L)',
      price: 'Price per litre', roundTrip: 'Return journey', calc: 'Calculate',
      cost: 'Fuel cost', fuelNeeded: 'Fuel needed', perKm: 'Cost per km', litres: 'L',
      note: 'The currency is whatever you enter. Tolls, parking and wear are not included.',
    },
  },
  es: {
    title: 'Calculadora de coste de combustible',
    desc: 'Lo que cuesta un viaje en combustible, según distancia, consumo y precio del surtidor',
    short: 'Coste de combustible de un viaje',
    intro: [
      {
        h: 'Distancia ÷ consumo × precio',
        p: 'Cuatrocientos kilómetros en un coche que hace 12 km/L necesitan 33,3 litros; multiplica por el precio del litro y tienes el coste. Para ida y vuelta, dobla la distancia o activa la opción: es lo mismo.',
      },
      {
        h: 'Usa tu consumo medido, no el del folleto',
        p: 'Las cifras oficiales salen de un ensayo normalizado y quedan mejor que la conducción real. Si has medido tu consumo durante unos depósitos, ese número dará un coste mucho más cercano a lo que gastas de verdad.',
      },
      {
        h: 'El combustible no es todo el coste de conducir',
        p: 'Peajes, aparcamiento y el desgaste que vas pagando en neumáticos y mantenimiento quedan fuera. Para comparar el coche con un billete de tren, la cifra de combustible sola deja al coche demasiado barato.',
      },
    ],
    faq: [
      { q: '¿Qué moneda usa?', a: 'La que tú escribas. El precio por litro que introduces fija la unidad y la respuesta sale en la misma: no se supone nada sobre dónde estás.' },
      { q: '¿Por qué cambia tanto el coste con la velocidad?', a: 'La resistencia del aire crece con el cuadrado de la velocidad, así que la potencia necesaria para vencerla crece con el cubo. Ir a 120 km/h en autopista puede gastar un cuarto más que ir a 100.' },
      { q: '¿Importa el aire acondicionado?', a: 'Unos pocos puntos porcentuales en uso normal, más en tráfico de parar y arrancar. Llevar las ventanillas bajadas a velocidad cuesta más o menos lo mismo por resistencia, así que la elección importa menos de lo que suele decirse.' },
    ],
    ui: {
      section: 'Tu viaje', distance: 'Distancia (km)', economy: 'Consumo (km/L)',
      price: 'Precio por litro', roundTrip: 'Ida y vuelta', calc: 'Calcular',
      cost: 'Coste de combustible', fuelNeeded: 'Combustible necesario', perKm: 'Coste por km', litres: 'L',
      note: 'La moneda es la que introduzcas. No incluye peajes, aparcamiento ni desgaste.',
    },
  },
  'pt-br': {
    title: 'Calculadora de custo de combustível',
    desc: 'Quanto uma viagem custa em combustível, pela distância, consumo e preço na bomba',
    short: 'Custo de combustível da viagem',
    intro: [
      {
        h: 'Distância ÷ consumo × preço',
        p: 'Quatrocentos quilômetros num carro que faz 12 km/L pedem 33,3 litros; multiplique pelo preço do litro e você tem o custo. Para ida e volta, dobre a distância ou ligue a opção — dá no mesmo.',
      },
      {
        h: 'Use o consumo que você mediu, não o do catálogo',
        p: 'Números oficiais vêm de um ensaio padronizado e ficam melhores que a direção real. Se você mediu seu consumo ao longo de alguns tanques, esse número dá um custo muito mais próximo do que você realmente gasta.',
      },
      {
        h: 'Combustível não é o custo todo de dirigir',
        p: 'Pedágio, estacionamento e o desgaste que você vai pagando em pneus e manutenção ficam de fora. Para comparar o carro com uma passagem de ônibus ou trem, só o combustível deixa o carro barato demais.',
      },
    ],
    faq: [
      { q: 'Que moeda isso usa?', a: 'A que você digitar. O preço por litro que você informa define a unidade, e a resposta volta na mesma — nada se presume sobre onde você está.' },
      { q: 'Por que o custo muda tanto com a velocidade?', a: 'A resistência do ar cresce com o quadrado da velocidade, então a potência para vencê-la cresce com o cubo. Cruzar a 120 km/h pode gastar um quarto a mais do que a 100.' },
      { q: 'Ar-condicionado pesa?', a: 'Alguns por cento no uso normal, mais no trânsito para-e-anda. Janelas abertas em velocidade custam mais ou menos o mesmo por arrasto, então a escolha entre os dois importa menos do que costumam dizer.' },
    ],
    ui: {
      section: 'Sua viagem', distance: 'Distância (km)', economy: 'Consumo (km/L)',
      price: 'Preço por litro', roundTrip: 'Ida e volta', calc: 'Calcular',
      cost: 'Custo de combustível', fuelNeeded: 'Combustível necessário', perKm: 'Custo por km', litres: 'L',
      note: 'A moeda é a que você digitar. Não inclui pedágio, estacionamento nem desgaste.',
    },
  },
  ja: {
    title: 'ガソリン代の計算機',
    desc: '距離・燃費・単価から、その道のりにかかる燃料代を出します',
    short: '道のりにかかる燃料代',
    intro: [
      {
        h: '距離 ÷ 燃費 × 単価',
        p: '燃費12km/Lの車で400km走るなら33.3L必要で、これにリットル単価を掛ければ燃料代です。往復なら距離を倍にするか往復のスイッチを入れてください。同じことです。',
      },
      {
        h: 'カタログ燃費ではなく、自分で測った燃費を',
        p: 'カタログの数字は決められた試験で測ったもので、実際の走行よりよく出ます。何回かの満タン法で自分の燃費を測ってあるなら、その値のほうが実際の出費にずっと近い答えを返します。',
      },
      {
        h: '燃料代は車の費用の全部ではありません',
        p: '有料道路、駐車場、そしてタイヤや整備として静かに減っていくぶんは、この計算の外です。鉄道の運賃と比べるとき、燃料代だけでは車を安く見積もることになります。',
      },
    ],
    faq: [
      { q: '通貨は何ですか。', a: '入力した通貨です。リットル単価に入れた数字が単位を決め、答えも同じ単位で返ります。場所については何も仮定していません。' },
      { q: '速度で燃料代がこんなに変わるのはなぜですか。', a: '空気抵抗は速度の2乗で増えるので、それを押し切る出力は3乗で増えます。高速道路を120km/hで巡航すると、100km/hより4分の1ほど多く使うこともあります。' },
      { q: 'エアコンは効きますか。', a: 'ふつうの使い方で数%、渋滞ではもう少しです。高速で窓を開けても空気抵抗で同じくらい食うので、どちらを選ぶかは言われるほど大きな差ではありません。' },
    ],
    ui: {
      section: '走行の条件', distance: '距離 (km)', economy: '燃費 (km/L)',
      price: '1リットルあたりの単価', roundTrip: '往復', calc: '計算する',
      cost: '燃料代', fuelNeeded: '必要な燃料', perKm: '1kmあたり', litres: 'L',
      note: '通貨は入力したものです。有料道路・駐車場・消耗は含みません。',
    },
  },
  de: {
    title: 'Spritkosten-Rechner',
    desc: 'Was eine Fahrt an Kraftstoff kostet — aus Strecke, Verbrauch und Preis an der Säule',
    short: 'Spritkosten einer Fahrt',
    intro: [
      {
        h: 'Strecke ÷ Verbrauch × Preis',
        p: 'Vierhundert Kilometer in einem Auto mit 12 km/l brauchen 33,3 Liter; mal Literpreis ergibt die Kosten. Für Hin- und Rückweg die Strecke verdoppeln oder den Schalter umlegen — das ist dasselbe.',
      },
      {
        h: 'Den selbst gemessenen Verbrauch nehmen, nicht den Prospektwert',
        p: 'Werksangaben stammen aus einem genormten Test und fallen besser aus als echtes Fahren. Wer seinen Verbrauch über einige Tankfüllungen gemessen hat, bekommt mit dieser Zahl Kosten, die den tatsächlichen Ausgaben viel näher kommen.',
      },
      {
        h: 'Kraftstoff ist nicht der ganze Preis des Fahrens',
        p: 'Maut, Parken und der Verschleiß, den Sie still an Reifen und Wartung bezahlen, stehen außerhalb. Beim Vergleich mit einem Bahnticket lässt die reine Spritrechnung das Auto zu billig aussehen.',
      },
    ],
    faq: [
      { q: 'Welche Währung wird verwendet?', a: 'Die, die Sie eingeben. Der Literpreis legt die Einheit fest, und die Antwort kommt in derselben zurück — über Ihren Aufenthaltsort wird nichts angenommen.' },
      { q: 'Warum ändern sich die Kosten so stark mit dem Tempo?', a: 'Der Luftwiderstand wächst mit dem Quadrat der Geschwindigkeit, die nötige Leistung also mit der dritten Potenz. Bei 120 km/h kann der Verbrauch ein Viertel über dem bei 100 liegen.' },
      { q: 'Fällt die Klimaanlage ins Gewicht?', a: 'Im normalen Betrieb einige Prozent, im Stop-and-go mehr. Offene Fenster bei Tempo kosten über den Luftwiderstand ungefähr genauso viel — die Wahl zwischen beidem ist weniger entscheidend, als oft behauptet.' },
    ],
    ui: {
      section: 'Ihre Fahrt', distance: 'Strecke (km)', economy: 'Verbrauch (km/l)',
      price: 'Preis je Liter', roundTrip: 'Hin und zurück', calc: 'Berechnen',
      cost: 'Spritkosten', fuelNeeded: 'Benötigter Kraftstoff', perKm: 'Kosten je km', litres: 'L',
      note: 'Die Währung ist die Ihrer Eingabe. Maut, Parken und Verschleiß sind nicht enthalten.',
    },
  },
  fr: {
    title: 'Calculateur de coût de carburant',
    desc: 'Ce qu’un trajet coûte en carburant, à partir de la distance, de la consommation et du prix à la pompe',
    short: 'Coût en carburant d’un trajet',
    intro: [
      {
        h: 'Distance ÷ consommation × prix',
        p: 'Quatre cents kilomètres avec une voiture à 12 km/L demandent 33,3 litres ; multipliez par le prix du litre et vous avez le coût. Pour un aller-retour, doublez la distance ou activez l’option — c’est la même chose.',
      },
      {
        h: 'Utilisez votre consommation mesurée, pas celle du catalogue',
        p: 'Les chiffres officiels viennent d’un essai normalisé et sortent meilleurs que la conduite réelle. Si vous avez mesuré votre consommation sur quelques pleins, ce nombre donnera un coût bien plus proche de ce que vous dépensez.',
      },
      {
        h: 'Le carburant n’est pas tout le coût de la voiture',
        p: 'Péages, stationnement et l’usure que vous payez discrètement en pneus et en entretien restent hors du calcul. Pour comparer la voiture à un billet de train, le seul carburant fait paraître la voiture trop bon marché.',
      },
    ],
    faq: [
      { q: 'Quelle devise est utilisée ?', a: 'Celle que vous saisissez. Le prix au litre fixe l’unité et le résultat revient dans la même : rien n’est supposé de l’endroit où vous êtes.' },
      { q: 'Pourquoi le coût varie-t-il autant avec la vitesse ?', a: 'La résistance de l’air croît comme le carré de la vitesse, donc la puissance pour la vaincre comme le cube. Rouler à 120 km/h peut consommer un quart de plus qu’à 100.' },
      { q: 'La climatisation compte-t-elle ?', a: 'Quelques pour cent en usage normal, davantage dans les embouteillages. Les vitres ouvertes à vitesse coûtent à peu près autant par traînée, si bien que le choix entre les deux pèse moins qu’on ne le dit.' },
    ],
    ui: {
      section: 'Votre trajet', distance: 'Distance (km)', economy: 'Consommation (km/L)',
      price: 'Prix au litre', roundTrip: 'Aller-retour', calc: 'Calculer',
      cost: 'Coût du carburant', fuelNeeded: 'Carburant nécessaire', perKm: 'Coût au km', litres: 'L',
      note: 'La devise est celle que vous saisissez. Péages, stationnement et usure ne sont pas comptés.',
    },
  },
  hi: {
    title: 'ईंधन ख़र्च कैलकुलेटर',
    desc: 'दूरी, माइलेज और पंप के दाम से किसी यात्रा का ईंधन ख़र्च',
    short: 'यात्रा का ईंधन ख़र्च',
    intro: [
      {
        h: 'दूरी ÷ माइलेज × दाम',
        p: '12 किमी/लीटर देने वाली गाड़ी से 400 किमी चलने पर 33.3 लीटर चाहिए; प्रति लीटर दाम से गुणा कीजिए, ख़र्च मिल गया। आने-जाने के लिए या तो दूरी दोगुनी कर दीजिए या वापसी वाला विकल्प चालू कीजिए — दोनों एक ही बात हैं।',
      },
      {
        h: 'ब्रोशर नहीं, अपना नापा हुआ माइलेज लीजिए',
        p: 'कंपनी के आंकड़े एक तय परीक्षण से आते हैं और असल चलाने से बेहतर दिखते हैं। अगर आपने कुछ टंकियों में अपना माइलेज नाप रखा है, तो वही आंकड़ा असली ख़र्च के कहीं ज़्यादा क़रीब जवाब देगा।',
      },
      {
        h: 'ईंधन गाड़ी चलाने का पूरा ख़र्च नहीं है',
        p: 'टोल, पार्किंग, और टायर तथा सर्विसिंग के रूप में चुपचाप ख़र्च होती घिसाई — ये सब इसके बाहर हैं। कार और ट्रेन के किराए की तुलना में सिर्फ़ ईंधन देखने पर कार सस्ती लगने लगती है।',
      },
    ],
    faq: [
      { q: 'यह कौन-सी मुद्रा में है?', a: 'जो आप डालें। प्रति लीटर जो दाम आप भरते हैं वही इकाई तय करता है, और जवाब भी उसी में आता है — आप कहाँ हैं, इस पर कुछ नहीं माना गया।' },
      { q: 'रफ़्तार बढ़ने से ख़र्च इतना क्यों बदलता है?', a: 'हवा का प्रतिरोध रफ़्तार के वर्ग से बढ़ता है, इसलिए उसे चीरने की शक्ति घन से बढ़ती है। हाईवे पर 120 किमी/घं चलाने में 100 के मुक़ाबले एक चौथाई ज़्यादा ईंधन लग सकता है।' },
      { q: 'क्या एसी से फ़र्क़ पड़ता है?', a: 'सामान्य इस्तेमाल में कुछ प्रतिशत, रुक-रुक कर चलने वाले ट्रैफ़िक में उससे ज़्यादा। तेज़ रफ़्तार पर खिड़कियाँ खुली रखने पर भी खिंचाव से लगभग उतना ही लगता है, इसलिए दोनों में से चुनना उतना बड़ा फ़ैसला नहीं जितना बताया जाता है।' },
    ],
    ui: {
      section: 'आपकी यात्रा', distance: 'दूरी (किमी)', economy: 'माइलेज (किमी/लीटर)',
      price: 'प्रति लीटर दाम', roundTrip: 'आना-जाना', calc: 'गणना करें',
      cost: 'ईंधन ख़र्च', fuelNeeded: 'ज़रूरी ईंधन', perKm: 'प्रति किमी ख़र्च', litres: 'लीटर',
      note: 'मुद्रा वही है जो आप डालें। टोल, पार्किंग और घिसाई शामिल नहीं।',
    },
  },
  'zh-hans': {
    title: '油费计算器',
    desc: '根据里程、油耗和油价，算出一趟路的油费',
    short: '一趟路的油费',
    intro: [
      {
        h: '里程 ÷ 油耗 × 单价',
        p: '一辆 12 公里/升的车跑 400 公里需要 33.3 升，乘上每升单价就是油费。往返的话，要么把距离乘二，要么打开往返开关——两者是一回事。',
      },
      {
        h: '用你自己测出来的油耗，不要用宣传册上的',
        p: '官方数字来自标准化测试，比真实驾驶好看。如果你已经用几箱油测过自己的实际油耗，那个数字给出的费用会更接近你真正花掉的钱。',
      },
      {
        h: '油费不是开车的全部成本',
        p: '过路费、停车费，以及你在轮胎和保养上悄悄花掉的磨损，都不在这笔账里。拿开车和火车票比较时，只看油费会把开车算得太便宜。',
      },
    ],
    faq: [
      { q: '这里用的是什么货币？', a: '你填什么就是什么。你输入的每升单价决定了单位，结果也用同一个单位返回——对你在哪里不作任何假设。' },
      { q: '为什么车速一变，油费差这么多？', a: '空气阻力随速度的平方增长，所以克服它所需的功率随立方增长。高速上以 120 公里/小时巡航，可能比 100 多耗四分之一的油。' },
      { q: '开空调影响大吗？', a: '正常使用下是几个百分点，走走停停的路况下更多。高速时开窗因为风阻大约要付出差不多的代价，所以两者之间的取舍并没有传说中那么重要。' },
    ],
    ui: {
      section: '这趟行程', distance: '距离（公里）', economy: '油耗（公里/升）',
      price: '每升价格', roundTrip: '往返', calc: '计算',
      cost: '油费', fuelNeeded: '需要的油量', perKm: '每公里成本', litres: '升',
      note: '货币就是你填入的那种。不含过路费、停车费和车辆磨损。',
    },
  },
  'zh-hant': {
    title: '油費計算機',
    desc: '根據里程、油耗和油價，算出一趟路的油費',
    short: '一趟路的油費',
    intro: [
      {
        h: '里程 ÷ 油耗 × 單價',
        p: '一輛 12 公里/公升的車跑 400 公里需要 33.3 公升，乘上每公升單價就是油費。往返的話，要麼把距離乘二，要麼打開往返開關——兩者是一回事。',
      },
      {
        h: '用你自己測出來的油耗，不要用宣傳冊上的',
        p: '官方數字來自標準化測試，比真實駕駛好看。如果你已經用幾箱油測過自己的實際油耗，那個數字給出的費用會更接近你真正花掉的錢。',
      },
      {
        h: '油費不是開車的全部成本',
        p: '過路費、停車費，以及你在輪胎和保養上悄悄花掉的磨損，都不在這筆帳裡。拿開車和火車票比較時，只看油費會把開車算得太便宜。',
      },
    ],
    faq: [
      { q: '這裡用的是什麼貨幣？', a: '你填什麼就是什麼。你輸入的每公升單價決定了單位，結果也用同一個單位返回——對你在哪裡不作任何假設。' },
      { q: '為什麼車速一變，油費差這麼多？', a: '空氣阻力隨速度的平方成長，所以克服它所需的功率隨立方成長。高速上以 120 公里/小時巡航，可能比 100 多耗四分之一的油。' },
      { q: '開空調影響大嗎？', a: '正常使用下是幾個百分點，走走停停的路況下更多。高速時開窗因為風阻大約要付出差不多的代價，所以兩者之間的取捨並沒有傳說中那麼重要。' },
    ],
    ui: {
      section: '這趟行程', distance: '距離（公里）', economy: '油耗（公里/公升）',
      price: '每公升價格', roundTrip: '往返', calc: '計算',
      cost: '油費', fuelNeeded: '需要的油量', perKm: '每公里成本', litres: '公升',
      note: '貨幣就是你填入的那種。不含過路費、停車費和車輛磨損。',
    },
  },
};

export const EV_CHARGE: CalcTable = {
  en: {
    title: 'EV charging cost calculator',
    desc: 'What a charge costs and how far it takes you, from battery size and tariff',
    short: 'Charging cost · range added',
    intro: [
      {
        h: 'Only the part you actually add',
        p: 'Charging from 20% to 80% of a 60 kWh battery moves 36 kWh, not 60. Multiply by your tariff per kWh and that is the cost. The two ends are where the arithmetic hides: nobody charges from empty to full, so a "full charge" price is usually the wrong number.',
      },
      {
        h: 'The tariff swings more than anything else',
        p: 'Charging overnight at home and charging at a motorway rapid can differ by a factor of four for the same kilowatt-hours. Which one you mostly use decides your running cost far more than the car does, which is why home charging changes the sums so completely.',
      },
      {
        h: 'Efficiency falls in the cold',
        p: 'Battery chemistry slows in low temperatures and cabin heating draws directly from the pack. Winter range commonly drops 20–30% against a mild day, so the efficiency you enter should be the one you actually see in the season you are planning for.',
      },
    ],
    faq: [
      { q: 'Why stop at 80%?', a: 'The last stretch charges much more slowly, because the current has to taper to protect the cells. On a rapid charger the time from 80% to 100% can rival the time from 20% to 80%, which is why long-trip advice is to leave earlier rather than wait.' },
      { q: 'Do I pay for the energy that goes in or the energy stored?', a: 'What goes in. Charging losses mean a few per cent more leaves the charger than reaches the battery, so a metered session bills slightly above the figure here.' },
      { q: 'How do I compare this against petrol?', a: 'Use the cost per 100 km shown below and work out the same figure for the petrol car: consumption per 100 km times the fuel price. Comparing per-kWh against per-litre prices tells you nothing.' },
    ],
    ui: {
      section: 'Your charge', capacity: 'Battery capacity (kWh)',
      fromPct: 'Charge from (%)', toPct: 'Charge to (%)',
      price: 'Price per kWh', efficiency: 'Efficiency (km per kWh)', calc: 'Calculate',
      energy: 'Energy added', cost: 'Cost', range: 'Range added', per100: 'Cost per 100 km',
      note: 'The currency is whatever you enter. Charging losses and cold-weather effects are not applied.',
    },
  },
  es: {
    title: 'Calculadora de coste de carga de coche eléctrico',
    desc: 'Lo que cuesta una carga y cuánto te lleva, según batería y tarifa',
    short: 'Coste de carga · autonomía añadida',
    intro: [
      {
        h: 'Solo la parte que realmente añades',
        p: 'Cargar del 20% al 80% de una batería de 60 kWh mueve 36 kWh, no 60. Multiplica por tu tarifa por kWh y ese es el coste. Los extremos son donde se esconde la aritmética: nadie carga de vacío a lleno, así que el precio de una «carga completa» suele ser la cifra equivocada.',
      },
      {
        h: 'La tarifa manda más que ninguna otra cosa',
        p: 'Cargar de noche en casa y cargar en un rápido de autopista pueden diferir en un factor de cuatro para los mismos kilovatios hora. Cuál uses la mayor parte del tiempo decide tu coste de uso mucho más que el propio coche, y por eso poder cargar en casa cambia las cuentas por completo.',
      },
      {
        h: 'La eficiencia cae con el frío',
        p: 'La química de la batería se ralentiza a baja temperatura y la calefacción tira directamente del paquete. La autonomía invernal suele bajar entre un 20% y un 30% frente a un día templado, así que la eficiencia que introduzcas debería ser la que ves en la estación que estás planificando.',
      },
    ],
    faq: [
      { q: '¿Por qué parar en el 80%?', a: 'El último tramo carga mucho más despacio, porque la corriente debe reducirse para proteger las celdas. En un cargador rápido, del 80% al 100% puede tardar tanto como del 20% al 80%, y por eso en viajes largos se aconseja salir antes en vez de esperar.' },
      { q: '¿Pago la energía que entra o la que queda almacenada?', a: 'La que entra. Por las pérdidas de carga, sale del cargador un pequeño porcentaje más de lo que llega a la batería, así que una sesión medida factura algo por encima de esta cifra.' },
      { q: '¿Cómo lo comparo con la gasolina?', a: 'Usa el coste por 100 km de abajo y calcula lo mismo para el coche de gasolina: consumo por 100 km por el precio del combustible. Comparar precios por kWh con precios por litro no dice nada.' },
    ],
    ui: {
      section: 'Tu carga', capacity: 'Capacidad de la batería (kWh)',
      fromPct: 'Cargar desde (%)', toPct: 'Cargar hasta (%)',
      price: 'Precio por kWh', efficiency: 'Eficiencia (km por kWh)', calc: 'Calcular',
      energy: 'Energía añadida', cost: 'Coste', range: 'Autonomía añadida', per100: 'Coste por 100 km',
      note: 'La moneda es la que introduzcas. No se aplican pérdidas de carga ni efectos del frío.',
    },
  },
  'pt-br': {
    title: 'Calculadora de custo de recarga de carro elétrico',
    desc: 'Quanto custa uma recarga e quanto ela rende, pela bateria e pela tarifa',
    short: 'Custo da recarga · autonomia ganha',
    intro: [
      {
        h: 'Só a parte que você realmente adiciona',
        p: 'Carregar de 20% a 80% numa bateria de 60 kWh move 36 kWh, não 60. Multiplique pela sua tarifa por kWh e esse é o custo. As pontas são onde a conta se esconde: ninguém carrega do zero ao cheio, então o preço de uma "recarga completa" costuma ser o número errado.',
      },
      {
        h: 'A tarifa manda mais que tudo',
        p: 'Carregar de madrugada em casa e carregar num rápido de rodovia podem diferir em quatro vezes para os mesmos quilowatt-hora. Qual deles você usa na maior parte do tempo define seu custo de rodagem muito mais que o carro em si — por isso poder carregar em casa muda a conta por completo.',
      },
      {
        h: 'A eficiência cai no frio',
        p: 'A química da bateria fica mais lenta em baixas temperaturas e o aquecimento da cabine puxa direto do pacote. A autonomia de inverno costuma cair 20% a 30% em relação a um dia ameno, então a eficiência que você informa deve ser a que você vê na estação que está planejando.',
      },
    ],
    faq: [
      { q: 'Por que parar em 80%?', a: 'O último trecho carrega bem mais devagar, porque a corrente precisa cair para proteger as células. Num carregador rápido, de 80% a 100% pode levar tanto quanto de 20% a 80% — daí o conselho, em viagens longas, de sair mais cedo em vez de esperar.' },
      { q: 'Pago pela energia que entra ou pela que fica armazenada?', a: 'Pela que entra. Com as perdas de carga, sai do carregador alguns por cento a mais do que chega à bateria, então uma sessão medida cobra um pouco acima do número daqui.' },
      { q: 'Como comparo isso com gasolina?', a: 'Use o custo por 100 km mostrado abaixo e faça a mesma conta para o carro a combustão: consumo por 100 km vezes o preço do combustível. Comparar preço por kWh com preço por litro não diz nada.' },
    ],
    ui: {
      section: 'Sua recarga', capacity: 'Capacidade da bateria (kWh)',
      fromPct: 'Carregar de (%)', toPct: 'Carregar até (%)',
      price: 'Preço por kWh', efficiency: 'Eficiência (km por kWh)', calc: 'Calcular',
      energy: 'Energia adicionada', cost: 'Custo', range: 'Autonomia ganha', per100: 'Custo por 100 km',
      note: 'A moeda é a que você digitar. Perdas de recarga e efeitos do frio não são aplicados.',
    },
  },
  ja: {
    title: '電気自動車の充電費用の計算機',
    desc: 'バッテリー容量と料金から、充電にかかる費用と走れる距離を出します',
    short: '充電費用と増える航続距離',
    intro: [
      {
        h: '実際に入れるぶんだけ',
        p: '60kWhのバッテリーを20%から80%まで充電するなら、動くのは36kWhで60kWhではありません。これにkWh単価を掛けたものが費用です。計算が狂うのは両端で、空から満まで充電する人はいないので、「満充電の値段」はたいてい間違った数字です。',
      },
      {
        h: '何より効くのは料金の差です',
        p: '自宅の夜間充電と高速道路の急速充電では、同じ電力量でも4倍ほど違うことがあります。ふだんどちらを使うかが、車そのものより走行費用を大きく左右します。自宅で充電できるかどうかで計算がまるごと変わるのはこのためです。',
      },
      {
        h: '寒さで電費は落ちます',
        p: '低温では電池の化学反応が鈍り、車内の暖房は電池から直接電力を引きます。冬の航続距離は温暖な日より20〜30%落ちるのが普通なので、電費の欄には計画している季節に実際に出ている値を入れてください。',
      },
    ],
    faq: [
      { q: 'なぜ80%で止めるのですか。', a: '最後の区間は電流を絞ってセルを守るため、充電がぐっと遅くなります。急速充電器では80%から100%までに、20%から80%までと同じくらいかかることもあります。長距離では待つより早めに出るよう勧められるのはこのためです。' },
      { q: '払うのは入れた電力ですか、貯まった電力ですか。', a: '入れた電力です。充電の損失があるので、充電器から出る量は電池に届く量より数%多くなります。実測課金のセッションはここの数字より少し高く請求されます。' },
      { q: 'ガソリン車と比べるには。', a: '下に出る100kmあたりの費用を使い、ガソリン車でも同じ数字を出してください。100kmあたりの燃料消費量に単価を掛けるだけです。kWh単価とリットル単価を並べても何も分かりません。' },
    ],
    ui: {
      section: '充電の条件', capacity: 'バッテリー容量 (kWh)',
      fromPct: '開始の充電率 (%)', toPct: '終了の充電率 (%)',
      price: '1kWhあたりの単価', efficiency: '電費 (km / kWh)', calc: '計算する',
      energy: '充電する電力量', cost: '費用', range: '増える航続距離', per100: '100kmあたりの費用',
      note: '通貨は入力したものです。充電の損失と寒冷時の低下は反映していません。',
    },
  },
  de: {
    title: 'Ladekosten-Rechner für Elektroautos',
    desc: 'Was ein Ladevorgang kostet und wie weit er trägt — aus Akkugröße und Tarif',
    short: 'Ladekosten · gewonnene Reichweite',
    intro: [
      {
        h: 'Nur der Teil, den Sie wirklich nachladen',
        p: 'Von 20% auf 80% eines 60-kWh-Akkus bewegt 36 kWh, nicht 60. Mal Ihrem Tarif je kWh ergibt das die Kosten. An den Rändern versteckt sich die Rechnung: Niemand lädt von leer auf voll, deshalb ist der Preis einer "vollen Ladung" meist die falsche Zahl.',
      },
      {
        h: 'Der Tarif schwankt stärker als alles andere',
        p: 'Nachts zu Hause und am Schnelllader an der Autobahn können sich für dieselben Kilowattstunden um das Vierfache unterscheiden. Was Sie überwiegend nutzen, bestimmt Ihre Betriebskosten weit mehr als das Auto — deshalb verändert eine Lademöglichkeit zu Hause die Rechnung von Grund auf.',
      },
      {
        h: 'In der Kälte sinkt der Wirkungsgrad',
        p: 'Bei niedrigen Temperaturen wird die Akkuchemie träge, und die Innenraumheizung zieht direkt aus dem Paket. Die Winterreichweite liegt üblicherweise 20 bis 30% unter der eines milden Tages; tragen Sie deshalb den Verbrauch ein, den Sie in der geplanten Jahreszeit tatsächlich sehen.',
      },
    ],
    faq: [
      { q: 'Warum bei 80% aufhören?', a: 'Das letzte Stück lädt deutlich langsamer, weil der Strom zum Schutz der Zellen zurückgenommen wird. Am Schnelllader kann von 80% auf 100% so lange dauern wie von 20% auf 80% — deshalb lautet der Rat auf langen Fahrten, früher loszufahren statt zu warten.' },
      { q: 'Zahle ich die eingespeiste oder die gespeicherte Energie?', a: 'Die eingespeiste. Durch Ladeverluste verlässt einige Prozent mehr die Ladesäule, als im Akku ankommt; eine abgerechnete Ladung liegt also etwas über dem Wert hier.' },
      { q: 'Wie vergleiche ich das mit Benzin?', a: 'Nehmen Sie die Kosten je 100 km unten und rechnen Sie dieselbe Größe für den Verbrenner: Verbrauch je 100 km mal Kraftstoffpreis. Preise je kWh gegen Preise je Liter zu stellen sagt gar nichts.' },
    ],
    ui: {
      section: 'Ihr Ladevorgang', capacity: 'Akkukapazität (kWh)',
      fromPct: 'Laden ab (%)', toPct: 'Laden bis (%)',
      price: 'Preis je kWh', efficiency: 'Verbrauch (km je kWh)', calc: 'Berechnen',
      energy: 'Geladene Energie', cost: 'Kosten', range: 'Gewonnene Reichweite', per100: 'Kosten je 100 km',
      note: 'Die Währung ist die Ihrer Eingabe. Ladeverluste und Kälteeffekte sind nicht berücksichtigt.',
    },
  },
  fr: {
    title: 'Calculateur de coût de recharge d’un véhicule électrique',
    desc: 'Ce que coûte une recharge et jusqu’où elle mène, d’après la batterie et le tarif',
    short: 'Coût de recharge · autonomie gagnée',
    intro: [
      {
        h: 'Seulement la part réellement rechargée',
        p: 'Recharger de 20 % à 80 % une batterie de 60 kWh déplace 36 kWh, pas 60. Multipliez par votre tarif au kWh et vous avez le coût. C’est aux extrémités que le calcul se cache : personne ne recharge du vide au plein, si bien que le prix d’une « charge complète » est le plus souvent le mauvais chiffre.',
      },
      {
        h: 'Le tarif pèse plus que tout le reste',
        p: 'Recharger la nuit chez soi ou sur une borne rapide d’autoroute peut varier du simple au quadruple pour les mêmes kilowattheures. Celui que vous utilisez le plus détermine votre coût d’usage bien plus que la voiture — d’où le fait que pouvoir recharger à domicile change entièrement les comptes.',
      },
      {
        h: 'Le rendement chute par temps froid',
        p: 'À basse température, la chimie de la batterie ralentit et le chauffage de l’habitacle puise directement dans le pack. L’autonomie hivernale perd couramment 20 à 30 % par rapport à une journée douce : saisissez donc la consommation que vous constatez réellement à la saison concernée.',
      },
    ],
    faq: [
      { q: 'Pourquoi s’arrêter à 80 % ?', a: 'La dernière portion charge beaucoup plus lentement, le courant devant être réduit pour protéger les cellules. Sur une borne rapide, passer de 80 % à 100 % peut prendre autant que de 20 % à 80 % — d’où le conseil, sur long trajet, de repartir plus tôt plutôt que d’attendre.' },
      { q: 'Je paie l’énergie entrée ou l’énergie stockée ?', a: 'Celle qui entre. Du fait des pertes de charge, il sort de la borne quelques pour cent de plus qu’il n’arrive à la batterie : une session facturée dépasse légèrement le chiffre affiché ici.' },
      { q: 'Comment comparer avec l’essence ?', a: 'Servez-vous du coût aux 100 km affiché plus bas et faites le même calcul pour la voiture thermique : consommation aux 100 km multipliée par le prix du carburant. Comparer un prix au kWh à un prix au litre ne dit rien.' },
    ],
    ui: {
      section: 'Votre recharge', capacity: 'Capacité de la batterie (kWh)',
      fromPct: 'Recharger depuis (%)', toPct: 'Recharger jusqu’à (%)',
      price: 'Prix au kWh', efficiency: 'Consommation (km par kWh)', calc: 'Calculer',
      energy: 'Énergie ajoutée', cost: 'Coût', range: 'Autonomie gagnée', per100: 'Coût aux 100 km',
      note: 'La devise est celle que vous saisissez. Pertes de charge et effets du froid ne sont pas appliqués.',
    },
  },
  hi: {
    title: 'इलेक्ट्रिक कार चार्जिंग ख़र्च कैलकुलेटर',
    desc: 'बैटरी क्षमता और दर से चार्जिंग का ख़र्च और उससे मिलने वाली दूरी',
    short: 'चार्जिंग ख़र्च · मिली दूरी',
    intro: [
      {
        h: 'सिर्फ़ उतना जितना आप सचमुच भरते हैं',
        p: '60 kWh की बैटरी को 20% से 80% तक चार्ज करने पर 36 kWh चलती है, 60 नहीं। इसे प्रति kWh अपनी दर से गुणा कीजिए, ख़र्च मिल गया। गड़बड़ सिरों पर छिपी है: कोई भी ख़ाली से पूरा भरता नहीं, इसलिए "फ़ुल चार्ज का दाम" अक्सर ग़लत आंकड़ा होता है।',
      },
      {
        h: 'सबसे ज़्यादा फ़र्क़ दर से पड़ता है',
        p: 'घर पर रात में चार्ज करना और हाईवे के फ़ास्ट चार्जर पर चार्ज करना — उतनी ही बिजली के लिए चार गुना तक अलग पड़ सकते हैं। आप ज़्यादातर कौन-सा इस्तेमाल करते हैं, यह आपकी चलाने की लागत गाड़ी से कहीं ज़्यादा तय करता है। इसीलिए घर पर चार्जिंग की सुविधा पूरा हिसाब ही बदल देती है।',
      },
      {
        h: 'ठंड में दक्षता गिरती है',
        p: 'कम तापमान पर बैटरी की रसायनिक क्रिया धीमी पड़ती है और केबिन का हीटर सीधे बैटरी से खींचता है। सर्दियों में रेंज आमतौर पर सुहावने दिन के मुक़ाबले 20–30% गिर जाती है, इसलिए दक्षता वहीं डालिए जो उस मौसम में आपको सचमुच मिलती है।',
      },
    ],
    faq: [
      { q: '80% पर क्यों रुकें?', a: 'आख़िरी हिस्सा बहुत धीमे चार्ज होता है, क्योंकि सेल बचाने के लिए करंट घटाना पड़ता है। फ़ास्ट चार्जर पर 80% से 100% तक जाने में उतना ही समय लग सकता है जितना 20% से 80% तक। लंबी यात्रा में इंतज़ार करने के बजाय जल्दी निकलने की सलाह इसीलिए दी जाती है।' },
      { q: 'मैं भरी गई बिजली का पैसा देता हूँ या जमा हुई का?', a: 'भरी गई का। चार्जिंग में नुक़सान होने से चार्जर से निकलने वाली बिजली, बैटरी तक पहुँचने वाली से कुछ प्रतिशत ज़्यादा होती है, इसलिए मीटर वाला सत्र यहाँ दिखे आंकड़े से थोड़ा ऊपर बिल करेगा।' },
      { q: 'पेट्रोल से तुलना कैसे करूँ?', a: 'नीचे दिखे प्रति 100 किमी ख़र्च का इस्तेमाल कीजिए और पेट्रोल गाड़ी के लिए वही आंकड़ा निकालिए: प्रति 100 किमी खपत गुणा ईंधन का दाम। प्रति kWh और प्रति लीटर के दाम आमने-सामने रखने से कुछ पता नहीं चलता।' },
    ],
    ui: {
      section: 'आपकी चार्जिंग', capacity: 'बैटरी क्षमता (kWh)',
      fromPct: 'कहाँ से (%)', toPct: 'कहाँ तक (%)',
      price: 'प्रति kWh दर', efficiency: 'दक्षता (किमी प्रति kWh)', calc: 'गणना करें',
      energy: 'भरी गई बिजली', cost: 'ख़र्च', range: 'मिली दूरी', per100: 'प्रति 100 किमी ख़र्च',
      note: 'मुद्रा वही है जो आप डालें। चार्जिंग हानि और ठंड का असर शामिल नहीं।',
    },
  },
  'zh-hans': {
    title: '电动车充电费用计算器',
    desc: '按电池容量和电价，算出一次充电的费用和能跑多远',
    short: '充电费用 · 增加的续航',
    intro: [
      {
        h: '只算你真正补进去的那部分',
        p: '把 60 kWh 的电池从 20% 充到 80%，动的是 36 kWh，不是 60。乘上你的每度电价，就是费用。算错往往错在两头：没有人从空充到满，所以"充满一次多少钱"通常是个错的数字。',
      },
      {
        h: '电价的差别比什么都大',
        p: '在家夜间充和在高速服务区快充，同样的度数可能差到四倍。你平时主要用哪一种，对使用成本的影响远大于车本身——这也是为什么能不能在家充电，会把整笔账彻底改写。',
      },
      {
        h: '天冷时效率会下降',
        p: '低温下电池的化学反应变慢，而车内暖风直接从电池取电。冬季续航通常比温和天气低 20% 到 30%，所以效率那一栏该填你在计划的那个季节里实际看到的数值。',
      },
    ],
    faq: [
      { q: '为什么充到 80% 就停？', a: '最后那一段充得慢得多，因为电流必须降下来保护电芯。在快充桩上，从 80% 到 100% 花的时间可能和从 20% 到 80% 差不多——所以长途的建议是早点出发，而不是等在那里。' },
      { q: '我付的是充进去的电，还是存住的电？', a: '充进去的。充电有损耗，从桩里出去的电比进到电池里的多出几个百分点，所以按表计费的一次充电，账单会略高于这里的数字。' },
      { q: '怎么和汽油车比较？', a: '用下面的每 100 公里成本，再给汽油车算同一个数：每 100 公里油耗乘以油价。拿每度电价和每升油价直接对比，说明不了任何问题。' },
    ],
    ui: {
      section: '这次充电', capacity: '电池容量 (kWh)',
      fromPct: '从百分之几 (%)', toPct: '充到百分之几 (%)',
      price: '每度电价', efficiency: '能耗（公里/kWh）', calc: '计算',
      energy: '充入电量', cost: '费用', range: '增加续航', per100: '每 100 公里成本',
      note: '货币就是你填入的那种。未计入充电损耗和低温影响。',
    },
  },
  'zh-hant': {
    title: '電動車充電費用計算機',
    desc: '按電池容量和電價，算出一次充電的費用和能跑多遠',
    short: '充電費用 · 增加的續航',
    intro: [
      {
        h: '只算你真正補進去的那部分',
        p: '把 60 kWh 的電池從 20% 充到 80%，動的是 36 kWh，不是 60。乘上你的每度電價，就是費用。算錯往往錯在兩頭：沒有人從空充到滿，所以「充滿一次多少錢」通常是個錯的數字。',
      },
      {
        h: '電價的差別比什麼都大',
        p: '在家夜間充和在高速服務區快充，同樣的度數可能差到四倍。你平時主要用哪一種，對使用成本的影響遠大於車本身——這也是為什麼能不能在家充電，會把整筆帳徹底改寫。',
      },
      {
        h: '天冷時效率會下降',
        p: '低溫下電池的化學反應變慢，而車內暖氣直接從電池取電。冬季續航通常比溫和天氣低 20% 到 30%，所以效率那一欄該填你在計畫的那個季節裡實際看到的數值。',
      },
    ],
    faq: [
      { q: '為什麼充到 80% 就停？', a: '最後那一段充得慢得多，因為電流必須降下來保護電芯。在快充樁上，從 80% 到 100% 花的時間可能和從 20% 到 80% 差不多——所以長途的建議是早點出發，而不是等在那裡。' },
      { q: '我付的是充進去的電，還是存住的電？', a: '充進去的。充電有損耗，從樁裡出去的電比進到電池裡的多出幾個百分點，所以按表計費的一次充電，帳單會略高於這裡的數字。' },
      { q: '怎麼和汽油車比較？', a: '用下面的每 100 公里成本，再給汽油車算同一個數：每 100 公里油耗乘以油價。拿每度電價和每公升油價直接對比，說明不了任何問題。' },
    ],
    ui: {
      section: '這次充電', capacity: '電池容量 (kWh)',
      fromPct: '從百分之幾 (%)', toPct: '充到百分之幾 (%)',
      price: '每度電價', efficiency: '能耗（公里/kWh）', calc: '計算',
      energy: '充入電量', cost: '費用', range: '增加續航', per100: '每 100 公里成本',
      note: '貨幣就是你填入的那種。未計入充電損耗和低溫影響。',
    },
  },
};
