import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import CraftEngine from '@/components/craft/CraftEngine';
import { CRAFT_SECTION, CRAFT_LANGS } from '@/lib/craft-section';
import { craftTool, CRAFT_TOOLS } from '@/lib/craft-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(CRAFT_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = craftTool(slug);
  if (!tool) return {};
  const text = tool['ko'];
  return withCard({
    title: text.title,
    description: text.long,
    alternates: { canonical: '/craft/' + slug, languages: sectionAlternates('craft', slug, CRAFT_LANGS) },
  });
}

export default async function CraftDetailKO({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = craftTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="ko" section={CRAFT_SECTION} Engine={CraftEngine} />;
}
