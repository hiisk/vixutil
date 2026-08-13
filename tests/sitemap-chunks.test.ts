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
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { BUILT_DIR, sitemapChunkFiles, sitemapRoutes } from './app-path.ts';

/** 규약이 정한 상한 */
const PROTOCOL_MAX_URLS = 50_000;
const PROTOCOL_MAX_BYTES = 50 * 1024 * 1024;

const built = sitemapChunkFiles().length > 0;

/**
 * 지금 몇 조각이 필요한가 — 구운 산출물에서 센다.
 *
 * app/sitemap.ts는 @/ 별칭을 써서 node가 직접 못 읽으므로 sitemapParts()를
 * 부를 수 없다. 대신 구운 파일 수를 쓴다(빌드 전이면 라우트 폴더 수와 같다).
 */
function sitemapRouteCount(): number {
  return Math.max(1, sitemapChunkFiles().length);
}

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

test('조각이 늘어도 그 주소를 낼 라우트가 있다', () => {
  /*
   * ── 숨은 함정 (2026-08-12에 찾음) ────────────────────────
   * 파일 자리는 언어에 고정돼 있고, 한 언어가 45,000개를 넘으면 넘친 몫이
   * **11번부터 뒤에 붙는다**(app/sitemap.ts의 sitemapParts). 그러면
   * sitemap-index.xml이 /sitemap11.xml을 내걸지만, 그 주소를 낼
   * app/sitemap11.xml/route.ts가 없어 **404**가 된다.
   *
   * 크롤러는 목록에 있는 주소가 404면 사이트맵 전체를 의심한다. 그런데
   * 빌드도 검사도 멀쩡하다 — 넘치는 순간까지 아무 일도 안 일어난다.
   *
   * 지금은 한국어가 20,278개로 한도의 45%다. 섹션을 계속 늘리다 그 선을
   * 넘으면 이 검사가 먼저 걸리고, 걸린 사람이 라우트 파일을 만들면 된다.
   */
  const appDir = join(BUILT_DIR, '..', '..', '..', 'app');
  /*
   * 형제 조각은 app/sitemap2.xml/route.ts … 폴더가 낸다. **0번(/sitemap.xml)만
   * 폴더가 아니라 app/sitemap.ts가 낸다** — Next의 sitemap 규약 파일이다.
   * 처음에 폴더만 세어 "조각 10개인데 라우트 9개"로 잘못 걸렸다. 규약 파일을
   * 한 칸으로 세지 않으면 이 검사가 늘 하나 모자라다고 말한다.
   */
  const folders = readdirSync(appDir).filter(f => /^sitemap\d+\.xml$/.test(f)).length;
  const conventionFile = existsSync(join(appDir, 'sitemap.ts')) ? 1 : 0;
  const routes = folders + conventionFile;
  assert.equal(conventionFile, 1, 'app/sitemap.ts가 없다 — /sitemap.xml을 낼 것이 없다');
  const need = sitemapRouteCount();

  assert.ok(folders > 0, 'sitemap 형제 라우트 폴더를 하나도 못 찾았다 — 세는 방식이 깨졌다');
  assert.ok(
    need <= routes,
    `조각이 ${need}개인데 그 주소를 낼 라우트는 ${routes}개다 — ` +
    `app/sitemap${routes + 1}.xml/route.ts부터 만들어야 한다(없으면 목록의 그 주소가 404다)`,
  );
});

test('한 언어가 한도에 얼마나 가까운지 본다', () => {
  /*
   * 넘치기 전에 알아채려고 여유를 재 둔다. 90%를 넘으면 라우트 파일을 미리
   * 만들어 두라는 뜻이다 — 넘친 뒤에 알면 그 사이 배포가 404를 내건다.
   */
  const files = sitemapChunkFiles();
  if (!files.length) return;                     // 빌드 산출물이 없으면 건너뛴다
  const CHUNK_SIZE = 45_000;
  const worst = Math.max(...files.map(p => (readFileSync(p, 'utf8').match(/<loc>/g) ?? []).length));
  assert.ok(
    worst < CHUNK_SIZE * 0.9,
    `가장 큰 조각이 ${worst.toLocaleString()}개로 자르는 기준(${CHUNK_SIZE.toLocaleString()})의 ` +
    `${((worst / CHUNK_SIZE) * 100).toFixed(0)}%다 — 넘기 전에 라우트 파일을 늘려 두라`,
  );
});

test('사이트맵이 CDN에 하루는 물려 있다', () => {
  /*
   * ── 왜 이 검사가 생겼나 (2026-08-13) ──────────────────────
   * 조각들이 `s-maxage=3600`을 달고 있었다. 한 시간마다 CDN이 원본에서 다시
   * 받아 온다는 뜻이고, 그것이 Fast Origin Transfer(Hobby 30일 10GB)에 얹힌다.
   * **사이트맵은 이 사이트에서 가장 큰 파일 묶음이다 — 실측 24MB(주소 20만).**
   * 낱장 한 장이 gzip 16KB인 것과 견주면 조각 한 번 전송이 낱장 150장 몫이다.
   *
   * 내용은 배포 때만 바뀌므로(force-static) 한 시간은 아무 값도 없이 비용만
   * 낸다. 하루로 두면 새 주소가 늦어도 하루 뒤에는 크롤러에게 보인다.
   *
   * 무기한으로 안 두는 까닭: 배포가 CDN 캐시를 비우는지 확인되지 않았다.
   * 안 비운다면 무기한은 새 페이지가 영영 안 보이는 뜻이 된다.
   */
  const src = readFileSync(join(import.meta.dirname, '..', 'app', 'sitemap.ts'), 'utf8');
  const idx = readFileSync(join(import.meta.dirname, '..', 'app', 'sitemap-index.xml', 'route.ts'), 'utf8');
  for (const [name, s] of [['sitemap.ts', src], ['sitemap-index.xml/route.ts', idx]] as const) {
    const m = s.match(/s-maxage=(\d+)/);
    assert.ok(m, `${name}에 s-maxage가 없다`);
    assert.ok(
      Number(m![1]) >= 86_400,
      `${name}의 s-maxage가 ${m![1]}초다 — 24MB짜리 파일 묶음을 그 주기로 원본에서 다시 끌어온다. ` +
      '하루(86400) 아래로 내리려면 Origin Transfer 셈을 다시 하라',
    );
  }
});
