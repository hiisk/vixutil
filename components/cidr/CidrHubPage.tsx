import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CIDR_ICON, slugOf } from '@/lib/cidr/list';
import { FAMILIES, blocksOf, cidrFacts, prefixesOf } from '@/lib/cidr/facts';
import { CIDR_UI } from '@/lib/cidr/ui';

/**
 * 프리픽스 목록 — 표 그대로다.
 *
 * 이 섹션은 목록 자체가 곧 서브넷 표라, 갈래를 나누기보다 IPv4 서른셋과
 * IPv6 백스물아홉을 그대로 늘어놓는 편이 찾기 쉽다.
 */
export default function CidrHubPage({ lang }: { lang: Lang }) {
  const ui = CIDR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/cidr`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="sky" />
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
            <LangPicker current={localeOfLang(lang)} route="/cidr" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={CIDR_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {FAMILIES.map(family => (
          <section key={family} className="mb-9">
            <h2 className="sec-h2-tight">
              {ui.familyLabel[family]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">{prefixesOf(family).length}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.familyNote[family]}</p>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {prefixesOf(family).map(p => {
                const f = cidrFacts(p);
                const blocks = blocksOf(p);
                return (
                  <span
                    key={slugOf(p)}
                   
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400 tabular-nums shrink-0 w-[44px] text-right">/{p.bits}</span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300 shrink-0 w-[124px] truncate">{f.mask ?? ''}</span>
                    <span className="cell-cut">{blocks.join(' · ')}</span>
                    <span className="ml-auto text-[11px] text-slate-500 dark:text-slate-400 tabular-nums shrink-0">{ui.count(f.usable, f.hostBits)}</span>
                  </span>
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/cidr`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
