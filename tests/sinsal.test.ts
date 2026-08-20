import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SINSALS, branchesFor, findSinsal, readSinsal, sinsalOf } from '../lib/sinsal.ts';
import { BRANCHES, SAMHAP, buildChart } from '../lib/saju-data.ts';

/**
 * 십이신살 규칙.
 *
 * 화면에 「도화살이 있습니다」라고 떠 있어도 맞는지 사람은 모른다. 다행히 이
 * 갈래에는 세상에 널리 알려진 값이 있다 — 도화살은 늘 자오묘유, 역마살은 늘
 * 인신사해, 화개살은 늘 진술축미다. 거기에 못을 박는다.
 */

const kor = (i: number) => BRANCHES[i].kor;
const namesOf = (idxs: number[]) => idxs.map(kor).sort();

test('열두 이름이 차례대로 있다', () => {
  /* 순서가 곧 규칙이다 — 넷째가 지살, 여덟째가 장성살, 열두째가 화개살 */
  assert.equal(SINSALS.length, 12);
  assert.equal(SINSALS[3].name, '지살');
  assert.equal(SINSALS[7].name, '장성살');
  assert.equal(SINSALS[11].name, '화개살');
  assert.equal(new Set(SINSALS.map(s => s.name)).size, 12, '같은 이름이 겹친다');
  for (const s of SINSALS) {
    assert.ok(s.body.length > 60, `${s.name}에 설명이 없다`);
    assert.ok(s.hanja.length >= 2, `${s.name}에 한자가 없다`);
  }
});

test('도화살은 늘 자오묘유, 역마살은 인신사해, 화개살은 진술축미다', () => {
  /* 이 셋이 이 검사의 못이다. 규칙을 잘못 짜면 여기서 반드시 걸린다. */
  assert.deepEqual(namesOf(branchesFor('년살')), ['묘', '오', '유', '자'].sort());
  assert.deepEqual(namesOf(branchesFor('역마살')), ['사', '신', '인', '해'].sort());
  assert.deepEqual(namesOf(branchesFor('화개살')), ['미', '술', '축', '진'].sort());
  /* 장성살은 삼합의 왕지 넷 — 자오묘유와 같은 자리다 */
  assert.deepEqual(namesOf(branchesFor('장성살')), ['묘', '오', '유', '자'].sort());
});

test('삼합의 세 자리가 지살·장성살·화개살이다', () => {
  /* 이 세 못이 나머지 아홉의 자리를 정한다 */
  for (const [birth, peak, tomb] of SAMHAP) {
    for (const base of [birth, peak, tomb]) {
      assert.equal(sinsalOf(base, birth).name, '지살', `${kor(base)} 기준 ${kor(birth)}`);
      assert.equal(sinsalOf(base, peak).name, '장성살', `${kor(base)} 기준 ${kor(peak)}`);
      assert.equal(sinsalOf(base, tomb).name, '화개살', `${kor(base)} 기준 ${kor(tomb)}`);
    }
  }
});

test('같은 무리 셋은 기준이 누구든 결과가 같다', () => {
  /* 신살은 삼합 무리가 정하므로, 자·신·진 어느 것을 기준으로 잡아도 같아야
     한다. 무리가 아니라 지지 하나로 계산하면 여기서 갈린다. */
  for (const g of SAMHAP) {
    for (let target = 0; target < 12; target++) {
      const got = g.map(base => sinsalOf(base, target).name);
      assert.equal(new Set(got).size, 1,
        `${g.map(kor).join('·')} 기준 ${kor(target)}이 ${got.join('/')}로 갈린다`);
    }
  }
});

test('한 기준에서 열두 지지가 열두 신살을 하나씩 갖는다', () => {
  for (let base = 0; base < 12; base++) {
    const got = Array.from({ length: 12 }, (_, t) => sinsalOf(base, t).name);
    assert.equal(new Set(got).size, 12, `${kor(base)} 기준에서 신살이 겹치거나 빠진다`);
  }
});

test('명식에서 네 기둥의 신살을 읽는다', () => {
  const chart = buildChart({ year: 1995, month: 3, day: 15, hour: 8 }, 'male');
  for (const base of ['연지', '일지'] as const) {
    const r = readSinsal(chart, base);
    assert.equal(r.hits.length, 4, `${base} 기준에서 기둥이 넷이 아니다`);
    assert.deepEqual(r.hits.map(h => h.pillar), ['연주', '월주', '일주', '시주']);
    for (const h of r.hits) {
      /* 읽어 낸 신살이 실제로 그 지지의 것인지 되짚는다 */
      assert.equal(h.sinsal.name, sinsalOf(r.baseBranch, h.branchIdx).name);
    }
  }
  /* 기준 자신은 늘 지살·장성살·화개살 셋 가운데 하나다 */
  const byYear = readSinsal(chart, '연지');
  assert.ok(['지살', '장성살', '화개살'].includes(sinsalOf(byYear.baseBranch, byYear.baseBranch).name));
});

test('시를 모르면 기둥이 셋이다', () => {
  const chart = buildChart({ year: 1995, month: 3, day: 15, hour: null }, 'male');
  const r = readSinsal(chart, '일지');
  assert.equal(r.hits.length, 3);
  assert.deepEqual(r.hits.map(h => h.pillar), ['연주', '월주', '일주']);
});

test('별칭으로도 찾힌다', () => {
  /* 사람들은 «년살»이 아니라 «도화살»로 검색한다 */
  assert.equal(findSinsal('도화살')?.name, '년살');
  assert.equal(findSinsal('수옥살')?.name, '재살');
  assert.equal(findSinsal('고초살')?.name, '월살');
  assert.equal(findSinsal('년살')?.name, '년살');
  assert.equal(findSinsal('없는살'), undefined);
});

test('이 검사가 실제로 문다', () => {
  /* 규칙을 한 칸 밀면 알려진 값과 달라져야 한다. 안 달라지면 위 검사들이
     아무것도 안 재고 통과하고 있는 것이다. */
  const doh = branchesFor('년살');
  const shifted = doh.map(b => (b + 1) % 12);
  assert.notDeepEqual(namesOf(shifted), ['묘', '오', '유', '자'].sort(),
    '한 칸 밀어도 같다면 이 검사는 아무것도 안 재고 있다');
  /* 없는 이름을 물으면 빈 목록이라야 한다 — 조용히 아무 값이나 내면 안 된다 */
  assert.deepEqual(branchesFor('없는살'), []);
});
