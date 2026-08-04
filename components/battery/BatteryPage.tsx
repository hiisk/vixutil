import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BatteryList from '@/components/battery/BatteryList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { KNOWN_CAPACITY, KNOWN_CHARGER, PLAIN_CABLE_AMP, cellOf } from '@/lib/battery/list';
import { atCapacity, atWatt, batteryFacts } from '@/lib/battery/facts';
import { BATTERY_UI } from '@/lib/battery/ui';

/**
 * 칸 한 장 — 시간 하나를 크게, 전압과 케이블을 그 아래에.
 */
export default function BatteryPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = batteryFacts(c);
  const ui = BATTERY_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/battery`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.minutesLabel, ui.clock(f.minutes)],
    [ui.to80Label, ui.clock(f.to80)],
    [ui.whLabel, `${f.wh} Wh`],
    [ui.stepLabel, `${f.step.volt} V · ${f.step.amp} A`],
    [ui.cableLabel, f.needsEmarker ? ui.cableChip : ui.cablePlain],
    [ui.crateLabel, `${f.crate} C`],
    [ui.flightLabel, ui.flightName(f.flight)],
    [ui.usableLabel, `${f.usable5v} mAh`],
    [ui.hourLabel, `${f.hourWatt} W`],
  ];

  const near = [f.slower, f.faster, f.smaller, f.bigger].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${c.mah}mAh · ${c.watt}W`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-green-600 to-lime-400" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{c.mah}mAh · {c.watt}W</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/battery/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-green-400 dark:border-green-700 bg-green-50 dark:bg-green-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">
            {c.mah}mAh
            {KNOWN_CAPACITY[c.mah] && <span className="ml-1 font-normal text-slate-400 dark:text-slate-500">{ui.capacityName(KNOWN_CAPACITY[c.mah])}</span>}
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{ui.clock(f.minutes)}</div>
          <div className="mt-1 text-sm font-bold text-green-700 dark:text-green-300 tabular-nums">
            {c.watt}W
            {KNOWN_CHARGER[c.watt] && <span className="ml-1 font-normal text-slate-400 dark:text-slate-500">{ui.chargerName(KNOWN_CHARGER[c.watt])}</span>}
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
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.stepsTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.stepsNote}</p>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {f.steps.map(s => (
              <li key={s.volt} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{s.volt} V</span>
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums text-right">
                  {s.amp} A
                  <span className="ml-2 text-[11px] text-slate-400 dark:text-slate-500">
                    {s.amp > PLAIN_CABLE_AMP ? ui.cableChip : ui.cablePlain}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.flightTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.flightNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.usableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.usableNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.neighbourTitle}</h2>
          <BatteryList cells={near.map(n => ({ mah: n.mah, watt: n.watt }))} path={hub} clock={ui.clock} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.wattTitle}</h2>
          <BatteryList cells={atCapacity(c.mah)} path={hub} clock={ui.clock} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.capacityTitle}</h2>
          <BatteryList cells={atWatt(c.watt)} path={hub} clock={ui.clock} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/battery/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
