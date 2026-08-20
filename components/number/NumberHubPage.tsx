import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import NumberGrid from '@/components/number/NumberGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { NUMBER_ICON, POWERS } from '@/lib/number/list';
import { FAMILIES, membersOf, numberFacts } from '@/lib/number/facts';
import { NUMBER_UI } from '@/lib/number/ui';

/**
 * 수 목록 — 격자를 먼저 보이고, 그 아래에 갈래별 목록을 둔다.
 *
 * 격자가 곧 목차다. 209개를 줄줄이 늘어놓으면 아무도 끝까지 내리지 않는다.
 */
export default function NumberHubPage({ lang }: { lang: Lang }) {
  const ui = NUMBER_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/number`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="indigo" />
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
            <LangPicker current={localeOfLang(lang)} route="/number" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={NUMBER_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.gridTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.gridNote}</p>
          <NumberGrid />
          <div className="mt-3 flex items-center gap-4 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-[3px] border border-indigo-300 bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-900/60" />
              {ui.primeTag}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-[3px] border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900" />
              {ui.compositeTag}
            </span>
          </div>
        </section>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.powersTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.powersNote}</p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {POWERS.map(n => {
              const f = numberFacts(n);
              return (
                <span
                  key={n}
                 
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400 tabular-nums shrink-0 w-[54px] text-right">{n}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">2^{f.power2}</span>
                  <span className="ml-auto text-[11px] text-slate-500 dark:text-slate-400 tabular-nums shrink-0">{ui.bitsValue(f.bits)}</span>
                </span>
              );
            })}
          </div>
        </section>

        {FAMILIES.map(fam => (
          <section key={fam} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.familyLabel[fam]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">{membersOf(fam).length}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.familyNote[fam]}</p>
            <div className="flex flex-wrap gap-1.5">
              {membersOf(fam).map(n => (
                <span
                  key={n}
                 
                  className="rounded-lg border chip-off px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {n}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/number`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
