/**
 * 장기요양 본인부담금 — 한도 경계와 감경을 밟아 본다.
 *
 *  - 한도 안에서는 본인부담금이 이용액 × 부담률과 정확히 같아야 한다
 *  - 한도를 넘긴 뒤로는 넘은 만큼이 전액 붙는다. 그 경계에서 총액이 튀지 않고
 *    기울기만 15%에서 100%로 바뀌는지 1원 차이로 밟아 본다
 *  - 감경은 부담률만 낮추고 비급여는 건드리지 않는다 — 감경 대상에 비급여를
 *    넣으면 여기서 걸린다
 *  - maxUsableFor는 calcCopay를 되짚은 것이므로 왕복시키면 예산에 닿아야 한다
 *
 * 월 한도액은 해마다 고시되므로 검사에서도 값을 직접 넣는다 — 규칙만 본다.
 * 여기 적힌 금액은 셈을 확인하려고 고른 값이고 고시값이 아니다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  type CopayInput, type Relief, RELIEF_RATES, SERVICE_RATES,
  calcCopay, effectiveRate, maxUsableFor,
} from '../lib/ltc-copay.ts';

const base: CopayInput = {
  kind: 'home',
  used: 1_000_000,
  limit: 1_500_000,
  relief: 'none',
  nonBenefit: 0,
};

const RELIEFS: Relief[] = ['none', 'cut40', 'cut60', 'exempt'];

test('한도 안에서는 이용액 × 부담률이 그대로 본인부담금이다', () => {
  const r = calcCopay(base);
  assert.equal(r.covered, 1_000_000);
  assert.equal(r.excess, 0);
  assert.equal(r.rate, SERVICE_RATES.home);
  assert.equal(r.copay, 1_000_000 * SERVICE_RATES.home);
  assert.equal(r.copay, 150_000);
  // 비급여가 없으면 총액은 본인부담금뿐이다
  assert.equal(r.total, r.copay);

  // 한도에 딱 닿아도 초과분은 0이다
  const atLimit = calcCopay({ ...base, used: base.limit });
  assert.equal(atLimit.excess, 0);
  assert.equal(atLimit.copay, base.limit * SERVICE_RATES.home);
});

test('한도를 넘긴 만큼은 전액이 더 붙는다', () => {
  const r = calcCopay({ ...base, used: base.limit + 200_000 });
  assert.equal(r.covered, base.limit, '급여 대상은 한도까지다');
  assert.equal(r.excess, 200_000);
  // 초과분에는 부담률을 매기지 않는다 — 20만원이 그대로 얹힌다
  assert.equal(r.copay, base.limit * SERVICE_RATES.home);
  assert.ok(Math.abs(r.total - (base.limit * SERVICE_RATES.home + 200_000)) < 1e-6);

  // 초과분은 감경과도 무관하다 — 급여가 아니라서 깎아 줄 대상이 아니다
  const cut = calcCopay({ ...base, used: base.limit + 200_000, relief: 'cut60' });
  assert.equal(cut.excess, 200_000);
});

test('한도 경계를 1원 차이로 밟아도 총액이 튀지 않는다', () => {
  /*
   * 한도 안에서 1원을 더 쓰면 내 몫은 15전만 늘고, 한도를 넘긴 뒤 1원을 더 쓰면
   * 그 1원이 그대로 내 돈이다. 경계에서 총액이 왕창 튀는 게 아니라 그 뒤로 붙는
   * 기울기가 바뀌는 것이다 — 늘어난 1원 중 15전은 원래 늘 자리였고, 남은 85전이
   * 한도를 넘긴 대가다.
   */
  const at = calcCopay({ ...base, used: base.limit });
  const over = calcCopay({ ...base, used: base.limit + 1 });
  const jump = over.total - at.total;

  assert.ok(Math.abs(jump - 1) < 1e-6, `경계에서 총액이 ${jump}원 움직였다`);
  assert.ok(Math.abs(jump - SERVICE_RATES.home - 0.85) < 1e-6, '넘긴 대가가 85전이 아니다');
  // 넘겼다고 급여분 본인부담금이 다시 매겨지지는 않는다
  assert.equal(over.copay, at.copay);

  // 한도 안쪽 기울기는 부담률, 바깥쪽 기울기는 1이다
  const inside = calcCopay({ ...base, used: base.limit - 1 });
  assert.ok(Math.abs(at.total - inside.total - SERVICE_RATES.home) < 1e-6);
  const further = calcCopay({ ...base, used: base.limit + 2 });
  assert.ok(Math.abs(further.total - over.total - 1) < 1e-6);
});

test('감경은 부담률을 그 비율만큼 낮추고 면제면 0이 된다', () => {
  const full = calcCopay(base);
  for (const relief of RELIEFS) {
    const r = calcCopay({ ...base, relief });
    const keep = 1 - RELIEF_RATES[relief];
    assert.ok(Math.abs(r.rate - SERVICE_RATES.home * keep) < 1e-12, relief);
    assert.ok(Math.abs(r.copay - full.copay * keep) < 1e-6, `${relief}: ${r.copay}`);
    // 감경으로 덜 낸 금액과 실제 낸 금액을 합치면 감경 없을 때와 같다
    assert.ok(Math.abs(r.copay + r.reliefSaved - full.copay) < 1e-6, relief);
  }

  // 60% 감경이면 재가 15%가 6%가 된다
  assert.ok(Math.abs(effectiveRate('home', 'cut60') - 0.06) < 1e-12);
  // 기초생활수급자는 급여 몫이 0이다
  const exempt = calcCopay({ ...base, relief: 'exempt' });
  assert.equal(exempt.rate, 0);
  assert.equal(exempt.copay, 0);
  assert.equal(exempt.total, 0);
});

test('재가 15%와 시설 20%의 차이가 금액에 나타난다', () => {
  assert.equal(SERVICE_RATES.home, 0.15);
  assert.equal(SERVICE_RATES.facility, 0.2);

  const home = calcCopay(base);
  const facility = calcCopay({ ...base, kind: 'facility' });
  assert.equal(home.copay, 150_000);
  assert.equal(facility.copay, 200_000);
  assert.ok(facility.total > home.total, '시설이 더 비싸게 나와야 한다');
  assert.ok(Math.abs(facility.copay / home.copay - 4 / 3) < 1e-9);

  // 감경을 걸어도 두 종류의 차이는 그대로 남는다
  for (const relief of RELIEFS.filter(r => r !== 'exempt')) {
    const h = calcCopay({ ...base, relief });
    const f = calcCopay({ ...base, kind: 'facility', relief });
    assert.ok(f.copay > h.copay, relief);
  }
});

test('비급여는 부담률·감경과 무관하게 전액 더해진다', () => {
  const meal = 600_000;
  for (const kind of ['home', 'facility'] as const) {
    for (const relief of RELIEFS) {
      const bare = calcCopay({ ...base, kind, relief });
      const withMeal = calcCopay({ ...base, kind, relief, nonBenefit: meal });
      assert.equal(withMeal.nonBenefit, meal);
      // 비급여를 감경 대상에 넣었다면 이 차이가 meal보다 작아진다
      assert.ok(Math.abs(withMeal.total - bare.total - meal) < 1e-6, `${kind}/${relief}`);
      assert.equal(withMeal.copay, bare.copay, '비급여가 급여분 부담금을 건드렸다');
    }
  }

  // 면제 대상자도 식사재료비·상급침실료는 낸다
  const exempt = calcCopay({ ...base, kind: 'facility', relief: 'exempt', nonBenefit: meal });
  assert.equal(exempt.copay, 0);
  assert.equal(exempt.total, meal);
});

test('이용액 0, 한도 0에서도 무너지지 않는다', () => {
  const none = calcCopay({ ...base, used: 0 });
  assert.equal(none.covered, 0);
  assert.equal(none.excess, 0);
  assert.equal(none.copay, 0);
  assert.equal(none.total, 0);

  // 한도가 0이면 쓴 돈 전부가 초과분이다 — 전액 본인 부담
  const noLimit = calcCopay({ ...base, limit: 0 });
  assert.equal(noLimit.covered, 0);
  assert.equal(noLimit.excess, base.used);
  assert.equal(noLimit.copay, 0);
  assert.equal(noLimit.total, base.used);

  // 둘 다 0이면 0이다
  assert.equal(calcCopay({ ...base, used: 0, limit: 0 }).total, 0);
  // 이용액이 0이면 비급여만 남는다
  assert.equal(calcCopay({ ...base, used: 0, nonBenefit: 400_000 }).total, 400_000);
  // 음수를 넣어도 음수 부담금이 나오지 않는다
  const minus = calcCopay({ ...base, used: -500_000, nonBenefit: -100_000 });
  assert.equal(minus.total, 0);
});

test('예산으로 되짚은 이용액을 다시 넣으면 그 예산에 닿는다', () => {
  for (const kind of ['home', 'facility'] as const) {
    for (const relief of RELIEFS) {
      for (const nonBenefit of [0, 500_000]) {
        for (const extra of [10_000, 300_000, 2_000_000]) {
          const input = { ...base, kind, relief, nonBenefit };
          const budget = nonBenefit + extra;
          const usable = maxUsableFor(input, budget);
          const cost = calcCopay({ ...input, used: usable }).total;
          assert.ok(
            Math.abs(cost - budget) < 1e-6,
            `${kind}/${relief}/비급여 ${nonBenefit}: 예산 ${budget}인데 ${cost}가 든다`,
          );
        }
      }
    }
  }

  // 예산이 한도 안에서 해결되면 초과분 없이 예산 ÷ 부담률까지 쓸 수 있다
  const within = maxUsableFor(base, 150_000);
  assert.ok(Math.abs(within - 1_000_000) < 1e-6);
  // 한도를 채운 뒤로는 예산이 1:1로 들어간다
  const beyond = maxUsableFor(base, base.limit * SERVICE_RATES.home + 100_000);
  assert.ok(Math.abs(beyond - (base.limit + 100_000)) < 1e-6);
  // 면제면 돈을 안 써도 한도까지는 쓸 수 있다
  assert.equal(maxUsableFor({ ...base, relief: 'exempt' }, 0), base.limit);
  // 비급여가 예산을 다 먹으면 급여는 못 쓴다
  assert.equal(maxUsableFor({ ...base, nonBenefit: 400_000 }, 300_000), 0);
});
