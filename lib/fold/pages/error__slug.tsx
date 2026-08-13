import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ErrPage from '@/components/errmsg/ErrPage';
import { detailMetadata } from '@/lib/errmsg/route';
import { errItem } from '@/lib/errmsg/list';
import { prerender } from '@/lib/prerender';
import { ERR_ITEMS } from '@/lib/errmsg/list';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 낱장은 아홉 언어가 이 모듈 하나를 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!errItem(slug)) notFound();
    return <ErrPage slug={slug} lang={DATA_KEY[lang]} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 목록은 prerender()가 걸러 지금은 빈 배열이다.
     까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => prerender(ERR_ITEMS.map(e => ({ slug: e.slug })));

  return { generateMetadata, generateStaticParams, Page };
}
