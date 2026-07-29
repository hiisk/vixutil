import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanText, dedupeLines, convertCase, replaceAll, countText } from '../lib/text-clean.ts';

const ZWSP = '​';
const NBSP = ' ';

test('보이지 않는 문자를 지운다', () => {
  const r = cleanText(`가${ZWSP}나다`, { invisible: true });
  assert.equal(r.text, '가나다');
  assert.equal(r.counts['보이지 않는 문자'], 1);
});

test('특수 공백을 일반 공백으로 바꾼다', () => {
  const r = cleanText(`가${NBSP}나`, { oddSpace: true });
  assert.equal(r.text, '가 나');
  assert.equal(r.counts['특수 공백'], 1);
});

test('끊긴 줄만 이어 붙인다', () => {
  // 문장이 끝난 줄과 빈 줄(문단 경계)은 건드리지 않는다
  const input = '문장이 중간에서\n끊겼습니다.\n\n다음 문단입니다.';
  const r = cleanText(input, { joinLines: true });
  assert.equal(r.text, '문장이 중간에서 끊겼습니다.\n\n다음 문단입니다.');
});

test('중복 공백과 연속 빈 줄을 줄인다', () => {
  const r = cleanText('가   나\n\n\n\n다', { collapseSpaces: true, blankLines: true });
  assert.equal(r.text, '가 나\n\n다');
});

test('굽은 따옴표를 일반 따옴표로', () => {
  const r = cleanText('“가” ‘나’', { smartQuotes: true });
  assert.equal(r.text, '"가" \'나\'');
});

test('아무 옵션도 안 켜면 다듬기만 한다', () => {
  const r = cleanText('  가나다  ', {});
  assert.equal(r.text, '가나다');
  assert.deepEqual(r.counts, {});
});

test('중복 줄을 지운다', () => {
  const r = dedupeLines('가\n나\n가\n다');
  assert.equal(r.text, '가\n나\n다');
  assert.equal(r.total, 4);
  assert.equal(r.kept, 3);
  assert.equal(r.removed, 1);
});

test('공백 차이는 같은 줄로 볼 수 있다', () => {
  assert.equal(dedupeLines('김철수\n김철수 ', { ignoreSpace: true }).kept, 1);
  assert.equal(dedupeLines('김철수\n김철수 ', { ignoreSpace: false, removeBlank: false }).kept, 2);
});

test('대소문자 차이는 선택에 따라 다르게 본다', () => {
  assert.equal(dedupeLines('Apple\napple', { ignoreCase: true }).kept, 1);
  assert.equal(dedupeLines('Apple\napple', { ignoreCase: false }).kept, 2);
});

test('가나다순으로 정렬한다', () => {
  // 코드포인트 순이면 자모가 뒤섞인다 — 사전 순서를 따라야 한다
  assert.equal(dedupeLines('하\n가\n나', { sort: 'asc' }).text, '가\n나\n하');
  assert.equal(dedupeLines('하\n가\n나', { sort: 'desc' }).text, '하\n나\n가');
});

test('번호를 매긴다', () => {
  assert.equal(dedupeLines('가\n나', { numbered: true }).text, '1. 가\n2. 나');
});

test('표기법을 바꾼다', () => {
  const r = convertCase('hello world example');
  assert.equal(r.upper, 'HELLO WORLD EXAMPLE');
  assert.equal(r.title, 'Hello World Example');
  assert.equal(r.camel, 'helloWorldExample');
  assert.equal(r.pascal, 'HelloWorldExample');
  assert.equal(r.snake, 'hello_world_example');
  assert.equal(r.kebab, 'hello-world-example');
  assert.equal(r.constant, 'HELLO_WORLD_EXAMPLE');
});

test('이미 표기법이 적용된 것도 다시 바꾼다', () => {
  assert.equal(convertCase('helloWorld').snake, 'hello_world');
  assert.equal(convertCase('hello-world').camel, 'helloWorld');
  assert.equal(convertCase('HELLO_WORLD').kebab, 'hello-world');
});

test('한글은 대소문자 변환에서 그대로 남는다', () => {
  assert.equal(convertCase('안녕 hello').upper, '안녕 HELLO');
});

test('찾아 바꾸기가 개수를 센다', () => {
  assert.deepEqual(replaceAll('a-b-c', '-', '+'), { text: 'a+b+c', count: 2 });
  assert.equal(replaceAll('AbAb', 'ab', 'X', { caseSensitive: false }).count, 2);
  assert.equal(replaceAll('AbAb', 'ab', 'X', { caseSensitive: true }).count, 0);
});

test('정규식 특수문자를 그대로 찾는다', () => {
  // 정규식을 끄면 마침표는 "아무 글자"가 아니라 마침표여야 한다
  assert.equal(replaceAll('a.b', '.', '-').text, 'a-b');
  assert.equal(replaceAll('a.b', '.', '-', { regex: true }).text, '---');
});

test('잘못된 정규식은 오류를 돌려준다', () => {
  const r = replaceAll('abc', '(', 'x', { regex: true });
  assert.ok(r.error, '오류 메시지가 있어야 한다');
  assert.equal(r.text, 'abc', '원문을 그대로 둔다');
});

test('빈 검색어는 아무것도 바꾸지 않는다', () => {
  assert.deepEqual(replaceAll('abc', '', 'x'), { text: 'abc', count: 0 });
});

test('글자수와 원고지 매수를 센다', () => {
  const r = countText('가나다 라마바\n\n사아자');
  assert.equal(r.chars, 12);
  assert.equal(r.charsNoSpace, 9);
  assert.equal(r.paragraphs, 2);
  assert.equal(r.bytes, 30, '한글은 UTF-8에서 3바이트다');
  assert.equal(countText('가'.repeat(201)).sheets200, 2, '한 칸이라도 넘으면 다음 장이다');
  assert.equal(countText('').sheets200, 0);
});
