import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: '스냅테스트 — 사진으로 하는 참여형 테스트',
  description: '관상·퍼스널컬러·동물상·사진 감성·얼굴 대칭·미소 지수까지, 사진 한 장으로 즐기는 참여형 테스트 모음. 실제 얼굴 인식·픽셀 분석 기반, 사진은 서버에 저장되지 않아요.',
};

const TYPES = [
  { href: '/snap/face-reading',   icon: '🪞', title: '관상 테스트',     desc: '사진 한 장으로 보는 재미있는 관상 분석',   badge: '실제 얼굴인식', color: 'from-teal-500 to-cyan-700' },
  { href: '/snap/personal-color', icon: '🎨', title: '퍼스널컬러 진단', desc: '사진 한 장으로 보는 웜톤·쿨톤 12타입 컬러 진단', badge: '실제 색상측정', color: 'from-orange-400 to-indigo-500' },
  { href: '/snap/animal-face',    icon: '🐾', title: '동물상 테스트',   desc: '사진 한 장으로 보는 나의 동물상',           badge: 'NEW', color: 'from-amber-400 to-rose-400' },
  { href: '/snap/photo-mood',     icon: '🎞️', title: '사진 감성 분석',  desc: '아무 사진이나 올려서 보는 내 감성 타입',   badge: '실제 픽셀분석', color: 'from-fuchsia-500 to-sky-500' },
  { href: '/snap/face-symmetry',  icon: '⚖️', title: '얼굴 대칭 분석',  desc: '사진 한 장으로 보는 좌우 밸런스 지수',     badge: '실제 랜드마크', color: 'from-indigo-500 to-cyan-500' },
  { href: '/snap/smile-score',    icon: '😊', title: '미소 지수 측정',  desc: '사진 한 장으로 보는 내 미소 지수',         badge: '실제 표정분석', color: 'from-amber-400 to-rose-500' },
  { href: '/snap/handwriting',    icon: '✍️', title: '손글씨 심리 테스트', desc: '손글씨 사진으로 보는 기울기·필압 분석', badge: 'NEW', color: 'from-slate-600 to-indigo-700' },
];

export default function SnapPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-fuchsia-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">스냅테스트</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📸</div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">스냅테스트</h1>
          <p className="text-slate-500 text-sm">사진 한 장으로 즐기는 참여형 테스트 · 실제 분석 기반</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 text-xs text-slate-500 leading-relaxed text-center">
          🔒 모든 분석은 이 브라우저 안에서만 처리돼요. 사진은 서버로 전송되거나 저장되지 않습니다.
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TYPES.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md hover:border-fuchsia-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100">{t.badge}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-fuchsia-600">
                  테스트 하기
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 mt-10">모든 해석은 참고·오락 목적이며 과학적·의학적 근거가 없습니다</p>
      </div>
      <SiteFooter />
    </div>
  );
}
