import { CHUNK_SIZE, sitemapChunkCount } from '../sitemap';

/**
 * 사이트맵 조각들을 묶는 목록.
 *
 * generateSitemaps는 /sitemap/0.xml … 을 낼 뿐 그것들을 묶는 목록은 안 만든다.
 * 크롤러에게는 목록 하나만 알려 주면 되므로(robots.txt가 이 주소를 가리킨다)
 * 여기서 조각 수만큼 줄을 세운다. 조각 수는 주소가 늘면 저절로 따라 는다.
 */
export const dynamic = 'force-static';

const BASE = 'https://vixutil.com';

export function GET(): Response {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...Array.from({ length: sitemapChunkCount() }, (_, id) =>
      `<sitemap><loc>${BASE}/sitemap/${id}.xml</loc></sitemap>`),
    '</sitemapindex>',
  ].join('\n');
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      // 조각 수가 배포마다 바뀔 수 있으므로 CDN에 오래 물리지 않는다
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
      'X-Chunk-Size': String(CHUNK_SIZE),
    },
  });
}
