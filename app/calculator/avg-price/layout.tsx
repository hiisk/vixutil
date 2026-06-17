import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '물타기 계산기 - 추가 매수 후 평균 단가 계산',
  description: '주식·코인 보유 수량과 단가, 추가 매수 정보를 입력하면 평균 단가와 손익분기점을 계산합니다. 여러 번 나눠 매수한 경우도 지원합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
