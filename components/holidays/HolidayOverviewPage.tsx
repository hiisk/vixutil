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
import { uiOf } from '@/lib/holidays/ui-l10n';
import { HOLIDAY_ICON } from '@/lib/holidays/countries';
import { HOME_WORD } from './words';

/**
 * 한 나라 개관 — 연도를 고르기 전의 장.
 *
 * 「독일 공휴일」로 들어온 사람은 아직 어느 해인지 안 정했다. 그래서 여기서는
 * 해마다 안 바뀌는 것을 보인다 — 그 나라에 무슨 날이 있는지, 주말과 겹치면
 * 어떻게 되는지. 연도는 고르게 둔다.
 *
 * **연도 목록의 기준은 빌드한 해가 아니다.** 상수로 박으면 배포한 해가 굳어
 * 몇 해 뒤에 「지난 해만 있는 장」이 된다. 부르는 쪽이 지금 해를 넘긴다.
 */
export default function HolidayOverviewPage(
  { lang, country, now }: { lang: Lang; country: Country; now: number },
) {
  const locale = localeOfLang(lang);
  const ui = uiOf(locale);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/holidays/${country.code}`;
  const name = ui.countries[country.code] ?? country.en;

  /* 어떤 날이 있는지는 해마다 같다 — 올해로 뽑아 이름만 보인다 */
  const list = holidaysOf(country.def, now);
  const years = yearsAround(now);
  const others = COUNTRIES.filter(c => c.code !== country.code);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: HOME_WORD[lang], path: homeHref },
        { name: ui.section, path: `${prefix}/holidays` },
        { name: name, path },
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
            <LangPicker current={locale} route={`/holidays/${country.code}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <ToolIcon emoji={HOLIDAY_ICON} className="h-5 w-5" />
          </span>
          <h1 className="page-h1">{ui.overviewTitle(name)}</h1>
          <p className="note-sm">{ui.overviewDesc(name)}</p>
        </div>

        <section className="mt-6">
          <p className="label-caps mb-3">{ui.otherYears}</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {years.map(y => (
              <Link key={y} prefetch={false} href={`${prefix}/holidays/${holidaySlug(country.code, y)}`}
                className={`group rounded-xl border chip-off px-3.5 py-3 text-center transition-all hover:border-slate-300 dark:hover:border-slate-700 ${
                  y === now ? 'ring-1 ring-[var(--c-sec)]' : ''}`}>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors tabular-nums">{y}</span>
              </Link>
            ))}
          </div>
        </section>

        <Ad lang={locale} />

        <section className="mt-8">
          <h2 className="sec-h2">{ui.section}</h2>
          <div className="kv-table">
            {list.map(h => {
              const n = nameOf(country.code, h.slug);
              return (
                <div key={h.slug} className="kv-row">
                  <span>{n.native}{n.roman ? ` (${n.roman})` : ''}</span>
                  <span>{n.en}</span>
                </div>
              );
            })}
          </div>
        </section>

        <p className="note-xs mt-4">
          {country.def.observance === 'none' ? ui.noSubstitute : ui.substituteNote}
        </p>

        <section className="mt-8">
          <p className="label-caps mb-3">{ui.otherCountries}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {others.map(c => (
              <Link key={c.code} prefetch={false} href={`${prefix}/holidays/${c.code}`}
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
