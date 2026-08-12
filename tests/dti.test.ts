/**
 * DTI — 셈을 왕복시킨다.
 *
 * 이 계산기의 값은 역산에 있다. 한도에서 되짚어 낸 최대 원금을 다시 정방향에
 * 넣으면 DTI가 그 한도에 **딱 닿아야** 한다. 닿지 않으면 둘 중 하나가 틀린
 * 것이고, 어느 쪽이 틀렸는지는 왕복이 아니면 드러나지 않는다.
 *
 * DSR과 갈리는 지점(기타 대출을 이자만 세는 것)도 검사로 못 박는다 — 원금까지
 * 세는 코드로 바뀌면 여기서 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dti, maxPrincipal, mortgageBurden, otherInterestAnnual } from '../lib/dti.ts';
import { equalPayment } from '../lib/loan-schedule.ts';

const mortgage = { principal: 300_000_000, annualRate: 4.5, months: 360 };

test('DTI는 주담대 원리금과 기타 대출 이자를 소득으로 나눈 값이다', () => {
  const others = [{ balance: 50_000_000, annualRate: 6 }];
  const r = dti({ annualIncome: 60_000_000, mortgage, others });

  // 주담대 3억 · 4.5% · 30년이면 월 1,520,056원이다.
  // 이 값은 매달 이자를 붙이고 원리금을 뺐을 때 360개월 뒤 잔액이 0이 되는 것으로
  // 따로 확인했다 — 식을 믿고 적은 숫자가 아니다.
  const monthly = equalPayment(300_000_000, 4.5, 360);
  assert.ok(Math.abs(monthly - 1_520_056) < 1, `월 상환액이 ${monthly}원`);
  let left = 300_000_000;
  for (let m = 0; m < 360; m++) left = left * (1 + 0.045 / 12) - monthly;
  assert.ok(Math.abs(left) < 1, `마지막 잔액이 ${left}원`);
  assert.ok(Math.abs(r.mortgageAnnual - monthly * 12) < 1e-6);

  // 기타 대출은 이자만 — 5,000만 × 6% = 연 300만원
  assert.ok(Math.abs(r.otherAnnual - 3_000_000) < 1e-6, `기타 이자가 ${r.otherAnnual}원`);
  assert.ok(Math.abs(r.totalAnnual - (r.mortgageAnnual + r.otherAnnual)) < 1e-9);
  assert.ok(Math.abs(r.totalMonthly - r.totalAnnual / 12) < 1e-9);

  // 비율은 손으로 셈한 값과 같다
  assert.ok(Math.abs(r.dti - (r.totalAnnual / 60_000_000) * 100) < 1e-9);
  assert.ok(Math.abs(r.dti - 35.4) < 0.1, `DTI가 ${r.dti}%`);
});

test('기타 대출은 이자만 센다 — DSR과 갈리는 지점', () => {
  const balance = 50_000_000;
  const annualRate = 6;
  assert.ok(Math.abs(otherInterestAnnual([{ balance, annualRate }]) - 3_000_000) < 1e-6);

  // 같은 대출을 5년 원리금균등으로 갚으면 연 1,160만원이 넘는다.
  // DTI가 그 값을 쓰고 있다면 아래가 깨진다 — 이자만 세는지 못 박는 검사다.
  const asPrincipal = equalPayment(balance, annualRate, 60) * 12;
  assert.ok(asPrincipal > 11_000_000, `원리금으로는 연 ${asPrincipal}원`);
  assert.ok(otherInterestAnnual([{ balance, annualRate }]) < asPrincipal / 3);

  // 잔액이 여러 건이면 그냥 더한다
  const many = otherInterestAnnual([
    { balance: 10_000_000, annualRate: 5 },
    { balance: 20_000_000, annualRate: 7 },
  ]);
  assert.ok(Math.abs(many - (500_000 + 1_400_000)) < 1e-6);
});

test('한도에서 되짚은 최대 원금을 다시 넣으면 한도에 딱 닿는다', () => {
  for (const limitPercent of [40, 50, 60]) {
    for (const annualRate of [0, 3.2, 4.5, 7]) {
      for (const months of [120, 360, 480]) {
        for (const others of [[], [{ balance: 30_000_000, annualRate: 5.5 }]]) {
          const m = maxPrincipal({
            annualIncome: 70_000_000, limitPercent, annualRate, months, others,
          });
          const back = dti({
            annualIncome: 70_000_000,
            mortgage: { principal: m.principal, annualRate, months },
            others,
          });
          assert.ok(
            Math.abs(back.dti - limitPercent) < 1e-9,
            `${limitPercent}% / ${annualRate}% / ${months}개월 → ${back.dti}%`,
          );
        }
      }
    }
  }
});

test('거치기간을 두면 원금을 갚는 개월이 줄어 상환액이 무거워진다', () => {
  const plain = mortgageBurden({ ...mortgage, graceMonths: 0 });
  const grace = mortgageBurden({ ...mortgage, graceMonths: 36 });

  // 거치 중에는 이자만 낸다 — 3억 × 4.5% ÷ 12 = 1,125,000원
  assert.ok(Math.abs(grace.monthlyDuringGrace - 1_125_000) < 1e-6);
  assert.ok(grace.monthlyDuringGrace < grace.monthlyAfterGrace, '거치 중이 더 무겁다');

  // 원금은 360이 아니라 324개월에 나눠 갚는다
  assert.equal(grace.repayMonths, 324);
  assert.ok(Math.abs(grace.monthlyAfterGrace - equalPayment(300_000_000, 4.5, 324)) < 1e-9);

  // 비율은 무거운 쪽(거치 후)으로 본다 — 거치를 두면 DTI가 오른다
  assert.ok(grace.annual > plain.annual, '거치를 뒀는데 부담이 안 늘었다');
  assert.ok(Math.abs(grace.annual - grace.monthlyAfterGrace * 12) < 1e-9);

  // 거치기간이 전체 기간을 다 먹으면 만기일시다 — 끝까지 이자만 낸다
  const all = mortgageBurden({ ...mortgage, graceMonths: 360 });
  assert.equal(all.repayMonths, 0);
  assert.ok(Math.abs(all.monthlyAfterGrace - all.monthlyDuringGrace) < 1e-9);

  // 거치기간이 기간보다 길게 들어와도 음수 개월로 새지 않는다
  assert.equal(mortgageBurden({ ...mortgage, graceMonths: 500 }).repayMonths, 0);
  assert.equal(mortgageBurden({ ...mortgage, graceMonths: -12 }).repayMonths, 360);
});

test('거치기간이 있어도 왕복이 맞는다', () => {
  const others = [{ balance: 20_000_000, annualRate: 6.5 }];
  for (const graceMonths of [0, 12, 36, 60]) {
    const m = maxPrincipal({
      annualIncome: 55_000_000, limitPercent: 40, annualRate: 4.2,
      months: 360, graceMonths, others,
    });
    const back = dti({
      annualIncome: 55_000_000,
      mortgage: { principal: m.principal, annualRate: 4.2, months: 360, graceMonths },
      others,
    });
    assert.ok(Math.abs(back.dti - 40) < 1e-9, `거치 ${graceMonths}개월 → ${back.dti}%`);
    // 거치가 길수록 갚을 개월이 짧아 같은 한도로 빌릴 수 있는 돈이 준다
    assert.ok(m.principal > 0);
  }

  // 거치를 늘리면 최대 원금이 단조 감소한다
  let prev = Infinity;
  for (const graceMonths of [0, 24, 60, 120]) {
    const p = maxPrincipal({
      annualIncome: 55_000_000, limitPercent: 40, annualRate: 4.2,
      months: 360, graceMonths, others: [],
    }).principal;
    assert.ok(p < prev, `거치 ${graceMonths}개월에서 안 줄었다`);
    prev = p;
  }
});

test('기간이 길면 월 상환액이 줄고 빌릴 수 있는 돈은 는다', () => {
  let prevMonthly = Infinity;
  let prevMax = 0;
  for (const months of [120, 180, 240, 300, 360, 480]) {
    const monthly = mortgageBurden({ ...mortgage, months }).monthlyAfterGrace;
    assert.ok(monthly < prevMonthly, `${months}개월에서 월 상환액이 안 줄었다`);
    prevMonthly = monthly;

    const max = maxPrincipal({
      annualIncome: 60_000_000, limitPercent: 40, annualRate: 4.5, months, others: [],
    }).principal;
    assert.ok(max > prevMax, `${months}개월에서 한도가 안 늘었다`);
    prevMax = max;
  }

  // 기간이 길어져 DTI가 내려가는 것도 같은 이야기다
  const short = dti({ annualIncome: 60_000_000, mortgage: { ...mortgage, months: 120 }, others: [] });
  const long = dti({ annualIncome: 60_000_000, mortgage: { ...mortgage, months: 360 }, others: [] });
  assert.ok(long.dti < short.dti);
});

test('금리 0%도 0으로 나누지 않는다', () => {
  // 이자가 없으면 원금을 개월수로 나눈 것이 월 상환액이다
  const b = mortgageBurden({ principal: 360_000_000, annualRate: 0, months: 360 });
  assert.equal(b.monthlyAfterGrace, 1_000_000);
  assert.equal(b.monthlyDuringGrace, 0);
  assert.equal(b.annual, 12_000_000);

  // 역산도 이자 없이 그냥 곱한다 — 월 200만 × 360개월 = 7억 2,000만
  const m = maxPrincipal({
    annualIncome: 60_000_000, limitPercent: 40, annualRate: 0, months: 360, others: [],
  });
  assert.ok(Math.abs(m.monthly - 2_000_000) < 1e-9);
  assert.ok(Math.abs(m.principal - 720_000_000) < 1e-6, `${m.principal}원`);

  // 금리 0인 기타 대출은 이자가 없어 한도를 안 먹는다
  assert.equal(otherInterestAnnual([{ balance: 50_000_000, annualRate: 0 }]), 0);
});

test('소득 0·대출 0 같은 경계에서 조용히 무너지지 않는다', () => {
  // 대출이 없으면 DTI는 0이다
  const none = dti({
    annualIncome: 60_000_000,
    mortgage: { principal: 0, annualRate: 4.5, months: 360 },
    others: [],
  });
  assert.equal(none.dti, 0);
  assert.equal(none.totalAnnual, 0);

  // 소득이 0인데 갚을 것이 있으면 비율을 낼 수 없다 — 0을 내면 여유로 읽힌다
  const noIncome = dti({ annualIncome: 0, mortgage, others: [] });
  assert.equal(noIncome.dti, Infinity);
  // 소득도 대출도 0이면 0이다 (0 ÷ 0으로 NaN을 내지 않는다)
  assert.equal(dti({
    annualIncome: 0,
    mortgage: { principal: 0, annualRate: 4.5, months: 360 },
    others: [],
  }).dti, 0);

  // 소득이 0이면 빌릴 수 있는 돈도 0이다
  assert.equal(maxPrincipal({
    annualIncome: 0, limitPercent: 40, annualRate: 4.5, months: 360, others: [],
  }).principal, 0);

  // 기타 대출 이자가 한도를 다 먹으면 주담대 몫이 없다
  const eaten = maxPrincipal({
    annualIncome: 30_000_000, limitPercent: 40, annualRate: 4.5, months: 360,
    others: [{ balance: 300_000_000, annualRate: 6 }],
  });
  assert.ok(eaten.forMortgageAnnual < 0);
  assert.equal(eaten.principal, 0);
  assert.equal(eaten.monthly, 0);

  // 기간이 0이면 갚을 달이 없어 한도도 0이다
  assert.equal(maxPrincipal({
    annualIncome: 60_000_000, limitPercent: 40, annualRate: 4.5, months: 0, others: [],
  }).principal, 0);
});

test('기타 대출 이자만큼 한도가 줄어든다', () => {
  const base = { annualIncome: 60_000_000, limitPercent: 40, annualRate: 4.5, months: 360 };
  const clean = maxPrincipal({ ...base, others: [] });
  const dirty = maxPrincipal({ ...base, others: [{ balance: 50_000_000, annualRate: 6 }] });

  // 허용 연 상환액은 소득의 40%로 같다
  assert.ok(Math.abs(clean.allowedAnnual - 24_000_000) < 1e-9);
  assert.ok(Math.abs(dirty.allowedAnnual - clean.allowedAnnual) < 1e-9);
  // 주담대에 쓸 수 있는 몫만 연 300만원 줄었다
  assert.ok(Math.abs(clean.forMortgageAnnual - dirty.forMortgageAnnual - 3_000_000) < 1e-6);
  assert.ok(dirty.principal < clean.principal);

  // 한도 비율이 높아지면 빌릴 수 있는 돈도 는다
  let prev = 0;
  for (const limitPercent of [30, 40, 50, 60]) {
    const p = maxPrincipal({ ...base, limitPercent, others: [] }).principal;
    assert.ok(p > prev, `${limitPercent}%에서 안 늘었다`);
    prev = p;
  }
});
