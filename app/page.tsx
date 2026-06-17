import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'vixutil — 실용 도구 모음',
  description: '계산기·심리테스트 등 일상에 필요한 실용 도구 모음 — vixutil.com',
};

const SECTIONS = [
  {
    href: '/calculator',
    icon: '🧮',
    title: '계산기',
    desc: '세금·금융·건강·부동산 등 70개+ 계산기',
    badge: '70+',
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50',
    textAccent: 'text-blue-700',
    borderAccent: 'border-blue-200',
  },
  {
    href: '#',
    icon: '🧠',
    title: '심리테스트',
    desc: 'MBTI 유형·성격 분석·심리 검사',
    badge: '준비 중',
    color: 'from-violet-500 to-violet-700',
    bgLight: 'bg-violet-50',
    textAccent: 'text-violet-700',
    borderAccent: 'border-violet-200',
    soon: true,
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500" />

      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* 브랜드 */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
            vix<span className="text-blue-600">util</span>
          </h1>
          <p className="text-slate-400 text-base">일상에 필요한 실용 도구 모음</p>
        </div>

        {/* 섹션 카드 */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative rounded-2xl border ${s.borderAccent} ${s.bgLight} p-6 hover:shadow-md transition-all ${s.soon ? 'pointer-events-none opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{s.icon}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.bgLight} ${s.textAccent} border ${s.borderAccent}`}>
                  {s.badge}
                </span>
              </div>
              <h2 className={`text-lg font-black ${s.textAccent} mb-1`}>{s.title}</h2>
              <p className="text-sm text-slate-500">{s.desc}</p>
              {!s.soon && (
                <div className={`mt-4 flex items-center gap-1 text-xs font-semibold ${s.textAccent}`}>
                  바로가기
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300">vixutil.com — 2026</p>
      </footer>
    </div>
  );
}
