import type { MetadataRoute } from "next";
import { sitemapPartCount, sitemapPartPath } from "./sitemap";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
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
