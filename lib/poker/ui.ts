/**
 * 홀덤 시작 핸드 섹션의 화면 문구 — 열 언어.
 *
 * 숫자는 `{n}` 자리를 비워 두고 채운다. 소수점 기호가 언어마다 달라서(0.45% /
 * 0,45%) 숫자를 문장에 끼우기 전에 그 언어의 형식으로 만든다 — 표와 본문이
 * 따로 놀면 같은 값이 두 모양으로 보인다.
 */
import { LANG10_CODES, type L10, type Lang10 } from '../i18n/lang10.ts';
import type { HandKind } from './list.ts';
import type { Tier } from './facts.ts';

const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L10<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

export const fill = (tpl: string, vars: Record<string, string | number>): string =>
  tpl.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));

/** 그 언어의 숫자 형식. 자릿수는 부르는 쪽이 정한다 */
const NUM: L10<string> = {
  ko: 'ko', en: 'en', es: 'es', pt: 'pt-BR', ja: 'ja', de: 'de', fr: 'fr', hi: 'hi', zh: 'zh-Hans', tw: 'zh-Hant',
};

export const numFmt = (lang: Lang10, value: number, digits = 2): string =>
  new Intl.NumberFormat(NUM[lang], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

export interface PokerUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: string;
  metaDesc: string;
  byTier: string;
  byKind: string;
  chart: string;
  chartNote: string;
  combos: string;
  combosOf: string;
  dealt: string;
  oneIn: string;
  oneInLabel: string;
  score: string;
  scoreNote: string;
  rankLabel: string;
  rankValue: string;
  gapLabel: string;
  gapValue: string;
  connected: string;
  broadway: string;
  yes: string;
  no: string;
  flopTitle: string;
  flopNote: string;
  related: string;
  faq: string;
  hq1: string;
  ha1: string;
  hq2: string;
  hq3: string;
  ha3: string;
  q1: string;
  a1: string;
  q2: string;
  q3: string;
  a3: string;
  kind: Record<HandKind, string>;
  kindNote: Record<HandKind, string>;
  tier: Record<Tier, string>;
  tierNote: Record<Tier, string>;
  flop: Record<string, string>;
}

const FLAT: Record<string, L10<string>> = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('홀덤 시작 핸드', "Hold'em Starting Hands", 'Manos iniciales de Hold’em', 'Mãos iniciais de Hold’em', 'ホールデムのスターティングハンド', "Hold'em-Starthände", 'Mains de départ au Hold’em', 'होल्डम शुरुआती हाथ', '德州扑克起手牌', '德州撲克起手牌'),
  hubTitle: T(
    '홀덤 시작 핸드 {n}가지',
    "{n} Hold'em Starting Hands",
    '{n} manos iniciales de Hold’em',
    '{n} mãos iniciais de Hold’em',
    'ホールデムのスターティングハンド{n}種',
    "{n} Hold'em-Starthände",
    '{n} mains de départ au Hold’em',
    '{n} होल्डम शुरुआती हाथ',
    '德州扑克起手牌{n}种',
    '德州撲克起手牌{n}種',
  ),
  hubLead: T(
    '두 장을 받는 경우의 수는 1,326가지지만 세기가 다른 핸드는 {n}가지입니다. 확률은 표에서 옮겨 적지 않고 조합으로 셌습니다.',
    'There are 1,326 ways to be dealt two cards, but only {n} distinct hands. Every number here is counted from combinations, not copied from a chart.',
    'Hay 1.326 formas de recibir dos cartas, pero solo {n} manos distintas. Cada número sale de contar combinaciones, no de copiar una tabla.',
    'Há 1.326 formas de receber duas cartas, mas apenas {n} mãos distintas. Cada número vem de contar combinações, não de copiar uma tabela.',
    '2枚の配られ方は1,326通りですが、強さの違う手は{n}種類です。確率は表を写さず、組み合わせを数えて出しています。',
    'Es gibt 1.326 Möglichkeiten, zwei Karten zu bekommen, aber nur {n} verschiedene Hände. Jede Zahl hier ist aus Kombinationen gezählt, nicht abgeschrieben.',
    'Il y a 1 326 façons de recevoir deux cartes, mais seulement {n} mains distinctes. Chaque nombre est compté à partir des combinaisons, pas recopié.',
    'दो पत्ते मिलने के 1,326 तरीके हैं, पर अलग-अलग हाथ सिर्फ {n} हैं। हर आँकड़ा संयोजन गिनकर निकाला गया है, तालिका से नकल नहीं।',
    '发到两张牌的方式有1,326种，但强弱不同的起手牌只有{n}种。这里的每个数字都是数组合算出来的，不是照表抄的。',
    '發到兩張牌的方式有1,326種，但強弱不同的起手牌只有{n}種。這裡的每個數字都是數組合算出來的，不是照表抄的。',
  ),
  hubMetaTitle: T(
    '홀덤 시작 핸드 {n}가지 — 확률과 첸 점수',
    "{n} Hold'em Starting Hands — Odds and Chen Score",
    '{n} manos iniciales de Hold’em — probabilidades y puntuación Chen',
    '{n} mãos iniciais de Hold’em — probabilidades e pontuação Chen',
    'ホールデムのスターティングハンド{n}種 — 確率とチェン点数',
    "{n} Hold'em-Starthände — Wahrscheinlichkeiten und Chen-Wert",
    '{n} mains de départ au Hold’em — probabilités et score de Chen',
    '{n} होल्डम शुरुआती हाथ — संभावना और चेन स्कोर',
    '德州扑克起手牌{n}种 — 概率与陈氏评分',
    '德州撲克起手牌{n}種 — 機率與陳氏評分',
  ),
  hubMetaDesc: T(
    'AA·AKs·72o까지 시작 핸드 {n}가지의 조합 수와 받을 확률, 플롭 확률, 첸 점수 순위를 한 곳에서 봅니다.',
    'Combinations, deal odds, flop odds and Chen ranking for all {n} starting hands — AA, AKs, 72o and everything between.',
    'Combinaciones, probabilidad de recibirla, probabilidades en el flop y ranking Chen de las {n} manos iniciales: AA, AKs, 72o y todo lo demás.',
    'Combinações, probabilidade de receber, probabilidades no flop e ranking Chen das {n} mãos iniciais: AA, AKs, 72o e tudo mais.',
    'AAからAKs、72oまでスターティングハンド{n}種の組み合わせ数・配られる確率・フロップ確率・チェン点数順位をまとめて。',
    'Kombinationen, Austeilwahrscheinlichkeit, Flop-Chancen und Chen-Rangliste für alle {n} Starthände — AA, AKs, 72o und alles dazwischen.',
    'Combinaisons, probabilité de réception, chances au flop et classement Chen des {n} mains de départ : AA, AKs, 72o et tout le reste.',
    'सभी {n} शुरुआती हाथों के संयोजन, मिलने की संभावना, फ्लॉप संभावना और चेन रैंकिंग — AA, AKs, 72o और बाकी सब।',
    '全部{n}种起手牌的组合数、发到概率、翻牌概率与陈氏评分排名：AA、AKs、72o 一应俱全。',
    '全部{n}種起手牌的組合數、發到機率、翻牌機率與陳氏評分排名：AA、AKs、72o 一應俱全。',
  ),
  metaTitle: T('{name} 확률', '{name} odds', 'Probabilidades de {name}', 'Probabilidades de {name}', '{name}の確率', '{name} Wahrscheinlichkeiten', 'Probabilités de {name}', '{name} संभावना', '{name} 概率', '{name} 機率'),
  metaDesc: T(
    '{name} — 조합 {combos}가지, {oneIn}번에 한 번 들어옵니다. 첸 점수 {score}점, 플롭 확률까지 한 장에 정리했습니다.',
    '{name} — {combos} combinations, dealt about once every {oneIn} hands. Chen score {score}, with flop odds on one page.',
    '{name} — {combos} combinaciones, sale una vez cada {oneIn} manos. Puntuación Chen {score}, con las probabilidades del flop.',
    '{name} — {combos} combinações, sai uma vez a cada {oneIn} mãos. Pontuação Chen {score}, com as probabilidades do flop.',
    '{name} — 組み合わせ{combos}通り、{oneIn}回に1回配られます。チェン点数{score}点、フロップ確率まで1ページに。',
    '{name} — {combos} Kombinationen, etwa jede {oneIn}. Hand. Chen-Wert {score}, samt Flop-Chancen auf einer Seite.',
    '{name} — {combos} combinaisons, environ une main sur {oneIn}. Score de Chen {score}, avec les chances au flop.',
    '{name} — {combos} संयोजन, हर {oneIn} हाथ में लगभग एक बार। चेन स्कोर {score}, फ्लॉप संभावना समेत।',
    '{name} — {combos}种组合，大约每{oneIn}手出现一次。陈氏评分{score}分，附翻牌概率。',
    '{name} — {combos}種組合，大約每{oneIn}手出現一次。陳氏評分{score}分，附翻牌機率。',
  ),
  byTier: T('등급으로 보기', 'By tier', 'Por categoría', 'Por categoria', '等級で見る', 'Nach Stufe', 'Par catégorie', 'श्रेणी के अनुसार', '按等级', '按等級'),
  byKind: T('갈래로 보기', 'By type', 'Por tipo', 'Por tipo', '種類で見る', 'Nach Art', 'Par type', 'प्रकार के अनुसार', '按类型', '按類型'),
  chart: T('전체 표', 'Full chart', 'Tabla completa', 'Tabela completa', '全体表', 'Gesamttabelle', 'Tableau complet', 'पूरा चार्ट', '完整表格', '完整表格'),
  chartNote: T(
    '위쪽 삼각형이 수티드, 대각선이 포켓 페어, 아래쪽이 오프수트입니다. 색이 짙을수록 첸 점수가 높습니다.',
    'Above the diagonal is suited, the diagonal itself is pocket pairs, below is offsuit. Darker means a higher Chen score.',
    'Encima de la diagonal, del mismo palo; en la diagonal, parejas servidas; debajo, de distinto palo. Cuanto más oscuro, mayor puntuación Chen.',
    'Acima da diagonal, do mesmo naipe; na diagonal, pares servidos; abaixo, de naipes diferentes. Quanto mais escuro, maior a pontuação Chen.',
    '対角線より上がスーテッド、対角線がポケットペア、下がオフスートです。濃いほどチェン点数が高くなります。',
    'Oberhalb der Diagonale suited, auf der Diagonale Paare, darunter offsuit. Je dunkler, desto höher der Chen-Wert.',
    'Au-dessus de la diagonale : assorti ; sur la diagonale : paires servies ; en dessous : dépareillé. Plus c’est foncé, plus le score de Chen est élevé.',
    'विकर्ण के ऊपर सूटेड, विकर्ण पर पॉकेट पेयर, नीचे ऑफसूट। जितना गहरा रंग, उतना ऊँचा चेन स्कोर।',
    '对角线以上是同花，对角线是口袋对子，以下是非同花。颜色越深，陈氏评分越高。',
    '對角線以上是同花，對角線是口袋對子，以下是非同花。顏色越深，陳氏評分越高。',
  ),
  combos: T('조합 수', 'Combinations', 'Combinaciones', 'Combinações', '組み合わせ', 'Kombinationen', 'Combinaisons', 'संयोजन', '组合数', '組合數'),
  combosOf: T('1,326가지 중 {n}가지', '{n} of 1,326', '{n} de 1.326', '{n} de 1.326', '1,326通り中{n}通り', '{n} von 1.326', '{n} sur 1 326', '1,326 में से {n}', '1,326种中的{n}种', '1,326種中的{n}種'),
  dealt: T('받을 확률', 'Chance of being dealt', 'Probabilidad de recibirla', 'Probabilidade de receber', '配られる確率', 'Austeilwahrscheinlichkeit', 'Probabilité de la recevoir', 'मिलने की संभावना', '发到的概率', '發到的機率'),
  oneIn: T('{n}번에 한 번', 'about 1 in {n}', 'aprox. 1 de cada {n}', 'aprox. 1 em {n}', '約{n}回に1回', 'etwa 1 von {n}', 'environ 1 sur {n}', 'लगभग {n} में 1', '约{n}手一次', '約{n}手一次'),
  oneInLabel: T('들어오는 빈도', 'Frequency', 'Frecuencia', 'Frequência', '頻度', 'Häufigkeit', 'Fréquence', 'आवृत्ति', '出现频率', '出現頻率'),
  score: T('첸 점수', 'Chen score', 'Puntuación Chen', 'Pontuação Chen', 'チェン点数', 'Chen-Wert', 'Score de Chen', 'चेन स्कोर', '陈氏评分', '陳氏評分'),
  scoreNote: T(
    '첸 공식은 높은 카드에 값을 주고, 페어면 두 배, 무늬가 같으면 +2, 사이가 벌어진 만큼 빼서 세기를 한 숫자로 만듭니다.',
    'The Chen formula scores the top card, doubles it for a pair, adds 2 when suited and subtracts for the gap between the cards.',
    'La fórmula de Chen puntúa la carta alta, la duplica si es pareja, suma 2 si son del mismo palo y resta según la distancia entre cartas.',
    'A fórmula de Chen pontua a carta alta, dobra se for par, soma 2 se do mesmo naipe e subtrai conforme a distância entre as cartas.',
    'チェン公式は高い方のカードに点を与え、ペアなら2倍、同じスートなら+2、間隔が空くほど減点して強さを一つの数字にします。',
    'Die Chen-Formel bewertet die höhere Karte, verdoppelt bei einem Paar, gibt +2 für gleiche Farbe und zieht für die Lücke ab.',
    'La formule de Chen note la carte haute, la double pour une paire, ajoute 2 si assorti et retranche selon l’écart entre les cartes.',
    'चेन फॉर्मूला ऊँचे पत्ते को अंक देता है, जोड़ी पर दुगुना करता है, सूटेड पर +2 और अंतर के हिसाब से घटाता है।',
    '陈氏公式给高牌打分，成对翻倍，同花加2，两张牌相隔越远扣得越多。',
    '陳氏公式給高牌打分，成對翻倍，同花加2，兩張牌相隔越遠扣得越多。',
  ),
  rankLabel: T('첸 점수 순위', 'Chen ranking', 'Ranking Chen', 'Ranking Chen', 'チェン点数の順位', 'Chen-Rang', 'Classement Chen', 'चेन रैंक', '陈氏评分排名', '陳氏評分排名'),
  rankValue: T('{n}위 / {total}', '#{n} of {total}', 'nº {n} de {total}', 'nº {n} de {total}', '{total}中{n}位', 'Platz {n} von {total}', '{n}e sur {total}', '{total} में {n}वाँ', '第{n}名 / 共{total}', '第{n}名 / 共{total}'),
  gapLabel: T('사이 간격', 'Gap', 'Distancia', 'Distância', '間隔', 'Lücke', 'Écart', 'अंतर', '间隔', '間隔'),
  gapValue: T('{n}칸', '{n}', '{n}', '{n}', '{n}', '{n}', '{n}', '{n}', '{n}', '{n}'),
  connected: T('붙어 있는 두 장', 'Connected', 'Conectadas', 'Conectadas', 'コネクター', 'Verbunden', 'Connectées', 'जुड़े हुए', '连牌', '連牌'),
  broadway: T('둘 다 10 이상', 'Both broadway cards', 'Ambas altas (10+)', 'Ambas altas (10+)', '両方10以上', 'Beide Broadway-Karten', 'Deux cartes hautes', 'दोनों बड़े पत्ते', '两张都是大牌', '兩張都是大牌'),
  yes: T('예', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '是', '是'),
  no: T('아니오', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '否', '否'),
  flopTitle: T('플롭에서 무엇이 나오나', 'What the flop brings', 'Qué trae el flop', 'O que o flop traz', 'フロップで何が来るか', 'Was der Flop bringt', 'Ce que le flop apporte', 'फ्लॉप क्या लाता है', '翻牌能中什么', '翻牌能中什麼'),
  flopNote: T(
    '남은 50장에서 석 장을 뽑는 19,600가지를 바닥에 두고 센 값입니다.',
    'Counted over the 19,600 ways to deal three cards from the 50 you cannot see.',
    'Contado sobre las 19.600 formas de repartir tres cartas de las 50 que no ves.',
    'Contado sobre as 19.600 formas de dar três cartas das 50 que você não vê.',
    '見えていない50枚から3枚を配る19,600通りを分母に数えた値です。',
    'Gezählt über die 19.600 Möglichkeiten, drei Karten aus den 50 unbekannten zu geben.',
    'Compté sur les 19 600 façons de tirer trois cartes parmi les 50 inconnues.',
    'जो 50 पत्ते नहीं दिखते, उनमें से तीन बाँटने के 19,600 तरीकों पर गिना गया।',
    '以看不见的50张牌中发出三张的19,600种方式为分母数出来的。',
    '以看不見的50張牌中發出三張的19,600種方式為分母數出來的。',
  ),
  related: T('가까운 핸드', 'Nearby hands', 'Manos cercanas', 'Mãos próximas', '近い手', 'Ähnliche Hände', 'Mains voisines', 'मिलते-जुलते हाथ', '相近的牌', '相近的牌'),
  faq: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'आम सवाल', '常见问题', '常見問題'),
  hq1: T('시작 핸드가 왜 {n}가지인가요?', 'Why are there only {n} starting hands?', '¿Por qué solo hay {n} manos iniciales?', 'Por que só existem {n} mãos iniciais?', 'スターティングハンドはなぜ{n}種類なのですか？', 'Warum gibt es nur {n} Starthände?', 'Pourquoi seulement {n} mains de départ ?', 'शुरुआती हाथ सिर्फ {n} क्यों हैं?', '起手牌为什么只有{n}种？', '起手牌為什麼只有{n}種？'),
  ha1: T(
    '두 장을 받는 방법은 1,326가지지만 무늬 이름만 다른 것은 세기가 같습니다. 포켓 페어 {pair}가지, 수티드 {suited}가지, 오프수트 {offsuit}가지를 더해 {n}가지입니다.',
    'Two cards can come in 1,326 ways, but hands that differ only by which suit are equally strong. {pair} pocket pairs + {suited} suited + {offsuit} offsuit = {n}.',
    'Dos cartas salen de 1.326 formas, pero las manos que solo cambian de palo valen lo mismo. {pair} parejas + {suited} del mismo palo + {offsuit} de distinto palo = {n}.',
    'Duas cartas saem de 1.326 formas, mas mãos que só mudam de naipe valem o mesmo. {pair} pares + {suited} do mesmo naipe + {offsuit} de naipes diferentes = {n}.',
    '2枚の配られ方は1,326通りですが、スートの名前だけが違う手は強さが同じです。ポケットペア{pair}種＋スーテッド{suited}種＋オフスート{offsuit}種＝{n}種。',
    'Zwei Karten kommen auf 1.326 Arten, aber Hände, die sich nur in der Farbe unterscheiden, sind gleich stark. {pair} Paare + {suited} suited + {offsuit} offsuit = {n}.',
    'Deux cartes arrivent de 1 326 façons, mais les mains qui ne diffèrent que par la couleur valent pareil. {pair} paires + {suited} assorties + {offsuit} dépareillées = {n}.',
    'दो पत्ते 1,326 तरीकों से आ सकते हैं, पर सिर्फ सूट बदलने से ताकत नहीं बदलती। {pair} पॉकेट पेयर + {suited} सूटेड + {offsuit} ऑफसूट = {n}।',
    '两张牌有1,326种发法，但只是花色不同的牌强弱一样。{pair}种口袋对子＋{suited}种同花＋{offsuit}种非同花＝{n}种。',
    '兩張牌有1,326種發法，但只是花色不同的牌強弱一樣。{pair}種口袋對子＋{suited}種同花＋{offsuit}種非同花＝{n}種。',
  ),
  hq2: T('첸 점수는 무엇인가요?', 'What is the Chen score?', '¿Qué es la puntuación Chen?', 'O que é a pontuação Chen?', 'チェン点数とは何ですか？', 'Was ist der Chen-Wert?', 'Qu’est-ce que le score de Chen ?', 'चेन स्कोर क्या है?', '陈氏评分是什么？', '陳氏評分是什麼？'),
  hq3: T('수티드가 정말 그렇게 좋은가요?', 'Is suited really that much better?', '¿De verdad vale tanto ser del mismo palo?', 'Ser do mesmo naipe vale tanto assim?', 'スーテッドはそんなに強いのですか？', 'Ist suited wirklich so viel besser?', 'Être assorti change-t-il vraiment tant que ça ?', 'क्या सूटेड सच में इतना बेहतर है?', '同花真的强很多吗？', '同花真的強很多嗎？'),
  ha3: T(
    '같은 무늬 두 장이면 플롭에서 플러시 드로가 뜰 확률이 {draw}%, 곧바로 플러시가 될 확률이 {flush}%입니다. 크지 않아 보여도 오프수트에는 아예 없는 길입니다.',
    'Suited cards flop a flush draw {draw}% of the time and a made flush {flush}%. It looks small, but offsuit hands have none of it.',
    'Con cartas del mismo palo, el flop trae proyecto de color el {draw}% y color hecho el {flush}%. Parece poco, pero de distinto palo eso no existe.',
    'Com cartas do mesmo naipe, o flop traz projeto de flush em {draw}% e flush feito em {flush}%. Parece pouco, mas com naipes diferentes isso não existe.',
    '同じスートならフロップでフラッシュドローが{draw}%、いきなりフラッシュが{flush}%です。小さく見えても、オフスートには無い道です。',
    'Suited trifft in {draw}% der Flops einen Flushdraw und in {flush}% gleich einen Flush. Klingt wenig, gibt es offsuit aber gar nicht.',
    'Assorties, les mains touchent un tirage couleur sur {draw}% des flops et une couleur faite sur {flush}%. C’est peu, mais dépareillé n’a pas cette porte.',
    'सूटेड होने पर फ्लॉप में फ्लश ड्रॉ {draw}% और बना हुआ फ्लश {flush}% बार आता है। कम लगता है, पर ऑफसूट में यह रास्ता ही नहीं।',
    '同花牌在翻牌圈拿到同花听牌的概率是{draw}%，直接成同花是{flush}%。看着不多，但非同花根本没有这条路。',
    '同花牌在翻牌圈拿到同花聽牌的機率是{draw}%，直接成同花是{flush}%。看著不多，但非同花根本沒有這條路。',
  ),
  q1: T('{name}는 얼마나 자주 들어오나요?', 'How often is {name} dealt?', '¿Con qué frecuencia sale {name}?', 'Com que frequência {name} sai?', '{name}はどれくらいの頻度で来ますか？', 'Wie oft kommt {name}?', 'À quelle fréquence reçoit-on {name} ?', '{name} कितनी बार मिलता है?', '{name} 多久出现一次？', '{name} 多久出現一次？'),
  a1: T(
    '{combos}가지 조합이라 1,326번 중 {combos}번, 즉 {pct}%입니다. 대략 {oneIn}번에 한 번입니다.',
    '{combos} of the 1,326 combinations, or {pct}% — about once every {oneIn} hands.',
    '{combos} de las 1.326 combinaciones, es decir {pct}%: una vez cada {oneIn} manos.',
    '{combos} das 1.326 combinações, ou seja {pct}%: uma vez a cada {oneIn} mãos.',
    '1,326通り中{combos}通り、つまり{pct}%です。およそ{oneIn}回に1回。',
    '{combos} von 1.326 Kombinationen, also {pct}% — etwa jede {oneIn}. Hand.',
    '{combos} combinaisons sur 1 326, soit {pct}% — environ une main sur {oneIn}.',
    '1,326 में से {combos} संयोजन, यानी {pct}% — लगभग हर {oneIn} हाथ में एक बार।',
    '1,326种组合里占{combos}种，即{pct}%，大约每{oneIn}手一次。',
    '1,326種組合裡佔{combos}種，即{pct}%，大約每{oneIn}手一次。',
  ),
  q2: T('어느 갈래에 드나요?', 'What type of hand is it?', '¿Qué tipo de mano es?', 'Que tipo de mão é?', 'どの種類の手ですか？', 'Welche Art von Hand ist das?', 'De quel type de main s’agit-il ?', 'यह किस प्रकार का हाथ है?', '它属于哪一类？', '它屬於哪一類？'),
  q3: T('첸 점수는 몇 점인가요?', 'What is its Chen score?', '¿Cuál es su puntuación Chen?', 'Qual é a pontuação Chen?', 'チェン点数は何点ですか？', 'Wie hoch ist der Chen-Wert?', 'Quel est son score de Chen ?', 'इसका चेन स्कोर क्या है?', '它的陈氏评分是多少？', '它的陳氏評分是多少？'),
  a3: T(
    '{score}점으로 {n}가지 가운데 {rank}위이고 {tier}에 듭니다.',
    '{score} points — #{rank} of {n}, which puts it in the {tier} group.',
    '{score} puntos: nº {rank} de {n}, lo que la sitúa en el grupo {tier}.',
    '{score} pontos: nº {rank} de {n}, o que a coloca no grupo {tier}.',
    '{score}点で{n}種中{rank}位、{tier}に入ります。',
    '{score} Punkte — Platz {rank} von {n} und damit in der Gruppe {tier}.',
    '{score} points — {rank}e sur {n}, ce qui la place dans le groupe {tier}.',
    '{score} अंक — {n} में {rank}वाँ, यानी {tier} श्रेणी।',
    '{score}分，在{n}种中排第{rank}名，属于{tier}。',
    '{score}分，在{n}種中排第{rank}名，屬於{tier}。',
  ),
};

const KIND: Record<HandKind, L10<string>> = {
  pair: T('포켓 페어', 'Pocket pair', 'Pareja servida', 'Par servido', 'ポケットペア', 'Pocketpaar', 'Paire servie', 'पॉकेट पेयर', '口袋对子', '口袋對子'),
  suited: T('수티드', 'Suited', 'Del mismo palo', 'Do mesmo naipe', 'スーテッド', 'Suited', 'Assortie', 'सूटेड', '同花', '同花'),
  offsuit: T('오프수트', 'Offsuit', 'De distinto palo', 'De naipes diferentes', 'オフスート', 'Offsuit', 'Dépareillée', 'ऑफसूट', '非同花', '非同花'),
};

const KIND_NOTE: Record<HandKind, L10<string>> = {
  pair: T(
    '같은 순위 두 장. 무늬 짝이 여섯 가지라 가장 드물게 들어옵니다.',
    'Two cards of the same rank. Six suit pairings, so the rarest type to be dealt.',
    'Dos cartas del mismo valor. Seis combinaciones de palos: el tipo más raro.',
    'Duas cartas do mesmo valor. Seis combinações de naipes: o tipo mais raro.',
    '同じ数字の2枚。スートの組は6通りで、いちばん来にくい種類です。',
    'Zwei Karten desselben Ranges. Sechs Farbkombinationen — die seltenste Art.',
    'Deux cartes de même valeur. Six combinaisons de couleurs : le type le plus rare.',
    'एक ही रैंक के दो पत्ते। सूट के छह जोड़े, इसलिए सबसे कम मिलने वाला प्रकार।',
    '两张点数相同的牌。花色组合有六种，是最少见的一类。',
    '兩張點數相同的牌。花色組合有六種，是最少見的一類。',
  ),
  suited: T(
    '무늬가 같은 두 장. 조합이 넷뿐이지만 플러시로 가는 길이 열려 있습니다.',
    'Two cards of the same suit. Only four combinations, but the flush door stays open.',
    'Dos cartas del mismo palo. Solo cuatro combinaciones, pero la puerta al color queda abierta.',
    'Duas cartas do mesmo naipe. Só quatro combinações, mas a porta do flush fica aberta.',
    '同じスートの2枚。組み合わせは4通りだけですが、フラッシュへの道が開いています。',
    'Zwei Karten derselben Farbe. Nur vier Kombinationen, aber der Weg zum Flush bleibt offen.',
    'Deux cartes de même couleur. Quatre combinaisons seulement, mais la porte de la couleur reste ouverte.',
    'एक ही सूट के दो पत्ते। सिर्फ चार संयोजन, पर फ्लश का रास्ता खुला रहता है।',
    '两张同花色的牌。组合只有四种，但通往同花的路是开的。',
    '兩張同花色的牌。組合只有四種，但通往同花的路是開的。',
  ),
  offsuit: T(
    '무늬가 다른 두 장. 조합이 열둘이라 가장 자주 들어오고, 플러시는 기대하기 어렵습니다.',
    'Two cards of different suits. Twelve combinations, so the most common type — and no flush to hope for.',
    'Dos cartas de distinto palo. Doce combinaciones: el tipo más frecuente, sin color a la vista.',
    'Duas cartas de naipes diferentes. Doze combinações: o tipo mais frequente, sem flush à vista.',
    '違うスートの2枚。組み合わせが12通りでいちばんよく来ますが、フラッシュは望めません。',
    'Zwei Karten verschiedener Farben. Zwölf Kombinationen — die häufigste Art, aber kein Flush in Sicht.',
    'Deux cartes de couleurs différentes. Douze combinaisons : le type le plus fréquent, sans couleur en vue.',
    'अलग-अलग सूट के दो पत्ते। बारह संयोजन, इसलिए सबसे आम — और फ्लश की उम्मीद नहीं।',
    '两张不同花色的牌。组合有十二种，最常见，但别指望同花。',
    '兩張不同花色的牌。組合有十二種，最常見，但別指望同花。',
  ),
};

const TIER: Record<Tier, L10<string>> = {
  premium: T('최상위', 'Premium', 'Premium', 'Premium', 'プレミアム', 'Premium', 'Premium', 'प्रीमियम', '顶级', '頂級'),
  strong: T('강한 핸드', 'Strong', 'Fuerte', 'Forte', '強い手', 'Stark', 'Forte', 'मज़बूत', '较强', '較強'),
  playable: T('둘 만한 핸드', 'Playable', 'Jugable', 'Jogável', '打てる手', 'Spielbar', 'Jouable', 'खेलने लायक', '可玩', '可玩'),
  marginal: T('경계선', 'Marginal', 'Marginal', 'Marginal', 'ぎりぎり', 'Grenzwertig', 'Marginale', 'सीमांत', '边缘', '邊緣'),
  weak: T('약한 핸드', 'Weak', 'Débil', 'Fraca', '弱い手', 'Schwach', 'Faible', 'कमज़ोर', '偏弱', '偏弱'),
};

const TIER_NOTE: Record<Tier, L10<string>> = {
  premium: T('첸 점수 10점 이상 — 어느 자리에서도 들어갈 수 있는 핸드입니다.', 'Chen 10 or more — playable from any seat.', 'Chen 10 o más: jugable desde cualquier posición.', 'Chen 10 ou mais: jogável de qualquer posição.', 'チェン10点以上 — どの席からでも入れる手です。', 'Chen 10 oder mehr — von jeder Position spielbar.', 'Chen 10 ou plus — jouable depuis n’importe quelle position.', 'चेन 10 या ज़्यादा — किसी भी पोज़िशन से खेलने लायक।', '陈氏10分以上 — 任何位置都能进池。', '陳氏10分以上 — 任何位置都能進池。'),
  strong: T('첸 점수 8~9점 — 앞자리만 아니면 대개 들어갑니다.', 'Chen 8–9 — usually fine outside of early position.', 'Chen 8–9: bien salvo en posición temprana.', 'Chen 8–9: bem, exceto em posição inicial.', 'チェン8〜9点 — 早い席でなければたいてい入れます。', 'Chen 8–9 — außerhalb früher Position meist in Ordnung.', 'Chen 8–9 — correct hors position précoce.', 'चेन 8–9 — शुरुआती पोज़िशन के अलावा ठीक।', '陈氏8~9分 — 除前位外一般可以打。', '陳氏8~9分 — 除前位外一般可以打。'),
  playable: T('첸 점수 6~7점 — 뒷자리나 사람이 적을 때 쓰는 핸드입니다.', 'Chen 6–7 — for late position or a short table.', 'Chen 6–7: para posición tardía o mesa corta.', 'Chen 6–7: para posição tardia ou mesa curta.', 'チェン6〜7点 — 遅い席や人数が少ないときの手です。', 'Chen 6–7 — für späte Position oder wenige Gegner.', 'Chen 6–7 — pour position tardive ou table courte.', 'चेन 6–7 — लेट पोज़िशन या कम खिलाड़ियों के लिए।', '陈氏6~7分 — 适合后位或人少的桌子。', '陳氏6~7分 — 適合後位或人少的桌子。'),
  marginal: T('첸 점수 4~5점 — 조건이 맞을 때만 값이 나옵니다.', 'Chen 4–5 — only worth it when the conditions line up.', 'Chen 4–5: solo compensa si se dan las condiciones.', 'Chen 4–5: só compensa quando as condições ajudam.', 'チェン4〜5点 — 条件がそろったときだけ価値が出ます。', 'Chen 4–5 — nur bei passenden Umständen lohnend.', 'Chen 4–5 — rentable seulement si les conditions s’y prêtent.', 'चेन 4–5 — तभी फायदेमंद जब हालात साथ हों।', '陈氏4~5分 — 只有条件合适时才有价值。', '陳氏4~5分 — 只有條件合適時才有價值。'),
  weak: T('첸 점수 3점 이하 — 대체로 접는 쪽이 낫습니다.', 'Chen 3 or less — usually a fold.', 'Chen 3 o menos: normalmente, retirarse.', 'Chen 3 ou menos: normalmente, desistir.', 'チェン3点以下 — たいていは降りる手です。', 'Chen 3 oder weniger — meist ein Fold.', 'Chen 3 ou moins — en général, on se couche.', 'चेन 3 या कम — आम तौर पर फोल्ड।', '陈氏3分以下 — 一般选择弃牌。', '陳氏3分以下 — 一般選擇棄牌。'),
};

const FLOP: Record<string, L10<string>> = {
  set: T('셋 이상', 'Set or better', 'Trío o mejor', 'Trinca ou melhor', 'セット以上', 'Set oder besser', 'Brelan ou mieux', 'सेट या बेहतर', '中三条或更好', '中三條或更好'),
  quads: T('포카드', 'Quads', 'Póker', 'Quadra', 'クアッズ', 'Vierling', 'Carré', 'क्वाड्स', '四条', '四條'),
  noOver: T('오버카드 없는 플롭', 'No overcard on the flop', 'Flop sin sobrecartas', 'Flop sem cartas maiores', 'オーバーカード無しのフロップ', 'Flop ohne höhere Karte', 'Flop sans surcarte', 'फ्लॉप पर कोई बड़ा पत्ता नहीं', '翻牌无超牌', '翻牌無超牌'),
  pair: T('한 장이라도 짝이 맞음', 'Pair at least one card', 'Emparejar al menos una', 'Emparelhar ao menos uma', '最低1枚がペアになる', 'Mindestens eine Karte paart', 'Apparier au moins une carte', 'कम से कम एक जोड़ी', '至少中一对', '至少中一對'),
  twoPair: T('투 페어', 'Two pair', 'Doble pareja', 'Dois pares', 'ツーペア', 'Zwei Paare', 'Double paire', 'दो जोड़ी', '两对', '兩對'),
  trips: T('트립스', 'Trips', 'Trío', 'Trinca', 'トリップス', 'Drilling', 'Brelan', 'ट्रिप्स', '三条', '三條'),
  flushDraw: T('플러시 드로', 'Flush draw', 'Proyecto de color', 'Projeto de flush', 'フラッシュドロー', 'Flushdraw', 'Tirage couleur', 'फ्लश ड्रॉ', '同花听牌', '同花聽牌'),
  flush: T('바로 플러시', 'Flopped flush', 'Color en el flop', 'Flush no flop', 'フロップでフラッシュ', 'Flush im Flop', 'Couleur au flop', 'फ्लॉप पर फ्लश', '翻牌成同花', '翻牌成同花'),
};

const invert = <T,>(spec: Record<string, L10<T>>): L10<Record<string, T>> =>
  Object.fromEntries(
    LANG10_CODES.map(lang => [lang, Object.fromEntries(Object.entries(spec).map(([k, v]) => [k, v[lang]]))]),
  ) as L10<Record<string, T>>;

const flat = invert(FLAT);
const kind = invert(KIND as unknown as Record<string, L10<string>>);
const kindNote = invert(KIND_NOTE as unknown as Record<string, L10<string>>);
const tier = invert(TIER as unknown as Record<string, L10<string>>);
const tierNote = invert(TIER_NOTE as unknown as Record<string, L10<string>>);
const flop = invert(FLOP);

export const POKER_UI: L10<PokerUI> = Object.fromEntries(
  LANG10_CODES.map(lang => [
    lang,
    { ...flat[lang], kind: kind[lang], kindNote: kindNote[lang], tier: tier[lang], tierNote: tierNote[lang], flop: flop[lang] },
  ]),
) as unknown as L10<PokerUI>;

export const pokerUi = (lang: Lang10): PokerUI => POKER_UI[lang];
