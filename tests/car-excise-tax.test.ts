/**
 * 자동차 개별소비세 — 층층이 얹은 것을 도로 벗겨 본다.
 *
 * 이 계산기의 두 방향은 서로 역이어야 한다. 공장도가로 출고가를 만들고 그
 * 출고가만 넘겨 역산하면 처음 공장도가와 세 세금이 그대로 돌아와야 한다.
 * 그리고 층마다 기준이 다르므로(교육세는 개소세, 부가세는 셋의 합) 그 기준을
 * 각각 되짚는다 — 부가세를 공장도가에만 매기는 흔한 착각이 걸리도록.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_EXCISE_RATE, EDUCATION_TAX_RATE, EXCISE_LEVERAGE, VAT_RATE,
  calcExcise, compareRates, fromReleasePrice, priceMultiplier,
} from '../lib/car-excise-tax.ts';

const near = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

test('세금은 층으로 얹힌다 — 손으로 셈한 값', () => {
  assert.equal(DEFAULT_EXCISE_RATE, 0.05);
  assert.equal(EDUCATION_TAX_RATE, 0.3);
  assert.equal(VAT_RATE, 0.1);

  // 공장도가 2,000만원, 기본 세율 5%
  const r = calcExcise(20_000_000, 0.05);
  assert.equal(r.excise, 1_000_000);          // 2,000만 × 5%
  assert.equal(r.educationTax, 300_000);      // 100만 × 30%
  assert.equal(r.vat, 2_130_000);             // (2,000만 + 100만 + 30만) × 10%
  assert.equal(r.taxTotal, 3_430_000);
  assert.equal(r.releasePrice, 23_430_000);
  // 출고가의 14.6%가 세금이다
  assert.ok(near(r.taxRatio, 14.639, 0.001), `${r.taxRatio}`);

  // 배수 한 번으로 가도 같은 출고가가 나온다
  assert.ok(near(priceMultiplier(0.05), 1.1715, 1e-12));
  assert.ok(near(20_000_000 * priceMultiplier(0.05), r.releasePrice));
});

test('정방향과 역방향은 왕복한다', () => {
  for (const base of [1_000, 12_345_678, 20_000_000, 80_000_000]) {
    for (const rate of [0, 0.035, 0.05, 0.08]) {
      const f = calcExcise(base, rate);
      const b = fromReleasePrice(f.releasePrice, rate);
      const at = `${base} @ ${rate}`;

      // 출고가만 넘겼는데 공장도가가 돌아온다
      assert.ok(near(b.base, base), `과세표준 ${at}: ${b.base}`);
      assert.ok(near(b.excise, f.excise), `개소세 ${at}`);
      assert.ok(near(b.educationTax, f.educationTax), `교육세 ${at}`);
      assert.ok(near(b.vat, f.vat), `부가세 ${at}`);
      assert.ok(near(b.releasePrice, f.releasePrice), `출고가 ${at}`);
      // 세금 합계는 출고가에서 공장도가를 뺀 것과 같다
      assert.ok(near(f.taxTotal, f.releasePrice - base), `합계 ${at}`);
    }
  }
});

test('교육세는 개소세의 30%, 부가세는 세 항목 합의 10%', () => {
  for (const rate of [0.035, 0.05, 0.08]) {
    const r = calcExcise(45_000_000, rate);
    // 각 세금을 자기 기준으로 도로 나눈다
    assert.ok(near(r.educationTax / r.excise, EDUCATION_TAX_RATE, 1e-12), `교육세 @ ${rate}`);
    assert.ok(near(r.vat / (r.base + r.excise + r.educationTax), VAT_RATE, 1e-12), `부가세 @ ${rate}`);
    assert.ok(near(r.excise / r.base, rate, 1e-12), `개소세 @ ${rate}`);

    // 부가세를 공장도가에만 매기면 이보다 적다 — 세금 위에 세금이 붙는 자리
    assert.ok(r.vat > r.base * VAT_RATE, `@ ${rate}`);
    assert.ok(near(r.vat - r.base * VAT_RATE, (r.excise + r.educationTax) * VAT_RATE));
  }
});

test('세율이 0이면 출고가는 과세표준의 1.1배다 — 경차', () => {
  const r = calcExcise(15_000_000, 0);
  assert.equal(r.excise, 0);
  assert.equal(r.educationTax, 0);
  assert.equal(r.vat, 1_500_000);
  assert.equal(r.releasePrice, 16_500_000);
  assert.ok(near(r.releasePrice, 15_000_000 * 1.1));
  assert.ok(near(priceMultiplier(0), 1.1, 1e-12));

  // 음수 세율은 0으로 본다 — 세금이 되돌아오는 일은 없다
  assert.deepEqual(calcExcise(15_000_000, -0.05), r);
});

test('세율을 내리면 출고가가 그만큼 내려간다', () => {
  // 5% → 3.5%, 공장도가 2,000만원
  const c = compareRates(20_000_000, 0.05, 0.035);
  assert.equal(c.before.releasePrice, 23_430_000);
  assert.ok(near(c.after.releasePrice, 23_001_000));
  assert.ok(near(c.after.exciseRate, 0.035, 1e-12));
  assert.equal(c.capped, false);

  // 개소세는 30만원 깎였는데 출고가는 42.9만원 내려간다 — 교육세·부가세가 딸려 온다
  assert.ok(near(c.exciseCut, 300_000));
  assert.ok(near(c.saving, 429_000));
  assert.ok(near(c.saving, c.exciseCut * EXCISE_LEVERAGE));
  assert.ok(near(EXCISE_LEVERAGE, 1.43, 1e-12));
  assert.ok(near(c.savingRatio, (429_000 / 23_430_000) * 100));

  // 내린 뒤를 따로 정방향으로 풀어도 같은 값이다
  assert.ok(near(c.after.releasePrice, calcExcise(20_000_000, 0.035).releasePrice));

  // 세율이 낮아질수록 출고가는 계속 내려간다
  let prev = Infinity;
  for (const rate of [0.08, 0.05, 0.035, 0.015, 0]) {
    const p = calcExcise(30_000_000, rate).releasePrice;
    assert.ok(p < prev, `${rate}: ${p}`);
    prev = p;
  }

  // 올리는 쪽으로는 안 간다 — 내린 세율이 지금보다 높으면 아무것도 안 깎인다
  const up = compareRates(20_000_000, 0.035, 0.05);
  assert.equal(up.saving, 0);
  assert.ok(near(up.nominalRate, 0.035, 1e-12));
});

test('감면 한도가 있으면 그만큼만 깎인다', () => {
  // 공장도가 1억, 5% → 3.5%면 개소세가 150만원 깎일 자리인데 한도가 100만원
  const c = compareRates(100_000_000, 0.05, 0.035, 1_000_000);
  assert.equal(c.capped, true);
  assert.ok(near(c.exciseCut, 1_000_000));
  assert.ok(near(c.saving, 1_430_000));
  // 한도에 걸리면 실제 적용 세율은 명목 3.5%보다 높다
  assert.ok(near(c.nominalRate, 0.035, 1e-12));
  assert.ok(near(c.after.exciseRate, 0.04, 1e-12));
  assert.ok(near(c.after.releasePrice, 115_720_000));

  // 한도를 무시했다면 214.5만원을 아낀다고 부풀려 말하게 된다
  const noCap = compareRates(100_000_000, 0.05, 0.035);
  assert.ok(near(noCap.saving, 2_145_000));
  assert.ok(noCap.saving > c.saving);
  assert.equal(noCap.capped, false);

  // 싼 차는 깎일 세액이 한도보다 작아 한도가 걸리지 않는다
  const cheap = compareRates(10_000_000, 0.05, 0.035, 1_000_000);
  assert.equal(cheap.capped, false);
  assert.ok(near(cheap.exciseCut, 150_000));
  assert.ok(near(cheap.saving, 214_500));

  // 한도가 넉넉하면 한도가 없는 것과 같다
  assert.deepEqual(compareRates(100_000_000, 0.05, 0.035, 9_000_000), noCap);
});

test('출고가로 역산한 값을 그대로 인하 비교에 넘길 수 있다', () => {
  // 소비자가 아는 숫자는 출고가 하나다 — 3,500만원, 지금 세율 5%
  const now = fromReleasePrice(35_000_000, 0.05);
  assert.ok(near(now.releasePrice, 35_000_000));

  const c = compareRates(now.base, 0.05, 0.035);
  assert.ok(near(c.before.releasePrice, 35_000_000));
  // 출고가 대비 아끼는 비율은 공장도가 크기와 무관하다 — 1.5%p 인하면 늘 1.83%
  assert.ok(near(c.savingRatio, 1.831, 0.001), `${c.savingRatio}`);
  assert.ok(near(c.saving, 35_000_000 - now.base * priceMultiplier(0.035)));
});
