import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { QuizIntlDetail, quizIntlDetailMeta } from '@/components/QuizIntlPage';
import { QUIZZES_INTL, QUIZZES_INTL_MAP } from '@/lib/quiz-l10n/index';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return QUIZZES_INTL['de'].map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return quizIntlDetailMeta('de', slug);
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZZES_INTL_MAP['de'][slug];
  if (!quiz) notFound();
  return <QuizIntlDetail lang="de" quiz={quiz} />;
}
