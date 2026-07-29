/**
 * 위험조정 수익 지표 — 여러 페이지가 공유한다.
 *
 * ── 샤프 비율을 단독으로 쓰지 않는 이유 ──────────────────
 * 샤프는 표준편차로 나눈다. 표준편차는 위와 아래를 똑같이 벌하므로, 크게 오르는 자산도
 * "위험하다"고 판정한다. 게다가 정규분포를 전제로 하는데 암호화폐 일간 수익률은 팻테일이라
 * 그 전제가 깨진다. 그래서 세 지표를 나란히 낸다.
 *
 *   Sharpe  = 초과수익 / 전체 표준편차        위·아래를 같이 벌한다
 *   Sortino = 초과수익 / 하방 표준편차        아래만 벌한다
 *   Calmar  = 연수익 / 최대낙폭               "얼마나 아팠나"로 나눈다
 *
 * 세 지표가 순위를 다르게 매기는 경우가 흔하고, 그 불일치 자체가 정보다. 순위가
 * 갈리는 자산은 "위험"의 정의에 따라 평가가 달라진다는 뜻이다.
 *
 * 무위험수익률은 0으로 둔다. 암호화폐 수익률의 크기에 비해 무위험수익률은 오차 범위이고,
 * 값을 고정하면 시점에 따라 오히려 틀린 비교가 된다. 화면에 그렇게 밝힌다.
 */

/** 연환산에 쓰는 거래일 — 암호화폐는 휴장이 없다 */
export const DAYS_PER_YEAR = 365;

const mean = (a: number[]): number => a.reduce((s, x) => s + x, 0) / a.length;

/** 표본 표준편차 (n−1). 표본이 2개 미만이면 null. */
export function stdev(a: number[]): number | null {
  const v = a.filter(x => isFinite(x));
  if (v.length < 2) return null;
  const m = mean(v);
  const ss = v.reduce((s, x) => s + (x - m) * (x - m), 0);
  return Math.sqrt(ss / (v.length - 1));
}

/**
 * 하방 표준편차 — 목표(기본 0) 아래로 벗어난 정도만 센다.
 * 분모는 하방 관측 수가 아니라 **전체 관측 수**다. 그러지 않으면 하락이 드문
 * 자산이 부당하게 나쁘게 나온다(소르티노의 표준 정의).
 */
export function downsideDeviation(a: number[], target = 0): number | null {
  const v = a.filter(x => isFinite(x));
  if (v.length < 2) return null;
  let ss = 0;
  for (const x of v) {
    const d = Math.min(0, x - target);
    ss += d * d;
  }
  return Math.sqrt(ss / v.length);
}

export interface RiskMetrics {
  /** 연환산 수익률(%) — 로그수익률 평균을 연환산해 되돌린 값 */
  annualReturnPct: number;
  /** 연환산 변동성(%) */
  annualVolPct: number;
  /** 연환산 하방 변동성(%) */
  annualDownsideVolPct: number | null;
  /** 최대 낙폭(%) — 양수 */
  maxDrawdownPct: number;
  sharpe: number | null;
  sortino: number | null;
  calmar: number | null;
  /** 사용한 관측 수 */
  samples: number;
}

/** 최대 낙폭(%) — 누적 경로에서 고점 대비 최대 하락 */
function maxDrawdownFromCloses(closes: number[]): number {
  let peak = -Infinity;
  let worst = 0;
  for (const c of closes) {
    if (!isFinite(c) || c <= 0) continue;
    if (c > peak) peak = c;
    const dd = (1 - c / peak) * 100;
    if (dd > worst) worst = dd;
  }
  return worst;
}

/**
 * 종가 배열에서 위험조정 지표를 만든다.
 * @param closes 일별 종가 (오래된 것 → 최신)
 * @param minSamples 이보다 적으면 null
 */
export function riskMetrics(closes: number[], minSamples = 60): RiskMetrics | null {
  const valid = closes.filter(c => isFinite(c) && c > 0);
  if (valid.length < minSamples + 1) return null;

  const rets: number[] = [];
  for (let i = 1; i < valid.length; i++) rets.push(Math.log(valid[i] / valid[i - 1]));
  if (rets.length < minSamples) return null;

  const sd = stdev(rets);
  const dd = downsideDeviation(rets, 0);
  /*
    sd > 0 만으로는 부족하다. 매일 같은 비율로 오르는 계열은 로그수익률이 이론상
    상수인데 부동소수점 오차로 표준편차가 1e-18 처럼 나오고, 그러면 샤프가 1e15 같은
    값으로 폭발한다. 평균 크기 대비 상대 허용오차로 "사실상 무변동"을 걸러낸다.
    (lib/correlation.ts의 pearson()도 같은 이유로 같은 방어를 한다.)
  */
  const scale = Math.max(Math.abs(mean(rets)), 1e-12);
  if (sd == null || !(sd > scale * 1e-9)) return null;

  // 로그수익률 평균 × 365 를 되돌려 연수익률로
  const annualLog = mean(rets) * DAYS_PER_YEAR;
  const annualReturnPct = (Math.exp(annualLog) - 1) * 100;
  const annualVolPct = sd * Math.sqrt(DAYS_PER_YEAR) * 100;
  const annualDownsideVolPct = dd != null && dd > 0 ? dd * Math.sqrt(DAYS_PER_YEAR) * 100 : null;
  const maxDd = maxDrawdownFromCloses(valid);

  return {
    annualReturnPct,
    annualVolPct,
    annualDownsideVolPct,
    maxDrawdownPct: maxDd,
    // 무위험수익률 0 — 로그공간 초과수익을 변동성으로 나눈다
    sharpe: annualLog / (sd * Math.sqrt(DAYS_PER_YEAR)),
    sortino: dd != null && dd > 0 ? annualLog / (dd * Math.sqrt(DAYS_PER_YEAR)) : null,
    calmar: maxDd > 0 ? annualReturnPct / maxDd : null,
    samples: rets.length,
  };
}

/**
 * 여러 지표가 매긴 순위가 얼마나 갈리는가.
 * 같은 자산 목록에 대해 각 지표의 순위를 매기고, 최고와 최저 순위의 차이를 돌려준다.
 * 값이 크면 "무엇을 위험으로 볼 것인가"에 따라 평가가 뒤집힌다는 뜻이다.
 */
export function rankDisagreement<T>(
  items: T[],
  scorers: ((x: T) => number | null)[],
): Map<T, { ranks: (number | null)[]; spread: number | null }> {
  const rankMaps = scorers.map(score => {
    const scored = items
      .map(x => ({ x, v: score(x) }))
      .filter((e): e is { x: T; v: number } => e.v != null && isFinite(e.v))
      .sort((a, b) => b.v - a.v);
    const m = new Map<T, number>();
    scored.forEach((e, i) => m.set(e.x, i + 1));
    return m;
  });

  const out = new Map<T, { ranks: (number | null)[]; spread: number | null }>();
  for (const x of items) {
    const ranks = rankMaps.map(m => m.get(x) ?? null);
    const present = ranks.filter((r): r is number => r != null);
    out.set(x, {
      ranks,
      spread: present.length >= 2 ? Math.max(...present) - Math.min(...present) : null,
    });
  }
  return out;
}
