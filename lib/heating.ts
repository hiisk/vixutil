/**
 * 지역난방 요금.
 *
 * 고지서에 찍히는 난방비는 셋이 더해진 값이다.
 *
 *   기본요금 = 계약면적(㎡) × ㎡당 단가
 *   사용요금 = 사용열량(Mcal) × Mcal당 단가
 *   부가세   = (기본요금 + 사용요금) × 10%
 *
 * ── 단가를 코드에 안 박은 이유 ──────────────────────────────────
 * 열요금은 **사업자마다 다르고 해마다 바뀐다.** 한국지역난방공사와 지역
 * 도시가스사, 아파트 자체 열병합이 각각 다른 단가를 쓴다. 확인 못 한 숫자를
 * 기본값으로 박아 두면 그 값이 그대로 답처럼 보이므로, 고지서의 단가를
 * 받아서 셈한다. 셈하는 방법 자체는 어디서나 같다.
 *
 * 전기(lib/electricity-tariff.ts)와 달리 누진이 없다 — 쓴 만큼 곱하기다.
 * 그래서 "절반만 쓰면 절반"이 그대로 성립한다.
 */

export interface HeatingBill {
  /** 계약면적에 붙는 기본요금(원) */
  basicFee: number;
  /** 쓴 열량에 붙는 사용요금(원) */
  usageFee: number;
  subtotal: number;
  vat: number;
  total: number;
  /** ㎡당 난방비(원) — 다른 집과 견줄 때 쓰는 단위 */
  perSquareMetre: number;
  /** 평당 난방비(원) */
  perPyeong: number;
  /** 하루 평균(원) */
  perDay: number;
}

export const VAT_RATE = 0.1;

/** 1평 = 3.305785㎡ (한 평은 6자 × 6자다) */
export const PYEONG = 3.305785;

export interface HeatingInput {
  /** 계약면적(㎡) */
  area: number;
  /** ㎡당 기본단가(원) */
  basicRate: number;
  /** 사용열량(Mcal) */
  mcal: number;
  /** Mcal당 사용단가(원) */
  usageRate: number;
  /** 청구 일수 — 하루 평균을 낼 때만 쓴다 */
  days: number;
}

export function calcHeating({ area, basicRate, mcal, usageRate, days }: HeatingInput): HeatingBill {
  const basicFee = area * basicRate;
  const usageFee = mcal * usageRate;
  const subtotal = basicFee + usageFee;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  return {
    basicFee,
    usageFee,
    subtotal,
    vat,
    total,
    perSquareMetre: area > 0 ? total / area : 0,
    perPyeong: area > 0 ? total / (area / PYEONG) : 0,
    perDay: days > 0 ? total / days : 0,
  };
}

/**
 * 열량을 비율만큼 줄이면 얼마가 되는가.
 *
 * 기본요금은 면적에 붙으므로 아무리 안 써도 남는다 — "난방을 아예 끄면 0원"이
 * 아닌 까닭이 여기다. 줄어드는 것은 사용요금 쪽뿐이다.
 */
export function afterSaving(input: HeatingInput, cutRatio: number): HeatingBill {
  return calcHeating({ ...input, mcal: input.mcal * (1 - cutRatio) });
}
