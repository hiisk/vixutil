import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '텍스트 비교 (Diff) - 줄 단위 차이 비교 도구',
  description: '두 텍스트를 줄 단위로 비교합니다. 추가된 줄(녹색), 삭제된 줄(빨간색), 동일한 줄(회색)로 구분하여 표시합니다.',
  alternates: {
    canonical: '/calculator/dev/diff',
    languages: alternateLanguages10('/calculator/dev/diff'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
