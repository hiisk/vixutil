/**
 * 기준 중위소득 — 셈을 다른 길로 되짚는다.
 *
 * 퍼센트는 두 방향이 서로 역이어야 한다. 소득을 %로 바꿨다가 도로 금액으로
 * 바꾸면 처음 값이 나온다. 판정은 경계에서만 갈리므로 32·40·48·50% 자리를
 * 1원 차이로 밟아 한 칸씩만 바뀌는지 본다. 생계급여는 차액이라, 소득이 0이면
 * 기준액 전액이고 기준을 넘으면 0이다.
 *
 * 아래 고시표는 **검사용 예시 숫자**다. 그 해의 실제 고시액이 아니고, 일부러
 * 정비례가 아니게 골랐다 — 1인에 배수를 곱해 나머지를 지어내는 코드가 있으면
 * 여기서 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BENEFIT_RULES, amountOfMedian, calcMedianIncome, medianFor, percentOfMedian, supplementAmount,
} from '../lib/median-income.ts';

/** [1인, 2인, …, 7인 이상] — 서로 정비례가 아니다 */
const TABLE = [2_400_000, 3_900_000, 5_000_000, 6_100_000, 7_100_000, 8_100_000, 9_050_000];

/** 1인 가구 240만원이면 네 급여 기준액이 모두 정수로 떨어진다 — 1원 차이를 밟기 좋다 */
const ONE = TABLE[0];

const calc = (recognized: number, size = 1, assetValue = 0) =>
  calcMedianIncome({
    medianBySize: TABLE, size, incomeValue: recognized - assetValue, assetValue,
  });

test('퍼센트와 금액은 서로 되짚는다', () => {
  for (const median of [2_400_000, 3_899_357, 9_050_000]) {
    for (const income of [0, 750_000, 1_200_000, 4_000_000]) {
      const pct = percentOfMedian(income, median);
      assert.ok(Math.abs(amountOfMedian(pct, median) - income) < 1e-6, `${income} of ${median}`);
    }
    // 급여 기준액을 도로 %로 바꾸면 고시된 퍼센트가 나온다
    for (const rule of BENEFIT_RULES) {
      const amount = amountOfMedian(rule.percent, median);
      assert.ok(Math.abs(percentOfMedian(amount, median) - rule.percent) < 1e-9, rule.label);
    }
    // 100%는 기준 중위소득 그 자체다
    assert.equal(amountOfMedian(100, median), median);
  }
  // 기준 중위소득을 모르면 0으로 나누지 않는다
  assert.equal(percentOfMedian(1_000_000, 0), 0);
});

test('가구원 수별 고시액을 그대로 쓴다', () => {
  for (let size = 1; size <= TABLE.length; size++) {
    assert.equal(medianFor(TABLE, size), TABLE[size - 1], `${size}인`);
  }
  // 마지막 칸은 "그 인원 이상"이다 — 배수로 늘려 짐작하지 않는다
  assert.equal(medianFor(TABLE, 8), TABLE[6]);
  assert.equal(medianFor(TABLE, 20), TABLE[6]);
  // 가구원 수가 비었거나 이상해도 1인 칸으로 떨어진다
  assert.equal(medianFor(TABLE, 0), ONE);
  assert.equal(medianFor(TABLE, -3), ONE);
  assert.equal(medianFor([], 4), 0);
  // 2인은 1인의 두 배가 아니다 — 표를 배수로 지어내면 여기서 어긋난다
  assert.notEqual(TABLE[1], TABLE[0] * 2);
  assert.notEqual(medianFor(TABLE, 4), medianFor(TABLE, 1) * 4);
});

test('급여별 선정기준은 32·40·48·50%다', () => {
  assert.deepEqual(
    BENEFIT_RULES.map(r => [r.label, r.percent]),
    [['생계급여', 32], ['의료급여', 40], ['주거급여', 48], ['교육급여', 50]],
  );
  // 차액을 주는 것은 생계급여뿐이다
  assert.deepEqual(BENEFIT_RULES.filter(r => r.supplemental).map(r => r.label), ['생계급여']);

  // 1인 가구 240만원이면 76.8만 / 96만 / 115.2만 / 120만
  const r = calc(0);
  assert.equal(r.median, ONE);
  assert.deepEqual(r.lines.map(l => l.threshold), [768_000, 960_000, 1_152_000, 1_200_000]);
});

test('경계를 1원 넘으면 판정이 한 칸씩만 바뀐다', () => {
  const [생계, 의료, 주거, 교육] = calc(0).lines.map(l => l.threshold);

  // 기준액과 딱 같으면 "이하"이므로 해당한다
  assert.deepEqual(calc(생계).eligible, ['생계급여', '의료급여', '주거급여', '교육급여']);
  // 1원 넘으면 그 급여만 떨어진다
  assert.deepEqual(calc(생계 + 1).eligible, ['의료급여', '주거급여', '교육급여']);
  assert.deepEqual(calc(의료).eligible, ['의료급여', '주거급여', '교육급여']);
  assert.deepEqual(calc(의료 + 1).eligible, ['주거급여', '교육급여']);
  assert.deepEqual(calc(주거).eligible, ['주거급여', '교육급여']);
  assert.deepEqual(calc(주거 + 1).eligible, ['교육급여']);
  assert.deepEqual(calc(교육).eligible, ['교육급여']);
  assert.deepEqual(calc(교육 + 1).eligible, []);

  // 네 자리를 지나며 해당 개수는 4→3→2→1→0으로 한 칸씩만 줄어든다
  assert.deepEqual(
    [생계, 의료, 주거, 교육].map(t => calc(t + 1).eligible.length),
    [3, 2, 1, 0],
  );
});

test('생계급여는 기준액에서 소득인정액을 뺀 차액이다', () => {
  // 1인 가구, 소득인정액 50만원 → 76.8만 − 50만 = 26.8만
  const r = calc(500_000);
  assert.equal(r.livelihood, 268_000);
  assert.equal(r.livelihood, r.lines[0].threshold - r.recognized);
  assert.equal(r.livelihood, supplementAmount(768_000, 500_000));
  assert.equal(r.percent, (500_000 / ONE) * 100);

  // 소득인정액은 소득평가액 + 재산의 소득환산액이다 — 나눠 넣어도 답이 같다
  const split = calc(500_000, 1, 200_000);
  assert.equal(split.recognized, 500_000);
  assert.equal(split.livelihood, r.livelihood);

  // 차액을 주는 것은 생계급여뿐 — 나머지는 판정만 하고 금액을 내지 않는다
  assert.deepEqual(r.lines.map(l => l.monthly), [268_000, 0, 0, 0]);
  // 기준액에 딱 닿으면 선정은 되지만 받을 차액이 없다
  const edge = calc(768_000);
  assert.ok(edge.lines[0].eligible);
  assert.equal(edge.livelihood, 0);
});

test('소득이 0이면 생계급여는 기준액 전액이다', () => {
  for (let size = 1; size <= TABLE.length; size++) {
    const r = calcMedianIncome({ medianBySize: TABLE, size, incomeValue: 0, assetValue: 0 });
    assert.equal(r.recognized, 0);
    assert.equal(r.percent, 0);
    assert.equal(r.livelihood, amountOfMedian(32, medianFor(TABLE, size)), `${size}인`);
    assert.equal(r.livelihood, r.lines[0].threshold);
    assert.equal(r.eligible.length, BENEFIT_RULES.length);
  }
});

test('기준을 넘으면 그 급여는 0이고 음수로 가지 않는다', () => {
  // 1인 가구 소득 100만원 → 생계급여 기준 76.8만을 넘었다
  const r = calc(1_000_000);
  assert.equal(r.livelihood, 0);
  assert.equal(r.lines[0].eligible, false);
  assert.equal(r.lines[0].monthly, 0);
  // 남은 여유는 음수로 적히지만 지급액은 0에서 멈춘다
  assert.equal(r.lines[0].headroom, 768_000 - 1_000_000);
  assert.equal(supplementAmount(768_000, 900_000), 0);
  assert.equal(supplementAmount(768_000, 10_000_000), 0);

  // 소득이 아무리 커도 지급액이 음수가 되지 않는다
  for (const income of [1_200_001, 5_000_000, 99_000_000]) {
    const x = calc(income);
    assert.equal(x.livelihood, 0, `${income}`);
    assert.deepEqual(x.eligible, []);
    assert.ok(x.lines.every(l => l.monthly === 0));
  }
});

test('가구원 수를 바꾸면 모든 급여 기준액이 함께 바뀐다', () => {
  let prev: number[] | null = null;
  for (let size = 1; size <= TABLE.length; size++) {
    const lines = calc(0, size).lines;
    const thresholds = lines.map(l => l.threshold);
    // 기준액은 모두 그 가구원 수의 고시액에서 나온다
    lines.forEach(l => {
      assert.equal(l.threshold, amountOfMedian(l.percent, TABLE[size - 1]), `${size}인 ${l.label}`);
    });
    // 가구원이 늘면 네 기준액이 하나도 빠짐없이 함께 오른다
    if (prev) thresholds.forEach((t, i) => assert.ok(t > prev![i], `${size}인 ${lines[i].label}`));
    prev = thresholds;
  }

  // 같은 소득이라도 가구원 수에 따라 판정이 뒤집힌다 — 실제로 가장 흔한 상황이다
  const income = 1_000_000;
  assert.deepEqual(calc(income, 1).eligible, ['주거급여', '교육급여']);
  assert.deepEqual(calc(income, 3).eligible, ['생계급여', '의료급여', '주거급여', '교육급여']);
  assert.ok(calc(income, 3).livelihood > 0);
  assert.equal(calc(income, 1).livelihood, 0);
});

test('퍼센트 규칙은 갈아 끼울 수 있다', () => {
  // 고시가 바뀌어 생계급여가 35%가 되면 기준액과 지급액이 함께 따라간다
  const rules = [{ label: '생계급여', percent: 35, supplemental: true }];
  const r = calcMedianIncome(
    { medianBySize: TABLE, size: 1, incomeValue: 500_000, assetValue: 0 }, rules,
  );
  assert.equal(r.lines.length, 1);
  assert.equal(r.lines[0].threshold, 840_000);
  assert.equal(r.livelihood, 340_000);
  // 기본 규칙은 그대로 32%다 — 인자를 넘겼다고 원래 규칙이 바뀌지는 않는다
  assert.equal(BENEFIT_RULES[0].percent, 32);
  assert.equal(calc(500_000).lines[0].threshold, 768_000);
});
