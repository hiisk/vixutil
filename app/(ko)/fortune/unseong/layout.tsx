import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '십이운성 - 내 일간이 어느 자리에서 힘이 센가',
  description: '생년월일시로 명식을 세워 네 기둥의 십이운성(장생·목욕·관대·건록·제왕·쇠·병·사·묘·절·태·양)을 봅니다. 일간별 열두 지지 표도 함께 봅니다.',
  alternates: { canonical: '/fortune/unseong' },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '십이운성', path: '/fortune/unseong' },
      ])} />
      {children}
    </>
  );
}
