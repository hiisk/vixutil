import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'MBTI 운세 - 16가지 성격 유형별 오늘의 운세',
  description: '내 MBTI 유형에 맞는 오늘의 운세를 무료로 확인해보세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
