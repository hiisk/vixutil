import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcConversion, REGIONS, RENT_MULTIPLIER } from '../lib/deposit-conversion.ts';

const seoul = REGIONS.find(r => r.id === 'seoul')!;
const other = REGIONS.find(r => r.id === 'other')!;

test('환산보증금 = 보증금 + 월세 × 100', () => {
  const r = calcConversion(100_000_000, 5_000_000, seoul);
  assert.equal(r.fromRent, 500_000_000);
  assert.equal(r.converted, 600_000_000);
});

test('월세가 0이면 보증금이 곧 환산보증금이다', () => {
  const r = calcConversion(300_000_000, 0, seoul);
  assert.equal(r.converted, 300_000_000);
  assert.equal(r.fromRent, 0);
});

test('기준금액 이하 여부를 판정한다', () => {
  // 서울 기준 9억
  assert.equal(calcConversion(400_000_000, 5_000_000, seoul).withinThreshold, true);  // 9억 정확히
  assert.equal(calcConversion(400_000_000, 5_000_001, seoul).withinThreshold, false); // 1원 초과
});

test('경계값(기준금액과 정확히 같은 금액)은 이하로 본다', () => {
  const r = calcConversion(seoul.threshold, 0, seoul);
  assert.equal(r.converted, seoul.threshold);
  assert.equal(r.withinThreshold, true, '"이하"이므로 같은 금액은 포함된다');
  assert.equal(r.margin, 0);
});

test('여유·초과 금액을 알려준다', () => {
  const within = calcConversion(100_000_000, 1_000_000, seoul); // 2억
  assert.equal(within.margin, 700_000_000, '기준까지 7억 남음');

  const over = calcConversion(500_000_000, 5_000_000, seoul);   // 10억
  assert.equal(over.margin, -100_000_000, '1억 초과');
  assert.equal(over.withinThreshold, false);
});

test('기준을 넘지 않으려면 월세를 얼마까지 낮춰야 하는지 계산한다', () => {
  const r = calcConversion(400_000_000, 9_000_000, seoul);
  assert.equal(r.withinThreshold, false, '13억이라 초과');
  // (9억 - 4억) / 100 = 500만원
  assert.equal(r.maxRentToStayWithin, 5_000_000);

  // 실제로 그 월세면 기준을 만족해야 한다
  const fixed = calcConversion(400_000_000, r.maxRentToStayWithin!, seoul);
  assert.equal(fixed.withinThreshold, true);

  // 1원만 더 내도 초과해야 한다 (최대값이라는 뜻)
  assert.equal(calcConversion(400_000_000, r.maxRentToStayWithin! + 1, seoul).withinThreshold, false);
});

test('보증금만으로 이미 기준을 넘으면 월세를 낮춰도 소용없다', () => {
  const r = calcConversion(1_000_000_000, 1_000_000, seoul); // 보증금 10억 > 서울 9억
  assert.equal(r.maxRentToStayWithin, null, '월세를 0으로 해도 못 맞춘다');
  assert.equal(r.withinThreshold, false);
});

test('지역마다 기준금액이 다르다', () => {
  const deposit = 100_000_000;
  const rent = 3_000_000; // 환산 4억
  assert.equal(calcConversion(deposit, rent, seoul).withinThreshold, true, '서울 9억 → 이하');
  assert.equal(calcConversion(deposit, rent, other).withinThreshold, false, '그 밖 3.7억 → 초과');
});

test('지역 기준금액이 서울 > 과밀 > 광역시 > 그 밖 순이다', () => {
  const t = REGIONS.map(r => r.threshold);
  for (let i = 1; i < t.length; i++) {
    assert.ok(t[i] < t[i - 1], `${REGIONS[i].label}의 기준이 앞 지역보다 크거나 같다`);
  }
});

test('환산 배수는 100이다', () => {
  assert.equal(RENT_MULTIPLIER, 100, '시행령이 정한 배수');
});

test('음수·NaN 입력은 0으로 처리한다', () => {
  const r = calcConversion(-100, NaN, seoul);
  assert.equal(r.converted, 0);
  assert.equal(r.withinThreshold, true);
});
