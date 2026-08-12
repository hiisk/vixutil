/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   그리는 것도 generateStaticParams도 아홉 언어와 같다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SteelPage from '@/components/steel/SteelPage';
import { cellOf } from '@/lib/steel/list';
import { detailMetadata, steelParams } from '@/lib/steel/route';


export function generateStaticParams() {
  return steelParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function SteelDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <SteelPage slug={slug} lang="ko" />;
}
