import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GENERATORS, GENERATOR_MAP } from '@/lib/generator-data';
import GeneratorEngine from '@/components/GeneratorEngine';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return GENERATORS.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) return {};
  return { title: gen.title, description: gen.desc };
}

export default async function GeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) notFound();
  return (
    <>
      <GeneratorEngine gen={gen} />
      <RelatedContent items={GENERATORS} currentSlug={slug} basePath="/generator" accent="emerald" bg="bg-slate-50 dark:bg-slate-950" />
      <SiteFooter />
    </>
  );
}
