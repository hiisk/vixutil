import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  walkForward, mergeScores, hitEdgeStdErrPP, isSignificant, verdict, verdictLabel, VERDICT_LABEL,
  LOOKBACK, MAX_HOLD, MIN_TRADES, type StrategyScore,
} from '../lib/scorecard.ts';
import type { Candle } from '../lib/atr.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

/** 시드 고정 의사난수 — Math.random을 쓰면 테스트가 흔들린다 */
function lcg(seed: number) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
}

/** 변동성 있는 보행 캔들 */
function walk(n: number, seed = 42, drift = 0): Candle[] {
  const rnd = lcg(seed);
  const out: Candle[] = [];
  let p = 100;
  for (let i = 0; i < n; i++) {
    const close = p * (1 + drift + (rnd() - 0.5) * 0.06);
    const high = Math.max(p, close) * (1 + rnd() * 0.02);
    const low = Math.min(p, close) * (1 - rnd() * 0.02);
    out.push({ high, low, close });
    p = close;
  }
  return out;
}

test('데이터가 모자라면 성적표를 내지 않는다', () => {
  assert.equal(walkForward(walk(50), 'trend', 'futures'), null);
  assert.equal(walkForward(walk(LOOKBACK + MAX_HOLD), 'trend', 'futures'), null,
    '거래 표본이 MIN_TRADES에 못 미친다');
});

test('충분한 데이터면 신호와 대조군을 함께 낸다', () => {
  const r = walkForward(walk(600), 'trend', 'futures')!;
  assert.ok(r.signal.trades >= MIN_TRADES);
  assert.ok(r.baseline.trades > 0);
  assert.equal(r.key, 'trend');
});

test('대조군은 언제나 롱이라 신호보다 표본이 크거나 같다', () => {
  // 신호는 중립인 날을 건너뛰지만 대조군은 매일 잡는다
  const r = walkForward(walk(600), 'rsi', 'futures')!;
  assert.ok(r.baseline.trades >= r.signal.trades,
    `대조 ${r.baseline.trades} >= 신호 ${r.signal.trades}`);
  assert.ok(r.skipped >= 0);
});

test('현물은 숏을 잡지 않는다', () => {
  const r = walkForward(walk(600, 7), 'trend', 'spot')!;
  assert.ok(r.signal.trades > 0);
  // spot에서는 computeStrategy가 side를 항상 long으로 준다 → 방향 적중률이
  // 대조군과 같은 규칙으로 계산된다
  assert.ok(r.signal.nextDayHitPct >= 0 && r.signal.nextDayHitPct <= 100);
});

test('차이는 신호 − 대조군이다', () => {
  const r = walkForward(walk(600), 'bollinger', 'futures')!;
  near(r.hitEdgePP, r.signal.nextDayHitPct - r.baseline.nextDayHitPct, 1e-9);
  near(r.expectancyEdgeR, r.signal.expectancyR - r.baseline.expectancyR, 1e-9);
});

test('강한 상승 표류에서는 대조군 적중률이 50%를 크게 넘는다 — 대조군이 필요한 이유', () => {
  const r = walkForward(walk(800, 3, 0.004), 'rsi', 'futures')!;
  assert.ok(r.baseline.nextDayHitPct > 55,
    `표류만으로 ${r.baseline.nextDayHitPct.toFixed(1)}% — 이걸 안 빼면 신호가 잘한 것처럼 보인다`);
});

test('합의도 채점할 수 있다', () => {
  const r = walkForward(walk(600), 'consensus', 'futures')!;
  assert.equal(r.key, 'consensus');
  assert.ok(r.signal.trades >= MIN_TRADES);
});

test('모호한 날(같은 날 TP·SL 동시 터치)은 손실로 세고 비율을 보고한다', () => {
  // TP/SL은 ATR에 비례하므로 매일 꼬리를 키우면 ATR도 같이 커져 모호해지지 않는다.
  // 대부분의 날은 아주 좁게 두고 5일에 한 번만 거대한 꼬리를 넣는다 —
  // ATR(14)은 그 평균이라 작게 유지되고, 거대한 날은 TP와 SL을 한꺼번에 뚫는다.
  const wild: Candle[] = [];
  const rnd = lcg(9);
  let p = 100;
  for (let i = 0; i < 600; i++) {
    const close = p * (1 + (rnd() - 0.5) * 0.004);
    const huge = i % 5 === 0;
    const w = huge ? 0.25 : 0.001;
    wild.push({ high: Math.max(p, close) * (1 + w), low: Math.min(p, close) * (1 - w), close });
    p = close;
  }
  const r = walkForward(wild, 'trend', 'futures')!;
  assert.ok(r.signal.ambiguousPct > 50,
    `변동폭이 크면 대부분 모호해야 한다 (${r.signal.ambiguousPct.toFixed(0)}%)`);
  // 모호한 날을 손실로 세므로 기대값이 음수 쪽으로 눌린다
  assert.ok(r.signal.expectancyR < 0);
});

test('TP에 먼저 닿으면 +1.5R, SL이면 −1R', () => {
  // 진입 후 바로 위로 크게 뛰는 시장 → TP 선도달
  const up: Candle[] = [];
  let p = 100;
  for (let i = 0; i < 600; i++) {
    // 앞 300개는 조용히, 뒤는 매일 강하게 오른다
    const g = i < 300 ? 1.001 : 1.05;
    const close = p * g;
    up.push({ high: close * 1.001, low: p * 0.999, close });
    p = close;
  }
  const r = walkForward(up, 'trend', 'futures')!;
  assert.ok(r.signal.tpFirstPct > 60, `상승장이면 TP 선도달이 많아야 한다 (${r.signal.tpFirstPct.toFixed(0)}%)`);
  assert.ok(r.signal.expectancyR > 0);
});

test('보유일은 1 이상 MAX_HOLD 이하다', () => {
  const r = walkForward(walk(600), 'atr', 'futures')!;
  assert.ok(r.signal.avgHeldDays >= 1 && r.signal.avgHeldDays <= MAX_HOLD);
});

test('window로 최근 구간만 잴 수 있다', () => {
  const c = walk(900);
  const all = walkForward(c, 'trend', 'futures')!;
  const recent = walkForward(c, 'trend', 'futures', { window: 200 })!;
  assert.ok(recent.signal.trades < all.signal.trades);
  assert.ok(recent.signal.trades >= MIN_TRADES);
});

test('여러 코인을 합칠 때 거래 수로 가중한다', () => {
  const a: StrategyScore = {
    key: 'trend',
    signal: { trades: 100, nextDayHitPct: 60, tpFirstPct: 50, expectancyR: 0.2, ambiguousPct: 0, avgHeldDays: 3 },
    baseline: { trades: 100, nextDayHitPct: 50, tpFirstPct: 45, expectancyR: 0.1, ambiguousPct: 0, avgHeldDays: 3 },
    hitEdgePP: 10, expectancyEdgeR: 0.1, skipped: 5,
  };
  const b: StrategyScore = {
    key: 'trend',
    signal: { trades: 300, nextDayHitPct: 40, tpFirstPct: 30, expectancyR: -0.2, ambiguousPct: 0, avgHeldDays: 5 },
    baseline: { trades: 300, nextDayHitPct: 50, tpFirstPct: 45, expectancyR: 0.1, ambiguousPct: 0, avgHeldDays: 5 },
    hitEdgePP: -10, expectancyEdgeR: -0.3, skipped: 7,
  };
  const m = mergeScores([a, b])!;
  assert.equal(m.signal.trades, 400);
  // 가중평균 = (60×100 + 40×300)/400 = 45
  near(m.signal.nextDayHitPct, 45, 1e-9);
  near(m.baseline.nextDayHitPct, 50, 1e-9);
  near(m.hitEdgePP, -5, 1e-9, '코인 하나만 보면 +10이지만 합치면 −5다');
  assert.equal(m.skipped, 12);
});

test('합칠 게 없으면 null', () => {
  assert.equal(mergeScores([]), null);
  assert.equal(mergeScores([null, null]), null);
});

test('표준오차는 표본이 커질수록 작아진다', () => {
  const small = hitEdgeStdErrPP(30, 30)!;
  const big = hitEdgeStdErrPP(3000, 3000)!;
  assert.ok(big < small / 5, `${big.toFixed(2)} << ${small.toFixed(2)}`);
  assert.equal(hitEdgeStdErrPP(0, 10), null);
});

test('작은 표본에서는 5%p 차이가 유의하지 않다', () => {
  const se = hitEdgeStdErrPP(30, 30)!;
  assert.equal(isSignificant(5, se), false, `표준오차 ${se.toFixed(1)}%p면 5%p는 잡음이다`);
  const seBig = hitEdgeStdErrPP(5000, 5000)!;
  assert.equal(isSignificant(5, seBig), true, '표본이 크면 같은 5%p가 유의해진다');
});

test('판정 — 적중률과 돈을 나눠 본다', () => {
  const seSmall = hitEdgeStdErrPP(30, 30);
  const seBig = hitEdgeStdErrPP(5000, 5000);

  // 표본이 작으면 어떤 차이도 잡음이다
  assert.equal(verdict(4, 0.5, seSmall), 'no-edge');
  assert.equal(verdictLabel(4, 0.5, seSmall), 'indistinguishable from always-long');

  // 실측 볼린저 형태: 적중률은 유의하게 높은데 기대값은 사실상 0
  assert.equal(verdict(2, 0.006, seBig), 'hit-only',
    '더 자주 맞히면서 돈은 못 버는 경우를 따로 부른다');
  assert.equal(VERDICT_LABEL['hit-only'], 'right more often, no richer');

  // 둘 다 좋아야 진짜 우위다
  assert.equal(verdict(5, 0.2, seBig), 'real-edge');
  assert.equal(verdict(-5, 0.2, seBig), 'worse', '적중률이 낮으면 기대값과 무관하게 나쁘다');

  // 표준오차를 모르면 단정하지 않는다
  assert.equal(verdict(10, 1, null), 'no-edge');
});

test('기대값이 간신히 양수인 건 우위로 치지 않는다', () => {
  const se = hitEdgeStdErrPP(5000, 5000);
  assert.equal(verdict(3, 0.019, se), 'hit-only', '0.02R 문턱 아래');
  assert.equal(verdict(3, 0.021, se), 'real-edge');
});

test('상수', () => {
  assert.equal(LOOKBACK, 220);
  assert.equal(MAX_HOLD, 10);
  assert.equal(MIN_TRADES, 20);
});
