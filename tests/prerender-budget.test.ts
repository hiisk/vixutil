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

test('낱장마다 force-dynamic이 있다 — 크롤이 ISR 쓰기를 안 태운다', () => {
  /*
   * ── 2026-08-10에 모델이 바뀌었다 ──────────────────────────────
   * 전에는 낱장이 ISR이라 "사이트맵 − 미리 구운 것 = 크롤 한 바퀴의 쓰기"를
   * 세고 있었다. 163,730장이면 월 20만의 80% — 배포를 한 달에 한 번밖에
   * 못 했다. 사이트맵을 줄이는 안은 노출을 포기하는 것이라 접었다.
   *
   * 지금은 모든 [slug] 낱장이 `force-dynamic`이다. 요청 때 그리고 캐시에
   * 안 쓰므로 **크롤이 ISR 쓰기를 한 번도 안 태운다** — 그 값은 함수
   * 실행(월 100만, 크롤 한 바퀴 ≈ 16%)에서 나간다. 사이트맵은 열 언어
   * 전부를 그대로 내건다.
   *
   * 이 검사가 지키는 것: 새 낱장 라우트를 만들면서 force-dynamic을
   * 빠뜨리면, 그 라우트만 조용히 ISR로 돌아가 배포마다 쓰기를 태운다.
   * 빠진 파일이 하나라도 있으면 여기서 걸린다.
   */
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, out);
      else if (e.name === 'page.tsx' && dir.includes('[')) out.push(p);
    }
    return out;
  };
  const leaves = walk(join(ROOT, 'app'));
  assert.ok(leaves.length > 500, `낱장을 ${leaves.length}개밖에 못 찾았다 — 세는 방식이 깨졌다`);
  const missing = leaves.filter(f => !readFileSync(f, 'utf8').includes("export const dynamic = 'force-dynamic'"));
  assert.deepEqual(
    missing.map(f => f.replace(ROOT + '/', '')).slice(0, 5), [],
    `force-dynamic이 없는 낱장 ${missing.length}개 — 이 라우트들은 ISR로 돌아가 배포마다 쓰기를 태운다`,
  );
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
   * ── 실측 (2026-08-07, newsection 머지 뒤) ──────────────────────
   * 낱장 한 장은 293KB다(.html 106 + .rsc 55 + .segments 130).
   * 클래스 축약 3차로 325 → 293이 됐다.
   *
   * 그런데 **낱장 크기로 .next를 어림하면 크게 빗나간다.** 허브 장이 훨씬
   * 무겁고(element.html 392KB, wire.html 499KB) 공유 청크도 있다. 실제로 재면
   *   구운 낱장 22,259장 · .next 10GB → 한 장당 실효 471KB
   * 낱장 293KB로 셈하면 6.5GB가 나와, 아직 여유가 있다고 잘못 읽는다.
   * 그래서 여기서는 **실효 471KB**를 쓴다.
   *
   * 24GB에서 죽은 적이 있고 Vercel이 산출물을 한 벌 더 복사하므로 12GB를 선으로
   * 둔다. 지금 10GB는 그 선의 83%다 — 섹션을 더 늘리면 이 검사가 먼저 걸린다.
   */
  const KB_PER_PAGE = 469;
  const dynamicRoutes = countDynamicRoutes();
  assert.ok(dynamicRoutes > 500, `동적 라우트를 ${dynamicRoutes}개밖에 못 셌다 — 세는 방식이 깨졌다`);
  const pages = 2500 + dynamicRoutes * prerenderLimit();
  const gb = (pages * KB_PER_PAGE) / 1048576;
  assert.ok(gb < 12, `${prerenderLimit()}장이면 .next가 ${gb.toFixed(1)}GB다 — 24GB에서 죽은 적이 있다`);

  /*
   * ── 여유가 얼마나 남았는지도 말해 준다 (2026-08-07) ──
   * 라우트가 늘면 같은 PR로도 디스크가 는다. 실제로 이 저장소는
   *   730 → 8.3GB · 860 → 10GB · 930 → 11GB
   * 로 왔다. 12GB에서 딱 걸리게만 두면 "통과했으니 괜찮다"고 읽게 되는데,
   * 지금 남은 여유는 8%뿐이라 섹션 하나만 더 늘어도 넘는다.
   *
   * 넘기 전에 알 수 있도록 10.5GB에서 먼저 말한다. 걸리면 고를 것은 셋이다 —
   * 낱장을 더 줄이거나, PR을 낮추거나, 늘리기를 멈추거나.
   */
  assert.ok(
    gb < 10.5,
    `.next가 ${gb.toFixed(1)}GB다 — 12GB 선까지 ${(12 - gb).toFixed(1)}GB밖에 안 남았다. ` +
    `PR을 ${Math.floor((10.5 * 1048576 - 2500 * KB_PER_PAGE) / (dynamicRoutes * KB_PER_PAGE))}로 낮추거나 낱장을 더 줄이라`,
  );

  /*
   * 미리 굽는 것으로는 한도를 못 맞춘다는 사실도 함께 박아 둔다.
   *
   * 2026-08-07 실측: 사이트맵 163,367장 · 구운 것 21,100장(PR=20) · .next 9.4GB.
   *   ISR 쓰기 142,267/크롤 → 월 한도 20만으로 **크롤 1.4바퀴**
   *
   * 굽는 수를 올려도 나아지지 않는다. 디스크 12GB가 상한이라 26,700장(19%)이
   * 최대이고 그때도 1.7바퀴다. newsection 머지로 라우트가 730 → 860이 되면서
   * 같은 PR=24로도 8.3GB → 10GB가 됐다 — **이제 올릴 여유 자체가 거의 없다.**
   *
   * **남은 수단은 배포를 모으는 것이다** — 배포마다 캐시가 차가워져 크롤이
   * 처음부터 다시 쓴다. 한 달에 배포 한 번이면 한도 안이다.
   */
  const covered = pages / 163_367;
  assert.ok(covered < 0.5, '사이트맵의 절반을 굽고 있다면 이 계산을 다시 세우라');
});

test('사이트맵이 내거는 양을 알고 있다', { skip: sitemapRoutes() ? false : '빌드 산출물 없음' }, () => {
  /*
   * 쓰기는 "크롤러가 훑은 낱장 × 배포"다. 사이트맵이 내거는 수가 그 상한이므로,
   * 그 수가 갑자기 뛰면 한도 계산이 통째로 달라진다. 늘어난 것을 모르고 배포하는
   * 일을 막으려고 여기 적어 둔다.
   */
  const urls = sitemapRoutes()!;
  assert.ok(urls.length > 120_000, `사이트맵이 ${urls.length}개뿐 — 줄었다면 왜인지 확인하라`);
  assert.ok(
    urls.length < 200_000,
    `사이트맵이 ${urls.length}개다. ISR 쓰기 한도(월 20만)를 배포 한 번으로 넘길 수 있다 — ` +
    '미리 굽는 수를 올리거나 배포를 모으라',
  );
});

test('사이트맵에 같은 주소가 두 번 실리지 않는다', { skip: sitemapRoutes() ? false : '빌드 산출물 없음' }, () => {
  /*
   * 같은 주소를 두 번 내걸면 크롤러가 그만큼 더 요청하고, ISR 쓰기도 그만큼 더 는다.
   * 십사만 줄이라 눈으로는 못 찾는다 — 실제로 열 줄이 겹쳐 있었다.
   *   /es/color 등 여덟 — METRO_LANGS 묶음과 INTL_LOCALES10 묶음이 같은 여덟을 냈다
   *   /zh-hans · /zh-hant 첫 화면 — 목록이 이미 내는데 아래에 손으로 또 적어 뒀다
   * 둘 다 언어를 늘리며 새 목록을 만들고 옛 줄을 안 지운 자리다.
   */
  const urls = sitemapRoutes()!;
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const u of urls) (seen.has(u) ? dup : seen).add(u);
  assert.deepEqual(
    [...dup], [],
    `사이트맵에 두 번 실린 주소 ${dup.size}개 — 크롤이 그만큼 더 돈다`,
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
