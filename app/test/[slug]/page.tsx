import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TESTS, TEST_MAP } from '@/lib/test-data';
import TestEngine from '@/components/TestEngine';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return TESTS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const test = TEST_MAP[slug];
  if (!test) return {};
  return { title: test.title, description: test.desc };
}

export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TEST_MAP[slug];
  if (!test) notFound();
  return (
    <>
      <TestEngine test={test} />
      <RelatedContent items={TESTS} currentSlug={slug} basePath="/test" accent="violet" />
      <SiteFooter />
    </>
  );
}
