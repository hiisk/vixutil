import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { FormulaLang } from '@/lib/formula/terms';
import { COUNTRY_UI, countryRegions, COUNTRY_SECTION, utcLabel } from '@/lib/country-ui';
import { countryText } from '@/lib/country/types';
import { ALL_LOCALES, localeHref, localeLabel, localeTag } from '@/lib/locales';

/** 나라 정보 허브 — 지역별로 묶어 50개국을 한 화면에 */
export default function CountryHub({ lang }: { lang: FormulaLang }) {
  const ui = COUNTRY_UI[lang];
  const s = COUNTRY_SECTION;
    const homeHref = localeHref(lang, '/country');
  const label = countryRegions(lang);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: localeHref(lang, '/country') },
        ])}
      />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
            {ALL_LOCALES.filter(l => l !== lang).map(l => (
              <Link key={l} href={localeHref(l, '/country')} hrefLang={localeTag(l)} className={`${s.linkHover} transition-colors`}>
                {localeLabel(l)}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
          <p className="mt-4 inline-block rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {ui.hubNotice}
          </p>
        </div>

        {s.regions.map(region => {
          const list = s.countries.filter(c => c.region === region);
          if (list.length === 0) return null;
          return (
            <section key={region} className="mb-8">
              <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 mb-3 pl-1">
                {label[region] ?? region}
                <span className="ml-2 font-bold text-slate-300 dark:text-slate-600">{list.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.map(c => (
                  <Link
                    key={c.slug}
                    href={localeHref(lang, `/country/${c.slug}`)}
                    className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 ${s.hoverBorder} hover:shadow-sm transition-all`}
                  >
                    <ToolIcon emoji={c.icon} className="text-slate-800 dark:text-slate-100 w-5 h-5 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 ${s.hoverText} transition-colors`}>
                        {countryText(c, lang).name}
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">
                        {utcLabel(c.utc)} · {c.volt} · {c.dial}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-4 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
