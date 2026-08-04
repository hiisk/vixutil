/**
 * 마무리 수순이 스스로 어긋나지 않는지 본다.
 *
 * 자료가 없으니 위험한 곳은 탐색 하나뿐인데, 탐색은 조용히 틀린다 — 두 다트로
 * 되는 점수를 세 다트짜리로 내놓아도 수순 자체는 멀쩡해 보인다.
 *
 * 그래서 검사가 **다른 방법으로 같은 답에 이른다.** 판의 값들을 겹쳐 만든
 * 집합(한 다트로 닿는 곳, 두 다트로 닿는 곳…)으로 최소 다트 수를 구하고,
 * 중첩 반복문으로 찾은 값과 맞춰 본다. 수순 자체도 합과 마지막 다트를 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DARTS_ICON, DARTS_SLUGS, MAX_SCORE, MIN_SCORE, SCORES, scoreOf } from '../lib/darts/list.ts';
import { FINISHERS, THROWS, bogeyScores, dartsFacts, neighbours, scoresOfDarts } from '../lib/darts/facts.ts';
import { DARTS_UI } from '../lib/darts/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(SCORES.length >= 100, `${SCORES.length}가지뿐이다`);
  assert.equal(SCORES.length, 169, '2점부터 170점까지다');
  assert.equal(new Set(DARTS_SLUGS).size, SCORES.length, 'slug 중복');
  assert.equal(scoreOf('170'), 170);
  assert.equal(scoreOf('1'), undefined, '1점은 더블로 끝낼 수 없다');
  assert.equal(scoreOf('171'), undefined, '세 다트로 낼 수 있는 가장 큰 수가 170이다');
});

test('판에 있는 값이 실제 다트판과 맞는다', () => {
  // 1~20의 싱글·더블·트리플 예순에 바깥 불과 가운데 불
  assert.equal(THROWS.length, 62);
  assert.equal(new Set(THROWS.map(t => t.label)).size, THROWS.length, '이름 중복');
  for (const t of THROWS) {
    if (t.ring === 'single') assert.equal(t.value, t.sector);
    if (t.ring === 'double') assert.equal(t.value, t.sector * 2);
    if (t.ring === 'triple') assert.equal(t.value, t.sector * 3);
  }
  assert.equal(Math.max(...THROWS.map(t => t.value)), 60, '한 다트의 최고는 T20이다');
  // 마무리가 될 수 있는 것은 더블 스물과 가운데 불이다
  assert.equal(FINISHERS.length, 21);
  for (const f of FINISHERS) assert.ok(f.value % 2 === 0, `${f.label}: 더블은 짝수다`);
  assert.ok(FINISHERS.some(f => f.value === 50), '가운데 불도 마무리다');
});

test('최소 다트 수가 집합으로 구한 값과 같다', () => {
  // 다른 길: 닿을 수 있는 점수를 집합으로 겹쳐 만든다
  const values = THROWS.map(t => t.value);
  const finish = FINISHERS.map(t => t.value);
  const one = new Set(finish);
  const two = new Set<number>();
  for (const v of values) for (const f of finish) two.add(v + f);
  const three = new Set<number>();
  for (const v of values) for (const w of values) for (const f of finish) three.add(v + w + f);

  for (const score of SCORES) {
    const expected = one.has(score) ? 1 : two.has(score) ? 2 : three.has(score) ? 3 : null;
    assert.equal(dartsFacts(score).darts, expected, `${score}: 최소 다트 수가 다르다`);
  }
});

test('수순이 합과 마지막 다트를 지킨다', () => {
  for (const score of SCORES) {
    const f = dartsFacts(score);
    if (f.bogey) {
      assert.equal(f.route.length, 0, `${score}: 못 끝내는데 수순이 있다`);
      assert.equal(f.routeCount, 0);
      continue;
    }
    assert.equal(f.route.length, f.darts, `${score}: 수순 길이가 다트 수와 다르다`);
    assert.equal(f.route.reduce((a, t) => a + t.value, 0), score, `${score}: 수순의 합이 점수와 다르다`);
    const last = f.route[f.route.length - 1];
    assert.ok(last.ring === 'double' || last.ring === 'bull', `${score}: 마지막이 더블이 아니다 — ${last.label}`);
    assert.ok(f.routeCount > 0, `${score}: 수순 개수가 0이다`);
  }
  assert.deepEqual(dartsFacts(170).route.map(t => t.label), ['T20', 'T20', 'BULL']);
  assert.deepEqual(dartsFacts(40).route.map(t => t.label), ['D20']);
  assert.deepEqual(dartsFacts(100).route.map(t => t.label), ['T20', 'D20']);
});

test('세 다트로 못 끝내는 수가 알려진 일곱뿐이다', () => {
  assert.deepEqual(bogeyScores(), [159, 162, 163, 165, 166, 168, 169]);
  for (const s of bogeyScores()) assert.equal(dartsFacts(s).darts, null, `${s}: 보기 수인데 끝난다`);
  // 170은 끝나고 171부터는 목록에 없다
  assert.equal(dartsFacts(170).darts, 3);
  assert.equal(dartsFacts(167).darts, 3, '167은 T20 T19 불로 끝난다');
});

test('한 다트로 끝나는 점수가 더블과 정확히 같다', () => {
  const oneDart = SCORES.filter(s => dartsFacts(s).oneDart);
  assert.deepEqual(oneDart, FINISHERS.map(f => f.value).sort((a, b) => a - b));
  assert.equal(oneDart.length, 21, '더블 스물에 가운데 불 하나다');
  assert.ok(oneDart.includes(50), '50은 가운데 불 하나로 끝난다');
  assert.ok(!oneDart.includes(42), '42는 한 다트로 못 끝낸다');
});

test('다트 수별 개수를 합치면 169가 된다', () => {
  const counts = [1, 2, 3, null].map(n => scoresOfDarts(n, SCORES).length);
  assert.equal(counts.reduce((a, b) => a + b, 0), SCORES.length, '어느 갈래에도 안 드는 점수가 있다');
  assert.equal(counts[3], 7, '못 끝내는 수는 일곱이다');
  assert.equal(counts[0], 21, '한 다트로 끝나는 수는 스물하나다');
});

test('마무리 더블을 좋은 것부터 고른다', () => {
  // 40점은 D20 한 방이고, 32점은 D16이다 — 빗나가도 반씩 나뉘는 자리가 좋다
  assert.equal(dartsFacts(32).route[0].label, 'D16');
  // 60은 잘 알려진 대로 S20 D20이 나온다 — 도중에 더블을 쓰지 않고 좋은 더블로 끝난다
  assert.equal(dartsFacts(60).route.map(t => t.label).join(' '), 'S20 D20');
  assert.equal(dartsFacts(100).route.map(t => t.label).join(' '), 'T20 D20');
  // 80을 D20 D20으로 끝내면 더블을 두 번 걸어야 한다. 규칙이 그것을 피해 T16 D16을 고른다
  assert.equal(dartsFacts(80).route.map(t => t.label).join(' '), 'T16 D16');
  for (const score of SCORES) {
    const f = dartsFacts(score);
    if (f.bogey || f.route.length < 2) continue;
    const mid = f.route.slice(0, -1).filter(t => t.ring === 'double').length;
    // 도중에 더블을 쓰는 수순은, 그러지 않고는 끝낼 수 없을 때뿐이다
    if (mid > 0) {
      const clean = THROWS.some(v => FINISHERS.some(fin => v.value + fin.value === score && v.ring !== 'double'));
      assert.ok(!clean || f.route.length > 2, `${score}: 더블을 안 써도 되는데 도중에 썼다 — ${f.route.map(t => t.label).join(' ')}`);
    }
  }
  // 마지막 다트는 늘 더블이거나 불이다
  for (const score of SCORES) {
    const f = dartsFacts(score);
    if (f.bogey) continue;
    assert.ok(FINISHERS.some(x => x.label === f.route[f.route.length - 1].label), `${score}: 마무리가 아닌 다트로 끝난다`);
  }
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const score of SCORES) {
    const n = neighbours(score);
    assert.ok(!n.includes(score), `${score}: 이웃에 자기 자신이 있다`);
    for (const o of n) assert.ok(o >= MIN_SCORE && o <= MAX_SCORE, `${score}: 이웃이 범위 밖이다`);
  }
});

test('다트 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[DARTS_ICON], 'target', '이모지가 과녁 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = dartsFacts(170);
  for (const lang of LANG_CODES) {
    const ui = DARTS_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.scoreFaq(f).length, 3, `${lang}: 상세 FAQ 수가 다르다`);
    for (const r of ['single', 'double', 'triple', 'outer-bull', 'bull'] as const) {
      assert.ok(ui.ringLabel[r], `${lang}: ${r} 이름이 없다`);
    }
    // 다트 수 이름은 1·2·3과 "못 끝냄"까지 만들어져야 한다
    for (const n of [1, 2, 3, null]) assert.ok(ui.dartsLabel(n).length > 0, `${lang}: ${n}다트 이름이 없다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = DARTS_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(dartsFacts(170)),
      ui.desc(dartsFacts(169)),
      ...ui.scoreFaq(dartsFacts(100)).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('설명이 169가지 모두에서 만들어진다', () => {
  for (const score of SCORES) {
    const f = dartsFacts(score);
    for (const lang of LANG_CODES) {
      const ui = DARTS_UI[lang];
      const d = ui.desc(f);
      assert.ok(d.length > (DENSE.has(lang) ? 20 : 35), `${lang}/${score}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(String(score)), `${lang}/${score}: 설명에 점수가 없다`);
      // 끝낼 수 있는 점수는 설명에 수순이 들어간다
      if (!f.bogey) assert.ok(d.includes(f.route[0].label), `${lang}/${score}: 설명에 첫 다트가 없다`);
      assert.ok(ui.metaTitle(f).includes(String(score)), `${lang}/${score}: 제목에 점수가 없다`);
      assert.ok(ui.metaDesc(f).length > (DENSE.has(lang) ? 25 : 40), `${lang}/${score}: 메타 설명이 너무 짧다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const score of SCORES) {
      const title = DARTS_UI[lang].metaTitle(dartsFacts(score));
      assert.equal(seen.get(title), undefined, `"${title}"를 ${seen.get(title)}와 ${lang}/${score}가 함께 쓴다`);
      seen.set(title, `${lang}/${score}`);
    }
  }
});
