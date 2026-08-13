'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 (2026-08-13) ──────────────────
 * 서버 컴포넌트가 그린 마크업은 **요청마다 두 번** 나간다 — 브라우저가 볼 HTML과,
 * 그 옆에 인라인으로 붙는 RSC 짐(직렬화된 트리)이다. 클래스 문자열까지 두 번
 * 실린다. 재 보니 낱장 한 장에서 RSC 짐이 61%였고 보이는 글자는 6%였다.
 *
 * Hobby의 Fast Origin Transfer 한도가 30일에 10GB인데, 주소 20만 개를 한 번 훑는
 * 데만 6GB가 들어 사이트가 실제로 멈췄다(한도의 348%).
 *
 * 마크업을 클라이언트 컴포넌트로 옮기면 그 마크업은 **캐시되는 JS 묶음**으로
 * 가고, 요청마다 넘어가는 것은 props(slug·lang) 둘뿐이다. HTML은 그대로 서버에서
 * 그려지므로 크롤러가 읽는 내용은 하나도 줄지 않는다. 게다가 JS는 Fast Data
 * Transfer(한도 100GB, 여유 많음)로 세어지고 크롤러는 애초에 받아 가지 않는다.
 *
 * 실측: /laundry 낱장이 gzip 27.8KB → 14.0KB (RSC 61% → 17%).
 */
import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import LocalTime from '@/components/country/LocalTime';
import type { Country } from '@/lib/country/types';
import { countryText } from '@/lib/country/types';
import { localeHref } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';
import type { FormulaLang } from '@/lib/formula/terms';
import {
  COUNTRY_UI, countryRegions, COUNTRY_SECTION, countryFaq, gapText, utcLabel, COUNTRY_LANGS,
} from '@/lib/country-ui';
import { relatedCountries } from '@/lib/country-tools';

/**
 * 나라 정보 상세 — 세 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 사실은 표로, 맥락은 문장으로 나눈다. 시차와 전압처럼 찾으러 온 값은 표에서
 * 바로 보이게 하고, 왜 그런지와 무엇을 주의할지는 아래 문단에서 설명한다.
 */
export default function CountryPage({ country: c, lang }: { country: Country; lang: FormulaLang }) {
  const ui = COUNTRY_UI[lang];
  const t = countryText(c, lang);
  const s = COUNTRY_SECTION;
    const homeHref = localeHref(lang, '/country');
  const path = localeHref(lang, `/country/${c.slug}`);
  const related = relatedCountries(c.slug);

  const row = (label: string, value: React.ReactNode) => (
    <div className="flex items-baseline gap-3 px-4 py-3 row-line">
      <span className="w-24 shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500">{label}</span>
      <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100">{value}</span>
    </div>
  );

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: localeHref(lang, '/country') },
          { name: t.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(t.name, t.intro, path)} />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium shrink-0`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={localeHref(lang, '/country')} className={`text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium truncate`}>
            {ui.section}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/country/${c.slug}`} available={COUNTRY_LANGS} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji={c.icon} className="text-slate-800 dark:text-slate-100 w-14 h-14 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{t.name}</h1>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
            {countryRegions(lang)[c.region] ?? c.region} · {c.code}
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

        <div className="mt-5 rounded-2xl border chip-off overflow-hidden">
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

        <div className="mt-3 rounded-2xl border chip-off px-4 py-3.5">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1.5">{ui.tipTitle}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{t.tip}</p>
        </div>

        <Faq items={countryFaq(c, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="sec-h2">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={localeHref(lang, `/country/${r.slug}`)}
                className={`group hub-card ${s.hoverBorder}`}
              >
                <ToolIcon emoji={r.icon} className="hub-card-icon" />
                <span className="hub-card-body">
                  <span className={`hub-card-title ${s.hoverText}`}>
                    {countryText(r, lang).name}
                  </span>
                  <span className="hub-card-desc">
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
