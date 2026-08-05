import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { siteMetadata } from '../lib/site-metadata.ts';

/**
 * 사이트가 내건 아이콘이 실제로 있는지 본다.
 *
 * 아이콘은 두 갈래로 어긋나고, 둘 다 빌드를 통과한다.
 *
 *  1. metadata가 가리키는 주소에 아무것도 없다. 모든 페이지에 <link>는 붙는데
 *     열면 404다 — 브라우저 탭이나 홈 화면에 넣어 보기 전에는 아무도 모른다.
 *     실제로 두 번 났다. 처음은 app/apple-icon.svg를 두었을 때다(apple-icon
 *     규약은 svg를 안 받아서 파일이 안 나왔다). 두 번째는 route group으로
 *     가르면서 app/apple-icon.tsx가 app/(ko)/ 안으로 딸려 들어갔을 때다.
 *
 *  2. 아이콘 파일이 route group 안에 있다. 그룹은 주소에 안 나타나지만
 *     아이콘·favicon 같은 파일 규약은 그 자리를 그대로 라우트로 삼는다.
 *     그룹이 열 개인 이 저장소에서는 한 언어에만 붙거나 아예 안 붙는다.
 *
 * 그래서 "metadata가 부르는 이름"과 "app 뿌리에 있는 파일"을 맞춰 본다.
 */
const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');

/** metadata.icons에 적힌 주소를 전부 뽑는다 */
function declared(): string[] {
  const out: string[] = [];
  const dig = (v: unknown) => {
    if (typeof v === 'string') out.push(v);
    else if (Array.isArray(v)) v.forEach(dig);
    else if (v && typeof v === 'object') Object.values(v).forEach(dig);
  };
  dig(siteMetadata.icons);
  return out.filter(u => u.startsWith('/'));
}

test('아이콘 주소를 실제로 읽어 온다', () => {
  // metadata 모양이 바뀌어 하나도 못 읽으면 아래 검사들이 조용히 통과한다
  const urls = declared();
  assert.ok(urls.length >= 3, `아이콘 주소를 ${urls.length}개밖에 못 읽었다: ${JSON.stringify(urls)}`);
});

test('내건 아이콘이 app 뿌리에 파일로 있다', () => {
  /*
   * 주소와 파일 이름이 **글자까지 같아야** 한다. next start로 재 본 결과다:
   *   app/apple-icon.png  →  /apple-icon.png  200
   *                          /apple-icon      404
   * 파일로 둔 아이콘은 확장자를 뗀 주소로는 안 나온다. 그려 내는 라우트
   * (apple-icon.tsx)만 확장자 없는 주소를 갖는다 — 그래서 둘을 갈라 본다.
   *
   * 여기를 느슨하게(확장자를 떼고 견줘) 두면 정확히 지금 고친 그 고장,
   * `/apple-icon`을 내걸고 파일은 .png인 상태를 통과시킨다.
   */
  const roots = readdirSync(APP, { withFileTypes: true }).filter(e => e.isFile()).map(e => e.name);
  const CODE = /\.(tsx|ts|jsx|js)$/;
  const missing: string[] = [];
  for (const url of declared()) {
    const name = url.slice(1).split('?')[0];
    const asFile = roots.includes(name) && !CODE.test(name);
    const asRoute = roots.some(f => CODE.test(f) && f.replace(CODE, '') === name);
    if (!asFile && !asRoute) missing.push(url);
  }
  assert.deepStrictEqual(missing, [], 'metadata가 부르는데 app 뿌리에 그 이름이 없다 — 열면 404다');
});

test('아이콘이 route group 안에 숨어 있지 않다', () => {
  /*
   * 그룹 안에 있으면 주소는 그대로인데 그 그룹에서만 나온다. 열 언어를 그룹으로
   * 가른 이 저장소에서는 그것이 곧 고장이다.
   */
  const stray: string[] = [];
  const NAMES = /^(icon|apple-icon|favicon|manifest)(\.|$)/;
  for (const g of readdirSync(APP, { withFileTypes: true })) {
    if (!g.isDirectory() || !g.name.startsWith('(')) continue;
    for (const f of readdirSync(join(APP, g.name), { withFileTypes: true }))
      if (f.isFile() && NAMES.test(f.name)) stray.push(`app/${g.name}/${f.name}`);
  }
  assert.deepStrictEqual(stray, [], 'app 뿌리로 옮겨야 열 언어가 모두 받는다');
});

test('apple-icon은 PNG 파일이다', () => {
  /*
   * apple-icon 규약은 .png/.jpg/.jpeg만 받는다. svg를 두면 <link>는 붙는데
   * 파일은 안 나온다 — 그것이 첫 번째 고장이었다.
   *
   * 그려서 만들지도 않는다. next/og로 그리면 라우트가 하나 생기고, 라우트는
   * 그룹에 휩쓸린다(그것이 두 번째 고장이었다). 그림 하나를 위해 빌드가 일할
   * 이유도 없다.
   */
  const p = join(APP, 'apple-icon.png');
  assert.ok(existsSync(p), 'app/apple-icon.png가 없다');
  assert.ok(statSync(p).size > 1000, '파일이 비어 있다');
  const roots = readdirSync(APP);
  assert.deepStrictEqual(
    roots.filter(f => /^apple-icon\./.test(f) && !f.endsWith('.png')),
    [],
    'PNG 말고 다른 apple-icon이 있다 — 규약이 안 받거나 둘이 다투게 된다',
  );
});
