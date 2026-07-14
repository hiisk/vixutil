import Link from 'next/link';
import type { Metadata } from 'next';
import { SECTION_COUNTS } from '@/lib/search-index';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'vixutil — 실용 도구 모음',
  description: '계산기·운세·생성기·심리테스트·퀴즈 등 일상에 필요한 실용 유틸 모음 — vixutil.com',
};

const SECTIONS = [
  {
    href: '/calculator',
    icon: '📊',
    title: '계산기',
    desc: '세금·금융·건강·부동산 등 실생활 계산기',
    badge: `${SECTION_COUNTS.calculator}개`,
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-900/50',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/test',
    icon: '🧭',
    title: '심리 테스트',
    desc: 'MBTI·연애·직장·성향 등 심리 테스트',
    badge: `${SECTION_COUNTS.test}개`,
    color: 'from-violet-500 to-pink-600',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/quiz',
    icon: '🏆',
    title: '지식 퀴즈',
    desc: '한국사·IT·상식·K-POP 등 퀴즈',
    badge: `${SECTION_COUNTS.quiz}개`,
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/generator',
    icon: '⚙️',
    title: '생성기',
    desc: '닉네임·명언·추천·비밀번호 등 생성',
    badge: `${SECTION_COUNTS.generator}개`,
    color: 'from-emerald-400 to-teal-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/checklist',
    icon: '✅',
    title: '체크리스트',
    desc: '이사·취업·여행·건강·디지털 등 상황별 체크리스트',
    badge: `${SECTION_COUNTS.checklist}개`,
    color: 'from-sky-400 to-cyan-600',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/fortune',
    icon: '🔮',
    title: '오늘의 운세',
    desc: '별자리·띠·타로·MBTI 운세 매일 업데이트',
    badge: '6종',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/snap',
    icon: '📸',
    title: '스냅테스트',
    desc: '사진 한 장으로 즐기는 관상·퍼스널컬러 등 참여형 테스트',
    badge: '10종',
    color: 'from-fuchsia-500 to-sky-500',
    bgLight: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    textAccent: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderAccent: 'border-fuchsia-200 dark:border-fuchsia-900/50',
    shadow: 'shadow-fuchsia-100',
  },
  {
    href: '/crypto',
    icon: '🪙',
    title: 'Crypto Trading Tools',
    desc: '바이낸스 전체 코인 멀티전략 타점(진입·TP·SL)·수익률 실시간',
    badge: 'NEW',
    color: 'from-amber-400 to-orange-600',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
];

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 via-amber-400 via-emerald-500 to-sky-400" />

      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Brand */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-base">일상에 필요한 실용 도구 모음</p>
        </div>

        {/*
          통합 검색 진입점. 지금까지 검색은 섹션별 허브에만 있어서, 어느 섹션에
          있는지 모르면 찾을 수 없었다. 인덱스 자체는 /search에만 싣는다 —
          랜딩 페이지에 600여 개 항목을 직렬화하면 무거워진다.
        */}
        <Link
          href="/search"
          className="group flex items-center gap-3 mb-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-white/70 dark:border-slate-700/70 rounded-2xl px-4 py-3.5 shadow-[0_8px_24px_-12px_rgba(99,102,241,0.2)] hover:border-indigo-300 hover:shadow-lg transition-all"
        >
          <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-base text-slate-400 dark:text-slate-500 group-hover:text-slate-500 transition-colors">
            실업급여, 전세, MBTI, 로또…
          </span>
          <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0">
            전체 검색
          </span>
        </Link>

        {/* Section grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative overflow-hidden rounded-2xl border ${s.borderAccent} ${s.bgLight} dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-sm hover:shadow-lg ${s.shadow} hover:-translate-y-0.5 transition-all duration-200`}
            >
              {/* Background gradient decoration */}
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 ${s.textAccent} border ${s.borderAccent} dark:border-slate-700`}>
                    {s.badge}
                  </span>
                </div>
                <h2 className={`text-lg font-black ${s.textAccent} mb-1`}>{s.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{s.desc}</p>
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

        {/* Stats bar — 숫자는 데이터에서 뽑는다. 손으로 적으면 콘텐츠가 늘 때마다 낡는다 */}
        <div className="mt-10 flex items-center justify-center gap-5 text-center flex-wrap">
          {[
            { label: '계산기', val: String(SECTION_COUNTS.calculator) },
            { label: '테스트', val: String(SECTION_COUNTS.test) },
            { label: '퀴즈', val: String(SECTION_COUNTS.quiz) },
            { label: '생성기', val: String(SECTION_COUNTS.generator) },
            { label: '체크리스트', val: String(SECTION_COUNTS.checklist) },
            { label: '운세', val: '6종' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xl font-black text-slate-900 dark:text-slate-100">{item.val}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300 dark:text-slate-600">vixutil.com — 2026</p>
      </footer>
    </div>
  );
}
