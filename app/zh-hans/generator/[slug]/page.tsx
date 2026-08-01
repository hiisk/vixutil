import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GeneratorIntlDetail, generatorIntlDetailMeta } from '@/components/GeneratorIntlPage';
import { GENERATORS_INTL, GENERATORS_INTL_MAP } from '@/lib/generator-l10n';

export function generateStaticParams() {
  return GENERATORS_INTL['zh-hans'].map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generatorIntlDetailMeta('zh-hans', slug);
}

export default async function GeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATORS_INTL_MAP['zh-hans'][slug];
  if (!gen) notFound();
  return <GeneratorIntlDetail lang="zh-hans" gen={gen} />;
}
