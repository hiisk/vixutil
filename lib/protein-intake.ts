/**
 * 하루 단백질 권장 섭취량 — 체중과 활동 수준으로 계산한다.
 *
 * 기존 칼로리·물 섭취량 계산기와 같은 결의 건강 도구다. 단백질은 목표(체중 유지,
 * 근육 증가, 감량 중 근육 보존)에 따라 권장량이 달라서, 하나의 숫자보다 범위로
 * 보여주는 편이 정직하다.
 *
 * 근거: 좌식 성인 0.8 g/kg(RDA)에서 시작해, 활동량과 근력운동 여부에 따라 올라간다.
 * 근육 증가·감량기 근육 보존 구간(1.6~2.2)은 스포츠영양학에서 널리 인용되는 범위다.
 * 신장질환이 있으면 단백질 제한이 필요할 수 있어, 이 계산은 건강한 성인 기준이다.
 */

export interface ProteinLevel {
  id: string;
  label: string;
  desc: string;
  /** g/kg 하한·상한 */
  min: number;
  max: number;
}

export const PROTEIN_LEVELS: ProteinLevel[] = [
  { id: 'sedentary', label: '좌식·비운동', desc: '운동을 거의 하지 않음', min: 0.8, max: 1.0 },
  { id: 'light',     label: '가벼운 활동', desc: '주 1~3회 가벼운 운동',  min: 1.0, max: 1.4 },
  { id: 'active',    label: '규칙적 운동', desc: '주 3~5회 유산소·근력',  min: 1.4, max: 1.8 },
  { id: 'strength',  label: '근력 운동·증량', desc: '근육을 늘리려는 사람', min: 1.6, max: 2.2 },
  { id: 'cut',       label: '감량 중 근육 보존', desc: '다이어트하며 근손실 방지', min: 1.8, max: 2.4 },
];

export interface ProteinInput {
  weightKg: number;
  levelId: string;
}

export interface ProteinResult {
  level: ProteinLevel;
  /** 하루 권장 단백질 하한 (g) */
  minGrams: number;
  /** 하루 권장 단백질 상한 (g) */
  maxGrams: number;
  /** 중앙값 (g) — 대표값 */
  midGrams: number;
  /** 끼니당 참고량(하루 3끼 기준 중앙값) */
  perMeal: number;
}

export function calcProtein({ weightKg, levelId }: ProteinInput): ProteinResult {
  const weight = Math.max(0, weightKg);
  const level = PROTEIN_LEVELS.find(l => l.id === levelId) ?? PROTEIN_LEVELS[0];

  const minGrams = Math.round(weight * level.min);
  const maxGrams = Math.round(weight * level.max);
  const midGrams = Math.round((minGrams + maxGrams) / 2);

  return {
    level,
    minGrams,
    maxGrams,
    midGrams,
    perMeal: Math.round(midGrams / 3),
  };
}

/** 흔한 식품의 단백질 함량 — 권장량을 음식으로 환산해 보여주기 위한 참고표 */
export const PROTEIN_FOODS: { name: string; grams: number; per: string }[] = [
  { name: '닭가슴살', grams: 23, per: '100g' },
  { name: '계란',     grams: 6,  per: '1개' },
  { name: '두부',     grams: 8,  per: '반 모(150g)' },
  { name: '소고기',   grams: 26, per: '100g' },
  { name: '연어',     grams: 20, per: '100g' },
  { name: '우유',     grams: 6,  per: '1컵(200mL)' },
  { name: '그릭요거트', grams: 10, per: '100g' },
  { name: '단백질 보충제', grams: 24, per: '1스쿱' },
];
