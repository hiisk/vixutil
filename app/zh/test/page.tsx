import Link from 'next/link';
import type { Metadata } from 'next';
import { TESTS_ZH } from '@/lib/test-zh';
import PageGlow from '@/components/PageGlow';
import { thumbGradient } from '@/lib/thumbnail';

export const metadata: Metadata = {
  title: '免费心理测试 — 社交电量、压力、决策方式等',
  description: '免费心理测试：社交电量、压力应对方式、决策风格、工作风格与表达爱的方式。每套十题，免注册。',
  alternates: {
    canonical: '/zh/test',
    languages: { 'en': '/en/test', 'zh': '/zh/test', 'x-default': '/en/test' },
  },
};

export default function ZhTestHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh/test" className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">心理测试</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/en/test" className="hover:text-violet-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-2">Test</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">免费心理测试</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">每套十题，约两分钟，结果真的用得上。</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TESTS_ZH.map(t => (
            <Link key={t.slug} href={`/zh/test/${t.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thumbGradient(t.slug, 'test')} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between">
                <span className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{t.icon}</span>
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
        <p className="text-xs text-slate-400 mt-1">免费心理测试</p>
      </footer>
    </div>
  );
}
