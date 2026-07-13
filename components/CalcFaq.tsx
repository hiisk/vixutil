'use client';
import { usePathname } from 'next/navigation';
import { CALC_FAQ, type FaqItem } from '@/lib/calc-faq';
import Faq from './Faq';

/**
 * 계산기 FAQ — items를 넘기면 그대로 쓰고, 없으면 현재 경로(slug)로 CALC_FAQ에서 자동 조회한다.
 * 따라서 lib/calc-faq.ts 에 slug만 추가하면 해당 페이지에 FAQ가 자동 노출된다.
 * 표시 UI와 FAQPage 구조화 데이터 출력은 범용 Faq 컴포넌트가 담당한다.
 */
export default function CalcFaq({ items }: { items?: FaqItem[] }) {
  const pathname = usePathname();
  const slug = pathname?.split('/').filter(Boolean).slice(1).join('/') ?? '';
  return <Faq items={items ?? CALC_FAQ[slug]} />;
}
