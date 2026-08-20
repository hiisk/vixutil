import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CATS } from '../lib/calculator-catalog.ts';

/**
 * 계산기 분류표에서 지켜야 하는 것.
 *
 * ── 왜 생겼나 (2026-08-20) ─────────────────────────────────
 * /calculator의 단위변환 분류는 여섯 개뿐인데 사이트에는 /convert에 138종이
 * 있다. 그런데 «/calculator에서 /convert로 가는 링크가 하나도 없었다» —
 * 가장 큰 허브(165종)가 두 번째로 큰 도구 묶음(138종)을 안 가리키고 있었고,
 * /convert에 닿는 길은 홈 한 곳뿐이었다.
 */

const ROOT = join(import.meta.dirname, '..');

test('다른 섹션으로 이어지는 분류는 실제 개수를 말한다', async () => {
  /* 손으로 적은 숫자는 콘텐츠가 늘 때마다 낡는다 — 실제와 맞대 본다 */
  const { CONVERT_TOOLS } = await import('../lib/convert-tools.ts');
  const withMore = CATS.filter(c => c.more);
  assert.ok(withMore.length > 0, '이어지는 분류가 하나도 없다');

  for (const cat of withMore) {
    const n = Number(cat.more!.label.match(/(\d+)\s*종/)?.[1]);
    assert.ok(Number.isFinite(n), `${cat.label}: 링크 문구에 개수가 없다 — «${cat.more!.label}»`);
    if (cat.more!.href === '/convert') {
      assert.equal(n, CONVERT_TOOLS.length,
        `단위 변환기가 ${CONVERT_TOOLS.length}종인데 «${cat.more!.label}»이라고 적혀 있다`);
    }
  }
});

test('이어지는 링크가 실제 라우트를 가리킨다', () => {
  for (const cat of CATS.filter(c => c.more)) {
    const p = join(ROOT, 'app', '(ko)', cat.more!.href.replace(/^\//, ''), 'page.tsx');
    assert.ok(existsSync(p), `${cat.more!.href} 페이지가 없다`);
  }
});

test('허브가 그 링크를 실제로 그린다', async () => {
  /* 표에만 적고 화면에서 안 그리면 아무 데도 안 이어진다 */
  const { readFileSync } = await import('node:fs');
  const hub = readFileSync(join(ROOT, 'components', 'CalculatorHub.tsx'), 'utf8');
  assert.match(hub, /cat\.more/, '허브가 more를 안 읽는다');
  assert.match(hub, /href=\{cat\.more\.href\}/, 'more의 주소로 링크를 안 만든다');
});

test('이 검사가 실제로 문다', () => {
  assert.ok(CATS.length >= 10, `분류가 ${CATS.length}개뿐이다 — 경로가 틀렸다`);
  const conv = CATS.find(c => c.more?.href === '/convert');
  assert.ok(conv, '단위변환에서 /convert로 이어지는 링크가 없다');
  /* 개수 규칙이 원본을 잡는지 */
  assert.equal(Number('단위 변환기 138종 전체 보기'.match(/(\d+)\s*종/)?.[1]), 138);
  assert.equal('개수 없는 문구'.match(/(\d+)\s*종/), null);
});
