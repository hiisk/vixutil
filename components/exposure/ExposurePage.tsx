import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import ExposureList from '@/components/exposure/ExposureList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/exposure/list';
import { atAperture, atShutter, exposureFacts } from '@/lib/exposure/facts';
import { EXPOSURE_UI } from '@/lib/exposure/ui';

export default function ExposurePage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = exposureFacts(c);
  const ui = EXPOSURE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/exposure`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const pair = `${f.apertureText} · ${f.shutterText}`;

  const rows: [string, string][] = [
    [ui.apertureLabel, f.apertureText],
    [ui.shutterLabel, f.shutterText],
    [ui.secondsLabel, `${f.seconds < 1 ? f.seconds.toFixed(6).replace(/0+$/, '') : f.seconds} s`],
    [ui.evLabel, `${f.ev}`],
    [ui.printedLabel, `${f.evPrinted}`],
    [ui.driftLabel, `${f.drift > 0 ? '+' : ''}${f.drift} ${ui.stopWord}`],
    [ui.lightLabel, ui.lightName(f.light)],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: pair, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-800 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name tabular-nums">{pair}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/exposure/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-sky-400 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate tabular-nums">{pair}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">
            {ui.evShort} {f.ev}
          </div>
          <div className="mt-1 text-sm font-bold text-sky-700 dark:text-sky-300">{ui.lightName(f.light)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.roundTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.driftNote(f)}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.sameEvTitle}</h2>
          <ExposureList
            cells={f.equivalents.map(e => ({ aperture: e.aperture, shutter: e.shutter }))}
            path={hub}
            evLabel={ui.evShort}
          />
          <p className="mt-2 note-xs">{ui.sameLookNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.isoTitle}</h2>
          <p className="mb-3 note-xs">{ui.isoNote}</p>
          <ul className="list-card">
            {f.isoRows.map(r => (
              <li key={r.iso} className="flex items-baseline justify-between gap-3 px-4 py-2">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">ISO {r.iso}</span>
                <span className="cell-num shrink-0">{ui.evShort} {r.ev}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.apertureRowTitle}</h2>
          <ExposureList cells={atAperture(c.aperture)} path={hub} evLabel={ui.evShort} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.shutterRowTitle}</h2>
          <ExposureList cells={atShutter(c.shutter)} path={hub} evLabel={ui.evShort} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.diagonalTitle}</h2>
          <p className="note-xs">{ui.diagonalNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.sunnyTitle}</h2>
          <p className="note-xs">{ui.sunnyNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/exposure/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
