import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import DrillList from '@/components/drill/DrillList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { BITS, DRILL_ICON, KINDS, bitOf, slugOf } from '@/lib/drill/list';
import { drillFacts, ofKind } from '@/lib/drill/facts';
import { DRILL_UI } from '@/lib/drill/ui';

/**
 * 드릴 목록 — 탭 드릴을 먼저 보인다.
 *
 * 이 표를 여는 손은 대개 나사를 들고 있다. 자주 찾는 탭 드릴이 맨 위에 있으면
 * 그 자리에서 끝나는 일이 많다.
 */
export default function DrillHubPage({ lang }: { lang: Lang }) {
  const ui = DRILL_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/drill`;
  const base = localeOfLang(lang);
  const taps = ['m2-5', 'm3-3', 'm4-2', 'm5', 'm6-8', 'm8-5', 'm10-2'].map(s => bitOf(s)).filter((b): b is NonNullable<typeof b> => !!b);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, BITS.map(b => ({ name: `${b.name} · ${b.mm}mm`, path: `${path}/${slugOf(b)}` })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-neutral-600 to-slate-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/drill" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-neutral-600 to-slate-400">
            <ToolIcon emoji={DRILL_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tapTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tapNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {taps.map(b => {
              const f = drillFacts(b);
              return (
                <Link
                  key={slugOf(b)}
                  href={`${path}/${slugOf(b)}`}
                  className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="cell-num">{b.name} mm</span>
                  <span className="cell-sub text-right">
                    {f.taps.length ? f.taps.map(t => t.label).join(', ') : ui.noneTag}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.seriesTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.seriesNote}</p>
        </section>

        {KINDS.map(k => (
          <section key={k} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{ui.kindName(k)}</h3>
            <DrillList bits={ofKind(k)} path={path} />
          </section>
        ))}

        <section className="mt-8 mb-8">
          <h2 className="sec-h2-tight">{ui.numberTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.numberNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.nearTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.nearNote}</p>
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
            <Link key={l.lang} href={`${l.prefix}/drill`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
