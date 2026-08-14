import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  PERCENTS, BASES, PERCENT_COUNT,
  percentSlug, parsePercentSlug, allPercentCells,
} from '../lib/percent/list.ts';
import { percentFacts, neighborCells, trim } from '../lib/percent/facts.ts';

/**
 * 퍼센트 낱장의 셈.
 *
 * 여기는 답이 **눈으로 맞는지 알 수 있는** 드문 계열이다. 그래서 검사는 손으로
 * 아는 값을 못 박고, 나머지는 되돌려서 확인한다 — 15%를 곱한 뒤 되나누면 원래
 * 수가 나와야 한다. 반올림이 그 성질을 깨뜨리는 자리가 진짜 위험한 곳이다.
 */

test('1,200칸이 빠짐없이 나온다', () => {
  const cells = allPercentCells();
  assert.equal(cells.length, PERCENT_COUNT);
  assert.equal(cells.length, PERCENTS.length * BASES.length);
  assert.equal(new Set(cells.map(c => percentSlug(c.percent, c.base))).size, cells.length,
    '같은 주소가 두 번 있다');
  assert.equal(new Set(PERCENTS).size, PERCENTS.length, '같은 퍼센트가 두 번 있다');
  assert.equal(new Set(BASES).size, BASES.length, '같은 기준수가 두 번 있다');
});

test('목록이 오름차순이다 — 이웃 감기가 그것을 믿는다', () => {
  for (let i = 1; i < PERCENTS.length; i++) assert.ok(PERCENTS[i] > PERCENTS[i - 1], `퍼센트 ${PERCENTS[i]}`);
  for (let i = 1; i < BASES.length; i++) assert.ok(BASES[i] > BASES[i - 1], `기준수 ${BASES[i]}`);
});

test('주소 조각과 값이 서로의 역이다', () => {
  for (const c of allPercentCells()) {
    const s = percentSlug(c.percent, c.base);
    assert.match(s, /^\d+-of-\d+$/, `${s}가 주소로 못 쓸 꼴이다`);
    assert.deepEqual(parsePercentSlug(s), c, `${s}를 되돌리면 다르다`);
  }
});

test('목록 밖과 이상한 꼴은 거른다', () => {
  for (const bad of ['', '15', '15-of-', '-of-200', '15-of-200-of-3', '11-of-200', '15-of-201',
    '015-of-200', '15-of-0200', '0-of-200', '15-of-0', 'x-of-200', '15-of-y', '15of200']) {
    assert.equal(parsePercentSlug(bad), null, `"${bad}"가 통과했다`);
  }
  assert.deepEqual(parsePercentSlug('15-of-200'), { percent: 15, base: 200 });
});

test('손으로 아는 값을 못 박는다', () => {
  const f = percentFacts(15, 200);
  assert.equal(f.value, 30);
  assert.equal(f.decreased, 170);
  assert.equal(f.increased, 230);
  assert.equal(f.reverseRatio, 7.5);       // 15는 200의 7.5%
  assert.equal(f.fraction, 0.15);
  assert.equal(percentFacts(50, 100).value, 50);
  assert.equal(percentFacts(100, 250).value, 250);
  assert.equal(percentFacts(1, 100000).value, 1000);
  /* 딱 안 떨어지는 값도 자릿수를 안 잃는다 */
  assert.equal(percentFacts(7, 125).value, 8.75);
  assert.equal(percentFacts(3, 25).value, 0.75);
});

test('되돌리면 기준수가 나온다 — 반올림이 성질을 깨뜨리지 않는다', () => {
  /*
   * value에서 원래 수를 되찾는 계산이 실제로 화면에 나간다("30이 15%라면 원래는
   * 200"). 곱한 값을 자른 뒤 되나누면 어긋날 수 있으므로 1,200칸을 다 본다.
   */
  const off: string[] = [];
  for (const c of allPercentCells()) {
    const f = percentFacts(c.percent, c.base);
    if (Math.abs(f.wholeFromValue - c.base) > 0.01) {
      off.push(`${c.percent}% of ${c.base}: 되돌리니 ${f.wholeFromValue}`);
    }
  }
  assert.deepEqual(off.slice(0, 10), [], `되돌려도 기준수가 안 나오는 칸 ${off.length}개`);
});

test('깎은 값과 붙인 값이 기준수를 사이에 둔다', () => {
  for (const c of allPercentCells()) {
    const f = percentFacts(c.percent, c.base);
    assert.ok(f.decreased <= c.base, `${f.percent}% of ${f.base}: 깎았는데 늘었다`);
    assert.ok(f.increased >= c.base, `${f.percent}% of ${f.base}: 붙였는데 줄었다`);
    assert.equal(trim(f.increased - f.decreased), trim(f.value * 2),
      `${f.percent}% of ${f.base}: 위아래 폭이 값의 두 배가 아니다`);
    /* 100%면 깎아서 0이 된다 — 할인 페이지에서 가장 눈에 띄는 자리다 */
    if (c.percent === 100) assert.equal(f.decreased, 0);
  }
});

test('값이 퍼센트·기준수에 대해 단조증가한다', () => {
  for (const b of BASES) {
    let prev = -1;
    for (const p of PERCENTS) {
      const v = percentFacts(p, b).value;
      assert.ok(v > prev, `기준수 ${b}: ${p}%에서 값이 안 늘었다`);
      prev = v;
    }
  }
  for (const p of PERCENTS) {
    let prev = -1;
    for (const b of BASES) {
      const v = percentFacts(p, b).value;
      assert.ok(v > prev, `${p}%: 기준수 ${b}에서 값이 안 늘었다`);
      prev = v;
    }
  }
});

test('잘린 비율에 표시가 붙는다', () => {
  /* 15/700 = 2.142857…% 는 끊긴다. 끊고서 안 밝히면 되곱했을 때 안 맞는다 */
  const cut = percentFacts(15, 700);
  assert.ok(cut.ratioRounded, '2.142857…%가 안 잘렸다고 한다');
  const exact = percentFacts(15, 200);
  assert.ok(!exact.ratioRounded, '7.5%가 잘렸다고 한다');
  /* 잘렸다고 표시된 칸은 실제로 딱 안 떨어져야 한다 */
  for (const c of allPercentCells()) {
    const f = percentFacts(c.percent, c.base);
    const raw = (c.percent / c.base) * 100;
    assert.equal(f.ratioRounded, trim(raw) !== raw, `${c.percent}/${c.base}: 잘림 표시가 어긋난다`);
  }
});

test('표가 목록 전체를 담고 자기 칸을 포함한다', () => {
  const f = percentFacts(15, 200);
  assert.equal(f.byPercent.length, PERCENTS.length);
  assert.equal(f.byBase.length, BASES.length);
  assert.ok(f.byPercent.some(r => r.percent === 15 && r.value === f.value), '제 퍼센트가 표에 없다');
  assert.ok(f.byBase.some(r => r.base === 200 && r.value === f.value), '제 기준수가 표에 없다');
  /* 표의 값이 낱장 계산과 같다 */
  for (const r of f.byPercent) assert.equal(r.value, percentFacts(r.percent, 200).value);
  for (const r of f.byBase) assert.equal(r.value, percentFacts(15, r.base).value);
});

test('이웃이 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map<string, number>(
    allPercentCells().map(c => [percentSlug(c.percent, c.base), 0]),
  );
  for (const c of allPercentCells()) {
    const self = percentSlug(c.percent, c.base);
    for (const n of neighborCells(c.percent, c.base)) {
      const k = percentSlug(n.percent, n.base);
      assert.ok(inbound.has(k), `${self}의 이웃 ${k}가 목록 밖이다`);
      assert.notEqual(k, self, `${self}가 자기 자신을 이웃으로 든다`);
      inbound.set(k, inbound.get(k)! + 1);
    }
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([k]) => k);
  assert.deepEqual(orphans, [], `들어오는 링크가 0인 낱장 ${orphans.length}개`);
});

test('낱장마다 본문이 다르다', () => {
  /* 값이 겹치는 칸이 있다(10% of 200 = 20% of 100). 표까지 넣으면 갈린다 */
  const seen = new Map<string, string>();
  for (const c of allPercentCells()) {
    const f = percentFacts(c.percent, c.base);
    const body = [f.value, f.decreased, f.increased, f.reverseRatio,
      f.byPercent.map(r => r.value).join(',')].join('|');
    const self = percentSlug(c.percent, c.base);
    assert.equal(seen.get(body), undefined, `${self}와 ${seen.get(body)}의 본문이 같다`);
    seen.set(body, self);
  }
});

test('오늘 날짜에 기대지 않는다', () => {
  assert.deepEqual(percentFacts(15, 200), percentFacts(15, 200));
});
