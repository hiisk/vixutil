import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS8, langPrefix, type Lang8 } from '@/lib/i18n/lang';
import { foodFacts, similarIngredients } from '@/lib/food/facts';
import { FOOD_UI } from '@/lib/food/ui';
import type { Ingredient } from '@/lib/food/ingredients8';

/**
 * 재료 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 답을 먼저 준다. 이 화면에 오는 사람은 "밀가루 1컵 몇 g"을 알고 싶어 들어오고,
 * 그 숫자를 h1 바로 아래에서 읽고 나갈 수 있어야 한다. 컵의 나라별 차이나 왜
 * 무게로 재야 하는지는 그 뒤에 읽을 거리다.
 *
 * 모든 숫자는 밀도 하나에서 계산한다. 재료마다 표를 손으로 적으면 125 × 다섯 칸이고,
 * 하나가 틀려도 반죽을 망쳐 본 사람만 알아챈다.
 */
export default function FoodWeightPage({ ing, lang }: { ing: Ingredient; lang: Lang8 }) {
  const ui = FOOD_UI[lang];
  const f = foodFacts(ing);
  const name = ing.name[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/food`;
  const path = `${prefix}/food/${ing.slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const similar = similarIngredients(ing.slug);

  const volumes: { label: string; grams: number; hero?: boolean }[] = [
    { label: ui.cupUs, grams: f.grams.cupUs, hero: true },
    { label: ui.cupMetric, grams: f.grams.cupMetric, hero: true },
    { label: ui.cupUk, grams: f.grams.cupUk },
    { label: ui.tbsp, grams: f.grams.tbsp },
    { label: ui.tsp, grams: f.grams.tsp },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/food` },
          { name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(name, ui.metaDesc(name, f), path)} />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/food`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 찾으러 온 숫자를 맨 위에 — 미국 컵과 한국 컵을 나란히 둔다 */}
        <div className="text-center mb-6">
          {/* 다른 상세 화면과 같은 배지 — 가는 선이 작게 흐려지지 않게 흰색으로 얹는다 */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500">
            <ToolIcon emoji="⚖️" accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-3">{name}</h1>
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            {volumes.filter(v => v.hero).map(v => (
              <div key={v.label} className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-3 py-3">
                <p className="text-2xl font-black text-amber-900 dark:text-amber-200 tabular-nums">
                  {v.grams}
                  <span className="text-sm font-bold ml-0.5">{ui.gram}</span>
                </p>
                <p className="text-[11px] font-bold text-amber-700 dark:text-amber-300 mt-0.5">{v.label}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {volumes.map(v => (
                <tr key={v.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-3/5 bg-slate-50 dark:bg-slate-900/40">
                    {v.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">
                    {v.grams} {ui.gram}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40">
                  {ui.densityLabel}
                </th>
                <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">
                  {f.gPerL} {ui.gram}/L
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mt-6">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.cupTableTitle}</h2>
          <div className="grid grid-cols-5 gap-2">
            {f.cupTable.map(r => (
              <div key={r.label} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2.5 text-center">
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{ui.cupOf(r.label)}</p>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums mt-0.5">
                  {r.grams}{ui.gram}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3.5">
          <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-1">{ui.per100gTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
            100 {ui.gram} = {ui.cupOf(String(f.cupsPer100g))} · {f.mlPer100g} ml
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.itemFaq(name, f)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.similarTitle}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.similarTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {similar.map(s => {
              const sf = foodFacts(s);
              return (
                <Link
                  key={s.slug}
                  href={`${prefix}/food/${s.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{s.name[lang]}</span>
                  <span className="text-xs font-black text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                    {sf.grams.cupUs}{ui.gram}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link
              key={l.lang}
              href={`${l.prefix}/food/${ing.slug}`}
              hrefLang={l.hreflang}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
