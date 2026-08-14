import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SalaryLeaf from '@/components/SalaryLeaf';
import { SALARIES, parseSalarySlug, resultFor } from '@/lib/salary-grid';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';

/**
 * 연봉 실수령액 값 낱장 — `/calculator/salary/<만원>` 97장(한국어 전용).
 *
 * 4대보험·근로소득세는 한국 제도라 다른 언어로 낼 것이 없다. 라우트도 안 늘렸다 —
 * KO_DEEP_LEAVES에 한 줄을 더해 이미 있는 [section]/[slug]/[deep]이 받는다.
 */
const won = (n: number) => Math.round(n).toLocaleString('ko-KR');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = parseSalarySlug(slug);
  if (v === null) return {};
  const r = resultFor(v);
  return withCard({
    title: `연봉 ${won(v)}만원 실수령액 — 월 ${won(r.netMonthly)}원`,
    description: `연봉 ${won(v)}만원의 월 실수령액은 ${won(r.netMonthly)}원입니다. 국민연금·건강보험·장기요양·고용보험과 소득세·지방소득세 공제 내역을 항목별로 봅니다.`,
    alternates: { canonical: `/calculator/salary/${v}` },
  });
}

export function generateStaticParams() {
  return prerender(SALARIES.map(v => ({ slug: String(v) })));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = parseSalarySlug(slug);
  if (v === null) notFound();
  return <SalaryLeaf manwon={v} />;
}
