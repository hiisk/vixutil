/**
 * 공기청정기 — ACH 계산이 공표된 보기·규칙과 맞는지 본다.
 *
 * lib/purifier 는 미터 단위로 ACH를 낸다. 여기서는 그 길을 쓰지 않고, 미국
 * 자료에 실려 있는 피트 단위 보기와 AHAM의 3분의 2 규칙을 그대로 옮겨 적어
 * 대조한다. 단위계가 다르므로 계산이 겹치지 않는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AREAS, CADRS, CEILING_M, CELLS, PURIFIER_SLUGS, SQM_PER_PYEONG, TARGET_ACH,
  cellOf, slugOf, sqmOf,
} from '../lib/purifier/list.ts';
import {
  achOf, coverablePyeong, gradeOf, minutesToFall, neededCadr, purifierFacts, volumeOf,
} from '../lib/purifier/facts.ts';

const CU_FT_PER_CU_M = 35.3146667;
const SQ_FT_PER_SQ_M = 10.7639104;

const facts = PURIFIER_SLUGS.map(s => purifierFacts(cellOf(s)!));

test('칸이 224개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(AREAS.length, 16);
  assert.equal(CADRS.length, 14);
  assert.equal(CELLS.length, 16 * 14);
  assert.equal(new Set(PURIFIER_SLUGS).size, CELLS.length);
  for (const slug of PURIFIER_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
  }
});

test('1평이 3.3058㎡이고 천장이 8피트와 거의 같다', () => {
  // 여섯 자 곱하기 여섯 자다 — 어림수가 아니라 정의다
  assert.equal(SQM_PER_PYEONG, 400 / 121);
  assert.ok(Math.abs(sqmOf(1) - 3.3058) < 0.0005);
  assert.ok(Math.abs(sqmOf(10) - 33.06) < 0.005);
  // KS 시험실은 2.4m, 미국 기준은 8피트(2.4384m) — 사실상 같은 방이다
  assert.equal(CEILING_M, 2.4);
  assert.ok(Math.abs(CEILING_M - 8 / 3.280839895) < 0.04);
});

test('미국 자료의 보기를 미터로 옮겨도 같은 ACH가 나온다', () => {
  // 300제곱피트 × 8피트 방에 CADR 200cfm이면 5.0회라고 실려 있다
  const roomSqm = 300 / SQ_FT_PER_SQ_M;
  const pyeong = roomSqm / SQM_PER_PYEONG;
  const cadrCms = 200 / CU_FT_PER_CU_M; // 분당 세제곱미터로
  // 저쪽은 천장 8피트, 이쪽은 2.4m라 부피가 조금 다르다 — 그만큼만 어긋나야 한다
  const mine = achOf(cadrCms, pyeong);
  const theirs = (200 * 60) / (300 * 8);
  assert.equal(Math.round(theirs * 10) / 10, 5);
  assert.ok(Math.abs(mine - theirs * (8 / 3.280839895 / CEILING_M)) < 0.01, `${mine} vs ${theirs}`);
});

test('AHAM의 3분의 2 규칙이 정확히 다섯 번으로 떨어진다', () => {
  // CADR(cfm)이 넓이(제곱피트)의 2/3이면, 천장 8피트에서 ACH = (2/3)·A·60 ÷ 8A = 5
  for (const sqFt of [100, 250, 300, 500, 800]) {
    const cadrCfm = (2 / 3) * sqFt;
    const ach = (cadrCfm * 60) / (sqFt * 8);
    assert.ok(Math.abs(ach - 5) < 1e-9, `${sqFt}제곱피트`);
  }
  // 그래서 이 표의 권장값도 다섯이다
  assert.equal(TARGET_ACH, 5);
});

test('ACH가 정의를 그대로 되짚는다', () => {
  for (const f of facts) {
    // ACH × 부피 = CADR × 60 이어야 한다
    const back = achOf(f.cadr, f.pyeong) * volumeOf(f.pyeong);
    assert.ok(Math.abs(back - f.cadr * 60) < 1e-9, f.slug);
    // 부피는 넓이 × 천장이다
    assert.ok(Math.abs(volumeOf(f.pyeong) - sqmOf(f.pyeong) * CEILING_M) < 1e-9, f.slug);
  }
  // 10평 방에 CADR 8이면 하루에 몇 번인지 손으로 짚어 본다
  const ten = purifierFacts(cellOf('10p-8')!);
  assert.equal(ten.sqm, 33.1);
  assert.equal(ten.volume, 79.3);
  assert.equal(ten.ach, 6.05);
});

test('먼지가 절반이 되는 시간에 ACH를 곱하면 늘 같다', () => {
  const constant = 60 * Math.log(2);
  for (const f of facts) {
    const exact = minutesToFall(achOf(f.cadr, f.pyeong), 0.5);
    assert.ok(Math.abs(exact * achOf(f.cadr, f.pyeong) - constant) < 1e-9, f.slug);
  }
  assert.ok(Math.abs(constant - 41.59) < 0.01);
  // 십분의 일까지는 절반까지의 log2(10)배, 곧 3.32배 걸린다
  for (const f of facts) {
    const ach = achOf(f.cadr, f.pyeong);
    const ratio = minutesToFall(ach, 0.1) / minutesToFall(ach, 0.5);
    assert.ok(Math.abs(ratio - Math.log(10) / Math.log(2)) < 1e-9, f.slug);
  }
  // 시간당 다섯 번이면 절반까지 8.3분, 십분의 일까지 27.6분이다
  assert.ok(Math.abs(minutesToFall(5, 0.5) - 8.32) < 0.01);
  assert.ok(Math.abs(minutesToFall(5, 0.1) - 27.63) < 0.01);
});

test('필요한 청정능력과 덮는 넓이가 서로 되돌아온다', () => {
  for (const area of AREAS) {
    const need = neededCadr(area);
    // 그만큼짜리를 두면 정확히 권장값이 나온다
    assert.ok(Math.abs(achOf(need, area) - TARGET_ACH) < 1e-9, `${area}평`);
    // 그 청정능력이 덮는 넓이는 다시 그 방이다
    assert.ok(Math.abs(coverablePyeong(need) - area) < 1e-9, `${area}평`);
  }
  // 10평이면 6.6㎥/분이 필요하다
  assert.equal(purifierFacts(cellOf('10p-8')!).needed, 6.6);
  assert.equal(purifierFacts(cellOf('10p-8')!).shortfall, 0);
  // 20평에 6짜리를 두면 한참 모자란다
  const big = purifierFacts(cellOf('20p-6')!);
  assert.ok(big.shortfall > 6);
  assert.equal(big.needed, round1(big.cadr + big.shortfall));
});

const round1 = (x: number) => Math.round(x * 10) / 10;

test('넓이가 늘면 ACH가 줄고 청정능력이 늘면 ACH가 는다', () => {
  for (const cadr of CADRS) {
    for (let i = 0; i + 1 < AREAS.length; i++) {
      assert.ok(achOf(cadr, AREAS[i]) > achOf(cadr, AREAS[i + 1]), `${cadr} · ${AREAS[i]}평`);
    }
  }
  for (const area of AREAS) {
    for (let i = 0; i + 1 < CADRS.length; i++) {
      assert.ok(achOf(CADRS[i], area) < achOf(CADRS[i + 1], area), `${area}평 · ${CADRS[i]}`);
    }
  }
});

test('등급이 ACH를 그대로 따라간다', () => {
  assert.equal(gradeOf(8), 'ample');
  assert.equal(gradeOf(7.5), 'ample');
  assert.equal(gradeOf(7.49), 'enough');
  assert.equal(gradeOf(5), 'enough');
  assert.equal(gradeOf(4.99), 'tight');
  assert.equal(gradeOf(2), 'tight');
  assert.equal(gradeOf(1.99), 'short');
  for (const f of facts) {
    const ach = achOf(f.cadr, f.pyeong);
    assert.equal(f.grade, gradeOf(ach), f.slug);
    assert.equal(f.grade === 'short', ach < 2, f.slug);
    // 권장값을 넘는 칸은 모자람이 0이어야 한다
    if (ach >= TARGET_ACH) assert.equal(f.shortfall, 0, f.slug);
    else assert.ok(f.shortfall > 0, f.slug);
  }
  // 네 등급이 모두 실제로 나와야 이 검사가 뜻이 있다
  assert.deepEqual(
    [...new Set(facts.map(f => f.grade))].sort(),
    ['ample', 'enough', 'short', 'tight'],
  );
});

test('추천 값이 목록에서 권장값을 채우는 가장 작은 것이다', () => {
  for (const f of facts) {
    if (f.pick === null) {
      // 목록의 가장 큰 것으로도 못 채우는 방이 있다
      assert.ok(achOf(CADRS[CADRS.length - 1], f.pyeong) < TARGET_ACH, f.slug);
      continue;
    }
    assert.ok(achOf(f.pick, f.pyeong) >= TARGET_ACH, f.slug);
    const below = CADRS.filter(x => x < f.pick!);
    for (const x of below) assert.ok(achOf(x, f.pyeong) < TARGET_ACH, `${f.slug} — ${x}로도 된다`);
  }
  assert.equal(purifierFacts(cellOf('3p-3')!).pick, 3);
  assert.equal(purifierFacts(cellOf('10p-3')!).pick, 7);
  // 40평은 목록의 24로도 권장값에 못 미친다
  assert.equal(purifierFacts(cellOf('40p-24')!).pick, null);
});

test('이웃 칸이 실제로 있는 슬러그다', () => {
  for (const f of facts) {
    for (const n of [f.weaker, f.stronger, f.smaller, f.larger]) {
      if (n === null) continue;
      assert.ok(cellOf(n), `${f.slug} 의 이웃이 없다: ${n}`);
    }
  }
  assert.equal(purifierFacts(cellOf(`${AREAS[0]}p-${CADRS[0]}`)!).weaker, null);
  assert.equal(purifierFacts(cellOf(`${AREAS[0]}p-${CADRS[0]}`)!).smaller, null);
});
