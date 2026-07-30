/**
 * 피벗 포인트 — 그리고 그게 정말 지지·저항으로 작동하는지.
 *
 * 전날 고가·저가·종가에서 오늘의 지지/저항선을 뽑는 고전 지표다. 공식 자체는
 * 산수라 어느 사이트나 같은 값을 준다. 정작 아무도 답하지 않는 질문은 이거다.
 *
 *      그 선에서 정말로 되돌아오는가, 아니면 아무 선이나 그래도 그렇게 보이는가?
 *
 * ── 그래서 대조군을 같이 잰다 ────────────────────────────
 * 어떤 선이든 하루 중 가격이 닿으면 "지지선이 작동했다"고 말할 수 있는 순간이
 * 생긴다. 가격은 원래 오르내리기 때문이다. 그래서 이 모듈은 피벗 레벨의
 * **터치율**과 **유지율**을 재고, 같은 거리에 놓인 **의미 없는 대조선**에 대해
 * 똑같이 잰다. 둘이 비슷하면 그 선에 특별한 게 없다는 뜻이다.
 *
 *   터치율 — 그날 고저 범위가 그 선을 품은 비율
 *   유지율 — 터치한 날 중, 종가가 원래 있던 쪽으로 돌아온 비율
 *
 * 유지율만 보면 안 된다. 선이 시가에서 멀수록 터치 자체가 드물어지고, 어쩌다
 * 닿은 날은 되돌아오기 쉽다(평균회귀). 그래서 대조선을 같은 거리에 놓는다.
 */

export interface OHLC {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PivotLevels {
  p: number;
  r1: number; r2: number; r3: number;
  s1: number; s2: number; s3: number;
}

export type PivotMethod = 'classic' | 'fibonacci' | 'camarilla' | 'woodie';

export const PIVOT_METHODS: { key: PivotMethod; label: string; note: string }[] = [
  { key: 'classic', label: 'Classic', note: 'The standard floor-trader formula' },
  { key: 'fibonacci', label: 'Fibonacci', note: 'Same pivot, levels at 38.2 / 61.8 / 100% of range' },
  { key: 'camarilla', label: 'Camarilla', note: 'Much tighter — built for intraday mean reversion' },
  { key: 'woodie', label: 'Woodie', note: 'Weights today’s open instead of yesterday’s close' },
];

const ok = (...v: number[]) => v.every(x => isFinite(x) && x > 0);

/** 전날 OHLC(우디는 오늘 시가도)에서 레벨을 계산한다 */
export function pivotLevels(prev: OHLC, method: PivotMethod = 'classic', todayOpen?: number): PivotLevels | null {
  const { high: h, low: l, close: c } = prev;
  if (!ok(h, l, c) || h < l) return null;
  const range = h - l;

  if (method === 'fibonacci') {
    const p = (h + l + c) / 3;
    return {
      p,
      r1: p + range * 0.382, r2: p + range * 0.618, r3: p + range,
      s1: p - range * 0.382, s2: p - range * 0.618, s3: p - range,
    };
  }

  if (method === 'camarilla') {
    // 종가 기준으로 아주 좁게 잡는다 — 하루 안에 되돌아온다는 전제의 지표다
    const k = range;
    return {
      p: (h + l + c) / 3,
      r1: c + k * 1.1 / 12, r2: c + k * 1.1 / 6, r3: c + k * 1.1 / 4,
      s1: c - k * 1.1 / 12, s2: c - k * 1.1 / 6, s3: c - k * 1.1 / 4,
    };
  }

  if (method === 'woodie') {
    // 오늘 시가를 두 번 세는 변형. 시가를 모르면 종가로 대신한다.
    const o = todayOpen != null && isFinite(todayOpen) && todayOpen > 0 ? todayOpen : c;
    const p = (h + l + 2 * o) / 4;
    const r1 = 2 * p - l;
    const s1 = 2 * p - h;
    return {
      p,
      r1, r2: p + range, r3: r1 + range,
      s1, s2: p - range, s3: s1 - range,
    };
  }

  // classic
  const p = (h + l + c) / 3;
  const r1 = 2 * p - l;
  const s1 = 2 * p - h;
  return {
    p,
    r1, r2: p + range, r3: h + 2 * (p - l),
    s1, s2: p - range, s3: l - 2 * (h - p),
  };
}

/** 화면·검정에 쓰는 레벨 키 (피벗 자신은 방향이 없어 따로 다룬다) */
export const LEVEL_KEYS = ['r3', 'r2', 'r1', 'p', 's1', 's2', 's3'] as const;
export type LevelKey = typeof LEVEL_KEYS[number];

export interface LevelStat {
  key: LevelKey;
  /** 그 선을 품은 날 수 */
  touches: number;
  /** 검정에 쓴 전체 날 수 */
  days: number;
  /** 터치율(%) */
  touchRatePct: number;
  /** 터치한 날 중 종가가 원래 쪽으로 돌아온 비율(%) */
  holdRatePct: number | null;
  /** 같은 거리의 대조선 유지율(%) — 비교 대상 */
  controlHoldRatePct: number | null;
  /** 유지율 − 대조군. 0 근처면 그 선에 특별한 게 없다 */
  edgePct: number | null;
}

/**
 * 하루 검정: 시가에서 본 선의 방향으로, 종가가 되돌아왔는가.
 *
 * 저항선(시가 위)이면 종가가 그 선 아래로 마감해야 "유지"다.
 * 지지선(시가 아래)이면 종가가 그 선 위로 마감해야 "유지"다.
 * 시가가 이미 선 너머면 그 날은 세지 않는다 — 지지·저항을 논할 상황이 아니다.
 */
function judge(day: OHLC, level: number): 'hold' | 'break' | null {
  if (!isFinite(level) || level <= 0) return null;
  if (!(day.high >= level && day.low <= level)) return null; // 닿지 않았다
  if (day.open > level) return day.close > level ? 'hold' : 'break';   // 위에서 접근 → 지지
  if (day.open < level) return day.close < level ? 'hold' : 'break';   // 아래서 접근 → 저항
  return null; // 시가가 정확히 선 위
}

export interface BacktestResult {
  method: PivotMethod;
  days: number;
  levels: LevelStat[];
  /** 전체 평균 유지율(%) */
  avgHoldPct: number | null;
  /** 전체 평균 대조군 유지율(%) */
  avgControlPct: number | null;
}

/**
 * 일봉으로 피벗 레벨을 검정한다.
 *
 * 각 날 t에 대해 t−1의 OHLC로 레벨을 만들고 t의 움직임으로 판정한다.
 * 대조선은 같은 날의 피벗에서 같은 거리만큼 떨어져 있되 위치만 어긋난 선이다 —
 * 구체적으로 피벗 기준 거리를 1.5배 한 자리에 둔다. 피벗 레벨이 특별하다면
 * 유지율이 대조선보다 뚜렷이 높아야 한다.
 */
export function backtestPivots(candles: OHLC[], method: PivotMethod = 'classic'): BacktestResult | null {
  if (candles.length < 30) return null;

  const hold: Record<string, number> = {};
  const touch: Record<string, number> = {};
  const cHold: Record<string, number> = {};
  const cTouch: Record<string, number> = {};
  for (const k of LEVEL_KEYS) { hold[k] = 0; touch[k] = 0; cHold[k] = 0; cTouch[k] = 0; }

  let days = 0;
  for (let i = 1; i < candles.length; i++) {
    const prev = candles[i - 1];
    const day = candles[i];
    if (!ok(prev.high, prev.low, prev.close, day.high, day.low, day.close, day.open)) continue;
    const lv = pivotLevels(prev, method, day.open);
    if (!lv) continue;
    days++;

    for (const k of LEVEL_KEYS) {
      const level = lv[k];
      const v = judge(day, level);
      if (v) { touch[k]++; if (v === 'hold') hold[k]++; }

      // 대조선 — 피벗에서 같은 방향으로 1.5배 거리.
      //
      // 피벗 자신(k==='p')은 거리가 0이라 대조선이 자기 자신이 된다. 그러면 차이가
      // 언제나 정확히 +0.0으로 나와 "우위가 없다"는 결론처럼 보이지만, 사실은
      // 아무것도 비교하지 않은 것이다. 그 자리는 비워 둔다.
      if (k === 'p') continue;
      const control = lv.p + (level - lv.p) * 1.5;
      const cv = judge(day, control);
      if (cv) { cTouch[k]++; if (cv === 'hold') cHold[k]++; }
    }
  }

  if (!days) return null;
  const levels: LevelStat[] = LEVEL_KEYS.map(k => {
    const h = touch[k] ? (hold[k] / touch[k]) * 100 : null;
    const c = cTouch[k] >= 10 ? (cHold[k] / cTouch[k]) * 100 : null;
    return {
      key: k,
      touches: touch[k],
      days,
      touchRatePct: (touch[k] / days) * 100,
      holdRatePct: h,
      controlHoldRatePct: c,
      edgePct: h != null && c != null ? h - c : null,
    };
  });

  const withHold = levels.filter(l => l.holdRatePct != null);
  const withCtrl = levels.filter(l => l.controlHoldRatePct != null);
  return {
    method,
    days,
    levels,
    avgHoldPct: withHold.length ? withHold.reduce((s, l) => s + l.holdRatePct!, 0) / withHold.length : null,
    avgControlPct: withCtrl.length ? withCtrl.reduce((s, l) => s + l.controlHoldRatePct!, 0) / withCtrl.length : null,
  };
}

/** 레벨 표시 이름 */
export const LEVEL_LABEL: Record<LevelKey, string> = {
  r3: 'R3', r2: 'R2', r1: 'R1', p: 'Pivot', s1: 'S1', s2: 'S2', s3: 'S3',
};

/**
 * 우위를 한 마디로. 대조군 대비 차이가 통계적 잡음 수준이면 그렇게 말한다.
 * 표본 수백 개에서 몇 %p 차이는 잡음이다.
 */
export function edgeLabel(edgePct: number | null): string {
  if (edgePct == null) return 'not enough touches';
  if (edgePct >= 10) return 'clearly better';
  if (edgePct >= 5) return 'slightly better';
  if (edgePct > -5) return 'no different';
  return 'worse';
}
