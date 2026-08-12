import { sitemapPartCount, sitemapPartPath } from '../sitemap';

/**
 * 사이트맵 조각들을 묶는 목록.
 *
 * 언어마다 형제 파일이 하나씩 있고(/sitemap.xml, /sitemap2.xml …) 그것을 묶는다.
 * 크롤러에게는 목록 하나만 알려 주면 되므로(robots.txt가 이 주소를 가리킨다)
 * 여기서 조각 수만큼 줄을 세운다. 조각 수는 주소가 늘면 저절로 따라 는다.
 */
export const dynamic = 'force-static';

const BASE = 'https://vixutil.com';

export function GET(): Response {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    /* 조각은 /sitemap.xml 의 형제다 — /sitemap2.xml … (까닭은 app/sitemap.ts) */
    ...Array.from({ length: sitemapPartCount() }, (_, n) =>
      `<sitemap><loc>${BASE}${sitemapPartPath(n)}</loc></sitemap>`),
    '</sitemapindex>',
  ].join('\n');
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      // 조각 수가 배포마다 바뀔 수 있으므로 CDN에 오래 물리지 않는다
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
          },
  });
}
