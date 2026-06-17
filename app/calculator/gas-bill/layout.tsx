import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '가스요금 계산기 - 도시가스 사용량 기준 요금 계산',
  description: '도시가스 사용량(m³)과 지역을 선택하면 가스 요금을 계산합니다. 계절별·주택용 요금 단가 기준으로 부가세 포함 청구 예상액을 산출합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
