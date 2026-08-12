/**
 * 근로장려금·자녀장려금 — 꺾인 선이 정말 이어져 있나.
 *
 * 이 계산기의 값은 세 구간이 경계에서 만난다는 것이다. 만나지 않으면 1원 더 벌어
 * 수십만원을 잃는 자리가 생기고, 그건 산정식을 잘못 옮겼다는 뜻이다. 그래서 가장
 * 먼저 하는 일은 **경계를 1원 차이로 밟아 보는 것**이다 — 경계 바로 아래와 위의
 * 차이가 그 구간의 기울기(1원어치)를 넘으면 계단이 있는 것이다.
 *
 * 아래 고시값은 **검사용 자료일 뿐이고 정답이 아니다.** 해마다 바뀌는 값을 lib에
 * 박지 않았으므로, 검사도 자기가 쓸 숫자를 자기가 들고 있어야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  HALF_RATIO, LATE_RATIO, HOUSEHOLD_LABEL,
  type EitcInput, type Household, type Schedule,
  calcEitc, creditFor, marginalRate, perChild,
} from '../lib/eitc.ts';

/** 근로장려금 — 가구 유형 세 줄 (검사용 고시값) */
const WORK: Record<Household, Schedule> = {
  single:       { ceiling: 22_000_000, max: 1_650_000, plateauStart: 4_000_000, plateauEnd:  9_000_000, floor: 0 },
  singleEarner: { ceiling: 32_000_000, max: 2_850_000, plateauStart: 7_000_000, plateauEnd: 14_000_000, floor: 0 },
  dualEarner:   { ceiling: 38_000_000, max: 3_300_000, plateauStart: 8_000_000, plateauEnd: 17_000_000, floor: 0 },
};

/** 자녀장려금 — 자녀 1인당. 점증이 없고(plateauStart 0) 바닥이 0이 아니다 */
const CHILD: Record<Household, Schedule> = {
  single:       { ceiling: 70_000_000, max: 1_000_000, plateauStart: 0, plateauEnd: 21_000_000, floor: 500_000 },
  singleEarner: { ceiling: 70_000_000, max: 1_000_000, plateauStart: 0, plateauEnd: 21_000_000, floor: 500_000 },
  dualEarner:   { ceiling: 70_000_000, max: 1_000_000, plateauStart: 0, plateauEnd: 25_000_000, floor: 500_000 },
};

const ASSET_LIMIT = 240_000_000;
const ASSET_HALF = 170_000_000;

const ALL: Household[] = ['single', 'singleEarner', 'dualEarner'];
const amount = (s: Schedule, x: number) => creditFor(s, x).amount;

/** 재산·기한 감액 없이, 소득만 넣어 보는 기본 입력 */
const plain = (household: Household, income: number, over: Partial<EitcInput> = {}): EitcInput => ({
  household,
  totalIncome: income,
  earnedIncome: income,
  work: WORK[household],
  child: CHILD[household],
  children: 0,
  asset: 0,
  assetLimit: ASSET_LIMIT,
  assetHalfLimit: ASSET_HALF,
  lateApply: false,
  ...over,
});

// ── 가장 중요한 검사 ────────────────────────────────────────────

test('꺾인 자리에서 점증·정액·점감이 만난다', () => {
  for (const s of [...ALL.map(h => WORK[h]), ...ALL.map(h => CHILD[h])]) {
    const inSlope = s.plateauStart > 0 ? s.max / s.plateauStart : 0;
    const outSlope = (s.max - s.floor) / (s.ceiling - s.plateauEnd);

    // 점증이 끝나는 점은 정액과 같은 값이어야 한다 — 정확히 최대액이다
    assert.equal(amount(s, s.plateauStart), s.max, `점증 끝 ${s.plateauStart}`);
    // 정액이 끝나는 점도 정확히 최대액이다 — 점감 식이 여기서 max로 출발한다
    assert.equal(amount(s, s.plateauEnd), s.max, `점감 시작 ${s.plateauEnd}`);

    if (s.plateauStart > 0) {
      // 경계 바로 아래는 딱 1원어치(점증 기울기)만 낮아야 한다
      const step = s.max - amount(s, s.plateauStart - 1);
      assert.ok(Math.abs(step - inSlope) < 1e-6, `점증 경계에 계단: ${step} vs ${inSlope}`);
      assert.ok(step < 1, `점증 경계에서 1원에 ${step}원이 움직인다`);
    }

    // 정액 구간 안쪽은 어디를 찍어도 최대액이다
    assert.equal(amount(s, Math.floor((s.plateauStart + s.plateauEnd) / 2)), s.max);
    assert.equal(amount(s, s.plateauEnd - 1), s.max);

    // 경계 바로 위는 딱 1원어치(점감 기울기)만 낮아야 한다
    const outStep = s.max - amount(s, s.plateauEnd + 1);
    assert.ok(Math.abs(outStep - outSlope) < 1e-6, `점감 경계에 계단: ${outStep} vs ${outSlope}`);
    assert.ok(outStep < 1, `점감 경계에서 1원에 ${outStep}원이 움직인다`);

    // 점감은 기준금액에서 바닥에 닿는다 — 1원 앞은 바닥보다 1원어치만 높다
    const last = amount(s, s.ceiling - 1);
    assert.ok(Math.abs(last - s.floor - outSlope) < 1e-6, `바닥에 안 닿는다: ${last} vs ${s.floor}`);
  }
});

test('기준금액에 닿으면 정확히 0이다', () => {
  for (const h of ALL) {
    const s = WORK[h];
    assert.equal(amount(s, s.ceiling), 0, HOUSEHOLD_LABEL[h]);
    assert.equal(amount(s, s.ceiling + 1), 0);
    assert.equal(amount(s, s.ceiling * 10), 0);
    assert.equal(creditFor(s, s.ceiling).phase, 'over');

    // 근로장려금은 바닥이 0이라 절벽이 없다 — 1원 앞의 금액이 1원어치뿐이다
    assert.ok(amount(s, s.ceiling - 1) > 0);
    assert.ok(amount(s, s.ceiling - 1) < 1, `기준금액 앞에서 ${amount(s, s.ceiling - 1)}원이 남는다`);
  }

  // 총소득이 기준금액을 넘으면 총급여액 등이 낮아도 0이다
  const r = calcEitc(plain('single', 0, { totalIncome: 22_000_000, earnedIncome: 5_000_000 }));
  assert.equal(r.work, 0);
  assert.equal(r.total, 0);
  assert.equal(r.phase, 'over');
  // 1원 아래면 받는다 — 문턱이 총소득에 걸려 있다는 증거
  const ok = calcEitc(plain('single', 0, { totalIncome: 21_999_999, earnedIncome: 5_000_000 }));
  assert.equal(ok.work, 1_650_000);
});

test('점증에서는 늘고 점감에서는 준다', () => {
  for (const h of ALL) {
    const s = WORK[h];
    // 점증 — 100원씩 올려도 한 번도 안 줄어야 한다
    let prev = -1;
    for (let x = 0; x <= s.plateauStart; x += Math.floor(s.plateauStart / 500)) {
      const v = amount(s, x);
      assert.ok(v > prev, `${HOUSEHOLD_LABEL[h]} 점증이 ${x}에서 안 늘었다`);
      prev = v;
    }
    // 점감 — 한 번도 안 늘어야 한다
    prev = Infinity;
    for (let x = s.plateauEnd; x < s.ceiling; x += Math.floor((s.ceiling - s.plateauEnd) / 500)) {
      const v = amount(s, x);
      assert.ok(v < prev, `${HOUSEHOLD_LABEL[h]} 점감이 ${x}에서 안 줄었다`);
      prev = v;
    }
    // 정액 구간에서는 더 벌어도 그대로다
    assert.equal(marginalRate(s, s.plateauStart + 1000), 0);
    // 점증에서는 양수, 점감에서는 음수
    assert.ok(marginalRate(s, 1_000_000) > 0);
    assert.ok(marginalRate(s, s.plateauEnd + 1_000_000) < 0);
    // 점감 기울기는 숨은 세율이다 — 100만원을 더 벌면 이만큼 깎인다
    assert.ok(Math.abs(marginalRate(s, s.plateauEnd + 1) * 1_000_000) > 10_000);
  }
});

test('소득을 전 구간 훑어도 최대 지급액을 넘지 않는다', () => {
  for (const h of ALL) {
    const s = WORK[h];
    for (let x = 0; x <= s.ceiling + 5_000_000; x += 10_000) {
      const v = amount(s, x);
      assert.ok(v <= s.max + 1e-9, `${HOUSEHOLD_LABEL[h]} ${x}원에서 ${v} > ${s.max}`);
      assert.ok(v >= 0, `${HOUSEHOLD_LABEL[h]} ${x}원에서 음수 ${v}`);
    }
    // 경계 주변은 1원씩 촘촘히 본다 — 넘치는 곳은 늘 꺾인 자리다
    for (const b of [s.plateauStart, s.plateauEnd, s.ceiling]) {
      for (let x = Math.max(0, b - 3); x <= b + 3; x += 1) {
        const v = amount(s, x);
        assert.ok(v <= s.max + 1e-9 && v >= 0, `${HOUSEHOLD_LABEL[h]} ${x}원에서 ${v}`);
      }
    }
  }

  // 자녀 수를 곱해도 1인당 최대액의 배수를 넘지 않는다
  for (let n = 1; n <= 5; n += 1) {
    const s = perChild(CHILD.dualEarner, n);
    for (let x = 0; x <= s.ceiling + 1_000_000; x += 50_000) {
      assert.ok(amount(s, x) <= 1_000_000 * n + 1e-9, `자녀 ${n}명 ${x}원`);
    }
  }
});

// ── 재산 요건 ──────────────────────────────────────────────────

test('재산이 상한을 넘기면 0, 절반 구간이면 정확히 절반이다', () => {
  const full = calcEitc(plain('singleEarner', 10_000_000)).work;
  assert.equal(full, 2_850_000);

  // 절반 기준 1원 아래는 전액이다
  assert.equal(calcEitc(plain('singleEarner', 10_000_000, { asset: ASSET_HALF - 1 })).work, full);

  // 절반 기준에 닿으면 정확히 50%다
  const half = calcEitc(plain('singleEarner', 10_000_000, { asset: ASSET_HALF }));
  assert.equal(half.work, full * HALF_RATIO);
  assert.equal(half.work, 1_425_000);
  assert.ok(half.halved);
  assert.ok(!half.assetOver);

  // 상한 1원 아래까지는 절반, 상한에 닿으면 0이다
  assert.equal(calcEitc(plain('singleEarner', 10_000_000, { asset: ASSET_LIMIT - 1 })).work, full * HALF_RATIO);
  const over = calcEitc(plain('singleEarner', 10_000_000, { asset: ASSET_LIMIT }));
  assert.equal(over.work, 0);
  assert.equal(over.total, 0);
  assert.ok(over.assetOver);
  assert.ok(!over.halved);

  // 재산 감액은 자녀장려금에도 똑같이 걸린다
  const both = calcEitc(plain('singleEarner', 10_000_000, { children: 2, asset: ASSET_HALF }));
  assert.equal(both.child, 2_000_000 * HALF_RATIO);
  assert.equal(both.total, (2_850_000 + 2_000_000) * HALF_RATIO);
});

test('기한 후 신청은 100분의 90만 준다', () => {
  const onTime = calcEitc(plain('dualEarner', 12_000_000, { children: 1 }));
  const late = calcEitc(plain('dualEarner', 12_000_000, { children: 1, lateApply: true }));
  assert.equal(late.total, onTime.total * LATE_RATIO);
  assert.equal(late.ratio, LATE_RATIO);
  // 산정액 자체는 안 깎인다 — 깎이는 것은 받는 금액이다
  assert.equal(late.workBase, onTime.workBase);

  // 재산 절반 감액과 겹치면 둘이 곱해진다
  const both = calcEitc(plain('dualEarner', 12_000_000, { lateApply: true, asset: ASSET_HALF }));
  assert.equal(both.ratio, HALF_RATIO * LATE_RATIO);
  assert.equal(both.work, onTime.workBase * HALF_RATIO * LATE_RATIO);
});

// ── 가구 유형 ──────────────────────────────────────────────────

test('가구 유형 셋이 서로 다른 금액을 낸다', () => {
  // 같은 소득 1,000만원인데 셋이 다 다르다
  const at10 = ALL.map(h => calcEitc(plain(h, 10_000_000)).work);
  assert.equal(new Set(at10).size, 3, `겹친다: ${at10.join(', ')}`);
  // 단독가구가 가장 적고 맞벌이가 가장 많다 — 최대액 순서 그대로다
  assert.ok(at10[0] < at10[1] && at10[1] < at10[2], at10.join(' < '));

  // 단독가구는 기준금액이 낮아 2,500만원에서 이미 0인데 나머지는 받는다
  assert.equal(calcEitc(plain('single', 25_000_000)).work, 0);
  assert.ok(calcEitc(plain('singleEarner', 25_000_000)).work > 0);
  assert.ok(calcEitc(plain('dualEarner', 25_000_000)).work > 0);

  // 최대액을 받는 구간도 유형마다 다르다
  assert.equal(creditFor(WORK.single, 5_000_000).phase, 'plateau');
  assert.equal(creditFor(WORK.dualEarner, 5_000_000).phase, 'phaseIn');
});

test('자녀장려금은 단독가구에 없고 자녀 수에 비례한다', () => {
  // 단독가구는 자녀 수를 넣어도 0이다 — 부양자녀가 없는 가구를 뜻하니 정의상 그렇다
  assert.equal(calcEitc(plain('single', 10_000_000, { children: 2 })).child, 0);

  // 자녀가 0명이면 홑벌이도 0이다
  assert.equal(calcEitc(plain('singleEarner', 10_000_000, { children: 0 })).child, 0);

  // 점증 구간이 없어 소득 0에서도 1인당 최대액을 받는다
  assert.equal(calcEitc(plain('singleEarner', 0, { children: 1 })).child, 1_000_000);
  assert.equal(calcEitc(plain('singleEarner', 0, { children: 3 })).child, 3_000_000);

  // 자녀 수는 금액만 곱한다 — 점감이 시작하는 소득은 그대로다
  for (let n = 1; n <= 4; n += 1) {
    const one = calcEitc(plain('dualEarner', 30_000_000, { children: 1 })).child;
    const many = calcEitc(plain('dualEarner', 30_000_000, { children: n })).child;
    assert.ok(Math.abs(many - one * n) < 1e-6, `자녀 ${n}명: ${many} vs ${one * n}`);
  }

  // 소수점 자녀는 내림한다 — 2.9명은 2명이다
  assert.equal(
    calcEitc(plain('singleEarner', 0, { children: 2.9 })).child,
    calcEitc(plain('singleEarner', 0, { children: 2 })).child,
  );
});

test('자녀장려금은 기준금액에서 바닥만큼 뚝 끊긴다', () => {
  const s = perChild(CHILD.singleEarner, 2);
  // 바닥이 0이 아니므로 기준금액 1원 앞에도 100만원이 남아 있다
  const last = amount(s, s.ceiling - 1);
  assert.ok(Math.abs(last - 1_000_000) < 1, `바닥이 아니다: ${last}`);
  // 그런데 기준금액에 닿으면 0이다 — 근로장려금과 달리 여기엔 절벽이 있다
  assert.equal(amount(s, s.ceiling), 0);
  assert.ok(last - amount(s, s.ceiling) > 900_000, '절벽이 사라졌다');

  // 근로장려금 쪽은 그 절벽이 없다 — 두 제도의 모양이 다르다는 것을 못 박는다
  const w = WORK.singleEarner;
  assert.ok(amount(w, w.ceiling - 1) - amount(w, w.ceiling) < 1);
});

// ── 경계에서 무너지지 않나 ──────────────────────────────────────

test('소득 0·재산 0 같은 끝에서도 무너지지 않는다', () => {
  for (const h of ALL) {
    // 소득 0이면 근로장려금은 0이다 — 일해야 받는 제도라서 점증이 0에서 시작한다
    const zero = calcEitc(plain(h, 0));
    assert.equal(zero.work, 0);
    assert.equal(zero.phase, 'phaseIn');
    assert.equal(zero.ratio, 1);
    assert.ok(!zero.halved && !zero.assetOver);

    // 음수 소득·음수 재산도 0으로 본다
    const neg = calcEitc(plain(h, 0, { totalIncome: -1, earnedIncome: -5_000_000, asset: -1 }));
    assert.equal(neg.work, 0);
    assert.ok(Number.isFinite(neg.total));
  }

  // 고시값을 안 넣으면(전부 0) 답이 0이어야 하고 NaN이 나오면 안 된다
  const empty = calcEitc({
    household: 'single', totalIncome: 0, earnedIncome: 0,
    work: { ceiling: 0, max: 0, plateauStart: 0, plateauEnd: 0, floor: 0 },
    children: 0, asset: 0, assetLimit: 0, assetHalfLimit: 0, lateApply: false,
  });
  assert.equal(empty.total, 0);
  assert.ok(Number.isFinite(empty.total));
  // 재산 상한을 0으로 두면 "제한 없음"으로 본다 — 0원인 사람을 탈락시키면 안 된다
  assert.ok(!empty.assetOver);

  // child를 안 주면 자녀장려금은 안 낸다
  const noChild = calcEitc({ ...plain('dualEarner', 10_000_000, { children: 2 }), child: undefined });
  assert.equal(noChild.child, 0);
  assert.equal(noChild.total, noChild.work);

  // 경계가 뒤집힌 입력도 순서대로 되잡아 최대액을 넘지 않는다
  const flipped: Schedule = { ceiling: 1_000_000, max: 500_000, plateauStart: 9_000_000, plateauEnd: 2_000_000, floor: 0 };
  for (let x = 0; x <= 12_000_000; x += 100_000) {
    const v = amount(flipped, x);
    assert.ok(v >= 0 && v <= 500_000 + 1e-9, `뒤집힌 입력 ${x}원에서 ${v}`);
  }
  // 절반 기준이 상한보다 높게 들어와도 상한이 이긴다
  const bad = calcEitc(plain('single', 10_000_000, { asset: ASSET_LIMIT, assetHalfLimit: ASSET_LIMIT * 2 }));
  assert.equal(bad.work, 0);
  assert.ok(bad.assetOver);
});
