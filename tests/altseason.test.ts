import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  periodReturn, labelOf, buildAltseasonIndex, distanceToBoundary,
  ALTSEASON_THRESHOLD, BITCOIN_SEASON_THRESHOLD, EXCLUDED,
  type AltInput,
} from '../lib/altseason.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

/** n일 동안 pct% 오르는 계열 */
const series = (n: number, pct: number) => {
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(100 * (1 + (pct / 100) * (i / (n - 1))));
  return out;
};

const alt = (base: string, closes: number[], quoteVolume = 1e6): AltInput => ({ base, closes, quoteVolume });

test('기간 수익률은 첫 종가 대비 마지막 종가다', () => {
  near(periodReturn([100, 150], 2)!, 50, 1e-9);
  near(periodReturn([100, 50], 2)!, -50, 1e-9);
  near(periodReturn([50, 100], 2)!, 100, 1e-9);
});

test('요청 일수보다 이력이 길면 뒤에서 그만큼만 본다', () => {
  const closes = [1, 2, 4, 100, 200]; // 마지막 2개만 보면 +100%
  near(periodReturn(closes, 2)!, 100, 1e-9);
  near(periodReturn(closes, 5)!, 19900, 1e-9, '전체를 보면 1 → 200');
});

test('이력이 모자라거나 값이 망가지면 null', () => {
  assert.equal(periodReturn([100], 2), null, '한 점으로는 수익률이 없다');
  assert.equal(periodReturn([], 2), null);
  assert.equal(periodReturn([0, 100], 2), null, '시작가 0');
  assert.equal(periodReturn([100, 0], 2), null, '종료가 0');
});

test('지수는 BTC를 이긴 비율이다', () => {
  const btc = series(90, 10); // BTC +10%
  const alts = [
    alt('A', series(90, 30)),  // 이김
    alt('B', series(90, 20)),  // 이김
    alt('C', series(90, 5)),   // 짐
    alt('D', series(90, -10)), // 짐
  ];
  const r = buildAltseasonIndex(alts, btc, 90)!;
  near(r.btcReturnPct, 10, 1e-9);
  assert.equal(r.total, 4);
  assert.equal(r.outperformers, 2);
  near(r.index, 50, 1e-9);
  assert.equal(r.label, 'neutral');
});

test('BTC 자신과 스테이블·랩드 토큰은 제외한다', () => {
  const btc = series(90, 10);
  const alts = [
    alt('BTC', series(90, 10)),
    alt('USDT', series(90, 0)),
    alt('WBTC', series(90, 10)),
    alt('ETH', series(90, 40)),
  ];
  const r = buildAltseasonIndex(alts, btc, 90)!;
  assert.deepEqual(r.rows.map(x => x.base), ['ETH'], 'ETH만 남아야 한다');
  assert.equal(r.total, 1);
  near(r.index, 100, 1e-9);
});

test('제외 목록에 주요 스테이블코인이 들어 있다', () => {
  for (const s of ['USDT', 'USDC', 'FDUSD', 'DAI', 'WBTC']) {
    assert.ok(EXCLUDED.has(s), `${s}는 제외돼야 한다`);
  }
  assert.ok(!EXCLUDED.has('ETH'), 'ETH는 제외 대상이 아니다');
});

test('vsBtcPp는 BTC 수익률과의 차이이고 부호가 승패를 정한다', () => {
  const btc = series(90, 10);
  const r = buildAltseasonIndex([alt('A', series(90, 35))], btc, 90)!;
  near(r.rows[0].vsBtcPp, 25, 1e-9, '35 − 10');
  assert.equal(r.rows[0].outperformed, true);

  const l = buildAltseasonIndex([alt('B', series(90, 4))], btc, 90)!;
  near(l.rows[0].vsBtcPp, -6, 1e-9);
  assert.equal(l.rows[0].outperformed, false);
});

test('BTC와 정확히 같은 수익률은 이긴 것이 아니다', () => {
  const btc = series(90, 10);
  const r = buildAltseasonIndex([alt('A', series(90, 10))], btc, 90)!;
  assert.equal(r.rows[0].outperformed, false, '동률은 초과 성과가 아니다');
  near(r.index, 0, 1e-9);
});

test('행은 BTC 대비 성과 내림차순이다', () => {
  const btc = series(90, 0);
  const r = buildAltseasonIndex(
    [alt('LOW', series(90, -20)), alt('HIGH', series(90, 50)), alt('MID', series(90, 10))],
    btc, 90,
  )!;
  assert.deepEqual(r.rows.map(x => x.base), ['HIGH', 'MID', 'LOW']);
});

test('BTC가 크게 오르면 지수가 내려간다 (하락장에서도 성립)', () => {
  // 전부 내렸어도 BTC보다 덜 내리면 알트시즌이다 — 정의상 상대 성과다
  const btc = series(90, -40);
  const alts = [alt('A', series(90, -10)), alt('B', series(90, -20)), alt('C', series(90, -30))];
  const r = buildAltseasonIndex(alts, btc, 90)!;
  near(r.index, 100, 1e-9, '셋 다 BTC보다 덜 빠졌다');
  assert.equal(r.label, 'altseason');
  assert.ok(r.rows.every(x => x.returnPct < 0), '그래도 전부 손실이다');
});

test('라벨 경계', () => {
  assert.equal(labelOf(ALTSEASON_THRESHOLD), 'altseason', '75는 포함');
  assert.equal(labelOf(ALTSEASON_THRESHOLD - 0.1), 'neutral');
  assert.equal(labelOf(BITCOIN_SEASON_THRESHOLD), 'bitcoin-season', '25는 포함');
  assert.equal(labelOf(BITCOIN_SEASON_THRESHOLD + 0.1), 'neutral');
  assert.equal(labelOf(50), 'neutral');
});

test('경계까지 거리 — 라벨을 얼마나 믿을지 판단하는 값', () => {
  near(distanceToBoundary(75), 0, 1e-9);
  near(distanceToBoundary(74), 1, 1e-9);
  near(distanceToBoundary(25), 0, 1e-9);
  near(distanceToBoundary(50), 25, 1e-9, '한가운데가 경계에서 가장 멀다');
});

test('비교할 코인이 없거나 BTC 이력이 없으면 null', () => {
  assert.equal(buildAltseasonIndex([], series(90, 10), 90), null);
  assert.equal(buildAltseasonIndex([alt('A', series(90, 10))], [100], 90), null, 'BTC 이력 부족');
  assert.equal(buildAltseasonIndex([alt('BTC', series(90, 10))], series(90, 10), 90), null, '제외 후 남는 코인이 없다');
});

test('수익률을 못 내는 코인은 조용히 빠진다', () => {
  const btc = series(90, 10);
  const r = buildAltseasonIndex([alt('OK', series(90, 30)), alt('BAD', [100])], btc, 90)!;
  assert.equal(r.total, 1, '이력이 없는 코인은 분모에서도 빠진다');
  assert.deepEqual(r.rows.map(x => x.base), ['OK']);
});
