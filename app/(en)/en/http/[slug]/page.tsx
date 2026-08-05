import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HttpPage from '@/components/http/HttpPage';
import { httpItemOf } from '@/lib/http/list';
import { detailMetadata, httpParams } from '@/lib/http/route';

export function generateStaticParams() {
  return httpParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function HttpDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!httpItemOf(slug)) notFound();
  return <HttpPage slug={slug} lang="en" />;
}
