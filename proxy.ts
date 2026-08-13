import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BLOCKED_CRAWLERS } from '@/lib/crawlers';

/**
 * robots.txt를 무시하는 봇에게 403을 준다.
 *
 * ── 왜 있나 ───────────────────────────────────────────────────
 * robots.txt는 지킬 의무가 없어서 무시하는 봇이 있다(Bytespider가 이름난 예다).
 * 주소가 20만 개라 봇 하나가 훑기만 해도 Hobby 한도(Edge 요청 100만 · Fast Origin
 * Transfer 10GB · ISR 쓰기)를 축낸다. 403은 함수도 안 타고 캐시에도 안 쓰인다.
 * 어느 봇을 왜 가르는지는 lib/crawlers.ts에 적었다.
 *
 * ── 여기서 캐시 헤더를 붙이려다 접었다 (2026-08-13) ─────────────
 * 낱장을 force-dynamic으로 두고 이 파일에서 s-maxage를 붙이면 ISR 쓰기 없이
 * CDN만으로 캐시할 수 있을 것 같았다. **배포해서 재 보니 안 된다.**
 *
 *   x-cache-policy: proxy                  ← 미들웨어가 세운 헤더는 그대로 나갔다
 *   cache-control: private, …, no-store    ← Cache-Control만 프레임워크 것이 이겼다
 *
 * 즉 미들웨어로 아무 헤더나 붙일 수 있지만 **Cache-Control만은 못 이긴다.**
 * next.config의 headers()도 정적 라우트에만 먹었다(그쪽 실측은 그 파일에 있다).
 * 그래서 App Router 페이지는 ISR로 캐시되거나 캐시가 아예 없거나 둘뿐이고,
 * 낱장은 ISR로 돌아갔다 — 셈은 lib/prerender.ts.
 *
 * 그 결과 이 파일은 다시 **봇에게만** 돈다. 아래 matcher의 has 조건에 걸린 요청만
 * 이 함수를 타므로 사람과 검색 엔진은 비용이 0이다. Next가 정규식을 ^…$로 감싸
 * 전체 일치로 보므로 앞뒤를 .*로 열어 둔다(prepare-destination.js의 matchHas).
 *
 * ── 목록은 lib/crawlers.ts가 원본이다 ─────────────────────────
 * matcher는 빌드 때 정적으로 읽혀 변수를 못 쓴다(문서: "matcher 값은 상수여야
 * 한다"). 그래서 정규식 리터럴로 한 벌 더 적을 수밖에 없고, 두 곳이 어긋나면
 * tests/crawlers.test.ts가 잡는다 — 고칠 때는 lib/crawlers.ts를 고치고 검사가
 * 시키는 대로 이 정규식을 맞춘다.
 *
 * /robots.txt는 뺀다 — 규칙을 지키는 봇들(Ahrefs 등)은 그것을 읽고 스스로 물러난다.
 */
const BLOCKED = new RegExp(`(?:${BLOCKED_CRAWLERS.join('|')})`, 'i');

export function proxy(req: NextRequest): NextResponse {
  if (BLOCKED.test(req.headers.get('user-agent') ?? '')) {
    return new NextResponse(null, { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/((?!robots\\.txt$).*)',
      has: [
        {
          type: 'header',
          key: 'user-agent',
          value:
            '.*(GPTBot|ClaudeBot|anthropic-ai|CCBot|Bytespider|Google-Extended|Applebot-Extended|meta-externalagent|FacebookBot|Diffbot|Omgilibot|Omgili|Timpibot|Webzio-Extended|ImagesiftBot|AI2Bot|Kangaroo Bot|PanguBot|Sidetrade indexer bot|cohere-ai|cohere-training-data-crawler|AhrefsBot|SemrushBot|MJ12bot|DotBot|BLEXBot|DataForSeoBot|Barkrowler|ZoominfoBot|PetalBot|SeekportBot|serpstatbot|MegaIndex|Screaming Frog SEO Spider|SiteAuditBot|rogerbot|linkdexbot).*',
        },
      ],
    },
  ],
};
