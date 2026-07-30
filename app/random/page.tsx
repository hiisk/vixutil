import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import type { Metadata } from 'next';
import { RANDOM_TOOLS } from '@/lib/random-tools';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '랜덤 뽑기',
  description: '룰렛 돌림판·사다리타기·팀 나누기·랜덤 뽑기·숫자 추첨·동전/주사위 — 공정하게 하나를 정하는 결정 도우미 모음',
  alternates: {
    canonical: '/random',
    languages: { 'ko': '/random', 'en': '/en/random', 'zh': '/zh/random', 'x-default': '/en/random' },
  },
};

export default function RandomIndexPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
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
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-rose-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">랜덤 뽑기</span>
          <span className="ml-auto flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            {RANDOM_TOOLS.length}개
            <Link href="/en/random" className="font-bold hover:text-rose-600" hrefLang="en">EN</Link>
            <Link href="/zh/random" className="font-bold hover:text-rose-600" hrefLang="zh">中文</Link>
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-rose-600 tracking-widest uppercase mb-2">Random Picker</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">랜덤 뽑기</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          점심 메뉴부터 벌칙·당번·팀 편성까지 — <strong className="text-slate-700 dark:text-slate-200">공정하게</strong> 하나를 정하는 도구 모음
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {RANDOM_TOOLS.map(t => (
            <Link
              key={t.slug}
              href={`/random/${t.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}
            >
              <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
              <div>
                <div className="text-lg font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <Faq items={SECTION_FAQ.random} />
      </div>
      <SiteFooter />
    </div>
  );
}
