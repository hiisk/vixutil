import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ratioOf, skewPp, accountVsMoneyGapPp, crowding } from '../lib/longshort.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('롱 비율에서 배수를 낸다', () => {
  near(ratioOf(0.5)!, 1, 1e-12, '반반이면 1배');
  near(ratioOf(0.75)!, 3, 1e-12, '75%면 3:1');
  near(ratioOf(0.25)!, 1 / 3, 1e-12);
  near(ratioOf(0.6103)!, 0.6103 / 0.3897, 1e-12, '실제 BTC 값');
});

test('0이나 1은 배수가 성립하지 않는다', () => {
  assert.equal(ratioOf(0), null, '숏이 없으면 나눌 수 없다');
  assert.equal(ratioOf(1), null);
  assert.equal(ratioOf(-0.1), null);
  assert.equal(ratioOf(NaN), null);
});

test('기울기는 50/50 기준 %p다', () => {
  near(skewPp(0.5)!, 0, 1e-12);
  near(skewPp(0.6)!, 10, 1e-12);
  near(skewPp(0.4)!, -10, 1e-12, '숏 쪽이면 음수');
  near(skewPp(1)!, 50, 1e-12);
  near(skewPp(0)!, -50, 1e-12);
});

test('기울기 잘못된 입력', () => {
  assert.equal(skewPp(1.5), null);
  assert.equal(skewPp(-0.1), null);
  assert.equal(skewPp(NaN), null);
});

test('계정과 금액의 어긋남 — 이 페이지의 요점', () => {
  // 사람 수는 롱 70%인데 돈은 롱 50%면, 소액 다수가 롱이고 큰 돈은 중립이다
  near(accountVsMoneyGapPp(0.7, 0.5)!, 20, 1e-12);
  // 반대 방향
  near(accountVsMoneyGapPp(0.5, 0.7)!, -20, 1e-12);
  // 같으면 0
  near(accountVsMoneyGapPp(0.62, 0.62)!, 0, 1e-12);
});

test('금액 데이터가 없으면 어긋남도 없다', () => {
  assert.equal(accountVsMoneyGapPp(0.6, null), null);
  assert.equal(accountVsMoneyGapPp(0.6, NaN), null);
});

test('군중 정도 경계', () => {
  assert.equal(crowding(0.5), 'balanced');
  assert.equal(crowding(0.59), 'balanced', '9%p는 아직 balanced');
  assert.equal(crowding(0.6), 'tilted', '10%p부터 tilted');
  assert.equal(crowding(0.69), 'tilted');
  assert.equal(crowding(0.7), 'crowded', '20%p부터 crowded');
  // 숏 쪽도 대칭이어야 한다
  assert.equal(crowding(0.4), 'tilted');
  assert.equal(crowding(0.3), 'crowded');
});

test('군중 정도는 방향과 무관하게 절대값으로 판단한다', () => {
  assert.equal(crowding(0.75), crowding(0.25), '롱 75%와 숏 75%는 같은 쏠림이다');
  assert.equal(crowding(0.62), crowding(0.38));
});

test('배수와 기울기는 서로 정합한다', () => {
  for (const share of [0.3, 0.45, 0.5, 0.55, 0.7, 0.9]) {
    const r = ratioOf(share)!;
    const s = skewPp(share)!;
    // 배수가 1보다 크면 기울기가 양수여야 한다
    assert.equal(r > 1, s > 0, `share=${share}`);
    // 배수에서 비율을 되돌리면 원래 값이다
    near(r / (1 + r), share, 1e-12);
  }
});
