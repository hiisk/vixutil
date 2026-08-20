import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Ad from '@/components/Ad';
import PageGlow from '@/components/PageGlow';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { langPrefix, localeOfLang, LOCALE_PATHS, type Lang } from '@/lib/i18n/lang';
import { COUNTRIES, holidaySlug, yearsAround, type Country } from '@/lib/holidays/countries';
import { holidaysOf } from '@/lib/holidays/engine';
import { nameOf } from '@/lib/holidays/names';
import { intlTag, uiOf } from '@/lib/holidays/ui-l10n';
import { HOLIDAY_ICON } from '@/lib/holidays/countries';
import NextHoliday from './NextHoliday';
import { HOME_WORD } from './words';

/**
 * 한 나라 한 해의 공휴일.
 *
 * ── 무엇을 더 얹는가 ───────────────────────────────────────
 * 날짜만 늘어놓으면 어느 달력 사이트와도 다르지 않다. 이미 있는 계산으로
 * 붙일 수 있는 것을 함께 낸다 — 요일, 주말과 겹쳐 옮겨진 날, 붙여 쉴 수 있는
 * 연휴, 그리고 그 나라의 대체 규칙이 무엇인지. 전부 규칙에서 나오므로
 * 일곱 나라 × 일곱 해가 저절로 서로 다르다.
 *
 * ── 오늘이 걸린 것은 손님 쪽에서 ────────────────────────────
 * 이 장은 한 번 구워서 캐시에 둔다(revalidate=false). 「다음 공휴일까지
 * 며칠」을 서버에서 세면 구운 날이 굳어 버리므로 붙은 뒤에 센다.
 */

/** 주말에 붙어 사흘 이상 이어지는가 — 금·월에 걸리면 연휴가 된다 */
function isLongWeekend(observed: string): boolean {
  const wd = new Date(`${observed}T00:00:00Z`).getUTCDay();
  return wd === 1 || wd === 5;
}

const WEEKEND = (iso: string) => {
  const wd = new Date(`${iso}T00:00:00Z`).getUTCDay();
  return wd === 0 || wd === 6;
};

export default function HolidayCountryPage(
  { lang, country, year }: { lang: Lang; country: Country; year: number },
) {
  const locale = localeOfLang(lang);
  const ui = uiOf(locale);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const slug = holidaySlug(country.code, year);
  const path = `${prefix}/holidays/${slug}`;
  const name = ui.countries[country.code] ?? country.en;

  const list = holidaysOf(country.def, year);
  const movedCount = list.filter(h => h.moved).length;
  const weekendCount = list.filter(h => WEEKEND(h.date)).length;
  const longWeekends = list.filter(h => isLongWeekend(h.observed));

  /* 요일·날짜는 그 언어의 말로 적는다 — Intl이 열 언어를 다 안다 */
  const tag = intlTag(locale);
  const dayFmt = new Intl.DateTimeFormat(tag, { weekday: 'short', timeZone: 'UTC' });
  const dateFmt = new Intl.DateTimeFormat(tag, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const at = (iso: string) => new Date(`${iso}T00:00:00Z`);

  const years = yearsAround(year);
  const others = COUNTRIES.filter(c => c.code !== country.code);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: HOME_WORD[lang], path: homeHref },
        { name: ui.section, path: `${prefix}/holidays` },
        { name: name, path: `${prefix}/holidays/${country.code}` },
        { name: String(year), path },
      ])} />

      <PageGlow accent="sky" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={`${prefix}/holidays`} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{name}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={locale} route={`/holidays/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <ToolIcon emoji={HOLIDAY_ICON} className="h-5 w-5" />
          </span>
          <h1 className="page-h1">{ui.countryTitle(name, year)}</h1>
          <p className="note-sm">{ui.count(list.length, year)} · {country.nativeWord}</p>
        </div>

        <NextHoliday
          items={list.map(h => ({ date: h.observed, name: nameOf(country.code, h.slug).native }))}
          locale={locale}
        />

        <Ad lang={locale} />

        <section className="mt-8">
          <table className="kv-table w-full text-sm">
            <thead>
              <tr className="label-caps">
                <th className="text-left py-2">{ui.thDate}</th>
                <th className="text-left py-2">{ui.thWeekday}</th>
                <th className="text-left py-2">{ui.thName}</th>
              </tr>
            </thead>
            <tbody>
              {list.map(h => {
                const n = nameOf(country.code, h.slug);
                return (
                  <tr key={h.slug}>
                    <td className="py-2.5 pr-3 align-top whitespace-nowrap tabular-nums">
                      <span className={h.moved ? 'font-bold text-slate-900 dark:text-white' : ''}>
                        {dateFmt.format(at(h.observed))}
                      </span>
                      {h.moved && (
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                          {ui.movedFrom(dateFmt.format(at(h.date)))}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 align-top whitespace-nowrap text-slate-500 dark:text-slate-400">
                      {dayFmt.format(at(h.observed))}
                    </td>
                    <td className="py-2.5 align-top">
                      <span className="font-bold text-slate-900 dark:text-white">{n.native}</span>
                      {n.roman && <span className="text-slate-500 dark:text-slate-400"> ({n.roman})</span>}
                      {n.en !== n.native && (
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400">{n.en}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-2">
          <div className="rounded-xl border chip-off px-3.5 py-3">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{ui.thDate}</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{ui.weekendCount(weekendCount)}</p>
          </div>
          <div className="rounded-xl border chip-off px-3.5 py-3">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{ui.longWeekend}</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{longWeekends.length}</p>
          </div>
        </section>

        <p className="note-xs mt-4">
          {country.def.observance === 'none' ? ui.noSubstitute : ui.substituteNote}
          {movedCount > 0 && ` (${movedCount})`}
        </p>

        <section className="mt-8">
          <p className="label-caps mb-3">{ui.otherYears}</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {years.filter(y => y !== year).map(y => (
              <Link key={y} prefetch={false} href={`${prefix}/holidays/${holidaySlug(country.code, y)}`}
                className="group rounded-xl border chip-off px-3.5 py-3 text-center hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors tabular-nums">{y}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="label-caps mb-3">{ui.otherCountries}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {others.map(c => (
              <Link key={c.code} prefetch={false} href={`${prefix}/holidays/${holidaySlug(c.code, year)}`}
                className="group rounded-xl border chip-off px-3.5 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">
                  {ui.countries[c.code] ?? c.en}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">{c.nativeWord}</span>
              </Link>
            ))}
          </div>
        </section>

        <p className="note-xs mt-8">{ui.disclaimer}</p>
        <p className="note-xs mt-2">{ui.sourceNote}</p>
      </main>
      <SiteFooter lang={locale} referral={false} />
    </div>
  );
}
