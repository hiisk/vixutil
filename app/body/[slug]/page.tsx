import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import BodyEngine from '@/components/body/BodyEngine';
import { BODY_SECTION } from '@/lib/body-section';
import { bodyTool, BODY_TOOLS } from '@/lib/body-tools';
import { sectionAlternates } from '@/lib/formula/ui';

export function generateStaticParams() {
  return BODY_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) return {};
  const text = tool['ko'];
  return {
    title: text.title,
    description: text.long,
    alternates: { canonical: '/body/' + slug, languages: sectionAlternates('body', slug) },
  };
}

export default async function BodyDetailKO({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="ko" section={BODY_SECTION} Engine={BodyEngine} />;
}
