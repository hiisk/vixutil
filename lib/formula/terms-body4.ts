/**
 * 몸 섹션 130종으로 늘리며 생긴 용어(3언어).
 *
 * 빌려 쓸 수 있는 것은 빌렸다 — 끝 심박은 peakHr('운동 직후 심박'), 운동 중 마신
 * 물은 drankMl, 제지방량은 leanMass, 나이 차이는 diff를 그대로 쓴다. 여기 남은
 * 것은 빌리면 뜻이 어긋나는 것들이다: 땀 검사의 '운동 전 체중'은 weightBefore
 * ('이전 체중')와 재는 시점이 다르고, 임신 주수는 birthWeeks('출생 주수')가
 * 아니다.
 */
import type { Term } from './terms.ts';

export const BODY4_TERMS: Record<string, Term> = {
  /* 임신 중 체중 증가 — IOM/NAM 구간 */
  preBmi: { ko: '임신 전 BMI', en: 'Pre-pregnancy BMI' },
  gestWeek: { ko: '임신 주수', en: 'Weeks pregnant' },
  gainNow: { ko: '지금까지 권장 증가', en: 'Recommended gain by now' },
  gainNowLow: { ko: '지금 기준 하한', en: 'Lower bound now' },
  gainNowHigh: { ko: '지금 기준 상한', en: 'Upper bound now' },
  gainTotalLow: { ko: '만삭까지 하한', en: 'Full-term minimum' },
  gainTotalHigh: { ko: '만삭까지 상한', en: 'Full-term maximum' },

  /* 체수분 */
  tbw: { ko: '총 체수분', en: 'Total body water' },
  tbwPct: { ko: '체중 대비 수분', en: 'Water as share of weight' },

  /* 대사 나이 */
  metaAge: { ko: '대사 나이', en: 'Metabolic age' },

  /* 걸음 → 거리 */
  distanceMi: { ko: '거리(마일)', en: 'Distance (miles)' },
  strideEst: { ko: '키로 어림한 보폭', en: 'Stride estimated from height' },
  stepsPerKm: { ko: '1km당 걸음 수', en: 'Steps per km' },

  /* 록포트 걷기 검사 */
  mileWalkMin: { ko: '1마일 걷기 기록', en: '1-mile walk time' },

  /* 허리둘레 기준선 */
  waistLimit: { ko: '해당 기준선', en: 'Threshold that applies' },
  toThreshold: { ko: '기준선과의 차이', en: 'Gap to the cut-off' },

  /* 땀으로 잃은 체중 비율 */
  weightPreEx: { ko: '운동 전 체중(kg)', en: 'Weight before exercise (kg)' },
  weightPostEx: { ko: '운동 후 체중(kg)', en: 'Weight after exercise (kg)' },
  bodyLossPct: { ko: '체중 손실률', en: 'Body mass lost' },
  sweatTotalMl: { ko: '총 땀 손실', en: 'Total sweat loss' },
  rehydrateMl: { ko: '보충할 수분', en: 'Fluid to replace' },

  /* 악력 */
  gripKg: { ko: '악력(kg)', en: 'Grip strength (kg)' },
  gripRatio: { ko: '체중당 악력', en: 'Grip per kg of body weight' },
};

export const BODY4_UNITS: Record<string, Term> = {
  mile: { ko: '마일', en: 'mi' },
};
