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
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import YearDecades from '@/components/year/YearDecades';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { yearOf } from '@/lib/year/list';
import { neighbours, yearFacts } from '@/lib/year/facts';
import { YEAR_UI } from '@/lib/year/ui';

/**
 * 연도 한 장 — 윤년 여부와 그 이유를 나란히 둔다.
 *
 * "예/아니요"만 적으면 다음 해를 스스로 판단하지 못한다. 어느 갈래로 갈렸는지
 * (4로 나뉘는지, 100인지, 400인지)를 함께 보이면 규칙이 남는다.
 */
export default function YearPage({ slug, lang }: { slug: string; lang: Lang }) {
  const year = yearOf(slug);
  if (year === undefined) return null;
  const f = yearFacts(year);
  const ui = YEAR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/year`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.leapLabel, f.leap ? ui.yes : ui.no],
    [ui.daysLabel, String(f.days)],
    [ui.febLabel, String(f.febDays)],
    [ui.firstDayLabel, ui.weekdays[f.firstWeekday]],
    [ui.lastDayLabel, ui.weekdays[f.lastWeekday]],
    [ui.weeksLabel, String(f.isoWeeks)],
    [ui.cycleLabel, `${ui.stems[f.stem]}${ui.branches[f.branch]}`],
    [ui.zodiacLabel, ui.zodiac[f.branch]],
    ...(f.prevLeap !== null ? ([[ui.prevLeapLabel, String(f.prevLeap)]] as [string, string][]) : []),
    ...(f.nextLeap !== null ? ([[ui.nextLeapLabel, String(f.nextLeap)]] as [string, string][]) : []),
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: String(year), path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-700 to-orange-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{year}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/year/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-rose-400 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{year}</div>
          <div className="mt-1 text-sm font-bold text-rose-800 dark:text-rose-300 tabular-nums">
            {f.leap ? ui.leapLabel : ui.daysLabel} · {f.days}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {/*

          ── 해마다 갈리는 설명 (2026-08-12) ──────────────────────

          전에는 낱장 241장이 형제끼리 낱말 96%가 같았다. 글이 짧아서가 아니라

          문장이 틀에서 나와 연도와 요일만 갈렸다.


          여기 오는 문장은 facts.ts의 yearReasonKeys가 이 해의 달력 규칙에서 뽑은

          갈래에 따라 달라진다(241해 → 스물세 조합, 가장 큰 것이 11%).

        */}

        <section className="mb-8">

          <h2 className="sec-h2-tight">{ui.reasonsTitle}</h2>

          <ul className="flex flex-col gap-2">

            {ui.reasons(f).map((line, i) => (

              <li

                key={i}

                className="rounded-xl border border-teal-200/70 dark:border-teal-900/50 bg-teal-50/50 dark:bg-teal-950/25 px-4 py-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"

              >

                {line}

              </li>

            ))}

          </ul>

        </section>


        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.leapTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.leapNote}</p>
          <div className="rounded-2xl border chip-off px-4 py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
            {ui.ruleText(f)}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.monthTitle}</h2>
          <div className="grid grid-cols-6 gap-1.5">
            {f.months.map((d, i) => (
              <div key={i} className="rounded-lg border chip-off px-1 py-1.5 text-center">
                <div className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{i + 1}</div>
                <div className="cell-num">{d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.weekTitle}</h2>
          <p className="note-xs">{ui.weekNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.cycleTitle}</h2>
          <p className="note-xs">{ui.cycleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(year).map(y => (
              <Link prefetch={false}
                key={y}
                href={`${hub}/${y}`}
                className="rounded-xl border chip-off px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-rose-400 hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
              >
                {y} · {yearFacts(y).days}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.decadeTitle}</h2>
          <YearDecades path={hub} current={year} name={ui.decadeName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.yearFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/year/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
