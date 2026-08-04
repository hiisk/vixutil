/**
 * 고도 화면의 문구 — 열 언어.
 *
 * 높은 곳에서 숨이 찬 까닭을 "산소가 적어서"라고 말하지만, 정확히는 농도가
 * 아니라 기압이 낮아서다. 산소는 어디서나 20.95%로 같고, 한 번 숨쉴 때 들어오는
 * 양이 줄어든다. 그 구별을 문구가 계속 짚어 준다.
 *
 * 끓는점도 마찬가지다. 물이 100도에서 끓는 것은 해수면 기압에서일 뿐이고,
 * 높은 곳에서는 더 낮은 온도에서 끓어 버려 익는 데 오래 걸린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { AltitudeFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface AltitudeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  placeName: (key: string) => string;
  heightLabel: string;
  feetLabel: string;
  pressureLabel: string;
  tempLabel: string;
  boilLabel: string;
  oxygenLabel: string;
  cookLabel: string;
  pressureTitle: string;
  pressureNote: string;
  oxygenTitle: string;
  oxygenNote: string;
  boilTitle: string;
  boilNote: string;
  placeTitle: string;
  placeNote: string;
  allTitle: string;
  neighbourTitle: string;
  caution: string;
  desc: (f: AltitudeFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: AltitudeFacts) => string;
  metaDesc: (f: AltitudeFacts) => string;
  hubFaq: FaqItem[];
  altitudeFaq: (f: AltitudeFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 자리 이름 — 여덟 개뿐이라 한 줄로 받는다 */
const place = (sea: string, seoul: string, denver: string, baekdu: string,
               mexico: string, fuji: string, lhasa: string, blanc: string) =>
  (key: string): string => ({ sea, seoul, denver, baekdu, mexico, fuji, lhasa, blanc }[key] ?? key);

type Spec = { [K in keyof AltitudeUI]: L<AltitudeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('고도와 기압', 'Altitude and air', 'Altitud y aire', 'Altitude e ar', '標高と気圧', 'Höhe und Luft', 'Altitude et air', 'ऊँचाई और हवा', '海拔与气压', '海拔與氣壓'),

  placeName: T<(key: string) => string>(
    place('해수면', '서울', '덴버', '백두산', '멕시코시티', '후지산', '라싸', '몽블랑'),
    place('sea level', 'Seoul', 'Denver', 'Baekdu', 'Mexico City', 'Fuji', 'Lhasa', 'Mont Blanc'),
    place('nivel del mar', 'Seúl', 'Denver', 'Baekdu', 'Ciudad de México', 'Fuji', 'Lhasa', 'Mont Blanc'),
    place('nível do mar', 'Seul', 'Denver', 'Baekdu', 'Cidade do México', 'Fuji', 'Lhasa', 'Mont Blanc'),
    place('海面', 'ソウル', 'デンバー', '白頭山', 'メキシコシティ', '富士山', 'ラサ', 'モンブラン'),
    place('Meereshöhe', 'Seoul', 'Denver', 'Baekdu', 'Mexiko-Stadt', 'Fuji', 'Lhasa', 'Mont Blanc'),
    place('niveau de la mer', 'Séoul', 'Denver', 'Baekdu', 'Mexico', 'Fuji', 'Lhassa', 'Mont Blanc'),
    place('समुद्र तल', 'सियोल', 'डेनवर', 'बैकदू', 'मेक्सिको सिटी', 'फ़ूजी', 'ल्हासा', 'मोन ब्लां'),
    place('海平面', '首尔', '丹佛', '长白山', '墨西哥城', '富士山', '拉萨', '勃朗峰'),
    place('海平面', '首爾', '丹佛', '長白山', '墨西哥城', '富士山', '拉薩', '白朗峰'),
  ),

  hubTitle: T(
    '고도 101가지 — 기압·끓는점·산소',
    '101 altitudes — pressure, boiling point and oxygen',
    '101 altitudes — presión, punto de ebullición y oxígeno',
    '101 altitudes — pressão, ponto de ebulição e oxigênio',
    '標高101種 — 気圧・沸点・酸素',
    '101 Höhen — Luftdruck, Siedepunkt und Sauerstoff',
    '101 altitudes — pression, point d’ébullition et oxygène',
    '101 ऊँचाइयाँ — दाब, क्वथनांक और ऑक्सीजन',
    '101 个海拔 — 气压、沸点与氧气',
    '101 個海拔 — 氣壓、沸點與氧氣',
  ),

  hubLead: T(
    '해발 0m부터 5000m까지 50m 간격입니다. 그 높이의 기압에서 물이 몇 도에 끓는지, 한 번 숨쉴 때 산소가 얼마나 들어오는지까지 계산했습니다.',
    'From sea level to 5000 m in 50-metre steps: the air pressure at that height, the temperature water boils at, and how much oxygen a single breath carries.',
    'Del nivel del mar a 5000 m en pasos de 50: la presión a esa altura, la temperatura a la que hierve el agua y cuánto oxígeno lleva cada respiración.',
    'Do nível do mar a 5000 m em passos de 50: a pressão naquela altura, a temperatura em que a água ferve e quanto oxigênio cada respiração carrega.',
    '海抜0mから5000mまで50m刻みです。その高さの気圧、水が何度で沸くか、一息で入る酸素の量まで計算しました。',
    'Von Meereshöhe bis 5000 m in 50-Meter-Schritten: der Luftdruck dort, die Temperatur, bei der Wasser siedet, und wie viel Sauerstoff ein Atemzug trägt.',
    'Du niveau de la mer à 5000 m par pas de 50 : la pression à cette hauteur, la température d’ébullition de l’eau et l’oxygène contenu dans une inspiration.',
    'समुद्र तल से 5000 मीटर तक, 50 मीटर के अंतराल पर: उस ऊँचाई का दाब, पानी किस तापमान पर उबलता है, और एक साँस में कितनी ऑक्सीजन आती है।',
    '从海平面到 5000 米，每 50 米一档：该高度的气压、水在几度沸腾，以及一次呼吸能吸入多少氧气。',
    '從海平面到 5000 公尺，每 50 公尺一檔：該高度的氣壓、水在幾度沸騰，以及一次呼吸能吸入多少氧氣。',
  ),

  heightLabel: T('해발', 'Altitude', 'Altitud', 'Altitude', '標高', 'Höhe', 'Altitude', 'ऊँचाई', '海拔', '海拔'),
  feetLabel: T('피트', 'Feet', 'Pies', 'Pés', 'フィート', 'Fuß', 'Pieds', 'फ़ीट', '英尺', '英尺'),
  pressureLabel: T('기압', 'Air pressure', 'Presión', 'Pressão', '気圧', 'Luftdruck', 'Pression', 'वायुदाब', '气压', '氣壓'),
  tempLabel: T('표준 기온', 'Standard temperature', 'Temperatura estándar', 'Temperatura padrão', '標準気温', 'Standardtemperatur', 'Température standard', 'मानक तापमान', '标准气温', '標準氣溫'),
  boilLabel: T('물이 끓는 온도', 'Water boils at', 'El agua hierve a', 'A água ferve a', '水の沸点', 'Wasser siedet bei', 'L’eau bout à', 'पानी उबलता है', '水的沸点', '水的沸點'),
  oxygenLabel: T('산소 분압', 'Oxygen pressure', 'Presión de oxígeno', 'Pressão de oxigênio', '酸素分圧', 'Sauerstoffdruck', 'Pression d’oxygène', 'ऑक्सीजन दाब', '氧分压', '氧分壓'),
  cookLabel: T('삶는 시간', 'Cooking time', 'Tiempo de cocción', 'Tempo de cozimento', '茹で時間', 'Kochzeit', 'Temps de cuisson', 'पकाने का समय', '烹煮时间', '烹煮時間'),

  pressureTitle: T('기압은 높이만으로 정해집니다', 'Height alone fixes the pressure', 'La altura por sí sola fija la presión', 'A altura sozinha fixa a pressão', '気圧は高さだけで決まります', 'Die Höhe allein bestimmt den Druck', 'La hauteur seule fixe la pression', 'दाब केवल ऊँचाई से तय होता है', '气压只由高度决定', '氣壓只由高度決定'),

  pressureNote: T(
    '국제표준대기에서는 기온이 100m마다 0.65도씩 떨어진다고 봅니다. 그 감률을 넣고 적분하면 높이만으로 기압이 나옵니다 — 5000m면 해수면의 절반을 조금 넘습니다.',
    'The International Standard Atmosphere assumes the air cools 0.65 °C every 100 m. Feed that lapse rate into the barometric formula and height alone gives pressure — at 5000 m it is a little over half of sea level.',
    'La atmósfera estándar internacional supone que el aire se enfría 0,65 °C cada 100 m. Con ese gradiente en la fórmula barométrica, la altura sola da la presión: a 5000 m queda algo por encima de la mitad.',
    'A atmosfera padrão internacional supõe que o ar esfria 0,65 °C a cada 100 m. Com esse gradiente na fórmula barométrica, a altura sozinha dá a pressão: a 5000 m fica pouco acima da metade.',
    '国際標準大気では気温が100mごとに0.65度下がるとします。その減率を入れて積分すると、高さだけで気圧が出ます——5000mでは海面の半分を少し超える程度です。',
    'Die Internationale Standardatmosphäre nimmt an, dass die Luft je 100 m um 0,65 °C abkühlt. Mit diesem Gradienten in der barometrischen Formel ergibt allein die Höhe den Druck — auf 5000 m etwas mehr als die Hälfte des Meeresspiegelwerts.',
    'L’atmosphère type internationale suppose un refroidissement de 0,65 °C tous les 100 m. Avec ce gradient dans la formule barométrique, la hauteur seule donne la pression : à 5000 m, un peu plus de la moitié de celle du niveau de la mer.',
    'अंतरराष्ट्रीय मानक वायुमंडल में हवा हर 100 मीटर पर 0.65 °C ठंडी होती है। इसी दर को बैरोमेट्रिक सूत्र में रखने पर केवल ऊँचाई से दाब निकल आता है — 5000 मीटर पर समुद्र तल का आधे से थोड़ा ऊपर।',
    '国际标准大气假定气温每 100 米下降 0.65 °C。把这个递减率代入气压公式，只凭高度就能算出气压——5000 米处略高于海平面的一半。',
    '國際標準大氣假定氣溫每 100 公尺下降 0.65 °C。把這個遞減率代入氣壓公式，只憑高度就能算出氣壓——5000 公尺處略高於海平面的一半。',
  ),

  oxygenTitle: T('얇아지는 것은 농도가 아닙니다', 'It is not the concentration that thins', 'Lo que se enrarece no es la concentración', 'O que rarefaz não é a concentração', '薄くなるのは濃度ではありません', 'Nicht die Konzentration wird dünner', 'Ce n’est pas la concentration qui baisse', 'सांद्रता नहीं घटती', '变稀薄的不是浓度', '變稀薄的不是濃度'),

  oxygenNote: T(
    '산소는 5000m에서도 공기의 20.95%로 해수면과 같습니다. 줄어드는 것은 기압이고, 그래서 한 번 숨쉴 때 들어오는 산소의 양이 줄어듭니다 — 그것이 산소 분압입니다.',
    'Oxygen still makes up 20.95% of the air at 5000 m, exactly as at sea level. What falls is the pressure, so each breath brings fewer molecules — that quantity is the oxygen partial pressure.',
    'El oxígeno sigue siendo el 20,95% del aire a 5000 m, igual que al nivel del mar. Lo que baja es la presión, así que cada respiración trae menos moléculas: esa cantidad es la presión parcial de oxígeno.',
    'O oxigênio continua sendo 20,95% do ar a 5000 m, igual ao nível do mar. O que cai é a pressão, então cada respiração traz menos moléculas: essa quantidade é a pressão parcial de oxigênio.',
    '酸素は5000mでも空気の20.95%で、海面と同じです。減るのは気圧で、だから一息で入る酸素の量が減ります——それが酸素分圧です。',
    'Sauerstoff macht auch auf 5000 m 20,95 % der Luft aus, genau wie auf Meereshöhe. Was sinkt, ist der Druck — jeder Atemzug bringt weniger Moleküle, und diese Menge heißt Sauerstoffpartialdruck.',
    'L’oxygène représente encore 20,95 % de l’air à 5000 m, comme au niveau de la mer. Ce qui chute, c’est la pression : chaque inspiration apporte moins de molécules, et c’est la pression partielle d’oxygène.',
    '5000 मीटर पर भी ऑक्सीजन हवा का 20.95% ही है, समुद्र तल जितना। घटता है दाब, इसलिए हर साँस में कम अणु आते हैं — उसी मात्रा को ऑक्सीजन आंशिक दाब कहते हैं।',
    '在 5000 米，氧气仍占空气的 20.95%，与海平面相同。下降的是气压，所以每次呼吸吸入的分子更少——这个量就是氧分压。',
    '在 5000 公尺，氧氣仍佔空氣的 20.95%，與海平面相同。下降的是氣壓，所以每次呼吸吸入的分子更少——這個量就是氧分壓。',
  ),

  boilTitle: T('물은 100도에서 끓지 않습니다', 'Water does not always boil at 100', 'El agua no siempre hierve a 100', 'A água nem sempre ferve a 100', '水は100度で沸くとは限りません', 'Wasser siedet nicht immer bei 100', 'L’eau ne bout pas toujours à 100', 'पानी हमेशा 100 पर नहीं उबलता', '水不一定在 100 度沸腾', '水不一定在 100 度沸騰'),

  boilNote: T(
    '물이 끓는 것은 증기압이 바깥 기압과 같아지는 순간입니다. 높은 곳에서는 바깥 기압이 낮으니 더 낮은 온도에서 끓어 버리고, 그만큼 익는 데 오래 걸립니다.',
    'Water boils when its vapour pressure matches the air pressing on it. Higher up there is less air pressing, so it boils cooler — and cooks slower for the same reason.',
    'El agua hierve cuando su presión de vapor iguala a la del aire que la aprieta. Más arriba hay menos presión, así que hierve más fría y cocina más lento por la misma razón.',
    'A água ferve quando sua pressão de vapor iguala a do ar que a comprime. Mais alto há menos pressão, então ela ferve mais fria e cozinha mais devagar pelo mesmo motivo.',
    '水が沸くのは、蒸気圧が外の気圧と等しくなる瞬間です。高い所では外の気圧が低いので低い温度で沸いてしまい、その分だけ火の通りが遅くなります。',
    'Wasser siedet, wenn sein Dampfdruck dem Luftdruck entspricht. Weiter oben drückt weniger Luft, also siedet es kühler — und gart aus demselben Grund langsamer.',
    'L’eau bout quand sa pression de vapeur égale celle de l’air qui la presse. Plus haut, l’air presse moins : elle bout plus froide et cuit donc plus lentement.',
    'पानी तब उबलता है जब उसका वाष्प दाब बाहरी वायुदाब के बराबर हो जाए। ऊँचाई पर बाहरी दाब कम होता है, इसलिए वह कम तापमान पर उबल जाता है और उसी कारण पकने में अधिक समय लगता है।',
    '水沸腾是它的蒸气压与外界气压相等的那一刻。高处外界气压低，所以水在更低的温度就沸了，也因此更难煮熟。',
    '水沸騰是它的蒸氣壓與外界氣壓相等的那一刻。高處外界氣壓低，所以水在更低的溫度就沸了，也因此更難煮熟。',
  ),

  placeTitle: T('사람이 사는 높이', 'Heights people live at', 'Alturas donde vive la gente', 'Alturas onde as pessoas vivem', '人が暮らす高さ', 'Höhen, in denen Menschen leben', 'Altitudes où l’on vit', 'जहाँ लोग रहते हैं', '人们生活的高度', '人們生活的高度'),

  placeNote: T(
    '눈금에 가장 가까운 칸으로 보냈습니다. 높이는 측량과 공표값에 따라 조금씩 다릅니다.',
    'Each is rounded to the nearest step on this table; published heights differ a little between surveys.',
    'Cada uno se redondea al escalón más cercano de la tabla; las alturas publicadas varían un poco según la medición.',
    'Cada um é arredondado ao degrau mais próximo da tabela; as alturas publicadas variam um pouco conforme a medição.',
    'この表の刻みで一番近い所に寄せています。標高は測量や公表値によって少しずつ違います。',
    'Auf die nächstliegende Stufe dieser Tabelle gerundet; die veröffentlichten Höhen schwanken je nach Vermessung ein wenig.',
    'Chaque valeur est arrondie au palier le plus proche du tableau ; les altitudes publiées varient un peu selon les relevés.',
    'तालिका के निकटतम पायदान पर लाया गया है; प्रकाशित ऊँचाइयाँ माप के अनुसार थोड़ी भिन्न होती हैं।',
    '已就近取到本表的刻度上；各处公布的高程会因测量而略有出入。',
    '已就近取到本表的刻度上；各處公布的高程會因測量而略有出入。',
  ),

  allTitle: T('0m부터 5000m까지', 'From 0 to 5000 m', 'De 0 a 5000 m', 'De 0 a 5000 m', '0mから5000mまで', 'Von 0 bis 5000 m', 'De 0 à 5000 m', '0 से 5000 मीटर तक', '从 0 到 5000 米', '從 0 到 5000 公尺'),
  neighbourTitle: T('가까운 높이', 'Nearby heights', 'Alturas cercanas', 'Alturas próximas', '近い高さ', 'Höhen daneben', 'Hauteurs voisines', 'पास की ऊँचाइयाँ', '相邻高度', '相鄰高度'),

  caution: T(
    '국제표준대기를 가정한 값입니다. 실제 기압은 날씨에 따라 하루에도 수십 헥토파스칼씩 오르내리고, 기온은 계절과 지형에 따라 훨씬 크게 달라집니다.',
    'These assume the International Standard Atmosphere. Real pressure swings by tens of hectopascals with the weather, and real temperature varies far more with season and terrain.',
    'Suponen la atmósfera estándar internacional. La presión real oscila decenas de hectopascales con el tiempo, y la temperatura varía mucho más según estación y terreno.',
    'Supõem a atmosfera padrão internacional. A pressão real oscila dezenas de hectopascais com o tempo, e a temperatura varia bem mais com estação e relevo.',
    '国際標準大気を仮定した値です。実際の気圧は天気によって一日でも数十hPa上下し、気温は季節や地形でさらに大きく変わります。',
    'Angenommen ist die Internationale Standardatmosphäre. Der reale Druck schwankt wetterbedingt um zig Hektopascal, die Temperatur je nach Jahreszeit und Gelände noch weit stärker.',
    'Ces valeurs supposent l’atmosphère type internationale. La pression réelle varie de dizaines d’hectopascals avec la météo, et la température bien davantage selon la saison et le relief.',
    'ये अंतरराष्ट्रीय मानक वायुमंडल मानकर निकाले गए हैं। वास्तविक दाब मौसम के साथ दिन भर में दसियों hPa घटता-बढ़ता है, और तापमान मौसम व भूभाग से कहीं अधिक बदलता है।',
    '这些值假定国际标准大气。实际气压随天气一天内就能上下几十百帕，气温随季节与地形的变化更大。',
    '這些值假定國際標準大氣。實際氣壓隨天氣一天內就能上下幾十百帕，氣溫隨季節與地形的變化更大。',
  ),

  desc: T<(f: AltitudeFacts) => string>(
    f => `해발 ${f.m}m에서는 기압이 ${f.hpa}hPa로 해수면의 ${f.pressurePercent}%입니다. 물은 ${f.boilC}도에 끓고, 산소 분압은 ${f.o2hpa}hPa입니다.`,
    f => `At ${f.m} m the pressure is ${f.hpa} hPa, ${f.pressurePercent}% of sea level. Water boils at ${f.boilC} °C and the oxygen pressure is ${f.o2hpa} hPa.`,
    f => `A ${f.m} m la presión es de ${f.hpa} hPa, el ${f.pressurePercent}% de la del nivel del mar. El agua hierve a ${f.boilC} °C y la presión de oxígeno es ${f.o2hpa} hPa.`,
    f => `A ${f.m} m a pressão é de ${f.hpa} hPa, ${f.pressurePercent}% da do nível do mar. A água ferve a ${f.boilC} °C e a pressão de oxigênio é ${f.o2hpa} hPa.`,
    f => `標高${f.m}mでは気圧が${f.hpa}hPa、海面の${f.pressurePercent}%です。水は${f.boilC}度で沸き、酸素分圧は${f.o2hpa}hPaです。`,
    f => `Auf ${f.m} m beträgt der Druck ${f.hpa} hPa, ${f.pressurePercent} % des Meeresspiegelwerts. Wasser siedet bei ${f.boilC} °C, der Sauerstoffdruck liegt bei ${f.o2hpa} hPa.`,
    f => `À ${f.m} m, la pression vaut ${f.hpa} hPa, soit ${f.pressurePercent} % de celle du niveau de la mer. L’eau bout à ${f.boilC} °C et la pression d’oxygène est de ${f.o2hpa} hPa.`,
    f => `${f.m} मीटर पर दाब ${f.hpa} hPa है, यानी समुद्र तल का ${f.pressurePercent}%। पानी ${f.boilC} °C पर उबलता है और ऑक्सीजन दाब ${f.o2hpa} hPa है।`,
    f => `海拔 ${f.m} 米处气压为 ${f.hpa} hPa，是海平面的 ${f.pressurePercent}%。水在 ${f.boilC} 度沸腾，氧分压为 ${f.o2hpa} hPa。`,
    f => `海拔 ${f.m} 公尺處氣壓為 ${f.hpa} hPa，是海平面的 ${f.pressurePercent}%。水在 ${f.boilC} 度沸騰，氧分壓為 ${f.o2hpa} hPa。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '기압은 높이에서 국제표준대기 식으로 나옵니다.',
      '기온은 100m마다 0.65도씩 떨어지는 것으로 봅니다.',
      '끓는점은 그 기압에서 다시 계산됩니다 — 낮아질수록 낮아집니다.',
      '산소 농도는 어디서나 20.95%이고, 줄어드는 것은 분압입니다.',
    ],
    [
      'Pressure comes from height through the standard atmosphere formula.',
      'Temperature is taken to fall 0.65 °C every 100 m.',
      'The boiling point follows from that pressure — lower pressure, cooler boil.',
      'Oxygen stays at 20.95% everywhere; what drops is its partial pressure.',
    ],
    [
      'La presión sale de la altura mediante la fórmula de la atmósfera estándar.',
      'Se toma que la temperatura baja 0,65 °C cada 100 m.',
      'El punto de ebullición se deduce de esa presión: menos presión, hervor más frío.',
      'El oxígeno se mantiene en 20,95% en todas partes; lo que cae es su presión parcial.',
    ],
    [
      'A pressão vem da altura pela fórmula da atmosfera padrão.',
      'Considera-se que a temperatura cai 0,65 °C a cada 100 m.',
      'O ponto de ebulição decorre dessa pressão: menos pressão, fervura mais fria.',
      'O oxigênio fica em 20,95% em todo lugar; o que cai é sua pressão parcial.',
    ],
    [
      '気圧は高さから国際標準大気の式で出ます。',
      '気温は100mごとに0.65度下がるものとします。',
      '沸点はその気圧から改めて計算されます——気圧が低いほど低くなります。',
      '酸素濃度はどこでも20.95%で、減るのは分圧です。',
    ],
    [
      'Der Druck folgt aus der Höhe über die Standardatmosphären-Formel.',
      'Die Temperatur sinkt annahmegemäß um 0,65 °C je 100 m.',
      'Der Siedepunkt ergibt sich aus diesem Druck — weniger Druck, kühleres Sieden.',
      'Sauerstoff bleibt überall bei 20,95 %; was sinkt, ist sein Partialdruck.',
    ],
    [
      'La pression découle de la hauteur par la formule de l’atmosphère type.',
      'On considère que la température baisse de 0,65 °C tous les 100 m.',
      'Le point d’ébullition se déduit de cette pression : moins de pression, ébullition plus froide.',
      'L’oxygène reste à 20,95 % partout ; c’est sa pression partielle qui chute.',
    ],
    [
      'दाब ऊँचाई से मानक वायुमंडल सूत्र द्वारा निकलता है।',
      'तापमान हर 100 मीटर पर 0.65 °C गिरता माना गया है।',
      'क्वथनांक उसी दाब से निकलता है — दाब कम, उबाल भी ठंडा।',
      'ऑक्सीजन हर जगह 20.95% रहती है; घटता है उसका आंशिक दाब।',
    ],
    [
      '气压由高度经标准大气公式算出。',
      '气温按每 100 米下降 0.65 °C 计。',
      '沸点再由该气压推出——气压越低，沸点越低。',
      '氧气浓度处处都是 20.95%，下降的是它的分压。',
    ],
    [
      '氣壓由高度經標準大氣公式算出。',
      '氣溫按每 100 公尺下降 0.65 °C 計。',
      '沸點再由該氣壓推出——氣壓越低，沸點越低。',
      '氧氣濃度處處都是 20.95%，下降的是它的分壓。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '고도별 기압표 — 끓는점과 산소까지 101가지',
    'Altitude pressure chart — boiling point and oxygen for 101 heights',
    'Tabla de presión por altitud — ebullición y oxígeno en 101 alturas',
    'Tabela de pressão por altitude — ebulição e oxigênio em 101 alturas',
    '標高別の気圧表 — 沸点と酸素まで101種',
    'Luftdruck nach Höhe — Siedepunkt und Sauerstoff für 101 Höhen',
    'Table de pression par altitude — ébullition et oxygène pour 101 hauteurs',
    'ऊँचाई अनुसार दाब तालिका — 101 ऊँचाइयों के क्वथनांक और ऑक्सीजन',
    '海拔气压表 — 101 个高度的沸点与氧气',
    '海拔氣壓表 — 101 個高度的沸點與氧氣',
  ),

  hubMetaDesc: T(
    '해발 0m부터 5000m까지 50m 간격으로 기압·표준 기온·물의 끓는점·산소 분압을 계산했습니다. 2250m에서는 물이 92도에 끓습니다.',
    'Pressure, standard temperature, boiling point and oxygen partial pressure from sea level to 5000 m in 50-metre steps. At 2250 m water boils at 92 °C.',
    'Presión, temperatura estándar, punto de ebullición y presión parcial de oxígeno del nivel del mar a 5000 m en pasos de 50. A 2250 m el agua hierve a 92 °C.',
    'Pressão, temperatura padrão, ponto de ebulição e pressão parcial de oxigênio do nível do mar a 5000 m em passos de 50. A 2250 m a água ferve a 92 °C.',
    '海抜0mから5000mまで50m刻みで気圧・標準気温・水の沸点・酸素分圧を計算しました。2250mでは水が92度で沸きます。',
    'Druck, Standardtemperatur, Siedepunkt und Sauerstoffpartialdruck von Meereshöhe bis 5000 m in 50-Meter-Schritten. Auf 2250 m siedet Wasser bei 92 °C.',
    'Pression, température type, point d’ébullition et pression partielle d’oxygène du niveau de la mer à 5000 m par pas de 50. À 2250 m, l’eau bout à 92 °C.',
    'समुद्र तल से 5000 मीटर तक 50 मीटर के अंतराल पर दाब, मानक तापमान, क्वथनांक और ऑक्सीजन आंशिक दाब। 2250 मीटर पर पानी 92 °C पर उबलता है।',
    '从海平面到 5000 米、每 50 米一档的气压、标准气温、水的沸点与氧分压。2250 米处水在 92 度沸腾。',
    '從海平面到 5000 公尺、每 50 公尺一檔的氣壓、標準氣溫、水的沸點與氧分壓。2250 公尺處水在 92 度沸騰。',
  ),

  metaTitle: T<(f: AltitudeFacts) => string>(
    f => `해발 ${f.m}m — 기압 ${f.hpa}hPa, 물은 ${f.boilC}도에 끓음`,
    f => `${f.m} m above sea level — ${f.hpa} hPa, water boils at ${f.boilC} °C`,
    f => `${f.m} m sobre el nivel del mar — ${f.hpa} hPa, el agua hierve a ${f.boilC} °C`,
    f => `${f.m} m acima do nível do mar — ${f.hpa} hPa, água ferve a ${f.boilC} °C`,
    f => `標高${f.m}m — 気圧${f.hpa}hPa、水は${f.boilC}度で沸騰`,
    f => `${f.m} m über dem Meer — ${f.hpa} hPa, Wasser siedet bei ${f.boilC} °C`,
    f => `${f.m} m d’altitude — ${f.hpa} hPa, l’eau bout à ${f.boilC} °C`,
    f => `समुद्र तल से ${f.m} मीटर — ${f.hpa} hPa, पानी ${f.boilC} °C पर उबलता है`,
    f => `海拔 ${f.m} 米 — 气压 ${f.hpa} hPa，水在 ${f.boilC} 度沸腾`,
    f => `海拔 ${f.m} 公尺 — 氣壓 ${f.hpa} hPa，水在 ${f.boilC} 度沸騰`,
  ),

  metaDesc: T<(f: AltitudeFacts) => string>(
    f => `해발 ${f.m}m(${f.ft}피트)의 기압은 ${f.hpa}hPa로 해수면의 ${f.pressurePercent}%입니다. 표준 기온 ${f.tempC}도, 물의 끓는점 ${f.boilC}도, 산소 분압 ${f.o2hpa}hPa이며 삶는 데 해수면의 ${f.cookFactor}배쯤 걸립니다.`,
    f => `At ${f.m} m (${f.ft} ft) the pressure is ${f.hpa} hPa — ${f.pressurePercent}% of sea level. Standard temperature ${f.tempC} °C, water boiling at ${f.boilC} °C, oxygen pressure ${f.o2hpa} hPa, and boiling food takes about ${f.cookFactor}× as long.`,
    f => `A ${f.m} m (${f.ft} pies) la presión es ${f.hpa} hPa, el ${f.pressurePercent}% de la del mar. Temperatura estándar ${f.tempC} °C, ebullición a ${f.boilC} °C, oxígeno ${f.o2hpa} hPa y cocer lleva unas ${f.cookFactor} veces más.`,
    f => `A ${f.m} m (${f.ft} pés) a pressão é ${f.hpa} hPa, ${f.pressurePercent}% da do mar. Temperatura padrão ${f.tempC} °C, ebulição a ${f.boilC} °C, oxigênio ${f.o2hpa} hPa e cozinhar leva cerca de ${f.cookFactor}× mais.`,
    f => `標高${f.m}m（${f.ft}フィート）の気圧は${f.hpa}hPa、海面の${f.pressurePercent}%です。標準気温${f.tempC}度、沸点${f.boilC}度、酸素分圧${f.o2hpa}hPaで、茹でるのに海面の約${f.cookFactor}倍かかります。`,
    f => `Auf ${f.m} m (${f.ft} Fuß) beträgt der Druck ${f.hpa} hPa, ${f.pressurePercent} % des Meeresspiegels. Standardtemperatur ${f.tempC} °C, Siedepunkt ${f.boilC} °C, Sauerstoffdruck ${f.o2hpa} hPa — Kochen dauert etwa ${f.cookFactor}-mal so lang.`,
    f => `À ${f.m} m (${f.ft} pieds), la pression est de ${f.hpa} hPa, soit ${f.pressurePercent} % de celle de la mer. Température type ${f.tempC} °C, ébullition à ${f.boilC} °C, oxygène ${f.o2hpa} hPa, et la cuisson prend environ ${f.cookFactor} fois plus longtemps.`,
    f => `${f.m} मीटर (${f.ft} फ़ीट) पर दाब ${f.hpa} hPa है, समुद्र तल का ${f.pressurePercent}%। मानक तापमान ${f.tempC} °C, क्वथनांक ${f.boilC} °C, ऑक्सीजन दाब ${f.o2hpa} hPa, और उबालने में लगभग ${f.cookFactor} गुना समय लगता है।`,
    f => `海拔 ${f.m} 米（${f.ft} 英尺）气压 ${f.hpa} hPa，为海平面的 ${f.pressurePercent}%。标准气温 ${f.tempC} 度，沸点 ${f.boilC} 度，氧分压 ${f.o2hpa} hPa，煮熟约需海平面的 ${f.cookFactor} 倍时间。`,
    f => `海拔 ${f.m} 公尺（${f.ft} 英尺）氣壓 ${f.hpa} hPa，為海平面的 ${f.pressurePercent}%。標準氣溫 ${f.tempC} 度，沸點 ${f.boilC} 度，氧分壓 ${f.o2hpa} hPa，煮熟約需海平面的 ${f.cookFactor} 倍時間。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '높은 곳에서 밥이 설익는 이유가 뭔가요?', a: '물이 100도까지 못 올라가고 그 아래에서 끓어 버리기 때문입니다. 2000m면 93도에서 끓으므로 같은 시간을 삶아도 덜 익습니다. 압력솥을 쓰면 기압을 올려 이 문제를 되돌립니다.' },
      { q: '산소가 정말 적어지나요?', a: '농도는 그대로입니다. 5000m에서도 공기의 20.95%가 산소입니다. 다만 기압이 절반쯤이라 한 번 숨쉴 때 들어오는 산소 분자가 절반쯤으로 줄어듭니다.' },
      { q: '고산병은 몇 미터부터 오나요?', a: '보통 2500m 언저리부터 나타나고 사람마다 크게 다릅니다. 이 표는 기압과 산소 분압만 보여 줄 뿐, 몸이 어떻게 반응할지는 말해 주지 않습니다.' },
      { q: '비행기 안은 몇 미터에 해당하나요?', a: '여압을 걸어 보통 1800~2400m 정도의 기압으로 맞춥니다. 그래서 기내에서 귀가 먹먹하고 술이 빨리 오릅니다.' },
      { q: '기압이 절반이 되는 높이는요?', a: '약 5500m입니다. 이 표의 끝인 5000m에서 이미 53%까지 내려옵니다.' },
    ],
    [
      { q: 'Why does food come out underdone at altitude?', a: 'Because water never reaches 100 °C — it boils cooler and stays there. At 2000 m it boils at 93 °C, so the same minutes deliver less heat. A pressure cooker raises the pressure and undoes the problem.' },
      { q: 'Is there really less oxygen up there?', a: 'The concentration is unchanged: even at 5000 m, 20.95% of the air is oxygen. But the pressure is about half, so a single breath brings roughly half the molecules.' },
      { q: 'At what height does altitude sickness start?', a: 'Usually around 2500 m, and it varies enormously between people. This table shows pressure and oxygen; it says nothing about how a particular body will react.' },
      { q: 'What altitude does an airliner cabin feel like?', a: 'Cabins are pressurised to roughly 1800–2400 m. That is why ears pop and a drink hits harder in flight.' },
      { q: 'Where does pressure fall to half?', a: 'At about 5500 m. By 5000 m — the end of this table — it is already down to 53%.' },
    ],
    [
      { q: '¿Por qué la comida queda cruda en altura?', a: 'Porque el agua nunca llega a 100 °C: hierve más fría y se queda ahí. A 2000 m hierve a 93 °C, así que los mismos minutos aportan menos calor. Una olla a presión sube la presión y deshace el problema.' },
      { q: '¿De verdad hay menos oxígeno?', a: 'La concentración no cambia: incluso a 5000 m el 20,95% del aire es oxígeno. Pero la presión es la mitad, así que cada respiración trae cerca de la mitad de moléculas.' },
      { q: '¿A qué altura empieza el mal de altura?', a: 'Suele aparecer hacia los 2500 m y varía muchísimo entre personas. Esta tabla muestra presión y oxígeno; no dice cómo reaccionará un cuerpo concreto.' },
      { q: '¿A qué altitud equivale la cabina de un avión?', a: 'Se presuriza a unos 1800–2400 m. Por eso se taponan los oídos y el alcohol sube antes en vuelo.' },
      { q: '¿Dónde cae la presión a la mitad?', a: 'Hacia los 5500 m. A 5000 m, el final de esta tabla, ya está en el 53%.' },
    ],
    [
      { q: 'Por que a comida fica crua na altitude?', a: 'Porque a água nunca chega a 100 °C: ferve mais fria e para por ali. A 2000 m ferve a 93 °C, então os mesmos minutos entregam menos calor. A panela de pressão eleva a pressão e desfaz o problema.' },
      { q: 'Existe mesmo menos oxigênio lá em cima?', a: 'A concentração não muda: mesmo a 5000 m, 20,95% do ar é oxigênio. Mas a pressão é cerca de metade, então cada respiração traz quase metade das moléculas.' },
      { q: 'A partir de que altura vem o mal de altitude?', a: 'Costuma aparecer perto dos 2500 m e varia muitíssimo entre pessoas. Esta tabela mostra pressão e oxigênio; não diz como um corpo específico vai reagir.' },
      { q: 'A cabine de um avião equivale a que altitude?', a: 'É pressurizada para algo entre 1800 e 2400 m. Por isso os ouvidos tampam e a bebida sobe mais rápido em voo.' },
      { q: 'Onde a pressão cai à metade?', a: 'Por volta de 5500 m. Aos 5000 m, o fim desta tabela, já está em 53%.' },
    ],
    [
      { q: '高い所でご飯が芯まで炊けないのはなぜですか？', a: '水が100度まで上がらず、それより低い温度で沸いてしまうからです。2000mなら93度で沸くので、同じ時間茹でても熱が足りません。圧力鍋は気圧を上げてこの問題を打ち消します。' },
      { q: '本当に酸素が減るのですか？', a: '濃度は変わりません。5000mでも空気の20.95%が酸素です。ただし気圧が半分ほどなので、一息で入る酸素の分子が半分ほどになります。' },
      { q: '高山病は何メートルから出ますか？', a: 'ふつう2500m前後から現れ、人によって大きく違います。この表は気圧と酸素分圧を示すだけで、体がどう反応するかは語りません。' },
      { q: '飛行機の機内は何メートル相当ですか？', a: '与圧して1800〜2400mほどの気圧に保ちます。だから耳が詰まり、酒が早く回るのです。' },
      { q: '気圧が半分になる高さは？', a: 'およそ5500mです。この表の端である5000mで、すでに53%まで下がっています。' },
    ],
    [
      { q: 'Warum wird Essen in der Höhe nicht gar?', a: 'Weil Wasser nie 100 °C erreicht — es siedet kühler und bleibt dort. Auf 2000 m sind es 93 °C, dieselbe Zeit liefert also weniger Wärme. Ein Schnellkochtopf erhöht den Druck und hebt das Problem auf.' },
      { q: 'Gibt es dort oben wirklich weniger Sauerstoff?', a: 'Die Konzentration bleibt gleich: Auch auf 5000 m sind 20,95 % der Luft Sauerstoff. Nur der Druck ist etwa halb so hoch, ein Atemzug bringt also etwa halb so viele Moleküle.' },
      { q: 'Ab welcher Höhe droht Höhenkrankheit?', a: 'Meist ab etwa 2500 m, mit riesigen Unterschieden zwischen Menschen. Diese Tabelle zeigt Druck und Sauerstoff — nicht, wie ein bestimmter Körper reagiert.' },
      { q: 'Welcher Höhe entspricht eine Flugzeugkabine?', a: 'Sie wird auf rund 1800–2400 m bedruckt. Deshalb knacken die Ohren, und ein Drink wirkt im Flug schneller.' },
      { q: 'Wo halbiert sich der Druck?', a: 'Bei etwa 5500 m. Auf 5000 m — dem Ende dieser Tabelle — sind es schon 53 %.' },
    ],
    [
      { q: 'Pourquoi les aliments restent-ils crus en altitude ?', a: 'Parce que l’eau n’atteint jamais 100 °C : elle bout plus froide et s’y tient. À 2000 m, elle bout à 93 °C, donc le même temps apporte moins de chaleur. L’autocuiseur remonte la pression et annule le problème.' },
      { q: 'Y a-t-il vraiment moins d’oxygène là-haut ?', a: 'La concentration ne change pas : même à 5000 m, 20,95 % de l’air est de l’oxygène. Mais la pression est environ de moitié, donc une inspiration apporte près de moitié moins de molécules.' },
      { q: 'À partir de quelle hauteur survient le mal des montagnes ?', a: 'Généralement vers 2500 m, avec d’énormes écarts selon les personnes. Ce tableau montre la pression et l’oxygène ; il ne dit rien de la réaction d’un corps donné.' },
      { q: 'À quelle altitude correspond une cabine d’avion ?', a: 'Elle est pressurisée autour de 1800 à 2400 m. D’où les oreilles bouchées et l’alcool qui monte plus vite en vol.' },
      { q: 'Où la pression tombe-t-elle de moitié ?', a: 'Vers 5500 m. À 5000 m, la fin de ce tableau, elle est déjà à 53 %.' },
    ],
    [
      { q: 'ऊँचाई पर खाना कच्चा क्यों रह जाता है?', a: 'क्योंकि पानी 100 °C तक पहुँचता ही नहीं — वह उससे कम पर उबलकर वहीं रुक जाता है। 2000 मीटर पर 93 °C पर उबलता है, इसलिए उतने ही मिनट में कम गर्मी मिलती है। प्रेशर कुकर दाब बढ़ाकर यह समस्या हटा देता है।' },
      { q: 'क्या सचमुच ऑक्सीजन कम होती है?', a: 'सांद्रता वही रहती है: 5000 मीटर पर भी हवा का 20.95% ऑक्सीजन है। पर दाब लगभग आधा होता है, इसलिए एक साँस में लगभग आधे अणु ही आते हैं।' },
      { q: 'ऊँचाई की बीमारी किस ऊँचाई से शुरू होती है?', a: 'आमतौर पर 2500 मीटर के आसपास, और व्यक्ति दर व्यक्ति बहुत भिन्न। यह तालिका दाब और ऑक्सीजन बताती है, यह नहीं कि किसी शरीर की प्रतिक्रिया क्या होगी।' },
      { q: 'विमान का केबिन किस ऊँचाई के बराबर होता है?', a: 'उसे लगभग 1800–2400 मीटर के दाब पर रखा जाता है। इसीलिए कान बंद होते हैं और शराब जल्दी चढ़ती है।' },
      { q: 'दाब आधा किस ऊँचाई पर होता है?', a: 'लगभग 5500 मीटर पर। इस तालिका के अंत, 5000 मीटर पर ही वह 53% तक आ जाता है।' },
    ],
    [
      { q: '为什么在高处饭煮不熟？', a: '因为水根本升不到 100 度，在更低温度就沸腾并停在那里。2000 米处 93 度就沸了，同样的时间给出的热量更少。高压锅提高气压，正好抵消这个问题。' },
      { q: '高处真的氧气更少吗？', a: '浓度没变：5000 米处空气里仍有 20.95% 是氧气。变的是气压，只有一半左右，所以一次呼吸吸入的分子少了近一半。' },
      { q: '高原反应从几米开始？', a: '通常在 2500 米上下出现，而且因人差异极大。这张表只给出气压和氧分压，说不了某个人的身体会怎样反应。' },
      { q: '飞机客舱相当于多高？', a: '增压后大致维持在 1800～2400 米的气压。所以耳朵会堵，酒也上得更快。' },
      { q: '气压降到一半是在多高？', a: '大约 5500 米。到本表末端的 5000 米，已经降到 53%。' },
    ],
    [
      { q: '為什麼在高處飯煮不熟？', a: '因為水根本升不到 100 度，在更低溫度就沸騰並停在那裡。2000 公尺處 93 度就沸了，同樣的時間給出的熱量更少。壓力鍋提高氣壓，正好抵消這個問題。' },
      { q: '高處真的氧氣更少嗎？', a: '濃度沒變：5000 公尺處空氣裡仍有 20.95% 是氧氣。變的是氣壓，只有一半左右，所以一次呼吸吸入的分子少了近一半。' },
      { q: '高山症從幾公尺開始？', a: '通常在 2500 公尺上下出現，而且因人差異極大。這張表只給出氣壓和氧分壓，說不了某個人的身體會怎樣反應。' },
      { q: '飛機客艙相當於多高？', a: '增壓後大致維持在 1800～2400 公尺的氣壓。所以耳朵會堵，酒也上得更快。' },
      { q: '氣壓降到一半是在多高？', a: '大約 5500 公尺。到本表末端的 5000 公尺，已經降到 53%。' },
    ],
  ),

  altitudeFaq: T<(f: AltitudeFacts) => FaqItem[]>(
    f => [
      { q: `해발 ${f.m}m의 기압은 얼마인가요?`, a: `${f.hpa}hPa입니다. 해수면(1013.25hPa)의 ${f.pressurePercent}%입니다.` },
      { q: `여기서 물은 몇 도에 끓나요?`, a: `${f.boilC}도입니다. 그래서 삶는 데 해수면의 ${f.cookFactor}배쯤 걸립니다.` },
      { q: `산소는 얼마나 들어오나요?`, a: `산소 분압이 ${f.o2hpa}hPa로 해수면의 ${f.o2Percent}%입니다. 농도는 그대로 20.95%입니다.` },
      { q: `표준 기온은요?`, a: `${f.tempC}도입니다. 실제 기온은 계절과 날씨에 따라 크게 다릅니다.` },
    ],
    f => [
      { q: `What is the air pressure at ${f.m} m?`, a: `${f.hpa} hPa — ${f.pressurePercent}% of the 1013.25 hPa at sea level.` },
      { q: `What does water boil at here?`, a: `${f.boilC} °C, which is why boiling food takes about ${f.cookFactor} times as long.` },
      { q: `How much oxygen does a breath carry?`, a: `The oxygen pressure is ${f.o2hpa} hPa, ${f.o2Percent}% of sea level. The concentration is still 20.95%.` },
      { q: `And the standard temperature?`, a: `${f.tempC} °C. Real temperature swings widely with season and weather.` },
    ],
    f => [
      { q: `¿Cuál es la presión a ${f.m} m?`, a: `${f.hpa} hPa, el ${f.pressurePercent}% de los 1013,25 hPa del nivel del mar.` },
      { q: `¿A qué temperatura hierve aquí el agua?`, a: `A ${f.boilC} °C, por eso cocer lleva unas ${f.cookFactor} veces más.` },
      { q: `¿Cuánto oxígeno trae una respiración?`, a: `La presión de oxígeno es ${f.o2hpa} hPa, el ${f.o2Percent}% del nivel del mar. La concentración sigue siendo 20,95%.` },
      { q: `¿Y la temperatura estándar?`, a: `${f.tempC} °C. La real varía mucho según estación y tiempo.` },
    ],
    f => [
      { q: `Qual a pressão a ${f.m} m?`, a: `${f.hpa} hPa, ${f.pressurePercent}% dos 1013,25 hPa do nível do mar.` },
      { q: `A que temperatura a água ferve aqui?`, a: `A ${f.boilC} °C, por isso cozinhar leva cerca de ${f.cookFactor} vezes mais.` },
      { q: `Quanto oxigênio uma respiração traz?`, a: `A pressão de oxigênio é ${f.o2hpa} hPa, ${f.o2Percent}% do nível do mar. A concentração continua 20,95%.` },
      { q: `E a temperatura padrão?`, a: `${f.tempC} °C. A real varia muito com estação e clima.` },
    ],
    f => [
      { q: `標高${f.m}mの気圧はいくつですか？`, a: `${f.hpa}hPaです。海面（1013.25hPa）の${f.pressurePercent}%にあたります。` },
      { q: `ここで水は何度で沸きますか？`, a: `${f.boilC}度です。だから茹でるのに海面の約${f.cookFactor}倍かかります。` },
      { q: `酸素はどれだけ入りますか？`, a: `酸素分圧が${f.o2hpa}hPaで、海面の${f.o2Percent}%です。濃度は20.95%のままです。` },
      { q: `標準気温は？`, a: `${f.tempC}度です。実際の気温は季節や天気で大きく変わります。` },
    ],
    f => [
      { q: `Wie hoch ist der Luftdruck auf ${f.m} m?`, a: `${f.hpa} hPa — ${f.pressurePercent} % der 1013,25 hPa auf Meereshöhe.` },
      { q: `Bei welcher Temperatur siedet hier Wasser?`, a: `Bei ${f.boilC} °C, weshalb Kochen etwa ${f.cookFactor}-mal so lange dauert.` },
      { q: `Wie viel Sauerstoff bringt ein Atemzug?`, a: `Der Sauerstoffdruck beträgt ${f.o2hpa} hPa, ${f.o2Percent} % des Meeresspiegelwerts. Die Konzentration bleibt bei 20,95 %.` },
      { q: `Und die Standardtemperatur?`, a: `${f.tempC} °C. Die tatsächliche schwankt stark mit Jahreszeit und Wetter.` },
    ],
    f => [
      { q: `Quelle est la pression à ${f.m} m ?`, a: `${f.hpa} hPa, soit ${f.pressurePercent} % des 1013,25 hPa du niveau de la mer.` },
      { q: `À quelle température l’eau bout-elle ici ?`, a: `À ${f.boilC} °C, d’où une cuisson environ ${f.cookFactor} fois plus longue.` },
      { q: `Combien d’oxygène apporte une inspiration ?`, a: `La pression d’oxygène vaut ${f.o2hpa} hPa, ${f.o2Percent} % du niveau de la mer. La concentration reste à 20,95 %.` },
      { q: `Et la température type ?`, a: `${f.tempC} °C. La température réelle varie beaucoup selon la saison et le temps.` },
    ],
    f => [
      { q: `${f.m} मीटर पर वायुदाब कितना है?`, a: `${f.hpa} hPa — समुद्र तल के 1013.25 hPa का ${f.pressurePercent}%।` },
      { q: `यहाँ पानी किस तापमान पर उबलता है?`, a: `${f.boilC} °C पर, इसीलिए उबालने में लगभग ${f.cookFactor} गुना समय लगता है।` },
      { q: `एक साँस में कितनी ऑक्सीजन आती है?`, a: `ऑक्सीजन दाब ${f.o2hpa} hPa है, समुद्र तल का ${f.o2Percent}%। सांद्रता तो 20.95% ही रहती है।` },
      { q: `और मानक तापमान?`, a: `${f.tempC} °C। वास्तविक तापमान मौसम के अनुसार बहुत बदलता है।` },
    ],
    f => [
      { q: `海拔 ${f.m} 米的气压是多少？`, a: `${f.hpa} hPa，是海平面 1013.25 hPa 的 ${f.pressurePercent}%。` },
      { q: `这里的水几度沸腾？`, a: `${f.boilC} 度，所以煮熟大约需要海平面的 ${f.cookFactor} 倍时间。` },
      { q: `一次呼吸能吸入多少氧气？`, a: `氧分压 ${f.o2hpa} hPa，是海平面的 ${f.o2Percent}%。浓度仍是 20.95%。` },
      { q: `标准气温呢？`, a: `${f.tempC} 度。实际气温随季节和天气变化很大。` },
    ],
    f => [
      { q: `海拔 ${f.m} 公尺的氣壓是多少？`, a: `${f.hpa} hPa，是海平面 1013.25 hPa 的 ${f.pressurePercent}%。` },
      { q: `這裡的水幾度沸騰？`, a: `${f.boilC} 度，所以煮熟大約需要海平面的 ${f.cookFactor} 倍時間。` },
      { q: `一次呼吸能吸入多少氧氣？`, a: `氧分壓 ${f.o2hpa} hPa，是海平面的 ${f.o2Percent}%。濃度仍是 20.95%。` },
      { q: `標準氣溫呢？`, a: `${f.tempC} 度。實際氣溫隨季節和天氣變化很大。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const ALTITUDE_UI: L<AltitudeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<AltitudeUI>;
