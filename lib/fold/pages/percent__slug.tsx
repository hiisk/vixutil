import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PercentPage from '@/components/percent/PercentPage';
import { parsePercentSlug } from '@/lib/percent/list';
import { detailMetadata, percentParams } from '@/lib/percent/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 아홉 언어가 이 모듈 하나를 같이 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!parsePercentSlug(slug)) notFound();
    return <PercentPage slug={slug} lang={DATA_KEY[lang]} />;
  }

  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — 까닭은 lib/prerender.ts */
  const generateStaticParams = () => percentParams();

  return { generateMetadata, generateStaticParams, Page };
}
