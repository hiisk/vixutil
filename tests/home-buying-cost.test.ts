/**
 * 집 살 때 부대비용 — 합계를 다른 길로 되짚고, 경계를 1원 차이로 밟는다.
 *
 * 이 계산기가 틀리는 방식은 둘뿐이다. 항목 하나가 합계에서 빠지거나,
 * 구간 경계에서 값이 엉뚱하게 튀거나. 그래서 검사도 둘을 본다 —
 * 화면에 뿌리는 내역을 손으로 더한 값이 합계와 정확히 같은지(항등식),
 * 그리고 6억·9억·10억 자리를 1원씩 넘나들 때 답이 어떻게 움직이는지.
 *
 * 비율은 되짚어 금액을 복원한다. 비율만 보고 넘어가면 분모를 잘못 잡은
 * 실수를 못 잡는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AREA_LIMIT, EDU_TAX_ON_ACQ, RATE_HIGH, RATE_LOW, RURAL_TAX_RATE,
  STAMP_HOUSE_EXEMPT_UNDER, TIER_HIGH, TIER_LOW,
  calcHomeBuyingCost, housingAcqRate, housingTaxRates, stampDuty,
  type HomeBuyingInput,
} from '../lib/home-buying-cost.ts';

/** 손으로 세기 좋은 기본 입력 — 항목마다 0이 아닌 값을 준다 */
const base = (price: number, over85 = false): HomeBuyingInput => ({
  price,
  taxRates: housingTaxRates(price, over85),
  brokerRate: 0.4,
  brokerVat: true,
  bondRate: 0,
  bondDiscountRate: 0,
  legalFee: 600_000,
  movingFee: 800_000,
  interiorFee: 10_000_000,
  loanFee: 400_000,
});

test('취득세율은 6억·9억에서 정확히 이어진다', () => {
  // 경계값 자체
  assert.equal(housingAcqRate(TIER_LOW), RATE_LOW);
  assert.equal(housingAcqRate(TIER_HIGH), RATE_HIGH);
  // 6억 아래는 무조건 1%, 9억 위는 무조건 3%
  assert.equal(housingAcqRate(100_000_000), RATE_LOW);
  assert.equal(housingAcqRate(2_000_000_000), RATE_HIGH);
  // 가운데 값 — 7.5억이면 딱 2%
  assert.ok(Math.abs(housingAcqRate(750_000_000) - 0.02) < 1e-12);

  // 1원 차이로 밟아 본다. 계단이 아니라 이어지는 산식이므로 튀지 않는다.
  for (const edge of [TIER_LOW, TIER_HIGH]) {
    const before = housingAcqRate(edge);
    const after = housingAcqRate(edge + 1);
    assert.ok(after >= before, `${edge}에서 세율이 거꾸로 갔다`);
    // 1원 넘었다고 세율이 뛰면 안 된다 — 0.0000001%p도 크다
    assert.ok(after - before < 1e-9, `${edge}에서 세율이 튀었다: ${before} → ${after}`);
  }

  // 6~9억 구간 안에서는 값이 계속 커진다 (단조 증가)
  let prev = 0;
  for (let p = TIER_LOW; p <= TIER_HIGH; p += 10_000_000) {
    const r = housingAcqRate(p);
    assert.ok(r >= prev, `${p}에서 세율이 줄었다`);
    prev = r;
  }
});

test('세율 셋은 면적 한 줄로 갈린다', () => {
  const small = housingTaxRates(1_000_000_000, false);
  const big = housingTaxRates(1_000_000_000, true);

  // 9억 초과니 취득세 3%, 지방교육세는 그 10%인 0.3%
  assert.equal(small.acquisition, 0.03);
  assert.ok(Math.abs(small.eduLocal - 0.003) < 1e-12);
  assert.ok(Math.abs(small.eduLocal - small.acquisition * EDU_TAX_ON_ACQ) < 1e-12);

  // 국민주택규모 이하는 농어촌특별세가 아예 없다 → 3.3% vs 3.5%
  assert.equal(small.rural, 0);
  assert.equal(big.rural, RURAL_TAX_RATE);
  const sum = (t: typeof small) => t.acquisition + t.eduLocal + t.rural;
  assert.ok(Math.abs(sum(small) - 0.033) < 1e-12);
  assert.ok(Math.abs(sum(big) - 0.035) < 1e-12);

  // 6억 이하 85㎡ 이하면 널리 알려진 1.1%다
  assert.ok(Math.abs(sum(housingTaxRates(500_000_000, false)) - 0.011) < 1e-12);
  // 경계는 85㎡ — 상수가 바뀌면 화면 문구도 같이 틀린다
  assert.equal(AREA_LIMIT, 85);
});

test('인지세는 구간을 넘는 순간 정액으로 뛴다', () => {
  // 주택은 1억원 이하 비과세
  assert.equal(stampDuty(0), 0);
  assert.equal(stampDuty(50_000_000), 0);
  assert.equal(STAMP_HOUSE_EXEMPT_UNDER, 100_000_000);
  assert.equal(stampDuty(100_000_000), 0);
  // 1억원에서 1원만 넘으면 15만원이 생긴다 — 정액이라 여기서는 튀는 게 맞다
  assert.equal(stampDuty(100_000_001), 150_000);

  // 10억원 경계도 1원 차이로 밟는다
  assert.equal(stampDuty(1_000_000_000), 150_000);
  assert.equal(stampDuty(999_999_999), 150_000);
  assert.equal(stampDuty(1_000_000_001), 350_000);
  assert.equal(stampDuty(5_000_000_000), 350_000);

  // 음수는 0으로 본다
  assert.equal(stampDuty(-100_000_000), 0);

  // 구간 안에서는 금액이 얼마든 같다 (요율이 아니다)
  assert.equal(stampDuty(200_000_000), stampDuty(800_000_000));
});

test('합계는 화면 내역을 손으로 더한 값과 정확히 같다', () => {
  // 여러 조합으로 항등식을 확인한다 — 항목 하나가 빠지면 여기서 걸린다
  for (const price of [80_000_000, 600_000_000, 700_000_000, 1_500_000_000]) {
    for (const over85 of [false, true]) {
      for (const vat of [false, true]) {
        const r = calcHomeBuyingCost({
          ...base(price, over85),
          brokerVat: vat,
          bondRate: 1.3,
          bondDiscountRate: 8,
        });

        const byHand = r.items.reduce((s, i) => s + i.amount, 0);
        assert.equal(r.extraTotal, byHand, `${price}/${over85}/${vat}의 내역 합이 다르다`);

        // 항목을 이름으로 하나하나 짚어 더해도 같아야 한다
        const named = r.acquisitionTax + r.eduLocalTax + r.ruralTax
          + r.brokerFee + r.brokerVatAmount + r.stamp + r.bondCost
          + r.legalFee + r.movingFee + r.interiorFee + r.loanFee;
        assert.equal(r.extraTotal, named, `${price}의 항목별 합이 다르다`);

        // 묶어 낸 값들도 제 부분합과 같아야 한다
        assert.equal(r.taxTotal, r.acquisitionTax + r.eduLocalTax + r.ruralTax);
        assert.equal(r.brokerTotal, r.brokerFee + r.brokerVatAmount);

        // 총 필요자금 = 집값 + 부대비용
        assert.equal(r.grandTotal, price + r.extraTotal);
        // 채권 매입액은 되팔면 돌아오므로 합계에 안 들어간다 — 손실만 들어간다
        assert.ok(r.bondCost <= r.bondPurchase);
        assert.ok(r.extraTotal < r.bondPurchase + r.extraTotal);

        // 0원 항목은 내역에서 빠지지만 합계는 그대로다
        assert.ok(r.items.every(i => i.amount > 0), '0원 항목이 내역에 남았다');
      }
    }
  }
});

test('비율을 되짚으면 금액이 복원된다', () => {
  for (const price of [300_000_000, 650_000_000, 1_200_000_000]) {
    const r = calcHomeBuyingCost(base(price));
    // 비율에서 금액으로 되돌아온다
    assert.ok(
      Math.abs(price * (r.extraRate / 100) - r.extraTotal) < 1e-6,
      `${price}의 비율이 금액과 안 맞는다`,
    );
    // 총 필요자금으로도 되짚는다
    assert.ok(Math.abs(price * (1 + r.extraRate / 100) - r.grandTotal) < 1e-6);
    // 집을 사는 데 드는 웃돈이 집값을 넘지는 않는다
    assert.ok(r.extraRate > 0 && r.extraRate < 100, `${price}: ${r.extraRate}%`);
  }

  // 6억 주택, 요율 0.4% + 부가세 — 손으로 셈해 둔 값과 맞춰 본다
  const r = calcHomeBuyingCost(base(600_000_000));
  assert.equal(r.acquisitionTax, 6_000_000);   // 1%
  assert.equal(r.eduLocalTax, 600_000);        // 취득세의 10%
  assert.equal(r.ruralTax, 0);                 // 85㎡ 이하
  assert.equal(r.brokerFee, 2_400_000);        // 0.4%
  assert.equal(r.brokerVatAmount, 240_000);    // 부가세 10%
  assert.equal(r.stamp, 150_000);              // 1억 초과 10억 이하
  assert.equal(r.extraTotal, 6_000_000 + 600_000 + 2_400_000 + 240_000 + 150_000
    + 600_000 + 800_000 + 10_000_000 + 400_000);
  assert.equal(r.grandTotal, 600_000_000 + r.extraTotal);
});

test('0원과 음수 입력에서 무너지지 않는다', () => {
  // 집값 0 — 0으로 나누지 않고 비율은 0이다
  const zero = calcHomeBuyingCost({
    price: 0,
    taxRates: housingTaxRates(0, false),
    brokerRate: 0.5, brokerVat: true,
    bondRate: 2, bondDiscountRate: 10,
    legalFee: 0, movingFee: 0, interiorFee: 0, loanFee: 0,
  });
  assert.equal(zero.extraTotal, 0);
  assert.equal(zero.extraRate, 0);
  assert.equal(zero.grandTotal, 0);
  assert.equal(zero.items.length, 0);
  assert.ok(Number.isFinite(zero.extraRate));

  // 전부 음수 — 0으로 눌러 담고, 합계가 음수가 되지 않는다
  const neg = calcHomeBuyingCost({
    price: -500_000_000,
    taxRates: { acquisition: -0.01, eduLocal: -0.001, rural: -0.002 },
    brokerRate: -1, brokerVat: true,
    bondRate: -5, bondDiscountRate: -50,
    legalFee: -600_000, movingFee: -800_000, interiorFee: -1, loanFee: -400_000,
  });
  assert.equal(neg.extraTotal, 0);
  assert.equal(neg.grandTotal, 0);
  assert.equal(neg.extraRate, 0);
  for (const [k, v] of Object.entries(neg)) {
    if (typeof v === 'number') assert.ok(v >= 0, `${k}가 음수다: ${v}`);
  }

  // 할인율 100% 넘게 넣어도 매입액을 넘어 잃지는 않는다
  const capped = calcHomeBuyingCost({
    ...base(500_000_000), bondRate: 2, bondDiscountRate: 500,
  });
  assert.equal(capped.bondCost, capped.bondPurchase);

  // 중과세율을 직접 넣는 길 — 표준 함수를 안 쓰고도 계산이 된다
  const heavy = calcHomeBuyingCost({
    ...base(700_000_000),
    taxRates: { acquisition: 0.12, eduLocal: 0.004, rural: 0.002 },
  });
  const standard = calcHomeBuyingCost(base(700_000_000));
  assert.ok(heavy.extraTotal > standard.extraTotal, '중과인데 부대비용이 안 늘었다');
  assert.equal(heavy.acquisitionTax, 84_000_000);
});
