/**
 * 대출 상환방식 — 셈을 다른 길로 되짚는다.
 *
 * 원리금균등의 월 상환액은 닫힌 식으로 나오지만, 실제로 그 돈을 매달 내면
 * 마지막 달에 잔액이 0이 되는지가 진짜 확인이다. 달마다 이자를 붙이고 원금을
 * 깎아 내려가며 그것을 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  ALL_METHODS, compareAll, equalPayment, monthlyRate, schedule,
} from '../lib/loan-schedule.ts';

const loan = { principal: 100_000_000, annualRate: 5.4, months: 120 };

test('월이율은 연이율의 12분의 1이다', () => {
  assert.ok(Math.abs(monthlyRate(5.4) - 0.0045) < 1e-12);
  assert.equal(monthlyRate(0), 0);
});

test('원리금균등으로 갚으면 마지막에 잔액이 0이 된다', () => {
  const a = equalPayment(loan.principal, loan.annualRate, loan.months);
  const i = monthlyRate(loan.annualRate);
  let left = loan.principal;
  for (let m = 0; m < loan.months; m++) left = left * (1 + i) - a;
  assert.ok(Math.abs(left) < 1, `마지막 잔액이 ${left}원 남았다`);

  // 이율이 0이면 원금을 개월로 나눈 값이다 — 0으로 안 나눈다
  assert.equal(equalPayment(1_200_000, 0, 12), 100_000);
});

test('총이자는 원금균등 < 원리금균등 < 만기일시다', () => {
  const [eq, ep, bullet] = compareAll(loan);
  assert.ok(ep.totalInterest < eq.totalInterest, '원금균등이 더 많이 냈다');
  assert.ok(eq.totalInterest < bullet.totalInterest, '만기일시가 더 적게 냈다');
  // 총 상환액은 원금과 이자의 합이다
  for (const s of [eq, ep, bullet]) {
    assert.ok(Math.abs(s.totalPaid - (loan.principal + s.totalInterest)) < 1, s.method);
  }
});

test('첫 달 부담은 원금균등이 가장 크다', () => {
  const [eq, ep, bullet] = compareAll(loan);
  assert.ok(ep.firstPayment > eq.firstPayment, '원금균등 첫 달이 안 무겁다');
  assert.ok(eq.firstPayment > bullet.firstPayment, '만기일시 첫 달이 더 무겁다');
  // 원금균등은 뒤로 갈수록 가벼워지고, 원리금균등은 그대로다
  assert.ok(ep.lastPayment < ep.firstPayment);
  assert.ok(Math.abs(eq.lastPayment - eq.firstPayment) < 1e-6);
  // 만기일시는 마지막 달에 원금이 한꺼번에 붙는다
  assert.ok(Math.abs(bullet.lastPayment - (bullet.firstPayment + loan.principal)) < 1e-6);
});

test('만기일시 이자는 원금 × 이율 × 개월이다', () => {
  const b = schedule(loan, 'bullet');
  const want = loan.principal * monthlyRate(loan.annualRate) * loan.months;
  assert.ok(Math.abs(b.totalInterest - want) < 1e-6);
});

test('원금균등 이자는 한 달씩 세어 올린 값과 같다', () => {
  const s = schedule(loan, 'equal-principal');
  const part = loan.principal / loan.months;
  const i = monthlyRate(loan.annualRate);
  let sum = 0;
  let left = loan.principal;
  for (let m = 0; m < loan.months; m++) { sum += left * i; left -= part; }
  assert.ok(Math.abs(s.totalInterest - sum) < 1e-6);
  assert.ok(Math.abs(left) < 1e-6, '원금이 딱 떨어지지 않았다');
});

test('이율이 0이면 어느 방식이든 이자가 없다', () => {
  for (const m of ALL_METHODS) {
    const s = schedule({ ...loan, annualRate: 0 }, m.key);
    assert.ok(Math.abs(s.totalInterest) < 1e-6, m.label);
    assert.ok(Math.abs(s.totalPaid - loan.principal) < 1e-6, m.label);
  }
});

test('기간이 길수록 이자가 는다', () => {
  let prev = -1;
  for (const months of [12, 36, 60, 120, 240, 360]) {
    const t = schedule({ ...loan, months }, 'equal-payment').totalInterest;
    assert.ok(t > prev, `${months}개월에서 안 늘었다`);
    prev = t;
  }
  // 원금이 0이거나 기간이 0이면 조용히 0을 낸다
  assert.equal(schedule({ ...loan, months: 0 }, 'equal-payment').totalInterest, 0);
  assert.equal(schedule({ ...loan, principal: 0 }, 'bullet').totalInterest, 0);
});

/**
 * 원리금균등 식이 계산기 페이지에 다시 적혀 있지 않은가.
 *
 * 같은 식이 네 곳에 있었다 — loan·dsr·car-installment 페이지와 이 파일. 전부
 * 클라이언트 컴포넌트라 node가 못 불러오고, 그래서 이 파일의 검사가 닿지 않는
 * 자리였다. 값이 같을 때는 아무 일도 없지만, 페이지 쪽 사본 둘은 이율 0을
 * `!r`·`rate <= 0`으로 막아 무이자 할부에서 버튼이 죽어 있었다. equalPayment는
 * i === 0을 제대로 다룬다.
 */
test('계산기 페이지가 원리금균등 식을 다시 적지 않는다', () => {
  const dir = join(import.meta.dirname, '..', 'app/(ko)/calculator');
  const walk = (d: string, out: string[] = []): string[] => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p, out);
      else if (n.endsWith('.tsx')) out.push(p);
    }
    return out;
  };
  const files = walk(dir);
  assert.ok(files.length > 100, `${files.length}개만 훑었다 — 검사가 헛돈다`);

  const bad: string[] = [];
  for (const f of files) {
    const code = readFileSync(f, 'utf8').split('\n')
      .filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
    // A = P × i ÷ (1 − (1+i)^−n) 을 손으로 적은 꼴 — 두 가지 표기 다
    if (/1\s*-\s*Math\.pow\(1\s*\+\s*[^,]{1,30},\s*-/.test(code)
      || /Math\.pow\(1\s*\+\s*\w+\s*,\s*\w+\)\s*[-/]\s*\(?\s*Math\.pow\(1\s*\+/.test(code))
      bad.push(`/${f.slice(f.indexOf('app/'))}`);
  }
  assert.deepEqual(bad, [], `원리금균등 식이 페이지에 있다 — lib/loan-schedule.ts의 equalPayment를 쓰라:\n  ${bad.join('\n  ')}`);
});

test('이율 0에서도 상환액이 나온다', () => {
  // 무이자 할부. 페이지 사본들이 여기서 0을 falsy로 보고 계산을 건너뛰었다
  assert.equal(equalPayment(12_000_000, 0, 12), 1_000_000);
  assert.equal(schedule({ principal: 12_000_000, annualRate: 0, months: 12 }, 'equal-payment').totalInterest, 0);
});
