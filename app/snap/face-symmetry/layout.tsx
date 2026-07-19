import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '얼굴 대칭 분석 - 좌우 밸런스 지수 측정',
  description: '사진 한 장으로 얼굴 랜드마크를 실측해 좌우 대칭 지수를 측정해보는 재미있는 테스트입니다.',
  alternates: { canonical: '/snap/face-symmetry' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '스냅테스트', path: '/snap' },
        { name: '얼굴 대칭 분석', path: '/snap/face-symmetry' },
      ])} />
      {children}
    </>
  );
}
