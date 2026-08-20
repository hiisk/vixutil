import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '삼재 계산기 - 내 띠 삼재 언제인지 바로 확인',
  description: '띠를 고르면 삼재가 드는 세 해와 지금이 들삼재·눌삼재·날삼재 중 어디인지 알려줍니다. 올해 삼재인 띠 셋도 함께 봅니다.',
  alternates: { canonical: '/fortune/samjae' },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '삼재', path: '/fortune/samjae' },
      ])} />
      {children}
    </>
  );
}
