import type { CalcTable } from './types.ts';

/**
 * 차량 유지비 — lib/car-cost.ts의 셈을 그대로 쓴다.
 *
 * 한국어판의 프리셋(유가 1,700원/L, 자동차세 520,000원 등)은 전부 한국 값이라
 * 지우고 입력으로만 받는다. 자동차세 항목은 그냥 "세금" 한 칸이다. 통화도
 * 붙이지 않는다 — 넣은 단위가 그대로 결과의 단위다.
 */
export const CAR_COST: CalcTable = {
  en: {
    title: 'Car running cost calculator',
    desc: 'What a car costs per year, per month and per kilometre — fuel, insurance, tax and upkeep',
    short: 'Yearly cost of keeping a car',
    intro: [
      {
        h: 'The yearly bills outweigh the sticker price',
        p: 'Buyers stare at the purchase price, but the money that actually leaves is the recurring kind: fuel, insurance, tax, servicing, parking, year after year. Add one year of it up and divide by twelve, and "what this car costs me a month" stops being a guess — over ten years the recurring side commonly overtakes what the car cost to buy.',
      },
      {
        h: 'Some of it runs while the car stands still',
        p: 'Insurance, tax and a parking space fall due whether you drive or not. If those fixed items dominate your total, driving less will barely lower the bill — the lever is a cheaper policy, a cheaper space, or asking whether the car earns its keep at all.',
      },
      {
        h: 'The more you drive, the cheaper each kilometre',
        p: 'The fixed part spreads across every kilometre you cover, so a car driven 5,000 km a year can cost more than twice as much per kilometre as the same car at 12,000. That per-kilometre figure is the honest one to hold against a train ticket — the fuel for a single trip is only its smallest part.',
      },
    ],
    faq: [
      { q: 'Which currency does this use?', a: 'Whichever you enter. Every money field is a plain yearly amount, and the results come back in the same unit — nothing is assumed about where you live.' },
      { q: 'I drive an electric car.', a: 'Set fuel economy to 0 so the fuel line stays empty, then add your yearly charging cost to any of the yearly fields — the total does not care which row carries it. The EV charging calculator can give you that yearly number.' },
      { q: 'Where is depreciation?', a: 'Not in the total, and for a newer car it is often the single biggest cost — the value a car sheds in a year can exceed fuel and insurance together. If you want it counted, estimate one year of value loss and add it to any yearly field.' },
    ],
    ui: {
      section: 'Your car, per year', km: 'Distance per year (km)', kmpl: 'Fuel economy (km/L, 0 for electric)',
      fuelPrice: 'Fuel price per litre', tax: 'Vehicle tax (per year)', insurance: 'Insurance (per year)',
      maintenance: 'Servicing and parts (per year)', parking: 'Parking and tolls (per year)',
      calc: 'Calculate', yearly: 'Cost per year', monthly: 'Per month', perKm: 'Per km',
      breakdown: 'By item', fuel: 'Fuel', fixed: 'Runs even when parked', fuelShare: 'Fuel share',
      fixedNote: 'a small fuel share means driving less will barely lower the total.',
      note: 'The currency is whatever you enter. Depreciation is not included.',
    },
  },
  es: {
    title: 'Calculadora del coste anual del coche',
    desc: 'Lo que cuesta un coche al año, al mes y por kilómetro: combustible, seguro, impuestos y mantenimiento',
    short: 'Coste anual de tener coche',
    intro: [
      {
        h: 'Los gastos anuales pesan más que el precio de compra',
        p: 'Al comprar se mira el precio del coche, pero el dinero que de verdad se va es el que se repite: combustible, seguro, impuestos, taller, aparcamiento, año tras año. Suma un año entero y divide entre doce, y «cuánto me cuesta este coche al mes» deja de ser una suposición — en diez años, lo recurrente suele superar lo que costó el coche.',
      },
      {
        h: 'Parte del gasto corre con el coche parado',
        p: 'El seguro, los impuestos y la plaza de garaje se pagan conduzcas o no. Si esos fijos dominan tu total, conducir menos apenas bajará la factura — la palanca es una póliza más barata, una plaza más barata, o preguntarse si el coche se gana su sitio.',
      },
      {
        h: 'Cuanto más conduces, más barato sale cada kilómetro',
        p: 'La parte fija se reparte entre todos los kilómetros que haces, así que un coche que rueda 5.000 km al año puede costar por kilómetro más del doble que el mismo coche a 12.000. Esa cifra por kilómetro es la honesta para comparar con un billete de tren — el combustible de un viaje es solo su parte más pequeña.',
      },
    ],
    faq: [
      { q: '¿Qué moneda usa?', a: 'La que tú escribas. Cada campo de dinero es un importe anual sin más, y los resultados salen en la misma unidad — no se supone nada sobre dónde vives.' },
      { q: 'Tengo un coche eléctrico.', a: 'Pon el consumo a 0 para que la línea de combustible quede vacía, y suma tu coste anual de carga a cualquiera de los campos anuales — al total le da igual en qué fila viaje. La calculadora de coste de carga puede darte esa cifra anual.' },
      { q: '¿Dónde está la depreciación?', a: 'No está en el total, y en un coche reciente suele ser el mayor gasto de todos — lo que el coche pierde de valor en un año puede superar combustible y seguro juntos. Si quieres contarla, estima un año de pérdida de valor y añádelo a cualquier campo anual.' },
    ],
    ui: {
      section: 'Tu coche, al año', km: 'Kilómetros al año (km)', kmpl: 'Consumo (km/L, 0 si es eléctrico)',
      fuelPrice: 'Precio del litro', tax: 'Impuestos del vehículo (al año)', insurance: 'Seguro (al año)',
      maintenance: 'Taller y piezas (al año)', parking: 'Aparcamiento y peajes (al año)',
      calc: 'Calcular', yearly: 'Coste al año', monthly: 'Al mes', perKm: 'Por km',
      breakdown: 'Por partida', fuel: 'Combustible', fixed: 'Corre aunque esté parado', fuelShare: 'Peso del combustible',
      fixedNote: 'si el combustible pesa poco, conducir menos apenas bajará el total.',
      note: 'La moneda es la que introduzcas. La depreciación no está incluida.',
    },
  },
  'pt-br': {
    title: 'Calculadora de custo anual do carro',
    desc: 'Quanto um carro custa por ano, por mês e por quilômetro — combustível, seguro, impostos e manutenção',
    short: 'Custo anual de manter um carro',
    intro: [
      {
        h: 'As contas do ano pesam mais que o preço da compra',
        p: 'Na hora de comprar, olha-se o preço do carro, mas o dinheiro que realmente sai é o que se repete: combustível, seguro, impostos, oficina, estacionamento, ano após ano. Some um ano inteiro e divida por doze, e "quanto este carro me custa por mês" deixa de ser chute — em dez anos, o lado recorrente costuma passar o que o carro custou.',
      },
      {
        h: 'Parte do gasto corre com o carro parado',
        p: 'Seguro, impostos e vaga de garagem vencem dirija você ou não. Se esses fixos dominam o seu total, rodar menos quase não baixa a conta — a alavanca é uma apólice mais barata, uma vaga mais barata, ou perguntar se o carro merece o lugar que ocupa.',
      },
      {
        h: 'Quanto mais você roda, mais barato sai cada quilômetro',
        p: 'A parte fixa se dilui em cada quilômetro rodado, então um carro que faz 5.000 km por ano pode custar por quilômetro mais que o dobro do mesmo carro a 12.000. Esse número por quilômetro é o honesto para comparar com uma passagem — o combustível de uma viagem é só a menor parte dele.',
      },
    ],
    faq: [
      { q: 'Que moeda isso usa?', a: 'A que você digitar. Cada campo de dinheiro é um valor anual simples, e os resultados voltam na mesma unidade — nada se presume sobre onde você mora.' },
      { q: 'Meu carro é elétrico.', a: 'Coloque o consumo em 0 para a linha de combustível ficar vazia, e some seu custo anual de recarga a qualquer campo anual — para o total, tanto faz em que linha ele viaja. A calculadora de custo de recarga dá esse número anual.' },
      { q: 'Cadê a depreciação?', a: 'Fora do total — e num carro mais novo ela costuma ser o maior gasto de todos: o valor que o carro perde num ano pode passar combustível e seguro juntos. Se quiser contá-la, estime um ano de perda de valor e some a qualquer campo anual.' },
    ],
    ui: {
      section: 'Seu carro, por ano', km: 'Quilômetros por ano (km)', kmpl: 'Consumo (km/L, 0 se elétrico)',
      fuelPrice: 'Preço do litro', tax: 'Impostos do veículo (por ano)', insurance: 'Seguro (por ano)',
      maintenance: 'Oficina e peças (por ano)', parking: 'Estacionamento e pedágio (por ano)',
      calc: 'Calcular', yearly: 'Custo por ano', monthly: 'Por mês', perKm: 'Por km',
      breakdown: 'Por item', fuel: 'Combustível', fixed: 'Corre mesmo parado', fuelShare: 'Peso do combustível',
      fixedNote: 'se o combustível pesa pouco, rodar menos quase não baixa o total.',
      note: 'A moeda é a que você digitar. A depreciação não está incluída.',
    },
  },
  ja: {
    title: '車の維持費の計算機',
    desc: '燃料・保険・税金・整備から、車の費用を年・月・kmあたりで出します',
    short: '車を持つ一年の費用',
    intro: [
      {
        h: '車両価格より、毎年出ていく金のほうが大きい',
        p: '買うときは車両価格を見ますが、実際に出ていくのは燃料、保険、税金、整備、駐車場と、毎年繰り返すほうです。一年分を足して12で割れば、「この車を持つと月いくら」が当てずっぽうでなくなります。十年乗れば、繰り返しの側が車両価格を超えることも珍しくありません。',
      },
      {
        h: '走らせなくても出ていく金があります',
        p: '保険、税金、駐車場代は、乗っても乗らなくても払います。この固定分が合計の大半を占めるなら、乗る量を減らしても費用はほとんど下がりません。効くのは安い保険、安い駐車場、あるいは車を持つこと自体を見直すことです。',
      },
      {
        h: '走るほど1kmは安くなります',
        p: '固定分が走った距離に薄く広がるからです。年5,000kmしか走らない車は、同じ条件で年12,000km走る車より1kmあたりが2倍以上つくことがあります。電車の運賃と比べるなら正直なのはこのkmあたりの数字で、一回分の燃料代はその一番小さな部分にすぎません。',
      },
    ],
    faq: [
      { q: '通貨は何ですか。', a: '入力した通貨です。金額の欄はどれも一年あたりの素の数字で、答えも同じ単位で返ります。住んでいる場所については何も仮定していません。' },
      { q: '電気自動車に乗っています。', a: '燃費を0にすれば燃料の行が空になります。そのうえで一年分の充電費用をどれかの年額欄に足してください。合計はどの行に載っているかを気にしません。年額は充電費用の計算機で出せます。' },
      { q: '減価償却はどこですか。', a: '合計には入っていません。そして新しめの車では、これが単独で最大の費用になりがちです — 一年で失われる価値が燃料と保険の合計を超えることもあります。数えたければ、一年分の値下がりを見積もってどれかの年額欄に足してください。' },
    ],
    ui: {
      section: 'あなたの車・一年分', km: '年間走行距離 (km)', kmpl: '燃費 (km/L、電気自動車は0)',
      fuelPrice: '燃料の単価 (1Lあたり)', tax: '自動車の税金 (年)', insurance: '保険料 (年)',
      maintenance: '整備・消耗品 (年)', parking: '駐車場・通行料 (年)',
      calc: '計算する', yearly: '一年の費用', monthly: '月あたり', perKm: '1kmあたり',
      breakdown: '項目別', fuel: '燃料', fixed: '走らせなくても出ていく分', fuelShare: '燃料の割合',
      fixedNote: '燃料の割合が小さいなら、乗る量を減らしても合計はほとんど下がりません。',
      note: '通貨は入力したものです。減価償却は含みません。',
    },
  },
  de: {
    title: 'Auto-Unterhaltskosten-Rechner',
    desc: 'Was ein Auto im Jahr, im Monat und je Kilometer kostet — Kraftstoff, Versicherung, Steuer und Wartung',
    short: 'Jahreskosten eines Autos',
    intro: [
      {
        h: 'Die Jahresrechnungen wiegen schwerer als der Kaufpreis',
        p: 'Beim Kauf starrt man auf den Preis, aber das Geld, das wirklich geht, ist das wiederkehrende: Kraftstoff, Versicherung, Steuer, Werkstatt, Stellplatz — Jahr für Jahr. Ein Jahr zusammenzählen, durch zwölf teilen, und "was mich dieses Auto im Monat kostet" ist keine Schätzung mehr. Über zehn Jahre überholt die wiederkehrende Seite häufig den Kaufpreis.',
      },
      {
        h: 'Ein Teil läuft, während das Auto steht',
        p: 'Versicherung, Steuer und Stellplatz werden fällig, ob Sie fahren oder nicht. Dominieren diese Fixposten Ihre Summe, senkt weniger Fahren die Rechnung kaum — der Hebel ist eine günstigere Police, ein günstigerer Platz, oder die Frage, ob sich das Auto überhaupt verdient.',
      },
      {
        h: 'Je mehr Sie fahren, desto billiger der Kilometer',
        p: 'Der fixe Teil verteilt sich auf jeden gefahrenen Kilometer. Ein Auto mit 5.000 km im Jahr kann je Kilometer mehr als doppelt so teuer sein wie dasselbe Auto mit 12.000. Diese Kilometerzahl ist die ehrliche Größe gegen ein Bahnticket — der Sprit einer einzelnen Fahrt ist nur ihr kleinster Teil.',
      },
    ],
    faq: [
      { q: 'Welche Währung wird verwendet?', a: 'Die, die Sie eingeben. Jedes Geldfeld ist ein schlichter Jahresbetrag, und die Ergebnisse kommen in derselben Einheit zurück — über Ihren Wohnort wird nichts angenommen.' },
      { q: 'Ich fahre elektrisch.', a: 'Setzen Sie den Verbrauch auf 0, damit die Kraftstoffzeile leer bleibt, und schlagen Sie Ihre jährlichen Ladekosten einem beliebigen Jahresfeld zu — der Summe ist gleich, in welcher Zeile sie sitzen. Den Jahresbetrag liefert der Ladekosten-Rechner.' },
      { q: 'Wo ist der Wertverlust?', a: 'Nicht in der Summe — und bei einem neueren Auto ist er oft der größte Einzelposten: Was ein Auto in einem Jahr an Wert verliert, kann Kraftstoff und Versicherung zusammen übersteigen. Wer ihn mitzählen will, schätzt ein Jahr Wertverlust und trägt ihn in ein beliebiges Jahresfeld ein.' },
    ],
    ui: {
      section: 'Ihr Auto, pro Jahr', km: 'Fahrleistung pro Jahr (km)', kmpl: 'Verbrauch (km/l, 0 bei Elektro)',
      fuelPrice: 'Kraftstoffpreis je Liter', tax: 'Kfz-Steuer (pro Jahr)', insurance: 'Versicherung (pro Jahr)',
      maintenance: 'Wartung und Teile (pro Jahr)', parking: 'Parken und Maut (pro Jahr)',
      calc: 'Berechnen', yearly: 'Kosten pro Jahr', monthly: 'Pro Monat', perKm: 'Je km',
      breakdown: 'Nach Posten', fuel: 'Kraftstoff', fixed: 'Läuft auch im Stand', fuelShare: 'Anteil des Kraftstoffs',
      fixedNote: 'ist der Kraftstoffanteil klein, senkt weniger Fahren die Summe kaum.',
      note: 'Die Währung ist die Ihrer Eingabe. Wertverlust ist nicht enthalten.',
    },
  },
  fr: {
    title: 'Calculateur du coût annuel d’une voiture',
    desc: 'Ce qu’une voiture coûte par an, par mois et par kilomètre — carburant, assurance, taxes et entretien',
    short: 'Coût annuel d’une voiture',
    intro: [
      {
        h: 'Les factures annuelles pèsent plus que le prix d’achat',
        p: 'À l’achat, on regarde le prix de la voiture, mais l’argent qui part vraiment est celui qui revient : carburant, assurance, taxes, entretien, stationnement, année après année. Additionnez une année, divisez par douze, et « ce que cette voiture me coûte par mois » cesse d’être une intuition — sur dix ans, le côté récurrent dépasse souvent le prix d’achat.',
      },
      {
        h: 'Une partie court même voiture à l’arrêt',
        p: 'Assurance, taxes et place de parking tombent que vous rouliez ou non. Si ces postes fixes dominent votre total, rouler moins ne baissera presque rien — le levier, c’est une police moins chère, une place moins chère, ou la question de savoir si la voiture mérite sa place.',
      },
      {
        h: 'Plus vous roulez, moins le kilomètre coûte',
        p: 'La part fixe se répartit sur chaque kilomètre parcouru : une voiture qui fait 5 000 km par an peut coûter au kilomètre plus du double de la même voiture à 12 000. C’est ce chiffre au kilomètre qu’il est honnête de comparer à un billet de train — le carburant d’un seul trajet n’en est que la plus petite part.',
      },
    ],
    faq: [
      { q: 'Quelle devise est utilisée ?', a: 'Celle que vous saisissez. Chaque champ d’argent est un simple montant annuel, et les résultats reviennent dans la même unité — rien n’est supposé de l’endroit où vous vivez.' },
      { q: 'Je roule en électrique.', a: 'Mettez la consommation à 0 pour laisser la ligne carburant vide, puis ajoutez votre coût annuel de recharge à n’importe quel champ annuel — le total se moque de la ligne qui le porte. Le calculateur de coût de recharge vous donne ce montant annuel.' },
      { q: 'Où est la décote ?', a: 'Hors du total — et sur une voiture récente, c’est souvent le premier poste de tous : la valeur perdue en un an peut dépasser carburant et assurance réunis. Pour la compter, estimez une année de perte de valeur et ajoutez-la à n’importe quel champ annuel.' },
    ],
    ui: {
      section: 'Votre voiture, par an', km: 'Kilomètres par an (km)', kmpl: 'Consommation (km/L, 0 si électrique)',
      fuelPrice: 'Prix du litre', tax: 'Taxes du véhicule (par an)', insurance: 'Assurance (par an)',
      maintenance: 'Entretien et pièces (par an)', parking: 'Stationnement et péages (par an)',
      calc: 'Calculer', yearly: 'Coût par an', monthly: 'Par mois', perKm: 'Par km',
      breakdown: 'Par poste', fuel: 'Carburant', fixed: 'Court même à l’arrêt', fuelShare: 'Part du carburant',
      fixedNote: 'si la part du carburant est faible, rouler moins ne baissera presque pas le total.',
      note: 'La devise est celle que vous saisissez. La décote n’est pas comptée.',
    },
  },
  hi: {
    title: 'कार के सालाना ख़र्च का कैलकुलेटर',
    desc: 'ईंधन, बीमा, टैक्स और रख-रखाव से — कार का ख़र्च साल, महीने और प्रति किमी में',
    short: 'कार रखने का सालाना ख़र्च',
    intro: [
      {
        h: 'गाड़ी के दाम से बड़ा है हर साल का ख़र्च',
        p: 'ख़रीदते समय नज़र गाड़ी के दाम पर रहती है, पर जो पैसा सचमुच जाता है वह दोहराने वाला है: ईंधन, बीमा, टैक्स, सर्विसिंग, पार्किंग — साल-दर-साल। एक साल का जोड़कर बारह से भाग दीजिए, और "यह गाड़ी मुझे महीने में कितने की पड़ती है" अंदाज़ा नहीं रह जाता। दस साल में दोहराने वाला हिस्सा अक्सर गाड़ी के दाम से आगे निकल जाता है।',
      },
      {
        h: 'कुछ ख़र्च खड़ी गाड़ी पर भी चलता रहता है',
        p: 'बीमा, टैक्स और पार्किंग की जगह का किराया — चलाइए या न चलाइए, देने पड़ते हैं। अगर आपके कुल में यही स्थिर ख़र्च भारी हैं, तो कम चलाने से बिल मुश्किल से घटेगा — असर सस्ते बीमे, सस्ती जगह, या इस सवाल से पड़ेगा कि गाड़ी रखना जँचता भी है या नहीं।',
      },
      {
        h: 'जितना ज़्यादा चलाएँ, हर किलोमीटर उतना सस्ता',
        p: 'स्थिर हिस्सा हर चले हुए किलोमीटर पर बँट जाता है, इसलिए साल में 5,000 किमी चलने वाली कार का प्रति किमी ख़र्च, वही कार 12,000 किमी चले तो, के दुगुने से ज़्यादा बैठ सकता है। ट्रेन के किराए से तुलना के लिए ईमानदार आंकड़ा यही प्रति किमी वाला है — एक यात्रा का ईंधन उसका सबसे छोटा हिस्सा भर है।',
      },
    ],
    faq: [
      { q: 'यह कौन-सी मुद्रा में है?', a: 'जो आप डालें। पैसे का हर ख़ाना सीधा-सादा सालाना रक़म है, और नतीजे उसी इकाई में लौटते हैं — आप कहाँ रहते हैं, इस पर कुछ नहीं माना गया।' },
      { q: 'मेरी गाड़ी इलेक्ट्रिक है।', a: 'माइलेज में 0 डालिए ताकि ईंधन की पंक्ति ख़ाली रहे, और साल भर की चार्जिंग का ख़र्च किसी भी सालाना ख़ाने में जोड़ दीजिए — कुल को परवाह नहीं कि वह किस पंक्ति में बैठा है। सालाना रक़म चार्जिंग ख़र्च कैलकुलेटर से निकल आएगी।' },
      { q: 'गाड़ी की गिरती क़ीमत कहाँ है?', a: 'कुल में नहीं है — और नई-नवेली गाड़ी में अक्सर यही सबसे बड़ा ख़र्च होता है: साल भर में गाड़ी जितनी क़ीमत खोती है, वह ईंधन और बीमे के जोड़ से ज़्यादा हो सकती है। गिनना चाहें तो एक साल की गिरावट का अंदाज़ा लगाकर किसी भी सालाना ख़ाने में जोड़ दीजिए।' },
    ],
    ui: {
      section: 'आपकी कार, साल भर की', km: 'सालाना दूरी (किमी)', kmpl: 'माइलेज (किमी/लीटर, इलेक्ट्रिक हो तो 0)',
      fuelPrice: 'प्रति लीटर दाम', tax: 'गाड़ी का टैक्स (सालाना)', insurance: 'बीमा (सालाना)',
      maintenance: 'सर्विसिंग व पुर्ज़े (सालाना)', parking: 'पार्किंग व टोल (सालाना)',
      calc: 'गणना करें', yearly: 'साल भर का ख़र्च', monthly: 'प्रति माह', perKm: 'प्रति किमी',
      breakdown: 'मद के हिसाब से', fuel: 'ईंधन', fixed: 'खड़ी गाड़ी पर भी चलने वाला', fuelShare: 'ईंधन का हिस्सा',
      fixedNote: 'ईंधन का हिस्सा छोटा हो, तो कम चलाने से कुल मुश्किल से घटेगा।',
      note: 'मुद्रा वही है जो आप डालें। गिरती क़ीमत शामिल नहीं।',
    },
  },
  'zh-hans': {
    title: '养车成本计算器',
    desc: '把油费、保险、税费和保养加在一起，算出一辆车每年、每月、每公里花多少',
    short: '一年养车要花多少',
    intro: [
      {
        h: '每年的账单比车价更重',
        p: '买车时盯着车价，但真正流走的钱是年年重复的那种：油费、保险、税费、保养、停车，一年又一年。把一年的加起来除以十二，"这辆车每月花我多少"就不再是猜的了——开上十年，重复的那一边常常超过当初的车价。',
      },
      {
        h: '有些钱，车停着也在花',
        p: '保险、税费和车位，开不开车都要交。如果这些固定项占了你总数的大头，少开车几乎降不了账单——能使上劲的是更便宜的保单、更便宜的车位，或者干脆问一句：这辆车配得上它占的钱吗。',
      },
      {
        h: '开得越多，每公里越便宜',
        p: '固定的那部分摊到你跑的每一公里上，所以一年只跑 5,000 公里的车，每公里成本可能是同一辆车跑 12,000 公里时的两倍还多。拿去和火车票比，诚实的数字是这个每公里成本——单程的油费只是它里面最小的一块。',
      },
    ],
    faq: [
      { q: '这里用的是什么货币？', a: '你填什么就是什么。每个金额栏都是一个朴素的年度数字，结果用同一个单位返回——对你住在哪里不作任何假设。' },
      { q: '我开的是电动车。', a: '把油耗填 0，油费那一行就空着；然后把一年的充电费用加进任何一个年度栏里——总数不在乎它坐在哪一行。年度数字可以用充电费用计算器算出来。' },
      { q: '折旧去哪儿了？', a: '不在总数里——而对较新的车，它往往是单项里最大的一笔：车一年掉的价，可能超过油费加保险。想把它算进去，就估一年的掉价，加到任何一个年度栏里。' },
    ],
    ui: {
      section: '你的车·一年', km: '每年里程（公里）', kmpl: '油耗（公里/升，电动车填 0）',
      fuelPrice: '每升油价', tax: '车辆税费（每年）', insurance: '保险（每年）',
      maintenance: '保养与配件（每年）', parking: '停车与过路费（每年）',
      calc: '计算', yearly: '一年的花费', monthly: '每月', perKm: '每公里',
      breakdown: '分项', fuel: '油费', fixed: '停着也在花的钱', fuelShare: '油费占比',
      fixedNote: '油费占比小，说明少开车也省不了多少。',
      note: '货币就是你填入的那种。不含折旧。',
    },
  },
  'zh-hant': {
    title: '養車成本計算機',
    desc: '把油錢、保險、稅費和保養加在一起，算出一輛車每年、每月、每公里花多少',
    short: '一年養車要花多少',
    intro: [
      {
        h: '每年的帳單比車價更重',
        p: '買車時盯著車價，但真正流走的錢是年年重複的那種：油錢、保險、稅費、保養、停車，一年又一年。把一年的加起來除以十二，「這輛車每月花我多少」就不再是猜的了——開上十年，重複的那一邊常常超過當初的車價。',
      },
      {
        h: '有些錢，車停著也在花',
        p: '保險、稅費和車位，開不開車都要繳。如果這些固定項占了你總數的大頭，少開車幾乎降不了帳單——能使上力的是更便宜的保單、更便宜的車位，或者乾脆問一句：這輛車配得上它占的錢嗎。',
      },
      {
        h: '開得越多，每公里越便宜',
        p: '固定的那部分攤到你跑的每一公里上，所以一年只跑 5,000 公里的車，每公里成本可能是同一輛車跑 12,000 公里時的兩倍還多。拿去和火車票比，誠實的數字是這個每公里成本——單程的油錢只是它裡面最小的一塊。',
      },
    ],
    faq: [
      { q: '這裡用的是什麼貨幣？', a: '你填什麼就是什麼。每個金額欄都是一個樸素的年度數字，結果用同一個單位返回——對你住在哪裡不作任何假設。' },
      { q: '我開的是電動車。', a: '把油耗填 0，油錢那一行就空著；然後把一年的充電費用加進任何一個年度欄裡——總數不在乎它坐在哪一行。年度數字可以用充電費用計算機算出來。' },
      { q: '折舊去哪兒了？', a: '不在總數裡——而對較新的車，它往往是單項裡最大的一筆：車一年掉的價，可能超過油錢加保險。想把它算進去，就估一年的掉價，加到任何一個年度欄裡。' },
    ],
    ui: {
      section: '你的車·一年', km: '每年里程（公里）', kmpl: '油耗（公里/公升，電動車填 0）',
      fuelPrice: '每公升油價', tax: '車輛稅費（每年）', insurance: '保險（每年）',
      maintenance: '保養與零件（每年）', parking: '停車與過路費（每年）',
      calc: '計算', yearly: '一年的花費', monthly: '每月', perKm: '每公里',
      breakdown: '分項', fuel: '油錢', fixed: '停著也在花的錢', fuelShare: '油錢占比',
      fixedNote: '油錢占比小，說明少開車也省不了多少。',
      note: '貨幣就是你填入的那種。不含折舊。',
    },
  },
};
