/**
 * 술 화면의 문구 — 열 언어.
 *
 * 단위(ml, g, %)와 기관 이름(WHO)은 옮기지 않는다. 옮기는 것은 잔 이름과
 * 설명뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { DrinkFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DrinkUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  landmarkName: (key: string) => string;
  abvLabel: string;
  mlLabel: string;
  pureLabel: string;
  gramsLabel: string;
  whoLabel: string;
  usLabel: string;
  ukLabel: string;
  kcalLabel: string;
  countryTitle: string;
  countryNote: string;
  volumeDefTitle: string;
  volumeDefNote: string;
  twinTitle: string;
  twinNote: string;
  kcalTitle: string;
  kcalNote: string;
  guideTitle: string;
  guideNote: string;
  abvRowTitle: string;
  mlRowTitle: string;
  desc: (f: DrinkFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: DrinkFacts) => string;
  metaDesc: (f: DrinkFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: DrinkFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const lKo: Names = { shot: '위스키 한 잔', 'soju-glass': '소주잔', can: '캔 하나', 'soju-bottle': '소주 한 병', pint: '생맥주 500', 'wine-bottle': '와인 한 병' };
const lEn: Names = { shot: 'a shot', 'soju-glass': 'a soju glass', can: 'a can', 'soju-bottle': 'a soju bottle', pint: 'a half-litre', 'wine-bottle': 'a wine bottle' };
const lEs: Names = { shot: 'un chupito', 'soju-glass': 'un vaso de soju', can: 'una lata', 'soju-bottle': 'una botella de soju', pint: 'medio litro', 'wine-bottle': 'una botella de vino' };
const lPt: Names = { shot: 'uma dose', 'soju-glass': 'um copo de soju', can: 'uma lata', 'soju-bottle': 'uma garrafa de soju', pint: 'meio litro', 'wine-bottle': 'uma garrafa de vinho' };
const lJa: Names = { shot: 'ショット一杯', 'soju-glass': 'ソジュのお猪口', can: '缶一本', 'soju-bottle': 'ソジュ一本', pint: '生中', 'wine-bottle': 'ワイン一本' };
const lDe: Names = { shot: 'ein Kurzer', 'soju-glass': 'ein Soju-Gläschen', can: 'eine Dose', 'soju-bottle': 'eine Soju-Flasche', pint: 'ein halber Liter', 'wine-bottle': 'eine Weinflasche' };
const lFr: Names = { shot: 'un shot', 'soju-glass': 'un verre de soju', can: 'une canette', 'soju-bottle': 'une bouteille de soju', pint: 'un demi-litre', 'wine-bottle': 'une bouteille de vin' };
const lHi: Names = { shot: 'एक शॉट', 'soju-glass': 'सोजू का गिलास', can: 'एक कैन', 'soju-bottle': 'सोजू की बोतल', pint: 'आधा लीटर', 'wine-bottle': 'वाइन की बोतल' };
const lZh: Names = { shot: '一小杯烈酒', 'soju-glass': '烧酒杯', can: '一罐', 'soju-bottle': '一瓶烧酒', pint: '一扎生啤', 'wine-bottle': '一瓶葡萄酒' };
const lTw: Names = { shot: '一小杯烈酒', 'soju-glass': '燒酒杯', can: '一罐', 'soju-bottle': '一瓶燒酒', pint: '一杯生啤', 'wine-bottle': '一瓶葡萄酒' };

type Spec = { [K in keyof DrinkUI]: L<DrinkUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    '술 순수 알코올량', 'Pure alcohol in a drink', 'Alcohol puro por bebida', 'Álcool puro por bebida',
    '酒の純アルコール量', 'Reiner Alkohol im Getränk', 'Alcool pur par verre', 'पेय में शुद्ध अल्कोहल',
    '酒的纯酒精量', '酒的純酒精量',
  ),

  hubTitle: T(
    '술 224칸 — "한 잔"이 영국 8g, WHO 10g, 미국 14g입니다',
    '224 drink cells — “one drink” is 8 g in the UK, 10 g at the WHO, 14 g in the US',
    '224 casillas — «una copa» son 8 g en el Reino Unido, 10 g para la OMS y 14 g en EE. UU.',
    '224 células — «uma dose» são 8 g no Reino Unido, 10 g na OMS e 14 g nos EUA',
    '酒224マス — 「一杯」は英国8g、WHO 10g、米国14gです',
    '224 Getränkefelder — „ein Drink“ sind 8 g in Großbritannien, 10 g bei der WHO, 14 g in den USA',
    '224 cases — « un verre » vaut 8 g au Royaume-Uni, 10 g pour l’OMS, 14 g aux États-Unis',
    '224 खाने — “एक ड्रिंक” ब्रिटेन में 8 g, WHO में 10 g, अमेरिका में 14 g',
    '224 格 —「一杯」在英国是 8 克，世卫是 10 克，美国是 14 克',
    '224 格 —「一杯」在英國是 8 克，世衛是 10 克，美國是 14 克',
  ),

  hubLead: T(
    '잔 크기도 도수도 저마다 달라서, 술을 견줄 수 있는 값은 순수 알코올 무게 하나뿐입니다. 용량에 도수를 곱하고 에탄올 밀도 0.789를 곱하면 나옵니다. 그런데 그것을 몇 "잔"으로 셀지가 나라마다 다릅니다 — 영국과 미국은 순수 알코올의 부피(10ml, 0.6 fl oz)로 정하고 WHO는 무게(10g)로 정합니다. 흔히 인용되는 8g과 14g은 앞의 두 부피를 밀도로 바꾼 값이라, 이 표는 그 둘을 적어 두지 않고 부피에서 계산합니다.',
    'Glasses differ and strengths differ, so the only figure that lets you compare drinks is the weight of pure alcohol. Multiply the volume by the strength and by the density of ethanol, 0.789. How many “drinks” that counts as, though, depends on the country — the UK and the US define it by the volume of pure alcohol (10 ml, 0.6 fl oz) while the WHO defines it by weight (10 g). The widely quoted 8 g and 14 g are those two volumes converted through the density, so this chart does not write them down; it computes them.',
    'Los vasos varían y las graduaciones también, así que la única cifra comparable es el peso del alcohol puro. Multiplique el volumen por la graduación y por la densidad del etanol, 0,789. Cuántas «copas» sean depende del país: el Reino Unido y EE. UU. lo definen por volumen de alcohol puro (10 ml, 0,6 fl oz) y la OMS por peso (10 g). Los citados 8 g y 14 g son esos dos volúmenes convertidos con la densidad, así que esta tabla no los anota: los calcula.',
    'Os copos variam e as graduações também, então a única cifra comparável é o peso do álcool puro. Multiplique o volume pela graduação e pela densidade do etanol, 0,789. Quantas «doses» isso conta depende do país: Reino Unido e EUA definem por volume de álcool puro (10 ml, 0,6 fl oz) e a OMS por peso (10 g). Os citados 8 g e 14 g são esses dois volumes convertidos pela densidade, então esta tabela não os anota: calcula.',
    'グラスの大きさも度数もまちまちなので、酒を見比べられる値は純アルコールの重さだけです。容量に度数を掛け、エタノールの密度0.789を掛ければ出ます。ただしそれを何「杯」と数えるかは国によって違います — 英国と米国は純アルコールの体積(10ml、0.6 fl oz)で決め、WHOは重さ(10g)で決めます。よく引かれる8gと14gは前の二つの体積を密度で換算した値なので、この表はそれを書き留めず体積から計算します。',
    'Gläser unterscheiden sich, Stärken auch — vergleichbar ist allein das Gewicht des reinen Alkohols. Volumen mal Stärke mal Ethanoldichte 0,789. Wie viele „Drinks“ das sind, hängt jedoch vom Land ab: Großbritannien und die USA definieren über das Volumen reinen Alkohols (10 ml, 0,6 fl oz), die WHO über das Gewicht (10 g). Die viel zitierten 8 g und 14 g sind diese beiden Volumina über die Dichte umgerechnet — diese Tabelle schreibt sie nicht auf, sie rechnet sie aus.',
    'Les verres diffèrent, les degrés aussi : le seul chiffre comparable est la masse d’alcool pur. Multipliez le volume par le degré et par la densité de l’éthanol, 0,789. Combien de « verres » cela fait dépend du pays : le Royaume-Uni et les États-Unis définissent par le volume d’alcool pur (10 ml, 0,6 fl oz), l’OMS par la masse (10 g). Les 8 g et 14 g souvent cités sont ces deux volumes convertis par la densité ; ce tableau ne les inscrit pas, il les calcule.',
    'गिलास अलग, तीव्रता अलग — तुलना का एकमात्र आँकड़ा शुद्ध अल्कोहल का भार है। आयतन को तीव्रता से और इथेनॉल घनत्व 0.789 से गुणा कीजिए। पर उसे कितने “ड्रिंक” गिना जाए, यह देश पर निर्भर है: ब्रिटेन और अमेरिका शुद्ध अल्कोहल के आयतन (10 ml, 0.6 fl oz) से तय करते हैं, WHO भार (10 g) से। प्रचलित 8 g और 14 g उन्हीं दो आयतनों का घनत्व से रूपांतरण हैं — यह तालिका उन्हें लिखती नहीं, गिनती है।',
    '杯子大小不同，度数也不同，能拿来比较的只有纯酒精的重量。用容量乘度数，再乘乙醇密度 0.789 就得到。但把它算作几「杯」，各国不一样——英国和美国按纯酒精的体积（10 毫升、0.6 液盎司）定，世卫按重量（10 克）定。常被引用的 8 克和 14 克，正是那两个体积用密度换算出来的，所以本表不写死这两个数，而是算出来。',
    '杯子大小不同，度數也不同，能拿來比較的只有純酒精的重量。用容量乘度數，再乘乙醇密度 0.789 就得到。但把它算作幾「杯」，各國不一樣——英國和美國按純酒精的體積（10 毫升、0.6 液盎司）定，世衛按重量（10 克）定。常被引用的 8 克和 14 克，正是那兩個體積用密度換算出來的，所以本表不寫死這兩個數，而是算出來。',
  ),

  landmarkName: T<(k: string) => string>(
    namer(lKo), namer(lEn), namer(lEs), namer(lPt), namer(lJa),
    namer(lDe), namer(lFr), namer(lHi), namer(lZh), namer(lTw),
  ),

  abvLabel: T('도수', 'Strength', 'Graduación', 'Graduação', '度数', 'Stärke', 'Degré', 'तीव्रता', '度数', '度數'),
  mlLabel: T('용량', 'Volume', 'Volumen', 'Volume', '容量', 'Volumen', 'Volume', 'आयतन', '容量', '容量'),
  pureLabel: T('순수 알코올 부피', 'Pure alcohol volume', 'Volumen de alcohol puro', 'Volume de álcool puro', '純アルコールの体積', 'Volumen reinen Alkohols', 'Volume d’alcool pur', 'शुद्ध अल्कोहल आयतन', '纯酒精体积', '純酒精體積'),
  gramsLabel: T('순수 알코올 무게', 'Pure alcohol weight', 'Peso de alcohol puro', 'Peso de álcool puro', '純アルコールの重さ', 'Gewicht reinen Alkohols', 'Masse d’alcool pur', 'शुद्ध अल्कोहल भार', '纯酒精重量', '純酒精重量'),
  whoLabel: T('WHO 기준 잔 수', 'WHO standard drinks', 'Copas estándar (OMS)', 'Doses padrão (OMS)', 'WHO基準の杯数', 'WHO-Standarddrinks', 'Verres standard (OMS)', 'WHO मानक ड्रिंक', '世卫标准杯', '世衛標準杯'),
  usLabel: T('미국 기준 잔 수', 'US standard drinks', 'Copas estándar (EE. UU.)', 'Doses padrão (EUA)', '米国基準の杯数', 'US-Standarddrinks', 'Verres standard (É.-U.)', 'अमेरिकी मानक ड्रिंक', '美国标准杯', '美國標準杯'),
  ukLabel: T('영국 유닛', 'UK units', 'Unidades (Reino Unido)', 'Unidades (Reino Unido)', '英国ユニット', 'UK-Units', 'Unités (Royaume-Uni)', 'ब्रिटिश यूनिट', '英国单位', '英國單位'),
  kcalLabel: T('알코올 열량', 'Calories from alcohol', 'Calorías del alcohol', 'Calorias do álcool', 'アルコールの熱量', 'Kalorien aus Alkohol', 'Calories de l’alcool', 'अल्कोहल से कैलोरी', '酒精热量', '酒精熱量'),

  countryTitle: T('"한 잔"이 나라마다 다릅니다', '“One drink” differs by country', '«Una copa» varía según el país', '«Uma dose» varia por país', '「一杯」は国ごとに違います', '„Ein Drink“ ist je Land anders', '« Un verre » varie selon le pays', '“एक ड्रिंक” देश-देश अलग', '「一杯」各国不同', '「一杯」各國不同'),
  countryNote: T(
    '미국의 한 잔은 영국 1유닛의 1.77배, WHO 한 잔의 1.4배입니다. 그래서 5% 맥주 500ml 하나가 영국에서는 2.5유닛, WHO 기준으로는 2.0잔, 미국 기준으로는 1.4잔이 됩니다. 같은 술을 마시고도 "두 잔 반"과 "한 잔 반"이 함께 맞는 말이 되는 것입니다. 나라별 권장량을 견줄 때 이 차이를 빼고 숫자만 옮기면 어긋납니다.',
    'A US drink is 1.77 times a UK unit and 1.4 times a WHO drink. So a single 500 ml beer at 5% is 2.5 units in Britain, 2.0 drinks by the WHO count, and 1.4 in the US. The same beer is honestly “two and a half” and “one and a half” at once. Comparing national guidance without accounting for this gap gets the numbers wrong.',
    'Una copa estadounidense equivale a 1,77 unidades británicas y a 1,4 copas de la OMS. Así, una cerveza de 500 ml al 5% son 2,5 unidades en el Reino Unido, 2,0 copas según la OMS y 1,4 en EE. UU. La misma cerveza es honestamente «dos y media» y «una y media» a la vez. Comparar recomendaciones nacionales sin tener esto en cuenta da cifras equivocadas.',
    'Uma dose americana equivale a 1,77 unidade britânica e a 1,4 dose da OMS. Assim, uma cerveja de 500 ml a 5% são 2,5 unidades no Reino Unido, 2,0 doses pela OMS e 1,4 nos EUA. A mesma cerveja é honestamente «duas e meia» e «uma e meia» ao mesmo tempo. Comparar orientações nacionais sem considerar isso erra os números.',
    '米国の一杯は英国1ユニットの1.77倍、WHOの一杯の1.4倍です。だから5%のビール500ml一本が、英国では2.5ユニット、WHO基準では2.0杯、米国基準では1.4杯になります。同じ酒を飲んで「二杯半」も「一杯半」も同時に正しいわけです。国ごとの目安を見比べるとき、この差を抜いて数字だけ移すと食い違います。',
    'Ein US-Drink entspricht 1,77 UK-Units und 1,4 WHO-Drinks. Ein 500-ml-Bier mit 5 % sind also 2,5 Units in Großbritannien, 2,0 Drinks nach WHO-Zählung und 1,4 in den USA. Dasselbe Bier ist zugleich ehrlich „zweieinhalb“ und „anderthalb“. Wer nationale Empfehlungen vergleicht, ohne das zu berücksichtigen, rechnet falsch.',
    'Un verre américain vaut 1,77 unité britannique et 1,4 verre OMS. Une bière de 500 ml à 5 % fait donc 2,5 unités au Royaume-Uni, 2,0 verres au compte de l’OMS et 1,4 aux États-Unis. La même bière est honnêtement « deux et demi » et « un et demi » à la fois. Comparer des recommandations nationales sans tenir compte de cet écart fausse les chiffres.',
    'एक अमेरिकी ड्रिंक ब्रिटिश यूनिट का 1.77 गुना और WHO ड्रिंक का 1.4 गुना है। इसलिए 5% की 500 ml बियर ब्रिटेन में 2.5 यूनिट, WHO के हिसाब से 2.0 ड्रिंक और अमेरिका में 1.4 है। वही बियर एक साथ “ढाई” भी है और “डेढ़” भी। देशों की सलाहें बिना इस अंतर के मिलाने पर आँकड़े ग़लत बैठते हैं।',
    '一个美国标准杯相当于 1.77 个英国单位、1.4 个世卫标准杯。所以一罐 500 毫升 5% 的啤酒，在英国是 2.5 单位，按世卫算是 2.0 杯，在美国是 1.4 杯。同一瓶酒，说「两杯半」和「一杯半」都没错。拿各国建议量对比时，忽略这个差就会算错。',
    '一個美國標準杯相當於 1.77 個英國單位、1.4 個世衛標準杯。所以一罐 500 毫升 5% 的啤酒，在英國是 2.5 單位，按世衛算是 2.0 杯，在美國是 1.4 杯。同一瓶酒，說「兩杯半」和「一杯半」都沒錯。拿各國建議量對比時，忽略這個差就會算錯。',
  ),

  volumeDefTitle: T('영국과 미국은 부피로 정합니다', 'Britain and America define it by volume', 'El Reino Unido y EE. UU. lo definen por volumen', 'Reino Unido e EUA definem por volume', '英国と米国は体積で決めます', 'Großbritannien und die USA definieren über das Volumen', 'Le Royaume-Uni et les États-Unis définissent par le volume', 'ब्रिटेन और अमेरिका आयतन से तय करते हैं', '英美按体积定', '英美按體積定'),
  volumeDefNote: T(
    '영국 1유닛은 순수 알코올 10ml, 미국 한 잔은 0.6 fl oz(17.7ml)입니다. 둘 다 부피라, 에탄올 밀도 0.789를 곱해야 무게가 됩니다 — 각각 7.89g과 14.0g이고 그것이 흔히 보는 8g·14g입니다. 영국 쪽은 정의가 부피이기 때문에 "리터 × 도수"가 그대로 유닛이 됩니다. 750ml 12% 와인이 정확히 9유닛인 것이 그 덕입니다.',
    'A UK unit is 10 ml of pure alcohol; a US drink is 0.6 fl oz, which is 17.7 ml. Both are volumes, so you multiply by the ethanol density of 0.789 to get a weight — 7.89 g and 14.0 g, which is where the familiar 8 and 14 come from. Because the British definition is a volume, litres × ABV gives units directly: a 750 ml bottle of 12% wine is exactly 9 units.',
    'Una unidad británica son 10 ml de alcohol puro; una copa estadounidense, 0,6 fl oz, es decir 17,7 ml. Ambos son volúmenes, así que hay que multiplicar por la densidad del etanol, 0,789, para obtener peso: 7,89 g y 14,0 g, de donde salen los conocidos 8 y 14. Como la definición británica es un volumen, litros × graduación da unidades directamente: una botella de 750 ml al 12% son exactamente 9 unidades.',
    'Uma unidade britânica são 10 ml de álcool puro; uma dose americana, 0,6 fl oz, ou seja 17,7 ml. Ambos são volumes, então multiplica-se pela densidade do etanol, 0,789, para obter peso: 7,89 g e 14,0 g, de onde vêm os conhecidos 8 e 14. Como a definição britânica é um volume, litros × graduação dá unidades direto: uma garrafa de 750 ml a 12% são exatamente 9 unidades.',
    '英国の1ユニットは純アルコール10ml、米国の一杯は0.6 fl oz(17.7ml)です。どちらも体積なので、エタノール密度0.789を掛けて重さにします — それぞれ7.89gと14.0gで、よく見る8g・14gはこれです。英国側は定義が体積なので「リットル × 度数」がそのままユニットになります。750mlの12%ワインがちょうど9ユニットなのはそのおかげです。',
    'Eine UK-Unit sind 10 ml reiner Alkohol, ein US-Drink 0,6 fl oz, also 17,7 ml. Beides sind Volumina; mit der Ethanoldichte 0,789 werden daraus 7,89 g und 14,0 g — daher die geläufigen 8 und 14. Weil die britische Definition ein Volumen ist, ergibt Liter × Vol.-% direkt die Units: eine 750-ml-Flasche mit 12 % sind genau 9 Units.',
    'Une unité britannique vaut 10 ml d’alcool pur ; un verre américain, 0,6 fl oz, soit 17,7 ml. Ce sont des volumes : on multiplie par la densité de l’éthanol, 0,789, pour obtenir une masse — 7,89 g et 14,0 g, d’où les fameux 8 et 14. La définition britannique étant un volume, litres × degré donne directement les unités : une bouteille de 750 ml à 12 % fait exactement 9 unités.',
    'ब्रिटिश यूनिट यानी 10 ml शुद्ध अल्कोहल; अमेरिकी ड्रिंक यानी 0.6 fl oz, यानी 17.7 ml। दोनों आयतन हैं, इसलिए इथेनॉल घनत्व 0.789 से गुणा करने पर भार मिलता है — 7.89 g और 14.0 g, यहीं से जाने-पहचाने 8 और 14 आते हैं। ब्रिटिश परिभाषा आयतन होने से लीटर × तीव्रता सीधे यूनिट देता है: 750 ml की 12% वाइन ठीक 9 यूनिट।',
    '英国 1 单位是 10 毫升纯酒精，美国一杯是 0.6 液盎司，也就是 17.7 毫升。两者都是体积，要乘乙醇密度 0.789 才成重量——分别是 7.89 克和 14.0 克，常见的 8 和 14 就是这么来的。因为英国的定义本身是体积，「升 × 度数」直接就是单位数：750 毫升 12% 的葡萄酒正好 9 单位。',
    '英國 1 單位是 10 毫升純酒精，美國一杯是 0.6 液盎司，也就是 17.7 毫升。兩者都是體積，要乘乙醇密度 0.789 才成重量——分別是 7.89 克和 14.0 克，常見的 8 和 14 就是這麼來的。因為英國的定義本身是體積，「公升 × 度數」直接就是單位數：750 毫升 12% 的葡萄酒正好 9 單位。',
  ),

  twinTitle: T('도수와 용량이 서로를 되받습니다', 'Strength and volume trade off exactly', 'Graduación y volumen se compensan', 'Graduação e volume se compensam', '度数と容量は互いを打ち消します', 'Stärke und Volumen gleichen sich genau aus', 'Degré et volume se compensent exactement', 'तीव्रता और आयतन आपस में भरपाई करते हैं', '度数和容量正好互抵', '度數和容量正好互抵'),
  twinNote: T(
    '도수를 절반으로 하고 잔을 두 배로 하면 알코올 양이 그대로입니다. 4% 500ml와 8% 250ml가 같고, 5% 맥주 한 캔과 40% 위스키 한 샷이 비슷한 자리에 놓입니다. "약한 술이니까 괜찮다"가 잔 크기까지 따지지 않으면 성립하지 않는 까닭입니다.',
    'Halve the strength and double the glass and the alcohol is unchanged. 4% at 500 ml equals 8% at 250 ml, and a 5% can of beer lands near a 40% shot. That is why “it is only a weak drink” does not hold up unless you also count the size of the glass.',
    'Reduzca a la mitad la graduación y duplique el vaso: el alcohol es el mismo. 4% en 500 ml equivale a 8% en 250 ml, y una lata de cerveza al 5% queda cerca de un chupito al 40%. Por eso «es una bebida floja» no se sostiene si no se cuenta también el tamaño del vaso.',
    'Reduza a graduação pela metade e dobre o copo: o álcool é o mesmo. 4% em 500 ml equivale a 8% em 250 ml, e uma lata de cerveja a 5% fica perto de uma dose a 40%. Por isso «é só uma bebida fraca» não se sustenta se não se contar também o tamanho do copo.',
    '度数を半分にしてグラスを倍にすれば、アルコール量はそのままです。4%の500mlと8%の250mlが同じで、5%のビール一缶と40%のショット一杯が近い場所に並びます。「弱い酒だから大丈夫」がグラスの大きさまで数えないと成り立たない理由です。',
    'Halbiert man die Stärke und verdoppelt das Glas, bleibt der Alkohol gleich. 4 % bei 500 ml entspricht 8 % bei 250 ml, und eine 5-%-Dose Bier landet nahe einem 40-%-Kurzen. Deshalb trägt „ist doch nur was Leichtes“ nicht, wenn man die Glasgröße nicht mitzählt.',
    'Divisez le degré par deux et doublez le verre : l’alcool ne bouge pas. 4 % dans 500 ml équivaut à 8 % dans 250 ml, et une canette de bière à 5 % se retrouve près d’un shot à 40 %. D’où le fait que « ce n’est qu’un truc léger » ne tienne pas si l’on ne compte pas aussi la taille du verre.',
    'तीव्रता आधी और गिलास दोगुना कर दें, अल्कोहल वही रहता है। 500 ml की 4% = 250 ml की 8%, और 5% बियर का एक कैन 40% के एक शॉट के पास आ बैठता है। इसीलिए “हल्की ही तो है” तब तक नहीं टिकता जब तक गिलास का आकार भी न गिना जाए।',
    '度数减半、杯子加倍，酒精量原封不动。4% 的 500 毫升等于 8% 的 250 毫升，5% 的一罐啤酒和 40% 的一小杯烈酒落在相近的位置。所以「度数低没关系」这句话，不把杯子大小算进去就站不住。',
    '度數減半、杯子加倍，酒精量原封不動。4% 的 500 毫升等於 8% 的 250 毫升，5% 的一罐啤酒和 40% 的一小杯烈酒落在相近的位置。所以「度數低沒關係」這句話，不把杯子大小算進去就站不住。',
  ),

  kcalTitle: T('열량은 알코올만 센 것입니다', 'The calories here count the alcohol only', 'Las calorías cuentan solo el alcohol', 'As calorias contam só o álcool', '熱量はアルコールだけを数えたものです', 'Die Kalorien zählen nur den Alkohol', 'Les calories ne comptent que l’alcool', 'यहाँ कैलोरी सिर्फ़ अल्कोहल की है', '这里的热量只算酒精', '這裡的熱量只算酒精'),
  kcalNote: T(
    '알코올 1g은 7kcal을 냅니다 — 탄수화물·단백질(4kcal)보다 높고 지방(9kcal)보다 낮습니다. 이 표의 열량은 알코올만 센 것이라, 맥주의 탄수화물이나 단맛이 있는 술의 당분, 섞어 마시는 음료는 들어 있지 않습니다. 실제 열량은 이보다 큽니다.',
    'A gram of alcohol yields 7 kcal — above carbohydrate and protein at 4, below fat at 9. The figure here counts the alcohol alone, so it excludes the carbohydrate in beer, the sugar in sweeter drinks, and anything mixed in. The real calorie count is higher.',
    'Un gramo de alcohol aporta 7 kcal: por encima de carbohidratos y proteínas (4) y por debajo de la grasa (9). Aquí se cuenta solo el alcohol, así que no incluye los carbohidratos de la cerveza, el azúcar de las bebidas dulces ni los mezcladores. Las calorías reales son mayores.',
    'Um grama de álcool rende 7 kcal — acima de carboidrato e proteína (4) e abaixo da gordura (9). Aqui conta-se só o álcool, então não entram os carboidratos da cerveja, o açúcar das bebidas doces nem os misturadores. As calorias reais são maiores.',
    'アルコール1gは7kcalを出します — 炭水化物・たんぱく質(4kcal)より高く、脂質(9kcal)より低いです。この表の熱量はアルコールだけを数えたものなので、ビールの炭水化物や甘い酒の糖分、割り材は入っていません。実際の熱量はこれより大きくなります。',
    'Ein Gramm Alkohol liefert 7 kcal — mehr als Kohlenhydrate und Eiweiß (4), weniger als Fett (9). Der Wert hier zählt nur den Alkohol; Kohlenhydrate im Bier, Zucker in süßen Getränken und Mixer fehlen. Die tatsächliche Kalorienzahl liegt höher.',
    'Un gramme d’alcool fournit 7 kcal — au-dessus des glucides et protéines (4), au-dessous des lipides (9). Le chiffre ici ne compte que l’alcool : ni les glucides de la bière, ni le sucre des boissons douces, ni les mélangeurs. Le total réel est plus élevé.',
    'एक ग्राम अल्कोहल 7 kcal देता है — कार्बोहाइड्रेट और प्रोटीन (4) से ऊपर, वसा (9) से नीचे। यहाँ केवल अल्कोहल गिना गया है, इसलिए बियर के कार्बोहाइड्रेट, मीठे पेय की शक्कर और मिलाने वाली चीज़ें शामिल नहीं। असली कैलोरी इससे ज़्यादा है।',
    '一克酒精产生 7 千卡——高于碳水和蛋白质（4），低于脂肪（9）。本表只算酒精，不含啤酒里的碳水、甜酒里的糖，也不含兑的饮料。实际热量会更高。',
    '一克酒精產生 7 大卡——高於碳水和蛋白質（4），低於脂肪（9）。本表只算酒精，不含啤酒裡的碳水、甜酒裡的糖，也不含兌的飲料。實際熱量會更高。',
  ),

  guideTitle: T('권장량은 여기에 적지 않습니다', 'No drinking limits are printed here', 'Aquí no se imprimen límites', 'Aqui não se imprimem limites', '推奨量はここに書きません', 'Hier stehen keine Grenzwerte', 'Aucune limite n’est indiquée ici', 'यहाँ कोई सीमा नहीं छापी गई', '这里不写建议量', '這裡不寫建議量'),
  guideNote: T(
    '저위험 음주 기준은 나라마다 크게 다르고 최근 몇 해 사이에도 여러 나라가 낮추는 쪽으로 고쳤습니다. 숫자를 적어 두면 금세 낡으므로 이 표는 재는 법만 냅니다 — 얼마가 적당한지는 사는 나라의 최신 보건 지침을 보고, 몸 상태나 복용 중인 약이 있다면 의사와 이야기하십시오.',
    'Low-risk drinking guidelines differ a great deal between countries, and several have revised theirs downward in recent years. Printing a number here would go stale, so this chart gives only the measurement. For how much is appropriate, check the current health guidance where you live, and talk to a doctor if you have a condition or take medication.',
    'Las guías de consumo de bajo riesgo difieren mucho entre países y varios las han revisado a la baja en los últimos años. Poner una cifra aquí quedaría obsoleta, así que esta tabla solo ofrece la medida. Para saber cuánto es apropiado, consulte las recomendaciones sanitarias vigentes donde viva, y hable con un médico si tiene alguna condición o toma medicación.',
    'As diretrizes de consumo de baixo risco variam muito entre países e vários as revisaram para baixo nos últimos anos. Imprimir um número aqui ficaria desatualizado, então esta tabela dá apenas a medida. Para saber quanto é adequado, consulte as recomendações de saúde vigentes onde vive, e fale com um médico se tiver alguma condição ou tomar medicação.',
    '低リスク飲酒の目安は国によって大きく違い、ここ数年でも複数の国が引き下げる方向に改めています。数字を書き留めるとすぐ古くなるので、この表は測り方だけを出します — どれくらいが適当かは住んでいる国の最新の保健指針を見て、体調や服用中の薬があるなら医師に相談してください。',
    'Grenzwerte für risikoarmen Konsum unterscheiden sich stark zwischen Ländern, und mehrere haben sie zuletzt gesenkt. Eine hier gedruckte Zahl wäre bald veraltet — diese Tabelle liefert nur die Messung. Wie viel angemessen ist, entnehmen Sie den aktuellen Empfehlungen Ihres Landes; bei Vorerkrankungen oder Medikamenten sprechen Sie mit einer Ärztin oder einem Arzt.',
    'Les repères de consommation à moindre risque varient beaucoup selon les pays, et plusieurs les ont revus à la baisse ces dernières années. Un chiffre imprimé ici vieillirait vite : ce tableau ne donne que la mesure. Pour savoir ce qui convient, consultez les recommandations sanitaires en vigueur chez vous, et parlez-en à un médecin si vous avez une pathologie ou prenez un traitement.',
    'कम-जोखिम पीने की सीमाएँ देशों में बहुत अलग हैं और कई देशों ने हाल के वर्षों में उन्हें घटाया है। यहाँ कोई संख्या छापना जल्दी पुराना पड़ जाएगा, इसलिए यह तालिका सिर्फ़ नापने का तरीका देती है — कितना उचित है, यह अपने देश के मौजूदा स्वास्थ्य दिशानिर्देश देखें, और कोई बीमारी या दवा हो तो डॉक्टर से बात करें।',
    '低风险饮酒的建议量各国差别很大，近几年还有多个国家往下调。写死一个数字很快就过时，所以本表只给测量方法——多少算合适，请看你所在国家最新的健康指引；有基础疾病或在服药，请咨询医生。',
    '低風險飲酒的建議量各國差別很大，近幾年還有多個國家往下調。寫死一個數字很快就過時，所以本表只給測量方法——多少算合適，請看你所在國家最新的健康指引；有基礎疾病或在服藥，請諮詢醫師。',
  ),

  abvRowTitle: T('같은 도수의 다른 용량', 'Same strength, other volumes', 'Misma graduación, otros volúmenes', 'Mesma graduação, outros volumes', '同じ度数の他の容量', 'Gleiche Stärke, andere Mengen', 'Même degré, autres volumes', 'वही तीव्रता, अन्य आयतन', '同度数的其他容量', '同度數的其他容量'),
  mlRowTitle: T('같은 용량의 다른 도수', 'Same volume, other strengths', 'Mismo volumen, otras graduaciones', 'Mesmo volume, outras graduações', '同じ容量の他の度数', 'Gleiche Menge, andere Stärken', 'Même volume, autres degrés', 'वही आयतन, अन्य तीव्रताएँ', '同容量的其他度数', '同容量的其他度數'),

  desc: T<(f: DrinkFacts) => string>(
    f => `${f.abv}% 술 ${f.ml}ml에는 순수 알코올이 ${f.grams}g 들어 있습니다. 영국 기준 ${f.ukUnits}유닛, WHO 기준 ${f.whoDrinks}잔, 미국 기준 ${f.usDrinks}잔입니다.`,
    f => `${f.ml} ml at ${f.abv}% contains ${f.grams} g of pure alcohol — ${f.ukUnits} UK units, ${f.whoDrinks} WHO drinks, ${f.usDrinks} US drinks.`,
    f => `${f.ml} ml al ${f.abv}% contienen ${f.grams} g de alcohol puro: ${f.ukUnits} unidades británicas, ${f.whoDrinks} copas OMS, ${f.usDrinks} copas estadounidenses.`,
    f => `${f.ml} ml a ${f.abv}% contêm ${f.grams} g de álcool puro: ${f.ukUnits} unidades britânicas, ${f.whoDrinks} doses OMS, ${f.usDrinks} doses americanas.`,
    f => `${f.abv}%の酒${f.ml}mlには純アルコールが${f.grams}g入っています。英国基準${f.ukUnits}ユニット、WHO基準${f.whoDrinks}杯、米国基準${f.usDrinks}杯です。`,
    f => `${f.ml} ml mit ${f.abv} % enthalten ${f.grams} g reinen Alkohol — ${f.ukUnits} UK-Units, ${f.whoDrinks} WHO-Drinks, ${f.usDrinks} US-Drinks.`,
    f => `${f.ml} ml à ${f.abv} % contiennent ${f.grams} g d’alcool pur : ${f.ukUnits} unités britanniques, ${f.whoDrinks} verres OMS, ${f.usDrinks} verres américains.`,
    f => `${f.abv}% के ${f.ml} ml में ${f.grams} g शुद्ध अल्कोहल है — ${f.ukUnits} ब्रिटिश यूनिट, ${f.whoDrinks} WHO ड्रिंक, ${f.usDrinks} अमेरिकी ड्रिंक।`,
    f => `${f.abv}% 的 ${f.ml} 毫升含纯酒精 ${f.grams} 克，相当于英国 ${f.ukUnits} 单位、世卫 ${f.whoDrinks} 杯、美国 ${f.usDrinks} 杯。`,
    f => `${f.abv}% 的 ${f.ml} 毫升含純酒精 ${f.grams} 克，相當於英國 ${f.ukUnits} 單位、世衛 ${f.whoDrinks} 杯、美國 ${f.usDrinks} 杯。`,
  ),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      '순수 알코올(g) = 용량(ml) × 도수(%) ÷ 100 × 0.789.',
      '도수는 부피 비율이라, 용량에 곱하면 알코올의 부피가 나옵니다.',
      '거기에 에탄올 밀도 0.789를 곱하면 무게가 됩니다.',
      '영국 1유닛은 순수 알코올 10ml — 그래서 리터 × 도수가 그대로 유닛입니다.',
      '미국 한 잔은 0.6 fl oz(17.7ml), WHO 한 잔은 10g입니다.',
      '알코올 1g은 7kcal이고, 이 표는 알코올만 세었습니다.',
    ],
    [
      'Pure alcohol (g) = volume (ml) × strength (%) ÷ 100 × 0.789.',
      'Strength is a volume fraction, so multiplying by the volume gives the volume of alcohol.',
      'Multiply that by the ethanol density, 0.789, and you have a weight.',
      'A UK unit is 10 ml of pure alcohol — which is why litres × ABV gives units directly.',
      'A US drink is 0.6 fl oz (17.7 ml); a WHO drink is 10 g.',
      'A gram of alcohol is 7 kcal, and this chart counts the alcohol only.',
    ],
    [
      'Alcohol puro (g) = volumen (ml) × graduación (%) ÷ 100 × 0,789.',
      'La graduación es una fracción de volumen: al multiplicarla por el volumen da el volumen de alcohol.',
      'Multiplique eso por la densidad del etanol, 0,789, y obtiene un peso.',
      'Una unidad británica son 10 ml de alcohol puro: por eso litros × graduación da unidades.',
      'Una copa estadounidense son 0,6 fl oz (17,7 ml); una copa OMS son 10 g.',
      'Un gramo de alcohol son 7 kcal, y esta tabla cuenta solo el alcohol.',
    ],
    [
      'Álcool puro (g) = volume (ml) × graduação (%) ÷ 100 × 0,789.',
      'A graduação é uma fração de volume: multiplicada pelo volume dá o volume de álcool.',
      'Multiplique isso pela densidade do etanol, 0,789, e tem um peso.',
      'Uma unidade britânica são 10 ml de álcool puro — por isso litros × graduação dá unidades.',
      'Uma dose americana são 0,6 fl oz (17,7 ml); uma dose OMS são 10 g.',
      'Um grama de álcool são 7 kcal, e esta tabela conta só o álcool.',
    ],
    [
      '純アルコール(g) = 容量(ml) × 度数(%) ÷ 100 × 0.789。',
      '度数は体積比なので、容量に掛けるとアルコールの体積が出ます。',
      'そこにエタノール密度0.789を掛ければ重さになります。',
      '英国の1ユニットは純アルコール10ml — だからリットル × 度数がそのままユニットです。',
      '米国の一杯は0.6 fl oz(17.7ml)、WHOの一杯は10gです。',
      'アルコール1gは7kcalで、この表はアルコールだけを数えました。',
    ],
    [
      'Reiner Alkohol (g) = Menge (ml) × Stärke (%) ÷ 100 × 0,789.',
      'Die Stärke ist ein Volumenanteil; mal der Menge ergibt sie das Alkoholvolumen.',
      'Das mal der Ethanoldichte 0,789 ergibt ein Gewicht.',
      'Eine UK-Unit sind 10 ml reiner Alkohol — deshalb ergibt Liter × Vol.-% direkt die Units.',
      'Ein US-Drink sind 0,6 fl oz (17,7 ml), ein WHO-Drink 10 g.',
      'Ein Gramm Alkohol sind 7 kcal, und diese Tabelle zählt nur den Alkohol.',
    ],
    [
      'Alcool pur (g) = volume (ml) × degré (%) ÷ 100 × 0,789.',
      'Le degré est une fraction volumique : multiplié par le volume, il donne le volume d’alcool.',
      'Multipliez par la densité de l’éthanol, 0,789, et vous obtenez une masse.',
      'Une unité britannique vaut 10 ml d’alcool pur — d’où litres × degré = unités.',
      'Un verre américain vaut 0,6 fl oz (17,7 ml) ; un verre OMS, 10 g.',
      'Un gramme d’alcool vaut 7 kcal, et ce tableau ne compte que l’alcool.',
    ],
    [
      'शुद्ध अल्कोहल (g) = आयतन (ml) × तीव्रता (%) ÷ 100 × 0.789।',
      'तीव्रता आयतन का अंश है, इसलिए आयतन से गुणा करने पर अल्कोहल का आयतन मिलता है।',
      'उसे इथेनॉल घनत्व 0.789 से गुणा कीजिए, भार मिल जाएगा।',
      'ब्रिटिश यूनिट यानी 10 ml शुद्ध अल्कोहल — इसीलिए लीटर × तीव्रता सीधे यूनिट है।',
      'अमेरिकी ड्रिंक 0.6 fl oz (17.7 ml), WHO ड्रिंक 10 g।',
      'एक ग्राम अल्कोहल 7 kcal है, और यह तालिका केवल अल्कोहल गिनती है।',
    ],
    [
      '纯酒精（克）= 容量（毫升）× 度数（%）÷ 100 × 0.789。',
      '度数是体积百分比，乘上容量就得到酒精的体积。',
      '再乘乙醇密度 0.789，就变成重量。',
      '英国 1 单位是 10 毫升纯酒精——所以「升 × 度数」直接就是单位数。',
      '美国一杯是 0.6 液盎司（17.7 毫升），世卫一杯是 10 克。',
      '一克酒精 7 千卡，本表只算酒精本身。',
    ],
    [
      '純酒精（克）= 容量（毫升）× 度數（%）÷ 100 × 0.789。',
      '度數是體積百分比，乘上容量就得到酒精的體積。',
      '再乘乙醇密度 0.789，就變成重量。',
      '英國 1 單位是 10 毫升純酒精——所以「公升 × 度數」直接就是單位數。',
      '美國一杯是 0.6 液盎司（17.7 毫升），世衛一杯是 10 克。',
      '一克酒精 7 大卡，本表只算酒精本身。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '술 순수 알코올량 — 도수 × 용량 224칸',
    'Pure alcohol in a drink — 224 cells of strength × volume',
    'Alcohol puro por bebida — 224 casillas de graduación × volumen',
    'Álcool puro por bebida — 224 células de graduação × volume',
    '酒の純アルコール量 — 度数 × 容量 224マス',
    'Reiner Alkohol im Getränk — 224 Felder aus Stärke × Menge',
    'Alcool pur par verre — 224 cases degré × volume',
    'पेय में शुद्ध अल्कोहल — तीव्रता × आयतन के 224 खाने',
    '酒的纯酒精量 — 度数 × 容量 224 格',
    '酒的純酒精量 — 度數 × 容量 224 格',
  ),
  hubMetaDesc: T(
    '용량 × 도수 × 0.789로 순수 알코올을 냅니다. 그것을 몇 잔으로 셀지가 나라마다 달라, 영국·WHO·미국 기준을 나란히 적었습니다.',
    'Volume × strength × 0.789 gives the pure alcohol. How many drinks that counts as differs by country, so the UK, WHO and US figures sit side by side.',
    'Volumen × graduación × 0,789 da el alcohol puro. Cuántas copas sean depende del país, así que las cifras del Reino Unido, la OMS y EE. UU. van juntas.',
    'Volume × graduação × 0,789 dá o álcool puro. Quantas doses isso conta depende do país, então as cifras do Reino Unido, OMS e EUA ficam lado a lado.',
    '容量 × 度数 × 0.789 で純アルコールを出します。それを何杯と数えるかは国ごとに違うので、英国・WHO・米国の基準を並べて載せました。',
    'Menge × Stärke × 0,789 ergibt den reinen Alkohol. Wie viele Drinks das sind, hängt vom Land ab — UK-, WHO- und US-Wert stehen nebeneinander.',
    'Volume × degré × 0,789 donne l’alcool pur. Combien de verres cela fait dépend du pays : les chiffres britannique, OMS et américain figurent côte à côte.',
    'आयतन × तीव्रता × 0.789 से शुद्ध अल्कोहल मिलता है। उसे कितने ड्रिंक गिना जाए यह देश पर निर्भर है, इसलिए ब्रिटेन, WHO और अमेरिका के आँकड़े साथ-साथ दिए हैं।',
    '容量 × 度数 × 0.789 得到纯酒精。算作几杯各国不同，所以把英国、世卫、美国三种口径并排列出。',
    '容量 × 度數 × 0.789 得到純酒精。算作幾杯各國不同，所以把英國、世衛、美國三種口徑並排列出。',
  ),

  metaTitle: T<(f: DrinkFacts) => string>(
    f => `${f.abv}% ${f.ml}ml — 순수 알코올 ${f.grams}g`,
    f => `${f.abv}% at ${f.ml} ml — ${f.grams} g of pure alcohol`,
    f => `${f.abv}% en ${f.ml} ml — ${f.grams} g de alcohol puro`,
    f => `${f.abv}% em ${f.ml} ml — ${f.grams} g de álcool puro`,
    f => `${f.abv}% ${f.ml}ml — 純アルコール${f.grams}g`,
    f => `${f.abv} % bei ${f.ml} ml — ${f.grams} g reiner Alkohol`,
    f => `${f.abv} % pour ${f.ml} ml — ${f.grams} g d’alcool pur`,
    f => `${f.abv}% के ${f.ml} ml — ${f.grams} g शुद्ध अल्कोहल`,
    f => `${f.abv}% ${f.ml}毫升 — 纯酒精 ${f.grams} 克`,
    f => `${f.abv}% ${f.ml}毫升 — 純酒精 ${f.grams} 克`,
  ),

  metaDesc: T<(f: DrinkFacts) => string>(
    f => `${f.abv}% 술 ${f.ml}ml의 순수 알코올은 ${f.grams}g(${f.pureMl}ml)입니다. 영국 ${f.ukUnits}유닛, WHO ${f.whoDrinks}잔, 미국 ${f.usDrinks}잔이고, 알코올만의 열량은 ${f.kcal}kcal입니다.`,
    f => `${f.ml} ml at ${f.abv}% holds ${f.grams} g (${f.pureMl} ml) of pure alcohol: ${f.ukUnits} UK units, ${f.whoDrinks} WHO drinks, ${f.usDrinks} US drinks, and ${f.kcal} kcal from the alcohol alone.`,
    f => `${f.ml} ml al ${f.abv}% contienen ${f.grams} g (${f.pureMl} ml) de alcohol puro: ${f.ukUnits} unidades británicas, ${f.whoDrinks} copas OMS, ${f.usDrinks} copas estadounidenses y ${f.kcal} kcal solo del alcohol.`,
    f => `${f.ml} ml a ${f.abv}% contêm ${f.grams} g (${f.pureMl} ml) de álcool puro: ${f.ukUnits} unidades britânicas, ${f.whoDrinks} doses OMS, ${f.usDrinks} doses americanas e ${f.kcal} kcal só do álcool.`,
    f => `${f.abv}%の酒${f.ml}mlの純アルコールは${f.grams}g(${f.pureMl}ml)です。英国${f.ukUnits}ユニット、WHO ${f.whoDrinks}杯、米国${f.usDrinks}杯、アルコールだけの熱量は${f.kcal}kcalです。`,
    f => `${f.ml} ml mit ${f.abv} % enthalten ${f.grams} g (${f.pureMl} ml) reinen Alkohol: ${f.ukUnits} UK-Units, ${f.whoDrinks} WHO-Drinks, ${f.usDrinks} US-Drinks und ${f.kcal} kcal allein aus dem Alkohol.`,
    f => `${f.ml} ml à ${f.abv} % contiennent ${f.grams} g (${f.pureMl} ml) d’alcool pur : ${f.ukUnits} unités britanniques, ${f.whoDrinks} verres OMS, ${f.usDrinks} verres américains et ${f.kcal} kcal pour le seul alcool.`,
    f => `${f.abv}% के ${f.ml} ml में ${f.grams} g (${f.pureMl} ml) शुद्ध अल्कोहल है: ${f.ukUnits} ब्रिटिश यूनिट, ${f.whoDrinks} WHO ड्रिंक, ${f.usDrinks} अमेरिकी ड्रिंक, और अकेले अल्कोहल से ${f.kcal} kcal।`,
    f => `${f.abv}% 的 ${f.ml} 毫升含纯酒精 ${f.grams} 克（${f.pureMl} 毫升）：英国 ${f.ukUnits} 单位、世卫 ${f.whoDrinks} 杯、美国 ${f.usDrinks} 杯，仅酒精一项 ${f.kcal} 千卡。`,
    f => `${f.abv}% 的 ${f.ml} 毫升含純酒精 ${f.grams} 克（${f.pureMl} 毫升）：英國 ${f.ukUnits} 單位、世衛 ${f.whoDrinks} 杯、美國 ${f.usDrinks} 杯，僅酒精一項 ${f.kcal} 大卡。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '왜 잔 수가 나라마다 다른가요?', a: '"한 잔"의 정의가 다르기 때문입니다. 영국은 순수 알코올 10ml, 미국은 0.6 fl oz(약 14g), WHO는 10g을 한 잔으로 셉니다. 미국 한 잔은 영국 1유닛의 1.77배라, 같은 술이 나라를 옮기면 잔 수가 그만큼 달라집니다.' },
      { q: '소주 한 병과 맥주 몇 캔이 같나요?', a: '순수 알코올로 견주면 됩니다. 17% 소주 360ml는 약 48g이고, 5% 맥주 500ml는 약 20g입니다. 소주 한 병이 맥주 500 두 캔 반쯤인 셈입니다. 도수와 용량은 병에 적힌 값을 그대로 이 표에서 짚으면 됩니다.' },
      { q: '도수가 낮으면 덜 마시는 건가요?', a: '잔 크기까지 봐야 합니다. 도수를 절반으로 하고 잔을 두 배로 하면 알코올 양이 그대로입니다. 4% 500ml와 8% 250ml가 같습니다.' },
      { q: '열량이 생각보다 적은데요?', a: '이 표는 알코올만 셌기 때문입니다. 알코올 1g이 7kcal인데, 맥주의 탄수화물이나 단맛이 있는 술의 당분, 섞어 마시는 음료는 여기에 안 들어 있습니다.' },
    ],
    [
      { q: 'Why does the number of drinks differ by country?', a: 'Because “one drink” is defined differently. The UK counts 10 ml of pure alcohol, the US 0.6 fl oz (about 14 g), the WHO 10 g. A US drink is 1.77 times a UK unit, so the same glass changes count when it crosses a border.' },
      { q: 'How does a bottle of soju compare with cans of beer?', a: 'Compare the pure alcohol. A 360 ml bottle of soju at 17% is about 48 g; a 500 ml beer at 5% is about 20 g. So the bottle is roughly two and a half of those beers. Read the strength and volume off the label and find them on this chart.' },
      { q: 'Is a weaker drink less alcohol?', a: 'Only if the glass is the same size. Halve the strength and double the glass and the alcohol is unchanged: 4% at 500 ml equals 8% at 250 ml.' },
      { q: 'The calorie figure looks low.', a: 'It counts the alcohol alone. A gram of alcohol is 7 kcal, but the carbohydrate in beer, the sugar in sweeter drinks, and anything mixed in are not included here.' },
    ],
    [
      { q: '¿Por qué cambia el número de copas según el país?', a: 'Porque «una copa» se define distinto. El Reino Unido cuenta 10 ml de alcohol puro, EE. UU. 0,6 fl oz (unos 14 g) y la OMS 10 g. Una copa estadounidense equivale a 1,77 unidades británicas, así que el mismo vaso cambia de cuenta al cruzar una frontera.' },
      { q: '¿Cuántas cervezas equivalen a una botella de soju?', a: 'Compare el alcohol puro. Una botella de 360 ml de soju al 17% son unos 48 g; una cerveza de 500 ml al 5%, unos 20 g. La botella son unas dos cervezas y media. Lea graduación y volumen en la etiqueta y búsquelos en esta tabla.' },
      { q: '¿Menos graduación es menos alcohol?', a: 'Solo si el vaso es igual. Reduzca la graduación a la mitad y duplique el vaso: el alcohol es el mismo. 4% en 500 ml equivale a 8% en 250 ml.' },
      { q: 'Las calorías parecen pocas.', a: 'Se cuenta solo el alcohol. Un gramo son 7 kcal, pero no se incluyen los carbohidratos de la cerveza, el azúcar de las bebidas dulces ni los mezcladores.' },
    ],
    [
      { q: 'Por que o número de doses muda por país?', a: 'Porque «uma dose» é definida de forma diferente. O Reino Unido conta 10 ml de álcool puro, os EUA 0,6 fl oz (cerca de 14 g) e a OMS 10 g. Uma dose americana equivale a 1,77 unidade britânica, então o mesmo copo muda de contagem ao cruzar a fronteira.' },
      { q: 'Quantas cervejas equivalem a uma garrafa de soju?', a: 'Compare o álcool puro. Uma garrafa de 360 ml de soju a 17% tem cerca de 48 g; uma cerveja de 500 ml a 5%, cerca de 20 g. A garrafa dá umas duas cervejas e meia. Leia graduação e volume no rótulo e procure-os nesta tabela.' },
      { q: 'Menos graduação é menos álcool?', a: 'Só se o copo for igual. Reduza a graduação pela metade e dobre o copo: o álcool é o mesmo. 4% em 500 ml equivale a 8% em 250 ml.' },
      { q: 'As calorias parecem poucas.', a: 'Conta-se só o álcool. Um grama são 7 kcal, mas não entram os carboidratos da cerveja, o açúcar das bebidas doces nem os misturadores.' },
    ],
    [
      { q: 'なぜ杯数が国ごとに違うのですか。', a: '「一杯」の定義が違うからです。英国は純アルコール10ml、米国は0.6 fl oz(約14g)、WHOは10gを一杯と数えます。米国の一杯は英国1ユニットの1.77倍なので、同じ酒でも国が変われば杯数がそれだけ変わります。' },
      { q: 'ソジュ一本はビール何缶に当たりますか。', a: '純アルコールで見比べます。17%のソジュ360mlは約48g、5%のビール500mlは約20gです。つまり一本がビール500の二缶半ほどです。度数と容量はラベルの値をそのままこの表で辿ってください。' },
      { q: '度数が低ければ飲む量も少ないのですか。', a: 'グラスの大きさまで見る必要があります。度数を半分にしてグラスを倍にすればアルコール量はそのままです。4%の500mlと8%の250mlが同じです。' },
      { q: '熱量が思ったより少ないのですが。', a: 'この表がアルコールだけを数えているからです。アルコール1gは7kcalですが、ビールの炭水化物や甘い酒の糖分、割り材はここに入っていません。' },
    ],
    [
      { q: 'Warum unterscheidet sich die Drink-Zahl je Land?', a: 'Weil „ein Drink“ anders definiert ist. Großbritannien zählt 10 ml reinen Alkohol, die USA 0,6 fl oz (rund 14 g), die WHO 10 g. Ein US-Drink entspricht 1,77 UK-Units — dasselbe Glas zählt jenseits der Grenze anders.' },
      { q: 'Wie viele Bier entsprechen einer Flasche Soju?', a: 'Vergleichen Sie den reinen Alkohol. Eine 360-ml-Flasche Soju mit 17 % hat rund 48 g, ein 500-ml-Bier mit 5 % rund 20 g. Die Flasche entspricht also etwa zweieinhalb solchen Bieren. Stärke und Menge stehen auf dem Etikett — damit gehen Sie in diese Tabelle.' },
      { q: 'Ist ein schwächeres Getränk weniger Alkohol?', a: 'Nur bei gleichem Glas. Halbe Stärke und doppeltes Glas heben sich auf: 4 % bei 500 ml entspricht 8 % bei 250 ml.' },
      { q: 'Die Kalorienzahl wirkt niedrig.', a: 'Sie zählt nur den Alkohol. Ein Gramm sind 7 kcal, aber Kohlenhydrate im Bier, Zucker in süßen Getränken und Mixer stecken hier nicht drin.' },
    ],
    [
      { q: 'Pourquoi le nombre de verres change-t-il selon le pays ?', a: 'Parce que « un verre » n’est pas défini pareil. Le Royaume-Uni compte 10 ml d’alcool pur, les États-Unis 0,6 fl oz (environ 14 g), l’OMS 10 g. Un verre américain vaut 1,77 unité britannique : le même verre change de compte en franchissant une frontière.' },
      { q: 'Une bouteille de soju équivaut à combien de bières ?', a: 'Comparez l’alcool pur. Une bouteille de 360 ml de soju à 17 % fait environ 48 g ; une bière de 500 ml à 5 %, environ 20 g. La bouteille vaut donc à peu près deux bières et demie. Relevez degré et volume sur l’étiquette et retrouvez-les dans ce tableau.' },
      { q: 'Un degré plus faible, est-ce moins d’alcool ?', a: 'Seulement à verre égal. Degré divisé par deux et verre doublé s’annulent : 4 % dans 500 ml équivaut à 8 % dans 250 ml.' },
      { q: 'Les calories semblent faibles.', a: 'Elles ne comptent que l’alcool. Un gramme fait 7 kcal, mais les glucides de la bière, le sucre des boissons douces et les mélangeurs n’y sont pas.' },
    ],
    [
      { q: 'ड्रिंक की संख्या देश-देश अलग क्यों?', a: 'क्योंकि “एक ड्रिंक” की परिभाषा अलग है। ब्रिटेन 10 ml शुद्ध अल्कोहल गिनता है, अमेरिका 0.6 fl oz (लगभग 14 g), WHO 10 g। अमेरिकी ड्रिंक ब्रिटिश यूनिट का 1.77 गुना है, इसलिए वही गिलास सरहद पार करते ही अलग गिना जाता है।' },
      { q: 'सोजू की एक बोतल कितनी बियर के बराबर है?', a: 'शुद्ध अल्कोहल से तुलना कीजिए। 17% की 360 ml सोजू में लगभग 48 g, 5% की 500 ml बियर में लगभग 20 g। यानी एक बोतल ढाई बियर के बराबर। तीव्रता और आयतन लेबल से पढ़कर इस तालिका में देखिए।' },
      { q: 'कम तीव्रता का मतलब कम अल्कोहल?', a: 'तभी, जब गिलास बराबर हो। तीव्रता आधी और गिलास दोगुना — अल्कोहल वही। 500 ml की 4% = 250 ml की 8%।' },
      { q: 'कैलोरी कम लग रही है।', a: 'यहाँ केवल अल्कोहल गिना गया है। एक ग्राम 7 kcal है, पर बियर के कार्बोहाइड्रेट, मीठे पेय की शक्कर और मिलाने वाली चीज़ें शामिल नहीं।' },
    ],
    [
      { q: '为什么杯数各国不同？', a: '因为「一杯」的定义不同。英国按 10 毫升纯酒精算，美国按 0.6 液盎司（约 14 克），世卫按 10 克。美国一杯等于 1.77 个英国单位，所以同一杯酒过了国境，杯数就变了。' },
      { q: '一瓶烧酒相当于几罐啤酒？', a: '按纯酒精比。17% 的 360 毫升烧酒约 48 克，5% 的 500 毫升啤酒约 20 克，所以一瓶大约是两罐半。度数和容量照瓶身上的数字在本表里查就行。' },
      { q: '度数低是不是喝得就少？', a: '还要看杯子多大。度数减半、杯子加倍，酒精量不变：4% 的 500 毫升等于 8% 的 250 毫升。' },
      { q: '热量怎么比想的少？', a: '因为本表只算酒精。一克酒精 7 千卡，但啤酒里的碳水、甜酒里的糖，以及兑进去的饮料都没算。' },
    ],
    [
      { q: '為什麼杯數各國不同？', a: '因為「一杯」的定義不同。英國按 10 毫升純酒精算，美國按 0.6 液盎司（約 14 克），世衛按 10 克。美國一杯等於 1.77 個英國單位，所以同一杯酒過了國境，杯數就變了。' },
      { q: '一瓶燒酒相當於幾罐啤酒？', a: '按純酒精比。17% 的 360 毫升燒酒約 48 克，5% 的 500 毫升啤酒約 20 克，所以一瓶大約是兩罐半。度數和容量照瓶身上的數字在本表裡查就行。' },
      { q: '度數低是不是喝得就少？', a: '還要看杯子多大。度數減半、杯子加倍，酒精量不變：4% 的 500 毫升等於 8% 的 250 毫升。' },
      { q: '熱量怎麼比想的少？', a: '因為本表只算酒精。一克酒精 7 大卡，但啤酒裡的碳水、甜酒裡的糖，以及兌進去的飲料都沒算。' },
    ],
  ),

  cellFaq: T<(f: DrinkFacts) => FaqItem[]>(
    f => [
      { q: `${f.abv}% 술 ${f.ml}ml에 알코올이 얼마나 들어 있나요?`, a: `순수 알코올 ${f.grams}g, 부피로는 ${f.pureMl}ml입니다.` },
      { q: `몇 잔으로 세나요?`, a: `영국 기준 ${f.ukUnits}유닛, WHO 기준 ${f.whoDrinks}잔, 미국 기준 ${f.usDrinks}잔입니다. 정의가 나라마다 달라 세 값이 다릅니다.` },
      { q: `열량은 얼마인가요?`, a: `알코올만 세면 ${f.kcal}kcal입니다. 안주는 물론이고 맥주의 탄수화물이나 섞어 마시는 음료도 여기에 안 들어 있습니다.` },
      { q: f.twin ? `같은 양이 되는 다른 조합이 있나요?` : `도수를 낮추면 어떻게 되나요?`, a: f.twin ? `있습니다. 도수를 절반으로 하고 잔을 두 배로 하면 알코올 양이 그대로입니다.` : `잔 크기가 같다면 도수에 비례해 줄어듭니다. 잔이 커지면 상쇄됩니다.` },
    ],
    f => [
      { q: `How much alcohol is in ${f.ml} ml at ${f.abv}%?`, a: `${f.grams} g of pure alcohol, which is ${f.pureMl} ml by volume.` },
      { q: `How many drinks is that?`, a: `${f.ukUnits} UK units, ${f.whoDrinks} WHO drinks, ${f.usDrinks} US drinks. The three differ because the definitions do.` },
      { q: `How many calories?`, a: `${f.kcal} kcal counting the alcohol alone — not the carbohydrate in beer, not mixers, and certainly not the food alongside.` },
      { q: f.twin ? `Is there another combination with the same amount?` : `What if I go weaker?`, a: f.twin ? `Yes. Halve the strength and double the glass and the alcohol is unchanged.` : `At the same glass size it falls in proportion to the strength. A bigger glass cancels it out.` },
    ],
    f => [
      { q: `¿Cuánto alcohol hay en ${f.ml} ml al ${f.abv}%?`, a: `${f.grams} g de alcohol puro, es decir ${f.pureMl} ml en volumen.` },
      { q: `¿Cuántas copas son?`, a: `${f.ukUnits} unidades británicas, ${f.whoDrinks} copas OMS, ${f.usDrinks} copas estadounidenses. Difieren porque las definiciones difieren.` },
      { q: `¿Cuántas calorías?`, a: `${f.kcal} kcal contando solo el alcohol: ni los carbohidratos de la cerveza, ni los mezcladores, ni desde luego la comida.` },
      { q: f.twin ? `¿Hay otra combinación con la misma cantidad?` : `¿Y si bajo la graduación?`, a: f.twin ? `Sí. Reduzca la graduación a la mitad y duplique el vaso: el alcohol es el mismo.` : `Con el mismo vaso baja en proporción a la graduación. Un vaso mayor lo compensa.` },
    ],
    f => [
      { q: `Quanto álcool há em ${f.ml} ml a ${f.abv}%?`, a: `${f.grams} g de álcool puro, ou seja ${f.pureMl} ml em volume.` },
      { q: `Quantas doses são?`, a: `${f.ukUnits} unidades britânicas, ${f.whoDrinks} doses OMS, ${f.usDrinks} doses americanas. Diferem porque as definições diferem.` },
      { q: `Quantas calorias?`, a: `${f.kcal} kcal contando só o álcool: nem os carboidratos da cerveja, nem os misturadores, nem a comida ao lado.` },
      { q: f.twin ? `Há outra combinação com a mesma quantidade?` : `E se eu baixar a graduação?`, a: f.twin ? `Há. Reduza a graduação pela metade e dobre o copo: o álcool é o mesmo.` : `Com o mesmo copo cai em proporção à graduação. Um copo maior compensa.` },
    ],
    f => [
      { q: `${f.abv}%の酒${f.ml}mlにアルコールはどれくらい入っていますか。`, a: `純アルコール${f.grams}g、体積では${f.pureMl}mlです。` },
      { q: `何杯と数えますか。`, a: `英国基準${f.ukUnits}ユニット、WHO基準${f.whoDrinks}杯、米国基準${f.usDrinks}杯です。定義が違うので三つの値も違います。` },
      { q: `熱量はどれくらいですか。`, a: `アルコールだけなら${f.kcal}kcalです。ビールの炭水化物も割り材も、まして肴も入っていません。` },
      { q: f.twin ? `同じ量になる別の組み合わせはありますか。` : `度数を下げるとどうなりますか。`, a: f.twin ? `あります。度数を半分にしてグラスを倍にすればアルコール量はそのままです。` : `グラスが同じなら度数に比例して減ります。グラスが大きくなると相殺されます。` },
    ],
    f => [
      { q: `Wie viel Alkohol stecken in ${f.ml} ml mit ${f.abv} %?`, a: `${f.grams} g reiner Alkohol, dem Volumen nach ${f.pureMl} ml.` },
      { q: `Wie viele Drinks sind das?`, a: `${f.ukUnits} UK-Units, ${f.whoDrinks} WHO-Drinks, ${f.usDrinks} US-Drinks. Die drei weichen ab, weil die Definitionen abweichen.` },
      { q: `Wie viele Kalorien?`, a: `${f.kcal} kcal, nur der Alkohol gezählt — ohne Kohlenhydrate im Bier, ohne Mixer und erst recht ohne das Essen daneben.` },
      { q: f.twin ? `Gibt es eine andere Kombination mit derselben Menge?` : `Und wenn ich schwächer trinke?`, a: f.twin ? `Ja. Halbe Stärke und doppeltes Glas lassen den Alkohol unverändert.` : `Bei gleichem Glas sinkt er proportional zur Stärke. Ein größeres Glas hebt das auf.` },
    ],
    f => [
      { q: `Combien d’alcool dans ${f.ml} ml à ${f.abv} % ?`, a: `${f.grams} g d’alcool pur, soit ${f.pureMl} ml en volume.` },
      { q: `Cela fait combien de verres ?`, a: `${f.ukUnits} unités britanniques, ${f.whoDrinks} verres OMS, ${f.usDrinks} verres américains. Les trois diffèrent parce que les définitions diffèrent.` },
      { q: `Combien de calories ?`, a: `${f.kcal} kcal pour le seul alcool — ni les glucides de la bière, ni les mélangeurs, ni bien sûr ce qu’on mange à côté.` },
      { q: f.twin ? `Existe-t-il une autre combinaison de même quantité ?` : `Et si je bois moins fort ?`, a: f.twin ? `Oui. Degré divisé par deux et verre doublé laissent l’alcool inchangé.` : `À verre égal, cela baisse proportionnellement au degré. Un verre plus grand annule le gain.` },
    ],
    f => [
      { q: `${f.abv}% के ${f.ml} ml में कितना अल्कोहल है?`, a: `${f.grams} g शुद्ध अल्कोहल, आयतन में ${f.pureMl} ml।` },
      { q: `यह कितने ड्रिंक हुए?`, a: `${f.ukUnits} ब्रिटिश यूनिट, ${f.whoDrinks} WHO ड्रिंक, ${f.usDrinks} अमेरिकी ड्रिंक। परिभाषाएँ अलग हैं, इसलिए तीनों अलग हैं।` },
      { q: `कितनी कैलोरी?`, a: `केवल अल्कोहल गिनें तो ${f.kcal} kcal — बियर के कार्बोहाइड्रेट, मिलाने वाली चीज़ें और साथ का खाना इसमें नहीं।` },
      { q: f.twin ? `क्या इतनी ही मात्रा का कोई और संयोजन है?` : `तीव्रता घटाने पर क्या होगा?`, a: f.twin ? `हाँ। तीव्रता आधी और गिलास दोगुना — अल्कोहल वही रहता है।` : `गिलास वही हो तो तीव्रता के अनुपात में घटता है। बड़ा गिलास उसे बराबर कर देता है।` },
    ],
    f => [
      { q: `${f.abv}% 的 ${f.ml} 毫升含多少酒精？`, a: `纯酒精 ${f.grams} 克，按体积是 ${f.pureMl} 毫升。` },
      { q: `算作几杯？`, a: `英国 ${f.ukUnits} 单位、世卫 ${f.whoDrinks} 杯、美国 ${f.usDrinks} 杯。定义不同，三个数就不同。` },
      { q: `多少热量？`, a: `只算酒精是 ${f.kcal} 千卡——啤酒里的碳水、兑的饮料，更不用说下酒菜，都没算进去。` },
      { q: f.twin ? `有别的组合是同样的量吗？` : `度数调低会怎样？`, a: f.twin ? `有。度数减半、杯子加倍，酒精量原封不动。` : `杯子一样大的话，按度数成比例减少；杯子变大就抵消了。` },
    ],
    f => [
      { q: `${f.abv}% 的 ${f.ml} 毫升含多少酒精？`, a: `純酒精 ${f.grams} 克，按體積是 ${f.pureMl} 毫升。` },
      { q: `算作幾杯？`, a: `英國 ${f.ukUnits} 單位、世衛 ${f.whoDrinks} 杯、美國 ${f.usDrinks} 杯。定義不同，三個數就不同。` },
      { q: `多少熱量？`, a: `只算酒精是 ${f.kcal} 大卡——啤酒裡的碳水、兌的飲料，更不用說下酒菜，都沒算進去。` },
      { q: f.twin ? `有別的組合是同樣的量嗎？` : `度數調低會怎樣？`, a: f.twin ? `有。度數減半、杯子加倍，酒精量原封不動。` : `杯子一樣大的話，按度數成比例減少；杯子變大就抵消了。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DRINK_UI: L<DrinkUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DrinkUI>;
