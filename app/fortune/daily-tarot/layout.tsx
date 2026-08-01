import { alternateLanguages10 } from '@/lib/locales';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '오늘의 타로 - 매일 바뀌는 타로 카드 한 장',
  description: '매일 자정 새로 정해지는 오늘의 타로 카드 한 장을 뽑아 오늘의 메시지와 행운의 색·방향·숫자를 확인하세요. 같은 날엔 같은 카드가 나옵니다.',
  alternates: {
    canonical: '/fortune/daily-tarot',
    languages: alternateLanguages10('/fortune/daily-tarot'),
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '오늘의 타로', path: '/fortune/daily-tarot' },
      ])} />
      {children}
    </>
  );
}
