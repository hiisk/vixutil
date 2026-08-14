import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { equalPayment, schedule } from '../lib/loan-schedule.ts';
import {
  PRINCIPALS, RATES, TERMS,
  loanSlug, rateSlug, parseLoanSlug, allLoanCells, loanFacts, neighborLoans,
} from '../lib/loan-grid.ts';

/**
 * 대출 값 낱장의 셈.
 *
 * 가장 무서운 실수는 **격자가 상환 계산을 새로 쓰는 것**이다. 그러면 낱장과
 * 계산기가 다른 코드로 같은 답을 내다가 언젠가 갈라진다. 원본을 읽어 확인하고,
 * 값도 lib/loan-schedule.ts를 직접 불러 대조한다.
 */

test('격자가 상환 계산을 다시 쓰지 않고 불러 쓴다', () => {
  const src = readFileSync(new URL('../lib/loan-grid.ts', import.meta.url), 'utf8');
  assert.match(src, /import \{[^}]*compareAll[^}]*\} from '\.\/loan-schedule\.ts'/,
    'lib/loan-schedule.ts를 안 부른다 — 식을 새로 쓴 것이다');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/\*\*\s*-?months/.test(code), '원리금균등 식이 격자 안에 다시 적혀 있다');
});

test('주소 조각과 값이 서로의 역이다', () => {
  const cells = allLoanCells();
  assert.equal(cells.length, PRINCIPALS.length * RATES.length * TERMS.length);
  for (const c of cells) {
    const s = loanSlug(c.principal, c.rate, c.term);
    assert.match(s, /^\d+-\d+-\d+$/, `${s}가 주소로 못 쓸 꼴이다`);
    assert.deepEqual(parseLoanSlug(s), c, `${s}를 되돌리면 다르다`);
  }
  assert.equal(new Set(cells.map(c => loanSlug(c.principal, c.rate, c.term))).size, cells.length,
    '같은 주소가 두 번 있다');
});

test('소수 이율이 주소에서 안 뭉개진다', () => {
  /* 3.5%와 3%가 같은 주소가 되면 한 장이 사라진다 */
  assert.equal(rateSlug(3.5), 35);
  assert.equal(rateSlug(3), 30);
  assert.equal(new Set(RATES.map(rateSlug)).size, RATES.length, '이율 주소가 겹친다');
  assert.deepEqual(parseLoanSlug('10000-35-30'), { principal: 10000, rate: 3.5, term: 30 });
  assert.deepEqual(parseLoanSlug('10000-30-30'), { principal: 10000, rate: 3, term: 30 });
});

test('목록 밖과 이상한 꼴은 거른다', () => {
  for (const bad of ['', '10000', '10000-45', '10000-45-30-1', '10000-45-7', '10000-99-30',
    '9999-45-30', '010000-45-30', '10000-045-30', '10000-45-030', 'x-45-30', '10000-4.5-30']) {
    assert.equal(parseLoanSlug(bad), null, `"${bad}"가 통과했다`);
  }
  assert.deepEqual(parseLoanSlug('10000-45-30'), { principal: 10000, rate: 4.5, term: 30 });
});

test('낱장 값이 상환 계산기를 직접 부른 값과 같다', () => {
  for (const [p, r, t] of [[10000, 4.5, 30], [1000, 3, 5], [50000, 6, 35]] as const) {
    const f = loanFacts(p, r, t);
    assert.equal(f.monthly, equalPayment(p * 10_000, r, t * 12), `${p}-${r}-${t} 월 상환액이 다르다`);
    for (const s of f.schedules) {
      const direct = schedule({ principal: p * 10_000, annualRate: r, months: t * 12 }, s.method);
      assert.deepEqual(s, direct, `${p}-${r}-${t} ${s.method}이 계산기와 다르다`);
    }
  }
});

test('세 방식의 순서가 늘 같다 — 원금균등이 가장 싸고 만기일시가 가장 비싸다', () => {
  /*
   * 총이자는 원금이 얼마나 빨리 줄어드느냐로 정해진다. 이 순서가 뒤집히면
   * 어느 방식의 식이 틀린 것이다. 격자 전부를 돌려 본다.
   */
  for (const c of allLoanCells()) {
    const f = loanFacts(c.principal, c.rate, c.term);
    assert.equal(f.cheapest.method, 'equal-principal',
      `${loanSlug(c.principal, c.rate, c.term)}: 가장 싼 것이 원금균등이 아니다`);
    assert.equal(f.dearest.method, 'bullet',
      `${loanSlug(c.principal, c.rate, c.term)}: 가장 비싼 것이 만기일시가 아니다`);
    assert.ok(f.spread > 0, '세 방식의 이자가 같다 — 낱장이 할 말이 없다');
  }
});

test('원금균등은 첫 달이 가장 무겁다 — 맞바꿈이 실제로 있다', () => {
  const f = loanFacts(10000, 4.5, 30);
  const ep = f.schedules.find(s => s.method === 'equal-payment')!;
  const epr = f.schedules.find(s => s.method === 'equal-principal')!;
  assert.ok(epr.firstPayment > ep.firstPayment, '원금균등 첫 달이 원리금균등보다 가볍다');
  assert.ok(epr.lastPayment < ep.lastPayment, '원금균등 마지막 달이 더 무겁다');
  assert.ok(epr.totalInterest < ep.totalInterest, '원금균등 총이자가 더 많다');
});

test('총이자가 이율·기간에 대해 단조증가한다', () => {
  for (const t of TERMS) {
    let prev = -1;
    for (const r of RATES) {
      const v = loanFacts(10000, r, t).schedules[0].totalInterest;
      assert.ok(v > prev, `${t}년: 이율 ${r}%에서 이자가 안 늘었다`);
      prev = v;
    }
  }
  for (const r of RATES) {
    let prev = -1;
    for (const t of TERMS) {
      const v = loanFacts(10000, r, t).schedules[0].totalInterest;
      assert.ok(v > prev, `이율 ${r}%: ${t}년에서 이자가 안 늘었다`);
      prev = v;
    }
  }
});

test('총이자가 원금에 정비례한다', () => {
  /* 원금만 두 배면 이자도 정확히 두 배다. 아니면 어딘가 상수가 섞인 것이다 */
  const a = loanFacts(1000, 4.5, 30).schedules[0].totalInterest;
  const b = loanFacts(2000, 4.5, 30).schedules[0].totalInterest;
  assert.ok(Math.abs(b / a - 2) < 1e-9, `원금 두 배에 이자가 ${b / a}배다`);
});

test('이웃이 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map<string, number>(
    allLoanCells().map(c => [loanSlug(c.principal, c.rate, c.term), 0]),
  );
  for (const c of allLoanCells()) {
    const self = loanSlug(c.principal, c.rate, c.term);
    for (const n of neighborLoans(c.principal, c.rate, c.term)) {
      const k = loanSlug(n.principal, n.rate, n.term);
      assert.ok(inbound.has(k), `${self}의 이웃 ${k}가 목록 밖이다`);
      assert.notEqual(k, self, `${self}가 자기 자신을 이웃으로 든다`);
      inbound.set(k, inbound.get(k)! + 1);
    }
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([k]) => k);
  assert.deepEqual(orphans, [], `들어오는 링크가 0인 낱장 ${orphans.length}개`);
});

test('낱장마다 본문이 다르다', () => {
  const seen = new Map<string, string>();
  for (const c of allLoanCells()) {
    const f = loanFacts(c.principal, c.rate, c.term);
    const body = f.schedules.map(s => `${s.firstPayment}/${s.totalInterest}`).join('|');
    const self = loanSlug(c.principal, c.rate, c.term);
    assert.equal(seen.get(body), undefined, `${self}와 ${seen.get(body)}의 본문이 같다`);
    seen.set(body, self);
  }
});

test('오늘 날짜에 기대지 않는다', () => {
  const src = readFileSync(new URL('../lib/loan-grid.ts', import.meta.url), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.ok(!/new Date\(|Date\.now\(/.test(src), '날짜에 기대는 값이 있다');
});
