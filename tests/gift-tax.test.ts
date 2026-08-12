/**
 * 증여세 — 누진공제액을 초과누진으로 되짚고, 기납부세액 공제를 못 박는다.
 *
 * ── 무엇이 틀려 있었나 (2026-08-13) ───────────────────────
 * 10년 내 사전증여를 합산하면서 **이미 낸 세금을 공제하지 않았다.** 화면에
 * 사전증여 칸이 있어서 사람들이 실제로 그 값을 넣는데, 넣는 순간 세금이 부풀었다.
 *
 *   3억 + 사전증여 3억 → 화면 1억 500만원, 옳게는 6,500만원 (4,000만원 과다)
 *
 * ── 이 검사가 무엇을 상대로 두나 ───────────────────────────
 * ① **누진공제액을 초과누진으로 되짚는다.** 세액을 `과세표준 × 세율 − 누진공제액`
 *    으로 내는 것은 초과누진과 같은 값이어야 하는데, 그것은 누진공제액이 맞을
 *    때만 참이다. 표를 옮겨 적는 대신 구간을 하나씩 더한 값과 맞댄다 — 누진공제액
 *    한 자리가 틀리면 갈라진다. 이것이 이 검사의 뼈대다.
 * ② **기납부세액 공제를 되짚는다.** 사전증여를 쪼개 두 번 받은 사람과 한 번에
 *    받은 사람의 세금 총액이 같아야 한다 — 그것이 합산과세의 취지다.
 * ③ 경계에서 절벽이 없다. 누진공제 방식은 경계에서 두 구간이 같은 값을 내므로
 *    `<=`든 `<`든 어긋나지 않는데, 그 사실 자체를 검사가 지킨다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  GIFT_BRACKETS, MARRIAGE_BIRTH_DEDUCTION, RELATION_DEDUCTION, SELF_REPORT_CREDIT,
  calcGiftTax, giftTaxOf, type Relation,
} from '../lib/gift-tax.ts';

const ROOT = join(import.meta.dirname, '..');
const RELATIONS = Object.keys(RELATION_DEDUCTION) as Relation[];

test('누진공제액이 초과누진과 같은 값을 낸다', () => {
  /*
   * 이것이 이 검사의 본체다. 구간을 하나씩 훑어 더한 값(초과누진)을 상대로 두고
   * 누진공제 방식과 맞댄다. 누진공제액 한 자리가 틀리면 여기서 갈라진다.
   */
  const byBracket = (base: number) => {
    if (base <= 0) return 0;
    let tax = 0;
    let prev = 0;
    for (const { limit, rate } of GIFT_BRACKETS) {
      tax += (Math.min(base, limit) - prev) * rate;
      if (base <= limit) break;
      prev = limit;
    }
    return tax;
  };

  for (let base = 0; base <= 6_000_000_000; base += 10_000_000) {
    assert.ok(Math.abs(giftTaxOf(base) - byBracket(base)) < 1e-6,
      `과세표준 ${base / 1e8}억: 누진공제 ${giftTaxOf(base)} vs 초과누진 ${byBracket(base)}`);
  }
  /* 경계를 정확히 밟는다 */
  for (const { limit } of GIFT_BRACKETS) {
    if (!Number.isFinite(limit)) continue;
    for (const at of [limit - 1, limit, limit + 1]) {
      assert.ok(Math.abs(giftTaxOf(at) - byBracket(at)) < 1e-6, `${at}에서 갈렸다`);
    }
  }
});

test('경계에서 세금이 튀지 않는다', () => {
  /* 누진공제 방식이라 경계에서 두 구간이 같은 값을 낸다 — 절벽이 없어야 한다 */
  for (const { limit } of GIFT_BRACKETS) {
    if (!Number.isFinite(limit)) continue;
    const jump = giftTaxOf(limit + 1) - giftTaxOf(limit);
    assert.ok(jump >= 0 && jump < 1, `${limit / 1e8}억에서 ${jump}원 뛰었다`);
  }
  assert.equal(giftTaxOf(0), 0);
  assert.equal(giftTaxOf(-1), 0);
});

test('널리 셈할 수 있는 세액과 맞댄다', () => {
  /* 바깥에서 손으로 셈한 값이다 */
  assert.equal(giftTaxOf(100_000_000), 10_000_000);            // 1억 × 10%
  assert.equal(giftTaxOf(500_000_000), 90_000_000);            // 5억 × 20% − 1,000만
  assert.equal(giftTaxOf(1_000_000_000), 240_000_000);         // 10억 × 30% − 6,000만
  assert.equal(giftTaxOf(3_000_000_000), 1_040_000_000);       // 30억 × 40% − 1.6억

  /* 성인 자녀가 1억을 받으면 공제 5,000만 → 과세표준 5,000만 → 500만원 */
  const r = calcGiftTax({ amount: 100_000_000, relation: 'parent-adult', selfReport: false });
  assert.equal(r.taxBase, 50_000_000);
  assert.equal(r.tax, 5_000_000);
});

test('사전증여를 쪼개 받아도 세금 총액이 같다', () => {
  /*
   * 합산과세의 취지가 이것이다 — 쪼개 받아 세율을 낮추는 것을 막는다. 그러니
   * 한 번에 받은 사람과 두 번에 나눠 받은 사람의 **총액이 같아야 한다.**
   * 기납부세액 공제가 빠지면 나눠 받은 쪽이 더 많이 내게 되어 여기서 걸린다.
   */
  for (const relation of RELATIONS) {
    for (const [first, second] of [
      [300_000_000, 300_000_000],
      [50_000_000, 950_000_000],
      [1_000_000_000, 2_000_000_000],
      [10_000_000, 10_000_000],
    ] as const) {
      const once = calcGiftTax({ amount: first + second, relation, selfReport: false });

      /* 나눠 받았을 때 — 먼저 낸 세액 + 이번 세액 */
      const firstOnly = calcGiftTax({ amount: first, relation, selfReport: false });
      const later = calcGiftTax({ amount: second, relation, priorAmount: first, selfReport: false });
      const split = firstOnly.tax + later.tax;

      assert.ok(Math.abs(once.tax - split) < 1,
        `${relation} ${first / 1e8}억+${second / 1e8}억: 한 번에 ${once.tax} vs 나눠서 ${split}`);
      /* 먼저 낸 세액이 그대로 공제됐는지 되짚는다 */
      assert.ok(Math.abs(later.priorTaxCredit - firstOnly.tax) < 1,
        `${relation}: 기납부세액 공제가 먼저 낸 세액과 다르다`);
    }
  }
});

test('사전증여가 있으면 세금이 늘지만 두 번 물리지 않는다', () => {
  const base = calcGiftTax({ amount: 300_000_000, relation: 'parent-adult', selfReport: false });
  const withPrior = calcGiftTax({
    amount: 300_000_000, relation: 'parent-adult', priorAmount: 300_000_000, selfReport: false,
  });

  /* 합산하면 세율 구간이 올라가므로 이번 세액이 늘어야 한다 */
  assert.ok(withPrior.tax > base.tax, '사전증여를 합산하지 않았다');
  /* 그래도 합산 산출세액 전부를 물리지는 않는다 — 그것이 옛 버그였다 */
  assert.ok(withPrior.tax < withPrior.grossTax, '합산 세액을 통째로 물렸다 — 기납부세액 공제가 없다');
  assert.ok(withPrior.priorTaxCredit > 0, '기납부세액 공제가 0이다');

  /* 손으로 셈해 둔다: 합산 6억 − 공제 5천만 = 5.5억 → 1억 500만, 사전분 4,000만 */
  assert.equal(withPrior.grossTax, 105_000_000);
  assert.equal(withPrior.priorTaxCredit, 40_000_000);
  assert.equal(withPrior.tax, 65_000_000);
});

test('증여재산공제액이 공표된 금액과 같다', () => {
  /*
   * 이 검사는 **일부러 표를 옮겨 적는다.** 다른 검사들은 모두 `RELATION_DEDUCTION`을
   * 기준으로 삼기 때문에, 그 상수를 몰래 고치면 검사와 코드가 나란히 바뀌어
   * 아무것도 걸리지 않는다. 실제로 배우자 공제를 6억에서 5억으로 바꿔 봤더니
   * 검사 열한 개가 전부 통과했다 — 그래서 이 검사를 나중에 더했다.
   *
   * 공제액에는 되짚을 규칙이 없다(법이 정한 금액이다). 그러니 상대로 둘 수 있는
   * 것은 공표된 값 그 자체뿐이고, 두 곳에 적힌 값이 갈리는 순간 검사가 멈춘다.
   * **고치려면 두 곳을 함께 고쳐야 한다** — 그것이 이 중복의 목적이다.
   */
  assert.equal(RELATION_DEDUCTION['spouse'], 600_000_000, '배우자 공제');
  assert.equal(RELATION_DEDUCTION['parent-adult'], 50_000_000, '직계존속 → 성인 자녀');
  assert.equal(RELATION_DEDUCTION['parent-minor'], 20_000_000, '직계존속 → 미성년 자녀');
  assert.equal(RELATION_DEDUCTION['child'], 50_000_000, '직계비속 → 부모');
  assert.equal(RELATION_DEDUCTION['other-kin'], 10_000_000, '기타 친족');
  assert.equal(RELATION_DEDUCTION['other'], 0, '타인');
  assert.equal(MARRIAGE_BIRTH_DEDUCTION, 100_000_000, '혼인·출산 공제');
  assert.equal(SELF_REPORT_CREDIT, 0.03, '신고세액공제');

  /* 순서도 지킨다 — 가까운 사이일수록 공제가 크거나 같다 */
  assert.ok(RELATION_DEDUCTION['spouse'] > RELATION_DEDUCTION['parent-adult']);
  assert.ok(RELATION_DEDUCTION['parent-adult'] > RELATION_DEDUCTION['parent-minor']);
  assert.ok(RELATION_DEDUCTION['parent-minor'] > RELATION_DEDUCTION['other-kin']);
  assert.ok(RELATION_DEDUCTION['other-kin'] > RELATION_DEDUCTION['other']);

  /* 세율표도 같은 이유로 못 박는다 */
  assert.deepStrictEqual(GIFT_BRACKETS.map(b => b.rate), [0.1, 0.2, 0.3, 0.4, 0.5]);
  assert.deepStrictEqual(
    GIFT_BRACKETS.map(b => b.limit),
    [100_000_000, 500_000_000, 1_000_000_000, 3_000_000_000, Infinity],
  );
});

test('공제 안에서는 세금이 0이다', () => {
  for (const relation of RELATIONS) {
    const limit = RELATION_DEDUCTION[relation];
    if (limit === 0) continue;
    const inside = calcGiftTax({ amount: limit, relation });
    assert.equal(inside.taxBase, 0, `${relation}: 공제액만큼 받았는데 과세표준이 있다`);
    assert.equal(inside.payable, 0);

    /* 1원만 넘으면 세금이 생긴다 */
    const over = calcGiftTax({ amount: limit + 10_000_000, relation, selfReport: false });
    assert.ok(over.payable > 0, `${relation}: 공제를 넘었는데 세금이 0이다`);
  }
  /* 타인은 공제가 없어 1원부터 과세표준이다 */
  assert.equal(calcGiftTax({ amount: 1_000_000, relation: 'other' }).taxBase, 1_000_000);
});

test('혼인·출산 공제는 관계별 공제에 더해진다', () => {
  const without = calcGiftTax({ amount: 200_000_000, relation: 'parent-adult', selfReport: false });
  const with_ = calcGiftTax({
    amount: 200_000_000, relation: 'parent-adult', marriageBirth: true, selfReport: false,
  });
  assert.equal(with_.deduction - without.deduction, MARRIAGE_BIRTH_DEDUCTION);
  assert.equal(with_.marriageBirthDeduction, MARRIAGE_BIRTH_DEDUCTION);
  assert.equal(without.marriageBirthDeduction, 0);
  assert.ok(with_.payable < without.payable, '공제를 더했는데 세금이 안 줄었다');

  /* 한도를 직접 넣을 수 있다 — 개정되면 화면에서 고친다 */
  const custom = calcGiftTax({
    amount: 200_000_000, relation: 'parent-adult', marriageBirth: true,
    marriageBirthLimit: 50_000_000, selfReport: false,
  });
  assert.equal(custom.marriageBirthDeduction, 50_000_000);
});

test('신고세액공제는 산출세액의 3%다', () => {
  const r = calcGiftTax({ amount: 1_000_000_000, relation: 'parent-adult', selfReport: true });
  assert.ok(Math.abs(r.reportCredit - r.tax * SELF_REPORT_CREDIT) < 1e-9);
  assert.ok(Math.abs(r.payable - (r.tax - r.reportCredit)) < 1e-9);

  const no = calcGiftTax({ amount: 1_000_000_000, relation: 'parent-adult', selfReport: false });
  assert.equal(no.reportCredit, 0);
  assert.equal(no.payable, no.tax);
  assert.equal(no.tax, r.tax, '신고 여부가 산출세액을 바꿨다');
  assert.ok(r.payable < no.payable, '신고했는데 세금이 안 줄었다');
});

test('받은 금액이 늘면 세금이 줄지 않는다', () => {
  for (const relation of RELATIONS) {
    let prev = -1;
    for (let a = 0; a <= 5_000_000_000; a += 50_000_000) {
      const now = calcGiftTax({ amount: a, relation }).payable;
      assert.ok(now >= prev - 1e-6, `${relation}: ${a / 1e8}억에서 세금이 줄었다`);
      prev = now;
    }
  }
});

test('경계에서 무너지지 않는다', () => {
  for (const input of [
    { amount: 0, relation: 'parent-adult' as Relation },
    { amount: -100, relation: 'other' as Relation },
    { amount: 100_000_000, relation: 'other' as Relation, priorAmount: -50_000_000 },
    { amount: 1, relation: 'spouse' as Relation },
  ]) {
    const r = calcGiftTax(input);
    for (const [k, v] of Object.entries(r)) {
      assert.ok(Number.isFinite(v), `${JSON.stringify(input)}: ${k}가 ${v}다`);
      assert.ok(v >= 0, `${JSON.stringify(input)}: ${k}가 음수다`);
    }
  }
  assert.equal(calcGiftTax({ amount: 0, relation: 'other' }).effectiveRate, 0);
});

test('페이지에 세율표가 되살아나지 않았다', () => {
  const page = readFileSync(
    join(ROOT, 'app', '(ko)', 'calculator', 'gift-tax', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/gift-tax'/, '페이지가 lib을 안 쓴다');
  assert.match(page, /calcGiftTax/, '페이지가 lib 함수를 안 부른다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/deduct: \d/.test(code), '페이지에 누진공제액이 되살아났다');
  assert.ok(!/tax \* 0\.97/.test(code), '페이지에 신고세액공제가 되살아났다');
  assert.ok(!/600_000_000/.test(code), '페이지에 증여재산공제액이 되살아났다');
});
