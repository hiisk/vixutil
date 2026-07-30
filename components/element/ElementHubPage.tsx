import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import PeriodicTable from '@/components/element/PeriodicTable';
import { LANGS8, prefix8, type Lang8 } from '@/lib/i18n/lang8';
import { ELEMENTS, ELEMENT_ICON } from '@/lib/element/list';
import { CATEGORIES, elementFacts, elementsOfCategory } from '@/lib/element/facts';
import { nameOf } from '@/lib/element/names';
import { ELEMENT_UI } from '@/lib/element/ui';

/**
 * 원소 목록 — 표를 먼저 보이고, 그 아래에 갈래별 목록을 둔다.
 *
 * 주기율표는 그림이자 목차다. 표에서 바로 누를 수 있으면 목록을 훑을 일이 줄어든다.
 */
export default function ElementHubPage({ lang }: { lang: Lang8 }) {
  const ui = ELEMENT_UI[lang];
  const prefix = prefix8(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/element`;
  const base = lang === 'ko' ? 'ko' : 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, ELEMENTS.map(x => ({ name: nameOf(x.z, lang), path: `${path}/${x.z}` })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-600 to-sky-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-cyan-600 to-sky-500">
            <ToolIcon emoji={ELEMENT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <PeriodicTable path={path} />
        </section>

        {CATEGORIES.map(c => (
          <section key={c} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
              {ui.categoryLabel[c]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{elementsOfCategory(c).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.categoryNote[c]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {elementsOfCategory(c).map(x => {
                const f = elementFacts(x);
                return (
                  <Link
                    key={x.z}
                    href={`${path}/${x.z}`}
                    className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0 w-[26px] text-right">{x.z}</span>
                    <span className="text-sm font-black text-cyan-700 dark:text-cyan-400 font-mono shrink-0 w-[34px]">{x.symbol}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{nameOf(x.z, lang)}</span>
                    <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{ui.fmt(f.mass)}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/element`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
