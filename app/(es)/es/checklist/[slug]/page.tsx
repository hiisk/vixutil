import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChecklistIntlDetail, checklistIntlDetailMeta } from '@/components/ChecklistIntlPage';
import { CHECKLISTS_INTL, CHECKLISTS_INTL_MAP } from '@/lib/checklist-l10n/index';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return CHECKLISTS_INTL['es'].map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return checklistIntlDetailMeta('es', slug);
}

export default async function ChecklistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const checklist = CHECKLISTS_INTL_MAP['es'][slug];
  if (!checklist) notFound();
  return <ChecklistIntlDetail lang="es" checklist={checklist} />;
}
