import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LaundryPage from '@/components/laundry/LaundryPage';
import { cellOf } from '@/lib/laundry/list';
import { detailMetadata } from '@/lib/laundry/route';
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

  return { generateMetadata, Page };
}
