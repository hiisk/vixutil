import { notFound } from 'next/navigation';
import { BODY_LANGS } from '@/lib/body-section';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import BodyEngine from '@/components/body/BodyEngine';
import { BODY_SECTION } from '@/lib/body-section';
import { bodyTool, BODY_TOOLS } from '@/lib/body-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';

export function generateStaticParams() {
  return prerender(BODY_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) return {};
  const text = tool['en'];
  return {
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('en'),
    alternates: { canonical: '/en/body/' + slug, languages: sectionAlternates('body', slug, BODY_LANGS) },
  };
}

export default async function BodyDetailEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="en" section={BODY_SECTION} Engine={BodyEngine} />;
}
