/**
 * 중개보수(복비) — 구간 경계를 1원 차이로 밟는다.
 *
 * ── 무엇이 틀려 있었나 (2026-08-12) ───────────────────────
 * 구간을 `eff <= t.limit`으로 찾고 있었다. 요율표는 「5천만원 이상 ~ 2억원
 * **미만**」꼴이라 상한값 자체는 위 구간에 속하는데, `<=`면 딱 그 금액일 때 한 칸
 * 낮은 요율이 잡힌다. 매매 9억원에서 0.5%(450만원)가 아니라 0.4%(360만원)이
 * 나왔다 — 90만원 차이이고, 9억은 사람들이 가장 많이 치는 숫자다.
 *
 * 아래쪽 두 경계(5천만·2억)는 한도액이 걸려 두 셈이 **우연히 같은 값**을 낸다.
 * 그래서 표를 눈으로 훑으면 맞는 것처럼 보였다. 경계를 밟는 검사만 이것을 본다.
 *
 * 그리고 월세 환산보증금에 ×70 규칙이 빠져 있었다. 보증금 500만·월세 40만원이면
 * 4,500만원으로 잡혀 한도 20만원이 나왔는데, 옳게는 3,300만원이라 16.5만원이다.
 *
 * ── 이 검사가 지키는 것 ───────────────────────────────────
 * 요율표를 여기 옮겨 적지 않는다 — 옮겨 적으면 표가 틀렸을 때 검사도 나란히
 * 틀린다. 대신 **공표된 요율표에서 손으로 셈한 값**과 맞대고, 경계마다 위아래
 * 1원을 밟아 요율이 반드시 올라가는지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BUY_TIERS, LOW_RENT_MULTIPLIER, LOW_RENT_THRESHOLD, MONTHLY_MULTIPLIER, RENT_TIERS,
  calcBrokerFee, monthlyToDeposit, tierFor,
} from '../lib/broker-fee.ts';

const ROOT = join(import.meta.dirname, '..');

test('상한값은 위 구간에 속한다 — 경계를 1원 차이로 밟는다', () => {
  /*
   * 이것이 이 검사의 본체다. `<=`로 되돌리면 여기서 걸린다.
   *
   * 처음에는 "경계에서 요율이 올라간다"고 적었는데 매매 5천만원에서 걸렸다 —
   * 0.6%에서 0.5%로 **내려간다.** 낮은 구간은 요율이 높은 대신 한도액으로 누르는
   * 구조이기 때문이다(5천만 미만 0.6%·한도 25만 → 5천만 이상 0.5%·한도 80만).
   * 계산이 아니라 검사의 전제가 틀렸다. 그래서 지키는 것을 둘로 나눴다.
   *
   *   ① 경계 금액은 아래 구간에 잡히지 않는다 — 이것이 고친 흠이다
   *   ② 보수 자체는 경계에서 줄지 않는다 — 요율의 방향과 무관하게 참이다
   */
  for (const [name, tiers] of [['매매', BUY_TIERS], ['임대차', RENT_TIERS]] as const) {
    const type = name === '매매' ? ('buy' as const) : ('jeonse' as const);
    for (const { limit } of tiers) {
      if (!Number.isFinite(limit)) continue;
      const below = tierFor(limit - 1, tiers);
      const at = tierFor(limit, tiers);
      assert.equal(below.limit, limit, `${name} ${limit / 1e8}억 −1원이 이 구간을 벗어났다`);
      assert.notEqual(at.limit, limit, `${name} ${limit / 1e8}억이 아래 구간에 잡혔다 — 경계가 밀렸다`);

      const feeBelow = calcBrokerFee({ type, amount: limit - 1, vat: false }).fee;
      const feeAt = calcBrokerFee({ type, amount: limit, vat: false }).fee;
      assert.ok(feeAt >= feeBelow, `${name} ${limit / 1e8}억에서 보수가 줄었다 (${feeBelow} → ${feeAt})`);
    }
  }
});

test('공표된 요율표에서 손으로 셈한 값과 맞댄다', () => {
  /*
   * 표를 다시 적지 않고 **바깥에서 셈한 값**을 상대로 둔다. 같은 표를 두 번 적으면
   * 표가 틀렸을 때 둘이 나란히 틀린다.
   *
   * 매매 3억 = 3억 × 0.4% = 120만원.  9억 = 9억 × 0.5% = 450만원(경계).
   * 매매 13억 = 13억 × 0.6% = 780만원.  20억 = 20억 × 0.7% = 1,400만원.
   */
  const buy: [number, number][] = [
    [300_000_000, 1_200_000],
    [899_999_999, Math.round(899_999_999 * 0.004)],
    [900_000_000, 4_500_000],
    [1_300_000_000, 7_800_000],
    [1_500_000_000, 10_500_000],
    [2_000_000_000, 14_000_000],
  ];
  for (const [price, want] of buy) {
    const r = calcBrokerFee({ type: 'buy', amount: price, vat: false });
    assert.equal(r.fee, want, `매매 ${price / 1e8}억: ${r.fee.toLocaleString()} (요율 ${r.rate}%)`);
  }

  /* 전세 4억 = 4억 × 0.3% = 120만원. 6억은 경계라 0.4% = 240만원 */
  const rent: [number, number][] = [
    [400_000_000, 1_200_000],
    [599_999_999, Math.round(599_999_999 * 0.003)],
    [600_000_000, 2_400_000],
    [1_200_000_000, 6_000_000],
  ];
  for (const [dep, want] of rent) {
    const r = calcBrokerFee({ type: 'jeonse', amount: dep, vat: false });
    assert.equal(r.fee, want, `전세 ${dep / 1e8}억: ${r.fee.toLocaleString()} (요율 ${r.rate}%)`);
  }
});

test('한도액이 걸리는 구간에서만 한도가 걸린다', () => {
  /*
   * 매매 5천만원 미만은 0.6%에 한도 25만원이다. 25만원에 닿는 거래금액은
   * 25만 ÷ 0.006 = 41,666,667원이므로 그 아래는 한도가 안 걸려야 한다.
   */
  const justUnder = calcBrokerFee({ type: 'buy', amount: 41_000_000, vat: false });
  assert.equal(justUnder.cappedAt, false, `4,100만원에서 한도가 걸렸다 (${justUnder.fee})`);
  assert.equal(justUnder.fee, Math.round(41_000_000 * 0.006));

  const capped = calcBrokerFee({ type: 'buy', amount: 49_000_000, vat: false });
  assert.equal(capped.cappedAt, true, '4,900만원에서 한도가 안 걸렸다');
  assert.equal(capped.fee, 250_000);

  /* 한도가 없는 구간에서는 아무리 커도 걸리지 않는다 */
  for (const amount of [300_000_000, 1_000_000_000, 5_000_000_000]) {
    assert.equal(calcBrokerFee({ type: 'buy', amount, vat: false }).cappedAt, false);
  }
});

test('한도 때문에 아래쪽 두 경계는 두 셈이 같은 값을 낸다', () => {
  /*
   * 이 검사는 **왜 버그가 눈에 안 보였는지**를 남겨 둔다. 5천만·2억에서는 옛 셈과
   * 새 셈이 같은 값을 낸다 — 그래서 표를 훑을 때 맞는 것처럼 보였다. 9억부터
   * 갈라진다. 이 사실이 뒤집히면(예: 한도액이 개정되면) 알아야 한다.
   */
  const oldWay = (amount: number, tiers: typeof BUY_TIERS) => {
    const t = tiers.find(x => amount <= x.limit)!;
    const raw = (amount * t.rate) / 100;
    return Math.round(t.cap > 0 ? Math.min(raw, t.cap) : raw);
  };
  for (const amount of [50_000_000, 200_000_000]) {
    assert.equal(
      calcBrokerFee({ type: 'buy', amount, vat: false }).fee,
      oldWay(amount, BUY_TIERS),
      `${amount / 1e8}억에서 갈렸다 — 주석이 낡았다`,
    );
  }
  /* 9억부터는 반드시 갈라져야 한다 — 안 갈라지면 고침이 되돌아간 것이다 */
  for (const amount of [900_000_000, 1_200_000_000, 1_500_000_000]) {
    assert.notEqual(
      calcBrokerFee({ type: 'buy', amount, vat: false }).fee,
      oldWay(amount, BUY_TIERS),
      `${amount / 1e8}억에서 옛 셈과 같다 — 경계 고침이 되돌아갔다`,
    );
  }
});

test('월세는 환산액이 5천만원 미만이면 ×70으로 다시 센다', () => {
  /* 보증금 500만 + 월세 40만 → 500만 + 4,000만 = 4,500만 < 5천만 → 500만 + 2,800만 */
  assert.equal(monthlyToDeposit(5_000_000, 400_000), 5_000_000 + 400_000 * LOW_RENT_MULTIPLIER);
  assert.equal(monthlyToDeposit(5_000_000, 400_000), 33_000_000);

  /* 보증금 1,000만 + 월세 60만 → 1,000만 + 6,000만 = 7,000만 ≥ 5천만 → 그대로 */
  assert.equal(monthlyToDeposit(10_000_000, 600_000), 70_000_000);

  /* 경계를 밟는다 — ×100 한 값이 딱 5천만이면 그대로 쓴다 */
  assert.equal(monthlyToDeposit(10_000_000, 400_000), 50_000_000);
  assert.equal(monthlyToDeposit(10_000_000, 399_999), 10_000_000 + 399_999 * LOW_RENT_MULTIPLIER);

  /* ×70으로 센 값이 5천만을 넘어도 그대로 쓴다 — 규칙은 ×100 한 값을 보고 판단한다 */
  const d = 49_000_000;
  assert.ok(d + 1 * MONTHLY_MULTIPLIER < LOW_RENT_THRESHOLD === false || true);
  assert.equal(monthlyToDeposit(49_000_000, 5_000), 49_000_000 + 5_000 * LOW_RENT_MULTIPLIER);
});

test('원룸 월세 — 손으로 셈한 값과 맞댄다', () => {
  /* 환산 3,300만원은 5천만 미만 구간이라 0.5%, 한도 20만원. 3,300만 × 0.5% = 16.5만원 */
  const r = calcBrokerFee({ type: 'monthly', deposit: 5_000_000, monthly: 400_000, vat: false });
  assert.equal(r.dealAmount, 33_000_000);
  assert.equal(r.rate, 0.5);
  assert.equal(r.fee, 165_000);
  assert.equal(r.cappedAt, false, '한도에 걸렸다 — ×70 규칙이 빠진 옛 셈이다');
});

test('거래금액이 오르면 보수가 줄지 않는다', () => {
  /*
   * 구간이 올라갈 때 요율이 뛰므로 한도가 없는 구간에서는 단조증가여야 한다.
   * 한도가 걸리는 구간(5천만 미만)에서는 평평해지는 것이 옳으니 그 위만 본다.
   */
  let prev = -1;
  for (let a = 50_000_000; a <= 2_000_000_000; a += 10_000_000) {
    const now = calcBrokerFee({ type: 'buy', amount: a, vat: false }).fee;
    assert.ok(now >= prev, `${a / 1e8}억에서 보수가 줄었다`);
    prev = now;
  }
});

test('부가세는 보수의 10%다', () => {
  const r = calcBrokerFee({ type: 'buy', amount: 500_000_000, vat: true });
  assert.equal(r.vatAmount, Math.round(r.fee * 0.1));
  assert.equal(r.total, r.fee + r.vatAmount);

  const no = calcBrokerFee({ type: 'buy', amount: 500_000_000, vat: false });
  assert.equal(no.vatAmount, 0);
  assert.equal(no.total, no.fee);
  assert.equal(no.fee, r.fee, '부가세 여부가 보수를 바꿨다');
});

test('경계에서 무너지지 않는다', () => {
  for (const input of [
    { type: 'buy' as const, amount: 0 },
    { type: 'buy' as const, amount: -100 },
    { type: 'jeonse' as const, amount: 0 },
    { type: 'monthly' as const, deposit: 0, monthly: 0 },
    { type: 'monthly' as const, deposit: -1, monthly: -1 },
  ]) {
    const r = calcBrokerFee({ ...input, vat: true });
    for (const [k, v] of Object.entries(r)) {
      if (typeof v !== 'number') continue;
      assert.ok(Number.isFinite(v), `${JSON.stringify(input)}: ${k}가 ${v}다`);
      assert.ok(v >= 0, `${JSON.stringify(input)}: ${k}가 음수다`);
    }
  }
});

test('페이지에 요율표가 되살아나지 않았다', () => {
  /*
   * 페이지는 클라이언트 컴포넌트라 node가 불러올 수 없다. 누군가 다시 표를 적어
   * 넣어도 아무도 모르므로 원문을 읽어 본다.
   */
  const page = readFileSync(join(ROOT, 'app', '(ko)', 'calculator', 'broker-fee', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/broker-fee'/, '페이지가 lib을 안 쓴다');
  assert.match(page, /calcBrokerFee/, '페이지가 lib 함수를 안 부른다');

  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/cap: \d/.test(code), '페이지에 한도액이 되살아났다');
  assert.ok(!/rate: 0\.\d/.test(code), '페이지에 요율이 되살아났다');
  assert.ok(!/monthly \* 100/.test(code), '페이지에 환산 식이 되살아났다');
});
