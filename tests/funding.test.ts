import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  annualizedPct, fundingCost, buildFundingRows, intervalBreakdown, ratePercentile,
  DEFAULT_INTERVAL_HOURS,
  type PremiumIndexRaw, type FundingInfoRaw,
} from '../lib/funding.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

test('연환산은 요율 × 하루 정산횟수 × 365이다', () => {
  // 0.01% 8시간 주기 = 하루 3회 → 0.01 × 3 × 365 = 10.95%
  near(annualizedPct(0.0001, 8), 10.95, 1e-9);
  // 같은 요율이라도 4시간 주기면 하루 6회 → 정확히 두 배
  near(annualizedPct(0.0001, 4), 21.9, 1e-9);
  near(annualizedPct(0.0001, 1), 87.6, 1e-9);
});

test('8시간이라고 잘못 가정하면 4시간 종목이 절반으로 나온다', () => {
  // 이 페이지의 존재 이유 — 실측상 4시간 종목이 다수다
  const rate = 0.0003;
  assert.equal(annualizedPct(rate, 8) * 2, annualizedPct(rate, 4));
});

test('음수 펀딩비는 연환산도 음수다 (숏이 롱에게 낸다)', () => {
  assert.ok(annualizedPct(-0.0002, 8) < 0);
  near(annualizedPct(-0.0001, 8), -10.95, 1e-9);
});

test('잘못된 주기는 NaN', () => {
  assert.ok(Number.isNaN(annualizedPct(0.0001, 0)));
  assert.ok(Number.isNaN(annualizedPct(0.0001, -4)));
  assert.ok(Number.isNaN(annualizedPct(NaN, 8)));
});

test('펀딩비 총액은 정산 횟수만큼만 부과된다 (내림)', () => {
  // 8시간 주기로 1일 보유 = 3회
  near(fundingCost(10_000, 0.0001, 8, 1), 10_000 * 0.0001 * 3, 1e-9);
  // 0.9일이면 2회만 지나간다 (21.6시간 / 8 = 2.7 → 2)
  near(fundingCost(10_000, 0.0001, 8, 0.9), 10_000 * 0.0001 * 2, 1e-9);
  // 4시간 주기 1일이면 6회 — 같은 요율에 두 배
  near(fundingCost(10_000, 0.0001, 4, 1), 10_000 * 0.0001 * 6, 1e-9);
});

test('한 정산도 지나지 않으면 0원이다', () => {
  near(fundingCost(10_000, 0.0001, 8, 0.3), 0, 1e-12, '7.2시간은 8시간 정산에 못 미친다');
  near(fundingCost(10_000, 0.0001, 8, 0), 0, 1e-12);
});

test('펀딩비 부호는 방향을 뜻한다', () => {
  assert.ok(fundingCost(10_000, 0.0001, 8, 30) > 0, '양수 요율 → 롱이 낸다');
  assert.ok(fundingCost(10_000, -0.0001, 8, 30) < 0, '음수 요율 → 롱이 받는다');
});

test('연환산과 총액 계산이 서로 정합한다', () => {
  // 1년 보유하면 총액 ≈ 명목가 × 연환산/100 (정산 횟수 내림 오차 범위 내)
  const notional = 100_000, rate = 0.0001;
  for (const h of [1, 4, 8]) {
    const total = fundingCost(notional, rate, h, 365);
    const viaAnnual = notional * (annualizedPct(rate, h) / 100);
    assert.ok(Math.abs(total - viaAnnual) < notional * Math.abs(rate) * 1.01,
      `${h}시간 주기: ${total} vs ${viaAnnual} (정산 1회 이내 차이여야 함)`);
  }
});

const premium = (symbol: string, rate: string, mark = '100'): PremiumIndexRaw =>
  ({ symbol, markPrice: mark, lastFundingRate: rate, nextFundingTime: 1 });

test('fundingInfo에 있는 종목은 그 주기를, 없으면 8시간을 쓴다', () => {
  const rows = buildFundingRows(
    [premium('BTCUSDT', '0.0001'), premium('LPTUSDT', '0.0001')],
    [{ symbol: 'LPTUSDT', fundingIntervalHours: 4 }] as FundingInfoRaw[],
  );
  const btc = rows.find(r => r.symbol === 'BTCUSDT')!;
  const lpt = rows.find(r => r.symbol === 'LPTUSDT')!;
  assert.equal(btc.intervalHours, DEFAULT_INTERVAL_HOURS, '목록에 없으면 기본 8시간');
  assert.equal(lpt.intervalHours, 4);
  assert.equal(lpt.annualPct, btc.annualPct * 2, '같은 요율, 절반 주기 → 두 배');
});

test('USDT 페어가 아니거나 값이 망가진 행은 버린다', () => {
  const rows = buildFundingRows(
    [
      premium('BTCUSDT', '0.0001'),
      premium('BTCUSDC', '0.0001'),
      premium('ETHUSDT', 'not-a-number'),
      premium('XRPUSDT', '0.0001', '0'),
    ],
    [],
  );
  assert.deepEqual(rows.map(r => r.symbol), ['BTCUSDT'], 'USDT·유효값만 남는다');
});

test('base는 심볼에서 USDT를 뗀 값이다', () => {
  const rows = buildFundingRows([premium('1000PEPEUSDT', '0.0001')], []);
  assert.equal(rows[0].base, '1000PEPE');
});

test('주기별 집계는 시간 오름차순이고 합이 전체와 같다', () => {
  const rows = buildFundingRows(
    [premium('AUSDT', '0.0001'), premium('BUSDT', '0.0001'), premium('CUSDT', '0.0001')],
    [{ symbol: 'AUSDT', fundingIntervalHours: 4 }, { symbol: 'BUSDT', fundingIntervalHours: 4 }] as FundingInfoRaw[],
  );
  const bd = intervalBreakdown(rows);
  assert.deepEqual(bd, [{ hours: 4, count: 2 }, { hours: 8, count: 1 }]);
  assert.equal(bd.reduce((s, x) => s + x.count, 0), rows.length);
});

test('백분위는 과거 대비 현재 위치를 준다', () => {
  const hist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  near(ratePercentile(hist, 5)!, 50, 1e-9);
  near(ratePercentile(hist, 0)!, 0, 1e-9);
  near(ratePercentile(hist, 100)!, 100, 1e-9);
  assert.equal(ratePercentile([], 1), null, '이력이 없으면 null');
});
