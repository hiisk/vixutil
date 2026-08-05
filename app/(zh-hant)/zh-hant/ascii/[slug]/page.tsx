import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AsciiPage from '@/components/ascii/AsciiPage';
import { codeOf } from '@/lib/ascii/list';
import { detailMetadata, asciiParams } from '@/lib/ascii/route';

export function generateStaticParams() {
  return asciiParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function AsciiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (codeOf(slug) === undefined) notFound();
  return <AsciiPage slug={slug} lang="tw" />;
}
