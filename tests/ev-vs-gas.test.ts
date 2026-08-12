/**
 * 전기차 vs 내연차 — 손익분기를 되짚는다.
 *
 * 이 계산기의 값은 "몇 년 타면 뒤집히나" 하나에 걸려 있으므로, 가장 중요한 검사는
 * 그 연수를 다시 누적 총비용에 넣어 두 차가 정말 같아지는지 보는 것이다. 같아지지
 * 않으면 손익분기는 지어낸 숫자다.
 *
 * 나머지는 지어낸 숫자를 내지 않는지 본다 — 회수할 차값 차이가 없을 때, 유지비까지
 * 더 들어 두 선이 만나지 않을 때, 주행거리나 연비가 0일 때.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  breakevenYears, compareEvVsGas, cumulativeCost, sideCost,
  type EvVsGasInput, type Powertrain,
} from '../lib/ev-vs-gas.ts';

/** 셈에 쓰는 값은 모두 입력이다 — 여기 적은 숫자는 검사용 예시일 뿐 기준값이 아니다 */
const EV: Powertrain = {
  price: 55_000_000, taxCut: 3_000_000,
  kmPerUnit: 5, unitPrice: 300,
  tax: 130_000, maintenance: 400_000,
};
const GAS: Powertrain = {
  price: 40_000_000, taxCut: 0,
  kmPerUnit: 12, unitPrice: 1_650,
  tax: 400_000, maintenance: 900_000,
};
const BASE: EvVsGasInput = { km: 15_000, years: 10, ev: EV, gas: GAS };

const near = (a: number, b: number, tol = 1e-4) => Math.abs(a - b) < tol;

/** 유지비를 다른 쪽과 똑같이 맞추는 값 — 절감액이 정확히 0이 된다 */
const sameRunning = (p: Powertrain) =>
  ({ kmPerUnit: p.kmPerUnit, unitPrice: p.unitPrice, tax: p.tax, maintenance: p.maintenance });

test('연간 에너지비는 주행거리를 전비·연비로 나눠 단가를 곱한 값이다', () => {
  const r = compareEvVsGas(BASE);

  // 15,000km ÷ 5km/kWh = 3,000kWh × 300원 = 90만원
  assert.equal(r.ev.energy, 900_000);
  // 15,000km ÷ 12km/L = 1,250L × 1,650원 = 206만 2,500원
  assert.equal(r.gas.energy, 2_062_500);

  // km당 에너지비는 단가 ÷ (에너지 한 단위로 가는 거리)다 — 전비와 연비를 맞댄 자
  assert.equal(r.ev.energyPerKm, 60);
  assert.equal(r.gas.energyPerKm, 137.5);
  assert.ok(near(r.ev.energyPerKm * BASE.km, r.ev.energy));
  assert.ok(near(r.gas.energyPerKm * BASE.km, r.gas.energy));

  // 해마다 되풀이되는 합은 에너지비 + 자동차세 + 정비비
  assert.equal(r.ev.yearly, 900_000 + 130_000 + 400_000);
  assert.equal(r.gas.yearly, 2_062_500 + 400_000 + 900_000);

  // 처음에 내는 돈은 차값에서 감면을 뺀 값
  assert.equal(r.ev.upfront, 52_000_000);
  assert.equal(r.gas.upfront, 40_000_000);
  assert.equal(r.upfrontGap, 12_000_000);
  assert.equal(r.yearlySaving, 3_362_500 - 1_430_000);
});

test('손익분기 연수에서 두 차의 누적 총비용이 같아진다', () => {
  // 차값·주행거리·단가를 흔들어도 되짚기가 맞아야 한다
  for (const km of [3_000, 15_000, 40_000]) {
    for (const evPrice of [42_000_000, 55_000_000, 80_000_000]) {
      for (const unitPrice of [100, 300, 450]) {
        for (const gasPrice of [1_400, 1_650, 2_100]) {
          const r = compareEvVsGas({
            km, years: 10,
            ev: { ...EV, price: evPrice, unitPrice },
            gas: { ...GAS, unitPrice: gasPrice },
          });
          const be = r.breakevenYears;
          const label = `km=${km} ev=${evPrice} kWh=${unitPrice} L=${gasPrice}`;
          if (be === null) {
            // 만나지 않는다면 유지비가 전기차 쪽이 같거나 더 든다는 뜻이어야 한다
            assert.ok(r.yearlySaving <= 0, `만나지 않는데 아끼고 있다: ${label}`);
            continue;
          }
          if (be === 0) {
            // 0년이라고 했으면 회수할 차값 차이가 없어야 한다
            assert.ok(r.upfrontGap <= 0, `회수할 차이가 남았는데 0년이다: ${label}`);
          } else {
            // ★ 가장 중요한 검사 — 그 연수에서 누적 총비용이 같다
            assert.ok(
              near(cumulativeCost(r.ev, be), cumulativeCost(r.gas, be)),
              `${label}: ${be}년에서 ${cumulativeCost(r.ev, be)} ≠ ${cumulativeCost(r.gas, be)}`,
            );
            // 정의대로 (초기 추가 부담) ÷ (연간 절감액)이다
            assert.ok(near(be, r.upfrontGap / r.yearlySaving), `정의와 다르다: ${label}`);
            // 손익분기 앞에서는 내연차가, 뒤에서는 전기차가 앞선다
            assert.ok(cumulativeCost(r.ev, be * 0.5) > cumulativeCost(r.gas, be * 0.5), label);
            assert.ok(cumulativeCost(r.ev, be * 1.5) < cumulativeCost(r.gas, be * 1.5), label);
          }
          // 보유 연수와의 앞뒤가 마지막 해 차액의 부호와 맞아야 한다
          if (be < 10) assert.ok(r.netAtEnd > 0, `10년 안에 뽑았는데 손해다: ${label}`);
          if (be > 10) assert.ok(r.netAtEnd < 0, `10년 넘게 걸리는데 이득이다: ${label}`);
        }
      }
    }
  }

  // 손으로 셈한 값 — 차값 차이 1,200만을 해마다 1,932,500원씩 회수하면 6.2년
  const r = compareEvVsGas(BASE);
  assert.ok(near(r.breakevenYears!, 12_000_000 / 1_932_500, 1e-9));
  assert.ok(near(r.breakevenYears!, 6.2096, 1e-3), `${r.breakevenYears}`);
});

test('회수할 차값 차이가 없으면 손익분기는 0년이다', () => {
  // 차값이 같으면 0년 — 기다릴 것이 없다. 0년에서 두 누적 총비용도 같다
  const same = compareEvVsGas({ ...BASE, ev: { ...EV, price: 40_000_000, taxCut: 0 } });
  assert.equal(same.upfrontGap, 0);
  assert.equal(same.breakevenYears, 0);
  assert.equal(cumulativeCost(same.ev, 0), cumulativeCost(same.gas, 0));

  // 감면을 받아 전기차가 오히려 싸면 그래도 0년이다(음수 연수를 내지 않는다)
  const cheaper = compareEvVsGas({ ...BASE, ev: { ...EV, taxCut: 20_000_000 } });
  assert.ok(cheaper.upfrontGap < 0);
  assert.equal(cheaper.breakevenYears, 0);

  // 유지비까지 전기차가 더 드는데 차값만 싼 경우도 0년이다 — 처음은 앞서 있다
  const cheapButThirsty = compareEvVsGas({
    ...BASE,
    ev: { ...EV, price: 30_000_000, unitPrice: 900, tax: 500_000, maintenance: 2_000_000 },
  });
  assert.ok(cheapButThirsty.yearlySaving < 0);
  assert.equal(cheapButThirsty.breakevenYears, 0);
});

test('유지비까지 더 들면 손익분기는 null이다 — 없는 숫자를 내지 않는다', () => {
  // 차값도 비싸고 충전 단가도 비싸 유지비가 더 드는 경우
  const never = compareEvVsGas({
    ...BASE,
    ev: { ...EV, unitPrice: 900, tax: 500_000, maintenance: 2_000_000 },
  });
  assert.ok(never.upfrontGap > 0);
  assert.ok(never.yearlySaving < 0);
  assert.equal(never.breakevenYears, null);
  // 해가 갈수록 오히려 벌어진다
  assert.ok(never.table[9].diff < never.table[0].diff);
  assert.ok(never.netAtEnd < 0);

  // 유지비가 똑같아도(절감액 0) 두 선은 평행해 만나지 않는다
  const parallel = compareEvVsGas({ ...BASE, gas: { ...GAS, ...sameRunning(EV) } });
  assert.equal(parallel.yearlySaving, 0);
  assert.ok(parallel.upfrontGap > 0);
  assert.equal(parallel.breakevenYears, null);

  // sideCost로 직접 만들어도 같다
  assert.equal(
    breakevenYears(
      { upfront: 50_000_000, energy: 0, tax: 0, maintenance: 0, yearly: 1_000_000, energyPerKm: 0 },
      { upfront: 40_000_000, energy: 0, tax: 0, maintenance: 0, yearly: 1_000_000, energyPerKm: 0 },
    ),
    null,
  );
});

test('주행거리 0·연비 0에서도 0으로 나누지 않는다', () => {
  // 주행거리 0이면 에너지비는 0이고, 세금·정비비 차이만 남는다
  const parked = compareEvVsGas({ ...BASE, km: 0 });
  assert.equal(parked.ev.energy, 0);
  assert.equal(parked.gas.energy, 0);
  assert.equal(parked.yearlySaving, (400_000 + 900_000) - (130_000 + 400_000));
  assert.ok(Number.isFinite(parked.breakevenYears!));

  // 전비·연비 0은 에너지비 0으로 막는다 — Infinity·NaN이 새 나가면 안 된다
  for (const p of [
    { ...EV, kmPerUnit: 0 },
    { ...EV, kmPerUnit: -5 },
    { ...EV, unitPrice: Number.NaN },
    { ...EV, kmPerUnit: Number.NaN, unitPrice: Number.NaN },
  ]) {
    const s = sideCost(15_000, p);
    assert.ok(Number.isFinite(s.energy), `${p.kmPerUnit}/${p.unitPrice}`);
    assert.ok(Number.isFinite(s.yearly));
    assert.ok(Number.isFinite(s.energyPerKm));
    assert.equal(s.energy, 0);
  }

  // 모든 값이 0이어도 죽지 않는다
  const zero: Powertrain = { price: 0, taxCut: 0, kmPerUnit: 0, unitPrice: 0, tax: 0, maintenance: 0 };
  const nothing = compareEvVsGas({ km: 0, years: 0, ev: zero, gas: zero });
  assert.deepEqual(nothing.table, []);
  assert.equal(nothing.breakevenYears, 0);
  assert.equal(nothing.netAtEnd, 0);

  // 보유 연수가 음수·소수여도 표가 어긋나지 않는다
  assert.deepEqual(compareEvVsGas({ ...BASE, years: -3 }).table, []);
  assert.equal(compareEvVsGas({ ...BASE, years: 4.7 }).table.length, 4);
});

test('누적 총비용은 연수에 대해 늘기만 한다', () => {
  for (const km of [0, 15_000, 50_000]) {
    const r = compareEvVsGas({ ...BASE, km, years: 12 });
    assert.equal(r.table.length, 12);
    for (let i = 0; i < r.table.length; i++) {
      const row = r.table[i];
      assert.equal(row.year, i + 1);
      // 표의 값은 cumulativeCost와 같아야 한다 — 표만 따로 셈하지 않는다
      assert.ok(near(row.ev, cumulativeCost(r.ev, row.year)));
      assert.ok(near(row.gas, cumulativeCost(r.gas, row.year)));
      assert.ok(near(row.diff, row.gas - row.ev));
      if (i > 0) {
        assert.ok(row.ev > r.table[i - 1].ev, `전기차 누적이 줄었다: ${row.year}년`);
        assert.ok(row.gas > r.table[i - 1].gas, `내연차 누적이 줄었다: ${row.year}년`);
        // 한 해 늘어나는 폭은 연간 유지비와 같다
        assert.ok(near(row.ev - r.table[i - 1].ev, r.ev.yearly));
        assert.ok(near(row.gas - r.table[i - 1].gas, r.gas.yearly));
      }
    }
    // 첫 해 누적은 처음 낸 돈 + 한 해 유지비
    assert.ok(near(r.table[0].ev, r.ev.upfront + r.ev.yearly));
    // 마지막 해 차액이 netAtEnd다
    assert.ok(near(r.table[11].diff, r.netAtEnd));
  }
});
