/**
 * 빌드 뒤 RSC payload를 걷어낼 때 무엇을 지우고 무엇을 남기는지 잠근다.
 *
 * Next의 export는 화면 하나마다 .txt를 아홉 개씩 남긴다. 그게 출력 8.9GB 중
 * 4.7GB라서 Vercel이 out/을 복사하다 디스크가 찼고(ENOSPC), 그래서 지운다.
 *
 * 위험한 것은 경계다. Next는 out/country.txt처럼 화면 이름 그대로도 내보내므로
 * 확장자만 보고 지우면 robots.txt와 ads.txt까지 날아간다. 실제 출력에서 짝이
 * 없는 .txt는 그 둘뿐이라 "같은 자리에 X.html이 있는 X.txt만"이 정확한 경계다.
 *
 * 이 실수는 빌드가 성공한 뒤에야 드러난다 — 배포는 초록인데 robots.txt가 404가
 * 되고, 색인이 끊긴 것은 한참 뒤에 안다. 그래서 규칙을 검사로 박아 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldDrop } from '../scripts/drop-rsc-payloads.mjs';

const drop = (name: string, siblings: string[]) => shouldDrop(name, new Set(siblings));

test('세그먼트 payload는 지운다', () => {
  for (const n of [
    '__next._full.txt', '__next._head.txt', '__next._index.txt', '__next._tree.txt',
    '__next.en.txt', '__next.en.text.char.$d$slug.__PAGE__.txt',
  ]) {
    assert.equal(drop(n, []), true, n);
  }
});

test('같은 이름의 .html이 있는 .txt는 그 화면의 payload라 지운다', () => {
  assert.equal(drop('country.txt', ['country.txt', 'country.html']), true);
  assert.equal(drop('alpha.txt', ['alpha.txt', 'alpha.html']), true);
});

test('짝이 없는 .txt는 사람이 둔 것이라 남긴다', () => {
  // 실제 출력에서 짝 없는 .txt는 이 둘뿐이었다
  assert.equal(drop('robots.txt', ['robots.txt', 'ads.txt', 'index.html']), false);
  assert.equal(drop('ads.txt', ['robots.txt', 'ads.txt', 'index.html']), false);
  // 나중에 누가 sitemap.txt를 더해도 같은 이유로 살아남아야 한다
  assert.equal(drop('sitemap.txt', ['sitemap.txt']), false);
});

test('.txt가 아닌 것은 건드리지 않는다', () => {
  for (const n of ['index.html', 'opengraph-image', 'main.js', 'favicon.ico']) {
    assert.equal(drop(n, [n]), false, n);
  }
});
