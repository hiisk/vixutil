/**
 * 몸 섹션을 122종으로 늘리며 생긴 용어(3언어).
 *
 * 이미 있는 것은 다시 만들지 않았다 — 혈압 분류는 수축기·이완기·평균 동맥압을
 * 그대로 쓰고, 신장 단계는 eGFR 하나면 된다. 여기 있는 것은 빌려 쓰면 뜻이
 * 어긋나는 것들이다: 감량 목표의 kg은 '운동 중 체중 감소'가 아니다.
 */
import type { Term } from './terms.ts';

export const BODY3_TERMS: Record<string, Term> = {
  /* 체형 */
  skinSum: { ko: '피부두께 세 곳 합', en: 'Skinfold total' },
  targetFat: { ko: '목표 체지방률', en: 'Target body fat' },
  lossKg: { ko: '줄여야 할 무게', en: 'Weight to lose' },

  /* 식단 */
  sugarAlc: { ko: '당알코올', en: 'Sugar alcohols' },
  netCarb: { ko: '순탄수', en: 'Net carbs' },
  giValue: { ko: '혈당지수(GI)', en: 'Glycaemic index' },
  glValue: { ko: '혈당부하(GL)', en: 'Glycaemic load' },
  foodG: { ko: '음식 무게', en: 'Food weight' },
  kcalPer100: { ko: '100g당 열량', en: 'Calories per 100 g' },
  gramPer200: { ko: '200kcal어치 무게', en: 'Grams for 200 kcal' },

  /* 운동 */
  powerW: { ko: '출력(W)', en: 'Power (W)' },
  wattPerKg: { ko: '체중당 출력', en: 'Watts per kg' },
  swim400: { ko: '400m 기록', en: '400 m time' },
  swim200: { ko: '200m 기록', en: '200 m time' },
  splitPct: { ko: '후반을 빠르게 할 비율', en: 'Negative split' },
  firstHalf: { ko: '전반 기록', en: 'First half' },
  secondHalf: { ko: '후반 기록', en: 'Second half' },

  /* 수면 */
  sleepMin: { ko: '권장 수면 최소', en: 'Sleep, minimum' },
  sleepMax: { ko: '권장 수면 최대', en: 'Sleep, maximum' },
};
