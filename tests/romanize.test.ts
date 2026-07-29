import { test } from 'node:test';
import assert from 'node:assert/strict';
import { romanize, romanizeName, splitName } from '../lib/romanize.ts';

/**
 * 규정(국어의 로마자 표기법)에 실린 예시를 그대로 가져와 고정한다.
 * 표를 손보다가 다른 글자가 어긋나는 것을 막는 것이 목적이다.
 */
test('규정에 실린 인명 예시와 일치한다', () => {
  assert.equal(romanizeName('홍길동')!.standard, 'Hong Gildong');
  assert.equal(romanizeName('한복남')!.standard, 'Han Boknam');
});

test('모음·자음 표기가 규정대로다', () => {
  assert.equal(romanize('아'), 'a');
  assert.equal(romanize('어'), 'eo');
  assert.equal(romanize('의'), 'ui');
  assert.equal(romanize('왜'), 'wae');
  assert.equal(romanize('구'), 'gu');
  assert.equal(romanize('쿠'), 'ku');
  assert.equal(romanize('꾸'), 'kku');
});

test('받침은 어말 규칙을 따른다', () => {
  // ㄱㄷㅂ은 받침에서 k, t, p
  assert.equal(romanize('박'), 'bak');
  assert.equal(romanize('밭'), 'bat');
  assert.equal(romanize('밥'), 'bap');
  // ㅇ 받침은 ng, ㅅ·ㅈ·ㅊ 받침은 t
  assert.equal(romanize('강'), 'gang');
  assert.equal(romanize('빛'), 'bit');
  // 겹받침은 대표음 하나로
  assert.equal(romanize('값'), 'gap');
  assert.equal(romanize('닭'), 'dak');
});

test('ㄹ 받침 뒤의 ㄹ은 ll이 된다', () => {
  assert.equal(romanize('울릉'), 'ulleung');
});

test('인명은 음운 변화를 반영하지 않는다', () => {
  // 빛나는 [빈나]로 읽히지만 표기는 Bitna다 — 이게 지명 규칙과 갈리는 지점이다
  assert.equal(romanizeName('김빛나')!.standard.split(' ')[1], 'Bitna');
});

test('성은 관용 표기를 함께 준다', () => {
  const lee = romanizeName('이지은')!;
  assert.equal(lee.standard, 'I Jieun', '표기법대로면 I다');
  assert.equal(lee.common, 'Lee Jieun', '실제로는 Lee를 쓴다');
  assert.ok(lee.familyDiffers, '둘이 다르다는 것을 알려줘야 한다');

  const han = romanizeName('한복남')!;
  assert.ok(!han.familyDiffers, '한(Han)은 표기법과 관용이 같다');
});

test('여권 표기는 전부 대문자다', () => {
  assert.equal(romanizeName('박서준')!.passport, 'PARK SEOJUN');
});

test('붙임표 표기는 음절마다 끊는다', () => {
  assert.equal(romanizeName('이지은')!.hyphen, 'Lee Ji-eun');
  assert.equal(romanizeName('홍길동')!.hyphen, 'Hong Gil-dong');
});

test('두 글자 성을 알아본다', () => {
  assert.deepEqual(splitName('남궁민수'), { family: '남궁', given: '민수' });
  assert.deepEqual(splitName('선우용녀'), { family: '선우', given: '용녀' });
  assert.equal(romanizeName('남궁민수')!.common, 'Namgoong Minsu');
});

test('공백으로 성과 이름을 직접 나눌 수 있다', () => {
  // 황보라는 황보+라와 황+보라 둘 다 가능해 기계가 정할 수 없다
  assert.deepEqual(splitName('황 보라'), { family: '황', given: '보라' });
  assert.deepEqual(splitName('황보 라'), { family: '황보', given: '라' });
});

test('빈 입력과 한 글자 이름에서 터지지 않는다', () => {
  assert.equal(romanizeName(''), null);
  assert.equal(romanizeName('  '), null);
  const one = romanizeName('김')!;
  assert.equal(one.given, '');
  assert.equal(one.common, 'Kim');
});
