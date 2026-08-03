import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { PORTS, PORT_ICON } from '@/lib/port/list';
import { GROUPS, RANGES, portFacts, portsOfGroup, portsOfRange } from '@/lib/port/facts';
import { PORT_UI } from '@/lib/port/ui';

/**
 * 포트 목록 — 구간별 개수를 먼저 보이고, 갈래별로 늘어놓는다.
 *
 * 127개를 번호순으로만 늘어놓으면 22와 3306 사이에 아무 관계가 없어 보인다.
 * 갈래로 묶으면 "원격 접속은 이 넷"처럼 읽힌다.
 */
export default function PortHubPage({ lang }: { lang: Lang }) {
  const ui = PORT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/port`;
  const base = localeOfLang(lang);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, PORTS.map(x => ({ name: `${x.port} ${x.name}`, path: `${path}/${x.port}` })))}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-600 to-purple-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/port" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-fuchsia-600 to-purple-500">
            <ToolIcon emoji={PORT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.rangeTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {RANGES.map(r => (
              <div key={r} className="px-4 py-3 bg-white dark:bg-slate-900">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {ui.rangeLabel[r]}
                  <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{portsOfRange(r).length}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{ui.rangeNote[r]}</p>
              </div>
            ))}
          </div>
        </section>

        {GROUPS.map(g => (
          <section key={g} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
              {ui.groupLabel[g]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{portsOfGroup(g).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.groupNote[g]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {portsOfGroup(g).map(x => {
                const f = portFacts(x);
                return (
                  <Link
                    key={x.port}
                    href={`${path}/${x.port}`}
                    className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm font-black text-fuchsia-700 dark:text-fuchsia-400 tabular-nums shrink-0 w-[46px] text-right">{x.port}</span>
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-200 shrink-0">{x.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{x.service}</span>
                    <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 shrink-0">{ui.protoLabel[f.proto]}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/port`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
