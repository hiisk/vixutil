import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RegexPage from '@/components/regex/RegexPage';
import { patternOf } from '@/lib/regex/list';
import { detailMetadata, patternParams } from '@/lib/regex/route';

export function generateStaticParams() {
  return patternParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function RegexDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!patternOf(slug)) notFound();
  return <RegexPage slug={slug} lang="ja" />;
}
