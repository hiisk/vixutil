import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { FormulaLang } from '@/lib/formula/terms';
import { COUNTRY_UI, countryRegions, COUNTRY_SECTION, utcLabel, COUNTRY_LANGS } from '@/lib/country-ui';
import { countryText } from '@/lib/country/types';
import { localeHref } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';

/** 나라 정보 허브 — 지역별로 묶어 50개국을 한 화면에 */
export default function CountryHub({ lang }: { lang: FormulaLang }) {
  const ui = COUNTRY_UI[lang];
  const s = COUNTRY_SECTION;
    const homeHref = localeHref(lang, '/country');
  const label = countryRegions(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: localeHref(lang, '/country') },
        ])}
      />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="page-head">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={'/country'} available={COUNTRY_LANGS} />
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
          <p className="mt-4 inline-block rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {ui.hubNotice}
          </p>
        </div>

        {s.regions.map(region => {
          const list = s.countries.filter(c => c.region === region);
          if (list.length === 0) return null;
          return (
            <section key={region} className="mb-8">
              <h2 className="hub-cat-h2">
                {label[region] ?? region}
                <span className="hub-cat-count">{list.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.map(c => (
                  <Link
                    key={c.slug}
                    href={localeHref(lang, `/country/${c.slug}`)}
                    className={`group hub-card ${s.hoverBorder}`}
                  >
                    <ToolIcon emoji={c.icon} className="hub-card-icon" />
                    <span className="hub-card-body">
                      <span className={`hub-card-title ${s.hoverText}`}>
                        {countryText(c, lang).name}
                      </span>
                      <span className="hub-card-desc">
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
