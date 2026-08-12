/**
 * 상속세 — 금융재산공제의 계단과 배우자 법정상속분을 못 박는다.
 *
 * ── 무엇이 틀려 있었나 (2026-08-13) ───────────────────────
 * 셈이 클라이언트 페이지에 박혀 있어 검사가 보지 못했고, 흠이 셋 있었다.
 *
 *   ① 세율표가 증여세와 별개의 사본이었다 (같은 법의 같은 표다)
 *   ② 금융재산공제를 20%만 매겼다 — 실제 규칙은 계단이다.
 *      금융재산 1,000만원이면 전액 공제인데 200만원만 공제했다
 *   ③ 배우자 공제가 상속재산의 50%를 법정상속분으로 잡았다. 자녀가 하나면 60%,
 *      둘이면 42.9%, 셋이면 33.3%다 — 50%는 어느 경우에도 맞지 않는다
 *
 * ── 이 검사가 무엇을 상대로 두나 ───────────────────────────
 * ①은 두 파일의 표가 **같은 객체인지** 확인한다. 값을 비교하면 사본을 만들어도
 *    통과하므로 참조를 본다.
 * ②는 계단의 **평평한 칸**을 밟는다. 20%로 되돌리면 그 칸이 기울어져 걸린다.
 * ③은 이미 있는 상속 지분 lib(`spouseShareWithChildren`)을 상대로 둔다. 같은 값을
 *    두 곳에 적지 않는 것이 목적이므로, 검사도 그 함수를 부른다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BASIC_DEDUCTION, CHILD_DEDUCTION, FINANCIAL_MAX_DEDUCTION, LUMP_DEDUCTION,
  SELF_REPORT_CREDIT, SHARES_GIFT_BRACKETS, SPOUSE_MAX_DEDUCTION, SPOUSE_MIN_DEDUCTION,
  calcInheritanceTax, financialDeduction, spouseLegalShare,
} from '../lib/inheritance-tax.ts';
import { GIFT_BRACKETS, giftTaxOf } from '../lib/gift-tax.ts';
import { spouseShareWithChildren } from '../lib/inheritance-share.ts';

const ROOT = join(import.meta.dirname, '..');

test('세율표가 증여세와 같은 표다 — 사본이 아니다', () => {
  /*
   * 값을 비교하면 사본을 만들어도 통과한다. 그래서 **같은 객체인지**를 본다.
   * 상속세와 증여세는 같은 법의 같은 세율표라 사본이 있으면 한쪽만 개정된다.
   */
  assert.equal(SHARES_GIFT_BRACKETS, GIFT_BRACKETS, '세율표가 별개의 객체다 — 사본이 생겼다');
});

test('금융재산공제의 계단을 밟는다', () => {
  /*
   * 2천만원 이하는 전액, 2천만~1억은 2천만원으로 평평하고, 1억을 넘으면 20%다.
   * 20%만 매기는 옛 셈으로 되돌리면 평평한 칸이 기울어져 걸린다.
   */
  // 전액 구간
  for (const f of [0, 1_000_000, 10_000_000, 20_000_000]) {
    assert.equal(financialDeduction(f), f, `${f / 1e4}만원에서 전액이 아니다`);
  }
  // 평평한 구간 — 여기가 옛 셈과 갈리는 자리다
  for (const f of [20_000_001, 50_000_000, 99_999_999, 100_000_000]) {
    assert.equal(financialDeduction(f), 20_000_000, `${f / 1e4}만원에서 2천만원이 아니다`);
  }
  // 20% 구간
  assert.equal(financialDeduction(200_000_000), 40_000_000);
  assert.equal(financialDeduction(500_000_000), 100_000_000);
  // 한도
  assert.equal(financialDeduction(1_000_000_000), FINANCIAL_MAX_DEDUCTION);
  assert.equal(financialDeduction(10_000_000_000), FINANCIAL_MAX_DEDUCTION);

  /* 옛 셈(20%만)과 반드시 달라야 하는 자리 */
  const oldWay = (f: number) => Math.min(f * 0.2, FINANCIAL_MAX_DEDUCTION);
  for (const f of [10_000_000, 50_000_000]) {
    assert.notEqual(financialDeduction(f), oldWay(f), `${f / 1e4}만원에서 옛 셈과 같다`);
  }
  /* 금융재산이 늘 때 공제가 줄지 않는다 */
  let prev = -1;
  for (let f = 0; f <= 1_500_000_000; f += 1_000_000) {
    const now = financialDeduction(f);
    assert.ok(now >= prev, `${f}에서 공제가 줄었다`);
    prev = now;
  }
});

test('배우자 법정상속분을 상속 지분 lib에서 가져온다', () => {
  /*
   * 같은 값을 두 곳에 적지 않는 것이 목적이므로 검사도 그 함수를 상대로 둔다.
   * 50%를 박아 두면 자녀 수와 무관해져서 걸린다.
   */
  for (let n = 1; n <= 6; n++) {
    assert.equal(spouseLegalShare(n), spouseShareWithChildren(n), `자녀 ${n}명`);
  }
  /* 자녀가 없으면 배우자가 전부다 */
  assert.equal(spouseLegalShare(0), 1);

  /* 자녀가 늘면 배우자 몫이 줄어든다 — 50% 고정이면 이것이 깨진다 */
  for (let n = 1; n < 6; n++) {
    assert.ok(spouseLegalShare(n) > spouseLegalShare(n + 1), `자녀 ${n}→${n + 1}에서 안 줄었다`);
  }
  /* 널리 알려진 값 — 자녀 하나면 3/5, 둘이면 3/7 */
  assert.ok(Math.abs(spouseLegalShare(1) - 3 / 5) < 1e-12);
  assert.ok(Math.abs(spouseLegalShare(2) - 3 / 7) < 1e-12);
  /* 50%는 어느 자녀 수에서도 나오지 않는다 */
  for (let n = 1; n <= 10; n++) {
    assert.notEqual(spouseLegalShare(n), 0.5, `자녀 ${n}명에서 50%가 나왔다`);
  }
});

test('일괄공제와 기초+인적공제 가운데 큰 쪽을 쓴다', () => {
  /* 자녀가 적으면 일괄공제 5억이 이긴다 */
  for (let n = 0; n <= 10; n++) {
    const r = calcInheritanceTax({ estate: 2_000_000_000, children: n, hasSpouse: false });
    const personal = BASIC_DEDUCTION + n * CHILD_DEDUCTION;
    assert.equal(r.unifiedDeduction, Math.max(LUMP_DEDUCTION, personal), `자녀 ${n}명`);
    assert.equal(r.usedLump, LUMP_DEDUCTION >= personal);
  }
  /* 자녀 6명이면 2억 + 3억 = 5억으로 일괄공제와 같아지고, 7명부터 인적공제가 이긴다 */
  assert.equal(calcInheritanceTax({ estate: 2e9, children: 6, hasSpouse: false }).usedLump, true);
  assert.equal(calcInheritanceTax({ estate: 2e9, children: 7, hasSpouse: false }).usedLump, false);
});

test('배우자 공제에 최소 5억과 한도 30억이 함께 걸린다', () => {
  /* 상속재산이 작아도 5억은 보장된다 */
  const small = calcInheritanceTax({ estate: 300_000_000, children: 2 });
  assert.equal(small.spouseDeduction, SPOUSE_MIN_DEDUCTION);
  assert.equal(small.taxBase, 0, '10억 공제 아래인데 과세표준이 남았다');

  /* 아주 큰 상속재산에서는 30억에서 멈춘다 */
  const huge = calcInheritanceTax({ estate: 50_000_000_000, children: 2 });
  assert.equal(huge.spouseDeduction, SPOUSE_MAX_DEDUCTION);

  /* 배우자가 없으면 0이다 */
  assert.equal(calcInheritanceTax({ estate: 5e9, children: 2, hasSpouse: false }).spouseDeduction, 0);

  /* 실제 상속분을 넣으면 그것도 한도가 된다 */
  const actual = calcInheritanceTax({ estate: 10_000_000_000, children: 2, spouseActual: 1_000_000_000 });
  assert.equal(actual.spouseDeduction, 1_000_000_000);
  /* 실제 상속분이 5억보다 작아도 5억은 보장된다 */
  const tiny = calcInheritanceTax({ estate: 10_000_000_000, children: 2, spouseActual: 100_000_000 });
  assert.equal(tiny.spouseDeduction, SPOUSE_MIN_DEDUCTION);
});

test('공제 합계와 과세표준이 앞뒤가 맞는다', () => {
  for (const estate of [500_000_000, 2_000_000_000, 10_000_000_000]) {
    for (const children of [0, 1, 3]) {
      for (const hasSpouse of [true, false]) {
        const r = calcInheritanceTax({ estate, children, hasSpouse, financial: 80_000_000 });
        assert.equal(
          r.totalDeduction,
          r.unifiedDeduction + r.spouseDeduction + r.financialDeduction,
          `${estate}/${children}/${hasSpouse}: 공제 합계가 안 맞는다`,
        );
        assert.equal(r.taxBase, Math.max(0, estate - r.totalDeduction));
        assert.equal(r.tax, giftTaxOf(r.taxBase), '세율표가 증여세와 갈렸다');
        assert.ok(Math.abs(r.payable - (r.tax - r.reportCredit)) < 1e-9);
      }
    }
  }
});

test('신고세액공제는 산출세액의 3%다', () => {
  const r = calcInheritanceTax({ estate: 5_000_000_000, children: 2, selfReport: true });
  assert.ok(r.tax > 0, '세금이 안 나왔다 — 입력을 잘못 잡았다');
  assert.ok(Math.abs(r.reportCredit - r.tax * SELF_REPORT_CREDIT) < 1e-9);
  const no = calcInheritanceTax({ estate: 5_000_000_000, children: 2, selfReport: false });
  assert.equal(no.reportCredit, 0);
  assert.equal(no.tax, r.tax, '신고 여부가 산출세액을 바꿨다');
});

test('상속재산이 늘면 세금이 줄지 않는다', () => {
  for (const children of [0, 2, 4]) {
    for (const hasSpouse of [true, false]) {
      let prev = -1;
      for (let e = 0; e <= 20_000_000_000; e += 100_000_000) {
        const now = calcInheritanceTax({ estate: e, children, hasSpouse }).payable;
        assert.ok(now >= prev - 1e-6, `자녀${children}/배우자${hasSpouse}: ${e / 1e8}억에서 줄었다`);
        prev = now;
      }
    }
  }
});

test('경계에서 무너지지 않는다', () => {
  for (const input of [
    { estate: 0 },
    { estate: -100, children: -1 },
    { estate: 1_000_000_000, children: 0, hasSpouse: false, financial: -5 },
    { estate: 1, children: 100 },
  ]) {
    const r = calcInheritanceTax(input);
    for (const [k, v] of Object.entries(r)) {
      if (typeof v !== 'number') continue;
      assert.ok(Number.isFinite(v), `${JSON.stringify(input)}: ${k}가 ${v}다`);
      assert.ok(v >= 0, `${JSON.stringify(input)}: ${k}가 음수다`);
    }
  }
  assert.equal(calcInheritanceTax({ estate: 0 }).effectiveRate, 0);
});

test('페이지에 세율표와 공제 셈이 되살아나지 않았다', () => {
  const page = readFileSync(
    join(ROOT, 'app', '(ko)', 'calculator', 'inheritance-tax', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/inheritance-tax'/, '페이지가 lib을 안 쓴다');
  assert.match(page, /calcInheritanceTax/, '페이지가 lib 함수를 안 부른다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/deduct: \d/.test(code), '페이지에 누진공제액이 되살아났다');
  assert.ok(!/e \* 0\.5/.test(code), '페이지에 배우자 50% 어림이 되살아났다');
  assert.ok(!/\* 0\.2, 200_000_000/.test(code), '페이지에 금융재산공제 20%가 되살아났다');
});
