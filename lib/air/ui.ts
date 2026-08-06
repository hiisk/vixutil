/**
 * 대기질 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "같은 숫자가 나라를 건너면 등급이 바뀐다"이다.
 * 미세먼지 150은 한국 예보에서 나쁨이지만 미국 지수로는 아직 보통이다.
 * 어느 쪽이 틀린 것이 아니라 자를 다르게 대는 것이라, 두 값을 나란히 둔다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { AirFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface AirUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  concentrationLabel: string;
  epaLabel: string;
  categoryLabel: string;
  koreaLabel: string;
  cigaretteLabel: string;
  hundredLabel: string;
  pollutantName: (key: string) => string;
  categoryName: (key: string) => string;
  koreaName: (key: string) => string;
  splitTag: string;
  agreeTag: string;
  indexTitle: string;
  indexNote: string;
  splitTitle: string;
  splitNote: string;
  cigaretteTitle: string;
  cigaretteNote: string;
  maskTitle: string;
  maskNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  levelRowTitle: string;
  desc: (f: AirFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: AirFacts) => string;
  metaDesc: (f: AirFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: AirFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 오염물질 이름은 제목과 질문에서도 같은 것을 쓴다 — SPEC 밖으로 꺼낸다 */
const airKo = pick({ pm25: '초미세먼지 PM2.5', pm10: '미세먼지 PM10', o3: '오존', no2: '이산화질소', co: '일산화탄소', so2: '아황산가스' });
const airEn = pick({ pm25: 'fine dust PM2.5', pm10: 'coarse dust PM10', o3: 'ozone', no2: 'nitrogen dioxide', co: 'carbon monoxide', so2: 'sulfur dioxide' });
const airEs = pick({ pm25: 'partículas PM2,5', pm10: 'partículas PM10', o3: 'ozono', no2: 'dióxido de nitrógeno', co: 'monóxido de carbono', so2: 'dióxido de azufre' });
const airPt = pick({ pm25: 'partículas PM2,5', pm10: 'partículas PM10', o3: 'ozônio', no2: 'dióxido de nitrogênio', co: 'monóxido de carbono', so2: 'dióxido de enxofre' });
const airJa = pick({ pm25: '微小粒子状物質 PM2.5', pm10: '粒子状物質 PM10', o3: 'オゾン', no2: '二酸化窒素', co: '一酸化炭素', so2: '二酸化硫黄' });
const airDe = pick({ pm25: 'Feinstaub PM2,5', pm10: 'Feinstaub PM10', o3: 'Ozon', no2: 'Stickstoffdioxid', co: 'Kohlenmonoxid', so2: 'Schwefeldioxid' });
const airFr = pick({ pm25: 'particules PM2,5', pm10: 'particules PM10', o3: 'ozone', no2: 'dioxyde d’azote', co: 'monoxyde de carbone', so2: 'dioxyde de soufre' });
const airHi = pick({ pm25: 'सूक्ष्म कण PM2.5', pm10: 'कण PM10', o3: 'ओज़ोन', no2: 'नाइट्रोजन डाइऑक्साइड', co: 'कार्बन मोनोऑक्साइड', so2: 'सल्फर डाइऑक्साइड' });
const airZh = pick({ pm25: '细颗粒物 PM2.5', pm10: '可吸入颗粒物 PM10', o3: '臭氧', no2: '二氧化氮', co: '一氧化碳', so2: '二氧化硫' });
const airTw = pick({ pm25: '細懸浮微粒 PM2.5', pm10: '懸浮微粒 PM10', o3: '臭氧', no2: '二氧化氮', co: '一氧化碳', so2: '二氧化硫' });

type Spec = { [K in keyof AirUI]: L<AirUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('대기질', 'Air quality', 'Calidad del aire', 'Qualidade do ar', '大気質', 'Luftqualität', 'Qualité de l’air', 'वायु गुणवत्ता', '空气质量', '空氣品質'),

  pollutantName: T<(key: string) => string>(airKo, airEn, airEs, airPt, airJa, airDe, airFr, airHi, airZh, airTw),

  categoryName: T<(key: string) => string>(
    pick({ good: '좋음', moderate: '보통', sensitive: '민감군 주의', unhealthy: '나쁨', veryUnhealthy: '매우 나쁨', hazardous: '위험' }),
    pick({ good: 'good', moderate: 'moderate', sensitive: 'unhealthy for sensitive groups', unhealthy: 'unhealthy', veryUnhealthy: 'very unhealthy', hazardous: 'hazardous' }),
    pick({ good: 'buena', moderate: 'moderada', sensitive: 'dañina para grupos sensibles', unhealthy: 'dañina', veryUnhealthy: 'muy dañina', hazardous: 'peligrosa' }),
    pick({ good: 'boa', moderate: 'moderada', sensitive: 'prejudicial a grupos sensíveis', unhealthy: 'prejudicial', veryUnhealthy: 'muito prejudicial', hazardous: 'perigosa' }),
    pick({ good: '良い', moderate: '普通', sensitive: '敏感な人に悪い', unhealthy: '悪い', veryUnhealthy: '非常に悪い', hazardous: '危険' }),
    pick({ good: 'gut', moderate: 'mäßig', sensitive: 'schlecht für empfindliche Gruppen', unhealthy: 'ungesund', veryUnhealthy: 'sehr ungesund', hazardous: 'gefährlich' }),
    pick({ good: 'bonne', moderate: 'modérée', sensitive: 'mauvaise pour les personnes sensibles', unhealthy: 'mauvaise', veryUnhealthy: 'très mauvaise', hazardous: 'dangereuse' }),
    pick({ good: 'अच्छी', moderate: 'मध्यम', sensitive: 'संवेदनशील लोगों के लिए हानिकारक', unhealthy: 'ख़राब', veryUnhealthy: 'बहुत ख़राब', hazardous: 'ख़तरनाक' }),
    pick({ good: '优', moderate: '良', sensitive: '对敏感人群不健康', unhealthy: '不健康', veryUnhealthy: '很不健康', hazardous: '危险' }),
    pick({ good: '優', moderate: '良', sensitive: '對敏感族群不健康', unhealthy: '不健康', veryUnhealthy: '很不健康', hazardous: '危險' }),
  ),

  koreaName: T<(key: string) => string>(
    pick({ good: '좋음', normal: '보통', bad: '나쁨', veryBad: '매우 나쁨' }),
    pick({ good: 'good', normal: 'moderate', bad: 'bad', veryBad: 'very bad' }),
    pick({ good: 'buena', normal: 'normal', bad: 'mala', veryBad: 'muy mala' }),
    pick({ good: 'boa', normal: 'normal', bad: 'ruim', veryBad: 'muito ruim' }),
    pick({ good: '良い', normal: '普通', bad: '悪い', veryBad: '非常に悪い' }),
    pick({ good: 'gut', normal: 'normal', bad: 'schlecht', veryBad: 'sehr schlecht' }),
    pick({ good: 'bonne', normal: 'normale', bad: 'mauvaise', veryBad: 'très mauvaise' }),
    pick({ good: 'अच्छी', normal: 'सामान्य', bad: 'ख़राब', veryBad: 'बहुत ख़राब' }),
    pick({ good: '好', normal: '一般', bad: '差', veryBad: '很差' }),
    pick({ good: '好', normal: '一般', bad: '差', veryBad: '很差' }),
  ),

  splitTag: T('두 나라의 판정이 갈립니다', 'The two systems disagree here', 'Los dos sistemas discrepan aquí', 'Os dois sistemas discordam aqui', 'ここは両者の判定が割れます', 'Hier sind sich beide Systeme uneins', 'Les deux systèmes divergent ici', 'यहाँ दोनों प्रणालियाँ अलग कहती हैं', '两套标准在这里判定不同', '兩套標準在這裡判定不同'),
  agreeTag: T('두 나라의 판정이 같습니다', 'Both systems agree here', 'Ambos sistemas coinciden', 'Ambos os sistemas concordam', 'ここは両者の判定が一致します', 'Beide Systeme stimmen überein', 'Les deux systèmes s’accordent', 'दोनों प्रणालियाँ सहमत हैं', '两套标准判定一致', '兩套標準判定一致'),

  hubTitle: T(
    '대기질 108칸 — 미세먼지 150은 나쁨인데 AQI로는 98',
    '108 air-quality readings — PM10 of 150 is "bad" in Korea but AQI 98',
    '108 lecturas de calidad del aire — PM10 de 150 es «mala» en Corea pero AQI 98',
    '108 leituras de qualidade do ar — PM10 de 150 é "ruim" na Coreia mas AQI 98',
    '大気質108マス — PM10の150は「悪い」なのにAQIでは98',
    '108 Luftwerte — PM10 von 150 gilt in Korea als schlecht, ist aber AQI 98',
    '108 relevés de qualité de l’air — un PM10 de 150 est « mauvais » en Corée mais AQI 98',
    '108 वायु गुणवत्ता मान — PM10 150 कोरिया में "ख़राब" पर AQI 98',
    '108 个空气质量数值 — PM10 150 在韩国是"差"，AQI 却只有 98',
    '108 個空氣品質數值 — PM10 150 在韓國是「差」，AQI 卻只有 98',
  ),

  hubLead: T(
    '오염물질 6가지와 농도 18가지가 만나는 칸마다 미국 지수와 한국 등급을 나란히 계산했습니다. 같은 숫자를 두고 두 나라가 다르게 말하는 자리가 어디인지 보입니다.',
    'For every meeting of 6 pollutants and 18 concentrations: the US index and the Korean grade, side by side. You can see exactly where the same number gets two different verdicts.',
    'Para cada cruce de 6 contaminantes y 18 concentraciones: el índice estadounidense y el grado coreano, uno al lado del otro. Se ve justo dónde el mismo número recibe dos veredictos.',
    'Para cada cruzamento de 6 poluentes e 18 concentrações: o índice dos EUA e o grau coreano, lado a lado. Dá para ver onde o mesmo número recebe dois veredictos.',
    '汚染物質6種と濃度18通りが出会う各マスで、米国の指数と韓国の等級を並べて計算しました。同じ数字に二つの判定が付く場所がそのまま見えます。',
    'Für jede Begegnung von 6 Schadstoffen und 18 Konzentrationen: der US-Index und die koreanische Stufe nebeneinander. Man sieht genau, wo dieselbe Zahl zwei Urteile bekommt.',
    'Pour chaque croisement de 6 polluants et 18 concentrations : l’indice américain et le grade coréen, côte à côte. On voit exactement où le même chiffre reçoit deux verdicts.',
    '6 प्रदूषकों और 18 सांद्रताओं के हर मेल के लिए अमेरिकी सूचकांक और कोरियाई ग्रेड, साथ-साथ। वही संख्या कहाँ दो अलग फ़ैसले पाती है, यह साफ़ दिखता है।',
    '6 种污染物与 18 种浓度交汇的每一格，都并排算出美国指数和韩国等级。同一个数字在哪里会得到两种判定，一目了然。',
    '6 種污染物與 18 種濃度交匯的每一格，都並排算出美國指數和韓國等級。同一個數字在哪裡會得到兩種判定，一目了然。',
  ),

  concentrationLabel: T('농도', 'Concentration', 'Concentración', 'Concentração', '濃度', 'Konzentration', 'Concentration', 'सांद्रता', '浓度', '濃度'),
  epaLabel: T('미국 지수(AQI)', 'US index (AQI)', 'Índice de EE. UU. (AQI)', 'Índice dos EUA (AQI)', '米国指数(AQI)', 'US-Index (AQI)', 'Indice américain (AQI)', 'अमेरिकी सूचकांक (AQI)', '美国指数（AQI）', '美國指數（AQI）'),
  categoryLabel: T('미국 등급', 'US category', 'Categoría de EE. UU.', 'Categoria dos EUA', '米国の区分', 'US-Kategorie', 'Catégorie américaine', 'अमेरिकी श्रेणी', '美国等级', '美國等級'),
  koreaLabel: T('한국 등급', 'Korean grade', 'Grado coreano', 'Grau coreano', '韓国の等級', 'Koreanische Stufe', 'Grade coréen', 'कोरियाई ग्रेड', '韩国等级', '韓國等級'),
  cigaretteLabel: T('하루 마시면 담배로', 'A day of this in cigarettes', 'Un día de esto en cigarrillos', 'Um dia disso em cigarros', '1日吸うとたばこで', 'Ein Tag davon in Zigaretten', 'Une journée en cigarettes', 'दिन भर में सिगरेट', '吸一天相当于香烟', '吸一天相當於香菸'),
  hundredLabel: T('지수 100이 되는 농도', 'Concentration that makes 100', 'Concentración que da 100', 'Concentração que dá 100', '指数100になる濃度', 'Konzentration für Index 100', 'Concentration donnant 100', '100 बनाने वाली सांद्रता', '指数 100 对应的浓度', '指數 100 對應的濃度'),

  indexTitle: T('지수는 직선 하나로 잇습니다', 'The index is one straight line', 'El índice es una recta', 'O índice é uma reta', '指数は直線ひとつでつなぎます', 'Der Index ist eine Gerade', 'L’indice est une droite', 'सूचकांक एक सीधी रेखा है', '指数是一条直线', '指數是一條直線'),

  indexNote: T(
    '미국 지수는 농도 구간 하나를 지수 구간 하나에 맞춰 놓고 그 사이를 직선으로 잇습니다. 초미세먼지 35.4µg/m³가 딱 100, 9µg/m³가 딱 50입니다. 표만 있으면 어떤 농도든 지수가 나오고, 거꾸로 지수에서 농도도 나옵니다.',
    'The US index pins one concentration range to one index range and draws a straight line between them. PM2.5 at 35.4 µg/m³ is exactly 100; 9 µg/m³ is exactly 50. With the table you can turn any concentration into an index — and any index back into a concentration.',
    'El índice estadounidense fija un tramo de concentración a un tramo de índice y traza una recta entre ellos. PM2,5 en 35,4 µg/m³ da exactamente 100; 9 µg/m³ da 50. Con la tabla, cualquier concentración se convierte en índice y al revés.',
    'O índice dos EUA prende uma faixa de concentração a uma faixa de índice e traça uma reta entre elas. PM2,5 em 35,4 µg/m³ dá exatamente 100; 9 µg/m³ dá 50. Com a tabela, qualquer concentração vira índice e vice-versa.',
    '米国の指数は濃度の区間ひとつを指数の区間ひとつに合わせ、その間を直線でつなぎます。PM2.5の35.4µg/m³がちょうど100、9µg/m³がちょうど50です。表さえあればどの濃度でも指数が出て、逆に指数から濃度も出ます。',
    'Der US-Index koppelt einen Konzentrationsbereich an einen Indexbereich und zieht dazwischen eine Gerade. PM2,5 bei 35,4 µg/m³ ergibt genau 100, 9 µg/m³ genau 50. Mit der Tabelle wird jede Konzentration zum Index — und jeder Index zurück zur Konzentration.',
    'L’indice américain fixe une plage de concentration à une plage d’indice et trace une droite entre les deux. Un PM2,5 de 35,4 µg/m³ vaut exactement 100 ; 9 µg/m³ vaut 50. Avec le tableau, toute concentration devient un indice — et tout indice redevient une concentration.',
    'अमेरिकी सूचकांक एक सांद्रता परास को एक सूचकांक परास से बाँधकर बीच में सीधी रेखा खींचता है। PM2.5 का 35.4 µg/m³ ठीक 100 है और 9 µg/m³ ठीक 50। तालिका हो तो कोई भी सांद्रता सूचकांक बन जाती है, और सूचकांक वापस सांद्रता।',
    '美国指数把一段浓度区间对应到一段指数区间，中间用直线相连。PM2.5 的 35.4µg/m³ 正好是 100，9µg/m³ 正好是 50。有了这张表，任何浓度都能换成指数，指数也能换回浓度。',
    '美國指數把一段濃度區間對應到一段指數區間，中間用直線相連。PM2.5 的 35.4µg/m³ 正好是 100，9µg/m³ 正好是 50。有了這張表，任何濃度都能換成指數，指數也能換回濃度。',
  ),

  splitTitle: T('같은 숫자, 다른 판정', 'Same number, different verdict', 'El mismo número, otro veredicto', 'O mesmo número, outro veredicto', '同じ数字、違う判定', 'Gleiche Zahl, anderes Urteil', 'Même chiffre, verdict différent', 'वही संख्या, अलग फ़ैसला', '同一个数字，不同判定', '同一個數字，不同判定'),

  splitNote: T(
    '한국 예보는 미세먼지 150을 나쁨이라 말하지만, 같은 값을 미국 지수로 옮기면 98이라 아직 보통입니다. 반대로 초미세먼지 40은 한국에서 이제 막 나쁨인데 미국 지수로는 112로 이미 민감군 주의 구간입니다. 어느 쪽이 틀린 것이 아니라 자를 다르게 댄 것이라, 여행이나 이사로 나라를 옮기면 같은 공기가 다르게 읽힙니다.',
    'A Korean forecast calls PM10 of 150 "bad", but the same value in the US index is 98 — still moderate. The other way round, PM2.5 of 40 has only just crossed into "bad" in Korea while the US index already reads 112, unhealthy for sensitive groups. Neither is wrong; they hold different rulers. Move country and the same air reads differently.',
    'Un pronóstico coreano llama «mala» a un PM10 de 150, pero ese mismo valor en el índice estadounidense es 98, aún moderado. Al revés, un PM2,5 de 40 acaba de entrar en «mala» en Corea mientras el índice de EE. UU. ya marca 112. Ninguno se equivoca: usan reglas distintas. Cambia de país y el mismo aire se lee de otro modo.',
    'Uma previsão coreana chama PM10 de 150 de "ruim", mas esse mesmo valor no índice dos EUA é 98 — ainda moderado. Ao contrário, PM2,5 de 40 acabou de entrar em "ruim" na Coreia enquanto o índice americano já marca 112. Nenhum está errado: usam réguas diferentes. Mude de país e o mesmo ar se lê de outro jeito.',
    '韓国の予報はPM10の150を「悪い」と言いますが、同じ値を米国の指数に移すと98でまだ普通です。逆にPM2.5の40は韓国でようやく悪いに入ったところなのに、米国の指数では112で既に敏感な人に悪い区間です。どちらが間違いなのではなく、当てる物差しが違うのです。国を移れば同じ空気が違って読まれます。',
    'Eine koreanische Vorhersage nennt PM10 von 150 „schlecht“, im US-Index sind es aber 98 — noch mäßig. Umgekehrt ist PM2,5 von 40 in Korea gerade erst schlecht, während der US-Index schon 112 zeigt. Keiner irrt sich; sie legen verschiedene Maßstäbe an. Beim Umzug liest sich dieselbe Luft anders.',
    'Un bulletin coréen qualifie un PM10 de 150 de « mauvais », mais la même valeur donne 98 dans l’indice américain — encore modéré. À l’inverse, un PM2,5 de 40 vient tout juste de passer en « mauvais » en Corée alors que l’indice américain affiche déjà 112. Aucun n’a tort : les règles diffèrent. Changez de pays et le même air se lit autrement.',
    'कोरियाई पूर्वानुमान PM10 150 को "ख़राब" कहता है, पर वही मान अमेरिकी सूचकांक में 98 यानी अब भी मध्यम है। उल्टा, PM2.5 40 कोरिया में अभी-अभी ख़राब हुआ है जबकि अमेरिकी सूचकांक 112 दिखा रहा है। कोई ग़लत नहीं — पैमाने अलग हैं। देश बदलिए, वही हवा अलग पढ़ी जाएगी।',
    '韩国预报把 PM10 150 称为"差"，但同一个值换成美国指数是 98，仍属"良"。反过来，PM2.5 40 在韩国刚刚进入"差"，美国指数却已是 112，属于对敏感人群不健康。谁都没错，只是尺子不同。换个国家，同样的空气读法就变了。',
    '韓國預報把 PM10 150 稱為「差」，但同一個值換成美國指數是 98，仍屬「良」。反過來，PM2.5 40 在韓國剛剛進入「差」，美國指數卻已是 112，屬於對敏感族群不健康。誰都沒錯，只是尺不同。換個國家，同樣的空氣讀法就變了。',
  ),

  cigaretteTitle: T('담배 개비로 옮겨 봅니다', 'Put in cigarettes', 'Traducido a cigarrillos', 'Traduzido em cigarros', 'たばこの本数に直すと', 'In Zigaretten umgerechnet', 'Traduit en cigarettes', 'सिगरेट में बदलकर', '换算成香烟', '換算成香菸'),

  cigaretteNote: T(
    '초미세먼지 22µg/m³의 공기를 하루 마시는 것이 담배 한 개비에 해당한다는 어림이 있습니다. 버클리 어스가 내놓은 값이고, 숫자만으로는 와닿지 않는 농도를 몸으로 옮겨 줍니다 — 75µg/m³인 날 하루를 밖에서 보내면 세 개비를 피운 셈입니다.',
    'Breathing air at 22 µg/m³ of PM2.5 for a day is reckoned to be about one cigarette. The figure comes from Berkeley Earth, and it turns an abstract number into something the body understands: a day outdoors at 75 µg/m³ works out to three cigarettes.',
    'Respirar aire con 22 µg/m³ de PM2,5 durante un día equivale más o menos a un cigarrillo. La cifra es de Berkeley Earth y convierte un número abstracto en algo que el cuerpo entiende: un día fuera con 75 µg/m³ sale a tres cigarrillos.',
    'Respirar ar com 22 µg/m³ de PM2,5 por um dia equivale a cerca de um cigarro. O número vem do Berkeley Earth e transforma um valor abstrato em algo que o corpo entende: um dia fora a 75 µg/m³ dá três cigarros.',
    'PM2.5が22µg/m³の空気を1日吸うのがたばこ1本に当たる、という目安があります。バークレー・アースが出した値で、数字だけでは実感しにくい濃度を体の感覚に移してくれます — 75µg/m³の日を外で過ごせば3本吸ったのと同じです。',
    'Ein Tag Luft mit 22 µg/m³ PM2,5 entspricht überschlägig einer Zigarette. Die Zahl stammt von Berkeley Earth und übersetzt eine abstrakte Größe in etwas Körperliches: ein Tag draußen bei 75 µg/m³ sind drei Zigaretten.',
    'Respirer une journée un air à 22 µg/m³ de PM2,5 équivaut à peu près à une cigarette. Le chiffre vient de Berkeley Earth et rend concret un nombre abstrait : une journée dehors à 75 µg/m³ revient à trois cigarettes.',
    'एक दिन 22 µg/m³ PM2.5 वाली हवा में साँस लेना लगभग एक सिगरेट के बराबर माना जाता है। यह आँकड़ा बर्कले अर्थ का है और अमूर्त संख्या को शरीर की भाषा में बदल देता है — 75 µg/m³ वाले दिन बाहर रहना तीन सिगरेट के बराबर है।',
    '有一个估算：一天呼吸 PM2.5 为 22µg/m³ 的空气，大约相当于抽一支烟。这个数字来自伯克利地球，把抽象的浓度换成身体能懂的说法——在 75µg/m³ 的日子里待一天，相当于抽了三支。',
    '有一個估算：一天呼吸 PM2.5 為 22µg/m³ 的空氣，大約相當於抽一支菸。這個數字來自柏克萊地球，把抽象的濃度換成身體能懂的說法——在 75µg/m³ 的日子裡待一天，相當於抽了三支。',
  ),

  maskTitle: T('마스크는 숫자보다 밀착입니다', 'A mask is about fit, not the number', 'La mascarilla es cuestión de ajuste', 'A máscara é questão de vedação', 'マスクは数字より密着です', 'Bei der Maske zählt der Sitz', 'Le masque, c’est l’étanchéité avant le chiffre', 'मास्क में संख्या से ज़्यादा फ़िट मायने रखता है', '口罩重要的是贴合而非数字', '口罩重要的是貼合而非數字'),

  maskNote: T(
    'KF94와 N95는 걸러 내는 성능이 비슷하고, 실제로 갈리는 것은 얼굴에 얼마나 붙느냐입니다. 옆이 뜨면 숨이 그리로 새서 등급이 소용없습니다. 초미세먼지가 나쁨 구간에 들면 쓰되, 오래 걸을 일이 있으면 숨쉬기 편한 쪽을 고르는 편이 낫습니다.',
    'KF94 and N95 filter to a similar standard; what actually differs is how well the mask seals to your face. If it gapes at the sides, air takes the shortcut and the rating stops mattering. Wear one once fine dust is in the bad range, but for a long walk pick the one you can actually breathe through.',
    'KF94 y N95 filtran de forma parecida; lo que de verdad cambia es cuánto sella en la cara. Si queda hueco a los lados, el aire toma el atajo y la clasificación deja de importar. Úsala cuando las partículas entren en el rango malo, pero para caminar mucho elige la que te deje respirar.',
    'KF94 e N95 filtram de modo parecido; o que muda mesmo é a vedação no rosto. Se sobra folga nas laterais, o ar pega o atalho e a classificação deixa de importar. Use quando as partículas entrarem na faixa ruim, mas para caminhar muito escolha a que dá para respirar.',
    'KF94とN95は濾過性能が近く、実際に効きを分けるのは顔にどれだけ密着するかです。横が浮けば息はそこから抜け、等級は意味を失います。微小粒子が悪い区間に入ったら着け、長く歩くなら息のしやすいほうを選ぶのが現実的です。',
    'KF94 und N95 filtern ähnlich; entscheidend ist, wie dicht die Maske am Gesicht sitzt. Steht sie seitlich ab, nimmt die Luft die Abkürzung und die Klasse ist egal. Aufsetzen, sobald der Feinstaub im schlechten Bereich liegt — für lange Wege aber die wählen, durch die man atmen kann.',
    'Le KF94 et le N95 filtrent de façon comparable ; ce qui change vraiment, c’est l’étanchéité sur le visage. Si ça bâille sur les côtés, l’air passe par là et la classe ne sert plus à rien. À porter dès que les particules atteignent la plage mauvaise, mais pour une longue marche, prenez celui dans lequel vous respirez.',
    'KF94 और N95 की छनाई लगभग बराबर है; असली फ़र्क़ यह है कि मास्क चेहरे पर कितना चिपकता है। किनारे खुले रहें तो साँस वहीं से निकलती है और रेटिंग बेकार हो जाती है। कण ख़राब श्रेणी में आएँ तो पहनें, पर लंबी सैर के लिए वही चुनें जिसमें साँस ले सकें।',
    'KF94 和 N95 的过滤能力接近，真正拉开差距的是与脸的贴合。两侧漏气，呼吸就走捷径，等级也就没意义了。细颗粒物进入"差"的区间就戴，但要走很久时，选一个能顺畅呼吸的更实际。',
    'KF94 和 N95 的過濾能力接近，真正拉開差距的是與臉的貼合。兩側漏氣，呼吸就走捷徑，等級也就沒意義了。細懸浮微粒進入「差」的區間就戴，但要走很久時，選一個能順暢呼吸的更實際。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '지수는 대개 하루 평균이나 여덟 시간 평균으로 냅니다. 지금 이 순간의 값과는 다르고, 같은 도시 안에서도 큰길가와 골목이 다릅니다. 기준표는 나라마다 고쳐지므로 여기 값도 그때의 표를 따릅니다.',
    'These indexes are usually built on daily or eight-hour averages, so they differ from whatever the sensor says this minute — and a main road differs from the alley behind it. Countries revise their tables from time to time; these figures follow the tables as they stand.',
    'Los índices suelen calcularse sobre promedios diarios o de ocho horas, así que difieren de lo que marca el sensor ahora mismo, y una avenida no es igual que el callejón de detrás. Los países revisan sus tablas; estas cifras siguen las vigentes.',
    'Os índices costumam ser calculados sobre médias diárias ou de oito horas, então diferem do que o sensor marca agora — e uma avenida difere do beco atrás dela. Os países revisam suas tabelas; estes números seguem as atuais.',
    '指数はたいてい1日平均や8時間平均で出します。今この瞬間の値とは違い、同じ街でも大通りと路地では違います。基準表は国ごとに改定されるので、ここの値もその時点の表に従います。',
    'Die Indizes beruhen meist auf Tages- oder Achtstundenmitteln und weichen daher vom Messwert dieser Minute ab — und eine Hauptstraße unterscheidet sich von der Gasse dahinter. Länder überarbeiten ihre Tabellen; diese Werte folgen dem aktuellen Stand.',
    'Ces indices reposent en général sur des moyennes journalières ou sur huit heures : ils diffèrent de ce qu’affiche le capteur à l’instant, et un boulevard n’est pas la ruelle derrière. Les pays révisent leurs tables ; ces chiffres suivent celles en vigueur.',
    'ये सूचकांक आम तौर पर दैनिक या आठ-घंटे के औसत पर बनते हैं, इसलिए इस पल के सेंसर मान से अलग होते हैं — और मुख्य सड़क पीछे की गली से अलग होती है। देश अपनी तालिकाएँ बदलते रहते हैं; ये मान मौजूदा तालिका के अनुसार हैं।',
    '这些指数通常按日均或八小时均值计算，与此刻传感器读数不同；同一座城市里，大马路和背后的巷子也不一样。各国会修订标准表，这里的数值依据的是现行表。',
    '這些指數通常按日均或八小時均值計算，與此刻感測器讀數不同；同一座城市裡，大馬路和背後的巷子也不一樣。各國會修訂標準表，這裡的數值依據的是現行表。',
  ),

  tableTitle: T('오염물질과 농도로 찾기', 'Find it by pollutant and concentration', 'Búscalo por contaminante y concentración', 'Ache por poluente e concentração', '汚染物質と濃度から探す', 'Nach Schadstoff und Konzentration suchen', 'Chercher par polluant et concentration', 'प्रदूषक और सांद्रता से देखें', '按污染物和浓度查找', '按污染物和濃度查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  levelRowTitle: T('같은 오염물질, 다른 농도', 'Same pollutant, other concentrations', 'Mismo contaminante, otras concentraciones', 'Mesmo poluente, outras concentrações', '同じ汚染物質、別の濃度', 'Gleicher Schadstoff, andere Konzentrationen', 'Même polluant, autres concentrations', 'वही प्रदूषक, दूसरी सांद्रताएँ', '同一污染物，不同浓度', '同一污染物，不同濃度'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '왼쪽은 미국 지수, 오른쪽은 한국 등급입니다. 같은 농도를 두 자로 잰 값입니다.',
      '지수 50·100·150은 구간의 경계입니다. 그 자리에서 등급 이름이 바뀝니다.',
      '예보의 등급은 대개 하루 평균입니다. 지금 이 순간의 값과는 다릅니다.',
      '담배 환산은 초미세먼지에만 붙였습니다. 하루치를 기준으로 한 어림입니다.',
    ],
    [
      'On the left is the US index, on the right the Korean grade — the same concentration measured with two rulers.',
      'Index values of 50, 100 and 150 are the boundaries; that is where the category name changes.',
      'Forecast grades are usually daily averages, not the reading at this moment.',
      'The cigarette figure is only for PM2.5 and assumes a full day of exposure.',
    ],
    [
      'A la izquierda el índice de EE. UU., a la derecha el grado coreano: la misma concentración con dos reglas.',
      'Los valores 50, 100 y 150 son fronteras; ahí cambia el nombre de la categoría.',
      'Los grados del pronóstico suelen ser promedios diarios, no la lectura de este instante.',
      'La cifra de cigarrillos solo se aplica al PM2,5 y supone un día entero de exposición.',
    ],
    [
      'À esquerda o índice dos EUA, à direita o grau coreano: a mesma concentração com duas réguas.',
      'Os valores 50, 100 e 150 são fronteiras; é ali que o nome da categoria muda.',
      'Os graus da previsão costumam ser médias diárias, não a leitura deste instante.',
      'O número de cigarros vale só para PM2,5 e supõe um dia inteiro de exposição.',
    ],
    [
      '左が米国の指数、右が韓国の等級です。同じ濃度を二つの物差しで測った値です。',
      '指数の50・100・150は区間の境目です。そこで区分の名前が変わります。',
      '予報の等級はたいてい1日平均で、今この瞬間の値とは違います。',
      'たばこ換算はPM2.5にだけ付けました。1日分を前提にした目安です。',
    ],
    [
      'Links der US-Index, rechts die koreanische Stufe — dieselbe Konzentration mit zwei Maßstäben.',
      'Die Werte 50, 100 und 150 sind Grenzen; dort wechselt der Name der Kategorie.',
      'Vorhersagestufen sind meist Tagesmittel, nicht der Messwert dieses Augenblicks.',
      'Die Zigarettenzahl gilt nur für PM2,5 und setzt einen ganzen Tag voraus.',
    ],
    [
      'À gauche l’indice américain, à droite le grade coréen : la même concentration, deux règles.',
      'Les valeurs 50, 100 et 150 sont des frontières ; c’est là que le nom de la catégorie change.',
      'Les grades des bulletins sont en général des moyennes journalières, pas la mesure de l’instant.',
      'Le chiffre en cigarettes ne vaut que pour le PM2,5 et suppose une journée entière.',
    ],
    [
      'बाईं ओर अमेरिकी सूचकांक, दाईं ओर कोरियाई ग्रेड — वही सांद्रता, दो पैमाने।',
      '50, 100 और 150 सीमाएँ हैं; वहीं श्रेणी का नाम बदलता है।',
      'पूर्वानुमान के ग्रेड आम तौर पर दैनिक औसत होते हैं, इस पल का पाठ नहीं।',
      'सिगरेट वाला आँकड़ा केवल PM2.5 के लिए है और पूरे दिन को मानकर है।',
    ],
    [
      '左边是美国指数，右边是韩国等级——同一浓度，两把尺子。',
      '指数 50、100、150 是分界线，等级名称就在那里改变。',
      '预报等级通常是日均值，与此刻的读数不同。',
      '香烟换算只用于 PM2.5，并按整天暴露计算。',
    ],
    [
      '左邊是美國指數，右邊是韓國等級——同一濃度，兩把尺。',
      '指數 50、100、150 是分界線，等級名稱就在那裡改變。',
      '預報等級通常是日均值，與此刻的讀數不同。',
      '香菸換算只用於 PM2.5，並按整天暴露計算。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '미세먼지 농도와 대기질 지수 — 한국 등급과 미국 AQI',
    'Fine dust and the air quality index — Korean grades against the US AQI',
    'Partículas y el índice de calidad del aire — grados coreanos frente al AQI',
    'Partículas e o índice de qualidade do ar — graus coreanos e o AQI',
    'PM2.5の濃度と大気質指数 — 韓国の等級と米国AQI',
    'Feinstaub und Luftqualitätsindex — koreanische Stufen gegen den US-AQI',
    'Particules et indice de qualité de l’air — grades coréens face à l’AQI',
    'सूक्ष्म कण और वायु गुणवत्ता सूचकांक — कोरियाई ग्रेड बनाम अमेरिकी AQI',
    '雾霾浓度与空气质量指数 — 韩国等级对照美国 AQI',
    '霧霾濃度與空氣品質指數 — 韓國等級對照美國 AQI',
  ),

  hubMetaDesc: T(
    '초미세먼지 35µg/m³는 한국에서 보통, 미국 지수로는 99입니다. 오염물질 6가지와 농도 18가지가 만나는 108칸마다 두 나라의 지수와 등급, 담배 개비 환산을 계산했습니다.',
    'PM2.5 at 35 µg/m³ is "moderate" in Korea and 99 on the US index. For all 108 pairings of 6 pollutants and 18 concentrations: both indexes, both grades, and the equivalent in cigarettes.',
    'PM2,5 en 35 µg/m³ es «normal» en Corea y 99 en el índice de EE. UU. Para los 108 cruces de 6 contaminantes y 18 concentraciones: ambos índices, ambos grados y el equivalente en cigarrillos.',
    'PM2,5 em 35 µg/m³ é "normal" na Coreia e 99 no índice dos EUA. Para os 108 cruzamentos de 6 poluentes e 18 concentrações: os dois índices, os dois graus e o equivalente em cigarros.',
    'PM2.5の35µg/m³は韓国で普通、米国の指数では99です。汚染物質6種と濃度18通りが出会う108マスの両国の指数と等級、たばこ換算を計算しました。',
    'PM2,5 bei 35 µg/m³ gilt in Korea als normal und liegt im US-Index bei 99. Für alle 108 Kombinationen aus 6 Schadstoffen und 18 Konzentrationen: beide Indizes, beide Stufen und das Zigarettenäquivalent.',
    'Un PM2,5 de 35 µg/m³ est « normal » en Corée et vaut 99 dans l’indice américain. Pour les 108 croisements de 6 polluants et 18 concentrations : les deux indices, les deux grades et l’équivalent en cigarettes.',
    'PM2.5 का 35 µg/m³ कोरिया में सामान्य है और अमेरिकी सूचकांक में 99। 6 प्रदूषकों और 18 सांद्रताओं के सभी 108 मेलों के दोनों सूचकांक, दोनों ग्रेड और सिगरेट समकक्ष।',
    'PM2.5 为 35µg/m³ 在韩国算"一般"，美国指数却是 99。6 种污染物与 18 种浓度交汇的 108 格，都算出两套指数与等级，以及香烟换算。',
    'PM2.5 為 35µg/m³ 在韓國算「一般」，美國指數卻是 99。6 種污染物與 18 種濃度交匯的 108 格，都算出兩套指數與等級，以及香菸換算。',
  ),

  desc: T<(f: AirFacts) => string>(
    f => `${airKo(f.cell.key)} ${f.cell.value}${f.unit}는 미국 지수로 ${f.epa}, 한국 등급으로는 ${f.korea === 'good' ? '좋음' : f.korea === 'normal' ? '보통' : f.korea === 'bad' ? '나쁨' : '매우 나쁨'}입니다.`,
    f => `${airEn(f.cell.key)} at ${f.cell.value} ${f.unit} scores ${f.epa} on the US index, and the Korean grade calls it ${f.korea === 'good' ? 'good' : f.korea === 'normal' ? 'moderate' : f.korea === 'bad' ? 'bad' : 'very bad'}.`,
    f => `${airEs(f.cell.key)} a ${f.cell.value} ${f.unit} marca ${f.epa} en el índice de EE. UU.; el grado coreano lo llama ${f.korea === 'good' ? 'buena' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'mala' : 'muy mala'}.`,
    f => `${airPt(f.cell.key)} a ${f.cell.value} ${f.unit} marca ${f.epa} no índice dos EUA; o grau coreano chama de ${f.korea === 'good' ? 'boa' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'ruim' : 'muito ruim'}.`,
    f => `${airJa(f.cell.key)}の${f.cell.value}${f.unit}は米国の指数で${f.epa}、韓国の等級では${f.korea === 'good' ? '良い' : f.korea === 'normal' ? '普通' : f.korea === 'bad' ? '悪い' : '非常に悪い'}です。`,
    f => `${airDe(f.cell.key)} bei ${f.cell.value} ${f.unit} ergibt im US-Index ${f.epa}; die koreanische Stufe nennt es ${f.korea === 'good' ? 'gut' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'schlecht' : 'sehr schlecht'}.`,
    f => `${airFr(f.cell.key)} à ${f.cell.value} ${f.unit} donne ${f.epa} sur l’indice américain ; le grade coréen le dit ${f.korea === 'good' ? 'bon' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'mauvais' : 'très mauvais'}.`,
    f => `${airHi(f.cell.key)} ${f.cell.value} ${f.unit} पर अमेरिकी सूचकांक ${f.epa} है और कोरियाई ग्रेड इसे ${f.korea === 'good' ? 'अच्छी' : f.korea === 'normal' ? 'सामान्य' : f.korea === 'bad' ? 'ख़राब' : 'बहुत ख़राब'} कहता है।`,
    f => `${airZh(f.cell.key)} ${f.cell.value}${f.unit} 在美国指数下是 ${f.epa}，韩国等级则为${f.korea === 'good' ? '好' : f.korea === 'normal' ? '一般' : f.korea === 'bad' ? '差' : '很差'}。`,
    f => `${airTw(f.cell.key)} ${f.cell.value}${f.unit} 在美國指數下是 ${f.epa}，韓國等級則為${f.korea === 'good' ? '好' : f.korea === 'normal' ? '一般' : f.korea === 'bad' ? '差' : '很差'}。`,
  ),

  metaTitle: T<(f: AirFacts) => string>(
    f => `${airKo(f.cell.key)} ${f.cell.value}${f.unit} — AQI ${f.epa}`,
    f => `${airEn(f.cell.key)} ${f.cell.value} ${f.unit} — AQI ${f.epa}`,
    f => `${airEs(f.cell.key)} ${f.cell.value} ${f.unit} — AQI ${f.epa}`,
    f => `${airPt(f.cell.key)} ${f.cell.value} ${f.unit} — AQI ${f.epa}`,
    f => `${airJa(f.cell.key)} ${f.cell.value}${f.unit} — AQI ${f.epa}`,
    f => `${airDe(f.cell.key)} ${f.cell.value} ${f.unit} — AQI ${f.epa}`,
    f => `${airFr(f.cell.key)} ${f.cell.value} ${f.unit} — AQI ${f.epa}`,
    f => `${airHi(f.cell.key)} ${f.cell.value} ${f.unit} — AQI ${f.epa}`,
    f => `${airZh(f.cell.key)} ${f.cell.value}${f.unit} — AQI ${f.epa}`,
    f => `${airTw(f.cell.key)} ${f.cell.value}${f.unit} — AQI ${f.epa}`,
  ),

  metaDesc: T<(f: AirFacts) => string>(
    f => `${airKo(f.cell.key)} ${f.cell.value}${f.unit}는 미국 지수 ${f.epa}, 한국 등급 ${f.korea === 'good' ? '좋음' : f.korea === 'normal' ? '보통' : f.korea === 'bad' ? '나쁨' : '매우 나쁨'}입니다.${f.cigarettes !== null ? ` 이 공기를 하루 마시면 담배 ${f.cigarettes}개비에 해당합니다.` : ''}`,
    f => `${airEn(f.cell.key)} at ${f.cell.value} ${f.unit} is ${f.epa} on the US index and ${f.korea === 'good' ? 'good' : f.korea === 'normal' ? 'moderate' : f.korea === 'bad' ? 'bad' : 'very bad'} on the Korean scale.${f.cigarettes !== null ? ` A day of it is about ${f.cigarettes} cigarettes.` : ''}`,
    f => `${airEs(f.cell.key)} a ${f.cell.value} ${f.unit} da ${f.epa} en el índice de EE. UU. y ${f.korea === 'good' ? 'buena' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'mala' : 'muy mala'} en la escala coreana.${f.cigarettes !== null ? ` Un día equivale a ${f.cigarettes} cigarrillos.` : ''}`,
    f => `${airPt(f.cell.key)} a ${f.cell.value} ${f.unit} dá ${f.epa} no índice dos EUA e ${f.korea === 'good' ? 'boa' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'ruim' : 'muito ruim'} na escala coreana.${f.cigarettes !== null ? ` Um dia equivale a ${f.cigarettes} cigarros.` : ''}`,
    f => `${airJa(f.cell.key)}の${f.cell.value}${f.unit}は米国指数${f.epa}、韓国の等級では${f.korea === 'good' ? '良い' : f.korea === 'normal' ? '普通' : f.korea === 'bad' ? '悪い' : '非常に悪い'}です。${f.cigarettes !== null ? `1日吸えばたばこ${f.cigarettes}本に当たります。` : ''}`,
    f => `${airDe(f.cell.key)} bei ${f.cell.value} ${f.unit} ergibt US-Index ${f.epa} und koreanisch ${f.korea === 'good' ? 'gut' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'schlecht' : 'sehr schlecht'}.${f.cigarettes !== null ? ` Ein Tag davon entspricht ${f.cigarettes} Zigaretten.` : ''}`,
    f => `${airFr(f.cell.key)} à ${f.cell.value} ${f.unit} donne un indice américain de ${f.epa} et un grade coréen ${f.korea === 'good' ? 'bon' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'mauvais' : 'très mauvais'}.${f.cigarettes !== null ? ` Une journée équivaut à ${f.cigarettes} cigarettes.` : ''}`,
    f => `${airHi(f.cell.key)} ${f.cell.value} ${f.unit} पर अमेरिकी सूचकांक ${f.epa} और कोरियाई ग्रेड ${f.korea === 'good' ? 'अच्छी' : f.korea === 'normal' ? 'सामान्य' : f.korea === 'bad' ? 'ख़राब' : 'बहुत ख़राब'} है।${f.cigarettes !== null ? ` दिन भर में यह लगभग ${f.cigarettes} सिगरेट के बराबर है।` : ''}`,
    f => `${airZh(f.cell.key)} ${f.cell.value}${f.unit} 的美国指数是 ${f.epa}，韩国等级为${f.korea === 'good' ? '好' : f.korea === 'normal' ? '一般' : f.korea === 'bad' ? '差' : '很差'}。${f.cigarettes !== null ? `吸一天大约相当于 ${f.cigarettes} 支香烟。` : ''}`,
    f => `${airTw(f.cell.key)} ${f.cell.value}${f.unit} 的美國指數是 ${f.epa}，韓國等級為${f.korea === 'good' ? '好' : f.korea === 'normal' ? '一般' : f.korea === 'bad' ? '差' : '很差'}。${f.cigarettes !== null ? `吸一天大約相當於 ${f.cigarettes} 支香菸。` : ''}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '초미세먼지 35는 나쁜 건가요?', a: '한국 기준으로는 보통의 끝이고, 미국 지수로 옮기면 99라 역시 보통의 끝입니다. 36부터는 한국에서 나쁨입니다.' },
      { q: '왜 앱마다 수치가 다른가요?', a: '기준이 다르기 때문입니다. 미국 지수는 농도를 0~500 눈금으로 옮긴 값이고, 한국 등급은 농도를 네 구간으로 나눈 값입니다. 같은 공기라도 표시가 다릅니다.' },
      { q: 'AQI 150은 얼마나 나쁜 건가요?', a: '민감군 주의를 넘어 나쁨 구간에 들어간 값입니다. 초미세먼지로 치면 55µg/m³ 남짓입니다.' },
      { q: '미세먼지와 초미세먼지는 무엇이 다른가요?', a: '지름 10마이크로미터 이하가 미세먼지, 2.5마이크로미터 이하가 초미세먼지입니다. 작을수록 깊이 들어가서 기준도 더 엄합니다.' },
      { q: '농도가 얼마부터 마스크를 쓰나요?', a: '초미세먼지가 36µg/m³를 넘어 나쁨에 들면 쓰는 편이 낫습니다. 다만 등급보다 얼굴에 밀착되는지가 더 중요합니다.' },
    ],
    [
      { q: 'Is PM2.5 of 35 bad?', a: 'In Korea it sits at the top of "moderate"; on the US index it is 99, also the top of moderate. From 36 the Korean grade turns bad.' },
      { q: 'Why does every app show a different number?', a: 'Because they use different scales. The US index maps concentration onto 0–500; the Korean grade sorts it into four bands. Same air, different display.' },
      { q: 'How bad is an AQI of 150?', a: 'It is the top of the band that is unhealthy for sensitive groups, just short of unhealthy for everyone — around 55 µg/m³ of PM2.5.' },
      { q: 'What is the difference between PM10 and PM2.5?', a: 'PM10 is anything up to 10 micrometres across; PM2.5 up to 2.5. The smaller particles go deeper into the lungs, which is why their limits are stricter.' },
      { q: 'At what level should I wear a mask?', a: 'Once PM2.5 passes 36 µg/m³ and the Korean grade turns bad, it is worth it. But how well the mask seals matters more than its rating.' },
    ],
    [
      { q: '¿Un PM2,5 de 35 es malo?', a: 'En Corea está en el límite alto de «normal»; en el índice de EE. UU. son 99, también el tope de moderado. Desde 36 pasa a malo en Corea.' },
      { q: '¿Por qué cada app muestra un número distinto?', a: 'Porque usan escalas distintas. El índice de EE. UU. lleva la concentración a 0–500; el grado coreano la reparte en cuatro franjas. Mismo aire, otra pantalla.' },
      { q: '¿Cómo de malo es un AQI de 150?', a: 'Es el tope de la franja dañina para grupos sensibles, justo antes de ser dañina para todos: unos 55 µg/m³ de PM2,5.' },
      { q: '¿Qué diferencia hay entre PM10 y PM2,5?', a: 'El PM10 llega hasta 10 micrómetros; el PM2,5 hasta 2,5. Las partículas pequeñas entran más hondo, y por eso su límite es más estricto.' },
      { q: '¿A partir de qué nivel conviene mascarilla?', a: 'Cuando el PM2,5 pasa de 36 µg/m³ y el grado coreano se vuelve malo. Aun así, el ajuste importa más que la clasificación.' },
    ],
    [
      { q: 'Um PM2,5 de 35 é ruim?', a: 'Na Coreia fica no limite alto de "normal"; no índice dos EUA são 99, também o topo de moderado. A partir de 36 vira ruim na Coreia.' },
      { q: 'Por que cada app mostra um número diferente?', a: 'Porque usam escalas diferentes. O índice dos EUA leva a concentração a 0–500; o grau coreano a divide em quatro faixas. Mesmo ar, outra tela.' },
      { q: 'Quão ruim é um AQI de 150?', a: 'É o topo da faixa prejudicial a grupos sensíveis, logo antes de ser prejudicial a todos: cerca de 55 µg/m³ de PM2,5.' },
      { q: 'Qual a diferença entre PM10 e PM2,5?', a: 'PM10 vai até 10 micrômetros; PM2,5 até 2,5. As partículas menores entram mais fundo, por isso o limite é mais rígido.' },
      { q: 'A partir de que nível usar máscara?', a: 'Quando o PM2,5 passa de 36 µg/m³ e o grau coreano vira ruim. Ainda assim, a vedação importa mais que a classificação.' },
    ],
    [
      { q: 'PM2.5の35は悪いのですか？', a: '韓国基準では普通の上限で、米国の指数に移すと99でやはり普通の上限です。36からは韓国で悪いになります。' },
      { q: 'なぜアプリごとに数値が違うのですか？', a: '基準が違うからです。米国の指数は濃度を0〜500の目盛りに移した値、韓国の等級は濃度を四つに区切った値です。同じ空気でも表示が違います。' },
      { q: 'AQI 150はどれくらい悪いのですか？', a: '敏感な人に悪い区間の上限で、全員に悪くなる一歩手前です。PM2.5でいえば55µg/m³ほどです。' },
      { q: 'PM10とPM2.5は何が違いますか？', a: '直径10マイクロメートル以下がPM10、2.5以下がPM2.5です。小さいほど奥まで入るので基準も厳しくなります。' },
      { q: 'どのくらいからマスクを着けますか？', a: 'PM2.5が36µg/m³を超えて悪いに入ったら着けるとよいです。ただし等級より顔への密着のほうが効きます。' },
    ],
    [
      { q: 'Ist PM2,5 von 35 schlecht?', a: 'In Korea liegt es am oberen Rand von „normal“; im US-Index sind es 99, ebenfalls das obere Ende von mäßig. Ab 36 gilt es in Korea als schlecht.' },
      { q: 'Warum zeigt jede App eine andere Zahl?', a: 'Weil die Skalen verschieden sind. Der US-Index bildet die Konzentration auf 0–500 ab, die koreanische Stufe teilt sie in vier Bänder. Gleiche Luft, andere Anzeige.' },
      { q: 'Wie schlimm ist ein AQI von 150?', a: 'Es ist die Obergrenze des für empfindliche Gruppen ungesunden Bereichs, knapp vor „ungesund für alle“ — etwa 55 µg/m³ PM2,5.' },
      { q: 'Was unterscheidet PM10 von PM2,5?', a: 'PM10 reicht bis 10 Mikrometer, PM2,5 bis 2,5. Kleinere Teilchen dringen tiefer ein, deshalb sind ihre Grenzwerte strenger.' },
      { q: 'Ab wann Maske tragen?', a: 'Sobald PM2,5 über 36 µg/m³ steigt und die koreanische Stufe schlecht wird. Wichtiger als die Klasse ist aber der dichte Sitz.' },
    ],
    [
      { q: 'Un PM2,5 de 35, c’est mauvais ?', a: 'En Corée, c’est le haut de « normal » ; dans l’indice américain, 99, soit le haut de modéré aussi. À partir de 36, la Corée passe à mauvais.' },
      { q: 'Pourquoi chaque application affiche un chiffre différent ?', a: 'Parce que les échelles diffèrent. L’indice américain projette la concentration sur 0–500 ; le grade coréen la range en quatre bandes. Même air, autre affichage.' },
      { q: 'Un AQI de 150, c’est grave ?', a: 'C’est le haut de la bande mauvaise pour les personnes sensibles, juste avant « mauvais pour tous » : environ 55 µg/m³ de PM2,5.' },
      { q: 'Quelle différence entre PM10 et PM2,5 ?', a: 'Le PM10 va jusqu’à 10 micromètres, le PM2,5 jusqu’à 2,5. Les plus fines pénètrent plus profond, d’où des seuils plus stricts.' },
      { q: 'À partir de quel niveau porter un masque ?', a: 'Dès que le PM2,5 dépasse 36 µg/m³ et que le grade coréen devient mauvais. Mais l’étanchéité compte plus que la classe.' },
    ],
    [
      { q: 'क्या PM2.5 का 35 ख़राब है?', a: 'कोरिया में यह "सामान्य" का ऊपरी सिरा है; अमेरिकी सूचकांक में 99, वहाँ भी मध्यम का ऊपरी सिरा। 36 से कोरिया में ख़राब हो जाता है।' },
      { q: 'हर ऐप अलग संख्या क्यों दिखाता है?', a: 'क्योंकि पैमाने अलग हैं। अमेरिकी सूचकांक सांद्रता को 0–500 पर लाता है; कोरियाई ग्रेड उसे चार श्रेणियों में बाँटता है। हवा वही, दिखावट अलग।' },
      { q: 'AQI 150 कितना ख़राब है?', a: 'यह संवेदनशील लोगों के लिए हानिकारक श्रेणी का ऊपरी सिरा है — PM2.5 में लगभग 55 µg/m³।' },
      { q: 'PM10 और PM2.5 में क्या अंतर है?', a: 'PM10 यानी 10 माइक्रोमीटर तक, PM2.5 यानी 2.5 तक। छोटे कण गहरे तक जाते हैं, इसलिए उनकी सीमा सख़्त है।' },
      { q: 'किस स्तर पर मास्क पहनें?', a: 'जब PM2.5 36 µg/m³ पार करे और कोरियाई ग्रेड ख़राब हो जाए। फिर भी रेटिंग से ज़्यादा फ़िट मायने रखता है।' },
    ],
    [
      { q: 'PM2.5 到 35 算差吗？', a: '按韩国标准是"一般"的上限；换成美国指数是 99，同样是"良"的上限。从 36 起，韩国就算"差"了。' },
      { q: '为什么每个 App 显示的数字都不同？', a: '因为标准不同。美国指数把浓度映射到 0–500，韩国等级则把浓度分成四档。同样的空气，显示方式不同。' },
      { q: 'AQI 150 有多差？', a: '它是"对敏感人群不健康"这一档的上限，再往上就对所有人不健康了——大约相当于 PM2.5 的 55µg/m³。' },
      { q: 'PM10 和 PM2.5 有什么区别？', a: 'PM10 是直径 10 微米以下，PM2.5 是 2.5 微米以下。越小越能进到肺的深处，所以标准也更严。' },
      { q: '到多少该戴口罩？', a: 'PM2.5 超过 36µg/m³、进入"差"的区间时值得戴。不过比等级更要紧的是口罩是否贴合脸型。' },
    ],
    [
      { q: 'PM2.5 到 35 算差嗎？', a: '按韓國標準是「一般」的上限；換成美國指數是 99，同樣是「良」的上限。從 36 起，韓國就算「差」了。' },
      { q: '為什麼每個 App 顯示的數字都不同？', a: '因為標準不同。美國指數把濃度映射到 0–500，韓國等級則把濃度分成四檔。同樣的空氣，顯示方式不同。' },
      { q: 'AQI 150 有多差？', a: '它是「對敏感族群不健康」這一檔的上限，再往上就對所有人不健康了——大約相當於 PM2.5 的 55µg/m³。' },
      { q: 'PM10 和 PM2.5 有什麼區別？', a: 'PM10 是直徑 10 微米以下，PM2.5 是 2.5 微米以下。越小越能進到肺的深處，所以標準也更嚴。' },
      { q: '到多少該戴口罩？', a: 'PM2.5 超過 36µg/m³、進入「差」的區間時值得戴。不過比等級更要緊的是口罩是否貼合臉型。' },
    ],
  ),

  cellFaq: T<(f: AirFacts) => FaqItem[]>(
    f => [
      { q: `${airKo(f.cell.key)} ${f.cell.value}${f.unit}는 어느 정도인가요?`, a: `미국 지수로 ${f.epa}, 한국 등급으로 ${f.korea === 'good' ? '좋음' : f.korea === 'normal' ? '보통' : f.korea === 'bad' ? '나쁨' : '매우 나쁨'}입니다.` },
      { q: `두 나라의 판정이 같은가요?`, a: `${f.split ? '갈립니다. 한쪽은 보통이라 말하고 다른 쪽은 나쁨이라 말하는 자리입니다.' : '같습니다. 두 기준이 같은 쪽으로 읽습니다.'}` },
      { q: `지수 100이 되려면 농도가 얼마여야 하나요?`, a: `${f.hundred}${f.unit}입니다. 지금 값은 ${f.cell.value}${f.unit}입니다.` },
      { q: `${f.cigarettes !== null ? '하루 마시면 담배 몇 개비인가요?' : '이 오염물질은 무엇인가요?'}`, a: `${f.cigarettes !== null ? `${f.cigarettes}개비입니다. 초미세먼지 22µg/m³를 하루 마시는 것이 한 개비라는 어림에서 나옵니다.` : `${airKo(f.cell.key)}입니다. 담배 환산은 초미세먼지에만 붙였습니다.`}` },
    ],
    f => [
      { q: `How bad is ${airEn(f.cell.key)} at ${f.cell.value} ${f.unit}?`, a: `${f.epa} on the US index, and ${f.korea === 'good' ? 'good' : f.korea === 'normal' ? 'moderate' : f.korea === 'bad' ? 'bad' : 'very bad'} on the Korean scale.` },
      { q: `Do the two systems agree?`, a: `${f.split ? 'No — this is one of the places where one calls it moderate and the other calls it bad.' : 'Yes, both read it the same way here.'}` },
      { q: `What concentration would make the index 100?`, a: `${f.hundred} ${f.unit}. This page is at ${f.cell.value} ${f.unit}.` },
      { q: `${f.cigarettes !== null ? 'How many cigarettes is a day of this?' : 'What is this pollutant?'}`, a: `${f.cigarettes !== null ? `About ${f.cigarettes}. It follows from reckoning a day at 22 µg/m³ of PM2.5 as one cigarette.` : `${airEn(f.cell.key)}. The cigarette comparison is only applied to PM2.5.`}` },
    ],
    f => [
      { q: `¿Qué tan malo es ${airEs(f.cell.key)} a ${f.cell.value} ${f.unit}?`, a: `${f.epa} en el índice de EE. UU. y ${f.korea === 'good' ? 'buena' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'mala' : 'muy mala'} en la escala coreana.` },
      { q: `¿Coinciden los dos sistemas?`, a: `${f.split ? 'No: aquí uno dice normal y el otro dice mala.' : 'Sí, aquí ambos lo leen igual.'}` },
      { q: `¿Qué concentración daría índice 100?`, a: `${f.hundred} ${f.unit}. Esta página está en ${f.cell.value} ${f.unit}.` },
      { q: `${f.cigarettes !== null ? '¿Cuántos cigarrillos son un día así?' : '¿Qué contaminante es este?'}`, a: `${f.cigarettes !== null ? `Unos ${f.cigarettes}. Sale de contar un día a 22 µg/m³ de PM2,5 como un cigarrillo.` : `${airEs(f.cell.key)}. La comparación con cigarrillos solo se aplica al PM2,5.`}` },
    ],
    f => [
      { q: `Quão ruim é ${airPt(f.cell.key)} a ${f.cell.value} ${f.unit}?`, a: `${f.epa} no índice dos EUA e ${f.korea === 'good' ? 'boa' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'ruim' : 'muito ruim'} na escala coreana.` },
      { q: `Os dois sistemas concordam?`, a: `${f.split ? 'Não: aqui um diz normal e o outro diz ruim.' : 'Sim, aqui os dois leem igual.'}` },
      { q: `Que concentração daria índice 100?`, a: `${f.hundred} ${f.unit}. Esta página está em ${f.cell.value} ${f.unit}.` },
      { q: `${f.cigarettes !== null ? 'Quantos cigarros é um dia assim?' : 'Que poluente é este?'}`, a: `${f.cigarettes !== null ? `Cerca de ${f.cigarettes}. Vem de contar um dia a 22 µg/m³ de PM2,5 como um cigarro.` : `${airPt(f.cell.key)}. A comparação com cigarros só se aplica ao PM2,5.`}` },
    ],
    f => [
      { q: `${airJa(f.cell.key)}の${f.cell.value}${f.unit}はどれくらいですか？`, a: `米国の指数で${f.epa}、韓国の等級では${f.korea === 'good' ? '良い' : f.korea === 'normal' ? '普通' : f.korea === 'bad' ? '悪い' : '非常に悪い'}です。` },
      { q: `二つの判定は一致しますか？`, a: `${f.split ? '割れます。一方は普通と言い、もう一方は悪いと言う場所です。' : '一致します。二つの基準が同じ側で読みます。'}` },
      { q: `指数100になる濃度はいくつですか？`, a: `${f.hundred}${f.unit}です。今の値は${f.cell.value}${f.unit}です。` },
      { q: `${f.cigarettes !== null ? '1日吸うとたばこ何本ですか？' : 'この汚染物質は何ですか？'}`, a: `${f.cigarettes !== null ? `${f.cigarettes}本です。PM2.5を22µg/m³で1日吸うのが1本という目安から出ます。` : `${airJa(f.cell.key)}です。たばこ換算はPM2.5にだけ付けています。`}` },
    ],
    f => [
      { q: `Wie schlimm ist ${airDe(f.cell.key)} bei ${f.cell.value} ${f.unit}?`, a: `${f.epa} im US-Index und ${f.korea === 'good' ? 'gut' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'schlecht' : 'sehr schlecht'} auf der koreanischen Skala.` },
      { q: `Sind sich beide Systeme einig?`, a: `${f.split ? 'Nein — hier nennt es das eine normal und das andere schlecht.' : 'Ja, hier lesen beide gleich.'}` },
      { q: `Welche Konzentration ergäbe Index 100?`, a: `${f.hundred} ${f.unit}. Diese Seite steht bei ${f.cell.value} ${f.unit}.` },
      { q: `${f.cigarettes !== null ? 'Wie viele Zigaretten sind ein solcher Tag?' : 'Was ist dieser Schadstoff?'}`, a: `${f.cigarettes !== null ? `Etwa ${f.cigarettes}. Grundlage ist die Faustregel, dass ein Tag bei 22 µg/m³ PM2,5 einer Zigarette entspricht.` : `${airDe(f.cell.key)}. Der Zigarettenvergleich gilt nur für PM2,5.`}` },
    ],
    f => [
      { q: `Quelle gravité pour ${airFr(f.cell.key)} à ${f.cell.value} ${f.unit} ?`, a: `${f.epa} sur l’indice américain et ${f.korea === 'good' ? 'bon' : f.korea === 'normal' ? 'normal' : f.korea === 'bad' ? 'mauvais' : 'très mauvais'} sur l’échelle coréenne.` },
      { q: `Les deux systèmes s’accordent-ils ?`, a: `${f.split ? 'Non — ici l’un dit normal et l’autre mauvais.' : 'Oui, les deux le lisent pareil ici.'}` },
      { q: `Quelle concentration donnerait un indice 100 ?`, a: `${f.hundred} ${f.unit}. Cette page est à ${f.cell.value} ${f.unit}.` },
      { q: `${f.cigarettes !== null ? 'Une journée, cela fait combien de cigarettes ?' : 'Quel est ce polluant ?'}`, a: `${f.cigarettes !== null ? `Environ ${f.cigarettes}. On part du repère : une journée à 22 µg/m³ de PM2,5 vaut une cigarette.` : `${airFr(f.cell.key)}. La comparaison en cigarettes ne s’applique qu’au PM2,5.`}` },
    ],
    f => [
      { q: `${airHi(f.cell.key)} ${f.cell.value} ${f.unit} कितना ख़राब है?`, a: `अमेरिकी सूचकांक में ${f.epa} और कोरियाई पैमाने पर ${f.korea === 'good' ? 'अच्छी' : f.korea === 'normal' ? 'सामान्य' : f.korea === 'bad' ? 'ख़राब' : 'बहुत ख़राब'}।` },
      { q: `क्या दोनों प्रणालियाँ सहमत हैं?`, a: `${f.split ? 'नहीं — यहाँ एक इसे सामान्य कहता है और दूसरा ख़राब।' : 'हाँ, यहाँ दोनों एक जैसा पढ़ते हैं।'}` },
      { q: `सूचकांक 100 के लिए कितनी सांद्रता चाहिए?`, a: `${f.hundred} ${f.unit}। यह पन्ना ${f.cell.value} ${f.unit} पर है।` },
      { q: `${f.cigarettes !== null ? 'ऐसा एक दिन कितनी सिगरेट के बराबर है?' : 'यह कौन सा प्रदूषक है?'}`, a: `${f.cigarettes !== null ? `लगभग ${f.cigarettes}। आधार यह है कि 22 µg/m³ PM2.5 का एक दिन एक सिगरेट के बराबर माना जाता है।` : `${airHi(f.cell.key)}। सिगरेट तुलना केवल PM2.5 पर लागू है।`}` },
    ],
    f => [
      { q: `${airZh(f.cell.key)} ${f.cell.value}${f.unit} 有多差？`, a: `美国指数 ${f.epa}，韩国等级为${f.korea === 'good' ? '好' : f.korea === 'normal' ? '一般' : f.korea === 'bad' ? '差' : '很差'}。` },
      { q: `两套标准判定一致吗？`, a: `${f.split ? '不一致——这里一边说"一般"，另一边说"差"。' : '一致，两套标准在这里读法相同。'}` },
      { q: `浓度到多少指数才是 100？`, a: `${f.hundred}${f.unit}。本页是 ${f.cell.value}${f.unit}。` },
      { q: `${f.cigarettes !== null ? '这样吸一天相当于几支烟？' : '这是什么污染物？'}`, a: `${f.cigarettes !== null ? `约 ${f.cigarettes} 支。依据是 PM2.5 在 22µg/m³ 下吸一天约等于一支烟。` : `是${airZh(f.cell.key)}。香烟换算只用于 PM2.5。`}` },
    ],
    f => [
      { q: `${airTw(f.cell.key)} ${f.cell.value}${f.unit} 有多差？`, a: `美國指數 ${f.epa}，韓國等級為${f.korea === 'good' ? '好' : f.korea === 'normal' ? '一般' : f.korea === 'bad' ? '差' : '很差'}。` },
      { q: `兩套標準判定一致嗎？`, a: `${f.split ? '不一致——這裡一邊說「一般」，另一邊說「差」。' : '一致，兩套標準在這裡讀法相同。'}` },
      { q: `濃度到多少指數才是 100？`, a: `${f.hundred}${f.unit}。本頁是 ${f.cell.value}${f.unit}。` },
      { q: `${f.cigarettes !== null ? '這樣吸一天相當於幾支菸？' : '這是什麼污染物？'}`, a: `${f.cigarettes !== null ? `約 ${f.cigarettes} 支。依據是 PM2.5 在 22µg/m³ 下吸一天約等於一支菸。` : `是${airTw(f.cell.key)}。香菸換算只用於 PM2.5。`}` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const AIR_UI: L<AirUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<AirUI>;
