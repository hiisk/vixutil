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
  return detailMetadata('hi', slug);
}

export default async function CidrDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!prefixOf(slug)) notFound();
  return <CidrPage slug={slug} lang="hi" />;
}
