import { notFound } from 'next/navigation';
import { hasAlternates, localeAlternates, localesWithItem } from '@/lib/locale-alternates';
import LangPicker from '@/components/LangPicker';
import type { Metadata } from 'next';
import { TESTS, TEST_MAP } from '@/lib/test-data';
import TestEngine from '@/components/TestEngine';
import TestContent from '@/components/TestContent';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { contentFaq } from '@/lib/content-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return TESTS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const test = TEST_MAP[slug];
  if (!test) return {};
  return { title: test.title, description: test.desc, alternates: {
      canonical: `/test/${slug}`,
      // 언어별로 내용을 따로 쓴 섹션이라 슬러그가 겹치는 것만 짝으로 맺는다
      ...(hasAlternates('test', slug) ? { languages: localeAlternates('test', slug) } : {}),
    } };
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
      {/* 번역판이 있는 슬러그에서만 — 없는데 띄우면 그 언어가 404다 */}
      {hasAlternates('test', slug) && (
        <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
          <LangPicker current="ko" route={`/test/${slug}`} available={localesWithItem('test', slug)} />
        </div>
      )}
      <TestEngine test={test} />
      <TestContent test={test} />
      <div className="bg-white dark:bg-slate-900">
        <div className="max-w-lg mx-auto px-4 pb-10 w-full">
          <Faq items={contentFaq('test', slug, test)} className="" />
        </div>
      </div>
      <RelatedContent items={TESTS} currentSlug={slug} basePath="/test" accent="violet" />
      <SiteFooter />
    </>
  );
}
