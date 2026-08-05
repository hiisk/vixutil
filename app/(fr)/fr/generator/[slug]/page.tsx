import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GeneratorIntlDetail, generatorIntlDetailMeta } from '@/components/GeneratorIntlPage';
import { GENERATORS_INTL, GENERATORS_INTL_MAP } from '@/lib/generator-l10n';

export function generateStaticParams() {
  return GENERATORS_INTL['fr'].map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generatorIntlDetailMeta('fr', slug);
}

export default async function GeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATORS_INTL_MAP['fr'][slug];
  if (!gen) notFound();
  return <GeneratorIntlDetail lang="fr" gen={gen} />;
}
