import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TESTS_EN } from '@/lib/test-en';
import PageGlow from '@/components/PageGlow';
import { thumbGradient } from '@/lib/thumbnail';

export const metadata: Metadata = {
  title: 'Free Personality Tests — Social Battery, Stress, Decisions & More',
  description: 'Free personality tests: social battery, how you handle stress, your decision style, working style and how you show affection. Ten questions each, no sign-up.',
  alternates: {
    canonical: '/en/test',
    languages: { 'en': '/en/test', 'zh': '/zh/test', 'x-default': '/en/test' },
  },
};

export default function EnTestHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en/test" className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Tests</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/zh/test" className="hover:text-violet-600" hrefLang="zh">中文</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-2">Test</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Free Personality Tests</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Ten questions each, about two minutes, results you can actually use.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TESTS_EN.map(t => (
            <Link key={t.slug} href={`/en/test/${t.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thumbGradient(t.slug, 'test')} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between">
                <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{t.questions.length}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-violet-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free personality tests</p>
      </footer>
    </div>
  );
}
