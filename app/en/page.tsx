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
  { href: '/en/image',     icon: '🖼️', title: 'Image Tools',        desc: 'Compress, resize, crop, blur faces',           color: 'from-violet-500 to-indigo-600', accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { href: '/en/sound',     icon: '🔊', title: 'Sound Tools',        desc: 'Metronome, tuner, white noise, tone',          color: 'from-indigo-500 to-violet-600', accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { href: '/en/food',      icon: '🍳', title: 'Cooking Tools',      desc: 'Cups to grams, oven temp, rice, coffee',        color: 'from-amber-500 to-orange-600', accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { href: '/en/game',      icon: '🎮', title: 'Brain Games',        desc: 'Reaction, memory, typing, aim, mental maths',   color: 'from-emerald-500 to-teal-600', accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { href: '/en/device',    icon: '🔧', title: 'Device Tests',       desc: 'Keyboard, mouse, mic, webcam, dead pixels',     color: 'from-sky-500 to-blue-600',     accent: 'text-sky-700 dark:text-sky-300',     border: 'border-sky-200 dark:border-sky-900/50',   bg: 'bg-sky-50 dark:bg-sky-950/30' },
  { href: '/en/text',      icon: '✏️', title: 'Text Tools',         desc: 'Clean up, dedupe, case convert, count',         color: 'from-indigo-500 to-violet-600', accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { href: '/en/rate', icon: '📊', title: 'Percent & Rate', desc: 'Discounts, VAT, percent change, compound interest', color: 'from-orange-500 to-amber-600', accent: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-900/50', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { href: '/en/body', icon: '🎯', title: 'Body Metrics', desc: 'BMI, body fat, BMR, running pace, one-rep max', color: 'from-rose-500 to-red-600', accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { href: '/en/geometry', icon: '🔵', title: 'Geometry', desc: 'Areas, volumes, Pythagoras, angles', color: 'from-cyan-500 to-blue-600', accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { href: '/en/country', icon: '🪙', title: 'Country Facts', desc: 'Time difference, plugs, dialling codes, currency', color: 'from-teal-500 to-emerald-600', accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  { href: '/en/hanja', icon: '🀄', title: 'Four-Character Idioms', desc: 'Fifty Korean idioms with meaning and origin', color: 'from-amber-600 to-yellow-700', accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30' },
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

        {/* 통합 검색 진입점 — 어느 섹션에 있는지 몰라도 찾을 수 있게 한다 */}
        <Link
          href="/en/search"
          className="group flex items-center gap-3 mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-white/70 dark:border-slate-700/70 rounded-2xl px-4 py-3.5 shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all"
        >
          <svg aria-hidden="true" className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-base text-slate-400 dark:text-slate-500 group-hover:text-slate-500 transition-colors">Timer, dead pixel, cups to grams…</span>
          <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0">Search all</span>
        </Link>

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
