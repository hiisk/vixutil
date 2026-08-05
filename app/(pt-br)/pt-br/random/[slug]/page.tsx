import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import { randomMetaIntl } from '@/lib/random-ui-intl';
import RandomToolPageIntl from '@/components/RandomToolPageIntl';
import { prerender } from '@/lib/prerender';

export function generateStaticParams() {
  return prerender(RANDOM_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!RANDOM_TOOLS_MAP[slug]) return {};
  return randomMetaIntl('pt-br', slug);
}

export default async function PtBrRandomToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!RANDOM_TOOLS_MAP[slug]) notFound();
  return <RandomToolPageIntl slug={slug} lang="pt-br" />;
}
