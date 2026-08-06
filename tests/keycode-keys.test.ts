/**
 * 키 목록이 스스로 어긋나지 않는지 본다.
 *
 * 글자·숫자·숫자판·F키는 규칙에서 나오므로, 검사도 규칙으로 되짚는다 —
 * KeyA의 keyCode는 65이고 KeyZ는 90이어야 한다. 규칙을 잘못 세우면 스물여섯
 * 줄이 한꺼번에 밀리는데, 목록만 보면 그럴듯해 보인다.
 *
 * 나머지(Enter는 13, Escape는 27)는 적어 둔 값이라 잘 알려진 자리를 못으로
 * 박고, 목록 자체가 성립하는지(code 중복 없음, location이 꼬리와 맞음)를 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { KEYS, KEYCODE_ICON, KEY_SLUGS, keyOf, slugOf } from '../lib/keycode/list.ts';
import { GROUPS, LOCATION, isPrintable, keyFacts, keysOfGroup, locationOf, neighbours } from '../lib/keycode/facts.ts';
import { KEYCODE_UI } from '../lib/keycode/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100개가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(KEYS.length >= 100, `${KEYS.length}개뿐이다`);
  // 글자 26 · 숫자 10 · 숫자판 16 · F키 20 · 나머지 48
  assert.equal(KEYS.length, 159);
  assert.equal(new Set(KEY_SLUGS).size, KEYS.length, 'slug 중복');
  assert.equal(new Set(KEYS.map(x => x.code)).size, KEYS.length, 'code 중복');
  assert.equal(keyOf('key-a')!.keyCode, 65);
  assert.equal(keyOf('KeyA'), undefined, '주소는 소문자다');
  assert.equal(keyOf('enter')!.keyCode, 13);
  assert.equal(keyOf('arrow-up')!.code, 'ArrowUp');
});

test('글자 키가 규칙대로 만들어졌다', () => {
  const letters = keysOfGroup('letter');
  assert.equal(letters.length, 26);
  letters.forEach((x, i) => {
    const upper = String.fromCharCode(65 + i);
    assert.equal(x.code, `Key${upper}`, `${i}번째 글자 키의 code가 다르다`);
    assert.equal(x.keyCode, 65 + i, `${x.code}: keyCode가 다르다`);
    assert.equal(x.key, upper.toLowerCase(), `${x.code}: key가 소문자가 아니다`);
    assert.equal(x.shift, upper, `${x.code}: Shift 값이 대문자가 아니다`);
  });
  assert.equal(keyOf('key-z')!.keyCode, 90);
});

test('숫자와 숫자판과 F키가 규칙대로다', () => {
  keysOfGroup('digit').forEach((x, i) => {
    assert.equal(x.code, `Digit${i}`);
    assert.equal(x.keyCode, 48 + i, `${x.code}: 숫자 줄은 48부터다`);
    assert.equal(x.key, String(i));
  });
  const numpadDigits = keysOfGroup('numpad').filter(x => /^Numpad[0-9]$/.test(x.code));
  numpadDigits.forEach((x, i) => {
    assert.equal(x.keyCode, 96 + i, `${x.code}: 숫자판은 96부터다`);
  });
  const fn = keysOfGroup('function');
  assert.equal(fn.length, 24, 'F1~F24');
  fn.forEach((x, i) => {
    assert.equal(x.code, `F${i + 1}`);
    assert.equal(x.keyCode, 112 + i, `${x.code}: F키는 112부터다`);
    assert.equal(x.key, x.code, `${x.code}: F키는 key와 code가 같다`);
  });
  // 같은 숫자라도 자리가 다르면 keyCode가 다르다 — 1과 숫자판 1
  assert.notEqual(keyOf('digit1')!.keyCode, keyOf('numpad1')!.keyCode);
});

test('location이 code의 꼬리와 맞는다', () => {
  for (const x of KEYS) {
    const f = keyFacts(x);
    if (x.code.startsWith('Numpad')) assert.equal(f.location, LOCATION.numpad, `${x.code}: 숫자판이 아니다`);
    else if (x.code.endsWith('Left')) assert.equal(f.location, LOCATION.left, `${x.code}: 왼쪽이 아니다`);
    else if (x.code.endsWith('Right')) assert.equal(f.location, LOCATION.right, `${x.code}: 오른쪽이 아니다`);
    else assert.equal(f.location, LOCATION.standard, `${x.code}: 기본 자리가 아니다`);
  }
  assert.equal(locationOf('ShiftLeft'), 1);
  assert.equal(locationOf('ShiftRight'), 2);
  assert.equal(locationOf('NumpadEnter'), 3);
  assert.equal(locationOf('KeyA'), 0);
});

test('같은 keyCode를 쓰는 키가 서로를 가리킨다', () => {
  for (const x of KEYS) {
    const f = keyFacts(x);
    for (const other of f.shares) {
      const o = KEYS.find(y => y.code === other)!;
      assert.equal(o.keyCode, x.keyCode, `${x.code}↔${other}: keyCode가 다른데 짝으로 묶였다`);
      assert.ok(keyFacts(o).shares.includes(x.code), `${x.code}: 짝이 되돌아오지 않는다`);
    }
  }
  // 왼쪽·오른쪽 Shift가 16을 함께 쓴다 — location으로만 갈린다
  assert.deepEqual(keyFacts(keyOf('shift-left')!).shares, ['ShiftRight']);
  assert.deepEqual(keyFacts(keyOf('enter')!).shares, ['NumpadEnter']);
  assert.deepEqual(keyFacts(keyOf('key-a')!).shares, [], '글자 키는 혼자 쓴다');
});

test('16진수가 keyCode와 같은 수다', () => {
  for (const x of KEYS) {
    const f = keyFacts(x);
    assert.equal(parseInt(f.hex.slice(2), 16), x.keyCode, `${x.code}: 16진수가 어긋난다`);
  }
  assert.equal(keyFacts(keyOf('enter')!).hex, '0x0D');
  assert.equal(keyFacts(keyOf('escape')!).hex, '0x1B');
});

test('갈래가 빈 곳 없이 덮는다', () => {
  assert.equal(GROUPS.reduce((n, g) => n + keysOfGroup(g).length, 0), KEYS.length, '갈래 밖 키가 있다');
  for (const g of GROUPS) assert.ok(keysOfGroup(g).length > 0, `${g}: 아무도 들지 않았다`);
  // 좌우 넷씩에 Fn이 더해져 아홉이다 — Fn은 짝이 없는 유일한 수정 키다
  assert.equal(keysOfGroup('modifier').length, 9, '수정 키는 좌우 넷 + Fn');
  assert.equal(keysOfGroup('lock').length, 3);
});

test('글자가 찍히는 키를 가른다', () => {
  for (const x of KEYS) {
    assert.equal(keyFacts(x).printable, [...x.key].length === 1, `${x.code}: 출력 여부가 어긋난다`);
  }
  assert.equal(isPrintable(keyOf('key-a')!), true);
  assert.equal(isPrintable(keyOf('enter')!), false);
  assert.equal(isPrintable(keyOf('space')!), true, '공백은 찍히는 글자다');
  assert.equal(keyFacts(keyOf('space')!).label, 'Space', '공백은 이름표를 따로 둔다');
});

test('브라우저마다 다른 keyCode를 표시한다', () => {
  // 파이어폭스는 기호 키에 다른 값을 준다 — 뒤섞으면 "어디서나 186"이라는 거짓말이 된다
  const varies = KEYS.filter(x => x.varies !== undefined).map(x => x.code);
  assert.deepEqual(varies, ['Semicolon', 'Equal', 'Minus']);
  assert.equal(keyOf('semicolon')!.varies, 59);
  assert.equal(keyOf('key-a')!.varies, undefined);
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const x of KEYS) {
    const n = neighbours(x);
    assert.ok(!n.some(o => o.code === x.code), `${x.code}: 이웃에 자기 자신이 있다`);
    for (const o of n) assert.equal(o.group, x.group, `${x.code}: 다른 갈래가 섞였다`);
  }
});

test('키 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[KEYCODE_ICON], 'key', '이모지가 열쇠 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = keyFacts(keyOf('key-a')!);
  for (const lang of LANG_CODES) {
    const ui = KEYCODE_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.keyFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const g of GROUPS) {
      assert.ok(ui.groupLabel[g], `${lang}: ${g} 이름이 없다`);
      assert.ok(ui.groupNote[g]?.length >= floor, `${lang}: ${g} 설명이 없다`);
    }
    for (const loc of [0, 1, 2, 3] as const) assert.ok(ui.locationName[loc], `${lang}: location ${loc} 이름이 없다`);
  }
});

test('설명이 159개 모두에서 만들어진다', () => {
  for (const x of KEYS) {
    const f = keyFacts(x);
    for (const lang of LANG_CODES) {
      const ui = KEYCODE_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${x.code}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(x.code), `${lang}/${x.code}: 설명에 code가 없다`);
      assert.ok(d.includes(String(x.keyCode)), `${lang}/${x.code}: 설명에 keyCode가 없다`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.includes(f.hex), `${lang}/${x.code}: 메타 설명에 16진수가 없다`);
      assert.ok(ui.metaTitle(f).includes(x.code), `${lang}/${x.code}: 제목에 code가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  // 스페인어와 포르투갈어는 "Tecla"로 같아서, 한쪽에 낱말을 더 붙여 갈랐다
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const x of KEYS) {
      const title = KEYCODE_UI[lang].metaTitle(keyFacts(x));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${x.code}가 함께 쓴다`);
      seen.set(title, `${lang}/${x.code}`);
    }
  }
});

test('허브가 159개를 모두 건다', () => {
  const linked = new Set(GROUPS.flatMap(g => keysOfGroup(g).map(x => x.code)));
  for (const x of KEYS) assert.ok(linked.has(x.code), `${x.code}: 허브에서 걸리지 않는다`);
});
