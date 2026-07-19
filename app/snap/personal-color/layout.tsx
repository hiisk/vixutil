import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '퍼스널컬러 진단 - 웜톤·쿨톤 12타입 컬러 진단',
  description: '사진 한 장으로 피부 톤을 실측해 웜톤·쿨톤 12타입을 진단하고, 나만의 컬러 팔레트를 찾아보세요.',
  alternates: { canonical: '/snap/personal-color' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '스냅테스트', path: '/snap' },
        { name: '퍼스널컬러 진단', path: '/snap/personal-color' },
      ])} />
      {children}
    </>
  );
}
