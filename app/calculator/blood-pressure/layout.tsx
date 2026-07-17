import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '혈압 체크기 - WHO 기준 혈압 등급 판정',
  description: '수축기(최고) 혈압과 이완기(최저) 혈압을 입력하면 WHO 기준에 따라 혈압 등급과 설명을 제공합니다.',
  alternates: { canonical: '/calculator/blood-pressure' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
