import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { METRO_LANGS, metroPrefix, type MetroLang } from '@/lib/metro/lang';
import { METRO_UI } from '@/lib/metro/ui';
import { cityName, countryName, lineName } from '@/lib/metro/types';
import { CAPITAL_CITIES, SECOND_CITIES, METRO_LINES, linesOfCity, totalStations } from '@/lib/metro-lines';
import LangPicker from '@/components/LangPicker';
import { LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';

/**
 * 지하철 게임 허브 — 도시별로 노선을 모아 보여준다.
 *
 * 수도와 그렇지 않은 도시를 갈라 놓는다. 부산·오사카·바르셀로나 노선이 서울·도쿄·
 * 마드리드 사이에 섞여 있으면 그 도시 사람이 자기 노선을 못 찾고, 갈라 두면
 * "수도 말고도 있다"는 것이 목록 자체로 보인다.
 */
export default function MetroHub({ lang }: { lang: MetroLang }) {
  const ui = METRO_UI[lang];
  const prefix = metroPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/metro`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);

  const faq = ui.hubFaq;

  const cityBlock = (city: string) => {
    const lines = linesOfCity(city);
    return (
      <section key={city} className="mb-8">
        {/*
          도시 머리에는 아이콘을 안 붙인다. 국기 이모지는 모두 같은 깃발
          도형으로 그려지므로 스무 줄이 똑같은 그림이 되어 알려 주는 것이 없다.
          국기는 공유 카드에서만 쓴다.
        */}
        <h2 className="flex items-baseline gap-2 sec-h2">
          {cityName(city, lang)}
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{lines.length}</span>
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500">{countryName(city, lang)}</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {lines.map(l => (
            <Link
              key={l.slug}
              href={`${prefix}/metro/${l.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:shadow-sm hover:border-slate-400 transition-all"
            >
              <span className="w-2.5 h-9 rounded-full shrink-0" style={{ background: l.color }} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  {lineName(l, lang)}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {ui.stationCount(l.stations.length)}{l.loop ? ` · ${ui.loopNote}` : ''}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: `${prefix}/metro` }])} />
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-slate-500 to-slate-700" />

      <header className="page-head">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 font-medium shrink-0">
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/metro" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{ui.hubLead}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 tabular-nums">
            {ui.linesIn(METRO_LINES.length)} · {ui.stationCount(totalStations())}
          </p>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">
          {ui.capitalGroup}
        </h2>
        {CAPITAL_CITIES.map(cityBlock)}

        {SECOND_CITIES.length > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="block pt-5">{ui.secondGroup}</span>
            </h2>
            {SECOND_CITIES.map(cityBlock)}
          </>
        )}

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {METRO_LANGS.filter(l => l.lang !== lang).map(l => (
            <Link
              key={l.lang}
              href={`${l.prefix}/metro`}
              hrefLang={l.hreflang}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
