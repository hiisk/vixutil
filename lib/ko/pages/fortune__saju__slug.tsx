/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]/[deep]가 부른다.
   /fortune/saju/<주제> 일곱 장. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuTopicPage from '@/components/fortune/SajuTopicPage';
import { TOPIC_SLUGS, isTopicSlug, topicMetadata } from '@/lib/saju-topics';
import { TOPIC_L10N } from '@/lib/saju-topics-l10n/index';

export function generateStaticParams() {
  return TOPIC_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isTopicSlug(slug)) return {};
  return topicMetadata('ko', slug);
}

export default async function SajuTopicLeaf({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isTopicSlug(slug)) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '사주 분석', path: '/fortune/saju' },
        { name: TOPIC_L10N.ko.title[slug], path: `/fortune/saju/${slug}` },
      ])} />
      <SajuTopicPage lang="ko" topic={slug} />
    </>
  );
}
