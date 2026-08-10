import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import { randomMetaIntl } from '@/lib/random-ui-intl';
import RandomToolPageIntl from '@/components/RandomToolPageIntl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/random/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!RANDOM_TOOLS_MAP[slug]) return {};
    return randomMetaIntl(lang, slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!RANDOM_TOOLS_MAP[slug]) notFound();
    return <RandomToolPageIntl slug={slug} lang={lang} />;
  }

  return { generateMetadata, Page };
}
