/**
 * 세뱃돈 — 근거가 없는 계산이라 검사가 대신 지킨다.
 *
 * 금액에 법도 고시도 없으니 "이 값이 맞다"로는 검사할 수가 없다. 대신 이 계산이
 * 스스로 약속한 것을 지키는지 전수로 확인한다 —
 *
 *   · 학년이 올라가면 금액이 줄지 않는다 (모든 관계에서)
 *   · 관계가 가까우면 금액이 줄지 않는다 (모든 나이에서)
 *   · 내놓는 금액은 모두 단위 사다리 위에 있다 — 7,000원이 나오면 안 된다
 *   · 합계는 아이별 금액의 합과 정확히 같다
 *   · 하한은 언제나 상한을 넘지 않는다
 *
 * 축이 넷이고 서로 곱해지므로 예시 몇 개로는 구멍이 남는다. 나이 7 × 관계 5 ×
 * 형제 정책 3 × 받은 금액 5가지를 전수로 돌린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  RELATIONS, SIBLING_POLICIES, STAGES, TOP_RUNG, UNITS,
  calcNewYearMoney, nearestRung, unitAt,
  type ChildAmount, type RelationId, type SiblingPolicy, type StageId,
} from '../lib/new-year-money.ts';

/** 검사에서 쓸 받은 금액들 — 안 넣은 경우와 아주 적은·아주 큰 경우를 함께 돈다 */
const RECEIVED = [0, 5_000, 30_000, 100_000, 500_000];
const POLICIES = SIBLING_POLICIES.map(p => p.id);

/** 아이 하나만 넣었을 때의 결과 */
function one(
  stage: StageId, relation: RelationId,
  policy: SiblingPolicy = 'byAge', receivedPerChild = 0,
): ChildAmount {
  const r = calcNewYearMoney({ children: [{ stage, relation }], policy, receivedPerChild });
  assert.equal(r.children.length, 1);
  return r.children[0];
}

test('단위 사다리는 지폐로 세어 떨어지고 4를 피한다', () => {
  // 오름차순이고 겹치는 값이 없다
  for (let i = 1; i < UNITS.length; i++) assert.ok(UNITS[i] > UNITS[i - 1], `${UNITS[i]}`);
  // 5천원권으로 세어 떨어진다 — 5,000의 배수가 아니면 지폐로 못 맞춘다
  for (const u of UNITS) assert.equal(u % 5_000, 0, `${u}`);
  // 4가 들어가는 금액은 관례로 빼 두었다 (4만·40만)
  for (const u of UNITS) assert.ok(!String(u).includes('4'), `${u}에 4가 있다`);
  assert.equal(TOP_RUNG, UNITS.length - 1);

  // 사다리 밖으로 밀려난 칸은 끝에 붙는다 — 없는 칸을 읽어 undefined가 되면 안 된다
  assert.equal(unitAt(-5), UNITS[0]);
  assert.equal(unitAt(TOP_RUNG + 5), UNITS[TOP_RUNG]);
  for (let i = 0; i <= TOP_RUNG; i++) assert.equal(unitAt(i), UNITS[i]);

  // 받은 금액을 사다리로 읽을 때는 가장 가까운 칸이다
  assert.equal(nearestRung(10_000), 1);
  assert.equal(nearestRung(11_000), 1);
  assert.equal(nearestRung(1), 0);
  assert.equal(nearestRung(9_999_999), TOP_RUNG);
});

test('축은 순서대로 적혀 있고 나이 구간은 한 칸 폭이다', () => {
  // 나이는 위로 갈수록 칸이 줄지 않는다 — 표가 뒤섞이면 단조가 깨진다
  for (let i = 1; i < STAGES.length; i++) {
    assert.ok(STAGES[i].rung >= STAGES[i - 1].rung, `${STAGES[i].id}`);
    assert.ok(STAGES[i].rung <= TOP_RUNG, `${STAGES[i].id}`);
  }
  // 관계는 가까운 순으로 적는다 — 뒤로 갈수록 칸을 더 내린다
  for (let i = 1; i < RELATIONS.length; i++) {
    assert.ok(RELATIONS[i].steps <= RELATIONS[i - 1].steps, `${RELATIONS[i].id}`);
  }
  // 범위 폭은 어느 나이나 사다리 한 칸이다. 이게 깨지면 나이가 오를 때
  // 하한과 상한이 서로 다른 속도로 움직여 범위가 뒤집힐 수 있다
  for (const s of STAGES) {
    const c = one(s.id, 'nephew');
    assert.equal(c.min, unitAt(s.rung), s.id);
    assert.equal(c.max, unitAt(s.rung + 1), s.id);
  }
});

test('학년이 올라가면 금액이 줄지 않는다', () => {
  for (const rel of RELATIONS) {
    for (const policy of POLICIES) {
      for (const received of RECEIVED) {
        // 앞뒤 이웃만이 아니라 모든 쌍을 본다 — 멀리 떨어진 구간에서만 뒤집히는 일이 있다
        for (let i = 0; i < STAGES.length; i++) {
          for (let j = i + 1; j < STAGES.length; j++) {
            const lo = one(STAGES[i].id, rel.id, policy, received);
            const hi = one(STAGES[j].id, rel.id, policy, received);
            const where = `${STAGES[i].id}→${STAGES[j].id} / ${rel.id} / ${policy} / 받은 ${received}`;
            assert.ok(hi.min >= lo.min, `하한이 줄었다: ${where} (${lo.min}→${hi.min})`);
            assert.ok(hi.max >= lo.max, `상한이 줄었다: ${where} (${lo.max}→${hi.max})`);
          }
        }
      }
    }
  }
});

test('관계가 가까우면 금액이 줄지 않는다', () => {
  for (const stage of STAGES) {
    for (const policy of POLICIES) {
      for (const received of RECEIVED) {
        for (let i = 0; i < RELATIONS.length; i++) {
          for (let j = i + 1; j < RELATIONS.length; j++) {
            // i가 j보다 가깝다 — RELATIONS는 가까운 순으로 적혀 있다
            const near = one(stage.id, RELATIONS[i].id, policy, received);
            const far = one(stage.id, RELATIONS[j].id, policy, received);
            const where = `${RELATIONS[i].id}↔${RELATIONS[j].id} / ${stage.id} / ${policy} / 받은 ${received}`;
            assert.ok(near.min >= far.min, `먼 쪽이 더 받는다: ${where} (${far.min}>${near.min})`);
            assert.ok(near.max >= far.max, `먼 쪽이 더 받는다: ${where} (${far.max}>${near.max})`);
          }
        }
      }
    }
  }
});

test('내놓는 금액은 모두 사다리 위에 있고 하한이 상한을 넘지 않는다', () => {
  const set = new Set(UNITS);
  let seen = 0;
  for (const stage of STAGES) {
    for (const rel of RELATIONS) {
      for (const policy of POLICIES) {
        for (const received of RECEIVED) {
          const c = one(stage.id, rel.id, policy, received);
          const where = `${stage.id} / ${rel.id} / ${policy} / 받은 ${received}`;
          // 7,000원 같은 값이 나오면 안 된다
          assert.ok(set.has(c.min), `하한이 사다리 밖이다: ${c.min} (${where})`);
          assert.ok(set.has(c.max), `상한이 사다리 밖이다: ${c.max} (${where})`);
          assert.ok(c.min <= c.max, `하한이 상한보다 크다: ${where}`);
          seen++;
        }
      }
    }
  }
  // 전수로 돌았는지 — 조합 수가 줄면 표가 비었다는 뜻이다
  assert.equal(seen, STAGES.length * RELATIONS.length * POLICIES.length * RECEIVED.length);
  assert.equal(seen, 7 * 5 * 3 * 5);
});

test('까닭에 적힌 칸수를 더하면 실제로 움직인 만큼이다', () => {
  for (const stage of STAGES) {
    for (const rel of RELATIONS) {
      for (const received of RECEIVED) {
        const c = one(stage.id, rel.id, 'byAge', received);
        const moved = c.reasons.reduce((a, r) => a + r.steps, 0);
        const where = `${stage.id} / ${rel.id} / 받은 ${received}`;
        // 나이가 출발점이고, 나머지 축이 더한 칸수만큼 움직인 금액이어야 한다
        assert.equal(c.min, unitAt(stage.rung + moved), `까닭과 금액이 어긋난다: ${where}`);
        assert.equal(c.max, unitAt(stage.rung + moved + 1), `까닭과 금액이 어긋난다: ${where}`);
        // 나이·관계는 언제나 적히고, 받은 금액을 넣었으면 그것도 적힌다
        assert.deepEqual(c.reasons.slice(0, 2).map(r => r.axis), ['나이·학년', '관계']);
        assert.equal(c.reasons.some(r => r.axis === '받은 금액'), received > 0, where);
      }
    }
  }
});

test('합계는 아이별 금액의 합과 정확히 같다', () => {
  const children = [
    { stage: 'preschool' as StageId, relation: 'child' as RelationId, house: '우리' },
    { stage: 'middle' as StageId, relation: 'child' as RelationId, house: '우리' },
    { stage: 'upper' as StageId, relation: 'nephew' as RelationId, house: '큰집' },
    { stage: 'univ' as StageId, relation: 'cousinKid' as RelationId, house: '작은집' },
    { stage: 'high' as StageId, relation: 'neighbor' as RelationId },
  ];
  for (const policy of POLICIES) {
    for (const received of RECEIVED) {
      const r = calcNewYearMoney({ children, policy, receivedPerChild: received });
      assert.equal(r.children.length, children.length);
      assert.equal(r.totalMin, r.children.reduce((a, c) => a + c.min, 0));
      assert.equal(r.totalMax, r.children.reduce((a, c) => a + c.max, 0));
      assert.ok(r.totalMin <= r.totalMax);
      // 합계도 지폐로 세어 떨어져야 봉투에 넣을 수 있다
      assert.equal(r.totalMin % 5_000, 0);
      assert.equal(r.totalMax % 5_000, 0);
    }
  }

  // 아이를 하나 더하면 합계는 그 아이 금액만큼만 는다
  const before = calcNewYearMoney({ children });
  const after = calcNewYearMoney({ children: [...children, { stage: 'lower', relation: 'friendKid' }] });
  const added = after.children[after.children.length - 1];
  assert.equal(after.totalMin - before.totalMin, added.min);
  assert.equal(after.totalMax - before.totalMax, added.max);
});

test('아이가 0명이면 합계 0', () => {
  for (const policy of POLICIES) {
    for (const received of RECEIVED) {
      const r = calcNewYearMoney({ children: [], policy, receivedPerChild: received });
      assert.deepEqual(r.children, []);
      assert.equal(r.totalMin, 0);
      assert.equal(r.totalMax, 0);
      // 견줄 아이가 없으면 받은 금액도 기준이 될 수 없다
      assert.equal(r.received, null);
    }
  }
});

test('받은 금액을 넣으면 기준이 움직인다', () => {
  const kid = { stage: 'lower' as StageId, relation: 'nephew' as RelationId };
  const plain = one(kid.stage, kid.relation);
  assert.equal(plain.min, 10_000);
  assert.equal(plain.max, 20_000);

  // 우리 기준(1만~2만)보다 훨씬 큰 10만을 받았으면 한 칸 올린다
  const rich = one(kid.stage, kid.relation, 'byAge', 100_000);
  assert.ok(rich.min > plain.min, `안 올랐다: ${plain.min}→${rich.min}`);
  assert.equal(rich.min, 20_000);
  assert.equal(rich.max, 30_000);

  // 대학생 조카(5만~10만)인데 5천만 받았으면 한 칸 내린다
  const flatUniv = one('univ', 'nephew');
  const poor = one('univ', 'nephew', 'byAge', 5_000);
  assert.ok(poor.min < flatUniv.min, `안 내렸다: ${flatUniv.min}→${poor.min}`);
  assert.equal(poor.min, 30_000);

  // 한 칸 차이는 움직이지 않는다 — 조금 바꿀 때마다 출렁이면 쓸 수 없다
  const middle = calcNewYearMoney({ children: [{ stage: 'middle', relation: 'nephew' }], receivedPerChild: 50_000 });
  assert.equal(middle.received?.gap, 1);
  assert.equal(middle.received?.steps, 0);
  assert.equal(middle.children[0].min, one('middle', 'nephew').min);

  // 받은 금액은 아이 한 명당으로 견준다 — 아이가 늘어도 기준은 그대로다
  const many = calcNewYearMoney({
    children: [{ stage: 'lower', relation: 'nephew' }, { stage: 'lower', relation: 'nephew' }],
    receivedPerChild: 100_000,
  });
  assert.equal(many.received?.steps, 1);
  for (const c of many.children) assert.equal(c.min, rich.min);

  // 안 넣으면 셈 자체가 없다
  assert.equal(calcNewYearMoney({ children: [kid] }).received, null);
  assert.equal(calcNewYearMoney({ children: [kid], receivedPerChild: 0 }).received, null);
});

test('형제 균형은 아래 아이를 올려서 맞춘다', () => {
  // 나이 차가 큰 형제 — 미취학(5천~1만)과 중학생(3만~5만)
  const children = [
    { stage: 'preschool' as StageId, relation: 'nephew' as RelationId, house: '큰집' },
    { stage: 'middle' as StageId, relation: 'nephew' as RelationId, house: '큰집' },
  ];
  const byAge = calcNewYearMoney({ children, policy: 'byAge' });
  const oneStep = calcNewYearMoney({ children, policy: 'oneStep' });
  const same = calcNewYearMoney({ children, policy: 'same' });

  assert.deepEqual(byAge.children.map(c => c.min), [5_000, 30_000]);
  // 한 칸 차이까지 — 맏이 3만의 한 칸 아래인 2만까지 올린다
  assert.deepEqual(oneStep.children.map(c => c.min), [20_000, 30_000]);
  assert.deepEqual(same.children.map(c => c.min), [30_000, 30_000]);

  // 맏이 금액은 어느 정책에서도 깎이지 않는다
  for (const r of [oneStep, same]) assert.equal(r.children[1].min, byAge.children[1].min);
  // 그래서 총액은 맞출수록 늘어난다
  assert.ok(byAge.totalMin <= oneStep.totalMin);
  assert.ok(oneStep.totalMin <= same.totalMin);

  // 같은 집 아이들 사이 차이가 정책대로 좁혀졌는지 — 사다리 칸으로 센다
  const rungOf = (won: number) => UNITS.indexOf(won);
  assert.ok(rungOf(oneStep.children[1].min) - rungOf(oneStep.children[0].min) <= 1);
  assert.equal(same.children[0].min, same.children[1].min);

  // 집이 다르면 서로 안 묶인다 — 남의 집 맏이에 맞춰 올라가면 안 된다
  const split = calcNewYearMoney({
    children: [
      { stage: 'preschool', relation: 'nephew', house: '큰집' },
      { stage: 'middle', relation: 'nephew', house: '작은집' },
    ],
    policy: 'same',
  });
  assert.deepEqual(split.children.map(c => c.min), [5_000, 30_000]);

  // 집 표시가 없으면 혼자다
  const alone = calcNewYearMoney({
    children: [{ stage: 'preschool', relation: 'nephew' }, { stage: 'middle', relation: 'nephew' }],
    policy: 'same',
  });
  assert.deepEqual(alone.children.map(c => c.min), [5_000, 30_000]);

  // 세 아이 집에서도 맏이 기준이다
  const three = calcNewYearMoney({
    children: [
      { stage: 'preschool', relation: 'nephew', house: 'ㄱ' },
      { stage: 'upper', relation: 'nephew', house: 'ㄱ' },
      { stage: 'high', relation: 'nephew', house: 'ㄱ' },
    ],
    policy: 'same',
  });
  assert.deepEqual(three.children.map(c => c.min), [50_000, 50_000, 50_000]);
  assert.equal(three.totalMin, 150_000);
});
