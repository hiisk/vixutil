import Link from 'next/link';
import type { Metadata } from 'next';
import { QUIZZES } from '@/lib/quiz-data';
import QuizSearch from '@/components/QuizSearch';
import { toCard } from '@/lib/card';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '지식 퀴즈',
  description: '한국사, IT, K-POP, 건강 상식 등 100가지 퀴즈 모음',
};

export default function QuizIndexPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-amber-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">지식 퀴즈</span>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{QUIZZES.length}개</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Knowledge Quiz</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">지식 퀴즈</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          상식부터 전문 지식까지 — <strong className="text-slate-700 dark:text-slate-200">{QUIZZES.length}개</strong>
        </p>

        <QuizSearch quizzes={QUIZZES.map(toCard)} />

        <Faq items={SECTION_FAQ.quiz} />
      </div>
      <SiteFooter />
    </div>
  );
}
