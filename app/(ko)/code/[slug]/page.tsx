import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CodePage from '@/components/code/CodePage';
import { cellOf, charOf } from '@/lib/code/list';
import { detailMetadata, codeParams } from '@/lib/code/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return codeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function CodeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!charOf(slug) && cellOf(slug) === undefined) notFound();
  return <CodePage slug={slug} lang="ko" />;
}
