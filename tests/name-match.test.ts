import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  charStrokes, normalizeName, interleave, reduceStrokes,
  matchNames, verdictFor, VERDICTS,
} from '../lib/name-match.ts';

test('획수는 초성·중성·종성을 모두 더한다', () => {
  // 김 = ㄱ(2) + ㅣ(1) + ㅁ(4) = 7
  assert.equal(charStrokes('김'), 7);
  // 아 = ㅇ(1) + ㅏ(2) = 3, 받침 없음
  assert.equal(charStrokes('아'), 3);
});

test('겹받침은 낱자 획수의 합으로 센다', () => {
  // 앉 = ㅇ(1) + ㅏ(2) + ㄵ(ㄴ2+ㅈ3=5) = 8
  assert.equal(charStrokes('앉'), 8);
  // 값 = ㄱ(2) + ㅏ(2) + ㅄ(ㅂ4+ㅅ2=6) = 10
  assert.equal(charStrokes('값'), 10);
});

test('한글이 아닌 글자는 0획으로 센다', () => {
  for (const ch of ['A', '1', ' ', '龍', '★']) {
    assert.equal(charStrokes(ch), 0, `${ch}가 0이 아니다`);
  }
});

test('이름에서 공백과 기호를 걷어낸다', () => {
  assert.equal(normalizeName(' 김 민 수 '), '김민수');
  assert.equal(normalizeName('박지훈!!'), '박지훈');
  assert.equal(normalizeName('Jane'), '');
});

test('두 이름을 한 글자씩 번갈아 배치한다', () => {
  assert.deepEqual(interleave('김민', '이수'), ['김', '이', '민', '수']);
});

test('길이가 다른 이름은 남는 글자가 뒤에 붙는다', () => {
  // 세 글자와 두 글자를 섞는 흔한 경우 — 글자를 잃어버리면 안 된다.
  assert.deepEqual(interleave('김민수', '이수'), ['김', '이', '민', '수', '수']);
  assert.deepEqual(interleave('이수', '김민수'), ['이', '김', '수', '민', '수']);
});

test('줄이기는 두 자리가 남으면 멈춘다', () => {
  const steps = reduceStrokes([7, 5, 3, 9]);
  assert.deepEqual(steps[steps.length - 1].length, 2);
  // 7 5 3 9 → (12%10) (8%10) (12%10) = 2 8 2 → (10%10) (10%10) = 0 0
  assert.deepEqual(steps[1], [2, 8, 2]);
  assert.deepEqual(steps[2], [0, 0]);
});

test('줄이기 각 단계는 한 칸씩 짧아진다', () => {
  const steps = reduceStrokes([3, 7, 2, 9, 4, 6]);
  for (let i = 1; i < steps.length; i++) {
    assert.equal(steps[i].length, steps[i - 1].length - 1, `${i}단계 길이가 어긋난다`);
  }
});

test('줄이기 중간값은 항상 한 자리 수다', () => {
  const steps = reduceStrokes([9, 8, 7, 9, 8, 9, 7]);
  for (const step of steps.slice(1)) {
    for (const n of step) assert.ok(n >= 0 && n <= 9, `한 자리가 아니다: ${n}`);
  }
});

test('점수는 항상 0~99 범위다', () => {
  const names = ['김민수', '이지은', '박서준', '최유리', '정하늘', '강도현', '윤아름', '한겨울'];
  for (const a of names) {
    for (const b of names) {
      const r = matchNames(a, b)!;
      assert.ok(r.score >= 0 && r.score <= 99, `${a}×${b} = ${r.score}`);
    }
  }
});

test('한글이 없는 이름은 결과를 내지 않는다', () => {
  // 빈 배열을 줄이려다 터지는 대신 null로 막는다.
  assert.equal(matchNames('', '김민수'), null);
  assert.equal(matchNames('John', 'Jane'), null);
  assert.equal(matchNames('   ', '이수'), null);
});

test('한 글자 이름끼리도 계산된다', () => {
  const r = matchNames('훈', '아');
  assert.ok(r !== null);
  assert.ok(r!.score >= 0 && r!.score <= 99);
});

test('같은 입력은 항상 같은 점수를 준다', () => {
  assert.deepEqual(matchNames('김민수', '이지은'), matchNames('김민수', '이지은'));
});

test('이름 순서를 바꾸면 결과가 달라질 수 있다', () => {
  // 번갈아 배치하는 방식이라 순서가 결과에 영향을 준다. 버그가 아니라 규칙이다.
  // 어떤 조합에서는 실제로 갈리는지 확인해 규칙이 살아있음을 지킨다.
  const names = ['김민수', '이지은', '박서준', '최유리', '정하늘'];
  let differs = 0;
  for (const a of names) {
    for (const b of names) {
      if (a === b) continue;
      if (matchNames(a, b)!.score !== matchNames(b, a)!.score) differs++;
    }
  }
  assert.ok(differs > 0, '순서를 바꿔도 전부 같은 점수가 나온다');
});

test('점수 구간이 0~99를 빈틈없이 덮는다', () => {
  for (let score = 0; score <= 99; score++) {
    const v = verdictFor(score);
    assert.ok(v, `${score}점에 해당하는 구간이 없다`);
    assert.ok(score >= v.min, `${score}점이 min=${v.min} 구간에 들어갔다`);
  }
});

test('구간은 내림차순이고 최하단은 0에서 시작한다', () => {
  for (let i = 1; i < VERDICTS.length; i++) {
    assert.ok(VERDICTS[i].min < VERDICTS[i - 1].min, '구간이 내림차순이 아니다');
  }
  assert.equal(VERDICTS[VERDICTS.length - 1].min, 0);
});

test('모든 구간에 문구가 채워져 있다', () => {
  for (const v of VERDICTS) {
    assert.ok(v.label.length > 0, 'label 누락');
    assert.ok(v.emoji.length > 0, 'emoji 누락');
    assert.ok(v.comment.length >= 40, `${v.label}: 총평이 너무 짧다`);
  }
});
