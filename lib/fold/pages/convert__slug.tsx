import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CONVERT_TOOLS, CONVERT_MAP } from '@/lib/convert-tools';
import { convertMetaIntl } from '@/lib/convert-ui-intl';
import ConvertPage from '@/components/ConvertPage';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/convert/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!CONVERT_MAP[slug]) return {};
    return convertMetaIntl(lang, slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = CONVERT_MAP[slug];
    if (!tool) notFound();
    return <ConvertPage tool={tool} lang={lang} />;
  }

  return { generateMetadata, Page };
}
