import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { prerenderLimit } from '../lib/prerender.ts';
import { sitemapRoutes } from './app-path.ts';

/**
 * 빌드에서 미리 굽는 양이 ISR 쓰기 한도를 지키는지 본다.
 *
 * 이 사이트는 낱장이 십일만 장이고 전부 ISR이다. 배포하면 캐시가 차가워지므로
 * 크롤러가 다시 훑는 만큼 다시 쓴다 — 무료 티어의 한 달 20만 번을 세 번 배포로
 * 넘겼고 "프로젝트를 자동 정지한다"는 연락을 받았다.
 *
 * **빌드에서 구운 페이지는 정적이라 쓰기가 0이다.** 그래서 미리 굽는 수가
 * 곧 한도를 지키는 수단이다. 그 값이 조용히 0으로 돌아가면 다음 배포에서
 * 같은 일이 난다 — 빌드는 오히려 빨라지므로 아무도 눈치채지 못한다.
 */
const ROOT = join(import.meta.dirname, '..');

/** app 아래 [slug] 꼴 페이지 수 — 굽는 장수는 이것에 굽는 수를 곱한 값이다 */
function countDynamicRoutes(): number {
  let n = 0;
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name));
      else if (e.name === 'page.tsx' && dir.includes('[')) n++;
    }
  };
  walk(join(ROOT, 'app'));
  return n;
}

test('미리 굽는 장수가 0이 아니다', () => {
  /*
   * 0이면 허브만 굽고 낱장은 전부 요청 때 만든다. 그 상태가 한도를 넘긴 상태다.
   * 환경변수로 덮어쓸 수 있지만 기본값이 0이면 안 된다.
   */
  assert.ok(prerenderLimit() > 0, 'PRERENDER_PER_ROUTE 기본값이 0이다 — ISR 쓰기가 한도를 넘는다');
});

test('디스크 안에 드는 값이다', () => {
  /*
   * 시간보다 **디스크**가 먼저 찬다. 100으로 배포했다가 Vercel이
   * 48,769/61,694장에서 ENOSPC로 죽었다 — 컨테이너 여유가 24GB쯤이다.
   *
   * 페이지 한 장이 441KB를 남긴다(.html 149 + .rsc + .segments). 되풀이되는
   * Tailwind 클래스를 CSS로 빼기 전에는 501KB였다.
   * 24면 19,962장 × 441KB = 8.4GB로 죽은 자리의 35%다. 빌드 뒤 Vercel이
   * 산출물을 한 벌 더 복사하므로 절반 아래로 둔다.
   *
   * 올리려면 먼저 페이지 크기를 줄이고, 로컬에서 .next 크기를 재 보고,
   * 이 숫자와 lib/prerender.ts 주석을 함께 고친다.
   */
  /*
   * 라우트 수를 손으로 적으면 섹션이 늘 때마다 어긋난다 — 실제로 세어 쓴다.
   * 새 섹션 여덟을 머지했더니 동적 라우트가 731에서 늘었고, 그만큼 굽는
   * 장수도 늘어 .next가 7.3GB에서 8.3GB가 됐다.
   */
  /*
   * 2026-08-06에 다시 쟀다. 441은 낡은 값이었고 실제는 **325KB**다.
   *   .html 118 + .rsc 61 + .segments 144
   * .segments는 RSC 페이로드를 두 벌 더 담는다(_full 56KB + 페이지 45KB).
   * Next 16.2에는 이걸 끄는 설정이 없다 — config-shared.d.ts에 없고,
   * cacheComponents: false로도 그대로 나온다.
   *
   * 이 숫자로 다시 재면 PR=24에서 낱장 19,009장 · .next 8.3GB다.
   */
  const KB_PER_PAGE = 325;
  const dynamicRoutes = countDynamicRoutes();
  assert.ok(dynamicRoutes > 500, `동적 라우트를 ${dynamicRoutes}개밖에 못 셌다 — 세는 방식이 깨졌다`);
  const pages = 2500 + dynamicRoutes * prerenderLimit();
  const gb = (pages * KB_PER_PAGE) / 1048576;
  assert.ok(gb < 12, `${prerenderLimit()}장이면 .next가 ${gb.toFixed(1)}GB다 — 24GB에서 죽은 적이 있다`);

  /*
   * 미리 굽는 것으로는 한도를 못 맞춘다는 사실도 함께 박아 둔다.
   *
   * 사이트맵이 129,347장이고 디스크가 12GB로 막히므로 구울 수 있는 것은 많아야
   * 38,000장(전체의 29%)이다. 나머지는 크롤 한 바퀴마다 ISR 쓰기가 된다.
   *   PR=24  ISR 110,338 → 월 한도 20만으로 크롤 1.8바퀴
   *   PR=36  ISR 100,834 → 2.0바퀴   (디스크 11.2GB, 복사본까지 22.4GB로 위험)
   * 굽는 수를 올려도 1.8이 2.0이 될 뿐이다. **남은 수단은 배포를 모으는 것이다** —
   * 배포마다 캐시가 차가워져 크롤이 처음부터 다시 쓴다.
   */
  const covered = pages / 129_347;
  assert.ok(covered < 0.5, '사이트맵의 절반을 굽고 있다면 이 계산을 다시 세우라');
});

test('사이트맵이 내거는 양을 알고 있다', { skip: sitemapRoutes() ? false : '빌드 산출물 없음' }, () => {
  /*
   * 쓰기는 "크롤러가 훑은 낱장 × 배포"다. 사이트맵이 내거는 수가 그 상한이므로,
   * 그 수가 갑자기 뛰면 한도 계산이 통째로 달라진다. 늘어난 것을 모르고 배포하는
   * 일을 막으려고 여기 적어 둔다.
   */
  const urls = sitemapRoutes()!;
  assert.ok(urls.length > 100_000, `사이트맵이 ${urls.length}개뿐 — 줄었다면 왜인지 확인하라`);
  assert.ok(
    urls.length < 200_000,
    `사이트맵이 ${urls.length}개다. ISR 쓰기 한도(월 20만)를 배포 한 번으로 넘길 수 있다 — ` +
    '미리 굽는 수를 올리거나 배포를 모으라',
  );
});

test('무엇을 먼저 굽는지 주석에 남아 있다', () => {
  /*
   * 앞에서 자르는 방식은 "목록 앞쪽이 대표 항목"이라는 가정 위에 있다.
   * 그 가정이 적혀 있지 않으면 다음 사람이 목록 순서를 바꿔도 아무도 못 잡는다.
   */
  const src = readFileSync(join(ROOT, 'lib', 'prerender.ts'), 'utf8');
  assert.match(src, /ISR/, 'ISR 쓰기 한도 이야기가 빠졌다');
  assert.match(src, /45분|한도/, '빌드 한도 이야기가 빠졌다');
});
