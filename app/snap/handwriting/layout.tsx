import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '손글씨 심리 테스트 - 기울기·필압 분석',
  description: '손글씨 사진 한 장으로 획의 기울기와 필압을 실제로 측정해 성격을 진단해보는 필적학 기반 참여형 테스트입니다.',
  alternates: { canonical: '/snap/handwriting' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
