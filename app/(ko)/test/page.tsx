import Link from 'next/link';
import PageHero from '@/components/PageHero';
import type { Metadata } from 'next';
import { hubAlternates } from '@/lib/locale-alternates';
import { TESTS } from '@/lib/test-data';
import TestSearch from '@/components/TestSearch';
import { toCard } from '@/lib/card';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '심리 테스트',
  description: 'MBTI, 연애 성향, 번아웃 등 다양한 심리 테스트 모음',
  alternates: {
    canonical: '/test',
    // 번역 아홉 언어가 이 페이지를 대안으로 선언하므로 이쪽도 돌려줘야 한다 —
    // 한쪽만 걸린 hreflang은 구글이 짝으로 인정하지 않는다.
    languages: hubAlternates('test'),
  },
});

export default function TestIndexPage() {
  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '심리 테스트', path: '/test' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '심리 테스트',
          '/test',
          TESTS.map(t => ({ name: t.title, path: `/test/${t.slug}` })),
        )}
      />
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-bold text-violet-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">심리 테스트</span>
          <span className="ml-auto flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400 dark:text-slate-500">{TESTS.length}개</span>
            <LangPicker current="ko" route="/test" />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-5xl mx-auto px-4">
          <PageHero className="hero-flat" title="심리 테스트" desc={`나를 알아가는 다양한 테스트 — ${TESTS.length}개`} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 tool-lift pb-10">

        <TestSearch tests={TESTS.map(toCard)} />

        <Faq items={SECTION_FAQ.test} />
      </div>
      <SiteFooter />
    </div>
  );
}
