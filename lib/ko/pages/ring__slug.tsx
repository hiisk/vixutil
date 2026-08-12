/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RingPage from '@/components/ring/RingPage';
import { cellOf } from '@/lib/ring/list';
import { detailMetadata, ringParams } from '@/lib/ring/route';


export function generateStaticParams() {
  return ringParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function RingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (cellOf(slug) === undefined) notFound();
  return <RingPage slug={slug} lang="ko" />;
}
