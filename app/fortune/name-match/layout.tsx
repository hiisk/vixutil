import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '이름 궁합 - 두 사람 이름 획수로 보는 궁합 점수',
  description: '두 사람의 한글 이름을 번갈아 놓고 획수를 더해가며 궁합 점수를 냅니다. 계산 과정을 한 단계씩 보여줍니다.',
  alternates: { canonical: '/fortune/name-match' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '이름 궁합', path: '/fortune/name-match' },
      ])} />
      {children}
    </>
  );
}
