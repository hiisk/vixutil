import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '전기차 충전 비용 계산기 - 배터리 용량·충전량 기준 충전비',
  description: '전기차 배터리 용량과 충전 목표 SoC, 전력 요금을 입력하면 충전 비용을 계산합니다. 완속·급속 충전 단가 비교도 지원합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
