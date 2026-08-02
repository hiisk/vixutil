import type { Metadata } from 'next';
import CalcIntlPage, { calcIntlMeta } from '@/components/calc/CalcIntlPage';
import { CALC_INTL_SLUGS } from '@/lib/calc-l10n';

export function generateStaticParams() {
  return CALC_INTL_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return calcIntlMeta('hi', slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CalcIntlPage lang="hi" slug={slug} />;
}
