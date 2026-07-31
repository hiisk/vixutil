/**
 * 큐브 공식 화면의 문구 — 열 언어.
 *
 * 공식(R U R')과 경우 이름(OLL 21, T perm)은 만국 공통이라 옮기지 않는다.
 * 항목마다의 설명도 손으로 적지 않는다 — 계산해 낸 모양에서 문장을 만든다.
 * 119개를 열 언어로 손으로 적으면 952줄이고, 그중 한 줄이 그림과 어긋나도
 * 아무도 못 잡는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { Step } from './list.ts';
import type { CaseFacts, EdgeShape, PairPlace, PllMoves } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface CubeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  stepLabel: Record<Step, string>;
  stepNote: Record<Step, string>;
  shapeLabel: Record<EdgeShape, string>;
  movingLabel: Record<PllMoves, string>;
  placeLabel: Record<PairPlace, string>;
  moveCount: (n: number) => string;
  algLabel: string;
  reverseLabel: string;
  stepTitle: string;
  shapeTitle: string;
  movingTitle: string;
  placeTitle: string;
  siblingTitle: string;
  desc: (f: CaseFacts) => string;
  notationTitle: string;
  notationNote: string;
  notation: { token: string; text: string }[];
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (label: string) => string;
  metaDesc: (f: CaseFacts) => string;
  hubFaq: FaqItem[];
  caseFaq: (f: CaseFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof CubeUI]: L<CubeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('큐브 공식', 'Cube algorithms', 'Algoritmos de cubo', 'Algoritmos de cubo', 'キューブの手順', 'Cube-Algorithmen', 'Algorithmes de cube', 'क्यूब एल्गोरिद्म', '魔方公式', '魔術方塊公式'),

  hubTitle: T(
    '큐브 공식 119가지',
    '119 Rubik’s cube algorithms',
    '119 algoritmos del cubo de Rubik',
    '119 algoritmos do cubo mágico',
    'キューブの手順119種',
    '119 Zauberwürfel-Algorithmen',
    '119 algorithmes du Rubik’s cube',
    'रूबिक क्यूब के 119 एल्गोरिद्म',
    '魔方公式 119 条',
    '魔術方塊公式 119 條',
  ),

  hubLead: T(
    'CFOP의 세 단계 — F2L 41가지, OLL 57가지, PLL 21가지를 한자리에 모았습니다. 경우 그림은 공식을 실제로 돌려서 그린 것입니다.',
    'The three CFOP stages in one place: 41 F2L cases, 57 OLL and 21 PLL. Every diagram is drawn by actually running the algorithm on a cube.',
    'Las tres etapas del CFOP juntas: 41 casos de F2L, 57 de OLL y 21 de PLL. Cada diagrama se dibuja ejecutando el algoritmo en un cubo.',
    'As três etapas do CFOP num só lugar: 41 casos de F2L, 57 de OLL e 21 de PLL. Cada diagrama é desenhado executando o algoritmo num cubo.',
    'CFOPの三段階 — F2L 41種、OLL 57種、PLL 21種をまとめました。図はすべて手順を実際に回して描いています。',
    'Die drei CFOP-Stufen an einem Ort: 41 F2L-Fälle, 57 OLL und 21 PLL. Jedes Diagramm entsteht, indem der Algorithmus tatsächlich ausgeführt wird.',
    'Les trois étapes du CFOP réunies : 41 cas de F2L, 57 d’OLL et 21 de PLL. Chaque schéma est tracé en exécutant réellement l’algorithme.',
    'CFOP के तीनों चरण एक जगह: F2L के 41, OLL के 57 और PLL के 21 मामले। हर चित्र एल्गोरिद्म को सचमुच चलाकर बनाया गया है।',
    'CFOP 的三个阶段收在一处 —— F2L 41 种、OLL 57 种、PLL 21 种。每张情形图都是把公式真的转一遍画出来的。',
    'CFOP 的三個階段收在一處 —— F2L 41 種、OLL 57 種、PLL 21 種。每張情形圖都是把公式真的轉一遍畫出來的。',
  ),

  stepLabel: T(
    { f2l: 'F2L — 아래 두 층', oll: 'OLL — 윗면 색 맞추기', pll: 'PLL — 마지막 층 자리 맞추기' },
    { f2l: 'F2L — first two layers', oll: 'OLL — orient the last layer', pll: 'PLL — permute the last layer' },
    { f2l: 'F2L — dos primeras capas', oll: 'OLL — orientar la última capa', pll: 'PLL — permutar la última capa' },
    { f2l: 'F2L — duas primeiras camadas', oll: 'OLL — orientar a última camada', pll: 'PLL — permutar a última camada' },
    { f2l: 'F2L — 下二層', oll: 'OLL — 上面の色ぞろえ', pll: 'PLL — 最終層の入れ替え' },
    { f2l: 'F2L — erste zwei Ebenen', oll: 'OLL — letzte Ebene ausrichten', pll: 'PLL — letzte Ebene vertauschen' },
    { f2l: 'F2L — deux premières couronnes', oll: 'OLL — orienter la dernière couronne', pll: 'PLL — permuter la dernière couronne' },
    { f2l: 'F2L — पहली दो परतें', oll: 'OLL — ऊपरी परत का रंग', pll: 'PLL — अंतिम परत की अदला-बदली' },
    { f2l: 'F2L — 下面两层', oll: 'OLL — 把顶面转成一色', pll: 'PLL — 把顶层归位' },
    { f2l: 'F2L — 下面兩層', oll: 'OLL — 把頂面轉成一色', pll: 'PLL — 把頂層歸位' },
  ),

  stepNote: T(
    {
      f2l: '모서리 조각과 변 조각을 짝지어 슬롯에 넣습니다. 41가지는 짝이 놓인 위치와 방향을 모두 센 수입니다.',
      oll: '아래 두 층을 흐트러뜨리지 않고 윗면을 한 색으로 만듭니다. 경우는 57가지뿐입니다.',
      pll: '색은 맞았고 자리만 남았을 때 씁니다. 마지막 층의 조각을 제자리로 보내면 끝입니다.',
    },
    {
      f2l: 'Pair a corner with its edge and drop them into the slot. The 41 cases count every position and orientation the pair can take.',
      oll: 'Make the top face one colour without disturbing the two layers below. There are exactly 57 cases.',
      pll: 'Used when the colour is done and only the places are wrong. Send the last-layer pieces home and the cube is solved.',
    },
    {
      f2l: 'Empareja una esquina con su arista y mételas en el hueco. Los 41 casos cubren todas las posiciones y orientaciones del par.',
      oll: 'Deja la cara superior de un color sin estropear las dos capas de abajo. Hay exactamente 57 casos.',
      pll: 'Se usa cuando el color ya está y solo faltan los sitios. Manda las piezas a su lugar y el cubo queda resuelto.',
    },
    {
      f2l: 'Junte a quina com sua aresta e encaixe as duas no slot. Os 41 casos cobrem todas as posições e orientações do par.',
      oll: 'Deixe a face de cima de uma cor só, sem bagunçar as duas camadas de baixo. São exatamente 57 casos.',
      pll: 'Usado quando a cor já está e só faltam os lugares. Mande as peças para casa e o cubo está resolvido.',
    },
    {
      f2l: 'コーナーとエッジを組にしてスロットへ入れます。41種は組の位置と向きを数え上げた数です。',
      oll: '下の二層を崩さずに上面を一色にします。場合は57種しかありません。',
      pll: '色はそろい、位置だけが残ったときに使います。最終層の駒を元の場所へ送れば完成です。',
    },
    {
      f2l: 'Ecke und Kante zu einem Paar fügen und ins Fach setzen. Die 41 Fälle zählen alle Lagen und Ausrichtungen des Paares.',
      oll: 'Die obere Fläche einfarbig machen, ohne die zwei Ebenen darunter zu stören. Es gibt genau 57 Fälle.',
      pll: 'Kommt zum Zug, wenn die Farbe steht und nur die Plätze fehlen. Die Steine nach Hause schicken — fertig.',
    },
    {
      f2l: 'Associez un coin à son arête et glissez la paire dans la fente. Les 41 cas couvrent toutes les positions et orientations possibles.',
      oll: 'Rendre la face du dessus unie sans défaire les deux couronnes du dessous. Il existe exactement 57 cas.',
      pll: 'Sert quand la couleur est faite et qu’il ne reste que les places. Renvoyez les pièces chez elles et c’est fini.',
    },
    {
      f2l: 'कोने और उससे जुड़े किनारे को जोड़कर स्लॉट में डालें। 41 मामले जोड़ी की हर स्थिति और दिशा गिनते हैं।',
      oll: 'नीचे की दो परतें बिगाड़े बिना ऊपरी सतह को एक रंग का करें। मामले ठीक 57 ही हैं।',
      pll: 'जब रंग हो चुका हो और सिर्फ़ जगहें बची हों तब काम आता है। टुकड़े अपनी जगह भेजें और क्यूब हल।',
    },
    {
      f2l: '把角块和棱块配成一对塞进槽里。41 种，是把这一对的位置和朝向全数出来的结果。',
      oll: '在不打乱下面两层的前提下，把顶面转成同一个颜色。情形只有 57 种。',
      pll: '颜色已经对了，只剩位置的时候用。把顶层的块送回各自的位子就结束了。',
    },
    {
      f2l: '把角塊和稜塊配成一對塞進槽裡。41 種，是把這一對的位置和朝向全數出來的結果。',
      oll: '在不打亂下面兩層的前提下，把頂面轉成同一個顏色。情形只有 57 種。',
      pll: '顏色已經對了，只剩位置的時候用。把頂層的塊送回各自的位子就結束了。',
    },
  ),

  shapeLabel: T(
    { dot: '점', corner: 'ㄱ자', line: '일자', cross: '십자' },
    { dot: 'Dot', corner: 'L shape', line: 'Line', cross: 'Cross' },
    { dot: 'Punto', corner: 'Forma de L', line: 'Línea', cross: 'Cruz' },
    { dot: 'Ponto', corner: 'Forma de L', line: 'Linha', cross: 'Cruz' },
    { dot: '点', corner: 'L字', line: '一文字', cross: '十字' },
    { dot: 'Punkt', corner: 'L-Form', line: 'Linie', cross: 'Kreuz' },
    { dot: 'Point', corner: 'Forme en L', line: 'Ligne', cross: 'Croix' },
    { dot: 'बिंदु', corner: 'L आकार', line: 'रेखा', cross: 'क्रॉस' },
    { dot: '点', corner: 'L 形', line: '一字', cross: '十字' },
    { dot: '點', corner: 'L 形', line: '一字', cross: '十字' },
  ),

  movingLabel: T(
    { corners: '모서리만', edges: '변만', both: '모서리와 변 함께' },
    { corners: 'Corners only', edges: 'Edges only', both: 'Corners and edges' },
    { corners: 'Solo esquinas', edges: 'Solo aristas', both: 'Esquinas y aristas' },
    { corners: 'Só quinas', edges: 'Só arestas', both: 'Quinas e arestas' },
    { corners: 'コーナーだけ', edges: 'エッジだけ', both: 'コーナーとエッジ' },
    { corners: 'Nur Ecken', edges: 'Nur Kanten', both: 'Ecken und Kanten' },
    { corners: 'Coins seuls', edges: 'Arêtes seules', both: 'Coins et arêtes' },
    { corners: 'सिर्फ़ कोने', edges: 'सिर्फ़ किनारे', both: 'कोने और किनारे' },
    { corners: '只动角块', edges: '只动棱块', both: '角块和棱块一起动' },
    { corners: '只動角塊', edges: '只動稜塊', both: '角塊和稜塊一起動' },
  ),

  placeLabel: T(
    { 'both-up': '둘 다 윗면', 'corner-in': '모서리는 슬롯 안', 'edge-in': '변은 슬롯 안', 'both-in': '둘 다 슬롯 안' },
    { 'both-up': 'Both in the top layer', 'corner-in': 'Corner already in the slot', 'edge-in': 'Edge already in the slot', 'both-in': 'Both stuck in the slot' },
    { 'both-up': 'Ambas arriba', 'corner-in': 'Esquina ya en el hueco', 'edge-in': 'Arista ya en el hueco', 'both-in': 'Ambas atascadas en el hueco' },
    { 'both-up': 'Ambas em cima', 'corner-in': 'Quina já no slot', 'edge-in': 'Aresta já no slot', 'both-in': 'Ambas presas no slot' },
    { 'both-up': '二つとも上面', 'corner-in': 'コーナーはスロット内', 'edge-in': 'エッジはスロット内', 'both-in': '二つともスロット内' },
    { 'both-up': 'Beide oben', 'corner-in': 'Ecke schon im Fach', 'edge-in': 'Kante schon im Fach', 'both-in': 'Beide im Fach verkeilt' },
    { 'both-up': 'Les deux en haut', 'corner-in': 'Coin déjà dans la fente', 'edge-in': 'Arête déjà dans la fente', 'both-in': 'Les deux coincés dans la fente' },
    { 'both-up': 'दोनों ऊपरी परत में', 'corner-in': 'कोना पहले से स्लॉट में', 'edge-in': 'किनारा पहले से स्लॉट में', 'both-in': 'दोनों स्लॉट में फँसे' },
    { 'both-up': '两块都在顶面', 'corner-in': '角块已在槽内', 'edge-in': '棱块已在槽内', 'both-in': '两块都在槽内' },
    { 'both-up': '兩塊都在頂面', 'corner-in': '角塊已在槽內', 'edge-in': '稜塊已在槽內', 'both-in': '兩塊都在槽內' },
  ),

  moveCount: T(
    (n: number) => `${n}수`,
    (n: number) => `${n} moves`,
    (n: number) => `${n} movimientos`,
    (n: number) => `${n} movimentos`,
    (n: number) => `${n}手`,
    (n: number) => `${n} Züge`,
    (n: number) => `${n} mouvements`,
    (n: number) => `${n} चालें`,
    (n: number) => `${n} 步`,
    (n: number) => `${n} 步`,
  ),

  algLabel: T('공식', 'Algorithm', 'Algoritmo', 'Algoritmo', '手順', 'Algorithmus', 'Algorithme', 'एल्गोरिद्म', '公式', '公式'),
  reverseLabel: T('역순', 'Reverse', 'Inverso', 'Inverso', '逆手順', 'Umkehrung', 'Inverse', 'उलटा क्रम', '逆序', '逆序'),
  stepTitle: T('단계', 'Stage', 'Etapa', 'Etapa', '段階', 'Stufe', 'Étape', 'चरण', '阶段', '階段'),
  shapeTitle: T('윗면 모양', 'Top shape', 'Forma superior', 'Forma de cima', '上面の形', 'Form oben', 'Forme du dessus', 'ऊपरी आकार', '顶面形状', '頂面形狀'),
  movingTitle: T('움직이는 조각', 'What moves', 'Qué se mueve', 'O que se move', '動く駒', 'Was sich bewegt', 'Ce qui bouge', 'क्या हिलता है', '哪些块在动', '哪些塊在動'),
  placeTitle: T('짝의 자리', 'Where the pair is', 'Dónde está el par', 'Onde está o par', '組の位置', 'Wo das Paar liegt', 'Où est la paire', 'जोड़ी कहाँ है', '这一对在哪里', '這一對在哪裡'),
  siblingTitle: T('같은 갈래의 다른 경우', 'Other cases in this group', 'Otros casos del grupo', 'Outros casos do grupo', '同じ組の別の場合', 'Andere Fälle dieser Gruppe', 'Autres cas du groupe', 'इसी समूह के अन्य मामले', '同一类的其他情形', '同一類的其他情形'),

  desc: T(
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': '짝이 둘 다 윗면에 있습니다', 'corner-in': '모서리는 이미 슬롯에 들어가 있습니다', 'edge-in': '변은 이미 슬롯에 들어가 있습니다', 'both-in': '둘 다 슬롯에 들어가 있지만 방향이 틀렸습니다' }[f.place!];
        return `${where}. ${f.moves}수로 넣습니다.`;
      }
      if (f.step === 'pll') {
        const what = { corners: '모서리 조각만 자리를 바꿉니다', edges: '변 조각만 자리를 바꿉니다', both: '모서리와 변이 함께 자리를 바꿉니다' }[f.moving!];
        return `${what}. ${f.moves}수입니다.`;
      }
      const shape = { dot: '점', corner: 'ㄱ자', line: '일자', cross: '십자' }[f.shape!];
      const corners = f.cornersUp === 0 ? '모서리는 하나도 서 있지 않습니다' : `모서리는 ${f.cornersUp}개가 서 있습니다`;
      return `윗면 변이 ${shape} 모양이고 ${corners}. ${f.moves}수입니다.`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': 'Both pieces sit in the top layer', 'corner-in': 'The corner is already in the slot', 'edge-in': 'The edge is already in the slot', 'both-in': 'Both are in the slot but facing wrong' }[f.place!];
        return `${where}. ${f.moves} moves to insert.`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'Only the corners move', edges: 'Only the edges move', both: 'Corners and edges move together' }[f.moving!];
        return `${what}. ${f.moves} moves.`;
      }
      const shape = { dot: 'a dot', corner: 'an L', line: 'a line', cross: 'a cross' }[f.shape!];
      const one = f.cornersUp === 1;
      const corners = f.cornersUp === 0 ? 'no corner faces up yet' : `${f.cornersUp} corner${one ? '' : 's'} already ${one ? 'faces' : 'face'} up`;
      return `The top edges make ${shape} and ${corners}. ${f.moves} moves.`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': 'Las dos piezas están arriba', 'corner-in': 'La esquina ya está en el hueco', 'edge-in': 'La arista ya está en el hueco', 'both-in': 'Las dos están en el hueco pero mal orientadas' }[f.place!];
        return `${where}. ${f.moves} movimientos para insertarlas.`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'Solo se mueven las esquinas', edges: 'Solo se mueven las aristas', both: 'Se mueven esquinas y aristas' }[f.moving!];
        return `${what}. ${f.moves} movimientos.`;
      }
      const shape = { dot: 'un punto', corner: 'una L', line: 'una línea', cross: 'una cruz' }[f.shape!];
      const one = f.cornersUp === 1;
      const corners = f.cornersUp === 0 ? 'ninguna esquina mira aún hacia arriba' : `${f.cornersUp} esquina${one ? '' : 's'} ya ${one ? 'mira' : 'miran'} hacia arriba`;
      return `Las aristas de arriba forman ${shape} y ${corners}. ${f.moves} movimientos.`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': 'As duas peças estão em cima', 'corner-in': 'A quina já está no slot', 'edge-in': 'A aresta já está no slot', 'both-in': 'As duas estão no slot mas viradas errado' }[f.place!];
        return `${where}. ${f.moves} movimentos para encaixar.`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'Só as quinas se movem', edges: 'Só as arestas se movem', both: 'Quinas e arestas se movem juntas' }[f.moving!];
        return `${what}. ${f.moves} movimentos.`;
      }
      const shape = { dot: 'um ponto', corner: 'um L', line: 'uma linha', cross: 'uma cruz' }[f.shape!];
      const one = f.cornersUp === 1;
      const corners = f.cornersUp === 0 ? 'nenhuma quina olha para cima ainda' : `${f.cornersUp} quina${one ? '' : 's'} já ${one ? 'olha' : 'olham'} para cima`;
      return `As arestas de cima formam ${shape} e ${corners}. ${f.moves} movimentos.`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': '二つとも上面にあります', 'corner-in': 'コーナーはすでにスロットに入っています', 'edge-in': 'エッジはすでにスロットに入っています', 'both-in': '二つともスロットにありますが向きが違います' }[f.place!];
        return `${where}。${f.moves}手で入ります。`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'コーナーだけが入れ替わります', edges: 'エッジだけが入れ替わります', both: 'コーナーとエッジが一緒に入れ替わります' }[f.moving!];
        return `${what}。${f.moves}手です。`;
      }
      const shape = { dot: '点', corner: 'L字', line: '一文字', cross: '十字' }[f.shape!];
      const corners = f.cornersUp === 0 ? '上を向いたコーナーはまだありません' : `コーナーは${f.cornersUp}個が上を向いています`;
      return `上面のエッジが${shape}で、${corners}。${f.moves}手です。`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': 'Beide Steine liegen oben', 'corner-in': 'Die Ecke steckt schon im Fach', 'edge-in': 'Die Kante steckt schon im Fach', 'both-in': 'Beide stecken im Fach, aber falsch herum' }[f.place!];
        return `${where}. ${f.moves} Züge zum Einsetzen.`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'Nur die Ecken wechseln den Platz', edges: 'Nur die Kanten wechseln den Platz', both: 'Ecken und Kanten wechseln zusammen' }[f.moving!];
        return `${what}. ${f.moves} Züge.`;
      }
      const shape = { dot: 'einen Punkt', corner: 'ein L', line: 'eine Linie', cross: 'ein Kreuz' }[f.shape!];
      const one = f.cornersUp === 1;
      const corners = f.cornersUp === 0 ? 'noch keine Ecke zeigt nach oben' : `${f.cornersUp} Ecke${one ? '' : 'n'} ${one ? 'zeigt' : 'zeigen'} schon nach oben`;
      return `Die oberen Kanten bilden ${shape}, und ${corners}. ${f.moves} Züge.`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': 'Les deux pièces sont en haut', 'corner-in': 'Le coin est déjà dans la fente', 'edge-in': 'L’arête est déjà dans la fente', 'both-in': 'Les deux sont dans la fente mais mal orientées' }[f.place!];
        return `${where}. ${f.moves} mouvements pour les insérer.`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'Seuls les coins bougent', edges: 'Seules les arêtes bougent', both: 'Coins et arêtes bougent ensemble' }[f.moving!];
        return `${what}. ${f.moves} mouvements.`;
      }
      const shape = { dot: 'un point', corner: 'un L', line: 'une ligne', cross: 'une croix' }[f.shape!];
      const one = f.cornersUp === 1;
      const corners = f.cornersUp === 0 ? 'aucun coin n’est encore tourné vers le haut' : `${f.cornersUp} coin${one ? '' : 's'} ${one ? 'est déjà tourné' : 'sont déjà tournés'} vers le haut`;
      return `Les arêtes du dessus forment ${shape} et ${corners}. ${f.moves} mouvements.`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': 'दोनों टुकड़े ऊपरी परत में हैं', 'corner-in': 'कोना पहले से स्लॉट में है', 'edge-in': 'किनारा पहले से स्लॉट में है', 'both-in': 'दोनों स्लॉट में हैं पर दिशा ग़लत है' }[f.place!];
        return `${where}। डालने में ${f.moves} चालें।`;
      }
      if (f.step === 'pll') {
        const what = { corners: 'सिर्फ़ कोने जगह बदलते हैं', edges: 'सिर्फ़ किनारे जगह बदलते हैं', both: 'कोने और किनारे साथ जगह बदलते हैं' }[f.moving!];
        return `${what}। ${f.moves} चालें।`;
      }
      const shape = { dot: 'बिंदु', corner: 'L', line: 'रेखा', cross: 'क्रॉस' }[f.shape!];
      const corners = f.cornersUp === 0 ? 'अभी कोई कोना ऊपर नहीं देख रहा' : `${f.cornersUp} कोने पहले से ऊपर देख रहे हैं`;
      return `ऊपरी किनारे ${shape} बनाते हैं और ${corners}। ${f.moves} चालें।`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': '这一对两块都在顶面', 'corner-in': '角块已经进了槽', 'edge-in': '棱块已经进了槽', 'both-in': '两块都进了槽，但朝向不对' }[f.place!];
        return `${where}。用 ${f.moves} 步塞进去。`;
      }
      if (f.step === 'pll') {
        const what = { corners: '只有角块换位置', edges: '只有棱块换位置', both: '角块和棱块一起换位置' }[f.moving!];
        return `${what}。一共 ${f.moves} 步。`;
      }
      const shape = { dot: '点', corner: 'L 形', line: '一字', cross: '十字' }[f.shape!];
      const corners = f.cornersUp === 0 ? '一个角块都没立起来' : `有 ${f.cornersUp} 个角块立着`;
      return `顶面的棱块排成${shape}，${corners}。一共 ${f.moves} 步。`;
    },
    (f: CaseFacts) => {
      if (f.step === 'f2l') {
        const where = { 'both-up': '這一對兩塊都在頂面', 'corner-in': '角塊已經進了槽', 'edge-in': '稜塊已經進了槽', 'both-in': '兩塊都進了槽，但朝向不對' }[f.place!];
        return `${where}。用 ${f.moves} 步塞進去。`;
      }
      if (f.step === 'pll') {
        const what = { corners: '只有角塊換位置', edges: '只有稜塊換位置', both: '角塊和稜塊一起換位置' }[f.moving!];
        return `${what}。一共 ${f.moves} 步。`;
      }
      const shape = { dot: '點', corner: 'L 形', line: '一字', cross: '十字' }[f.shape!];
      const corners = f.cornersUp === 0 ? '一個角塊都沒立起來' : `有 ${f.cornersUp} 個角塊立著`;
      return `頂面的稜塊排成${shape}，${corners}。一共 ${f.moves} 步。`;
    },
  ),

  notationTitle: T('표기 읽는 법', 'Reading the notation', 'Cómo leer la notación', 'Como ler a notação', '表記の読み方', 'Die Notation lesen', 'Lire la notation', 'संकेत कैसे पढ़ें', '怎么读这套记号', '怎麼讀這套記號'),
  notationNote: T(
    '글자 하나가 면 하나입니다. 그냥 적으면 시계 방향, 따옴표가 붙으면 반시계 방향, 2가 붙으면 반 바퀴입니다.',
    'Each letter is a face. Plain means a quarter turn clockwise, an apostrophe means counter-clockwise, a 2 means a half turn.',
    'Cada letra es una cara. Sola indica un cuarto de vuelta en sentido horario; con apóstrofo, antihorario; con 2, media vuelta.',
    'Cada letra é uma face. Sozinha é um quarto de volta no sentido horário, com apóstrofo é anti-horário, com 2 é meia volta.',
    '一文字が一つの面です。そのままなら時計回りに90度、アポストロフィが付けば反時計回り、2が付けば180度です。',
    'Jeder Buchstabe ist eine Fläche. Ohne Zusatz eine Vierteldrehung im Uhrzeigersinn, mit Apostroph gegen den Uhrzeigersinn, mit 2 eine halbe Drehung.',
    'Chaque lettre est une face. Seule, c’est un quart de tour horaire ; avec une apostrophe, antihoraire ; avec un 2, un demi-tour.',
    'हर अक्षर एक सतह है। अकेला हो तो घड़ी की दिशा में चौथाई घुमाव, एपॉस्ट्रॉफ़ी हो तो उल्टी दिशा, 2 हो तो आधा घुमाव।',
    '一个字母代表一个面。单写是顺时针转九十度，带撇是逆时针，带 2 是转半圈。',
    '一個字母代表一個面。單寫是順時針轉九十度，帶撇是逆時針，帶 2 是轉半圈。',
  ),

  notation: T(
    [
      { token: 'U · D', text: '윗면과 아랫면' },
      { token: 'R · L', text: '오른쪽 면과 왼쪽 면' },
      { token: 'F · B', text: '앞면과 뒷면' },
      { token: "R'", text: '반시계 방향으로 90도' },
      { token: 'R2', text: '반 바퀴 — 방향은 상관없습니다' },
      { token: 'r · Rw', text: '오른쪽 두 층을 함께' },
      { token: 'M', text: 'R과 L 사이의 가운데 층, L을 따라' },
      { token: 'E · S', text: 'U와 D 사이, F와 B 사이의 가운데 층' },
      { token: 'x · y · z', text: '큐브 전체를 R·U·F 방향으로 돌리기' },
    ],
    [
      { token: 'U · D', text: 'Up and down faces' },
      { token: 'R · L', text: 'Right and left faces' },
      { token: 'F · B', text: 'Front and back faces' },
      { token: "R'", text: 'A quarter turn counter-clockwise' },
      { token: 'R2', text: 'A half turn — direction does not matter' },
      { token: 'r · Rw', text: 'The right two layers together' },
      { token: 'M', text: 'The slice between R and L, following L' },
      { token: 'E · S', text: 'The slices between U and D, and between F and B' },
      { token: 'x · y · z', text: 'Turn the whole cube the way R, U and F go' },
    ],
    [
      { token: 'U · D', text: 'Caras superior e inferior' },
      { token: 'R · L', text: 'Caras derecha e izquierda' },
      { token: 'F · B', text: 'Caras frontal y trasera' },
      { token: "R'", text: 'Un cuarto de vuelta antihorario' },
      { token: 'R2', text: 'Media vuelta: da igual el sentido' },
      { token: 'r · Rw', text: 'Las dos capas de la derecha a la vez' },
      { token: 'M', text: 'La capa entre R y L, en el sentido de L' },
      { token: 'E · S', text: 'Las capas entre U y D, y entre F y B' },
      { token: 'x · y · z', text: 'Girar el cubo entero como van R, U y F' },
    ],
    [
      { token: 'U · D', text: 'Faces de cima e de baixo' },
      { token: 'R · L', text: 'Faces direita e esquerda' },
      { token: 'F · B', text: 'Faces da frente e de trás' },
      { token: "R'", text: 'Um quarto de volta anti-horário' },
      { token: 'R2', text: 'Meia volta — o sentido não importa' },
      { token: 'r · Rw', text: 'As duas camadas da direita juntas' },
      { token: 'M', text: 'A fatia entre R e L, seguindo L' },
      { token: 'E · S', text: 'As fatias entre U e D, e entre F e B' },
      { token: 'x · y · z', text: 'Girar o cubo inteiro como vão R, U e F' },
    ],
    [
      { token: 'U · D', text: '上面と下面' },
      { token: 'R · L', text: '右面と左面' },
      { token: 'F · B', text: '前面と後面' },
      { token: "R'", text: '反時計回りに90度' },
      { token: 'R2', text: '180度 — 向きは問いません' },
      { token: 'r · Rw', text: '右の二層をまとめて' },
      { token: 'M', text: 'RとLの間の中層、Lに従う向き' },
      { token: 'E · S', text: 'UとDの間、FとBの間の中層' },
      { token: 'x · y · z', text: 'キューブ全体をR・U・Fの向きに回す' },
    ],
    [
      { token: 'U · D', text: 'Obere und untere Fläche' },
      { token: 'R · L', text: 'Rechte und linke Fläche' },
      { token: 'F · B', text: 'Vordere und hintere Fläche' },
      { token: "R'", text: 'Vierteldrehung gegen den Uhrzeigersinn' },
      { token: 'R2', text: 'Halbe Drehung — die Richtung ist egal' },
      { token: 'r · Rw', text: 'Die beiden rechten Ebenen zusammen' },
      { token: 'M', text: 'Die Scheibe zwischen R und L, in Richtung L' },
      { token: 'E · S', text: 'Die Scheiben zwischen U und D sowie F und B' },
      { token: 'x · y · z', text: 'Den ganzen Würfel drehen wie R, U und F' },
    ],
    [
      { token: 'U · D', text: 'Faces du dessus et du dessous' },
      { token: 'R · L', text: 'Faces droite et gauche' },
      { token: 'F · B', text: 'Faces avant et arrière' },
      { token: "R'", text: 'Un quart de tour antihoraire' },
      { token: 'R2', text: 'Un demi-tour — le sens importe peu' },
      { token: 'r · Rw', text: 'Les deux couches de droite ensemble' },
      { token: 'M', text: 'La tranche entre R et L, dans le sens de L' },
      { token: 'E · S', text: 'Les tranches entre U et D, et entre F et B' },
      { token: 'x · y · z', text: 'Tourner le cube entier comme vont R, U et F' },
    ],
    [
      { token: 'U · D', text: 'ऊपर और नीचे की सतह' },
      { token: 'R · L', text: 'दाईं और बाईं सतह' },
      { token: 'F · B', text: 'सामने और पीछे की सतह' },
      { token: "R'", text: 'घड़ी की उल्टी दिशा में चौथाई घुमाव' },
      { token: 'R2', text: 'आधा घुमाव — दिशा से फ़र्क़ नहीं' },
      { token: 'r · Rw', text: 'दाईं ओर की दो परतें एक साथ' },
      { token: 'M', text: 'R और L के बीच की परत, L की दिशा में' },
      { token: 'E · S', text: 'U–D के बीच और F–B के बीच की परतें' },
      { token: 'x · y · z', text: 'पूरे क्यूब को R, U और F की दिशा में घुमाना' },
    ],
    [
      { token: 'U · D', text: '顶面和底面' },
      { token: 'R · L', text: '右面和左面' },
      { token: 'F · B', text: '前面和后面' },
      { token: "R'", text: '逆时针转九十度' },
      { token: 'R2', text: '转半圈 —— 方向无所谓' },
      { token: 'r · Rw', text: '右边两层一起转' },
      { token: 'M', text: 'R 和 L 之间的中层，跟着 L 走' },
      { token: 'E · S', text: 'U 与 D 之间、F 与 B 之间的中层' },
      { token: 'x · y · z', text: '整个魔方按 R·U·F 的方向转' },
    ],
    [
      { token: 'U · D', text: '頂面和底面' },
      { token: 'R · L', text: '右面和左面' },
      { token: 'F · B', text: '前面和後面' },
      { token: "R'", text: '逆時針轉九十度' },
      { token: 'R2', text: '轉半圈 —— 方向無所謂' },
      { token: 'r · Rw', text: '右邊兩層一起轉' },
      { token: 'M', text: 'R 和 L 之間的中層，跟著 L 走' },
      { token: 'E · S', text: 'U 與 D 之間、F 與 B 之間的中層' },
      { token: 'x · y · z', text: '整個魔術方塊按 R·U·F 的方向轉' },
    ],
  ),

  howTitle: T('보는 방법', 'How to use this', 'Cómo usarlo', 'Como usar', '使い方', 'So nutzt man das', 'Comment s’en servir', 'कैसे इस्तेमाल करें', '怎么用这份表', '怎麼用這份表'),

  how: T(
    [
      '그림은 큐브를 위에서 내려다본 모습입니다. 가운데 아홉 칸이 윗면이고, 바깥으로 삐져나온 칸은 옆면의 첫 줄입니다.',
      '색칠된 칸이 맞춰야 할 색입니다. 내 큐브의 윗면과 같은 모양을 찾아 그 공식을 쓰면 됩니다.',
      '공식이 맞지 않으면 큐브를 한 칸씩 돌려 가며 네 방향에서 다시 보세요. 같은 경우도 어느 쪽에서 보느냐에 따라 달라 보입니다.',
      '모든 그림은 공식을 실제로 돌려서 그렸습니다. 사람이 옮겨 적은 그림이 아니라, 다 맞춘 큐브에 공식의 역순을 건 결과입니다.',
    ],
    [
      'Each diagram looks down on the cube from above. The nine middle squares are the top face; the tabs around them are the first row of each side.',
      'A filled square already shows the colour you are aiming for. Find the picture that matches your cube and use that algorithm.',
      'If nothing matches, turn the cube a quarter at a time and look again from all four sides. The same case looks different from each angle.',
      'Every diagram was drawn by running the algorithm, not by copying a chart: it is what a solved cube looks like after the algorithm is played backwards.',
    ],
    [
      'Cada diagrama mira el cubo desde arriba. Los nueve cuadros centrales son la cara superior; las pestañas de alrededor son la primera fila de cada lado.',
      'Un cuadro relleno ya muestra el color que buscas. Encuentra el dibujo que coincide con tu cubo y usa ese algoritmo.',
      'Si nada coincide, gira el cubo un cuarto cada vez y mira desde los cuatro lados. El mismo caso se ve distinto según el ángulo.',
      'Cada dibujo se generó ejecutando el algoritmo, no copiando una tabla: es lo que queda al aplicar el algoritmo al revés sobre un cubo resuelto.',
    ],
    [
      'Cada diagrama olha o cubo de cima. Os nove quadrados do meio são a face superior; as abas em volta são a primeira fileira de cada lado.',
      'Um quadrado preenchido já mostra a cor que você quer. Ache o desenho que bate com o seu cubo e use aquele algoritmo.',
      'Se nada bater, gire o cubo um quarto de cada vez e olhe dos quatro lados. O mesmo caso parece diferente de cada ângulo.',
      'Todo desenho foi gerado rodando o algoritmo, não copiando uma tabela: é o que sobra ao aplicar o algoritmo ao contrário num cubo resolvido.',
    ],
    [
      '図はキューブを真上から見たところです。真ん中の九マスが上面、外にはみ出したマスは側面の一列目です。',
      '塗られたマスがそろえたい色です。自分のキューブと同じ形の図を探して、その手順を使います。',
      '合う形がなければ、キューブを90度ずつ回して四方向から見直してください。同じ場合でも向きによって違って見えます。',
      'すべての図は手順を実際に回して描いたものです。表を書き写したのではなく、そろったキューブに逆手順をかけた結果です。',
    ],
    [
      'Jedes Diagramm blickt von oben auf den Würfel. Die neun mittleren Felder sind die obere Fläche, die Laschen ringsum die erste Reihe jeder Seite.',
      'Ein gefülltes Feld zeigt schon die Zielfarbe. Suchen Sie das Bild, das zu Ihrem Würfel passt, und nehmen Sie dessen Algorithmus.',
      'Passt keins, drehen Sie den Würfel Viertel für Viertel und schauen Sie aus allen vier Richtungen. Derselbe Fall sieht von jeder Seite anders aus.',
      'Jedes Bild entstand durch Ausführen des Algorithmus, nicht durch Abschreiben: Es ist ein gelöster Würfel, auf den der Algorithmus rückwärts gespielt wurde.',
    ],
    [
      'Chaque schéma regarde le cube d’en haut. Les neuf cases du milieu sont la face du dessus ; les languettes autour sont la première rangée de chaque côté.',
      'Une case remplie montre déjà la couleur visée. Trouvez le dessin qui correspond à votre cube et appliquez son algorithme.',
      'Si rien ne correspond, tournez le cube d’un quart à la fois et regardez des quatre côtés. Un même cas se présente autrement selon l’angle.',
      'Chaque dessin vient de l’exécution de l’algorithme, non d’un tableau recopié : c’est un cube résolu sur lequel l’algorithme a été joué à l’envers.',
    ],
    [
      'हर चित्र क्यूब को ऊपर से देखता है। बीच के नौ खाने ऊपरी सतह हैं; चारों ओर की पट्टियाँ हर बग़ल की पहली पंक्ति हैं।',
      'भरा हुआ खाना वही रंग दिखाता है जो आपको चाहिए। अपने क्यूब से मिलता चित्र ढूँढ़िए और वही एल्गोरिद्म चलाइए।',
      'कुछ न मिले तो क्यूब को चौथाई-चौथाई घुमाकर चारों ओर से देखिए। एक ही मामला हर कोण से अलग दिखता है।',
      'हर चित्र एल्गोरिद्म चलाकर बना है, किसी तालिका से नक़ल करके नहीं: यह हल किए क्यूब पर एल्गोरिद्म उल्टा चलाने का नतीजा है।',
    ],
    [
      '图是从上往下俯视魔方的样子。中间九格是顶面，外面伸出去的那一圈是侧面的第一排。',
      '涂了色的格子就是要对上的颜色。找出和自己魔方顶面一样的图，用那条公式就行。',
      '公式对不上时，把魔方一格一格转过去，从四个方向重新看一遍。同一种情形，从哪边看长得并不一样。',
      '所有的图都是把公式真的转一遍画出来的 —— 不是人照着抄的，而是在还原好的魔方上倒着走一遍公式得到的结果。',
    ],
    [
      '圖是從上往下俯視魔術方塊的樣子。中間九格是頂面，外面伸出去的那一圈是側面的第一排。',
      '塗了色的格子就是要對上的顏色。找出和自己方塊頂面一樣的圖，用那條公式就行。',
      '公式對不上時，把方塊一格一格轉過去，從四個方向重新看一遍。同一種情形，從哪邊看長得並不一樣。',
      '所有的圖都是把公式真的轉一遍畫出來的 —— 不是人照著抄的，而是在還原好的方塊上倒著走一遍公式得到的結果。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '큐브 공식 119가지 — F2L·OLL·PLL 전체 표',
    'Rubik’s cube algorithms — all 119 F2L, OLL and PLL cases',
    'Algoritmos del cubo de Rubik — los 119 casos de F2L, OLL y PLL',
    'Algoritmos do cubo mágico — os 119 casos de F2L, OLL e PLL',
    'キューブの手順119種 — F2L・OLL・PLL 全表',
    'Zauberwürfel-Algorithmen — alle 119 F2L-, OLL- und PLL-Fälle',
    'Algorithmes du Rubik’s cube — les 119 cas de F2L, OLL et PLL',
    'रूबिक क्यूब एल्गोरिद्म — F2L, OLL और PLL के सभी 119 मामले',
    '魔方公式 119 条 — F2L、OLL、PLL 全表',
    '魔術方塊公式 119 條 — F2L、OLL、PLL 全表',
  ),
  hubMetaDesc: T(
    'CFOP 세 단계의 공식을 한 장에 모았습니다. F2L 41가지, OLL 57가지, PLL 21가지 — 경우 그림은 공식을 실제로 돌려 그렸고, 수 개수와 갈래도 계산한 값입니다.',
    'All three CFOP stages on one page: 41 F2L cases, 57 OLL and 21 PLL. Each diagram is produced by running the algorithm on a cube, and the move counts and groupings are computed, not typed in.',
    'Las tres etapas del CFOP en una página: 41 casos de F2L, 57 de OLL y 21 de PLL. Cada diagrama sale de ejecutar el algoritmo, y los movimientos y grupos están calculados.',
    'As três etapas do CFOP numa página: 41 casos de F2L, 57 de OLL e 21 de PLL. Cada diagrama vem de rodar o algoritmo, e as contagens e grupos são calculados.',
    'CFOPの三段階を一枚に。F2L 41種、OLL 57種、PLL 21種 — 図は手順を実際に回して描き、手数も分類も計算した値です。',
    'Alle drei CFOP-Stufen auf einer Seite: 41 F2L-Fälle, 57 OLL und 21 PLL. Jedes Diagramm entsteht durch Ausführen des Algorithmus; Zugzahlen und Gruppen sind berechnet.',
    'Les trois étapes du CFOP sur une page : 41 cas de F2L, 57 d’OLL et 21 de PLL. Chaque schéma vient de l’exécution de l’algorithme, et les comptes de mouvements sont calculés.',
    'CFOP के तीनों चरण एक पन्ने पर: F2L के 41, OLL के 57 और PLL के 21 मामले। हर चित्र एल्गोरिद्म चलाकर बना है और चालों की गिनती भी गणना से आई है।',
    'CFOP 三个阶段的公式收在一页：F2L 41 种、OLL 57 种、PLL 21 种。情形图是把公式真的转一遍画出来的，步数和分类也都是算出来的。',
    'CFOP 三個階段的公式收在一頁：F2L 41 種、OLL 57 種、PLL 21 種。情形圖是把公式真的轉一遍畫出來的，步數和分類也都是算出來的。',
  ),

  metaTitle: T(
    (l: string) => `${l} 공식 — 큐브 경우별 풀이`,
    (l: string) => `${l} — the algorithm and what it solves`,
    (l: string) => `${l} — el algoritmo y qué resuelve`,
    (l: string) => `${l} — o algoritmo e o que ele resolve`,
    (l: string) => `${l} の手順 — どの場合を解くか`,
    (l: string) => `${l} — der Algorithmus und was er löst`,
    (l: string) => `${l} — l’algorithme et ce qu’il résout`,
    (l: string) => `${l} — एल्गोरिद्म और वह क्या हल करता है`,
    (l: string) => `${l} 公式 — 它解的是哪一种情形`,
    (l: string) => `${l} 公式 — 它解的是哪一種情形`,
  ),

  metaDesc: T(
    (f: CaseFacts) => `${f.label}: ${f.alg}. ${f.moves}수입니다. 이 공식이 푸는 모양을 그림으로 확인하세요.`,
    (f: CaseFacts) => `${f.label}: ${f.alg}. ${f.moves} moves. See the diagram of exactly the case this algorithm solves.`,
    (f: CaseFacts) => `${f.label}: ${f.alg}. ${f.moves} movimientos. Mira el diagrama del caso que resuelve este algoritmo.`,
    (f: CaseFacts) => `${f.label}: ${f.alg}. ${f.moves} movimentos. Veja o diagrama do caso que esse algoritmo resolve.`,
    (f: CaseFacts) => `${f.label}: ${f.alg}。${f.moves}手です。この手順が解く形を図で確かめられます。`,
    (f: CaseFacts) => `${f.label}: ${f.alg}. ${f.moves} Züge. Das Diagramm zeigt genau den Fall, den dieser Algorithmus löst.`,
    (f: CaseFacts) => `${f.label} : ${f.alg}. ${f.moves} mouvements. Le schéma montre exactement le cas que cet algorithme résout.`,
    (f: CaseFacts) => `${f.label}: ${f.alg}. ${f.moves} चालें। यह एल्गोरिद्म जो मामला हल करता है उसका चित्र देखिए।`,
    (f: CaseFacts) => `${f.label}：${f.alg}，一共 ${f.moves} 步。这条公式解的是什么形状，看图就知道。`,
    (f: CaseFacts) => `${f.label}：${f.alg}，一共 ${f.moves} 步。這條公式解的是什麼形狀，看圖就知道。`,
  ),

  hubFaq: T(
    [
      { q: 'CFOP가 무엇인가요?', a: '십자(Cross), 아래 두 층(F2L), 윗면 색 맞추기(OLL), 마지막 층 자리 맞추기(PLL)의 앞 글자입니다. 대회에서 가장 많이 쓰는 방법이고, 이 표는 그중 공식이 필요한 세 단계를 담고 있습니다.' },
      { q: '119개를 다 외워야 하나요?', a: '아닙니다. OLL은 두 번에 나눠 푸는 방법이 있어 열 개 남짓, PLL은 여섯 개만 알아도 풀립니다. F2L은 외우기보다 짝을 붙여 넣는 원리를 익히는 편이 빠릅니다. 표는 필요한 순간에 찾아보는 용도로 두세요.' },
      { q: '왜 같은 경우에 공식이 여럿인가요?', a: '같은 모양을 푸는 길은 여럿입니다. 손에 붙는 공식이 사람마다 달라서, 널리 쓰이는 것 하나씩만 실었습니다. 다른 공식을 쓰고 있다면 그것을 계속 쓰셔도 됩니다.' },
      { q: '그림이 내 큐브와 다르게 보입니다.', a: '큐브를 90도씩 돌려 가며 네 방향에서 보세요. 같은 경우도 어느 쪽을 앞으로 두느냐에 따라 다르게 보입니다. 공식을 걸기 전 윗면을 돌려 맞추는 것(AUF)도 잊지 마세요.' },
      { q: '이 표의 그림은 어디서 왔나요?', a: '적어 둔 것은 공식뿐입니다. 다 맞춘 큐브에 공식의 역순을 걸면 그 공식이 풀어야 할 모양이 나오는데, 그 결과를 그대로 그렸습니다. 그래서 그림과 공식이 어긋날 수 없습니다.' },
    ],
    [
      { q: 'What is CFOP?', a: 'It stands for Cross, First Two Layers, Orient Last Layer and Permute Last Layer — the method most competitors use. This page covers the three stages that need algorithms.' },
      { q: 'Do I have to learn all 119?', a: 'No. OLL can be done in two looks with about ten algorithms, and six are enough for PLL. F2L is better understood than memorised. Treat the table as something to look up when you get stuck.' },
      { q: 'Why does one case have several algorithms elsewhere?', a: 'There is more than one way to solve any shape, and which one flows best differs from hand to hand. Only one widely used algorithm is listed per case; if you already know another, keep it.' },
      { q: 'The picture does not look like my cube.', a: 'Turn the cube a quarter at a time and check all four sides — the same case looks different depending on which face you hold in front. Remember to align the top layer first.' },
      { q: 'Where do the diagrams come from?', a: 'Only the algorithms are stored. Playing an algorithm backwards on a solved cube produces exactly the case it solves, and that result is what gets drawn — so a picture cannot disagree with its algorithm.' },
    ],
    [
      { q: '¿Qué es el CFOP?', a: 'Son las siglas de Cross, First Two Layers, Orient Last Layer y Permute Last Layer, el método más usado en competición. Esta página cubre las tres etapas que necesitan algoritmos.' },
      { q: '¿Hay que aprenderse los 119?', a: 'No. El OLL puede hacerse en dos pasos con unos diez algoritmos, y seis bastan para el PLL. El F2L se entiende mejor de lo que se memoriza. Usa la tabla para consultar cuando te atasques.' },
      { q: '¿Por qué en otros sitios hay varios algoritmos por caso?', a: 'Hay más de una forma de resolver cada figura y cada mano prefiere una. Aquí va uno muy usado por caso; si ya conoces otro, quédate con el tuyo.' },
      { q: 'El dibujo no se parece a mi cubo.', a: 'Gira el cubo un cuarto cada vez y míralo por los cuatro lados: el mismo caso cambia según qué cara pongas delante. Y acuérdate de alinear antes la capa de arriba.' },
      { q: '¿De dónde salen los diagramas?', a: 'Solo se guardan los algoritmos. Ejecutar un algoritmo al revés sobre un cubo resuelto da exactamente el caso que resuelve, y eso es lo que se dibuja: la imagen no puede contradecir a su algoritmo.' },
    ],
    [
      { q: 'O que é CFOP?', a: 'É a sigla de Cross, First Two Layers, Orient Last Layer e Permute Last Layer, o método mais usado em competição. Esta página cobre as três etapas que precisam de algoritmos.' },
      { q: 'Preciso decorar os 119?', a: 'Não. O OLL dá para fazer em dois olhares com uns dez algoritmos, e seis bastam para o PLL. O F2L se entende melhor do que se decora. Use a tabela para consultar quando travar.' },
      { q: 'Por que em outros lugares há vários algoritmos por caso?', a: 'Há mais de um jeito de resolver cada figura, e cada mão prefere um. Aqui vai um bastante usado por caso; se você já sabe outro, fique com o seu.' },
      { q: 'O desenho não parece com o meu cubo.', a: 'Gire o cubo um quarto de cada vez e olhe pelos quatro lados: o mesmo caso muda conforme a face que fica na frente. E lembre de alinhar a camada de cima antes.' },
      { q: 'De onde vêm os diagramas?', a: 'Só os algoritmos ficam guardados. Rodar um algoritmo ao contrário num cubo resolvido dá exatamente o caso que ele resolve, e é isso que é desenhado — a figura não pode discordar do algoritmo.' },
    ],
    [
      { q: 'CFOPとは何ですか。', a: 'Cross・First Two Layers・Orient Last Layer・Permute Last Layer の頭文字で、大会でもっともよく使われる方法です。このページは手順が要る三段階を扱います。' },
      { q: '119種を全部覚える必要がありますか。', a: 'いいえ。OLLは二段階に分ければ十個ほど、PLLは六個でも解けます。F2Lは覚えるより組にして入れる考え方をつかむほうが早いです。表は詰まったときに引くものと考えてください。' },
      { q: 'ほかの表では同じ場合に手順がいくつも載っています。', a: '同じ形を解く道は一つではなく、手になじむ手順は人それぞれです。ここでは広く使われるものを一つずつ載せました。別の手順を使っているならそのままで構いません。' },
      { q: '図が自分のキューブと違って見えます。', a: 'キューブを90度ずつ回して四方向から見てください。同じ場合でも、どの面を手前にするかで違って見えます。手順の前に上面を合わせること（AUF）も忘れずに。' },
      { q: 'この図はどこから来たものですか。', a: '持っているのは手順だけです。そろったキューブに逆手順をかけると、その手順が解くべき形がそのまま現れます。それを描いているので、図と手順が食い違うことはありません。' },
    ],
    [
      { q: 'Was ist CFOP?', a: 'Die Abkürzung für Cross, First Two Layers, Orient Last Layer und Permute Last Layer — die im Wettkampf verbreitetste Methode. Diese Seite deckt die drei Stufen ab, die Algorithmen brauchen.' },
      { q: 'Muss ich alle 119 lernen?', a: 'Nein. OLL lässt sich in zwei Schritten mit rund zehn Algorithmen lösen, für PLL genügen sechs. F2L versteht man besser, als man es auswendig lernt. Die Tabelle ist zum Nachschlagen da.' },
      { q: 'Warum stehen anderswo mehrere Algorithmen pro Fall?', a: 'Es gibt mehr als einen Weg pro Figur, und welcher flüssig läuft, ist Handsache. Hier steht je ein verbreiteter; wer schon einen anderen kann, behält ihn.' },
      { q: 'Das Bild sieht anders aus als mein Würfel.', a: 'Drehen Sie den Würfel Viertel für Viertel und prüfen Sie alle vier Seiten — derselbe Fall wirkt je nach Vorderseite anders. Und richten Sie die obere Ebene vorher aus.' },
      { q: 'Woher stammen die Diagramme?', a: 'Gespeichert sind nur die Algorithmen. Rückwärts auf einem gelösten Würfel gespielt, ergibt ein Algorithmus genau seinen Fall — und der wird gezeichnet. Bild und Algorithmus können daher nicht auseinanderlaufen.' },
    ],
    [
      { q: 'Qu’est-ce que le CFOP ?', a: 'L’acronyme de Cross, First Two Layers, Orient Last Layer et Permute Last Layer, la méthode la plus répandue en compétition. Cette page couvre les trois étapes qui demandent des algorithmes.' },
      { q: 'Faut-il apprendre les 119 ?', a: 'Non. L’OLL se fait en deux temps avec une dizaine d’algorithmes, et six suffisent pour le PLL. Le F2L se comprend mieux qu’il ne se retient. Voyez le tableau comme un aide-mémoire.' },
      { q: 'Pourquoi trouve-t-on ailleurs plusieurs algorithmes par cas ?', a: 'Il existe plusieurs chemins pour une même figure, et celui qui coule bien dépend des mains. Un algorithme répandu est donné par cas ; si vous en connaissez un autre, gardez-le.' },
      { q: 'Le dessin ne ressemble pas à mon cube.', a: 'Tournez le cube d’un quart à la fois et regardez les quatre côtés : un même cas change selon la face placée devant. Pensez aussi à aligner la couronne du haut avant.' },
      { q: 'D’où viennent les schémas ?', a: 'Seuls les algorithmes sont enregistrés. Joué à l’envers sur un cube résolu, un algorithme fait apparaître exactement le cas qu’il résout, et c’est ce qui est dessiné — le dessin ne peut pas contredire l’algorithme.' },
    ],
    [
      { q: 'CFOP क्या है?', a: 'यह Cross, First Two Layers, Orient Last Layer और Permute Last Layer का संक्षेप है — प्रतियोगिताओं में सबसे प्रचलित तरीक़ा। यह पन्ना उन तीन चरणों को समेटता है जिनमें एल्गोरिद्म चाहिए।' },
      { q: 'क्या सभी 119 याद करने होंगे?', a: 'नहीं। OLL दो चरणों में लगभग दस एल्गोरिद्म से हो जाता है और PLL के लिए छह काफ़ी हैं। F2L रटने से बेहतर है समझना। तालिका को ज़रूरत पड़ने पर देखने के लिए रखें।' },
      { q: 'दूसरी जगहों पर एक ही मामले के कई एल्गोरिद्म क्यों हैं?', a: 'एक ही आकृति को हल करने के कई रास्ते हैं और किसे हाथ अच्छा लगता है यह अलग-अलग होता है। यहाँ हर मामले के लिए एक प्रचलित एल्गोरिद्म है; आप अपना जाना-पहचाना रख सकते हैं।' },
      { q: 'चित्र मेरे क्यूब जैसा नहीं दिखता।', a: 'क्यूब को चौथाई-चौथाई घुमाकर चारों ओर से देखिए — कौन-सी सतह सामने है इससे वही मामला अलग दिखता है। एल्गोरिद्म से पहले ऊपरी परत मिलाना न भूलें।' },
      { q: 'ये चित्र कहाँ से आए?', a: 'सिर्फ़ एल्गोरिद्म दर्ज हैं। हल किए क्यूब पर एल्गोरिद्म उल्टा चलाने से ठीक वही मामला बनता है जिसे वह हल करता है, और वही खींचा जाता है — इसलिए चित्र और एल्गोरिद्म कभी अलग नहीं हो सकते।' },
    ],
    [
      { q: 'CFOP 是什么？', a: '是十字（Cross）、下面两层（F2L）、顶面转成一色（OLL）、顶层归位（PLL）四个词的首字母。比赛里用得最多的方法，这份表收的就是其中需要背公式的三个阶段。' },
      { q: '119 条都得背下来吗？', a: '不用。OLL 有分两次做的办法，十来条就够；PLL 只记六条也能还原。F2L 与其背，不如把「配对塞槽」的道理弄通，反而更快。这份表当成随时来查的手册就好。' },
      { q: '同一种情形为什么有好几条公式？', a: '解同一个形状的路本来就不止一条。顺手的公式因人而异，所以每种情形只收了流传最广的一条。你手上已经在用别的公式，接着用就好。' },
      { q: '图和我的魔方看着不一样。', a: '把魔方每次转九十度，从四个方向都看一遍。同一种情形，把哪一面朝前，看上去就不一样。转公式之前先转顶面对齐侧面颜色（AUF），这一步也别忘。' },
      { q: '这份表的图是哪来的？', a: '记录下来的只有公式。在还原好的魔方上把公式倒着走一遍，得到的就是这条公式该解的形状，我们把那个结果原样画了下来。所以图和公式不可能对不上。' },
    ],
    [
      { q: 'CFOP 是什麼？', a: '是十字（Cross）、下面兩層（F2L）、頂面轉成一色（OLL）、頂層歸位（PLL）四個詞的首字母。比賽裡用得最多的方法，這份表收的就是其中需要背公式的三個階段。' },
      { q: '119 條都得背下來嗎？', a: '不用。OLL 有分兩次做的辦法，十來條就夠；PLL 只記六條也能還原。F2L 與其背，不如把「配對塞槽」的道理弄通，反而更快。這份表當成隨時來查的手冊就好。' },
      { q: '同一種情形為什麼有好幾條公式？', a: '解同一個形狀的路本來就不止一條。順手的公式因人而異，所以每種情形只收了流傳最廣的一條。你手上已經在用別的公式，接著用就好。' },
      { q: '圖和我的方塊看著不一樣。', a: '把方塊每次轉九十度，從四個方向都看一遍。同一種情形，把哪一面朝前，看上去就不一樣。轉公式之前先轉頂面對齊側面顏色（AUF），這一步也別忘。' },
      { q: '這份表的圖是哪來的？', a: '記錄下來的只有公式。在還原好的方塊上把公式倒著走一遍，得到的就是這條公式該解的形狀，我們把那個結果原樣畫了下來。所以圖和公式不可能對不上。' },
    ],
  ),

  caseFaq: T(
    (f: CaseFacts) => [
      { q: `${f.label} 공식이 무엇인가요?`, a: `${f.alg} 입니다. 모두 ${f.moves}수입니다.` },
      { q: '어떤 모양일 때 쓰나요?', a: `${SPEC.desc.ko(f)} 위 그림과 같은 모양이면 이 공식을 쓰면 됩니다.` },
      { q: '거꾸로 돌리면 어떻게 되나요?', a: '역순을 걸면 다 맞춘 큐브에서 이 경우가 만들어집니다. 연습할 모양을 만들 때 쓰면 편합니다.' },
      { q: '공식이 안 먹습니다.', a: '공식을 걸기 전에 윗면을 돌려 옆면 색을 맞춰야 합니다. 그래도 안 되면 큐브를 90도씩 돌려 네 방향에서 모양을 다시 견줘 보세요.' },
    ],
    (f: CaseFacts) => [
      { q: `What is the ${f.label} algorithm?`, a: `${f.alg} — ${f.moves} moves in all.` },
      { q: 'When do I use it?', a: `${SPEC.desc.en(f)} If your cube matches the picture above, this is the one.` },
      { q: 'What does running it backwards do?', a: 'Playing the reverse on a solved cube produces this case, which is a convenient way to set the position up for practice.' },
      { q: 'The algorithm is not working.', a: 'Turn the top layer first so the side colours line up, then start. If it still fails, rotate the cube a quarter at a time and compare the shape from all four sides.' },
    ],
    (f: CaseFacts) => [
      { q: `¿Cuál es el algoritmo ${f.label}?`, a: `${f.alg}: ${f.moves} movimientos en total.` },
      { q: '¿Cuándo se usa?', a: `${SPEC.desc.es(f)} Si tu cubo coincide con el dibujo de arriba, es este.` },
      { q: '¿Qué hace al revés?', a: 'Aplicar el inverso a un cubo resuelto crea este caso, algo cómodo para montar la posición y practicar.' },
      { q: 'El algoritmo no funciona.', a: 'Gira primero la capa superior para alinear los colores laterales. Si aun así falla, gira el cubo un cuarto cada vez y compara la figura desde los cuatro lados.' },
    ],
    (f: CaseFacts) => [
      { q: `Qual é o algoritmo ${f.label}?`, a: `${f.alg} — ${f.moves} movimentos ao todo.` },
      { q: 'Quando se usa?', a: `${SPEC.desc.pt(f)} Se o seu cubo bate com o desenho acima, é este.` },
      { q: 'O que ele faz ao contrário?', a: 'Aplicar o inverso num cubo resolvido cria este caso, o que é prático para montar a posição e treinar.' },
      { q: 'O algoritmo não funciona.', a: 'Gire primeiro a camada de cima para alinhar as cores laterais. Se ainda assim falhar, gire o cubo um quarto de cada vez e compare a figura pelos quatro lados.' },
    ],
    (f: CaseFacts) => [
      { q: `${f.label} の手順は何ですか。`, a: `${f.alg} です。全部で${f.moves}手です。` },
      { q: 'どんな形のときに使いますか。', a: `${SPEC.desc.ja(f)} 上の図と同じ形なら、この手順を使います。` },
      { q: '逆に回すとどうなりますか。', a: 'そろったキューブに逆手順をかけると、この場合が作れます。練習用に形を作るときに便利です。' },
      { q: '手順がうまくいきません。', a: 'まず上面を回して側面の色を合わせてから始めてください。それでも合わなければ、キューブを90度ずつ回して四方向から形を見比べてみてください。' },
    ],
    (f: CaseFacts) => [
      { q: `Wie lautet der Algorithmus ${f.label}?`, a: `${f.alg} — insgesamt ${f.moves} Züge.` },
      { q: 'Wann setze ich ihn ein?', a: `${SPEC.desc.de(f)} Passt Ihr Würfel zum Bild oben, ist es dieser.` },
      { q: 'Was bewirkt er rückwärts?', a: 'Rückwärts auf einem gelösten Würfel gespielt, stellt er genau diesen Fall her — praktisch, um die Stellung zum Üben aufzubauen.' },
      { q: 'Der Algorithmus geht nicht auf.', a: 'Erst die obere Ebene drehen, bis die Seitenfarben passen. Klappt es dann noch nicht, den Würfel Viertel für Viertel drehen und die Form von allen vier Seiten vergleichen.' },
    ],
    (f: CaseFacts) => [
      { q: `Quel est l’algorithme ${f.label} ?`, a: `${f.alg} — ${f.moves} mouvements en tout.` },
      { q: 'Quand l’utiliser ?', a: `${SPEC.desc.fr(f)} Si votre cube correspond au dessin ci-dessus, c’est celui-ci.` },
      { q: 'Que fait-il à l’envers ?', a: 'Joué à l’envers sur un cube résolu, il crée ce cas : pratique pour monter la position et s’entraîner.' },
      { q: 'L’algorithme ne marche pas.', a: 'Tournez d’abord la couronne du haut pour aligner les couleurs latérales. Si cela résiste, tournez le cube d’un quart à la fois et comparez la forme des quatre côtés.' },
    ],
    (f: CaseFacts) => [
      { q: `${f.label} का एल्गोरिद्म क्या है?`, a: `${f.alg} — कुल ${f.moves} चालें।` },
      { q: 'इसे कब इस्तेमाल करें?', a: `${SPEC.desc.hi(f)} अगर आपका क्यूब ऊपर के चित्र जैसा है तो यही है।` },
      { q: 'उल्टा चलाने पर क्या होता है?', a: 'हल किए क्यूब पर उल्टा चलाने से यही मामला बन जाता है — अभ्यास के लिए स्थिति बनाने में काम आता है।' },
      { q: 'एल्गोरिद्म काम नहीं कर रहा।', a: 'पहले ऊपरी परत घुमाकर बग़ल के रंग मिलाइए, फिर शुरू कीजिए। तब भी न बने तो क्यूब को चौथाई-चौथाई घुमाकर चारों ओर से आकृति मिलाइए।' },
    ],
    (f: CaseFacts) => [
      { q: `${f.label} 的公式是什么？`, a: `是 ${f.alg}，一共 ${f.moves} 步。` },
      { q: '什么形状的时候用它？', a: `${SPEC.desc.zh(f)} 顶面长得和上图一样，就用这条公式。` },
      { q: '倒着转会怎么样？', a: '在还原好的魔方上走一遍逆序，就能造出这种情形。想练某个形状时，这样最省事。' },
      { q: '公式转下来没效果。', a: '转公式之前得先转顶面，把侧面的颜色对齐。要是还不行，就把魔方每次转九十度，从四个方向重新比对一下形状。' },
    ],
    (f: CaseFacts) => [
      { q: `${f.label} 的公式是什麼？`, a: `是 ${f.alg}，一共 ${f.moves} 步。` },
      { q: '什麼形狀的時候用它？', a: `${SPEC.desc.tw(f)} 頂面長得和上圖一樣，就用這條公式。` },
      { q: '倒著轉會怎麼樣？', a: '在還原好的方塊上走一遍逆序，就能造出這種情形。想練某個形狀時，這樣最省事。' },
      { q: '公式轉下來沒效果。', a: '轉公式之前得先轉頂面，把側面的顏色對齊。要是還不行，就把方塊每次轉九十度，從四個方向重新比對一下形狀。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CUBE_UI: L<CubeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<CubeUI>;
