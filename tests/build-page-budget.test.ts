import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { APP_DIR } from './app-path.ts';

/**
 * 빌드가 Vercel의 45분 한도 안에 드는지 본다.
 *
 * ── 무엇이 있었나 (2026-08-07) ────────────────────────────────
 * 빌드가 두 번 잘렸다. `PRERENDER_PER_ROUTE`를 20으로, 다시 8로 낮췄는데도
 * 두 번 다 45분을 넘었다.
 *
 * **진단이 두 번 틀린 까닭은 기준선이 가짜였기 때문이다.** "마지막으로 푸시한
 * 커밋 = 마지막으로 배포된 커밋"이라고 넘겨짚었다. 라이브 사이트를 열어 보니
 * 실제로 성공한 마지막 배포는 2026-08-06 08:13(b36bc08b)이었고, 그 뒤로 배포가
 * 한 번도 성공한 적이 없었다. 24·20·8은 전부 **검증된 적 없는 값**이다.
 *
 *   실제로 성공한 배포   동적 660 · 정적 1,954 · PR=0
 *   실패한 배포 ①        동적 930 · 정적 2,574 · PR=20 → 21,174장
 *   실패한 배포 ②        동적 930 · 정적 2,574 · PR=8  → 10,116장
 *
 * ── 무엇을 재야 하나 ─────────────────────────────────────────
 * 장수만으로는 부족하다. 로컬 실측에서 시간이 둘로 갈렸다.
 *
 *   PR=8  10,116장 · 컴파일 2.9분 + 굽기 8.7분 = 12분 45초
 *   PR=0   2,948장 · 컴파일 3.1분 + 굽기 4.4분 =  8분 57초
 *
 * **굽기는 장수를 따라가고 컴파일은 라우트 수를 따라간다.** PR을 0으로 내려도
 * 컴파일은 그대로다. 그래서 둘을 따로 센다.
 *
 * ── 한도를 어떻게 잡았나 ─────────────────────────────────────
 * 성공한 적 있는 값에만 기댄다. b36bc08b가 정적 1,954 · 동적 660으로 끝났다.
 * 지금은 이미 그보다 정적 32% · 동적 41% 많다 — **여유가 얼마인지는 모른다.**
 * 그래서 상한은 "지금보다 조금 위"로 잡아, **더 늘어나면 반드시 걸리게** 한다.
 * 배포가 성공하면 그 값을 새 기준으로 삼아 올린다.
 */

/** 그 폴더 아래의 page.tsx를 동적(`[slug]`)과 정적으로 가른다 */
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

/** 성공한 적 있는 유일한 값 */
const PROVEN = { dynamic: 660, static: 1_954, limit: 0 };

/** 지금(정적 2,574)보다 조금 위 — 더 늘면 걸리게 한다 */
const MAX_PAGES = 3_200;
/** 컴파일 시간을 좌우한다. 지금 3,504개보다 조금 위 */
const MAX_ROUTES = 3_800;

test('빌드에서 구울 장수가 한도 안에 든다', () => {
  const { dynamic, static: staticN } = countRoutes(APP_DIR);
  const limit = prerenderLimit();
  const pages = dynamic * limit + staticN;

  // 라우트를 못 세면 검사가 조용히 통과한다 — 그것부터 막는다
  assert.ok(dynamic > 100, `동적 라우트가 ${dynamic}개뿐 — 세는 방식이 깨졌다`);
  assert.ok(staticN > 100, `정적 라우트가 ${staticN}개뿐 — 세는 방식이 깨졌다`);

  assert.ok(
    pages <= MAX_PAGES,
    `구울 장수 ${pages.toLocaleString()}장 (동적 ${dynamic} × ${limit} + 정적 ${staticN}) > ` +
    `${MAX_PAGES.toLocaleString()}장.\n` +
    `  PRERENDER_PER_ROUTE를 ${Math.max(0, Math.floor((MAX_PAGES - staticN) / dynamic))} 이하로 낮추라.\n` +
    '  (굽지 않은 낱장은 사라지지 않는다 — ISR가 요청 때 만든다)',
  );
});

test('컴파일할 라우트 수가 한도 안에 든다', () => {
  /*
   * 굽는 장수를 0으로 내려도 컴파일은 안 줄어든다. 실측에서 컴파일만 3.1분이고,
   * 그 값은 PR과 무관하게 라우트 수를 따라간다. 섹션을 늘리면 여기가 먼저 찬다.
   */
  const { dynamic, static: staticN } = countRoutes(APP_DIR);
  const routes = dynamic + staticN;
  assert.ok(
    routes <= MAX_ROUTES,
    `라우트 ${routes.toLocaleString()}개 (동적 ${dynamic} + 정적 ${staticN}) > ${MAX_ROUTES.toLocaleString()}개.\n` +
    '  PRERENDER_PER_ROUTE로는 못 줄인다 — 섹션·언어를 줄이거나 빌드를 나눠야 한다.',
  );
});

test('검증되지 않은 값으로 올려 두지 않았다', () => {
  /*
   * 이 검사가 이 파일의 핵심이다. 두 번의 실패는 전부 **배포로 확인하지 않은
   * 값**을 코드에 박아 둔 데서 왔다.
   *
   * 지금 라우트 수가 성공한 배포보다 많으므로, 굽는 수는 성공이 검증된 0에
   * 머물러야 한다. 올리려면 순서가 있다 — 올려서 **배포가 끝나는 것을 보고**,
   * 그 값을 PROVEN에 적고, 그다음에 이 검사를 고친다.
   */
  const { dynamic, static: staticN } = countRoutes(APP_DIR);
  const grew = dynamic > PROVEN.dynamic || staticN > PROVEN.static;
  if (!grew) return; // 성공한 배포보다 작아졌으면 굳이 묶지 않는다

  assert.equal(
    prerenderLimit(), PROVEN.limit,
    `라우트가 성공한 배포보다 많은데(동적 ${dynamic} vs ${PROVEN.dynamic}, ` +
    `정적 ${staticN} vs ${PROVEN.static}) 굽는 수가 검증된 ${PROVEN.limit}이 아니다.\n` +
    '  올리려면 먼저 그 값으로 배포가 끝나는 것을 보고, PROVEN을 고친 뒤에 올리라.',
  );
});
