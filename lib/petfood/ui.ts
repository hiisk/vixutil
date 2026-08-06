/**
 * 반려동물 사료량 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "하루 열량은 체중에 비례하지 않는다"와 "계수는
 * 하나가 아니라 범위다" 둘이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PetFacts } from './facts.ts';
import type { Species } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface PetUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  stateName: (key: string) => string;
  speciesName: (s: Species) => string;
  weightLabel: string;
  rerLabel: string;
  linearLabel: string;
  gapLabel: string;
  factorLabel: string;
  kcalLabel: string;
  gramLabel: string;
  densityLabel: string;
  rerTitle: string;
  rerNote: string;
  rangeTitle: string;
  rangeNote: string;
  linearTitle: string;
  linearNote: string;
  foodTitle: string;
  foodNote: string;
  vetTitle: string;
  vetNote: string;
  tableTitle: string;
  neighbourTitle: string;
  stateRowTitle: string;
  weightRowTitle: string;
  desc: (f: PetFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PetFacts) => string;
  metaDesc: (f: PetFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: PetFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;

/** 상태 이름 열 개씩 — 화면과 검색 결과가 같은 말을 쓴다 */
const stKo: Names = {
  'dog-puppy': '강아지 4개월 미만', 'dog-junior': '강아지 4개월~1년', 'dog-intact': '중성화 안 한 성견',
  'dog-neutered': '중성화한 성견', 'dog-diet': '감량이 필요한 개',
  'cat-kitten': '고양이 4개월 미만', 'cat-junior': '고양이 4개월~1년', 'cat-intact': '중성화 안 한 성묘',
  'cat-neutered': '중성화한 성묘', 'cat-diet': '감량이 필요한 고양이',
};
const stEn: Names = {
  'dog-puppy': 'puppy under 4 months', 'dog-junior': 'puppy 4–12 months', 'dog-intact': 'intact adult dog',
  'dog-neutered': 'neutered adult dog', 'dog-diet': 'dog losing weight',
  'cat-kitten': 'kitten under 4 months', 'cat-junior': 'kitten 4–12 months', 'cat-intact': 'intact adult cat',
  'cat-neutered': 'neutered adult cat', 'cat-diet': 'cat losing weight',
};
const stEs: Names = {
  'dog-puppy': 'cachorro menor de 4 meses', 'dog-junior': 'cachorro de 4 a 12 meses', 'dog-intact': 'perro adulto entero',
  'dog-neutered': 'perro adulto esterilizado', 'dog-diet': 'perro en pérdida de peso',
  'cat-kitten': 'gatito menor de 4 meses', 'cat-junior': 'gatito de 4 a 12 meses', 'cat-intact': 'gato adulto entero',
  'cat-neutered': 'gato adulto esterilizado', 'cat-diet': 'gato en pérdida de peso',
};
const stPt: Names = {
  'dog-puppy': 'filhote com menos de 4 meses', 'dog-junior': 'filhote de 4 a 12 meses', 'dog-intact': 'cão adulto inteiro',
  'dog-neutered': 'cão adulto castrado', 'dog-diet': 'cão em perda de peso',
  'cat-kitten': 'gatinho com menos de 4 meses', 'cat-junior': 'gatinho de 4 a 12 meses', 'cat-intact': 'gato adulto inteiro',
  'cat-neutered': 'gato adulto castrado', 'cat-diet': 'gato em perda de peso',
};
const stJa: Names = {
  'dog-puppy': '子犬 4か月未満', 'dog-junior': '子犬 4か月〜1歳', 'dog-intact': '未去勢の成犬',
  'dog-neutered': '去勢した成犬', 'dog-diet': '減量中の犬',
  'cat-kitten': '子猫 4か月未満', 'cat-junior': '子猫 4か月〜1歳', 'cat-intact': '未去勢の成猫',
  'cat-neutered': '去勢した成猫', 'cat-diet': '減量中の猫',
};
const stDe: Names = {
  'dog-puppy': 'Welpe unter 4 Monaten', 'dog-junior': 'Welpe 4–12 Monate', 'dog-intact': 'unkastrierter erwachsener Hund',
  'dog-neutered': 'kastrierter erwachsener Hund', 'dog-diet': 'Hund beim Abnehmen',
  'cat-kitten': 'Kätzchen unter 4 Monaten', 'cat-junior': 'Kätzchen 4–12 Monate', 'cat-intact': 'unkastrierte erwachsene Katze',
  'cat-neutered': 'kastrierte erwachsene Katze', 'cat-diet': 'Katze beim Abnehmen',
};
const stFr: Names = {
  'dog-puppy': 'chiot de moins de 4 mois', 'dog-junior': 'chiot de 4 à 12 mois', 'dog-intact': 'chien adulte entier',
  'dog-neutered': 'chien adulte stérilisé', 'dog-diet': 'chien en perte de poids',
  'cat-kitten': 'chaton de moins de 4 mois', 'cat-junior': 'chaton de 4 à 12 mois', 'cat-intact': 'chat adulte entier',
  'cat-neutered': 'chat adulte stérilisé', 'cat-diet': 'chat en perte de poids',
};
const stHi: Names = {
  'dog-puppy': '4 महीने से छोटा पिल्ला', 'dog-junior': '4–12 महीने का पिल्ला', 'dog-intact': 'बिना नसबंदी वयस्क कुत्ता',
  'dog-neutered': 'नसबंदी किया वयस्क कुत्ता', 'dog-diet': 'वज़न घटाता कुत्ता',
  'cat-kitten': '4 महीने से छोटा बिल्ली का बच्चा', 'cat-junior': '4–12 महीने का बिल्ली का बच्चा', 'cat-intact': 'बिना नसबंदी वयस्क बिल्ली',
  'cat-neutered': 'नसबंदी की वयस्क बिल्ली', 'cat-diet': 'वज़न घटाती बिल्ली',
};
const stZh: Names = {
  'dog-puppy': '4 个月以下幼犬', 'dog-junior': '4~12 个月幼犬', 'dog-intact': '未绝育成犬',
  'dog-neutered': '已绝育成犬', 'dog-diet': '减重中的狗',
  'cat-kitten': '4 个月以下幼猫', 'cat-junior': '4~12 个月幼猫', 'cat-intact': '未绝育成猫',
  'cat-neutered': '已绝育成猫', 'cat-diet': '减重中的猫',
};
const stTw: Names = {
  'dog-puppy': '4 個月以下幼犬', 'dog-junior': '4~12 個月幼犬', 'dog-intact': '未結紮成犬',
  'dog-neutered': '已結紮成犬', 'dog-diet': '減重中的狗',
  'cat-kitten': '4 個月以下幼貓', 'cat-junior': '4~12 個月幼貓', 'cat-intact': '未結紮成貓',
  'cat-neutered': '已結紮成貓', 'cat-diet': '減重中的貓',
};

const namer = (m: Names) => (key: string) => m[key] ?? key;

type Spec = { [K in keyof PetUI]: L<PetUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('반려동물 사료량', 'Pet food amounts', 'Ración para mascotas', 'Ração para pets', 'ペットの食事量', 'Futtermenge', 'Ration pour animaux', 'पालतू आहार मात्रा', '宠物喂食量', '寵物餵食量'),

  hubTitle: T(
    '반려동물 사료량 100칸 — 열량은 체중에 비례하지 않습니다',
    '100 pet feeding cells — calories do not scale with body weight',
    '100 raciones — las calorías no escalan con el peso',
    '100 rações — as calorias não escalam com o peso',
    'ペットの食事量100マス — カロリーは体重に比例しません',
    '100 Futtermengen — Kalorien wachsen nicht proportional zum Gewicht',
    '100 rations — les calories ne suivent pas le poids',
    '100 आहार खाने — कैलोरी वज़न के अनुपात में नहीं बढ़ती',
    '100 格喂食量 — 热量并不与体重成正比',
    '100 格餵食量 — 熱量並不與體重成正比',
  ),

  hubLead: T(
    '기초대사량은 체중의 0.75제곱에 비례합니다. 그래서 16배 무거운 개가 16배가 아니라 8배를 먹습니다. 종·상태 열 가지와 체중 열 가지가 만나는 칸마다 하루 열량과 사료 그램을 계산했습니다.',
    'Resting energy scales with body weight to the power of 0.75, so a dog sixteen times heavier eats eight times as much, not sixteen. Every meeting of 10 life stages and 10 body weights gets a daily calorie figure and a gram amount.',
    'La energía en reposo escala con el peso elevado a 0,75: un perro dieciséis veces más pesado come ocho veces más, no dieciséis. Cada cruce de 10 etapas y 10 pesos trae calorías diarias y gramos.',
    'A energia em repouso escala com o peso elevado a 0,75: um cão dezesseis vezes mais pesado come oito vezes mais, não dezesseis. Cada cruzamento de 10 fases e 10 pesos traz calorias diárias e gramas.',
    '安静時のエネルギー要求量は体重の0.75乗に比例します。だから16倍重い犬は16倍ではなく8倍食べます。種と状態10通り、体重10通りが出会う各マスの1日カロリーとグラム数を計算しました。',
    'Der Ruheenergiebedarf wächst mit dem Gewicht hoch 0,75 — ein sechzehnmal schwererer Hund frisst achtmal so viel, nicht sechzehnmal. Jede Begegnung von 10 Lebensphasen und 10 Gewichten bringt Tageskalorien und Gramm.',
    'Le besoin énergétique de repos suit le poids à la puissance 0,75 : un chien seize fois plus lourd mange huit fois plus, pas seize. Chaque croisement de 10 stades et 10 poids donne les calories du jour et les grammes.',
    'विश्राम ऊर्जा वज़न की 0.75 घात के अनुपात में बढ़ती है — सोलह गुना भारी कुत्ता सोलह नहीं, आठ गुना खाता है। 10 अवस्थाओं और 10 वज़नों के हर मेल के लिए दैनिक कैलोरी और ग्राम।',
    '静息能量需求与体重的 0.75 次方成正比，所以重十六倍的狗吃的是八倍而不是十六倍。10 种状态与 10 种体重交汇的每一格，都算出每日热量与克数。',
    '靜息能量需求與體重的 0.75 次方成正比，所以重十六倍的狗吃的是八倍而不是十六倍。10 種狀態與 10 種體重交匯的每一格，都算出每日熱量與克數。',
  ),

  stateName: T<(key: string) => string>(
    namer(stKo), namer(stEn), namer(stEs), namer(stPt), namer(stJa),
    namer(stDe), namer(stFr), namer(stHi), namer(stZh), namer(stTw),
  ),

  speciesName: T<(s: Species) => string>(
    s => (s === 'dog' ? '개' : '고양이'),
    s => (s === 'dog' ? 'dog' : 'cat'),
    s => (s === 'dog' ? 'perro' : 'gato'),
    s => (s === 'dog' ? 'cão' : 'gato'),
    s => (s === 'dog' ? '犬' : '猫'),
    s => (s === 'dog' ? 'Hund' : 'Katze'),
    s => (s === 'dog' ? 'chien' : 'chat'),
    s => (s === 'dog' ? 'कुत्ता' : 'बिल्ली'),
    s => (s === 'dog' ? '狗' : '猫'),
    s => (s === 'dog' ? '狗' : '貓'),
  ),

  weightLabel: T('체중', 'Body weight', 'Peso', 'Peso', '体重', 'Körpergewicht', 'Poids', 'वज़न', '体重', '體重'),
  rerLabel: T('기초대사량', 'Resting energy', 'Energía en reposo', 'Energia em repouso', '安静時エネルギー', 'Ruheenergiebedarf', 'Énergie de repos', 'विश्राम ऊर्जा', '静息能量', '靜息能量'),
  linearLabel: T('선형 어림식', 'Linear shortcut', 'Atajo lineal', 'Atalho linear', '線形の近似式', 'Lineare Faustformel', 'Formule linéaire', 'रैखिक सूत्र', '线性近似式', '線性近似式'),
  gapLabel: T('두 식의 차이', 'Gap between the two', 'Diferencia entre ambas', 'Diferença entre as duas', '2式の差', 'Abweichung der beiden', 'Écart entre les deux', 'दोनों का अंतर', '两式之差', '兩式之差'),
  factorLabel: T('상태 계수', 'Life-stage factor', 'Factor de etapa', 'Fator de fase', '状態係数', 'Lebensphasen-Faktor', 'Facteur de stade', 'अवस्था गुणक', '状态系数', '狀態係數'),
  kcalLabel: T('하루 열량', 'Daily calories', 'Calorías diarias', 'Calorias diárias', '1日のカロリー', 'Tageskalorien', 'Calories par jour', 'दैनिक कैलोरी', '每日热量', '每日熱量'),
  gramLabel: T('하루 사료량', 'Daily amount', 'Ración diaria', 'Ração diária', '1日の給餌量', 'Tagesmenge', 'Ration quotidienne', 'दैनिक मात्रा', '每日喂食量', '每日餵食量'),
  densityLabel: T('사료 열량 밀도', 'Food energy density', 'Densidad energética', 'Densidade energética', 'フードの熱量密度', 'Energiedichte des Futters', 'Densité énergétique', 'आहार ऊर्जा घनत्व', '饲料热量密度', '飼料熱量密度'),

  rerTitle: T('0.75제곱이라는 것', 'Why the 0.75 power', 'Por qué el exponente 0,75', 'Por que o expoente 0,75', '0.75乗という点', 'Warum hoch 0,75', 'Pourquoi la puissance 0,75', '0.75 घात क्यों', '为什么是 0.75 次方', '為什麼是 0.75 次方'),

  rerNote: T(
    '기초대사량은 70 × 체중^0.75로 잡습니다. 몸이 커질수록 겉넓이가 부피만큼 빨리 늘지 않아, 큰 몸이 단위 무게당 열을 덜 잃기 때문입니다. 그래서 32kg 개는 2kg 개의 열여섯 배가 아니라 여덟 배를 먹습니다(16^0.75 = 8). 체중에 비례한다고 생각하고 계산하면 큰 개는 너무 많이, 작은 개는 너무 적게 주게 됩니다.',
    'Resting energy is taken as 70 × weight^0.75. Surface area does not grow as fast as volume, so a larger body loses less heat per kilogram. A 32 kg dog therefore eats eight times what a 2 kg dog eats, not sixteen times (16^0.75 = 8). Assume a straight proportion and you overfeed the big dog and underfeed the small one.',
    'La energía en reposo se toma como 70 × peso^0,75. La superficie no crece tan rápido como el volumen, así que un cuerpo mayor pierde menos calor por kilo. Un perro de 32 kg come ocho veces lo de uno de 2 kg, no dieciséis (16^0,75 = 8). Si supones proporción directa, sobrealimentas al grande y quedas corto con el pequeño.',
    'A energia em repouso é tomada como 70 × peso^0,75. A superfície não cresce tão rápido quanto o volume, então um corpo maior perde menos calor por quilo. Um cão de 32 kg come oito vezes o de um de 2 kg, não dezesseis (16^0,75 = 8). Supondo proporção direta, você exagera com o grande e falta para o pequeno.',
    '安静時エネルギーは70 × 体重^0.75で取ります。体が大きくなるほど表面積は体積ほど速く増えず、大きな体は体重あたりの熱を失いにくいからです。だから32kgの犬は2kgの犬の16倍ではなく8倍食べます(16^0.75 = 8)。体重に比例すると考えると大型犬には多すぎ、小型犬には少なすぎになります。',
    'Der Ruhebedarf wird als 70 × Gewicht^0,75 angesetzt. Die Oberfläche wächst langsamer als das Volumen, ein größerer Körper verliert je Kilogramm weniger Wärme. Ein 32-kg-Hund frisst daher das Achtfache eines 2-kg-Hundes, nicht das Sechzehnfache (16^0,75 = 8). Rechnet man proportional, bekommt der große zu viel und der kleine zu wenig.',
    'L’énergie de repos vaut 70 × poids^0,75. La surface ne croît pas aussi vite que le volume : un grand corps perd moins de chaleur par kilo. Un chien de 32 kg mange huit fois ce que mange un chien de 2 kg, pas seize (16^0,75 = 8). En raisonnant proportionnellement, on suralimente le grand et on sous-alimente le petit.',
    'विश्राम ऊर्जा 70 × वज़न^0.75 मानी जाती है। सतह क्षेत्रफल आयतन जितनी तेज़ी से नहीं बढ़ता, इसलिए बड़ा शरीर प्रति किलो कम ऊष्मा खोता है। 32 किलो का कुत्ता 2 किलो वाले से सोलह नहीं, आठ गुना खाता है (16^0.75 = 8)। सीधा अनुपात मानने पर बड़े को ज़्यादा और छोटे को कम मिलता है।',
    '静息能量取 70 × 体重^0.75。体表面积不像体积那样快速增长，所以大身体每公斤散热更少。因此 32kg 的狗吃的是 2kg 狗的八倍而非十六倍（16^0.75 = 8）。若按体重成正比来算，大狗会喂多，小狗会喂少。',
    '靜息能量取 70 × 體重^0.75。體表面積不像體積那樣快速增長，所以大身體每公斤散熱更少。因此 32kg 的狗吃的是 2kg 狗的八倍而非十六倍（16^0.75 = 8）。若按體重成正比來算，大狗會餵多，小狗會餵少。',
  ),

  rangeTitle: T('계수를 하나로 적지 않은 이유', 'Why the factor is a range', 'Por qué el factor es un rango', 'Por que o fator é uma faixa', '係数を1つにしなかった理由', 'Warum der Faktor eine Spanne ist', 'Pourquoi le facteur est une plage', 'गुणक एक संख्या क्यों नहीं', '为什么系数是一个区间', '為什麼係數是一個區間'),

  rangeNote: T(
    '널리 인용되는 표들이 서로 다른 숫자를 씁니다. 중성화한 성견을 어디는 1.6 하나로, 어디는 1.4~1.6으로 적고, 감량은 기준 자체가 갈립니다 — 지금 체중에 0.8을 곱하는 쪽과 목표 체중에 1.0을 곱하는 쪽입니다. 하나를 골라 적으면 다른 표를 본 사람에게는 틀린 값이 되므로, 여기서는 아래끝과 위끝을 모두 계산해 폭을 보입니다.',
    'The widely quoted tables disagree. A neutered adult dog is 1.6 in one and 1.4–1.6 in another, and weight loss splits on what the number even applies to — 0.8 of the current weight in one convention, 1.0 of the target weight in the other. Picking one number would be wrong for anyone holding the other table, so both ends are computed here.',
    'Las tablas más citadas no coinciden. Un perro adulto esterilizado es 1,6 en una y 1,4–1,6 en otra, y en pérdida de peso cambia hasta el punto de partida: 0,8 del peso actual en un criterio, 1,0 del peso objetivo en el otro. Elegir un número sería erróneo para quien mire la otra tabla, así que aquí se calculan ambos extremos.',
    'As tabelas mais citadas discordam. Um cão adulto castrado é 1,6 em uma e 1,4–1,6 em outra, e na perda de peso muda até a referência: 0,8 do peso atual num critério, 1,0 do peso alvo no outro. Escolher um número seria errado para quem consulta a outra tabela, então aqui os dois extremos são calculados.',
    '広く引用される表どうしが違う数字を使っています。去勢した成犬をある表は1.6の1つで、別の表は1.4〜1.6で書き、減量にいたっては基準そのものが分かれます — 今の体重に0.8を掛ける流儀と、目標体重に1.0を掛ける流儀です。1つを選んで書けば別の表を見た人には誤りになるので、ここでは下端と上端の両方を計算します。',
    'Die viel zitierten Tabellen widersprechen sich. Ein kastrierter erwachsener Hund steht mal bei 1,6, mal bei 1,4–1,6, und beim Abnehmen unterscheidet sich schon der Bezug: 0,8 des aktuellen Gewichts in der einen Konvention, 1,0 des Zielgewichts in der anderen. Eine Zahl auszuwählen wäre für jeden mit der anderen Tabelle falsch — darum werden hier beide Enden gerechnet.',
    'Les tableaux les plus cités ne s’accordent pas. Un chien adulte stérilisé vaut 1,6 ici et 1,4–1,6 là, et pour la perte de poids c’est la référence même qui change : 0,8 du poids actuel d’un côté, 1,0 du poids cible de l’autre. Choisir un chiffre serait faux pour qui consulte l’autre table ; les deux bornes sont donc calculées.',
    'व्यापक रूप से उद्धृत तालिकाएँ आपस में मेल नहीं खातीं। नसबंदी किए वयस्क कुत्ते को कोई 1.6 लिखता है तो कोई 1.4–1.6, और वज़न घटाने में तो आधार ही अलग है — एक में मौजूदा वज़न का 0.8, दूसरे में लक्ष्य वज़न का 1.0। एक संख्या चुनना दूसरी तालिका देखने वाले के लिए ग़लत होगा, इसलिए यहाँ दोनों सिरे गिने जाते हैं।',
    '广泛引用的几张表并不一致。已绝育成犬在一处写 1.6，在另一处写 1.4~1.6；减重更是连基准都不同——一种按当前体重乘 0.8，另一种按目标体重乘 1.0。只写一个数字，对照另一张表的人就会拿到错的值，所以这里把上下两端都算出来。',
    '廣泛引用的幾張表並不一致。已結紮成犬在一處寫 1.6，在另一處寫 1.4~1.6；減重更是連基準都不同——一種按目前體重乘 0.8，另一種按目標體重乘 1.0。只寫一個數字，對照另一張表的人就會拿到錯的值，所以這裡把上下兩端都算出來。',
  ),

  linearTitle: T('30 × 체중 + 70은 어디서 갈리나', 'Where the 30 × weight + 70 shortcut breaks', 'Dónde falla el atajo 30 × peso + 70', 'Onde o atalho 30 × peso + 70 falha', '30 × 体重 + 70はどこでずれるか', 'Wo 30 × Gewicht + 70 abweicht', 'Où l’astuce 30 × poids + 70 dérape', '30 × वज़न + 70 कहाँ चूकता है', '30 × 体重 + 70 在哪里失准', '30 × 體重 + 70 在哪裡失準'),

  linearNote: T(
    '국내 글이 자주 쓰는 어림식입니다. 지수 곡선과 **두 번** 만납니다 — 3kg 언저리와 20kg 언저리입니다. 그 사이에서는 어림식이 낮게 나오고, 밖에서는 높게 나옵니다. 40kg 개라면 어림식이 지수식보다 14%쯤 높습니다. 어느 식을 썼는지가 답을 바꾸므로 이 표는 둘 다 냅니다.',
    'This is the shortcut most local guides use. It meets the exponential curve **twice** — around 3 kg and around 20 kg. Between those points it reads low; outside them it reads high. For a 40 kg dog it sits about 14 % above the exponential figure. Which formula was used changes the answer, so this table gives both.',
    'Es el atajo que usan la mayoría de las guías. Corta la curva exponencial **dos veces**: cerca de 3 kg y cerca de 20 kg. Entre esos puntos queda por debajo; fuera, por encima. Para un perro de 40 kg está un 14 % por encima. Qué fórmula se usó cambia la respuesta, así que aquí van las dos.',
    'É o atalho que a maioria dos guias usa. Cruza a curva exponencial **duas vezes**: perto de 3 kg e perto de 20 kg. Entre esses pontos fica abaixo; fora deles, acima. Para um cão de 40 kg fica cerca de 14 % acima. Qual fórmula foi usada muda a resposta, então esta tabela dá as duas.',
    '国内の記事がよく使う近似式です。指数曲線と**2回**交わります — 3kg前後と20kg前後です。その間では低く出て、外では高く出ます。40kgの犬なら指数式より14%ほど高くなります。どちらの式を使ったかで答えが変わるので、この表は両方を出します。',
    'Diese Faustformel steht in den meisten Ratgebern. Sie schneidet die Exponentialkurve **zweimal** — bei etwa 3 kg und etwa 20 kg. Dazwischen liegt sie darunter, außerhalb darüber. Bei einem 40-kg-Hund rund 14 % über dem Exponentialwert. Welche Formel benutzt wurde, ändert das Ergebnis — hier stehen beide.',
    'C’est le raccourci employé par la plupart des guides. Il croise la courbe exponentielle **deux fois** : vers 3 kg et vers 20 kg. Entre les deux il sous-estime, en dehors il surestime. Pour un chien de 40 kg, il dépasse l’exponentielle d’environ 14 %. La formule choisie change la réponse : les deux figurent ici.',
    'यह वही सूत्र है जो अधिकतर मार्गदर्शिकाएँ इस्तेमाल करती हैं। यह घातांकी वक्र को **दो बार** काटता है — लगभग 3 किलो और लगभग 20 किलो पर। इनके बीच यह कम बताता है, बाहर ज़्यादा। 40 किलो के कुत्ते पर यह घातांकी मान से करीब 14% ऊपर है। कौन सा सूत्र चुना गया, उत्तर बदल देता है — इसलिए यहाँ दोनों हैं।',
    '这是本地攻略最常用的近似式。它与指数曲线相交**两次**——约 3kg 和约 20kg。两点之间它偏低，两点之外偏高。对 40kg 的狗，它比指数式高约 14%。用哪个式子会改变答案，所以这张表两个都给。',
    '這是本地攻略最常用的近似式。它與指數曲線相交**兩次**——約 3kg 和約 20kg。兩點之間它偏低，兩點之外偏高。對 40kg 的狗，它比指數式高約 14%。用哪個式子會改變答案，所以這張表兩個都給。',
  ),

  foodTitle: T('포장지의 kcal를 확인하세요', 'Check the kcal on the bag', 'Mira las kcal del envase', 'Confira as kcal do pacote', 'パッケージのkcalを確認', 'Kalorien auf der Packung prüfen', 'Vérifiez les kcal sur le sac', 'पैकेट पर kcal देखें', '看包装上的 kcal', '看包裝上的 kcal'),

  foodNote: T(
    '그램은 열량을 사료의 열량 밀도로 나눈 값입니다. 건사료는 대개 100g에 350~400kcal이라 여기서는 3.5와 4.0 두 가지로 냈습니다. 포장지에 적힌 값이 다르면 하루 열량을 그 값으로 나누십시오 — 습식은 밀도가 훨씬 낮아 그램이 크게 늘어납니다.',
    'The gram figure is the calorie figure divided by the food’s energy density. Dry food usually runs 350–400 kcal per 100 g, so both 3.5 and 4.0 are shown. If the bag says something else, divide the daily calories by that number instead — wet food is far less dense, so the grams rise sharply.',
    'Los gramos son las calorías divididas entre la densidad energética del alimento. El pienso suele estar entre 350 y 400 kcal por 100 g, así que se muestran 3,5 y 4,0. Si el envase indica otra cifra, divide entre esa — el húmedo es mucho menos denso y los gramos suben bastante.',
    'Os gramas são as calorias divididas pela densidade energética do alimento. A ração seca costuma ter 350–400 kcal por 100 g, então aparecem 3,5 e 4,0. Se o pacote disser outro valor, divida por ele — a úmida é bem menos densa e os gramas sobem muito.',
    'グラム数はカロリーをフードの熱量密度で割った値です。ドライフードは100gあたり350〜400kcalが多いので、3.5と4.0の2通りで出しました。パッケージの値が違えば、その値で1日のカロリーを割ってください — ウェットは密度がずっと低く、グラム数が大きく増えます。',
    'Die Gramm ergeben sich aus den Kalorien geteilt durch die Energiedichte des Futters. Trockenfutter liegt meist bei 350–400 kcal je 100 g, daher stehen hier 3,5 und 4,0. Steht auf der Packung etwas anderes, damit rechnen — Nassfutter ist deutlich dünner, die Gramm steigen stark.',
    'Les grammes sont les calories divisées par la densité énergétique de l’aliment. Les croquettes tournent autour de 350–400 kcal pour 100 g, d’où les valeurs 3,5 et 4,0. Si le sac indique autre chose, divisez par ce chiffre — la pâtée est bien moins dense et les grammes grimpent.',
    'ग्राम = कैलोरी ÷ आहार का ऊर्जा घनत्व। सूखा आहार आमतौर पर 100 ग्राम में 350–400 kcal होता है, इसलिए 3.5 और 4.0 दोनों दिए हैं। पैकेट पर कुछ और लिखा हो तो उसी से भाग दें — गीला आहार बहुत कम घना होता है, ग्राम काफ़ी बढ़ जाते हैं।',
    '克数是热量除以饲料的热量密度。干粮通常每 100g 有 350~400kcal，所以这里给了 3.5 和 4.0 两种。包装上写的不同，就用那个数字去除每日热量——湿粮密度低得多，克数会明显变大。',
    '克數是熱量除以飼料的熱量密度。乾糧通常每 100g 有 350~400kcal，所以這裡給了 3.5 和 4.0 兩種。包裝上寫的不同，就用那個數字去除每日熱量——濕糧密度低得多，克數會明顯變大。',
  ),

  vetTitle: T('출발점이지 처방이 아닙니다', 'A starting point, not a prescription', 'Un punto de partida, no una receta', 'Um ponto de partida, não uma prescrição', '出発点であって処方ではありません', 'Ein Ausgangspunkt, keine Verordnung', 'Un point de départ, pas une prescription', 'शुरुआत है, नुस्खा नहीं', '这是起点，不是处方', '這是起點，不是處方'),

  vetNote: T(
    '같은 체중이라도 활동량·품종·나이·질환에 따라 실제 필요량이 30%까지 벌어집니다. 이 값으로 2주쯤 먹여 보고 체중과 몸 상태를 다시 재는 편이 낫습니다. 질환이 있거나 감량이 필요하면 수의사와 상의하십시오 — 특히 고양이는 갑자기 적게 먹으면 위험합니다.',
    'At the same weight, real needs vary by up to 30 % with activity, breed, age, and illness. Feed at this level for a couple of weeks, then weigh and reassess. Talk to a vet for any medical condition or planned weight loss — cats in particular must never drop their intake abruptly.',
    'Con el mismo peso, las necesidades reales varían hasta un 30 % según actividad, raza, edad y enfermedad. Alimenta a este nivel un par de semanas y vuelve a pesar. Consulta al veterinario ante cualquier enfermedad o plan de adelgazamiento: en gatos, bajar la ingesta de golpe es peligroso.',
    'No mesmo peso, a necessidade real varia até 30 % com atividade, raça, idade e doença. Alimente nesse nível por duas semanas e pese de novo. Fale com o veterinário em caso de doença ou plano de emagrecimento — em gatos, cortar a ingestão de repente é perigoso.',
    '同じ体重でも活動量・犬種・年齢・疾患で実際の必要量は30%ほど変わります。この値で2週間ほど与えてから体重と体型を測り直すのがよいです。疾患がある場合や減量が必要な場合は獣医に相談してください — とくに猫は急に食べる量を減らすと危険です。',
    'Bei gleichem Gewicht schwankt der echte Bedarf um bis zu 30 % — je nach Aktivität, Rasse, Alter und Krankheit. Zwei Wochen so füttern, dann wiegen und neu beurteilen. Bei Erkrankungen oder geplanter Gewichtsabnahme zum Tierarzt — gerade Katzen dürfen ihre Menge nie abrupt senken.',
    'À poids égal, les besoins réels varient jusqu’à 30 % selon l’activité, la race, l’âge et la maladie. Nourrissez à ce niveau deux semaines, puis repesez. Consultez un vétérinaire en cas de maladie ou de régime — chez le chat surtout, une baisse brutale des rations est dangereuse.',
    'एक ही वज़न पर भी वास्तविक ज़रूरत गतिविधि, नस्ल, उम्र और बीमारी से 30% तक बदलती है। दो हफ़्ते इसी मात्रा पर खिलाकर फिर तौलें। बीमारी या वज़न घटाने की योजना हो तो पशु-चिकित्सक से बात करें — बिल्लियों में अचानक मात्रा घटाना ख़तरनाक है।',
    '体重相同，实际需求也会因活动量、品种、年龄和疾病相差多达 30%。按这个量喂两周，再称重并重新评估。有疾病或要减重请咨询兽医——尤其猫，突然减少进食很危险。',
    '體重相同，實際需求也會因活動量、品種、年齡和疾病相差多達 30%。按這個量餵兩週，再秤重並重新評估。有疾病或要減重請諮詢獸醫——尤其貓，突然減少進食很危險。',
  ),

  tableTitle: T('상태와 체중으로 찾기', 'Find it by stage and weight', 'Búscalo por etapa y peso', 'Ache por fase e peso', '状態と体重から探す', 'Nach Phase und Gewicht suchen', 'Chercher par stade et poids', 'अवस्था और वज़न से देखें', '按状态和体重查找', '按狀態和體重查找'),
  neighbourTitle: T('가까운 체중', 'Nearby weights', 'Pesos cercanos', 'Pesos próximos', '近い体重', 'Gewichte daneben', 'Poids voisins', 'पास के वज़न', '相邻体重', '相鄰體重'),
  stateRowTitle: T('같은 상태, 다른 체중', 'Same stage, other weights', 'Misma etapa, otros pesos', 'Mesma fase, outros pesos', '同じ状態、別の体重', 'Gleiche Phase, andere Gewichte', 'Même stade, autres poids', 'वही अवस्था, दूसरे वज़न', '同一状态，不同体重', '同一狀態，不同體重'),
  weightRowTitle: T('같은 체중, 다른 상태', 'Same weight, other stages', 'Mismo peso, otras etapas', 'Mesmo peso, outras fases', '同じ体重、別の状態', 'Gleiches Gewicht, andere Phasen', 'Même poids, autres stades', 'वही वज़न, दूसरी अवस्थाएँ', '同一体重，不同状态', '同一體重，不同狀態'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '기초대사량 = 70 × 체중의 0.75제곱. 체중에 비례하지 않습니다.',
      '하루 열량 = 기초대사량 × 상태 계수. 계수는 표마다 달라 범위로 냈습니다.',
      '사료 그램 = 하루 열량 ÷ 포장지의 kcal/g.',
      '2주 먹여 보고 체중을 다시 재십시오. 이 값은 출발점입니다.',
    ],
    [
      'Resting energy = 70 × weight to the power 0.75. It is not proportional to weight.',
      'Daily calories = resting energy × life-stage factor. Tables disagree, so a range is shown.',
      'Grams = daily calories ÷ the kcal per gram printed on the bag.',
      'Feed for two weeks, then weigh again. This is a starting point.',
    ],
    [
      'Energía en reposo = 70 × peso elevado a 0,75. No es proporcional al peso.',
      'Calorías diarias = energía en reposo × factor de etapa. Las tablas difieren: se da un rango.',
      'Gramos = calorías diarias ÷ las kcal por gramo del envase.',
      'Alimenta dos semanas y vuelve a pesar. Esto es un punto de partida.',
    ],
    [
      'Energia em repouso = 70 × peso elevado a 0,75. Não é proporcional ao peso.',
      'Calorias diárias = energia em repouso × fator de fase. As tabelas divergem, então há uma faixa.',
      'Gramas = calorias diárias ÷ as kcal por grama do pacote.',
      'Alimente por duas semanas e pese de novo. Isto é um ponto de partida.',
    ],
    [
      '安静時エネルギー = 70 × 体重の0.75乗。体重に比例しません。',
      '1日のカロリー = 安静時エネルギー × 状態係数。表ごとに違うので範囲で出しました。',
      'グラム数 = 1日のカロリー ÷ パッケージのkcal/g。',
      '2週間与えてから体重を測り直してください。これは出発点です。',
    ],
    [
      'Ruheenergiebedarf = 70 × Gewicht hoch 0,75. Nicht proportional zum Gewicht.',
      'Tageskalorien = Ruhebedarf × Lebensphasen-Faktor. Tabellen weichen ab, daher eine Spanne.',
      'Gramm = Tageskalorien ÷ kcal je Gramm laut Packung.',
      'Zwei Wochen füttern, dann erneut wiegen. Das hier ist der Anfang.',
    ],
    [
      'Énergie de repos = 70 × poids à la puissance 0,75. Ce n’est pas proportionnel au poids.',
      'Calories du jour = énergie de repos × facteur de stade. Les tables divergent : on donne une plage.',
      'Grammes = calories du jour ÷ les kcal par gramme indiquées sur le sac.',
      'Nourrissez deux semaines, puis repesez. C’est un point de départ.',
    ],
    [
      'विश्राम ऊर्जा = 70 × वज़न की 0.75 घात। यह वज़न के अनुपात में नहीं है।',
      'दैनिक कैलोरी = विश्राम ऊर्जा × अवस्था गुणक। तालिकाएँ अलग हैं, इसलिए एक परास दी है।',
      'ग्राम = दैनिक कैलोरी ÷ पैकेट पर लिखा kcal प्रति ग्राम।',
      'दो हफ़्ते खिलाकर फिर तौलें। यह शुरुआती बिंदु है।',
    ],
    [
      '静息能量 = 70 × 体重的 0.75 次方，并非与体重成正比。',
      '每日热量 = 静息能量 × 状态系数。各表不一致，所以给出区间。',
      '克数 = 每日热量 ÷ 包装上的每克 kcal。',
      '按此喂两周后再称重。这只是起点。',
    ],
    [
      '靜息能量 = 70 × 體重的 0.75 次方，並非與體重成正比。',
      '每日熱量 = 靜息能量 × 狀態係數。各表不一致，所以給出區間。',
      '克數 = 每日熱量 ÷ 包裝上的每克 kcal。',
      '按此餵兩週後再秤重。這只是起點。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '강아지·고양이 하루 사료량 계산 — 체중과 상태로',
    'Dog and cat daily food calculator — by weight and life stage',
    'Ración diaria de perros y gatos — por peso y etapa',
    'Ração diária de cães e gatos — por peso e fase',
    '犬・猫の1日の食事量計算 — 体重と状態から',
    'Tagesfuttermenge für Hund und Katze — nach Gewicht und Phase',
    'Ration quotidienne chien et chat — par poids et stade',
    'कुत्ते-बिल्ली की दैनिक आहार गणना — वज़न और अवस्था से',
    '狗猫每日喂食量计算 — 按体重与状态',
    '狗貓每日餵食量計算 — 按體重與狀態',
  ),

  hubMetaDesc: T(
    '10kg 중성화 성견은 하루 551~630kcal, 건사료로 157~180g입니다. 기초대사량은 체중의 0.75제곱에 비례하므로 체중에 곱하기로 계산하면 틀립니다. 종·상태 10가지 × 체중 10가지 100칸.',
    'A 10 kg neutered adult dog needs 551–630 kcal a day, or 157–180 g of dry food. Resting energy scales with weight^0.75, so multiplying by weight gives the wrong answer. 10 life stages × 10 body weights, 100 cells.',
    'Un perro adulto esterilizado de 10 kg necesita 551–630 kcal al día, o 157–180 g de pienso. La energía en reposo escala con peso^0,75, así que multiplicar por el peso da un resultado erróneo. 10 etapas × 10 pesos, 100 casillas.',
    'Um cão adulto castrado de 10 kg precisa de 551–630 kcal por dia, ou 157–180 g de ração seca. A energia em repouso escala com peso^0,75, então multiplicar pelo peso dá errado. 10 fases × 10 pesos, 100 células.',
    '10kgの去勢した成犬は1日551〜630kcal、ドライフードなら157〜180gです。安静時エネルギーは体重の0.75乗に比例するので、体重に掛け算すると外れます。状態10通り×体重10通りの100マス。',
    'Ein 10-kg-Hund, kastriert und erwachsen, braucht 551–630 kcal am Tag, also 157–180 g Trockenfutter. Der Ruhebedarf wächst mit Gewicht^0,75 — einfaches Multiplizieren führt in die Irre. 10 Phasen × 10 Gewichte, 100 Felder.',
    'Un chien adulte stérilisé de 10 kg a besoin de 551 à 630 kcal par jour, soit 157 à 180 g de croquettes. L’énergie de repos suit poids^0,75 : multiplier par le poids donne un faux résultat. 10 stades × 10 poids, 100 cases.',
    '10 किलो का नसबंदी किया वयस्क कुत्ता रोज़ 551–630 kcal, यानी 157–180 ग्राम सूखा आहार चाहता है। विश्राम ऊर्जा वज़न^0.75 से बढ़ती है, इसलिए वज़न से गुणा करना ग़लत है। 10 अवस्थाएँ × 10 वज़न, 100 खाने।',
    '10kg 已绝育成犬每天需要 551~630kcal，折合干粮 157~180g。静息能量与体重^0.75 成正比，直接按体重相乘会算错。10 种状态 × 10 种体重，共 100 格。',
    '10kg 已結紮成犬每天需要 551~630kcal，折合乾糧 157~180g。靜息能量與體重^0.75 成正比，直接按體重相乘會算錯。10 種狀態 × 10 種體重，共 100 格。',
  ),

  desc: T<(f: PetFacts) => string>(
    f => `기초대사량이 ${f.rer}kcal이고 상태 계수가 ${f.lo}~${f.hi}이므로 하루 ${f.kcalLo}~${f.kcalHi}kcal입니다. 건사료 3.5kcal/g 기준으로 ${f.bowls[0].lo}~${f.bowls[0].hi}g입니다.`,
    f => `Resting energy is ${f.rer} kcal and the life-stage factor is ${f.lo}–${f.hi}, so the day comes to ${f.kcalLo}–${f.kcalHi} kcal — ${f.bowls[0].lo}–${f.bowls[0].hi} g of dry food at 3.5 kcal/g.`,
    f => `La energía en reposo es ${f.rer} kcal y el factor de etapa es ${f.lo}–${f.hi}, así que el día suma ${f.kcalLo}–${f.kcalHi} kcal: ${f.bowls[0].lo}–${f.bowls[0].hi} g de pienso a 3,5 kcal/g.`,
    f => `A energia em repouso é ${f.rer} kcal e o fator de fase é ${f.lo}–${f.hi}, então o dia dá ${f.kcalLo}–${f.kcalHi} kcal: ${f.bowls[0].lo}–${f.bowls[0].hi} g de ração seca a 3,5 kcal/g.`,
    f => `安静時エネルギーが${f.rer}kcal、状態係数が${f.lo}〜${f.hi}なので1日${f.kcalLo}〜${f.kcalHi}kcalです。ドライフード3.5kcal/gなら${f.bowls[0].lo}〜${f.bowls[0].hi}gです。`,
    f => `Der Ruhebedarf liegt bei ${f.rer} kcal, der Phasenfaktor bei ${f.lo}–${f.hi} — macht ${f.kcalLo}–${f.kcalHi} kcal am Tag, also ${f.bowls[0].lo}–${f.bowls[0].hi} g Trockenfutter bei 3,5 kcal/g.`,
    f => `L’énergie de repos vaut ${f.rer} kcal et le facteur de stade ${f.lo}–${f.hi} : la journée fait ${f.kcalLo}–${f.kcalHi} kcal, soit ${f.bowls[0].lo}–${f.bowls[0].hi} g de croquettes à 3,5 kcal/g.`,
    f => `विश्राम ऊर्जा ${f.rer} kcal है और अवस्था गुणक ${f.lo}–${f.hi}, इसलिए दिन भर में ${f.kcalLo}–${f.kcalHi} kcal — 3.5 kcal/g वाले सूखे आहार में ${f.bowls[0].lo}–${f.bowls[0].hi} ग्राम।`,
    f => `静息能量为 ${f.rer}kcal，状态系数为 ${f.lo}~${f.hi}，所以每天 ${f.kcalLo}~${f.kcalHi}kcal；按干粮 3.5kcal/g 计为 ${f.bowls[0].lo}~${f.bowls[0].hi}g。`,
    f => `靜息能量為 ${f.rer}kcal，狀態係數為 ${f.lo}~${f.hi}，所以每天 ${f.kcalLo}~${f.kcalHi}kcal；按乾糧 3.5kcal/g 計為 ${f.bowls[0].lo}~${f.bowls[0].hi}g。`,
  ),

  metaTitle: T<(f: PetFacts) => string>(
    f => `${stKo[f.cell.state]} ${f.cell.kg}kg — 하루 ${f.kcalLo}~${f.kcalHi}kcal`,
    f => `${stEn[f.cell.state]}, ${f.cell.kg} kg — ${f.kcalLo}–${f.kcalHi} kcal a day`,
    f => `${stEs[f.cell.state]}, ${f.cell.kg} kg — ${f.kcalLo}–${f.kcalHi} kcal al día`,
    f => `${stPt[f.cell.state]}, ${f.cell.kg} kg — ${f.kcalLo}–${f.kcalHi} kcal por dia`,
    f => `${stJa[f.cell.state]} ${f.cell.kg}kg — 1日${f.kcalLo}〜${f.kcalHi}kcal`,
    f => `${stDe[f.cell.state]}, ${f.cell.kg} kg — ${f.kcalLo}–${f.kcalHi} kcal am Tag`,
    f => `${stFr[f.cell.state]}, ${f.cell.kg} kg — ${f.kcalLo}–${f.kcalHi} kcal par jour`,
    f => `${stHi[f.cell.state]}, ${f.cell.kg} किलो — रोज़ ${f.kcalLo}–${f.kcalHi} kcal`,
    f => `${stZh[f.cell.state]} ${f.cell.kg}kg — 每天 ${f.kcalLo}~${f.kcalHi}kcal`,
    f => `${stTw[f.cell.state]} ${f.cell.kg}kg — 每天 ${f.kcalLo}~${f.kcalHi}kcal`,
  ),

  metaDesc: T<(f: PetFacts) => string>(
    f => `체중 ${f.cell.kg}kg의 ${stKo[f.cell.state]}는 하루 ${f.kcalLo}~${f.kcalHi}kcal이 필요합니다. 건사료 3.5kcal/g으로 ${f.bowls[0].lo}~${f.bowls[0].hi}g, 4.0kcal/g으로 ${f.bowls[1].lo}~${f.bowls[1].hi}g입니다.`,
    f => `A ${f.cell.kg} kg ${stEn[f.cell.state]} needs ${f.kcalLo}–${f.kcalHi} kcal a day: ${f.bowls[0].lo}–${f.bowls[0].hi} g of dry food at 3.5 kcal/g, or ${f.bowls[1].lo}–${f.bowls[1].hi} g at 4.0 kcal/g.`,
    f => `Un ${stEs[f.cell.state]} de ${f.cell.kg} kg necesita ${f.kcalLo}–${f.kcalHi} kcal al día: ${f.bowls[0].lo}–${f.bowls[0].hi} g de pienso a 3,5 kcal/g, o ${f.bowls[1].lo}–${f.bowls[1].hi} g a 4,0 kcal/g.`,
    f => `Um ${stPt[f.cell.state]} de ${f.cell.kg} kg precisa de ${f.kcalLo}–${f.kcalHi} kcal por dia: ${f.bowls[0].lo}–${f.bowls[0].hi} g de ração a 3,5 kcal/g, ou ${f.bowls[1].lo}–${f.bowls[1].hi} g a 4,0 kcal/g.`,
    f => `体重${f.cell.kg}kgの${stJa[f.cell.state]}は1日${f.kcalLo}〜${f.kcalHi}kcal必要です。ドライフード3.5kcal/gで${f.bowls[0].lo}〜${f.bowls[0].hi}g、4.0kcal/gで${f.bowls[1].lo}〜${f.bowls[1].hi}gです。`,
    f => `Ein ${stDe[f.cell.state]} mit ${f.cell.kg} kg braucht ${f.kcalLo}–${f.kcalHi} kcal am Tag: ${f.bowls[0].lo}–${f.bowls[0].hi} g Trockenfutter bei 3,5 kcal/g oder ${f.bowls[1].lo}–${f.bowls[1].hi} g bei 4,0 kcal/g.`,
    f => `Un ${stFr[f.cell.state]} de ${f.cell.kg} kg a besoin de ${f.kcalLo}–${f.kcalHi} kcal par jour : ${f.bowls[0].lo}–${f.bowls[0].hi} g de croquettes à 3,5 kcal/g, ou ${f.bowls[1].lo}–${f.bowls[1].hi} g à 4,0 kcal/g.`,
    f => `${f.cell.kg} किलो के ${stHi[f.cell.state]} को रोज़ ${f.kcalLo}–${f.kcalHi} kcal चाहिए: 3.5 kcal/g पर ${f.bowls[0].lo}–${f.bowls[0].hi} ग्राम, 4.0 kcal/g पर ${f.bowls[1].lo}–${f.bowls[1].hi} ग्राम।`,
    f => `${f.cell.kg}kg 的${stZh[f.cell.state]}每天需要 ${f.kcalLo}~${f.kcalHi}kcal：干粮 3.5kcal/g 为 ${f.bowls[0].lo}~${f.bowls[0].hi}g，4.0kcal/g 为 ${f.bowls[1].lo}~${f.bowls[1].hi}g。`,
    f => `${f.cell.kg}kg 的${stTw[f.cell.state]}每天需要 ${f.kcalLo}~${f.kcalHi}kcal：乾糧 3.5kcal/g 為 ${f.bowls[0].lo}~${f.bowls[0].hi}g，4.0kcal/g 為 ${f.bowls[1].lo}~${f.bowls[1].hi}g。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '10kg 강아지는 하루에 얼마나 먹어야 하나요?', a: '중성화한 성견이라면 551~630kcal, 건사료로 157~180g입니다. 성장기라면 두 배 가까이 됩니다.' },
      { q: '체중이 두 배면 두 배 먹나요?', a: '아닙니다. 기초대사량이 체중의 0.75제곱에 비례해 1.68배만 늘어납니다. 열여섯 배 무거우면 여덟 배입니다.' },
      { q: '30 × 체중 + 70으로 계산해도 되나요?', a: '3~20kg 구간 밖에서는 지수식보다 높게 나옵니다. 40kg이면 14%쯤 차이가 납니다.' },
      { q: '왜 계수를 범위로 적었나요?', a: '표마다 숫자가 다릅니다. 하나를 골라 적으면 다른 표를 본 사람에게는 틀린 값이 되기 때문입니다.' },
      { q: '고양이가 개보다 적게 먹나요?', a: '같은 체중이면 그렇습니다. 중성화한 성묘의 계수는 1.0~1.2로 성견의 1.4~1.6보다 낮습니다.' },
    ],
    [
      { q: 'How much should a 10 kg dog eat?', a: 'A neutered adult needs 551–630 kcal, about 157–180 g of dry food. A growing puppy of the same weight needs nearly twice that.' },
      { q: 'Does twice the weight mean twice the food?', a: 'No. Resting energy follows weight^0.75, so it rises by 1.68×. Sixteen times the weight means eight times the food.' },
      { q: 'Can I just use 30 × weight + 70?', a: 'Outside roughly 3–20 kg it reads higher than the exponential formula — about 14 % higher at 40 kg.' },
      { q: 'Why is the factor given as a range?', a: 'Published tables disagree. Committing to one number would be wrong for anyone reading the other table.' },
      { q: 'Do cats eat less than dogs?', a: 'At the same body weight, yes. A neutered adult cat sits at 1.0–1.2 against 1.4–1.6 for a neutered adult dog.' },
    ],
    [
      { q: '¿Cuánto debe comer un perro de 10 kg?', a: 'Un adulto esterilizado necesita 551–630 kcal, unos 157–180 g de pienso. Un cachorro del mismo peso casi el doble.' },
      { q: '¿El doble de peso es el doble de comida?', a: 'No. La energía en reposo sigue peso^0,75, así que sube 1,68 veces. Dieciséis veces el peso son ocho veces la comida.' },
      { q: '¿Sirve 30 × peso + 70?', a: 'Fuera de unos 3–20 kg da más que la fórmula exponencial: alrededor de un 14 % más a 40 kg.' },
      { q: '¿Por qué el factor es un rango?', a: 'Las tablas publicadas no coinciden. Fijar un número sería erróneo para quien consulte la otra.' },
      { q: '¿Los gatos comen menos que los perros?', a: 'A igual peso, sí. Un gato adulto esterilizado va de 1,0 a 1,2 frente al 1,4–1,6 del perro.' },
    ],
    [
      { q: 'Quanto deve comer um cão de 10 kg?', a: 'Um adulto castrado precisa de 551–630 kcal, cerca de 157–180 g de ração seca. Um filhote do mesmo peso, quase o dobro.' },
      { q: 'O dobro do peso é o dobro da comida?', a: 'Não. A energia em repouso segue peso^0,75, subindo 1,68 vez. Dezesseis vezes o peso são oito vezes a comida.' },
      { q: 'Posso usar 30 × peso + 70?', a: 'Fora da faixa de 3–20 kg, dá mais que a fórmula exponencial: cerca de 14 % a mais em 40 kg.' },
      { q: 'Por que o fator é uma faixa?', a: 'As tabelas publicadas divergem. Fixar um número seria errado para quem consulta a outra.' },
      { q: 'Gatos comem menos que cães?', a: 'No mesmo peso, sim. Um gato adulto castrado fica em 1,0–1,2 contra 1,4–1,6 do cão.' },
    ],
    [
      { q: '10kgの犬は1日どれくらい食べますか？', a: '去勢した成犬なら551〜630kcal、ドライフードで157〜180gです。同じ体重の成長期なら2倍近くになります。' },
      { q: '体重が2倍なら2倍食べますか？', a: 'いいえ。安静時エネルギーは体重の0.75乗なので1.68倍です。16倍重ければ8倍になります。' },
      { q: '30 × 体重 + 70で計算してよいですか？', a: 'およそ3〜20kgの外では指数式より高く出ます。40kgなら14%ほど差が出ます。' },
      { q: 'なぜ係数を範囲で書いたのですか？', a: '公表された表どうしが違う数字を使っているためです。1つに決めると別の表を見た人には誤りになります。' },
      { q: '猫は犬より少なく食べますか？', a: '同じ体重ならそうです。去勢した成猫は1.0〜1.2で、成犬の1.4〜1.6より低いです。' },
    ],
    [
      { q: 'Wie viel frisst ein 10-kg-Hund?', a: 'Kastriert und erwachsen 551–630 kcal, also etwa 157–180 g Trockenfutter. Ein Welpe gleichen Gewichts fast das Doppelte.' },
      { q: 'Doppeltes Gewicht, doppeltes Futter?', a: 'Nein. Der Ruhebedarf folgt Gewicht^0,75 und steigt um das 1,68-Fache. Sechzehnfaches Gewicht heißt achtfaches Futter.' },
      { q: 'Reicht 30 × Gewicht + 70?', a: 'Außerhalb von etwa 3–20 kg liegt die Formel über dem Exponentialwert — bei 40 kg rund 14 % darüber.' },
      { q: 'Warum eine Spanne statt einer Zahl?', a: 'Die veröffentlichten Tabellen widersprechen sich. Eine Zahl wäre für jeden mit der anderen Tabelle falsch.' },
      { q: 'Fressen Katzen weniger als Hunde?', a: 'Bei gleichem Gewicht ja. Eine kastrierte erwachsene Katze liegt bei 1,0–1,2 gegenüber 1,4–1,6 beim Hund.' },
    ],
    [
      { q: 'Combien mange un chien de 10 kg ?', a: 'Adulte stérilisé, 551 à 630 kcal, soit 157 à 180 g de croquettes. Un chiot du même poids, presque le double.' },
      { q: 'Deux fois le poids, deux fois la ration ?', a: 'Non. L’énergie de repos suit poids^0,75 : elle monte de 1,68 fois. Seize fois le poids, huit fois la ration.' },
      { q: 'Puis-je utiliser 30 × poids + 70 ?', a: 'Hors de la plage 3–20 kg, elle dépasse la formule exponentielle — d’environ 14 % à 40 kg.' },
      { q: 'Pourquoi une plage plutôt qu’un chiffre ?', a: 'Les tables publiées divergent. Fixer un chiffre serait faux pour qui consulte l’autre.' },
      { q: 'Les chats mangent-ils moins que les chiens ?', a: 'À poids égal, oui. Un chat adulte stérilisé est à 1,0–1,2 contre 1,4–1,6 pour le chien.' },
    ],
    [
      { q: '10 किलो के कुत्ते को रोज़ कितना चाहिए?', a: 'नसबंदी किए वयस्क को 551–630 kcal, यानी लगभग 157–180 ग्राम सूखा आहार। उसी वज़न के पिल्ले को लगभग दोगुना।' },
      { q: 'दोगुना वज़न यानी दोगुना खाना?', a: 'नहीं। विश्राम ऊर्जा वज़न^0.75 से चलती है, यानी 1.68 गुना। सोलह गुना वज़न पर आठ गुना खाना।' },
      { q: 'क्या 30 × वज़न + 70 चलेगा?', a: 'लगभग 3–20 किलो के बाहर यह घातांकी सूत्र से ऊपर जाता है — 40 किलो पर करीब 14% ऊपर।' },
      { q: 'गुणक परास में क्यों?', a: 'प्रकाशित तालिकाएँ आपस में भिन्न हैं। एक संख्या तय करना दूसरी तालिका वालों के लिए ग़लत होगा।' },
      { q: 'क्या बिल्लियाँ कुत्तों से कम खाती हैं?', a: 'समान वज़न पर हाँ। नसबंदी की वयस्क बिल्ली 1.0–1.2 पर है, जबकि कुत्ता 1.4–1.6 पर।' },
    ],
    [
      { q: '10kg 的狗每天该吃多少？', a: '已绝育成犬需要 551~630kcal，约合干粮 157~180g。同样体重的幼犬接近两倍。' },
      { q: '体重翻倍，食量也翻倍吗？', a: '不会。静息能量按体重^0.75 增长，只增到 1.68 倍。重十六倍是吃八倍。' },
      { q: '能直接用 30 × 体重 + 70 吗？', a: '在约 3~20kg 之外，它会高于指数式——40kg 时相差约 14%。' },
      { q: '为什么系数写成区间？', a: '公开的表格互不一致。只写一个数字，对照另一张表的人就会拿到错的值。' },
      { q: '猫比狗吃得少吗？', a: '同体重下是的。已绝育成猫是 1.0~1.2，成犬是 1.4~1.6。' },
    ],
    [
      { q: '10kg 的狗每天該吃多少？', a: '已結紮成犬需要 551~630kcal，約合乾糧 157~180g。同樣體重的幼犬接近兩倍。' },
      { q: '體重翻倍，食量也翻倍嗎？', a: '不會。靜息能量按體重^0.75 增長，只增到 1.68 倍。重十六倍是吃八倍。' },
      { q: '能直接用 30 × 體重 + 70 嗎？', a: '在約 3~20kg 之外，它會高於指數式——40kg 時相差約 14%。' },
      { q: '為什麼係數寫成區間？', a: '公開的表格互不一致。只寫一個數字，對照另一張表的人就會拿到錯的值。' },
      { q: '貓比狗吃得少嗎？', a: '同體重下是的。已結紮成貓是 1.0~1.2，成犬是 1.4~1.6。' },
    ],
  ),

  cellFaq: T<(f: PetFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.kg}kg ${stKo[f.cell.state]}는 하루에 얼마나 먹어야 하나요?`, a: `${f.kcalLo}~${f.kcalHi}kcal입니다. 기초대사량 ${f.rer}kcal에 상태 계수 ${f.lo}~${f.hi}를 곱한 값입니다.` },
      { q: `사료로는 몇 그램인가요?`, a: `3.5kcal/g 사료로 ${f.bowls[0].lo}~${f.bowls[0].hi}g, 4.0kcal/g 사료로 ${f.bowls[1].lo}~${f.bowls[1].hi}g입니다.` },
      { q: `선형 어림식으로 계산하면 얼마인가요?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear}kcal입니다. 지수식 ${f.rer}kcal보다 ${f.gap >= 0 ? '높습니다' : '낮습니다'}(${f.gap}%).` },
      { q: `이 값을 그대로 믿어도 되나요?`, a: `출발점으로만 쓰십시오. 활동량과 나이에 따라 30%까지 벌어집니다. 2주 먹여 보고 체중을 다시 재는 편이 낫습니다.` },
    ],
    f => [
      { q: `How much should a ${f.cell.kg} kg ${stEn[f.cell.state]} eat?`, a: `${f.kcalLo}–${f.kcalHi} kcal a day — resting energy of ${f.rer} kcal times a life-stage factor of ${f.lo}–${f.hi}.` },
      { q: `How many grams of food is that?`, a: `${f.bowls[0].lo}–${f.bowls[0].hi} g at 3.5 kcal/g, or ${f.bowls[1].lo}–${f.bowls[1].hi} g at 4.0 kcal/g.` },
      { q: `What does the linear shortcut give?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear} kcal, which is ${f.gap >= 0 ? 'above' : 'below'} the ${f.rer} kcal exponential figure by ${Math.abs(f.gap)} %.` },
      { q: `Can I take this number as final?`, a: `Use it as a starting point. Real needs vary by up to 30 % with activity and age — feed for two weeks, then weigh again.` },
    ],
    f => [
      { q: `¿Cuánto debe comer un ${stEs[f.cell.state]} de ${f.cell.kg} kg?`, a: `${f.kcalLo}–${f.kcalHi} kcal al día: energía en reposo de ${f.rer} kcal por un factor de ${f.lo}–${f.hi}.` },
      { q: `¿Cuántos gramos de pienso son?`, a: `${f.bowls[0].lo}–${f.bowls[0].hi} g a 3,5 kcal/g, o ${f.bowls[1].lo}–${f.bowls[1].hi} g a 4,0 kcal/g.` },
      { q: `¿Qué da el atajo lineal?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear} kcal, un ${Math.abs(f.gap)} % ${f.gap >= 0 ? 'por encima' : 'por debajo'} de los ${f.rer} kcal exponenciales.` },
      { q: `¿Puedo tomarlo como definitivo?`, a: `Úsalo como punto de partida. Las necesidades varían hasta un 30 % según actividad y edad: alimenta dos semanas y vuelve a pesar.` },
    ],
    f => [
      { q: `Quanto deve comer um ${stPt[f.cell.state]} de ${f.cell.kg} kg?`, a: `${f.kcalLo}–${f.kcalHi} kcal por dia: energia em repouso de ${f.rer} kcal vezes um fator de ${f.lo}–${f.hi}.` },
      { q: `Quantos gramas de ração são?`, a: `${f.bowls[0].lo}–${f.bowls[0].hi} g a 3,5 kcal/g, ou ${f.bowls[1].lo}–${f.bowls[1].hi} g a 4,0 kcal/g.` },
      { q: `O que dá o atalho linear?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear} kcal, ${Math.abs(f.gap)} % ${f.gap >= 0 ? 'acima' : 'abaixo'} dos ${f.rer} kcal exponenciais.` },
      { q: `Posso tomar isso como definitivo?`, a: `Use como ponto de partida. A necessidade varia até 30 % com atividade e idade — alimente por duas semanas e pese de novo.` },
    ],
    f => [
      { q: `${f.cell.kg}kgの${stJa[f.cell.state]}は1日どれくらい食べますか？`, a: `${f.kcalLo}〜${f.kcalHi}kcalです。安静時エネルギー${f.rer}kcalに状態係数${f.lo}〜${f.hi}を掛けた値です。` },
      { q: `フードでは何グラムですか？`, a: `3.5kcal/gなら${f.bowls[0].lo}〜${f.bowls[0].hi}g、4.0kcal/gなら${f.bowls[1].lo}〜${f.bowls[1].hi}gです。` },
      { q: `線形の近似式ではいくつですか？`, a: `30 × ${f.cell.kg} + 70 = ${f.linear}kcalです。指数式の${f.rer}kcalより${f.gap >= 0 ? '高く' : '低く'}、差は${Math.abs(f.gap)}%です。` },
      { q: `この値をそのまま信じてよいですか？`, a: `出発点として使ってください。活動量や年齢で30%ほど変わります。2週間与えてから体重を測り直すのがよいです。` },
    ],
    f => [
      { q: `Wie viel frisst ein ${stDe[f.cell.state]} mit ${f.cell.kg} kg?`, a: `${f.kcalLo}–${f.kcalHi} kcal am Tag — Ruhebedarf von ${f.rer} kcal mal Phasenfaktor ${f.lo}–${f.hi}.` },
      { q: `Wie viel Gramm Futter ist das?`, a: `${f.bowls[0].lo}–${f.bowls[0].hi} g bei 3,5 kcal/g oder ${f.bowls[1].lo}–${f.bowls[1].hi} g bei 4,0 kcal/g.` },
      { q: `Was ergibt die lineare Faustformel?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear} kcal, also ${Math.abs(f.gap)} % ${f.gap >= 0 ? 'über' : 'unter'} den ${f.rer} kcal der Exponentialformel.` },
      { q: `Kann ich den Wert so übernehmen?`, a: `Als Ausgangspunkt ja. Der echte Bedarf schwankt je nach Aktivität und Alter um bis zu 30 % — zwei Wochen füttern, dann wiegen.` },
    ],
    f => [
      { q: `Combien mange un ${stFr[f.cell.state]} de ${f.cell.kg} kg ?`, a: `${f.kcalLo}–${f.kcalHi} kcal par jour : énergie de repos de ${f.rer} kcal multipliée par un facteur de ${f.lo}–${f.hi}.` },
      { q: `Cela fait combien de grammes ?`, a: `${f.bowls[0].lo}–${f.bowls[0].hi} g à 3,5 kcal/g, ou ${f.bowls[1].lo}–${f.bowls[1].hi} g à 4,0 kcal/g.` },
      { q: `Que donne la formule linéaire ?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear} kcal, soit ${Math.abs(f.gap)} % ${f.gap >= 0 ? 'au-dessus' : 'en dessous'} des ${f.rer} kcal exponentiels.` },
      { q: `Puis-je m’en tenir à ce chiffre ?`, a: `Prenez-le comme départ. Les besoins varient jusqu’à 30 % selon l’activité et l’âge — nourrissez deux semaines, puis repesez.` },
    ],
    f => [
      { q: `${f.cell.kg} किलो के ${stHi[f.cell.state]} को रोज़ कितना चाहिए?`, a: `${f.kcalLo}–${f.kcalHi} kcal — विश्राम ऊर्जा ${f.rer} kcal को अवस्था गुणक ${f.lo}–${f.hi} से गुणा करके।` },
      { q: `यह कितने ग्राम आहार हुआ?`, a: `3.5 kcal/g पर ${f.bowls[0].lo}–${f.bowls[0].hi} ग्राम, 4.0 kcal/g पर ${f.bowls[1].lo}–${f.bowls[1].hi} ग्राम।` },
      { q: `रैखिक सूत्र क्या देता है?`, a: `30 × ${f.cell.kg} + 70 = ${f.linear} kcal, जो घातांकी ${f.rer} kcal से ${Math.abs(f.gap)}% ${f.gap >= 0 ? 'ऊपर' : 'नीचे'} है।` },
      { q: `क्या यही अंतिम मान है?`, a: `इसे शुरुआत मानें। गतिविधि और उम्र से ज़रूरत 30% तक बदलती है — दो हफ़्ते खिलाकर फिर तौलें।` },
    ],
    f => [
      { q: `${f.cell.kg}kg 的${stZh[f.cell.state]}每天该吃多少？`, a: `${f.kcalLo}~${f.kcalHi}kcal，即静息能量 ${f.rer}kcal 乘以状态系数 ${f.lo}~${f.hi}。` },
      { q: `换成饲料是多少克？`, a: `按 3.5kcal/g 为 ${f.bowls[0].lo}~${f.bowls[0].hi}g，按 4.0kcal/g 为 ${f.bowls[1].lo}~${f.bowls[1].hi}g。` },
      { q: `用线性近似式算是多少？`, a: `30 × ${f.cell.kg} + 70 = ${f.linear}kcal，比指数式的 ${f.rer}kcal ${f.gap >= 0 ? '高' : '低'} ${Math.abs(f.gap)}%。` },
      { q: `这个数字可以直接照做吗？`, a: `当作起点用。活动量和年龄会让实际需求相差多达 30%——先喂两周，再称重调整。` },
    ],
    f => [
      { q: `${f.cell.kg}kg 的${stTw[f.cell.state]}每天該吃多少？`, a: `${f.kcalLo}~${f.kcalHi}kcal，即靜息能量 ${f.rer}kcal 乘以狀態係數 ${f.lo}~${f.hi}。` },
      { q: `換成飼料是多少克？`, a: `按 3.5kcal/g 為 ${f.bowls[0].lo}~${f.bowls[0].hi}g，按 4.0kcal/g 為 ${f.bowls[1].lo}~${f.bowls[1].hi}g。` },
      { q: `用線性近似式算是多少？`, a: `30 × ${f.cell.kg} + 70 = ${f.linear}kcal，比指數式的 ${f.rer}kcal ${f.gap >= 0 ? '高' : '低'} ${Math.abs(f.gap)}%。` },
      { q: `這個數字可以直接照做嗎？`, a: `當作起點用。活動量和年齡會讓實際需求相差多達 30%——先餵兩週，再秤重調整。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PETFOOD_UI: L<PetUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PetUI>;
