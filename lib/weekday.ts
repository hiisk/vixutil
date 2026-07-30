/**
 * 요일별 수익률 — "월요일에 사고 금요일에 팔라" 류 주장을 재본다.
 *
 * 이 사이트의 예측 페이지는 이미 요일 효과를 측정하고 "유의하지 않다"고 적어뒀다.
 * 이 모듈은 그 측정을 공개하고 검정까지 붙인다.
 *
 * ── 요일 효과가 검정을 통과하기 어려운 이유 ─────────────────
 * (1) 표본은 크지만 신호가 아주 작다. 9년치면 각 요일이 약 470번이라 개수는 많은데,
 *     일간 변동성이 3~5%인 자산에서 0.1% 수준의 차이를 가려내기는 어렵다.
 * (2) 7개 요일을 동시에 본다 → 다중비교. 5% 기준으로 7번 검정하면 평균 0.35개는
 *     우연히 "유의"하게 나온다.
 * (3) 암호화폐는 24시간 거래된다. 전통시장의 요일 효과는 휴장·결제 주기에서 오는데
 *     그 구조가 없으므로 애초에 메커니즘이 약하다.
 *
 * 그래서 평균과 함께 **t통계량**과 다중비교 기준선을 낸다.
 */

export const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/** 동시에 검정하는 요일 수 — 다중비교 기준선 계산에 쓴다 */
export const WEEKDAYS_TESTED = 7;

export interface WeekdayStat {
  /** 0=일요일 … 6=토요일 (UTC) */
  weekday: number;
  /** 관측 수 */
  n: number;
  /** 평균 일간 수익률(%) */
  meanPct: number;
  /** 중앙값(%) */
  medianPct: number;
  /** 상승 비율(%) */
  upRatePct: number;
  /** 표준편차(%) */
  sdPct: number;
  /**
   * 평균이 0과 다른지의 t통계량. |t| ≥ 2 면 관례적으로 유의하다고 본다.
   * 관측 수가 많아도 신호가 작으면 이 값은 작게 나온다.
   */
  tStat: number | null;
}

export interface DatedReturn {
  /** UTC 자정 epoch ms */
  day: number;
  /** 그 날의 수익률(%) */
  pct: number;
}

const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;
const median = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/**
 * 일별 종가에서 (날짜, 수익률) 목록을 만든다.
 * 수익률은 **그 날 종가 / 전날 종가**이고, 요일은 그 날의 UTC 요일이다.
 */
export function dailyReturns(closes: { day: number; close: number }[]): DatedReturn[] {
  const out: DatedReturn[] = [];
  for (let i = 1; i < closes.length; i++) {
    const a = closes[i - 1].close;
    const b = closes[i].close;
    if (!(a > 0) || !(b > 0)) continue;
    out.push({ day: closes[i].day, pct: (b / a - 1) * 100 });
  }
  return out;
}

/** 요일별 통계 */
export function weekdayStats(returns: DatedReturn[]): WeekdayStat[] {
  const byDay = new Map<number, number[]>();
  for (const r of returns) {
    if (!isFinite(r.pct) || !isFinite(r.day)) continue;
    const wd = new Date(r.day).getUTCDay();
    const arr = byDay.get(wd);
    if (arr) arr.push(r.pct); else byDay.set(wd, [r.pct]);
  }

  const out: WeekdayStat[] = [];
  for (let wd = 0; wd < 7; wd++) {
    const a = byDay.get(wd);
    if (!a?.length) continue;
    const m = mean(a);
    let sd: number | null = null;
    if (a.length >= 2) {
      const ss = a.reduce((s, x) => s + (x - m) * (x - m), 0);
      sd = Math.sqrt(ss / (a.length - 1));
    }
    out.push({
      weekday: wd,
      n: a.length,
      meanPct: m,
      medianPct: median(a),
      upRatePct: (a.filter(x => x > 0).length / a.length) * 100,
      sdPct: sd ?? 0,
      // t = 평균 / (표준편차 / √n)
      tStat: sd != null && sd > 0 ? m / (sd / Math.sqrt(a.length)) : null,
    });
  }
  return out;
}

/** |t| ≥ threshold 인 요일 수 */
export function significantCount(stats: WeekdayStat[], threshold = 2): number {
  return stats.filter(s => s.tStat != null && Math.abs(s.tStat) >= threshold).length;
}

/**
 * 다중비교로 우연히 "유의"해 보일 것으로 기대되는 요일 수.
 * |t| ≥ 2 는 대략 양측 5%에 해당하므로 7 × 0.05 = 0.35.
 */
export const EXPECTED_BY_CHANCE = WEEKDAYS_TESTED * 0.05;
