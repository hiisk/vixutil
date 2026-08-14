import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  HEIGHTS, WEIGHTS, CELL_COUNT, AP_CUTS, WHO_CUTS,
  bmiOf, bandOf, bmiCell, cellSlug, parseCellSlug, neighborCells, sameBmiCells, allCells,
} from '../lib/body/bmi-grid.ts';

/**
 * BMI 격자 4,131칸(언어마다 = 41,310장)의 셈.
 *
 * 건강 수치라 **틀리면 사람에게 틀린 말을 한다.** 그래서 값 몇 개를 외우는 대신
 * 성질로 선다 — 기준선이 계산기와 같은가, 구간이 단조로운가, 표준 체중을 넣으면
 * 정상으로 나오는가.
 */
const ROOT = join(import.meta.dirname, '..');

test('격자가 4,131칸이다 — 41,310장의 근거', () => {
  assert.equal(HEIGHTS.length, 51, '키가 145~195 51칸이 아니다');
  assert.equal(WEIGHTS.length, 81, '몸무게가 40~120 81칸이 아니다');
  assert.equal(CELL_COUNT, 4131);
  assert.equal(allCells().length, 4131);
  assert.equal(HEIGHTS[0], 145);
  assert.equal(HEIGHTS.at(-1), 195);
  assert.equal(WEIGHTS[0], 40);
  assert.equal(WEIGHTS.at(-1), 120);
});

test('기준선이 BMI 계산기와 같다 — 두 곳이 갈리면 같은 사람에게 다른 판정을 낸다', () => {
  /*
   * lib/body/shape.ts의 BMI 계산기가 쓰는 끊는 자리를 원문에서 읽어 맞댄다.
   * 계산기는 `b < 18.5 ? 0 : b < 23 ? 1 : b < 25 ? 2 : b < 30 ? 3 : 4` 꼴이다.
   */
  const src = readFileSync(join(ROOT, 'lib', 'body', 'shape.ts'), 'utf8');
  const line = src.split('\n').find(l => l.includes('const band =') && l.includes('18.5'));
  assert.ok(line, 'BMI 계산기의 구간 나누는 줄을 못 찾았다 — 세는 방식이 깨졌다');
  const nums = [...line!.matchAll(/b < ([\d.]+)/g)].map(m => Number(m[1]));
  assert.deepEqual(nums, [...AP_CUTS], `계산기는 ${nums.join('·')}로 끊는데 격자는 ${AP_CUTS.join('·')}로 끊는다`);

  const whoLine = src.split('\n').find(l => l.includes('const who =') && l.includes('18.5'));
  assert.ok(whoLine, 'WHO 구간 줄을 못 찾았다');
  assert.deepEqual([...whoLine!.matchAll(/b < ([\d.]+)/g)].map(m => Number(m[1])), [...WHO_CUTS]);
});

test('BMI 값을 손으로 못 박는다', () => {
  /* 170cm 70kg = 70 ÷ 1.7² = 24.2 · 160cm 50kg = 19.5 */
  assert.equal(bmiCell(170, 70).bmi, 24.2);
  assert.equal(bmiCell(160, 50).bmi, 19.5);
  assert.equal(bmiCell(180, 81).bmi, 25);
  /* 표준 체중은 BMI 22 — 170cm면 63.6kg */
  assert.equal(bmiCell(170, 70).ideal, 63.6);
});

test('구간이 단조롭다 — 몸무게가 늘면 구간이 내려가지 않는다', () => {
  for (const h of HEIGHTS) {
    let apPrev = -1, whoPrev = -1;
    for (const w of WEIGHTS) {
      const c = bmiCell(h, w);
      assert.ok(c.ap >= apPrev, `${h}/${w}: 아·태 구간이 거꾸로 갔다`);
      assert.ok(c.who >= whoPrev, `${h}/${w}: WHO 구간이 거꾸로 갔다`);
      apPrev = c.ap; whoPrev = c.who;
    }
  }
});

test('아시아·태평양 기준이 WHO보다 엄하다', () => {
  /* 23·25로 끊으므로 같은 BMI에서 아·태 구간이 WHO보다 낮을 수 없다 */
  for (const { height, weight } of allCells()) {
    const c = bmiCell(height, weight);
    assert.ok(c.ap >= c.who, `${height}/${weight}: 아·태(${c.ap})가 WHO(${c.who})보다 느슨하다`);
  }
});

test('표준 체중을 넣으면 정상 구간이다', () => {
  /* BMI 22는 어느 기준에서도 정상(구간 1)이어야 한다 */
  for (const h of HEIGHTS) {
    const ideal = Math.round(bmiCell(h, 70).ideal);
    if (!WEIGHTS.includes(ideal)) continue;
    const c = bmiCell(h, ideal);
    assert.equal(c.ap, 1, `${h}cm 표준체중 ${ideal}kg이 정상이 아니다 (BMI ${c.bmi})`);
  }
});

test('정상 범위와 거리 계산이 맞물린다', () => {
  for (const { height, weight } of allCells()) {
    const c = bmiCell(height, weight);
    assert.ok(c.healthy[0] < c.healthy[1], `${height}: 정상 범위가 뒤집혔다`);
    if (weight >= c.healthy[0] && weight <= c.healthy[1]) {
      assert.equal(c.toHealthy, 0, `${height}/${weight}: 범위 안인데 거리가 있다`);
    } else {
      assert.ok(c.toHealthy > 0, `${height}/${weight}: 범위 밖인데 거리가 0이다`);
    }
  }
});

test('주소 조각과 칸이 서로의 역이다', () => {
  for (const { height, weight } of allCells()) {
    const s = cellSlug(height, weight);
    assert.deepEqual(parseCellSlug(s), { height, weight }, `${s}를 되돌리면 다르다`);
  }
});

test('범위 밖과 이상한 꼴은 거른다 — 무한한 주소가 생기면 안 된다', () => {
  for (const bad of ['', '170', '170-', '-70', '170-70-1', '144-70', '196-70', '170-39', '170-121', 'abc-70', '170-70.5', '0170-70']) {
    assert.equal(parseCellSlug(bad), null, `"${bad}"가 통과했다`);
  }
});

test('이웃이 서로를 가리킨다 — 격자에 고아가 없다', () => {
  /*
   * 상하좌우는 상대도 나를 가리키므로 원리상 고아가 없다. 그래도 **결과로** 센다 —
   * 이 저장소는 "앞에서 여섯 개만 뽑아" 4,100칸이 고아가 되는 병을 여러 번 겪었다.
   */
  const inbound = new Map<string, number>(allCells().map(c => [cellSlug(c.height, c.weight), 0]));
  for (const c of allCells()) {
    for (const n of neighborCells(c.height, c.weight)) {
      const k = cellSlug(n.height, n.weight);
      assert.ok(inbound.has(k), `${c.height}/${c.weight}의 이웃 ${k}가 격자 밖이다`);
      inbound.set(k, inbound.get(k)! + 1);
    }
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([k]) => k);
  assert.deepEqual(orphans.slice(0, 5), [], `들어오는 링크가 0인 칸 ${orphans.length}개`);
});

test('같은 BMI 조합은 실제로 BMI가 같다', () => {
  for (const [h, w] of [[170, 70], [160, 50], [185, 95], [150, 45]] as const) {
    const me = bmiCell(h, w).bmi;
    const same = sameBmiCells(h, w);
    assert.ok(same.length > 0, `${h}/${w}: 같은 BMI 조합이 하나도 없다`);
    for (const s of same) {
      assert.equal(bmiCell(s.height, s.weight).bmi, me, `${h}/${w}의 짝 ${s.height}/${s.weight}가 BMI가 다르다`);
      assert.notEqual(s.height, h, '자기 자신을 든다');
    }
  }
});

test('칸마다 본문이 다르다 — 숫자만 바뀐 같은 문장이면 색인이 안 된다', () => {
  /* 표본으로 한 줄(키 170)을 통째로 본다 */
  const seen = new Map<string, string>();
  for (const w of WEIGHTS) {
    const c = bmiCell(170, w);
    const body = [c.bmi, c.ap, c.who, c.ideal, c.healthy.join('~'), c.toHealthy,
      sameBmiCells(170, w).map(s => `${s.height}:${s.weight}`).join(',')].join('|');
    const prev = seen.get(body);
    assert.equal(prev, undefined, `170/${w}와 170/${prev}의 본문이 같다`);
    seen.set(body, String(w));
  }
});

test('bandOf가 경계에서 위쪽에 붙는다', () => {
  /* 23.0은 과체중(2), 22.9는 정상(1) — 경계를 어느 쪽에 넣는지가 판정을 가른다 */
  assert.equal(bandOf(22.9, AP_CUTS), 1);
  assert.equal(bandOf(23, AP_CUTS), 2);
  assert.equal(bandOf(18.4, AP_CUTS), 0);
  assert.equal(bandOf(18.5, AP_CUTS), 1);
  assert.equal(bmiOf(70, 170).toFixed(4), '24.2215');
});
