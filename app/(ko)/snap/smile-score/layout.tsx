import { alternateLanguages10 } from '@/lib/locales';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '미소 지수 측정 - 내 미소 점수는',
  description: '사진 한 장으로 입꼬리 위치를 실측해 미소 지수를 측정해보세요.',
  alternates: {
    canonical: '/snap/smile-score',
    languages: alternateLanguages10('/snap/smile-score'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '스냅테스트', path: '/snap' },
        { name: '미소 지수 측정', path: '/snap/smile-score' },
      ])} />
      {children}
    </>
  );
}
