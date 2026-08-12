/**
 * 보유세 — 구간 경계에서 세금이 튀지 않는지 본다.
 *
 * ── 무엇이 틀려 있었나 (2026-08-12) ───────────────────────
 * 종부세를 **초과누진이 아니라 전체 과세표준에 한 세율을 곱해** 내고 있었다.
 *
 *   const b = BRACKETS.find(br => base <= br.limit)!;
 *   return base * b.rate;
 *
 * 그래서 경계에서 절벽이 생겼다 — 과세표준 3억에서 **1원을 더 벌면 세금이
 * 60만원 늘었다**(150만 → 210만). 과다 계산의 폭도 컸다: 10억이면 240만원,
 * 20억이면 600만원.
 *
 * 셈이 클라이언트 페이지 안에 있어 node가 불러올 수 없었고, 그래서 검사
 * 3,013개 가운데 어느 것도 이 파일을 보지 못했다. 같은 날 취득세 계산기에서
 * 정확히 그 구조로 100배 버그를 찾았고, 그 뒤 같은 자리에 있는 계산기 일흔셋을
 * 훑다가 이것이 나왔다.
 *
 * ── 이 검사가 지키는 것 ───────────────────────────────────
 * **경계를 1원 차이로 밟는다.** 초과누진이면 1원 더 벌 때 세금이 그 구간
 * 세율만큼(1원의 2.7% 이하)만 늘어야 한다. 전체×세율로 되돌리면 그 자리에서
 * 60만원이 뛰어 걸린다. 절벽은 세법에 없는데 화면에는 그럴듯하게 나온다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  JONGBU_BRACKETS, ONE_HOUSE_EXEMPTION, OTHER_EXEMPTION, RURAL_ON_JONGBU,
  calcHoldingTax, jongbuTax, propertyFairRate, propertyTax,
} from '../lib/holding-tax.ts';
import { calcPropertyTax } from '../lib/property-tax.ts';

const ROOT = join(import.meta.dirname, '..');

test('종부세는 경계에서 튀지 않는다', () => {
  /* 이것이 이 검사의 본체다 — 전체×세율로 되돌리면 여기서 걸린다 */
  /*
   * 1원을 더 벌었을 때 세금이 1원보다 적게 늘어야 한다 — 세율이 100%를 넘을 수
   * 없으므로. 처음에는 "최고세율(2.7%) 이하"로 적었는데 94억 경계에서
   * 0.027000010013580322이 나와 걸렸다. 억 단위 누적에 부동소수점 오차가 남는
   * 것이라 계산이 아니라 검사가 너무 빡빡했다 — 1원으로 느슨하게 두어도 절벽은
   * 60만원이므로 여전히 잡힌다.
   */
  for (const { limit } of JONGBU_BRACKETS) {
    if (!Number.isFinite(limit)) continue;
    const at = jongbuTax(limit);
    const over = jongbuTax(limit + 1);
    assert.ok(over >= at, `${limit / 1e8}억에서 세금이 줄었다`);
    assert.ok(
      over - at < 1,
      `${limit / 1e8}억에서 1원 더 벌었는데 세금이 ${Math.round(over - at).toLocaleString()}원 뛰었다`,
    );
  }
});

test('종부세를 구간마다 손으로 더한 값과 맞댄다', () => {
  /*
   * 닫힌 셈이 없으니 구간을 하나씩 훑어 더한 값을 상대로 둔다. 함수를 그대로
   * 다시 부르면 둘이 나란히 틀려서 통과한다.
   */
  for (const base of [0, 1, 299_000_000, 300_000_000, 300_000_001, 600_000_000, 1_000_000_000, 3_000_000_000, 12_000_000_000]) {
    let want = 0;
    let prev = 0;
    for (const { limit, rate } of JONGBU_BRACKETS) {
      if (base <= prev) break;
      want += (Math.min(base, limit) - prev) * rate;
      prev = limit;
    }
    assert.ok(Math.abs(jongbuTax(base) - want) < 1e-6, `${base}: ${jongbuTax(base)} vs ${want}`);
  }
  // 널리 셈할 수 있는 값 — 6억이면 3억×0.5% + 3억×0.7% = 360만
  assert.equal(jongbuTax(600_000_000), 1_500_000 + 2_100_000);
  assert.equal(jongbuTax(300_000_000), 1_500_000);
  assert.equal(jongbuTax(0), 0);
  assert.equal(jongbuTax(-1), 0);
});

test('전체 과세표준에 한 세율을 곱한 것보다 늘 작거나 같다', () => {
  /*
   * 옛 셈이 얼마나 과다했는지를 검사에 남겨 둔다. 초과누진은 정의상 그 구간의
   * 세율을 전체에 매긴 것보다 작다(첫 구간만 같다).
   */
  const flat = (base: number) => {
    const b = JONGBU_BRACKETS.find(br => base <= br.limit)!;
    return base * b.rate;
  };
  for (const base of [600_000_000, 1_000_000_000, 2_000_000_000, 5_000_000_000]) {
    assert.ok(jongbuTax(base) < flat(base), `${base}에서 초과누진이 더 크다`);
  }
  // 첫 구간에서는 같다
  assert.equal(jongbuTax(200_000_000), flat(200_000_000));
});

test('재산세 구간의 누적액이 앞 구간의 합과 맞는다', () => {
  /*
   * 6만·19.5만·57만은 옮겨 적은 숫자라 한 자리만 틀려도 그럴듯하다. 앞 구간을
   * 직접 더해 되짚는다.
   */
  assert.equal(propertyTax(60_000_000), 60_000_000 * 0.001);
  assert.equal(propertyTax(150_000_000), 60_000 + 90_000_000 * 0.0015);
  assert.equal(propertyTax(300_000_000), 195_000 + 150_000_000 * 0.0025);

  // 경계에서 튀지 않는다
  for (const edge of [60_000_000, 150_000_000, 300_000_000]) {
    const jump = propertyTax(edge + 1) - propertyTax(edge);
    assert.ok(jump >= 0 && jump < 0.01, `재산세가 ${edge}에서 ${jump}원 뛰었다`);
  }
  assert.equal(propertyTax(0), 0);
});

test('공정시장가액비율이 공시가격으로 갈린다', () => {
  assert.equal(propertyFairRate(300_000_000, true), 0.45);
  assert.equal(propertyFairRate(600_000_000, true), 0.5);
  assert.equal(propertyFairRate(900_000_000, true), 0.6);
  // 1주택이 아니면 늘 60%다
  for (const p of [200_000_000, 500_000_000, 900_000_000]) {
    assert.equal(propertyFairRate(p, false), 0.6);
  }
});

test('기본공제 아래에서는 종부세가 0이다', () => {
  /* 1주택 12억, 그 밖 9억. 공시가격의 60%가 과세표준이므로 되짚어 확인한다 */
  for (const [oneHouse, exemption] of [[true, ONE_HOUSE_EXEMPTION], [false, OTHER_EXEMPTION]] as const) {
    const justUnder = calcHoldingTax({ publicPrice: exemption / 0.6 - 1000, oneHouse });
    assert.equal(justUnder.jongbuBase, 0, `${oneHouse}: 공제 아래인데 과세표준이 있다`);
    assert.equal(justUnder.jongbu, 0);
    assert.equal(justUnder.ruralTax, 0);

    const justOver = calcHoldingTax({ publicPrice: exemption / 0.6 + 100_000_000, oneHouse });
    assert.ok(justOver.jongbuBase > 0, `${oneHouse}: 공제를 넘었는데 과세표준이 0이다`);
  }
});

test('농어촌특별세는 종부세의 20%다', () => {
  const r = calcHoldingTax({ publicPrice: 3_000_000_000, oneHouse: true });
  assert.ok(r.jongbu > 0, '세금이 안 나왔다 — 입력을 잘못 잡았다');
  assert.ok(Math.abs(r.ruralTax - r.jongbu * RURAL_ON_JONGBU) < 1e-9);
  assert.ok(Math.abs(r.totalJongbu - (r.jongbu + r.ruralTax)) < 1e-9);
  assert.ok(Math.abs(r.totalHolding - (r.propertyTax + r.totalJongbu)) < 1e-9);
});

test('재산세 공제는 겹치는 몫에만 매긴다', () => {
  /*
   * 전에는 재산세를 전액 공제해 **공시가격 30억 1주택의 종부세가 0원**이었다.
   * 공제 전 360만원인데 재산세 788만원이 통째로 지웠다. 이제 겹치는 과세표준의
   * 비율만큼만 공제하므로 세금이 남는다.
   */
  const r = calcHoldingTax({ publicPrice: 3_000_000_000, oneHouse: true });
  assert.ok(r.jongbuBefore > 0, '공제 전 종부세가 0이다 — 입력을 잘못 잡았다');
  assert.ok(r.jongbu > 0, '30억 1주택인데 종부세가 0이다 — 공제가 전액으로 되돌아갔다');
  assert.ok(r.credit < r.propertyTax, '재산세를 전액 공제했다');

  /*
   * 겹치는 비율만큼인지 되짚는다.
   *
   * 2026-08-13에 공제 기준이 바뀌었다 — 전에는 고지서 합계(지방교육세 포함)로
   * 공제했는데, 법이 공제하는 것은 **재산세 본세**다. 지방교육세와 도시지역분은
   * 공제 대상이 아니라서 종부세가 그만큼 적게 나오고 있었다. 그래서 상대를
   * `r.propertyTax`(합계)가 아니라 본세로 두어야 한다.
   */
  const overlap = r.jongbuBase / r.propertyBase;
  const baseOnly = calcPropertyTax({ publicPrice: 3_000_000_000, oneHouse: true }).base;
  assert.ok(baseOnly < r.propertyTax, '본세가 고지서 합계와 같다 — 세목이 안 나뉘었다');
  assert.ok(Math.abs(r.credit - baseOnly * overlap) < 1e-6, '비례 배분이 아니다');

  // 아무리 큰 재산세를 넣어도 종부세가 음수로 안 내려간다
  const huge = calcHoldingTax({ publicPrice: 2_200_000_000, oneHouse: true, paidPropertyTax: 999_999_999 });
  assert.ok(huge.jongbu >= 0 && huge.ruralTax >= 0);
  assert.ok(huge.credit <= huge.jongbuBefore, '공제가 공제 전 세액을 넘었다');
});

test('공시가격이 오르면 보유세가 줄지 않는다', () => {
  let prev = -1;
  for (let p = 0; p <= 5_000_000_000; p += 50_000_000) {
    const now = calcHoldingTax({ publicPrice: p, oneHouse: true }).totalHolding;
    assert.ok(now >= prev - 1e-6, `${p / 1e8}억에서 보유세가 줄었다`);
    prev = now;
  }
});

test('페이지에 세율표가 되살아나지 않았다', () => {
  /*
   * 이 검사가 없으면 누군가 다시 페이지 안에 표를 적어 넣어도 아무도 모른다.
   * 페이지는 클라이언트 컴포넌트라 node가 불러올 수 없으므로 원문을 읽어 본다.
   */
  const page = readFileSync(join(ROOT, 'app', '(ko)', 'calculator', 'holding-tax', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/holding-tax'/, '페이지가 lib을 안 쓴다');
  assert.match(page, /calcHoldingTax/, '페이지가 lib 함수를 안 부른다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!code.includes('JONGBU_BRACKETS = ['), '페이지에 세율표가 되살아났다');
  assert.ok(!/rate: 0\.00\d/.test(code), '페이지에 세율이 되살아났다');
});
