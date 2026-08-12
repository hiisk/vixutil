import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SunList from '@/components/sun/SunList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/sun/list';
import { atDate, atLat, sunFacts } from '@/lib/sun/facts';
import {
  SUN_UI, cellName, dateName, dayLengthText, fmtNum, latName, noonSideText, riseSetText, shadowText,
} from '@/lib/sun/ui';

export default function SunPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = sunFacts(c);
  const ui = SUN_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/sun`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = cellName(lang, f);
  const n = (x: number) => fmtNum(lang, x);

  /* 절기면 그 이름을 날짜 옆에 적는다 — 하지·동지가 왜 극단인지가 표에서 보인다 */
  const dateText = f.day.turn
    ? `${dateName(lang, f.day)} · ${ui.turns[f.day.turn]}`
    : dateName(lang, f.day);

  const rows: [string, string][] = [
    [ui.latLabel, latName(lang, c.lat)],
    [ui.dateLabel, dateText],
    [ui.dayOfYearLabel, `${f.n}`],
    [ui.declLabel, `${n(f.declination)}°`],
    [ui.noonLabel, `${n(f.noonAltitude)}°`],
    [ui.noonSideLabel, noonSideText(lang, f)],
    [ui.dayLengthLabel, dayLengthText(lang, f)],
    [ui.riseSetLabel, riseSetText(lang, f)],
    [ui.hourAngleLabel, `${n(f.hourAngle)}°`],
    [ui.shadowLabel, shadowText(lang, f)],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-amber-300" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/sun/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-sky-400 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{dayLengthText(lang, f)}</div>
          <div className="mt-1 text-sm font-bold text-sky-700 dark:text-sky-300 tabular-nums">
            {ui.noonLabel} {n(f.noonAltitude)}°
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {ui.declLabel} {n(f.declination)}° · {riseSetText(lang, f)}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-3">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="note-xs mb-8">{ui.solarTimeNote}</p>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.shadowTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.shadowNote}</p>
          {/* 왕복 — 그림자에 tan(고도)를 곱하면 다시 물체 높이가 된다 */}
          <ul className="list-card">
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5">
              <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                1 m ÷ tan {n(f.noonAltitude)}°
              </span>
              <span className="cell-num shrink-0">{shadowText(lang, f)}</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.approxTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.approxNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.uvTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.uvNote}</p>
          <Link href={`${prefix}/uv`} className="mt-2 inline-block text-sm font-bold text-sky-700 dark:text-sky-300 hover:underline">
            {ui.uvLink}
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <SunList cells={f.neighbours.map(x => ({ lat: x.lat, date: x.date }))} path={hub} lang={lang} by="both" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.latRowTitle}</h2>
          <SunList cells={atLat(c.lat)} path={hub} lang={lang} by="date" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.dateRowTitle}</h2>
          <SunList cells={atDate(c.date)} path={hub} lang={lang} by="lat" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/sun/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
