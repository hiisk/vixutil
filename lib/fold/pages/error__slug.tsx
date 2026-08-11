import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ErrPage from '@/components/errmsg/ErrPage';
import { detailMetadata } from '@/lib/errmsg/route';
import { errItem } from '@/lib/errmsg/list';
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

  return { generateMetadata, Page };
}
