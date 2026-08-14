import { sitemapResponse } from '../sitemap';

/* /sitemap9.xml — 지금은 hi. 자리는 언어 차례로 정해지고, 한 언어가 45,000을 넘으면
   그 언어가 조각을 여럿 가져 뒤가 밀린다(까닭은 app/sitemap.ts). 자리는 언어에 고정돼 있다(까닭은 app/sitemap.ts).
   generateSitemaps를 쓰면 /sitemap/8.xml 밑으로 내려가므로 형제 라우트로 낸다. */
export const dynamic = 'force-static';

export function GET(): Response {
  return sitemapResponse(8);
}
