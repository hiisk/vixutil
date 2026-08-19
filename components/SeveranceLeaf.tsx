'use client';
/* 클라이언트 컴포넌트인 까닭은 components/ValueLeaf.tsx 머리말과 같다 */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { severanceFacts, neighborCells, severanceSlug, REF_YEAR } from '@/lib/severance-grid';

const won = (n: number) => Math.round(n).toLocaleString('ko-KR');

/** 퇴직금 값 낱장 — "월급 300 3년 퇴직금"에 답한다. 계산은 lib/severance.ts가 한다 */
export default function SeveranceLeaf({ wage, years }: { wage: number; years: number }) {
  const f = severanceFacts(wage, years);
  const path = `/calculator/severance/${severanceSlug(wage, years)}`;
  const naiveUp = f.naiveGap > 0;

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: '계산기', path: '/calculator' },
        { name: '퇴직금', path: '/calculator/severance' },
        { name: `월급 ${wage}만원 · ${years}년`, path },
      ])} />
      <PageGlow accent="amber" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href="/" className="page-back hover:text-amber-600 shrink-0">홈</Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href="/calculator/severance" className="text-sm text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors font-medium truncate">
            퇴직금 계산기
          </Link>
        </div>
      </header>

      <main className="page-main">
        <h1 className="page-h1">
          월급 {wage}만원 · 근속 {years}년 퇴직금
        </h1>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
          <p className="text-amber-100 text-xs mb-1">퇴직금 (세전)</p>
          <p className="cv text-4xl font-black leading-none tabular-nums">{won(f.pay)}원</p>
          <p className="mt-2 text-sm text-amber-100">
            1일 평균임금 {won(f.dailyAvgWage)}원 × 30일 × ({f.totalDays}일 ÷ 365)
          </p>
        </div>

        <section className="mt-6">
          <h2 className="sec-h2">퇴직하는 달에 따라 달라집니다</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            평균임금은 퇴직 전 <b>3개월의 실제 일수</b>로 나눕니다. 그 일수가 달마다 달라서,
            같은 월급·같은 근속이라도 퇴직하는 달에 따라 퇴직금이 달라집니다.
          </p>
          <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div className="row-pair">
              <span className="row-label">가장 많은 달 — {f.max.month}월 말 ({f.max.days}일)</span>
              <span className="val">{won(f.max.pay)}<span className="val-unit">원</span></span>
            </div>
            <div className="row-pair">
              <span className="row-label">가장 적은 달 — {f.min.month}월 말 ({f.min.days}일)</span>
              <span className="val">{won(f.min.pay)}<span className="val-unit">원</span></span>
            </div>
            <div className="row-pair">
              <span className="row-label font-bold">차이</span>
              <span className="val font-bold">{won(f.max.pay - f.min.pay)}원</span>
            </div>
          </div>
          <p className="mt-2 note-xs">
            흔히 쓰는 어림값 &ldquo;월급 × 근속연수&rdquo;({won(wage * 10_000 * years)}원)보다
            {' '}{won(Math.abs(f.naiveGap))}원 {naiveUp ? '많습니다' : '적습니다'}.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">월급 {wage}만원, 근속 연수별</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {/* hover 색은 globals.css의 .row-pair:hover가 --c-sec으로 이미 그린다 —
                여기 적혀 있던 amber 짝은 같은 것을 두 번 적은 것이었다 */}
            {f.yearsTable.map(r => (
              <Link prefetch={false} key={r.years} href={`/calculator/severance/${severanceSlug(wage, r.years)}`}
                className={`row-pair${r.years === years ? ' row-now' : ''}`}>
                <span className="row-label">{r.years}년</span>
                <span className="val">{won(r.pay)}<span className="val-unit">원</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">다른 조건</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborCells(wage, years).map(c => (
              <Link prefetch={false} key={severanceSlug(c.wage, c.years)} href={`/calculator/severance/${severanceSlug(c.wage, c.years)}`}
                className="chip-v">
                {c.wage}만원 · {c.years}년
              </Link>
            ))}
          </div>
          <Link prefetch={false} href="/calculator/severance" className="next-step">
            내 입사일·퇴직일로 계산하기 →
          </Link>
        </section>

        <p className="note-sm mt-6">
          3개월 급여가 같고 상여금·연차수당이 없으며 근속이 정확히 {years}년(365 × {years}일)일 때의
          추정치입니다. {REF_YEAR}년 각 달 말일 퇴직 기준이며, 대표값은 12월 31일 퇴직입니다.
          상여금과 연차수당이 있으면 평균임금이 올라 퇴직금도 늘어납니다. 실제 수령액은 여기서
          퇴직소득세를 뺀 금액입니다.
        </p>
      </main>

      <SiteFooter lang="ko" />
    </div>
  );
}
