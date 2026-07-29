/**
 * 알트시즌 지수 — 최근 N일 동안 비트코인을 이긴 알트코인의 비율.
 *
 * 널리 인용되는 정의는 "시총 상위 50개(스테이블·자산토큰 제외) 중 90일 수익률이
 * BTC보다 높은 코인의 비율"이고, 75% 이상이면 알트시즌, 25% 이하면 비트코인 시즌이라
 * 부른다. 이 페이지도 같은 정의를 쓰되 두 가지를 다르게 한다.
 *
 *  1) 계산을 숨기지 않는다. 어떤 코인이 포함됐고 각각 BTC 대비 몇 %인지 전부 보여준다.
 *     지수는 그 표의 요약일 뿐이다.
 *  2) 75%라는 경계가 임의의 값임을 밝힌다. 지수가 74에서 76으로 넘어가도 시장에서
 *     달라지는 것은 없다. 경계선 근처의 값은 "거의 그렇다"로 읽는 편이 정확하다.
 *
 * 순위는 시가총액이 아니라 **거래대금** 상위로 잡는다. 정적 사이트라 시총 API를
 * 쓸 수 없고, 바이낸스 공개 데이터로 얻을 수 있는 가장 가까운 대용치가 거래대금이다.
 * 둘은 대체로 같은 방향이지만 같지는 않으므로 화면에 그렇게 적는다.
 */

/** 알트시즌으로 부르는 경계(%) — 관례값이고 임의적이다 */
export const ALTSEASON_THRESHOLD = 75;
/** 비트코인 시즌 경계(%) */
export const BITCOIN_SEASON_THRESHOLD = 25;

/** 지수 계산에서 빼는 자산 — 스테이블코인과 BTC 파생 토큰 */
export const EXCLUDED = new Set([
  'USDT', 'USDC', 'FDUSD', 'DAI', 'TUSD', 'BUSD', 'USDP', 'PYUSD', 'USD1', 'RLUSD', 'EURI', 'AEUR',
  'WBTC', 'BTCB', 'WBETH', 'BETH', 'STETH', 'WSTETH',
]);

export interface AltRow {
  base: string;
  /** 기간 수익률(%) */
  returnPct: number;
  /** BTC 수익률과의 차이(%p) — 양수면 BTC를 이겼다 */
  vsBtcPp: number;
  outperformed: boolean;
  quoteVolume: number;
}

export interface AltseasonIndex {
  /** BTC를 이긴 비율(%) */
  index: number;
  /** 이긴 개수 */
  outperformers: number;
  /** 비교에 쓴 총 개수 */
  total: number;
  /** 기준이 된 BTC 수익률(%) */
  btcReturnPct: number;
  days: number;
  rows: AltRow[];
  label: 'altseason' | 'bitcoin-season' | 'neutral';
}

/** 첫 종가 대비 마지막 종가의 수익률(%). 데이터가 모자라면 null. */
export function periodReturn(closes: number[], days: number): number | null {
  if (closes.length < 2) return null;
  const slice = closes.slice(-Math.min(days, closes.length));
  const first = slice[0];
  const last = slice[slice.length - 1];
  if (!(first > 0) || !(last > 0)) return null;
  return (last / first - 1) * 100;
}

/** 지수 값에서 라벨을 정한다 — 경계는 관례값이다 */
export function labelOf(index: number): AltseasonIndex['label'] {
  if (index >= ALTSEASON_THRESHOLD) return 'altseason';
  if (index <= BITCOIN_SEASON_THRESHOLD) return 'bitcoin-season';
  return 'neutral';
}

export interface AltInput {
  base: string;
  closes: number[];
  quoteVolume: number;
}

/**
 * 알트 목록과 BTC 종가에서 지수를 만든다.
 * BTC 자신과 제외 목록은 빼고, 기간 수익률을 낼 수 없는 코인도 뺀다.
 */
export function buildAltseasonIndex(alts: AltInput[], btcCloses: number[], days: number): AltseasonIndex | null {
  const btcReturnPct = periodReturn(btcCloses, days);
  if (btcReturnPct == null) return null;

  const rows: AltRow[] = [];
  for (const a of alts) {
    if (a.base === 'BTC' || EXCLUDED.has(a.base)) continue;
    const r = periodReturn(a.closes, days);
    if (r == null) continue;
    const vsBtcPp = r - btcReturnPct;
    rows.push({
      base: a.base,
      returnPct: r,
      vsBtcPp,
      outperformed: vsBtcPp > 0,
      quoteVolume: a.quoteVolume,
    });
  }
  if (rows.length === 0) return null;

  rows.sort((x, y) => y.vsBtcPp - x.vsBtcPp);
  const outperformers = rows.filter(r => r.outperformed).length;
  const index = (outperformers / rows.length) * 100;

  return {
    index,
    outperformers,
    total: rows.length,
    btcReturnPct,
    days,
    rows,
    label: labelOf(index),
  };
}

/**
 * 경계선에 얼마나 가까운가 (%p). 이 값이 작으면 라벨을 그대로 믿을 이유가 없다 —
 * 74와 76 사이에서 시장이 달라지지는 않기 때문이다.
 */
export function distanceToBoundary(index: number): number {
  return Math.min(
    Math.abs(index - ALTSEASON_THRESHOLD),
    Math.abs(index - BITCOIN_SEASON_THRESHOLD),
  );
}
