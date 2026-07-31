import { notFound } from 'next/navigation';
import { GEO_LANGS } from '@/lib/geo-section';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import GeoEngine from '@/components/geometry/GeoEngine';
import { GEO_SECTION } from '@/lib/geo-section';
import { geoTool, GEO_TOOLS } from '@/lib/geo-tools';
import { sectionAlternates } from '@/lib/formula/ui';

export function generateStaticParams() {
  return GEO_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) return {};
  const text = tool['ko'];
  return {
    title: text.title,
    description: text.long,
    alternates: { canonical: '/geometry/' + slug, languages: sectionAlternates('geometry', slug, GEO_LANGS) },
  };
}

export default async function GeoDetailKO({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="ko" section={GEO_SECTION} Engine={GeoEngine} />;
}
