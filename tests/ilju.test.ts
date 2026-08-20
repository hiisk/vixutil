import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAPJA, gongmang, iljuInfo, iljuOfBirth } from '../lib/ilju.ts';
import { BRANCHES, ILJU_READINGS, STEMS } from '../lib/saju-data.ts';

/**
 * 일주 예순 장.
 *
 * 해석 글은 이미 있던 것이라 여기서 잴 것은 «주소와 데이터가 맞물리는가»다 —
 * 육십갑자가 정말 예순인지, 글이 빠진 칸이 없는지, 공망이 규칙대로인지.
 */

test('육십갑자가 예순이고 짝 규칙을 지킨다', () => {
  assert.equal(GAPJA.length, 60);
  assert.equal(new Set(GAPJA.map(g => g.key)).size, 60, '같은 간지가 두 번 있다');
  /* 천간·지지의 짝수 홀수가 맞아야 한다 — 「갑축」 같은 것은 없다 */
  for (const g of GAPJA) {
    assert.equal(g.stemIdx % 2, g.branchIdx % 2, `${g.key}는 존재할 수 없는 짝이다`);
  }
  assert.equal(GAPJA[0].key, '갑자');
  assert.equal(GAPJA[59].key, '계해');
});

test('예순 장 모두 해석 글이 있다', () => {
  const missing = GAPJA.filter(g => !ILJU_READINGS[g.key]).map(g => g.key);
  assert.deepEqual(missing, [], `글이 없는 일주: ${missing.join(' ')}`);
  for (const g of GAPJA) {
    assert.ok(ILJU_READINGS[g.key].length > 40, `${g.key}의 글이 너무 짧다`);
  }
});

test('낱장에 필요한 것이 다 채워진다', () => {
  for (const g of GAPJA) {
    const i = iljuInfo(g.key)!;
    assert.ok(i, `${g.key}를 못 찾았다`);
    assert.equal(i.hanja.length, 2, `${g.key} 한자가 ${i.hanja}`);
    assert.ok(i.reading.length > 40);
    assert.ok(i.unseong.trim().length > 0);
    assert.ok(i.unseongPower >= 1 && i.unseongPower <= 5);
    assert.ok(i.relation.includes('일간'), `${g.key} 관계 설명이 비었다`);
    assert.equal(i.gongmang.length, 2);
    assert.notEqual(i.gongmang[0], i.gongmang[1], `${g.key} 공망 둘이 같다`);
  }
  assert.equal(iljuInfo('갑축'), null, '없는 간지가 값을 낸다');
});

test('공망이 순마다 둘이고 그 순에 안 들어 있다', () => {
  /*
   * 육십갑자를 열씩 여섯 순으로 끊으면 지지 열둘 중 둘이 남는다 — 그 둘이
   * 공망이다. 그러니 공망은 «같은 순에 등장하지 않는 지지»여야 한다.
   */
  for (let s = 0; s < 6; s++) {
    const sun = GAPJA.slice(s * 10, s * 10 + 10);
    const inSun = new Set(sun.map(g => g.branchIdx));
    assert.equal(inSun.size, 10, '한 순에 지지가 열이 아니다');
    const [a, b] = gongmang(sun[0].stemIdx, sun[0].branchIdx);
    assert.ok(!inSun.has(a) && !inSun.has(b),
      `${sun[0].key} 순의 공망 ${BRANCHES[a].kor}·${BRANCHES[b].kor}이 그 순 안에 있다`);
    /* 같은 순의 열 간지는 공망이 모두 같다 */
    for (const g of sun) {
      assert.deepEqual(gongmang(g.stemIdx, g.branchIdx), [a, b], `${g.key}의 공망이 순과 다르다`);
    }
  }
});

test('갑자순의 공망은 술·해다', () => {
  /* 널리 알려진 값 — 갑자순(甲子旬)은 술해공망이다 */
  const [a, b] = gongmang(STEMS.findIndex(s => s.kor === '갑'), BRANCHES.findIndex(x => x.kor === '자'));
  assert.deepEqual([BRANCHES[a].kor, BRANCHES[b].kor], ['술', '해']);
});

test('생년월일에서 일주를 뽑는다', () => {
  const key = iljuOfBirth({ year: 1995, month: 3, day: 15, hour: null });
  assert.ok(ILJU_READINGS[key], `${key}는 육십갑자가 아니다`);
  /* 같은 날은 늘 같은 일주 */
  assert.equal(key, iljuOfBirth({ year: 1995, month: 3, day: 15, hour: 8 }));
  /* 하루 뒤는 다음 간지 */
  const next = iljuOfBirth({ year: 1995, month: 3, day: 16, hour: null });
  const i = GAPJA.findIndex(g => g.key === key);
  assert.equal(next, GAPJA[(i + 1) % 60].key, '하루 뒤가 다음 간지가 아니다');
});

test('이 검사가 실제로 문다', () => {
  assert.equal(Object.keys(ILJU_READINGS).length, 60);
  /* 짝 규칙을 어긴 것을 넣으면 걸려야 한다 */
  assert.equal(iljuInfo('갑축'), null);
  assert.equal(iljuInfo('없음'), null);
  /* 공망이 상수가 아닌지 — 순마다 달라야 한다 */
  const sets = new Set([0, 10, 20, 30, 40, 50].map(i => gongmang(GAPJA[i].stemIdx, GAPJA[i].branchIdx).join(',')));
  assert.equal(sets.size, 6, '여섯 순의 공망이 서로 다르지 않다');
});
