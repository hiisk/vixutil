import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { DARTS_ICON, SCORES } from '@/lib/darts/list';
import { bogeyScores, dartsFacts, scoresOfDarts } from '@/lib/darts/facts';
import { DARTS_UI } from '@/lib/darts/ui';

/**
 * 마무리 목록 — 몇 다트에 끝나는지로 묶는다.
 *
 * 점수순으로만 늘어놓으면 169줄이 똑같아 보인다. 다트 수로 묶으면 "여기까지가
 * 두 다트"라는 경계가 드러나고, 그 경계가 실제로 판 앞에서 쓰는 지식이다.
 */
export default function DartsHubPage({ lang }: { lang: Lang }) {
  const ui = DARTS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/darts`;
  const base = localeOfLang(lang);
  const bogey = bogeyScores();

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, SCORES.map(s => ({ name: String(s), path: `${path}/${s}` })))}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-red-600 to-rose-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/darts" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-red-600 to-rose-500">
            <ToolIcon emoji={DARTS_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.boardNote}
        </p>

        <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-8">
          <span className="font-bold">{ui.bogeyTitle}</span> · {bogey.join(' · ')}
        </p>

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.groupTitle}</h2>
          <p className="note-xs">{ui.ruleNote}</p>
        </section>

        {[1, 2, 3].map(n => (
          <section key={n} className="mb-8">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.dartsLabel(n)}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{scoresOfDarts(n, SCORES).length}</span>
            </h3>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {scoresOfDarts(n, SCORES).map(s => {
                const f = dartsFacts(s);
                return (
                  <Link
                    key={s}
                    href={`${path}/${s}`}
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm font-black text-red-700 dark:text-red-400 tabular-nums shrink-0 w-[36px] text-right">{s}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{f.route.map(t => t.label).join(' · ')}</span>
                    <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{f.routeCount}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
            {ui.dartsLabel(null)}
            <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{bogey.length}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {bogey.map(s => (
              <Link
                key={s}
                href={`${path}/${s}`}
                className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-200 tabular-nums hover:border-amber-400 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </section>

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
            <Link key={l.lang} href={`${l.prefix}/darts`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
