/**
 * 기초연금 — 환산식을 양방향으로 되짚는다.
 *
 *  - 재산 → 월 소득 환산은 연 4%를 12로 나눈 것이다. maxAssetFor가 그 식을
 *    뒤집으므로, 되짚은 재산을 다시 넣으면 선정기준액에 딱 닿아야 한다
 *  - 근로소득은 공제 뒤 70%만 센다
 *  - 부부는 20% 깎인다
 *  - 소득역전방지 감액은 "받고 나서도 선정기준액을 안 넘게" 만든다
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ASSET_CONVERSION_RATE, COUPLE_REDUCTION, FINANCIAL_DEDUCTION, LINKAGE_THRESHOLD, WORK_INCOME_FACTOR,
  calcBasicPension, maxAssetFor,
} from '../lib/basic-pension.ts';

/** 고시값은 해마다 바뀌므로 검사에서도 값을 직접 넣는다 — 규칙만 본다 */
const base = {
  workIncome: 0,
  otherIncome: 0,
  workDeduction: 1_100_000,
  generalAsset: 0,
  financialAsset: 0,
  debt: 0,
  basicAssetDeduction: 135_000_000,
  luxuryAsset: 0,
  threshold: 2_280_000,
  fullAmount: 340_000,
  couple: false,
  nationalPension: 0,
};

test('근로소득은 공제 뒤 70%만 센다', () => {
  const r = calcBasicPension({ ...base, workIncome: 2_100_000 });
  // (210만 − 110만) × 0.7 = 70만
  assert.equal(r.incomeValue, (2_100_000 - 1_100_000) * WORK_INCOME_FACTOR);
  assert.equal(r.incomeValue, 700_000);

  // 공제액보다 적게 벌면 근로소득은 0으로 센다(음수가 다른 소득을 지우지 않는다)
  const small = calcBasicPension({ ...base, workIncome: 500_000, otherIncome: 300_000 });
  assert.equal(small.incomeValue, 300_000);
});

test('재산은 연 4%를 열둘로 나눠 월 소득으로 센다', () => {
  const asset = base.basicAssetDeduction + 120_000_000;
  const r = calcBasicPension({ ...base, generalAsset: asset });
  assert.equal(r.assetValue, (120_000_000 * ASSET_CONVERSION_RATE) / 12);
  assert.equal(r.assetValue, 400_000);

  // 기본재산액 이하면 환산액이 0이다
  assert.equal(calcBasicPension({ ...base, generalAsset: base.basicAssetDeduction }).assetValue, 0);
  assert.equal(calcBasicPension({ ...base, generalAsset: 1_000_000 }).assetValue, 0);
});

test('금융재산은 2천만원을 빼고 센다', () => {
  /* 기본재산액을 일반재산이 이미 다 쓴 상태에서 금융재산만 더한다 */
  const input = { ...base, generalAsset: base.basicAssetDeduction };
  const r = calcBasicPension({ ...input, financialAsset: FINANCIAL_DEDUCTION + 60_000_000 });
  assert.equal(r.assetValue, (60_000_000 * ASSET_CONVERSION_RATE) / 12);
  assert.equal(calcBasicPension({ ...input, financialAsset: FINANCIAL_DEDUCTION }).assetValue, 0);
});

test('기본재산액 공제는 일반재산에서 먼저 빼고 남으면 금융재산으로 넘어간다', () => {
  /*
   * 지침이 그렇게 정해 두었다. 전세로 살며 예금만 있는 사람이 이 규칙의 덕을
   * 가장 크게 본다 — 일반재산이 0이면 기본재산액 1억 3,500만원이 고스란히
   * 금융재산 공제로 넘어간다.
   *
   * 처음에 이 검사를 "일반재산 0 + 금융 8,000만이면 환산액이 있다"로 적었는데
   * 계산은 0을 냈다. 계산이 맞고 검사가 틀렸던 자리다.
   */
  const onlyCash = calcBasicPension({ ...base, financialAsset: 80_000_000 });
  assert.equal(onlyCash.assetValue, 0, '넘어온 공제를 못 쓰고 있다');

  // 기본재산액 + 금융공제를 합쳐 그만큼까지는 환산액이 0이다
  const line = base.basicAssetDeduction + FINANCIAL_DEDUCTION;
  assert.equal(calcBasicPension({ ...base, financialAsset: line }).assetValue, 0);
  const over = calcBasicPension({ ...base, financialAsset: line + 30_000_000 });
  assert.equal(over.assetValue, (30_000_000 * ASSET_CONVERSION_RATE) / 12);
});

test('고급자동차는 공제 없이 전액이 월 소득이다', () => {
  /* 이 자리에 4%를 매기면 감액이 거의 안 생겨 판정이 뒤집힌다 */
  const r = calcBasicPension({ ...base, luxuryAsset: 3_000_000 });
  assert.equal(r.assetValue, 3_000_000);
  assert.equal(r.eligible, false, '고급자동차가 있는데도 수급 대상으로 나왔다');
});

test('부채는 재산에서 빼지만 음수로 내려가지 않는다', () => {
  const withDebt = calcBasicPension({
    ...base, generalAsset: base.basicAssetDeduction + 100_000_000, debt: 40_000_000,
  });
  assert.equal(withDebt.assetValue, (60_000_000 * ASSET_CONVERSION_RATE) / 12);

  // 부채가 재산보다 많아도 다른 소득을 지워 주지는 않는다
  const buried = calcBasicPension({ ...base, otherIncome: 500_000, debt: 900_000_000 });
  assert.equal(buried.assetValue, 0);
  assert.equal(buried.recognized, 500_000);
});

test('재산 한도를 되짚어 다시 넣으면 선정기준액에 닿는다', () => {
  /* 환산식을 뒤집은 것이 맞는지 — 왕복시켜 본다 */
  for (const otherIncome of [0, 300_000, 1_000_000]) {
    const input = { ...base, otherIncome };
    const cap = maxAssetFor(input);
    const at = calcBasicPension({ ...input, generalAsset: cap });
    assert.ok(
      Math.abs(at.recognized - base.threshold) < 1,
      `기타소득 ${otherIncome}: 되짚은 재산 ${cap}에서 소득인정액이 ${at.recognized}다`,
    );
    assert.equal(at.eligible, true);

    // 한 푼이라도 더 가지면 넘는다
    const over = calcBasicPension({ ...input, generalAsset: cap + 10_000_000 });
    assert.equal(over.eligible, false);
  }
});

test('선정기준액을 넘으면 한 푼도 못 받는다', () => {
  const over = calcBasicPension({ ...base, otherIncome: 3_000_000 });
  assert.equal(over.eligible, false);
  assert.equal(over.monthly, 0);
  assert.ok(over.headroom < 0);
});

test('부부는 20% 깎인다', () => {
  const single = calcBasicPension(base);
  const couple = calcBasicPension({ ...base, couple: true });
  assert.equal(single.monthly, base.fullAmount);
  assert.equal(couple.afterCouple, base.fullAmount * (1 - COUPLE_REDUCTION));
  assert.ok(Math.abs(couple.monthly / single.monthly - 0.8) < 1e-9);
});

test('소득역전방지 감액은 받고 나서도 기준을 안 넘게 만든다', () => {
  /*
   * 소득인정액이 선정기준액에 거의 닿은 사람이 기준연금액을 다 받으면, 못 받는
   * 사람보다 형편이 좋아진다. 그래서 남은 여유만큼만 준다 — 그 결과가 실제로
   * 기준을 안 넘는지 본다.
   */
  const nearly = calcBasicPension({ ...base, otherIncome: base.threshold - 100_000 });
  assert.equal(nearly.eligible, true);
  assert.ok(nearly.reverseCut > 0, '감액이 안 걸렸다');
  assert.equal(nearly.monthly, 100_000);
  assert.ok(nearly.recognized + nearly.monthly <= base.threshold + 1e-9, '받고 나서 기준을 넘었다');

  // 여유가 넉넉하면 감액이 없다
  const plenty = calcBasicPension({ ...base, otherIncome: 500_000 });
  assert.equal(plenty.reverseCut, 0);
  assert.equal(plenty.monthly, base.fullAmount);
});

test('국민연금이 기준연금액의 150%를 넘으면 연계 감액을 알린다', () => {
  /* 금액을 지어내지 않고 "대상일 수 있다"고만 알린다 */
  const line = base.fullAmount * LINKAGE_THRESHOLD;
  assert.equal(calcBasicPension({ ...base, nationalPension: line }).linkageRisk, false);
  assert.equal(calcBasicPension({ ...base, nationalPension: line + 1 }).linkageRisk, true);

  // 수급 대상이 아니면 연계 감액을 따질 일이 없다
  const notEligible = calcBasicPension({ ...base, otherIncome: 9_000_000, nationalPension: line * 2 });
  assert.equal(notEligible.linkageRisk, false);
});

test('소득인정액은 두 몫의 합이다', () => {
  const r = calcBasicPension({
    ...base, workIncome: 2_000_000, otherIncome: 200_000,
    generalAsset: base.basicAssetDeduction + 50_000_000, financialAsset: FINANCIAL_DEDUCTION + 10_000_000,
  });
  assert.ok(Math.abs(r.recognized - (r.incomeValue + r.assetValue)) < 1e-9);
});
