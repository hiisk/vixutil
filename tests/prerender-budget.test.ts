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

test('낱장이 force-dynamic이고, 그것을 CDN에 물리는 헤더가 있다', () => {
  /*
   * ── 이 검사가 잡는 흠은 하나다: 헤더 없는 force-dynamic ────────
   * 2026-08-10에 낱장을 force-dynamic으로 두었다가 **사이트가 멈췄다.** Next가
   * 동적 페이지에 `no-store`를 붙이므로 CDN이 한 장도 안 받았고, 요청마다 원본이
   * 페이지 전체를 보내 Fast Origin Transfer(30일 10GB)가 348%까지 올랐다.
   *
   * 2026-08-13에 다시 force-dynamic으로 왔지만 **이번에는 next.config의
   * headers()가 s-maxage를 붙인다.** 그 한 줄이 그때와 지금의 유일한 차이다.
   * 지우면 빌드도 통과하고 화면도 멀쩡한데 정확히 그 사고가 재현된다 — 그래서
   * 여기서 둘을 **함께** 본다.
   *
   * ── 왜 ISR을 버렸나 (2026-08-13 실측) ──────────────────────────
   * ISR 쓰기는 8KB 단위로 세고 낱장 한 장이 2.36~3.38단위다(표본 40장).
   * 크롤 한 바퀴 203,039장이면 48만~69만 단위로 무료 한도 20만의 240~343%다.
   * 게다가 Vercel 문서가 「each new deployment uses its own ISR cache and does
   * not reuse the cache from a previous deployment」라고 못 박아, 그 값이 배포마다
   * 다시 든다. 페이지를 5.9만~8.5만 장으로 줄이지 않는 한 ISR로는 답이 없다.
   *
   * CDN 캐시는 읽기·쓰기가 공짜다(같은 문서). 대신 캐시가 임시라 축출되면 다시
   * 그리고, 리전마다 첫 요청이 함수를 탄다. 한 바퀴에 활성 CPU 1.3~2.7시간
   * (한도 4)과 전송 3.3GB(한도 10GB)이므로 **크롤이 월 한 바퀴 언저리로 눌려야
   * 성립한다.** 눌러 주는 것이 봇 차단(app/robots.ts, proxy.ts)이다.
   *
   * ── 되돌릴 때의 신호 ──────────────────────────────────────────
   * 배포 뒤 Usage에서 Origin Transfer나 활성 CPU가 치솟으면 CDN이 헤더를 안 받고
   * 있다는 뜻이다. 그때는 ISR로 되돌리고(이 검사와 낱장 913개를 함께) 페이지 수를
   * 줄이는 쪽을 봐야 한다.
   *
   * ── 접기 뒤의 모양 (2026-08-10, 그대로 유효) ─────────────────
   * 아홉 언어의 알맹이는 lib/fold/pages/ 모듈로 접혔지만 **라우트는 남았다.**
   * 허브는 언어마다 [[...path]] 캐치올이 굽고 낱장은 각자 [slug]다.
   */
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, out);
      else if (e.name === 'page.tsx' && dir.includes('[')) out.push(p);
    }
    return out;
  };
  const all = walk(join(ROOT, 'app'));
  const hubCatchalls = all.filter(f => f.includes('[[...path]]'));
  const leaves = all.filter(f => !f.includes('[[...path]]'));
  assert.equal(hubCatchalls.length, 9, `허브 캐치올이 ${hubCatchalls.length}개다 — 아홉 언어와 어긋난다`);
  assert.ok(leaves.length > 700, `낱장을 ${leaves.length}개밖에 못 찾았다 — 세는 방식이 깨졌다`);

  /* 낱장은 전부 동적이어야 한다 — ISR로 남으면 그 장수만큼 쓰기가 든다 */
  const isr: string[] = [];
  const dyn: string[] = [];
  for (const f of leaves) {
    const src = readFileSync(f, 'utf8');
    const rel = f.replace(ROOT + '/', '');
    if (src.includes("export const dynamic = 'force-dynamic'")) dyn.push(rel);
    else if (/export const revalidate/.test(src)) isr.push(rel);
  }
  assert.deepEqual(isr.slice(0, 5), [],
    `ISR로 남은 낱장 ${isr.length}개 — 한 장이 2.36~3.38 쓰기 단위이고 한 바퀴가 ` +
    '무료 한도의 240~343%다. force-dynamic + next.config headers()로 옮겨라');
  assert.ok(dyn.length > 900, `force-dynamic 낱장이 ${dyn.length}개뿐이다 — 옮기다 만 것이 아닌지 보라`);

  /*
   * **그리고 그 동적 낱장을 CDN에 물리는 헤더가 있어야 한다.** 이것이 없으면
   * 위의 force-dynamic이 곧 2026-08-10의 사고다.
   */
  const cfg = readFileSync(join(ROOT, 'next.config.ts'), 'utf8');
  assert.match(cfg, /async headers\(\)/,
    'next.config.ts에 headers()가 없다 — 낱장 913개가 no-store로 나가 CDN이 한 장도 안 받는다(348% 사고)');
  const sMaxAge = cfg.match(/s-maxage=(\d+)/);
  assert.ok(sMaxAge, 'headers()에 s-maxage가 없다 — CDN이 받을 근거가 없다');
  assert.ok(
    Number(sMaxAge![1]) >= 86_400,
    `s-maxage가 ${sMaxAge![1]}초다 — 그 주기마다 크롤 한 바퀴 값(CPU 1.3~2.7시간)이 ` +
    '다시 든다. 한도가 4시간이라 두 바퀴면 넘는다',
  );

  const bakedButDynamic = hubCatchalls.filter(f => readFileSync(f, 'utf8').includes("dynamic = 'force-dynamic'"));
  assert.deepEqual(
    bakedButDynamic.map(f => f.replace(ROOT + '/', '')), [],
    '허브 캐치올에 force-dynamic이 붙었다 — 허브 2,178장이 안 구워지고 매 요청 함수를 탄다',
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
  /*
   * ── 2026-08-10 접기 뒤 ──
   * 굽는 것은 한국어 403장 + 국제 허브 2,178장 = 2,581장이다(실측 .next 1.2GB).
   * 접기 전 2,948장·10GB에서 이렇게 줄어든 까닭은 낱장을 하나도 안 굽기
   * 때문이 아니라(그건 전에도 같다) 라우트가 3,504 → 1,335로 준 덕이다.
   */
  const KB_PER_PAGE = 469;
  const dynamicRoutes = countDynamicRoutes();
  /* 2026-08-12 접기로 840개가 됐다 — 굽는 장수는 이 수 × PRERENDER_PER_ROUTE다.
     라우트가 줄면 같은 손잡이로 굽는 장수도 줄어든다는 뜻이라, 디스크 여유는 늘었다. */
  assert.ok(dynamicRoutes > 700, `동적 라우트를 ${dynamicRoutes}개밖에 못 셌다 — 세는 방식이 깨졌다`);
  const pages = 2600 + dynamicRoutes * prerenderLimit();
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
   * ── 전제가 바뀌었다 (2026-08-12) ──────────────────────────
   * 이 검사는 20만에서 걸렸고 그 까닭은 "ISR 쓰기 한도(월 20만)"였다. 그 셈은
   * 낱장이 ISR이던 시절의 것이다. 2026-08-10에 낱장을 전부 force-dynamic으로
   * 돌려 **캐시 쓰기가 0**이 됐으므로, 주소 수는 이제 ISR 한도를 밀지 않는다.
   *
   * 그렇다고 상한을 없애면 이 검사가 아무것도 안 지킨다. 지금 지켜야 하는 것은
   * 다른 둘이다.
   *
   *   1) **한 언어가 한 파일에 5만을 넘지 않는다** — 사이트맵 규약이다. 언어마다
   *      파일이 하나이므로 전체가 50만이어도 규약은 안 깨지지만, 한 언어가
   *      45,000을 넘으면 조각이 늘고 그 주소를 낼 라우트를 새로 만들어야 한다
   *      (tests/sitemap-chunks.test.ts가 그쪽을 본다)
   *   2) **크롤 예산** — 구글이 한 번에 읽는 양에는 끝이 있다. 주소가 늘수록
   *      한 장이 다시 방문받는 간격이 길어진다
   *
   * 그래서 상한을 **언어당**으로 옮겼다. 전체 수는 갑자기 뛰었는지만 본다 —
   * 늘어난 것을 모르고 배포하는 일을 막으려는 원래 뜻은 그대로다.
   */
  const urls = sitemapRoutes()!;
  assert.ok(urls.length > 120_000, `사이트맵이 ${urls.length}개뿐 — 줄었다면 왜인지 확인하라`);

  const INTL = new Set(['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant']);
  const perLang = new Map<string, number>();
  for (const u of urls) {
    /* sitemapRoutes()가 앞 슬래시를 붙여 주기도 한다 — 떼고 첫 칸을 본다 */
    const first = u.replace(/^\//, '').split('/')[0];
    const k = INTL.has(first) ? first : 'ko';
    perLang.set(k, (perLang.get(k) ?? 0) + 1);
  }
  const worst = [...perLang].sort((a, b) => b[1] - a[1])[0];
  assert.ok(
    worst[1] < 45_000,
    `${worst[0]}가 ${worst[1].toLocaleString()}개다 — 45,000을 넘으면 조각이 늘어 ` +
    'app/sitemapN.xml/route.ts를 새로 만들어야 한다',
  );
  // 열 언어가 다 있어야 이 셈이 뜻을 갖는다
  assert.equal(perLang.size, 10, `언어가 ${perLang.size}개로 세어졌다 — 묶는 방식이 깨졌다`);
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
