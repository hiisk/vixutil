import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TestIntlDetail, testIntlDetailMeta } from '@/components/TestIntlPage';
import { TESTS_INTL, TESTS_INTL_MAP } from '@/lib/test-l10n/index';

export function generateStaticParams() {
  return TESTS_INTL['en'].map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return testIntlDetailMeta('en', slug);
}

export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TESTS_INTL_MAP['en'][slug];
  if (!test) notFound();
  return <TestIntlDetail lang="en" test={test} />;
}
