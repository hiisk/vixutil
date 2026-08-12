/**
 * 부의금 — 정답 금액이 없는 계산기를 어떻게 검사하나.
 *
 * 금액 하나를 못 박을 수 없으니 **성질**을 검사한다.
 *   · 축을 가까운 쪽으로 옮기면 권하는 금액이 줄지 않는다(전수)
 *   · 내놓는 금액은 모두 관습 단위이고 4가 들어간 금액이 없다
 *   · 하한 ≤ 흔한 값 ≤ 상한 (전수)
 *   · 식대는 사람 수에 정확히 비례한다
 *   · 받은 부조는 하한을 끌어올린다
 * 그리고 손으로 셈한 몇 자리를 못 박아, 배율을 건드리면 바로 깨지게 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AGES, CLOSENESS, CUSTOMARY_UNITS, MEAL_PER_PERSON, RELATIONS,
  isCustomaryUnit, snapNearest, snapUp, suggest,
  type AgeKey, type Answers, type ClosenessKey, type RelationKey,
} from '../lib/condolence-money.ts';

const RELATION_KEYS = RELATIONS.map(r => r.key);
const CLOSENESS_KEYS = CLOSENESS.map(c => c.key);
const AGE_KEYS = AGES.map(a => a.key);

/** 모든 조합 — 6 × 3 × 2 × 4 × 3 × 6 = 2,592가지 */
function* everyAnswer(): Generator<Answers> {
  for (const relation of RELATION_KEYS) {
    for (const closeness of CLOSENESS_KEYS) {
      for (const attend of [false, true]) {
        for (const companions of [0, 1, 2, 3]) {
          for (const age of AGE_KEYS) {
            for (const received of [0, 3, 5, 10, 20, 50]) {
              yield { relation, closeness, attend, companions, age, received };
            }
          }
        }
      }
    }
  }
}

const base: Answers = {
  relation: 'friend', closeness: 'sometimes', attend: true,
  companions: 0, age: 'mid', received: 0,
};
const at = (over: Partial<Answers>) => suggest({ ...base, ...over });

test('관습 단위 규칙 — 4가 들어가면 안 되고, 홀수 또는 10의 배수다', () => {
  // 사다리에 실린 값은 모두 규칙을 지켜야 한다. 40만원을 몰래 끼우면 여기서 걸린다
  for (const u of CUSTOMARY_UNITS) assert.ok(isCustomaryUnit(u), `${u}만원이 규칙을 어긴다`);

  // 4가 들어간 금액은 10의 배수여도 안 된다
  for (const bad of [4, 14, 24, 40, 44, 140, 400]) {
    assert.equal(isCustomaryUnit(bad), false, `${bad}만원은 걸러야 한다`);
  }
  // 짝수이면서 10의 배수도 아닌 값은 관습 단위가 아니다
  for (const bad of [2, 6, 8, 12, 16, 22]) assert.equal(isCustomaryUnit(bad), false, `${bad}`);
  // 홀수와 10의 배수는 통과한다
  for (const ok of [3, 5, 7, 15, 25, 10, 20, 30, 100]) assert.ok(isCustomaryUnit(ok), `${ok}`);
  // 0·음수·소수는 금액이 아니다
  for (const bad of [0, -5, 3.5]) assert.equal(isCustomaryUnit(bad), false, `${bad}`);

  // 사다리에 4가 들어간 금액이 하나도 없다 — 규칙과 별개로 글자로도 확인한다
  assert.equal(CUSTOMARY_UNITS.filter(u => String(u).includes('4')).length, 0);
  // 오름차순이어야 맞추기(snap)가 성립한다
  for (let i = 1; i < CUSTOMARY_UNITS.length; i++) {
    assert.ok(CUSTOMARY_UNITS[i] > CUSTOMARY_UNITS[i - 1], `${i}번째가 거꾸로다`);
  }
});

test('맞추기 — 가장 가까운 단위로, 딱 가운데면 올린다', () => {
  assert.equal(snapNearest(5), 5);
  assert.equal(snapNearest(5.4), 5);
  assert.equal(snapNearest(6.4), 7);
  assert.equal(snapNearest(4), 5);      // 3과 5의 가운데 — 올려 맞춘다
  assert.equal(snapNearest(8.5), 10);   // 7과 10의 가운데 — 올려 맞춘다
  assert.equal(snapNearest(0.5), 3);    // 사다리 밑은 바닥값
  assert.equal(snapNearest(9999), 500); // 사다리 위는 천장값

  // 올려 맞추기는 받은 부조를 하한으로 쓸 때 쓴다 — 모자라면 안 된다
  assert.equal(snapUp(10), 10);
  assert.equal(snapUp(10.1), 15);
  assert.equal(snapUp(12), 15);
  assert.equal(snapUp(1), 3);

  // 맞추기가 단조여야 아래의 단조 검사들이 뜻을 가진다
  let prevN = 0, prevU = 0;
  for (let man = 0; man <= 600; man += 0.25) {
    assert.ok(snapNearest(man) >= prevN, `snapNearest가 ${man}에서 거꾸로 갔다`);
    assert.ok(snapUp(man) >= prevU, `snapUp이 ${man}에서 거꾸로 갔다`);
    prevN = snapNearest(man);
    prevU = snapUp(man);
  }
});

test('전수 — 범위가 뒤집히지 않고, 내놓는 값은 모두 관습 단위다', () => {
  let count = 0;
  for (const a of everyAnswer()) {
    count++;
    const s = suggest(a);
    const where = JSON.stringify(a);

    assert.ok(s.low <= s.high, `하한이 상한보다 크다 ${where}`);
    assert.ok(s.low <= s.common && s.common <= s.high, `흔한 값이 범위 밖이다 ${where}`);

    for (const v of [s.low, s.high, s.common, ...s.picks]) {
      assert.ok(CUSTOMARY_UNITS.includes(v), `${v}만원은 사다리에 없다 ${where}`);
      assert.ok(isCustomaryUnit(v), `${v}만원이 관습 단위가 아니다 ${where}`);
      assert.ok(!String(v).includes('4'), `${v}만원에 4가 들어 있다 ${where}`);
    }

    // 고를 값이 하나도 없으면 계산기가 아니다. 하한과 상한은 반드시 들어 있다
    assert.ok(s.picks.length >= 1, `고를 값이 없다 ${where}`);
    assert.equal(s.picks[0], s.low, where);
    assert.equal(s.picks[s.picks.length - 1], s.high, where);
    assert.deepEqual(s.picks, [...s.picks].sort((x, y) => x - y), where);

    // 까닭 네 줄을 더하면 중심값이다 — 화면의 설명과 큰 숫자가 어긋나면 안 된다
    assert.equal(s.reasons.length, 4, where);
    const sum = s.reasons.reduce((t, r) => t + r.amount, 0);
    assert.ok(Math.abs(sum - s.center) < 1e-9, `까닭의 합 ${sum} ≠ 중심값 ${s.center} ${where}`);

    // 아무것도 0이 아니다 — 최소 조건에서도 부조는 3만원부터다
    assert.ok(s.center > 0, where);
    assert.ok(s.low >= CUSTOMARY_UNITS[0], where);
  }
  assert.equal(count, 2592);
});

test('전수 — 축을 가까운 쪽으로 옮기면 금액이 줄지 않는다', () => {
  const bump = <K extends string>(keys: readonly K[], k: K): K | null => {
    const i = keys.indexOf(k);
    return i < keys.length - 1 ? keys[i + 1] : null;
  };
  const notLess = (a: Answers, b: Answers, axis: string) => {
    const x = suggest(a), y = suggest(b);
    const where = `${axis} ${JSON.stringify(a)}`;
    assert.ok(y.center >= x.center, `중심값이 줄었다 ${where}`);
    assert.ok(y.low >= x.low, `하한이 줄었다 ${where}`);
    assert.ok(y.high >= x.high, `상한이 줄었다 ${where}`);
    assert.ok(y.common >= x.common, `흔한 값이 줄었다 ${where}`);
  };

  for (const a of everyAnswer()) {
    // ① 관계를 한 칸 가깝게
    const r = bump(RELATION_KEYS as readonly RelationKey[], a.relation);
    if (r) notLess(a, { ...a, relation: r }, '관계');
    // ② 왕래를 한 칸 깊게
    const c = bump(CLOSENESS_KEYS as readonly ClosenessKey[], a.closeness);
    if (c) notLess(a, { ...a, closeness: c }, '왕래');
    // ⑤ 나이대를 한 칸 위로
    const g = bump(AGE_KEYS as readonly AgeKey[], a.age);
    if (g) notLess(a, { ...a, age: g }, '나이대');
    // ③ 부의금만 보내는 쪽에서 직접 조문하는 쪽으로
    if (!a.attend) notLess(a, { ...a, attend: true }, '조문');
    // ④ 함께 가는 사람이 한 명 늘 때
    notLess(a, { ...a, companions: a.companions + 1 }, '동반');
    // ⑥ 받은 부조가 커질 때
    notLess(a, { ...a, received: a.received + 5 }, '받은 부조');
  }
});

test('축이 실제로 금액을 움직인다 — 손으로 셈한 자리들', () => {
  // 관계만 바꿨을 때(가끔 연락·30대·혼자 조문): 5 → 5 → 7 → 10 → 15 → 20만원
  const byRelation = RELATION_KEYS.map(relation => at({ relation }).common);
  assert.deepEqual(byRelation, [5, 5, 7, 10, 15, 20]);
  // 양 끝은 반드시 달라야 한다 — 관계 축이 죽어 있으면 여기서 걸린다
  assert.ok(byRelation[byRelation.length - 1] > byRelation[0]);

  // 왕래만 바꿨을 때(친척·40대 이상·혼자 조문): 15 → 20 → 30만원
  const deep = { relation: 'relative' as const, age: 'senior' as const };
  assert.deepEqual(
    CLOSENESS_KEYS.map(closeness => at({ ...deep, closeness }).common),
    [15, 20, 30],
  );

  // 나이대만 바꿨을 때(친척·자주 만나는 사이·혼자 조문): 20 → 20 → 30만원
  const often = { relation: 'relative' as const, closeness: 'often' as const };
  const byAge = AGE_KEYS.map(age => at({ ...often, age }).common);
  assert.deepEqual(byAge, [20, 20, 30]);
  assert.ok(byAge[2] > byAge[0]);

  // 조문 여부(친구·동창·가끔·30대): 부의금만 7만원, 직접 가면 10만원
  assert.equal(at({ attend: false }).common, 7);
  assert.equal(at({ attend: true }).common, 10);

  // 친구·동창 기준액 7만원 + 식대 1.5만원 = 8.5만원 → 7과 10의 가운데라 올려 10만원
  const friend = at({});
  assert.equal(friend.center, 8.5);
  assert.deepEqual(friend.picks, [7, 10]);
  assert.equal(friend.low, 7);
  assert.equal(friend.high, 10);
});

test('조문을 가면 식대 몫만큼 정확히 늘어난다', () => {
  for (const relation of RELATION_KEYS) {
    const away = at({ relation, attend: false, companions: 0 });
    const there = at({ relation, attend: true, companions: 0 });
    assert.equal(away.meal, 0, `${relation}: 안 가면 식대가 없다`);
    assert.equal(there.meal, MEAL_PER_PERSON, `${relation}: 혼자 가면 한 사람 몫`);
    assert.ok(Math.abs(there.center - away.center - MEAL_PER_PERSON) < 1e-9, relation);
  }

  // 함께 가는 사람이 늘면 식대가 정확히 한 사람 몫씩 붙는다
  for (let n = 0; n <= 4; n++) {
    const s = at({ attend: true, companions: n });
    assert.equal(s.meal, (1 + n) * MEAL_PER_PERSON, `${n}명 동반`);
    const prev = at({ attend: true, companions: n - 1 });
    if (n > 0) assert.ok(Math.abs(s.center - prev.center - MEAL_PER_PERSON) < 1e-9, `${n}명`);
  }

  // 부의금만 보내면 동반 인원은 셈에 들어가지 않는다 — 갈 사람이 없으니 식대도 없다
  const alone = at({ attend: false, companions: 0 });
  for (let n = 1; n <= 3; n++) {
    const s = at({ attend: false, companions: n });
    assert.equal(s.meal, 0, `${n}명`);
    assert.equal(s.center, alone.center, `${n}명`);
    assert.equal(s.common, alone.common, `${n}명`);
  }

  // 배우자와 함께 친척 상에 가면 식대 3만원이 얹힌다
  const couple = at({ relation: 'relative', companions: 1 });
  assert.equal(couple.meal, 3);
  assert.equal(couple.center, 21);
});

test('받은 부조가 하한을 끌어올린다', () => {
  // 거래처·이름만 아는 사이·사회 초년생·부의금만 → 원래는 3만원 하나뿐이다
  const bare: Partial<Answers> = {
    relation: 'client', closeness: 'name', age: 'young', attend: false,
  };
  const none = at(bare);
  assert.equal(none.low, 3);
  assert.equal(none.high, 3);
  assert.equal(none.common, 3);
  assert.equal(none.receivedFloor, null);

  // 전에 10만원을 받았으면 10만원이 하한이 된다 — 받은 것보다 적게 낼 수 없다
  const paid = at({ ...bare, received: 10 });
  assert.equal(paid.receivedFloor, 10);
  assert.equal(paid.low, 10);
  assert.ok(paid.high >= 10);
  assert.equal(paid.common, 10);

  // 관습 단위가 아닌 금액을 받았으면 올려 맞춘다 — 12만원을 받고 10만원을 내지 않는다
  const odd = at({ ...bare, received: 12 });
  assert.equal(odd.receivedFloor, 15);
  assert.equal(odd.low, 15);

  // 셈으로 나온 범위가 이미 받은 금액보다 크면 하한을 내리지 않는다
  const rich = at({ relation: 'relative', closeness: 'often', age: 'senior', received: 3 });
  assert.equal(rich.receivedFloor, 3);
  assert.ok(rich.low > 3, '받은 금액이 작다고 하한이 내려가면 안 된다');

  // 받은 금액이 0이거나 음수면 하한을 건드리지 않는다
  assert.equal(at({ received: 0 }).receivedFloor, null);
  assert.equal(at({ received: -5 }).receivedFloor, null);
  assert.equal(at({ received: -5 }).low, at({ received: 0 }).low);
});

test('모든 입력을 최소로 둬도 0이 아니고 상식적인 값이다', () => {
  const least = suggest({
    relation: RELATION_KEYS[0], closeness: CLOSENESS_KEYS[0], attend: false,
    companions: 0, age: AGE_KEYS[0], received: 0,
  });
  assert.equal(least.low, 3);
  assert.equal(least.high, 3);
  assert.equal(least.common, 3);
  assert.deepEqual(least.picks, [3]);
  assert.ok(least.center > 0);

  // 반대쪽 끝 — 친척·자주 만나는 사이·40대·배우자와 자녀 둘까지 함께 조문
  const most = suggest({
    relation: 'relative', closeness: 'often', attend: true,
    companions: 3, age: 'senior', received: 0,
  });
  assert.equal(most.center, 35.25);   // 18 × 1.3 × 1.25 + 1.5 × 4
  assert.equal(most.low, 30);
  assert.equal(most.high, 50);
  assert.deepEqual(most.picks, [30, 50]);
  // 어느 조합에서도 셈만으로 100만원을 넘기지 않는다 — 그 위는 받은 부조로만 닿는다
  for (const a of everyAnswer()) {
    if (a.received === 0) assert.ok(suggest(a).high <= 50, JSON.stringify(a));
  }
});
