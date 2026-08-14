import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { calcSeverance, threeMonthDays } from '../lib/severance.ts';
import {
  WAGES, YEARS, REF_YEAR,
  severanceSlug, parseSeveranceSlug, allSeveranceCells,
  severanceFacts, neighborCells,
} from '../lib/severance-grid.ts';

/**
 * 퇴직금 값 낱장의 셈.
 *
 * 여기서 가장 무서운 실수는 **격자가 계산기를 안 쓰고 제 식을 새로 쓰는 것**이다.
 * 그러면 요율·규칙이 두 곳이 되고 한쪽만 고쳐진다 — 이 저장소가 이미 겪었다.
 * 그래서 원본을 읽어 import를 확인하고, 값도 계산기를 직접 불러 대조한다.
 */

test('격자가 계산기를 다시 쓰지 않고 불러 쓴다', () => {
  const src = readFileSync(new URL('../lib/severance-grid.ts', import.meta.url), 'utf8');
  assert.match(src, /import \{[^}]*calcSeverance[^}]*\} from '\.\/severance\.ts'/,
    'lib/severance.ts의 calcSeverance를 안 부른다 — 식을 새로 쓴 것이다');
  assert.ok(!/\*\s*30\s*\*/.test(src.replace(/\/\*[\s\S]*?\*\//g, '')),
    '퇴직금 식(× 30)이 격자 안에 다시 적혀 있다');
});

test('주소 조각과 값이 서로의 역이다', () => {
  for (const { wage, years } of allSeveranceCells()) {
    const s = severanceSlug(wage, years);
    assert.match(s, /^\d+-\d+$/, `${s}가 주소로 못 쓸 꼴이다`);
    assert.deepEqual(parseSeveranceSlug(s), { wage, years });
  }
  assert.equal(allSeveranceCells().length, WAGES.length * YEARS.length);
  assert.equal(new Set(allSeveranceCells().map(c => severanceSlug(c.wage, c.years))).size,
    WAGES.length * YEARS.length, '같은 주소가 두 번 있다');
});

test('목록 밖과 이상한 꼴은 거른다', () => {
  for (const bad of ['', '300', '300-', '-5', '300-5-1', '205-5', '300-9', '300-0',
    '0300-5', '300-05', 'abc-5', '300-x', '1000-5', '190-5']) {
    assert.equal(parseSeveranceSlug(bad), null, `"${bad}"가 통과했다`);
  }
  /* 앞자리 0을 막는 것이 핵심이다 — 통과하면 같은 장이 두 주소가 된다 */
  assert.equal(parseSeveranceSlug('0300-5'), null);
  assert.deepEqual(parseSeveranceSlug('300-5'), { wage: 300, years: 5 });
});

test('3개월 일수가 말일에 안 무너진다', () => {
  /*
   * setMonth로만 빼면 5/31 → 2/31 → 3/3이 되어 89일이 나온다. 실제는 92일이다.
   * 밖에서 셀 수 있는 값으로 못 박는다.
   */
  assert.equal(threeMonthDays(new Date(2026, 4, 31)), 92);   // 5/31 ← 2/28
  assert.equal(threeMonthDays(new Date(2026, 11, 31)), 92);  // 12/31 ← 9/30
  assert.equal(threeMonthDays(new Date(2026, 2, 31)), 90);   // 3/31 ← 12/31
  assert.equal(threeMonthDays(new Date(2026, 3, 30)), 90);   // 4/30 ← 1/30
  /* 어느 날이든 89~92 안이다 */
  for (let m = 0; m < 12; m++) {
    for (const d of [1, 15, 28, 30, 31]) {
      const end = new Date(2026, m, d);
      if (end.getMonth() !== m) continue;                    // 없는 날(2/30 등)
      const n = threeMonthDays(end);
      assert.ok(n >= 89 && n <= 92, `${end.toDateString()}: ${n}일`);
    }
  }
});

test('낱장 값이 계산기를 직접 부른 값과 같다', () => {
  for (const [wage, years] of [[300, 5], [200, 1], [600, 20], [450, 12]] as const) {
    const f = severanceFacts(wage, years);
    const end = new Date(REF_YEAR, 12, 0);
    const direct = calcSeverance({
      startDate: new Date(end.getTime() - years * 365 * 86400000), endDate: end,
      wage1: wage * 10_000, wage2: wage * 10_000, wage3: wage * 10_000,
      annualBonus: 0, annualLeavePay: 0, monthlyStdWage: 0,
    });
    assert.equal(f.pay, direct.severancePay, `${wage}-${years}가 계산기와 다르다`);
    assert.equal(f.totalDays, years * 365);
  }
});

test('퇴직월에 따른 폭이 실제로 있고 방향이 맞다', () => {
  /*
   * 3개월 일수가 적을수록 1일 평균임금이 커지고 퇴직금이 많아진다.
   * 폭이 0이면 낱장이 할 말이 없다는 뜻이라 그것도 본다.
   */
  const f = severanceFacts(300, 5);
  assert.ok(f.max.pay > f.min.pay, '퇴직월에 따른 차이가 없다');
  assert.ok(f.max.days < f.min.days, '일수가 적은 달이 더 많이 받아야 한다');
  assert.ok(f.min.pay <= f.pay && f.pay <= f.max.pay, '대표값이 폭 밖에 있다');
  /* 89일 대 92일이면 3.4% 안쪽이다 */
  assert.ok(f.max.pay / f.min.pay < 1.04, `폭이 ${f.max.pay / f.min.pay}배로 너무 크다`);
  assert.deepEqual([f.min.days, f.max.days], [92, 90], '말일 퇴직의 3개월 일수가 90·92가 아니다');
});

test('"월급 × 근속연수"라는 어림값이 실제로 어긋난다', () => {
  /* 이 낱장이 알려주는 것이 그 차이다 — 0이면 쓸 말이 없다 */
  for (const { wage, years } of allSeveranceCells()) {
    const f = severanceFacts(wage, years);
    assert.notEqual(f.naiveGap, 0, `${wage}-${years}: 어림값과 정확히 같다`);
    assert.ok(Math.abs(f.naiveGap) < wage * 10_000 * years * 0.05,
      `${wage}-${years}: 어림값과 5% 넘게 벌어진다 — 식이 틀렸을 것이다`);
  }
});

test('퇴직금이 월급·근속에 대해 단조증가한다', () => {
  for (const y of YEARS) {
    let prev = 0;
    for (const w of WAGES) {
      const p = severanceFacts(w, y).pay;
      assert.ok(p > prev, `근속 ${y}년: 월급 ${w}에서 퇴직금이 안 늘었다`);
      prev = p;
    }
  }
  for (const w of [200, 400, 600]) {
    let prev = 0;
    for (const y of YEARS) {
      const p = severanceFacts(w, y).pay;
      assert.ok(p > prev, `월급 ${w}: 근속 ${y}년에서 퇴직금이 안 늘었다`);
      prev = p;
    }
  }
});

test('이웃이 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map<string, number>(
    allSeveranceCells().map(c => [severanceSlug(c.wage, c.years), 0]),
  );
  for (const c of allSeveranceCells()) {
    const self = severanceSlug(c.wage, c.years);
    for (const n of neighborCells(c.wage, c.years)) {
      const k = severanceSlug(n.wage, n.years);
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
  for (const c of allSeveranceCells()) {
    const f = severanceFacts(c.wage, c.years);
    /* 월급 × 근속이 같으면 퇴직금도 같다(280-3 = 210-4). 그래서 근속별 표까지
       넣어 본다 — 낱장이 실제로 다른 것을 보여주는지가 여기서 갈린다. */
    const body = [f.pay, f.min.pay, f.max.pay, f.naiveGap,
      f.yearsTable.map(r => r.pay).join(',')].join('|');
    const self = severanceSlug(c.wage, c.years);
    assert.equal(seen.get(body), undefined, `${self}와 ${seen.get(body)}의 본문이 같다`);
    seen.set(body, self);
  }
});

test('오늘 날짜에 기대지 않는다', () => {
  const src = readFileSync(new URL('../lib/severance-grid.ts', import.meta.url), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.ok(!/new Date\(\s*\)/.test(src), 'new Date()가 있다 — 여는 날마다 답이 달라진다');
  assert.ok(!/Date\.now\(\)/.test(src), 'Date.now()가 있다');
  assert.equal(severanceFacts(300, 5).pay, severanceFacts(300, 5).pay);
});
