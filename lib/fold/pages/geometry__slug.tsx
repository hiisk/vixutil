import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import GeoEngine from '@/components/geometry/GeoEngine';
import { GEO_SECTION, GEO_LANGS } from '@/lib/geo-section';
import { geoTool, GEO_TOOLS } from '@/lib/geo-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/geometry/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = geoTool(slug);
    if (!tool) return {};
    const text = textOf(tool, lang);
    return withCard({
      title: text.title,
      description: text.long,
      openGraph: openGraphFor(lang),
      alternates: {
        canonical: localeHref(lang, `/geometry/${slug}`),
        languages: sectionAlternates('geometry', slug, GEO_LANGS),
      },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = geoTool(slug);
    if (!tool) notFound();
    return <FormulaPage tool={tool} lang={lang} section={GEO_SECTION} Engine={GeoEngine} />;
  }

  return { generateMetadata, Page };
}
