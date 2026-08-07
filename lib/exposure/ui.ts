/**
 * 노출값 화면의 문구 — 열 언어.
 *
 * f/5.6, 1/125, ISO 400 은 어느 나라 카메라에도 같은 모양으로 새겨져 있어
 * 옮기지 않는다. 옮기는 것은 빛의 이름과 설명뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ExposureFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ExposureUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  lightName: (key: string) => string;
  apertureLabel: string;
  shutterLabel: string;
  evLabel: string;
  evShort: string;
  printedLabel: string;
  driftLabel: string;
  secondsLabel: string;
  lightLabel: string;
  isoLabel: string;
  stopWord: string;
  roundTitle: string;
  roundNote: string;
  driftNote: (f: ExposureFacts) => string;
  diagonalTitle: string;
  diagonalNote: string;
  sunnyTitle: string;
  sunnyNote: string;
  isoTitle: string;
  isoNote: string;
  sameEvTitle: string;
  apertureRowTitle: string;
  shutterRowTitle: string;
  sameLookTitle: string;
  sameLookNote: string;
  desc: (f: ExposureFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: ExposureFacts) => string;
  metaDesc: (f: ExposureFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: ExposureFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Lights = Record<string, string>;
const namer = (m: Lights) => (key: string) => m[key] ?? key;

const lKo: Lights = {
  snow: '눈밭·모래사장', sunny: '맑은 날 한낮', hazy: '엷은 구름', cloudy: '흐린 날',
  overcast: '두꺼운 구름', shade: '그늘', sunset: '해질 무렵', indoor: '밝은 실내',
  dim: '어두운 실내', candle: '촛불', night: '밤거리·별빛',
};
const lEn: Lights = {
  snow: 'Snow or sand', sunny: 'Bright sun', hazy: 'Hazy sun', cloudy: 'Cloudy',
  overcast: 'Heavy overcast', shade: 'Open shade', sunset: 'Sunset', indoor: 'Bright interior',
  dim: 'Dim interior', candle: 'Candlelight', night: 'Night street or stars',
};
const lEs: Lights = {
  snow: 'Nieve o arena', sunny: 'Sol intenso', hazy: 'Sol velado', cloudy: 'Nublado',
  overcast: 'Muy nublado', shade: 'Sombra abierta', sunset: 'Atardecer', indoor: 'Interior luminoso',
  dim: 'Interior tenue', candle: 'Luz de vela', night: 'Calle nocturna o estrellas',
};
const lPt: Lights = {
  snow: 'Neve ou areia', sunny: 'Sol forte', hazy: 'Sol velado', cloudy: 'Nublado',
  overcast: 'Muito nublado', shade: 'Sombra aberta', sunset: 'Pôr do sol', indoor: 'Interior claro',
  dim: 'Interior escuro', candle: 'Luz de vela', night: 'Rua à noite ou estrelas',
};
const lJa: Lights = {
  snow: '雪原・砂浜', sunny: '晴天の日中', hazy: '薄曇り', cloudy: '曇り',
  overcast: '厚い雲', shade: '日陰', sunset: '夕暮れ', indoor: '明るい室内',
  dim: '暗い室内', candle: 'ろうそく', night: '夜の街・星明かり',
};
const lDe: Lights = {
  snow: 'Schnee oder Sand', sunny: 'Praller Sonnenschein', hazy: 'Dunstige Sonne', cloudy: 'Bewölkt',
  overcast: 'Stark bedeckt', shade: 'Offener Schatten', sunset: 'Sonnenuntergang', indoor: 'Heller Innenraum',
  dim: 'Dunkler Innenraum', candle: 'Kerzenlicht', night: 'Nachtstraße oder Sterne',
};
const lFr: Lights = {
  snow: 'Neige ou sable', sunny: 'Plein soleil', hazy: 'Soleil voilé', cloudy: 'Nuageux',
  overcast: 'Très couvert', shade: 'Ombre ouverte', sunset: 'Coucher de soleil', indoor: 'Intérieur clair',
  dim: 'Intérieur sombre', candle: 'Bougie', night: 'Rue de nuit ou étoiles',
};
const lHi: Lights = {
  snow: 'बर्फ़ या रेत', sunny: 'तेज़ धूप', hazy: 'हल्की धुंध', cloudy: 'बादल',
  overcast: 'घने बादल', shade: 'खुली छाया', sunset: 'सूर्यास्त', indoor: 'रोशन कमरा',
  dim: 'मंद कमरा', candle: 'मोमबत्ती', night: 'रात की सड़क या तारे',
};
const lZh: Lights = {
  snow: '雪地或沙滩', sunny: '晴天正午', hazy: '薄云', cloudy: '阴天',
  overcast: '厚云', shade: '阴影处', sunset: '日落', indoor: '明亮室内',
  dim: '昏暗室内', candle: '烛光', night: '夜间街道或星光',
};
const lTw: Lights = {
  snow: '雪地或沙灘', sunny: '晴天正午', hazy: '薄雲', cloudy: '陰天',
  overcast: '厚雲', shade: '陰影處', sunset: '日落', indoor: '明亮室內',
  dim: '昏暗室內', candle: '燭光', night: '夜間街道或星光',
};

type Spec = { [K in keyof ExposureUI]: L<ExposureUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    '노출값(EV) 표', 'Exposure value chart', 'Tabla de valor de exposición', 'Tabela de valor de exposição',
    '露出値(EV)表', 'Lichtwert-Tabelle', 'Tableau des indices de lumination', 'एक्सपोज़र वैल्यू तालिका',
    '曝光值(EV)表', '曝光值(EV)表',
  ),

  hubTitle: T(
    '노출값 209칸 — f/11은 사실 11.314이고 1/60초는 사실 1/64초입니다',
    '209 exposure cells — f/11 is really 11.314 and 1/60 s is really 1/64 s',
    '209 casillas de exposición — f/11 es en realidad 11,314 y 1/60 s es 1/64 s',
    '209 células de exposição — f/11 é na verdade 11,314 e 1/60 s é 1/64 s',
    '露出値209マス — f/11は実は11.314、1/60秒は実は1/64秒です',
    '209 Belichtungsfelder — f/11 ist in Wahrheit 11,314 und 1/60 s ist 1/64 s',
    '209 cases d’exposition — f/11 vaut en réalité 11,314 et 1/60 s vaut 1/64 s',
    '209 एक्सपोज़र खाने — f/11 असल में 11.314 है और 1/60 s असल में 1/64 s',
    '209 格曝光表 — f/11 其实是 11.314，1/60 秒其实是 1/64 秒',
    '209 格曝光表 — f/11 其實是 11.314，1/60 秒其實是 1/64 秒',
  ),

  hubLead: T(
    '노출 눈금은 한 칸마다 빛이 두 배가 되는 등비수열인데, 다이얼에는 읽기 좋은 수로 깎아 새깁니다. 그래서 EV는 두 축의 눈금 번호를 더하면 정수로 나오지만, 새겨진 숫자를 그대로 로그에 넣으면 최대 0.174만큼 어긋납니다. 조리개 열하나와 셔터 열아홉이 만나는 209칸을 두 값 다 적어 두었습니다.',
    'The exposure scale is geometric — each step doubles the light — but the dial is engraved with rounded, readable numbers. So the EV comes out as a whole number when you add the two scale positions, and drifts by up to 0.174 when you feed the engraved numbers into the logarithm. All 209 cells (eleven apertures × nineteen shutter speeds) carry both values.',
    'La escala de exposición es geométrica —cada paso duplica la luz—, pero el dial lleva grabados números redondeados y legibles. Por eso el EV sale entero al sumar las dos posiciones de escala, y se desvía hasta 0,174 al meter los números grabados en el logaritmo. Las 209 casillas (once diafragmas × diecinueve velocidades) traen ambos valores.',
    'A escala de exposição é geométrica — cada passo dobra a luz —, mas o dial traz números arredondados e legíveis. Por isso o EV sai inteiro ao somar as duas posições de escala, e desvia até 0,174 ao colocar os números gravados no logaritmo. As 209 células (onze diafragmas × dezenove velocidades) trazem os dois valores.',
    '露出の目盛りは一段ごとに光が倍になる等比数列ですが、ダイヤルには読みやすい数に丸めて刻みます。だからEVは両軸の目盛り番号を足せば整数で出るのに、刻まれた数をそのまま対数に入れると最大0.174ずれます。絞り11段とシャッター19段が交わる209マスに両方の値を載せました。',
    'Die Belichtungsskala ist geometrisch — jede Stufe verdoppelt das Licht —, doch auf dem Rad stehen gerundete, gut lesbare Zahlen. Deshalb ergibt der Lichtwert beim Addieren der beiden Skalenpositionen eine ganze Zahl und weicht um bis zu 0,174 ab, wenn man die gravierten Zahlen in den Logarithmus einsetzt. Alle 209 Felder (elf Blenden × neunzehn Zeiten) tragen beide Werte.',
    'L’échelle d’exposition est géométrique — chaque cran double la lumière — mais la molette porte des nombres arrondis, lisibles. L’indice tombe donc juste quand on additionne les deux positions d’échelle, et dérive jusqu’à 0,174 quand on injecte les nombres gravés dans le logarithme. Les 209 cases (onze ouvertures × dix-neuf vitesses) portent les deux valeurs.',
    'एक्सपोज़र का पैमाना ज्यामितीय है — हर पायदान पर रोशनी दोगुनी — पर डायल पर गोल किए हुए, पढ़ने में आसान अंक खुदे होते हैं। इसलिए दोनों पैमानों की स्थिति जोड़ने पर EV पूर्णांक निकलता है, और खुदे अंकों को लघुगणक में डालने पर 0.174 तक भटकता है। 209 खाने (ग्यारह अपर्चर × उन्नीस शटर) दोनों मान रखते हैं।',
    '曝光刻度是等比的——每一挡光量翻一倍——但表盘上刻的是取整后好读的数字。所以把两个刻度的序号相加，EV 是整数；把刻着的数字直接代进对数，最多会差 0.174。十一档光圈和十九档快门交出的 209 格，两个值都写上了。',
    '曝光刻度是等比的——每一擋光量翻一倍——但轉盤上刻的是取整後好讀的數字。所以把兩個刻度的序號相加，EV 是整數；把刻著的數字直接代進對數，最多會差 0.174。十一擋光圈和十九擋快門交出的 209 格，兩個值都寫上了。',
  ),

  lightName: T<(k: string) => string>(
    namer(lKo), namer(lEn), namer(lEs), namer(lPt), namer(lJa),
    namer(lDe), namer(lFr), namer(lHi), namer(lZh), namer(lTw),
  ),

  apertureLabel: T('조리개', 'Aperture', 'Diafragma', 'Diafragma', '絞り', 'Blende', 'Ouverture', 'अपर्चर', '光圈', '光圈'),
  shutterLabel: T('셔터', 'Shutter', 'Velocidad', 'Velocidade', 'シャッター', 'Verschlusszeit', 'Vitesse', 'शटर', '快门', '快門'),
  evShort: T('EV', 'EV', 'EV', 'EV', 'EV', 'LW', 'IL', 'EV', 'EV', 'EV'),
  evLabel: T('EV(눈금)', 'EV (by stops)', 'EV (por pasos)', 'EV (por passos)', 'EV(目盛り)', 'LW (nach Stufen)', 'IL (par crans)', 'EV (पायदान से)', 'EV（按挡）', 'EV（按檔）'),
  printedLabel: T('EV(새겨진 수)', 'EV (as engraved)', 'EV (según lo grabado)', 'EV (conforme gravado)', 'EV(刻まれた数)', 'LW (nach Gravur)', 'IL (nombres gravés)', 'EV (खुदे अंकों से)', 'EV（按刻字）', 'EV（按刻字）'),
  driftLabel: T('어긋남', 'Drift', 'Desviación', 'Desvio', 'ずれ', 'Abweichung', 'Écart', 'अंतर', '偏差', '偏差'),
  secondsLabel: T('노출 시간', 'Exposure time', 'Tiempo de exposición', 'Tempo de exposição', '露出時間', 'Belichtungszeit', 'Temps de pose', 'एक्सपोज़र समय', '曝光时间', '曝光時間'),
  lightLabel: T('이 밝기의 빛', 'Light at this level', 'Luz de este nivel', 'Luz deste nível', 'この明るさの光', 'Licht dieser Stufe', 'Lumière à ce niveau', 'इस स्तर की रोशनी', '这一亮度的光', '這一亮度的光'),
  isoLabel: T('감도', 'ISO', 'ISO', 'ISO', '感度', 'ISO', 'ISO', 'ISO', '感光度', '感光度'),
  stopWord: T('스톱', 'stops', 'pasos', 'passos', '段', 'Stufen', 'crans', 'पायदान', '挡', '檔'),

  roundTitle: T(
    '눈금은 깎아서 새깁니다',
    'The scale is engraved rounded',
    'La escala se graba redondeada',
    'A escala é gravada arredondada',
    '目盛りは丸めて刻まれます',
    'Die Skala wird gerundet graviert',
    'L’échelle est gravée arrondie',
    'पैमाना गोल करके खुदा होता है',
    '刻度是取整之后刻上去的',
    '刻度是取整之後刻上去的',
  ),
  roundNote: T(
    '조리개는 √2배마다 한 칸이므로 1, 1.414, 2, 2.828, 4, 5.657, 8, 11.314, 16, 22.627, 32이 참값입니다. 다이얼에는 1.4, 2.8, 5.6, 11, 22로 깎아 새깁니다. 셔터도 2배마다 한 칸이라 1/64, 1/128, 1/256초가 참값인데 1/60, 1/125, 1/250으로 새깁니다. f/11과 f/22가 가장 많이 깎였고(−0.081스톱), 1/60·1/30·1/15초 계열이 그다음입니다(−0.093스톱). 이 둘이 만나는 여섯 칸에서 어긋남이 0.174로 가장 큽니다 — 1/6스톱쯤이라 사진으로는 보이지 않지만, 계산기를 두 개 돌리면 답이 다르게 나오는 까닭이 이것입니다.',
    'Apertures step by √2, so the true values are 1, 1.414, 2, 2.828, 4, 5.657, 8, 11.314, 16, 22.627, 32. The dial is engraved 1.4, 2.8, 5.6, 11, 22. Shutter speeds step by 2, so 1/64, 1/128, 1/256 s are the true values, engraved as 1/60, 1/125, 1/250. f/11 and f/22 are shaved the most (−0.081 stop), the 1/60–1/30–1/15 family next (−0.093 stop). Where those two meet — six cells — the drift reaches 0.174, about a sixth of a stop. Invisible in a photograph, but it is why two exposure calculators can disagree.',
    'Los diafragmas avanzan de √2 en √2: los valores verdaderos son 1, 1,414, 2, 2,828, 4, 5,657, 8, 11,314, 16, 22,627, 32. En el dial se graba 1,4, 2,8, 5,6, 11, 22. Las velocidades avanzan de 2 en 2: 1/64, 1/128, 1/256 s son los verdaderos, grabados como 1/60, 1/125, 1/250. f/11 y f/22 son los más recortados (−0,081 paso), y luego la familia 1/60–1/30–1/15 (−0,093 paso). Donde se cruzan —seis casillas— la desviación llega a 0,174, un sexto de paso. Invisible en la foto, pero explica que dos calculadoras no coincidan.',
    'Os diafragmas avançam de √2 em √2: os valores verdadeiros são 1, 1,414, 2, 2,828, 4, 5,657, 8, 11,314, 16, 22,627, 32. No dial grava-se 1,4, 2,8, 5,6, 11, 22. As velocidades avançam de 2 em 2: 1/64, 1/128, 1/256 s são as verdadeiras, gravadas como 1/60, 1/125, 1/250. f/11 e f/22 são os mais cortados (−0,081 passo), depois a família 1/60–1/30–1/15 (−0,093 passo). Onde se cruzam — seis células — o desvio chega a 0,174, cerca de um sexto de passo. Invisível na foto, mas explica duas calculadoras discordarem.',
    '絞りは√2倍ごとに一段なので、真の値は1、1.414、2、2.828、4、5.657、8、11.314、16、22.627、32です。ダイヤルには1.4、2.8、5.6、11、22と丸めて刻みます。シャッターも2倍ごとなので1/64、1/128、1/256秒が真の値ですが、1/60、1/125、1/250と刻まれます。f/11とf/22の削りが最も大きく(−0.081段)、次が1/60・1/30・1/15秒の系列です(−0.093段)。この二つが交わる六マスでずれが0.174、およそ1/6段になります。写真では見えませんが、露出計算機どうしで答えが食い違う理由がこれです。',
    'Blenden schreiten in √2-Schritten, die wahren Werte sind also 1, 1,414, 2, 2,828, 4, 5,657, 8, 11,314, 16, 22,627, 32. Graviert wird 1,4, 2,8, 5,6, 11, 22. Zeiten schreiten in 2er-Schritten: wahr sind 1/64, 1/128, 1/256 s, graviert 1/60, 1/125, 1/250. f/11 und f/22 sind am stärksten gekürzt (−0,081 Stufe), danach die Reihe 1/60–1/30–1/15 (−0,093 Stufe). Wo beide zusammentreffen — sechs Felder — erreicht die Abweichung 0,174, etwa ein Sechstel einer Stufe. Im Bild unsichtbar, aber der Grund, warum zwei Belichtungsrechner sich widersprechen.',
    'Les ouvertures progressent d’un facteur √2 : les vraies valeurs sont 1, 1,414, 2, 2,828, 4, 5,657, 8, 11,314, 16, 22,627, 32. La molette porte 1,4, 2,8, 5,6, 11, 22. Les vitesses progressent d’un facteur 2 : 1/64, 1/128, 1/256 s sont les vraies, gravées 1/60, 1/125, 1/250. f/11 et f/22 sont les plus rabotées (−0,081 cran), puis la famille 1/60–1/30–1/15 (−0,093 cran). Là où les deux se croisent — six cases — l’écart atteint 0,174, environ un sixième de cran. Invisible sur l’image, mais c’est pourquoi deux calculateurs peuvent diverger.',
    'अपर्चर √2 के गुणक में बढ़ते हैं, इसलिए असली मान 1, 1.414, 2, 2.828, 4, 5.657, 8, 11.314, 16, 22.627, 32 हैं। डायल पर 1.4, 2.8, 5.6, 11, 22 खुदा होता है। शटर 2 के गुणक में बढ़ते हैं: असली मान 1/64, 1/128, 1/256 s हैं, खुदे 1/60, 1/125, 1/250। f/11 और f/22 सबसे ज़्यादा कटे हैं (−0.081 पायदान), फिर 1/60–1/30–1/15 वाला परिवार (−0.093 पायदान)। जहाँ ये मिलते हैं — छह खाने — अंतर 0.174 तक पहुँचता है, लगभग छठा हिस्सा। तस्वीर में नहीं दिखता, पर दो कैलकुलेटर अलग उत्तर क्यों देते हैं, कारण यही है।',
    '光圈每挡差 √2 倍，真值是 1、1.414、2、2.828、4、5.657、8、11.314、16、22.627、32；表盘上刻的是 1.4、2.8、5.6、11、22。快门每挡差 2 倍，真值是 1/64、1/128、1/256 秒，刻的是 1/60、1/125、1/250。f/11 和 f/22 削得最多（−0.081 挡），其次是 1/60、1/30、1/15 这一系（−0.093 挡）。两者相交的六格，偏差达到 0.174，约六分之一挡。照片上看不出来，但两个曝光计算器给出不同答案，原因就在这里。',
    '光圈每擋差 √2 倍，真值是 1、1.414、2、2.828、4、5.657、8、11.314、16、22.627、32；轉盤上刻的是 1.4、2.8、5.6、11、22。快門每擋差 2 倍，真值是 1/64、1/128、1/256 秒，刻的是 1/60、1/125、1/250。f/11 和 f/22 削得最多（−0.081 擋），其次是 1/60、1/30、1/15 這一系（−0.093 擋）。兩者相交的六格，偏差達到 0.174，約六分之一擋。照片上看不出來，但兩個曝光計算器給出不同答案，原因就在這裡。',
  ),

  driftNote: T<(f: ExposureFacts) => string>(
    f => f.exact
      ? `이 칸은 두 축 다 깎이지 않아 새겨진 숫자로 계산해도 EV가 정확히 ${f.ev}입니다. 209칸 가운데 마흔두 칸만 그렇습니다.`
      : `새겨진 숫자로 계산하면 ${f.evPrinted}이 나와 ${f.drift > 0 ? '+' : ''}${f.drift}만큼 어긋납니다 — 조리개에서 ${f.apertureDrift}, 셔터에서 ${f.shutterDrift}입니다.`,
    f => f.exact
      ? `Neither scale is rounded here, so the engraved numbers give exactly EV ${f.ev}. Only forty-two of the 209 cells do.`
      : `The engraved numbers give ${f.evPrinted}, a drift of ${f.drift > 0 ? '+' : ''}${f.drift} — ${f.apertureDrift} from the aperture and ${f.shutterDrift} from the shutter.`,
    f => f.exact
      ? `Aquí ninguna escala está redondeada, así que los números grabados dan exactamente EV ${f.ev}. Solo cuarenta y dos de las 209 casillas lo consiguen.`
      : `Los números grabados dan ${f.evPrinted}, una desviación de ${f.drift > 0 ? '+' : ''}${f.drift}: ${f.apertureDrift} del diafragma y ${f.shutterDrift} de la velocidad.`,
    f => f.exact
      ? `Aqui nenhuma escala está arredondada, então os números gravados dão exatamente EV ${f.ev}. Só quarenta e duas das 209 células conseguem.`
      : `Os números gravados dão ${f.evPrinted}, um desvio de ${f.drift > 0 ? '+' : ''}${f.drift}: ${f.apertureDrift} do diafragma e ${f.shutterDrift} da velocidade.`,
    f => f.exact
      ? `このマスは両軸とも丸められていないので、刻まれた数で計算してもEVはちょうど${f.ev}です。209マス中42マスだけがそうです。`
      : `刻まれた数で計算すると${f.evPrinted}になり、${f.drift > 0 ? '+' : ''}${f.drift}ずれます — 絞りで${f.apertureDrift}、シャッターで${f.shutterDrift}です。`,
    f => f.exact
      ? `Hier ist keine der Skalen gerundet, die gravierten Zahlen ergeben also genau LW ${f.ev}. Nur 42 der 209 Felder schaffen das.`
      : `Die gravierten Zahlen ergeben ${f.evPrinted}, eine Abweichung von ${f.drift > 0 ? '+' : ''}${f.drift} — ${f.apertureDrift} von der Blende, ${f.shutterDrift} von der Zeit.`,
    f => f.exact
      ? `Ici aucune des deux échelles n’est arrondie : les nombres gravés donnent exactement IL ${f.ev}. Seules 42 des 209 cases y parviennent.`
      : `Les nombres gravés donnent ${f.evPrinted}, soit un écart de ${f.drift > 0 ? '+' : ''}${f.drift} — ${f.apertureDrift} pour l’ouverture, ${f.shutterDrift} pour la vitesse.`,
    f => f.exact
      ? `यहाँ दोनों पैमाने गोल नहीं किए गए, इसलिए खुदे अंकों से भी EV ठीक ${f.ev} आता है। 209 में से केवल बयालीस खाने ऐसे हैं।`
      : `खुदे अंकों से ${f.evPrinted} आता है, यानी ${f.drift > 0 ? '+' : ''}${f.drift} का अंतर — अपर्चर से ${f.apertureDrift}, शटर से ${f.shutterDrift}।`,
    f => f.exact
      ? `这一格两个刻度都没被取整，所以用刻字算出来的 EV 正好是 ${f.ev}。209 格里只有四十二格如此。`
      : `用刻字算是 ${f.evPrinted}，差 ${f.drift > 0 ? '+' : ''}${f.drift}——光圈贡献 ${f.apertureDrift}，快门贡献 ${f.shutterDrift}。`,
    f => f.exact
      ? `這一格兩個刻度都沒被取整，所以用刻字算出來的 EV 正好是 ${f.ev}。209 格裡只有四十二格如此。`
      : `用刻字算是 ${f.evPrinted}，差 ${f.drift > 0 ? '+' : ''}${f.drift}——光圈貢獻 ${f.apertureDrift}，快門貢獻 ${f.shutterDrift}。`,
  ),

  diagonalTitle: T('같은 EV의 대각선', 'The equal-EV diagonal', 'La diagonal de igual EV', 'A diagonal de EV igual', '同じEVの対角線', 'Die Diagonale gleichen Lichtwerts', 'La diagonale d’indice égal', 'समान EV का विकर्ण', '同 EV 的对角线', '同 EV 的對角線'),
  diagonalNote: T(
    '조리개를 한 칸 조이고 셔터를 한 칸 늦추면 EV가 그대로입니다. 그래서 같은 EV의 칸들은 표에서 대각선 한 줄로 놓입니다. 가장 긴 줄이 열한 칸이고, 표의 구석으로 갈수록 짧아집니다.',
    'Close the aperture one stop and slow the shutter one stop and the EV does not move. So the cells of equal EV lie along a diagonal. The longest such run is eleven cells; runs get shorter toward the corners of the table.',
    'Cierre un paso el diafragma y ralentice un paso la velocidad: el EV no se mueve. Por eso las casillas de igual EV forman una diagonal. La más larga tiene once casillas y se acortan hacia las esquinas.',
    'Feche um passo o diafragma e diminua um passo a velocidade: o EV não muda. Por isso as células de EV igual formam uma diagonal. A maior tem onze células e elas encurtam em direção aos cantos.',
    '絞りを一段絞ってシャッターを一段遅くすると、EVは動きません。だから同じEVのマスは表の対角線に並びます。いちばん長い列が11マスで、隅に行くほど短くなります。',
    'Blende eine Stufe schließen, Zeit eine Stufe verlängern — der Lichtwert bleibt gleich. Deshalb liegen Felder gleichen Lichtwerts auf einer Diagonale. Die längste zählt elf Felder, zu den Ecken hin werden sie kürzer.',
    'Fermez d’un cran l’ouverture et ralentissez d’un cran la vitesse : l’indice ne bouge pas. Les cases d’indice égal forment donc une diagonale. La plus longue compte onze cases, elles raccourcissent vers les coins.',
    'अपर्चर एक पायदान बंद कीजिए और शटर एक पायदान धीमा — EV वही रहता है। इसलिए समान EV वाले खाने विकर्ण पर बैठते हैं। सबसे लंबी पंक्ति ग्यारह खानों की है, कोनों की ओर छोटी होती जाती है।',
    '光圈收一挡、快门慢一挡，EV 不变。所以同 EV 的格子在表里排成一条对角线。最长的一条十一格，越靠近表的角落越短。',
    '光圈收一擋、快門慢一擋，EV 不變。所以同 EV 的格子在表裡排成一條對角線。最長的一條十一格，越靠近表的角落越短。',
  ),

  sunnyTitle: T('맑은 날 f/16 규칙', 'The Sunny 16 rule', 'La regla del Sunny 16', 'A regra Sunny 16', '晴天f/16の法則', 'Die Sunny-16-Regel', 'La règle f/16 par beau temps', 'सनी 16 नियम', '晴天 f/16 法则', '晴天 f/16 法則'),
  sunnyNote: T(
    '맑은 날 한낮에는 f/16에 셔터를 감도 분의 1로 두면 맞는다는 규칙입니다. ISO 100이면 1/100초인데 다이얼에 그 눈금이 없으니 1/125초를 씁니다 — 이 표에서 f/16 · 1/125가 EV 15이고, 그것이 맑은 날 한낮의 밝기입니다. 노출계 없이 어림잡을 때 여전히 쓰입니다.',
    'On a bright sunny day, set f/16 and the shutter to one over the ISO. At ISO 100 that is 1/100 s, which is not on the dial, so you use 1/125 s — in this table f/16 · 1/125 is EV 15, and EV 15 is bright sun. Still useful when you have no meter.',
    'En pleno sol, ponga f/16 y la velocidad a uno partido por el ISO. Con ISO 100 son 1/100 s, que no está en el dial, así que se usa 1/125 s: en esta tabla f/16 · 1/125 es EV 15, y EV 15 es sol intenso. Sigue sirviendo cuando no hay fotómetro.',
    'Em pleno sol, use f/16 e a velocidade em um sobre o ISO. Com ISO 100 dá 1/100 s, que não existe no dial, então usa-se 1/125 s: nesta tabela f/16 · 1/125 é EV 15, e EV 15 é sol forte. Ainda serve quando não há fotômetro.',
    '晴天の日中は、f/16にしてシャッターを感度分の1にすれば合うという法則です。ISO 100なら1/100秒ですが、その目盛りがないので1/125秒を使います — この表でf/16・1/125がEV 15、それが晴天の日中の明るさです。露出計がないときの目安に今も使われます。',
    'Bei prallem Sonnenschein Blende f/16 und die Zeit auf eins durch ISO stellen. Bei ISO 100 wären das 1/100 s, was es auf dem Rad nicht gibt — also 1/125 s. In dieser Tabelle ist f/16 · 1/125 gleich LW 15, und LW 15 ist praller Sonnenschein. Ohne Belichtungsmesser noch immer brauchbar.',
    'En plein soleil, réglez f/16 et la vitesse à un sur l’ISO. À 100 ISO cela ferait 1/100 s, absente de la molette : on prend 1/125 s. Dans ce tableau, f/16 · 1/125 vaut IL 15, et IL 15, c’est le plein soleil. Toujours utile sans posemètre.',
    'तेज़ धूप में f/16 रखिए और शटर को ISO के व्युत्क्रम पर। ISO 100 पर वह 1/100 s होगा, जो डायल पर नहीं है, इसलिए 1/125 s लेते हैं — इस तालिका में f/16 · 1/125 का EV 15 है, और EV 15 का मतलब तेज़ धूप। मीटर न हो तो आज भी काम आता है।',
    '晴天正午，光圈 f/16，快门定成感光度的倒数。ISO 100 就是 1/100 秒，可表盘上没有这一挡，所以用 1/125 秒——本表中 f/16 · 1/125 正是 EV 15，而 EV 15 就是晴天正午。没有测光表时仍然管用。',
    '晴天正午，光圈 f/16，快門定成感光度的倒數。ISO 100 就是 1/100 秒，可轉盤上沒有這一擋，所以用 1/125 秒——本表中 f/16 · 1/125 正是 EV 15，而 EV 15 就是晴天正午。沒有測光表時仍然管用。',
  ),

  isoTitle: T('감도를 올리면', 'Raising the ISO', 'Si sube el ISO', 'Se aumentar o ISO', '感度を上げると', 'Wenn man die ISO erhöht', 'Si l’on monte en ISO', 'ISO बढ़ाने पर', '把感光度调高', '把感光度調高'),
  isoNote: T(
    '감도도 두 배마다 한 칸이라, ISO를 두 배로 올리면 EV가 1 올라갑니다. 같은 조리개·셔터로 한 칸 어두운 곳까지 담을 수 있다는 뜻입니다.',
    'ISO doubles by the stop as well, so doubling it raises the EV by one: the same aperture and shutter now cover a scene one stop darker.',
    'El ISO también dobla por paso, así que duplicarlo sube el EV en uno: el mismo diafragma y velocidad cubren una escena un paso más oscura.',
    'O ISO também dobra por passo, então dobrá-lo sobe o EV em um: o mesmo diafragma e velocidade cobrem uma cena um passo mais escura.',
    '感度も倍ごとに一段なので、ISOを倍にするとEVが1上がります。同じ絞り・シャッターで一段暗い場面まで写せるということです。',
    'Auch die ISO verdoppelt sich je Stufe: verdoppelt man sie, steigt der Lichtwert um eins — dieselbe Blende und Zeit erfassen eine um eine Stufe dunklere Szene.',
    'L’ISO double aussi par cran : le doubler augmente l’indice de un, et les mêmes ouverture et vitesse couvrent une scène un cran plus sombre.',
    'ISO भी हर पायदान पर दोगुना होता है, इसलिए उसे दोगुना करने पर EV एक बढ़ जाता है: वही अपर्चर और शटर अब एक पायदान अंधेरा दृश्य भी संभालते हैं।',
    '感光度也是每挡翻倍，所以 ISO 翻一倍，EV 就加一：同样的光圈快门，能拍暗一挡的场景。',
    '感光度也是每擋翻倍，所以 ISO 翻一倍，EV 就加一：同樣的光圈快門，能拍暗一擋的場景。',
  ),

  sameLookTitle: T('EV가 같아도 사진은 다릅니다', 'Same EV, different photograph', 'Mismo EV, foto distinta', 'Mesmo EV, foto diferente', 'EVが同じでも写真は違います', 'Gleicher Lichtwert, anderes Bild', 'Même indice, autre photo', 'EV वही, तस्वीर अलग', 'EV 相同，照片不同', 'EV 相同，照片不同'),
  sameLookNote: T(
    '같은 대각선의 칸들은 필름이나 센서에 닿는 빛의 양이 같습니다. 그래도 사진은 다릅니다 — 조리개를 열면 배경이 흐려지고, 셔터를 늦추면 움직이는 것이 흐릅니다. 밝기만 같을 뿐입니다.',
    'Cells on the same diagonal put the same amount of light on the film or sensor. The photographs still differ: a wider aperture blurs the background, a slower shutter blurs whatever moves. Only the brightness matches.',
    'Las casillas de una misma diagonal dejan pasar la misma cantidad de luz. Aun así las fotos difieren: un diafragma más abierto desenfoca el fondo, una velocidad más lenta arrastra lo que se mueve. Solo coincide el brillo.',
    'As células de uma mesma diagonal deixam passar a mesma quantidade de luz. Ainda assim as fotos diferem: um diafragma mais aberto desfoca o fundo, uma velocidade mais lenta borra o que se move. Só o brilho coincide.',
    '同じ対角線のマスは、フィルムやセンサーに届く光の量が同じです。それでも写真は違います — 絞りを開ければ背景がぼけ、シャッターを遅くすれば動くものがぶれます。同じなのは明るさだけです。',
    'Felder derselben Diagonale lassen dieselbe Lichtmenge auf Film oder Sensor. Die Bilder unterscheiden sich trotzdem: eine offenere Blende macht den Hintergrund unscharf, eine längere Zeit verwischt Bewegtes. Gleich ist nur die Helligkeit.',
    'Les cases d’une même diagonale laissent passer la même quantité de lumière. Les photos diffèrent pourtant : une ouverture plus grande floute l’arrière-plan, une vitesse plus lente file ce qui bouge. Seule la luminosité est identique.',
    'एक ही विकर्ण के खाने फ़िल्म या सेंसर पर उतनी ही रोशनी डालते हैं। फिर भी तस्वीरें अलग होती हैं: खुला अपर्चर पृष्ठभूमि धुंधली करता है, धीमा शटर चलती चीज़ को। बस चमक समान रहती है।',
    '同一条对角线上的格子，落在胶片或传感器上的光量相同。可照片仍然不同：光圈开大，背景就虚；快门放慢，动的东西就糊。相同的只有亮度。',
    '同一條對角線上的格子，落在底片或感光元件上的光量相同。可照片仍然不同：光圈開大，背景就虛；快門放慢，動的東西就糊。相同的只有亮度。',
  ),

  sameEvTitle: T('같은 EV의 다른 조합', 'Other combinations at this EV', 'Otras combinaciones con este EV', 'Outras combinações neste EV', '同じEVの他の組み合わせ', 'Andere Kombinationen bei diesem Lichtwert', 'Autres combinaisons à cet indice', 'इसी EV के अन्य संयोजन', '同 EV 的其他组合', '同 EV 的其他組合'),
  apertureRowTitle: T('같은 조리개의 줄', 'Same aperture', 'Mismo diafragma', 'Mesmo diafragma', '同じ絞りの列', 'Gleiche Blende', 'Même ouverture', 'वही अपर्चर', '同一光圈', '同一光圈'),
  shutterRowTitle: T('같은 셔터의 줄', 'Same shutter speed', 'Misma velocidad', 'Mesma velocidade', '同じシャッターの列', 'Gleiche Verschlusszeit', 'Même vitesse', 'वही शटर', '同一快门', '同一快門'),

  desc: T<(f: ExposureFacts) => string>(
    f => `${f.apertureText}에 ${f.shutterProse}초는 ISO 100에서 EV ${f.ev}입니다. ${lKo[f.light]} 정도의 밝기이고, 같은 EV의 조합이 ${f.equivalents.length}개 더 있습니다.`,
    f => `${f.apertureText} at ${f.shutterProse} s is EV ${f.ev} at ISO 100 — about the light of ${lEn[f.light].toLowerCase()}. There are ${f.equivalents.length} other combinations at the same EV.`,
    f => `${f.apertureText} a ${f.shutterProse} s es EV ${f.ev} con ISO 100, la luz de ${lEs[f.light].toLowerCase()}. Hay ${f.equivalents.length} combinaciones más con el mismo EV.`,
    f => `${f.apertureText} a ${f.shutterProse} s é EV ${f.ev} com ISO 100, a luz de ${lPt[f.light].toLowerCase()}. Há mais ${f.equivalents.length} combinações no mesmo EV.`,
    f => `${f.apertureText}で${f.shutterProse}秒はISO 100でEV ${f.ev}です。${lJa[f.light]}ほどの明るさで、同じEVの組み合わせが他に${f.equivalents.length}通りあります。`,
    f => `${f.apertureText} bei ${f.shutterProse} s ergibt bei ISO 100 den Lichtwert ${f.ev} — etwa das Licht von ${lDe[f.light].toLowerCase()}. Es gibt ${f.equivalents.length} weitere Kombinationen mit demselben Wert.`,
    f => `${f.apertureText} à ${f.shutterProse} s vaut IL ${f.ev} à 100 ISO, la lumière de ${lFr[f.light].toLowerCase()}. ${f.equivalents.length} autres combinaisons donnent le même indice.`,
    f => `${f.apertureText} पर ${f.shutterProse} s का EV ISO 100 पर ${f.ev} है — लगभग ${lHi[f.light]} जैसी रोशनी। इसी EV के ${f.equivalents.length} और संयोजन हैं।`,
    f => `${f.apertureText} 配 ${f.shutterProse} 秒，在 ISO 100 下是 EV ${f.ev}，大致相当于${lZh[f.light]}的亮度。同 EV 的组合另有 ${f.equivalents.length} 种。`,
    f => `${f.apertureText} 配 ${f.shutterProse} 秒，在 ISO 100 下是 EV ${f.ev}，大致相當於${lTw[f.light]}的亮度。同 EV 的組合另有 ${f.equivalents.length} 種。`,
  ),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      'EV = log2(조리개² ÷ 노출 시간). f/1.0에서 1초가 EV 0입니다.',
      '눈금이 두 배씩 가므로 EV는 두 축의 눈금 번호를 더한 값과 같습니다.',
      '조리개를 한 칸 조이면 EV가 1 오르고, 셔터를 한 칸 빠르게 해도 1 오릅니다.',
      '같은 EV의 칸들은 대각선으로 놓입니다 — 빛의 양이 같은 조합입니다.',
      'ISO를 두 배로 올리면 EV가 1 올라갑니다.',
      '새겨진 숫자는 반올림한 것이라 계산하면 EV가 최대 0.174 어긋납니다.',
    ],
    [
      'EV = log2(aperture² ÷ exposure time). f/1.0 for one second is EV 0.',
      'Because the scale doubles each step, the EV equals the sum of the two scale positions.',
      'Close the aperture one stop and the EV rises by one; speed up the shutter one stop and it rises by one.',
      'Cells of equal EV lie on a diagonal — combinations that pass the same amount of light.',
      'Doubling the ISO raises the EV by one.',
      'The engraved numbers are rounded, so computing from them drifts the EV by up to 0.174.',
    ],
    [
      'EV = log2(diafragma² ÷ tiempo de exposición). f/1,0 durante un segundo es EV 0.',
      'Como la escala dobla en cada paso, el EV es la suma de las dos posiciones de escala.',
      'Cierre un paso el diafragma y el EV sube uno; acelere un paso la velocidad y también sube uno.',
      'Las casillas de igual EV están en diagonal: combinaciones que dejan pasar la misma luz.',
      'Duplicar el ISO sube el EV en uno.',
      'Los números grabados están redondeados, así que calcular con ellos desvía el EV hasta 0,174.',
    ],
    [
      'EV = log2(diafragma² ÷ tempo de exposição). f/1,0 por um segundo é EV 0.',
      'Como a escala dobra a cada passo, o EV é a soma das duas posições de escala.',
      'Feche um passo o diafragma e o EV sobe um; acelere um passo a velocidade e também sobe um.',
      'As células de EV igual ficam na diagonal: combinações que deixam passar a mesma luz.',
      'Dobrar o ISO sobe o EV em um.',
      'Os números gravados são arredondados, então calcular com eles desvia o EV até 0,174.',
    ],
    [
      'EV = log2(絞り² ÷ 露出時間)。f/1.0で1秒がEV 0です。',
      '目盛りが倍ずつ進むので、EVは両軸の目盛り番号を足した値と同じです。',
      '絞りを一段絞るとEVが1上がり、シャッターを一段速くしても1上がります。',
      '同じEVのマスは対角線に並びます — 届く光の量が同じ組み合わせです。',
      'ISOを倍にするとEVが1上がります。',
      '刻まれた数は丸めたものなので、そこから計算するとEVが最大0.174ずれます。',
    ],
    [
      'LW = log2(Blende² ÷ Belichtungszeit). f/1,0 bei einer Sekunde ist LW 0.',
      'Weil sich die Skala je Stufe verdoppelt, ist der Lichtwert die Summe beider Skalenpositionen.',
      'Eine Stufe abblenden hebt den Lichtwert um eins; eine Stufe kürzere Zeit ebenso.',
      'Felder gleichen Lichtwerts liegen auf einer Diagonale — Kombinationen mit gleicher Lichtmenge.',
      'Die ISO zu verdoppeln hebt den Lichtwert um eins.',
      'Die gravierten Zahlen sind gerundet, die Rechnung daraus weicht um bis zu 0,174 ab.',
    ],
    [
      'IL = log2(ouverture² ÷ temps de pose). f/1,0 pendant une seconde vaut IL 0.',
      'L’échelle doublant à chaque cran, l’indice égale la somme des deux positions d’échelle.',
      'Fermer d’un cran monte l’indice de un ; accélérer d’un cran aussi.',
      'Les cases d’indice égal sont en diagonale : des combinaisons laissant passer la même lumière.',
      'Doubler l’ISO monte l’indice de un.',
      'Les nombres gravés étant arrondis, le calcul dérive jusqu’à 0,174.',
    ],
    [
      'EV = log2(अपर्चर² ÷ एक्सपोज़र समय)। f/1.0 पर एक सेकंड यानी EV 0।',
      'पैमाना हर पायदान पर दोगुना होता है, इसलिए EV दोनों पैमानों की स्थिति का योग है।',
      'अपर्चर एक पायदान बंद करने पर EV एक बढ़ता है; शटर एक पायदान तेज़ करने पर भी।',
      'समान EV वाले खाने विकर्ण पर होते हैं — समान रोशनी देने वाले संयोजन।',
      'ISO दोगुना करने पर EV एक बढ़ता है।',
      'खुदे अंक गोल किए हुए हैं, इसलिए उनसे गणना करने पर EV 0.174 तक भटकता है।',
    ],
    [
      'EV = log2(光圈² ÷ 曝光时间)。f/1.0 曝一秒就是 EV 0。',
      '刻度每挡翻倍，所以 EV 等于两个刻度序号之和。',
      '光圈收一挡，EV 加一；快门快一挡，EV 也加一。',
      '同 EV 的格子排成对角线——进光量相同的组合。',
      'ISO 翻一倍，EV 加一。',
      '刻着的数字是取整的，用它们算，EV 最多差 0.174。',
    ],
    [
      'EV = log2(光圈² ÷ 曝光時間)。f/1.0 曝一秒就是 EV 0。',
      '刻度每擋翻倍，所以 EV 等於兩個刻度序號之和。',
      '光圈收一擋，EV 加一；快門快一擋，EV 也加一。',
      '同 EV 的格子排成對角線——進光量相同的組合。',
      'ISO 翻一倍，EV 加一。',
      '刻著的數字是取整的，用它們算，EV 最多差 0.174。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '노출값(EV) 표 — 조리개 × 셔터 209칸',
    'Exposure value chart — 209 aperture × shutter cells',
    'Tabla de valor de exposición — 209 casillas de diafragma × velocidad',
    'Tabela de valor de exposição — 209 células de diafragma × velocidade',
    '露出値(EV)表 — 絞り × シャッター209マス',
    'Lichtwert-Tabelle — 209 Felder aus Blende × Zeit',
    'Tableau des indices de lumination — 209 cases ouverture × vitesse',
    'एक्सपोज़र वैल्यू तालिका — 209 अपर्चर × शटर खाने',
    '曝光值(EV)表 — 光圈 × 快门 209 格',
    '曝光值(EV)表 — 光圈 × 快門 209 格',
  ),
  hubMetaDesc: T(
    'EV = log2(조리개² ÷ 시간). 눈금 번호를 더하면 정수인데 새겨진 숫자로 계산하면 어긋납니다 — f/11은 사실 11.314입니다.',
    'EV = log2(aperture² ÷ time). Adding the scale positions gives a whole number; computing from the engraved numbers does not — f/11 is really 11.314.',
    'EV = log2(diafragma² ÷ tiempo). Sumar las posiciones de escala da un entero; calcular con los números grabados, no: f/11 es en realidad 11,314.',
    'EV = log2(diafragma² ÷ tempo). Somar as posições de escala dá um inteiro; calcular com os números gravados, não: f/11 é na verdade 11,314.',
    'EV = log2(絞り² ÷ 時間)。目盛り番号を足せば整数ですが、刻まれた数で計算するとずれます — f/11は実は11.314です。',
    'LW = log2(Blende² ÷ Zeit). Die Skalenpositionen addiert ergeben eine ganze Zahl; die gravierten Zahlen nicht — f/11 ist in Wahrheit 11,314.',
    'IL = log2(ouverture² ÷ temps). La somme des positions donne un entier ; les nombres gravés, non — f/11 vaut en réalité 11,314.',
    'EV = log2(अपर्चर² ÷ समय)। पैमानों की स्थिति जोड़ने पर पूर्णांक, खुदे अंकों से नहीं — f/11 असल में 11.314 है।',
    'EV = log2(光圈² ÷ 时间)。刻度序号相加是整数，用刻字算却不是——f/11 其实是 11.314。',
    'EV = log2(光圈² ÷ 時間)。刻度序號相加是整數，用刻字算卻不是——f/11 其實是 11.314。',
  ),

  metaTitle: T<(f: ExposureFacts) => string>(
    f => `${f.apertureText} · ${f.shutterProse}초 — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} s — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} s — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} s — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse}秒 — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} s — LW ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} s — IL ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} s — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} 秒 — EV ${f.ev}`,
    f => `${f.apertureText} · ${f.shutterProse} 秒 — EV ${f.ev}`,
  ),

  metaDesc: T<(f: ExposureFacts) => string>(
    f => `ISO 100에서 ${f.apertureText} · ${f.shutterProse}초는 EV ${f.ev}, ${lKo[f.light]} 정도입니다. 같은 EV 조합 ${f.equivalents.length}개와 감도별 EV를 함께 적었습니다.`,
    f => `At ISO 100, ${f.apertureText} · ${f.shutterProse} s is EV ${f.ev} — about ${lEn[f.light].toLowerCase()}. With the ${f.equivalents.length} equivalent combinations and the EV at each ISO.`,
    f => `Con ISO 100, ${f.apertureText} · ${f.shutterProse} s es EV ${f.ev}, aproximadamente ${lEs[f.light].toLowerCase()}. Con las ${f.equivalents.length} combinaciones equivalentes y el EV en cada ISO.`,
    f => `Com ISO 100, ${f.apertureText} · ${f.shutterProse} s é EV ${f.ev}, cerca de ${lPt[f.light].toLowerCase()}. Com as ${f.equivalents.length} combinações equivalentes e o EV em cada ISO.`,
    f => `ISO 100で${f.apertureText}・${f.shutterProse}秒はEV ${f.ev}、${lJa[f.light]}ほどです。同じEVの組み合わせ${f.equivalents.length}通りと感度別EVも載せました。`,
    f => `Bei ISO 100 ergibt ${f.apertureText} · ${f.shutterProse} s den Lichtwert ${f.ev} — etwa ${lDe[f.light].toLowerCase()}. Mit den ${f.equivalents.length} gleichwertigen Kombinationen und dem Wert je ISO.`,
    f => `À 100 ISO, ${f.apertureText} · ${f.shutterProse} s vaut IL ${f.ev}, environ ${lFr[f.light].toLowerCase()}. Avec les ${f.equivalents.length} combinaisons équivalentes et l’indice à chaque ISO.`,
    f => `ISO 100 पर ${f.apertureText} · ${f.shutterProse} s का EV ${f.ev} है, लगभग ${lHi[f.light]}। साथ में ${f.equivalents.length} समतुल्य संयोजन और हर ISO पर EV।`,
    f => `ISO 100 下，${f.apertureText} · ${f.shutterProse} 秒是 EV ${f.ev}，大约相当于${lZh[f.light]}。附同 EV 的 ${f.equivalents.length} 种组合和各感光度下的 EV。`,
    f => `ISO 100 下，${f.apertureText} · ${f.shutterProse} 秒是 EV ${f.ev}，大約相當於${lTw[f.light]}。附同 EV 的 ${f.equivalents.length} 種組合和各感光度下的 EV。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'EV는 무엇을 재는 숫자인가요?', a: '조리개와 셔터가 함께 정하는 빛의 양을 한 숫자로 적은 것입니다. EV = log2(조리개² ÷ 노출 시간)이고, f/1.0에서 1초가 0입니다. 숫자가 1 오를 때마다 빛이 절반입니다.' },
      { q: '왜 조리개를 제곱하나요?', a: '조리개값은 초점거리를 구멍 지름으로 나눈 값이라 숫자가 커질수록 구멍이 작습니다. 들어오는 빛은 구멍의 넓이에 비례하니 지름의 제곱, 즉 조리개값의 제곱에 반비례합니다.' },
      { q: '왜 f/11 다음이 f/16인가요?', a: '눈금이 √2배마다 한 칸이기 때문입니다. 8 × √2 = 11.314를 11로 깎아 새기고, 11.314 × √2 = 16으로 이어집니다. 그래서 11만 어색해 보입니다.' },
      { q: '노출계 없이 어림잡을 수 있나요?', a: '맑은 날 한낮이 EV 15, 흐린 날이 13, 그늘이 10, 밝은 실내가 7쯤입니다. 맑은 날이면 f/16에 셔터를 감도 분의 1로 두는 규칙이 여기서 나옵니다.' },
    ],
    [
      { q: 'What does EV measure?', a: 'It puts the amount of light set by aperture and shutter together into one number: EV = log2(aperture² ÷ exposure time), with f/1.0 for one second as zero. Each step up halves the light.' },
      { q: 'Why is the aperture squared?', a: 'The f-number is the focal length divided by the diameter of the opening, so a larger number means a smaller hole. The light admitted follows the area, which goes with the square of the diameter — hence the square of the f-number, inverted.' },
      { q: 'Why does f/11 come before f/16?', a: 'Because the scale steps by √2. Eight times √2 is 11.314, engraved as 11, and 11.314 × √2 is 16. Only the 11 looks out of place.' },
      { q: 'Can I estimate exposure without a meter?', a: 'Bright sun is about EV 15, cloudy 13, open shade 10, a bright interior 7. The Sunny 16 rule — f/16 with the shutter at one over the ISO — falls straight out of that.' },
    ],
    [
      { q: '¿Qué mide el EV?', a: 'Reúne en un número la cantidad de luz que fijan diafragma y velocidad: EV = log2(diafragma² ÷ tiempo), con f/1,0 durante un segundo como cero. Cada paso arriba reduce la luz a la mitad.' },
      { q: '¿Por qué se eleva al cuadrado el diafragma?', a: 'El número f es la distancia focal dividida por el diámetro de la abertura, así que un número mayor significa un agujero menor. La luz que entra sigue al área, que va con el cuadrado del diámetro: de ahí el cuadrado del número f, invertido.' },
      { q: '¿Por qué f/11 va antes de f/16?', a: 'Porque la escala avanza de √2 en √2. Ocho por √2 es 11,314, grabado como 11, y 11,314 × √2 es 16. Solo el 11 desentona.' },
      { q: '¿Puedo estimar la exposición sin fotómetro?', a: 'El sol intenso ronda EV 15; nublado, 13; sombra abierta, 10; un interior luminoso, 7. De ahí sale la regla del Sunny 16: f/16 con la velocidad a uno partido por el ISO.' },
    ],
    [
      { q: 'O que o EV mede?', a: 'Reúne num número a quantidade de luz definida por diafragma e velocidade: EV = log2(diafragma² ÷ tempo), com f/1,0 por um segundo valendo zero. Cada passo acima corta a luz pela metade.' },
      { q: 'Por que o diafragma é elevado ao quadrado?', a: 'O número f é a distância focal dividida pelo diâmetro da abertura, então número maior significa buraco menor. A luz que entra acompanha a área, que vai com o quadrado do diâmetro — daí o quadrado do número f, invertido.' },
      { q: 'Por que f/11 vem antes de f/16?', a: 'Porque a escala avança de √2 em √2. Oito vezes √2 dá 11,314, gravado como 11, e 11,314 × √2 dá 16. Só o 11 destoa.' },
      { q: 'Dá para estimar a exposição sem fotômetro?', a: 'Sol forte fica perto de EV 15; nublado, 13; sombra aberta, 10; interior claro, 7. É daí que sai a regra Sunny 16: f/16 com a velocidade em um sobre o ISO.' },
    ],
    [
      { q: 'EVは何を測る数字ですか。', a: '絞りとシャッターが一緒に決める光の量を一つの数字にしたものです。EV = log2(絞り² ÷ 露出時間)で、f/1.0で1秒が0です。1上がるごとに光が半分になります。' },
      { q: 'なぜ絞りを二乗するのですか。', a: 'F値は焦点距離を穴の直径で割った値なので、数字が大きいほど穴が小さくなります。入る光は穴の面積に比例し、面積は直径の二乗に比例するので、F値の二乗に反比例します。' },
      { q: 'なぜf/11の次がf/16なのですか。', a: '目盛りが√2倍ごとだからです。8 × √2 = 11.314を11と丸めて刻み、11.314 × √2 = 16と続きます。11だけが不自然に見えるのはそのためです。' },
      { q: '露出計なしで見当をつけられますか。', a: '晴天の日中がEV 15、曇りが13、日陰が10、明るい室内が7ほどです。晴天ならf/16でシャッターを感度分の1にするという法則はここから出ます。' },
    ],
    [
      { q: 'Was misst der Lichtwert?', a: 'Er fasst die von Blende und Zeit bestimmte Lichtmenge in einer Zahl: LW = log2(Blende² ÷ Belichtungszeit), mit f/1,0 bei einer Sekunde als Null. Jede Stufe nach oben halbiert das Licht.' },
      { q: 'Warum wird die Blende quadriert?', a: 'Die Blendenzahl ist die Brennweite geteilt durch den Öffnungsdurchmesser — je größer die Zahl, desto kleiner das Loch. Das einfallende Licht folgt der Fläche, und die geht mit dem Quadrat des Durchmessers, also umgekehrt mit dem Quadrat der Blendenzahl.' },
      { q: 'Warum kommt nach f/11 gleich f/16?', a: 'Weil die Skala in √2-Schritten läuft. Acht mal √2 ist 11,314, graviert als 11, und 11,314 × √2 ist 16. Nur die 11 wirkt schief.' },
      { q: 'Kann man die Belichtung ohne Messer schätzen?', a: 'Praller Sonnenschein liegt bei etwa LW 15, bewölkt bei 13, offener Schatten bei 10, ein heller Innenraum bei 7. Daraus folgt direkt die Sunny-16-Regel: f/16 und die Zeit auf eins durch ISO.' },
    ],
    [
      { q: 'Que mesure l’indice de lumination ?', a: 'Il résume en un nombre la quantité de lumière fixée par l’ouverture et la vitesse : IL = log2(ouverture² ÷ temps de pose), f/1,0 pendant une seconde valant zéro. Chaque cran vers le haut divise la lumière par deux.' },
      { q: 'Pourquoi élever l’ouverture au carré ?', a: 'Le nombre f est la focale divisée par le diamètre du diaphragme : plus il est grand, plus le trou est petit. La lumière admise suit la surface, qui varie comme le carré du diamètre — donc l’inverse du carré du nombre f.' },
      { q: 'Pourquoi f/16 suit-il f/11 ?', a: 'Parce que l’échelle progresse d’un facteur √2. Huit fois √2 fait 11,314, gravé 11, et 11,314 × √2 fait 16. Seul le 11 semble décalé.' },
      { q: 'Peut-on estimer l’exposition sans posemètre ?', a: 'Le plein soleil est vers IL 15, le temps nuageux 13, l’ombre ouverte 10, un intérieur clair 7. La règle f/16 par beau temps — vitesse à un sur l’ISO — en découle directement.' },
    ],
    [
      { q: 'EV क्या मापता है?', a: 'अपर्चर और शटर मिलकर जो रोशनी तय करते हैं, उसे एक संख्या में रखता है: EV = log2(अपर्चर² ÷ समय), और f/1.0 पर एक सेकंड शून्य है। हर पायदान ऊपर रोशनी आधी।' },
      { q: 'अपर्चर का वर्ग क्यों?', a: 'f-संख्या फोकल लंबाई को छिद्र के व्यास से भाग देकर मिलती है, इसलिए बड़ी संख्या का मतलब छोटा छिद्र। आने वाली रोशनी क्षेत्रफल के अनुपात में है, और क्षेत्रफल व्यास के वर्ग के — इसलिए f-संख्या के वर्ग के व्युत्क्रमानुपाती।' },
      { q: 'f/11 के बाद f/16 क्यों?', a: 'क्योंकि पैमाना √2 के गुणक में चलता है। आठ गुना √2 = 11.314, जो 11 लिखा जाता है, और 11.314 × √2 = 16। बस 11 ही खटकता है।' },
      { q: 'बिना मीटर के अंदाज़ा लगा सकते हैं?', a: 'तेज़ धूप लगभग EV 15, बादल 13, खुली छाया 10, रोशन कमरा 7। सनी 16 नियम — f/16 और शटर ISO के व्युत्क्रम पर — इसी से निकलता है।' },
    ],
    [
      { q: 'EV 衡量的是什么？', a: '把光圈和快门共同决定的光量写成一个数字：EV = log2(光圈² ÷ 曝光时间)，f/1.0 曝一秒记作 0。每加一，光量减半。' },
      { q: '为什么光圈要平方？', a: 'f 值是焦距除以孔径，所以数字越大孔越小。进光量正比于孔的面积，而面积正比于直径的平方，于是与 f 值的平方成反比。' },
      { q: '为什么 f/11 后面就是 f/16？', a: '因为刻度每挡差 √2 倍。8 × √2 = 11.314，刻成 11；11.314 × √2 = 16。所以只有 11 看着别扭。' },
      { q: '没有测光表能估吗？', a: '晴天正午约 EV 15，阴天 13，阴影处 10，明亮室内 7。晴天 f/16 法则——光圈 f/16、快门取感光度的倒数——就是从这里来的。' },
    ],
    [
      { q: 'EV 衡量的是什麼？', a: '把光圈和快門共同決定的光量寫成一個數字：EV = log2(光圈² ÷ 曝光時間)，f/1.0 曝一秒記作 0。每加一，光量減半。' },
      { q: '為什麼光圈要平方？', a: 'f 值是焦距除以孔徑，所以數字越大孔越小。進光量正比於孔的面積，而面積正比於直徑的平方，於是與 f 值的平方成反比。' },
      { q: '為什麼 f/11 後面就是 f/16？', a: '因為刻度每擋差 √2 倍。8 × √2 = 11.314，刻成 11；11.314 × √2 = 16。所以只有 11 看著彆扭。' },
      { q: '沒有測光表能估嗎？', a: '晴天正午約 EV 15，陰天 13，陰影處 10，明亮室內 7。晴天 f/16 法則——光圈 f/16、快門取感光度的倒數——就是從這裡來的。' },
    ],
  ),

  cellFaq: T<(f: ExposureFacts) => FaqItem[]>(
    f => [
      { q: `${f.apertureText}에 ${f.shutterProse}초는 EV 얼마인가요?`, a: `ISO 100에서 EV ${f.ev}입니다. ${lKo[f.light]} 정도의 밝기입니다.` },
      { q: `같은 밝기의 다른 조합이 있나요?`, a: `${f.equivalents.length}개 있습니다. 조리개를 한 칸 조일 때마다 셔터를 한 칸 늦추면 됩니다 — 표에서 대각선 한 줄입니다.` },
      { q: `새겨진 숫자로 계산해도 같나요?`, a: f.exact ? `같습니다. 이 칸은 두 축 다 깎이지 않은 자리라 EV ${f.ev}가 그대로 나옵니다.` : `아닙니다. ${f.evPrinted}이 나와 ${f.drift > 0 ? '+' : ''}${f.drift}만큼 어긋납니다. 새겨진 눈금이 반올림한 값이기 때문입니다.` },
      { q: `감도를 올리면 어떻게 되나요?`, a: `ISO 400이면 EV ${f.ev + 2}, ISO 1600이면 EV ${f.ev + 4}입니다. 두 배마다 1씩 올라갑니다.` },
    ],
    f => [
      { q: `What is the EV of ${f.apertureText} at ${f.shutterProse} s?`, a: `EV ${f.ev} at ISO 100 — roughly ${lEn[f.light].toLowerCase()}.` },
      { q: `Are there other combinations with the same brightness?`, a: `${f.equivalents.length} of them. Close the aperture one stop and slow the shutter one stop — they run along a diagonal of the table.` },
      { q: `Does computing from the engraved numbers agree?`, a: f.exact ? `Yes. Neither scale is rounded here, so it comes out exactly EV ${f.ev}.` : `No. It gives ${f.evPrinted}, a drift of ${f.drift > 0 ? '+' : ''}${f.drift}, because the engraved scale is rounded.` },
      { q: `What happens if I raise the ISO?`, a: `ISO 400 makes it EV ${f.ev + 2}, ISO 1600 EV ${f.ev + 4}. Each doubling adds one.` },
    ],
    f => [
      { q: `¿Qué EV es ${f.apertureText} a ${f.shutterProse} s?`, a: `EV ${f.ev} con ISO 100, aproximadamente ${lEs[f.light].toLowerCase()}.` },
      { q: `¿Hay otras combinaciones con el mismo brillo?`, a: `${f.equivalents.length}. Cierre un paso el diafragma y ralentice un paso la velocidad: forman una diagonal de la tabla.` },
      { q: `¿Coincide el cálculo con los números grabados?`, a: f.exact ? `Sí. Aquí ninguna escala está redondeada, así que sale exactamente EV ${f.ev}.` : `No. Da ${f.evPrinted}, una desviación de ${f.drift > 0 ? '+' : ''}${f.drift}, porque la escala grabada está redondeada.` },
      { q: `¿Y si subo el ISO?`, a: `Con ISO 400 es EV ${f.ev + 2}; con ISO 1600, EV ${f.ev + 4}. Cada duplicación suma uno.` },
    ],
    f => [
      { q: `Qual é o EV de ${f.apertureText} a ${f.shutterProse} s?`, a: `EV ${f.ev} com ISO 100, cerca de ${lPt[f.light].toLowerCase()}.` },
      { q: `Há outras combinações com o mesmo brilho?`, a: `${f.equivalents.length}. Feche um passo o diafragma e diminua um passo a velocidade: elas formam uma diagonal da tabela.` },
      { q: `O cálculo com os números gravados bate?`, a: f.exact ? `Bate. Aqui nenhuma escala está arredondada, então sai exatamente EV ${f.ev}.` : `Não. Dá ${f.evPrinted}, um desvio de ${f.drift > 0 ? '+' : ''}${f.drift}, porque a escala gravada é arredondada.` },
      { q: `E se eu aumentar o ISO?`, a: `Com ISO 400 vira EV ${f.ev + 2}; com ISO 1600, EV ${f.ev + 4}. Cada dobra soma um.` },
    ],
    f => [
      { q: `${f.apertureText}で${f.shutterProse}秒はEVいくつですか。`, a: `ISO 100でEV ${f.ev}です。${lJa[f.light]}ほどの明るさです。` },
      { q: `同じ明るさの他の組み合わせはありますか。`, a: `${f.equivalents.length}通りあります。絞りを一段絞るごとにシャッターを一段遅くすればよく、表では対角線一列になります。` },
      { q: `刻まれた数で計算しても同じですか。`, a: f.exact ? `同じです。このマスは両軸とも丸められていないので、ちょうどEV ${f.ev}になります。` : `違います。${f.evPrinted}になり、${f.drift > 0 ? '+' : ''}${f.drift}ずれます。刻まれた目盛りが丸めた値だからです。` },
      { q: `感度を上げるとどうなりますか。`, a: `ISO 400ならEV ${f.ev + 2}、ISO 1600ならEV ${f.ev + 4}です。倍にするごとに1上がります。` },
    ],
    f => [
      { q: `Welcher Lichtwert ist ${f.apertureText} bei ${f.shutterProse} s?`, a: `LW ${f.ev} bei ISO 100 — etwa ${lDe[f.light].toLowerCase()}.` },
      { q: `Gibt es andere Kombinationen gleicher Helligkeit?`, a: `${f.equivalents.length} Stück. Eine Stufe abblenden und eine Stufe länger belichten — sie liegen auf einer Diagonale der Tabelle.` },
      { q: `Stimmt die Rechnung mit den gravierten Zahlen überein?`, a: f.exact ? `Ja. Hier ist keine Skala gerundet, es kommt genau LW ${f.ev} heraus.` : `Nein. Sie ergibt ${f.evPrinted}, eine Abweichung von ${f.drift > 0 ? '+' : ''}${f.drift}, weil die gravierte Skala gerundet ist.` },
      { q: `Was passiert bei höherer ISO?`, a: `Bei ISO 400 wird daraus LW ${f.ev + 2}, bei ISO 1600 LW ${f.ev + 4}. Jede Verdopplung bringt eins.` },
    ],
    f => [
      { q: `Quel indice pour ${f.apertureText} à ${f.shutterProse} s ?`, a: `IL ${f.ev} à 100 ISO, soit environ ${lFr[f.light].toLowerCase()}.` },
      { q: `Existe-t-il d’autres combinaisons de même luminosité ?`, a: `${f.equivalents.length}. Fermez d’un cran et ralentissez d’un cran : elles forment une diagonale du tableau.` },
      { q: `Le calcul avec les nombres gravés donne-t-il la même chose ?`, a: f.exact ? `Oui. Aucune des deux échelles n’est arrondie ici : on tombe exactement sur IL ${f.ev}.` : `Non. Il donne ${f.evPrinted}, soit un écart de ${f.drift > 0 ? '+' : ''}${f.drift}, parce que l’échelle gravée est arrondie.` },
      { q: `Et si je monte en ISO ?`, a: `À 400 ISO cela devient IL ${f.ev + 2}, à 1600 ISO IL ${f.ev + 4}. Chaque doublement ajoute un.` },
    ],
    f => [
      { q: `${f.apertureText} पर ${f.shutterProse} s का EV कितना है?`, a: `ISO 100 पर EV ${f.ev} — लगभग ${lHi[f.light]}।` },
      { q: `क्या इसी चमक के और संयोजन हैं?`, a: `${f.equivalents.length} हैं। अपर्चर एक पायदान बंद कीजिए और शटर एक पायदान धीमा — ये तालिका के विकर्ण पर बैठते हैं।` },
      { q: `खुदे अंकों से गणना करने पर भी वही आता है?`, a: f.exact ? `हाँ। यहाँ दोनों पैमाने गोल नहीं हैं, इसलिए ठीक EV ${f.ev} आता है।` : `नहीं। ${f.evPrinted} आता है, यानी ${f.drift > 0 ? '+' : ''}${f.drift} का अंतर, क्योंकि खुदा पैमाना गोल किया हुआ है।` },
      { q: `ISO बढ़ाने पर क्या होगा?`, a: `ISO 400 पर EV ${f.ev + 2}, ISO 1600 पर EV ${f.ev + 4}। हर दोगुने पर एक बढ़ता है।` },
    ],
    f => [
      { q: `${f.apertureText} 配 ${f.shutterProse} 秒是多少 EV？`, a: `ISO 100 下是 EV ${f.ev}，大约相当于${lZh[f.light]}。` },
      { q: `有别的组合亮度一样吗？`, a: `有 ${f.equivalents.length} 种。光圈收一挡，快门就慢一挡——它们在表里排成一条对角线。` },
      { q: `用刻着的数字算也一样吗？`, a: f.exact ? `一样。这一格两个刻度都没取整，算出来正好是 EV ${f.ev}。` : `不一样。会得到 ${f.evPrinted}，差 ${f.drift > 0 ? '+' : ''}${f.drift}，因为刻度本身是取整的。` },
      { q: `把感光度调高会怎样？`, a: `ISO 400 就是 EV ${f.ev + 2}，ISO 1600 就是 EV ${f.ev + 4}。每翻一倍加一。` },
    ],
    f => [
      { q: `${f.apertureText} 配 ${f.shutterProse} 秒是多少 EV？`, a: `ISO 100 下是 EV ${f.ev}，大約相當於${lTw[f.light]}。` },
      { q: `有別的組合亮度一樣嗎？`, a: `有 ${f.equivalents.length} 種。光圈收一擋，快門就慢一擋——它們在表裡排成一條對角線。` },
      { q: `用刻著的數字算也一樣嗎？`, a: f.exact ? `一樣。這一格兩個刻度都沒取整，算出來正好是 EV ${f.ev}。` : `不一樣。會得到 ${f.evPrinted}，差 ${f.drift > 0 ? '+' : ''}${f.drift}，因為刻度本身是取整的。` },
      { q: `把感光度調高會怎樣？`, a: `ISO 400 就是 EV ${f.ev + 2}，ISO 1600 就是 EV ${f.ev + 4}。每翻一倍加一。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const EXPOSURE_UI: L<ExposureUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ExposureUI>;
