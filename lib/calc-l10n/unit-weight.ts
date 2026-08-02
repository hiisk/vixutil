import type { CalcTable } from './types.ts';

/**
 * 무게 단위 변환기.
 *
 * 한국어판에는 근(600g)·돈(3.75g)·냥(37.5g)이 있는데 여기서는 뺐다. 중국어로
 * 옮기면 근이 斤가 되는데, 중국 시근(市斤)은 500g이라 값이 달라진다. 같은
 * 글자에 다른 무게가 걸려 있으므로 "번역"이 곧 오답이 되는 자리다.
 *
 * 대신 어디서나 같은 열 가지 — 밀리그램부터 스톤까지 — 만 남겼다. 스톤은
 * 영국·아일랜드에서 몸무게에 쓰는 단위라 빼지 않았다.
 */
export const UNIT_WEIGHT: CalcTable = {
  en: {
    title: 'Weight converter',
    desc: 'Convert mg, g, kg, t, oz, lb and stone all at once',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: 'Metric and imperial in one place',
        p: 'Type one number and every unit updates at once, so you never chain two conversions and lose precision on the way. A pound is exactly 0.45359237 kg and an ounce exactly 1/16 of that — those are defined values, not measurements, so the conversion is exact.',
      },
      {
        h: 'Where stone still shows up',
        p: 'Body weight in the UK and Ireland is usually given in stone and pounds — 11 st 4 lb rather than 71.7 kg. One stone is 14 pounds, about 6.35 kg. Outside those two countries you will rarely meet it.',
      },
    ],
    faq: [
      { q: 'Is a pound exactly 0.45359237 kg?', a: 'Yes. The international avoirdupois pound was defined as exactly that in 1959, so pound–kilogram conversions carry no rounding of their own.' },
      { q: 'Is a metric ton the same as a US ton?', a: 'No. The tonne here is 1,000 kg. A US short ton is 2,000 lb (about 907 kg) and a UK long ton is 2,240 lb (about 1,016 kg).' },
      { q: 'Why does the result sometimes show many digits?', a: 'Values are kept to eight significant figures. Very large or very small numbers switch to scientific notation so the digits that matter stay readable.' },
    ],
    ui: { input: 'Value to convert', number: 'Number', unit: 'Unit', convert: 'Convert', result: 'Result', entered: '(entered)', placeholder: 'e.g. 1' },
  },
  es: {
    title: 'Conversor de peso',
    desc: 'Convierte mg, g, kg, t, oz, lb y stone a la vez',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: 'Sistema métrico e imperial juntos',
        p: 'Escribe un número y todas las unidades se actualizan a la vez, así no encadenas dos conversiones y pierdes precisión por el camino. Una libra son exactamente 0,45359237 kg y una onza exactamente 1/16 de eso: son valores definidos, no medidos, así que la conversión es exacta.',
      },
      {
        h: 'Dónde se sigue usando el stone',
        p: 'En el Reino Unido e Irlanda el peso corporal se suele dar en stones y libras — 11 st 4 lb en vez de 71,7 kg. Un stone son 14 libras, unos 6,35 kg. Fuera de esos dos países casi no aparece.',
      },
    ],
    faq: [
      { q: '¿Una libra son exactamente 0,45359237 kg?', a: 'Sí. La libra avoirdupois internacional se definió así en 1959, de modo que la conversión entre libras y kilos no añade ningún redondeo propio.' },
      { q: '¿La tonelada métrica es igual que la estadounidense?', a: 'No. Aquí la tonelada son 1.000 kg. La tonelada corta estadounidense son 2.000 lb (unos 907 kg) y la larga británica 2.240 lb (unos 1.016 kg).' },
      { q: '¿Por qué a veces salen tantos dígitos?', a: 'Se conservan ocho cifras significativas. Los números muy grandes o muy pequeños pasan a notación científica para que se lean las cifras que importan.' },
    ],
    ui: { input: 'Valor a convertir', number: 'Número', unit: 'Unidad', convert: 'Convertir', result: 'Resultado', entered: '(introducido)', placeholder: 'ej. 1' },
  },
  'pt-br': {
    title: 'Conversor de peso',
    desc: 'Converta mg, g, kg, t, oz, lb e stone de uma vez',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: 'Métrico e imperial no mesmo lugar',
        p: 'Digite um número e todas as unidades mudam juntas, então você não encadeia duas conversões e perde precisão no caminho. Uma libra tem exatamente 0,45359237 kg e uma onça exatamente 1/16 disso — são valores definidos, não medidos, então a conversão é exata.',
      },
      {
        h: 'Onde o stone ainda aparece',
        p: 'No Reino Unido e na Irlanda o peso corporal costuma vir em stones e libras — 11 st 4 lb em vez de 71,7 kg. Um stone são 14 libras, cerca de 6,35 kg. Fora desses dois países quase não se vê.',
      },
    ],
    faq: [
      { q: 'Uma libra tem exatamente 0,45359237 kg?', a: 'Tem. A libra avoirdupois internacional foi definida assim em 1959, então a conversão entre libra e quilo não acrescenta arredondamento nenhum.' },
      { q: 'A tonelada métrica é igual à americana?', a: 'Não. Aqui a tonelada são 1.000 kg. A tonelada curta americana são 2.000 lb (cerca de 907 kg) e a longa britânica 2.240 lb (cerca de 1.016 kg).' },
      { q: 'Por que às vezes aparecem tantos dígitos?', a: 'São mantidos oito algarismos significativos. Números muito grandes ou muito pequenos passam para notação científica para que os dígitos que importam continuem legíveis.' },
    ],
    ui: { input: 'Valor a converter', number: 'Número', unit: 'Unidade', convert: 'Converter', result: 'Resultado', entered: '(digitado)', placeholder: 'ex. 1' },
  },
  ja: {
    title: '重さの単位変換',
    desc: 'mg・g・kg・t・oz・lb・ストーンをまとめて変換',
    short: 'mg・g・kg・t・oz・lb・stone',
    intro: [
      {
        h: 'メートル法とヤード・ポンド法をまとめて',
        p: '数字をひとつ入れると全部の単位が同時に変わります。二段階で換算して途中で桁を落とす、ということが起きません。1ポンドはちょうど 0.45359237 kg、1オンスはその 1/16 ちょうど — 測った値ではなく決めた値なので、換算に誤差は入りません。',
      },
      {
        h: 'ストーンが今も使われる場所',
        p: 'イギリスとアイルランドでは体重をストーンとポンドで言います。71.7 kg ではなく 11 st 4 lb という具合です。1ストーンは14ポンド、約 6.35 kg。この二か国の外ではまず見かけません。',
      },
    ],
    faq: [
      { q: '1ポンドはちょうど 0.45359237 kg ですか。', a: 'そうです。国際ヤード・ポンドは1959年にその値と定められました。ポンドとキログラムの換算に、この計算機側の丸めは入りません。' },
      { q: 'メートルトンとアメリカのトンは同じですか。', a: '違います。ここでのトンは 1,000 kg です。アメリカのショートトンは 2,000 lb（約 907 kg）、イギリスのロングトンは 2,240 lb（約 1,016 kg）です。' },
      { q: 'ときどき桁がとても多く出るのはなぜですか。', a: '有効数字8桁で保っているためです。とても大きい値・小さい値は指数表記に切り替わり、意味のある桁が読めるようにしています。' },
    ],
    ui: { input: '変換する値', number: '数値', unit: '単位', convert: '変換する', result: '変換結果', entered: '（入力）', placeholder: '例: 1' },
  },
  de: {
    title: 'Gewichtsumrechner',
    desc: 'mg, g, kg, t, oz, lb und Stone auf einmal umrechnen',
    short: 'mg · g · kg · t · oz · lb · Stone',
    intro: [
      {
        h: 'Metrisch und angloamerikanisch nebeneinander',
        p: 'Eine Zahl eingeben und alle Einheiten ändern sich gleichzeitig — so hängst du nicht zwei Umrechnungen hintereinander und verlierst unterwegs Stellen. Ein Pfund sind exakt 0,45359237 kg und eine Unze exakt 1/16 davon. Das sind festgelegte, keine gemessenen Werte, die Umrechnung ist also exakt.',
      },
      {
        h: 'Wo Stone noch vorkommt',
        p: 'In Großbritannien und Irland wird das Körpergewicht meist in Stone und Pfund angegeben — 11 st 4 lb statt 71,7 kg. Ein Stone sind 14 Pfund, rund 6,35 kg. Außerhalb dieser beiden Länder begegnet es einem kaum.',
      },
    ],
    faq: [
      { q: 'Sind ein Pfund genau 0,45359237 kg?', a: 'Ja. Das internationale Avoirdupois-Pfund wurde 1959 genau so festgelegt, deshalb kommt bei Pfund–Kilogramm keine eigene Rundung dazu.' },
      { q: 'Ist eine metrische Tonne dasselbe wie eine US-Tonne?', a: 'Nein. Die Tonne hier sind 1.000 kg. Die US-Short-Ton sind 2.000 lb (etwa 907 kg), die britische Long Ton 2.240 lb (etwa 1.016 kg).' },
      { q: 'Warum stehen manchmal so viele Stellen da?', a: 'Es werden acht signifikante Stellen gehalten. Sehr große oder sehr kleine Zahlen wechseln in die Exponentialschreibweise, damit die Stellen lesbar bleiben, auf die es ankommt.' },
    ],
    ui: { input: 'Umzurechnender Wert', number: 'Zahl', unit: 'Einheit', convert: 'Umrechnen', result: 'Ergebnis', entered: '(eingegeben)', placeholder: 'z. B. 1' },
  },
  fr: {
    title: 'Convertisseur de poids',
    desc: 'Convertir mg, g, kg, t, oz, lb et stone d’un coup',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: 'Métrique et impérial au même endroit',
        p: 'Tapez un nombre et toutes les unités se mettent à jour ensemble : vous n’enchaînez pas deux conversions en perdant des chiffres au passage. Une livre vaut exactement 0,45359237 kg et une once exactement 1/16 de cela — ce sont des valeurs définies, pas mesurées, donc la conversion est exacte.',
      },
      {
        h: 'Où le stone sert encore',
        p: 'Au Royaume-Uni et en Irlande, le poids corporel se dit en stones et livres — 11 st 4 lb plutôt que 71,7 kg. Un stone vaut 14 livres, environ 6,35 kg. En dehors de ces deux pays, on ne le croise presque jamais.',
      },
    ],
    faq: [
      { q: 'Une livre fait-elle exactement 0,45359237 kg ?', a: 'Oui. La livre avoirdupois internationale a été définie ainsi en 1959 ; la conversion livre–kilogramme n’ajoute donc aucun arrondi.' },
      { q: 'La tonne métrique est-elle la tonne américaine ?', a: 'Non. La tonne ici vaut 1 000 kg. La short ton américaine vaut 2 000 lb (environ 907 kg) et la long ton britannique 2 240 lb (environ 1 016 kg).' },
      { q: 'Pourquoi tant de chiffres parfois ?', a: 'Huit chiffres significatifs sont conservés. Les nombres très grands ou très petits basculent en notation scientifique pour que les chiffres utiles restent lisibles.' },
    ],
    ui: { input: 'Valeur à convertir', number: 'Nombre', unit: 'Unité', convert: 'Convertir', result: 'Résultat', entered: '(saisi)', placeholder: 'ex. 1' },
  },
  hi: {
    title: 'वज़न कन्वर्टर',
    desc: 'mg, g, kg, t, oz, lb और stone एक साथ बदलें',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: 'मीट्रिक और इम्पीरियल एक ही जगह',
        p: 'एक संख्या डालिए और सारी इकाइयाँ एक साथ बदल जाती हैं — दो बार बदलकर बीच में अंक गँवाने की नौबत नहीं आती। एक पाउंड ठीक 0.45359237 kg है और एक औंस उसका ठीक 1/16। ये नापे हुए नहीं, तय किए हुए मान हैं, इसलिए रूपांतरण बिल्कुल सटीक है।',
      },
      {
        h: 'stone आज कहाँ दिखता है',
        p: 'ब्रिटेन और आयरलैंड में शरीर का वज़न stone और पाउंड में बताया जाता है — 71.7 kg के बजाय 11 st 4 lb। एक stone यानी 14 पाउंड, लगभग 6.35 kg। इन दो देशों के बाहर यह शायद ही मिलता है।',
      },
    ],
    faq: [
      { q: 'क्या एक पाउंड ठीक 0.45359237 kg होता है?', a: 'हाँ। अंतरराष्ट्रीय एवॉर्डुपॉइस पाउंड 1959 में ठीक यही तय किया गया था, इसलिए पाउंड–किलोग्राम के बीच इस कैलकुलेटर की अपनी कोई गोलाई नहीं जुड़ती।' },
      { q: 'क्या मीट्रिक टन और अमेरिकी टन एक ही हैं?', a: 'नहीं। यहाँ टन 1,000 kg है। अमेरिकी शॉर्ट टन 2,000 lb (लगभग 907 kg) और ब्रिटिश लॉन्ग टन 2,240 lb (लगभग 1,016 kg) होता है।' },
      { q: 'कभी-कभी इतने अंक क्यों दिखते हैं?', a: 'आठ सार्थक अंक रखे जाते हैं। बहुत बड़ी या बहुत छोटी संख्याएँ वैज्ञानिक संकेतन में बदल जाती हैं ताकि काम के अंक पढ़े जा सकें।' },
    ],
    ui: { input: 'बदलने के लिए मान', number: 'संख्या', unit: 'इकाई', convert: 'बदलें', result: 'परिणाम', entered: '(डाला हुआ)', placeholder: 'जैसे 1' },
  },
  'zh-hans': {
    title: '重量单位换算',
    desc: 'mg、g、kg、t、oz、lb、stone 一次全换',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: '公制和英制放在一起',
        p: '输入一个数字，所有单位同时变。不用换两次、在中途丢掉位数。1 磅正好是 0.45359237 kg，1 盎司正好是它的 1/16——这是规定的值，不是量出来的，所以换算没有误差。',
      },
      {
        h: 'stone 今天还用在哪里',
        p: '英国和爱尔兰说体重用 stone 和磅，会说 11 st 4 lb 而不是 71.7 kg。1 stone 是 14 磅，约 6.35 kg。这两个国家之外基本见不到。',
      },
    ],
    faq: [
      { q: '1 磅正好是 0.45359237 kg 吗？', a: '是。国际常衡磅在 1959 年就定成这个值，所以磅和千克之间的换算不会再多出本站的舍入。' },
      { q: '公吨和美吨一样吗？', a: '不一样。这里的吨是 1,000 kg。美制短吨是 2,000 lb（约 907 kg），英制长吨是 2,240 lb（约 1,016 kg）。' },
      { q: '为什么有时候位数很多？', a: '结果保留八位有效数字。特别大或特别小的数会切换成科学计数法，让真正有意义的位数看得清。' },
    ],
    ui: { input: '要换算的值', number: '数值', unit: '单位', convert: '换算', result: '换算结果', entered: '（输入）', placeholder: '例：1' },
  },
  'zh-hant': {
    title: '重量單位換算',
    desc: 'mg、g、kg、t、oz、lb、stone 一次全換',
    short: 'mg · g · kg · t · oz · lb · stone',
    intro: [
      {
        h: '公制和英制放在一起',
        p: '輸入一個數字，所有單位同時變。不用換兩次、在中途丟掉位數。1 磅正好是 0.45359237 kg，1 盎司正好是它的 1/16——這是規定的值，不是量出來的，所以換算沒有誤差。',
      },
      {
        h: 'stone 今天還用在哪裡',
        p: '英國和愛爾蘭說體重用 stone 和磅，會說 11 st 4 lb 而不是 71.7 kg。1 stone 是 14 磅，約 6.35 kg。這兩個國家之外基本見不到。',
      },
    ],
    faq: [
      { q: '1 磅正好是 0.45359237 kg 嗎？', a: '是。國際常衡磅在 1959 年就定成這個值，所以磅和公斤之間的換算不會再多出本站的捨入。' },
      { q: '公噸和美噸一樣嗎？', a: '不一樣。這裡的噸是 1,000 kg。美制短噸是 2,000 lb（約 907 kg），英制長噸是 2,240 lb（約 1,016 kg）。' },
      { q: '為什麼有時候位數很多？', a: '結果保留八位有效數字。特別大或特別小的數會切換成科學記號，讓真正有意義的位數看得清。' },
    ],
    ui: { input: '要換算的值', number: '數值', unit: '單位', convert: '換算', result: '換算結果', entered: '（輸入）', placeholder: '例：1' },
  },
};
