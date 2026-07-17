import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CHECKLISTS, CHECKLISTS_MAP } from '@/lib/checklist-data';
import ChecklistEngine from '@/components/ChecklistEngine';
import RelatedContent from '@/components/RelatedContent';
import CrossLinks from '@/components/CrossLinks';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return CHECKLISTS.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const checklist = CHECKLISTS_MAP[slug];
  if (!checklist) return {};
  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);
  return {
    title: checklist.title,
    description: `${checklist.desc} — ${total}개 항목, 진행 상황 자동 저장`,
    alternates: { canonical: `/checklist/${slug}` },
  };
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
      <ChecklistEngine checklist={checklist} />
      <div className="max-w-lg mx-auto px-4 w-full">
        <CrossLinks className="mb-4" />
      </div>
      <RelatedContent items={CHECKLISTS} currentSlug={slug} basePath="/checklist" accent="sky" />
      <SiteFooter />
    </>
  );
}
