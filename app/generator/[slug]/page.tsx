import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GENERATORS, GENERATOR_MAP } from '@/lib/generator-data';
import GeneratorEngine from '@/components/GeneratorEngine';
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
  return <><GeneratorEngine gen={gen} /><SiteFooter /></>;
}
