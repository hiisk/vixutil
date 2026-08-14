import { sitemapResponse } from '../sitemap';

/* /sitemap12.xml — 넘친 몫. 앞 열 개는 언어에 고정돼 있고(app/sitemap.ts),
   한 언어가 CHUNK_SIZE를 넘으면 그 나머지가 여기부터 붙는다.
   이 파일이 모자라면 넘친 주소가 조용히 사라진다 — 그래서 미리 넉넉히 둔다. */
export const dynamic = 'force-static';

export function GET(): Response {
  return sitemapResponse(11);
}
