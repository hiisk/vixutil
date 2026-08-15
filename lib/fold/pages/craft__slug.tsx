import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import CraftEngine from '@/components/craft/CraftEngine';
import { CRAFT_SECTION, CRAFT_LANGS } from '@/lib/craft-section';
import { craftTool } from '@/lib/craft-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/text';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
import { CRAFT_TOOLS } from '@/lib/craft-tools';
import type { FoldLang } from '../lang';

/* 낱장은 아홉 언어가 이 모듈 하나를 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = craftTool(slug);
    if (!tool) return {};
    const text = textOf(tool, lang);
    return withCard({
      title: text.title,
      description: text.long,
      openGraph: openGraphFor(lang),
      alternates: {
        canonical: localeHref(lang, `/craft/${slug}`),
        languages: sectionAlternates('craft', slug, CRAFT_LANGS),
      },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = craftTool(slug);
    if (!tool) notFound();
    return <FormulaPage tool={tool} lang={lang} section={CRAFT_SECTION} Engine={CraftEngine} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 목록은 prerender()가 걸러 지금은 빈 배열이다.
     까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => prerender(CRAFT_TOOLS.map(t => ({ slug: t.slug })));

  return { generateMetadata, generateStaticParams, Page };
}
