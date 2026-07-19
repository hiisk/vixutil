import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '동물상 테스트 - 나는 무슨 동물상일까',
  description: '사진 한 장으로 강아지상부터 여우상까지, 12가지 동물상 중 나와 가장 닮은 동물을 실제 얼굴 인식으로 찾아보세요.',
  alternates: { canonical: '/snap/animal-face' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '스냅테스트', path: '/snap' },
        { name: '동물상 테스트', path: '/snap/animal-face' },
      ])} />
      {children}
    </>
  );
}
