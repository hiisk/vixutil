import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '행운의 로또 번호 - 생년월일로 보는 오늘의 번호',
  description: '생년월일을 넣으면 오늘의 행운 로또 번호 6개와 보너스, 행운의 판매점 방향·요일·시간대를 알려드립니다. 매일 자정 새로 바뀝니다. 재미·참고용.',
  alternates: {
    // en/zh는 특정 국가의 복권을 지칭하지 않도록 slug를 lucky-numbers로 다르게 뒀다.
    canonical: '/fortune/lucky-lotto',
    languages: { 'ko': '/fortune/lucky-lotto', 'en': '/en/fortune/lucky-numbers', 'x-default': '/en/fortune/lucky-numbers' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '행운의 로또 번호', path: '/fortune/lucky-lotto' },
      ])} />
      {children}
    </>
  );
}
