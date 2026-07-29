/**
 * 스테이블코인 디페그 — 1달러에서 얼마나 벗어나 있는가.
 *
 * ── 기준을 먼저 정해야 한다 ───────────────────────────────
 * 바이낸스에서 스테이블코인은 대부분 USDT로 호가된다. 즉 USDCUSDT가 0.999라면 그것은
 * "USDC가 1달러에서 0.1% 낮다"는 뜻이 아니라 **USDT 대비 0.1% 낮다**는 뜻이다.
 * USDT 자체가 흔들리면 다른 모든 값이 함께 흔들린다. 이걸 밝히지 않고 "디페그"라고
 * 부르는 화면이 많다. 여기서는 기준이 USDT라고 명시하고, USDT 자체는 다른 스테이블코인
 * 들의 중앙값을 역으로 이용해 추정한다.
 *
 * ── bps로 읽는다 ──────────────────────────────────────────
 * 0.9985는 "0.15% 이탈"인데 퍼센트로 쓰면 작아 보인다. 스테이블코인에서는 bp(0.01%)가
 * 표준 단위이고, 15bp와 150bp는 완전히 다른 사건이다. 그래서 bps를 주 단위로 쓴다.
 */

/** 이 이상 벗어나면 눈여겨볼 이탈로 본다 (bp) */
export const WATCH_BPS = 30;
/** 이 이상이면 디페그로 부른다 (bp) */
export const DEPEG_BPS = 100;

export type PegState = 'pegged' | 'watch' | 'depegged';

export interface DepegRow {
  /** 스테이블코인 티커 */
  base: string;
  /** USDT 대비 가격 */
  price: number;
  /** 1.0에서 벗어난 정도 (bp, 부호 포함) */
  deviationBps: number;
  /** 24시간 최저·최고에서 벗어난 최대 폭 (bp, 양수) */
  worst24hBps: number;
  state: PegState;
  quoteVolume: number;
}

/** 가격을 bp 이탈로 (1.0 기준) */
export function toBps(price: number): number | null {
  if (!isFinite(price) || price <= 0) return null;
  return (price - 1) * 10_000;
}

/** bp 이탈에서 상태 판정 — 경계는 관례값이며 화면에 그렇게 적는다 */
export function pegState(deviationBps: number): PegState {
  const a = Math.abs(deviationBps);
  if (!isFinite(a)) return 'pegged';
  if (a >= DEPEG_BPS) return 'depegged';
  if (a >= WATCH_BPS) return 'watch';
  return 'pegged';
}

export interface DepegInputRow {
  base: string;
  price: number;
  low24h: number;
  high24h: number;
  quoteVolume: number;
}

/**
 * 행을 만든다. 24시간 최저·최고 중 1.0에서 더 멀리 간 쪽을 worst로 잡는다.
 */
export function buildDepegRows(rows: DepegInputRow[]): DepegRow[] {
  const out: DepegRow[] = [];
  for (const r of rows) {
    const dev = toBps(r.price);
    if (dev == null) continue;
    const lo = toBps(r.low24h);
    const hi = toBps(r.high24h);
    const worst = Math.max(
      Math.abs(dev),
      lo != null ? Math.abs(lo) : 0,
      hi != null ? Math.abs(hi) : 0,
    );
    out.push({
      base: r.base,
      price: r.price,
      deviationBps: dev,
      worst24hBps: worst,
      state: pegState(dev),
      quoteVolume: r.quoteVolume,
    });
  }
  return out.sort((a, b) => Math.abs(b.deviationBps) - Math.abs(a.deviationBps));
}

/**
 * USDT 자체의 이탈을 역추정한다.
 *
 * 다른 스테이블코인들이 일제히 같은 방향으로 벗어나 있으면, 그것들이 동시에 흔들린
 * 것보다 **기준인 USDT가 반대로 움직인** 쪽이 설명이 간단하다. 중앙값을 쓰는 이유는
 * 한 코인이 진짜로 무너졌을 때(예: 과거 UST) 평균이 통째로 끌려가기 때문이다.
 *
 * 부호를 뒤집어 돌려준다: 다른 코인들이 +20bp면 USDT는 약 −20bp다.
 */
export function impliedUsdtBps(rows: DepegRow[]): number | null {
  const devs = rows.map(r => r.deviationBps).filter(v => isFinite(v));
  if (devs.length < 2) return null;
  const s = [...devs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  const median = s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  return -median;
}

/** 감시·디페그 상태인 코인 수 */
export function countByState(rows: DepegRow[]): Record<PegState, number> {
  const out: Record<PegState, number> = { pegged: 0, watch: 0, depegged: 0 };
  for (const r of rows) out[r.state]++;
  return out;
}
