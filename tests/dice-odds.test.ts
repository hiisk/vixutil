/**
 * 주사위 확률표가 스스로 어긋나지 않는지 본다.
 *
 * 확률표의 위험은 그럴듯한 오답이다. 3d6에서 합 10의 경우의 수를 27 대신 25로
 * 적어도 표는 멀쩡해 보인다. 그래서 표에는 주사위 개수와 합만 두고, 셈이
 * 스스로 맞는지를 검사한다 — 경우의 수를 다 더하면 6의 거듭제곱이 되어야 하고,
 * 분포는 좌우 대칭이어야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DICE_COUNTS, DICE_ICON, FACES, ROLLS, ROLL_SLUGS, rollOf, rollsOfDice } from '../lib/dice/list.ts';
import { neighbourSums, peakSums, rollFacts, similarOdds, totalFor, waysFor } from '../lib/dice/facts.ts';
import { DICE_UI } from '../lib/dice/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { hanProblem } from './han.ts';

test('100가지가 넘는다', () => {
  assert.ok(ROLLS.length >= 100, `${ROLLS.length}가지뿐이다`);
  // 개수 n에서 합은 n부터 6n까지 5n+1가지다 — 1~6개면 6+11+16+21+26+31
  assert.equal(ROLLS.length, DICE_COUNTS.reduce((n, d) => n + 5 * d + 1, 0));
});

test('열쇠가 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(ROLL_SLUGS).size, ROLLS.length, 'slug 중복');
  for (const r of ROLLS) {
    assert.match(r.slug, /^[1-8]d6-\d+$/, `주소에 못 쓰는 slug: ${r.slug}`);
    assert.equal(r.slug, `${r.dice}d6-${r.sum}`, `${r.slug}: 열쇠가 값과 다르다`);
  }
});

test('합의 범위가 개수와 맞는다', () => {
  for (const d of DICE_COUNTS) {
    const sums = rollsOfDice(d).map(r => r.sum);
    assert.equal(Math.min(...sums), d, `${d}개: 가장 작은 합이 개수와 다르다`);
    assert.equal(Math.max(...sums), d * FACES, `${d}개: 가장 큰 합이 개수×6과 다르다`);
    assert.equal(new Set(sums).size, sums.length, `${d}개: 합이 겹친다`);
  }
});

test('경우의 수를 다 더하면 6의 거듭제곱이다', () => {
  // 이 검사 하나가 표 전체를 잡는다 — 한 칸이라도 틀리면 합계가 어긋난다
  for (const d of DICE_COUNTS) {
    const sum = rollsOfDice(d).reduce((n, r) => n + waysFor(d, r.sum), 0);
    assert.equal(sum, totalFor(d), `${d}개: 경우의 수 합계가 ${FACES}^${d}와 다르다`);
    assert.equal(totalFor(d), FACES ** d);
  }
});

test('분포가 좌우 대칭이다', () => {
  // 합 s와 합 7n-s는 눈을 뒤집으면 서로 바뀌므로 경우의 수가 같아야 한다
  for (const r of ROLLS) {
    assert.equal(
      waysFor(r.dice, r.sum),
      waysFor(r.dice, 7 * r.dice - r.sum),
      `${r.slug}: 대칭이 깨졌다`,
    );
  }
});

test('널리 알려진 값과 맞는다', () => {
  assert.equal(waysFor(2, 7), 6, '2d6에서 7은 여섯 가지다');
  assert.equal(waysFor(2, 2), 1, '2d6에서 2는 한 가지다');
  assert.equal(waysFor(2, 12), 1, '2d6에서 12는 한 가지다');
  assert.equal(waysFor(3, 10), 27, '3d6에서 10은 스물일곱 가지다');
  assert.equal(waysFor(3, 3), 1);
  assert.equal(rollFacts(rollOf('2d6-7')!).percent, 16.67, '2d6에서 7은 16.67%다');
  assert.equal(rollFacts(rollOf('1d6-4')!).percent, 16.67, '주사위 하나는 어느 눈이든 16.67%다');
});

test('확률이 0으로 보이지 않는다', () => {
  // 6개로 합 6이 나올 확률은 0.0021%다 — 둘째 자리에서 자르면 "0%"가 되어 거짓말이 된다
  for (const r of ROLLS) {
    const f = rollFacts(r);
    assert.ok(f.percent > 0, `${r.slug}: 확률이 0으로 나온다`);
    assert.ok(f.atLeast > 0 && f.atMost > 0, `${r.slug}: 누적 확률이 0으로 나온다`);
  }
  assert.equal(rollFacts(rollOf('6d6-6')!).percent, 0.0021);
});

test('누적 확률이 앞뒤로 맞는다', () => {
  for (const r of ROLLS) {
    const f = rollFacts(r);
    // 이상과 이하는 자기 자신을 두 번 세므로 합이 100 + 자기 확률이다
    assert.ok(Math.abs(f.atLeast + f.atMost - 100 - f.percent) < 0.05, `${r.slug}: 누적이 맞지 않는다`);
  }
  // 가장 작은 합은 "이 값 이상"이 100%, 가장 큰 합은 "이 값 이하"가 100%다
  for (const d of DICE_COUNTS) {
    assert.equal(rollFacts(rollOf(`${d}d6-${d}`)!).atLeast, 100, `${d}개: 최소 합의 이상 확률이 100이 아니다`);
    assert.equal(rollFacts(rollOf(`${d}d6-${d * 6}`)!).atMost, 100, `${d}개: 최대 합의 이하 확률이 100이 아니다`);
  }
});

test('가장 흔한 합이 평균 자리에 있다', () => {
  for (const d of DICE_COUNTS) {
    const peaks = peakSums(d);
    const mean = 3.5 * d;
    if (d === 1) {
      assert.equal(peaks.length, 6, '주사위 하나는 여섯 눈이 모두 같은 확률이다');
      continue;
    }
    // 개수가 짝수면 평균이 정수라 최빈값이 하나, 홀수면 평균이 .5라 둘이다
    assert.equal(peaks.length, d % 2 === 0 ? 1 : 2, `${d}개: 최빈 합의 개수가 이상하다`);
    for (const p of peaks) assert.ok(Math.abs(p - mean) <= 0.5, `${d}개: 최빈 합 ${p}이 평균 ${mean}에서 멀다`);
  }
  assert.deepEqual(peakSums(2), [7]);
  assert.deepEqual(peakSums(3), [10, 11]);
});

test('평균 합은 개수에 3.5를 곱한 값이다', () => {
  for (const r of ROLLS) assert.equal(rollFacts(r).mean, 3.5 * r.dice, `${r.slug}: 평균이 다르다`);
});

test('순위가 경우의 수와 어긋나지 않는다', () => {
  for (const r of ROLLS) {
    const f = rollFacts(r);
    assert.equal(f.isPeak, f.rank === 0, `${r.slug}: 최빈 판정과 순위가 어긋난다`);
    const more = rollsOfDice(r.dice).filter(o => waysFor(o.dice, o.sum) > f.ways).length;
    assert.equal(f.rank, more, `${r.slug}: 순위가 셈과 다르다`);
  }
});

test('이웃과 비슷한 굴림이 자기 자신을 빼고 나온다', () => {
  for (const r of ROLLS) {
    const near = neighbourSums(r.slug);
    assert.ok(!near.some(o => o.slug === r.slug), `${r.slug}: 이웃에 자기 자신이 있다`);
    for (const o of near) assert.equal(o.dice, r.dice, `${r.slug}: 이웃에 다른 개수가 섞였다`);
    const sums = near.map(o => o.sum);
    assert.deepEqual(sums, [...sums].sort((a, b) => a - b), `${r.slug}: 이웃이 합 순서가 아니다`);

    const similar = similarOdds(r.slug);
    assert.ok(!similar.some(o => o.slug === r.slug), `${r.slug}: 비슷한 굴림에 자기 자신이 있다`);
    assert.ok(similar.length > 0, `${r.slug}: 비슷한 굴림이 없다`);
  }
});

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = rollFacts(rollOf('2d6-7')!);
  for (const lang of LANG_CODES) {
    const ui = DICE_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.rollFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const d of DICE_COUNTS) {
      assert.ok(ui.diceTitle(d).length > 0, `${lang}: ${d}개 이름이 없다`);
      assert.ok(ui.diceNote(d).length > 10, `${lang}: ${d}개 설명이 없다`);
    }
  }
});

test('설명이 모든 항목에서 만들어진다', () => {
  for (const r of ROLLS) {
    const f = rollFacts(r);
    for (const lang of LANG_CODES) {
      const d = DICE_UI[lang].desc(f);
      const floor = lang === 'ja' || lang === 'ko' ? 15 : 25;
      assert.ok(d.length > floor, `${lang}/${r.slug}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(String(f.sum)), `${lang}/${r.slug}: 설명에 합이 없다`);
    }
  }
});

test('언어마다 소수점 기호가 제자리에 있다', () => {
  // 독일어·프랑스어·스페인어·포르투갈어는 소수점이 쉼표다. 16.67%라고 쓰면 다른 수로 읽힌다
  const f = rollFacts(rollOf('2d6-7')!);
  for (const lang of ['de', 'fr', 'es', 'pt'] as const) {
    const d = DICE_UI[lang].desc(f);
    assert.ok(d.includes('16,67'), `${lang}: 소수점이 쉼표가 아니다 — ${d}`);
    assert.ok(!d.includes('16.67'), `${lang}: 점을 쓴 소수가 남아 있다 — ${d}`);
  }
  for (const lang of ['en', 'ko', 'ja', 'hi'] as const) {
    assert.ok(DICE_UI[lang].desc(f).includes('16.67'), `${lang}: 소수점이 점이 아니다`);
  }
  // 표에 적는 숫자도 같은 기호를 써야 한다 — 글은 12,5%인데 표는 12.5%면 한 화면에서 어긋난다
  for (const lang of ['de', 'fr', 'es', 'pt'] as const) {
    assert.equal(DICE_UI[lang].fmt(12.5), '12,5', `${lang}: 표의 소수점이 쉼표가 아니다`);
  }
  for (const lang of ['en', 'ko', 'ja', 'hi'] as const) {
    assert.equal(DICE_UI[lang].fmt(12.5), '12.5', `${lang}: 표의 소수점이 점이 아니다`);
  }
  // 작은 확률이 표에서도 0으로 뭉개지지 않아야 한다
  for (const lang of LANG_CODES) {
    assert.ok(Number.parseFloat(DICE_UI[lang].fmt(0.0021).replace(',', '.')) > 0, `${lang}: 표에서 확률이 0이 된다`);
  }
});

test('주사위가 한 개일 때 단수로 적는다', () => {
  // "Rolling 1 dice", "Avec 1 dés" 같은 어긋남을 막는다
  const one = rollFacts(rollOf('1d6-3')!);
  assert.ok(DICE_UI.en.desc(one).includes('1 die'), `en: ${DICE_UI.en.desc(one)}`);
  assert.ok(!DICE_UI.en.desc(one).includes('1 dice'), 'en: 복수형이 남아 있다');
  assert.ok(DICE_UI.fr.desc(one).includes('1 dé,'), `fr: ${DICE_UI.fr.desc(one)}`);
  assert.ok(DICE_UI.es.desc(one).includes('1 dado'), `es: ${DICE_UI.es.desc(one)}`);
  assert.ok(DICE_UI.pt.desc(one).includes('1 dado'), `pt: ${DICE_UI.pt.desc(one)}`);
  assert.ok(DICE_UI.de.desc(one).includes('1 Würfel '), `de: ${DICE_UI.de.desc(one)}`);
  const many = rollFacts(rollOf('3d6-10')!);
  assert.ok(DICE_UI.en.desc(many).includes('3 dice'), 'en: 복수형이 아니다');
  assert.ok(DICE_UI.fr.desc(many).includes('3 dés'), 'fr: 복수형이 아니다');
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const f = rollFacts(rollOf('3d6-10')!);
  for (const lang of LANG_CODES) {
    const ui = DICE_UI[lang];
    const texts = [
      ui.hubTitle, ui.hubLead, ui.hubMetaTitle, ui.hubMetaDesc, ui.section, ui.similarNote,
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...ui.rollFaq(f).flatMap(q => [q.q, q.a]),
      ui.desc(f), ui.diceNote(3), ui.metaTitle(f), ui.metaDesc(f),
    ];
    for (const t of texts) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(t), `${lang}: 한글이 섞였다 — ${t}`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(t), `${lang}: 가나가 섞였다 — ${t}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(t), `${lang}: 데바나가리가 섞였다 — ${t}`);
      assert.equal(hanProblem(lang, t), '');
    }
  }
});

test('모든 굴림이 열 언어 메타를 만든다', () => {
  for (const r of ROLLS) {
    const f = rollFacts(r);
    for (const lang of LANG_CODES) {
      const ui = DICE_UI[lang];
      assert.ok(ui.metaTitle(f).includes(String(f.sum)), `${lang}/${r.slug}: 제목에 합이 없다`);
      const desc = ui.metaDesc(f);
      assert.ok(desc.includes(String(f.sum)), `${lang}/${r.slug}: 설명에 합이 없다`);
      const floor = lang === 'ja' || lang === 'ko' ? 30 : 45;
      assert.ok(desc.length > floor, `${lang}/${r.slug}: 설명이 너무 짧다`);
    }
  }
});

test('분포 그림에 넘기는 값이 표와 같다', () => {
  for (const r of ROLLS) {
    const f = rollFacts(r);
    assert.equal(f.curve.length, 5 * r.dice + 1, `${r.slug}: 그림의 막대 수가 다르다`);
    assert.equal(f.curve.reduce((n, c) => n + c.ways, 0), f.total, `${r.slug}: 그림의 합계가 다르다`);
    const mine = f.curve.find(c => c.sum === r.sum);
    assert.equal(mine?.ways, f.ways, `${r.slug}: 그림의 막대가 이 합의 경우의 수와 다르다`);
  }
});

test('주사위 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[DICE_ICON], 'dice', '이모지가 주사위 아이콘으로 이어지지 않는다');
});
