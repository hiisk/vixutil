import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toKoreanNumber, toKoreanAmount, toReadable, withCommas, MAX_DIGITS } from '../lib/korean-amount.ts';

test('계약서용 정식 표기', () => {
  assert.equal(toKoreanAmount(3500000), '일금 삼백오십만원정');
  assert.equal(toKoreanAmount(50000), '일금 오만원정');
  assert.equal(toKoreanAmount(12345), '일금 일만이천삼백사십오원정');
});

test('정식 표기는 십·백·천 앞의 일을 살린다', () => {
  // 빈자리를 남기지 않으려는 규칙이다 — '십만'은 앞에 글자를 끼울 수 있다
  assert.equal(toKoreanNumber(10, { formal: true }), '일십');
  assert.equal(toKoreanNumber(100, { formal: true }), '일백');
  assert.equal(toKoreanNumber(10000, { formal: true }), '일만');
});

test('간략 표기는 사람이 말하는 대로다', () => {
  assert.equal(toKoreanNumber(10, { formal: false }), '십');
  assert.equal(toKoreanNumber(100, { formal: false }), '백');
  assert.equal(toKoreanNumber(10000, { formal: false }), '만');
  assert.equal(toKoreanNumber(12345, { formal: false }), '만이천삼백사십오');
  assert.equal(toKoreanNumber(100000000, { formal: false }), '일억', '억은 일을 붙여 말한다');
});

test('만·억·조 단위를 건너뛴다', () => {
  // 중간 단위가 0이면 그 단위를 아예 적지 않는다
  assert.equal(toKoreanNumber(100000000, { formal: true }), '일억');
  assert.equal(toKoreanNumber(100010000, { formal: true }), '일억일만');
  assert.equal(toKoreanNumber(1000000000000, { formal: true }), '일조');
});

test('억·만 단위로 끊어 읽기', () => {
  assert.equal(toReadable(123456789), '1억 2,345만 6,789');
  assert.equal(toReadable(3500000), '350만');
  assert.equal(toReadable(1000), '1,000');
});

test('세 자리 쉼표', () => {
  assert.equal(withCommas(1234567), '1,234,567');
  assert.equal(withCommas('0012'), '12', '앞의 0은 떼어낸다');
  assert.equal(withCommas(''), '');
});

test('0과 빈 입력', () => {
  assert.equal(toKoreanNumber(0), '영');
  assert.equal(toKoreanNumber(''), '');
  assert.equal(toKoreanAmount(''), '');
  assert.equal(toReadable(0), '0');
});

test('숫자가 아닌 문자는 걸러낸다', () => {
  assert.equal(toKoreanNumber('3,500,000원'), toKoreanNumber(3500000));
  assert.equal(toKoreanNumber('1 2 3'), toKoreanNumber(123));
});

test('표기할 단위가 없는 큰 수는 비운다', () => {
  const tooBig = '1'.padEnd(MAX_DIGITS + 1, '0');
  assert.equal(toKoreanNumber(tooBig), '');
  assert.equal(toReadable(tooBig), '');
});
