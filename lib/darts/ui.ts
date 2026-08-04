/**
 * 다트 마무리 화면의 문구 — 열 언어.
 *
 * T20·D16 같은 표기는 옮기지 않는다. 어느 나라 중계에서도 그렇게 부르고,
 * 옮기면 오히려 찾는 말과 멀어진다. 옮기는 것은 규칙과 설명뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { DartsFacts, Ring } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DartsUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 한 다트·두 다트·세 다트·못 끝냄 */
  dartsLabel: (n: number | null) => string;
  routeLabel: string;
  routeCountLabel: string;
  ringLabel: Record<Ring, string>;
  boardTitle: string;
  boardNote: string;
  bogeyTitle: string;
  bogeyNote: string;
  ruleTitle: string;
  ruleNote: string;
  groupTitle: string;
  neighbourTitle: string;
  noneLabel: string;
  desc: (f: DartsFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: DartsFacts) => string;
  metaDesc: (f: DartsFacts) => string;
  hubFaq: FaqItem[];
  scoreFaq: (f: DartsFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 수순을 T20 · D16 처럼 늘어놓는다 */
const routeText = (f: DartsFacts): string => f.route.map(t => t.label).join(' · ');

type Spec = { [K in keyof DartsUI]: L<DartsUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('다트 마무리', 'Darts checkouts', 'Cierres de dardos', 'Fechamentos de dardos', 'ダーツのフィニッシュ', 'Darts-Finishes', 'Finishes aux fléchettes', 'डार्ट्स चेकआउट', '飞镖收尾', '飛鏢收尾'),

  hubTitle: T(
    '남은 점수 169가지의 마무리',
    'Checkouts for all 169 scores',
    'Cierres para los 169 puntajes',
    'Fechamentos para os 169 pontos',
    '残り点169通りのフィニッシュ',
    'Finishes für alle 169 Reststände',
    'Finitions pour les 169 scores',
    'सभी 169 स्कोर के चेकआउट',
    '169 种余分的收尾打法',
    '169 種餘分的收尾打法',
  ),

  hubLead: T(
    '2점부터 170점까지, 몇 다트에 끝나는지와 수순을 판에서 찾아냈습니다. 표를 베낀 것이 아니라 규칙으로 고른 것입니다.',
    'From 2 to 170: how many darts it takes and which route to throw, worked out from the board itself rather than copied from a chart.',
    'De 2 a 170: cuántos dardos hacen falta y qué recorrido lanzar, deducido del propio tablero y no copiado de una tabla.',
    'De 2 a 170: quantos dardos são precisos e qual sequência lançar, deduzido do próprio alvo e não copiado de uma tabela.',
    '2点から170点まで、何本で終わるかと投げる順を盤から探しました。表を書き写したのではなく、規則で選んでいます。',
    'Von 2 bis 170: wie viele Darts nötig sind und welche Folge man wirft — aus dem Board selbst hergeleitet, nicht aus einer Tabelle abgeschrieben.',
    'De 2 à 170 : combien de fléchettes il faut et quel enchaînement lancer, déduit de la cible elle-même plutôt que recopié d’un tableau.',
    '2 से 170 तक: कितने डार्ट लगेंगे और कौन-सा क्रम फेंकें — यह बोर्ड से ही निकाला गया है, किसी तालिका से नकल नहीं।',
    '从 2 分到 170 分：几镖能收，以及该怎么投——都是从靶面算出来的，不是抄表。',
    '從 2 分到 170 分：幾鏢能收，以及該怎麼投——都是從靶面算出來的，不是抄表。',
  ),

  dartsLabel: T<(n: number | null) => string>(
    n => (n === null ? '못 끝냅니다' : `${n}다트`),
    n => (n === null ? 'No finish' : n === 1 ? '1 dart' : `${n} darts`),
    n => (n === null ? 'Sin cierre' : n === 1 ? '1 dardo' : `${n} dardos`),
    n => (n === null ? 'Sem fechamento' : n === 1 ? '1 dardo' : `${n} dardos`),
    n => (n === null ? '終われません' : `${n}本`),
    n => (n === null ? 'Kein Finish' : n === 1 ? '1 Dart' : `${n} Darts`),
    n => (n === null ? 'Pas de finish' : n <= 1 ? `${n} fléchette` : `${n} fléchettes`),
    n => (n === null ? 'चेकआउट नहीं' : `${n} डार्ट`),
    n => (n === null ? '收不掉' : `${n} 镖`),
    n => (n === null ? '收不掉' : `${n} 鏢`),
  ),

  routeLabel: T('수순', 'Route', 'Recorrido', 'Sequência', '投げ順', 'Wurffolge', 'Enchaînement', 'क्रम', '打法', '打法'),
  routeCountLabel: T('같은 다트 수의 수순', 'Routes of that length', 'Recorridos de esa longitud', 'Sequências desse tamanho', '同じ本数の順', 'Folgen gleicher Länge', 'Enchaînements de cette longueur', 'उतने ही डार्ट के क्रम', '同镖数的打法', '同鏢數的打法'),

  ringLabel: T(
    { single: '싱글', double: '더블', triple: '트리플', 'outer-bull': '바깥 불', bull: '가운데 불' },
    { single: 'Single', double: 'Double', triple: 'Treble', 'outer-bull': 'Outer bull', bull: 'Bullseye' },
    { single: 'Simple', double: 'Doble', triple: 'Triple', 'outer-bull': 'Anillo del centro', bull: 'Diana' },
    { single: 'Simples', double: 'Dobro', triple: 'Triplo', 'outer-bull': 'Anel do centro', bull: 'Mosca' },
    { single: 'シングル', double: 'ダブル', triple: 'トリプル', 'outer-bull': 'アウターブル', bull: 'ブル' },
    { single: 'Single', double: 'Double', triple: 'Triple', 'outer-bull': 'Äußeres Bull', bull: 'Bullseye' },
    { single: 'Simple', double: 'Double', triple: 'Triple', 'outer-bull': 'Anneau du centre', bull: 'Bull' },
    { single: 'सिंगल', double: 'डबल', triple: 'ट्रिपल', 'outer-bull': 'बाहरी बुल', bull: 'बुल्सआई' },
    { single: '单倍', double: '双倍', triple: '三倍', 'outer-bull': '外靶心', bull: '靶心' },
    { single: '單倍', double: '雙倍', triple: '三倍', 'outer-bull': '外靶心', bull: '靶心' },
  ),

  boardTitle: T('판에 있는 값', 'What the board offers', 'Lo que ofrece el tablero', 'O que o alvo oferece', '盤にある値', 'Was das Board hergibt', 'Ce qu’offre la cible', 'बोर्ड पर क्या है', '靶面上有什么', '靶面上有什麼'),

  boardNote: T(
    '1부터 20까지 각각 싱글·더블·트리플이 있고, 바깥 불이 25점, 가운데 불이 50점입니다. 한 다트의 최고는 T20의 60점입니다.',
    'Each of 1 to 20 comes as a single, a double and a treble; the outer bull is 25 and the bullseye 50. The most one dart can score is 60, a treble 20.',
    'Del 1 al 20 cada número tiene simple, doble y triple; el anillo del centro vale 25 y la diana 50. Lo máximo de un dardo son 60, un triple 20.',
    'De 1 a 20 cada número tem simples, dobro e triplo; o anel do centro vale 25 e a mosca 50. O máximo de um dardo são 60, um triplo 20.',
    '1から20までそれぞれシングル・ダブル・トリプルがあり、アウターブルが25点、ブルが50点です。1本の最高はT20の60点です。',
    'Jede Zahl von 1 bis 20 gibt es einfach, doppelt und dreifach; das äußere Bull zählt 25, das Bullseye 50. Das Höchste für einen Dart sind 60 — Triple 20.',
    'Chaque numéro de 1 à 20 existe en simple, double et triple ; l’anneau du centre vaut 25 et le bull 50. Le maximum d’une fléchette est 60, un triple 20.',
    '1 से 20 तक हर अंक सिंगल, डबल और ट्रिपल में है; बाहरी बुल 25 और बुल्सआई 50। एक डार्ट का अधिकतम 60 है — ट्रिपल 20।',
    '1 到 20 每个数字都有单倍、双倍、三倍；外靶心 25 分，靶心 50 分。一镖最高是 T20 的 60 分。',
    '1 到 20 每個數字都有單倍、雙倍、三倍；外靶心 25 分，靶心 50 分。一鏢最高是 T20 的 60 分。',
  ),

  bogeyTitle: T('세 다트로 끝나지 않습니다', 'No three-dart finish', 'No hay cierre en tres dardos', 'Não há fechamento em três dardos', '3本では終われません', 'Kein Drei-Dart-Finish', 'Pas de finish en trois fléchettes', 'तीन डार्ट में चेकआउट नहीं', '三镖收不掉', '三鏢收不掉'),

  bogeyNote: T(
    '세 다트를 다 써도 더블로 끝낼 수 없는 수입니다. 이런 수가 일곱 개 있어 보기(bogey) 수라 부릅니다 — 남기면 안 되는 점수라는 뜻입니다.',
    'Three darts cannot land on a finishing double from here. Seven such scores exist; they are called bogey numbers — the scores you must avoid leaving.',
    'Con tres dardos no se puede acabar en doble desde aquí. Hay siete puntajes así, los llamados números bogey: los que no conviene dejar.',
    'Com três dardos não dá para terminar num dobro a partir daqui. Existem sete pontuações assim, os chamados números bogey: os que não se deve deixar.',
    '3本使ってもダブルで終われない点です。こうした点が七つあり、ボギー数と呼ばれます——残してはいけない点という意味です。',
    'Aus diesem Rest lässt sich mit drei Darts kein Doppel treffen. Es gibt sieben solcher Stände, die Bogey-Zahlen — die man nicht stehen lassen darf.',
    'Trois fléchettes ne suffisent pas à finir sur un double depuis ce reste. Sept scores sont ainsi, les nombres bogey : ceux qu’il ne faut pas laisser.',
    'यहाँ से तीन डार्ट में भी डबल पर खत्म नहीं हो सकता। ऐसे सात स्कोर हैं, जिन्हें बोगी नंबर कहते हैं — जिन्हें छोड़ना नहीं चाहिए।',
    '从这里出发，三镖也没法落在双倍上收掉。这样的分数有七个，叫做 bogey 数——不该留给自己的分数。',
    '從這裡出發，三鏢也沒法落在雙倍上收掉。這樣的分數有七個，叫做 bogey 數——不該留給自己的分數。',
  ),

  ruleTitle: T('수순을 고르는 규칙', 'How the route was chosen', 'Cómo se eligió el recorrido', 'Como a sequência foi escolhida', '順の選び方', 'Wie die Folge gewählt wurde', 'Comment l’enchaînement a été choisi', 'क्रम कैसे चुना गया', '打法是怎么选的', '打法是怎麼選的'),

  ruleNote: T(
    '다트 수가 적은 쪽, 도중에 더블을 덜 쓰는 쪽, 마무리가 좋은 더블(D20·D16)인 쪽, 첫 다트가 큰 쪽 순으로 골랐습니다. 이 규칙만으로 잘 알려진 수순이 나옵니다 — 60은 S20 D20, 100은 T20 D20입니다.',
    'Fewest darts first, then fewest doubles thrown before the last one, then a kinder finishing double (D20, D16), then the biggest opening dart. That rule alone reproduces the familiar routes: 60 is S20 D20, 100 is T20 D20.',
    'Primero menos dardos, luego menos dobles antes del último, luego un doble final más amable (D20, D16) y por último el primer dardo más alto. Solo con esa regla salen los recorridos conocidos: 60 es S20 D20 y 100 es T20 D20.',
    'Primeiro menos dardos, depois menos dobros antes do último, depois um dobro final mais gentil (D20, D16) e por fim o primeiro dardo maior. Só com essa regra saem as sequências conhecidas: 60 é S20 D20 e 100 é T20 D20.',
    '本数が少ない順、途中でダブルを使わない順、終わりが良いダブル(D20・D16)の順、最初の一本が大きい順で選びました。この規則だけで、よく知られた順が出ます——60はS20 D20、100はT20 D20です。',
    'Zuerst die wenigsten Darts, dann die wenigsten Doppel vor dem letzten Wurf, dann ein freundlicheres Schlussdoppel (D20, D16), zuletzt der größte erste Dart. Allein diese Regel liefert die bekannten Folgen: 60 ist S20 D20, 100 ist T20 D20.',
    'D’abord le moins de fléchettes, puis le moins de doubles avant la dernière, puis un double final plus commode (D20, D16), enfin la plus grosse première fléchette. Cette seule règle redonne les enchaînements connus : 60 fait S20 D20 et 100 fait T20 D20.',
    'पहले कम डार्ट, फिर आखिरी से पहले कम डबल, फिर बेहतर अंतिम डबल (D20, D16), और अंत में सबसे बड़ा पहला डार्ट। इसी नियम से जाने-पहचाने क्रम निकल आते हैं — 60 यानी S20 D20, 100 यानी T20 D20।',
    '先看镖数少，再看收尾前少投双倍，再看结尾的双倍好不好（D20、D16），最后看第一镖大不大。只凭这条规则就能得出大家熟悉的打法：60 是 S20 D20，100 是 T20 D20。',
    '先看鏢數少，再看收尾前少投雙倍，再看結尾的雙倍好不好（D20、D16），最後看第一鏢大不大。只憑這條規則就能得出大家熟悉的打法：60 是 S20 D20，100 是 T20 D20。',
  ),

  groupTitle: T('몇 다트에 끝나나', 'How many darts it takes', 'Cuántos dardos hacen falta', 'Quantos dardos são precisos', '何本で終わるか', 'Wie viele Darts nötig sind', 'Combien de fléchettes', 'कितने डार्ट लगते हैं', '几镖能收', '幾鏢能收'),
  neighbourTitle: T('가까운 점수', 'Nearby scores', 'Puntajes cercanos', 'Pontuações próximas', '近い点', 'Stände daneben', 'Scores voisins', 'पास के स्कोर', '相邻的分数', '相鄰的分數'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  desc: T<(f: DartsFacts) => string>(
    f => (f.bogey
      ? `${f.score}점은 세 다트를 다 써도 더블로 끝낼 수 없는 보기 수입니다.`
      : `${f.score}점은 ${f.darts}다트에 끝납니다 — ${routeText(f)}. 같은 다트 수의 수순이 ${f.routeCount}가지 있습니다.`),
    f => (f.bogey
      ? `${f.score} is a bogey number: three darts cannot reach a finishing double from here.`
      : `${f.score} goes out in ${f.darts} — ${routeText(f)}. There are ${f.routeCount} routes of that length.`),
    f => (f.bogey
      ? `${f.score} es un número bogey: con tres dardos no se llega a un doble final.`
      : `${f.score} se cierra en ${f.darts} — ${routeText(f)}. Hay ${f.routeCount} recorridos de esa longitud.`),
    f => (f.bogey
      ? `${f.score} é um número bogey: com três dardos não se alcança um dobro final.`
      : `${f.score} fecha em ${f.darts} — ${routeText(f)}. Há ${f.routeCount} sequências desse tamanho.`),
    f => (f.bogey
      ? `${f.score}点は3本使ってもダブルで終われないボギー数です。`
      : `${f.score}点は${f.darts}本で終わります——${routeText(f)}。同じ本数の順が${f.routeCount}通りあります。`),
    f => (f.bogey
      ? `${f.score} ist eine Bogey-Zahl: Mit drei Darts kommt man hier auf kein Schlussdoppel.`
      : `${f.score} geht in ${f.darts} — ${routeText(f)}. Es gibt ${f.routeCount} Folgen dieser Länge.`),
    f => (f.bogey
      ? `${f.score} est un nombre bogey : trois fléchettes n’atteignent aucun double final.`
      : `${f.score} se termine en ${f.darts} — ${routeText(f)}. Il existe ${f.routeCount} enchaînements de cette longueur.`),
    f => (f.bogey
      ? `${f.score} एक बोगी नंबर है: तीन डार्ट से भी अंतिम डबल तक नहीं पहुँचा जा सकता।`
      : `${f.score} ${f.darts} डार्ट में खत्म होता है — ${routeText(f)}। उतने ही डार्ट के ${f.routeCount} क्रम हैं।`),
    f => (f.bogey
      ? `${f.score} 分是 bogey 数：三镖也够不到能收的双倍。`
      : `${f.score} 分用 ${f.darts} 镖收掉——${routeText(f)}。同样镖数的打法有 ${f.routeCount} 种。`),
    f => (f.bogey
      ? `${f.score} 分是 bogey 數：三鏢也夠不到能收的雙倍。`
      : `${f.score} 分用 ${f.darts} 鏢收掉——${routeText(f)}。同樣鏢數的打法有 ${f.routeCount} 種。`),
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '마무리는 반드시 더블로 끝나야 합니다. 가운데 불(50)도 더블로 칩니다.',
      'S20은 싱글 20, D16은 더블 16, T20은 트리플 20입니다.',
      '한 다트로 끝나는 점수는 더블 스물과 가운데 불, 스물한 가지뿐입니다.',
      '세 다트로 못 끝내는 수가 일곱 개 있습니다 — 남기지 말아야 할 점수입니다.',
    ],
    [
      'A leg must end on a double. The bullseye (50) counts as one.',
      'S20 is a single 20, D16 a double 16, T20 a treble 20.',
      'Only twenty-one scores go out in a single dart: the twenty doubles and the bull.',
      'Seven scores cannot be finished in three darts — the ones you must not leave.',
    ],
    [
      'La partida debe acabar en un doble. La diana (50) cuenta como doble.',
      'S20 es un simple 20, D16 un doble 16 y T20 un triple 20.',
      'Solo veintiún puntajes se cierran con un dardo: los veinte dobles y la diana.',
      'Siete puntajes no se pueden cerrar en tres dardos: los que no hay que dejar.',
    ],
    [
      'A perna precisa terminar num dobro. A mosca (50) conta como dobro.',
      'S20 é um simples 20, D16 um dobro 16 e T20 um triplo 20.',
      'Só vinte e uma pontuações fecham num dardo: os vinte dobros e a mosca.',
      'Sete pontuações não fecham em três dardos — as que não se deve deixar.',
    ],
    [
      'フィニッシュは必ずダブルで終わります。ブル(50)もダブル扱いです。',
      'S20はシングル20、D16はダブル16、T20はトリプル20です。',
      '1本で終わる点はダブル20種とブルの二十一通りだけです。',
      '3本で終われない点が七つあります——残してはいけない点です。',
    ],
    [
      'Ein Leg muss auf einem Doppel enden. Das Bullseye (50) zählt als Doppel.',
      'S20 ist eine einfache 20, D16 ein Doppel 16, T20 ein Triple 20.',
      'Nur einundzwanzig Reststände gehen mit einem Dart: die zwanzig Doppel und das Bull.',
      'Sieben Stände lassen sich mit drei Darts nicht beenden — die darf man nicht stehen lassen.',
    ],
    [
      'Une manche doit finir sur un double. Le bull (50) compte comme un double.',
      'S20 est un simple 20, D16 un double 16, T20 un triple 20.',
      'Seuls vingt et un scores se terminent en une fléchette : les vingt doubles et le bull.',
      'Sept scores ne peuvent pas se finir en trois fléchettes — ceux qu’il ne faut pas laisser.',
    ],
    [
      'लेग हमेशा डबल पर खत्म होनी चाहिए। बुल्सआई (50) भी डबल गिना जाता है।',
      'S20 यानी सिंगल 20, D16 यानी डबल 16, T20 यानी ट्रिपल 20।',
      'एक ही डार्ट में केवल इक्कीस स्कोर खत्म होते हैं: बीस डबल और बुल।',
      'सात स्कोर तीन डार्ट में खत्म नहीं होते — इन्हें छोड़ना नहीं चाहिए।',
    ],
    [
      '一局必须以双倍结束，靶心（50）也算双倍。',
      'S20 是单倍 20，D16 是双倍 16，T20 是三倍 20。',
      '一镖就能收的分数只有二十一个：二十个双倍加靶心。',
      '有七个分数三镖收不掉——这些正是不该留的分数。',
    ],
    [
      '一局必須以雙倍結束，靶心（50）也算雙倍。',
      'S20 是單倍 20，D16 是雙倍 16，T20 是三倍 20。',
      '一鏢就能收的分數只有二十一個：二十個雙倍加靶心。',
      '有七個分數三鏢收不掉——這些正是不該留的分數。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '다트 마무리표 — 2점부터 170점까지',
    'Darts checkout chart — every score from 2 to 170',
    'Tabla de cierres de dardos — de 2 a 170',
    'Tabela de fechamentos de dardos — de 2 a 170',
    'ダーツのフィニッシュ表 — 2点から170点まで',
    'Darts-Finish-Tabelle — jeder Rest von 2 bis 170',
    'Table des finitions aux fléchettes — de 2 à 170',
    'डार्ट्स चेकआउट तालिका — 2 से 170 तक',
    '飞镖收尾表 — 从 2 分到 170 分',
    '飛鏢收尾表 — 從 2 分到 170 分',
  ),

  hubMetaDesc: T(
    '남은 점수마다 몇 다트에 끝나는지와 수순을 한 장씩. 세 다트로 못 끝내는 보기 수 일곱도 함께 정리했습니다.',
    'One page per score: how many darts it takes and which route to throw, including the seven bogey numbers that cannot be finished in three.',
    'Una página por puntaje: cuántos dardos hacen falta y qué recorrido lanzar, incluidos los siete números bogey que no se cierran en tres.',
    'Uma página por pontuação: quantos dardos são precisos e qual sequência lançar, incluindo os sete números bogey que não fecham em três.',
    '残り点ごとに何本で終わるかと投げ順を1ページずつ。3本で終われないボギー数七つもまとめました。',
    'Je eine Seite pro Rest: wie viele Darts nötig sind und welche Folge man wirft — samt der sieben Bogey-Zahlen, die mit drei Darts nicht gehen.',
    'Une page par score : combien de fléchettes et quel enchaînement, y compris les sept nombres bogey impossibles en trois fléchettes.',
    'हर स्कोर का एक पृष्ठ: कितने डार्ट और कौन-सा क्रम, साथ में वे सात बोगी नंबर जो तीन में खत्म नहीं होते।',
    '每个余分一页：几镖能收、该怎么投，也收录了三镖收不掉的七个 bogey 数。',
    '每個餘分一頁：幾鏢能收、該怎麼投，也收錄了三鏢收不掉的七個 bogey 數。',
  ),

  metaTitle: T<(f: DartsFacts) => string>(
    f => (f.bogey ? `${f.score}점 마무리 — 세 다트로는 안 됩니다` : `${f.score}점 마무리 — ${routeText(f)}`),
    f => (f.bogey ? `${f.score} checkout — not in three darts` : `${f.score} checkout — ${routeText(f)}`),
    f => (f.bogey ? `Cierre de ${f.score} — no en tres dardos` : `Cierre de ${f.score} — ${routeText(f)}`),
    f => (f.bogey ? `Fechamento de ${f.score} — não em três dardos` : `Fechamento de ${f.score} — ${routeText(f)}`),
    f => (f.bogey ? `${f.score}点のフィニッシュ — 3本では無理です` : `${f.score}点のフィニッシュ — ${routeText(f)}`),
    f => (f.bogey ? `${f.score} Finish — nicht mit drei Darts` : `${f.score} Finish — ${routeText(f)}`),
    f => (f.bogey ? `Finish de ${f.score} — pas en trois fléchettes` : `Finish de ${f.score} — ${routeText(f)}`),
    f => (f.bogey ? `${f.score} चेकआउट — तीन डार्ट में नहीं` : `${f.score} चेकआउट — ${routeText(f)}`),
    f => (f.bogey ? `${f.score} 分收尾 — 三镖收不掉` : `${f.score} 分收尾 — ${routeText(f)}`),
    f => (f.bogey ? `飛鏢 ${f.score} 分收尾 — 三鏢收不掉` : `飛鏢 ${f.score} 分收尾 — ${routeText(f)}`),
  ),

  metaDesc: T<(f: DartsFacts) => string>(
    f => (f.bogey
      ? `${f.score}점은 세 다트를 다 써도 더블로 끝낼 수 없는 일곱 수 가운데 하나입니다. 남기지 않도록 앞 다트에서 점수를 조절합니다.`
      : `${f.score}점은 ${f.darts}다트에 끝납니다. 수순은 ${routeText(f)}이고, 같은 다트 수로 끝나는 길이 ${f.routeCount}가지 있습니다.`),
    f => (f.bogey
      ? `${f.score} is one of the seven scores that three darts cannot finish. Adjust an earlier dart so you never leave it.`
      : `${f.score} goes out in ${f.darts} darts. The route is ${routeText(f)}, and ${f.routeCount} routes of that length exist.`),
    f => (f.bogey
      ? `${f.score} es uno de los siete puntajes que tres dardos no pueden cerrar. Ajusta un dardo anterior para no dejarlo.`
      : `${f.score} se cierra en ${f.darts} dardos. El recorrido es ${routeText(f)} y existen ${f.routeCount} de esa longitud.`),
    f => (f.bogey
      ? `${f.score} é uma das sete pontuações que três dardos não fecham. Ajuste um dardo anterior para não deixá-la.`
      : `${f.score} fecha em ${f.darts} dardos. A sequência é ${routeText(f)} e existem ${f.routeCount} desse tamanho.`),
    f => (f.bogey
      ? `${f.score}点は3本でも終われない七つの点のひとつです。残さないように手前の一本で点を調整します。`
      : `${f.score}点は${f.darts}本で終わります。順は${routeText(f)}で、同じ本数の道が${f.routeCount}通りあります。`),
    f => (f.bogey
      ? `${f.score} gehört zu den sieben Ständen, die drei Darts nicht beenden. Man stellt schon davor um, damit er gar nicht stehen bleibt.`
      : `${f.score} geht in ${f.darts} Darts. Die Folge ist ${routeText(f)}, und es gibt ${f.routeCount} Folgen dieser Länge.`),
    f => (f.bogey
      ? `${f.score} fait partie des sept scores que trois fléchettes ne peuvent finir. On ajuste une fléchette avant pour ne pas le laisser.`
      : `${f.score} se termine en ${f.darts} fléchettes. L’enchaînement est ${routeText(f)}, et il en existe ${f.routeCount} de cette longueur.`),
    f => (f.bogey
      ? `${f.score} उन सात स्कोर में है जिन्हें तीन डार्ट खत्म नहीं कर सकते। पहले वाले डार्ट से समायोजन कीजिए ताकि यह बचे ही नहीं।`
      : `${f.score} ${f.darts} डार्ट में खत्म होता है। क्रम ${routeText(f)} है और उतने ही डार्ट के ${f.routeCount} रास्ते हैं।`),
    f => (f.bogey
      ? `${f.score} 分是三镖收不掉的七个分数之一。要在前面的镖上调整，别把它留给自己。`
      : `${f.score} 分用 ${f.darts} 镖收掉。打法是 ${routeText(f)}，同镖数的路线共 ${f.routeCount} 条。`),
    f => (f.bogey
      ? `${f.score} 分是三鏢收不掉的七個分數之一。要在前面的鏢上調整，別把它留給自己。`
      : `${f.score} 分用 ${f.darts} 鏢收掉。打法是 ${routeText(f)}，同鏢數的路線共 ${f.routeCount} 條。`),
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '왜 더블로 끝내야 하나요?', a: '501이나 301 경기의 규칙입니다. 마지막 다트가 반드시 더블(가운데 불 포함)이어야 그 판이 끝납니다.' },
      { q: '한 번에 끝낼 수 있는 가장 큰 점수는요?', a: '170점입니다. T20·T20·가운데 불로 세 다트를 다 써야 합니다.' },
      { q: '보기(bogey) 수가 무엇인가요?', a: '세 다트로는 끝낼 수 없는 점수입니다 — 159·162·163·165·166·168·169 일곱 개입니다.' },
      { q: '수순이 표마다 조금씩 다른데요?', a: '같은 점수를 끝내는 길이 여러 가지라 그렇습니다. 여기서는 도중에 더블을 덜 쓰고 좋은 더블로 끝나는 쪽을 골랐습니다.' },
      { q: 'S20·D16·T20은 무슨 뜻인가요?', a: '각각 싱글 20, 더블 16, 트리플 20입니다. 판에서 그 구역의 어느 띠를 맞히는지를 가리킵니다.' },
    ],
    [
      { q: 'Why must a leg end on a double?', a: 'That is the rule in 501 and 301: the final dart has to land in a double — the bullseye counts as one.' },
      { q: 'What is the biggest score you can check out?', a: '170: treble 20, treble 20, bullseye. It uses all three darts.' },
      { q: 'What is a bogey number?', a: 'A score that three darts cannot finish — 159, 162, 163, 165, 166, 168 and 169.' },
      { q: 'Why do charts disagree about routes?', a: 'Because several routes finish the same score. Here the one that throws fewer doubles on the way and ends on a kinder double is chosen.' },
      { q: 'What do S20, D16 and T20 mean?', a: 'A single 20, a double 16 and a treble 20 — which band of that number you aim at.' },
    ],
    [
      { q: '¿Por qué hay que acabar en doble?', a: 'Es la regla del 501 y el 301: el último dardo debe caer en un doble, y la diana cuenta como tal.' },
      { q: '¿Cuál es el cierre más alto posible?', a: '170: triple 20, triple 20 y diana. Consume los tres dardos.' },
      { q: '¿Qué es un número bogey?', a: 'Un puntaje que tres dardos no pueden cerrar: 159, 162, 163, 165, 166, 168 y 169.' },
      { q: '¿Por qué las tablas no coinciden?', a: 'Porque hay varios recorridos para el mismo puntaje. Aquí se elige el que lanza menos dobles por el camino y acaba en un doble más amable.' },
      { q: '¿Qué significan S20, D16 y T20?', a: 'Un simple 20, un doble 16 y un triple 20: a qué anillo de ese número apuntas.' },
    ],
    [
      { q: 'Por que é preciso terminar num dobro?', a: 'É a regra do 501 e do 301: o último dardo tem de cair num dobro, e a mosca conta como tal.' },
      { q: 'Qual é o maior fechamento possível?', a: '170: triplo 20, triplo 20 e mosca. Gasta os três dardos.' },
      { q: 'O que é um número bogey?', a: 'Uma pontuação que três dardos não fecham: 159, 162, 163, 165, 166, 168 e 169.' },
      { q: 'Por que as tabelas divergem?', a: 'Porque há várias sequências para a mesma pontuação. Aqui escolhe-se a que lança menos dobros no caminho e termina num dobro mais gentil.' },
      { q: 'O que significam S20, D16 e T20?', a: 'Um simples 20, um dobro 16 e um triplo 20 — qual anel daquele número você mira.' },
    ],
    [
      { q: 'なぜダブルで終わらなければならないのですか？', a: '501や301の規則です。最後の一本がダブル(ブルを含む)でなければそのレグは終わりません。' },
      { q: '一度に終われる最大の点は？', a: '170点です。T20・T20・ブルで、3本すべてを使います。' },
      { q: 'ボギー数とは何ですか？', a: '3本では終われない点です——159・162・163・165・166・168・169の七つです。' },
      { q: '表によって順が違うのはなぜですか？', a: '同じ点を終える道が何通りもあるからです。ここでは途中でダブルを使わず、終わりの良いダブルになる方を選びました。' },
      { q: 'S20・D16・T20とは？', a: 'それぞれシングル20、ダブル16、トリプル20です。その数字のどの帯を狙うかを指します。' },
    ],
    [
      { q: 'Warum muss ein Leg auf einem Doppel enden?', a: 'So ist die Regel bei 501 und 301: Der letzte Dart muss in ein Doppel — das Bullseye zählt als eines.' },
      { q: 'Was ist das höchste mögliche Finish?', a: '170: Triple 20, Triple 20, Bullseye. Es braucht alle drei Darts.' },
      { q: 'Was ist eine Bogey-Zahl?', a: 'Ein Rest, den drei Darts nicht beenden können — 159, 162, 163, 165, 166, 168 und 169.' },
      { q: 'Warum weichen Tabellen bei den Folgen ab?', a: 'Weil mehrere Folgen denselben Rest beenden. Hier wird die gewählt, die unterwegs weniger Doppel wirft und auf einem freundlicheren Doppel endet.' },
      { q: 'Was bedeuten S20, D16 und T20?', a: 'Eine einfache 20, ein Doppel 16 und ein Triple 20 — welchen Ring der Zahl man anvisiert.' },
    ],
    [
      { q: 'Pourquoi finir sur un double ?', a: 'C’est la règle au 501 et au 301 : la dernière fléchette doit se planter dans un double — le bull en est un.' },
      { q: 'Quel est le plus gros finish possible ?', a: '170 : triple 20, triple 20, bull. Il faut les trois fléchettes.' },
      { q: 'Qu’est-ce qu’un nombre bogey ?', a: 'Un score que trois fléchettes ne peuvent finir : 159, 162, 163, 165, 166, 168 et 169.' },
      { q: 'Pourquoi les tables diffèrent-elles ?', a: 'Parce que plusieurs enchaînements terminent le même score. Ici on retient celui qui lance moins de doubles en route et finit sur un double plus commode.' },
      { q: 'Que veulent dire S20, D16 et T20 ?', a: 'Un simple 20, un double 16 et un triple 20 — quel anneau du numéro on vise.' },
    ],
    [
      { q: 'डबल पर खत्म करना क्यों ज़रूरी है?', a: '501 और 301 का यही नियम है: आखिरी डार्ट डबल में लगना चाहिए, और बुल्सआई भी डबल गिना जाता है।' },
      { q: 'सबसे बड़ा संभव चेकआउट क्या है?', a: '170: ट्रिपल 20, ट्रिपल 20 और बुल्सआई। तीनों डार्ट लग जाते हैं।' },
      { q: 'बोगी नंबर क्या है?', a: 'वह स्कोर जो तीन डार्ट में खत्म नहीं होता — 159, 162, 163, 165, 166, 168 और 169।' },
      { q: 'तालिकाओं में क्रम अलग क्यों होते हैं?', a: 'क्योंकि एक ही स्कोर के कई रास्ते हैं। यहाँ वही चुना गया जो रास्ते में कम डबल फेंके और बेहतर डबल पर खत्म हो।' },
      { q: 'S20, D16, T20 का क्या अर्थ है?', a: 'सिंगल 20, डबल 16 और ट्रिपल 20 — उस अंक के किस घेरे पर निशाना है।' },
    ],
    [
      { q: '为什么一定要以双倍结束？', a: '这是 501、301 的规则：最后一镖必须落在双倍里，靶心也算双倍。' },
      { q: '一次能收掉的最高分是多少？', a: '170 分：T20、T20、靶心，三镖全用上。' },
      { q: 'bogey 数是什么？', a: '三镖收不掉的分数——159、162、163、165、166、168、169 这七个。' },
      { q: '为什么各家表里的打法不一样？', a: '因为同一个分数有好几条路。这里选的是路上少投双倍、结尾落在更好收的双倍上的那条。' },
      { q: 'S20、D16、T20 是什么意思？', a: '分别是单倍 20、双倍 16、三倍 20——指瞄那个数字的哪一圈。' },
    ],
    [
      { q: '為什麼一定要以雙倍結束？', a: '這是 501、301 的規則：最後一鏢必須落在雙倍裡，靶心也算雙倍。' },
      { q: '一次能收掉的最高分是多少？', a: '170 分：T20、T20、靶心，三鏢全用上。' },
      { q: 'bogey 數是什麼？', a: '三鏢收不掉的分數——159、162、163、165、166、168、169 這七個。' },
      { q: '為什麼各家表裡的打法不一樣？', a: '因為同一個分數有好幾條路。這裡選的是路上少投雙倍、結尾落在更好收的雙倍上的那條。' },
      { q: 'S20、D16、T20 是什麼意思？', a: '分別是單倍 20、雙倍 16、三倍 20——指瞄那個數字的哪一圈。' },
    ],
  ),

  scoreFaq: T<(f: DartsFacts) => FaqItem[]>(
    f => [
      { q: `${f.score}점은 어떻게 끝내나요?`, a: f.bogey ? '세 다트로는 끝낼 수 없습니다. 앞 다트에서 점수를 조절해 남기지 않는 것이 답입니다.' : `${routeText(f)} 순으로 던집니다.` },
      { q: `몇 다트가 필요한가요?`, a: f.bogey ? '세 다트로는 안 됩니다.' : `${f.darts}다트입니다. 같은 다트 수의 길이 ${f.routeCount}가지 있습니다.` },
      { q: `마지막 다트는 무엇인가요?`, a: f.bogey ? '없습니다.' : `${f.route[f.route.length - 1].label}입니다. 마무리는 반드시 더블이어야 합니다.` },
    ],
    f => [
      { q: `How do you check out ${f.score}?`, a: f.bogey ? 'You cannot, not in three darts. The answer is to adjust earlier so this score is never left.' : `Throw ${routeText(f)}.` },
      { q: `How many darts does it take?`, a: f.bogey ? 'Three darts are not enough.' : `${f.darts}. There are ${f.routeCount} routes of that length.` },
      { q: `What is the last dart?`, a: f.bogey ? 'There is none.' : `${f.route[f.route.length - 1].label} — a checkout must end on a double.` },
    ],
    f => [
      { q: `¿Cómo se cierra ${f.score}?`, a: f.bogey ? 'No se puede en tres dardos. La solución es ajustar antes para no dejar este puntaje.' : `Lanzando ${routeText(f)}.` },
      { q: `¿Cuántos dardos hacen falta?`, a: f.bogey ? 'Tres dardos no bastan.' : `${f.darts}. Hay ${f.routeCount} recorridos de esa longitud.` },
      { q: `¿Cuál es el último dardo?`, a: f.bogey ? 'No hay.' : `${f.route[f.route.length - 1].label}: el cierre siempre acaba en doble.` },
    ],
    f => [
      { q: `Como fechar ${f.score}?`, a: f.bogey ? 'Não dá em três dardos. A saída é ajustar antes para nunca deixar essa pontuação.' : `Lançando ${routeText(f)}.` },
      { q: `Quantos dardos são precisos?`, a: f.bogey ? 'Três dardos não bastam.' : `${f.darts}. Há ${f.routeCount} sequências desse tamanho.` },
      { q: `Qual é o último dardo?`, a: f.bogey ? 'Não há.' : `${f.route[f.route.length - 1].label} — o fechamento termina sempre num dobro.` },
    ],
    f => [
      { q: `${f.score}点はどう終わりますか？`, a: f.bogey ? '3本では終われません。手前で点を調整して残さないのが答えです。' : `${routeText(f)}の順で投げます。` },
      { q: `何本必要ですか？`, a: f.bogey ? '3本では足りません。' : `${f.darts}本です。同じ本数の道が${f.routeCount}通りあります。` },
      { q: `最後の一本は？`, a: f.bogey ? 'ありません。' : `${f.route[f.route.length - 1].label}です。フィニッシュは必ずダブルです。` },
    ],
    f => [
      { q: `Wie checkt man ${f.score} aus?`, a: f.bogey ? 'Gar nicht — nicht mit drei Darts. Man stellt vorher um, damit dieser Rest nicht stehen bleibt.' : `Man wirft ${routeText(f)}.` },
      { q: `Wie viele Darts braucht es?`, a: f.bogey ? 'Drei Darts reichen nicht.' : `${f.darts}. Es gibt ${f.routeCount} Folgen dieser Länge.` },
      { q: `Was ist der letzte Dart?`, a: f.bogey ? 'Es gibt keinen.' : `${f.route[f.route.length - 1].label} — ein Finish endet immer auf einem Doppel.` },
    ],
    f => [
      { q: `Comment finir ${f.score} ?`, a: f.bogey ? 'Impossible en trois fléchettes. Il faut ajuster avant pour ne jamais laisser ce score.' : `En lançant ${routeText(f)}.` },
      { q: `Combien de fléchettes faut-il ?`, a: f.bogey ? 'Trois fléchettes ne suffisent pas.' : `${f.darts}. Il existe ${f.routeCount} enchaînements de cette longueur.` },
      { q: `Quelle est la dernière fléchette ?`, a: f.bogey ? 'Il n’y en a pas.' : `${f.route[f.route.length - 1].label} — un finish se termine toujours sur un double.` },
    ],
    f => [
      { q: `${f.score} कैसे खत्म करें?`, a: f.bogey ? 'तीन डार्ट में नहीं हो सकता। पहले ही समायोजन करें ताकि यह स्कोर बचे नहीं।' : `${routeText(f)} फेंकिए।` },
      { q: `कितने डार्ट चाहिए?`, a: f.bogey ? 'तीन डार्ट काफी नहीं।' : `${f.darts}। उतने ही डार्ट के ${f.routeCount} रास्ते हैं।` },
      { q: `आखिरी डार्ट कौन-सा है?`, a: f.bogey ? 'कोई नहीं।' : `${f.route[f.route.length - 1].label} — चेकआउट हमेशा डबल पर खत्म होता है।` },
    ],
    f => [
      { q: `${f.score} 分怎么收？`, a: f.bogey ? '三镖收不掉。办法是在前面就调整，别把这个分数留下。' : `按 ${routeText(f)} 投。` },
      { q: `需要几镖？`, a: f.bogey ? '三镖不够。' : `${f.darts} 镖。同镖数的路线有 ${f.routeCount} 条。` },
      { q: `最后一镖是什么？`, a: f.bogey ? '没有。' : `是 ${f.route[f.route.length - 1].label}——收尾一定要落在双倍上。` },
    ],
    f => [
      { q: `${f.score} 分怎麼收？`, a: f.bogey ? '三鏢收不掉。辦法是在前面就調整，別把這個分數留下。' : `按 ${routeText(f)} 投。` },
      { q: `需要幾鏢？`, a: f.bogey ? '三鏢不夠。' : `${f.darts} 鏢。同鏢數的路線有 ${f.routeCount} 條。` },
      { q: `最後一鏢是什麼？`, a: f.bogey ? '沒有。' : `是 ${f.route[f.route.length - 1].label}——收尾一定要落在雙倍上。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DARTS_UI: L<DartsUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DartsUI>;
