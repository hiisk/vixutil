/**
 * 술 — 부피 정의에서 나온 값이 널리 인용되는 무게와 맞는지 본다.
 *
 * lib/drink 은 8g·14g을 적어 두지 않는다. 영국의 10ml와 미국의 0.6 fl oz라는
 * 부피 정의에 밀도를 곱해 얻는다. 여기서는 널리 인용되는 무게 쪽을 자료로
 * 적어 두고, 계산이 그 값으로 떨어지는지 대조한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ABVS, CELLS, DRINK_SLUGS, ETHANOL_G_PER_ML, KCAL_PER_G, ML_PER_FL_OZ, UK_UNIT_ML,
  US_FL_OZ, VOLUMES, VOLUME_LANDMARK, WHO_STANDARD_G, cellOf, slugOf,
} from '../lib/drink/list.ts';
import { UK_UNIT_G, US_STANDARD_G, alcoholGrams, alcoholMl, drinkFacts } from '../lib/drink/facts.ts';

/** 널리 인용되는 한 잔의 무게(g) — 옮겨 적은 자료다 */
const QUOTED_G = { uk: 8, who: 10, us: 14 };

const facts = DRINK_SLUGS.map(s => drinkFacts(cellOf(s)!));

test('칸이 224개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(ABVS.length, 16);
  assert.equal(VOLUMES.length, 14);
  assert.equal(CELLS.length, 16 * 14);
  assert.equal(new Set(DRINK_SLUGS).size, CELLS.length);
  for (const slug of DRINK_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
  }
  // 이름이 붙은 용량은 모두 눈금 위에 있어야 한다
  for (const ml of Object.keys(VOLUME_LANDMARK).map(Number)) {
    assert.ok(VOLUMES.includes(ml), `눈금에 없는 용량에 이름을 붙였다: ${ml}`);
  }
});

test('부피로 정의된 한 잔이 널리 인용되는 무게로 떨어진다', () => {
  // 영국 1유닛 = 순수 알코올 10ml → 7.89g, 흔히 8g으로 적는다
  assert.ok(Math.abs(UK_UNIT_G - QUOTED_G.uk) < 0.15, `${UK_UNIT_G}`);
  assert.ok(Math.abs(UK_UNIT_G - 7.89) < 0.005);
  // 미국 한 잔 = 순수 알코올 0.6 fl oz → 14.0g
  assert.ok(Math.abs(US_STANDARD_G - QUOTED_G.us) < 0.1, `${US_STANDARD_G}`);
  // WHO만 처음부터 무게로 정의한다
  assert.equal(WHO_STANDARD_G, QUOTED_G.who);
  // 상수를 손으로 짚어 둔다
  assert.equal(ETHANOL_G_PER_ML, 0.789);
  assert.equal(US_FL_OZ, 0.6);
  assert.equal(UK_UNIT_ML, 10);
  assert.ok(Math.abs(ML_PER_FL_OZ - 29.5735) < 0.001);
});

test('한 잔의 크기가 세 나라에서 다르다', () => {
  // 미국 한 잔은 영국 1유닛의 1.77배, WHO 한 잔의 1.4배다
  assert.ok(Math.abs(US_STANDARD_G / UK_UNIT_G - 1.775) < 0.005);
  assert.ok(Math.abs(US_STANDARD_G / WHO_STANDARD_G - 1.4) < 0.005);
  // 그래서 같은 술도 나라마다 잔 수가 다르게 세어진다 — 순서는 늘 같다
  for (const f of facts) {
    assert.ok(f.ukUnits >= f.whoDrinks, f.slug);
    assert.ok(f.whoDrinks >= f.usDrinks, f.slug);
  }
  // 5% 맥주 500ml는 영국 2.5유닛, WHO 2.0잔, 미국 1.4잔이다
  const beer = drinkFacts(cellOf('5-500ml')!);
  assert.equal(beer.ukUnits, 2.5);
  assert.equal(beer.whoDrinks, 1.97);
  assert.equal(beer.usDrinks, 1.41);
});

test('영국 유닛은 리터 곱하기 도수와 정확히 같다', () => {
  // 1유닛이 순수 알코올 10ml라는 정의에서 units = L × ABV 가 그대로 나온다
  for (const f of facts) {
    const byLitre = (f.ml / 1000) * f.abv;
    assert.ok(Math.abs(byLitre - alcoholMl(f.ml, f.abv) / UK_UNIT_ML) < 1e-9, f.slug);
  }
  // 750ml 12% 와인은 정확히 9유닛이다
  assert.equal(drinkFacts(cellOf('12-750ml')!).ukUnits, 9);
});

test('순수 알코올이 정의를 그대로 되짚는다', () => {
  for (const f of facts) {
    // 무게 = 부피 × 밀도
    assert.ok(Math.abs(alcoholGrams(f.ml, f.abv) - alcoholMl(f.ml, f.abv) * ETHANOL_G_PER_ML) < 1e-9, f.slug);
    // 도수는 부피 비율이다 — 알코올 부피를 용량으로 나누면 도수가 돌아온다
    assert.ok(Math.abs((alcoholMl(f.ml, f.abv) / f.ml) * 100 - f.abv) < 1e-9, f.slug);
    // 열량은 무게에 비례한다
    assert.equal(f.kcal, Math.round(alcoholGrams(f.ml, f.abv) * KCAL_PER_G), f.slug);
  }
  assert.equal(KCAL_PER_G, 7);
  // 소주 한 잔(50ml·17%)은 순수 알코올 6.7g이다
  const shot = drinkFacts(cellOf('17-50ml')!);
  assert.equal(shot.pureMl, 8.5);
  assert.equal(shot.grams, 6.7);
  assert.equal(shot.kcal, 47);
});

test('도수와 용량이 서로를 되받는다', () => {
  // 도수를 절반으로 하고 용량을 두 배로 하면 알코올 양이 같다
  for (const abv of ABVS) {
    for (const ml of VOLUMES) {
      const half = ABVS.find(x => Math.abs(x - abv / 2) < 1e-9);
      const twice = VOLUMES.find(x => x === ml * 2);
      if (half === undefined || twice === undefined) continue;
      assert.ok(Math.abs(alcoholGrams(ml, abv) - alcoholGrams(twice, half)) < 1e-9, `${abv}% ${ml}ml`);
    }
  }
  // 목록 안에서 같은 양이 되는 짝이 실제로 있다
  const paired = facts.filter(f => f.twin !== null);
  assert.ok(paired.length > 40, `짝이 ${paired.length}개뿐이다`);
  for (const f of paired) {
    const t = drinkFacts(cellOf(f.twin!)!);
    assert.ok(Math.abs(alcoholGrams(t.ml, t.abv) - alcoholGrams(f.ml, f.abv)) < 1e-4, `${f.slug} ↔ ${f.twin}`);
    assert.notEqual(t.slug, f.slug);
  }
  // 8% 250ml와 4% 500ml는 같은 양이다 — 눈금에 8이 없으므로 4와 5로 확인한다
  assert.ok(Math.abs(alcoholGrams(500, 4) - alcoholGrams(250, 8)) < 1e-9);
  // 반올림한 grams끼리 나누면 안 된다 — 원래 값으로 견준다
  assert.ok(Math.abs(alcoholGrams(500, 12) / alcoholGrams(500, 5) - 2.4) < 1e-9);
});

test('도수가 오르거나 잔이 커지면 알코올도 는다', () => {
  for (const ml of VOLUMES) {
    for (let i = 0; i + 1 < ABVS.length; i++) {
      assert.ok(alcoholGrams(ml, ABVS[i]) < alcoholGrams(ml, ABVS[i + 1]), `${ml}ml`);
    }
  }
  for (const abv of ABVS) {
    for (let i = 0; i + 1 < VOLUMES.length; i++) {
      assert.ok(alcoholGrams(VOLUMES[i], abv) < alcoholGrams(VOLUMES[i + 1], abv), `${abv}%`);
    }
  }
});

test('이웃 칸이 실제로 있는 슬러그다', () => {
  for (const f of facts) {
    for (const n of [f.weaker, f.stronger, f.smaller, f.larger, f.twin]) {
      if (n === null) continue;
      assert.ok(cellOf(n), `${f.slug} 의 이웃이 없다: ${n}`);
    }
  }
  const first = drinkFacts(cellOf(`${String(ABVS[0])}-${VOLUMES[0]}ml`)!);
  assert.equal(first.weaker, null);
  assert.equal(first.smaller, null);
});

test('소수점 도수가 주소에서 되돌아온다', () => {
  // 4.5%는 '4-5'로 적는다 — 45%와 헷갈리면 안 된다
  const four5 = cellOf('4-5-500ml');
  assert.ok(four5, '4.5% 칸이 없다');
  assert.equal(four5.abv, 4.5);
  const forty5 = cellOf('45-500ml');
  assert.ok(forty5, '45% 칸이 없다');
  assert.equal(forty5.abv, 45);
  assert.notEqual(slugOf(four5), slugOf(forty5));
  // 소수점이 든 도수가 실제로 목록에 있어야 이 검사가 뜻이 있다
  assert.ok(ABVS.some(a => !Number.isInteger(a)));
});
