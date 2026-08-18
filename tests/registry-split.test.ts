/**
 * 등록부가 셋으로 갈렸다 — 셋이 어긋나면 그 갈래가 조용히 죽는다.
 *
 * ── 왜 갈랐나 (2026-08-15) ────────────────────────────────
 * Turbopack은 라우트마다 클라이언트 청크 그룹을 하나만 만든다. 디스패처가 뷰
 * 모듈에 **닿기만 해도** — 그리지 않아도 — 그 라우트가 등록부 전체의 클라이언트
 * 컴포넌트를 지고 간다. 허브 캐치올 하나가 16.5MB였다. 그래서 서버가 보는 것과
 * 그리는 것을 갈랐다:
 *
 *   lib/fold/registry.ts        뷰 모듈 이름의 근거(무엇이 있는가)
 *   lib/fold/registry-meta.ts   서버가 보는 메타 전용 등록부(*.meta)
 *   components/FoldView.tsx     클라이언트가 부르는 뷰 표(*.tsx)
 *
 * ── 갈라서 생긴 위험 ──────────────────────────────────────
 * 셋 중 하나만 고치면 **빌드도 tsc도 통과한다.** 메타만 있으면 화면이 비고,
 * 뷰만 있으면 제목·canonical·hreflang이 빈 채로 나간다. 전에도 같은 무늬로
 * 조용한 404를 겪었다(tests/fold-routes.test.ts 머리말). 그래서 셋을 대조한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { STATIC_ROUTES, SLUG_ROUTES, EN_STATIC_OVERRIDES } from '../lib/fold/registry.ts';
import { KO_LEAVES, KO_DEEP_LEAVES } from '../lib/ko/registry.ts';
import {
  STATIC_META, EN_STATIC_META, DEEP_META,
  STATIC_MODULE, EN_STATIC_MODULE, DEEP_MODULE,
} from '../lib/fold/registry-meta.ts';
import { KO_META, KO_DEEP_META, KO_MODULE, KO_DEEP_MODULE } from '../lib/ko/registry-meta.ts';

const ROOT = join(import.meta.dirname, '..');
const keys = (o: object) => Object.keys(o).sort();

test('허브: registry.ts와 registry-meta.ts의 열쇠가 같다', () => {
  assert.deepEqual(keys(STATIC_META), keys(STATIC_ROUTES));
  assert.deepEqual(keys(EN_STATIC_META), keys(EN_STATIC_OVERRIDES));
  assert.deepEqual(keys(STATIC_MODULE), keys(STATIC_ROUTES));
  assert.deepEqual(keys(EN_STATIC_MODULE), keys(EN_STATIC_OVERRIDES));
  assert.ok(keys(STATIC_META).length > 180, `허브가 ${keys(STATIC_META).length}개뿐 — 세는 방식이 깨졌다`);
});

test('세 칸 낱장: 두 칸 열쇠가 빠짐없이 메타 등록부에 있다', () => {
  /* [a]/[b]/[slug]가 받는 것은 슬래시가 든 열쇠뿐이다 */
  const deep = Object.keys(SLUG_ROUTES).filter(k => k.includes('/')).sort();
  assert.deepEqual(keys(DEEP_META), deep);
  assert.deepEqual(keys(DEEP_MODULE), deep);
  assert.ok(deep.length > 10, `세 칸 낱장이 ${deep.length}개뿐 — 세는 방식이 깨졌다`);
});

test('한국어: 뷰 등록부와 메타 등록부의 열쇠가 같다', () => {
  assert.deepEqual(keys(KO_META), keys(KO_LEAVES));
  assert.deepEqual(keys(KO_DEEP_META), keys(KO_DEEP_LEAVES));
  assert.deepEqual(keys(KO_MODULE), keys(KO_LEAVES));
  assert.deepEqual(keys(KO_DEEP_MODULE), keys(KO_DEEP_LEAVES));
  /* 2026-08-18: 조합 격자 낱장 열다섯을 지워 42 → 27이다 */
  assert.ok(keys(KO_META).length > 15, `한국어 갈래가 ${keys(KO_META).length}개뿐 — 세는 방식이 깨졌다`);
});

test('메타 모듈 파일이 실제로 있다', () => {
  const missing: string[] = [];
  for (const [where, map] of [['lib/fold/pages', { ...STATIC_MODULE, ...EN_STATIC_MODULE, ...DEEP_MODULE}],
    ['lib/ko/pages', { ...KO_MODULE, ...KO_DEEP_MODULE }]] as const) {
    for (const m of new Set(Object.values(map))) {
      if (!existsSync(join(ROOT, where, `${m}.meta.tsx`))) missing.push(`${where}/${m}.meta.tsx`);
    }
  }
  assert.deepEqual(missing, [], '메타 모듈이 없다 — 그 갈래의 제목·canonical·hreflang이 통째로 빈다');
});

test('FoldView가 모든 뷰 모듈을 부른다', () => {
  /*
   * FoldView.tsx의 import()는 클라이언트 청크를 가르는 **유일한** 자리다.
   * 여기서 빠지면 등록부에는 있는데 화면이 안 그려진다 — 빌드는 통과한다.
   */
  const src = readFileSync(join(ROOT, 'components', 'FoldView.tsx'), 'utf8');
  const listed = new Set([...src.matchAll(/'([^']+)': \(\) => import\('@\/lib\/(fold|ko)\/pages\/([^']+)'\)/g)]
    .map(m => `${m[2]}/${m[3]}`));
  const want = new Set<string>();
  for (const m of Object.values({ ...STATIC_MODULE, ...EN_STATIC_MODULE, ...DEEP_MODULE})) want.add(`fold/${m}`);
  for (const m of Object.values({ ...KO_MODULE, ...KO_DEEP_MODULE })) want.add(`ko/${m}`);
  const missing = [...want].filter(w => !listed.has(w));
  assert.deepEqual(missing, [], 'FoldView.tsx에 없는 뷰 모듈이다 — 그 갈래가 빈 화면이 된다');
  assert.ok(listed.size >= want.size, '뷰 표가 등록부보다 작다');
});

test('메타 모듈이 컴포넌트를 들여오지 않는다', () => {
  /*
   * 이 검사가 이 갈래의 **값어치 그 자체**다. 메타 모듈 하나가 컴포넌트를 하나만
   * 들여와도 서버 그래프가 뷰에 닿아, 그 라우트의 클라이언트 청크가 다시 통째로
   * 합쳐진다(16.5MB로 되돌아간다). 화면은 멀쩡하고 빌드도 통과하므로 여기서 잡는다.
   */
  const bad: string[] = [];
  for (const [where, map] of [['lib/fold/pages', { ...STATIC_MODULE, ...EN_STATIC_MODULE, ...DEEP_MODULE}],
    ['lib/ko/pages', { ...KO_MODULE, ...KO_DEEP_MODULE }]] as const) {
    for (const m of new Set(Object.values(map))) {
      const f = join(ROOT, where, `${m}.meta.tsx`);
      if (!existsSync(f)) continue;
      /* 주석에 컴포넌트 파일 이름이 적혀 있어 줄 단위로 본다 — 주석은 import가 아니다 */
      const hit = readFileSync(f, 'utf8').split('\n')
        .filter(l => /^import\b/.test(l) && /'@\/components\//.test(l));
      if (hit.length) bad.push(`${where}/${m}.meta.tsx: ${hit.join(' | ')}`);
    }
  }
  assert.deepEqual(bad, [], '메타 모듈이 컴포넌트를 들여온다 — 청크 가르기가 무효가 된다');
});

test('디스패처가 뷰 등록부를 들여오지 않는다', () => {
  /* 서버 쪽 배선이 registry.ts(뷰)로 되돌아가면 가른 것이 그대로 도로 합쳐진다 */
  const files = [
    'lib/fold/resolve.tsx',
    'lib/fold/pages/deep__slug.tsx',
    'app/(ko)/[section]/[slug]/page.tsx',
    'app/(ko)/[section]/[slug]/[deep]/page.tsx',
  ];
  const bad: string[] = [];
  for (const f of files) {
    const src = readFileSync(join(ROOT, f), 'utf8');
    for (const l of src.split('\n')) {
      if (!/^import\b/.test(l)) continue;
      if (/from '(\.\.?\/)*(lib\/)?(fold|ko)\/registry'|from '@\/lib\/(fold|ko)\/registry'|from '\.\.\/registry'|from '\.\/registry'/.test(l)) bad.push(`${f}: ${l.trim()}`);
      if (/from '@?\/?(\.\.\/)*lib\/fold\/deep-prefix'|from '\.\.\/deep-prefix'|from '@\/lib\/fold\/deep-prefix'/.test(l)) bad.push(`${f}: ${l.trim()}`);
    }
  }
  assert.deepEqual(bad, [], '디스패처가 뷰 등록부를 들여온다 — 클라이언트 청크가 도로 합쳐진다');
});
