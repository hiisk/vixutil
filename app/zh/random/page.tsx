import Link from 'next/link';
import type { Metadata } from 'next';
import { RANDOM_TOOLS } from '@/lib/random-tools';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '随机抽取工具 — 转盘、点名、骰子等',
  description: '免费在线随机决定工具：幸运转盘、随机点名器、随机分组、随机数生成器、抛硬币、掷骰子、鬼脚图和神秘圣诞人。即时可用，免注册。',
  alternates: {
    canonical: '/zh/random',
    languages: { 'zh': '/zh/random', 'en': '/en/random', 'ko': '/random', 'x-default': '/en/random' },
  },
};

export default function ZhRandomHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/zh/random" className="font-black text-rose-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">随机工具</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/random" className="hover:text-rose-600" hrefLang="ko">한국어</Link>
            <Link href="/en/random" className="hover:text-rose-600" hrefLang="en">EN</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-rose-600 tracking-widest uppercase mb-2">随机抽取</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">随机工具</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          交给运气来决定 — <strong className="text-slate-700 dark:text-slate-200">公平、即时、免费</strong>。转盘、点名、分组、骰子等一应俱全。
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {RANDOM_TOOLS.map(t => (
            <Link key={t.slug} href={`/zh/random/${t.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{t.icon}</div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{t.titleZh}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.descZh}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-rose-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">免费随机决定工具</p>
      </footer>
    </div>
  );
}
