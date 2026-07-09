import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'vixutil — 실용 도구 모음',
  description: '계산기·운세·생성기·심리테스트·퀴즈 등 일상에 필요한 실용 유틸 모음 — vixutil.com',
};

const SECTIONS = [
  {
    href: '/calculator',
    icon: '📊',
    title: '계산기',
    desc: '세금·금융·건강·부동산 등 85개+ 계산기',
    badge: '85+',
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50',
    textAccent: 'text-blue-700',
    borderAccent: 'border-blue-200',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/test',
    icon: '🧭',
    title: '심리 테스트',
    desc: 'MBTI·연애·직장·성향 등 심리 테스트',
    badge: '100+',
    color: 'from-violet-500 to-pink-600',
    bgLight: 'bg-violet-50',
    textAccent: 'text-violet-700',
    borderAccent: 'border-violet-200',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/quiz',
    icon: '🏆',
    title: '지식 퀴즈',
    desc: '한국사·IT·상식·K-POP 등 퀴즈',
    badge: '100+',
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50',
    textAccent: 'text-amber-700',
    borderAccent: 'border-amber-200',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/generator',
    icon: '⚙️',
    title: '생성기',
    desc: '닉네임·명언·추천·비밀번호 등 생성',
    badge: '100+',
    color: 'from-emerald-400 to-teal-600',
    bgLight: 'bg-emerald-50',
    textAccent: 'text-emerald-700',
    borderAccent: 'border-emerald-200',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/checklist',
    icon: '✅',
    title: '체크리스트',
    desc: '이사·취업·여행·건강·디지털 등 상황별 체크리스트',
    badge: '70+',
    color: 'from-sky-400 to-cyan-600',
    bgLight: 'bg-sky-50',
    textAccent: 'text-sky-700',
    borderAccent: 'border-sky-200',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/fortune',
    icon: '🔮',
    title: '오늘의 운세',
    desc: '별자리·띠·타로·MBTI 운세 매일 업데이트',
    badge: '6종',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-violet-50',
    textAccent: 'text-violet-700',
    borderAccent: 'border-violet-200',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/snap',
    icon: '📸',
    title: '스냅테스트',
    desc: '사진 한 장으로 즐기는 관상·퍼스널컬러 등 참여형 테스트',
    badge: '10종',
    color: 'from-fuchsia-500 to-sky-500',
    bgLight: 'bg-fuchsia-50',
    textAccent: 'text-fuchsia-700',
    borderAccent: 'border-fuchsia-200',
    shadow: 'shadow-fuchsia-100',
  },
  {
    href: '/crypto',
    icon: '🪙',
    title: 'Crypto Trading Tools',
    desc: '바이낸스 전체 코인 ATR 타점(진입·TP·SL)·수익률 실시간',
    badge: 'NEW',
    color: 'from-amber-400 to-orange-600',
    bgLight: 'bg-amber-50',
    textAccent: 'text-amber-700',
    borderAccent: 'border-amber-200',
    shadow: 'shadow-amber-100',
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 via-amber-400 via-emerald-500 to-sky-400" />

      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Brand */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
          </div>
          <p className="text-slate-400 text-base">일상에 필요한 실용 도구 모음</p>
        </div>

        {/* Section grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative overflow-hidden rounded-2xl border ${s.borderAccent} ${s.bgLight} p-6 hover:shadow-md ${s.shadow} transition-all duration-200`}
            >
              {/* Background gradient decoration */}
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white ${s.textAccent} border ${s.borderAccent}`}>
                    {s.badge}
                  </span>
                </div>
                <h2 className={`text-lg font-black ${s.textAccent} mb-1`}>{s.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{s.desc}</p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.textAccent}`}>
                  바로가기
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-10 flex items-center justify-center gap-5 text-center flex-wrap">
          {[
            { label: '계산기', val: '85+' },
            { label: '테스트', val: '100+' },
            { label: '퀴즈', val: '100+' },
            { label: '생성기', val: '100+' },
            { label: '체크리스트', val: '70+' },
            { label: '운세', val: '4종' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xl font-black text-slate-900">{item.val}</p>
              <p className="text-xs text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300">vixutil.com — 2026</p>
      </footer>
    </div>
  );
}
