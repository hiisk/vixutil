/**
 * 2048 화면 문구의 열 언어 사전.
 *
 * 새 파일에 둔 이유는 둘이다. lib/game-ui-intl.ts는 이미 1,400줄이고
 * lib/game-more-ui.ts는 게임 여섯이 한 인터페이스를 나눠 쓰고 있어, 거기에
 * 칸을 더하면 열 언어 × 여섯 게임이 함께 흔들린다.
 *
 * 2048은 숫자만 쓰는 게임이라 번역할 것이 화면 문구뿐이다 — 판에는 옮길 낱말이
 * 하나도 없다. 그래서 사전이 작고, 작은 사전은 따로 두는 편이 읽기 쉽다.
 */
// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { GameLang } from './game-ui-intl.ts';

export interface Game2048Ui {
  /** 조작 설명 — 손가락과 키를 함께 적는다. 휴대폰이 대부분이다 */
  how: string;
  score: string;
  best: string;
  moves: string;
  newGame: string;
  undo: string;
  /** 2048을 만든 순간 */
  won: string;
  /** 2048 뒤에도 이어 둘 수 있다 */
  keepGoing: string;
  over: string;
  /** 판 아래 설명 카드 */
  note: string;
  /** 판의 aria-label — 화면 낱말이 없는 게임이라 이것만이라도 있어야 한다 */
  boardLabel: string;
}

export const GAME_2048_UI: Record<GameLang, Game2048Ui> = {
  ko: {
    how: '화살표 키·WASD·스와이프로 밀어 같은 수를 합치세요',
    score: '점수',
    best: '최고 점수',
    moves: '움직인 수',
    newGame: '새 판',
    undo: '한 수 되돌리기',
    won: '2048을 만들었습니다',
    keepGoing: '계속하기',
    over: '더 밀 곳이 없습니다',
    note: '한 번 밀 때 같은 칸은 한 번만 합쳐집니다 — 4·4·4·4를 밀면 8·8이 되고 16이 되지 않습니다. 안 움직이는 방향으로 밀어도 판이 그대로이고 새 타일이 생기지 않으니, 벽에 대고 눌러 판을 채울 수는 없습니다. 점수는 합쳐서 생긴 값의 합이고, 기록은 이 기기에만 남습니다.',
    boardLabel: '2048 판',
  },
  en: {
    how: 'Swipe, or use the arrow keys or WASD, to slide and merge matching numbers',
    score: 'Score',
    best: 'Best',
    moves: 'Moves',
    newGame: 'New game',
    undo: 'Undo one move',
    won: 'You made 2048',
    keepGoing: 'Keep going',
    over: 'No moves left',
    note: 'A tile merges only once per slide — 4·4·4·4 becomes 8·8, never 16. Sliding into a wall leaves the board as it was and spawns no tile, so you cannot fill the grid by pressing a dead direction. Your score is the sum of the tiles you made, and your best stays on this device.',
    boardLabel: '2048 board',
  },
  es: {
    how: 'Desliza el dedo, o usa las flechas o WASD, para juntar los números iguales',
    score: 'Puntos',
    best: 'Mejor',
    moves: 'Movimientos',
    newGame: 'Partida nueva',
    undo: 'Deshacer un movimiento',
    won: 'Has llegado a 2048',
    keepGoing: 'Seguir jugando',
    over: 'No quedan movimientos',
    note: 'Una ficha se junta una sola vez por movimiento: 4·4·4·4 da 8·8, nunca 16. Empujar contra la pared deja el tablero igual y no aparece ninguna ficha, así que no puedes llenarlo pulsando una dirección bloqueada. Los puntos son la suma de las fichas que has formado, y tu mejor marca se queda en este aparato.',
    boardLabel: 'Tablero de 2048',
  },
  'pt-br': {
    how: 'Deslize o dedo, ou use as setas ou WASD, para juntar os números iguais',
    score: 'Pontos',
    best: 'Melhor',
    moves: 'Jogadas',
    newGame: 'Novo jogo',
    undo: 'Desfazer uma jogada',
    won: 'Você chegou ao 2048',
    keepGoing: 'Continuar jogando',
    over: 'Sem jogadas possíveis',
    note: 'Uma peça se junta só uma vez por jogada: 4·4·4·4 vira 8·8, nunca 16. Empurrar contra a parede deixa o tabuleiro como estava e não cria peça nenhuma, então não dá para enchê-lo apertando uma direção travada. Os pontos são a soma das peças que você formou, e sua melhor marca fica neste aparelho.',
    boardLabel: 'Tabuleiro do 2048',
  },
  ja: {
    how: 'スワイプ、矢印キー、WASDで動かして同じ数字をくっつけます',
    score: 'スコア',
    best: '最高スコア',
    moves: '手数',
    newGame: '新しいゲーム',
    undo: '一手戻す',
    won: '2048を作りました',
    keepGoing: 'このまま続ける',
    over: '動かせる向きがありません',
    note: '一回の移動で同じマスがくっつくのは一度だけです — 4・4・4・4は8・8になり、16にはなりません。動かない向きに入力しても盤はそのままで新しいマスも出ないので、壁に押しつけて盤を埋めることはできません。スコアはくっつけて作った数の合計で、記録はこの端末に残ります。',
    boardLabel: '2048の盤',
  },
  de: {
    how: 'Wische, oder nimm die Pfeiltasten oder WASD, um gleiche Zahlen zusammenzuschieben',
    score: 'Punkte',
    best: 'Bestwert',
    moves: 'Züge',
    newGame: 'Neues Spiel',
    undo: 'Einen Zug zurück',
    won: 'Du hast 2048 geschafft',
    keepGoing: 'Weiterspielen',
    over: 'Kein Zug mehr möglich',
    note: 'Ein Feld verschmilzt pro Zug nur einmal — 4·4·4·4 wird 8·8, nie 16. Ein Zug gegen die Wand lässt das Brett unverändert und setzt kein neues Feld, du kannst es also nicht über eine blockierte Richtung füllen. Die Punkte sind die Summe der Felder, die du gebaut hast, und dein Bestwert bleibt auf diesem Gerät.',
    boardLabel: '2048-Brett',
  },
  fr: {
    how: 'Balaie l’écran, ou utilise les flèches ou WASD, pour réunir les mêmes nombres',
    score: 'Score',
    best: 'Meilleur',
    moves: 'Coups',
    newGame: 'Nouvelle partie',
    undo: 'Annuler un coup',
    won: 'Tu as atteint 2048',
    keepGoing: 'Continuer à jouer',
    over: 'Plus aucun coup possible',
    note: 'Une tuile ne fusionne qu’une fois par coup : 4·4·4·4 donne 8·8, jamais 16. Pousser contre le mur laisse la grille telle quelle et ne fait apparaître aucune tuile, donc impossible de la remplir avec une direction bloquée. Le score est la somme des tuiles que tu as formées, et ton meilleur score reste sur cet appareil.',
    boardLabel: 'Grille de 2048',
  },
  hi: {
    how: 'स्वाइप करें, या तीर कुंजियों या WASD से खिसकाकर एक जैसे अंक जोड़ें',
    score: 'अंक',
    best: 'सबसे अच्छा',
    moves: 'चालें',
    newGame: 'नया खेल',
    undo: 'एक चाल पीछे',
    won: 'आपने 2048 बना लिया',
    keepGoing: 'खेलते रहें',
    over: 'कोई चाल बची नहीं',
    note: 'एक बार खिसकाने में एक खाना सिर्फ़ एक बार जुड़ता है — 4·4·4·4 से 8·8 बनता है, 16 नहीं। जिस दिशा में कुछ नहीं हिलता, उधर खिसकाने पर बोर्ड वैसा ही रहता है और नया खाना भी नहीं आता, इसलिए रुकी हुई दिशा दबाकर बोर्ड भरा नहीं जा सकता। अंक उन खानों का जोड़ हैं जो आपने बनाए, और सबसे अच्छा अंक इसी उपकरण में रहता है।',
    boardLabel: '2048 का बोर्ड',
  },
  'zh-hans': {
    how: '滑动，或用方向键、WASD 推动，把相同的数字合起来',
    score: '分数',
    best: '最高分',
    moves: '步数',
    newGame: '新开一局',
    undo: '退回一步',
    won: '你做出了 2048',
    keepGoing: '继续玩',
    over: '没有可走的方向了',
    note: '一次推动中同一格只合并一次 — 4·4·4·4 推成 8·8，不会变成 16。往推不动的方向推，盘面不变，也不会出新格子，所以没法靠按死方向把盘面填满。分数是合出来的数字之和，最好成绩只留在这台设备上。',
    boardLabel: '2048 棋盘',
  },
  'zh-hant': {
    how: '滑動，或用方向鍵、WASD 推動，把相同的數字合起來',
    score: '分數',
    best: '最高分',
    moves: '步數',
    newGame: '新開一局',
    undo: '退回一步',
    won: '你做出了 2048',
    keepGoing: '繼續玩',
    over: '沒有可走的方向了',
    note: '一次推動中同一格只合併一次 — 4·4·4·4 推成 8·8，不會變成 16。往推不動的方向推，盤面不變，也不會出新格子，所以沒法靠按死方向把盤面填滿。分數是合出來的數字之和，最好成績只留在這台裝置上。',
    boardLabel: '2048 棋盤',
  },
};
