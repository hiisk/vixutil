import { test } from 'node:test';
import assert from 'node:assert/strict';
import { athInfo, recoveryGainPct } from '../lib/ath.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

test('전고점과 그 위치를 찾는다', () => {
  const r = athInfo([10, 50, 30, 20], 20)!;
  near(r.ath, 50);
  assert.equal(r.atIndex, 1);
  near(r.drawdownPct, 60, 1e-9, '50 → 20은 −60%');
});

test('반토막이면 회복에 두 배가 필요하다 — 비대칭', () => {
  // 사람들이 가장 자주 틀리는 지점이라 명시적으로 건다
  const r = athInfo([100], 50)!;
  near(r.drawdownPct, 50);
  near(r.gainToRecoverPct, 100, 1e-9, '−50%는 +100%가 필요하다');
});

test('−80%는 +400%가 필요하다', () => {
  const r = athInfo([100], 20)!;
  near(r.drawdownPct, 80);
  near(r.gainToRecoverPct, 400, 1e-9);
});

test('현재가가 과거 최고 종가보다 높으면 지금이 전고점이다', () => {
  const closes = [10, 50, 30];
  const r = athInfo(closes, 80)!;
  near(r.ath, 80, 1e-9, '현재가가 전고점이 된다');
  assert.equal(r.atIndex, closes.length);
  near(r.drawdownPct, 0);
  near(r.gainToRecoverPct, 0);
  assert.equal(r.atHigh, true);
  assert.equal(r.daysSince, 0);
});

test('전고점 근처면 atHigh가 켜진다', () => {
  assert.equal(athInfo([100], 99.95)!.atHigh, true, '0.05% 아래는 사실상 전고점');
  assert.equal(athInfo([100], 99.5)!.atHigh, false, '0.5% 아래는 아니다');
});

test('전고점 이후 지난 일수', () => {
  const r = athInfo([50, 100, 90, 80, 70], 70)!;
  assert.equal(r.atIndex, 1);
  assert.equal(r.daysSince, 4, '5개 중 인덱스 1 → 4일 지남');
});

test('pctOfAth는 전고점 대비 현재 위치다', () => {
  near(athInfo([100], 25)!.pctOfAth, 25);
  near(athInfo([100], 100)!.pctOfAth, 100);
});

test('drawdown과 gainToRecover는 서로 왕복한다', () => {
  for (const dd of [10, 25, 50, 75, 90, 99]) {
    const spot = 100 * (1 - dd / 100);
    const r = athInfo([100], spot)!;
    near(r.drawdownPct, dd, 1e-9, `하락률 ${dd}%`);
    near(r.gainToRecoverPct, recoveryGainPct(dd)!, 1e-9, `회복률 ${dd}%`);
    // 회복률을 적용하면 정확히 전고점이다
    near(spot * (1 + r.gainToRecoverPct / 100), 100, 1e-9);
  }
});

test('recoveryGainPct 경계', () => {
  near(recoveryGainPct(0)!, 0, 1e-12, '하락이 없으면 회복도 필요 없다');
  near(recoveryGainPct(50)!, 100, 1e-12);
  near(recoveryGainPct(90)!, 900, 1e-12);
  assert.equal(recoveryGainPct(100), null, '−100%는 회복이 불가능하다');
  assert.equal(recoveryGainPct(-1), null);
  assert.equal(recoveryGainPct(NaN), null);
});

test('망가진 입력은 null', () => {
  assert.equal(athInfo([], 100), null);
  assert.equal(athInfo([100], 0), null);
  assert.equal(athInfo([100], -5), null);
  assert.equal(athInfo([0, 0], 0), null);
});

test('NaN이 섞여 있어도 유효한 값만 본다', () => {
  const r = athInfo([10, NaN, 50, NaN], 25)!;
  near(r.ath, 50);
  assert.equal(r.atIndex, 2);
});
