import { test } from 'node:test';
import assert from 'node:assert/strict';
import { monthlyReturns, seasonality, maxDrawdownPct, binomialTwoSidedP, MONTH_SHORT, type DatedClose } from '../lib/seasonality.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

/** year년 month월 day일의 UTC 자정 */
const utc = (y: number, m: number, d: number) => Date.UTC(y, m, d);

/** 지정한 (연,월,일 → 종가) 목록을 DatedClose로 */
const mk = (rows: [number, number, number, number][]): DatedClose[] =>
  rows.map(([y, m, d, c]) => ({ day: utc(y, m, d), close: c }));

test('월 수익률은 그 달 첫 종가에서 마지막 종가까지다', () => {
  // 1·2·3월 세 달 → 양 끝을 빼면 2월만 남는다
  const closes = mk([
    [2020, 0, 1, 100], [2020, 0, 31, 110],
    [2020, 1, 1, 200], [2020, 1, 29, 300],
    [2020, 2, 1, 400], [2020, 2, 31, 500],
  ]);
  const r = monthlyReturns(closes);
  assert.equal(r.length, 1, '양 끝 달은 잘려 있을 수 있어 제외한다');
  assert.equal(r[0].month, 1);
  near(r[0].pct, 50, 1e-9, '200 → 300');
});

test('양 끝 달을 빼는 이유 — 첫 달과 마지막 달은 온전하지 않다', () => {
  const closes = mk([
    [2020, 0, 20, 100], [2020, 0, 31, 100],   // 1월 중간부터 시작
    [2020, 1, 1, 100], [2020, 1, 29, 120],
    [2020, 2, 1, 120], [2020, 2, 10, 999],    // 3월 아직 안 끝남
  ]);
  const r = monthlyReturns(closes);
  assert.deepEqual(r.map(x => x.month), [1]);
});

test('달이 3개 미만이면 온전한 달이 없다', () => {
  assert.deepEqual(monthlyReturns(mk([[2020, 0, 1, 100], [2020, 0, 2, 110]])), []);
  assert.deepEqual(monthlyReturns(mk([[2020, 0, 1, 100], [2020, 1, 1, 110]])), []);
  assert.deepEqual(monthlyReturns([]), []);
});

test('여러 해의 같은 달이 모인다 — years가 실제 표본 크기다', () => {
  const rows: [number, number, number, number][] = [];
  // 2018~2022년 1~3월, 2월만 해마다 다르게
  const febPct = [10, -20, 30, -40, 50];
  for (let i = 0; i < 5; i++) {
    const y = 2018 + i;
    rows.push([y, 0, 1, 100], [y, 0, 28, 100]);
    rows.push([y, 1, 1, 100], [y, 1, 28, 100 * (1 + febPct[i] / 100)]);
    rows.push([y, 2, 1, 100], [y, 2, 28, 100]);
  }
  const s = seasonality(mk(rows));
  const feb = s.find(x => x.month === 1)!;
  assert.equal(feb.years, 5, '5개 해 = 표본 5개');
  near(feb.medianPct, 10, 1e-9, '중앙값');
  near(feb.winRatePct, 60, 1e-9, '5개 중 3개 상승');
  near(feb.worstPct, -40, 1e-9);
  near(feb.bestPct, 50, 1e-9);
});

test('중앙값과 평균이 갈리는 경우를 구분한다', () => {
  const rows: [number, number, number, number][] = [];
  // 4년 중 3년은 소폭 하락, 1년만 폭등 → 평균은 양수, 중앙값은 음수
  const pcts = [-5, -5, -5, 400];
  for (let i = 0; i < 4; i++) {
    const y = 2018 + i;
    rows.push([y, 0, 1, 100], [y, 0, 28, 100]);
    rows.push([y, 1, 1, 100], [y, 1, 28, 100 * (1 + pcts[i] / 100)]);
    rows.push([y, 2, 1, 100], [y, 2, 28, 100]);
  }
  const feb = seasonality(mk(rows)).find(x => x.month === 1)!;
  assert.ok(feb.medianPct < 0, `중앙값 ${feb.medianPct}는 음수`);
  assert.ok(feb.meanPct > 0, `평균 ${feb.meanPct}는 양수 — 한 해가 끌어올렸다`);
});

test('관측 없는 월은 결과에 없다', () => {
  const closes = mk([
    [2020, 0, 1, 100], [2020, 0, 28, 100],
    [2020, 1, 1, 100], [2020, 1, 28, 110],
    [2020, 2, 1, 110], [2020, 2, 28, 110],
  ]);
  const s = seasonality(closes);
  assert.deepEqual(s.map(x => x.month), [1], '2월만 온전하다');
});

test('최대 낙폭은 고점에서 저점까지 가장 큰 하락이다', () => {
  near(maxDrawdownPct([100, 50])!, 50, 1e-9);
  near(maxDrawdownPct([100, 200, 100])!, 50, 1e-9, '200에서 100');
  near(maxDrawdownPct([100, 200, 50, 300])!, 75, 1e-9, '200에서 50');
  near(maxDrawdownPct([100, 110, 120])!, 0, 1e-9, '계속 오르면 낙폭 없음');
});

test('최대 낙폭은 나중 회복에 지워지지 않는다', () => {
  // 90% 빠졌다가 신고가를 만들어도 겪은 낙폭은 남는다
  near(maxDrawdownPct([100, 10, 1000])!, 90, 1e-9);
});

test('최대 낙폭은 현재 하락과 다르다', () => {
  // 지금은 전고점이지만 과거에 50% 낙폭이 있었다
  const dd = maxDrawdownPct([100, 50, 100])!;
  near(dd, 50, 1e-9, '현재 낙폭은 0이지만 최대는 50');
});

test('최대 낙폭 잘못된 입력', () => {
  assert.equal(maxDrawdownPct([]), null);
  assert.equal(maxDrawdownPct([NaN, 0, -5]), null);
  near(maxDrawdownPct([NaN, 100, 50])!, 50, 1e-9, '유효한 값만 본다');
});

test('월 이름 배열이 12개다', () => {
  assert.equal(MONTH_SHORT.length, 12);
  assert.equal(MONTH_SHORT[0], 'Jan');
  assert.equal(MONTH_SHORT[11], 'Dec');
});

test('이항검정 — 알려진 값과 맞는다', () => {
  // 동전 2번 중 2번 같은 면: 앞앞 또는 뒤뒤 = 2/4 = 0.5
  near(binomialTwoSidedP(2, 2)!, 0.5, 1e-12);
  // 10번 중 10번: 2/1024
  near(binomialTwoSidedP(10, 10)!, 2 / 1024, 1e-12);
  // 반반은 유의할 수 없다
  near(binomialTwoSidedP(5, 10)!, 1, 1e-9);
});

test('이항검정 — 9번 중 7번은 흔한 일이다', () => {
  // 계절성 표의 "승률 78%"가 이 경우다. 우연으로도 자주 나온다.
  const p = binomialTwoSidedP(7, 9)!;
  assert.ok(p > 0.15, `9번 중 7번의 p=${p.toFixed(3)}는 0.05보다 훨씬 크다`);
  assert.ok(p < 0.25, `그렇다고 1에 가깝지도 않다 (p=${p.toFixed(3)})`);
});

test('이항검정 — 8번 중 1번(승률 13%)은 더 치우쳐 있다', () => {
  const p1 = binomialTwoSidedP(1, 8)!;
  const p7 = binomialTwoSidedP(7, 9)!;
  assert.ok(p1 < p7, `8번 중 1번(p=${p1.toFixed(3)})이 9번 중 7번(p=${p7.toFixed(3)})보다 드물다`);
});

test('이항검정은 대칭이다', () => {
  for (const [k, n] of [[2, 9], [7, 9], [1, 8], [3, 10]] as [number, number][]) {
    near(binomialTwoSidedP(k, n)!, binomialTwoSidedP(n - k, n)!, 1e-12, `${k}/${n}`);
  }
});

test('이항검정 잘못된 입력', () => {
  assert.equal(binomialTwoSidedP(5, 0), null);
  assert.equal(binomialTwoSidedP(-1, 9), null);
  assert.equal(binomialTwoSidedP(10, 9), null);
  assert.equal(binomialTwoSidedP(NaN, 9), null);
});
