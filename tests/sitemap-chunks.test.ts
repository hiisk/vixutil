/**
 * 사이트맵이 규약 안에 드는지 본다.
 *
 * ── 무엇이 있었나 (2026-08-10) ────────────────────────────────
 * 라이브 사이트맵을 열어 보니 **한 파일에 주소 164,000개, 19MB**였다.
 * 사이트맵 규약은 파일 하나에 **주소 5만 개, 압축 전 50MB**까지만 허용한다.
 * 크기는 안에 들었지만 개수가 세 배 넘게 넘쳐 규약을 어긴 파일이었고,
 * 그런 사이트맵은 앞부분만 읽히거나 통째로 버려진다 — **주소의 3분의 2가
 * 검색엔진에 안 보이고 있었다.**
 *
 * 섹션을 늘리는 일보다 이쪽이 컸다. 아무리 페이지를 만들어도 사이트맵에
 * 안 실리면 없는 것과 같다.
 *
 * 이 검사가 지키는 것: 조각 하나가 다시 5만을 넘거나, 묶음 목록이 조각과
 * 어긋나거나, 조각이 통째로 사라지면 걸린다. 셋 다 빌드는 멀쩡히 끝난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { BUILT_DIR, sitemapChunkFiles, sitemapRoutes } from './app-path.ts';

/** 규약이 정한 상한 */
const PROTOCOL_MAX_URLS = 50_000;
const PROTOCOL_MAX_BYTES = 50 * 1024 * 1024;

const built = sitemapChunkFiles().length > 0;

test('조각 하나가 규약의 5만 주소를 안 넘는다', { skip: built ? false : '빌드 산출물 없음' }, () => {
  const files = sitemapChunkFiles();
  assert.ok(files.length > 0, '사이트맵 조각을 하나도 못 찾았다');

  const over: string[] = [];
  for (const p of files) {
    const xml = readFileSync(p, 'utf8');
    const urls = (xml.match(/<loc>/g) ?? []).length;
    const bytes = Buffer.byteLength(xml);
    if (urls > PROTOCOL_MAX_URLS) over.push(`${p.replace(BUILT_DIR, '')}: 주소 ${urls.toLocaleString()}개`);
    if (bytes > PROTOCOL_MAX_BYTES) over.push(`${p.replace(BUILT_DIR, '')}: ${(bytes / 1048576).toFixed(1)}MB`);
  }
  assert.deepEqual(
    over, [],
    '사이트맵 조각이 규약을 넘는다 — 넘친 조각은 앞부분만 읽히거나 통째로 버려진다:\n  ' + over.join('\n  '),
  );
});

test('나눈 조각을 합치면 주소가 그대로다', { skip: built ? false : '빌드 산출물 없음' }, () => {
  const all = sitemapRoutes()!;
  assert.ok(all.length > 120_000, `주소가 ${all.length}개뿐 — 조각을 다 못 읽었다`);

  // 조각 경계에서 주소가 새거나 겹치지 않는다
  const seen = new Set(all);
  assert.equal(seen.size, all.length, '조각 사이에 같은 주소가 두 번 실렸다');

  // 마지막 조각만 덜 찰 수 있다 — 가운데 조각이 비면 자르는 자리가 틀린 것이다
  const files = sitemapChunkFiles();
  const counts = files.map(p => (readFileSync(p, 'utf8').match(/<loc>/g) ?? []).length);
  for (let i = 0; i < counts.length - 1; i++) {
    assert.ok(counts[i] > 1_000, `${i}번째 조각이 ${counts[i]}개뿐 — 자르는 자리가 틀렸다`);
  }
  assert.equal(counts.reduce((a, b) => a + b, 0), all.length);
});

test('묶음 목록이 조각을 하나도 빠뜨리지 않는다', { skip: built ? false : '빌드 산출물 없음' }, () => {
  /*
   * robots.txt는 묶음 목록 하나만 가리킨다. 그 목록에서 빠진 조각은 아무도
   * 안 찾아가므로, 그 조각의 주소 45,000개가 통째로 사라진 것과 같다.
   */
  const candidates = ['sitemap-index.xml.body', 'sitemap-index.xml/route.body', 'sitemap-index.xml'];
  const found = candidates.map(n => join(BUILT_DIR, n)).find(p => existsSync(p));
  if (!found) {
    console.log('  (묶음 목록 산출물을 못 찾았다 — 라우트 핸들러라 이름이 다를 수 있다)');
    return;
  }
  const xml = readFileSync(found, 'utf8');
  /* 2026-08-12: 조각이 /sitemap.xml 의 형제다 — /sitemap.xml · /sitemap2.xml … */
  const listed = [...xml.matchAll(/<loc>https:\/\/vixutil\.com\/(sitemap\d*\.xml)<\/loc>/g)].map(m => m[1]);
  const onDisk = sitemapChunkFiles().length;
  assert.equal(listed.length, onDisk, `목록은 ${listed.length}개인데 구운 파일은 ${onDisk}개다`);
  assert.equal(listed[0], 'sitemap.xml', `목록 첫 줄이 ${listed[0]}이다 — 한국어가 앞에 와야 한다`);
});

test('robots.txt가 묶음 목록을 가리킨다', () => {
  /*
   * 조각으로 나눠 놓고 robots가 옛 /sitemap.xml을 가리키면, 그 주소는 이제
   * 없거나 첫 조각만 있어서 나눈 보람이 사라진다.
   */
  const src = readFileSync(join(BUILT_DIR, '..', '..', '..', 'app', 'robots.ts'), 'utf8');
  assert.match(src, /sitemap-index\.xml/, 'robots.ts가 묶음 목록을 안 가리킨다');
  assert.match(src, /sitemapPartPath/, 'robots.ts가 언어별 파일을 안 세운다');
});
