import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import RateEngine from '@/components/rate/RateEngine';
import { RATE_SECTION } from '@/lib/rate-section';
import { rateTool, RATE_TOOLS } from '@/lib/rate-tools';
import { sectionAlternates } from '@/lib/formula/ui';

export function generateStaticParams() {
  return RATE_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) return {};
  const text = tool['zh'];
  return {
    title: text.title,
    description: text.long,
    alternates: { canonical: '/zh/rate/' + slug, languages: sectionAlternates('rate', slug) },
  };
}

export default async function RateDetailZH({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="zh" section={RATE_SECTION} Engine={RateEngine} />;
}
