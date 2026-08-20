import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FUNCTIONS, functionStack, type FnCode } from '../lib/mbti/functions.ts';
import { MBTI_TYPES } from '../lib/mbti-match.ts';

/**
 * 인지기능 순서가 널리 쓰이는 표와 맞는가.
 *
 * 규칙으로 푸니 표를 손으로 적을 일이 없지만, 규칙을 잘못 짜면 열여섯이
 * 통째로 틀린 채 조용히 나간다 — 「INFP는 Fi Ne Si Te」를 아는 사람이
 * 보면 바로 아는 종류의 오류다. 그래서 열여섯을 다 못 박는다.
 */
const WANT: Record<string, [FnCode, FnCode, FnCode, FnCode]> = {
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
};

test('열여섯 유형의 기능 순서가 표와 맞는다', () => {
  assert.equal(Object.keys(WANT).length, 16);
  for (const [type, want] of Object.entries(WANT)) {
    assert.deepEqual(functionStack(type), want, type);
  }
});

test('MBTI_TYPES 열여섯이 모두 풀린다', () => {
  assert.equal(MBTI_TYPES.length, 16);
  for (const t of MBTI_TYPES) {
    const s = functionStack(t);
    assert.equal(new Set(s).size, 4, `${t}에 같은 기능이 두 번 나온다`);
    for (const f of s) assert.ok(FUNCTIONS[f], `${t}: ${f} 설명이 없다`);
  }
});

test('짜임이 스스로 맞는다 — 방향과 짝', () => {
  for (const t of MBTI_TYPES) {
    const [dom, aux, ter, inf] = functionStack(t);
    /* 주·부는 방향이 반대다 */
    assert.notEqual(dom[1], aux[1], `${t}: 주·부가 같은 방향이다`);
    /* 열등은 주기능의 짝이고 방향이 반대다 */
    assert.notEqual(inf[0], dom[0], `${t}: 열등이 주기능과 같은 기능이다`);
    assert.notEqual(inf[1], dom[1], `${t}: 열등이 주기능과 같은 방향이다`);
    /* 인식(S/N) 둘, 판단(T/F) 둘이 하나씩 든다 */
    const kinds = [dom, aux, ter, inf].map(f => ('SN'.includes(f[0]) ? 'P' : 'J'));
    assert.equal(kinds.filter(k => k === 'P').length, 2, `${t}: 인식기능이 둘이 아니다`);
    /* 첫 글자가 E면 주기능이 밖을 향한다 */
    assert.equal(dom[1], t[0] === 'E' ? 'e' : 'i', `${t}: 주기능 방향이 첫 글자와 어긋난다`);
  }
});

test('여덟 기능이 고르게 주기능이 된다', () => {
  /* 여덟 기능 각각이 정확히 두 유형의 주기능이다 — 한쪽으로 쏠리면 규칙이 틀린 것이다 */
  const count: Record<string, number> = {};
  for (const t of MBTI_TYPES) count[functionStack(t)[0]] = (count[functionStack(t)[0]] ?? 0) + 1;
  assert.equal(Object.keys(count).length, 8, `주기능이 ${Object.keys(count).length}가지뿐이다`);
  for (const [f, n] of Object.entries(count)) assert.equal(n, 2, `${f}이 주기능인 유형이 ${n}개다`);
});

test('이 검사가 실제로 문다', () => {
  /* J/P를 뒤집으면 알려진 표와 달라야 한다 */
  const flipped = functionStack('INFJ');
  assert.notDeepEqual(flipped, WANT.INFP);
  assert.deepEqual(flipped, WANT.INFJ);
  /* 글자를 하나만 바꿔도 순서가 바뀐다 — 안 바뀌면 계산을 안 하는 것이다 */
  let same = 0;
  for (const t of MBTI_TYPES) if (functionStack(t)[0] === functionStack('INFP')[0]) same++;
  assert.equal(same, 2, `Fi가 주기능인 유형이 ${same}개다`);
});
