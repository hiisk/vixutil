/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]/[deep]가 부른다. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MbtiTypePage from '@/components/fortune/MbtiTypePage';
import { detailMetadata, mbtiParams } from '@/lib/mbti/route';
import { typeOfSlug } from '@/lib/mbti/facts';

export function generateStaticParams() {
  return mbtiParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata(slug);
}

export default async function MbtiType({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = typeOfSlug(slug);
  if (!t) notFound();
  return <MbtiTypePage type={t} />;
}
