import Link from 'next/link';
import type { Metadata } from 'next';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'Free Daily Horoscope — Star Signs, Chinese Zodiac & Blood Type',
  description: 'Free daily horoscopes: read today’s reading by star sign, Chinese zodiac animal or blood type. Love, money, work and health, updated every day.',
  alternates: {
    canonical: '/en/fortune',
    languages: { 'en': '/en/fortune', 'ko': '/fortune', 'zh': '/zh/fortune', 'x-default': '/en/fortune' },
  },
};

/*
  한국어 허브는 19종을 싣지만 여기엔 실제로 만든 것만 싣는다.
  아직 없는 페이지를 링크해두면 방문자에게는 404, 크롤러에게는
  깨진 내부 링크가 된다. 번역이 끝나는 대로 이 배열에 추가한다.
*/
const TYPES = [
  { href: '/en/fortune/zodiac',     icon: '⭐', title: 'Daily Horoscope',        desc: 'Today’s reading for all 12 star signs',     badge: '12 signs',  color: 'from-violet-500 to-purple-700' },
  { href: '/en/fortune/animal',     icon: '🐉', title: 'Chinese Zodiac',         desc: 'Today’s reading for all 12 animals',        badge: '12 animals', color: 'from-rose-500 to-pink-600' },
  { href: '/en/fortune/blood-type', icon: '🩸', title: 'Blood Type Horoscope',   desc: 'Today’s reading for A, B, O and AB',        badge: '4 types',   color: 'from-rose-500 to-red-600' },
];

export default function EnFortuneHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/en/fortune" className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Horoscopes</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/fortune" className="hover:text-violet-600" hrefLang="ko">한국어</Link>
            <Link href="/zh/fortune" className="hover:text-violet-600" hrefLang="zh">中文</Link>
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔮</div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Free Daily Horoscope</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Updated every day · star signs, Chinese zodiac and blood type</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TYPES.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-md hover:border-violet-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 border border-violet-100 dark:border-violet-900/40">{t.badge}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-violet-600">
                  Read today’s
                  <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-10">
          Horoscopes are generated from today’s date and are for entertainment only
        </p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-violet-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free daily horoscopes</p>
      </footer>
    </div>
  );
}
