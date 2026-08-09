import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GeneratorIntlDetail, generatorIntlDetailMeta } from '@/components/GeneratorIntlPage';
import { GENERATORS_INTL, GENERATORS_INTL_MAP } from '@/lib/generator-l10n';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return GENERATORS_INTL['de'].map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generatorIntlDetailMeta('de', slug);
}

export default async function GeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATORS_INTL_MAP['de'][slug];
  if (!gen) notFound();
  return <GeneratorIntlDetail lang="de" gen={gen} />;
}
