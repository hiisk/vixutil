/**
 * 전자레인지 와트 환산 — 반비례를 성질로 되짚는다.
 *
 * 두 축이 같은 목록이라 검사할 자리가 분명하다. 대각선은 아무것도 바꾸지
 * 않아야 하고, 앞뒤를 뒤집으면 원래대로 돌아와야 하며, 두 번 옮기면 한 번에
 * 옮긴 것과 같아야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CELLS, SAMPLE_SECONDS, WATTS, cellOf, slugOf } from '../lib/microwave/list.ts';
import { convertSeconds, microwaveFacts, ratioOf } from '../lib/microwave/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return microwaveFacts(c);
};

test('칸은 출력 12가지끼리의 모든 짝', () => {
  assert.equal(WATTS.length, 12);
  assert.equal(CELLS.length, 144);
  assert.equal(new Set(CELLS.map(slugOf)).size, 144);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < WATTS.length; i++) assert.ok(WATTS[i] > WATTS[i - 1]);
  // 두 축이 같은 목록이므로 대각선이 열두 칸이다
  assert.equal(CELLS.filter(c => c.from === c.to).length, 12);
  assert.equal(cellOf('700-950'), undefined);
});

test('같은 출력이면 시간이 그대로다', () => {
  for (const w of WATTS) {
    const f = microwaveFacts({ from: w, to: w });
    assert.equal(f.ratio, 1, `${w}`);
    assert.equal(f.same, true, `${w}`);
    assert.equal(f.changePct, 0, `${w}`);
    for (const s of f.samples) assert.equal(s.converted, s.seconds, `${w}`);
  }
  assert.equal(ratioOf(800, 800), 1);
});

test('앞뒤를 뒤집으면 되돌아온다', () => {
  for (const c of CELLS) {
    const f = microwaveFacts(c);
    const back = facts(f.reverse.slug);
    // 두 비율을 곱하면 1이다
    assert.ok(Math.abs(ratioOf(c.from, c.to) * ratioOf(c.to, c.from) - 1) < 1e-12, f.slug);
    assert.equal(back.cell.from, c.to, f.slug);
    assert.equal(back.cell.to, c.from, f.slug);
    // 옮긴 시간을 다시 옮기면 원래 시간이다
    const there = convertSeconds(180, c.from, c.to);
    assert.ok(Math.abs(convertSeconds(there, c.to, c.from) - 180) < 1e-9, f.slug);
  }
  assert.equal(facts('700-1000').reverse.slug, '1000-700');
});

test('두 번 옮긴 것과 한 번에 옮긴 것이 같다', () => {
  for (const a of WATTS) {
    for (const b of WATTS) {
      for (const c of WATTS) {
        const twice = convertSeconds(convertSeconds(180, a, b), b, c);
        assert.ok(Math.abs(twice - convertSeconds(180, a, c)) < 1e-9, `${a}-${b}-${c}`);
      }
    }
  }
});

test('출력이 세지면 시간이 짧아진다', () => {
  for (const from of WATTS) {
    let last = Infinity;
    for (const to of WATTS) {
      const f = microwaveFacts({ from, to });
      assert.ok(f.ratio < last, `${from}-${to}`);
      assert.equal(f.longer, to < from, `${from}-${to}`);
      last = f.ratio;
    }
  }
  // 널리 쓰이는 자리 — 700W 3분은 1000W에서 2분 6초다
  const f = facts('700-1000');
  const three = f.samples.find(s => s.seconds === 180);
  assert.ok(three);
  assert.equal(three.converted, 126);
  assert.equal(three.minutes, 2);
  assert.equal(three.rest, 6);
  // 거꾸로 1000W 3분은 700W에서 4분 17초다
  const back = facts('1000-700').samples.find(s => s.seconds === 180);
  assert.ok(back);
  assert.equal(back.minutes, 4);
  assert.equal(back.rest, 17);
});

test('기준 시간 셋이 모두 같은 비율로 옮겨진다', () => {
  assert.deepEqual(SAMPLE_SECONDS, [60, 180, 300]);
  for (const c of CELLS) {
    const f = microwaveFacts(c);
    assert.equal(f.samples.length, 3, f.slug);
    for (const s of f.samples) {
      assert.ok(Math.abs(s.converted - convertSeconds(s.seconds, c.from, c.to)) <= 0.5, f.slug);
      // 분과 초로 나눈 값이 다시 합쳐진다
      assert.equal(s.minutes * 60 + s.rest, s.converted, f.slug);
      assert.ok(s.rest >= 0 && s.rest < 60, f.slug);
    }
  }
});

test('앞뒤 칸은 내 전자레인지 출력만 움직인다', () => {
  const f = facts('700-1000');
  assert.equal(f.weaker?.to, 900);
  assert.equal(f.stronger?.to, 1100);
  assert.equal(facts('700-500').weaker, null);
  assert.equal(facts('700-1700').stronger, null);
  for (const c of CELLS) {
    const g = microwaveFacts(c);
    if (g.stronger) {
      assert.equal(g.stronger.from, c.from, g.slug);
      assert.ok(facts(g.stronger.slug).ratio < g.ratio, g.slug);
    }
  }
});
