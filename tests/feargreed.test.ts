import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  classify, percentileOf, forwardReturnsByBucket, toUtcDay, BUCKETS,
  type FngPoint, type FngBucket,
} from '../lib/feargreed.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

const DAY = 86_400_000;
const D0 = Date.UTC(2020, 0, 1);

const pt = (i: number, value: number): FngPoint =>
  ({ day: D0 + i * DAY, value, bucket: classify(value) });

test('분류 경계', () => {
  assert.equal(classify(0), 'Extreme Fear');
  assert.equal(classify(24), 'Extreme Fear');
  assert.equal(classify(25), 'Fear');
  assert.equal(classify(49), 'Fear');
  assert.equal(classify(50), 'Neutral');
  assert.equal(classify(54), 'Neutral');
  assert.equal(classify(55), 'Greed');
  assert.equal(classify(74), 'Greed');
  assert.equal(classify(75), 'Extreme Greed');
  assert.equal(classify(100), 'Extreme Greed');
});

test('백분위는 이력 대비 위치다', () => {
  const h = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  near(percentileOf(h, 50)!, 50, 1e-9);
  near(percentileOf(h, 0)!, 0, 1e-9);
  near(percentileOf(h, 100)!, 100, 1e-9);
  assert.equal(percentileOf([], 50), null);
});

test('구간별 이후 수익률을 정확히 계산한다', () => {
  // 3일 극단적 공포 뒤 가격이 2배가 되는 계열
  const points = [pt(0, 10), pt(1, 10), pt(2, 10)];
  const closes = new Map<number, number>();
  for (let i = 0; i <= 12; i++) closes.set(D0 + i * DAY, i < 3 ? 100 : 200);
  const stats = forwardReturnsByBucket(points, closes, 10);
  assert.equal(stats.length, 1);
  assert.equal(stats[0].bucket, 'Extreme Fear');
  assert.equal(stats[0].days, 3);
  near(stats[0].medianReturnPct, 100, 1e-9, '100 → 200');
  near(stats[0].winRatePct, 100, 1e-9);
});

test('연속 덩어리(에피소드)를 센다 — 겹치는 창의 표본 부풀림 방어', () => {
  // 같은 구간이 3일 연속이면 에피소드는 1개다
  const contiguous = [pt(0, 10), pt(1, 10), pt(2, 10)];
  const closes = new Map<number, number>();
  for (let i = 0; i <= 20; i++) closes.set(D0 + i * DAY, 100 + i);
  const a = forwardReturnsByBucket(contiguous, closes, 5);
  assert.equal(a[0].days, 3, '날짜는 3일');
  assert.equal(a[0].episodes, 1, '연속이므로 에피소드는 1개');

  // 사이에 다른 구간이 끼면 에피소드가 나뉜다
  const split = [pt(0, 10), pt(1, 80), pt(2, 10)];
  const b = forwardReturnsByBucket(split, closes, 5);
  const ef = b.find(x => x.bucket === 'Extreme Fear')!;
  assert.equal(ef.days, 2);
  assert.equal(ef.episodes, 2, '떨어져 있으므로 2개');
});

test('날짜가 건너뛰면 연속으로 보지 않는다', () => {
  const gapped: FngPoint[] = [pt(0, 10), pt(5, 10)];
  const closes = new Map<number, number>();
  for (let i = 0; i <= 20; i++) closes.set(D0 + i * DAY, 100);
  const s = forwardReturnsByBucket(gapped, closes, 3);
  assert.equal(s[0].episodes, 2, '5일 떨어져 있으면 별개 에피소드');
});

test('가격이 없는 날은 수익률에서 빠지지만 에피소드 계수에는 남는다', () => {
  const points = [pt(0, 10), pt(1, 10)];
  const closes = new Map<number, number>();
  closes.set(D0, 100);            // 시작가만 있고 도착가 없음
  const s = forwardReturnsByBucket(points, closes, 5);
  // 수익률을 못 내므로 통계가 비어 결과에서 제외된다
  assert.equal(s.length, 0, '수익률이 하나도 없으면 행이 없다');
});

test('여러 구간이 섞이면 각각 따로 집계한다', () => {
  const points = [pt(0, 10), pt(1, 80), pt(2, 60), pt(3, 30)];
  const closes = new Map<number, number>();
  for (let i = 0; i <= 20; i++) closes.set(D0 + i * DAY, 100 * (1 + i * 0.1));
  const s = forwardReturnsByBucket(points, closes, 5);
  const names = s.map(x => x.bucket).sort();
  assert.deepEqual(names, ['Extreme Fear', 'Extreme Greed', 'Fear', 'Greed'].sort());
  for (const x of s) assert.ok(x.days > 0 && x.episodes > 0);
});

test('승률은 양수 수익률 비율이다', () => {
  const points = [pt(0, 10), pt(1, 10), pt(2, 10), pt(3, 10)];
  const closes = new Map<number, number>();
  // 0일차만 오르고 나머지는 내린다
  closes.set(D0, 100); closes.set(D0 + 2 * DAY, 200);
  closes.set(D0 + DAY, 100); closes.set(D0 + 3 * DAY, 50);
  closes.set(D0 + 2 * DAY, 200); closes.set(D0 + 4 * DAY, 100);
  closes.set(D0 + 3 * DAY, 100); closes.set(D0 + 5 * DAY, 50);
  const s = forwardReturnsByBucket(points, closes, 2);
  assert.equal(s[0].days, 4);
  near(s[0].winRatePct, 25, 1e-9, '4일 중 1일만 양수');
});

test('지평이 0 이하면 빈 배열', () => {
  const closes = new Map<number, number>([[D0, 100]]);
  assert.deepEqual(forwardReturnsByBucket([pt(0, 10)], closes, 0), []);
  assert.deepEqual(forwardReturnsByBucket([pt(0, 10)], closes, -5), []);
});

test('toUtcDay는 UTC 자정으로 내린다', () => {
  const noon = Date.UTC(2024, 4, 15, 12, 34, 56);
  assert.equal(toUtcDay(noon), Date.UTC(2024, 4, 15));
  assert.equal(toUtcDay(Date.UTC(2024, 4, 15)), Date.UTC(2024, 4, 15), '이미 자정이면 그대로');
});

test('BUCKETS 순서가 공포에서 탐욕 순이다', () => {
  assert.deepEqual(BUCKETS, ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed'] as FngBucket[]);
});
