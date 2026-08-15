/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { detailMetadata, screenParams } from '@/lib/device/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';
/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/device/screen/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function buildMeta(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  
  /*
   * ── ISR을 켜려면 generateStaticParams가 있어야 한다 (2026-08-13) ──
   * 없으면 [slug] 라우트가 **동적**으로 잡혀(빌드 표에 ƒ) 캐시를 아예 쓰지
   * 않는다. revalidate만 적어도 듣지 않는다 — 실제로 그렇게 해 보고 헤더가
   * no-store로 남는 것을 확인했다. 목록은 비어 있어도 된다(prerender()가 지금
   * 빈 배열이다) — dynamicParams가 켜져 있어 처음 열릴 때 만들어 캐시에 넣는다.
   */
  const generateStaticParams = () => screenParams();

  return { generateMetadata, generateStaticParams };
}
