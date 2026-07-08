import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '사진 감성 분석 - 내 사진의 감성 타입은',
  description: '얼굴 인식 없이 아무 사진이나 올려서 밝기·채도·색감을 실측해 감성 타입을 확인해보세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
