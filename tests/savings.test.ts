/**
 * 적금 만기 금액 — 닫힌 식을 하나씩 더한 값으로 되짚는다.
 *
 * ── 왜 이 검사가 뒤늦게 생겼나 (2026-08-12) ─────────────────
 * 이 셈은 `app/(ko)/calculator/savings/page.tsx` 본문에 박혀 있었다. 클라이언트
 * 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 그 파일을 보지 못했다.**
 *
 * 같은 날 취득세 계산기에서 정확히 그 구조 때문에 100배 버그가 검사 3,013개를
 * 통과했다 — 산식의 나눗수를 3억이 아니라 300만으로 적어 7억 주택의 취득세를
 * 32억으로 내고 있었다. 이 파일은 아직 틀리지 않았지만 같은 자리에 있었다.
 *
 * ── 이 검사가 지키는 것 ───────────────────────────────────
 * 닫힌 식 n(n+1)/2 는 그것만 두면 맞는지 확인할 상대가 없다. 그래서 회차마다
 * 예치 개월을 **하나씩 더한 값**과 맞대어 본다. 그리고 세율을 이 파일에 적지
 * 않고 lib/interest-tax.ts에서 가져오는지도 원문으로 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { calcSavings, depositMonths, equivalentDepositRate } from '../lib/savings.ts';
import { WITHHOLDING_RATE } from '../lib/interest-tax.ts';

const ROOT = join(import.meta.dirname, '..');

test('예치 개월의 합을 하나씩 더한 값과 맞댄다', () => {
  /* 닫힌 식이 맞는지 확인할 상대를 만든다 — 이것이 이 검사의 뼈대다 */
  for (const n of [0, 1, 2, 3, 12, 24, 36, 60, 120]) {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    assert.equal(depositMonths(n), sum, `${n}개월에서 어긋났다`);
  }
});

test('이자는 회차마다 예치 기간이 다른 것을 그대로 센다', () => {
  /*
   * 월 50만원 · 연 4% · 24개월. 회차마다 남은 개월을 세어 이자를 직접 쌓고
   * 닫힌 식과 맞댄다. 식을 옮겨 적은 것이 아니라 정의로 되짚는 것이다.
   */
  const monthly = 500_000, annualRate = 4, months = 24;
  const monthRate = annualRate / 100 / 12;
  let byHand = 0;
  for (let i = 1; i <= months; i++) byHand += monthly * (months - i + 1) * monthRate;

  const r = calcSavings({ monthly, annualRate, months });
  assert.ok(Math.abs(r.interest - byHand) < 1e-6, `${r.interest} vs ${byHand}`);
  assert.equal(r.principal, monthly * months);
});

test('같은 금리 예금의 절반 남짓이다', () => {
  /*
   * 광고 금리가 틀린 것이 아니라 돈이 계좌에 머문 기간이 짧다는 것. 12개월이면
   * 예치 개월의 합이 78이고 예금이라면 12 × 12 = 144이므로 78/144 ≈ 54%다.
   * 이 비가 실제로 나오는지 본다 — 안 나오면 식이 예금 쪽으로 새 것이다.
   */
  const monthly = 1_000_000, annualRate = 5;
  for (const months of [12, 24, 36]) {
    const r = calcSavings({ monthly, annualRate, months });
    const asDeposit = monthly * months * (annualRate / 100) * (months / 12);
    const ratio = r.interest / asDeposit;
    const want = depositMonths(months) / (months * months);
    assert.ok(Math.abs(ratio - want) < 1e-9, `${months}개월: ${ratio} vs ${want}`);
    assert.ok(ratio > 0.5 && ratio < 0.6, `${months}개월에서 비가 ${ratio}다`);
  }
});

test('이자소득세는 lib/interest-tax의 요율을 쓴다', () => {
  const r = calcSavings({ monthly: 300_000, annualRate: 3, months: 36 });
  assert.ok(Math.abs(r.tax - r.interest * WITHHOLDING_RATE) < 1e-9);
  assert.ok(Math.abs(r.total - (r.principal + r.interest - r.tax)) < 1e-9);
});

test('세율을 적금 파일에 다시 적지 않았다', () => {
  /*
   * 15.4%를 두 곳에 적으면 세법이 바뀔 때 한쪽만 고쳐진다. 값이 맞아도 복사는
   * 막아야 하므로 원문을 본다 — 페이지에 박혀 있던 0.154가 되살아나는 것도
   * 이 검사가 잡는다.
   */
  const lib = readFileSync(join(ROOT, 'lib', 'savings.ts'), 'utf8');
  assert.ok(!lib.includes('0.154'), 'lib/savings.ts에 세율이 직접 적혀 있다');
  assert.match(lib, /WITHHOLDING_RATE/, 'lib/savings.ts가 요율을 안 가져온다');

  /*
   * 페이지 쪽은 **코드에서** 세율이 되살아나는 것만 본다. 화면 문구의 "15.4%"와
   * 옮긴 내력을 적은 주석의 0.154는 사람이 읽을 글이라 남아야 한다.
   *
   * 처음에 원문 전체에서 '0.154'를 찾았더니 내가 방금 적은 주석에 걸렸다 —
   * 검사가 제 꼬리를 문 것이라 코드 줄만 보도록 좁혔다.
   */
  const page = readFileSync(join(ROOT, 'app', '(ko)', 'calculator', 'savings', 'page.tsx'), 'utf8');
  const codeLines = page
    .split('\n')
    .filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l))   // 주석 줄을 걷어낸다
    .join('\n');
  assert.ok(!/[^.\d]0\.154/.test(codeLines), '페이지 코드에 세율이 되살아났다');
  assert.ok(!/\(n \+ 1\) \/ 2/.test(codeLines), '페이지에 이자 식이 되살아났다');
  assert.match(page, /calcSavings/, '페이지가 lib을 안 쓴다');
});

test('금액과 기간에 대해 1차·2차식이다', () => {
  const base = { monthly: 100_000, annualRate: 4, months: 12 };
  const twice = calcSavings({ ...base, monthly: 200_000 });
  const once = calcSavings(base);
  assert.ok(Math.abs(twice.interest / once.interest - 2) < 1e-9, '납입액에 비례하지 않는다');

  // 기간은 n(n+1)/2 이므로 두 배가 되면 이자는 두 배보다 많이 는다
  const longer = calcSavings({ ...base, months: 24 });
  assert.ok(longer.interest / once.interest > 3.5, `기간 2배에 이자가 ${longer.interest / once.interest}배뿐`);
});

test('경계에서 무너지지 않는다', () => {
  for (const bad of [
    { monthly: 0, annualRate: 4, months: 12 },
    { monthly: 500_000, annualRate: 0, months: 12 },
    { monthly: 500_000, annualRate: 4, months: 0 },
    { monthly: -100, annualRate: -4, months: -12 },
  ]) {
    const r = calcSavings(bad);
    for (const [k, v] of Object.entries(r)) {
      assert.ok(Number.isFinite(v), `${JSON.stringify(bad)}: ${k}가 ${v}다`);
      assert.ok(v >= 0, `${JSON.stringify(bad)}: ${k}가 음수다`);
    }
  }
  assert.equal(depositMonths(0), 0);
  assert.equal(depositMonths(-5), 0);
});

test('같은 이자를 내는 예금 금리를 되짚는다', () => {
  /* 적금 4%가 예금 몇 %인가 — 되짚어 이자를 복원한다 */
  const input = { monthly: 500_000, annualRate: 4, months: 24 };
  const r = calcSavings(input);
  const eq = equivalentDepositRate(input);
  const asDeposit = r.principal * (eq / 100) * (input.months / 12);
  assert.ok(Math.abs(asDeposit - r.interest) < 1e-6, `${asDeposit} vs ${r.interest}`);
  // 적금 금리보다 낮아야 한다 — 돈이 절반쯤만 머물기 때문이다
  assert.ok(eq < input.annualRate, `환산 금리 ${eq}%가 적금 금리보다 크다`);
  assert.equal(equivalentDepositRate({ monthly: 0, annualRate: 4, months: 0 }), 0);
});
