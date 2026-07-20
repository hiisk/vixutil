import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CYCLES, daysBetween, cycleValue, isCritical, phaseOf,
  getBiorhythm, getChartSeries, overallComment,
} from '../lib/biorhythm.ts';

test('출생일 당일은 세 리듬이 모두 0에서 출발한다', () => {
  const d = new Date(1990, 4, 15);
  const r = getBiorhythm(d, d);
  assert.equal(r.days, 0);
  for (const c of r.cycles) assert.equal(c.percent, 0);
});

test('경과일은 시각과 무관하게 날짜로만 센다', () => {
  // 아침에 태어난 사람과 밤에 태어난 사람의 오늘 리듬이 달라지면 안 된다.
  const morning = new Date(1990, 0, 1, 6, 0);
  const night = new Date(1990, 0, 1, 23, 30);
  const target = new Date(2026, 6, 20, 9, 0);
  assert.equal(daysBetween(morning, target), daysBetween(night, target));
});

test('서머타임 전환 구간에서도 하루가 어긋나지 않는다', () => {
  // 로컬 Date를 그대로 빼면 DST가 있는 시간대에서 23시간/25시간이 되어 밀린다.
  const from = new Date(2026, 2, 1);
  const to = new Date(2026, 3, 1);
  assert.equal(daysBetween(from, to), 31);
});

test('주기가 한 바퀴 돌면 같은 값으로 돌아온다', () => {
  for (const c of CYCLES) {
    const a = cycleValue(100, c.period);
    const b = cycleValue(100 + c.period, c.period);
    assert.ok(Math.abs(a - b) < 1e-9, `${c.label}: ${c.period}일 주기가 반복되지 않는다`);
  }
});

test('위험일은 주기마다 정확히 두 번 온다', () => {
  // 위험일을 "0에 가까운 날"로 정의하면 임계값에 따라 개수가 들쭉날쭉해진다.
  // 부호가 바뀌는 날로 정의했으므로 주기당 두 번이어야 한다.
  for (const c of CYCLES) {
    let count = 0;
    for (let d = 0; d < c.period; d++) if (isCritical(d, c.period)) count++;
    assert.equal(count, 2, `${c.label}: 한 주기에 위험일이 ${count}번`);
  }
});

test('위험일이 아닌 날은 고조기와 저조기로만 갈린다', () => {
  for (const c of CYCLES) {
    for (let d = 0; d < c.period * 3; d++) {
      const phase = phaseOf(d, c.period);
      if (phase === 'critical') continue;
      const v = cycleValue(d, c.period);
      assert.equal(phase, v > 0 ? 'high' : 'low', `${c.label} ${d}일차 위상 불일치`);
    }
  }
});

test('퍼센트는 항상 -100 이상 100 이하다', () => {
  const birth = new Date(1988, 10, 3);
  for (let i = 0; i < 400; i++) {
    const target = new Date(2026, 0, 1 + i);
    for (const c of getBiorhythm(birth, target).cycles) {
      assert.ok(c.percent >= -100 && c.percent <= 100, `${c.key}: ${c.percent}`);
    }
  }
});

test('다음 위험일까지 남은 일수를 항상 찾는다', () => {
  const birth = new Date(1995, 2, 20);
  for (let i = 0; i < 120; i++) {
    const target = new Date(2026, 0, 1 + i);
    for (const c of getBiorhythm(birth, target).cycles) {
      const period = CYCLES.find(x => x.key === c.key)!.period;
      assert.ok(c.daysToCritical >= 0, `${c.key}: 위험일을 못 찾음`);
      assert.ok(c.daysToCritical <= period, `${c.key}: ${c.daysToCritical}일 — 주기보다 멀다`);
    }
  }
});

test('오늘이 위험일이면 남은 일수가 0이다', () => {
  const birth = new Date(2000, 0, 1);
  // 신체 리듬(23일)의 위험일을 직접 찾아 그 날짜로 확인한다.
  let offset = 0;
  while (!isCritical(offset, 23) || offset === 0) offset++;
  const target = new Date(2000, 0, 1 + offset);
  const r = getBiorhythm(birth, target);
  assert.equal(r.cycles.find(c => c.key === 'physical')!.daysToCritical, 0);
});

test('미래 생일을 넣어도 음수 경과일이 나오지 않는다', () => {
  const birth = new Date(2030, 0, 1);
  const r = getBiorhythm(birth, new Date(2026, 0, 1));
  assert.equal(r.days, 0);
});

test('그래프 시계열은 오늘을 가운데 두고 좌우 대칭이다', () => {
  const pts = getChartSeries(new Date(1990, 0, 1), new Date(2026, 6, 20), 15);
  assert.equal(pts.length, 31);
  assert.equal(pts[0].offset, -15);
  assert.equal(pts[15].offset, 0);
  assert.equal(pts[30].offset, 15);
});

test('그래프 값은 -1~1 범위를 벗어나지 않는다', () => {
  for (const p of getChartSeries(new Date(1990, 0, 1), new Date(2026, 6, 20))) {
    for (const v of [p.physical, p.emotional, p.intellectual]) {
      assert.ok(v >= -1.0000001 && v <= 1.0000001, `범위 이탈: ${v}`);
    }
  }
});

test('총평은 어떤 상태에서도 빈 문자열이 아니다', () => {
  const birth = new Date(1993, 7, 12);
  for (let i = 0; i < 200; i++) {
    const c = overallComment(getBiorhythm(birth, new Date(2026, 0, 1 + i)));
    assert.ok(c.length > 10, `${i}일차 총평이 비었다`);
  }
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const birth = new Date(1990, 4, 15);
  const target = new Date(2026, 6, 20);
  assert.deepEqual(getBiorhythm(birth, target), getBiorhythm(birth, target));
});
