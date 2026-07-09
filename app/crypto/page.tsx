import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: '코인 트레이딩 도구',
  description: '바이낸스 공개 시세로 ATR·변동성·TP/SL을 계산하는 코인 트레이딩 도구 모음. 브라우저에서 직접 시세를 받아 계산합니다.',
};

const TOOLS = [
  { href: '/crypto/signals', icon: '📈', title: 'ATR 타점 보드', desc: '현물·선물 전체 코인의 진입·TP·SL·실시간 수익률 (50개씩)', badge: 'NEW', color: 'from-amber-400 to-orange-600' },
  { href: '/crypto/atr-tpsl', icon: '📊', title: 'ATR TP/SL 계산기', desc: '코인 선택 후 진입가·배수로 익절·손절가 직접 계산', badge: '계산기', color: 'from-yellow-400 to-amber-600' },
];

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">코인 도구</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🪙</div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">코인 트레이딩 도구</h1>
          <p className="text-slate-500 text-sm">바이낸스 공개 시세로 변동성·TP/SL을 계산해요</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md hover:border-amber-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">{t.badge}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                  도구 열기
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 mt-10">시세는 바이낸스 공개 API 기준이며, 모든 계산은 투자 자문이 아닌 참고용입니다</p>
      </div>
      <SiteFooter />
    </div>
  );
}
