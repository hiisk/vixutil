/**
 * 드릴 비트 하나의 값 — 지름 하나에서 나머지가 나온다.
 *
 * 이 표의 일은 계열 사이를 잇는 것이다. 도면에는 6.5mm라고 적혀 있는데 손에
 * 있는 것은 인치 드릴뿐이거나, 나사 표에는 #21이라고만 적혀 있는 일이 흔하다.
 * 그래서 낱장마다 다른 계열에서 가장 가까운 비트를 함께 낸다.
 *
 * 인치 계열의 이름은 약분해서 보인다 — 16/64는 1/4로 적어야 읽힌다.
 */
import { BITS, KINDS, type Bit, type Kind, slugOf } from './list.ts';
import { SCREWS, labelOf as screwLabel, slugOf as screwSlug } from '../screw/list.ts';
import { screwFacts } from '../screw/facts.ts';

const round = (x: number, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export interface Near {
  kind: Kind;
  name: string;
  mm: number;
  slug: string;
  /** 이 비트와의 차이(mm) — 양수면 그쪽이 굵다 */
  diff: number;
}

export interface TapMatch {
  label: string;
  slug: string;
  /** 그 나사가 요구하는 탭 드릴 지름 */
  tapDrill: number;
  diff: number;
}

export interface DrillFacts {
  bit: Bit;
  slug: string;
  /** 인치로 적은 지름 */
  inch: number;
  /** 약분한 분수 이름 — 인치 계열에만 있다 */
  reduced: string | null;
  /** 단면적(mm²) */
  area: number;
  /** 다른 계열에서 가장 가까운 비트 */
  near: Near[];
  /** 이 비트로 탭을 낼 수 있는 미터 나사 */
  taps: TapMatch[];
  smaller: Bit | null;
  larger: Bit | null;
}

/** 인치 계열의 이름을 약분한다 — 16/64는 1/4이다 */
export const reduceFraction = (name: string): string | null => {
  const m = /^([0-9]+)\/64$/.exec(name);
  if (!m) return null;
  const n = Number(m[1]);
  const g = gcd(n, 64);
  return `${n / g}/${64 / g}`;
};

export function drillFacts(b: Bit): DrillFacts {
  const sorted = [...BITS].sort((x, y) => x.mm - y.mm);
  const i = sorted.findIndex(x => slugOf(x) === slugOf(b));

  return {
    bit: b,
    slug: slugOf(b),
    inch: round(b.mm / 25.4, 4),
    reduced: reduceFraction(b.name),
    area: round((Math.PI / 4) * b.mm * b.mm, 2),
    near: KINDS.filter(k => k !== b.kind).map(k => {
      const best = BITS.filter(o => o.kind === k)
        .reduce((a, o) => (Math.abs(o.mm - b.mm) < Math.abs(a.mm - b.mm) ? o : a));
      return { kind: k, name: best.name, mm: best.mm, slug: slugOf(best), diff: round(best.mm - b.mm, 3) };
    }),
    // 탭 드릴은 외경 − 피치라, 그 값과 0.15mm 안에서 맞는 나사를 고른다
    taps: SCREWS.map(s => ({ s, tap: screwFacts(s).tapDrill }))
      .filter(({ tap }) => Math.abs(tap - b.mm) <= 0.15)
      .slice(0, 6)
      .map(({ s, tap }) => ({
        label: screwLabel(s),
        slug: screwSlug(s),
        tapDrill: tap,
        diff: round(tap - b.mm, 3),
      })),
    smaller: i > 0 ? sorted[i - 1] : null,
    larger: i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : null,
  };
}

/** 한 계열의 비트를 지름 순으로 */
export const ofKind = (kind: Kind): Bit[] =>
  BITS.filter(b => b.kind === kind).sort((a, b) => a.mm - b.mm);

/** 지름 순으로 늘어놓은 전체 */
export const byDiameter = (): Bit[] => [...BITS].sort((a, b) => a.mm - b.mm);
