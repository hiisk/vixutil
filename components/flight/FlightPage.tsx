import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FlightList from '@/components/flight/FlightList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf, nameOf } from '@/lib/flight/list';
import { flightFacts, fromCity, hoursOf, toCity } from '@/lib/flight/facts';
import { FLIGHT_UI } from '@/lib/flight/ui';

export default function FlightPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = flightFacts(c);
  const ui = FLIGHT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/flight`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const pair = `${nameOf(lang, c.from)} → ${nameOf(lang, c.to)}`;
  const span = (m: number) => ui.duration(...hoursOf(m));

  const rows: [string, string][] = [
    [ui.distanceLabel, `${f.km.toLocaleString('en-US')} km · ${f.miles.toLocaleString('en-US')} mi`],
    [ui.shareLabel, `${f.share}%`],
    [ui.bearingLabel, `${f.bearing}° (${f.compass})`],
    [ui.timeLabel, `${span(f.fastMinutes)} ~ ${span(f.slowMinutes)}`],
    [`${ui.shiftLabel} · ${ui.winterLabel}`, ui.shiftText(f.winterShift)],
    ...(f.shiftVaries ? ([[`${ui.shiftLabel} · ${ui.summerLabel}`, ui.shiftText(f.summerShift)]] as [string, string][]) : []),
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

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-900 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{pair}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/flight/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-blue-400 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate">{pair}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">
            {f.km.toLocaleString('en-US')}
          </div>
          <div className="mt-1 text-sm font-bold text-blue-700 dark:text-blue-300 tabular-nums">
            km · {span(f.fastMinutes)} ~ {span(f.slowMinutes)}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{pair}</h1>
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
          <h2 className="sec-h2-tight">{ui.arriveTitle}</h2>
          <ul className="list-card">
            {f.arrivals.map(a => (
              <li key={a.departHour} className="flex items-baseline justify-between gap-3 px-4 py-2">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  {ui.departWord} {String(a.departHour).padStart(2, '0')}:00
                </span>
                <span className="cell-num shrink-0">
                  {a.arriveText} <span className="font-normal text-slate-400 dark:text-slate-500">{ui.nextDay(a.dayShift)}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 note-xs">{ui.arriveNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.windTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.windNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.reverseTitle}</h2>
          <FlightList cells={[{ from: c.to, to: c.from }]} path={hub} lang={lang} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.fromRowTitle}</h2>
          <FlightList cells={fromCity(c.from)} path={hub} lang={lang} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.toRowTitle}</h2>
          <FlightList cells={toCity(c.to)} path={hub} lang={lang} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.greatCircleTitle}</h2>
          <p className="note-xs">{ui.greatCircleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.dstTitle}</h2>
          <p className="note-xs">{ui.dstNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.centerTitle}</h2>
          <p className="note-xs">{ui.centerNote}</p>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/flight/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
