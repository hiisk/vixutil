import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BrailleCell from '@/components/code/BrailleCell';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CODE_ICON } from '@/lib/code/list';
import { KINDS, cellFacts, cellsOfRaised, charFacts, charsOfKind } from '@/lib/code/facts';
import { CODE_UI } from '@/lib/code/ui';

/**
 * 부호 목록 — 글자를 갈래별로, 셀을 점 개수별로.
 *
 * 셀 예순넷을 번호순으로 늘어놓으면 아무 규칙도 안 보인다. 켜진 점 개수로
 * 묶으면 1·6·15·20·15·6·1이라는 조합의 모양이 그대로 드러난다.
 */
export default function CodeHubPage({ lang }: { lang: Lang }) {
  const ui = CODE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/code`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 to-purple-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/code" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-violet-600 to-purple-500">
            <ToolIcon emoji={CODE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-8">
          {ui.morseNote}
        </p>

        {KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{charsOfKind(kind).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.kindNote[kind]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {charsOfKind(kind).map(x => {
                const f = charFacts(x);
                return (
                  <span
                    key={x.name}
                   
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100 shrink-0 w-[20px]">{x.char}</span>
                    <span className="text-sm font-bold tracking-[0.2em] text-violet-700 dark:text-violet-400 shrink-0 w-[84px]">{x.morse}</span>
                    <span className="cell-cut">{x.nato ?? ''}</span>
                    <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 shrink-0">{f.braille ?? ''}</span>
                  </span>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.cellsTitle}</h2>
          <p className="note-xs">{ui.cellsNote}</p>
        </section>

        {[0, 1, 2, 3, 4, 5, 6].map(n => (
          <section key={n} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.raisedGroup(n)}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{cellsOfRaised(n).length}</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cellsOfRaised(n).map(m => (
                <span
                  key={m}
                 
                  className="flex items-center gap-2 rounded-lg border chip-off px-2 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <BrailleCell mask={m} size="sm" />
                  {cellFacts(m).dots || '0'}
                </span>
              ))}
            </div>
          </section>
        ))}

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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/code`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
