/**
 * 태양광 발전 수익 — 셈을 다른 길로 되짚는다.
 *
 * 되짚는 방법은 넷이다. 회수 기간을 도로 넣어 그때의 누적 절감액이 설치비에
 * 닿는지 보고, **사용량이 많은 집이 더 많이 아끼는지** 보고(누진을 제대로
 * 물렸으면 여기서 갈린다 — 평균 단가를 곱했다면 두 집의 절감액이 같아진다),
 * 감소율이 0일 때 누적이 연수에 정비례하는지 보고, 발전량이 사용량을 넘을 때
 * 절감액이 전기요금 총액을 넘지 않는지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DAYS_PER_YEAR, annualGeneration, cumulativeSaving, generationInYear,
  monthlySaving, paybackYears, solarPayback, yearSaving,
} from '../lib/solar-payback.ts';
import { FUND_RATE, TIERS, VAT_RATE, calcElectricity } from '../lib/electricity-tariff.ts';

/** 부가세와 기금까지 붙은 배수 — 단가를 견줄 때 쓴다 */
const WITH_TAX = 1 + VAT_RATE + FUND_RATE;

test('연간 발전량은 용량 × 발전시간 × 365다', () => {
  assert.equal(DAYS_PER_YEAR, 365);
  // 3kW × 3.5시간 × 365일 = 3,832.5kWh
  assert.ok(Math.abs(annualGeneration(3, 3.5) - 3832.5) < 1e-9);
  assert.equal(annualGeneration(0, 3.5), 0);

  // 1년차는 그대로, 그다음부터 감소율이 곱해진다
  assert.ok(Math.abs(generationInYear(1000, 0.005, 1) - 1000) < 1e-9);
  assert.ok(Math.abs(generationInYear(1000, 0.005, 2) - 995) < 1e-9);
  assert.ok(Math.abs(generationInYear(1000, 0.005, 11) - 1000 * 0.995 ** 10) < 1e-9);
  // 감소율이 0이면 몇 년차든 같다
  for (const year of [1, 5, 20]) assert.equal(generationInYear(1000, 0, year), 1000);
});

test('사용량이 많은 집이 훨씬 많이 아낀다', () => {
  /*
   * 같은 설비(1kW · 3.5시간 → 연 1,277.5kWh, 월 106.5kWh)를 두 집에 똑같이 단다.
   * 적게 쓰는 집은 1단계 단가가 지워지고, 많이 쓰는 집은 3단계 단가가 지워지며
   * 400kWh 아래로 내려가 기본요금까지 내려간다. 발전량이 같으니 평균 단가를
   * 곱하는 셈이었다면 두 값이 같아야 한다 — 그러면 이 검사가 깨진다.
   */
  const gen = annualGeneration(1, 3.5);
  const low = yearSaving(200, gen);   // 1단계에 머무는 집
  const high = yearSaving(500, gen);  // 3단계까지 쓰는 집

  assert.ok(high > low * 2, `누진이 안 물렸다: 적게 쓰는 집 ${low}원 vs 많이 쓰는 집 ${high}원`);

  // 깎인 1kWh의 값이 어느 구간에서 빠졌는지 그대로 드러난다
  const rateLow = low / gen;
  const rateHigh = high / gen;
  // 200kWh 집은 줄어든 만큼이 모두 1단계에 있다 — 1단계 단가에 세금만 붙은 값이다
  assert.ok(Math.abs(rateLow - TIERS[0].rate * WITH_TAX) < 1e-6, `${rateLow}원/kWh`);
  // 500kWh 집은 3단계 단가보다도 더 아낀다 — 기본요금이 7,300원에서 1,600원으로 내려가서다
  assert.ok(rateHigh > TIERS[2].rate * WITH_TAX, `${rateHigh}원/kWh`);

  /*
   * 구간을 대표하는 값끼리 견주면 차이가 뚜렷하다. 촘촘히 훑지 않는 것은
   * 절감액이 사용량에 대해 단조롭게 늘지 않기 때문이다 — 경계를 아래로 넘기는
   * 집은 기본요금 차액까지 챙기므로, 월 500kWh 집이 550kWh 집보다 더 아낀다.
   * 아래에서 그 자리를 따로 본다.
   */
  const t1 = yearSaving(180, gen);  // 1단계에서만 깎인다
  const t2 = yearSaving(350, gen);  // 2단계에서 깎인다
  const t3 = yearSaving(550, gen);  // 3단계에서 깎인다
  assert.ok(t2 > t1 * 1.5, `1단계 ${t1}원 vs 2단계 ${t2}원`);
  assert.ok(t3 > t2 * 1.3, `2단계 ${t2}원 vs 3단계 ${t3}원`);

  /*
   * 경계를 아래로 넘기면 기본요금까지 내려간다. 월 500kWh 집은 태양광으로
   * 393kWh까지 내려가 기본요금이 7,300원에서 1,600원으로 바뀌므로, 줄어든
   * 양이 똑같은 550kWh 집(그대로 3단계에 머문다)보다 더 아낀다. 평균 단가를
   * 곱하는 셈으로는 절대 나오지 않는 모양이다.
   */
  const cross = yearSaving(500, gen);
  const stay = yearSaving(550, gen);
  assert.ok(cross > stay, `경계를 넘긴 집 ${cross}원이 더 커야 한다 (vs ${stay}원)`);
  const basicDrop = (TIERS[2].basic - TIERS[1].basic) * WITH_TAX * 12;
  assert.ok(cross - stay < basicDrop + 1, '기본요금 차액보다 더 벌어졌다 — 구간을 잘못 갈랐다');

  // solarPayback이 내는 절감 단가도 같은 말을 한다
  const a = solarPayback({ capacityKw: 1, installCost: 2_000_000, monthlyKwh: 200, sunHours: 3.5, degradation: 0, years: 20 });
  const b = solarPayback({ capacityKw: 1, installCost: 2_000_000, monthlyKwh: 500, sunHours: 3.5, degradation: 0, years: 20 });
  assert.ok(b.effectiveRate > a.effectiveRate * 2, `${a.effectiveRate} vs ${b.effectiveRate}`);
  // 회수 기간도 그만큼 짧아진다
  assert.ok((b.paybackYears as number) < (a.paybackYears as number) / 2);
});

test('한 달치 절감액은 두 청구액의 차이다', () => {
  const m = monthlySaving(450, 150);
  assert.ok(Math.abs(m.billBefore - calcElectricity(450).total) < 1e-9);
  assert.ok(Math.abs(m.billAfter - calcElectricity(300).total) < 1e-9);
  assert.ok(Math.abs(m.saving - (m.billBefore - m.billAfter)) < 1e-9);
  assert.equal(m.selfUsedKwh, 150);
  assert.equal(m.wastedKwh, 0);
  // 발전이 없으면 절감도 없다
  assert.equal(monthlySaving(450, 0).saving, 0);
});

test('감소율이 0이면 누적 절감액이 연수에 정비례한다', () => {
  const input = { capacityKw: 3, installCost: 5_000_000, monthlyKwh: 400, sunHours: 3.5, degradation: 0, years: 20 };
  const r = solarPayback(input);
  assert.equal(r.rows.length, 20);
  const one = r.rows[0].saving;
  for (const row of r.rows) {
    assert.ok(Math.abs(row.saving - one) < 1e-9, `${row.year}년차 절감액이 달라졌다`);
    assert.ok(Math.abs(row.cumulative - one * row.year) < 1e-6, `${row.year}년차 누적이 정비례가 아니다`);
  }
  assert.ok(Math.abs(r.totalSaving - one * 20) < 1e-6);

  // 감소율을 넣으면 같은 연수의 누적이 반드시 작아진다
  const decayed = solarPayback({ ...input, degradation: 0.005 });
  assert.ok(decayed.totalSaving < r.totalSaving);
  assert.ok(Math.abs(decayed.rows[0].saving - one) < 1e-9, '1년차는 감소 전이라 같아야 한다');
  for (let i = 1; i < decayed.rows.length; i++) {
    assert.ok(decayed.rows[i].saving < decayed.rows[i - 1].saving, `${i + 1}년차 절감액이 안 줄었다`);
  }
});

test('발전량이 사용량을 넘으면 남는 발전은 버려진다', () => {
  /*
   * 작은 집(월 100kWh)에 큰 설비(3kW)를 달면 월 319kWh를 만들어 100kWh밖에
   * 못 쓴다. 요금이 0원 밑으로 내려갈 수는 없고, 사용량이 0이 되어도 기본요금은
   * 남으므로 절감액은 전기요금 총액보다 반드시 작다.
   */
  const r = solarPayback({ capacityKw: 3, installCost: 4_000_000, monthlyKwh: 100, sunHours: 3.5, degradation: 0.005, years: 20 });
  const yearlyBill = calcElectricity(100).total * 12;

  for (const row of r.rows) {
    assert.ok(row.wastedKwh > 0, `${row.year}년차에 남는 발전이 없다`);
    assert.ok(row.saving < yearlyBill, `${row.year}년차 절감액 ${row.saving}원이 요금 총액 ${yearlyBill}원을 넘었다`);
  }
  // 사용량을 다 지운 값과 정확히 같다 — 기본요금만 남는다
  assert.ok(Math.abs(r.rows[0].saving - (calcElectricity(100).total - calcElectricity(0).total) * 12) < 1e-9);
  assert.ok(Math.abs(r.billAfter - calcElectricity(0).total) < 1e-9);

  // 설비를 더 키워도 절감액은 더 늘지 않는다 — 이미 다 깎았다
  const bigger = solarPayback({ capacityKw: 6, installCost: 8_000_000, monthlyKwh: 100, sunHours: 3.5, degradation: 0.005, years: 20 });
  assert.ok(Math.abs(bigger.rows[0].saving - r.rows[0].saving) < 1e-9);

  // 어떤 조합에서도 절감액이 요금 총액을 넘지 않는다
  for (const kwh of [50, 100, 200, 350, 500, 900]) {
    for (const capacity of [0.4, 1, 3, 6, 20]) {
      const s = yearSaving(kwh, annualGeneration(capacity, 3.5));
      assert.ok(s < calcElectricity(kwh).total * 12, `${kwh}kWh · ${capacity}kW`);
      assert.ok(s >= 0, `${kwh}kWh · ${capacity}kW에서 절감액이 음수다`);
    }
  }
});

test('회수 기간을 되짚으면 설치비에 닿는다', () => {
  const input = { capacityKw: 3, installCost: 3_000_000, monthlyKwh: 500, sunHours: 3.5, degradation: 0.005, years: 20 };
  const r = solarPayback(input);
  const p = r.paybackYears as number;
  assert.ok(p !== null && p > 0 && p <= input.years, `회수 기간이 이상하다: ${p}`);

  // 그 시점까지의 누적 절감액이 설치비다
  assert.ok(Math.abs(cumulativeSaving(input, p) - input.installCost) < 1, `${cumulativeSaving(input, p)}원`);

  // 표로도 앞뒤를 물린다 — 회수하는 해에 처음 넘어서고, 그 앞 해까지는 못 닿는다
  const before = r.rows[Math.floor(p) - 1];
  const after = r.rows[Math.ceil(p) - 1];
  if (before) assert.ok(before.cumulative <= input.installCost, `${before.year}년차에 이미 넘었다`);
  assert.ok(after.cumulative >= input.installCost, `${after.year}년차에도 못 닿았다`);

  // 설치비가 두 배면 회수 기간도 대략 두 배다(감소율이 있어 조금 더 걸린다)
  const twice = paybackYears({ ...input, installCost: input.installCost * 2 }) as number;
  assert.ok(twice > p * 2 - 0.01 && twice < p * 2 + 0.5, `${p} → ${twice}`);

  // 순이익은 누적 절감액에서 설치비를 뺀 값이다
  assert.ok(Math.abs(r.netProfit - (r.totalSaving - input.installCost)) < 1e-9);
  assert.ok(r.netProfit > 0, '20년을 두고도 못 뽑았다면 셈이 틀렸다');

  // 여러 조합에서도 되짚기가 성립한다
  for (const monthlyKwh of [250, 400, 600]) {
    for (const degradation of [0, 0.005, 0.01]) {
      const i2 = { ...input, monthlyKwh, degradation };
      const p2 = paybackYears(i2);
      assert.ok(p2 !== null, `${monthlyKwh}kWh · ${degradation}에서 null이 나왔다`);
      assert.ok(Math.abs(cumulativeSaving(i2, p2 as number) - i2.installCost) < 1, `${monthlyKwh}kWh · ${degradation}`);
    }
  }
});

test('보유 연수 안에 못 뽑으면 null이다', () => {
  // 설치비 2,000만원 · 1kW · 월 200kWh면 연 17만원쯤 아낀다 — 10년으로는 어림없다
  const input = { capacityKw: 1, installCost: 20_000_000, monthlyKwh: 200, sunHours: 3.5, degradation: 0.005, years: 10 };
  const r = solarPayback(input);
  assert.equal(r.paybackYears, null, '못 닿았는데 숫자를 지어냈다');
  assert.ok(r.totalSaving < input.installCost);
  assert.ok(r.netProfit < 0);

  // 연수를 늘려도 누적이 설치비에 못 미치면 여전히 null이다
  assert.equal(paybackYears({ ...input, years: 30 }), null);
  // 설치비를 누적 절감액 아래로 내리면 그때는 값이 나온다
  const ok = paybackYears({ ...input, installCost: r.totalSaving * 0.9 });
  assert.ok(ok !== null && (ok as number) <= input.years);

  // 발전이 아예 없으면(용량 0) 절감도 회수도 없다
  const none = solarPayback({ ...input, capacityKw: 0 });
  assert.equal(none.totalSaving, 0);
  assert.equal(none.paybackYears, null);
  assert.equal(none.effectiveRate, 0);
});
