import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import AsciiTable from '@/components/ascii/AsciiTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ASCII_ICON, CODES, CONTROLS } from '@/lib/ascii/list';
import { KINDS, asciiFacts, codesOfKind, controlsOfGroup } from '@/lib/ascii/facts';
import { ASCII_UI } from '@/lib/ascii/ui';

/** 제어문자를 묶어 보이는 순서 */
const GROUPS = ['format', 'transmission', 'device', 'separator', 'other'] as const;

/**
 * ASCII 목록 — 코드표를 먼저 보이고, 갈래와 제어문자 묶음을 아래에 둔다.
 *
 * 표가 곧 목차다. 128자를 세로로 늘어놓으면 표의 생김새(대문자 열 옆에 소문자 열)가
 * 사라져 버린다.
 */
export default function AsciiHubPage({ lang }: { lang: Lang }) {
  const ui = ASCII_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/ascii`;
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
        data={itemListJsonLd(ui.hubTitle, path, CODES.map(c => ({ name: `${asciiFacts(c).label} (${c})`, path: `${path}/${c}` })))}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-600 to-emerald-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/ascii" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-teal-600 to-emerald-500">
            <ToolIcon emoji={ASCII_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <AsciiTable path={path} />
        </section>

        {KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{codesOfKind(kind).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.kindNote[kind]}</p>
            <div className="flex flex-wrap gap-1.5">
              {codesOfKind(kind).map(c => (
                <Link
                  key={c}
                  href={`${path}/${c}`}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span className="tabular-nums text-slate-400 dark:text-slate-500">{c}</span> {asciiFacts(c).label}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mb-8">
          <h2 className="sec-h2">
            {ui.groupTitle}
            <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{CONTROLS.length}</span>
          </h2>
          {GROUPS.map(g => (
            <div key={g} className="mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.groupLabel[g]}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 leading-relaxed">{ui.groupNote[g]}</p>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                {controlsOfGroup(g).map(x => (
                  <Link
                    key={x.code}
                    href={`${path}/${x.code}`}
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0 w-[26px] text-right">{x.code}</span>
                    <span className="text-sm font-black text-teal-700 dark:text-teal-400 font-mono shrink-0 w-[38px]">{x.abbr}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{x.name}</span>
                    <span className="ml-auto text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">{asciiFacts(x.code).ctrl}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8">
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
            <Link key={l.lang} href={`${l.prefix}/ascii`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
