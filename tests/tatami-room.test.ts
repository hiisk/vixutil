/**
 * 다다미 방 넓이 — 곱셈보다 성질을 본다.
 *
 * 계산 자체는 두 변을 곱하고 장수를 곱하는 것뿐이다. 그래서 검사는 값이
 * 아니라 규격이 갖춰야 할 성질에 선다 — 다섯 규격이 모두 정확히 2:1인지,
 * 같은 장수에서 벌어지는 폭의 비율이 장수와 무관하게 일정한지, 그리고
 * 널리 인용되는 자리(6첩에서 2.27㎡ 차이)가 그대로 나오는지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, KINDS, MATS, SQFT_PER_SQM, SQM_PER_PYEONG,
  cellOf, kindOf, slugOf,
} from '../lib/tatami/list.ts';
import { atKind, matArea, matsFor, tatamiFacts, toPyeong, toSqft } from '../lib/tatami/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return tatamiFacts(c);
};

test('칸은 규격 5가지 × 장수 20가지', () => {
  assert.equal(KINDS.length, 5);
  assert.equal(MATS.length, 20);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < MATS.length; i++) assert.ok(MATS[i] > MATS[i - 1]);
  // 다실의 4.5첩이 들어 있다
  assert.ok(MATS.includes(4.5));
  assert.equal(cellOf('kyoma-11'), undefined);
  assert.equal(cellOf('osaka-6'), undefined);
});

test('다섯 규격이 모두 정확히 2:1이다', () => {
  for (const k of KINDS) {
    assert.equal(k.long, k.short * 2, k.key);
  }
  // 넓은 것부터 좁은 것 차례로 적혀 있다
  for (let i = 1; i < KINDS.length; i++) {
    assert.ok(KINDS[i].short < KINDS[i - 1].short, KINDS[i].key);
  }
  // 한 장의 넓이는 짧은 변의 제곱의 두 배다
  for (const k of KINDS) {
    assert.ok(Math.abs(matArea(k.short, k.long) - (2 * k.short ** 2) / 1e6) < 1e-12, k.key);
  }
  assert.equal(kindOf('kyoma')?.short, 955);
  assert.equal(kindOf('danchi')?.short, 850);
});

test('넓이는 한 장에 장수를 곱한 값', () => {
  for (const c of CELLS) {
    const k = kindOf(c.kind)!;
    const one = matArea(k.short, k.long);
    // 되돌려 나누면 장수가 나온다
    assert.ok(Math.abs(matsFor(one * c.mats, c.kind) - c.mats) < 1e-9, slugOf(c));
    const f = tatamiFacts(c);
    // 화면에 내는 값은 소수 둘째 자리에서 반올림한 것이다
    assert.ok(Math.abs(f.sqm - one * c.mats) <= 0.005 + 1e-9, f.slug);
  }
  // 널리 인용되는 자리 — 京間 6첩은 10.94㎡다
  assert.equal(facts('kyoma-6').sqm, 10.94);
  assert.equal(facts('danchi-6').sqm, 8.67);
  assert.equal(facts('kyoma-6').one, 1.824);
  // 장수가 두 배면 넓이도 두 배다
  assert.ok(Math.abs(facts('edo-16').sqm / facts('edo-8').sqm - 2) < 1e-6);
});

test('같은 6첩에서 2.27㎡가 벌어진다', () => {
  const six = facts('kyoma-6');
  assert.equal(six.spread, 2.27);
  // 가장 넓은 쪽과 가장 좁은 쪽의 차이다
  const areas = KINDS.map(k => matArea(k.short, k.long) * 6);
  assert.ok(Math.abs(six.spread - (Math.max(...areas) - Math.min(...areas))) <= 0.005);
  /*
   * 벌어지는 비율은 장수와 무관하게 일정하다 — 모든 규격이 장수에 정비례해
   * 늘어나므로 비는 약분된다. 넓이 차이는 장수를 따라 커져도 %는 그대로다.
   */
  /*
   * 화면에 내는 값끼리 견주면 반올림이 쌓여 36첩에서 어긋난다. 반올림 전
   * 값으로 잰다 — 벌어짐은 장수에 정비례해야 한다.
   */
  const rawSpread = (mats: number) => {
    const a = KINDS.map(k => matArea(k.short, k.long) * mats);
    return Math.max(...a) - Math.min(...a);
  };
  for (const c of CELLS) {
    const f = tatamiFacts(c);
    assert.equal(f.spreadPct, six.spreadPct, f.slug);
    assert.ok(Math.abs(rawSpread(c.mats) - rawSpread(6) * (c.mats / 6)) < 1e-9, f.slug);
    assert.ok(Math.abs(f.spread - rawSpread(c.mats)) <= 0.005 + 1e-9, f.slug);
  }
  assert.ok(six.spreadPct > 26 && six.spreadPct < 27);
  // 京間 6첩을 団地間으로 깔면 일곱 장으로 모자란다
  const need = matsFor(six.sqm, 'danchi');
  assert.ok(need > 7.5 && need < 7.6, `${need}`);
});

test('같은 장수의 다른 규격을 서로 가리킨다', () => {
  for (const c of CELLS) {
    const f = tatamiFacts(c);
    assert.equal(f.others.length, KINDS.length - 1, f.slug);
    const mine = matArea(kindOf(c.kind)!.short, kindOf(c.kind)!.long) * c.mats;
    for (const o of f.others) {
      assert.notEqual(o.key, c.kind, f.slug);
      // 차이는 상대의 넓이에서 내 넓이를 뺀 값이다 — 반올림 전 값으로 잰다
      const theirs = matArea(kindOf(o.key)!.short, kindOf(o.key)!.long) * c.mats;
      assert.ok(Math.abs(o.diff - (theirs - mine)) <= 0.005 + 1e-9, `${f.slug} ${o.key}`);
      // 서로를 가리키므로 반대쪽에서 보면 부호가 뒤집힌다
      const back = facts(o.slug).others.find(x => x.key === c.kind);
      assert.ok(back, `${f.slug} ${o.key}`);
      assert.ok(Math.abs(back.diff + o.diff) <= 0.011, `${f.slug} ${o.key}`);
    }
  }
  // 団地間에서 보면 나머지 넷이 모두 넓다
  for (const o of facts('danchi-6').others) assert.ok(o.diff > 0, o.key);
  // 京間에서 보면 나머지 넷이 모두 좁다
  for (const o of facts('kyoma-6').others) assert.ok(o.diff < 0, o.key);
});

test('평과 제곱피트는 되돌아온다', () => {
  // 1평은 400/121제곱미터다 — 6자 × 6자를 미터로 옮긴 값
  assert.ok(Math.abs(SQM_PER_PYEONG - 3.3058) < 0.0001);
  assert.ok(Math.abs(SQFT_PER_SQM - 10.7639) < 0.0001);
  for (const c of CELLS) {
    const f = tatamiFacts(c);
    assert.ok(Math.abs(toPyeong(f.sqm) - f.pyeong) <= 0.01, f.slug);
    assert.ok(Math.abs(toSqft(f.sqm) - f.sqft) <= 0.1, f.slug);
  }
  /*
   * 坪은 원래 다다미 두 장에서 나온 단위다. 中京間 두 장이 1평과 0.5% 안으로
   * 맞아떨어지는 것이 그 자취다.
   */
  const two = matArea(910, 1820) * 2;
  assert.ok(Math.abs(two / SQM_PER_PYEONG - 1) < 0.005, `${two}`);
});

test('앞뒤 칸은 장수 한 단계씩만 움직인다', () => {
  const f = facts('kyoma-6');
  assert.equal(f.fewer?.mats, 5);
  assert.equal(f.more?.mats, 7);
  assert.equal(facts('kyoma-1').fewer, null);
  assert.equal(facts('kyoma-36').more, null);
  for (const c of CELLS) {
    const g = tatamiFacts(c);
    if (g.more) {
      assert.equal(g.more.kind, c.kind, g.slug);
      assert.ok(facts(g.more.slug).sqm > g.sqm, g.slug);
    }
  }
  assert.equal(atKind('edo').length, MATS.length);
  assert.equal(matsFor(10, 'nope'), 0);
});
