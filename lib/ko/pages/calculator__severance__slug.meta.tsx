/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { allSeveranceCells, parseSeveranceSlug, severanceSlug, severanceFacts } from '@/lib/severance-grid';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
/**
 * 퇴직금 값 낱장 — `/calculator/severance/<월급만원>-<근속년>` 492장(한국어 전용).
 *
 * 근로자퇴직급여 보장법은 한국 제도라 다른 언어로 낼 것이 없다. 라우트도 안 늘렸다 —
 * KO_DEEP_LEAVES에 한 줄을 더해 이미 있는 [section]/[slug]/[deep]이 받는다.
 */
const won = (n: number) => Math.round(n).toLocaleString('ko-KR');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = parseSeveranceSlug(slug);
  if (!c) return {};
  const f = severanceFacts(c.wage, c.years);
  return withCard({
    title: `월급 ${c.wage}만원 ${c.years}년 퇴직금 — ${won(f.pay)}원`,
    description: `월 급여 ${c.wage}만원으로 ${c.years}년 근무하면 퇴직금은 약 ${won(f.pay)}원입니다. 퇴직하는 달에 따라 ${won(f.min.pay)}원~${won(f.max.pay)}원으로 달라지는 이유까지 봅니다.`,
    alternates: { canonical: `/calculator/severance/${severanceSlug(c.wage, c.years)}` },
  });
}

export function generateStaticParams() {
  return prerender(allSeveranceCells().map(c => ({ slug: severanceSlug(c.wage, c.years) })));
}
