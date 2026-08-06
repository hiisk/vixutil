import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import TireRims from '@/components/tire/TireRims';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { TIRES, TIRE_ICON, labelOf, slugOf } from '@/lib/tire/list';
import { diameterOf, extremes } from '@/lib/tire/facts';
import { TIRE_UI } from '@/lib/tire/ui';

/**
 * 타이어 목록 — 규격 읽는 법을 먼저 보이고 휠 지름으로 가른다.
 *
 * 이 표에 오는 사람은 이미 자기 치수를 들고 온다. 그러니 목록보다 "그 숫자가
 * 무엇을 뜻하는지"가 먼저다.
 */
export default function TireHubPage({ lang }: { lang: Lang }) {
  const ui = TIRE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/tire`;
  const base = localeOfLang(lang);
  const { biggest, smallest } = extremes();

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, TIRES.map(t => ({ name: labelOf(t), path: `${path}/${slugOf(t)}` })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-700 to-slate-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/tire" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-slate-700 to-slate-500">
            <ToolIcon emoji={TIRE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.readTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.readNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4">
            <div className="text-center text-2xl font-black text-slate-900 dark:text-slate-100 tracking-wide mb-3">205/55R16</div>
            <dl className="grid grid-cols-3 gap-2 text-center">
              {[
                [ui.widthLabel, '205 mm'],
                [ui.aspectLabel, '55 %'],
                [ui.rimLabel, '16 in'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800 px-2 py-2">
                  <dt className="text-[11px] text-slate-500 dark:text-slate-400">{k}</dt>
                  <dd className="cell-num">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.altTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.altNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.extremeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.extremeNote}</p>
          <div className="flex flex-wrap gap-2">
            {[smallest, biggest].map(t => (
              <Link
                key={slugOf(t)}
                href={`${path}/${slugOf(t)}`}
                className="rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 tabular-nums hover:border-slate-500 transition-colors"
              >
                {labelOf(t)} · {diameterOf(t)}mm
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.rimTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.rimNote}</p>
          <TireRims path={path} name={ui.rimName} />
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
            <Link key={l.lang} href={`${l.prefix}/tire`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
