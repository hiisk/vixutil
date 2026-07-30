import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  dailyReturns, weekdayStats, significantCount,
  WEEKDAY_SHORT, WEEKDAYS_TESTED, EXPECTED_BY_CHANCE, type DatedReturn,
} from '../lib/weekday.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

const DAY = 86_400_000;
/** 2024-01-07은 일요일 */
const SUNDAY = Date.UTC(2024, 0, 7);

test('요일 기준점 확인 — 2024-01-07은 일요일', () => {
  assert.equal(new Date(SUNDAY).getUTCDay(), 0);
  assert.equal(WEEKDAY_SHORT[0], 'Sun');
});

test('수익률은 전날 종가 대비이고 요일은 당일 것이다', () => {
  const closes = [
    { day: SUNDAY, close: 100 },
    { day: SUNDAY + DAY, close: 110 },   // 월요일 +10%
  ];
  const r = dailyReturns(closes);
  assert.equal(r.length, 1);
  near(r[0].pct, 10, 1e-9);
  assert.equal(new Date(r[0].day).getUTCDay(), 1, '월요일에 귀속된다');
});

test('망가진 가격은 건너뛴다', () => {
  const closes = [
    { day: SUNDAY, close: 100 },
    { day: SUNDAY + DAY, close: 0 },
    { day: SUNDAY + 2 * DAY, close: 100 },
  ];
  assert.equal(dailyReturns(closes).length, 0, '0을 끼면 양쪽 수익률 모두 무효');
});

test('요일별로 정확히 묶는다', () => {
  const rets: DatedReturn[] = [];
  // 3주간 월요일만 +2%, 나머지는 0%
  for (let w = 0; w < 3; w++) {
    for (let d = 0; d < 7; d++) {
      const day = SUNDAY + (w * 7 + d) * DAY;
      rets.push({ day, pct: new Date(day).getUTCDay() === 1 ? 2 : 0 });
    }
  }
  const stats = weekdayStats(rets);
  assert.equal(stats.length, 7);
  const mon = stats.find(s => s.weekday === 1)!;
  assert.equal(mon.n, 3);
  near(mon.meanPct, 2, 1e-9);
  near(mon.upRatePct, 100, 1e-9);
  const tue = stats.find(s => s.weekday === 2)!;
  near(tue.meanPct, 0, 1e-9);
  near(tue.upRatePct, 0, 1e-9, '0%는 상승이 아니다');
});

test('t통계량은 평균 / (표준편차/√n) 이다', () => {
  // 월요일에 [1, 2, 3] — 평균 2, 표본 sd 1, n 3 → t = 2/(1/√3) = 2√3
  const rets: DatedReturn[] = [1, 2, 3].map((pct, i) => ({ day: SUNDAY + DAY + i * 7 * DAY, pct }));
  const mon = weekdayStats(rets).find(s => s.weekday === 1)!;
  assert.equal(mon.n, 3);
  near(mon.meanPct, 2, 1e-12);
  near(mon.sdPct, 1, 1e-12);
  near(mon.tStat!, 2 * Math.sqrt(3), 1e-9);
});

test('표본이 많아도 신호가 작으면 t가 작다 — 이 페이지의 요점', () => {
  // 평균 0.05%, 표준편차 4% (암호화폐 수준), n=470
  const rets: DatedReturn[] = [];
  for (let i = 0; i < 470; i++) {
    // 평균 0.05를 유지하면서 ±4 로 흔든다
    rets.push({ day: SUNDAY + DAY + i * 7 * DAY, pct: 0.05 + (i % 2 === 0 ? 4 : -4) });
  }
  const mon = weekdayStats(rets).find(s => s.weekday === 1)!;
  assert.equal(mon.n, 470);
  near(mon.meanPct, 0.05, 1e-9);
  assert.ok(Math.abs(mon.tStat!) < 2,
    `관측 470개여도 t=${mon.tStat!.toFixed(2)}로 유의하지 않다`);
});

test('변동이 없으면 t를 낼 수 없다', () => {
  const rets: DatedReturn[] = [0.5, 0.5, 0.5].map((pct, i) => ({ day: SUNDAY + DAY + i * 7 * DAY, pct }));
  const mon = weekdayStats(rets).find(s => s.weekday === 1)!;
  assert.equal(mon.tStat, null, '표준편차 0');
});

test('관측이 1개면 표준편차와 t가 없다', () => {
  const mon = weekdayStats([{ day: SUNDAY + DAY, pct: 5 }]).find(s => s.weekday === 1)!;
  assert.equal(mon.n, 1);
  assert.equal(mon.tStat, null);
});

test('유의 개수 집계', () => {
  const rets: DatedReturn[] = [];
  // 월요일만 강한 신호, 나머지는 잡음
  for (let i = 0; i < 60; i++) {
    for (let d = 0; d < 7; d++) {
      const day = SUNDAY + (i * 7 + d) * DAY;
      const wd = new Date(day).getUTCDay();
      rets.push({ day, pct: wd === 1 ? 3 + (i % 2 ? 0.1 : -0.1) : (i % 2 ? 2 : -2) });
    }
  }
  const stats = weekdayStats(rets);
  assert.ok(significantCount(stats, 2) >= 1, '월요일은 유의해야 한다');
  const mon = stats.find(s => s.weekday === 1)!;
  assert.ok(Math.abs(mon.tStat!) > 2);
});

test('관측 없는 요일은 결과에서 빠진다', () => {
  // 월요일만 있는 데이터
  const rets: DatedReturn[] = [0, 1, 2].map((_, i) => ({ day: SUNDAY + DAY + i * 7 * DAY, pct: i }));
  const stats = weekdayStats(rets);
  assert.deepEqual(stats.map(s => s.weekday), [1]);
});

test('다중비교 기준선', () => {
  assert.equal(WEEKDAYS_TESTED, 7);
  near(EXPECTED_BY_CHANCE, 0.35, 1e-12, '7 × 0.05');
});

test('요일 이름 배열', () => {
  assert.equal(WEEKDAY_SHORT.length, 7);
  assert.equal(WEEKDAY_SHORT[1], 'Mon');
  assert.equal(WEEKDAY_SHORT[6], 'Sat');
});
