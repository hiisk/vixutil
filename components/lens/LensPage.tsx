import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AngleFan from '@/components/lens/AngleFan';
import SensorBox from '@/components/lens/SensorBox';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { LENS_ICON, lensOf } from '@/lib/lens/list';
import { lensFacts, neighbourFocals, sameFieldOfView } from '@/lib/lens/facts';
import { LENS_UI } from '@/lib/lens/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 렌즈 한 장 — 부채꼴 그림 하나와 숫자 여섯 개.
 *
 * 화각을 글자로만 적으면 8mm와 24mm의 차이가 와닿지 않는다. 그림을 먼저 두고
 * 숫자를 아래에 붙인다.
 */
export default function LensPage({ slug, lang }: { slug: string; lang: Lang }) {
  const l = lensOf(slug);
  if (!l) return null;
  const f = lensFacts(l);
  const ui = LENS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/snap/lens`;
  const path = `${hub}/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const faq = ui.lensFaq(f, ui.kindLabel[f.kind]);
  const title = `${f.focal}mm · ${f.sensorName}`;

  const rows: [string, string][] = [
    [ui.diagonalLabel, ui.degUnit(f.diagonal)],
    [ui.horizontalLabel, ui.degUnit(f.horizontal)],
    [ui.verticalLabel, ui.degUnit(f.vertical)],
    [ui.cropLabel, `${f.crop}×`],
    [ui.equivLabel, `${f.equiv}mm`],
    [ui.widthLabel, ui.meterUnit(f.widthAt2m)],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: title, path },
        ])}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-violet-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{title}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/snap/lens/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-600 to-violet-500">
            <ToolIcon emoji={LENS_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{title}</h1>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{ui.kindLabel[f.kind]}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 mb-4">
          <AngleFan deg={f.diagonal} label={`${ui.diagonalLabel} ${ui.degUnit(f.diagonal)}`} className="w-full max-w-[320px] mx-auto" />
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-4">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{k}</dt>
              <dd className="text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 mb-4">
          <SensorBox sensor={l.sensor} label={f.sensorName} className="w-full max-w-[260px] mx-auto" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{ui.sensorNote[l.sensor]}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-8">
          {ui.kindNote[f.kind]}
        </p>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.sameFovTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.sameFovNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {sameFieldOfView(slug).map(o => {
              const of_ = lensFacts(o);
              return (
                <Link
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-indigo-700 dark:text-indigo-400 font-mono shrink-0 tabular-nums w-[68px]">{of_.focal}mm</span>
                  <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{of_.sensorName}</span>
                  <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 shrink-0 tabular-nums">{ui.degUnit(of_.diagonal)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbourFocals(slug).map(o => (
              <Link
                key={o.slug}
                href={`${hub}/${o.slug}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors tabular-nums"
              >
                {o.focal}mm · {ui.degUnit(lensFacts(o).diagonal)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(x => x.lang !== lang).map(x => (
            <Link key={x.lang} href={`${x.prefix}/snap/lens/${slug}`} hrefLang={x.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {x.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
