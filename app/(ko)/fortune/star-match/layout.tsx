import { alternateLanguages10 } from '@/lib/locales';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '별자리 궁합 - 12별자리 원소로 보는 궁합 점수',
  description: '내 별자리와 상대 별자리를 고르면 불·흙·바람·물 4원소 상성으로 궁합 점수와 연애 궁합, 관계 조언을 보여줍니다. 두 사람의 별자리 궁합을 재미로 확인하세요.',
  alternates: {
    canonical: '/fortune/star-match',
    languages: alternateLanguages10('/fortune/star-match'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '별자리 궁합', path: '/fortune/star-match' },
      ])} />
      {children}
    </>
  );
}
