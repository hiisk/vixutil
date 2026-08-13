import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import CubeTop from '@/components/cube/CubeTop';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ALGS, CUBE_ICON, STEPS, algsOfStep } from '@/lib/cube/list';
import { caseFacts, diagram } from '@/lib/cube/facts';
import { CUBE_UI } from '@/lib/cube/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 큐브 공식 목록 — 세 단계를 차례로 늘어놓는다.
 *
 * 그림 없는 공식 표는 쓸모가 없다. 목록에서도 경우 그림을 그려 두어야
 * 내 큐브와 견줘 가며 고를 수 있다.
 */
export default function CubeHubPage({ lang }: { lang: Lang }) {
  const ui = CUBE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/game/cube`;
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
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, ALGS.map(a => ({ name: a.label, path: `${path}/${a.slug}` })))} />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-500 to-rose-500" />

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
            <LangPicker current={localeOfLang(lang)} route={`/game/cube`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-amber-500 to-rose-500">
            <ToolIcon emoji={CUBE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.notationTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.notationNote}</p>
          <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {ui.notation.map(n => (
              <div key={n.token} className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900">
                <dt className="text-sm font-black text-amber-700 dark:text-amber-400 font-mono shrink-0 w-[92px]">{n.token}</dt>
                <dd className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{n.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {STEPS.map(step => (
          <section key={step} className="mb-9">
            <h2 className="sec-h2-tight">
              {ui.stepLabel[step]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{algsOfStep(step).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.stepNote[step]}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {algsOfStep(step).map(a => {
                const f = caseFacts(a);
                return (
                  <Link prefetch={false}
                    key={a.slug}
                    href={`${path}/${a.slug}`}
                    className="rounded-2xl border chip-off p-3 hover:border-amber-400 hover:shadow-md transition-all"
                  >
                    <CubeTop state={diagram(f)} slot={step === 'f2l'} label={a.label} className="w-full max-w-[104px] mx-auto" />
                    <div className="mt-2 text-center">
                      <div className="text-xs font-black text-slate-800 dark:text-slate-100">{a.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">{a.alg}</div>
                    </div>
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/game/cube`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
