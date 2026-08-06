import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AltitudeTable from '@/components/altitude/AltitudeTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { PLACES, altitudeOf } from '@/lib/altitude/list';
import { altitudeFacts, neighbours } from '@/lib/altitude/facts';
import { ALTITUDE_UI } from '@/lib/altitude/ui';

/**
 * 고도 한 장 — 끓는점을 큰 글씨로 둔다.
 *
 * 기압 hPa는 크기가 잘 안 잡히는 수다. 같은 높이를 "물이 몇 도에 끓는가"로
 * 말하면 그 자리에서 무엇이 달라지는지가 곧장 보인다.
 */
export default function AltitudePage({ slug, lang }: { slug: string; lang: Lang }) {
  const m = altitudeOf(slug);
  if (m === undefined) return null;
  const f = altitudeFacts(m);
  const ui = ALTITUDE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/altitude`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const head: [string, string, string] = [ui.heightLabel, ui.pressureLabel, ui.boilLabel];
  const here = PLACES.find(p => p.m === m);

  const rows: [string, string][] = [
    [ui.pressureLabel, `${f.hpa} hPa (${f.pressurePercent}%)`],
    [ui.feetLabel, `${f.ft} ft`],
    [ui.tempLabel, `${f.tempC} °C`],
    [ui.oxygenLabel, `${f.o2hpa} hPa (${f.o2Percent}%)`],
    [ui.cookLabel, `×${f.cookFactor}`],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${m} m`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-700 to-sky-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{m} m</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/altitude/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-cyan-400 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300 tabular-nums">{m} m{here ? ` · ${ui.placeName(here.key)}` : ''}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.boilC}<span className="text-2xl"> °C</span></div>
          <div className="mt-1 text-sm font-bold text-cyan-800 dark:text-cyan-300">{ui.boilLabel}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
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
          <h2 className="sec-h2-tight">{ui.boilTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.boilNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.oxygenTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.oxygenNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <AltitudeTable path={hub} altitudes={[...neighbours(m), m].sort((a, b) => a - b)} current={m} head={head} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.placeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.placeNote}</p>
          <div className="flex flex-wrap gap-2">
            {PLACES.map(p => (
              <Link
                key={p.key}
                href={`${hub}/${p.m}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
              >
                {ui.placeName(p.key)} · {p.m}m
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

        <Faq items={ui.altitudeFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/altitude/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
