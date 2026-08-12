import { sitemapResponse } from '../sitemap';

/* /sitemap3.xml — es. 자리는 언어에 고정돼 있다(까닭은 app/sitemap.ts).
   generateSitemaps를 쓰면 /sitemap/2.xml 밑으로 내려가므로 형제 라우트로 낸다. */
export const dynamic = 'force-static';

export function GET(): Response {
  return sitemapResponse(2);
}
