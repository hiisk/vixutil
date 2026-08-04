import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import KeycodePage from '@/components/keycode/KeycodePage';
import { keyOf } from '@/lib/keycode/list';
import { detailMetadata, keycodeParams } from '@/lib/keycode/route';

export function generateStaticParams() {
  return keycodeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function KeycodeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!keyOf(slug)) notFound();
  return <KeycodePage slug={slug} lang="es" />;
}
