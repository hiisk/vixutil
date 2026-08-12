/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import { GEO_LANGS } from '@/lib/geo-section';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import GeoEngine from '@/components/geometry/GeoEngine';
import { GEO_SECTION } from '@/lib/geo-section';
import { geoTool, GEO_TOOLS } from '@/lib/geo-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';


export function generateStaticParams() {
  return prerender(GEO_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) return {};
  const text = tool['ko'];
  return withCard({
    title: text.title,
    description: text.long,
    alternates: { canonical: '/geometry/' + slug, languages: sectionAlternates('geometry', slug, GEO_LANGS) },
  });
}

export default async function GeoDetailKO({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = geoTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="ko" section={GEO_SECTION} Engine={GeoEngine} />;
}
