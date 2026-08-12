/**
 * 취득세 — 널리 인용되는 합계 세율로 밖에서 확인한다.
 *
 * ── 2026-08-12에 무엇이 있었나 ────────────────────────────
 * 6~9억 구간 세율 산식이 `app/(ko)/calculator/acquisition-tax/page.tsx` 안에
 * 박혀 있었고, 나눗수를 3억이 아니라 **300만**으로 적어 두었다. 그래서
 *
 *   6억 → 397%   7억 → 463.67%   9억 → 597%
 *
 * 가 나왔다. **7억 주택의 취득세가 32억으로 표시되고 있었다.** tsc도 빌드도
 * 통과했고 검사 3,013개 중 어느 것도 이 페이지를 보지 않았다 — 셈이 클라이언트
 * 페이지 안에 있어 node가 불러올 수 없었기 때문이다.
 *
 * 그래서 세율을 lib/home-buying-cost.ts로 끌어내 두 계산기가 같은 함수를
 * 쓰게 했다. 이 검사가 지키는 것은 두 가지다 — 경계에서 값이 이어지는지,
 * 그리고 **합계 세율이 밖에서 아는 값과 맞는지**다. 두 번째가 중요하다.
 * 산식만 검사하면 "자기와 일관된 틀린 값"을 잡을 수 없다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  AREA_LIMIT, HEAVY_EDU_RATE, NON_HOUSING_RATES, RATE_HIGH, RATE_LOW,
  housingAcqRate, housingRatesFor, isHeavyRate,
} from '../lib/home-buying-cost.ts';
import { APP_DIR } from './app-path.ts';

/** 세율 셋을 더한 합계(%) — 이것이 밖에서 인용되는 값이다 */
const total = (price: number, overArea: boolean, rate?: number) => {
  const r = housingRatesFor(rate ?? housingAcqRate(price), overArea);
  return (r.acquisition + r.eduLocal + r.rural) * 100;
};

test('널리 인용되는 주택 합계 세율과 맞는다', () => {
  /*
   * 이 표가 이 검사의 전부다. 실무에서 "1.1%", "3.3%", "9%"로 부르는 값들이고,
   * 산식이 자기 안에서만 일관된 틀린 값일 때 여기서 걸린다.
   */
  const cases: [string, number, number][] = [
    // 1주택 표준 — 85㎡ 이하
    ['6억 이하 · 85㎡ 이하', total(500_000_000, false), 1.1],
    ['9억 초과 · 85㎡ 이하', total(1_000_000_000, false), 3.3],
    // 85㎡ 초과는 농어촌특별세 0.2%가 붙는다
    ['6억 이하 · 85㎡ 초과', total(500_000_000, true), 1.3],
    ['9억 초과 · 85㎡ 초과', total(1_000_000_000, true), 3.5],
    // 중과 — 지방교육세가 0.4% 고정이다
    ['8% 중과 · 85㎡ 이하', total(0, false, 0.08), 8.4],
    ['8% 중과 · 85㎡ 초과', total(0, true, 0.08), 9.0],
    ['12% 중과 · 85㎡ 이하', total(0, false, 0.12), 12.4],
    ['12% 중과 · 85㎡ 초과', total(0, true, 0.12), 13.4],
  ];
  for (const [label, got, want] of cases) {
    assert.ok(Math.abs(got - want) < 1e-9, `${label}: ${got.toFixed(2)}% (${want}%이어야)`);
  }
});

test('비주택은 4.6%다', () => {
  const r = NON_HOUSING_RATES;
  assert.equal(r.acquisition, 0.04);
  assert.ok(Math.abs((r.acquisition + r.eduLocal + r.rural) * 100 - 4.6) < 1e-9);
  // 지방교육세 0.4%와 농어촌특별세 0.2%를 서로 바꿔 적어도 합계는 4.6%가 된다.
  // 그래서 항목별로도 못 박아 둔다 — 2026-08-12까지 이 둘이 뒤바뀌어 있었다.
  assert.equal(r.eduLocal, 0.004);
  assert.equal(r.rural, 0.002);
});

test('6억과 9억에서 산식이 정확히 이어진다', () => {
  /* 계단이 아니라 매끄럽게 오르는 산식이라, 경계에서 양쪽 값이 만나야 한다 */
  assert.equal(housingAcqRate(600_000_000), RATE_LOW);
  assert.ok(Math.abs(housingAcqRate(900_000_000) - RATE_HIGH) < 1e-12);

  // 경계를 1원 넘어도 세율이 껑충 뛰지 않는다
  for (const edge of [600_000_000, 900_000_000]) {
    const a = housingAcqRate(edge);
    const b = housingAcqRate(edge + 1);
    assert.ok(Math.abs(b - a) < 1e-9, `${edge}에서 튀었다: ${a} → ${b}`);
  }
  // 7.5억이면 딱 2%다 — 산식이 6억~9억을 1%~3%로 반듯이 잇는지 본다
  assert.ok(Math.abs(housingAcqRate(750_000_000) - 0.02) < 1e-12, String(housingAcqRate(750_000_000)));
});

test('세율이 100배로 새지 않는다', () => {
  /*
   * 이것이 실제로 났던 사고다. 나눗수를 3억이 아니라 300만으로 적으면 세율이
   * 397~597%가 된다. 주택 취득세가 4%를 넘는 일은 중과 말고는 없으므로,
   * 표준 구간 전체를 훑어 그 상한을 지킨다.
   */
  for (let p = 0; p <= 2_000_000_000; p += 10_000_000) {
    const r = housingAcqRate(p);
    assert.ok(r >= RATE_LOW && r <= RATE_HIGH, `${p / 1e8}억에서 세율이 ${(r * 100).toFixed(2)}%다`);
  }
  assert.equal(isHeavyRate(0.03), false);
  assert.equal(isHeavyRate(0.08), true);
  assert.equal(isHeavyRate(0.12), true);
});

test('가격이 오르면 세율이 줄지 않는다', () => {
  let prev = 0;
  for (let p = 0; p <= 1_500_000_000; p += 5_000_000) {
    const r = housingAcqRate(p);
    assert.ok(r >= prev - 1e-12, `${p / 1e8}억에서 세율이 내려갔다`);
    prev = r;
  }
});

test('중과에서는 지방교육세가 취득세액에 비례하지 않는다', () => {
  /* 표준세율은 10%인데 중과는 0.4% 고정이다 — 두 규칙이 섞이면 여기서 걸린다 */
  const std = housingRatesFor(0.03, false);
  assert.ok(Math.abs(std.eduLocal - 0.003) < 1e-12);

  for (const heavy of [0.08, 0.12]) {
    assert.equal(housingRatesFor(heavy, false).eduLocal, HEAVY_EDU_RATE);
  }
});

test('취득세 페이지가 lib의 세율을 쓰고 옛 산식이 남아 있지 않다', () => {
  /*
   * 이 검사가 없으면 누군가 다시 페이지 안에 산식을 적어 넣어도 아무도 모른다.
   * 페이지는 클라이언트 컴포넌트라 node가 불러올 수 없으므로 원문을 읽어 본다.
   */
  const src = readFileSync(join(APP_DIR, '(ko)', 'calculator', 'acquisition-tax', 'page.tsx'), 'utf8');
  assert.match(src, /from '@\/lib\/home-buying-cost'/, '세율을 lib에서 안 가져온다');
  assert.match(src, /housingRatesFor/, '세율 셋을 lib에서 안 만든다');
  assert.ok(!src.includes('3_000_000'), '100배로 새던 옛 나눗수가 남아 있다');
  assert.ok(!/rate \* 0\.2/.test(src), '지방교육세를 취득세율의 20%로 적은 옛 코드가 남아 있다');
  // 농어촌특별세는 국민주택규모를 넘을 때만 붙으므로 면적 입력이 있어야 한다
  assert.ok(src.includes('overArea'), `전용면적 ${AREA_LIMIT}㎡ 입력이 없다 — 농어촌특별세가 늘 붙는다`);
});
