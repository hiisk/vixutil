/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SizePage from '@/components/imgsize/SizePage';
import { imgSizeOf } from '@/lib/imgsize/list';
import { detailMetadata, sizeParams } from '@/lib/imgsize/route';


export function generateStaticParams() {
  return sizeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function SizeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!imgSizeOf(slug)) notFound();
  return <SizePage slug={slug} lang="ko" />;
}
