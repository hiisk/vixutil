/**
 * 재산세(주택) — 과세표준과 세목 셋.
 *
 * ── 왜 이 파일이 생겼나 (2026-08-13) ───────────────────────
 * 같은 세율표가 두 곳에 적혀 있었다.
 *
 *   app/(ko)/calculator/property-tax/page.tsx   calcPropertyTax()  — 클라이언트 페이지
 *   lib/holding-tax.ts                          propertyTax()      — 보유세 계산기용
 *
 * 페이지 쪽은 클라이언트 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 보지
 * 못했다.** 이 저장소에서 그 구조 때문에 취득세가 100배 틀린 값을 내고(7억 주택의
 * 취득세 32억), 종부세가 구간 경계에서 60만원씩 튀고, 복비가 딱 9억에서 90만원
 * 적게 나왔다. 세율표가 두 벌이면 한쪽만 고쳐지는 것도 시간 문제다.
 *
 * 그래서 표를 이 파일 하나로 모았다. `lib/holding-tax.ts`가 여기서 가져다 쓴다.
 *
 * ── 세목이 셋이다 ─────────────────────────────────────────
 * 고지서에는 세 줄이 함께 온다.
 *
 *   재산세 본세     과세표준에 누진세율
 *   도시지역분      과세표준 × 0.14%  (도시지역 안일 때만)
 *   지방교육세      재산세 본세 × 20%
 *
 * 보유세 계산기(lib/holding-tax.ts)는 **도시지역분을 세지 않았다.** 종부세를 내는
 * 데는 쓰이지 않는 항목이지만, 화면에 보이는 "보유세 합계"에서는 빠져 있었다.
 * 이제 이 파일이 셋을 함께 낸다.
 *
 * ── 종부세에서 공제하는 것은 본세뿐이다 ───────────────────
 * 종부세를 낼 때 이중과세를 막으려고 재산세를 공제하는데, 그 대상은 **재산세
 * 본세**다. 지방교육세와 도시지역분은 공제 대상이 아니다. 그래서 본세를 따로
 * 내보낸다 — 보유세 계산기가 합계에는 셋을 다 넣고 공제에는 본세만 쓸 수 있게.
 *
 * ── 해마다 바뀐다 ─────────────────────────────────────────
 * 공정시장가액비율은 시행령으로, 1주택 특례는 해마다 손질된다. lib/yearly-values.ts에
 * 등록해 새해마다 훑게 했다.
 */

/** 재산세 누진세율 구간 — [과세표준 상한, 세율, 누진공제 전까지의 누적세액] */
export const PROPERTY_BRACKETS: { limit: number; rate: number; base: number }[] = [
  { limit: 60_000_000, rate: 0.001, base: 0 },
  { limit: 150_000_000, rate: 0.0015, base: 60_000 },
  { limit: 300_000_000, rate: 0.0025, base: 195_000 },
  { limit: Infinity, rate: 0.004, base: 570_000 },
];

/** 도시지역분 재산세율 — 과세표준에 곱한다 */
export const CITY_AREA_RATE = 0.0014;

/** 지방교육세 — 재산세 본세에 곱한다 */
export const EDU_TAX_RATE = 0.2;

/** 주택의 기본 공정시장가액비율 */
export const FAIR_RATE_DEFAULT = 0.6;

/** 1주택 특례 — [공시가격 상한, 비율] */
export const ONE_HOUSE_FAIR_RATES: { until: number; rate: number }[] = [
  { until: 300_000_000, rate: 0.45 },
  { until: 600_000_000, rate: 0.5 },
];

/**
 * 재산세 본세 — 누진세율.
 *
 * 구간마다 앞 구간까지의 누적 세액(6만·19.5만·57만)을 더하고 넘은 몫에만 그 구간
 * 세율을 매긴다. 그 누적액은 옮겨 적은 숫자라 한 자리만 틀려도 그럴듯하다 —
 * 검사가 앞 구간을 직접 더해 되짚는다.
 */
export function propertyTax(taxBase: number): number {
  if (taxBase <= 0) return 0;
  let prev = 0;
  for (const { limit, rate, base } of PROPERTY_BRACKETS) {
    if (taxBase <= limit) return base + (taxBase - prev) * rate;
    prev = limit;
  }
  return 0;
}

/**
 * 과세표준을 낼 때 공시가격에 곱하는 비율.
 *
 * 1주택은 공시가격에 따라 낮춰 주는 특례가 있고, 그 밖은 60%다.
 */
export function propertyFairRate(publicPrice: number, oneHouse: boolean): number {
  if (!oneHouse) return FAIR_RATE_DEFAULT;
  for (const { until, rate } of ONE_HOUSE_FAIR_RATES) {
    if (publicPrice <= until) return rate;
  }
  return FAIR_RATE_DEFAULT;
}

export interface PropertyTaxInput {
  /** 공시가격(원) */
  publicPrice: number;
  /** 1세대 1주택인가 */
  oneHouse?: boolean;
  /** 도시지역 안인가 — 도시지역분이 붙는다 */
  cityArea?: boolean;
}

export interface PropertyTaxResult {
  /** 쓴 공정시장가액비율 */
  fairRate: number;
  /** 과세표준(원) */
  taxBase: number;
  /** 재산세 본세(원) — 종부세에서 공제하는 것이 이것이다 */
  base: number;
  /** 도시지역분(원) */
  cityTax: number;
  /** 지방교육세(원) */
  eduTax: number;
  /** 고지서 합계(원) */
  total: number;
}

export function calcPropertyTax({
  publicPrice,
  oneHouse = true,
  cityArea = true,
}: PropertyTaxInput): PropertyTaxResult {
  const p = Math.max(0, publicPrice);
  const fairRate = propertyFairRate(p, oneHouse);
  const taxBase = p * fairRate;

  const base = propertyTax(taxBase);
  const cityTax = cityArea ? taxBase * CITY_AREA_RATE : 0;
  const eduTax = base * EDU_TAX_RATE;

  return { fairRate, taxBase, base, cityTax, eduTax, total: base + cityTax + eduTax };
}
