import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CONVERT_TOOLS, CONVERT_MAP } from '@/lib/convert-tools';
import { convertMetaIntl } from '@/lib/convert-ui-intl';
import ConvertPage from '@/components/ConvertPage';

export function generateStaticParams() {
  return CONVERT_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!CONVERT_MAP[slug]) return {};
  return convertMetaIntl('hi', slug);
}

export default async function HiConvertToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) notFound();
  return <ConvertPage tool={tool} lang="hi" />;
}
