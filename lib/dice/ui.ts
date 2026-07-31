/**
 * 주사위 확률 화면의 문구 — 열 언어.
 *
 * 항목 이름은 "2d6 = 7"이라 옮길 것이 없고, 항목마다의 설명도 손으로 적지 않는다.
 * 계산해 낸 경우의 수와 순위에서 문장을 만든다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { RollFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DiceUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 표와 그림에 숫자를 적을 때 — 언어마다 소수점 기호가 다르다 */
  fmt: (v: number) => string;
  diceTitle: (n: number) => string;
  diceNote: (n: number) => string;
  waysLabel: string;
  percentLabel: string;
  oneInLabel: string;
  atLeastLabel: string;
  atMostLabel: string;
  meanLabel: string;
  peakLabel: string;
  curveTitle: string;
  neighbourTitle: string;
  similarTitle: string;
  similarNote: string;
  desc: (f: RollFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: RollFacts) => string;
  metaDesc: (f: RollFacts) => string;
  hubFaq: FaqItem[];
  rollFaq: (f: RollFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/**
 * 소수점 기호는 언어마다 다르다 — 독일어와 프랑스어는 16,67이라고 쓴다.
 * 숫자를 글에 끼워 넣는 자리는 여기를 거친다.
 */
const N = (() => {
  // 기본값은 소수 세 자리에서 끊는다 — 0.0021%가 0,002%가 되어 버리므로 여섯 자리까지 연다
  const opts = { maximumFractionDigits: 6 } as const;
  return {
    es: (v: number) => v.toLocaleString('es', opts),
    pt: (v: number) => v.toLocaleString('pt-BR', opts),
    de: (v: number) => v.toLocaleString('de', opts),
    fr: (v: number) => v.toLocaleString('fr', opts),
  };
})();

type Spec = { [K in keyof DiceUI]: L<DiceUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('주사위 확률', 'Dice odds', 'Probabilidad de dados', 'Probabilidade dos dados', 'サイコロの確率', 'Würfelwahrscheinlichkeit', 'Probabilités aux dés', 'पासे की संभावना', '骰子概率', '骰子機率'),

  hubTitle: T(
    '주사위 합 확률 111가지',
    'Dice sum odds — all 111 outcomes',
    'Probabilidades de sumas — los 111 resultados',
    'Probabilidades das somas — os 111 resultados',
    'サイコロの合計の確率111通り',
    'Würfelsummen — alle 111 Ergebnisse',
    'Probabilités des sommes — les 111 résultats',
    'पासों के जोड़ की संभावना — सभी 111 परिणाम',
    '骰子点数概率 111 种',
    '骰子點數機率 111 種',
  ),

  hubLead: T(
    '주사위 한 개부터 여섯 개까지, 나올 수 있는 모든 합의 경우의 수와 확률을 계산해 정리했습니다. 보드게임에서 몇 칸을 갈지 가늠할 때 쓰세요.',
    'Every sum you can roll with one to six ordinary dice, with the number of ways it happens and how likely it is. Handy when you want to know what a board game roll will really give you.',
    'Todas las sumas posibles con uno a seis dados normales, con cuántas formas hay de sacarlas y su probabilidad. Útil para calcular una tirada en un juego de mesa.',
    'Todas as somas possíveis com um a seis dados comuns, com quantas formas existem e a probabilidade de cada uma. Útil para prever uma jogada de tabuleiro.',
    'サイコロ1個から6個まで、出うるすべての合計について場合の数と確率をまとめました。ボードゲームで何マス進むか見積もるときに。',
    'Alle Summen, die mit einem bis sechs normalen Würfeln fallen können — mit der Zahl der Möglichkeiten und der Wahrscheinlichkeit. Praktisch, um einen Brettspielwurf einzuschätzen.',
    'Toutes les sommes possibles avec un à six dés ordinaires, le nombre de combinaisons et la probabilité de chacune. Pratique pour évaluer un jet au jeu de plateau.',
    'एक से छह साधारण पासों से बनने वाले हर जोड़ के लिए कितने तरीक़े हैं और कितनी संभावना — बोर्ड गेम की चाल आँकने के काम आता है।',
    '一颗到六颗普通骰子能掷出的所有点数，各有多少种组合、概率是多少，全部算好了。想估算桌游里这一掷能走几格时很好用。',
    '一顆到六顆普通骰子能擲出的所有點數，各有多少種組合、機率是多少，全部算好了。想估算桌遊裡這一擲能走幾格時很好用。',
  ),

  fmt: T(
    (v: number) => v.toLocaleString('en', { maximumFractionDigits: 6 }),
    (v: number) => v.toLocaleString('en', { maximumFractionDigits: 6 }),
    N.es,
    N.pt,
    (v: number) => v.toLocaleString('ja', { maximumFractionDigits: 6 }),
    N.de,
    N.fr,
    (v: number) => v.toLocaleString('en', { maximumFractionDigits: 6 }),
    (v: number) => v.toLocaleString('zh', { maximumFractionDigits: 6 }),
    (v: number) => v.toLocaleString('zh-Hant', { maximumFractionDigits: 6 }),
  ),

  diceTitle: T(
    (n: number) => `주사위 ${n}개`,
    (n: number) => (n === 1 ? 'One die' : `${n} dice`),
    (n: number) => (n === 1 ? 'Un dado' : `${n} dados`),
    (n: number) => (n === 1 ? 'Um dado' : `${n} dados`),
    (n: number) => `サイコロ${n}個`,
    (n: number) => (n === 1 ? 'Ein Würfel' : `${n} Würfel`),
    (n: number) => (n === 1 ? 'Un dé' : `${n} dés`),
    (n: number) => (n === 1 ? '1 पासा' : `${n} पासे`),
    (n: number) => `${n}颗骰子`,
    (n: number) => `${n}顆骰子`,
  ),

  diceNote: T(
    (n: number) => `나올 수 있는 경우가 ${(6 ** n).toLocaleString('ko')}가지이고, 합은 ${n}부터 ${n * 6}까지입니다.`,
    (n: number) => `${(6 ** n).toLocaleString('en')} equally likely rolls, with sums from ${n} to ${n * 6}.`,
    (n: number) => `${(6 ** n).toLocaleString('es')} tiradas igual de probables, con sumas de ${n} a ${n * 6}.`,
    (n: number) => `${(6 ** n).toLocaleString('pt-BR')} jogadas igualmente prováveis, com somas de ${n} a ${n * 6}.`,
    (n: number) => `出方は${(6 ** n).toLocaleString('ja')}通り、合計は${n}から${n * 6}までです。`,
    (n: number) => `${(6 ** n).toLocaleString('de')} gleich wahrscheinliche Würfe, Summen von ${n} bis ${n * 6}.`,
    (n: number) => `${(6 ** n).toLocaleString('fr')} lancers également probables, sommes de ${n} à ${n * 6}.`,
    (n: number) => `${(6 ** n).toLocaleString('en')} समान संभावना वाले फेंक, जोड़ ${n} से ${n * 6} तक।`,
    (n: number) => `共有${(6 ** n).toLocaleString('zh')}种等可能的掷法，点数从${n}到${n * 6}。`,
    (n: number) => `共有${(6 ** n).toLocaleString('zh-Hant')}種等可能的擲法，點數從${n}到${n * 6}。`,
  ),

  waysLabel: T('경우의 수', 'Ways to roll it', 'Formas de sacarlo', 'Formas de obter', '場合の数', 'Möglichkeiten', 'Combinaisons', 'तरीक़े', '组合数', '組合數'),
  percentLabel: T('확률', 'Probability', 'Probabilidad', 'Probabilidade', '確率', 'Wahrscheinlichkeit', 'Probabilité', 'संभावना', '概率', '機率'),
  oneInLabel: T('몇 번에 한 번', 'One roll in', 'Una de cada', 'Uma a cada', '何回に一度', 'Einmal in', 'Une fois sur', 'कितनी बार में एक', '多少次出一次', '多少次出一次'),
  atLeastLabel: T('이 값 이상', 'This or higher', 'Este o más', 'Este ou mais', 'これ以上', 'Diese oder höher', 'Ce résultat ou plus', 'इससे अधिक या बराबर', '大于等于此值', '大於等於此值'),
  atMostLabel: T('이 값 이하', 'This or lower', 'Este o menos', 'Este ou menos', 'これ以下', 'Diese oder niedriger', 'Ce résultat ou moins', 'इससे कम या बराबर', '小于等于此值', '小於等於此值'),
  meanLabel: T('평균 합', 'Average sum', 'Suma media', 'Soma média', '平均の合計', 'Durchschnittssumme', 'Somme moyenne', 'औसत जोड़', '平均点数', '平均點數'),
  peakLabel: T('가장 흔한 합', 'Most likely sum', 'Suma más probable', 'Soma mais provável', 'いちばん出やすい合計', 'Häufigste Summe', 'Somme la plus probable', 'सबसे संभावित जोड़', '最常出现的点数', '最常出現的點數'),

  curveTitle: T('합마다의 경우의 수', 'Ways for each sum', 'Formas para cada suma', 'Formas para cada soma', '合計ごとの場合の数', 'Möglichkeiten je Summe', 'Combinaisons par somme', 'हर जोड़ के तरीक़े', '各点数的组合数', '各點數的組合數'),
  neighbourTitle: T('이웃한 합', 'Nearby sums', 'Sumas cercanas', 'Somas próximas', '近い合計', 'Benachbarte Summen', 'Sommes voisines', 'आस-पास के जोड़', '相邻点数', '相鄰點數'),
  similarTitle: T('확률이 비슷한 굴림', 'Rolls with similar odds', 'Tiradas con probabilidad parecida', 'Jogadas com chance parecida', '確率が近い出目', 'Würfe mit ähnlicher Chance', 'Jets de probabilité voisine', 'मिलती-जुलती संभावना वाले फेंक', '概率相近的掷法', '機率相近的擲法'),
  similarNote: T(
    '개수가 달라도 확률이 비슷하면 체감도 비슷합니다.',
    'A different number of dice can land on much the same chance.',
    'Con otro número de dados se puede llegar a una probabilidad muy parecida.',
    'Com outro número de dados dá para chegar a uma chance bem parecida.',
    '個数が違っても確率が近ければ、出やすさの感覚も近くなります。',
    'Auch mit anderer Würfelzahl kommt fast dieselbe Chance heraus.',
    'Avec un autre nombre de dés, on retombe parfois sur presque la même chance.',
    'पासों की संख्या अलग हो तब भी संभावना लगभग वही हो सकती है।',
    '骰子数量不同，概率也可能几乎一样。',
    '骰子數量不同，機率也可能幾乎一樣。',
  ),

  desc: T(
    (f: RollFacts) => `${f.dice}개를 굴려 합 ${f.sum}이 나오는 경우는 ${f.ways.toLocaleString('ko')}가지, 확률은 ${f.percent}%입니다.${f.isPeak ? ' 이 개수에서 가장 흔한 합입니다.' : ''}`,
    (f: RollFacts) => `Rolling ${f.dice} ${f.dice === 1 ? 'die' : 'dice'}, ${f.ways} of the ${f.total.toLocaleString('en')} outcomes ${f.ways === 1 ? 'adds' : 'add'} up to ${f.sum} — a ${f.percent}% chance.${f.isPeak ? ' It is the most likely sum with this many dice.' : ''}`,
    (f: RollFacts) => `Con ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}, ${N.es(f.ways)} de los ${f.total.toLocaleString('es')} resultados ${f.ways === 1 ? 'suma' : 'suman'} ${f.sum}: un ${N.es(f.percent)}% de probabilidad.${f.isPeak ? ' Es la suma más probable con estos dados.' : ''}`,
    (f: RollFacts) => `Com ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}, ${N.pt(f.ways)} dos ${f.total.toLocaleString('pt-BR')} resultados ${f.ways === 1 ? 'soma' : 'somam'} ${f.sum} — uma chance de ${N.pt(f.percent)}%.${f.isPeak ? ' É a soma mais provável com essa quantidade.' : ''}`,
    (f: RollFacts) => `${f.dice}個を振って合計${f.sum}になるのは${f.ways.toLocaleString('ja')}通り、確率は${f.percent}%です。${f.isPeak ? 'この個数でいちばん出やすい合計です。' : ''}`,
    (f: RollFacts) => `Mit ${f.dice} ${f.dice === 1 ? 'Würfel' : 'Würfeln'} ${f.ways === 1 ? 'ergibt' : 'ergeben'} ${N.de(f.ways)} von ${f.total.toLocaleString('de')} Würfen die Summe ${f.sum} — ${N.de(f.percent)}%.${f.isPeak ? ' Das ist die häufigste Summe bei dieser Würfelzahl.' : ''}`,
    (f: RollFacts) => `Avec ${f.dice} ${f.dice === 1 ? 'dé' : 'dés'}, ${N.fr(f.ways)} des ${f.total.toLocaleString('fr')} lancers ${f.ways === 1 ? 'donne' : 'donnent'} ${f.sum}, soit ${N.fr(f.percent)}%.${f.isPeak ? ' C’est la somme la plus probable avec ce nombre de dés.' : ''}`,
    (f: RollFacts) => `${f.dice} पासों में ${f.total.toLocaleString('en')} में से ${f.ways} फेंक का जोड़ ${f.sum} होता है — ${f.percent}% संभावना।${f.isPeak ? ' इतने पासों में यही सबसे संभावित जोड़ है।' : ''}`,
    (f: RollFacts) => `掷${f.dice}颗骰子，${f.total.toLocaleString('zh')}种掷法中有${f.ways.toLocaleString('zh')}种点数为${f.sum}，概率${f.percent}%。${f.isPeak ? '这是这个数量下最常出现的点数。' : ''}`,
    (f: RollFacts) => `擲${f.dice}顆骰子，${f.total.toLocaleString('zh-Hant')}種擲法中有${f.ways.toLocaleString('zh-Hant')}種點數為${f.sum}，機率${f.percent}%。${f.isPeak ? '這是這個數量下最常出現的點數。' : ''}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这张表', '怎麼看這張表'),

  how: T(
    [
      '주사위 두 개의 합은 고르게 나오지 않습니다. 7이 나오는 길은 여섯 가지인데 2가 나오는 길은 하나뿐입니다.',
      '개수가 늘수록 가운데로 몰립니다. 여섯 개를 굴리면 합 21 언저리가 대부분이고 6이나 36은 4만 번에 한 번꼴입니다.',
      '평균 합은 개수에 3.5를 곱한 값입니다. 주사위 한 개의 평균이 3.5이기 때문입니다.',
      '확률이 낮다고 안 나오는 것은 아닙니다. 서른여섯 번을 굴려도 합 2가 한 번도 안 나올 확률이 36%쯤 됩니다.',
    ],
    [
      'Two dice do not land evenly. There are six ways to make 7 and only one way to make 2.',
      'The more dice, the tighter the middle. With six dice almost everything lands near 21, while 6 or 36 turns up about once in 47,000 rolls.',
      'The average sum is 3.5 per die, because one die averages 3.5.',
      'Rare is not never — but nor is it due. Roll two dice thirty-six times and there is still roughly a 36% chance you never see a 2.',
    ],
    [
      'Dos dados no caen de forma pareja: hay seis maneras de sumar 7 y solo una de sumar 2.',
      'Cuantos más dados, más se agrupa todo en el centro. Con seis dados casi todo cae cerca de 21, y el 6 o el 36 aparecen una vez cada 47.000 tiradas.',
      'La suma media es 3,5 por dado, porque un dado promedia 3,5.',
      'Raro no es imposible ni tampoco “toca ya”: tira dos dados treinta y seis veces y aún hay un 36% de que nunca salga un 2.',
    ],
    [
      'Dois dados não caem por igual: há seis maneiras de somar 7 e só uma de somar 2.',
      'Quanto mais dados, mais tudo se junta no meio. Com seis dados quase tudo cai perto de 21, e 6 ou 36 aparece uma vez a cada 47 mil jogadas.',
      'A soma média é 3,5 por dado, porque um dado tem média 3,5.',
      'Raro não é impossível nem está “na hora”: jogue dois dados trinta e seis vezes e ainda há 36% de chance de nunca sair 2.',
    ],
    [
      'サイコロ2個の合計は均等には出ません。7になる出方は6通り、2になる出方は1通りだけです。',
      '個数が増えるほど真ん中に寄ります。6個なら合計21前後がほとんどで、6や36は4万7千回に1度ほどです。',
      '平均の合計は1個あたり3.5です。サイコロ1個の平均が3.5だからです。',
      '確率が低いことと出ないことは違います。2個を36回振っても、合計2が一度も出ない確率が36%ほどあります。',
    ],
    [
      'Zwei Würfel fallen nicht gleichmäßig: Für die 7 gibt es sechs Wege, für die 2 nur einen.',
      'Je mehr Würfel, desto enger die Mitte. Bei sechs Würfeln landet fast alles nahe 21, während 6 oder 36 etwa einmal in 47.000 Würfen kommt.',
      'Die Durchschnittssumme beträgt 3,5 je Würfel, denn ein Würfel liegt im Mittel bei 3,5.',
      'Selten heißt weder unmöglich noch überfällig: Wer 36-mal mit zwei Würfeln wirft, sieht mit rund 36% Wahrscheinlichkeit nie eine 2.',
    ],
    [
      'Deux dés ne tombent pas également : il y a six façons de faire 7 et une seule de faire 2.',
      'Plus il y a de dés, plus tout se resserre au centre. Avec six dés, presque tout tombe près de 21, tandis que 6 ou 36 sort environ une fois sur 47 000.',
      'La somme moyenne vaut 3,5 par dé, puisqu’un dé donne 3,5 en moyenne.',
      'Rare ne veut dire ni impossible ni « bientôt » : lancez deux dés trente-six fois et il reste environ 36% de chances de ne jamais voir un 2.',
    ],
    [
      'दो पासे बराबरी से नहीं गिरते: 7 बनाने के छह तरीक़े हैं और 2 बनाने का सिर्फ़ एक।',
      'पासे जितने ज़्यादा, नतीजे उतने बीच में सिमटते हैं। छह पासों में लगभग सब कुछ 21 के आस-पास आता है, जबकि 6 या 36 क़रीब 47,000 फेंक में एक बार।',
      'औसत जोड़ प्रति पासा 3.5 होता है, क्योंकि एक पासे का औसत 3.5 है।',
      'दुर्लभ का मतलब असंभव भी नहीं और “अब तो आना ही चाहिए” भी नहीं: दो पासे छत्तीस बार फेंकिए, फिर भी लगभग 36% संभावना है कि 2 एक बार भी न आए।',
    ],
    [
      '两颗骰子的点数并不均匀。凑成 7 有六条路，凑成 2 只有一条。',
      '骰子越多，结果越往中间挤。六颗骰子几乎都落在 21 附近，而 6 或 36 大约四万七千次才出现一次。',
      '平均点数是每颗 3.5，因为单颗骰子的平均值就是 3.5。',
      '罕见不等于不会出现，也不等于“该轮到了”。两颗骰子掷三十六次，仍有约 36% 的概率一次 2 都没出现。',
    ],
    [
      '兩顆骰子的點數並不均勻。湊成 7 有六條路，湊成 2 只有一條。',
      '骰子越多，結果越往中間擠。六顆骰子幾乎都落在 21 附近，而 6 或 36 大約四萬七千次才出現一次。',
      '平均點數是每顆 3.5，因為單顆骰子的平均值就是 3.5。',
      '罕見不等於不會出現，也不等於「該輪到了」。兩顆骰子擲三十六次，仍有約 36% 的機率一次 2 都沒出現。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '주사위 확률표 111가지 — 개수별 합의 경우의 수',
    'Dice probability table — 111 sums from one to six dice',
    'Tabla de probabilidad de dados — 111 sumas de uno a seis dados',
    'Tabela de probabilidade dos dados — 111 somas de um a seis dados',
    'サイコロ確率表111通り — 個数別の合計と場合の数',
    'Würfel-Wahrscheinlichkeitstabelle — 111 Summen von einem bis sechs Würfeln',
    'Table des probabilités aux dés — 111 sommes de un à six dés',
    'पासा संभावना तालिका — एक से छह पासों के 111 जोड़',
    '骰子概率表 111 种 — 一到六颗骰子的点数组合',
    '骰子機率表 111 種 — 一到六顆骰子的點數組合',
  ),
  hubMetaDesc: T(
    '주사위 1~6개로 나올 수 있는 모든 합의 경우의 수와 확률, 이 값 이상·이하가 나올 확률까지 계산했습니다. 2d6에서 7이 나올 확률은 16.67%입니다.',
    'The number of ways and the probability of every sum you can roll with one to six dice, plus the chance of rolling at least or at most that sum. A 7 on two dice comes up 16.67% of the time.',
    'Las formas y la probabilidad de cada suma con uno a seis dados, además de la probabilidad de sacar esa suma o más, o esa o menos. El 7 con dos dados sale el 16,67% de las veces.',
    'As formas e a probabilidade de cada soma com um a seis dados, mais a chance de tirar essa soma ou mais, ou essa ou menos. O 7 com dois dados sai 16,67% das vezes.',
    'サイコロ1〜6個で出うるすべての合計の場合の数と確率、その合計以上・以下になる確率まで計算しました。2個で7が出る確率は16.67%です。',
    'Möglichkeiten und Wahrscheinlichkeit jeder Summe mit einem bis sechs Würfeln, dazu die Chance auf mindestens oder höchstens diese Summe. Eine 7 mit zwei Würfeln fällt in 16,67% der Fälle.',
    'Le nombre de combinaisons et la probabilité de chaque somme avec un à six dés, plus la chance d’obtenir cette somme ou davantage, ou cette somme ou moins. Le 7 à deux dés sort 16,67% du temps.',
    'एक से छह पासों के हर जोड़ के तरीक़े और संभावना, साथ ही उससे अधिक या कम आने की संभावना। दो पासों पर 7 आने की संभावना 16.67% है।',
    '一到六颗骰子能掷出的每个点数各有多少种组合、概率是多少，以及掷出该点数以上或以下的概率。两颗骰子掷出 7 的概率是 16.67%。',
    '一到六顆骰子能擲出的每個點數各有多少種組合、機率是多少，以及擲出該點數以上或以下的機率。兩顆骰子擲出 7 的機率是 16.67%。',
  ),

  metaTitle: T(
    (f: RollFacts) => `주사위 ${f.dice}개로 합 ${f.sum}이 나올 확률`,
    (f: RollFacts) => `Odds of rolling ${f.sum} on ${f.dice} ${f.dice === 1 ? 'die' : 'dice'}`,
    (f: RollFacts) => `Probabilidad de sacar ${f.sum} con ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}`,
    (f: RollFacts) => `Probabilidade de tirar ${f.sum} com ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}`,
    (f: RollFacts) => `サイコロ${f.dice}個で合計${f.sum}が出る確率`,
    (f: RollFacts) => `Wahrscheinlichkeit für Summe ${f.sum} mit ${f.dice} ${f.dice === 1 ? 'Würfel' : 'Würfeln'}`,
    (f: RollFacts) => `Probabilité d’obtenir ${f.sum} avec ${f.dice} ${f.dice === 1 ? 'dé' : 'dés'}`,
    (f: RollFacts) => `${f.dice} पासों से जोड़ ${f.sum} आने की संभावना`,
    (f: RollFacts) => `${f.dice}颗骰子掷出${f.sum}点的概率`,
    (f: RollFacts) => `${f.dice}顆骰子擲出${f.sum}點的機率`,
  ),

  metaDesc: T(
    (f: RollFacts) => `주사위 ${f.dice}개를 굴려 합이 ${f.sum}이 되는 경우는 ${f.total.toLocaleString('ko')}가지 중 ${f.ways.toLocaleString('ko')}가지, 확률 ${f.percent}%입니다. ${f.sum} 이상이 나올 확률은 ${f.atLeast}%입니다.`,
    (f: RollFacts) => `With ${f.dice} ${f.dice === 1 ? 'die' : 'dice'}, ${f.ways} of ${f.total.toLocaleString('en')} possible rolls total ${f.sum} — a ${f.percent}% chance, or one roll in ${f.oneIn}. Rolling ${f.sum} or more happens ${f.atLeast}% of the time.`,
    (f: RollFacts) => `Con ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}, ${N.es(f.ways)} de ${f.total.toLocaleString('es')} tiradas suman ${f.sum}: un ${N.es(f.percent)}%, una de cada ${N.es(f.oneIn)}. Sacar ${f.sum} o más ocurre el ${N.es(f.atLeast)}% de las veces.`,
    (f: RollFacts) => `Com ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}, ${N.pt(f.ways)} de ${f.total.toLocaleString('pt-BR')} jogadas somam ${f.sum}: ${N.pt(f.percent)}%, uma a cada ${N.pt(f.oneIn)}. Tirar ${f.sum} ou mais acontece ${N.pt(f.atLeast)}% das vezes.`,
    (f: RollFacts) => `サイコロ${f.dice}個で合計${f.sum}になるのは${f.total.toLocaleString('ja')}通り中${f.ways.toLocaleString('ja')}通り、確率${f.percent}%（${f.oneIn}回に1度）です。${f.sum}以上が出る確率は${f.atLeast}%です。`,
    (f: RollFacts) => `Mit ${f.dice} ${f.dice === 1 ? 'Würfel' : 'Würfeln'} ergeben ${N.de(f.ways)} von ${f.total.toLocaleString('de')} Würfen die Summe ${f.sum} — ${N.de(f.percent)}%, also einmal in ${N.de(f.oneIn)} Würfen. ${f.sum} oder mehr fällt in ${N.de(f.atLeast)}% der Fälle.`,
    (f: RollFacts) => `Avec ${f.dice} ${f.dice === 1 ? 'dé' : 'dés'}, ${N.fr(f.ways)} lancer${f.ways === 1 ? '' : 's'} sur ${f.total.toLocaleString('fr')} ${f.ways === 1 ? 'donne' : 'donnent'} ${f.sum} : ${N.fr(f.percent)}%, soit une fois sur ${N.fr(f.oneIn)}. Obtenir ${f.sum} ou plus arrive dans ${N.fr(f.atLeast)}% des cas.`,
    (f: RollFacts) => `${f.dice} पासों में ${f.total.toLocaleString('en')} में से ${f.ways} फेंक का जोड़ ${f.sum} होता है — ${f.percent}% यानी हर ${f.oneIn} फेंक में एक बार। ${f.sum} या उससे अधिक ${f.atLeast}% बार आता है।`,
    (f: RollFacts) => `${f.dice}颗骰子掷出${f.sum}点的组合，在${f.total.toLocaleString('zh')}种掷法中占${f.ways.toLocaleString('zh')}种，概率${f.percent}%，约每${f.oneIn}次出现一次。掷出${f.sum}点或以上的概率是${f.atLeast}%。`,
    (f: RollFacts) => `${f.dice}顆骰子擲出${f.sum}點的組合，在${f.total.toLocaleString('zh-Hant')}種擲法中占${f.ways.toLocaleString('zh-Hant')}種，機率${f.percent}%，約每${f.oneIn}次出現一次。擲出${f.sum}點或以上的機率是${f.atLeast}%。`,
  ),

  hubFaq: T(
    [
      { q: '주사위 두 개로 7이 나올 확률이 얼마인가요?', a: '서른여섯 가지 중 여섯 가지라 16.67%, 여섯 번에 한 번꼴입니다. 1+6, 2+5, 3+4와 그 반대까지 여섯 갈래로 만들어지기 때문에 두 개짜리에서 가장 흔한 합입니다.' },
      { q: '왜 합마다 확률이 다른가요?', a: '주사위 하나하나는 고르지만, 합을 만드는 길의 수가 다르기 때문입니다. 합 2는 1+1 한 가지뿐이고 합 7은 여섯 가지입니다. 길이 많은 합일수록 자주 나옵니다.' },
      { q: '앞에서 안 나온 눈이 이제 나올 차례인가요?', a: '아닙니다. 주사위는 앞의 결과를 기억하지 않습니다. 여섯 번 연속 1이 나왔어도 다음에 1이 나올 확률은 그대로 6분의 1입니다.' },
      { q: '개수를 늘리면 왜 가운데로 몰리나요?', a: '높은 눈과 낮은 눈이 서로 상쇄되기 때문입니다. 여섯 개가 모두 1이 되려면 여섯 번 모두 어긋나야 하지만, 합이 21이 되는 길은 수천 가지입니다.' },
      { q: '이 표의 값은 어떻게 계산했나요?', a: '적어 둔 것은 주사위 개수와 합뿐입니다. 한 개짜리 분포에 주사위를 하나씩 겹쳐 가며 경우의 수를 세고, 그 값을 6의 거듭제곱으로 나눠 확률을 냈습니다.' },
    ],
    [
      { q: 'What are the odds of rolling a 7 with two dice?', a: 'Six of the thirty-six outcomes make 7, so 16.67% — one roll in six. It is built from 1+6, 2+5 and 3+4 each way round, which is why it is the most common total on two dice.' },
      { q: 'Why is one sum more likely than another?', a: 'Each die is fair, but the sums are not built from the same number of paths. There is one way to make 2 and six ways to make 7, and the sum with more paths comes up more often.' },
      { q: 'Is a number that has not come up “due”?', a: 'No. Dice keep no memory of earlier rolls. After six 1s in a row, the chance of another 1 is still one in six.' },
      { q: 'Why do more dice bunch up in the middle?', a: 'High and low faces cancel each other out. Getting six 1s means six things going the same way at once, while thousands of different combinations add up to 21.' },
      { q: 'How were these numbers worked out?', a: 'Only the die count and the sum are stored. The distribution for one die is convolved with another die at a time to count the ways, and dividing by six to the power of the die count gives the probability.' },
    ],
    [
      { q: '¿Qué probabilidad hay de sacar 7 con dos dados?', a: 'Seis de los treinta y seis resultados suman 7, o sea un 16,67%: una de cada seis tiradas. Se forma con 1+6, 2+5 y 3+4 en ambos órdenes, y por eso es el total más frecuente con dos dados.' },
      { q: '¿Por qué unas sumas son más probables que otras?', a: 'Cada dado es justo, pero las sumas no se forman con el mismo número de caminos. Hay una manera de hacer 2 y seis de hacer 7, y la suma con más caminos sale más.' },
      { q: '¿Le “toca” salir a un número que lleva tiempo sin aparecer?', a: 'No. Los dados no recuerdan las tiradas anteriores. Tras seis unos seguidos, la probabilidad de otro uno sigue siendo una entre seis.' },
      { q: '¿Por qué con más dados todo se agrupa en el centro?', a: 'Las caras altas y bajas se compensan. Sacar seis unos exige que seis cosas salgan igual a la vez, mientras que miles de combinaciones distintas suman 21.' },
      { q: '¿Cómo se calculan estos datos?', a: 'Solo se guardan el número de dados y la suma. La distribución de un dado se combina con otro dado cada vez para contar las formas, y al dividir por seis elevado al número de dados sale la probabilidad.' },
    ],
    [
      { q: 'Qual a chance de tirar 7 com dois dados?', a: 'Seis dos trinta e seis resultados somam 7, ou seja 16,67%: uma a cada seis jogadas. Vem de 1+6, 2+5 e 3+4 nas duas ordens, por isso é o total mais comum com dois dados.' },
      { q: 'Por que umas somas são mais prováveis que outras?', a: 'Cada dado é justo, mas as somas não se formam pelo mesmo número de caminhos. Há uma forma de fazer 2 e seis de fazer 7, e a soma com mais caminhos aparece mais.' },
      { q: 'Um número que não sai há tempo está “na hora”?', a: 'Não. Os dados não guardam memória das jogadas anteriores. Depois de seis uns seguidos, a chance de outro um continua sendo uma em seis.' },
      { q: 'Por que com mais dados tudo se junta no meio?', a: 'Faces altas e baixas se compensam. Tirar seis uns exige seis coisas saindo igual ao mesmo tempo, enquanto milhares de combinações diferentes somam 21.' },
      { q: 'Como esses números foram calculados?', a: 'Só a quantidade de dados e a soma ficam guardadas. A distribuição de um dado é combinada com mais um dado de cada vez para contar as formas, e dividir por seis elevado à quantidade de dados dá a probabilidade.' },
    ],
    [
      { q: 'サイコロ2個で7が出る確率は。', a: '36通りのうち6通りなので16.67%、6回に1度です。1+6、2+5、3+4がそれぞれ両方の順で数えられるため、2個ではいちばん出やすい合計になります。' },
      { q: 'なぜ合計ごとに確率が違うのですか。', a: 'サイコロ自体は公平でも、その合計を作る道の数が違うからです。合計2は1+1の1通り、合計7は6通り。道が多い合計ほどよく出ます。' },
      { q: 'しばらく出ていない目は「そろそろ出る」のですか。', a: 'いいえ。サイコロは前の結果を覚えていません。1が6回続いた後でも、次に1が出る確率は6分の1のままです。' },
      { q: '個数を増やすとなぜ真ん中に寄るのですか。', a: '大きい目と小さい目が打ち消し合うからです。6個すべて1になるには6回とも同じ方向に振れる必要がありますが、合計21になる組み合わせは何千通りもあります。' },
      { q: 'この値はどう計算していますか。', a: '持っているのはサイコロの個数と合計だけです。1個の分布にサイコロを1個ずつ重ねて場合の数を数え、6の個数乗で割って確率を出しています。' },
    ],
    [
      { q: 'Wie wahrscheinlich ist eine 7 mit zwei Würfeln?', a: 'Sechs der sechsunddreißig Würfe ergeben 7, also 16,67% — einer von sechs. Sie entsteht aus 1+6, 2+5 und 3+4 in beiden Reihenfolgen und ist deshalb die häufigste Summe mit zwei Würfeln.' },
      { q: 'Warum ist eine Summe wahrscheinlicher als eine andere?', a: 'Jeder Würfel ist fair, aber die Summen entstehen nicht über gleich viele Wege. Zur 2 führt ein Weg, zur 7 führen sechs — und mehr Wege heißt öfter.' },
      { q: 'Ist eine lange ausgebliebene Zahl „fällig“?', a: 'Nein. Würfel haben kein Gedächtnis. Auch nach sechs Einsen in Folge liegt die Chance auf die nächste Eins bei eins zu sechs.' },
      { q: 'Warum drängt sich alles bei mehr Würfeln zur Mitte?', a: 'Hohe und niedrige Augen gleichen sich aus. Sechs Einsen verlangen, dass sechs Dinge gleichzeitig gleich ausfallen, während Tausende verschiedener Kombinationen 21 ergeben.' },
      { q: 'Wie entstehen diese Zahlen?', a: 'Gespeichert sind nur Würfelzahl und Summe. Die Verteilung eines Würfels wird Würfel für Würfel gefaltet, um die Möglichkeiten zu zählen; geteilt durch sechs hoch Würfelzahl ergibt das die Wahrscheinlichkeit.' },
    ],
    [
      { q: 'Quelle est la probabilité de faire 7 avec deux dés ?', a: 'Six des trente-six résultats donnent 7, soit 16,67% — une fois sur six. Elle se compose de 1+6, 2+5 et 3+4 dans les deux sens, d’où le total le plus fréquent à deux dés.' },
      { q: 'Pourquoi certaines sommes sont-elles plus probables ?', a: 'Chaque dé est équitable, mais les sommes ne se construisent pas par autant de chemins. Il y a un chemin vers 2 et six vers 7 : plus de chemins, plus de sorties.' },
      { q: 'Un chiffre absent depuis longtemps est-il « attendu » ?', a: 'Non. Les dés n’ont pas de mémoire. Après six 1 d’affilée, la probabilité d’un nouveau 1 reste d’une sur six.' },
      { q: 'Pourquoi tout se resserre-t-il au centre avec plus de dés ?', a: 'Les faces hautes et basses se compensent. Six 1 exigent que six choses tombent pareil en même temps, alors que des milliers de combinaisons font 21.' },
      { q: 'Comment ces valeurs sont-elles calculées ?', a: 'Seuls le nombre de dés et la somme sont enregistrés. La distribution d’un dé est convoluée dé par dé pour compter les combinaisons, puis divisée par six puissance le nombre de dés.' },
    ],
    [
      { q: 'दो पासों से 7 आने की संभावना कितनी है?', a: 'छत्तीस में से छह परिणाम 7 बनाते हैं, यानी 16.67% — हर छह फेंक में एक। यह 1+6, 2+5 और 3+4 से दोनों क्रमों में बनता है, इसीलिए दो पासों का सबसे आम जोड़ है।' },
      { q: 'कुछ जोड़ ज़्यादा संभावित क्यों होते हैं?', a: 'हर पासा निष्पक्ष है, पर हर जोड़ तक पहुँचने के रास्ते बराबर नहीं होते। 2 बनाने का एक रास्ता है और 7 बनाने के छह — ज़्यादा रास्ते यानी ज़्यादा बार।' },
      { q: 'जो अंक देर से नहीं आया, क्या अब उसकी बारी है?', a: 'नहीं। पासों को पिछली फेंक याद नहीं रहती। लगातार छह बार 1 आने के बाद भी अगली बार 1 आने की संभावना छह में एक ही रहती है।' },
      { q: 'ज़्यादा पासों पर सब कुछ बीच में क्यों सिमटता है?', a: 'बड़े और छोटे अंक एक-दूसरे को काट देते हैं। छह बार 1 आने के लिए छह चीज़ों का एक साथ एक जैसा होना ज़रूरी है, जबकि 21 बनाने के हज़ारों तरीक़े हैं।' },
      { q: 'ये आँकड़े कैसे निकाले गए?', a: 'सिर्फ़ पासों की संख्या और जोड़ दर्ज हैं। एक पासे के वितरण पर एक-एक पासा जोड़ते हुए तरीक़े गिने जाते हैं, और छह की उतनी घात से भाग देकर संभावना निकलती है।' },
    ],
    [
      { q: '两颗骰子掷出 7 的概率是多少？', a: '三十六种结果中有六种是 7，所以是 16.67%，大约六次出现一次。它由 1+6、2+5、3+4 各自的两种顺序组成，共六条路，因此是两颗骰子最常见的点数。' },
      { q: '为什么有的点数比别的更容易出现？', a: '每颗骰子都是公平的，但凑出各个点数的路数不一样。凑成 2 只有一条路，凑成 7 有六条，路多的点数自然出得更频繁。' },
      { q: '很久没出的点数是不是“该出了”？', a: '不是。骰子不会记得之前掷了什么。连续掷出六个 1 之后，下一次再出 1 的概率仍然是六分之一。' },
      { q: '为什么骰子越多，结果越挤在中间？', a: '大点和小点会互相抵消。六颗全是 1，意味着六件事同时朝同一个方向偏；而凑成 21 的组合有好几千种。' },
      { q: '这些数字是怎么算出来的？', a: '存下来的只有骰子数量和点数。程序把单颗骰子的分布逐颗卷积，数出组合数，再除以 6 的骰子数次方，得到概率。' },
    ],
    [
      { q: '兩顆骰子擲出 7 的機率是多少？', a: '三十六種結果中有六種是 7，所以是 16.67%，大約六次出現一次。它由 1+6、2+5、3+4 各自的兩種順序組成，共六條路，因此是兩顆骰子最常見的點數。' },
      { q: '為什麼有的點數比別的更容易出現？', a: '每顆骰子都是公平的，但湊出各個點數的路數不一樣。湊成 2 只有一條路，湊成 7 有六條，路多的點數自然出得更頻繁。' },
      { q: '很久沒出的點數是不是「該出了」？', a: '不是。骰子不會記得之前擲了什麼。連續擲出六個 1 之後，下一次再出 1 的機率仍然是六分之一。' },
      { q: '為什麼骰子越多，結果越擠在中間？', a: '大點和小點會互相抵消。六顆全是 1，意味著六件事同時朝同一個方向偏；而湊成 21 的組合有好幾千種。' },
      { q: '這些數字是怎麼算出來的？', a: '存下來的只有骰子數量和點數。程式把單顆骰子的分布逐顆摺積，數出組合數，再除以 6 的骰子數次方，得到機率。' },
    ],
  ),

  rollFaq: T(
    (f: RollFacts) => [
      { q: `주사위 ${f.dice}개로 합 ${f.sum}이 나올 확률은?`, a: `${f.percent}%입니다. ${f.total}가지 중 ${f.ways}가지이고, 대략 ${f.oneIn}번에 한 번꼴입니다.` },
      { q: `합 ${f.sum} 이상이 나올 확률은?`, a: `${f.atLeast}%입니다. 반대로 ${f.sum} 이하는 ${f.atMost}%입니다.` },
      { q: `이 개수에서 가장 흔한 합은?`, a: f.isPeak ? `합 ${f.sum}이 바로 그것입니다. 평균 합은 ${f.mean}입니다.` : `평균인 ${f.mean} 근처입니다. 합 ${f.sum}보다 흔한 합이 ${f.rank}개 있습니다.` },
      { q: `여러 번 굴리면 이 값이 반드시 나오나요?`, a: `아닙니다. 매번 굴림은 앞의 결과와 무관합니다. ${f.oneIn}번에 한 번꼴이라는 말은 평균이 그렇다는 뜻이지 순서를 정해 준다는 뜻이 아닙니다.` },
    ],
    (f: RollFacts) => [
      { q: `What are the odds of rolling ${f.sum} on ${f.dice} ${f.dice === 1 ? 'die' : 'dice'}?`, a: `${f.percent}% — ${f.ways} of ${f.total.toLocaleString('en')} possible rolls, or roughly one roll in ${f.oneIn}.` },
      { q: `How often do I roll ${f.sum} or more?`, a: `${f.atLeast}% of the time. Rolling ${f.sum} or less happens ${f.atMost}% of the time.` },
      { q: `What is the most likely sum with this many dice?`, a: f.isPeak ? `This one. The average sum is ${f.mean}.` : `Something near the average of ${f.mean}. ${f.rank} sums come up more often than ${f.sum}.` },
      { q: `Will it definitely turn up if I keep rolling?`, a: `No. Each roll is independent of the last. One in ${f.oneIn} is a long-run average, not a schedule.` },
    ],
    (f: RollFacts) => [
      { q: `¿Qué probabilidad hay de sacar ${f.sum} con ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}?`, a: `Un ${N.es(f.percent)}%: ${N.es(f.ways)} de ${f.total.toLocaleString('es')} tiradas posibles, más o menos una de cada ${N.es(f.oneIn)}.` },
      { q: `¿Con qué frecuencia sale ${f.sum} o más?`, a: `El ${N.es(f.atLeast)}% de las veces. Sacar ${f.sum} o menos ocurre el ${N.es(f.atMost)}%.` },
      { q: `¿Cuál es la suma más probable con estos dados?`, a: f.isPeak ? `Esta misma. La suma media es ${N.es(f.mean)}.` : `Algo cercano a la media de ${N.es(f.mean)}. Hay ${f.rank} sumas que salen más que ${f.sum}.` },
      { q: `¿Saldrá seguro si sigo tirando?`, a: `No. Cada tirada es independiente de la anterior. Una de cada ${N.es(f.oneIn)} es un promedio a la larga, no un turno.` },
    ],
    (f: RollFacts) => [
      { q: `Qual a chance de tirar ${f.sum} com ${f.dice} ${f.dice === 1 ? 'dado' : 'dados'}?`, a: `${N.pt(f.percent)}%: ${N.pt(f.ways)} de ${f.total.toLocaleString('pt-BR')} jogadas possíveis, mais ou menos uma a cada ${N.pt(f.oneIn)}.` },
      { q: `Com que frequência sai ${f.sum} ou mais?`, a: `${N.pt(f.atLeast)}% das vezes. Tirar ${f.sum} ou menos acontece ${N.pt(f.atMost)}%.` },
      { q: `Qual a soma mais provável com essa quantidade?`, a: f.isPeak ? `Esta mesma. A soma média é ${N.pt(f.mean)}.` : `Algo perto da média de ${N.pt(f.mean)}. Há ${f.rank} somas que saem mais que ${f.sum}.` },
      { q: `Vai sair com certeza se eu continuar jogando?`, a: `Não. Cada jogada é independente da anterior. Uma a cada ${N.pt(f.oneIn)} é média no longo prazo, não uma fila.` },
    ],
    (f: RollFacts) => [
      { q: `サイコロ${f.dice}個で合計${f.sum}が出る確率は。`, a: `${f.percent}%です。${f.total}通り中${f.ways}通り、およそ${f.oneIn}回に1度です。` },
      { q: `合計${f.sum}以上が出る確率は。`, a: `${f.atLeast}%です。逆に${f.sum}以下は${f.atMost}%です。` },
      { q: `この個数でいちばん出やすい合計は。`, a: f.isPeak ? `この合計です。平均の合計は${f.mean}です。` : `平均の${f.mean}あたりです。合計${f.sum}より出やすい合計が${f.rank}個あります。` },
      { q: `何度も振れば必ず出ますか。`, a: `いいえ。振るたびに前の結果とは無関係です。${f.oneIn}回に1度というのは長い目で見た平均で、順番を約束するものではありません。` },
    ],
    (f: RollFacts) => [
      { q: `Wie wahrscheinlich ist Summe ${f.sum} mit ${f.dice} ${f.dice === 1 ? 'Würfel' : 'Würfeln'}?`, a: `${N.de(f.percent)}% — ${N.de(f.ways)} von ${f.total.toLocaleString('de')} möglichen Würfen, also etwa einer in ${N.de(f.oneIn)}.` },
      { q: `Wie oft fällt ${f.sum} oder mehr?`, a: `In ${N.de(f.atLeast)}% der Fälle. ${f.sum} oder weniger fällt in ${N.de(f.atMost)}%.` },
      { q: `Welche Summe ist bei dieser Würfelzahl am häufigsten?`, a: f.isPeak ? `Genau diese. Die Durchschnittssumme beträgt ${N.de(f.mean)}.` : `Etwas nahe dem Mittel von ${N.de(f.mean)}. ${f.rank} Summen fallen häufiger als ${f.sum}.` },
      { q: `Kommt sie sicher, wenn ich lange genug würfle?`, a: `Nein. Jeder Wurf ist unabhängig vom vorigen. Einer in ${N.de(f.oneIn)} ist ein Langzeitmittel, kein Fahrplan.` },
    ],
    (f: RollFacts) => [
      { q: `Quelle est la probabilité d’obtenir ${f.sum} avec ${f.dice} ${f.dice === 1 ? 'dé' : 'dés'} ?`, a: `${N.fr(f.percent)}% : ${N.fr(f.ways)} lancer${f.ways === 1 ? '' : 's'} sur ${f.total.toLocaleString('fr')}, soit environ une fois sur ${N.fr(f.oneIn)}.` },
      { q: `À quelle fréquence obtient-on ${f.sum} ou plus ?`, a: `Dans ${N.fr(f.atLeast)}% des cas. ${f.sum} ou moins arrive dans ${N.fr(f.atMost)}% des cas.` },
      { q: `Quelle est la somme la plus probable avec ce nombre de dés ?`, a: f.isPeak ? `Celle-ci précisément. La somme moyenne vaut ${N.fr(f.mean)}.` : `Une valeur proche de la moyenne de ${N.fr(f.mean)}. ${f.rank} sommes sortent plus souvent que ${f.sum}.` },
      { q: `Sortira-t-elle forcément si je lance longtemps ?`, a: `Non. Chaque lancer est indépendant du précédent. Une fois sur ${N.fr(f.oneIn)} est une moyenne à long terme, pas un tour de rôle.` },
    ],
    (f: RollFacts) => [
      { q: `${f.dice} पासों से जोड़ ${f.sum} आने की संभावना क्या है?`, a: `${f.percent}% — ${f.total.toLocaleString('en')} संभव फेंकों में से ${f.ways}, यानी लगभग हर ${f.oneIn} फेंक में एक बार।` },
      { q: `${f.sum} या उससे अधिक कितनी बार आता है?`, a: `${f.atLeast}% बार। ${f.sum} या उससे कम ${f.atMost}% बार आता है।` },
      { q: `इतने पासों में सबसे संभावित जोड़ कौन-सा है?`, a: f.isPeak ? `यही। औसत जोड़ ${f.mean} है।` : `औसत ${f.mean} के आस-पास। ${f.sum} से ज़्यादा बार आने वाले ${f.rank} जोड़ हैं।` },
      { q: `बार-बार फेंकने पर क्या यह ज़रूर आएगा?`, a: `नहीं। हर फेंक पिछली से स्वतंत्र है। हर ${f.oneIn} में एक बार लंबे समय का औसत है, कोई बारी नहीं।` },
    ],
    (f: RollFacts) => [
      { q: `${f.dice}颗骰子掷出${f.sum}点的概率是多少？`, a: `${f.percent}%。${f.total.toLocaleString('zh')}种掷法中有${f.ways.toLocaleString('zh')}种，大约每${f.oneIn}次出现一次。` },
      { q: `掷出${f.sum}点或以上的概率是多少？`, a: `${f.atLeast}%。反过来，${f.sum}点或以下是${f.atMost}%。` },
      { q: `这个数量下最常出现的点数是哪个？`, a: f.isPeak ? `就是${f.sum}点。平均点数是${f.mean}。` : `在平均值${f.mean}附近。比${f.sum}点更常出现的点数有${f.rank}个。` },
      { q: `一直掷下去就一定会出吗？`, a: `不会。每一次掷都与上一次无关。每${f.oneIn}次一次说的是长期平均，并不排出场次。` },
    ],
    (f: RollFacts) => [
      { q: `${f.dice}顆骰子擲出${f.sum}點的機率是多少？`, a: `${f.percent}%。${f.total.toLocaleString('zh-Hant')}種擲法中有${f.ways.toLocaleString('zh-Hant')}種，大約每${f.oneIn}次出現一次。` },
      { q: `擲出${f.sum}點或以上的機率是多少？`, a: `${f.atLeast}%。反過來，${f.sum}點或以下是${f.atMost}%。` },
      { q: `這個數量下最常出現的點數是哪個？`, a: f.isPeak ? `就是${f.sum}點。平均點數是${f.mean}。` : `在平均值${f.mean}附近。比${f.sum}點更常出現的點數有${f.rank}個。` },
      { q: `一直擲下去就一定會出嗎？`, a: `不會。每一次擲都與上一次無關。每${f.oneIn}次一次說的是長期平均，並不排出場次。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DICE_UI: L<DiceUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DiceUI>;
