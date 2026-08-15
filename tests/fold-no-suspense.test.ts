import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

/**
 * 낱장 뷰 위에 Suspense 경계가 생기면 없는 슬러그가 200으로 나간다.
 *
 * FoldView는 클라이언트 모듈 안의 import()로 라우트 청크를 가른다(16.5MB → 72KB).
 * 그 안의 notFound()는 **위에 Suspense가 있으면 404를 못 낸다** — React가 껍데기를
 * 먼저 흘려보내 상태 200이 확정되고, 뒤늦게 던져진 not-found를 상태 코드에 못 싣는다.
 * 지어서 재 본 값은 FoldView.tsx 머리말에 있다.
 *
 * 스트리밍이 느려 보인다는 이유로 누가 경계를 씌우면 십만 장이 넘는 없는 주소가
 * 200으로 색인된다. 화면으로는 404 그림이 보여서 **눈으로는 못 잡는다.** 그래서
 * 검사로 못 박는다.
 *
 * 경계가 놓일 수 있는 자리는 셋이다 — 뷰 자신, 뷰를 그리는 라우트, 그 위의 뿌리
 * 레이아웃. 셋을 다 본다.
 */

const strip = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

/** 뿌리 레이아웃 열 벌 — 언어마다 route group이 따로다 */
function rootLayouts(): string[] {
  return readdirSync('app', { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith('('))
    .map(d => `app/${d.name}/layout.tsx`);
}

/** 캐치올 라우트 열 벌 + 한국어 낱장 라우트 둘 */
function foldRoutes(): string[] {
  const intl = readdirSync('app', { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith('(') && d.name !== '(ko)')
    .map(d => `app/${d.name}/${d.name.slice(1, -1)}/[[...path]]/page.tsx`);
  return [
    ...intl,
    'app/(ko)/[section]/[slug]/page.tsx',
    'app/(ko)/[section]/[slug]/[deep]/page.tsx',
  ];
}

const CHAIN = ['components/FoldView.tsx', 'lib/fold/resolve.tsx', ...foldRoutes(), ...rootLayouts()];

test('낱장 뷰로 가는 길에 Suspense 경계가 없다', () => {
  const found: string[] = [];
  for (const f of CHAIN) {
    const src = strip(readFileSync(f, 'utf8'));
    if (/\bSuspense\b/.test(src)) found.push(f);
  }
  assert.deepEqual(found, [],
    `Suspense 경계가 생기면 없는 슬러그가 200으로 나간다 — 까닭은 components/FoldView.tsx 머리말: ${found.join(', ')}`);
});

test('검사가 볼 파일이 실제로 다 있다', () => {
  /* 라우트가 옮겨지면 위 검사가 빈 목록을 돌며 조용히 통과한다 */
  assert.ok(CHAIN.length >= 22, `길이 ${CHAIN.length}개뿐이다 — 라우트가 옮겨졌나`);
  for (const f of CHAIN) {
    assert.ok(readFileSync(f, 'utf8').length > 0, `${f}가 비었다`);
  }
  /* 그 길에 FoldView가 정말로 그려진다 — 이름이 바뀌면 이 검사는 뜻이 없다 */
  assert.match(readFileSync('lib/fold/resolve.tsx', 'utf8'), /<FoldView\b/);
  assert.match(readFileSync('app/(ko)/[section]/[slug]/page.tsx', 'utf8'), /<KoView\b/);
});
