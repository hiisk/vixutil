/**
 * 표준체중.
 *
 * 공식이 넷인데 전부 1960~80년대 미국에서 **약 용량을 계산하려고** 만든 것이다.
 * 「이 체중이어야 건강하다」는 뜻이 아니라 「이 키의 평균은 대개 이쯤」에 가깝다.
 * 그래서 네 값을 나란히 두고, 실제로 쓰이는 판단 기준인 **BMI 범위**를 함께
 * 낸다 — 하나의 수보다 범위가 정직하다.
 *
 * 넷 다 152.4cm(5피트)를 기준으로 인치마다 얼마씩 더하는 꼴이라, 그보다
 * 작은 키에서는 값이 빠르게 무너진다. 그 구간은 화면에서 경고한다.
 */

export type Sex = 'male' | 'female';

const BASE_CM = 152.4; // 5피트
const CM_PER_INCH = 2.54;

export const IW_FORMULAS = [
  {
    id: 'devine',
    label: '디바인',
    year: 1974,
    note: '약 용량 계산용으로 만들어져 지금도 임상에서 가장 널리 쓰인다.',
    base: { male: 50, female: 45.5 },
    perInch: { male: 2.3, female: 2.3 },
  },
  {
    id: 'robinson',
    label: '로빈슨',
    year: 1983,
    note: '디바인을 실측으로 다듬은 것. 대체로 조금 낮게 나온다.',
    base: { male: 52, female: 49 },
    perInch: { male: 1.9, female: 1.7 },
  },
  {
    id: 'miller',
    label: '밀러',
    year: 1983,
    note: '키가 커질수록 가장 완만하게 는다.',
    base: { male: 56.2, female: 53.1 },
    perInch: { male: 1.41, female: 1.36 },
  },
  {
    id: 'hamwi',
    label: '햄위',
    year: 1964,
    note: '가장 오래됐고 남녀 차를 가장 크게 본다.',
    base: { male: 48, female: 45.5 },
    perInch: { male: 2.7, female: 2.2 },
  },
] as const;

export interface IdealWeightResult {
  byFormula: { id: string; label: string; note: string; value: number }[];
  /** 네 값의 평균 */
  average: number;
  /** BMI 18.5~24.9에 해당하는 체중 범위 */
  healthyMin: number;
  healthyMax: number;
  /** 넣은 체중이 있으면 지금 BMI와 차이 */
  current?: { bmi: number; diffToAverage: number; inRange: boolean };
  heightCm: number;
  sex: Sex;
  /** 공식이 만들어진 기준 키(152.4cm)보다 작은가 — 값이 흔들리는 구간 */
  belowBase: boolean;
}

export function calcIdealWeight(heightCm: number, sex: Sex, currentKg?: number): IdealWeightResult | null {
  if (!(heightCm > 0)) return null;

  const inches = (heightCm - BASE_CM) / CM_PER_INCH;
  const byFormula = IW_FORMULAS.map(f => ({
    id: f.id,
    label: f.label,
    note: f.note,
    value: Math.round((f.base[sex] + f.perInch[sex] * inches) * 10) / 10,
  })).filter(x => x.value > 0);

  if (!byFormula.length) return null;

  const average = Math.round((byFormula.reduce((s, x) => s + x.value, 0) / byFormula.length) * 10) / 10;
  const m = heightCm / 100;
  const healthyMin = Math.round(18.5 * m * m * 10) / 10;
  const healthyMax = Math.round(24.9 * m * m * 10) / 10;

  const current = currentKg && currentKg > 0
    ? {
        bmi: Math.round((currentKg / (m * m)) * 10) / 10,
        diffToAverage: Math.round((currentKg - average) * 10) / 10,
        inRange: currentKg >= healthyMin && currentKg <= healthyMax,
      }
    : undefined;

  return { byFormula, average, healthyMin, healthyMax, current, heightCm, sex, belowBase: heightCm < BASE_CM };
}
