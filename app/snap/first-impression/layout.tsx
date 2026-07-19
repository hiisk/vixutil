import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '첫인상 분석 - 사진으로 보는 내 인상 유형',
  description: '사진 한 장으로 눈·얼굴선·입꼬리를 실측해 사람들이 받는 첫인상 유형을 알려드립니다. 사진은 기기 밖으로 전송되지 않습니다.',
  alternates: { canonical: '/snap/first-impression' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '스냅테스트', path: '/snap' },
        { name: '첫인상 분석', path: '/snap/first-impression' },
      ])} />
      {children}
    </>
  );
}
