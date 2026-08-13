import { test } from 'node:test';
import assert from 'node:assert/strict';

import { PAY, SAVINGS_MAX, rankMonths, totalPay, savings, BRANCHES } from '../lib/military-pay.ts';
import { RANKS } from '../lib/discharge.ts';

/**
 * 병사 봉급 계산기의 셈.
 *
 * 화면에서 눈으로 못 보는 것이 둘이다 — **계급이 바뀌는 달**과 **적금 이자**.
 * 둘 다 그럴듯한 값이 나오면 틀려도 모른다.
 */

test('계급별 개월이 복무기간을 정확히 채운다', () => {
  /* 남거나 모자라면 총액이 조용히 틀린다 */
  for (const b of BRANCHES) {
    const sum = rankMonths(b.months).reduce((s, r) => s + r.months, 0);
    assert.equal(sum, b.months, `${b.label}: 계급 개월 합이 ${sum}인데 복무는 ${b.months}개월`);
  }
});

test('복무가 길수록 병장 기간이 길다 — 진급 기간은 군별로 같다', () => {
  /*
   * 정기진급은 이병 2 · 일병 6 · 상병 6으로 군별로 같으므로, 남는 기간이
   * 그대로 병장 기간이 된다. 육군 18 → 4개월, 공군 21 → 7개월.
   * 이 성질이 깨지면 진급 기간을 군마다 다르게 잡은 것이다.
   */
  const fixed = RANKS.reduce((s, r) => s + r.months, 0);   // 14
  for (const b of BRANCHES) {
    const last = rankMonths(b.months).at(-1)!;
    assert.equal(last.rank, '병장', `${b.label}의 마지막 계급이 병장이 아니다`);
    assert.equal(last.months, b.months - fixed, `${b.label} 병장 기간`);
  }
  assert.equal(rankMonths(18).at(-1)!.months, 4, '육군 병장은 4개월이다');
  assert.equal(rankMonths(21).at(-1)!.months, 7, '공군 병장은 7개월이다');
});

test('육군 18개월 총 봉급이 봉급표와 맞는다', () => {
  /*
   * 2 × 75만 + 6 × 90만 + 6 × 120만 + 4 × 150만 = 2,010만 원.
   * 손으로 한 번 더 셈해 못 박는다 — 함수를 돌려 답을 베끼면 검사가 함수를 따라간다.
   */
  assert.equal(totalPay(18), 20_100_000);
  assert.equal(totalPay(20), 20_100_000 + 2 * PAY.병장);   // 해군은 병장이 두 달 더
  assert.equal(totalPay(21), 20_100_000 + 3 * PAY.병장);   // 공군은 세 달 더
});

test('봉급이 계급 순서대로 오른다', () => {
  const order = ['이등병', '일병', '상병', '병장'];
  for (let i = 1; i < order.length; i++) {
    assert.ok(PAY[order[i]] > PAY[order[i - 1]], `${order[i]}가 ${order[i - 1]}보다 적다`);
  }
});

test('적금 이자는 단리 적금 공식이다 — 원금 × 이율로 셈하면 두 배가 된다', () => {
  /*
   * 매달 같은 돈을 넣으면 첫 달 돈만 n달을 놓이고 마지막 달 돈은 한 달만 놓인다.
   * 그래서 이자는 월납입액 × 월이율 × n(n+1)/2 이다.
   *
   * 흔한 실수는 원금 전체에 기간을 곱하는 것이다(= 월납입액 × 월이율 × n²).
   * n이 클수록 거의 두 배가 되므로, 그 값과 **다르다**는 것까지 본다.
   */
  const n = 18, m = 550_000, rate = 5;
  const got = savings(n, m, rate);
  const expect = Math.round((m * (rate / 100 / 12) * (n * (n + 1))) / 2);
  assert.equal(got.interest, expect);

  const naive = Math.round(m * n * (rate / 100 / 12) * n);
  assert.ok(got.interest < naive * 0.6, `단리 적금 이자가 원금×기간 셈과 비슷하다 — 공식이 틀렸다`);

  /* 손으로 한 번: 55만 × (5%/12) × 171 = 391,875원 */
  assert.equal(got.interest, 391_875);
});

test('원금과 매칭이 같다 — 정부가 100%를 얹는다', () => {
  const p = savings(18, SAVINGS_MAX, 5);
  assert.equal(p.principal, 18 * SAVINGS_MAX);
  assert.equal(p.match, p.principal);
  assert.equal(p.total, p.principal + p.match + p.interest);
  /* 18개월 꽉 채우면 원금 990만 + 매칭 990만 = 1,980만 원 */
  assert.equal(p.principal + p.match, 19_800_000);
});

test('이자율 0이면 이자도 0이고, 안 넣으면 아무것도 안 생긴다', () => {
  assert.equal(savings(18, SAVINGS_MAX, 0).interest, 0);
  const none = savings(18, 0, 5);
  assert.deepEqual(none, { principal: 0, match: 0, interest: 0, total: 0 });
  assert.equal(savings(0, SAVINGS_MAX, 5).total, 0);
});

test('복무가 짧으면 없는 계급을 만들지 않는다', () => {
  /* 이병 2 + 일병 6 = 8개월이면 상병·병장이 없어야 한다 */
  const short = rankMonths(8);
  assert.deepEqual(short.map(r => r.rank), ['이등병', '일병']);
  assert.equal(short.reduce((s, r) => s + r.months, 0), 8);
  /* 14개월이면 딱 상병까지 — 병장이 0개월로 들어오면 안 된다 */
  assert.deepEqual(rankMonths(14).map(r => r.rank), ['이등병', '일병', '상병']);
});
