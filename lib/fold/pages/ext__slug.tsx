import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExtPage from '@/components/ext/ExtPage';
import { extOf } from '@/lib/ext/list';
import { detailMetadata, extParams } from '@/lib/ext/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/ext/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!extOf(slug)) notFound();
    return <ExtPage slug={slug} lang={DATA_KEY[lang]} />;
  }

  return { generateMetadata, Page };
}
