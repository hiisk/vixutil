import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { QUIZZES, QUIZ_MAP } from '@/lib/quiz-data';
import QuizEngine from '@/components/QuizEngine';
import QuizContent from '@/components/QuizContent';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return QUIZZES.map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) return {};
  return { title: quiz.title, description: quiz.desc, alternates: { canonical: `/quiz/${slug}` } };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '지식 퀴즈', path: '/quiz' },
          { name: quiz.title, path: `/quiz/${slug}` },
        ])}
      />
      <QuizEngine quiz={quiz} />
      <QuizContent quiz={quiz} />
      <RelatedContent items={QUIZZES} currentSlug={slug} basePath="/quiz" accent="amber" />
      <SiteFooter />
    </>
  );
}
