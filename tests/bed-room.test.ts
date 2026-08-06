/**
 * 침대와 방 — 통로를 경계에서 되짚는다.
 *
 * 계산은 빼기와 반 나누기뿐이라, 검사는 판정이 갈리는 자리에 선다. 통로
 * 60cm를 딱 채우는 방과 1mm 모자란 방에서 판정이 바뀌는지, 침대가 방보다
 * 넓으면 아예 안 들어간다고 하는지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BEDS, CELLS, ROOMS, WALKWAY, bedOf, cellOf, slugOf } from '../lib/bed/list.ts';
import { atBed, bedFacts, fitOf, gapOf, wallGapOf } from '../lib/bed/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return bedFacts(c);
};

test('칸은 규격 12가지 × 방 12가지', () => {
  assert.equal(BEDS.length, 12);
  assert.equal(ROOMS.length, 12);
  assert.equal(CELLS.length, 144);
  assert.equal(new Set(CELLS.map(slugOf)).size, 144);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < ROOMS.length; i++) assert.ok(ROOMS[i] > ROOMS[i - 1]);
  // 한국 일곱, 미국 다섯이다
  assert.equal(BEDS.filter(b => b.origin === 'kr').length, 7);
  assert.equal(BEDS.filter(b => b.origin === 'us').length, 5);
  // 한국 규격은 길이가 모두 2000mm다
  for (const b of BEDS.filter(x => x.origin === 'kr')) assert.equal(b.h, 2000, b.key);
  assert.equal(cellOf('kr-queen-2500'), undefined);
  assert.equal(cellOf('uk-queen-3000'), undefined);
});

test('같은 이름이 나라마다 다르다', () => {
  const kq = bedOf('kr-queen');
  const uq = bedOf('us-queen');
  const kk = bedOf('kr-king');
  const uk = bedOf('us-king');
  assert.ok(kq && uq && kk && uk);
  // 퀸은 2.4cm 차이
  assert.equal(uq.w - kq.w, 24);
  // 킹은 33cm 차이 — 이름만 보고 고르면 안 되는 자리다
  assert.equal(uk.w - kk.w, 330);
  assert.ok(uk.w - kk.w > (uq.w - kq.w) * 10);
  // 짝은 서로를 가리킨다
  for (const c of CELLS) {
    const f = bedFacts(c);
    if (!f.twin) continue;
    const back = facts(f.twin.slug);
    assert.ok(back.twin, f.slug);
    assert.equal(back.twin.key, c.bed, f.slug);
    assert.equal(back.twin.diff, -f.twin.diff, f.slug);
  }
  assert.equal(facts('kr-king-3600').twin?.diff, 330);
});

test('통로는 남는 폭을 반으로 나눈 값', () => {
  for (const c of CELLS) {
    const b = bedOf(c.bed)!;
    const f = bedFacts(c);
    assert.ok(Math.abs(f.gap - (c.room - b.w) / 2) <= 0.5, f.slug);
    assert.ok(Math.abs(f.wallGap - (c.room - b.w)) <= 0.5, f.slug);
    // 벽에 붙이면 한쪽 통로가 가운데 놓았을 때의 두 배다
    assert.ok(Math.abs(f.wallGap - f.gap * 2) <= 1, f.slug);
  }
  // 3600mm 방에 한국 퀸(1500)이면 한쪽에 1050mm가 남는다
  assert.equal(facts('kr-queen-3600').gap, 1050);
  assert.equal(facts('kr-queen-3600').wallGap, 2100);
});

test('판정은 60cm에서 갈린다', () => {
  assert.equal(WALKWAY, 600);
  // 딱 60cm면 통로로 친다
  assert.equal(fitOf(1500 + 1200, 1500), 'both');
  // 1mm 모자라면 벽에 붙이는 쪽으로 넘어간다
  assert.equal(fitOf(1500 + 1198, 1500), 'one');
  // 벽에 붙여도 모자라면 tight
  assert.equal(fitOf(1500 + 500, 1500), 'tight');
  // 침대가 더 넓으면 아예 안 들어간다
  assert.equal(fitOf(1500, 1600), 'no');
  assert.equal(fitOf(1600, 1600), 'tight');
  for (const c of CELLS) {
    const b = bedOf(c.bed)!;
    const f = bedFacts(c);
    assert.equal(f.fit, fitOf(c.room, b.w), f.slug);
    assert.equal(f.fit === 'no', b.w > c.room, f.slug);
    assert.equal(f.fit === 'both', gapOf(c.room, b.w) >= WALKWAY, f.slug);
    if (f.fit === 'one') assert.ok(wallGapOf(c.room, b.w) >= WALKWAY, f.slug);
  }
});

test('방이 넓어질수록 판정이 좋아지기만 한다', () => {
  const rank: Record<string, number> = { no: 0, tight: 1, one: 2, both: 3 };
  for (const b of BEDS) {
    let last = -1;
    for (const room of ROOMS) {
      const f = bedFacts({ bed: b.key, room });
      assert.ok(rank[f.fit] >= last, `${b.key}-${room}`);
      last = rank[f.fit];
    }
  }
  // 미국 킹은 2400mm 방에 통로 없이 겨우 들어간다
  assert.equal(facts('us-king-2400').fit, 'tight');
  // 한국 싱글은 같은 방에서 양쪽 통로가 난다
  assert.equal(facts('kr-single-2400').fit, 'both');
});

test('넓이와 1인당 폭', () => {
  for (const c of CELLS) {
    const b = bedOf(c.bed)!;
    const f = bedFacts(c);
    assert.ok(Math.abs(f.area - (b.w * b.h) / 1e6) <= 0.005 + 1e-9, f.slug);
    assert.ok(Math.abs(f.perPerson - b.w / 2) <= 0.5, f.slug);
    // 넓이와 1인당 폭은 방과 무관하다
    assert.equal(f.area, facts(`${c.bed}-6000`).area, f.slug);
  }
  // 한국 퀸에 둘이 누우면 1인당 75cm — 싱글 하나가 100cm인 것과 견준다
  assert.equal(facts('kr-queen-3600').perPerson, 750);
  assert.ok(facts('kr-queen-3600').perPerson < bedOf('kr-single')!.w);
});

test('앞뒤 칸은 방 폭만 움직인다', () => {
  const f = facts('kr-queen-3600');
  assert.equal(f.smaller?.room, 3300);
  assert.equal(f.larger?.room, 3900);
  assert.equal(facts('kr-queen-2400').smaller, null);
  assert.equal(facts('kr-queen-6000').larger, null);
  for (const c of CELLS) {
    const g = bedFacts(c);
    if (g.larger) {
      assert.equal(g.larger.bed, c.bed, g.slug);
      assert.ok(facts(g.larger.slug).gap > g.gap, g.slug);
    }
  }
  assert.equal(atBed('kr-queen').length, ROOMS.length);
});
