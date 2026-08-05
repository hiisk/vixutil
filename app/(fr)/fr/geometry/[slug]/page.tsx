import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import GeoEngine from '@/components/geometry/GeoEngine';
import { GEO_SECTION, GEO_LANGS } from '@/lib/geo-section';
import { geoTool, GEO_TOOLS } from '@/lib/geo-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

export function generateStaticParams() {
  return prerender(GEO_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) return {};
  const text = textOf(tool, 'fr');
  return withCard({
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('fr'),
    alternates: {
      canonical: localeHref('fr', `/geometry/${slug}`),
      languages: sectionAlternates('geometry', slug, GEO_LANGS),
    },
  });
}

export default async function GeoDetailFr({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="fr" section={GEO_SECTION} Engine={GeoEngine} />;
}
