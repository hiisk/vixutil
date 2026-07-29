import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  rewardAt, halvingInfo, etaMs, observedBlockSeconds, breakdown,
  HALVING_INTERVAL, INITIAL_REWARD, TARGET_BLOCK_SECONDS,
} from '../lib/halving.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('알려진 반감기 높이에서 보상이 절반이 된다', () => {
  // 실제 비트코인 이력과 맞춰본다
  near(rewardAt(0), 50);
  near(rewardAt(209_999), 50);
  near(rewardAt(210_000), 25, 1e-12, '1차 반감기 (2012)');
  near(rewardAt(420_000), 12.5, 1e-12, '2차 (2016)');
  near(rewardAt(630_000), 6.25, 1e-12, '3차 (2020)');
  near(rewardAt(840_000), 3.125, 1e-12, '4차 (2024)');
  near(rewardAt(1_050_000), 1.5625, 1e-12, '5차');
});

test('33번째 반감기 이후 보상은 0이다', () => {
  assert.ok(rewardAt(32 * HALVING_INTERVAL) > 0);
  near(rewardAt(33 * HALVING_INTERVAL), 0, 1e-15, '사토시 단위로 0이 된다');
  near(rewardAt(40 * HALVING_INTERVAL), 0, 1e-15);
});

test('잘못된 높이는 보상 0', () => {
  near(rewardAt(-1), 0);
  near(rewardAt(NaN), 0);
});

test('다음 반감기 높이와 남은 블록', () => {
  const r = halvingInfo(900_000)!;
  assert.equal(r.epoch, 4, '840,000~1,049,999는 4번째 주기');
  assert.equal(r.nextHeight, 1_050_000);
  assert.equal(r.blocksRemaining, 150_000);
  near(r.reward, 3.125, 1e-12);
  near(r.nextReward, 1.5625, 1e-12, '다음엔 절반');
});

test('반감기 직전·직후 경계', () => {
  const before = halvingInfo(HALVING_INTERVAL - 1)!;
  assert.equal(before.blocksRemaining, 1);
  near(before.reward, 50);
  const after = halvingInfo(HALVING_INTERVAL)!;
  assert.equal(after.blocksRemaining, HALVING_INTERVAL, '방금 지났으면 다음까지 한 주기 전체');
  near(after.reward, 25);
  near(after.progressPct, 0);
});

test('진행률은 주기 안 위치를 나타낸다', () => {
  near(halvingInfo(840_000)!.progressPct, 0, 1e-9);
  near(halvingInfo(840_000 + HALVING_INTERVAL / 2)!.progressPct, 50, 1e-9);
  const almost = halvingInfo(1_050_000 - 1)!;
  assert.ok(almost.progressPct > 99.99);
});

test('예상 시각은 남은 블록 × 블록시간이다', () => {
  const now = 1_700_000_000_000;
  const eta = etaMs(144, TARGET_BLOCK_SECONDS, now)!;
  near(eta - now, 144 * 600 * 1000, 1e-6, '하루치 블록 = 24시간');
});

test('블록 시간이 빠르면 반감기가 앞당겨진다', () => {
  const now = 1_700_000_000_000;
  const slow = etaMs(1000, 660, now)!;   // 11분
  const fast = etaMs(1000, 540, now)!;   // 9분
  assert.ok(fast < slow, '블록이 빠르면 더 이르다');
  // 1000블록에서 2분 차이면 약 1.4일 차이가 난다
  near((slow - fast) / 86_400_000, (1000 * 120 * 1000) / 86_400_000, 1e-9);
});

test('etaMs 잘못된 입력', () => {
  assert.equal(etaMs(-1, 600, 0), null);
  assert.equal(etaMs(100, 0, 0), null);
  assert.equal(etaMs(100, -600, 0), null);
  assert.equal(etaMs(100, 600, NaN), null);
});

test('관측 블록 시간은 양 끝 간격을 블록 수로 나눈 값이다', () => {
  // 10개 타임스탬프, 정확히 600초 간격
  const ts = Array.from({ length: 10 }, (_, i) => 1_700_000_000 + i * 600);
  near(observedBlockSeconds(ts)!, 600, 1e-9);
});

test('타임스탬프 순서가 뒤섞여도 정렬해서 잰다', () => {
  // 비트코인 블록 타임스탬프는 단조증가가 보장되지 않는다
  const ts = [1_700_003_000, 1_700_000_000, 1_700_002_000, 1_700_001_000];
  near(observedBlockSeconds(ts)!, 1000, 1e-9, '3000초를 3구간으로');
});

test('관측값이 부족하거나 망가지면 null', () => {
  assert.equal(observedBlockSeconds([]), null);
  assert.equal(observedBlockSeconds([1_700_000_000]), null, '한 개로는 간격이 없다');
  assert.equal(observedBlockSeconds([1_700_000_000, 1_700_000_000]), null, '간격 0');
  assert.equal(observedBlockSeconds([NaN, 0, -5]), null);
});

test('남은 시간 쪼개기', () => {
  assert.deepEqual(breakdown(0), { days: 0, hours: 0, minutes: 0 });
  assert.deepEqual(breakdown(90 * 60 * 1000), { days: 0, hours: 1, minutes: 30 });
  assert.deepEqual(breakdown((2 * 1440 + 3 * 60 + 4) * 60 * 1000), { days: 2, hours: 3, minutes: 4 });
  assert.equal(breakdown(-1), null);
});

test('상수가 비트코인 규칙과 맞는다', () => {
  assert.equal(HALVING_INTERVAL, 210_000);
  assert.equal(INITIAL_REWARD, 50);
  assert.equal(TARGET_BLOCK_SECONDS, 600);
  // 총 발행량이 2100만에 수렴한다
  let total = 0;
  for (let e = 0; e < 33; e++) total += HALVING_INTERVAL * (INITIAL_REWARD / Math.pow(2, e));
  assert.ok(Math.abs(total - 21_000_000) < 1, `총 발행량 ${total}는 2100만에 근접해야 한다`);
});
