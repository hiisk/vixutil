/**
 * 두뇌 게임 여섯의 계산 — 스트룹·개수 어림·엔백·도형 회전·박자·주변시야.
 *
 * 게임 로직을 컴포넌트에 두면 확인할 방법이 없다. 특히 **난이도 곡선과 채점**은
 * 눈으로는 늘 그럴듯해 보이는데 실제로는 어긋나 있기 쉽다 — 단계가 올라도
 * 안 어려워지거나, 찍어도 절반을 맞히거나, 점수가 음수로 내려가거나.
 *
 * 그래서 여기 함수들은 전부 순수하고 난수를 인자로 받는다.
 */

export type Rng = () => number;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/* ────────────────────────── 스트룹 ────────────────────────── */

export const STROOP_KEYS = ['red', 'blue', 'green', 'yellow', 'purple'] as const;
export type StroopColor = (typeof STROOP_KEYS)[number];

export const STROOP_HEX: Record<StroopColor, string> = {
  red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#eab308', purple: '#a855f7',
};

export interface StroopTrial {
  /** 화면에 적히는 낱말이 뜻하는 색 */
  word: StroopColor;
  /** 그 낱말이 실제로 칠해진 색 — 답은 언제나 이쪽이다 */
  ink: StroopColor;
  /** 낱말과 잉크가 같으면 쉬운 문제다 */
  congruent: boolean;
  /** 고를 수 있는 보기 — 정답이 반드시 들어 있다 */
  options: StroopColor[];
}

/**
 * 스트룹 문제 하나를 만든다.
 *
 * `congruentRate`는 낱말과 잉크가 같은 문제의 비율이다. **0으로 두면 안 된다** —
 * 전부 어긋나 있으면 "낱말을 무시하라"가 아니라 "낱말의 반대를 고르라"가 되어
 * 오히려 쉬워진다. 섞여 있어야 낱말을 억눌러야 하는 진짜 스트룹이 된다.
 */
export function stroopTrial(rng: Rng, congruentRate = 0.3, optionCount = 4): StroopTrial {
  const pool = STROOP_KEYS;
  const ink = pool[Math.floor(rng() * pool.length)];
  const congruent = rng() < congruentRate;
  let word = ink;
  if (!congruent) {
    const others = pool.filter(c => c !== ink);
    word = others[Math.floor(rng() * others.length)];
  }
  const n = clamp(Math.floor(optionCount), 2, pool.length);
  const rest = pool.filter(c => c !== ink);
  const options: StroopColor[] = [ink];
  for (let i = 0; i < rest.length && options.length < n; i++) {
    const k = Math.floor(rng() * rest.length);
    if (!options.includes(rest[k])) options.push(rest[k]);
  }
  // 난수가 같은 것만 뽑아 자리가 안 찰 수 있다 — 남은 것으로 확실히 채운다
  for (const c of rest) if (options.length < n && !options.includes(c)) options.push(c);
  // 정답이 늘 첫 자리면 안 보고도 맞힌다
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { word, ink, congruent, options };
}

/** 답은 잉크 색이다 — 낱말이 아니다 */
export const stroopCorrect = (t: StroopTrial, picked: StroopColor) => picked === t.ink;

/* ────────────────────────── 개수 어림 ────────────────────────── */

export interface DotRound {
  count: number;
  /** 점이 보이는 시간(ms) — 단계가 오를수록 짧아진다 */
  showMs: number;
  /** 0~1 좌표 — 화면 크기와 무관하게 쓸 수 있다 */
  dots: { x: number; y: number }[];
}

/**
 * 점 개수 맞히기 한 판.
 *
 * 단계가 오르면 **개수는 늘고 보이는 시간은 준다.** 둘 중 하나만 바꾸면
 * 금세 천장이나 바닥에 닿는다 — 시간만 줄이면 열 개도 못 세게 되고,
 * 개수만 늘리면 오래 보고 하나씩 셀 수 있어 어림이 아니게 된다.
 */
export function dotRound(level: number, rng: Rng): DotRound {
  const lv = Math.max(1, Math.floor(level));
  const count = Math.min(60, 4 + Math.floor(lv * 1.8));
  const showMs = Math.max(320, Math.round(1500 * Math.pow(0.93, lv - 1)));
  const dots = Array.from({ length: count }, () => ({ x: rng(), y: rng() }));
  return { count, showMs, dots };
}

/**
 * 어림 점수. 정확히 맞히면 100, 멀어질수록 준다.
 *
 * 오차를 **정답 대비 비율**로 잰다. 다섯 개에서 둘 틀린 것과 쉰 개에서 둘 틀린
 * 것은 전혀 다른 일이라, 절대 오차로 재면 뒷단계가 지나치게 후해진다.
 */
export function dotScore(actual: number, guess: number): number {
  if (actual <= 0) return 0;
  const off = Math.abs(actual - guess) / actual;
  return Math.round(clamp(100 - off * 250, 0, 100));
}

/* ────────────────────────── 엔백 ────────────────────────── */

export interface NBackRun {
  /** 보여줄 자극 — 0~8 (3×3 칸의 자리) */
  items: number[];
  /** i번째가 n칸 앞과 같은지 */
  matches: boolean[];
  n: number;
}

/**
 * 엔백 수열을 만든다.
 *
 * `matchRate`만큼은 **일부러** n칸 앞과 같게 만든다. 순수한 난수로 두면
 * 같은 자리가 나올 확률이 1/9뿐이라 한 판에 한두 번밖에 안 나오고,
 * 그러면 "아니오"만 눌러도 높은 점수가 나온다.
 */
export function nBackRun(length: number, n: number, rng: Rng, matchRate = 0.3, slots = 9): NBackRun {
  const len = Math.max(1, Math.floor(length));
  const back = Math.max(1, Math.floor(n));
  const items: number[] = [];
  const matches: boolean[] = [];
  for (let i = 0; i < len; i++) {
    if (i >= back && rng() < matchRate) {
      items.push(items[i - back]);
      matches.push(true);
    } else {
      let v = Math.floor(rng() * slots);
      // 일부러 맞춘 것이 아닌데 우연히 같으면 비켜 준다 — 안 그러면 실제 비율이 올라간다
      if (i >= back && v === items[i - back]) v = (v + 1) % slots;
      items.push(v);
      matches.push(false);
    }
  }
  return { items, matches, n: back };
}

export interface NBackScore {
  hit: number;
  miss: number;
  falseAlarm: number;
  /** 0~100 — 찍으면 0에 가깝게 나오도록 오답을 뺀다 */
  score: number;
}

/**
 * 엔백 채점.
 *
 * 맞힌 것에서 **잘못 누른 것을 뺀다.** 안 빼면 전부 누르는 것이 최적 전략이 되어
 * 게임이 성립하지 않는다. 처음 n개는 비교할 앞이 없으므로 채점에서 뺀다.
 */
export function nBackScore(run: NBackRun, pressed: ReadonlySet<number>): NBackScore {
  let hit = 0;
  let miss = 0;
  let falseAlarm = 0;
  for (let i = run.n; i < run.items.length; i++) {
    if (run.matches[i]) {
      if (pressed.has(i)) hit++;
      else miss++;
    } else if (pressed.has(i)) falseAlarm++;
  }
  const total = hit + miss;
  const raw = total === 0 ? 0 : (hit - falseAlarm) / total;
  return { hit, miss, falseAlarm, score: Math.round(clamp(raw, 0, 1) * 100) };
}

/* ────────────────────────── 도형 회전 ────────────────────────── */

/** 3×3 칸 위의 도형 — 켜진 칸의 자리 */
export type Shape = number[];

/** 시계 방향 90도 — (r,c) → (c, size-1-r) */
export function rotate90(shape: Shape, size = 3): Shape {
  return shape
    .map(i => {
      const r = Math.floor(i / size);
      const c = i % size;
      return c * size + (size - 1 - r);
    })
    .sort((a, b) => a - b);
}

/** 좌우 뒤집기 — 회전만으로는 만들 수 없는 짝을 만든다 */
export function mirror(shape: Shape, size = 3): Shape {
  return shape.map(i => Math.floor(i / size) * size + (size - 1 - (i % size))).sort((a, b) => a - b);
}

const same = (a: Shape, b: Shape) => a.length === b.length && a.every((v, i) => v === b[i]);

/** 돌리기만 해서 같아질 수 있는가 */
export function isRotation(a: Shape, b: Shape, size = 3): boolean {
  let cur = [...a].sort((x, y) => x - y);
  for (let k = 0; k < 4; k++) {
    if (same(cur, [...b].sort((x, y) => x - y))) return true;
    cur = rotate90(cur, size);
  }
  return false;
}

export interface RotationPuzzle {
  left: Shape;
  right: Shape;
  /** 정답 — 돌려서 같아지면 true */
  isSame: boolean;
  size: number;
}

/**
 * 도형 회전 문제 하나.
 *
 * "다른" 문제를 만들 때 **좌우로 뒤집은 도형**을 쓴다. 아무 도형이나 갖다 대면
 * 칸 수나 생김새가 대놓고 달라 돌려 볼 필요도 없이 답이 보인다. 거울상은
 * 칸 수가 같고 모양도 비슷해서 실제로 머릿속에서 돌려 봐야 한다.
 * (거울상이 우연히 회전으로도 같아지는 대칭 도형은 걸러 낸다.)
 */
export function rotationPuzzle(level: number, rng: Rng, size = 3): RotationPuzzle {
  const cells = clamp(3 + Math.floor(level / 3), 3, size * size - 1);
  const all = Array.from({ length: size * size }, (_, i) => i);

  const draw = (): Shape => {
    const pool = [...all];
    const out: number[] = [];
    for (let i = 0; i < cells; i++) out.push(...pool.splice(Math.floor(rng() * pool.length), 1));
    return out.sort((a, b) => a - b);
  };

  const wantSame = rng() < 0.5;
  for (let tries = 0; tries < 40; tries++) {
    const left = draw();
    const turns = 1 + Math.floor(rng() * 3);
    let right = left;
    for (let k = 0; k < turns; k++) right = rotate90(right, size);
    if (wantSame) return { left, right, isSame: true, size };
    const flipped = mirror(right, size);
    // 대칭 도형은 거울상이 회전으로도 같아진다 — 그러면 "다르다"가 거짓이 된다
    if (!isRotation(left, flipped, size)) return { left, right: flipped, isSame: false, size };
  }
  // 대칭만 뽑히는 드문 경우 — 같은 문제로 내려앉는다(틀린 답을 내는 것보다 낫다)
  const left = draw();
  return { left, right: rotate90(left, size), isSame: true, size };
}

/* ────────────────────────── 박자 ────────────────────────── */

export interface BeatScore {
  /** 각 박의 어긋남(ms) — 음수는 빠름, 양수는 늦음 */
  offsets: number[];
  /** 어긋남의 평균 크기 */
  meanAbs: number;
  /** 얼마나 고른가 — 표준편차가 작을수록 박자가 일정하다 */
  stdev: number;
  /** 0~100 */
  score: number;
}

/**
 * 박자 채점.
 *
 * **평균 오차와 고름을 함께 본다.** 평균만 보면 늘 30ms씩 늦는 사람과 한 번은
 * 100 빠르고 한 번은 100 늦는 사람이 같은 점수를 받는데, 박자 감각은 뒤쪽이
 * 훨씬 나쁘다. 사람이 못 알아채는 25ms까지는 감점하지 않는다.
 */
export function beatScore(taps: readonly number[], intervalMs: number, startMs: number): BeatScore {
  if (taps.length === 0) return { offsets: [], meanAbs: 0, stdev: 0, score: 0 };
  const offsets = taps.map((t, i) => t - (startMs + intervalMs * (i + 1)));
  const abs = offsets.map(Math.abs);
  const meanAbs = abs.reduce((a, b) => a + b, 0) / abs.length;
  const mean = offsets.reduce((a, b) => a + b, 0) / offsets.length;
  const stdev = Math.sqrt(offsets.reduce((n, o) => n + (o - mean) ** 2, 0) / offsets.length);
  // 25ms까지는 사람이 못 알아챈다 — 거기까지는 만점으로 둔다
  const penalty = Math.max(0, meanAbs - 25) * 0.6 + stdev * 0.4;
  return { offsets, meanAbs, stdev, score: Math.round(clamp(100 - penalty, 0, 100)) };
}

/* ────────────────────────── 주변시야 ────────────────────────── */

export interface Peripheral {
  /** 화면 가운데를 0,0으로 본 상대 좌표 (-1~1) */
  x: number;
  y: number;
  /** 가운데에서 떨어진 정도 (0~1) */
  radius: number;
}

/**
 * 주변시야 표적 자리.
 *
 * 가운데를 비운 고리 안에 놓는다 — 가운데에 뜨면 정면으로 보게 되어
 * 주변시야를 재는 것이 아니게 된다. 단계가 오를수록 고리가 바깥으로 간다.
 *
 * 각도는 고르게 뽑되 **반지름은 제곱근을 취한다.** 그냥 뽑으면 안쪽에 몰린다
 * (고리의 넓이가 반지름의 제곱에 비례하기 때문이다).
 */
export function peripheralTarget(level: number, rng: Rng): Peripheral {
  const lv = Math.max(1, Math.floor(level));
  const inner = clamp(0.35 + lv * 0.03, 0.35, 0.75);
  const outer = clamp(inner + 0.25, 0, 1);
  const angle = rng() * Math.PI * 2;
  const t = rng();
  const radius = Math.sqrt(inner * inner + t * (outer * outer - inner * inner));
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, radius };
}
