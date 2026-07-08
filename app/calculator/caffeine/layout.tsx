import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '카페인 계산기 - 체내 잔존 카페인량 계산',
  description: '섭취한 카페인 양과 시간을 입력하면 반감기(평균 5시간) 공식으로 특정 시점의 체내 잔존 카페인량을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
