/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CidrPage from '@/components/cidr/CidrPage';
import { prefixOf } from '@/lib/cidr/list';
import { detailMetadata, cidrParams } from '@/lib/cidr/route';


export function generateStaticParams() {
  return cidrParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function CidrDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!prefixOf(slug)) notFound();
  return <CidrPage slug={slug} lang="ko" />;
}
