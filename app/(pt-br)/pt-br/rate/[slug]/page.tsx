import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import RateEngine from '@/components/rate/RateEngine';
import { RATE_SECTION } from '@/lib/rate-section';
import { rateTool, RATE_TOOLS } from '@/lib/rate-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { RATE_LANGS } from '@/lib/rate-section';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(RATE_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) return {};
  const text = textOf(tool, 'pt-br');
  return withCard({
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('pt-br'),
    alternates: {
      canonical: localeHref('pt-br', `/rate/${slug}`),
      languages: sectionAlternates('rate', slug, RATE_LANGS),
    },
  });
}

export default async function RateDetailPtBr({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="pt-br" section={RATE_SECTION} Engine={RateEngine} />;
}
