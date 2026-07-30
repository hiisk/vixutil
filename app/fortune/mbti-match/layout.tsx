import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'MBTI 궁합 - 16유형으로 보는 두 사람 궁합 점수',
  description: '두 사람의 MBTI 16유형으로 보는 궁합 점수와 연애·관계 조언. E/I·N/S·T/F·J/P 상성을 재미로 확인하세요.',
  alternates: {
    canonical: '/fortune/mbti-match',
    languages: { 'ko': '/fortune/mbti-match', 'en': '/en/fortune/mbti-match', 'x-default': '/en/fortune/mbti-match' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: 'MBTI 궁합', path: '/fortune/mbti-match' },
      ])} />
      {children}
    </>
  );
}
