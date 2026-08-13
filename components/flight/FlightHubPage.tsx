import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, FLIGHT_CITIES, FLIGHT_ICON, nameOf, slugOf } from '@/lib/flight/list';
import { flightFacts } from '@/lib/flight/facts';
import { FLIGHT_UI } from '@/lib/flight/ui';

export default function FlightHubPage({ lang }: { lang: Lang }) {
  const ui = FLIGHT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/flight`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.greatCircleTitle, ui.greatCircleNote],
    [ui.windTitle, ui.windNote],
    [ui.dstTitle, ui.dstNote],
    [ui.centerTitle, ui.centerNote],
  ];

  return (
    <div className="page-wrap">
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
          CELLS.map(c => ({ name: `${nameOf(lang, c.from)} → ${nameOf(lang, c.to)}`, path: `${path}/${slugOf(c)}` })),
        )}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-900 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/flight" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-blue-900 to-sky-400">
            <ToolIcon emoji={FLIGHT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.distanceLabel}</h2>
          <p className="mb-3 note-xs">km</p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse tabular-nums">
              <caption className="sr-only">{ui.hubMetaTitle}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-1 py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 text-left" />
                  {FLIGHT_CITIES.map(c => (
                    <th key={c.id} scope="col" className="px-0.5 py-1 text-[9px] font-bold text-slate-600 dark:text-slate-300">
                      {c.flag}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FLIGHT_CITIES.map(a => (
                  <tr key={a.id}>
                    <th scope="row" className="px-1 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 text-left whitespace-nowrap">
                      {a.flag} {nameOf(lang, a.id)}
                    </th>
                    {FLIGHT_CITIES.map(b => {
                      if (a.id === b.id) {
                        return <td key={b.id} className="p-px"><div className="rounded py-1 text-[9px] text-slate-300 dark:text-slate-700">·</div></td>;
                      }
                      const f = flightFacts({ from: a.id, to: b.id });
                      return (
                        <td key={b.id} className="p-px">
                          <Link prefetch={false}
                            href={`${path}/${slugOf({ from: a.id, to: b.id })}`}
                            aria-label={`${nameOf(lang, a.id)} → ${nameOf(lang, b.id)} · ${f.km} km`}
                            className="block rounded py-1 text-[9px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 transition-opacity hover:opacity-60"
                          >
                            {Math.round(f.km / 100) / 10}
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 note-xs">
            {ui.hubMetaDesc}
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
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/flight`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
