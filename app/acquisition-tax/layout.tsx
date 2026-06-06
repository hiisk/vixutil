import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '취득세 계산기 - 부동산 취득 시 취득세·등록세 계산',
  description: '주택 취득가액과 면적, 주택 수에 따라 취득세(1~12%)와 지방교육세, 농어촌특별세를 합산한 총 취득세를 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
