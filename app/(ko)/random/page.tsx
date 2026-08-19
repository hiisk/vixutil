import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { RANDOM_TOOLS } from '@/lib/random-tools';
import { ROLLS, DICE_ICON } from '@/lib/dice/list';
import { DICE_UI } from '@/lib/dice/ui';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '랜덤 뽑기',
  description: '룰렛 돌림판·사다리타기·팀 나누기·랜덤 뽑기·숫자 추첨·동전/주사위 — 공정하게 하나를 정하는 결정 도우미 모음',
  alternates: {
    canonical: '/random',
    languages: alternateLanguages10('/random'),
  },
});

export default function RandomIndexPage() {
  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '랜덤 뽑기', path: '/random' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '랜덤 뽑기',
          '/random',
          RANDOM_TOOLS.map(t => ({ name: t.title, path: `/random/${t.slug}` })),
        )}
      />
      <PageGlow accent="rose" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-rose-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">랜덤 뽑기</span>
          <span className="ml-auto flex items-center gap-3 shrink-0 text-xs text-slate-400 dark:text-slate-500">
            {RANDOM_TOOLS.length}개
            <LangPicker current="ko" route="/random" />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-5xl mx-auto px-4">
          <PageHero className="hero-flat" title="랜덤 뽑기" desc={`점심 메뉴부터 벌칙·당번·팀 편성까지 — 공정하게 하나를 정하는 도구 모음`} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 tool-lift pb-10">

        <div className="grid sm:grid-cols-2 gap-2">
          {RANDOM_TOOLS.map(t => (
            <Link key={t.slug} href={`/random/${t.slug}`} className="hub-card group">
              <span className="bg-sec-soft inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <ToolIcon emoji={t.icon} className="h-5 w-5" />
              </span>
              <span className="hub-card-body">
                <span className="hub-card-title group-hover:text-sec">{t.title}</span>
                <span className="block truncate text-xs text-slate-400 dark:text-slate-500">{t.desc}</span>
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/random/dice"
          className="group mt-6 flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={DICE_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{DICE_UI.ko.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{DICE_UI.ko.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{ROLLS.length}</span>
        </Link>

        <Faq items={SECTION_FAQ.random} />
      </div>
      <SiteFooter />
    </div>
  );
}
