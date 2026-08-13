/**
 * 지금 무엇이 배포돼 있는지 알려 준다 — /version
 *
 * ── 왜 있나 (2026-08-13) ──────────────────────────────────────
 * 이 저장소는 「어느 커밋이 라이브인지」를 몰라서 진단을 **세 번** 틀렸다.
 *
 *   2026-08-07  "마지막 푸시 = 마지막 배포"로 넘겨짚고 기준선을 잡았다. 실제로
 *               성공한 마지막 배포는 하루 전 것이었고, 그 뒤 값들은 한 번도 배포된
 *               적이 없었다(lib/prerender.ts의 그 문단)
 *   2026-08-13  ISR로 되돌린 커밋 넷이 푸시 안 된 채로 있었다 — 라이브는 사고를 낸
 *               force-dynamic 그대로였는데 고친 줄 알고 있었다
 *   2026-08-13  캐시 헤더가 안 먹는 것인지 아직 배포가 안 된 것인지 가를 수단이
 *               없어 20분을 기다리며 헤더만 찍었다
 *
 * 세 번 다 **라이브에 물어보면 1초에 끝나는 질문**이었다. 그래서 물어볼 자리를 만든다.
 *
 * ── 쓰는 법 ───────────────────────────────────────────────────
 *   curl -s https://vixutil.com/version
 *   {"sha":"dadb6327…","ref":"main","builtAt":"2026-08-13T…"}
 *
 * 로컬에서는 sha가 "local"이다(Vercel이 주는 환경변수라 그렇다).
 *
 * ── 캐시하지 않는다 ───────────────────────────────────────────
 * 이 라우트만은 캐시하면 뜻이 없어진다 — 옛 배포의 답이 CDN에 남아 있으면 그것이
 * 바로 이 라우트가 막으려는 착각이다. proxy.ts도 이 경로는 헤더를 안 건드린다.
 */
export const dynamic = 'force-dynamic';

/* Vercel이 빌드 때 넣어 준다. 없으면 로컬이다 */
const SHA = process.env.VERCEL_GIT_COMMIT_SHA ?? 'local';
const REF = process.env.VERCEL_GIT_COMMIT_REF ?? 'local';
const BUILT_AT = new Date().toISOString();

export function GET(): Response {
  return new Response(JSON.stringify({ sha: SHA, ref: REF, builtAt: BUILT_AT }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      /* 색인 대상이 아니다 — 사이트맵에도 없고 어디서도 링크하지 않는다 */
      'X-Robots-Tag': 'noindex',
    },
  });
}
