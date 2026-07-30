import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CHECKLISTS_ZH } from '@/lib/checklist-zh';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '免费清单 — 搬家、旅行、职场、健康等',
  description: '免费互动清单：搬家、出国旅行、面试准备、露营、婚礼筹备等。逐条勾选，进度自动保存在浏览器，免注册。',
  alternates: {
    canonical: '/zh/checklist',
    languages: { 'zh': '/zh/checklist', 'en': '/en/checklist', 'x-default': '/en/checklist' },
  },
};

const CARD_GRADIENTS = [
  'from-sky-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600',
  'from-amber-400 to-orange-500', 'from-rose-500 to-pink-600', 'from-cyan-500 to-sky-600',
];

export default function ZhChecklistHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh/checklist" className="font-black text-sky-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">清单</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/en/checklist" className="hover:text-sky-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">Checklist</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">免费清单</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          边做边勾 — <strong className="text-slate-700 dark:text-slate-200">进度保存在浏览器里</strong>，不用注册账号。
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CHECKLISTS_ZH.map((c, i) => {
            const total = c.sections.reduce((s, sec) => s + sec.items.length, 0);
            return (
              <Link key={c.slug} href={`/zh/checklist/${c.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
                <div className="flex items-start justify-between">
                  <ToolIcon emoji={c.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{total}</span>
                </div>
                <div>
                  <div className="text-base font-black drop-shadow leading-tight">{c.title.replace('清单', '')}</div>
                  <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{c.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-sky-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费互动清单</p>
      </footer>
    </div>
  );
}
