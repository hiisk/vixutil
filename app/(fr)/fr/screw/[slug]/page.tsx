import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ScrewPage from '@/components/screw/ScrewPage';
import { screwOf } from '@/lib/screw/list';
import { detailMetadata, screwParams } from '@/lib/screw/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return screwParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function ScrewDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!screwOf(slug)) notFound();
  return <ScrewPage slug={slug} lang="fr" />;
}
