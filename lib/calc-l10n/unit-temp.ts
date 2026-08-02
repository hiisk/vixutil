import type { CalcTable } from './types.ts';

/**
 * 온도 변환기.
 *
 * 체감 설명 열한 줄과 기준 온도 여섯 줄이 ui에 들어 있다. 구간 경계(섭씨 값)는
 * 컴포넌트가 갖고, 여기에는 그 구간에 붙일 말만 둔다 — 경계를 언어마다 두면
 * 한 곳만 어긋나도 그 언어에서만 다른 등급이 나온다.
 *
 * 체온 36.5°C는 한국·일본에서 흔히 쓰는 기준값이고 영미권 교과서는 37°C를
 * 쓰지만, 둘 다 같은 범위를 가리키는 말이라 그대로 뒀다.
 */
export const UNIT_TEMP: CalcTable = {
  en: {
    title: 'Temperature converter',
    desc: 'Convert °C, °F, K and °R in both directions',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: 'Four scales, one number',
        p: 'Celsius and Fahrenheit both have arbitrary zero points, so converting between them needs a shift as well as a scale factor: °F = °C × 9/5 + 32. Kelvin and Rankine start at absolute zero instead, which is why they never go negative.',
      },
      {
        h: 'Where −40 comes from',
        p: 'There is exactly one temperature where Celsius and Fahrenheit agree, and it is −40°. Below that, Fahrenheit numbers are smaller; above it, larger. It is a handy sanity check when you are not sure a conversion went the right way.',
      },
    ],
    faq: [
      { q: 'Why does Kelvin have no degree sign?', a: 'Kelvin is an absolute unit, not a degree on a scale with an arbitrary zero. Since 1968 the correct form is “300 K”, not “300 °K”.' },
      { q: 'What is Rankine used for?', a: 'Rankine is Fahrenheit measured from absolute zero. It still turns up in some US engineering work — thermodynamics of engines and air conditioning — where Fahrenheit is the working unit.' },
      { q: 'Is absolute zero really −273.15 °C?', a: 'Yes, by definition. Since the 2019 SI redefinition the kelvin is fixed via the Boltzmann constant, and 0 K corresponds to exactly −273.15 °C.' },
    ],
    ui: {
      input: 'Enter temperature', value: 'Temperature', unit: 'Unit', convert: 'Convert',
      result: 'Result', feel: 'What it feels like', landmarks: 'Reference points', entered: '(entered)',
      d0: 'Extreme cold — frostbite risk', d1: 'Very cold — heavy coat essential',
      d2: 'Below freezing — watch for ice', d3: 'Chilly — a coat helps',
      d4: 'Cool and comfortable for moving around', d5: 'Comfortable indoor range',
      d6: 'Warm, tipping into hot', d7: 'Around body temperature',
      d8: 'Hot — heat exhaustion risk', d9: 'Above the boiling point of water',
      d10: 'Extremely high',
      m0: 'Absolute zero', m1: '−40 °C = −40 °F', m2: 'Water freezes',
      m3: 'Standard room temperature', m4: 'Human body', m5: 'Water boils',
    },
  },
  es: {
    title: 'Conversor de temperatura',
    desc: 'Convierte °C, °F, K y °R en ambos sentidos',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: 'Cuatro escalas, un número',
        p: 'Celsius y Fahrenheit tienen ceros arbitrarios, así que pasar de una a otra exige un desplazamiento además de un factor: °F = °C × 9/5 + 32. Kelvin y Rankine, en cambio, arrancan en el cero absoluto, por eso nunca son negativas.',
      },
      {
        h: 'De dónde sale el −40',
        p: 'Hay exactamente una temperatura en la que Celsius y Fahrenheit coinciden: −40°. Por debajo, los números Fahrenheit son menores; por encima, mayores. Sirve de comprobación rápida cuando dudas si la conversión fue en el sentido correcto.',
      },
    ],
    faq: [
      { q: '¿Por qué el kelvin no lleva símbolo de grado?', a: 'El kelvin es una unidad absoluta, no un grado sobre una escala con cero arbitrario. Desde 1968 la forma correcta es «300 K», no «300 °K».' },
      { q: '¿Para qué se usa el Rankine?', a: 'Rankine es Fahrenheit medido desde el cero absoluto. Aún aparece en ingeniería estadounidense —termodinámica de motores y climatización— donde se trabaja en Fahrenheit.' },
      { q: '¿El cero absoluto es exactamente −273,15 °C?', a: 'Sí, por definición. Desde la redefinición del SI de 2019 el kelvin se fija mediante la constante de Boltzmann, y 0 K corresponde exactamente a −273,15 °C.' },
    ],
    ui: {
      input: 'Introduce la temperatura', value: 'Temperatura', unit: 'Unidad', convert: 'Convertir',
      result: 'Resultado', feel: 'Cómo se siente', landmarks: 'Puntos de referencia', entered: '(introducido)',
      d0: 'Frío extremo — riesgo de congelación', d1: 'Muy frío — abrigo grueso imprescindible',
      d2: 'Bajo cero — cuidado con el hielo', d3: 'Fresco — conviene abrigo',
      d4: 'Fresco y cómodo para moverse', d5: 'Rango cómodo en interiores',
      d6: 'Cálido, tirando a caluroso', d7: 'En torno a la temperatura corporal',
      d8: 'Calor — riesgo de golpe de calor', d9: 'Por encima del punto de ebullición del agua',
      d10: 'Extremadamente alta',
      m0: 'Cero absoluto', m1: '−40 °C = −40 °F', m2: 'El agua se congela',
      m3: 'Temperatura ambiente estándar', m4: 'Cuerpo humano', m5: 'El agua hierve',
    },
  },
  'pt-br': {
    title: 'Conversor de temperatura',
    desc: 'Converta °C, °F, K e °R nos dois sentidos',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: 'Quatro escalas, um número',
        p: 'Celsius e Fahrenheit têm zeros arbitrários, então passar de uma para a outra exige um deslocamento além do fator: °F = °C × 9/5 + 32. Já Kelvin e Rankine começam no zero absoluto, por isso nunca ficam negativas.',
      },
      {
        h: 'De onde vem o −40',
        p: 'Existe exatamente uma temperatura em que Celsius e Fahrenheit coincidem: −40°. Abaixo dela os números Fahrenheit são menores; acima, maiores. É uma conferência rápida quando você não tem certeza se converteu para o lado certo.',
      },
    ],
    faq: [
      { q: 'Por que o kelvin não leva símbolo de grau?', a: 'O kelvin é uma unidade absoluta, não um grau numa escala de zero arbitrário. Desde 1968 a forma correta é “300 K”, e não “300 °K”.' },
      { q: 'Para que serve o Rankine?', a: 'Rankine é Fahrenheit contado a partir do zero absoluto. Ainda aparece em engenharia nos EUA — termodinâmica de motores e climatização — onde se trabalha em Fahrenheit.' },
      { q: 'O zero absoluto é mesmo −273,15 °C?', a: 'É, por definição. Desde a redefinição do SI em 2019 o kelvin é fixado pela constante de Boltzmann, e 0 K corresponde exatamente a −273,15 °C.' },
    ],
    ui: {
      input: 'Digite a temperatura', value: 'Temperatura', unit: 'Unidade', convert: 'Converter',
      result: 'Resultado', feel: 'Como se sente', landmarks: 'Pontos de referência', entered: '(digitado)',
      d0: 'Frio extremo — risco de congelamento', d1: 'Muito frio — casaco pesado é essencial',
      d2: 'Abaixo de zero — cuidado com o gelo', d3: 'Friozinho — melhor levar casaco',
      d4: 'Fresco e confortável para se movimentar', d5: 'Faixa confortável em ambiente fechado',
      d6: 'Quente, indo para o calor forte', d7: 'Perto da temperatura do corpo',
      d8: 'Calor — risco de exaustão pelo calor', d9: 'Acima do ponto de ebulição da água',
      d10: 'Extremamente alta',
      m0: 'Zero absoluto', m1: '−40 °C = −40 °F', m2: 'A água congela',
      m3: 'Temperatura ambiente padrão', m4: 'Corpo humano', m5: 'A água ferve',
    },
  },
  ja: {
    title: '温度の単位変換',
    desc: '摂氏・華氏・ケルビン・ランキンを相互に変換',
    short: '°C・°F・K・°R',
    intro: [
      {
        h: '四つの目盛りをひとつの数字から',
        p: '摂氏と華氏はどちらも零点が人が決めたものなので、行き来には倍率だけでなくずらしも要ります — °F = °C × 9/5 + 32。ケルビンとランキンは絶対零度から始まるので、マイナスになりません。',
      },
      {
        h: '−40 という数字',
        p: '摂氏と華氏がぴったり一致する温度がひとつだけあります。−40° です。それより下では華氏の数字のほうが小さく、上では大きくなります。換算の向きを間違えていないかの確かめに使えます。',
      },
    ],
    faq: [
      { q: 'ケルビンに度の記号が付かないのはなぜですか。', a: 'ケルビンは絶対単位で、零点を人が決めた目盛りの「度」ではないからです。1968年から「300 K」が正しい書き方で、「300 °K」とは書きません。' },
      { q: 'ランキンはどこで使いますか。', a: '絶対零度から測った華氏です。アメリカの工学、とくにエンジンや空調の熱力学で今も使われます。華氏で仕事をする現場だからです。' },
      { q: '絶対零度は本当に −273.15 °C ですか。', a: 'そうです。定義としてそうなっています。2019年のSI改定でケルビンはボルツマン定数で決まるようになり、0 K はちょうど −273.15 °C にあたります。' },
    ],
    ui: {
      input: '温度を入力', value: '温度', unit: '単位', convert: '変換する',
      result: '変換結果', feel: '体感の目安', landmarks: '目印になる温度', entered: '（入力）',
      d0: '極寒 — 凍傷に注意', d1: 'かなり寒い — 厚手のコートが要る',
      d2: '氷点下 — 路面の凍結に注意', d3: '肌寒い — 上着があるとよい',
      d4: '涼しくて動きやすい', d5: '室内で快適な範囲',
      d6: '暖かく、暑さに寄っていく', d7: '体温くらい',
      d8: '高温 — 熱中症に注意', d9: '水が沸く温度より上',
      d10: 'とても高い',
      m0: '絶対零度', m1: '−40 °C = −40 °F', m2: '水が凍る',
      m3: '標準的な室温', m4: '人の体温', m5: '水が沸く',
    },
  },
  de: {
    title: 'Temperaturumrechner',
    desc: '°C, °F, K und °R in beide Richtungen umrechnen',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: 'Vier Skalen aus einer Zahl',
        p: 'Celsius und Fahrenheit haben beide einen willkürlich gesetzten Nullpunkt, deshalb braucht der Wechsel zwischen ihnen neben dem Faktor auch eine Verschiebung: °F = °C × 9/5 + 32. Kelvin und Rankine beginnen dagegen beim absoluten Nullpunkt und werden nie negativ.',
      },
      {
        h: 'Woher die −40 kommt',
        p: 'Es gibt genau eine Temperatur, bei der Celsius und Fahrenheit übereinstimmen: −40°. Darunter sind die Fahrenheit-Zahlen kleiner, darüber größer. Ein praktischer Test, wenn man unsicher ist, ob man in die richtige Richtung umgerechnet hat.',
      },
    ],
    faq: [
      { q: 'Warum steht beim Kelvin kein Gradzeichen?', a: 'Kelvin ist eine absolute Einheit und kein Grad auf einer Skala mit willkürlichem Nullpunkt. Seit 1968 schreibt man „300 K“, nicht „300 °K“.' },
      { q: 'Wofür braucht man Rankine?', a: 'Rankine ist Fahrenheit, vom absoluten Nullpunkt aus gezählt. In der US-Technik taucht es weiterhin auf — Thermodynamik von Motoren und Klimatechnik —, wo in Fahrenheit gerechnet wird.' },
      { q: 'Ist der absolute Nullpunkt wirklich −273,15 °C?', a: 'Ja, per Definition. Seit der SI-Neudefinition 2019 ist das Kelvin über die Boltzmann-Konstante festgelegt, und 0 K entspricht exakt −273,15 °C.' },
    ],
    ui: {
      input: 'Temperatur eingeben', value: 'Temperatur', unit: 'Einheit', convert: 'Umrechnen',
      result: 'Ergebnis', feel: 'So fühlt es sich an', landmarks: 'Bezugspunkte', entered: '(eingegeben)',
      d0: 'Extreme Kälte — Erfrierungsgefahr', d1: 'Sehr kalt — dicker Mantel nötig',
      d2: 'Unter null — auf Glätte achten', d3: 'Kühl — eine Jacke hilft',
      d4: 'Angenehm frisch zum Draußensein', d5: 'Angenehmer Innenraumbereich',
      d6: 'Warm, kippt ins Heiße', d7: 'Etwa Körpertemperatur',
      d8: 'Heiß — Gefahr von Hitzeerschöpfung', d9: 'Über dem Siedepunkt von Wasser',
      d10: 'Sehr hoch',
      m0: 'Absoluter Nullpunkt', m1: '−40 °C = −40 °F', m2: 'Wasser gefriert',
      m3: 'Normale Raumtemperatur', m4: 'Menschlicher Körper', m5: 'Wasser siedet',
    },
  },
  fr: {
    title: 'Convertisseur de température',
    desc: 'Convertir °C, °F, K et °R dans les deux sens',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: 'Quatre échelles à partir d’un nombre',
        p: 'Celsius et Fahrenheit ont chacune un zéro fixé arbitrairement : passer de l’une à l’autre demande donc un décalage en plus d’un facteur — °F = °C × 9/5 + 32. Kelvin et Rankine partent du zéro absolu et ne deviennent jamais négatives.',
      },
      {
        h: 'D’où vient le −40',
        p: 'Il existe exactement une température où Celsius et Fahrenheit coïncident : −40°. En dessous, les nombres Fahrenheit sont plus petits ; au-dessus, plus grands. C’est un contrôle rapide quand on doute du sens de la conversion.',
      },
    ],
    faq: [
      { q: 'Pourquoi le kelvin n’a-t-il pas de symbole degré ?', a: 'Le kelvin est une unité absolue, pas un degré sur une échelle à zéro arbitraire. Depuis 1968 on écrit « 300 K » et non « 300 °K ».' },
      { q: 'À quoi sert le Rankine ?', a: 'Le Rankine, c’est du Fahrenheit compté depuis le zéro absolu. On le rencontre encore dans l’ingénierie américaine — thermodynamique des moteurs, climatisation — là où l’on travaille en Fahrenheit.' },
      { q: 'Le zéro absolu vaut-il vraiment −273,15 °C ?', a: 'Oui, par définition. Depuis la refonte du SI en 2019, le kelvin est fixé via la constante de Boltzmann et 0 K correspond exactement à −273,15 °C.' },
    ],
    ui: {
      input: 'Saisir la température', value: 'Température', unit: 'Unité', convert: 'Convertir',
      result: 'Résultat', feel: 'Ressenti', landmarks: 'Repères', entered: '(saisi)',
      d0: 'Froid extrême — risque de gelures', d1: 'Très froid — manteau épais indispensable',
      d2: 'Sous zéro — attention au verglas', d3: 'Frais — une veste s’impose',
      d4: 'Frais et agréable pour bouger', d5: 'Plage confortable en intérieur',
      d6: 'Chaud, qui bascule vers la chaleur', d7: 'Autour de la température du corps',
      d8: 'Chaleur — risque d’épuisement', d9: 'Au-dessus du point d’ébullition de l’eau',
      d10: 'Très élevée',
      m0: 'Zéro absolu', m1: '−40 °C = −40 °F', m2: 'L’eau gèle',
      m3: 'Température ambiante standard', m4: 'Corps humain', m5: 'L’eau bout',
    },
  },
  hi: {
    title: 'तापमान कन्वर्टर',
    desc: '°C, °F, K और °R को दोनों दिशाओं में बदलें',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: 'एक संख्या से चार पैमाने',
        p: 'सेल्सियस और फ़ारेनहाइट दोनों का शून्य मनमाने ढंग से तय हुआ है, इसलिए एक से दूसरे में जाने के लिए गुणक के साथ खिसकाव भी चाहिए — °F = °C × 9/5 + 32। केल्विन और रैंकिन परम शून्य से शुरू होते हैं, इसीलिए वे कभी ऋणात्मक नहीं होते।',
      },
      {
        h: '−40 कहाँ से आता है',
        p: 'ठीक एक तापमान ऐसा है जहाँ सेल्सियस और फ़ारेनहाइट बराबर होते हैं — −40°। उससे नीचे फ़ारेनहाइट की संख्या छोटी होती है, ऊपर बड़ी। जब यह पक्का न हो कि रूपांतरण सही दिशा में हुआ, तब यह जल्दी जाँचने का तरीका है।',
      },
    ],
    faq: [
      { q: 'केल्विन के साथ डिग्री का चिह्न क्यों नहीं लगता?', a: 'केल्विन एक निरपेक्ष इकाई है, मनमाने शून्य वाले पैमाने की डिग्री नहीं। 1968 से सही रूप “300 K” है, “300 °K” नहीं।' },
      { q: 'रैंकिन कहाँ काम आता है?', a: 'रैंकिन यानी परम शून्य से गिना गया फ़ारेनहाइट। अमेरिकी इंजीनियरिंग में — इंजन और एयर कंडीशनिंग की ऊष्मागतिकी में — यह आज भी मिलता है, क्योंकि वहाँ काम फ़ारेनहाइट में होता है।' },
      { q: 'क्या परम शून्य सचमुच −273.15 °C है?', a: 'हाँ, परिभाषा से। 2019 की SI पुनर्परिभाषा के बाद केल्विन बोल्ट्ज़मान स्थिरांक से तय होता है, और 0 K ठीक −273.15 °C के बराबर है।' },
    ],
    ui: {
      input: 'तापमान डालें', value: 'तापमान', unit: 'इकाई', convert: 'बदलें',
      result: 'परिणाम', feel: 'कैसा महसूस होगा', landmarks: 'संदर्भ बिंदु', entered: '(डाला हुआ)',
      d0: 'अत्यधिक ठंड — शीतदंश का ख़तरा', d1: 'बहुत ठंडा — मोटा कोट ज़रूरी',
      d2: 'शून्य से नीचे — बर्फ़ जमने का ध्यान रखें', d3: 'ठंडक — जैकेट काम आएगी',
      d4: 'ठंडा और घूमने-फिरने लायक', d5: 'घर के भीतर आरामदेह दायरा',
      d6: 'गरम, गर्मी की ओर बढ़ता हुआ', d7: 'शरीर के तापमान के आसपास',
      d8: 'गर्मी — लू लगने का ख़तरा', d9: 'पानी के उबलने के बिंदु से ऊपर',
      d10: 'बहुत अधिक',
      m0: 'परम शून्य', m1: '−40 °C = −40 °F', m2: 'पानी जमता है',
      m3: 'सामान्य कमरे का तापमान', m4: 'मानव शरीर', m5: 'पानी उबलता है',
    },
  },
  'zh-hans': {
    title: '温度单位换算',
    desc: '摄氏、华氏、开尔文、兰氏互相换算',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: '一个数字，四种刻度',
        p: '摄氏和华氏的零点都是人定的，所以互相换算除了倍数还要加一个平移：°F = °C × 9/5 + 32。开尔文和兰氏从绝对零度起算，因此永远不会是负数。',
      },
      {
        h: '−40 是怎么来的',
        p: '只有一个温度让摄氏和华氏读数相同，就是 −40°。低于它，华氏的数字更小；高于它，更大。当你不确定换算方向对不对时，这是个很快的检验。',
      },
    ],
    faq: [
      { q: '开尔文为什么不带度的符号？', a: '开尔文是绝对单位，不是零点由人定的刻度上的“度”。1968 年起正确写法是“300 K”，不是“300 °K”。' },
      { q: '兰氏温标用在哪里？', a: '兰氏就是从绝对零度算起的华氏。美国工程界仍在用——发动机和空调的热力学计算——因为那里的工作单位是华氏。' },
      { q: '绝对零度真的是 −273.15 °C 吗？', a: '是，这是定义。2019 年 SI 重新定义后，开尔文由玻尔兹曼常数确定，0 K 正好对应 −273.15 °C。' },
    ],
    ui: {
      input: '输入温度', value: '温度', unit: '单位', convert: '换算',
      result: '换算结果', feel: '体感说明', landmarks: '参考温度', entered: '（输入）',
      d0: '极寒——当心冻伤', d1: '很冷——厚外套必备',
      d2: '零下——注意结冰', d3: '有些凉——需要外套',
      d4: '凉爽，适合活动', d5: '室内舒适区间',
      d6: '温暖，开始偏热', d7: '接近体温',
      d8: '高温——当心中暑', d9: '高于水的沸点',
      d10: '非常高',
      m0: '绝对零度', m1: '−40 °C = −40 °F', m2: '水结冰',
      m3: '标准室温', m4: '人体体温', m5: '水沸腾',
    },
  },
  'zh-hant': {
    title: '溫度單位換算',
    desc: '攝氏、華氏、克耳文、蘭氏互相換算',
    short: '°C · °F · K · °R',
    intro: [
      {
        h: '一個數字，四種刻度',
        p: '攝氏和華氏的零點都是人定的，所以互相換算除了倍數還要加一個平移：°F = °C × 9/5 + 32。克耳文和蘭氏從絕對零度起算，因此永遠不會是負數。',
      },
      {
        h: '−40 是怎麼來的',
        p: '只有一個溫度讓攝氏和華氏讀數相同，就是 −40°。低於它，華氏的數字更小；高於它，更大。當你不確定換算方向對不對時，這是個很快的檢驗。',
      },
    ],
    faq: [
      { q: '克耳文為什麼不帶度的符號？', a: '克耳文是絕對單位，不是零點由人定的刻度上的「度」。1968 年起正確寫法是「300 K」，不是「300 °K」。' },
      { q: '蘭氏溫標用在哪裡？', a: '蘭氏就是從絕對零度算起的華氏。美國工程界仍在用——引擎和空調的熱力學計算——因為那裡的工作單位是華氏。' },
      { q: '絕對零度真的是 −273.15 °C 嗎？', a: '是，這是定義。2019 年 SI 重新定義後，克耳文由波茲曼常數決定，0 K 正好對應 −273.15 °C。' },
    ],
    ui: {
      input: '輸入溫度', value: '溫度', unit: '單位', convert: '換算',
      result: '換算結果', feel: '體感說明', landmarks: '參考溫度', entered: '（輸入）',
      d0: '極寒——當心凍傷', d1: '很冷——厚外套必備',
      d2: '零下——注意結冰', d3: '有些涼——需要外套',
      d4: '涼爽，適合活動', d5: '室內舒適區間',
      d6: '溫暖，開始偏熱', d7: '接近體溫',
      d8: '高溫——當心中暑', d9: '高於水的沸點',
      d10: '非常高',
      m0: '絕對零度', m1: '−40 °C = −40 °F', m2: '水結冰',
      m3: '標準室溫', m4: '人體體溫', m5: '水沸騰',
    },
  },
};
