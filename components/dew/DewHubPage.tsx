import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import DewGrid from '@/components/dew/DewGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, DEW_ICON, slugOf } from '@/lib/dew/list';
import { dewOf } from '@/lib/dew/facts';
import { DEW_UI } from '@/lib/dew/ui';

/**
 * 이슬점 목록 — 격자를 먼저 보인다.
 *
 * 189칸을 목록으로 늘어놓으면 아무것도 보이지 않는다. 표로 세우면 같은 습도라도
 * 기온이 오를수록 눅눅해지는 모양이 드러나고, 그것이 이 표의 요점이다.
 */
export default function DewHubPage({ lang }: { lang: Lang }) {
  const ui = DEW_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/dew`;
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
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({
          name: `${c.t}°C · ${c.rh}%`,
          path: `${path}/${slugOf(c)}`,
        })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-700 to-sky-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
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
            <LangPicker current={localeOfLang(lang)} route="/dew" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-cyan-700 to-sky-500">
            <ToolIcon emoji={DEW_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.comfortNote}</p>
          <DewGrid path={path} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.whyTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.whyNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.capacityTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.capacityNote}</p>
          <div className="flex flex-wrap gap-2">
            {[10, 20, 30, 40].map(t => (
              <Link
                key={t}
                href={`${path}/${slugOf({ t, rh: 60 })}`}
                className="rounded-xl border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300 tabular-nums hover:border-cyan-500 transition-colors"
              >
                {t}°C · 60% → {dewOf(t, 60)}°
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.comfortTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.comfortNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.fogTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.fogNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/dew`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
