import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import SensorBox from '@/components/lens/SensorBox';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { LENSES, LENS_ICON, SENSORS, lensesOfSensor } from '@/lib/lens/list';
import { lensFacts } from '@/lib/lens/facts';
import { LENS_UI } from '@/lib/lens/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 렌즈 화각 목록 — 센서 넷, 초점거리 스물다섯.
 *
 * 표를 센서별로 끊어야 읽힌다. 같은 50mm가 판마다 다른 화각을 낸다는 것이
 * 이 화면이 말하려는 전부다.
 */
export default function LensHubPage({ lang }: { lang: Lang }) {
  const ui = LENS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/snap/lens`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
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
        data={itemListJsonLd(
          ui.hubTitle,
          path,
          LENSES.map(l => ({ name: `${l.focal}mm ${lensFacts(l).sensorName}`, path: `${path}/${l.slug}` })),
        )}
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
            <LangPicker current={localeOfLang(lang)} route={`/snap/lens`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-600 to-violet-500">
            <ToolIcon emoji={LENS_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        {SENSORS.map(s => (
          <section key={s.key} className="mb-9">
            <h2 className="sec-h2-tight">{s.name}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.sensorNote[s.key]}</p>

            <SensorBox sensor={s.key} label={`${s.name} ${s.w}×${s.h}mm`} className="w-full max-w-[260px] mx-auto mb-3" />

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {lensesOfSensor(s.key).map(l => {
                const f = lensFacts(l);
                return (
                  <Link
                    key={l.slug}
                    href={`${path}/${l.slug}`}
                    className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm font-black text-indigo-700 dark:text-indigo-400 font-mono shrink-0 tabular-nums w-[68px]">{f.focal}mm</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums shrink-0 w-[64px]">{ui.degUnit(f.diagonal)}</span>
                    {/* 풀프레임은 환산값이 초점거리와 같아 줄마다 같은 말이 된다 — 그 자리에 담기는 폭을 둔다 */}
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {ui.kindLabel[f.kind]} ·{' '}
                      {f.equiv === f.focal ? `${ui.widthLabel} ${ui.meterUnit(f.widthAt2m)}` : `${ui.equivLabel} ${f.equiv}mm`}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="sec-h2">{ui.kindTitle}</h2>
          <ul className="list-card">
            {(['ultrawide', 'wide', 'standard', 'tele', 'supertele'] as const).map(k => (
              <li key={k} className="px-4 py-3">
                <div className="text-sm font-black text-slate-800 dark:text-slate-100 mb-0.5">{ui.kindLabel[k]}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.kindNote[k]}</p>
              </li>
            ))}
          </ul>
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
            <Link key={l.lang} href={`${l.prefix}/snap/lens`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
