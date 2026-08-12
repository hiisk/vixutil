/**
 * 유족연금 — 지급률 문턱과 중복급여 조정을 되짚는다.
 *
 *  - 지급률은 가입기간 10년·20년에서 40% → 50% → 60%로 뛴다. 문턱을 한 달
 *    차이로 밟아 본다
 *  - 제 노령연금이 유족연금의 **70%를 넘으면** 그쪽을 고르는 게 유리해진다.
 *    식을 풀어 두었으니(ownPensionBreakEven) 그 갈림길에서 판정이 바뀌는지 본다
 *  - 기본연금액은 lib/national-pension.ts의 식을 빌려 쓴다 — 같은 값이 나오는지
 *    직접 대조한다
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  OVERLAP_BONUS, calcSurvivor, ownPensionBreakEven, survivorRate,
} from '../lib/survivor-pension.ts';
import { calcPension } from '../lib/national-pension.ts';

const base = {
  avgIncome: 3_000_000,
  myIncome: 3_000_000,
  months: 180,
  year: 2026,
  shiftYears: 0,
  familyAnnual: 0,
  ownPension: 0,
};

test('지급률이 10년과 20년에서 뛴다', () => {
  assert.equal(survivorRate(0), 0.4);
  assert.equal(survivorRate(119), 0.4);
  assert.equal(survivorRate(120), 0.5);
  assert.equal(survivorRate(239), 0.5);
  assert.equal(survivorRate(240), 0.6);
  assert.equal(survivorRate(600), 0.6);

  // 한 달 차이로 금액이 실제로 뛴다 — 문턱이 계산에 물려 있는지 본다
  const at119 = calcSurvivor({ ...base, months: 119 }).survivorMonthly;
  const at120 = calcSurvivor({ ...base, months: 120 }).survivorMonthly;
  assert.ok(at120 > at119, `${at120} > ${at119}가 아니다`);
});

test('기본연금액은 노령연금 쪽 식과 같은 값이다', () => {
  /* 식을 두 곳에 적지 않았는지 대조한다 */
  for (const months of [60, 180, 300]) {
    const s = calcSurvivor({ ...base, months });
    const p = calcPension({ ...base, months });
    assert.equal(s.basicAnnual, p.basicAnnual, `${months}개월에서 어긋났다`);
    // 유족연금은 기본연금액 × 지급률 ÷ 12 다
    assert.ok(
      Math.abs(s.survivorMonthly - (p.basicAnnual * survivorRate(months)) / 12) < 1e-9,
      `${months}개월`,
    );
  }
});

test('가입기간 10년 미만이어도 유족연금은 나온다', () => {
  /*
   * 노령연금은 10년을 못 채우면 0이지만 유족연금은 다르다 — 40%가 나온다.
   * 두 규칙을 헷갈려 eligible을 그대로 물리면 이 검사가 걸린다.
   */
  const short = calcSurvivor({ ...base, months: 60 });
  assert.ok(short.survivorMonthly > 0, '10년 미만인데 0이 나왔다');
  assert.equal(short.rate, 0.4);
  assert.equal(calcPension({ ...base, months: 60 }).monthly, 0);
});

test('부양가족연금은 지급률과 무관하게 그대로 더한다', () => {
  const family = 300_000 * 12;
  const without = calcSurvivor(base);
  const wit = calcSurvivor({ ...base, familyAnnual: family });
  assert.ok(Math.abs(wit.survivorMonthly - without.survivorMonthly - family / 12) < 1e-9);
});

test('제 노령연금이 유족연금의 70%를 넘으면 그쪽을 고른다', () => {
  /*
   * 노령연금 + 유족연금 × 0.3 > 유족연금  ⇔  노령연금 > 유족연금 × 0.7.
   * 갈림길 양쪽에서 판정이 바뀌는지 본다 — 이 계산기의 요점이다.
   */
  const s = calcSurvivor(base).survivorMonthly;
  const line = ownPensionBreakEven(s);
  assert.ok(Math.abs(line - s * (1 - OVERLAP_BONUS)) < 1e-9);

  const below = calcSurvivor({ ...base, ownPension: line - 10_000 });
  const above = calcSurvivor({ ...base, ownPension: line + 10_000 });

  assert.equal(below.choice, 'survivor', '유족연금이 더 많은데 노령연금을 골랐다');
  assert.equal(above.choice, 'own', '노령연금이 더 많은데 유족연금을 골랐다');
  // 고른 쪽이 실제로 큰 쪽이다
  for (const r of [below, above]) {
    assert.equal(r.monthly, Math.max(r.survivorMonthly, r.ownPlusBonus));
  }
});

test('갈림길에서는 두 선택이 같은 금액이다', () => {
  const s = calcSurvivor(base).survivorMonthly;
  const at = calcSurvivor({ ...base, ownPension: ownPensionBreakEven(s) });
  assert.ok(Math.abs(at.survivorMonthly - at.ownPlusBonus) < 1e-6, `차이 ${at.gap}`);
  // 같으면 유족연금을 고른 것으로 둔다 — 어느 쪽이든 금액은 같다
  assert.equal(at.choice, 'survivor');
  assert.ok(at.gap < 1e-6);
});

test('제 노령연금이 없으면 유족연금만 받는다', () => {
  const r = calcSurvivor(base);
  assert.equal(r.ownPlusBonus, 0);
  assert.equal(r.choice, 'survivor');
  assert.equal(r.monthly, r.survivorMonthly);
});

test('노령연금을 고르면 유족연금의 30%만 얹힌다', () => {
  const own = 1_500_000;
  const r = calcSurvivor({ ...base, ownPension: own });
  assert.equal(r.choice, 'own');
  assert.ok(Math.abs(r.ownPlusBonus - (own + r.survivorMonthly * OVERLAP_BONUS)) < 1e-9);
  // 둘을 다 받는 것보다는 적다 — 중복급여 조정이 실제로 걸렸는지 본다
  assert.ok(r.monthly < own + r.survivorMonthly);
});
