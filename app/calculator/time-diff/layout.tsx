import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '시간 계산기 - 시간 차이 및 시간 더하기/빼기',
  description: '두 날짜·시각 사이의 시간 차이를 계산하거나, 특정 시각에서 시간을 더하고 빼서 결과 시각을 구합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
