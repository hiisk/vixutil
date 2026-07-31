/**
 * 타로 화면의 문구 — 여덟 언어.
 *
 * 마이너 56장의 이름과 해석은 여기서 조합된다. "컵 3"은 수트 이름 + 계급 이름이고,
 * 해석은 계급이 가진 단계(3 = 자라남)와 수트가 가진 주제(컵 = 감정)를 겹쳐 읽는
 * 전통적인 방법을 그대로 문장으로 만든다.
 *
 * 언어마다 다른 것은 잇는 순서다. 한국어는 "컵 3", 영어는 "Three of Cups",
 * 프랑스어는 "Trois de Coupe" — 그래서 이름을 만드는 함수도 언어마다 둔다.
 */
import { LANG8_CODES, type L8, type Lang8 } from '../i18n/lang.ts';
import type { Rank, Suit } from './deck.ts';

export interface FaqItem { q: string; a: string }

export interface TarotUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  majorTitle: string;
  majorLead: string;
  minorTitle: string;
  suitLabel: Record<Suit, string>;
  /** 수트가 다루는 주제 — 해석의 절반 */
  suitTheme: Record<Suit, string>;
  elementLabel: Record<'fire' | 'water' | 'air' | 'earth', string>;
  rankLabel: Record<Rank, string>;
  /** 계급이 나타내는 단계 — 해석의 나머지 절반 */
  rankTheme: Record<Rank, string>;
  /** 수트와 계급으로 카드 이름을 만든다 */
  minorName: (suit: string, rank: string) => string;
  /** "메이저 아르카나 16번" — 낱말을 이어 붙이면 어순이 깨지는 언어가 있다 */
  majorLine: (n: number) => string;
  minorLine: (suit: string, rank: string) => string;
  /** 계급 주제와 수트 주제를 겹쳐 해석 한 문장을 만든다 */
  minorReading: (rankTheme: string, suitTheme: string) => string;
  minorReversed: (rankTheme: string, suitTheme: string) => string;
  uprightLabel: string;
  reversedLabel: string;
  arcanaLabel: string;
  majorWord: string;
  minorWord: string;
  numberLabel: string;
  suitWord: string;
  rankWord: string;
  elementWord: string;
  sameSuitTitle: string;
  sameRankTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  drawCta: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string) => string;
  metaDesc: (name: string, upright: string) => string;
  hubFaq: FaqItem[];
  cardFaq: (name: string, up: string, rev: string, kind: string) => FaqItem[];
}

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V): L8<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

type Spec = { [K in keyof TarotUI]: L8<TarotUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम'),
  section: T('타로 카드', 'Tarot cards', 'Cartas del tarot', 'Cartas de tarô', 'タロットカード', 'Tarotkarten', 'Cartes de tarot', 'टैरो कार्ड'),

  hubTitle: T(
    '타로 78장의 뜻',
    'The meaning of all 78 tarot cards',
    'El significado de las 78 cartas del tarot',
    'O significado das 78 cartas de tarô',
    'タロット78枚の意味',
    'Die Bedeutung aller 78 Tarotkarten',
    'La signification des 78 cartes du tarot',
    'सभी 78 टैरो कार्ड के अर्थ',
  ),

  hubLead: T(
    '메이저 22장과 마이너 56장의 정방향·역방향 뜻을 한자리에서. 수트와 숫자가 어떻게 겹쳐 읽히는지도 함께 정리했습니다.',
    'Upright and reversed meanings for the 22 major and 56 minor arcana, with how suit and number combine to give a reading.',
    'Significados al derecho y al revés de los 22 arcanos mayores y los 56 menores, y cómo se combinan palo y número para leer una carta.',
    'Significados normais e invertidos dos 22 arcanos maiores e 56 menores, e como naipe e número se combinam na leitura.',
    '大アルカナ22枚と小アルカナ56枚の正位置・逆位置の意味をまとめました。スートと数字がどう重なって読まれるかも一緒に説明します。',
    'Aufrechte und umgekehrte Bedeutungen der 22 großen und 56 kleinen Arkana — samt der Frage, wie Farbe und Zahl zusammen die Deutung ergeben.',
    "Significations à l'endroit et à l'envers des 22 arcanes majeurs et des 56 mineurs, avec la façon dont couleur et nombre se combinent.",
    '22 बड़े और 56 छोटे आर्काना के सीधे और उल्टे अर्थ — साथ में यह भी कि सूट और अंक मिलकर पाठ कैसे बनाते हैं।',
  ),

  majorTitle: T('메이저 아르카나 22장', 'The 22 major arcana', 'Los 22 arcanos mayores', 'Os 22 arcanos maiores', '大アルカナ22枚', 'Die 22 großen Arkana', 'Les 22 arcanes majeurs', '22 बड़े आर्काना'),

  majorLead: T(
    '광대에서 세계까지, 큰 흐름과 전환점을 말하는 카드들입니다.',
    'From the Fool to the World — the cards that speak of the large movements and turning points.',
    'Del Loco al Mundo: las cartas que hablan de los grandes movimientos y los puntos de giro.',
    'Do Louco ao Mundo: as cartas que falam dos grandes movimentos e das viradas.',
    '愚者から世界まで、大きな流れと転換点を語る札です。',
    'Vom Narren bis zur Welt — die Karten der großen Bewegungen und Wendepunkte.',
    "Du Mat au Monde : les cartes qui parlent des grands mouvements et des tournants.",
    'मूर्ख से संसार तक — वे पत्ते जो बड़े प्रवाह और मोड़ की बात करते हैं।',
  ),

  minorTitle: T('마이너 아르카나 56장', 'The 56 minor arcana', 'Los 56 arcanos menores', 'Os 56 arcanos menores', '小アルカナ56枚', 'Die 56 kleinen Arkana', 'Les 56 arcanes mineurs', '56 छोटे आर्काना'),

  suitLabel: T(
    { wands: '완드', cups: '컵', swords: '소드', pentacles: '펜타클' },
    { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
    { wands: 'Bastos', cups: 'Copas', swords: 'Espadas', pentacles: 'Oros' },
    { wands: 'Paus', cups: 'Copas', swords: 'Espadas', pentacles: 'Ouros' },
    { wands: 'ワンド', cups: 'カップ', swords: 'ソード', pentacles: 'ペンタクル' },
    { wands: 'Stäbe', cups: 'Kelche', swords: 'Schwerter', pentacles: 'Münzen' },
    { wands: 'Bâtons', cups: 'Coupes', swords: 'Épées', pentacles: 'Deniers' },
    { wands: 'वैंड', cups: 'कप', swords: 'स्वॉर्ड', pentacles: 'पेंटाकल' },
  ),

  suitTheme: T(
    { wands: '의지와 행동, 새로 벌이는 일', cups: '감정과 관계, 마음이 오가는 자리', swords: '생각과 말, 가르고 판단하는 일', pentacles: '돈과 몸, 손에 잡히는 결과' },
    { wands: 'will and action, the things you start', cups: 'feeling and relationship, what passes between people', swords: 'thought and speech, what gets decided and said', pentacles: 'money and body, results you can hold' },
    { wands: 'voluntad y acción, lo que se emprende', cups: 'emoción y vínculo, lo que pasa entre las personas', swords: 'pensamiento y palabra, lo que se decide y se dice', pentacles: 'dinero y cuerpo, resultados que se tocan' },
    { wands: 'vontade e ação, o que se começa', cups: 'emoção e vínculo, o que passa entre as pessoas', swords: 'pensamento e palavra, o que se decide e se diz', pentacles: 'dinheiro e corpo, resultados que se pegam' },
    { wands: '意志と行動、新しく始めること', cups: '感情と関係、人のあいだを行き来するもの', swords: '思考と言葉、決めて言い切ること', pentacles: 'お金と体、手に取れる結果' },
    { wands: 'Wille und Handeln, was man anfängt', cups: 'Gefühl und Beziehung, was zwischen Menschen läuft', swords: 'Denken und Sprechen, was entschieden und gesagt wird', pentacles: 'Geld und Körper, greifbare Ergebnisse' },
    { wands: "la volonté et l'action, ce que l'on entreprend", cups: 'le sentiment et le lien, ce qui circule entre les gens', swords: 'la pensée et la parole, ce qui se décide et se dit', pentacles: "l'argent et le corps, les résultats tangibles" },
    { wands: 'इच्छा और कर्म, जो आप शुरू करते हैं', cups: 'भाव और रिश्ते, जो लोगों के बीच बहता है', swords: 'विचार और वाणी, जो तय और कहा जाता है', pentacles: 'धन और देह, हाथ में आने वाले नतीजे' },
  ),

  elementLabel: T(
    { fire: '불', water: '물', air: '공기', earth: '흙' },
    { fire: 'Fire', water: 'Water', air: 'Air', earth: 'Earth' },
    { fire: 'Fuego', water: 'Agua', air: 'Aire', earth: 'Tierra' },
    { fire: 'Fogo', water: 'Água', air: 'Ar', earth: 'Terra' },
    { fire: '火', water: '水', air: '風', earth: '地' },
    { fire: 'Feuer', water: 'Wasser', air: 'Luft', earth: 'Erde' },
    { fire: 'Feu', water: 'Eau', air: 'Air', earth: 'Terre' },
    { fire: 'अग्नि', water: 'जल', air: 'वायु', earth: 'पृथ्वी' },
  ),

  rankLabel: T(
    { 1: '에이스', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '시종', 12: '기사', 13: '여왕', 14: '왕' },
    { 1: 'Ace', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten', 11: 'Page', 12: 'Knight', 13: 'Queen', 14: 'King' },
    { 1: 'As', 2: 'Dos', 3: 'Tres', 4: 'Cuatro', 5: 'Cinco', 6: 'Seis', 7: 'Siete', 8: 'Ocho', 9: 'Nueve', 10: 'Diez', 11: 'Sota', 12: 'Caballero', 13: 'Reina', 14: 'Rey' },
    { 1: 'Ás', 2: 'Dois', 3: 'Três', 4: 'Quatro', 5: 'Cinco', 6: 'Seis', 7: 'Sete', 8: 'Oito', 9: 'Nove', 10: 'Dez', 11: 'Valete', 12: 'Cavaleiro', 13: 'Rainha', 14: 'Rei' },
    { 1: 'エース', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: 'ペイジ', 12: 'ナイト', 13: 'クイーン', 14: 'キング' },
    { 1: 'Ass', 2: 'Zwei', 3: 'Drei', 4: 'Vier', 5: 'Fünf', 6: 'Sechs', 7: 'Sieben', 8: 'Acht', 9: 'Neun', 10: 'Zehn', 11: 'Bube', 12: 'Ritter', 13: 'Königin', 14: 'König' },
    { 1: 'As', 2: 'Deux', 3: 'Trois', 4: 'Quatre', 5: 'Cinq', 6: 'Six', 7: 'Sept', 8: 'Huit', 9: 'Neuf', 10: 'Dix', 11: 'Valet', 12: 'Cavalier', 13: 'Reine', 14: 'Roi' },
    { 1: 'इक्का', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच', 6: 'छह', 7: 'सात', 8: 'आठ', 9: 'नौ', 10: 'दस', 11: 'पेज', 12: 'नाइट', 13: 'रानी', 14: 'राजा' },
  ),

  rankTheme: T(
    {
      1: '무언가가 처음 열리는 자리', 2: '둘 사이의 균형과 선택', 3: '싹이 자라 모양을 갖추는 단계',
      4: '자리를 잡고 지키는 단계', 5: '부딪히고 잃어 보는 단계', 6: '주고받으며 회복되는 단계',
      7: '홀로 버티며 시험받는 단계', 8: '속도가 붙어 움직이는 단계', 9: '거의 다 왔지만 힘든 단계',
      10: '한 바퀴가 끝나고 무게가 실리는 단계', 11: '배우기 시작한 사람의 태도', 12: '앞뒤 안 보고 달려드는 태도',
      13: '안에서 품고 헤아리는 태도', 14: '밖으로 맡아 다스리는 태도',
    },
    {
      1: 'something opening for the first time', 2: 'balance and choice between two', 3: 'a sprout taking shape and growing',
      4: 'settling in and holding what you have', 5: 'friction, loss and being tested', 6: 'giving, receiving and recovering',
      7: 'standing alone and being tried', 8: 'picking up speed and moving', 9: 'nearly there, and hardest here',
      10: 'a cycle completed and its full weight', 11: 'the attitude of someone just starting to learn', 12: 'the attitude of charging in without looking back',
      13: 'the attitude of holding and understanding from within', 14: 'the attitude of taking charge and governing',
    },
    {
      1: 'algo que se abre por primera vez', 2: 'equilibrio y elección entre dos', 3: 'un brote que toma forma y crece',
      4: 'asentarse y conservar lo logrado', 5: 'roce, pérdida y prueba', 6: 'dar, recibir y recuperarse',
      7: 'resistir solo y ser puesto a prueba', 8: 'tomar velocidad y moverse', 9: 'casi al final, y lo más duro',
      10: 'un ciclo cumplido con todo su peso', 11: 'la actitud de quien empieza a aprender', 12: 'la actitud de lanzarse sin mirar atrás',
      13: 'la actitud de sostener y comprender desde dentro', 14: 'la actitud de hacerse cargo y gobernar',
    },
    {
      1: 'algo que se abre pela primeira vez', 2: 'equilíbrio e escolha entre dois', 3: 'um broto que ganha forma e cresce',
      4: 'assentar e guardar o que se tem', 5: 'atrito, perda e prova', 6: 'dar, receber e se recuperar',
      7: 'resistir sozinho e ser testado', 8: 'ganhar velocidade e se mover', 9: 'quase lá, e mais difícil aqui',
      10: 'um ciclo cumprido com todo o seu peso', 11: 'a atitude de quem começa a aprender', 12: 'a atitude de avançar sem olhar para trás',
      13: 'a atitude de acolher e compreender por dentro', 14: 'a atitude de assumir e governar',
    },
    {
      1: '何かが初めて開く場所', 2: '二つのあいだの均衡と選択', 3: '芽が形を得て育つ段階',
      4: '腰を据えて守る段階', 5: 'ぶつかり、失い、試される段階', 6: '与え合い、回復する段階',
      7: 'ひとりで踏みとどまり試される段階', 8: '勢いがついて動く段階', 9: 'あと少しだが、いちばんつらい段階',
      10: '一巡が終わり重みがかかる段階', 11: '学び始めた人の構え', 12: '後先を見ずに飛び込む構え',
      13: '内で受けとめ、はかる構え', 14: '外に立って治める構え',
    },
    {
      1: 'etwas öffnet sich zum ersten Mal', 2: 'Gleichgewicht und Wahl zwischen zweien', 3: 'ein Trieb nimmt Form an und wächst',
      4: 'sich einrichten und das Erreichte halten', 5: 'Reibung, Verlust und Prüfung', 6: 'geben, nehmen und sich erholen',
      7: 'allein standhalten und geprüft werden', 8: 'Fahrt aufnehmen und sich bewegen', 9: 'fast am Ziel und hier am schwersten',
      10: 'ein vollendeter Kreis mit seinem ganzen Gewicht', 11: 'die Haltung dessen, der zu lernen beginnt', 12: 'die Haltung, ohne Umschau loszupreschen',
      13: 'die Haltung, von innen zu tragen und zu verstehen', 14: 'die Haltung, zu übernehmen und zu lenken',
    },
    {
      1: "quelque chose s'ouvre pour la première fois", 2: 'équilibre et choix entre deux', 3: 'une pousse qui prend forme et grandit',
      4: "s'installer et garder ce que l'on a", 5: 'friction, perte et mise à l’épreuve', 6: 'donner, recevoir et se rétablir',
      7: 'tenir seul et être éprouvé', 8: 'prendre de la vitesse et avancer', 9: 'presque au bout, et le plus dur ici',
      10: 'un cycle achevé et tout son poids', 11: "l'attitude de qui commence à apprendre", 12: "l'attitude de foncer sans regarder derrière",
      13: "l'attitude d'accueillir et de comprendre de l'intérieur", 14: "l'attitude de prendre en charge et de gouverner",
    },
    {
      1: 'कुछ पहली बार खुलने की जगह', 2: 'दो के बीच संतुलन और चुनाव', 3: 'अंकुर का रूप लेकर बढ़ना',
      4: 'जम जाना और जो है उसे सँभालना', 5: 'टकराव, हानि और परीक्षा', 6: 'देना, पाना और उबरना',
      7: 'अकेले डटे रहना और परखा जाना', 8: 'रफ़्तार पकड़कर बढ़ना', 9: 'मंज़िल के क़रीब, पर सबसे कठिन',
      10: 'एक चक्र पूरा और उसका पूरा भार', 11: 'सीखना शुरू करने वाले का भाव', 12: 'बिना पीछे देखे कूद पड़ने का भाव',
      13: 'भीतर से थामने और समझने का भाव', 14: 'ज़िम्मा लेकर शासन करने का भाव',
    },
  ),

  minorName: T(
    (s: string, r: string) => `${s} ${r}`,
    (s: string, r: string) => `${r} of ${s}`,
    (s: string, r: string) => `${r} de ${s}`,
    (s: string, r: string) => `${r} de ${s}`,
    (s: string, r: string) => `${s}の${r}`,
    (s: string, r: string) => `${r} der ${s}`,
    (s: string, r: string) => `${r} ${/^[aeiouéèêh]/i.test(s) ? "d'" : 'de '}${s}`,
    (s: string, r: string) => `${s} का ${r}`,
  ),

  majorLine: T(
    (n: number) => `메이저 아르카나 ${n}번`,
    (n: number) => `Major arcana, number ${n}`,
    (n: number) => `Arcano mayor, número ${n}`,
    (n: number) => `Arcano maior, número ${n}`,
    (n: number) => `大アルカナ ${n}番`,
    (n: number) => `Großes Arkanum, Nummer ${n}`,
    (n: number) => `Arcane majeur, numéro ${n}`,
    (n: number) => `बड़ा आर्काना, संख्या ${n}`,
  ),

  minorLine: T(
    (s: string, r: string) => `마이너 아르카나 · ${s} ${r}`,
    (s: string, r: string) => `Minor arcana · ${r} of ${s}`,
    (s: string, r: string) => `Arcano menor · ${r} de ${s}`,
    (s: string, r: string) => `Arcano menor · ${r} de ${s}`,
    (s: string, r: string) => `小アルカナ · ${s}の${r}`,
    (s: string, r: string) => `Kleines Arkanum · ${r} der ${s}`,
    (s: string, r: string) => `Arcane mineur · ${r} ${/^[aeiouéèêh]/i.test(s) ? "d'" : 'de '}${s}`,
    (s: string, r: string) => `छोटा आर्काना · ${s} का ${r}`,
  ),

  minorReading: T(
    (rank: string, suit: string) => `${rank}입니다. 이 수트는 ${suit}를 다루므로, 그 자리에서 이 단계가 일어난다고 읽습니다.`,
    (rank: string, suit: string) => `This is ${rank}. The suit deals with ${suit}, so read the stage as happening in that area of life.`,
    (rank: string, suit: string) => `Es ${rank}. El palo trata de ${suit}, así que esa etapa ocurre en ese terreno.`,
    (rank: string, suit: string) => `É ${rank}. O naipe trata de ${suit}, então essa etapa acontece nesse terreno.`,
    (rank: string, suit: string) => `${rank}です。このスートは${suit}を扱うので、その領域でこの段階が起きていると読みます。`,
    (rank: string, suit: string) => `Das ist ${rank}. Die Farbe handelt von ${suit}, also spielt sich diese Stufe in diesem Bereich ab.`,
    (rank: string, suit: string) => `C'est ${rank}. La couleur traite de ${suit} : cette étape se joue donc dans ce domaine.`,
    (rank: string, suit: string) => `यह ${rank} है। यह सूट ${suit} से जुड़ा है, इसलिए यह चरण उसी क्षेत्र में घटता है।`,
  ),

  minorReversed: T(
    (rank: string, suit: string) => `역방향에서는 이 단계가 막히거나 지나칩니다. ${suit}에서 ${rank}이(가) 제 몫을 못 하고 있는지 보세요.`,
    (rank: string, suit: string) => `Reversed, the stage is blocked or overdone — check whether ${rank} is failing to do its work in ${suit}.`,
    (rank: string, suit: string) => `Al revés, la etapa se atasca o se excede: mira si ${rank} no cumple su papel en ${suit}.`,
    (rank: string, suit: string) => `Invertida, a etapa trava ou passa do ponto: veja se ${rank} não cumpre seu papel em ${suit}.`,
    (rank: string, suit: string) => `逆位置ではこの段階が詰まるか行きすぎます。${suit}において${rank}が働けていないかを見てください。`,
    (rank: string, suit: string) => `Umgekehrt stockt die Stufe oder schießt übers Ziel — prüfen Sie, ob ${rank} in ${suit} seine Arbeit nicht tut.`,
    (rank: string, suit: string) => `À l'envers, l'étape se bloque ou déborde : voyez si ${rank} ne remplit pas son rôle dans ${suit}.`,
    (rank: string, suit: string) => `उल्टा होने पर यह चरण अटकता है या हद पार करता है — देखिए कि ${suit} में ${rank} अपना काम कर पा रहा है या नहीं।`,
  ),

  uprightLabel: T('정방향', 'Upright', 'Al derecho', 'Normal', '正位置', 'Aufrecht', "À l'endroit", 'सीधा'),
  reversedLabel: T('역방향', 'Reversed', 'Invertida', 'Invertida', '逆位置', 'Umgekehrt', "À l'envers", 'उल्टा'),
  arcanaLabel: T('아르카나', 'Arcana', 'Arcano', 'Arcano', 'アルカナ', 'Arkana', 'Arcane', 'आर्काना'),
  majorWord: T('메이저', 'Major', 'Mayor', 'Maior', '大', 'Groß', 'Majeur', 'बड़ा'),
  minorWord: T('마이너', 'Minor', 'Menor', 'Menor', '小', 'Klein', 'Mineur', 'छोटा'),
  numberLabel: T('번호', 'Number', 'Número', 'Número', '番号', 'Nummer', 'Numéro', 'संख्या'),
  suitWord: T('수트', 'Suit', 'Palo', 'Naipe', 'スート', 'Farbe', 'Couleur', 'सूट'),
  rankWord: T('계급', 'Rank', 'Rango', 'Posto', '位', 'Rang', 'Rang', 'दर्जा'),
  elementWord: T('원소', 'Element', 'Elemento', 'Elemento', '元素', 'Element', 'Élément', 'तत्व'),

  sameSuitTitle: T('같은 수트', 'Same suit', 'Mismo palo', 'Mesmo naipe', '同じスート', 'Gleiche Farbe', 'Même couleur', 'वही सूट'),
  sameRankTitle: T('같은 숫자', 'Same rank', 'Mismo rango', 'Mesmo posto', '同じ数字', 'Gleicher Rang', 'Même rang', 'वही दर्जा'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें'),

  how: T(
    [
      '메이저 22장은 큰 흐름을, 마이너 56장은 그 안의 구체적인 일을 말합니다. 한 장이 나왔을 때 어느 쪽인지부터 보면 크기를 가늠할 수 있습니다.',
      '마이너는 수트와 숫자를 겹쳐 읽습니다. 수트가 "어느 영역인가"를, 숫자가 "그 영역의 어느 단계인가"를 알려 줍니다.',
      '역방향은 정반대라기보다, 같은 힘이 막혔거나 지나친 상태로 봅니다. 뜻을 뒤집기 전에 그 힘이 지금 어디로 흐르는지 보세요.',
      '카드는 정해진 미래가 아니라 지금 상황을 비추는 그림입니다. 같은 카드도 무엇을 물었느냐에 따라 다르게 읽힙니다.',
    ],
    [
      'The 22 major arcana speak of the large movements; the 56 minor arcana speak of the specific events inside them. Noticing which one you drew tells you the scale.',
      'A minor card is read by combining suit and number: the suit says which area of life, the number says which stage within it.',
      'Reversed is less an opposite than the same force blocked or overdone. Before flipping the meaning, look at where that force is actually going.',
      'A card is a picture of the present situation, not a fixed future. The same card reads differently depending on what you asked.',
    ],
    [
      'Los 22 arcanos mayores hablan de los grandes movimientos; los 56 menores, de los hechos concretos dentro de ellos. Ver cuál salió ya te da la escala.',
      'Una carta menor se lee combinando palo y número: el palo dice en qué terreno, el número en qué etapa de ese terreno.',
      'Lo invertido no es tanto lo contrario como esa misma fuerza atascada o excedida. Antes de darle la vuelta al significado, mira hacia dónde va esa fuerza.',
      'Una carta retrata la situación presente, no un futuro fijo. La misma carta se lee distinto según lo que hayas preguntado.',
    ],
    [
      'Os 22 arcanos maiores falam dos grandes movimentos; os 56 menores, dos fatos concretos dentro deles. Ver qual saiu já dá a escala.',
      'Uma carta menor se lê combinando naipe e número: o naipe diz em que terreno, o número diz em que etapa desse terreno.',
      'A invertida não é tanto o oposto quanto a mesma força travada ou exagerada. Antes de inverter o sentido, veja para onde essa força está indo.',
      'A carta retrata a situação presente, não um futuro fixo. A mesma carta se lê diferente conforme o que foi perguntado.',
    ],
    [
      '大アルカナ22枚は大きな流れを、小アルカナ56枚はその中の具体的な出来事を語ります。どちらが出たかを見るだけで規模がつかめます。',
      '小アルカナはスートと数字を重ねて読みます。スートが「どの領域か」を、数字が「その領域のどの段階か」を示します。',
      '逆位置は正反対というより、同じ力が詰まっているか行きすぎている状態です。意味を裏返す前に、その力が今どこへ流れているかを見てください。',
      '札は決まった未来ではなく、いまの状況を映す絵です。同じ札でも何を尋ねたかによって読み方が変わります。',
    ],
    [
      'Die 22 großen Arkana sprechen von den großen Bewegungen, die 56 kleinen von den konkreten Ereignissen darin. Schon welche Sorte fiel, verrät den Maßstab.',
      'Eine kleine Karte liest man aus Farbe und Zahl: Die Farbe nennt den Lebensbereich, die Zahl die Stufe darin.',
      'Umgekehrt ist weniger das Gegenteil als dieselbe Kraft, blockiert oder übertrieben. Bevor Sie die Bedeutung umdrehen, sehen Sie, wohin diese Kraft gerade fließt.',
      'Eine Karte zeigt die gegenwärtige Lage, keine feststehende Zukunft. Dieselbe Karte liest sich anders, je nachdem, was gefragt wurde.',
    ],
    [
      "Les 22 arcanes majeurs parlent des grands mouvements ; les 56 mineurs, des faits concrets qui s'y logent. Savoir lequel est sorti donne déjà l'échelle.",
      "Une carte mineure se lit en croisant couleur et nombre : la couleur dit le domaine, le nombre dit l'étape dans ce domaine.",
      "L'envers est moins le contraire que la même force bloquée ou excessive. Avant d'inverser le sens, regardez où cette force va vraiment.",
      "Une carte est une image de la situation présente, pas un avenir fixé. La même carte se lit autrement selon la question posée.",
    ],
    [
      '22 बड़े आर्काना बड़े प्रवाह की बात करते हैं, 56 छोटे उनके भीतर की ठोस घटनाओं की। कौन-सा निकला, यही पैमाना बता देता है।',
      'छोटा पत्ता सूट और अंक मिलाकर पढ़ा जाता है: सूट बताता है कौन-सा क्षेत्र, अंक बताता है उस क्षेत्र का कौन-सा चरण।',
      'उल्टा होना विपरीत से ज़्यादा यह है कि वही शक्ति अटकी है या हद पार कर गई है। अर्थ पलटने से पहले देखिए कि वह शक्ति अभी कहाँ बह रही है।',
      'पत्ता तय भविष्य नहीं, वर्तमान स्थिति का चित्र है। वही पत्ता इस पर निर्भर करके अलग पढ़ा जाता है कि आपने क्या पूछा।',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल'),

  drawCta: T('타로 뽑아 보기', 'Draw a card', 'Sacar una carta', 'Tirar uma carta', 'カードを引く', 'Karte ziehen', 'Tirer une carte', 'एक पत्ता निकालें'),

  hubMetaTitle: T(
    '타로 78장 뜻 — 메이저·마이너 정방향과 역방향',
    'All 78 tarot card meanings — major and minor, upright and reversed',
    'Significado de las 78 cartas del tarot — mayores y menores, al derecho y al revés',
    'Significado das 78 cartas de tarô — maiores e menores, normais e invertidas',
    'タロット78枚の意味 — 大小アルカナの正位置と逆位置',
    'Alle 78 Tarotkarten und ihre Bedeutung — große und kleine Arkana, aufrecht und umgekehrt',
    'Signification des 78 cartes du tarot — arcanes majeurs et mineurs, endroit et envers',
    'सभी 78 टैरो कार्ड के अर्थ — बड़े और छोटे आर्काना, सीधे और उल्टे',
  ),
  hubMetaDesc: T(
    '메이저 아르카나 22장과 마이너 아르카나 56장의 뜻을 카드마다 한 장씩 정리했습니다. 정방향·역방향 해석, 수트가 다루는 영역과 숫자가 뜻하는 단계를 함께 볼 수 있습니다.',
    'A page for every one of the 78 tarot cards: upright and reversed meanings, the area of life each suit covers, and the stage each number marks.',
    'Una página para cada una de las 78 cartas del tarot: significados al derecho y al revés, el terreno de cada palo y la etapa que marca cada número.',
    'Uma página para cada uma das 78 cartas de tarô: significados normais e invertidos, o terreno de cada naipe e a etapa que cada número marca.',
    'タロット78枚それぞれに一ページずつ。正位置・逆位置の意味、スートが扱う領域、数字が示す段階をまとめて見られます。',
    'Eine Seite für jede der 78 Tarotkarten: aufrechte und umgekehrte Bedeutung, der Lebensbereich jeder Farbe und die Stufe jeder Zahl.',
    "Une page pour chacune des 78 cartes du tarot : significations à l'endroit et à l'envers, le domaine de chaque couleur et l'étape de chaque nombre.",
    '78 टैरो कार्ड में से हर एक के लिए एक पन्ना: सीधे और उल्टे अर्थ, हर सूट का क्षेत्र और हर अंक का चरण।',
  ),

  metaTitle: T(
    (n: string) => `${n} 타로 카드 뜻 — 정방향·역방향`,
    (n: string) => `${n} tarot card meaning — upright and reversed`,
    (n: string) => `${n} — significado al derecho y al revés`,
    (n: string) => `${n} — significado normal e invertido`,
    (n: string) => `${n} の意味 — 正位置と逆位置`,
    (n: string) => `${n} — Bedeutung aufrecht und umgekehrt`,
    (n: string) => `${n} — signification à l'endroit et à l'envers`,
    (n: string) => `${n} — सीधा और उल्टा अर्थ`,
  ),

  metaDesc: T(
    (n: string, up: string) => `타로 ${n} 카드의 뜻입니다. 정방향은 ${up} 역방향 해석과 같은 수트·같은 숫자 카드도 함께 볼 수 있습니다.`,
    (n: string, up: string) => `The meaning of the tarot card ${n}. Upright: ${up} The reversed reading and the cards sharing its suit and number are here too.`,
    (n: string, up: string) => `El significado de la carta ${n}. Al derecho: ${up} También están la lectura invertida y las cartas de su palo y su número.`,
    (n: string, up: string) => `O significado da carta ${n}. Normal: ${up} A leitura invertida e as cartas do mesmo naipe e número também estão aqui.`,
    (n: string, up: string) => `タロット ${n} の意味です。正位置は ${up} 逆位置の解釈や同じスート・同じ数字の札もまとめています。`,
    (n: string, up: string) => `Die Bedeutung der Tarotkarte ${n}. Aufrecht: ${up} Auch die umgekehrte Deutung und die Karten gleicher Farbe und Zahl stehen hier.`,
    (n: string, up: string) => `La signification de la carte ${n}. À l'endroit : ${up} La lecture à l'envers et les cartes de même couleur et de même rang figurent aussi.`,
    (n: string, up: string) => `टैरो कार्ड ${n} का अर्थ। सीधा: ${up} उल्टा पाठ और उसी सूट व अंक के पत्ते भी यहीं हैं।`,
  ),

  hubFaq: T(
    [
      { q: '타로 카드는 몇 장인가요?', a: '한 벌은 78장입니다. 큰 흐름을 말하는 메이저 아르카나 22장과, 완드·컵·소드·펜타클 네 수트에 열넷씩 들어가는 마이너 아르카나 56장으로 나뉩니다.' },
      { q: '메이저와 마이너는 뭐가 다른가요?', a: '메이저는 인생의 큰 전환점과 흐름을, 마이너는 그 안에서 일어나는 구체적인 일을 말합니다. 뽑은 카드가 메이저면 지금 다루는 주제가 그만큼 크다는 뜻으로 읽습니다.' },
      { q: '역방향은 정반대 뜻인가요?', a: '반대라기보다 같은 힘이 막혔거나 지나친 상태로 봅니다. 예를 들어 힘 카드의 정방향이 견디는 힘이라면 역방향은 그 힘을 스스로 믿지 못하는 상태입니다. 역방향을 쓰지 않고 정방향으로만 읽는 방식도 흔합니다.' },
      { q: '수트는 각각 무엇을 뜻하나요?', a: '완드는 불의 기운으로 의지와 행동, 컵은 물로 감정과 관계, 소드는 공기로 생각과 말, 펜타클은 흙으로 돈과 몸을 다룹니다. 어느 수트가 나왔는지가 곧 어느 영역의 이야기인지를 알려 줍니다.' },
      { q: '타로가 미래를 맞히나요?', a: '정해진 미래를 알려 주는 도구로 쓰기보다, 지금 상황과 마음을 비춰 보는 그림으로 쓰는 편이 이 자료의 관점입니다. 같은 카드도 무엇을 물었느냐에 따라 다르게 읽히고, 그 해석은 결국 뽑은 사람의 몫입니다.' },
    ],
    [
      { q: 'How many tarot cards are there?', a: 'A deck holds 78. Twenty-two major arcana carry the large movements, and fifty-six minor arcana split into four suits — wands, cups, swords and pentacles — of fourteen cards each.' },
      { q: 'What is the difference between major and minor?', a: 'Major cards speak of turning points and the shape of a period; minor cards speak of the concrete events inside it. Drawing a major card suggests the subject at hand is the larger kind.' },
      { q: 'Does reversed mean the opposite?', a: 'Less an opposite than the same force blocked or overdone. If Strength upright is patience that holds, reversed is that same strength no longer trusted. Reading every card upright is also a common practice.' },
      { q: 'What does each suit stand for?', a: 'Wands carry fire — will and action. Cups carry water — feeling and relationship. Swords carry air — thought and speech. Pentacles carry earth — money and the body. The suit tells you which part of life is being discussed.' },
      { q: 'Can tarot predict the future?', a: 'These pages treat the cards as a picture of the present situation rather than a fixed forecast. The same card reads differently depending on the question, and the reading ultimately belongs to the person holding it.' },
    ],
    [
      { q: '¿Cuántas cartas tiene el tarot?', a: 'La baraja tiene 78: veintidós arcanos mayores para los grandes movimientos y cincuenta y seis menores repartidos en cuatro palos —bastos, copas, espadas y oros— de catorce cartas cada uno.' },
      { q: '¿En qué se diferencian los mayores de los menores?', a: 'Los mayores hablan de puntos de giro y del tono de una etapa; los menores, de los hechos concretos dentro de ella. Sacar un mayor sugiere que el asunto es del tipo grande.' },
      { q: '¿Invertida significa lo contrario?', a: 'Más que lo contrario, es la misma fuerza atascada o excedida. Si la Fuerza al derecho es la paciencia que sostiene, invertida es esa fuerza en la que ya no se confía. También es común leer todas las cartas al derecho.' },
      { q: '¿Qué representa cada palo?', a: 'Bastos son fuego: voluntad y acción. Copas, agua: emoción y vínculo. Espadas, aire: pensamiento y palabra. Oros, tierra: dinero y cuerpo. El palo indica de qué parte de la vida se habla.' },
      { q: '¿El tarot predice el futuro?', a: 'Estas páginas tratan las cartas como una imagen de la situación presente, no como un pronóstico fijo. La misma carta se lee distinto según la pregunta, y la lectura pertenece a quien la hace.' },
    ],
    [
      { q: 'Quantas cartas tem o tarô?', a: 'O baralho tem 78: vinte e dois arcanos maiores para os grandes movimentos e cinquenta e seis menores divididos em quatro naipes — paus, copas, espadas e ouros — de catorze cartas cada.' },
      { q: 'Qual a diferença entre maiores e menores?', a: 'Os maiores falam de viradas e do tom de um período; os menores, dos fatos concretos dentro dele. Tirar um maior sugere que o assunto é do tipo grande.' },
      { q: 'Invertida quer dizer o contrário?', a: 'Menos o contrário do que a mesma força travada ou exagerada. Se a Força normal é a paciência que sustenta, invertida é essa força em que já não se confia. Ler tudo na posição normal também é prática comum.' },
      { q: 'O que representa cada naipe?', a: 'Paus são fogo: vontade e ação. Copas, água: emoção e vínculo. Espadas, ar: pensamento e palavra. Ouros, terra: dinheiro e corpo. O naipe diz de que parte da vida se fala.' },
      { q: 'O tarô prevê o futuro?', a: 'Estas páginas tratam as cartas como retrato da situação presente, não como previsão fixa. A mesma carta se lê diferente conforme a pergunta, e a leitura pertence a quem a faz.' },
    ],
    [
      { q: 'タロットは何枚ですか。', a: '一組78枚です。大きな流れを語る大アルカナ22枚と、ワンド・カップ・ソード・ペンタクルの四つのスートに14枚ずつ入る小アルカナ56枚に分かれます。' },
      { q: '大アルカナと小アルカナの違いは何ですか。', a: '大アルカナは転換点や時期の性格を、小アルカナはその中で起きる具体的な出来事を語ります。大アルカナが出たときは、扱っている主題がそれだけ大きいと読みます。' },
      { q: '逆位置は正反対の意味ですか。', a: '正反対というより、同じ力が詰まっているか行きすぎている状態です。力の正位置が耐える力なら、逆位置はその力を自分で信じられない状態です。逆位置を使わずすべて正位置で読む流儀もあります。' },
      { q: 'それぞれのスートは何を表しますか。', a: 'ワンドは火で意志と行動、カップは水で感情と関係、ソードは風で思考と言葉、ペンタクルは地でお金と体を扱います。どのスートが出たかが、人生のどの領域の話かを示します。' },
      { q: 'タロットで未来が分かりますか。', a: 'ここでは決まった未来を告げる道具ではなく、いまの状況と心を映す絵として扱っています。同じ札でも問いによって読み方が変わり、その読み取りは引いた人のものです。' },
    ],
    [
      { q: 'Wie viele Tarotkarten gibt es?', a: 'Ein Deck hat 78. Zweiundzwanzig große Arkana tragen die großen Bewegungen, sechsundfünfzig kleine verteilen sich auf vier Farben — Stäbe, Kelche, Schwerter und Münzen — zu je vierzehn Karten.' },
      { q: 'Worin unterscheiden sich große und kleine Arkana?', a: 'Große Karten sprechen von Wendepunkten und vom Charakter eines Abschnitts, kleine von den konkreten Ereignissen darin. Eine große Karte deutet an, dass das Thema von der größeren Sorte ist.' },
      { q: 'Bedeutet umgekehrt das Gegenteil?', a: 'Weniger das Gegenteil als dieselbe Kraft, blockiert oder übertrieben. Ist die Kraft aufrecht die Geduld, die standhält, so ist sie umgekehrt dieselbe Kraft, der man nicht mehr traut. Viele lesen ohnehin alle Karten aufrecht.' },
      { q: 'Wofür stehen die vier Farben?', a: 'Stäbe sind Feuer: Wille und Handeln. Kelche sind Wasser: Gefühl und Beziehung. Schwerter sind Luft: Denken und Sprechen. Münzen sind Erde: Geld und Körper. Die Farbe nennt den Lebensbereich.' },
      { q: 'Sagt Tarot die Zukunft voraus?', a: 'Diese Seiten behandeln die Karten als Bild der gegenwärtigen Lage, nicht als feste Prognose. Dieselbe Karte liest sich je nach Frage anders, und die Deutung gehört dem, der sie zieht.' },
    ],
    [
      { q: 'Combien de cartes compte le tarot ?', a: "Un jeu en compte 78 : vingt-deux arcanes majeurs pour les grands mouvements et cinquante-six mineurs répartis en quatre couleurs — bâtons, coupes, épées et deniers — de quatorze cartes chacune." },
      { q: 'Quelle différence entre majeurs et mineurs ?', a: "Les majeurs parlent des tournants et de la couleur d'une période ; les mineurs, des faits concrets qui s'y produisent. Tirer un majeur suggère que le sujet est de la grande sorte." },
      { q: "« À l'envers » veut-il dire le contraire ?", a: "Moins le contraire que la même force bloquée ou excessive. Si la Force à l'endroit est la patience qui tient, à l'envers c'est cette même force à laquelle on ne se fie plus. Lire toutes les cartes à l'endroit est aussi une pratique courante." },
      { q: 'Que représente chaque couleur ?', a: "Les bâtons sont le feu : volonté et action. Les coupes, l'eau : sentiment et lien. Les épées, l'air : pensée et parole. Les deniers, la terre : argent et corps. La couleur indique le domaine de vie concerné." },
      { q: "Le tarot prédit-il l'avenir ?", a: "Ces pages traitent les cartes comme une image de la situation présente, non comme un pronostic figé. La même carte se lit autrement selon la question, et l'interprétation appartient à qui la tire." },
    ],
    [
      { q: 'टैरो में कितने पत्ते होते हैं?', a: 'एक गड्डी में 78 पत्ते होते हैं। बाईस बड़े आर्काना बड़े प्रवाह बताते हैं, और छप्पन छोटे आर्काना चार सूटों — वैंड, कप, स्वॉर्ड और पेंटाकल — में चौदह-चौदह बँटे रहते हैं।' },
      { q: 'बड़े और छोटे आर्काना में क्या फ़र्क है?', a: 'बड़े पत्ते मोड़ और किसी दौर के स्वभाव की बात करते हैं; छोटे पत्ते उसके भीतर घटने वाली ठोस बातों की। बड़ा पत्ता निकलना बताता है कि विषय उतना ही बड़ा है।' },
      { q: 'क्या उल्टा पत्ता विपरीत अर्थ देता है?', a: 'विपरीत से ज़्यादा यह वही शक्ति है जो अटकी या हद पार कर गई है। शक्ति सीधी हो तो वह टिकने वाला धैर्य है, उल्टी हो तो वही शक्ति जिस पर अब भरोसा नहीं रहा। सभी पत्ते सीधे पढ़ने का चलन भी आम है।' },
      { q: 'हर सूट किसका प्रतीक है?', a: 'वैंड अग्नि है — इच्छा और कर्म। कप जल है — भाव और रिश्ते। स्वॉर्ड वायु है — विचार और वाणी। पेंटाकल पृथ्वी है — धन और देह। सूट बताता है कि बात जीवन के किस हिस्से की है।' },
      { q: 'क्या टैरो भविष्य बता देता है?', a: 'ये पन्ने पत्तों को तय भविष्यवाणी नहीं, वर्तमान स्थिति का चित्र मानते हैं। वही पत्ता प्रश्न के अनुसार अलग पढ़ा जाता है, और अर्थ अंततः निकालने वाले का होता है।' },
    ],
  ),

  cardFaq: T(
    (n: string, up: string, rev: string, kind: string) => [
      { q: `타로 ${n} 카드는 무슨 뜻인가요?`, a: `정방향으로는 ${up}` },
      { q: `${n} 카드가 역방향으로 나오면?`, a: rev },
      { q: `${n}은 어떤 카드인가요?`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `What does the tarot card ${n} mean?`, a: `Upright: ${up}` },
      { q: `What does ${n} mean reversed?`, a: rev },
      { q: `Where does ${n} sit in the deck?`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `¿Qué significa la carta ${n}?`, a: `Al derecho: ${up}` },
      { q: `¿Y si ${n} sale invertida?`, a: rev },
      { q: `¿Qué lugar ocupa ${n} en la baraja?`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `O que significa a carta ${n}?`, a: `Normal: ${up}` },
      { q: `E se ${n} sair invertida?`, a: rev },
      { q: `Que lugar ${n} ocupa no baralho?`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `タロットの ${n} はどんな意味ですか。`, a: `正位置では ${up}` },
      { q: `${n} が逆位置で出たら。`, a: rev },
      { q: `${n} はデッキのどこに位置しますか。`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `Was bedeutet die Tarotkarte ${n}?`, a: `Aufrecht: ${up}` },
      { q: `Was bedeutet ${n} umgekehrt?`, a: rev },
      { q: `Wo steht ${n} im Deck?`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `Que signifie la carte ${n} ?`, a: `À l'endroit : ${up}` },
      { q: `Que signifie ${n} à l'envers ?`, a: rev },
      { q: `Quelle est la place de ${n} dans le jeu ?`, a: `${kind}` },
    ],
    (n: string, up: string, rev: string, kind: string) => [
      { q: `टैरो कार्ड ${n} का क्या अर्थ है?`, a: `सीधा: ${up}` },
      { q: `${n} उल्टा निकले तो क्या अर्थ है?`, a: rev },
      { q: `${n} गड्डी में कहाँ आता है?`, a: `${kind}` },
    ],
  ),
};

/** 항목별 여덟 언어 표를 언어별 한 벌로 뒤집는다 */
export const TAROT_UI: L8<TarotUI> = Object.fromEntries(
  LANG8_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L8<unknown>)[lang as Lang8]])),
  ]),
) as unknown as L8<TarotUI>;
