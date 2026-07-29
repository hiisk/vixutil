/**
 * 공포·탐욕 지수 — 0(극단적 공포)에서 100(극단적 탐욕).
 *
 * 이 지수를 보여주는 사이트는 많지만 거의 전부 "지금 값"에서 멈춘다. 그런데 사람들이
 * 실제로 알고 싶은 건 값이 아니라 **그래서 사야 하나**이고, 흔히 인용되는 답("공포에
 * 사라")은 검증 대상이지 전제가 아니다.
 *
 * 그래서 여기서는 지수 이력과 BTC 종가를 붙여 구간별 이후 수익률을 직접 잰다.
 * 지수를 만든 곳의 분류(value_classification)를 그대로 쓰므로 경계를 우리가 임의로
 * 정하지 않는다.
 *
 * ── 표본에 대한 정직한 경고 ──────────────────────────────
 * 창이 겹친다. 3,000일에서 30일 창을 만들면 창은 3,000개 가까이 나오지만 서로 겹치지
 * 않는 창은 100개뿐이고, 같은 구간에 속한 날들은 대개 연속으로 붙어 있어 사실상 몇
 * 개의 국면을 반복해서 재는 것에 가깝다. 게다가 전 기간이 하나의 비트코인 시장이다.
 * 그래서 중앙값과 함께 **연속 구간(에피소드) 수**를 센다 — 그게 진짜 표본 크기에 가깝다.
 */

export type FngBucket = 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';

export const BUCKETS: FngBucket[] = ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed'];

/** 게이지 표시용 경계 — 분류 자체는 데이터가 주는 값을 쓴다 */
export function classify(value: number): FngBucket {
  if (!isFinite(value)) return 'Neutral';
  if (value <= 24) return 'Extreme Fear';
  if (value <= 49) return 'Fear';
  if (value <= 54) return 'Neutral';
  if (value <= 74) return 'Greed';
  return 'Extreme Greed';
}

export interface FngPoint {
  /** UTC 자정 기준 epoch ms */
  day: number;
  value: number;
  bucket: FngBucket;
}

/** 지수 이력에서 현재 값의 백분위(0~100). 이력이 없으면 null. */
export function percentileOf(values: number[], current: number): number | null {
  const v = values.filter(x => isFinite(x));
  if (!v.length) return null;
  let below = 0;
  for (const x of v) if (x < current) below++;
  return (below / v.length) * 100;
}

export interface BucketStat {
  bucket: FngBucket;
  /** 이 구간에 속한 날 수 (겹치는 창) */
  days: number;
  /**
   * 연속 구간 덩어리 수. 같은 국면의 연속된 날은 독립 관측이 아니므로
   * 이 숫자가 실제 표본 크기에 훨씬 가깝다.
   */
  episodes: number;
  /** 이후 수익률 중앙값(%) */
  medianReturnPct: number;
  /** 이후 수익률이 양수였던 비율(%) */
  winRatePct: number;
}

const median = (a: number[]): number => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/**
 * 구간별 이후 수익률.
 * @param points  날짜 오름차순 지수 이력
 * @param closeByDay  UTC 자정 ms → 종가
 * @param horizonDays  며칠 뒤 수익률을 볼 것인가
 */
export function forwardReturnsByBucket(
  points: FngPoint[],
  closeByDay: Map<number, number>,
  horizonDays: number,
): BucketStat[] {
  if (!(horizonDays > 0)) return [];
  const DAY = 86_400_000;

  const byBucket = new Map<FngBucket, number[]>();
  // 연속 덩어리를 세기 위해 직전 날짜의 구간을 기억한다
  const episodeCount = new Map<FngBucket, number>();
  let prevBucket: FngBucket | null = null;
  let prevDay = -Infinity;

  for (const p of points) {
    const from = closeByDay.get(p.day);
    const to = closeByDay.get(p.day + horizonDays * DAY);
    // 연속 덩어리 판정은 수익률을 낼 수 있는지와 무관하게 날짜 기준으로 한다
    const contiguous = prevBucket === p.bucket && p.day - prevDay === DAY;
    if (!contiguous) episodeCount.set(p.bucket, (episodeCount.get(p.bucket) ?? 0) + 1);
    prevBucket = p.bucket;
    prevDay = p.day;

    if (from == null || to == null || !(from > 0) || !(to > 0)) continue;
    const r = (to / from - 1) * 100;
    const arr = byBucket.get(p.bucket);
    if (arr) arr.push(r); else byBucket.set(p.bucket, [r]);
  }

  return BUCKETS.map(b => {
    const rs = byBucket.get(b) ?? [];
    return {
      bucket: b,
      days: rs.length,
      episodes: episodeCount.get(b) ?? 0,
      medianReturnPct: rs.length ? median(rs) : NaN,
      winRatePct: rs.length ? (rs.filter(x => x > 0).length / rs.length) * 100 : NaN,
    };
  }).filter(s => s.days > 0);
}

/** UTC 자정으로 내림 */
export function toUtcDay(ms: number): number {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
