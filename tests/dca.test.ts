import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runDca, lumpRoi, dcaDistribution, percentileOf, FREQ_DAYS, MIN_INDEPENDENT_WINDOWS } from '../lib/dca.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

/** 가격이 변하지 않는 계열 */
const flat = (n: number, p = 100) => Array.from({ length: n }, () => p);

test('가격이 그대로면 수익률은 0이고 평균단가는 그 가격이다', () => {
  const r = runDca(flat(100), 0, 100, 10, 'daily')!;
  near(r.roiPct, 0);
  near(r.avgCost, 100);
  near(r.invested, 1000, 1e-9, '10원씩 100번');
  assert.equal(r.buys, 100);
});

test('매수 횟수는 기간을 주기로 나눈 만큼이다', () => {
  const closes = flat(365);
  assert.equal(runDca(closes, 0, 365, 1, 'daily')!.buys, 365);
  assert.equal(runDca(closes, 0, 365, 1, 'weekly')!.buys, Math.ceil(365 / 7));
  assert.equal(runDca(closes, 0, 365, 1, 'monthly')!.buys, Math.ceil(365 / 30));
});

test('DCA 평균단가는 매수 시점 가격들의 조화평균이다', () => {
  // 100과 300에 같은 금액씩 넣으면 평균단가는 산술평균 200이 아니라 조화평균 150이다.
  // 이 성질이 DCA의 핵심이므로 정확히 확인한다.
  const closes = [100, 300];
  const r = runDca(closes, 0, 2, 300, 'daily')!;
  near(r.units, 300 / 100 + 300 / 300, 1e-12);
  near(r.avgCost, 600 / 4, 1e-12, '600원으로 4개 → 150');
  assert.ok(r.avgCost < 200, '조화평균은 산술평균보다 작다');
});

test('단조 상승장에서는 일시불이 DCA를 이긴다', () => {
  // 계속 오르면 나중 매수일수록 비싸게 사므로 처음에 다 넣는 쪽이 유리하다.
  const closes = Array.from({ length: 200 }, (_, i) => 100 + i);
  const dca = runDca(closes, 0, 200, 10, 'daily')!;
  const lump = lumpRoi(closes, 0, 200)!;
  assert.ok(lump > dca.roiPct, `일시불 ${lump.toFixed(1)}% > DCA ${dca.roiPct.toFixed(1)}%`);
});

test('V자 회복 구간에서는 DCA가 일시불을 이긴다', () => {
  // 떨어졌다가 제자리로 돌아오면 일시불은 0%지만 DCA는 싸게 산 몫이 남는다.
  const down = Array.from({ length: 100 }, (_, i) => 100 - i * 0.5);
  const up = Array.from({ length: 100 }, (_, i) => 50.5 + i * 0.5);
  const closes = [...down, ...up];
  const dca = runDca(closes, 0, closes.length, 10, 'daily')!;
  const lump = lumpRoi(closes, 0, closes.length)!;
  assert.ok(Math.abs(lump) < 1, `일시불은 제자리여야 한다 (${lump.toFixed(2)}%)`);
  assert.ok(dca.roiPct > 10, `DCA는 이익이어야 한다 (${dca.roiPct.toFixed(1)}%)`);
});

test('평가액 = 수량 × 마지막 종가', () => {
  const closes = [10, 20, 40, 80];
  const r = runDca(closes, 0, 4, 100, 'daily')!;
  near(r.finalValue, r.units * 80, 1e-9);
  near(r.roiPct, (r.finalValue / 400 - 1) * 100, 1e-9);
  near(r.finalPrice, 80);
  near(r.startPrice, 10);
});

test('구간이 모자라거나 입력이 잘못되면 null', () => {
  const closes = flat(50);
  assert.equal(runDca(closes, 0, 51, 10, 'daily'), null, '기간이 데이터보다 길다');
  assert.equal(runDca(closes, 45, 10, 10, 'daily'), null, '시작점이 끝에 너무 가깝다');
  assert.equal(runDca(closes, -1, 10, 10, 'daily'), null);
  assert.equal(runDca(closes, 0, 10, 0, 'daily'), null, '금액 0');
  assert.equal(runDca(closes, 0, 0, 10, 'daily'), null, '기간 0');
});

test('lumpRoi는 시작·종료 종가만으로 결정된다', () => {
  near(lumpRoi([100, 999, 999, 150], 0, 4)!, 50, 1e-12, '중간 경로는 무관하다');
  assert.equal(lumpRoi([100, 150], 0, 5), null);
});

test('분포는 가능한 모든 시작일을 훑고 사분위가 정렬돼 있다', () => {
  // 진폭이 큰 톱니 — 시작일에 따라 결과가 갈리도록
  const closes = Array.from({ length: 800 }, (_, i) => 100 + 40 * Math.sin(i / 25));
  const d = dcaDistribution(closes, 180, 10, 'weekly')!;
  assert.ok(d.windows > 100, `창이 충분해야 한다 (${d.windows})`);
  assert.ok(d.worst <= d.p25 && d.p25 <= d.medianRoi && d.medianRoi <= d.p75 && d.p75 <= d.best,
    `사분위 정렬: ${d.worst} ≤ ${d.p25} ≤ ${d.medianRoi} ≤ ${d.p75} ≤ ${d.best}`);
  assert.ok(d.pProfit >= 0 && d.pProfit <= 100);
  assert.ok(d.lumpWinPct >= 0 && d.lumpWinPct <= 100);
});

test('독립 창 수는 겹치는 창 수보다 훨씬 적다', () => {
  // 겹치는 창으로 표본 수를 부풀리지 않는지 — 이 페이지의 핵심 정직성 장치다
  const closes = flat(1095); // 3년
  const d = dcaDistribution(closes, 365, 10, 'monthly')!;
  assert.equal(d.independent, 3, '3년치에서 1년 창은 독립 3개뿐');
  assert.ok(d.windows > 100, '겹치는 창은 수백 개로 보인다');
  assert.equal(d.reliable, false, `독립 3개는 ${MIN_INDEPENDENT_WINDOWS}개 미만이라 신뢰 불가`);
});

test('독립 창이 충분하면 reliable=true', () => {
  const closes = flat(365 * 8);
  const d = dcaDistribution(closes, 365, 10, 'monthly')!;
  assert.equal(d.independent, 8);
  assert.equal(d.reliable, true);
});

test('창이 많아도 maxWindows 이하로 솎아낸다', () => {
  const closes = flat(5000);
  const d = dcaDistribution(closes, 100, 10, 'daily', 50)!;
  assert.ok(d.windows <= 50, `솎아내기 후 ${d.windows}개`);
  assert.ok(d.windows > 0);
});

test('데이터가 기간보다 짧으면 분포는 null', () => {
  assert.equal(dcaDistribution(flat(100), 365, 10, 'monthly'), null);
  assert.equal(dcaDistribution(flat(365), 365, 10, 'monthly'), null, '창이 하나도 안 나온다');
});

test('percentileOf는 사분위 지점에서 정확하고 단조다', () => {
  const closes = Array.from({ length: 900 }, (_, i) => 100 + 30 * Math.sin(i / 30));
  const d = dcaDistribution(closes, 200, 10, 'weekly')!;
  near(percentileOf(d, d.worst), 0, 1e-9);
  near(percentileOf(d, d.medianRoi), 50, 1e-9);
  near(percentileOf(d, d.best), 100, 1e-9);
  assert.equal(percentileOf(d, d.worst - 999), 0, '분포 아래로 벗어나면 0');
  assert.equal(percentileOf(d, d.best + 999), 100, '분포 위로 벗어나면 100');
  assert.ok(percentileOf(d, d.p25) <= percentileOf(d, d.p75), '단조 증가');
});

test('FREQ_DAYS는 주기와 일치한다', () => {
  assert.equal(FREQ_DAYS.daily, 1);
  assert.equal(FREQ_DAYS.weekly, 7);
  assert.equal(FREQ_DAYS.monthly, 30);
});
