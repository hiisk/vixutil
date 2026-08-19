import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AsciiTable from '@/components/ascii/AsciiTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ASCII_ICON, CONTROLS } from '@/lib/ascii/list';
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
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

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
            <LangPicker current={localeOfLang(lang)} route="/ascii" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={ASCII_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <AsciiTable />
        </section>

        {KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{codesOfKind(kind).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.kindNote[kind]}</p>
            <div className="flex flex-wrap gap-1.5">
              {codesOfKind(kind).map(c => (
                <span
                  key={c}
                 
                  className="rounded-lg border chip-off px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  <span className="tabular-nums text-slate-400 dark:text-slate-500">{c}</span> {asciiFacts(c).label}
                </span>
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
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                {controlsOfGroup(g).map(x => (
                  <span
                    key={x.code}
                   
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0 w-[26px] text-right">{x.code}</span>
                    <span className="text-sm font-black text-teal-700 dark:text-teal-400 font-mono shrink-0 w-[38px]">{x.abbr}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{x.name}</span>
                    <span className="ml-auto text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">{asciiFacts(x.code).ctrl}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/ascii`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
