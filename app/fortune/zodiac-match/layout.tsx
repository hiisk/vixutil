import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '띠 궁합 - 십이지로 보는 두 사람의 궁합 점수',
  description: '내 띠와 상대 띠를 고르면 삼합·육합·충 등 전통 십이지 상성으로 궁합 점수와 연애 궁합, 관계 조언을 보여줍니다. 두 사람의 띠 궁합을 재미로 확인하세요.',
  alternates: { canonical: '/fortune/zodiac-match' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '띠 궁합', path: '/fortune/zodiac-match' },
      ])} />
      {children}
    </>
  );
}
