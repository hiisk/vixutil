import { test } from 'node:test';
import assert from 'node:assert/strict';

import { SALARIES, SALARY_COUNT, parseSalarySlug, resultFor, neighborSalaries } from '../lib/salary-grid.ts';
import { calcSalary } from '../lib/salary.ts';

/** 연봉 값 낱장 97장 — 계산은 lib/salary.ts가 하고 여기는 목록만 본다 */

test('연봉 목록이 2,400만~1억 2천만 100만 단위다', () => {
  assert.equal(SALARY_COUNT, 97);
  assert.equal(SALARIES[0], 2400);
  assert.equal(SALARIES.at(-1), 12000);
  for (let i = 1; i < SALARIES.length; i++) assert.equal(SALARIES[i] - SALARIES[i - 1], 100);
});

test('주소 조각을 되돌린다', () => {
  for (const v of SALARIES) assert.equal(parseSalarySlug(String(v)), v);
  for (const bad of ['', '2350', '99999', 'abc', '5000.5', '05000', '2400만']) {
    assert.equal(parseSalarySlug(bad), null, `"${bad}"가 통과했다`);
  }
});

test('계산을 다시 쓰지 않는다 — lib/salary.ts와 같은 값이다', () => {
  /* 값이 갈리면 계산기 페이지와 값 낱장이 다른 실수령액을 말한다 */
  for (const v of [2400, 5000, 8000, 12000]) {
    assert.deepEqual(resultFor(v), calcSalary(v * 10_000, 1, true), `연봉 ${v}만원`);
  }
});

test('연봉이 오르면 실수령액도 오른다', () => {
  /* 누진세가 꺾여도 실수령액 자체는 줄지 않는다 — 줄면 구간 계산이 틀린 것이다 */
  let prev = -1;
  for (const v of SALARIES) {
    const net = resultFor(v).netAnnual;
    assert.ok(net > prev, `연봉 ${v}만원에서 실수령액이 줄었다`);
    prev = net;
  }
});

test('공제율이 그럴듯한 범위다', () => {
  for (const v of SALARIES) {
    const r = resultFor(v);
    assert.ok(r.effectiveRate > 5 && r.effectiveRate < 45, `연봉 ${v}만원의 공제율 ${r.effectiveRate}`);
    assert.ok(r.netMonthly > 0 && r.netMonthly < r.monthly, `연봉 ${v}만원의 실수령액이 이상하다`);
  }
});

test('이웃이 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map(SALARIES.map(v => [v, 0]));
  for (const v of SALARIES) {
    for (const n of neighborSalaries(v)) {
      assert.notEqual(n, v, `${v}가 자기를 이웃으로 든다`);
      inbound.set(n, (inbound.get(n) ?? 0) + 1);
    }
  }
  assert.deepEqual([...inbound].filter(([, n]) => n === 0).map(([v]) => v), []);
});
