import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import { randomMetaIntl } from '@/lib/random-ui-intl';
import RandomToolPageIntl from '@/components/RandomToolPageIntl';

export function generateStaticParams() {
  return RANDOM_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!RANDOM_TOOLS_MAP[slug]) return {};
  return randomMetaIntl('hi', slug);
}

export default async function HiRandomToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!RANDOM_TOOLS_MAP[slug]) notFound();
  return <RandomToolPageIntl slug={slug} lang="hi" />;
}
