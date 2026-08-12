/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RomanPage from '@/components/roman/RomanPage';
import { yearOf } from '@/lib/roman/list';
import { detailMetadata, romanParams } from '@/lib/roman/route';


export function generateStaticParams() {
  return romanParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function RomanDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (yearOf(slug) === undefined) notFound();
  return <RomanPage slug={slug} lang="ko" />;
}
