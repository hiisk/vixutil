import Link from 'next/link';
import PageHero from '@/components/PageHero';
import type { Metadata } from 'next';
import { hubAlternates } from '@/lib/locale-alternates';
import { QUIZZES } from '@/lib/quiz-data';
import QuizSearch from '@/components/QuizSearch';
import { toCard } from '@/lib/card';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '지식 퀴즈',
  description: '한국사, IT, K-POP, 건강 상식 등 100가지 퀴즈 모음',
  alternates: {
    canonical: '/quiz',
    // 번역 아홉 언어가 이 페이지를 대안으로 선언하므로 이쪽도 돌려줘야 한다 —
    // 한쪽만 걸린 hreflang은 구글이 짝으로 인정하지 않는다.
    languages: hubAlternates('quiz'),
  },
});

export default function QuizIndexPage() {
  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '지식 퀴즈', path: '/quiz' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '지식 퀴즈',
          '/quiz',
          QUIZZES.map(q => ({ name: q.title, path: `/quiz/${q.slug}` })),
        )}
      />
      <PageGlow accent="amber" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-bold text-amber-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">지식 퀴즈</span>
          <span className="ml-auto flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400">{QUIZZES.length}개</span>
            <LangPicker current="ko" route="/quiz" />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-5xl mx-auto px-4">
          <PageHero className="hero-flat" title="지식 퀴즈" desc={`상식부터 전문 지식까지 — ${QUIZZES.length}개`} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 tool-lift pb-10">

        <QuizSearch quizzes={QUIZZES.map(toCard)} />

        <Faq items={SECTION_FAQ.quiz} />
      </div>
      <SiteFooter />
    </div>
  );
}
