import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import FretBoard from '@/components/fret/FretBoard';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { FRET_ICON, SCALES, SPOTS, STRINGS, slugOf } from '@/lib/fret/list';
import { alongString, distanceOf, fretFacts, nameOf } from '@/lib/fret/facts';
import { FRET_UI } from '@/lib/fret/ui';

/**
 * 지판 목록 — 지판을 먼저 그리고 줄별로 늘어놓는다.
 *
 * 144자리를 목록으로 늘어놓으면 지판이 사라진다. 그림이 먼저 있어야 자기 손이
 * 가는 자리를 짚을 수 있다.
 */
export default function FretHubPage({ lang }: { lang: Lang }) {
  const ui = FRET_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/fret`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, SPOTS.map(p => ({
          name: `${ui.stringName(p.string)} ${ui.fretName(p.fret)}`,
          path: `${path}/${slugOf(p)}`,
        })))}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-yellow-700 to-amber-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/fret" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-yellow-700 to-amber-500">
            <ToolIcon emoji={FRET_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.stringTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.stringNote}</p>
          <FretBoard path={path} lang={lang} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tuningTitle}</h2>
          <p className="note-xs">{ui.tuningNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.distanceTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.distanceNote}</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <th className="px-3 py-2 text-left font-bold">{ui.fretName(1)}</th>
                  {SCALES.map(s => (
                    <th key={s.key} className="px-3 py-2 text-right font-bold">{ui.scaleName(s.key)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 3, 5, 7, 12, 17, 19, 23].map(f => (
                  <tr key={f} className="bg-white dark:bg-slate-900">
                    <td className="px-3 py-2 font-bold text-slate-700 dark:text-slate-200">{f}</td>
                    {SCALES.map(s => (
                      <td key={s.key} className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">
                        {distanceOf(f, s.mm)} mm
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.sameNoteTitle}</h2>
          <p className="note-xs">{ui.sameNoteNote}</p>
        </section>

        {Array.from({ length: STRINGS }, (_, i) => i + 1).map(s => (
          <section key={s} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.stringName(s)} · {nameOf({ string: s, fret: 0 }, lang)}{fretFacts({ string: s, fret: 0 }).octave}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {alongString(s).map(p => (
                <Link prefetch={false}
                  key={slugOf(p)}
                  href={`${path}/${slugOf(p)}`}
                  className="rounded-lg border chip-off px-2 py-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  {p.fret}·{nameOf(p, lang)}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8 mb-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/fret`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
