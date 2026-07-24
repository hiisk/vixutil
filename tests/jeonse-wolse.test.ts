import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcJeonseWolse, type JeonseWolseInput } from '../lib/jeonse-wolse.ts';

const base: JeonseWolseInput = {
  jeonseDeposit: 300_000_000,
  wolseDeposit: 30_000_000,
  monthlyRent: 1_000_000,
  rate: 4,
};

test('두 방식의 연 비용을 자금비용률로 계산한다', () => {
  // 전세: 3억 × 4% = 1,200만
  // 월세: 100만×12 + 3천만×4% = 1,200만 + 120만 = 1,320만
  const r = calcJeonseWolse(base);
  assert.equal(r.jeonseAnnualCost, 12_000_000);
  assert.equal(r.wolseAnnualCost, 13_200_000);
  assert.equal(r.annualDiff, 1_200_000);
});

test('연 비용이 낮은 쪽을 유리하다고 판정한다', () => {
  // 위 예시에서 전세가 120만 저렴 → 전세 유리
  assert.equal(calcJeonseWolse(base).cheaper, 'jeonse');
});

test('금리가 높으면 월세가 유리해진다', () => {
  // 자금비용률이 오르면 큰 전세보증금을 묶는 비용이 커진다.
  const low = calcJeonseWolse({ ...base, rate: 2 });
  const high = calcJeonseWolse({ ...base, rate: 10 });
  assert.equal(low.cheaper, 'jeonse');
  assert.equal(high.cheaper, 'wolse');
});

test('손익분기 금리에서 두 비용이 실제로 같아진다', () => {
  const r = calcJeonseWolse(base);
  assert.ok(r.breakevenRate !== null);
  // 손익분기 금리를 그대로 넣으면 두 연 비용이 같아야 한다.
  const atBreakeven = calcJeonseWolse({ ...base, rate: r.breakevenRate! });
  assert.ok(Math.abs(atBreakeven.annualDiff) < 1, `분기점에서 차액 ${atBreakeven.annualDiff}`);
  assert.equal(atBreakeven.cheaper, 'equal');
});

test('손익분기 공식이 맞다', () => {
  // 월세×12 = (전세보증금 − 월세보증금) × rate*
  // = 1,200만 = 2.7억 × rate* → rate* = 4.444...%
  const r = calcJeonseWolse(base);
  const expected = (12_000_000 / 270_000_000) * 100;
  assert.ok(Math.abs(r.breakevenRate! - expected) < 1e-9);
});

test('손익분기 금리보다 높으면 월세, 낮으면 전세', () => {
  const r = calcJeonseWolse(base);
  const be = r.breakevenRate!;
  assert.equal(calcJeonseWolse({ ...base, rate: be + 1 }).cheaper, 'wolse');
  assert.equal(calcJeonseWolse({ ...base, rate: be - 1 }).cheaper, 'jeonse');
});

test('두 보증금이 같으면 손익분기 금리가 정의되지 않는다', () => {
  // 보증금 차이가 없으면 금리를 아무리 바꿔도 월세만큼 전세가 항상 저렴하다.
  const r = calcJeonseWolse({ ...base, jeonseDeposit: 30_000_000, wolseDeposit: 30_000_000 });
  assert.equal(r.breakevenRate, null);
  assert.equal(r.cheaper, 'jeonse'); // 월세는 추가로 월세를 내므로
});

test('월 기준 차액은 연 차액의 1/12이다', () => {
  const r = calcJeonseWolse(base);
  assert.ok(Math.abs(r.monthlyDiff - Math.abs(r.annualDiff) / 12) < 1e-9);
});

test('음수 입력은 0으로 눌러 계산된다', () => {
  const r = calcJeonseWolse({ jeonseDeposit: -100, wolseDeposit: -50, monthlyRent: -1000, rate: -3 });
  assert.ok(Number.isFinite(r.jeonseAnnualCost));
  assert.equal(r.jeonseAnnualCost, 0);
  assert.equal(r.wolseAnnualCost, 0);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const a = calcJeonseWolse({ jeonseDeposit: 250_000_000, wolseDeposit: 20_000_000, monthlyRent: 800_000, rate: 3.5 });
  const b = calcJeonseWolse({ jeonseDeposit: 250_000_000, wolseDeposit: 20_000_000, monthlyRent: 800_000, rate: 3.5 });
  assert.deepEqual(a, b);
});
