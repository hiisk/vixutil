import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { QUIZZES, QUIZ_MAP } from '@/lib/quiz-data';
import QuizEngine from '@/components/QuizEngine';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return QUIZZES.map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) return {};
  return { title: quiz.title, description: quiz.desc };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) notFound();
  return <><QuizEngine quiz={quiz} /><SiteFooter /></>;
}
