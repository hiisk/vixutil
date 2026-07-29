import { test } from 'node:test';
import assert from 'node:assert/strict';
import { logReturns, pearson, downsideCorrelation, downsideCapture, rollingRange, corrLabel } from '../lib/correlation.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

/** 시드 고정 난수 — 테스트가 흔들리지 않게 */
function rng(seed = 7) {
  let s = seed >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return (s >>> 8) / 16777216; };
}

test('로그수익률', () => {
  const r = logReturns([100, 110, 121]);
  assert.equal(r.length, 2);
  near(r[0], Math.log(1.1), 1e-12);
  near(r[1], Math.log(1.1), 1e-12);
});

test('0이나 음수가 섞이면 그 자리는 NaN이다', () => {
  const r = logReturns([100, 0, 100]);
  assert.ok(Number.isNaN(r[0]));
  assert.ok(Number.isNaN(r[1]));
});

test('같은 계열의 상관계수는 1이다', () => {
  const a = Array.from({ length: 50 }, (_, i) => Math.sin(i / 3));
  near(pearson(a, a)!, 1, 1e-12);
});

test('부호를 뒤집으면 −1이다', () => {
  const a = Array.from({ length: 50 }, (_, i) => Math.sin(i / 3));
  near(pearson(a, a.map(x => -x))!, -1, 1e-12);
});

test('상수배는 상관계수를 바꾸지 않는다', () => {
  const a = Array.from({ length: 60 }, (_, i) => Math.cos(i / 4));
  near(pearson(a, a.map(x => x * 5 + 3))!, 1, 1e-12, '선형변환에 불변');
});

test('독립 계열은 0에 가깝다', () => {
  const r1 = rng(1), r2 = rng(999);
  const a = Array.from({ length: 3000 }, () => r1() - 0.5);
  const b = Array.from({ length: 3000 }, () => r2() - 0.5);
  const c = pearson(a, b)!;
  assert.ok(Math.abs(c) < 0.06, `독립이면 0 근처여야 한다 (${c.toFixed(4)})`);
});

test('길이가 다르면 뒤에서 맞춘다 — 최신 구간을 남긴다', () => {
  const long = [99, 99, 99, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const short = long.slice(3);
  near(pearson(long, short, 20)!, 1, 1e-12, '겹치는 최신 구간은 동일하다');
});

test('표본이 부족하면 null', () => {
  assert.equal(pearson([1, 2, 3], [1, 2, 3]), null, '기본 최소 표본(20) 미달');
  near(pearson([1, 2, 3], [1, 2, 3], 3)!, 1, 1e-12, '최소값을 낮추면 계산된다');
});

test('분산이 0이면 상관계수가 정의되지 않는다', () => {
  const flat = new Array(50).fill(0.01);
  const varied = Array.from({ length: 50 }, (_, i) => i / 100);
  assert.equal(pearson(flat, varied), null, '한쪽이 상수면 null');
});

test('NaN이 섞여도 유효한 짝만 쓴다', () => {
  const a = Array.from({ length: 60 }, (_, i) => (i === 5 ? NaN : Math.sin(i / 3)));
  const b = Array.from({ length: 60 }, (_, i) => Math.sin(i / 3));
  const c = pearson(a, b)!;
  assert.ok(c > 0.99, `NaN 한 자리를 빼고도 거의 1이어야 한다 (${c})`);
});

test('하락일 상관계수 — 급락일만 골라 다시 잰다', () => {
  // 기준이 크게 내린 날에만 두 자산이 함께 움직이도록 구성
  const n = 200;
  const bench: number[] = [], a: number[] = [], b: number[] = [];
  const r = rng(42);
  for (let i = 0; i < n; i++) {
    const crash = i % 5 === 0;
    // 급락 크기를 변화시킨다. 전부 같은 값이면 필터 후 상수가 되어 상관계수가 정의되지 않는다.
    const m = crash ? Math.log(1 - (0.04 + r() * 0.06)) : (r() - 0.5) * 0.01;
    bench.push(m);
    // 급락일엔 둘 다 기준을 따라가고, 평상시엔 서로 무관하게 움직인다
    a.push(crash ? m : (r() - 0.5) * 0.02);
    b.push(crash ? m : (r() - 0.5) * 0.02);
  }
  const all = pearson(a, b)!;
  const down = downsideCorrelation(a, b, bench, 3);
  assert.ok(down.days >= 15, `급락일이 충분히 잡혀야 한다 (${down.days}일)`);
  assert.ok(down.corr! > all, `급락일 상관 ${down.corr!.toFixed(2)} > 전체 ${all.toFixed(2)}`);
});

test('급락일이 부족하면 하락일 상관계수는 null', () => {
  const calm = new Array(200).fill(0.001);
  const a = Array.from({ length: 200 }, (_, i) => Math.sin(i / 5));
  assert.equal(downsideCorrelation(a, a, calm, 3).corr, null);
  assert.equal(downsideCorrelation(a, a, calm, 3).days, 0);
});

test('구간을 나눠 재면 범위가 나온다', () => {
  // 앞 절반은 같이, 뒤 절반은 반대로 움직이는 쌍
  const n = 400;
  const a: number[] = [], b: number[] = [];
  for (let i = 0; i < n; i++) {
    const v = Math.sin(i / 7);
    a.push(v);
    b.push(i < n / 2 ? v : -v);
  }
  const r = rollingRange(a, b, 4, 20)!;
  assert.equal(r.values.length, 4);
  assert.ok(r.max > 0.9, `앞 구간은 +1 근처 (${r.max.toFixed(2)})`);
  assert.ok(r.min < -0.9, `뒤 구간은 −1 근처 (${r.min.toFixed(2)})`);
  assert.ok(r.max - r.min > 1.5, '상관계수가 고정돼 있지 않다는 것이 요점');
});

test('구간 나누기에 표본이 부족하면 null', () => {
  const a = Array.from({ length: 30 }, (_, i) => i);
  assert.equal(rollingRange(a, a, 4, 20), null);
  assert.equal(rollingRange(a, a, 1, 5), null, '구간이 2개 미만');
});

test('상관계수 라벨', () => {
  assert.equal(corrLabel(0.95), 'moves in lockstep');
  assert.equal(corrLabel(0.75), 'strongly linked');
  assert.equal(corrLabel(0.5), 'loosely linked');
  assert.equal(corrLabel(0.25), 'weakly linked');
  assert.equal(corrLabel(0.05), 'largely unrelated');
  assert.equal(corrLabel(-0.95), 'moves in lockstep', '절대값으로 판단한다');
});

test('하방 추종 배수 — 기준과 같이 움직이면 1이다', () => {
  const n = 200;
  const bench: number[] = [], same: number[] = [];
  const r = rng(11);
  for (let i = 0; i < n; i++) {
    const crash = i % 4 === 0;
    const m = crash ? Math.log(1 - (0.04 + r() * 0.04)) : (r() - 0.5) * 0.01;
    bench.push(m); same.push(m);
  }
  const d = downsideCapture(same, bench, 3);
  assert.ok(d.days >= 40, `급락일 ${d.days}일`);
  near(d.capture!, 1, 1e-9, '같은 계열이면 정확히 1');
});

test('하방 추종 배수 — 두 배로 움직이면 2에 가깝다', () => {
  const n = 200;
  const bench: number[] = [], levered: number[] = [];
  const r = rng(12);
  for (let i = 0; i < n; i++) {
    const crash = i % 4 === 0;
    const m = crash ? Math.log(1 - (0.04 + r() * 0.04)) : (r() - 0.5) * 0.01;
    bench.push(m); levered.push(m * 2);
  }
  const d = downsideCapture(levered, bench, 3);
  // 로그공간 2배는 퍼센트로 정확히 2배가 아니지만 그 근처다
  assert.ok(d.capture! > 1.9 && d.capture! < 2.15, `2 근처여야 한다 (${d.capture!.toFixed(3)})`);
  assert.ok(d.assetMedianPct! < d.benchMedianPct!, '더 많이 빠졌다');
});

test('하방 추종 배수 — 급락일이 부족하면 null', () => {
  const calm = new Array(200).fill(0.001);
  const a = Array.from({ length: 200 }, (_, i) => Math.sin(i / 5) * 0.01);
  const d = downsideCapture(a, calm, 3);
  assert.equal(d.capture, null);
  assert.equal(d.days, 0);
});

test('하방 추종 배수는 부분표본 상관계수와 다른 것을 잰다', () => {
  // 상관계수는 범위 절단 때문에 왜곡되지만 중앙값 비율은 그렇지 않다
  const n = 300;
  const bench: number[] = [], asset: number[] = [];
  const r = rng(13);
  for (let i = 0; i < n; i++) {
    const crash = i % 3 === 0;
    const m = crash ? Math.log(1 - (0.03 + r() * 0.05)) : (r() - 0.5) * 0.01;
    bench.push(m);
    asset.push(m * 1.5 + (r() - 0.5) * 0.02);
  }
  const cap = downsideCapture(asset, bench, 3);
  const corr = downsideCorrelation(asset, bench, bench, 3);
  assert.ok(cap.capture! > 1.2, `추종 배수는 1.5 근처를 잡아낸다 (${cap.capture!.toFixed(2)})`);
  assert.ok(corr.corr != null, '상관계수도 계산은 되지만 다른 것을 말한다');
});
