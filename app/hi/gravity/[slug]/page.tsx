import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GravityPage from '@/components/gravity/GravityPage';
import { weightOf } from '@/lib/gravity/list';
import { detailMetadata, gravityParams } from '@/lib/gravity/route';

export function generateStaticParams() {
  return gravityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function GravityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (weightOf(slug) === undefined) notFound();
  return <GravityPage slug={slug} lang="hi" />;
}
