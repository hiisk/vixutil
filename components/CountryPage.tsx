import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import LocalTime from '@/components/country/LocalTime';
import type { Country } from '@/lib/country/types';
import type { Lang } from '@/lib/formula/terms';
import { FORMULA_LANGS } from '@/lib/formula/ui';
import {
  COUNTRY_UI, COUNTRY_REGION_LABEL, COUNTRY_SECTION, countryFaq, gapText, utcLabel,
} from '@/lib/country-ui';
import { relatedCountries } from '@/lib/country-tools';

/**
 * 나라 정보 상세 — 세 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 사실은 표로, 맥락은 문장으로 나눈다. 시차와 전압처럼 찾으러 온 값은 표에서
 * 바로 보이게 하고, 왜 그런지와 무엇을 주의할지는 아래 문단에서 설명한다.
 */
export default function CountryPage({ country: c, lang }: { country: Country; lang: Lang }) {
  const ui = COUNTRY_UI[lang];
  const t = c[lang];
  const s = COUNTRY_SECTION;
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  const homeHref = lang === 'ko' ? '/' : `${prefix}/country`;
  const path = `${prefix}/country/${c.slug}`;
  const related = relatedCountries(c.slug);

  const row = (label: string, value: React.ReactNode) => (
    <div className="flex items-baseline gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="w-24 shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500">{label}</span>
      <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100">{value}</span>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/country` },
          { name: t.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(t.name, t.intro, path)} />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium shrink-0`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/country`} className={`text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium truncate`}>
            {ui.section}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {FORMULA_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/country/${c.slug}`} hrefLang={l.lang} className={`${s.linkHover} transition-colors`}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{c.icon}</div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{t.name}</h1>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
            {COUNTRY_REGION_LABEL[lang][c.region] ?? c.region} · {c.code}
          </p>
        </div>

        <div className={`rounded-2xl bg-gradient-to-br ${s.grad} text-white px-6 py-6 text-center shadow-lg`}>
          <p className="text-xs text-white/70 mb-1">{ui.nowLocal}</p>
          <p className="text-3xl font-black">
            <LocalTime tz={c.tz} lang={lang} />
          </p>
          <p className="text-sm text-white/75 mt-2">{gapText(c, lang)}</p>
        </div>

        <p className="mt-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.intro}</p>

        <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          {row(ui.capital, t.capital)}
          {row(ui.languages, t.languages)}
          {row(ui.currency, `${t.currency} (${c.currencyCode})`)}
          {row(ui.timezone, `${utcLabel(c.utc)} · ${c.dst ? ui.dstYes : ui.dstNo}`)}
          {row(ui.dial, c.dial)}
          {row(ui.volt, `${c.volt} / ${c.hz}`)}
          {row(ui.plug, c.plug)}
          {row(ui.drive, c.drive === 'left' ? ui.driveLeft : ui.driveRight)}
          {row(ui.emergency, t.emergency)}
          {row(ui.tld, c.tld)}
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-3.5">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1.5">{ui.visaTitle}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{t.visa}</p>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1.5">{ui.tipTitle}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{t.tip}</p>
        </div>

        <Faq items={countryFaq(c, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`${prefix}/country/${r.slug}`}
                className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 ${s.hoverBorder} hover:shadow-sm transition-all`}
              >
                <span className="text-xl shrink-0">{r.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 ${s.hoverText} transition-colors`}>
                    {r[lang].name}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">
                    {utcLabel(r.utc)} · {r.volt} · {r.dial}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
