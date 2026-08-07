/**
 * 공기청정기 화면의 문구 — 열 언어.
 *
 * 단위(㎡, ㎥/분, ACH)와 규격 이름(CADR, KS C 9314)은 옮기지 않는다.
 * 평은 한국·일본·대만이 쓰는 단위라, 다른 언어에서는 ㎡를 앞세운다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { Grade, PurifierFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PurifierUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  gradeName: (g: Grade) => string;
  areaLabel: string;
  volumeLabel: string;
  cadrLabel: string;
  achLabel: string;
  halfLabel: string;
  tenthLabel: string;
  neededLabel: string;
  shortfallLabel: string;
  coversLabel: string;
  pickLabel: string;
  minuteWord: string;
  pyeongWord: string;
  /** 넓이를 그 언어에서 부르는 방식 — 한자권만 평을 앞세운다 */
  areaText: (f: PurifierFacts) => string;
  decayTitle: string;
  decayNote: string;
  adTitle: string;
  adNote: string;
  ruleTitle: string;
  ruleNote: string;
  limitTitle: string;
  limitNote: string;
  areaRowTitle: string;
  cadrRowTitle: string;
  desc: (f: PurifierFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PurifierFacts) => string;
  metaDesc: (f: PurifierFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: PurifierFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Grades = Record<Grade, string>;
const namer = (m: Grades) => (g: Grade) => m[g];

const gKo: Grades = { ample: '넉넉함', enough: '권장 충족', tight: '빠듯함', short: '많이 모자람' };
const gEn: Grades = { ample: 'Ample', enough: 'Meets the target', tight: 'Tight', short: 'Well short' };
const gEs: Grades = { ample: 'De sobra', enough: 'Cumple el objetivo', tight: 'Justo', short: 'Muy corto' };
const gPt: Grades = { ample: 'De sobra', enough: 'Atinge o alvo', tight: 'No limite', short: 'Bem aquém' };
const gJa: Grades = { ample: '余裕あり', enough: '推奨を満たす', tight: 'ぎりぎり', short: 'かなり不足' };
const gDe: Grades = { ample: 'Reichlich', enough: 'Erreicht den Richtwert', tight: 'Knapp', short: 'Deutlich zu wenig' };
const gFr: Grades = { ample: 'Largement', enough: 'Atteint la cible', tight: 'Juste', short: 'Nettement insuffisant' };
const gHi: Grades = { ample: 'भरपूर', enough: 'लक्ष्य पूरा', tight: 'बहुत कम गुंजाइश', short: 'काफ़ी कम' };
const gZh: Grades = { ample: '绰绰有余', enough: '达到推荐值', tight: '勉强', short: '差得多' };
const gTw: Grades = { ample: '綽綽有餘', enough: '達到推薦值', tight: '勉強', short: '差得多' };

type Spec = { [K in keyof PurifierUI]: L<PurifierUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    '공기청정기 평수', 'Air purifier room size', 'Tamaño de sala para purificador', 'Tamanho de sala para purificador',
    '空気清浄機の適用畳数', 'Raumgröße für Luftreiniger', 'Taille de pièce pour purificateur', 'एयर प्यूरिफ़ायर कमरा आकार',
    '空气净化器适用面积', '空氣清淨機適用坪數',
  ),

  hubTitle: T(
    '공기청정기 224칸 — 광고에 적힌 평형보다 작게 잡아야 하는 까닭',
    '224 purifier cells — why you should buy for a smaller room than the box claims',
    '224 casillas de purificador — por qué conviene comprar para menos metros de los que dice la caja',
    '224 células de purificador — por que comprar para menos metros do que a caixa diz',
    '空気清浄機224マス — 表示の適用畳数より小さめに選ぶ理由',
    '224 Luftreiniger-Felder — warum man für einen kleineren Raum kaufen sollte, als die Packung angibt',
    '224 cases de purificateur — pourquoi viser une pièce plus petite que ce qu’annonce la boîte',
    '224 प्यूरिफ़ायर खाने — डिब्बे पर लिखे से छोटे कमरे के लिए क्यों ख़रीदें',
    '224 格净化器表 — 为什么要按比标称更小的面积来选',
    '224 格清淨機表 — 為什麼要按比標示更小的坪數來選',
  ),

  hubLead: T(
    '적는 것은 눈금 두 줄과 상수 셋뿐입니다. 청정능력(CADR)을 방 부피로 나누면 시간당 몇 번 공기가 갈리는지가 나오고, 널리 쓰이는 권장값은 다섯 번입니다. 먼지가 줄어드는 모양은 지수 곡선이라 절반이 되는 시간이 처음 농도와 상관없이 같습니다 — 시간당 다섯 번이면 8.3분입니다. 광고의 표준사용면적은 자연 환기가 함께 일어난다고 보고 잰 값이라, 창을 닫고 쓰는 방에서는 그만큼 여유가 없습니다.',
    'Only two scales and three constants are written down. Divide the clean air delivery rate by the room’s volume and you get how many times an hour the air is replaced; the widely used target is five. Dust falls off exponentially, so the time to halve it does not depend on where it started — at five changes an hour it is 8.3 minutes. The advertised coverage area is measured assuming natural ventilation alongside, so a closed room has less headroom than the box suggests.',
    'Solo se anotan dos escalas y tres constantes. Divida la tasa de aire limpio entre el volumen de la sala y obtiene cuántas veces por hora se renueva el aire; el objetivo habitual son cinco. El polvo cae de forma exponencial, así que el tiempo en reducirse a la mitad no depende del punto de partida: a cinco renovaciones por hora son 8,3 minutos. La superficie anunciada se mide suponiendo ventilación natural añadida, de modo que una sala cerrada tiene menos margen del que sugiere la caja.',
    'Só se anotam duas escalas e três constantes. Divida a taxa de ar limpo pelo volume da sala e obtém quantas vezes por hora o ar é trocado; o alvo usual são cinco. A poeira cai de forma exponencial, então o tempo para cair pela metade não depende de onde começou: a cinco trocas por hora são 8,3 minutos. A área anunciada é medida supondo ventilação natural junto, então uma sala fechada tem menos folga do que a caixa sugere.',
    '書き留めるのは目盛り二つと定数三つだけです。清浄能力(CADR)を部屋の容積で割れば、一時間に何回空気が入れ替わるかが出ます。広く使われる目安は五回です。ほこりの減り方は指数曲線なので、半分になる時間は最初の濃度によりません — 一時間に五回なら8.3分です。表示の適用面積は自然換気が同時に起きるとして測った値なので、窓を閉めて使う部屋では表示ほどの余裕がありません。',
    'Aufgeschrieben werden nur zwei Skalen und drei Konstanten. Teilt man die Reinluftleistung durch das Raumvolumen, erhält man, wie oft die Luft je Stunde gewechselt wird; der gängige Zielwert ist fünf. Staub fällt exponentiell ab, die Halbierungszeit hängt also nicht vom Ausgangswert ab — bei fünf Wechseln pro Stunde sind es 8,3 Minuten. Die beworbene Raumgröße wird unter Annahme zusätzlicher natürlicher Lüftung gemessen; ein geschlossener Raum hat daher weniger Reserve, als die Packung nahelegt.',
    'On n’écrit que deux échelles et trois constantes. Divisez le débit d’air pur par le volume de la pièce et vous obtenez le nombre de renouvellements par heure ; la cible courante est cinq. La poussière décroît exponentiellement : le temps de division par deux ne dépend pas du point de départ — à cinq renouvellements par heure, 8,3 minutes. La surface annoncée est mesurée en supposant une ventilation naturelle en parallèle, si bien qu’une pièce fermée a moins de marge que ne le laisse croire la boîte.',
    'लिखे जाते हैं सिर्फ़ दो पैमाने और तीन स्थिरांक। स्वच्छ वायु दर को कमरे के आयतन से भाग दीजिए, प्रति घंटा कितनी बार हवा बदलती है वह मिल जाएगा; प्रचलित लक्ष्य पाँच है। धूल चरघातांकी रूप से घटती है, इसलिए आधा होने का समय शुरुआती स्तर पर निर्भर नहीं — पाँच बार प्रति घंटा पर 8.3 मिनट। विज्ञापित क्षेत्रफल प्राकृतिक वेंटिलेशन साथ मानकर नापा जाता है, इसलिए बंद कमरे में उतनी गुंजाइश नहीं होती।',
    '写下来的只有两条刻度和三个常数。把洁净空气量除以房间体积，就得到每小时换气几次；通行的目标是五次。灰尘按指数衰减，所以减半所需时间与起始浓度无关——每小时五次就是 8.3 分钟。广告上的适用面积是在同时有自然通风的前提下测的，所以关窗使用的房间并没有那么多余量。',
    '寫下來的只有兩條刻度和三個常數。把潔淨空氣量除以房間體積，就得到每小時換氣幾次；通行的目標是五次。灰塵按指數衰減，所以減半所需時間與起始濃度無關——每小時五次就是 8.3 分鐘。廣告上的適用面積是在同時有自然通風的前提下測的，所以關窗使用的房間並沒有那麼多餘量。',
  ),

  gradeName: T<(g: Grade) => string>(
    namer(gKo), namer(gEn), namer(gEs), namer(gPt), namer(gJa),
    namer(gDe), namer(gFr), namer(gHi), namer(gZh), namer(gTw),
  ),

  areaLabel: T('방 넓이', 'Room size', 'Tamaño de la habitación', 'Tamanho do cômodo', '部屋の広さ', 'Raumgröße', 'Surface de la pièce', 'कमरे का आकार', '房间面积', '房間面積'),
  volumeLabel: T('방 부피', 'Room volume', 'Volumen', 'Volume', '部屋の容積', 'Raumvolumen', 'Volume', 'कमरे का आयतन', '房间体积', '房間體積'),
  cadrLabel: T('청정능력 CADR', 'Clean air rate (CADR)', 'Caudal de aire limpio (CADR)', 'Taxa de ar limpo (CADR)', '清浄能力 CADR', 'Reinluftleistung (CADR)', 'Débit d’air pur (CADR)', 'स्वच्छ वायु दर (CADR)', '洁净空气量 CADR', '潔淨空氣量 CADR'),
  achLabel: T('시간당 환기 횟수', 'Air changes per hour', 'Renovaciones por hora', 'Trocas por hora', '一時間あたり換気回数', 'Luftwechsel pro Stunde', 'Renouvellements par heure', 'प्रति घंटा वायु परिवर्तन', '每小时换气次数', '每小時換氣次數'),
  halfLabel: T('절반이 되기까지', 'Time to halve', 'Tiempo hasta la mitad', 'Tempo até a metade', '半分になるまで', 'Zeit bis zur Hälfte', 'Temps pour diviser par deux', 'आधा होने का समय', '减到一半', '減到一半'),
  tenthLabel: T('십분의 일이 되기까지', 'Time to a tenth', 'Tiempo hasta la décima parte', 'Tempo até um décimo', '十分の一になるまで', 'Zeit bis zum Zehntel', 'Temps pour diviser par dix', 'दसवाँ होने का समय', '减到十分之一', '減到十分之一'),
  neededLabel: T('권장값에 필요한 CADR', 'CADR needed for the target', 'CADR necesario', 'CADR necessário', '推奨に必要なCADR', 'Nötiger CADR', 'CADR nécessaire', 'लक्ष्य के लिए CADR', '达标所需 CADR', '達標所需 CADR'),
  shortfallLabel: T('모자란 만큼', 'Shortfall', 'Déficit', 'Déficit', '不足分', 'Fehlbetrag', 'Manque', 'कमी', '差多少', '差多少'),
  coversLabel: T('이 CADR이 덮는 넓이', 'Area this CADR covers', 'Superficie que cubre', 'Área que cobre', 'このCADRが賄える広さ', 'Von diesem CADR abgedeckte Fläche', 'Surface couverte', 'यह CADR कितना क्षेत्र', '这个 CADR 能覆盖', '這個 CADR 能覆蓋'),
  pickLabel: T('이 방에 맞는 가장 작은 CADR', 'Smallest CADR that fits', 'CADR mínimo adecuado', 'Menor CADR adequado', 'この部屋に合う最小CADR', 'Kleinster passender CADR', 'Plus petit CADR adapté', 'सबसे छोटा उपयुक्त CADR', '够用的最小 CADR', '夠用的最小 CADR'),
  minuteWord: T('분', 'min', 'min', 'min', '分', 'Min.', 'min', 'मि', '分钟', '分鐘'),
  pyeongWord: T('평', 'pyeong', 'pyeong', 'pyeong', '坪', 'Pyeong', 'pyeong', 'pyeong', '坪', '坪'),

  areaText: T<(f: PurifierFacts) => string>(
    f => `${f.pyeong}평 (${f.sqm}㎡)`,
    f => `${f.sqm} m² (${f.pyeong} pyeong)`,
    f => `${f.sqm} m² (${f.pyeong} pyeong)`,
    f => `${f.sqm} m² (${f.pyeong} pyeong)`,
    f => `${f.pyeong}坪 (${f.sqm}㎡)`,
    f => `${f.sqm} m² (${f.pyeong} Pyeong)`,
    f => `${f.sqm} m² (${f.pyeong} pyeong)`,
    f => `${f.sqm} m² (${f.pyeong} pyeong)`,
    f => `${f.sqm}㎡ (${f.pyeong}坪)`,
    f => `${f.pyeong}坪 (${f.sqm}㎡)`,
  ),

  decayTitle: T('먼지는 지수로 줄어듭니다', 'Dust falls off exponentially', 'El polvo cae exponencialmente', 'A poeira cai exponencialmente', 'ほこりは指数で減ります', 'Staub fällt exponentiell ab', 'La poussière décroît exponentiellement', 'धूल चरघातांकी रूप से घटती है', '灰尘按指数衰减', '灰塵按指數衰減'),
  decayNote: T(
    '깨끗한 공기가 들어오는 만큼 남은 먼지도 비례해서 빠지므로, 절반이 되는 데 걸리는 시간은 처음 농도와 상관없이 같습니다 — 방사성 물질의 반감기와 같은 계산입니다. 그래서 환기 횟수에 반감시간을 곱하면 언제나 41.6분이 나옵니다. 십분의 일까지 줄이려면 그 3.32배가 걸립니다.',
    'Clean air removes what is left in proportion to how much is left, so the time to halve the dust does not depend on where it started — the same arithmetic as radioactive half-life. Multiply air changes per hour by the halving time and you always get 41.6 minutes. Getting down to a tenth takes 3.32 times as long.',
    'El aire limpio retira lo que queda en proporción a lo que queda, así que el tiempo en reducirse a la mitad no depende del punto de partida: la misma cuenta que una vida media radiactiva. Multiplique renovaciones por hora por el tiempo de semirreducción y siempre salen 41,6 minutos. Bajar hasta la décima parte lleva 3,32 veces más.',
    'O ar limpo remove o que resta em proporção ao que resta, então o tempo para cair pela metade não depende de onde começou — a mesma conta de uma meia-vida radioativa. Multiplique trocas por hora pelo tempo de meia-redução e dá sempre 41,6 minutos. Chegar a um décimo leva 3,32 vezes mais.',
    'きれいな空気が入る分だけ残ったほこりも比例して抜けるので、半分になる時間は最初の濃度によりません — 放射性物質の半減期と同じ計算です。だから換気回数に半減時間を掛けると必ず41.6分になります。十分の一まで減らすにはその3.32倍かかります。',
    'Saubere Luft entfernt das Verbliebene proportional zum Verbliebenen, die Halbierungszeit hängt also nicht vom Ausgangswert ab — dieselbe Rechnung wie eine radioaktive Halbwertszeit. Luftwechsel pro Stunde mal Halbierungszeit ergibt immer 41,6 Minuten. Bis auf ein Zehntel dauert es das 3,32-Fache.',
    'L’air pur retire ce qui reste proportionnellement à ce qui reste : le temps de division par deux ne dépend donc pas du point de départ — le même calcul qu’une demi-vie radioactive. Renouvellements par heure multipliés par le temps de demi-réduction donnent toujours 41,6 minutes. Descendre au dixième prend 3,32 fois plus longtemps.',
    'स्वच्छ हवा बची हुई धूल को उसी अनुपात में हटाती है, इसलिए आधा होने का समय शुरुआती स्तर पर निर्भर नहीं — रेडियोधर्मी अर्ध-आयु जैसा ही गणित। प्रति घंटा वायु परिवर्तन को अर्ध-समय से गुणा कीजिए, हमेशा 41.6 मिनट आएगा। दसवें हिस्से तक जाने में 3.32 गुना समय लगता है।',
    '洁净空气按剩余量的比例带走灰尘，所以减半所需时间与起始浓度无关——和放射性半衰期是同一套算法。把每小时换气次数乘上减半时间，总是 41.6 分钟。要降到十分之一，需要 3.32 倍的时间。',
    '潔淨空氣按剩餘量的比例帶走灰塵，所以減半所需時間與起始濃度無關——和放射性半衰期是同一套算法。把每小時換氣次數乘上減半時間，總是 41.6 分鐘。要降到十分之一，需要 3.32 倍的時間。',
  ),

  adTitle: T('광고의 평형과 실제가 갈리는 자리', 'Where the advertised area parts ways with reality', 'Donde la superficie anunciada se aparta de la realidad', 'Onde a área anunciada se afasta da realidade', '表示の適用面積と実際が食い違う場所', 'Wo die beworbene Fläche von der Realität abweicht', 'Là où la surface annoncée s’écarte du réel', 'विज्ञापित क्षेत्र और असलियत कहाँ अलग होते हैं', '标称面积和实际分道扬镳的地方', '標示坪數和實際分道揚鑣的地方'),
  adNote: T(
    '한국 표준(KS C 9314)의 표준사용면적은 천장 2.4m 시험실에서 재는데, 그 정의에 자연 환기가 함께 일어난다는 조건이 들어 있습니다. 창을 닫고 쓰는 방에서는 그 도움이 없으므로 표시된 면적을 그대로 믿으면 빠듯해집니다. 흔히 실제 방보다 넉넉한 쪽으로 고르라고 하는 까닭이 이것입니다. 이 표는 자연 환기를 빼고 청정기만으로 계산합니다.',
    'The Korean standard (KS C 9314) measures the coverage area in a chamber with a 2.4 m ceiling, and its definition assumes natural ventilation is happening alongside. A closed room does not get that help, so taking the printed area at face value leaves you short. That is why the usual advice is to buy with headroom over your actual room. This chart leaves ventilation out and counts the purifier alone.',
    'La norma coreana (KS C 9314) mide la superficie en una cámara con techo de 2,4 m, y su definición supone que hay ventilación natural al mismo tiempo. Una sala cerrada no recibe esa ayuda, así que tomar al pie de la letra la superficie impresa deja corto. Por eso se aconseja comprar con margen sobre la sala real. Esta tabla deja fuera la ventilación y cuenta solo el purificador.',
    'A norma coreana (KS C 9314) mede a área numa câmara com pé-direito de 2,4 m, e sua definição supõe ventilação natural acontecendo junto. Uma sala fechada não tem essa ajuda, então levar a área impressa ao pé da letra deixa curto. Por isso costuma-se aconselhar comprar com folga sobre a sala real. Esta tabela deixa a ventilação de fora e conta só o purificador.',
    '韓国規格(KS C 9314)の適用面積は天井2.4mの試験室で測りますが、その定義には自然換気が同時に起きるという条件が入っています。窓を閉めて使う部屋ではその助けがないので、表示の面積をそのまま信じるとぎりぎりになります。実際の部屋より余裕をもって選べと言われるのはこのためです。この表は自然換気を除き、清浄機だけで計算します。',
    'Die koreanische Norm (KS C 9314) misst die Raumgröße in einer Kammer mit 2,4 m Decke, und ihre Definition setzt gleichzeitige natürliche Lüftung voraus. Ein geschlossener Raum bekommt diese Hilfe nicht, wer die aufgedruckte Fläche wörtlich nimmt, liegt also knapp. Deshalb rät man üblicherweise, mit Reserve über den tatsächlichen Raum hinaus zu kaufen. Diese Tabelle lässt die Lüftung weg und rechnet nur mit dem Gerät.',
    'La norme coréenne (KS C 9314) mesure la surface dans une chambre à plafond de 2,4 m, et sa définition suppose une ventilation naturelle simultanée. Une pièce fermée n’a pas cette aide : prendre la surface imprimée au pied de la lettre laisse juste. D’où le conseil courant d’acheter avec de la marge sur la pièce réelle. Ce tableau écarte la ventilation et ne compte que l’appareil.',
    'कोरियाई मानक (KS C 9314) क्षेत्रफल 2.4 मी छत वाले कक्ष में नापता है, और उसकी परिभाषा में साथ-साथ प्राकृतिक वेंटिलेशन मान लिया जाता है। बंद कमरे को वह मदद नहीं मिलती, इसलिए छपे क्षेत्रफल पर भरोसा करने से गुंजाइश कम पड़ती है। इसीलिए असली कमरे से बड़ा लेने की सलाह दी जाती है। यह तालिका वेंटिलेशन हटाकर सिर्फ़ प्यूरिफ़ायर से गिनती है।',
    '韩国标准（KS C 9314）在层高 2.4 米的试验室里测适用面积，而它的定义里包含了同时存在自然通风这一条。关着窗用的房间没有这份帮助，所以照搬标称面积就会偏紧。通常建议按比实际房间更大的规格选，原因就在这里。本表把自然通风剔除，只算净化器本身。',
    '韓國標準（KS C 9314）在樓高 2.4 公尺的試驗室裡測適用面積，而它的定義裡包含了同時存在自然通風這一條。關著窗用的房間沒有這份幫助，所以照搬標示坪數就會偏緊。通常建議按比實際房間更大的規格選，原因就在這裡。本表把自然通風剔除，只算清淨機本身。',
  ),

  ruleTitle: T('3분의 2 규칙은 정확히 다섯 번입니다', 'The two-thirds rule lands exactly on five', 'La regla de dos tercios cae justo en cinco', 'A regra dos dois terços cai exatamente em cinco', '3分の2の法則はちょうど五回です', 'Die Zwei-Drittel-Regel trifft genau fünf', 'La règle des deux tiers tombe pile sur cinq', 'दो-तिहाई नियम ठीक पाँच पर आता है', '三分之二法则正好是五次', '三分之二法則正好是五次'),
  ruleNote: T(
    '미국에서 흔히 쓰는 어림은 "CADR(cfm)이 방 넓이(제곱피트)의 3분의 2 이상"입니다. 천장 8피트로 계산해 보면 (2/3)×넓이×60 ÷ (8×넓이) = 5로 딱 떨어집니다 — 어림이 아니라 시간당 다섯 번을 다르게 적은 것입니다. 8피트는 2.44m라 한국 시험실의 2.4m와 사실상 같은 방이고, 그래서 두 나라의 권장값이 같은 자리에 놓입니다.',
    'The common American shorthand is “CADR in cfm should be at least two-thirds of the room’s square footage”. Work it out at an 8-foot ceiling: (2/3) × A × 60 ÷ (8 × A) = 5, exactly. It is not a rule of thumb at all, it is five air changes an hour written differently. Eight feet is 2.44 m, essentially the same room as the Korean chamber’s 2.4 m, which is why both countries land on the same target.',
    'El atajo habitual en EE. UU. es «el CADR en cfm debe ser al menos dos tercios de los pies cuadrados de la sala». Con techo de 8 pies: (2/3) × A × 60 ÷ (8 × A) = 5, exacto. No es una regla aproximada, son cinco renovaciones por hora escritas de otro modo. Ocho pies son 2,44 m, prácticamente la misma sala que los 2,4 m de la cámara coreana; por eso ambos países coinciden.',
    'O atalho comum nos EUA é “o CADR em cfm deve ser ao menos dois terços dos pés quadrados da sala”. Com pé-direito de 8 pés: (2/3) × A × 60 ÷ (8 × A) = 5, exato. Não é uma regra aproximada, são cinco trocas por hora escritas de outro jeito. Oito pés são 2,44 m, praticamente a mesma sala dos 2,4 m da câmara coreana; por isso os dois países coincidem.',
    'アメリカでよく使われる目安は「CADR(cfm)が部屋の広さ(平方フィート)の3分の2以上」です。天井8フィートで計算すると (2/3)×広さ×60 ÷ (8×広さ) = 5 とちょうど割り切れます — 目安ではなく、一時間に五回を別の書き方にしただけです。8フィートは2.44mで韓国の試験室の2.4mとほぼ同じ部屋なので、両国の推奨値が同じ場所に落ちます。',
    'Die gängige US-Faustregel lautet: „Der CADR in cfm sollte mindestens zwei Drittel der Raumfläche in Quadratfuß betragen.“ Bei 8 Fuß Deckenhöhe gerechnet: (2/3) × A × 60 ÷ (8 × A) = 5, genau. Das ist gar keine Faustregel, sondern fünf Luftwechsel pro Stunde anders geschrieben. Acht Fuß sind 2,44 m, praktisch derselbe Raum wie die 2,4 m der koreanischen Kammer — daher derselbe Zielwert.',
    'Le raccourci américain courant est : « le CADR en cfm doit valoir au moins deux tiers de la surface en pieds carrés ». Avec un plafond de 8 pieds : (2/3) × A × 60 ÷ (8 × A) = 5, exactement. Ce n’est pas une approximation, c’est cinq renouvellements par heure écrits autrement. Huit pieds font 2,44 m, quasiment la même pièce que les 2,4 m de la chambre coréenne : d’où la même cible.',
    'अमेरिका में प्रचलित नियम है: “CADR (cfm) कमरे के वर्ग फुट का कम से कम दो-तिहाई हो।” 8 फुट छत पर गणना कीजिए: (2/3) × A × 60 ÷ (8 × A) = 5, ठीक-ठीक। यह अनुमान नहीं, प्रति घंटा पाँच वायु परिवर्तन को दूसरे ढंग से लिखना है। आठ फुट यानी 2.44 मी, कोरियाई कक्ष के 2.4 मी जैसा ही कमरा — इसीलिए दोनों देशों का लक्ष्य एक जगह आता है।',
    '美国常用的经验法则是「CADR（cfm）至少为房间平方英尺数的三分之二」。按 8 英尺层高算一下：(2/3) × A × 60 ÷ (8 × A) = 5，正好整除——这根本不是经验值，而是每小时五次换气的另一种写法。8 英尺是 2.44 米，和韩国试验室的 2.4 米几乎是同一个房间，所以两国的推荐值落在同一处。',
    '美國常用的經驗法則是「CADR（cfm）至少為房間平方英尺數的三分之二」。按 8 英尺樓高算一下：(2/3) × A × 60 ÷ (8 × A) = 5，正好整除——這根本不是經驗值，而是每小時五次換氣的另一種寫法。8 英尺是 2.44 公尺，和韓國試驗室的 2.4 公尺幾乎是同一個房間，所以兩國的推薦值落在同一處。',
  ),

  limitTitle: T('이 계산이 안 보는 것', 'What this calculation leaves out', 'Lo que este cálculo no ve', 'O que este cálculo não vê', 'この計算が見ていないもの', 'Was diese Rechnung auslässt', 'Ce que ce calcul ignore', 'यह गणना क्या नहीं देखती', '这套算法没算进去的', '這套算法沒算進去的'),
  limitNote: T(
    '방을 닫아 두고 먼지가 새로 생기지 않는다고 볼 때의 계산입니다. 실제로는 창틈으로 들어오고, 사람이 움직이면 다시 날리고, 요리를 하면 새로 생깁니다. 필터가 막히면 CADR도 떨어집니다. 그리고 공기가 방 안에서 고루 섞인다고 보았는데, 청정기를 구석에 두면 그렇지 않습니다.',
    'This assumes a closed room with no new dust being made. In practice it seeps in around windows, gets stirred up when people move, and is created afresh by cooking. A clogged filter drops the CADR too. And the maths assumes the air mixes evenly through the room, which it does not if the purifier sits in a corner.',
    'Supone una sala cerrada donde no se genera polvo nuevo. En la práctica entra por las rendijas, se levanta cuando alguien se mueve y se crea al cocinar. Un filtro obstruido también baja el CADR. Además se supone que el aire se mezcla de manera uniforme, cosa que no ocurre si el purificador está en un rincón.',
    'Supõe uma sala fechada sem poeira nova sendo gerada. Na prática ela entra pelas frestas, é levantada quando alguém se move e é criada ao cozinhar. Um filtro entupido também derruba o CADR. E a conta supõe que o ar se mistura uniformemente, o que não acontece se o purificador fica num canto.',
    '部屋を閉め切り、新しいほこりが出ないとした計算です。実際には窓の隙間から入り、人が動けば舞い上がり、料理をすれば新たに出ます。フィルターが詰まればCADRも落ちます。さらに空気が部屋の中で均一に混ざると見なしていますが、清浄機を隅に置けばそうはなりません。',
    'Angenommen wird ein geschlossener Raum ohne neu entstehenden Staub. Tatsächlich dringt er durch Fensterritzen ein, wird beim Bewegen aufgewirbelt und beim Kochen neu erzeugt. Ein zugesetzter Filter senkt zudem den CADR. Und die Rechnung setzt gleichmäßige Durchmischung voraus — die es nicht gibt, wenn das Gerät in der Ecke steht.',
    'On suppose une pièce fermée où aucune poussière nouvelle n’apparaît. En réalité elle s’infiltre par les fenêtres, se soulève quand on bouge et se crée en cuisinant. Un filtre encrassé fait aussi chuter le CADR. Et le calcul suppose un mélange uniforme de l’air, ce qui n’est pas le cas si l’appareil est dans un coin.',
    'यह बंद कमरे की गणना है जिसमें नई धूल नहीं बनती। असल में वह खिड़कियों की दरारों से आती है, लोगों के चलने पर उठती है और खाना बनाने पर नई बनती है। भरा हुआ फ़िल्टर CADR भी गिरा देता है। और यह मान लिया गया है कि हवा कमरे में समान रूप से मिलती है — कोने में रखे प्यूरिफ़ायर के साथ ऐसा नहीं होता।',
    '这是把房间关起来、并且不再产生新灰尘时的算法。实际上灰尘会从窗缝进来，人一走动就扬起来，做饭还会新生成。滤网堵了，CADR 也会掉。而且算式假定空气在房间里均匀混合——净化器摆在角落里就不是这样。',
    '這是把房間關起來、並且不再產生新灰塵時的算法。實際上灰塵會從窗縫進來，人一走動就揚起來，煮飯還會新生成。濾網堵了，CADR 也會掉。而且算式假定空氣在房間裡均勻混合——清淨機擺在角落裡就不是這樣。',
  ),

  areaRowTitle: T('같은 방의 다른 청정능력', 'Same room, other purifiers', 'Misma sala, otros purificadores', 'Mesma sala, outros purificadores', '同じ部屋の他の清浄能力', 'Gleicher Raum, andere Geräte', 'Même pièce, autres appareils', 'वही कमरा, अन्य प्यूरिफ़ायर', '同一房间的其他机型', '同一房間的其他機型'),
  cadrRowTitle: T('같은 청정능력의 다른 방', 'Same purifier, other rooms', 'Mismo purificador, otras salas', 'Mesmo purificador, outras salas', '同じ清浄能力の他の部屋', 'Gleiches Gerät, andere Räume', 'Même appareil, autres pièces', 'वही प्यूरिफ़ायर, अन्य कमरे', '同一机型的其他房间', '同一機型的其他房間'),

  desc: T<(f: PurifierFacts) => string>(
    f => `${f.pyeong}평(${f.sqm}㎡) 방에 CADR ${f.cadr}㎥/분이면 시간당 ${f.ach}번 갈립니다 — ${gKo[f.grade]}입니다. 먼지가 절반이 되기까지 ${f.halfMinutes}분입니다.`,
    f => `A ${f.sqm} m² room with a CADR of ${f.cadr} m³/min gets ${f.ach} air changes an hour — ${gEn[f.grade].toLowerCase()}. Dust halves in ${f.halfMinutes} minutes.`,
    f => `Una sala de ${f.sqm} m² con un CADR de ${f.cadr} m³/min recibe ${f.ach} renovaciones por hora: ${gEs[f.grade].toLowerCase()}. El polvo se reduce a la mitad en ${f.halfMinutes} minutos.`,
    f => `Uma sala de ${f.sqm} m² com CADR de ${f.cadr} m³/min recebe ${f.ach} trocas por hora: ${gPt[f.grade].toLowerCase()}. A poeira cai pela metade em ${f.halfMinutes} minutos.`,
    f => `${f.pyeong}坪(${f.sqm}㎡)の部屋にCADR ${f.cadr}㎥/分なら一時間に${f.ach}回入れ替わります — ${gJa[f.grade]}です。ほこりが半分になるまで${f.halfMinutes}分です。`,
    f => `Ein Raum mit ${f.sqm} m² und einem CADR von ${f.cadr} m³/min erreicht ${f.ach} Luftwechsel pro Stunde — ${gDe[f.grade].toLowerCase()}. Der Staub halbiert sich in ${f.halfMinutes} Minuten.`,
    f => `Une pièce de ${f.sqm} m² avec un CADR de ${f.cadr} m³/min obtient ${f.ach} renouvellements par heure — ${gFr[f.grade].toLowerCase()}. La poussière est divisée par deux en ${f.halfMinutes} minutes.`,
    f => `${f.sqm} m² के कमरे में ${f.cadr} m³/min CADR से प्रति घंटा ${f.ach} बार हवा बदलती है — ${gHi[f.grade]}। धूल ${f.halfMinutes} मिनट में आधी हो जाती है।`,
    f => `${f.sqm}㎡ 的房间配 CADR ${f.cadr}㎥/分，每小时换气 ${f.ach} 次——${gZh[f.grade]}。灰尘减半需要 ${f.halfMinutes} 分钟。`,
    f => `${f.sqm}㎡ 的房間配 CADR ${f.cadr}㎥/分，每小時換氣 ${f.ach} 次——${gTw[f.grade]}。灰塵減半需要 ${f.halfMinutes} 分鐘。`,
  ),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      '시간당 환기 횟수 = 청정능력(㎥/분) × 60 ÷ 방 부피(㎥).',
      '방 부피는 넓이 × 천장 2.4m입니다 — 시험 기준의 높이입니다.',
      '널리 쓰이는 권장값은 시간당 다섯 번입니다.',
      '먼지가 절반이 되기까지 = 60 × ln2 ÷ 환기 횟수. 다섯 번이면 8.3분입니다.',
      '십분의 일까지는 절반까지의 3.32배가 걸립니다.',
      '광고의 표준사용면적에는 자연 환기가 얹혀 있습니다 — 닫힌 방에는 그만큼 여유가 없습니다.',
    ],
    [
      'Air changes per hour = clean air rate (m³/min) × 60 ÷ room volume (m³).',
      'Room volume is area × a 2.4 m ceiling — the height the standard tests at.',
      'The widely used target is five changes an hour.',
      'Time to halve the dust = 60 × ln2 ÷ air changes. At five an hour, that is 8.3 minutes.',
      'Getting to a tenth takes 3.32 times as long as halving.',
      'The advertised coverage area includes natural ventilation — a closed room has less headroom.',
    ],
    [
      'Renovaciones por hora = caudal de aire limpio (m³/min) × 60 ÷ volumen (m³).',
      'El volumen es superficie × techo de 2,4 m, la altura que usa el ensayo.',
      'El objetivo habitual son cinco renovaciones por hora.',
      'Tiempo hasta la mitad = 60 × ln2 ÷ renovaciones. A cinco por hora, 8,3 minutos.',
      'Llegar a la décima parte lleva 3,32 veces lo que llegar a la mitad.',
      'La superficie anunciada incluye ventilación natural: una sala cerrada tiene menos margen.',
    ],
    [
      'Trocas por hora = taxa de ar limpo (m³/min) × 60 ÷ volume (m³).',
      'O volume é área × pé-direito de 2,4 m, a altura usada no ensaio.',
      'O alvo usual são cinco trocas por hora.',
      'Tempo até a metade = 60 × ln2 ÷ trocas. A cinco por hora, 8,3 minutos.',
      'Chegar a um décimo leva 3,32 vezes o tempo de cair pela metade.',
      'A área anunciada inclui ventilação natural: uma sala fechada tem menos folga.',
    ],
    [
      '一時間あたり換気回数 = 清浄能力(㎥/分) × 60 ÷ 部屋の容積(㎥)。',
      '容積は広さ × 天井2.4mです — 試験基準の高さです。',
      '広く使われる目安は一時間に五回です。',
      '半分になるまで = 60 × ln2 ÷ 換気回数。五回なら8.3分です。',
      '十分の一までは半分までの3.32倍かかります。',
      '表示の適用面積には自然換気が乗っています — 閉じた部屋にはその分の余裕がありません。',
    ],
    [
      'Luftwechsel pro Stunde = Reinluftleistung (m³/min) × 60 ÷ Raumvolumen (m³).',
      'Das Volumen ist Fläche × 2,4 m Decke — die Höhe, mit der die Norm prüft.',
      'Der gängige Zielwert ist fünf Wechsel pro Stunde.',
      'Halbierungszeit = 60 × ln2 ÷ Luftwechsel. Bei fünf pro Stunde sind das 8,3 Minuten.',
      'Bis auf ein Zehntel dauert es das 3,32-Fache der Halbierungszeit.',
      'Die beworbene Fläche enthält natürliche Lüftung — ein geschlossener Raum hat weniger Reserve.',
    ],
    [
      'Renouvellements par heure = débit d’air pur (m³/min) × 60 ÷ volume (m³).',
      'Le volume vaut surface × plafond de 2,4 m, la hauteur de l’essai normalisé.',
      'La cible courante est de cinq renouvellements par heure.',
      'Temps de division par deux = 60 × ln2 ÷ renouvellements. À cinq par heure, 8,3 minutes.',
      'Atteindre le dixième prend 3,32 fois plus que la division par deux.',
      'La surface annoncée inclut la ventilation naturelle — une pièce fermée a moins de marge.',
    ],
    [
      'प्रति घंटा वायु परिवर्तन = स्वच्छ वायु दर (m³/min) × 60 ÷ कमरे का आयतन (m³)।',
      'आयतन = क्षेत्रफल × 2.4 मी छत — यही ऊँचाई मानक में परखी जाती है।',
      'प्रचलित लक्ष्य प्रति घंटा पाँच बार है।',
      'आधा होने का समय = 60 × ln2 ÷ वायु परिवर्तन। पाँच बार पर 8.3 मिनट।',
      'दसवें हिस्से तक जाने में आधा होने से 3.32 गुना समय लगता है।',
      'विज्ञापित क्षेत्रफल में प्राकृतिक वेंटिलेशन जुड़ा है — बंद कमरे में उतनी गुंजाइश नहीं।',
    ],
    [
      '每小时换气次数 = 洁净空气量（㎥/分）× 60 ÷ 房间体积（㎥）。',
      '房间体积 = 面积 × 2.4 米层高，也就是标准试验用的高度。',
      '通行的目标是每小时五次。',
      '减半时间 = 60 × ln2 ÷ 换气次数。每小时五次就是 8.3 分钟。',
      '降到十分之一，需要减半时间的 3.32 倍。',
      '标称适用面积里含了自然通风——关窗的房间没有那份余量。',
    ],
    [
      '每小時換氣次數 = 潔淨空氣量（㎥/分）× 60 ÷ 房間體積（㎥）。',
      '房間體積 = 面積 × 2.4 公尺樓高，也就是標準試驗用的高度。',
      '通行的目標是每小時五次。',
      '減半時間 = 60 × ln2 ÷ 換氣次數。每小時五次就是 8.3 分鐘。',
      '降到十分之一，需要減半時間的 3.32 倍。',
      '標示適用坪數裡含了自然通風——關窗的房間沒有那份餘量。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '공기청정기 평수 계산 — 방 넓이 × 청정능력 224칸',
    'Air purifier sizing — 224 cells of room area × clean air rate',
    'Dimensionar el purificador — 224 casillas de superficie × caudal',
    'Dimensionar o purificador — 224 células de área × vazão',
    '空気清浄機の適用畳数 — 広さ × 清浄能力 224マス',
    'Luftreiniger auslegen — 224 Felder aus Fläche × Reinluftleistung',
    'Dimensionner un purificateur — 224 cases surface × débit',
    'एयर प्यूरिफ़ायर आकार — क्षेत्रफल × वायु दर के 224 खाने',
    '空气净化器适用面积 — 面积 × 洁净空气量 224 格',
    '空氣清淨機適用坪數 — 坪數 × 潔淨空氣量 224 格',
  ),
  hubMetaDesc: T(
    '청정능력 ÷ 방 부피로 시간당 환기 횟수를 냅니다. 권장값은 다섯 번이고, 그때 먼지가 절반이 되기까지 8.3분입니다.',
    'Clean air rate divided by room volume gives air changes per hour. The target is five, at which dust halves in 8.3 minutes.',
    'El caudal de aire limpio dividido por el volumen da las renovaciones por hora. El objetivo son cinco, con el polvo reduciéndose a la mitad en 8,3 minutos.',
    'A vazão de ar limpo dividida pelo volume dá as trocas por hora. O alvo são cinco, com a poeira caindo pela metade em 8,3 minutos.',
    '清浄能力を部屋の容積で割ると一時間あたりの換気回数が出ます。目安は五回で、そのときほこりが半分になるまで8.3分です。',
    'Reinluftleistung geteilt durch Raumvolumen ergibt die Luftwechsel pro Stunde. Zielwert ist fünf, dabei halbiert sich der Staub in 8,3 Minuten.',
    'Le débit d’air pur divisé par le volume donne les renouvellements par heure. La cible est cinq, et la poussière est alors divisée par deux en 8,3 minutes.',
    'स्वच्छ वायु दर को आयतन से भाग देने पर प्रति घंटा वायु परिवर्तन मिलता है। लक्ष्य पाँच है, जिस पर धूल 8.3 मिनट में आधी होती है।',
    '洁净空气量除以房间体积就是每小时换气次数。目标是五次，此时灰尘 8.3 分钟减半。',
    '潔淨空氣量除以房間體積就是每小時換氣次數。目標是五次，此時灰塵 8.3 分鐘減半。',
  ),

  metaTitle: T<(f: PurifierFacts) => string>(
    f => `${f.pyeong}평에 CADR ${f.cadr} — 시간당 ${f.ach}회`,
    f => `${f.sqm} m² with CADR ${f.cadr} — ${f.ach} changes an hour`,
    f => `${f.sqm} m² con CADR ${f.cadr} — ${f.ach} renovaciones por hora`,
    f => `${f.sqm} m² com CADR ${f.cadr} — ${f.ach} trocas por hora`,
    f => `${f.pyeong}坪にCADR ${f.cadr} — 一時間${f.ach}回`,
    f => `${f.sqm} m² mit CADR ${f.cadr} — ${f.ach} Wechsel pro Stunde`,
    f => `${f.sqm} m² avec CADR ${f.cadr} — ${f.ach} renouvellements par heure`,
    f => `${f.sqm} m², CADR ${f.cadr} — प्रति घंटा ${f.ach} बार`,
    f => `${f.sqm}㎡ 配 CADR ${f.cadr} — 每小时 ${f.ach} 次`,
    f => `${f.sqm}㎡ 配 CADR ${f.cadr} — 每小時 ${f.ach} 次`,
  ),

  metaDesc: T<(f: PurifierFacts) => string>(
    f => `${f.pyeong}평(${f.sqm}㎡·${f.volume}㎥) 방에 CADR ${f.cadr}㎥/분을 두면 시간당 ${f.ach}번 갈리고 먼지가 절반이 되기까지 ${f.halfMinutes}분입니다. 권장값에는 ${f.needed}㎥/분이 필요합니다.`,
    f => `In a ${f.sqm} m² (${f.volume} m³) room, a CADR of ${f.cadr} m³/min gives ${f.ach} air changes an hour and halves the dust in ${f.halfMinutes} minutes. Meeting the target would need ${f.needed} m³/min.`,
    f => `En una sala de ${f.sqm} m² (${f.volume} m³), un CADR de ${f.cadr} m³/min da ${f.ach} renovaciones por hora y reduce el polvo a la mitad en ${f.halfMinutes} minutos. Alcanzar el objetivo pediría ${f.needed} m³/min.`,
    f => `Numa sala de ${f.sqm} m² (${f.volume} m³), um CADR de ${f.cadr} m³/min dá ${f.ach} trocas por hora e reduz a poeira à metade em ${f.halfMinutes} minutos. Atingir o alvo pediria ${f.needed} m³/min.`,
    f => `${f.pyeong}坪(${f.sqm}㎡・${f.volume}㎥)の部屋にCADR ${f.cadr}㎥/分を置くと一時間に${f.ach}回入れ替わり、ほこりが半分になるまで${f.halfMinutes}分です。推奨には${f.needed}㎥/分が要ります。`,
    f => `In einem Raum mit ${f.sqm} m² (${f.volume} m³) ergibt ein CADR von ${f.cadr} m³/min ${f.ach} Luftwechsel pro Stunde und halbiert den Staub in ${f.halfMinutes} Minuten. Für den Richtwert wären ${f.needed} m³/min nötig.`,
    f => `Dans une pièce de ${f.sqm} m² (${f.volume} m³), un CADR de ${f.cadr} m³/min donne ${f.ach} renouvellements par heure et divise la poussière par deux en ${f.halfMinutes} minutes. Atteindre la cible demanderait ${f.needed} m³/min.`,
    f => `${f.sqm} m² (${f.volume} m³) के कमरे में ${f.cadr} m³/min CADR से प्रति घंटा ${f.ach} बार हवा बदलती है और धूल ${f.halfMinutes} मिनट में आधी होती है। लक्ष्य के लिए ${f.needed} m³/min चाहिए।`,
    f => `在 ${f.sqm}㎡（${f.volume}㎥）的房间里，CADR ${f.cadr}㎥/分 每小时换气 ${f.ach} 次，灰尘 ${f.halfMinutes} 分钟减半。要达标需要 ${f.needed}㎥/分。`,
    f => `在 ${f.sqm}㎡（${f.volume}㎥）的房間裡，CADR ${f.cadr}㎥/分 每小時換氣 ${f.ach} 次，灰塵 ${f.halfMinutes} 分鐘減半。要達標需要 ${f.needed}㎥/分。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '광고의 평형 그대로 사면 안 되나요?', a: '표준사용면적은 자연 환기가 함께 일어난다고 보고 잰 값입니다. 미세먼지 때문에 창을 닫고 쓰는 상황이라면 그 도움이 없으니, 실제 방보다 넉넉한 쪽으로 고르는 편이 맞습니다.' },
      { q: '시간당 다섯 번은 어디서 나온 숫자인가요?', a: '알레르기·실내공기질 쪽에서 널리 쓰는 권장값입니다. 미국에서 흔한 "CADR이 방 제곱피트의 3분의 2" 어림도 천장 8피트로 계산하면 정확히 다섯 번으로 떨어집니다 — 같은 말입니다.' },
      { q: '켜자마자 깨끗해지지 않는 이유는요?', a: '먼지는 지수로 줄기 때문입니다. 시간당 다섯 번이라도 절반이 되기까지 8.3분, 십분의 일이 되기까지 27.6분이 걸립니다. 남은 양에 비례해 빠지므로 끝으로 갈수록 느려집니다.' },
      { q: '큰 것 하나와 작은 것 둘 중 무엇이 나은가요?', a: '환기 횟수만 보면 CADR을 더한 값이 같으면 같습니다. 다만 이 계산은 공기가 방 안에서 고루 섞인다고 보는데, 실제로는 두 대를 떨어뜨려 두는 쪽이 구석까지 닿습니다. 소음도 나눠집니다.' },
    ],
    [
      { q: 'Can I just buy for the area printed on the box?', a: 'That coverage figure is measured assuming natural ventilation is happening at the same time. If you are closing the windows because of fine dust, you do not get that help, so it is safer to buy with headroom over your actual room.' },
      { q: 'Where does “five changes an hour” come from?', a: 'It is the figure widely used in allergy and indoor-air-quality guidance. The common American shorthand — CADR at two-thirds of the room’s square footage — works out to exactly five at an 8-foot ceiling. They are the same statement.' },
      { q: 'Why is the air not clean the moment I switch it on?', a: 'Because dust falls exponentially. Even at five changes an hour it takes 8.3 minutes to halve and 27.6 minutes to reach a tenth. What is removed is proportional to what is left, so the tail is slow.' },
      { q: 'One big unit or two small ones?', a: 'By air changes alone, the same total CADR gives the same number. But this maths assumes the air mixes evenly, and in practice two units spread apart reach the corners better. The noise is split up too.' },
    ],
    [
      { q: '¿Puedo comprar según la superficie impresa en la caja?', a: 'Esa cifra se mide suponiendo ventilación natural simultánea. Si cierra las ventanas por el polvo fino, no tiene esa ayuda, así que conviene comprar con margen sobre la sala real.' },
      { q: '¿De dónde salen las cinco renovaciones por hora?', a: 'Es la cifra habitual en guías de alergia y calidad del aire interior. El atajo americano —CADR igual a dos tercios de los pies cuadrados— da exactamente cinco con techo de 8 pies. Son la misma afirmación.' },
      { q: '¿Por qué no queda limpio nada más encenderlo?', a: 'Porque el polvo cae exponencialmente. Incluso a cinco renovaciones por hora tarda 8,3 minutos en reducirse a la mitad y 27,6 en llegar a la décima parte. Se retira en proporción a lo que queda, así que el final es lento.' },
      { q: '¿Uno grande o dos pequeños?', a: 'Por renovaciones, el mismo CADR total da lo mismo. Pero este cálculo supone mezcla uniforme, y en la práctica dos aparatos separados llegan mejor a los rincones. El ruido también se reparte.' },
    ],
    [
      { q: 'Posso comprar pela área impressa na caixa?', a: 'Essa área é medida supondo ventilação natural ao mesmo tempo. Se você fecha as janelas por causa da poeira fina, não tem essa ajuda, então convém comprar com folga sobre a sala real.' },
      { q: 'De onde vêm as cinco trocas por hora?', a: 'É o número amplamente usado em orientações de alergia e qualidade do ar interno. O atalho americano — CADR em dois terços dos pés quadrados — dá exatamente cinco com pé-direito de 8 pés. São a mesma afirmação.' },
      { q: 'Por que não fica limpo assim que ligo?', a: 'Porque a poeira cai exponencialmente. Mesmo a cinco trocas por hora leva 8,3 minutos para cair pela metade e 27,6 para chegar a um décimo. Remove-se em proporção ao que resta, então o final é lento.' },
      { q: 'Um grande ou dois pequenos?', a: 'Só pelas trocas, o mesmo CADR total dá o mesmo. Mas esta conta supõe mistura uniforme, e na prática dois aparelhos afastados alcançam melhor os cantos. O ruído também se divide.' },
    ],
    [
      { q: '表示の適用畳数どおりに買ってはいけませんか。', a: '適用面積は自然換気が同時に起きるとして測った値です。微小粒子のせいで窓を閉めて使うなら、その助けがないので、実際の部屋より余裕をもって選ぶのが妥当です。' },
      { q: '一時間に五回という数字はどこから来ましたか。', a: 'アレルギーや室内空気質の分野で広く使われる目安です。アメリカで一般的な「CADRが部屋の平方フィートの3分の2」という言い方も、天井8フィートで計算するとちょうど五回になります — 同じことを言っています。' },
      { q: 'つけてすぐきれいにならないのはなぜですか。', a: 'ほこりが指数で減るからです。一時間に五回でも半分になるまで8.3分、十分の一になるまで27.6分かかります。残っている量に比例して抜けるので、終わりに近づくほど遅くなります。' },
      { q: '大きいの一台と小さいの二台ではどちらがよいですか。', a: '換気回数だけ見ればCADRの合計が同じなら同じです。ただしこの計算は空気が均一に混ざると見なしており、実際には二台を離して置くほうが隅まで届きます。騒音も分散します。' },
    ],
    [
      { q: 'Darf ich einfach nach der aufgedruckten Fläche kaufen?', a: 'Diese Flächenangabe wird unter der Annahme gleichzeitiger natürlicher Lüftung gemessen. Wer wegen Feinstaub die Fenster schließt, hat diese Hilfe nicht — also besser mit Reserve über den tatsächlichen Raum hinaus kaufen.' },
      { q: 'Woher kommen die fünf Wechsel pro Stunde?', a: 'Es ist der in Allergie- und Innenraumluft-Empfehlungen verbreitete Wert. Auch die gängige US-Kurzform — CADR gleich zwei Drittel der Quadratfuß — ergibt bei 8 Fuß Deckenhöhe genau fünf. Dieselbe Aussage.' },
      { q: 'Warum ist die Luft nicht sofort sauber?', a: 'Weil Staub exponentiell abfällt. Selbst bei fünf Wechseln pro Stunde dauert die Halbierung 8,3 Minuten und ein Zehntel 27,6 Minuten. Entfernt wird proportional zum Rest, das Ende zieht sich.' },
      { q: 'Ein großes oder zwei kleine Geräte?', a: 'Rein nach Luftwechseln zählt nur die Summe der CADR. Die Rechnung unterstellt aber gleichmäßige Durchmischung; in der Praxis erreichen zwei verteilte Geräte die Ecken besser. Auch der Lärm verteilt sich.' },
    ],
    [
      { q: 'Puis-je acheter selon la surface imprimée sur la boîte ?', a: 'Cette surface est mesurée en supposant une ventilation naturelle simultanée. Si vous fermez les fenêtres à cause des particules fines, vous n’avez pas cette aide : mieux vaut prévoir de la marge sur la pièce réelle.' },
      { q: 'D’où viennent les cinq renouvellements par heure ?', a: 'C’est la valeur couramment retenue en allergologie et en qualité de l’air intérieur. Le raccourci américain — CADR aux deux tiers de la surface en pieds carrés — donne exactement cinq à 8 pieds de plafond. C’est la même chose dite autrement.' },
      { q: 'Pourquoi l’air n’est-il pas propre dès l’allumage ?', a: 'Parce que la poussière décroît exponentiellement. Même à cinq renouvellements par heure, il faut 8,3 minutes pour diviser par deux et 27,6 pour atteindre le dixième. On retire proportionnellement à ce qui reste : la fin traîne.' },
      { q: 'Un gros appareil ou deux petits ?', a: 'Pour les renouvellements seuls, seul compte le CADR total. Mais ce calcul suppose un mélange uniforme ; en pratique, deux appareils espacés atteignent mieux les coins. Le bruit se répartit aussi.' },
    ],
    [
      { q: 'क्या डिब्बे पर लिखे क्षेत्रफल के हिसाब से ख़रीद सकते हैं?', a: 'वह क्षेत्रफल साथ-साथ प्राकृतिक वेंटिलेशन मानकर नापा जाता है। महीन धूल के कारण खिड़कियाँ बंद रखते हैं तो वह मदद नहीं मिलती, इसलिए असली कमरे से बड़ा लेना ठीक रहता है।' },
      { q: 'प्रति घंटा पाँच बार यह संख्या कहाँ से आई?', a: 'एलर्जी और इनडोर वायु गुणवत्ता की सलाहों में यही प्रचलित है। अमेरिका का आम नियम — CADR कमरे के वर्ग फुट का दो-तिहाई — 8 फुट छत पर ठीक पाँच देता है। दोनों एक ही बात हैं।' },
      { q: 'चालू करते ही हवा साफ़ क्यों नहीं होती?', a: 'क्योंकि धूल चरघातांकी रूप से घटती है। प्रति घंटा पाँच बार पर भी आधा होने में 8.3 मिनट और दसवें हिस्से तक 27.6 मिनट लगते हैं। बचे हुए के अनुपात में हटती है, इसलिए अंत धीमा होता है।' },
      { q: 'एक बड़ा या दो छोटे?', a: 'सिर्फ़ वायु परिवर्तन देखें तो कुल CADR समान होने पर बराबर है। पर यह गणित समान मिश्रण मानता है; असल में दो उपकरण अलग-अलग रखने पर कोनों तक बेहतर पहुँचते हैं। शोर भी बँट जाता है।' },
    ],
    [
      { q: '能不能就按盒子上的适用面积买？', a: '那个面积是在同时存在自然通风的前提下测的。要是因为细颗粒物而关窗使用，就没有这份帮助，所以按比实际房间更大的规格选更稳妥。' },
      { q: '每小时五次这个数字是哪来的？', a: '这是过敏和室内空气质量领域普遍采用的目标。美国常说的「CADR 取房间平方英尺的三分之二」，按 8 英尺层高一算正好也是五次——说的是同一件事。' },
      { q: '为什么一开机不能马上变干净？', a: '因为灰尘按指数衰减。即便每小时五次，减半也要 8.3 分钟，降到十分之一要 27.6 分钟。清除量与剩余量成正比，所以越到后面越慢。' },
      { q: '一台大的还是两台小的？', a: '只看换气次数，CADR 加起来一样就一样。但这套算法假定空气均匀混合，实际上两台分开摆更能照顾到角落，噪音也分散了。' },
    ],
    [
      { q: '能不能就按盒子上的適用坪數買？', a: '那個坪數是在同時存在自然通風的前提下測的。要是因為細懸浮微粒而關窗使用，就沒有這份幫助，所以按比實際房間更大的規格選更穩妥。' },
      { q: '每小時五次這個數字是哪來的？', a: '這是過敏和室內空氣品質領域普遍採用的目標。美國常說的「CADR 取房間平方英尺的三分之二」，按 8 英尺樓高一算正好也是五次——說的是同一件事。' },
      { q: '為什麼一開機不能馬上變乾淨？', a: '因為灰塵按指數衰減。即便每小時五次，減半也要 8.3 分鐘，降到十分之一要 27.6 分鐘。清除量與剩餘量成正比，所以越到後面越慢。' },
      { q: '一台大的還是兩台小的？', a: '只看換氣次數，CADR 加起來一樣就一樣。但這套算法假定空氣均勻混合，實際上兩台分開擺更能照顧到角落，噪音也分散了。' },
    ],
  ),

  cellFaq: T<(f: PurifierFacts) => FaqItem[]>(
    f => [
      { q: `${f.pyeong}평 방에 CADR ${f.cadr}이면 충분한가요?`, a: `시간당 ${f.ach}번 갈리니 ${gKo[f.grade]}입니다. ${f.shortfall > 0 ? `권장값에는 ${f.needed}㎥/분이 필요해 ${f.shortfall}만큼 모자랍니다.` : `권장값인 다섯 번을 넘습니다.`}` },
      { q: `먼지가 언제쯤 줄어드나요?`, a: `절반이 되기까지 ${f.halfMinutes}분, 십분의 일이 되기까지 ${f.tenthMinutes}분입니다. 방을 닫아 두고 새 먼지가 안 생긴다고 볼 때입니다.` },
      { q: `이 CADR은 몇 평까지 감당하나요?`, a: `권장값 기준으로 ${f.covers}평까지입니다.` },
      { q: `${f.pyeong}평이면 무엇을 사야 하나요?`, a: f.pick ? `이 표의 눈금에서는 CADR ${f.pick}㎥/분부터 권장값을 채웁니다.` : `이 표의 가장 큰 ${f.cadr}로도 모자랍니다 — 더 큰 것을 찾거나 두 대를 나눠 두어야 합니다.` },
    ],
    f => [
      { q: `Is CADR ${f.cadr} enough for ${f.sqm} m²?`, a: `It gives ${f.ach} air changes an hour, so: ${gEn[f.grade].toLowerCase()}. ${f.shortfall > 0 ? `Meeting the target needs ${f.needed} m³/min, so it is ${f.shortfall} short.` : `That is above the target of five.`}` },
      { q: `How soon does the dust drop?`, a: `Halved in ${f.halfMinutes} minutes, down to a tenth in ${f.tenthMinutes} — assuming a closed room with no new dust.` },
      { q: `How large a room does this CADR handle?`, a: `Up to ${f.covers} pyeong (${f.coversSqm} m²) at the target rate.` },
      { q: `What should I buy for ${f.sqm} m²?`, a: f.pick ? `On this chart’s scale, CADR ${f.pick} m³/min is the first that meets the target.` : `Even the largest here, ${f.cadr}, falls short — look for something bigger or split the job across two units.` },
    ],
    f => [
      { q: `¿Basta un CADR de ${f.cadr} para ${f.sqm} m²?`, a: `Da ${f.ach} renovaciones por hora: ${gEs[f.grade].toLowerCase()}. ${f.shortfall > 0 ? `Alcanzar el objetivo pide ${f.needed} m³/min, así que faltan ${f.shortfall}.` : `Supera el objetivo de cinco.`}` },
      { q: `¿Cuándo baja el polvo?`, a: `A la mitad en ${f.halfMinutes} minutos y a la décima parte en ${f.tenthMinutes}, suponiendo sala cerrada sin polvo nuevo.` },
      { q: `¿Qué superficie cubre este CADR?`, a: `Hasta ${f.coversSqm} m² al ritmo objetivo.` },
      { q: `¿Qué debería comprar para ${f.sqm} m²?`, a: f.pick ? `En esta escala, el CADR ${f.pick} m³/min es el primero que cumple el objetivo.` : `Ni el mayor de aquí, ${f.cadr}, llega: busque algo más grande o reparta entre dos aparatos.` },
    ],
    f => [
      { q: `Um CADR de ${f.cadr} basta para ${f.sqm} m²?`, a: `Dá ${f.ach} trocas por hora: ${gPt[f.grade].toLowerCase()}. ${f.shortfall > 0 ? `Atingir o alvo pede ${f.needed} m³/min, então faltam ${f.shortfall}.` : `Fica acima do alvo de cinco.`}` },
      { q: `Quando a poeira cai?`, a: `Pela metade em ${f.halfMinutes} minutos e a um décimo em ${f.tenthMinutes}, supondo sala fechada sem poeira nova.` },
      { q: `Que área este CADR cobre?`, a: `Até ${f.coversSqm} m² no ritmo alvo.` },
      { q: `O que comprar para ${f.sqm} m²?`, a: f.pick ? `Nesta escala, o CADR ${f.pick} m³/min é o primeiro que atinge o alvo.` : `Nem o maior daqui, ${f.cadr}, chega: procure algo maior ou divida entre dois aparelhos.` },
    ],
    f => [
      { q: `${f.pyeong}坪の部屋にCADR ${f.cadr}で足りますか。`, a: `一時間に${f.ach}回入れ替わるので${gJa[f.grade]}です。${f.shortfall > 0 ? `推奨には${f.needed}㎥/分が要るので${f.shortfall}足りません。` : `推奨の五回を超えています。`}` },
      { q: `ほこりはいつ減りますか。`, a: `半分になるまで${f.halfMinutes}分、十分の一になるまで${f.tenthMinutes}分です。部屋を閉め切り新しいほこりが出ないとした場合です。` },
      { q: `このCADRは何坪まで賄えますか。`, a: `推奨値で${f.covers}坪までです。` },
      { q: `${f.pyeong}坪なら何を買えばよいですか。`, a: f.pick ? `この表の目盛りではCADR ${f.pick}㎥/分から推奨を満たします。` : `この表で最大の${f.cadr}でも足りません — もっと大きいものを探すか二台に分けてください。` },
    ],
    f => [
      { q: `Reicht CADR ${f.cadr} für ${f.sqm} m²?`, a: `Es ergibt ${f.ach} Luftwechsel pro Stunde: ${gDe[f.grade].toLowerCase()}. ${f.shortfall > 0 ? `Für den Richtwert bräuchte es ${f.needed} m³/min, es fehlen also ${f.shortfall}.` : `Das liegt über dem Richtwert von fünf.`}` },
      { q: `Wann sinkt der Staub?`, a: `Halbiert nach ${f.halfMinutes} Minuten, auf ein Zehntel nach ${f.tenthMinutes} — bei geschlossenem Raum ohne neuen Staub.` },
      { q: `Wie groß darf der Raum bei diesem CADR sein?`, a: `Bis ${f.coversSqm} m² beim Richtwert.` },
      { q: `Was sollte ich für ${f.sqm} m² kaufen?`, a: f.pick ? `Auf dieser Skala erfüllt CADR ${f.pick} m³/min als erstes den Richtwert.` : `Selbst der größte hier, ${f.cadr}, reicht nicht — suchen Sie etwas Größeres oder verteilen Sie auf zwei Geräte.` },
    ],
    f => [
      { q: `Un CADR de ${f.cadr} suffit-il pour ${f.sqm} m² ?`, a: `Il donne ${f.ach} renouvellements par heure : ${gFr[f.grade].toLowerCase()}. ${f.shortfall > 0 ? `Atteindre la cible demande ${f.needed} m³/min, il manque donc ${f.shortfall}.` : `C’est au-dessus de la cible de cinq.`}` },
      { q: `Quand la poussière baisse-t-elle ?`, a: `Divisée par deux en ${f.halfMinutes} minutes, par dix en ${f.tenthMinutes} — pièce fermée et sans poussière nouvelle.` },
      { q: `Quelle surface ce CADR couvre-t-il ?`, a: `Jusqu’à ${f.coversSqm} m² au rythme cible.` },
      { q: `Que faut-il acheter pour ${f.sqm} m² ?`, a: f.pick ? `Sur cette échelle, le CADR ${f.pick} m³/min est le premier à atteindre la cible.` : `Même le plus gros ici, ${f.cadr}, ne suffit pas : visez plus grand ou répartissez sur deux appareils.` },
    ],
    f => [
      { q: `${f.sqm} m² के लिए CADR ${f.cadr} काफ़ी है?`, a: `प्रति घंटा ${f.ach} बार हवा बदलती है — ${gHi[f.grade]}। ${f.shortfall > 0 ? `लक्ष्य के लिए ${f.needed} m³/min चाहिए, यानी ${f.shortfall} की कमी।` : `यह पाँच के लक्ष्य से ऊपर है।`}` },
      { q: `धूल कब घटती है?`, a: `${f.halfMinutes} मिनट में आधी, ${f.tenthMinutes} मिनट में दसवाँ हिस्सा — बंद कमरा और नई धूल न बनने की स्थिति में।` },
      { q: `यह CADR कितना बड़ा कमरा संभालता है?`, a: `लक्ष्य दर पर ${f.coversSqm} m² तक।` },
      { q: `${f.sqm} m² के लिए क्या लें?`, a: f.pick ? `इस पैमाने पर CADR ${f.pick} m³/min पहला है जो लक्ष्य पूरा करता है।` : `यहाँ का सबसे बड़ा ${f.cadr} भी कम पड़ता है — बड़ा ढूँढिए या दो उपकरणों में बाँटिए।` },
    ],
    f => [
      { q: `${f.sqm}㎡ 用 CADR ${f.cadr} 够吗？`, a: `每小时换气 ${f.ach} 次，属于${gZh[f.grade]}。${f.shortfall > 0 ? `要达标需要 ${f.needed}㎥/分，还差 ${f.shortfall}。` : `已经超过五次的目标。`}` },
      { q: `灰尘什么时候降下来？`, a: `${f.halfMinutes} 分钟减半，${f.tenthMinutes} 分钟降到十分之一——按关窗且不再产生新灰尘算。` },
      { q: `这个 CADR 能管多大的房间？`, a: `按目标换气次数，最多 ${f.coversSqm}㎡。` },
      { q: `${f.sqm}㎡ 该买什么？`, a: f.pick ? `在本表的刻度里，CADR ${f.pick}㎥/分 是第一个达标的。` : `连本表最大的 ${f.cadr} 都不够——得找更大的，或者分成两台。` },
    ],
    f => [
      { q: `${f.sqm}㎡ 用 CADR ${f.cadr} 夠嗎？`, a: `每小時換氣 ${f.ach} 次，屬於${gTw[f.grade]}。${f.shortfall > 0 ? `要達標需要 ${f.needed}㎥/分，還差 ${f.shortfall}。` : `已經超過五次的目標。`}` },
      { q: `灰塵什麼時候降下來？`, a: `${f.halfMinutes} 分鐘減半，${f.tenthMinutes} 分鐘降到十分之一——按關窗且不再產生新灰塵算。` },
      { q: `這個 CADR 能管多大的房間？`, a: `按目標換氣次數，最多 ${f.coversSqm}㎡。` },
      { q: `${f.sqm}㎡ 該買什麼？`, a: f.pick ? `在本表的刻度裡，CADR ${f.pick}㎥/分 是第一個達標的。` : `連本表最大的 ${f.cadr} 都不夠——得找更大的，或者分成兩台。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PURIFIER_UI: L<PurifierUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PurifierUI>;
