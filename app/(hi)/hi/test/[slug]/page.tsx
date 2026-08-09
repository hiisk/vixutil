import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TestIntlDetail, testIntlDetailMeta } from '@/components/TestIntlPage';
import { TESTS_INTL, TESTS_INTL_MAP } from '@/lib/test-l10n/index';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return TESTS_INTL['hi'].map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return testIntlDetailMeta('hi', slug);
}

export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TESTS_INTL_MAP['hi'][slug];
  if (!test) notFound();
  return <TestIntlDetail lang="hi" test={test} />;
}
