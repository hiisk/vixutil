import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import PaceTable from '@/components/pace/PaceTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { PACES, PACE_ICON, labelOf, slugOf } from '@/lib/pace/list';
import { GOALS, ROUND_PACES, paceForGoal } from '@/lib/pace/facts';
import { PACE_UI } from '@/lib/pace/ui';

/**
 * 페이스 목록 — 목표에서 페이스로 거꾸로 들어오는 길을 먼저 낸다.
 *
 * 사람들은 "5분 30초로 뛰면 얼마나 걸리나"보다 "서브4를 하려면 얼마로 뛰어야
 * 하나"를 더 많이 묻는다. 그래서 목표별 필요 페이스를 표 위에 세운다.
 */
export default function PaceHubPage({ lang }: { lang: Lang }) {
  const ui = PACE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/pace`;
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
        data={itemListJsonLd(ui.hubTitle, path, PACES.map(p => ({ name: `${labelOf(p)} /km`, path: `${path}/${slugOf(p)}` })))}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-700 to-emerald-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/pace" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-teal-700 to-emerald-500">
            <ToolIcon emoji={PACE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.goalTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.goalNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {GOALS.map(g => {
              const sec = paceForGoal(g);
              return (
                <Link
                  key={g.key}
                  href={`${path}/${slugOf(sec)}`}
                  className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{ui.goalName(g.key)}</span>
                  <span className="text-sm font-bold text-teal-700 dark:text-teal-400 tabular-nums">{labelOf(sec)} /km</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <PaceTable path={path} paces={ROUND_PACES} head={[ui.paceLabel, ui.raceName('half'), ui.raceName('full')]} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.distanceTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.distanceNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.paceLabel}</h2>
          <div className="flex flex-wrap gap-1">
            {PACES.map(p => (
              <Link
                key={p}
                href={`${path}/${slugOf(p)}`}
                className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
              >
                {labelOf(p)}
              </Link>
            ))}
          </div>
        </section>

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
            <Link key={l.lang} href={`${l.prefix}/pace`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
