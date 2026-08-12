/**
 * 일시금과 연금 — 되짚을 수 있는 자리를 모두 되짚는다.
 *
 * 이 계산의 뼈대는 하나다. **운용수익이 없고 1년에 다 받으면 연금 쪽은 일시금과
 * 감액분만큼만 달라야 한다.** 퇴직소득세의 70%만 내니까 차액이 정확히 30%다.
 * 이 되짚기가 깨지면 어딘가에서 세금을 두 번 매기거나 원금을 흘린 것이다.
 *
 * 감액률은 이 파일이 새로 적는 유일한 숫자다. 그래서 10년째와 11년째를 한 해 차이로
 * 밟아 보고, 퇴직소득세 자체는 lib/retirement-income-tax.ts의 값과 대조한다.
 * 세율표를 여기로 베껴 오지 않았는지도 원문을 읽어 확인한다 — 베껴 두면 한쪽만
 * 고쳐질 때 조용히 어긋난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  DEFERRED_RATE_EARLY, DEFERRED_RATE_LATE, RATE_STEP_YEAR,
  betterChoice, breakevenYears, calcPensionSide, compare, compareTable, deferredTaxRate,
} from '../lib/severance-vs-pension.ts';
import { TAX_BRACKETS, calcRetirementTax } from '../lib/retirement-income-tax.ts';
import { PRIVATE_OVER_RATE, PRIVATE_SEPARATE_LIMIT, calcPensionTax, privateRate } from '../lib/pension-tax.ts';

/** 근속 20년·퇴직금 1억 — 퇴직소득세가 0이 아닌 평범한 자리 */
const base = {
  payout: 100_000_000,
  serviceMonths: 240,
  pensionYears: 10,
  returnRate: 0,
  startAge: 60,
};

const lumpTaxOf = (payout: number, serviceMonths: number) =>
  calcRetirementTax({ payout, serviceMonths }).totalTax;

test('감액률은 10년째까지 70%, 11년째부터 60%다', () => {
  assert.equal(DEFERRED_RATE_EARLY, 0.7);
  assert.equal(DEFERRED_RATE_LATE, 0.6);
  assert.equal(RATE_STEP_YEAR, 11);

  // 문턱을 한 해 차이로 밟는다
  assert.equal(deferredTaxRate(1), DEFERRED_RATE_EARLY);
  assert.equal(deferredTaxRate(9), DEFERRED_RATE_EARLY);
  assert.equal(deferredTaxRate(10), DEFERRED_RATE_EARLY);
  assert.equal(deferredTaxRate(11), DEFERRED_RATE_LATE);
  assert.equal(deferredTaxRate(12), DEFERRED_RATE_LATE);
  assert.equal(deferredTaxRate(30), DEFERRED_RATE_LATE);

  /*
   * 계산 전체에서도 그 문턱이 살아 있어야 한다. 운용수익을 0으로 두면 해마다 원금을
   * 똑같이 받으므로, 10년에 받으면 전부 70%이고 11년에 받으면 마지막 한 해만 60%다.
   */
  const lumpTax = lumpTaxOf(base.payout, base.serviceMonths);
  assert.ok(lumpTax > 0, '세금이 0인 입력으로는 감액률을 볼 수 없다');

  const at10 = calcPensionSide({ ...base, pensionYears: 10 });
  const at11 = calcPensionSide({ ...base, pensionYears: 11 });

  /*
   * 여기서부터는 상수를 쓰지 않고 0.7·0.6을 손으로 적는다. 상수를 곱해 견주면
   * 상수를 틀리게 바꿔도 양쪽이 같이 움직여 검사가 통과한다 — 아무것도 안 지키는
   * 초록 검사가 된다.
   */
  assert.ok(Math.abs(at10.avgDeferredRate - 0.7) < 1e-9);
  assert.ok(Math.abs(at10.severanceTax - lumpTax * 0.7) < 1e-6);

  // 11년에 나누면 10년치는 70%, 한 해치는 60%다
  const expected11 = lumpTax * (10 * 0.7 + 0.6) / 11;
  assert.ok(
    Math.abs(at11.severanceTax - expected11) < 1e-6,
    `11년째 감액이 안 먹었다: ${at11.severanceTax} vs ${expected11}`,
  );
  assert.ok(at11.severanceTax < at10.severanceTax, '한 해 더 나눴는데 세금이 안 줄었다');
});

test('운용수익 0%·1년이면 연금 쪽은 감액분만큼만 다르다', () => {
  /*
   * 이 계산기의 뼈대다. 1년에 다 받고 수익이 없으면 받는 총액은 퇴직금 그대로이고,
   * 세금만 퇴직소득세의 70%다. 그러니 두 선택의 차액은 정확히 퇴직소득세의 30%다.
   */
  for (const [payout, months] of [[100_000_000, 240], [30_000_000, 60], [500_000_000, 360]]) {
    const c = compare({ payout, serviceMonths: months, pensionYears: 1, returnRate: 0, startAge: 60 });
    const lumpTax = lumpTaxOf(payout, months);

    assert.ok(Math.abs(c.pension.grossTotal - payout) < 1e-6, `총 수령액이 퇴직금과 다르다: ${c.pension.grossTotal}`);
    assert.equal(c.pension.gainTotal, 0);
    assert.equal(c.pension.pensionTax, 0, '운용수익이 없는데 연금소득세가 붙었다');
    // 70%·30%를 손으로 적는다 — 상수를 곱하면 상수가 틀려도 통과한다
    assert.ok(Math.abs(c.pension.totalTax - lumpTax * 0.7) < 1e-6);
    assert.ok(
      Math.abs(c.diff - lumpTax * 0.3) < 1e-6,
      `차액이 감액분과 다르다: ${c.diff} vs ${lumpTax * 0.3}`,
    );
    // 세후 금액 자체도 양쪽에서 맞는다
    assert.ok(Math.abs(c.pension.net - (payout - lumpTax * 0.7)) < 1e-6);
    assert.ok(Math.abs(c.lump.netPayout - (payout - lumpTax)) < 1e-9);
  }
});

test('수령 기간을 늘리면 세금이 줄어든다', () => {
  /*
   * 운용수익이 없으면 세금은 감액된 퇴직소득세뿐이라, 기간을 늘릴수록 11년째 이후
   * 몫이 늘어나 세금이 단조로 줄어든다. 1~10년은 전부 70%라 같아야 하고, 11년째부터
   * 내려가야 한다.
   */
  let prev = Infinity;
  for (let years = 1; years <= 30; years++) {
    const p = calcPensionSide({ ...base, pensionYears: years });
    assert.ok(p.totalTax <= prev + 1e-6, `${years}년으로 늘렸는데 세금이 늘었다: ${prev} → ${p.totalTax}`);
    // 10년째까지는 전부 70%라 세금이 같다 — 손으로 적은 값과 견준다
    if (years <= 10) assert.ok(Math.abs(p.totalTax - lumpTaxOf(base.payout, base.serviceMonths) * 0.7) < 1e-6);
    if (years === 11) assert.ok(p.totalTax < prev - 1, '11년째인데 세금이 그대로다');
    // 아무리 길게 나눠도 60% 밑으로는 안 내려간다
    assert.ok(p.totalTax >= lumpTaxOf(base.payout, base.serviceMonths) * 0.6 - 1e-6, `${years}년: 60%보다 적게 냈다`);
    prev = p.totalTax;
  }

  /*
   * 아주 길게 나누면 대부분이 11년째 뒤라 평균 납부율이 60%에 다가간다. 이 되짚기가
   * 11년째 뒤의 감액률을 값으로 붙잡는다 — 위의 단조성만으로는 60%가 65%로 바뀌어도
   * 안 걸린다.
   */
  const long = calcPensionSide({ ...base, pensionYears: 100 });
  const lumpTax = lumpTaxOf(base.payout, base.serviceMonths);
  assert.ok(Math.abs(long.totalTax - lumpTax * (10 * 0.7 + 90 * 0.6) / 100) < 1e-6);
  assert.ok(Math.abs(long.avgDeferredRate - 0.61) < 1e-9, `100년 평균 납부율 ${long.avgDeferredRate}`);

  /*
   * 수익이 있으면 총세금은 단조롭지 않다 — 한 해 운용수익이 1,500만원을 넘는 순간
   * 연금소득세율이 16.5%로 뛰기 때문이다. 그래도 퇴직소득세 몫만 떼어 보면 줄어든다.
   */
  let prevSev = Infinity;
  for (let years = 1; years <= 30; years++) {
    const p = calcPensionSide({ ...base, pensionYears: years, returnRate: 0.05 });
    assert.ok(
      p.severanceTax <= prevSev + 1e-6,
      `${years}년: 퇴직소득세 몫이 늘었다 ${prevSev} → ${p.severanceTax}`,
    );
    prevSev = p.severanceTax;
  }
});

test('퇴직소득세는 retirement-income-tax.ts의 값을 그대로 쓴다', () => {
  for (const [payout, months] of [[50_000_000, 120], [300_000_000, 360], [12_000_000, 18], [80_000_000, 1]]) {
    const c = compare({ payout, serviceMonths: months, pensionYears: 1, returnRate: 0, startAge: 60 });
    // 일시금 쪽은 퇴직소득세 계산 결과를 손대지 않고 그대로 담는다
    assert.deepEqual(c.lump, calcRetirementTax({ payout, serviceMonths: months }));
    // 연금 쪽 세금은 그 값의 70%다
    assert.ok(Math.abs(c.pension.severanceTax - c.lump.totalTax * 0.7) < 1e-6);
  }

  // 근속연수공제가 퇴직금보다 크면 세금이 0이고, 그러면 감액할 것도 없다
  const noTax = compare({ payout: 20_000_000, serviceMonths: 240, pensionYears: 5, returnRate: 0, startAge: 60 });
  assert.equal(noTax.lump.totalTax, 0);
  assert.equal(noTax.pension.severanceTax, 0);
  assert.equal(noTax.better, 'tie');
});

test('누진공제액을 새 파일에 베껴 적지 않았다', () => {
  /*
   * 세율표를 여기로 옮겨 적으면 법이 바뀔 때 한쪽만 고쳐진다. 원문에 누진공제액 숫자가
   * 들어 있으면 실패한다 — 자릿수 구분(_ 와 ,)을 지우고 본다.
   */
  const src = readFileSync(join(import.meta.dirname, '..', 'lib', 'severance-vs-pension.ts'), 'utf8')
    .replace(/[_,]/g, '');
  for (const [, , deduct] of TAX_BRACKETS) {
    if (deduct === 0) continue;
    assert.ok(
      !src.includes(String(deduct)),
      `누진공제액 ${deduct}이 새 파일에 적혀 있다 — retirement-income-tax.ts의 표를 쓴다`,
    );
  }
  // 세율표를 직접 들여다보지도 않는다
  assert.ok(!src.includes('TAX_BRACKETS'), '세율표를 직접 뒤지고 있다 — calcRetirementTax를 쓴다');
});

test('운용수익에는 연금소득세가 붙는다', () => {
  const p = calcPensionSide({ ...base, pensionYears: 20, returnRate: 0.1 });
  assert.ok(p.gainTotal > 0, '수익률을 넣었는데 운용수익이 없다');
  assert.ok(p.pensionTax > 0, '운용수익이 있는데 연금소득세가 0이다');

  let sum = 0;
  let gainYears = 0;
  for (const row of p.rows) {
    // pension-tax.ts의 규칙을 그대로 쓰는지 한 줄씩 대조한다
    const expected = calcPensionTax({
      publicAnnual: 0, privateAnnual: row.fromGain, age: row.age,
      otherIncome: 0, personalDeduction: 0,
    }).privateTax;
    assert.ok(Math.abs(row.pensionTax - expected) < 1e-6, `${row.year}년째 연금소득세가 다르다`);
    if (row.fromGain > 0) {
      gainYears++;
      const rate = row.fromGain > PRIVATE_SEPARATE_LIMIT ? PRIVATE_OVER_RATE : privateRate(row.age);
      assert.ok(Math.abs(row.pensionTax - row.fromGain * rate) < 1e-6);
    } else {
      assert.equal(row.pensionTax, 0);
    }
    sum += row.pensionTax;
  }
  assert.ok(gainYears > 0, '운용수익을 받은 해가 없다 — 인출 순서를 잘못 잡았다');
  assert.ok(Math.abs(p.pensionTax - sum) < 1e-6);

  // 인출 순서는 이연퇴직소득이 먼저다 — 첫 해에는 운용수익 몫이 없다
  assert.equal(p.rows[0].fromGain, 0);
  assert.equal(p.rows[0].pensionTax, 0);
});

test('받은 돈의 합이 원금과 운용수익의 합이다', () => {
  for (const rate of [0, 0.03, 0.07, -0.05]) {
    for (const years of [1, 7, 15, 25]) {
      const p = calcPensionSide({ ...base, pensionYears: years, returnRate: rate });
      assert.ok(
        Math.abs(p.grossTotal - (base.payout + p.gainTotal)) < 1e-6,
        `${years}년 @ ${rate}: 원금+수익과 총 수령액이 어긋난다`,
      );
      // 연차별 합이 총계와 맞는다
      const rowGross = p.rows.reduce((a, r) => a + r.gross, 0);
      const rowTax = p.rows.reduce((a, r) => a + r.severanceTax + r.pensionTax, 0);
      const rowNet = p.rows.reduce((a, r) => a + r.net, 0);
      assert.ok(Math.abs(rowGross - p.grossTotal) < 1e-6);
      assert.ok(Math.abs(rowTax - p.totalTax) < 1e-6);
      assert.ok(Math.abs(rowNet - p.net) < 1e-6);
      assert.ok(Math.abs(p.netMonthly * years * 12 - p.net) < 1e-6);
      // 원금은 받은 만큼만 과세된다 — 낸 세금이 일시금 세금의 70%를 넘을 수 없다
      assert.ok(p.severanceTax <= lumpTaxOf(base.payout, base.serviceMonths) * 0.7 + 1e-6);
    }
  }
});

test('퇴직금 0·근속 0개월·기간 0에서 무너지지 않는다', () => {
  const zero = compare({ payout: 0, serviceMonths: 0, pensionYears: 10, returnRate: 0.05, startAge: 60 });
  assert.equal(zero.pension.grossTotal, 0);
  assert.equal(zero.pension.totalTax, 0);
  assert.equal(zero.pension.net, 0);
  assert.equal(zero.diff, 0);
  assert.equal(zero.better, 'tie');

  // 근속 0개월이면 퇴직소득세가 0이라 감액할 것이 없다
  const noService = compare({ payout: 50_000_000, serviceMonths: 0, pensionYears: 10, returnRate: 0, startAge: 60 });
  assert.equal(noService.lump.totalTax, 0);
  assert.equal(noService.pension.severanceTax, 0);
  assert.ok(Math.abs(noService.pension.net - 50_000_000) < 1e-6);

  // 기간 0년은 받는 해가 없다 — 0으로 나누지 않는다
  const noYears = calcPensionSide({ ...base, pensionYears: 0 });
  assert.equal(noYears.rows.length, 0);
  assert.equal(noYears.netMonthly, 0);
  assert.equal(noYears.avgDeferredRate, 0);
  assert.ok(Number.isFinite(noYears.net));

  // 음수 퇴직금은 0으로 본다
  const negative = compare({ payout: -1_000_000, serviceMonths: 120, pensionYears: 5, returnRate: 0, startAge: 60 });
  assert.equal(negative.pension.net, 0);
  assert.ok(Number.isFinite(negative.diff));

  // 소수 연수는 해 단위로 내린다
  assert.equal(calcPensionSide({ ...base, pensionYears: 5.9 }).years, 5);
});

test('유리한 쪽은 실제로 금액이 큰 쪽이다', () => {
  assert.equal(betterChoice(100, 50), 'pension');
  assert.equal(betterChoice(50, 100), 'lump');
  assert.equal(betterChoice(100, 100), 'tie');
  // 절사 때문에 남는 끝자리는 무승부로 본다
  assert.equal(betterChoice(100.4, 100), 'tie');

  for (const payout of [0, 20_000_000, 100_000_000, 700_000_000]) {
    for (const months of [0, 36, 240, 420]) {
      for (const rate of [-0.2, -0.05, 0, 0.04, 0.09]) {
        for (const years of [1, 10, 11, 20]) {
          const c = compare({ payout, serviceMonths: months, pensionYears: years, returnRate: rate, startAge: 58 });
          const label = `${payout}/${months}/${rate}/${years}`;
          assert.ok(Math.abs(c.diff - (c.pension.net - c.lump.netPayout)) < 1e-9, label);
          if (c.better === 'pension') assert.ok(c.pension.net > c.lump.netPayout, `${label}: 작은 쪽을 골랐다`);
          else if (c.better === 'lump') assert.ok(c.pension.net < c.lump.netPayout, `${label}: 작은 쪽을 골랐다`);
          else assert.ok(Math.abs(c.diff) < 1, `${label}: 차이가 나는데 무승부라 한다`);
        }
      }
    }
  }

  // 손실이 크면 연금 쪽이 진다 — 감액만으로는 못 메운다
  assert.equal(compare({ ...base, pensionYears: 20, returnRate: -0.1 }).better, 'lump');
});

test('몇 년에 걸쳐 받으면 유리해지는가', () => {
  // 감액만으로 이미 앞서므로 1년째부터 유리하다
  assert.equal(breakevenYears({ ...base, returnRate: 0 }), 1);
  assert.equal(breakevenYears({ ...base, returnRate: 0.04 }), 1);
  // 계좌가 손실을 보면 끝까지 못 넘는다
  assert.equal(breakevenYears({ ...base, returnRate: -0.1 }), null);
  // 퇴직소득세가 0이고 수익도 없으면 늘 무승부라 넘어서는 해가 없다
  assert.equal(breakevenYears({ ...base, payout: 20_000_000, returnRate: 0 }), null);

  // 찾은 해에서는 실제로 앞서고, 그 앞 해에서는 앞서지 않는다
  const found = breakevenYears({ ...base, returnRate: -0.02, startAge: 55 });
  if (found !== null) {
    assert.equal(compare({ ...base, returnRate: -0.02, startAge: 55, pensionYears: found }).better, 'pension');
    if (found > 1) {
      assert.notEqual(
        compare({ ...base, returnRate: -0.02, startAge: 55, pensionYears: found - 1 }).better,
        'pension',
      );
    }
  }
});

test('기간별 비교표가 11년째의 문턱을 보여 준다', () => {
  const rows = compareTable({ ...base, returnRate: 0 }, [5, 10, 11, 20]);
  assert.equal(rows.length, 4);

  const lumpNet = calcRetirementTax({ payout: base.payout, serviceMonths: base.serviceMonths }).netPayout;
  for (const row of rows) {
    const p = calcPensionSide({ ...base, pensionYears: row.years });
    assert.ok(Math.abs(row.net - p.net) < 1e-9, `${row.years}년: 표와 계산이 다르다`);
    assert.ok(Math.abs(row.diff - (p.net - lumpNet)) < 1e-9);
    assert.ok(row.diff > 0, '수익이 없어도 감액만으로 연금이 앞선다');
  }

  // 5년과 10년은 전부 70%라 세금이 같고, 11년부터 내려간다
  assert.ok(Math.abs(rows[0].totalTax - rows[1].totalTax) < 1e-6);
  assert.ok(rows[2].totalTax < rows[1].totalTax);
  assert.ok(rows[3].totalTax < rows[2].totalTax);
  assert.ok(Math.abs(rows[1].avgDeferredRate - 0.7) < 1e-9);
  // 20년에 나누면 열 해는 70%, 열 해는 60%라 평균이 정확히 65%다
  assert.ok(
    Math.abs(rows[3].avgDeferredRate - 0.65) < 1e-9,
    `20년 평균 납부율이 65%가 아니다: ${rows[3].avgDeferredRate}`,
  );
});
