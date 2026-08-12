/**
 * 보유세 — 재산세 + 종합부동산세.
 *
 * ── 왜 이 파일이 생겼고, 무엇이 틀려 있었나 (2026-08-12) ──────
 * 이 셈은 `app/(ko)/calculator/holding-tax/page.tsx` 본문에 박혀 있었다.
 * 클라이언트 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 그 파일을 보지
 * 못했다.** 같은 날 취득세 계산기에서 정확히 그 구조 때문에 100배 버그가 검사
 * 3,013개를 통과한 것을 찾았고(7억 주택의 취득세를 32억으로 냈다), 그래서 같은
 * 자리에 있는 계산기 일흔셋을 훑다가 이것을 찾았다.
 *
 * **종부세를 초과누진이 아니라 전체 과세표준에 한 세율을 곱해 내고 있었다.**
 *
 *   const b = BRACKETS.find(br => base <= br.limit)!;
 *   return base * b.rate;              // ← 구간을 나누지 않는다
 *
 * 그러면 구간 경계에서 세금이 절벽처럼 뛴다. 과세표준 3억에서 **1원을 더 벌면
 * 세금이 60만원 늘었다**(150만 → 210만). 그런 계단은 세법에 없다 — 종부세는
 * 초과누진세율이라 넘은 몫에만 높은 세율이 붙는다. 과다 계산의 폭도 컸다:
 *
 *   과세표준  6억   420만 → 360만   (60만 과다)
 *   과세표준 10억  1,000만 → 760만  (240만 과다)
 *   과세표준 20억  2,600만 → 2,000만 (600만 과다)
 *
 * 재산세 쪽은 원래부터 누진으로 옳게 적혀 있었다(구간마다 앞 구간의 누적액을
 * 더하는 꼴). 그래서 이 파일은 재산세 셈을 그대로 옮기고 종부세만 고쳤다.
 *
 * ── 해마다 바뀌는 값은 입력으로 받는다 ─────────────────────
 * 공정시장가액비율과 기본공제액은 시행령·고시로 바뀐다. 세율표도 개정된다.
 * 그래서 값을 인자로 받을 수 있게 두고, 화면이 넘기지 않으면 지금 값을 쓴다.
 * lib/yearly-values.ts에 이 파일을 등록해 새해마다 훑게 했다.
 */

/** 종부세 세율표 — [과세표준 상한, 세율]. 초과누진이다 */
export const JONGBU_BRACKETS: { limit: number; rate: number }[] = [
  { limit: 300_000_000, rate: 0.005 },
  { limit: 600_000_000, rate: 0.007 },
  { limit: 1_200_000_000, rate: 0.010 },
  { limit: 2_500_000_000, rate: 0.013 },
  { limit: 5_000_000_000, rate: 0.015 },
  { limit: 9_400_000_000, rate: 0.020 },
  { limit: Infinity, rate: 0.027 },
];

/** 농어촌특별세는 종부세액의 20%다 */
export const RURAL_ON_JONGBU = 0.2;

/**
 * 지방교육세 요율 — 옛 이름을 남겨 둔다.
 *
 * 이 값은 lib/property-tax.ts의 EDU_TAX_RATE와 같다. 바깥에서 이 이름으로
 * 가져다 쓰는 곳이 있어 지우지 않았고, 값은 그쪽 하나에서 온다.
 */
export { EDU_TAX_RATE as PROPERTY_SURCHARGE } from './property-tax.ts';

/** 1주택 기본공제(원) */
export const ONE_HOUSE_EXEMPTION = 1_200_000_000;
/** 그 밖의 기본공제(원) */
export const OTHER_EXEMPTION = 900_000_000;

/** 종부세 과세표준을 낼 때 공시가격에 곱하는 비율 */
export const JONGBU_FAIR_RATE = 0.6;

/**
 * 종합부동산세 — **초과누진**으로 센다.
 *
 * 구간을 나누어 넘은 몫에만 그 구간의 세율을 매긴다. 그래서 경계에서 세금이
 * 튀지 않는다 — 그것이 이 함수가 고친 것이고, 검사가 경계를 1원 차이로 밟아
 * 지킨다.
 */
export function jongbuTax(base: number, brackets = JONGBU_BRACKETS): number {
  let tax = 0;
  let prev = 0;
  for (const { limit, rate } of brackets) {
    if (base <= prev) break;
    tax += (Math.min(base, limit) - prev) * rate;
    prev = limit;
  }
  return base <= 0 ? 0 : tax;
}

/*
 * ── 재산세 셈은 lib/property-tax.ts로 옮겼다 (2026-08-13) ────
 * 같은 세율표가 재산세 계산기 페이지에도 적혀 있었다(클라이언트 페이지라 검사가
 * 못 보는 자리다). 표가 두 벌이면 한쪽만 고쳐지므로 한 곳으로 모으고 여기서
 * 가져다 쓴다. 옮기면서 **도시지역분**도 함께 세게 됐다 — 전에는 빠져 있었다.
 */
export {
  CITY_AREA_RATE, EDU_TAX_RATE, PROPERTY_BRACKETS, propertyFairRate, propertyTax,
} from './property-tax.ts';
import { calcPropertyTax } from './property-tax.ts';

export interface HoldingTaxInput {
  /** 공시가격(원) */
  publicPrice: number;
  /** 1세대 1주택인가 */
  oneHouse: boolean;
  /** 이미 낸 재산세(원). 0이면 계산한 재산세를 쓴다 */
  paidPropertyTax?: number;
}

export interface HoldingTaxResult {
  /** 재산세 과세표준(원) */
  propertyBase: number;
  /** 재산세(지방교육세 포함, 원) */
  propertyTax: number;
  /** 종부세 과세표준(원) */
  jongbuBase: number;
  /** 공제 전 종부세(원) */
  jongbuBefore: number;
  /** 재산세 이중과세 공제액(원) */
  credit: number;
  /** 실제 내는 종부세(원) */
  jongbu: number;
  /** 농어촌특별세(원) */
  ruralTax: number;
  /** 종부세 + 농특세(원) */
  totalJongbu: number;
  /** 보유세 합계(원) */
  totalHolding: number;
}

export function calcHoldingTax({
  publicPrice,
  oneHouse,
  paidPropertyTax = 0,
}: HoldingTaxInput): HoldingTaxResult {
  const p = Math.max(0, publicPrice);

  const prop = calcPropertyTax({ publicPrice: p, oneHouse });
  const propertyBase = prop.taxBase;
  /* 고지서 합계 — 본세 + 도시지역분 + 지방교육세 */
  const propTax = prop.total;
  /*
   * 공제 대상은 **재산세 본세**다. 지방교육세와 도시지역분은 공제 대상이 아닌데
   * 전에는 지방교육세까지 포함한 금액으로 공제해 종부세가 그만큼 적게 나왔다.
   * 사용자가 고지서 금액을 직접 넣으면 그 값을 쓴다 — 그때는 본세만 넣어야 하고,
   * 화면에 그렇게 적었다.
   */
  const paidProp = paidPropertyTax > 0 ? paidPropertyTax : prop.base;

  const exemption = oneHouse ? ONE_HOUSE_EXEMPTION : OTHER_EXEMPTION;
  const jongbuBase = Math.max(0, p * JONGBU_FAIR_RATE - exemption);
  const jongbuBefore = jongbuTax(jongbuBase);

  /*
   * ── 재산세 공제를 겹치는 몫에만 매긴다 (2026-08-12) ──────────
   * 전에는 `Math.min(낸 재산세, 종부세)`였다. 즉 **재산세를 전액 공제**했고,
   * 재산세가 종부세보다 크면 종부세가 0이 됐다. 그래서 공시가격 30억 1주택의
   * 종부세가 0원으로 나왔다 — 공제 전 360만원인데 재산세 788만원이 그것을
   * 통째로 지웠다. 종부세 계산기가 종부세를 0으로 내놓고 있었던 것이다.
   *
   * 법은 재산세 전액이 아니라 **종부세 과세표준에 대응하는 부분**만 공제하게
   * 한다. 그 배분식을 그대로 옮기지는 못했다 — 시행령의 식이 길고 개정돼 왔다.
   * 대신 **겹치는 과세표준의 비율**로 나눈다:
   *
   *   공제 = 재산세액 × (종부세 과세표준 ÷ 재산세 과세표준)
   *
   * 이것은 어림이고, 재산세를 전액 공제하는 것보다 훨씬 가깝다. 어림이라는
   * 사실을 화면에도 적었다. 종부세보다 크게 공제되지 않도록 상한은 그대로 둔다.
   */
  const overlap = propertyBase > 0 ? Math.min(1, jongbuBase / propertyBase) : 0;
  const credit = Math.min(paidProp * overlap, jongbuBefore);
  const jongbu = Math.max(0, jongbuBefore - credit);
  const ruralTax = jongbu * RURAL_ON_JONGBU;

  return {
    propertyBase,
    propertyTax: propTax,
    jongbuBase,
    jongbuBefore,
    credit,
    jongbu,
    ruralTax,
    totalJongbu: jongbu + ruralTax,
    totalHolding: propTax + jongbu + ruralTax,
  };
}
