import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CHMOD_ICON, COMMON, DIGITS } from '@/lib/chmod/list';
import { chmodFacts, modesOfOwner } from '@/lib/chmod/facts';
import { CHMOD_UI } from '@/lib/chmod/ui';

/**
 * 권한 목록 — 자주 쓰는 열 가지를 앞에 세우고, 그 뒤에 125가지를 소유자 자리로 묶는다.
 *
 * 찾아오는 사람의 십중팔구는 755나 644다. 그것을 125개 목록 한가운데 묻어 두면
 * 사전이 아니라 표 덩어리가 된다.
 */
export default function ChmodHubPage({ lang }: { lang: Lang }) {
  const ui = CHMOD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/chmod`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="amber" />
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
            <LangPicker current={localeOfLang(lang)} route="/chmod" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={CHMOD_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.commonTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.commonNote}</p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {COMMON.map(m => {
              const f = chmodFacts(m);
              return (
                <span
                  key={m}
                 
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <span className="text-sm font-bold text-orange-700 dark:text-orange-400 tabular-nums shrink-0 w-[34px]">{m}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 w-[76px]">{f.symbolic}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{ui.commonUse[m]}</span>
                </span>
              );
            })}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.allTitle}</h2>
          <p className="note-xs">{ui.allNote}</p>
        </section>

        {DIGITS.map(d => (
          <section key={d} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.ownerGroupLabel(d)}
              <span className="ml-1.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">{chmodFacts(`${d}00`).perm.user.rwx}</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {modesOfOwner(d).map(m => (
                <span
                  key={m}
                 
                  className="rounded-lg border chip-off px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  {m}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/chmod`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
