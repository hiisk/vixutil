import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '타로 카드 - 78장 풀덱 타로 뽑기',
  description: '78장 정식 타로 덱에서 카드를 뽑아 오늘의 메시지를 확인하는 무료 타로 서비스입니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
