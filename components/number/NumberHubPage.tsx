import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import NumberGrid from '@/components/number/NumberGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { NUMBERS, NUMBER_ICON, POWERS } from '@/lib/number/list';
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
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, NUMBERS.map(n => ({ name: String(n), path: `${path}/${n}` })))}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-violet-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/number" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-600 to-violet-500">
            <ToolIcon emoji={NUMBER_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.gridTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.gridNote}</p>
          <NumberGrid path={path} />
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
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.powersNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {POWERS.map(n => {
              const f = numberFacts(n);
              return (
                <Link
                  key={n}
                  href={`${path}/${n}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-indigo-700 dark:text-indigo-400 tabular-nums shrink-0 w-[54px] text-right">{n}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">2^{f.power2}</span>
                  <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{ui.bitsValue(f.bits)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {FAMILIES.map(fam => (
          <section key={fam} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.familyLabel[fam]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{membersOf(fam).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.familyNote[fam]}</p>
            <div className="flex flex-wrap gap-1.5">
              {membersOf(fam).map(n => (
                <Link
                  key={n}
                  href={`${path}/${n}`}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {n}
                </Link>
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
            <Link key={l.lang} href={`${l.prefix}/number`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
