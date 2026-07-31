/**
 * 체스 오프닝 섹션의 화면 문구 — 열 언어.
 *
 * 문장에 들어가는 숫자·칸 이름은 `{n}`처럼 자리만 비워 두고 채운다. 함수를 넣으면
 * 서버 컴포넌트에서 클라이언트 컴포넌트로 넘길 수 없어서, 판을 한 수씩 넘겨 보는
 * 쪽에 문구를 못 준다.
 *
 * 하나·여럿을 가르는 언어가 있어서(1 move / 2 moves) `_one` 짝을 따로 둔다.
 * 첫 수 하나짜리 오프닝이 스무 개 넘으므로 이 자리는 늘 밟힌다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { Group } from './facts.ts';
import type { Trait } from './list.ts';

const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** `{n}` 자리를 채운다 */
export const fill = (tpl: string, vars: Record<string, string | number>): string =>
  tpl.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));

export interface ChessUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: string;
  metaDesc: string;
  byGroup: string;
  byFirstMove: string;
  countLabel: string;
  moves: string;
  movesOne: string;
  plyLabel: string;
  position: string;
  fen: string;
  turn: string;
  white: string;
  black: string;
  captures: string;
  capturesNone: string;
  centre: string;
  centreNone: string;
  castling: string;
  castlingNone: string;
  castlingBoth: string;
  rights: string;
  rightsNone: string;
  replies: string;
  developed: string;
  material: string;
  materialEven: string;
  check: string;
  mate: string;
  related: string;
  sharedWith: string;
  faq: string;
  hq1: string;
  ha1: string;
  hq2: string;
  ha2: string;
  hq3: string;
  ha3: string;
  q1: string;
  q2: string;
  q3: string;
  a3: string;
  step: string;
  stepHint: string;
  start: string;
  end: string;
  prev: string;
  next: string;
  boardAlt: string;
  movesTitle: string;
  movesNote: string;
  captureTag: string;
  castleTag: string;
  checkTag: string;
  piece: Record<string, string>;
  group: Record<Group, string>;
  groupNote: Record<Group, string>;
  trait: Record<Trait, string>;
}

const FLAT: Record<string, L<string>> = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('체스 오프닝', 'Chess Openings', 'Aperturas de ajedrez', 'Aberturas de xadrez', 'チェス・オープニング', 'Schacheröffnungen', "Ouvertures d'échecs", 'शतरंज ओपनिंग', '国际象棋开局', '西洋棋開局'),

  hubTitle: T(
    '체스 오프닝 {n}가지',
    '{n} Chess Openings',
    '{n} aperturas de ajedrez',
    '{n} aberturas de xadrez',
    'チェス・オープニング{n}種',
    '{n} Schacheröffnungen',
    "{n} ouvertures d'échecs",
    '{n} शतरंज ओपनिंग',
    '国际象棋开局{n}种',
    '西洋棋開局{n}種',
  ),
  hubLead: T(
    '적어 둔 것은 수순뿐입니다. 판 위의 자리도, 그림도, 어느 갈래에 드는지도 규칙대로 두어 본 결과입니다.',
    'Only the moves are written down. Every board, diagram and label below comes from actually playing those moves out.',
    'Aquí solo están escritas las jugadas. Cada posición, diagrama y etiqueta sale de jugarlas de verdad.',
    'Aqui só as jogadas estão escritas. Cada posição, diagrama e rótulo vem de jogá-las de verdade.',
    '書いてあるのは手順だけです。盤面も図も分類も、その手を実際に指した結果です。',
    'Aufgeschrieben sind nur die Züge. Jede Stellung, jedes Diagramm und jede Einordnung entsteht daraus, sie wirklich zu spielen.',
    "Seuls les coups sont écrits. Chaque position, chaque diagramme et chaque classement vient du fait de les jouer vraiment.",
    'यहाँ सिर्फ चालें लिखी हैं। हर स्थिति, आरेख और वर्ग उन्हीं चालों को असल में खेलकर निकला है।',
    '写下来的只有着法。下面的局面、棋图和分类，都是把这些着法真正走一遍得出的。',
    '寫下來的只有著法。下面的局面、棋圖和分類，都是把這些著法真正走一遍得出的。',
  ),
  hubMetaTitle: T(
    '체스 오프닝 {n}가지 — 수순과 판 그림',
    '{n} Chess Openings — Moves and Diagrams',
    '{n} aperturas de ajedrez — jugadas y diagramas',
    '{n} aberturas de xadrez — jogadas e diagramas',
    'チェス・オープニング{n}種 — 手順と盤面図',
    '{n} Schacheröffnungen — Züge und Diagramme',
    "{n} ouvertures d'échecs — coups et diagrammes",
    '{n} शतरंज ओपनिंग — चालें और आरेख',
    '国际象棋开局{n}种 — 着法与棋图',
    '西洋棋開局{n}種 — 著法與棋圖',
  ),
  hubMetaDesc: T(
    '시실리안·루이 로페즈·킹스 인디안 등 오프닝 {n}가지의 수순과 판 그림, 자리(FEN)를 한 곳에서 봅니다.',
    'Moves, board diagrams and FEN for {n} openings — Sicilian, Ruy Lopez, King’s Indian and more.',
    'Jugadas, diagramas y FEN de {n} aperturas: siciliana, española, india de rey y muchas más.',
    'Jogadas, diagramas e FEN de {n} aberturas: siciliana, espanhola, índia do rei e muitas mais.',
    'シシリアン、ルイ・ロペス、キングス・インディアンなどオープニング{n}種の手順・盤面図・FENをまとめて。',
    'Züge, Diagramme und FEN zu {n} Eröffnungen — Sizilianisch, Spanisch, Königsindisch und mehr.',
    "Coups, diagrammes et FEN de {n} ouvertures : sicilienne, espagnole, indienne du roi et bien d'autres.",
    '{n} ओपनिंग की चालें, बोर्ड आरेख और FEN — सिसिलियन, रुय लोपेज़, किंग्स इंडियन और बहुत कुछ।',
    '{n}种开局的着法、棋图与FEN：西西里、西班牙开局、王翼印度等等。',
    '{n}種開局的著法、棋圖與FEN：西西里、西班牙開局、王翼印度等等。',
  ),
  metaTitle: T('{name} 수순', '{name} moves', 'Jugadas de {name}', 'Jogadas de {name}', '{name}の手順', '{name} Züge', 'Coups de {name}', '{name} चालें', '{name}着法', '{name}著法'),
  metaDesc: T(
    '{name} — {line}. 판 그림과 자리(FEN), 다음 차례까지 한 장에 정리했습니다.',
    '{name} — {line}. Board diagram, FEN and whose move it is, all on one page.',
    '{name} — {line}. Diagrama, FEN y a quién le toca mover, todo en una página.',
    '{name} — {line}. Diagrama, FEN e de quem é a vez, tudo em uma página.',
    '{name} — {line}。盤面図とFEN、次の手番まで1ページにまとめました。',
    '{name} — {line}. Diagramm, FEN und Zugrecht auf einer Seite.',
    '{name} — {line}. Diagramme, FEN et trait, le tout sur une page.',
    '{name} — {line}। बोर्ड आरेख, FEN और किसकी चाल है — सब एक पेज पर।',
    '{name} — {line}。棋图、FEN 与轮到谁走，都在一页里。',
    '{name} — {line}。棋圖、FEN 與輪到誰走，都在一頁裡。',
  ),
  byGroup: T('갈래로 보기', 'By family', 'Por familia', 'Por família', '分類で見る', 'Nach Familie', 'Par famille', 'परिवार के अनुसार', '按大类', '按大類'),
  byFirstMove: T('첫 수로 보기', 'By first move', 'Por primera jugada', 'Por primeira jogada', '初手で見る', 'Nach erstem Zug', 'Par premier coup', 'पहली चाल के अनुसार', '按首着', '按首著'),
  countLabel: T('{n}가지', '{n} lines', '{n} líneas', '{n} linhas', '{n}種', '{n} Varianten', '{n} lignes', '{n} लाइनें', '{n}种', '{n}種'),

  plyLabel: T('수순 길이', 'Length', 'Longitud', 'Comprimento', '手数', 'Länge', 'Longueur', 'लंबाई', '手数', '手數'),
  moves: T('{n}수', '{n} moves', '{n} jugadas', '{n} jogadas', '{n}手', '{n} Züge', '{n} coups', '{n} चालें', '{n}手', '{n}手'),
  movesOne: T('{n}수', '{n} move', '{n} jugada', '{n} jogada', '{n}手', '{n} Zug', '{n} coup', '{n} चाल', '{n}手', '{n}手'),
  movesTitle: T('수순 풀이', 'Move by move', 'Jugada a jugada', 'Jogada a jogada', '手順の解説', 'Zug für Zug', 'Coup par coup', 'चाल दर चाल', '逐着解读', '逐著解讀'),
  movesNote: T(
    '어느 기물이 어디서 어디로 갔는지 한 수씩 적었습니다.',
    'Each move spelled out: which piece went from where to where.',
    'Cada jugada explicada: qué pieza fue de dónde a dónde.',
    'Cada jogada explicada: que peça foi de onde para onde.',
    'どの駒がどこからどこへ動いたかを一手ずつ書きました。',
    'Jeder Zug ausgeschrieben: welche Figur von wo nach wo ging.',
    'Chaque coup détaillé : quelle pièce est allée d’où à où.',
    'हर चाल विस्तार से — कौन सा मोहरा कहाँ से कहाँ गया।',
    '逐着写清楚：哪个子从哪里走到哪里。',
    '逐著寫清楚：哪個子從哪裡走到哪裡。',
  ),
  captureTag: T('잡기', 'capture', 'captura', 'captura', '取る', 'Schlag', 'prise', 'कटाई', '吃子', '吃子'),
  castleTag: T('캐슬링', 'castling', 'enroque', 'roque', 'キャスリング', 'Rochade', 'roque', 'कैसलिंग', '易位', '易位'),
  checkTag: T('장군', 'check', 'jaque', 'xeque', '王手', 'Schach', 'échec', 'शह', '将军', '將軍'),
  position: T('이 자리', 'The position', 'La posición', 'A posição', 'この局面', 'Die Stellung', 'La position', 'यह स्थिति', '这个局面', '這個局面'),
  fen: T('자리 표기(FEN)', 'FEN', 'FEN', 'FEN', 'FEN', 'FEN', 'FEN', 'FEN', 'FEN', 'FEN'),
  turn: T('다음 차례', 'To move', 'Juegan', 'Jogam', '手番', 'Am Zug', 'Trait', 'चाल किसकी', '轮到', '輪到'),
  white: T('백', 'White', 'Blancas', 'Brancas', '白', 'Weiß', 'Blancs', 'सफेद', '白方', '白方'),
  black: T('흑', 'Black', 'Negras', 'Pretas', '黒', 'Schwarz', 'Noirs', 'काला', '黑方', '黑方'),
  captures: T('기물 {n}개가 사라졌습니다.', '{n} pieces have left the board.', '{n} piezas han salido del tablero.', '{n} peças saíram do tabuleiro.', '駒が{n}個盤から消えています。', '{n} Figuren sind vom Brett verschwunden.', '{n} pièces ont quitté l’échiquier.', '{n} मोहरे बोर्ड से हट चुके हैं।', '已有{n}个子离开棋盘。', '已有{n}個子離開棋盤。'),
  capturesNone: T('아직 잡힌 기물이 없습니다.', 'Nothing has been captured yet.', 'Todavía no se ha capturado nada.', 'Ainda não houve capturas.', 'まだ駒は取られていません。', 'Noch wurde nichts geschlagen.', 'Rien n’a encore été capturé.', 'अभी तक कुछ नहीं काटा गया।', '目前还没有子被吃。', '目前還沒有子被吃。'),
  centre: T('중앙 네 칸 가운데 {sq}에 폰이 서 있습니다.', 'Of the four central squares, pawns stand on {sq}.', 'De las cuatro casillas centrales, hay peones en {sq}.', 'Das quatro casas centrais, há peões em {sq}.', '中央4マスのうち{sq}にポーンが立っています。', 'Von den vier Zentrumsfeldern stehen Bauern auf {sq}.', 'Sur les quatre cases centrales, des pions occupent {sq}.', 'चार केंद्रीय खानों में से {sq} पर प्यादे हैं।', '中心四格中，{sq}上有兵。', '中心四格中，{sq}上有兵。'),
  centreNone: T('중앙 네 칸에는 폰이 하나도 없습니다.', 'None of the four central squares holds a pawn.', 'Ninguna de las cuatro casillas centrales tiene un peón.', 'Nenhuma das quatro casas centrais tem peão.', '中央4マスにポーンは一つもありません。', 'Auf keinem der vier Zentrumsfelder steht ein Bauer.', 'Aucune des quatre cases centrales ne porte de pion.', 'चारों केंद्रीय खानों में कोई प्यादा नहीं है।', '中心四格上没有兵。', '中心四格上沒有兵。'),
  castling: T('{side}이(가) 캐슬링을 마쳤습니다.', '{side} has castled.', '{side} ya ha enrocado.', '{side} já rocou.', '{side}はキャスリングを済ませています。', '{side} hat rochiert.', '{side} a roqué.', '{side} कैसलिंग कर चुका है।', '{side}已完成王车易位。', '{side}已完成王車易位。'),
  castlingBoth: T('양쪽 모두 캐슬링을 마쳤습니다.', 'Both sides have castled.', 'Ambos bandos han enrocado.', 'Os dois lados já rocaram.', '両者ともキャスリング済みです。', 'Beide Seiten haben rochiert.', 'Les deux camps ont roqué.', 'दोनों पक्ष कैसलिंग कर चुके हैं।', '双方都已王车易位。', '雙方都已王車易位。'),
  castlingNone: T('아직 어느 쪽도 캐슬링하지 않았습니다.', 'Neither side has castled yet.', 'Ninguno de los dos bandos ha enrocado todavía.', 'Nenhum dos lados rocou ainda.', 'まだどちらもキャスリングしていません。', 'Noch hat keine Seite rochiert.', 'Aucun camp n’a encore roqué.', 'अभी किसी ने कैसलिंग नहीं की।', '双方都还没有王车易位。', '雙方都還沒有王車易位。'),
  rights: T('남은 캐슬링 권리', 'Castling rights left', 'Derechos de enroque', 'Direitos de roque', '残る城の権利', 'Verbliebene Rochaderechte', 'Droits de roque restants', 'बची कैसलिंग', '剩余易位权', '剩餘易位權'),
  rightsNone: T('없음', 'none', 'ninguno', 'nenhum', 'なし', 'keine', 'aucun', 'कोई नहीं', '无', '無'),
  replies: T('둘 수 있는 수', 'Legal replies', 'Jugadas legales', 'Jogadas legais', '指せる手', 'Mögliche Züge', 'Coups légaux', 'संभव चालें', '可走着法', '可走著法'),
  developed: T('나온 기물', 'Minor pieces out', 'Piezas menores fuera', 'Peças menores fora', '出た軽駒', 'Entwickelte Leichtfiguren', 'Pièces mineures sorties', 'निकले छोटे मोहरे', '已出动轻子', '已出動輕子'),
  material: T('기물 값', 'Material', 'Material', 'Material', '駒得', 'Material', 'Matériel', 'सामग्री', '子力', '子力'),
  materialEven: T('양쪽이 같습니다', 'level', 'igualado', 'igualado', '互角', 'ausgeglichen', 'égal', 'बराबर', '均等', '均等'),
  check: T('마지막 수는 장군입니다.', 'The last move gives check.', 'La última jugada da jaque.', 'A última jogada dá xeque.', '最後の手は王手です。', 'Der letzte Zug ist Schach.', 'Le dernier coup donne échec.', 'आखिरी चाल शह देती है।', '最后一着是将军。', '最後一著是將軍。'),
  mate: T('마지막 수로 메이트입니다 — 게임이 끝났습니다.', 'The last move is mate — the game is over.', 'La última jugada es mate: la partida termina.', 'A última jogada é mate: a partida acaba.', '最後の手でメイト、勝負あり。', 'Der letzte Zug ist matt — die Partie ist vorbei.', 'Le dernier coup est mat : la partie est finie.', 'आखिरी चाल मेट है — खेल खत्म।', '最后一着是将死，棋局结束。', '最後一著是將死，棋局結束。'),
  related: T('가까운 수순', 'Nearby lines', 'Líneas cercanas', 'Linhas próximas', '近い手順', 'Verwandte Varianten', 'Lignes voisines', 'मिलती-जुलती लाइनें', '相近着法', '相近著法'),
  sharedWith: T('앞 {n}수가 같습니다', 'first {n} moves shared', 'comparten las {n} primeras jugadas', 'compartilham as {n} primeiras jogadas', '最初の{n}手が同じ', 'die ersten {n} Züge sind gleich', '{n} premiers coups en commun', 'पहली {n} चालें समान', '前{n}手相同', '前{n}手相同'),
  faq: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'आम सवाल', '常见问题', '常見問題'),
  hq1: T(
    '오프닝이 모두 몇 가지인가요?',
    'How many openings are listed here?',
    '¿Cuántas aperturas hay aquí?',
    'Quantas aberturas há aqui?',
    'オープニングは全部でいくつありますか？',
    'Wie viele Eröffnungen sind hier aufgeführt?',
    'Combien d’ouvertures sont listées ici ?',
    'यहाँ कुल कितनी ओपनिंग हैं?',
    '这里一共收了多少种开局？',
    '這裡一共收了多少種開局？',
  ),
  ha1: T(
    '{n}가지입니다. 열린 게임 {open}, 반열린 게임 {semiopen}, 닫힌 게임 {closed}, 인디안 {indian}, 옆줄 {flank}가지로 나뉩니다.',
    '{n}. They split into {open} Open Games, {semiopen} Semi-Open Games, {closed} Closed Games, {indian} Indian Defences and {flank} Flank Openings.',
    '{n}. Se reparten en {open} juegos abiertos, {semiopen} semiabiertos, {closed} cerrados, {indian} defensas indias y {flank} aperturas de flanco.',
    '{n}. Dividem-se em {open} jogos abertos, {semiopen} semiabertos, {closed} fechados, {indian} defesas índias e {flank} aberturas de flanco.',
    '{n}種です。オープン{open}、セミオープン{semiopen}、クローズド{closed}、インディアン{indian}、フランク{flank}に分かれます。',
    '{n}. Sie verteilen sich auf {open} offene, {semiopen} halboffene, {closed} geschlossene Spiele, {indian} indische Verteidigungen und {flank} Flankeneröffnungen.',
    '{n}. Elles se répartissent en {open} jeux ouverts, {semiopen} semi-ouverts, {closed} fermés, {indian} défenses indiennes et {flank} ouvertures de flanc.',
    '{n}। इनमें {open} ओपन गेम, {semiopen} सेमी-ओपन, {closed} क्लोज्ड, {indian} इंडियन डिफेंस और {flank} फ्लैंक ओपनिंग हैं।',
    '共{n}种：开放性{open}、半开放{semiopen}、封闭性{closed}、印度防御{indian}、侧翼{flank}。',
    '共{n}種：開放性{open}、半開放{semiopen}、封閉性{closed}、印度防禦{indian}、側翼{flank}。',
  ),
  hq2: T(
    '갈래는 무엇을 보고 나누나요?',
    'What decides which family an opening goes into?',
    '¿Qué decide la familia de cada apertura?',
    'O que decide a família de cada abertura?',
    '分類は何を見て決まりますか？',
    'Wonach richtet sich die Einordnung?',
    'Qu’est-ce qui détermine la famille d’une ouverture ?',
    'ओपनिंग किस आधार पर परिवार में रखी जाती है?',
    '大类是按什么划分的？',
    '大類是按什麼劃分的？',
  ),
  ha2: T(
    '첫 두 수입니다. 1.e4 e5는 열린 게임, 1.e4의 다른 답은 반열린 게임, 1.d4 d5는 닫힌 게임, 1.d4 Nf6은 인디안, 나머지 첫 수는 옆줄입니다.',
    'The first two moves. 1.e4 e5 is an Open Game, other answers to 1.e4 are Semi-Open, 1.d4 d5 is Closed, 1.d4 Nf6 is an Indian Defence and any other first move is a Flank Opening.',
    'Las dos primeras jugadas. 1.e4 e5 es juego abierto; otras respuestas a 1.e4, semiabierto; 1.d4 d5, cerrado; 1.d4 Nf6, defensa india; y cualquier otra primera jugada, apertura de flanco.',
    'As duas primeiras jogadas. 1.e4 e5 é jogo aberto; outras respostas a 1.e4, semiaberto; 1.d4 d5, fechado; 1.d4 Nf6, defesa índia; e qualquer outra primeira jogada, abertura de flanco.',
    '最初の2手です。1.e4 e5 はオープン、1.e4 への他の応手はセミオープン、1.d4 d5 はクローズド、1.d4 Nf6 はインディアン、それ以外の初手はフランクです。',
    'Die ersten beiden Züge. 1.e4 e5 ist ein offenes Spiel, andere Antworten auf 1.e4 sind halboffen, 1.d4 d5 ist geschlossen, 1.d4 Nf6 ist indisch, jeder andere erste Zug ist eine Flankeneröffnung.',
    'Les deux premiers coups. 1.e4 e5 est un jeu ouvert, les autres réponses à 1.e4 sont semi-ouvertes, 1.d4 d5 est fermé, 1.d4 Nf6 est indien, et tout autre premier coup est une ouverture de flanc.',
    'पहली दो चालें। 1.e4 e5 ओपन गेम है, 1.e4 के अन्य जवाब सेमी-ओपन, 1.d4 d5 क्लोज्ड, 1.d4 Nf6 इंडियन डिफेंस, और बाकी पहली चालें फ्लैंक ओपनिंग।',
    '看前两手。1.e4 e5 是开放性开局，对 1.e4 的其他应法是半开放，1.d4 d5 是封闭性，1.d4 Nf6 是印度防御，其余首着都算侧翼开局。',
    '看前兩手。1.e4 e5 是開放性開局，對 1.e4 的其他應法是半開放，1.d4 d5 是封閉性，1.d4 Nf6 是印度防禦，其餘首著都算側翼開局。',
  ),
  hq3: T(
    '수순 표기는 어떻게 읽나요?',
    'How do I read the move notation?',
    '¿Cómo se lee la notación?',
    'Como se lê a notação?',
    '手順の表記はどう読みますか？',
    'Wie liest man die Zugnotation?',
    'Comment lire la notation des coups ?',
    'चाल का लेखन कैसे पढ़ें?',
    '着法记谱怎么读？',
    '著法記譜怎麼讀？',
  ),
  ha3: T(
    '기물 글자는 영어를 씁니다 — N 나이트, B 비숍, R 룩, Q 퀸, K 킹. 폰은 글자 없이 도착 칸만 적습니다. x는 잡는 수, O-O는 킹 쪽 캐슬링, O-O-O는 퀸 쪽, +는 장군, #는 메이트입니다.',
    'The piece letters are the English ones — N knight, B bishop, R rook, Q queen, K king. A pawn move is just the square. x means a capture, O-O is kingside castling, O-O-O queenside, + is check and # is mate.',
    'Las letras de las piezas son las inglesas: N caballo, B alfil, R torre, Q dama, K rey. Una jugada de peón es solo la casilla. x es captura, O-O enroque corto, O-O-O largo, + jaque y # mate.',
    'As letras das peças são as inglesas: N cavalo, B bispo, R torre, Q dama, K rei. Uma jogada de peão é só a casa. x é captura, O-O roque curto, O-O-O longo, + xeque e # mate.',
    '駒の文字は英語です — N ナイト、B ビショップ、R ルーク、Q クイーン、K キング。ポーンは行き先のマスだけ書きます。x は取る手、O-O はキングサイドのキャスリング、O-O-O はクイーンサイド、+ は王手、# はメイトです。',
    'Die Figurenbuchstaben sind die englischen: N Springer, B Läufer, R Turm, Q Dame, K König. Ein Bauernzug ist nur das Feld. x heißt Schlagen, O-O kurze Rochade, O-O-O lange, + Schach und # matt.',
    'Les lettres des pièces sont anglaises : N cavalier, B fou, R tour, Q dame, K roi. Un coup de pion n’indique que la case. x signifie une prise, O-O le petit roque, O-O-O le grand, + échec et # mat.',
    'मोहरों के अक्षर अंग्रेज़ी के हैं — N घोड़ा, B ऊँट, R हाथी, Q वज़ीर, K राजा। प्यादे की चाल में सिर्फ खाना लिखा जाता है। x कटाई, O-O छोटी कैसलिंग, O-O-O बड़ी, + शह और # मेट।',
    '子力字母用英文：N 马、B 象、R 车、Q 后、K 王。兵走子只写落点格。x 表示吃子，O-O 是王翼易位，O-O-O 是后翼易位，+ 是将军，# 是将死。',
    '子力字母用英文：N 馬、B 象、R 車、Q 后、K 王。兵走子只寫落點格。x 表示吃子，O-O 是王翼易位，O-O-O 是後翼易位，+ 是將軍，# 是將死。',
  ),
  q1: T('{name}의 수순은 무엇인가요?', 'What are the moves of {name}?', '¿Cuáles son las jugadas de {name}?', 'Quais são as jogadas de {name}?', '{name}の手順は？', 'Wie lauten die Züge von {name}?', 'Quels sont les coups de {name} ?', '{name} की चालें क्या हैं?', '{name}的着法是什么？', '{name}的著法是什麼？'),
  q2: T('어느 갈래에 드나요?', 'Which family does it belong to?', '¿A qué familia pertenece?', 'A que família pertence?', 'どの分類に入りますか？', 'Zu welcher Familie gehört sie?', 'À quelle famille appartient-elle ?', 'यह किस परिवार में आती है?', '它属于哪一大类？', '它屬於哪一大類？'),
  q3: T('다음은 누구 차례인가요?', 'Who is to move next?', '¿A quién le toca mover?', 'De quem é a vez?', '次はどちらの手番ですか？', 'Wer ist am Zug?', 'À qui est le trait ?', 'अगली चाल किसकी है?', '接下来轮到谁走？', '接下來輪到誰走？'),
  a3: T('{n}수까지 두면 {side} 차례입니다.', 'After {n} moves it is {side} to move.', 'Tras {n} jugadas, mueven {side}.', 'Após {n} jogadas, jogam {side}.', '{n}手まで指すと{side}の手番です。', 'Nach {n} Zügen ist {side} am Zug.', 'Après {n} coups, le trait est aux {side}.', '{n} चालों के बाद {side} की चाल है।', '走完{n}手后轮到{side}。', '走完{n}手後輪到{side}。'),
  step: T('한 수씩 보기', 'Step through', 'Paso a paso', 'Passo a passo', '一手ずつ見る', 'Zug für Zug', 'Coup par coup', 'एक-एक चाल', '逐着播放', '逐著播放'),
  stepHint: T('수를 눌러 그 자리로 갑니다.', 'Tap a move to jump to that position.', 'Toca una jugada para ir a esa posición.', 'Toque numa jogada para ir àquela posição.', '手をタップするとその局面に移ります。', 'Auf einen Zug tippen, um zu dieser Stellung zu springen.', 'Touchez un coup pour aller à cette position.', 'किसी चाल पर टैप करके उस स्थिति पर जाएँ।', '点一着即可跳到该局面。', '點一著即可跳到該局面。'),
  start: T('처음', 'Start', 'Inicio', 'Início', '最初', 'Anfang', 'Début', 'शुरू', '开始', '開始'),
  end: T('끝', 'End', 'Final', 'Fim', '最後', 'Ende', 'Fin', 'अंत', '结束', '結束'),
  prev: T('이전 수', 'Previous move', 'Jugada anterior', 'Jogada anterior', '前の手', 'Zug zurück', 'Coup précédent', 'पिछली चाल', '上一着', '上一著'),
  next: T('다음 수', 'Next move', 'Jugada siguiente', 'Próxima jogada', '次の手', 'Zug vor', 'Coup suivant', 'अगली चाल', '下一着', '下一著'),
  boardAlt: T('{name}의 판', 'Board after {name}', 'Tablero de {name}', 'Tabuleiro de {name}', '{name}の盤面', 'Stellung nach {name}', 'Échiquier de {name}', '{name} का बोर्ड', '{name}的局面', '{name}的局面'),
};

const PIECE: Record<string, L<string>> = {
  P: T('폰', 'Pawn', 'Peón', 'Peão', 'ポーン', 'Bauer', 'Pion', 'प्यादा', '兵', '兵'),
  N: T('나이트', 'Knight', 'Caballo', 'Cavalo', 'ナイト', 'Springer', 'Cavalier', 'घोड़ा', '马', '馬'),
  B: T('비숍', 'Bishop', 'Alfil', 'Bispo', 'ビショップ', 'Läufer', 'Fou', 'ऊँट', '象', '象'),
  R: T('룩', 'Rook', 'Torre', 'Torre', 'ルーク', 'Turm', 'Tour', 'हाथी', '车', '車'),
  Q: T('퀸', 'Queen', 'Dama', 'Dama', 'クイーン', 'Dame', 'Dame', 'वज़ीर', '后', '后'),
  K: T('킹', 'King', 'Rey', 'Rei', 'キング', 'König', 'Roi', 'राजा', '王', '王'),
};

const GROUP: Record<Group, L<string>> = {
  open: T('열린 게임', 'Open Game', 'Juego abierto', 'Jogo aberto', 'オープンゲーム', 'Offene Spiele', 'Jeu ouvert', 'ओपन गेम', '开放性开局', '開放性開局'),
  semiopen: T('반열린 게임', 'Semi-Open Game', 'Juego semiabierto', 'Jogo semiaberto', 'セミオープンゲーム', 'Halboffene Spiele', 'Jeu semi-ouvert', 'सेमी-ओपन गेम', '半开放开局', '半開放開局'),
  closed: T('닫힌 게임', 'Closed Game', 'Juego cerrado', 'Jogo fechado', 'クローズドゲーム', 'Geschlossene Spiele', 'Jeu fermé', 'क्लोज्ड गेम', '封闭性开局', '封閉性開局'),
  indian: T('인디안 디펜스', 'Indian Defence', 'Defensas indias', 'Defesas índias', 'インディアン・ディフェンス', 'Indische Verteidigungen', 'Défenses indiennes', 'इंडियन डिफेंस', '印度防御', '印度防禦'),
  flank: T('옆줄 오프닝', 'Flank Opening', 'Aperturas de flanco', 'Aberturas de flanco', 'フランク・オープニング', 'Flankeneröffnungen', 'Ouvertures de flanc', 'फ्लैंक ओपनिंग', '侧翼开局', '側翼開局'),
};

const GROUP_NOTE: Record<Group, L<string>> = {
  open: T(
    '1.e4에 흑이 1…e5로 맞선 자리에서 갈라져 나옵니다.',
    'Everything that starts 1.e4 e5.',
    'Todo lo que empieza con 1.e4 e5.',
    'Tudo o que começa com 1.e4 e5.',
    '1.e4 e5 で始まる手順です。',
    'Alles, was mit 1.e4 e5 beginnt.',
    'Tout ce qui commence par 1.e4 e5.',
    'वह सब जो 1.e4 e5 से शुरू होता है।',
    '以 1.e4 e5 开始的着法。',
    '以 1.e4 e5 開始的著法。',
  ),
  semiopen: T(
    '1.e4에 흑이 e5가 아닌 다른 수로 답한 갈래입니다.',
    '1.e4 met by anything other than 1…e5.',
    '1.e4 respondido con algo que no sea 1…e5.',
    '1.e4 respondido com algo que não seja 1…e5.',
    '1.e4 に e5 以外で応じた手順です。',
    '1.e4 mit etwas anderem als 1…e5 beantwortet.',
    '1.e4 auquel on répond autrement que par 1…e5.',
    '1.e4 का जवाब 1…e5 के अलावा किसी और चाल से।',
    '对 1.e4 以 e5 之外的着法应对。',
    '對 1.e4 以 e5 之外的著法應對。',
  ),
  closed: T(
    '1.d4 d5로 서로 퀸 쪽 폰을 맞댄 자리입니다.',
    '1.d4 d5, queen’s pawns facing each other.',
    '1.d4 d5, con los peones de dama frente a frente.',
    '1.d4 d5, com os peões da dama frente a frente.',
    '1.d4 d5 とクイーン側のポーンが向き合う形です。',
    '1.d4 d5 — die Damenbauern stehen sich gegenüber.',
    '1.d4 d5, les pions dame face à face.',
    '1.d4 d5 — दोनों वज़ीर-प्यादे आमने-सामने।',
    '1.d4 d5，双方后翼兵对峙。',
    '1.d4 d5，雙方後翼兵對峙。',
  ),
  indian: T(
    '1.d4에 흑이 1…Nf6으로 답하고 중앙을 나중에 치는 갈래입니다.',
    '1.d4 Nf6, hitting the centre later instead of occupying it now.',
    '1.d4 Nf6: se golpea el centro más tarde en vez de ocuparlo ya.',
    '1.d4 Nf6: o centro é atacado depois, em vez de ocupado agora.',
    '1.d4 Nf6 と応じ、中央は後から攻める手順です。',
    '1.d4 Nf6 — das Zentrum wird später angegriffen statt sofort besetzt.',
    '1.d4 Nf6 : on frappe le centre plus tard au lieu de l’occuper tout de suite.',
    '1.d4 Nf6 — केंद्र पर तुरंत कब्ज़ा नहीं, बाद में हमला।',
    '1.d4 Nf6，不急于占据中心，稍后再攻。',
    '1.d4 Nf6，不急於佔據中心，稍後再攻。',
  ),
  flank: T(
    'e4·d4가 아닌 첫 수로 시작하거나 옆줄에서 중앙을 노립니다.',
    'First moves other than e4 and d4, aiming at the centre from the wing.',
    'Primeras jugadas distintas de e4 y d4, apuntando al centro desde el flanco.',
    'Primeiras jogadas diferentes de e4 e d4, mirando o centro pelo flanco.',
    'e4・d4 以外の初手で、側面から中央を狙います。',
    'Andere erste Züge als e4 und d4 — das Zentrum wird vom Flügel her angegriffen.',
    'Premiers coups autres que e4 et d4, visant le centre depuis l’aile.',
    'e4 और d4 के अलावा पहली चालें — केंद्र पर किनारे से निशाना।',
    '首着不是 e4 或 d4，从侧翼牵制中心。',
    '首著不是 e4 或 d4，從側翼牽制中心。',
  ),
};

const TRAIT: Record<Trait, L<string>> = {
  'center-grab': T(
    '첫 수부터 폰으로 중앙을 차지합니다.',
    'A pawn takes the centre from the very first move.',
    'Un peón ocupa el centro desde la primera jugada.',
    'Um peão ocupa o centro desde a primeira jogada.',
    '初手からポーンで中央を取ります。',
    'Schon der erste Zug besetzt mit einem Bauern das Zentrum.',
    'Dès le premier coup, un pion occupe le centre.',
    'पहली ही चाल से प्यादा केंद्र ले लेता है।',
    '首着就用兵占据中心。',
    '首著就用兵佔據中心。',
  ),
  'counter-flank': T(
    '중앙을 똑같이 맞받지 않고 옆에서 겨눕니다.',
    'Instead of copying the centre, the reply comes from the side.',
    'En vez de imitar el centro, la respuesta llega desde el flanco.',
    'Em vez de imitar o centro, a resposta vem pelo flanco.',
    '中央を同じ形で受けず、側面から狙います。',
    'Statt das Zentrum zu spiegeln, kommt die Antwort von der Seite.',
    'Plutôt que d’imiter le centre, la réponse vient du côté.',
    'केंद्र की नकल के बजाय जवाब किनारे से आता है।',
    '不与中心正面对称，而从侧翼牵制。',
    '不與中心正面對稱，而從側翼牽制。',
  ),
  fianchetto: T(
    '비숍을 옆줄에 세워 긴 대각선을 잡습니다.',
    'A bishop goes to the side square and takes the long diagonal.',
    'Un alfil va a la casilla lateral y toma la diagonal larga.',
    'Um bispo vai à casa lateral e toma a diagonal longa.',
    'ビショップを端に置いて長い斜筋を押さえます。',
    'Ein Läufer geht auf das Flankenfeld und übernimmt die lange Diagonale.',
    'Un fou gagne la case de flanc et prend la grande diagonale.',
    'ऊँट किनारे के खाने पर जाकर लंबी विकर्ण संभालता है।',
    '象走到侧翼格，控制长斜线。',
    '象走到側翼格，控制長斜線。',
  ),
  'pawn-sac': T(
    '폰 하나를 내주고 그만큼 빠르게 기물을 냅니다.',
    'One pawn is given up to bring the pieces out faster.',
    'Se entrega un peón para sacar las piezas más rápido.',
    'Entrega-se um peão para desenvolver as peças mais rápido.',
    'ポーンを一つ与えて、その分だけ駒を早く出します。',
    'Ein Bauer wird geopfert, um die Figuren schneller zu entwickeln.',
    'On abandonne un pion pour sortir les pièces plus vite.',
    'एक प्यादा देकर मोहरे तेज़ी से निकाले जाते हैं।',
    '弃一个兵，换取更快的出子。',
    '棄一個兵，換取更快的出子。',
  ),
  solid: T(
    '튼튼하게 막고 상대가 무리하기를 기다립니다.',
    'A sturdy set-up that waits for the opponent to overreach.',
    'Un esquema sólido que espera a que el rival se pase de la raya.',
    'Um esquema sólido que espera o adversário exagerar.',
    '堅く受けて、相手の無理を待ちます。',
    'Ein solider Aufbau, der auf das Übermaß des Gegners wartet.',
    'Une structure solide qui attend que l’adversaire en fasse trop.',
    'मज़बूत ढाँचा, जो विरोधी की जल्दबाज़ी का इंतज़ार करता है।',
    '结构稳固，等对手走过头。',
    '結構穩固，等對手走過頭。',
  ),
  sharp: T(
    '초반부터 서로의 왕을 노려 한 수 실수가 곧바로 갈립니다.',
    'Both kings come under fire early, so one slip decides it.',
    'Los dos reyes quedan expuestos pronto: un desliz decide.',
    'Os dois reis ficam expostos cedo: um deslize decide.',
    '早くから両者の王を狙い合い、一手のミスで決まります。',
    'Beide Könige geraten früh unter Feuer — ein Fehler entscheidet.',
    'Les deux rois sont visés tôt : un seul faux pas décide.',
    'दोनों राजा जल्दी निशाने पर आते हैं, एक गलती भारी पड़ती है।',
    '双方王早早受攻，一步之差就定胜负。',
    '雙方王早早受攻，一步之差就定勝負。',
  ),
  space: T(
    '폰을 앞으로 밀어 상대가 설 자리를 좁힙니다.',
    'Pawns push forward and take room away from the opponent.',
    'Los peones avanzan y le quitan espacio al rival.',
    'Os peões avançam e tiram espaço do adversário.',
    'ポーンを前に進めて相手の場所を狭めます。',
    'Die Bauern rücken vor und nehmen dem Gegner Raum.',
    'Les pions avancent et ôtent de l’espace à l’adversaire.',
    'प्यादे आगे बढ़कर विरोधी की जगह छीनते हैं।',
    '兵向前推进，压缩对手空间。',
    '兵向前推進，壓縮對手空間。',
  ),
  symmetry: T(
    '양쪽이 같은 모양으로 시작해 먼저 어긋나는 쪽이 부담을 집니다.',
    'Both sides start with the same shape, so whoever breaks it first carries the risk.',
    'Ambos empiezan con la misma forma: quien la rompa primero asume el riesgo.',
    'Os dois começam com a mesma forma: quem quebrar primeiro assume o risco.',
    '両者が同じ形で始まり、先に形を崩した側が負担を背負います。',
    'Beide beginnen gleich — wer zuerst ausbricht, trägt das Risiko.',
    'Les deux camps partent de la même forme : celui qui rompt en premier prend le risque.',
    'दोनों एक जैसी शक्ल से शुरू करते हैं; जो पहले तोड़े, जोखिम उसी का।',
    '双方形状相同，先打破的一方承担风险。',
    '雙方形狀相同，先打破的一方承擔風險。',
  ),
  setup: T(
    '상대가 무엇을 두든 같은 모양을 만들어 갑니다.',
    'The same set-up is played whatever the opponent does.',
    'Se juega el mismo esquema haga lo que haga el rival.',
    'Joga-se o mesmo esquema faça o que fizer o adversário.',
    '相手が何を指しても同じ形に組みます。',
    'Derselbe Aufbau wird gespielt, egal was der Gegner tut.',
    'On joue la même structure quoi que fasse l’adversaire.',
    'विरोधी कुछ भी खेले, वही ढाँचा बनता है।',
    '无论对手怎么走，都摆同样的阵形。',
    '無論對手怎麼走，都擺同樣的陣形。',
  ),
  'piece-play': T(
    '폰보다 기물을 앞세워 빈칸을 먼저 잡습니다.',
    'Pieces, not pawns, are the ones that take the open squares.',
    'Son las piezas, no los peones, las que ocupan las casillas libres.',
    'São as peças, não os peões, que ocupam as casas livres.',
    'ポーンより駒を先に出して空きマスを押さえます。',
    'Nicht Bauern, sondern Figuren besetzen die freien Felder.',
    'Ce sont les pièces, pas les pions, qui prennent les cases libres.',
    'प्यादों से पहले मोहरे खाली खाने घेरते हैं।',
    '让子力而非兵去占据空格。',
    '讓子力而非兵去佔據空格。',
  ),
  'king-attack': T(
    '계획이 처음부터 상대 왕을 향합니다.',
    'The plan points straight at the enemy king.',
    'El plan apunta directo al rey contrario.',
    'O plano aponta direto ao rei adversário.',
    '狙いは最初から相手の王です。',
    'Der Plan zielt direkt auf den feindlichen König.',
    'Le plan vise droit le roi adverse.',
    'योजना सीधे विरोधी राजा पर है।',
    '计划从一开始就对准对方王。',
    '計劃從一開始就對準對方王。',
  ),
  trap: T(
    '자연스러워 보이는 답수가 곧바로 함정에 걸립니다.',
    'A natural-looking reply walks straight into a prepared trick.',
    'Una respuesta que parece natural cae en la trampa preparada.',
    'Uma resposta que parece natural cai na armadilha preparada.',
    '自然に見える応手がそのまま罠にかかります。',
    'Eine natürlich wirkende Antwort läuft direkt in die vorbereitete Falle.',
    'Une réponse d’apparence naturelle tombe droit dans le piège.',
    'स्वाभाविक दिखने वाला जवाब सीधे जाल में फँसता है।',
    '看似自然的应手正好落入陷阱。',
    '看似自然的應手正好落入陷阱。',
  ),
  endgame: T(
    '일찍 큰 기물을 바꾸고 끝내기 쪽으로 끌고 갑니다.',
    'Big pieces come off early and the game heads for an endgame.',
    'Las piezas mayores se cambian pronto y la partida va al final.',
    'As peças maiores saem cedo e a partida vai para o final.',
    '早めに大駒を交換して終盤に持ち込みます。',
    'Die schweren Figuren gehen früh vom Brett, es geht ins Endspiel.',
    'Les pièces lourdes s’échangent tôt et la partie va vers la finale.',
    'बड़े मोहरे जल्दी कटते हैं और खेल अंत की ओर जाता है।',
    '大子早早交换，走向残局。',
    '大子早早交換，走向殘局。',
  ),
  hypermodern: T(
    '중앙을 일부러 내주고 멀리서 두들깁니다.',
    'The centre is handed over on purpose and shot at from a distance.',
    'Se cede el centro a propósito para atacarlo desde lejos.',
    'Cede-se o centro de propósito para atacá-lo de longe.',
    'あえて中央を渡し、遠くから叩きます。',
    'Das Zentrum wird bewusst überlassen und aus der Ferne beschossen.',
    'On cède le centre exprès pour le bombarder de loin.',
    'केंद्र जानबूझकर छोड़कर दूर से हमला किया जाता है।',
    '故意让出中心，再从远处打击。',
    '故意讓出中心，再從遠處打擊。',
  ),
  closed: T(
    '폰끼리 맞물려 길이 막히고 승부가 길어집니다.',
    'Pawns lock into each other, the lines shut and the game runs long.',
    'Los peones se traban, las líneas se cierran y la partida se alarga.',
    'Os peões travam, as linhas fecham e a partida se alonga.',
    'ポーンが噛み合って道が塞がり、長い勝負になります。',
    'Die Bauern verzahnen sich, die Linien schließen sich, die Partie wird lang.',
    'Les pions se bloquent, les lignes se ferment et la partie s’allonge.',
    'प्यादे आपस में फँस जाते हैं, रास्ते बंद और खेल लंबा।',
    '兵链互相咬住，通路封闭，棋局拖长。',
    '兵鏈互相咬住，通路封閉，棋局拖長。',
  ),
  'open-lines': T(
    '중앙 폰이 일찍 사라져 길이 활짝 열립니다.',
    'Central pawns disappear early and the lines swing open.',
    'Los peones centrales desaparecen pronto y las líneas se abren.',
    'Os peões centrais somem cedo e as linhas se abrem.',
    '中央のポーンが早く消えて道が大きく開きます。',
    'Die Zentrumsbauern verschwinden früh, die Linien öffnen sich weit.',
    'Les pions centraux disparaissent tôt et les lignes s’ouvrent.',
    'केंद्रीय प्यादे जल्दी हट जाते हैं और रास्ते खुल जाते हैं।',
    '中心兵早早消失，通路大开。',
    '中心兵早早消失，通路大開。',
  ),
  offbeat: T(
    '잘 두지 않는 수라 준비해 온 상대를 만나기 어렵습니다.',
    'Rarely played, so a well-prepared opponent is rare too.',
    'Poco jugada, así que rara vez el rival la trae preparada.',
    'Pouco jogada, então raramente o adversário vem preparado.',
    'あまり指されないため、準備してきた相手に当たりにくいです。',
    'Selten gespielt — entsprechend selten ist ein vorbereiteter Gegner.',
    'Rarement jouée, donc rarement un adversaire préparé.',
    'कम खेली जाती है, इसलिए तैयारी वाला विरोधी भी कम मिलता है।',
    '很少有人下，遇到有备而来的对手也少。',
    '很少有人下，遇到有備而來的對手也少。',
  ),
  classical: T(
    '오래전부터 두어 온 정통 수순입니다.',
    'One of the oldest and most trodden paths in the game.',
    'Uno de los caminos más antiguos y transitados del ajedrez.',
    'Um dos caminhos mais antigos e trilhados do xadrez.',
    '古くから指され続けてきた正統な手順です。',
    'Einer der ältesten und meistbegangenen Wege des Spiels.',
    'L’un des chemins les plus anciens et les plus battus du jeu.',
    'खेल के सबसे पुराने और सबसे चले हुए रास्तों में से एक।',
    '棋史上最古老、走得最多的路线之一。',
    '棋史上最古老、走得最多的路線之一。',
  ),
  flexible: T(
    '수순을 늦춰 어느 모양으로도 갈 수 있게 열어 둡니다.',
    'The move order is kept loose so several set-ups stay available.',
    'El orden de jugadas se deja abierto para elegir esquema más tarde.',
    'A ordem das jogadas fica solta para escolher o esquema depois.',
    '手順を急がず、どの形にも進めるようにしておきます。',
    'Die Zugfolge bleibt offen, mehrere Aufbauten bleiben möglich.',
    'L’ordre des coups reste souple : plusieurs structures restent possibles.',
    'चालों का क्रम खुला रखा जाता है ताकि कई ढाँचे संभव रहें।',
    '着法次序保留弹性，多种阵形都还可选。',
    '著法次序保留彈性，多種陣形都還可選。',
  ),
  'sacrifice-mate': T(
    '기물을 던져 몇 수 만에 메이트를 노립니다.',
    'A piece is thrown in to reach mate within a few moves.',
    'Se entrega una pieza para dar mate en pocas jugadas.',
    'Entrega-se uma peça para dar mate em poucas jogadas.',
    '駒を捨てて数手でメイトを狙います。',
    'Eine Figur wird geopfert, um in wenigen Zügen matt zu setzen.',
    'On sacrifie une pièce pour mater en quelques coups.',
    'कुछ ही चालों में मेट के लिए मोहरा दिया जाता है।',
    '弃子求几步内将死。',
    '棄子求幾步內將死。',
  ),
};

const invert = <T,>(spec: Record<string, L<T>>): L<Record<string, T>> =>
  Object.fromEntries(
    LANG_CODES.map(lang => [lang, Object.fromEntries(Object.entries(spec).map(([k, v]) => [k, v[lang]]))]),
  ) as L<Record<string, T>>;

const flat = invert(FLAT);
const group = invert(GROUP as unknown as Record<string, L<string>>);
const groupNote = invert(GROUP_NOTE as unknown as Record<string, L<string>>);
const trait = invert(TRAIT as unknown as Record<string, L<string>>);
const piece = invert(PIECE);

export const CHESS_UI: L<ChessUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    {
      ...flat[lang],
      piece: piece[lang],
      group: group[lang],
      groupNote: groupNote[lang],
      trait: trait[lang],
    },
  ]),
) as unknown as L<ChessUI>;

export const chessUi = (lang: Lang): ChessUI => CHESS_UI[lang];
