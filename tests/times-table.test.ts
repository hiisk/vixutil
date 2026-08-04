/**
 * 곱셈표가 스스로 어긋나지 않는지 본다.
 *
 * 곱셈 자체가 틀릴 일은 없다. 이 섹션에서 조용히 틀릴 수 있는 것은 **목록의
 * 규칙**이다 — 7×8과 8×7을 둘 다 내면 한 답을 두 주소가 나눠 갖고, 한쪽만
 * 내면서 뒤집힌 주소를 못 받으면 절반이 404가 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { MAX_FACTOR, PRODUCTS, TIMES_ICON, TIMES_SLUGS, productOf, slugOf, timesParams } from '../lib/times/list.ts';
import { TABLES, neighbours, tableOf, timesFacts } from '../lib/times/facts.ts';
import { TIMES_UI } from '../lib/times/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100칸이 넘고 주소가 겹치지 않는다', () => {
  assert.ok(PRODUCTS.length >= 100, `${PRODUCTS.length}칸뿐이다`);
  // 20 × 21 ÷ 2 — 순서를 뒤집은 짝을 한 번만 세면 이 값이다
  assert.equal(PRODUCTS.length, (MAX_FACTOR * (MAX_FACTOR + 1)) / 2);
  assert.equal(PRODUCTS.length, 210);
  assert.equal(new Set(TIMES_SLUGS).size, PRODUCTS.length, 'slug 중복');
});

test('앞의 수가 뒤의 수보다 크지 않다', () => {
  for (const p of PRODUCTS) {
    assert.ok(p.a <= p.b, `${slugOf(p)}: 순서가 뒤집혔다`);
    assert.ok(p.a >= 1 && p.b <= MAX_FACTOR, `${slugOf(p)}: 범위 밖이다`);
  }
  // 같은 곱을 주는 같은 짝이 둘 있으면 안 된다
  const keys = PRODUCTS.map(p => `${p.a}:${p.b}`);
  assert.equal(new Set(keys).size, keys.length, '같은 짝이 두 번 있다');
});

test('뒤집힌 주소도 같은 칸으로 온다', () => {
  // 사람은 8×7을 그대로 검색한다. 그 주소가 404면 절반을 잃는다
  for (const p of PRODUCTS) {
    const flipped = `${p.b}x${p.a}`;
    assert.deepEqual(productOf(flipped), p, `${flipped}: 뒤집힌 주소가 제자리로 안 온다`);
    assert.deepEqual(productOf(slugOf(p)), p);
  }
  assert.deepEqual(productOf('8x7'), { a: 7, b: 8 });
  assert.equal(productOf('21x2'), undefined, '20단까지다');
  assert.equal(productOf('0x5'), undefined, '0단은 없다');
  assert.equal(productOf('7-8'), undefined, '주소 꼴이 아니다');
});

test('곱과 나누기가 서로를 되돌린다', () => {
  for (const p of PRODUCTS) {
    const f = timesFacts(p);
    assert.equal(f.product, p.a * p.b, `${slugOf(p)}: 곱이 다르다`);
    // 나누기 식을 되읽어 확인한다
    for (const line of f.divisions) {
      const [left, right] = line.split(' = ');
      const [product, divisor] = left.split(' ÷ ').map(Number);
      assert.equal(product / divisor, Number(right), `${slugOf(p)}: 나누기 식이 어긋난다 — ${line}`);
      assert.equal(product, f.product);
    }
    // 더하기로 풀어 쓴 식도 합이 같아야 한다
    if (f.repeated) {
      const parts = f.repeated.split(' + ').map(Number);
      assert.equal(parts.length, p.b, `${slugOf(p)}: 더한 횟수가 다르다`);
      assert.equal(parts.reduce((a, b) => a + b, 0), f.product, `${slugOf(p)}: 더한 값이 곱과 다르다`);
    }
  }
  assert.equal(timesFacts({ a: 7, b: 8 }).product, 56);
  assert.equal(timesFacts({ a: 12, b: 12 }).product, 144);
});

test('앞 칸과 뒤 칸이 한 단만큼 벌어진다', () => {
  for (const p of PRODUCTS) {
    const f = timesFacts(p);
    if (f.before !== undefined) assert.equal(f.product - f.before, p.a, `${slugOf(p)}: 앞 칸과의 차이가 단과 다르다`);
    if (f.after !== undefined) assert.equal(f.after - f.product, p.a, `${slugOf(p)}: 뒤 칸과의 차이가 단과 다르다`);
  }
  assert.equal(timesFacts({ a: 7, b: 8 }).before, 49);
  assert.equal(timesFacts({ a: 7, b: 8 }).after, 63);
  assert.equal(timesFacts({ a: 1, b: 1 }).before, undefined);
});

test('같은 곱을 주는 다른 짝을 찾아 준다', () => {
  for (const p of PRODUCTS) {
    const f = timesFacts(p);
    for (const other of f.otherPairs) {
      assert.equal(other.a * other.b, f.product, `${slugOf(p)}: 다른 짝의 곱이 다르다`);
      assert.ok(!(other.a === p.a && other.b === p.b), `${slugOf(p)}: 자기 자신이 섞였다`);
    }
  }
  // 24는 3×8과 4×6, 그리고 2×12로도 나온다
  assert.deepEqual(timesFacts({ a: 2, b: 12 }).otherPairs.map(slugOf).sort(), ['3x8', '4x6']);
  assert.deepEqual(timesFacts({ a: 13, b: 17 }).otherPairs, [], '소수끼리 곱한 값은 다른 짝이 없다');
});

test('짝수 여부와 제곱 여부가 맞는다', () => {
  for (const p of PRODUCTS) {
    const f = timesFacts(p);
    assert.equal(f.even, (p.a * p.b) % 2 === 0, `${slugOf(p)}: 짝수 표시가 어긋난다`);
    assert.equal(f.square, p.a === p.b, `${slugOf(p)}: 제곱 표시가 어긋난다`);
    // 둘 중 하나만 짝수여도 곱은 짝수다
    if (p.a % 2 === 0 || p.b % 2 === 0) assert.ok(f.even, `${slugOf(p)}: 짝수가 들었는데 홀수라 한다`);
  }
  assert.equal(PRODUCTS.filter(p => timesFacts(p).square).length, MAX_FACTOR, '제곱은 스무 칸이다');
});

test('단으로 묶으면 스무 칸씩이다', () => {
  for (const n of TABLES) {
    const table = tableOf(n);
    assert.equal(table.length, MAX_FACTOR, `${n}단이 스무 칸이 아니다`);
    for (const p of table) assert.ok(p.a === n || p.b === n, `${n}단에 다른 칸이 섞였다`);
  }
  // 모든 칸은 두 단에 든다(제곱은 한 단에 한 번)
  const seen = TABLES.flatMap(n => tableOf(n).map(slugOf));
  assert.equal(new Set(seen).size, PRODUCTS.length, '어느 단에도 안 드는 칸이 있다');
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const p of PRODUCTS) {
    const n = neighbours(p);
    assert.ok(!n.some(o => o.a === p.a && o.b === p.b), `${slugOf(p)}: 이웃에 자기 자신이 있다`);
    assert.ok(n.length > 0, `${slugOf(p)}: 이웃이 없다`);
  }
});

test('뒤집힌 주소도 페이지로 나간다', () => {
  // 정적 내보내기라 generateStaticParams에 없는 주소는 파일이 없다 — 8x7로 검색해
  // 들어온 사람이 404를 본다. 그래서 뒤집힌 쪽도 함께 내되 canonical은 하나다
  const slugs = timesParams().map(x => x.slug);
  assert.equal(new Set(slugs).size, slugs.length, '주소 중복');
  // 제곱은 뒤집어도 같으므로 한 번만 — 210 + (210 - 20)
  assert.equal(slugs.length, PRODUCTS.length + PRODUCTS.filter(p => p.a !== p.b).length);
  for (const p of PRODUCTS) {
    assert.ok(slugs.includes(slugOf(p)), `${slugOf(p)}: 대표 주소가 없다`);
    assert.ok(slugs.includes(`${p.b}x${p.a}`), `${p.b}x${p.a}: 뒤집힌 주소가 없다`);
  }
});

test('곱셈 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[TIMES_ICON], 'numbers', '이모지가 숫자 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = timesFacts({ a: 7, b: 8 });
  for (const lang of LANG_CODES) {
    const ui = TIMES_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.productFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const n of TABLES) assert.ok(ui.tableName(n).includes(String(n)), `${lang}: ${n}단 이름에 숫자가 없다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = TIMES_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(timesFacts({ a: 7, b: 8 })),
      ...ui.productFaq(timesFacts({ a: 3, b: 3 })).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('설명이 210칸 모두에서 만들어진다', () => {
  for (const p of PRODUCTS) {
    const f = timesFacts(p);
    for (const lang of LANG_CODES) {
      const ui = TIMES_UI[lang];
      const d = ui.desc(f);
      assert.ok(d.length > (DENSE.has(lang) ? 20 : 35), `${lang}/${slugOf(p)}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(String(f.product)), `${lang}/${slugOf(p)}: 설명에 곱이 없다`);
      assert.ok(ui.metaTitle(f).includes(String(f.product)), `${lang}/${slugOf(p)}: 제목에 곱이 없다`);
      assert.ok(ui.metaDesc(f).length > (DENSE.has(lang) ? 25 : 40), `${lang}/${slugOf(p)}: 메타 설명이 너무 짧다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  // 제목이 "7 × 8 = 56"뿐이면 열 언어가 통째로 겹친다 — 언어마다 낱말을 하나 붙여 갈랐다
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const p of PRODUCTS) {
      const title = TIMES_UI[lang].metaTitle(timesFacts(p));
      assert.equal(seen.get(title), undefined, `"${title}"를 ${seen.get(title)}와 ${lang}/${slugOf(p)}가 함께 쓴다`);
      seen.set(title, `${lang}/${slugOf(p)}`);
    }
  }
});
