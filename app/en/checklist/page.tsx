import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CHECKLISTS_EN } from '@/lib/checklist-en';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'Free Checklists — Moving, Travel, Work, Health & More',
  description: 'Free interactive checklists for moving house, international travel, job interviews, camping, weddings and more. Tick items off, progress saves automatically.',
  alternates: {
    canonical: '/en/checklist',
    languages: { 'en': '/en/checklist', 'zh': '/zh/checklist', 'x-default': '/en/checklist' },
  },
};

const CARD_GRADIENTS = [
  'from-sky-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600',
  'from-amber-400 to-orange-500', 'from-rose-500 to-pink-600', 'from-cyan-500 to-sky-600',
];

export default function EnChecklistHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en/checklist" className="font-black text-sky-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Checklists</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/zh/checklist" className="hover:text-sky-600" hrefLang="zh">中文</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">Checklists</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Free Checklists</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Tick things off as you go — <strong className="text-slate-700 dark:text-slate-200">progress saves in your browser</strong>, no account needed.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CHECKLISTS_EN.map((c, i) => {
            const total = c.sections.reduce((s, sec) => s + sec.items.length, 0);
            return (
              <Link key={c.slug} href={`/en/checklist/${c.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
                <div className="flex items-start justify-between">
                  <ToolIcon emoji={c.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{total}</span>
                </div>
                <div>
                  <div className="text-base font-black drop-shadow leading-tight">{c.title.replace(' Checklist', '')}</div>
                  <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{c.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-sky-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free interactive checklists</p>
      </footer>
    </div>
  );
}
