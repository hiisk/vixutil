/**
 * 감가상각 — 해가 지날수록 얼마가 남는가.
 *
 * 차는 사는 순간부터 값이 떨어지고, 떨어지는 폭은 앞쪽 해가 훨씬 크다.
 * 그래서 정액이 아니라 **정률**로 보는 것이 실제에 가깝다.
 *
 *   정률: 잔존가치 = 구매가 × (1 − 연 감가율)^연수
 *   정액: 잔존가치 = 구매가 − (구매가 − 잔존) × 연수 ÷ 수명
 *
 * 연 감가율은 차종·주행거리·사고 이력에 따라 크게 다르므로 입력받는다.
 * "평균 감가율"을 박아 두면 그 숫자가 답처럼 보이는데, 인기 차종과 그렇지
 * 않은 차종이 두 배 넘게 갈린다.
 */

export interface Year {
  /** 몇 해째 (0은 산 날) */
  year: number;
  /** 그해 말의 잔존가치(원) */
  value: number;
  /** 그해에 떨어진 값(원) */
  lost: number;
  /** 산 값 대비 남은 비율(0~1) */
  ratio: number;
}

/** 정률 — 남은 값에 해마다 같은 비율이 걸린다 */
export const decliningValue = (price: number, rate: number, years: number): number =>
  price * (1 - rate) ** years;

/** 정액 — 해마다 같은 금액이 떨어진다 */
export const straightValue = (price: number, salvage: number, life: number, years: number): number =>
  life <= 0 ? price : price - ((price - salvage) * Math.min(years, life)) / life;

export function decliningTable(price: number, rate: number, years: number): Year[] {
  const out: Year[] = [];
  for (let y = 0; y <= years; y++) {
    const value = decliningValue(price, rate, y);
    out.push({
      year: y,
      value,
      lost: y === 0 ? 0 : decliningValue(price, rate, y - 1) - value,
      ratio: price > 0 ? value / price : 0,
    });
  }
  return out;
}

/**
 * 값이 절반이 되는 데 걸리는 해.
 *
 *   (1 − r)^n = 0.5  →  n = ln 0.5 ÷ ln(1 − r)
 *
 * 감가율이 0이면 영원히 안 줄어드므로 null을 낸다.
 */
export const halfLife = (rate: number): number | null =>
  rate <= 0 || rate >= 1 ? null : Math.log(0.5) / Math.log(1 - rate);
