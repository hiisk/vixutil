/**
 * "고점에 팔았다면" — 타이밍 반사실(counterfactual)을 실제 데이터로 재본다.
 *
 * 이 페이지가 답하려는 건 후회가 아니라 그 후회의 크기다. 세 가지를 나란히 둔다.
 *
 * (1) 완벽한 타이밍: 오르는 날만 들고 있었다면. 도달 불가능한 상한이고, 숫자가
 *     터무니없이 크다는 사실 자체가 요점이다. 전략이 아니라 환상임을 보여준다.
 * (2) 최고의 날을 놓쳤다면: 시장을 벗어나 있는 대가. 현실의 "고점 매도 시도"는
 *     대개 이쪽으로 끝난다.
 * (3) 최악의 날을 피했다면: 사람들이 상상하는 쪽. (2)와 나란히 봐야 의미가 있다.
 *
 * ── 핵심 ────────────────────────────────────────────────
 * 최고의 날과 최악의 날은 **같은 주에 몰려 있다**. 폭락 다음 날이 반등이기 때문이다.
 * 그래서 (3)만 골라 취하는 선택지는 존재하지 않는다. 이 모듈은 그 근접성을 거리로
 * 측정해서, 두 시나리오가 독립적인 선택이 아니라는 걸 수치로 못 박는다.
 *
 * ── 배수가 float를 넘는 문제 ─────────────────────────────
 * 완벽한 타이밍의 배수는 9년치 BTC에서 1e17을 넘고, 변동성 큰 알트코인이면
 * double 범위(~1.8e308)를 넘길 수 있다. 그래서 모든 계산을 로그로 하고
 * log10과 배수를 함께 돌려준다 — 배수가 Infinity여도 log10은 쓸 수 있다.
 */

export interface IndexedReturn {
  /** 원본 순서(0부터) — 근접성 계산에 쓴다 */
  i: number;
  /** UTC 자정 epoch ms */
  day: number;
  /** 그 날 수익률(%) */
  pct: number;
}

export interface Growth {
  /** 최종 배수(1 = 원금 그대로). 범위를 넘으면 Infinity */
  multiple: number;
  /** log10(배수). multiple이 Infinity여도 유효하다 */
  log10: number;
}

/** 일별 종가 → (순번, 날짜, 수익률) */
export function indexedReturns(closes: { day: number; close: number }[]): IndexedReturn[] {
  const out: IndexedReturn[] = [];
  for (let k = 1; k < closes.length; k++) {
    const a = closes[k - 1].close;
    const b = closes[k].close;
    if (!(a > 0) || !(b > 0)) continue;
    out.push({ i: out.length, day: closes[k].day, pct: (b / a - 1) * 100 });
  }
  return out;
}

/**
 * 특정 날을 현금으로 비켜 있었을 때의 성장.
 * `skip(r)`이 참인 날은 수익률 0으로 친다.
 *
 * 로그로 누적한다 — 배수를 직접 곱하면 오버플로가 나고, 그 경우 log10이
 * Infinity가 되어 "얼마나 큰지"조차 말할 수 없게 된다.
 */
export function growthWhere(rets: IndexedReturn[], skip?: (r: IndexedReturn) => boolean): Growth | null {
  if (!rets.length) return null;
  let log10 = 0;
  for (const r of rets) {
    if (!isFinite(r.pct)) return null;
    const g = skip?.(r) ? 1 : 1 + r.pct / 100;
    // −100% 이하는 자본이 사라진다 — 실제로는 나오지 않지만 로그가 폭발하므로 막는다
    if (!(g > 0)) return { multiple: 0, log10: -Infinity };
    log10 += Math.log10(g);
  }
  return { multiple: Math.pow(10, log10), log10 };
}

/** 상승한 날만 들고 있었다면 — 도달 불가능한 상한 */
export function perfectTiming(rets: IndexedReturn[]): Growth | null {
  return growthWhere(rets, r => r.pct <= 0);
}

/** 수익률 상위 n일과 하위 n일 (각각 좋은 순 / 나쁜 순) */
export function extremeDays(rets: IndexedReturn[], n: number): { best: IndexedReturn[]; worst: IndexedReturn[] } {
  const clean = rets.filter(r => isFinite(r.pct));
  const sorted = [...clean].sort((a, b) => b.pct - a.pct);
  const k = Math.max(0, Math.min(Math.floor(n), Math.floor(clean.length / 2)));
  return {
    best: sorted.slice(0, k),
    worst: sorted.slice(clean.length - k).reverse(), // 가장 나쁜 날이 앞
  };
}

/**
 * 각 최고의 날에서 가장 가까운 최악의 날까지의 거리(일).
 * 이 배열이 작다는 게 페이지의 논점이다 — 두 시나리오는 분리해서 고를 수 없다.
 */
export function distancesToNearest(best: IndexedReturn[], worst: IndexedReturn[]): number[] {
  if (!best.length || !worst.length) return [];
  return best.map(b => Math.min(...worst.map(w => Math.abs(w.i - b.i))));
}

/** 거리가 threshold일 이하인 개수 */
export function countWithin(distances: number[], threshold: number): number {
  return distances.filter(d => d <= threshold).length;
}

/**
 * 최고의 날 바로 옆(전날 또는 다음날)이 최악의 날인 쌍.
 * 2020-03-12 −39.5% 다음 날이 2020-03-13 +16.2% 같은 경우다.
 */
export function adjacentPairs(
  best: IndexedReturn[],
  worst: IndexedReturn[],
): { best: IndexedReturn; worst: IndexedReturn; gap: number }[] {
  const out: { best: IndexedReturn; worst: IndexedReturn; gap: number }[] = [];
  for (const b of best) {
    for (const w of worst) {
      const gap = w.i - b.i;
      if (Math.abs(gap) === 1) out.push({ best: b, worst: w, gap });
    }
  }
  return out.sort((x, y) => y.best.pct - x.best.pct);
}

/** 표에 쓸 상위/하위 개수 선택지 */
export const EXTREME_COUNTS = [5, 10, 20, 30];

/**
 * 배수를 사람이 읽을 문자열로. 1e6을 넘으면 지수로 간다.
 * 완벽한 타이밍은 1e17 수준이라 %로 적으면 그냥 글자 덩어리가 된다.
 */
export function formatMultiple(g: Growth): string {
  if (!isFinite(g.log10)) return g.log10 < 0 ? '0×' : '∞';
  if (g.log10 >= 6) return `10^${g.log10.toFixed(1)} ×`;
  const m = g.multiple;
  if (m >= 100) return `${m.toFixed(0)}×`;
  if (m >= 10) return `${m.toFixed(1)}×`;
  return `${m.toFixed(2)}×`;
}

/** 성장 배수를 수익률(%)로. 배수가 크면 지수 표기가 된다. */
export function formatReturn(g: Growth): string {
  if (!isFinite(g.log10)) return g.log10 < 0 ? '−100%' : '∞';
  if (g.log10 >= 6) return `10^${(g.log10 + 2).toFixed(1)}%`;
  const pct = (g.multiple - 1) * 100;
  const sign = pct >= 0 ? '+' : '−';
  const a = Math.abs(pct);
  return `${sign}${a >= 100 ? a.toFixed(0) : a.toFixed(1)}%`;
}
