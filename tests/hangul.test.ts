import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  splitSyllable, joinSyllable, toJamo, koToEn, enToKo, initials, guessDirection, isSyllable,
} from '../lib/hangul.ts';

/**
 * 한/영 변환은 눈으로 검증하기 어렵다 — "dkssud"가 맞는지 사람이 매번 자판을
 * 짚어 봐야 한다. 그래서 왕복(한글 → 영타 → 한글)이 원문과 같은지로 검사한다.
 * 왕복이 맞으면 두 방향의 표가 서로 어긋나지 않았다는 뜻이다.
 */
const ROUND_TRIP = [
  '안녕하세요', '값', '닭', '뷁', '서울특별시', '괜찮아요', '한국어 자판',
  '왜 그래?', 'ㅋㅋㅋ', '빨리', '쌀', '꿈', '없다', '앉다', '핥다', '읊다',
];

test('한글 → 영타 → 한글 왕복이 원문과 같다', () => {
  for (const text of ROUND_TRIP) {
    assert.equal(enToKo(koToEn(text)), text, `${text} → ${koToEn(text)} → ${enToKo(koToEn(text))}`);
  }
});

test('알려진 변환 예시', () => {
  assert.equal(koToEn('안녕'), 'dkssud');
  assert.equal(enToKo('dkssud'), '안녕');
  assert.equal(enToKo('gksrmf'), '한글');
  assert.equal(enToKo('rkqt'), '값');
  // 된소리는 shift 조합이라 대문자로 나온다
  assert.equal(koToEn('빨리'), 'Qkffl');
});

test('음절을 초성·중성·종성으로 나눈다', () => {
  assert.deepEqual(splitSyllable('한'), { cho: 'ㅎ', jung: 'ㅏ', jong: 'ㄴ' });
  assert.deepEqual(splitSyllable('가'), { cho: 'ㄱ', jung: 'ㅏ', jong: '' });
  assert.deepEqual(splitSyllable('값'), { cho: 'ㄱ', jung: 'ㅏ', jong: 'ㅄ' });
  assert.equal(splitSyllable('a'), null);
  assert.equal(splitSyllable('ㄱ'), null, '낱자는 완성된 음절이 아니다');
});

test('나눈 것을 다시 합치면 원래 글자가 된다', () => {
  for (const ch of '한글이참좋다값닭뷁') {
    const parts = splitSyllable(ch)!;
    assert.equal(joinSyllable(parts.cho, parts.jung, parts.jong), ch);
  }
  assert.equal(joinSyllable('ㄱ', 'ㅏ'), '가');
  assert.equal(joinSyllable('ㅏ', 'ㄱ'), null, '초성 자리에 모음이 오면 못 만든다');
});

test('겹받침·겹모음을 낱자로 편다', () => {
  assert.deepEqual(toJamo('값'), ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ']);
  assert.deepEqual(toJamo('왜'), ['ㅇ', 'ㅗ', 'ㅐ']);
  assert.deepEqual(toJamo('닭'), ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ']);
  assert.deepEqual(toJamo('a1'), ['a', '1'], '한글이 아닌 문자는 그대로 둔다');
});

test('받침이 다음 글자의 초성으로 넘어간다', () => {
  // 자음이 받침인지 다음 글자 초성인지는 그 뒤에 모음이 오는지로 갈린다
  assert.equal(enToKo('gks'), '한');
  assert.equal(enToKo('gksk'), '하나');
  assert.equal(enToKo('rkqtdl'), '값이');
});

test('초성만 뽑는다', () => {
  assert.equal(initials('안녕하세요'), 'ㅇㄴㅎㅅㅇ');
  assert.equal(initials('닭 꽃'), 'ㄷ ㄲ');
  assert.equal(initials('안녕 hi', false), 'ㅇㄴ', '한글이 아닌 것을 버릴 수 있다');
});

test('변환 방향을 글자 종류로 짐작한다', () => {
  assert.equal(guessDirection('dkssudgktpdy'), 'en-to-ko');
  assert.equal(guessDirection('안녕하세요'), 'ko-to-en');
  assert.equal(guessDirection(''), 'ko-to-en', '빈 입력은 기본 방향');
});

test('한글 음절 범위를 판정한다', () => {
  assert.ok(isSyllable('가'));
  assert.ok(isSyllable('힣'));
  assert.ok(!isSyllable('ㄱ'));
  assert.ok(!isSyllable('A'));
});

test('한글이 아닌 문자는 그대로 통과한다', () => {
  assert.equal(enToKo('abc 123 !@#'.replace(/[a-z]/g, '')), ' 123 !@#');
  assert.equal(koToEn('안녕 123!'), 'dkssud 123!');
});
