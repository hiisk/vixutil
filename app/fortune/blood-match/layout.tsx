import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '혈액형 궁합 - A·B·O·AB형으로 보는 두 사람 궁합',
  description: 'A·B·O·AB형 두 사람의 혈액형으로 보는 궁합 점수와 연애·조언을 재미로 확인하세요. 과학적 근거 없는 오락용입니다.',
  alternates: { canonical: '/fortune/blood-match' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '혈액형 궁합', path: '/fortune/blood-match' },
      ])} />
      {children}
    </>
  );
}
