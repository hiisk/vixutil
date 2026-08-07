import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import AltitudeTable from '@/components/altitude/AltitudeTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ALTITUDES, ALTITUDE_ICON, PLACES, ROUND_ALTITUDES } from '@/lib/altitude/list';
import { altitudeFacts } from '@/lib/altitude/facts';
import { ALTITUDE_UI } from '@/lib/altitude/ui';

/**
 * 고도 목록 — 사람이 아는 자리를 먼저 보인다.
 *
 * 2250m라는 수보다 "멕시코시티"가 먼저 와 닿는다. 그 자리들을 위에 두면 자기가
 * 있는 높이가 어느 언저리인지 바로 가늠된다.
 */
export default function AltitudeHubPage({ lang }: { lang: Lang }) {
  const ui = ALTITUDE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/altitude`;
  const base = localeOfLang(lang);
  const head: [string, string, string] = [ui.heightLabel, ui.pressureLabel, ui.boilLabel];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, ALTITUDES.map(m => ({ name: `${m} m`, path: `${path}/${m}` })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-700 to-sky-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/altitude" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-cyan-700 to-sky-500">
            <ToolIcon emoji={ALTITUDE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.placeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.placeNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {PLACES.map(p => {
              const f = altitudeFacts(p.m);
              return (
                <Link
                  key={p.key}
                  href={`${path}/${p.m}`}
                  className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{ui.placeName(p.key)}</span>
                  <span className="cell-sub text-right">
                    {p.m} m · {f.hpa} hPa · {f.boilC} °C
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.boilTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.boilNote}</p>
          <AltitudeTable path={path} altitudes={ROUND_ALTITUDES} head={head} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.oxygenTitle}</h2>
          <p className="note-xs">{ui.oxygenNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.pressureTitle}</h2>
          <p className="note-xs">{ui.pressureNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.allTitle}</h2>
          <div className="flex flex-wrap gap-1">
            {ALTITUDES.map(m => (
              <Link
                key={m}
                href={`${path}/${m}`}
                className="w-14 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-1 text-center text-[11px] font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
              >
                {m}
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

        <p className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          {ui.caution}
        </p>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/altitude`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
