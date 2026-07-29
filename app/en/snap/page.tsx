import Link from 'next/link';
import type { Metadata } from 'next';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'Snap Tests — Analyse One Photo in Your Browser',
  description: 'Free photo tests using real face detection: smile score, face symmetry and the golden ratio. Everything runs in your browser — no photo is ever uploaded.',
  alternates: {
    canonical: '/en/snap',
    languages: { 'en': '/en/snap', 'zh': '/zh/snap', 'ko': '/snap', 'x-default': '/en/snap' },
  },
};

/* 허브에는 실제로 만든 것만 싣는다 — 없는 페이지를 링크하면 404다 */
const TESTS = [
  { href: '/en/snap/smile-score',   icon: '😊', title: 'Smile Score',      desc: 'How far your mouth corners lift', color: 'from-amber-400 to-rose-500' },
  { href: '/en/snap/face-symmetry', icon: '⚖️', title: 'Face Symmetry',    desc: 'Left–right balance, feature by feature', color: 'from-violet-500 to-fuchsia-600' },
  { href: '/en/snap/golden-ratio',  icon: '📐', title: 'Golden Ratio Test', desc: 'How close your proportions sit to φ', color: 'from-amber-400 to-orange-500' },
  { href: '/en/snap/photo-mood',    icon: '🎨', title: 'Photo Mood',       desc: 'Colour mood from any photo', color: 'from-sky-400 to-violet-500' },
  { href: '/en/snap/expression',    icon: '🎭', title: 'Expression Analyser', desc: 'Seven emotions, inferred by a model', color: 'from-indigo-500 to-purple-500' },
  { href: '/en/snap/first-impression', icon: '✨', title: 'First Impression', desc: 'Which of six impressions you read as', color: 'from-fuchsia-500 to-violet-600' },
  { href: '/en/snap/handwriting',   icon: '✍️', title: 'Handwriting',      desc: 'Slant and pressure from your writing', color: 'from-teal-400 to-cyan-500' },
  { href: '/en/snap/face-reading',  icon: '🔮', title: 'Face Reading',     desc: 'Seven features, traditional style', color: 'from-amber-500 to-red-500' },
  { href: '/en/snap/animal-face',   icon: '🐾', title: 'Animal Face Type', desc: 'Which of twelve animals you match', color: 'from-orange-400 to-rose-500' },
  { href: '/en/snap/personal-color', icon: '🎨', title: 'Personal Colour',  desc: 'Your seasonal type and palette', color: 'from-pink-400 to-violet-500' },
];

export default function EnSnapHub() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en/snap" className="font-black text-fuchsia-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Snap tests</span>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/snap" className="hover:text-fuchsia-600" hrefLang="ko">한국어</Link>
            <Link href="/zh/snap" className="hover:text-fuchsia-600" hrefLang="zh">中文</Link>
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📸</div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Snap Tests</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Real face detection, one photo, nothing uploaded</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TESTS.map(t => (
            <Link key={t.href} href={t.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.color} text-white p-6 min-h-[10rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <span className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{t.icon}</span>
              <div>
                <div className="text-lg font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-xs font-medium text-white/80 mt-1">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">Every test runs entirely inside your browser. Your photo is never sent to a server, and nothing is stored after you close the page.</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-fuchsia-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">Free photo tests</p>
      </footer>
    </div>
  );
}
