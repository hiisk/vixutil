import Link from 'next/link';
import type { Metadata } from 'next';
import { SECTION_COUNTS } from '@/lib/search-index';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: 'vixutil — 실용 도구 모음',
  description: '계산기·운세·생성기·심리테스트·퀴즈 등 일상에 필요한 실용 유틸 모음 — vixutil.com',
  alternates: { canonical: '/' },
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
    desc: '별자리·띠·타로·사주·궁합 등 매일 업데이트',
    badge: '19종',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/random',
    icon: '🎲',
    title: '랜덤 뽑기',
    desc: '룰렛·사다리타기·팀 나누기·숫자 뽑기 등 결정 도우미',
    badge: 'NEW',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
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
    href: '/device',
    icon: '🧰',
    title: '기기 점검',
    desc: '키보드·마우스·마이크·웹캠·모니터를 브라우저에서 바로 테스트',
    badge: `${SECTION_COUNTS.device}개`,
    color: 'from-sky-500 to-teal-600',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    textAccent: 'text-teal-700 dark:text-teal-300',
    borderAccent: 'border-teal-200 dark:border-teal-900/50',
    shadow: 'shadow-teal-100',
  },
  {
    href: '/image',
    icon: '🖼️',
    title: '이미지 도구',
    desc: '사진 용량 줄이기·크기 조절·자르기·모자이크를 올리지 않고',
    badge: `${SECTION_COUNTS.image}개`,
    color: 'from-violet-500 to-fuchsia-600',
    bgLight: 'bg-violet-50 dark:bg-violet-950/30',
    textAccent: 'text-violet-700 dark:text-violet-300',
    borderAccent: 'border-violet-200 dark:border-violet-900/50',
    shadow: 'shadow-violet-100',
  },
  {
    href: '/text',
    icon: '✍️',
    title: '텍스트 도구',
    desc: '한영타 변환·영문 이름·특수문자·글자수를 한 곳에서',
    badge: `${SECTION_COUNTS.text}개`,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/game',
    icon: '🕹️',
    title: '두뇌 게임',
    desc: '반응속도·클릭속도·기억력·타자를 1분 만에 측정',
    badge: `${SECTION_COUNTS.game}개`,
    color: 'from-emerald-500 to-indigo-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/color',
    icon: '🎨',
    title: '색상 도구',
    desc: '팔레트·명도 대비·그라디언트·색맹 시뮬레이션',
    badge: `${SECTION_COUNTS.color}개`,
    color: 'from-violet-500 to-fuchsia-600',
    bgLight: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    textAccent: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderAccent: 'border-fuchsia-200 dark:border-fuchsia-900/50',
    shadow: 'shadow-fuchsia-100',
  },
  {
    href: '/time',
    icon: '⏰',
    title: '시간 도구',
    desc: '타이머·스톱워치·뽀모도로·세계시계·근무일 계산',
    badge: `${SECTION_COUNTS.time}개`,
    color: 'from-sky-500 to-rose-500',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
  },
  {
    href: '/sound',
    icon: '🔊',
    title: '소리 도구',
    desc: '메트로놈·악기 튜너·백색소음·소음 측정·녹음',
    badge: `${SECTION_COUNTS.sound}개`,
    color: 'from-indigo-500 to-sky-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/food',
    icon: '🍳',
    title: '계량·요리',
    desc: '컵→그램 계량, 레시피 배율, 오븐 온도, 식품 보관',
    badge: `${SECTION_COUNTS.food}개`,
    color: 'from-amber-500 to-red-600',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textAccent: 'text-amber-700 dark:text-amber-300',
    borderAccent: 'border-amber-200 dark:border-amber-900/50',
    shadow: 'shadow-amber-100',
  },
  {
    href: '/convert',
    icon: '🔄',
    title: '단위 변환',
    desc: '평·근·돈부터 인치·파운드까지 50가지 단위 변환',
    badge: `${SECTION_COUNTS.convert}개`,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    textAccent: 'text-blue-700 dark:text-blue-300',
    borderAccent: 'border-blue-200 dark:border-blue-900/50',
    shadow: 'shadow-blue-100',
  },
  {
    href: '/rate',
    icon: '📐',
    title: '비율 계산',
    desc: '할인율·부가세·이자·농도까지 공식 하나로 끝나는 계산 50가지',
    badge: `${SECTION_COUNTS.rate}개`,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
    borderAccent: 'border-emerald-200 dark:border-emerald-900/50',
    shadow: 'shadow-emerald-100',
  },
  {
    href: '/body',
    icon: '🩺',
    title: '몸 수치',
    desc: 'BMI·기초대사량·심박수·혈압 지표까지 몸으로 재는 수치 50가지',
    badge: `${SECTION_COUNTS.body}개`,
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textAccent: 'text-rose-700 dark:text-rose-300',
    borderAccent: 'border-rose-200 dark:border-rose-900/50',
    shadow: 'shadow-rose-100',
  },
  {
    href: '/geometry',
    icon: '📐',
    title: '도형·수학',
    desc: '면적·부피·삼각비부터 타일 수·페인트 양까지 50가지',
    badge: `${SECTION_COUNTS.geometry}개`,
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    textAccent: 'text-indigo-700 dark:text-indigo-300',
    borderAccent: 'border-indigo-200 dark:border-indigo-900/50',
    shadow: 'shadow-indigo-100',
  },
  {
    href: '/country',
    icon: '🧭',
    title: '나라 정보',
    desc: '시차·전압·플러그·국가번호·입국 조건을 나라별로 한 장에',
    badge: `${SECTION_COUNTS.country}개`,
    color: 'from-sky-500 to-cyan-600',
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    textAccent: 'text-sky-700 dark:text-sky-300',
    borderAccent: 'border-sky-200 dark:border-sky-900/50',
    shadow: 'shadow-sky-100',
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
          {/*
            홈에 h1이 없었다. 브랜드가 span 두 개로만 그려져 있어서, 사이트에서
            권위가 가장 높은 페이지가 주제를 알리는 제목 없이 색인되고 있었다.
            보이는 모습은 그대로 두고 태그만 h1으로 바꾼다. 다만 "vixutil"만으로는
            무슨 사이트인지 설명이 안 되므로 설명을 sr-only로 h1 안에 넣는다.
          */}
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
            <span className="sr-only"> — 계산기·심리테스트·퀴즈·생성기·체크리스트·운세 모음</span>
          </h1>
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
