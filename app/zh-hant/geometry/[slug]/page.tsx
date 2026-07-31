import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import GeoEngine from '@/components/geometry/GeoEngine';
import { GEO_SECTION, GEO_LANGS } from '@/lib/geo-section';
import { geoTool, GEO_TOOLS } from '@/lib/geo-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';

export function generateStaticParams() {
  return GEO_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) return {};
  const text = textOf(tool, 'zh-hant');
  return {
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('zh-hant'),
    alternates: {
      canonical: localeHref('zh-hant', `/geometry/${slug}`),
      languages: sectionAlternates('geometry', slug, GEO_LANGS),
    },
  };
}

export default async function GeoDetailZhHant({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="zh-hant" section={GEO_SECTION} Engine={GeoEngine} />;
}
