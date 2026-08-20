import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '사주 궁합 - 두 사람의 일간·일지로 보는 명리 궁합',
  description: '두 사람의 생년월일시로 명식을 세워 일간의 상생상극, 배우자궁(일지)의 합·충, 오행 보완, 십성 관계 네 가지를 각각 점수와 함께 풀어 봅니다.',
  alternates: { canonical: '/fortune/saju-match' },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '사주 궁합', path: '/fortune/saju-match' },
      ])} />
      {children}
    </>
  );
}
