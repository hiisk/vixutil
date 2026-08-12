/**
 * 에어컨 용량 — 계수는 어림이므로 값이 아니라 성질을 못 박는다.
 *
 * 계수 하나를 다르게 잡으면 답이 달라지는 것이 이 계산의 성질이고, 그래서
 * "3.5kW가 나와야 한다"는 식으로 박아 두면 계수를 손볼 때마다 검사가 깨진다.
 * 대신 깨지면 안 되는 것을 본다 — 단위 환산은 왕복해서 제자리로 돌아오고,
 * 추천 등급은 절대로 필요 능력보다 작지 않고, 부하를 키우는 조건을 켜면
 * 필요 능력이 커진다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BASE_PEOPLE, BTU_PER_KW, GRADES, LABEL_W_PER_SQM, PERSON_W, SQM_PER_PYEONG, USES, WALL_MAX_KW,
  btuToKw, kwToBtu, loadOf, pickGrade, pyeongLabel, pyeongToSqm, requiredCapacity,
  runningCost, sqmToPyeong, type Room, type RoomUse,
} from '../lib/aircon-capacity.ts';
import { calcElectricity, extraCost, tierOf } from '../lib/electricity-tariff.ts';

const ALL_USES = USES.map(u => u.key);

test('kW와 BTU/h는 왕복하면 제자리로 돌아온다', () => {
  assert.ok(Math.abs(BTU_PER_KW - 3412.14) < 0.01, '환산계수가 어긋났다');
  for (const kw of [0, 2, 2.6, 3.6, 5.6, 7, 13, 0.123]) {
    assert.ok(Math.abs(btuToKw(kwToBtu(kw)) - kw) < 1e-9, `${kw}kW`);
  }
  for (const btu of [5000, 9000, 12000, 18000, 24000]) {
    assert.ok(Math.abs(kwToBtu(btuToKw(btu)) - btu) < 1e-6, `${btu}BTU/h`);
  }
  // 흔히 쓰는 값 — 1냉동톤 12,000BTU/h는 약 3.5kW다
  assert.ok(Math.abs(btuToKw(12000) - 3.517) < 0.001);
});

test('평과 ㎡도 왕복하면 제자리로 돌아온다', () => {
  assert.ok(Math.abs(SQM_PER_PYEONG - 3.305785) < 1e-6, '평 환산이 어긋났다');
  for (const pyeong of [1, 6, 16, 25.7, 34]) {
    assert.ok(Math.abs(sqmToPyeong(pyeongToSqm(pyeong)) - pyeong) < 1e-9, `${pyeong}평`);
  }
  for (const sqm of [19.8, 59.5, 84, 100]) {
    assert.ok(Math.abs(pyeongToSqm(sqmToPyeong(sqm)) - sqm) < 1e-9, `${sqm}㎡`);
  }
  // 84㎡ 아파트는 약 25.4평이다
  assert.ok(Math.abs(sqmToPyeong(84) - 25.4) < 0.05);
});

test('평으로 넣든 ㎡로 넣든 같은 답이다', () => {
  for (const pyeong of [6, 10, 18, 32]) {
    const byPyeong = requiredCapacity({ area: pyeong, unit: 'pyeong', use: 'living' });
    const bySqm = requiredCapacity({ area: pyeongToSqm(pyeong), unit: 'sqm', use: 'living' });
    assert.ok(Math.abs(byPyeong.requiredW - bySqm.requiredW) < 1e-6, `${pyeong}평`);
    assert.ok(Math.abs(byPyeong.pyeong - pyeong) < 1e-9);
  }
});

test('뼈대는 면적 × 용도별 계수다', () => {
  for (const use of ALL_USES) {
    const need = requiredCapacity({ area: 30, unit: 'sqm', use });
    assert.ok(Math.abs(need.baseW - 30 * loadOf(use)) < 1e-9, use);
    // 보정을 아무것도 안 켜면 보정계수는 1이고 기본 부하가 그대로 필요 능력이다
    assert.equal(need.factor, 1);
    assert.equal(need.factors.length, 0);
    assert.equal(need.peopleW, 0);
    assert.ok(Math.abs(need.requiredW - need.baseW) < 1e-9, use);
    assert.ok(Math.abs(need.requiredKw * 1000 - need.requiredW) < 1e-9);
    assert.ok(Math.abs(need.requiredBtu - kwToBtu(need.requiredKw)) < 1e-6);
  }
  // 침실이 가장 작고 상가가 가장 크다 — 순서가 뒤집히면 표가 잘못됐다
  const at = (use: RoomUse) => requiredCapacity({ area: 30, unit: 'sqm', use }).requiredW;
  assert.ok(at('bedroom') < at('living'));
  assert.ok(at('living') < at('office'));
  assert.ok(at('office') < at('kitchen'));
  assert.ok(at('kitchen') < at('shop'));
});

test('부하를 키우는 조건을 켜면 필요 능력이 커진다', () => {
  const room: Room = { area: 20, unit: 'sqm', use: 'bedroom' };
  const plain = requiredCapacity(room).requiredW;

  const top = requiredCapacity({ ...room, topFloor: true }).requiredW;
  assert.ok(top > plain, '최상층 보정이 먹지 않았다');

  const west = requiredCapacity({ ...room, westFacing: true }).requiredW;
  assert.ok(west > plain, '서향 보정이 먹지 않았다');

  // 둘을 같이 켜면 각각보다 더 크다 — 보정은 곱으로 쌓인다
  const both = requiredCapacity({ ...room, topFloor: true, westFacing: true }).requiredW;
  assert.ok(both > top && both > west);
  assert.ok(Math.abs(both - plain * (top / plain) * (west / plain)) < 1e-6);

  // 통창은 늘리고 작은 창은 줄인다
  assert.ok(requiredCapacity({ ...room, windowRatio: 0.4 }).requiredW > plain);
  assert.ok(requiredCapacity({ ...room, windowRatio: 0.05 }).requiredW < plain);

  // 천장이 높으면 식힐 공기가 늘어난다
  assert.ok(requiredCapacity({ ...room, ceiling: 3.5 }).requiredW > plain);
  assert.ok(Math.abs(requiredCapacity({ ...room, ceiling: 2.3 }).requiredW - plain) < 1e-9);

  // 사람은 덧셈으로 붙는다 — 기준 인원까지는 더 붙지 않는다
  assert.ok(Math.abs(requiredCapacity({ ...room, people: BASE_PEOPLE }).requiredW - plain) < 1e-9);
  assert.ok(Math.abs(requiredCapacity({ ...room, people: 1 }).requiredW - plain) < 1e-9);
  const five = requiredCapacity({ ...room, people: BASE_PEOPLE + 3 });
  assert.equal(five.peopleW, 3 * PERSON_W);
  assert.ok(Math.abs(five.requiredW - (plain + 3 * PERSON_W)) < 1e-9);
});

test('등급 계단은 오름차순이다', () => {
  for (let i = 1; i < GRADES.length; i++) {
    assert.ok(GRADES[i] > GRADES[i - 1], `${GRADES[i - 1]} 다음이 ${GRADES[i]}다`);
  }
  assert.ok(GRADES[0] > 0);
});

test('추천 등급은 언제나 필요 능력보다 크거나 같다', () => {
  for (const use of ALL_USES) {
    for (const pyeong of [3, 6, 8, 10, 12, 16, 20, 25, 32, 40, 60, 100, 200]) {
      for (const topFloor of [false, true]) {
        const need = requiredCapacity({ area: pyeong, unit: 'pyeong', use, topFloor, people: 4 });
        const pick = pickGrade(need.requiredW);
        assert.ok(
          pick.totalKw * 1000 >= need.requiredW,
          `${pyeong}평 ${use}: ${pick.totalKw}kW가 ${Math.round(need.requiredW)}W를 못 덮는다`,
        );
        // 고른 것은 목록에 있는 등급이어야 한다 — 없는 용량을 지어내지 않는다
        assert.ok(GRADES.includes(pick.perUnit), `${pick.perUnit}kW는 목록에 없다`);
        assert.ok(pick.units >= 1 && Number.isInteger(pick.units));
        assert.ok(Math.abs(pick.totalKw - pick.perUnit * pick.units) < 1e-9);
        assert.ok(pick.margin >= 0, '여유율이 음수다');
      }
    }
  }
});

test('필요 능력이 커지면 추천 능력도 줄지 않는다', () => {
  let last = 0;
  for (let w = 0; w <= 60_000; w += 50) {
    const pick = pickGrade(w);
    assert.ok(pick.totalKw >= last, `${w}W에서 추천이 ${last}kW에서 ${pick.totalKw}kW로 줄었다`);
    assert.ok(pick.totalKw * 1000 >= w, `${w}W를 못 덮는다`);
    last = pick.totalKw;
  }
  // 한 칸 위 등급을 필요 능력으로 넣으면 그 등급이 그대로 나온다
  for (const g of GRADES) {
    assert.equal(pickGrade(g * 1000).perUnit, g);
  }
});

test('계단 맨 위를 넘으면 여러 대로 나눈다', () => {
  const top = GRADES[GRADES.length - 1];

  // 맨 위 등급까지는 한 대로 덮인다
  const one = pickGrade(top * 1000);
  assert.equal(one.grade, top);
  assert.equal(one.units, 1);

  // 그 위는 grade가 null이고 대수가 둘 이상이다 — 없는 등급을 지어내지 않는다
  for (const kw of [top + 0.1, top * 1.5, top * 2, top * 2.4, top * 5]) {
    const many = pickGrade(kw * 1000);
    assert.equal(many.grade, null, `${kw}kW에서 없는 등급을 냈다`);
    assert.ok(many.units >= 2, `${kw}kW인데 한 대로 답했다`);
    assert.ok(GRADES.includes(many.perUnit));
    assert.ok(many.totalKw >= kw, `${kw}kW를 ${many.totalKw}kW로 덮으려 한다`);
  }

  // 넓은 상가 300㎡는 한 대로 안 된다
  const shop = requiredCapacity({ area: 300, unit: 'sqm', use: 'shop' });
  const pick = pickGrade(shop.requiredW);
  assert.equal(pick.grade, null);
  assert.ok(pick.units >= 4);
});

test('조건이 나쁘지 않은 거실은 제조사 표기와 같은 자리에 있다', () => {
  /*
   * 거실 계수를 제조사의 평형 표기와 같은 값에 두었으므로, 보정을 켜지 않은
   * 거실 16평에는 16평형이 나와야 한다. 어느 한쪽만 손대면 여기서 갈린다.
   * (표기가 반올림이라 모든 등급에서 딱 맞지는 않는다 — 계단이 맞는 자리를 본다.)
   */
  assert.equal(loadOf('living'), LABEL_W_PER_SQM);
  for (const pyeong of [16, 20]) {
    const need = requiredCapacity({ area: pyeong, unit: 'pyeong', use: 'living' });
    const pick = pickGrade(need.requiredW);
    assert.equal(pick.label, `${pyeong}평형`, `거실 ${pyeong}평에 ${pick.label}이 나왔다`);
  }
  // 같은 면적이라도 최상층 서향이면 한 등급 위로 올라간다
  const plain = pickGrade(requiredCapacity({ area: 16, unit: 'pyeong', use: 'living' }).requiredW);
  const harsh = pickGrade(requiredCapacity({
    area: 16, unit: 'pyeong', use: 'living', topFloor: true, westFacing: true,
  }).requiredW);
  assert.ok(harsh.totalKw > plain.totalKw, '최상층 서향인데 같은 등급이 나왔다');
});

test('평형 표기와 벽걸이·스탠드는 능력을 따라간다', () => {
  // 제조사 표기와 맞는지 — 2.0kW가 6평형, 5.6kW가 16평형, 7.0kW가 20평형이다
  assert.equal(pyeongLabel(2.0), 6);
  assert.equal(pyeongLabel(5.6), 16);
  assert.equal(pyeongLabel(7.0), 20);
  // 평형 표기는 능력을 따라 줄지 않는다
  for (let i = 1; i < GRADES.length; i++) {
    assert.ok(pyeongLabel(GRADES[i]) >= pyeongLabel(GRADES[i - 1]));
  }
  // 작은 것은 벽걸이, 큰 것은 스탠드
  assert.equal(pickGrade(1_500).form, '벽걸이');
  assert.equal(pickGrade(WALL_MAX_KW * 1000).form, '벽걸이');
  assert.equal(pickGrade(WALL_MAX_KW * 1000 + 1).form, '스탠드');
  for (const g of GRADES) {
    assert.equal(pickGrade(g * 1000).form, g <= WALL_MAX_KW ? '벽걸이' : '스탠드');
  }
});

test('전기요금은 누진 요금표 한 벌에서 나온다', () => {
  const input = { kw: 5.6, cop: 4.2, hoursPerDay: 8, days: 30, baseKwh: 300 };
  const run = runningCost(input);

  // 소비전력은 냉방능력 ÷ 효율이다
  assert.ok(Math.abs(run.inputKw - 5.6 / 4.2) < 1e-9);
  assert.ok(Math.abs(run.kwh - (5.6 / 4.2) * 8 * 30) < 1e-9);

  // 요금은 lib/electricity-tariff.ts가 내는 값과 한 글자도 다르지 않아야 한다
  assert.equal(run.extra, extraCost(300, run.kwh));
  assert.equal(run.beforeTotal, calcElectricity(300).total);
  assert.equal(run.afterTotal, calcElectricity(300 + run.kwh).total);
  assert.ok(Math.abs(run.extra - (run.afterTotal - run.beforeTotal)) < 1e-6);
  assert.equal(run.tierBefore, tierOf(300) + 1);
  assert.equal(run.tierAfter, tierOf(300 + run.kwh) + 1);

  // 효율이 좋으면 요금이 적게 나온다
  assert.ok(runningCost({ ...input, cop: 6 }).extra < run.extra);
  // 같은 용량이라도 원래 많이 쓰던 집이 더 많이 낸다 — 누진이다
  assert.ok(runningCost({ ...input, baseKwh: 450 }).extra > run.extra);
  assert.ok(run.tierAfter > run.tierBefore, '300kWh에 에어컨을 얹었는데 구간이 그대로다');
  // 효율을 0으로 넣어도 0으로 나누지 않는다
  assert.equal(runningCost({ ...input, cop: 0 }).kwh, 0);
});
