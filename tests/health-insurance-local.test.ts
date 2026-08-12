/**
 * 지역가입자 건강보험료 — 요율이 한 곳에서만 오는지, 하한·상한이 실제로 걸리는지.
 *
 *  - 요율은 lib/salary.ts에서만 온다. 원문에 요율 숫자가 적혀 있으면 실패한다
 *  - 소득보험료는 소득에 정비례하고, 직장가입자 본인부담의 정확히 두 배다
 *    (회사 몫이 없다는 사실이 숫자로 드러나는 자리)
 *  - 최저보험료는 소득보험료 자리에 붙고, 상한은 세 갈래를 합친 뒤에 걸린다
 *  - 재산 등급표는 판정하지 않으므로, 점수가 0이면 재산보험료도 0이어야 한다
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calcSalary } from '../lib/salary.ts';
import {
  EMPLOYEE_SHARE, HEALTH_RATE, LONG_CARE_RATE, calcLocalHealth, compareEmployee,
} from '../lib/health-insurance-local.ts';

/** 고시값은 해마다 바뀌므로 검사에서도 값을 직접 넣는다 — 규칙만 본다 */
const base = {
  annualIncome: 0,
  incomeFloorLine: 3_360_000,
  minPremium: 20_000,
  assetValue: 0,
  assetDeduction: 50_000_000,
  assetPoints: 0,
  carPoints: 0,
  pointValue: 200,
  maxPremium: 4_000_000,
};

test('요율을 이 파일에 다시 적지 않았다', () => {
  /*
   * 요율을 두 곳에 적으면 한쪽만 고쳐지는 날이 온다. 원문을 읽어 숫자가
   * 들어왔는지 본다 — 계산이 맞더라도 여기서 걸리면 되짚어 쓰도록 고쳐야 한다.
   */
  const src = readFileSync(new URL('../lib/health-insurance-local.ts', import.meta.url), 'utf8');
  for (const bad of ['3.545', '0.03545', '7.09', '0.0709', '12.95', '0.1295']) {
    assert.ok(!src.includes(bad), `요율 ${bad}이 원문에 적혀 있다 — lib/salary.ts에서 되짚어 써야 한다`);
  }
  // 되짚어 쓰고 있다는 증거 — salary.ts를 불러온다
  assert.ok(src.includes("from './salary.ts'"), 'lib/salary.ts를 안 쓰고 있다');
});

test('요율이 lib/salary.ts의 값과 같다', () => {
  for (const annual of [24_000_000, 60_000_000, 120_000_000, 480_000_000]) {
    const s = calcSalary(annual, 1, false);
    // 직장가입자 본인부담 요율 = 전체 요율의 절반
    assert.equal(HEALTH_RATE * EMPLOYEE_SHARE, s.health / s.monthly, `연봉 ${annual}`);
    // 장기요양은 건강보험료에 곱한다 — 원단위 반올림 때문에 오차를 허용한다
    assert.ok(Math.abs(LONG_CARE_RATE - s.longCare / s.health) < 1e-5, `연봉 ${annual}`);
  }
});

test('소득보험료는 소득에 정비례한다', () => {
  const one = calcLocalHealth({ ...base, annualIncome: 60_000_000 });
  const two = calcLocalHealth({ ...base, annualIncome: 120_000_000 });
  assert.equal(one.incomeMonthly, 5_000_000);
  assert.equal(one.incomePremium, Math.round(5_000_000 * HEALTH_RATE));
  // 소득이 두 배면 소득보험료도 두 배다
  assert.ok(Math.abs(two.incomePremium - one.incomePremium * 2) <= 1, `${two.incomePremium}`);

  // 그 요율은 직장가입자 본인부담의 정확히 두 배다 — 회사 몫이 없기 때문이다
  const s = calcSalary(60_000_000, 1, false);
  assert.equal(one.incomePremium, s.health / EMPLOYEE_SHARE);
});

test('소득보험료는 소득이 늘 때 줄지 않는다', () => {
  /*
   * 최저보험료 기준을 갓 넘은 세대가 기준 이하 세대보다 적게 내는 뒤집힘이
   * 생기지 않는지 본다. 두 고시값을 어긋나게 넣어도 그래야 한다.
   */
  const odd = { ...base, incomeFloorLine: 3_360_000, minPremium: 300_000 };
  let prev = -1;
  for (let annual = 0; annual <= 120_000_000; annual += 1_000_000) {
    const r = calcLocalHealth({ ...odd, annualIncome: annual });
    assert.ok(r.incomePremium >= prev, `연소득 ${annual}에서 보험료가 줄었다`);
    prev = r.incomePremium;
  }
});

test('장기요양보험료는 건강보험료에 요율을 곱한 값이다', () => {
  const r = calcLocalHealth({ ...base, annualIncome: 84_000_000, assetPoints: 700 });
  assert.equal(r.longCare, Math.round(r.health * LONG_CARE_RATE));
  assert.equal(r.total, r.health + r.longCare);

  // 같은 요율을 직장가입자 계산에서도 쓴다 — 두 계산의 비율이 같아야 한다
  const s = calcSalary(84_000_000, 1, false);
  assert.ok(Math.abs(r.longCare / r.health - s.longCare / s.health) < 1e-4);
});

test('소득이 기준 이하면 최저보험료가 소득보험료 자리에 들어간다', () => {
  const none = calcLocalHealth({ ...base, annualIncome: 0 });
  assert.equal(none.atFloor, true);
  assert.equal(none.incomePremium, base.minPremium);
  assert.equal(none.health, base.minPremium, '재산이 없으면 건강보험료가 최저보험료다');

  // 기준을 딱 맞추면 아직 하한, 한 푼 넘으면 정률로 넘어간다
  assert.equal(calcLocalHealth({ ...base, annualIncome: base.incomeFloorLine }).atFloor, true);
  const over = calcLocalHealth({ ...base, annualIncome: 12_000_000 });
  assert.equal(over.atFloor, false);
  assert.equal(over.incomePremium, Math.round(1_000_000 * HEALTH_RATE));

  /*
   * 하한은 세대 보험료 전체의 하한이 아니라 소득보험료 자리의 하한이다.
   * 재산·자동차 보험료는 그 위에 그대로 더해진다 — 흔히 오해하는 자리다.
   */
  const withAsset = calcLocalHealth({ ...base, annualIncome: 0, assetPoints: 500 });
  assert.equal(withAsset.atFloor, true);
  assert.equal(withAsset.health, base.minPremium + 500 * base.pointValue);
});

test('아주 큰 소득에서는 상한에 걸린다', () => {
  const huge = calcLocalHealth({ ...base, annualIncome: 10_000_000_000, assetPoints: 3_000 });
  assert.equal(huge.atCeiling, true);
  assert.equal(huge.health, base.maxPremium);
  assert.ok(huge.rawHealth > base.maxPremium);
  // 장기요양은 상한을 적용한 건강보험료로 계산한다
  assert.equal(huge.longCare, Math.round(base.maxPremium * LONG_CARE_RATE));

  // 상한에 안 닿으면 걸리지 않는다
  const mid = calcLocalHealth({ ...base, annualIncome: 60_000_000 });
  assert.equal(mid.atCeiling, false);
  assert.equal(mid.health, mid.rawHealth);

  // 상한을 비워 두면(0) 상한 없이 낸다 — 모르는 고시값을 0으로 답하지 않는다
  const noCeiling = calcLocalHealth({ ...base, annualIncome: 10_000_000_000, maxPremium: 0 });
  assert.equal(noCeiling.atCeiling, false);
  assert.ok(noCeiling.health > base.maxPremium);
});

test('재산 점수가 0이면 재산보험료도 0이다', () => {
  const r = calcLocalHealth({ ...base, annualIncome: 60_000_000, assetValue: 300_000_000 });
  assert.equal(r.assetPremium, 0, '등급을 지어내 점수를 만들어 냈다');
  assert.equal(r.carPremium, 0);
  assert.equal(r.health, r.incomePremium);

  // 점수는 점수당 금액을 곱한 만큼만 붙는다
  const scored = calcLocalHealth({ ...base, annualIncome: 60_000_000, assetPoints: 681, carPoints: 100 });
  assert.equal(scored.assetPremium, 681 * base.pointValue);
  assert.equal(scored.carPremium, 100 * base.pointValue);
  assert.equal(scored.health, scored.incomePremium + scored.assetPremium + scored.carPremium);
});

test('재산공제를 뺀 가액을 내준다 — 등급 판정은 하지 않는다', () => {
  const r = calcLocalHealth({ ...base, assetValue: 300_000_000 });
  assert.equal(r.assetBase, 300_000_000 - base.assetDeduction);
  // 공제보다 재산이 적으면 0이다(음수로 내려가지 않는다)
  assert.equal(calcLocalHealth({ ...base, assetValue: 10_000_000 }).assetBase, 0);
  // 가액이 얼마든 점수를 안 넣으면 재산보험료는 0이다
  assert.equal(r.assetPremium, 0);
});

test('같은 소득이면 회사 몫이 없어 지역가입자가 더 낸다', () => {
  for (const annual of [24_000_000, 60_000_000, 120_000_000]) {
    const input = { ...base, annualIncome: annual };
    const r = calcLocalHealth(input);
    const c = compareEmployee(input, r);

    assert.ok(c.gap > 0, `연소득 ${annual}: 지역가입자가 더 내지 않는다`);
    // 재산·자동차가 없으면 건강보험료가 정확히 두 배다
    assert.equal(r.health, c.employeeHealth / EMPLOYEE_SHARE);
    // 회사 몫은 본인 몫과 같고, 둘을 합친 것이 총 보험료다
    assert.equal(c.employerShare, c.employeeTotal);
    assert.equal(c.fullPremium, c.employeeTotal + c.employerShare);
    // 더 내는 금액은 회사가 내 주던 몫만큼이다(반올림 오차 안)
    assert.ok(Math.abs(c.gap - c.employerShare) <= 2, `${c.gap} vs ${c.employerShare}`);
  }

  // 재산이 붙으면 차이가 더 벌어진다
  const input = { ...base, annualIncome: 60_000_000, assetPoints: 900 };
  const withAsset = compareEmployee(input, calcLocalHealth(input));
  const bare = compareEmployee({ ...input, assetPoints: 0 }, calcLocalHealth({ ...input, assetPoints: 0 }));
  assert.ok(withAsset.gap > bare.gap);
});

test('음수·0을 넣어도 무너지지 않는다', () => {
  const zero = calcLocalHealth({
    annualIncome: 0, incomeFloorLine: 0, minPremium: 0, assetValue: 0, assetDeduction: 0,
    assetPoints: 0, carPoints: 0, pointValue: 0, maxPremium: 0,
  });
  for (const [k, v] of Object.entries(zero)) {
    if (typeof v === 'number') assert.ok(Number.isFinite(v) && v >= 0, `${k}가 ${v}다`);
  }
  assert.equal(zero.total, 0);

  const negative = {
    annualIncome: -60_000_000, incomeFloorLine: -1, minPremium: -20_000, assetValue: -300_000_000,
    assetDeduction: -50_000_000, assetPoints: -700, carPoints: -100, pointValue: -200,
    maxPremium: -4_000_000,
  };
  const r = calcLocalHealth(negative);
  for (const [k, v] of Object.entries(r)) {
    if (typeof v === 'number') assert.ok(Number.isFinite(v) && v >= 0, `${k}가 ${v}다`);
  }

  /*
   * 한쪽만 음수인 경우를 따로 본다. 점수와 점수당 금액이 둘 다 음수면 곱이 양수가
   * 되어 방어가 없어도 검사를 통과한다 — 처음에 그렇게 적어 두고 방어를 지웠더니
   * 검사가 안 깨졌다.
   */
  const badPoints = calcLocalHealth({ ...base, annualIncome: 60_000_000, assetPoints: -700, carPoints: -100 });
  assert.equal(badPoints.assetPremium, 0);
  assert.equal(badPoints.carPremium, 0);
  const badValue = calcLocalHealth({ ...base, annualIncome: 60_000_000, assetPoints: 700, pointValue: -200 });
  assert.equal(badValue.assetPremium, 0);
  // 견주기도 무너지지 않는다
  const c = compareEmployee(negative, r);
  for (const [k, v] of Object.entries(c)) {
    assert.ok(Number.isFinite(v), `${k}가 ${v}다`);
  }
});
