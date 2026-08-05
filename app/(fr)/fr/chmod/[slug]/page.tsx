import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChmodPage from '@/components/chmod/ChmodPage';
import { modeOf } from '@/lib/chmod/list';
import { detailMetadata, chmodParams } from '@/lib/chmod/route';

export function generateStaticParams() {
  return chmodParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function ChmodDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!modeOf(slug)) notFound();
  return <ChmodPage slug={slug} lang="fr" />;
}
