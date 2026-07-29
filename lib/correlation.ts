/**
 * 상관관계 — 두 코인이 같이 움직이는 정도.
 *
 * 상관계수 매트릭스는 많지만 거의 전부 "지금 값" 하나만 보여준다. 그런데 상관관계의
 * 가장 중요한 성질은 **고정돼 있지 않다**는 것이다. 같은 쌍이 구간에 따라 0.4와 0.9
 * 사이를 오간다. 그 값 하나로 분산투자를 설계하면 정작 필요한 순간에 무너진다.
 *
 * 그래서 여기서는 두 가지를 함께 낸다.
 *   (1) 선택한 구간의 매트릭스 — 흔히 보는 그 표
 *   (2) 구간을 나눠 잰 같은 쌍의 상관계수 범위 — 얼마나 흔들리는지
 *
 * 그리고 하락일만 골라 다시 잰다. "분산이 필요한 날에도 분산이 되는가"가 실제 질문인데,
 * 전체 기간 평균은 그 답을 가린다. 암호화폐는 급락일에 상관계수가 1로 수렴하는 경향이
 * 있고, 그렇다면 평상시 낮은 상관계수는 위안이 되지 못한다.
 */

/** 로그수익률 배열로 변환 */
export function logReturns(closes: number[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    const a = closes[i - 1];
    const b = closes[i];
    if (a > 0 && b > 0) out.push(Math.log(b / a));
    else out.push(NaN);
  }
  return out;
}

/**
 * 피어슨 상관계수. 길이가 다르면 뒤에서 맞춰 자른다(최신 구간을 남긴다).
 * 유효 표본이 부족하면 null.
 */
export function pearson(a: number[], b: number[], minSamples = 20): number | null {
  const n = Math.min(a.length, b.length);
  if (n < minSamples) return null;
  const x = a.slice(a.length - n);
  const y = b.slice(b.length - n);

  let count = 0, sx = 0, sy = 0;
  for (let i = 0; i < n; i++) {
    if (!isFinite(x[i]) || !isFinite(y[i])) continue;
    count++; sx += x[i]; sy += y[i];
  }
  if (count < minSamples) return null;
  const mx = sx / count, my = sy / count;

  let cov = 0, vx = 0, vy = 0;
  for (let i = 0; i < n; i++) {
    if (!isFinite(x[i]) || !isFinite(y[i])) continue;
    const dx = x[i] - mx, dy = y[i] - my;
    cov += dx * dy; vx += dx * dx; vy += dy * dy;
  }
  /*
    vx > 0 만으로는 부족하다. 완전한 상수 계열도 합산 누적 오차 때문에 분산이
    6e-35 처럼 아주 작은 양수로 나오고, 그러면 의미 없는 상관계수가 나온다.
    평균 크기 대비 상대 허용오차로 "사실상 상수"를 걸러낸다.
  */
  const tol = (m: number) => Math.max(Math.abs(m), 1) * 1e-12;
  if (!(Math.sqrt(vx / count) > tol(mx)) || !(Math.sqrt(vy / count) > tol(my))) return null;
  return cov / Math.sqrt(vx * vy);
}

/**
 * 기준 자산이 크게 내린 날만 골라 상관계수를 다시 잰다.
 * @param benchmark 기준 로그수익률 (보통 BTC)
 * @param thresholdPct 이보다 크게 내린 날만 본다 (양수로 넣는다)
 */
export function downsideCorrelation(
  a: number[],
  b: number[],
  benchmark: number[],
  thresholdPct = 3,
  minSamples = 15,
): { corr: number | null; days: number } {
  const n = Math.min(a.length, b.length, benchmark.length);
  if (n < minSamples) return { corr: null, days: 0 };
  const x = a.slice(a.length - n);
  const y = b.slice(b.length - n);
  const m = benchmark.slice(benchmark.length - n);

  const thr = Math.log(1 - thresholdPct / 100);
  const fx: number[] = [], fy: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!isFinite(m[i]) || m[i] > thr) continue;
    fx.push(x[i]); fy.push(y[i]);
  }
  return { corr: pearson(fx, fy, minSamples), days: fx.length };
}

/**
 * 급락일 하방 추종 배수 — 기준이 크게 내린 날, 이 자산은 몇 배로 움직였나.
 *
 * 같은 날들의 **상관계수**를 재는 것보다 이 값이 해석이 쉽고 안전하다. 기준의 변동
 * 범위에 조건을 걸어 부분표본을 만들면 상관계수는 기계적으로 축소·확대되는데(범위
 * 절단 효과), 그 숫자를 "급락장에서는 분산이 잘 된다"로 읽으면 틀린다. 중앙값 비율은
 * 그런 왜곡이 없고 "BTC가 5% 빠진 날 이 코인은 7% 빠졌다"처럼 바로 읽힌다.
 *
 * 1보다 크면 기준보다 더 빠졌다는 뜻이다.
 */
export function downsideCapture(
  asset: number[],
  benchmark: number[],
  thresholdPct = 3,
  minDays = 10,
): { capture: number | null; assetMedianPct: number | null; benchMedianPct: number | null; days: number } {
  const n = Math.min(asset.length, benchmark.length);
  const empty = { capture: null, assetMedianPct: null, benchMedianPct: null, days: 0 };
  if (n < minDays) return empty;
  const x = asset.slice(asset.length - n);
  const m = benchmark.slice(benchmark.length - n);

  const thr = Math.log(1 - thresholdPct / 100);
  const ax: number[] = [], bx: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!isFinite(m[i]) || !isFinite(x[i]) || m[i] > thr) continue;
    ax.push(x[i]); bx.push(m[i]);
  }
  if (ax.length < minDays) return { ...empty, days: ax.length };

  const med = (a: number[]) => {
    const t = [...a].sort((p, q) => p - q);
    const k = Math.floor(t.length / 2);
    return t.length % 2 ? t[k] : (t[k - 1] + t[k]) / 2;
  };
  // 로그수익률 중앙값을 퍼센트로 되돌린다
  const aPct = (Math.exp(med(ax)) - 1) * 100;
  const bPct = (Math.exp(med(bx)) - 1) * 100;
  return {
    capture: bPct !== 0 ? aPct / bPct : null,
    assetMedianPct: aPct,
    benchMedianPct: bPct,
    days: ax.length,
  };
}

/**
 * 구간을 chunks개로 나눠 각각 상관계수를 잰다.
 * 값 하나가 아니라 범위를 보여주기 위한 것이다.
 */
export function rollingRange(
  a: number[],
  b: number[],
  chunks = 4,
  minSamples = 20,
): { min: number; max: number; values: number[] } | null {
  const n = Math.min(a.length, b.length);
  if (chunks < 2 || n < minSamples * chunks) return null;
  const x = a.slice(a.length - n);
  const y = b.slice(b.length - n);
  const size = Math.floor(n / chunks);

  const values: number[] = [];
  for (let i = 0; i < chunks; i++) {
    const from = i * size;
    const to = i === chunks - 1 ? n : from + size;
    const c = pearson(x.slice(from, to), y.slice(from, to), minSamples);
    if (c != null) values.push(c);
  }
  if (values.length < 2) return null;
  return { min: Math.min(...values), max: Math.max(...values), values };
}

/** 상관계수를 사람 말로 */
export function corrLabel(r: number): string {
  const a = Math.abs(r);
  if (a >= 0.9) return 'moves in lockstep';
  if (a >= 0.7) return 'strongly linked';
  if (a >= 0.4) return 'loosely linked';
  if (a >= 0.2) return 'weakly linked';
  return 'largely unrelated';
}
