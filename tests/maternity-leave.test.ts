/**
 * 출산전후휴가 급여 — 상한·하한이 꺾이는 자리를 못 박는다.
 *
 * ── 이 검사가 무엇을 상대로 두나 ───────────────────────────
 * 급여액에 닫힌 외부 기준값이 없다. 대신 이 셈에는 **꺾이는 자리**가 셋 있고,
 * 그 셋이 이 계산기의 값 전부다.
 *
 *   ① 통상임금이 상한액보다 크면 고용보험 지급액이 평평해진다
 *   ② 통상임금이 하한액보다 작으면 하한이 끌어올린다
 *   ③ 유급기간이 끝나면 회사가 차액을 메우지 않아 통상임금과 벌어진다
 *
 * 단조성만 보면 ①이 언제 시작되는지 못 잡고, 손으로 셈한 한 점만 보면 꺾임이
 * 없어도 통과한다. 그래서 **꺾이는 자리를 직접 찾아** 그 위치가 상한액과 같은지
 * 확인한다 — 상한액을 없애면 꺾임이 사라져 걸린다.
 *
 * ── 내역의 합이 총액과 같아야 한다 ────────────────────────
 * 구간별 내역을 두 갈래로 더한다 — `blocks`를 더한 값과 결과 필드를 더한 값.
 * 한 줄이 빠지면 갈라진다.
 *
 * ── 하한이 상한을 넘는 상태가 지금 실제로 그렇다 ──────────
 * 하한은 최저임금에 연동되고 상한은 따로 고시된다. 2026년 최저시급의 월 환산액은
 * 2,156,880원인데 상한액 고시는 2,100,000원이다. 이런 상태에서 셈이 무너지지
 * 않는지, 그리고 그 사실을 결과가 알리는지(`floorAboveCap`) 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  AFTER_BIRTH_MIN_DAYS, DAYS_PER_MONTH, LEAVE_DAYS, MIN_HOURLY_WAGE, MISCARRIAGE_LEAVE,
  MONTHLY_CAP, PAID_LEAVE_DAYS, calcMaternityLeave, calcSpouseLeave, eiMonthlyBenefit,
  miscarriageLeaveDays, monthlyMinimumWage,
} from '../lib/maternity-leave.ts';
import { MIN_HOURLY_WAGE as WAGE_LIB } from '../lib/minimum-wage.ts';

const ROOT = join(import.meta.dirname, '..');

test('최저시급을 이 파일에 다시 적지 않았다', () => {
  /*
   * 같은 값이 두 곳에 있으면 해마다 한쪽만 고쳐진다. 원래 그랬던 것을 lib으로
   * 모았으니, 되돌아가지 않는지 원문으로 본다.
   */
  assert.equal(MIN_HOURLY_WAGE, WAGE_LIB, '최저시급이 두 곳에서 갈렸다');
  const lib = readFileSync(join(ROOT, 'lib', 'maternity-leave.ts'), 'utf8');
  const code = lib.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/MIN_HOURLY_WAGE\s*=\s*\d/.test(code), '최저시급이 되살아났다');
  assert.match(code, /from '\.\/minimum-wage\.ts'/, '최저임금 lib을 안 가져온다');
});

test('법정 일수가 서로 앞뒤가 맞는다', () => {
  /* 유급 일수는 총 휴가일수를 넘을 수 없고, 출산 후 최소 일수도 그렇다 */
  for (const key of ['single', 'multiple'] as const) {
    assert.ok(PAID_LEAVE_DAYS[key] <= LEAVE_DAYS[key], `${key}: 유급이 총 휴가보다 길다`);
    assert.ok(AFTER_BIRTH_MIN_DAYS[key] <= LEAVE_DAYS[key], `${key}: 출산 후 최소가 총 휴가보다 길다`);
  }
  /* 다태아는 모든 축에서 단태아보다 길거나 같다 */
  assert.ok(LEAVE_DAYS.multiple > LEAVE_DAYS.single);
  assert.ok(PAID_LEAVE_DAYS.multiple > PAID_LEAVE_DAYS.single);
  assert.ok(AFTER_BIRTH_MIN_DAYS.multiple > AFTER_BIRTH_MIN_DAYS.single);
});

test('상한이 꺾이는 자리가 상한액과 같다', () => {
  /*
   * 이것이 이 검사의 본체다. 통상임금을 훑으면서 고용보험 지급액이 **처음으로
   * 늘지 않는 자리**를 찾는다. 그 자리가 상한액이어야 한다.
   * 상한을 없애면 꺾임이 사라져 걸린다.
   */
  const floor = 0;   // 하한을 치워 상한만 본다
  let bend = -1;
  let prev = -1;
  for (let wage = 1_000_000; wage <= 5_000_000; wage += 10_000) {
    const ei = eiMonthlyBenefit(wage, MONTHLY_CAP, floor);
    if (prev >= 0 && ei === prev && bend < 0) bend = wage - 10_000;
    prev = ei;
  }
  assert.ok(bend > 0, '상한에 걸리는 자리가 없다 — 상한이 사라졌다');
  assert.ok(
    Math.abs(bend - MONTHLY_CAP) <= 10_000,
    `꺾이는 자리가 ${bend.toLocaleString()}원인데 상한액은 ${MONTHLY_CAP.toLocaleString()}원이다`,
  );
  /* 상한 위에서는 통상임금이 얼마든 같은 금액이다 */
  const a = eiMonthlyBenefit(MONTHLY_CAP + 1_000_000, MONTHLY_CAP, floor);
  const b = eiMonthlyBenefit(MONTHLY_CAP + 9_000_000, MONTHLY_CAP, floor);
  assert.equal(a, b);
  assert.equal(a, MONTHLY_CAP);
});

test('하한이 통상임금보다 낮은 사람을 끌어올린다', () => {
  const floor = monthlyMinimumWage();
  const low = calcMaternityLeave({ monthlyWage: 1_000_000 });
  assert.equal(low.eiMonthly, floor, '하한이 안 걸렸다');
  assert.equal(low.flooredUp, true);
  /* 하한이 통상임금보다 크면 회사가 메울 차액이 없다 */
  assert.equal(low.employerTotal, 0, '하한이 통상임금을 넘는데 회사 몫이 남았다');

  /* 통상임금이 0이면 하한을 얹지 않는다 — 입력이 비었다는 뜻이다 */
  const empty = calcMaternityLeave({ monthlyWage: 0 });
  assert.equal(empty.eiMonthly, 0);
  assert.equal(empty.total, 0);
  assert.equal(empty.flooredUp, false);
});

test('하한이 상한을 넘는 상태에서도 무너지지 않는다', () => {
  /*
   * 2026년이 그렇다 — 최저임금 월 환산액이 상한액 고시보다 크다. 이때 하한이
   * 이기고, 결과가 그 사실을 알려야 한다.
   */
  const r = calcMaternityLeave({ monthlyWage: 3_000_000 });
  assert.equal(r.floorAboveCap, monthlyMinimumWage() > MONTHLY_CAP);
  if (r.floorAboveCap) {
    assert.equal(r.eiMonthly, r.monthlyFloor, '하한이 상한보다 큰데 상한이 이겼다');
  }
  for (const [k, v] of Object.entries(r)) {
    if (typeof v !== 'number') continue;
    assert.ok(Number.isFinite(v) && v >= 0, `${k}가 ${v}다`);
  }
});

test('내역의 합이 총액과 같다 — 두 갈래로 더한다', () => {
  for (const multiple of [false, true]) {
    for (const priorityFirm of [false, true]) {
      for (const wage of [1_500_000, 2_500_000, 4_000_000, 8_000_000]) {
        const r = calcMaternityLeave({ monthlyWage: wage, multiple, priorityFirm });
        const byBlocks = r.blocks.reduce((s, b) => s + b.total, 0);
        assert.equal(byBlocks, r.total, `${wage}: 내역 합이 총액과 다르다`);
        assert.equal(r.eiTotal + r.employerTotal, r.total, `${wage}: 두 부담 주체의 합이 총액과 다르다`);
        assert.equal(
          r.blocks.reduce((s, b) => s + b.days, 0),
          r.totalDays,
          `${wage}: 구간 일수의 합이 총 휴가일수와 다르다`,
        );
        assert.equal(r.paidDays + r.unpaidDays, r.totalDays);
      }
    }
  }
});

test('우선지원대상기업이 아니면 고용보험이 유급기간을 대신 주지 않는다', () => {
  const wage = 2_500_000;
  const yes = calcMaternityLeave({ monthlyWage: wage, priorityFirm: true });
  const no = calcMaternityLeave({ monthlyWage: wage, priorityFirm: false });

  /* 고용보험이 주는 일수가 유급 일수만큼 줄어든다 */
  assert.equal(yes.eiDays - no.eiDays, yes.paidDays);
  assert.ok(no.eiTotal < yes.eiTotal, '고용보험 몫이 안 줄었다');
  /* 근로자가 받는 총액은 같아야 한다 — 유급기간은 회사가 통상임금을 보장한다 */
  assert.equal(no.total, yes.total, '부담 주체만 바뀌어야 하는데 수령액이 달라졌다');
  assert.ok(no.employerTotal > yes.employerTotal, '회사 몫이 안 늘었다');
});

test('무급기간에서 통상임금과 벌어진다', () => {
  /*
   * 유급기간에는 회사가 차액을 메우므로 통상임금대로 받고, 무급기간에는 고용보험
   * 금액만 받는다. 상한에 걸리는 통상임금이면 그 차이가 부족액으로 남아야 한다.
   */
  const r = calcMaternityLeave({ monthlyWage: 5_000_000 });
  assert.ok(r.capped, '상한에 안 걸렸다 — 입력을 잘못 잡았다');
  assert.ok(r.shortfall > 0, '상한에 걸렸는데 부족액이 0이다');

  const paidBlock = r.blocks.find(b => b.paid)!;
  const unpaidBlock = r.blocks.find(b => !b.paid)!;
  /* 유급 구간은 통상임금과 맞고(반올림 차이만), 무급 구간은 모자란다 */
  assert.ok(Math.abs(paidBlock.total - Math.round(r.dailyWage * paidBlock.days)) <= 1);
  assert.ok(unpaidBlock.total < Math.round(r.dailyWage * unpaidBlock.days));
  /* 부족액은 무급 구간의 모자란 몫과 같다 */
  assert.ok(Math.abs(r.shortfall - (Math.round(r.dailyWage * unpaidBlock.days) - unpaidBlock.total)) <= 2);
});

test('손으로 셈한 사례와 맞댄다', () => {
  /*
   * 월 통상임금 3,000,000원 · 단태아 · 우선지원대상기업.
   * 일 통상임금 = 3,000,000 ÷ 30 = 100,000원.
   * 고용보험 30일분은 상한·하한 사이에서 정해지고, 일액은 그것 ÷ 30이다.
   * 유급 60일은 통상임금 보장이므로 60 × 100,000 = 6,000,000원,
   * 무급 30일은 고용보험 일액 × 30이다.
   */
  const wage = 3_000_000;
  const r = calcMaternityLeave({ monthlyWage: wage });
  assert.equal(r.totalDays, LEAVE_DAYS.single);
  assert.equal(r.paidDays, PAID_LEAVE_DAYS.single);
  assert.equal(r.dailyWage, wage / DAYS_PER_MONTH);

  const eiDaily = r.eiMonthly / DAYS_PER_MONTH;
  const wantPaid = Math.round(r.dailyWage * r.paidDays);
  const wantUnpaid = Math.round(eiDaily * r.unpaidDays);
  assert.equal(wantPaid, 6_000_000);
  assert.ok(Math.abs(r.total - (wantPaid + wantUnpaid)) <= 2, `${r.total} vs ${wantPaid + wantUnpaid}`);
});

test('통상임금이 오르면 받는 돈이 줄지 않는다', () => {
  let prev = -1;
  for (let wage = 0; wage <= 10_000_000; wage += 50_000) {
    const now = calcMaternityLeave({ monthlyWage: wage }).total;
    assert.ok(now >= prev, `${wage.toLocaleString()}원에서 수령액이 줄었다`);
    prev = now;
  }
});

test('유산·사산 휴가는 임신기간이 짧으면 짧다', () => {
  /* 표를 다시 적지 않고 성질을 본다 — 주가 늘 때 일수가 줄지 않는다 */
  let prev = 0;
  for (let week = 1; week <= 45; week++) {
    const days = miscarriageLeaveDays(week);
    assert.ok(days >= prev, `${week}주에서 휴가가 줄었다`);
    assert.ok(days > 0, `${week}주에서 휴가가 0이다`);
    prev = days;
  }
  /* 마지막 칸은 출산전후휴가와 같은 90일이다 */
  assert.equal(miscarriageLeaveDays(40), LEAVE_DAYS.single);
  assert.equal(MISCARRIAGE_LEAVE[MISCARRIAGE_LEAVE.length - 1].days, LEAVE_DAYS.single);

  /* 휴가가 유급 일수보다 짧으면 전부 유급이다 */
  const short = calcMaternityLeave({ monthlyWage: 3_000_000, totalDays: miscarriageLeaveDays(10) });
  assert.equal(short.totalDays, 5);
  assert.equal(short.paidDays, 5, '5일 휴가인데 유급이 60일이다');
  assert.equal(short.unpaidDays, 0);
});

test('배우자 출산휴가는 근로일로 세고 통상임금 전액이다', () => {
  /*
   * 월 ÷ 30이 아니라 통상시급 × 8시간이다. 209시간 기준으로 월 3,000,000원이면
   * 시급은 약 14,354원, 하루는 약 114,832원이다 — 월÷30 = 100,000원과 다르다.
   */
  const wage = 3_000_000;
  const s = calcSpouseLeave({ monthlyWage: wage });
  assert.ok(s.dailyWage > wage / DAYS_PER_MONTH, '근로일 기준인데 월÷30으로 셌다');
  assert.equal(s.total, Math.round(s.dailyWage * s.days));
  assert.ok(Math.abs(s.dailyWage - s.hourly * 8) < 1e-9);

  /* 일수를 줄이면 총액이 비례해서 줄어든다 */
  const half = calcSpouseLeave({ monthlyWage: wage, days: s.days / 2 });
  assert.ok(Math.abs(half.total - s.total / 2) <= 1);
  assert.equal(calcSpouseLeave({ monthlyWage: 0 }).total, 0);
});

test('페이지에 상한액이 되살아나지 않았다', () => {
  const page = readFileSync(
    join(ROOT, 'app', '(ko)', 'calculator', 'maternity-leave', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/maternity-leave'/, '페이지가 lib을 안 쓴다');
  assert.match(page, /calcMaternityLeave/, '페이지가 lib 함수를 안 부른다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/2_100_000|2100000/.test(code), '페이지에 상한액이 되살아났다');
  assert.ok(!/10_320/.test(code), '페이지에 최저시급이 되살아났다');
});
