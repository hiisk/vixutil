import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '대출 갈아타기 계산기 - 대환 이득 여부·손익분기점 계산',
  description: '남은 원금과 금리, 중도상환수수료를 넣으면 대출을 갈아탈 때의 월 납입액 변화와 총이자 절감액, 초기 비용을 회수하는 데 걸리는 개월 수를 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
