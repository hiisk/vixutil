import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChecklistIntlDetail, checklistIntlDetailMeta } from '@/components/ChecklistIntlPage';
import { CHECKLISTS_INTL, CHECKLISTS_INTL_MAP } from '@/lib/checklist-l10n/index';

export function generateStaticParams() {
  return CHECKLISTS_INTL['zh-hant'].map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return checklistIntlDetailMeta('zh-hant', slug);
}

export default async function ChecklistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const checklist = CHECKLISTS_INTL_MAP['zh-hant'][slug];
  if (!checklist) notFound();
  return <ChecklistIntlDetail lang="zh-hant" checklist={checklist} />;
}
