import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TESTS, TEST_MAP } from '@/lib/test-data';
import TestEngine from '@/components/TestEngine';
import TestContent from '@/components/TestContent';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return TESTS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const test = TEST_MAP[slug];
  if (!test) return {};
  return { title: test.title, description: test.desc, alternates: { canonical: `/test/${slug}` } };
}

export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TEST_MAP[slug];
  if (!test) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '심리 테스트', path: '/test' },
          { name: test.title, path: `/test/${slug}` },
        ])}
      />
      <TestEngine test={test} />
      <TestContent test={test} />
      <RelatedContent items={TESTS} currentSlug={slug} basePath="/test" accent="violet" />
      <SiteFooter />
    </>
  );
}
