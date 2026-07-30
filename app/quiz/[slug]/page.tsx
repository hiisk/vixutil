import { notFound } from 'next/navigation';
import { hasAlternates, localeAlternates } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import { QUIZZES, QUIZ_MAP } from '@/lib/quiz-data';
import QuizEngine from '@/components/QuizEngine';
import QuizContent from '@/components/QuizContent';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { contentFaq } from '@/lib/content-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return QUIZZES.map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) return {};
  return { title: quiz.title, description: quiz.desc, alternates: {
      canonical: `/quiz/${slug}`,
      // 언어별로 내용을 따로 쓴 섹션이라 슬러그가 겹치는 것만 짝으로 맺는다
      ...(hasAlternates('quiz', slug) ? { languages: localeAlternates('quiz', slug) } : {}),
    } };
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
      <div className="bg-white dark:bg-slate-900">
        <div className="max-w-lg mx-auto px-4 pb-10 w-full">
          <Faq items={contentFaq('quiz', slug, quiz)} className="" />
        </div>
      </div>
      <RelatedContent items={QUIZZES} currentSlug={slug} basePath="/quiz" accent="amber" />
      <SiteFooter />
    </>
  );
}
