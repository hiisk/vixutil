/**
 * 로마 숫자가 스스로 어긋나지 않는지 본다.
 *
 * 만드는 길(큰 값부터 뺀다)과 읽는 길(왼쪽부터 훑다가 뒤가 크면 뺀다)은 서로
 * 아주 다르다. 201개를 만들어서 되읽어 제자리로 오는지 보면, 두 길이 같은
 * 자리에서 만나는지가 드러난다.
 *
 * 규칙도 함께 본다 — 같은 글자를 넷 이상 잇지 않고, 뺄셈 꼴은 정해진 여섯
 * 가지(IV·IX·XL·XC·CD·CM)뿐이며, 값은 왼쪽으로 갈수록 커진다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FIRST_YEAR, LAST_YEAR, ROMAN_ICON, ROMAN_SLUGS, YEARS, yearOf } from '../lib/roman/list.ts';
import { LETTER_VALUE, NUMERALS, decades, longest, neighbours, parseRoman, romanFacts, shortest, toRoman } from '../lib/roman/facts.ts';
import { ROMAN_UI } from '../lib/roman/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(YEARS.length >= 100, `${YEARS.length}가지뿐이다`);
  assert.equal(YEARS.length, LAST_YEAR - FIRST_YEAR + 1);
  assert.equal(YEARS.length, 201);
  assert.equal(new Set(ROMAN_SLUGS).size, YEARS.length, 'slug 중복');
  assert.equal(yearOf('1994'), 1994);
  assert.equal(yearOf('1899'), undefined, '구간 밖은 받지 않는다');
  assert.equal(yearOf('2101'), undefined);
});

test('만든 것을 되읽으면 그 해로 돌아온다', () => {
  for (const y of YEARS) {
    const roman = toRoman(y);
    assert.equal(parseRoman(roman), y, `${y}: ${roman}을 되읽으면 ${parseRoman(roman)}이 된다`);
  }
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(2024), 'MMXXIV');
  assert.equal(toRoman(2000), 'MM');
  assert.equal(parseRoman('MCMLXXXVIII'), 1988);
});

test('조각을 다시 더하면 그 해가 된다', () => {
  for (const y of YEARS) {
    const f = romanFacts(y);
    assert.equal(f.parts.reduce((s, p) => s + p.value, 0), y, `${y}: 조각의 합이 다르다`);
    assert.equal(f.parts.map(p => p.letters).join(''), f.roman, `${y}: 조각을 이으면 다른 글자가 된다`);
    assert.equal(f.digits.reduce((s, d) => s + d.value, 0), y, `${y}: 자릿수의 합이 다르다`);
    assert.equal(f.digits.map(d => d.letters).join(''), f.roman, `${y}: 자릿수를 이으면 다른 글자가 된다`);
    assert.equal(f.length, f.roman.length);
  }
});

test('같은 글자를 넷 이상 잇지 않는다', () => {
  for (const y of YEARS) {
    const roman = toRoman(y);
    assert.ok(!/(.)\1\1\1/.test(roman), `${y}: ${roman}에 같은 글자가 넷 이어졌다`);
    // V·L·D는 애초에 두 번 나오지 않는다 — 두 개면 더 큰 글자 하나로 적는다
    for (const letter of ['V', 'L', 'D']) {
      assert.ok(roman.split(letter).length - 1 <= 1, `${y}: ${roman}에 ${letter}가 두 번 나온다`);
    }
  }
});

test('뺄셈 꼴은 여섯 가지뿐이다', () => {
  const allowed = new Set(['IV', 'IX', 'XL', 'XC', 'CD', 'CM']);
  for (const y of YEARS) {
    const roman = toRoman(y);
    for (let i = 0; i < roman.length - 1; i++) {
      const pair = roman.slice(i, i + 2);
      if (LETTER_VALUE[pair[1]] > LETTER_VALUE[pair[0]]) {
        assert.ok(allowed.has(pair), `${y}: ${roman}에 허락되지 않은 뺄셈 꼴 ${pair}이 있다`);
      }
    }
    assert.equal(romanFacts(y).hasSubtractive, [...allowed].some(p => roman.includes(p)), `${y}: 뺄셈 꼴 여부가 다르다`);
  }
});

test('값은 왼쪽으로 갈수록 커진다', () => {
  for (const y of YEARS) {
    const parts = romanFacts(y).parts;
    for (let i = 1; i < parts.length; i++) {
      assert.ok(parts[i - 1].value >= parts[i].value, `${y}: ${parts[i - 1].letters} 뒤에 더 큰 ${parts[i].letters}가 왔다`);
    }
  }
});

test('표의 값과 글자가 서로 맞는다', () => {
  for (const { value, letters } of NUMERALS) {
    assert.equal(parseRoman(letters), value, `${letters}를 되읽으면 ${value}가 아니다`);
  }
  // 값이 내림차순이어야 큰 것부터 빼는 방식이 성립한다
  for (let i = 1; i < NUMERALS.length; i++) {
    assert.ok(NUMERALS[i - 1].value > NUMERALS[i].value, '표가 내림차순이 아니다');
  }
});

test('가장 길고 짧은 해를 짚는다', () => {
  assert.deepEqual(longest(), [1988], 'MCMLXXXVIII');
  assert.equal(toRoman(1988).length, 11);
  assert.deepEqual(shortest(), [2000], 'MM');
  assert.equal(toRoman(2000).length, 2);
  for (const y of YEARS) {
    assert.ok(toRoman(y).length <= 11 && toRoman(y).length >= 2, `${y}: 길이가 구간을 벗어났다`);
  }
});

test('십 년 묶음이 201해를 빠짐없이 담는다', () => {
  const d = decades();
  assert.equal(d.flatMap(x => x.years).length, YEARS.length, '빠지거나 겹친 해가 있다');
  assert.deepEqual(d.flatMap(x => x.years), YEARS, '순서가 다르다');
  assert.equal(d[0].from, 1900);
  assert.equal(d[0].years.length, 10);
  assert.equal(d[d.length - 1].years.length, 1, '2100년만 남는 마지막 묶음');
});

test('앞뒤 해가 구간 끝에서 끊긴다', () => {
  assert.equal(romanFacts(FIRST_YEAR).prev, null);
  assert.equal(romanFacts(FIRST_YEAR).next, 1901);
  assert.equal(romanFacts(LAST_YEAR).next, null);
  for (const y of YEARS) {
    const list = neighbours(y);
    assert.ok(!list.includes(y), `${y}: 이웃에 자기 자신이 있다`);
    assert.ok(list.length > 0, `${y}: 이웃이 없다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = ROMAN_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(romanFacts(1994)),
      ui.desc(romanFacts(2000)),
      ...ui.yearFaq(romanFacts(1994)).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = ROMAN_UI[lang];
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
    assert.equal(ui.yearFaq(romanFacts(1994)).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 뺄셈 꼴 설명에 여섯 가지가 다 나오는지 — 이것이 이 섹션의 핵심이다
    for (const pair of ['IV', 'IX', 'XL', 'XC', 'CD', 'CM']) {
      assert.ok(ui.subtractiveNote.includes(pair), `${lang}: 설명에 ${pair}가 없다`);
    }
  }
});

test('로마 숫자 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.ok(ICON_FOR[ROMAN_ICON], '이모지가 아이콘으로 이어지지 않는다');
});
