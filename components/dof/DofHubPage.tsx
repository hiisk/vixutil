import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import DofList from '@/components/dof/DofList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, DOF_ICON, FOCALS, slugOf } from '@/lib/dof/list';
import { atFocal, dofFacts } from '@/lib/dof/facts';
import { DOF_UI } from '@/lib/dof/ui';

export default function DofHubPage({ lang }: { lang: Lang }) {
  const ui = DOF_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/dof`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.hyperTitle, ui.hyperNote],
    [ui.cocTitle, ui.cocNote],
    [ui.ruleTitle, ui.ruleNote],
    [ui.formatTitle, ui.formatNote],
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
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: `${c.focal} mm f/${c.aperture}`, path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/dof" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-500 to-violet-400">
            <ToolIcon emoji={DOF_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.hyperfocalLabel}</p>
        </section>

        {FOCALS.map(focal => (
          <section key={focal} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 tabular-nums">
              {focal} mm
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                f/8 · {dofFacts({ focal, aperture: 8 }).hyperfocal} m
              </span>
            </h3>
            <DofList cells={atFocal(focal)} path={path} by="aperture" />
          </section>
        ))}

        <section className="mb-8">
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
            <Link key={l.lang} href={`${l.prefix}/dof`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
