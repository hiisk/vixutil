import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BatteryList from '@/components/battery/BatteryList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { BATTERY_ICON, CAPACITIES, CHARGERS, KNOWN_CAPACITY, KNOWN_CHARGER } from '@/lib/battery/list';
import { atCapacity, batteryFacts, stepOf } from '@/lib/battery/facts';
import { BATTERY_UI } from '@/lib/battery/ui';

/**
 * 충전 목록 — 배터리 용량으로 먼저 가른다.
 *
 * 손에 있는 것은 대개 배터리 하나이고, 바꿔 끼우는 것이 충전기다.
 */
export default function BatteryHubPage({ lang }: { lang: Lang }) {
  const ui = BATTERY_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/battery`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.mahTitle, ui.mahNote],
    [ui.voltTitle, ui.voltNote],
    [ui.cableTitle, ui.cableNote],
    [ui.flightTitle, ui.flightNote],
    [ui.usableTitle, ui.usableNote],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      {/* 낱장이 없어져 ItemList는 뺐다 — 아래 목록이 그 목록이다 */}

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-green-600 to-lime-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/battery" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-green-600 to-lime-400">
            <ToolIcon emoji={BATTERY_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
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

        <section className="mb-8 mt-8">
          <h2 className="sec-h2-tight">{ui.wattLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.stepsNote}</p>
          <ul className="list-card">
            {CHARGERS.map(watt => {
              const s = stepOf(watt);
              return (
                <li key={watt} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">{watt}W</span>
                    {KNOWN_CHARGER[watt] && <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">{ui.chargerName(KNOWN_CHARGER[watt])}</span>}
                  </span>
                  <span className="cell-num text-right">
                    {s.volt}V · {s.amp}A
                    <span className="ml-2 text-[11px] font-normal text-slate-400 dark:text-slate-500">
                      {s.amp > 3 ? ui.cableChip : ui.cablePlain}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.hubLead}</p>
        </section>

        {CAPACITIES.map(mah => (
          <section key={mah} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {mah}mAh
              {KNOWN_CAPACITY[mah] && <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">{ui.capacityName(KNOWN_CAPACITY[mah])}</span>}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">{batteryFacts({ mah, watt: 20 }).wh}Wh</span>
            </h3>
            <BatteryList cells={atCapacity(mah)} clock={ui.clock} />
          </section>
        ))}

        <section className="mb-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/battery`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
