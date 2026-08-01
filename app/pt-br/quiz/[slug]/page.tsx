import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { QuizIntlDetail, quizIntlDetailMeta } from '@/components/QuizIntlPage';
import { QUIZZES_INTL, QUIZZES_INTL_MAP } from '@/lib/quiz-l10n/index';

export function generateStaticParams() {
  return QUIZZES_INTL['pt-br'].map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return quizIntlDetailMeta('pt-br', slug);
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZZES_INTL_MAP['pt-br'][slug];
  if (!quiz) notFound();
  return <QuizIntlDetail lang="pt-br" quiz={quiz} />;
}
