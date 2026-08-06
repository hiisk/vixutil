/**
 * 옷 사이즈 — 계산한 값을 다른 길로 되짚는다.
 *
 * 여성 호수는 표가 아니라 수식이라, 호수에서 몸으로 되돌려 원래 치수가
 * 나오는지 본다. 44·55·66이 왜 그 숫자인지가 그 수식 안에 있다 —
 * 55가 키 155cm·가슴 85cm이고 한 호수마다 가슴 3cm·키 5cm씩 움직인다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, CM_PER_INCH, GROUPS, INTL, M_TOP_STEP,
  W_BASE_BUST, W_BASE_HEIGHT, W_BASE_SIZE, W_BUST_STEP, W_HEIGHT_STEP, W_LABEL_STEP,
  cellOf, groupOf, slugOf,
} from '../lib/size/list.ts';
import { inchOf, menTopSizeOf, sizeFacts, womenBodyOf, womenSizeOf } from '../lib/size/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return sizeFacts(c);
};

test('칸은 대상 5가지에 걸쳐 100개', () => {
  assert.equal(GROUPS.length, 5);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (const g of GROUPS) {
    assert.ok(g.values.length > 0, g.key);
    // 눈금이 고르다 — 하나라도 어긋나면 앞뒤 칸이 뜻을 잃는다
    const step = g.values[1] - g.values[0];
    for (let i = 1; i < g.values.length; i++) assert.equal(g.values[i] - g.values[i - 1], step, g.key);
  }
  assert.equal(cellOf('wtop'), undefined);
  assert.equal(cellOf('wtop-85'), undefined);
});

test('55는 키 155cm·가슴 85cm를 뜻한다', () => {
  // 1981년 표준이 그때의 평균을 55로 삼았다
  assert.deepEqual(womenBodyOf(W_BASE_SIZE), { bust: W_BASE_BUST, height: W_BASE_HEIGHT });
  assert.deepEqual(womenBodyOf(55), { bust: 85, height: 155 });
  // 한 호수마다 가슴 3cm, 키 5cm, 표기는 11씩
  assert.deepEqual(womenBodyOf(66), { bust: 88, height: 160 });
  assert.deepEqual(womenBodyOf(44), { bust: 82, height: 150 });
  assert.deepEqual(womenBodyOf(77), { bust: 91, height: 165 });
  assert.equal(W_LABEL_STEP, 11);
  assert.equal(W_BUST_STEP, 3);
  assert.equal(W_HEIGHT_STEP, 5);
  for (const size of [44, 55, 66, 77, 88]) {
    const body = womenBodyOf(size);
    // 그 몸을 다시 호수로 바꾸면 제자리로 온다
    assert.equal(womenSizeOf(body.bust), size, String(size));
  }
});

test('남성 상의는 호수가 곧 가슴둘레다', () => {
  assert.equal(menTopSizeOf(100), 100);
  assert.equal(menTopSizeOf(96), 95);
  assert.equal(menTopSizeOf(98), 100);
  for (const c of CELLS.filter(x => x.key === 'mtop')) {
    const f = sizeFacts(c);
    const size = Number(f.korea);
    // 호수는 5 눈금 위에 있고, 실제 가슴둘레와 반 눈금 이상 떨어지지 않는다
    assert.equal(size % M_TOP_STEP, 0, f.slug);
    assert.ok(Math.abs(size - c.cm) <= M_TOP_STEP / 2, `${f.slug}: ${size} vs ${c.cm}`);
  }
  // 100은 가슴 100cm — 여성 호수와 자가 다르다
  assert.equal(facts('mtop-100').korea, '100');
  assert.equal(facts('wtop-100').korea, '110');
});

test('하의는 인치로 부른다', () => {
  assert.equal(CM_PER_INCH, 2.54);
  for (const c of CELLS) {
    const f = sizeFacts(c);
    // 인치에 2.54를 도로 곱하면 센티미터다
    assert.ok(Math.abs(f.inch * CM_PER_INCH - c.cm) <= CM_PER_INCH * 0.05 + 1e-9, `${f.slug}: ${f.inch}`);
    if (c.key !== 'mbottom') continue;
    // 남성 하의 호수는 그 인치를 반올림한 값이다
    assert.equal(Number(f.korea), Math.round(inchOf(c.cm)), f.slug);
  }
  // 허리 80cm면 31인치다
  assert.equal(facts('mbottom-80').korea, '31');
});

test('아동복 호수는 곧 키다', () => {
  for (const c of CELLS.filter(x => x.key === 'kids')) {
    const f = sizeFacts(c);
    assert.equal(Number(f.korea), c.cm, f.slug);
    assert.equal(groupOf('kids')!.measure, 'height');
  }
  assert.equal(facts('kids-130').korea, '130');
});

test('국제 표기는 호수 차례를 따라간다', () => {
  const order = (s: string) => INTL.indexOf(s as (typeof INTL)[number]);
  for (const g of GROUPS.filter(x => x.key !== 'kids')) {
    let last = -1;
    for (const cm of g.values) {
      const i = order(sizeFacts({ key: g.key, cm }).intl);
      assert.ok(i >= 0, `${g.key}-${cm}`);
      // 치수가 오르면 표기도 오르거나 그대로다 — 내려가면 안 된다
      assert.ok(i >= last, `${g.key}-${cm}`);
      last = i;
    }
  }
  // 여성 55는 S, 66은 M, 남성 95는 M, 100은 L
  assert.equal(facts('wtop-84').intl, 'S');
  assert.equal(facts('wtop-88').intl, 'M');
  assert.equal(facts('mtop-96').intl, 'M');
  assert.equal(facts('mtop-100').intl, 'L');
});

test('여성 낱장은 그 호수가 상정한 몸을 함께 보여 준다', () => {
  for (const c of CELLS) {
    const f = sizeFacts(c);
    const women = c.key === 'wtop' || c.key === 'wbottom';
    assert.equal(f.assumes !== null, women, f.slug);
    if (!f.assumes) continue;
    // 적어 둔 몸을 호수로 되돌리면 그 호수가 나온다
    assert.equal(womenSizeOf(f.assumes.bust), Number(f.korea), f.slug);
  }
  assert.deepEqual(facts('wtop-88').assumes, { bust: 88, height: 160 });
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('wtop-88');
  assert.equal(f.bigger?.cm, 90);
  assert.equal(f.smaller?.cm, 86);
  assert.equal(facts('wtop-76').smaller, null);
  assert.equal(facts('wtop-106').bigger, null);
  for (const c of CELLS) {
    const g = sizeFacts(c);
    // 같은 대상 안에서만 움직인다
    if (g.bigger) assert.equal(g.bigger.key, c.key, g.slug);
    if (g.bigger) assert.ok(g.bigger.cm > c.cm, g.slug);
  }
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { SIZE_UI } = await import('../lib/size/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [sizeFacts({ key: 'wtop', cm: 88 }), sizeFacts({ key: 'mtop', cm: 100 }), sizeFacts({ key: 'kids', cm: 130 })];
  for (const lang of LANG_CODES) {
    const ui = SIZE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...GROUPS.map(g => ui.groupName(g.key)),
      ...['bust', 'waist', 'height'].map(m => ui.measureName(m)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('대상과 재는 곳 이름이 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { SIZE_UI } = await import('../lib/size/ui.ts');
  for (const lang of LANG_CODES) {
    const ui = SIZE_UI[lang];
    const groups = GROUPS.map(g => ui.groupName(g.key));
    assert.equal(new Set(groups).size, GROUPS.length, `${lang}: 대상 이름이 겹친다`);
    for (const g of GROUPS) assert.notEqual(ui.groupName(g.key), g.key, `${lang}: ${g.key} 번역이 없다`);
    const measures = ['bust', 'waist', 'height'].map(m => ui.measureName(m));
    assert.equal(new Set(measures).size, 3, `${lang}: 재는 곳 이름이 겹친다`);
    // 열쇠가 영어 낱말이라 영어에서는 같은 것이 정답이다 — 글자가 다른 다섯에서만 본다
    if (['ko', 'ja', 'hi', 'zh', 'tw'].includes(lang)) {
      for (const m of ['bust', 'waist', 'height']) assert.notEqual(ui.measureName(m), m, `${lang}: ${m} 번역이 없다`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { SIZE_UI } = await import('../lib/size/ui.ts');
  const f = sizeFacts({ key: 'wtop', cm: 88 });
  for (const lang of LANG_CODES) {
    const ui = SIZE_UI[lang];
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
    // 44·55·66의 규칙과 남성이 다른 자를 쓴다는 것 — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.ruleNote.length >= floor * 6, `${lang}: 호수 규칙 설명이 짧다`);
    assert.ok(ui.menNote.length >= floor * 6, `${lang}: 남성 설명이 짧다`);
  }
});

test('옷 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { SIZE_ICON } = await import('../lib/size/list.ts');
  assert.equal(ICON_FOR[SIZE_ICON], 'shirt', '이모지가 아이콘으로 이어지지 않는다');
});
