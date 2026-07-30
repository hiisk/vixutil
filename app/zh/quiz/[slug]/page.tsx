import { notFound } from 'next/navigation';
import { localeAlternates } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import Link from 'next/link';
import { QUIZZES_ZH, QUIZZES_ZH_MAP } from '@/lib/quiz-zh';
import QuizEngine from '@/components/QuizEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return QUIZZES_ZH.map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = QUIZZES_ZH_MAP[slug];
  if (!quiz) return {};
  return {
    title: `${quiz.title} — 免费在线测验`,
    description: `${quiz.desc}. 十道题，附解析。免费、免注册。`,
    alternates: {
      canonical: '/zh/quiz/' + slug,
      languages: localeAlternates('quiz', slug),
    },
  };
}

export default async function ZhQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZZES_ZH_MAP[slug];
  if (!quiz) notFound();
  const others = QUIZZES_ZH.filter(q => q.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/zh/quiz' },
          { name: '测验', path: '/zh/quiz' },
          { name: quiz.title, path: '/zh/quiz/' + slug },
        ])}
      />
      <QuizEngine quiz={quiz} lang="zh" />
      <div className="max-w-lg mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">更多测验</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/zh/quiz/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <div className="text-xl mb-1">{o.icon}</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/zh/quiz" className="text-sm font-black text-amber-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          免费测验 · <Link href={`/en/quiz/${slug}`} className="hover:text-amber-600" hrefLang="en">EN</Link>
        </p>
      </footer>
    </>
  );
}
