/**
 * 타로 스프레드(여러 장 뽑기)의 영어·중국어 문구.
 *
 * 뽑기·섞기는 lib/fortune-data.ts의 drawCards를 그대로 쓴다 — 78장 덱과 역방향
 * 확률이 세 언어에서 같아야 하기 때문이다. 여기에는 스프레드 이름과 자리 이름,
 * 수트 이름, 화면 문구만 둔다.
 *
 * 스프레드 id와 장수는 한국어와 공유한다. 자리 순서가 어긋나면 같은 카드가
 * 다른 뜻으로 읽히므로 배열 순서도 그대로 맞춘다.
 */
import { suitCopyOf } from './tarot-l10n.ts';
import type { TarotIntlLang } from './tarot-intl.ts';

export type TarotSpreadLang = TarotIntlLang;

const L8 = ['es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;

export interface SpreadCopy {
  label: string;
  desc: string;
  positions: string[];
  posDesc: string[];
}

/** id·count는 한국어와 같다 — 문구만 갈아 끼운다 */
export const SPREAD_SHAPE = [
  { id: 'one' as const, icon: '✦', count: 1 },
  { id: 'three' as const, icon: '⏳', count: 3 },
  { id: 'relationship' as const, icon: '💕', count: 5 },
  { id: 'celtic' as const, icon: '✝️', count: 10 },
];

export const SPREADS_INTL: Record<TarotSpreadLang, Record<string, SpreadCopy>> = {
  en: {
    one: {
      label: 'One card', desc: 'A single message for today',
      positions: ['Today’s message'],
      posDesc: ['The one thing worth hearing right now'],
    },
    three: {
      label: 'Past · present · future', desc: 'Three cards across time',
      positions: ['Past', 'Present', 'Future'],
      posDesc: ['What shaped the situation you are in', 'The heart of where you stand now', 'Where this current is heading'],
    },
    relationship: {
      label: 'Relationship', desc: 'Five cards, both sides of a bond',
      positions: ['You', 'Them', 'The core of it', 'The obstacle', 'Where it goes'],
      posDesc: ['Your own feelings and state', 'Their feelings and state', 'The energy that actually defines this bond', 'What stands between the two of you', 'The direction this relationship is taking'],
    },
    celtic: {
      label: 'Celtic cross', desc: 'The full ten-card spread',
      positions: [
        'The situation', 'What crosses it', 'Conscious aim', 'Unconscious ground',
        'The recent past', 'The near future', 'Your stance',
        'The environment', 'Hopes and fears', 'The outcome',
      ],
      posDesc: [
        'The core of where you are at this moment',
        'The energy blocking or challenging your path',
        'What you consciously want and think about',
        'The feelings and foundation underneath, unexamined',
        'The recent past that shaped this situation',
        'What may plausibly arrive soon',
        'The position and attitude you are taking',
        'The influence of people and circumstances around you',
        'What you are hoping for, or dreading',
        'Where the whole current is heading',
      ],
    },
  },
  es: {
    one: { label: 'Una carta', desc: 'Un solo mensaje para hoy',
      positions: ['El mensaje de hoy'], posDesc: ['Lo único que vale la pena escuchar ahora mismo'] },
    three: { label: 'Pasado · presente · futuro', desc: 'Tres cartas a lo largo del tiempo',
      positions: ['Pasado', 'Presente', 'Futuro'],
      posDesc: ['Lo que dio forma a la situación en la que estás', 'El centro de donde te encuentras ahora', 'Hacia dónde va esta corriente'] },
    relationship: { label: 'Relación', desc: 'Cinco cartas, los dos lados de un vínculo',
      positions: ['Tú', 'La otra persona', 'El núcleo', 'El obstáculo', 'Hacia dónde va'],
      posDesc: ['Tus propios sentimientos y tu estado', 'Los sentimientos y el estado de la otra persona', 'La energía que de verdad define este vínculo', 'Lo que se interpone entre los dos', 'La dirección que está tomando esta relación'] },
    celtic: { label: 'Cruz celta', desc: 'La tirada completa de diez cartas',
      positions: ['La situación', 'Lo que la cruza', 'Objetivo consciente', 'Fondo inconsciente', 'El pasado reciente', 'El futuro cercano', 'Tu postura', 'El entorno', 'Esperanzas y miedos', 'El desenlace'],
      posDesc: ['El centro de donde estás en este momento', 'La energía que bloquea o desafía tu camino', 'Lo que quieres y piensas conscientemente', 'Los sentimientos y la base de debajo, sin examinar', 'El pasado reciente que dio forma a esta situación', 'Lo que puede llegar pronto de forma verosímil', 'La posición y la actitud que estás tomando', 'La influencia de la gente y las circunstancias de alrededor', 'Lo que esperas, o lo que temes', 'Hacia dónde va toda la corriente'] },
  },
  'pt-br': {
    one: { label: 'Uma carta', desc: 'Uma única mensagem para hoje',
      positions: ['A mensagem de hoje'], posDesc: ['A única coisa que vale ouvir agora'] },
    three: { label: 'Passado · presente · futuro', desc: 'Três cartas ao longo do tempo',
      positions: ['Passado', 'Presente', 'Futuro'],
      posDesc: ['O que deu forma à situação em que você está', 'O centro de onde você está agora', 'Para onde essa corrente vai'] },
    relationship: { label: 'Relacionamento', desc: 'Cinco cartas, os dois lados de um laço',
      positions: ['Você', 'A outra pessoa', 'O núcleo', 'O obstáculo', 'Para onde vai'],
      posDesc: ['Seus próprios sentimentos e seu estado', 'Os sentimentos e o estado da outra pessoa', 'A energia que de fato define esse laço', 'O que fica entre vocês dois', 'A direção que esse relacionamento está tomando'] },
    celtic: { label: 'Cruz celta', desc: 'A tiragem completa de dez cartas',
      positions: ['A situação', 'O que a atravessa', 'Objetivo consciente', 'Base inconsciente', 'O passado recente', 'O futuro próximo', 'Sua postura', 'O ambiente', 'Esperanças e medos', 'O desfecho'],
      posDesc: ['O centro de onde você está neste momento', 'A energia que bloqueia ou desafia seu caminho', 'O que você quer e pensa conscientemente', 'Os sentimentos e a base por baixo, sem exame', 'O passado recente que deu forma a essa situação', 'O que pode chegar em breve de forma plausível', 'A posição e a atitude que você está tomando', 'A influência das pessoas e das circunstâncias ao redor', 'O que você espera, ou o que teme', 'Para onde toda a corrente vai'] },
  },
  ja: {
    one: { label: '1枚引き', desc: '今日への一言',
      positions: ['今日のメッセージ'], posDesc: ['いま聞く価値があるひとつのこと'] },
    three: { label: '過去 · 現在 · 未来', desc: '時間をまたぐ3枚',
      positions: ['過去', '現在', '未来'],
      posDesc: ['いまの状況をかたちづくったもの', 'いま立っている場所の中心', 'この流れが向かう先'] },
    relationship: { label: '相手との関係', desc: '5枚で、関係の両側を見る',
      positions: ['自分', '相手', '関係の芯', '障害', 'この先'],
      posDesc: ['自分の気持ちと状態', '相手の気持ちと状態', 'この関係を実際に決めている力', '二人のあいだに立っているもの', 'この関係が向かっている方向'] },
    celtic: { label: 'ケルト十字', desc: '10枚の本格スプレッド',
      positions: ['状況', '横切るもの', '意識している望み', '無意識の土台', '近い過去', '近い未来', '自分の姿勢', '周囲', '望みと恐れ', '結果'],
      posDesc: ['いまいる場所の中心', '道をふさぐ、あるいは試す力', '意識して望み、考えていること', 'その下にある、まだ見ていない感情と土台', 'この状況をつくった近い過去', 'まもなく起こりうること', 'いま取っている立場と態度', '周りの人と状況からの影響', '望んでいること、あるいは恐れていること', '流れ全体が向かう先'] },
  },
  de: {
    one: { label: 'Eine Karte', desc: 'Eine einzelne Botschaft für heute',
      positions: ['Die Botschaft von heute'], posDesc: ['Das eine, was gerade zu hören lohnt'] },
    three: { label: 'Vergangenheit · Gegenwart · Zukunft', desc: 'Drei Karten über die Zeit',
      positions: ['Vergangenheit', 'Gegenwart', 'Zukunft'],
      posDesc: ['Was die Lage geformt hat, in der du bist', 'Der Kern dessen, wo du gerade stehst', 'Wohin diese Strömung läuft'] },
    relationship: { label: 'Beziehung', desc: 'Fünf Karten, beide Seiten einer Bindung',
      positions: ['Du', 'Die andere Person', 'Der Kern', 'Das Hindernis', 'Wohin es geht'],
      posDesc: ['Deine eigenen Gefühle und dein Zustand', 'Gefühle und Zustand der anderen Person', 'Die Kraft, die diese Bindung tatsächlich bestimmt', 'Was zwischen euch beiden steht', 'Die Richtung, die diese Beziehung nimmt'] },
    celtic: { label: 'Keltisches Kreuz', desc: 'Die volle Zehn-Karten-Legung',
      positions: ['Die Lage', 'Was sie kreuzt', 'Bewusstes Ziel', 'Unbewusster Grund', 'Die jüngste Vergangenheit', 'Die nahe Zukunft', 'Deine Haltung', 'Das Umfeld', 'Hoffnungen und Ängste', 'Das Ergebnis'],
      posDesc: ['Der Kern dessen, wo du in diesem Moment stehst', 'Die Kraft, die deinen Weg blockiert oder herausfordert', 'Was du bewusst willst und denkst', 'Die Gefühle und der Grund darunter, unbetrachtet', 'Die jüngste Vergangenheit, die diese Lage geformt hat', 'Was plausibel bald eintreffen kann', 'Die Position und Haltung, die du einnimmst', 'Der Einfluss von Menschen und Umständen ringsum', 'Worauf du hoffst — oder wovor dir graut', 'Wohin die ganze Strömung läuft'] },
  },
  fr: {
    one: { label: 'Une carte', desc: 'Un seul message pour aujourd’hui',
      positions: ['Le message du jour'], posDesc: ['La seule chose qui mérite d’être entendue maintenant'] },
    three: { label: 'Passé · présent · futur', desc: 'Trois cartes à travers le temps',
      positions: ['Passé', 'Présent', 'Futur'],
      posDesc: ['Ce qui a façonné la situation où vous êtes', 'Le cœur de là où vous en êtes', 'Vers où va ce courant'] },
    relationship: { label: 'Relation', desc: 'Cinq cartes, les deux côtés d’un lien',
      positions: ['Vous', 'L’autre', 'Le cœur du lien', 'L’obstacle', 'Où cela va'],
      posDesc: ['Vos propres sentiments et votre état', 'Les sentiments et l’état de l’autre', 'L’énergie qui définit réellement ce lien', 'Ce qui se tient entre vous deux', 'La direction que prend cette relation'] },
    celtic: { label: 'Croix celtique', desc: 'Le tirage complet à dix cartes',
      positions: ['La situation', 'Ce qui la croise', 'But conscient', 'Fond inconscient', 'Le passé récent', 'Le futur proche', 'Votre posture', 'L’entourage', 'Espoirs et craintes', 'L’issue'],
      posDesc: ['Le cœur de là où vous êtes en ce moment', 'L’énergie qui bloque ou met à l’épreuve votre chemin', 'Ce que vous voulez et pensez consciemment', 'Les sentiments et le socle en dessous, non examinés', 'Le passé récent qui a façonné cette situation', 'Ce qui peut plausiblement arriver bientôt', 'La position et l’attitude que vous adoptez', 'L’influence des gens et des circonstances autour', 'Ce que vous espérez, ou ce que vous redoutez', 'Vers où va l’ensemble du courant'] },
  },
  hi: {
    one: { label: 'एक कार्ड', desc: 'आज के लिए एक ही संदेश',
      positions: ['आज का संदेश'], posDesc: ['अभी सुनने लायक बस एक बात'] },
    three: { label: 'अतीत · वर्तमान · भविष्य', desc: 'समय के आर-पार तीन कार्ड',
      positions: ['अतीत', 'वर्तमान', 'भविष्य'],
      posDesc: ['जिसने आपकी मौजूदा स्थिति को आकार दिया', 'आप अभी जहाँ हैं उसका केंद्र', 'यह धारा किधर जा रही है'] },
    relationship: { label: 'रिश्ता', desc: 'पाँच कार्ड, रिश्ते के दोनों पक्ष',
      positions: ['आप', 'सामने वाला', 'रिश्ते का मूल', 'रुकावट', 'आगे कहाँ'],
      posDesc: ['आपकी अपनी भावनाएँ और हालत', 'सामने वाले की भावनाएँ और हालत', 'वह ऊर्जा जो सचमुच इस रिश्ते को तय करती है', 'जो आप दोनों के बीच खड़ा है', 'यह रिश्ता जिस दिशा में जा रहा है'] },
    celtic: { label: 'सेल्टिक क्रॉस', desc: 'पूरा दस कार्ड का प्रसार',
      positions: ['स्थिति', 'जो उसे काटता है', 'सचेत लक्ष्य', 'अचेतन आधार', 'हाल का अतीत', 'नज़दीकी भविष्य', 'आपका रुख़', 'माहौल', 'उम्मीदें और डर', 'परिणाम'],
      posDesc: ['इस समय आप जहाँ हैं उसका केंद्र', 'वह ऊर्जा जो आपके रास्ते को रोकती या परखती है', 'जो आप सचेत रूप से चाहते और सोचते हैं', 'नीचे की भावनाएँ और नींव, जिन्हें देखा नहीं गया', 'हाल का वह अतीत जिसने यह स्थिति बनाई', 'जो जल्दी ही आ सकता है', 'आप जो स्थिति और रवैया अपना रहे हैं', 'आसपास के लोगों और हालात का असर', 'जिसकी आप उम्मीद कर रहे हैं, या जिससे डर रहे हैं', 'पूरी धारा किधर जा रही है'] },
  },
  'zh-hans': {
    one: { label: '单张', desc: '给今天的一句话',
      positions: ['今天的讯息'], posDesc: ['此刻唯一值得听的一件事'] },
    three: { label: '过去 · 现在 · 未来', desc: '跨时间的三张牌',
      positions: ['过去', '现在', '未来'],
      posDesc: ['是什么把你现在的处境塑成了这样', '你此刻所站位置的核心', '这股势头正往哪里去'] },
    relationship: { label: '关系', desc: '五张牌，看关系的两端',
      positions: ['你', '对方', '关系的核心', '阻碍', '走向'],
      posDesc: ['你自己的感受和状态', '对方的感受和状态', '真正决定这段关系的那股力量', '横在你们之间的东西', '这段关系正在走的方向'] },
    celtic: { label: '凯尔特十字', desc: '完整的十张牌牌阵',
      positions: ['处境', '横切的力量', '有意识的目标', '无意识的底子', '近期的过去', '近期的未来', '你的姿态', '周围环境', '期待与恐惧', '结果'],
      posDesc: ['你此刻所处位置的核心', '挡住或考验你这条路的力量', '你清楚知道自己想要和在想的', '底下那些没被看过的情绪和根基', '塑成这个处境的近期过去', '接下来有可能到来的事', '你正在采取的位置和态度', '周围的人和环境带来的影响', '你在期待的，或者你在害怕的', '整股势头正往哪里去'] },
  },
  'zh-hant': {
    one: { label: '單張', desc: '給今天的一句話',
      positions: ['今天的訊息'], posDesc: ['此刻唯一值得聽的一件事'] },
    three: { label: '過去 · 現在 · 未來', desc: '跨時間的三張牌',
      positions: ['過去', '現在', '未來'],
      posDesc: ['是什麼把你現在的處境塑成了這樣', '你此刻所站位置的核心', '這股勢頭正往哪裡去'] },
    relationship: { label: '關係', desc: '五張牌，看關係的兩端',
      positions: ['你', '對方', '關係的核心', '阻礙', '走向'],
      posDesc: ['你自己的感受和狀態', '對方的感受和狀態', '真正決定這段關係的那股力量', '橫在你們之間的東西', '這段關係正在走的方向'] },
    celtic: { label: '凱爾特十字', desc: '完整的十張牌牌陣',
      positions: ['處境', '橫切的力量', '有意識的目標', '無意識的底子', '近期的過去', '近期的未來', '你的姿態', '周圍環境', '期待與恐懼', '結果'],
      posDesc: ['你此刻所處位置的核心', '擋住或考驗你這條路的力量', '你清楚知道自己想要和在想的', '底下那些沒被看過的情緒和根基', '塑成這個處境的近期過去', '接下來有可能到來的事', '你正在採取的位置和態度', '周圍的人和環境帶來的影響', '你在期待的，或者你在害怕的', '整股勢頭正往哪裡去'] },
  },
};

/**
 * 수트 이름·주제 — 카드 사전에서 가져온다.
 *
 * 같은 수트를 스프레드와 사전이 따로 적으면 곧 다른 말을 한다. 색·이모지는
 * SUIT_INFO를 그대로 쓴다.
 */
export const SUIT_INTL: Record<TarotSpreadLang, Record<string, { name: string; theme: string }>> =
  Object.fromEntries((['en', ...L8] as const).map(l => [l, suitCopyOf(l)])) as
    Record<TarotSpreadLang, Record<string, { name: string; theme: string }>>;

export const SPREAD_UI: Record<TarotSpreadLang, {
  metaTitle: string; metaDesc: string;
  h1: string; lead: string;
  spreadTitle: string; cardCount: (n: number) => string;
  deckTitle: string; fullDeck: string; majorOnly: string;
  drawBtn: (label: string, n: number) => string;
  revealAll: string; revealed: (a: number, b: number) => string; drawAgain: string;
  tapToReveal: string;
  tabDraw: string; tabList: string;
  majorHeading: string; minorHeading: string;
  upright: string; reversed: string;
  privacy: string; disclaimer: string;
  home: string; section: string;
}> = {
  en: {
    metaTitle: 'Tarot Reading Online — Free 78-Card Spreads',
    metaDesc: 'Draw a free tarot reading from the full 78-card deck: one card, past-present-future, a relationship spread or the full Celtic cross. Upright and reversed meanings for every card.',
    h1: 'Tarot Reading',
    lead: 'Pick a spread, draw from the full 78-card deck, and read each position with upright and reversed meanings.',
    spreadTitle: 'Spread', cardCount: n => `${n} cards`,
    deckTitle: 'Deck', fullDeck: 'Full 78', majorOnly: 'Major 22',
    drawBtn: (label, n) => `✦ Draw ${label} (${n})`,
    revealAll: 'Reveal all', revealed: (a, b) => `${a} of ${b} revealed`, drawAgain: 'Draw again',
    tapToReveal: 'Tap to reveal',
    tabDraw: '🃏 Draw', tabList: '📚 All cards',
    majorHeading: 'Major arcana', minorHeading: 'Minor arcana',
    upright: 'Upright', reversed: 'Reversed',
    privacy: 'The draw is random each time and nothing is stored or sent anywhere.',
    disclaimer: 'Tarot is for reflection and entertainment. Decisions that matter deserve real information and your own judgement.',
    home: 'Home', section: 'Horoscopes',
  },
  es: {
    metaTitle: 'Tirada de tarot online — 78 cartas gratis',
    metaDesc: 'Haz una tirada de tarot gratis con la baraja completa de 78 cartas: una carta, pasado-presente-futuro, tirada de relación o la cruz celta entera. Significados del derecho e invertidos para cada carta.',
    h1: 'Tirada de tarot',
    lead: 'Elige una tirada, saca de la baraja completa de 78 cartas y lee cada posición con su significado del derecho y del revés.',
    spreadTitle: 'Tirada', cardCount: n => `${n} cartas`,
    deckTitle: 'Baraja', fullDeck: 'Las 78', majorOnly: 'Mayores 22',
    drawBtn: (label, n) => `✦ Sacar ${label} (${n})`,
    revealAll: 'Descubrir todas', revealed: (a, b) => `${a} de ${b} descubiertas`, drawAgain: 'Sacar otra vez',
    tapToReveal: 'Toca para descubrir',
    tabDraw: '🃏 Tirada', tabList: '📚 Todas las cartas',
    majorHeading: 'Arcanos mayores', minorHeading: 'Arcanos menores',
    upright: 'Del derecho', reversed: 'Invertida',
    privacy: 'Cada tirada es aleatoria y no se guarda ni se envía nada a ninguna parte.',
    disclaimer: 'El tarot sirve para pensar y para entretenerse. Las decisiones que importan merecen información real y tu propio criterio.',
    home: 'Inicio', section: 'Horóscopos',
  },
  'pt-br': {
    metaTitle: 'Tiragem de tarô online — 78 cartas grátis',
    metaDesc: 'Faça uma tiragem de tarô grátis com o baralho completo de 78 cartas: uma carta, passado-presente-futuro, tiragem de relacionamento ou a cruz celta inteira. Significados em pé e invertidos para cada carta.',
    h1: 'Tiragem de tarô',
    lead: 'Escolha uma tiragem, tire do baralho completo de 78 cartas e leia cada posição com o significado em pé e invertido.',
    spreadTitle: 'Tiragem', cardCount: n => `${n} cartas`,
    deckTitle: 'Baralho', fullDeck: 'As 78', majorOnly: 'Maiores 22',
    drawBtn: (label, n) => `✦ Tirar ${label} (${n})`,
    revealAll: 'Revelar todas', revealed: (a, b) => `${a} de ${b} reveladas`, drawAgain: 'Tirar de novo',
    tapToReveal: 'Toque para revelar',
    tabDraw: '🃏 Tiragem', tabList: '📚 Todas as cartas',
    majorHeading: 'Arcanos maiores', minorHeading: 'Arcanos menores',
    upright: 'Em pé', reversed: 'Invertida',
    privacy: 'Cada tiragem é aleatória e nada é guardado nem enviado a lugar nenhum.',
    disclaimer: 'O tarô serve para refletir e para entreter. As decisões que importam merecem informação real e o seu próprio julgamento.',
    home: 'Início', section: 'Horóscopos',
  },
  ja: {
    metaTitle: 'タロット占い — 78枚フルデッキの無料スプレッド',
    metaDesc: '78枚のフルデッキで無料のタロット占い。1枚引き、過去・現在・未来、相手との関係、ケルト十字。全カードに正位置と逆位置の意味つき。',
    h1: 'タロット占い',
    lead: 'スプレッドを選び、78枚のフルデッキから引いて、各位置を正位置・逆位置の意味で読みます。',
    spreadTitle: 'スプレッド', cardCount: n => `${n}枚`,
    deckTitle: 'デッキ', fullDeck: '78枚全部', majorOnly: '大アルカナ22枚',
    drawBtn: (label, n) => `✦ ${label}を引く（${n}枚）`,
    revealAll: 'すべてめくる', revealed: (a, b) => `${b}枚中${a}枚めくりました`, drawAgain: 'もう一度引く',
    tapToReveal: 'タップでめくる',
    tabDraw: '🃏 引く', tabList: '📚 カード一覧',
    majorHeading: '大アルカナ', minorHeading: '小アルカナ',
    upright: '正位置', reversed: '逆位置',
    privacy: '引くたびにランダムで、何も保存せず、どこにも送りません。',
    disclaimer: 'タロットは考えを整理するためと、楽しむためのものです。大事な判断には実際の情報と自分の考えを。',
    home: 'ホーム', section: '占い',
  },
  de: {
    metaTitle: 'Tarot online legen — 78 Karten kostenlos',
    metaDesc: 'Leg dir kostenlos Tarot mit dem vollen 78-Karten-Deck: eine Karte, Vergangenheit-Gegenwart-Zukunft, eine Beziehungslegung oder das ganze keltische Kreuz. Bedeutungen aufrecht und umgekehrt für jede Karte.',
    h1: 'Tarot legen',
    lead: 'Wähl eine Legung, zieh aus dem vollen 78-Karten-Deck und lies jede Position mit aufrechter und umgekehrter Bedeutung.',
    spreadTitle: 'Legung', cardCount: n => `${n} Karten`,
    deckTitle: 'Deck', fullDeck: 'Alle 78', majorOnly: 'Große 22',
    drawBtn: (label, n) => `✦ ${label} ziehen (${n})`,
    revealAll: 'Alle aufdecken', revealed: (a, b) => `${a} von ${b} aufgedeckt`, drawAgain: 'Neu ziehen',
    tapToReveal: 'Zum Aufdecken tippen',
    tabDraw: '🃏 Ziehen', tabList: '📚 Alle Karten',
    majorHeading: 'Große Arkana', minorHeading: 'Kleine Arkana',
    upright: 'Aufrecht', reversed: 'Umgekehrt',
    privacy: 'Jeder Zug ist zufällig, es wird nichts gespeichert und nichts irgendwohin geschickt.',
    disclaimer: 'Tarot dient dem Nachdenken und der Unterhaltung. Entscheidungen, die zählen, verdienen echte Informationen und dein eigenes Urteil.',
    home: 'Start', section: 'Horoskope',
  },
  fr: {
    metaTitle: 'Tirage de tarot en ligne — 78 cartes gratuit',
    metaDesc: 'Faites un tirage de tarot gratuit avec le jeu complet de 78 cartes : une carte, passé-présent-futur, tirage de relation ou la croix celtique entière. Sens à l’endroit et à l’envers pour chaque carte.',
    h1: 'Tirage de tarot',
    lead: 'Choisissez un tirage, piochez dans le jeu complet de 78 cartes et lisez chaque position avec son sens à l’endroit et à l’envers.',
    spreadTitle: 'Tirage', cardCount: n => `${n} cartes`,
    deckTitle: 'Jeu', fullDeck: 'Les 78', majorOnly: 'Majeurs 22',
    drawBtn: (label, n) => `✦ Tirer ${label} (${n})`,
    revealAll: 'Tout révéler', revealed: (a, b) => `${a} sur ${b} révélées`, drawAgain: 'Retirer',
    tapToReveal: 'Touchez pour révéler',
    tabDraw: '🃏 Tirage', tabList: '📚 Toutes les cartes',
    majorHeading: 'Arcanes majeurs', minorHeading: 'Arcanes mineurs',
    upright: 'À l’endroit', reversed: 'À l’envers',
    privacy: 'Chaque tirage est aléatoire ; rien n’est conservé ni envoyé nulle part.',
    disclaimer: 'Le tarot sert à réfléchir et à se divertir. Les décisions qui comptent méritent de vraies informations et votre propre jugement.',
    home: 'Accueil', section: 'Horoscopes',
  },
  hi: {
    metaTitle: 'ऑनलाइन टैरो रीडिंग — 78 कार्ड के मुफ़्त प्रसार',
    metaDesc: 'पूरे 78 कार्ड के डेक से मुफ़्त टैरो रीडिंग: एक कार्ड, अतीत-वर्तमान-भविष्य, रिश्ते का प्रसार या पूरा सेल्टिक क्रॉस। हर कार्ड के सीधे और उल्टे अर्थ के साथ।',
    h1: 'टैरो रीडिंग',
    lead: 'एक प्रसार चुनिए, पूरे 78 कार्ड के डेक से निकालिए, और हर स्थान को सीधे तथा उल्टे अर्थ के साथ पढ़िए।',
    spreadTitle: 'प्रसार', cardCount: n => `${n} कार्ड`,
    deckTitle: 'डेक', fullDeck: 'पूरे 78', majorOnly: 'मेजर 22',
    drawBtn: (label, n) => `✦ ${label} निकालें (${n})`,
    revealAll: 'सब खोलें', revealed: (a, b) => `${b} में से ${a} खुले`, drawAgain: 'दोबारा निकालें',
    tapToReveal: 'खोलने के लिए छुएँ',
    tabDraw: '🃏 निकालें', tabList: '📚 सारे कार्ड',
    majorHeading: 'मेजर अर्काना', minorHeading: 'माइनर अर्काना',
    upright: 'सीधा', reversed: 'उल्टा',
    privacy: 'हर बार का चुनाव अनियमित है, कुछ भी सहेजा या कहीं भेजा नहीं जाता।',
    disclaimer: 'टैरो सोचने और मन बहलाने के लिए है। जो फ़ैसले मायने रखते हैं, उनके लिए सही जानकारी और अपनी समझ चाहिए।',
    home: 'होम', section: 'राशिफल',
  },
  'zh-hans': {
    metaTitle: '在线塔罗占卜 — 78张全牌免费牌阵',
    metaDesc: '用完整的78张牌做免费塔罗占卜：单张、过去-现在-未来、关系牌阵，或完整的凯尔特十字。每张牌都有正位和逆位的含义。',
    h1: '塔罗占卜',
    lead: '选一个牌阵，从完整的78张牌里抽取，再按正位和逆位的含义读每个位置。',
    spreadTitle: '牌阵', cardCount: n => `${n} 张`,
    deckTitle: '牌组', fullDeck: '全78张', majorOnly: '大阿尔卡纳22张',
    drawBtn: (label, n) => `✦ 抽「${label}」（${n} 张）`,
    revealAll: '全部翻开', revealed: (a, b) => `已翻开 ${a}/${b}`, drawAgain: '重新抽牌',
    tapToReveal: '点一下翻开',
    tabDraw: '🃏 抽牌', tabList: '📚 所有牌',
    majorHeading: '大阿尔卡纳', minorHeading: '小阿尔卡纳',
    upright: '正位', reversed: '逆位',
    privacy: '每次抽牌都是随机的，什么都不保存，也不会送到任何地方。',
    disclaimer: '塔罗是用来整理思路和图个乐的。要紧的决定，值得用真实的信息和自己的判断。',
    home: '首页', section: '运势',
  },
  'zh-hant': {
    metaTitle: '線上塔羅占卜 — 78張全牌免費牌陣',
    metaDesc: '用完整的78張牌做免費塔羅占卜：單張、過去-現在-未來、關係牌陣，或完整的凱爾特十字。每張牌都有正位和逆位的含義。',
    h1: '塔羅占卜',
    lead: '選一個牌陣，從完整的78張牌裡抽取，再按正位和逆位的含義讀每個位置。',
    spreadTitle: '牌陣', cardCount: n => `${n} 張`,
    deckTitle: '牌組', fullDeck: '全78張', majorOnly: '大阿爾克那22張',
    drawBtn: (label, n) => `✦ 抽「${label}」（${n} 張）`,
    revealAll: '全部翻開', revealed: (a, b) => `已翻開 ${a}/${b}`, drawAgain: '重新抽牌',
    tapToReveal: '點一下翻開',
    tabDraw: '🃏 抽牌', tabList: '📚 所有牌',
    majorHeading: '大阿爾克那', minorHeading: '小阿爾克那',
    upright: '正位', reversed: '逆位',
    privacy: '每次抽牌都是隨機的，什麼都不儲存，也不會送到任何地方。',
    disclaimer: '塔羅是用來整理思路和圖個樂的。要緊的決定，值得用真實的資訊和自己的判斷。',
    home: '首頁', section: '運勢',
  },
};
