import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BLOCKED_CRAWLERS } from '@/lib/crawlers';

/**
 * 요청 하나마다 두 가지를 한다 — 봇을 막고, 응답에 캐시 헤더를 붙인다.
 *
 * ── ① 캐시 헤더: 이게 없으면 사이트가 멈춘다 ────────────────────
 * 낱장 913개가 force-dynamic이다. Next는 동적 페이지에 `private, no-cache,
 * no-store`를 직접 붙이므로 그대로 두면 **CDN이 한 장도 안 받는다** — 요청마다
 * 원본이 페이지 전체를 보내 Fast Origin Transfer가 한도의 348%까지 올랐고 실제로
 * 사이트가 멈췄다(2026-08-10). 여기서 그 헤더를 s-maxage로 덮어 CDN이 받게 한다.
 *
 * **왜 next.config의 headers()가 아니라 여기인가 (2026-08-13, 실측):**
 * next.config에 같은 규칙을 넣고 배포해 봤더니 **정적 라우트에만 먹었다.**
 *
 *   /sitemap.xml (정적)      s-maxage=86400      ← headers()가 붙였다
 *   / · /ja/bra (정적·허브)   s-maxage=31536000   ← headers()가 붙였다, x-vercel-cache HIT
 *   /ja/bra/60-5 (동적 낱장)  private, no-store   ← **함수가 붙인 것이 이겼다**
 *
 * 로컬 `next start`에서는 둘 다 먹어서 구별이 안 됐다. Vercel에서는 next.config
 * 헤더를 **Vercel의 라우팅 층**이 붙이는데 함수가 스스로 낸 Cache-Control이 그것을
 * 이긴다. 미들웨어 헤더는 반대로 **Next 자신의 런타임**이 응답에 병합하므로 로컬과
 * 같은 결과가 나온다. 그래서 동적 낱장 몫은 이 파일이 맡는다.
 *
 * next.config의 headers()는 그대로 둔다 — 정적 라우트와 /sitemap.xml은 그쪽이
 * 이미 제대로 붙이고 있고(위 실측), 그 자리는 미들웨어를 안 타는 편이 싸다.
 *
 * 값: 이제 **요청마다 미들웨어가 돈다**(전에는 봇 UA에만 돌았다). 헤더 하나 세우는
 * 일이라 CPU는 미미하지만 호출 수가 는다. 그 값을 치르는 까닭은 ISR 쓰기가 크롤
 * 한 바퀴에 무료 한도의 240~343%라 그쪽으로는 답이 없기 때문이다 —
 * 셈 전체는 lib/prerender.ts.
 *
 * ── ② 봇 차단 ─────────────────────────────────────────────────
 * robots.txt는 지킬 의무가 없어서 무시하는 봇이 있다(Bytespider가 이름난 예다).
 * 주소가 20만 개라 봇 하나가 훑기만 해도 한도를 축낸다. 403은 함수도 안 타고
 * 캐시에도 안 쓰인다. 어느 봇을 왜 가르는지는 lib/crawlers.ts에 적었다.
 *
 * 목록을 **여기서 코드로 읽는다** — matcher는 빌드 때 정적으로 읽혀 변수를 못 쓰지만
 * 함수 본문은 그렇지 않다. 전에는 정규식을 손으로 한 벌 더 적어야 했는데, 이제
 * 어차피 모든 요청이 이 함수를 타므로 그럴 필요가 없어졌다(두 곳에 적힌 목록은
 * 반드시 어긋난다).
 */
const BLOCKED = new RegExp(`(?:${BLOCKED_CRAWLERS.join('|')})`, 'i');

/** 이 헤더가 붙는 순간 CDN이 받아 준다. 값의 근거는 next.config.ts */
const CACHE = 'public, s-maxage=31536000, must-revalidate';

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  /* 규칙을 지키는 봇이 스스로 물러날 수 있게 robots.txt는 누구에게나 연다 */
  if (pathname === '/robots.txt') return NextResponse.next();

  if (BLOCKED.test(req.headers.get('user-agent') ?? '')) {
    return new NextResponse(null, { status: 403 });
  }

  /* 사이트맵은 하루다 — 조각이 배포마다 늘 수 있어 1년으로 덮으면 안 된다.
     그쪽은 route.ts와 next.config가 이미 붙이고 있으므로 손대지 않는다.
     /version은 캐시하면 옛 배포의 답이 남아 뜻이 없어진다(app/version/route.ts). */
  if (pathname.startsWith('/sitemap') || pathname === '/version') return NextResponse.next();

  const res = NextResponse.next();
  res.headers.set('Cache-Control', CACHE);
  /*
   * 진단용 표식. 이 헤더가 보이면 **미들웨어가 세운 응답 헤더가 실제로 나간다**는
   * 뜻이다. 이것은 보이는데 Cache-Control만 no-store로 남으면, Vercel이 동적
   * 페이지의 Cache-Control만 따로 지킨다는 뜻이 된다 — 그 경우 CDN 방식은 접고
   * 페이지 수를 줄이는 쪽을 봐야 한다. 둘을 가르는 데 배포 한 번씩 드는 값이라
   * 남겨 둔다(바이트로는 서른 자다).
   */
  res.headers.set('X-Cache-Policy', 'proxy');
  return res;
}

export const config = {
  /*
   * 정적 자산은 뺀다 — 이미 immutable로 캐시되고, 요청 수가 가장 많은 자리라
   * 여기서 빼는 것이 호출 수를 가장 크게 줄인다.
   */
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
