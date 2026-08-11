import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import RateEngine from '@/components/rate/RateEngine';
import { RATE_SECTION } from '@/lib/rate-section';
import { rateTool, RATE_TOOLS } from '@/lib/rate-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/text';
import { localeHref, openGraphFor } from '@/lib/locales';
import { RATE_LANGS } from '@/lib/rate-section';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/rate/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = rateTool(slug);
    if (!tool) return {};
    const text = textOf(tool, lang);
    return withCard({
      title: text.title,
      description: text.long,
      openGraph: openGraphFor(lang),
      alternates: {
        canonical: localeHref(lang, `/rate/${slug}`),
        languages: sectionAlternates('rate', slug, RATE_LANGS),
      },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = rateTool(slug);
    if (!tool) notFound();
    return <FormulaPage tool={tool} lang={lang} section={RATE_SECTION} Engine={RateEngine} />;
  }

  return { generateMetadata, Page };
}
