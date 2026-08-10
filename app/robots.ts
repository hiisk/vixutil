import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // 주소가 16만 개라 사이트맵을 조각으로 나눴다 — 크롤러에는 묶음 목록만 알려 준다
    sitemap: "https://vixutil.com/sitemap-index.xml",
    host: "https://vixutil.com",
  };
}
