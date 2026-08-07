import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { BLOOD_ICON, CELLS, COMPONENTS, TYPES, labelOf, slugOf } from '@/lib/blood/list';
import { okFor } from '@/lib/blood/facts';
import { BLOOD_UI } from '@/lib/blood/ui';

export default function BloodHubPage({ lang }: { lang: Lang }) {
  const ui = BLOOD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/blood`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.flipTitle, ui.flipNote],
    [ui.rhTitle, ui.rhNote],
    [ui.safetyTitle, ui.safetyNote],
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
          CELLS.map(c => ({ name: `${c.donor} → ${c.recipient}`, path: `${path}/${slugOf(c)}` })),
        )}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-red-900 to-rose-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/blood" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-red-900 to-rose-400">
            <ToolIcon emoji={BLOOD_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {COMPONENTS.map(component => (
          <section key={component} className="mb-8">
            <h2 className="sec-h2-tight">{ui.componentName(component)}</h2>
            <p className="mb-3 note-xs">{ui.componentNote(component)}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse tabular-nums">
                <caption className="sr-only">{ui.componentName(component)}</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-1 py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 text-left">
                      {ui.donorLabel} \ {ui.recipientLabel}
                    </th>
                    {TYPES.map(r => (
                      <th key={r.key} scope="col" className="px-1 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        {labelOf(r)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TYPES.map(d => (
                    <tr key={d.key}>
                      <th scope="row" className="px-1 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 text-left">
                        {labelOf(d)}
                      </th>
                      {TYPES.map(r => {
                        const good = okFor(component, d, r);
                        return (
                          <td key={r.key} className="p-0.5">
                            <Link
                              href={`${path}/${slugOf({ component, donor: d.key, recipient: r.key })}`}
                              aria-label={`${labelOf(d)} → ${labelOf(r)} · ${good ? ui.verdictOk : ui.verdictNo}`}
                              className={`block rounded-md py-1.5 text-xs font-bold transition-opacity hover:opacity-70 ${
                                good
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                  : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                              }`}
                            >
                              {good ? '○' : '×'}
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
        ))}

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
            <Link key={l.lang} href={`${l.prefix}/blood`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
