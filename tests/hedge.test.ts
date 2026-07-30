import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  correlationCI, excludesZero, rollingCorrelation,
  stressResponse, thresholdResponse, hedgeVerdict,
} from '../lib/hedge.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('피셔 신뢰구간은 상관계수를 감싼다', () => {
  const ci = correlationCI(0.137, 2162)!;
  assert.ok(ci.lo < 0.137 && ci.hi > 0.137);
  // 실제 BTC/금 값과 대조 — 표본이 크면 0.14도 0과 뚜렷이 다르다
  near(ci.lo, 0.095, 0.002);
  near(ci.hi, 0.178, 0.002);
  assert.ok(excludesZero(ci), '2162개 표본에서 0.137은 0을 배제한다');
});

test('표본이 작으면 같은 상관계수라도 0을 배제하지 못한다', () => {
  const small = correlationCI(0.137, 60)!;
  assert.ok(small.lo < 0, `n=60이면 하한 ${small.lo.toFixed(3)}이 음수다`);
  assert.equal(excludesZero(small), false);
  // 구간 폭이 표본과 함께 좁아진다
  const big = correlationCI(0.137, 2162)!;
  assert.ok(big.hi - big.lo < small.hi - small.lo);
});

test('신뢰구간은 −1..1을 벗어나지 않는다', () => {
  const ci = correlationCI(0.98, 20)!;
  assert.ok(ci.hi < 1 && ci.lo > -1, `[${ci.lo}, ${ci.hi}]`);
});

test('신뢰구간 경계값', () => {
  assert.equal(correlationCI(1, 100), null, 'r=1은 z가 발산한다');
  assert.equal(correlationCI(-1, 100), null);
  assert.equal(correlationCI(0.5, 3), null, 'n−3이 0 이하');
  assert.equal(excludesZero(null), false);
});

test('완전 상관을 슬라이딩 창으로 재면 전부 1이다', () => {
  const a = Array.from({ length: 200 }, (_, i) => Math.sin(i / 7));
  const b = a.map(x => x * 3 + 1);
  const r = rollingCorrelation(a, b, 30)!;
  near(r.min, 1, 1e-9);
  near(r.max, 1, 1e-9);
  near(r.positivePct, 100, 1e-9);
  assert.equal(r.values.length, 200 - 30 + 1);
});

test('관계가 뒤집히면 롤링이 그걸 잡는다 — 페이지의 논점', () => {
  // 앞 절반은 같이 움직이고 뒤 절반은 반대로 움직인다
  const a: number[] = [], b: number[] = [];
  for (let i = 0; i < 300; i++) {
    const x = Math.sin(i / 5);
    a.push(x);
    b.push(i < 150 ? x : -x);
  }
  const r = rollingCorrelation(a, b, 40)!;
  assert.ok(r.min < -0.9, `최소 ${r.min.toFixed(2)}는 강한 음의 상관이다`);
  assert.ok(r.max > 0.9, `최대 ${r.max.toFixed(2)}는 강한 양의 상관이다`);
  assert.ok(r.positivePct > 20 && r.positivePct < 80, '양쪽이 섞여 있다');
});

test('상수 계열이 섞인 창은 건너뛴다', () => {
  const a = Array.from({ length: 100 }, (_, i) => (i < 50 ? 0 : Math.sin(i)));
  const b = Array.from({ length: 100 }, (_, i) => Math.cos(i));
  const r = rollingCorrelation(a, b, 20);
  // 앞쪽 창은 분산 0이라 빠지고, 뒤쪽만 남는다
  assert.ok(r == null || r.values.length < 100 - 20 + 1);
});

test('롤링 경계값', () => {
  assert.equal(rollingCorrelation([1, 2, 3], [1, 2, 3], 90), null, '데이터가 창보다 짧다');
  assert.equal(rollingCorrelation(Array(200).fill(1), Array(200).fill(2), 30), null, '둘 다 상수');
});

test('스트레스 반응 — 헤지라면 기준이 깨질 때 오른다', () => {
  //         0     1     2     3     4     5
  const b = [-10, -8, -6, 1, 2, 3];
  const a = [2, 3, -1, 0, 0, 0];
  const s = stressResponse(a, b, 3)!;
  assert.equal(s.days, 3);
  near(s.benchMeanPct, -8, 1e-9);
  near(s.assetMeanPct, (2 + 3 - 1) / 3, 1e-9);
  assert.equal(s.assetUpDays, 2);
  near(s.assetUpPct, (2 / 3) * 100, 1e-9);
  assert.equal(hedgeVerdict(s), 'hedge', '평균이 양수이고 절반 넘게 올랐다');
});

test('스트레스 반응 — 같이 빠지면 헤지가 아니다', () => {
  // 실제 BTC/금 형태: 금 평균 −0.75%, 20일 중 6일만 상승
  const b: number[] = [], a: number[] = [];
  for (let i = 0; i < 20; i++) { b.push(-10 - i * 0.1); a.push(i < 6 ? 0.5 : -1.2); }
  for (let i = 0; i < 100; i++) { b.push(1); a.push(0.1); }
  const s = stressResponse(a, b, 20)!;
  assert.equal(s.assetUpDays, 6);
  assert.ok(s.assetMeanPct < 0);
  assert.equal(hedgeVerdict(s), 'fails');
});

test('스트레스 반응 — 애매하면 neutral', () => {
  const b = [-10, -9, -8, -7];
  const a = [1, 1, -1, -1]; // 평균 0, 절반 상승
  const s = stressResponse(a, b, 4)!;
  near(s.assetMeanPct, 0, 1e-12);
  assert.equal(s.assetUpPct, 50);
  assert.equal(hedgeVerdict(s), 'neutral');
});

test('가장 크게 빠진 날을 고르지, 앞에서 자르지 않는다', () => {
  const b = [1, -20, 2, -30, 3, -10];
  const a = [0, 5, 0, 7, 0, 3];
  const s = stressResponse(a, b, 2)!;
  near(s.benchMeanPct, -25, 1e-9, '−30과 −20');
  near(s.assetMeanPct, 6, 1e-9);
});

test('임계값 반응은 표본 수가 데이터로 정해진다', () => {
  const b = [-6, -5, -4.9, -20, 1, 2];
  const a = [1, -1, 0, -2, 0, 0];
  const t = thresholdResponse(a, b, 5)!;
  assert.equal(t.days, 3, '−6, −5, −20 (−4.9는 미달)');
  assert.equal(t.assetUpDays, 1);
  near(t.benchMeanPct, (-6 - 5 - 20) / 3, 1e-9);
});

test('임계값에 걸리는 날이 없으면 null', () => {
  assert.equal(thresholdResponse([1, 2, 3], [1, 2, 3], 5), null);
  assert.equal(thresholdResponse([1, 2, 3], [-1, -2, -3], 0), null, '임계값은 양수여야 한다');
});

test('망가진 값은 계산에서 빠진다', () => {
  const b = [-10, NaN, -8, 1];
  const a = [2, 99, 3, 0];
  const s = stressResponse(a, b, 2)!;
  assert.equal(s.days, 2);
  near(s.assetMeanPct, 2.5, 1e-9, 'NaN인 날의 99가 들어오면 안 된다');
});

test('스트레스 경계값', () => {
  assert.equal(stressResponse([1, 2], [1, 2], 5), null, '요청한 날 수가 데이터보다 많다');
  assert.equal(stressResponse([], [], 1), null);
  assert.equal(stressResponse([1, 2, 3], [1, 2, 3], 0), null);
  assert.equal(hedgeVerdict(null), 'unknown');
});
