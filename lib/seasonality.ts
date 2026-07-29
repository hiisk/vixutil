/**
 * 월별 계절성 — "9월은 원래 안 좋다" 류의 주장을 실제 데이터로 재본다.
 *
 * 계산 자체는 단순하다. 일별 종가를 달력 월로 묶어 월 수익률을 만들고, 1월부터
 * 12월까지 중앙값과 상승 비율을 낸다.
 *
 * ── 이 페이지가 다르게 하는 것 ────────────────────────────
 * 계절성 표는 표본 크기를 거의 언급하지 않는다. 그런데 여기서 각 월의 표본은
 * **관측한 해의 수**다. 비트코인의 바이낸스 이력이 9년이면 "9월" 데이터는 9개뿐이다.
 * 9개 표본으로 만든 중앙값은 우연히 한두 해가 크게 움직이면 통째로 뒤집힌다.
 * 그래서 월마다 연수(years)를 함께 내고, 화면에서 그 숫자를 먼저 읽게 만든다.
 *
 * 알트코인은 더 심하다. 상장 3년이면 각 월의 표본이 3개다. 그건 계절성이 아니라
 * 세 번의 우연이다.
 */

export interface MonthStat {
  /** 0=1월 … 11=12월 */
  month: number;
  /** 관측한 해의 수 = 실제 표본 크기 */
  years: number;
  /** 월 수익률 중앙값(%) */
  medianPct: number;
  /** 평균(%) — 이상치에 끌리므로 중앙값과 함께만 의미가 있다 */
  meanPct: number;
  /** 상승으로 끝난 비율(%) */
  winRatePct: number;
  /** 가장 나빴던 달(%) */
  worstPct: number;
  /** 가장 좋았던 달(%) */
  bestPct: number;
}

export interface DatedClose {
  /** UTC 자정 epoch ms */
  day: number;
  close: number;
}

const median = (a: number[]): number => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/**
 * 달력 월별 수익률을 만든다.
 * 한 달의 수익률은 그 달 첫 관측 종가에서 마지막 관측 종가까지다. 데이터가 중간부터
 * 시작하는 첫 달과 아직 끝나지 않은 마지막 달은 온전한 달이 아니므로 뺀다.
 */
export function monthlyReturns(closes: DatedClose[]): { year: number; month: number; pct: number }[] {
  if (closes.length < 2) return [];
  const sorted = [...closes].sort((a, b) => a.day - b.day);

  // (연,월) → 첫/마지막 종가
  const groups = new Map<string, { year: number; month: number; first: number; last: number; days: number }>();
  for (const c of sorted) {
    if (!(c.close > 0)) continue;
    const d = new Date(c.day);
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const key = `${year}-${month}`;
    const g = groups.get(key);
    if (g) { g.last = c.close; g.days++; }
    else groups.set(key, { year, month, first: c.close, last: c.close, days: 1 });
  }

  const keys = [...groups.keys()];
  if (keys.length <= 2) return [];
  // 양 끝 달은 잘려 있을 수 있으므로 제외한다
  const inner = keys.slice(1, -1);

  return inner.map(k => {
    const g = groups.get(k)!;
    return { year: g.year, month: g.month, pct: (g.last / g.first - 1) * 100 };
  });
}

/** 월별 통계. 관측이 없는 월은 결과에서 빠진다. */
export function seasonality(closes: DatedClose[]): MonthStat[] {
  const rets = monthlyReturns(closes);
  if (!rets.length) return [];

  const byMonth = new Map<number, number[]>();
  for (const r of rets) {
    const arr = byMonth.get(r.month);
    if (arr) arr.push(r.pct); else byMonth.set(r.month, [r.pct]);
  }

  const out: MonthStat[] = [];
  for (let m = 0; m < 12; m++) {
    const a = byMonth.get(m);
    if (!a?.length) continue;
    out.push({
      month: m,
      years: a.length,
      medianPct: median(a),
      meanPct: a.reduce((s, x) => s + x, 0) / a.length,
      winRatePct: (a.filter(x => x > 0).length / a.length) * 100,
      worstPct: Math.min(...a),
      bestPct: Math.max(...a),
    });
  }
  return out;
}

/**
 * 최대 낙폭(%) — 이력 중 고점에서 저점까지 가장 큰 하락. 항상 양수로 돌려준다.
 * 전고점 대비 현재 하락(athInfo)과 다르다: 이건 과거에 겪은 최악의 구간이다.
 */
export function maxDrawdownPct(closes: number[]): number | null {
  let peak = -Infinity;
  let worst = 0;
  let seen = false;
  for (const c of closes) {
    if (!isFinite(c) || c <= 0) continue;
    seen = true;
    if (c > peak) peak = c;
    const dd = (1 - c / peak) * 100;
    if (dd > worst) worst = dd;
  }
  return seen ? worst : null;
}

/**
 * 이항분포 양측 꼬리 확률 — "공정한 동전 n번 중 k번 이상(또는 이하) 나올 확률".
 *
 * 계절성 표에서 승률 78%(9번 중 7번)를 보면 패턴처럼 읽힌다. 그런데 공정한 동전을
 * 9번 던져도 7번 이상 같은 면이 나올 확률은 상당하다. 그 확률을 옆에 적어야 표를
 * 정직하게 읽을 수 있다.
 *
 * 게다가 12개 월을 동시에 보므로 다중비교 문제가 있다: 각 월이 우연히 p<0.05로
 * 보일 확률이 5%면 12개 중 평균 0.6개는 아무 이유 없이 "유의하게" 나온다.
 * 화면에서 그 점을 함께 밝힌다.
 */
export function binomialTwoSidedP(successes: number, trials: number): number | null {
  if (!Number.isFinite(successes) || !Number.isFinite(trials)) return null;
  if (trials <= 0 || successes < 0 || successes > trials) return null;

  // 로그 팩토리얼로 큰 n에서의 오버플로를 피한다
  const logFact: number[] = [0];
  for (let i = 1; i <= trials; i++) logFact.push(logFact[i - 1] + Math.log(i));
  const pmf = (k: number) =>
    Math.exp(logFact[trials] - logFact[k] - logFact[trials - k] - trials * Math.LN2);

  // 관측만큼 또는 그보다 더 치우친 모든 경우를 더한다
  const target = pmf(successes);
  let p = 0;
  for (let k = 0; k <= trials; k++) {
    const v = pmf(k);
    if (v <= target * (1 + 1e-9)) p += v;
  }
  return Math.min(1, p);
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
