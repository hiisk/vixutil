import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '십이신살 - 도화살·역마살·화개살 내 사주에 있나',
  description: '생년월일시를 넣으면 네 기둥에 붙는 십이신살을 연지·일지 두 기준으로 보여줍니다. 도화살·역마살·화개살·장성살 등 열두 살의 뜻도 함께 풀이합니다.',
  alternates: { canonical: '/fortune/sinsal' },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '십이신살', path: '/fortune/sinsal' },
      ])} />
      {children}
    </>
  );
}
