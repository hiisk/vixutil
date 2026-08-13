import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TarotCardPage from '@/components/tarot/TarotCardPage';
import { cardOf } from '@/lib/tarot/deck';
import { cardParams, detailMetadata } from '@/lib/tarot/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/fortune/card/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!cardOf(slug)) notFound();
    return <TarotCardPage slug={slug} lang={DATA_KEY[lang]} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => cardParams();

  return { generateMetadata, generateStaticParams, Page };
}
