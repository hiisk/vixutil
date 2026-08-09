import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColorNamePage from '@/components/ColorNamePage';
import { NAMED_COLORS_8, namedColor } from '@/lib/color/named8';
import { detailMetadata } from '@/lib/color/route';
import { prerender } from '@/lib/prerender';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(NAMED_COLORS_8.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function ColorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const color = namedColor(slug);
  if (!color) notFound();
  return <ColorNamePage color={color} lang="ja" />;
}
