import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawdownEpisodes, drawdownSummary, MIN_EPISODE_DEPTH_PCT } from '../lib/drawdown.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('단순한 한 구간을 정확히 잡는다', () => {
  // 100 → 50 → 100 : 50% 낙폭, 하락 1일, 회복 1일
  const e = drawdownEpisodes([100, 50, 100]);
  assert.equal(e.length, 1);
  near(e[0].depthPct, 50, 1e-9);
  assert.equal(e[0].peakIndex, 0);
  assert.equal(e[0].troughIndex, 1);
  assert.equal(e[0].recoveryIndex, 2);
  assert.equal(e[0].declineDays, 1);
  assert.equal(e[0].recoveryDays, 1);
  assert.equal(e[0].totalDays, 2);
  assert.equal(e[0].ongoing, false);
});

test('회복하지 못한 구간은 ongoing이다', () => {
  const e = drawdownEpisodes([100, 80, 70, 75]);
  assert.equal(e.length, 1);
  near(e[0].depthPct, 30, 1e-9);
  assert.equal(e[0].recoveryIndex, null);
  assert.equal(e[0].recoveryDays, null);
  assert.equal(e[0].ongoing, true);
  assert.equal(e[0].totalDays, 3, '고점부터 현재까지');
});

test('얕은 구간은 잡음으로 제외한다', () => {
  // 5% 낙폭은 기본 임계(10%) 미달
  assert.equal(drawdownEpisodes([100, 95, 100]).length, 0);
  assert.equal(drawdownEpisodes([100, 95, 100], 1).length, 1, '임계를 낮추면 잡힌다');
});

test('여러 구간을 각각 분리한다', () => {
  //          0    1   2    3   4   5    6
  const e = drawdownEpisodes([100, 70, 100, 120, 60, 120, 130]);
  assert.equal(e.length, 2);
  near(e[0].depthPct, 30, 1e-9, '첫 구간 100→70');
  near(e[1].depthPct, 50, 1e-9, '두 번째 120→60');
  assert.equal(e[1].peakIndex, 3, '고점이 갱신된 뒤 시작한다');
});

test('신고가가 갱신되면 고점이 따라간다', () => {
  const e = drawdownEpisodes([100, 110, 120, 60, 120]);
  assert.equal(e.length, 1);
  assert.equal(e[0].peakIndex, 2, '120이 고점');
  near(e[0].depthPct, 50, 1e-9);
});

test('계속 오르면 구간이 없다', () => {
  assert.equal(drawdownEpisodes([100, 110, 120, 130]).length, 0);
});

test('요약 — 최대낙폭은 회복 후에도 남는다', () => {
  const s = drawdownSummary([100, 40, 100, 120])!;
  near(s.maxDrawdownPct, 60, 1e-9);
  near(s.currentDrawdownPct, 0, 1e-9, '지금은 신고가');
});

test('수중 기간 비율 — 이 페이지의 요점', () => {
  // 5일 중 신고가는 1·3·5일(인덱스 0,2,4), 아래는 2일
  const s = drawdownSummary([100, 90, 110, 100, 120])!;
  assert.equal(s.totalDays, 5);
  assert.equal(s.newHighDays, 3);
  near(s.underwaterPct, 40, 1e-9, '5일 중 2일');
});

test('상승 자산도 대부분의 날을 전고점 아래에서 보낸다', () => {
  // 톱니 상승 — 신고가는 드물다
  const closes: number[] = [100];
  for (let i = 1; i < 300; i++) closes.push(closes[i - 1] * (i % 4 === 0 ? 1.05 : 0.99));
  const s = drawdownSummary(closes)!;
  assert.ok(s.underwaterPct > 50, `수중 비율 ${s.underwaterPct.toFixed(1)}%가 절반을 넘는다`);
  assert.ok(closes[closes.length - 1] > closes[0], '그래도 전체적으로 올랐다');
});

test('가장 깊은 구간과 가장 오래 걸린 구간이 다를 수 있다', () => {
  // 깊지만 빨리 회복한 구간, 얕지만 오래 걸린 구간
  const closes = [100, 40, 100, ...new Array(200).fill(85), 100];
  const s = drawdownSummary(closes)!;
  near(s.worst!.depthPct, 60, 1e-9, '가장 깊은 것은 60%');
  assert.ok(s.longest!.totalDays > s.worst!.totalDays,
    `가장 오래 걸린 구간(${s.longest!.totalDays}일)이 가장 깊은 구간(${s.worst!.totalDays}일)보다 길다`);
});

test('현재 낙폭은 역대 고점 대비다', () => {
  const s = drawdownSummary([100, 200, 150])!;
  near(s.currentDrawdownPct, 25, 1e-9, '200 → 150');
});

test('구간은 깊이 내림차순으로 정렬된다', () => {
  const s = drawdownSummary([100, 70, 100, 120, 50, 120, 130])!;
  for (let i = 1; i < s.episodes.length; i++) {
    assert.ok(s.episodes[i - 1].depthPct >= s.episodes[i].depthPct);
  }
});

test('데이터가 모자라거나 망가지면 null', () => {
  assert.equal(drawdownSummary([100, 90]), null);
  assert.equal(drawdownSummary([]), null);
  assert.equal(drawdownSummary([0, -1, NaN]), null);
});

test('임계 상수', () => {
  assert.equal(MIN_EPISODE_DEPTH_PCT, 10);
});
