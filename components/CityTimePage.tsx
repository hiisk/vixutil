import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import CityClock from '@/components/time/CityClock';
import { LANGS, langInfo, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { timeCountry, type TimeCity } from '@/lib/time/cities8';
import { cityFacts, gapLabel, gapMinutes, sameZoneCities } from '@/lib/time/facts';
import { TIME_UI } from '@/lib/time/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 도시 시계 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 시계가 먼저다. 이 화면에 오는 사람은 "뉴욕 지금 몇 시"를 알고 싶어 들어오고,
 * 시간대 이름이나 서머타임 규칙은 그 뒤에 읽을 거리다.
 *
 * 시계만 브라우저가 그리고 나머지는 정적이다 — 오프셋과 시차는 시간대 규칙에서
 * 나오는 사실이라 빌드 때 계산해도 틀리지 않는다.
 */
export default function CityTimePage({ city, lang }: { city: TimeCity; lang: Lang }) {
  const ui = TIME_UI[lang];
  const f = cityFacts(city, lang);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/time`;
  const path = `${prefix}/time/${city.slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const country = timeCountry(city.country);
  const nearby = sameZoneCities(city);

  const rows: { label: string; value: string }[] = [
    { label: ui.zoneLabel, value: city.zone },
    { label: ui.standardLabel, value: `UTC ${f.standardLabel}` },
    { label: ui.summerLabel, value: `UTC ${f.summerLabel}` },
    { label: ui.dstLabel, value: f.dst ? `${ui.dstYes} (${ui.minuteLabel(f.dstShift)})` : ui.dstNo },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/time` },
          { name: f.city, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(f.city, ui.metaDesc(f), path)} />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-indigo-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/time`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/time/${city.slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-sky-400 to-indigo-500">
            <ToolIcon emoji="🕰️" accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{f.city}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
            {country?.flag} {f.country} · UTC {f.standardLabel}
          </p>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">{ui.nowLabel}</p>
          <CityClock zone={city.zone} locale={langInfo(lang).htmlLang} />
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-3/5 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.gapTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.gapNote}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {f.gaps.map(g => (
              <div key={g.city} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-center">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">{g.city}</p>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums mt-0.5">{g.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cityFaq(f)} lang={base} title={ui.faqTitle} />

        {nearby.length > 0 && (
          <section className="mt-8" aria-label={ui.sameZoneTitle}>
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.sameZoneTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {nearby.map(n => (
                <Link
                  key={n.slug}
                  href={`${prefix}/time/${n.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                    {timeCountry(n.country)?.flag} {n.name[lang]}
                  </span>
                  <span className="text-xs font-black text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                    {gapLabel(gapMinutes(n, city))}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/time/${city.slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
