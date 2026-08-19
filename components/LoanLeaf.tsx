'use client';
/* 클라이언트 컴포넌트인 까닭은 components/ValueLeaf.tsx 머리말과 같다 */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { ALL_METHODS } from '@/lib/loan-schedule';
import { loanFacts, neighborLoans, loanSlug } from '@/lib/loan-grid';

const won = (n: number) => Math.round(n).toLocaleString('ko-KR');

/** 원금을 사람이 읽는 말로 — 10000만원이 아니라 1억 */
function moneyLabel(manwon: number): string {
  if (manwon < 10_000) return `${manwon.toLocaleString('ko-KR')}만원`;
  const eok = manwon / 10_000;
  return Number.isInteger(eok) ? `${eok}억원` : `${Math.floor(eok)}억 ${(manwon % 10_000).toLocaleString('ko-KR')}만원`;
}

const methodLabel = (key: string) => ALL_METHODS.find(m => m.key === key)!.label;

/** 대출 값 낱장 — "1억 4.5% 30년 이자"에 답한다. 계산은 lib/loan-schedule.ts가 한다 */
export default function LoanLeaf({ principal, rate, term }: { principal: number; rate: number; term: number }) {
  const f = loanFacts(principal, rate, term);
  const path = `/calculator/loan-method/${loanSlug(principal, rate, term)}`;
  const label = moneyLabel(principal);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: '계산기', path: '/calculator' },
        { name: '대출 상환방식', path: '/calculator/loan-method' },
        { name: `${label} ${rate}% ${term}년`, path },
      ])} />
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href="/" className="page-back hover:text-emerald-600 shrink-0">홈</Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href="/calculator/loan-method" className="text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium truncate">
            대출 상환방식 계산기
          </Link>
        </div>
      </header>

      <main className="page-main">
        <h1 className="page-h1">
          {label} 연 {rate}% {term}년 대출
        </h1>

        <div className="mt-4 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
          <p className="text-emerald-100 text-xs mb-1">원리금균등 월 상환액</p>
          <p className="text-4xl font-black leading-none tabular-nums">{won(f.monthly)}원</p>
          <p className="mt-2 text-sm text-emerald-100">
            {term}년({f.months}개월) 동안 이자만 {won(f.schedules[0].totalInterest)}원 —
            원금의 {f.interestPct.toFixed(0)}%입니다.
          </p>
        </div>

        <section className="mt-6">
          <h2 className="sec-h2">상환방식에 따라 이자가 다릅니다</h2>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.schedules.map(s => (
              <div key={s.method} className="px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{methodLabel(s.method)}</span>
                  <span className="val">{won(s.totalInterest)}<span className="val-unit">원</span></span>
                </div>
                <p className="mt-1 note-xs">
                  첫 달 {won(s.firstPayment)}원 · 마지막 달 {won(s.lastPayment)}원 ·
                  {' '}총 {won(s.totalPaid)}원
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 note-xs">
            가장 적은 <b>{methodLabel(f.cheapest.method)}</b>과 가장 많은 <b>{methodLabel(f.dearest.method)}</b>의
            이자 차이가 {won(f.spread)}원입니다. 대신 원금균등은 첫 달 부담이 가장 큽니다 —
            그 맞바꿈을 보고 고르는 것입니다.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">다른 조건</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborLoans(principal, rate, term).map(c => (
              <Link prefetch={false} key={loanSlug(c.principal, c.rate, c.term)}
                href={`/calculator/loan-method/${loanSlug(c.principal, c.rate, c.term)}`}
                className="chip-v">
                {moneyLabel(c.principal)} · {c.rate}% · {c.term}년
              </Link>
            ))}
          </div>
          <Link prefetch={false} href="/calculator/loan-method" className="mt-4 inline-block text-sm font-bold text-emerald-600 hover:text-emerald-700">
            내 조건으로 계산하기 →
          </Link>
        </section>

        <p className="note-sm mt-6">
          거치기간 없이 첫 달부터 갚고, 이율이 {term}년 내내 그대로일 때의 값입니다. 변동금리면
          이율이 바뀔 때마다 달라지고, 중도상환수수료·인지세·근저당 설정비는 넣지 않았습니다.
          실제 대출 조건은 금융기관마다 다릅니다.
        </p>
      </main>

      <SiteFooter lang="ko" />
    </div>
  );
}
