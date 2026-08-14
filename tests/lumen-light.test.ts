/**
 * 조명 — 계산한 값을 다른 길로 되짚는다.
 *
 * 루멘은 밝기에 넓이를 곱한 것이므로 나눠서 되돌리고, 와트는 효율로 나눈
 * 것이므로 곱해서 되돌린다. 순서가 거꾸로 되면(와트에서 밝기를 정하면)
 * 광원이 바뀔 때마다 답이 달라지므로, 그것도 검사로 못 박는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AREAS, BULB_LUMEN, CELLS, PYEONG, SOURCES, USES, cellOf, slugOf, usageOf,
} from '../lib/lumen/list.ts';
import { atArea, atUse, lumenFacts, lumenOf, wattOf } from '../lib/lumen/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return lumenFacts(c);
};

test('칸은 넓이 20가지 × 쓰임 12가지', () => {
  assert.equal(AREAS.length, 20);
  assert.equal(USES.length, 12);
  assert.equal(CELLS.length, 240);
  assert.equal(new Set(CELLS.map(slugOf)).size, 240);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.equal(cellOf('20'), undefined);
  assert.equal(cellOf('21-living'), undefined);
  // 두 목록 다 오름차순이어야 앞뒤 칸이 뜻을 가진다
  assert.deepEqual([...AREAS].sort((a, b) => a - b), AREAS);
  assert.deepEqual([...USES].sort((a, b) => a.lux - b.lux), USES);
});

test('필요한 빛은 밝기에 넓이를 곱한 것', () => {
  for (const c of CELLS) {
    const f = lumenFacts(c);
    // 루멘을 넓이로 나누면 그 쓰임의 럭스가 도로 나온다
    assert.equal(f.lumen / c.area, f.lux, f.slug);
    assert.equal(f.lux, usageOf(c.use)!.lux, f.slug);
  }
  // 20제곱미터 거실은 150럭스 × 20 = 3000루멘
  assert.equal(facts('20-living').lumen, 3000);
  assert.equal(facts('10-study').lumen, 5000);
  // 넓이가 두 배면 필요한 빛도 두 배다
  assert.equal(lumenOf(150, 40), lumenOf(150, 20) * 2);
});

test('와트는 효율로 나눈 뒤에 나온다', () => {
  for (const c of CELLS) {
    const f = lumenFacts(c);
    for (const w of f.watts) {
      // 와트에 효율을 도로 곱하면 루멘이 된다
      assert.ok(Math.abs(w.watt * w.efficacy - f.lumen) <= w.efficacy * 0.05 + 1e-9, `${f.slug} ${w.key}: ${w.watt}`);
      assert.equal(w.efficacy, SOURCES.find(s => s.key === w.key)!.efficacy, f.slug);
    }
    // 효율이 높은 광원일수록 적은 와트로 같은 밝기를 낸다
    for (let i = 0; i + 1 < f.watts.length; i++) {
      assert.ok(f.watts[i].efficacy > f.watts[i + 1].efficacy, f.slug);
      assert.ok(f.watts[i].watt <= f.watts[i + 1].watt, f.slug);
    }
  }
  // 3000루멘을 LED는 30W로, 백열은 231W로 낸다
  assert.equal(facts('20-living').watts.find(w => w.key === 'led')?.watt, 30);
  assert.equal(facts('20-living').watts.find(w => w.key === 'incandescent')?.watt, 230.8);
  assert.equal(wattOf(800, 13), 800 / 13);
});

test('LED와 백열의 차이가 곧 낭비다', () => {
  for (const c of CELLS) {
    const f = lumenFacts(c);
    const led = f.watts.find(w => w.key === 'led')!;
    const bulb = f.watts.find(w => w.key === 'incandescent')!;
    assert.ok(Math.abs(f.wasted - (wattOf(f.lumen, bulb.efficacy) - wattOf(f.lumen, led.efficacy))) <= 0.5, f.slug);
    // 효율 비만큼 차이가 난다 — 100 나누기 13은 일곱 배가 넘는다.
    // 작은 방은 와트가 소수 첫째 자리에서 끊겨 비가 흔들리므로 끊기 전 값으로 견준다
    const ratio = wattOf(f.lumen, bulb.efficacy) / wattOf(f.lumen, led.efficacy);
    assert.ok(Math.abs(ratio - 100 / 13) < 1e-9, f.slug);
  }
  assert.equal(facts('20-living').wasted, 201);
});

test('전구 개수는 모자라지 않게 올린다', () => {
  for (const c of CELLS) {
    const f = lumenFacts(c);
    // 그 개수면 필요한 빛을 넘고, 한 개 빼면 모자란다
    assert.ok(f.bulbs * BULB_LUMEN >= f.lumen, f.slug);
    assert.ok((f.bulbs - 1) * BULB_LUMEN < f.lumen, f.slug);
  }
  assert.equal(BULB_LUMEN, 800);
  assert.equal(facts('20-living').bulbs, 4);
  assert.equal(facts('3-hall').bulbs, 1);
});

test('평 환산은 되돌아온다', () => {
  for (const c of CELLS) {
    const f = lumenFacts(c);
    // 평에 3.3058을 도로 곱하면 제곱미터다
    assert.ok(Math.abs(f.pyeong * PYEONG - c.area) < PYEONG * 0.05 + 1e-9, `${f.slug}: ${f.pyeong}`);
  }
  assert.equal(facts('33-living').pyeong, 10);
  assert.ok(Math.abs(PYEONG - 3.3058) < 1e-9);
});

test('한 달 전기 사용량', () => {
  for (const c of CELLS) {
    const f = lumenFacts(c);
    const led = f.watts.find(w => w.key === 'led')!;
    // 하루 다섯 시간 × 서른 날을 되짚으면 그 와트가 나온다
    const back = (f.monthlyKwh * 1000) / (5 * 30);
    assert.ok(Math.abs(back - led.watt) <= Math.max(led.watt * 0.05, 0.4), `${f.slug}: ${back} vs ${led.watt}`);
  }
  assert.equal(facts('20-living').monthlyKwh, 4.5);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  // 계단(120lux)과 사무 공간(400lux)이 사이에 들어오면서 이웃이 바뀌었다
  const f = facts('20-living');
  assert.equal(f.brighter?.use, 'bath');
  assert.equal(f.dimmer?.use, 'stairs');
  assert.equal(f.bigger?.area, 23);
  assert.equal(f.smaller?.area, 17);
  assert.equal(facts('3-storage').dimmer, null);
  assert.equal(facts('3-storage').smaller, null);
  assert.equal(facts('80-surgery').brighter, null);
  assert.equal(facts('80-surgery').bigger, null);
  for (const c of CELLS) {
    const g = lumenFacts(c);
    if (g.brighter) assert.ok(lumenFacts(cellOf(g.brighter.slug)!).lumen > g.lumen, g.slug);
    if (g.bigger) assert.ok(lumenFacts(cellOf(g.bigger.slug)!).lumen > g.lumen, g.slug);
  }
});

test('한 줄씩 뽑는 것이 목록과 맞는다', () => {
  assert.equal(atArea(20).length, USES.length);
  assert.equal(atUse('living').length, AREAS.length);
  for (const c of atArea(20)) assert.equal(c.area, 20);
  for (const c of atUse('living')) assert.equal(c.use, 'living');
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { LUMEN_UI } = await import('../lib/lumen/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [lumenFacts({ area: 20, use: 'living' }), lumenFacts({ area: 3, use: 'hall' }), lumenFacts({ area: 80, use: 'detail' })];
  for (const lang of LANG_CODES) {
    const ui = LUMEN_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...USES.map(u => ui.useName(u.key)),
      ...SOURCES.map(s => ui.sourceName(s.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('이름 붙은 열쇠가 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { LUMEN_UI } = await import('../lib/lumen/ui.ts');
  for (const lang of LANG_CODES) {
    const ui = LUMEN_UI[lang];
    const uses = USES.map(u => ui.useName(u.key));
    assert.equal(new Set(uses).size, USES.length, `${lang}: 쓰임 이름이 겹친다`);
    // 열쇠가 영어 낱말이라, 라틴 글자를 쓰는 언어에서는 같은 낱말이 정답일 수 있다
    // (프랑스어 fluorescent가 그렇다). 글자가 아예 다른 다섯에서만 미번역을 잡는다
    const OTHER_SCRIPT = ['ko', 'ja', 'hi', 'zh', 'tw'];
    if (OTHER_SCRIPT.includes(lang)) for (const u of USES) assert.notEqual(ui.useName(u.key), u.key, `${lang}: ${u.key} 번역이 없다`);
    const sources = SOURCES.map(s => ui.sourceName(s.key));
    assert.equal(new Set(sources).size, SOURCES.length, `${lang}: 광원 이름이 겹친다`);
    // LED는 어느 언어에서나 LED다 — 나머지 셋만 이름이 따로 있어야 한다
    if (OTHER_SCRIPT.includes(lang)) for (const s of SOURCES.filter(x => x.key !== 'led')) {
      assert.notEqual(ui.sourceName(s.key), s.key, `${lang}: ${s.key} 번역이 없다`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { LUMEN_UI } = await import('../lib/lumen/ui.ts');
  const f = lumenFacts({ area: 20, use: 'living' });
  for (const lang of LANG_CODES) {
    const ui = LUMEN_UI[lang];
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
    // 와트가 밝기가 아니라는 것과 럭스가 바닥 기준이라는 것 — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.wattNote.length >= floor * 6, `${lang}: 와트 설명이 짧다`);
    assert.ok(ui.luxNote.length >= floor * 6, `${lang}: 럭스 설명이 짧다`);
  }
});

test('전구 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { LUMEN_ICON } = await import('../lib/lumen/list.ts');
  assert.equal(ICON_FOR[LUMEN_ICON], 'bulb', '이모지가 아이콘으로 이어지지 않는다');
});
