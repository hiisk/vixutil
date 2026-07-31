/**
 * 체스 규칙 — 판 하나와 수 하나를 다루는 곳.
 *
 * 오프닝 140종을 적을 때 자리(FEN)와 그림을 손으로 옮겨 적으면 한 칸이 틀려도
 * 아무도 못 잡는다. 그래서 자료에는 수순만 적고, 그 수를 실제로 두어 보는 쪽을
 * 만든다. 수가 규칙에 어긋나면 여기서 예외가 나므로 검사가 실제로 실패한다.
 *
 * 칸 번호는 FEN과 같은 순서다 — 0이 a8, 7이 h8, 56이 a1, 63이 h1.
 * 기물은 글자 하나로 두고 대문자가 백, 소문자가 흑이다.
 */

export type Color = 'w' | 'b';

export interface Position {
  /** 64칸. 빈 칸은 빈 문자열 */
  board: string[];
  turn: Color;
  /** 남은 캐슬링 권리 — 'KQkq' 중 일부, 없으면 '-' */
  castle: string;
  /** 앙파상으로 잡을 수 있는 칸. 없으면 null */
  ep: number | null;
  half: number;
  full: number;
}

export interface Move {
  from: number;
  to: number;
  /** 기물 종류 — 대문자 P N B R Q K */
  piece: string;
  capture: boolean;
  /** 승격한 기물 종류 */
  promo?: string;
  /** 캐슬링이면 어느 쪽인지 */
  castle?: 'K' | 'Q';
  /** 앙파상으로 잡았는가 */
  ep?: boolean;
}

export const FILES = 'abcdefgh';

export const idx = (file: number, rank: number): number => (8 - rank) * 8 + file;
export const fileOf = (i: number): number => i % 8;
export const rankOf = (i: number): number => 8 - ((i / 8) | 0);
export const sqName = (i: number): string => `${FILES[fileOf(i)]}${rankOf(i)}`;
export const sqIndex = (name: string): number => idx(FILES.indexOf(name[0]), Number(name[1]));

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const colorOf = (piece: string): Color => (piece === piece.toUpperCase() ? 'w' : 'b');
const other = (c: Color): Color => (c === 'w' ? 'b' : 'w');

const KNIGHT: number[][] = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
const DIAG: number[][] = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
const ORTH: number[][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

export function parseFen(fen: string): Position {
  const [rows, turn, castle, ep, half, full] = fen.split(' ');
  const board: string[] = new Array(64).fill('');
  let i = 0;
  for (const ch of rows) {
    if (ch === '/') continue;
    if (ch >= '1' && ch <= '8') i += Number(ch);
    else board[i++] = ch;
  }
  return {
    board,
    turn: turn === 'b' ? 'b' : 'w',
    castle: castle === '-' ? '' : castle,
    ep: ep === '-' ? null : sqIndex(ep),
    half: Number(half),
    full: Number(full),
  };
}

export function fenOf(p: Position): string {
  const rows: string[] = [];
  for (let r = 0; r < 8; r++) {
    let row = '';
    let gap = 0;
    for (let f = 0; f < 8; f++) {
      const piece = p.board[r * 8 + f];
      if (!piece) { gap++; continue; }
      if (gap) { row += String(gap); gap = 0; }
      row += piece;
    }
    if (gap) row += String(gap);
    rows.push(row);
  }
  return [
    rows.join('/'),
    p.turn,
    p.castle || '-',
    p.ep === null ? '-' : sqName(p.ep),
    p.half,
    p.full,
  ].join(' ');
}

export const startPosition = (): Position => parseFen(START_FEN);

/** 그 칸이 `by` 쪽에게 공격받고 있는가 — 킹이 잡히는 수를 걸러내는 데 쓴다 */
export function attacked(board: string[], target: number, by: Color): boolean {
  const tf = fileOf(target);
  const tr = rankOf(target);
  const at = (f: number, r: number): string | null =>
    f >= 0 && f < 8 && r >= 1 && r <= 8 ? board[idx(f, r)] : null;
  const is = (piece: string | null, kind: string): boolean =>
    !!piece && colorOf(piece) === by && piece.toUpperCase() === kind;

  // 폰은 한 랭크 아래(백)에서 대각으로 올려친다
  const pr = by === 'w' ? tr - 1 : tr + 1;
  if (is(at(tf - 1, pr), 'P') || is(at(tf + 1, pr), 'P')) return true;

  for (const [df, dr] of KNIGHT) if (is(at(tf + df, tr + dr), 'N')) return true;
  for (const [df, dr] of [...DIAG, ...ORTH]) if (is(at(tf + df, tr + dr), 'K')) return true;

  const ray = (dirs: number[][], long: string): boolean => {
    for (const [df, dr] of dirs) {
      for (let step = 1; step < 8; step++) {
        const piece = at(tf + df * step, tr + dr * step);
        if (piece === null) break;
        if (piece === '') continue;
        if (colorOf(piece) === by && (piece.toUpperCase() === long || piece.toUpperCase() === 'Q')) return true;
        break;
      }
    }
    return false;
  };
  return ray(DIAG, 'B') || ray(ORTH, 'R');
}

const kingSquare = (board: string[], color: Color): number =>
  board.indexOf(color === 'w' ? 'K' : 'k');

export function inCheck(p: Position, color: Color = p.turn): boolean {
  const king = kingSquare(p.board, color);
  return king >= 0 && attacked(p.board, king, other(color));
}

/** 규칙만 본 수 — 자기 킹이 잡히는지는 아직 안 본다 */
function pseudoMoves(p: Position): Move[] {
  const out: Move[] = [];
  const me = p.turn;
  const at = (f: number, r: number): string | null =>
    f >= 0 && f < 8 && r >= 1 && r <= 8 ? p.board[idx(f, r)] : null;

  const slide = (from: number, dirs: number[][], kind: string) => {
    const f0 = fileOf(from);
    const r0 = rankOf(from);
    for (const [df, dr] of dirs) {
      for (let step = 1; step < 8; step++) {
        const f = f0 + df * step;
        const r = r0 + dr * step;
        const piece = at(f, r);
        if (piece === null) break;
        if (piece === '') { out.push({ from, to: idx(f, r), piece: kind, capture: false }); continue; }
        if (colorOf(piece) !== me) out.push({ from, to: idx(f, r), piece: kind, capture: true });
        break;
      }
    }
  };

  for (let from = 0; from < 64; from++) {
    const piece = p.board[from];
    if (!piece || colorOf(piece) !== me) continue;
    const kind = piece.toUpperCase();
    const f0 = fileOf(from);
    const r0 = rankOf(from);

    if (kind === 'P') {
      const dir = me === 'w' ? 1 : -1;
      const last = me === 'w' ? 8 : 1;
      const home = me === 'w' ? 2 : 7;
      const one = at(f0, r0 + dir);
      if (one === '') {
        const to = idx(f0, r0 + dir);
        if (r0 + dir === last) for (const promo of 'QRBN') out.push({ from, to, piece: 'P', capture: false, promo });
        else out.push({ from, to, piece: 'P', capture: false });
        if (r0 === home && at(f0, r0 + dir * 2) === '') {
          out.push({ from, to: idx(f0, r0 + dir * 2), piece: 'P', capture: false });
        }
      }
      for (const df of [-1, 1]) {
        const f = f0 + df;
        const r = r0 + dir;
        const piece2 = at(f, r);
        if (piece2 === null) continue;
        const to = idx(f, r);
        if (piece2 !== '' && colorOf(piece2) !== me) {
          if (r === last) for (const promo of 'QRBN') out.push({ from, to, piece: 'P', capture: true, promo });
          else out.push({ from, to, piece: 'P', capture: true });
        } else if (piece2 === '' && p.ep === to) {
          out.push({ from, to, piece: 'P', capture: true, ep: true });
        }
      }
      continue;
    }

    if (kind === 'N') {
      for (const [df, dr] of KNIGHT) {
        const piece2 = at(f0 + df, r0 + dr);
        if (piece2 === null) continue;
        if (piece2 === '' || colorOf(piece2) !== me) {
          out.push({ from, to: idx(f0 + df, r0 + dr), piece: 'N', capture: piece2 !== '' });
        }
      }
      continue;
    }

    if (kind === 'B') { slide(from, DIAG, 'B'); continue; }
    if (kind === 'R') { slide(from, ORTH, 'R'); continue; }
    if (kind === 'Q') { slide(from, [...DIAG, ...ORTH], 'Q'); continue; }

    for (const [df, dr] of [...DIAG, ...ORTH]) {
      const piece2 = at(f0 + df, r0 + dr);
      if (piece2 === null) continue;
      if (piece2 === '' || colorOf(piece2) !== me) {
        out.push({ from, to: idx(f0 + df, r0 + dr), piece: 'K', capture: piece2 !== '' });
      }
    }

    // 캐슬링 — 권리·빈 칸·지나가는 칸까지 본다
    const rank = me === 'w' ? 1 : 8;
    const foe = other(me);
    const empty = (f: number) => p.board[idx(f, rank)] === '';
    const safe = (f: number) => !attacked(p.board, idx(f, rank), foe);
    if (from === idx(4, rank) && !attacked(p.board, from, foe)) {
      if (p.castle.includes(me === 'w' ? 'K' : 'k') && empty(5) && empty(6) && safe(5) && safe(6)) {
        out.push({ from, to: idx(6, rank), piece: 'K', capture: false, castle: 'K' });
      }
      if (p.castle.includes(me === 'w' ? 'Q' : 'q') && empty(3) && empty(2) && empty(1) && safe(3) && safe(2)) {
        out.push({ from, to: idx(2, rank), piece: 'K', capture: false, castle: 'Q' });
      }
    }
  }
  return out;
}

/** 캐슬링 권리는 킹이나 룩이 움직였을 때, 그리고 룩이 잡혔을 때 사라진다 */
const RIGHT_AT: Record<number, string> = {
  [idx(0, 1)]: 'Q', [idx(7, 1)]: 'K', [idx(0, 8)]: 'q', [idx(7, 8)]: 'k',
};

export function apply(p: Position, m: Move): Position {
  const board = p.board.slice();
  const me = p.turn;
  const moving = board[m.from];
  board[m.from] = '';
  board[m.to] = m.promo ? (me === 'w' ? m.promo : m.promo.toLowerCase()) : moving;

  if (m.ep) {
    // 잡힌 폰은 도착 칸이 아니라 그 뒤 칸에 서 있다
    board[idx(fileOf(m.to), rankOf(m.to) + (me === 'w' ? -1 : 1))] = '';
  }
  if (m.castle) {
    const rank = me === 'w' ? 1 : 8;
    const [rookFrom, rookTo] = m.castle === 'K' ? [idx(7, rank), idx(5, rank)] : [idx(0, rank), idx(3, rank)];
    board[rookTo] = board[rookFrom];
    board[rookFrom] = '';
  }

  let castle = p.castle;
  if (m.piece === 'K') castle = castle.replace(me === 'w' ? /[KQ]/g : /[kq]/g, '');
  for (const sq of [m.from, m.to]) {
    const right = RIGHT_AT[sq];
    if (right) castle = castle.replace(right, '');
  }

  const double = m.piece === 'P' && Math.abs(rankOf(m.to) - rankOf(m.from)) === 2;
  return {
    board,
    turn: other(me),
    castle,
    ep: double ? idx(fileOf(m.from), (rankOf(m.from) + rankOf(m.to)) / 2) : null,
    half: m.capture || m.piece === 'P' ? 0 : p.half + 1,
    full: me === 'b' ? p.full + 1 : p.full,
  };
}

export function legalMoves(p: Position): Move[] {
  const me = p.turn;
  return pseudoMoves(p).filter(m => {
    const next = apply(p, m);
    const king = kingSquare(next.board, me);
    return king < 0 || !attacked(next.board, king, other(me));
  });
}

export const isMate = (p: Position): boolean => inCheck(p) && legalMoves(p).length === 0;
export const isStalemate = (p: Position): boolean => !inCheck(p) && legalMoves(p).length === 0;

/**
 * 한 수를 사람이 쓰는 표기로 바꾼다.
 *
 * 자료에는 장군 표시(+, #)를 적지 않는다. 어느 수가 장군인지는 판이 알고 있으니
 * 여기서 붙인다 — 적지 않은 것은 틀릴 일이 없다.
 */
export function sanOf(p: Position, m: Move): string {
  let core: string;
  if (m.castle) {
    core = m.castle === 'K' ? 'O-O' : 'O-O-O';
  } else if (m.piece === 'P') {
    core = m.capture ? `${FILES[fileOf(m.from)]}x${sqName(m.to)}` : sqName(m.to);
    if (m.promo) core += `=${m.promo}`;
  } else {
    const rivals = legalMoves(p).filter(
      x => x.piece === m.piece && x.to === m.to && x.from !== m.from && !x.castle,
    );
    let mark = '';
    if (rivals.length) {
      const sameFile = rivals.some(x => fileOf(x.from) === fileOf(m.from));
      const sameRank = rivals.some(x => rankOf(x.from) === rankOf(m.from));
      if (!sameFile) mark = FILES[fileOf(m.from)];
      else if (!sameRank) mark = String(rankOf(m.from));
      else mark = sqName(m.from);
    }
    core = `${m.piece}${mark}${m.capture ? 'x' : ''}${sqName(m.to)}`;
  }
  const next = apply(p, m);
  if (isMate(next)) return `${core}#`;
  return inCheck(next) ? `${core}+` : core;
}

/** 표기에서 장군 표시와 평가 기호를 뗀다 */
const bare = (san: string): string => san.replace(/[+#!?]+$/, '').replace(/^0-0/, 'O-O').replace(/^0-0-0/, 'O-O-O');

const SAN_RE = /^([NBRQK])?([a-h])?([1-8])?(x)?([a-h][1-8])(?:=([NBRQ]))?$/;

/**
 * 표기 하나를 지금 자리에서 찾아 둔다.
 *
 * 맞는 수가 없거나 둘 이상이면 예외다. 오프닝 자료가 틀리면 여기서 걸린다 —
 * 규칙에 어긋난 수는 물론이고, "Nd7"처럼 어느 나이트인지 못 정하는 표기도 잡힌다.
 */
export function moveFromSan(p: Position, san: string): Move {
  const text = bare(san);
  const list = legalMoves(p);

  if (text === 'O-O' || text === 'O-O-O') {
    const side = text === 'O-O' ? 'K' : 'Q';
    const found = list.find(m => m.castle === side);
    if (!found) throw new Error(`캐슬링을 둘 수 없다: ${san}`);
    return found;
  }

  const parts = SAN_RE.exec(text);
  if (!parts) throw new Error(`읽을 수 없는 표기: ${san}`);
  const [, piece, fromFile, fromRank, , dest, promo] = parts;
  const kind = piece ?? 'P';
  const to = sqIndex(dest);

  const found = list.filter(m =>
    m.piece === kind &&
    m.to === to &&
    !m.castle &&
    (promo ? m.promo === promo : !m.promo) &&
    (fromFile === undefined || fileOf(m.from) === FILES.indexOf(fromFile)) &&
    (fromRank === undefined || rankOf(m.from) === Number(fromRank)),
  );
  if (found.length === 0) throw new Error(`둘 수 없는 수: ${san}`);
  if (found.length > 1) throw new Error(`어느 기물인지 정해지지 않는 표기: ${san}`);
  return found[0];
}

export interface Played {
  /** 시작 자리부터 각 수를 둔 뒤의 자리 — 길이는 수순보다 하나 많다 */
  positions: Position[];
  /** 장군 표시까지 붙은 정식 표기 */
  san: string[];
}

/** 수순을 처음부터 둬 본다. 하나라도 어긋나면 예외가 난다. */
export function play(moves: string[]): Played {
  const positions: Position[] = [startPosition()];
  const san: string[] = [];
  for (const text of moves) {
    const p = positions[positions.length - 1];
    const m = moveFromSan(p, text);
    san.push(sanOf(p, m));
    positions.push(apply(p, m));
  }
  return { positions, san };
}

/** "1.e4 c5 2.Nf3 d6" 처럼 번호를 붙인다 */
export function numbered(san: string[]): string {
  const out: string[] = [];
  for (let i = 0; i < san.length; i += 2) {
    const white = san[i];
    const black = san[i + 1];
    out.push(`${i / 2 + 1}.${white}${black ? ` ${black}` : ''}`);
  }
  return out.join(' ');
}

/** 기물 값 — 재료가 같은지 보는 용도라 킹은 세지 않는다 */
const VALUE: Record<string, number> = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 };

export function material(board: string[], color: Color): number {
  return board.reduce((sum, piece) => {
    if (!piece || colorOf(piece) !== color) return sum;
    return sum + VALUE[piece.toUpperCase()];
  }, 0);
}

export const pieceCount = (board: string[]): number => board.filter(Boolean).length;
