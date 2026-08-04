/**
 * 볼트와 등급 하나가 만드는 조임 토크.
 *
 * 우리가 원하는 것은 축력이다 — 볼트가 늘어나며 두 판을 눌러 붙이는 힘.
 * 그 힘을 항복의 7할에 두고, 그만큼 늘리려면 얼마나 돌려야 하는지를 되짚은
 * 것이 토크다.
 *
 *   축력 F = 0.7 × 항복강도 × 유효단면적
 *   토크 T = K × 지름 × F
 *
 * K는 마찰이다. 돌린 힘의 90% 가까이가 나사산과 머리 밑면에서 마찰로
 * 사라지고, 볼트를 늘리는 데 쓰이는 것은 10% 남짓이다. 기름 한 방울에
 * 토크가 25% 달라지는 것이 그래서다.
 *
 * 등급 숫자는 그 자체가 값이다. 8.8이면 인장 800MPa, 항복은 그 8할인 640MPa —
 * 표를 옮겨 적을 것이 아니라 두 자리에서 읽어 내면 된다.
 */
import { CELLS, DIAMETERS, FRICTIONS, GRADES, PRELOAD, type Cell, type Grade, gradeOf, sizeLabel, slugOf } from './list.ts';
import { coarseOnly, stressAreaOf } from '../screw/facts.ts';
import type { Screw } from '../screw/list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 작은 볼트는 1N·m가 안 되므로 잘게 읽어야 뜻이 있다 */
const nm = (x: number) => round(x, x < 10 ? 2 : 1);

/** 등급 숫자에서 인장강도(MPa) — 8.8의 앞자리가 100배다 */
export const tensileOf = (g: Grade): number => (g.rm !== undefined ? g.rm : Number(g.label.split('.')[0]) * 100);

/** 항복강도(MPa) — 뒷자리가 인장의 몇 할인지 말한다 */
export const yieldOf = (g: Grade): number =>
  g.re !== undefined ? g.re : tensileOf(g) * (Number(g.label.split('.')[1]) / 10);

/** /screw의 굵은 나사에서 이 지름 한 줄을 가져온다 */
export const screwOfDiameter = (d: number): Screw => {
  const s = coarseOnly().find(x => x.d === d);
  if (!s) throw new Error(`굵은 나사에 M${d}이 없다`);
  return s;
};

export interface Turn {
  key: string;
  k: number;
  /** 조임 토크(N·m) */
  nm: number;
}

export interface Neighbour {
  slug: string;
  label: string;
}

export interface TorqueFacts {
  cell: Cell;
  slug: string;
  label: string;
  grade: Grade;
  /** 피치(mm) */
  pitch: number;
  /** 유효 단면적(mm²) */
  area: number;
  /** 인장강도(MPa) */
  tensile: number;
  /** 항복강도(MPa) */
  yieldStrength: number;
  /** 목표 축력(N) */
  preload: number;
  /** 끊어지는 힘(N) */
  breaking: number;
  /** 마찰마다의 토크 */
  turns: Turn[];
  /** 건조 상태 토크를 다른 단위로 */
  kgfm: number;
  lbft: number;
  /** 같은 볼트의 다른 등급, 같은 등급의 다른 볼트 */
  stronger: Neighbour | null;
  weaker: Neighbour | null;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

/** 목표 축력 — 항복의 일곱 할까지만 당긴다 */
export const preloadOf = (area: number, yieldStrength: number): number => PRELOAD * yieldStrength * area;

/** 그 축력을 만드는 토크(N·m) — 지름은 mm, 힘은 N */
export const torqueOf = (k: number, d: number, force: number): number => (k * d * force) / 1000;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function torqueFacts(c: Cell): TorqueFacts {
  const grade = gradeOf(c.grade);
  if (!grade) throw new Error(`모르는 등급: ${c.grade}`);
  const screw = screwOfDiameter(c.d);
  const area = stressAreaOf(screw);
  const ys = yieldOf(grade);
  const force = preloadOf(area, ys);
  const dry = FRICTIONS.find(f => f.key === 'dry')!;
  const dryNm = torqueOf(dry.k, c.d, force);
  const gi = GRADES.findIndex(g => g.key === c.grade);
  const di = DIAMETERS.indexOf(c.d);
  const near = (cell: Cell): Neighbour => ({ slug: slugOf(cell), label: `${sizeLabel(cell.d)} ${gradeOf(cell.grade)!.label}` });

  return {
    cell: c,
    slug: slugOf(c),
    label: `${sizeLabel(c.d)} ${grade.label}`,
    grade,
    pitch: screw.p,
    area,
    tensile: tensileOf(grade),
    yieldStrength: ys,
    preload: Math.round(force),
    breaking: Math.round(tensileOf(grade) * area),
    turns: FRICTIONS.map(f => ({ key: f.key, k: f.k, nm: nm(torqueOf(f.k, c.d, force)) })),
    // 1kgf는 9.80665N, 1N·m는 0.73756lb-ft
    kgfm: round(dryNm / 9.80665, 2),
    lbft: round(dryNm * 0.73756, 1),
    stronger: step(GRADES, gi, 1) === null ? null : near({ d: c.d, grade: (step(GRADES, gi, 1) as Grade).key }),
    weaker: step(GRADES, gi, -1) === null ? null : near({ d: c.d, grade: (step(GRADES, gi, -1) as Grade).key }),
    bigger: step(DIAMETERS, di, 1) === null ? null : near({ d: step(DIAMETERS, di, 1) as number, grade: c.grade }),
    smaller: step(DIAMETERS, di, -1) === null ? null : near({ d: step(DIAMETERS, di, -1) as number, grade: c.grade }),
  };
}

/** 같은 볼트의 한 줄 */
export const atDiameter = (d: number): Cell[] => GRADES.map(g => ({ d, grade: g.key }));

/** 같은 등급의 한 줄 */
export const atGrade = (grade: string): Cell[] => CELLS.filter(c => c.grade === grade);
