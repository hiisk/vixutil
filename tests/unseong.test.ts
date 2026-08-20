import { test } from 'node:test';
import assert from 'node:assert/strict';
import { UNSEONGS, readUnseong, unseongOf, unseongPower, unseongRow } from '../lib/unseong.ts';
import { BRANCHES, STEMS, buildChart } from '../lib/saju-data.ts';

/**
 * 십이운성 규칙.
 *
 * 화면으로는 「제왕입니다」가 맞는지 알 수 없다. 다행히 이 갈래에는 확인할 못이
 * 둘 있다 — **건록은 그 일간이 스스로 앉는 자리**이고(갑→寅), **제왕은 그
 * 다음 왕지**다(갑→卯). 규칙을 잘못 짜면 둘이 동시에 어긋난다.
 */

const kor = (i: number) => BRANCHES[i].kor;
const stem = (k: string) => STEMS.findIndex(s => s.kor === k);
const branch = (k: string) => BRANCHES.findIndex(b => b.kor === k);

test('열두 이름이 차례대로 있다', () => {
  assert.equal(UNSEONGS.length, 12);
  assert.equal(UNSEONGS[0].name, '장생');
  assert.equal(UNSEONGS[3].name, '건록');
  assert.equal(UNSEONGS[4].name, '제왕');
  assert.equal(UNSEONGS[11].name, '양');
  for (const u of UNSEONGS) {
    assert.ok(u.body.length > 50, `${u.name}에 설명이 없다`);
    assert.ok(u.power >= 1 && u.power <= 5, `${u.name} 세기가 ${u.power}`);
  }
});

test('건록은 그 일간이 스스로 앉는 자리다', () => {
  /* 널리 알려진 값 — 갑록재인, 병록재사, 경록재신, 임록재해 */
  const KNOWN: [string, string][] = [
    ['갑', '인'], ['을', '묘'], ['병', '사'], ['정', '오'],
    ['무', '사'], ['기', '오'], ['경', '신'], ['신', '유'],
    ['임', '해'], ['계', '자'],
  ];
  for (const [s, b] of KNOWN) {
    assert.equal(unseongOf(stem(s), branch(b)).name, '건록', `${s}의 건록이 ${b}이 아니다`);
  }
});

test('제왕은 그다음 왕지다', () => {
  const KNOWN: [string, string][] = [['갑', '묘'], ['병', '오'], ['경', '유'], ['임', '자']];
  for (const [s, b] of KNOWN) {
    assert.equal(unseongOf(stem(s), branch(b)).name, '제왕', `${s}의 제왕이 ${b}이 아니다`);
  }
});

test('양간은 순행, 음간은 역행이다', () => {
  /* 갑(양)과 을(음)은 같은 목인데 방향이 반대라 자리가 정반대로 간다.
     방향을 안 가르면 둘이 같은 표를 쓰게 되고 여기서 걸린다. */
  assert.equal(unseongOf(stem('갑'), branch('해')).name, '장생');
  assert.equal(unseongOf(stem('갑'), branch('자')).name, '목욕', '갑이 순행이 아니다');
  assert.equal(unseongOf(stem('을'), branch('오')).name, '장생');
  assert.equal(unseongOf(stem('을'), branch('사')).name, '목욕', '을이 역행이 아니다');
});

test('일간마다 열두 지지가 열두 운성을 하나씩 갖는다', () => {
  for (let s = 0; s < 10; s++) {
    const names = unseongRow(s).map(u => u.name);
    assert.equal(new Set(names).size, 12, `${STEMS[s].kor}에서 운성이 겹치거나 빠진다`);
  }
});

test('명식 네 기둥을 일간 기준으로 읽는다', () => {
  const chart = buildChart({ year: 1995, month: 3, day: 15, hour: 8 }, 'male');
  const hits = readUnseong(chart);
  assert.equal(hits.length, 4);
  assert.deepEqual(hits.map(h => h.pillar), ['연주', '월주', '일주', '시주']);
  for (const h of hits) {
    /* 읽어 낸 것이 실제로 그 지지의 운성인지 되짚는다 */
    assert.equal(h.unseong.name, unseongOf(chart.day.stemIdx, h.branchIdx).name,
      `${h.pillar}(${kor(h.branchIdx)})이 어긋난다`);
  }
});

test('시를 모르면 기둥이 셋이다', () => {
  const chart = buildChart({ year: 1995, month: 3, day: 15, hour: null }, 'male');
  assert.equal(readUnseong(chart).length, 3);
});

test('세기 합이 범위 안이고 말로 옮겨진다', () => {
  for (const hour of [8, null]) {
    const chart = buildChart({ year: 1988, month: 11, day: 3, hour }, 'female');
    const hits = readUnseong(chart);
    const p = unseongPower(hits);
    assert.equal(p.max, hits.length * 5);
    assert.ok(p.total >= hits.length && p.total <= p.max, `합이 ${p.total}`);
    assert.ok(p.label.trim().length > 2);
  }
});

test('이 검사가 실제로 문다', () => {
  /* 규칙을 한 칸 밀면 건록이 어긋나야 한다 */
  const 갑 = stem('갑');
  assert.notEqual(unseongOf(갑, (branch('인') + 1) % 12).name, '건록',
    '한 칸 밀어도 건록이면 이 검사는 아무것도 안 재고 있다');
  /* 양·음이 정말 다른 표를 쓰는지 */
  const same = BRANCHES.every((_, b) => unseongOf(stem('갑'), b).name === unseongOf(stem('을'), b).name);
  assert.ok(!same, '갑과 을이 같은 표를 쓴다 — 순행·역행을 안 가르고 있다');
});
