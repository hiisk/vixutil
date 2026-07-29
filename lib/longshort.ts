/**
 * 롱/숏 비율 — 바이낸스 선물 참여자가 어느 쪽에 서 있는가.
 *
 * 바이낸스는 세 가지를 따로 낸다. 셋은 서로 다른 것을 재는데, 대부분의 사이트가
 * 하나만 골라 "롱/숏 비율"이라고 부른다.
 *
 *   globalLongShortAccountRatio  전체 계정 수 기준 — 사람 수를 센다
 *   topLongShortAccountRatio     상위 트레이더 계정 수 기준
 *   topLongShortPositionRatio    상위 트레이더 포지션 금액 기준 — 돈을 센다
 *
 * 계정 수와 금액은 다르다. 소액 계정 다수가 롱이고 큰 포지션 몇 개가 숏이면 앞의
 * 두 값은 롱 쪽으로, 세 번째는 숏 쪽으로 간다. 셋을 나란히 놓아야 그 어긋남이 보인다.
 *
 * ── 검증할 수 없다는 사실도 함께 밝힌다 ───────────────────
 * 이 사이트의 다른 페이지들은 통념을 실측으로 검증한다(공포·탐욕 지수처럼). 여기서는
 * 못 한다. 바이낸스가 이 데이터를 **30일치만** 제공하기 때문이다. 30일은 한 국면
 * 안쪽이라 "군중과 반대로 가면 되는가"를 물으면 소음만 나온다. 그래서 백테스트를
 * 억지로 돌려 숫자를 만들지 않고, 그 한계를 페이지에 적는다.
 */

export interface LongShortRow {
  base: string;
  symbol: string;
  /** 전체 계정 중 롱 비율 (0~1) */
  globalLongAccount: number;
  /** 상위 트레이더 포지션 금액 중 롱 비율 (0~1). 못 받으면 null */
  topLongPosition: number | null;
  /** 미결제약정 명목가 (USDT). 못 받으면 null */
  openInterestUsd: number | null;
  quoteVolume: number;
}

/** 롱 비율에서 롱/숏 배수 */
export function ratioOf(longShare: number): number | null {
  if (!isFinite(longShare) || longShare <= 0 || longShare >= 1) return null;
  return longShare / (1 - longShare);
}

/**
 * 50/50에서 얼마나 기울었는가 (%p, 부호 포함).
 * +10이면 롱이 60%, −10이면 롱이 40%다.
 */
export function skewPp(longShare: number): number | null {
  if (!isFinite(longShare) || longShare < 0 || longShare > 1) return null;
  return (longShare - 0.5) * 100;
}

/**
 * 계정 기준과 금액 기준이 갈리는 정도 (%p).
 * 양수면 사람 수는 롱 쪽인데 돈은 상대적으로 숏 쪽이라는 뜻이다.
 */
export function accountVsMoneyGapPp(longAccount: number, longPosition: number | null): number | null {
  if (longPosition == null) return null;
  const a = skewPp(longAccount);
  const p = skewPp(longPosition);
  if (a == null || p == null) return null;
  return a - p;
}

export type Crowding = 'balanced' | 'tilted' | 'crowded';

/**
 * 얼마나 한쪽으로 몰렸는가. 경계는 관례값이며 화면에 그렇게 적는다.
 *
 * 비교를 %p가 아니라 비율(share)로 한다. (0.6 − 0.5) × 100 은 부동소수점에서
 * 9.999999999999998 이 나와 `>= 10` 이 거짓이 되고, 경계값이 조용히 아래 등급으로
 * 떨어진다. 여유값을 두어 그 자리를 막는다.
 */
const EPS = 1e-9;

export function crowding(longShare: number): Crowding {
  if (!isFinite(longShare) || longShare < 0 || longShare > 1) return 'balanced';
  const a = Math.abs(longShare - 0.5);
  if (a >= 0.2 - EPS) return 'crowded';
  if (a >= 0.1 - EPS) return 'tilted';
  return 'balanced';
}

const FAPI = 'https://fapi.binance.com/futures/data';

async function firstOf<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length ? (rows[rows.length - 1] as T) : null;
  } catch {
    return null;
  }
}

/** 한 종목의 최신 포지셔닝. 전체 계정 비율을 못 받으면 null(그게 기준 값이다). */
export async function fetchPositioning(
  symbol: string,
): Promise<{ globalLongAccount: number; topLongPosition: number | null; openInterestUsd: number | null } | null> {
  const [global, top, oi] = await Promise.all([
    firstOf<{ longAccount: string }>(`${FAPI}/globalLongShortAccountRatio?symbol=${symbol}&period=1h&limit=1`),
    // 주의: 이 엔드포인트도 필드명이 longAccount다. 포지션 금액 비율인데 이름을
    // 재사용하므로 longPosition으로 읽으면 조용히 undefined가 된다.
    firstOf<{ longAccount: string }>(`${FAPI}/topLongShortPositionRatio?symbol=${symbol}&period=1h&limit=1`),
    firstOf<{ sumOpenInterestValue: string }>(`${FAPI}/openInterestHist?symbol=${symbol}&period=1h&limit=1`),
  ]);
  const g = Number(global?.longAccount);
  if (!isFinite(g) || g <= 0 || g >= 1) return null;
  const t = Number(top?.longAccount);
  const o = Number(oi?.sumOpenInterestValue);
  return {
    globalLongAccount: g,
    topLongPosition: isFinite(t) && t > 0 && t < 1 ? t : null,
    openInterestUsd: isFinite(o) && o > 0 ? o : null,
  };
}
