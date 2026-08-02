import type { CalcTable } from './types.ts';

/**
 * 길이 단위 변환기.
 *
 * 한국어판과 목록이 같다 — 아홉 개 모두 국제 정의가 있어서 나라를 타지 않는다.
 * 인치는 정확히 25.4mm, 마일은 정확히 1609.344m로 1959년에 정해졌다.
 */
export const UNIT_LENGTH: CalcTable = {
  en: {
    title: 'Length converter',
    desc: 'Convert mm, cm, m, km, inch, foot, yard, mile and nautical mile at once',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: 'One number, every unit',
        p: 'Enter a value once and all nine units update together. Converting in two steps — metres to feet, then feet to inches — is where rounding usually creeps in; here everything is derived from the same metre value.',
      },
      {
        h: 'The inch has been exact since 1959',
        p: 'The international yard and pound agreement fixed the inch at exactly 25.4 mm, the foot at 0.3048 m and the mile at 1609.344 m. Before that, the US and imperial inches differed slightly. A nautical mile is a separate thing again: exactly 1852 m, chosen to be about one minute of latitude.',
      },
    ],
    faq: [
      { q: 'Why is a nautical mile not the same as a mile?', a: 'A nautical mile is tied to the Earth, not to a foot. It is one minute of arc along a meridian, standardised as exactly 1852 m — about 15% longer than a statute mile.' },
      { q: 'Is the US inch the same as the UK inch?', a: 'Yes, since 1959. The US survey foot lingered for land surveying and was slightly longer, but it was officially retired at the end of 2022.' },
      { q: 'How precise are the results?', a: 'Eight significant figures. Very large or very small values switch to scientific notation instead of padding out zeros.' },
    ],
    ui: { input: 'Value to convert', number: 'Number', unit: 'Unit', convert: 'Convert', result: 'Result', entered: '(entered)', placeholder: 'e.g. 1' },
  },
  es: {
    title: 'Conversor de longitud',
    desc: 'Convierte mm, cm, m, km, pulgada, pie, yarda, milla y milla náutica a la vez',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: 'Un número, todas las unidades',
        p: 'Introduce un valor y las nueve unidades se actualizan juntas. Convertir en dos pasos —de metros a pies y luego a pulgadas— es justo donde se cuela el redondeo; aquí todo sale del mismo valor en metros.',
      },
      {
        h: 'La pulgada es exacta desde 1959',
        p: 'El acuerdo internacional de la yarda y la libra fijó la pulgada en exactamente 25,4 mm, el pie en 0,3048 m y la milla en 1609,344 m. Antes, la pulgada estadounidense y la imperial diferían ligeramente. La milla náutica es otra cosa: exactamente 1852 m, elegidos para equivaler a un minuto de latitud.',
      },
    ],
    faq: [
      { q: '¿Por qué la milla náutica no es igual que la milla?', a: 'La milla náutica está ligada a la Tierra, no al pie. Es un minuto de arco sobre un meridiano, normalizado en exactamente 1852 m: un 15% más larga que la milla terrestre.' },
      { q: '¿La pulgada estadounidense es igual que la británica?', a: 'Sí, desde 1959. El pie topográfico estadounidense siguió usándose en agrimensura y era algo más largo, pero se retiró oficialmente a finales de 2022.' },
      { q: '¿Con qué precisión se calcula?', a: 'Ocho cifras significativas. Los valores muy grandes o muy pequeños pasan a notación científica en lugar de llenarse de ceros.' },
    ],
    ui: { input: 'Valor a convertir', number: 'Número', unit: 'Unidad', convert: 'Convertir', result: 'Resultado', entered: '(introducido)', placeholder: 'ej. 1' },
  },
  'pt-br': {
    title: 'Conversor de comprimento',
    desc: 'Converta mm, cm, m, km, polegada, pé, jarda, milha e milha náutica de uma vez',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: 'Um número, todas as unidades',
        p: 'Digite um valor e as nove unidades mudam juntas. Converter em dois passos — de metros para pés e depois para polegadas — é exatamente onde o arredondamento entra; aqui tudo sai do mesmo valor em metros.',
      },
      {
        h: 'A polegada é exata desde 1959',
        p: 'O acordo internacional da jarda e da libra fixou a polegada em exatamente 25,4 mm, o pé em 0,3048 m e a milha em 1609,344 m. Antes disso, a polegada americana e a imperial eram levemente diferentes. A milha náutica é outra coisa: exatamente 1852 m, escolhidos para valer um minuto de latitude.',
      },
    ],
    faq: [
      { q: 'Por que a milha náutica não é igual à milha?', a: 'A milha náutica está ligada à Terra, não ao pé. É um minuto de arco sobre um meridiano, padronizado em exatamente 1852 m — cerca de 15% mais longa que a milha terrestre.' },
      { q: 'A polegada americana é igual à britânica?', a: 'É, desde 1959. O pé de agrimensura americano continuou em uso e era um pouco maior, mas foi oficialmente aposentado no fim de 2022.' },
      { q: 'Qual é a precisão do resultado?', a: 'Oito algarismos significativos. Valores muito grandes ou muito pequenos passam para notação científica em vez de encher de zeros.' },
    ],
    ui: { input: 'Valor a converter', number: 'Número', unit: 'Unidade', convert: 'Converter', result: 'Resultado', entered: '(digitado)', placeholder: 'ex. 1' },
  },
  ja: {
    title: '長さの単位変換',
    desc: 'mm・cm・m・km・インチ・フィート・ヤード・マイル・海里をまとめて変換',
    short: 'mm・cm・m・km・in・ft・yd・mi・NM',
    intro: [
      {
        h: '数字ひとつで九つの単位が動く',
        p: '値を一度入れれば九つの単位が同時に変わります。メートルからフィート、フィートからインチと二段階で換算すると、そこで丸めが入りがちです。ここでは全部が同じメートル値から出ています。',
      },
      {
        h: 'インチは1959年から「ちょうど」',
        p: '国際ヤード・ポンド協定で、1インチはちょうど 25.4 mm、1フィートは 0.3048 m、1マイルは 1609.344 m と決められました。それ以前はアメリカのインチとイギリスのインチがわずかに違っていました。海里はまた別で、ちょうど 1852 m — 緯度1分の長さに合わせた値です。',
      },
    ],
    faq: [
      { q: '海里はマイルと違うのですか。', a: '違います。海里はフィートではなく地球に結びついた単位で、子午線上の1分の弧にあたります。ちょうど 1852 m と決められており、陸のマイルより約15%長いです。' },
      { q: 'アメリカのインチとイギリスのインチは同じですか。', a: '1959年から同じです。土地測量用のUSサーベイフットはわずかに長いまま残っていましたが、2022年末に正式に廃止されました。' },
      { q: '結果の精度はどれくらいですか。', a: '有効数字8桁です。とても大きい値・小さい値はゼロを並べる代わりに指数表記に切り替わります。' },
    ],
    ui: { input: '変換する値', number: '数値', unit: '単位', convert: '変換する', result: '変換結果', entered: '（入力）', placeholder: '例: 1' },
  },
  de: {
    title: 'Längenumrechner',
    desc: 'mm, cm, m, km, Zoll, Fuß, Yard, Meile und Seemeile auf einmal umrechnen',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: 'Eine Zahl, alle Einheiten',
        p: 'Einmal einen Wert eingeben und alle neun Einheiten ändern sich gemeinsam. In zwei Schritten umzurechnen — Meter zu Fuß, dann Fuß zu Zoll — ist genau die Stelle, an der sich Rundung einschleicht. Hier kommt alles aus demselben Meterwert.',
      },
      {
        h: 'Der Zoll ist seit 1959 exakt',
        p: 'Das internationale Yard-und-Pfund-Abkommen legte den Zoll auf exakt 25,4 mm fest, den Fuß auf 0,3048 m und die Meile auf 1609,344 m. Davor unterschieden sich US-Zoll und imperialer Zoll geringfügig. Die Seemeile ist wieder etwas anderes: exakt 1852 m, gewählt als eine Bogenminute Breite.',
      },
    ],
    faq: [
      { q: 'Warum ist eine Seemeile nicht dasselbe wie eine Meile?', a: 'Die Seemeile hängt an der Erde, nicht am Fuß. Sie ist eine Bogenminute entlang eines Meridians und wurde auf exakt 1852 m normiert — rund 15 % länger als die Landmeile.' },
      { q: 'Ist der US-Zoll derselbe wie der britische?', a: 'Ja, seit 1959. Der US Survey Foot blieb in der Landvermessung noch etwas länger und war minimal größer, wurde aber Ende 2022 offiziell abgeschafft.' },
      { q: 'Wie genau wird gerechnet?', a: 'Auf acht signifikante Stellen. Sehr große oder sehr kleine Werte wechseln in die Exponentialschreibweise, statt Nullen aneinanderzureihen.' },
    ],
    ui: { input: 'Umzurechnender Wert', number: 'Zahl', unit: 'Einheit', convert: 'Umrechnen', result: 'Ergebnis', entered: '(eingegeben)', placeholder: 'z. B. 1' },
  },
  fr: {
    title: 'Convertisseur de longueur',
    desc: 'Convertir mm, cm, m, km, pouce, pied, yard, mile et mille marin d’un coup',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: 'Un nombre, toutes les unités',
        p: 'Saisissez une valeur et les neuf unités se mettent à jour ensemble. Convertir en deux temps — des mètres aux pieds, puis aux pouces — c’est précisément là que l’arrondi s’installe ; ici tout découle de la même valeur en mètres.',
      },
      {
        h: 'Le pouce est exact depuis 1959',
        p: 'L’accord international sur le yard et la livre a fixé le pouce à exactement 25,4 mm, le pied à 0,3048 m et le mile à 1609,344 m. Avant cela, le pouce américain et le pouce impérial différaient légèrement. Le mille marin est autre chose : exactement 1852 m, choisi pour valoir une minute de latitude.',
      },
    ],
    faq: [
      { q: 'Pourquoi le mille marin diffère-t-il du mile ?', a: 'Le mille marin est rattaché à la Terre, pas au pied. C’est une minute d’arc le long d’un méridien, normalisée à exactement 1852 m — environ 15 % de plus que le mile terrestre.' },
      { q: 'Le pouce américain est-il le même que le britannique ?', a: 'Oui, depuis 1959. Le US survey foot, un peu plus long, a subsisté en topographie mais a été officiellement abandonné fin 2022.' },
      { q: 'Quelle est la précision des résultats ?', a: 'Huit chiffres significatifs. Les valeurs très grandes ou très petites basculent en notation scientifique plutôt que d’aligner des zéros.' },
    ],
    ui: { input: 'Valeur à convertir', number: 'Nombre', unit: 'Unité', convert: 'Convertir', result: 'Résultat', entered: '(saisi)', placeholder: 'ex. 1' },
  },
  hi: {
    title: 'लंबाई कन्वर्टर',
    desc: 'mm, cm, m, km, इंच, फुट, गज़, मील और नॉटिकल मील एक साथ बदलें',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: 'एक संख्या, सारी इकाइयाँ',
        p: 'एक बार मान डालिए और नौ इकाइयाँ एक साथ बदल जाती हैं। दो चरणों में बदलना — मीटर से फुट, फिर फुट से इंच — वहीं गोलाई घुसती है; यहाँ सब कुछ एक ही मीटर मान से निकलता है।',
      },
      {
        h: 'इंच 1959 से बिल्कुल तय है',
        p: 'अंतरराष्ट्रीय यार्ड-एंड-पाउंड समझौते ने इंच को ठीक 25.4 mm, फुट को 0.3048 m और मील को 1609.344 m तय किया। उससे पहले अमेरिकी और इम्पीरियल इंच में हल्का फ़र्क़ था। नॉटिकल मील अलग चीज़ है: ठीक 1852 m, जो अक्षांश के एक मिनट के बराबर रखा गया।',
      },
    ],
    faq: [
      { q: 'नॉटिकल मील और मील एक क्यों नहीं?', a: 'नॉटिकल मील फुट से नहीं, पृथ्वी से जुड़ा है। यह याम्योत्तर पर एक मिनट का चाप है, जिसे ठीक 1852 m तय किया गया — ज़मीनी मील से लगभग 15% लंबा।' },
      { q: 'क्या अमेरिकी इंच ब्रिटिश इंच जैसा ही है?', a: 'हाँ, 1959 से। भूमि सर्वेक्षण वाला US survey foot थोड़ा लंबा था और चलता रहा, पर 2022 के अंत में उसे आधिकारिक रूप से हटा दिया गया।' },
      { q: 'परिणाम कितने सटीक हैं?', a: 'आठ सार्थक अंक तक। बहुत बड़े या बहुत छोटे मान शून्य भरने के बजाय वैज्ञानिक संकेतन में चले जाते हैं।' },
    ],
    ui: { input: 'बदलने के लिए मान', number: 'संख्या', unit: 'इकाई', convert: 'बदलें', result: 'परिणाम', entered: '(डाला हुआ)', placeholder: 'जैसे 1' },
  },
  'zh-hans': {
    title: '长度单位换算',
    desc: 'mm、cm、m、km、英寸、英尺、码、英里、海里一次全换',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: '一个数字，九个单位一起动',
        p: '输入一次，九个单位同时更新。分两步换算——米换英尺、英尺再换英寸——恰恰是舍入混进来的地方；这里全部从同一个米值算出。',
      },
      {
        h: '英寸从 1959 年起就是精确值',
        p: '国际码磅协定把 1 英寸定为正好 25.4 mm，1 英尺 0.3048 m，1 英里 1609.344 m。在此之前，美制英寸和英制英寸略有差别。海里又是另一回事：正好 1852 m，取的是纬度一分的长度。',
      },
    ],
    faq: [
      { q: '海里为什么和英里不一样？', a: '海里挂在地球上，不挂在英尺上。它是子午线上一分的弧长，标准定为正好 1852 m，比陆地英里长约 15%。' },
      { q: '美制英寸和英制英寸一样吗？', a: '1959 年起一样。土地测量用的美制测量英尺略长一些，一直沿用到 2022 年底才正式废止。' },
      { q: '结果有多精确？', a: '保留八位有效数字。特别大或特别小的值会切换成科学计数法，而不是排一长串零。' },
    ],
    ui: { input: '要换算的值', number: '数值', unit: '单位', convert: '换算', result: '换算结果', entered: '（输入）', placeholder: '例：1' },
  },
  'zh-hant': {
    title: '長度單位換算',
    desc: 'mm、cm、m、km、英吋、英尺、碼、英里、海里一次全換',
    short: 'mm · cm · m · km · in · ft · yd · mi · NM',
    intro: [
      {
        h: '一個數字，九個單位一起動',
        p: '輸入一次，九個單位同時更新。分兩步換算——公尺換英尺、英尺再換英吋——正是捨入混進來的地方；這裡全部從同一個公尺值算出。',
      },
      {
        h: '英吋從 1959 年起就是精確值',
        p: '國際碼磅協定把 1 英吋定為正好 25.4 mm，1 英尺 0.3048 m，1 英里 1609.344 m。在此之前，美制英吋和英制英吋略有差別。海里又是另一回事：正好 1852 m，取的是緯度一分的長度。',
      },
    ],
    faq: [
      { q: '海里為什麼和英里不一樣？', a: '海里掛在地球上，不掛在英尺上。它是子午線上一分的弧長，標準定為正好 1852 m，比陸地英里長約 15%。' },
      { q: '美制英吋和英制英吋一樣嗎？', a: '1959 年起一樣。土地測量用的美制測量英尺略長一些，一直沿用到 2022 年底才正式廢止。' },
      { q: '結果有多精確？', a: '保留八位有效數字。特別大或特別小的值會切換成科學記號，而不是排一長串零。' },
    ],
    ui: { input: '要換算的值', number: '數值', unit: '單位', convert: '換算', result: '換算結果', entered: '（輸入）', placeholder: '例：1' },
  },
};
