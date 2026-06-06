import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '체지방률 계산기 - 해군 공식·BMI 추정법으로 체지방 분석',
  description: '미 해군 공식(목둘레·허리·엉덩이·키)과 BMI 추정법으로 체지방률(%), 체지방량(kg), 근육량을 계산합니다. ACSM 기준 등급 제공.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
