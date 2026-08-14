import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DewGrid from '@/components/dew/DewGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { DEW_ICON } from '@/lib/dew/list';
import { dewOf } from '@/lib/dew/facts';
import { DEW_UI } from '@/lib/dew/ui';

/**
 * 이슬점 목록 — 격자를 먼저 보인다.
 *
 * 189칸을 목록으로 늘어놓으면 아무것도 보이지 않는다. 표로 세우면 같은 습도라도
 * 기온이 오를수록 눅눅해지는 모양이 드러나고, 그것이 이 표의 요점이다.
 */
export default function DewHubPage({ lang }: { lang: Lang }) {
  const ui = DEW_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/dew`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      {/* 낱장이 없어져 ItemList는 뺐다 — 표가 그 목록이다 */}

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-700 to-sky-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/dew" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-cyan-700 to-sky-500">
            <ToolIcon emoji={DEW_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.comfortNote}</p>
          <DewGrid />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.whyTitle}</h2>
          <p className="note-xs">{ui.whyNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.capacityTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.capacityNote}</p>
          <div className="flex flex-wrap gap-2">
            {/* 낱장으로 가던 칩 — 링크만 걷어내고 값은 그대로 둔다 */}
            {[10, 20, 30, 40].map(t => (
              <span
                key={t}
                className="rounded-xl border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300 tabular-nums"
              >
                {t}°C · 60% → {dewOf(t, 60)}°
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.comfortTitle}</h2>
          <p className="note-xs">{ui.comfortNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.fogTitle}</h2>
          <p className="note-xs">{ui.fogNote}</p>
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/dew`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
