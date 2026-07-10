/**
 * 배리어(최고/최저점) 확률 — "3년 안에 한 번이라도 10만을 찍을 확률".
 *
 * lib/forecast.ts의 probReach()는 **그 날의 종가**가 목표 이상일 확률이다. 하지만 사람들이
 * 실제로 묻는 건 "그 사이에 한 번이라도 닿는가"이고, 둘은 크게 다르다. 실측(BTC 전체 이력,
 * 1년 창):
 *   +58%(=$63,230 -> $100,000)를 한 번이라도 터치: 61.4% 의 창
 *   그 가격 이상으로 종료:                          44.0% 의 창
 * 즉 "도달"이 "종료"보다 1.4배 흔하다.
 *
 * 정규분포·상수 변동성이라면 반사원리로 폐형해가 있지만, 우리 모델은 (a) 팻테일 t분포 충격,
 * (b) 지평에 따라 변하는 변동성을 쓴다. 그래서 같은 모델에서 경로를 표집해 러닝 최고/최저를
 * 재는 몬테카를로로 계산한다. 밴드·확률과 완전히 같은 분포에서 나오므로 일관된다.
 * 시드를 고정해 리렌더마다 값이 흔들리지 않게 한다.
 *
 * 검증: 무드리프트·상수변동성 조건에서 연속 반사원리 해와 비교하면 MC가 5~6%p 낮게 나온다.
 * 이는 버그가 아니라 **일별 종가 모니터링** 때문이다. Broadie-Glasserman-Kou 연속성 보정
 * (배리어를 beta*sigma*sqrt(dt), beta=0.5826 만큼 바깥으로 이동)을 적용하면 잔차가 3.1%p
 * 이내로 줄고, 남는 차이는 팻테일 때문이다. 우리 모델은 일별 종가 모델이고 과거 통계(61.4%)도
 * 일별 종가로 쟀으므로, 일별 종가 모니터링이 일관된 선택이다.
 */
import { dfAt, tQuantStd, type ForecastModel } from './forecast';

export interface BarrierSim {
  /** 확률을 재는 날짜들 (오늘로부터 며칠 뒤) */
  checkpoints: number[];
  /** checkpoints[i] 까지의 경로별 러닝 최고가 — 오름차순 정렬 */
  maxSorted: number[][];
  /** checkpoints[i] 까지의 경로별 러닝 최저가 — 오름차순 정렬 */
  minSorted: number[][];
  paths: number[];
}

/** 정렬 배열에서 v 미만 원소 수 */
function countBelow(sorted: number[], v: number): number {
  let lo = 0, hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < v) lo = mid + 1; else hi = mid;
  }
  return lo;
}

/**
 * 경로를 표집해 각 체크포인트까지의 러닝 최고/최저 분포를 만든다.
 * @param checkpoints 오름차순 일수 (예: [365, 730, 1095])
 */
export function simulateBarriers(m: ForecastModel, checkpoints: number[], paths = 3000, seed = 12345): BarrierSim {
  const days = checkpoints[checkpoints.length - 1];

  let s = seed >>> 0 || 1;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s >>> 8) / 16777216; };

  // 일별 충격은 t(df(1)) — 밴드와 같은 팻테일
  const v1 = dfAt(1), TABLE = 512;
  const quant: number[] = [];
  for (let i = 0; i <= TABLE; i++) quant.push(tQuantStd((i + 0.5) / (TABLE + 1), v1));
  const shock = () => {
    const u = rnd() * TABLE;
    const i = Math.min(TABLE - 1, Math.max(0, Math.floor(u)));
    return quant[i] + (u - i) * (quant[i + 1] - quant[i]);
  };

  // 일별 조건부 분산은 지평별 총분산의 차분 — 변동성 기간구조와 일관
  const V = (k: number) => k * Math.pow(m.sigmaAt(k), 2);
  const sdOf: number[] = [];
  for (let k = 1; k <= days; k++) sdOf.push(Math.sqrt(Math.max(V(k) - V(k - 1), 1e-14)));

  const cpIdx = new Map(checkpoints.map((d, i) => [d, i]));
  const maxAt: number[][] = checkpoints.map(() => []);
  const minAt: number[][] = checkpoints.map(() => []);

  for (let p = 0; p < paths; p++) {
    let logS = Math.log(m.spot);
    let hi = m.spot, lo = m.spot;
    for (let k = 1; k <= days; k++) {
      logS += m.mu + sdOf[k - 1] * shock();
      const price = Math.exp(logS);
      if (price > hi) hi = price;
      if (price < lo) lo = price;
      const ci = cpIdx.get(k);
      if (ci !== undefined) { maxAt[ci].push(hi); minAt[ci].push(lo); }
    }
  }
  return {
    checkpoints,
    maxSorted: maxAt.map(a => a.sort((x, y) => x - y)),
    minSorted: minAt.map(a => a.sort((x, y) => x - y)),
    paths: [paths],
  };
}

/** checkpoints[ci] 까지 한 번이라도 target 이상을 찍을 확률(%) */
export function probEverAbove(sim: BarrierSim, ci: number, target: number): number {
  const a = sim.maxSorted[ci];
  if (!a?.length) return NaN;
  return ((a.length - countBelow(a, target)) / a.length) * 100;
}

/** checkpoints[ci] 까지 한 번이라도 target 이하로 내려갈 확률(%) */
export function probEverBelow(sim: BarrierSim, ci: number, target: number): number {
  const a = sim.minSorted[ci];
  if (!a?.length) return NaN;
  // min <= target 인 경로 수 = target 초과 미만... 정렬배열에서 <= target 개수
  let lo = 0, hi = a.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (a[mid] <= target) lo = mid + 1; else hi = mid; }
  return (lo / a.length) * 100;
}

/** 상방이면 도달, 하방이면 하락 도달 확률(%) */
export function probEverReach(sim: BarrierSim, ci: number, target: number, spot: number): number {
  return target >= spot ? probEverAbove(sim, ci, target) : probEverBelow(sim, ci, target);
}
