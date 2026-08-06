import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import BandwidthList from '@/components/bandwidth/BandwidthList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { BANDWIDTH_ICON, CELLS, LANDMARK, PLAN, SIZES, sizeLabel, slugOf } from '@/lib/bandwidth/list';
import { atSize, bandwidthFacts } from '@/lib/bandwidth/facts';
import { BANDWIDTH_UI } from '@/lib/bandwidth/ui';

/**
 * 다운로드 목록 — 파일 크기로 먼저 가른다.
 *
 * 회선 속도는 대개 하나로 고정돼 있고 바뀌는 것은 파일이다. 그래서 크기를
 * 위로 두고 그 안에서 속도를 늘어놓는다.
 */
export default function BandwidthHubPage({ lang }: { lang: Lang }) {
  const ui = BANDWIDTH_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/bandwidth`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.unitTitle, ui.unitNote],
    [ui.overheadTitle, ui.overheadNote],
    [ui.gibTitle, ui.gibNote],
    [ui.sameTitle, ui.sameNote],
    [ui.bottleTitle, ui.bottleNote],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: `${sizeLabel(c.mb)} · ${c.mbps}Mbps`, path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-600 to-indigo-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/bandwidth" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-sky-600 to-indigo-500">
            <ToolIcon emoji={BANDWIDTH_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-4 mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.streamNote}</p>
        </section>

        {SIZES.map(mb => (
          <section key={mb} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {sizeLabel(mb)}
              {LANDMARK[mb] && <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">{ui.landmarkName(LANDMARK[mb])}</span>}
            </h3>
            <BandwidthList cells={atSize(mb)} path={path} time={ui.time} />
          </section>
        ))}

        <section className="mt-8 mb-8">
          <h2 className="sec-h2">{ui.speedLabel}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {Object.entries(PLAN).map(([mbps, key]) => {
              const f = bandwidthFacts({ mb: 1000, mbps: Number(mbps) });
              return (
                <li key={mbps} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{ui.planName(key)}</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right">
                    {mbps}Mbps · {f.perSecond}MB/s
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/bandwidth`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
