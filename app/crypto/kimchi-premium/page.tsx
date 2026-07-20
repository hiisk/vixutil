import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import KimchiBoard from './KimchiBoard';
import ReferralCards from '@/components/ReferralCards';

/**
 * 이 페이지만 한국어로 쓴다. /crypto의 다른 페이지는 영어지만, 김치 프리미엄은
 * 국내 거래소 전용 개념이고 사용자는 "김치프리미엄"·"김프"로 검색한다.
 * 영어로 쓰면 그 검색어를 통째로 버리게 된다.
 */
export const metadata: Metadata = {
  title: '김치 프리미엄 실시간 — 업비트·빗썸 vs 바이낸스',
  description:
    '업비트·빗썸 원화 시세와 바이낸스 달러 시세를 비교한 실시간 김치 프리미엄. 공식 환율 기준과 USDT 기준을 모두 보여주고, 국내 두 거래소 간 가격차와 거래대금까지 한 번에 확인하세요.',
  keywords: ['김치프리미엄', '김프', '업비트 빗썸 비교', '바이낸스 김프', '코인 시세 비교', 'USDT 프리미엄'],
  alternates: { canonical: '/crypto/kimchi-premium' },
};

const PATH = '/crypto/kimchi-premium';

const structuredData = [
  webAppJsonLd(
    '김치 프리미엄 실시간',
    '업비트·빗썸 원화 시세와 바이낸스 달러 시세를 비교해 코인별 김치 프리미엄을 실시간으로 계산합니다. 공식 환율 기준과 USDT 기준을 모두 제공합니다.',
    PATH,
  ),
  breadcrumbJsonLd([
    { name: '홈', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: '김치 프리미엄', path: PATH },
  ]),
];

export default function KimchiPremiumPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={structuredData} />
      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">김치 프리미엄</span>
        </div>
      </header>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🇰🇷</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1.5">김치 프리미엄 실시간</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            업비트 · 빗썸 원화 시세를 바이낸스 달러 시세와 비교합니다
          </p>
        </div>

        <KimchiBoard />

        {/* 서버에서 정적으로 렌더된다 — 위 보드는 브라우저에서 시세를 받아 그리므로
            자바스크립트를 실행하지 않는 크롤러에게는 빈 껍데기로 보인다. */}
        <section className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 p-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed [&>p]:max-w-[80ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">김치 프리미엄이란</h2>
          <p className="mb-3">
            김치 프리미엄(김프)은 같은 코인이 국내 거래소에서 해외 거래소보다 비싸게 거래되는 현상입니다.
            국내에서 코인 수요가 몰리는데 해외로 자금을 옮기기가 번거로우면, 그 마찰만큼 국내 가격이 위로 벌어집니다.
            반대로 국내 수요가 식으면 해외보다 싸지는데, 이를 <b className="text-slate-800 dark:text-slate-100">역프리미엄(역프)</b>이라고 부릅니다.
          </p>
          <p className="mb-3">
            이 페이지는 두 가지 기준을 함께 보여줍니다. <b className="text-slate-800 dark:text-slate-100">환율 기준</b>은 국내 원화 가격을
            공식 USD/KRW 환율로 환산해 비교한 값으로, 뉴스와 커뮤니티에서 인용하는 그 숫자입니다.
            <b className="text-slate-800 dark:text-slate-100"> USDT 기준</b>은 원화로 USDT를 사서 해외로 보내는 실제 경로를 그대로 반영합니다.
            국내 USDT 자체에 프리미엄이나 할인이 붙어 있으면 두 값이 크게 갈리므로, 실제로 자금을 옮길 계획이라면 USDT 기준을 봐야 합니다.
          </p>
          <p>
            김프는 코인마다 균일하지 않습니다. 비트코인·이더리움 같은 대형 코인은 서로 비슷한 값에 모이지만,
            개별 알트코인은 국내 수요가 몰리면서 훨씬 크게 벌어지기도 합니다.
            다만 <b className="text-slate-800 dark:text-slate-100">거래대금이 작은 코인의 큰 김프는 실수요가 아니라 얕은 호가</b>일 수 있으니,
            숫자만 보지 말고 옆의 거래대금을 함께 확인하세요.
          </p>
        </section>

        <ReferralCards lang="ko" />

        <Faq items={SECTION_FAQ['crypto/kimchi-premium'] ?? []} />

        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 p-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p className="mb-1">
            ⚠️ 투자 조언이 아닙니다. 김프가 존재한다고 해서 그만큼 수익이 나는 것은 아닙니다 —
            거래 수수료, 출금 수수료, 송금 시간 동안의 가격 변동, 거래소별 입출금 정책이 모두 실제 수익을 깎습니다.
          </p>
          <p>
            시세 출처: 업비트·빗썸 공개 API(원화), 바이낸스 공개 API(USDT), open.er-api.com(공식 환율, 하루 1회 갱신).
            모든 계산은 브라우저에서 이루어지며 서버에 저장되지 않습니다.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
