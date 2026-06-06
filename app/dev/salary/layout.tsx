import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '개발자 연봉 계산기 - 경력·기술 스택 기준 연봉 추정',
  description: '개발자 경력 연수와 기술 스택, 직군을 선택하면 국내 IT 기업 기준 연봉 범위를 추정합니다. 스타트업·대기업·외국계 비교도 제공합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
