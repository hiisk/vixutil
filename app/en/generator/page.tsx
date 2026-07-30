import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GENERATORS_EN } from '@/lib/generator-en';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'Free Name Generators — Fantasy, Sci-Fi & More',
  description: 'Free online name generators: fantasy, sci-fi, dragon, superhero, villain, guild, pirate names and more. Instant, unlimited, no sign-up.',
  alternates: {
    canonical: '/en/generator',
    languages: {
      'en': '/en/generator',
      'ko': '/generator',
      // 중국어판이 /en/generator를 가리키는데 여기서 되받지 않으면 상호 참조가
      // 끊겨 구글이 이 hreflang 묶음을 무시한다.
      'x-default': '/en/generator',
    },
  },
};

const CARD_GRADIENTS = [
  'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600', 'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600', 'from-amber-400 to-orange-500', 'from-fuchsia-500 to-rose-500',
];

export default function EnGeneratorHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en/generator" className="font-black text-emerald-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Name Generators</span>
          <Link href="/generator" className="ml-auto text-xs font-bold text-slate-400 hover:text-emerald-600" hrefLang="ko">한국어</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">Free Generators</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Name Generators</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Instant, unlimited name ideas for games, stories and characters — <strong className="text-slate-700 dark:text-slate-200">free, no sign-up</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GENERATORS_EN.map((g, i) => (
            <Link key={g.slug} href={`/en/generator/${g.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <ToolIcon emoji={g.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{g.title.replace(' Generator', '')}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{g.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-emerald-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free online generators</p>
      </footer>
    </div>
  );
}
