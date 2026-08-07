import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { APERTURES, CELLS, EXPOSURE_ICON, SHUTTERS, apertureLabel, shutterLabel, slugOf } from '@/lib/exposure/list';
import { evStops } from '@/lib/exposure/facts';
import { EXPOSURE_UI } from '@/lib/exposure/ui';

export default function ExposureHubPage({ lang }: { lang: Lang }) {
  const ui = EXPOSURE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/exposure`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.roundTitle, ui.roundNote],
    [ui.diagonalTitle, ui.diagonalNote],
    [ui.sameLookTitle, ui.sameLookNote],
    [ui.sunnyTitle, ui.sunnyNote],
    [ui.isoTitle, ui.isoNote],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          ui.hubTitle,
          path,
          CELLS.map(c => ({
            name: `${apertureLabel(c.aperture)} ${shutterLabel(SHUTTERS[c.shutter])}`,
            path: `${path}/${slugOf(c)}`,
          })),
        )}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-800 to-sky-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/exposure" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-slate-800 to-sky-400">
            <ToolIcon emoji={EXPOSURE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.evLabel}</h2>
          <p className="mb-3 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            {ui.apertureLabel} \ {ui.shutterLabel} · ISO 100
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse tabular-nums">
              <caption className="sr-only">{ui.hubMetaTitle}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-1 py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 text-left" />
                  {SHUTTERS.map((s, j) => (
                    <th key={j} scope="col" className="px-0.5 py-1 text-[9px] font-bold text-slate-600 dark:text-slate-300">
                      {shutterLabel(s)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APERTURES.map((aperture, i) => (
                  <tr key={aperture}>
                    <th scope="row" className="px-1 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 text-left whitespace-nowrap">
                      {apertureLabel(aperture)}
                    </th>
                    {SHUTTERS.map((_s, j) => {
                      const ev = evStops(i, j);
                      return (
                        <td key={j} className="p-px">
                          <Link
                            href={`${path}/${slugOf({ aperture, shutter: j })}`}
                            aria-label={`${apertureLabel(aperture)} ${shutterLabel(SHUTTERS[j])} · ${ui.evShort} ${ev}`}
                            className="block rounded py-1 text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-opacity hover:opacity-60"
                          >
                            {ev}
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/exposure`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
