/**
 * 교통 범칙금·과태료 — 경계와 규칙을 밟는다.
 *
 * 이 계산기에서 틀리면 사람이 손해를 보는 자리는 셋이다.
 *  1. 속도 구간의 경계 — 1km/h 차이로 금액과 벌점이 한 칸 뛴다.
 *  2. 범칙금과 과태료의 성질 — 과태료가 더 비싸고 벌점이 안 붙는다.
 *     둘을 바꿔 적으면 금액도 벌점도 거꾸로 되는데 그럴듯해 보인다.
 *  3. 벌점 누산이 정지 기준에 닿는 순간 — 1점 차이로 40일이 갈린다.
 * 그래서 값 하나를 확인하는 것이 아니라 경계를 양쪽에서 밟는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CRIMINAL_OVER_SPEED, REVOKE_THRESHOLDS, SPEED_TIERS, SUSPEND_POINTS, VIOLATIONS,
  calcFine, earlyPayDiscount, licenseStatus, speedTier, surchargeAmount,
  type FineInput,
} from '../lib/traffic-fine.ts';

/** 통지서에 적힌 값들은 예시다 — 검사에서는 셈이 맞는지만 본다 */
const BASE: FineInput = {
  violation: 'speeding',
  overSpeed: 0,
  schoolZone: false,
  zoneMoneyMultiplier: 2,
  zoneDemeritMultiplier: 2,
  daysSinceNotice: 0,
  earlyPayDays: 20,
  dueDays: 40,
  earlyPayDiscountRate: 20,
  surchargeRate: 3,
  monthlySurchargeRate: 1.2,
  maxSurchargeMonths: 60,
  accumulated: 0,
  credits: 0,
};

const at = (over: number, more: Partial<FineInput> = {}) =>
  calcFine({ ...BASE, overSpeed: over, ...more });

test('속도 구간 경계를 1km/h 차이로 밟으면 한 칸만 뛴다', () => {
  // 구간표의 경계는 20 / 40 / 60이다. 아래는 열려 있고 위는 닫혀 있다.
  assert.deepEqual(SPEED_TIERS.map(t => t.overFrom), [0, 20, 40, 60]);
  assert.deepEqual(SPEED_TIERS.map(t => t.overTo), [20, 40, 60, Infinity]);

  // 경계 값은 아래 구간에 속하고, 1km/h 더 넘기면 바로 다음 구간이다
  for (const [i, boundary] of [20, 40, 60].entries()) {
    assert.equal(speedTier(boundary), SPEED_TIERS[i], `${boundary}km/h 초과는 ${i}번 구간`);
    assert.equal(speedTier(boundary + 1), SPEED_TIERS[i + 1], `${boundary + 1}km/h 초과는 ${i + 1}번 구간`);
    // 한 칸 건너뛰지 않는다 — 경계 양쪽의 구간 번호 차이가 정확히 1이다
    const before = SPEED_TIERS.indexOf(speedTier(boundary)!);
    const after = SPEED_TIERS.indexOf(speedTier(boundary + 1)!);
    assert.equal(after - before, 1);
  }

  // 계산 결과에서도 경계 하나를 넘을 때 금액과 벌점이 한 칸씩만 움직인다
  assert.deepEqual(
    [at(20).fine, at(20).levy, at(20).fineDemerit],
    [30_000, 40_000, 0],
  );
  assert.deepEqual(
    [at(21).fine, at(21).levy, at(21).fineDemerit],
    [60_000, 70_000, 15],
  );
  assert.deepEqual(
    [at(40).fine, at(40).levy, at(40).fineDemerit],
    [60_000, 70_000, 15],
  );
  assert.deepEqual(
    [at(41).fine, at(41).levy, at(41).fineDemerit],
    [90_000, 100_000, 30],
  );
  assert.deepEqual(
    [at(60).fine, at(60).levy, at(60).fineDemerit],
    [90_000, 100_000, 30],
  );
  assert.deepEqual(
    [at(61).fine, at(61).levy, at(61).fineDemerit],
    [120_000, 130_000, 60],
  );

  // 구간을 올라갈수록 금액과 벌점은 줄지 않는다
  for (let i = 1; i < SPEED_TIERS.length; i++) {
    assert.ok(SPEED_TIERS[i].fine! >= SPEED_TIERS[i - 1].fine!, `${i}번 범칙금`);
    assert.ok(SPEED_TIERS[i].levy! >= SPEED_TIERS[i - 1].levy!, `${i}번 과태료`);
    assert.ok(SPEED_TIERS[i].demerit! >= SPEED_TIERS[i - 1].demerit!, `${i}번 벌점`);
  }
});

test('초과 속도가 0이면 위반이 아니다', () => {
  assert.equal(speedTier(0), null);
  assert.equal(speedTier(-5), null);

  const r = at(0);
  assert.equal(r.noViolation, true);
  assert.equal(r.tier, null);
  assert.equal(r.fine, 0);
  assert.equal(r.levy, 0);
  assert.equal(r.fineDemerit, 0);
  assert.equal(r.levyPayable, 0);
  assert.equal(r.finePayable, 0);
  // 위반이 아니면 비워 둔 칸도 없다
  assert.deepEqual(r.missing, []);
  assert.equal(r.license.suspended, false);
});

test('같은 위반이면 과태료가 범칙금보다 크거나 같다', () => {
  // 둘을 바꿔 적으면 여기서 걸린다 — 과태료가 싸게 나올 수가 없다
  for (const t of SPEED_TIERS) {
    assert.ok(t.levy! >= t.fine!, `${t.label}: 과태료 ${t.levy} < 범칙금 ${t.fine}`);
  }
  for (const v of VIOLATIONS) {
    if (v.fine === null || v.levy === null) continue;
    assert.ok(v.levy >= v.fine, `${v.label}: 과태료 ${v.levy} < 범칙금 ${v.fine}`);
  }
  // 가중 구역에서도 순서가 유지된다 — 배수는 양쪽에 똑같이 걸린다
  const zone = at(25, { schoolZone: true, zoneMoneyMultiplier: 2, zoneDemeritMultiplier: 2 });
  assert.ok(zone.levy! >= zone.fine!);
});

test('벌점은 범칙금에만 붙는다', () => {
  const r = at(25, { accumulated: 10, earlyPayDays: 0 });
  assert.equal(r.fineDemerit, 15);
  // 무인 단속은 운전자를 특정하지 않으므로 과태료 쪽 벌점은 늘 0이다
  assert.equal(r.levyDemerit, 0);
  // 그래서 과태료를 택하면 누산 점수가 그대로다
  assert.equal(r.licenseIfLevy.total, 10);
  assert.equal(r.license.total, 25);

  // 벌점이 붙는 위반은 표에서도 범칙금 쪽에만 값이 있다
  for (const v of VIOLATIONS) {
    if (v.demerit !== null && v.demerit > 0) {
      assert.notEqual(v.fine, null, `${v.label}: 벌점이 있으면 범칙금이 있어야 한다`);
    }
  }
});

test('사전납부 감액은 되짚으면 원금이 된다', () => {
  // 감액률 0이면 깎이는 것이 없다
  assert.equal(earlyPayDiscount(40_000, 0), 0);
  const noDiscount = at(25, { earlyPayDiscountRate: 0 });
  assert.equal(noDiscount.early, true);
  assert.equal(noDiscount.earlyDiscount, 0);
  assert.equal(noDiscount.levyPayable, noDiscount.levy);

  // 20%면 4만원이 3만 2천원이다
  assert.equal(earlyPayDiscount(40_000, 20), 8_000);
  const r = at(10, { earlyPayDiscountRate: 20 });
  assert.equal(r.levy, 40_000);
  assert.equal(r.earlyDiscount, 8_000);
  assert.equal(r.levyPayable, 32_000);
  // 되짚기 — 실납부액에 감액액을 더하면 원금이다 (가산금이 없을 때)
  assert.equal(r.surcharge, 0);
  assert.equal(r.levyPayable! + r.earlyDiscount, r.levy);

  // 사전납부 기간이 지나면 감액이 없다
  const late = at(10, { daysSinceNotice: 21 });
  assert.equal(late.early, false);
  assert.equal(late.earlyDiscount, 0);
  assert.equal(late.levyPayable, 40_000);

  // 남은 날짜 — 기간 안이면 며칠 남았는지, 지났으면 0
  assert.equal(at(10, { daysSinceNotice: 0 }).earlyDaysLeft, 20);
  assert.equal(at(10, { daysSinceNotice: 20 }).earlyDaysLeft, 0);
  assert.equal(at(10, { daysSinceNotice: 20 }).early, true);
  assert.equal(at(10, { daysSinceNotice: 21 }).earlyDaysLeft, 0);

  // 범칙금에는 감액이 없다 — 통고 금액 그대로다
  assert.equal(r.finePayable, r.fine);
});

test('가산금은 늦은 만큼 붇고 상한에서 멈춘다', () => {
  const s = (days: number) => surchargeAmount(100_000, days, 3, 1.2, 60);

  assert.equal(s(0), 0);            // 기한 안에 내면 없다
  assert.equal(s(1), 3_000);        // 하루라도 넘기면 첫 가산금 3%
  assert.equal(s(29), 3_000);       // 한 달이 안 되면 그대로
  assert.equal(s(30), 4_200);       // 한 달 지나면 1.2% 얹힌다
  assert.equal(s(60), 5_400);       // 두 달이면 2.4%

  // 한 달이 지날 때마다 정확히 같은 폭으로 늘어난다.
  // 1개월째만 폭이 다르다 — 첫 가산금 3%가 그때 한 번 함께 붙기 때문이다.
  assert.equal(s(30) - s(0), 3_000 + 1_200);
  for (let m = 2; m <= 10; m++) {
    assert.equal(s(30 * m) - s(30 * (m - 1)), 1_200, `${m}개월`);
  }
  // 늦어질수록 절대 줄지 않는다
  let prev = 0;
  for (let d = 0; d <= 30 * 70; d += 7) {
    const now = s(d);
    assert.ok(now >= prev, `${d}일에서 줄었다`);
    prev = now;
  }
  // 상한 — 3% + 1.2% × 60개월 = 75%에서 멈춘다
  assert.equal(s(30 * 60), 75_000);
  assert.equal(s(30 * 100), 75_000);
  // 원금이 0이면 가산금도 0이다
  assert.equal(surchargeAmount(0, 300, 3, 1.2, 60), 0);

  // 계산 전체에서도 이어진다 — 납부기한 40일을 하루 넘겼을 때
  const over1 = at(25, { daysSinceNotice: 41 });
  assert.equal(over1.overdueDays, 1);
  assert.equal(over1.earlyDiscount, 0);
  assert.equal(over1.surcharge, Math.floor(70_000 * 0.03));
  assert.equal(over1.levyPayable, 70_000 + Math.floor(70_000 * 0.03));
  assert.equal(over1.fineOverdueWarning, true);

  // 기한 안이면 가산금이 없고 남은 날짜가 나온다
  const inTime = at(25, { daysSinceNotice: 30 });
  assert.equal(inTime.overdueDays, 0);
  assert.equal(inTime.surcharge, 0);
  assert.equal(inTime.dueDaysLeft, 10);
  assert.equal(inTime.fineOverdueWarning, false);

  // 납부기한을 모르면(0) 가산금을 셈하지 않는다 — 지어내지 않는다
  const unknownDue = at(25, { dueDays: 0, daysSinceNotice: 400 });
  assert.equal(unknownDue.overdueDays, 0);
  assert.equal(unknownDue.surcharge, 0);
});

test('벌점 누산이 정지 기준에 닿는 자리', () => {
  assert.equal(SUSPEND_POINTS, 40);

  // 39점은 정지가 아니고, 1점만 더하면 정지다
  const safe = licenseStatus(24, 15);
  assert.equal(safe.total, 39);
  assert.equal(safe.suspended, false);
  assert.equal(safe.days, 0);
  assert.equal(safe.toSuspension, 1);

  const hit = licenseStatus(25, 15);
  assert.equal(hit.total, 40);
  assert.equal(hit.suspended, true);
  assert.equal(hit.toSuspension, 0);
  // 정지 일수는 누산점수에 그대로 비례한다 — 1점이 1일
  assert.equal(hit.days, 40);

  for (const points of [40, 41, 55, 80, 120]) {
    const r = licenseStatus(points, 0);
    assert.equal(r.days, points, `${points}점이면 ${points}일`);
  }
  // 점수가 커지면 일수도 그만큼 커진다
  assert.equal(licenseStatus(60, 0).days - licenseStatus(50, 0).days, 10);

  // 공제 점수는 누산에서 빠져 정지를 면할 수 있다
  const withCredit = licenseStatus(35, 15, 10);
  assert.equal(withCredit.total, 40);
  assert.equal(withCredit.suspended, true);
  assert.equal(licenseStatus(35, 15, 11).suspended, false);
  // 공제가 누산보다 커도 음수로 내려가지 않는다
  assert.equal(licenseStatus(5, 0, 50).total, 0);

  // 취소 기준 — 1년 누산 121점
  assert.equal(REVOKE_THRESHOLDS[0].points, 121);
  assert.equal(licenseStatus(105, 15).revokeRisk, false);
  assert.equal(licenseStatus(106, 15).revokeRisk, true);

  // 계산 전체에서 — 25점 쌓인 사람이 20km/h 초과를 넘기면 정지에 닿는다
  const r = at(25, { accumulated: 25 });
  assert.equal(r.license.total, 40);
  assert.equal(r.license.suspended, true);
  assert.equal(r.license.days, 40);
  // 과태료로 내면 벌점이 안 붙어 정지가 아니다
  assert.equal(r.licenseIfLevy.suspended, false);
  assert.equal(r.licenseIfLevy.toSuspension, 15);
});

test('가중 구역 배수를 1로 두면 평상시와 같다', () => {
  const normal = at(25);
  const one = at(25, { schoolZone: true, zoneMoneyMultiplier: 1, zoneDemeritMultiplier: 1 });
  assert.equal(one.fine, normal.fine);
  assert.equal(one.levy, normal.levy);
  assert.equal(one.fineDemerit, normal.fineDemerit);
  assert.equal(one.levyPayable, normal.levyPayable);

  // 배수를 2로 두면 금액과 벌점이 각각 두 배다
  const two = at(25, { schoolZone: true, zoneMoneyMultiplier: 2, zoneDemeritMultiplier: 2 });
  assert.equal(two.fine, normal.fine! * 2);
  assert.equal(two.levy, normal.levy! * 2);
  assert.equal(two.fineDemerit, normal.fineDemerit! * 2);

  // 금액과 벌점의 배수는 따로 받는다 — 금액만 올리고 벌점은 그대로일 수 있다
  const split = at(25, { schoolZone: true, zoneMoneyMultiplier: 2, zoneDemeritMultiplier: 1 });
  assert.equal(split.fine, 120_000);
  assert.equal(split.fineDemerit, 15);

  // 구역 표시를 끄면 배수를 아무리 넣어도 반영되지 않는다
  const off = at(25, { schoolZone: false, zoneMoneyMultiplier: 5, zoneDemeritMultiplier: 5 });
  assert.equal(off.fine, normal.fine);
  assert.equal(off.fineDemerit, normal.fineDemerit);
});

test('어느 쪽으로 낼지 — 벌점이 판단을 가른다', () => {
  // 감액을 못 받으면 범칙금이 싸다 (6만원 < 7만원)
  const plain = at(25, { earlyPayDays: 0 });
  assert.equal(plain.finePayable, 60_000);
  assert.equal(plain.levyPayable, 70_000);
  assert.equal(plain.saveByFine, 10_000);
  assert.equal(plain.choice, 'fine');
  assert.equal(plain.suspensionDecides, false);

  // 사전납부 감액을 받으면 과태료가 오히려 싸진다 (5만 6천원 < 6만원)
  const early = at(25);
  assert.equal(early.levyPayable, 56_000);
  assert.equal(early.saveByFine, -4_000);
  assert.equal(early.choice, 'levy');

  // 벌점 때문에 정지에 걸리면 금액 비교가 무의미해진다
  const near = at(25, { accumulated: 30, earlyPayDays: 0 });
  assert.equal(near.license.suspended, true);
  assert.equal(near.license.days, 45);
  assert.equal(near.licenseIfLevy.suspended, false);
  assert.equal(near.suspensionDecides, true);
  assert.equal(near.choice, 'levy');
  // 1만원 아끼고 45일 정지 — 하루를 222원에 사는 셈이다
  assert.ok(Math.abs(near.savePerSuspendedDay! - 10_000 / 45) < 1e-9);

  // 이미 정지 기준을 넘긴 사람은 이번 선택으로 갈리는 것이 아니다
  const already = at(25, { accumulated: 40, earlyPayDays: 0 });
  assert.equal(already.licenseIfLevy.suspended, true);
  assert.equal(already.suspensionDecides, false);
  assert.equal(already.savePerSuspendedDay, null);
  assert.equal(already.choice, 'fine');

  // 벌점이 0인 구간은 정지가 걸릴 일이 없다
  const light = at(10, { accumulated: 39, earlyPayDays: 0 });
  assert.equal(light.fineDemerit, 0);
  assert.equal(light.license.suspended, false);
  assert.equal(light.suspensionDecides, false);
});

test('확신 못 한 칸은 비워 두고 그 사실을 남긴다', () => {
  // 중앙선 침범은 과태료를 확인하지 못해 비워 뒀다
  const center = calcFine({ ...BASE, violation: 'centerline' });
  assert.equal(center.fine, 60_000);
  assert.equal(center.levy, null);
  assert.equal(center.levyPayable, null);
  assert.equal(center.fineDemerit, 30);
  assert.deepEqual(center.missing, ['과태료']);
  // 한쪽을 모르면 유리한 쪽을 고를 수 없다 — 아무 답이나 내지 않는다
  assert.equal(center.choice, 'unknown');
  assert.equal(center.saveByFine, null);

  // 안전띠는 반대로 범칙금 쪽을 비워 뒀다
  const belt = calcFine({ ...BASE, violation: 'seatbelt' });
  assert.equal(belt.fine, null);
  assert.equal(belt.levy, 30_000);
  assert.equal(belt.fineDemerit, 0);
  assert.deepEqual(belt.missing, ['범칙금']);

  // 직접 입력은 세 칸이 다 비어 있다
  const custom = calcFine({ ...BASE, violation: 'custom' });
  assert.deepEqual(custom.missing, ['범칙금', '과태료', '벌점']);

  // 고지서 금액을 넣으면 표를 이기고, 비워 둔 칸도 채워진다
  const filled = calcFine({
    ...BASE, violation: 'custom',
    fineOverride: 40_000, levyOverride: 50_000, demeritOverride: 10,
    earlyPayDays: 0,
  });
  assert.deepEqual(filled.missing, []);
  assert.equal(filled.finePayable, 40_000);
  assert.equal(filled.levyPayable, 50_000);
  assert.equal(filled.fineDemerit, 10);
  assert.equal(filled.choice, 'fine');

  // 고지서 금액은 구간표보다도 우선한다
  const overridden = at(25, { levyOverride: 90_000, earlyPayDays: 0 });
  assert.equal(overridden.levy, 90_000);
  assert.equal(overridden.fine, 60_000);
});

test('제한속도를 크게 넘기면 범칙금의 문제가 아니다', () => {
  assert.equal(CRIMINAL_OVER_SPEED, 100);
  assert.equal(at(100).criminalRisk, false);
  assert.equal(at(101).criminalRisk, true);
  // 속도위반이 아닌 위반에는 이 경고가 붙지 않는다
  assert.equal(calcFine({ ...BASE, violation: 'signal' }).criminalRisk, false);
});
