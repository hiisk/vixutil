/**
 * 드릴 비트 표가 스스로 어긋나지 않는지 본다.
 *
 * 계열마다 지름을 정하는 방식이 달라서, 검사도 계열마다 다른 길로 되짚는다 —
 * 인치 계열은 64분의 몇을 곱해 되돌리고, 번호·문자 계열은 인치 값을 25.4로
 * 되돌린다. 그리고 세 계열 모두 번호가 커질수록(혹은 문자가 뒤로 갈수록)
 * 굵기가 한 방향으로만 가야 한다.
 *
 * 나사와의 연결도 계산이다. 이 비트로 탭을 낼 수 있다고 적은 나사는 실제로
 * /screw가 낸 탭 드릴 지름이 그 비트와 맞아야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { BITS, DRILL_ICON, DRILL_SLUGS, KINDS, bitOf, slugOf } from '../lib/drill/list.ts';
import { byDiameter, drillFacts, ofKind, reduceFraction } from '../lib/drill/facts.ts';
import { screwFacts } from '../lib/screw/facts.ts';
import { SCREWS, labelOf as screwLabel } from '../lib/screw/list.ts';
import { DRILL_UI } from '../lib/drill/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(BITS.length >= 100, `${BITS.length}가지뿐이다`);
  assert.equal(new Set(DRILL_SLUGS).size, BITS.length, 'slug 중복');
  assert.equal(new Set(BITS.map(b => `${b.kind}:${b.name}`)).size, BITS.length, '같은 계열에 같은 이름이 둘이다');
  assert.equal(ofKind('fraction').length, 64, '1/64부터 64/64까지');
  assert.equal(ofKind('number').length, 40, '#1부터 #40까지');
  assert.equal(ofKind('letter').length, 26, 'A부터 Z까지');
  for (const k of KINDS) assert.ok(ofKind(k).length > 0, `${k}: 비어 있다`);
});

test('주소와 비트가 서로를 되돌린다', () => {
  for (const b of BITS) {
    assert.deepEqual(bitOf(slugOf(b)), b, `${slugOf(b)}: 되읽으면 다른 비트가 나온다`);
    assert.ok(!slugOf(b).includes('/'), `${slugOf(b)}: 주소에 빗금이 들어갔다`);
    assert.ok(!slugOf(b).includes('.'), `${slugOf(b)}: 주소에 점이 들어갔다`);
  }
  assert.equal(slugOf({ kind: 'metric', name: '6.5', mm: 6.5 }), 'm6-5');
  assert.equal(slugOf({ kind: 'fraction', name: '16/64', mm: 6.35 }), 'f16-64');
  assert.equal(slugOf({ kind: 'number', name: '#21', mm: 4.039 }), 'n21');
  assert.equal(slugOf({ kind: 'letter', name: 'F', mm: 6.528 }), 'lF');
});

test('인치 계열을 64분법으로 되돌린다', () => {
  for (const b of ofKind('fraction')) {
    const n = Number(b.name.split('/')[0]);
    assert.ok(Math.abs(b.mm - (n / 64) * 25.4) < 0.001, `${b.name}: 지름이 ${b.mm}mm다`);
  }
  assert.equal(ofKind('fraction')[63].mm, 25.4, '64/64는 1인치다');
  // 약분해서 부르는 이름
  assert.equal(reduceFraction('16/64'), '1/4');
  assert.equal(reduceFraction('32/64'), '1/2');
  assert.equal(reduceFraction('1/64'), '1/64');
  assert.equal(reduceFraction('64/64'), '1/1');
  assert.equal(reduceFraction('6.5'), null, '미터 계열은 분수가 아니다');
});

test('번호와 문자가 한 방향으로만 굵어진다', () => {
  // 번호는 클수록 가늘다
  const numbers = BITS.filter(b => b.kind === 'number').sort((a, b) => Number(a.name.slice(1)) - Number(b.name.slice(1)));
  for (let i = 1; i < numbers.length; i++) {
    assert.ok(numbers[i].mm < numbers[i - 1].mm, `${numbers[i].name}: 앞 번호보다 굵다`);
  }
  // 문자는 뒤로 갈수록 굵다
  const letters = BITS.filter(b => b.kind === 'letter').sort((a, b) => a.name.localeCompare(b.name));
  for (let i = 1; i < letters.length; i++) {
    assert.ok(letters[i].mm > letters[i - 1].mm, `${letters[i].name}: 앞 문자보다 가늘다`);
  }
  // 문자 A는 번호 #1보다 굵다 — 두 계열이 이어진다
  assert.ok(letters[0].mm > numbers[0].mm, '문자 계열이 번호 계열 위를 잇는다');
});

test('인치 값을 25.4로 되돌린다', () => {
  for (const b of BITS) {
    const f = drillFacts(b);
    assert.ok(Math.abs(f.inch * 25.4 - b.mm) < 0.002, `${b.name}: 인치를 되돌리면 ${f.inch * 25.4}mm다`);
    // 단면적은 지름의 제곱에 비례한다
    assert.ok(Math.abs(f.area - (Math.PI / 4) * b.mm ** 2) < 0.02, `${b.name}: 단면적이 어긋난다`);
  }
  assert.equal(drillFacts(bitOf('f16-64')!).inch, 0.25, '16/64는 0.25인치다');
  assert.equal(drillFacts(bitOf('n21')!).inch, 0.159, '#21은 0.159인치다');
});

test('다른 계열에서 가장 가까운 비트를 고른다', () => {
  for (const b of BITS) {
    const f = drillFacts(b);
    assert.equal(f.near.length, KINDS.length - 1, `${b.name}: 다른 계열이 셋이 아니다`);
    for (const n of f.near) {
      assert.notEqual(n.kind, b.kind, `${b.name}: 같은 계열이 섞였다`);
      // 정말 그 계열에서 가장 가까운지 되짚는다
      const best = Math.min(...ofKind(n.kind).map(o => Math.abs(o.mm - b.mm)));
      assert.ok(Math.abs(Math.abs(n.mm - b.mm) - best) < 0.001, `${b.name}: ${n.kind}에 더 가까운 것이 있다`);
      assert.ok(Math.abs(n.diff - (n.mm - b.mm)) < 0.001, `${b.name}: 차이가 어긋난다`);
    }
  }
  // 1/4인치는 E 드릴과 정확히 같다
  const quarter = drillFacts(bitOf('f16-64')!);
  assert.equal(quarter.near.find(n => n.kind === 'letter')!.name, 'E');
  assert.equal(quarter.near.find(n => n.kind === 'letter')!.diff, 0);
});

test('탭 드릴 연결이 나사 섹션과 맞는다', () => {
  for (const b of BITS) {
    for (const t of drillFacts(b).taps) {
      const screw = SCREWS.find(s => screwLabel(s) === t.label);
      assert.ok(screw, `${b.name}: ${t.label}이라는 나사가 없다`);
      // /screw가 낸 탭 드릴 지름과 같아야 한다
      assert.equal(t.tapDrill, screwFacts(screw!).tapDrill, `${b.name} ${t.label}: 탭 드릴이 다르다`);
      assert.ok(Math.abs(t.diff) <= 0.15, `${b.name} ${t.label}: 0.15mm를 넘게 벌어졌다`);
    }
  }
  // 널리 쓰는 짝 — 이 넷이 빠지면 표가 쓸모를 잃는다
  const tapOf = (slug: string) => drillFacts(bitOf(slug)!).taps.map(t => t.label);
  assert.ok(tapOf('m2-5').includes('M3×0.5'), '2.5mm는 M3의 탭 드릴이다');
  assert.ok(tapOf('m3-3').includes('M4×0.7'), '3.3mm는 M4의 탭 드릴이다');
  assert.ok(tapOf('m5').includes('M6×1'), '5mm는 M6의 탭 드릴이다');
  assert.ok(tapOf('m6-8').includes('M8×1.25'), '6.8mm는 M8의 탭 드릴이다');
  assert.ok(tapOf('m10-2').includes('M12×1.75'), '10.2mm는 M12의 탭 드릴이다');
});

test('지름 순으로 늘어놓으면 계열이 섞인다', () => {
  const sorted = byDiameter();
  assert.equal(sorted.length, BITS.length);
  for (let i = 1; i < sorted.length; i++) {
    assert.ok(sorted[i].mm >= sorted[i - 1].mm, '지름 순서가 아니다');
  }
  // 한 계열만으로는 채워지지 않는다 — 가운데 어딘가에서 반드시 계열이 바뀐다
  const middle = sorted.slice(40, 80).map(b => b.kind);
  assert.ok(new Set(middle).size > 1, '가운데가 한 계열뿐이다');
  for (const b of BITS) {
    const f = drillFacts(b);
    if (f.smaller) assert.ok(f.smaller.mm <= b.mm, `${b.name}: 더 가는 쪽이 굵다`);
    if (f.larger) assert.ok(f.larger.mm >= b.mm, `${b.name}: 더 굵은 쪽이 가늘다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = drillFacts(bitOf('m6-8')!);
  for (const lang of LANG_CODES) {
    const ui = DRILL_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.drillFaq(f).flatMap(q => [q.q, q.a]),
      ...KINDS.map(k => ui.kindName(k)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('계열 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const names = KINDS.map(k => DRILL_UI[lang].kindName(k));
    assert.equal(new Set(names).size, KINDS.length, `${lang}: 계열 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 계열 이름`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = drillFacts(bitOf('m6-8')!);
  for (const lang of LANG_CODES) {
    const ui = DRILL_UI[lang];
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
    assert.equal(ui.drillFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 번호 계열에 규칙이 없다는 것은 이 표의 전제라 빠지면 안 된다
    assert.ok(ui.numberNote.length >= floor * 4, `${lang}: 번호 계열 설명이 짧다`);
  }
});

test('나사 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[DRILL_ICON], 'tools', '이모지가 공구 아이콘으로 이어지지 않는다');
});
