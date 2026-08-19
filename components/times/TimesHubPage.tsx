import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TimesGrid from '@/components/times/TimesGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { TIMES_ICON, slugOf } from '@/lib/times/list';
import { TABLES, tableOf } from '@/lib/times/facts';
import { TIMES_UI } from '@/lib/times/ui';

/**
 * 곱셈 목록 — 격자를 먼저 보이고 단별로 늘어놓는다.
 *
 * 격자가 곧 목차다. 210줄을 늘어놓으면 정작 찾으러 온 7단이 파묻힌다.
 */
export default function TimesHubPage({ lang }: { lang: Lang }) {
  const ui = TIMES_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/times`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

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
            <LangPicker current={localeOfLang(lang)} route="/times" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-sec-soft">
            <ToolIcon emoji={TIMES_ICON} className="w-7 h-7" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.gridTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.gridNote}</p>
          <TimesGrid />
        </section>

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.tableNote}</p>
        </section>

        {TABLES.map(n => (
          <section key={n} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{ui.tableName(n)}</h3>
            <div className="flex flex-wrap gap-1.5">
              {tableOf(n).map(p => (
                <span
                  key={slugOf(p)}
                 
                  className="rounded-lg border chip-off px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {p.a === n ? `${p.a}×${p.b}` : `${p.b}×${p.a}`} = {p.a * p.b}
                </span>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/times`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
