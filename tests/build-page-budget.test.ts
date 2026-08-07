import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { APP_DIR } from './app-path.ts';

/**
 * 빌드에서 구울 장수가 Vercel의 45분 한도 안에 드는지 본다.
 *
 * ── 무엇이 있었나 (2026-08-07) ────────────────────────────────
 * Vercel 빌드가 45분에 걸려 잘렸다. `PRERENDER_PER_ROUTE`는 24에서 20으로
 * **낮춰** 두었는데도 그랬다.
 *
 * 까닭은 그 수가 "몇 장을 굽나"가 아니라 "라우트마다 몇 장을 굽나"이기 때문이다.
 * 동적 라우트가 650개에서 930개로 늘면서, 24 → 20으로 낮췄어도 실제 장수는
 * 15,600 → 18,600으로 **늘었다.** 정적까지 더하면 17,644 → 21,174장이다.
 *
 * 숫자를 낮췄으니 가벼워졌겠지 하고 넘어가면 이렇게 된다. 그래서 **곱한 결과**를
 * 여기서 센다.
 *
 * ── 한도를 어떻게 잡았나 ──────────────────────────────────────
 * 지난 성공 배포가 17,644장이었고 그것이 45분 안에 끝났다. 실패한 것이
 * 21,174장이다. 그 사이 어딘가가 실제 한계인데 정확히는 모르므로,
 * **성공한 적 있는 수의 8할**인 14,000장을 상한으로 둔다.
 *
 * 이 검사가 걸리면 고르는 길은 둘이다.
 *  1. `PRERENDER_PER_ROUTE`를 낮춘다 — 굽지 않은 낱장은 ISR가 요청 때 만든다.
 *  2. 정말 더 구워야 한다면 상한을 올리되, **올린 값으로 실제 배포가 끝나는 것을
 *     보고 나서** 올린다. 지레 올리면 이 검사가 아무 일도 안 하게 된다.
 */

/** 그 폴더 아래의 page.tsx를 모아 동적(`[slug]`)과 정적으로 가른다 */
function countRoutes(dir: string): { dynamic: number; static: number } {
  let dynamic = 0;
  let staticN = 0;
  const walk = (d: string, hasParam: boolean) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p, hasParam || e.name.startsWith('['));
      else if (e.name === 'page.tsx') {
        if (hasParam) dynamic++;
        else staticN++;
      }
    }
  };
  walk(dir, false);
  return { dynamic, static: staticN };
}

/** lib/prerender.ts가 기본으로 쓰는 값 */
function prerenderLimit(): number {
  const src = readFileSync(join(import.meta.dirname, '..', 'lib', 'prerender.ts'), 'utf8');
  const m = src.match(/PRERENDER_PER_ROUTE \?\? '(\d+)'/);
  assert.ok(m, 'lib/prerender.ts에서 기본값을 못 찾았다 — 꼴이 바뀌었으면 이 검사도 고치라');
  return Number(m[1]);
}

/** 성공한 적 있는 17,644장의 8할 — 근거는 위 주석에 적었다 */
const MAX_PAGES = 14_000;

test('빌드에서 구울 장수가 Vercel 한도 안에 든다', () => {
  const { dynamic, static: staticN } = countRoutes(APP_DIR);
  const limit = prerenderLimit();
  const pages = dynamic * limit + staticN;

  // 라우트를 못 세면 검사가 조용히 통과한다 — 그것부터 막는다
  assert.ok(dynamic > 100, `동적 라우트가 ${dynamic}개뿐 — 세는 방식이 깨졌다`);
  assert.ok(staticN > 100, `정적 라우트가 ${staticN}개뿐 — 세는 방식이 깨졌다`);

  assert.ok(
    pages <= MAX_PAGES,
    `구울 장수가 ${pages.toLocaleString()}장 (동적 ${dynamic} × ${limit} + 정적 ${staticN}) — ` +
    `한도 ${MAX_PAGES.toLocaleString()}장을 넘는다.\n` +
    `  PRERENDER_PER_ROUTE를 ${Math.max(1, Math.floor((MAX_PAGES - staticN) / dynamic))} 이하로 낮추라.\n` +
    '  (굽지 않은 낱장은 사라지는 것이 아니라 ISR가 요청 때 만든다)',
  );
});

test('구울 장수에 여유가 남아 있다', () => {
  /*
   * 한도에 딱 붙여 두면 섹션을 하나만 더 늘려도 바로 넘는다. 8할 아래로
   * 두어, 라우트가 조금 늘어도 다음 배포까지는 버티게 한다.
   */
  const { dynamic, static: staticN } = countRoutes(APP_DIR);
  const pages = dynamic * prerenderLimit() + staticN;
  const room = 1 - pages / MAX_PAGES;
  assert.ok(
    room >= 0.2,
    `여유가 ${(room * 100).toFixed(0)}%뿐 (${pages.toLocaleString()}/${MAX_PAGES.toLocaleString()}) — ` +
    '섹션을 하나 더 늘리면 한도를 넘는다',
  );
});
