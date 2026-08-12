import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import HardnessList from '@/components/hardness/HardnessList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { BAND_EDGES, HARDNESS_ICON, CELLS, UNITS, slugOf, unitOf } from '@/lib/hardness/list';
import { ANCHORS, BAND_COUNT, WRMG_EDGES, atBand } from '@/lib/hardness/facts';
import { HARDNESS_UI, fmtNum } from '@/lib/hardness/ui';

export default function HardnessHubPage({ lang }: { lang: Lang }) {
  const ui = HARDNESS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/hardness`;
  const base = localeOfLang(lang);
  const n = (x: number) => fmtNum(lang, x);
  const notes: [string, string][] = [
    [ui.baseTitle, ui.baseNote],
    [ui.factorTitle, ui.factorNote],
    [ui.bandTitle, ui.bandNote],
    [ui.useTitle, ui.useNote],
  ];
  /* 등급 넷의 ppm 구간 — 경계 목록에서 만든다. 마지막은 위가 열려 있다 */
  const range = (band: number): string => {
    const from = band === 0 ? 0 : BAND_EDGES[band - 1];
    const to = BAND_EDGES[band];
    return to === undefined ? `${from}+ ppm` : `${from}–${to} ppm`;
  };
  /* 되짚기 색인은 단위별로 한 줄이다 — ppm은 축 자신이라 없다 */
  const anchorRows = UNITS.filter(u => u.key !== 'ppm').map(u => ({
    unit: u,
    items: ANCHORS.filter(a => a.key === u.key),
  }));

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(ppm => ({ name: `${ppm} ppm`, path: `${path}/${slugOf(ppm)}` })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-700 to-cyan-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/hardness" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-sky-700 to-cyan-400">
            <ToolIcon emoji={HARDNESS_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {/* 단위 여섯을 이름과 기호로 먼저 보인다 — 아래 표의 열이 무엇인지가 여기서 정해진다 */}
        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {UNITS.map(u => (
            <div key={u.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.unitNames[u.key]}</dt>
              <dd className="cell-num text-right shrink-0">{u.symbol}</dd>
            </div>
          ))}
        </dl>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        {/* 두 기준의 경계를 숫자로 나란히 — "기준마다 다르다"를 말로만 두지 않는다 */}
        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
            <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.bandLabel}</dt>
            <dd className="cell-num text-right shrink-0 tabular-nums">{BAND_EDGES.join(' · ')} ppm</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
            <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.wrmgLabel}</dt>
            <dd className="cell-num text-right shrink-0 tabular-nums">
              {WRMG_EDGES.map(e => `${n(e.ppm)} ppm (${n(e.dh)} °dH)`).join(' · ')}
            </dd>
          </div>
        </dl>

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.ppmLabel}</p>
        </section>

        {Array.from({ length: BAND_COUNT }, (_, band) => (
          <section key={band} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.bandNames[band]}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                {range(band)}
              </span>
            </h3>
            <HardnessList ppms={atBand(band)} path={path} lang={lang} />
          </section>
        ))}

        <section className="mb-8 mt-8">
          <h2 className="sec-h2">{ui.anchorTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.anchorNote}</p>
          {anchorRows.map(({ unit, items }) => (
            <div key={unit.key} className="mb-3">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{ui.unitNames[unit.key]}</div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(a => (
                  <Link
                    key={`${a.key}-${a.value}`}
                    href={`${path}/${a.slug}`}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs tabular-nums hover:border-sky-400"
                  >
                    {n(a.value)} {unitOf(a.key)?.symbol} → {a.ppm} ppm
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

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
            <Link key={l.lang} href={`${l.prefix}/hardness`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
