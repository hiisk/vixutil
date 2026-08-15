/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { allLoanCells, parseLoanSlug, loanSlug, loanFacts } from '@/lib/loan-grid';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
/**
 * 대출 상환방식 값 낱장 — `/calculator/loan-method/<원금만원>-<이율×10>-<년>` 432장.
 *
 * 한국어 전용이다 — 원금을 "억"으로 읽고 금액이 원이라 그대로 옮길 수 없다.
 * 라우트는 안 늘렸다: KO_DEEP_LEAVES에 한 줄을 더해 이미 있는
 * [section]/[slug]/[deep]이 받는다.
 */
const won = (n: number) => Math.round(n).toLocaleString('ko-KR');
const label = (manwon: number) => manwon < 10_000
  ? `${manwon.toLocaleString('ko-KR')}만원`
  : `${manwon / 10_000}억원`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = parseLoanSlug(slug);
  if (!c) return {};
  const f = loanFacts(c.principal, c.rate, c.term);
  return withCard({
    title: `${label(c.principal)} ${c.rate}% ${c.term}년 — 월 ${won(f.monthly)}원`,
    description: `${label(c.principal)}을 연 ${c.rate}%로 ${c.term}년 빌리면 원리금균등 월 상환액은 ${won(f.monthly)}원, 총이자는 ${won(f.schedules[0].totalInterest)}원입니다. 원금균등·만기일시와 이자를 나란히 비교합니다.`,
    alternates: { canonical: `/calculator/loan-method/${loanSlug(c.principal, c.rate, c.term)}` },
  });
}

export function generateStaticParams() {
  return prerender(allLoanCells().map(c => ({ slug: loanSlug(c.principal, c.rate, c.term) })));
}
