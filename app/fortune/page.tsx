import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '오늘의 운세 — vixutil',
  description: '꿈해몽·사주·별자리·타로·MBTI 운세를 무료로 확인하세요. 매일 새롭게 업데이트되는 오늘의 운세',
};

const TYPES = [
  { href: '/fortune/dream',  icon: '🌙', title: '꿈 해몽',     desc: '돼지·뱀·불 등 50가지 꿈의 의미 분석', badge: '꿈해몽',   color: 'from-slate-700 to-indigo-800' },
  { href: '/fortune/saju',   icon: '🔯', title: '사주 분석',   desc: '생년월일로 사주 4주 분석 + 오행 균형', badge: '사주명리', color: 'from-indigo-500 to-violet-700' },
  { href: '/fortune/zodiac', icon: '⭐', title: '별자리 운세', desc: '12개 별자리로 오늘의 운세 확인',        badge: '12가지',   color: 'from-violet-500 to-purple-700' },
  { href: '/fortune/animal', icon: '🐉', title: '띠 운세',     desc: '쥐·소·범 등 12띠별 오늘의 운세',       badge: '12띠',     color: 'from-rose-500 to-pink-600' },
  { href: '/fortune/tarot',  icon: '🃏', title: '타로 카드',   desc: '78장 풀덱에서 카드 뽑기',               badge: '78장',     color: 'from-amber-500 to-orange-600' },
  { href: '/fortune/mbti',   icon: '🧠', title: 'MBTI 운세',  desc: '16가지 성격 유형별 오늘의 운세',        badge: '16유형',   color: 'from-sky-500 to-blue-600' },
];

export default function FortunePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />

      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">운세</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* 타이틀 */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔮</div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">오늘의 운세</h1>
          <p className="text-slate-500 text-sm">매일 새롭게 업데이트 · 사주·별자리·띠·타로·MBTI</p>
        </div>

        {/* 카테고리 카드 */}
        <div className="grid sm:grid-cols-2 gap-4">
          {TYPES.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md hover:border-violet-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100">{t.badge}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{t.desc}</p>
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

        <p className="text-center text-xs text-slate-300 mt-10">운세는 오늘 날짜를 기준으로 생성되며 오락·참고 목적입니다</p>
      </div>
    </div>
  );
}
