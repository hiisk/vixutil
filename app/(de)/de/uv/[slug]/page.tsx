import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UvPage from '@/components/uv/UvPage';
import { cellOf } from '@/lib/uv/list';
import { detailMetadata, uvParams } from '@/lib/uv/route';

export function generateStaticParams() {
  return uvParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function UvDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <UvPage slug={slug} lang="de" />;
}
