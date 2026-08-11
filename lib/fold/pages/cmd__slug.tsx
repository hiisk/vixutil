import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CmdPage from '@/components/cmd/CmdPage';
import { detailMetadata } from '@/lib/cmd/route';
import { cmdItem } from '@/lib/cmd/list';
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
    if (!cmdItem(slug)) notFound();
    return <CmdPage slug={slug} lang={DATA_KEY[lang]} />;
  }

  return { generateMetadata, Page };
}
