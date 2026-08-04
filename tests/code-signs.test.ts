/**
 * 부호 표가 스스로 어긋나지 않는지 본다.
 *
 * 모스 부호는 적어 둔 자료라 베끼다 틀릴 수 있는데, 눈으로는 절대 못 잡는다 —
 * ···−가 V인지 ··−·가 F인지는 세어 봐야 안다. 그래서 검사가 두 가지를 본다.
 * 하나는 **부호가 겹치지 않는가** — 두 글자가 같은 부호를 쓰면 받는 쪽이
 * 구별할 수 없다. 다른 하나는 알려진 몇 개를 못으로 박는 것이다.
 *
 * 점자 셀은 6비트에서 만들어지므로, 점 번호를 다시 비트로 되돌려 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CELLS, CELL_COUNT, CHARS, CODE_ICON, CODE_SLUGS, cellOf, cellSlug, charOf, charSlug, dotsOf, maskOfDots,
} from '../lib/code/list.ts';
import { KINDS, UNIT_MS_AT_20WPM, cellFacts, cellsOfRaised, charFacts, charsOfKind, neighbours, unitsOf } from '../lib/code/facts.ts';
import { CODE_UI } from '../lib/code/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  const total = CHARS.length + CELLS.length;
  assert.ok(total >= 100, `${total}가지뿐이다`);
  assert.equal(CHARS.length, 52, '글자 26 · 숫자 10 · 기호 16');
  assert.equal(CELLS.length, CELL_COUNT);
  assert.equal(new Set(CODE_SLUGS).size, total, 'slug 중복');
  assert.equal(charOf('char-a')!.morse, '·−');
  assert.equal(charOf('char-period')!.char, '.');
  assert.equal(cellOf('cell-1'), 1);
  assert.equal(cellOf('cell-0'), 0, '빈 셀도 한 자리를 갖는다');
  assert.equal(charOf('char-A'), undefined, '주소는 소문자다');
});

test('모스 부호가 겹치지 않고 점과 선으로만 이루어진다', () => {
  const morse = CHARS.map(x => x.morse);
  const dup = [...new Set(morse.filter((m, i) => morse.indexOf(m) !== i))];
  assert.deepEqual(dup, [], `부호가 겹친다 — ${dup.join(', ')}`);
  for (const x of CHARS) {
    assert.match(x.morse, /^[·−]+$/, `${x.char}: 점과 선이 아닌 것이 섞였다 — ${x.morse}`);
    assert.ok(x.morse.length <= 6, `${x.char}: 부호가 너무 길다`);
  }
  // 잘 알려진 몇 개를 못으로 박는다 — 한 줄 밀리면 여기서 걸린다
  assert.equal(charOf('char-e')!.morse, '·');
  assert.equal(charOf('char-t')!.morse, '−');
  assert.equal(charOf('char-s')!.morse, '···');
  assert.equal(charOf('char-o')!.morse, '−−−');
  assert.equal(charOf('char-5')!.morse, '·····');
  assert.equal(charOf('char-0')!.morse, '−−−−−');
});

test('숫자의 모스가 점과 선의 규칙을 따른다', () => {
  // 1은 점 하나에 선 넷, 2는 점 둘에 선 셋 … 5는 점 다섯, 그리고 뒤집힌다
  for (const x of charsOfKind('digit')) {
    const n = Number(x.char);
    const f = charFacts(x);
    assert.equal(x.morse.length, 5, `${x.char}: 숫자는 다섯 자리다`);
    const dots = n === 0 ? 0 : n <= 5 ? n : 10 - n;
    assert.equal(f.dotCount, dots, `${x.char}: 점 개수가 규칙과 다르다`);
  }
});

test('부호의 길이가 점과 선을 센 값과 같다', () => {
  for (const x of CHARS) {
    const f = charFacts(x);
    assert.equal(f.dotCount + f.dashCount, x.morse.length, `${x.char}: 점과 선의 합이 길이와 다르다`);
    // 점 1단위, 선 3단위, 사이 1단위
    const expected = f.dotCount * 1 + f.dashCount * 3 + (x.morse.length - 1);
    assert.equal(f.units, expected, `${x.char}: 단위 시간이 다르다`);
    assert.equal(f.ms, f.units * UNIT_MS_AT_20WPM, `${x.char}: 밀리초가 단위와 어긋난다`);
  }
  assert.equal(unitsOf('·'), 1, 'E는 한 단위다');
  assert.equal(unitsOf('−'), 3, 'T는 세 단위다');
  assert.equal(unitsOf('·−'), 5, 'A는 점1 + 사이1 + 선3이다');
  assert.equal(unitsOf('−−−'), 11, 'O는 3+1+3+1+3이다');
});

test('NATO 낱말이 제 글자로 시작한다', () => {
  for (const x of charsOfKind('letter')) {
    assert.ok(x.nato, `${x.char}: NATO 낱말이 없다`);
    assert.equal(x.nato![0].toUpperCase(), x.char, `${x.char}: 낱말이 그 글자로 시작하지 않는다 — ${x.nato}`);
  }
  const words = charsOfKind('letter').map(x => x.nato);
  assert.equal(new Set(words).size, 26, 'NATO 낱말이 겹친다');
  assert.equal(charOf('char-j')!.nato, 'Juliett', '두 t로 적는다 — 프랑스어에서 묵음이 되지 않게');
  assert.equal(charOf('char-a')!.nato, 'Alfa', 'ph가 아니라 f로 적는다');
  // 기호에는 NATO 낱말이 없다
  for (const x of charsOfKind('punct')) assert.equal(x.nato, undefined, `${x.char}: 기호에 낱말이 있다`);
});

test('점 번호를 비트로 되돌리면 제자리로 온다', () => {
  for (const mask of CELLS) {
    const f = cellFacts(mask);
    assert.equal(maskOfDots(f.dots), mask, `${mask}: 점 번호를 되돌리면 다르다 — ${f.dots}`);
    assert.equal(f.raised, f.dots.length, `${mask}: 켜진 점 수가 다르다`);
    // 점 번호는 1~6이 오름차순으로만 나온다
    assert.match(f.dots, /^1?2?3?4?5?6?$/, `${mask}: 점 번호 꼴이 아니다 — ${f.dots}`);
    // 유니코드 글자는 ⠀에서 값을 더한 것이다
    assert.equal(f.char.codePointAt(0)! - 0x2800, mask, `${mask}: 유니코드가 어긋난다`);
    assert.equal(f.codePoint, `U+${(0x2800 + mask).toString(16).toUpperCase()}`);
  }
  assert.equal(dotsOf(0), '', '빈 셀은 켜진 점이 없다');
  assert.equal(dotsOf(1), '1');
  assert.equal(dotsOf(0b111111), '123456');
  assert.equal(cellFacts(1).char, '⠁');
  assert.equal(cellFacts(0).char, '⠀');
});

test('켜진 점 개수별 셀 수가 조합과 맞는다', () => {
  // 여섯 자리에서 k개를 고르는 경우의 수 — 1, 6, 15, 20, 15, 6, 1
  const expected = [1, 6, 15, 20, 15, 6, 1];
  expected.forEach((count, k) => {
    assert.equal(cellsOfRaised(k).length, count, `${k}점짜리 셀이 ${count}개가 아니다`);
  });
  assert.equal(expected.reduce((a, b) => a + b, 0), CELL_COUNT, '합이 예순넷이 아니다');
});

test('글자의 점자가 그 셀을 가리킨다', () => {
  for (const x of CHARS) {
    const f = charFacts(x);
    if (x.dots === undefined) {
      assert.equal(f.mask, undefined, `${x.char}: 점 번호가 없는데 셀이 있다`);
      continue;
    }
    assert.equal(dotsOf(f.mask!), x.dots, `${x.char}: 셀에서 되돌린 점 번호가 다르다`);
    // 그 셀 쪽에서도 이 글자가 보여야 한다
    assert.ok(cellFacts(f.mask!).chars.some(o => o.name === x.name), `${x.char}: 셀이 글자를 되가리키지 않는다`);
  }
  assert.equal(charFacts(charOf('char-a')!).braille, '⠁');
  assert.equal(charFacts(charOf('char-b')!).braille, '⠃');
  // 숫자는 a~j와 같은 셀을 쓴다 — 숫자표를 앞세워 구별한다
  assert.equal(charFacts(charOf('char-1')!).mask, charFacts(charOf('char-a')!).mask);
});

test('갈래가 쉰둘을 빈 곳 없이 덮는다', () => {
  assert.equal(KINDS.reduce((n, k) => n + charsOfKind(k).length, 0), CHARS.length, '갈래 밖 글자가 있다');
  assert.equal(charsOfKind('letter').length, 26);
  assert.equal(charsOfKind('digit').length, 10);
  assert.equal(charsOfKind('punct').length, 16);
  // 주소 이름이 겹치지 않는다
  assert.equal(new Set(CHARS.map(x => x.name)).size, CHARS.length, '이름 중복');
  for (const x of CHARS) assert.match(charSlug(x), /^char-[a-z0-9-]+$/, `${x.char}: 주소 꼴이 아니다`);
  for (const m of CELLS) assert.match(cellSlug(m), /^cell-[0-9]+$/, `${m}: 주소 꼴이 아니다`);
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const x of CHARS) {
    const n = neighbours(x);
    assert.ok(!n.some(o => o.name === x.name), `${x.char}: 이웃에 자기 자신이 있다`);
    for (const o of n) assert.equal(o.kind, x.kind, `${x.char}: 다른 갈래가 섞였다`);
  }
});

test('부호 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[CODE_ICON], 'wifi', '이모지가 신호 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const c = charFacts(charOf('char-a')!);
  const cell = cellFacts(1);
  for (const lang of LANG_CODES) {
    const ui = CODE_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.charFaq(c).length, 4, `${lang}: 글자 FAQ 수가 다르다`);
    assert.equal(ui.cellFaq(cell).length, 3, `${lang}: 셀 FAQ 수가 다르다`);
    for (const k of KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= (DENSE.has(lang) ? 6 : 12), `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = CODE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...KINDS.map(k => ui.kindNote[k]),
      ...ui.charFaq(charFacts(charOf('char-a')!)).flatMap(q => [q.q, q.a]),
      ...ui.cellFaq(cellFacts(0)).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('설명이 116가지 모두에서 만들어진다', () => {
  for (const x of CHARS) {
    const f = charFacts(x);
    for (const lang of LANG_CODES) {
      const ui = CODE_UI[lang];
      const d = ui.charDesc(f);
      assert.ok(d.length > (DENSE.has(lang) ? 20 : 35), `${lang}/${x.char}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(x.morse), `${lang}/${x.char}: 설명에 모스 부호가 없다`);
      assert.ok(ui.charMetaTitle(f).includes(x.morse), `${lang}/${x.char}: 제목에 부호가 없다`);
      assert.ok(ui.charMetaDesc(f).length > (DENSE.has(lang) ? 25 : 40), `${lang}/${x.char}: 메타 설명이 너무 짧다`);
    }
  }
  for (const m of CELLS) {
    const f = cellFacts(m);
    for (const lang of LANG_CODES) {
      const ui = CODE_UI[lang];
      assert.ok(ui.cellDesc(f).length > (DENSE.has(lang) ? 20 : 35), `${lang}/${m}: 셀 설명이 너무 짧다`);
      assert.ok(ui.cellMetaDesc(f).includes(f.codePoint), `${lang}/${m}: 메타 설명에 코드 포인트가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const x of CHARS) {
      const title = CODE_UI[lang].charMetaTitle(charFacts(x));
      assert.equal(seen.get(title), undefined, `"${title}"를 ${seen.get(title)}와 ${lang}/${x.char}가 함께 쓴다`);
      seen.set(title, `${lang}/${x.char}`);
    }
    for (const m of CELLS) {
      const title = CODE_UI[lang].cellMetaTitle(cellFacts(m));
      assert.equal(seen.get(title), undefined, `"${title}"를 ${seen.get(title)}와 ${lang}/cell-${m}가 함께 쓴다`);
      seen.set(title, `${lang}/cell-${m}`);
    }
  }
});
