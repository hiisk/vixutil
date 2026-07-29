import Link from 'next/link';
import type { Metadata } from 'next';
import { GENERATORS_ZH } from '@/lib/generator-zh';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '免费名字生成器 — 奇幻、科幻等',
  description: '免费在线名字生成器：奇幻、科幻、巨龙、超级英雄、反派、公会、海盗名字等。即时生成，无限使用，免注册。',
  alternates: {
    canonical: '/zh/generator',
    languages: { 'zh': '/zh/generator', 'en': '/en/generator', 'ko': '/generator', 'x-default': '/en/generator' },
  },
};

const CARD_GRADIENTS = [
  'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600', 'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600', 'from-amber-400 to-orange-500', 'from-fuchsia-500 to-rose-500',
];

export default function ZhGeneratorHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh/generator" className="font-black text-emerald-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">名字生成器</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/generator" className="hover:text-emerald-600" hrefLang="ko">한국어</Link>
            <Link href="/en/generator" className="hover:text-emerald-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">免费生成器</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">名字生成器</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          为游戏、小说与角色即时生成名字创意 — <strong className="text-slate-700 dark:text-slate-200">免费、免注册</strong>。
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GENERATORS_ZH.map((g, i) => (
            <Link key={g.slug} href={`/zh/generator/${g.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{g.icon}</div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{g.title.replace('生成器', '')}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{g.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-emerald-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费在线生成器</p>
      </footer>
    </div>
  );
}
