/**
 * 도형을 124종으로 늘리며 생긴 용어(3언어).
 *
 * 좌표기하(직선의 기울기·절편·교점)와 위경도가 새로 들어왔다. 기존 x₁·y₁을
 * 그대로 쓰되, 직선을 나타내는 두 값과 위도·경도만 여기 더한다.
 */
import type { Term } from './terms.ts';

export const GEO3_TERMS: Record<string, Term> = {
  /* 좌표기하 */
  lineSlope: { ko: '기울기', en: 'Slope' },
  lineIntercept: { ko: 'y절편', en: 'y-intercept' },
  slopeB: { ko: '둘째 직선 기울기', en: 'Second slope' },
  interceptB: { ko: '둘째 직선 y절편', en: 'Second y-intercept' },
  x4: { ko: 'x₄', en: 'x₄' },
  y4: { ko: 'y₄', en: 'y₄' },

  /* 위경도 */
  lat1: { ko: '출발 위도', en: 'Start latitude' },
  lon1: { ko: '출발 경도', en: 'Start longitude' },
  lat2: { ko: '도착 위도', en: 'End latitude' },
  lon2: { ko: '도착 경도', en: 'End longitude' },

  /* 길이·비율 */
  totalLen: { ko: '전체 길이', en: 'Total length' },
  longPart: { ko: '긴 쪽', en: 'Longer part' },
  shortPart: { ko: '짧은 쪽', en: 'Shorter part' },
  overlapPct: { ko: '겹친 비율', en: 'Overlap share' },
  wound: { ko: '감긴 길이', en: 'Wound length' },
  slopeRatio: { ko: '경사 1:n의 n', en: 'Slope 1:n' },
};
