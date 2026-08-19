import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { SCREENS, SCREEN_KINDS, screensOfKind } from '@/lib/device/screens';
import { screenFacts } from '@/lib/device/facts';
import { DEVICE_UI } from '@/lib/device/ui';
import { SCREEN_ICON } from '@/lib/device/route';
import LangPicker from '@/components/LangPicker';

/**
 * 화면 규격 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 108가지를 한 줄로 늘어놓으면 못 찾는다. 갈래로 나누고, 줄마다 해상도와
 * 인치·밀도를 함께 적어 목록에서 이미 견줄 수 있게 한다.
 */
export default function ScreenHubPage({ lang }: { lang: Lang }) {
  const ui = DEVICE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/device/screen`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
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
        data={itemListJsonLd(
          ui.hubTitle,
          path,
          SCREENS.map(s => ({ name: s.name, path: `${path}/${s.slug}` })),
        )}
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
            <LangPicker current={localeOfLang(lang)} route={`/device/screen`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={SCREEN_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {SCREEN_KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="sec-h2">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">{screensOfKind(kind).length}</span>
            </h2>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {screensOfKind(kind).map(s => {
                const f = screenFacts(s);
                return (
                  <Link prefetch={false}
                    key={s.slug}
                    href={`${path}/${s.slug}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="min-w-0">
                      <span className="hub-card-title truncate">{s.name}</span>
                      <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                        {s.w}×{s.h} · {f.ratioLabel} · {f.className}
                      </span>
                    </span>
                    <span className="text-right shrink-0">
                      <span className="block text-sm font-black text-slate-700 dark:text-slate-200 tabular-nums">{f.ppi} ppi</span>
                      <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{ui.inchUnit(s.inch)}</span>
                    </span>
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/device/screen`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
