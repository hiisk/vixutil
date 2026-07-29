import Link from 'next/link';
import type { Metadata } from 'next';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'vixutil — Free Everyday Tools',
  description: 'Free tools that run in your browser: unit conversion, checklists, quizzes, personality tests, name generators, random pickers, photo tests and daily horoscopes. No sign-up.',
  alternates: {
    canonical: '/en',
    languages: { 'en': '/en', 'zh': '/zh', 'ko': '/', 'x-default': '/en' },
  },
};

/*
  영어 진입점.

  섹션 허브는 있었는데 그걸 묶는 루트 페이지가 없었다. /en/fortune 같은 곳으로
  바로 들어온 방문자가 "이 사이트에 또 뭐가 있나"를 볼 방법이 없었고, /en으로
  가는 링크는 404였다.

  실제로 만든 섹션만 싣는다 — 없는 곳을 링크하면 404이자 깨진 내부 링크다.
*/
const SECTIONS = [
  { href: '/en/convert',   icon: '📐', title: 'Unit Converter',    desc: 'Length, weight, temperature, area and more', color: 'from-slate-500 to-slate-700',   accent: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', bg: 'bg-slate-50 dark:bg-slate-800/40' },
  { href: '/en/checklist', icon: '✅', title: 'Checklists',        desc: 'Moving, travel, interviews, camping, weddings', color: 'from-sky-400 to-cyan-600',     accent: 'text-sky-700 dark:text-sky-300',     border: 'border-sky-200 dark:border-sky-900/50',   bg: 'bg-sky-50 dark:bg-sky-950/30' },
  { href: '/en/test',      icon: '🧭', title: 'Personality Tests', desc: 'Social battery, stress, decisions, work style', color: 'from-violet-500 to-pink-600',  accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { href: '/en/quiz',      icon: '🏆', title: 'Quizzes',           desc: 'Capitals, science, history, tech, film',      color: 'from-amber-400 to-orange-500', accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { href: '/en/generator', icon: '⚙️', title: 'Name Generators',   desc: 'Fantasy, sci-fi, superhero, villain names',   color: 'from-emerald-400 to-teal-600', accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { href: '/en/random',    icon: '🎲', title: 'Random Pickers',    desc: 'Wheel, name picker, teams, dice, Secret Santa', color: 'from-rose-500 to-pink-600',   accent: 'text-rose-700 dark:text-rose-300',   border: 'border-rose-200 dark:border-rose-900/50',  bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { href: '/en/snap',      icon: '📸', title: 'Snap Tests',        desc: 'One photo: smile score, symmetry, face reading', color: 'from-fuchsia-500 to-sky-500', accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
  { href: '/en/fortune',   icon: '🔮', title: 'Horoscopes',        desc: 'Star signs, Chinese zodiac, tarot, BaZi',     color: 'from-violet-500 to-purple-700', accent: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-900/50', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  { href: '/en/time',      icon: '⏱️', title: 'Time Tools',        desc: 'Timer, stopwatch, world clock, date maths', color: 'from-sky-400 to-cyan-600',   accent: 'text-cyan-700 dark:text-cyan-300',   border: 'border-cyan-200 dark:border-cyan-900/50',  bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { href: '/en/color',     icon: '🎨', title: 'Colour Tools',      desc: 'Palette, shades, contrast, CSS gradient',      color: 'from-fuchsia-500 to-rose-500', accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
];

export default function EnHome() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-14 text-center">
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
            <span className="sr-only"> — free everyday tools</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-base">Free tools that run in your browser</p>
          <p className="mt-4 flex items-center justify-center gap-3 text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-blue-600" hrefLang="ko">한국어</Link>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <Link href="/zh" className="hover:text-blue-600" hrefLang="zh">中文</Link>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative overflow-hidden rounded-2xl border ${s.border} ${s.bg} backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <span className="text-3xl block mb-4">{s.icon}</span>
                <h2 className={`text-lg font-black ${s.accent} mb-1`}>{s.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{s.desc}</p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.accent}`}>
                  Open
                  <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">
          Everything here runs in your browser. Nothing is uploaded, nothing needs an account.
        </p>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300 dark:text-slate-600">vixutil.com</p>
      </footer>
    </div>
  );
}
