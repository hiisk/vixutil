/**
 * 비율 섹션을 123종으로 늘리며 생긴 용어(3언어).
 *
 * 기존 용어로 되는 것은 새로 만들지 않았다 — 공동 비용 나누기는 '쓴 양'과
 * '총 수량'이 이미 있어서 한 칸도 더하지 않았다. 여기 있는 것은 라벨을 빌려 쓰면
 * 뜻이 어긋나는 것들뿐이다: 커피 물은 '권장 수분'이 아니고, 상대평가의 가감점은
 * '퍼센트포인트'가 아니다.
 */
import type { Term } from './terms.ts';

export const RATE2_TERMS: Record<string, Term> = {
  /* 수량 구간 가격 */
  tierQty: { ko: '할인 시작 수량', en: 'Discount starts at' },
  tierPrice: { ko: '구간 단가', en: 'Bulk unit price' },
  avgUnit: { ko: '실제 1개당', en: 'Actual per unit' },
  otherShare: { ko: '나머지 몫', en: 'The rest' },

  /* 배수·감소 */
  multiple: { ko: '배수', en: 'Multiple' },
  halfLife: { ko: '절반이 되는 기간', en: 'Time to halve' },

  /* 대출 */
  balanceLeft: { ko: '남은 원금', en: 'Balance left' },
  bracketLine: { ko: '구간 경계', en: 'Bracket threshold' },

  /* 커피·희석 */
  beanG: { ko: '원두', en: 'Coffee' },
  brewRatio: { ko: '물의 배수', en: 'Water ratio' },
  brewWater: { ko: '부을 물', en: 'Water to pour' },
  totalFold: { ko: '전체 희석 배수', en: 'Total dilution' },

  /* 점수 */
  curveShift: { ko: '가감점', en: 'Curve shift' },
};
