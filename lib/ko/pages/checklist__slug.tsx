/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import { hasAlternates, localeAlternates, localesWithItem } from '@/lib/locale-alternates';
import LangPicker from '@/components/LangPicker';
import type { Metadata } from 'next';
import { CHECKLISTS, CHECKLISTS_MAP } from '@/lib/checklist-data';
import ChecklistEngine from '@/components/ChecklistEngine';
import RelatedContent from '@/components/RelatedContent';
import CrossLinks from '@/components/CrossLinks';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { contentFaq } from '@/lib/content-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';


export function generateStaticParams() {
  return prerender(CHECKLISTS.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const checklist = CHECKLISTS_MAP[slug];
  if (!checklist) return {};
  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);
  return withCard({
    title: checklist.title,
    description: `${checklist.desc} — ${total}개 항목, 진행 상황 자동 저장`,
    alternates: {
      canonical: `/checklist/${slug}`,
      // 언어별로 내용을 따로 쓴 섹션이라 슬러그가 겹치는 것만 짝으로 맺는다
      ...(hasAlternates('checklist', slug) ? { languages: localeAlternates('checklist', slug) } : {}),
    },
  });
}

export default async function ChecklistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const checklist = CHECKLISTS_MAP[slug];
  if (!checklist) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '체크리스트', path: '/checklist' },
          { name: checklist.title, path: `/checklist/${slug}` },
        ])}
      />
      {/* 번역판이 있는 슬러그에서만 — 없는데 띄우면 그 언어가 404다 */}
      <ChecklistEngine checklist={checklist} headerRight={hasAlternates('checklist', slug) ? <LangPicker current="ko" route={`/checklist/${slug}`} available={localesWithItem('checklist', slug)} /> : null} />
      <div className="max-w-lg mx-auto px-4 w-full">
        <Faq items={contentFaq('checklist', slug, checklist)} className="mb-8" />
        <CrossLinks className="mb-4" />
      </div>
      <RelatedContent items={CHECKLISTS} currentSlug={slug} basePath="/checklist" accent="sky" />
      <SiteFooter />
    </>
  );
}
