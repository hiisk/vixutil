/**
 * 3×3 큐브를 실제로 돌려 보는 최소한의 장치.
 *
 * 이 자료의 위험은 외운 공식을 그대로 적어 두는 것이다. 한 수만 틀려도
 * 표기법은 멀쩡해 보이고, 큐브를 들고 있지 않은 사람은 알아챌 방법이 없다.
 * 그래서 공식만 적어 두고 "이 공식이 푸는 경우"는 여기서 계산한다. 다 푼
 * 큐브에 공식의 역순을 걸면 그 공식이 풀어야 할 모양이 나온다.
 *
 * 스티커 54칸을 U R F D L B 순서로, 각 면은 왼쪽 위부터 가로로 읽는다.
 * (크지엠바 표기와 같은 배치다.)
 */
export const FACES = ['U', 'R', 'F', 'D', 'L', 'B'] as const;
export type Face = (typeof FACES)[number];

export type Cube = Uint8Array;

/** 다 맞춘 큐브 — 각 면이 제 색 아홉 칸 */
export const solved = (): Cube => Uint8Array.from({ length: 54 }, (_, i) => Math.floor(i / 9));

/** 한 자리의 스티커가 다음 자리로 간다는 뜻의 순환 — [a,b,c,d]면 a→b→c→d→a */
type Cycle = number[];

/** 면 자체가 도는 순환 (시계 방향) */
const spin = (f: number): Cycle[] => {
  const o = f * 9;
  return [
    [o + 0, o + 2, o + 8, o + 6],
    [o + 1, o + 5, o + 7, o + 3],
  ];
};

/**
 * 기본 여섯 수. 옆면 순환은 축을 따라 한 바퀴 도는 열두 칸에서 세 칸씩 옮긴 것이다.
 */
const BASE: Record<string, Cycle[]> = {
  U: [...spin(0), [18, 36, 45, 9], [19, 37, 46, 10], [20, 38, 47, 11]],
  R: [...spin(1), [20, 2, 51, 29], [23, 5, 48, 32], [26, 8, 45, 35]],
  F: [...spin(2), [6, 9, 29, 44], [7, 12, 28, 41], [8, 15, 27, 38]],
  D: [...spin(3), [24, 15, 51, 42], [25, 16, 52, 43], [26, 17, 53, 44]],
  L: [...spin(4), [18, 27, 53, 0], [21, 30, 50, 3], [24, 33, 47, 6]],
  B: [...spin(5), [0, 42, 35, 11], [1, 39, 34, 14], [2, 36, 33, 17]],
  /** M은 L을 따라 돈다 */
  M: [[19, 28, 52, 1], [22, 31, 49, 4], [25, 34, 46, 7]],
  /** E는 D를 따라 돈다 */
  E: [[21, 12, 48, 39], [22, 13, 49, 40], [23, 14, 50, 41]],
  /** S는 F를 따라 돈다 */
  S: [[3, 10, 32, 43], [4, 13, 31, 40], [5, 16, 30, 37]],
};

/** 넓은 수와 회전은 기본 수의 조합으로 적는다 — 순환을 또 손으로 적으면 틀릴 자리가 는다 */
const COMPOUND: Record<string, string[]> = {
  r: ['R', "M'"],
  l: ['L', 'M'],
  u: ['U', "E'"],
  d: ['D', 'E'],
  f: ['F', 'S'],
  b: ['B', "S'"],
  x: ['R', "M'", "L'"],
  y: ['U', "E'", "D'"],
  z: ['F', 'S', "B'"],
};

const applyCycles = (c: Cube, cycles: Cycle[]): Cube => {
  const next = Uint8Array.from(c);
  for (const cy of cycles) {
    for (let i = 0; i < cy.length; i++) next[cy[(i + 1) % cy.length]] = c[cy[i]];
  }
  return next;
};

const invert = (cycles: Cycle[]): Cycle[] => cycles.map(cy => [...cy].reverse());

/** 한 수 — "R" "R'" "R2" "Rw" "r'" "M2" "x" 를 모두 받는다 */
export function move(c: Cube, token: string): Cube {
  const m = /^([URFDLBMESxyzrlufdb]w?)(2|'|)$/.exec(token);
  if (!m) throw new Error(`읽을 수 없는 수: ${token}`);
  const raw = m[1].endsWith('w') ? m[1][0].toLowerCase() : m[1];
  const suffix = m[2];
  const parts = COMPOUND[raw] ?? [raw];
  const turns = suffix === '2' ? 2 : 1;
  const reverse = suffix === "'";

  let out = c;
  for (let t = 0; t < turns; t++) {
    for (const p of parts) {
      const face = p.replace("'", '');
      const cycles = BASE[face];
      if (!cycles) throw new Error(`모르는 면: ${p}`);
      const flip = p.endsWith("'") !== reverse;
      out = applyCycles(out, flip ? invert(cycles) : cycles);
    }
  }
  return out;
}

/** 괄호와 여백을 걷어 내고 한 수씩 끊는다 */
export const tokens = (alg: string): string[] =>
  alg.replace(/[()[\]]/g, ' ').trim().split(/\s+/).filter(Boolean);

export function apply(c: Cube, alg: string): Cube {
  let out = c;
  for (const t of tokens(alg)) out = move(out, t);
  return out;
}

/** 공식을 거꾸로 — 순서를 뒤집고 방향을 뒤집는다 */
export function reverseAlg(alg: string): string {
  return tokens(alg)
    .map(t => (t.endsWith("'") ? t.slice(0, -1) : t.endsWith('2') ? t : `${t}'`))
    .reverse()
    .join(' ');
}

export const equal = (a: Cube, b: Cube): boolean => a.every((v, i) => v === b[i]);

export const isSolved = (c: Cube): boolean => equal(c, solved());

/** 마지막 층(윗면과 옆면 윗줄)을 뺀 나머지가 그대로인가 */
const LAST_LAYER = new Set<number>([
  ...Array.from({ length: 9 }, (_, i) => i), // U 아홉 칸
  9, 10, 11, 18, 19, 20, 36, 37, 38, 45, 46, 47, // 옆 네 면의 윗줄
]);

/**
 * 마지막 층을 뺀 나머지가 제 색인가.
 *
 * 다 맞춘 큐브와 곧이곧대로 견주지 않고 각 면의 가운데 색과 견준다. 공식에 회전이
 * 섞여 큐브가 통째로 기울어져 있어도 판정이 흔들리지 않는다.
 */
export function f2lIntact(c: Cube): boolean {
  for (let i = 0; i < 54; i++) {
    if (LAST_LAYER.has(i)) continue;
    if (c[i] !== c[Math.floor(i / 9) * 9 + 4]) return false;
  }
  return true;
}
