/**
 * 내신 — 석차등급과 평균 등급.
 *
 * ── 왜 셈이 여기 있고 페이지에 없는가 ──────────────────────────
 * 계산기 페이지(`app/(ko)/calculator/<슬러그>/page.tsx`)는 'use client'라서 node가
 * 불러올 수 없다.
 * 그래서 페이지 본문에 박힌 셈은 **어떤 검사도 보지 못한다.** 이 저장소에서
 * 그 구조 때문에 취득세 계산기가 100배 틀린 값을 내면서 검사 3,013개를 통과한
 * 적이 있다(7억 주택의 취득세를 32억으로 냈다, lib/holding-tax.ts 머리말).
 * 내신은 그 사고가 더 조용하다 — 등급은 1에서 9 사이의 작은 수라서 한 등급이
 * 밀려도 화면상 이상해 보이지 않는다. 그래서 셈 전부를 이 파일에 두고
 * 페이지는 부르기만 한다.
 *
 * ── 석차등급을 정하는 규칙 ────────────────────────────────────
 * 내신 등급은 원점수가 아니라 **석차의 누적 비율**로 정해진다. 90점을 받아도
 * 다 90점을 받았으면 1등급이 아니고, 60점이어도 그 과목에서 상위 4% 안이면
 * 1등급이다. 그래서 이 파일이 받는 것은 점수가 아니라 석차와 수강자수다.
 *
 * 동석차(같은 등수가 여럿)는 **중간석차**로 센다 —
 *
 *     중간석차 = 석차 + (동석차 인원수 − 1) / 2
 *
 * 묶음이 차지한 등수들의 가운데다. 5등이 3명이면 그 세 명이 5·6·7등 자리를
 * 차지하므로 중간석차는 6이 된다. 세 명 모두 같은 등급을 받는데, 그 등급이
 * 맨 앞(5등)도 맨 뒤(7등)도 아닌 가운데로 정해진다. 이 규칙 때문에 실제로
 * 등급이 갈린다 — 100명 중 3등이 세 명이면 5등 자리까지 1등급이 되고,
 * 반대로 4등이 두 명이면 중간석차가 4.5가 되어 4등이 1등급을 놓친다.
 *
 * 경계는 **이하**다. 100명 정원이면 4등까지가 1등급이고 5등은 2등급이다.
 * 그래서 비율을 실수로 나눠 견주지 않고 정수로 교차 곱해 본다 — 4/100×100이
 * 부동소수점에서 4보다 아주 조금 크게 나오면 4등이 2등급으로 밀린다.
 * 중간석차는 .5가 붙을 수 있으므로 분자·분모에 2를 곱해 정수로 만든다.
 *
 * ── 평균 등급은 단위수 가중평균이다 ───────────────────────────
 * 사람들이 실제로 찾는 것은 과목별 등급을 모은 **평균 등급**이다. 이것은
 * 단순평균이 아니라 **이수단위(학점) 가중평균**이다 —
 *
 *     평균 등급 = Σ(과목 등급 × 이수단위) / Σ(이수단위)
 *
 * 4단위 국어와 1단위 체육을 같은 무게로 세면 안 된다. 체육 9등급 하나가
 * 국어 1등급을 상쇄해 버린다(단순평균 5.0 대 가중평균 2.6). 단순평균도 함께
 * 내놓지만 그것은 **얼마나 틀리는지 보여 주기 위한 것**이고, 결과로 읽을
 * 값이 아니다.
 *
 * ── 이 파일이 하지 않는 것 ────────────────────────────────────
 * 학교·대학마다 달라서 지어낼 수 없는 것들은 넣지 않았다.
 *
 *   · 학년별 반영 비율 (1학년 20%·2학년 40%·3학년 40% 같은 것) — 대학마다 다르다
 *   · 계열·교과별 가중치 (자연계 수학·과학 가중 같은 것) — 대학마다 다르다
 *   · 대학별 내신 환산점수식 — 대학·전형마다 다르다
 *   · 성취도(A~E)와 등급의 대응 — 성취도는 절대평가라 석차등급과 다른 축이다
 *   · 어떤 과목이 등급을 받고 어떤 과목이 성취도만 받는지 — 학교 교육과정이 정한다
 *
 * 반영 교과를 고르는 것은 **입력**으로 뺐다(SubjectInput.include). 어느 교과를
 * 넣느냐는 대학이 정하는 것이고, 여기서 정할 일이 아니다.
 */

/** 등급을 몇 칸으로 가르나 */
export type GradeSystem = 5 | 9;

export const SYSTEMS: readonly GradeSystem[] = [9, 5];

/**
 * 등급별 누적 비율 상한(%). 이 비율 **이하**면 그 등급이다.
 *
 * 9등급제는 4·11·23·40·60·77·89·96%로 널리 공표된 값이고, 5등급제는
 * 10·34·66·90%다. 두 표 모두 마지막 칸이 100이어야 한다 — 꼴등까지 어딘가에
 * 들어가야 하고, 100이 없으면 정원 끝의 학생이 표 밖으로 떨어진다.
 */
export const CUTS: Record<GradeSystem, readonly number[]> = {
  9: [4, 11, 23, 40, 60, 77, 89, 96, 100],
  5: [10, 34, 66, 90, 100],
};

/**
 * 누적 비율 num/den이 몇 등급인가 — 등급을 정하는 규칙은 여기 한 곳에만 있다.
 *
 * 나눗셈을 하지 않고 교차 곱으로 견준다 — 정수끼리라 오차가 끼어들 자리가 없다.
 *
 * 다만 정직하게 적어 두면: `num/den*100 <= cut`으로 적어도 **수강자수 3,000명까지
 * 동석차 3명 이내에서는 한 자리도 어긋나지 않는다**(2026-08-13에 전수로 확인).
 * 그러니 이 선택은 실제 버그를 막은 것이 아니라 값이 싸서 택한 예방이다.
 * 검사도 이 기법을 지키지 않는다 — 경계 자체(`<=`를 `<`로 바꾸거나 floor를
 * round로 바꾸는 것)를 지키고, 그 흠은 각각 검사 셋이 잡는다.
 */
function gradeOfRatio(num: number, den: number, system: GradeSystem): number {
  const cuts = CUTS[system];
  for (let i = 0; i < cuts.length; i++) {
    if (num * 100 <= cuts[i] * den) return i + 1;
  }
  return cuts.length;
}

/** 상위 누적 비율(%)이 몇 등급인가. 표준점수로 어림한 위치를 등급으로 읽을 때 쓴다 */
export const gradeOfPercent = (percent: number, system: GradeSystem = 9): number =>
  gradeOfRatio(percent, 100, system);

/**
 * 그 등급을 받는 **마지막 등수**. 동석차가 없는 경우다.
 *
 * 0이면 그 인원에서는 그 등급이 아예 나오지 않는다 — 20명 과목에서
 * 4%는 0.8명이라 1등을 해도 1등급이 없다.
 */
export function lastRankFor(grade: number, total: number, system: GradeSystem = 9): number {
  const cuts = CUTS[system];
  if (!Number.isInteger(total) || total < 1 || grade < 1) return 0;
  if (grade >= cuts.length) return total;
  return Math.floor((cuts[grade - 1] * total) / 100);
}

export interface RankQuery {
  /** 석차. 동석차라면 그 묶음의 첫 등수 */
  rank: number;
  /** 수강자수(재적수) */
  total: number;
  /** 동석차 인원수. 나 혼자면 1 */
  tied?: number;
  system?: GradeSystem;
}

export interface RankGrade {
  system: GradeSystem;
  rank: number;
  total: number;
  tied: number;
  /** 동석차 묶음이 차지한 등수들의 가운데 */
  midRank: number;
  /** 중간석차 백분율(%) */
  percent: number;
  grade: number;
  /** 그 등급의 누적 비율 상한(%) */
  cut: number;
  /**
   * 한 등급 위를 받으려면 들어야 하는 등수. 이미 1등급이면 null,
   * 0이면 그 인원에서는 위 등급이 나오지 않는다.
   */
  nextRank: number | null;
}

/** 석차 → 석차등급. 입력이 말이 안 되면 null */
export function rankToGrade({ rank, total, tied = 1, system = 9 }: RankQuery): RankGrade | null {
  if (!Number.isInteger(rank) || !Number.isInteger(total) || !Number.isInteger(tied)) return null;
  if (total < 1 || rank < 1 || tied < 1) return null;
  // 동석차 묶음이 정원을 넘어갈 수는 없다
  if (rank + tied - 1 > total) return null;

  // 중간석차의 두 배 — .5가 붙어도 정수로 남으므로 경계를 정확히 견줄 수 있다
  const midRank2 = 2 * rank + tied - 1;
  const grade = gradeOfRatio(midRank2, 2 * total, system);

  return {
    system, rank, total, tied,
    midRank: midRank2 / 2,
    percent: (midRank2 * 100) / (2 * total),
    grade,
    cut: CUTS[system][grade - 1],
    nextRank: grade === 1 ? null : lastRankFor(grade - 1, total, system),
  };
}

export interface GradeBand {
  grade: number;
  /** 누적 비율 상한(%) */
  cut: number;
  /** 이 등급을 받는 첫 등수. 아무도 못 받으면 null */
  from: number | null;
  /** 마지막 등수 */
  to: number | null;
  /** 이 등급을 받는 인원 */
  count: number;
}

/**
 * 이 수강자수에서 몇 등까지가 몇 등급인가 — 등급 컷 표.
 *
 * 인원이 적으면 앞 등급이 통째로 비어 있게 되는데(count 0), 그것을 지우지
 * 않고 그대로 남긴다. "1등급이 없다"는 사실 자체가 소인원 과목에서 가장
 * 중요한 정보다.
 */
export function gradeBands(total: number, system: GradeSystem = 9): GradeBand[] {
  const cuts = CUTS[system];
  const bands: GradeBand[] = [];
  let prev = 0;
  for (let g = 1; g <= cuts.length; g++) {
    const to = lastRankFor(g, total, system);
    const count = to - prev;
    bands.push({
      grade: g,
      cut: cuts[g - 1],
      from: count > 0 ? prev + 1 : null,
      to: count > 0 ? to : null,
      count,
    });
    prev = to;
  }
  return bands;
}

export interface SubjectInput {
  name?: string;
  /** 이수단위(학점) */
  units: number;
  /** 석차등급 */
  grade: number;
  /** 교과. 어느 교과를 반영하느냐는 대학이 정하므로 묶어만 둔다 */
  group?: string;
  /** 평균에서 뺄 때 false. 기본은 넣는다 */
  include?: boolean;
}

export interface GroupAverage {
  group: string;
  count: number;
  units: number;
  average: number;
}

export interface AverageGrade {
  /** 반영한 과목 수 */
  count: number;
  /** 반영한 이수단위 합 */
  units: number;
  /** Σ(등급 × 단위수) */
  weightedSum: number;
  /** 단위수 가중평균 등급 — 이것이 내신 평균 등급이다 */
  average: number;
  /** 단순평균 — 얼마나 틀리는지 보여 주기 위한 값이다 */
  plainAverage: number;
  /** 가중평균 − 단순평균. 0이 아니면 단순평균으로 내면 그만큼 어긋난다 */
  gap: number;
  /** 교과별 가중평균 */
  groups: GroupAverage[];
  /** 반영에서 뺀 단위수 합 */
  excludedUnits: number;
}

const usable = (s: SubjectInput): boolean =>
  Number.isFinite(s.units) && s.units > 0 && Number.isFinite(s.grade);

/** 과목별 등급 → 평균 등급. 반영할 과목이 없으면 null */
export function averageGrade(subjects: SubjectInput[]): AverageGrade | null {
  const used = subjects.filter(s => usable(s) && s.include !== false);
  if (used.length === 0) return null;

  const units = used.reduce((a, s) => a + s.units, 0);
  const weightedSum = used.reduce((a, s) => a + s.grade * s.units, 0);
  const average = weightedSum / units;
  const plainAverage = used.reduce((a, s) => a + s.grade, 0) / used.length;

  // 교과별로도 같은 가중평균을 낸다. 순서는 과목이 처음 나온 순서다
  const bucket = new Map<string, { count: number; units: number; sum: number }>();
  for (const s of used) {
    const key = s.group ?? '';
    const b = bucket.get(key) ?? { count: 0, units: 0, sum: 0 };
    b.count += 1;
    b.units += s.units;
    b.sum += s.grade * s.units;
    bucket.set(key, b);
  }

  return {
    count: used.length,
    units,
    weightedSum,
    average,
    plainAverage,
    gap: average - plainAverage,
    groups: [...bucket].map(([group, b]) => ({
      group, count: b.count, units: b.units, average: b.sum / b.units,
    })),
    excludedUnits: subjects
      .filter(s => usable(s) && s.include === false)
      .reduce((a, s) => a + s.units, 0),
  };
}

/**
 * 표준정규 누적분포 — Abramowitz & Stegun 7.1.26 기반 erf 근사(|오차| < 1.5e-7).
 *
 * 같은 근사가 lib/forecast.ts에도 있지만 그 파일은 879줄짜리 시세 예측
 * 모듈이다. 계산기 페이지는 클라이언트 컴포넌트라 import한 것이 그대로
 * 브라우저로 내려간다 — 여섯 줄을 아끼려고 879줄을 내려보낼 수는 없다.
 */
export function normalCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp(-x * x / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

export interface ScoreQuery {
  /** 원점수 */
  raw: number;
  /** 과목 평균 */
  mean: number;
  /** 표준편차 */
  sd: number;
  system?: GradeSystem;
}

export interface ScoreStanding {
  system: GradeSystem;
  /** 표준점수 Z = (원점수 − 평균) / 표준편차 */
  z: number;
  /** 백분위 — 나보다 점수가 낮은 학생의 비율(%) */
  percentile: number;
  /** 상위 몇 %인가 */
  topPercent: number;
  /**
   * 정규분포를 가정했을 때의 **추정** 등급. 성적표에 적힌 석차등급이 아니다 —
   * 한 반의 점수 분포는 정규분포가 아니고, 동점자가 많으면 크게 어긋난다.
   */
  estimatedGrade: number;
}

/** 원점수·평균·표준편차 → 표준점수와 백분위. 표준편차가 0 이하면 null */
export function standing({ raw, mean, sd, system = 9 }: ScoreQuery): ScoreStanding | null {
  if (!Number.isFinite(raw) || !Number.isFinite(mean) || !Number.isFinite(sd) || sd <= 0) return null;
  const z = (raw - mean) / sd;
  const percentile = normalCdf(z) * 100;
  const topPercent = 100 - percentile;
  return { system, z, percentile, topPercent, estimatedGrade: gradeOfPercent(topPercent, system) };
}
