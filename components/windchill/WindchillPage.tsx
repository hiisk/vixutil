import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import WindchillGrid from '@/components/windchill/WindchillGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf, slugOf } from '@/lib/windchill/list';
import { windchillFacts } from '@/lib/windchill/facts';
import { WINDCHILL_UI } from '@/lib/windchill/ui';

/**
 * 체감온도 한 칸 — 체감과 기온의 차이를 함께 둔다.
 *
 * 체감만 크게 적으면 "오늘 영하 20도"로 기억된다. 기온이 얼마이고 몇 도 낮게
 * 느껴지는지를 나란히 두어야 그 값이 무엇인지가 남는다.
 */
export default function WindchillPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = windchillFacts(c);
  const ui = WINDCHILL_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/windchill`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.tempLabel, `${c.t} °C`],
    [ui.windLabel, ui.windName(c.v)],
    [ui.dropLabel, `${f.drop} °C`],
    [ui.calmLabel, `${f.calm} °C`],
    [ui.fahrenheitLabel, `${f.fahrenheit} °F`],
    [ui.frostbiteLabel, f.frostbite !== null ? ui.minuteUnit(f.frostbite) : ui.safeTag],
  ];

  const near = [f.calmer, f.windier, f.colder, f.warmer].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.tempName(c.t)} · ${ui.windName(c.v)}`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-700 to-cyan-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
            {c.t}°C · {c.v}km/h
          </span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/windchill/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-sky-400 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.feltLabel}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.felt}<span className="text-2xl"> °C</span></div>
          <div className="mt-1 text-sm font-bold text-sky-800 dark:text-sky-300 tabular-nums">
            {ui.tempLabel} {c.t} °C · {ui.windName(c.v)}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.notRealTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.notRealNote}</p>
        </section>

        {f.frostbite !== null && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.frostbiteTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.frostbiteNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {near.map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
              >
                {o.t}°C · {o.v}km/h → {windchillFacts(o).felt}°
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.tableTitle}</h2>
          <WindchillGrid path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.windTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.windNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <p className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          {ui.caution}
        </p>

        <Faq items={ui.windchillFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/windchill/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
