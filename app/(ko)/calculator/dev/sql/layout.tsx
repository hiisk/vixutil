import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: 'SQL 포매터 - SQL 쿼리 정렬·들여쓰기 온라인 변환',
  description: '복잡한 SQL 쿼리를 붙여넣으면 키워드 대문자 변환과 들여쓰기로 읽기 좋게 포매팅합니다. SELECT, INSERT, UPDATE, DELETE, JOIN 지원.',
  alternates: {
    canonical: '/calculator/dev/sql',
    languages: alternateLanguages10('/calculator/dev/sql'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
