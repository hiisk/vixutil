'use client';
/* 클라이언트 컴포넌트인 까닭은 components/ValueLeaf.tsx 머리말과 같다 */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { resultFor, neighborSalaries } from '@/lib/salary-grid';

const won = (n: number) => Math.round(n).toLocaleString('ko-KR');

/** 연봉 값 낱장 — "연봉 5000 실수령"에 답한다. 계산은 lib/salary.ts가 한다 */
export default function SalaryLeaf({ manwon }: { manwon: number }) {
  const r = resultFor(manwon);
  const path = `/calculator/salary/${manwon}`;

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: '계산기', path: '/calculator' },
        { name: '실수령액', path: '/calculator/salary' },
        { name: `연봉 ${won(manwon)}만원`, path },
      ])} />
      <PageGlow accent="blue" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href="/" className="page-back hover:text-blue-600 shrink-0">홈</Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href="/calculator/salary" className="text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium truncate">
            실수령액 계산기
          </Link>
        </div>
      </header>

      <main className="page-main">
        <h1 className="page-h1">
          연봉 {won(manwon)}만원 실수령액
        </h1>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
          <p className="text-blue-100 text-xs mb-1">월 실수령액</p>
          <p className="text-4xl font-black leading-none tabular-nums">{won(r.netMonthly)}원</p>
          <p className="mt-2 text-sm text-blue-100">
            세전 월 {won(r.monthly)}원에서 {won(r.totalDeduction)}원({r.effectiveRate.toFixed(1)}%)이 빠집니다.
          </p>
        </div>

        <section className="mt-6">
          <h2 className="sec-h2">공제 내역 (월)</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {[
              ['국민연금', r.pension], ['건강보험', r.health], ['장기요양', r.longCare],
              ['고용보험', r.employment], ['소득세', r.incomeTax], ['지방소득세', r.localTax],
            ].map(([label, v]) => (
              <div key={label as string} className="row-pair">
                <span className="row-label">{label}</span>
                <span className="val">{won(v as number)}<span className="val-unit">원</span></span>
              </div>
            ))}
            <div className="row-pair">
              <span className="row-label font-bold">공제 합계</span>
              <span className="val font-bold">{won(r.totalDeduction)}원</span>
            </div>
          </div>
          <p className="mt-2 note-xs">연 실수령액은 {won(r.netAnnual)}원입니다.</p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">다른 연봉</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborSalaries(manwon).map(v => (
              <Link prefetch={false} key={v} href={`/calculator/salary/${v}`}
                className="chip-v">
                {won(v)}만원
              </Link>
            ))}
          </div>
          <Link prefetch={false} href="/calculator/salary" className="mt-4 inline-block text-sm font-bold text-blue-600 hover:text-blue-700">
            내 조건으로 계산하기 →
          </Link>
        </section>

        <p className="note-sm mt-6">
          부양가족 1명·식대 20만원 비과세를 가정한 추정치입니다. 회사의 비과세 항목과 추가 공제에 따라
          실제 급여명세서와 다를 수 있습니다. 2026년 4대보험 요율과 소득세법 기준입니다.
        </p>
      </main>

      <SiteFooter lang="ko" />
    </div>
  );
}
