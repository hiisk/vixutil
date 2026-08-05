import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColorNamePage from '@/components/ColorNamePage';
import { NAMED_COLORS_8, namedColor } from '@/lib/color/named8';
import { detailMetadata } from '@/lib/color/route';
import { prerender } from '@/lib/prerender';

export function generateStaticParams() {
  return prerender(NAMED_COLORS_8.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function ColorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const color = namedColor(slug);
  if (!color) notFound();
  return <ColorNamePage color={color} lang="pt" />;
}
