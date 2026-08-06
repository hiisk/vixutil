/**
 * 제곱근이 스스로 어긋나지 않는지 본다.
 *
 * 소수는 반올림한 값이라 검산이 어렵지만, 근호를 간단히 한 꼴은 **정확한 값**이라
 * 곱해서 되돌릴 수 있다 — 5√2라면 5² × 2가 50이어야 한다. 그래서 검사가
 * 그 곱셈으로 200가지를 전부 되돌려 본다.
 *
 * 남은 수가 더 간단해질 수 있으면(제곱인 약수가 또 있으면) 그것도 잡는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { MAX_N, NUMBERS, SQRT_ICON, SQRT_SLUGS, numberOf } from '../lib/sqrt/list.ts';
import { neighbours, perfectSquares, simplifiable, simplify, sqrtFacts } from '../lib/sqrt/facts.ts';
import { SQRT_UI } from '../lib/sqrt/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(NUMBERS.length >= 100, `${NUMBERS.length}가지뿐이다`);
  assert.equal(NUMBERS.length, MAX_N);
  assert.equal(new Set(SQRT_SLUGS).size, NUMBERS.length, 'slug 중복');
  assert.equal(numberOf('50'), 50);
  assert.equal(numberOf('050'), undefined, '앞에 0이 붙은 주소는 받지 않는다');
  assert.equal(numberOf('231'), undefined);
});

test('간단히 한 근호를 곱해 되돌리면 그 수다', () => {
  for (const n of NUMBERS) {
    const { outside, inside } = simplify(n);
    assert.equal(outside * outside * inside, n, `${n}: 되돌리면 ${outside}² × ${inside}가 된다`);
    assert.ok(outside >= 1 && inside >= 1, `${n}: 음수나 0이 나왔다`);
    // 남은 수에 제곱인 약수가 또 있으면 덜 간단해진 것이다
    for (let d = 2; d * d <= inside; d++) {
      assert.notEqual(inside % (d * d), 0, `${n}: ${inside}가 ${d}²로 더 나뉜다`);
    }
  }
  assert.deepEqual(simplify(50), { outside: 5, inside: 2 });
  assert.deepEqual(simplify(72), { outside: 6, inside: 2 });
  assert.deepEqual(simplify(144), { outside: 12, inside: 1 });
  assert.deepEqual(simplify(7), { outside: 1, inside: 7 });
});

test('근호 표기가 세 갈래로 갈린다', () => {
  for (const n of NUMBERS) {
    const f = sqrtFacts(n);
    if (f.inside === 1) assert.equal(f.radical, String(f.outside), `${n}: 완전제곱인데 근호가 남았다`);
    else if (f.outside === 1) assert.equal(f.radical, `√${f.inside}`, `${n}: 밖에 1이 붙었다`);
    else assert.equal(f.radical, `${f.outside}√${f.inside}`, `${n}: 표기가 다르다`);
  }
  assert.equal(sqrtFacts(50).radical, '5√2');
  assert.equal(sqrtFacts(7).radical, '√7');
  assert.equal(sqrtFacts(169).radical, '13');
});

test('완전제곱수가 열다섯이고 뿌리가 맞는다', () => {
  const squares = perfectSquares();
  assert.deepEqual(squares, [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]);
  assert.equal(squares.length, Math.floor(Math.sqrt(MAX_N)));
  for (const n of squares) {
    const f = sqrtFacts(n);
    assert.ok(f.exact !== null, `${n}: 완전제곱인데 뿌리가 없다`);
    assert.equal(f.exact! * f.exact!, n, `${n}: 뿌리를 제곱하면 다르다`);
    assert.equal(f.inside, 1, `${n}: 근호가 남았다`);
  }
  for (const n of NUMBERS) {
    if (squares.includes(n)) continue;
    assert.equal(sqrtFacts(n).exact, null, `${n}: 완전제곱이 아닌데 뿌리가 있다`);
  }
});

test('소수 값이 제곱하면 그 수로 돌아온다', () => {
  for (const n of NUMBERS) {
    const f = sqrtFacts(n);
    // 소수점 아래 여섯 자리에서 반올림했으므로 그만큼의 오차를 허용한다
    assert.ok(Math.abs(f.value * f.value - n) < 1e-4, `${n}: 제곱하면 ${f.value * f.value}가 된다`);
    assert.ok(Math.abs(f.cbrt ** 3 - n) < 1e-3, `${n}: 세제곱근을 세제곱하면 다르다`);
    assert.equal(f.square, n * n, `${n}: 제곱이 다르다`);
  }
  assert.equal(sqrtFacts(2).value, 1.414214);
  assert.equal(sqrtFacts(144).text, '12', '완전제곱수는 소수점 없이 적는다');
});

test('어느 두 정수 사이인지 맞는다', () => {
  for (const n of NUMBERS) {
    const f = sqrtFacts(n);
    const [lo, hi] = f.between;
    if (f.exact !== null) {
      assert.equal(lo, f.exact, `${n}: 완전제곱인데 범위가 다르다`);
      assert.equal(hi, f.exact);
      continue;
    }
    assert.equal(hi, lo + 1, `${n}: 사이가 한 칸이 아니다`);
    assert.ok(lo * lo < n && n < hi * hi, `${n}: ${lo}²와 ${hi}² 사이가 아니다`);
  }
  assert.deepEqual(sqrtFacts(50).between, [7, 8]);
  assert.deepEqual(sqrtFacts(49).between, [7, 7]);
});

test('세제곱근이 딱 떨어지는 수를 가른다', () => {
  const cubes = NUMBERS.filter(n => sqrtFacts(n).cbrtExact !== null);
  assert.deepEqual(cubes, [1, 8, 27, 64, 125, 216]);
  for (const n of cubes) {
    const f = sqrtFacts(n);
    assert.equal(f.cbrtExact! ** 3, n, `${n}: 세제곱하면 다르다`);
  }
});

test('간단해지는 수를 골라낸다', () => {
  const list = simplifiable();
  for (const n of list) {
    const f = sqrtFacts(n);
    assert.equal(f.exact, null, `${n}: 완전제곱수가 섞였다`);
    assert.ok(f.outside > 1, `${n}: 밖으로 꺼낼 것이 없다`);
  }
  assert.ok(list.includes(50) && list.includes(72) && list.includes(200));
  assert.ok(!list.includes(7), '7은 더 간단해지지 않는다');
  assert.ok(!list.includes(144), '144는 완전제곱수다');
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const n of NUMBERS) {
    const list = neighbours(n);
    assert.ok(!list.includes(n), `${n}: 이웃에 자기 자신이 있다`);
    assert.ok(list.length > 0, `${n}: 이웃이 없다`);
  }
});

test('제곱근 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[SQRT_ICON], 'ruler', '이모지가 자 아이콘으로 이어지지 않는다');
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = SQRT_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(sqrtFacts(50)),
      ui.desc(sqrtFacts(144)),
      ...ui.sqrtFaq(sqrtFacts(50)).flatMap(q => [q.q, q.a]),
      ...ui.sqrtFaq(sqrtFacts(49)).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('소수점 기호가 언어마다 맞는다', () => {
  // 값 자체는 하나지만 적는 법이 다르다 — 독일어·프랑스어·스페인어·포르투갈어는 쉼표를 쓴다
  for (const lang of LANG_CODES) {
    const written = SQRT_UI[lang].dec(sqrtFacts(2).value);
    const mark = ['es', 'pt', 'de', 'fr'].includes(lang) ? ',' : '.';
    assert.equal(written, `1${mark}414214`, `${lang}: 소수점 기호가 다르다`);
    assert.equal(written.replace(mark, '.'), '1.414214', `${lang}: 자릿수가 달라졌다`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = SQRT_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) {
      assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    }
    assert.equal(ui.sqrtFaq(sqrtFacts(50)).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
  }
});
