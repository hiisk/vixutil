'use client';
/* 클라이언트 컴포넌트인 까닭은 components/ValueLeaf.tsx 머리말과 같다 —
   props는 month·day·lang 셋뿐이고 표는 안에서 계산한다. */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { dayFacts, daySlug, neighborDays } from '@/lib/date/day-grid';
import { DAY_UI } from '@/lib/date/day-ui';
import { localeHref, localePrefix, localeTag, type AnyLocale10 } from '@/lib/locales';

/**
 * 날짜 낱장 — "3월 15일은 무슨 요일인가"에 답한다.
 *
 * 요일 이름은 Intl이 언어마다 내준다 — 열 언어 × 일곱 요일을 손으로 적으면
 * 일흔 줄이고 곧 어긋난다. 기준 날짜(2024-01-07이 일요일)로 요일 이름을 뽑는다.
 */
export default function DayLeaf({ month, day, lang }: { month: number; day: number; lang: AnyLocale10 }) {
  const t = DAY_UI[lang];
  const f = dayFacts(month, day);
  const tag = localeTag(lang);

  /* 2024-01-07은 일요일이다 — 거기서 이레를 세어 요일 이름을 만든다 */
  const fmt = new Intl.DateTimeFormat(tag, { weekday: 'long', timeZone: 'UTC' });
  const weekdayName = (i: number) => fmt.format(new Date(Date.UTC(2024, 0, 7 + i)));

  const prefix = localePrefix(lang);
  const path = `${prefix}/date/${daySlug(month, day)}`;
  const label = t.dateLabel(month, day);
  const most = weekdayName(f.weekdayCounts.indexOf(Math.max(...f.weekdayCounts)));

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([{ name: t.factsTitle, path: `${prefix}/date` }, { name: label, path }])} />
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-blue-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={localeHref(lang, '/')} className="page-back hover:text-sky-600 shrink-0">←</Link>
          <span className="text-sm text-slate-400 dark:text-slate-500 font-medium truncate">{label}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/date/${daySlug(month, day)}`} />
          </span>
        </div>
      </header>

      <main className="page-main">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">{t.h1(label)}</h1>

        {/* ① 연도별 요일 — 이 페이지의 답이다 */}
        <section className="mt-4">
          <h2 className="sec-h2">{t.weekdayTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.weekdays.map(([y, w]) => (
              <div key={y} className="row-pair">
                <span className="row-label">{y}</span>
                <span className="val">{weekdayName(w)}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 note-xs">{t.weekdayNote(most)}</p>
        </section>

        {/* ② 날짜 정보 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.factsTitle}</h2>
          <div className="rounded-2xl border chip-off p-5 space-y-2">
            <p className="text-sm text-slate-700 dark:text-slate-200">{t.doy(String(f.dayOfYearLeap))}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200">{t.quarter(String(f.quarter))}</p>
            {f.isLeapDay && <p className="note-xs">{t.leapNote}</p>}
          </div>
        </section>

        {/* ③ 기념일 — 있는 날만 */}
        {f.holiday && (
          <section className="mt-6">
            <h2 className="sec-h2">{t.holidayTitle}</h2>
            <div className="rounded-2xl border chip-off p-5">
              <p className="text-lg font-black text-slate-800 dark:text-slate-100">
                {lang === 'ko' ? f.holiday.ko : f.holiday.en}
              </p>
              <p className="mt-1 note-xs">{f.holiday.holiday ? t.publicHoliday : t.observance}</p>
            </div>
          </section>
        )}

        {/* ④ ISO 주차 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.weekTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {f.weeks.map(([y, w]) => (
              <span key={y} className="chip chip-off text-sm text-slate-700 dark:text-slate-200 tabular-nums">
                {t.weekRow(String(y), String(w))}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{t.nearbyTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborDays(month, day).map(d => (
              <Link prefetch={false} key={daySlug(d.month, d.day)} href={`${prefix}/date/${daySlug(d.month, d.day)}`}
                className="chip-v">
                {t.dateLabel(d.month, d.day)}
              </Link>
            ))}
          </div>
        </section>

        <p className="note-sm mt-6">{t.note}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
