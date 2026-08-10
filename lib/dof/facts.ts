/**
 * 초점거리 하나와 조리개 하나가 만드는 심도.
 *
 * 렌즈가 정말로 초점을 맞춘 면은 하나뿐이다. 그 앞뒤도 맞아 **보이는** 것은
 * 흐려진 점이 아직 점으로 보일 만큼만 번졌기 때문이고, 그 한계가 허용
 * 착란원(c)이다. 그래서 심도는 렌즈의 성질이 아니라 세 값의 관계로 정해진다.
 *
 *   과초점거리 H = f² ÷ (N × c) + f
 *
 * 여기에 초점을 맞추면 H의 절반부터 무한대까지가 맞아 보인다. 피사체가 s에
 * 있을 때의 앞뒤 한계는 H에서 바로 나온다.
 *
 *   가까운 쪽 = s(H − f) ÷ (H + s − 2f)
 *   먼 쪽     = s(H − f) ÷ (H − s)        (s ≥ H면 무한대)
 *
 * 길이는 전부 mm로 셈하고 화면에 낼 때만 m로 바꾼다 — 섞으면 f를 빼는 자리에서
 * 어긋난다.
 */
import {
  APERTURES, CELLS, FOCALS, FORMATS, SUBJECTS,
  type Cell, formatOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 무한대는 숫자로 두지 않는다 — 화면과 검사가 함께 알아보게 null로 낸다 */
export type Far = number | null;

export interface Span {
  /** 피사체 거리(m) */
  subject: number;
  /** 맞아 보이기 시작하는 거리(m) */
  near: number;
  /** 맞아 보이는 끝(m). 무한대면 null */
  far: Far;
  /** 앞뒤 폭(m). 무한대면 null */
  depth: Far;
}

export interface FormatDepth {
  key: string;
  /** 그 판형의 과초점거리(m) */
  hyperfocal: number;
  /** 그 판형에서 2m 피사체의 앞뒤 폭(m) */
  atTwoMetres: Far;
}

export interface Neighbour {
  slug: string;
  focal: number;
  aperture: number;
}

export interface DofFacts {
  cell: Cell;
  slug: string;
  /** 35mm 판형 과초점거리(m) — 여기에 맞추면 그 절반부터 무한대까지 맞는다 */
  hyperfocal: number;
  /** 과초점거리에 맞췄을 때 맞기 시작하는 거리(m) */
  hyperfocalNear: number;
  /** 피사체 거리별 앞뒤 한계 */
  spans: Span[];
  /** 판형별 과초점거리 */
  formats: FormatDepth[];
  /** 이 렌즈가 한 칸 조였을 때의 심도 배수 — 조리개는 √2씩 간다 */
  wider: Neighbour | null;
  tighter: Neighbour | null;
  shorter: Neighbour | null;
  longer: Neighbour | null;
}

/** 과초점거리(mm) */
export const hyperfocalMm = (focal: number, aperture: number, coc: number): number =>
  (focal * focal) / (aperture * coc) + focal;

/** 피사체 s(mm)에서 가까운 쪽 한계(mm) */
export const nearMm = (s: number, h: number, focal: number): number =>
  (s * (h - focal)) / (h + s - 2 * focal);

/** 피사체 s(mm)에서 먼 쪽 한계(mm). 무한대면 null */
export const farMm = (s: number, h: number, focal: number): number | null =>
  s >= h ? null : (s * (h - focal)) / (h - s);

const M = 1000;

function spanAt(subjectM: number, hMm: number, focal: number): Span {
  const s = subjectM * M;
  const near = nearMm(s, hMm, focal);
  const far = farMm(s, hMm, focal);
  return {
    subject: subjectM,
    near: round(near / M, 3),
    far: far === null ? null : round(far / M, 2),
    depth: far === null ? null : round((far - near) / M, 3),
  };
}

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function dofFacts(c: Cell): DofFacts {
  if (!FOCALS.includes(c.focal)) throw new Error(`모르는 초점거리: ${c.focal}`);
  if (!APERTURES.includes(c.aperture)) throw new Error(`모르는 조리개: ${c.aperture}`);

  const ff = formatOf('ff')!;
  const h = hyperfocalMm(c.focal, c.aperture, ff.coc);
  const fi = FOCALS.indexOf(c.focal);
  const ai = APERTURES.indexOf(c.aperture);
  const near = (focal: number, aperture: number): Neighbour => ({ slug: slugOf({ focal, aperture }), focal, aperture });
  const fStep = (by: number) => step(FOCALS, fi, by);
  const aStep = (by: number) => step(APERTURES, ai, by);

  return {
    cell: c,
    slug: slugOf(c),
    hyperfocal: round(h / M),
    // 과초점거리에 맞추면 그 절반부터 맞는다 — 위 식에 s = H를 넣은 결과다
    hyperfocalNear: round(nearMm(h, h, c.focal) / M),
    spans: SUBJECTS.map(s => spanAt(s, h, c.focal)),
    formats: FORMATS.map(fmt => {
      const hh = hyperfocalMm(c.focal, c.aperture, fmt.coc);
      return {
        key: fmt.key,
        hyperfocal: round(hh / M),
        atTwoMetres: spanAt(2, hh, c.focal).depth,
      };
    }),
    // 조리개는 수가 작을수록 열린 것이다 — 열면 심도가 얕아진다
    wider: aStep(-1) === null ? null : near(c.focal, aStep(-1) as number),
    tighter: aStep(1) === null ? null : near(c.focal, aStep(1) as number),
    shorter: fStep(-1) === null ? null : near(fStep(-1) as number, c.aperture),
    longer: fStep(1) === null ? null : near(fStep(1) as number, c.aperture),
  };
}

/** 같은 초점거리의 한 줄 */
export const atFocal = (focal: number): Cell[] => APERTURES.map(aperture => ({ focal, aperture }));

/** 같은 조리개의 한 줄 */
export const atAperture = (aperture: number): Cell[] => CELLS.filter(c => c.aperture === aperture);
