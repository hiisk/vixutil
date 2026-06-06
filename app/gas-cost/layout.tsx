import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '기름값 계산기 - 목적지까지 왕복 기름값 계산',
  description: '출발지에서 목적지까지 거리와 차량 연비, 현재 유가를 입력하면 편도·왕복 유류비를 계산합니다. 인원수 대비 1인당 비용도 산출합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
