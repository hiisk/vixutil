import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'URL 인코딩·디코딩 - 퍼센트 인코딩 온라인 변환',
  description: '한글·특수문자를 URL-safe 퍼센트 인코딩(%XX)으로 변환하거나 디코딩합니다. encodeURIComponent 방식을 기본 적용합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
