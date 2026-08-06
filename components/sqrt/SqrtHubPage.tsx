import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import SqrtStrip from '@/components/sqrt/SqrtStrip';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { NUMBERS, SQRT_ICON } from '@/lib/sqrt/list';
import { perfectSquares, simplifiable, sqrtFacts } from '@/lib/sqrt/facts';
import { SQRT_UI } from '@/lib/sqrt/ui';

/**
 * 제곱근 목록 — 200개를 늘어놓기 전에 두 무리를 먼저 보인다.
 *
 * 사람이 이 표에 오는 까닭은 대개 둘 중 하나다. 딱 떨어지는지 알고 싶거나,
 * 근호를 간단히 한 꼴을 알고 싶거나. 그래서 완전제곱수 열넷과 간단해지는 수를
 * 위로 올리고, 전체 목록은 그 아래에 눈금처럼 깐다.
 */
export default function SqrtHubPage({ lang }: { lang: Lang }) {
  const ui = SQRT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/sqrt`;
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
        data={itemListJsonLd(ui.hubTitle, path, NUMBERS.map(n => ({ name: `√${n}`, path: `${path}/${n}` })))}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-violet-500" />

      <header className="page-head">
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
            <LangPicker current={localeOfLang(lang)} route="/sqrt" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-600 to-violet-500">
            <ToolIcon emoji={SQRT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.squaresTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.squaresNote}</p>
          <div className="flex flex-wrap gap-2">
            {perfectSquares().map(n => (
              <Link
                key={n}
                href={`${path}/${n}`}
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 tabular-nums hover:border-indigo-500 transition-colors"
              >
                √{n} = {sqrtFacts(n).exact}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.simplifiableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.simplifiableNote}</p>
          <div className="flex flex-wrap gap-1.5">
            {simplifiable().map(n => (
              <Link
                key={n}
                href={`${path}/${n}`}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                √{n} = {sqrtFacts(n).radical}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.simplifyTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.simplifyNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.allTitle}</h2>
          <SqrtStrip path={path} />
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
            <Link key={l.lang} href={`${l.prefix}/sqrt`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
