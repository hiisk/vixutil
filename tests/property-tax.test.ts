/**
 * 재산세 — 누적 세액을 앞 구간의 합으로 되짚고, 세목 셋을 나눠 센다.
 *
 * ── 왜 이 검사가 뒤늦게 생겼나 (2026-08-13) ─────────────────
 * 같은 세율표가 두 곳에 있었다 — 재산세 계산기 페이지와 lib/holding-tax.ts.
 * 페이지 쪽은 클라이언트 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 보지
 * 못했다.** 같은 자리에서 취득세 100배 버그, 종부세 절벽 버그, 복비 경계 버그가
 * 나왔다. 표를 lib/property-tax.ts 한 곳으로 모으고 이 검사를 세웠다.
 *
 * 옮기는 과정에서 흠 둘을 함께 고쳤다.
 *
 *   ① 보유세 계산기가 **도시지역분을 세지 않았다** — 합계에서 빠져 있었다
 *   ② 종부세에서 공제하는 재산세를 **지방교육세까지 포함해** 셌다. 법이 공제하는
 *      것은 본세뿐이라, 종부세가 그만큼 적게 나왔다
 *
 * ── 이 검사가 무엇을 상대로 두나 ───────────────────────────
 * 누적 세액 6만·19.5만·57만은 옮겨 적은 숫자라 한 자리만 틀려도 그럴듯하다.
 * 그래서 **앞 구간을 직접 더해** 되짚는다 — 표를 다시 적는 것이 아니라 표에서
 * 따라 나와야 하는 값을 센다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CITY_AREA_RATE, EDU_TAX_RATE, FAIR_RATE_DEFAULT, ONE_HOUSE_FAIR_RATES, PROPERTY_BRACKETS,
  calcPropertyTax, propertyFairRate, propertyTax,
} from '../lib/property-tax.ts';
import { calcHoldingTax } from '../lib/holding-tax.ts';

const ROOT = join(import.meta.dirname, '..');

test('구간의 누적 세액이 앞 구간을 더한 값과 같다', () => {
  /*
   * 표에 적힌 base(0·6만·19.5만·57만)를 앞 구간에서 직접 쌓아 되짚는다. 표를
   * 옮겨 적는 검사는 표가 틀렸을 때 나란히 틀린다.
   */
  let acc = 0;
  let prev = 0;
  for (const { limit, rate, base } of PROPERTY_BRACKETS) {
    assert.ok(Math.abs(base - acc) < 1e-9,
      `${limit / 1e8}억 구간의 누적액이 ${base}인데 앞 구간을 더하면 ${acc}다`);
    if (!Number.isFinite(limit)) break;
    acc += (limit - prev) * rate;
    prev = limit;
  }
});

test('경계에서 세금이 튀지 않는다', () => {
  for (const { limit } of PROPERTY_BRACKETS) {
    if (!Number.isFinite(limit)) continue;
    const jump = propertyTax(limit + 1) - propertyTax(limit);
    assert.ok(jump >= 0 && jump < 0.01, `${limit / 1e8}억에서 ${jump}원 뛰었다`);
  }
  assert.equal(propertyTax(0), 0);
  assert.equal(propertyTax(-1), 0);
});

test('누진세율을 구간마다 손으로 더한 값과 맞댄다', () => {
  /* 함수를 다시 부르지 않고 정의로 되짚는다 */
  const byHand = (base: number) => {
    if (base <= 0) return 0;
    let tax = 0;
    let prev = 0;
    for (const { limit, rate } of PROPERTY_BRACKETS) {
      tax += (Math.min(base, limit) - prev) * rate;
      if (base <= limit) break;
      prev = limit;
    }
    return tax;
  };
  for (const base of [1, 30_000_000, 60_000_000, 100_000_000, 150_000_000, 250_000_000, 300_000_000, 900_000_000]) {
    assert.ok(Math.abs(propertyTax(base) - byHand(base)) < 1e-6,
      `${base}: ${propertyTax(base)} vs ${byHand(base)}`);
  }
  /* 널리 셈할 수 있는 값 — 과세표준 3억이면 19.5만 + 1.5억 × 0.25% = 57만원 */
  assert.equal(propertyTax(300_000_000), 570_000);
});

test('공정시장가액비율이 공시가격과 주택 수로 갈린다', () => {
  for (const { until, rate } of ONE_HOUSE_FAIR_RATES) {
    assert.equal(propertyFairRate(until, true), rate, `1주택 ${until / 1e8}억`);
    /* 경계 위는 다음 칸이다 */
    assert.notEqual(propertyFairRate(until + 1, true), rate);
  }
  assert.equal(propertyFairRate(1_000_000_000, true), FAIR_RATE_DEFAULT);
  for (const p of [100_000_000, 500_000_000, 900_000_000]) {
    assert.equal(propertyFairRate(p, false), FAIR_RATE_DEFAULT, '1주택이 아닌데 특례가 붙었다');
  }
  /* 특례는 낮춰 주는 것이므로 기본보다 크면 안 된다 */
  for (const { rate } of ONE_HOUSE_FAIR_RATES) {
    assert.ok(rate <= FAIR_RATE_DEFAULT, '특례 비율이 기본보다 크다');
  }
});

test('세목 셋이 각자 제 기준에 붙는다', () => {
  /*
   * 도시지역분은 **과세표준**에, 지방교육세는 **본세**에 붙는다. 둘의 기준을
   * 뒤바꾸면 금액이 그럴듯하게 나오지만 틀린다.
   */
  const r = calcPropertyTax({ publicPrice: 800_000_000, oneHouse: true });
  assert.ok(Math.abs(r.cityTax - r.taxBase * CITY_AREA_RATE) < 1e-9, '도시지역분이 과세표준 기준이 아니다');
  assert.ok(Math.abs(r.eduTax - r.base * EDU_TAX_RATE) < 1e-9, '지방교육세가 본세 기준이 아니다');
  assert.ok(Math.abs(r.total - (r.base + r.cityTax + r.eduTax)) < 1e-9, '합계가 세목의 합과 다르다');
  assert.ok(Math.abs(r.taxBase - 800_000_000 * r.fairRate) < 1e-9);

  /* 도시지역 밖이면 도시지역분이 0이고 합계가 그만큼 줄어든다 */
  const out = calcPropertyTax({ publicPrice: 800_000_000, oneHouse: true, cityArea: false });
  assert.equal(out.cityTax, 0);
  assert.equal(out.base, r.base, '도시지역 여부가 본세를 바꿨다');
  assert.ok(Math.abs(out.total - (r.total - r.cityTax)) < 1e-9);
});

test('공시가격이 오르면 세금이 줄지 않는다', () => {
  /* 1주택 특례가 구간을 넘을 때 비율이 올라가므로 단조증가여야 한다 */
  for (const oneHouse of [true, false]) {
    let prev = -1;
    for (let p = 0; p <= 2_000_000_000; p += 10_000_000) {
      const now = calcPropertyTax({ publicPrice: p, oneHouse }).total;
      assert.ok(now >= prev - 1e-9, `${oneHouse}: ${p / 1e8}억에서 세금이 줄었다`);
      prev = now;
    }
  }
});

test('보유세 계산기가 도시지역분을 함께 센다', () => {
  /*
   * 전에는 보유세 합계에서 도시지역분이 빠져 있었다. 같은 공시가격으로 두 계산기를
   * 맞대어 재산세 부분이 어긋나지 않는지 본다 — 여기서 갈라지면 표가 다시 두 벌이
   * 됐다는 뜻이다.
   */
  for (const publicPrice of [500_000_000, 1_500_000_000, 3_000_000_000]) {
    const prop = calcPropertyTax({ publicPrice, oneHouse: true });
    const hold = calcHoldingTax({ publicPrice, oneHouse: true });
    assert.ok(Math.abs(hold.propertyTax - prop.total) < 1e-9,
      `${publicPrice / 1e8}억: 보유세의 재산세 ${hold.propertyTax} vs 재산세 계산기 ${prop.total}`);
    assert.ok(Math.abs(hold.propertyBase - prop.taxBase) < 1e-9, '과세표준이 갈렸다');
    assert.ok(prop.cityTax > 0, '도시지역분이 0이다 — 기본값이 바뀌었다');
  }
});

test('종부세 공제는 본세만 상대로 한다', () => {
  /*
   * 법이 공제하는 것은 재산세 **본세**다. 지방교육세·도시지역분까지 넣어 공제하면
   * 종부세가 적게 나온다 — 원래 그랬던 것을 고쳤으므로 되돌아가지 않는지 본다.
   */
  const publicPrice = 3_000_000_000;
  const prop = calcPropertyTax({ publicPrice, oneHouse: true });
  const hold = calcHoldingTax({ publicPrice, oneHouse: true });
  const overlap = hold.jongbuBase / hold.propertyBase;

  assert.ok(Math.abs(hold.credit - prop.base * overlap) < 1e-6, '공제가 본세 기준이 아니다');
  /* 합계로 공제하면 더 많이 깎인다 — 그 값과 달라야 한다 */
  assert.ok(hold.credit < prop.total * overlap, '고지서 합계로 공제하고 있다');
});

test('페이지에 세율표가 되살아나지 않았다', () => {
  const page = readFileSync(
    join(ROOT, 'app', '(ko)', 'calculator', 'property-tax', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/property-tax'/, '페이지가 lib을 안 쓴다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/60_000 \+/.test(code), '페이지에 누적 세액이 되살아났다');
  assert.ok(!/0\.0014/.test(code), '페이지에 도시지역분 요율이 되살아났다');
  assert.ok(!/fairRate = 0\.\d/.test(code), '페이지에 공정시장가액비율이 되살아났다');
});
