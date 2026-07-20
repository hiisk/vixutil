import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '바이오리듬 계산기 - 신체·감성·지성 리듬 그래프',
  description: '생년월일을 넣으면 신체(23일)·감성(28일)·지성(33일) 리듬을 그래프로 보여주고, 오늘의 상태와 다음 위험일까지 남은 날짜를 계산합니다.',
  alternates: { canonical: '/fortune/biorhythm' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '운세', path: '/fortune' },
        { name: '바이오리듬', path: '/fortune/biorhythm' },
      ])} />
      {children}
    </>
  );
}
