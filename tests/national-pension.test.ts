/**
 * 국민연금 — 법이 정한 식을 다른 길로 되짚는다.
 *
 * 이 계산기의 값은 전부 규칙에서 나오므로 검사가 실제로 실패할 수 있다.
 * 표를 옮겨 적었다면 "그럴듯한 숫자"라 아무도 못 잡았을 자리들이다.
 *
 *  - 상수는 2008년 1.5에서 해마다 0.015씩 내려가 1.2에서 멈춘다
 *  - 40년 가입한 평균소득자의 소득대체율은 상수의 3분의 1이다 (1.2 → 40%)
 *  - 지급률 구간(10~20년)과 20년 초과 구간이 **20년에서 이어진다** —
 *    두 규칙을 따로 적었으므로 그 자리에서 금액이 튀지 않는지 봐야 한다
 *  - 조기 5년은 70%, 연기 5년은 136%
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONST_FLOOR, FULL_MONTHS, MIN_MONTHS,
  breakEvenYears, calcPension, monthlyAt, oldAgeRate, pensionConstant, replacementRate, shiftTable,
} from '../lib/national-pension.ts';

/** 평균소득자(B=A) 300만원, 그 해 상수를 쓰는 입력 */
const base = {
  avgIncome: 3_000_000,
  myIncome: 3_000_000,
  months: 240,
  year: 2026,
  shiftYears: 0,
  familyAnnual: 0,
};

test('상수가 해마다 0.015씩 내려가 1.2에서 멈춘다', () => {
  assert.equal(pensionConstant(2008), 1.5);
  // 2026년은 18년이 지났으니 1.5 - 0.27
  assert.ok(Math.abs(pensionConstant(2026) - 1.23) < 1e-9, String(pensionConstant(2026)));
  assert.ok(Math.abs(pensionConstant(2028) - CONST_FLOOR) < 1e-9);
  // 2028년 뒤로는 더 내려가지 않는다 — 여기가 규칙을 잘못 적으면 조용히 틀리는 자리다
  assert.equal(pensionConstant(2040), CONST_FLOOR);
  assert.equal(pensionConstant(2100), CONST_FLOOR);
  // 2008년보다 앞은 1.5를 넘지 않는다
  assert.equal(pensionConstant(2000), 1.5);
});

test('40년 가입 평균소득자의 소득대체율이 상수의 3분의 1이다', () => {
  /*
   * 소득대체율 40%가 상수 1.2에서 나온다는 것을 식으로 되짚는다. 이 관계가
   * 깨지면 기본연금액 식의 괄호나 12로 나누는 자리가 틀린 것이다.
   */
  for (const year of [2008, 2020, 2026, 2028, 2035]) {
    const forty = calcPension({ ...base, months: 480, year });
    const rate = forty.monthly / base.myIncome;
    assert.ok(
      Math.abs(rate - replacementRate(year)) < 1e-9,
      `${year}년: 실제 ${(rate * 100).toFixed(2)}% vs 식 ${(replacementRate(year) * 100).toFixed(2)}%`,
    );
  }
  // 2028년 이후는 40%다
  assert.ok(Math.abs(replacementRate(2028) - 0.4) < 1e-9);
});

test('20년에서 두 규칙이 이어진다', () => {
  /*
   * 10~20년은 지급률이 5%p씩 붙고, 20년을 넘으면 기본연금액 괄호가 커진다.
   * 규칙이 둘이라 20년 자리에서 금액이 튈 수 있다 — 한 달 차이로 재 본다.
   */
  const at240 = monthlyAt(base, 240);
  const at239 = monthlyAt(base, 239);
  const at241 = monthlyAt(base, 241);

  assert.ok(at239 < at240 && at240 < at241, `${at239} < ${at240} < ${at241}`);
  // 한 달 차이의 증가폭이 앞뒤로 비슷해야 한다(3배를 넘으면 튄 것이다)
  const before = at240 - at239;
  const after = at241 - at240;
  assert.ok(after / before < 3 && before / after < 3, `증가폭이 튄다: ${before} vs ${after}`);
  assert.equal(oldAgeRate(FULL_MONTHS), 1);
});

test('가입기간 10년을 못 채우면 연금이 아니다', () => {
  /* 반환일시금 대상이라 월 연금은 0이다 — 지어낸 금액을 내지 않는다 */
  const short = calcPension({ ...base, months: MIN_MONTHS - 1 });
  assert.equal(short.monthly, 0);
  assert.equal(short.eligible, false);
  assert.equal(oldAgeRate(MIN_MONTHS - 1), 0);

  const just = calcPension({ ...base, months: MIN_MONTHS });
  assert.ok(just.monthly > 0);
  assert.equal(just.eligible, true);
  // 10년이면 절반이다
  assert.equal(oldAgeRate(MIN_MONTHS), 0.5);
});

test('가입기간이 길수록 월 연금이 는다', () => {
  let prev = 0;
  for (let m = MIN_MONTHS; m <= 480; m += 12) {
    const now = monthlyAt(base, m);
    assert.ok(now > prev, `${m}개월에서 줄었다: ${prev} → ${now}`);
    prev = now;
  }
});

test('조기는 1년당 6% 깎이고 연기는 7.2% 붙는다', () => {
  const normal = calcPension(base).monthly;
  const table = shiftTable(base);
  assert.equal(table.length, 11);

  for (const { shift, monthly } of table) {
    const expect = shift < 0 ? 1 + 0.06 * shift : 1 + 0.072 * shift;
    assert.ok(Math.abs(monthly / normal - expect) < 1e-9, `${shift}년: ${monthly / normal} vs ${expect}`);
  }
  // 다섯 해를 앞당기면 70%, 미루면 136%
  const early5 = calcPension({ ...base, shiftYears: -5 }).monthly;
  const late5 = calcPension({ ...base, shiftYears: 5 }).monthly;
  assert.ok(Math.abs(early5 / normal - 0.7) < 1e-9);
  assert.ok(Math.abs(late5 / normal - 1.36) < 1e-9);
  // 최대를 넘겨 넣어도 5년에서 멈춘다
  assert.equal(calcPension({ ...base, shiftYears: -9 }).monthly, early5);
  assert.equal(calcPension({ ...base, shiftYears: 9 }).monthly, late5);
});

test('앞당겨 받으면 누적이 앞서지만 언젠가 뒤집힌다', () => {
  /*
   * 조기수령이 유리한지는 얼마나 오래 받는지에 달렸다. 그 지점이 실제로
   * 있는지, 그리고 20년 안쪽인지를 본다 — 60년을 다 돌아도 안 뒤집히면
   * 감액률이나 증액률을 잘못 적은 것이다.
   */
  const years = breakEvenYears(base, -5, 5);
  assert.ok(years !== null, '따라잡는 지점이 없다');
  assert.ok(years! > 5 && years! < 30, `${years}년은 이상하다`);

  // 조기수령끼리는 뒤집히지 않는다(둘 다 같은 시점이면 null)
  assert.equal(breakEvenYears(base, 0, 0), null);
});

test('A값과 B값에 대해 1차식이다', () => {
  /* 소득이 두 배면 연금도 두 배다 — 괄호 안이 (A+B)이므로 */
  const one = calcPension(base).monthly;
  const twice = calcPension({ ...base, avgIncome: 6_000_000, myIncome: 6_000_000 }).monthly;
  assert.ok(Math.abs(twice / one - 2) < 1e-9, `${twice / one}`);

  // A만 올려도 연금이 는다 — 내 소득이 그대로여도 전체 평균이 오르면 오른다
  const higherA = calcPension({ ...base, avgIncome: 4_000_000 }).monthly;
  assert.ok(higherA > one);
});

test('부양가족연금은 앞당김·미룸으로 깎이지 않는다', () => {
  const family = 300_000 * 12;
  const normal = calcPension({ ...base, familyAnnual: family });
  const early = calcPension({ ...base, familyAnnual: family, shiftYears: -5 });

  assert.equal(normal.familyMonthly, family / 12);
  assert.equal(early.familyMonthly, family / 12);
  // 본인 몫만 70%가 된다
  assert.ok(Math.abs(early.monthlyBeforeFamily / normal.monthlyBeforeFamily - 0.7) < 1e-9);
  // 연금을 못 받는 사람에게는 부양가족연금도 없다
  assert.equal(calcPension({ ...base, months: 60, familyAnnual: family }).familyMonthly, 0);
});

test('연 수령액은 월액의 열두 배다', () => {
  const r = calcPension(base);
  assert.ok(Math.abs(r.annual - r.monthly * 12) < 1e-6);
  // 내 소득 대비 비율도 되짚는다
  assert.ok(Math.abs(r.ownReplacementRate - (r.monthly / base.myIncome) * 100) < 1e-9);
});
