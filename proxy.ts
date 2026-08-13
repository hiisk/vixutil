import { NextResponse } from 'next/server';

/**
 * robots.txt를 무시하는 봇에게 403을 준다.
 *
 * ── 왜 있나 (2026-08-13, 무료 복귀 판) ─────────────────────
 * app/robots.ts가 학습용 수집기와 SEO 도구를 가리지만, robots.txt는 **지킬 의무가
 * 없다** — 실제로 무시하는 봇이 있다(Bytespider가 이름난 예다). 주소가 20만 개라
 * 봇 하나가 훑기만 해도 Hobby 한도(Edge 요청 100만 · Fast Origin Transfer 10GB ·
 * ISR 쓰기)를 축낸다. 여기서 403을 주면 그 요청은 함수도 안 타고 캐시에 쓰지도
 * 않는다 — 25바이트 응답 하나로 끝난다.
 *
 * ── 어떻게 동작하나 ───────────────────────────────────────
 * 아래 matcher의 has 조건(User-Agent 정규식)에 **걸린 요청만** 이 함수가 받는다.
 * 일반 방문자와 검색 엔진은 matcher 단계에서 걸러져 이 함수를 아예 안 탄다 —
 * 지연도 호출 비용도 0이다. Next가 정규식을 ^…$로 감싸 전체 일치로 보므로
 * 앞뒤를 .*로 열어 둔다(node_modules/next/dist/shared/lib/router/utils/
 * prepare-destination.js의 matchHas).
 *
 * /robots.txt만 빼 둔다 — 여기 적힌 봇 가운데 규칙을 지키는 것들(Ahrefs 등)은
 * robots.txt를 읽고 스스로 물러난다. 그 문서까지 막으면 정책을 볼 길이 없다.
 *
 * ── 목록은 lib/crawlers.ts가 원본이다 ─────────────────────
 * matcher는 빌드 때 정적으로 읽혀서 변수를 못 쓴다(문서: "matcher 값은 상수여야
 * 한다"). 그래서 BLOCKED_CRAWLERS를 여기 정규식 리터럴로 한 번 더 적을 수밖에
 * 없고, 두 곳이 어긋나면 tests/crawlers.test.ts가 잡는다 — 목록을 고칠 때는
 * lib/crawlers.ts를 고치고, 검사가 시키는 대로 이 정규식을 맞춘다.
 */
export function proxy(): NextResponse {
  return new NextResponse(null, { status: 403 });
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
