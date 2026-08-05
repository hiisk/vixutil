import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import RateEngine from '@/components/rate/RateEngine';
import { RATE_SECTION } from '@/lib/rate-section';
import { rateTool, RATE_TOOLS } from '@/lib/rate-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { RATE_LANGS } from '@/lib/rate-section';
import { prerender } from '@/lib/prerender';

export function generateStaticParams() {
  return prerender(RATE_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) return {};
  const text = textOf(tool, 'de');
  return {
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('de'),
    alternates: {
      canonical: localeHref('de', `/rate/${slug}`),
      languages: sectionAlternates('rate', slug, RATE_LANGS),
    },
  };
}

export default async function RateDetailDe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="de" section={RATE_SECTION} Engine={RateEngine} />;
}
