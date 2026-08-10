/**
 * 차량 유지비 — 한 해 동안 드는 돈을 한 자리에 모은다.
 *
 * 사람들이 차값만 보고 사는데, 실제로 나가는 돈은 **세금·보험·연료·정비가
 * 매년 되풀이되는 쪽**이 훨씬 크다. 그 합을 월과 km로 나눠 주면 "이 차를
 * 굴리는 데 한 달에 얼마"가 나온다.
 *
 * 연료비는 주행거리를 연비로 나눈 리터에 유가를 곱한 값이다 — /calculator/gas-cost가
 * 한 번의 주행을 보는 것과 달리 여기서는 한 해를 본다.
 *
 * 나머지 항목은 사람마다 달라 입력받는다. 보험료·정비비의 "평균"을 박아 두면
 * 그 숫자가 답처럼 보이는데, 차종과 나이에 따라 몇 배씩 다르다.
 */

export interface CarInput {
  /** 연간 주행거리(km) */
  km: number;
  /** 연비(km/L). 전기차면 0으로 두고 연료비를 직접 넣는다 */
  kmpl: number;
  /** 연료 단가(원/L) */
  fuelPrice: number;
  /** 자동차세(원/년) */
  tax: number;
  /** 보험료(원/년) */
  insurance: number;
  /** 정비·소모품(원/년) */
  maintenance: number;
  /** 주차·통행료 등(원/년) */
  parking: number;
}

export interface CarCost {
  fuel: number;
  tax: number;
  insurance: number;
  maintenance: number;
  parking: number;
  /** 한 해 합계(원) */
  yearly: number;
  /** 월 평균(원) */
  monthly: number;
  /** 1km당(원) */
  perKm: number;
  /** 합계에서 연료비가 차지하는 비율(0~1) */
  fuelShare: number;
}

export function carCost(v: CarInput): CarCost {
  const fuel = v.kmpl > 0 ? (v.km / v.kmpl) * v.fuelPrice : 0;
  const yearly = fuel + v.tax + v.insurance + v.maintenance + v.parking;
  return {
    fuel,
    tax: v.tax,
    insurance: v.insurance,
    maintenance: v.maintenance,
    parking: v.parking,
    yearly,
    monthly: yearly / 12,
    perKm: v.km > 0 ? yearly / v.km : 0,
    fuelShare: yearly > 0 ? fuel / yearly : 0,
  };
}

/**
 * 안 굴려도 나가는 돈(원/년).
 *
 * 세금과 보험은 세워 두기만 해도 나간다. 이 값이 큰데 주행거리가 적으면
 * 차를 덜 타는 것으로는 줄지 않는다는 뜻이다.
 */
export const fixedCost = (v: CarInput): number => v.tax + v.insurance + v.parking;
