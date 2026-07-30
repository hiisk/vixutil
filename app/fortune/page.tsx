import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { TAROT_UI } from '@/lib/tarot/ui';
import { TAROT_ICON } from '@/lib/tarot/deck';

export const metadata: Metadata = {
  title: '오늘의 운세',
  description: '꿈해몽·사주·별자리·타로·MBTI 운세를 무료로 확인하세요. 매일 새롭게 업데이트되는 오늘의 운세',
  alternates: {
    canonical: '/fortune',
    languages: { 'ko': '/fortune', 'en': '/en/fortune', 'x-default': '/en/fortune' },
  },
};

const TYPES = [
  { href: '/fortune/dream',  icon: '🌙', title: '꿈 해몽',     desc: '돼지·뱀·불 등 50가지 꿈의 의미 분석', badge: '꿈해몽',   color: 'from-slate-700 to-indigo-800' },
  { href: '/fortune/saju',   icon: '🔯', title: '사주 분석',   desc: '생년월일로 사주 4주 분석 + 오행 균형', badge: '사주명리', color: 'from-indigo-500 to-violet-700' },
  { href: '/fortune/zodiac', icon: '⭐', title: '별자리 운세', desc: '12개 별자리로 오늘의 운세 확인',        badge: '12가지',   color: 'from-violet-500 to-purple-700' },
  { href: '/fortune/animal', icon: '🐉', title: '띠 운세',     desc: '쥐·소·범 등 12띠별 오늘의 운세',       badge: '12띠',     color: 'from-rose-500 to-pink-600' },
  { href: '/fortune/tarot',  icon: '🃏', title: '타로 카드',   desc: '78장 풀덱에서 카드 뽑기',               badge: '78장',     color: 'from-amber-500 to-orange-600' },
  { href: '/fortune/mbti',   icon: '🧠', title: 'MBTI 운세',  desc: '16가지 성격 유형별 오늘의 운세',        badge: '16유형',   color: 'from-sky-500 to-blue-600' },
  { href: '/fortune/blood-type', icon: '🩸', title: '혈액형 운세', desc: 'A·B·O·AB형 오늘의 운세',            badge: '4가지',    color: 'from-rose-500 to-red-600' },
  { href: '/fortune/biorhythm',  icon: '📈', title: '바이오리듬',  desc: '신체·감성·지성 리듬을 그래프로',      badge: '그래프',   color: 'from-emerald-500 to-teal-600' },
  { href: '/fortune/name-match', icon: '💕', title: '이름 궁합',   desc: '두 사람 이름 획수로 보는 궁합 점수',   badge: '궁합',     color: 'from-pink-500 to-rose-600' },
  { href: '/fortune/zodiac-match', icon: '🐲', title: '띠 궁합',    desc: '십이지 삼합·육합으로 보는 두 사람 궁합', badge: '12띠',    color: 'from-rose-500 to-red-600' },
  { href: '/fortune/star-match',   icon: '⭐', title: '별자리 궁합',  desc: '12별자리 원소로 보는 두 사람 궁합',     badge: '12별자리', color: 'from-violet-500 to-fuchsia-600' },
  { href: '/fortune/blood-match',  icon: '🩸', title: '혈액형 궁합',  desc: 'A·B·O·AB형으로 보는 두 사람 궁합',      badge: '4가지',   color: 'from-rose-500 to-orange-600' },
  { href: '/fortune/mbti-match',   icon: '🧠', title: 'MBTI 궁합',   desc: '16유형으로 보는 두 사람 궁합 점수',     badge: '16유형',  color: 'from-violet-500 to-indigo-600' },
  { href: '/fortune/daily',        icon: '🔮', title: '오늘의 종합운세', desc: '생년월일로 보는 오늘의 총운·연애·금전운', badge: '생년월일', color: 'from-purple-500 to-pink-600' },
  { href: '/fortune/daily-tarot',  icon: '🃏', title: '오늘의 타로',   desc: '매일 자정 바뀌는 오늘의 타로 카드 한 장', color: 'from-amber-500 to-orange-600' },
  { href: '/fortune/tarot-yesno',  icon: '🔮', title: '타로 예스/노',  desc: '질문을 떠올리고 카드로 받는 예·아니오',   color: 'from-indigo-500 to-violet-700' },
  { href: '/fortune/lucky-lotto',  icon: '🍀', title: '행운의 로또 번호', desc: '생년월일로 보는 오늘의 행운 번호 6개',   color: 'from-emerald-500 to-teal-600' },
  { href: '/fortune/birth-stone',  icon: '💎', title: '탄생석·탄생화',   desc: '태어난 달의 보석과 꽃, 그 의미',       color: 'from-fuchsia-500 to-violet-600' },
  { href: '/fortune/today-color',  icon: '🎨', title: '오늘의 행운 색',   desc: '이름·날짜로 보는 오늘의 행운 컬러',    color: 'from-pink-500 to-violet-600' },
];

export default function FortunePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '운세', path: '/fortune' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '오늘의 운세',
          '/fortune',
          TYPES.map(t => ({ name: t.title, path: t.href })),
        )}
      />
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />

      {/* 헤더 */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">운세</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* 타이틀 */}
        <div className="text-center mb-10">
          <ToolIcon emoji="🔮" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">오늘의 운세</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">매일 새롭게 업데이트 · 사주·별자리·띠·타로·MBTI</p>
        </div>

        {/* 카테고리 카드 */}
        <div className="grid sm:grid-cols-2 gap-4">
          {TYPES.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-md hover:border-violet-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <ToolIcon emoji={t.icon} className="text-slate-800 dark:text-slate-100 w-8 h-8" />
                  {t.badge && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 border border-violet-100 dark:border-violet-900/40">{t.badge}</span>}
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-violet-600">
                  운세 보기
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 스냅테스트 프로모 */}
        <Link
          href="/snap"
          className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-fuchsia-50 to-sky-50 p-6 mt-4 flex items-center gap-4 hover:shadow-md hover:border-fuchsia-200 transition-all"
        >
          <ToolIcon emoji="📸" className="w-9 h-9 text-slate-800 dark:text-slate-100" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">스냅테스트</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-fuchsia-100 dark:bg-fuchsia-950/40 text-fuchsia-700 dark:text-fuchsia-300">사진으로 하는 테스트</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">관상·퍼스널컬러·감성 분석 등 사진 한 장으로 즐기는 참여형 테스트 모음</p>
          </div>
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-10">운세는 오늘 날짜를 기준으로 생성되며 오락·참고 목적입니다</p>

        {/* 타로 78장 자료는 뽑기 도구가 아니라 찾아보는 목록이라 따로 세운다 */}
        <Link
          href="/fortune/card"
          className="group mt-10 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <ToolIcon emoji={TAROT_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{TAROT_UI.ko.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{TAROT_UI.ko.hubLead}</span>
          </span>
        </Link>

        <Faq items={SECTION_FAQ.fortune} />
      </div>
      <SiteFooter />
    </div>
  );
}
