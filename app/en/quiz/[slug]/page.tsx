import ToolIcon from '@/components/ToolIcon';
import { notFound } from 'next/navigation';
import { localeAlternates } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import Link from 'next/link';
import { QUIZZES_EN, QUIZZES_EN_MAP } from '@/lib/quiz-en';
import QuizEngine from '@/components/QuizEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return QUIZZES_EN.map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = QUIZZES_EN_MAP[slug];
  if (!quiz) return {};
  return {
    title: `${quiz.title} — Free Online Quiz`,
    description: `${quiz.desc}. Ten questions with explanations. Free, no sign-up.`,
    alternates: {
      canonical: '/en/quiz/' + slug,
      languages: localeAlternates('quiz', slug),
    },
  };
}

export default async function EnQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZZES_EN_MAP[slug];
  if (!quiz) notFound();
  const others = QUIZZES_EN.filter(q => q.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/en/quiz' },
          { name: 'Quizzes', path: '/en/quiz' },
          { name: quiz.title, path: '/en/quiz/' + slug },
        ])}
      />
      <QuizEngine quiz={quiz} lang="en" />
      <div className="max-w-lg mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">More quizzes</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/en/quiz/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/en/quiz" className="text-sm font-black text-amber-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          Free quizzes · <Link href={`/zh/quiz/${slug}`} className="hover:text-amber-600" hrefLang="zh">中文</Link>
        </p>
      </footer>
    </>
  );
}
