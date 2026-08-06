import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import StopTable from '@/components/stop/StopTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { speedOf } from '@/lib/stop/list';
import { neighbours, stopFacts } from '@/lib/stop/facts';
import { STOP_UI } from '@/lib/stop/ui';

/**
 * 속도 한 장 — 공주거리와 제동거리를 갈라 보인다.
 *
 * 총 정지거리만 적으면 "브레이크를 밟기 전에도 간다"는 사실이 사라진다. 그
 * 부분이 이 표에서 사람들이 놓치는 자리다.
 */
export default function StopPage({ slug, lang }: { slug: string; lang: Lang }) {
  const kmh = speedOf(slug);
  if (kmh === undefined) return null;
  const f = stopFacts(kmh);
  const ui = STOP_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/stop`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const head: [string, string, string] = [ui.speedLabel, ui.surfaceName('dry'), ui.surfaceName('wet')];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${kmh} km/h`, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-red-700 to-orange-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{kmh} km/h</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/stop/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-red-400 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300 tabular-nums">{kmh} km/h</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.dryTotal}<span className="text-2xl"> m</span></div>
          <div className="mt-1 text-sm font-bold text-red-800 dark:text-red-300">{ui.surfaceName('dry')}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-2">
          {[
            [ui.reactionLabel, `${f.reaction} m`],
            [ui.msLabel, `${f.ms} m/s`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{k}</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 tabular-nums">{v}</div>
            </div>
          ))}
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.surfaceTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.surfaceNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.surfaces.map(s => (
              <div key={s.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
                <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{ui.surfaceName(s.key)}</span>
                <span className="text-right">
                  <span className="text-base font-black text-slate-800 dark:text-slate-100 tabular-nums">{s.total} m</span>
                  <span className="ml-2 text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                    {ui.brakingLabel} {s.braking} m · {ui.carsLabel} {s.cars}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.squareTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.squareNote}</p>
          {f.halfBraking !== null && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
              {Math.round(kmh / 2)} km/h → {f.halfBraking} m · {kmh} km/h → {f.surfaces[0].braking} m
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.reactionTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.reactionNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <StopTable path={hub} speeds={[...neighbours(kmh), kmh].sort((a, b) => a - b)} current={kmh} head={head} />
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

        <Faq items={ui.stopFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/stop/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
