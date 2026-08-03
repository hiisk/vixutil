import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { CALC_SHELL, CALC_INTL_SLUGS, calcCopy } from '@/lib/calc-l10n';
import { crossCalcs } from '@/lib/calc-l10n/cross';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { alternateLanguages10, localeHref, openGraphFor, ALL_LOCALES10 } from '@/lib/locales';

/**
 * 다국어 계산기 허브.
 *
 * 한국어 허브(app/calculator/page.tsx)는 백일곱 개를 여덟 갈래로 나눠 보여주는데,
 * 여기 오는 건 그중 나라를 타지 않는 것들뿐이라 갈래를 나누지 않고 한 줄로 둔다.
 * 개수가 자라면 그때 나눈다 — 지금 나누면 갈래마다 한두 개씩 놓인다.
 */
export function calcIntlHubMeta(lang: CalcLang) {
  const ui = CALC_SHELL[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/calculator'),
      languages: alternateLanguages10('/calculator'),
    },
  };
}

export default function CalcIntlHub({ lang }: { lang: CalcLang }) {
  const ui = CALC_SHELL[lang];
  const items = CALC_INTL_SLUGS.map(slug => ({ slug, copy: calcCopy(lang, slug)! }));
  const cross = crossCalcs(lang);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="blue" />
      <JsonLd data={breadcrumbJsonLd([
        { name: ui.home, path: localeHref(lang, '/') },
        { name: ui.calculators, path: localeHref(lang, '/calculator') },
      ])} />
      <JsonLd data={itemListJsonLd(ui.hubTitle, localeHref(lang, '/calculator'), items.map(i => ({
        name: i.copy.title,
        path: localeHref(lang, `/calculator/${i.slug}`),
      })))} />

      <div className="relative">
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

        <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/60 dark:border-slate-700/60 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link href={localeHref(lang, '/')} className="font-black text-blue-600 text-lg shrink-0">vixutil</Link>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.calculators}</span>
            <span className="ml-auto shrink-0">
              <LangPicker current={lang} route="/calculator" available={ALL_LOCALES10} />
            </span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">{ui.hubLead}</p>

          <div className="grid sm:grid-cols-2 gap-2">
            {items.map(i => (
              <Link
                key={i.slug}
                href={localeHref(lang, `/calculator/${i.slug}`)}
                className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 transition-colors">
                  {i.copy.title}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{i.copy.short}</span>
              </Link>
            ))}
          </div>

          {/* /rate·/body에 이미 열 언어로 있는 것들. 여기서 다시 내면 같은 도구가
              주소 둘을 갖게 되므로, 목록에서 빼는 대신 그쪽으로 넘겨준다. */}
          <h2 className="mt-10 mb-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {ui.crossTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {cross.map(x => (
              <Link
                key={x.slug}
                href={localeHref(lang, `/${x.section}/${x.slug}`)}
                className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 transition-colors">
                  {x.title}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{x.desc}</span>
              </Link>
            ))}
          </div>
        </main>

        {/* 허브는 본문에 자기 카드를 세우지 않으므로 푸터 자리를 끄지 않는다.
            끄면 이 화면에는 제휴 카드가 한 장도 남지 않는다. */}
        <SiteFooter lang={lang} />
      </div>
    </div>
  );
}
