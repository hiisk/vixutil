import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CONVERT_TOOLS, CONVERT_MAP } from '@/lib/convert-tools';
import { convertMetaIntl } from '@/lib/convert-ui-intl';
import ConvertPage from '@/components/ConvertPage';
import { prerender } from '@/lib/prerender';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(CONVERT_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!CONVERT_MAP[slug]) return {};
  return convertMetaIntl('es', slug);
}

export default async function EsConvertToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) notFound();
  return <ConvertPage tool={tool} lang="es" />;
}
