import type { Metadata } from 'next';
import CalculatorHub from '@/components/CalculatorHub';

/**
 * 화면은 CalculatorHub(클라이언트)가 그린다. 이 파일이 서버 컴포넌트인 이유는
 * metadata를 내보내기 위해서다 — 'use client' 페이지에서는 export할 수 없다.
 *
 * canonical은 여기 둔다. app/calculator/layout.tsx에 넣으면 하위 계산기 97개가
 * 전부 이 레이아웃을 상속해 /calculator를 정본으로 가리키게 된다 — 그러면
 * 계산기 페이지들이 색인에서 통째로 빠진다.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/calculator' },
};

export default function Page() {
  return <CalculatorHub />;
}
