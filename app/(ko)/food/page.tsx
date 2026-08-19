import ToolIcon from '@/components/ToolIcon';
import { alternateLanguages10 } from '@/lib/locales';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { FOOD_TOOLS } from '@/lib/food-tools';
import { FOOD_CATEGORIES, ingredientsOfCategory } from '@/lib/food/ingredients8';
import { foodFacts } from '@/lib/food/facts';
import { FOOD_UI } from '@/lib/food/ui';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '계량·요리 — 컵을 그램으로, 레시피 배율, 오븐 온도',
  description:
    '밀가루 1컵이 몇 그램인지, 2인분을 4인분으로 어떻게 늘리는지, 350°F가 몇 도인지. 밥물·파스타·커피 비율과 식품 보관 기간까지 요리하며 검색하게 되는 것들.',
  alternates: {
    canonical: '/food',
    languages: alternateLanguages10('/food'),
  },
});

const CATEGORY_ORDER = ['계량', '가열', '음료', '베이킹', '보관'];

export default function FoodHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: FOOD_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '계량·요리', path: '/food' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '계량·요리',
          '/food',
          FOOD_TOOLS.map(t => ({ name: t.title, path: `/food/${t.slug}` })),
        )}
      />

      <PageGlow accent="amber" />
      <div className="h-1 topbar" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="page-back hover:text-amber-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">계량·요리</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/food" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="hero-band ">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🍳" className="h-6 w-6" /></span>
          <h1 className="page-h1">계량·요리</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            요리하다 손에 뭐 묻은 채로 검색하게 되는 것들
            <br className="sm:hidden" /> — 미리 여기서
          </p>
        </div>

        <div className="note mb-7 ">
한국 기준(1컵 200ml, 1큰술 15ml)으로 계산합니다. 미국 레시피는 1컵이 240ml입니다.
        </div>

        <div className="flex flex-col gap-7">
          {grouped.map(g => (
            <section key={g.category} aria-label={g.category}>
              <h2 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                {g.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {g.tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/food/${t.slug}`}
                    className="group relative overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="relative">
                      <ToolIcon emoji={t.icon} color={t.og[0]} accent={t.og[1]} className="w-9 h-9 block mb-3" />
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                        바로 쓰기
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/*
          재료 125가지의 컵·큰술 무게. 도구가 "계산하는" 쪽이라면 이쪽은 "찾는"
          쪽이다 — 레시피를 펴 놓고 밀가루 1컵이 몇 g인지만 알고 싶은 사람은
          변환기를 열 생각이 없다.
        */}
        <section className="mt-10" aria-label={FOOD_UI.ko.section}>
          <h2 className="sec-h2-tight">{FOOD_UI.ko.hubTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{FOOD_UI.ko.hubLead}</p>
          {FOOD_CATEGORIES.map(cat => (
            <div key={cat} className="mb-4">
              <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1.5">
                {FOOD_UI.ko.categoryLabel[cat]}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ingredientsOfCategory(cat).map(i => (
                  <Link
                    key={i.slug}
                    href={`/food/${i.slug}`}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">{i.name.ko}</span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                      {foodFacts(i).grams.cupUs}g
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="sec-h2">이럴 때 쓰세요</h2>
          <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>⚖️ <b className="text-slate-800 dark:text-slate-100">저울이 없을 때</b> — 컵·큰술을 그램으로 바꿔 봅니다</li>
            <li>👨‍👩‍👧 <b className="text-slate-800 dark:text-slate-100">인분이 안 맞을 때</b> — 레시피를 통째로 배율 계산합니다</li>
            <li>🌍 <b className="text-slate-800 dark:text-slate-100">외국 레시피를 볼 때</b> — 화씨와 가스마크를 섭씨로</li>
            <li>🧊 <b className="text-slate-800 dark:text-slate-100">냉장고를 열었을 때</b> — 이거 아직 먹어도 되나 확인합니다</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.food} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
보관 기간과 굽기 온도는 일반적인 기준이며 재료 상태에 따라 다릅니다 · 무료
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
