/**
 * ASCII 표가 스스로 어긋나지 않는지 본다.
 *
 * 적어 둔 자료는 제어문자 33자의 약칭뿐이라 베끼다 틀릴 자리가 거의 없다.
 * 대신 이 표의 값어치는 **규칙끼리 맞물린다는 것**에 있다 — 대소문자가 32
 * 차이라는 것, 숫자 글자의 아래 네 비트가 곧 그 숫자라는 것, Ctrl+I가 탭이라는 것.
 * 그래서 검사도 값을 다시 적기보다 규칙을 서로 부딪혀 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { ASCII_ICON, ASCII_SLUGS, CODES, CONTROLS, TABLE_COLS, TABLE_ROWS, codeOf, controlOf } from '../lib/ascii/list.ts';
import { CASE_BIT, KINDS, asciiFacts, codesOfKind, kindOf, neighbours } from '../lib/ascii/facts.ts';
import { ASCII_UI } from '../lib/ascii/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100자가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(CODES.length >= 100, `${CODES.length}자뿐이다`);
  assert.equal(CODES.length, 128, 'ASCII는 7비트라 128자다');
  assert.equal(new Set(ASCII_SLUGS).size, CODES.length, 'slug 중복');
  assert.equal(codeOf('65'), 65);
  assert.equal(codeOf('065'), undefined, '앞에 0이 붙은 주소는 받지 않는다');
  assert.equal(codeOf('128'), undefined, '128은 ASCII가 아니다');
  assert.equal(codeOf('0'), 0);
});

test('제어문자 33자가 빠짐없이 있고 자리가 맞는다', () => {
  assert.equal(CONTROLS.length, 33, '0~31과 127로 33자다');
  const codes = CONTROLS.map(x => x.code);
  assert.equal(new Set(codes).size, 33, '코드 중복');
  assert.deepEqual(codes.slice(0, 32), Array.from({ length: 32 }, (_, i) => i), '0부터 31까지 이어져야 한다');
  assert.equal(codes[32], 127, '마지막은 DEL이다');
  assert.equal(new Set(CONTROLS.map(x => x.abbr)).size, 33, '약칭 중복');
  for (const x of CONTROLS) {
    assert.match(x.abbr, /^[A-Z]{2,3}[0-9]?$/, `${x.code}: 약칭 꼴이 아니다 — ${x.abbr}`);
    assert.ok(x.name.length >= 4, `${x.abbr}: 이름이 너무 짧다`);
  }
  // 잘 알려진 몇 자를 못으로 박는다 — 한 줄 밀리면 여기서 걸린다
  assert.equal(controlOf(0)!.abbr, 'NUL');
  assert.equal(controlOf(7)!.abbr, 'BEL');
  assert.equal(controlOf(9)!.abbr, 'HT');
  assert.equal(controlOf(10)!.abbr, 'LF');
  assert.equal(controlOf(13)!.abbr, 'CR');
  assert.equal(controlOf(27)!.abbr, 'ESC');
  assert.equal(controlOf(127)!.abbr, 'DEL');
});

test('갈래가 128자를 빈틈없이 덮는다', () => {
  assert.equal(KINDS.reduce((n, k) => n + codesOfKind(k).length, 0), 128, '갈래 밖 글자가 있다');
  assert.equal(codesOfKind('control').length, 33);
  assert.equal(codesOfKind('space').length, 1);
  assert.equal(codesOfKind('digit').length, 10);
  assert.equal(codesOfKind('upper').length, 26);
  assert.equal(codesOfKind('lower').length, 26);
  assert.equal(codesOfKind('punct').length, 32, '나머지가 기호다');
  // 제어문자 갈래와 CONTROLS 표가 서로 어긋나면 한쪽이 틀린 것이다
  assert.deepEqual(codesOfKind('control'), CONTROLS.map(x => x.code));
});

test('보이는 글자와 안 보이는 글자가 갈린다', () => {
  for (const code of CODES) {
    const f = asciiFacts(code);
    assert.equal(f.printable, /^[\x20-\x7E]$/.test(f.char), `${code}: 출력 가능 여부가 다르다`);
    assert.equal(f.char, String.fromCharCode(code));
    assert.equal(f.label, f.kind === 'control' ? controlOf(code)!.abbr : code === 32 ? 'SP' : f.char, `${code}: 이름표가 다르다`);
    // 이름표가 비어 보이면 제목이 "ASCII 32 — the   character"가 된다
    assert.equal(f.label, f.label.trim(), `${code}: 이름표가 공백으로 끝나거나 시작한다`);
    assert.ok(f.label.length > 0, `${code}: 이름표가 비었다`);
  }
});

test('진법 표기를 되돌리면 제자리로 온다', () => {
  for (const code of CODES) {
    const f = asciiFacts(code);
    assert.equal(parseInt(f.hex, 16), code, `${code}: 16진수가 어긋난다`);
    assert.equal(parseInt(f.oct, 8), code, `${code}: 8진수가 어긋난다`);
    assert.equal(parseInt(f.bin, 2), code, `${code}: 2진수가 어긋난다`);
    assert.equal(f.hex.length, 2, `${code}: 16진수는 두 자리로 맞춘다`);
    assert.equal(f.oct.length, 3, `${code}: 8진수는 세 자리로 맞춘다`);
    assert.equal(f.bin.length, 7, `${code}: ASCII는 7비트다`);
  }
  assert.equal(asciiFacts(65).hex, '41');
  assert.equal(asciiFacts(97).hex, '61');
  assert.equal(asciiFacts(32).hex, '20');
  assert.equal(asciiFacts(127).oct, '177');
});

test('HTML 엔티티와 URL 인코딩을 되돌리면 그 글자다', () => {
  for (const code of CODES) {
    const f = asciiFacts(code);
    assert.equal(f.entity, `&#${code};`);
    assert.equal(decodeURIComponent(f.urlEncoded), f.char, `${code}: URL 인코딩을 못 되돌린다`);
    assert.equal(parseInt(f.cssEscape.slice(1), 16), code, `${code}: CSS 이스케이프가 어긋난다`);
  }
  // 이름이 붙은 엔티티는 ASCII 안에서 다섯뿐이다
  const named = CODES.filter(c => asciiFacts(c).namedEntity);
  assert.deepEqual(named, [34, 38, 39, 60, 62]);
  assert.equal(asciiFacts(38).namedEntity, '&amp;');
  assert.equal(asciiFacts(60).namedEntity, '&lt;');
  // 주소에 그대로 둬도 되는 글자는 인코딩하지 않는다
  assert.equal(asciiFacts(65).urlEncoded, 'A');
  assert.equal(asciiFacts(32).urlEncoded, '%20');
});

test('대문자와 소문자가 비트 하나 차이다', () => {
  for (const code of codesOfKind('upper')) {
    const f = asciiFacts(code);
    assert.equal(f.pair, code + CASE_BIT, `${code}: 짝이 32 차이가 아니다`);
    assert.equal(String.fromCharCode(f.pair!), f.char.toLowerCase(), `${code}: 짝이 소문자가 아니다`);
    assert.equal(kindOf(f.pair!), 'lower');
  }
  for (const code of codesOfKind('lower')) {
    const f = asciiFacts(code);
    assert.equal(String.fromCharCode(f.pair!), f.char.toUpperCase(), `${code}: 짝이 대문자가 아니다`);
  }
  // 글자가 아닌 것에는 짝이 없다
  for (const code of CODES) {
    if (kindOf(code) === 'upper' || kindOf(code) === 'lower') continue;
    assert.equal(asciiFacts(code).pair, undefined, `${code}: 글자가 아닌데 짝이 있다`);
  }
  assert.equal(asciiFacts(65).pair, 97);
  assert.equal(asciiFacts(122).pair, 90);
});

test('Ctrl 조합이 위 세 비트를 지운 값이다', () => {
  for (const code of CODES) {
    const f = asciiFacts(code);
    if (code < 32) {
      assert.equal(f.ctrl, `^${String.fromCharCode(code + 64)}`, `${code}: Ctrl 표기가 다르다`);
    } else if (code === 127) {
      assert.equal(f.ctrl, '^?');
    } else {
      assert.equal(f.ctrl, undefined, `${code}: 제어문자가 아닌데 Ctrl 표기가 있다`);
    }
    if (f.ctrlOf !== undefined) {
      assert.equal(f.ctrlOf, code & 0x1f);
      assert.ok(f.ctrlOf < 32, `${code}: Ctrl로 눌러 나온 값이 제어문자 범위 밖이다`);
    }
  }
  // 왜 Ctrl+I가 탭이고 Ctrl+M이 줄바꿈인지가 계산에서 나온다
  assert.equal(asciiFacts(73).ctrlOf, 9, 'Ctrl+I는 탭이다');
  assert.equal(asciiFacts(77).ctrlOf, 13, 'Ctrl+M은 캐리지 리턴이다');
  assert.equal(asciiFacts(74).ctrlOf, 10, 'Ctrl+J는 줄바꿈이다');
  assert.equal(asciiFacts(105).ctrlOf, 9, '소문자도 같은 값이다');
  assert.equal(asciiFacts(0).ctrl, '^@');
  assert.equal(asciiFacts(27).ctrl, '^[');
});

test('숫자 글자의 아래 네 비트가 곧 그 숫자다', () => {
  for (const code of codesOfKind('digit')) {
    const f = asciiFacts(code);
    assert.equal(f.digitValue, Number(f.char), `${code}: 값이 글자와 다르다`);
    assert.equal(f.digitValue, code & 0x0f, `${code}: 아래 네 비트와 다르다`);
  }
  assert.equal(asciiFacts(48).digitValue, 0);
  assert.equal(asciiFacts(57).digitValue, 9);
  assert.equal(asciiFacts(65).digitValue, undefined);
});

test('짧은 이스케이프가 아는 것과 맞는다', () => {
  const withEscape = CODES.filter(c => asciiFacts(c).escape);
  assert.deepEqual(withEscape, [0, 7, 8, 9, 10, 11, 12, 13, 27, 34, 39, 92]);
  assert.equal(asciiFacts(10).escape, '\\n');
  assert.equal(asciiFacts(9).escape, '\\t');
  assert.equal(asciiFacts(13).escape, '\\r');
  assert.equal(asciiFacts(92).escape, '\\\\');
  // 이스케이프 문자열을 실제 글자로 되돌려 본다 — JSON이 아는 것만
  for (const code of [8, 9, 10, 12, 13, 34, 92]) {
    const esc = asciiFacts(code).escape!;
    assert.equal(JSON.parse(`"${esc === '\\"' ? '\\"' : esc}"`), String.fromCharCode(code), `${code}: 되돌리면 다른 글자다`);
  }
});

test('표에서 자리가 겹치지 않는다', () => {
  const seen = new Map<string, number>();
  for (const code of CODES) {
    const { cell } = asciiFacts(code);
    const key = `${cell.row}:${cell.col}`;
    assert.equal(seen.get(key), undefined, `${code}와 ${seen.get(key)}가 같은 칸에 있다`);
    assert.ok(cell.row >= 0 && cell.row < TABLE_ROWS, `${code}: 행이 범위 밖이다`);
    assert.ok(cell.col >= 0 && cell.col < TABLE_COLS, `${code}: 열이 범위 밖이다`);
    seen.set(key, code);
  }
  // 열은 위 세 비트, 행은 아래 네 비트다 — 이 표의 생김새 자체다
  assert.deepEqual(asciiFacts(65).cell, { row: 1, col: 4 });
  assert.deepEqual(asciiFacts(97).cell, { row: 1, col: 6 });
  assert.equal(seen.size, 128);
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const code of CODES) {
    const n = neighbours(code);
    assert.ok(!n.includes(code), `${code}: 이웃에 자기 자신이 있다`);
    assert.ok(n.length > 0, `${code}: 이웃이 없다`);
    for (const o of n) assert.ok(o >= 0 && o < 128, `${code}: 이웃이 표 밖이다`);
  }
});

test('ASCII 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[ASCII_ICON], 'keyboard', '이모지가 자판 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = asciiFacts(65);
  for (const lang of LANG_CODES) {
    const ui = ASCII_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.charFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
    for (const g of ['transmission', 'format', 'device', 'separator', 'other'] as const) {
      assert.ok(ui.groupLabel[g], `${lang}: ${g} 이름이 없다`);
      assert.ok(ui.groupNote[g]?.length >= 10, `${lang}: ${g} 설명이 없다`);
    }
  }
});

test('설명이 128자 모두에서 만들어진다', () => {
  for (const code of CODES) {
    const f = asciiFacts(code);
    for (const lang of LANG_CODES) {
      const ui = ASCII_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${code}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(String(code)), `${lang}/${code}: 설명에 코드가 없다 — ${d}`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.includes(f.bin), `${lang}/${code}: 메타 설명에 2진수가 없다`);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${code}: 메타 설명이 너무 짧다`);
      // 제어문자 설명에는 Ctrl 조합이 들어가야 한다 — 다른 길로 입력할 수 없기 때문이다
      if (f.kind === 'control') assert.ok(d.includes(f.ctrl!), `${lang}/${code}: 설명에 Ctrl 조합이 없다`);
    }
  }
});

test('제어문자 화면에는 보이지 않는 글자를 내보내지 않는다', () => {
  // 이름표에 진짜 제어문자가 섞이면 HTML에 그대로 실려 나간다
  for (const code of CODES) {
    const f = asciiFacts(code);
    assert.ok(!/[\x00-\x1F\x7F]/.test(f.label), `${code}: 이름표에 제어문자가 들어 있다`);
    for (const lang of LANG_CODES) {
      const ui = ASCII_UI[lang];
      assert.ok(!/[\x00-\x1F\x7F]/.test(ui.desc(f)), `${lang}/${code}: 설명에 제어문자가 들어 있다`);
      assert.ok(!/[\x00-\x1F\x7F]/.test(ui.metaTitle(f)), `${lang}/${code}: 제목에 제어문자가 들어 있다`);
      assert.ok(!/[\x00-\x1F\x7F]/.test(ui.metaDesc(f)), `${lang}/${code}: 메타 설명에 제어문자가 들어 있다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const code of CODES) {
      const title = ASCII_UI[lang].metaTitle(asciiFacts(code));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${code}가 함께 쓴다`);
      seen.set(title, `${lang}/${code}`);
    }
  }
});

test('허브가 128자를 모두 건다', () => {
  // 코드표와 갈래 목록을 합치면 빠지는 글자가 없어야 한다 — 고아 페이지가 생긴다
  const linked = new Set(KINDS.flatMap(k => codesOfKind(k)));
  for (const code of CODES) assert.ok(linked.has(code), `${code}: 허브에서 걸리지 않는다`);
});
