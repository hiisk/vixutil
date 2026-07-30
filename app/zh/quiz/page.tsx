import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { QUIZZES_ZH } from '@/lib/quiz-zh';
import PageGlow from '@/components/PageGlow';
import { thumbGradient } from '@/lib/thumbnail';

export const metadata: Metadata = {
  title: '免费测验 — 地理、科学、历史与科技',
  description: '免费在线测验：世界首都、科学常识、世界历史、互联网科技、人体常识与电影。每套十题，附解析，免注册。',
  alternates: {
    canonical: '/zh/quiz',
    languages: { 'en': '/en/quiz', 'zh': '/zh/quiz', 'x-default': '/en/quiz' },
  },
};

export default function ZhQuizHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh/quiz" className="font-black text-amber-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">测验</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/en/quiz" className="hover:text-amber-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Quiz</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">免费测验</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">每套十题，四选一，每题都有解析。</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {QUIZZES_ZH.map(q => (
            <Link key={q.slug} href={`/zh/quiz/${q.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thumbGradient(q.slug, 'quiz')} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between">
                <ToolIcon emoji={q.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{q.questions.length}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{q.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{q.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-amber-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费在线测验</p>
      </footer>
    </div>
  );
}
