/**
 * 상가건물 임대차 환산보증금.
 *
 * 환산보증금 = 보증금 + (월세 × 100)
 * 이 식 자체는 상가건물임대차보호법 시행령에 명시돼 있어 다툼의 여지가 없다.
 *
 * 지역별 기준금액 이하인지에 따라 임차인이 받는 보호의 범위가 달라진다. 다만
 * "어떤 조항이 기준금액을 넘어도 적용되는가"는 개정을 여러 번 거쳐 복잡하므로
 * 이 계산기는 금액 계산과 기준 대비 위치만 알려주고, 구체적 법 적용은 단정하지
 * 않는다. 기준금액도 시행령 개정으로 바뀔 수 있다.
 */

export interface Region {
  id: string;
  label: string;
  /** 시행령상 기준금액 (원) */
  threshold: number;
}

export const REGIONS: Region[] = [
  { id: 'seoul',       label: '서울특별시',                          threshold: 900_000_000 },
  { id: 'overcrowded', label: '과밀억제권역 · 부산광역시',            threshold: 690_000_000 },
  { id: 'metro',       label: '광역시 · 세종 · 파주 · 화성 · 안산 등', threshold: 540_000_000 },
  { id: 'other',       label: '그 밖의 지역',                        threshold: 370_000_000 },
];

export interface ConversionResult {
  /** 보증금 + 월세 × 100 */
  converted: number;
  /** 월세를 보증금으로 환산한 부분 */
  fromRent: number;
  threshold: number;
  /** 기준금액 이하인가 */
  withinThreshold: boolean;
  /** 기준까지 남은 금액 (초과면 음수 = 초과액) */
  margin: number;
  /**
   * 기준을 넘지 않으려면 월세를 얼마까지 낮춰야 하는가.
   * 이미 보증금만으로 기준을 넘으면 null (월세를 0으로 해도 소용없다).
   */
  maxRentToStayWithin: number | null;
}

/** 시행령이 정한 환산율 — 월세에 곱하는 배수 */
export const RENT_MULTIPLIER = 100;

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);

export function calcConversion(deposit: number, monthlyRent: number, region: Region): ConversionResult {
  const d = clamp(deposit);
  const r = clamp(monthlyRent);

  const fromRent = r * RENT_MULTIPLIER;
  const converted = d + fromRent;
  const margin = region.threshold - converted;

  // 보증금만으로 이미 기준을 넘으면 월세를 0으로 해도 못 맞춘다.
  const maxRentToStayWithin =
    d > region.threshold ? null : Math.floor((region.threshold - d) / RENT_MULTIPLIER);

  return {
    converted,
    fromRent,
    threshold: region.threshold,
    withinThreshold: converted <= region.threshold,
    margin,
    maxRentToStayWithin,
  };
}
