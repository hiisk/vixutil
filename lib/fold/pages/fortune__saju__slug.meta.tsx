/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { TOPIC_SLUGS, isTopicSlug, topicMetadata } from '@/lib/saju-topics';
import type { FoldLang } from '../lang';
/* 사주 주제 낱장 — /<lang>/fortune/saju/<주제>, 아홉 언어.
   라우팅 표를 한 칸도 안 쓴다: lib/fold/registry.ts의 SLUG_ROUTES에 'fortune/saju'
   한 줄을 더하면 이미 있는 [a]/[b]/[slug] 캐치올이 받는다. 한국어는 lib/ko/pages에
   같은 짝이 있다. */
export function buildMeta(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!isTopicSlug(slug)) return {};
    return topicMetadata(lang, slug);
  }

  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => TOPIC_SLUGS.map(slug => ({ slug }));

  return { generateMetadata, generateStaticParams };
}
