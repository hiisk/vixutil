import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '얼굴 황금비율 테스트 - 이목구비 비례 점수',
  description: '사진 한 장으로 얼굴 이목구비 비례가 미의 황금비(φ≈1.618)에 얼마나 가까운지 실제 측정해 점수로 보여주는 참여형 테스트입니다.',
  alternates: { canonical: '/snap/golden-ratio' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '스냅테스트', path: '/snap' },
        { name: '얼굴 황금비율', path: '/snap/golden-ratio' },
      ])} />
      {children}
    </>
  );
}
