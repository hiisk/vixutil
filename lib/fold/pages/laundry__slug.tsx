import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LaundryPage from '@/components/laundry/LaundryPage';
import { cellOf } from '@/lib/laundry/list';
import { detailMetadata, laundryParams } from '@/lib/laundry/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 아홉 언어가 이 모듈 하나를 같이 쓴다 — 낱장은 언어마다 남아 있는
   app/(xx)/xx/laundry/[slug]/page.tsx 껍데기가 이것을 부른다(요청 때 그린다) */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!cellOf(slug)) notFound();
    return <LaundryPage slug={slug} lang={DATA_KEY[lang]} />;
  }


  /*
   * ── ISR을 켜려면 이것이 있어야 한다 (2026-08-13) ───────────────
   * generateStaticParams가 없으면 [slug] 라우트는 **동적**으로 잡혀(빌드 표에 ƒ)
   * 캐시를 아예 쓰지 않는다. revalidate만 적어도 듣지 않는다 — 실제로 그렇게
   * 해 보고 헤더가 no-store로 남는 것을 확인했다.
   *
   * 목록은 비어 있어도 된다(지금 lib/prerender.ts의 LIMIT이 0이라 빈 배열이다).
   * 빈 목록이면 빌드는 한 장도 굽지 않고, dynamicParams가 기본으로 켜져 있어
   * 처음 열릴 때 만들어 캐시에 넣는다. 그것이 next.config.ts 머리말이 적어 둔 구조다.
   */
  const generateStaticParams = () => laundryParams();

  return { generateMetadata, generateStaticParams, Page };
}
