/**
 * 페이스 계산이 스스로 어긋나지 않는지 본다.
 *
 * 완주 시간은 페이스에 거리를 곱한 값이므로, 검사는 나누어 되돌린다 — 풀코스
 * 기록을 42.195로 나누면 다시 그 페이스가 나와야 한다. 거리를 42로 어림하면
 * 이 되돌림에서 어긋난다.
 *
 * 페이스와 속도는 뒤집힌 값이라 곱이 3600이어야 하고, 마일 페이스는 킬로미터
 * 페이스의 1.609344배여야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FASTEST, PACES, PACE_ICON, PACE_SLUGS, RACES, SLOWEST, labelOf, paceOf, slugOf } from '../lib/pace/list.ts';
import { GOALS, ROUND_PACES, goalsMet, hms, neighbours, paceFacts, paceForGoal } from '../lib/pace/facts.ts';
import { PACE_UI } from '../lib/pace/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(PACES.length >= 100, `${PACES.length}가지뿐이다`);
  assert.equal(PACES.length, SLOWEST - FASTEST + 1);
  assert.equal(PACES.length, 241);
  assert.equal(new Set(PACE_SLUGS).size, PACES.length, 'slug 중복');
});

test('주소와 페이스가 서로를 되돌린다', () => {
  for (const p of PACES) {
    assert.equal(paceOf(slugOf(p)), p, `${slugOf(p)}: 되읽으면 다른 페이스가 나온다`);
    assert.match(labelOf(p), /^[3-7]:[0-5][0-9]$/, `${labelOf(p)}: 적는 꼴이 다르다`);
  }
  assert.equal(slugOf(270), '4-30');
  assert.equal(labelOf(270), '4:30');
  assert.equal(labelOf(180), '3:00', '초가 한 자리면 0을 채운다');
  assert.equal(paceOf('4:30'), undefined, '사람이 적는 꼴은 주소가 아니다');
  assert.equal(paceOf('2-59'), undefined, '구간 밖은 받지 않는다');
  assert.equal(paceOf('4-60'), undefined, '60초는 없다');
});

test('완주 시간을 거리로 나누면 그 페이스가 나온다', () => {
  for (const p of PACES) {
    const f = paceFacts(p);
    for (const r of f.finishes) {
      // 초 단위로 반올림했으므로 나누면 그만큼 어긋날 수 있다
      assert.ok(Math.abs(r.seconds / r.km - p) < 0.5 / r.km + 0.001, `${f.label} ${r.key}: 되돌리면 ${r.seconds / r.km}초가 된다`);
      assert.equal(r.text, hms(r.seconds), `${f.label} ${r.key}: 적는 꼴이 다르다`);
    }
    // 거리가 두 배면 시간도 두 배다 — 5K와 10K
    const [five, ten] = [f.finishes[0].seconds, f.finishes[1].seconds];
    assert.ok(Math.abs(ten - five * 2) <= 1, `${f.label}: 10K가 5K의 두 배가 아니다`);
    // 풀은 하프의 두 배다
    assert.ok(Math.abs(f.finishes[3].seconds - f.finishes[2].seconds * 2) <= 1, `${f.label}: 풀이 하프의 두 배가 아니다`);
  }
  // 손으로 아는 값들
  assert.equal(paceFacts(300).finishes[3].text, '3:30:59', '5분 페이스의 풀코스');
  assert.equal(paceFacts(300).finishes[0].text, '25:00');
  assert.equal(paceFacts(240).finishes[3].text, '2:48:47');
});

test('하프와 풀이 어림한 거리가 아니다', () => {
  assert.equal(RACES.find(r => r.key === 'half')!.km, 21.0975);
  assert.equal(RACES.find(r => r.key === 'full')!.km, 42.195);
  // 42로 어림하면 5분 페이스에서 1분 가까이 어긋난다 — 그 차이가 실제로 나는지 본다
  const exact = paceFacts(300).finishes[3].seconds;
  assert.ok(exact - 300 * 42 > 55, `어림과 ${exact - 300 * 42}초밖에 차이 나지 않는다`);
});

test('페이스와 속도가 서로 뒤집힌 값이다', () => {
  for (const p of PACES) {
    const f = paceFacts(p);
    // 1km에 p초 → 시속 3600/p, 곱하면 3600이다
    assert.ok(Math.abs(f.kmh * p - 3600) < 3, `${f.label}: 시속 × 페이스가 ${f.kmh * p}이다`);
    assert.ok(Math.abs(f.ms * p - 1000) < 1, `${f.label}: 초속이 어긋난다`);
    // 둘 다 소수 둘째 자리에서 반올림한 값이라 그만큼은 벌어질 수 있다
    assert.ok(Math.abs(f.kmh - f.ms * 3.6) < 0.05, `${f.label}: 시속과 초속이 어긋난다`);
    // 페이스가 느려지면 속도는 반드시 떨어진다
    if (f.slower !== null) assert.ok(paceFacts(f.slower).kmh < f.kmh, `${f.label}: 느린데 속도가 올랐다`);
  }
  assert.equal(paceFacts(300).kmh, 12, '5분 페이스는 시속 12km');
  assert.equal(paceFacts(180).kmh, 20);
});

test('마일 페이스가 1.609344배다', () => {
  for (const p of PACES) {
    const f = paceFacts(p);
    assert.ok(Math.abs(f.mileSec - p * 1.609344) <= 0.5, `${f.label}: 마일 페이스가 어긋난다`);
    assert.ok(f.mileSec > p, `${f.label}: 마일이 킬로미터보다 짧게 나왔다`);
    // 400m 한 바퀴는 1km의 0.4배다
    assert.ok(Math.abs(f.lapSec - p * 0.4) <= 0.5, `${f.label}: 한 바퀴가 어긋난다`);
  }
  assert.equal(paceFacts(300).mileText, '8:03', '5분 페이스는 마일 8분 3초');
});

test('시:분:초 표기가 자리를 채운다', () => {
  assert.equal(hms(59), '0:59');
  assert.equal(hms(60), '1:00');
  assert.equal(hms(3599), '59:59');
  assert.equal(hms(3600), '1:00:00');
  assert.equal(hms(3661), '1:01:01');
  for (const p of PACES) {
    for (const r of paceFacts(p).finishes) {
      assert.match(r.text, /^[0-9]+:[0-5][0-9](:[0-5][0-9])?$/, `${r.text}: 자리가 비었다`);
    }
  }
});

test('목표를 끊는 경계가 맞는다', () => {
  for (const g of GOALS) {
    const edge = paceForGoal(g);
    // 경계 페이스로는 끊기고, 1초만 느려도 못 끊는다
    assert.ok(edge * g.km <= g.limit, `${g.key}: 경계 페이스로 끊기지 않는다`);
    assert.ok((edge + 1) * g.km > g.limit, `${g.key}: 1초 느려도 끊긴다`);
  }
  // 널리 알려진 값들
  assert.equal(labelOf(paceForGoal(GOALS.find(g => g.key === 'sub4-full')!)), '5:41', '서브4는 5분 41초 페이스');
  assert.equal(labelOf(paceForGoal(GOALS.find(g => g.key === 'sub3-full')!)), '4:15');
  assert.equal(labelOf(paceForGoal(GOALS.find(g => g.key === 'sub2-half')!)), '5:41');
  assert.equal(labelOf(paceForGoal(GOALS.find(g => g.key === 'sub60-10k')!)), '6:00');
});

test('빠른 페이스가 느린 페이스의 목표를 다 끊는다', () => {
  for (const p of PACES) {
    const mine = goalsMet(p).map(g => g.key);
    for (const g of goalsMet(p)) {
      assert.ok(p * g.km <= g.limit, `${labelOf(p)}: ${g.key}를 못 끊는데 목록에 있다`);
    }
    // 1초 빠른 페이스는 내가 끊는 목표를 모두 끊는다
    if (PACES.includes(p - 1)) {
      const faster = goalsMet(p - 1).map(g => g.key);
      for (const key of mine) assert.ok(faster.includes(key), `${labelOf(p - 1)}: ${key}를 놓쳤다`);
    }
  }
  assert.ok(goalsMet(341).some(g => g.key === 'sub4-full'), '5:41은 서브4를 끊는다');
  assert.ok(!goalsMet(342).some(g => g.key === 'sub4-full'), '5:42는 서브4를 못 끊는다');
});

test('눈금과 이웃이 제자리에 있다', () => {
  assert.equal(ROUND_PACES.length, 9, '3:00부터 7:00까지 30초 간격');
  for (const p of ROUND_PACES) assert.equal(p % 30, 0);
  for (const p of PACES) {
    const list = neighbours(p);
    assert.ok(!list.includes(p), `${labelOf(p)}: 이웃에 자기 자신이 있다`);
    assert.ok(list.length > 0, `${labelOf(p)}: 이웃이 없다`);
  }
  assert.equal(paceFacts(FASTEST).faster, null);
  assert.equal(paceFacts(SLOWEST).slower, null);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = paceFacts(300);
  for (const lang of LANG_CODES) {
    const ui = PACE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.paceFaq(f).flatMap(q => [q.q, q.a]),
      ...RACES.map(r => ui.raceName(r.key)),
      ...GOALS.map(g => ui.goalName(g.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('거리와 목표 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = PACE_UI[lang];
    const names = RACES.map(r => ui.raceName(r.key));
    assert.equal(new Set(names).size, RACES.length, `${lang}: 거리 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 거리 이름`);
    const goals = GOALS.map(g => ui.goalName(g.key));
    assert.equal(new Set(goals).size, GOALS.length, `${lang}: 목표 이름이 겹친다`);
    for (const n of goals) assert.ok(n.trim().length > 0, `${lang}: 빈 목표 이름`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = paceFacts(300);
  for (const lang of LANG_CODES) {
    const ui = PACE_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.paceFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 42.195는 이 표의 근거라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.distanceNote.includes('42.195') || ui.distanceNote.includes('42,195'), `${lang}: 풀코스 거리가 적혀 있지 않다`);
  }
});

test('러닝 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.ok(ICON_FOR[PACE_ICON], '이모지가 아이콘으로 이어지지 않는다');
});
