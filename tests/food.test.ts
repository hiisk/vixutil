import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CUP_ML, TBSP_ML, INGREDIENTS, findIngredient, volumeToGram, gramToVolume, toSpoons,
  cToF, fToC, gasMark, toAirFryer, DONENESS, searMinutes, roundArea, rectArea, panScale, STORAGE,
} from '../lib/food.ts';

/**
 * 계량은 값이 틀려도 화면에서는 그럴듯해 보인다 — 밀가루 1컵이 200g이라고 나와도
 * 아무도 눈치채지 못하고, 베이킹을 한 사람만 실패한다. 알려진 값으로 고정한다.
 */
test('한국 계량 기준', () => {
  assert.equal(CUP_ML, 200);
  assert.equal(TBSP_ML, 15);
});

test('재료마다 같은 부피의 무게가 다르다', () => {
  const flour = findIngredient('flour')!;
  const sugar = findIngredient('sugar')!;
  const honey = findIngredient('honey')!;

  assert.equal(volumeToGram(CUP_ML, flour.density), 120, '밀가루 1컵은 120g');
  assert.equal(volumeToGram(CUP_ML, sugar.density), 200, '설탕 1컵은 200g');
  assert.equal(volumeToGram(CUP_ML, honey.density), 284, '꿀 1컵은 284g');
});

test('무게에서 부피로 되돌린다', () => {
  const flour = findIngredient('flour')!;
  assert.equal(gramToVolume(120, flour.density), 200);
  // 왕복해도 같은 값이어야 한다
  assert.equal(volumeToGram(gramToVolume(150, flour.density), flour.density), 150);
});

test('ml을 계량도구 조합으로 쪼갠다', () => {
  assert.deepEqual(toSpoons(200), { cup: 1, tbsp: 0, tsp: 0 });
  assert.deepEqual(toSpoons(215), { cup: 1, tbsp: 1, tsp: 0 });
  assert.deepEqual(toSpoons(20), { cup: 0, tbsp: 1, tsp: 1 });
  assert.deepEqual(toSpoons(5), { cup: 0, tbsp: 0, tsp: 1 });
});

test('모든 재료에 이름과 밀도가 있다', () => {
  for (const i of INGREDIENTS) {
    assert.ok(i.name.trim(), `${i.id}: 이름 없음`);
    assert.ok(i.density > 0 && i.density < 2, `${i.id}: 밀도가 이상하다 (${i.density})`);
  }
  const ids = INGREDIENTS.map(i => i.id);
  assert.equal(new Set(ids).size, ids.length, '재료 id가 중복된다');
});

test('섭씨와 화씨 변환', () => {
  assert.equal(cToF(180), 356);
  assert.equal(cToF(0), 32);
  assert.equal(cToF(100), 212);
  assert.equal(fToC(350), 177, '350°F는 약 177도');
  assert.equal(fToC(32), 0);
});

test('가스마크', () => {
  assert.equal(gasMark(180), '4');
  assert.equal(gasMark(200), '6');
  assert.equal(gasMark(300), '9 이상');
});

test('에어프라이어는 온도를 낮추고 시간을 줄인다', () => {
  assert.deepEqual(toAirFryer(200, 30), { celsius: 180, minutes: 24 });
  assert.deepEqual(toAirFryer(180, 20), { celsius: 160, minutes: 16 });
});

test('굽기 단계는 꺼내는 온도가 최종보다 낮다', () => {
  for (const d of DONENESS) {
    assert.ok(d.pull < d.final, `${d.name}: 잔열을 감안하면 낮게 꺼내야 한다`);
    assert.ok(d.final - d.pull <= 5, `${d.name}: 잔열 상승이 과하다`);
  }
  // 단계가 올라갈수록 온도도 올라가야 한다
  for (let i = 1; i < DONENESS.length; i++) {
    assert.ok(DONENESS[i].final > DONENESS[i - 1].final, `${DONENESS[i].name}이 앞 단계보다 낮다`);
  }
});

test('두꺼울수록 오래 굽는다', () => {
  assert.ok(searMinutes(3, 'medium') > searMinutes(2, 'medium'));
  assert.ok(searMinutes(2.5, 'well') > searMinutes(2.5, 'rare'));
});

test('팬 넓이와 반죽 배율', () => {
  assert.equal(Math.round(roundArea(20)), 314);
  assert.equal(rectArea(20, 20), 400);
  // 지름이 1.2배면 넓이는 1.44배 — 지름 비율로 계산하면 반죽이 모자란다
  assert.equal(panScale(roundArea(15), roundArea(18)), 1.44);
  assert.equal(panScale(100, 100), 1);
});

test('보관 데이터가 비어 있지 않다', () => {
  assert.ok(STORAGE.length >= 10);
  for (const s of STORAGE) {
    assert.ok(s.name.trim() && s.category.trim(), '이름·분류 누락');
    assert.ok(s.fridge.trim() && s.freezer.trim(), `${s.name}: 보관 기간 누락`);
    assert.ok(s.tip.length >= 10, `${s.name}: 요령이 너무 짧다`);
  }
});
