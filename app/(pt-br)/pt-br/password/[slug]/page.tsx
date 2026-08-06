import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PasswordPage from '@/components/password/PasswordPage';
import { cellOf } from '@/lib/password/list';
import { detailMetadata, passwordParams } from '@/lib/password/route';

export function generateStaticParams() {
  return passwordParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function PasswordDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <PasswordPage slug={slug} lang="pt" />;
}
