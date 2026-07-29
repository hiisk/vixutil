import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '타로 예스/노 - 질문에 예·아니오로 답하는 타로',
  description: '마음속 질문을 떠올리고 타로 카드 한 장을 뽑아 예·아니오·글쎄로 답을 받아보세요. 뽑힌 카드의 의미와 함께 그 답의 이유도 알려드립니다.',
  alternates: {
    canonical: '/fortune/tarot-yesno',
    languages: { 'ko': '/fortune/tarot-yesno', 'en': '/en/fortune/tarot-yesno', 'zh': '/zh/fortune/tarot-yesno', 'x-default': '/en/fortune/tarot-yesno' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '타로 예스/노', path: '/fortune/tarot-yesno' },
      ])} />
      {children}
    </>
  );
}
