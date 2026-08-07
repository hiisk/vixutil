import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ABVS, CELLS, DRINK_ICON, VOLUMES, VOLUME_LANDMARK, slugOf } from '@/lib/drink/list';
import { drinkFacts } from '@/lib/drink/facts';
import { DRINK_UI } from '@/lib/drink/ui';

export default function DrinkHubPage({ lang }: { lang: Lang }) {
  const ui = DRINK_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/drink`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.countryTitle, ui.countryNote],
    [ui.volumeDefTitle, ui.volumeDefNote],
    [ui.twinTitle, ui.twinNote],
    [ui.kcalTitle, ui.kcalNote],
    [ui.guideTitle, ui.guideNote],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path }])} />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: `${c.abv}% ${c.ml}ml`, path: `${path}/${slugOf(c)}` })))} />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-900 to-amber-400" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/drink" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-amber-900 to-amber-400">
            <ToolIcon emoji={DRINK_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.gramsLabel}</h2>
          <p className="mb-3 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            {ui.abvLabel} \ {ui.mlLabel} · g
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse tabular-nums">
              <caption className="sr-only">{ui.hubMetaTitle}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-1 py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 text-left" />
                  {VOLUMES.map(ml => (
                    <th key={ml} scope="col" className="px-0.5 py-1 text-[9px] font-bold text-slate-600 dark:text-slate-300">{ml}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ABVS.map(abv => (
                  <tr key={abv}>
                    <th scope="row" className="px-1 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 text-left whitespace-nowrap">
                      {abv}%
                    </th>
                    {VOLUMES.map(ml => {
                      const f = drinkFacts({ abv, ml });
                      return (
                        <td key={ml} className="p-px">
                          <Link
                            href={`${path}/${slugOf({ abv, ml })}`}
                            aria-label={`${abv}% ${ml}ml · ${f.grams} g`}
                            className="block rounded py-1 text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 transition-opacity hover:opacity-60"
                          >
                            {Math.round(f.grams)}
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            {Object.entries(VOLUME_LANDMARK).map(([ml, key]) => `${ml}ml ${ui.landmarkName(key)}`).join(' · ')}
          </p>
        </section>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-8 mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => <li key={h} className="cell-note">{h}</li>)}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/drink`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
