import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { KEYS, KEYCODE_ICON, slugOf } from '@/lib/keycode/list';
import { GROUPS, keyFacts, keysOfGroup } from '@/lib/keycode/facts';
import { KEYCODE_UI } from '@/lib/keycode/ui';

/**
 * 키 목록 — 갈래로 묶는다.
 *
 * 자판 그림으로 늘어놓는 방법도 있지만, 그러면 자판마다 다른 배열을 하나 골라야
 * 하고 F13이나 IntlYen처럼 그림에 없는 키가 갈 곳을 잃는다.
 */
export default function KeycodeHubPage({ lang }: { lang: Lang }) {
  const ui = KEYCODE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/keycode`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, KEYS.map(x => ({ name: x.code, path: `${path}/${slugOf(x)}` })))}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-slate-600 to-zinc-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/keycode" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-slate-600 to-zinc-500">
            <ToolIcon emoji={KEYCODE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-9 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-4 py-3">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-1">{ui.layoutTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.layoutNote}</p>
          <p className="note-xs mt-2">{ui.deprecatedNote}</p>
        </section>

        {GROUPS.map(g => (
          <section key={g} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.groupLabel[g]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{keysOfGroup(g).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.groupNote[g]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {keysOfGroup(g).map(x => {
                const f = keyFacts(x);
                return (
                  <Link prefetch={false}
                    key={x.code}
                    href={`${path}/${slugOf(x)}`}
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200 shrink-0 w-[124px] truncate">{x.code}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 truncate">{f.printable ? `"${f.label}"` : f.label}</span>
                    <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{x.keyCode}</span>
                  </Link>
                );
              })}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/keycode`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
