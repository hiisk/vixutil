import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Ad from '@/components/Ad';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import RelatedContent from '@/components/RelatedContent';
import { FORTUNE_RELATED } from '@/lib/fortune-related';
import { withCard } from '@/lib/og-cards';
import { GAPJA, iljuInfo } from '@/lib/ilju';
import { STEMS } from '@/lib/saju-data';

export const metadata: Metadata = withCard({
  title: '일주 60가지 - 갑자일주부터 계해일주까지',
  description: '태어난 날의 간지인 일주 60가지를 하나씩 풀이합니다. 일간의 성격, 앉은 자리(일지)와의 관계, 십이운성, 공망까지 한 장에 담았습니다.',
  alternates: { canonical: '/fortune/ilju' },
});

/**
 * 일주 예순 장의 허브.
 *
 * 해석 글은 이미 lib/saju-data.ts에 예순 편이 있었는데, 사주 통합 화면 안에서
 * 자기 것 하나만 보이고 나머지 쉰아홉은 닿을 수 없었다. 천간별로 묶어 낸다 —
 * 「갑자일주」를 치고 들어온 사람은 대개 다른 갑 일주도 궁금해한다.
 */
export default function IljuHub() {
  const byStem = STEMS.map(s => ({
    stem: s,
    items: GAPJA.filter(g => g.stemIdx === s.idx).map(g => iljuInfo(g.key)!),
  }));

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '일주 60가지', path: '/fortune/ilju' },
      ])} />
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-indigo-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">일주 60가지</span>
        </div>
      </header>

      <div className="hero-band max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">일주 60가지</h1>
          <p className="page-lede">태어난 날의 간지가 일주입니다. 사주 여덟 글자 가운데 «나 자신»을 가장 많이 말하는 두 글자입니다.</p>
        </div>

        <Ad />

        <div className="mt-8 flex flex-col gap-8">
          {byStem.map(({ stem, items }) => (
            <section key={stem.idx}>
              <div className="flex items-baseline gap-2 mb-3">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {stem.hanja} {stem.kor} 일간
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {stem.element} · {stem.nature}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map(i => (
                  <Link key={i.slug} prefetch={false} href={`/fortune/ilju/${i.slug}`}
                    className="group rounded-xl border chip-off px-3.5 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                    <span className="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">
                      {i.key}일주
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {i.hanja} · {i.unseong}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">일주가 왜 중요한가요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            사주는 연·월·일·시 네 기둥 여덟 글자인데, 그중 <strong className="text-slate-800 dark:text-slate-100">태어난 날의 두 글자</strong>가 일주입니다.
            위 글자인 <strong className="text-slate-800 dark:text-slate-100">일간</strong>은 «나 자신»을 뜻하고,
            아래 글자인 <strong className="text-slate-800 dark:text-slate-100">일지</strong>는 내가 앉은 자리이자 배우자궁입니다.
            그래서 일주 하나만으로도 사주에서 말하는 것의 상당 부분이 잡힙니다.
            천간 열과 지지 열둘이 짝수·홀수를 맞춰 만나므로 조합은 120가지가 아니라 <strong className="text-slate-800 dark:text-slate-100">60가지</strong>입니다.
            내 일주를 모르면 <Link href="/fortune/saju" className="text-sec font-bold">사주 분석</Link>에서 생년월일을 넣으면 나옵니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/ilju']} />
      </div>
      <RelatedContent items={FORTUNE_RELATED} currentSlug="ilju" basePath="/fortune" accent="violet" bg="" />
      <SiteFooter referral={false} />
    </div>
  );
}
