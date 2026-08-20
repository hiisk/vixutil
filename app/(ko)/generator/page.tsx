import Link from 'next/link';
import PageHero from '@/components/PageHero';
import type { Metadata } from 'next';
import { GENERATORS } from '@/lib/generator-data';
import GeneratorSearch from '@/components/GeneratorSearch';
import { toCard } from '@/lib/card';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import { alternateLanguages10 } from '@/lib/locales';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '생성기',
  description: '닉네임, 비밀번호, 명언, 메뉴 등 100가지 랜덤 생성기 모음',
  alternates: {
    canonical: '/generator',
    languages: alternateLanguages10('/generator'),
  },
});

export default function GeneratorIndexPage() {
  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '생성기', path: '/generator' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '생성기',
          '/generator',
          GENERATORS.map(g => ({ name: g.title, path: `/generator/${g.slug}` })),
        )}
      />
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-bold text-emerald-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">생성기</span>
          <span className="ml-auto flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400">{GENERATORS.length}개</span>
            <LangPicker current="ko" route="/generator" />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-5xl mx-auto px-4">
          <PageHero className="hero-flat" title="생성기" desc={`아이디어가 필요할 때, 결정을 못 내릴 때 — ${GENERATORS.length}개`} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 tool-lift pb-10">

        <GeneratorSearch generators={GENERATORS.map(toCard)} />

        <Faq items={SECTION_FAQ.generator} />
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
