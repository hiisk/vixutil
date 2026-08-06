/**
 * 종이 규격 — 접어서 낸 값을 다른 길로 되짚는다.
 *
 * 치수는 표를 베끼지 않고 맨 위 한 장을 접어 만든다. 그러니 검사는 규격이
 * 실제로 정해 둔 치수를 여기에만 적어 두고 그 옆에 세운다. 넓이와 비처럼
 * 규격이 지키려던 성질도 따로 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, DPIS, GSMS, INCH_SIZES, LETTER_LIMIT_G, MM_PER_INCH, ROOTS, SIZES,
  cellOf, sizeOf, slugOf,
} from '../lib/paper/list.ts';
import { areaOf, envelopeOf, fold, isoSheet, paperFacts, pixelsOf, sheetOf } from '../lib/paper/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return paperFacts(c);
};

test('칸은 규격 35가지 × 해상도 12가지', () => {
  assert.equal(SIZES.length, 35);
  assert.equal(DPIS.length, 12);
  assert.equal(CELLS.length, 420);
  assert.equal(new Set(CELLS.map(slugOf)).size, 420);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.equal(cellOf('a4'), undefined);
  assert.equal(cellOf('a11-300'), undefined);
});

test('규격이 정한 치수와 나란히 선다', () => {
  // 표는 여기에만 둔다 — 계산에는 넣지 않는다
  const ISO: [string, number, number][] = [
    ['a0', 841, 1189], ['a1', 594, 841], ['a2', 420, 594], ['a3', 297, 420], ['a4', 210, 297],
    ['a5', 148, 210], ['a6', 105, 148], ['a7', 74, 105], ['a8', 52, 74], ['a9', 37, 52], ['a10', 26, 37],
    ['b0', 1000, 1414], ['b4', 250, 353], ['b5', 176, 250], ['b6', 125, 176], ['b10', 31, 44],
    ['c0', 917, 1297], ['c4', 229, 324], ['c5', 162, 229], ['c6', 114, 162], ['c8', 57, 81],
  ];
  for (const [key, short, long] of ISO) {
    const size = sizeOf(key);
    assert.ok(size, key);
    assert.deepEqual(sheetOf(size), { short, long }, key);
  }
});

test('접으면 다음 규격이 된다', () => {
  for (const family of Object.keys(ROOTS)) {
    const steps = SIZES.filter(s => s.family === family);
    for (let i = 0; i + 1 < steps.length; i++) {
      const here = sheetOf(steps[i]);
      const next = sheetOf(steps[i + 1]);
      // 긴 변을 반으로 접으면 짧은 변이 되고, 짧은 변이 긴 변이 된다
      assert.deepEqual(next, fold(here), `${steps[i].key} → ${steps[i + 1].key}`);
      assert.equal(next.long, here.short, steps[i].key);
      assert.ok(Math.abs(next.short - here.long / 2) < 1, steps[i].key);
    }
  }
  // A4를 접으면 A5, 펼치면 A3다
  assert.deepEqual(fold(sheetOf(sizeOf('a4')!)), sheetOf(sizeOf('a5')!));
  assert.equal(facts('a4-300').smaller?.key, 'a5');
  assert.equal(facts('a4-300').bigger?.key, 'a3');
  assert.equal(facts('a0-300').bigger, null);
  assert.equal(facts('a10-300').smaller, null);
  // 인치로 정해진 규격은 접어서 만들지 않는다
  assert.equal(facts('letter-300').smaller, null);
});

test('A0은 1제곱미터, 한 단계마다 절반', () => {
  const a0 = areaOf(isoSheet('a', 0));
  assert.ok(Math.abs(a0 - 1) < 0.001, String(a0));
  for (let n = 0; n <= 10; n++) {
    const area = areaOf(isoSheet('a', n));
    // 접을 때마다 넓이가 반이다 — 버린 밀리미터만큼만 어긋난다
    assert.ok(Math.abs(area - 1 / 2 ** n) < 0.01 / 2 ** n + 0.0005, `A${n}: ${area}`);
  }
  // A4 여덟 장을 붙이면 A1 한 장이다
  assert.equal(facts('a4-300').perRoot, 16);
  assert.ok(Math.abs(areaOf(isoSheet('a', 4)) * 16 - 1) < 0.01);
});

test('두 변의 비는 √2다', () => {
  for (const size of SIZES.filter(s => s.family !== null)) {
    const s = sheetOf(size);
    const ratio = s.long / s.short;
    // 작아질수록 버린 밀리미터가 크게 보인다
    assert.ok(Math.abs(ratio - Math.SQRT2) < 0.03, `${size.key}: ${ratio}`);
  }
  assert.equal(facts('a4-300').ratio, 1.414);
  // 복사기의 141%와 71%가 이 비다
  assert.equal(Math.round(Math.SQRT2 * 100), 141);
  assert.equal(Math.round((1 / Math.SQRT2) * 100), 71);
});

test('B는 짧은 변이 1미터, C는 A와 B의 사이', () => {
  assert.equal(ROOTS.b.short, 1000);
  // C0은 A0과 B0의 기하평균이다
  assert.equal(Math.round(Math.sqrt(ROOTS.a.short * ROOTS.b.short)), ROOTS.c.short);
  assert.equal(Math.round(Math.sqrt(ROOTS.a.long * ROOTS.b.long)), ROOTS.c.long);
  // B0도 A0보다 √2배 넓다
  assert.ok(Math.abs(areaOf(ROOTS.b) / areaOf(ROOTS.a) - Math.SQRT2) < 0.002);
});

test('A는 같은 번호의 C 봉투에 들어간다', () => {
  for (const size of SIZES.filter(s => s.family === 'a' && (s.step as number) <= 8)) {
    const env = envelopeOf(size);
    assert.ok(env, size.key);
    const paper = sheetOf(size);
    const e = sheetOf(env);
    assert.ok(e.short >= paper.short && e.long >= paper.long, `${size.key}가 ${env.key}에 안 들어간다`);
    // 한 치수 작은 봉투로는 안 된다
    const smaller = SIZES.find(s => s.family === 'c' && s.step === (env.step as number) + 1);
    if (smaller) {
      const t = sheetOf(smaller);
      assert.ok(t.short < paper.short || t.long < paper.long, `${size.key}가 ${smaller.key}에도 들어간다`);
    }
  }
  assert.equal(facts('a4-300').envelope?.key, 'c4');
  assert.equal(facts('a5-300').envelope?.key, 'c5');
});

test('픽셀은 인치로 바꿔 해상도를 곱한 것', () => {
  for (const c of CELLS) {
    const f = paperFacts(c);
    // 픽셀을 해상도로 나누면 인치가 되고, 25.4를 곱하면 밀리미터로 돌아온다
    const mm = (f.pixels.w / c.dpi) * MM_PER_INCH;
    assert.ok(Math.abs(mm - f.sheet.short) < MM_PER_INCH / c.dpi, `${f.slug}: ${mm} vs ${f.sheet.short}`);
    assert.equal(f.pixels.h, pixelsOf(f.sheet.long, c.dpi), f.slug);
    // 해상도를 두 배로 하면 픽셀은 네 배다
    assert.ok(Math.abs(f.megapixels - (f.pixels.w * f.pixels.h) / 1e6) < 0.01, f.slug);
  }
  // 인쇄소에 넘기는 A4 300dpi가 2480×3508이다
  assert.deepEqual(facts('a4-300').pixels, { w: 2480, h: 3508 });
  assert.deepEqual(facts('a4-72').pixels, { w: 595, h: 842 });
  assert.deepEqual(facts('a3-300').pixels, { w: 3508, h: 4961 });
});

test('인치로 정해진 규격은 곱해서 낸다', () => {
  for (const inch of INCH_SIZES) {
    const s = sheetOf(sizeOf(inch.key)!);
    assert.ok(Math.abs(s.short - inch.w * MM_PER_INCH) < 0.05, inch.key);
    assert.ok(Math.abs(s.long - inch.h * MM_PER_INCH) < 0.05, inch.key);
    const f = paperFacts({ size: sizeOf(inch.key)!, dpi: 300 });
    // 인치로 되돌리면 처음 적은 값이 나온다
    assert.ok(Math.abs(f.inches.short - inch.w) < 0.01, inch.key);
    assert.ok(Math.abs(f.inches.long - inch.h) < 0.01, inch.key);
  }
  assert.deepEqual(sheetOf(sizeOf('letter')!), { short: 215.9, long: 279.4 });
  // 레터는 A4보다 짧고 넓다
  const a4 = sheetOf(sizeOf('a4')!);
  const letter = sheetOf(sizeOf('letter')!);
  assert.ok(letter.short > a4.short && letter.long < a4.long);
});

test('무게는 넓이에 평량을 곱한 것', () => {
  for (const c of CELLS) {
    const f = paperFacts(c);
    assert.equal(f.weights.length, GSMS.length, f.slug);
    for (const w of f.weights) {
      assert.ok(Math.abs(w.grams - areaOf(f.sheet) * w.gsm) < 0.02, `${f.slug} ${w.gsm}g`);
    }
    // 편지 한 통에 들어가는 장수를 되짚으면 한도를 넘지 않는다 — 끊기 전 넓이로 센다
    const exact = areaOf(f.sheet);
    assert.ok(f.lettersheets * exact * 80 <= LETTER_LIMIT_G, f.slug);
    assert.ok((f.lettersheets + 1) * exact * 80 > LETTER_LIMIT_G, f.slug);
  }
  // A4 한 장이 5그램이라는 어림이 여기서 나온다
  assert.equal(facts('a4-300').weights.find(w => w.gsm === 80)?.grams, 4.99);
  assert.equal(facts('a4-300').lettersheets, 5);
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { PAPER_UI } = await import('../lib/paper/ui.ts');
  const { KNOWN } = await import('../lib/paper/list.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const a4 = paperFacts({ size: sizeOf('a4')!, dpi: 300 });
  const letter = paperFacts({ size: sizeOf('letter')!, dpi: 96 });
  const tiny = paperFacts({ size: sizeOf('a10')!, dpi: 72 });
  for (const lang of LANG_CODES) {
    const ui = PAPER_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...[a4, letter, tiny].flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...['a', 'b', 'c', 'inch'].map(k => ui.familyName(k)),
      ...Object.values(KNOWN).map(k => ui.knownName(k)),
      ...['letter', 'legal', 'tabloid', 'executive'].map(k => ui.sizeName(k)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('인치 규격 이름이 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { PAPER_UI } = await import('../lib/paper/ui.ts');
  const { KNOWN } = await import('../lib/paper/list.ts');
  for (const lang of LANG_CODES) {
    const ui = PAPER_UI[lang];
    const groups: [string, string[], (k: string) => string][] = [
      ['계열', ['a', 'b', 'c', 'inch'], ui.familyName],
      ['쓰임', [...new Set(Object.values(KNOWN))], ui.knownName],
    ];
    for (const [name, keys, fn] of groups) {
      const named = keys.map(k => fn(k));
      assert.equal(new Set(named).size, keys.length, `${lang}: ${name} 이름이 겹친다`);
      for (let i = 0; i < keys.length; i++) assert.notEqual(named[i], keys[i], `${lang}: ${name} ${keys[i]} 번역이 없다`);
    }
    // ISO 규격은 어느 언어에서나 A4다
    assert.equal(ui.sizeName('a4'), 'A4', lang);
    // 인치 규격은 이름이 따로 있어야 한다 — 열쇠를 그대로 대문자로 올린 것은 번역이 아니다
    for (const key of INCH_SIZES.map(i => i.key)) {
      assert.notEqual(ui.sizeName(key), key.toUpperCase(), `${lang}: ${key} 이름이 없다`);
    }
  }
  // 이름 붙인 규격은 실제로 있는 규격이어야 한다
  for (const key of Object.keys(KNOWN)) assert.ok(sizeOf(key), `${key}는 목록에 없는 규격이다`);
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { PAPER_UI } = await import('../lib/paper/ui.ts');
  const f = paperFacts({ size: sizeOf('a4')!, dpi: 300 });
  for (const lang of LANG_CODES) {
    const ui = PAPER_UI[lang];
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
    // 접어서 나온다는 것과 A0이 1제곱미터라는 것 — 이 표의 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.foldNote.length >= floor * 6, `${lang}: 접기 설명이 짧다`);
    assert.ok(ui.rootNote.length >= floor * 6, `${lang}: A0 설명이 짧다`);
  }
});

test('종이 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { PAPER_ICON } = await import('../lib/paper/list.ts');
  assert.equal(ICON_FOR[PAPER_ICON], 'doc', '이모지가 아이콘으로 이어지지 않는다');
});
