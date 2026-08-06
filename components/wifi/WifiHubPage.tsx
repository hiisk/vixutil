import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import WifiBand from '@/components/wifi/WifiBand';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { BANDS, CHANNELS, WIFI_ICON, labelOf, slugOf } from '@/lib/wifi/list';
import { centerOf, cleanSet } from '@/lib/wifi/facts';
import { WIFI_UI } from '@/lib/wifi/ui';

/**
 * 채널 목록 — 겹침 이야기를 먼저 하고 대역별로 늘어놓는다.
 *
 * 이 표를 여는 사람은 채널 번호를 고르러 왔다. "왜 1·6·11인가"에 답하고 나면
 * 나머지는 목록에서 짚기만 하면 된다.
 */
export default function WifiHubPage({ lang }: { lang: Lang }) {
  const ui = WIFI_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/wifi`;
  const base = localeOfLang(lang);
  const clean2g = new Set(cleanSet('2g').map(c => c.n));

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, CHANNELS.map(c => ({ name: labelOf(c), path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 to-sky-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/wifi" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-blue-700 to-sky-500">
            <ToolIcon emoji={WIFI_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.overlapTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.overlapNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.cleanTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.cleanNote}</p>
          <div className="flex flex-wrap gap-2">
            {cleanSet('2g').map(c => (
              <Link
                key={slugOf(c)}
                href={`${path}/${slugOf(c)}`}
                className="rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 text-xs font-bold text-blue-800 dark:text-blue-300 tabular-nums hover:border-blue-500 transition-colors"
              >
                {c.n} · {centerOf(c)}MHz
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.bandTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.bandNote}</p>
          <div className="space-y-4">
            {BANDS.map(b => (
              <section key={b}>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{ui.bandName(b)}</h3>
                <WifiBand band={b} path={path} clean={b === '2g' ? clean2g : new Set()} />
              </section>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.dfsTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.dfsNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <p className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          {ui.caution}
        </p>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/wifi`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
