/**
 * 분할연금 — 하나를 둘로 가르는 셈이라 항등식이 전부다.
 *
 *  - **분할연금 + 나눠 준 쪽에 남는 연금 = 원래 노령연금액.** 이 성질이 깨지면
 *    없던 돈이 생기거나 사라진 것이므로 여러 입력으로 못 박는다
 *  - 나눌 몫은 혼인기간 비율에만 달렸다 — 혼인기간이 가입기간과 같으면 전액이고
 *    0이면 0이다. 그 사이는 비율대로 움직인다
 *  - 혼인 중 가입월수가 총 가입월수보다 크게 들어오면 잘라 낸다. 안 자르면
 *    나눌 몫이 원래 연금보다 커져 항등식이 깨진다
 *  - 노령연금액은 lib/national-pension.ts의 식을 빌려 쓴다 — 같은 값이 나오는지
 *    직접 대조한다
 *  - 부양가족연금액은 분할 대상이 아니다. 나눠도 그 몫은 줄지 않아야 한다
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SPLIT_RATIO, MIN_MARRIAGE_MONTHS, SPLIT_RATIO_PRESETS,
  calcSplit, splitShare, splitTable,
} from '../lib/pension-split.ts';
import { calcPension } from '../lib/national-pension.ts';

const base = {
  avgIncome: 3_000_000,
  myIncome: 3_000_000,
  months: 360,
  year: 2026,
  shiftYears: 0,
  familyAnnual: 0,
  marriageMonths: 120,
  splitRatio: DEFAULT_SPLIT_RATIO,
};

/** 금액은 부동소수점이라 원 단위 아래에서 견준다 */
const near = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;

test('두 사람 몫을 합치면 원래 노령연금이다', () => {
  /*
   * 분할연금은 없던 돈을 만드는 게 아니다. 어느 식을 잘못 고쳐도 이 합이
   * 어긋나므로, 이 검사가 이 파일의 중심이다.
   */
  for (const months of [120, 180, 240, 360, 480]) {
    for (const marriageMonths of [0, 12, 59, 60, 120, 239, 480]) {
      for (const splitRatio of [0, 0.25, 0.5, 0.75, 1]) {
        const r = calcSplit({ ...base, months, marriageMonths, splitRatio });
        const label = `${months}개월 중 혼인 ${marriageMonths}개월, 비율 ${splitRatio}`;
        assert.ok(
          near(r.spouseMonthly + r.ownBeforeFamily, r.baseMonthly),
          `${label}: ${r.spouseMonthly} + ${r.ownBeforeFamily} ≠ ${r.baseMonthly}`,
        );
        // 부양가족연금을 얹어도 총합은 원래 받던 금액 그대로다
        const withFamily = calcSplit({ ...base, months, marriageMonths, splitRatio, familyAnnual: 3_600_000 });
        assert.ok(
          near(withFamily.spouseMonthly + withFamily.ownMonthly, withFamily.baseMonthly + withFamily.familyMonthly),
          label,
        );
        // 줄어드는 금액은 나눠 준 만큼이다
        assert.ok(near(r.reduction, r.spouseMonthly), label);
        // 어느 쪽도 음수가 되지 않는다
        assert.ok(r.spouseMonthly >= 0 && r.ownBeforeFamily >= 0, label);
      }
    }
  }
});

test('손으로 셈한 값과 맞는다', () => {
  /*
   * 2026년 상수 1.23, A=B=300만, 가입 360개월.
   *   기본연금액 = 1.23 × 600만 × (1 + 0.05 × 120 ÷ 12) = 1.23 × 600만 × 1.5
   *              = 1,107만원(연액) → 월 922,500원
   *   혼인 120개월 ÷ 총 360개월 = 3분의 1 → 나눌 몫 307,500원
   *   절반씩 나누면 분할연금 153,750원, 남는 쪽 768,750원
   */
  const r = calcSplit(base);
  assert.ok(near(r.baseMonthly, 922_500, 0.01), `${r.baseMonthly}`);
  assert.ok(near(r.marriageShare, 1 / 3), `${r.marriageShare}`);
  assert.ok(near(r.divisibleMonthly, 307_500, 0.01), `${r.divisibleMonthly}`);
  assert.ok(near(r.spouseMonthly, 153_750, 0.01), `${r.spouseMonthly}`);
  assert.ok(near(r.ownMonthly, 768_750, 0.01), `${r.ownMonthly}`);
  // 절반을 나눈다고 들었지만 실제로는 6분의 1이다 — 혼인기간이 3분의 1이라서다
  assert.ok(near(r.sharePercent, 100 / 6, 1e-9), `${r.sharePercent}`);
});

test('노령연금액은 국민연금 쪽 식과 같은 값이다', () => {
  /* 식을 두 곳에 적지 않았는지 대조한다 */
  for (const months of [130, 200, 360]) {
    for (const shiftYears of [-5, 0, 3]) {
      const s = calcSplit({ ...base, months, shiftYears });
      const p = calcPension({ ...base, months, shiftYears });
      assert.equal(s.baseMonthly, p.monthlyBeforeFamily, `${months}개월 ${shiftYears}년에서 어긋났다`);
      assert.equal(s.familyMonthly, p.familyMonthly);
    }
  }
  // 앞당겨 받아 연금이 깎이면 나눌 몫도 그만큼 줄어든다
  const normal = calcSplit(base);
  const early = calcSplit({ ...base, shiftYears: -5 });
  assert.ok(early.spouseMonthly < normal.spouseMonthly);
  assert.ok(near(early.spouseMonthly / normal.spouseMonthly, 0.7, 1e-9));
});

test('혼인기간이 가입기간 전부면 전액이 나눌 몫이다', () => {
  const all = calcSplit({ ...base, marriageMonths: 360 });
  assert.equal(all.marriageShare, 1);
  assert.ok(near(all.divisibleMonthly, all.baseMonthly));
  // 절반씩 나누면 두 사람이 똑같이 받는다
  assert.ok(near(all.spouseMonthly, all.ownBeforeFamily));

  // 혼인 중 가입기간이 0이면 나눌 것이 없다
  const none = calcSplit({ ...base, marriageMonths: 0 });
  assert.equal(none.marriageShare, 0);
  assert.equal(none.divisibleMonthly, 0);
  assert.equal(none.spouseMonthly, 0);
  assert.ok(near(none.ownBeforeFamily, none.baseMonthly));

  // 그 사이는 혼인기간에 비례한다 — 두 배로 살았으면 두 배를 나눈다
  const a = calcSplit({ ...base, marriageMonths: 90 });
  const b = calcSplit({ ...base, marriageMonths: 180 });
  assert.ok(near(b.spouseMonthly, a.spouseMonthly * 2), `${a.spouseMonthly} → ${b.spouseMonthly}`);
});

test('혼인 중 가입월수는 총 가입월수로 잘라 낸다', () => {
  /*
   * 혼인기간 전체를 넣는 실수가 흔하다. 그대로 두면 나눌 몫이 원래 연금보다
   * 커져 항등식이 깨지므로 총 가입월수에서 자른다.
   */
  for (const marriageMonths of [361, 500, 9_999]) {
    const r = calcSplit({ ...base, marriageMonths });
    assert.equal(r.countedMarriageMonths, 360, `${marriageMonths}개월을 안 잘랐다`);
    assert.equal(r.marriageShare, 1);
    // 잘라 낸 결과는 "혼인기간 = 가입기간"과 똑같아야 한다
    const equal = calcSplit({ ...base, marriageMonths: 360 });
    assert.ok(near(r.spouseMonthly, equal.spouseMonthly));
    assert.ok(r.spouseMonthly <= r.baseMonthly, '나눌 몫이 원래 연금보다 커졌다');
  }
  // 음수와 소수도 조용히 통과시키지 않는다
  assert.equal(calcSplit({ ...base, marriageMonths: -10 }).countedMarriageMonths, 0);
  assert.equal(calcSplit({ ...base, marriageMonths: 120.9 }).countedMarriageMonths, 120);
});

test('분할 비율 0%와 100%의 경계', () => {
  // 0%면 한 푼도 안 나눈다 — 나눠 준 쪽이 그대로 다 받는다
  const zero = calcSplit({ ...base, splitRatio: 0 });
  assert.equal(zero.spouseMonthly, 0);
  assert.equal(zero.ratio, 0);
  assert.ok(near(zero.ownBeforeFamily, zero.baseMonthly));

  // 100%면 혼인기간 몫을 전부 넘긴다. 그래도 연금 전체는 아니다 —
  // 혼인기간이 3분의 1이므로 3분의 1만 넘어간다
  const full = calcSplit({ ...base, splitRatio: 1 });
  assert.ok(near(full.spouseMonthly, full.divisibleMonthly));
  assert.ok(near(full.spouseMonthly, full.baseMonthly / 3));
  assert.ok(full.ownBeforeFamily > 0, '혼인기간 밖의 몫까지 넘어갔다');

  // 범위를 벗어난 비율은 0~1로 자른다
  assert.equal(calcSplit({ ...base, splitRatio: -0.5 }).ratio, 0);
  assert.equal(calcSplit({ ...base, splitRatio: 1.5 }).ratio, 1);
  assert.ok(near(calcSplit({ ...base, splitRatio: 1.5 }).spouseMonthly, full.spouseMonthly));

  // 기본은 절반이다
  assert.equal(DEFAULT_SPLIT_RATIO, 0.5);
});

test('비율 두 개를 곱한 것이 분할연금의 몫이다', () => {
  /*
   * 분할연금 ÷ 노령연금 = 혼인기간 비율 × 분할 비율.
   * 금액 쪽 셈을 이 식으로 되짚는다 — 둘이 어긋나면 어느 한쪽이 틀렸다.
   */
  assert.equal(splitShare(1 / 3, 0.5), (1 / 3) * 0.5);
  for (const marriageMonths of [30, 120, 300, 360]) {
    for (const splitRatio of [0, 0.3, 0.5, 1]) {
      const r = calcSplit({ ...base, marriageMonths, splitRatio });
      const expected = r.baseMonthly * splitShare(r.marriageShare, r.ratio);
      assert.ok(near(r.spouseMonthly, expected), `혼인 ${marriageMonths}개월 비율 ${splitRatio}`);
    }
  }
});

test('부양가족연금은 나누지 않는다', () => {
  const familyAnnual = 300_000 * 12;
  const without = calcSplit(base);
  const wit = calcSplit({ ...base, familyAnnual });

  // 나눌 몫은 부양가족연금이 있든 없든 같다
  assert.ok(near(wit.divisibleMonthly, without.divisibleMonthly));
  assert.ok(near(wit.spouseMonthly, without.spouseMonthly), '부양가족연금까지 나눴다');
  // 부양가족연금은 나눠 준 쪽에 온전히 남는다
  assert.ok(near(wit.familyMonthly, 300_000));
  assert.ok(near(wit.ownMonthly, without.ownMonthly + 300_000));
});

test('가입기간 10년 미만이면 나눌 연금이 없다', () => {
  /*
   * 노령연금이 아니라 반환일시금 대상이라 연금액 자체가 0이다.
   * 나눌 것이 없으므로 분할연금도 0이다 — 지어낸 금액을 내놓지 않는다.
   */
  const short = calcSplit({ ...base, months: 60, marriageMonths: 60 });
  assert.equal(calcPension({ ...base, months: 60 }).monthly, 0);
  assert.equal(short.baseMonthly, 0);
  assert.equal(short.spouseMonthly, 0);
  assert.equal(short.ownMonthly, 0);
  assert.equal(short.sharePercent, 0);
  // 혼인기간은 그대로 세 둔다 — 요건 안내에 쓴다
  assert.equal(short.countedMarriageMonths, 60);
});

test('총 가입월수 0에서 0으로 나누지 않는다', () => {
  const r = calcSplit({ ...base, months: 0, marriageMonths: 120 });
  assert.equal(r.countedMarriageMonths, 0);
  assert.equal(r.marriageShare, 0);
  for (const [k, v] of Object.entries(r)) {
    if (typeof v === 'number') assert.ok(Number.isFinite(v), `${k}가 ${v}다`);
  }
  assert.equal(r.spouseMonthly, 0);
  assert.equal(r.ownMonthly, 0);
});

test('혼인 5년 미만은 표시로만 알린다', () => {
  /*
   * 요건을 판정해 금액을 0으로 만들지 않는다 — 이혼 성립과 수급연령은 여기서
   * 알 수 없어 "받는다면 얼마"만 낸다. 5년 문턱만 화면에 알려 준다.
   */
  assert.equal(MIN_MARRIAGE_MONTHS, 60);
  const under = calcSplit({ ...base, marriageMonths: 59 });
  const over = calcSplit({ ...base, marriageMonths: 60 });
  assert.equal(under.marriageMonthsMeetsMinimum, false);
  assert.equal(over.marriageMonthsMeetsMinimum, true);
  // 문턱을 못 넘어도 금액은 그대로 낸다
  assert.ok(under.spouseMonthly > 0);
});

test('비율을 바꿔 늘어놓아도 두 몫의 합은 그대로다', () => {
  const rows = splitTable(base);
  assert.equal(rows.length, SPLIT_RATIO_PRESETS.length);
  const total = calcSplit(base).baseMonthly;
  let prev = -1;
  for (const row of rows) {
    assert.ok(near(row.spouseMonthly + row.ownMonthly, total), `비율 ${row.ratio}`);
    // 비율이 오르면 받는 쪽이 늘어난다
    assert.ok(row.spouseMonthly > prev, `비율 ${row.ratio}에서 안 늘었다`);
    prev = row.spouseMonthly;
  }
  // 기본 비율 행은 기본 계산과 같은 값이다
  const half = rows.find(r => r.ratio === DEFAULT_SPLIT_RATIO);
  assert.ok(half && near(half.spouseMonthly, calcSplit(base).spouseMonthly));
});
