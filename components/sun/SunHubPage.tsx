import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SunList from '@/components/sun/SunList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { LATITUDES, SUN_ICON } from '@/lib/sun/list';
import { atLat, sunFacts } from '@/lib/sun/facts';
import { SUN_UI, fmtNum, latName } from '@/lib/sun/ui';

export default function SunHubPage({ lang }: { lang: Lang }) {
  const ui = SUN_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/sun`;
  const base = localeOfLang(lang);
  const n = (x: number) => fmtNum(lang, x);
  const notes: [string, string][] = [
    [ui.declTitle, ui.declNote],
    [ui.dayTitle, ui.dayNote],
    [ui.shadowTitle, ui.shadowNote],
    [ui.approxTitle, ui.approxNote],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-amber-300" />

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
            <LangPicker current={localeOfLang(lang)} route="/sun" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-sky-500 to-amber-300">
            <ToolIcon emoji={SUN_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
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

        <section className="mb-6">
          <h2 className="sec-h2-tight">{ui.uvTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.uvNote}</p>
          <Link prefetch={false} href={`${prefix}/uv`} className="mt-2 inline-block text-sm font-bold text-sky-700 dark:text-sky-300 hover:underline">
            {ui.uvLink}
          </Link>
        </section>

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.dayLengthLabel} · {ui.noonLabel}</p>
        </section>

        {/* 위도마다 한 줄 — 곁에 적은 두 값은 그 위도의 하지·동지 정오 고도다 */}
        {LATITUDES.map(lat => {
          const june = sunFacts({ lat, date: 'jun21' });
          const december = sunFacts({ lat, date: 'dec21' });
          return (
            <section key={lat} className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 tabular-nums">
                {latName(lang, lat)}
                <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                  {ui.turns.junSolstice} {n(june.noonAltitude)}° · {ui.turns.decSolstice} {n(december.noonAltitude)}°
                </span>
              </h3>
              <SunList cells={atLat(lat)} lang={lang} by="date" />
            </section>
          );
        })}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
          <p className="note-xs mt-2">{ui.solarTimeNote}</p>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/sun`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
