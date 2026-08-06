/**
 * 보조배터리 와트시 — 곱셈을 규정 쪽에서 되짚는다.
 *
 * 계산은 mAh에 전압을 곱하는 것뿐이지만, 이 표가 답하려는 것은 "들고 탈 수
 * 있는가"다. 그래서 검사는 값보다 경계에 선다 — 100Wh와 160Wh에서 판정이
 * 실제로 바뀌는지, 그 전압에서 100Wh를 넘지 않는 가장 큰 용량이 정말 경계에
 * 앉는지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  APPROVAL_WH, CAPACITIES, CELLS, FREE_WH, USB_VOLTS, VOLTAGES,
  cellOf, slugOf, voltageOf,
} from '../lib/powerbank/list.ts';
import { mahOf, powerFacts, verdictOf, whOf } from '../lib/powerbank/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return powerFacts(c);
};

test('칸은 용량 20가지 × 전압 5가지', () => {
  assert.equal(CAPACITIES.length, 20);
  assert.equal(VOLTAGES.length, 5);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < CAPACITIES.length; i++) assert.ok(CAPACITIES[i] > CAPACITIES[i - 1]);
  for (let i = 1; i < VOLTAGES.length; i++) assert.ok(VOLTAGES[i].volts > VOLTAGES[i - 1].volts, VOLTAGES[i].key);
  assert.equal(cellOf('20000-4v'), undefined);
  assert.equal(cellOf('21000-3v7'), undefined);
});

test('와트시는 mAh에 전압을 곱한 값', () => {
  assert.equal(whOf(20000, 3.7), 74);
  assert.equal(whOf(10000, 3.7), 37);
  for (const c of CELLS) {
    const v = voltageOf(c.volt)!;
    // 되돌리면 용량이 나온다
    assert.ok(Math.abs(mahOf(whOf(c.mah, v.volts), v.volts) - c.mah) < 1e-6, slugOf(c));
    const f = powerFacts(c);
    assert.ok(Math.abs(f.wh - whOf(c.mah, v.volts)) <= 0.05 + 1e-9, f.slug);
  }
  // 널리 인용되는 자리 — 20,000mAh는 3.7V에서 74Wh다
  assert.equal(facts('20000-3v7').wh, 74);
  // 전압이 세 배면 와트시도 세 배다
  assert.ok(Math.abs(whOf(20000, 11.1) / whOf(20000, 3.7) - 3) < 1e-9);
});

test('규정은 100Wh와 160Wh에서 갈린다', () => {
  assert.equal(FREE_WH, 100);
  assert.equal(APPROVAL_WH, 160);
  assert.equal(verdictOf(100), 'free');
  assert.equal(verdictOf(100.1), 'approval');
  assert.equal(verdictOf(160), 'approval');
  assert.equal(verdictOf(160.1), 'banned');
  // 경계에서만 갈래가 바뀐다
  assert.notEqual(verdictOf(FREE_WH), verdictOf(FREE_WH + 0.1));
  assert.notEqual(verdictOf(APPROVAL_WH), verdictOf(APPROVAL_WH + 0.1));
  for (const c of CELLS) {
    const f = powerFacts(c);
    const raw = whOf(c.mah, f.volts);
    assert.equal(f.verdict, verdictOf(raw), f.slug);
    assert.equal(f.verdict === 'free', raw <= FREE_WH, f.slug);
  }
  // 20,000mAh는 3.7V면 자유롭고 11.1V면 아예 못 탄다
  assert.equal(facts('20000-3v7').verdict, 'free');
  assert.equal(facts('20000-11v1').verdict, 'banned');
});

test('전압마다 자유롭게 탈 수 있는 위끝이 다르다', () => {
  for (const v of VOLTAGES) {
    const f = powerFacts({ mah: 20000, volt: v.key });
    // 그 용량이면 정확히 100Wh다
    assert.ok(Math.abs(whOf(f.maxFree, v.volts) - FREE_WH) <= 0.01, v.key);
    // 한 칸이라도 더 크면 넘어선다
    assert.equal(verdictOf(whOf(f.maxFree + 100, v.volts)), 'approval', v.key);
  }
  // 전압이 높을수록 실을 수 있는 mAh가 적다
  const limits = VOLTAGES.map(v => powerFacts({ mah: 10000, volt: v.key }).maxFree);
  for (let i = 1; i < limits.length; i++) assert.ok(limits[i] < limits[i - 1], `${i}`);
  // 3.7V라면 27,000mAh까지가 자유다
  assert.equal(facts('10000-3v7').maxFree, 27027);
  assert.equal(facts('27000-3v7').verdict, 'free');
  assert.equal(facts('30000-3v7').verdict, 'approval');
});

test('5V로 다시 세면 표기보다 작아진다', () => {
  assert.equal(USB_VOLTS, 5);
  for (const c of CELLS) {
    const f = powerFacts(c);
    // 와트시가 같아야 한다 — 기준 전압만 바꾼 것이다
    assert.ok(Math.abs(whOf(f.usbMah, USB_VOLTS) - f.wh) <= 0.5, f.slug);
    // 셀 전압이 5V보다 낮으면 5V 기준 용량이 더 작다
    if (f.volts < USB_VOLTS) assert.ok(f.usbMah < c.mah, f.slug);
    if (f.volts > USB_VOLTS) assert.ok(f.usbMah > c.mah, f.slug);
    if (f.volts === USB_VOLTS) assert.equal(f.usbMah, c.mah, f.slug);
  }
  // 20,000mAh(3.7V)는 5V 기준으로 14,800mAh다
  assert.equal(facts('20000-3v7').usbMah, 14800);
});

test('남은 여유는 100Wh까지의 거리', () => {
  for (const c of CELLS) {
    const f = powerFacts(c);
    assert.ok(Math.abs(f.headroom - (FREE_WH - whOf(c.mah, f.volts))) <= 0.05 + 1e-9, f.slug);
    assert.equal(f.headroom >= 0, f.verdict === 'free', f.slug);
  }
  assert.equal(facts('20000-3v7').headroom, 26);
});

test('앞뒤 칸은 용량 한 단계씩만 움직인다', () => {
  const f = facts('20000-3v7');
  assert.equal(f.smaller?.mah, 15000);
  assert.equal(f.larger?.mah, 25000);
  assert.equal(facts('3000-3v7').smaller, null);
  assert.equal(facts('100000-3v7').larger, null);
  for (const c of CELLS) {
    const g = powerFacts(c);
    if (g.larger) {
      assert.equal(g.larger.volt, c.volt, g.slug);
      assert.ok(facts(g.larger.slug).wh > g.wh, g.slug);
    }
  }
});
