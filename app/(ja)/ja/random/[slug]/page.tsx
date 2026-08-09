import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import { randomMetaIntl } from '@/lib/random-ui-intl';
import RandomToolPageIntl from '@/components/RandomToolPageIntl';
import { prerender } from '@/lib/prerender';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(RANDOM_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!RANDOM_TOOLS_MAP[slug]) return {};
  return randomMetaIntl('ja', slug);
}

export default async function JaRandomToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!RANDOM_TOOLS_MAP[slug]) notFound();
  return <RandomToolPageIntl slug={slug} lang="ja" />;
}
