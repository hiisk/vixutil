import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CONVERT_TOOLS, CONVERT_MAP } from '@/lib/convert-tools';
import { convertAlternates, CONVERT_UI } from '@/lib/convert-ui-intl';
import ConvertPage, { localized } from '@/components/ConvertPage';

export function generateStaticParams() {
  return CONVERT_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) return {};
  const text = localized(tool, 'zh');
  return {
    title: `${text.title} — ${CONVERT_UI['zh'].suffix}`,
    description: text.long,
    alternates: { canonical: `/zh/convert/${slug}`, languages: convertAlternates(slug) },
  };
}

export default async function ZhConvertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) notFound();
  return <ConvertPage tool={tool} lang="zh" />;
}
