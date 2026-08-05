/**
 * 자외선 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "같은 햇빛도 사람마다 다섯 배 다르다"이다. 자외선
 * 지수는 내리쬐는 세기이고 피부 타입은 견디는 양이라, 둘을 나눠야 몇 분인지가
 * 나온다. 차단 지수는 그 시간을 곱으로 늘린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { UvFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface UvUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  indexLabel: string;
  skinLabel: string;
  medLabel: string;
  irradianceLabel: string;
  burnLabel: string;
  shieldLabel: string;
  needLabel: string;
  bandLabel: string;
  shadowLabel: string;
  skinName: (key: string) => string;
  bandName: (key: string) => string;
  shadowShort: string;
  shadowLong: string;
  medTitle: string;
  medNote: string;
  spfTitle: string;
  spfNote: string;
  bandTitle: string;
  bandNote: string;
  shadowTitle: string;
  shadowNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  skinRowTitle: string;
  indexRowTitle: string;
  desc: (f: UvFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: UvFacts) => string;
  metaDesc: (f: UvFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: UvFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 피부 타입 이름은 제목과 질문에서도 같은 것을 쓴다 — SPEC 밖으로 꺼낸다 */
const skinKo = pick({ i: 'I형 — 늘 타고 안 그을림', ii: 'II형 — 잘 타고 조금 그을림', iii: 'III형 — 가끔 타고 잘 그을림', iv: 'IV형 — 거의 안 타고 잘 그을림', v: 'V형 — 좀처럼 안 탐', vi: 'VI형 — 타지 않음' });
const skinEn = pick({ i: 'Type I — always burns, never tans', ii: 'Type II — burns easily, tans a little', iii: 'Type III — sometimes burns, tans well', iv: 'Type IV — rarely burns, tans easily', v: 'Type V — very rarely burns', vi: 'Type VI — never burns' });
const skinEs = pick({ i: 'Tipo I — siempre se quema, nunca se broncea', ii: 'Tipo II — se quema fácil, se broncea poco', iii: 'Tipo III — a veces se quema, se broncea bien', iv: 'Tipo IV — rara vez se quema, se broncea fácil', v: 'Tipo V — casi nunca se quema', vi: 'Tipo VI — no se quema' });
const skinPt = pick({ i: 'Tipo I — sempre queima, nunca bronzeia', ii: 'Tipo II — queima fácil, bronzeia pouco', iii: 'Tipo III — às vezes queima, bronzeia bem', iv: 'Tipo IV — raramente queima, bronzeia fácil', v: 'Tipo V — quase nunca queima', vi: 'Tipo VI — não queima' });
const skinJa = pick({ i: 'I型 — いつも赤くなり黒くならない', ii: 'II型 — すぐ赤くなり少し黒くなる', iii: 'III型 — 時々赤くなりよく黒くなる', iv: 'IV型 — ほとんど赤くならずよく黒くなる', v: 'V型 — めったに赤くならない', vi: 'VI型 — 赤くならない' });
const skinDe = pick({ i: 'Typ I — verbrennt immer, bräunt nie', ii: 'Typ II — verbrennt leicht, bräunt kaum', iii: 'Typ III — verbrennt manchmal, bräunt gut', iv: 'Typ IV — verbrennt selten, bräunt leicht', v: 'Typ V — verbrennt sehr selten', vi: 'Typ VI — verbrennt nicht' });
const skinFr = pick({ i: 'Type I — brûle toujours, ne bronze jamais', ii: 'Type II — brûle vite, bronze peu', iii: 'Type III — brûle parfois, bronze bien', iv: 'Type IV — brûle rarement, bronze facilement', v: 'Type V — brûle très rarement', vi: 'Type VI — ne brûle pas' });
const skinHi = pick({ i: 'टाइप I — हमेशा जलती है, कभी नहीं टैन होती', ii: 'टाइप II — जल्दी जलती है, थोड़ी टैन', iii: 'टाइप III — कभी-कभी जलती है, अच्छी टैन', iv: 'टाइप IV — कम जलती है, आसानी से टैन', v: 'टाइप V — बहुत कम जलती है', vi: 'टाइप VI — नहीं जलती' });
const skinZh = pick({ i: 'I 型 — 总是晒伤，从不晒黑', ii: 'II 型 — 容易晒伤，略微晒黑', iii: 'III 型 — 有时晒伤，容易晒黑', iv: 'IV 型 — 很少晒伤，很快晒黑', v: 'V 型 — 极少晒伤', vi: 'VI 型 — 不会晒伤' });
const skinTw = pick({ i: 'I 型 — 總是曬傷，從不曬黑', ii: 'II 型 — 容易曬傷，略微曬黑', iii: 'III 型 — 有時曬傷，容易曬黑', iv: 'IV 型 — 很少曬傷，很快曬黑', v: 'V 型 — 極少曬傷', vi: 'VI 型 — 不會曬傷' });

type Spec = { [K in keyof UvUI]: L<UvUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('자외선', 'UV index', 'Índice UV', 'Índice UV', '紫外線', 'UV-Index', 'Indice UV', 'यूवी सूचकांक', '紫外线', '紫外線'),

  skinName: T<(key: string) => string>(skinKo, skinEn, skinEs, skinPt, skinJa, skinDe, skinFr, skinHi, skinZh, skinTw),

  bandName: T<(key: string) => string>(
    pick({ low: '낮음', moderate: '보통', high: '높음', veryHigh: '매우 높음', extreme: '위험' }),
    pick({ low: 'low', moderate: 'moderate', high: 'high', veryHigh: 'very high', extreme: 'extreme' }),
    pick({ low: 'bajo', moderate: 'moderado', high: 'alto', veryHigh: 'muy alto', extreme: 'extremo' }),
    pick({ low: 'baixo', moderate: 'moderado', high: 'alto', veryHigh: 'muito alto', extreme: 'extremo' }),
    pick({ low: '弱い', moderate: '中程度', high: '強い', veryHigh: '非常に強い', extreme: '極めて強い' }),
    pick({ low: 'niedrig', moderate: 'mäßig', high: 'hoch', veryHigh: 'sehr hoch', extreme: 'extrem' }),
    pick({ low: 'faible', moderate: 'modéré', high: 'élevé', veryHigh: 'très élevé', extreme: 'extrême' }),
    pick({ low: 'कम', moderate: 'मध्यम', high: 'उच्च', veryHigh: 'बहुत उच्च', extreme: 'चरम' }),
    pick({ low: '低', moderate: '中等', high: '高', veryHigh: '很高', extreme: '极高' }),
    pick({ low: '低', moderate: '中等', high: '高', veryHigh: '很高', extreme: '極高' }),
  ),

  hubTitle: T(
    '자외선 126칸 — 지수 8이면 스무 분에 붉어집니다',
    '126 burn times — at UV 8, fair skin reddens in twenty minutes',
    '126 tiempos de quemadura — con UV 8, la piel clara enrojece en veinte minutos',
    '126 tempos de queimadura — com UV 8, a pele clara avermelha em vinte minutos',
    '紫外線126マス — 指数8なら20分で赤くなります',
    '126 Zeiten bis zum Sonnenbrand — bei UV 8 rötet helle Haut in zwanzig Minuten',
    '126 temps avant brûlure — à UV 8, une peau claire rougit en vingt minutes',
    '126 जलने के समय — UV 8 पर गोरी त्वचा बीस मिनट में लाल',
    '126 个晒伤时间 — 紫外线指数 8 时，浅色皮肤二十分钟就发红',
    '126 個曬傷時間 — 紫外線指數 8 時，淺色皮膚二十分鐘就發紅',
  ),

  hubLead: T(
    '자외선 지수 21가지와 피부 타입 6가지가 만나는 칸마다 화상까지 걸리는 시간을 계산했습니다. 같은 햇빛 아래에서도 I형과 VI형은 다섯 배 차이가 납니다.',
    'A time to sunburn for every meeting of 21 UV index values and 6 skin types. Under the same sun, type I and type VI are five times apart.',
    'Un tiempo hasta la quemadura para cada cruce de 21 valores del índice UV y 6 tipos de piel. Bajo el mismo sol, el tipo I y el VI se separan por cinco veces.',
    'Um tempo até a queimadura para cada cruzamento de 21 valores do índice UV e 6 tipos de pele. Sob o mesmo sol, o tipo I e o VI diferem cinco vezes.',
    '紫外線指数21通りと肌タイプ6通りが出会う各マスの、日焼けまでの時間を計算しました。同じ日差しでもI型とVI型は5倍違います。',
    'Eine Zeit bis zum Sonnenbrand für jede Begegnung von 21 UV-Werten und 6 Hauttypen. Unter derselben Sonne liegen Typ I und Typ VI um das Fünffache auseinander.',
    'Un temps avant brûlure pour chaque croisement de 21 valeurs d’indice UV et 6 phototypes. Sous le même soleil, le type I et le type VI sont séparés d’un facteur cinq.',
    '21 यूवी मानों और 6 त्वचा प्रकारों के हर मेल के लिए जलने तक का समय। एक ही धूप में टाइप I और VI में पाँच गुना अंतर है।',
    '21 种紫外线指数与 6 种肤质交汇的每一格都算出晒伤所需时间。同一片阳光下，I 型和 VI 型相差五倍。',
    '21 種紫外線指數與 6 種膚質交匯的每一格都算出曬傷所需時間。同一片陽光下，I 型和 VI 型相差五倍。',
  ),

  indexLabel: T('자외선 지수', 'UV index', 'Índice UV', 'Índice UV', '紫外線指数', 'UV-Index', 'Indice UV', 'यूवी सूचकांक', '紫外线指数', '紫外線指數'),
  skinLabel: T('피부 타입', 'Skin type', 'Tipo de piel', 'Tipo de pele', '肌タイプ', 'Hauttyp', 'Phototype', 'त्वचा प्रकार', '肤质类型', '膚質類型'),
  medLabel: T('최소 홍반량', 'Dose that reddens', 'Dosis que enrojece', 'Dose que avermelha', '最小紅斑量', 'Erythemschwelle', 'Dose érythémale', 'लाल करने वाली खुराक', '最小红斑量', '最小紅斑量'),
  irradianceLabel: T('피부에 내리는 세기', 'Strength on the skin', 'Intensidad sobre la piel', 'Intensidade sobre a pele', '肌に届く強さ', 'Stärke auf der Haut', 'Intensité sur la peau', 'त्वचा पर तीव्रता', '照到皮肤的强度', '照到皮膚的強度'),
  burnLabel: T('붉어지기까지', 'Time until it reddens', 'Tiempo hasta enrojecer', 'Tempo até avermelhar', '赤くなるまで', 'Zeit bis zur Rötung', 'Temps avant rougeur', 'लाल होने तक', '发红所需时间', '發紅所需時間'),
  shieldLabel: T('차단제를 바르면', 'With sunscreen on', 'Con protector solar', 'Com protetor solar', '日焼け止めを塗ると', 'Mit Sonnencreme', 'Avec de la crème solaire', 'सनस्क्रीन लगाने पर', '涂了防晒后', '塗了防曬後'),
  needLabel: T('두 시간을 버티려면', 'To last two hours', 'Para aguantar dos horas', 'Para aguentar duas horas', '2時間もたせるには', 'Für zwei Stunden', 'Pour tenir deux heures', 'दो घंटे टिकने के लिए', '想撑两小时', '想撐兩小時'),
  bandLabel: T('예보 구간', 'Forecast band', 'Franja del pronóstico', 'Faixa da previsão', '予報の区分', 'Vorhersagestufe', 'Niveau du bulletin', 'पूर्वानुमान श्रेणी', '预报等级', '預報等級'),
  shadowLabel: T('그림자 눈대중', 'The shadow rule', 'La regla de la sombra', 'A regra da sombra', '影の目安', 'Die Schattenregel', 'La règle de l’ombre', 'परछाईं नियम', '影子口诀', '影子口訣'),

  shadowShort: T('그림자가 키보다 짧습니다', 'Your shadow is shorter than you', 'Tu sombra es más corta que tú', 'Sua sombra é mais curta que você', '影が背より短いです', 'Der Schatten ist kürzer als Sie', 'Votre ombre est plus courte que vous', 'आपकी परछाईं आपसे छोटी है', '影子比人短', '影子比人短'),
  shadowLong: T('그림자가 키보다 깁니다', 'Your shadow is longer than you', 'Tu sombra es más larga que tú', 'Sua sombra é mais longa que você', '影が背より長いです', 'Der Schatten ist länger als Sie', 'Votre ombre est plus longue que vous', 'आपकी परछाईं आपसे लंबी है', '影子比人长', '影子比人長'),

  medTitle: T('내리쬐는 양을 견디는 양으로 나눕니다', 'Divide what falls by what you can take', 'Divide lo que cae entre lo que aguantas', 'Divida o que cai pelo que você aguenta', '降り注ぐ量を耐えられる量で割ります', 'Teile, was einfällt, durch das, was du aushältst', 'Diviser ce qui tombe par ce qu’on encaisse', 'जो पड़ता है उसे सहने की क्षमता से भागें', '把照下来的量除以能承受的量', '把照下來的量除以能承受的量'),

  medNote: T(
    '자외선 지수 1은 홍반에 유효한 자외선 0.025W/m²를 뜻합니다. 지수 8이면 0.2W/m²가 피부에 내립니다. 최소 홍반량은 "그만큼 쌓이면 여덟 시간 뒤 발갛게 되는" 양이고 단위가 J/m²라, 양을 세기로 나누면 시간이 나옵니다. I형은 200J/m², VI형은 1000J/m²입니다.',
    'A UV index of 1 means 0.025 W/m² of erythemally weighted ultraviolet. At index 8 that is 0.2 W/m² landing on skin. The minimal erythema dose is how much has to accumulate before the skin reddens some eight hours later, measured in J/m² — so dividing dose by strength gives time. Type I sits at 200 J/m², type VI at 1000.',
    'Un índice UV de 1 equivale a 0,025 W/m² de ultravioleta ponderado para el eritema. Con índice 8 caen 0,2 W/m² sobre la piel. La dosis eritematosa mínima es cuánto debe acumularse para que la piel enrojezca unas ocho horas después, en J/m²: dividir dosis entre intensidad da tiempo. El tipo I está en 200 J/m² y el VI en 1000.',
    'Um índice UV de 1 equivale a 0,025 W/m² de ultravioleta ponderado para eritema. Com índice 8 são 0,2 W/m² chegando à pele. A dose eritematosa mínima é quanto precisa acumular para a pele avermelhar uma oito horas depois, em J/m² — dividir dose por intensidade dá tempo. O tipo I fica em 200 J/m² e o VI em 1000.',
    '紫外線指数1は紅斑に有効な紫外線0.025W/m²を意味します。指数8なら0.2W/m²が肌に降ります。最小紅斑量は「それだけ積もれば8時間後に赤くなる」量でJ/m²なので、量を強さで割れば時間が出ます。I型は200J/m²、VI型は1000J/m²です。',
    'UV-Index 1 bedeutet 0,025 W/m² erythemwirksame Ultraviolettstrahlung. Bei Index 8 treffen 0,2 W/m² auf die Haut. Die minimale Erythemdosis ist, wie viel sich ansammeln muss, bis die Haut rund acht Stunden später rötet — in J/m². Dosis durch Stärke ergibt also Zeit. Typ I liegt bei 200 J/m², Typ VI bei 1000.',
    'Un indice UV de 1 correspond à 0,025 W/m² d’ultraviolet pondéré pour l’érythème. À l’indice 8, ce sont 0,2 W/m² qui arrivent sur la peau. La dose érythémale minimale est ce qu’il faut accumuler pour que la peau rougisse huit heures plus tard, en J/m² : diviser la dose par l’intensité donne un temps. Le type I est à 200 J/m², le type VI à 1000.',
    'यूवी सूचकांक 1 का अर्थ है 0.025 W/m² एरिथेमा-भारित पराबैंगनी। सूचकांक 8 पर त्वचा पर 0.2 W/m² पड़ता है। न्यूनतम एरिथेमा खुराक वह मात्रा है जो जमा होने पर लगभग आठ घंटे बाद त्वचा लाल कर देती है, इकाई J/m² — खुराक को तीव्रता से भाग देने पर समय मिलता है। टाइप I 200 J/m² और टाइप VI 1000 J/m² पर है।',
    '紫外线指数 1 表示 0.025W/m² 的红斑加权紫外线。指数 8 时，落在皮肤上的是 0.2W/m²。最小红斑量是"累积到这个量，约八小时后皮肤会发红"的剂量，单位是 J/m²，所以用剂量除以强度就得到时间。I 型是 200J/m²，VI 型是 1000J/m²。',
    '紫外線指數 1 表示 0.025W/m² 的紅斑加權紫外線。指數 8 時，落在皮膚上的是 0.2W/m²。最小紅斑量是「累積到這個量，約八小時後皮膚會發紅」的劑量，單位是 J/m²，所以用劑量除以強度就得到時間。I 型是 200J/m²，VI 型是 1000J/m²。',
  ),

  spfTitle: T('차단 지수는 곱하기입니다', 'SPF is a multiplier', 'El FPS es un multiplicador', 'O FPS é um multiplicador', 'SPFは掛け算です', 'LSF ist ein Faktor', 'L’indice FPS est un facteur', 'SPF एक गुणक है', 'SPF 是倍数', 'SPF 是倍數'),

  spfNote: T(
    'SPF 30은 붉어지기까지의 시간을 서른 배로 늘린다는 뜻입니다. 다만 그 숫자는 실험실에서 1제곱센티미터에 2mg을 고르게 발랐을 때 나온 값이고, 사람들이 실제로 바르는 양은 그 절반이 못 됩니다. 아래 시간은 그래서 넉넉한 쪽으로 틀린 값입니다 — 두세 시간마다 덧바르는 편이 낫습니다.',
    'SPF 30 means thirty times longer before the skin reddens. That number comes from a lab applying 2 mg per square centimetre evenly, and most people put on less than half of that. The times below are therefore generous — reapplying every couple of hours matters more than the number on the bottle.',
    'FPS 30 significa treinta veces más tiempo hasta que la piel enrojece. Ese número sale de aplicar 2 mg por centímetro cuadrado de forma uniforme en laboratorio, y la mayoría se pone menos de la mitad. Los tiempos de abajo son, por tanto, generosos: reaplicar cada dos horas importa más que la cifra del envase.',
    'FPS 30 significa trinta vezes mais tempo até a pele avermelhar. Esse número vem de aplicar 2 mg por centímetro quadrado uniformemente em laboratório, e a maioria passa menos da metade. Os tempos abaixo são, portanto, generosos: reaplicar a cada duas horas importa mais que o número do frasco.',
    'SPF 30は赤くなるまでの時間を30倍にするという意味です。ただしその数字は実験室で1平方センチに2mgを均一に塗ったときの値で、実際に塗る量はその半分にも届きません。下の時間はその分だけ甘い値です — 2〜3時間ごとに塗り直すほうが効きます。',
    'LSF 30 heißt dreißigmal länger, bis die Haut rötet. Diese Zahl stammt aus dem Labor mit 2 mg pro Quadratzentimeter gleichmäßig aufgetragen — die meisten nehmen weniger als die Hälfte. Die Zeiten unten sind daher großzügig; Nachcremen alle zwei Stunden zählt mehr als die Zahl auf der Tube.',
    'FPS 30 signifie trente fois plus de temps avant que la peau rougisse. Ce chiffre vient d’un laboratoire appliquant 2 mg par centimètre carré uniformément, et la plupart en mettent moins de la moitié. Les durées ci-dessous sont donc généreuses : remettre de la crème toutes les deux heures compte plus que le chiffre du flacon.',
    'SPF 30 का अर्थ है त्वचा लाल होने में तीस गुना अधिक समय। यह संख्या प्रयोगशाला में प्रति वर्ग सेंटीमीटर 2 mg समान रूप से लगाने पर मिलती है, और ज़्यादातर लोग उसका आधा भी नहीं लगाते। इसलिए नीचे के समय उदार हैं — हर दो घंटे में दोबारा लगाना बोतल की संख्या से अधिक मायने रखता है।',
    'SPF 30 意思是让皮肤发红的时间延长三十倍。但这个数字来自实验室每平方厘米均匀涂 2mg，而大多数人涂的还不到一半。所以下面的时间偏宽松——每两三小时补涂，比瓶身上的数字更重要。',
    'SPF 30 意思是讓皮膚發紅的時間延長三十倍。但這個數字來自實驗室每平方公分均勻塗 2mg，而大多數人塗的還不到一半。所以下面的時間偏寬鬆——每兩三小時補塗，比瓶身上的數字更重要。',
  ),

  bandTitle: T('예보가 가르는 자리', 'Where the forecast draws its lines', 'Dónde traza sus líneas el pronóstico', 'Onde a previsão traça as linhas', '予報が区切る位置', 'Wo die Vorhersage die Grenzen zieht', 'Où le bulletin trace ses limites', 'पूर्वानुमान कहाँ रेखा खींचता है', '预报的分界在哪', '預報的分界在哪'),

  bandNote: T(
    '세계보건기구가 정한 구간입니다 — 3부터 보통, 6부터 높음, 8부터 매우 높음, 11부터 위험입니다. 예보에서 "높음"을 봤다면 지수 6에서 7.5 사이라는 뜻이고, 그 안에서도 화상까지 걸리는 시간은 피부 타입에 따라 세 배 넘게 갈립니다.',
    'These bands come from the World Health Organization: moderate from 3, high from 6, very high from 8, extreme from 11. A forecast saying "high" means somewhere between 6 and 7.5 — and within that band the time to burn still differs threefold by skin type.',
    'Estas franjas vienen de la Organización Mundial de la Salud: moderado desde 3, alto desde 6, muy alto desde 8, extremo desde 11. Un pronóstico que dice «alto» está entre 6 y 7,5, y dentro de esa franja el tiempo hasta quemarse aún se triplica según el tipo de piel.',
    'Estas faixas vêm da Organização Mundial da Saúde: moderado a partir de 3, alto a partir de 6, muito alto a partir de 8, extremo a partir de 11. Uma previsão de "alto" fica entre 6 e 7,5 — e dentro dessa faixa o tempo até queimar ainda varia três vezes conforme o tipo de pele.',
    '世界保健機関が定めた区分です — 3から中程度、6から強い、8から非常に強い、11から極めて強いです。予報で「強い」を見たら指数6から7.5の間という意味で、その中でも日焼けまでの時間は肌タイプで3倍以上変わります。',
    'Diese Stufen stammen von der Weltgesundheitsorganisation: mäßig ab 3, hoch ab 6, sehr hoch ab 8, extrem ab 11. "Hoch" in der Vorhersage heißt irgendwo zwischen 6 und 7,5 — und selbst darin unterscheidet sich die Zeit bis zum Brand um das Dreifache je nach Hauttyp.',
    'Ces niveaux viennent de l’Organisation mondiale de la santé : modéré à partir de 3, élevé à partir de 6, très élevé à partir de 8, extrême à partir de 11. Un bulletin « élevé » signifie entre 6 et 7,5 — et dans cette plage, le temps avant brûlure varie encore du simple au triple selon le phototype.',
    'ये श्रेणियाँ विश्व स्वास्थ्य संगठन की हैं — 3 से मध्यम, 6 से उच्च, 8 से बहुत उच्च, 11 से चरम। पूर्वानुमान में "उच्च" का अर्थ है 6 से 7.5 के बीच, और उसी के भीतर जलने का समय त्वचा प्रकार से तीन गुना तक बदलता है।',
    '这些等级由世界卫生组织划定：3 起为中等，6 起为高，8 起为很高，11 起为极高。预报说"高"意思是在 6 到 7.5 之间，而同一等级内，晒伤时间仍会因肤质相差三倍以上。',
    '這些等級由世界衛生組織劃定：3 起為中等，6 起為高，8 起為很高，11 起為極高。預報說「高」意思是在 6 到 7.5 之間，而同一等級內，曬傷時間仍會因膚質相差三倍以上。',
  ),

  shadowTitle: T('그림자로 가늠하기', 'Reading it off your shadow', 'Leerlo en tu sombra', 'Ler pela sua sombra', '影で見当をつける', 'Am Schatten ablesen', 'Le lire sur son ombre', 'परछाईं से अंदाज़ा', '用影子判断', '用影子判斷'),

  shadowNote: T(
    '해가 높이 뜰수록 자외선이 세지고 그림자는 짧아집니다. 그림자가 키보다 짧으면 대개 지수 6을 넘습니다 — 예보를 못 봤을 때 쓰는 눈대중입니다. 반대로 그림자가 키보다 길면 해가 낮아 자외선도 약합니다.',
    'The higher the sun, the stronger the ultraviolet and the shorter your shadow. If your shadow is shorter than you are, the index is usually past 6 — a rough check when you have not seen a forecast. A shadow longer than you means a low sun and weak ultraviolet.',
    'Cuanto más alto está el sol, más fuerte el ultravioleta y más corta tu sombra. Si tu sombra es más corta que tú, el índice suele pasar de 6: una comprobación rápida cuando no has visto el pronóstico. Una sombra más larga que tú significa sol bajo y ultravioleta débil.',
    'Quanto mais alto o sol, mais forte o ultravioleta e mais curta sua sombra. Se a sombra for mais curta que você, o índice costuma passar de 6 — uma checagem rápida sem previsão. Sombra mais longa que você significa sol baixo e ultravioleta fraco.',
    '太陽が高く昇るほど紫外線は強く、影は短くなります。影が背より短ければ大抵指数6を超えています — 予報を見ていないときの目安です。逆に影が背より長ければ太陽が低く紫外線も弱いです。',
    'Je höher die Sonne, desto stärker das UV und desto kürzer der Schatten. Ist Ihr Schatten kürzer als Sie, liegt der Index meist über 6 — eine grobe Probe ohne Vorhersage. Ein längerer Schatten heißt tiefe Sonne und schwaches UV.',
    'Plus le soleil est haut, plus l’ultraviolet est fort et l’ombre courte. Si votre ombre est plus courte que vous, l’indice dépasse en général 6 — un repère sans bulletin. Une ombre plus longue signifie un soleil bas et un UV faible.',
    'सूरज जितना ऊँचा, पराबैंगनी उतनी तेज़ और परछाईं उतनी छोटी। परछाईं आपसे छोटी हो तो सूचकांक आम तौर पर 6 से ऊपर होता है — पूर्वानुमान न देखा हो तब का अंदाज़ा। परछाईं लंबी हो तो सूरज नीचा और किरणें कमज़ोर।',
    '太阳越高，紫外线越强，影子越短。影子比人短时，指数通常已过 6——没看预报时可以这样判断。影子比人长，说明太阳低、紫外线弱。',
    '太陽越高，紫外線越強，影子越短。影子比人短時，指數通常已過 6——沒看預報時可以這樣判斷。影子比人長，說明太陽低、紫外線弱。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '눈밭과 물가는 반사로 자외선이 더해지고, 높은 산은 이백 미터마다 몇 퍼센트씩 세집니다. 약을 먹고 있거나 피부가 예민하다면 이 시간보다 훨씬 일찍 붉어질 수 있습니다.',
    'Snow and water bounce more ultraviolet back at you, and altitude adds a few per cent every couple of hundred metres. Some medicines and sensitive skin will redden well before these times.',
    'La nieve y el agua reflejan más ultravioleta, y la altitud suma un pequeño porcentaje cada doscientos metros. Ciertos medicamentos y la piel sensible enrojecen mucho antes de estos tiempos.',
    'Neve e água refletem mais ultravioleta, e a altitude soma alguns por cento a cada duzentos metros. Alguns medicamentos e pele sensível avermelham bem antes desses tempos.',
    '雪原や水辺は反射で紫外線が上乗せされ、高い山では200mごとに数パーセント強くなります。薬を飲んでいたり肌が敏感だと、この時間よりずっと早く赤くなることがあります。',
    'Schnee und Wasser werfen zusätzliches UV zurück, und Höhe legt alle paar hundert Meter einige Prozent drauf. Manche Medikamente und empfindliche Haut röten deutlich früher als hier angegeben.',
    'La neige et l’eau renvoient davantage d’ultraviolet, et l’altitude ajoute quelques pour cent tous les deux cents mètres. Certains médicaments et les peaux sensibles rougissent bien avant ces durées.',
    'बर्फ़ और पानी परावर्तन से और पराबैंगनी जोड़ते हैं, और ऊँचाई हर दो सौ मीटर पर कुछ प्रतिशत बढ़ा देती है। कुछ दवाएँ या संवेदनशील त्वचा इन समयों से बहुत पहले लाल हो सकती है।',
    '雪地和水面会把更多紫外线反射回来，海拔每升高两百米还会强上几个百分点。服用某些药物或皮肤敏感的人，会比这些时间早得多就发红。',
    '雪地和水面會把更多紫外線反射回來，海拔每升高兩百公尺還會強上幾個百分點。服用某些藥物或皮膚敏感的人，會比這些時間早得多就發紅。',
  ),

  tableTitle: T('지수와 피부 타입으로 찾기', 'Find it by index and skin type', 'Búscalo por índice y tipo de piel', 'Ache por índice e tipo de pele', '指数と肌タイプから探す', 'Nach Index und Hauttyp suchen', 'Chercher par indice et phototype', 'सूचकांक और त्वचा प्रकार से देखें', '按指数和肤质查找', '按指數和膚質查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  skinRowTitle: T('같은 지수, 다른 피부', 'Same index, other skin types', 'Mismo índice, otras pieles', 'Mesmo índice, outras peles', '同じ指数、別の肌タイプ', 'Gleicher Index, andere Hauttypen', 'Même indice, autres phototypes', 'वही सूचकांक, दूसरी त्वचा', '同一指数，不同肤质', '同一指數，不同膚質'),
  indexRowTitle: T('같은 피부, 다른 지수', 'Same skin, other index values', 'Misma piel, otros índices', 'Mesma pele, outros índices', '同じ肌、別の指数', 'Gleiche Haut, andere Indexwerte', 'Même peau, autres indices', 'वही त्वचा, दूसरे सूचकांक', '同一肤质，不同指数', '同一膚質，不同指數'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '시간은 최소 홍반량을 지수의 세기로 나눈 값입니다. 지수가 두 배면 시간은 절반입니다.',
      '차단제 시간은 실험실 기준입니다. 실제로 바르는 양이 적어 그만큼 짧아집니다.',
      '눈·물·높은 곳은 자외선을 더합니다. 이 표에는 들어 있지 않습니다.',
      '붉어지는 것은 여덟 시간쯤 뒤에 보입니다. 그때는 이미 쬔 뒤입니다.',
    ],
    [
      'The time is the reddening dose divided by the strength the index stands for. Double the index, half the time.',
      'Sunscreen times are laboratory figures. Real coverage is thinner, so the real time is shorter.',
      'Snow, water and altitude add ultraviolet. None of that is in this table.',
      'Redness shows up about eight hours later — by then the exposure has already happened.',
    ],
    [
      'El tiempo es la dosis que enrojece dividida por la intensidad del índice. El doble de índice, la mitad de tiempo.',
      'Los tiempos con protector son de laboratorio. En la práctica se aplica menos, así que duran menos.',
      'Nieve, agua y altitud suman ultravioleta. Nada de eso está en esta tabla.',
      'El enrojecimiento aparece unas ocho horas después; para entonces la exposición ya ocurrió.',
    ],
    [
      'O tempo é a dose que avermelha dividida pela intensidade do índice. Índice em dobro, tempo pela metade.',
      'Os tempos com protetor são de laboratório. Na prática passa-se menos, então duram menos.',
      'Neve, água e altitude somam ultravioleta. Nada disso está nesta tabela.',
      'A vermelhidão aparece cerca de oito horas depois; a essa altura a exposição já aconteceu.',
    ],
    [
      '時間は最小紅斑量を指数の強さで割った値です。指数が2倍なら時間は半分です。',
      '日焼け止めの時間は実験室基準です。実際は塗る量が少ないぶん短くなります。',
      '雪・水・高所は紫外線を上乗せします。この表には入っていません。',
      '赤くなるのは8時間ほど後です。そのときにはもう浴びた後です。',
    ],
    [
      'Die Zeit ist die rötende Dosis geteilt durch die Stärke, für die der Index steht. Doppelter Index, halbe Zeit.',
      'Die Sonnencreme-Zeiten sind Laborwerte. Real trägt man dünner auf, also bleibt weniger Zeit.',
      'Schnee, Wasser und Höhe legen UV drauf. Nichts davon steckt in dieser Tabelle.',
      'Die Rötung zeigt sich erst nach etwa acht Stunden — da ist die Bestrahlung längst vorbei.',
    ],
    [
      'La durée est la dose érythémale divisée par l’intensité que représente l’indice. Indice doublé, durée divisée par deux.',
      'Les durées avec crème sont des valeurs de laboratoire. On en met moins en vrai, donc c’est plus court.',
      'Neige, eau et altitude ajoutent de l’ultraviolet. Rien de tout cela n’est dans ce tableau.',
      'La rougeur apparaît environ huit heures plus tard : l’exposition, elle, a déjà eu lieu.',
    ],
    [
      'समय यानी लाल करने वाली खुराक को सूचकांक की तीव्रता से भाग देना। सूचकांक दोगुना, समय आधा।',
      'सनस्क्रीन वाले समय प्रयोगशाला के हैं। असल में कम लगता है, इसलिए समय भी कम।',
      'बर्फ़, पानी और ऊँचाई पराबैंगनी बढ़ाते हैं। यह तालिका उन्हें नहीं गिनती।',
      'लालिमा लगभग आठ घंटे बाद दिखती है — तब तक धूप लग चुकी होती है।',
    ],
    [
      '时间就是最小红斑量除以该指数代表的强度。指数翻倍，时间减半。',
      '涂防晒的时间是实验室数值。实际涂得薄，所以时间更短。',
      '雪地、水面和高海拔会增加紫外线，本表没有计入。',
      '发红要八小时左右才显现，那时已经晒过了。',
    ],
    [
      '時間就是最小紅斑量除以該指數代表的強度。指數翻倍，時間減半。',
      '塗防曬的時間是實驗室數值。實際塗得薄，所以時間更短。',
      '雪地、水面和高海拔會增加紫外線，本表沒有計入。',
      '發紅要八小時左右才顯現，那時已經曬過了。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '자외선 지수와 화상 시간 — 피부 타입별로 몇 분인가',
    'UV index and burn time — minutes by skin type',
    'Índice UV y tiempo de quemadura — minutos según el tipo de piel',
    'Índice UV e tempo de queimadura — minutos por tipo de pele',
    '紫外線指数と日焼け時間 — 肌タイプ別に何分か',
    'UV-Index und Sonnenbrandzeit — Minuten nach Hauttyp',
    'Indice UV et temps avant brûlure — minutes selon le phototype',
    'यूवी सूचकांक और जलने का समय — त्वचा प्रकार से मिनट',
    '紫外线指数与晒伤时间 — 按肤质算多少分钟',
    '紫外線指數與曬傷時間 — 按膚質算多少分鐘',
  ),

  hubMetaDesc: T(
    '지수 8에서 II형 피부는 20.8분에 붉어집니다. 자외선 지수 21가지와 피부 타입 6가지가 만나는 126칸마다 화상 시간·차단제별 시간·필요한 차단 지수를 계산했습니다.',
    'At index 8, type II skin reddens in 20.8 minutes. For all 126 pairings of 21 UV values and 6 skin types: the burn time, the time with sunscreen, and the SPF two hours outside would take.',
    'Con índice 8, la piel tipo II enrojece en 20,8 minutos. Para los 126 cruces de 21 valores UV y 6 tipos de piel: el tiempo de quemadura, con protector y el FPS necesario para dos horas fuera.',
    'Com índice 8, a pele tipo II avermelha em 20,8 minutos. Para os 126 cruzamentos de 21 valores UV e 6 tipos de pele: o tempo de queimadura, com protetor e o FPS para duas horas ao ar livre.',
    '指数8ではII型の肌が20.8分で赤くなります。紫外線指数21通りと肌タイプ6通りが出会う126マスの日焼け時間・日焼け止め別の時間・必要なSPFを計算しました。',
    'Bei Index 8 rötet Hauttyp II nach 20,8 Minuten. Für alle 126 Kombinationen aus 21 UV-Werten und 6 Hauttypen: Brandzeit, Zeit mit Sonnencreme und der nötige LSF für zwei Stunden draußen.',
    'À l’indice 8, une peau de type II rougit en 20,8 minutes. Pour les 126 croisements de 21 valeurs UV et 6 phototypes : le temps avant brûlure, avec crème, et le FPS nécessaire pour deux heures dehors.',
    'सूचकांक 8 पर टाइप II त्वचा 20.8 मिनट में लाल हो जाती है। 21 यूवी मानों और 6 त्वचा प्रकारों के सभी 126 मेलों का जलने का समय, सनस्क्रीन के साथ समय और दो घंटे के लिए ज़रूरी SPF।',
    '指数 8 时，II 型皮肤 20.8 分钟就发红。21 种紫外线指数与 6 种肤质交汇的 126 格，每格的晒伤时间、涂防晒后的时间，以及在外两小时所需的 SPF。',
    '指數 8 時，II 型皮膚 20.8 分鐘就發紅。21 種紫外線指數與 6 種膚質交匯的 126 格，每格的曬傷時間、塗防曬後的時間，以及在外兩小時所需的 SPF。',
  ),

  desc: T<(f: UvFacts) => string>(
    f => `지수 ${f.cell.uv}는 ${f.irradiance}W/m²이고, 이 피부가 견디는 양은 ${f.med}J/m²입니다. 나누면 ${f.minutes}분입니다.`,
    f => `Index ${f.cell.uv} is ${f.irradiance} W/m², and this skin takes ${f.med} J/m² to redden. Divide, and you have ${f.minutes} minutes.`,
    f => `El índice ${f.cell.uv} son ${f.irradiance} W/m², y esta piel aguanta ${f.med} J/m². Al dividir salen ${f.minutes} minutos.`,
    f => `O índice ${f.cell.uv} são ${f.irradiance} W/m², e esta pele aguenta ${f.med} J/m². Dividindo dá ${f.minutes} minutos.`,
    f => `指数${f.cell.uv}は${f.irradiance}W/m²で、この肌が耐える量は${f.med}J/m²です。割ると${f.minutes}分になります。`,
    f => `Index ${f.cell.uv} sind ${f.irradiance} W/m², und diese Haut verträgt ${f.med} J/m². Geteilt ergibt das ${f.minutes} Minuten.`,
    f => `L’indice ${f.cell.uv} vaut ${f.irradiance} W/m², et cette peau encaisse ${f.med} J/m². La division donne ${f.minutes} minutes.`,
    f => `सूचकांक ${f.cell.uv} यानी ${f.irradiance} W/m², और यह त्वचा ${f.med} J/m² सहती है। भाग देने पर ${f.minutes} मिनट।`,
    f => `指数 ${f.cell.uv} 是 ${f.irradiance}W/m²，这种皮肤能承受 ${f.med}J/m²，相除得 ${f.minutes} 分钟。`,
    f => `指數 ${f.cell.uv} 是 ${f.irradiance}W/m²，這種皮膚能承受 ${f.med}J/m²，相除得 ${f.minutes} 分鐘。`,
  ),

  metaTitle: T<(f: UvFacts) => string>(
    f => `자외선 ${f.cell.uv}·${skinKo(f.cell.skin).split(' —')[0]} — ${f.minutes}분`,
    f => `UV ${f.cell.uv}, ${skinEn(f.cell.skin).split(' —')[0]} — ${f.minutes} min`,
    f => `UV ${f.cell.uv}, ${skinEs(f.cell.skin).split(' —')[0]} — ${f.minutes} min`,
    f => `UV ${f.cell.uv}, ${skinPt(f.cell.skin).split(' —')[0]} — ${f.minutes} min`,
    f => `紫外線 ${f.cell.uv}・${skinJa(f.cell.skin).split(' —')[0]} — ${f.minutes}分`,
    f => `UV ${f.cell.uv}, ${skinDe(f.cell.skin).split(' —')[0]} — ${f.minutes} min`,
    f => `UV ${f.cell.uv}, ${skinFr(f.cell.skin).split(' —')[0]} — ${f.minutes} min`,
    f => `UV ${f.cell.uv}, ${skinHi(f.cell.skin).split(' —')[0]} — ${f.minutes} मिनट`,
    f => `紫外线 ${f.cell.uv}·${skinZh(f.cell.skin).split(' —')[0]} — ${f.minutes} 分钟`,
    f => `紫外線 ${f.cell.uv}·${skinTw(f.cell.skin).split(' —')[0]} — ${f.minutes} 分鐘`,
  ),

  metaDesc: T<(f: UvFacts) => string>(
    f => `자외선 지수 ${f.cell.uv}에서 ${skinKo(f.cell.skin)} 피부는 ${f.minutes}분이면 붉어집니다. SPF 30을 바르면 ${f.shields[1].minutes}분이고, 두 시간을 버티려면 SPF ${f.needSpf}이 필요합니다.`,
    f => `At UV ${f.cell.uv}, ${skinEn(f.cell.skin)} reddens in ${f.minutes} minutes. SPF 30 stretches that to ${f.shields[1].minutes} minutes, and two hours outside would need SPF ${f.needSpf}.`,
    f => `Con UV ${f.cell.uv}, la piel ${skinEs(f.cell.skin)} enrojece en ${f.minutes} minutos. Con FPS 30 son ${f.shields[1].minutes} minutos, y para dos horas haría falta FPS ${f.needSpf}.`,
    f => `Com UV ${f.cell.uv}, a pele ${skinPt(f.cell.skin)} avermelha em ${f.minutes} minutos. Com FPS 30 são ${f.shields[1].minutes} minutos, e duas horas exigiriam FPS ${f.needSpf}.`,
    f => `紫外線指数${f.cell.uv}では${skinJa(f.cell.skin)}の肌が${f.minutes}分で赤くなります。SPF 30を塗ると${f.shields[1].minutes}分、2時間もたせるにはSPF ${f.needSpf}が要ります。`,
    f => `Bei UV ${f.cell.uv} rötet ${skinDe(f.cell.skin)} nach ${f.minutes} Minuten. Mit LSF 30 sind es ${f.shields[1].minutes} Minuten; zwei Stunden draußen bräuchten LSF ${f.needSpf}.`,
    f => `À UV ${f.cell.uv}, une peau de ${skinFr(f.cell.skin)} rougit en ${f.minutes} minutes. Avec un FPS 30, ${f.shields[1].minutes} minutes ; deux heures dehors demanderaient un FPS ${f.needSpf}.`,
    f => `UV ${f.cell.uv} पर ${skinHi(f.cell.skin)} त्वचा ${f.minutes} मिनट में लाल हो जाती है। SPF 30 से ${f.shields[1].minutes} मिनट, और दो घंटे के लिए SPF ${f.needSpf} चाहिए।`,
    f => `紫外线指数 ${f.cell.uv} 下，${skinZh(f.cell.skin)}的皮肤 ${f.minutes} 分钟就发红。涂 SPF 30 可延到 ${f.shields[1].minutes} 分钟，在外两小时需要 SPF ${f.needSpf}。`,
    f => `紫外線指數 ${f.cell.uv} 下，${skinTw(f.cell.skin)}的皮膚 ${f.minutes} 分鐘就發紅。塗 SPF 30 可延到 ${f.shields[1].minutes} 分鐘，在外兩小時需要 SPF ${f.needSpf}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '자외선 지수 8이면 얼마나 있어도 되나요?', a: '피부 타입에 따라 다릅니다. I형은 16.7분, II형은 20.8분, VI형은 83.3분입니다.' },
      { q: '자외선 지수는 무슨 뜻인가요?', a: '홍반에 유효한 자외선의 세기입니다. 지수 1이 0.025W/m²이고, 지수 8이면 0.2W/m²가 피부에 내립니다.' },
      { q: 'SPF 30이면 서른 배 오래 있어도 되나요?', a: '실험실 기준으로는 그렇습니다. 다만 그 값은 1제곱센티미터에 2mg을 고르게 발랐을 때이고, 보통은 절반도 안 발라서 실제로는 훨씬 짧습니다.' },
      { q: '흐린 날에도 타나요?', a: '탑니다. 구름은 자외선을 다 막지 못하고, 얇은 구름에서는 오히려 반사로 더해지기도 합니다.' },
      { q: '예보를 못 봤을 때 가늠하는 방법이 있나요?', a: '그림자를 보십시오. 그림자가 키보다 짧으면 대개 지수 6을 넘습니다.' },
    ],
    [
      { q: 'How long can I stay out at UV 8?', a: 'It depends on your skin: 16.7 minutes for type I, 20.8 for type II, 83.3 for type VI.' },
      { q: 'What does the UV index actually mean?', a: 'It is the strength of erythemally weighted ultraviolet. Index 1 is 0.025 W/m², so index 8 puts 0.2 W/m² on your skin.' },
      { q: 'Does SPF 30 really mean thirty times longer?', a: 'In the lab, yes. That figure assumes 2 mg per square centimetre applied evenly; most people use less than half, so real protection is much shorter.' },
      { q: 'Can I burn on a cloudy day?', a: 'Yes. Cloud does not block ultraviolet completely, and thin cloud can even scatter extra onto you.' },
      { q: 'Any way to judge it without a forecast?', a: 'Look at your shadow. If it is shorter than you are, the index is usually past 6.' },
    ],
    [
      { q: '¿Cuánto puedo estar al sol con UV 8?', a: 'Depende de la piel: 16,7 minutos el tipo I, 20,8 el tipo II y 83,3 el tipo VI.' },
      { q: '¿Qué significa el índice UV?', a: 'Es la intensidad del ultravioleta ponderado para el eritema. El índice 1 son 0,025 W/m², así que el 8 pone 0,2 W/m² sobre la piel.' },
      { q: '¿Un FPS 30 alarga de verdad treinta veces?', a: 'En laboratorio sí. Ese valor supone 2 mg por centímetro cuadrado aplicados de forma uniforme; la mayoría usa menos de la mitad, así que en la práctica dura mucho menos.' },
      { q: '¿Se quema uno en día nublado?', a: 'Sí. Las nubes no bloquean todo el ultravioleta, y las nubes finas pueden incluso dispersar algo más hacia ti.' },
      { q: '¿Se puede estimar sin pronóstico?', a: 'Mira tu sombra. Si es más corta que tú, el índice suele pasar de 6.' },
    ],
    [
      { q: 'Quanto posso ficar ao sol com UV 8?', a: 'Depende da pele: 16,7 minutos no tipo I, 20,8 no tipo II e 83,3 no tipo VI.' },
      { q: 'O que significa o índice UV?', a: 'É a intensidade do ultravioleta ponderado para eritema. Índice 1 são 0,025 W/m², então o 8 coloca 0,2 W/m² na pele.' },
      { q: 'FPS 30 alonga mesmo trinta vezes?', a: 'Em laboratório, sim. Esse valor supõe 2 mg por centímetro quadrado aplicados uniformemente; a maioria usa menos da metade, então na prática dura bem menos.' },
      { q: 'Dá para queimar em dia nublado?', a: 'Dá. A nuvem não bloqueia todo o ultravioleta, e nuvem fina pode até espalhar um pouco mais sobre você.' },
      { q: 'Dá para estimar sem previsão?', a: 'Olhe sua sombra. Se ela for mais curta que você, o índice costuma passar de 6.' },
    ],
    [
      { q: '紫外線指数8のときどれくらい外にいられますか？', a: '肌タイプによります。I型は16.7分、II型は20.8分、VI型は83.3分です。' },
      { q: '紫外線指数とは何ですか？', a: '紅斑に有効な紫外線の強さです。指数1が0.025W/m²で、指数8なら0.2W/m²が肌に降ります。' },
      { q: 'SPF 30なら30倍長くいられますか？', a: '実験室基準ではそうです。ただし1平方センチに2mgを均一に塗った場合の値で、実際は半分も塗らないためもっと短くなります。' },
      { q: '曇りの日でも焼けますか？', a: '焼けます。雲は紫外線を完全には遮らず、薄い雲では散乱で逆に増えることもあります。' },
      { q: '予報を見ていないとき見当をつける方法は？', a: '影を見てください。影が背より短ければ大抵指数6を超えています。' },
    ],
    [
      { q: 'Wie lange darf ich bei UV 8 draußen bleiben?', a: 'Je nach Haut: 16,7 Minuten bei Typ I, 20,8 bei Typ II, 83,3 bei Typ VI.' },
      { q: 'Was bedeutet der UV-Index?', a: 'Er ist die Stärke der erythemwirksamen UV-Strahlung. Index 1 sind 0,025 W/m², Index 8 bringt also 0,2 W/m² auf die Haut.' },
      { q: 'Hält LSF 30 wirklich dreißigmal länger?', a: 'Im Labor ja. Der Wert setzt 2 mg je Quadratzentimeter gleichmäßig voraus; die meisten nehmen weniger als die Hälfte, real bleibt also viel weniger Zeit.' },
      { q: 'Bekommt man auch bei Wolken einen Sonnenbrand?', a: 'Ja. Wolken halten UV nicht vollständig ab, dünne Bewölkung kann durch Streuung sogar mehr abbekommen lassen.' },
      { q: 'Lässt sich das ohne Vorhersage abschätzen?', a: 'Schauen Sie auf Ihren Schatten. Ist er kürzer als Sie, liegt der Index meist über 6.' },
    ],
    [
      { q: 'Combien de temps rester dehors à UV 8 ?', a: 'Cela dépend du phototype : 16,7 minutes pour le type I, 20,8 pour le type II, 83,3 pour le type VI.' },
      { q: 'Que signifie l’indice UV ?', a: 'C’est l’intensité de l’ultraviolet pondéré pour l’érythème. L’indice 1 vaut 0,025 W/m², donc l’indice 8 dépose 0,2 W/m² sur la peau.' },
      { q: 'Un FPS 30 tient-il vraiment trente fois plus ?', a: 'En laboratoire, oui. Le chiffre suppose 2 mg par centimètre carré étalés uniformément ; la plupart en mettent moins de la moitié, la protection réelle est donc bien plus courte.' },
      { q: 'Peut-on brûler par temps couvert ?', a: 'Oui. Les nuages n’arrêtent pas tout l’ultraviolet, et un voile fin peut même en diffuser davantage.' },
      { q: 'Comment juger sans bulletin ?', a: 'Regardez votre ombre. Si elle est plus courte que vous, l’indice dépasse en général 6.' },
    ],
    [
      { q: 'UV 8 पर कितनी देर बाहर रह सकते हैं?', a: 'त्वचा पर निर्भर है: टाइप I के लिए 16.7 मिनट, टाइप II के लिए 20.8 और टाइप VI के लिए 83.3।' },
      { q: 'यूवी सूचकांक का क्या अर्थ है?', a: 'यह एरिथेमा-भारित पराबैंगनी की तीव्रता है। सूचकांक 1 यानी 0.025 W/m², तो सूचकांक 8 त्वचा पर 0.2 W/m² डालता है।' },
      { q: 'क्या SPF 30 सचमुच तीस गुना समय देता है?', a: 'प्रयोगशाला में हाँ। वह मान प्रति वर्ग सेंटीमीटर 2 mg समान रूप से लगाने का है; ज़्यादातर लोग आधा भी नहीं लगाते, इसलिए असली सुरक्षा कहीं कम रहती है।' },
      { q: 'क्या बादल वाले दिन भी जल सकते हैं?', a: 'हाँ। बादल पराबैंगनी को पूरी तरह नहीं रोकते, और पतले बादल प्रकीर्णन से कुछ अधिक भी डाल सकते हैं।' },
      { q: 'पूर्वानुमान न हो तो कैसे अंदाज़ा लगाएँ?', a: 'अपनी परछाईं देखें। यदि वह आपसे छोटी है तो सूचकांक आम तौर पर 6 से ऊपर है।' },
    ],
    [
      { q: '紫外线指数 8 时能在外面待多久？', a: '看肤质：I 型 16.7 分钟，II 型 20.8 分钟，VI 型 83.3 分钟。' },
      { q: '紫外线指数是什么意思？', a: '它是红斑加权紫外线的强度。指数 1 是 0.025W/m²，所以指数 8 会有 0.2W/m² 落在皮肤上。' },
      { q: 'SPF 30 真能延长三十倍吗？', a: '实验室里是的。那个数值假设每平方厘米均匀涂 2mg，而多数人涂不到一半，实际保护要短得多。' },
      { q: '阴天也会晒伤吗？', a: '会。云挡不住全部紫外线，薄云散射时甚至会更多。' },
      { q: '没看预报怎么判断？', a: '看影子。影子比人短，指数通常已过 6。' },
    ],
    [
      { q: '紫外線指數 8 時能在外面待多久？', a: '看膚質：I 型 16.7 分鐘，II 型 20.8 分鐘，VI 型 83.3 分鐘。' },
      { q: '紫外線指數是什麼意思？', a: '它是紅斑加權紫外線的強度。指數 1 是 0.025W/m²，所以指數 8 會有 0.2W/m² 落在皮膚上。' },
      { q: 'SPF 30 真能延長三十倍嗎？', a: '實驗室裡是的。那個數值假設每平方公分均勻塗 2mg，而多數人塗不到一半，實際保護要短得多。' },
      { q: '陰天也會曬傷嗎？', a: '會。雲擋不住全部紫外線，薄雲散射時甚至會更多。' },
      { q: '沒看預報怎麼判斷？', a: '看影子。影子比人短，指數通常已過 6。' },
    ],
  ),

  cellFaq: T<(f: UvFacts) => FaqItem[]>(
    f => [
      { q: `자외선 지수 ${f.cell.uv}에서 얼마나 있어도 되나요?`, a: `${f.minutes}분이면 붉어지기 시작합니다. 여덟 시간쯤 뒤에 보이므로, 그때는 이미 쬔 뒤입니다.` },
      { q: `차단제를 바르면 얼마나 늘어나나요?`, a: `SPF 15는 ${f.shields[0].minutes}분, SPF 30은 ${f.shields[1].minutes}분, SPF 50은 ${f.shields[2].minutes}분입니다. 실험실 기준이라 실제로는 더 짧습니다.` },
      { q: `두 시간 밖에 있으려면 무엇을 발라야 하나요?`, a: `SPF ${f.needSpf} 이상이면 셈으로는 맞습니다. 두세 시간마다 덧바르는 편이 낫습니다.` },
      { q: `이 지수는 어느 정도인가요?`, a: `예보에서 말하는 구간으로는 ${f.band === 'low' ? '낮음' : f.band === 'moderate' ? '보통' : f.band === 'high' ? '높음' : f.band === 'veryHigh' ? '매우 높음' : '위험'}입니다.` },
    ],
    f => [
      { q: `How long can I stay out at UV ${f.cell.uv}?`, a: `About ${f.minutes} minutes before the skin starts to redden. It shows up some eight hours later, by which time the exposure is done.` },
      { q: `How much does sunscreen add?`, a: `SPF 15 gives ${f.shields[0].minutes} minutes, SPF 30 gives ${f.shields[1].minutes}, SPF 50 gives ${f.shields[2].minutes}. These are lab figures; real life is shorter.` },
      { q: `What should I wear for two hours outside?`, a: `SPF ${f.needSpf} or higher works on paper. Reapplying every couple of hours matters more.` },
      { q: `How strong is this index?`, a: `On the forecast scale it counts as ${f.band === 'veryHigh' ? 'very high' : f.band}.` },
    ],
    f => [
      { q: `¿Cuánto puedo estar al sol con UV ${f.cell.uv}?`, a: `Unos ${f.minutes} minutos antes de que la piel empiece a enrojecer. Se ve unas ocho horas después, cuando la exposición ya pasó.` },
      { q: `¿Cuánto suma el protector solar?`, a: `FPS 15 da ${f.shields[0].minutes} minutos, FPS 30 da ${f.shields[1].minutes} y FPS 50 da ${f.shields[2].minutes}. Son cifras de laboratorio; en la práctica es menos.` },
      { q: `¿Qué me pongo para dos horas fuera?`, a: `FPS ${f.needSpf} o más cuadra sobre el papel. Reaplicar cada dos horas importa más.` },
      { q: `¿Qué tan fuerte es este índice?`, a: `En la escala del pronóstico cuenta como ${f.band === 'low' ? 'bajo' : f.band === 'moderate' ? 'moderado' : f.band === 'high' ? 'alto' : f.band === 'veryHigh' ? 'muy alto' : 'extremo'}.` },
    ],
    f => [
      { q: `Quanto posso ficar ao sol com UV ${f.cell.uv}?`, a: `Cerca de ${f.minutes} minutos antes de a pele começar a avermelhar. Aparece umas oito horas depois, quando a exposição já passou.` },
      { q: `Quanto o protetor solar acrescenta?`, a: `FPS 15 dá ${f.shields[0].minutes} minutos, FPS 30 dá ${f.shields[1].minutes} e FPS 50 dá ${f.shields[2].minutes}. São números de laboratório; na prática é menos.` },
      { q: `O que usar para duas horas ao ar livre?`, a: `FPS ${f.needSpf} ou mais fecha a conta. Reaplicar a cada duas horas importa mais.` },
      { q: `Quão forte é este índice?`, a: `Na escala da previsão conta como ${f.band === 'low' ? 'baixo' : f.band === 'moderate' ? 'moderado' : f.band === 'high' ? 'alto' : f.band === 'veryHigh' ? 'muito alto' : 'extremo'}.` },
    ],
    f => [
      { q: `紫外線指数${f.cell.uv}ではどれくらい外にいられますか？`, a: `${f.minutes}分ほどで赤くなり始めます。8時間ほど後に見えるので、そのときにはもう浴びた後です。` },
      { q: `日焼け止めを塗るとどれだけ延びますか？`, a: `SPF 15で${f.shields[0].minutes}分、SPF 30で${f.shields[1].minutes}分、SPF 50で${f.shields[2].minutes}分です。実験室基準なので実際はもっと短くなります。` },
      { q: `2時間外にいるには何を塗ればよいですか？`, a: `計算の上ではSPF ${f.needSpf}以上です。2〜3時間ごとに塗り直すほうが効きます。` },
      { q: `この指数はどれくらい強いですか？`, a: `予報の区分では${f.band === 'low' ? '弱い' : f.band === 'moderate' ? '中程度' : f.band === 'high' ? '強い' : f.band === 'veryHigh' ? '非常に強い' : '極めて強い'}に当たります。` },
    ],
    f => [
      { q: `Wie lange darf ich bei UV ${f.cell.uv} draußen bleiben?`, a: `Etwa ${f.minutes} Minuten, bis die Haut zu röten beginnt. Sichtbar wird es rund acht Stunden später — die Bestrahlung ist dann längst vorbei.` },
      { q: `Wie viel bringt Sonnencreme?`, a: `LSF 15 ergibt ${f.shields[0].minutes} Minuten, LSF 30 ${f.shields[1].minutes}, LSF 50 ${f.shields[2].minutes}. Das sind Laborwerte, real ist es kürzer.` },
      { q: `Was nehme ich für zwei Stunden draußen?`, a: `Rechnerisch LSF ${f.needSpf} oder mehr. Wichtiger ist das Nachcremen alle zwei Stunden.` },
      { q: `Wie stark ist dieser Index?`, a: `Auf der Vorhersageskala gilt er als ${f.band === 'low' ? 'niedrig' : f.band === 'moderate' ? 'mäßig' : f.band === 'high' ? 'hoch' : f.band === 'veryHigh' ? 'sehr hoch' : 'extrem'}.` },
    ],
    f => [
      { q: `Combien de temps dehors à UV ${f.cell.uv} ?`, a: `Environ ${f.minutes} minutes avant que la peau ne rougisse. Cela se voit huit heures plus tard, quand l’exposition est déjà passée.` },
      { q: `Qu’apporte la crème solaire ?`, a: `FPS 15 donne ${f.shields[0].minutes} minutes, FPS 30 ${f.shields[1].minutes}, FPS 50 ${f.shields[2].minutes}. Ce sont des valeurs de laboratoire ; en vrai c’est moins.` },
      { q: `Que mettre pour deux heures dehors ?`, a: `Sur le papier, FPS ${f.needSpf} ou plus. Le vrai geste, c’est de remettre de la crème toutes les deux heures.` },
      { q: `Cet indice, c’est fort ?`, a: `Sur l’échelle du bulletin, il compte comme ${f.band === 'low' ? 'faible' : f.band === 'moderate' ? 'modéré' : f.band === 'high' ? 'élevé' : f.band === 'veryHigh' ? 'très élevé' : 'extrême'}.` },
    ],
    f => [
      { q: `UV ${f.cell.uv} पर कितनी देर बाहर रह सकते हैं?`, a: `लगभग ${f.minutes} मिनट, उसके बाद त्वचा लाल होने लगती है। यह आठ घंटे बाद दिखता है, तब तक धूप लग चुकी होती है।` },
      { q: `सनस्क्रीन से कितना बढ़ता है?`, a: `SPF 15 से ${f.shields[0].minutes} मिनट, SPF 30 से ${f.shields[1].minutes}, SPF 50 से ${f.shields[2].minutes}। ये प्रयोगशाला के आँकड़े हैं, असल में कम।` },
      { q: `दो घंटे बाहर रहने के लिए क्या लगाएँ?`, a: `हिसाब से SPF ${f.needSpf} या अधिक। हर दो घंटे में दोबारा लगाना ज़्यादा मायने रखता है।` },
      { q: `यह सूचकांक कितना तेज़ है?`, a: `पूर्वानुमान की श्रेणी में यह ${f.band === 'low' ? 'कम' : f.band === 'moderate' ? 'मध्यम' : f.band === 'high' ? 'उच्च' : f.band === 'veryHigh' ? 'बहुत उच्च' : 'चरम'} है।` },
    ],
    f => [
      { q: `紫外线指数 ${f.cell.uv} 时能在外面待多久？`, a: `约 ${f.minutes} 分钟后皮肤开始发红。发红要八小时左右才显现，那时已经晒过了。` },
      { q: `涂防晒能延长多少？`, a: `SPF 15 为 ${f.shields[0].minutes} 分钟，SPF 30 为 ${f.shields[1].minutes} 分钟，SPF 50 为 ${f.shields[2].minutes} 分钟。这是实验室数值，实际更短。` },
      { q: `要在外两小时该涂什么？`, a: `按计算是 SPF ${f.needSpf} 以上。更要紧的是每两三小时补涂。` },
      { q: `这个指数算强吗？`, a: `按预报等级属于${f.band === 'low' ? '低' : f.band === 'moderate' ? '中等' : f.band === 'high' ? '高' : f.band === 'veryHigh' ? '很高' : '极高'}。` },
    ],
    f => [
      { q: `紫外線指數 ${f.cell.uv} 時能在外面待多久？`, a: `約 ${f.minutes} 分鐘後皮膚開始發紅。發紅要八小時左右才顯現，那時已經曬過了。` },
      { q: `塗防曬能延長多少？`, a: `SPF 15 為 ${f.shields[0].minutes} 分鐘，SPF 30 為 ${f.shields[1].minutes} 分鐘，SPF 50 為 ${f.shields[2].minutes} 分鐘。這是實驗室數值，實際更短。` },
      { q: `要在外兩小時該塗什麼？`, a: `按計算是 SPF ${f.needSpf} 以上。更要緊的是每兩三小時補塗。` },
      { q: `這個指數算強嗎？`, a: `按預報等級屬於${f.band === 'low' ? '低' : f.band === 'moderate' ? '中等' : f.band === 'high' ? '高' : f.band === 'veryHigh' ? '很高' : '極高'}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const UV_UI: L<UvUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<UvUI>;
