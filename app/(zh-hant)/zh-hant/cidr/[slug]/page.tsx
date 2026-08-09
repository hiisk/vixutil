import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CidrPage from '@/components/cidr/CidrPage';
import { prefixOf } from '@/lib/cidr/list';
import { detailMetadata, cidrParams } from '@/lib/cidr/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return cidrParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function CidrDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!prefixOf(slug)) notFound();
  return <CidrPage slug={slug} lang="tw" />;
}
