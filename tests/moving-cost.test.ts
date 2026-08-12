/**
 * 이사비 — 금액을 확인할 길이 없으니 **구조**를 확인한다.
 *
 * 이 계산기에는 밖에서 맞춰 볼 요금표가 없다. 그래서 검사가 지키는 것은
 * 시세가 아니라 셈의 뼈대다: 합계가 항목들의 합과 정확히 같은지, 조건을
 * 하나만 움직였을 때 딱 그만큼만 움직이는지, 켜고 끄기가 서로 새지 않는지.
 *
 * 합계 항등식을 두 갈래로 센다 — 결과 필드를 손으로 더한 값과, 화면에 뿌리는
 * items 배열을 더한 값. 내역에서 한 줄이 빠지면 두 값이 갈라져 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  MOVE_TYPES, OFTEN_MISSED, SQM_PER_PYEONG, VAT_RATE,
  calcMovingCost, pyeongToSqm, ratioOf, sqmToPyeong,
  type MovingInput, type MoveType,
} from '../lib/moving-cost.ts';

/** 모든 칸이 채워진 견적 하나 — 여기서 한 칸씩 바꿔 가며 본다 */
const BASE: MovingInput = {
  pyeong: 25,
  perPyeong: 40_000,
  moveType: 'packing',
  sameCity: false,
  distanceKm: 120,
  perKm: 3_000,
  sites: [
    { floor: 3, elevator: false, ladder: false },
    { floor: 5, elevator: true, ladder: false },
  ],
  perFloorFee: 50_000,
  ladderFee: 130_000,
  peakMultiplier: 1.2,
  airconUnits: 2,
  airconPerUnit: 150_000,
  specialItemFee: 250_000,
  storageFee: 200_000,
  disposalFee: 80_000,
  cleaningFee: 180_000,
  vat: true,
  discount: 100_000,
};

const at = (over: Partial<MovingInput>): MovingInput => ({ ...BASE, ...over });

/** 결과 필드를 손으로 더한 합계 — items를 거치지 않는 두 번째 길 */
const byField = (r: ReturnType<typeof calcMovingCost>): number =>
  r.volumeFee + r.typeExtra + r.distanceFee + r.stairFee + r.ladderTotal + r.peakExtra
  + r.airconFee + r.specialItemFee + r.storageFee + r.disposalFee + r.cleaningFee
  + r.vatAmount - r.discount;

test('손으로 셈한 견적 하나가 그대로 나온다', () => {
  const r = calcMovingCost(BASE);

  // 25평 × 4만원 = 100만원, 포장이사 배수 1.6이니 가산 60만원
  assert.equal(r.volumeFee, 1_000_000);
  assert.equal(r.typeExtra, 600_000);
  // 120km × 3,000원
  assert.equal(r.distanceFee, 360_000);
  // 3층은 엘리베이터가 없어 2개 층, 5층은 있어 0개 층 → 2개 층 × 5만원
  assert.equal(r.stairFloors, 2);
  assert.equal(r.stairFee, 100_000);
  // 사다리차를 쓰는 집이 없으니 이용료를 넣어 두어도 0원이다
  assert.equal(r.ladderCount, 0);
  assert.equal(r.ladderTotal, 0);

  assert.equal(r.baseSubtotal, 2_060_000);
  // 배수 1.2 → 업체 몫의 20%
  assert.equal(r.peakExtra, 412_000);
  assert.equal(r.companyTotal, 2_472_000);

  // 추가 항목: 에어컨 2대 30만 + 특수 25만 + 보관 20만 + 폐기물 8만 + 청소 18만
  assert.equal(r.airconFee, 300_000);
  assert.equal(r.extrasTotal, 1_010_000);

  // 부가세는 업체 몫에만 — 추가 항목은 대상이 아니다
  assert.equal(r.vatAmount, 247_200);
  assert.equal(r.discount, 100_000);

  assert.equal(r.total, 3_629_200);
});

test('합계는 항목들의 합과 정확히 같다', () => {
  const cases: Partial<MovingInput>[] = [
    {},
    { moveType: 'basic' },
    { moveType: 'semi', vat: false },
    { sameCity: true, peakMultiplier: 1 },
    { pyeong: 7.5, perPyeong: 33_333, peakMultiplier: 1.35 },
    { sites: [{ floor: 11, elevator: false, ladder: true }, { floor: 2, elevator: false, ladder: false }] },
    { discount: 999_999_999 },
    { vat: false, discount: 0, airconUnits: 0 },
    { pyeong: 0, perPyeong: 0, distanceKm: 0, airconUnits: 0 },
  ];

  for (const over of cases) {
    const r = calcMovingCost(at(over));
    const label = JSON.stringify(over);

    // 화면에 뿌리는 내역을 더한 값
    const fromItems = r.items.reduce((s, i) => s + i.amount, 0);
    assert.equal(r.total, fromItems, `내역 합과 다르다: ${label}`);
    // 결과 필드를 더한 값 — 내역에서 한 줄이 빠지면 이쪽과 갈라진다
    assert.equal(r.total, byField(r), `필드 합과 다르다: ${label}`);

    // 항목은 모두 정수이고, 할인만 음수일 수 있다
    for (const i of r.items) {
      assert.equal(i.amount, Math.trunc(i.amount), `${i.label}에 소수가 있다: ${label}`);
      if (i.amount < 0) assert.equal(i.label, '협의 할인', `할인 말고 음수 항목: ${i.label}`);
    }
    // 0원 항목은 내역에 남기지 않는다
    assert.ok(!r.items.some(i => i.amount === 0), `0원 항목이 남았다: ${label}`);
    assert.ok(r.total >= 0, `합계가 음수다: ${label}`);
  }
});

test('모든 입력이 0이면 합계도 0이다', () => {
  const zero = calcMovingCost({
    pyeong: 0, perPyeong: 0, moveType: 'packing',
    sameCity: false, distanceKm: 0, perKm: 0,
    sites: [{ floor: 15, elevator: false, ladder: true }],
    perFloorFee: 0, ladderFee: 0, peakMultiplier: 1,
    airconUnits: 3, airconPerUnit: 0,
    specialItemFee: 0, storageFee: 0, disposalFee: 0, cleaningFee: 0,
    vat: true, discount: 0,
  });
  assert.equal(zero.total, 0);
  assert.deepEqual(zero.items, []);
  // 층이 높고 사다리차를 쓴다 해도 단가가 0이면 0원이다 — 지어낸 값이 없다
  assert.equal(zero.ladderTotal, 0);
  assert.equal(zero.vatAmount, 0);
});

test('짐이 늘면 짐 몫이 늘고, 포장으로 올리면 값이 줄지 않는다', () => {
  let prev = -1;
  for (const pyeong of [0, 5, 12, 18, 25, 34, 50]) {
    const r = calcMovingCost(at({ pyeong }));
    assert.ok(r.volumeFee > prev, `${pyeong}평에서 짐 몫이 안 늘었다`);
    prev = r.volumeFee;
  }

  // 배수의 순서는 지어낸 것이 아니라 사람 손이 더 드는 순서다 — 부등호만 지킨다
  assert.equal(ratioOf('basic'), 1);
  const order: MoveType[] = ['basic', 'semi', 'packing'];
  for (let i = 1; i < order.length; i++) {
    assert.ok(ratioOf(order[i]) >= ratioOf(order[i - 1]), `${order[i]} 배수가 더 작다`);
  }
  const totals = order.map(moveType => calcMovingCost(at({ moveType })).total);
  for (let i = 1; i < totals.length; i++) {
    assert.ok(totals[i] >= totals[i - 1], `${order[i]}가 더 싸게 나온다`);
  }
  // 일반이사는 가산이 없다 — 평당 단가를 일반 기준으로 받기 때문이다
  assert.equal(calcMovingCost(at({ moveType: 'basic' })).typeExtra, 0);
  assert.equal(MOVE_TYPES.length, 3);
});

test('엘리베이터가 없으면 층마다 붇고, 1층은 가산이 없다', () => {
  const one = (floor: number, elevator: boolean, ladder = false) =>
    calcMovingCost(at({ sites: [{ floor, elevator, ladder }], perFloorFee: 50_000 }));

  // 1층은 오르내릴 층이 없다
  assert.equal(one(1, false).stairFloors, 0);
  assert.equal(one(1, false).stairFee, 0);

  // 층이 하나 오를 때마다 정확히 층당 이용료만큼 붇는다
  for (let floor = 2; floor <= 8; floor++) {
    const r = one(floor, false);
    assert.equal(r.stairFloors, floor - 1, `${floor}층의 계단 층수`);
    assert.equal(r.stairFee, (floor - 1) * 50_000, `${floor}층의 계단 이용료`);
    // 같은 층에 엘리베이터가 있으면 한 푼도 안 붙는다
    assert.equal(one(floor, true).stairFee, 0, `${floor}층 엘리베이터`);
    // 사다리차를 쓰면 계단으로 지지 않는다
    assert.equal(one(floor, false, true).stairFee, 0, `${floor}층 사다리차`);
    assert.equal(one(floor, false, true).ladderTotal, 130_000, `${floor}층 사다리차 값`);
  }

  // 지하는 규칙을 지어내지 않고 1층과 같게 둔다
  assert.equal(one(0, false).stairFee, 0);
  assert.equal(one(-1, false).stairFee, 0);

  // 두 집을 더한다 — 3층에서 5층으로 가면 엘리베이터 없는 층을 두 번 겪는다
  const both = calcMovingCost(at({
    sites: [{ floor: 3, elevator: false, ladder: false }, { floor: 5, elevator: false, ladder: false }],
  }));
  assert.equal(both.stairFloors, 2 + 4);
  assert.equal(both.stairFee, 6 * 50_000);
  // 사다리차도 집마다 센다
  const twoLadders = calcMovingCost(at({
    sites: [{ floor: 3, elevator: false, ladder: true }, { floor: 5, elevator: false, ladder: true }],
  }));
  assert.equal(twoLadders.ladderCount, 2);
  assert.equal(twoLadders.ladderTotal, 2 * 130_000);
});

test('성수기 배수를 1로 두면 평상시와 같다', () => {
  const plain = calcMovingCost(at({ peakMultiplier: 1 }));
  assert.equal(plain.peakExtra, 0);
  assert.equal(plain.companyTotal, plain.baseSubtotal);
  // 가산이 0이면 내역에 줄이 아예 안 뜬다
  assert.ok(!plain.items.some(i => i.label.includes('손 없는 날')));

  // 배수는 업체 몫에만 걸린다 — 추가 항목은 날짜로 오르지 않는다
  const peak = calcMovingCost(at({ peakMultiplier: 1.5 }));
  assert.equal(peak.peakExtra, plain.baseSubtotal / 2);
  assert.equal(peak.extrasTotal, plain.extrasTotal);

  // 1 아래로는 내려가지 않는다 — 깎아 주는 것은 배수가 아니라 협의 할인이다
  for (const m of [0, 0.5, 0.9, 1]) {
    assert.equal(calcMovingCost(at({ peakMultiplier: m })).total, plain.total, `배수 ${m}`);
  }

  // 같은 시·군 안이면 km와 단가가 들어 있어도 거리 가산이 0이다
  const near = calcMovingCost(at({ sameCity: true, peakMultiplier: 1 }));
  assert.equal(near.distanceFee, 0);
  assert.equal(near.total, plain.total - plain.distanceFee - plain.vatAmount + near.vatAmount);
});

test('추가 항목은 껐다 켜면 그 금액만 움직인다', () => {
  // 부가세를 켜 둔 채로 본다 — 추가 항목이 부가세 대상에 새어 들면 여기서 걸린다
  const OFF: Partial<MovingInput> = {
    airconUnits: 0, specialItemFee: 0, storageFee: 0, disposalFee: 0, cleaningFee: 0,
  };
  const none = calcMovingCost(at(OFF));
  assert.equal(none.extrasTotal, 0);

  const each: [Partial<MovingInput>, number][] = [
    [{ airconUnits: 2, airconPerUnit: 150_000 }, 300_000],
    [{ specialItemFee: 250_000 }, 250_000],
    [{ storageFee: 200_000 }, 200_000],
    [{ disposalFee: 80_000 }, 80_000],
    [{ cleaningFee: 180_000 }, 180_000],
  ];

  for (const [over, amount] of each) {
    const on = calcMovingCost(at({ ...OFF, ...over }));
    assert.equal(on.total - none.total, amount, `${JSON.stringify(over)}만큼만 움직여야 한다`);
    // 업체 몫과 부가세는 그대로다
    assert.equal(on.companyTotal, none.companyTotal, `${JSON.stringify(over)}가 업체 몫을 바꿨다`);
    assert.equal(on.vatAmount, none.vatAmount, `${JSON.stringify(over)}가 부가세를 바꿨다`);
  }

  // 에어컨은 대수만큼 늘어난다
  for (const units of [0, 1, 2, 5]) {
    const r = calcMovingCost(at({ airconUnits: units, airconPerUnit: 150_000 }));
    assert.equal(r.airconFee, units * 150_000, `${units}대`);
  }
  // 다섯을 다 켠 것은 하나씩 켠 것의 합과 같다 — 서로 새지 않는다
  const all = calcMovingCost(BASE);
  assert.equal(all.extrasTotal, each.reduce((s, [, a]) => s + a, 0));
});

test('부가세는 업체 몫에만 붙고 할인과 섞이지 않는다', () => {
  const on = calcMovingCost(at({ vat: true, discount: 0 }));
  const off = calcMovingCost(at({ vat: false, discount: 0 }));

  // 대상은 업체 몫이다 — 추가 항목에는 붙지 않는다
  assert.equal(on.vatAmount, Math.floor(on.companyTotal * VAT_RATE));
  assert.notEqual(on.vatAmount, Math.floor((on.companyTotal + on.extrasTotal) * VAT_RATE));
  assert.equal(off.vatAmount, 0);
  assert.equal(on.total - off.total, on.vatAmount);

  // 할인은 부가세를 계산한 **뒤에** 뺀다 — 할인을 바꿔도 부가세는 그대로다
  for (const discount of [0, 50_000, 300_000, 1_000_000]) {
    const r = calcMovingCost(at({ vat: true, discount }));
    assert.equal(r.vatAmount, on.vatAmount, `할인 ${discount}이 부가세를 바꿨다`);
    assert.equal(r.total, on.total - discount, `할인 ${discount}만큼만 빠져야 한다`);
  }

  // 할인이 총액보다 크면 총액까지만 깎는다 — 받을 돈이 생기지는 않는다
  const over = calcMovingCost(at({ discount: 99_999_999 }));
  assert.equal(over.total, 0);
  assert.equal(over.discount, on.total);

  // "현금으로 하면 부가세 빼 준다"는 부가세를 끄는 것이지 할인이 아니다
  const cash = calcMovingCost(at({ vat: false, discount: 0 }));
  assert.equal(cash.vatAmount, 0);
  assert.ok(!cash.items.some(i => i.label.includes('부가세')));
});

test('평↔㎡ 왕복 변환은 제자리로 돌아온다', () => {
  // 환산값은 새로 적지 않고 에어컨 용량 계산기가 쓰는 것을 그대로 다시 내보낸다
  assert.equal(SQM_PER_PYEONG, 400 / 121);
  assert.ok(Math.abs(SQM_PER_PYEONG - 3.305785) < 1e-5);

  for (const pyeong of [1, 7.5, 18, 25, 33, 84.5]) {
    assert.ok(Math.abs(sqmToPyeong(pyeongToSqm(pyeong)) - pyeong) < 1e-9, `${pyeong}평`);
  }
  for (const sqm of [19.8, 59, 84, 109.1, 132.2]) {
    assert.ok(Math.abs(pyeongToSqm(sqmToPyeong(sqm)) - sqm) < 1e-9, `${sqm}㎡`);
  }
  // 84㎡는 25.4평이다 (부르는 34평은 공용면적을 더한 공급면적 기준이다)
  assert.ok(Math.abs(sqmToPyeong(84) - 25.4) < 0.05);

  // ㎡로 넣어도 평으로 넣은 것과 같은 금액이 나온다
  const byPyeong = calcMovingCost(at({ pyeong: 25 }));
  const bySqm = calcMovingCost(at({ pyeong: sqmToPyeong(pyeongToSqm(25)) }));
  assert.equal(byPyeong.total, bySqm.total);
});

test('견적서에서 빠지기 쉬운 항목 목록이 비어 있지 않다', () => {
  // 이 목록이 이 페이지를 저장해 두는 이유다 — 비면 페이지의 값이 사라진다
  assert.ok(OFTEN_MISSED.length >= 8, `${OFTEN_MISSED.length}개뿐`);
  for (const { label, why } of OFTEN_MISSED) {
    assert.ok(label.trim().length > 0);
    assert.ok(why.trim().length >= 20, `${label}: 이유가 너무 짧다`);
  }
  // 계산에 칸이 있는 항목은 목록에도 있어야 한다 — 둘이 어긋나면 안 짚힌다
  for (const word of ['사다리차', '에어컨', '폐기물', '보관', '청소', '부가세']) {
    assert.ok(OFTEN_MISSED.some(m => m.label.includes(word)), `${word}가 목록에 없다`);
  }
});
