/**
 * 1RM — 한 번에 들 수 있는 최대 무게.
 *
 * 실제로 1회 한계를 재는 것은 위험하고 회복도 오래 걸려서, 여러 번 든 무게로
 * 되짚는 공식을 쓴다. 공식이 여럿이고 서로 몇 kg씩 다르므로 **하나만 내면
 * 그 수가 정답처럼 보인다** — 셋을 나란히 두고 가운데를 권장값으로 삼는다.
 *
 * 횟수가 늘수록 공식끼리 벌어진다. 10회를 넘기면 오차가 커서 그 사실을
 * 화면에 적어 준다.
 */

export const RM_FORMULAS = [
  {
    id: 'epley',
    label: '에플리',
    note: '가장 널리 쓰인다. 횟수가 많을수록 후하게 나온다.',
    fn: (w: number, r: number) => w * (1 + r / 30),
  },
  {
    id: 'brzycki',
    label: '브르지키',
    note: '10회 이하에서 정확하다는 평이 많다. 37회에서 무너진다.',
    fn: (w: number, r: number) => (r >= 37 ? NaN : w * 36 / (37 - r)),
  },
  {
    id: 'lombardi',
    label: '롬바르디',
    note: '거듭제곱 꼴이라 고반복에서 가장 보수적이다.',
    fn: (w: number, r: number) => w * Math.pow(r, 0.10),
  },
] as const;

/** 훈련에서 실제로 쓰는 구간 — %와 그 무게로 보통 가능한 횟수 */
export const RM_PERCENTS = [
  { pct: 100, reps: '1회', use: '최대 시도' },
  { pct: 95, reps: '2회', use: '최대 근력' },
  { pct: 90, reps: '3~4회', use: '근력' },
  { pct: 85, reps: '5~6회', use: '근력' },
  { pct: 80, reps: '7~8회', use: '근력·근비대' },
  { pct: 75, reps: '9~10회', use: '근비대' },
  { pct: 70, reps: '11~12회', use: '근비대' },
  { pct: 65, reps: '13~15회', use: '근지구력' },
  { pct: 60, reps: '16~20회', use: '근지구력' },
  { pct: 50, reps: '20회 이상', use: '몸풀기' },
] as const;

export interface OneRmResult {
  /** 공식별 값 — NaN인 것은 뺀다 */
  byFormula: { id: string; label: string; note: string; value: number }[];
  /** 권장값 — 공식들의 중앙값 */
  best: number;
  /** 낮은 값과 높은 값 */
  min: number;
  max: number;
  /** 횟수가 많아 오차가 커지는 구간인가 */
  wideRange: boolean;
  reps: number;
  weight: number;
}

export function calcOneRm(weight: number, reps: number): OneRmResult | null {
  if (!(weight > 0) || !(reps >= 1)) return null;

  /* 1회를 넣었으면 그 무게가 곧 1RM이다 — 공식을 태우면 셋 다 같은 값이 나오지만
     «에플리 100kg, 브르지키 100kg»처럼 늘어놓는 것은 읽는 사람을 헷갈리게 한다 */
  const byFormula = RM_FORMULAS
    .map(f => ({ id: f.id, label: f.label, note: f.note, value: f.fn(weight, reps) }))
    .filter(x => Number.isFinite(x.value) && x.value > 0)
    .map(x => ({ ...x, value: Math.round(x.value * 10) / 10 }));

  if (!byFormula.length) return null;

  const sorted = [...byFormula].map(x => x.value).sort((a, b) => a - b);
  const mid = sorted.length % 2
    ? sorted[(sorted.length - 1) / 2]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;

  return {
    byFormula,
    best: Math.round(mid * 10) / 10,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    wideRange: reps > 10,
    reps,
    weight,
  };
}

/** 1RM의 몇 %가 몇 kg인지 — 2.5kg 단위로 떨어뜨린다(원판이 그 단위다) */
export function plateRound(kg: number): number {
  return Math.round(kg / 2.5) * 2.5;
}
