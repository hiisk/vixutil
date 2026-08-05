/**
 * 가전 전류 — 계산한 값을 다른 길로 되짚는다.
 *
 * 전류는 와트를 전압으로 나눈 것이므로 곱해서 되돌리고, 동시 사용 대수는
 * 그 대수만큼 다시 더해 한도 안에 드는지 본다. 굵기는 /wire가 이미 계산해
 * 둔 값을 그대로 쓰므로, 그쪽 표를 훑어 다시 골라 맞춰 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  APPLIANCES, CELLS, CIRCUITS, CONTINUOUS, STRIP_AMP,
  applianceOf, cellOf, circuitOf, slugOf,
} from '../lib/ampere/list.ts';
import { ampOf, ampereFacts, wireFor } from '../lib/ampere/facts.ts';
import { ampacityOf, areaOf } from '../lib/wire/facts.ts';
import { SIZES, sizeLabel } from '../lib/wire/list.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return ampereFacts(c);
};

test('칸은 가전 20가지 × 회로 8가지', () => {
  assert.equal(APPLIANCES.length, 20);
  assert.equal(CIRCUITS.length, 8);
  assert.equal(CELLS.length, 160);
  assert.equal(new Set(CELLS.map(slugOf)).size, 160);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.equal(cellOf('kettle'), undefined);
  assert.equal(cellOf('kettle-kr99'), undefined);
  // 소비전력이 오름차순이어야 앞뒤 칸이 뜻을 가진다
  assert.deepEqual([...APPLIANCES].sort((a, b) => a.watt - b.watt), APPLIANCES);
  assert.equal(new Set(APPLIANCES.map(a => a.watt)).size, APPLIANCES.length, '소비전력이 같은 가전이 둘 있다');
  // 회로는 전압 차례다 — 그래야 앞뒤 칸이 "전압을 올리면"이라는 뜻이 된다
  assert.deepEqual([...CIRCUITS].sort((a, b) => a.volt - b.volt || a.amp - b.amp), CIRCUITS);
});

test('전류에 전압을 도로 곱하면 소비전력이 된다', () => {
  for (const c of CELLS) {
    const f = ampereFacts(c);
    const back = f.amp * f.volt;
    // 전류를 두 자리에서 끊었으므로 그만큼은 어긋난다
    assert.ok(Math.abs(back - f.watt) <= f.volt * 0.005 + 1e-9, `${f.slug}: ${back} vs ${f.watt}`);
    assert.equal(f.watt, applianceOf(c.key)!.watt, f.slug);
    assert.equal(f.volt, circuitOf(c.circuit)!.volt, f.slug);
  }
  // 같은 드라이어가 120V에서는 220V의 거의 두 배를 먹는다
  const kr = facts('dryer-kr16');
  const us = facts('dryer-us15');
  assert.ok(Math.abs(us.amp / kr.amp - 220 / 120) < 0.01, `${us.amp} / ${kr.amp}`);
  assert.equal(ampOf(2200, 220), 10);
});

test('이어 쓰는 한도는 차단기의 여덟 할이다', () => {
  for (const c of CELLS) {
    const f = ampereFacts(c);
    assert.ok(Math.abs(f.budget - f.breaker * CONTINUOUS) < 0.005, f.slug);
    // 그 대수만큼 더하면 한도 안이고, 한 대 더하면 넘는다
    const exact = ampOf(f.watt, f.volt);
    assert.ok(f.together * exact <= f.breaker * CONTINUOUS + 1e-9, f.slug);
    assert.ok((f.together + 1) * exact > f.breaker * CONTINUOUS, f.slug);
    // 한 대도 못 꽂으면 그것이 과부하다
    assert.equal(f.overload, f.together === 0, f.slug);
  }
  assert.equal(CONTINUOUS, 0.8);
  // 1600W 드라이어는 북미 15A 회로 하나를 혼자 넘긴다
  assert.equal(facts('dryer-us15').overload, true);
  assert.equal(facts('dryer-us20').overload, false);
  assert.equal(facts('dryer-kr16').overload, false);
});

test('멀티탭은 암페어로 견딘다', () => {
  for (const c of CELLS) {
    const f = ampereFacts(c);
    assert.equal(f.stripOk, ampOf(f.watt, f.volt) <= STRIP_AMP, f.slug);
  }
  assert.equal(STRIP_AMP, 15);
  // 같은 인덕션이 220V에서는 멀티탭에 들지만 100V에서는 안 든다
  assert.equal(facts('induction-kr16').stripOk, true);
  assert.equal(facts('induction-jp15').stripOk, false);
});

test('굵기는 전선 쪽에서 다시 골라 맞춘다', () => {
  for (const c of CELLS) {
    const f = ampereFacts(c);
    const chosen = SIZES.find(s => sizeLabel(s) === f.wire);
    assert.ok(chosen, `${f.slug}: ${f.wire}가 전선 목록에 없다`);
    const exact = ampOf(f.watt, f.volt);
    // 고른 굵기는 이 전류를 감당하고
    assert.ok(ampacityOf(areaOf(chosen)) >= exact, `${f.slug}: ${f.wire}`);
    // 그보다 가는 것은 하나도 감당하지 못한다
    const thinner = SIZES.filter(s => areaOf(s) < areaOf(chosen));
    for (const t of thinner) assert.ok(ampacityOf(areaOf(t)) < exact, `${f.slug}: ${sizeLabel(t)}로도 된다`);
  }
  // 13.3A를 흘리려면 AWG 14는 돼야 한다
  assert.equal(wireFor(13.33), 'AWG 14');
  assert.equal(facts('purifier-jp15').wire, 'AWG 24');
});

test('한 달 전기 사용량', () => {
  for (const c of CELLS) {
    const f = ampereFacts(c);
    // 하루 두 시간 × 서른 날을 되짚으면 그 와트가 나온다
    const back = (f.monthlyKwh * 1000) / (2 * 30);
    assert.ok(Math.abs(back - f.watt) <= Math.max(f.watt * 0.02, 2), `${f.slug}: ${back} vs ${f.watt}`);
    // 전압이 달라도 전기 사용량은 같다 — 와트에서만 나온다
    assert.equal(f.monthlyKwh, ampereFacts({ key: c.key, circuit: 'us15' }).monthlyKwh, f.slug);
  }
  assert.equal(facts('kettle-kr16').monthlyKwh, 120);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('kettle-kr16');
  assert.equal(f.stronger?.key, 'heater');
  assert.equal(f.weaker?.key, 'aircon');
  assert.equal(f.bigger?.circuit, 'kr20');
  assert.equal(f.smaller?.circuit, 'us20');
  assert.equal(facts('purifier-jp15').weaker, null);
  assert.equal(facts('purifier-jp15').smaller, null);
  assert.equal(facts('induction-us30').stronger, null);
  assert.equal(facts('induction-us30').bigger, null);
  for (const c of CELLS) {
    const g = ampereFacts(c);
    // 소비전력이 큰 가전으로 옮기면 전류도 오른다 — 같은 와트가 둘이면 이 검사가 못 잡으므로
    // 목록에 같은 값이 없다는 것부터 본다
    if (g.stronger) assert.ok(ampereFacts(cellOf(g.stronger.slug)!).amp > g.amp, g.slug);
  }
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { AMPERE_UI } = await import('../lib/ampere/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [ampereFacts({ key: 'dryer', circuit: 'us15' }), ampereFacts({ key: 'purifier', circuit: 'jp15' }), ampereFacts({ key: 'induction', circuit: 'kr32' })];
  for (const lang of LANG_CODES) {
    const ui = AMPERE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...APPLIANCES.map(a => ui.applianceName(a.key)),
      ...CIRCUITS.map(c => ui.circuitName(c.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('가전 이름이 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { AMPERE_UI } = await import('../lib/ampere/ui.ts');
  // 열쇠가 영어 낱말이라 라틴 글자권에서는 같은 낱말이 정답일 수 있다
  const OTHER_SCRIPT = ['ko', 'ja', 'hi', 'zh', 'tw'];
  for (const lang of LANG_CODES) {
    const ui = AMPERE_UI[lang];
    const names = APPLIANCES.map(a => ui.applianceName(a.key));
    assert.equal(new Set(names).size, APPLIANCES.length, `${lang}: 가전 이름이 겹친다`);
    const circuits = CIRCUITS.map(c => ui.circuitName(c.key));
    assert.equal(new Set(circuits).size, CIRCUITS.length, `${lang}: 회로 이름이 겹친다`);
    if (OTHER_SCRIPT.includes(lang)) {
      for (const a of APPLIANCES) assert.notEqual(ui.applianceName(a.key), a.key, `${lang}: ${a.key} 번역이 없다`);
    }
    // 회로 이름은 어느 언어에서나 전압과 차단기를 담는다
    for (const c of CIRCUITS) {
      assert.match(ui.circuitName(c.key), new RegExp(String(c.volt)), `${lang}: ${c.key}에 전압이 없다`);
      assert.match(ui.circuitName(c.key), new RegExp(String(c.amp)), `${lang}: ${c.key}에 차단기가 없다`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { AMPERE_UI } = await import('../lib/ampere/ui.ts');
  const f = ampereFacts({ key: 'kettle', circuit: 'kr16' });
  for (const lang of LANG_CODES) {
    const ui = AMPERE_UI[lang];
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
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 암페어로 묻는다는 것과 전압이 답을 바꾼다는 것 — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.ampNote.length >= floor * 6, `${lang}: 전류 설명이 짧다`);
    assert.ok(ui.voltNote.length >= floor * 6, `${lang}: 전압 설명이 짧다`);
  }
});

test('번개 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { AMPERE_ICON } = await import('../lib/ampere/list.ts');
  assert.equal(ICON_FOR[AMPERE_ICON], 'bolt', '이모지가 아이콘으로 이어지지 않는다');
});
