import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'JSON 포매터 - JSON 정렬·압축·유효성 검사 온라인',
  description: '입력한 JSON을 보기 좋게 들여쓰기 정렬하거나 한 줄로 압축합니다. JSON 문법 유효성 검사와 오류 위치도 표시합니다.',
  alternates: { canonical: '/calculator/dev/json' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
