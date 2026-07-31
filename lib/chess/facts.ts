/**
 * 오프닝 한 줄에서 나오는 것들 — 전부 수순을 두어 본 결과다.
 *
 * 자리·그림·잡은 기물 수·캐슬링 권리·중앙 폰은 적지 않는다. 적으면 틀려도
 * 모르지만, 두어 보고 세면 수순이 틀렸을 때 예외가 난다.
 */
import {
  fenOf, idx, inCheck, isMate, legalMoves, material, numbered,
  pieceCount, play, sqName, type Color,
} from './engine.ts';
import { FAMILY_TRAITS, OPENINGS, type Opening, type Trait } from './list.ts';

/** 첫 두 수로 갈리는 큰 갈래 — ECO의 A~E와 같은 나눔이다 */
export type Group = 'open' | 'semiopen' | 'closed' | 'indian' | 'flank';

/** 한 수를 말로 풀 때 필요한 것 — 어느 쪽이 무엇을 어디서 어디로 */
export interface Step {
  /** 수 번호 */
  no: number;
  side: Color;
  san: string;
  /** 기물 종류 — P N B R Q K */
  piece: string;
  from: string;
  to: string;
  capture: boolean;
  castle: boolean;
  check: boolean;
}

export interface OpeningFacts {
  slug: string;
  /** 둔 수의 개수(반수) */
  ply: number;
  /** 마지막 수의 수 번호 */
  moveNo: number;
  /** 다음에 둘 쪽 */
  turn: Color;
  /** 장군 표시까지 붙은 표기 */
  san: string[];
  /** "1.e4 c5 2.Nf3" */
  line: string;
  fen: string;
  /** 64글자 — 빈 칸은 점이다. 그림이 그대로 읽는다 */
  board: string;
  /** 각 수를 둔 뒤의 판. 클라이언트로 넘어가므로 짧은 글자열로 둔다 */
  frames: string[];
  group: Group;
  /** 백의 첫 수 */
  first: string;
  /** 여태 잡힌 기물 수 */
  captures: number;
  /** 폰을 1로 센 기물 값 */
  material: { w: number; b: number };
  /** 중앙 네 칸(d4·e4·d5·e5) 중 폰이 선 칸 */
  centre: string[];
  castled: { w: boolean; b: boolean };
  /** 남은 캐슬링 권리 */
  rights: string;
  check: boolean;
  mate: boolean;
  /** 처음 자리를 떠난 나이트·비숍의 수 */
  developed: { w: number; b: number };
  traits: [Trait, Trait];
  /** 앞수를 가장 많이 나눠 갖는 다른 오프닝 */
  siblings: string[];
  /** 그 형제와 갈라지는 지점까지의 수 */
  sharedPly: number;
  /** 지금 자리에서 둘 수 있는 수의 가짓수 */
  replies: number;
  /** 수마다의 풀이 자료 */
  steps: Step[];
}

const HOME_MINORS: Record<Color, number[]> = {
  w: [idx(1, 1), idx(2, 1), idx(5, 1), idx(6, 1)],
  b: [idx(1, 8), idx(2, 8), idx(5, 8), idx(6, 8)],
};

const CENTRE = [idx(3, 4), idx(4, 4), idx(3, 5), idx(4, 5)];

/**
 * 첫 두 수로 갈래를 정한다.
 *
 * 1.e4 e5는 열린 게임, 1.e4 그 밖은 반쯤 열린 게임, 1.d4 d5는 닫힌 게임,
 * 1.d4 Nf6은 인디안, 나머지는 옆줄이다. 오래 쓰인 나눔이라 어느 언어의 책에도
 * 같은 다섯 갈래가 있다.
 */
export function groupOf(moves: string[]): Group {
  const [first, second] = moves;
  if (first === 'e4') return second === 'e5' ? 'open' : second ? 'semiopen' : 'open';
  if (first === 'd4') {
    if (second === 'd5') return 'closed';
    if (second === 'Nf6') return 'indian';
    return second ? 'flank' : 'closed';
  }
  return 'flank';
}

/** 처음 자리를 떠난 나이트·비숍의 수 */
function developedCount(board: string[], color: Color): number {
  const minors = color === 'w' ? ['N', 'B'] : ['n', 'b'];
  const onBoard = board.reduce((n, piece, i) => {
    if (!minors.includes(piece)) return n;
    return HOME_MINORS[color].includes(i) ? n : n + 1;
  }, 0);
  return onBoard;
}

/** 캐슬링을 했는가 — 킹이 처음 자리도, 캐슬링 권리도 없으면 했거나 잃은 것이다 */
function hasCastled(san: string[], color: Color): boolean {
  return san.some((move, i) => (i % 2 === 0 ? 'w' : 'b') === color && move.startsWith('O-O'));
}

/** 두 수순이 앞에서 몇 수를 함께 쓰는가 */
function sharedPrefix(a: string[], b: string[]): number {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
}

/** 64칸을 64글자로 — 빈 칸은 점. 배열을 그대로 넘기면 페이지에 실리는 양이 몇 배가 된다 */
const pack = (board: string[]): string => board.map(square => square || '.').join('');

const CACHE = new Map<string, OpeningFacts>();

export function openingFacts(x: Opening): OpeningFacts {
  const cached = CACHE.get(x.slug);
  if (cached) return cached;

  const { positions, san, moves } = play(x.moves);
  const last = positions[positions.length - 1];

  // 형제 — 앞수를 가장 많이 나눠 가진 쪽부터. 첫 수가 다르면 형제가 아니다.
  const kin = OPENINGS
    .filter(y => y.slug !== x.slug)
    .map(y => ({ slug: y.slug, n: sharedPrefix(x.moves, y.moves), ply: y.moves.length }))
    .filter(y => y.n >= 1)
    .sort((a, b) => b.n - a.n || a.ply - b.ply);
  const bestShare = kin.length ? kin[0].n : 0;

  const facts: OpeningFacts = {
    slug: x.slug,
    ply: x.moves.length,
    moveNo: Math.ceil(x.moves.length / 2),
    turn: last.turn,
    san,
    line: numbered(san),
    fen: fenOf(last),
    board: pack(last.board),
    frames: positions.map(p => pack(p.board)),
    group: groupOf(x.moves),
    first: san[0],
    captures: 32 - pieceCount(last.board),
    material: { w: material(last.board, 'w'), b: material(last.board, 'b') },
    centre: CENTRE.filter(i => last.board[i].toUpperCase() === 'P').map(sqName),
    castled: { w: hasCastled(san, 'w'), b: hasCastled(san, 'b') },
    rights: last.castle,
    check: inCheck(last),
    mate: isMate(last),
    developed: { w: developedCount(last.board, 'w'), b: developedCount(last.board, 'b') },
    traits: FAMILY_TRAITS[x.family] ?? ['flexible', 'classical'],
    siblings: kin.slice(0, 6).map(y => y.slug),
    sharedPly: bestShare,
    replies: legalMoves(last).length,
    steps: moves.map((m, i) => ({
      no: Math.floor(i / 2) + 1,
      side: (i % 2 === 0 ? 'w' : 'b') as Color,
      san: san[i],
      piece: m.piece,
      from: sqName(m.from),
      to: sqName(m.to),
      capture: m.capture,
      castle: !!m.castle,
      check: /[+#]$/.test(san[i]),
    })),
  };
  CACHE.set(x.slug, facts);
  return facts;
}

/** 갈래별 개수 — 허브에서 쓴다 */
export function groupCounts(): Record<Group, number> {
  const out: Record<Group, number> = { open: 0, semiopen: 0, closed: 0, indian: 0, flank: 0 };
  for (const x of OPENINGS) out[groupOf(x.moves)]++;
  return out;
}

/** 첫 수별 개수 */
export function firstMoveCounts(): { move: string; count: number }[] {
  const map = new Map<string, number>();
  for (const x of OPENINGS) map.set(x.moves[0], (map.get(x.moves[0]) ?? 0) + 1);
  return [...map.entries()]
    .map(([move, count]) => ({ move, count }))
    .sort((a, b) => b.count - a.count || a.move.localeCompare(b.move));
}
