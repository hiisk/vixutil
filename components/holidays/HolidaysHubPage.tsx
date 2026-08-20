import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Ad from '@/components/Ad';
import PageGlow from '@/components/PageGlow';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { langPrefix, localeOfLang, LOCALE_PATHS, type Lang } from '@/lib/i18n/lang';
import { COUNTRIES, holidaySlug, yearsAround } from '@/lib/holidays/countries';
import { holidaysOf } from '@/lib/holidays/engine';
import { uiOf } from '@/lib/holidays/ui-l10n';
import { HOLIDAY_ICON } from '@/lib/holidays/countries';
import { HOME_WORD } from './words';

/**
 * 나라 고르는 장.
 *
 * 나라 이름만 늘어놓으면 어느 것을 눌러야 할지 알 수 없다. 나라마다 그 해
 * 공휴일이 며칠인지, 주말과 겹치면 옮기는지를 함께 보인다 — 둘 다 계산에서
 * 나오므로 일곱 칸이 저절로 서로 다르다.
 */
export default function HolidaysHubPage({ lang, now }: { lang: Lang; now: number }) {
  const locale = localeOfLang(lang);
  const ui = uiOf(locale);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/holidays`;
  const years = yearsAround(now);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: HOME_WORD[lang], path: homeHref },
        { name: ui.section, path },
      ])} />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, COUNTRIES.map(c => ({
        name: ui.countries[c.code] ?? c.en,
        path: `${path}/${c.code}`,
      })))} />

      <PageGlow accent="sky" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {HOME_WORD[lang]}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={locale} route="/holidays" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <ToolIcon emoji={HOLIDAY_ICON} className="h-5 w-5" />
          </span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLede}</p>
        </div>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COUNTRIES.map(c => {
            const list = holidaysOf(c.def, now);
            return (
              /* 연도 없는 장으로 보낸다 — 구운 장에 «올해»를 박으면 해가 바뀌어도 안 바뀐다 */
              <Link key={c.code} prefetch={false} href={`${path}/${c.code}`}
                className="group rounded-xl border chip-off px-4 py-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-sec transition-colors">
                  {ui.countries[c.code] ?? c.en}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {c.nativeWord} · {ui.count(list.length, now)}
                </span>
              </Link>
            );
          })}
        </section>

        <Ad lang={locale} />

        <section className="mt-8">
          <h2 className="sec-h2">{ui.otherYears}</h2>
          <div className="flex flex-col gap-3">
            {years.map(y => (
              <div key={y}>
                <p className="label-caps mb-1.5 tabular-nums">{y}</p>
                <div className="flex flex-wrap gap-1.5">
                  {COUNTRIES.map(c => (
                    <Link key={c.code} prefetch={false} href={`${path}/${holidaySlug(c.code, y)}`}
                      className="rounded-lg border chip-off px-2.5 py-1.5 text-[12px] font-medium text-slate-700 dark:text-slate-200 hover:text-sec hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                      {ui.countries[c.code] ?? c.en}
                    </Link>
                  ))}
                </div>
              </div>
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
