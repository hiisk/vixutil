import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stdev, downsideDeviation, riskMetrics, rankDisagreement, DAYS_PER_YEAR } from '../lib/metrics.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

/** 매일 정확히 pct% 오르는 종가 */
const steady = (n: number, pct: number, start = 100) => {
  const out = [start];
  for (let i = 1; i < n; i++) out.push(out[i - 1] * (1 + pct / 100));
  return out;
};

test('표본 표준편차는 n−1로 나눈다', () => {
  // [2,4,4,4,5,5,7,9] 의 표본 표준편차는 √(32/7)
  near(stdev([2, 4, 4, 4, 5, 5, 7, 9])!, Math.sqrt(32 / 7), 1e-12);
  assert.equal(stdev([1]), null, '한 개로는 정의되지 않는다');
  assert.equal(stdev([]), null);
});

test('하방 표준편차는 목표 위쪽을 0으로 본다', () => {
  // 전부 양수면 하방 편차는 0
  near(downsideDeviation([0.01, 0.02, 0.03])!, 0, 1e-12);
  // −0.1 하나만 있으면 √(0.01/3)
  near(downsideDeviation([0.1, 0.1, -0.1])!, Math.sqrt(0.01 / 3), 1e-12);
});

test('하방 표준편차 분모는 전체 관측 수다', () => {
  // 하락이 드문 자산이 부당하게 나쁘게 나오지 않아야 한다
  const rare = downsideDeviation([-0.1, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01])!;
  const often = downsideDeviation([-0.1, -0.1])!;
  assert.ok(rare < often, `드문 하락 ${rare.toFixed(4)} < 잦은 하락 ${often.toFixed(4)}`);
});

test('일정하게 오르는 자산은 변동성 0이라 지표가 정의되지 않는다', () => {
  // 매일 같은 비율로 오르면 로그수익률이 상수 → 표준편차 0
  assert.equal(riskMetrics(steady(200, 0.5)), null, '변동성 0이면 나눌 수 없다');
});

test('연환산 수익률이 실제 성장과 맞는다', () => {
  // 1년(365일) 동안 정확히 2배가 되는 계열 + 약간의 잡음
  const n = 366;
  const daily = Math.pow(2, 1 / (n - 1)) - 1;
  const closes = [100];
  for (let i = 1; i < n; i++) {
    // 잡음을 넣어 변동성이 0이 아니게 한다 (마지막에 정확히 2배로 맞춘다)
    const wobble = i % 2 === 0 ? 1.001 : 1 / 1.001;
    closes.push(closes[i - 1] * (1 + daily) * (i === n - 1 ? 1 : wobble));
  }
  const m = riskMetrics(closes)!;
  assert.ok(m.annualReturnPct > 90 && m.annualReturnPct < 110, `약 100%여야 한다 (${m.annualReturnPct.toFixed(1)}%)`);
  assert.equal(m.samples, n - 1);
});

test('최대 낙폭은 회복 후에도 남는다', () => {
  const closes = [100, 50, 200, 180];
  const m = riskMetrics([...closes, ...steady(80, 0.1, 180)])!;
  assert.ok(m.maxDrawdownPct >= 50, `50% 낙폭이 기록돼야 한다 (${m.maxDrawdownPct.toFixed(1)}%)`);
});

test('샤프와 소르티노는 같은 부호를 가진다', () => {
  const up: number[] = [100];
  for (let i = 1; i < 300; i++) up.push(up[i - 1] * (1 + (i % 3 === 0 ? -0.01 : 0.012)));
  const m = riskMetrics(up)!;
  assert.ok(m.sharpe! > 0 && m.sortino! > 0, '상승 추세면 둘 다 양수');
  assert.ok(m.sortino! > m.sharpe!, '하락이 드물면 소르티노가 더 크다');
});

test('하락 추세는 샤프가 음수다', () => {
  const down: number[] = [100];
  for (let i = 1; i < 300; i++) down.push(down[i - 1] * (1 + (i % 3 === 0 ? 0.01 : -0.012)));
  const m = riskMetrics(down)!;
  assert.ok(m.sharpe! < 0);
  assert.ok(m.calmar! < 0, '수익이 음수면 칼마도 음수');
});

test('칼마는 연수익을 최대낙폭으로 나눈 값이다', () => {
  const closes: number[] = [100];
  for (let i = 1; i < 400; i++) closes.push(closes[i - 1] * (1 + (i % 5 === 0 ? -0.02 : 0.008)));
  const m = riskMetrics(closes)!;
  near(m.calmar!, m.annualReturnPct / m.maxDrawdownPct, 1e-9);
});

test('연환산은 365일 기준이다 — 암호화폐는 휴장이 없다', () => {
  assert.equal(DAYS_PER_YEAR, 365);
  const closes: number[] = [100];
  for (let i = 1; i < 400; i++) closes.push(closes[i - 1] * (1 + (i % 2 ? 0.01 : -0.008)));
  const m = riskMetrics(closes)!;
  // 일간 변동성 × √365 인지 확인
  const rets: number[] = [];
  for (let i = 1; i < closes.length; i++) rets.push(Math.log(closes[i] / closes[i - 1]));
  near(m.annualVolPct, stdev(rets)! * Math.sqrt(365) * 100, 1e-9);
});

test('표본이 부족하면 null', () => {
  assert.equal(riskMetrics(steady(30, 1)), null);
  assert.equal(riskMetrics([]), null);
  assert.equal(riskMetrics([100, 0, -5]), null);
});

test('순위 불일치를 잡아낸다 — 이 모듈의 요점', () => {
  // A는 수익 1위·낙폭 3위, C는 그 반대 → 지표에 따라 순위가 뒤집힌다
  const items = [
    { n: 'A', ret: 100, dd: 90 },
    { n: 'B', ret: 50, dd: 50 },
    { n: 'C', ret: 30, dd: 10 },
  ];
  const d = rankDisagreement(items, [x => x.ret, x => -x.dd]);
  const a = d.get(items[0])!;
  assert.deepEqual(a.ranks, [1, 3], '수익 1위, 낙폭 기준 3위');
  assert.equal(a.spread, 2);
  const b = d.get(items[1])!;
  assert.equal(b.spread, 0, 'B는 두 기준에서 같은 순위');
});

test('점수를 못 내는 항목은 순위에서 빠진다', () => {
  const items = [{ v: 1 }, { v: 2 }];
  const d = rankDisagreement(items, [x => x.v, () => null]);
  assert.equal(d.get(items[0])!.ranks[1], null);
  assert.equal(d.get(items[0])!.spread, null, '비교할 순위가 하나뿐이면 spread 없음');
});
