import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '부동산 중개수수료 계산기 - 매매·전세·월세 중개보수',
  description: '부동산 거래 금액과 거래 유형(매매·전세·월세)을 선택하면 법정 요율에 따른 중개수수료 상한액을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
