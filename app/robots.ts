import type { MetadataRoute } from "next";
import { sitemapPartCount, sitemapPartPath } from "./sitemap";
import { BLOCKED_CRAWLERS } from "@/lib/crawlers";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    /*
     * ── 왜 봇을 가리나 (2026-08-13) ──────────────────────────
     * 주소가 20만 개라 봇 하나가 전부 훑으면 그것만으로 20만 요청이다. Hobby의
     * Edge 요청 한도가 100만이고 **캐시로는 줄지 않는다**(캐시에서 나가는 응답도
     * 요청으로 세어진다). 실제로 Fast Origin Transfer가 한도의 348%까지 올라
     * 사이트가 멈췄다.
     *
     * 검색 엔진은 그대로 받는다 — 색인에서 빠지면 이 사이트의 목적 자체가 사라진다.
     * 막는 것은 학습용 대량 수집기와 SEO 분석 도구다. 어느 봇을 왜 가르는지는
     * lib/crawlers.ts에 적었다.
     */
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: BLOCKED_CRAWLERS, disallow: "/" },
    ],
    /*
     * 언어마다 파일이 하나다 — /sitemap.xml(한국어) · /sitemap2.xml … /sitemap10.xml.
     * 묶음 목록만 알려 주면 크롤러가 목록을 한 번 더 받아야 하므로, 파일을 모두
     * 세워 둔다. robots.txt는 Sitemap 줄을 여럿 가질 수 있다.
     */
    sitemap: [
      "https://vixutil.com/sitemap-index.xml",
      ...Array.from({ length: sitemapPartCount() }, (_, n) => `https://vixutil.com${sitemapPartPath(n)}`),
    ],
    host: "https://vixutil.com",
  };
}
